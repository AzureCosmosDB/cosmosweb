﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace cosmosweb.Controllers
{
    [AllowAnonymous]
    public class CommunityController : Controller
    {
        public IActionResult Index()
        {
            return View("Community");
        }
        public IActionResult Community()
        {
            return View("Community");
        }

        [Route("community/sdk")]
        public IActionResult SDK()
        {
            return View("SDK");
        }

        [Route("community/blog")]
        public IActionResult Blog()
        {
            return View("Blog");
        }
    }
}