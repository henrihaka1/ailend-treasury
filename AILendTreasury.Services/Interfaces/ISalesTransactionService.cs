using AILendTreasury.Services.DTO;
using AspNetCore.ServiceRegistration.Dynamic;
using System.Threading.Tasks;

namespace AILendTreasury.Services.Interfaces
{
    public interface ISalesTransactionService : IScopedService
    {
        public Task<BalanceDTO> InsertSalesTransaction(SalesTransactionDTO newTransaction);
    }
}
