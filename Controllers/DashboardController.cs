using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using QuickDesk.BLL;
using QuickDesk.Models;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace QuickDesk.Controllers
{
    public class DashboardController : Controller
    {
        private readonly IConfiguration configuration;
        private IHostEnvironment environment;
        public DashboardController(IConfiguration _configuration, IHostEnvironment _environment)
        {
            configuration = _configuration;
            environment = _environment;
        }
        public IActionResult Index()
        {
            //if (!String.IsNullOrEmpty(HttpContext.Session.GetString("Email")) && !String.IsNullOrEmpty(HttpContext.Session.GetString("Empno")) && !String.IsNullOrEmpty(HttpContext.Session.GetString("Empname")) && !String.IsNullOrEmpty(HttpContext.Session.GetString("Portal")) && !String.IsNullOrEmpty(HttpContext.Session.GetString("PortalURL")))
            //{
            //    return View();
            //}
            //else
            //{
            //    return RedirectToAction("Index", "Connection");
            //}
            return View();
        }

        [HttpGet]
        [Route("api/ticket/AdminUserType")]
        public JsonResult Ticket_Admin_User_List(string useremail)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsUserInfo> mlist = clsAdminUser.Admin_Dev_List(conn);
            var result = mlist.Where(x => x.Email == useremail);
            return new JsonResult(result);
        }

        //User Dashboard Cards and List (for all user)
        [HttpGet]
        [Route("api/ticket/ticketdashlist")]
        public JsonResult Ticket_Dashboard_List(string username)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTicketInfo> mlist = clsTicket.Ticket_List_All(conn);
            //var result = clsTicket.Ticket_Dashboard_List(conn, username);
            var result = mlist.Where(x => x.RaisedBy == username).Take(4);
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/dashboardticketlist")]
        public JsonResult Ticket_AllList_No(string username)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTicketInfo> mlist = clsTicket.Ticket_List_All(conn);
            var count = mlist.Where(x => x.RaisedBy == username).Count();
            return new JsonResult(count);
        }
        [HttpGet]
        [Route("api/ticket/ticketdashlistAllUser")]
        public JsonResult Ticket_List_All_User(string username)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTicketInfo> mlist = clsTicket.Ticket_List_All(conn);
            //var result = clsTicket.Ticket_Dashboard_List(conn, username);
            var result = mlist.Where(x => x.RaisedBy == username);
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/ticketopen")]
        public JsonResult Ticket_Open_No(string username)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTicketInfo> mlist = clsTicket.Ticket_List_All(conn);
            var count = mlist.Where(x => x.RaisedBy == username && x.Status.Name == "OPEN").Count();
            return new JsonResult(count);
        }
        [HttpGet]
        [Route("api/ticket/ticketopenListDash")]
        public JsonResult Ticket_Open_List(string username)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTicketInfo> mlist = clsTicket.Ticket_List_All(conn);
            var result = mlist.Where(x => x.RaisedBy == username && x.Status.Name == "OPEN").Take(4);
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/ticketopenListAllUser")]
        public JsonResult Ticket_Open_All_User(string username)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTicketInfo> mlist = clsTicket.Ticket_List_All(conn);
            var result = mlist.Where(x => x.RaisedBy == username && x.Status.Name == "OPEN");
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/ticketreview")]
        public JsonResult Ticket_Review_No(string username)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTicketInfo> mlist = clsTicket.Ticket_List_All(conn);
            var result = mlist.Where(x => x.RaisedBy == username && x.Status.Name == "REVIEW").Count();
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/ticketreviewList")]
        public JsonResult Ticket_Review_List(string username)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTicketInfo> mlist = clsTicket.Ticket_List_All(conn);
            var result = mlist.Where(x => x.RaisedBy == username && x.Status.Name == "REVIEW");
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/ticketallocated")]
        public JsonResult Ticket_Allocated_No(string username)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTicketInfo> mlist = clsTicket.Ticket_List_All(conn);
            var count = mlist.Where(x => x.RaisedBy == username && x.Status.Name == "ALLOCATED").Count();
            return new JsonResult(count);
        }
        [HttpGet]
        [Route("api/ticket/ticketallocatedList")]
        public JsonResult Ticket_Allocated_List(string username)
        {
            //username= HttpContext.Session.GetString("Email");
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTicketInfo> mlist = clsTicket.Ticket_List_All(conn);
            var result = mlist.Where(x => x.RaisedBy == HttpContext.Session.GetString("Email") && x.Status.Name == "ALLOCATED");
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/ticketsolved")]
        public JsonResult Ticket_Solved_No(string username)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTicketInfo> mlist = clsTicket.Ticket_List_All(conn);
            var count = mlist.Where(x => x.RaisedBy == username && x.Status.Name == "SOLVED").Count();
            return new JsonResult(count);
        }
        [HttpGet]
        [Route("api/ticket/ticketsolvedListDash")]
        public JsonResult Ticket_Solved_List(string username)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTicketInfo> mlist = clsTicket.Ticket_List_All(conn);
            var result = mlist.Where(x => x.RaisedBy == username && x.Status.Name == "SOLVED").Take(4);
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/ticketsolvedListAllUser")]
        public JsonResult Ticket_Solved_All_User(string username)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTicketInfo> mlist = clsTicket.Ticket_List_All(conn);
            var result = mlist.Where(x => x.RaisedBy == username && x.Status.Name == "SOLVED");
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/ticketclosed")]
        public JsonResult Ticket_Closed_No(string username)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTicketInfo> mlist = clsTicket.Ticket_List_All(conn);
            var count = mlist.Where(x => x.RaisedBy == username && x.Status.Name == "CLOSE").Count();
            return new JsonResult(count);
        }
        [HttpGet]
        [Route("api/ticket/ticketclosedListDash")]
        public JsonResult Ticket_Close_List(string username)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTicketInfo> mlist = clsTicket.Ticket_List_All(conn);
            var result = mlist.Where(x => x.RaisedBy == username && x.Status.Name == "CLOSE").Take(4);
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/ticketclosedListAllUser")]
        public JsonResult Ticket_Close_All_User(string username)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTicketInfo> mlist = clsTicket.Ticket_List_All(conn);
            var result = mlist.Where(x => x.RaisedBy == username && x.Status.Name == "CLOSE");
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/ticketRecentActivitiesUser")]
        public JsonResult Ticket_Recent_Activities_User(string username)
        {
            username = Regex.Replace(username, @"\s+", " ");
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTempTicketRecentActivities> mlist = clsTicket.Ticket_Recent_Activities(conn);
            var result = mlist.Where(x => x.RaisedBy == username).Take(4);
            return new JsonResult(result);
        }

        //Developer Dashboard Cards and table
        [HttpGet]
        [Route("api/ticket/dashboardticketlistDevNo")]
        public JsonResult Ticket_AllList_No_Dev(string useremail)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTempAssignedTickets> mlist = clsAdminUser.Assigned_Ticket_List(conn);
            //var count = result.Count();
            var count = mlist.Where(x => x.AllocatedToMail == useremail).Count();
            return new JsonResult(count);
        }
        [HttpGet]
        [Route("api/ticket/dashboardticketlistDev")]
        public JsonResult Ticket_List_Dev(string useremail)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTempAssignedTickets> mlist = clsAdminUser.Assigned_Ticket_List(conn);
            //var count = result.Count();
            var count = mlist.Where(x => x.AllocatedToMail == useremail).Take(5);
            return new JsonResult(count);
        }
        [HttpGet]
        [Route("api/ticket/dashboardticketlistDevAll")]
        public JsonResult Ticket_AllList_Dev(string useremail)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTempAssignedTickets> mlist = clsAdminUser.Assigned_Ticket_List(conn);
            //var count = result.Count();
            var count = mlist.Where(x => x.AllocatedToMail == useremail);
            return new JsonResult(count);
        }
        [HttpGet]
        [Route("api/ticket/ticketDevAssignedCount")]
        public JsonResult Ticket_DevAssigned_Count(string useremail)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTempAssignedTickets> mlist = clsAdminUser.Assigned_Ticket_List(conn);
            //var count = result.Count();
            var count = mlist.Where(x => x.AllocatedToMail == useremail && x.Status == "ALLOCATED").Count();
            return new JsonResult(count);
        }
        [HttpGet]
        [Route("api/ticket/ticketDevAssignedListDash")]
        public JsonResult Ticket_DevAssigned_List_Dash(string useremail)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTempAssignedTickets> mlist = clsAdminUser.Assigned_Ticket_List(conn);
            //var count = result.Count();
            var count = mlist.Where(x => x.AllocatedToMail == useremail && x.Status == "ALLOCATED").Take(4);
            return new JsonResult(count);
        }
        [HttpGet]
        [Route("api/ticket/ticketDevAssignedListAll")]
        public JsonResult Ticket_DevAssigned_List_All(string useremail)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTempAssignedTickets> mlist = clsAdminUser.Assigned_Ticket_List(conn);
            //var count = result.Count();
            var count = mlist.Where(x => x.AllocatedToMail == useremail && x.Status == "ALLOCATED");
            return new JsonResult(count);
        }
        [HttpGet]
        [Route("api/ticket/ticketsolvedDev")]
        public JsonResult Ticket_Solved_No_Dev(string useremail)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTempAssignedTickets> mlist = clsAdminUser.Assigned_Ticket_List(conn);
            //var count = result.Count();
            var count = mlist.Where(x => x.AllocatedToMail == useremail && x.Status == "SOLVED").Count();
            return new JsonResult(count);
        }
        [HttpGet]
        [Route("api/ticket/ticketsolvedDevListDash")]
        public JsonResult Ticket_Solved_Dev_List_Dash(string useremail)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTempAssignedTickets> mlist = clsAdminUser.Assigned_Ticket_List(conn);
            //var count = result.Count();
            var count = mlist.Where(x => x.AllocatedToMail == useremail && x.Status == "SOLVED").Take(4);
            return new JsonResult(count);
        }
        [HttpGet]
        [Route("api/ticket/ticketsolvedDevListAll")]
        public JsonResult Ticket_Solved_Dev_List_All(string useremail)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTempAssignedTickets> mlist = clsAdminUser.Assigned_Ticket_List(conn);
            //var count = result.Count();
            var count = mlist.Where(x => x.AllocatedToMail == useremail && x.Status == "SOLVED");
            return new JsonResult(count);
        }
        [HttpGet]
        [Route("api/ticket/ticketclosedDev")]
        public JsonResult Ticket_Closed_No_Dev(string useremail)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTempAssignedTickets> mlist = clsAdminUser.Assigned_Ticket_List(conn);
            //var count = result.Count();
            var count = mlist.Where(x => x.AllocatedToMail == useremail && x.Status == "CLOSE").Count();
            return new JsonResult(count);
        }
        [HttpGet]
        [Route("api/ticket/ticketclosedDevListDash")]
        public JsonResult Ticket_Closed_Dev_List_Dash(string useremail)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTempAssignedTickets> mlist = clsAdminUser.Assigned_Ticket_List(conn);
            //var count = result.Count();
            var count = mlist.Where(x => x.AllocatedToMail == useremail && x.Status == "CLOSE").Take(4);
            return new JsonResult(count);
        }
        [HttpGet]
        [Route("api/ticket/ticketclosedDevListAll")]
        public JsonResult Ticket_Closed_Dev_List_All(string useremail)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTempAssignedTickets> mlist = clsAdminUser.Assigned_Ticket_List(conn);
            //var count = result.Count();
            var count = mlist.Where(x => x.AllocatedToMail == useremail && x.Status == "CLOSE");
            return new JsonResult(count);
        }

        //Admin Dashboard
        [HttpGet]
        [Route("api/ticket/ticketlistAdminNo")]
        public JsonResult Ticket_List_No_Admin(string username)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            var result = clsTicket.Ticket_List(conn, username).Count();
            //var count = result.Count();
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/ticketlistAdminDash")]
        public JsonResult Ticket_List_Admin_Dash(string username)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            var result = clsTicket.Ticket_List(conn, username).Take(4);
            //var count = result.Count();
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/ticketlist")]
        public JsonResult Ticket_List(string username)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            var result = clsTicket.Ticket_List(conn, username);
            //var count = result.Count();
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/ticketlistOpenAdminNo")]
        public JsonResult Ticket_List_Open_Admin_No(string username)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTicketInfo> mlist = clsTicket.Ticket_List(conn, username);
            var result = mlist.Where(x => x.Status.Name == "OPEN").Count();
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/ticketOpenAdminDashList")]
        public JsonResult Ticket_List_Open_Admin_DashList(string username)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTicketInfo> mlist = clsTicket.Ticket_List(conn, username);
            var result = mlist.Where(x => x.Status.Name == "OPEN").Take(4);
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/ticketlistOpen")]
        public JsonResult Ticket_List_Open(string username)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTicketInfo> mlist = clsTicket.Ticket_List(conn, username);
            var result = mlist.Where(x => x.Status.Name == "OPEN");
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/ticketlistAllocAdminNo")]
        public JsonResult Ticket_List_Alloc_Admin_No(string username)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTicketInfo> mlist = clsTicket.Ticket_List(conn, username);
            var result = mlist.Where(x => x.Status.Name == "ALLOCATED").Count();
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/ticketlistAllocAdminList")]
        public JsonResult Ticket_List_Alloc_Admin_List(string username)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTicketInfo> mlist = clsTicket.Ticket_List(conn, username);
            var result = mlist.Where(x => x.Status.Name == "ALLOCATED");
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/ticketlistReviewAdminNo")]
        public JsonResult Ticket_List_Review_Admin_No(string username)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTicketInfo> mlist = clsTicket.Ticket_List(conn, username);
            var result = mlist.Where(x => x.Status.Name == "REVIEW").Count();
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/ticketlistReviewAdminList")]
        public JsonResult Ticket_List_Review_Admin_List(string username)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTicketInfo> mlist = clsTicket.Ticket_List(conn, username);
            var result = mlist.Where(x => x.Status.Name == "REVIEW");
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/ticketlistSolvedAdminDashNo")]
        public JsonResult Ticket_List_Solved_Admin_No(string username)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTicketInfo> mlist = clsTicket.Ticket_List(conn, username);
            var result = mlist.Where(x => x.Status.Name == "SOLVED").Count();
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/ticketlistSolvedAdminDash")]
        public JsonResult Ticket_List_Solved_AdminDash(string username)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTicketInfo> mlist = clsTicket.Ticket_List(conn, username);
            var result = mlist.Where(x => x.Status.Name == "SOLVED").Take(4);
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/ticketlistSolved")]
        public JsonResult Ticket_List_Solved(string username)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTicketInfo> mlist = clsTicket.Ticket_List(conn, username);
            var result = mlist.Where(x => x.Status.Name == "SOLVED");
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/ticketlistClosedAdminNo")]
        public JsonResult Ticket_List_Closed_No_Admin(string username)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTicketInfo> mlist = clsTicket.Ticket_List(conn, username);
            var result = mlist.Where(x => x.Status.Name == "CLOSE").Count();
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/ticketlistClosedAdminDash")]
        public JsonResult Ticket_List_Closed_AdminDash(string username)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTicketInfo> mlist = clsTicket.Ticket_List(conn, username);
            var result = mlist.Where(x => x.Status.Name == "CLOSE").Take(4);
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/ticketlistClosed")]
        public JsonResult Ticket_List_Closed(string username)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTicketInfo> mlist = clsTicket.Ticket_List(conn, username);
            var result = mlist.Where(x => x.Status.Name == "CLOSE");
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/dashboardAllocticketlistAdmall")]
        public JsonResult Ticket_AllocList_Adm()
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTempAssignedTickets> mList = clsAdminUser.Assigned_Ticket_List(conn);
            //var count = result.Count();
            var result = mList.Where(x => x.Status == "ALLOCATED");
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/ticketDevAllList")]
        public JsonResult Ticket_AssignedDeveloper_List(int IDTicket)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTicketInfo> mlist = clsTicket.Ticket_List_All(conn);
            var result = mlist.Where(x => x.IDTicket == IDTicket);
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/ticketRecentActivitiesAdm")]
        public JsonResult Ticket_Recent_Activities_Admin()
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTempTicketRecentActivities> mlist = clsTicket.Ticket_Recent_Activities(conn);
            var result = mlist.Take(4);
            return new JsonResult(result);
        }


        //Ticket Save & Status Change
        [HttpPost]
        [Route("api/ticket/ticketsaveDash")]
        public JsonResult Ticket_Save(clsTicketInfo info, IFormFile File, string changedBy)
        {
            if (File != null)
            {
                string wwwPath = this.environment.ContentRootPath + "\\wwwroot\\TicketImg";
                //string contentPath = environment.ContentRootPath + "\\TicketImg";

                string path = Path.Combine(wwwPath, info.TicketNo);
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                else
                {
                    string[] filePaths = Directory.GetFiles(path);
                    foreach (string fp in filePaths)
                    {
                        System.IO.File.Delete(fp);
                    }
                }

                var fileName = File.FileName;
                var filePath = Path.Combine(path, fileName);
                using (FileStream fs = System.IO.File.Create(filePath))
                {
                    File.CopyTo(fs);
                }
            }

            if (info.PicturePath == null)
            {
                info.PicturePath = "";
            }

            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            var temp = clsTicket.Ticket_Save(conn, info);
            var result = temp == "" ? "Ticket successfully raised...." : temp;

            string DevEmailStatus = "";
            //Ticket Raise by details
            List<clsLoginResultInfo> mlist = clsAdminUser.Employee_List(conn);
            var RaisedByDtls = mlist.Where(x => x.empemail == info.RaisedBy).ToList();
            var raisedbyName = RaisedByDtls[0].Empname;// + " " + RaisedByDtls[0].empmiddlename + " " + RaisedByDtls[0].emplastname;
            //Status changed by details
            List<clsUserInfo> mlist2 = clsAdminUser.Admin_Dev_List(conn);
            var AdminDtls = mlist2.Where(x => x.Email == changedBy).ToList();
            //Ticket Details
            //if (info.IDTicket != null)
            //{
            //    List<clsTicketInfo> mlist3 = clsTicket.Ticket_List_All(conn);
            //    var TicketDtls = mlist3.Where(x => x.IDTicket == info.IDTicket).ToList();

            //    Status Change by Admin
            //    if (temp == "" && changedBy != "")
            //    {
            //        String textbody = "";
            //        For Changing Status (For Admin)
            //        textbody += "<span style='font-size: 14px; font-weight: 600;'>Dear " + AdminDtls[0].Name + ",</span><br>";
            //        textbody += "<p style='font-size: 14px;'>Ticket No.: <b>" + TicketDtls[0].TicketNo + "</b>'s status has been changed successfully.<br>";
            //        textbody += "Please click the button below to Log-In to the Issue Tracker System to view details</p>";// + Environment.NewLine;
            //        textbody += "<br><br><br>";
            //        textbody += "<a href='' style='background-color: #1A4568; border: none; color: white; padding: 8px 15px; text-align: center; text-decoration: none; font-size: 16px; cursor: pointer; border-radius: 5px;'>Click Here</a>";
            //        textbody += "<br><br><br>";
            //        textbody += "<p style='font-size: 14px;'>Thanks & Regards</p>";
            //        textbody += "<p style='font-size: 14px; font-weight: 600; font-style: oblique; color:#1A4568;'>System & IT Team</p>";

            //        string SMTPserver = configuration.GetSection("MailSettings").GetSection("SMTPServer").Value;
            //        bool EnableSSL_TrueFalse = Convert.ToBoolean(configuration.GetSection("MailSettings").GetSection("EnableSSL_TrueFalse").Value);
            //        string Username = configuration.GetSection("MailSettings").GetSection("Username").Value;
            //        string Password = configuration.GetSection("MailSettings").GetSection("Password").Value;
            //        int SMTP_Port = Convert.ToInt32(configuration.GetSection("MailSettings").GetSection("SMTP_Port").Value);
            //        string mfromEmail = configuration.GetSection("MailSettings").GetSection("mfromEmail").Value;
            //        string subject = "Ticket Status Change";
            //        var ccList = new List<string>();
            //        ccList.Add(info.RaisedBy);

            //        var listOfEmails = new List<string>();
            //        listOfEmails.Add(changedBy);

            //        DevEmailStatus = clsEmailHelper.Send_Email(SMTPserver, EnableSSL_TrueFalse, Username, Password, SMTP_Port, mfromEmail, listOfEmails, ccList, subject, textbody);
            //    }
            //}
            //if (DevEmailStatus != "")
            //{
            //    return new JsonResult(DevEmailStatus);
            //}
            //else
            //{
            //    return new JsonResult(result);
            //}

            return new JsonResult(result);
        }

        //Misc
        [HttpGet]
        [Route("api/ticket/ticketno")]
        public JsonResult Ticket_No()
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            var result = clsTicket.Ticket_NO(conn);
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/prioritylist")]
        public JsonResult Ticket_Priority()
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            var result = clsMisc.Misc_List(conn, "PRIORITY");
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/applicationlist")]
        public JsonResult Ticket_Application()
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            var result = clsMisc.Misc_List(conn, "APP");
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/categorylist")]
        public JsonResult Ticket_Category()
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            var result = clsMisc.Misc_List(conn, "CATEGORY");
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/statuslistAdmin")]
        public JsonResult Ticket_Status_Admin()
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            var result = clsMisc.Misc_List(conn, "Admin");
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/statuslistDev")]
        public JsonResult Ticket_Status_Dev()
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            var result = clsMisc.Misc_List(conn, "Developer");
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/statuslistUser")]
        public JsonResult Ticket_Status_User()
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            var result = clsMisc.Misc_List(conn, "User");
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/TicketDetail")]
        public JsonResult Ticket_Details(clsTicketInfo info)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTicketInfo> mlist = clsTicket.Ticket_List(conn, info.RaisedBy);
            var result = mlist.Where(x => x.IDTicket == info.IDTicket).ToList();
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/DevAssignedDetails")]
        public JsonResult Ticket_Assigned_Dev_Details(long IDTicket)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTempDevAssign> mlist = clsAdminUser.Assigned_Dev_List(conn);
            var result = mlist.Where(x => x.IDTicket == IDTicket);
            return new JsonResult(result);
        }
        [HttpPost]
        [Route("api/ticket/DevAssign")]
        public JsonResult Ticket_Dev_Assign(clsDevAssign info, string sessionUName, string raisedBy, string appName)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            var temp = clsAdminUser.Assign_Dev(conn, info);
            var result = temp == "" ? "Ticket successfully raised...." : temp;
            string DevEmailStatus = "";
            //string AdminEmailStatus = "";
            //string RaisedByEmailStatus = "";
            List<clsTempDevAssign> mlist = clsAdminUser.Assigned_Dev_List(conn);
            var devName = mlist.Where(x => x.DevEmail == info.IDAllocatedTo).ToList();
            if (temp == "")
            {
                String textbody = "";
                textbody += "<span style='font-size: 14px; font-weight: 600;'>Dear " + devName[0].DevName +",</span><br>";
                textbody += "<p style='font-size: 14px;'>One issue has been raised in <b>"+ appName + "</b> and is assigned to you by <b>"+ sessionUName + "</b><br>";
                textbody += "Please click the button below to Log-In to the Issue Tracker System to view details</p>";// + Environment.NewLine;
                textbody += "<br><br><br>";
                textbody += "<a href='' style='background-color: #1A4568; border: none; color: white; padding: 8px 15px; text-align: center; text-decoration: none; font-size: 16px; cursor: pointer; border-radius: 5px;'>Click Here</a>";
                textbody += "<br><br><br>";
                textbody += "<p style='font-size: 14px;'>Thanks & Regards</p>";
                textbody += "<p style='font-size: 14px; font-weight: 600; font-style: oblique;'>System & IT Team</p>";

                string SMTPserver = configuration.GetSection("MailSettings").GetSection("SMTPServer").Value;
                bool EnableSSL_TrueFalse = Convert.ToBoolean(configuration.GetSection("MailSettings").GetSection("EnableSSL_TrueFalse").Value);
                string Username = configuration.GetSection("MailSettings").GetSection("Username").Value;
                string Password = configuration.GetSection("MailSettings").GetSection("Password").Value;
                int SMTP_Port = Convert.ToInt32(configuration.GetSection("MailSettings").GetSection("SMTP_Port").Value);
                string mfromEmail = configuration.GetSection("MailSettings").GetSection("mfromEmail").Value;
                string subject = "Ticket Allocation";
                var ccList = new List<string>();
                ccList.Add(info.IDAllocateby);

                var listOfEmails = new List<string>();
                listOfEmails.Add(info.IDAllocatedTo);

                DevEmailStatus = clsEmailHelper.Send_Email(SMTPserver, EnableSSL_TrueFalse, Username, Password, SMTP_Port, mfromEmail, listOfEmails, ccList, subject, textbody);
            }
            if (DevEmailStatus != "")
            {
                return new JsonResult(DevEmailStatus);
            }
            else
            {
                return new JsonResult(result);
            }
        }
        [HttpGet]
        [Route("api/ticket/StatusRemarks")]
        public JsonResult Ticket_Status_Remarks(long IDTicket, string Status)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsStatusRemarksInfo> mlist = clsTicket.Ticket_Status_Remarks(conn);
            var result = mlist.Where(x => x.IDTicket == IDTicket && x.StatusName==Status);
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/ApplicationCategoryMap")]
        public JsonResult Ticket_Application_Category_Map(int Application)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsTicketApplicationCategoryMap> mlist = clsTicket.Ticket_Application_Category_Map(conn);
            var result = mlist.Where(x => x.IDApp == Application);
            return new JsonResult(result);
        }


        //Charts
        [HttpGet]
        [Route("api/ticket/ticketApplicationBar")]
        public JsonResult Ticket_Chart_Application(string useremail)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            var result = clsChart.Chart_Applications(conn, useremail);
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/ticketApplicationBarAdmin")]
        public JsonResult Ticket_Chart_Application_Admin()
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            var result = clsChart.Chart_Applications_Admin(conn);
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/ticketAllocLineDev")]
        public JsonResult Ticket_Chart_Alloc_Dev(string useremail)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            var result = clsChart.Chart_Alloc_Dev(conn, useremail);
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/ticketSolveLineDev")]
        public JsonResult Ticket_Chart_Solve_Dev(string useremail)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            var result = clsChart.Chart_Solve_Dev(conn, useremail);
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/ticketOpenLineAdmin")]
        public JsonResult Ticket_Chart_Open_Admin()
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            var result = clsChart.Chart_Open_Admin(conn);
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/ticketCloseLineAdmin")]
        public JsonResult Ticket_Chart_Close_Admin()
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            var result = clsChart.Chart_Close_Admin(conn);
            return new JsonResult(result);
        }




        //[HttpGet]
        //[Route("api/ticket/ticketsolvedList")]
        //public JsonResult Ticket_Solved_List_Dev(string username)
        //{
        //    var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
        //    List <clsTicketInfo> mlist = clsTicket.Ticket_List(conn, username);
        //    var result = mlist.Where(x => x.Status.Name == "SOLVED");
        //    return new JsonResult(result);
        //}
        //[HttpGet]
        //[Route("api/ticket/ticketAssigned")]
        //public JsonResult Ticket_Assigned_List()
        //{
        //    var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
        //    List <clsTempAssignedTickets> mlist = clsAdminUser.Assigned_Ticket_List(conn);
        //    var result = mlist.Take(4);
        //    return new JsonResult(result);
        //}
        //[HttpGet]
        //[Route("api/ticket/ticketAssignedListAll")]
        //public JsonResult Ticket_Assigned_List_All()
        //{
        //    var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
        //    var result = clsAdminUser.Assigned_Ticket_List(conn);
        //    //var result = mlist.Take(4);
        //    return new JsonResult(result);
        //}


        //[HttpGet]
        //[Route("api/ticket/ticketopenDev")]
        //public JsonResult Ticket_OpenDev_No()
        //{
        //    var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
        //    List<clsTicketInfo> mlist = clsTicket.Ticket_List_Dev_Dashboard(conn);
        //    var count = mlist.Where(x => x.Status.Name == "OPEN").Count();
        //    return new JsonResult(count);
        //}

        //[HttpGet]
        //[Route("api/ticket/ticketAssignedPerDev")]
        //public JsonResult Ticket_AssignedPerDev_List(string username)
        //{
        //    var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
        //    List<clsTempAssignedTickets> mlist = clsAdminUser.Assigned_Ticket_List(conn);
        //    var result = mlist.Where(x=> x.AllocatedToMail==username).Take(4);
        //    return new JsonResult(result);
        //}
        //[HttpGet]
        //[Route("api/ticket/ticketAssignedPerDevAll")]
        //public JsonResult Ticket_AssignedPerDev_List_All(string username)
        //{
        //    var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
        //    List<clsTempAssignedTickets> mlist = clsAdminUser.Assigned_Ticket_List(conn);
        //    var result = mlist.Where(x=> x.AllocatedToMail==username);
        //    return new JsonResult(result);
        //}
        //[HttpGet]
        //[Route("api/ticket/ticketAssignedPerDevAllAlloc")]
        //public JsonResult Ticket_AssignedPerDev_List_Alloc(string username)
        //{
        //    var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
        //    List<clsTempAssignedTickets> mlist = clsAdminUser.Assigned_Ticket_List(conn);
        //    var result = mlist.Where(x=> x.AllocatedToMail==username);
        //    return new JsonResult(result);
        //}
    }
}
