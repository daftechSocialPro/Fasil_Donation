using FasilDonationAPI.Entities;
using FasilDonationAPI.Helpers;
using FasilDonationAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace FasilDonationAPI.Controllers
{
    [Route("api/HomeHero")]
    [ApiController]
    public class HomeHeroController : Controller
    {


        private readonly IUnitOfWork _unitofwork;
        private readonly JwtService _jwtService;
        public HomeHeroController(IUnitOfWork unitOfWork, JwtService jwtService)
        {


            _unitofwork = unitOfWork;
            _jwtService = jwtService;


        }
        [HttpGet]

        public List<HomeHero> GetAll()
        {


            return _unitofwork.homeHeroRepository.GetAll();
        }


        [HttpPost]


        public async Task<ActionResult> Post([FromForm] HomeHero homeHero)
        {

            try
            {

                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.verify(jwt);
                Guid userId = Guid.Parse(token.Issuer);


                homeHero.ID = Guid.NewGuid();
                homeHero.createdAt = DateTime.UtcNow;
                homeHero.createdBy = userId;


                await _unitofwork.homeHeroRepository.Create(homeHero);

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);

                return Unauthorized();
            }

            return NoContent();



        }

        [HttpPut]
        public async Task<ActionResult> Update([FromForm] HomeHero homeHero)
        {

            try
            {

                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.verify(jwt);
                Guid userId = Guid.Parse(token.Issuer);


                homeHero.createdBy = userId;
                homeHero.updatedAt = DateTime.UtcNow;


                await _unitofwork.homeHeroRepository.Update(homeHero);
                //await _unitofwork.SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);

                return Unauthorized();
            }

            return NoContent();





        }

        [HttpDelete]

        public async Task<ActionResult> Delete(Guid homeHeroId)
        {

            try
            {
                await _unitofwork.homeHeroRepository.Delete(homeHeroId);


            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);

                return Unauthorized();
            }

            return NoContent();



        }
    }
}
