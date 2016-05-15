using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using ReactWebApi.Model;
using Visma.BusinessModel;
using Visma.BusinessServices.Generic;
using Visma.BusinessServices.Wrapper;

namespace ReactWebApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CustomersController : VbsController
    {
        // GET api/customers
        public IEnumerable<Customer> Get()
        {
            using (GenericServiceClient genericServiceClient = new GenericServiceClient())
            {
                GetAndApplyVbsClientCredentials(genericServiceClient.ClientCredentials);
                var requestBuilder = new RequestBuilder();
                var context = GetContext(requestBuilder);

                var table = context.UseTable((long) T.Associate);
                var selection = table.SelectRows();
                selection.IntegerColumnValue((long) C.Associate.CustomerNo, ComparisonOperator.GreaterThan, 0);

                var rows = selection.Rows;
                var projection = rows.ProjectColumns();
                projection.AddColumn((long) C.Associate.AssociateNo);
                projection.AddColumn((long) C.Associate.CustomerNo);
                projection.AddColumn((long) C.Associate.Name);
                projection.AddColumn((long) C.Associate.AddressLine1);
                projection.AddColumn((long) C.Associate.PostCode);
                projection.AddColumn((long) C.Associate.PostalArea);
                projection.AddColumn((long) C.Associate.ChangedDate);
                projection.AddColumn((long) C.Associate.ChangedTime);

                var responseReader = requestBuilder.Dispatch(genericServiceClient);

                OperationResult operationResult = null;

                if (responseReader.OperationResultDictionary.TryGetValue(projection.Operation.OperationNo,
                    out operationResult))
                {
                    var projectionResult = operationResult as ProjectionResult;
                    if (projectionResult != null)
                    {
                        var result = projectionResult.ResultSet.ResultRows.Select(row => new Customer
                        {
                            AssociateNo = row.GetIntegerValue((long) C.Associate.AssociateNo),
                            CustomerNo = row.GetIntegerValue((long) C.Associate.CustomerNo),
                            Name = row.GetStringValue((long) C.Associate.Name),
                            Address1 = row.GetStringValue((long) C.Associate.AddressLine1),
                            PostCode = row.GetStringValue((long) C.Associate.PostCode),
                            PostalArea = row.GetStringValue((long) C.Associate.PostalArea),
                            ChangedDateTime = GetCombinedDateTime(row, (long) C.Associate.ChangedDate, (long) C.Associate.ChangedTime)
                        });
                        return result;
                    }
                }

                return new List<Customer>(0);
            }
        }

        // GET api/customers/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/customers
        public void Post([FromBody]string value)
        {
        }

        // PUT api/customers/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/customers/5
        public void Delete(int id)
        {
        }
    }
}
