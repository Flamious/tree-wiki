using BLL.Dto;
using System;
using System.Collections.Generic;

namespace BLL.Interfaces
{
    public interface IWorkService
    {
        public void AddWork(WorkDto work);
        void DeleteWork(Guid id);
        WorkDto GetWork(Guid id);
        public IEnumerable<WorkDto> GetWorks();
    }
}
