using AILendTreasury.Data.Entities;
using AILendTreasury.Data.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace AILendTreasury.Data.Repositories.Implementations
{
    public class StaffRepository: Repository<Staff>, IStaffRepository
    {
        private readonly ApplicationDbContext _context;
        public StaffRepository(ApplicationDbContext context) :base(context)
        {
            _context = context;
        }

    }
}
