using AILendTreasury.Services.DTO;
using AspNetCore.ServiceRegistration.Dynamic;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AILendTreasury.Services.Interfaces
{
    public interface IFXService : IScopedService
    {
        public Task<FxTransactionDTO> InsertSalesTransaction(FxTransactionDTO newTransaction);
        public Task<List<FxTransactionDTO>> GetSalesTransactions(DateTime targetDate);
    }
}
