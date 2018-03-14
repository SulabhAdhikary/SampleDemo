using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebLayer.Model;

namespace WebLayer.Services
{
    public class ApplicationUserSevice : IApplicationUserService
    {
        public UserModel Authenticate(LoginModel login)
        {
            UserModel user = null;

            if (login.UserName == "abc" && login.Password == "abc")
            {
                user = new UserModel { Name = "John Doe", Email = "johndoe@nasa.com" };
            }
            return user;
        }
    }
}
