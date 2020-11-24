using AILendTreasury.Services.DTO;
using AspNetCore.ServiceRegistration.Dynamic;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AILendTreasury.Services.Interfaces
{
    public interface IBalanceService : IScopedService
    {
        public Task<BalanceDTO> UpdateBalance(BalanceDTO newBalance);
        public Task<BalanceDTO> GetStartingBalance(DateTime today);
        public Task<BalanceDTO> GetLatestBalance(DateTime today);
        public Task<BalanceDTO> PrepareBalance(SalesTransactionDTO newTransaction);
        public Task<BalanceDTO> PrepareBalance(FxTransactionDTO newTransaction);
        public Task<List<BalanceDTO>> GetBalances();
        public Task<List<BalanceDTO>> GetTodayBalances();
    }
}
