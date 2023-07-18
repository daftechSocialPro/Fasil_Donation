using FasilDonationAPI.Data;
using FasilDonationAPI.Helpers;

namespace FasilDonationAPI.Services.AboutSection
{
    public class AboutSectionRepository : IAboutSectionRepository
    {
        private readonly ApplicationDbContext _context;
        public AboutSectionRepository(ApplicationDbContext context)
        {
            _context = context;
        }


        public async Task Create(FasilDonationAPI.Entities.AboutSection AboutSection)
        {
            try
            {


                if (AboutSection.Photo != null)
                {


                    var image = AboutSection.Photo;
                    var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                    var fileExtension = photoinfo.Extension;
                    var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/Home_hero_upload/"), AboutSection.ID.ToString() + fileExtension);
                    await image.SaveAsAsync(savingPath);
                    AboutSection.Image = "Assets/Home_hero_upload/" + AboutSection.ID + fileExtension;

                }



                await _context.AboutSections.AddAsync(AboutSection);
                _context.SaveChanges();


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }


        public List<FasilDonationAPI.Entities.AboutSection> GetAll()
        {

            return _context.AboutSections.OrderByDescending(x => x.createdAt).ToList();
        }

        public async Task Update(FasilDonationAPI.Entities.AboutSection AboutSection)
        {
            try
            {

                var AboutSection1 = _context.AboutSections.Find(AboutSection.ID);

                AboutSection1.Title = AboutSection.Title;
                AboutSection1.SubTitile = AboutSection.SubTitile;
                AboutSection1.Description = AboutSection.Description;
                



                if (AboutSection.Photo != null)
                {
                    var image = AboutSection.Photo;
                    var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                    var fileExtension = photoinfo.Extension;
                    var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/Home_hero_upload/"), AboutSection1.ID.ToString() + fileExtension);

                    if (File.Exists(savingPath))
                    {
                        File.Delete(savingPath);
                    }

                    await image.SaveAsAsync(savingPath);
                    AboutSection1.Image = "Assets/Home_hero_upload/" + AboutSection1.ID + fileExtension;
                }


                _context.AboutSections.Update(AboutSection1);
                _context.SaveChanges();


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }




        }


        public async Task Delete(Guid AboutSectionId)
        {
            try
            {
                var AboutSection = await _context.AboutSections.FindAsync(AboutSectionId);
                _context.AboutSections.Remove(AboutSection);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }


}

