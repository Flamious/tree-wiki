using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Entities
{
    public class Connection
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public Guid From { get; set; }
        
        public Guid To { get; set; }
        
        public Guid WorkId { get; set; }
    }
}
