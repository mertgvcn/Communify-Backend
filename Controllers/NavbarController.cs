using CommunifyLibrary.NonPersistentModels.ParameterModels;
using CommunifyLibrary.NonPersistentModels.ViewModels;
using LethalCompany_Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LethalCompany_Backend.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class NavbarController : Controller
{
    private readonly INavbarService _navbarService;

    public NavbarController(INavbarService navbarService)
    {
        _navbarService = navbarService;
    }

    [HttpPost]
    [AllowAnonymous]
    public async Task<JsonResult> Search([FromBody] SearchRequest request)
    {
        var users = await _navbarService.SearchAsync(request);
        string[] communities = [];
        string[] posts = [];

        var result = new
        {
            users = users,
            communities = communities,
            posts = posts,
            anyResult = (users.Count > 0 || communities.Length > 0 || posts.Length > 0)
        };

        return new JsonResult(result);
    }

    [HttpGet]
    [Authorize(Roles = "User")]
    public async Task<List<NotificationViewModel>> GetNotifications()
        => await _navbarService.GetNotificationsAsync();

    [HttpGet]
    [AllowAnonymous]
    public async Task<string> GetUsername()
        => await _navbarService.GetUsernameAsync();
}
