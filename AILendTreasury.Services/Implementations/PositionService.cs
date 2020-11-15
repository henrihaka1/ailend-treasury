using AILendTreasury.Data;
using AILendTreasury.Data.Entities;
using AILendTreasury.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AILendTreasury.Services.Implementations
{
    public class PositionService : IPositionService
    {
        private readonly IUnitOfWork _unitOfWork;
        public PositionService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public void AddNewPosition(Position positionToAdd)
        {
            _unitOfWork.Positions.Add(positionToAdd);
            _unitOfWork.SaveChanges();
            return;
        }
    }
}
