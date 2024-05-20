using CommunifyLibrary.Enums;
using CommunifyLibrary.Models;
using Microsoft.EntityFrameworkCore;

namespace CommunifyLibrary.Repository.MockRepository
{
    public class MockUserRepository : IUserRepository
    {
        private List<User> userList = new List<User>()
        {
            new User() {
                FirstName = "admin",
                LastName = "admin",
                BirthDate = new DateTime(2000, 01, 01),
                BirthCountry = "adminland",
                BirthCity = "admintown",
                CurrentCountry = "adminland",
                CurrentCity = "admintown",
                Gender = Genders.NonBinary,
                Address = "administration building",
                PhoneNumber = "05301231212",
                Email = "admin@gmail.com",
                Password = "$2a$11$AXYIIjs/gzJPUial7KHaCepYnCLgzJx771GR085Wzm92atvVMP8/a",
                RoleId = 1
            },
            new User() {
                FirstName = "Abdülkadir",
                LastName = "Karataş",
                BirthDate = new DateTime(2001, 01, 01),
                BirthCountry = "İstanbul",
                BirthCity = "Ümraniye",
                CurrentCountry = "İstanbul",
                CurrentCity = "Ümraniye",
                Gender = Genders.Man,
                Address = "ümraniyede bir yer",
                PhoneNumber = "05301231212",
                Email = "abdülkadir@gmail.com",
                Password = "$2a$11$GMfssBOSjy/vbiSoyUnRrORiWctCL7ww4cMaEEttj6CjhZ1kOxc9a",
                RoleId = 2
            },
            new User() {
                FirstName = "Kerem",
                LastName = "Gülser",
                BirthDate = new DateTime(2001, 01, 01),
                BirthCountry = "Çanakkale",
                BirthCity = "Biga",
                CurrentCountry = "İstanbul",
                CurrentCity = "Şile",
                Gender = Genders.Man,
                Address = "bigada bir yer",
                PhoneNumber = "05301231212",
                Email = "kerem@gmail.com",
                Password = "$2a$11$GMfssBOSjy/vbiSoyUnRrORiWctCL7ww4cMaEEttj6CjhZ1kOxc9a",
                RoleId = 2
            },
        };

        public IQueryable<User> GetAll() => userList.AsQueryable();

        public IQueryable<User> GetByEmail(string email) => GetAll().Where(u => u.Email == email);

        public async Task<User> GetByIdAsync(long id) => await GetAll().Where(u => u.Id == id).SingleAsync();

        public async Task<User> AddAsync(User Entity)
        {
            userList.Add(Entity);
            return await Task.FromResult(Entity);
        }

        public async Task AddInterest(long userId, Interest interest)
        {
            var user = await GetByIdAsync(userId);

            user.Interests ??= new List<Interest>();

            user.Interests.Add(interest);
        }

        public async Task UpdateAsync(User user)
        {
            var existingUser = await GetByIdAsync(user.Id);

            existingUser.FirstName = user.FirstName;
            existingUser.LastName = user.LastName;
            existingUser.BirthDate = user.BirthDate;
            existingUser.Email = user.Email;
            existingUser.Password = user.Password;
            existingUser.BirthCountry = user.BirthCountry;
            existingUser.BirthCity = user.BirthCity;
            existingUser.CurrentCity = user.CurrentCity;
            existingUser.CurrentCountry = user.CurrentCountry;
            existingUser.Gender = user.Gender;
            existingUser.Address = user.Address;
            existingUser.PhoneNumber = user.PhoneNumber;
            existingUser.RoleId = user.RoleId;
        }

        public Task<long> GetIdByEmailAsync(string email)
        {
            throw new NotImplementedException();
        }

        public IQueryable<User> GetByUsername(string username)
        {
            throw new NotImplementedException();
        }

        public IQueryable<User> SearchUsers(string input)
        {
            throw new NotImplementedException();
        }

        public Task AddInterest(long userId, long interestId)
        {
            throw new NotImplementedException();
        }
    }
}
