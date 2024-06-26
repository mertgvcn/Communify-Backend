﻿namespace CommunifyLibrary.Models
{
    public class User : BaseEntity
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

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

        public long RoleId { get; set; } //Can establish a relation with the object that has same id with this property.
        public Role Role { get; set; }

        public ICollection<Interest> Interests { get; set; }
    }

    public enum Genders
    {
        Woman,
        Man,
        NonBinary,
        NotSpecified
    }
}
