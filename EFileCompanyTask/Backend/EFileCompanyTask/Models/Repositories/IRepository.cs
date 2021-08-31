using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EFileCompanyTask.Models.Repositories
{
    public interface IRepository<TEntity>
    {
        //Get
        IList<TEntity> Get();

        //Get
        IList<TEntity> GetDividedByFirstFive();
        //Get
        IList<TEntity> GetDividedByNextFive(int num);

        //GetById
        TEntity Find(int id);

        //Put
        void Update(int id, TEntity entity);
        
        //Post
        void post(TEntity entity);

        //Delete
        void Delete(int id);

        //Post
        TEntity Login(TEntity entity);

        //Post
        IList<TEntity> Search(Contact name);

    }
}
