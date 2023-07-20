using FasilDonationAPI.Services;
using FasilDonationAPI.Data;
using FasilDonationAPI.Helpers;
using FasilDonationAPI.Hubs.EncoderHub;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddScoped<IUnitOfWork,UnitOfWork>();
builder.Services.AddScoped<JwtService>();

builder.Services.AddTransient<IMailService, MailService>();



// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>(options=>
options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.Configure<MailSettings>(builder.Configuration.GetSection("MailSettings"));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSignalR().AddJsonProtocol(options=>
{
    options.PayloadSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles; 
});


builder.Services.AddCors(options=>{

    var frontendURL = builder.Configuration.GetValue<string> ("frontend_url");
    var adminURL = builder.Configuration.GetValue<string>("admin_url");
    options.AddDefaultPolicy(builder=>{
        builder.WithOrigins(frontendURL,adminURL).AllowAnyMethod().AllowAnyHeader().AllowCredentials();
    });
}
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles( new StaticFileOptions{
FileProvider = new PhysicalFileProvider(Path.Combine(builder.Environment.ContentRootPath,"Assets")),
RequestPath="/Assets"
});

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors();


app.UseAuthorization();


app.MapControllers();


app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers(); 
    endpoints.MapHub<EncoderHub>("/ws/Encoder");
}
);

app.Run();
