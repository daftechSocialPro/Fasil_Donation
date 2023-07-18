using FasilDonationAPI.Entities;
using FasilDonationAPI.Helpers;
using FasilDonationAPI.Migrations;
using FasilDonationAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FasilDonationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonationController : ControllerBase
    {
        private readonly IUnitOfWork _unitofwork;
        private readonly JwtService _jwtService;
        public DonationController(IUnitOfWork unitOfWork, JwtService jwtService)
        {


            _unitofwork = unitOfWork;
            _jwtService = jwtService;


        }
        [HttpGet]

        public List<Donation> GetAll()
        {


            return _unitofwork.donationRepository.GetAll();
        }
        [HttpGet("single")]

        public Donation SingleDonation(Guid donationId)
        {


            return _unitofwork.donationRepository.SingleDonation(donationId);
        }

        


        [HttpPost]


        public async Task<ActionResult> Post([FromForm] Donation donation)
        {

            try
            {

                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.verify(jwt);
                Guid userId = Guid.Parse(token.Issuer);


                donation.ID = Guid.NewGuid();
                donation.createdAt = DateTime.UtcNow;
                donation.createdBy = userId;


                await _unitofwork.donationRepository.Create(donation);

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);

                return Unauthorized();
            }

            return NoContent();



        }

        [HttpPut]
        public async Task<ActionResult> Update([FromForm] Donation donation)
        {

            try
            {

                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.verify(jwt);
                Guid userId = Guid.Parse(token.Issuer);


                donation.createdBy = userId;
                donation.updatedAt = DateTime.UtcNow;


                await _unitofwork.donationRepository.Update(donation);
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

        public async Task<ActionResult> Delete(Guid donationId)
        {

            try
            {
                await _unitofwork.donationRepository.Delete(donationId);


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
