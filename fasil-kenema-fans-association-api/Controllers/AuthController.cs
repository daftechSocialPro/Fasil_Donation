using Microsoft.AspNetCore.Mvc;
using FasilDonationAPI.Services;
using FasilDonationAPI.Dtos;
using FasilDonationAPI.Entities;
using FasilDonationAPI.Helpers;

namespace FasilDonationAPI.Controllers
{
    [Route("api/users")]
    [ApiController]

    public class AuthController : Controller
    {

        private readonly IUnitOfWork _unitofwork;
        private readonly JwtService _jwtService;
        public AuthController(IUnitOfWork unitOfWork, JwtService jwtService)
        {
            _unitofwork = unitOfWork;
            _jwtService = jwtService;

        }
        [HttpGet]
        public IActionResult Hello()
        {

            return Ok("success");
        }

        [HttpPost("register")]

        public IActionResult Register(RegisterDto dto)
        {

            Guid id = Guid.NewGuid();

            var user = new User
            {

                ID = id,
                fullName = dto.fullName,
                email = dto.email,
                password = BCrypt.Net.BCrypt.HashPassword(dto.password),
                createdAt = DateTime.UtcNow,
                createdBy = id
            };



            return Created("success", _unitofwork.userRepository.Create(user));
        }

        [HttpPost("login")]

        public IActionResult Login(LoginDto dto)
        {

            var user = _unitofwork.userRepository.GetByEmail(dto.email);

            if (user == null) return BadRequest(new { message = "Invalid Credentials" });

            if (!BCrypt.Net.BCrypt.Verify(dto.password, user.password)) return BadRequest(new { message = "Invalid Credentials" });

            var jwt = _jwtService.Generate(user.ID);

            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true
            });

            return Ok(new
            {
                message = "success"
            });



        }

        [HttpGet("user")]
        public new IActionResult User()
        {


            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _jwtService.verify(jwt);


                Guid userId = Guid.Parse(token.Issuer);

                var user = _unitofwork.userRepository.GetById(userId);


                return Ok(user);
            }
            catch
            {

                return Unauthorized();

            }


        }
    







        [HttpPost("logout")]
        public IActionResult Logout()
        {


            Response.Cookies.Delete("jwt");
            return Ok(
                new
                {
                    message = "Success"
                }
            );
        }

    }



}