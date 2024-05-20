using CommunifyLibrary.NonPersistentModels.PageViewModels;
using CommunifyLibrary.NonPersistentModels.ParameterModels;
using CommunifyLibrary.NonPersistentModels.ViewModels;
using LethalCompany_Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LethalCompany_Backend.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class ProfilePageController : Controller
{
    private readonly IProfilePageService _userProfileService;

    public ProfilePageController(IProfilePageService userProfileService)
    {
        _userProfileService = userProfileService;
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<ProfilePageViewModel> GetProfilePageData(string username)
    {
        var userInformationSummary = await _userProfileService.GetUserInformationSummaryAsync(username);
        var profileStats = await _userProfileService.GetProfileStatsAsync(username);
        var profileStatus = await _userProfileService.GetProfileStatusAsync(username);

        return new ProfilePageViewModel
        {
            UserInformationSummary = userInformationSummary,
            ProfileStats = profileStats,
            ProfileStatus = profileStatus,
            isSuccess = true
        };
    }

    [HttpGet]
    [Authorize(Roles = "User")]
    public async Task<UserInformationViewModel> GetUserInformation()
        => await _userProfileService.GetUserInformationAsync();

    [HttpPost]
    [AllowAnonymous]
    public async Task<bool> ToggleFollowUser(FollowUserRequest request)
        => await _userProfileService.ToggleFollowUserAsync(request);

    [HttpGet]
    [Authorize(Roles = "User")]
    public async Task<List<UserInformationSummaryViewModel>> GetFollowers()
        => await _userProfileService.GetFollowers();

    [HttpGet]
    [Authorize(Roles = "User")]
    public async Task<List<UserInformationSummaryViewModel>> GetFollowings()
    => await _userProfileService.GetFollowings();
}
