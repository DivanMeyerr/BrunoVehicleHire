using BrunoVehicleHire.Application.Vehicles.Commands.CreateVehicle;
using BrunoVehicleHire.Application.Vehicles.Commands.DeleteVehicle;
using BrunoVehicleHire.Application.Vehicles.Commands.UpdateVehicle;
using BrunoVehicleHire.Application.Vehicles.Queries.GetDeletedVehicles;
using BrunoVehicleHire.Application.Vehicles.Queries.GetVehicleByRegistration;
using BrunoVehicleHire.Application.Vehicles.Queries.GetVehiclesPaginated;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BrunoVehicleHire.API.Controllers;

[ApiController]
[Route("[controller]")]
public class VehiclesController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Create(CreateVehicleCommand command)
    {
        var result = await mediator.Send(command);
        
        return CreatedAtAction(
            nameof(GetVehicleByRegistrationQuery),
            new { registrationNumber = result.RegistrationNumber },  
            result);
    }

    [HttpGet("{registrationNumber}")]
    public async Task<IActionResult> GetVehicleByRegistrationQuery([FromRoute] string registrationNumber)
    {
        var query = new GetVehicleByRegistrationQuery(registrationNumber);
        var result = await mediator.Send(query);
        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllVehicles(
        [FromQuery] int pageNumber,
        [FromQuery] int pageSize,
        [FromQuery] string searchTerm = "")
    {
        var result = await mediator.Send(new GetVehiclesPaginatedQuery(pageNumber, pageSize, searchTerm));
        return Ok(result);
    }
    
    [HttpGet("deleted")]
    public async Task<IActionResult> GetDeleted()
        => Ok(await mediator.Send(new GetDeletedVehiclesQuery()));

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateVehicle([FromRoute] Guid id, UpdateVehicleCommand command)
    {
        var result = await mediator.Send(command with { Id = id });
        return Ok(result);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteVehicle([FromRoute] Guid id)
    {
        await mediator.Send(new DeleteVehicleCommand(id));
        return NoContent();
    }

}