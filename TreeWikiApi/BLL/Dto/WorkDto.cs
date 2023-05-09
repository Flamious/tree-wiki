using DAL.Entities;
using System;

namespace BLL.Dto
{
    public class WorkDto
    {
        public WorkDto() { }
        public WorkDto(Work work)
        {
            this.Id = work.Id;
            this.Title = work.Title;
        }

        public Guid Id { get; set; }
        public string Title { get; set; }

        public Work ToEntity()
        {
            return new Work { Id = this.Id, Title = this.Title };
        }
    }
}
