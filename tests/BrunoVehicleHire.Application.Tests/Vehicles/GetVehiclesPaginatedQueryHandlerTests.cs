using BrunoVehicleHire.Application.Vehicles.DTOs;
using BrunoVehicleHire.Application.Vehicles.Queries.GetVehiclesPaginated;
using BrunoVehicleHire.Domain.Entities;
using BrunoVehicleHire.Domain.Interfaces;
using FluentAssertions;
using NSubstitute;

namespace BrunoVehicleHire.Application.Tests.Vehicles;

public class GetVehiclesPaginatedQueryHandlerTests
{
    private readonly IVehicleRepository _repository;
    private readonly GetVehiclesPaginatedQueryHandler _handler;

    public GetVehiclesPaginatedQueryHandlerTests()
    {
        _repository = Substitute.For<IVehicleRepository>();
        _handler = new GetVehiclesPaginatedQueryHandler(_repository);
    }

    [Fact]
    public async Task Handle_ReturnsCorrectPage()
    {
        var vehicles = new List<Vehicle>
        {
            new() { Id = Guid.NewGuid(), RegistrationNumber = "ABC123", Make = "Toyota", Model = "Corolla", Year = 2020, CreatedDate = DateTime.UtcNow },
            new() { Id = Guid.NewGuid(), RegistrationNumber = "XYZ999", Make = "BMW", Model = "X5", Year = 2021, CreatedDate = DateTime.UtcNow }
        };

        _repository.GetPaginatedAsync(1, 10, "")
            .Returns((vehicles, 2));

        var query = new GetVehiclesPaginatedQuery(1, 10, "");

        var result = await _handler.Handle(query, CancellationToken.None);

        result.Should().NotBeNull();
        result.Items.Should().HaveCount(2);
        result.TotalCount.Should().Be(2);
        result.PageNumber.Should().Be(1);
        result.TotalPages.Should().Be(1);
        result.HasNextPage.Should().BeFalse();
        result.HasPreviousPage.Should().BeFalse();
    }

    [Fact]
    public async Task Handle_EmptyResults_ReturnsEmptyList()
    {
        _repository.GetPaginatedAsync(1, 10, "")
            .Returns((new List<Vehicle>(), 0));

        var query = new GetVehiclesPaginatedQuery(1, 10, "");

        var result = await _handler.Handle(query, CancellationToken.None);

        result.Items.Should().BeEmpty();
        result.TotalCount.Should().Be(0);
        result.TotalPages.Should().Be(0);
        result.HasNextPage.Should().BeFalse();
        result.HasPreviousPage.Should().BeFalse();
    }

    [Fact]
    public async Task Handle_MultiplePages_ReturnsCorrectPaginationFlags()
    {
        var vehicles = new List<Vehicle>
        {
            new() { Id = Guid.NewGuid(), RegistrationNumber = "ABC123", Make = "Toyota", Model = "Corolla", Year = 2020, CreatedDate = DateTime.UtcNow }
        };

        _repository.GetPaginatedAsync(2, 10, "")
            .Returns((vehicles, 25));

        var query = new GetVehiclesPaginatedQuery(2, 10, "");

        var result = await _handler.Handle(query, CancellationToken.None);

        result.TotalCount.Should().Be(25);
        result.TotalPages.Should().Be(3);
        result.HasPreviousPage.Should().BeTrue();
        result.HasNextPage.Should().BeTrue();
    }
}