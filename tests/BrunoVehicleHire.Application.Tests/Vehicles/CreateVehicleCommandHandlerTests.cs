using BrunoVehicleHire.Application.Vehicles.Commands.CreateVehicle;
using BrunoVehicleHire.Domain.Entities;
using BrunoVehicleHire.Domain.Interfaces;
using FluentAssertions;
using NSubstitute;

namespace BrunoVehicleHire.Application.Tests.Vehicles;

public class CreateVehicleCommandHandlerTests
{
    private readonly IVehicleRepository _repository;
    private readonly CreateVehicleCommandHandler _handler;

    public CreateVehicleCommandHandlerTests()
    {
        _repository = Substitute.For<IVehicleRepository>();
        _handler = new CreateVehicleCommandHandler(_repository);
    }

    [Fact]
    public async Task Handle_ValidCommand_ReturnsVehicleDto()
    {
        var command = new CreateVehicleCommand(
            "ABC123",
            "Toyota",
            "Corolla",
            2020);

        _repository.AddAsync(Arg.Any<Vehicle>(), Arg.Any<CancellationToken>())
            .Returns(Guid.NewGuid());

        var result = await _handler.Handle(command, CancellationToken.None);

        result.Should().NotBeNull();
        result.RegistrationNumber.Should().Be("ABC123");
        result.Make.Should().Be("Toyota");
        result.Model.Should().Be("Corolla");
        result.Year.Should().Be(2020);
    }

    [Fact]
    public async Task Handle_ValidCommand_CallsRepositoryOnce()
    {
        var command = new CreateVehicleCommand(
            "ABC123",
            "Toyota",
            "Corolla",
            2020);

        _repository.AddAsync(Arg.Any<Vehicle>(), Arg.Any<CancellationToken>())
            .Returns(Guid.NewGuid());

        await _handler.Handle(command, CancellationToken.None);

        await _repository.Received(1).AddAsync(Arg.Any<Vehicle>(), Arg.Any<CancellationToken>());
    }
}