using BrunoVehicleHire.Domain.Entities;

namespace BrunoVehicleHire.Domain.Interfaces;

public interface IVehicleRepository
{
    Task<Vehicle?> GetByIdAsync(Guid vehicleId);
    Task<Vehicle?> GetByRegistrationNumberAsync(string registrationNumber);
    Task<(List<Vehicle> Items, int TotalCount)> GetPaginatedAsync(int pageNumber, int pageSize, string searchTerm);
    Task<List<Vehicle>> GetDeletedAsync();
    Task<Guid> AddAsync(Vehicle vehicle);
    Task<Vehicle> UpdateAsync(Vehicle vehicle);
    Task<bool> DeleteAsync(Guid guid);
    
    Task<bool> RegistrationExistsAsync(string regNumber, Guid? excludeId = null);
}