using FasilDonationAPI.Dtos;
using FasilDonationAPI.Entities;

namespace FasilDonationAPI.Services
{
    public interface IMemberRepostiory
    {

        Task Create(Member member);

        Task CreateFromExcel(FansFromExcel fansFromExcel);

        Task Update(Member member);

        Task<List<Member>> GetAll();

        //Task CreatePayment(Payment Payment);
        //Task<List<Payment>> GetAllPaymentsByid(Guid fanId);
      
        string getDate();
        double getPenality(string startDate, Guid memberId);


    }
}
