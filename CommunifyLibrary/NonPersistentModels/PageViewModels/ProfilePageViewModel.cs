using CommunifyLibrary.NonPersistentModels.ViewModels;

namespace CommunifyLibrary.NonPersistentModels.PageViewModels;
public class ProfilePageViewModel
{
    public UserInformationSummaryViewModel UserInformationSummary { get; set; }
    public ProfileStatsViewModel ProfileStats { get; set; }
    public ProfileStatusViewModel ProfileStatus { get; set; }
    public bool isSuccess { get; set; } = false;
}
