/* STARTNMWS/*[thing=111124][/thing] PBF aid; please Geekmail me if there are any issues![size=1]*/
/*jshint -W018*/
/*let document = "";
let window = "";
let setTimeout = "";
let module = "";
let alert = "";
let alertify = "";
let confirm = "";
let prompt = "";
let define = "";
var myUsername = "";*/
var NMWSversion = [1,4,2];
var usernameRE = /href="\/collection\/user\/(.*?)">Collection/.exec(document.body.innerHTML);
if(usernameRE){
	myUsername = usernameRE[1];
}
var z = {};
var bl = "";
var t = document.getElementsByTagName("textarea")[0];
var me = -1;
var re = new RegExp("\\[size=1\\]\\[color=#F4F4FF\\](New|N-M) seed: \\S+\\[/color\\]\\[/size\\]","g");
var mobile = false;


/***** ALERTIFY ****/
var lb = String.fromCharCode(60);
"use strict";

var TRANSITION_FALLBACK_DURATION = 500;
var hideElement = function(el) {

	if (! el) {
		return;
	}

	var removeThis = function() {
		if (el && el.parentNode) {
			el.parentNode.removeChild(el);
		}
	};

	el.classList.remove("show");
	el.classList.add("hide");
	el.addEventListener("transitionend", removeThis);

	/* alertify: Fallback for no transitions. */
	setTimeout(removeThis, TRANSITION_FALLBACK_DURATION);

};

function Alertify() {

	/**
	 * Alertify private object
	 * @type {Object}
	 */
	/* _alertify is a struct, with functions... */
	var _alertify = {

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
				holder: lb+"nav>{"+"{buttons}}"+lb+"/nav>",
				ok: lb+"button class='ok' tabindex='1'>{"+"{ok}}"+lb+"/button>",
				cancel: lb+"button class='cancel' tabindex='2'>{"+"{cancel}}"+lb+"/button>",
				choice: lb+"button class='choice' id='choice{"+"{num}}'>{"+"{choice}}"+lb+"/button>"
			},
			input: lb+"input type='text'>",
			message: lb+"p class='msg'>{"+"{message}}"+lb+"/p>",
			log: lb+"div class='{"+"{class}}'>{"+"{message}}"+lb+"/div>"
		},

		defaultDialogs: {
			buttons: {
				holder: lb+"nav>{"+"{buttons}}"+lb+"/nav>",
				ok: lb+"button class='ok' tabindex='1'>{"+"{ok}}"+lb+"/button>",
				cancel: lb+"button class='cancel' tabindex='2'>{"+"{cancel}}"+lb+"/button>"
			},
			input: lb+"input type='text'>",
			message: lb+"p class='msg'>{"+"{message}}"+lb+"/p>",
			log: lb+"div class='{"+"{class}}'>{"+"{message}}"+lb+"/div>"
		},

		/**
		 * Build the proper message box
		 *
		 * @param  {Object} item    Current object in the queue
		 *
		 * @return {String}         An HTML string of the message box
		 */
		build: function(item) {
			/* promptButton uses onOkay to carry illegal with us... */

			var btnTxt = this.dialogs.buttons.ok;
			
			var html = lb+"div class='dialog'>" + lb+"div>";
			if(item.type === "promptButton" && typeof item.message === "string"){
				let illegal = item.onOkay;
				let split = item.message.split("\n");
				let foundAnyChoices = false;
				for(let j = 0; !(j>=split.length); j++){
					let re = /^([ABC]|\d+): (.*)$/.exec(split[j]);
					if(re === null){
						html += this.dialogs.message.replace("{"+"{message}}", split[j]);
					} else {
						foundAnyChoices = true;
						let n = parseInt(re[1]);
						if(isNaN(n) || !illegal(n)){
							/* valid options or a number, gets id choiceA, choiceB, choiceC, choice0, choice1, etc... */
							html += this.dialogs.buttons.holder.replace("{"+"{buttons}}",this.dialogs.buttons.choice.replace("{"+"{choice}}",re[2]).replace("{"+"{num}}",re[1]));
						} else {
							html += this.dialogs.message.replace("{"+"{message}}", split[j]);
						}
					}
				}
				if(!foundAnyChoices){
					for(let n = 0; !(n>30); n++){
						if(!illegal(n)){
							html += this.dialogs.buttons.holder.replace("{"+"{buttons}}",this.dialogs.buttons.choice.replace("{"+"{choice}}",n).replace("{"+"{num}}",n));
						}
					}		
				}
				html += this.dialogs.buttons.holder.replace("{"+"{buttons}}",this.dialogs.buttons.cancel.replace("{"+"{cancel}}", this.cancelLabel));
				html += lb+"/div>" + lb+"/div>";
				return html;
			}
			
			if(typeof item.message === "string"){
				item.message = item.message.replace(/\n/g,lb+"br>");
			}
			html += this.dialogs.message.replace("{"+"{message}}", item.message);
			
			

			if(item.type === "confirm" || item.type === "prompt") {
				btnTxt = this.dialogs.buttons.cancel + this.dialogs.buttons.ok;
			}

			if (item.type === "prompt") {
				html += this.dialogs.input;
			}

			html = (html + this.dialogs.buttons.holder + lb+"/div>" + lb+"/div>")
			  .replace("{"+"{buttons}}", btnTxt)
			  .replace("{"+"{ok}}", this.okLabel)
			  .replace("{"+"{cancel}}", this.cancelLabel);

			return html;

		},

		/* setCloseLogOnClick: function(bool) {
			this.closeLogOnClick = !! bool;
		}, */

		/**
		 * Close the log messages
		 *
		 * @param  {Object} elem    HTML Element of log message to close
		 * @param  {Number} wait    [optional] Time (in ms) to wait before automatically hiding the message, if 0 never hide
		 *
		 * @return {undefined}
		 */
		 /*
		close: function(elem, wait) {

			if (this.closeLogOnClick) {
				elem.addEventListener("click", function() {
					hideElement(elem);
				});
			}

			wait = wait && !isNaN(+wait) ? +wait : this.delay;

			if (0 > wait) {
				hideElement(elem);
			} else if(wait > 0) {
				setTimeout(function() {
					hideElement(elem);
				}, wait);
			}

		}, */

		/**
		 * Create a dialog box
		 *
		 * @param  {String}   message      The message passed from the callee
		 * @param  {String}   type         Type of dialog to create
		 * @param  {Function} onOkay       [Optional] Callback function when clicked okay.
		 * @param  {Function} onCancel     [Optional] Callback function when cancelled.
		 *
		 * @return {Object}
		 */
		dialog: function(message, type, onOkay, onCancel) {
			return this.setup({
				type: type,
				message: message,
				onOkay: onOkay,
				onCancel: onCancel
			});
		},

		/**
		 * Show a new log message box
		 *
		 * @param  {String} message    The message passed from the callee
		 * @param  {String} type       [Optional] Optional type of log message
		 * @param  {Number} wait       [Optional] Time (in ms) to wait before auto-hiding the log
		 *
		 * @return {Object}
		 */
		/* log: function(message, type, click) {

			var existing = document.querySelectorAll(".alertify-logs > div");
			if (existing) {
				var diff = existing.length - this.maxLogItems;
				if (diff >= 0) {
					for (var i = 0, _i = diff + 1; _i > i ; i++) {
						this.close(existing[ i], -1);
					}
				}
			}

			this.notify(message, type, click);
		},

		setLogPosition: function(str) {
			this.logContainerClass = "alertify-logs " + str;
		},

		setupLogContainer: function() {

			var elLog = document.querySelector(".alertify-logs");
			var className = this.logContainerClass;
			if (! elLog) {
				elLog = document.createElement("div");
				elLog.className = className;
				this.parent.appendChild(elLog);
			}

			// alertify: Make sure it's positioned properly. 
			if (elLog.className !== className) {
				elLog.className = className;
			}

			return elLog;

		},*/

		/**
		 * Add new log message
		 * If a type is passed, a class name "{type}" will get added.
		 * This allows for custom look and feel for various types of notifications.
		 *
		 * @param  {String} message    The message passed from the callee
		 * @param  {String} type       [Optional] Type of log message
		 * @param  {Number} wait       [Optional] Time (in ms) to wait before auto-hiding
		 *
		 * @return {undefined}
		 */
		/* notify: function(message, type, click) {

			var elLog = this.setupLogContainer();
			var log = document.createElement("div");

			log.className = (type || "default");
			if (_alertify.logTemplateMethod) {
				log.innerHTML = _alertify.logTemplateMethod(message);
			} else {
				log.innerHTML = message;
			}

			// alertify: Add the click handler, if specified. 
			if ("function" === typeof click) {
				log.addEventListener("click", click);
			}

			elLog.appendChild(log);
			setTimeout(function() {
				log.className += " show";
			}, 10);

			this.close(log, this.delay);

		}, */

		/**
		 * Initiate all the required pieces for the dialog box
		 *
		 * @return {undefined}
		 */
		setup: function(item) {

			var el = document.createElement("div");
			el.className = "alertify hide";
			if(item.type !== "confirm"){
				this.okLabel = "OK";
				this.cancelLabel = "CANCEL";
			}
			el.innerHTML = this.build(item);
			let illegal = item.onOkay;
			item.onOkay = null;
			


			var btnOK = el.querySelector(".ok");
			var btnCancel = el.querySelector(".cancel");
			var input = el.querySelector("input");
			var label = el.querySelector("label");
			let choiceA = el.querySelector("#choiceA");
			let choiceB = el.querySelector("#choiceB");
			let choiceC = el.querySelector("#choiceC");
			let choices = [];
			if(choiceA){
				choices.push(choiceA);
			}
			if(choiceB){
				choices.push(choiceB);
			}
			if(choiceC){
				choices.push(choiceC);
			}
			for(let j = 0; !(j>20); j++){
				let choiceN = el.querySelector("#choice"+j);
				if(choiceN){
					choices.push(choiceN);
				}
			}
			
			/*document.getElementById("body").parentNode.insertBefore(el,document.getElementById("body")); */

			/* alertify: Set default value/placeholder of input */
			if (input) {
				if (typeof this.promptPlaceholder === "string") {
					/* alertify: Set the label, if available, for MDL, etc. */
					if (label) {
						label.textContent = this.promptPlaceholder;
					} else {
						input.placeholder = this.promptPlaceholder;
					}
				}
				if (typeof this.promptValue === "string") {
					input.value = this.promptValue;
				}
			}

			/* is there any reject? gotta have cleanup... */
			function setupHandlers(resolve) {
				if ("function" !== typeof resolve) {
					/* alertify: promises are not available so resolve is a no-op */
					resolve = function () {};
				}
				
				for(let j = 0; !(j>=choices.length); j++){
					choices[j].addEventListener("click",(ev)=>{
						resolve({
							buttonClicked: choices[j].id,
							event: ev
						});
						hideElement(el);
					});
				}

				if (btnOK) {
					if(!input){
						btnOK.addEventListener("keyup",function(ev){
							if(ev.which === 27){
								if(btnCancel){
									btnCancel.click();
								} else {
									btnOK.click();
								}
							}
						});
					}
					btnOK.addEventListener("click", function(ev) {
								
						if (input) {
							resolve({
								buttonClicked: "ok",
								inputValue: input.value,
								event: ev
							});
						} else {
							resolve({
								buttonClicked: "ok",
								event: ev
							});
						}
	
						hideElement(el);
						
					});
				}

				if (btnCancel) {
					btnCancel.addEventListener("click", function(ev) {
						if (item.onCancel && "function" === typeof item.onCancel) {
							item.onCancel(ev);
						}		

						resolve({
							buttonClicked: "cancel",
							event: ev
						});
						
						hideElement(el);

					});
				}

				if (input) {
					input.addEventListener("keyup", function(ev) {
						if (ev.which === 13) {
							btnOK.click();
						} else if(ev.which === 27){
							btnCancel.click();
						}
					});
				}
			}

			var promise;

			if (typeof Promise === "function") {
				promise = new Promise(setupHandlers);
			} else {
				setupHandlers();
			}

			this.parent.appendChild(el);
			setTimeout(function() {
				el.classList.remove("hide");
				if(input && item.type && item.type === "prompt") {
					input.select();  /* I don't think this works on iOS */
					input.focus();
				} else {
					if (btnOK) {
						btnOK.focus();
					}
				}
			}, 100);

			return promise;
		},

		okBtn: function(label) {
			this.okLabel = label;
			return this;
		},

		setDelay: function(time) {
			time = time || 0;
			this.delay = isNaN(time) ? this.defaultDelay : parseInt(time, 10);
			return this;
		},

		cancelBtn: function(str) {
			this.cancelLabel = str;
			return this;
		},

		/*setMaxLogItems: function(num) {
			this.maxLogItems = parseInt(num || this.defaultMaxLogItems);
		},*/

		/* TODO: play around with this, though then we may need to be careful with calls to reset. */
		theme: function(themeStr) {
			switch(themeStr.toLowerCase()) {
			case "bootstrap":
				this.dialogs.buttons.ok = lb+"button class='ok btn btn-primary' tabindex='1'>{"+"{ok}}"+lb+"/button>";
				this.dialogs.buttons.cancel = lb+"button class='cancel btn btn-default' tabindex='2'>{"+"{cancel}}"+lb+"/button>";
				this.dialogs.input = lb+"input type='text' class='form-control'>";
				break;
			case "purecss":
				this.dialogs.buttons.ok = lb+"button class='ok pure-button' tabindex='1'>{"+"{ok}}"+lb+"/button>";
				this.dialogs.buttons.cancel = lb+"button class='cancel pure-button' tabindex='2'>{"+"{cancel}}"+lb+"/button>";
				break;
			case "mdl":
			case "material-design-light":
				this.dialogs.buttons.ok = lb+"button class='ok mdl-button mdl-js-button mdl-js-ripple-effect'  tabindex='1'>{"+"{ok}}"+lb+"/button>";
				this.dialogs.buttons.cancel = lb+"button class='cancel mdl-button mdl-js-button mdl-js-ripple-effect' tabindex='2'>{"+"{cancel}}"+lb+"/button>";
				this.dialogs.input = lb+"div class='mdl-textfield mdl-js-textfield'>"+lb+"input class='mdl-textfield__input'>"+lb+"label class='md-textfield__label'>"+lb+"/label>"+lb+"/div>";
				break;
			case "angular-material":
				this.dialogs.buttons.ok = lb+"button class='ok md-primary md-button' tabindex='1'>{"+"{ok}}"+lb+"/button>";
				this.dialogs.buttons.cancel = lb+"button class='cancel md-button' tabindex='2'>{"+"{cancel}}"+lb+"/button>";
				this.dialogs.input = lb+"div layout='column'>"+lb+"md-input-container md-no-float>"+lb+"input type='text'>"+lb+"/md-input-container>"+lb+"/div>";
				break;
			case "default":
			default:
				this.dialogs.buttons.ok = this.defaultDialogs.buttons.ok;
				this.dialogs.buttons.cancel = this.defaultDialogs.buttons.cancel;
				this.dialogs.input = this.defaultDialogs.input;
				break;
			}
		},

		reset: function() {
			this.parent = document.body; 
			this.theme("default");
			this.okBtn(this.defaultOkLabel);
			this.cancelBtn(this.defaultCancelLabel);
			/*this.setMaxLogItems();*/
			this.promptValue = "";
			this.promptPlaceholder = "";
			this.delay = this.defaultDelay;
			/*this.setCloseLogOnClick(this.closeLogOnClickDefault);
			this.setLogPosition("bottom left");
			this.logTemplateMethod = null;*/
		},

		injectCSS: function() {
			if (!document.querySelector("#alertifyCSS")) {
				var head = document.getElementsByTagName("head")[0];
				var css = document.createElement("style");
				css.type = "text/css";
				css.id = "alertifyCSS";
				css.innerHTML = ".alertify-logs > * {  padding: 12px 24px;  color: #fff;  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);  border-radius: 1px; }  .alertify-logs > *, .alertify-logs > *.default {    background: rgba(0, 0, 0, 0.8); }  .alertify-logs > *.error {    background: rgba(244, 67, 54, 0.8); }  .alertify-logs > *.success {    background: rgba(76, 175, 80, 0.9); } .alertify2 {position: fixed;  background-color: rgba(0, 0, 0, 0.3);  left: 0;  right: 0;  top: 0;  bottom: 0;  width: 100%;  height: 100%;  z-index: 99998;  box-sizing: border-box;  transition: all 0.33s cubic-bezier(0.25, 0.8, 0.25, 1);} .alertify {  position: fixed;  background-color: rgba(0, 0, 0, 0);  left: 0;  right: 0;  top: 0;  bottom: 0;  width: 100%;  height: 100%;  z-index: 99999; }  .alertify.hide {    opacity: 0;    pointer-events: none; }  .alertify, .alertify.show {    box-sizing: border-box;    transition: all 0.33s cubic-bezier(0.25, 0.8, 0.25, 1); }  .alertify, .alertify * {    box-sizing: border-box; }  .alertify .dialog {    padding: 12px; }  .alertify .dialog, .alertify .alert {    width: 100%;	transform: translateY(-50%);    margin: 0 auto;    position: relative;    top: 50%;    transform: translateY(-50%); }    .alertify .dialog > *, .alertify .alert > * {      width: 400px;      max-width: 95%;      margin: 0 auto;      text-align: center;      padding: 12px;      background: #fff;      box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.14), 0 4px 5px 0 rgba(0, 0, 0, 0.098), 0 1px 10px 0 rgba(0, 0, 0, 0.084); }    .alertify .dialog .msg, .alertify .alert .msg {      padding: 12px;      margin-bottom: 12px;      margin: 0;      text-align: left; }    .alertify .dialog input:not(.form-control), .alertify .alert input:not(.form-control) {      margin-bottom: 15px;      width: 100%;      font-size: 100%;      padding: 12px; }      .alertify .dialog input:not(.form-control):focus, .alertify .alert input:not(.form-control):focus {        outline-offset: -2px; }    .alertify .dialog nav, .alertify .alert nav {      text-align: right; }      .alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button), .alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button) {        background: transparent;        box-sizing: border-box;        color: rgba(0, 0, 0, 0.87);        position: relative;        outline: 0;        border: 0;        display: inline-block;        -ms-flex-align: center;            -ms-grid-row-align: center;            align-items: center;        padding: 0 6px;        margin: 6px 8px;        line-height: 36px;        min-height: 36px;        white-space: nowrap;        min-width: 88px;        text-align: center;      font-size: 14px;        text-decoration: none;        cursor: pointer;        border: 1px solid transparent;        border-radius: 2px; }        .alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):hover, .alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):active, .alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):hover, .alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):active {          background-color: rgba(0, 0, 0, 0.05); }        .alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):focus, .alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):focus {          border: 1px solid rgba(0, 0, 0, 0.1); }      .alertify .dialog nav button.btn, .alertify .alert nav button.btn {        margin: 6px 4px; }.alertify-logs {  position: fixed;  z-index: 99999; }  .alertify-logs.bottom, .alertify-logs:not(.top) {    bottom: 16px; }  .alertify-logs.left, .alertify-logs:not(.right) {    left: 16px; }    .alertify-logs.left > *, .alertify-logs:not(.right) > * {      float: left;      transform: translate3d(0, 0, 0);      height: auto; }      .alertify-logs.left > *.show, .alertify-logs:not(.right) > *.show {        left: 0; }      .alertify-logs.left > *, .alertify-logs.left > *.hide, .alertify-logs:not(.right) > *, .alertify-logs:not(.right) > *.hide {        left: -110%; }  .alertify-logs.right {    right: 16px; }    .alertify-logs.right > * {      float: right;      transform: translate3d(0, 0, 0); }      .alertify-logs.right > *.show {        right: 0;        opacity: 1; }      .alertify-logs.right > *, .alertify-logs.right > *.hide {        right: -110%;        opacity: 0; }  .alertify-logs.top {    top: 0; }  .alertify-logs > * {    box-sizing: border-box;    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);    position: relative;    clear: both;    backface-visibility: hidden;    perspective: 1000; }    .alertify-logs > * {      max-height: 0;      margin: 0;      padding: 0;      overflow: hidden;      opacity: 0;      pointer-events: none; }    .alertify-logs > *.show {      margin-top: 12px;      opacity: 1;      max-height: 1000px;      padding: 12px;      pointer-events: auto; }";
				head.insertBefore(css, head.firstChild);
			}
		},

		removeCSS: function() {
			var css = document.querySelector("#alertifyCSS");
			if (css && css.parentNode) {
				css.parentNode.removeChild(css);
			}
		}

	};

	_alertify.injectCSS();

	return {
		_$$alertify: _alertify,
		parent: function(elem) {
			_alertify.parent = elem;
		},
		reset: function() {
			_alertify.reset();
			return this;
		},
		alert: function(message, onOkay, onCancel) {
			return _alertify.dialog(message, "alert", onOkay, onCancel) || this;
		},
		confirm: function(message, onOkay, onCancel) {
			return _alertify.dialog(message, "confirm", onOkay, onCancel) || this;
		},
		prompt: function(message, onOkay, onCancel) {
			return _alertify.dialog(message, "prompt", onOkay, onCancel) || this;
		},
		promptButton: function(message, illegal, onCancel){
			return _alertify.dialog(message, "promptButton", illegal, onCancel) || this;
		},
		log: function(message, click) {
			_alertify.log(message, "default", click);
			return this;
		},
		theme: function(themeStr) {
			_alertify.theme(themeStr);
			return this;
		},
		success: function(message, click) {
			_alertify.log(message, "success", click);
			return this;
		},
		error: function(message, click) {
			_alertify.log(message, "error", click);
			return this;
		},
		cancelBtn: function(label) {
			_alertify.cancelBtn(label);
			return this;
		},
		okBtn: function(label) {
			_alertify.okBtn(label);
			return this;
		},
		delay: function(time) {
			_alertify.setDelay(time);
			return this;
		},
		placeholder: function(str) {
			_alertify.promptPlaceholder = str;
			return this;
		},
		defaultValue: function(str) {
			_alertify.promptValue = str;
			return this;
		},
		maxLogItems: function(num) {
			_alertify.setMaxLogItems(num);
			return this;
		},
		closeLogOnClick: function(bool) {
			_alertify.setCloseLogOnClick(!! bool);
			return this;
		},
		logPosition: function(str) {
			_alertify.setLogPosition(str || "");
			return this;
		},
		setLogTemplate: function(templateMethod) {
			_alertify.logTemplateMethod = templateMethod;
			return this;
		},
		clearLogs: function() {
			_alertify.setupLogContainer().innerHTML = "";
			return this;
		},
		version: _alertify.version
	};
}

/* alertify: AMD, window, and NPM support */
if ("undefined" !== typeof module && !! module && !! module.exports) {
	/* alertify: Preserve backwards compatibility */
	module.exports = function() {
		return new Alertify();
	};
	var obj = new Alertify();
	for (var key in obj) {
		module.exports[key] = obj[key];
	}
} else if (typeof define === "function" && define.amd) {
	define(function() {
		return new Alertify();
	});
} else {
	window.alertify = new Alertify();
}
/**** END ALERTIFY ****/

var alertifyBackground = document.createElement("div");
alertifyBackground.className = "alertify2 hide";
document.body.appendChild(alertifyBackground);
setTimeout(function() {
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
	if(0 > me || me >= z.numPlayers || z.promptStyle[me] === 0){
		alert(alertQueue[0]);
		alertQueueShift();
	} else if (z.promptStyle[me] === 1){
		alertify.alert(alertQueue[0]).then(alertQueueShift);
	}
  } else if (queuedPrompt.length > 0) {
    let promptType = queuedPrompt[0];
    switch(promptType){
      case "promptNum": {
        let promptText = queuedPrompt[1];
        let illegal = queuedPrompt[2];
		let cancel = queuedPrompt[3];
        let user = queuedPrompt[4];
        queuedPrompt = [];
        promptNum(promptText,illegal,cancel,user);
        break;
      }
      case "confirm": {
        let confirmText = queuedPrompt[1];
		let cancel = queuedPrompt[2];
        let user = queuedPrompt[3];
		let newOK = queuedPrompt[4];
		let newCancel = queuedPrompt[5];
        queuedPrompt = [];
        confirmify(confirmText,cancel,user,newOK,newCancel);
        break;
      }
	  case "promptString": {
		let promptText = queuedPrompt[1];
		let cancel = queuedPrompt[2];
        let user = queuedPrompt[3];
        queuedPrompt = [];
        promptString(promptText,cancel,user);
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
  
  alertQueue.push(alertText);
  if (alertQueue.length === 1) {
	if(0 > me || me >= z.numPlayers || z.promptStyle[me] === 0){
		alert(alertText);
		alertQueueShift();
	} else if(z.promptStyle[me]===1){
		alertify.alert(alertText).then(alertQueueShift);
	}
  }
}

function confirmify(confirmText, cancel, user, newOK, newCancel) {
  if(queuedPrompt.length > 0){
    alert("Error! Cannot queue multiple prompts");
  } else if (alertQueue.length > 0) {
    queuedPrompt = ["confirm", confirmText, cancel, user, newOK, newCancel];
  } else if(0 > me || me >= z.numPlayers || z.promptStyle[me] === 0){
	  let ok = confirm(confirmText);
	  if(ok){
		  user();
	  } else {
		  cancel();
	  }
	
  } else if(z.promptStyle[me]===1) {
	 if(!newOK){
	  newOK = "OK";
	}
	if(!newCancel){
	  newCancel = "Cancel";
	}
	alertify.okBtn(newOK).cancelBtn(newCancel).confirm(confirmText).then(function(arg) {
      arg.event.preventDefault();
      if (arg.buttonClicked == "cancel") {
        cancel();
      } else {
        user();
      }
    });
	  
  }
}

function tooManyOptions(illegal){
	let legalCount = 0;
	for(let j = 0; !(j>30); j++){
		if(!illegal(j)){
			legalCount++;
		}
	}
	return legalCount > 21;
}

function promptNum(promptText, illegal, cancel, user) {
  if(queuedPrompt.length > 0){
    alert("Error! Cannot queue multiple prompts");
  } else if (alertQueue.length > 0) {
    queuedPrompt = ["promptNum",promptText, illegal, cancel, user];
  } else if(0 > me || me >= z.numPlayers || z.promptStyle[me] === 0){
		let prompted = prompt(promptText);
		if(prompted === null){
			cancel();
		} else {
			let n = parseInt(prompted);
			if(isNaN(n) || illegal(n)){
				promptNum(promptText,illegal,cancel,user);
			} else {
				user(n);
			}
		}
	} else if(z.promptStyle[me] === 1){
		if(!mobile || tooManyOptions(illegal)){
			alertify.prompt(promptText).then((arg)=>{
			  arg.event.preventDefault();
			  if (arg.buttonClicked === "cancel" || arg.inputValue === null) {
				cancel();
			  } else {
				let n = parseInt(arg.inputValue);
				if (isNaN(n) || illegal(n)) {
				  promptNum(promptText, illegal, cancel, user);
				} else {
				  user(n);
				}
			  }
			});
		} else {
			alertify.promptButton(promptText,illegal).then((arg)=>{
				arg.event.preventDefault();
				if(arg.buttonClicked === "cancel"){
					cancel();
				} else {
					user(parseInt(/^choice(\d+)$/.exec(arg.buttonClicked)[1]));
				}
			});
		}
	}
}

/* empty strings now count as cancel */
function promptString(promptText, cancel, user) {
  if(queuedPrompt.length > 0){
    alert("Error! Cannot queue multiple prompts");
  } else if (alertQueue.length > 0) {
    queuedPrompt = ["promptString",promptText, user, cancel];
  } else if ( 0 > me || me >= z.numPlayers || z.promptStyle[me] === 0){
	  let prompted = prompt(promptText);
	  if(prompted === null || prompted === ""){
		  cancel();
	  } else {
		  user(prompted);
	  }
    
  } else if(z.promptStyle[me] === 1){
	  alertify.prompt(promptText).then((arg)=>{
      arg.event.preventDefault();
      if (arg.buttonClicked == "cancel" || arg.inputValue === null || arg.inputValue === "") {
        cancel();
      } else {
		user(arg.inputValue);
      }
    });
	  
  }
}





function error(str){
	alert(str);
}

function shuffle(array) {
	for (let i = array.length; i > 0; i--) {
		let rando = Math.floor(Math.random() * i);
		let removed = array.splice(rando, 1)[0];
		array.push(removed);
	}
	return array;
}

function plainAlert(str){
	addAlert(str);
	t.value += str+"\r\n";
}

function italics(text) {
	return "[i" +bl+ "]" + text + "[/"+bl+"i]";
}

function invisible(str) {
	return "[color=" +bl+ "#F4F4FF]" + str + "[/" +bl+ "color]";
}

function floatleft(text) {
	return "[float"+bl+"left]"+text+"[/float"+bl+"left]";
}

function colorText(color, text) {
	return "[col" +bl+ "or=" + color + "]" + text + "[/col"+bl+"or]";
}

function bold(text) {
	return "[b" +bl+ "]" + text + "[/"+bl+"b]";
}

function boldAlert(text){
	addAlert(text);
	t.value += bold(text.replace(/Commander/g,colorText("blue","Commander")).replace(/Suspicion/g,colorText("red","Suspicion")).replace(/Weak/g,colorText("red","Weak")).replace(/Evacuation/g,colorText("blue","Evacuation"))) + "\r\n";

}

function size(text, pt) {
	return "[siz" +bl+ "e=" + pt + "]" + text + "[/s"+bl+"ize]";
}

function imageO(id){
	return "[ima"+bl+"geid="+id+" original inline]";
}

function spoiler(text) {
	return "[o" +bl+ "]" + text + "[/"+bl+"o]";
}

function threatName(num){
	switch(num){
		case 0:
		return "Retrieve Sample";
		case 1:
		return "Act Recklessly";
		case 2:
		return "Exposure";
		case 3:
		return "Isolate Specimen";
	}
}

function handReportAlert(){
	let report = "";
	if(me === z.commander){
		report += "Commander ";
	}
	report += z.characters[me];
	report += "\nStatus: "+loyaltyName(z.statusCards[me]);
	if(z.threatsModule && z.threats.length > 0 && z.threats[me] !== -1){
		report += "\nThreat: "+threatName(z.threats[me]);
	}
	let redRolled = 0;
	let blackRolled = 0;
	let commanderRolled = false;
	let corporateRolled = 0;
	if(me === z.roller){
		for(let j = 0; !(j>=z.rolled.length); j++){
			switch(z.rolled[j][0]){
				case 3:
				corporateRolled++;
				break;
				case 0:
				redRolled++;
				break;
				case 1:
				blackRolled++;
				break;
				case 2:
				commanderRolled = true;
			}
		}
	}
	report += "\n"+z.redDice[me]+" Weak (Red) "+dieDice(z.redDice[me]);
	if(redRolled > 0){
		report += " (rolled:";
		for(let j = 0; !(j>=z.rolled.length); j++){
			if(z.rolled[j][0] !== 0){
				continue;
			}
			report += " ";
			let val = dieValue(z.rolled[j],false);
			if(val > 0){
				report += "+";
			}
			report += val;
		}
		report += ")";
	}
	report += "\n"+z.blackDice[me]+" Strong (Black) "+dieDice(z.blackDice[me]);
	if(blackRolled > 0){
		report += " (rolled:";
		for(let j = 0; !(j>=z.rolled.length); j++){
			if(z.rolled[j][0] !== 1){
				continue;
			}
			report += " ";
			let val = dieValue(z.rolled[j],false);
			if(val > 0){
				report += "+";
			}
			report += val;
		}
		report += ")";
	}
	if(me === z.commander && z.commanderDieInHand){
		report += "\nThe Commander die";
		if(commanderRolled){
			report += " (rolled:";
		}
		for(let j = 0; !(j>=z.rolled.length); j++){
			if(z.rolled[j][0] !== 2){
				continue;
			}
			report += " ";
			let val = dieValue(z.rolled[j],false);
			if(val > 0){
				report += "+";
			}
			report += val;
		}
		if(commanderRolled){
			report += ")";
		}
	}
	if(corporateRolled > 0){
		report += "\n"+z.rolled.length+" Corporate (Yellow) dice (rolled:";
		for(let j = 0; !(j>=z.rolled.length); j++){
			if(z.rolled[j][0] !== 3){
				continue;
			}
			report += " ";
			let val = dieValue(z.rolled[j],false);
			if(val > 0){
				report += "+";
			}
			report += val;
		}
		report += ")";
	}
	if(z.secrets[me].length > 0){
		report += "\n\nSecrets:";
	}
	for(let j = 0; !(j>=z.secrets[me].length); j++){
		report += "\n"+z.secrets[me][j];
	}
	addAlert(report);
}

function handReport(){
	let report = "";
	
	if(me === z.commander){
		report += size(bold(colorText("blue","Commander ")+z.characters[me]),14)+"\r\n\r\n";
	} else {
		report += size(bold(z.characters[me]),14)+"\r\n\r\n";
	} 
	
	
	report += bold("Your Status is: ")+loyaltyName(z.statusCards[me])+"\r\n\r\n";
	
	if(z.threatsModule){
		if(z.threats.length === 0){
			if(z.revealed[me]){
				report += "Noguchi Masaki's Threats mean little to you now.";
			} else {
				report += "You will not receive a Threat until all players have had a turn.";
			}
		} else {
			if(z.threats[me] === -1){
				report += "Noguchi Masaki's Threats mean little to you now.";
			} else {
				report += bold("Your Threat card is: ")+threatName(z.threats[me]);
			}
		}
		report += "\r\n\r\n";
	}
		
	report += bold("You have the following dice: ");
	let redRolled = 0;
	let blackRolled = 0;
	let commanderRolled = false;
	if(me === z.roller){
		for(let j = 0; !(j>=z.rolled.length); j++){
			switch(z.rolled[j][0]){
				case 3:
				continue;
				case 0:
				redRolled++;
				break;
				case 1:
				blackRolled++;
				break;
				case 2:
				commanderRolled = true;
			}
			report += diePicture(z.rolled[j]);
		}
	}
	for(let j = redRolled; !(j>=z.redDice[me]); j++){
		report+= imageO(4135409);
	}
	for(let j = blackRolled; !(j>=z.blackDice[me]); j++){
		report+= imageO(4135408);
	}
	if(me === z.commander && z.commanderDieInHand && !commanderRolled){
		report += imageO(4135407);
	}
	report += "\r\n\r\n";
	if(z.roller === me && z.rolled.length > 0 && z.rolled[0][0]===3){
		report += bold("You rolled the following Corporate dice:");
		for(let j = 0; !(j>=z.rolled.length); j++){
			report += diePicture(z.rolled[j]);
		}
		report += "\r\n\r\n";
	}
	if(z.secrets[me].length > 0){
		report += bold("You have learned the following secret information:");
		for(let j = 0; !(j>=z.secrets[me].length); j++){
			report += "\r\n"+z.secrets[me][j];
		}
		report += "\r\n\r\n";
	}
	report += gameState();
	
	t.value += spoiler(report);
	
}

function eventImage(num){
	switch(num){
		case 16:
			return imageO(4133719);
		case 17:
			return imageO(4133720);
		case 0:
			return imageO(4133723);
		case 18:
			return imageO(4133724);
		case 19:
			return imageO(4133725);
		case 1:
			return imageO(4133726);
		case 20:
			return imageO(4133727);
		case 21:
			return imageO(4133729);
		case 22:
			return imageO(4133731);
		case 2:
			return imageO(4133734);
		case 23:
			return imageO(4133736);
		case 3:
			return imageO(4133737);
		case 4:
			return imageO(4133739);
		case 5:
			return imageO(4133740);
		case 6:
			return imageO(4133742);
		case 7:
			return imageO(4133743);
		case 8:
			return imageO(4133744);
		case 9:
			return imageO(4133745);
		case 10:
			return imageO(4133746);
		case 11:
			return imageO(4133747);
		case 24:
			return imageO(4133748);
		case 12:
			return imageO(4133749);
		case 13:
			return imageO(4133750);
		case 14:
			return imageO(4133751);
		case 15:
			return imageO(4133752);
		case 25:
			return imageO(4133754);
	}
}

function cubeImage(placed,total){
	switch(total){
		case 5:
		switch(placed){
			case 5:
			return imageO(4133816);
			case 4:
			return imageO(4133815);
			case 3:
			return imageO(4133812);
			case 2:
			return imageO(4133758);
			case 1:
			return imageO(4133802);
			case 0:
			return imageO(4133791);
		}
		case 4:
		switch(placed){
			case 4:
			return imageO(4133814);
			case 3:
			return imageO(4133811);
			case 2:
			return imageO(4133806);
			case 1:
			return imageO(4133796);
			case 0:
			return imageO(4133789);
		}
		case 3:
		switch(placed){
			case 3:
			return imageO(4133833);
			case 2:
			return imageO(4133831);
			case 1:
			return imageO(4133829);
			case 0:
			return imageO(4133826);
		}
		case 2:
		switch(placed){
			case 2:
			return imageO(4133830);
			case 1:
			return imageO(4133828);
			case 0:
			return imageO(4133825);
		}
		case 1:
		switch(placed){
			case 1:
			return imageO(4133827);
			case 0:
			return imageO(4133824);
		}
	}
}

function finalEventImage(){
	switch(z.finalEvent){
		case "Await Rescue":
			return imageO(4133721);
		case "Blackout":
			return imageO(4133722);
		case "Escape":
			return imageO(4133730);
		case "Explosions":
			return imageO(4133732);
		case "Find Cure":
			return imageO(4133733);
		case "Last Stand":
			return imageO(4133738);
		case "Protect Self-Destruct Codes":
			return imageO(4133741);
		case "Toxic Gas":
			return imageO(4133753);
	}
}

function outpostImage(str){
	switch(str){
		case "Command":
		return imageO(4135315);
		case "Communications":
		return imageO(4135316);
		case "Research Lab":
		return imageO(4135318);
		case "Evac Ship":
		return imageO(4135319);
		case "Hangar":
		return imageO(4135320);
		case "Life Support":
		return imageO(4135321);
		case "Shield Control":
		return imageO(4135322);
	}
}

function characterImage(str,hilite){
	if(!hilite){
		switch(str){
			case "Chaya":
			return imageO(4133868);
			case "DANIEL":
			case "Daniel":
			return imageO(5420867);
			case "Enver":
			return imageO(4133875);
			case "Jon":
			return imageO(4133882);
			case "Lincoln":
			return imageO(4133885);
			case "Luba":
			return imageO(4133887);
			case "Michihiro":
			return imageO(4133890);
			case "Serene":
			return imageO(4133892);
			case "Steve":
			return imageO(4133895);
		}
	} else {
		switch(str){
			case "Chaya":
			return imageO(4133870);
			case "DANIEL":
			case "Daniel":
			return imageO(5420866);
			case "Enver":
			return imageO(4133877);
			case "Jon":
			return imageO(4133883);
			case "Lincoln":
			return imageO(4133886);
			case "Luba":
			return imageO(4133888);
			case "Michihiro":
			return imageO(4133891);
			case "Serene":
			return imageO(4133894);
			case "Steve":
			return imageO(4133897);
		}
	}
}

function suspicionImage(){
	switch(z.suspicion){
		case 1:
		return imageO(4133933);
		case 2:
		return imageO(4133936);
		case 3:
		return imageO(4133937);
		case 4:
		return imageO(4133938);
	}
}

function evacuationImage(){
	switch(z.evacuation){
		case 1:
		return imageO(4133925);
		case 2:
		return imageO(4133926);
		case 3:
		return imageO(4133927);
		case 4:
		return imageO(4133928);
	}
}

function threatImage(num){
	switch(num){
		case -1:
		return imageO(4135389);
		case 0:
		return imageO(4134358);
		case 1:
		return imageO(4134360);
		case 2:
		return imageO(4134361);
		case 3:
		return imageO(4134362);
		case 4:
		return imageO(4134359);
	}
}

function center(text){
	return "[cent"+bl+"er]"+text+"[/cent"+bl+"er]";
}	

function clear(){
	return "[cle"+bl+"ar]";
}

/* TODO: check closures are ok */
function gameState(){

	let report = '[q'+bl+'="NMWS: Game State"]';
	if(z.round > 0){
		report += size(bold(italics("Turn "+z.round+"."+(z.turn+1)+": "+z.characters[z.turn]+" is the Active Player.")),14)+"\r\n\r\n";
	} else {
		report += size(bold(italics("Game Setup")),14)+"\r\n\r\n";
	}
	let eventReport = "";
	for(let j = 0; !(j>=3); j++){
		if(j > z.eventNumber){
			eventReport += imageO(4135348) + imageO(4135349);
		} else if (z.eventNumber > j){
			eventReport += eventImage(z.events[j])+cubeImage(z.cubes[j],z.cubes[j]);
		} else {
			eventReport += eventImage(z.events[j])+cubeImage(z.cubes[j],currentEventLength());
		}
		eventReport += "\r\n";
	}
	eventReport += finalEventImage()+cubeImage(z.cubes[3],finalEventLength());
	let shieldReport = "";
	if(z.outpostDamage.includes("Shield Control")){
		if(z.sabotage === 1){
			shieldReport += imageO(4135873);
		} else {
			shieldReport += imageO(4135875);
		}
	} else {
		if(z.sabotage === 1){
			shieldReport += imageO(4135874);
		} else {
			shieldReport += imageO(4135876);
		}
	}
	for(let j = 1; z.shieldDamage >= j && 6 >= j; j++){
		shieldReport += "\r\n" + imageO(4135329);
	}
	switch(z.shieldDamage+1){
		case 1:
		shieldReport += "\r\n"+imageO(4135339);
		case 2:
		shieldReport += "\r\n"+imageO(4135339);
		case 3:
		shieldReport += "\r\n"+imageO(4135336);
		case 4:
		shieldReport += "\r\n"+imageO(4135334);
		case 5:
		shieldReport += "\r\n"+imageO(4135337);
		case 6:
		shieldReport += "\r\n"+imageO(4135338);
	}
	let outpostReport = "";
	if(z.sabotage === 2){
		outpostReport += imageO(4135874);
	} else {
		outpostReport += imageO(4135878);
	}
	for(let j = 0; !(j>=z.outpostDamage.length) && !(j>=6); j++){
		outpostReport += "\r\n"+outpostImage(z.outpostDamage[j]);
	}
	for(let j = z.outpostDamage.length; !(j>=6); j++){
		outpostReport += "\r\n"+imageO(4134383);
	}
	let fatigueReport = "";
	if(z.outpostDamage.includes("Life Support")){
		if(z.sabotage === 3){
			fatigueReport += imageO(4135873);
		} else {
			fatigueReport += imageO(4135872);
		}
	} else {
		if(z.sabotage === 3){
			fatigueReport += imageO(4135874);
		} else {
			fatigueReport += imageO(4135871);
		}
	}
	for(let j = 0; !(j>=z.fatigueDamage.length) && !(j>=6); j++){
		if(!z.characters.includes(z.fatigueDamage[j]) || z.revealed[z.characters.indexOf(z.fatigueDamage[j])]){
			fatigueReport += "\r\n"+characterImage(z.fatigueDamage[j],false);
		}
	}
	for(let j = 0; !(j>=z.fatigueDamage.length) && !(j>=6); j++){
		if(z.characters.includes(z.fatigueDamage[j]) && !z.revealed[z.characters.indexOf(z.fatigueDamage[j])]){
			fatigueReport += "\r\n"+characterImage(z.fatigueDamage[j],true);
		}
	}
	for(let j = z.fatigueDamage.length; !(j>=6); j++){
		fatigueReport += "\r\n"+imageO(4134343);
	}
	report += floatleft(eventReport) + floatleft(center(shieldReport)) + floatleft(center(outpostReport)) + floatleft(center(fatigueReport)) + clear();
	let boardReport = "";
	if(!allRevealed()){
		boardReport += floatleft(suspicionImage());
	}
	if(!z.evacuationFailure){
		boardReport += floatleft(evacuationImage());
	}
	
	boardReport += floatleft(center(imageO(4135409)+"\r\n"+size(bold(z.redPool),8)));
	boardReport += floatleft(center(imageO(4135408)+"\r\n"+size(bold(z.blackPool),8)));
	if(!z.commanderDieInHand){
		boardReport += floatleft(center(imageO(4135407)+"\r\n"+size(bold(" "),8)));
	}
	report += boardReport + clear();
	
	let characterReport = "";
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(j !== 0){
			characterReport += "\r\n";
		}
		characterReport += characterImage(z.characters[j],j === z.turn)+"\r\n"+displayUsername(j);
	}
	
	
	let dieLimitReport = "";
	for(let j = 0; !(j>=z.numPlayers);j++){
		if(j !== 0){
			dieLimitReport += "\r\n";
		}
		
		
		if(z.revealed[j]){
			dieLimitReport += imageO(4133900) + imageO(4133901);
			if(z.amputated[j]){
				dieLimitReport += imageO(4134378);
			} else {
				dieLimitReport += imageO(4133901);
			}
			dieLimitReport += imageO(4133900);
		} else {
			let numTokens = 0;
			if(z.amputated[j]){
				numTokens++;
			}
			if(z.quarantined[j]){
				numTokens+=2;
			}		
			for(let k = numTokens + 1; !(k>4) && !(k > numTokens + z.dieLimit[j]); k++){
				dieLimitReport += imageO(4133903);
			}
			if(z.quarantined[j]){
				dieLimitReport += imageO(4133905) + imageO(4133905);
			}
			if(z.amputated[j]){
				dieLimitReport += imageO(4134378);
			}
			for(let k = numTokens + z.dieLimit[j] + 1; !(k>4); k++){
				dieLimitReport += imageO(4133904);
			}
			for(let k = 5; !(k > numTokens + z.dieLimit[j]); k++){
				dieLimitReport += imageO(4133907);
			}
			if(j === z.commander){
				dieLimitReport += imageO(4133908);
			}
		}
		dieLimitReport += "\r\n ";
		
	}
	let hippoReport = "";
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(j !== 0){
			hippoReport += "\r\n";
		}
		
		if(z.fatigued[j] || (z.revealed[j] && z.fatiguedInfected)){
			hippoReport += imageO(4135346);
		} else {
			hippoReport += imageO(4135389);
		}
		hippoReport += "\r\n ";
		
	}
	report += floatleft(center(characterReport)) + floatleft(dieLimitReport) + floatleft(hippoReport);
	if(z.threatsModule && z.round > 1){
		let threatsReport = "";
		for(let j = 0; !(j>=z.numPlayers); j++){
			if(j !== 0){
				threatsReport += "\r\n";
			}
			threatsReport += threatImage(z.threatTokens[j])+"\r\n ";
		}
		report += floatleft(threatsReport);
	}
	if(!z.evacuationFailure){
		let clearanceReport = "";
		for(let j = 0; !(j>=z.numPlayers); j++){
			if(j !== 0){
				clearanceReport += "\r\n";
			}	
			
			if(z.cleared[j]){
				clearanceReport += imageO(4135341);
			} else {
				clearanceReport += imageO(4135389);
			}
			clearanceReport += "\r\n ";
			
		}
		report += floatleft(clearanceReport);
	}
	report += clear() +"[/q]";
	
	return report;
	
}




function taskType(index) {
	if( 0 > index || index > 23 ){
		error("Error: invalid Task index");
	} else if( 1 >= index  ){
		return '?';  /* ???? Malfunction */
	} else if( 5 >= index ){
		return 'S';  /* Shield */
	} else if ( 9 >= index ) {
		return 'O';  /* Outpost */
	} else if (13 >= index ) {
		return 'L';  /* Life Support */
	} else if( 22 >= index ){
		return 'C';  /* Complication */
	} else if( index === 23 ){
		return 'R'; /* recall evac ship */
	}
}

function baseMalfunctionDifficulty(index){
	if( 0 > index  || index > 13 ){
		error("Error: task not a malfunction!");
	} else if(index === 0) {
		return 6;
	} else if(index === 1){
		return 8;
	} else if(5 >= index){
		return index + 3;
	} else if(9 >= index ) {
		return index - 3;
	} else {
		return index - 6;
	}
}

function displayUsername(player){
	return /*imageO(4137571)+*/"[us"+"er="+z.usernames[player]+"]"+z.usernames[player]+"[/us"+"er]";
}

function malfunctionDifficulty(index){
	let modifier = 0;
	if (z.numPlayers % 2 === 0) {
		modifier += 2;
	}
	if( z.eventNumber === 3 && z.finalEvent === "Blackout" ){
		modifier += 2;
	}
	return baseMalfunctionDifficulty(index) + modifier;
}

function malfunctionConsequence(index){
	switch(index){
		case 1:
		case 4:
		case 8:
		case 12:
			return 1;
		case 0:
		case 2:
		case 5:
		case 6:
		case 9:
		case 10:
		case 13:
			return 2;
		case 3:
		case 7:
		case 11:
			return 3;
	}
	error("Error: task is not a malfunction!");
}

function suspiciousActivity(index){
	switch(index){
		case 0:
		case 3:
		case 4:
		case 5:
		case 6:
		case 7:
		case 9:
		case 10:
		case 12:
		case 13:
		case 16:
		case 17:
		case 19:
		case 20:
			return true;
	}
	return false;
}

function malfunctionPassEffect(index){
	switch(index){
		case 3:
		case 5:
		case 7:
		case 9:
		case 11:
		case 13:
			return true;
	}
	return false;
}

function evacuateEvacuate(index){
	switch(index){
		case 1:
		case 5:
		case 7:
		case 12:
		case 14:
		case 15:
		case 17:
		case 20:
			return true;
	}
	return false;
}

function taskName(index){
	let ty = taskType(index);
	if (ty === 'C') {
		let str = "";
		if(suspiciousActivity(index)){
			str += colorText("red"," !S!");
		}
		if(evacuateEvacuate(index) && z.shadowCorporation){
			str += colorText("blue"," !E!");
		}
		switch(index) {
			case 14:
			return "Acceptable Loss"+str;
			case 15:
			return "Act of Trust (Outpost)"+str;
			case 16:
			return "Act of Trust (Shield)"+str;
			case 17:
			return "Failure to Lead"+str;
			case 18:
			return "Mandatory Quarantine"+str;
			case 19:
			return "Strategic Compromise"+str;
			case 20:
			return "Voluntary Blood Testing"+str;
			case 21:
			return "Vote for Clearance"+str;
			case 22:
			return "Cut it Off!"+str;
		}
	} else if (ty === 'R') {
		return "Evacuation Ship Recalled";
	}
	let str = "";
	if (ty === '?' && z.taskType !== -1){
		ty = z.taskType;
	}
	if (ty === '?') {
		str = "???????????";
	} else if (ty === 'S') {
		str = "Shield";
	} else if (ty === 'L') {
		str = "Life Support";
	} else if (ty === 'O') {
		str = "Outpost";
	}
	str += " Malfunction - " + malfunctionDifficulty(index) + "/" + malfunctionConsequence(index);
	if(malfunctionPassEffect(index)){
		str += colorText("green"," (+)");
	}
	if(suspiciousActivity(index)){
		str += colorText("red"," !S!");
	}
	if(evacuateEvacuate(index) && z.shadowCorporation){
		str += colorText("blue"," !E!");
	}
	return str;	
}

function alertTaskName(index){
	let ty = taskType(index);
	if (ty === 'C') {
		let str = "";
		if(suspiciousActivity(index)){
			str += " !S!";
		}
		if(evacuateEvacuate(index) && z.shadowCorporation){
			str += " !E!";
		}
		switch(index) {
			case 14:
			return "Acceptable Loss"+str;
			case 15:
			return "Act of Trust (Outpost)"+str;
			case 16:
			return "Act of Trust (Shield)"+str;
			case 17:
			return "Failure to Lead"+str;
			case 18:
			return "Mandatory Quarantine"+str;
			case 19:
			return "Strategic Compromise"+str;
			case 20:
			return "Voluntary Blood Testing"+str;
			case 21:
			return "Vote for Clearance"+str;
			case 22:
			return "Cut it Off!"+str;
		}
	} else if (ty === 'R') {
		return "Evacuation Ship Recalled";
	}
	let str = "";
	if (ty === '?' && z.taskType !== -1){
		ty = z.taskType;
	}
	if (ty === '?') {
		str = "???????????";
	} else if (ty === 'S') {
		str = "Shield";
	} else if (ty === 'L') {
		str = "Life Support";
	} else if (ty === 'O') {
		str = "Outpost";
	}
	str += " Malfunction - " + malfunctionDifficulty(index) + "/" + malfunctionConsequence(index);
	if(malfunctionPassEffect(index)){
		str += " (+)";
	}
	if(suspiciousActivity(index) && !allRevealed()){
		str += " !S!";
	}
	if(evacuateEvacuate(index) && z.shadowCorporation){
		str += " !E!";
	}
	return str;	
}

/*RULES: do the vote ones require you to use your action? Or if you get lucky with the tracks/task/event, does that work too? */
function threatName(index){
	let names = ["Retrieve Sample","Act Recklessly","Exposure","Isolate Specimen"];
	if (0 > index  || index >= names.length) {
		return "No Such Threat!";
	}
	return names[index];
}

function eventName(index){
	let names = ["Blood Testing","Divert Power","Food Rationing","Jerry-Rig Shields","Lockdown","Pass Command","Reboot Shields","Recovery","Repair Tools","Rescue Crewman","Restore Comm","Resupply",
	"Salvage Parts","System Crash","System Reboot","Tactical Prep","Accelerated Evac","Accident","Corporate Bribery","Corporate Raid","Electrical Fire","Electrical Storm",
	"Evac Lottery","Hold Trials","Risk Assessment","Vote Tampering"];
	if(index === -1){
		return "";
	}
	if (0 > index || index >= names.length) {
		return "No Such Event!";
	}
	return names[index];
}

function currentEventLength(){
	if(z.eventNumber === 3){
		return finalEventLength();
	} else if (z.eventNumber === -1){
		return 0;
	} else {
		return eventLength(z.events[z.eventNumber]);
	}
}

function eventLength(index){
	let lengths = [3,2,3,3,2,3,2,2,2,2,3,4,3,2,1,4,3,2,2,2,2,4,3,3,2,3];
	if (0 > index || index >= lengths.length) {
		error("No Such Event!");
		return 100;
	}
	let riskAssessment = 0;
	if(z.eventNumber > 0 && z.events[z.eventNumber - 1] === 24){
		riskAssessment = 1;
	}
	return lengths[index] + riskAssessment;
}

function finalEventLength(){
	/* RULES: does Risk Assessment apply to the final event? */
	let riskAssessment = 0;
	if(z.events[2] === 24){
		riskAssessment = 1;
	}
	if(z.finalEvent === "Blackout"){
		return 2 + riskAssessment;
	}
	return 3 + riskAssessment;
}

function loyaltyName(index){
	switch(index){
		case 0:
		return "You Are Uninfected";
		case 1:
		return colorText("red","You Are Infected - Can Damage Shields");
		case 2:
		return colorText("red","You Are Infected - Can Damage Outpost");
		case 3:
		return colorText("red","You Are Infected - Can Damage Life Support");
		case 4:
		return colorText("red","You Are Infected - Can Approve or Deny Clearance");
		case 5:
		return colorText("green","You Are the Company Man");
	}
}

/*function promptInt(text,min,max,illegal){
	while(true){
		let prompted0 = prompt(text);
		if(prompted0 === null){
			return -1;
		}
		let prompted = parseInt(prompted0);
		if(!isNaN(prompted) && prompted >= min && !(prompted > max) && !illegal(prompted)){
			return prompted;
		}
	}
	
}*/

function defaultBanner(num){
	if(num === z.commander){
		switch(z.characters[num]){
			case "Luba":
			return 5332570;
			case "Chaya":
			return 5332557;
			case "Jon":
			return 5332563;
			case "Enver":
			return 5332561;
			case "Michihiro":
			return 5332572;
			case "Steve":
			return 5332575;
			case "Serene":
			return 5332574;
			case "DANIEL":
			case "Daniel":
			return 5332558;
			case "Lincoln":
			return 5332564;
		}
	} else if (z.revealed[num]){
		switch(z.characters[num]){
			case "Luba":
			return 5332584;
			case "Chaya":
			return 5332578;
			case "Jon":
			return 5332582;
			case "Enver":
			return 5332596;
			case "Michihiro":
			return 5332594;
			case "Steve":
			return 5332610;
			case "Serene":
			return 5332599;
			case "DANIEL":
			case "Daniel":
			return 5332580;
			case "Lincoln":
			return 5332589;
		}
	} else {
		switch(z.characters[num]){
			case "Luba":
			return 5332583;
			case "Chaya":
			return 5332577;
			case "Jon":
			return 5332581;
			case "Enver":
			return 5332595;
			case "Michihiro":
			return 5332593;
			case "Steve":
			return 5332600;
			case "Serene":
			return 5332597;
			case "DANIEL":
			case "Daniel":
			return 5332579;
			case "Lincoln":
			return 5332585;
		}
	}
	
}

function gameSetup(){
	promptNum("How many players? (3-7)",(a)=>3>a||a>7,clearBackground,(choice)=>{
		z.numPlayers = choice;
		setupShadowCorporation();
	});
}

function setupShadowCorporation(){
	confirmify("Use Shadow Corporation expansion?",()=>{
		z.shadowCorporation=false;
		setupVariants();
	},()=>{
		z.shadowCorporation=true;
		setupThreats();
	},"Yes","No");
}

function setupThreats(){
	confirmify("Use Threats module?",()=>{
		z.threatsModule = false;
		setupCompanyMan();
	},()=>{
		z.threatsModule = true;
		setupCompanyMan();
	},"Yes","No");
}

function setupCompanyMan(){
	confirmify("Use Company Man module?",()=>{
		z.companyManModule = false;
		setupVariants();
	},()=>{
		z.companyManModule = true;
		setupVariants();
	},"Yes","No");
}

/*
Variants:
 (choose final event)
z.expensiveVoting: Expensive Voting: all dice used in voting are submitted afterwards.  If playing with Shadow Corporation, remove Vote Tampering from the event deck.
z.firstIsLast: First is Last: the current player goes last (not first) when participating/submitting to malfunctions
z.flimsyQuarantine: Flimsy Quarantine: Quarantined players still get Task cards (If all quarantined and Failure to Lead comes up, it auto-passes)
z.telepathicInfected: Telepathic Infected: (5+ players only): Infected know their teammates.
z.deadlyEvents: Deadly Events:  Effects from completed events can end the game.
z.noMoreComplications: No More Complications: If all infected players have revealed themselves, remove all Complication tasks from the game and reshuffle the Task deck.  If playing with Shadow Corporation, also shuffle in Evacuation Ship Recalled.
z.nerfedRevealExtreme: Nerfed Reveal - Extreme: Revealing players may not trigger their infection power
z.nerfedRevealNormal: Nerfed Reveal - Normal: Revealing players may not trigger their infection power a second time
z.safeOrders: Safe Orders: You may not reveal as infected as an action if you've been issued orders
z.fatiguedInfected: Fatigued Infected: Infected players may only submit a single die during Malfunction tasks.
z.costlyActions: Costly Actions: An infected player must submit a die to perform an Infection action
z.noExposure: No Exposure: (Shadow Corporation only) removes Exposure from the game.  In a 7-player game, an extra "Retrieve Sample" is included instead.
z.poundOfFlesh: Pound of Flesh: (Shadow Corporation only) to claim Retrieve Sample, you must cast a weak die on a successful amputation (on your turn or otherwise), of a player other than yourself.
z.expensiveAmputation: Expensive Amputation (Shadow Corporation only): Expensive Amputations: all dice used in amputation votes are submitted afterwards.
*/

function setupVariants(){
	
	let variantNames = ["Expensive Voting","First is Last","Flimsy Quarantine"];
	let variantZ = ["expensiveVoting","firstIsLast","flimsyQuarantine"];
	if(z.numPlayers > 4){
		variantNames.push("Telepathic Infected");
		variantZ.push("telepathicInfected");
	}
	variantNames.push("Deadly Events");
	variantZ.push("deadlyEvents");
	variantNames.push("No More Complications");
	variantZ.push("noMoreComplications");
	variantNames.push("Nerfed Reveal - Extreme");
	variantZ.push("nerfedRevealExtreme");
	variantNames.push("Nerfed Reveal - Normal");
	variantZ.push("nerfedRevealNormal");
	variantNames.push("Safe Orders");
	variantZ.push("safeOrders");
	variantNames.push("Fatigued Infected");
	variantZ.push("fatiguedInfected");
	variantNames.push("Costly Actions");
	variantZ.push("costlyActions");
	if(z.threatsModule){
		variantNames.push("No Exposure");
		variantZ.push("noExposure");
		variantNames.push("Pound of Flesh");
		variantZ.push("poundOfFlesh");
	}
	if(z.shadowCorporation){
		variantNames.push("Expensive Amputation");
		variantZ.push("expensiveAmputation");
	}
	
	let promptText = "You may toggle variants here.  Once you're done, press Cancel to proceed.";
	for(let j = 0; !(j>=variantNames.length); j++){
		promptText += "\n"+(j+1)+": ";
		if(z[variantZ[j]]){
			promptText += "[ON]";
		} else {
			promptText += "[OFF]";
		}
		promptText += " "+variantNames[j];
	}
	promptNum(promptText,(a)=>1>a||a>variantNames.length,setupFinalEvent,(choice)=>{
		z[variantZ[choice-1]] = !z[variantZ[choice-1]];
		if(variantZ[choice-1] === "nerfedRevealExtreme" && z.nerfedRevealNormal){
			z.nerfedRevealNormal = false;
		} else if(variantZ[choice-1] === "nerfedRevealNormal" && z.nerfedRevealExtreme){
			z.nerfedRevealExtreme = false;
		}
		setupVariants();
	});
	
}

function setupFinalEvent(){
	if(z.expensiveVoting && z.expensiveAmputation){
		z.expensiveAmputation = false;
	}
	let finalEvents = ["Protect Self-Destruct Codes","Await Rescue","Escape","Find Cure","Last Stand","Blackout"];
	if(z.shadowCorporation){
		finalEvents.push("Explosions");
		finalEvents.push("Toxic Gas");
	}
	let promptText = "Which Final Event would you like to use? (1-"+(finalEvents.length+1)+")\n1: Random Final Event";
	for(let j = 0; !(j>=finalEvents.length); j++){
		promptText += "\n"+(j+2)+": "+finalEvents[j];
	}
	promptNum(promptText,(a)=>(1>a||a>(finalEvents.length+1)),setupFinalEvent,(choice)=>{
		if(choice === 1){
			shuffle(finalEvents);
			z.finalEvent = finalEvents.pop();
		} else {
			z.finalEvent = finalEvents[choice-2];
			z.finalEventChosen = true;
		}
		setupUsernames(1);
	});
}

function setupUsernames(j){
	if(j === 1){
		z.usernames = [];
	}
	if(j > z.numPlayers){
		shuffle(z.usernames);
		t.value += bold(size("Noguchi Masaki Web Services Initialization",14)) + "\r\n\r\n";
		t.value += bold("Game Options:");
		t.value += "\r\n"+z.numPlayers+" Players";
		if(z.shadowCorporation){
			t.value += "\r\nShadow Corporation";
		} else {
			t.value += "\r\nBase Game";
		}
		if(z.threatsModule){
			t.value += "\r\nThreats";
		}
		if(z.companyManModule){
			t.value += "\r\nCompany Man";
		}
		if(z.expensiveVoting){
			t.value += "\r\nExpensive Voting";
		}
		if(z.firstIsLast){
			t.value += "\r\nFirst is Last";
		}
		if(z.flimsyQuarantine){
			t.value += "\r\nFlimsy Quarantine";
		}
		if(z.telepathicInfected){
			t.value += "\r\nTelepathic Infected";
		}
		if(z.deadlyEvents){
			t.value += "\r\nDeadly Events";
		}
		if(z.noMoreComplications){
			t.value += "\r\nNo More Complications";
		}
		if(z.nerfedRevealExtreme){
			t.value += "\r\nNerfed Reveal - Extreme";
		}
		if(z.nerfedRevealNormal){
			t.value += "\r\nNerfed Reveal - Normal";
		}
		if(z.safeOrders){
			t.value += "\r\nSafe Orders";
		}
		if(z.fatiguedInfected){
			t.value += "\r\nFatigued Infected";
		}
		if(z.costlyActions){
			t.value += "\r\nCostly Actions";
		}
		if(z.noExposure){
			t.value += "\r\nNo Exposure";
		}
		if(z.poundOfFlesh){
			t.value += "\r\nPound of Flesh";
		}
		if(z.expensiveAmputation){
			t.value += "\r\nExpensive Amputation";
		}
		t.value += "\r\n\r\n";
		z.version = NMWSversion;
		z.NMWSversion = NMWSversion;
		z.shieldDamage = 2;
		z.outpostPool = ["Hangar","Shield Control","Communications","Life Support","Research Lab","Command"];
		if(z.shadowCorporation){
			z.outpostPool.push("Evac Ship");
		}
		shuffle(z.outpostPool);
		z.outpostDamage = [];
		let damage = z.outpostPool.pop();
		boldAlert(damage + " is damaged.");
		z.outpostDamage.push(damage);
		damage = z.outpostPool.pop();
		boldAlert(damage + " is damaged.");
		z.outpostDamage.push(damage);
		z.suspicion = 1;  /* Hits VOTE at 4 */
		z.evacuation = 1; /* Hits VOTE at 4; only modified with shadow corporation */
		let characters = ["Luba","Enver","DANIEL","Chaya","Michihiro","Steve","Jon"];
		if(z.shadowCorporation){
			characters.push("Serene");
			characters.push("Lincoln");
		}
		shuffle(characters);
		while(characters[characters.length - z.numPlayers] === "DANIEL"){
			shuffle(characters);
		}
		z.characters = [];
		z.blackDice = [];
		z.dieLimit = [];
		z.redDice = [];
		z.fatigued = [];
		z.quarantined = [];
		z.revealed = [];
		z.amputated = [];
		z.cleared = [];
		z.options = [];
		z.banners = [];
		z.secrets = [];
		z.participation = [];
		z.submissions = [];
		z.threatTokens = [];
		z.fatiguePool = [];
		z.promptStyle = [];
		for(let j = 0; !(j >= z.numPlayers); j++) {
			let character = characters.pop();
			z.characters.push(character);
			if(character !== "DANIEL"){
				z.fatiguePool.push(character);
			}
			z.blackDice.push(2);
			z.redDice.push(2);
			z.dieLimit.push(4);
			z.fatigued.push(false);
			z.quarantined.push(false);
			z.revealed.push(false);
			z.amputated.push(false);
			z.cleared.push(false);
			z.options.push([]);
			z.secrets.push([]);
			z.participation.push(-1);
			z.submissions.push([]);
			z.banners.push(defaultBanner(j));
			z.threatTokens.push(-1);
			z.promptStyle.push(1);
		}
		while(6 > z.fatiguePool.length){
			let character = characters.pop();
			if(character !== "DANIEL"){
				z.fatiguePool.push(character);
			}
		}
		shuffle(z.fatiguePool);
		z.fatigueDamage = [];
		t.value += "\r\n"+bold("Players")+" (in randomized turn order)";
		for(let j = 0; !(j>=z.numPlayers);j++){
			t.value += "\r\n"+(j+1)+": [us"+"er="+z.usernames[j]+"]"+z.usernames[j]+"[/"+"user]  - "+z.characters[j];
		}
		t.value += "\r\n\r\n";
		z.commander = z.numPlayers - 1;
		z.banners[z.commander] = defaultBanner(z.commander);
		boldAlert(z.characters[z.numPlayers - 1] +" is the Commander.");
		boldAlert("The Final Alert is "+z.finalEvent+".");
		if(z.finalEventChosen){
			plainAlert("This Final Event was chosen specifically for this game.");
		}
		
		let infectedCards = [1,2,3];
		if(z.shadowCorporation){
			infectedCards.push(4);
		}
		shuffle(infectedCards);
		z.statusCards = [];
		z.statusCards.push(infectedCards.pop());
		if(z.numPlayers >= 5){
			z.statusCards.push(infectedCards.pop());
		}
		if(z.numPlayers === 7){
			z.statusCards.push(infectedCards.pop());
		}
		let uninfectedCards = [0,0,0,0,0,0,0];
		if(z.companyManModule){
			uninfectedCards.push(5);
			shuffle(uninfectedCards);
		}
		for(let j = z.statusCards.length; !(j>=z.numPlayers); j++){
			z.statusCards.push(uninfectedCards.pop());
		}
		shuffle(z.statusCards);
		if(z.telepathicInfected){
			for(let j = 0; !(j >= z.numPlayers); j++){
				if(z.statusCards[j] >=1 && 4 >= z.statusCards[j]){
					for(let k = 0; !(k>=z.numPlayers); k++){
						if(z.statusCards[k] >=1 && 4 >= z.statusCards[k] && j !== k){
							z.secrets[j].push(z.characters[k] + " is also infected."); 
						}
					}
				}
			}
			boldAlert("Infected players now know the identities of their infected teammates.");
		}
		z.taskDeck = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
		if(z.numPlayers > 4){
			z.taskDeck.push(20); /* Voluntary Blood Testing */
		}
		z.taskDiscards = [];
		if(z.shadowCorporation){
			z.taskDeck.push(21);
			z.taskDeck.push(22);
		}
		shuffle(z.taskDeck);
		z.eventDeck = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
		if(z.shadowCorporation){
			for(j = 16; !(j>25); j++){
				if(j === 25 && z.expensiveVoting){
					break;
				}
				z.eventDeck.push(j);
			}
		}
		shuffle(z.eventDeck);
		z.eventNumber = -1;
		z.commanderDieInHand = true;
		z.round = 0;
		z.turn = z.numPlayers-1;
		z.events = [-1,-1,-1];
		z.cubes = [0,0,0,0];
		z.currentTask = -1;
		z.taskType = -1;
		z.evacuationFailure = !z.shadowCorporation;
		z.xoTarget = -1; 
		z.redPool = 0;
		z.blackPool = 0;
		z.threats = [];
		z.threatTokenPool = [0,0,0,1,1,3,4,4,4,4];
		if(!z.noExposure){
			z.threatTokenPool.push(2);
		} else if (z.numPlayers === 7){
			z.threatTokenPool.push(0);
		}
		z.gameOver = false;
		z.dieRolls = [];
		for(let j = 0; !(j>=28); j++){
			z.dieRolls.push(Math.floor(Math.random() * 6));
		}
		z.rebootShields = 0;
		z.sabotage = 0;
		z.roller = -1;
		z.rolled = [];
		z.luba = true;
		z.lincoln = true;
		z.justRevealed = false;
		z.revealer = -1;
		z.voteTarget = -1;
		z.voteType = -1;
		z.voteCaller = -1;
		z.votes = [];
		z.jerryRig = false;
		z.explosions = false;
		
		z.options[z.commander].push("Select a new Event");
		t.value += gameState();
		boldAlert("Commander "+z.characters[z.commander] + " must select the first Event.");
		t.value += "[h"+"r]";
		postSeed();
		clearBackground();
		
		/* QUIT */
	} else {
		promptString("Enter the BGG username of a player ("+j+"/"+z.numPlayers+").\nPlayer order will be randomized before character selection.",clearBackground,(choice)=>{
			z.usernames.push(choice);
			setupUsernames(j+1);
		});
	}
}

function isMobile() {
  try{ document.createEvent("TouchEvent"); return true; }
  catch(e){ return false; }
}

function clearBackground(){
	hideElement(alertifyBackground);
}

function versionsAtLeast(ver1, ver2) {
	for(let j = 0; !(j >= ver1.length) && !(j >= ver2.length); j++) {
		if(ver2[j] > ver1[j]) {
			return false;
		} else if(ver1[j] > ver2[j]) {
			return true;
		}
	}
	if(ver2.length > ver1.length) {
		return false;
	}
	return true;
}

mobile = isMobile();

var seed = re.exec(t.value);
if (seed === null) {
	seed = "";
} else {
	seed = seed[0].slice(33, -15);
}
if (seed === "") {
	confirmify("Would you like to start a new game?",clearBackground,gameSetup);
	seed = null;
}
if(seed!==null){
	seed = window.atob(seed.replace(/-/g, ""));
	z = JSON.parse(seed);
	if(!z.hasOwnProperty("QMGversion")) {
		z.NMWSversion = NMWSversion;
		z.version = NMWSversion;
	}
	if(!versionsAtLeast(NMWSversion, z.NMWSversion)) {
		addAlert("You are using an out-of-date version of the NMWS script!  Run the NMWS script again to apply the update.");
		window.localStorage.setItem("nmwsUrgent", "outdated");
		clearBackground();
	} else {
		if(!versionsAtLeast(z.NMWSversion, NMWSversion)) {
			z.NMWSversion = NMWSversion;
		}
		if(!z.hasOwnProperty("promptStyle")){
			z.promptStyle = [];
			for(let j = 0; !(j>=z.numPlayers); j++){
				z.promptStyle.push(1);
			}
		}
		
		for(let j = 0; !(j>=z.usernames.length); j++){
			if(z.usernames[j]===myUsername){
				me = j;
			}
		}
		if(me  === -1 ){
			addAlert("You are not recognized as a player in this game!\nProceed only if you believe this to be in error, or you are replacing a player who resigned or disappeared.");
			
			let promptText = "What player number are you? (1-"+z.numPlayers+")\nProceed only if you know you are a player in the game (e.g. your username was misspelled, or you are replacing a player who resigned or disappeared).";
			for(let j = 0; !(j>=z.numPlayers); j++){
				promptText += "\n"+(j+1)+": "+z.characters[j]+" ("+z.usernames[j]+")";
			}

			promptNum(promptText,(a)=>1>a||a>z.numPlayers,clearBackground,(choice)=>{
				me = choice - 1;
				mainMenu();
			});
		} else {
			mainMenu();
		}
	}
}

function clearSpoilers(){
	let ore = new RegExp('\\[o\\][\\s\\S]*\\[/o\\]', "g");          
	t.value =  t.value.replace(ore, "").replace(ore, "");
}

function clearQuotes(){
	let qre0 = new RegExp('\\[q="(?!NMWS).+"\\]((?!(\\[q=|\\[/q\\]))[\\s\\S])*\\[/q\\]', "g");        
	let qre1 = new RegExp('\\[q="(?!NMWS).+"\\](((?!(\\[q=|\\[/q\\]))[\\s\\S])*\\[q="((?!(\\[q=|\\[/q\\]))[\\s\\S])*\\[/q\\]((?!(\\[q=|\\[/q\\]))[\\s\\S])*)*\\[/q\\]', "g");                  
	t.value =  t.value.replace(qre0, "").replace(qre1,"").replace(qre0, "").replace(qre1,"");
}

function postSeed() {
	let bannerRegExp = new RegExp("\\[ima" + "geid=" + z.banners[me] + " medium\\]","g");
	
	let splitted = window.btoa(JSON.stringify(z)).match(/.{1,20}/g);
	let str = "";
	while (splitted.length > 0) {
		str += splitted.shift() + "-";
	}
	let banner = "";
	if(me !== -1){
		banner = "[ima" +"geid=" + z.banners[me] + " medium]\r\n";
	}

	t.value = banner + size(invisible("N-M seed: " + str), 1) + "\r\n" + t.value.replace(bannerRegExp, "").replace(re,"");
	clearQuotes();
	
	try {
		let evt = new Event('input', {
			bubbles: true,
			cancelable: true,
		});
		t.dispatchEvent(evt);
	} catch(err) {  }

	
}  

function addOption(player,opt){
	for(let j = 0; !(j>=z.options[player].length); j++){
		if(z.options[player][j] === opt){
			return undefined;
		}
	}
	z.options[player].unshift(opt);
}

function removeOption(player,opt){
	for(let j = 0; !(j>=z.options[player].length); j++){
		if(z.options[player][j] === opt){
			z.options[player].splice(j,1);
			j--;
		}
	}
}



function numCleared(){
	let num = 0;
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(z.cleared[j]){
			num++;
		}
	}
	return num;
}

function fullShip(){
	let num = numCleared();
	switch(z.numPlayers){
		case 3:
		return num === 1;
		case 4:
		case 5:
		return num === 2;
		case 6:
		case 7:
		return num === 3;
	}
}

function readyForTakeOff(){
	if(2 > z.round){
		return false;
	}
	return fullShip();
}

function dieDice(num){
	if(num === 1){
		return "die";
	} else {
		return "dice";
	}
}


function endTurn(){
	/* TODO: other cleanup operations? */
	z.currentTask = -1;
	z.taskType = -1;
	z.revealer = -1;
	z.roller = -1;
	z.costPaid = false;
	z.luba = true;
	z.rolled = [];
	for(let j = 0; !(j>=z.numPlayers); j++){
		z.options[j] = [];
		z.submissions[j] = [];
		z.participation[j] = -1;
	}
	z.turn++;
	if(z.turn === z.numPlayers){
		z.turn = 0;
		z.round++;
		if(z.round === 2 && z.shadowCorporation){
			if(fullShip()){
				boldAlert("The Evacuation Ship has finished refueling, and is now ready for takeoff!");
			} else {
				boldAlert("The Evacuation Ship has finished refueling, and will be ready for takeoff once enough players have received clearance.");
			}
		}
		if(z.threatsModule && z.round === 2){
			let threats = [0,0,0,1,1,3];
			if(!z.noExposure){
				threats.push(2);
			} else if (z.numPlayers === 7) {
				threats.push(0);
			}
			shuffle(threats);
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(!z.revealed[j]){
					z.threats.push(threats.pop());
				} else {
					z.threats.push(-1);
				}
			}
			boldAlert("A Threat card has been dealt to each player.");
			addAlert("You received "+threatName(z.threats[me])+".");
		}
	}
	
	t.value += gameState();
	
	addAlert("It is now "+z.characters[z.turn]+"'s turn.");
	
	if(z.turn === z.commander && !z.commanderDieInHand){
		z.commanderDieInHand = true;
		plainAlert("Commander "+z.characters[z.turn]+" retrieves the Commander die.");
	}
	if(z.redPool + z.blackPool === 0){
		plainAlert(z.characters[z.turn] + " retrieves no dice, as there are none available.");
		z.options[z.turn].push("Perform an Action");
		if(!z.revealed[z.turn] && (!z.quarantined[z.turn] || z.flimsyQuarantine)){
			z.options[z.turn].push("Draw Task Cards");
		}
	} else if(z.blackDice[z.turn] + z.redDice[z.turn] === dieLimit(z.turn)){
		plainAlert(z.characters[z.turn] + " is at their die limit, and retrieves no dice.");
		z.options[z.turn].push("Perform an Action");
		if(!z.revealed[z.turn] && (!z.quarantined[z.turn] || z.flimsyQuarantine)){
			z.options[z.turn].push("Draw Task Cards");
		}
	} else if(z.redPool === 0){
		let available = z.blackPool;
		let need = dieLimit(z.turn) - z.blackDice[z.turn] - z.redDice[z.turn];
		if(need > available){
			need = available;
		}
		plainAlert("There are no Weak dice available, so "+z.characters[z.turn]+" retrieves "+need+" Strong "+dieDice(need)+".");
		z.blackDice[z.turn] += need;
		z.blackPool -= need;
		z.options[z.turn].push("Perform an Action");
		if(!z.revealed[z.turn] && (!z.quarantined[z.turn] || z.flimsyQuarantine)){
			z.options[z.turn].push("Draw Task Cards");
		}
	} else if(z.blackPool === 0){
		let available = z.redPool;
		let need = dieLimit(z.turn) - z.blackDice[z.turn] - z.redDice[z.turn];
		if(need > available){
			need = available;
		}
		z.redDice[z.turn] += need;
		z.redPool -= need;
		plainAlert("There are no Strong dice available, so "+z.characters[z.turn]+" retrieves "+need+" Weak "+dieDice(need)+".");
		z.options[z.turn].push("Perform an Action");
		if(!z.revealed[z.turn] && (!z.quarantined[z.turn] || z.flimsyQuarantine)){
			z.options[z.turn].push("Draw Task Cards");
		}
	} else {
		z.options[z.turn].push("Retrieve Dice");
	}
}

function completeEvent(){
	if(z.eventNumber === 3){
		boldAlert("The Final Event has been completed!");
		endGame();
		return 0;
	}
	boldAlert("The current Event, "+eventName(z.events[z.eventNumber])+", is complete!");
	let done = true;
	switch(z.events[z.eventNumber]){
	case 0: /* Blood Testing */ {
		let canQuarantine = false;
		let canRelease = false;
		for(let j = 0; !(j >= z.numPlayers); j++){
			if(!z.revealed[j]){
				if(z.quarantined[j]){
					canRelease = true;
				} else {
					canQuarantine = true;
				}
			}
		}
		boldAlert("Commander "+z.characters[z.commander]+" must Quarantine a player or release a player from Quarantine.");
		if(canQuarantine){
			addOption(z.commander,"[Blood Testing] Quarantine a player");
		}
		if(canRelease){
			addOption(z.commander,"[Blood Testing] Release a player from Quarantine");
		}
		done = false;
	break; }
	case 1: /* Divert Power */
		if(z.shieldDamage === 5 && !z.deadlyEvents){
			plainAlert("Damage from Event completion cannot end the game; no shield damage applied.");
		} else if(z.shieldDamage === 4 && !z.deadlyEvents){
			plainAlert("Damage from Event completion cannot end the game; only 1 shield damage is applied.");
			done = damageShields(1);
		} else {
			done = damageShields(2);
		}
		break;
	case 4: /* Lockdown */
		if(z.outpostDamage.length === 5 && !z.deadlyEvents){
			plainAlert("Damage from Event completion cannot end the game; no Outpost damage applied.");
		} else if(z.shieldDamage === 4 && !z.deadlyEvents){
			plainAlert("Damage from Event completion cannot end the game; only 1 Outpost damage is applied.");
			damageOutpost();
		} else {
			damageOutpost();
			damageOutpost();
		}
		break;
	case 5: {/* Pass Command */
		/* RULES: What if the Commander is the only player not in Quarantine? */
		let canPass = false;
		for(let j = 0; !(j>=z.numPlayers) && !canPass; j++){
			canPass = z.commander !== j && !z.quarantined[j] && !z.revealed[j];
		}
		if(canPass || z.quarantined[z.commander]){
			boldAlert("The Commander must pass their title to another player.");
			addOption(z.commander,"[Pass Command] Give the Commander card to another player");
			done = false;
		} else {
			plainAlert("All other uninfected players are quarantined; the Commander title cannot be passed.");
		}
	break; }
	case 6: /* Reboot Shields */
		z.rebootShields = 3;
		if(z.shieldDamage === 0){
			done = damageShields(2);
		} else if(z.shieldDamage !== 5 || z.deadlyEvents){
			done = damageShields(1);
		} else {
			plainAlert("Damage from Event completion cannot end the game; no Shield damage applied.");
			done = testShields();
		}
		if(done){
			z.rebootShields--;
			done = testShields();
		}
		if(done){
			z.rebootShields--;
			done = testShields();
		}
		if(done){
			z.rebootShields--;
		}
		break;
	case 9: /* Rescue Crewman */
		if(z.fatigueDamage.length === 5 && !z.deadlyEvents){
			plainAlert("Damage from Event completion cannot end the game; no Life Support damage applied.");
		} else if(z.fatigueDamage === 4 && !z.deadlyEvents){
			plainAlert("Damage from Event completion cannot end the game; only 1 Life Support damage is applied.");
			damageLifeSupport();
		} else {
			damageLifeSupport();
			damageLifeSupport();
		}
		break;
	case 10: /* Restore Comm */
		if(z.redPool === 0 && z.blackPool === 0 && z.commanderDieInHand){
			plainAlert("There are no available dice for anyone to retrieve.");
		} else if(z.redPool === 0 && z.blackPool === 0){
			plainAlert("Only the Commander die is available to retrieve.");
			addOption(z.commander,"[Restore Comm] Retrieve the Commander die");
			addOption(z.commander,"[Restore Comm] Do not retrieve the Commander die");
			done = false;
		} else {
			/* ASSUMPTION: an event may not end on a revealed player's turn */
			boldAlert("All players, starting with "+z.characters[z.turn]+", may retrieve dice up to their hand limit.");
			addOption(z.turn,"[Restore Comm] Retrieve Dice");
			done = false;
		}
		break;
	case 11: /* Resupply */
		if(z.shieldDamage === 0 && z.fatigueDamage.length === 0 && z.outpostDamage.length === 0){
			plainAlert("Nice Work! There are no damage tokens to remove.");
		} else {
			boldAlert("The Commander may repair all damage of 1 type.");
			addOption(z.commander,"[Resupply] Repair all damage of 1 type");
			addOption(z.commander,"[Resupply] Choose not to repair damage");
			done = false;
		}
		break;
	case 12: {/* Salvage Parts */
		let outpostCount = z.outpostDamage.length;
		let fatigueCount = z.fatigueDamage.length;
		while(z.outpostDamage.length > 0){
			z.outpostPool.push(z.outpostDamage.pop());
		}
		shuffle(z.outpostPool);
		while(z.fatigueDamage.length > 0){
			let healed = z.fatigueDamage.pop();
			unfatigue(healed);
			z.fatiguePool.push(healed);
		}
		shuffle(z.fatiguePool);
		plainAlert("All Outpost and Life Support damage shuffled.");
		for(let j = 0; !(j>=outpostCount); j++){
			damageOutpost();
		}
		for(let j = 0; !(j>=fatigueCount); j++){
			damageLifeSupport();
		}
	break; }
	case 13: /* System Crash */
		if(z.outpostDamage.length === 5 && !z.deadlyEvents){
			plainAlert("Damage from Event completion cannot end the game; no Outpost damage applied.");
		} else {
			damageOutpost();
		}
		if(z.fatigueDamage.length === 5 && !z.deadlyEvents){
			plainAlert("Damage from Event completion cannot end the game; no Life Support damage applied.");
		} else {
			damageLifeSupport();
		}
		if(z.shieldDamage === 5 && !z.deadlyEvents){
			plainAlert("Damage from Event completion cannot end the game; no Shield damage applied.");
		} else {
			done = damageShields(1);
		}
		break;
	case 14: /* System Reboot */
		z.systemReboot = [5,3,3,3];
		if(z.shieldDamage > 2 && !z.deadlyEvents){
			z.systemReboot[1] = 5 - z.shieldDamage;
		}
		if(z.outpostDamage.length > 2 && !z.deadlyEvents){
			z.systemReboot[2] = 5 - z.outpostDamage.length;
		}
		if(z.fatigueDamage.length > 2 && !z.deadlyEvents){
			z.systemReboot[3] = 5 - z.fatigueDamage.length;
		}
		if(z.systemReboot[0] > z.systemReboot[1] + z.systemReboot[2] + z.systemReboot[3]){
			z.systemReboot[0] = z.systemReboot[1] + z.systemReboot[2] + z.systemReboot[3];
		}
		if(z.systemReboot[0] === 0){
			plainAlert("Damage from Event completion cannot end the game; no Shield damage applied.");
			doneWithEvent();
		} else {
			/* RULES: I can draw them one at a time? */
			done = false;
			boldAlert("The Commander must draw 5 damage tokens, no more than 3 of any one kind.");
			addOption(z.commander,"[System Reboot] Draw a damage token");
		}
		break;
	case 15: /* Tactical Prep */
		boldAlert("An Event cube is placed on the Final Event.");
		z.cubes[3]++;
		break;
	case 16: /* Accelerated Evac */
		if(fullShip()){
			plainAlert("The Evacuation ship is already full; the Commander may not grant clearance to another player.");
		} else {
			let allInQuarantine = true;
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(!z.revealed[j] && !z.cleared[j] && !z.quarantined[j]){
					allInQuarantine = false;
				}
			}
			if(allInQuarantine){
				plainAlert("All players not already on the Evacuation ship are in Quarantine, and the Commander may not grant them clearance.");
			} else {
				boldAlert("The Commander must approve Evacuation Clearance for one player.");
				addOption(z.commander,"[Accelerated Evac] Approve Evacuation Clearance for a player");
				done = false;
			}
		}
		break;
	case 17: /* Accident */ {
		let couldAmputate = false;
		for(let j = 0; !(j>=z.numPlayers) && !couldAmputate; j++){
			couldAmputate = !z.revealed[j] && !z.amputated[j];
		}
		if(!couldAmputate){
			plainAlert("All players already have an Amputation token.");
		} else {
			boldAlert("Commander "+z.characters[z.commander]+" must choose a player to amputate.");
			addOption(z.commander,"[Accident] Choose a player to amputate");
			done = false;
		}
	break; }
	case 20: /* Electrical Fire */
		if(z.amputated[z.turn]){
			plainAlert(z.characters[z.turn]+", already has an Amputation token and cannot receive another.");
		} else {
			boldAlert(z.characters[z.turn] + " is amputated!");
			done = amputate(z.turn);
		}
		break;
	case 22: { /* Evac Lottery */
		let num = numCleared();
		if(num === 0){
			plainAlert("Nobody has Evacuation Clearance; no effect.");
		} else {
			let clearancePool = [];
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(z.cleared[j]){
					plainAlert(z.characters[j] +" no longer has Evacuation Clearance (for now).");
					z.cleared[j] = false;
				}
				if(!z.revealed[j] && !z.quarantined[j]){
					clearancePool.push(j);
				}
			}
			shuffle(clearancePool);
			for(let j = 0; !(j>=num); j++){
				boldAlert(z.characters[clearancePool[j]] +" now has Evacuation Clearance.");
				z.cleared[clearancePool[j]] = true;
			}
		}
	break; }
	case 23: {/* Hold Trials */
		z.holdTrials = [true,true,true];
		let couldAmputate = false;
		for(let j = 0; !(j>=z.numPlayers) && !couldAmputate; j++){
			couldAmputate = !z.revealed[j] && !z.amputated[j];
		}
		if(!couldAmputate){
			boldAlert("Commander "+z.characters[z.commander]+" must hold Quarantine and Clearance votes, in any order.");
			z.holdTrials[0] = false;
		} else {
			boldAlert("Commander "+z.characters[z.commander]+" must hold Amputation, Quarantine and Clearance votes, in any order.");
			addOption(z.commander,"Hold Amputation Vote");
		}
		addOption(z.commander,"Hold Clearance Vote");
		addOption(z.commander,"Hold Quarantine Vote");
		done = false;
		break;
	}
	case 24: /* Risk Assessment */
		boldAlert("The next event requires an extra Task cube.");
		break;
	}
	
	
	if(done && !z.gameOver){
		doneWithEvent();
	}
}

function canCallAmputateVote(player){
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(!z.revealed[j] && !z.amputated[j] && j !== player){
			return true;
		}
	}
	return false;
}

function advanceVoteTracks() {
	if(z.currentTask === -1){
		return true;
	}
	if(suspiciousActivity(z.currentTask) && !allRevealed()){
		z.suspicion++;
		if(4 > z.suspicion){
			plainAlert("The Suspicion Cube advances to space "+z.suspicion+" on the track.");
		} else {
			boldAlert("The Suspicion Cube advances to VOTE.");
		}
	}
	if(z.shadowCorporation && !z.evacuationFailure && evacuateEvacuate(z.currentTask)){
		z.evacuation++;
		if(4 > z.evacuation){
			plainAlert("The Evacuation Cube advances to space "+z.evacuation+" on the track.");
		} else {
			boldAlert("The Evacuation Cube advances to VOTE.");
		}
	}
	if(z.suspicion === 4 && z.evacuation === 4){
		if( readyForTakeOff() ){
			boldAlert("A Quarantine and Clearance / Take Off vote must both be held. "+z.characters[z.turn]+", as active player, chooses the order and target (if any).");
			addOption(z.turn,"Hold Quarantine Vote");
			addOption(z.turn,"Hold Clearance Vote");
			addOption(z.turn,"Hold Take Off Vote");
		} else {
			boldAlert("A Quarantine and Clearance vote must both be held. "+z.characters[z.turn]+", as active player, chooses the order and target.");
			addOption(z.turn,"Hold Quarantine Vote");
			addOption(z.turn,"Hold Clearance Vote");
		}
		return false;
	} else if(z.suspicion === 4){
		boldAlert("A Quarantine vote must be held. "+z.characters[z.turn]+", as active player, chooses the target.");
		addOption(z.turn,"Hold Quarantine Vote");
		return false;
	} else if(z.evacuation === 4){
		if(readyForTakeOff()){
			boldAlert("A Clearance or Take Off vote must be held. "+z.characters[z.turn]+", as active player, chooses the type of vote and target (if any).");
			addOption(z.turn,"Hold Clearance Vote");
			addOption(z.turn,"Hold Take Off Vote");
		} else {
			boldAlert("A Clearance vote must both be held. "+z.characters[z.turn]+", as active player, chooses the target.");
			addOption(z.turn,"Hold Clearance Vote");
		}
		return false;
	}
	return true;
}

function playerNum(character){
	return z.characters.indexOf(character);
}

function endGame(){
	z.gameOver = true;
	let winners = "";
	if(z.shieldDamage >= 6){
		boldAlert("Complete Shield Failure!");
		winners = "Infected";
	} else if(z.outpostDamage.length >= 6){
		boldAlert("Permanent System Failure!");
		winners = "Infected";
	} else if(z.fatigueDamage.length >= 6){
		boldAlert("Total Crew Catatonia!");
		winners = "Infected";
	} else if(z.cubes[z.eventNumber] === currentEventLength()){
		if(z.statusCards.includes(5)){
			let amputee = -1;
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(z.amputated[j]){
					amputee = j;
					break;
				}
			}
			if(amputee !== -1){
				boldAlert("Sample retrieved from "+z.characters[amputee]+"!");
				winners = "Company Man";
			}
		}
		if(winners === "" && z.finalEvent === "Protect Self-Destruct Codes" && ((z.statusCards[z.commander] > 0 && 5 > z.statusCards[z.commander]) || z.fatigued[z.commander])){
			boldAlert("Self-Destruct in 3...2...1...");
			winners = "Infected";
		}
		if(winners === "" && z.threatsModule && z.round > 1){
			for(let j = 0; !(j>=z.numPlayers) ; j++){
				if(z.statusCards[j] === 0 && z.threatTokens[j] === -1){
					boldAlert("Dependent Health Care Plan initiated for Employee: "+z.characters[j]);
					winners = "Infected";
					break;
				}
			}
		}
		if(winners === ""){
			boldAlert("You survived!  Bonus hazard pay has already been credited to your account.");
			winners = "Uninfected";
		}
	} else {
		let escapee = -1;
		for(let j = 0; !(j>=z.numPlayers); j++){
			if(z.cleared[j] && z.statusCards[j] > 0 && 5 > z.statusCards[j]){
				escapee = j;
				break;
			}
		}
		if(escapee === -1){
			boldAlert("We're so relieved you escaped!  Bonus hazard pay has already been credited to your account.");
			winners = "Uninfected";
		} else if(z.statusCards.includes(5)){
			boldAlert("We're so relieved you succeeded!  Bonus hazard pay has already been credited to your account.");
			boldAlert("Specimen "+z.characters[escapee]+" secured.");
			winners = "Company Man";
		} else {
			boldAlert("We're so relieved you escaped!  Bonus hazard pay has already been credited to your account.");
			boldAlert(z.characters[escapee]+", is there someth---GET IT OFF GET IT---");
			winners = "Infected";
		}
	}
	
	if(winners === "Infected"){	
		t.value += "\r\n"+size(bold(colorText("red","The Infected Team Wins!")),14)+"\r\n\r\n";
		addAlert("The Infected Team Wins!");
		for(let j = 0; !(j>=z.numPlayers); j++){
			if(z.statusCards[j] > 0 && 5 > z.statusCards[j]){
				boldAlert(z.characters[j] + " wins!");
			}
		}
	} else if(winners === "Uninfected"){	
		t.value += "\r\n"+size(bold(colorText("blue","The Uninfected Team Wins!")),14)+"\r\n\r\n";
		addAlert("The Uninfected Team Wins!");
		for(let j = 0; !(j>=z.numPlayers); j++){
			if(z.statusCards[j] === 0){
				boldAlert(z.characters[j] + " wins!");
			}
		}
	} else if(winners === "Company Man"){	
		t.value += "\r\n"+size(bold(colorText("green","The Company Man Wins!")),14)+"\r\n\r\n";
		addAlert("The Company Man Wins!");
		for(let j = 0; !(j>=z.numPlayers); j++){
			if(z.statusCards[j] === 5){
				boldAlert(z.characters[j] + " wins!");
			}
		}
	}
	
}


function damageOutpost(){
	let dam = z.outpostPool.pop();
	boldAlert("Outpost damaged: "+dam+" token drawn.");
	z.outpostDamage.push(dam);
	if(z.outpostDamage.length === 6){
		endGame();
	}
}

function unfatigue(healed){
	if(z.characters.includes(healed) && z.fatigued[playerNum(healed)]){
		z.fatigued[playerNum(healed)] = false;
		plainAlert(healed + " is no longer fatigued.");
	}
}

function fatigue(dam){
	if(z.characters.includes(dam) && !z.revealed[playerNum(dam)]){
		z.fatigued[playerNum(dam)] = true;
		boldAlert(dam + " is now Fatigued.");
	}
}

function damageLifeSupport(){
	let dam = z.fatiguePool.pop();
	boldAlert("Life Support damaged: "+dam+" token drawn.");
	fatigue(dam);
	z.fatigueDamage.push(dam);
	if(z.fatigueDamage.length === 6){
		endGame();
	}
}

function getDieRoll(){
	let roll = z.dieRolls.pop();
	z.dieRolls.unshift(Math.floor(Math.random() * 6));
	return roll;
}

function revealAgain(){
	if(z.gameOver){
		return 0;
	}
	z.justRevealed = false;
	let roll = getDieRoll();
	if(roll >= 4){
		boldAlert(z.characters[z.revealer] + " rolled a positive number, and activates their reveal power a second time!");
		revealPower();
	} else {
		boldAlert(z.characters[z.revealer] + " rolled a negative number, and does not activate their reveal power a second time.");
		doneWithRevealPower();
	}
}

function testShields(){
	if(z.shieldDamage === 0 || z.shieldDamage === 1){
		plainAlert("Shield Test automatically passes.");
	}
	/* ASSUMPTION: If there are no dice available, we assume we roll the Commander die to preserve secrecy */
	let roll = getDieRoll();
	let failed = (roll === 3 && (z.shieldDamage === 2 || z.shieldDamage === 5)) || (roll >= 4 && z.shieldDamage === 3) || (2 >= roll && z.shieldDamage >= 4);
	if(failed){
		boldAlert("The Shield Test Fails!");
		plainAlert(z.characters[z.turn]+", as active player, must choose whether to damage Life Support or the Outpost.");
		addOption(z.turn,"[Shield Test Failure] Damage Life Support");
		addOption(z.turn,"[Shield Test Failure] Damage Outpost");
		return false;
	} else {
		boldAlert("The Shield Test succeeds.");
	}
	return true;
}

function damageShields(num){
	if(awaitRescue()){
		num++;
	}
	if(num === 1){
		boldAlert("The shields are damaged once.");
	} else {
		boldAlert("The shields are damaged "+num+" times.");
	}
	z.shieldDamage+=num;
	if(z.shieldDamage >= 6){
		endGame();
		return false;
	}
	boldAlert("Shield Damage is now at "+z.shieldDamage+".");
	return testShields();
}

function doneWithAction(){
	if(z.gameOver){
		
	} else if(z.xoTarget >= 0){
		addOption(z.xoTarget,"Perform an Action");
		z.xoTarget = -1;
	} else if ((z.quarantined[z.turn] && !z.flimsyQuarantine) || z.revealed[z.turn]){
		endTurn();
	} else {
		z.revealer = -1;
		plainAlert(z.characters[z.turn]+" must now choose a Task card.");
		drawTaskCards();
	}
}

function doneSelectingEvent(){
	if(z.eventNumber === 0){
		/* Start of game */
		endTurn();
	} else if (z.currentTask !== -1 ){
		if(advanceVoteTracks()){
			endTurn();
		}
	} else {
		/* Lone Wolf */
		doneWithAction();
	}
}


/* it is promised */
function selectEvent(){
	let promptText = "Which event would you like to select (1-2)?\n";
	promptText += "1: "+eventName(z.eventDeck[0])+"\n";
	promptText += "2: "+eventName(z.eventDeck[1]);
	promptNum(promptText,(n) => (1 > n || n > 2),mainMenu,function(choice){
		if (choice === 1) {
			z.events[z.eventNumber+1] = z.eventDeck.shift();
			z.eventDeck.push(z.eventDeck.shift());
		} else {
			z.eventDeck.push(z.eventDeck.shift());
			z.events[z.eventNumber+1] = z.eventDeck.shift();
		}
		z.eventNumber++;
		removeOption(z.commander,"Select a new Event");
		boldAlert("The new Event is "+eventName(z.events[z.eventNumber])+".");
		if(z.events[z.eventNumber] === 7) {  /* Recovery */
			damageLifeSupport();
			if(z.gameOver){
				saveAndQuit();
				return;
			}
			if(z.fatigueDamage.length === 1){
				damageLifeSupport();
			}
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(z.fatigued[j]){
					if(j === z.commander && z.commanderDieInHand){
						z.commanderDieInHand = false;
						plainAlert(z.characters[j] + " discards the Commander die.");
					}
					if(z.blackDice[j] > 0){
						plainAlert(z.characters[j] + " discards "+z.blackDice[j]+" Strong "+dieDice(z.blackDice[j])+".");
						z.blackPool += z.blackDice[j];
						z.blackDice[j] = 0;
					}
					if(z.redDice[j] > 0){
						plainAlert(z.characters[j] + " discards "+z.redDice[j]+" Weak "+dieDice(z.redDice[j])+".");
						z.redPool += z.redDice[j];
						z.redDice[j] = 0;
					}
				}
			}
		}
		doneSelectingEvent();
		mainMenu();
	});
}


function dieLimit(num){
	if(1 > z.dieLimit[num]){
		return 1;
	} else {
		return z.dieLimit[num];
	}
}

function allRevealed() {
	let numRevealed = 0;
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(z.revealed[j]){
			numRevealed++;
		}
	}
	if(numRevealed === 3){
		return true;
	}
	if(6 >= z.numPlayers && numRevealed === 2){
		return true;
	}
	if(4 >= z.numPlayers && numRevealed === 1){
		return true;
	}
	return false;
}


function foodRationing(){
	return 3 > z.eventNumber && z.eventNumber >= 0 && z.events[z.eventNumber] === 2;
}

/* promised.  returns a promise. */
function retrieveDice(num){
	return new Promise((resolve,reject) => {
		let realNum = num;
		let drawLimit = dieLimit(me) - z.blackDice[me] - z.redDice[me];
		let redAvailable = z.redPool;
		let blackAvailable = z.blackPool;
		if(foodRationing()){
			blackAvailable -= z.numPlayers;
			if(0 > blackAvailable){
				blackAvailable = 0;
			}
		}
		let diceAvailable = redAvailable + blackAvailable;
		let commanderAvailable = me === z.commander && !z.commanderDieInHand;
		if(commanderAvailable){
			diceAvailable++;
			drawLimit++;
		}
		let redRetrieved = 0;
		let blackRetrieved = 0;
		let commanderRetrieved = false;
		if(realNum > diceAvailable){
			realNum = diceAvailable;
		}
		if(realNum >= drawLimit){
			realNum = drawLimit;
			if(commanderAvailable){
				addAlert("You automatically retrieve the Commander die.");
				commanderRetrieved = true;
				commanderAvailable = false;
				realNum--;
			}
		}

		function retrieveADie(j){
			if(j === 0){
				let confirmText = "Confirming you want to retrieve "+blackRetrieved+" Strong (black) and "+redRetrieved+" Weak (red) dice";
				if(commanderRetrieved){
					confirmText += ", along with the Commander (blue) die";
				}
				confirmify(confirmText+".",reject,function(){
					z.blackDice[me] += blackRetrieved;
					z.blackPool -= blackRetrieved;
					if(blackRetrieved === 1){
						boldAlert(z.characters[me] + " retrieves a Strong die.");
					} else if (blackRetrieved > 1){
						boldAlert(z.characters[me] + " retrieves "+blackRetrieved+" Strong dice.");
					}
					z.redDice[me] += redRetrieved;
					z.redPool -= redRetrieved;
					if(redRetrieved === 1){
						boldAlert(z.characters[me] + " retrieves a Weak die.");
					} else if (redRetrieved > 1){
						boldAlert(z.characters[me] + " retrieves "+redRetrieved+" Weak dice.");
					}
					if(commanderRetrieved){
						z.commanderDieInHand = true;
						boldAlert(z.characters[me] + " retrieves the Commander die.");
					}
					resolve();
				});
			} else if(redAvailable === 0 && !commanderAvailable){
				blackAvailable--;
				blackRetrieved++;
				retrieveADie(j-1);
			} else if(blackAvailable === 0 && !commanderAvailable){
				redAvailable--;
				redRetrieved++;
				retrieveADie(j-1);
			} else {
				let promptText = "You have "+(z.redDice[me]+redRetrieved)+" Weak (red) "+dieDice(z.redDice[me]+redRetrieved);
				promptText += " and "+(z.blackDice[me]+blackRetrieved)+" Black (strong) "+dieDice(z.blackDice[me]+blackRetrieved);
				if(me === z.commander && z.commanderDieInHand){
					promptText += ", along with the Commander (blue) die";
				}
				promptText += ".\nThere are "+redAvailable+" Weak (red) and "+blackAvailable+" Strong (black) dice available";
				if(commanderAvailable){
					promptText += ", along with the Commander (blue) die";
				}
				promptText+=".\nYou may retrieve "+realNum+" "+dieDice(realNum)+".\nWhich type of die would you like to retrieve now?\n1: ";
				if(redAvailable === 0){
					promptText += "(no Weak dice available)\n";
				} else {
					promptText += "Weak (red)";
				}
				if(blackAvailable === 0){
					promptText += "\n2: (no Strong dice available)\n";
				} else {
					promptText += "\n2: Black (strong)";
				}
				if(commanderAvailable){
					promptText += "\n3: Commander (blue)";
				}
				promptNum(promptText,(a)=>1>a || a > 3 || ((a===3 && !commanderAvailable) || (a === 1 && redAvailable === 0) || (a === 2 && blackAvailable === 0)),
				()=>{
					addAlert("Die retrieval cancelled; any retrieved dice returned to the available pool.");
					reject();
				},function(choice){
					switch(choice){
						case 2:
						blackAvailable--;
						blackRetrieved++;
						break;
						case 1:
						redAvailable--;
						redRetrieved++;
						break;
						case 3:
						commanderRetrieved = true;
						commanderAvailable = false;			
					}	
					retrieveADie(j-1);
				});
			}
		}
		
		retrieveADie(realNum);		
		
	});
}

function amUnrevealed(){
	return z.statusCards[me] >=1 && 4 >= z.statusCards[me] && !z.revealed[me];
}



function theirDice(them){
	let dice = z.blackDice[them] + z.redDice[them];
	if(them === z.commander && z.commanderDieInHand){
		dice++;
	}
	return dice;
}

function myDice() {
	return theirDice(me);
}

function repairTools(){
	return 3 > z.eventNumber && z.eventNumber >= 0 && z.events[z.eventNumber] === 8;
}

function jerryRigShields(){
	return 3 > z.eventNumber && z.eventNumber >= 0 && z.events[z.eventNumber] === 3;
}

function corporateBribery(){
	return 3 > z.eventNumber && z.eventNumber >= 0 && z.events[z.eventNumber] === 18;
}

function voteTampering(){
	return (3 > z.eventNumber && z.eventNumber >= 0 && z.events[z.eventNumber] === 25) || z.expensiveVoting || (z.expensiveAmputation && z.voteType === 2);
}

function electricalStorm(){
	return 3 > z.eventNumber && z.eventNumber >= 0 && z.events[z.eventNumber] === 21;
}

function corporateRaid(){
	return 3 > z.eventNumber && z.eventNumber >= 0 && z.events[z.eventNumber] === 19;
}

function dieValue(pair,real){
	if(pair[0] === 3){
		switch(pair[1]){
			case 1:
			case 2:
			if(real && corporateBribery()){
				return -2;
			}
			return -1;
			case 3:
			case 4:
			return -2;
			case 5:
			return -3;
			default:
			return 0;
		}
	}
	if(3 > pair[1]){
		return -2;
	}
	if(3 === pair[1]){
		if(real && corporateBribery()){
			return -2;
		}
		return -1;
	}
	if(4 === pair[1]){
		return 1 + pair[0];
	}
	if(5 === pair[1]){
		return 3 + pair[0];
	}
}

function rollReport(){
	let str = "";
	for(let j = 0; !(j>=z.rolled.length); j++){
		str += "\n"+(j+1)+": "+dieText(z.rolled[j]);
	}
	return str;
}

/* 0: Lone Wolf, 1: Shields, 2: Outpost, 3: Life Support */
/* promised */
function repairAction(loc){
	let blackRolled = 0;
	let redRolled = 0;
	let commanderRolled = false;
	let commanderAvailable = me === z.commander && z.commanderDieInHand && (!repairTools() || loc === 0);
	let maxRolled = 3;
	if(repairTools() && loc !== 0 && 3 > z.redDice[me]){
		maxRolled = z.redDice[me];
	} else if(3 > myDice()){
		maxRolled = myDice();
	}
	
	function chooseADie(j){
		if(j > maxRolled){
			let confirmText = "Confirming you want to roll "+blackRolled+" Strong (black) and "+redRolled+" Weak (red) dice";
			if(commanderRolled){
				confirmText += ", along with the Commander die";
			}
			confirmify(confirmText+".",performAction,function(){
				z.roller = me;
				z.rolled = [];
				for(let j = 0; !(j>=redRolled); j++){
					z.rolled.push([0,getDieRoll()]);
				}
				for(let j = 0; !(j>=blackRolled); j++){
					z.rolled.push([1,getDieRoll()]);
				}
				if(commanderRolled){
					z.rolled.push([2,getDieRoll()]);
				}
				addAlert("You rolled:"+rollReport());	
				switch(loc){
					case 0:
					boldAlert(z.characters[me] + " attempts to Lone Wolf.");
					addOption(me,"[Lone Wolf] Submit two dice");
					break;
					case 1:
					boldAlert(z.characters[me] + " attempts to Repair Shields.");
					addOption(me,"[Repair Shield] Submit a die");
					break;
					case 2:
					boldAlert(z.characters[me] + " attempts to Repair Outpost.");
					addOption(me,"[Repair Outpost] Submit a die");
					break;
					case 3:
					boldAlert(z.characters[me] + " attempts to Repair Life Support.");
					addOption(me,"[Repair Life Support] Submit a die");
					break;
				}
				if(z.characters[me] === "Luba" && me === z.turn && z.luba && !z.fatigued[me]){
					addOption(me,"[Luba] Reroll your dice");
				}
				removeOption(me,"Draw Task Cards");
				removeOption(me,"Perform an Action");
				removeOption(me,"Retrieve 2 Dice");
				mainMenu();
			});
		} else {
			let promptText = "Choose a die to roll ("+j+"/"+maxRolled+"):\n1: ";
			if(z.redDice[me] - redRolled === 0){
				promptText += "[You have no Weak (red) dice remaining]";
			} else {
				promptText += "Weak (red) [You have "+(z.redDice[me]-redRolled)+" remaining]";
			}
			promptText += "\n2: ";
			if(z.blackDice[me] - blackRolled === 0){
				promptText += "[You have no Strong (black) dice remaining]";
			} else if (repairTools() && loc !== 0){
				promptText += "[REPAIR TOOLS]";
			} else {
				promptText += "Strong (black) [You have "+(z.blackDice[me]-blackRolled)+" remaining]";
			}
			if(me === z.commander){
				promptText += "\n3: ";
				if(commanderAvailable){
					promptText += "Commander (blue)";
				} else {
					promptText += "[Commander (blue) die not available]";
				}		
			}
			promptNum(promptText,(a) => 1>a||a>3||((a === 1 && z.redDice[me] - redRolled === 0) || (a === 2 && ((repairTools() && loc !== 0) || z.blackDice[me] - blackRolled === 0)) || (a === 3 && !commanderAvailable)),performAction,function(choice){
				if(choice === 1){
					redRolled++;
				} else if (choice === 2){
					blackRolled++;
				} else if(choice === 3){
					commanderAvailable = false;
					commanderRolled = true;
				}
				chooseADie(j+1);
			});	
		}
	}
	
	chooseADie(1);
}

function revealVotes(firstTime){
	removeOption(z.turn,"[Retrieve Sample] Claim a Threat Token");
	removeOption(z.turn,"[Isolate Specimen] Claim a Threat Token");
	removeOption(z.turn,"Do not claim a Threat Token");
	removeFromAll("Reveal All Votes");
	removeFromAll("Change Your Vote");
	let redVotes = 0;
	let blackVotes = 0;
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(z.revealed[j]){
			continue;
		}
		switch(z.votes[j]){
			case 0:
			if(firstTime){
				boldAlert(z.characters[j] + " voted with a Weak die.");
			}
			redVotes++;
			break;
			case 1:
			if(firstTime){
				boldAlert(z.characters[j] + " voted with a Strong die.");
			}
			blackVotes++;
			break;
			case 2:
			if(firstTime){
				boldAlert(z.characters[j] + " abstained.");
			}
			break;
		}
	}
	if(firstTime && voteTampering()){
		if(!z.expensiveVoting && !z.expensiveAmputation){
			plainAlert("Due to Vote Tampering, all dice used in the voting are now submitted.");
		} else {
			plainAlert("All dice used in the voting are submitted.");
		}
		for(let j = 0; !(j>=z.numPlayers); j++){
			if(z.votes[j] === 0){
				z.redDice[j]--;
				z.redPool++;
			} else if (z.votes[j] === 1){
				z.blackDice[j]--;
				z.blackPool++;
			}
		}
	}
	if(firstTime && z.voteCaller === z.turn && z.voteTarget !== z.turn && z.threatsModule && z.threatTokens[z.turn] === -1 && z.votes[z.turn] === 0 && z.round > 1 && (z.voteType === 0 || z.voteType === 2) ){
		plainAlert("Pausing for a word from our Corporate sponsors.");
		addOption(z.turn,"Do not claim a Threat Token");
		if(z.voteType === 2 && z.voteTarget !== z.turn && (z.threats[z.turn] === 0 || z.statusCards[z.turn] > 0)){
			addOption(z.turn,"[Retrieve Sample] Claim a Threat Token");
		} else if(z.voteType === 0 && z.voteTarget !== z.turn && (z.threats[z.turn] === 3 || z.statusCards[z.turn] > 0)){
			addOption(z.turn,"[Isolate Specimen] Claim a Threat Token");
		}
	} else {
		if(redVotes === blackVotes){
			boldAlert("The vote is a tie. Commander "+z.characters[z.commander]+" must break it.");
			addOption(z.commander,"Break the tied vote");
		} else if (redVotes > blackVotes){
			resolveVote(0);
		} else {
			resolveVote(1);
		}
		/* RULES: If a vote result reduces your die limit (by quarantine or amputation) while Vote Tampering is in effect, can you discard the submitted die to go down to your hand limit?  We assume you can. */
	}
}

/* promised */
function issueOrder(){
	let promptText = "Who would you like to Issue an Order to? (1-"+z.numPlayers+")";
	for(let j = 0; !(j>=z.numPlayers); j++){
		promptText += "\n"+(j+1)+": ";
		if(z.revealed[j]){
			promptText += "[INFECTED]";
		} else if (j === me){
			promptText += "[Cannot Order Yourself Around]";
		} else {
			promptText += z.characters[j];
		}
	}
	promptNum(promptText,(a)=>1>a||a>z.numPlayers || (z.revealed[a-1] || a-1 === me),performAction,function(choice){
		boldAlert(z.characters[me] +" Issues an Order to "+z.characters[choice-1]+"; they may retrieve two dice or perform two actions.");
		addOption(choice-1,"Perform an Action");
		if(z.redDice[choice-1] + z.blackDice[choice-1] !== dieLimit(choice-1) || (choice - 1 === z.commander && !z.commanderDieInHand)){
			addOption(choice-1,"Retrieve 2 Dice");
		}
		z.xoTarget = choice - 1;
		removeOption(me,"Draw Task Cards");
		removeOption(me,"Perform an Action");
		removeOption(me,"Retrieve 2 Dice");
		mainMenu();
	});
}

function doneWithRevealPower(){
	if(z.gameOver){
	} else if(z.blackDice[z.revealer] + z.redDice[z.revealer] > dieLimit(z.revealer)){
		plainAlert(z.characters[z.revealer] + " must discard down to their new die limit.");
		addOption(z.revealer,"[Reveal as Infected] Discard a die"); 
	} else {
		doneWithAction();
	}
}

function revealPower(){
	switch(z.statusCards[z.revealer]){
		case 1:
		if(damageShields(1)){
			if(z.justRevealed && !z.nerfedRevealNormal){
				revealAgain();
			} else {
				doneWithRevealPower();
			}
		}
		break;
		case 3:
			addOption(z.revealer,"Draw 2 Fatigue Tokens and choose 1 to place");
			break;
		case 2:
			addOption(z.revealer,"Draw 2 Outpost Tokens and choose 1 to place");
			break;
		case 4:
			if(z.evacuationFailure){
				plainAlert(z.characters[z.revealer] + " cannot use their reveal power as the Evacuation Ship has been recalled.");
				doneWithRevealPower();
			} else {
				let canApprove = false;
				let canDeny = false;
				for(let j = 0; !(j>=z.numPlayers); j++){
					if(!z.revealed[j] && !z.quarantined[j]){
						if(z.cleared[j]){
							canDeny = true;
						} else {
							canApprove = true;
						}
					}
				}
				if(!canApprove && !canDeny){
					plainAlert(z.characters[z.revealer] + " cannot use their reveal power as all remaining players are Quarantined.");
					doneWithRevealPower();
				}
				if(canApprove){
					addOption(z.revealer,"Approve Evacuation Clearance for 1 player");
				}
				if(canDeny){
					addOption(z.revealer,"Deny Evacuation Clearance for 1 player");
				}
			}
		
	}
	
}

function rebuildTaskDeck(){
	shuffle(z.taskDiscards);
	z.taskDeck = z.taskDiscards.concat(z.taskDeck);
	z.taskDiscards = [];
	plainAlert("The Task Deck reshuffles.");
}

function evacuationShipRecalled(){
	boldAlert("The Noguchi Masaki Interplanetary Mining Corporation, due to budgetary cutbacks, has recalled the Evac Ship sent to Titan Outpost.");
	boldAlert("Good Luck.");
	z.evacuationFailure = true;
	z.evacuation = 0;
	for(let j = 0; !(j>=z.numPlayers); j++){
		z.cleared[j] = false;
	}
}

function interference(){
	confirmify("Confirming you want to use the Interference action.",performAction,function(){
		removeOption(me,"Draw Task Cards");
		removeOption(me,"Perform an Action");
		removeOption(me,"Retrieve 2 Dice");
		if(3 > z.taskDeck.length){
			rebuildTaskDeck();
		}
		/* RULES: Does Interference trigger Evacuation Ship Recall? */
		let alertText = "You draw the following Tasks:";
		for(let j = 1; !(j>3); j++){
			if(z.taskDeck[z.taskDeck.length - j] === 23){
				z.taskDeck.splice(z.taskDeck.length-j,1);
				if(3 > z.taskDeck.length){
					rebuildTaskDeck();
				}
				evacuationShipRecalled();
			}
			alertText += "\n" + alertTaskName(z.taskDeck[z.taskDeck.length - j]);
		}
		alertText += "\nYou may now discard as many as you like then return the rest to the top of the deck in an order of your choosing.";
		addAlert(alertText);
		t.value += bold(z.characters[me] + " performs Interference.")+"\r\n";
		addOption(me,"[Interference] Discard or return Tasks");
		mainMenu();
	});
}

function taskSucceeds(){
	if(jerryRigShields() && !z.jerryRig){
		if(!testShields()){
			z.jerryRig = true;
			return 0;
		}
	} else if(explosions() && !z.explosions){
		/* RULES: is this after EVERY task, or every successfully completed task?  We assume the latter. */
		if(z.amputated[z.turn]){
			plainAlert(z.characters[z.turn] + " is already amputated.");
		} else {
			boldAlert(z.characters[z.turn] + " is amputated!");
			if(!amputate(z.turn)){
				z.explosions = true;
				return 0;
			}
		}
	}
	z.jerryRig = false;
	z.explosions = false;
	boldAlert("The Task is Successful! Event Cube added.");
	z.cubes[z.eventNumber]++;
	if(z.cubes[z.eventNumber] === currentEventLength()){
		completeEvent();
	} else if(advanceVoteTracks()){
		endTurn();
	}	
}

function taskFails(){
	if(!z.gameOver && advanceVoteTracks()){
		endTurn();
	}	
}

function voteToken(){
	let voteName = "";
	if(z.voteTarget !== -1){
		voteName += z.characters[z.voteTarget]+ ": ";
	}
	switch(z.voteType){
		case 0:
		voteName += "Quarantine Vote";
		break;
		case 1:
		voteName += "Clearance Vote";
		break;
		case 2:
		voteName += "Amputation Vote";
		break;
		case 3:
		voteName += "Take Off Vote";
	}
	let qre = new RegExp('\\[q'+bl+'="NMWS: ' + voteName + '"\\]((?!(\\[q'+bl+'=|\\[/q\\]))[\\s\\S])*\\[/q\\]', "g");
	t.value = t.value.replace(qre, "");
	let text = '[q='+bl+'"NMWS: ' + voteName + '"]\r\n';
	text += bold(size(voteName, 14)) + "\r\n";
	
	let nameReport = "";
	for (let j = 0; !(j >= z.numPlayers); j++) {
		nameReport += "\r\n" + characterImage(z.characters[j]);
	}
	let dieReport = "";	
	for (let j = 0; !(j >= z.numPlayers); j++) {
		dieReport += "\r\n";
		if(z.votes[j] >= 0){
			dieReport += imageO(4137601);
		} else if(z.revealed[j]) {
			dieReport += imageO(4137602);
		} else {
			dieReport += imageO(4137603);
		}
	}
	text += floatleft(nameReport) + floatleft(dieReport) + clear() + "\r\n\r\n";
	switch(z.voteType){
		case 0:
		text += "A "+colorText("red","Weak")+" die is a vote to put "+z.characters[z.voteTarget] + " into Quarantine.\r\n";
		text += "A Strong die is a vote to keep "+z.characters[z.voteTarget] + " out of Quarantine.";	
		break;
		case 1:
		text += "A "+colorText("red","Weak")+" die is a vote to deny Evacuation Clearance for "+z.characters[z.voteTarget] + ".\r\n";
		text += "A Strong die is a vote to approve Evacuation Clearance for "+z.characters[z.voteTarget] + ".";
		break;
		case 2:
		text += "A "+colorText("red","Weak")+" die is a vote to amputate "+z.characters[z.voteTarget] + ".\r\n";
		text += "A Strong die is a vote to leave "+z.characters[z.voteTarget] + " alone.";
		break;
		case 3:
		text += "A "+colorText("red","Weak")+" die is a vote to continue the game and keep the Evacuation Ship here.\r\n";
		text += "A Strong die is a vote to end the game by having the Evacuation Ship take off.";
	}
	if(voteTampering()){
		text += "\r\n\r\nAll dice used in this vote will be submitted.";
	}
	text += "[/"+"q]\r\n";

	t.value += text;
}

function submissionToken(){
	let qre = new RegExp('\\[q'+bl+'="NMWS: Malfunction Submissions"\\]((?!(\\[q'+bl+'=|\\[/q\\]))[\\s\\S])*\\[/q\\]', "g");
	t.value = t.value.replace(qre, "");
	let text = '[q='+bl+'"NMWS: Malfunction Submissions"]\r\n';
	text += bold(size("Submissions: "+taskName(z.currentTask), 14)) + "\r\n";

	let nameReport = "";
	if(z.shadowCorporation && !electricalStorm()){
		nameReport += "\r\n"+imageO(4137573)+"\r\n"+"Noguchi Masaki";
	}
	for (let j = 0; !(j >= z.numPlayers); j++) {
		let k = (z.turn + j)%z.numPlayers;
		if(z.firstIsLast){
			k = (k + 1) % z.numPlayers;
		}
		nameReport += "\r\n" + characterImage(z.characters[k]) + "\r\n" + displayUsername(k);
	}
	let dieReport = "";
	
	if(z.shadowCorporation && !electricalStorm()){
		dieReport += "\r\n"+diePicture(z.corporateDie);
		if(corporateRaid()){
			dieReport+=diePicture(z.corporateDie2);
		}
		dieReport+="\r\n ";
	}
	
	
	for (let j = 0; !(j >= z.numPlayers); j++) {
		let k = (z.turn + j)%z.numPlayers;
		if(z.firstIsLast){
			k = (k + 1) % z.numPlayers;
		}
		dieReport += "\r\n";
		if(z.participation[k] === 0){
			dieReport += imageO(4137558);
		} else if(z.submissions[k].length > 0) {
			for(let l = 0; !(l>=z.submissions[k].length); l++){
				dieReport += diePicture(z.submissions[k][l]);
			}
		} else if(z.fatigued[k] || (z.revealed[k] && z.fatiguedInfected)){
			dieReport += imageO(4135346);
		} else {
			dieReport += imageO(4137571);
		}
		dieReport += "\r\n ";
	}
	text += floatleft(center(nameReport)) + floatleft(dieReport) + clear() + "\r\n\r\n";
	if(corporateBribery()){
		text += "Reminder: Corporate Bribery: All submitted -1's count as -2's.\r\n\r\n";
	}
	if(z.malfunctionTotal >= malfunctionDifficulty(z.currentTask)){
		text += bold(size(colorText("green","Total: "+z.malfunctionTotal+" vs. Target: "+malfunctionDifficulty(z.currentTask)),12));
	} else {
		text += bold(size(colorText("red","Total: "+z.malfunctionTotal + " vs. Target: "+malfunctionDifficulty(z.currentTask)),12));
	}
	text += "[/"+"q]\r\n";

	t.value += text;
}

function participationToken(){
	let qre = new RegExp('\\[q'+bl+'="NMWS: Malfunction Participation"\\]((?!(\\[q'+bl+'=|\\[/q\\]))[\\s\\S])*\\[/q\\]', "g");
	t.value = t.value.replace(qre, "");
	let text = '[q='+bl+'"NMWS: Malfunction Participation"]\r\n';
	text += bold(size("Participation: "+taskName(z.currentTask), 14)) + "\r\n";
	let nameReport = "";
	for (let j = 0; !(j >= z.numPlayers); j++) {
		let k = (z.turn + j)%z.numPlayers;
		if(z.firstIsLast){
			k = (k + 1) % z.numPlayers;
		}
		nameReport += "\r\n" + characterImage(z.characters[k]) + "\r\n" + displayUsername(k);
	}
	let dieReport = "";	
	for (let j = 0; !(j >= z.numPlayers); j++) {
		let k = (z.turn + j)%z.numPlayers;
		if(z.firstIsLast){
			k = (k + 1) % z.numPlayers;
		}
		dieReport += "\r\n";
		if(z.participation[k] === 0){
			dieReport += imageO(4137558);
		} else if(z.participation[k] === 1) {
			dieReport += imageO(4137557);
		} else {
			dieReport += imageO(4137571);
		}
		dieReport += "\r\n ";
	}
	text += floatleft(center(nameReport)) + floatleft(dieReport) + clear();
	text += "[/"+"q]\r\n";

	t.value += text;
}


function rollAllDice(player){
	z.roller = player;
	z.rolled = [];
	for(let j = 0; !(j>=z.redDice[player]); j++){
		z.rolled.push([0,getDieRoll()]);
	}
	for(let j = 0; !(j>=z.blackDice[player]); j++){
		z.rolled.push([1,getDieRoll()]);
	}
	if(player === z.commander && z.commanderDieInHand){
		z.rolled.push([2,getDieRoll()]);
	}
	if(player === me){
		addAlert("You rolled: "+rollReport());
	}
}

function resolveMalfunction(){
	if(z.malfunctionTotal >= malfunctionDifficulty(z.currentTask)){
		boldAlert("The Task Succeeds!");
		if(malfunctionPassEffect(z.currentTask)){
			/* RULES: are pass effects optional? */
			switch(z.taskType){
				case 'S':
				if(z.shieldDamage === 0){
					plainAlert("There is no Shield Damage to remove.");
					taskSucceeds();
				} else {
					boldAlert(z.characters[z.turn] + ", as active player, may remove a Shield Token.");
					addOption(z.turn,"Remove a Shield Token");
					addOption(z.turn,"Do not remove a token");
				}
				break;
				case 'O':
				if(z.outpostDamage.length === 0){
					plainAlert("There is no Outpost Damage to remove.");
					taskSucceeds();
				} else {
					boldAlert(z.characters[z.turn] + ", as active player, may remove an Outpost Token.");
					addOption(z.turn,"Remove an Outpost Token");
					addOption(z.turn,"Do not remove a token");
				}
				break;
				case 'L':
				if(z.fatigueDamage.length === 0){
					plainAlert("There is no Fatigue Damage to remove.");
					taskSucceeds();
				} else {
					boldAlert(z.characters[z.turn] + ", as active player, may remove a Fatigue Token.");
					addOption(z.turn,"Remove a Fatigue Token");
					addOption(z.turn,"Do not remove a token");
				}
				break;
			}
		} else {
			taskSucceeds();
		}
	} else {
		boldAlert("The Task Fails!");
		switch(z.taskType){
			case 'S':
			if(damageShields(malfunctionConsequence(z.currentTask))){
				taskFails();
			}
			break;
			case 'O': {
			let numDamage = malfunctionConsequence(z.currentTask);
			if(escape()){
				numDamage++;
			}
			for(let j = 0; !(j>=numDamage) && !z.gameOver; j++){
				damageOutpost();
			}
			if(!z.gameOver){
				taskFails();
			}
			break; }
			case 'L': {
			let numDamage = malfunctionConsequence(z.currentTask);
			if(findCure()){
				numDamage++;
			}
			for(let j = 0; !(j>=numDamage) && !z.gameOver; j++){
				damageLifeSupport();
			}
			if(!z.gameOver){
				taskFails();
			}
			}
		}
		
	}
}

function startSubmissions(){
	let nextPlayer = -1;
	for(let j = 0; !(j>=z.numPlayers); j++){
		let k = (j + z.turn) % z.numPlayers;
		if(z.firstIsLast){
			k = (k + 1) % z.numPlayers;
		}
		if(z.participation[k] === 1){
			nextPlayer = k;
			break;
		}
	}
	if(nextPlayer === -1){
		boldAlert("Nobody participated; the Task automatically fails.");
		resolveMalfunction();
	} else {
		submissionToken();
		rollAllDice(nextPlayer);
		addOption(nextPlayer,"Submit a die");
		if(z.turn === nextPlayer && z.characters[nextPlayer] === "Luba" && !z.fatigued[nextPlayer] && !z.revealed[nextPlayer] && z.luba){
			addOption(nextPlayer,"[Luba] Reroll your dice");
		}
	}
}


function startParticipation(){
	participationToken();
	let k = z.turn;
	if(z.firstIsLast){
		k = (k + 1) % z.numPlayers;
	}
	if(theirDice(k) > 0){
		addOption(k,"Go IN for this Malfunction");
	}
	addOption(k,"Be OUT for this Malfunction");
}


function startMalfunction(){
	z.malfunctionTotal = 0;
	if(!z.shadowCorporation || electricalStorm()){
		startParticipation();
	} else {
		z.roller = z.turn;
		z.rolled = [];
		let numRolled = 2;
		if(corporateRaid() || (z.characters[z.turn] === "Serene" && !z.fatigued[z.turn])){
			numRolled++;
		}
		for(let j = 0; !(j>=numRolled); j++){
			z.rolled.push([3,getDieRoll()]);
		}
		plainAlert(z.characters[me] + " rolls "+numRolled+" Corporate (yellow) dice.");
		if(z.turn === me){
			addAlert("You rolled:"+rollReport());
		}
		addOption(z.turn,"Submit Corporate Die");
		if(z.characters[z.turn] === "Luba" && !z.fatigued[z.turn] && z.luba){
			addOption(z.turn,"[Luba] Reroll your dice");
		}
	}
}

function startTask(){
	t.value += "\r\n\r\n[ima" +"geid=" + 4137612 + " medium]\r\n\r\n";
	t.value += size(bold(taskName(z.currentTask)),14)+"\r\n\r\n";
	if(taskType(z.currentTask) === '?'){
		plainAlert(z.characters[z.turn] + ", as active player, must choose which type of Malfunction this is.");
		addOption(z.turn,"Choose Malfunction type");
	} else if(taskType(z.currentTask) !== 'C'){
		z.taskType = taskType(z.currentTask);
		startMalfunction();
	} else {
		switch(z.currentTask){
			case 14: /* Acceptable Loss */
			if(z.shieldDamage === 5 && z.outpostDamage.length === 5 && z.fatigueDamage.length === 5){
				boldAlert("The Task automatically succeeds.");
				taskSucceeds();
			} else {
				boldAlert(z.characters[z.turn] + ", as active player, must draw a damage token.");
				if(z.shieldDamage !== 5){
					addOption(z.turn,"[Acceptable Loss] Damage Shields");
				}
				if(z.outpostDamage.length !== 5){
					addOption(z.turn,"[Acceptable Loss] Damage Outpost");
				}
				if(z.fatigueDamage.length !== 5){
					addOption(z.turn,"[Acceptable Loss] Damage Life Support");
				}
			}
			break;
			case 15:
			case 16: /* Act of Trust */
			boldAlert(z.characters[z.turn] + " must choose another player to target.");
			addOption(z.turn,"[Act of Trust] Choose a target");
			break;
			case 17: /* Failure to Lead */
			let allInQuarantine = true;
			for(let j = 0; !(j>=z.numPlayers) && allInQuarantine; j++){
				if(j === z.commander){
					continue;
				}
				allInQuarantine = z.revealed[j] || z.quarantined[j];
			}
			/* RULES: If the Commander is the only person not in quarantine, what happens?  We assume the task automatically succeeds. */
			if(allInQuarantine){
				boldAlert("The Commander title cannot be passed; the Task automatically succeeds.");
				taskSucceeds();
				break;
			}
			/* ASSUMPTION: Since we're doing a task, there's at least one person out of quarantine */
			boldAlert(z.characters[z.turn] + ", as active player, must nominate a new Commander.");
			addOption(z.turn,"[Failure to Lead] Nominate a new Commander");
			break;
			case 18: /* Mandatory Quarantine */
			boldAlert(z.characters[z.turn] + ", as active player, must start a Quarantine vote.");
			addOption(z.turn,"Hold Quarantine Vote");
			break;
			case 21: /* Vote for Clearance */
			boldAlert(z.characters[z.turn] + ", as active player, must start a Clearance vote.");
			addOption(z.turn,"Hold Clearance Vote");
			break;
			case 22: /* Cut it Off! */
			boldAlert(z.characters[z.turn] + ", as active player, must start an Amputation vote.");
			addOption(z.turn,"Hold Amputation Vote");
			break;
			case 19: /* Strategic Compromise */
			z.strategicCompromise = 0;
			z.strategicCompromiseShieldDamage = false;
			if(z.shieldDamage === 0 && z.outpostDamage.length === 0 && z.fatigueDamage.length === 0){
				plainAlert("There is no damage to remove.");
				plainAlert(z.characters[z.turn] + ", as active player, must draw 2 damage tokens.");
				addOption(z.turn,"[Strategic Compromise] Damage Shields");
				addOption(z.turn,"[Strategic Compromise] Damage Outpost");
				addOption(z.turn,"[Strategic Compromise] Damage Life Support");
			} else {
				plainAlert(z.characters[z.turn] + ", as active player, must remove a damage token.");
				if(z.shieldDamage > 0){
					addOption(z.turn,"[Strategic Compromise] Remove a Shield Token");
				}
				if(z.outpostDamage.length > 0){
					addOption(z.turn,"[Strategic Compromise] Remove an Outpost Token");
				}
				if(z.fatigueDamage.length > 0){
					addOption(z.turn,"[Strategic Compromise] Remove a Fatigue Token");
				}
			}
			break;
			case 20: /* Voluntary Blood Testing */
			boldAlert(z.characters[z.turn] + " must choose another player to target.");
			addOption(z.turn,"[Voluntary Blood Testing] Choose a target");
			break;
		}
		
	}
}

/* 0: Quarantine, 1: Clearance, 2: Amputation, 3: Take Off */
function startVote(type,target,caller){
	z.voteType = type;
	z.voteTarget = target;
	z.voteCaller = caller;
	z.votes = [];
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(!z.revealed[j]){
			addOption(j,"Cast Your Vote");
			if(z.voteType === 1 && z.characters[j] === "Lincoln" && z.lincoln && !z.fatigued[j]){
				addOption(j,"[Lincoln] Decide outcome of Clearance vote");
			}
		}
		z.votes.push(-1);
	}
	voteToken();
}

/* promised, returns promise */
function callQuarantineVote(){
	return new Promise((resolve,reject) => {
		let promptText = "Who would you like to call a Quarantine vote on? (1-"+z.numPlayers+")";
		for(let j = 0; !(j>=z.numPlayers); j++){
			promptText += "\n"+(j+1)+": ";
			if(z.revealed[j]){
				promptText += "[INFECTED]";
			} else {
				promptText += z.characters[j];
			}
		}
		promptNum(promptText,(a)=>1>a||a>z.numPlayers||z.revealed[a-1],reject,function(choice){
			startVote(0,choice-1,me);
			resolve();
		});	
	});
}

/* promised, returns promise */
function callClearanceVote(){
	return new Promise((resolve,reject) => {
		let promptText = "Who would you like to call a Clearance vote on? (1-"+z.numPlayers+")";
		for(let j = 0; !(j>=z.numPlayers); j++){
			promptText += "\n"+(j+1)+": ";
			if(z.revealed[j]){
				promptText += "[INFECTED]";
			} else if (z.quarantined[j]){
				promptText += "[QUARANTINED]";
			} else {
				promptText += z.characters[j];
			}
		}
		promptNum(promptText,(a)=>1>a||a>z.numPlayers||z.revealed[a-1] || z.quarantined[a-1],reject,function(choice){
			startVote(1,choice-1,me);
			resolve();
		});
	});
	
}

/* promised, returns promise */
function callAmputationVote(){
	return new Promise((resolve,reject) => {
		let promptText = "Who would you like to call an Amputation vote on? (1-"+z.numPlayers+")";
		for(let j = 0; !(j>=z.numPlayers); j++){
			promptText += "\n"+(j+1)+": ";
			if(z.revealed[j]){
				promptText += "[INFECTED]";
			} else if (z.amputated[j]){
				promptText += "[AMPUTATED]";
			} else {
				promptText += z.characters[j];
			}
		}
		promptNum(promptText,(a)=>1>a||a>z.numPlayers || z.revealed[a-1] || z.amputated[a-1],reject,function(choice){
			startVote(2,choice-1,me);
			resolve();
		});
	});
}

/* promised, returns promise */
function callTakeOffVote(){
	return new Promise((resolve,reject) => {
		confirmify("Confirming you want to call a Take Off vote.  If the vote passes, the game will end.",reject,function(){
			startVote(3,-1,me);
			resolve();
		});
	});
}

/* promised */
function performAction(){
	let options = [];
	if(!z.revealed[me]){
		let canRepair = !z.quarantined[me] && myDice() > 0;
		if(repairTools() && z.redDice[me] === 0){
			/* Repair Tools */
			canRepair = false;
		}
		if(z.shieldDamage > 0 && !z.outpostDamage.includes("Shield Control")  && canRepair){
			options.push("Repair Shield");			/* DONE */
		}
		if(z.fatigueDamage.length > 0 && !z.outpostDamage.includes("Life Support") && canRepair){
			options.push("Repair Life Support");	/* DONE */
		}
		if(z.outpostDamage.length > 0 && canRepair){
			options.push("Repair Outpost");			/* DONE */
		}
		if(!z.outpostDamage.includes("Research Lab")){
			options.push("Call Quarantine Vote");
		}
		/* RULES: can you call amputation / clearance / takeoff votes from quarantine? */
		if(z.shadowCorporation && !z.outpostDamage.includes("Evac Ship") && !z.evacuationFailure){
			options.push("Call Clearance Vote");
		}
		if(z.shadowCorporation && !z.outpostDamage.includes("Evac Ship") && readyForTakeOff()){
			options.push("Call Take Off Vote");
		}
		if(z.shadowCorporation && canCallAmputateVote(me)){
			options.push("Call Amputation Vote");
		}
		if(!z.outpostDamage.includes("Hangar") && !z.quarantined[me] && myDice() > 1){
			options.push("Lone Wolf");				/* DONE */
		}
		if(!z.outpostDamage.includes("Communications") && me === z.turn){
			options.push("Issue Order");			/* DONE */
		}
		if(amUnrevealed() && (me === z.turn || !z.safeOrders)){
			options.push("Reveal as Infected");		/* DONE */
		}
	} else if(!z.costlyActions || z.costPaid) {
		options.push("Interference");				/* DONE */
		options.push("Energy Spike");				/* DONE */
		options.push("Sabotage");					/* DONE */
		options.push("Test Commander");				/* DONE */
		options.push("Demoralize");					/* DONE */
	} else if(z.redDice[me] > 0 || z.blackDice[me] > 0){
		options.push("[Costly Actions] Submit a die");
	}
	if(!z.costPaid){
		options.push("Choose not to perform an action");
	}
	let promptText = "Which action would you like to perform? (1-"+options.length+")";
	for(let j = 0; !(j>=options.length); j++){
		promptText += "\n"+(j+1)+": "+options[j];
	}
	promptNum(promptText,(a)=>(1 > a || a > options.length),mainMenu,function(choice){
		switch(options[choice-1]){
			case "[Costly Actions] Submit a die": {
				if(z.redDice[me] === 0){
					confirmify("Confirming you want to submit a Strong (black) die to take an action.",performAction,()=>{
						z.blackDice[me]--;
						z.blackPool++;
						plainAlert(z.characters[me] + " submits a Strong (black) die to perform an action.");
						z.costPaid = true;
						performAction();
					});
				} else if(z.blackDice[me] === 0){
					confirmify("Confirming you want to submit a Weak (red) die to take an action.",performAction,()=>{
						z.redDice[me]--;
						z.redPool++;
						plainAlert(z.characters[me] + " submits a Weak (red) die to perform an action.");
						z.costPaid = true;
						performAction();
					});
				} else {
					let promptText = "Which type of die would you like to submit to take an action? (1-2):\n1: Weak (red)\n2: Strong (black)";
					promptNum(promptText,(a)=>(1>a||a>2),performAction,(choice)=>{
						if(choice === 1){
							z.redDice[me]--;
							z.redPool++;
							plainAlert(z.characters[me] + " submits a Weak (red) die to perform an action.");
						} else {
							z.blackDice[me]--;
							z.blackPool++;
							plainAlert(z.characters[me] + " submits a Strong (black) die to perform an action.");
						}
						z.costPaid = true;
						performAction();
					});
				}
				break;
			}
			case "Sabotage": {
				let promptText = "Where would you like to place the Sabotage token? (1-3)\n1: Shield Control\n2: Outpost Status\n3: Life Support";
				promptNum(promptText,(a)=>(1>a||a>3),performAction,function(choice){
					z.sabotage = choice;
					switch(choice){
						case 1:
						boldAlert(z.characters[me] + " Sabotages Shield Control.");
						break;
						case 2:
						boldAlert(z.characters[me] + " Sabotages Outpost Status.");
						break;
						case 3:
						boldAlert(z.characters[me] + " Sabotages Life Support.");
					}
					removeOption(me,"Draw Task Cards");
					removeOption(me,"Perform an Action");
					removeOption(me,"Retrieve 2 Dice");
					doneWithAction();
					mainMenu();
				});
				break; }
			case "Repair Shield":
				repairAction(1);
				break;
			case "Repair Outpost":
				repairAction(2);
				break;
			case "Repair Life Support":
				repairAction(3);
				break;
			case "Choose not to perform an action":
				if(z.xoTarget !== -1){
					confirmify("Confirming you want to waive both actions from Issue Order.",performAction,function(){
						z.xoTarget = -1;
						removeOption(me,"Draw Task Cards");
						removeOption(me,"Perform an Action");
						removeOption(me,"Retrieve 2 Dice");
						doneWithAction();
						mainMenu();
					});
				} else {
					confirmify("Confirming you want to waive your action",performAction,function(){
						removeOption(me,"Draw Task Cards");
						removeOption(me,"Perform an Action");
						removeOption(me,"Retrieve 2 Dice");
						doneWithAction();
						mainMenu();
					});
				} 
				break;
			case "Issue Order":
				issueOrder();
				break;
			case "Lone Wolf":
				repairAction(0);
				break;
			case "Energy Spike":
				confirmify("Confirming you want to perform Energy Spike.",performAction,function(){
					removeOption(me,"Draw Task Cards");
					removeOption(me,"Perform an Action");
					removeOption(me,"Retrieve 2 Dice");
					t.value += bold(z.characters[me] + " performs Energy Spike.")+"\r\n";
					if(2 > z.shieldDamage){
						if(damageShields(1)){
							doneWithAction();
						}
					} else {
						if(testShields()){
							doneWithAction();
						}
					}
					mainMenu();
				});
				break;
			case "Reveal as Infected":
				confirmify("Confirming you want to Reveal as Infected.",performAction,function(){
					confirmify("Are you SURE you want to reveal as Infected?",performAction,function(){
						removeOption(me,"Draw Task Cards");
						removeOption(me,"Perform an Action");
						removeOption(me,"Retrieve 2 Dice");
						boldAlert(z.characters[me] + " reveals their Status card: "+loyaltyName(z.statusCards[me]));
						if(me === z.commander){
							passCommander(-1);
						}
						z.fatigued[me] = false;
						let wasQuarantined = z.quarantined[me];
						z.quarantined[me] = false;
						z.cleared[me] = false;
						z.dieLimit[me] = 2;
						if(z.amputated[me]){
							z.dieLimit[me] = 1;
						}
						z.revealed[me] = true;
						if(allRevealed() && z.noMoreComplications && 3 > z.eventNumber){
							removeComplications();
						}
						updateBanner(me,defaultBanner(me));
						z.revealer = me;
						/* RULES: Do your dice reveal when you do? (As you're switching screens.) */
						if(z.nerfedRevealExtreme){
							plainAlert("Infected players do not get to use their reveal power in this game.");
							doneWithRevealPower();
						} else if(wasQuarantined){
							plainAlert(z.characters[me] + " was quarantined, and does not get to use their reveal power.");
							doneWithRevealPower();
						} else {
							z.justRevealed = true;
							revealPower();
							/* RULES: If you have the reveal power that lets you approve/deny clearance, do you still have clearance (and are thus taking up room on the boat) when you use it? */
						}
						mainMenu();
					});
				});
				break;
			case "Test Commander":
				confirmify("Confirming you want to Test Commander.",performAction,function(){
					removeOption(me,"Draw Task Cards");
					removeOption(me,"Perform an Action");
					removeOption(me,"Retrieve 2 Dice");
					boldAlert(z.characters[me] +" Tests the Commander.");
					if(z.blackDice[z.commander] + z.redDice[z.commander] === 0 && !z.commanderDieInHand){
						boldAlert("Commander "+z.characters[z.commander]+" has no dice, and automatically fails.");
						addOption(me,"[Test Commander] Damage Shields");
						addOption(me,"[Test Commander] Damage Outpost");
						addOption(me,"[Test Commander] Damage Life Support");
					} else {
						z.roller = z.commander;
						z.rolled = [];
						for(let j = 0; !(j>=z.redDice[z.commander]); j++){
							z.rolled.push([0,getDieRoll()]);
						}
						for(let j = 0; !(j>=z.blackDice[z.commander]); j++){
							z.rolled.push([1,getDieRoll()]);
						}
						if(z.commanderDieInHand){
							z.rolled.push([2,getDieRoll()]);
						}
						boldAlert("Commander "+z.characters[z.commander] +" rolls all their dice and must submit 1.");
						addOption(z.commander,"[Test Commander] Submit a die");
						if(z.commander === z.turn && z.characters[z.turn] === "Luba" && !z.fatigued[z.turn]){
							addOption(z.turn,"[Luba] Reroll your dice");
						}
					}
					mainMenu();
				});
				break;
			case "Demoralize":
				confirmify("Confirming you want to Demoralize.",performAction,function(){
					removeOption(me,"Draw Task Cards");
					removeOption(me,"Perform an Action");
					removeOption(me,"Retrieve 2 Dice");
					t.value += bold(z.characters[me] + " uses Demoralize.")+"\r\n";
					for(let j = me+1; j!==me; j++){
						j %= z.numPlayers;
						if(j === me){
							break;
						}
						if(z.revealed[j]){
							continue;
						}
						if(z.redPool > z.blackDice[j]){
							if(z.blackDice[j] === 1){
								boldAlert(z.characters[j] + " discards 1 Strong die and replaces it with 1 Weak die.");
							} else {
								boldAlert(z.characters[j] + " discards "+z.blackDice[j]+" Strong dice and replaces them with Weak dice.");	
							}				
							z.redDice[j] += z.blackDice[j];
							z.redPool -= z.blackDice[j];
							z.blackPool += z.blackDice[j];
							z.blackDice[j] = 0;
						} else {
							if(z.redPool === 1){
								boldAlert(z.characters[j] + " discards 1 Strong die and replaces it with 1 Weak die.");
							} else {
								boldAlert(z.characters[j] + " discards "+z.redPool+" Strong dice and replaces them with Weak dice.");	
							}	
							z.redDice[j] += z.redPool;
							z.blackDice[j] -= z.redPool;
							z.blackPool += z.redPool;
							z.redPool = 0;
							plainAlert("There are no Weak dice remaining in the pool.");
							break;
						}
					}
					doneWithAction();
					mainMenu();
				});
				break;
			case "Interference":
				interference();
				break;
			case "Call Quarantine Vote": 
				callQuarantineVote().then(()=>{
					removeOption(me,"Draw Task Cards");
					removeOption(me,"Perform an Action");
					removeOption(me,"Retrieve 2 Dice");
					mainMenu();
				},mainMenu);
				break; 
			case "Call Clearance Vote":
				callClearanceVote().then(()=>{
					removeOption(me,"Draw Task Cards");
					removeOption(me,"Perform an Action");
					removeOption(me,"Retrieve 2 Dice");
					mainMenu();
				},mainMenu);
				break;
			case "Call Amputation Vote":
				callAmputationVote().then(()=>{
					removeOption(me,"Draw Task Cards");
					removeOption(me,"Perform an Action");
					removeOption(me,"Retrieve 2 Dice");
					mainMenu();
				},mainMenu);
				break;
			case "Call Take Off Vote":
				callTakeOffVote().then(()=>{
					removeOption(me,"Draw Task Cards");
					removeOption(me,"Perform an Action");
					removeOption(me,"Retrieve 2 Dice");
					mainMenu();
				},mainMenu);
				break;
		}
	});
	
}

function passCommander(newCommander){
	let oldCommander = z.commander;
	if(newCommander !== -1 && newCommander !== z.commander){	
		z.commander = newCommander;
		updateBanner(z.commander,defaultBanner(z.commander));
		updateBanner(oldCommander,defaultBanner(oldCommander));
		boldAlert(z.characters[newCommander]+" is now the Commander.");
		if(z.commanderDieInHand){
			z.commanderDieInHand = false;
			plainAlert("The Commander die is returned to the pool.");
		}
	} else {
		for(let j = z.commander+1; j!=z.commander; j++){
			if(j === z.numPlayers){
				j = 0;
			}
			if(!z.quarantined[j] && !z.revealed[j]){
				z.commander = j;
				updateBanner(z.commander,defaultBanner(z.commander));
				updateBanner(oldCommander,defaultBanner(oldCommander));
				boldAlert(z.characters[j]+" is now the Commander.");
				if(z.commanderDieInHand){
					z.commanderDieInHand = false;
					plainAlert("The Commander die is returned to the pool.");
				}
				return 0;
			}
		}
		if(z.revealed[z.commander]){
			for(let j = z.commander+1; j!=z.commander; j++){
				if(j === z.numPlayers){
					j = 0;
				}
				if(!z.revealed[j]){
					z.commander = j;
					updateBanner(z.commander,defaultBanner(z.commander));
					updateBanner(oldCommander,defaultBanner(oldCommander));
					boldAlert(z.characters[j]+" is now the Commander.");
					if(z.commanderDieInHand){
						z.commanderDieInHand = false;
						plainAlert("The Commander die is returned to the pool.");
					}
					return 0;
				}
			}
		}
	}
	
}

function drawTaskCards(){
	let cardsToDraw = 2;
	if(z.characters[z.turn] === "Chaya" && !z.fatigued[z.turn]){
		cardsToDraw++;
	}
	if(cardsToDraw > z.taskDeck.length){
		rebuildTaskDeck();
	}
	for(let j = 1; !(j>cardsToDraw); j++){
		if(z.taskDeck[z.taskDeck.length - j] === 23){
			evacuationShipRecalled();
			z.taskDeck.splice(z.taskDeck.length-j,1);
			if(cardsToDraw > z.taskDeck.length){
				rebuildTaskDeck();
			}
			break;
		}
	}
	if(me === z.turn){
		let alertText = "You draw the following Tasks:";
		for(let j = 1; !(j>cardsToDraw); j++){
			alertText += "\n" + alertTaskName(z.taskDeck[z.taskDeck.length - j]);
		}
		alertText += "\nYou must now choose 1 task and discard the others.";
		addAlert(alertText);
	}
	addOption(z.turn,"Choose a Task Card");
}

function removeComplications(){
	let newTaskDeck = [];
	if(z.shadowCorporation){
		newTaskDeck.push(23);  /* Evacuation Failure */
	}
	while(z.taskDiscards.length > 0){
		let task = z.taskDiscards.pop();
		if(taskType(task) !== 'C'){
			newTaskDeck.push(task);
		}
	}
	while(z.taskDeck.length > 0){
		let task = z.taskDeck.pop();
		if(taskType(task) !== 'C'){
			newTaskDeck.push(task);
		}
	}
	z.taskDeck = newTaskDeck;
	shuffle(z.taskDeck);
	plainAlert("New Task Deck built; all Complications removed from the game.");
	if(z.shadowCorporation){
		plainAlert("Evacuation Failure card added to the Task deck.");
	}
}

function startFinalEvent(){
	z.eventNumber = 3;
	if(!z.noMoreComplications || !allRevealed()){
		removeComplications();
	}
	let done = true;
	if(z.finalEvent === "Last Stand"){ 
		boldAlert("All players' die limits are reduced by 1.");
		for(let j = 0; !(j>=z.numPlayers); j++){
			if(!z.revealed[j]){
				z.dieLimit[j]--;
				if(z.redDice[j] + z.blackDice[j] > dieLimit(j)){
					addOption(j,"[Last Stand] Discard a die");
					done = false;
				}
			}
		}
	} else if (z.finalEvent === "Toxic Gas") {  
		if(z.commanderDieInHand){
			z.commanderDieInHand = false;
			plainAlert("The Commander discards the Commander die.");
		}
		for(let j = 0; !(j >= z.numPlayers); j++){
			if(!z.revealed[j]){
				plainAlert(z.characters[j] + " discards "+z.blackDice[j]+" Strong "+dieDice(z.blackDice[j])+" and "+z.redDice[j]+" Weak "+dieDice(z.redDice[j])+".");
				z.blackPool += z.blackDice[j];
				z.redPool += z.redDice[j];
				z.blackDice[j] = 0;
				z.redDice[j] = 0;
			}
		}
	} else if (z.finalEvent === "Blackout"){
		boldAlert("The Difficulty of all Tasks is increased by 2.");
		plainAlert("Note that this difficulty increase will be automatically included in all Tasks seen from now on; the difficulty given for any Task card will include the +2 from Blackout."); 
	}
	if(done){
		doneSelectingEvent();	
	}
}


function doneWithEvent(){
	if(z.eventNumber === 2){
		startFinalEvent();
	} else {
		plainAlert("The Commander must select a new Event.");
		addOption(z.commander,"Select a new Event");
	}	
}


function quarantine(num,newCommander){
	z.quarantined[num] = true;
	if(z.cleared[num]){
		plainAlert(z.characters[num]+ " loses their Evacuation Clearance.");
		z.cleared[num] = false;
	}
	z.dieLimit[num]-=2;
	
	if(z.commander === num){
		passCommander(newCommander);
	}
	
	if(z.blackDice[num] + z.redDice[num] > dieLimit(num)){
		boldAlert(z.characters[num] + " is over their new die limit of "+dieLimit(num)+" and must discard.");
		addOption(num,"[Quarantine] Discard a die");
		return false;
	}
	return true;
}

function amputate(num){
	z.amputated[num] = true;
	z.dieLimit[num]--;
	
	if(z.blackDice[num] + z.redDice[num] > dieLimit(num)){
		boldAlert(z.characters[num] + " is over their new die limit of "+dieLimit(num)+" and must discard.");
		addOption(num,"[Amputation] Discard a die");
		return false;
	}
	return true;
}

function release(num){
	z.quarantined[num] = false;
	z.dieLimit[num]+=2;
	if(z.quarantined[z.commander]){
		passCommander(-1);
	}	
}

function dieText(pair){
	let str = "";
	switch(pair[0]){
		case 0:
		str += "Weak (red) ";
		break;
		case 1:
		str += "Strong (black) ";
		break;
		case 2:
		str += "Commander (blue) ";
		break;
		case 3:
		str += "Corporate (yellow) ";
		break;
	}
	let val = dieValue(pair,false);
	if(val > 0){
		str += "+";
	}
	str += val;
	/* RULES: Does Corporate Bribery affect Corporate dice? */
	if(corporateBribery() && dieValue(pair,false) === -1){
		str += " (counts as -2)";
	}
	return str;
}

function diePicture(pair){
	switch(pair[0]){
		case 0:
		switch(pair[1]){
			case 0:
			case 1:
			case 2:
			return imageO(4133859);
			case 3:
			return imageO(4133858);
			case 4:
			return imageO(4133864);
			case 5:
			return imageO(4133857);
		}
		break;
		case 1:
		switch(pair[1]){
			case 0:
			case 1:
			case 2:
			return imageO(4133850);
			case 3:
			return imageO(4133849);
			case 4:
			return imageO(4133847);
			case 5:
			return imageO(4133848);
		}
		break;
		case 2:
		switch(pair[1]){
			case 0:
			case 1:
			case 2:
			return imageO(4133855);
			case 3:
			return imageO(4133854);
			case 4:
			return imageO(4133852);
			case 5:
			return imageO(4133853);
		}
		break;
		case 3:
		switch(pair[1]){
			case 0:
			return imageO(4135430);
			case 1:
			case 2:
			return imageO(4135431);
			case 3:
			case 4:
			return imageO(4135432);
			case 5:
			return imageO(4135433);
		}
		break;
	}
}

function discardForSabotage(done){
	if(myDice() === 0 && done){
		plainAlert(z.characters[me] + " has no dice remaining, but the Sabotage token is still removed.");
		z.sabotage = 0;
	} else if(myDice() === 1 && done){
		if(z.redDice[me] === 1){
			boldAlert(z.characters[me] + " discards a Weak die.");
			z.redDice[me]--;
			z.redPool++;
		} else if (z.blackDice[me] === 1){
			boldAlert(z.characters[me] + " discards a Strong die.");
			z.blackDice[me]--;
			z.blackPool++;
		} else if (z.commanderDieInHand){
			boldAlert(z.characters[me] + " discards the Commander die.");
			z.commanderDieInHand = 0;
		}
		plainAlert(z.characters[me] + " had only one die remaining, but the Sabotage token is still removed.");
		z.sabotage = 0;
	} else {
		plainAlert(z.characters[me] + " must now discard 2 dice to remove the Sabotage token.");
		addOption(me,"[Sabotage] Discard 2 dice");
		return false;
	}
	return true;
}

function awaitRescue(){
	return z.eventNumber === 3 && z.finalEvent === "Await Rescue";
}

function findCure(){
	return z.eventNumber === 3 && z.finalEvent === "Find Cure";
}

function escape(){
	return z.eventNumber === 3 && z.finalEvent === "Escape";
}

function explosions(){
	return z.eventNumber === 3 && z.finalEvent === "Explosions";
}

function removeFromAll(opt){
	for(let j = 0; !(j>=z.numPlayers); j++){
		removeOption(j,opt);
	}
}

function optionForAll(opt){
	for(let j = 0; !(j>=z.numPlayers); j++){
		addOption(j,opt);
	}
}

function doneWithVote(){
	z.voteTarget = -1;
	z.votes = [];
	z.voteCaller = -1;
	if(z.voteType === 0 && z.suspicion === 4){
		z.voteType = -1;
		plainAlert("Suspicion Track reset.");
		z.suspicion = 1;
		if(z.evacuation === 4){
			if(readyForTakeOff()){
				boldAlert("A Clearance or Take Off vote must be held. "+z.characters[z.turn]+", as active player, chooses the type of vote and target (if any).");
				addOption(z.turn,"Hold Clearance Vote");
				addOption(z.turn,"Hold Take Off Vote");
			} else {
				boldAlert("A Clearance vote must both be held. "+z.characters[z.turn]+", as active player, chooses the target.");
				addOption(z.turn,"Hold Clearance Vote");
			}
		} else {
			endTurn();
		}
	} else if((z.voteType === 1 || z.voteType === 3) && z.evacuation === 4){
		z.voteType = -1;
		z.evacuation = 1;
		if(z.suspicion === 4){
			boldAlert("A Quarantine vote must be held. "+z.characters[z.turn]+", as active player, chooses the target.");
			addOption(z.turn,"Hold Quarantine Vote");
		} else {
			endTurn();
		}
	} else if(z.cubes[z.eventNumber] === currentEventLength()){
		z.voteType = -1;
		let anyVotes = z.holdTrials[0] || z.holdTrials[1] || z.holdTrials[2];
		if(anyVotes){
			plainAlert("The Commander must still call another vote for Hold Trials.");
			if(z.holdTrials[0]){
				addOption(z.commander,"Hold Amputation Vote");
			}
			if(z.holdTrials[1]){
				addOption(z.commander,"Hold Clearance Vote");
			}
			if(z.holdTrials[2]){
				addOption(z.commander,"Hold Quarantine Vote");
			}
		} else {
			doneWithEvent();
		}
	} else if(z.currentTask === 18 || z.currentTask === 21 || z.currentTask === 22){
		z.voteType = -1;
		/* resolved elsewhere; make sure we don't accidentally fall down */
	} else {
		z.voteType = -1;
		doneWithAction();
	}
	
	/* When can votes be held?
		Suspicion/Evacuation track hits 4.
		Hold Trials
		Mandatory Quarantine, Vote For Clearance, Cut It Off!
		As an Action
	*/
	
}

function resolveVote(outcome){
	let done = true;
	if(z.voteType === 0){
		if(outcome === 0){
			if(z.quarantined[z.voteTarget]){
				boldAlert(z.characters[z.voteTarget] + " remains in Quarantine.");
			} else {
				boldAlert(z.characters[z.voteTarget] + " is sent to Quarantine.");
				let newCommander = z.voteCaller;
				if(z.quarantined[z.voteCaller]){
					newCommander = -1;
				}
				done = quarantine(z.voteTarget,newCommander);
			}
			/* RULES: we assume discards occur before cube is placed */
			if(done && z.currentTask === 18){
				doneWithVote();
				taskSucceeds();
				done = false;
			}
		} else {
			if(z.quarantined[z.voteTarget]){
				boldAlert(z.characters[z.voteTarget] + " is released from Quarantine.");
				release(z.voteTarget);
			} else {
				boldAlert(z.characters[z.voteTarget] + " is not sent to Quarantine.");
			}
			if(z.currentTask === 18){
				damageLifeSupport();
				if(z.gameOver){
					return 0;
				}
				doneWithVote();
				taskFails();
				done = false;
			}
		}	
	} else if(z.voteType === 1){
		if(outcome === 0){
			if(z.cleared[z.voteTarget]){
				boldAlert(z.characters[z.voteTarget] + " loses their Evacuation Clearance.");
			} else {
				boldAlert(z.characters[z.voteTarget] + " does not receive Evacuation Clearance.");
			}
			z.cleared[z.voteTarget] = false;
			if(z.currentTask === 21){
				damageLifeSupport();
				if(z.gameOver){
					return 0;
				}
				doneWithVote();
				taskFails();
				done = false;
			}
		} else {
			if(z.cleared[z.voteTarget]){
				boldAlert(z.characters[z.voteTarget] + " keeps their Evacuation Clearance.");
			} else {
				boldAlert(z.characters[z.voteTarget] + " receives Evacuation Clearance.");
			}
			z.cleared[z.voteTarget] = true;
			if(z.currentTask === 21){
				doneWithVote();
				taskSucceeds();
				done = false;
			}
		}	
	} else if(z.voteType === 2){
		if(outcome === 0){
			
			let pound = false;
			if(z.threatsModule && z.poundOfFlesh && z.voteType === 2 && z.round > 1){
				for(let j = 0; !(j>=z.numPlayers); j++){
					if(z.threatTokens[j] === -1 && z.votes[j] === 0 && j !== z.voteTarget){
						pound = true;
						break;
					}
				}
			}
			if(pound){
				plainAlert("The amputation will come after a few words from our Corporate sponsors.");
				for(let j = 0; !(j>=z.numPlayers); j++){
					if(z.threatTokens[j] === -1 && z.votes[j] === 0 && j !== z.voteTarget){
						addOption(j,"[Pound of Flesh] Do not claim a Threat Token");
						if(z.threats[j] === 0 || z.statusCards[j] > 0){
							addOption(j,"[Pound of Flesh] Claim a Threat Token");
						}
					}
				}
				done = false;
			} else {
				boldAlert(z.characters[z.voteTarget] + " is amputated!");
				done = amputate(z.voteTarget);
				if(done && z.currentTask === 22){
					doneWithVote();
					taskSucceeds();
					done = false;
				}
			}
		} else {
			boldAlert(z.characters[z.voteTarget] + " is not amputated.");
			if(z.currentTask === 22){
				damageOutpost();
				if(z.gameOver){
					return 0;
				}
				doneWithVote();
				taskFails();
				done = false;
			}
		}	
	} else if (z.voteType === 3){
		if(outcome === 0){
			boldAlert("The Take Off vote fails.");
		} else {
			done = false;
			boldAlert("The Evacuation Ship takes off!");
			endGame();
		}
	}
	
	if(done){
		doneWithVote();
	}
	
}

function updateBanner(player,newBanner){
	let bannerRegExp = new RegExp("\\[ima" +bl+ "geid=" + z.banners[player] + " medium\\]","g");
	t.value = t.value.replace(bannerRegExp, ""); 
	z.banners[player] = newBanner;
}

function rareOptions(){
	let options = [];
	if(z.threatsModule && z.round > 1 && me === z.turn && !z.noExposure && z.threatTokens[z.turn] === -1 && !z.revealed[z.turn] && (z.threats[z.turn] === 2 || z.statusCards[z.turn] > 0)){
		options.push("[Exposure] Reveal your Status card to another player");
	}
	options.push("Change dialog display style");
	options.push("Change your default banner");
	options.push("Change your username");
	options.push("Check for NMWS updates");

	let promptText = "Which rarer option would you like to do?";
	for(let j = 0; !(j>=options.length); j++){
		promptText += "\n"+(j+1)+": "+options[j];
	}
	promptNum(promptText,(n)=>(1>n || n > options.length),mainMenu,function(choice){
		let ch = options[choice-1];
		switch(ch){
			case "Check for NMWS updates":
			confirmify(
				"Confirming you want to quit NMWS and apply any pending updates.\n\nYou probably don't want to do this unless you were instructed to do so.",
				mainMenu, () => {
					window.localStorage.setItem("nmwsUrgent", "requested");
					saveAndQuit();
				});
			case "[Exposure] Reveal your Status card to another player":
			confirmify("Are you SURE you want to reveal your Status card to another player?",rareOptions,function(){
				let promptText = "Who would you like to reveal your Status card to? (1-"+z.numPlayers+")";
				for(let j = 0; !(j>=z.numPlayers); j++){
					promptText += "\n"+(j+1)+": ";
					if(z.revealed[j]){
						promptText += "[INFECTED]";
					} else if (j === me){
						promptText += "[cannot choose yourself]";
					} else {
						promptText += z.characters[j];
					}
				}
				promptNum(promptText,(n)=>(1 > n || n > z.numPlayers || z.revealed[n-1] || n-1 === me),rareOptions,function(choice){
					boldAlert(z.characters[me] + " reveals their Status card to "+z.characters[choice-1]+".");
					z.secrets[choice-1].push(z.characters[me]+"'s Status card is: "+loyaltyName(z.statusCards[me]));
					boldAlert("I have done what the company has asked me to do.");
					if(z.threatTokenPool.includes(2)){
						z.threatTokenPool.splice(z.threatTokenPool.indexOf(2),1);
						z.threatTokens[me] = 2;
						plainAlert(z.characters[me] + " claims the Exposure Threat Token.");
					} else {
						z.threatTokenPool.splice(z.threatTokenPool.indexOf(4),1);
						z.threatTokens[me] = 4;
						plainAlert(z.characters[me] + " claims a Wild Threat Token, as there were no Exposure tokens available.");
					}
					rareOptions();
				});	
			});
			break;
			case "Change your default banner": {
			promptNum("What imageID would you like to use for your new banner?",(n)=>(0 > n),rareOptions,function(choice){
				updateBanner(me,choice);
				rareOptions();
			});
			break; }
			case "Change your username": {
			let confirmText = "Are you sure you want to change your username? You should only do this if:\n1) The person who set up the game misspelled your username.\n2) You are stepping down from the game and are handing control of your character to someone else";
			confirmify(confirmText,rareOptions,function(){
				promptString("What is the new BoardGameGeek username associated with this character?",rareOptions,function(prompted){
					z.usernames[me]=prompted;
					addAlert("Handing over control to "+prompted);
					t.value += "Handing over control of "+z.characters[me]+" to "+prompted+".\r\n";
					saveAndQuit();
					/* QUIT */
				});
			});
			break; }
			case "Change dialog display style": {
				let promptText = "Which style of dialog boxes would you like to use?";
				let styles = ["Classic","Modern"];
				for(let j = 0; !(j>=styles.length); j++){
					promptText += "\n"+(j+1)+": "+styles[j];
					if(z.promptStyle[me] === j){
						promptText += " (you're using this now)";
					}
				}
				promptNum(promptText,(a)=>1>a||a>styles.length,rareOptions,(choice)=>{
					if(choice - 1 !== z.promptStyle[me]){
						addAlert("Styles switched; reload NMWS to see the new style!");
						z.promptStyle[me] = choice - 1;
						saveAndQuit(); 
						/* QUIT */
					} else {
						addAlert("You chose not to switch styles.");
						rareOptions();
					}
				});
				break;
			}
		}
	});	
}

function saveAndQuit(){
	clearSpoilers();
	t.value += "[h"+"r]";
	postSeed();
	hideElement(alertifyBackground);
}

function handleMainMenuChoice(inputValue){
	if (inputValue === null) {
		saveAndQuit();
		/* QUIT */
	} else if (inputValue.slice(0,1) === "a" || inputValue.slice(0,1) === "A"){
		handReportAlert();
		mainMenu();
	} else if (inputValue.slice(0,1) === "b" || inputValue.slice(0,1) === "B"){
		t.value += gameState();
		saveAndQuit();
		/* QUIT */
	} else if (inputValue.slice(0,1) === "c" || inputValue.slice(0,1) === "C") {
		rareOptions();
	} else {
		let prompted = parseInt(inputValue);
		if(isNaN(prompted) || 0 >= prompted || prompted > z.options[me].length) {
			mainMenu();
		} else {
			mainMenuChoice(z.options[me][prompted-1]);
		}
	}
	
}

function mainMenu(){
	if(queuedPrompt.length > 0){
		alert("Error! Cannot queue multiple prompts");
	} else if(alertQueue.length > 0){
		queuedPrompt = ["mainMenu"];
	} else {
		let promptText = "What would you like to do? ";
		for(let j = 0; !(j>=z.options[me].length); j++){
			promptText += "\n"+(j+1)+": "+z.options[me][j];
		}
		promptText += "\nA: Private Game State Report\nB: Public Game State Report (and exit)";
		promptText += "\nC: [Rare Options]";
		if(0 > me || me >= z.numPlayers || z.promptStyle[me] === 0){
			handleMainMenuChoice(prompt(promptText));
		} else if(z.promptStyle[me] === 1){
			if(!mobile){
				alertify.prompt(promptText).then((arg)=>{
					arg.event.preventDefault();
					if(arg.buttonClicked === "cancel"){
						handleMainMenuChoice(null);
					} else {
						handleMainMenuChoice(arg.inputValue);
					}
				});
			} else {
				alertify.promptButton(promptText,(a)=>1>a||a>z.options.length).then((arg)=>{
					arg.event.preventDefault();
					if(arg.buttonClicked === "cancel"){
						handleMainMenuChoice(null);
					} else {
						handleMainMenuChoice(/^choice(.*)$/.exec(arg.buttonClicked)[1]);
					}
				});
			}
		}
	}
}

function doneWithShieldTest(){
	removeOption(me,"[Shield Test Failure] Damage Life Support");
	removeOption(me,"[Shield Test Failure] Damage Outpost");
	if(z.gameOver){
		saveAndQuit();
	}
	if(z.jerryRig){
		taskSucceeds();
	} else if(z.rebootShields > 0){
		z.rebootShields--;
		while(z.rebootShields > 0){
			if(testShields()){
				z.rebootShields--;
			} else {
				break;
			}	
		}
		if(z.rebootShields === 0){
			doneWithEvent();
		}
	} else if (z.cubes[z.eventNumber] === currentEventLength()){
		doneWithEvent();
	} else if (z.justRevealed && !z.nerfedRevealNormal){
		revealAgain();
	} else if (z.revealer !== -1){
		doneWithRevealPower();
	} else if (z.revealed[me]){
		doneWithAction();
	} else if (z.currentTask === 14 || z.currentTask === 19){
		taskSucceeds();
	} else if (z.currentTask === 16 || z.currentTask === 17 || 14 > z.currentTask){
		taskFails();
	}
	mainMenu();
	/* When can the shields be tested? 
	  - DONE: Acceptable Loss / Strategic Compromise
	  - DONE: Shield Malfunction Failed
	  - DONE: Act of Trust (S) / Failure to Lead refusal.
	  - DONE: Divert Power / System Crash / System Reboot (end of event)
	  - DONE: Jerry-Rig Shields (after each completed task)
	  - DONE: Reboot Shields (three times, not once) 
	  - DONE: Energy Spike / Test Commander [REMEMBER THIS COULD HAPPEN ON A HUMAN TURN if they revealed as first action on issue orders]
	  - DONE: Infected player reveals with Shield damage.
	 */
		
}

function mainMenuChoice(ch){
	switch(ch){
	case "Select a new Event":
		selectEvent();
		return;		
	case "Retrieve Dice": {
		let promise = retrieveDice(1000);
		promise.then(()=>{
			removeOption(me,"Retrieve Dice");
			z.options[me].push("Perform an Action");
			if(!z.revealed[me] && (!z.quarantined[z.turn] || z.flimsyQuarantine)){
				z.options[me].push("Draw Task Cards");
			}
			mainMenu();
		},mainMenu);
		return; }
	case "Perform an Action":
		performAction();
		return;
	case "[Blood Testing] Quarantine a player": {
		let promptText = "Who would you like to Quarantine? (1-"+z.numPlayers+")";
		for(let j = 0; !(j>=z.numPlayers); j++){
			promptText += "\n"+(j+1)+": ";
			if(z.revealed[j]){
				promptText += "[INFECTED]";
			} else if (z.quarantined[j]){
				promptText += "[QUARANTINED]";
			} else {
				promptText += z.characters[j];
			}
		}
		promptNum(promptText,(a)=>1>a||a>z.numPlayers || z.revealed[a-1] || z.quarantined[a-1],mainMenu,(choice)=>{
			removeOption(z.commander,ch);
			removeOption(z.commander,"[Blood Testing] Release a player from Quarantine");
			boldAlert("Commander "+z.characters[me]+" quarantines "+z.characters[choice-1]+".");
			/* RULES: if the Commander quarantines himself from Blood Testing, we assume it passes to the left as usual. */
			if(quarantine(choice-1,-1)){
				doneWithEvent();
			}
			mainMenu();
		});
		return;}
	case "[Blood Testing] Release a player from Quarantine":{
		let promptText = "Who would you like to release from Quarantine? (1-"+z.numPlayers+")";
		for(let j = 0; !(j>=z.numPlayers); j++){
			promptText += "\n"+(j+1)+": ";
			if(z.revealed[j]){
				promptText += "[INFECTED]";
			} else if (!z.quarantined[j]){
				promptText += "[NOT QUARANTINED]";
			} else {
				promptText += z.characters[j];
			}
		}
		promptNum(promptText,(a)=>1>a||a>z.numPlayers || z.revealed[a-1] || !z.quarantined[a-1],mainMenu,(choice)=>{
			removeOption(z.commander,ch);
			removeOption(z.commander,"[Blood Testing] Quarantine a player");
			boldAlert("Commander "+z.characters[me]+" releases "+z.characters[choice-1]+" from quarantine.");
			release(choice-1);
				
			doneWithEvent();
			mainMenu();
		});
	return;}
	case "[Shield Test Failure] Damage Life Support":
		confirmify("Confirming you want to damage Life Support as a result of the Shield Test failure.",mainMenu,()=>{
			damageLifeSupport();
			if(!z.gameOver && findCure()){
				damageLifeSupport();
			}
			doneWithShieldTest();
		});
		return;
	case "[Shield Test Failure] Damage Outpost":
		confirmify("Confirming you want to damage the Outpost as a result of the Shield Test failure.",mainMenu,()=>{
			damageOutpost();
			if(!z.gameOver && escape()){
				damageOutpost();
			}
			doneWithShieldTest();
		});
		return;
	case "[Pass Command] Give the Commander card to another player": {
		let promptText = "Who is the new Commander? (1-"+z.numPlayers+")";
		let allQuarantined = true;
		for(let j = 0; !(j>=z.numPlayers) && allQuarantined; j++){
			allQuarantined = z.revealed[j] || z.quarantined[j];
		}
		for(let j = 0; !(j>=z.numPlayers); j++){
			promptText += "\n"+(j+1)+": ";
			if(z.revealed[j]){
				promptText += "[INFECTED]";
			} else if (z.quarantined[j] && !allQuarantined){
				promptText += "[QUARANTINED]";
			} else if (j === z.commander){
				promptText += "[ALREADY COMMANDER]";
			} else {
				promptText += z.characters[j];
			}
		}
		promptNum(promptText,(a)=>1>a||a>z.numPlayers || z.revealed[a-1] || (z.quarantined[a-1] && !allQuarantined),mainMenu,(choice)=>{
			removeOption(me,ch);
			boldAlert("Commander "+z.characters[me]+" passes the Commander card to "+z.characters[choice-1]+".");
			z.commander = choice - 1;
			updateBanner(z.commander,defaultBanner(z.commander));
			updateBanner(me,defaultBanner(me));
			if(z.commanderDieInHand){
				z.commanderDieInHand = false;
				plainAlert("The Commander die is returned to the pool.");
			}		
			doneWithEvent();
			mainMenu();
		});
	return;}
	case "[Restore Comm] Retrieve the Commander die":
		confirmify("Confirming you want to retrieve the Commander die.",mainMenu,()=>{
			z.commanderDieInHand = true;
			removeOption(me,ch);
			removeOption(me,"[Restore Comm] Do not retrieve the Commander die");
			doneWithEvent();
			mainMenu();
		});
		return;
	case "[Restore Comm] Do not retrieve the Commander die":
		confirmify("Confirming you do NOT want to retrieve the Commander die. (Really?)",mainMenu,()=>{
			removeOption(me,"[Restore Comm] Retrieve the Commander die");
			removeOption(me,ch);
			doneWithEvent();
			mainMenu();
		});
		return;
	case "[Restore Comm] Retrieve Dice": {
		let diceAvailable = z.redPool + z.blackPool;
		/* remmember: restore Comm can't be active at the same time as food rationing. */
		let diceCanTake = dieLimit(me) - z.blackDice[me] - z.redDice[me];
		let diceMax = diceAvailable;
		if(diceAvailable > diceCanTake){
			diceMax = diceCanTake;
		}
		if(me === z.commander && !z.commanderDieInHand){
			diceMax++;
		}
		
		let proceed = function(){
			removeOption(me,"[Restore Comm] Retrieve Dice");
			let done = false;
			let nextPlayer = (me + 1) % z.numPlayers;
			while(z.revealed[nextPlayer]){
				nextPlayer = (nextPlayer + 1) % z.numPlayers;
			}
			if( nextPlayer === z.turn ){
				done = true;
			} else if(z.redPool === 0 && z.blackPool === 0){
				if(!z.commanderDieInHand && ((z.turn > z.commander && (z.commander > me || me > z.turn)) || (z.commander > me && me > z.turn))){
					plainAlert("Only the Commander die is left available to retrieve.");
					addOption(z.commander,"[Restore Comm] Retrieve the Commander die");
					addOption(z.commander,"[Restore Comm] Do not retrieve the Commander die");
				} else {
					plainAlert("No more dice are available to retrieve.");
					done = true;
				}
			} 
			if (!done) {
				plainAlert(z.characters[nextPlayer]+" may now retrieve dice up to their hand limit.");
				addOption(nextPlayer,"[Restore Comm] Retrieve Dice");
			} else {
				doneWithEvent();	
			}
			mainMenu();
		};
		
		promptNum("How many dice would you like to retrieve? (0-"+diceMax+")",(a)=>0>a||a>diceMax,mainMenu,(diceToTake)=>{
			if(diceToTake === 0){
				boldAlert(z.characters[me]+" chooses not to retrieve dice.");
				proceed();
			} else {
				retrieveDice(diceToTake).then(proceed,mainMenu);
			}
		});
		return; }
	case "[Last Stand] Discard a die":
	case "[Quarantine] Discard a die":
	case "[Amputation] Discard a die":
	case "[Reveal as Infected] Discard a die":
	case "[Act of Trust] Discard a die": {
		let promptText = "Which type of die would you like to discard?";
		if(z.redDice[me] === 0){
			promptText += "\n1: [You have no Weak dice]";
		} else {
			promptText += "\n1: Weak (red) [You have "+z.redDice[me]+"].";
		}
		if(z.blackDice[me] === 0){
			promptText += "\n2: [You have no Strong dice]";
		} else {
			promptText += "\n2: Strong (black) [You have "+z.blackDice[me]+"].";
		}
		promptNum(promptText,(a)=>1>a||a>2 || (a === 1 && z.redDice[me] === 0) || (a === 2 && z.blackDice[me] === 0),mainMenu,(discard)=>{
			if(discard === 2){
				boldAlert(z.characters[me] + " discards a Strong die.");
				z.blackDice[me]--;
				z.blackPool++;
			} else if(discard === 1){
				boldAlert(z.characters[me] + " discards a Weak die.");
				z.redDice[me]--;
				z.redPool++;
			} 
			if(ch === "[Last Stand] Discard a die"){
				removeOption(me,ch);
				let anyDiscards = false;
				for(let j = 0; !(j>=z.numPlayers) && !anyDiscards; j++){
					if(z.blackDice[j] + z.redDice[j] > dieLimit(j)){
						anyDiscards = true;
					}
				}
				if(anyDiscards){
					plainAlert("Pausing for other player(s) to discard down to their die limit.");
				} else {
					doneSelectingEvent();
				}
			} else if (ch === "[Quarantine] Discard a die"){
				if(z.blackDice[me] + z.redDice[me] === dieLimit(me)){
					removeOption(me,ch);
					if (z.cubes[z.eventNumber] === currentEventLength() && z.events[z.eventNumber] === 0){
						doneWithEvent();
					} else {
						doneWithVote();
						if(z.currentTask === 18){
							taskSucceeds();
						}
					}
					/* return where to we were.  When could someone be quarantined?  
					- DONE: As the result of a vote [many circumstances]
					- DONE: Blood Testing (end of event)
					*/
				}
			} else if (ch === "[Reveal as Infected] Discard a die"){
				if(z.blackDice[me] + z.redDice[me] === dieLimit(me)){
					removeOption(me,ch);
					doneWithAction();
				}
			} else if(ch === "[Amputation] Discard a die"){
				removeOption(me,ch);
				if (z.cubes[z.eventNumber] === currentEventLength() && (z.events[z.eventNumber] === 17 || z.events[z.eventNumber] === 20)){
					doneWithEvent();
				} else if(z.explosions){
					taskSucceeds();
				} else {
					doneWithVote();
					if(z.currentTask === 22){
						taskSucceeds();
					}
					
					/* return where to we were.  When could someone be amputated?  
					- DONE: As the result of a vote
					- DONE: Accident, Electrical Failure (end of event)
					*/
				}
			} else if (ch === "[Act of Trust] Discard a die"){
				removeOption(me,ch);
				taskSucceeds();
			}
			mainMenu();
		});
	return; }
	/* YOU ARE HERE */
	case "[Resupply] Repair all damage of 1 type": {
		promptNum("Which type of damage would you like to repair? (1-3)\n1: Shields\n2: Outpost\n3: Life Support",(a)=>1>a||a>3,mainMenu,(choice)=>{
			removeOption(me,ch);
			removeOption(me,"[Resupply] Choose not to repair damage");
			if(choice === 1){
				z.shieldDamage = 0;
				boldAlert("All Shield damage fully repaired.");
			} else if (choice === 2){
				while(z.outpostDamage.length > 0){
					z.outpostPool.push(z.outpostDamage.pop());
				}
				shuffle(z.outpostPool);
				boldAlert("All Outpost damage fully repaired.");
			} else if (choice === 3){
				while(z.fatigueDamage.length > 0){
					let healed = z.fatigueDamage.pop();
					unfatigue(healed);
					z.fatiguePool.push(healed);
				}
				shuffle(z.fatiguePool);
				boldAlert("All Life Support damage fully repaired.");
			}
			doneWithEvent();
			mainMenu();
		});
	return; }
	case "[Resupply] Choose not to repair damage":
		confirmify("Are you sure you don't want to repair any damage?",mainMenu,()=>{
			removeOption(me,ch);
			removeOption(me,"[Resupply] Repair all damage of 1 type");
			boldAlert("Commander "+z.characters[me]+" chooses not to repair any damage.");
			doneWithEvent();
			mainMenu();
		});
		return;
	case "[System Reboot] Draw a damage token": {
		let promptText = "Which kind of damage token would you like to draw? (1-3)";
		if(z.systemReboot[1] > 0){
			promptText += "\n1: Shields";
		} else {
			promptText += "\n1: (Cannot damage Shields)";
		}
		if(z.systemReboot[2] > 0){
			promptText += "\n2: Outpost";
		} else {
			promptText += "\n2: (Cannot damage the Outpost)";
		}
		if(z.systemReboot[3] > 0){
			promptText += "\n3: Fatigue";
		} else {
			promptText += "\n3: (Cannot damage Life Support)";
		}
		promptNum(promptText,(a)=>1>a||a>3|| z.systemReboot[a] === 0,mainMenu,(choice)=>{
			if(choice === 1){
				z.shieldDamage++;
				boldAlert("Shield token drawn.  Shields will be tested once all tokens are drawn.");
			} else if (choice === 2){
				damageOutpost();
			} else if (choice === 3){
				damageLifeSupport();
			}
			z.systemReboot[0]--;
			z.systemReboot[choice]--;
			if(z.systemReboot[0] === 0){
				removeOption(me,ch);
				if(z.systemReboot[1] === 3 || (z.shieldDamage + z.systemReboot[1] === 5 && !z.deadlyEvents) || testShields()){
					doneWithEvent();
				}
			}
			mainMenu();
		});
	return; }
	case "[Accelerated Evac] Approve Evacuation Clearance for a player": {
		let promptText = "Who would you like to grant Evacuation Clearance to? (1-"+z.numPlayers+")";
		/* RULES: can you approve clearance for someone already cleared? */
		for(let j = 0; !(j>=z.numPlayers); j++){
			promptText += "\n"+(j+1)+": ";
			if(z.revealed[j]){
				promptText += "[INFECTED]";
			} else if(z.quarantined[j]){
				promptText += "[QUARANTINED]";
			} else if(z.cleared[j]){
				promptText += "[ALREADY CLEARED]";
			} else {
				promptText += z.characters[j];
			}
		}
		promptNum(promptText,(a)=>1>a||a>z.numPlayers|| z.revealed[a-1] || z.quarantined[a-1] || z.cleared[a-1],mainMenu,(choice)=>{
			boldAlert("Commander "+z.characters[me]+" grants Evacuation Clearance to "+z.characters[choice-1] + ".");
			removeOption(me,ch);
			z.cleared[choice-1] = true;
			doneWithEvent();
			mainMenu();
		});
	return; }
	case "[Accident] Choose a player to amputate": {
		/* RULES: can you amputate / call amputation votes on already amputated players? */
		let promptText = "Who would you like to amputate? (1-"+z.numPlayers+")";
		for(let j = 0; !(j>=z.numPlayers); j++){
			promptText += "\n"+(j+1)+": ";
			if(z.revealed[j]){
				promptText += "[INFECTED]";
			} else if(z.amputated[j]){
				promptText += "[ALREADY AMPUTATED]";
			} else {
				promptText += z.characters[j];
			}
		}
		promptNum(promptText,(a)=>1>a||a>z.numPlayers|| z.revealed[a-1] || z.amputated[a-1],mainMenu,(choice)=>{
			boldAlert("Commander "+z.characters[me]+" amputates "+z.characters[choice-1] + ".");
			removeOption(me,ch);
			if(amputate(choice-1)){
				doneWithEvent();
			}
			mainMenu();
		});
	return; }
	case "[Sabotage] Discard 2 dice": {
		let discardedRed = 0;
		let discardedBlack = 0;
		let discardedCommander = false;
		let maxDiscard = 2;
		if(2 > myDice()){
			maxDiscard = myDice();
		}
		let discardADie = function(j){
			if(j===maxDiscard){
				if(discardedRed > 0){
					boldAlert(z.characters[me] + " discards "+discardedRed+" Weak "+dieDice(discardedRed)+".");
					z.redDice[me]-=discardedRed;
				}
				if(discardedBlack > 0){
					boldAlert(z.characters[me] + " discards "+discardedBlack+" Strong "+dieDice(discardedBlack)+".");
					z.blackDice[me]-=discardedBlack;
				}
				if(discardedCommander){
					boldAlert(z.characters[me] + " discards the Commander die.");
					z.commanderDieInHand = false;
				}
				if(2 > maxDiscard){
					plainAlert(z.characters[me] + " had no more dice to discard.");
				}
				removeOption(me,ch);
				boldAlert("The Sabotage token is removed.");
				z.sabotage = 0;
				if(!z.options[me].includes("[Steve] Retrieve a die") && !z.options[me].includes("[Michihiro] Retrieve a die") && !z.options[me].includes("[Enver] Retrieve a die")){
					doneWithAction();
				}
				mainMenu();
			} else {
				let promptText = "Which type of die would you like to discard?";
				if(z.redDice[me] - discardedRed === 0){
					promptText += "\n1: [You have no Weak dice]";
				} else {
					promptText += "\n1: Weak (red) [You have "+z.redDice[me]+"].";
				}
				if(z.blackDice[me] - discardedBlack === 0){
					promptText += "\n2: [You have no Strong dice]";
				} else {
					promptText += "\n2: Strong (black) [You have "+z.blackDice[me]+"].";
				}
				if(z.commander === me && z.commanderDieInHand && !discardedCommander){
					promptText += "\n3: Commander (blue)";
				}
				promptNum(promptText,(a)=>1>a||a>3||((a === 1 && z.redDice[me] - discardedRed === 0) || (a === 2 && z.blackDice[me] - discardedBlack === 0) || (a === 3 && !(z.commander === me && z.commanderDieInHand && !z.discardedCommander))),mainMenu,(choice)=>{
					switch(choice){
						case 1:
						discardedRed++;
						break;
						case 2:
						discardedBlack++;
						break;
						case 3:
						discardedCommander = true;
					}
					discardADie(j+1);
				});
				
			}
		};
		discardADie(0);
	return; }
	case "[Lone Wolf] Submit two dice": {
		let choice1 = -1;
		let choice2 = -1;
		let submitADie = function(j){
			if(j === 2){
				let confirmText = "Confirming you want to submit the following dice:";
				let willPass = true;
				for(let j = 0; !(j>=z.rolled.length); j++){
					if(j === choice1-1 || j === choice2 - 1){
						confirmText += "\n"+dieText(z.rolled[j]);
						willPass = willPass && dieValue(z.rolled[j],true) > 0;
					}
				}
				if(willPass){
					confirmText += "\nThe Lone Wolf action will SUCCEED.";
				} else {
					confirmText += "\nThe Lone Wolf action will FAIL.";
				}
				confirmify(confirmText,mainMenu,()=>{
					for(let j = 0; !(j>=z.rolled.length); j++){
						if (j !== choice1-1 && j !== choice2-1){
							z.rolled.splice(j,1);
						}
					}
					addAlert("You submit "+dieText(z.rolled[0])+" and "+dieText(z.rolled[1])+".");
					t.value += bold(z.characters[me] + " submits " + diePicture(z.rolled[0]) + diePicture(z.rolled[1]) +".")+"\r\n";
					for(let j = 0; !(j>=z.rolled.length); j++){
						switch(z.rolled[j][0]){
							case 0:
							z.redDice[me]--;
							z.redPool++;
							break;
							case 1:
							z.blackDice[me]--;
							z.blackPool++;
							break;
							case 2:
							z.commanderDieInHand = false;
						}
					}
					removeOption(me,ch);
					removeOption(me,"[Luba] Reroll your dice");
					if(!willPass){
						boldAlert("The Lone Wolf action fails.");
						doneWithAction();
					} else {
						boldAlert("The Lone Wolf action succeeds!");
						plainAlert("A cube is added to the current Event.");
						z.cubes[z.eventNumber]++;
						if(z.cubes[z.eventNumber] === currentEventLength()){
							completeEvent();
						} else {
							doneWithAction();
						}
					}
					z.rolled = [];
					z.roller = -1;
					mainMenu();
				});
			} else if(z.rolled.length !== 3){
				choice1 = 1;
				choice2 = 2;
				submitADie(2);				
			} else {
				let promptText = "Which die do you want to submit? ("+(j+1)+"/2)"+rollReport();
				promptNum(promptText,(a)=>1>a||a>z.rolled.length||a===choice1,mainMenu,(choice)=>{
					if(j===0){
						choice1 = choice;
					} else if (j === 1){
						choice2 = choice;
					}
					submitADie(j+1);
				});
			}
		};
		submitADie(0);

	return; }
	case "Submit Corporate Die": {
		let promptText = "Which die would you like to submit? (1-"+z.rolled.length+")";
		if(corporateRaid() && z.rolled.length === 3){
				promptText += "\nRemember that you must submit 2 due to Corporate Raid.";
		}
		promptText+=rollReport();
		promptNum(promptText,(a)=>1>a||a>z.rolled.length,mainMenu,(choice)=>{
			addAlert("You submit "+dieText(z.rolled[choice-1])+".");
			t.value += bold(z.characters[me] + " submits " + diePicture(z.rolled[choice-1])+".")+"\r\n";
			z.malfunctionTotal += dieValue(z.rolled[choice-1],true);
			if(corporateRaid() && z.rolled.length === 2){
				z.corporateDie2 = z.rolled[choice-1];
			} else {
				z.corporateDie = z.rolled[choice-1];
			}
			z.rolled.splice(choice-1,1);
			removeOption(me,"[Luba] Reroll your dice");
			if(!corporateRaid() || z.rolled.length === 1){
				z.rolled = [];
				z.roller = -1;
				removeOption(me,ch);		
			}
			startParticipation();
			mainMenu();
		});
	return; }
	case "Submit a die": {
		let promptText = "Which die would you like to submit? (1-"+z.rolled.length+")";
		promptText += rollReport();
		if(z.fatigued[me] || (z.revealed[me] && z.fatiguedInfected)){
			promptText += "\r\nRemember that you are Fatigued and may only submit 1 die.";
		}
		promptNum(promptText,(a)=>1>a||a>z.rolled.length,mainMenu,(choice)=>{
			z.submissions[me].push(z.rolled[choice-1]);
			z.malfunctionTotal += dieValue(z.rolled[choice-1],true);
			addAlert("You submit "+dieText(z.rolled[choice-1])+".\nTotal is now "+z.malfunctionTotal+" vs. a target of "+malfunctionDifficulty(z.currentTask)+".");
			t.value += bold(z.characters[me] + " submits " + diePicture(z.rolled[choice-1])+".")+"\r\n";
			switch(z.rolled[choice-1][0]){
				case 0:
				z.redDice[me]--;
				z.redPool++;
				break;
				case 1:
				z.blackDice[me]--;
				z.blackPool++;
				break;
				case 2:
				z.commanderDieInHand = false;
			}
			z.rolled.splice(choice-1,1);
			removeOption(me,"[Luba] Reroll your dice");
			if(z.fatigued[me] || (z.revealed[me] && z.fatiguedInfected)){
				addAlert("You are fatigued, and cannot submit any more dice.");
				removeOption(me,ch);
				submissionToken();
				let nextPlayer = -1;
				for(let j = 1; !(j>=z.numPlayers); j++){
					let k = (me + j)%z.numPlayers;
					if((!z.firstIsLast && k === z.turn) || (z.firstIsLast && (k === ((z.turn+1) % z.numPlayers))) ){
						break;
					}
					if(z.participation[k] === 1){
						nextPlayer = k;
						break;
					}
				}
				if(nextPlayer === -1){
					resolveMalfunction();
				} else {
					rollAllDice(nextPlayer);
					addOption(nextPlayer,"Submit a die");
				}
			} else if(z.rolled.length === 0){
				removeOption(me,ch);
				removeOption(me,"Reroll your dice");
				addOption(me,"I'm done submitting dice");
				if(me === z.turn && z.threatsModule && z.threatTokens[me] === -1 && z.round > 1 && !z.revealed[me] && (z.threats[me] === 1 || z.statusCards[me] > 0) ){
					addOption(me,"[Act Recklessly] Claim a Threat Token");
				}
			} else {
				addOption(me,"Reroll your dice");
				addOption(me,"I'm done submitting dice");
			}
			mainMenu();
		});
	return; }
	case "Reroll your dice":
		confirmify("Confirming you want to reroll your dice",mainMenu,()=>{
			boldAlert(z.characters[me] + " rerolls their dice.");
			rollAllDice(me);
			removeOption(me,ch);
			removeOption(me,"I'm done submitting dice");
			if(me === z.turn && z.characters[me] === "Luba" && z.luba){
				addOption(me,"[Luba] Reroll your dice");
			}
			mainMenu();
		});
		return;
	case "I'm done submitting dice":
		confirmify("Confirming that you've finished submitting dice for this Malfunction and want the next player to roll their dice.",mainMenu,()=>{
			removeOption(me,ch);
			removeOption(me,"Submit a die");
			removeOption(me,"Reroll your dice");
			removeOption(me,"[Act Recklessly] Claim a Threat Token");
			submissionToken();
			let nextPlayer = -1;
			for(let j = 1; !(j>=z.numPlayers); j++){
				let k = (me + j)%z.numPlayers;
				if((!z.firstIsLast && k === z.turn) || (z.firstIsLast && k === ((z.turn + 1) % z.numPlayers) )){
					break;
				}
				if(z.participation[k] === 1){
					nextPlayer = k;
					break;
				}
			}
			if(nextPlayer === -1){
				resolveMalfunction();
			} else {
				rollAllDice(nextPlayer);
				addOption(nextPlayer,"Submit a die");
			}
			mainMenu();
		});
		return;
	case "[Test Commander] Submit a die":	
	case "[Repair Shield] Submit a die":
	case "[Repair Outpost] Submit a die":
	case "[Repair Life Support] Submit a die": {
		let promptText = "Which die would you like to submit? (1-"+z.rolled.length+")"+rollReport();
		promptNum(promptText,(a)=>1>a||a>z.rolled.length,mainMenu,(choice)=>{
			addAlert("You submit "+dieText(z.rolled[choice-1])+".");
			t.value += bold(z.characters[me] + " submits " + diePicture(z.rolled[choice-1])+".")+"\r\n";
			switch(z.rolled[choice-1][0]){
				case 0:
				z.redDice[me]--;
				z.redPool++;
				break;
				case 1:
				z.blackDice[me]--;
				z.blackPool++;
				break;
				case 2:
				z.commanderDieInHand = false;
			}
			let done = true;
			removeOption(me,ch);
			removeOption(me,"[Luba] Reroll your dice");
			let damage = "";
			if(0 > dieValue(z.rolled[choice-1],true)){
				if(ch === "[Test Commander] Submit a die"){
					let player = z.revealer;
					if(z.revealer === -1){
						player = z.turn;
					}
					boldAlert("Commander "+z.characters[z.commander]+" fails. "+z.characters[player]+" may draw a Damage token of their choice.");
					addOption(player,"[Test Commander] Damage Shields");
					addOption(player,"[Test Commander] Damage Outpost");
					addOption(player,"[Test Commander] Damage Life Support");
					done = false;
				} else {
					boldAlert("The Repair fails.");
				}
			} else {
				if(ch === "[Repair Shield] Submit a die"){
					z.shieldDamage--;
					boldAlert("1 Shield damage removed.");
				} else if (ch ===  "[Repair Outpost] Submit a die") {
					if(z.outpostDamage.length === 1){
						damage = z.outpostDamage.pop();
						boldAlert(damage + " token removed.");
						z.outpostPool.push(damage);
						shuffle(z.outpostPool);
					} else {
						boldAlert("Repair successful!  "+z.characters[me]+" must choose an Outpost token to remove.");
						addOption(me,"Remove an Outpost Token");
						done = false;
					}
				} else if (ch ===  "[Repair Life Support] Submit a die") {
					if(z.fatigueDamage.length === 1){
						damage = z.fatigueDamage.pop();
						boldAlert(damage + " token removed.");
						unfatigue(damage);
						z.fatiguePool.push(damage);
						shuffle(z.fatiguePool);
					} else {
						boldAlert("Repair successful!  "+z.characters[me]+" must choose a Fatigue token to remove.");
						addOption(me,"Remove a Fatigue Token");
						done = false;
					}
				} else if (ch === "[Test Commander] Submit a die"){
					boldAlert("Commander "+z.characters[z.commander]+" succeeds!");
				}
			}
			z.rolled = [];
			z.roller = -1;
			/* RULES: Sabotage vs. Enver/Michihiro/Steve die retrieval order (we assume they can choose) */
			/* RULES: Is Enver/Michihiro/Steve's action optional? (we assume it is not) */
			if(done){
				if(ch === "[Repair Shield] Submit a die" && z.characters[me] === "Steve" && me === z.turn && !z.fatigued[me]){
					addOption(me,"[Steve] Retrieve a die");
					done = false;
				} else if(ch === "[Repair Outpost] Submit a die" && z.characters[me] === "Enver" && me === z.turn && !z.fatigued[me]){
					addOption(me,"[Enver] Retrieve a die");
					done = false;
				} else if(ch === "[Repair Life Support] Submit a die" && z.characters[me] === "Michihiro" && me === z.turn && !z.fatigued[me] && damage !== "Michihiro"){
					addOption(me,"[Michihiro] Retrieve a die");
					done = false;
				}
				if((ch === "[Repair Shield] Submit a die" && z.sabotage === 1) || (ch === "[Repair Outpost] Submit a die" && z.sabotage === 2) || (ch === "[Repair Life Support] Submit a die" && z.sabotage === 3)){
					done = discardForSabotage(done);
				}
			}
			if(done){
				doneWithAction();
			}
			mainMenu();
		});
	return; }
	case "Do not remove a token":
		confirmify("Confirming you do NOT want to remove a damage token.  This is likely to be seen as highly suspicious by your fellow players.",mainMenu,()=>{
			boldAlert(z.characters[me] + " chooses not to remove a damage token.");
			removeOption(me,ch);
			removeOption(me,"Remove a Shield Token");
			removeOption(me,"Remove a Fatigue Token");
			removeOption(me,"Remove an Outpost Token");
			taskSucceeds();
			mainMenu();
		});
		return;
	case "Remove a Shield Token":
		confirmify("Confirming you want to remove a Shield Token.",mainMenu,()=>{
			z.shieldDamage--;
			boldAlert(z.characters[me]+" discards a shield token.");
			removeOption(me,ch);
			removeOption(me,"Do not remove a token");
			taskSucceeds();
			mainMenu();
		});
		return;
	case "[Strategic Compromise] Remove a Shield Token":
		confirmify("Confirming you want to remove a Shield Token.",mainMenu,()=>{
			z.shieldDamage--;
			boldAlert(z.characters[me]+" discards a shield token.");
			removeOption(me,ch);
			removeOption(me,"[Strategic Compromise] Remove an Outpost Token");
			removeOption(me,"[Strategic Compromise] Remove a Life Support Token");
			addOption(me,"[Strategic Compromise] Damage Shields");
			if(z.outpostDamage.length !== 5){
				addOption(me,"[Strategic Compromise] Damage Outpost");
			}
			if(z.fatigueDamage.length !== 5){
				addOption(me,"[Strategic Compromise] Damage Life Support");
			}
			mainMenu();
		});
		return;
	case "Remove an Outpost Token":
	case "[Strategic Compromise] Remove an Outpost Token": {
		let promptText = "Which Outpost Token would you like to remove? (1-"+z.outpostDamage.length+")";
		for(let j = 0; !(j>=z.outpostDamage.length); j++){
			promptText += "\n"+(j+1)+": "+z.outpostDamage[j];
		}
		promptNum(promptText,(a)=>1>a||a>z.outpostDamage.length,mainMenu,(choice)=>{
			removeOption(me,ch);
			let damage = z.outpostDamage.splice(choice-1,1)[0];
			boldAlert(z.characters[me] + " removes the "+damage+" token.");
			z.outpostPool.push(damage);
			shuffle(z.outpostPool);
			if(ch === "Remove an Outpost Token"){
				if(z.currentTask === -1){
					let done = true;
					if(z.characters[me] === "Enver" && me === z.turn && !z.fatigued[me]){
						addOption(me,"[Enver] Retrieve a die");
						done = false;
					}
					if(z.sabotage === 2){
						done = done && discardForSabotage(done);
					}
					if(done){
						doneWithAction();
					}
				} else {
					removeOption(me,"Do not remove a token");
					taskSucceeds();
				}
			} else {
				removeOption(me,"[Strategic Compromise] Remove a Shield Token");
				removeOption(me,"[Strategic Compromise] Remove a Life Support Token");
				if(z.shieldDamage !== 5){
					addOption(me,"[Strategic Compromise] Damage Shields");
				}
				addOption(me,"[Strategic Compromise] Damage Outpost");
				if(z.fatigueDamage.length !== 5){
					addOption(me,"[Strategic Compromise] Damage Life Support");
				}
			}
			mainMenu();
		});
	return; }
	case "Remove a Fatigue Token":
	case "[Strategic Compromise] Remove a Fatigue Token": {
		let promptText = "Which Fatigue Token would you like to remove? (1-"+z.fatigueDamage.length+")";
		for(let j = 0; !(j>=z.fatigueDamage.length); j++){
			promptText += "\n"+(j+1)+": "+z.fatigueDamage[j];
		}
		promptNum(promptText,(a)=>1>a||a>z.fatigueDamage.length,mainMenu,(choice)=>{
			removeOption(me,ch);
			let damage = z.fatigueDamage.splice(choice-1,1)[0];
			boldAlert(z.characters[me] + " removes the "+damage+" token.");
			unfatigue(damage);
			z.fatiguePool.push(damage);
			shuffle(z.fatiguePool);
			if(ch === "Remove a Fatigue Token"){
				if(z.currentTask === -1){
					let done = true;
					if(z.characters[me] === "Michihiro" && me === z.turn && !z.fatigued[me] && damage !== "Michihiro"){
						addOption(me,"[Michihiro] Retrieve a die");
						done = false;
					}
					if(z.sabotage === 2){
						done = done && discardForSabotage(done);
					}
					if(done){
						doneWithAction();
					}
				} else {
					removeOption(me,"Do not remove a token");
					taskSucceeds();
				}
			} else {
				removeOption(me,"[Strategic Compromise] Remove a Shield Token");
				removeOption(me,"[Strategic Compromise] Remove an Outpost Token");
				if(z.shieldDamage !== 5){
					addOption(me,"[Strategic Compromise] Damage Shields");
				}
				if(z.fatigueDamage.length !== 5){
					addOption(me,"[Strategic Compromise] Damage Outpost");
				}
				addOption(me,"[Strategic Compromise] Damage Life Support");
			}
			mainMenu();
		});
	return; }
	case "[Steve] Retrieve a die":
	case "[Enver] Retrieve a die":
	case "[Michihiro] Retrieve a die":
		retrieveDice(1).then(()=>{
			removeOption(me,ch);
			if(!z.options[me].includes("[Sabotage] Discard 2 dice")){
				doneWithAction();
			}
			mainMenu();
		},mainMenu);
		return;
	case "Retrieve 2 Dice":
		/* From Issue Order */
		retrieveDice(2).then(()=>{
			removeOption(me,ch);
			removeOption(me,"Perform an Action");
			z.xoTarget = -1;
			doneWithAction();
			mainMenu();
		},mainMenu);
		return;
	case "[Luba] Reroll your dice":
		/* RULES: Can Luba reroll Corporate dice? */
		confirmify("Confirming you want to use your once per turn ability to reroll your dice.",mainMenu,()=>{
			boldAlert("Luba uses her once per turn ability to reroll her dice.");
			z.luba = false;
			for(let j = 0; !(j>=z.rolled.length); j++){
				z.rolled[j][1] = getDieRoll();
			}
			addAlert("You rolled:"+rollReport());	
			removeOption(me,ch);
			mainMenu();
		});
		return;
	case "Draw 2 Fatigue Tokens and choose 1 to place": {
		if(z.fatiguePool.length === 1){
			confirmify("Confirming you want to draw the last fatigue token and win the game.",mainMenu,()=>{
				damageLifeSupport();
				saveAndQuit();
			});
		} else {
			let fatigue1 = z.fatiguePool[z.fatiguePool.length - 1];
			let fatigue2 = z.fatiguePool[z.fatiguePool.length - 2];
			let promptText = "Which Fatigue Token would you like to place? (1-2)\n1: "+fatigue1+"\n2: "+fatigue2;
			promptNum(promptText,(a)=>1>a||a>2,mainMenu,(choice)=>{
				removeOption(me,ch);
				z.fatiguePool.pop();
				z.fatiguePool.pop();
				if(choice === 1){
					boldAlert(z.characters[me] + " damages " + fatigue1 + ".");
					z.fatigueDamage.push(fatigue1);
					fatigue(fatigue1);
					z.fatiguePool.push(fatigue2);		
				} else {
					boldAlert(z.characters[me] + " damages " + fatigue2 + ".");
					z.fatigueDamage.push(fatigue2);
					fatigue(fatigue2);
					z.fatiguePool.push(fatigue1);
				}
				shuffle(z.fatiguePool);
				if(z.fatigueDamage.length === 6){
					endGame();
					saveAndQuit();
					return;
				}
				if(findCure()){
					damageLifeSupport();
				}
				if(z.fatigueDamage.length === 6){
					saveAndQuit();
					return;
				} 
				if(z.justRevealed && !z.nerfedRevealNormal){
					revealAgain();
				} else {
					doneWithRevealPower();
				}
				mainMenu();
				
				
			});
		}
	return; }
	case "Draw 2 Outpost Tokens and choose 1 to place": {
		if(z.outpostPool.length === 1){
			confirmify("Confirming you want to draw the last Outpost token and win the game.",mainMenu,()=>{
				damageOutpost();
				saveAndQuit();
			});
		} else {
			let outpost1 = z.outpostPool[z.outpostPool.length - 1];
			let outpost2 = z.outpostPool[z.outpostPool.length - 2];
			let promptText = "Which Outpost Token would you like to place? (1-2)\n1: "+outpost1+"\n2: "+outpost2;
			promptNum(promptText,(a)=>1>a||a>2,mainMenu,(choice)=>{
				removeOption(me,ch);
				z.outpostPool.pop();
				z.outpostPool.pop();
				if(choice === 1){
					boldAlert(z.characters[me] + " damages " + outpost1 + ".");
					z.outpostDamage.push(outpost1);
					z.outpostPool.push(outpost2);		
				} else {
					boldAlert(z.characters[me] + " damages " + outpost2 + ".");
					z.outpostDamage.push(outpost2);
					z.outpostPool.push(outpost1);
				}
				shuffle(z.outpostPool);
				if(z.outpostDamage.length === 6){
					endGame();
					saveAndQuit();
					return;
				}
				if(escape()){
					damageOutpost();
				}
				if(z.outpostDamage.length === 6){
					saveAndQuit();
					return;
				}
				if(z.justRevealed && !z.nerfedRevealNormal){
					revealAgain();
				} else {
					doneWithRevealPower();
				}
				mainMenu();
			});
		}
	return; }
	case "Approve Evacuation Clearance for 1 player": {
		let promptText = "Whose Evacuation Clearance would you like to approve? (1-"+z.numPlayers+")";
		for(let j = 0; !(j>=z.numPlayers); j++){
			promptText += "\n"+(j+1)+": ";
			if(z.revealed[j]){
				promptText += "[INFECTED]";
			} else if(z.quarantined[j]){
				promptText += "[QUARANTINED]";
			} else if(z.cleared[j]){
				promptText += "[ALREADY CLEARED]";
			} else {
				promptText += z.characters[j];
			}
		}
		promptNum(promptText,(a)=>1>a||a>z.numPlayers||z.revealed[a-1] || z.quarantined[a-1] || z.cleared[a-1],mainMenu,(choice)=>{
			boldAlert(z.characters[me]+" approves Evacuation Clearance for "+z.characters[choice-1] + ".");
			z.cleared[choice-1] = true;
			removeOption(me,ch);
			removeOption(me,"Deny Evacuation Clearance for 1 player");
			if(z.justRevealed && !z.nerfedRevealNormal){
				revealAgain();
			} else {
				doneWithRevealPower();
			}
			mainMenu();
		});
	return; }
	case "Deny Evacuation Clearance for 1 player": {
		let promptText = "Whose Evacuation Clearance would you like to deny? (1-"+z.numPlayers+")";
		for(let j = 0; !(j>=z.numPlayers); j++){
			promptText += "\n"+(j+1)+": ";
			if(z.revealed[j]){
				promptText += "[INFECTED]";
			} else if(z.quarantined[j]){
				promptText += "[QUARANTINED]";
			} else if(!z.cleared[j]){
				promptText += "[UNCLEARED]";
			} else {
				promptText += z.characters[j];
			}
		}
		promptNum(promptText,(a)=>1>a||a>z.numPlayers || z.revealed[a-1] || z.quarantined[a-1] || !z.cleared[a-1],mainMenu,(choice)=>{
			boldAlert(z.characters[me]+" denies Evacuation Clearance for "+z.characters[choice-1] + ".");
			z.cleared[choice-1] = false;
			removeOption(me,ch);
			removeOption(me,"Approve Evacuation Clearance for 1 player");
			if(z.justRevealed && !z.nerfedRevealNormal){
				revealAgain();
			} else {
				doneWithRevealPower();
			}
			mainMenu();
		});
	return; }
	case "[Test Commander] Damage Shields":
		confirmify("Confirming you want to damage the shields.",mainMenu,()=>{
			removeOption(me,ch);
			removeOption(me,"[Test Commander] Damage Outpost");
			removeOption(me,"[Test Commander] Damage Life Support");
			if(damageShields(1)){
				doneWithAction();
			}
			mainMenu();
		});
		return;
	case "[Test Commander] Damage Outpost":
		confirmify("Confirming you want to damage the Outpost.",mainMenu,()=>{
			removeOption(me,ch);
			removeOption(me,"[Test Commander] Damage Shields");
			removeOption(me,"[Test Commander] Damage Life Support");
			damageOutpost();
			if(!z.gameOver && escape()){
				damageOutpost();
			}
			doneWithAction();
			mainMenu();
		});
		return;
	case "[Test Commander] Damage Life Support":
		confirmify("Confirming you want to damage Life Support.",mainMenu,()=>{
			removeOption(me,ch);
			removeOption(me,"[Test Commander] Damage Shields");
			removeOption(me,"[Test Commander] Damage Outpost");
			damageLifeSupport();
			if(!z.gameOver && findCure()){
				damageLifeSupport();
			}
			doneWithAction();
			mainMenu();
		});
		return;
	case "[Interference] Discard or return Tasks": {
		let destination = [-1,-1,-1];
		let discardCount = 0;
		
		let doneWithInterference = function(){
			removeOption(me,ch);
			for(let j = 0; !(j>=3); j++){
				if(destination[j] === -1){
					destination[j] = 3 - discardCount;
				}
			}
			let tasks = [];
			tasks.push(z.taskDeck.pop());
			tasks.push(z.taskDeck.pop());
			tasks.push(z.taskDeck.pop());
			for(let j = 3; j > 0; j--){
				for(let k = 0; !(k>=3); k++){
					if(destination[k] === j){
						z.taskDeck.push(tasks[k]);
						addAlert(alertTaskName(tasks[k]) + " placed in position #"+j+" from the top.");
					}
				}
			}
			for(let j = 0; !(j>=3); j++){
				if(destination[j] === 0){
					z.taskDiscards.push(tasks[j]);
					addAlert(alertTaskName(tasks[j]) + " discarded.");
				}
			}
			if(discardCount === 1){
				plainAlert(z.characters[me] + " discarded 1 Task, and returned the rest to the top of the Task deck.");
			} else if (discardCount === 3){
				plainAlert(z.characters[me] + " discarded all 3 Tasks.");
			} else {
				plainAlert(z.characters[me] + " discarded "+discardCount+" Tasks, and returned the rest to the top of the Task deck.");
			}
			doneWithAction();
			mainMenu();
		};
		
		let topSecondTask = function(){
			let promptText = "Which Task would you like to place 2nd from the top of the deck [it will be drawn second] (1-3):";
			for(let j = 0; !(j>=3); j++){
				promptText += "\n"+(j+1)+": ";
				if(destination[j] === 0){
					promptText += "[Already Discarded]";
				} else if (destination[j] === 1){
					promptText += "[On Top]";
				} else {
					promptText += alertTaskName(z.taskDeck[z.taskDeck.length-1-j]);
				}
			}
			promptNum(promptText,(a)=>1>a||a>3||destination[a-1]===0 || destination[a-1] === 1,mainMenu,(choice)=>{
				destination[choice-1] = 2;
				doneWithInterference();
			});
		};
		
		let topFirstTask = function(){
			let promptText = "Which Task would you like to place on top of the deck [it will be drawn next] (1-3):";
			for(let j = 0; !(j>=3); j++){
				promptText += "\n"+(j+1)+": ";
				if(destination[j] === 0){
					promptText += "[Already Discarded]";
				} else {
					promptText += alertTaskName(z.taskDeck[z.taskDeck.length-1-j]);
				}
			}
			promptNum(promptText,(a)=>1>a||a>3 || destination[a-1]===0,mainMenu,(choice)=>{
				destination[choice-1] = 1;
				if(discardCount === 0){
					topSecondTask();
				} else {
					doneWithInterference();
				}
			});			
		};
		
		let discardTask = function(k){
			if(k === 3){
				if(2 > discardCount){
					topFirstTask();
				} else {
					doneWithInterference();
				}
			} else {
				let promptText = "Pick a crisis to discard (1-4):";
				for(let j = 0; !(j>=3); j++){
					promptText += "\n"+(j+1)+": ";
					if(destination[j] === 0){
						promptText += "[Already Discarded]";
					} else {
						promptText += alertTaskName(z.taskDeck[z.taskDeck.length-1-j]);
					}
				}
				promptText += "\n4: I'm done discarding Tasks";
				promptNum(promptText,(a)=>1>a||a>4||destination[a-1]===0,mainMenu,(choice)=>{
					if(choice === 4){
						if(2 > discardCount){
							topFirstTask();
						} else {
							doneWithInterference();
						}
					} else {
						destination[choice-1] = 0;
						discardCount++;
						discardTask(k+1);
					}
				});
			}
		};

		discardTask(0);

	return; }
	case "Hold Quarantine Vote": 
		callQuarantineVote().then(()=>{
			removeOption(me,ch);
			removeOption(me,"Hold Clearance Vote");
			removeOption(me,"Hold Take Off Vote");
			removeOption(me,"Hold Amputation Vote");
			if(z.cubes[z.eventNumber] === currentEventLength()){
				z.holdTrials[2] = false;
			}
			mainMenu();
		},mainMenu);
		return;
	case "Hold Clearance Vote":
		callClearanceVote().then(()=>{
			removeOption(me,ch);
			removeOption(me,"Hold Quarantine Vote");
			removeOption(me,"Hold Take Off Vote");
			removeOption(me,"Hold Amputation Vote");
			if(z.cubes[z.eventNumber] === currentEventLength()){
				z.holdTrials[1] = false;
			}
			mainMenu();
		},mainMenu);
		return;
	case "Hold Take Off Vote":
		callTakeOffVote().then(()=>{
			removeOption(me,ch);
			removeOption(me,"Hold Quarantine Vote");
			removeOption(me,"Hold Clearance Vote");
			removeOption(me,"Hold Amputation Vote");
			mainMenu();
		},mainMenu);
		return;
	case "Hold Amputation Vote":
		callAmputationVote().then(()=>{
			removeOption(me,ch);
			removeOption(me,"Hold Quarantine Vote");
			removeOption(me,"Hold Clearance Vote");
			removeOption(me,"Hold Amputation Vote");
			if(z.cubes[z.eventNumber] === currentEventLength()){
				z.holdTrials[0] = false;
			}
			mainMenu();
		},mainMenu);
		return;
	case "[Lincoln] Decide outcome of Clearance vote":
		confirmify("Confirming you want to use your once per game to decide the outcome of this vote.",mainMenu,()=>{
			z.lincoln = false;
			removeFromAll("Cast Your Vote");
			removeFromAll("Change Your Vote");
			confirmify("Does "+z.characters[z.voteTarget]+" get clearance?",()=>{
				boldAlert("Lincoln uses his once-per-game ability to Deny Clearance.");
				resolveVote(0);
				mainMenu();
			},()=>{
				boldAlert("Lincoln uses his once-per-game ability to Approve Clearance.");
				resolveVote(1);
				mainMenu();
			},"APPROVE","DENY");
				
		});
		return;
	case "Cast Your Vote":
	case "Change Your Vote": {
		let promptText = "How would you like to vote? (1-3)";
		if(z.redDice[me] > 0){
			promptText += "\n1: Weak (red) die";
		} else {
			promptText += "\n1: (You have no Weak dice)";
		}
		if(z.blackDice[me] > 0){
			promptText += "\n2: Strong (black) die";
		} else {
			promptText += "\n2: (You have no Strong dice)";
		}
		promptText += "\n3: Empty Fist (abstain)";
		if(ch === "Change Your Vote"){
			promptText += "\n4: I'm still deciding: cancel my vote for now";
		}
		if(voteTampering()){
			promptText += "\n\nNote that any die used in this vote will be submitted.";
		}
		promptText += "\n\nThis will not reveal your vote, but will merely put your fist out with your vote inside.";
		
		promptNum(promptText,(a)=>1>a||a>4||((a===1 && z.redDice[me] === 0) || (a === 2 && z.blackDice[me] === 0) || (a === 4 && ch === "Cast Your Vote")),mainMenu,(choice)=>{
		
			removeOption(me,ch);
			removeOption(me,"[Lincoln] Decide outcome of Clearance vote");
			if(choice === 4){
				plainAlert(z.characters[me] + " cancels their vote.");
				z.votes[me] = -1;
				addOption(me,"Cast Your Vote");
				if(z.characters[me] === "Lincoln" && z.voteType === 1 && !z.fatigued[me]){
					addOption(me,"[Lincoln] Decide outcome of Clearance vote");
				}
				removeFromAll("Reveal All Votes");
				voteToken();
				mainMenu();
				return;
			}
			switch(choice-1){
				case 0:
				if(voteTampering()){
					addAlert("You will vote with and submit a Weak (red) die.");
				} else {
					addAlert("You will vote with a Weak (red) die.");
				}
				break;
				case 1:
				if(voteTampering()){
					addAlert("You will vote with and submit a Strong (black) die.");
				} else {
					addAlert("You will vote with a Strong (black) die.");
				}
				break;
				case 2:
				addAlert("You will abstain by voting with an empty fist.");
			}
			z.votes[me] = choice-1;
			removeOption(me,ch);
			voteToken();
			addOption(me,"Change Your Vote");
			let everyoneVoted = true;
			for(let j = 0; !(j>=z.numPlayers) && everyoneVoted; j++){
				everyoneVoted = z.revealed[j] || z.votes[j] !== -1;
			}
			if(everyoneVoted){
				optionForAll("Reveal All Votes");
			}
			mainMenu();
		});
	return; }
	case "Do not claim a Threat Token":
		confirmify("Confirming you do not want to claim a Threat Token.",mainMenu,()=>{
			/* TODO: random set of platitudes */
			boldAlert("Noguchi Masaki: Bringing Democracy to the Outer Planets.\r\n");
			revealVotes(false);
			mainMenu();
		});
		return;
	case "Reveal All Votes":
		confirmify("Confirming you want to reveal everyone's votes.",mainMenu,()=>{
			revealVotes(true);
			mainMenu();
		});
		return;
	case "Break the tied vote": {
		let promptText = "How would you like to break the tied vote? (1-2)";
		promptText += "\n1: In favor of the Weak (red) side";
		promptText += "\n2: In favor of the Strong (black) side";
		promptNum(promptText,(a)=>1>a||a>2,mainMenu,(choice)=>{
			removeOption(me,ch);
			resolveVote(choice-1);
			mainMenu();
		});
	return; }
	case "Draw Task Cards":
		confirmify("Confirming you want to draw Task cards.",mainMenu,()=>{
			removeOption(me,ch);
			removeOption(me,"Perform an Action");
			drawTaskCards();
			mainMenu();
		});
		return;
	case "Choose a Task Card": {
		let chaya = z.characters[z.turn] === "Chaya" && !z.fatigued[z.turn]; 
		let promptText = "Which Task would you like to choose?  The other";
		if(chaya){
			promptText += "s";
		}
		promptText += " will be discarded.";
		let cardsToDraw = 2;
		if(chaya){
			cardsToDraw++;
		}
		if(me === z.turn){
			for(let j = 1; !(j>cardsToDraw); j++){
				promptText += "\n"+j+": " + alertTaskName(z.taskDeck[z.taskDeck.length - j]);
			}
		}
		promptNum(promptText,(a)=>1>a||a>cardsToDraw,mainMenu,(choice)=>{
			removeOption(me,ch);
			z.currentTask = z.taskDeck[z.taskDeck.length - choice];
			for(let j = 1; !(j>cardsToDraw); j++){
				z.taskDiscards.push(z.taskDeck.pop());
			}
			startTask();
			mainMenu();
		});
	return; }
	case "[Acceptable Loss] Damage Shields":
		confirmify("Confirming you want to damage the shields.",mainMenu,()=>{
			removeOption(me,ch);
			removeOption(me,"[Acceptable Loss] Damage Outpost");
			removeOption(me,"[Acceptable Loss] Damage Life Support");
			if(damageShields(1)){
				taskSucceeds();
			}
			mainMenu();
		});
		return;
	case "[Acceptable Loss] Damage Outpost":
		/* TODO: there's got to be a better way to use promises to go back to the main menu. */
		confirmify("Confirming you want to damage the Outpost.",mainMenu,()=>{
			removeOption(me,ch);
			removeOption(me,"[Acceptable Loss] Damage Shields");
			removeOption(me,"[Acceptable Loss] Damage Life Support");
			damageOutpost();
			taskSucceeds();
			mainMenu();
		});
		return;
	case "[Acceptable Loss] Damage Life Support":
		confirmify("Confirming you want to damage Life Support.",mainMenu,()=>{
			removeOption(me,ch);
			removeOption(me,"[Acceptable Loss] Damage Shields");
			removeOption(me,"[Acceptable Loss] Damage Outpost");
			damageLifeSupport();
			taskSucceeds();
			mainMenu();
		});
		return;
	case "[Strategic Compromise] Damage Shields":
		/* RULES: exact ordering on damage drawing vs testing shields.  We assume the Shield Test comes after all damage (and can thus kill you) */
		confirmify("Confirming you want to damage the shields.",mainMenu,()=>{
			z.strategicCompromise++;
			boldAlert(z.characters[me] + " damages the Shields.");
			if(z.strategicCompromise === 1){
				z.strategicCompromiseShieldDamage = true;
				z.shieldDamage++;
				if(z.shieldDamage === 5){
					removeOption(me,ch);
				}
				plainAlert("The Shield test will come after the next damage.");
			} else {
				removeOption(me,ch);
				removeOption(me,"[Strategic Compromise] Damage Outpost");
				removeOption(me,"[Strategic Compromise] Damage Life Support");
				if(damageShields(1)){
					taskSucceeds();
				}
			}	
			mainMenu();
		});
		return;
	case "[Strategic Compromise] Damage Outpost":
		confirmify("Confirming you want to damage the Outpost.",mainMenu,()=>{
			z.strategicCompromise++;
			damageOutpost();
			if(z.strategicCompromise === 1){
				if(z.outpostDamage.length === 5){
					removeOption(me,ch);
				}
			} else {
				removeOption(me,ch);
				removeOption(me,"[Strategic Compromise] Damage Shields");
				removeOption(me,"[Strategic Compromise] Damage Life Support");
				if(z.strategicCompromiseShieldDamage){
					if(testShields()){
						taskSucceeds();
					}
				} else {
					taskSucceeds();
				}
			}
			mainMenu();
		});
		return; 
	case "[Strategic Compromise] Damage Life Support":
		confirmify("Confirming you want to damage Life Support.",mainMenu,()=>{
			z.strategicCompromise++;
			damageLifeSupport();
			if(z.strategicCompromise === 1){
				if(z.fatigueDamage.length === 5){
					removeOption(me,ch);
				}
			} else {
				removeOption(me,ch);
				removeOption(me,"[Strategic Compromise] Damage Shields");
				removeOption(me,"[Strategic Compromise] Damage Outpost");
				if(z.strategicCompromiseShieldDamage){
					if(testShields()){
						taskSucceeds();
					}
				} else {
					taskSucceeds();
				}
			}
			mainMenu();
		});
		return;
	case "[Act of Trust] Choose a target": {
		let promptText = "Who would you like to target with Act of Trust?  If they agree, their die limit will be decreased by 1 and yours will be increased by 1.";
		for(let j = 0; !(j>=z.numPlayers); j++){
			promptText += "\n"+(j+1)+": ";
			if(z.revealed[j]){
				promptText += "[INFECTED]";
			} else if (j === me){
				promptText += "[cannot choose yourself]";
			} else {
				promptText += z.characters[j];
			}
		}
		promptNum(promptText,(a)=>1>a||a>z.numPlayers || z.revealed[a-1] || a-1 === me,mainMenu,(choice) => {
			removeOption(me,ch);
			boldAlert(z.characters[me] + " targets " + z.characters[choice-1] + " for Act of Trust.");
			addOption(choice-1,"[Act of Trust] Reduce your Die Limit by 1");
			addOption(choice-1,"[Act of Trust] Refuse to reduce your Die Limit");
			mainMenu();
		});
	return; }
	case "[Act of Trust] Reduce your Die Limit by 1":
		/* RULES: Does Act of Trust actually transfer a die? Or just the die limit */
		confirmify("Confirming you want to reduce your die limit by 1 and increase "+z.characters[z.turn]+"'s die limit by 1.  The task will succeed.",mainMenu,()=>{
			removeOption(me,ch);
			removeOption(me,"[Act of Trust] Refuse to reduce your Die Limit");
			boldAlert(z.characters[me] + " agrees to reduce their die limit.");
			z.dieLimit[me]--;
			z.dieLimit[z.turn]++;
			if(z.blackDice[me] + z.redDice[me] > dieLimit(me)){
				plainAlert(z.characters[me] + " is over their new die limit of "+dieLimit(me)+" and must discard a die.");
				addOption(me,"[Act of Trust] Discard a die");
			} else {
				taskSucceeds();
			}
			mainMenu();
		});
		return;
	case "[Act of Trust] Refuse to reduce your Die Limit": {
		let confirmText = "Confirming you want to refuse to reduce your die limit.  The task will fail, and ";
		if(z.currentTask === 15){
			confirmText += " the Outpost will be damaged.";
		} else {
			confirmText += " the Shields will be damaged.";
		}
		confirmify(confirmText,mainMenu,()=>{
			removeOption(me,ch);
			removeOption(me,"[Act of Trust] Reduce your Die Limit by 1");
			boldAlert(z.characters[me] + " refuses to reduce their die limit.");
			if(z.currentTask === 15){
				damageOutpost();
				if(z.gameOver){
					saveAndQuit();
					return;
				}
			} else if(!damageShields(1)){
				mainMenu();
				return;
			}
			taskFails();
			mainMenu();
		});
	return; }
	case "[Failure to Lead] Nominate a new Commander": {
		let promptText = "Who would you like to be the new Commander? (1-"+z.numPlayers+")";
		for(let j = 0; !(j>=z.numPlayers); j++){
			promptText += "\n"+(j+1)+": ";
			if(z.revealed[j]){
				promptText += "[INFECTED]";
			} else if (z.quarantined[j]){
				promptText += "[QUARANTINED]";
			} else if (j === z.commander){
				promptText += "[COMMANDER]";
			} else {
				promptText += z.characters[j];
			}
		}
		promptNum(promptText,(a)=>1>a||a>z.numPlayers|| z.revealed[a-1] || z.quarantined[a-1] || a-1 === z.commander, mainMenu,(choice)=>{
			boldAlert(z.characters[me] + " nominates "+z.characters[choice-1]+" to be the new Commander.  Commander "+z.characters[z.commander]+" may now choose to give up the title, or not.");
			z.failureToLead = choice - 1;
			addOption(z.commander,"[Failure to Lead] Give up the Commander title");
			addOption(z.commander,"[Failure to Lead] Refuse to give up the Commander title");
			removeOption(me,ch);
			mainMenu();
		});
	return; }
	case "[Failure to Lead] Give up the Commander title":
		confirmify("Confirming that you want to make "+z.characters[z.failureToLead]+" the new Commander.  The task will succeed.",mainMenu,()=>{
			z.commander = z.failureToLead;
			updateBanner(z.commander,defaultBanner(z.commander));
			updateBanner(me,defaultBanner(me));
			boldAlert(z.characters[z.commander]+" is now the Commander.");
			if(z.commanderDieInHand){
				plainAlert("The Commander die is returned to the pool.");
				z.commanderDieInHand = false;
			}
			removeOption(me,ch);
			removeOption(me,"[Failure to Lead] Refuse to give up the Commander title");
			taskSucceeds();
			mainMenu();
		});
		return;
	case "[Failure to Lead] Refuse to give up the Commander title":
		confirmify("Confirming that you want to keep the Commander title.  The task will fail, and you will draw a Shield token.",mainMenu,()=>{
			boldAlert("Commander "+z.characters[z.commander]+" refuses to relinquish their title.");
			removeOption(me,ch);
			removeOption(me,"[Failure to Lead] Give up the Commander title");
			if(damageShields(1)){
				taskFails();
			}
			mainMenu();
		});
		return;
	case "[Voluntary Blood Testing] Choose a target": {
		let promptText = "Whose Status would you like to inspect with Voluntary Blood Testing?  Remember that they may decline.";
		for(let j = 0; !(j>=z.numPlayers); j++){
			promptText += "\n"+(j+1)+": ";
			if(z.revealed[j]){
				promptText += "[INFECTED]";
			} else if (j === me){
				promptText += "[cannot choose yourself]";
			} else {
				promptText += z.characters[j];
			}
		}
		promptNum(promptText,(a)=>1>a||a>z.numPlayers||z.revealed[a-1] || a-1 === me,mainMenu,(choice)=>{
			removeOption(me,ch);
			boldAlert(z.characters[me] + " targets " + z.characters[choice-1] + " for Voluntary Blood Testing.");
			addOption(choice-1,"[Voluntary Blood Testing] Show your Status card to the Active Player");
			addOption(choice-1,"[Voluntary Blood Testing] Refuse to show your Status card");
			mainMenu();
		});
	return; }
	case "[Voluntary Blood Testing] Show your Status card to the Active Player":
		confirmify("Confirming you want to show your Status card to "+z.characters[z.turn]+".  The task will succeed.",mainMenu,()=>{
			removeOption(me,ch);
			removeOption(me,"[Voluntary Blood Testing] Refuse to show your Status card");
			boldAlert(z.characters[me] + " shows their Status card to "+z.characters[z.turn]+".");
			z.secrets[z.turn].push(z.characters[me]+"'s Status card is: "+loyaltyName(z.statusCards[me]));
			taskSucceeds();
			mainMenu();
		});
		return;
	case "[Voluntary Blood Testing] Refuse to show your Status card":
		confirmify("Confirming you do NOT want to show your Status card to "+z.characters[z.turn]+".  The task will fail, and an Outpost token will be drawn.",mainMenu,()=>{
			removeOption(me,ch);
			removeOption(me,"[Voluntary Blood Testing] Show your Status card to the Active Player");
			boldAlert(z.characters[me] + " refuses to show their Status card to "+z.characters[z.turn]+".");
			damageOutpost();
			if(!z.gameOver){
				taskFails();
				mainMenu();
			} else {
				saveAndQuit();
			}
		});
		return;
	case "Choose Malfunction type": {
		let promptText = "Which type of Malfunction would you like this to be? (1-3)\n1: Shield\n2: Outpost\n3: Life Support";
		promptNum(promptText,(a)=>1>a||a>3,mainMenu,(choice)=>{
			removeOption(me,ch);
			switch(choice){
				case 1:
				z.taskType = 'S';
				break;
				case 2:
				z.taskType = 'O';
				break;
				case 3:
				z.taskType = 'L';
			}
			startMalfunction(); 
			mainMenu();
		});
		return;}
	case "Go IN for this Malfunction":
		confirmify("Confirming that you want to be IN for this Malfunction; you will have to submit at least 1 die.",mainMenu,()=>{
			removeOption(me,ch);
			removeOption(me,"Be OUT for this Malfunction");
			let nextPlayer = (me + 1) % z.numPlayers;
			z.participation[me] = 1;
			participationToken();
			if((z.firstIsLast && me === z.turn) || (!z.firstIsLast && nextPlayer === z.turn)){
				startSubmissions();
			} else {
				if(theirDice(nextPlayer) > 0){
					addOption(nextPlayer,"Go IN for this Malfunction");
				}
				addOption(nextPlayer,"Be OUT for this Malfunction");
			}
			mainMenu();
		});
		return;
	case "Be OUT for this Malfunction": {
		let confirmText = "Confirming that you want to be OUT for this Malfunction and retrieve dice instead.";
		if(z.outpostDamage.includes("Command") && !z.revealed[me]){
			confirmText += "\nRemember that Command is damaged: 1 less die when passing.";
		}
		if(z.fatigued[me] && z.characters[me] === "Jon"){
			confirmText += "\nRemember that you are fatigued and do not get to retrieve an extra die.";
		}
		confirmify(confirmText,mainMenu,()=>{
			removeOption(me,ch);
			removeOption(me,"Go IN for this Malfunction");
			z.participation[me] = 0;
			if((z.blackDice[me] + z.redDice[me] === dieLimit(me) && (me !== z.commander || z.commanderDieInHand)) || (z.redPool === 0 && (z.blackPool === 0 || (z.numPlayers >= z.blackPool && foodRationing())) && (me !== z.commander || z.commanderDieInHand))){
				participationToken();
				plainAlert(z.characters[me]+" chooses not to retrieve any dice.");
				let nextPlayer = (me + 1) % z.numPlayers;
				if((z.firstIsLast && me === z.turn) || (!z.firstIsLast && nextPlayer === z.turn)){
					startSubmissions();
				} else {
					if(theirDice(nextPlayer) > 0){
						addOption(nextPlayer,"Go IN for this Malfunction");
					}
					addOption(nextPlayer,"Be OUT for this Malfunction");
				}
			} else {
				addOption(me,"[OUT] Retrieve Dice");
			}
			mainMenu();
		});
		return;
	}
	case "[OUT] Retrieve Dice": {
		let retrievalMax = 2;
		if(z.characters[me] === "Jon" && !z.revealed[me] && !z.fatigued[me]){
			retrievalMax++;
		}
		if(z.outpostDamage.includes("Command") && !z.revealed[me]){
			retrievalMax--;
		}		
		let diceAvailable = z.blackPool;
		if(foodRationing()){
			diceAvailable -= z.numPlayers;
			if(0 > diceAvailable){
				diceAvailable = 0;
			}
		}
		diceAvailable += z.redPool;
		if(me === z.commander && !z.commanderDieInHand){
			diceAvailable++;
		}
		if(retrievalMax > diceAvailable){
			retrievalMax = diceAvailable;
		}
		
		/*RULES: can you take fewer dice than your limit allows when you go OUT? */
		let diceCanTake = dieLimit(me) - z.blackDice[me] - z.redDice[me];
		if(me === z.commander && !z.commanderDieInHand){
			diceCanTake++;
		}
		if(retrievalMax > diceCanTake){
			retrievalMax = diceCanTake;
		}
		promptNum("How many dice would you like to retrieve? (0-"+retrievalMax+")",(a)=>0>a||a>retrievalMax,mainMenu,(choice)=>{
			
			let doneRetrievingDice = function(){
				participationToken();
				removeOption(me,ch);
				let nextPlayer = (me + 1) % z.numPlayers;
				if((z.firstIsLast && me === z.turn) || (!z.firstIsLast && nextPlayer === z.turn)){
					startSubmissions();
				} else {
					if(theirDice(nextPlayer) > 0){
						addOption(nextPlayer,"Go IN for this Malfunction");
					}
					addOption(nextPlayer,"Be OUT for this Malfunction");
				}
				mainMenu();
			};
			
			if(choice === 0){
				plainAlert(z.characters[me]+" chooses not to retrieve any dice.");
				doneRetrievingDice();
			} else {
				retrieveDice(choice).then(doneRetrievingDice,mainMenu);
			}
		});
	return; }
	case "[Pound of Flesh] Do not claim a Threat Token":
		confirmify("Confirming you do not want to claim a Threat Token.",mainMenu,()=>{
			/* TODO: random set of platitudes */
			boldAlert("Noguchi Masaki paeans unnecessary bloodshed.\r\n");
			removeOption(me,ch);
			removeOption(me,"[Pound of Flesh] Claim a Threat Token");
			let any = false;
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(z.options[j].includes("[Pound of Flesh] Do not claim a Threat Token")){
					any = true;
				}
			}
			if(!any){
				boldAlert(z.characters[z.voteTarget] + " is amputated!");
				if(amputate(z.voteTarget) && z.currentTask === 22){
					doneWithVote();
					taskSucceeds();
				}
			} else {
				plainAlert("But wait, there's more...");
			}
			mainMenu();
		});
		return;
	case "[Pound of Flesh] Claim a Threat Token":
		confirmify("Confirming you want to claim a Retrieve Sample Threat Token.",mainMenu,()=>{
			boldAlert("I have done what the company has asked me to do.");
			if(z.threatTokenPool.includes(0)){
				z.threatTokenPool.splice(z.threatTokenPool.indexOf(0),1);
				z.threatTokens[me] = 0;
				plainAlert(z.characters[me] + " claims a Retrieve Sample Threat Token.");
			} else {
				z.threatTokenPool.splice(z.threatTokenPool.indexOf(4),1);
				z.threatTokens[me] = 4;
				plainAlert(z.characters[me] + " claims a Wild Threat Token, as there were no Retrieve Sample tokens available.");
			}
			removeOption(me,ch);
			removeOption(me,"[Pound of Flesh] Do not claim a Threat Token");
			let any = false;
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(z.options[j].includes("[Pound of Flesh] Do not claim a Threat Token")){
					any = true;
				}
			}
			if(!any){
				boldAlert(z.characters[z.voteTarget] + " is amputated!");
				if(amputate(z.voteTarget) && z.currentTask === 22){
					doneWithVote();
					taskSucceeds();
				}
			} else {
				plainAlert("But wait, there's more...");
			}
			mainMenu();
		});
		return;
	case "[Retrieve Sample] Claim a Threat Token":
		confirmify("Confirming you want to claim a Retrieve Sample Threat Token.",mainMenu,()=>{
			boldAlert("I have done what the company has asked me to do.");
			if(z.threatTokenPool.includes(0)){
				z.threatTokenPool.splice(z.threatTokenPool.indexOf(0),1);
				z.threatTokens[me] = 0;
				plainAlert(z.characters[me] + " claims a Retrieve Sample Threat Token.");
			} else {
				z.threatTokenPool.splice(z.threatTokenPool.indexOf(4),1);
				z.threatTokens[me] = 4;
				plainAlert(z.characters[me] + " claims a Wild Threat Token, as there were no Retrieve Sample tokens available.");
			}
			revealVotes(false);
			mainMenu();
		});
		return;
	case "[Isolate Specimen] Claim a Threat Token":
		confirmify("Confirming you want to claim the Isolate Specimen Threat Token.",mainMenu,()=>{
			boldAlert("I have done what the company has asked me to do.");
			if(z.threatTokenPool.includes(3)){
				z.threatTokenPool.splice(z.threatTokenPool.indexOf(3),1);
				z.threatTokens[me] = 3;
				plainAlert(z.characters[me] + " claims the Isolate Specimen Threat Token.");
			} else {
				z.threatTokenPool.splice(z.threatTokenPool.indexOf(4),1);
				z.threatTokens[me] = 4;
				plainAlert(z.characters[me] + " claims a Wild Threat Token, as there were no Isolate Specimen tokens available.");
			}
			revealVotes(false);
			mainMenu();
		});
		return;
	case "[Act Recklessly] Claim a Threat Token":
		confirmify("Confirming you want to claim an Act Recklessly Threat Token.",mainMenu,()=>{
			removeOption(me,ch);
			boldAlert("I have done what the company has asked me to do.");
			if(z.threatTokenPool.includes(1)){
				z.threatTokenPool.splice(z.threatTokenPool.indexOf(1),1);
				z.threatTokens[me] = 1;
				plainAlert(z.characters[me] + " claims an Act Recklessly Threat Token.");
			} else {
				z.threatTokenPool.splice(z.threatTokenPool.indexOf(4),1);
				z.threatTokens[me] = 4;
				plainAlert(z.characters[me] + " claims a Wild Threat Token, as there were no Act Recklessly tokens available.");
			}
			removeOption(me,ch);
			removeOption(me,"Submit a die");
			removeOption(me,"Reroll your dice");
			removeOption(me,"I'm done submitting dice");
			submissionToken();
			let nextPlayer = -1;
			for(let j = 1; !(j>=z.numPlayers); j++){
				let k = (me + j)%z.numPlayers;
				if((!z.firstIsLast && k === z.turn) || (z.firstIsLast && k === ((z.turn + 1) % z.numPlayers) )){
					break;
				}
				if(z.participation[k] === 1){
					nextPlayer = k;
					break;
				}
			}
			if(nextPlayer === -1){
				resolveMalfunction();
			} else {
				rollAllDice(nextPlayer);
				addOption(nextPlayer,"Submit a die");
			}
			mainMenu();
		});
		return;
	
		
	}
}
// ENDNMWS [/size] 


