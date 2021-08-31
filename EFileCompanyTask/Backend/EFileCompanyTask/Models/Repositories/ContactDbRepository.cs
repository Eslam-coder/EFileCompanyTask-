using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EFileCompanyTask.Models.Repositories
{
    public class ContactDbRepository:IRepository<Contact>
    {
        TaskContext context;
        public ContactDbRepository(TaskContext _context)
        {
            context = _context;
        }

        public void Delete(int id)
        {
            Contact ContactInDb = context.Contacts.Find(id);
            if (ContactInDb != null)
            {
                context.Contacts.Remove(ContactInDb);
                context.SaveChanges();
            }
        }

        public Contact Find(int id)
        {
            Contact ContactInDb = context.Contacts.FirstOrDefault(c => c.ContactId == id);
            return ContactInDb;
        }

        public IList<Contact> Get()
        {
            IList<Contact> ContactsList = context.Contacts.ToList();
            return ContactsList;
        }

        public void post(Contact NewContact)
        {
            context.Contacts.Add(NewContact);
            context.SaveChanges();
        }

        public void Update(int id, Contact ContactUpdated)
        {
            Contact ContactInDb = context.Contacts.FirstOrDefault(c => c.ContactId == id);

            ContactInDb.Name = ContactUpdated.Name;
            ContactInDb.Phone = ContactUpdated.Phone;
            ContactInDb.Address = ContactUpdated.Address;
            ContactInDb.Notes = ContactUpdated.Notes;
            ContactInDb.IsLocked = true;

            context.SaveChanges();
        }

        public IList<Contact> GetDividedByFirstFive()
        {
            IList<Contact> ContactsList = context.Contacts.Take(5).ToList();
            return ContactsList;
        }

        public IList<Contact> GetDividedByNextFive(int num)
        {
            IList<Contact> ContactsList = context.Contacts.Skip(5*num).Take(5).ToList();
            return ContactsList;
        }

        public IList<Contact> Search(Contact name)
        {
            //Extension Method 
            var ContactsList = context.Contacts.Where(c => c.Name.Contains(name.Name) ||
                                                           c.Address.Contains(name.Name) ||
                                                           c.Notes.Contains(name.Name)
                                                     ).ToList();
            return ContactsList;
        }

        public Contact Login(Contact entity)
        {
            throw new NotImplementedException();
        }
    }
}
