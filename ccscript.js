/*[c][size=1] STARTCCA /**/ var myUsername = "";
var usernameRE = /href="\/collection\/user\/(.*?)">Collection/.exec(
  document.body.innerHTML
);
if (usernameRE) {
  myUsername = usernameRE[1];
}
var CCversion = [1, 1, 5];
/*jshint -W018*/ /*jshint -W086*/ /*jshint -W014*/ /*jshint -W117*/ /*var document = "";var module = "";var alert = "";var alertify = "";var confirm = "";var prompt = "";var window="";*/ /*var document = "";let module = "";let alert = "";  let alertify = "";let confirm = "";let prompt = "";let define = "";let window = "";let setTimeout = "";let Event = "";*/ var z = {};
var ts = document.getElementsByTagName("textarea");
var t = ts[ts.length - 1];
var me = -1;
var mobile = false;
var secret = false;
const THIEF = 1;
const BUREAUCRAT = 2;
const GUNSLINGER = 3;
const BEGGAR = 4;
const SCAPEGOAT = 5;
const APPRENTICE = 6;
const MATRON = 7;
const JUDGE = 8;
const VOUDON = 9;
const BISHOP = 10;
const BARISTA = 11;
const HARLOT = 12;
const BUTCHER = 13;
const BONE_COLLECTOR = 14;
const DEVIANT = 15;
const GANGSTER = 16;
const GNOME = 17;
const CACKLEJACK = 18;
const DOOMSAYER = 0;
const TOYMAKER = 1;
const ANGEL = 2;
const BUDDHIST = 3;
const REVOLUTIONARY = 4;
const HELLS_LIBRARIAN = 5;
const FIDDLER = 6;
const FIBBIN = 7;
const DUCHESS = 8;
const SENTINEL = 9;
const SPIRIT_OF_IVORY = 10;
const DJINN = 11;
const DEUS_EX_FIASCO = 12;
const STORM_CATCHER = 13;
const BOOTLEGGER = 14;
const FERRYMAN = 15;
const GARDENER = 16; /* the constant gardener */
const STORYTELLER = 0;
const NO_CO = -1;
const UNDECIDED = 0;
const NO = 1;
const YES = 2;
const EXECUTION = 0;
const EXILE = 1;
const CULT = 2;
const INCOMPLETE = 0;
const PASS = 1;
const FAIL = 2;
const TIE = 3;
function inv() {
  /* DEDAFF */ return colorText("#F7F7F8", "|");
}
/***** ALERTIFY ****/ var lb = String.fromCharCode(60);
var TRANSITION_FALLBACK_DURATION = 500;
var hideElement = function (el) {
  if (!el) {
    return;
  }
  let removeThis = function () {
    if (el && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  };
  el.classList.remove("show");
  el.classList.add("hide");
  el.addEventListener("transitionend", removeThis);
  /* alertify: Fallback for no transitions. */ setTimeout(
    removeThis,
    TRANSITION_FALLBACK_DURATION
  );
};
function Alertify() {
  /**	 * Alertify private object	 * @type {Object}	 */ /* _alertify is a struct, with functions... */ let _alertify = {
    parent: document.body,
    version: "1.0.11",
    defaultOkLabel: "Ok",
    okLabel: "Ok",
    defaultCancelLabel: "Cancel",
    cancelLabel: "Cancel",
    defaultMaxLogItems: 2,
    maxLogItems: 2,
    promptValue: "",
    promptPlaceholder: "",
    closeLogOnClick: false,
    closeLogOnClickDefault: false,
    delay: 5000,
    defaultDelay: 5000,
    logContainerClass: "alertify-logs",
    logContainerDefaultClass: "alertify-logs",
    dialogs: {
      buttons: {
        holder: lb + "nav>{" + "{buttons}}" + lb + "/nav>",
        ok: lb + "button class='ok' tabindex='1'>{" + "{ok}}" + lb + "/button>",
        cancel:
          lb +
          "button class='cancel' tabindex='2'>{" +
          "{cancel}}" +
          lb +
          "/button>",
        choice:
          lb +
          "button class='choice' id='choice{" +
          "{num}}'>{" +
          "{choice}}" +
          lb +
          "/button>"
      },
      input: lb + "input type='text'>",
      message: lb + "p class='msg'>{" + "{message}}" + lb + "/p>",
      log: lb + "div class='{" + "{class}}'>{" + "{message}}" + lb + "/div>"
    },
    defaultDialogs: {
      buttons: {
        holder: lb + "nav>{" + "{buttons}}" + lb + "/nav>",
        ok: lb + "button class='ok' tabindex='1'>{" + "{ok}}" + lb + "/button>",
        cancel:
          lb +
          "button class='cancel' tabindex='2'>{" +
          "{cancel}}" +
          lb +
          "/button>"
      },
      input: lb + "input type='text'>",
      message: lb + "p class='msg'>{" + "{message}}" + lb + "/p>",
      log: lb + "div class='{" + "{class}}'>{" + "{message}}" + lb + "/div>"
    },
    /**		 * Build the proper message box		 *		 * @param  {Object} item    Current object in the queue		 *		 * @return {String}         An HTML string of the message box		 */ build: function (
      item
    ) {
      /* promptButton uses onOkay to carry illegal with us... */ let btnTxt = this
        .dialogs.buttons.ok;
      let html = lb + "div class='dialog'>" + lb + "div>";
      if (item.type === "promptButton" && typeof item.message === "string") {
        let illegal = item.onOkay;
        let split = item.message.split("\n");
        let foundAnyChoices = false;
        for (let j = 0; !(j >= split.length); j++) {
          let re = /^([ABC]|\d+): (.*)$/.exec(split[j]);
          if (re === null) {
            html += this.dialogs.message.replace("{" + "{message}}", split[j]);
          } else {
            foundAnyChoices = true;
            let n = parseInt(re[1]);
            if (isNaN(n) || !illegal(n)) {
              /* valid options or a number, gets id choiceA, choiceB, choiceC, choice0, choice1, etc... */ html += this.dialogs.buttons.holder.replace(
                "{" + "{buttons}}",
                this.dialogs.buttons.choice
                  .replace("{" + "{choice}}", re[2])
                  .replace("{" + "{num}}", re[1])
              );
            } else {
              html += this.dialogs.message.replace(
                "{" + "{message}}",
                split[j]
              );
            }
          }
        }
        if (!foundAnyChoices) {
          for (let n = 0; !(n > 30); n++) {
            if (!illegal(n)) {
              html += this.dialogs.buttons.holder.replace(
                "{" + "{buttons}}",
                this.dialogs.buttons.choice
                  .replace("{" + "{choice}}", n)
                  .replace("{" + "{num}}", n)
              );
            }
          }
        }
        html += this.dialogs.buttons.holder.replace(
          "{" + "{buttons}}",
          this.dialogs.buttons.cancel.replace(
            "{" + "{cancel}}",
            this.cancelLabel
          )
        );
        html += lb + "/div>" + lb + "/div>";
        return html;
      }
      if (typeof item.message === "string") {
        item.message = item.message.replace(/\n/g, lb + "br>");
      }
      html += this.dialogs.message.replace("{" + "{message}}", item.message);
      if (item.type === "confirm" || item.type === "prompt") {
        btnTxt = this.dialogs.buttons.cancel + this.dialogs.buttons.ok;
      }
      if (item.type === "prompt") {
        html += this.dialogs.input;
      }
      html = (html + this.dialogs.buttons.holder + lb + "/div>" + lb + "/div>")
        .replace("{" + "{buttons}}", btnTxt)
        .replace("{" + "{ok}}", this.okLabel)
        .replace("{" + "{cancel}}", this.cancelLabel);
      return html;
    },
    /**		 * Create a dialog box		 *		 * @param  {String}   message      The message passed from the callee		 * @param  {String}   type         Type of dialog to create		 * @param  {Function} onOkay       [Optional] Callback function when clicked okay.		 * @param  {Function} onCancel     [Optional] Callback function when cancelled.		 *		 * @return {Object}		 */ dialog: function (
      message,
      type,
      onOkay,
      onCancel
    ) {
      return this.setup({
        type: type,
        message: message,
        onOkay: onOkay,
        onCancel: onCancel
      });
    },
    /**		 * Initiate all the required pieces for the dialog box		 *		 * @return {undefined}		 */ setup: function (
      item
    ) {
      let el = document.createElement("div");
      el.className = "alertify hide";
      el.innerHTML = this.build(item);
      let illegal = item.onOkay;
      item.onOkay = null;
      let btnOK = el.querySelector(".ok");
      let btnCancel = el.querySelector(".cancel");
      let input = el.querySelector("input");
      let label = el.querySelector("label");
      let choiceA = el.querySelector("#choiceA");
      let choiceB = el.querySelector("#choiceB");
      let choiceC = el.querySelector("#choiceC");
      let choices = [];
      if (choiceA) {
        choices.push(choiceA);
      }
      if (choiceB) {
        choices.push(choiceB);
      }
      if (choiceC) {
        choices.push(choiceC);
      }
      for (let j = 0; !(j > 20); j++) {
        let choiceN = el.querySelector("#choice" + j);
        if (choiceN) {
          choices.push(choiceN);
        }
      }
      /*document.getElementById("body").parentNode.insertBefore(el,document.getElementById("body")); */ /* alertify: Set default value/placeholder of input */ if (
        input
      ) {
        if (typeof this.promptPlaceholder === "string") {
          /* alertify: Set the label, if available, for MDL, etc. */ if (
            label
          ) {
            label.textContent = this.promptPlaceholder;
          } else {
            input.placeholder = this.promptPlaceholder;
          }
        }
        if (typeof this.promptValue === "string") {
          input.value = this.promptValue;
        }
      }
      /* is there any reject? gotta have cleanup... */ function setupHandlers(
        resolve
      ) {
        if ("function" !== typeof resolve) {
          /* alertify: promises are not available so resolve is a no-op */ resolve = function () {};
        }
        for (let j = 0; !(j >= choices.length); j++) {
          choices[j].addEventListener("click", (ev) => {
            resolve({ buttonClicked: choices[j].id, event: ev });
            hideElement(el);
          });
        }
        if (btnOK) {
          if (!input) {
            btnOK.addEventListener("keyup", function (ev) {
              if (ev.which === 27) {
                if (btnCancel) {
                  btnCancel.click();
                } else {
                  btnOK.click();
                }
              }
            });
          }
          btnOK.addEventListener("click", function (ev) {
            if (input) {
              resolve({
                buttonClicked: "ok",
                inputValue: input.value,
                event: ev
              });
            } else {
              resolve({ buttonClicked: "ok", event: ev });
            }
            hideElement(el);
          });
        }
        if (btnCancel) {
          btnCancel.addEventListener("click", function (ev) {
            if (item.onCancel && "function" === typeof item.onCancel) {
              item.onCancel(ev);
            }
            if (input) {
              resolve({
                buttonClicked: "cancel",
                inputValue: input.value,
                event: ev
              });
            } else {
              resolve({ buttonClicked: "cancel", event: ev });
            }
            hideElement(el);
          });
        }
        if (input) {
          input.addEventListener("keyup", function (ev) {
            if (ev.which === 13) {
              btnOK.click();
            } else if (ev.which === 27) {
              btnCancel.click();
            }
          });
        }
      }
      let promise;
      if (typeof Promise === "function") {
        promise = new Promise(setupHandlers);
      } else {
        setupHandlers();
      }
      this.parent.appendChild(el);
      setTimeout(function () {
        el.classList.remove("hide");
        if (input && item.type && item.type === "prompt") {
          input.select();
          /* I don't think this works on iOS */ input.focus();
        } else {
          if (btnOK) {
            btnOK.focus();
          }
        }
      }, 100);
      return promise;
    },
    okBtn: function (label) {
      this.okLabel = label;
      return this;
    },
    setDelay: function (time) {
      time = time || 0;
      this.delay = isNaN(time) ? this.defaultDelay : parseInt(time, 10);
      return this;
    },
    cancelBtn: function (str) {
      this.cancelLabel = str;
      return this;
    },
    /*setMaxLogItems: function(num) {			this.maxLogItems = parseInt(num || this.defaultMaxLogItems);		},*/ /* TODO: play around with this, though then we may need to be careful with calls to reset. */ theme: function (
      themeStr
    ) {
      switch (themeStr.toLowerCase()) {
        case "bootstrap":
          this.dialogs.buttons.ok =
            lb +
            "button class='ok btn btn-primary' tabindex='1'>{" +
            "{ok}}" +
            lb +
            "/button>";
          this.dialogs.buttons.cancel =
            lb +
            "button class='cancel btn btn-default' tabindex='2'>{" +
            "{cancel}}" +
            lb +
            "/button>";
          this.dialogs.input = lb + "input type='text' class='form-control'>";
          break;
        case "purecss":
          this.dialogs.buttons.ok =
            lb +
            "button class='ok pure-button' tabindex='1'>{" +
            "{ok}}" +
            lb +
            "/button>";
          this.dialogs.buttons.cancel =
            lb +
            "button class='cancel pure-button' tabindex='2'>{" +
            "{cancel}}" +
            lb +
            "/button>";
          break;
        case "mdl":
        case "material-design-light":
          this.dialogs.buttons.ok =
            lb +
            "button class='ok mdl-button mdl-js-button mdl-js-ripple-effect'  tabindex='1'>{" +
            "{ok}}" +
            lb +
            "/button>";
          this.dialogs.buttons.cancel =
            lb +
            "button class='cancel mdl-button mdl-js-button mdl-js-ripple-effect' tabindex='2'>{" +
            "{cancel}}" +
            lb +
            "/button>";
          this.dialogs.input =
            lb +
            "div class='mdl-textfield mdl-js-textfield'>" +
            lb +
            "input class='mdl-textfield__input'>" +
            lb +
            "label class='md-textfield__label'>" +
            lb +
            "/label>" +
            lb +
            "/div>";
          break;
        case "angular-material":
          this.dialogs.buttons.ok =
            lb +
            "button class='ok md-primary md-button' tabindex='1'>{" +
            "{ok}}" +
            lb +
            "/button>";
          this.dialogs.buttons.cancel =
            lb +
            "button class='cancel md-button' tabindex='2'>{" +
            "{cancel}}" +
            lb +
            "/button>";
          this.dialogs.input =
            lb +
            "div layout='column'>" +
            lb +
            "md-input-container md-no-float>" +
            lb +
            "input type='text'>" +
            lb +
            "/md-input-container>" +
            lb +
            "/div>";
          break;
        case "default":
        default:
          this.dialogs.buttons.ok = this.defaultDialogs.buttons.ok;
          this.dialogs.buttons.cancel = this.defaultDialogs.buttons.cancel;
          this.dialogs.input = this.defaultDialogs.input;
          break;
      }
    },
    reset: function () {
      this.parent = document.body;
      this.theme("default");
      this.okBtn(this.defaultOkLabel);
      this.cancelBtn(this.defaultCancelLabel);
      /*this.setMaxLogItems();*/ this.promptValue = "";
      this.promptPlaceholder = "";
      this.delay = this.defaultDelay; /*this.setCloseLogOnClick(this.closeLogOnClickDefault);			this.setLogPosition("bottom left");			this.logTemplateMethod = null;*/
    },
    injectCSS: function () {
      if (!document.querySelector("#alertifyCSS")) {
        let head = document.getElementsByTagName("head")[0];
        let css = document.createElement("style");
        css.type = "text/css";
        css.id = "alertifyCSS";
        css.innerHTML =
          ".alertify-logs > * {  padding: 12px 24px;  color: #fff;  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);  border-radius: 1px; }  .alertify-logs > *, .alertify-logs > *.default {    background: rgba(0, 0, 0, 0.8); }  .alertify-logs > *.error {    background: rgba(244, 67, 54, 0.8); }  .alertify-logs > *.success {    background: rgba(76, 175, 80, 0.9); } .alertify2 {position: fixed;  background-color: rgba(0, 0, 0, 0.3);  left: 0;  right: 0;  top: 0;  bottom: 0;  width: 100%;  height: 100%;  z-index: 99998;  box-sizing: border-box;  transition: all 0.33s cubic-bezier(0.25, 0.8, 0.25, 1);} .alertify {  position: fixed;  background-color: rgba(0, 0, 0, 0);  left: 0;  right: 0;  top: 0;  bottom: 0;  width: 100%;  height: 100%;  z-index: 99999; }  .alertify.hide {    opacity: 0;    pointer-events: none; }  .alertify, .alertify.show {    box-sizing: border-box;    transition: all 0.33s cubic-bezier(0.25, 0.8, 0.25, 1); }  .alertify, .alertify * {    box-sizing: border-box; }  .alertify .dialog {    padding: 12px; }  .alertify .dialog, .alertify .alert {    width: 100%;	transform: translateY(-50%);    margin: 0 auto;    position: relative;    top: 50%;    transform: translateY(-50%); }    .alertify .dialog > *, .alertify .alert > * {      width: 400px;      max-width: 95%;      margin: 0 auto;      text-align: center;      padding: 12px;      background: #fff;      box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.14), 0 4px 5px 0 rgba(0, 0, 0, 0.098), 0 1px 10px 0 rgba(0, 0, 0, 0.084); }    .alertify .dialog .msg, .alertify .alert .msg {      padding: 12px;      margin-bottom: 12px;      margin: 0;      text-align: left; }    .alertify .dialog input:not(.form-control), .alertify .alert input:not(.form-control) {      margin-bottom: 15px;      width: 100%;      font-size: 100%;      padding: 12px; }      .alertify .dialog input:not(.form-control):focus, .alertify .alert input:not(.form-control):focus {        outline-offset: -2px; }    .alertify .dialog nav, .alertify .alert nav {      text-align: right; }      .alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button), .alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button) {        background: transparent;        box-sizing: border-box;        color: rgba(0, 0, 0, 0.87);        position: relative;        outline: 0;        border: 0;        display: inline-block;        -ms-flex-align: center;            -ms-grid-row-align: center;            align-items: center;        padding: 0 6px;        margin: 6px 8px;        line-height: 36px;        min-height: 36px;        white-space: nowrap;        min-width: 88px;        text-align: center;      font-size: 14px;        text-decoration: none;        cursor: pointer;        border: 1px solid transparent;        border-radius: 2px; }        .alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):hover, .alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):active, .alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):hover, .alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):active {          background-color: rgba(0, 0, 0, 0.05); }        .alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):focus, .alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):focus {          border: 1px solid rgba(0, 0, 0, 0.1); }      .alertify .dialog nav button.btn, .alertify .alert nav button.btn {        margin: 6px 4px; }.alertify-logs {  position: fixed;  z-index: 99999; }  .alertify-logs.bottom, .alertify-logs:not(.top) {    bottom: 16px; }  .alertify-logs.left, .alertify-logs:not(.right) {    left: 16px; }    .alertify-logs.left > *, .alertify-logs:not(.right) > * {      float: left;      transform: translate3d(0, 0, 0);      height: auto; }      .alertify-logs.left > *.show, .alertify-logs:not(.right) > *.show {        left: 0; }      .alertify-logs.left > *, .alertify-logs.left > *.hide, .alertify-logs:not(.right) > *, .alertify-logs:not(.right) > *.hide {        left: -110%; }  .alertify-logs.right {    right: 16px; }    .alertify-logs.right > * {      float: right;      transform: translate3d(0, 0, 0); }      .alertify-logs.right > *.show {        right: 0;        opacity: 1; }      .alertify-logs.right > *, .alertify-logs.right > *.hide {        right: -110%;        opacity: 0; }  .alertify-logs.top {    top: 0; }  .alertify-logs > * {    box-sizing: border-box;    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);    position: relative;    clear: both;    backface-visibility: hidden;    perspective: 1000; }    .alertify-logs > * {      max-height: 0;      margin: 0;      padding: 0;      overflow: hidden;      opacity: 0;      pointer-events: none; }    .alertify-logs > *.show {      margin-top: 12px;      opacity: 1;      max-height: 1000px;      padding: 12px;      pointer-events: auto; }";
        head.insertBefore(css, head.firstChild);
      }
    },
    removeCSS: function () {
      let css = document.querySelector("#alertifyCSS");
      if (css && css.parentNode) {
        css.parentNode.removeChild(css);
      }
    }
  };
  _alertify.injectCSS();
  return {
    _$$alertify: _alertify,
    parent: function (elem) {
      _alertify.parent = elem;
    },
    reset: function () {
      _alertify.reset();
      return this;
    },
    alert: function (message, onOkay, onCancel) {
      return _alertify.dialog(message, "alert", onOkay, onCancel) || this;
    },
    confirm: function (message, onOkay, onCancel) {
      return _alertify.dialog(message, "confirm", onOkay, onCancel) || this;
    },
    prompt: function (message, onOkay, onCancel) {
      return _alertify.dialog(message, "prompt", onOkay, onCancel) || this;
    },
    promptButton: function (message, illegal, onCancel) {
      return (
        _alertify.dialog(message, "promptButton", illegal, onCancel) || this
      );
    },
    log: function (message, click) {
      _alertify.log(message, "default", click);
      return this;
    },
    theme: function (themeStr) {
      _alertify.theme(themeStr);
      return this;
    },
    success: function (message, click) {
      _alertify.log(message, "success", click);
      return this;
    },
    error: function (message, click) {
      _alertify.log(message, "error", click);
      return this;
    },
    cancelBtn: function (label) {
      _alertify.cancelBtn(label);
      return this;
    },
    okBtn: function (label) {
      _alertify.okBtn(label);
      return this;
    },
    delay: function (time) {
      _alertify.setDelay(time);
      return this;
    },
    placeholder: function (str) {
      _alertify.promptPlaceholder = str;
      return this;
    },
    defaultValue: function (str) {
      _alertify.promptValue = str;
      return this;
    },
    maxLogItems: function (num) {
      _alertify.setMaxLogItems(num);
      return this;
    },
    closeLogOnClick: function (bool) {
      _alertify.setCloseLogOnClick(!!bool);
      return this;
    },
    logPosition: function (str) {
      _alertify.setLogPosition(str || "");
      return this;
    },
    setLogTemplate: function (templateMethod) {
      _alertify.logTemplateMethod = templateMethod;
      return this;
    },
    clearLogs: function () {
      _alertify.setupLogContainer().innerHTML = "";
      return this;
    },
    version: _alertify.version
  };
}
/* alertify: AMD, window, and NPM support */ if (
  "undefined" !== typeof module &&
  !!module &&
  !!module.exports
) {
  /* alertify: Preserve backwards compatibility */ module.exports = function () {
    return new Alertify();
  };
  let obj = new Alertify();
  for (let key in obj) {
    module.exports[key] = obj[key];
  }
} else if (typeof define === "function" && define.amd) {
  define(function () {
    return new Alertify();
  });
} else {
  window.alertify = new Alertify();
}
/**** END ALERTIFY ****/ var alertifyBackground = document.createElement("div");
alertifyBackground.className = "alertify2 hide";
document.body.appendChild(alertifyBackground);
setTimeout(function () {
  alertifyBackground.classList.remove("hide");
}, 100);
var alertQueue = [];
var queuedPrompt = [];
function alertQueueShift(arg) {
  if (arg) {
    arg.event.preventDefault();
  }
  alertQueue.shift();
  if (alertQueue.length > 0) {
    if (me >= 0 && z.players.length > me && z.promptStyle[me] === 0) {
      alert(alertQueue[0]);
      alertQueueShift();
    } else {
      alertify.cancelBtn("CANCEL").okBtn("OK");
      alertify.alert(alertQueue[0]).then(alertQueueShift);
    }
  } else if (queuedPrompt.length > 0) {
    let promptType = queuedPrompt[0];
    switch (promptType) {
      case "promptNum": {
        let promptText = queuedPrompt[1];
        let illegal = queuedPrompt[2];
        let cancel = queuedPrompt[3];
        let user = queuedPrompt[4];
        let newCancel = queuedPrompt[5];
        queuedPrompt = [];
        promptNum(promptText, illegal, cancel, user, newCancel);
        break;
      }
      case "confirm": {
        let confirmText = queuedPrompt[1];
        let cancel = queuedPrompt[2];
        let user = queuedPrompt[3];
        let newOK = queuedPrompt[4];
        let newCancel = queuedPrompt[5];
        queuedPrompt = [];
        confirmify(confirmText, cancel, user, newOK, newCancel);
        break;
      }
      case "promptString": {
        let promptText = queuedPrompt[1];
        let cancel = queuedPrompt[2];
        let user = queuedPrompt[3];
        let defaultText = queuedPrompt[4];
        queuedPrompt = [];
        promptString(promptText, cancel, user, defaultText);
        break;
      }
      case "mainMenu": {
        queuedPrompt = [];
        mainMenu();
      }
    }
  }
}
function addAlert(alertText) {
  if (me >= 0 && z.players.length > me && z.promptStyle[me] !== 0) {
    let colorRE = new RegExp(
      "\\[col" + "or=([^\\]]+)\\]([^[]*)\\[/col" + "or\\]",
      "g"
    );
    let boldRE = new RegExp("\\[b" + "\\]([^[]*)\\[/" + "b\\]", "g");
    let strikethroughRE = new RegExp("\\[-" + "\\]([^[]*)\\[/" + "-\\]", "g");
    alertText = alertText.replace(
      colorRE,
      lb + 'span style="color:$1;">$2' + lb + "/span>"
    );
    alertText = alertText.replace(boldRE, lb + "b>$1" + lb + "/b>");
    alertText = alertText.replace(
      strikethroughRE,
      lb + "strike>$1" + lb + "/strike>"
    );
  }
  alertQueue.push(alertText);
  if (alertQueue.length === 1) {
    if (me >= 0 && z.players.length > me && z.promptStyle[me] === 0) {
      alert(alertText);
      alertQueueShift();
    } else {
      alertify.cancelBtn("CANCEL").okBtn("OK");
      alertify.alert(alertText).then(alertQueueShift);
    }
  }
}
function confirmify(confirmText, cancel, user, newOK, newCancel) {
  if (queuedPrompt.length > 0) {
    alert("Error! Cannot queue multiple prompts");
  } else if (alertQueue.length > 0) {
    queuedPrompt = ["confirm", confirmText, cancel, user, newOK, newCancel];
  } else if (me >= 0 && z.players.length > me && z.promptStyle[me] === 0) {
    let ok = confirm(confirmText);
    if (ok) {
      user();
    } else {
      cancel();
    }
  } else {
    let colorRE = new RegExp(
      "\\[col" + "or=([^\\]]+)\\]([^[]*)\\[/col" + "or\\]",
      "g"
    );
    let boldRE = new RegExp("\\[b" + "\\]([^[]*)\\[/" + "b\\]", "g");
    let strikethroughRE = new RegExp("\\[-" + "\\]([^[]*)\\[/" + "-\\]", "g");
    confirmText = confirmText.replace(
      colorRE,
      lb + 'span style="color:$1;">$2' + lb + "/span>"
    );
    confirmText = confirmText.replace(boldRE, lb + "b>$1" + lb + "/b>");
    confirmText = confirmText.replace(
      strikethroughRE,
      lb + "strike>$1" + lb + "/strike>"
    );
    if (!newOK) {
      newOK = "OK";
    }
    if (!newCancel) {
      newCancel = "CANCEL";
    }
    alertify
      .okBtn(newOK)
      .cancelBtn(newCancel)
      .confirm(confirmText)
      .then(function (arg) {
        arg.event.preventDefault();
        if (arg.buttonClicked == "cancel") {
          cancel();
        } else {
          user();
        }
      });
  }
}
function tooManyOptions(illegal) {
  let legalCount = 0;
  for (let j = 0; !(j > 20); j++) {
    if (!illegal(j)) {
      legalCount++;
    }
  }
  return legalCount > 13;
}
/* TODO: var waiting, var quit */ function promptNum(
  promptText,
  illegal,
  cancel,
  user,
  newCancel
) {
  if (queuedPrompt.length > 0) {
    alert("Error! Cannot queue multiple prompts");
  } else if (alertQueue.length > 0) {
    queuedPrompt = ["promptNum", promptText, illegal, cancel, user, newCancel];
  } else if (me >= 0 && z.players.length > me && z.promptStyle[me] === 0) {
    let prompted = prompt(promptText);
    if (prompted === null) {
      cancel();
    } else {
      let n = parseInt(prompted);
      if (isNaN(n) || illegal(n)) {
        promptNum(promptText, illegal, cancel, user);
      } else {
        user(n);
      }
    }
  } else {
    let colorRE = new RegExp(
      "\\[col" + "or=([^\\]]+)\\]([^[]*)\\[/col" + "or\\]",
      "g"
    );
    let boldRE = new RegExp("\\[b" + "\\]([^[]*)\\[/" + "b\\]", "g");
    let strikethroughRE = new RegExp("\\[-" + "\\]([^[]*)\\[/" + "-\\]", "g");
    promptText = promptText.replace(
      colorRE,
      lb + 'span style="color:$1;">$2' + lb + "/span>"
    );
    promptText = promptText.replace(boldRE, lb + "b>$1" + lb + "/b>");
    promptText = promptText.replace(
      strikethroughRE,
      lb + "strike>$1" + lb + "/strike>"
    );
    if (!newCancel) {
      newCancel = "CANCEL";
    }
    alertify.cancelBtn(newCancel).okBtn("OK");
    if (
      0 > me ||
      me >= z.players.length ||
      (!mobile && z.promptStyle[me] === 1) ||
      z.promptStyle[me] === 3 ||
      tooManyOptions(illegal)
    ) {
      alertify.prompt(promptText).then((arg) => {
        arg.event.preventDefault();
        let n = parseInt(arg.inputValue);
        if (arg.buttonClicked === "cancel" || arg.inputValue === null) {
          if (newCancel !== undefined && !isNaN(n) && !illegal(n)) {
            confirmify(
              'Are you sure you want to quit?  Whatever option you had typed in the dialog box when you pressed "' +
                newCancel +
                '" will not be processed.',
              mainMenu,
              cancel,
              "Yes, Quit",
              "No, Go Back"
            );
          } else {
            cancel();
          }
        } else {
          if (isNaN(n) || illegal(n)) {
            promptNum(promptText, illegal, cancel, user, newCancel);
          } else {
            user(n);
          }
        }
      });
    } else {
      alertify.promptButton(promptText, illegal).then((arg) => {
        arg.event.preventDefault();
        if (arg.buttonClicked === "cancel") {
          cancel();
        } else {
          user(parseInt(/^choice(\d+)$/.exec(arg.buttonClicked)[1]));
        }
      });
    }
  }
}
/* empty strings now count as cancel */ function promptString(
  promptText,
  cancel,
  user,
  defaultText
) {
  if (queuedPrompt.length > 0) {
    alert("Error! Cannot queue multiple prompts");
  } else if (alertQueue.length > 0) {
    queuedPrompt = ["promptString", promptText, cancel, user, defaultText];
  } else if (me >= 0 && z.players.length > me && z.promptStyle[me] === 0) {
    let prompted = prompt(promptText);
    if (prompted === null || prompted === "") {
      cancel();
    } else {
      user(prompted);
    }
  } else {
    let colorRE = new RegExp(
      "\\[col" + "or=([^\\]]+)\\]([^[]*)\\[/col" + "or\\]",
      "g"
    );
    let boldRE = new RegExp("\\[b" + "\\]([^[]*)\\[/" + "b\\]", "g");
    let strikethroughRE = new RegExp("\\[-" + "\\]([^[]*)\\[/" + "-\\]", "g");
    promptText = promptText.replace(
      colorRE,
      lb + 'span style="color:$1;">$2' + lb + "/span>"
    );
    promptText = promptText.replace(boldRE, lb + "b>$1" + lb + "/b>");
    promptText = promptText.replace(
      strikethroughRE,
      lb + "strike>$1" + lb + "/strike>"
    );
    if (!defaultText) {
      defaultText = "";
    }
    alertify.cancelBtn("CANCEL").okBtn("OK");
    alertify
      .defaultValue(defaultText)
      .prompt(promptText)
      .then((arg) => {
        arg.event.preventDefault();
        if (
          arg.buttonClicked == "cancel" ||
          arg.inputValue === null ||
          arg.inputValue === ""
        ) {
          alertify.defaultValue("");
          cancel();
        } else {
          alertify.defaultValue("");
          user(arg.inputValue);
        }
      });
  }
}
function colorText(color, text) {
  return "[col" + "or=" + color + "]" + text + "[/col" + "or]";
}
function size(text, pt) {
  return "[siz" + "e=" + pt + "]" + text + "[/s" + "ize]";
}
function bold(text) {
  return "[b" + "]" + text + "[/" + "b]";
}
function spoiler(text) {
  return "[o" + "]" + text + "[/" + "o]";
}
function invisible(str) {
  /* F4F4FF */ return "[color=" + "#FFFFFF]" + str + "[/" + "color]";
}
function code(text) {
  return "[c" + "]" + text + "[/" + "c]";
}
function strikethrough(text) {
  return "[-" + "]" + text + "[/" + "-]";
}
function italics(text) {
  return "[i" + "]" + text + "[/" + "i]";
}
function floatleft(text) {
  return "[float" + "left]" + text + "[/float" + "left]";
}
function floatright(text) {
  return "[float" + "right]" + text + "[/float" + "right]";
}
function center(text) {
  return "[cent" + "er]" + text + "[/cent" + "er]";
}
function clear() {
  return "[cle" + "ar]";
}
/* UTODO: incoporate localization (including of colored words) in these */ function plainAlert(
  text,
  params,
  g
) {
  addAlert(text, params, g);
  /* UTODO: localization of these */ t.value += text + "\r\n";
}
function boldAlert(text, params, g) {
  addAlert(text, params, g);
  t.value += bold(text) + "\r\n";
}
function clearSpoilers() {
  let ore = new RegExp("\\[o\\][\\s\\S]*\\[/o\\]", "g");
  t.value = t.value.replace(ore, "").replace(ore, ""); /* TODO: check this */
}
function clearQuotes() {
  let qre0 = new RegExp(
    '\\[q="(?!CC)((?!(\\[q[\\]=]|\\[/q\\]))[\\s\\S])*\\[/q\\]',
    "g"
  );
  let qre1 = new RegExp(
    '\\[q="(?!CC)(((?!(\\[q[\\]=]|\\[/q\\]))[\\s\\S])*\\[q[\\]=]((?!(\\[q=|\\[/q\\]))[\\s\\S])*\\[/q\\]((?!(\\[q[\\]=]|\\[/q\\]))[\\s\\S])*)*\\[/q\\]',
    "g"
  );
  t.value = t.value
    .replace(qre0, "")
    .replace(qre1, "")
    .replace(qre0, "")
    .replace(qre1, "");
}
function versionAtLeast(ver) {
  for (let j = 0; !(j >= z.version.length) && !(j >= ver.length); j++) {
    if (ver[j] > z.version[j]) {
      return false;
    } else if (z.version[j] > ver[j]) {
      return true;
    }
  }
  if (ver.length > z.version.length) {
    return false;
  }
  return true;
}
function versionsAtLeast(ver1, ver2) {
  for (let j = 0; !(j >= ver1.length) && !(j >= ver2.length); j++) {
    if (ver2[j] > ver1[j]) {
      return false;
    } else if (ver1[j] > ver2[j]) {
      return true;
    }
  }
  if (ver2.length > ver1.length) {
    return false;
  }
  return true;
}
function showVoteTokens(done) {
  let qre = new RegExp(
    "\\[q" + '="CC: \\d+"\\]((?!(\\[q' + "=|\\[/q\\]))[\\s\\S])*\\[/q\\]",
    "g"
  );
  t.value = t.value.replace(qre, "");
  if (done) {
    voteToken(z.vote - 1, true);
  }
  for (let j = z.vote; !(j >= z.votes.length); j++) {
    voteToken(j);
  }
}
function voteToken(vote, done) {
  let text = "[q" + '="CC: ' + vote + '"]\r\n';
  if (done) {
    text = "[q" + '="CC_' + vote + '"]\r\n';
  }
  if (vote === z.vote && z.voteInProgress) {
    if (z.voteTypes[vote] === EXECUTION) {
      text += bold(
        size("Current Vote: Execution of " + z.players[z.nominees[vote]], 14)
      );
      text += "\nNominated by " + z.players[z.nominators[vote]];
    } else if (z.voteTypes[vote] === EXILE) {
      text += bold(
        size(
          "Current Vote: Exile of " +
            z.players[z.nominees[vote]] +
            ", the " +
            travellerNames[z.travellers[z.nominees[vote]]],
          14
        )
      );
      text += "\nNominated by " + z.players[z.nominators[vote]];
    } else {
      text += bold(
        size("Current Vote: Cult of " + z.players[z.nominees[vote]], 14)
      );
    }
  } else if (done) {
    if (z.voteTypes[vote] === EXECUTION) {
      text += bold(
        size("Final Tally: Execution of " + z.players[z.nominees[vote]], 14)
      );
      text += "\nNominated by " + z.players[z.nominators[vote]];
    } else if (z.voteTypes[vote] === EXILE) {
      text += bold(
        size(
          "Final Tally: Exile of " +
            z.players[z.nominees[vote]] +
            ", the " +
            travellerNames[z.travellers[z.nominees[vote]]],
          14
        )
      );
      text += "\nNominated by " + z.players[z.nominators[vote]];
    } else {
      text += bold(
        size("Final Tally: Cult of " + z.players[z.nominees[vote]], 14)
      );
    }
  } else {
    if (z.voteTypes[vote] === EXECUTION) {
      text += bold(
        size("Early Voting: Execution of " + z.players[z.nominees[vote]], 14)
      );
      text += "\nNominated by " + z.players[z.nominators[vote]];
    } else if (z.voteTypes[vote] === EXILE) {
      text += bold(
        size(
          "Early Voting: Exile of " +
            z.players[z.nominees[vote]] +
            ", the " +
            travellerNames[z.travellers[z.nominees[vote]]],
          14
        )
      );
      text += "\nNominated by " + z.players[z.nominators[vote]];
    } else {
      text += bold(
        size("Early Voting: Cult of " + z.players[z.nominees[vote]], 14)
      );
    }
  }
  text += "\n";
  for (let j = 1; !(j >= z.players.length); j++) {
    text += "\n";
    let k = z.nominees[vote] + j;
    if (k >= z.players.length) {
      k -= z.players.length - 1;
    }
    if (z.voter === k && z.vote === vote && z.voteInProgress) {
      text += bold(geekMailLink(k));
    } else {
      text += geekMailLink(k);
    }
    if (z.dead[k] && z.voteTypes[vote] === EXECUTION) {
      text += " " + skull();
    }
    text += ": ";
    if (z.voter === k && vote === z.vote && z.voteInProgress) {
      text += fire() + " ";
    }
    if (z.votes[vote][k] === YES) {
      text += "YES";
      if (
        z.voteTypes[vote] === EXECUTION &&
        z.votedToday[k] &&
        z.voteStrength[k] !== 1
      ) {
        text += " (counts as " + z.voteStrength[k] + ")";
      }
      if (
        (z.dead[k] || z.travellers[k] === BEGGAR) &&
        z.voteTypes[vote] === EXECUTION
      ) {
        if (
          vote === z.vote &&
          z.voteInProgress &&
          ((z.voter > z.nominees[vote] &&
            k > z.nominees[vote] &&
            z.voter > k) ||
            (z.nominees[vote] >= z.voter &&
              (k > z.nominees[vote] || z.voter > k)))
        ) {
          text += " (used Vote Token)";
        } else {
          text += " (using Vote Token)";
        }
      }
    } else if (z.votes[vote][k] === NO) {
      if (
        voudonPresent() &&
        z.voteTypes[vote] === EXECUTION &&
        !z.dead[k] &&
        z.travellers[k] !== VOUDON
      ) {
        text += "NO: Voudon";
      } else if (
        z.voteTypes[vote] === EXECUTION &&
        z.voteTokens[k] === 0 &&
        !voudonPresent() &&
        (z.dead[k] || z.travellers[k] === BEGGAR)
      ) {
        text += "NO: no Vote Token";
      } else {
        text += "NO";
      }
    } else if (isString(z.votes[vote][k])) {
      text += z.votes[vote][k];
    } else {
      if (
        voudonPresent() &&
        z.voteTypes[vote] === EXECUTION &&
        !z.dead[k] &&
        z.travellers[k] !== VOUDON
      ) {
        text += "NO: Voudon";
      } else if (
        z.voteTypes[vote] === EXECUTION &&
        z.voteTokens[k] === 0 &&
        !voudonPresent() &&
        (z.dead[k] || z.travellers[k] === BEGGAR)
      ) {
        text += "NO: no Vote Token";
      }
    }
  }
  text += "\n\n";
  if (!done) {
    text += "Preliminary ";
  } else {
    text += "Final ";
  }
  text += "Tally: ";
  let tally = 0;
  for (let j = 0; !(j >= z.players.length); j++) {
    if (z.votes[vote][j] === YES) {
      if (z.voteTypes[vote] === EXECUTION && z.votedToday[j]) {
        tally += z.voteStrength[j];
      } else {
        tally += 1;
      }
    }
  }
  text += tally;
  if (z.voteTypes[vote] === EXILE) {
    let threshold = z.numPlayers;
    if (threshold % 2 === 0) {
      threshold /= 2;
    } else {
      threshold++;
      threshold /= 2;
    }
    if (tally >= threshold) {
      text += " [PASS] vs. " + threshold;
    } else {
      text += " [FAIL] vs. " + threshold;
    }
  } else if (z.voteTypes[vote] === EXECUTION) {
    let thresh = voteThreshold(vote);
    let result = voteResult(vote, tally);
    if (result === PASS) {
      text += " [PASS]";
    } else if (result === TIE) {
      text += " [TIE]";
    } else {
      text += " [FAIL]";
    }
    text += " vs. " + thresh[0] + " to pass";
    if (thresh[1]) {
      text += " (" + (thresh[0] - 1) + " to tie)";
    }
  }
  text += "[/" + "q]";
  t.value += text;
}
function println(str) {
  t.value += str + "\r\n";
}
function printlnBold(str) {
  t.value += bold(str) + "\r\n";
}
/* TODO: activation symbols!*/ function postSeed() {
  let re = new RegExp(
    /(\[c\])?\[size=(1|0)\]\[color=#(F4F4FF|FFFFFF)\](New|CCT) seed: (\S+)\[\/color\]\[\/size\](\[\/c\])?/,
    "g"
  );
  let seed2 = re.exec(t.value);
  if (seed2 !== null) {
    seed2 = seed2[5];
    seed2 = window.atob(seed2.replace(/-/g, ""));
  }
  if (seed2 !== seed) {
    addAlert(
      "Possible double-post prevented; you should probably run CC again to make sure your play processed correctly."
    );
    t.value +=
      bold(
        colorText(
          "red",
          "Possible double-post prevented; you should run CC again to make sure your play processed correctly."
        )
      ) + "\r\n";
    return;
  }
  let banner = z.banners[me];
  if (secret) {
    banner = z.banners[STORYTELLER];
  }
  let bannerRegExp = new RegExp(
    "\\[ima" + "geid=" + banner + " medium\\]",
    "g"
  );
  let dumbRe = new RegExp(
    "\\[co" +
      "lor=red\\]\\[b" +
      "\\]This post did not process properly\\.  Please try again\\.\\[/" +
      "b\\]\\[/co" +
      "lor\\]",
    "g"
  );
  let clearRegExp = new RegExp("(\\[clear\\])+", "g");
  let splitted = window.btoa(JSON.stringify(z)).match(/.{1,20}/g);
  let text0 = "";
  while (splitted.length > 0) {
    text0 += splitted.shift() + "-";
  }
  t.value =
    clear() +
    code(size(invisible("CCT seed: " + text0), 1)) +
    clear() +
    t.value
      .replace(bannerRegExp, "")
      .replace(re, "")
      .replace(dumbRe, "")
      .replace(clearRegExp, clear());
  if (banner) {
    t.value = "[ima" + "geid=" + banner + " medium]" + t.value;
  }
  if (arguments.length === 0) {
    clearSpoilers();
  }
  clearQuotes();
  try {
    let evt = new Event("input", { bubbles: true, cancelable: true });
    t.dispatchEvent(evt);
  } catch (err) {}
}
function escapedGameName() {
  return z.gameName
    .replace(/%/g, "%25")
    .replace(/ /g, "%20")
    .replace(/\!/g, "%21")
    .replace(/#/g, "%23")
    .replace(/\$/g, "%24")
    .replace(/&/g, "%26")
    .replace(/'/g, "%27")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/\*/g, "%2A")
    .replace(/\+/g, "%2B")
    .replace(/,/g, "%2C")
    .replace(/[/]/g, "%2F")
    .replace(/\:/g, "%3A")
    .replace(/;/g, "%3B")
    .replace(/\=/g, "%3D")
    .replace(/\?/g, "%3F")
    .replace(/@/g, "%40")
    .replace(/\[/g, "%5B")
    .replace(/\]/g, "%5D");
}

function escapedPlayerName(j) {
	return z.usernames[j]
		.replace(/%/g, "%25")
		.replace(/ /g, "%20")
		.replace(/\!/g, "%21")
		.replace(/#/g, "%23")
		.replace(/\$/g, "%24")
		.replace(/&/g, "%26")
		.replace(/'/g, "%27")
		.replace(/\(/g, "%28")
		.replace(/\)/g, "%29")
		.replace(/\*/g, "%2A")
		.replace(/\+/g, "%2B")
		.replace(/,/g, "%2C")
		.replace(/[/]/g, "%2F")
		.replace(/\:/g, "%3A")
		.replace(/;/g, "%3B")
		.replace(/\=/g, "%3D")
		.replace(/\?/g, "%3F")
		.replace(/@/g, "%40")
		.replace(/\[/g, "%5B")
		.replace(/\]/g, "%5D");
}

function geekMailLink(j) {
  return (
    "[ur" +
    "l=" +
    "https://boardgamegeek.com/geekmail/compose?touser=" +
    escapedPlayerName(j) +
    "&subject=" +
    escapedGameName() +
    "]" +
    z.players[j] +
    "[/" +
    "url]"
  );
}
function fire() {
  return "\u{1F525}";
}
function skull() {
  return "\u{1F480}";
}
function pointRight() {
  return "\u{1F449}";
}
function pointLeft() {
  return "\u{1F448}";
}
function ticket() {
  return "\u{1F3AB}";
}
function bishop() {
  return "\u{2657}";
}
function triangle() {
  return "\u{1F53B}";
}
function swords() {
  return "\u{2694}";
}
function textGameState() {
  let report = "[q" + '="CC: Game State"]';
  if (z.day) {
    report += bold(size("Day " + z.dayCount, 14));
  } else {
    report += bold(size("Night " + z.dayCount, 14));
  }
  let playerReport = "";
  if (z.noAtheist) {
    report += "\n" + italics("Storyteller: " + geekMailLink(0));
    if (z.day && bishopPresent()) {
      report += " " + bishop();
    }
  }
  for (let j = 0; !(j >= z.players.length); j++) {
    if (j === 0) {
      if (!z.noAtheist) {
        playerReport += italics("Storyteller: " + geekMailLink(j)) + "\n\n";
      }
    } else {
      if (j !== 1) {
        playerReport += "\n";
      }
      playerReport += geekMailLink(j);
      if (z.travellers[j]) {
        playerReport += " (" + travellerNames[z.travellers[j]] + ")";
      }
    }
  }
  let miscReport = "";
  if (!z.noAtheist) {
    miscReport += "\n\n";
  }
  for (let j = 1; !(j >= z.players.length); j++) {
    if (j !== 1) {
      miscReport += "\n";
    }
    if (z.dead[j]) {
      miscReport += skull();
    }
    if (z.voteTokens[j] > 0) {
      miscReport += ticket();
      if (z.voteTokens[j] > 1) {
        miscReport += "x" + z.voteTokens[j];
      }
    }
    if (z.markedForExecution === j) {
      miscReport += swords();
    }
  }
  let nominatorReport = "";
  for (let j = 0; !(j >= z.players.length); j++) {
    if (j === 0) {
      if (!z.noAtheist) {
        if (z.day && bishopPresent()) {
          nominatorReport += bishop();
        }
        nominatorReport += "\n\n";
      }
    } else {
      if (j !== 1) {
        nominatorReport += "\n";
      }
      for (let k = 0; !(k >= z.nominators.length); k++) {
        if (z.voteTypes[k] === EXECUTION && z.nominators[k] === j) {
          nominatorReport += pointRight();
          break;
        }
      }
    }
  }
  let nomineeReport = "";
  for (let j = 0; !(j >= z.players.length); j++) {
    if (j === 0 && z.noAtheist) {
      continue;
    }
    if (j > 1) {
      nomineeReport += "\n";
    }
    for (let k = 0; !(k >= z.nominators.length); k++) {
      if (
        (z.voteTypes[k] === EXECUTION || z.voteTypes[k] === EXILE) &&
        z.nominees[k] === j
      ) {
        nomineeReport += pointLeft();
        break;
      }
    }
    if (j === 0) {
      nomineeReport += "\n\n";
    }
  }
  report +=
    "\n" +
    floatleft(playerReport) +
    floatleft(miscReport) +
    floatleft(nominatorReport) +
    floatleft(nomineeReport);
  if (!z.cultForbidden) {
    let cultReport = "";
    if (!z.noAtheist) {
      cultReport += "\n\n";
    }
    for (let j = 1; !(j >= z.players.length); j++) {
      if (j !== 1) {
        cultReport += "\n";
      }
      for (let k = 0; !(k >= z.nominators.length); k++) {
        if (z.voteTypes[k] === CULT && z.nominators[k] === j) {
          cultReport += triangle();
          break;
        }
      }
    }
    report += floatleft(cultReport);
  }
  report += clear();
  if (z.fabled.length > 0) {
    report += bold(size("Fabled:", 12));
    for (let j = 0; !(j >= z.fabled.length); j++) {
      report += "\n" + fabledNames[z.fabled[j]];
    }
  }
  if (nominationsClosed()) {
    report += "\n" + bold("Nominations are closed.");
  } else if (z.deadline) {
    let date = new Date();
    let time = date.getTime();
    if (1000 * 90 > z.deadline - time) {
      report += "\n" + bold("Nominations will close in less than 90 seconds.");
    } else if (1000 * 60 * 90 > z.deadline - time) {
      report +=
        "\n" +
        bold(
          "Nominations will close in about " +
            ((z.deadline - time) / (1000 * 60)).toFixed() +
            " minutes."
        );
    } else {
      report +=
        "\n" +
        bold(
          "Nominations will close in about " +
            ((z.deadline - time) / (1000 * 60 * 60)).toFixed() +
            " hours."
        );
    }
  }
  report += "[/" + "q]";
  t.value += report;
}
function imageO(id) {
  return "[ima" + "geid=" + id + " original inline]";
}
function vspacer() {
  return imageO(3772031);
}
function blankImage() {
  return imageO(6432956);
}
function gameSetup() {
  /* UTODO: localization prompt */ gameNamePrompt();
}
function gameNamePrompt() {
  promptString(
    "What would you like to name this game? This will be the default subject line for all GeekMails sent regarding this game.",
    () => {
      z.gameName = "BOTC 20X6";
      numPlayersPrompt();
    },
    (prompted) => {
      z.gameName = prompted;
      numPlayersPrompt();
    }
  );
}
function clearBackground() {
  hideElement(alertifyBackground);
}
function isMobile() {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
}
mobile = isMobile();
function numPlayersPrompt() {
  let minPlayers = 5;
  let maxPlayers = 15;
  promptNum(
    "How many players (excluding Travellers and the Storyteller)? (" +
      minPlayers +
      "-" +
      maxPlayers +
      ")",
    (a) => minPlayers > a || a > maxPlayers,
    clearBackground,
    (prompted) => {
      z.numPlayers = prompted;
      z.usernames = [myUsername];
      z.banners = ["6793121"];
      z.players = [];
      promptDisplayNames(0);
    }
  );
}
function promptDisplayNames(j) {
  if (j === 0) {
    promptString(
      "If you would like to be referred to by a different name than " +
        z.usernames[0] +
        ", enter that name below.",
      () => {
        z.players.push(myUsername);
        promptUsernames(1);
      },
      (prompted) => {
        z.players.push(prompted);
        promptUsernames(1);
      }
    );
  } else {
    promptString(
      "If " +
        z.usernames[j] +
        " would like to be referred to by a different name, enter that name below.",
      () => {
        z.players.push(z.usernames[j]);
        promptUsernames(j + 1);
      },
      (prompted) => {
        z.players.push(prompted);
        promptUsernames(j + 1);
      }
    );
  }
}
function promptUsernames(j) {
  if (j > z.numPlayers) {
    finishSetup();
  } else {
    promptString(
      "Enter the BGG username of a player (" +
        j +
        "/" +
        z.numPlayers +
        ").\nThe order you enter will be the order the players sit around the table (clockwise).",
      clearBackground,
      (prompted) => {
        z.usernames.push(prompted);
        z.banners.push(CC_BANNER);
        promptDisplayNames(j);
      }
    );
  }
}
var fabledNames = [
  "Doomsayer",
  "Toymaker",
  "Angel",
  "Buddhist",
  "Revolutionary",
  "Hell's Librarian",
  "Fiddler",
  "Fibbin",
  "Duchess",
  "Sentinel",
  "Spirit of Ivory",
  "Djinn",
  "Deus ex Fiasco",
  "Storm Catcher",
  "Bootlegger",
  "Ferryman",
  "Gardener"
];
var travellerNames = [
  "error",
  "Thief",
  "Bureaucrat",
  "Gunslinger",
  "Beggar",
  "Scapegoat",
  "Apprentice",
  "Matron",
  "Judge",
  "Voudon",
  "Bishop",
  "Barista",
  "Harlot",
  "Butcher",
  "Bone Collector",
  "Deviant",
  "Gangster",
  "Gnome",
  "Cacklejack",
];
var travellerBanners = [
  "",
  "6946219",
  "6946218",
  "6946216",
  "6946217",
  "6946214",
  "6946220",
  "6946228",
  "6946233",
  "6946232",
  "6946235",
  "6946239",
  "6946238",
  "6946236",
  "6946237",
  "6946240",
  "6946241"
];
var fabledBanners = [
  6842021,
  6842060,
  6842022,
  6946243,
  6842023,
  6946244,
  6841154,
  6842055,
  6842054,
  6840920,
  6842024,
  6840918,
  6946245,
  6840916,
  7739485,
  7739486,
  7739487
];
function finishSetup() {
  t.value =
    t.value +
    bold(
      size(
        "[thread" +
          "=2862037]" +
          "Clockwork Clocktower Setup" +
          "[" +
          "/thread]",
        14
      )
    ) +
    "\r\n\r\n";
  printlnBold(z.gameName);
  printlnBold("Game Options:");
  println(z.numPlayers + " Player game (excluding Travellers)");
  printlnBold("\nBase character types:");
  println(Math.floor((z.numPlayers - 4) / 3) * 2 + 3 + " base Townsfolk");
  if (z.numPlayers === 5 || z.numPlayers % 3 === 1) {
    println("0 base Outsiders");
  } else if (z.numPlayers === 6 || z.numPlayers % 3 === 2) {
    println("1 base Outsider");
  } else {
    println("2 base Outsiders");
  }
  if (z.numPlayers >= 13) {
    println("3 base Minions");
  } else if (z.numPlayers >= 10) {
    println("2 base Minions");
  } else {
    println("1 base Minion");
  }
  println("1 base Demon");
  printlnBold("\nStoryteller: " + geekMailLink(0));
  t.value += bold("\nPlayers");
  for (let j = 1; !(j >= z.players.length); j++) {
    t.value += "\r\n" + j + ": " + geekMailLink(j);
  }
  t.value += "\r\n\r\n";
  println(
    "If there are any starting Travellers or Fabled, the Storyteller should add them now."
  );
  println(
    "Otherwise, it is the first night of the game; the Storyteller will first GeekMail you your role, then conduct any other first night business, before beginning the first day."
  );
  println(
    "The Storyteller should quote this post to proceed.\n\nIf you run into any issues during the game, no matter how small, please GeekMail [us" +
      "er=Grafin]Grafin[/us" +
      "er]."
  );
  z.day = false;
  z.dayCount = 1;
  z.CCversion = CCversion;
  z.version = CCversion;
  z.promptStyle = [];
  for (let j = 0; !(j > z.numPlayers); j++) {
    z.promptStyle.push(1);
  }
  let splitted = window.btoa(JSON.stringify(z)).match(/.{1,20}/g);
  let text = "";
  while (splitted.length > 0) {
    text += splitted.shift() + "-";
  }
  z.travellers = [];
  z.dead = [];
  z.voteTokens = [];
  z.voteStrength = [];
  z.votedToday = [];
  for (let j = 0; !(j > z.numPlayers); j++) {
    z.travellers.push(0);
    z.dead.push(0);
    z.voteTokens.push(0);
    z.votedToday.push(false);
    z.voteStrength.push(1);
  }
  z.nominators = [];
  z.nominees = [];
  z.votes = [];
  z.COs = [];
  z.voteTypes = [];
  z.tallies = [];
  z.voteSuccessful = [];
  z.markedForExecution = -1;
  z.markedForDeath = [];
  z.markedForResurrection = [];
  z.vote = 0;
  z.voter = 0;
  z.voteInProgress = false;
  z.fabled = [];
  z.noAtheist = true;
  z.cultForbidden = true;
  saveAndQuit();
}
function saveAndQuit() {
  postSeed();
  if (t.value.slice(-4) !== "[h" + "r]") {
    t.value += "[h" + "r]";
  }
  clearBackground();
}
const CC_BANNER = "6898167";
var menuPage = "Default";
var firstPage = true;
var reGlobal = new RegExp(
  /\[size=(1|0)\]\[color=#(F4F4FF|FFFFFF)\](New|CCT) seed: \S+\[\/color\]\[\/size\]/,
  "g"
);
if (t === undefined) {
  window.localStorage.setItem("ccUrgent", "out of context");
  alert("CC only works while creating or editing a post on the BGG forums.");
  clearBackground();
} else {
  let foundOne = false;
  let foundTwo = false;
  var seed = null;
  for (let j = ts.length - 1; j >= 0; j--) {
    let seedRE = reGlobal.exec(ts[j].value);
    if (seedRE !== null) {
      if (foundOne) {
        foundTwo = true;
        break;
      } else {
        seed = seedRE[0].slice(33, -15);
        t = ts[j];
        foundOne = true;
      }
    }
  }
  if (foundTwo) {
    addAlert(
      "You are quoting multiple CC posts on this page; close all but one, or use the Legacy Editor, to continue."
    );
    seed = null;
    clearBackground();
  } else if (seed === null) {
    window.localStorage.setItem("ccUrgent", "blank post");
    confirmify(
      "Would you like to start a new game?",
      clearBackground,
      gameSetup,
      "YES",
      "NO"
    );
    seed = null;
  }
  if (seed !== null) {
    seed = window.atob(seed.replace(/-/g, ""));
    z = JSON.parse(seed);
    if (!versionsAtLeast(CCversion, z.CCversion)) {
      addAlert(
        "You are using an out-of-date version of CC!  Run CC again to apply the update."
      );
      window.localStorage.setItem("ccUrgent", "outdated");
      clearBackground();
    } else {
      if (!versionsAtLeast(z.CCversion, CCversion)) {
        z.CCversion = CCversion;
      }
      if (z.gameName === undefined) {
        z.gameName = "BotC 20X6";
      }
      if (z.banners === undefined) {
        z.banners = ["6793121"];
        for (let j = 1; !(j >= z.players.length); j++) {
          z.banners.push(CC_BANNER);
        }
      }
      for (let j = 0; !(j >= z.players.length); j++) {
        if (z.usernames[j].toLowerCase() === myUsername.toLowerCase()) {
          me = j;
          break;
        }
      }
      if (z.allNo === undefined) {
        z.allNo = [];
        for (let j = 0; !(j >= z.players.length); j++) {
          z.allNo.push(false);
        }
      }
      if (me === -1) {
        addAlert("You are not recognized as a player in this game!");
        clearBackground();
      } else {
        t.value += colorText(
          "red",
          bold("This post did not process properly.  Please try again.")
        );
        mainMenu();
      }
    }
  }
}
function travellerPresent(which) {
  for (let j = 0; !(j >= z.travellers.length); j++) {
    if (z.travellers[j] === which && (!z.dead[j] || z.boneCollector === j)) {
      return true;
    }
  }
  return false;
}
function fabledPresent(which) {
  for (let j = 0; !(j >= z.fabled.length); j++) {
    if (z.travellers[j] === which) {
      return true;
    }
  }
  return false;
}
function voudonPresent() {
  return travellerPresent(VOUDON) && !z.voudonDrunk;
}
function bishopPresent() {
  return travellerPresent(BISHOP) && !z.bishopDrunk;
}
function getTraveller(which) {
  for (let j = 0; !(j >= z.travellers.length); j++) {
    if (z.travellers[j] === which && !z.dead[j]) {
      return j;
    }
  }
  return -1;
}
function travellerInGame(which) {
  for (let j = 0; !(j >= z.travellers.length); j++) {
    if (z.travellers[j] === which) {
      return true;
    }
  }
  return false;
}
function numTravellers() {
  let count = 0;
  for (let j = 0; !(j >= z.travellers.length); j++) {
    if (z.travellers[j]) {
      count++;
    }
  }
  return count;
}
function numAliveTravellers() {
  let count = 0;
  for (let j = 0; !(j >= z.travellers.length); j++) {
    if (z.travellers[j] && !z.dead[j]) {
      count++;
    }
  }
  return count;
}
function numDead() {
  let count = 0;
  for (let j = 0; !(j >= z.dead.length); j++) {
    if (z.dead[j]) {
      count++;
    }
  }
  return count;
}
function numAlive() {
  let count = 0;
  for (let j = 1; !(j >= z.dead.length); j++) {
    if (!z.dead[j]) {
      count++;
    }
  }
  return count;
}
function canCult(player) {
  if (player === undefined) {
    player = me;
  }
  if (z.cultForbidden || z.travellers[player] || z.dead[player]) {
    return false;
  }
  for (let j = 0; !(j >= z.nominators.length); j++) {
    if (player === z.nominators[j] && z.voteTypes[j] === CULT) {
      return false;
    }
  }
  return true;
}
function canExile() {
  let count = numAliveTravellers();
  for (let j = 0; !(j >= z.nominees.length); j++) {
    if (z.travellers[z.nominees[j]] && !z.dead[z.nominees[j]]) {
      count--;
    }
  }
  return count > 0;
}
/* TODO:Barista interactions:Bone Collector: can do it twice (or once more if they've already used it)Bone Collector interactions:(a lot) */ function canNominate(
  player
) {
  if (player === undefined) {
    player = me;
  }
  if (z.riot) {
    return true;
  }
  if (nominationsClosed()) {
    return false;
  }
  if (z.butcher) {
    return z.travellers[player] === BUTCHER;
  }
  if (bishopPresent() && player !== STORYTELLER) {
    return false;
  }
  if (z.dead[player]) {
    return false;
  }
  for (let j = 0; !(j >= z.nominators.length); j++) {
    if (z.nominators[j] === player && z.voteTypes[j] === EXECUTION) {
      return false;
    }
  }
  return true;
}
var a2 = "ENDCCA  [/size][/c] " + 
" [c][size=1] STARTCCB";
function getVoterNumber(player) {
  if (player === undefined) {
    player = me;
  }
  if (!z.voteInProgress) {
    return -1;
  }
  /* RULES: atheist vote start */ if (z.nominees[z.vote] === STORYTELLER) {
    if (player >= z.nominators[z.vote]) {
      return player - z.nominators[z.vote];
    } else {
      return player - z.nominators[z.vote] + z.players.length;
    }
  } else if (player > z.nominees[z.vote]) {
    return player - (z.nominees[z.vote] + 1);
  } else {
    return player - (z.nominees[z.vote] + 1) + z.players.length - 1;
  }
}
function isMarkedForDeath(player) {
  if (player === undefined) {
    player = me;
  }
  for (let j = 0; !(j >= z.markedForDeath.length); j++) {
    if (z.markedForDeath[j] === player) {
      return true;
    }
  }
  return false;
}
function resurrect(player) {
  z.dead[player] = 0;
  z.voteTokens[player] = 0;
  boldAlert(z.players[player] + " returns to life!");
}
function kill(player) {
  if (player === undefined) {
    player = me;
  }
  z.dead[player] = 1;
  z.voteTokens[player] = 1;
  boldAlert(z.players[player] + " dies!");
  /* TODO: BARISTA */ if (z.travellers[player] === BONE_COLLECTOR) {
    delete z.boneCollector;
  }
  if (z.travellers[player] === VOUDON) {
    delete z.voudonDrunk;
  }
  if (z.travellers[player] === BISHOP) {
    delete z.bishopDrunk;
  }
  if (z.travellers[player] === THIEF) {
    for (let j = 0; !(j >= z.voteStrength.length); j++) {
      if (0 > z.voteStrength[j]) {
        z.voteStrength[j] *= -1;
      }
    }
  } else if (z.travellers[player] === BUREAUCRAT) {
    for (let j = 0; !(j >= z.voteStrength.length); j++) {
      if (z.voteStrength[j] === 3) {
        z.voteStrength[j] = 1;
      } else if (z.voteStrength[j] === -3) {
        z.voteStrength[j] = -1;
      }
    }
  }
  if (player === STORYTELLER) {
    boldAlert(
      "The game is over! The Storyteller should now announce the winning team."
    );
  }
}

function canFerryman(){
	if(!z.day || !fabledPresent(FERRYMAN) || z.ferryman){
		return false;
	}
	for(let j = 1; !(j > z.numPlayers); j++){
		if(z.dead[j] && z.voteTokens[j] === 0){
			return true;
		}
	}
	return false;
}

function canOrganGrinder(){
	for(let j = 1; !(j > z.numPlayers); j++){
		if(z.dead[j] && z.voteTokens[j] === 1){
			return true;
		}
	}
	return false;
}

function canJudgeCurrentVote() {
  let judge = getTraveller(JUDGE);
  if (judge === -1) {
    return false;
  }
  return (
    z.day &&
    z.voteInProgress &&
    !z.dead[judge] &&
    z.nominators[z.vote] !== judge &&
    z.voteTypes[z.vote] === EXECUTION
  );
}
function canJudgeLastVote() {
  let judge = getTraveller(JUDGE);
  if (judge === -1) {
    return false;
  }
  for (let j = z.vote - 1; j >= 0; j--) {
    if (z.voteTypes[j] === EXECUTION) {
      return (
        z.day &&
        !z.voteInProgress &&
        !z.dead[judge] &&
        z.nominators[j] !== judge
      );
    }
  }
  return false;
}
function isString(s) {
  return typeof s === "string" || s instanceof String;
}
function processVote() {
  if (
    (voudonPresent() &&
      z.voteTypes[z.vote] === EXECUTION &&
      !z.dead[z.voter] &&
      z.travellers[z.voter] !== VOUDON) ||
    ((!voudonPresent() || z.voteTypes[z.vote] !== EXECUTION) &&
      (z.dead[z.voter] || z.travellers[z.voter] === BEGGAR) &&
      z.voteTokens[z.voter] === 0)
  ) {
    z.votes[z.vote][z.voter] = NO;
  } else if (z.COs[z.vote][z.voter] !== NO_CO) {
    if (z.COs[z.vote][z.voter] !== z.votes[z.vote][z.voter]) {
      plainAlert(z.players[z.voter] + " left a private CO for their vote.");
      z.votes[z.vote][z.voter] = z.COs[z.vote][z.voter];
    }
    z.COs[z.vote][z.voter] = NO_CO;
  }
  if (
    z.votes[z.vote][z.voter] === UNDECIDED ||
    isString(z.votes[z.vote][z.voter])
  ) {
    showVoteTokens();
    return;
  }
  if (z.votes[z.vote][z.voter] === YES) {
    if (z.voteTypes[z.vote] === EXECUTION) {
      z.tallies[z.vote] += z.voteStrength[z.voter];
      z.votedToday[z.vote] = true;
    } else {
      z.tallies[z.vote] += 1;
    }
    if (
      z.voteTypes[z.vote] === EXECUTION &&
      ((z.dead[z.voter] && !voudonPresent()) ||
        z.travellers[z.voter] === BEGGAR)
    ) {
      z.voteTokens[z.voter] -= 1;
    }
  }
  if (z.nominees[z.vote] === STORYTELLER) {
    z.voter++;
    if (z.voter >= z.players.length) {
      z.voter = 1;
    }
    if (z.voter === z.nominators[z.vote]) {
      endVote();
      showVoteTokens(true);
    } else {
      processVote();
    }
  } else {
    if (z.voter === z.nominees[z.vote]) {
      endVote();
      showVoteTokens(true);
    } else {
      z.voter++;
      if (z.voter >= z.players.length) {
        z.voter = 1;
      }
      processVote();
    }
  }
}
function voteResult(vote, tally) {
  if (tally === undefined) {
    tally = z.tallies[vote];
  }
  for (let j = vote - 1; j >= 0; j--) {
    if (z.voteSuccessful[j] === PASS || z.voteSuccessful[j] === TIE) {
      if (
        tally > z.tallies[j] &&
        (tally * 2 >= numAlive() || (voudonPresent() && tally > 0))
      ) {
        return PASS;
      } else if (
        tally === z.tallies[j] &&
        (tally * 2 >= numAlive() || (voudonPresent() && tally > 0))
      ) {
        return TIE;
      } else {
        return FAIL;
      }
    }
  }
  if (tally * 2 >= numAlive() || (voudonPresent() && tally > 0)) {
    return PASS;
  }
  return FAIL;
}
function voteThreshold(vote) {
  let tie = false;
  for (let j = 1; !(j >= 24); j++) {
    if (voteResult(vote, j) === PASS) {
      return [j, tie];
    } else if (voteResult(vote, j) === TIE) {
      tie = true;
    }
  }
  return [24, false];
}
function endVote() {
  if (z.voteTypes[z.vote] === EXECUTION) {
    let result = voteResult(z.vote);
    if (result === PASS) {
      if (z.markedForExecution === -1) {
        boldAlert(
          "The vote is successful! " +
            z.players[z.nominees[z.vote]] +
            " is now marked for execution."
        );
      } else {
        boldAlert(
          "The vote is successful! " +
            z.players[z.nominees[z.vote]] +
            " is now marked for execution, while " +
            z.players[z.markedForExecution] +
            " is safe from execution for today."
        );
      }
      z.voteSuccessful[z.vote] = PASS;
      z.markedForExecution = z.nominees[z.vote];
    } else if (result === TIE) {
      for (let j = z.vote - 1; j >= 0; j--) {
        if (z.voteSuccessful[j] === PASS) {
          z.voteSuccessful[j] = TIE;
          break;
        } else if (z.voteSuccessful[j] === TIE) {
          break;
        }
      }
      z.voteSuccessful[z.vote] = TIE;
      if (z.markedForExecution === -1) {
        boldAlert(
          "The vote is a tie! " +
            z.players[z.nominees[z.vote]] +
            " is safe from execution for today."
        );
      } else {
        boldAlert(
          "The vote is a tie! " +
            z.players[z.nominees[z.vote]] +
            " and " +
            z.players[z.markedForExecution] +
            " are safe from execution for today."
        );
      }
      z.markedForExecution = -1;
    } else if (result === FAIL) {
      boldAlert(
        "The vote fails; " +
          z.players[z.nominees[z.vote]] +
          " is safe from execution for today."
      );
      z.voteSuccessful[z.vote] = FAIL;
    }
  } else if (z.voteTypes[z.vote] === EXILE) {
    if (z.tallies[z.vote] * 2 >= z.players.length - 1) {
      if (z.travellers[z.nominees[z.vote]] !== DEVIANT) {
        boldAlert(
          "The vote is successful! " +
            z.players[z.nominees[z.vote]] +
            " is exiled."
        );
        kill(z.nominees[z.vote]);
      } else {
        boldAlert(
          "The vote is successful, but it is up to the Storyteller to decide " +
            z.players[z.nominees[z.vote]] +
            "'s fate."
        );
      }
    }
  } else {
    boldAlert(
      "The vote is over; the Storyteller will now announce the outcome."
    );
  }
  z.vote++;
  z.voteInProgress = false;
}
function planVote(vote) {
  let promptText = "How would you like to announce your voting plan for ";
  if (z.voteTypes[vote] === EXECUTION) {
    promptText +=
      "the vote to execute " + z.players[z.nominees[vote]] + "? (1-4)\n";
  } else if (z.voteTypes[vote] === EXILE) {
    promptText +=
      "the vote to exile " +
      z.players[z.nominees[vote]] +
      ", the " +
      travellerNames[z.travellers[z.nominees[vote]]] +
      "? (1-4)\n";
  } else {
    promptText +=
      "the vote to join " + z.players[z.nominees[vote]] + "'s cult? (1-4)\n";
  }
  if (z.votes[vote][me] === YES) {
    promptText += "Currently, your public plan is: vote YES";
  } else if (z.votes[vote][me] === NO) {
    promptText += "Currently, your public plan is: vote NO";
  } else if (z.votes[vote][me] === UNDECIDED) {
    promptText += "You have no public plans at present.";
  } else {
    promptText += "Currently, your public plan is: " + z.votes[vote][me] + ".";
  }
  if (z.COs[vote][me] === YES) {
    promptText += "\nYou are privately planning to vote YES.";
  } else if (z.COs[vote][me] === NO) {
    promptText += "\nYou are privately planning to vote NO.";
  } else if (z.COs[vote][me] === UNDECIDED) {
    promptText +=
      "\nYou are privately planning to ask for a pause once you are in the hot seat.";
  } else if (z.COs[vote][me] !== NO_CO) {
    promptText += "\nYou are privately planning to: " + z.COs[vote][me] + ".";
  }
  if (
    z.voteTypes[vote] === EXECUTION &&
    ((z.dead[me] && !voudonPresent()) ||
      (z.travellers[me] === BEGGAR && z.voteTokens[me] === 1))
  ) {
    promptText += "\nNote that voting YES will use your only vote token.";
  }
  promptText +=
    "\n1: vote YES\n2: vote NO\n3: undecided for now\n4: Leave a public CO";
  promptNum(
    promptText,
    (a) => 1 > a || a > 4,
    mainMenu,
    (a) => {
      if (a === 1) {
        if (z.votes[vote][me] !== YES) {
          z.votes[vote][me] = YES;
          showVoteTokens();
        }
        mainMenu();
      } else if (a === 2) {
        if (z.votes[vote][me] !== NO) {
          z.votes[vote][me] = NO;
          showVoteTokens();
        }
        mainMenu();
      } else if (a === 3) {
        if (z.votes[vote][me] !== UNDECIDED) {
          z.votes[vote][me] = UNDECIDED;
          showVoteTokens();
        }
        mainMenu();
      } else if (a === 4) {
        promptString(
          "What public CO would you like to leave?  The Storyteller will follow your wishes, if possible.",
          mainMenu,
          (a) => {
            if (z.votes[vote][me] !== a) {
              z.votes[vote][me] = a;
              showVoteTokens();
            }
            mainMenu();
          }
        );
      }
    }
  );
}
function nominationsClosed() {
  if (z.nominationsClosed) {
    return true;
  }
  if (!z.deadline) {
    return false;
  }
  let date = new Date();
  let time = date.getTime();
  return time > z.deadline;
}
function mainMenu() {
  let options = [];
  options.push("Display Game State");
  if (mobile) {
    options.push("Add text after your post (and quit)");
  }
  if (menuPage === "Default") {
    if (me === STORYTELLER) {
      if (z.day) {
        options.push("Kill a player without executing them");
      } else {
        options.push("Secretly mark a player for death");
        if (numDead() > 0) {
          options.push("Secretly mark a player for resurrection");
        }
        if (travellerPresent(THIEF) || travellerPresent(BUREAUCRAT)) {
          options.push("Secretly change how a player's vote counts");
        }
      }
      if (
        z.day &&
        z.vote > 0 &&
        z.tallies[z.vote - 1] > 0 &&
        z.voteTypes[z.vote - 1] === EXECUTION
      ) {
        options.push("[Legion] Zero out the tally from the last vote");
      }
	  if(canFerryman()){
		  options.push("[Ferryman] Have all dead players regain their vote token");
	  }
	  if(canOrganGrinder()){
		  options.push("[Organ Grinder] Remove a dead player's vote token");
	  }
	  
      if (canJudgeCurrentVote()) {
        options.push("[Judge] Make the current vote pass");
        options.push("[Judge] Make the current vote fail");
      }
      if (canJudgeLastVote()) {
        options.push("[Judge] Change the outcome of the last vote");
      }
      if (travellerPresent(VOUDON)) {
        if (z.voudonDrunk) {
          options.push("[Voudon] Make the Voudon sober and healthy");
        } else {
          options.push("[Voudon] Make the Voudon poisoned or drunk");
        }
      }
      if (travellerPresent(BISHOP)) {
        if (z.voudonDrunk) {
          options.push("[Bishop] Make the Bishop sober and healthy");
        } else {
          options.push("[Bishop] Make the Bishop poisoned or drunk");
        }
      }
      if (travellerPresent(MATRON) && z.day && !z.voteInProgress) {
        options.push("[Matron] Swap two players' seats");
      }
      if (
        travellerPresent(BUTCHER) &&
        z.day &&
        !z.voteInProgress &&
        (!z.butcher || travellerPresent(BARISTA))
      ) {
        options.push("[Butcher] Let the Butcher make an extra nomination");
      }
      if (z.day && !z.voteInProgress && z.votes.length - 1 >= z.vote) {
        options.push("Start the next vote");
      }
      options.push("Execute and kill a player");
      if (travellerPresent(DEVIANT) && z.day) {
        options.push("[Deviant] Exile the Deviant");
      }
      if (travellerPresent(BONE_COLLECTOR) && numDead() > 0) {
        options.push(
          "[Bone Collector] Give a dead player their ability back for the day"
        );
      }
      if (z.day) {
        if (nominationsClosed()) {
          options.push("Open nominations");
        } else {
          options.push("Close nominations");
          options.push("Set a deadline for nominations");
        }
      }
      if (z.day) {
        if (bishopPresent()) {
          options.push("Nominate a player for execution");
        }
        options.push("End the day");
      } else {
        options.push("Begin the next day");
      }
    } else if (z.day) {
      if (canNominate()) {
        options.push("Nominate a player for execution");
      }
      if (canExile() && !z.butcher) {
        options.push("Nominate a Traveller for exile");
      }
      if (canCult() && !z.butcher) {
        options.push("Ask players to join your cult");
      }
      if (z.voter === me && z.voteInProgress) {
        options.push("Vote YES on the current nomination");
        options.push("Vote NO on the current nomination");
      } else if (
        z.voteInProgress &&
        getVoterNumber(me) > getVoterNumber(z.voter)
      ) {
        options.push("Publicly plan your vote on the current nomination");
      }
      if (
        z.votes.length - 1 > z.vote ||
        (z.votes.length - 1 === z.vote && !z.voteInProgress)
      ) {
        options.push("Publicly plan your vote on a future nomination");
      }
      if (
        z.voteTokens[me] === 1 &&
        !voudonPresent() &&
        (z.dead[me] || z.travellers[me] === BEGGAR)
      ) {
        options.push("Vote NO on all executions today");
      }
      if (
        (z.voteInProgress && getVoterNumber(me) > getVoterNumber(z.voter)) ||
        z.votes.length - 1 > z.vote ||
        (z.votes.length - 1 === z.vote && !z.voteInProgress)
      ) {
        options.push("Submit a private conditional order");
      }
      if (z.dead[me] && travellerPresent(BEGGAR) && z.voteTokens[me] > 0) {
        options.push("Give your vote token to the Beggar");
      }
    }
    options.push("[Settings]");
  } else if (menuPage === "[Settings]") {
    if (me === STORYTELLER) {
      options.push("Change game options");
      if (!z.voteInProgress) {
        if (5 > numTravellers()) {
          if (21 > z.players.length) {
            options.push("Add a Traveller to the game");
          }
          options.push("Change a player into a Traveller");
        }
        if (numTravellers() !== 0) {
          options.push("Remove a Traveller from the game");
          options.push("Change a Traveller into a non-Traveller");
        }
      }
      options.push("Add a Fabled to the game");
      if (z.fabled.length > 0) {
        options.push("Remove a Fabled from the game");
      }
      options.push("Temporarily act on behalf of a player");
      options.push("Change the game name");
    }
    options.push("Change dialog display style");
    options.push("Check for CC updates");
    options.push("Change my display name");
    options.push("Change my username");
    options.push("Change my default banner");
  }
  /* TODO: shuffle various decks in case of screwup */ /*	What would you like to do, Baltar? (1-5)   	42											11: Print Hand Report (and exit).           	342: Display Game State.						243: TANK this skill check.					274: Play Destiny into skil...				26*/ let maxOptions =
    options.length;
  let minOptions = 1;
  if (options.length > 22 && firstPage) {
    maxOptions = 22;
    options.splice(21, 0, "(scroll down)", "(scroll up)");
  }
  if (!firstPage) {
    minOptions = 22;
  }
  let promptText =
    "What would you like to do, " +
    z.players[me] +
    "? (" +
    minOptions +
    "-" +
    maxOptions +
    ")\n";
  for (let i = minOptions - 1; !(i >= maxOptions); i++) {
    promptText += "\n" + (i + 1) + ": " + options[i] + ".";
  }
  let cancelLabel = "Go Back";
  if (menuPage === "Default" && firstPage) {
    cancelLabel = "Save and Quit";
  }
  promptNum(
    promptText,
    (a) => minOptions > a || a > maxOptions,
    () => {
      if (menuPage === "Default" && firstPage) {
        saveAndQuit();
      } else {
        menuPage = "Default";
        firstPage = true;
        mainMenu();
      }
    },
    (prompted) => {
      let ch = options[prompted - 1];
      if (
        menuPage === "[I still can't find what I'm looking for]" &&
        ch !== "(scroll down)"
      ) {
        t.value += size(
          "I had to dig deep into the menus to find this.  This is probably the result of a bug, which [us" +
            "er=Grafin]Grafin[/us" +
            "er] should track down.\r\n",
          8
        );
      }
      if (ch === "(scroll down)") {
        firstPage = false;
        mainMenu();
      } else {
        firstPage = true;
      }
      if (ch === "Blind Devotion (OPG)") {
        mainMenu();
      } else if (ch === "[Ferryman] Have all dead players regain their vote token"){
		confirmify("Confirming you want all dead players who have spent their vote token to regain their vote token.  You should only do this on the final day of the game.",
			mainMenu,
			() => {
				boldAlert("It is the final day! The Ferryman returns.");
				for(let j = 1; !(j > z.numPlayers); j++){
					if(z.dead[j] && z.voteTokens[j] === 0){
						z.voteTokens[j] = 1;
						boldAlert(z.players[j] + " regains their vote token.");
					}
				}
				z.ferryman = true;
				mainMenu();
			});
	  } else if (ch === "[Organ Grinder] Remove a dead player's vote token"){
		  let targets = [];
		  let promptText = "";
		  for(let j = 1; !(j>z.numPlayers); j++){
			  if((z.dead[j] || z.travellers[j] === BEGGAR) && z.voteTokens[j] > 0){
				  targets.push(j);
				  promptText += "\n"+targets.length+": "+z.players[j];
			  }
		  }
		  promptText = "Whose vote token would you like to remove? (1-"+targets.length+")"+promptText;
		  promptNum(promptText,1>a||a>targets.length,mainMenu,(a)=>{
			  if(z.voteTokens[targets[a-1]] === 1){
				  boldAlert(z.players[targets[a-1]] + " has spent their vote token");
			  } else {
				  boldAlert(z.players[targets[a-1]] + " has spent a vote token");
			  }
			  z.voteTokens[targets[a-1]]--;
			  mainMenu();
		  });
	  } else if (ch === "Vote NO on all executions today") {
        confirmify(
          "Confirming you want to publicly plan not to use your vote token today.",
          mainMenu,
          () => {
            z.allNo[me] = true;
            boldAlert(
              z.players[me] +
                " will not be using their vote token today, unless otherwise specified."
            );
            let any = false;
            if (z.votes.length > z.vote && z.voteTypes[z.vote] === EXECUTION) {
              if (
                !z.voteInProgress ||
                getVoterNumber(me) > getVoterNumber(z.voter)
              ) {
                z.votes[z.vote][me] = NO;
                any = true;
              } else if (z.voteInProgress && z.voter === me) {
                z.votes[z.vote][me] = NO;
                z.COs[z.vote][me] = NO_CO;
                processVote();
              }
            }
            for (let j = z.vote + 1; !(j >= z.votes.length); j++) {
              if (z.voteTypes[j] === EXECUTION) {
                z.votes[j][me] = NO;
                any = true;
              }
            }
            showVoteTokens();
            mainMenu();
          }
        );
      } else if (ch === "Add text after your post (and quit)") {
        promptString("Type your note below.", mainMenu, (prompted) => {
          t.value += prompted + "\r\n";
          saveAndQuit();
        });
      } else if (
        ch === "Change my default banner" ||
        ch === "Add a default banner"
      ) {
        /* TODO: default traveller banners */ let defaultBanner = z.banners[me];
        let changeBanner = function () {
          promptString(
            "What imageID would you like to use for your new banner?",
            mainMenu,
            (prompted0) => {
              let prompted = parseInt(prompted0);
              if (isNaN(prompted0) || 1 > prompted0) {
                changeBanner();
              } else {
                let bannerRegExp = new RegExp(
                  "\\[ima" + "geid=" + z.banners[me] + " medium\\]",
                  "g"
                );
                t.value = t.value.replace(bannerRegExp, "");
                z.banners[me] = prompted;
                mainMenu();
              }
            },
            "" + defaultBanner
          );
        };
        changeBanner();
      } else if (ch === "Change the game name") {
        promptString(
          "What would you like to change the game name to?  It is currently:\n" +
            z.gameName,
          mainMenu,
          (a) => {
            addAlert("The game name is now " + a);
            z.gameName = a;
            mainMenu();
          }
        );
      } else if (ch === "Open nominations") {
        confirmify(
          "Confirming you want to allow nominations.",
          mainMenu,
          () => {
            delete z.nominationsClosed;
            delete z.deadline;
            boldAlert("Nominations are open.");
            mainMenu();
          }
        );
      } else if (ch === "Close nominations") {
        confirmify(
          "Confirming you want to close nominations.",
          mainMenu,
          () => {
            z.nominationsClosed = true;
            boldAlert("Nominations are closed.");
            mainMenu();
          }
        );
      } else if (ch === "Set a deadline for nominations") {
        let date = new Date();
        let time = date.getTime();
        let promptText =
          "In how many hours would you like to close nominations?";
        if (z.deadline) {
          if (1000 * 90 > z.deadline - time) {
            promptText +=
              "\nCurrently, nominations are slated to close in the next 90 seconds.";
          } else if (1000 * 60 * 90 > z.deadline - time) {
            promptText +=
              "\nCurrently, nominations are slated to close in about " +
              ((z.deadline - time) / (1000 * 60)).toFixed() +
              " minutes.";
          } else {
            promptText +=
              "\nCurrently, nominations are slated to close in about " +
              ((z.deadline - time) / (1000 * 60 * 60)).toFixed() +
              " hours.";
          }
        }
        promptNum(
          promptText,
          (a) => 1 > a,
          mainMenu,
          (a) => {
            let deadline = time + a * 1000 * 60 * 60;
            if (a === 1) {
              boldAlert("Nominations will close in one hour.");
            } else if (z.deadline) {
              if (deadline > z.deadline) {
                boldAlert(
                  "The deadline for nominations has been extended; nominations will now close in " +
                    a +
                    " hours."
                );
              } else {
                boldAlert(
                  "The deadline for nominations has been tightened; nominations will now close in " +
                    a +
                    " hours."
                );
              }
            } else {
              boldAlert("Nominations will close in " + a + " hours.");
            }
            z.deadline = deadline;
            mainMenu();
          }
        );
      } else if (
        ch === "[Settings]" ||
        ch === "[I still can't find what I'm looking for]"
      ) {
        menuPage = ch;
        mainMenu();
      } else if (
        ch ===
        "[Bone Collector] Give a dead player their ability back for the day"
      ) {
        let promptText = "";
        let targets = [];
        for (let j = 1; !(j >= z.players.length); j++) {
          if (z.dead[j]) {
            targets.push(j);
            promptText += "\n" + targets.length + ": " + z.players[j];
          }
        }
        promptText =
          "Which player gets their ability back until dusk? (1-" +
          targets.length +
          ")\nNote that the script only needs this if the Bone Collector targeted another Traveller.";
        promptNum(
          promptText,
          (a) => 1 > a || a > targets.length,
          mainMenu,
          (a) => {
            z.boneCollector = a;
            addAlert(z.players[a] + " gets their ability back until dusk.");
            mainMenu();
          }
        );
      } else if (ch === "[Butcher] Let the Butcher make an extra nomination") {
        let confirmText =
          "Confirming you want to make a Butcher make an extra nomination; you should only do this if you have just executed someone.";
        if (z.butcher) {
          confirmText +=
            "\nThe Butcher has done this once today already; only do this a second time if their ability is working twice today due to the Barista.\nDo not do it a third time.";
        }
        confirmify(
          "Confirming you want to make a Butcher make an extra nomination; you should only do this if you have just executed someone.",
          mainMenu,
          () => {
            boldAlert("The Butcher may now make an extra nomination.");
            z.butcher = true;
            z.votes = [];
            z.nominees = [];
            z.nominators = [];
            z.COs = [];
            mainMenu();
          }
        );
      } else if (ch === "[Matron] Swap two players' seats") {
        let promptText =
          "Which player would you like to move? (1-" +
          (z.players.length - 1) +
          ")";
        for (let j = 1; !(j >= z.players.length); j++) {
          promptText += "\n" + j + ": " + z.players[j];
        }
        promptNum(
          promptText,
          (a) => 1 > a || a >= z.players.length,
          mainMenu,
          (a) => {
            let promptText =
              "Which player would you like to swap with " +
              z.players[a] +
              "? (1-" +
              (z.players.length - 1) +
              ")";
            for (let j = 1; !(j >= z.players.length); j++) {
              if (j === a) {
                promptText += "\n" + j + ": (choose a different player)";
              } else {
                promptText += "\n" + j + ": " + z.players[j];
              }
            }
            promptNum(
              promptText,
              (b) => 1 > b || b >= z.players.length || b === a,
              mainMenu,
              (b) => {
                boldAlert(
                  z.players[getTraveller[MATRON]] +
                    " swaps the seats of " +
                    z.players[a] +
                    " and " +
                    z.players[b] +
                    "."
                );
                let temp = z.players[a];
                z.players[a] = z.players[b];
                z.players[b] = temp;
                temp = z.usernames[a];
                z.usernames[a] = z.usernames[b];
                z.usernames[b] = temp;
                temp = z.voteTokens[a];
                z.voteTokens[a] = z.voteTokens[b];
                z.voteTokens[b] = temp;
                temp = z.voteStrength[a];
                z.voteStrength[a] = z.voteStrength[b];
                z.voteStrength[b] = temp;
                temp = z.votedToday[a];
                z.votedToday[a] = z.votedToday[b];
                z.votedToday[b] = temp;
                temp = z.travellers[a];
                z.travellers[a] = z.travellers[b];
                z.travellers[b] = temp;
                temp = z.dead[a];
                z.dead[a] = z.dead[b];
                z.dead[b] = temp;
                temp = z.dead[a];
                z.dead[a] = z.dead[b];
                z.dead[b] = temp;
                temp = z.allNo[a];
                z.allNo[a] = z.allNo[b];
                z.allNo[b] = temp;
                temp = z.banners[a];
                z.banners[a] = z.banners[b];
                z.banners[b] = temp;
                for (let j = 0; !(j >= z.nominators.length); j++) {
                  if (z.nominators[j] === a) {
                    z.nominators[j] = b;
                  } else if (z.nominators[j] === b) {
                    z.nominators[j] = a;
                  }
                }
                for (let j = 0; !(j >= z.nominees.length); j++) {
                  if (z.nominees[j] === a) {
                    z.nominees[j] = b;
                  } else if (z.nominees[j] === b) {
                    z.nominees[j] = a;
                  }
                }
                for (let j = 0; !(j >= z.votes.length); j++) {
                  temp = z.votes[j][a];
                  z.votes[j][a] = z.votes[j][b];
                  z.votes[j][b] = temp;
                  temp = z.COs[j][a];
                  z.COs[j][a] = z.COs[j][b];
                  z.COs[j][b] = temp;
                }
                mainMenu();
              }
            );
          }
        );
      } else if (ch === "Give your vote token to the Beggar") {
        confirmify(
          "Confirming you want to give your vote token to " +
            z.players[getTraveller(BEGGAR)] +
            ", the Beggar.\nThey will learn your alignment.",
          mainMenu,
          () => {
            boldAlert(
              z.players[me] +
                " gives their vote token to " +
                z.players[getTraveller(BEGGAR)] +
                ", the Beggar."
            );
            println(
              "The Storyteller will now tell " +
                z.players[getTraveller(BEGGAR)] +
                " " +
                z.players[me] +
                "'s alignment, in private."
            );
            z.voteTokens[me]--;
            z.voteTokens[getTraveller(BEGGAR)]++;
            mainMenu();
          }
        );
      } else if (ch === "Ask players to join your cult") {
        confirmify(
          "Confirming you want to attempt to form a cult",
          mainMenu,
          () => {
            boldAlert(z.players[me] + " asks all players to join their cult.");
            z.votes.push([]);
            z.COs.push([]);
            for (let j = 0; !(j >= z.players.length); j++) {
              z.votes[z.votes.length - 1].push(UNDECIDED);
              z.COs[z.votes.length - 1].push(NO_CO);
            }
            z.tallies.push(0);
            z.nominees.push(me);
            z.nominators.push(me);
            z.voteTypes.push(CULT);
            z.voteSuccessful.push(INCOMPLETE);
            showVoteTokens();
            mainMenu();
          }
        );
      } else if (ch === "Nominate a Traveller for exile") {
        let targets = [];
        let promptText = "";
        for (let j = 0; !(j >= z.players.length); j++) {
          if (z.travellers[j] && !z.dead[j]) {
            let alreadyNominated = false;
            for (let k = 0; !(k >= z.nominees.length); k++) {
              if (z.nominees[k] === j && z.voteTypes[k] === EXILE) {
                alreadyNominated = true;
                break;
              }
            }
            if (alreadyNominated) {
              continue;
            }
            targets.push(j);
            promptText += "\n" + targets.length + ": " + z.players[j];
          }
        }
        promptText =
          "Who would you like to nominate for exile? (1-" +
          targets.length +
          ")" +
          promptText;
        promptNum(
          promptText,
          (a) => 1 > a || a > targets.length,
          mainMenu,
          (a) => {
            boldAlert(
              z.players[me] +
                " nominates " +
                z.players[targets[a - 1]] +
                " for exile."
            );
            z.votes.push([]);
            z.COs.push([]);
            for (let j = 0; !(j >= z.players.length); j++) {
              z.votes[z.votes.length - 1].push(UNDECIDED);
              z.COs[z.votes.length - 1].push(NO_CO);
            }
            z.tallies.push(0);
            z.nominees.push(targets[a - 1]);
            z.nominators.push(me);
            z.voteTypes.push(EXILE);
            z.voteSuccessful.push(INCOMPLETE);
            showVoteTokens();
            mainMenu();
          }
        );
      } else if (ch === "Nominate a player for execution") {
        let targets = [];
        let promptText = "";
        for (let j = 0; !(j >= z.players.length); j++) {
          if (j === STORYTELLER && z.noAtheist) {
            continue;
          }
          if (z.travellers[j] && !z.dead[j]) {
            continue;
          }
          let alreadyNominated = false;
          for (let k = 0; !(k >= z.nominees.length); k++) {
            if (z.nominees[k] === j && z.voteTypes[k] === EXECUTION) {
              alreadyNominated = true;
              break;
            }
          }
          if (alreadyNominated) {
            continue;
          }
          targets.push(j);
          promptText += "\n" + targets.length + ": " + z.players[j];
        }
        promptText =
          "Who would you like to nominate for execution? (1-" +
          targets.length +
          ")" +
          promptText;
        if (me === STORYTELLER) {
          promptText +=
            "\nRemember that you must nominate at least one player of the opposite alignment of the Bishop today.";
        }
        if (z.dead[me]) {
          promptText +=
            "\nYou should only be ahle to nominate if you were just killed by the Riot effect.";
        }
        promptNum(
          promptText,
          (a) => 1 > a || a > targets.length,
          mainMenu,
          (a) => {
            confirmify(
              "Confirming you want to nominate " +
                z.players[targets[a - 1]] +
                " for execution.",
              mainMenu,
              () => {
                boldAlert(
                  z.players[me] +
                    " nominates " +
                    z.players[targets[a - 1]] +
                    " for execution."
                );
                z.votes.push([]);
                z.COs.push([]);
                for (let j = 0; !(j >= z.players.length); j++) {
                  if (z.allNo[j]) {
                    z.votes[z.votes.length - 1].push(NO);
                  } else {
                    z.votes[z.votes.length - 1].push(UNDECIDED);
                  }
                  z.COs[z.votes.length - 1].push(NO_CO);
                }
                z.tallies.push(0);
                z.nominees.push(targets[a - 1]);
                z.nominators.push(me);
                z.voteTypes.push(EXECUTION);
                z.voteSuccessful.push(INCOMPLETE);
                showVoteTokens();
                mainMenu();
              }
            );
          }
        );
      } else if (ch === "Begin the next day") {
        let confirmText =
          "Confirming that you want to begin the next day, and announce any deaths or resurrections that occurred overnight.";
        confirmify(confirmText, mainMenu, () => {
          boldAlert("A new day begins!");
          let any = false;
          z.markedForDeath.sort(function (a, b) {
            return a - b;
          });
          for (let j = 0; !(j >= z.markedForDeath.length); j++) {
            kill(z.markedForDeath[j]);
            any = true;
          }
          if (!any && z.dayCount !== 1) {
            boldAlert("There were no deaths last night!");
          }
          z.markedForResurrection.sort(function (a, b) {
            return a - b;
          });
          for (let j = 0; !(j >= z.markedForResurrection.length); j++) {
            resurrect(z.markedForResurrection[j]);
          }
          z.day = true;
          z.markedForDeath = [];
          z.markedForResurrection = [];
          textGameState();
          mainMenu();
        });
      } else if (ch === "Display Game State") {
        confirmify(
          "Confirming you want to display the game state; this is done automatically at the start and end of each day.",
          mainMenu,
          () => {
            textGameState();
            mainMenu();
          }
        );
      } else if (ch === "End the day") {
        let confirmText = "Confirming that you want to end the day.";
        if (z.markedForExecution >= 0 && !z.dead[z.markedForExecution]) {
          confirmText +=
            "\nNote that the player marked for execution is still alive.";
        }
        confirmify(confirmText, mainMenu, () => {
          boldAlert("The day is over!");
          z.nominators = [];
          z.nominees = [];
          z.votes = [];
          z.voteTypes = [];
          z.tallies = [];
          z.voteSuccessful = [];
          for (let j = 0; !(j >= z.voteStrength.length); j++) {
            z.voteStrength[j] = 1;
            z.allNo[j] = false;
          }
          z.markedForExecution = -1;
          z.vote = 0;
          z.voter = 0;
          z.voteInProgress = false;
          z.day = false;
          z.dayCount++;
          delete z.butcher;
          delete z.boneCollector;
          delete z.nominationsClosed;
          delete z.deadline;
          textGameState();
          mainMenu();
        });
      } else if (ch === "[Deviant] Exile the Deviant") {
        confirmify(
          "Confirming that you want to exile the Deviant.  You should only do this if there has been a successful vote to exile them and they have fallen short in your eyes.",
          mainMenu,
          () => {
            boldAlert(
              z.players[getTraveller(DEVIANT)] +
                ", the Deviant, is exiled and dies!"
            );
            kill(getTraveller(DEVIANT));
            mainMenu();
          }
        );
      } else if (ch === "Execute and kill a player") {
        let targets = [];
        let promptText = "";
        for (let j = 0; !(j >= z.players.length); j++) {
          if (j === STORYTELLER && z.noAtheist) {
            continue;
          }
          if (!z.dead[j]) {
            targets.push(j);
            promptText += "\n" + targets.length + ": " + z.players[j];
            if (j === STORYTELLER) {
              promptText += " (Storyteller)";
            }
            if (j === z.markedForExecution) {
              promptText += " (marked for execution)";
            }
          }
        }
        promptText =
          "Which player would you like to execute and kill? (1-" +
          targets.length +
          ")" +
          promptText;
        promptNum(
          promptText,
          (a) => 1 > a || a > targets.length,
          mainMenu,
          (a) => {
            let confirmText =
              "Are you sure you want to execute and kill " +
              z.players[targets[a - 1]] +
              "?";
            confirmText +=
              "\nIf they will not die as a result of the execution, do not proceed; simply announce the execution's failure in thread.";
            if (z.day) {
              confirmText +=
                "\nOnly execute a player if you are prepared to end the day immediately afterwards.";
              if (targets[a - 1] !== z.markedForExecution) {
                confirmText +=
                  "\nNote that this player is NOT currently marked for execution.";
              }
            } else {
              confirmText +=
                "\nNote that executions at night are rare and are almost always due to madness.";
            }
            confirmify(confirmText, mainMenu, () => {
              boldAlert(z.players[targets[a - 1]] + " is executed!");
              kill(targets[a - 1]);
              mainMenu();
            });
          }
        );
      } else if (ch === "[Voudon] Make the Voudon sober and healthy") {
        confirmify(
          "Confirming you want to end all drunkeness and poisoning of the Voudon.",
          mainMenu,
          () => {
            delete z.voudonDrunk;
            addAlert("The Voudon is now sober and healthy.");
            mainMenu();
          }
        );
      } else if (ch === "[Bishop] Make the Bishop sober and healthy") {
        confirmify(
          "Confirming you want to end all drunkeness and poisoning of the Bishop.",
          mainMenu,
          () => {
            delete z.bishopDrunk;
            addAlert("The Bishop is now sober and healthy.");
            mainMenu();
          }
        );
      } else if (ch === "[Voudon] Make the Voudon poisoned or drunk") {
        confirmify(
          "Confirming you want to make the Voudon poisoned or drunk; this will last until you turn it off.",
          mainMenu,
          () => {
            z.voudonDrunk = true;
            addAlert("The Voudon is now drunk or poisoned.");
            mainMenu();
          }
        );
      } else if (ch === "[Bishop] Make the Bishop poisoned or drunk") {
        confirmify(
          "Confirming you want to make the Bishop poisoned or drunk; this will last until you turn it off.",
          mainMenu,
          () => {
            z.bishopDrunk = true;
            addAlert("The Bishop is now drunk or poisoned.");
            mainMenu();
          }
        );
      } else if (ch === "Start the next vote") {
        let confirmText = "";
        if (z.voteTypes[z.vote] === EXECUTION) {
          confirmText =
            "Confirming you want to start the vote on " +
            z.players[z.nominees[z.vote]] +
            ".";
        } else if (z.voteTypes[z.vote] === EXILE) {
          confirmText =
            "Confirming you want to start the exile vote on " +
            z.players[z.nominees[z.vote]] +
            ".";
        } else if (z.voteTypes[z.vote] === CULT) {
          confirmText =
            "Confirming you want to start the vote on " +
            z.players[z.nominees[z.vote]] +
            "'s cult.";
        }
        confirmify(confirmText, mainMenu, () => {
          z.voteInProgress = true;
          if (z.nominees[z.vote] === STORYTELLER) {
            z.voter = z.nominators[z.vote];
          } else {
            z.voter = z.nominees[z.vote] + 1;
            if (z.voter >= z.players.length) {
              z.voter = 1;
            }
          }
          processVote();
          mainMenu();
        });
      } else if (ch === "Vote YES on the current nomination") {
        let confirmText = "";
        if (z.voteTypes[z.vote] === EXECUTION) {
          confirmText =
            "Confirming you want to vote YES on executing " +
            z.players[z.nominees[z.vote]] +
            ".";
          if (
            (z.dead[me] && !voudonPresent()) ||
            (z.travellers[me] === BEGGAR && z.voteTokens[me] === 1)
          ) {
            confirmText += "\nThis will use your only vote token.";
          }
        } else if (z.voteTypes[z.vote] === EXILE) {
          confirmText =
            "Confirming you want to vote YES on exiling " +
            z.players[z.nominees[z.vote]] +
            ", the " +
            travellerNames[z.travellers[z.nominees[z.vote]]] +
            ".";
        } else {
          confirmText =
            "Confirming you want to vote YES on joining " +
            z.players[z.nominees[z.vote]] +
            "'s cult.";
        }
        confirmText += "\nYou are currently in the hot seat.";
        confirmify(confirmText, mainMenu, () => {
          z.votes[z.vote][me] = YES;
          z.COs[z.vote][me] = NO_CO;
          processVote();
          mainMenu();
        });
      } else if (ch === "Vote NO on the current nomination") {
        let confirmText = "";
        if (z.voteTypes[z.vote] === EXECUTION) {
          confirmText =
            "Confirming you want to vote NO on executing " +
            z.players[z.nominees[z.vote]] +
            ".";
        } else if (z.voteTypes[z.vote] === EXILE) {
          confirmText =
            "Confirming you want to vote NO on exiling " +
            z.players[z.nominees[z.vote]] +
            ", the " +
            travellerNames[z.travellers[z.nominees[z.vote]]] +
            ".";
        } else {
          confirmText =
            "Confirming you want to vote NO on joining " +
            z.players[z.nominees[z.vote]] +
            "'s cult.";
        }
        confirmText += "\nYou are currently in the hot seat.";
        confirmify(confirmText, mainMenu, () => {
          z.votes[z.vote][me] = NO;
          z.COs[z.vote][me] = NO_CO;
          processVote();
          mainMenu();
        });
      } else if (ch === "Publicly plan your vote on the current nomination") {
        planVote(z.vote);
      } else if (ch === "Publicly plan your vote on a future nomination") {
        let start = z.vote;
        if (z.voteInProgress) {
          start++;
        }
        if (z.votes.length === start + 1) {
          planVote(start);
        } else {
          let promptText =
            "Which nomination would you like to publicly plan for? (1-" +
            (z.votes.length - start) +
            ")";
          for (let j = start; !(j >= z.votes.length); j++) {
            promptText += "\n" + (j - start + 1) + ": ";
            if (z.voteTypes[j] === EXECUTION) {
              promptText += "execution of " + z.players[z.nominees[j]];
            } else if (z.voteTypes[j] === EXILE) {
              promptText += "exile of " + z.players[z.nominees[j]];
            } else {
              promptText += "cult formation of " + z.players[z.nominees[j]];
            }
          }
          promptNum(
            promptText,
            (a) => 1 > a || a > z.votes.length - start,
            mainMenu,
            (a) => {
              planVote(start + a - 1);
            }
          );
        }
      } else if (ch === "Submit a private conditional order") {
        let promptText =
          "Which nomination would you like to leave a private CO for? (1-" +
          (z.votes.length - z.vote) +
          ")";
        for (let j = z.vote; !(j >= z.votes.length); j++) {
          promptText += "\n" + (j - z.vote + 1) + ": ";
          if (z.voteTypes[j] === EXECUTION) {
            promptText += "execution of " + z.players[z.nominees[j]];
          } else if (z.voteTypes[j] === EXILE) {
            promptText += "exile of " + z.players[z.nominees[j]];
          } else {
            promptText += "cult formation of " + z.players[z.nominees[j]];
          }
        }
        promptNum(
          promptText,
          (a) => 1 > a || a > z.votes.length - z.vote,
          mainMenu,
          (a) => {
            let vote = z.vote + a - 1;
            let promptText = "What private CO would you like to leave for ";
            if (z.voteTypes[vote] === EXECUTION) {
              promptText +=
                "the vote to execute " +
                z.players[z.nominees[vote]] +
                "? (1-4)\n";
            } else if (z.voteTypes[vote] === EXILE) {
              promptText +=
                "the vote to exile " +
                z.players[z.nominees[vote]] +
                ", the " +
                travellerNames[z.travellers[z.nominees[vote]]] +
                "? (1-4)\n";
            } else {
              promptText +=
                "the vote to join " +
                z.players[z.nominees[vote]] +
                "'s cult? (1-4)\n";
            }
            if (z.votes[vote][me] === YES) {
              promptText += "Currently, your public plan is: vote YES";
            } else if (z.votes[vote][me] === NO) {
              promptText += "Currently, your public plan is: vote NO";
            } else if (z.votes[vote][me] === UNDECIDED) {
              promptText += "You have no public plans at present.";
            } else {
              promptText +=
                "Currently, your public plan is: " + z.votes[vote][me] + ".";
            }
            if (z.COs[vote][me] === YES) {
              promptText += "\nYou are privately planning to vote YES.";
            } else if (z.COs[vote][me] === NO) {
              promptText += "\nYou are privately planning to vote NO.";
            } else if (z.COs[vote][me] === UNDECIDED) {
              promptText +=
                "\nYou are privately planning to ask for a pause once you are in the hot seat.";
            } else if (z.COs[vote][me] !== NO_CO) {
              promptText +=
                "\nYou are privately planning to: " + z.COs[vote][me] + ".";
            }
            if (
              z.voteTypes[vote] === EXECUTION &&
              ((z.dead[me] && !voudonPresent()) ||
                (z.travellers[me] === BEGGAR && z.voteTokens[me] === 1))
            ) {
              promptText +=
                "\nNote that voting YES will use your only vote token.";
            }
            promptText +=
              "\n1: vote YES\n2: vote NO\n3: pause for input\n4: Leave a custom note\n5: do not leave a private CO";
            promptNum(
              promptText,
              (a) => 1 > a || a > 4,
              mainMenu,
              (a) => {
                if (a === 1) {
                  z.COs[vote][me] = YES;
                  mainMenu();
                } else if (a === 2) {
                  z.COs[vote][me] = NO;
                  mainMenu();
                } else if (a === 3) {
                  z.COs[vote][me] = UNDECIDED;
                  mainMenu();
                } else if (a === 4) {
                  promptString(
                    "What private note would you like to leave?  This will be revealed to everyone once you are in the hot seat.  The Storyteller will follow your wishes, if possible.",
                    mainMenu,
                    (a) => {
                      z.COs[vote][me] = a;
                      mainMenu();
                    }
                  );
                } else if (a === 5) {
                  z.COs[vote][me] = NO_CO;
                  mainMenu();
                }
              }
            );
          }
        );
      } else if (ch === "[Legion] Zero out the tally from the last vote") {
        confirmify(
          "Confirming that this is a Legion game, only evil voted on the last vote, and that you would like to zero out the tally from the last vote.\n" +
            "Note that this will reveal to everyone that this is a Legion game.",
          mainMenu,
          () => {
            boldAlert(
              "The Legion messed up! The last vote's tally is set to 0."
            );
            z.tallies[z.vote - 1] = 0;
            if (z.voteSuccessful[z.vote - 1] === PASS) {
              for (let j = z.vote - 2; j >= 0; j--) {
                if (z.voteSuccessful[j] === PASS) {
                  z.markedForExecution = z.nominees[j];
                  boldAlert(
                    z.players[z.nominees[j]] +
                      " is once again marked for execution."
                  );
                  break;
                } else if (z.voteSuccessful[j] === TIE) {
                  break;
                }
              }
            } else if (z.voteSuccessful[z.vote - 1] === TIE) {
              let tie1 = -1;
              let tie2 = -1;
              for (let j = z.vote - 2; j >= 0; j--) {
                if (z.voteSuccessful[j] === TIE) {
                  if (tie1 >= 0) {
                    if (z.tallies[j] === z.tallies[tie1]) {
                      tie2 = j;
                    }
                    break;
                  } else {
                    tie1 = j;
                  }
                }
              }
              if (tie1 >= 0 && tie2 === -1) {
                z.voteSuccessful[tie1] = PASS;
                boldAlert(
                  z.players[tie1] + " is once again marked for execution."
                );
                z.markedForExecution = tie1;
              }
            }
            z.voteSuccessful[z.vote - 1] = FAIL;
            mainMenu();
          }
        );
      } else if (ch === "[Judge] Make the current vote pass") {
        let judge = getTraveller(JUDGE);
        confirmify(
          "Confirming you want to use the Judge's once-per-game ability to execute " +
            z.players[z.nominees[z.vote]] +
            ".",
          mainMenu,
          () => {
            boldAlert(
              "Judge " +
                z.players[judge] +
                " sentences " +
                z.players[z.nominees[z.vote]] +
                " to death.  The Storyteller should now carry out the execution and end the day."
            );
            z.voteSuccessful[z.vote] = PASS;
            z.tallies[z.vote] = 23;
            z.markedForExecution = z.nominees[z.vote];
            z.vote++;
            z.voteInProgress = false;
            mainMenu();
          }
        );
      } else if (ch === "[Judge] Make the current vote fail") {
        let judge = getTraveller(JUDGE);
        confirmify(
          "Confirming you want to use the Judge's once-per-game ability to pardon " +
            z.players[z.nominees[z.vote]] +
            ".",
          mainMenu,
          () => {
            boldAlert(
              "Judge " +
                z.players[judge] +
                " grants " +
                z.players[z.nominees[z.vote]] +
                " a reprieve...for today."
            );
            z.voteSuccessful[z.vote] = FAIL;
            z.vote++;
            z.voteInProgress = false;
            mainMenu();
          }
        );
      } else if (ch === "[Judge] Change the outcome of the last vote") {
        let judge = getTraveller(JUDGE);
        let vote = -1;
        for (let j = z.vote - 1; j >= 0; j--) {
          if (z.voteTypes[j] === EXECUTION) {
            vote = j;
            break;
          }
        }
        if (z.voteSuccessful[vote] === PASS) {
          confirmify(
            "Confirming you want to use the Judge's once-per-game ability to pardon " +
              z.players[z.nominees[vote]] +
              ".",
            mainMenu,
            () => {
              boldAlert(
                "Judge " +
                  z.players[judge] +
                  " grants " +
                  z.players[z.nominees[vote]] +
                  " a pardon."
              );
              for (let j = vote - 1; j >= 0; j--) {
                if (z.voteSuccessful[j] === PASS) {
                  z.markedForExecution = z.nominees[j];
                  boldAlert(
                    z.players[z.nominees[j]] +
                      " is once again marked for execution."
                  );
                  break;
                } else if (z.voteSuccessful[j] === TIE) {
                  z.markedForExecution = -1;
                  break;
                }
              }
              z.voteSuccessful[vote] = FAIL;
              z.tallies[vote] = 0;
              mainMenu();
            }
          );
        } else {
          confirmify(
            "Confirming you want to use the Judge's once-per-game ability to execute " +
              z.players[z.nominees[vote]] +
              ".",
            mainMenu,
            () => {
              boldAlert(
                "Judge " +
                  z.players[judge] +
                  " sentences " +
                  z.players[z.nominees[vote]] +
                  " to death. The Storyteller should now carry out the execution and end the day."
              );
              z.voteSuccessful[vote] = PASS;
              z.tallies[vote] = 23;
              z.markedForExecution = z.nominees[vote];
              mainMenu();
            }
          );
        }
      } else if (ch === "Secretly change how a player's vote counts") {
        let promptText =
          "Which player's vote strength would you like to modify?";
        for (let j = 1; !(j >= z.players.length); j++) {
          promptText +=
            "\n" +
            j +
            ": " +
            z.players[j] +
            " (now at " +
            z.voteStrength[j] +
            ")";
        }
        promptNum(
          promptText,
          (a) => 1 > a || a >= z.players.length,
          mainMenu,
          (a) => {
            promptNum(
              "How would you like their vote to count?\n1: 1\n2: -1\n3: 3\n4: -3",
              (b) => 1 > b || b > 4,
              mainMenu,
              (b) => {
                switch (b) {
                  case 1:
                  case 3:
                    z.voteStrength[a] = b;
                    break;
                  case 2:
                    z.voteStrength[a] = -1;
                    break;
                  case 4:
                    z.voteStrength[a] = -3;
                    break;
                }
                addAlert(
                  z.players[a] +
                    "'s vote will count with strength " +
                    z.voteStrength[a] +
                    " tomorrow."
                );
                mainMenu();
              }
            );
          }
        );
      } else if (ch === "Secretly mark a player for death") {
        let alive = [];
        let promptText = "";
        let any = false;
        for (let j = 1; !(j >= z.players.length); j++) {
          if (!z.dead[j]) {
            alive.push(j);
            promptText += "\n" + alive.length + ": " + z.players[j];
            if (isMarkedForDeath(j)) {
              promptText += " (marked)";
              any = true;
            }
          }
        }
        if (any) {
          promptText =
            "Which player would you like to (un)mark for death? (1-" +
            alive.length +
            ")" +
            promptText +
            "\n" +
            "Any deaths will happen at dawn.";
        } else {
          promptText =
            "Which player would you like to mark for death? (1-" +
            alive.length +
            ")" +
            promptText +
            "\n" +
            "Any deaths will happen at dawn.";
        }
        promptNum(
          promptText,
          (a) => 1 > a || a > alive.length,
          mainMenu,
          (a) => {
            let wasMarked = false;
            for (let j = 0; !(j >= z.markedForDeath.length); j++) {
              if (z.markedForDeath[j] === alive[a - 1]) {
                wasMarked = true;
                z.markedForDeath.splice(j, 1);
                break;
              }
            }
            if (!wasMarked) {
              z.markedForDeath.push(alive[a - 1]);
            }
            mainMenu();
          }
        );
      } else if (ch === "Secretly mark a player for resurrection") {
        let alive = [];
        let promptText = "";
        let any = false;
        for (let j = 1; !(j >= z.players.length); j++) {
          if (z.dead[j]) {
            alive.push(j);
            promptText += "\n" + alive.length + ": " + z.players[j];
            if (isMarkedForDeath(j)) {
              promptText += " (marked)";
              any = true;
            }
          }
        }
        if (any) {
          promptText =
            "Which player would you like to (un)mark for resurrection? (1-" +
            alive.length +
            ")" +
            promptText +
            "\n" +
            "Any resurrections will happen at dawn.";
        } else {
          promptText =
            "Which player would you like to mark for resurrection? (1-" +
            alive.length +
            ")" +
            promptText +
            "\n" +
            "Any resurrections will happen at dawn.";
        }
        promptNum(
          promptText,
          (a) => 1 > a || a > alive.length,
          mainMenu,
          (a) => {
            let wasMarked = false;
            for (let j = 0; !(j >= z.markedForResurrection.length); j++) {
              if (z.markedForResurrection[j] === alive[a - 1]) {
                wasMarked = true;
                z.markedForResurrection.splice(j, 1);
                break;
              }
            }
            if (!wasMarked) {
              z.markedForResurrection.push(alive[a - 1]);
            }
            mainMenu();
          }
        );
      } else if (ch === "Kill a player without executing them") {
        let alive = [];
        let promptText = "";
        for (let j = 1; !(j >= z.players.length); j++) {
          if (!z.dead[j]) {
            alive.push(j);
            promptText += "\n" + alive.length + ": " + z.players[j];
          }
        }
        promptText =
          "Which player would you like to kill? (1-" +
          alive.length +
          ")" +
          promptText;
        promptNum(
          promptText,
          (a) => 1 > a || a > alive.length,
          mainMenu,
          (a) => {
            let confirmText =
              "Confirming you want to kill " +
              z.players[alive[a - 1]] +
              ".  Note that this will NOT be considered an execution.";
            confirmify(confirmText, mainMenu, () => {
              kill(alive[a - 1]);
              plainAlert(
                "Note that this was not an execution; the day continues."
              );
              mainMenu();
            });
          }
        );
      } else if (ch === "Execute and kill a player") {
        let alive = [];
        let promptText = "";
        for (let j = 1; !(j >= z.players.length); j++) {
          if (!z.dead[j]) {
            alive.push(j);
            promptText += "\n" + alive.length + ": " + z.players[j];
          }
        }
        promptText =
          "Which player would you like to execute and kill? (1-" +
          alive.length +
          ")" +
          promptText;
        promptNum(
          promptText,
          (a) => 1 > a || a > alive.length,
          mainMenu,
          (a) => {
            let confirmText =
              "Confirming you want to kill " +
              z.players[alive[a - 1]] +
              ".\n" +
              "Note that they will die; if this is an execution without a death, simply announce the execution in thread, then end the day (if applicable).";
            confirmify(confirmText, mainMenu, () => {
              boldAlert(z.players[alive[a - 1]] + " is executed!");
              kill(alive[a - 1]);
              mainMenu();
            });
          }
        );
      } else if (ch === "Add a Fabled to the game") {
        let fabled = [];
        let promptText = "";
        for (let j = 0; !(j >= fabledNames.length); j++) {
          if (!fabledPresent(j)) {
            fabled.push(j);
            promptText += "\n" + fabled.length + ": " + fabledNames[j];
          }
        }
        promptText =
          "Which Fabled would you like to add to the game? (1-" +
          fabled.length +
          ")" +
          promptText;
        for (let j = 0; !(j >= z.fabled.length); j++) {
          promptText += "\n" + (j + 1) + ": " + fabledNames[z.fabled[j]];
        }
        promptNum(
          promptText,
          (a) => 1 > a || a > fabled.length,
          mainMenu,
          (a) => {
            z.fabled.push(fabled[a - 1]);
            t.value +=
              "[ima" + "geid=" + fabledBanners[fabled[a - 1]] + " medium]";
            boldAlert(
              "The " + fabledNames[fabled[a - 1]] + " is added to the game."
            );
            mainMenu();
          }
        );
      } else if (ch === "Remove a Fabled from the game") {
        promptText =
          "Which Fabled would you like to remove from the game? (1-" +
          z.fabled.length +
          ")";
        for (let j = 0; !(j >= z.fabled.length); j++) {
          promptText += "\n" + (j + 1) + ": " + fabledNames[z.fabled[j]];
        }
        promptNum(
          promptText,
          (a) => 1 > a || a > z.fabled.length,
          mainMenu,
          (a) => {
            boldAlert(
              "The " +
                fabledNames[z.fabled[a - 1]] +
                " is removed from the game."
            );
            z.fabled.splice(a - 1, 1);
            mainMenu();
          }
        );
      } else if (ch === "Change game options") {
        let options = [];
        if (z.noAtheist) {
          options.push(
            "Allow players to nominate the Storyteller for execution"
          );
        } else {
          options.push(
            "Forbid players from nominating the Storyteller for execution"
          );
        }
        if (z.cultForbidden) {
          options.push("Allow the forming of cults");
        } else {
          options.push("Forbid the forming of cults");
        }
        if (z.riot) {
          options.push("Return to normal nomination rules");
        } else {
          options.push("Allow anyone to nominate");
        }
        let promptText =
          "Choose an option to enable (1-" + options.length + ")";
        for (let j = 0; !(j >= options.length); j++) {
          promptText += "\n" + (j + 1) + ": " + options[j];
        }
        promptNum(
          promptText,
          (a) => 1 > a || a > options.length,
          mainMenu,
          (a) => {
            switch (options[a - 1]) {
              case "Allow players to nominate the Storyteller for execution":
                delete z.noAtheist;
                boldAlert(
                  "Players are allowed to nominate the Storyteller for execution."
                );
                break;
              case "Forbid players from nominating the Storyteller for execution":
                z.noAtheist = true;
                boldAlert(
                  "Players may not nominate the Storyteller for execution."
                );
                break;
              case "Allow the forming of cults":
                delete z.cultForbidden;
                boldAlert("Players are allowed to attempt to form cults.");
                break;
              case "Forbid the forming of cults":
                z.cultForbidden = true;
                boldAlert("Players may not attempt to form cults.");
                break;
              case "Allow anyone to nominate":
                z.riot = true;
                plainAlert(
                  "The script will now allow any player to nominate at any point during the day, though they should still follow the rules for a Riot game."
                );
                break;
              case "Return to normal nomination rules":
                z.riot = false;
                addAlert(
                  "The game has returned to normal nomination rules; this has not been announced in thread."
                );
                break;
            }
            mainMenu();
          }
        );
      } else if (ch === "Add a Traveller to the game") {
        promptString(
          "What is the BGG username of the traveller you are adding to the game?",
          mainMenu,
          (prompted) => {
            let promptText =
              "On which player's left (i.e. one seat clockwise) would you like " +
              prompted +
              " to sit? (1-" +
              (z.players.length - 1) +
              ")";
            for (let j = 1; !(j >= z.players.length); j++) {
              promptText += "\n" + j + ": " + z.players[j];
            }
            promptNum(
              promptText,
              (a) => 1 > a || a >= z.players.length,
              mainMenu,
              (a) => {
                let promptText = "";
                let travellers = [];
                for (let j = 1; !(j > travellerNames.length); j++) {
                  if (!travellerInGame(j)) {
                    travellers.push(j);
                    promptText +=
                      "\n" + travellers.length + ": " + travellerNames[j];
                  }
                }
                promptText =
                  "Which Traveller will " +
                  prompted +
                  " be playing? (1-" +
                  travellers.length +
                  ")" +
                  promptText;
                promptNum(
                  promptText,
                  (b) => 1 > b || b > travellers.length,
                  mainMenu,
                  (b) => {
                    boldAlert(
                      prompted +
                        " joins the game as the " +
                        travellerNames[travellers[b - 1]] +
                        "."
                    );
                    plainAlert(
                      "They are seated to the left of " + z.players[a] + "."
                    );
                    z.players.splice(a + 1, 0, prompted);
                    z.usernames.splice(a + 1, 0, prompted);
                    z.voteTokens.splice(a + 1, 0, 0);
                    z.voteStrength.splice(a + 1, 0, 1);
                    z.votedToday.splice(a + 1, 0, false);
                    z.travellers.splice(a + 1, 0, b);
                    z.dead.splice(a + 1, 0, 0);
                    z.promptStyle.splice(a + 1, 0, 1);
                    z.allNo.splice(a + 1, 0, false);
                    z.banners.splice(
                      a + 1,
                      0,
                      travellerBanners[travellers[b - 1]]
                    );
                    for (let j = 0; !(j >= z.nominators.length); j++) {
                      if (z.nominators[j] > a) {
                        z.nominators[j]++;
                      }
                    }
                    for (let j = 0; !(j >= z.nominees.length); j++) {
                      if (z.nominees[j] > a) {
                        z.nominees[j]++;
                      }
                    }
                    for (let j = 0; !(j >= z.votes.length); j++) {
                      z.votes[j].splice(a + 1, 0, 0);
                      z.COs[j].splice(a + 1, 0, NO_CO);
                    }
                    for (let j = 0; !(j >= z.markedForDeath); j++) {
                      if (z.markedForDeath[j] > a) {
                        z.markedForDeath[j]++;
                      }
                    }
                    for (let j = 0; !(j >= z.markedForResurrection); j++) {
                      if (z.markedForResurrection[j] > a) {
                        z.markedForResurrection[j]++;
                      }
                    }
                    textGameState();
                    mainMenu();
                  }
                );
              }
            );
          }
        );
      } else if (ch === "Change a Traveller into a non-Traveller") {
        let travellers = [];
        let promptText = "";
        for (let j = 0; !(j >= z.travellers.length); j++) {
          if (z.travellers[j]) {
            travellers.push(j);
            promptText += "\n" + travellers.length + ": " + z.players[j];
          }
        }
        promptText =
          "Which Traveller would you like to change into a non-Traveller? (1-" +
          travellers.length +
          ")\nYou should only do this if you really know what you're doing.\nThis will be announced to the town." +
          promptText;
        promptNum(
          promptText,
          (a) => 1 > a || a > travellers.length,
          mainMenu,
          (a) => {
            if (
              z.travellers[travellers[a - 1]] === BEGGAR &&
              !z.dead[travellers[a - 1]]
            ) {
              z.voteTokens[travellers[a - 1]] = 0;
            }
            if (
              z.banners[travellers[a - 1]] ===
              travellerBanners[z.travellers[travellers[a - 1]]]
            ) {
              z.banners[travellers[a - 1]] = CC_BANNER;
            }
            z.travellers[travellers[a - 1]] = 0;
            boldAlert(
              z.players[travellers[a - 1]] + " is no longer a Traveller!"
            );
            mainMenu();
          }
        );
      } else if (ch === "Change a player into a Traveller") {
        let travellers = [];
        let promptText = "";
        for (let j = 0; !(j >= z.travellers.length); j++) {
          travellers.push(j);
          promptText += "\n" + travellers.length + ": " + z.players[j];
        }
        promptText =
          "Which player would you like to change into a Traveller? (1-" +
          travellers.length +
          ")\nYou should only do this if you really know what you're doing.\nThis will be announced to the town." +
          promptText;
        promptNum(
          promptText,
          (a) => 1 > a || a > travellers.length,
          mainMenu,
          (a) => {
            let roles = [];
            for (let j = 1; !(j > travellerNames.length); j++) {
              if (!travellerInGame(j)) {
                roles.push(j);
                promptText += "\n" + roles.length + ": " + travellerNames[j];
              }
            }
            roles.push(0);
            promptText =
              "What is the new role " +
              z.players[travellers[a - 1]] +
              " will receive?  (1-" +
              roles.length +
              ")\nNote that this will be made public.";
            promptNum(
              promptText,
              (b) => 1 > b || b > roles.length,
              mainMenu,
              (b) => {
                z.travellers[travellers[a - 1]] = roles[b - 1];
                boldAlert(
                  z.players[travellers[a - 1]] +
                    " is now the " +
                    travellerNames[roles[b - 1]] +
                    "!"
                );
                if (z.banners[travellers[a - 1]] === CC_BANNER) {
                  z.banners[travellers[a - 1]] = travellerBanners[roles[b - 1]];
                }
                mainMenu();
              }
            );
          }
        );
      } else if (ch === "Remove a Traveller from the game") {
        let travellers = [];
        let promptText = "";
        for (let j = 0; !(j >= z.travellers.length); j++) {
          if (z.travellers[j]) {
            travellers.push(j);
            promptText += "\n" + travellers.length + ": " + z.players[j];
          }
        }
        promptText =
          "Which Traveller would you like to permanently remove from the game? (1-" +
          travellers.length +
          ")" +
          promptText;
        promptNum(
          promptText,
          (a) => 1 > a || a > travellers.length,
          mainMenu,
          (b) => {
			a = travellers[b];
            boldAlert(z.players[a] + " has left the game.");
            z.players.splice(a, 1);
            z.usernames.splice(a, 1);
            z.voteTokens.splice(a, 1);
            z.voteStrength.splice(a, 1);
            z.votedToday.splice(a, 1);
            z.travellers.splice(a, 1);
            z.dead.splice(a, 1);
            z.promptStyle.splice(a, 1);
            z.allNo.splice(a, 1);
            z.banners.splice(a, 1);
            for (let j = 0; !(j >= z.nominators.length); j++) {
              if (z.nominators[j] === a) {
                z.nominators[j] = -1;
              } else if (z.nominators[j] > a) {
                z.nominators[j]--;
              }
            }
            for (let j = 0; !(j >= z.nominees.length); j++) {
              if (z.nominees[j] === a) {
                z.nominees[j] = -1;
              } else if (z.nominees[j] > a) {
                z.nominees[j]--;
              }
            }
            for (let j = 0; !(j >= z.votes.length); j++) {
              z.votes[j].splice(a, 1);
              z.COs[j].splice(a, 1);
            }
            for (let j = 0; !(j >= z.markedForDeath); j++) {
              if (z.markedForDeath[j] === a) {
                z.markedForDeath.splice(j, 1);
                j--;
              } else if (z.markedForDeath[j] > a) {
                z.markedForDeath[j]--;
              }
            }
            for (let j = 0; !(j >= z.markedForResurrection); j++) {
              if (z.markedForResurrection[j] === a) {
                z.markedForResurrection.splice(j, 1);
                j--;
              } else if (z.markedForResurrection[j] > a) {
                z.markedForResurrection[j]--;
              }
            }
            textGameState();
            mainMenu();
          }
        );
      } else if (ch === "Temporarily act on behalf of a player") {
        let promptText =
          "On whose behalf would you like to act? (1-" +
          (z.players.length - 1) +
          ")";
        for (let j = 1; !(j >= z.players.length); j++) {
          promptText += "\n" + j + ": " + z.players[j];
        }
        promptNum(
          promptText,
          (a) => 1 > a || a >= z.players.length,
          mainMenu,
          (a) => {
            me = a;
            menuPage = "Default";
            confirmify(
              "Would you like to announce publicly that you are acting on " +
                z.players[a] +
                "'s behalf?\nYou probably want to do this unless you're leaving a private CO on their behalf.",
              () => {
                me = a;
                secret = true;
                addAlert(
                  "You are now secretly acting on behalf of " +
                    z.players[a] +
                    ".\nTo act as the Storyteller again, quit and reload CC."
                );
                mainMenu();
              },
              () => {
                boldAlert(
                  "The Storyteller is now temporarily acting on behalf of " +
                    z.players[a] +
                    "."
                );
                addAlert(
                  "To act as the Storyteller again, quit and reload CC."
                );
                mainMenu();
              }
            );
          }
        );
      } else if (ch === "Change my display name") {
        promptString(
          "The game currently refers to you as " +
            z.players[me] +
            ". What would you like to change this to?",
          mainMenu,
          (prompted) => {
            boldAlert(
              z.players[me] +
                " will henceforth be referred to as " +
                prompted +
                "."
            );
            z.players[me] = prompted;
            mainMenu();
          }
        );
      } else if (ch === "Change my username") {
        confirmify(
          "Are you sure you want to change your username? You should only do this if:\n" +
            "1) The person who set up the game misspelled your username.\n" +
            "2) You are stepping down from the game and are handing control of your character to someone else.",
          mainMenu,
          () => {
            promptString(
              "What is the new BoardGameGeek username associated with this character?",
              mainMenu,
              (prompted) => {
                plainAlert(
                  "The character formerly played by " +
                    z.players[me] +
                    " will now be played by " +
                    prompted +
                    "."
                );
                z.usernames[me] = prompted;
                z.players[me] = prompted;
                saveAndQuit();
              }
            );
          }
        );
      } else if (ch === "Change dialog display style") {
        let styles = [
          "Classic",
          "Modern",
          "Modern (Mobile)",
          "Modern (Desktop)"
        ];
        let promptText =
          "Which style of dialog boxes would you like to use? (1-" +
          styles.length +
          ")";
        for (let j = 0; !(j >= styles.length); j++) {
          promptText += "\n" + (j + 1) + ": " + styles[j];
          if (z.promptStyle[me] === j) {
            promptText += " (you're using this now)";
          }
        }
        promptNum(
          promptText,
          (a) => 1 > a || a > styles.length,
          mainMenu,
          (choice) => {
            if (choice - 1 !== z.promptStyle[me]) {
              addAlert("Styles switched; reload CC to see the new style!");
              z.promptStyle[me] = choice - 1;
              saveAndQuit();
            } else {
              addAlert("You chose not to switch styles.");
              mainMenu();
            }
          }
        );
      } else if (ch === "Check for CC updates") {
        confirmify(
          "Confirming you want to quit CC and apply any pending updates.\n\nYou probably don't want to do this unless you were instructed to do so.",
          mainMenu,
          () => {
            window.localStorage.setItem("ccUrgent", "requested");
            saveAndQuit();
          }
        );
      }
    },
    cancelLabel
  );
} /*}*/ // ENDCCB [/size][/c]
