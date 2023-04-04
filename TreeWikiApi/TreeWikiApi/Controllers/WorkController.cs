using BLL.Dto;
using BLL.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
    }
}
