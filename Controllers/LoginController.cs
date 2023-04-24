using Common.Utility;
using Microsoft.AspNetCore.Mvc;
using QuickDesk.Models;
using Newtonsoft.Json;
using QuickDesk.BLL;

namespace QuickService.Controllers
{
    public class LoginController : Controller
    {
        private readonly IConfiguration configuration;
        private IHostEnvironment environment;
        public LoginController(IConfiguration _configuration, IHostEnvironment _environment)
        {
            configuration = _configuration;
            environment = _environment;
        }
        public IActionResult Index()
        {
            return View();
        }
        //[HttpPost]
        //[Route("api/login/validlogin")]
        //public JsonResult Valid_Login(String uname, String pwd)
        //{
        //    String APIBaseurl = "http://salesapi.mendine.co.in/";
        //    clsAPI objAPI = new clsAPI(APIBaseurl);
        //    var data = new List<clsLoginResultInfo>();
        //    String apiMethod = "api/Emp/UserNamePwdcheck?uname=" + uname + "&pwd=" + pwd;
        //    HttpResponseMessage response = objAPI.APIPost(apiMethod);
        //    if (response.IsSuccessStatusCode)
        //    {
        //        string responseString = response.Content.ReadAsStringAsync().Result;
        //        if (!string.IsNullOrEmpty(responseString))
        //        {
        //            data = JsonConvert.DeserializeObject<List<clsLoginResultInfo>>(responseString);
        //            if (data.Count > 0 && data[0].Truefalse == true)
        //            {
        //                String Email = data[0].empemail;
        //                String Designation = data[0].designationshortform;
        //                String Empno = data[0].empno;
        //                String EmpName = clsHelper.fnConvert2String(data[0].Empname);

        //                // Session 
        //                HttpContext.Session.SetString("Email", Email);
        //                HttpContext.Session.SetString("Empno", Empno);
        //                HttpContext.Session.SetString("Empname", EmpName);
        //            }
        //        }
        //    }
        //    return new JsonResult(data);
        //}

        [HttpPost]
        [Route("api/login/ResgisterEmp")]
        public JsonResult Emp_Register(clsLoginResultInfo info)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            var result= clsAdminUser.Ticket_EmpReg(conn,info);
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/login/validlogin")]
        public JsonResult Valid_Login(clsLoginResultInfo info)
        {
            var conn = this.configuration.GetConnectionString("QuickDeskAdmin");
            var CheckUser= clsAdminUser.Ticket_EmpLogin(conn,info);
            //var result = [];
            if (CheckUser=="found")
            {
                List<clsLoginResultInfo> mlist = clsAdminUser.Employee_List(conn);
                var result=mlist.Where(x => x.empemail==info.empemail && x.Truefalse==true).ToList();
                HttpContext.Session.SetString("Email", result[0].empemail);
                HttpContext.Session.SetString("Empno", result[0].empno.ToString());
                HttpContext.Session.SetString("Empname", result[0].Empname);
                return new JsonResult(result);
            }
            else
            {
                return new JsonResult("Invalid Credentials");
            }
        }

    }
}
