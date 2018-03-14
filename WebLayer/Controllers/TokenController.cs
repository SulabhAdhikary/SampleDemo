using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using WebLayer.Model;
using WebLayer.Services;

namespace WebLayer.Controllers
{
    [Route("api/[controller]")]
    public class TokenController : Controller
    {


        private IConfiguration _config;
        private IApplicationUserService _userService;
        private ITokenManagement _tokenManagement;

        public TokenController(IConfiguration config, IApplicationUserService userService, ITokenManagement tokenManagement)
        {
            _config = config;
            _userService = userService;
            _tokenManagement = tokenManagement;
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public IActionResult CreateToken([FromBody]LoginModel login)
        {
            IActionResult response = Unauthorized();
            var user = _userService.Authenticate(login);

            if (user != null)
            {
                var tokenString = _tokenManagement.BuildToken(user);
                response = Ok(new
                {
                    Username = login.UserName,                  
                    Token = tokenString
                });
            }
            else
            {
                response = Ok(new { Token = "" });
            }
          

            return response;
        }

      

    }
}