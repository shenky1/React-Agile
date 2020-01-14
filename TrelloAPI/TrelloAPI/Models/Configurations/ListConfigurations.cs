using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace TrelloAPI.Models.Configurations
{
    public class ListConfigurations : IEntityTypeConfiguration<List>
    {
        public void Configure(EntityTypeBuilder<List> builder)
        {
            builder.ToTable("List");

            builder.HasKey("Id");

        }
    }
}
