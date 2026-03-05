using BrunoVehicleHire.Application.Vehicles.DTOs;
using BrunoVehicleHire.Domain.Entities;
using BrunoVehicleHire.Domain.Interfaces;
using MediatR;

namespace BrunoVehicleHire.Application.Vehicles.Commands.UpdateVehicle;

public class UpdateVehicleCommandHandler(IVehicleRepository repository) 
: IRequestHandler<UpdateVehicleCommand, VehicleDto>
{
    public async Task<VehicleDto> Handle(UpdateVehicleCommand request, CancellationToken cancellationToken)
    {
        var vehicle = await repository.GetByIdAsync(request.Id) ?? throw new KeyNotFoundException("Vehicle not found.");

        vehicle.RegistrationNumber = request.RegistrationNumber;
        vehicle.Make = request.Make;
        vehicle.Model = request.Model;
        vehicle.Year = request.Year;
        
        var updated = await repository.UpdateAsync(vehicle, cancellationToken);

        return new VehicleDto(
            updated.Id,
            updated.RegistrationNumber,
            updated.Make,
            updated.Model,
            updated.Year,
            updated.CreatedDate);
    }
}