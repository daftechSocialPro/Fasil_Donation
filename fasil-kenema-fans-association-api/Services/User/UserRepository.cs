using FasilDonationAPI.Entities;
using FasilDonationAPI.Data;
using FasilDonationAPI.Helpers;
using Microsoft.EntityFrameworkCore;

namespace FasilDonationAPI.Services
{



    public class UserRepository : IUserRepository
    {

        private readonly ApplicationDbContext _context;
        public UserRepository(ApplicationDbContext context)
        {

            _context = context;
        }

        public User Create(User user)
        {


            _context.Users.Add(user);
            _context.SaveChanges();

            return user;

        }

        public User GetByEmail(string email)
        {


            return _context.Users.FirstOrDefault(u => u.email == email);
        }

        public User GetById(Guid id)
        {

            return _context.Users.Find(id);
        }

     


    }

    public class MahberView
    {

        public Guid ID { get; set; }
        public string fullName { get; set; }
        public string email { get; set; }

        public DateTime createdAt { get; set; }
        public bool isActive { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string establishedDate { get; set; }

        public string logo { get; set; }

        public string websiteAdress { get; set; }
    }
}