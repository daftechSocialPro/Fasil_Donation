using FasilDonationAPI.Entities;

namespace FasilDonationAPI.Services.HomeHero
{
    public interface IHomeHeroRepository
    {

        Task Create(FasilDonationAPI.Entities.HomeHero homeHero);

        Task Update(FasilDonationAPI.Entities.HomeHero homeHero);

        List<FasilDonationAPI.Entities.HomeHero> GetAll();
        Task Delete(Guid homeHeroId);
    }
}
