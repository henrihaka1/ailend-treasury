using AILendTreasury.Data;
using AILendTreasury.Data.Entities;
using AILendTreasury.Services.DTO;
using AILendTreasury.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AILendTreasury.Services
{
    public class FXService : IFXService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IBalanceService _balanceService;

        public FXService(IUnitOfWork unitOfWork, IBalanceService balanceService)
        {
            _unitOfWork = unitOfWork;
            _balanceService = balanceService;
        }

        public async Task<List<FxTransactionDTO>> GetSalesTransactions(DateTime targetDate)
        {
            List<FX> fx = await _unitOfWork.FxTransactions.GetAllTransactions(targetDate);
            List<FxTransactionDTO> transactionList = new List<FxTransactionDTO>();

            foreach (var transaction in fx)
            {

                FxTransactionDTO singleTransaction = new FxTransactionDTO()
                {
                    ApprovedBy = transaction.ApprovedBy,
                    BoughtCurrency = transaction.BoughtCurrency,
                    CreatedDate = transaction.CreatedDate,
                    Customer = transaction.Bank,
                    ExchangeRate = transaction.ExchangeRate,
                    SoldAmount = transaction.SoldAmount,
                    SoldCurrency = transaction.SoldCurrency,
                    BoughtAmount = transaction.SoldAmount * transaction.ExchangeRate,
                    Type = "automatic"
                };
                transactionList.Add(singleTransaction);
            }
            return transactionList;
        }

        public async Task<FxTransactionDTO> InsertSalesTransaction(FxTransactionDTO newTransaction)
        {
            Staff staffMember = new Staff()
            {
                Department = "sales",
                Email = "henri.haka@fti.edu.al",
                FirstName = "Henri",
                LastName = "Haka",
                KeycloakId = "asdasdadasd",
            };

            FX fxTransaction = new FX()
            {
                ApprovedBy = staffMember,
                BoughtAmount = newTransaction.SoldAmount * newTransaction.ExchangeRate,
                BoughtCurrency = newTransaction.BoughtCurrency,
                CreatedDate = newTransaction.CreatedDate,
                Bank = newTransaction.Customer,
                ExchangeRate = newTransaction.ExchangeRate,
                SoldAmount = newTransaction.SoldAmount,
                SoldCurrency = newTransaction.SoldCurrency,
                Position = await _unitOfWork.Positions.GetLatestPosition()
            };
            BalanceDTO updatedBalance = await _balanceService.PrepareBalance(newTransaction);
            _unitOfWork.FxTransactions.Add(fxTransaction);
            _unitOfWork.SaveChanges();
            return newTransaction;
        }
    }
}
