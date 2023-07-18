using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Asn1.Ocsp;
using FasilDonationAPI.Dtos;
using FasilDonationAPI.Entities;
using FasilDonationAPI.Helpers;
using FasilDonationAPI.Migrations;
using FasilDonationAPI.Services;

namespace FasilDonationAPI.Controllers
{
    [Route("api/member")]
    [ApiController]
    public class MemberController : ControllerBase
    {
        private readonly IUnitOfWork _unitofwork;
        private readonly JwtService _jwtService;
        public MemberController(IUnitOfWork unitOfWork, JwtService jwtService)
        {


            _unitofwork = unitOfWork;
            _jwtService = jwtService;


        }
        [HttpGet]

        public async Task<ActionResult<List<Member>>> GetAll()
        {


            return Ok(await _unitofwork.memberRepostiory.GetAll());
        }
        //[HttpGet("getPayment")]

        //public async Task<List<Payment>> GetAllPayment(Guid fanId)
        //{

        //    return await _unitofwork.degafiRepostiory.GetAllPaymentsByid(fanId);


        //}




        [HttpPost("fromExcel")]
        

        public async Task <ActionResult> Post ([FromForm] FansFromExcel fansFromExcel)
        {

            try
            {

                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.verify(jwt);
                Guid userId = Guid.Parse(token.Issuer);


                //degafi.ID = Guid.NewGuid();
                //degafi.createdAt = DateTime.UtcNow;
                //degafi.createdBy = userId;


                await _unitofwork.memberRepostiory.CreateFromExcel(fansFromExcel);

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);

                return Unauthorized();
            }

            return NoContent();



        }
        [HttpPost]


        public async Task<ActionResult> Post([FromForm] Member degafi)
        {

            try
            {

                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.verify(jwt);
                Guid userId = Guid.Parse(token.Issuer);


                degafi.ID = Guid.NewGuid();
                degafi.createdAt = DateTime.UtcNow;
                degafi.createdBy = userId;


                await _unitofwork.memberRepostiory.Create(degafi);

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);

                return Unauthorized();
            }

            return NoContent();



        }

        //[HttpPost("regiserPayment")]


        //public async Task<ActionResult> PostPayment([FromForm] Payment payment)
        //{

        //    try
        //    {

        //        var jwt = Request.Cookies["jwt"];
        //        var token = _jwtService.verify(jwt);
        //        Guid userId = Guid.Parse(token.Issuer);


        //        payment.ID = Guid.NewGuid();
        //        payment.createdAt = DateTime.UtcNow;
        //        payment.createdBy = userId;


        //        await _unitofwork.degafiRepostiory.CreatePayment(payment);

        //    }
        //    catch (Exception e)
        //    {
        //        Console.WriteLine(e.Message);

        //        return Unauthorized();
        //    }

        //    return NoContent();



        //}
        [HttpGet("getDate")]
        public string getDate()
        {

            return _unitofwork.memberRepostiory.getDate();
        }

        [HttpGet("getPenality")]

        public double getPenality(string startDate, Guid degafiId)
        {
            return _unitofwork.memberRepostiory.getPenality(startDate, degafiId);
        }

        [HttpPut]
        public async Task<ActionResult> Update([FromForm] Member degafi)
        {

            try
            {

                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.verify(jwt);
                Guid userId = Guid.Parse(token.Issuer);


                degafi.createdBy = userId;


                await _unitofwork.memberRepostiory.Update(degafi);

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
