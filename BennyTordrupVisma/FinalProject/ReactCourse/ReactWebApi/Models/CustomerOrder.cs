using System;

namespace ReactWebApi.Model
{
    public class CustomerOrder
    {
        public int OrderNo;
        public DateTime OrderDate;
        public int CustomerNo;
        public DateTime RequiredDeliveryDate;
        public decimal InvoiceAmountSoFar;
        public decimal InvoiceAmountInFuture;
        public decimal InvoiceAmountTotal;
        public DateTime ChangedDateTime;
    }

    // select OrdNo, OrdDt, CustNo, DelDt, InvoAm, DInvoIF, InvoAm + DInvoIF as DInfoTot, ChDt, ChTm
    //from    F9999.dbo.Ord
}