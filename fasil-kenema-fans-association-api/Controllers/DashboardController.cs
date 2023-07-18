using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FasilDonationAPI.Services;
using FasilDonationAPI.Services.Dashboard;

namespace FasilDonationAPI.Controllers
{
    [Route("api/dashboard")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public  DashboardController(IUnitOfWork unitOfWork)
        {

            _unitOfWork=unitOfWork;


        }
        [HttpGet]

        public  DashboardWidget GetAll(Guid userId)
        {


            return _unitOfWork.dashboardRepository.GetAll(userId);
        }

        [HttpGet("table")]

        public List<DashboardTable> GetAll()
        {

            return _unitOfWork.dashboardRepository.GetTable();
        }



    }
}
