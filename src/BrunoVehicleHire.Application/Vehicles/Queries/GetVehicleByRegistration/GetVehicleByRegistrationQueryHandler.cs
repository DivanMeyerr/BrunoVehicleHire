using BrunoVehicleHire.Application.Vehicles.DTOs;
using BrunoVehicleHire.Domain.Interfaces;
using MediatR;

namespace BrunoVehicleHire.Application.Vehicles.Queries.GetVehicleByRegistration;

public class GetVehicleByRegistrationQueryHandler(IVehicleRepository repository)
: IRequestHandler<GetVehicleByRegistrationQuery, VehicleDto>
{
    public async Task<VehicleDto> Handle(GetVehicleByRegistrationQuery request, CancellationToken cancellationToken)
    {
        var vehicle = await repository.GetByRegistrationNumberAsync(request.RegistrationNumber) 
            ?? throw new KeyNotFoundException("Vehicle not found.");

        return new VehicleDto(
            Id: vehicle.Id,
            RegistrationNumber: vehicle.RegistrationNumber,
            Make: vehicle.Make,
            Model: vehicle.Model,
            Year: vehicle.Year,
            CreatedDate: vehicle.CreatedDate);
    }
}