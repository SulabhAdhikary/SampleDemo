using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebLayer.Model;

namespace WebLayer.Services
{
    public interface IApplicationUserService
    {
        UserModel Authenticate(LoginModel login);
    }
}
