using MediatR;

namespace BrunoVehicleHire.Application.Vehicles.Commands.DeleteVehicle;

public record DeleteVehicleCommand(
    Guid Id) : IRequest<bool>;