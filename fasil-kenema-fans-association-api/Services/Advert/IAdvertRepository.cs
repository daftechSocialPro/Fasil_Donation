using Microsoft.AspNetCore.Mvc;
using FasilDonationAPI.Entities;

namespace FasilDonationAPI.Services.Advert
{
    public interface IAdvertRepository
    {

        Task Create(Advertisement advert);

        Task Update(Advertisement advert);

        List<Advertisement> GetAll();
        Task Delete(Guid advertId);

    }
}
