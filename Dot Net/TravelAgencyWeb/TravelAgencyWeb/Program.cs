using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TravelAgencyWeb.Context;
using TravelAgencyWeb.Interfaces;
using TravelAgencyWeb.Services;

var builder = WebApplication.CreateBuilder(args);

// Register database
builder.Services.AddDbContext<TravelContext>
    (options => options.UseSqlServer(builder.Configuration.GetConnectionString("Database")));
// Add services to the container.
builder.Services.AddTransient<IAuthService, AuthService>();
builder.Services.AddControllers();


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = builder.Configuration["Jwt:Audience"],
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
//app.UseCors("AllowAngularApp");
app.UseCors(
            options => options.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader()
); ;
app.MapControllers();

app.Run();
