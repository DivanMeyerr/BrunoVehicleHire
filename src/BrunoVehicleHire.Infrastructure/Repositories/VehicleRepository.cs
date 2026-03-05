using BrunoVehicleHire.Domain.Entities;
using BrunoVehicleHire.Domain.Interfaces;
using BrunoVehicleHire.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace BrunoVehicleHire.Infrastructure.Repositories;

public class VehicleRepository(ApplicationDbContext dbContext) : IVehicleRepository
{
    public async Task<Vehicle?> GetByIdAsync(Guid vehicleId) 
        => await dbContext.Vehicles.AsNoTracking().FirstOrDefaultAsync(v => v.Id == vehicleId);
    
    public async Task<Vehicle?> GetByRegistrationNumberAsync(string registrationNumber)
        => await dbContext.Vehicles.AsNoTracking().FirstOrDefaultAsync(v => v.RegistrationNumber == registrationNumber);

    public async Task<(List<Vehicle> Items, int TotalCount)> GetPaginatedAsync(int page, int pageSize, string searchTerm)
    {
        var query = dbContext.Vehicles.AsNoTracking();
        
        if (!string.IsNullOrWhiteSpace(searchTerm))
        {
            query = query.Where(v => 
                v.RegistrationNumber.Contains(searchTerm) ||
                v.Make.Contains(searchTerm) ||
                v.Model.Contains(searchTerm));
        }
        
        var totalCount  = await query.CountAsync();
        var items = await query.Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
        return (items, totalCount);
    }
    
    public async Task<List<Vehicle>> GetDeletedAsync()
        => await dbContext.Vehicles
            .IgnoreQueryFilters()
            .Where(v => v.IsDeleted)
            .OrderBy(v => v.RegistrationNumber)
            .AsNoTracking()
            .ToListAsync();

    public async Task<Guid> AddAsync(Vehicle vehicle, CancellationToken cancellationToken = default)
    {
        await dbContext.Vehicles.AddAsync(vehicle, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken: cancellationToken);
        return vehicle.Id;
    }

    public async Task<Vehicle> UpdateAsync(Vehicle vehicle, CancellationToken cancellationToken = default)
    {
        dbContext.Update(vehicle);
        await dbContext.SaveChangesAsync(cancellationToken);
        return vehicle;
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var vehicle = await dbContext.Vehicles.FindAsync(id);
        if (vehicle == null)
            return false;
        vehicle.IsDeleted = true;
        vehicle.DeletedDate = DateTime.UtcNow;
        await dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }

    public async Task<bool> RegistrationExistsAsync(string regNumber, Guid? excludeId)
        => await dbContext.Vehicles
            .AnyAsync(v => v.RegistrationNumber == regNumber
                           && (excludeId == null || v.Id != excludeId));
}