using AILendTreasury.Services.DTO;
using AspNetCore.ServiceRegistration.Dynamic;
using System.Threading.Tasks;

namespace AILendTreasury.Services.Interfaces
{
    public interface IBalanceService : IScopedService
    {
        public Task<BalanceDTO> UpdateBalance(BalanceDTO newBalance);
    }
}
