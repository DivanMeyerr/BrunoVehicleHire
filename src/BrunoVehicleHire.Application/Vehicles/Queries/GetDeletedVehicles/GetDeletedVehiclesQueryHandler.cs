using BrunoVehicleHire.Application.Vehicles.DTOs;
using BrunoVehicleHire.Domain.Interfaces;
using MediatR;

namespace BrunoVehicleHire.Application.Vehicles.Queries.GetDeletedVehicles;

public class GetDeletedVehiclesQueryHandler(IVehicleRepository repository)
    : IRequestHandler<GetDeletedVehiclesQuery, List<VehicleDto>>
{
    public async Task<List<VehicleDto>> Handle(
        GetDeletedVehiclesQuery request,
        CancellationToken cancellationToken)
    {
        var vehicles = await repository.GetDeletedAsync();

        return vehicles.Select(v => new VehicleDto(
            v.Id,
            v.RegistrationNumber,
            v.Make,
            v.Model,
            v.Year,
            v.CreatedDate,
            v.DeletedDate
        )).ToList();
    }
}