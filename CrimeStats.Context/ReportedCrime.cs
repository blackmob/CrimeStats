namespace CrimeStats.Context
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ReportedCrime")]
    public partial class ReportedCrime
    {
        public int Id { get; set; }

        [StringLength(50)]
        public string Month { get; set; }

        [StringLength(255)]
        public string ReportedBy { get; set; }

        [StringLength(255)]
        public string FallsWithin { get; set; }

        public decimal? Longitude { get; set; }

        public decimal? Latitude { get; set; }

        [StringLength(255)]
        public string Location { get; set; }

        [StringLength(255)]
        public string LSOACode { get; set; }

        [StringLength(255)]
        public string LSOAName { get; set; }

        [StringLength(255)]
        public string Crimetype { get; set; }
    }
}
