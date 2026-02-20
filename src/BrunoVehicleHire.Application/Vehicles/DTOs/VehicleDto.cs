namespace BrunoVehicleHire.Application.Vehicles.DTOs;

public record VehicleDto (
    Guid Id,
    string RegistrationNumber,
    string Make,
    string Model,
    int Year,
    DateTime CreatedDate
    );