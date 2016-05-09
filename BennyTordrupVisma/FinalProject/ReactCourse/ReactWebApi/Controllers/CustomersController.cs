using System.Collections.Generic;
using System.Linq;
using System.ServiceModel.Description;
using System.Web.Http;
using System.Web.Http.Cors;
using Visma.BusinessModel;
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

            new Credentials("standard", "system", "Visma201605").Apply(clientCredentials);

            //new Credentials ("standard", "IntegrationUser", string.Empty).Apply (clientCredentials);

            // Run tests using a Service Account / Licensing

            //new VismaLicenseCredentials (new Guid ("257564c8-c5d4-4101-9b94-97a821ea1ad3"),
            //                             "admin",
            //                             string.Empty).Apply (clientCredentials);
        }

        protected Context GetContext(RequestBuilder requestBuilder)
        {
            var context = requestBuilder.AddContext();

            context.SiteId = "standard";
            context.UserName = "system";
            context.CompanyNo = 9999;

            return context;
        }

    }

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CustomersController : VbsController
    {
        // GET api/values
        public IEnumerable<object> Get()
        {
            using (GenericServiceClient genericServiceClient = new GenericServiceClient())
            {
                GetAndApplyVbsClientCredentials(genericServiceClient.ClientCredentials);
                RequestBuilder requestBuilder = new RequestBuilder();
                var context = GetContext(requestBuilder);

                var associatesTable = context.UseTable((long) T.Associate);
                var associatesSelection = associatesTable.SelectRows(CacheUsage.UtilizeReadCache);
                associatesSelection.IntegerColumnValue((long) C.Associate.CustomerNo, ComparisonOperator.GreaterThan, 0);

                var associateRows = associatesSelection.Rows;
                var associateProjection = associateRows.ProjectColumns();
                associateProjection.AddColumn((long) C.Associate.CustomerNo);
                associateProjection.AddColumn((long) C.Associate.Name);
                associateProjection.AddColumn((long) C.Associate.AddressLine1);
                associateProjection.AddColumn((long) C.Associate.PostCode);
                associateProjection.AddColumn((long) C.Associate.PostalArea);

                var responseReader = requestBuilder.Dispatch(genericServiceClient);

                OperationResult operationResult = null;

                if (responseReader.OperationResultDictionary.TryGetValue(associateProjection.Operation.OperationNo,
                    out operationResult))
                {
                    var projectionResult = operationResult as ProjectionResult;
                    if (projectionResult != null)
                    {
                        var result = projectionResult.ResultSet.ResultRows.Select(row => new
                        {
                            CustomerNo = row.GetIntegerValue((long) C.Associate.CustomerNo),
                            Name = row.GetStringValue((long) C.Associate.Name),
                            Address1 = row.GetStringValue((long) C.Associate.AddressLine1),
                            PostCode = row.GetStringValue((long) C.Associate.PostCode),
                            PostalArea = row.GetStringValue((long) C.Associate.PostalArea)
                        });
                        return result;
                    }
                }

                return new List<object>(0);
            }

            //return new object[]
            //{
            //    new
            //    {
            //        CustomerNo = 10000,
            //        Name = "Benny Tordrup",
            //        Address1 = "Norgesvej 8",
            //        PostCode = "4270",
            //        PostalArea = "Høng"
            //    },
            //    new
            //    {
            //        CustomerNo = 10001,
            //        Name = "Ann Schjøts",
            //        Address1 = "Norgesvej 8",
            //        PostCode = "4270",
            //        PostalArea = "Høng"
            //    }
            //};

            // var _customers = [{
            //    customerNo: 10000,
            //    name: 'Benny Tordrup',
            //    address1: 'Norgesvej 8',
            //    postCode: '4270',
            //    postalArea: 'Høng',
            // }, {
            //    customerNo: 10001,
            //    name: 'Ann Schjøts',
            //    address1: 'Norgesvej 8',
            //    postCode: '4270',
            //    postalArea: 'Høng',
            // }]
            //return new object[] { "value1", "value2" };
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
