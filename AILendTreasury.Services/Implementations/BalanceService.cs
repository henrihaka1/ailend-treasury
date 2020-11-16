using AILendTreasury.Data;
using AILendTreasury.Data.Entities;
using AILendTreasury.Services.DTO;
using AILendTreasury.Services.Interfaces;
using System;
using System.Text.Json;
using System.Threading.Tasks;
using AILendTreasury.Services.Utility_Functions;
using System.Runtime.Serialization.Json;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Nancy.Json;

namespace AILendTreasury.Services.Implementations
{
    public class BalanceService : IBalanceService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPositionService _positionService;
        public BalanceService(IUnitOfWork unitOfWork, IPositionService positionService)
        {
            _unitOfWork = unitOfWork;
            _positionService = positionService;
        }

        public async Task<BalanceDTO> GetLatestBalance(DateTime today)
        {
            Position position = await _unitOfWork.Positions.GetLatestPosition();
            BalanceDTO startingBalance = new BalanceDTO();
            if (position.SubmitedDate.Year == today.Year &&
               position.SubmitedDate.Month == today.Month &&
               position.SubmitedDate.Day == today.Day)
            {
                Balance currentStartingBalance = await _unitOfWork.Balances.GetLatestBalanceByPositionId(position.Id);
                startingBalance.SubmitedDate = currentStartingBalance.SubmitedDate;
                startingBalance.Balance = Utility.JsonToString(currentStartingBalance.CurrentBalance);
            }
            return startingBalance;
        }

        public async Task<BalanceDTO> GetStartingBalance(DateTime today)
        {
            Position position = await _unitOfWork.Positions.GetLatestPosition();
            BalanceDTO startingBalance = new BalanceDTO();
            if (position.SubmitedDate.Year ==today.Year &&
               position.SubmitedDate.Month == today.Month &&
               position.SubmitedDate.Day ==today.Day)
            {
                Balance currentStartingBalance = await _unitOfWork.Balances.GetStartingBalanceByPositionId(position.Id);
                startingBalance.SubmitedDate = currentStartingBalance.SubmitedDate;
                startingBalance.Balance = Utility.JsonToString(currentStartingBalance.CurrentBalance);
            }
            return startingBalance;
        }

        public async Task<BalanceDTO> PrepareBalance(SalesTransactionDTO newTransaction)
        {
            DateTime currentDate = DateTime.Today;
            Position latestPosition = await _unitOfWork.Positions.GetLatestPosition();

            BalanceDTO updatedBalance = new BalanceDTO();

            if (latestPosition.SubmitedDate.Year == currentDate.Year &&
            latestPosition.SubmitedDate.Month == currentDate.Month &&
            latestPosition.SubmitedDate.Day == currentDate.Day)
            {
                JsonDocument latestBalanceJson = _unitOfWork.Balances.GetLatestBalanceByPositionId(latestPosition.Id).Result.CurrentBalance;
                string temp = latestBalanceJson.RootElement.ToString();
                var boughtCurrency = newTransaction.BoughtCurrency;
                var soldCurrency = newTransaction.SoldCurrency;

                DataContractJsonSerializer ser = new DataContractJsonSerializer(typeof(List<CurrencyBalanceDTO>));
                MemoryStream stream = new MemoryStream(Encoding.UTF8.GetBytes(temp));
                var obj = (List<CurrencyBalanceDTO>)ser.ReadObject(stream);
                    
                foreach(CurrencyBalanceDTO item in obj)
                {
                    if(item.label==soldCurrency)
                    {
                        item.amount += newTransaction.SoldAmount;
                    }
                    if(item.label==boughtCurrency)
                    {
                        item.amount -= newTransaction.SoldAmount * newTransaction.ExchangeRate;
                    }
                }

                var json = new JavaScriptSerializer().Serialize(obj);

                updatedBalance.SubmitedDate = DateTime.Now;
                updatedBalance.Balance = json;
            }
            return await UpdateBalance(updatedBalance);            
        }

        public async Task<BalanceDTO> UpdateBalance(BalanceDTO newBalance)
        {
            Balance balanceToSave = new Balance()
            {
                CurrentBalance = JsonDocument.Parse(newBalance.Balance),
                SubmitedDate = newBalance.SubmitedDate
            };

            DateTime currentDate = newBalance.SubmitedDate;
            Position latestPosition = await _unitOfWork.Positions.GetLatestPosition();

            if(latestPosition.SubmitedDate.Year == currentDate.Year &&
            latestPosition.SubmitedDate.Month ==currentDate.Month &&
            latestPosition.SubmitedDate.Day ==currentDate.Day)
            {
                balanceToSave.Position = latestPosition;
                _unitOfWork.Balances.Add(balanceToSave);
                _unitOfWork.SaveChanges();
                return newBalance;
            }
            else
            {
                Position newPosition = new Position()
                {
                    SubmitedDate = currentDate,
                };

                _positionService.AddNewPosition(newPosition);
                balanceToSave.Position = await _unitOfWork.Positions.GetLatestPosition();
                _unitOfWork.Balances.Add(balanceToSave);
                _unitOfWork.SaveChanges();
                return newBalance;
            }
        }
    }
}
