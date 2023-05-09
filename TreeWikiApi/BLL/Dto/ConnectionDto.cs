using DAL.Entities;
using System;

namespace BLL.Dto
{
    public class ConnectionDto
    {
        public ConnectionDto() { }
        public ConnectionDto(Connection connection)
        {
            this.Id = connection.Id;
            this.Title = connection.Title;
            this.From = connection.From;
            this.To = connection.To;
            this.Work = connection.WorkId;
        }

        public Guid Id { get; set; }
        public Guid From { get; set; }
        public Guid To { get; set; }
        public string Title { get; set; }
        public Guid Work { get; set; }

        public Connection ToEntity()
        {
            return new Connection { Id = this.Id, From = this.From, To = this.To, WorkId = this.Work, Title = this.Title };
        }
    }
}
