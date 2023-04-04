using Common.Utility;
using QuickDesk.Models;
using System.Data;

namespace QuickDesk.BLL
{
    public class clsChart
    {
        public static List<clsChartApplication> Chart_Applications(string connection, string useremail)
        {
            List<clsChartApplication> mList = new List<clsChartApplication>();
            DataTable dt = clsDatabase.fnDataTable(connection, "PRC_Ticket_Chart_Application", useremail);
            foreach (DataRow dr in dt.Rows)
            {
                clsChartApplication obj = new clsChartApplication();
                obj.labelnew = (string)dr["label"];
                obj.valuenew = (int)dr["value"];
                mList.Add(obj);
            }
            return mList;
        }
        public static List<clsChartApplication> Chart_Applications_Admin(string connection)
        {
            List<clsChartApplication> mList = new List<clsChartApplication>();
            DataTable dt = clsDatabase.fnDataTable(connection, "PRC_Ticket_Chart_Application_Admin");
            foreach (DataRow dr in dt.Rows)
            {
                clsChartApplication obj = new clsChartApplication();
                obj.labelnew = (string)dr["label"];
                obj.valuenew = (int)dr["value"];
                mList.Add(obj);
            }
            return mList;
        }
        public static List<clsChartApplication> Chart_Alloc_Dev(string connection, string useremail)
        {
            List<clsChartApplication> mList = new List<clsChartApplication>();
            DataTable dt = clsDatabase.fnDataTable(connection, "PRC_Ticket_Chart_Alloc_Dev", useremail);
            foreach (DataRow dr in dt.Rows)
            {
                clsChartApplication obj = new clsChartApplication();
                obj.labelnew = (string)dr["label"];
                obj.valuenew = (int)dr["value"];
                mList.Add(obj);
            }
            return mList;
        }
        public static List<clsChartApplication> Chart_Solve_Dev(string connection, string useremail)
        {
            List<clsChartApplication> mList = new List<clsChartApplication>();
            DataTable dt = clsDatabase.fnDataTable(connection, "PRC_Ticket_Chart_Solve_Dev", useremail);
            foreach (DataRow dr in dt.Rows)
            {
                clsChartApplication obj = new clsChartApplication();
                obj.labelnew = (string)dr["label"];
                obj.valuenew = (int)dr["value"];
                mList.Add(obj);
            }
            return mList;
        }
        public static List<clsChartApplication> Chart_Open_Admin(string connection)
        {
            List<clsChartApplication> mList = new List<clsChartApplication>();
            DataTable dt = clsDatabase.fnDataTable(connection, "PRC_Ticket_Chart_Open_Admin");
            foreach (DataRow dr in dt.Rows)
            {
                clsChartApplication obj = new clsChartApplication();
                obj.labelnew = (string)dr["label"];
                obj.valuenew = (int)dr["value"];
                mList.Add(obj);
            }
            return mList;
        }
        public static List<clsChartApplication> Chart_Close_Admin(string connection)
        {
            List<clsChartApplication> mList = new List<clsChartApplication>();
            DataTable dt = clsDatabase.fnDataTable(connection, "PRC_Ticket_Chart_Close_Admin");
            foreach (DataRow dr in dt.Rows)
            {
                clsChartApplication obj = new clsChartApplication();
                obj.labelnew = (string)dr["label"];
                obj.valuenew = (int)dr["value"];
                mList.Add(obj);
            }
            return mList;
        }
    }
}
