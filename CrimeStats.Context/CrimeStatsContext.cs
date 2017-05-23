namespace CrimeStats.Context
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class CrimeStatsContext : DbContext
    {
        public CrimeStatsContext()
            : base("name=CrimeStats")
        {
        }

        public virtual DbSet<ReportedCrime> ReportedCrimes { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ReportedCrime>()
                .Property(e => e.Longitude)
                .HasPrecision(9, 6);

            modelBuilder.Entity<ReportedCrime>()
                .Property(e => e.Latitude)
                .HasPrecision(9, 6);
        }
    }
}
