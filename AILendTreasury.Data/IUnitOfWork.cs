using AILendTreasury.Data.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace AILendTreasury.Data
{
    public interface IUnitOfWork
    {
        ICurrenciesRepository Currencies { get;}
        int SaveChanges();
    }
}
