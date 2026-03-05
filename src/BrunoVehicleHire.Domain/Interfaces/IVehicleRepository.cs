using BrunoVehicleHire.Domain.Entities;

namespace BrunoVehicleHire.Domain.Interfaces;

public interface IVehicleRepository
{
    Task<Vehicle?> GetByIdAsync(Guid vehicleId);
    Task<Vehicle?> GetByRegistrationNumberAsync(string registrationNumber);
    Task<(List<Vehicle> Items, int TotalCount)> GetPaginatedAsync(int pageNumber, int pageSize, string searchTerm);
    Task<List<Vehicle>> GetDeletedAsync();
    Task<Guid> AddAsync(Vehicle vehicle, CancellationToken cancellationToken);
    Task<Vehicle> UpdateAsync(Vehicle vehicle, CancellationToken cancellationToken);
    Task<bool> DeleteAsync(Guid guid, CancellationToken cancellationToken);
    
    Task<bool> RegistrationExistsAsync(string regNumber, Guid? excludeId = null);
}