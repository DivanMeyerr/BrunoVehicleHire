using BrunoVehicleHire.Application.Vehicles.DTOs;
using MediatR;

namespace BrunoVehicleHire.Application.Vehicles.Queries.GetDeletedVehicles;

public record GetDeletedVehiclesQuery() : IRequest<List<VehicleDto>>;