using CommunifyLibrary.Configurations;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace CommunifyLibrary
{
    public static class CommunifyContextExtension
    {
        public static void BuildConfigurations(this ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new RoleConfiguration());
            modelBuilder.ApplyConfiguration(new InterestConfiguration());
            modelBuilder.ApplyConfiguration(new PasswordTokenConfiguration());
            modelBuilder.ApplyConfiguration(new NotificationConfiguration());
        }

        public static IHost MigrateDatabaseOnStart(this IHost app)
        {
            using var scope = app.Services.GetService<IServiceScopeFactory>()!.CreateScope();

            using var context = scope.ServiceProvider.GetRequiredService<CommunifyContext>();

            var pendingMigrations = context.Database.GetPendingMigrations();

            if (pendingMigrations.Any())
            {
                var originalTimeOut = context.Database.GetCommandTimeout();
                context.Database.SetCommandTimeout(30 * 60);
                context.Database.Migrate();
                context.Database.SetCommandTimeout(originalTimeOut);
            }

            return app;
        }
    }
}
