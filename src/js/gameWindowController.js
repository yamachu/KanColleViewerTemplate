(function() {
  let responseHandler = require("./js/requestHandler.js");
  window.game = window.game || {};
  window.game.Window = document.getElementById("game_main");
  responseHandler.init();

  // Need WebContents, so call after dom-ready
  window.game.Window.addEventListener(
    "dom-ready",
    () => {
      let content = window.game.Window.getWebContents();
      window.game.Content = content;
      responseHandler.initializeHandling();
    },
    { once: true }
  );
})();
