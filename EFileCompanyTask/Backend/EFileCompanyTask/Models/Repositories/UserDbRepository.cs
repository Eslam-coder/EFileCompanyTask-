using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EFileCompanyTask.Models.Repositories
{
    public class UserDbRepository : IRepository<User>
    {
        TaskContext context;
        public UserDbRepository(TaskContext _context)
        {
            context = _context;
        }
        public void Delete(int id)
        {
            User UserInDb = context.Users.Find(id);
            if (UserInDb != null)
            {
                context.Users.Remove(UserInDb);
                context.SaveChanges();
            }
        }

        public User Find(int id)
        {
            User UserInDb = context.Users.FirstOrDefault(u=>u.UserId==id);
            return UserInDb;
        }

        public IList<User> Get()
        {
            IList<User> UsersList = context.Users.ToList();
            return UsersList;
        }

        public void post(User NewUser)
        {
            context.Users.Add(NewUser);
            context.SaveChanges();
        }

        public void Update(int id, User UserUpdated)
        {
            User UserInDb = context.Users.FirstOrDefault(u => u.UserId == id);
            UserInDb.Name = UserUpdated.Name;
            UserInDb.Password = UserUpdated.Password;
           
            context.SaveChanges();
        }

        public User Login(User user)
        {
            User UserInDb = context.Users.FirstOrDefault(u => u.Name == u.Name && u.Password == user.Password);
            return UserInDb;
        }

        public IList<User> GetDividedByFirstFive()
        {
            throw new NotImplementedException();
        }

        public IList<User> GetDividedByNextFive(int num)
        {
            throw new NotImplementedException();
        }

        public IList<User> Search(Contact name)
        {
            throw new NotImplementedException();
        }
    }
}
