using BLL.Dto;
using System.Collections.Generic;

namespace BLL.Interfaces
{
    public interface IWorkService
    {
        public void AddWork(WorkDto work);
        void DeleteWork(string id);
        WorkDto GetWork(string id);
        public IEnumerable<WorkDto> GetWorks();
    }
}
