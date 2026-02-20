using BrunoVehicleHire.Application.Vehicles.DTOs;
using MediatR;

namespace BrunoVehicleHire.Application.Vehicles.Commands.CreateVehicle;

public record CreateVehicleCommand(
    string RegistrationNumber,
    string Make,
    string Model,
    int Year) : IRequest<VehicleDto>;