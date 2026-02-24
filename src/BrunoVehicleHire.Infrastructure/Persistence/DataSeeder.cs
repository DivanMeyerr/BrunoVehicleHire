using BrunoVehicleHire.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BrunoVehicleHire.Infrastructure.Persistence;

public static class DataSeeder
{
    public static async Task SeedAsync(ApplicationDbContext context)
    {
        var existing = await context.Vehicles
            .IgnoreQueryFilters()
            .ToListAsync();
    
        context.Vehicles.RemoveRange(existing);
        await context.SaveChangesAsync();

        var vehicles = new List<Vehicle>
        {
        new() { Id = Guid.NewGuid(), RegistrationNumber = "CA 123-456", Make = "Toyota", Model = "Corolla", Year = 2020, CreatedDate = DateTime.UtcNow },
        new() { Id = Guid.NewGuid(), RegistrationNumber = "GP 456-789", Make = "BMW", Model = "X5", Year = 2021, CreatedDate = DateTime.UtcNow },
        new() { Id = Guid.NewGuid(), RegistrationNumber = "WC 789-012", Make = "Mercedes", Model = "C-Class", Year = 2019, CreatedDate = DateTime.UtcNow },
        new() { Id = Guid.NewGuid(), RegistrationNumber = "NP 321-654", Make = "Ford", Model = "Ranger", Year = 2022, CreatedDate = DateTime.UtcNow },
        new() { Id = Guid.NewGuid(), RegistrationNumber = "EC 654-987", Make = "Volkswagen", Model = "Golf", Year = 2018, CreatedDate = DateTime.UtcNow },
        new() { Id = Guid.NewGuid(), RegistrationNumber = "KZN 445-GP", Make = "Toyota", Model = "Hilux", Year = 2021, CreatedDate = DateTime.UtcNow },
        new() { Id = Guid.NewGuid(), RegistrationNumber = "FS 112-233", Make = "Nissan", Model = "Navara", Year = 2020, CreatedDate = DateTime.UtcNow },
        new() { Id = Guid.NewGuid(), RegistrationNumber = "LP 778-GP", Make = "Isuzu", Model = "D-Max", Year = 2022, CreatedDate = DateTime.UtcNow },
        new() { Id = Guid.NewGuid(), RegistrationNumber = "MP 334-455", Make = "Ford", Model = "Everest", Year = 2023, CreatedDate = DateTime.UtcNow },
        new() { Id = Guid.NewGuid(), RegistrationNumber = "NC 556-677", Make = "Volkswagen", Model = "Polo Vivo", Year = 2019, CreatedDate = DateTime.UtcNow },
        new() { Id = Guid.NewGuid(), RegistrationNumber = "NW 889-001", Make = "Suzuki", Model = "Swift", Year = 2021, CreatedDate = DateTime.UtcNow },
        new() { Id = Guid.NewGuid(), RegistrationNumber = "CA 998-776", Make = "Hyundai", Model = "Tucson", Year = 2022, CreatedDate = DateTime.UtcNow },
        new() { Id = Guid.NewGuid(), RegistrationNumber = "GP 112-334", Make = "Kia", Model = "Sportage", Year = 2020, CreatedDate = DateTime.UtcNow },
        new() { Id = Guid.NewGuid(), RegistrationNumber = "WC 445-667", Make = "Honda", Model = "CR-V", Year = 2021, CreatedDate = DateTime.UtcNow },
        new() { Id = Guid.NewGuid(), RegistrationNumber = "GP 223-445", Make = "Audi", Model = "A4", Year = 2023, CreatedDate = DateTime.UtcNow },

        new() { Id = Guid.NewGuid(), RegistrationNumber = "CA 111-222", Make = "Toyota", Model = "Fortuner", Year = 2018, CreatedDate = DateTime.UtcNow, IsDeleted = true, DeletedDate = DateTime.UtcNow },
        new() { Id = Guid.NewGuid(), RegistrationNumber = "GP 333-444", Make = "BMW", Model = "3 Series", Year = 2017, CreatedDate = DateTime.UtcNow, IsDeleted = true, DeletedDate = DateTime.UtcNow },
        new() { Id = Guid.NewGuid(), RegistrationNumber = "WC 555-666", Make = "Mercedes", Model = "GLC", Year = 2016, CreatedDate = DateTime.UtcNow, IsDeleted = true, DeletedDate = DateTime.UtcNow },
    };

        await context.Vehicles.AddRangeAsync(vehicles);
        await context.SaveChangesAsync();
    }
}