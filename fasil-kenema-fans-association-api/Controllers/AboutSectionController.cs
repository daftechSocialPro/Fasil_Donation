using FasilDonationAPI.Entities;
using FasilDonationAPI.Helpers;
using FasilDonationAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FasilDonationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AboutSectionController : ControllerBase
    {


        private readonly IUnitOfWork _unitofwork;
        private readonly JwtService _jwtService;
        public AboutSectionController(IUnitOfWork unitOfWork, JwtService jwtService)
        {


            _unitofwork = unitOfWork;
            _jwtService = jwtService;


        }
        [HttpGet]

        public List<AboutSection> GetAll()
        {


            return _unitofwork.aboutSectionRepository.GetAll();
        }


        [HttpPost]


        public async Task<ActionResult> Post([FromForm] AboutSection aboutSection)
        {

            try
            {

                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.verify(jwt);
                Guid userId = Guid.Parse(token.Issuer);


                aboutSection.ID = Guid.NewGuid();
                aboutSection.createdAt = DateTime.UtcNow;
                aboutSection.createdBy = userId;


                await _unitofwork.aboutSectionRepository.Create(aboutSection);

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);

                return Unauthorized();
            }

            return NoContent();



        }

        [HttpPut]
        public async Task<ActionResult> Update([FromForm] AboutSection aboutSection)
        {

            try
            {

                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.verify(jwt);
                Guid userId = Guid.Parse(token.Issuer);


                aboutSection.createdBy = userId;
                aboutSection.updatedAt = DateTime.UtcNow;


                await _unitofwork.aboutSectionRepository.Update(aboutSection);
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

        public async Task<ActionResult> Delete(Guid aboutSectionId)
        {

            try
            {
                await _unitofwork.aboutSectionRepository.Delete(aboutSectionId);


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
