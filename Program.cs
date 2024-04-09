using Communify_Backend;
using CommunifyLibrary;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

//Entity Framework Context Connection
builder.Services.AddDbContext<CommunifyContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("default"), b => b.MigrationsAssembly("CommunifyLibrary")));


//Add builder configurations
builder.AddAPI();
builder.ConfigureAuthorization();
builder.Services.ConfigureServices();
builder.Services.ConfigureRepositories();


//Enable CORS(d��ar�dan ger�ekle�en i�lemlere izin)
builder.Services.AddCors(c =>
{
    c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});


var app = builder.Build();

//enable cors devam�
app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

//Database'e DateTime g�nderirken s�k�nt� ��karmas�n diye eklendi
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
