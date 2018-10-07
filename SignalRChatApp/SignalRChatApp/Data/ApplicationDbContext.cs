using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SignalRChatApp.Models;
using SignalRChatApp.Areas.Identity.Models;

namespace SignalRChatApp.Data
{
    public class ApplicationDbContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
    {
        //public DbSet<Client> Clients { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        //protected override void OnModelCreating(ModelBuilder builder)
        //{
        //    builder.Entity<Client>()
        //        .HasIndex(c => c.Name).IsUnique();
        //    base.OnModelCreating(builder);
        //}
    }
}
