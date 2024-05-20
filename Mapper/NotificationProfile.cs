using AutoMapper;
using CommunifyLibrary.Models;
using CommunifyLibrary.NonPersistentModels.ViewModels;

namespace LethalCompany_Backend.Mapper;

public class NotificationProfile : Profile
{
    public NotificationProfile()
    {
        CreateMap<Notification, NotificationViewModel>();
    }
}
