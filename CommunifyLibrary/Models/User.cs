using CommunifyLibrary.Enums;

namespace CommunifyLibrary.Models
{
    public class User : BaseEntity
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

        public string? Password { get; set; }

        public long RoleId { get; set; }
        public Role Role { get; set; }

        public ICollection<Notification> Notifications { get; set; }

        public ICollection<Interest> Interests { get; set; }

        public ICollection<User> Followings { get; set; }

        public ICollection<User> Followers { get; set; }

        public bool isActive { get; set; }
    }
}
