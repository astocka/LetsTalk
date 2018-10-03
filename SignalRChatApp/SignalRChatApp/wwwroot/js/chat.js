"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chat").build();

function getCurrentDate() {
    var currentDate = new Date(),
        day = currentDate.getDate(),
        month = currentDate.getMonth() + 1,
        year = currentDate.getFullYear();
    return day + "/" + month + "/" + year + " ";
}

function getCurrentTime() {
    var currentTime = new Date(),
        hours = currentTime.getHours(),
        minutes = currentTime.getMinutes();

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    var suffix = "AM";
    if (hours >= 12) {
        suffix = "PM";
        hours = hours - 12;
    }
    if (hours == 0) {
        hours = 12;
    }
    return hours + ":" + minutes + " " + suffix + " ";
}


connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    var info = document.createElement("li");
    info.textContent = user + " " + getCurrentDate() + getCurrentTime();

    var userMsg = document.createElement("li");
    userMsg.textContent = msg;

    var messages = document.getElementById("messagesList");
    messages.appendChild(info);
    messages.appendChild(userMsg);
    messages.style.listStyleType = "none";
});

connection.start().catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();

    document.getElementById("userInput").value = "";
    document.getElementById("messageInput").value = "";
});
