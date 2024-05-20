using AutoMapper;
using CommunifyLibrary.Models;
using CommunifyLibrary.NonPersistentModels.ParameterModels;
using CommunifyLibrary.NonPersistentModels.ViewModels;

namespace LethalCompany_Backend.Mapper;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<UserRegisterRequest, User>();

        CreateMap<User, SearchedUserViewModel>()
            .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.FirstName + " " + src.LastName));

        CreateMap<User, ProfileStatsViewModel>()
            .ForMember(dest => dest.FollowerCount, opt => opt.MapFrom(src => src.Followers.Count))
            .ForMember(dest => dest.FollowingCount, opt => opt.MapFrom(src => src.Followings.Count));

        CreateMap<User, UserInformationViewModel>();

        CreateMap<User, UserInformationSummaryViewModel>();
    }
}
