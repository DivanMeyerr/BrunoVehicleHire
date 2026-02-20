using BrunoVehicleHire.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BrunoVehicleHire.Infrastructure.Persistence.Configurations;

public class VehicleConfiguration : IEntityTypeConfiguration<Vehicle>
{
    public void Configure(EntityTypeBuilder<Vehicle> builder)
    {
        builder.HasKey(v => v.Id);
        builder.Property(v => v.RegistrationNumber).IsRequired().HasMaxLength(20);
        builder.Property(v => v.Make).HasMaxLength(100);
        builder.Property(v => v.Model).HasMaxLength(100);
        builder.Property(v => v.IsDeleted).HasDefaultValue(false);
        builder.HasIndex(v => v.RegistrationNumber).IsUnique();
        builder.HasQueryFilter(v => !v.IsDeleted);
    }
}