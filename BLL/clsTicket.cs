using QuickDesk.Models;
using System.Data;
using Common.Utility;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;

namespace QuickDesk.BLL
{
    public class clsTicket
    {
        public static String Ticket_NO(string connection)
        {
            clsTicketInfo obj = new clsTicketInfo();
            DataTable dt = clsDatabase.fnDataTable(connection, "PRC_Ticket_NO");
            if (dt.Rows.Count > 0)
            {
                obj.TicketNo = (string)dt.Rows[0]["NO"];
                obj.AutoNo = (long)dt.Rows[0]["AutoNo"];
            }
            return obj.TicketNo.ToString();
        }
        public static List<clsTicketInfo> Ticket_List(string connection, string username)
        {
            List<clsTicketInfo> mList = new List<clsTicketInfo>();
            DataTable dt = clsDatabase.fnDataTable(connection, "PRC_Ticket_List", username);
            foreach (DataRow dr in dt.Rows)
            {
                clsTicketInfo obj = new clsTicketInfo();
                obj.IDTicket = (long)dr["IDTicket"];
                obj.TicketNo= (string)dr["TicketNo"];
                obj.RaisedBy = (string)dr["Raisedby"];
                obj.RaisedDate = (string)dr["RaisedDate"];
                obj.Application.Name = (string)dr["Application"];
                obj.Category.Name = (string)dr["Category"];
                obj.Priority.Name = (string)dr["Priority"];
                obj.Status.Name = (string)dr["Status"];
                obj.IssueDesc= (string)dr["IssueDesc"];
                obj.PicturePath = (string)dr["picturepath"];
                mList.Add(obj);
            }
            return mList;
        }
        public static List<clsTicketInfo> Ticket_List_All(string connection)
        {
            List<clsTicketInfo> mList = new List<clsTicketInfo>();
            DataTable dt = clsDatabase.fnDataTable(connection, "PRC_Ticket_All");
            foreach (DataRow dr in dt.Rows)
            {
                clsTicketInfo obj = new clsTicketInfo();
                obj.IDTicket = (long)dr["IDTicket"];
                obj.TicketNo= (string)dr["TicketNo"];
                obj.RaisedBy = (string)dr["Raisedby"];
                obj.RaisedDate = (string)dr["RaisedDate"];
                obj.Application.Name = (string)dr["Application"];
                obj.Category.Name = (string)dr["Category"];
                obj.Priority.Name = (string)dr["Priority"];
                obj.Status.Name = (string)dr["Status"];
                obj.IssueDesc= (string)dr["IssueDesc"];
                obj.PicturePath = (string)dr["picturepath"];
                mList.Add(obj);
            }
            return mList;
        }
        public static List<clsTicketInfo> Ticket_List_Dev_Dashboard(string connection)
        {
            List<clsTicketInfo> mList = new List<clsTicketInfo>();
            DataTable dt = clsDatabase.fnDataTable(connection, "PRC_Ticket_List_ForDev");
            foreach (DataRow dr in dt.Rows)
            {
                clsTicketInfo obj = new clsTicketInfo();
                obj.IDTicket = (long)dr["IDTicket"];
                obj.TicketNo= (string)dr["TicketNo"];
                obj.RaisedBy = (string)dr["Raisedby"];
                obj.RaisedDate = (string)dr["RaisedDate"];
                obj.Application.Name = (string)dr["Application"];
                obj.Category.Name = (string)dr["Category"];
                obj.Priority.Name = (string)dr["Priority"];
                obj.Status.Name = (string)dr["Status"];
                obj.IssueDesc= (string)dr["IssueDesc"];
                obj.PicturePath = (string)dr["picturepath"];
                mList.Add(obj);
            }
            return mList;
        }
        public static String Ticket_Save(string connection, clsTicketInfo info)
        {
            return clsDatabase.fnDBOperation(connection, "PRC_Ticket_Save",
                                            info.IDTicket, info.TicketNo, info.RaisedBy,
                                            info.Application.IDMisc, info.Priority.IDMisc,
                                            info.Category.IDMisc, info.Status.IDMisc, info.IssueDesc, info.PicturePath, info.Remarks.Remarks);

        }
        public static List<clsTicketDashInfo> Ticket_Dashboard_List(string connection, string username)
        {
            List<clsTicketDashInfo> mList = new List<clsTicketDashInfo>();
            DataTable dt = clsDatabase.fnDataTable(connection, "PRC_Ticket_List_Dashboard", username);
            foreach (DataRow dr in dt.Rows)
            {
                clsTicketDashInfo obj = new clsTicketDashInfo();
                obj.IDTicket = (long)dr["IDTicket"];
                obj.TicketNo = (string)dr["TicketNo"];
                obj.Admin_User.Name = (string)dr["Admin_User"];
                obj.RaisedDate = (string)dr["RaisedDate"];
                obj.Application.Name = (string)dr["Application"];
                obj.Category.Name = (string)dr["Category"];
                obj.Priority.Name = (string)dr["Priority"];
                obj.Status.Name = (string)dr["Status"];
                obj.IssueDesc = (string)dr["IssueDesc"];
                obj.PicturePath = (string)dr["picturepath"];
                mList.Add(obj);
            }
            return mList;
        }
        public static List<clsStatusRemarksInfo> Ticket_Status_Remarks(string connection)
        {
            List<clsStatusRemarksInfo> mList = new List<clsStatusRemarksInfo>();
            DataTable dt = clsDatabase.fnDataTable(connection, "PRC_Ticket_Status_Remark");
            foreach (DataRow dr in dt.Rows)
            {
                clsStatusRemarksInfo obj = new clsStatusRemarksInfo();
                obj.IDTicket = (long)dr["IDTicket"];
                obj.StatusValue = (long)dr["IDTicket"];
                obj.StatusName = (string)dr["Name"];
                obj.Remarks = (string)dr["Remarks"];
                obj.ChangedBy = (string)dr["ChangedBy"];
                mList.Add(obj);
            }
            return mList;
        }
        public static List<clsTicketApplicationCategoryMap> Ticket_Application_Category_Map(string connection)
        {
            List<clsTicketApplicationCategoryMap> mlist = new List<clsTicketApplicationCategoryMap>();
            DataTable dt = clsDatabase.fnDataTable(connection, "PRC_Application_Category_Map");
            foreach (DataRow dr in dt.Rows)
            {
                clsTicketApplicationCategoryMap obj = new clsTicketApplicationCategoryMap();
                //obj.IDAppCatMapping = (long)dr["IDAppCatMapping"];
                obj.IDApp = (long)dr["IDApp"];
                obj.Application = (string)dr["Application"];
                obj.IDCat = (long)dr["IDCat"];
                obj.Category = (string)dr["Category"];
                mlist.Add(obj);
            }
            return mlist;
        }
        public static List<clsTempTicketRecentActivities> Ticket_Recent_Activities(string connection)
        {
            List<clsTempTicketRecentActivities> mlist = new List<clsTempTicketRecentActivities>();
            DataTable dt = clsDatabase.fnDataTable(connection, "PRC_Ticket_Recent_Changes");
            foreach (DataRow dr in dt.Rows)
            {
                clsTempTicketRecentActivities obj = new clsTempTicketRecentActivities();
                obj.IDTicket = (long)dr["IDTicket"];
                obj.TicketNo = (string)dr["TicketNo"];
                obj.IssueDesc = (string)dr["IssueDesc"];
                obj.Application = (string)dr["Application"];
                obj.RaisedBy = (string)dr["RaisedBy"];
                obj.RaisedDate = (string)dr["RaisedDate"];
                obj.Priority = (string)dr["Priority"];
                obj.Status = (string)dr["Status"];
                obj.ChangedBy = (string)dr["ChangedBy"];
                obj.ChangedDate = (string)dr["ChangedDate"];
                mlist.Add(obj);
            }
            return mlist;
        }
    }
}
