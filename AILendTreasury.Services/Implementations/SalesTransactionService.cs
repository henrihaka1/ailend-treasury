using AILendTreasury.Data;
using AILendTreasury.Data.Entities;
using AILendTreasury.Services.DTO;
using AILendTreasury.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AILendTreasury.Services.Implementations
{
    public class SalesTransactionService : ISalesTransactionService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IBalanceService _balanceService;
        public SalesTransactionService(IUnitOfWork unitOfWork, IBalanceService balanceService)
        {
            _unitOfWork = unitOfWork;
            _balanceService = balanceService; 
        }

        public async Task<BalanceDTO> InsertSalesTransaction(SalesTransactionDTO newTransaction)
        {
            if (newTransaction.SoldAmount > 50000)
            {
                return new BalanceDTO();
            }
            else
            {
                Staff staffMember = new Staff()
                {
                    Department = "sales",
                    Email = "henri.haka@fti.edu.al",
                    FirstName = "Henri",
                    LastName = "Haka",
                    KeycloakId = "asdasdadasd",
                };

                //automatic
                Automatic automaticTransaction = new Automatic()
                {
                    ApprovedBy = staffMember,
                    BoughtAmount = newTransaction.SoldAmount * newTransaction.ExchangeRate,
                    BoughtCurrency = newTransaction.BoughtCurrency,
                    CreatedDate = newTransaction.CreatedDate,
                    Customer = newTransaction.Customer,
                    ExchangeRate = newTransaction.ExchangeRate,
                    SoldAmount = newTransaction.SoldAmount,
                    SoldCurrency = newTransaction.SoldCurrency,
                    Position = await _unitOfWork.Positions.GetLatestPosition()
                };
                BalanceDTO updatedBalance = await _balanceService.PrepareBalance(newTransaction);
                _unitOfWork.AutomaticTransactions.Add(automaticTransaction);
                _unitOfWork.SaveChanges();
                return updatedBalance;

            }
        }
    }
}
