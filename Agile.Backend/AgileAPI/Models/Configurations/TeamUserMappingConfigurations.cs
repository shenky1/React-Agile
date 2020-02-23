using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace TrelloAPI.Models.Configurations
{
    public class TeamUserMappingConfigurations : IEntityTypeConfiguration<TeamUserMapping>
    {
        public void Configure(EntityTypeBuilder<TeamUserMapping> builder)
        {
            builder.ToTable("TeamUserMapping");

            builder.HasKey("Id");
        }
    }
}
