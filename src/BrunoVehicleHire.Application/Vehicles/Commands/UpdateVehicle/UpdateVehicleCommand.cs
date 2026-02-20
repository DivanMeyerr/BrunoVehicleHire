using BrunoVehicleHire.Application.Vehicles.DTOs;
using MediatR;

namespace BrunoVehicleHire.Application.Vehicles.Commands.UpdateVehicle;

public record UpdateVehicleCommand(
    Guid Id,
    string RegistrationNumber,
    string Make,
    string Model,
    int Year) : IRequest<VehicleDto>;