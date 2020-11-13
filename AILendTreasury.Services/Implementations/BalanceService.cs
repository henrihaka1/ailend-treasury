using AILendTreasury.Data;
using AILendTreasury.Data.Entities;
using AILendTreasury.Services.DTO;
using AILendTreasury.Services.Interfaces;
using System.Text.Json;
using System.Threading.Tasks;

namespace AILendTreasury.Services.Implementations
{
    public class BalanceService : IBalanceService
    {
        private readonly IUnitOfWork _unitOfWork;
        public BalanceService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BalanceDTO> UpdateBalance(BalanceDTO newBalance)
        {
            Balance balanceToSave = new Balance()
            {
                CurrentBalance = JsonDocument.Parse(newBalance.Balance),
                SubmitedDate = newBalance.SubmitedDate
            };



            _unitOfWork.Balances.Add(balanceToSave);
            _unitOfWork.SaveChanges();
            return newBalance;
        }
    }
}
