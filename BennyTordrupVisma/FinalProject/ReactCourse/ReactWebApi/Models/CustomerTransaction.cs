using System;

namespace ReactWebApi.Model
{
    public class CustomerTransaction
    {
        public int VoucherJournalNo;
        public int AuditNo;
        public int CustomerNo;
        public int VoucherNo;
        public DateTime VoucherDate;
        public string Text;
        public decimal Amount;
        public string InvoiceNo;
        public DateTime ChangedDateTime;
    }
}