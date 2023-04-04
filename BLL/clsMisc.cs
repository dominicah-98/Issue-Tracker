using QuickDesk.Models;
using System.Data;
using Common.Utility;
using System.Collections.Generic;

namespace QuickDesk.BLL
{
    public class clsMisc
    {
        public static List<clsMiscInfo> Misc_List(string connection, string type)
        {
            List < clsMiscInfo > mList = new List<clsMiscInfo> ();
            DataTable dt = clsDatabase.fnDataTable(connection, "PRC_Ticket_Misc_List", type);
            foreach(DataRow dr in dt.Rows)
            {
                clsMiscInfo obj= new clsMiscInfo ();
                obj.IDMisc = clsHelper.fnConvert2Long(dr["IDMisc"]);
                obj.Name = (string)dr["Name"];
                mList.Add(obj);
            }
            return mList;
        }
    }
}
