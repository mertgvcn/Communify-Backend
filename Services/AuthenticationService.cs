using AutoMapper;
using Communify_Backend.Services.Interfaces;
using CommunifyLibrary.Enums;
using CommunifyLibrary.Models;
using CommunifyLibrary.NonPersistentModels.ParameterModels;
using CommunifyLibrary.Repository;
using CommunifyLibrary.Repository.Interfaces;
using LethalCompany_Backend.Exceptions;
using LethalCompany_Backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Security;
using System.Text.RegularExpressions;

namespace Communify_Backend.Services;

public class AuthenticationService : IAuthenticationService
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordTokenRepository _passwordTokenRepository;
    private readonly ITokenService _tokenService;
    private readonly ICryptionService _cryptionService;
    private readonly IEmailSender _emailSender;
    private readonly IHttpContextService _httpContextService;
    private readonly IMapper _mapper;

    public AuthenticationService(
        IUserRepository userRepository,
        IPasswordTokenRepository passwordTokenRepository,
        ITokenService tokenService,
        ICryptionService cryptionService,
        IEmailSender emailSender,
        IHttpContextService httpContextService,
        IMapper mapper
        )
    {
        _userRepository = userRepository;
        _passwordTokenRepository = passwordTokenRepository;
        _tokenService = tokenService;
        _cryptionService = cryptionService;
        _emailSender = emailSender;
        _httpContextService = httpContextService;
        _mapper = mapper;
    }

    public async Task<bool> EmailExistsAsync(EmailExistsRequest request) => await _userRepository.GetByEmail(request.Email).AnyAsync();

    public async Task<UserLoginResponse> LoginUserAsync(UserLoginRequest request)
    {
        UserLoginResponse response = new UserLoginResponse()
        {
            AuthenticateResult = false,
            AuthToken = "No Token",
            AccessTokenExpireDate = DateTime.Now,
            ReplyMessage = "Your credentials are invalid",
            Role = "No Role",
        };

        Regex regex = new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$"); //email check regex
        Match isEmail = regex.Match(request.Credential);

        User user;

        if (isEmail.Success)
        {
            user = await _userRepository.GetByEmail(request.Credential).Include(user => user.Role).SingleAsync();
        }
        else
        {
            user = await _userRepository.GetByUsername(request.Credential).Include(user => user.Role).SingleAsync();
        }

        var plainPassword = await _cryptionService.Decrypt(request.Password);

        if (BCrypt.Net.BCrypt.Verify(plainPassword, user.Password))
        {
            var generatedToken = await _tokenService.GenerateTokenAsync(new GenerateTokenRequest
            {
                UserID = user.Id.ToString(),
                Role = user.Role,
                ExpireDate = DateTime.UtcNow.Add(TimeSpan.FromHours(6))
            });

            response.AuthenticateResult = true;
            response.AuthToken = generatedToken.Token;
            response.AccessTokenExpireDate = generatedToken.ExpireDate;
            response.ReplyMessage = "Login Successful";
            response.Role = user.Role.Name;
        }

        return response;
    }

    public async Task RegisterUserAsync(UserRegisterRequest request)
    {
        User newUser = _mapper.Map<User>(request);
        newUser.RoleId = 2;

        var user = await _userRepository.AddAsync(newUser);

        foreach (var interestId in request.InterestIdList)
        {
            await _userRepository.AddInterest(user.Id, interestId);
        }

        var generatedToken = await _tokenService.CreatePasswordTokenAsync(user.Id);

        await _emailSender.SendEmailAsync(new SendEmailRequest
        {
            ReceiverMail = newUser.Email,
            MailType = MailTypes.SetPasswordMail,
            UrlExtension = "setpassword?token=" + generatedToken.Token
        });
    }

    public async Task ForgotPasswordAsync(ForgotPasswordRequest request)
    {
        var emailExists = await EmailExistsAsync(new EmailExistsRequest() { Email = request.Email });
        if (!emailExists) return;

        var userId = await _userRepository.GetIdByEmailAsync(request.Email);
        var generatedToken = await _tokenService.CreatePasswordTokenAsync(userId);

        await _emailSender.SendEmailAsync(new SendEmailRequest
        {
            ReceiverMail = request.Email,
            MailType = MailTypes.ForgotPasswordMail,
            UrlExtension = "setpassword?token=" + generatedToken.Token
        });
    }

    public async Task ChangePasswordAsync(ChangePasswordRequest request)
    {
        var userId = _httpContextService.GetCurrentUserID();
        var user = await _userRepository.GetByIdAsync(userId);

        var plainOldPassword = await _cryptionService.Decrypt(request.oldPassword);
        var plainNewPassword = await _cryptionService.Decrypt(request.newPassword);

        if (BCrypt.Net.BCrypt.Verify(plainOldPassword, user.Password))
        {
            if (request.oldPassword != request.newPassword)
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(plainNewPassword);
                await _userRepository.UpdateAsync(user);
            }
            else
            {
                throw new SamePasswordException("New password cannot be the same as the old password");
            }
        }
        else
        {
            throw new InvalidPasswordException("Invalid password");
        }
    }


    public async Task SetPasswordAsync(SetPasswordRequest request)
    {
        var passwordToken = await _passwordTokenRepository.GetByTokenAsync(request.Token);

        if (passwordToken is null) throw new PasswordTokenNotFoundException("Token bulunamadi");

        if (DateTime.UtcNow < passwordToken.ExpireDate)
        {
            var user = await _userRepository.GetAll().Where(a => a.Id == passwordToken.UserId).SingleAsync();
            var plainPassword = await _cryptionService.Decrypt(request.Password);

            bool ValidPassword = true;
            if (!ValidPassword) throw new PasswordException("Password invalid");

            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(plainPassword);

            user.RoleId = 2;
            user.isActive = true;
            user.Password = hashedPassword;

            await _userRepository.UpdateAsync(user);
        }

        await _passwordTokenRepository.DeleteAsync(passwordToken);

    }
}

