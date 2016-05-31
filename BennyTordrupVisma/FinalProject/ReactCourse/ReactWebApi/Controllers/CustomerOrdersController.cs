using System.Collections.Generic;
using System.Linq;
using System.Web.Http.Cors;
using ReactWebApi.Model;
using Visma.BusinessModel;
using Visma.BusinessServices.Generic;
using Visma.BusinessServices.Wrapper;

namespace ReactWebApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CustomerOrdersController : VbsController
    {
        public IEnumerable<CustomerOrder> Get(int id)
        {
            using (GenericServiceClient genericServiceClient = new GenericServiceClient())
            {
                GetAndApplyVbsClientCredentials(genericServiceClient.ClientCredentials);
                var requestBuilder = new RequestBuilder();
                var context = GetContext(requestBuilder);

                var table = context.UseTable((long) T.Order);
                var selection = table.SelectRows();
                selection.IntegerColumnValue((long) C.Order.CustomerNo, ComparisonOperator.EqualTo, id);

                var rows = selection.Rows;
                var projection = rows.ProjectColumns();
                projection.AddColumn((long) C.Order.OrderNo);
                projection.AddColumn((long) C.Order.OrderDate);
                projection.AddColumn((long) C.Order.CustomerNo);
                projection.AddColumn((long) C.Order.RequiredDeliveryDate);
                projection.AddColumn((long) C.Order.InvoicedAmountSoFarDomestic);
                projection.AddColumn((long) C.Order.InvoicedAmountInFutureDomestic);
                projection.AddColumn((long) C.Order.InvoicedAmountTotalDomestic);
                projection.AddColumn((long) C.Order.ChangedDate);
                projection.AddColumn((long) C.Order.ChangedTime);

                var responseReader = requestBuilder.Dispatch(genericServiceClient);

                OperationResult operationResult = null;

                if (responseReader.OperationResultDictionary.TryGetValue(projection.Operation.OperationNo,
                    out operationResult))
                {
                    var projectionResult = operationResult as ProjectionResult;
                    if (projectionResult != null)
                    {
                        var result = projectionResult.ResultSet.ResultRows.Select(row => new CustomerOrder
                        {
                            OrderNo = row.GetIntegerValue((long) C.Order.OrderNo),
                            OrderDate = FromVismaBusinessDate(row.GetIntegerValue((long) C.Order.OrderDate)),
                            CustomerNo = row.GetIntegerValue((long) C.Order.CustomerNo),
                            RequiredDeliveryDate = FromVismaBusinessDate(row.GetIntegerValue((long) C.Order.RequiredDeliveryDate)),
                            InvoiceAmountSoFar = row.GetIntegerValue((long) C.Order.InvoicedAmountSoFarDomestic),
                            InvoiceAmountInFuture = row.GetIntegerValue((long) C.Order.InvoicedAmountInFutureDomestic),
                            InvoiceAmountTotal = row.GetIntegerValue((long) C.Order.InvoicedAmountTotalDomestic),
                            ChangedDateTime = GetCombinedDateTime(row, (long) C.Order.ChangedDate, (long) C.Order.ChangedTime)
                        });
                        return result;
                    }
                }

                return new List<CustomerOrder>(0);
            }
        } 
    }
}