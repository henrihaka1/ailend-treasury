using AILendTreasury.Data.Entities;
using AILendTreasury.Data.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AILendTreasury.Data.Repositories.Implementations
{
    public class PositionRepository : Repository<Position>, IPositionRepository
    {
        private readonly ApplicationDbContext _context;
        public PositionRepository(ApplicationDbContext context) :base(context)
        {
            _context = context;
        }

        public async Task<Position> GetLatestPosition()
        {
            return _context.Positions.OrderByDescending(x => x.Id).FirstOrDefault();
        }

        public async Task<Position> GetPositionByDate(string Date)
        {
            DateTime dateTime = DateTime.Parse(Date);
            return _context.Positions.
                Where(x => x.SubmitedDate.Year ==dateTime.Year 
                && x.SubmitedDate.Month == dateTime.Month
                && x.SubmitedDate.Day == dateTime.Day).FirstOrDefault();
        }

        public async Task<Position> GetPositionByDate(DateTime Date)
        {
            return _context.Positions.
                Where(x => x.SubmitedDate.Year == Date.Year
                && x.SubmitedDate.Month == Date.Month
                && x.SubmitedDate.Day == Date.Day).FirstOrDefault();
        }

        public async Task<List<Position>> GetPositions()
        {
            return _context.Positions.ToList();
        }
    }
}
