using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using CrimeStats.Context;
using System.Web.OData.Routing;

namespace CrimeStats.Services.Controllers
{
    using System.Web.OData;

    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using CrimeStats.Context;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<ReportedCrime>("ReportedCrimes");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class ReportedCrimesController : ODataController
    {
        private CrimeStatsContext db = new CrimeStatsContext();

        // GET: odata/ReportedCrimes
        [EnableQuery, ODataRoute]
        public IQueryable<ReportedCrime> GetReportedCrimes()
        {
            return db.ReportedCrimes;
        }

        // GET: odata/ReportedCrimes(5)
        [EnableQuery, ODataRoute]
        public SingleResult<ReportedCrime> GetReportedCrime([FromODataUri] int key)
        {
            return SingleResult.Create(db.ReportedCrimes.Where(reportedCrime => reportedCrime.Id == key));
        }

        // PUT: odata/ReportedCrimes(5)
        public async Task<IHttpActionResult> Put([FromODataUri] int key, Delta<ReportedCrime> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ReportedCrime reportedCrime = await db.ReportedCrimes.FindAsync(key);
            if (reportedCrime == null)
            {
                return NotFound();
            }

            patch.Put(reportedCrime);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReportedCrimeExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(reportedCrime);
        }

        // POST: odata/ReportedCrimes
        public async Task<IHttpActionResult> Post(ReportedCrime reportedCrime)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ReportedCrimes.Add(reportedCrime);
            await db.SaveChangesAsync();

            return Created(reportedCrime);
        }

        // PATCH: odata/ReportedCrimes(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri] int key, Delta<ReportedCrime> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ReportedCrime reportedCrime = await db.ReportedCrimes.FindAsync(key);
            if (reportedCrime == null)
            {
                return NotFound();
            }

            patch.Patch(reportedCrime);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReportedCrimeExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(reportedCrime);
        }

        // DELETE: odata/ReportedCrimes(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] int key)
        {
            ReportedCrime reportedCrime = await db.ReportedCrimes.FindAsync(key);
            if (reportedCrime == null)
            {
                return NotFound();
            }

            db.ReportedCrimes.Remove(reportedCrime);
            await db.SaveChangesAsync();

            return StatusCode(HttpStatusCode.NoContent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ReportedCrimeExists(int key)
        {
            return db.ReportedCrimes.Count(e => e.Id == key) > 0;
        }
    }
}
