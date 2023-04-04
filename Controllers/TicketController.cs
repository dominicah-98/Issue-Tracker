using Common.Utility;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using QuickDesk.BLL;
using QuickDesk.Models;
using System;
using System.Collections.Generic;
using System.IO;

namespace QuickService.Controllers
{
   
    public class TicketController : Controller
    {
        private readonly IConfiguration configuration;
        private IHostEnvironment environment;
        public TicketController(IConfiguration _configuration, IHostEnvironment _environment)
        {
            configuration = _configuration;
            environment = _environment;
        }
        public IActionResult Index()
        {
            return View();
        }
        //[HttpGet]
        //[Route("api/ticket/statuslist")]
        //public JsonResult Ticket_Status()
        //{
        //    var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
        //    var result = clsMisc.Misc_List(conn, "STATUS");
        //    return new JsonResult(result);
        //}
        //[HttpPost]
        //[Route("api/ticket/ticketsave")]
        //public JsonResult Ticket_Save(clsTicketInfo info, IFormFile File)
        //{
        //    if (File != null)
        //    {
        //        string wwwPath = this.environment.ContentRootPath + "\\wwwroot\\TicketImg";
        //        //string contentPath = environment.ContentRootPath + "\\TicketImg";

        //        string path = Path.Combine(wwwPath, info.TicketNo);
        //        if (!Directory.Exists(path))
        //        {
        //            Directory.CreateDirectory(path);
        //        }
        //        else
        //        {
        //            string[] filePaths = Directory.GetFiles(path);
        //            foreach (string fp in filePaths)
        //            {
        //                System.IO.File.Delete(fp);
        //            }
        //        }

        //        var fileName = File.FileName;
        //        var filePath = Path.Combine(path, fileName);
        //        using (FileStream fs = System.IO.File.Create(filePath))
        //        {
        //            File.CopyTo(fs);
        //        }
        //    }

        //    var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
        //    var temp = clsTicket.Ticket_Save(conn, info);
        //    var result = temp == "" ? "Ticket successfully raised...." : temp;

        //    return new JsonResult(result);
        //}
        //[HttpGet]
        //[Route("api/ticket/ticketlist")]
        //public JsonResult Ticket_List(string username)
        //{
        //    var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
        //    var result = clsTicket.Ticket_List(conn, username);
        //    var count = result.Count();
        //    return new JsonResult(result);
        //}

        //[HttpGet]
        //[Route("api/ticket/TicketDetail")]
        //public JsonResult Ticket_Details(clsTicketInfo info)
        //{
        //    var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
        //    List<clsTicketInfo> mlist = clsTicket.Ticket_List(conn, info.RaisedBy);
        //    var result = mlist.Where(x => x.IDTicket == info.IDTicket).ToList();
        //    return new JsonResult(result);
        //}
        [HttpGet]
        [Route("api/ticket/AdminUserList")]
        public JsonResult Ticket_Admin_User_List(string useremail)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsUserInfo> mlist = clsAdminUser.Admin_Dev_List(conn);
            var result = mlist.Where(x => x.Email == useremail);
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/ticket/DevList")]
        public JsonResult Ticket_Dev_List()
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            List<clsUserInfo> mlist = clsAdminUser.Admin_Dev_List(conn);
            var result = mlist.Where(x => x.Admin == false);
            return new JsonResult(result);
        }
        //[HttpPost]
        //[Route("api/ticket/DevAssign")]
        //public JsonResult Ticket_Dev_Assign(clsDevAssign info)
        //{
        //    var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
        //    var result = clsAdminUser.Assign_Dev(conn, info);
        //    return new JsonResult(result);
        //}
        //[HttpGet]
        //[Route("api/ticket/DevAssignedDetails")]
        //public JsonResult Ticket_Assigned_Dev_Details(long IDTicket)
        //{
        //    var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
        //    List<clsTempDevAssign> mlist = clsAdminUser.Assigned_Dev_List(conn);
        //    var result = mlist.Where(x => x.IDTicket == IDTicket);
        //    return new JsonResult(result);
        //}
    }
}
