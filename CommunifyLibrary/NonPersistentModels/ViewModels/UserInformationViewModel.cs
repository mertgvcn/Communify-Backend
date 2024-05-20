using CommunifyLibrary.Enums;
using LethalCompany_Backend.Models.InterestModels;

namespace CommunifyLibrary.NonPersistentModels.ViewModels;
public class UserInformationViewModel
{
    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string Username { get; set; }

    public DateTime BirthDate { get; set; }

    public string BirthCountry { get; set; }

    public string BirthCity { get; set; }

    public string CurrentCountry { get; set; }

    public string CurrentCity { get; set; }

    public Genders Gender { get; set; }

    public string Address { get; set; }

    public string PhoneNumber { get; set; }

    public string Email { get; set; }

    public ICollection<InterestViewModel> Interests { get; set; }
}
