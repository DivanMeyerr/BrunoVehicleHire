using BrunoVehicleHire.Application.Common.Models;
using BrunoVehicleHire.Application.Vehicles.DTOs;
using MediatR;

namespace BrunoVehicleHire.Application.Vehicles.Queries.GetVehiclesPaginated;

public record GetVehiclesPaginatedQuery(
    int PageNumber,
    int PageSize, 
    string SearchTerm) : IRequest<PaginatedResult<VehicleDto>>;
    