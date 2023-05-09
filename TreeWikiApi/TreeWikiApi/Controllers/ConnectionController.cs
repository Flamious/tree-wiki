using BLL.Dto;
using BLL.Interfaces;
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
    public class ConnectionController : Controller
    {
        private readonly ILogger<ConnectionController> _logger;
        private readonly IConnectionService _connectionServce;

        public ConnectionController(ILogger<ConnectionController> logger, IConnectionService connectionServce)
        {
            _connectionServce = connectionServce;
            _logger = logger;
        }

        [HttpGet]
        [Route("{work}")]
        public IEnumerable<ConnectionDto> GetConnections([FromRoute] Guid work)
        {
            return this._connectionServce.GetConnections(work);
        }

        [HttpPost]
        [Route("{work}")]
        public IEnumerable<ConnectionDto> AddConnection([FromRoute] Guid work, [FromQuery] ConnectionDto connection)
        {
            connection.Work = work;
            this._connectionServce.AddConnection(connection);

            return this._connectionServce.GetConnections(work);
        }

        [HttpPut]
        [Route("{work}/{id}")]
        public IEnumerable<ConnectionDto> UpdateConnection([FromRoute] Guid work, [FromRoute] Guid id, [FromQuery] string newTitle)
        {
            this._connectionServce.UpdateConnection(id, newTitle);

            return this._connectionServce.GetConnections(work);
        }

        [HttpDelete]
        [Route("{work}/{id}")]
        public IEnumerable<ConnectionDto> DeleteConnection([FromRoute] Guid work, [FromRoute] Guid id)
        {
            this._connectionServce.RemoveConnection(id);

            return this._connectionServce.GetConnections(work);
        }
    }
}
