using BrunoVehicleHire.Application.Vehicles.DTOs;
using MediatR;

namespace BrunoVehicleHire.Application.Vehicles.Queries.GetVehicleByRegistration;

public record GetVehicleByRegistrationQuery(
    string RegistrationNumber) : IRequest<VehicleDto>;