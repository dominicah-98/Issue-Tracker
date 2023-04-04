namespace QuickDesk.Models
{
    public class clsUserInfo
    {
        public string Name { get; set; } = "";
        public string Email { get; set; } = "";
        public Boolean Admin { get; set; } = false;
    }
    public class clsDevAssign
    {
        public long IDTicket { get; set; } = 0;
        public string IDAllocateby { get; set; } = "";
        public string IDAllocatedTo { get; set; } = "";
        public Boolean ActiveYN { get; set; } = false;
    }
    public class clsTempDevAssign
    {
        public long IDTicket { get; set; } = 0;
        public string DevName { get; set; } = "";
        public string IDAllocateby { get; set; } = "";
        public string DevEmail { get; set; } = "";
        public Boolean ActiveYN { get; set; } = false;
    }
    public class clsTempAssignedTickets
    {
        public long IDTicket { get; set; } = 0;
        public string TicketNo { get; set; } = "";
        public string IssueDesc { get; set; } = "";
        public string AllocationDate { get; set; } = "";
        public string ApplicationName { get; set; } = "";
        public string AllocatedTo { get; set; } = "";
        public string AllocatedToMail { get; set; } = "";
        public string Priority { get; set; } = "";
        public string AllocatedBy { get; set; } = "";
        public string AllocatedByMail { get; set; } = "";
        public string Status { get; set; } = "";
        public Boolean ActiveYN { get; set; } = false;
    }

    public class clsEmpInfo
    {
        public int empno { get; set; }
        public int empdept { get; set; }
        public string empfirstname { get; set; }
        public string empmiddlename { get; set; }
        public string emplastname { get; set; }
        public string? empemail { get; set; }
    }
}
