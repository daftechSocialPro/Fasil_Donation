using FasilDonationAPI.Entities;
using FasilDonationAPI.Helpers;
using FasilDonationAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FasilDonationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NextMatchController : ControllerBase
    {


        private readonly IUnitOfWork _unitofwork;
        private readonly JwtService _jwtService;
        public NextMatchController(IUnitOfWork unitOfWork, JwtService jwtService)
        {


            _unitofwork = unitOfWork;
            _jwtService = jwtService;


        }
        [HttpGet]

        public List<NextMatch> GetAll()
        {


            return _unitofwork.nextMatchRepository.GetAll();
        }


        [HttpPost]


        public async Task<ActionResult> Post([FromForm] NextMatch NextMatch)
        {

            try
            {

                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.verify(jwt);
                Guid userId = Guid.Parse(token.Issuer);


                NextMatch.ID = Guid.NewGuid();
                NextMatch.createdAt = DateTime.UtcNow;
                NextMatch.createdBy = userId;


                await _unitofwork.nextMatchRepository.Create(NextMatch);

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);

                return Unauthorized();
            }

            return NoContent();



        }

        [HttpPut]
        public async Task<ActionResult> Update([FromForm] NextMatch NextMatch)
        {

            try
            {

                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.verify(jwt);
                Guid userId = Guid.Parse(token.Issuer);


                NextMatch.createdBy = userId;
                NextMatch.updatedAt = DateTime.UtcNow;


                await _unitofwork.nextMatchRepository.Update(NextMatch);
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

        public async Task<ActionResult> Delete(Guid NextMatchId)
        {

            try
            {
                await _unitofwork.nextMatchRepository.Delete(NextMatchId);


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
