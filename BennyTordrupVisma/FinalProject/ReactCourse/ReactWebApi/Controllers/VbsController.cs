using System;
using System.Globalization;
using System.ServiceModel.Description;
using System.Web.Http;
using Visma.BusinessServices.Client;
using Visma.BusinessServices.Generic;
using Visma.BusinessServices.Wrapper;

namespace ReactWebApi.Controllers
{
    public class VbsController : ApiController
    {
        protected void GetAndApplyVbsClientCredentials(ClientCredentials clientCredentials)
        {
            // Apply credentials.

            //new Credentials(true).Apply(clientCredentials);

            // Run tests using an integration user in Business.

            new Credentials("VBus1100", "system", "Visma2016").Apply(clientCredentials);

            //new Credentials ("standard", "IntegrationUser", string.Empty).Apply (clientCredentials);

            // Run tests using a Service Account / Licensing

            //new VismaLicenseCredentials (new Guid ("257564c8-c5d4-4101-9b94-97a821ea1ad3"),
            //                             "admin",
            //                             string.Empty).Apply (clientCredentials);
        }

        protected Context GetContext(RequestBuilder requestBuilder)
        {
            var context = requestBuilder.AddContext();

            context.SiteId = "VBus1100";
            context.UserName = "system";
            context.CompanyNo = 9999;

            return context;
        }

        protected DateTime GetCombinedDateTime(ResultRow row, long dateCNo, long timeCNo)
        {
            var date = row.GetIntegerValue(dateCNo);
            var time = row.GetIntegerValue(timeCNo);
            var dateTime = DateTime.ParseExact($"{date:000000}-{time:0000}", "yyyyMMdd-HHmm",
                CultureInfo.InvariantCulture);
            return dateTime;
        }

        protected DateTime FromVismaBusinessDate(int vbusDate)
        {
            if (vbusDate == 0)
                return DateTime.MinValue;

            return DateTime.ParseExact($"{vbusDate:000000}", "yyyyMMdd", CultureInfo.InvariantCulture);
        }
    }
}