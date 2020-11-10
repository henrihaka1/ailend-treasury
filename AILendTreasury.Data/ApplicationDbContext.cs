﻿using AILendTreasury.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace AILendTreasury.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

    }
}
