using System;
using System.Collections.Generic;
using System.Text;

namespace AILendTreasury.Data.Entities.Interfaces
{
    public interface ITransaction
    {
        string SoldCurrency { get; set; }
        string BoughtCurrency { get; set; }
        long SoldAmount { get; set; }
        long BoughtAmount { get; set; }
        float ExchangeRate { get; set; }
        DateTime CreatedDate { get; set; }
    }
}
