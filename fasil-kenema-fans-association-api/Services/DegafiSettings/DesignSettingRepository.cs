
using Microsoft.EntityFrameworkCore;
using FasilDonationAPI.Data;
using FasilDonationAPI.Entities;
using FasilDonationAPI.Helpers;
using FasilDonationAPI.Dtos;

namespace FasilDonationAPI.Services
{


    public class DesignSettingRepository : IDesignSettingRepository
    {

        private readonly ApplicationDbContext _context;
        public DesignSettingRepository(ApplicationDbContext context)
        {
            _context = context;
        }


        public async Task Create(DesignSetting desetting)
        {
            try
            {

                if (desetting.Photo2 != null)
                {
                    var image = desetting.Photo2;
                    var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                    var fileExtension = photoinfo.Extension;
                    var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/Id_upload_photo/"), desetting.ID.ToString() + "idimage" + fileExtension);



                    await image.SaveAsAsync(savingPath);
                    desetting.IdImage = "Assets/Id_upload_photo/" + desetting.ID + "idimage" + fileExtension;
                }


                if (desetting.Photo != null)
                {
                    var image = desetting.Photo;
                    var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                    var fileExtension = photoinfo.Extension;
                    var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/Id_upload_photo/"), desetting.ID.ToString() + "inner" + fileExtension);



                    await image.SaveAsAsync(savingPath);
                    desetting.InnerImage = "Assets/Id_upload_photo/" + desetting.ID + "inner" + fileExtension;
                }


                await _context.DesignSettings.AddAsync(desetting);
                _context.SaveChanges();


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
        public async Task Create(IdTemplate idTemplate)
        {
            try
            {
                var user = await _context.Users.FindAsync(idTemplate.createdBy);

                if (user != null)
                {

                  

                    if (idTemplate.Photo != null)
                    {
                        var image = idTemplate.Photo;
                        var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                        var fileExtension = photoinfo.Extension;
                        var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/Id_upload_photo/"), idTemplate.ID.ToString() +"bg"+ fileExtension);



                        await image.SaveAsAsync(savingPath);
                        idTemplate.BackgroundImage = "Assets/Id_upload_photo/" + idTemplate.ID+"bg" + fileExtension;
                    }


                    if (idTemplate.Photo2 != null)
                    {
                        var image = idTemplate.Photo2;
                        var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                        var fileExtension = photoinfo.Extension;
                        var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/Id_upload_photo/"), idTemplate.ID.ToString() +"logo"+ fileExtension);



                        await image.SaveAsAsync(savingPath);
                        idTemplate.Logo = "Assets/Id_upload_photo/" + idTemplate.ID+"logo" + fileExtension;
                    }


                    if (idTemplate.Photo3 != null)
                    {
                        var image = idTemplate.Photo3;
                        var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                        var fileExtension = photoinfo.Extension;
                        var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/Id_upload_photo/"), idTemplate.ID.ToString() + "back" + fileExtension);



                        await image.SaveAsAsync(savingPath);
                        idTemplate.BackImage = "Assets/Id_upload_photo/" + idTemplate.ID + "back" + fileExtension;
                    }




                }

                await _context.IdTemplates.AddAsync(idTemplate);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
        public async Task Update (IdTemplate idTemplate)
        {


            try
            {

                var template = _context.IdTemplates.Find(idTemplate.ID);

                template.HeaderAmharic = idTemplate.HeaderAmharic;
                template.HeaderEnglish = idTemplate.HeaderEnglish;
                template.Subtitle1 = idTemplate.Subtitle1;
                template.Subtitle2 = idTemplate.Subtitle2;
                template.Address = idTemplate.Address;
                template.AddressAmharic = idTemplate.AddressAmharic;

                if (idTemplate.Photo != null)
                {
                    var image = idTemplate.Photo;
                    var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                    var fileExtension = photoinfo.Extension;
                    var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/Id_upload_photo/"), idTemplate.ID.ToString() + "bg"  + fileExtension);



                    await image.SaveAsAsync(savingPath);
                    template.BackgroundImage = "Assets/Id_upload_photo/" + idTemplate.ID +"bg"+ fileExtension;
                }

                if (idTemplate.Photo2 != null)
                {
                    var image = idTemplate.Photo2;
                    var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                    var fileExtension = photoinfo.Extension;
                    var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/Id_upload_photo/"), idTemplate.ID.ToString()+"logo" + fileExtension);



                    await image.SaveAsAsync(savingPath);
                    template.Logo = "Assets/Id_upload_photo/" + idTemplate.ID+"logo"  + fileExtension;
                }

                if (idTemplate.Photo3 != null)
                {
                    var image = idTemplate.Photo3;
                    var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                    var fileExtension = photoinfo.Extension;
                    var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/Id_upload_photo/"), idTemplate.ID.ToString()  +"back"+ fileExtension);



                    await image.SaveAsAsync(savingPath);
                    template.BackImage = "Assets/Id_upload_photo/" + idTemplate.ID+"back" + fileExtension;
                }



               _context.IdTemplates.Update(template);
               await  _context.SaveChangesAsync();


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }




        }
        public IdTemplate getTemplateById()
        {

            return _context.IdTemplates.FirstOrDefault();
        }


       public List<MembershipDto> GetTemplateClient()
        {

            return _context.DesignSettings.Select(x=> new MembershipDto
            {
                Name  = x.AmharicName,
                Price = x.Payment,
                IdImage= x.IdImage,
            }).OrderByDescending(x=>x.Price).ToList();
        }
        public List<DesignSetting> GetAll()
        {
           
            return _context.DesignSettings.ToList();
        }
        public async Task Update(DesignSetting desetting)
        {
            try
            {




                var dese = _context.DesignSettings.Find(desetting.ID);

                if (desetting.Photo2 != null)
                {
                    var image = desetting.Photo2;
                    var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                    var fileExtension = photoinfo.Extension;
                    var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/Id_upload_photo/"), desetting.ID.ToString() + "idimage" + fileExtension);



                    await image.SaveAsAsync(savingPath);
                    dese.IdImage = "Assets/Id_upload_photo/" + desetting.ID + "idimage" + fileExtension;
                }


                if (desetting.Photo != null)
                {
                    var image = desetting.Photo;
                    var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                    var fileExtension = photoinfo.Extension;
                    var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/Id_upload_photo/"), desetting.ID.ToString() + "inner" + fileExtension);



                    await image.SaveAsAsync(savingPath);
                    dese.InnerImage = "Assets/Id_upload_photo/" + desetting.ID + "inner" + fileExtension;
                }


                dese.Name = desetting.Name;
                dese.AmharicName = desetting.AmharicName;               
                dese.Payment = desetting.Payment;
                dese.Description = desetting.Description;
                dese.Color = desetting.Color;

                dese.HasPenality=  desetting.HasPenality;
                dese.PenalityAmount= desetting.PenalityAmount;
                dese.IncreasesEvery =   desetting.IncreasesEvery;
                dese.MultiplyAmount= desetting.MultiplyAmount;




                _context.DesignSettings.Update(dese);
                await _context.SaveChangesAsync();


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }




        }
        public async Task Delete(Guid desettingId)
        {
            try
            {
                var dsetting = await _context.DesignSettings.FindAsync(desettingId);
                _context.DesignSettings.Remove(dsetting);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


    }

}
