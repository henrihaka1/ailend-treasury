using AILendTreasury.Data.Entities;
using AILendTreasury.Data.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace AILendTreasury.Data.Repositories.Implementations
{
    public class AutomaticRepository: Repository<Automatic>, IAutomaticRepository
    {
        private readonly ApplicationDbContext _context;
        public AutomaticRepository(ApplicationDbContext context) :base(context)
        {
            _context = context;
        }
    }
}
