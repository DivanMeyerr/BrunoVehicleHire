using BrunoVehicleHire.Domain.Interfaces;
using FluentValidation;

namespace BrunoVehicleHire.Application.Vehicles.Commands.UpdateVehicle;

public class UpdateVehicleCommandValidator: AbstractValidator<UpdateVehicleCommand>
{
    public UpdateVehicleCommandValidator(IVehicleRepository repository)
    {
        RuleFor(x => x.Id)
            .NotEmpty();

        RuleFor(x => x.RegistrationNumber)
            .NotEmpty()
            .MaximumLength(20)
            .MustAsync(async (command, reg, ct) =>
                !await repository.RegistrationExistsAsync(reg, command.Id))
            .WithMessage("Registration number already exists.");
        
        RuleFor(x => x.Make)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(x => x.Model)
            .NotEmpty()
            .MaximumLength(100);
        
        RuleFor(x => x.Year)
            .InclusiveBetween(1900, DateTime.UtcNow.Year + 1);
    }
}