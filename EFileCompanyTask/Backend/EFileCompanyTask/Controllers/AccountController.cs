using EFileCompanyTask.Models;
using EFileCompanyTask.Models.Repositories;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;


namespace StoreWebsite.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IRepository<User> UserRepository;
        public AccountController(IRepository<User> _UserRepository)
        {
            UserRepository = _UserRepository;
        }

        [HttpPost]
        [AllowAnonymous]
        //Post /api/Account/Register
        public async System.Threading.Tasks.Task<IActionResult> RegisterAsync(User NewUser)
        {
            if (ModelState.IsValid)
            {
                UserRepository.post(NewUser);
                var claims = new List<Claim>
                {
                  new Claim(ClaimTypes.Name, NewUser.Name)
                };

                var claimsIdentity = new ClaimsIdentity(
                claims, CookieAuthenticationDefaults.AuthenticationScheme);

                var authProperties = new AuthenticationProperties
                {
                    //RedirectUri = "/Home/Index",
                };

                await HttpContext.SignInAsync(
                    CookieAuthenticationDefaults.AuthenticationScheme,
                    new ClaimsPrincipal(claimsIdentity),
                    authProperties);
                return Ok(new { UserName = NewUser.Name, UserId = NewUser.UserId });
            }
            return BadRequest("Fill All Required Data");
        }

        [HttpPost]
        [AllowAnonymous]
        //Post /api/Account/Login
        public async System.Threading.Tasks.Task<IActionResult> LoginAsync(User model)
        {
            User UserInDb = UserRepository.Login(model);
            if (UserInDb != null)
            {
                var claims = new List<Claim>
                {
                  new Claim(ClaimTypes.Name, model.Name),
                  new Claim("Password", model.Password)
                };

                var claimsIdentity = new ClaimsIdentity(
                claims, CookieAuthenticationDefaults.AuthenticationScheme);

                var authProperties = new AuthenticationProperties
                {
                    //RedirectUri = "/Home/Index",
                };

                await HttpContext.SignInAsync(
                    CookieAuthenticationDefaults.AuthenticationScheme,
                    new ClaimsPrincipal(claimsIdentity),
                    authProperties);
                return Ok(new { UserName = UserInDb.Name, UserId = UserInDb.UserId });
            }
            return BadRequest("Name or Password Incorrect");
        }


        [HttpPost]
        //Post /api/Account/Logout
        public async System.Threading.Tasks.Task<IActionResult> LogoutAsync()
        {
            await HttpContext.SignOutAsync();
            return Ok("Logout Successfully");
        }
    }
}
