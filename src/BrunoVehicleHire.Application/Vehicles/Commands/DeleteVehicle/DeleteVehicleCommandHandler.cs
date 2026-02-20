using BrunoVehicleHire.Domain.Interfaces;

namespace BrunoVehicleHire.Application.Vehicles.Commands.DeleteVehicle;

public class DeleteVehicleCommandHandler(IVehicleRepository repository)
{
    public async Task<bool> Handle(DeleteVehicleCommand request, CancellationToken cancellationToken)
    {
        var result = await repository.DeleteAsync(request.Id);

        if (!result)
        {
            throw new KeyNotFoundException("Vehicle not found.");
        }

        return result;
    }
}