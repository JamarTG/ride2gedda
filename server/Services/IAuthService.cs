using Ride2Gedda.Dto;

namespace Ride2Gedda.Services
{
    public interface IAuthService
    {
        Task<RegisterResponseDto> RegisterAsync (RegisterDto dto);
    }
}