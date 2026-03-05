using Microsoft.AspNetCore.Mvc;
using Ride2Gedda.Models;
using Ride2Gedda.Services;
using Ride2Gedda.Dto;

namespace Ride2Gedda.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(AuthService service) : ControllerBase
    {
        private readonly AuthService _service = service;

        [HttpPost("register")]
        public async Task<ActionResult<ApplicationUser>> RegisterAsync(RegisterDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            RegisterResponseDto registerResult = await _service.RegisterAsync(dto);

            if (!string.IsNullOrEmpty(registerResult.ErrorMessage))
            {
                return BadRequest(new ProblemDetails
                {
                    Title = "Registration Error",
                    Status = StatusCodes.Status400BadRequest,
                    Detail = registerResult.ErrorMessage,
                });

            }

            return Ok(registerResult);
        }



    }
}
