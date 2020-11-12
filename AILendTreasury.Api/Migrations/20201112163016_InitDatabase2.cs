using Microsoft.EntityFrameworkCore.Migrations;

namespace AILendTreasury.Api.Migrations
{
    public partial class InitDatabase2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PositionId",
                table: "OutsideTransacitons",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ApprovedById",
                table: "ManualsTransactions",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PositionId",
                table: "ManualsTransactions",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ApprovedById",
                table: "FXTransactions",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PositionId",
                table: "FXTransactions",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ApprovedById",
                table: "AutomaticTransactions",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PositionId",
                table: "AutomaticTransactions",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_OutsideTransacitons_PositionId",
                table: "OutsideTransacitons",
                column: "PositionId");

            migrationBuilder.CreateIndex(
                name: "IX_ManualsTransactions_ApprovedById",
                table: "ManualsTransactions",
                column: "ApprovedById");

            migrationBuilder.CreateIndex(
                name: "IX_ManualsTransactions_PositionId",
                table: "ManualsTransactions",
                column: "PositionId");

            migrationBuilder.CreateIndex(
                name: "IX_FXTransactions_ApprovedById",
                table: "FXTransactions",
                column: "ApprovedById");

            migrationBuilder.CreateIndex(
                name: "IX_FXTransactions_PositionId",
                table: "FXTransactions",
                column: "PositionId");

            migrationBuilder.CreateIndex(
                name: "IX_AutomaticTransactions_ApprovedById",
                table: "AutomaticTransactions",
                column: "ApprovedById");

            migrationBuilder.CreateIndex(
                name: "IX_AutomaticTransactions_PositionId",
                table: "AutomaticTransactions",
                column: "PositionId");

            migrationBuilder.AddForeignKey(
                name: "FK_AutomaticTransactions_StaffMembers_ApprovedById",
                table: "AutomaticTransactions",
                column: "ApprovedById",
                principalTable: "StaffMembers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AutomaticTransactions_Positions_PositionId",
                table: "AutomaticTransactions",
                column: "PositionId",
                principalTable: "Positions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FXTransactions_StaffMembers_ApprovedById",
                table: "FXTransactions",
                column: "ApprovedById",
                principalTable: "StaffMembers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FXTransactions_Positions_PositionId",
                table: "FXTransactions",
                column: "PositionId",
                principalTable: "Positions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ManualsTransactions_StaffMembers_ApprovedById",
                table: "ManualsTransactions",
                column: "ApprovedById",
                principalTable: "StaffMembers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ManualsTransactions_Positions_PositionId",
                table: "ManualsTransactions",
                column: "PositionId",
                principalTable: "Positions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_OutsideTransacitons_Positions_PositionId",
                table: "OutsideTransacitons",
                column: "PositionId",
                principalTable: "Positions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AutomaticTransactions_StaffMembers_ApprovedById",
                table: "AutomaticTransactions");

            migrationBuilder.DropForeignKey(
                name: "FK_AutomaticTransactions_Positions_PositionId",
                table: "AutomaticTransactions");

            migrationBuilder.DropForeignKey(
                name: "FK_FXTransactions_StaffMembers_ApprovedById",
                table: "FXTransactions");

            migrationBuilder.DropForeignKey(
                name: "FK_FXTransactions_Positions_PositionId",
                table: "FXTransactions");

            migrationBuilder.DropForeignKey(
                name: "FK_ManualsTransactions_StaffMembers_ApprovedById",
                table: "ManualsTransactions");

            migrationBuilder.DropForeignKey(
                name: "FK_ManualsTransactions_Positions_PositionId",
                table: "ManualsTransactions");

            migrationBuilder.DropForeignKey(
                name: "FK_OutsideTransacitons_Positions_PositionId",
                table: "OutsideTransacitons");

            migrationBuilder.DropIndex(
                name: "IX_OutsideTransacitons_PositionId",
                table: "OutsideTransacitons");

            migrationBuilder.DropIndex(
                name: "IX_ManualsTransactions_ApprovedById",
                table: "ManualsTransactions");

            migrationBuilder.DropIndex(
                name: "IX_ManualsTransactions_PositionId",
                table: "ManualsTransactions");

            migrationBuilder.DropIndex(
                name: "IX_FXTransactions_ApprovedById",
                table: "FXTransactions");

            migrationBuilder.DropIndex(
                name: "IX_FXTransactions_PositionId",
                table: "FXTransactions");

            migrationBuilder.DropIndex(
                name: "IX_AutomaticTransactions_ApprovedById",
                table: "AutomaticTransactions");

            migrationBuilder.DropIndex(
                name: "IX_AutomaticTransactions_PositionId",
                table: "AutomaticTransactions");

            migrationBuilder.DropColumn(
                name: "PositionId",
                table: "OutsideTransacitons");

            migrationBuilder.DropColumn(
                name: "ApprovedById",
                table: "ManualsTransactions");

            migrationBuilder.DropColumn(
                name: "PositionId",
                table: "ManualsTransactions");

            migrationBuilder.DropColumn(
                name: "ApprovedById",
                table: "FXTransactions");

            migrationBuilder.DropColumn(
                name: "PositionId",
                table: "FXTransactions");

            migrationBuilder.DropColumn(
                name: "ApprovedById",
                table: "AutomaticTransactions");

            migrationBuilder.DropColumn(
                name: "PositionId",
                table: "AutomaticTransactions");
        }
    }
}
