using BrunoVehicleHire.Domain.Interfaces;
using MediatR;

namespace BrunoVehicleHire.Application.Vehicles.Commands.DeleteVehicle;

public class DeleteVehicleCommandHandler(IVehicleRepository repository)
: IRequestHandler<DeleteVehicleCommand, Boolean>
{
    public async Task<bool> Handle(DeleteVehicleCommand request, CancellationToken cancellationToken)
    {
        var result = await repository.DeleteAsync(request.Id, cancellationToken);

        if (!result)
        {
            throw new KeyNotFoundException("Vehicle not found.");
        }

        return result;
    }
}