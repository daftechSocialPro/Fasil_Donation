
using FasilDonationAPI.Data;
using FasilDonationAPI.Services.AboutSection;
using FasilDonationAPI.Services.Advert;
using FasilDonationAPI.Services.Branch;
using FasilDonationAPI.Services.Dashboard;
using FasilDonationAPI.Services.Donation;
using FasilDonationAPI.Services.HomeHero;
using FasilDonationAPI.Services.NextMatch;
using FasilDonationAPI.Services.Partener;

namespace FasilDonationAPI.Services
{
    public class UnitOfWork : IUnitOfWork
    {
        private ApplicationDbContext _db;

        public UnitOfWork(ApplicationDbContext db)
        {
            _db = db;
           
            userRepository = new UserRepository(db);        
            advertRepository = new AdvertRepository(db);
            designSettingRepository = new DesignSettingRepository(db);
            dashboardRepository = new DashboardRepository(db);
            homeHeroRepository = new HomeHeroRepository(db);
            nextMatchRepository= new NextMatchRepository(db);
            partenerRepository = new PartenerRepository(db);
            aboutSectionRepository = new AboutSectionRepository(db);
            donationRepository = new DonationRepository(db);
            memberRepostiory = new MemberRepostiory(db);
            branchRepository = new BranchRepository(db);

        }
      
        public IUserRepository userRepository {get;set;}
        public IAdvertRepository advertRepository {get;set;}    
        public IDesignSettingRepository designSettingRepository { get;set; }     
     
        public IDashboardRepository dashboardRepository { get; set; }

        public IHomeHeroRepository homeHeroRepository { get; set; }

        public INextMatchRepository nextMatchRepository { get;set;}

        public IPartenerRepository partenerRepository { get; set; }

        public IAboutSectionRepository aboutSectionRepository { get; set; }

        public IDonationRepository donationRepository { get; set; }


        public IMemberRepostiory memberRepostiory { get; set; }

        public IBranchRepository branchRepository { get; set; }


        public async Task SaveChanges()
        {
            try
            {
                await _db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}

