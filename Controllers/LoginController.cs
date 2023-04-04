using Common.Utility;
using Microsoft.AspNetCore.Mvc;
using QuickDesk.Models;
using Newtonsoft.Json;
namespace QuickService.Controllers
{
    public class LoginController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        [Route("api/login/validlogin")]
        public JsonResult Valid_Login(String uname, String pwd)
        {
            String APIBaseurl = "http://salesapi.mendine.co.in/";
            clsAPI objAPI = new clsAPI(APIBaseurl);
            var data = new List<clsLoginResultInfo>();
            String apiMethod = "api/Emp/UserNamePwdcheck?uname=" + uname + "&pwd=" + pwd;
            HttpResponseMessage response = objAPI.APIPost(apiMethod);
            if (response.IsSuccessStatusCode)
            {
                string responseString = response.Content.ReadAsStringAsync().Result;
                if (!string.IsNullOrEmpty(responseString))
                {
                    data = JsonConvert.DeserializeObject<List<clsLoginResultInfo>>(responseString);
                    if (data.Count > 0 && data[0].Truefalse == true)
                    {
                        String Email = data[0].empemail;
                        String Designation = data[0].designationshortform;
                        String Empno = data[0].empno;
                        String EmpName = clsHelper.fnConvert2String(data[0].Empname);

                        // Session 
                        HttpContext.Session.SetString("Email", Email);
                        HttpContext.Session.SetString("Empno", Empno);
                        HttpContext.Session.SetString("Empname", EmpName);
                    }
                }
            }
            return new JsonResult(data);
        }

    }
}
