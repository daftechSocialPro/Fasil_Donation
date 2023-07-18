using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FasilDonationAPI.Migrations
{
    public partial class designsettinginnerimage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "IdImage",
                table: "DesignSettings",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InnerImage",
                table: "DesignSettings",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IdImage",
                table: "DesignSettings");

            migrationBuilder.DropColumn(
                name: "InnerImage",
                table: "DesignSettings");
        }
    }
}
