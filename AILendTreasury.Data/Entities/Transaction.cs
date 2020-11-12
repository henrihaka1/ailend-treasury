using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace AILendTreasury.Data.Entities
{
    public class Transaction
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public string BoughtCurrency { get; set; }
        public string SoldCurrency { get; set; }
        public long BoughtAmount { get; set; }
        public long SoldAmount { get; set; }
        [JsonIgnore]
        public User User { get; set; }
        public virtual Customer Customer { get; set; }
    }
}
