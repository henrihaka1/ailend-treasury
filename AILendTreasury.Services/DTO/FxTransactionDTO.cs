using AILendTreasury.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AILendTreasury.Services.DTO
{
    public class FxTransactionDTO
    {
        public string SoldCurrency { get; set; }
        public string BoughtCurrency { get; set; }
        public double SoldAmount { get; set; }
        public float ExchangeRate { get; set; }
        public double BoughtAmount { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Customer { get; set; }
        public Staff ApprovedBy { get; set; }
        public string Type { get; set; }
    }
}
