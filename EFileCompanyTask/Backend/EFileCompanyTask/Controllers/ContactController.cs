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
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        IRepository<Contact> contactRepository;
        public ContactController(IRepository<Contact> _contactRepository)
        {
            contactRepository = _contactRepository;
        }
        [HttpGet]
        //Get /api/Contact/GetAllContacts
        public IActionResult GetAllContacts()
        {
            IList<Contact> ContactsList = contactRepository.Get();
            return Ok(ContactsList);
        }

        [HttpGet]
        //GetById /api/Contact/GetContactById/1
        public IActionResult GetContactById(int id)
        {
            Contact ContactInDb = contactRepository.Find(id);
            if (ContactInDb == null)
            {
                return NotFound("Contact Not Found");
            }
            return Ok(ContactInDb);
        }

        [HttpPost]
        //Post /api/Contact/AddContact
        public IActionResult AddContact(Contact contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            
            contactRepository.post(contact);
            return Ok(contact);
        }

        [HttpPut]
        //Put /api/Contact/EditContact/1
        public IActionResult EditContact(int id, Contact UpdateContact)
        {
            contactRepository.Update(id, UpdateContact);
            return Ok(UpdateContact);
        }

        [HttpDelete]
        //Delete /api/Contact/DeleteContact/1
        public IActionResult DeleteContact(int id)
        {
            contactRepository.Delete(id);
            return Ok(id);
        }

        [HttpGet]
        //Get /api/Contact/GetDividedByFirstFive
        public IActionResult GetDividedByFirstFive()
        {
            IList<Contact> ContactsList = contactRepository.GetDividedByFirstFive();
            return Ok(ContactsList);
        }

        [HttpGet]
        //Get /api/Contact/GetDividedByNextFive
        public IActionResult GetDividedByNextFive(int num)
        {
            IList<Contact> ContactsList = contactRepository.GetDividedByNextFive(num);
            return Ok(ContactsList);
        }

        [HttpPost]
        //Post /api/Contact/Search
        public IActionResult Search(Contact name)
        {
            var contactsList = contactRepository.Search(name);
            return Ok(contactsList);
        }
    }
}
