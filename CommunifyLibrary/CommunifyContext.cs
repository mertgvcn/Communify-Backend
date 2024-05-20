using CommunifyLibrary.Models;
using Microsoft.EntityFrameworkCore;

namespace CommunifyLibrary
{
    public class CommunifyContext : DbContext
    {
        public CommunifyContext(DbContextOptions<CommunifyContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Interest> Interests { get; set; }
        public DbSet<PasswordToken> PasswordTokens { get; set; }
        public DbSet<Notification> Notifications { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.BuildConfigurations();
            modelBuilder.Entity<User>().HasMany(a => a.Followers).WithMany(a => a.Followings).UsingEntity(a => a.ToTable("Followings"));


            base.OnModelCreating(modelBuilder);
        }

    }
}
