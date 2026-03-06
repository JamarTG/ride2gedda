using System.Security.Claims;
using Ride2Gedda.Dto;
using Ride2Gedda.Models;

namespace Ride2Gedda.Services
{
    public interface IJwtService
    {
        string GenerateAccessToken(ApplicationUser user);
        string GenerateRefreshToken();
        ClaimsPrincipal? ValidateAccessToken(string token);
    }

}
