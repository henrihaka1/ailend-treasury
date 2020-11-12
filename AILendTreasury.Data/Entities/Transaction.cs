using AILendTreasury.Data.Entities.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace AILendTreasury.Data.Entities
{
    public class Transaction : ITransaction
    {
        public string SoldCurrency { get; set; }
        public string BoughtCurrency { get; set; }
        public long SoldAmount { get; set; }
        public long BoughtAmount { get; set; }
        public float ExchangeRate { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
