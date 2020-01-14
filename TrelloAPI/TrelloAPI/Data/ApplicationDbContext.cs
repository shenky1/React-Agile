using Microsoft.EntityFrameworkCore;
using TrelloAPI.Models;
using TrelloAPI.Models.Configurations;

namespace TrelloAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
           
            modelBuilder.ApplyConfiguration(new UserConfigurations());
            modelBuilder.ApplyConfiguration(new BoardConfigurations());
            modelBuilder.ApplyConfiguration(new ListConfigurations());
            modelBuilder.ApplyConfiguration(new CommentConfigurations());
            modelBuilder.ApplyConfiguration(new CardConfigurations());
            modelBuilder.ApplyConfiguration(new TeamConfigurations());
            modelBuilder.ApplyConfiguration(new TeamUserMappingConfigurations());
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Board> Boards { get; set; }
        public DbSet<Card> Cards { get; set; }
        public DbSet<List> Lists { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<TeamUserMapping> TeamUserMappings { get; set; }
    }
}
