using BLL.Dto;
using BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace TreeWikiApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WorkController : Controller
    {
        private readonly ILogger<WorkController> _logger;
        private readonly IWorkService _workService;

        public WorkController(ILogger<WorkController> logger, IWorkService workService)
        {
            _workService = workService;
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<WorkDto> GetWorks()
        {
            return this._workService.GetWorks();
        }

        [HttpPost]
        public IEnumerable<WorkDto> AddWork(string title)
        {
            this._workService.AddWork(new WorkDto() { Title = title });

            return this._workService.GetWorks();
        }

        [HttpDelete]
        [Route("{id}")]
        public IEnumerable<WorkDto> DeleteWork([FromRoute] string id)
        {
            this._workService.DeleteWork(id);

            return this._workService.GetWorks();
        }
    }
}
