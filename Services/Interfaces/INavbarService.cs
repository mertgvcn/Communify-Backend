using CommunifyLibrary.NonPersistentModels.ParameterModels;
using CommunifyLibrary.NonPersistentModels.ViewModels;

namespace LethalCompany_Backend.Services.Interfaces;
public interface INavbarService
{
    Task<List<SearchedUserViewModel>> SearchAsync(SearchRequest request);
    Task<List<NotificationViewModel>> GetNotificationsAsync();
    Task<string> GetUsernameAsync();
}