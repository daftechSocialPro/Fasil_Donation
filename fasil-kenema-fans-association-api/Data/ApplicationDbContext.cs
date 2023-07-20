using System;
using System.Diagnostics.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using FasilDonationAPI.Entities;


namespace FasilDonationAPI.Data
{



    public class ApplicationDbContext : DbContext
    {

        public ApplicationDbContext([NotNullAttribute] DbContextOptions options) : base(options)
        {

            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }

        public DbSet<User> Users { get; set; }        
        public DbSet<Advertisement> Advertisements { get; set; }       
        public DbSet<SubscribedUsers> SubscribedUsers { get; set; }
        public DbSet<DesignSetting> DesignSettings { get; set; }

        public DbSet<HomeHero> HomeHeroes { get; set; }
        public DbSet<NextMatch> NextMatches { get; set; }
        public DbSet<Member> Members { get; set; }
        public DbSet<Partners> Partners { get; set; }
        public DbSet<AboutSection> AboutSections { get; set; }
        public DbSet<IdTemplate>IdTemplates { get; set; }

        public DbSet<Donation> Donations { get; set; }

        public DbSet<Branch> Branches { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.email).IsUnique();
            });

     

            modelBuilder.Entity<DesignSetting>(entity =>
            {
                entity.HasIndex(e => e.IdInitial).IsUnique();
            });


            modelBuilder.Entity<HomeHero>(entity =>
            {
                entity.HasIndex(e => e.position).IsUnique();
            });
            modelBuilder.Entity<Member>(entity =>
            {
                entity.HasIndex(e => e.PhoneNumber).IsUnique();
            });
            modelBuilder.Entity<Member>(entity =>
            {
                entity.HasIndex(e => e.IdNumber).IsUnique();
            });

            //modelBuilder.Entity<DegafiMahber>()
            //.HasMany(dm => dm.MahberExecutives)
            //.WithOne()
            //.HasForeignKey(me => me.MahberId);




        }
    }





}