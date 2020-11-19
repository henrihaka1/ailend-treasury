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
            if ((newTransaction.SoldAmount > 50000 && newTransaction.SoldCurrency!="ALL") || (newTransaction.SoldAmount > 500000 && newTransaction.SoldCurrency == "ALL"))
            {
                Staff staffMember = new Staff()
                {
                    Department = "sales",
                    Email = "henri.haka@fti.edu.al",
                    FirstName = "Henri",
                    LastName = "Haka",
                    KeycloakId = "asdasdadasd",
                };

                Manual manualTransaction = new Manual()
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
                _unitOfWork.ManualTransactions.Add(manualTransaction);
                _unitOfWork.SaveChanges();
                return updatedBalance;
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
        public async Task<List<SalesTransactionDTO>> GetSalesTransactionsByFilter(string firstCurrency, string secondCurrency, DateTime targetDate)
        {
            List<Automatic> automatic = await _unitOfWork.AutomaticTransactions.GetAllTransactionsByFilter(firstCurrency, secondCurrency);
            List<Manual> manuals = await _unitOfWork.ManualTransactions.GetAllTransactionsByFilter(firstCurrency, secondCurrency);
            List<SalesTransactionDTO> transactionList = new List<SalesTransactionDTO>();
            foreach(var transaction in automatic)
            {
                if(transaction.CreatedDate.Year == targetDate.Year && transaction.CreatedDate.Month == targetDate.Month && transaction.CreatedDate.Day == targetDate.Day)
                {
                    SalesTransactionDTO singleTransaction = new SalesTransactionDTO()
                    {
                        ApprovedBy = transaction.ApprovedBy,
                        BoughtCurrency = transaction.BoughtCurrency,
                        CreatedDate = transaction.CreatedDate,
                        Customer = transaction.Customer,
                        ExchangeRate = transaction.ExchangeRate,
                        SoldAmount = transaction.SoldAmount,
                        SoldCurrency = transaction.SoldCurrency,
                        BoughtAmount = transaction.SoldAmount * transaction.ExchangeRate,
                    };
                    transactionList.Add(singleTransaction);
                }
            }
            foreach (var transaction in manuals)
            {
                if (transaction.CreatedDate.Year == targetDate.Year && transaction.CreatedDate.Month == targetDate.Month && transaction.CreatedDate.Day == targetDate.Day)
                {
                    SalesTransactionDTO singleTransaction = new SalesTransactionDTO()
                    {
                        ApprovedBy = transaction.ApprovedBy,
                        BoughtCurrency = transaction.BoughtCurrency,
                        CreatedDate = transaction.CreatedDate,
                        Customer = transaction.Customer,
                        ExchangeRate = transaction.ExchangeRate,
                        SoldAmount = transaction.SoldAmount,
                        SoldCurrency = transaction.SoldCurrency,
                        BoughtAmount = transaction.SoldAmount * transaction.ExchangeRate,
                    };
                    transactionList.Add(singleTransaction);
                }
            }
            return transactionList;
        }

        public async Task<List<SalesTransactionDTO>> GetSalesTransactions(DateTime targetDate)
        {
            List <Automatic> automatics = await _unitOfWork.AutomaticTransactions.GetAllTransactions(targetDate);
            List <Manual> manuals = await _unitOfWork.ManualTransactions.GetAllTransactions(targetDate);
            List<SalesTransactionDTO> transactionList = new List<SalesTransactionDTO>();

            foreach (var transaction in automatics)
            {

                SalesTransactionDTO singleTransaction = new SalesTransactionDTO()
                {
                    ApprovedBy = transaction.ApprovedBy,
                    BoughtCurrency = transaction.BoughtCurrency,
                    CreatedDate = transaction.CreatedDate,
                    Customer = transaction.Customer,
                    ExchangeRate = transaction.ExchangeRate,
                    SoldAmount = transaction.SoldAmount,
                    SoldCurrency = transaction.SoldCurrency,
                    BoughtAmount = transaction.SoldAmount * transaction.ExchangeRate,
                    Type = "automatic"
                };
                transactionList.Add(singleTransaction);
            }
            foreach (var transaction in manuals)
            {
                
                SalesTransactionDTO singleTransaction = new SalesTransactionDTO()
                {
                    ApprovedBy = transaction.ApprovedBy,
                    BoughtCurrency = transaction.BoughtCurrency,
                    CreatedDate = transaction.CreatedDate,
                    Customer = transaction.Customer,
                    ExchangeRate = transaction.ExchangeRate,
                    SoldAmount = transaction.SoldAmount,
                    SoldCurrency = transaction.SoldCurrency,
                    BoughtAmount = transaction.SoldAmount * transaction.ExchangeRate,
                    Type = "manual",
                };
                transactionList.Add(singleTransaction);
            }
            return transactionList;
        }
    }
}
