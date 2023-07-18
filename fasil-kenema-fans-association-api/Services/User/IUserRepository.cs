using FasilDonationAPI.Entities;

namespace FasilDonationAPI.Services{



    public interface IUserRepository {


        User Create (User user );
        User GetByEmail (string email );

        User GetById (Guid id );

        
    }
}