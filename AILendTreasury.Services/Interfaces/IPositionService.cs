using AILendTreasury.Data.Entities;
using AspNetCore.ServiceRegistration.Dynamic;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AILendTreasury.Services.Interfaces
{
    public interface IPositionService :IScopedService
    {
        public void AddNewPosition(Position positionToAdd);
    }
}
