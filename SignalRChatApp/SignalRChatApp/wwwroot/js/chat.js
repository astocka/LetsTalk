// Bind DOM elements
var messageInput = document.getElementById("message-input");
var sendButton = document.getElementById("send-button");
var messagesList = document.getElementById("messages-list");
//var messageTextBox = document.getElementById("message-textbox");
var usersOnline = document.getElementById("users-online");

//date
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

//messages
function appendMessage(content) {
    var li = document.createElement("li");
    li.innerText = content;
    messagesList.appendChild(li);
}
//users
//function usersList(content) {
//    var li = document.createElement("li");
//    li.innerText = content;
//    usersOnline.appendChild(li);
//}

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/chat")
    .configureLogging(signalR.LogLevel.Information)
    .build();

sendButton.addEventListener("click", function () {
    var message = messageInput.value;
    messageInput.value = "";
    connection.send("Send", message);
    //event.preventDefault();

    //document.getElementById("userInput").value = "";
    //document.getElementById("messageInput").value = "";
});

connection.on("SendMessage", function (sender, message) {
    var indexAt = sender.toString().indexOf("@");
    var senderName = sender.slice(0, indexAt);

    appendMessage(senderName + '  ' + getCurrentDate() + getCurrentTime() + ' : ' + message);
});

connection.on("SendAction", function (sender, status) {
    var indexAt = sender.toString().indexOf("@");
    var senderName = sender.slice(0, indexAt);


    var tableRow = document.createElement("tr");
    var statusData = document.createElement("td");
    var userData = document.createElement("td");

    var canvas = document.createElement("canvas");
    canvas.setAttribute("width", "10");
    canvas.setAttribute("height", "10");
    if (status === "connected") {
        canvas.style.backgroundColor = "#BADA55";
    } else if (status === "disconnected") {
        canvas.style.backgroundColor = "#cc0033";
    } else {
        canvas.style.backgroundColor = "#c2c2d6";
    }
    canvas.style.borderRadius = "100px";

    statusData.appendChild(canvas);
    userData.innerText = senderName;

    usersOnline.appendChild(tableRow);
    tableRow.appendChild(statusData);
    tableRow.appendChild(userData);
});

connection.start().then(function () {
    messageInput.disabled = false;
    sendButton.disabled = false;
});

