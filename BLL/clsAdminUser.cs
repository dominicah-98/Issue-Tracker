﻿using Common.Utility;
using QuickDesk.Models;
using System.Data;

namespace QuickDesk.BLL
{
    public class clsAdminUser
    {
        public static List<clsUserInfo> Admin_Dev_List(string connection)
        {
            List<clsUserInfo> mList = new List<clsUserInfo>();
            DataTable dt = clsDatabase.fnDataTable(connection, "PRC_Ticket_Admin_User_List");
            foreach (DataRow dr in dt.Rows)
            {
                clsUserInfo obj = new clsUserInfo();
                obj.Name = (string)dr["Name"];
                obj.Email = (string)dr["Email"];
                obj.Admin = (Boolean)dr["Admin"];
                mList.Add(obj);
            }
            return mList;
        }
        public static List<clsTempDevAssign> Assigned_Dev_List(string connection)
        {
            List<clsTempDevAssign> mList = new List<clsTempDevAssign>();
            DataTable dt = clsDatabase.fnDataTable(connection, "PRC_Ticket_Assign_Dev_List");
            foreach (DataRow dr in dt.Rows)
            {
                clsTempDevAssign obj = new clsTempDevAssign();
                obj.IDTicket = (long)dr["IDTicket"];
                obj.DevName = (string)dr["DevName"];
                obj.DevEmail = (string)dr["DevEmail"];
                obj.IDAllocateby = (string)dr["AllocatedBy"];
                obj.ActiveYN = (Boolean)dr["Active"];
                mList.Add(obj);
            }
            return mList;
        }
        public static String Assign_Dev(string connection, clsDevAssign info)
        {
            return clsDatabase.fnDBOperation(connection, "PRC_Ticket_Assign_Dev",
                                            info.IDTicket, info.IDAllocatedTo, info.IDAllocateby);

        }
        public static List<clsTempAssignedTickets> Assigned_Ticket_List(string connection)
        {
            List<clsTempAssignedTickets> mList = new List<clsTempAssignedTickets>();
            DataTable dt = clsDatabase.fnDataTable(connection, "PRC_Ticket_Assigned_List");
            foreach (DataRow dr in dt.Rows)
            {
                clsTempAssignedTickets obj = new clsTempAssignedTickets();
                obj.IDTicket = (long)dr["IDTicket"];
                obj.TicketNo = (string)dr["TicketNo"];
                obj.IssueDesc = (string)dr["IssueDesc"];
                obj.AllocationDate = (string)dr["AllocationDate"];
                obj.ApplicationName = (string)dr["ApplicationName"];
                obj.AllocatedTo = (string)dr["AllocatedTo"];
                obj.AllocatedToMail = (string)dr["AllocatedToMail"];
                obj.Priority = (string)dr["Priority"];
                obj.AllocatedBy = (string)dr["AllocatedBy"];
                obj.AllocatedByMail = (string)dr["AllocatedByMail"];
                obj.Status = (string)dr["Status"];
                obj.ActiveYN = (Boolean)dr["Active"];
                mList.Add(obj);
            }
            return mList;
        }

        public static List<clsEmpInfo> Employee_List(String Con)
        {
            List<clsEmpInfo> mlist = new List<clsEmpInfo>();
            DataTable DT = clsDatabase.fnDataTable(Con, "PRC_Survey_Employee_List");
            foreach (DataRow dr in DT.Rows)
            {
                clsEmpInfo obj = new clsEmpInfo();
                obj.empno = (Int32)dr["empno"];
                obj.empdept = (Int32)dr["empdept"];
                obj.empfirstname = (String)dr["empfirstname"];
                obj.empmiddlename = (String)dr["empmiddlename"];
                obj.emplastname = (String)dr["emplastname"];
                obj.empemail = dr["empemail"].ToString();
                mlist.Add(obj);
            }
            return mlist;
        }
    }
}
