
using Microsoft.EntityFrameworkCore;
using System.Drawing;
using FasilDonationAPI.Data;
using FasilDonationAPI.Entities;

namespace FasilDonationAPI.Services.Dashboard
{
    public class DashboardRepository : IDashboardRepository
    {
        private readonly ApplicationDbContext _context;
        public DashboardRepository(ApplicationDbContext context)
        {
            _context = context;

        }


        public DashboardWidget GetAll(Guid userId)
        {

            //var user = _context.Users.Find(userId);

            //if (user.userRole == Entities.UserRole.Tmret)
            //{

            //    DashboardWidget u = new DashboardWidget
            //    {
            //        numberOfNews = _context.News.Count(),
            //        numberOfMahber = _context.DefafiMahbers.Count(),
            //        numberOfExecutives = _context.TmretExecutives.Count(),
            //        numberofdegafi = _context.Degafi.Count()
            //    };

            //    return u;
            //}
            DashboardWidget k = new DashboardWidget
            {
                numberOfNews = 3,
                numberOfMahber = 4,
                numberOfExecutives = 5,
                numberofdegafi =6
            };

            return k;


        }

        public List<DashboardTable> GetTable()
        {
            List<DashboardTable> tables = new List<DashboardTable>();

     
          



            return tables.OrderByDescending(x=>x.numberOfDegafi).ToList();

        }
    }


    public class DashboardWidget
    {
        public int numberOfNews { get; set; }
        public int numberOfMahber { get; set; }

        public int numberOfExecutives { get; set; }

        public int numberofdegafi { get; set; }
    }





    public class DashboardTable
    {

        public string Image { get; set; }
        public string MahberName { get; set; }
        public string MahberAltName { get; set; }

        public string Website { get; set; }

     

        public int numberOfDegafi { get; set; }

        public string establishedDate { get; set; }


    }
}
