﻿using AILendTreasury.Services.DTO;
using AspNetCore.ServiceRegistration.Dynamic;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AILendTreasury.Services.Interfaces
{
    public interface ISalesTransactionService : IScopedService
    {
        public Task<BalanceDTO> InsertSalesTransaction(SalesTransactionDTO newTransaction);

        public Task<List<SalesTransactionDTO>> GetSalesTransactionsByFilter(string firstCurrency, string secondCurrency);
    }
}
