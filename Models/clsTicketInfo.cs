namespace QuickDesk.Models
{
    public class clsTicketInfo
    {
        public long IDTicket { get; set; } = 0;
        public string TicketNo { get; set; } = "";
        public string IssueDesc { get; set; } = "";
        public string PicturePath { get; set; } = "";
        public long AutoNo { get; set; } = 0;
        public string RaisedDate { get; set; } = "";
        public string RaisedBy { get; set; } = "";
        public string ClosedDate { get; set; } = "";
        public string ClosedBy { get; set; } = "";
        public clsMiscInfo Category { get; set; } = new clsMiscInfo();
        public clsMiscInfo Priority { get; set; } = new clsMiscInfo();
        public clsMiscInfo Status { get;}= new clsMiscInfo();
        public clsMiscInfo Application { get; set; } = new clsMiscInfo();
        public clsStatusRemarksInfo Remarks { get; set; } = new clsStatusRemarksInfo();

    }
    public class clsTicketDashInfo
    {
        public long IDTicket { get; set; } = 0;
        public string TicketNo { get; set; } = "";
        public string IssueDesc { get; set; } = "";
        public string PicturePath { get; set; } = "";
        public long AutoNo { get; set; } = 0;
        public string RaisedDate { get; set; } = "";
        public clsUserInfo Admin_User { get; set; } = new clsUserInfo();
        public string ClosedDate { get; set; } = "";
        public string ClosedBy { get; set; } = "";
        public clsMiscInfo Category { get; set; } = new clsMiscInfo();
        public clsMiscInfo Priority { get; set; } = new clsMiscInfo();
        public clsMiscInfo Status { get; } = new clsMiscInfo();
        public clsMiscInfo Application { get; set; } = new clsMiscInfo();

    }

    public class clsStatusRemarksInfo
    {
        public long IDTicketStatus { get; set; } = 0;
        public long IDTicket { get; set; } = 0;
        public long StatusValue { get; set; } = 0;
        public string StatusName { get; set; } = "";
        public string Remarks { get; set; } = "";
        public string ChangedBy { get; set; } = "";
        public string ChangeDate { get; set; } = "";
    }
    public class clsTicketApplicationCategoryMap
    {
        public long IDAppCatMapping { get; set; } = 0;
        public long IDApp { get; set; } = 0;
        public string Application { get; set; } = "";
        public long IDCat { get; set; } = 0;
        public string Category { get; set; } = "";
    }
}
