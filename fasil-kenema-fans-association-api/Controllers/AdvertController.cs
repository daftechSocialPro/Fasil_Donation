using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FasilDonationAPI.Entities;
using FasilDonationAPI.Helpers;
using FasilDonationAPI.Services;

namespace FasilDonationAPI.Controllers
{
    [Route("api/advert")]
    [ApiController]
    public class AdvertController : ControllerBase
    {



        private readonly IUnitOfWork _unitofwork;
        private readonly JwtService _jwtService;
        public AdvertController(IUnitOfWork unitOfWork, JwtService jwtService)
        {


            _unitofwork = unitOfWork;
            _jwtService = jwtService;


        }
        [HttpGet]

        public List<Advertisement> GetAll()
        {


            return _unitofwork.advertRepository.GetAll();
        }


        [HttpPost]


        public async Task<ActionResult> Post([FromForm] Advertisement advert)
        {

            try
            {

                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.verify(jwt);
                Guid userId = Guid.Parse(token.Issuer);


                advert.ID = Guid.NewGuid();
                advert.createdAt = DateTime.UtcNow;
                advert.createdBy = userId;


                await _unitofwork.advertRepository.Create(advert);

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);

                return Unauthorized();
            }

            return NoContent();



        }

        [HttpPut]
        public async Task<ActionResult> Update([FromForm] Advertisement advert)
        {

            try
            {

                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.verify(jwt);
                Guid userId = Guid.Parse(token.Issuer);


                advert.createdBy = userId;
                advert.updatedAt = DateTime.UtcNow;


                await _unitofwork.advertRepository.Update(advert);
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

        public async Task<ActionResult> Delete(Guid advertId)
        {

            try
            {
                await _unitofwork.advertRepository.Delete(advertId);


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
