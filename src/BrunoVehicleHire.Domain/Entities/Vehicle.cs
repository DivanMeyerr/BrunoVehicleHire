namespace BrunoVehicleHire.Domain.Entities;

public class Vehicle
{
    public Guid Id { get; set; }
    public required string RegistrationNumber { get; set; } 
    public required string Make { get; set; }
    public required string Model { get; set; } 
    public required int Year { get; set; } 
    public bool IsDeleted { get; set; }
    public DateTime CreatedDate { get; set; }
}