using EFileCompanyTask.Models;
using EFileCompanyTask.Models.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EFileCompanyTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        IRepository<User> UserRepository;
        public UserController(IRepository<User> _UserRepository)
        {
            UserRepository = _UserRepository;
        }
        [HttpGet]
        //Get /api/User/GetAllUsers
        public IActionResult GetAllContacts()
        {
            IList<User> UsersList = UserRepository.Get();
            return Ok(UsersList);
        }

        [HttpGet]
        //GetById /api/UsersListsList/GetUserById/1
        public IActionResult GetUserById(int id)
        {
            User UserInDb = UserRepository.Find(id);
            if (UserInDb == null)
            {
                return NotFound("User Not Found");
            }
            return Ok(UserInDb);
        }

        [HttpPost]
        //Post /api/User/AddUser
        public IActionResult AddCategory(User User)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            UserRepository.post(User);
            return Ok(User);
        }

        [HttpPut]
        //Put /api/User/EditUser/1
        public IActionResult EditContact(int id, User UpdateUser)
        {
            UserRepository.Update(id, UpdateUser);
            return Ok(UpdateUser);
        }

        [HttpDelete]
        //Delete /api/User/DeleteUser/1
        public IActionResult DeleteUser(int id)
        {
            UserRepository.Delete(id);
            return Ok(id);
        }
    }
}
