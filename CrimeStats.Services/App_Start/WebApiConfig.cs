using System;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.OData.Builder;
using System.Web.OData.Extensions;
using Newtonsoft.Json.Converters;
using System.Globalization;
using Newtonsoft.Json;
using CrimeStats.Context;
using Newtonsoft.Json.Serialization;

namespace CrimeStats.Services
{
    using System.Web.Http.Cors;

    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            config.Formatters.JsonFormatter.UseDataContractJsonSerializer = false;
            config.Formatters.JsonFormatter.SerializerSettings.Converters.Add(new IsoDateTimeConverter { Culture = new CultureInfo("en-GB") });
            config.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            config.Formatters.Remove(
                config.Formatters.XmlFormatter);

            config.Routes.MapHttpRoute("DefaultApi", "api/{controller}/{action}/{id}",
                new { id = RouteParameter.Optional }
            );

            var cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors);

            var builder = GenerateEdmModel();
            builder.EnableLowerCamelCase();
            var model = builder.GetEdmModel();
            config.MapODataServiceRoute("odata", "odata", model);
        }

        public static ODataConventionModelBuilder GenerateEdmModel()
        {
            var builder = new ODataConventionModelBuilder();

            builder.EntitySet<ReportedCrime>("ReportedCrimes").EntityType.HasKey(t => t.Id);
            
            builder.MaxDataServiceVersion = Version.Parse("4.0");
            builder.DataServiceVersion = Version.Parse("4.0");
            return builder;
        }
    }
}
