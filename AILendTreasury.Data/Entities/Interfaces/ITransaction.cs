using System;
using System.Collections.Generic;
using System.Text;

namespace AILendTreasury.Data.Entities.Interfaces
{
    public interface ITransaction
    {
        string SoldCurrency { get; set; }
        string BoughtCurrency { get; set; }
        double SoldAmount { get; set; }
        double BoughtAmount { get; set; }
        float ExchangeRate { get; set; }
        DateTime CreatedDate { get; set; }
    }
}
