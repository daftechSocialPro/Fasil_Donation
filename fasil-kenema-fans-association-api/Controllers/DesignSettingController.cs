using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FasilDonationAPI.Entities;
using FasilDonationAPI.Helpers;
using FasilDonationAPI.Services;
using FasilDonationAPI.Dtos;

namespace FasilDonationAPI.Controllers
{
    [Route("api/DesignSetting")]
    [ApiController]
    public class DesignSettingController : ControllerBase
    {



        private readonly IUnitOfWork _unitofwork;
        private readonly JwtService _jwtService;
        public DesignSettingController(IUnitOfWork unitOfWork, JwtService jwtService)
        {


            _unitofwork = unitOfWork;
            _jwtService = jwtService;


        }
        [HttpGet]

        public List<DesignSetting> GetAll()
        {


            return _unitofwork.designSettingRepository.GetAll();
        }


        [HttpGet("GetTemplate")]

        public IdTemplate GetTemplateById()
        {

            return _unitofwork.designSettingRepository.getTemplateById();
        }






            [HttpPost]


        public async Task<ActionResult> Post([FromForm] DesignSetting desetting)
        {

            try
            {

                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.verify(jwt);
                Guid userId = Guid.Parse(token.Issuer);


                desetting.ID = Guid.NewGuid();
                desetting.createdAt = DateTime.UtcNow;
                desetting.createdBy = userId;


                await _unitofwork.designSettingRepository.Create(desetting);

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);

                return Unauthorized();
            }

            return NoContent();



        }

        [HttpPost("IdTemplate")]


        public async Task<ActionResult> Post([FromForm] IdTemplate idTemplate)
        {

            try
            {

                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.verify(jwt);
                Guid userId = Guid.Parse(token.Issuer);


                idTemplate.ID = Guid.NewGuid();
                idTemplate.createdAt = DateTime.UtcNow;
                idTemplate.createdBy = userId;


                
                


                await _unitofwork.designSettingRepository.Create(idTemplate);

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);

                return Unauthorized();
            }

            return NoContent();



        }


        [HttpGet("getTemplateClient")]


        public List<MembershipDto> GetTemplateClient()
        {

            return _unitofwork.designSettingRepository.GetTemplateClient();
        }




        [HttpPut]
        public async Task<ActionResult> Update([FromForm] DesignSetting desetting)
        {

            try
            {

                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.verify(jwt);
                Guid userId = Guid.Parse(token.Issuer);


                desetting.createdBy = userId;
                desetting.updatedAt = DateTime.UtcNow;


                await _unitofwork.designSettingRepository.Update(desetting);

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);

                return Unauthorized();
            }

            return NoContent();





        }




        [HttpPut("IdTemplate")]
        public async Task<ActionResult> Update([FromForm] IdTemplate idTemplate)
        {

            try
            {

                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.verify(jwt);
                Guid userId = Guid.Parse(token.Issuer);


                idTemplate.createdBy = userId;
                idTemplate.updatedAt = DateTime.UtcNow;


                await _unitofwork.designSettingRepository.Update(idTemplate);

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);

                return Unauthorized();
            }

            return NoContent();





        }


        [HttpDelete]

        public async Task<ActionResult> Delete(Guid desetingId)
        {

            try
            {
                await _unitofwork.designSettingRepository.Delete(desetingId);


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
