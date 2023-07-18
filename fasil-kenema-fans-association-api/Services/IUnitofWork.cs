


using FasilDonationAPI.Services.AboutSection;
using FasilDonationAPI.Services.Advert;
using FasilDonationAPI.Services.Dashboard;
using FasilDonationAPI.Services.Donation;
using FasilDonationAPI.Services.HomeHero;
using FasilDonationAPI.Services.NextMatch;
using FasilDonationAPI.Services.Partener;

namespace FasilDonationAPI.Services
{
    public interface IUnitOfWork
    {

        IUserRepository userRepository { get; }

        IAdvertRepository advertRepository { get; }

        IDesignSettingRepository designSettingRepository { get; }

        IHomeHeroRepository homeHeroRepository { get; }

        INextMatchRepository nextMatchRepository { get; }

        IDashboardRepository dashboardRepository { get; }

        IPartenerRepository partenerRepository { get; }

        IAboutSectionRepository aboutSectionRepository { get; }

        IDonationRepository donationRepository { get; }

        IMemberRepostiory memberRepostiory { get; }


        Task SaveChanges();
    }
}
