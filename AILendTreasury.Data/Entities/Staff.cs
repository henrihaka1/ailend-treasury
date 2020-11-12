﻿using System;
using System.Collections.Generic;
using System.Text;

namespace AILendTreasury.Data.Entities
{
    public class Staff
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string KeycloakId { get; set; }
        public string Department { get; set; }
    }
}