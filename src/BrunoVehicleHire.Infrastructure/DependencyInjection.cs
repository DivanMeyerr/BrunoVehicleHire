using BrunoVehicleHire.Domain.Interfaces;
using BrunoVehicleHire.Infrastructure.Persistence;
using BrunoVehicleHire.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BrunoVehicleHire.Infrastructure;
 
 public static class DependencyInjection
 {
     public static IServiceCollection AddInfrastructure(
         this IServiceCollection services,
         IConfiguration configuration)
     {
         services.AddDbContext<ApplicationDbContext>(options =>
             options.UseSqlite(configuration.GetConnectionString("DefaultConnection")));

         services.AddScoped<IVehicleRepository, VehicleRepository>();

         return services;
     }
 }