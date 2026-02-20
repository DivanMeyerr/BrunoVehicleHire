using BrunoVehicleHire.Application.Vehicles.DTOs;
using BrunoVehicleHire.Domain.Entities;
using BrunoVehicleHire.Domain.Interfaces;
using MediatR;

namespace BrunoVehicleHire.Application.Vehicles.Commands.CreateVehicle;

public class CreateVehicleCommandHandler(IVehicleRepository  repository)
: IRequestHandler<CreateVehicleCommand, VehicleDto>
{
    public async Task<VehicleDto> Handle(CreateVehicleCommand request, CancellationToken cancellationToken)
    {
        var vehicle = new Vehicle
        {
            Id = Guid.NewGuid(),
            RegistrationNumber = request.RegistrationNumber,
            Make = request.Make,
            Model = request.Model,
            Year = request.Year,
            CreatedDate = DateTime.UtcNow,
        };
        
        await repository.AddAsync(vehicle);

        return new VehicleDto(
            vehicle.Id,
            vehicle.RegistrationNumber,
            vehicle.Make,
            vehicle.Model,
            vehicle.Year,
            vehicle.CreatedDate);
    }
}