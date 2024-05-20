using LethalCompany_Backend.Services.Interfaces;
using System.Security.Claims;

namespace LethalCompany_Backend.Services
{
    public class HttpContextService : IHttpContextService
    {
        private readonly IHttpContextAccessor httpContextAccessor;

        public HttpContextService(IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
        }

        public long GetCurrentUserID()
        {
            if (httpContextAccessor.HttpContext is not null)
            {
                var userID = httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

                if (userID != null)
                    return int.Parse(userID);
            }

            return -1;
        }
    }
}
