using BrunoVehicleHire.Application.Common.Models;
using BrunoVehicleHire.Application.Vehicles.DTOs;
using BrunoVehicleHire.Domain.Interfaces;
using MediatR;

namespace BrunoVehicleHire.Application.Vehicles.Queries.GetVehiclesPaginated;

public class GetVehiclesPaginatedQueryHandler(IVehicleRepository repository)
    : IRequestHandler<GetVehiclesPaginatedQuery, PaginatedResult<VehicleDto>>
{
    public async Task<PaginatedResult<VehicleDto>> Handle(GetVehiclesPaginatedQuery request, CancellationToken cancellationToken)
    {
        var (items, totalCount) = await repository.GetPaginatedAsync(request.PageNumber, request.PageSize, request.SearchTerm);

        var dtos = items.Select(v => new VehicleDto(
            v.Id,
            v.RegistrationNumber,
            v.Make,
            v.Model,
            v.Year,
            v.CreatedDate)).ToList();

        return new PaginatedResult<VehicleDto>(
            dtos,
            totalCount,
            request.PageNumber,
            request.PageSize);
    }
}