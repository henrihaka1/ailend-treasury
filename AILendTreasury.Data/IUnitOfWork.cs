using System;
using System.Collections.Generic;
using System.Text;

namespace AILendTreasury.Data
{
    public interface IUnitOfWork
    {
        int SaveChanges();
    }
}
