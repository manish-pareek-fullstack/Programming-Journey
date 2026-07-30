let usernamehtml = document.getElementById("username");
let ogonlinebtnhtml = document.getElementById("goonline");
let ogooflinebtnhtml = document.getElementById("gooofline");
let contextmsghtml = document.getElementById("contextmsg");
let msgcontextmenuinputboxhtml = document.getElementById("msgcontextmenu");
let sendbtnhtml = document.getElementById("sendbtn");

// state variables
function chatSession(username) {
  let isOnline = false;
  let isTyping = false;
  let messageCount = 0;
  console.log(username.innerHTML);
  usernamehtml.innerHTML = `
  <div class="mb-2">
    <h2 class="text-center text-xl ">Username: ${username}</h2>
  </div>
`;

  function log(message) {
    console.log(`[LOG]: ${message}`);
    contextmsghtml.innerHTML += message + "<br>";
  }

  return {
    goOnline() {
      isOnline = true;
      isTyping = false;
      log(`${username} is online`);
    },

    goOffline() {
      isOnline = false;
      isTyping = false;
      log(`${username} is offline`);
    },

    startTyping() {
      if (!isOnline) {
        log(`Cannot start typing. ${username} is offline.`);
        return;
      }
      if (isTyping) return;

      isTyping = true;
      log(`${username} is typing...`);
    },

    stopTyping() {
      if (!isTyping) return;

      isTyping = false;
      log(`${username} stopped typing`);
    },

    sendMessage(message) {
      if (!isOnline) {
        log(`Cannot send message. ${username} is offline.`);
        return;
      }

      if (isTyping) {
        log(`Cannot send message while typing.`);
        return;
      }
      if (message.trim().length === 0) {
        log(`Empty message not sent.`);
        return;
      }

      if (!message) {
        log(`Empty message not sent.`);
        return;
      }

      messageCount++;
      log(`${username} sent: ${message}`);
      log(`Total messages sent: ${messageCount}`);
    },

    getStatus() {
      return {
        username,
        isOnline,
        isTyping,
        messageCount,
      };
    },
  };
}
let manish = chatSession("Manish");
ogonlinebtnhtml.addEventListener("click", () => {
  manish.goOnline();
});
ogooflinebtnhtml.addEventListener("click", () => {
  manish.goOffline();
});
msgcontextmenuinputboxhtml.addEventListener("focus", () => {
  manish.startTyping();
});
msgcontextmenuinputboxhtml.addEventListener("blur", () => {
  manish.stopTyping();
});
sendbtnhtml.addEventListener("click", () => {
  manish.sendMessage(msgcontextmenuinputboxhtml.value);
});
