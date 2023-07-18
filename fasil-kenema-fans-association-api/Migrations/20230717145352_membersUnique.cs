using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FasilDonationAPI.Migrations
{
    public partial class membersUnique : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Members_IdNumber",
                table: "Members",
                column: "IdNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Members_PhoneNumber",
                table: "Members",
                column: "PhoneNumber",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Members_IdNumber",
                table: "Members");

            migrationBuilder.DropIndex(
                name: "IX_Members_PhoneNumber",
                table: "Members");
        }
    }
}
