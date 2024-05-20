
using Communify_Backend.Services;
using Communify_Backend.Services.Interfaces;
using CommunifyLibrary.Repository;
using CommunifyLibrary.Repository.Interfaces;
using CommunifyLibrary.Repository.MockRepository;
using LethalCompany_Backend.Services;
using LethalCompany_Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Reflection;
using System.Text;

namespace Communify_Backend
{
    public static class ProgramExtension
    {
        public static void AddAPI(this WebApplicationBuilder builder)
        {
            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            // Swagger support for authorization

            builder.Services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey
                });

                options.OperationFilter<SecurityRequirementsOperationFilter>();
            });
        }

        public static void ConfigureServices(this IServiceCollection collection)
        {
            collection.AddScoped<IHttpContextService, HttpContextService>();
            collection.AddScoped<IAuthenticationService, AuthenticationService>();
            collection.AddScoped<ITokenService, TokenService>();
            collection.AddScoped<ICryptionService, CryptionService>();
            collection.AddScoped<IEmailSender, EmailSender>();
            collection.AddScoped<INavbarService, NavbarService>();
            collection.AddScoped<IProfilePageService, ProfilePageService>();
            collection.AddAutoMapper(Assembly.GetExecutingAssembly());
        }

        public static void ConfigureRepositories(this IServiceCollection collection, IConfiguration configuration)
        {
            if (Convert.ToBoolean(configuration["isMock"]))
            {
                collection.AddScoped<IUserRepository, MockUserRepository>();

            }
            else
            {
                collection.AddScoped<IUserRepository, UserRepository>();
                collection.AddScoped<IRoleRepository, RoleRepository>();
                collection.AddScoped<IInterestRepository, InterestRepository>();
                collection.AddScoped<IPasswordTokenRepository, PasswordTokenRepository>();
                collection.AddScoped<INotificationRepository, NotificationRepository>();
            }
        }

        public static void ConfigureAuthorization(this WebApplicationBuilder builder)
        {
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(o =>
            {
                o.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = builder.Configuration["AppSettings:ValidIssuer"],
                    ValidAudience = builder.Configuration["AppSettings:ValidAudience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["AppSettings:Secret"])),
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = false,
                    ValidateIssuerSigningKey = true
                };
            });

            builder.Services.AddAuthorization();
            builder.Services.AddHttpContextAccessor();
        }
    }
}
