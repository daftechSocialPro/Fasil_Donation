using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FasilDonationAPI.Migrations
{
    public partial class homeheros : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "HomeHeroes",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uuid", nullable: false),
                    BackgroundImage = table.Column<string>(type: "text", nullable: true),
                    Content1 = table.Column<string>(type: "text", nullable: true),
                    Content2 = table.Column<string>(type: "text", nullable: true),
                    Content3 = table.Column<string>(type: "text", nullable: true),
                    Content4 = table.Column<string>(type: "text", nullable: true),
                    position = table.Column<int>(type: "integer", nullable: false),
                    createdBy = table.Column<Guid>(type: "uuid", nullable: false),
                    createdAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    updatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    status = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HomeHeroes", x => x.ID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HomeHeroes_position",
                table: "HomeHeroes",
                column: "position",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HomeHeroes");
        }
    }
}
