using Ride2Gedda.Dto;

namespace Ride2Gedda.Services
{
    public interface IAuthService
    {
        Task<RegisterDto> RegisterAsync (RegisterDto dto);
    }
}