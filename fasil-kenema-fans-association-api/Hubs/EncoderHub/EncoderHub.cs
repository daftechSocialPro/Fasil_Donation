

using Microsoft.AspNetCore.SignalR;
using FasilDonationAPI.Entities;
using FasilDonationAPI.Services;
//using static FasilDonationAPI.Services.Player.PlayerRepository;

namespace FasilDonationAPI.Hubs.EncoderHub
{


    public class EncoderHub : Hub<IEncoderHubInterface>
    {

    }
    //    public async Task getMatch(List<Matches> matches)
    //    {

    //        await Clients.All.getMatch(matches);
    //    }

    //    public async Task getNews(List<News> news)
    //    {

    //        await Clients.All.getNews(news);
    //    }

    //    public async Task getTeams(homeUpdate result)
    //    {
           
    //        await Clients.AllExcept(Context.ConnectionId).getTeams(result);
    //    }




    //}

    //public class homeUpdate
    //{

    //    public List<TeamView> team { get; set; }

    //    public List<Matches> matches { get; set; }

    //    public List<GoalView> goalViews { get; set; }


    //}



}