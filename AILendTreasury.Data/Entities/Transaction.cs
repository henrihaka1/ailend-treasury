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
        public double SoldAmount { get; set; }
        public double BoughtAmount { get; set; }
        public float ExchangeRate { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
