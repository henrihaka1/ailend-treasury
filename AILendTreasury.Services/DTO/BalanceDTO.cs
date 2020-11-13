using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;

namespace AILendTreasury.Services.DTO
{
    public class BalanceDTO
    {
        public DateTime SubmitedDate { get; set; }
        public string Balance { get; set; }
    }
}
