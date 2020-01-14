using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace TrelloAPI.Models.Configurations
{
    public class BoardConfigurations : IEntityTypeConfiguration<Board>
    {
        public void Configure(EntityTypeBuilder<Board> builder)
        {
            builder.ToTable("Board");

            builder.HasKey("Id");
        }
    }
}
