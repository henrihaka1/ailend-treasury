using System;
using System.Collections.Generic;
using System.Text;

namespace AILendTreasury.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        readonly ApplicationDbContext _context;

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
        }
        public int SaveChanges()
        {

            return _context.SaveChanges();
        }
    }
}
