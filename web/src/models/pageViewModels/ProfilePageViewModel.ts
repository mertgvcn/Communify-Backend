import { ProfileStatsViewModel } from "../viewModels/ProfileStatsViewModel"
import { ProfileStatusViewModel } from "../viewModels/ProfileStatusViewModel"
import { UserInformationSummaryViewModel } from "../viewModels/UserInformationSummaryViewModel"

export type ProfilePageViewModel = {
    userInformationSummary: UserInformationSummaryViewModel | null,
    profileStats: ProfileStatsViewModel | null,
    profileStatus: ProfileStatusViewModel | null,
    isSuccess: boolean
}