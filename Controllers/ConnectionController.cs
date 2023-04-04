using Microsoft.AspNetCore.Mvc;

namespace QuickDesk.Controllers
{
    public class ConnectionController : Controller
    {
        public IActionResult Index()
        {
            if (!String.IsNullOrEmpty(HttpContext.Request.Query["Email"]) && !String.IsNullOrEmpty(HttpContext.Request.Query["Empno"]) && !String.IsNullOrEmpty(HttpContext.Request.Query["Empname"]))
            {
                HttpContext.Session.SetString("Email", HttpContext.Request.Query["Email"]);
                HttpContext.Session.SetString("Empno", HttpContext.Request.Query["Empno"]);
                HttpContext.Session.SetString("Empname", HttpContext.Request.Query["Empname"]);
                //HttpContext.Session.SetString("Portal", HttpContext.Request.Query["Portal"]);
                return RedirectToAction("Index", "Dashboard");
            }
            else
            {
                return RedirectToAction("Index", "Login");
            }
            //return View();
        }
    }
}
