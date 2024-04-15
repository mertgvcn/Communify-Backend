﻿using CommunifyLibrary.Models;

namespace LethalCompany_Backend.Models.AuthenticationModels;

public class UserRegisterRequest
{
    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string PhoneNumber { get; set; }

    public string Email { get; set; }

    public DateTime BirthDate { get; set; }

    public Genders Gender { get; set; }

    public string BirthCountry { get; set; }

    public string BirthCity { get; set; }

    public string CurrentCountry { get; set; }

    public string CurrentCity { get; set; }

    public string Address { get; set; }

    public int[] InterestIdList { get; set; }
}
