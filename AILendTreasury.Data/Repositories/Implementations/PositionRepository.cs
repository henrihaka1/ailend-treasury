using AILendTreasury.Data.Entities;
using AILendTreasury.Data.Repositories.Interfaces;
using System;
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
            Position position = new Position();
            position = _context.Positions.Where(x => x.SubmitedDate.Date.ToString() == Date).FirstOrDefault();
            return position;
        }
    }
}
