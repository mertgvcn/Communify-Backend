
using CommunifyLibrary.NonPersistentModels.ParameterModels;

namespace Communify_Backend.Services.Interfaces
{
    public interface IAuthenticationService
    {
        Task<bool> EmailExistsAsync(EmailExistsRequest request);
        Task<UserLoginResponse> LoginUserAsync(UserLoginRequest request);
        Task RegisterUserAsync(UserRegisterRequest user);
        Task ForgotPasswordAsync(ForgotPasswordRequest request);
        Task ChangePasswordAsync(ChangePasswordRequest request);
        Task SetPasswordAsync(SetPasswordRequest request);
    }
}
