using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace SignalRChatApp.Hubs
{
    public class ChatHub : Hub
    {
        [Authorize]
        public override async Task OnConnectedAsync()
        {
            await Clients.All.SendAsync("SendAction", Context.User.Identity.Name, "connected");
        }

        public override async Task OnDisconnectedAsync(Exception ex)
        {
            await Clients.All.SendAsync("SendAction", Context.User.Identity.Name, "disconnected");
        }

        public async Task Send(string message)
        {
            await Clients.All.SendAsync("SendMessage", Context.User.Identity.Name, message);
        }
    }
}
