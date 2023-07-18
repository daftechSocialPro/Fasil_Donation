﻿// <auto-generated />
using System;
using FasilDonationAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace FasilDonationAPI.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20230715083509_initial")]
    partial class initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("FasilDonationAPI.Entities.Advertisement", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("AdPhoto")
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<DateTime>("FromDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<int>("Postition")
                        .HasColumnType("integer");

                    b.Property<DateTime>("ToDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("createdAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<Guid>("createdBy")
                        .HasColumnType("uuid");

                    b.Property<string>("logo")
                        .HasColumnType("text");

                    b.Property<bool>("status")
                        .HasColumnType("boolean");

                    b.Property<DateTime>("updatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("ID");

                    b.ToTable("Advertisements");
                });

            modelBuilder.Entity("FasilDonationAPI.Entities.DesignSetting", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("AmharicName")
                        .HasColumnType("text");

                    b.Property<string>("Color")
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<bool>("HasPenality")
                        .HasColumnType("boolean");

                    b.Property<Guid>("IDtemplateId")
                        .HasColumnType("uuid");

                    b.Property<string>("IdInitial")
                        .HasColumnType("text");

                    b.Property<int>("IncreasesEvery")
                        .HasColumnType("integer");

                    b.Property<float>("MultiplyAmount")
                        .HasColumnType("real");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<float>("Payment")
                        .HasColumnType("real");

                    b.Property<float>("PenalityAmount")
                        .HasColumnType("real");

                    b.Property<string>("StartFrom")
                        .HasColumnType("text");

                    b.Property<DateTime>("createdAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<Guid>("createdBy")
                        .HasColumnType("uuid");

                    b.Property<bool>("status")
                        .HasColumnType("boolean");

                    b.Property<DateTime>("updatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("ID");

                    b.HasIndex("IdInitial")
                        .IsUnique();

                    b.ToTable("DesignSettings");
                });

            modelBuilder.Entity("FasilDonationAPI.Entities.IdTemplate", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Address")
                        .HasColumnType("text");

                    b.Property<string>("AddressAmharic")
                        .HasColumnType("text");

                    b.Property<string>("BackImage")
                        .HasColumnType("text");

                    b.Property<string>("BackgroundImage")
                        .HasColumnType("text");

                    b.Property<string>("HeaderAmharic")
                        .HasColumnType("text");

                    b.Property<string>("HeaderEnglish")
                        .HasColumnType("text");

                    b.Property<string>("Logo")
                        .HasColumnType("text");

                    b.Property<string>("Subtitle1")
                        .HasColumnType("text");

                    b.Property<string>("Subtitle2")
                        .HasColumnType("text");

                    b.Property<DateTime>("createdAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<Guid>("createdBy")
                        .HasColumnType("uuid");

                    b.Property<bool>("status")
                        .HasColumnType("boolean");

                    b.Property<DateTime>("updatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("ID");

                    b.ToTable("IdTemplates");
                });

            modelBuilder.Entity("FasilDonationAPI.Entities.SubscribedUsers", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("email")
                        .HasColumnType("text");

                    b.Property<DateTime>("subscribedDate")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("ID");

                    b.ToTable("SubscribedUsers");
                });

            modelBuilder.Entity("FasilDonationAPI.Entities.User", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("createdAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<Guid>("createdBy")
                        .HasColumnType("uuid");

                    b.Property<string>("email")
                        .HasColumnType("text");

                    b.Property<string>("fullName")
                        .HasColumnType("text");

                    b.Property<bool>("isActive")
                        .HasColumnType("boolean");

                    b.Property<string>("password")
                        .HasColumnType("text");

                    b.Property<bool>("status")
                        .HasColumnType("boolean");

                    b.Property<DateTime>("updatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("ID");

                    b.HasIndex("email")
                        .IsUnique();

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
