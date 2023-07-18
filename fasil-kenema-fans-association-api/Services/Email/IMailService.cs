namespace FasilDonationAPI.Services
{
    public interface IMailService
{
    Task SendEmailAsync(MailRequest mailRequest);
}
}