
using FasilDonationAPI.Dtos;
using FasilDonationAPI.Entities;

namespace FasilDonationAPI.Services{


    public interface IDesignSettingRepository {


        Task Create(DesignSetting desetting);
        Task Create(IdTemplate idTemplate);
        Task Update(IdTemplate idTemplate);
        Task Update(DesignSetting desetting);
        
        IdTemplate getTemplateById();

        List<MembershipDto> GetTemplateClient();
        List<DesignSetting> GetAll();
        Task Delete(Guid advertId);
    }
}