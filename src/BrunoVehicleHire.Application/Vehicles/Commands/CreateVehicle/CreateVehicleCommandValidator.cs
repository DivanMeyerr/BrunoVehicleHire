using BrunoVehicleHire.Domain.Interfaces;
using FluentValidation;

namespace BrunoVehicleHire.Application.Vehicles.Commands.CreateVehicle;

public class CreateVehicleCommandValidator : AbstractValidator<CreateVehicleCommand>
{
    public CreateVehicleCommandValidator(IVehicleRepository repository)
    {
        RuleFor(x => x.RegistrationNumber)
            .NotEmpty()
            .MaximumLength(20)
            .MustAsync(async (reg, ct) =>
            !await repository.RegistrationExistsAsync(reg));
        
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