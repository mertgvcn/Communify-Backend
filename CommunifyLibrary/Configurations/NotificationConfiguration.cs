using CommunifyLibrary.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CommunifyLibrary.Configurations;
public class NotificationConfiguration : BaseEntityConfiguration<Notification>
{
    public void Configure(EntityTypeBuilder<Notification> builder)
    {
        base.Configure(builder);

        builder.Property(x => x.Message)
            .IsRequired(true)
            .HasMaxLength(64);

        builder.Property(x => x.Seen)
            .IsRequired(true)
            .HasDefaultValue(false);
    }
}
