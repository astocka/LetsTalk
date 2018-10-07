using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using SignalRChatApp.Models;

namespace SignalRChatApp.Areas.Identity.Models
{
	public class User : IdentityUser<Guid>
	{
        [Required]
        public string Name { get; set; }

        [Required]
        public string Picture { get; set; }
	}
}
