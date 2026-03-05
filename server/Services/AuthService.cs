using Microsoft.AspNetCore.Identity;
using Ride2Gedda.Dto;
using Ride2Gedda.Models;

namespace Ride2Gedda.Services
{
    public class AuthService(UserManager<ApplicationUser> userManager) : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager = userManager;

        public async Task<RegisterDto> RegisterAsync (RegisterDto dto)
        {
            var existingUser = await _userManager.FindByEmailAsync(dto.Email);

            if(existingUser is not null)
            {
                return new RegisterDto
                {
                    ErrorMessage = "User with this email already exists"
                };
            } 


            ApplicationUser newUser = new()
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
            };

            var results = await _userManager.CreateAsync(newUser, dto.Password);
            
            if(!results.Succeeded){
                return new RegisterDto
                {
                    ErrorMessage = string.Join(", ", results.Errors.Select(e => e.Description)) 
                };
            } 


            return new RegisterDto()
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                SuccessMessage = "User registered successfully"
            };

        }
    }
}