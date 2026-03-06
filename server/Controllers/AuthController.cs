using Microsoft.AspNetCore.Mvc;
using Ride2Gedda.Models;
using Ride2Gedda.Services;
using Ride2Gedda.Dto;
using Microsoft.AspNetCore.Identity;

namespace Ride2Gedda.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(
        AuthService service,
        UserManager<ApplicationUser> userManager) : ControllerBase
    {
        private readonly AuthService _service = service;
        private readonly UserManager<ApplicationUser> _userManager = userManager;


        [HttpPost("register")]
        public async Task<ActionResult<ApplicationUser>> RegisterAsync(RegisterRequestDto dto)
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


        [HttpPost("login")]

        public async Task<ActionResult<LoginResponseDto>> LoginAsync([FromBody] LoginRequestDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _service.LoginAsync(dto);

            if (result is null)
            {
                return Unauthorized();
            }

            if (!string.IsNullOrEmpty(result.ErrorMessage))
            {
                return BadRequest(new ProblemDetails
                {
                    Title = "Login Error",
                    Status = StatusCodes.Status401Unauthorized,
                    Detail = result.ErrorMessage
                });
            }

            if (string.IsNullOrEmpty(result.AccessToken))
            {
                return BadRequest(new ProblemDetails
                {
                    Title = "Login Error",
                    Status = StatusCodes.Status400BadRequest,
                    Detail = "Failed to generate access token"
                });
            }

            if (!string.IsNullOrEmpty(result.RefreshToken))
            {
                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    Expires = result.RefreshTokenExpiry
                };

                Response.Cookies.Append("refresh_token", result.RefreshToken, cookieOptions);
            }

            return Ok(new AuthResponse(result.AccessToken));
        }
    }
}
