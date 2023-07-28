using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FasilDonationAPI.Migrations
{
    public partial class nextmatchName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OtherTeamName",
                table: "NextMatches",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OtherTeamName",
                table: "NextMatches");
        }
    }
}
