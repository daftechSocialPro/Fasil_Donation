using FasilDonationAPI.Entities;
using FasilDonationAPI.Helpers;
using FasilDonationAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FasilDonationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartnersController : ControllerBase
    {

        private readonly IUnitOfWork _unitofwork;
        private readonly JwtService _jwtService;
        public PartnersController(IUnitOfWork unitOfWork, JwtService jwtService)
        {


            _unitofwork = unitOfWork;
            _jwtService = jwtService;


        }
        [HttpGet]

        public List<Partners> GetAll()
        {


            return _unitofwork.partenerRepository.GetAll();
        }


        [HttpPost]


        public async Task<ActionResult> Post([FromForm] Partners partners)
        {

            try
            {

                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.verify(jwt);
                Guid userId = Guid.Parse(token.Issuer);


                partners.ID = Guid.NewGuid();
                partners.createdAt = DateTime.UtcNow;
                partners.createdBy = userId;


                await _unitofwork.partenerRepository.Create(partners);

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);

                return Unauthorized();
            }

            return NoContent();



        }

        [HttpPut]
        public async Task<ActionResult> Update([FromForm] Partners partners)
        {

            try
            {

                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.verify(jwt);
                Guid userId = Guid.Parse(token.Issuer);


                partners.createdBy = userId;
                partners.updatedAt = DateTime.UtcNow;


                await _unitofwork.partenerRepository.Update(partners);
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

        public async Task<ActionResult> Delete(Guid partnersId)
        {

            try
            {
                await _unitofwork.partenerRepository.Delete(partnersId);


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
