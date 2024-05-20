using AutoMapper;
using AutoMapper.QueryableExtensions;
using CommunifyLibrary.Models;
using CommunifyLibrary.NonPersistentModels.ParameterModels;
using CommunifyLibrary.NonPersistentModels.ViewModels;
using CommunifyLibrary.Repository;
using CommunifyLibrary.Repository.Interfaces;
using LethalCompany_Backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LethalCompany_Backend.Services;

public class ProfilePageService : IProfilePageService
{
    private readonly IUserRepository _userRepository;
    private readonly INotificationRepository _notificationRepository;
    private readonly IHttpContextService _httpContextService;
    private readonly IMapper _mapper;

    public ProfilePageService(IUserRepository userRepository, INotificationRepository notificationRepository, IHttpContextService httpContextService, IMapper mapper)
    {
        _userRepository = userRepository;
        _notificationRepository = notificationRepository;
        _httpContextService = httpContextService;
        _mapper = mapper;
    }

    public async Task<ProfileStatusViewModel> GetProfileStatusAsync(string username)
    {
        var isOwner = await IsProfileOwnerAsync(username);
        var isFollower = isOwner ? false : await IsFollowerAsync(username);

        return new ProfileStatusViewModel
        {
            IsOwner = isOwner,
            IsFollower = isFollower
        };
    }

    public async Task<UserInformationSummaryViewModel> GetUserInformationSummaryAsync(string username)
    {
        var userInformationSummary = await _userRepository.GetAll().Where(u => u.Username == username)
                                                .ProjectTo<UserInformationSummaryViewModel>(_mapper.ConfigurationProvider)
                                                .SingleAsync();

        return userInformationSummary;
    }

    public async Task<ProfileStatsViewModel> GetProfileStatsAsync(string username)
    {
        var profileStats = await _userRepository.GetByUsername(username) //TODO: Daha sonra post ve communities sayılarını da çek
                            .Include(u => u.Followers)
                            .Include(u => u.Followings)
                            .ProjectTo<ProfileStatsViewModel>(_mapper.ConfigurationProvider)
                            .SingleAsync();

        return profileStats;
    }

    public async Task<UserInformationViewModel> GetUserInformationAsync()
    {
        var userId = _httpContextService.GetCurrentUserID();
        var userInformation = await _userRepository.GetAll().Where(u => u.Id == userId)
                    .ProjectTo<UserInformationViewModel>(_mapper.ConfigurationProvider)
                    .SingleAsync();

        return userInformation;
    }
    public async Task<List<UserInformationSummaryViewModel>> GetFollowers()
    {
        var userId = _httpContextService.GetCurrentUserID();
        var user = await _userRepository.GetAll().Where(u => u.Id == userId).Include(u => u.Followers).SingleAsync();

        var followerList = user.Followers
                               .AsQueryable()
                               .ProjectTo<UserInformationSummaryViewModel>(_mapper.ConfigurationProvider)
                               .ToList();

        return followerList;
    }

    public async Task<List<UserInformationSummaryViewModel>> GetFollowings()
    {
        var userId = _httpContextService.GetCurrentUserID();
        var user = await _userRepository.GetAll().Where(u => u.Id == userId).Include(u => u.Followings).SingleAsync();

        var followingList = user.Followings
                               .AsQueryable()
                               .ProjectTo<UserInformationSummaryViewModel>(_mapper.ConfigurationProvider)
                               .ToList();

        return followingList;
    }

    public async Task<bool> ToggleFollowUserAsync(FollowUserRequest request)
    {
        var userId = _httpContextService.GetCurrentUserID();
        if (userId == -1) return false;

        var user = await _userRepository.GetAll().Where(u => u.Id == userId).Include(u => u.Followings).SingleAsync();
        var following = await _userRepository.GetByUsername(request.Username).Include(f => f.Followers).SingleAsync();

        if (request.IsFollower)
        {
            user.Followings.Remove(following);
            following.Followers.Remove(user);
        }
        else
        {
            user.Followings.Add(following);
            following.Followers.Add(user);

            await _notificationRepository.AddAsync(new Notification()
            {
                Message = user.Username + " has started following you",
                User = following
            });
        }

        await _userRepository.UpdateAsync(user);
        await _userRepository.UpdateAsync(following);

        return true;
    }

    public async Task<bool> IsProfileOwnerAsync(string username)
    {
        var userId = _httpContextService.GetCurrentUserID();
        if (userId == -1) return false;

        return (await _userRepository.GetByIdAsync(userId)).Username == username;
    }

    public async Task<bool> IsFollowerAsync(string username)
    {
        var userId = _httpContextService.GetCurrentUserID();
        if (userId == -1) return false;

        var user = await _userRepository.GetAll().Where(u => u.Id == userId).Include(u => u.Followings).SingleAsync();
        var following = await _userRepository.GetByUsername(username).SingleAsync();

        var isFollower = user.Followings.Contains(following);

        return isFollower;
    }

}
