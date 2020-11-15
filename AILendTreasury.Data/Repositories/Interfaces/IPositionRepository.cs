using AILendTreasury.Data.Entities;
using System;
using System.Threading.Tasks;

namespace AILendTreasury.Data.Repositories.Interfaces
{
    public interface IPositionRepository: IRepository<Position>
    {
        public Task<Position> GetPositionByDate(string Date);
        public Task<Position> GetPositionByDate(DateTime Date);
        public Task<Position> GetLatestPosition();
    } 
}
