using Microsoft.AspNetCore.Identity;
using Ride2Gedda.Dto;
using Ride2Gedda.Models;

namespace Ride2Gedda.Services
{
    public class AuthService(
        UserManager<ApplicationUser> userManager,
        JwtService jwtService,
        Ride2GeddaDBContext dBContext) : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager = userManager;
        private readonly JwtService _jwtService = jwtService;
        private readonly Ride2GeddaDBContext _dbContext = dBContext;

        public async Task<RegisterResponseDto> RegisterAsync(RegisterRequestDto dto)
        {
            var existingUser = await _userManager.FindByEmailAsync(dto.Email);


            if (existingUser is not null)
            {
                return new RegisterResponseDto
                {
                    ErrorMessage = "User with this email already exists"
                };

            }


            ApplicationUser newUser = new()
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                UserName = dto.Email
            };

            var results = await _userManager.CreateAsync(newUser, dto.Password);

            if (!results.Succeeded)
            {

                return new RegisterResponseDto
                {
                    ErrorMessage = results.Errors.First().Description
                };
            }


            return new RegisterResponseDto()
            {
                Id = newUser.Id,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                SuccessMessage = "User registered successfully"
            };

        }


        public async Task<LoginResponseDto> LoginAsync(LoginRequestDto dto)
        {
            ApplicationUser? user = await _userManager.FindByEmailAsync(dto.Email);

            if (user is null)
            {
                Console.WriteLine("here");
                return new()
                {
                    ErrorMessage = "Login failed"
                };
            }

            bool isPasswordValid = await _userManager.CheckPasswordAsync(user, dto.Password);

            if (!isPasswordValid)
            {
                Console.WriteLine("here");
                return new() { ErrorMessage = "Login failed" };
            }

            if (string.IsNullOrEmpty(user.Email))
            {
                Console.WriteLine("her2");
                return new() { ErrorMessage = "Login failed" };
            }

            string accessToken = _jwtService.GenerateAccessToken(user);
            string refreshToken = _jwtService.GenerateRefreshToken();
            var refreshTokenExpiry = DateTime.UtcNow.AddDays(7);

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiry = refreshTokenExpiry;

            await _dbContext.SaveChangesAsync();

            return new()
            {
                Id = user.Id,
                Email = user.Email,
                RefreshToken = refreshToken,
                RefreshTokenExpiry = refreshTokenExpiry,
                AccessToken = accessToken,
                SuccessMessage = "Login successful"
            };
        }
    }
}