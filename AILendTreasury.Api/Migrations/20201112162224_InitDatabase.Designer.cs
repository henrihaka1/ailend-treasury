﻿// <auto-generated />
using System;
using System.Text.Json;
using AILendTreasury.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace AILendTreasury.Api.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20201112162224_InitDatabase")]
    partial class InitDatabase
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("AILendTreasury.Data.Entities.Automatic", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<long>("BoughtAmount")
                        .HasColumnType("bigint");

                    b.Property<string>("BoughtCurrency")
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Customer")
                        .HasColumnType("text");

                    b.Property<float>("ExchangeRate")
                        .HasColumnType("real");

                    b.Property<long>("SoldAmount")
                        .HasColumnType("bigint");

                    b.Property<string>("SoldCurrency")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("AutomaticTransactions");
                });

            modelBuilder.Entity("AILendTreasury.Data.Entities.Balance", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<JsonDocument>("CurrentBalance")
                        .HasColumnType("jsonb");

                    b.Property<int?>("PositionId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("SubmitedDate")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("Id");

                    b.HasIndex("PositionId");

                    b.ToTable("Balances");
                });

            modelBuilder.Entity("AILendTreasury.Data.Entities.Currency", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Label")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Currencies");
                });

            modelBuilder.Entity("AILendTreasury.Data.Entities.Exchange", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int?>("PositionId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("SubmitedDate")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("Id");

                    b.HasIndex("PositionId");

                    b.ToTable("ExchangeRates");
                });

            modelBuilder.Entity("AILendTreasury.Data.Entities.FX", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Bank")
                        .HasColumnType("text");

                    b.Property<long>("BoughtAmount")
                        .HasColumnType("bigint");

                    b.Property<string>("BoughtCurrency")
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<float>("ExchangeRate")
                        .HasColumnType("real");

                    b.Property<long>("SoldAmount")
                        .HasColumnType("bigint");

                    b.Property<string>("SoldCurrency")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("FXTransactions");
                });

            modelBuilder.Entity("AILendTreasury.Data.Entities.Manual", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<long>("BoughtAmount")
                        .HasColumnType("bigint");

                    b.Property<string>("BoughtCurrency")
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Customer")
                        .HasColumnType("text");

                    b.Property<float>("ExchangeRate")
                        .HasColumnType("real");

                    b.Property<long>("SoldAmount")
                        .HasColumnType("bigint");

                    b.Property<string>("SoldCurrency")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("ManualsTransactions");
                });

            modelBuilder.Entity("AILendTreasury.Data.Entities.Outside", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<long>("BoughtAmount")
                        .HasColumnType("bigint");

                    b.Property<string>("BoughtCurrency")
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<float>("ExchangeRate")
                        .HasColumnType("real");

                    b.Property<long>("SoldAmount")
                        .HasColumnType("bigint");

                    b.Property<string>("SoldCurrency")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("OutsideTransacitons");
                });

            modelBuilder.Entity("AILendTreasury.Data.Entities.Position", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime>("SubmitedDate")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("Id");

                    b.ToTable("Positions");
                });

            modelBuilder.Entity("AILendTreasury.Data.Entities.Rate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int?>("ExchangeId")
                        .HasColumnType("integer");

                    b.Property<int>("IndX")
                        .HasColumnType("integer");

                    b.Property<int>("IndY")
                        .HasColumnType("integer");

                    b.Property<int>("Value")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("ExchangeId");

                    b.ToTable("Rates");
                });

            modelBuilder.Entity("AILendTreasury.Data.Entities.Staff", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Department")
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("FirstName")
                        .HasColumnType("text");

                    b.Property<string>("KeycloakId")
                        .HasColumnType("text");

                    b.Property<string>("LastName")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("StaffMembers");
                });

            modelBuilder.Entity("AILendTreasury.Data.Entities.Balance", b =>
                {
                    b.HasOne("AILendTreasury.Data.Entities.Position", null)
                        .WithMany("Balances")
                        .HasForeignKey("PositionId");
                });

            modelBuilder.Entity("AILendTreasury.Data.Entities.Exchange", b =>
                {
                    b.HasOne("AILendTreasury.Data.Entities.Position", null)
                        .WithMany("Exchanges")
                        .HasForeignKey("PositionId");
                });

            modelBuilder.Entity("AILendTreasury.Data.Entities.Rate", b =>
                {
                    b.HasOne("AILendTreasury.Data.Entities.Exchange", null)
                        .WithMany("Rates")
                        .HasForeignKey("ExchangeId");
                });
#pragma warning restore 612, 618
        }
    }
}
