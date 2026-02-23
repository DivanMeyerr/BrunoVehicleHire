using BrunoVehicleHire.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BrunoVehicleHire.Infrastructure.Persistence;

public static class DataSeeder
{
    public static async Task SeedAsync(ApplicationDbContext context)
    {
        if (await context.Vehicles.AnyAsync())
            return;

        var vehicles = new List<Vehicle>
        {
            new() { Id = Guid.NewGuid(), RegistrationNumber = "CA 123-456", Make = "Toyota", Model = "Corolla", Year = 2020, CreatedDate = DateTime.UtcNow },
            new() { Id = Guid.NewGuid(), RegistrationNumber = "GP 456-789", Make = "BMW", Model = "X5", Year = 2021, CreatedDate = DateTime.UtcNow },
            new() { Id = Guid.NewGuid(), RegistrationNumber = "WC 789-012", Make = "Mercedes", Model = "C-Class", Year = 2019, CreatedDate = DateTime.UtcNow },
            new() { Id = Guid.NewGuid(), RegistrationNumber = "NP 321-654", Make = "Ford", Model = "Ranger", Year = 2022, CreatedDate = DateTime.UtcNow },
            new() { Id = Guid.NewGuid(), RegistrationNumber = "EC 654-987", Make = "Volkswagen", Model = "Golf", Year = 2018, CreatedDate = DateTime.UtcNow },
        };

        await context.Vehicles.AddRangeAsync(vehicles);
        await context.SaveChangesAsync();
    }
}