using QuickDesk.Models;
using System.Net.Mail;
using System.Net;

namespace QuickDesk.BLL
{
    public class clsEmailHelper
    {
        public static String Send_Email(string SMTPServer, Boolean EnableSSL_TrueFalse, string Username, string Password, int SMTP_Port, string mfromEmail, List<string> mToEmail, List<string> ccEmail, string mSubject, string mBody)
        {
            string EmailStatus = "";
            try
            {
                using (MailMessage mm = new MailMessage())
                {
                    mm.From = new MailAddress(mfromEmail);
                    mm.To.Add(mfromEmail);
                    mm.Subject = mSubject;
                    mm.Body = mBody;
                    mm.IsBodyHtml = true;
                    //string[] Multi = request.mToEmail.ToArray();
                    //mm.To.Add(new MailAddress(mToEmail));
                    foreach (string Multiccmail in ccEmail)
                    {
                        mm.CC.Add(new MailAddress(Multiccmail));
                    }
                    foreach (string Multimailid in mToEmail)
                    {
                        mm.To.Add(new MailAddress(Multimailid));
                    }
                    //mm.To.Add(new MailAddress("dominica.halder@iecsl.co.in"));
                    //mm.CC.Add(new MailAddress("richagomes1998@gmail.com"));
                    SmtpClient smtp = new SmtpClient();
                    smtp.Host = SMTPServer;
                    smtp.EnableSsl = EnableSSL_TrueFalse;
                    NetworkCredential NetworkCred = new NetworkCredential(Username, Password);

                    //smtp.UseDefaultCredentials = false;
                    smtp.Credentials = NetworkCred;
                    smtp.Port = SMTP_Port;
                    smtp.Send(mm);
                    EmailStatus = "";
                    return EmailStatus;
                }
            }
            catch (Exception ex)
            {
                EmailStatus = ex.Message.ToString();
                return EmailStatus;
            }
            finally { }
        }
    }
}
