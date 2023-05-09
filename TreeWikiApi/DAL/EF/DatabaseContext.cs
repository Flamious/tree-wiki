using DAL.Entities;
using Microsoft.EntityFrameworkCore;
using static System.Net.Mime.MediaTypeNames;
using System.Diagnostics;

namespace DAL.EF
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
        { }

        public DbSet<Character> Characters { get; set; }
        public DbSet<Connection> Connections{ get; set; }
        public DbSet<Work> Works { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Character>(entity =>
            {
                entity.HasKey(l => l.Id);
            });


            modelBuilder.Entity<Connection>(entity =>
            {
                entity.HasKey(t => t.Id);
            });

            modelBuilder.Entity<Work>(entity =>
            {
                entity.HasKey(q => q.Id);
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
