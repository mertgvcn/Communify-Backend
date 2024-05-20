using AutoMapper;
using AutoMapper.QueryableExtensions;
using CommunifyLibrary.NonPersistentModels.ParameterModels;
using CommunifyLibrary.NonPersistentModels.ViewModels;
using CommunifyLibrary.Repository;
using CommunifyLibrary.Repository.Interfaces;
using LethalCompany_Backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LethalCompany_Backend.Services;

public class NavbarService : INavbarService
{
    private readonly IUserRepository _userRepository;
    private readonly INotificationRepository _notificationRepository;
    private readonly IHttpContextService _httpContextService;
    private readonly IMapper _mapper;

    public NavbarService(IUserRepository userRepository, INotificationRepository notificationRepository, IHttpContextService httpContextService, IMapper mapper)
    {
        _userRepository = userRepository;
        _notificationRepository = notificationRepository;
        _httpContextService = httpContextService;
        _mapper = mapper;
    }

    public async Task<List<SearchedUserViewModel>> SearchAsync(SearchRequest request)
    {
        if (request.Input.Trim() == "") return [];

        //To Do : Daha sonra postlara göre, communitylere göre arama seçenekleri eklenecek
        var searchResult = await _userRepository.SearchUsers(request.Input)
                                    .ProjectTo<SearchedUserViewModel>(_mapper.ConfigurationProvider)
                                    .Take(5)
                                    .ToListAsync();
        return searchResult;
    }

    public async Task<List<NotificationViewModel>> GetNotificationsAsync()
    {
        var userId = _httpContextService.GetCurrentUserID();

        var notifications = await _notificationRepository.GetAll().Where(n => n.UserId == userId)
                                     .ProjectTo<NotificationViewModel>(_mapper.ConfigurationProvider)
                                     .OrderByDescending(n => n.DateCreated)
                                     .Take(5)
                                     .ToListAsync();

        return notifications;
    }

    public async Task<bool> CheckNotifications()
    {
        //Bell icon üstündeki yeni mesaj var için
        var userId = _httpContextService.GetCurrentUserID();
        return await _notificationRepository.GetAll().AnyAsync(n => n.UserId == userId && !n.Seen);
    }

    public async Task<string> GetUsernameAsync()
    {
        var userId = _httpContextService.GetCurrentUserID();

        return (await _userRepository.GetByIdAsync(userId)).Username;
    }
}
