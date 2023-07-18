using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
namespace FasilDonationAPI.Helpers;
public static class FileHelpers
{
    public static async Task SaveAsAsync(this IFormFile formFile, string filePath)
    {
        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await formFile.CopyToAsync(stream);
        }
    }

    public static void SaveAs(this IFormFile formFile, string filePath)
    {
        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            formFile.CopyTo(stream);
        }
    }

    public static string GetMimeType(string ext)
    {
        string type = "";
        switch (ext)
        {
            case ".mp4":
            case ".jpg":
            case ".jfif":
            case ".pjpeg":
            case ".pjp":
            case ".jpeg":
                type += "image/jpeg";
                break;
            case ".ico":
                type += "image/x-icon";
                break;
            case ".png":
                type += "image/png";
                break;
            case ".gif":
                type += "image/gif";
                break;
            case ".svg":
                type += "image/svg+xml";
                break;
            case ".webp":
                type += "imgae/webp";
                break;
            case ".pdf":
                type += "application/pdf";
                break;
            case ".7z":
                type += "application/x-7z-compressed";
                break;
            case ".xls":
                type += "application/vnd.ms-excel";
                break;
            case ".xlsx":
                type += "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                break;
            case ".csv":
                type += "text/csv";
                break;
            case ".doc":
                type += "application/msword";
                break;
            case ".docx":
                type += "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                break;
            case ".zip":
                type += "application/zip";
                break;
        }
        return type;
    }
}
