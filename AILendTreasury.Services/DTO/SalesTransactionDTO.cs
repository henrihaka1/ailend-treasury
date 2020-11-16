using AILendTreasury.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AILendTreasury.Services.DTO
{
    public class SalesTransactionDTO
    {
        public string SoldCurrency { get; set; }
        public string BoughtCurrency { get; set; }
        public long SoldAmount { get; set; }
        public float ExchangeRate { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Customer { get; set; }
        public Staff ApprovedBy { get; set; }
    }
}
