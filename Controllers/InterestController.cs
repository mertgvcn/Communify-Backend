using AutoMapper;
using AutoMapper.QueryableExtensions;
using CommunifyLibrary.Repository;
using LethalCompany_Backend.Models.InterestModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LethalCompany_Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    [AllowAnonymous]
    public class InterestController(IInterestRepository interestRepository, IMapper mapper, IUserRepository userRepository) : Controller
    {


        [HttpGet]
        public async Task<List<InterestViewModel>> GetInterests()
        {
            var interests = await interestRepository.GetAll()
                .ProjectTo<InterestViewModel>(mapper.ConfigurationProvider)
                .ToListAsync();

            return interests;
        }

        [HttpPost]
        public async Task AddInterest(long userId, long interestId)
        {
            await userRepository.AddInterest(userId, interestId);
        }
    }
}
