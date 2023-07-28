using FasilDonationAPI.Data;
using FasilDonationAPI.Helpers;

namespace FasilDonationAPI.Services.NextMatch
{
    public class NextMatchRepository:INextMatchRepository
    {
        private readonly ApplicationDbContext _context;
        public NextMatchRepository(ApplicationDbContext context)
        {
            _context = context;
        }


        public async Task Create(FasilDonationAPI.Entities.NextMatch nextMatch)
        {
            try
            {


                if (nextMatch.Photo != null)
                {


                    var image = nextMatch.Photo;
                    var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                    var fileExtension = photoinfo.Extension;
                    var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/Home_hero_upload/"), nextMatch.ID.ToString() + fileExtension);
                    await image.SaveAsAsync(savingPath);
                    nextMatch.AwayLogo = "Assets/Home_hero_upload/" + nextMatch.ID + fileExtension;

                }



                await _context.NextMatches.AddAsync(nextMatch);
                _context.SaveChanges();


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }


        public List<FasilDonationAPI.Entities.NextMatch> GetAll()
        {

            return _context.NextMatches.OrderByDescending(x => x.createdAt).ToList();
        }

        public async Task Update(FasilDonationAPI.Entities.NextMatch nextMatch)
        {
            try
            {

                var nextMatch1 = _context.NextMatches.Find(nextMatch.ID);

                nextMatch1.IsAway = nextMatch.IsAway;
                nextMatch1.SeasonName = nextMatch.SeasonName;
                nextMatch1.MatchName = nextMatch.MatchName;
                nextMatch1.MatchDateTime = nextMatch.MatchDateTime;
                nextMatch1.LocationStadium = nextMatch.LocationStadium;
                nextMatch1.OtherTeamName= nextMatch.OtherTeamName;



                if (nextMatch.Photo != null)
                {
                    var image = nextMatch.Photo;
                    var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                    var fileExtension = photoinfo.Extension;
                    var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/Home_hero_upload/"), nextMatch1.ID.ToString() + fileExtension);

                    if (File.Exists(savingPath))
                    {
                        File.Delete(savingPath);
                    }

                    await image.SaveAsAsync(savingPath);
                    nextMatch1.AwayLogo = "Assets/Home_hero_upload/" + nextMatch1.ID + fileExtension;
                }


                _context.NextMatches.Update(nextMatch1);
                _context.SaveChanges();


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }




        }


        public async Task Delete(Guid nextMatchId)
        {
            try
            {
                var nextMatch = await _context.NextMatches.FindAsync(nextMatchId);
                _context.NextMatches.Remove(nextMatch);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
