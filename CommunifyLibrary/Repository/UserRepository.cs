﻿using CommunifyLibrary.Models;
using Microsoft.EntityFrameworkCore;

namespace CommunifyLibrary.Repository;

public class UserRepository(CommunifyContext context) : BaseRepository<User>(context), IUserRepository
{
    public IQueryable<User> GetByEmail(string email) => context.Users.Where(a => a.Email == email);
    public IQueryable<User> GetByUsername(string username) => context.Users.Where(a => a.Username == username);
    public IQueryable<User> SearchUsers(string input)
    {
        input = input.ToLower();

        return context.Users
            .Where(a => String.Concat(a.FirstName.ToLower(), " ", a.LastName.ToLower()).Contains(input) || a.Username.Contains(input))
            .OrderBy(a => a.FirstName);
    }

    public async Task<long> GetIdByEmailAsync(string email) => (await GetByEmail(email).SingleAsync()).Id;

    public async Task AddInterest(long userId, Interest interest)
    {
        var user = await GetByIdAsync(userId);

        user.Interests ??= new List<Interest>(); //if user.interests is null => user.interests = new List<Interest>();

        user.Interests.Add(interest);
        await context.SaveChangesAsync();
    }

}

