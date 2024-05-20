using CommunifyLibrary.Models;

namespace CommunifyLibrary.Repository
{
    public interface IUserRepository
    {
        IQueryable<User> GetAll();
        IQueryable<User> GetByEmail(string email);
        IQueryable<User> GetByUsername(string username);
        IQueryable<User> SearchUsers(string input);
        Task<User> GetByIdAsync(long id);
        Task<long> GetIdByEmailAsync(string email);
        Task UpdateAsync(User user);
        Task<User> AddAsync(User Entity);
        Task AddInterest(long userId, long interestId);
    }
}