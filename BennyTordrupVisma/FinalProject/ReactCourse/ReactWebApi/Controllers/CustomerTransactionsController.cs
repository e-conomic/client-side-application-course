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
    public class CustomerTransactionsController : VbsController
    {
        // GET api/customertransactions/customerNo
        public IEnumerable<CustomerTransaction> Get(int id)
        {
            using (GenericServiceClient genericServiceClient = new GenericServiceClient())
            {
                GetAndApplyVbsClientCredentials(genericServiceClient.ClientCredentials);
                var requestBuilder = new RequestBuilder();
                var context = GetContext(requestBuilder);

                var table = context.UseTable((long) T.CustomerTransaction);
                var selection= table.SelectRows();
                selection.IntegerColumnValue((long) C.CustomerTransaction.CustomerNo, ComparisonOperator.EqualTo, id);

                var rows = selection.Rows;
                var projection = rows.ProjectColumns();
                projection.AddColumn((long) C.CustomerTransaction.VoucherJournalNo);
                projection.AddColumn((long) C.CustomerTransaction.AuditNo);
                projection.AddColumn((long) C.CustomerTransaction.CustomerNo);
                projection.AddColumn((long) C.CustomerTransaction.VoucherNo);
                projection.AddColumn((long) C.CustomerTransaction.VoucherDate);
                projection.AddColumn((long) C.CustomerTransaction.Text);
                projection.AddColumn((long) C.CustomerTransaction.AmountDomestic);
                projection.AddColumn((long) C.CustomerTransaction.InvoiceNo);
                projection.AddColumn((long) C.CustomerTransaction.ChangedDate);
                projection.AddColumn((long) C.CustomerTransaction.ChangedTime);

                var responseReader = requestBuilder.Dispatch(genericServiceClient);

                OperationResult operationResult = null;

                if (responseReader.OperationResultDictionary.TryGetValue(projection.Operation.OperationNo,
                    out operationResult))
                {
                    var projectionResult = operationResult as ProjectionResult;
                    if (projectionResult != null)
                    {
                        var result = projectionResult.ResultSet.ResultRows.Select(row => new CustomerTransaction
                        {
                            VoucherJournalNo = row.GetIntegerValue((long) C.CustomerTransaction.VoucherJournalNo),
                            AuditNo = row.GetIntegerValue((long) C.CustomerTransaction.AuditNo),
                            CustomerNo = row.GetIntegerValue((long) C.CustomerTransaction.CustomerNo),
                            VoucherNo = row.GetIntegerValue((long) C.CustomerTransaction.VoucherNo),
                            VoucherDate = FromVismaBusinessDate(row.GetIntegerValue((long) C.CustomerTransaction.VoucherDate)),
                            Text = row.GetStringValue((long) C.CustomerTransaction.Text),
                            Amount = row.GetDecimalValue((long) C.CustomerTransaction.AmountDomestic),
                            InvoiceNo = row.GetStringValue((long) C.CustomerTransaction.InvoiceNo),
                            ChangedDateTime = GetCombinedDateTime(row, (long) C.CustomerTransaction.ChangedDate, (long) C.CustomerTransaction.ChangedTime)
                        });
                        return result;
                    }
                }
            }

            return new List<CustomerTransaction>(0);
        } 
    }
}