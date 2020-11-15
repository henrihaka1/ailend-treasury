using AILendTreasury.Data;
using AILendTreasury.Data.Entities;
using AILendTreasury.Services.DTO;
using AILendTreasury.Services.Interfaces;
using System;
using System.Text.Json;
using System.Threading.Tasks;
using AILendTreasury.Services.Utility_Functions;

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
