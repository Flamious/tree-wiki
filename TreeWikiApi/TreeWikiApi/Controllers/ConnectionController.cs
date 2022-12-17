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
        public IEnumerable<ConnectionDto> GetConnections()
        {
            return this._connectionServce.GetConnections();
        }

        [HttpPost]
        public IEnumerable<ConnectionDto> AddConnection(ConnectionDto connection)
        {
            this._connectionServce.AddConnection(connection);

            return this._connectionServce.GetConnections();
        }

        [HttpDelete]
        [Route("{id}")]
        public IEnumerable<ConnectionDto> DeleteConnection([FromRoute] string id)
        {
            this._connectionServce.RemoveConnection(id);

            return this._connectionServce.GetConnections();
        }
    }
}
