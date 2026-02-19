using BrunoVehicleHire.Domain.Entities;
using BrunoVehicleHire.Domain.Interfaces;
using BrunoVehicleHire.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace BrunoVehicleHire.Infrastructure.Repositories;

public class VehicleRepository: IVehicleRepository
{
    private readonly ApplicationDbContext _dbContext;
    
    public VehicleRepository(ApplicationDbContext dbContext)
        => _dbContext = dbContext;
    
    public async Task<Vehicle?> GetByIdAsync(Guid vehicleId) 
        => await _dbContext.Vehicles.AsNoTracking().FirstOrDefaultAsync(v => v.Id == vehicleId);
    
    public async Task<Vehicle?> GetByRegistrationNumberAsync(string registrationNumber)
        => await _dbContext.Vehicles.AsNoTracking().FirstOrDefaultAsync(v => v.RegistrationNumber == registrationNumber);

    public async Task<(List<Vehicle> Items, int TotalCount)> GetPaginatedAsync(int page, int pageSize, string searchTerm)
    {
        var query = _dbContext.Vehicles.AsNoTracking();
        var totalCount  = await query.CountAsync();
        var items = await query.Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
        return (items, totalCount);
    }

    public async Task<Guid> AddAsync(Vehicle vehicle)
    {
        await _dbContext.Vehicles.AddAsync(vehicle);
        await _dbContext.SaveChangesAsync();
        return vehicle.Id;
    }

    public async Task<Vehicle> UpdateAsync(Vehicle vehicle)
    {
        _dbContext.Update(vehicle);
        await _dbContext.SaveChangesAsync();
        return vehicle;
    }

    public async Task<bool> DeleteAsync(Guid id )
    {
        var vehicle = await _dbContext.Vehicles.FindAsync(id);
        if (vehicle == null)
            return false;
        vehicle.IsDeleted = true;
        await _dbContext.SaveChangesAsync();
        return true;
    }
}