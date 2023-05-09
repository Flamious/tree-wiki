using DAL.Entities;
using DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace DAL.Repositories
{
    public class WorkRepository : BaseRepository, IWorkRepository
    {
        public WorkRepository(string workString, IDatabaseContextFactory contextFactory)
            : base(workString, contextFactory)
        {
        }

        public Work CreateItem(Work work)
        {
            var entity = this.Context.Add(work);
            this.Context.SaveChanges();
            return entity.Entity;
        }

        public IQueryable<Work> GetItems()
        {
            return this.Context.Works.AsNoTracking();
        }

        public Work GetItem(Guid id)
        {
            var Work = this.Context.Works
                .FirstOrDefault(c => c.Id == id);

            return Work;
        }

        public int DeleteItem(Work work)
        {
            this.Context.Works.Remove(work);
            return this.Context.SaveChanges();
        }

        public Work UpdateItem(Work work)
        {
            var entity = this.Context.Works.Update(work);
            this.Context.SaveChanges();
            return entity.Entity;
        }
    }
}
