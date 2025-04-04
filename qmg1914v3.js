
/*[size=1] STARTQMGA /**/
/*jshint -W104*/
/*jshint -W018*/
/*jshint -W119*/
/*jshint -W086*/
/*jshint -W014*/
/*jshint +W117*/
var QMGversion = [3,12,1];
var myUsername = "";
var usernameRE = /href="\/collection\/user\/(.*?)">Collection/.exec(document.body.innerHTML);
if(usernameRE){
	myUsername = usernameRE[1];
}
var ts = document.getElementsByTagName("textarea");
var t = ts[ts.length-1];
var z = {};
var me = -1;
var power = "";
var powerName = "";
function isMobile() {
  try{ document.createEvent("TouchEvent"); return true; }
  catch(e){ return false; }
}
function clearBackground(){
	hideElement(alertifyBackground);
}

var mobile = isMobile();


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
	} else {
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
		let defaultText = queuedPrompt[5];
		let main = queuedPrompt[6];
        queuedPrompt = [];
        promptNum(promptText,illegal,cancel,user,defaultText,main);
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
	} else {
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
	
  } else {
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

function promptNum(promptText, illegal, cancel, user, defaultText, main) {
	if(!defaultText){
		defaultText = "";
	}
  if(queuedPrompt.length > 0){
    alert("Error! Cannot queue multiple prompts");
  } else if (alertQueue.length > 0) {
    queuedPrompt = ["promptNum",promptText, illegal, cancel, user, defaultText, main];
  } else if(0 > me || me >= z.numPlayers || z.promptStyle[me] === 0){
		let prompted = prompt(promptText,defaultText);
		if(prompted === null){
			cancel();
		} else {
			let n = parseInt(prompted);
			if(isNaN(n) || illegal(n)){
				promptNum(promptText,illegal,cancel,user,defaultText,main);
			} else {
				user(n);
			}
		}
	} else {
		if(main){
			alertify.cancelBtn("Save and Quit").okBtn("OK");
		} else {
			alertify.cancelBtn("Cancel").okBtn("OK");
		}
		if(!mobile || tooManyOptions(illegal)){
			alertify.defaultValue(defaultText).prompt(promptText).then((arg)=>{
			  arg.event.preventDefault();
			  if (arg.buttonClicked === "cancel" || arg.inputValue === null) {
				  alertify.defaultValue("");
				  let n = parseInt(arg.inputValue);
					if(main && !isNaN(n) && !illegal(n)) {
						confirmify('Are you sure you want to quit?  Whatever option you had typed in the dialog box when you pressed "Save and Quit" will not be processed.', 
									mainMenu, cancel, "Yes, Quit", "No, Go Back");
					} else {
						cancel();
					}
			  } else if(main && (arg.inputValue === "a" || arg.inputValue === "A" || arg.inputValue === "b" || arg.inputValue === "B" || arg.inputValue === "c" || arg.inputValue === "C")){
				  alertify.defaultValue("");
				  user(arg.inputValue);
			  } else {
				let n = parseInt(arg.inputValue);
				if (isNaN(n) || illegal(n)) {
				  promptNum(promptText, illegal, cancel, user, defaultText,main);
				} else {
				  alertify.defaultValue("");
				  user(n);
				}
			  }
			});
		} else {
			alertify.defaultValue(defaultText).promptButton(promptText,illegal).then((arg)=>{
				arg.event.preventDefault();
				if(arg.buttonClicked === "cancel"){
					alertify.defaultValue("");
					cancel();
				} else {
					alertify.defaultValue("");
					let choice = /^choice(.*)$/.exec(arg.buttonClicked)[1];
					if(isNaN(choice)){
						user(choice);
					} else {
						user(parseInt(choice));
					}
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
    
  } else {
	  alertify.cancelBtn("Cancel").okBtn("OK");
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


function bold(str) {
	return "[b" + "]" + str + "[/" + "b]";
}

function spoiler(str) {
	return "[o" + "]" + str + "[/" + "o]";
}

function size(str, pt) {
	return "[size=" + pt + "]" + str + "[/" + "size]";
}

function invisible(str) {
	return "[color=" + "#FFFFFF]" + str + "[/" + "color]";
}

var aLCG = 1664525;
var cLCG = 1013904223;
var mLCG = 0x100000000;



function initializeSeeds(){
	z.seed = [];
	for(let j = 0; !(j>=5); j++){
		z.seed.push(Math.floor(Math.random() * mLCG));
	}
}

function shuffle(array) {
	if(!("seed" in z)){
		initializeSeeds();
	}
	let player = me;
	if(me !== 0 && me !== 1 && me !== 2 && me !== 3 && me !== 4){
		player = 0;
	}
	for (let i = array.length; i > 0; i--) {
		let rando = Math.floor((z.seed[player] * i) / mLCG);
		z.seed[player] = (aLCG * z.seed[player] + cLCG) % mLCG;
		let removed = array.splice(rando, 1)[0];
		array.push(removed);
	}
	return array;
}

function province(name,terrain,neighbors){
	this.name = name;
	this.terrain = terrain;
	this.neighbors = neighbors;
}
/* TODO: jscompress */
var provinces = {};
provinces.USA = new province("USA","Clear",["WAO","CAN"]);
provinces.WAO = new province("WAO","Sea",["USA","NAO","CAN"]);
provinces.NAO = new province("NAO","Sea",["WAO","IRE","BRI","ENG","PAR","WES"]);
provinces.IRE = new province("IRE","Clear",["NAO"]);
provinces.BRI = new province("BRI","Clear",["ENG","NAO"]);
provinces.ENG = new province("ENG","Sea",["BRI","NAO","PAR","PIC","BEL","NTH"]);
provinces.NTH = new province("NTH","Sea",["ENG","BEL","WGE"]);
provinces.BAL = new province("BAL","Sea",["WGE","BER","PRU","POL","PET"]);
provinces.WES = new province("WES","Sea",["PRO","NAO","ALP","ROM","EAS"]);
provinces.EAS = new province("EAS","Sea",["WES","ROM","ADR","GRE","BUL","IST","ANA","MID"]);
provinces.ADR = new province("ADR","Sea",["EAS","ROM","ALP","TYR","BUD","SER","GRE"]);
provinces.BLA = new province("BLA","Sea",["IST","BUL","RUM","UKR","CAU","AZE","ANA"]);
provinces.CAS = new province("CAS","Sea",["CAU","AZE","PER"]);
provinces.PAR = new province("PAR","Clear",["NAO","ENG","PIC","BUR","PRO"]);
provinces.PIC = new province("PIC","Clear",["ENG","PAR","BUR","BEL"]);
provinces.BEL = new province("BEL","Clear",["ENG","NTH","PIC","BUR","WGE"]);
provinces.WGE = new province("WGE","Clear",["NTH","BAL","BEL","BUR","TYR","VIE","BER"]);
provinces.BER = new province("BER","Clear",["BAL","WGE","VIE","PRU"]);
provinces.PRU = new province("PRU","Clear",["BAL","BER","VIE","GAL","POL"]);
provinces.POL = new province("POL","Clear",["BAL","PRU","GAL","UKR","PET"]);
provinces.PET = new province("PET","Clear",["BAL","POL","UKR","MOS"]);
provinces.MOS = new province("MOS","Clear",["PET","UKR","CAU"]);
provinces.UKR = new province("UKR","Clear",["BLA","CAU","MOS","PET","POL","GAL","RUM"]);
provinces.RUM = new province("RUM","Clear",["BLA","BUL","SER","BUD","GAL","UKR"]);
provinces.GAL = new province("GAL","Clear",["PRU","POL","UKR","RUM","BUD","VIE"]);
provinces.BUR = new province("BUR","Difficult",["PAR","PIC","BEL","WGE","PRO"]);
provinces.PRO = new province("PRO","Difficult",["WES","PAR","BUR","ALP"]);
provinces.ALP = new province("ALP","Difficult",["WES","ROM","ADR","TYR","PRO"]);
provinces.ROM = new province("ROM","Difficult",["WES","EAS","ADR","ALP"]);
provinces.TYR = new province("TYR","Difficult",["ADR","ALP","WGE","VIE","BUD"]);
provinces.VIE = new province("VIE","Difficult",["WGE","BER","PRU","GAL","BUD","TYR"]);
provinces.BUD = new province("BUD","Difficult",["ADR","TYR","VIE","GAL","RUM","SER"]);
provinces.SER = new province("SER","Difficult",["ADR","BUD","RUM","BUL","GRE"]);
provinces.GRE = new province("GRE","Difficult",["ADR","EAS","SER","BUL"]);
provinces.BUL = new province("BUL","Difficult",["EAS","GRE","SER","RUM","BLA","IST"]);
provinces.IST = new province("IST","Difficult",["EAS","BUL","BLA","ANA"]);
provinces.ANA = new province("ANA","Difficult",["EAS","IST","BLA","AZE","PER","MID"]);
provinces.MID = new province("MID","Difficult",["EAS","ANA","PER"]);
provinces.PER = new province("PER","Difficult",["CAS","AZE","ANA","MID"]);
provinces.AZE = new province("AZE","Difficult",["BLA","CAU","CAS","PER","ANA"]);
provinces.CAU = new province("CAU","Difficult",["BLA","AZE","CAS","MOS","UKR"]);
provinces.CAN = new province("CAN","Clear",["USA","WAO"]);

function imageO(id){
	return "[ima"+"geid="+id+" original inline]";
}

function imageM(id){
	return "[ima"+"geid="+id+" medium inline]";
}

function plainAlert(str){
	addAlert(str);
	t.value += str+"\r\n";
}

function boldAlert(str){
	addAlert(str);
	t.value += bold(str)+"\r\n";
}

function mapError(str) {
	boldAlert(str);
}



function provinceImage(name){
	/* TODO: canada */
	if(provinces[name].terrain === "Sea"){
		let navies = [];
		for(const x in z.countries){
			for(let j = 0; z.countries[x].navies.length > j; j++){
				if(z.countries[x].navies[j] === name){
					navies.push(z.countries[x].id);
				}
			}
		}
		navies.sort();
		switch(name){
		case "ADR":
			
if(navies.includes("AH") && navies.includes("DE")){
				return imageO(3809589);
			}
			if(navies.includes("UK") && navies.includes("IT")){
				return imageO(5293296);
			}
			if(navies.length >= 2){
				mapError("Missing Navy in ADR");
			} 
			
if(navies.includes("AH")){
						return imageO(3809586);
					}
					
if(navies.includes("UK")){
						return imageO(3809590);
					} 
					
					if(navies.includes("FR")){
						return imageO(3809591);
					}
					
					if(navies.includes("DE")){
						return imageO(3809592);
					}
					
					if(navies.includes("IT")){
						return imageO(3809593);
					}
					
					if(navies.includes("FR")){
						return imageO(3809594);
					}
					if(navies.includes("RU")){
						return imageO(5309583);
					}
					if(navies.length === 1){
				mapError("Missing Navy in ADR");
			}
			return imageO(3809386);
		case "BAL":
		
			if(navies.includes("AH") && navies.includes("DE")){
				return imageO(3809633);
			}
			if(navies.length >=2){
				mapError("Missing Navy in BAL");
			}
			
			if(navies.includes("AH")){
				return imageO(3809632);
			}
			
			if(navies.includes("DE")){
				return imageO(3809635);
			}
			
			if(navies.includes("RU")){
				return imageO(3809637);
			}
			if(navies.length === 1){
				mapError("Missing Navy in BAL");
			}
			return imageO(3808849);
		case "BLA":
		
			if(navies.includes("AH") && navies.includes("DE")){
				return imageO(3809670);
			}
			if(navies.length >=3){
				mapError("Missing Navy in BLA");
			}
			
			if(navies.includes("UK") && navies.includes("RU")){
				return imageO(3809675);
			}
			if(navies.length === 2){
				mapError("Missing Navy in BLA");
			}
			
			if(navies.includes("AH")){
				return imageO(3809669);
			}
			
			if(navies.includes("UK")){
				return imageO(3809671);
			}
			
			if(navies.includes("DE")){
				return imageO(3809672);
			}
			
			if(navies.includes("RU")){
				return imageO(3809673);
			}
			if(navies.length === 1){
				mapError("Missing Navy in BLA");
			}
			return imageO(3809342);
		case "CAS":
			if(navies.length >=2){
				mapError("Missing Navy in CAS");
			}
			
			if(navies.includes("AH")){
				return imageO(3809757);
			}
			
			if(navies.includes("UK")){
				return imageO(3809758);
			}
			
			if(navies.includes("RU")){
				return imageO(3809759);
			}
			if(navies.length === 1){
				mapError("Missing Navy in CAS");
			}
			return imageO(3809489);
		case "EAS":
			if(navies.length >= 3){
				mapError("Missing Navy in EAS");
			}
			
			if(navies.includes("UK") && navies.includes("RU")){
				return imageO(3809771);
			}
			
			if(navies.includes("UK") && navies.includes("FR")){
				return imageO(3809774);
			}
			
			if(navies.includes("UK") && navies.includes("IT")){
				return imageO(3809776);
			}
			
			if(navies.includes("IT") && navies.includes("RU")){
				return imageO(3809779);
			}
			if(navies.length === 2){
				mapError("Missing Navy in EAS");
			}
			
			if(navies.includes("AH")){
				return imageO(3809769);
			}
			
			if(navies.includes("UK")){
				return imageO(3809770);
			}
			 
 if(navies.includes("FR")){
				return imageO(3809772);
			}
			 
 if(navies.includes("IT")){
				return imageO(3809775);
			}
			 
 if(navies.includes("RU")){
				return imageO(3809777);
			}
			if(navies.length === 1){
				mapError("Missing Navy in EAS");
			}
			return imageO(3809538);
		case "ENG":
			if(navies.length >= 4){
				mapError("Missing Navy in ENG");
			}
			 
 if(navies.includes("UK") && navies.includes("US") && navies.includes("FR")){
				return imageO(3809800);
			}
			if(navies.length === 3){
				mapError("Missing Navy in ENG");
			}
			 
 if(navies.includes("UK") && navies.includes("FR")){
				return imageO(3809786);
			}
			 
 if(navies.includes("UK") && navies.includes("US")){
				return imageO(3809798);
			}
			 
 if(navies.includes("US") && navies.includes("FR")){
				return imageO(3809801);
			}
			if(navies.length === 2){
				mapError("Missing Navy in ENG");
			}
			 
 if(navies.includes("UK")){
				return imageO(3809785);
			}
			 
 if(navies.includes("AH")){
				return imageO(3809783);
			}
			 
 if(navies.includes("FR")){
				return imageO(3809799);
			}
			 
 if(navies.includes("DE")){
				return imageO(3809802);
			}
			 
 if(navies.includes("US")){
				return imageO(3809803);
			}
			if(navies.length === 1){
				mapError("Missing Navy in ENG");
			}
			return imageO(3808847);
		case "NAO":
			if(navies.length >= 4){
				mapError("Missing Navy in NAO");
			}
			 
 if(navies.includes("UK") && navies.includes("US") && navies.includes("FR")){
				return imageO(3809865);
			}
			if(navies.length === 3){
				mapError("Missing Navy in NAO");
			}
			 
 if(navies.includes("UK") && navies.includes("FR")){
				return imageO(3808860);
			}
			 
 if(navies.includes("UK") && navies.includes("US")){
				return imageO(3809863);
			}
			 
 if(navies.includes("US") && navies.includes("FR")){
				return imageO(3809866);
			}
			if(navies.length === 2){
				mapError("Missing Navy in NAO");
			}
			 
 if(navies.includes("UK")){
				return imageO(3809862);
			}
			 
 if(navies.includes("FR")){
				return imageO(3809864);
			}
			 
 if(navies.includes("DE")){
				return imageO(3809867);
			}
			 
 if(navies.includes("US")){
				return imageO(3809868);
			}
			if(navies.length === 1){
				mapError("Missing Navy in NAO");
			}
			return imageO(3809870);
		case "NTH":
			if(navies.length >= 3){
				mapError("Missing Navy in NTH");
			}
			 
 if(navies.includes("UK") && navies.includes("FR")){
				return imageO(3809874);
			}
			if(navies.length === 2){
				mapError("Missing Navy in NTH");
			}
			 
 if(navies.includes("UK")){
				return imageO(3809872);
			}
			 
 if(navies.includes("FR")){
				return imageO(3809873);
			}
			 
 if(navies.includes("DE")){
				return imageO(3809875);
			}
			 
 if(navies.includes("AH")){
				return imageO(3809877);
			}
			if(navies.length === 1){
				mapError("Missing Navy in NTH");
			}
			return imageO(3808848);
		case "WAO":
			if(navies.length >= 3){
				mapError("Missing Navy in WAO");
			}
			if(navies.includes("US") && navies.includes("UK")){
				return imageO(7123489);
			}
			if(navies.length >= 2){
				mapError("Missing Navy in WAO");
			}
			 
 if(navies.includes("US")){
				return imageO(7123492);
			}
			 
 if(navies.includes("DE")){
				return imageO(7123491);
			}
			if(navies.includes("UK")){
				return imageO(7123490);
			}
			if(navies.length === 1){
				mapError("Missing Navy in WAO");
			}
			return imageO(7123494);
		case "WES":
			if(navies.length >= 3){
				mapError("Missing Navy in WES");
			}
			 
 if(navies.includes("UK") && navies.includes("FR")){
				return imageO(3810029);
			}
			 
 if(navies.includes("UK") && navies.includes("US")){
				return imageO(3810030);
			}
			 
 if(navies.includes("UK") && navies.includes("IT")){
				return imageO(3810037);
			}
			 
 if(navies.includes("IT") && navies.includes("FR")){
				return imageO(3810033);
			}
			 
 if(navies.includes("US") && navies.includes("FR")){
				return imageO(3810034);
			}
			if(navies.length === 2){
				mapError("Missing Navy in WES");
			}
			 
 if(navies.includes("AH")){
				return imageO(3810025);
			}
			 
 if(navies.includes("UK")){
				return imageO(3810028);
			}
			 
 if(navies.includes("FR")){
				return imageO(3810032);
			}
			 
 if(navies.includes("IT")){
				return imageO(3810036);
			}
			 
 if(navies.includes("US")){
				return imageO(3810038);
			}
			if(navies.length === 1){
				mapError("Missing Navy in WES");
			}
			return imageO(3809393);
		}
	} else {
		let armies = [];
		for(const x in z.countries){
			for(let j = 0; z.countries[x].armies.length > j; j++){
				if(z.countries[x].armies[j] === name){
					armies.push(z.countries[x].id);
				}
			}
		}
		armies.sort();
		switch(name){
		case "CAN":
			if(armies.length > 1){
				mapError("Missing Army in CAN");
			}
			if(armies.includes("DE")){
				return imageO(7123495);
			}
			if(armies.length === 1){
				mapError("Missing Army in CAN");
			}
			return imageO(7123501);
		case "ALP":
			if(armies.length >=3 ){
				mapError("Missing Army in ALP");
			}
			 
 if(armies.includes("AH") && armies.includes("DE")){
				return imageO(3809607);
			}
			 
 if(armies.includes("IT") && armies.includes("FR")){
				return imageO(3809601);
			}
			 
 if(armies.includes("IT") && armies.includes("UK")){
				return imageO(3809605);
			}
			 if(armies.includes("IT") && armies.includes("RU")){
				return imageO(5326650);
			}
			 if(armies.includes("UK") && armies.includes("RU")){
				return imageO(5326640);
			}
			if(armies.includes("US") && armies.includes("IT")){
				return imageO(5372487);
			}
			if(armies.length === 2){
				mapError("Missing Army in ALP");
			}
			 if(armies.includes("US")){
				 return imageO(5372486);
			 }
 if(armies.includes("AH")){
				return imageO(3809596);
			}
			 
 if(armies.includes("UK")){
				return imageO(3809598);
			}
			 
 if(armies.includes("FR")){
				return imageO(3809599);
			}
			 
 if(armies.includes("DE")){
				return imageO(3809603);
			}
			 
 if(armies.includes("IT")){
				return imageO(3809604);
			}
			if(armies.includes("RU")){
				return imageO(5326643);
			}
			if(armies.length === 1){
				mapError("Missing Army in ALP");
			}
			return imageO(3808889);
			case "ANA":
			if(armies.length >= 2){
				mapError("Missing Army in ANA");
			}
			 
 if(armies.includes("UK")){
				return imageO(3809611);
			}
			 
 if(armies.includes("IT")){
				return imageO(3809612);
			}
			 
 if(armies.includes("RU")){
				return imageO(3809615);
			}
			 
 if(armies.includes("OT")){
				return imageO(3809616);
			}
			if(armies.length === 1){
				mapError("Missing Army in ANA");
			}
			return imageO(3809478);
		case "AZE":
			if(armies.length >= 3){
				mapError("Missing Army in AZE");
			}
			 
 if(armies.includes("UK") && armies.includes("RU")){
				return imageO(3809623);
			}
			 
 if(armies.includes("IT") && armies.includes("RU")){
				return imageO(3818658);
			}
			if(armies.length === 2){
				mapError("Missing Army in AZE");
			}
			 
 if(armies.includes("IT")){
				return imageO(3818657);
			}
			 
 if(armies.includes("AH")){
				return imageO(3809618);
			}
			 
 if(armies.includes("UK")){
				return imageO(3809619);
			}
			 
 if(armies.includes("DE")){
				return imageO(3809620);
			}
			 
 if(armies.includes("RU")){
				return imageO(3809622);
			}
			 
 if(armies.includes("OT")){
				return imageO(3809624);
			}
			if(armies.length === 1){
				mapError("Missing Army in AZE");
			}
			return imageO(3809490);
		case "BEL":
			if(armies.length >= 3){
				mapError("Missing Army in BEL");
			}
			 
 if(armies.includes("UK") && armies.includes("FR")){
				return imageO(3809644);
			}
			 
 if(armies.includes("UK") && armies.includes("US")){
				return imageO(3809641);
			}
			 
 if(armies.includes("US") && armies.includes("FR")){
				return imageO(3809645);
			}
			if(armies.length === 2){
				mapError("Missing Army in BEL");
			}
			 
 if(armies.includes("UK")){
				return imageO(3809639);
			}
			 
 if(armies.includes("FR")){
				return imageO(3809643);
			}
			 
 if(armies.includes("US")){
				return imageO(3809646);
			}
			 
 if(armies.includes("DE")){
				return imageO(3808853);
			}
			if(armies.length === 1){
				mapError("Missing Army in BEL");
			}
			return imageO(3809647);
		case "BER":
			if(armies.length >= 3){
				mapError("Missing Army in BER");
			}
			 
 if(armies.includes("DE") && armies.includes("AH")){
				return imageO(3809650);
			}
			if(armies.length === 2){
				mapError("Missing Army in BER");
			}
			 
 if(armies.includes("DE")){
				return imageO(3808856);
			}
			 
 if(armies.includes("AH")){
				return imageO(3809648);
			}
			 
 if(armies.includes("UK")){
				return imageO(3809651);
			}
			 
 if(armies.includes("FR")){
				return imageO(3809654);
			}
			 
 if(armies.includes("IT")){
				return imageO(3809656);
			}
			 
 if(armies.includes("RU")){
				return imageO(3809657);
			}
			 
 if(armies.includes("US")){
				return imageO(3809658);
			}
			if(armies.length === 1){
				mapError("Missing Army in BER");
			}
			return imageO(3809660);
		case "BRI":
			if(armies.includes("FR") && armies.includes("UK") && armies.includes("US")){
				return imageO(4859822);
			}
			if(armies.length >= 3){
				mapError("Missing Army in BRI");
			}
			if(armies.includes("FR") && armies.includes("UK")){
				return imageO(4859820);
			}
			if(armies.includes("FR") && armies.includes("US")){
				return imageO(4859823);
			}
			if(armies.includes("UK") && armies.includes("US")){
				return imageO(4859821);
			}
			if(armies.length >= 2){
				mapError("Missing Army in BRI");
			}
			 
 if(armies.includes("AH")){
				return imageO(3809676);
			}
			 
 if(armies.includes("DE")){
				return imageO(3809677);
			}
			 
 if(armies.includes("UK")){
				return imageO(3808846);
			}
			if(armies.includes("US")){
				return imageO(4859824);
			}
			if(armies.includes("FR")){
				return imageO(4859825);
			}
			if(armies.length === 1){
				mapError("Missing Army in BRI");
			}
			return imageO(3809678);
		case "BUD":
			if(armies.length >= 3){
				mapError("Missing Army in BUD");
			}
			 
 if(armies.includes("DE") && armies.includes("AH")){
				return imageO(3809679);
			}
			 
 if(armies.includes("IT") && armies.includes("RU")){
				return imageO(3809683);
			}
			if(armies.includes("IT") && armies.includes("US")){
				return imageO(7314352);
			}
			if(armies.includes("RU") && armies.includes("US")){
				return imageO(7314353);
			}
			if(armies.length === 2){
				mapError("Missing Army in BUD");
			}
			if(armies.includes("US")){
				return imageO(7314354);
			}
 if(armies.includes("DE")){
				return imageO(3809680);
			}
			 
 if(armies.includes("IT")){
				return imageO(3809681);
			}
			 
 if(armies.includes("RU")){
				return imageO(3809682);
			}
			 
 if(armies.includes("AH")){
				return imageO(3809325);
			}
			if(armies.length === 1){
				mapError("Missing Army in BUD");
			}
			return imageO(3809684);
		case "BUL":
			if(armies.length >= 3){
				mapError("Missing Army in BUL");
			}
			 
 if(armies.includes("DE") && armies.includes("AH")){
				if(z.extraObjectives.includes("BUL")){
					return imageO(3809692);
				} 
				return imageO(3809691);				
			}
			 
 if(armies.includes("OT") && armies.includes("AH")){
				if(z.extraObjectives.includes("BUL")){
					return imageO(3809694);
				} 
				return imageO(3809693);				
			}
			 
 if(armies.includes("RU") && armies.includes("UK")){
				if(z.extraObjectives.includes("BUL")){
					return imageO(3809705);
				} 
				return imageO(3809704);				
			}
			 
 if(armies.includes("RU") && armies.includes("IT")){
				if(z.extraObjectives.includes("BUL")){
					return imageO(3809708);
				} 
				return imageO(3809707);				
			}
			if(armies.length === 2){
				mapError("Missing Army in BUL");
			}
			 
 if(armies.includes("DE")){
				if(z.extraObjectives.includes("BUL")){
					return imageO(3809698);
				} 
				return imageO(3809697);				
			}
			 
 if(armies.includes("AH")){
				if(z.extraObjectives.includes("BUL")){
					return imageO(3809690);
				} 
				return imageO(3809689);				
			}
			 
 if(armies.includes("UK")){
				if(z.extraObjectives.includes("BUL")){
					return imageO(3809696);
				} 
				return imageO(3809695);				
			}
			 
 if(armies.includes("IT")){
				if(z.extraObjectives.includes("BUL")){
					return imageO(3809701);
				} 
				return imageO(3809700);				
			}
			 
 if(armies.includes("RU")){
				if(z.extraObjectives.includes("BUL")){
					return imageO(3809703);
				} 
				return imageO(3809702);				
			}
			 
 if(armies.includes("OT")){
				if(z.extraObjectives.includes("BUL")){
					return imageO(3809710);
				} 
				return imageO(3809709);				
			}
			if(armies.length === 1){
				mapError("Missing Army in BUL");
			}
			if(z.extraObjectives.includes("BUL")){
				return imageO(3810356);
			}
			return imageO(3809454);
		case "BUR":
			if(armies.length >= 4){
				mapError("Missing Army in BUR");
			}
			 
 if(armies.includes("UK") && armies.includes("FR") && armies.includes("US")){
				if(z.extraObjectives.includes("BUR")){
					return imageO(3809727);
				} 
				return imageO(3809726);				
			}
			if(armies.length === 3){
				mapError("Missing Army in BUR");
			}
			 
 if(armies.includes("UK") && armies.includes("FR")){
				if(z.extraObjectives.includes("BUR")){
					return imageO(3809723);
				} 
				return imageO(3809721);				
			}
			 
 if(armies.includes("UK") && armies.includes("US")){
				if(z.extraObjectives.includes("BUR")){
					return imageO(3809716);
				} 
				return imageO(3809715);				
			}
			 
 if(armies.includes("FR") && armies.includes("US")){
				if(z.extraObjectives.includes("BUR")){
					return imageO(3809731);
				} 
				return imageO(3809730);				
			}
			if(armies.length === 2){
				mapError("Missing Army in BUR");
			}
			 
 if(armies.includes("UK")){
				if(z.extraObjectives.includes("BUR")){
					return imageO(3809714);
				} 
				return imageO(3809713);				
			}
			 
 if(armies.includes("FR")){
				if(z.extraObjectives.includes("BUR")){
					return imageO(3809720);
				} 
				return imageO(3809719);				
			}
			 
 if(armies.includes("US")){
				if(z.extraObjectives.includes("BUR")){
					return imageO(3809739);
				} 
				return imageO(3809738);				
			}
			 
 if(armies.includes("DE")){
				if(z.extraObjectives.includes("BUR")){
					return imageO(3809736);
				} 
				return imageO(3809734);				
			}
			if(armies.length === 1){
				mapError("Missing Army in BUR");
			}
			if(z.extraObjectives.includes("BUR")){
				return imageO(3809741);
			} 
			return imageO(3809740);	
		case "CAU":
			if(armies.length >= 3){
				mapError("Missing Army in CAU");
			}
			 
 if(armies.includes("UK") && armies.includes("RU")){
				return imageO(3809766);
			}
			if(armies.length === 2){
				mapError("Missing Army in CAU");
			}
			 
 if(armies.includes("AH")){
				return imageO(3809761);
			}
			 
 if(armies.includes("UK")){
				return imageO(3809762);
			}
			 
 if(armies.includes("RU")){
				return imageO(3809764);
			}
			 
 if(armies.includes("OT")){
				return imageO(3809768);
			}
			if(armies.includes("IT")){
				return imageO(5390410);
			}
			if(armies.length === 1){
				mapError("Missing Army in CAU");
			}
			return imageO(3809341);
		case "GAL":
			if(armies.length >=3 ){
				mapError("Missing Army in GAL");
			}
			 
 if(armies.includes("AH") && armies.includes("DE")){
				return imageO(3809805);
			}
			if(armies.length === 2 ){
				mapError("Missing Army in GAL");
			}
			 
 if(armies.includes("AH")){
				return imageO(3809804);
			}
			 
 if(armies.includes("DE")){
				return imageO(3809806);
			}
			 
 if(armies.includes("RU")){
				return imageO(3808882);
			}
			if(armies.length === 1 ){
				mapError("Missing Army in GAL");
			}
			return imageO(3810388);
		case "GRE":
			if(armies.length >=3 ){
				mapError("Missing Army in GRE");
			}
			 
 if(armies.includes("RU") && armies.includes("IT")){
				return imageO(3809822);
			}
			 
 if(armies.includes("RU") && armies.includes("UK")){
				return imageO(3809821);
			}
			if(armies.length === 2){
				mapError("Missing Army in GRE");
			}
			 
 if(armies.includes("RU")){
				return imageO(3809820);
			}
			 
 if(armies.includes("AH")){
				return imageO(3809807);
			}
			 
 if(armies.includes("DE")){
				return imageO(3809808);
			}
			 
 if(armies.includes("IT")){
				return imageO(3809818);
			}
			 
 if(armies.includes("OT")){
				return imageO(3809823);
			}
			 
 if(armies.includes("UK")){
				return imageO(3809526);
			}
			if(armies.length === 1){
				mapError("Missing Army in GRE");
			}
			return imageO(3809824);
		case "IRE":
			if(armies.length >= 2){
				mapError("Missing Army in IRE");
			}
			 
 if(armies.includes("AH")){
				return imageO(3809826);
			}
			 
 if(armies.includes("UK")){
				return imageO(3809828);
			}
			 
 if(armies.includes("DE")){
				return imageO(3809829);
			}
			if(armies.length === 1){
				mapError("Missing Army in IRE");
			}
			return imageO(3808845);
		case "IST":
			/* TODO: RU + IT/UK? */
			if(armies.length >= 2){
				if(armies.includes("AH") && armies.includes("OT")){
					return imageO(5060252);
				}
				
				mapError("Missing Army in IST");
			}
 if(armies.includes("UK")){
				return imageO(3809830);
			}
			 
 if(armies.includes("IT")){
				return imageO(3809831);
			}
			 
 if(armies.includes("RU")){
				return imageO(3809832);
			}
			 
 if(armies.includes("OT")){
				return imageO(3809833);
			}
			if(armies.length === 1){
				mapError("Missing Army in IST");
			}
			return imageO(3809475);
		case "MID":
			if(armies.length >= 3){
				mapError("Missing Army in MID");
			}
			 
 if(armies.includes("RU") && armies.includes("UK")){
				if(z.extraObjectives.includes("MID")){
					return imageO(3809846);
				} 
				return imageO(3809845);				
			}
			if(armies.length === 2){
				mapError("Missing Army in MID");
			}
			 
 if(armies.includes("UK")){
				if(z.extraObjectives.includes("MID")){
					return imageO(3809838);
				} 
				return imageO(3809836);				
			}
			 
 if(armies.includes("IT")){
				if(z.extraObjectives.includes("MID")){
					return imageO(3809841);
				} 
				return imageO(3809840);				
			}
			 
 if(armies.includes("RU")){
				if(z.extraObjectives.includes("MID")){
					return imageO(3809844);
				} 
				return imageO(3809842);				
			}
			 
 if(armies.includes("OT")){
				if(z.extraObjectives.includes("MID")){
					return imageO(3809848);
				} 
				return imageO(3809847);				
			}
			if(armies.length === 1){
				mapError("Missing Army in MID");
			}
			if(z.extraObjectives.includes("MID")){
				return imageO(3809849);
			}
			return imageO(3809562);	
		case "MOS":
			if(armies.length >=3 ){
				mapError("Missing Army in MOS");
			}
			 
 if(armies.includes("RU") && armies.includes("UK")){
				return imageO(3809854);
			}
			if(armies.length === 2){
				mapError("Missing Army in MOS");
			}
			 
 if(armies.includes("RU")){
				return imageO(3808851);
			}
			 
 if(armies.includes("AH")){
				return imageO(3809852);
			}
			 
 if(armies.includes("DE")){
				return imageO(3809855);
			}
			 
 if(armies.includes("UK")){
				return imageO(3809853);
			}
			if(armies.length === 1){
				mapError("Missing Army in MOS");
			}
			return imageO(3809859);
		case "PAR":
			if(armies.length >= 4){
				mapError("Missing Army in PAR");
			}
			 
 if(armies.includes("UK") && armies.includes("FR") && armies.includes("US")){
				return imageO(3809882);
			}
			if(armies.length === 3){
				mapError("Missing Army in PAR");
			}
			 
 if(armies.includes("UK") && armies.includes("FR")){
				return imageO(3809880);
			}
			 
 if(armies.includes("UK") && armies.includes("US")){
				return imageO(3809881);
			}
			 
 if(armies.includes("FR") && armies.includes("US")){
				return imageO(3809884);
			}
			if(armies.length === 2){
				mapError("Missing Army in PAR");
			}
			 
 if(armies.includes("UK")){
				return imageO(3809879);
			}
			 
 if(armies.includes("FR")){
				return imageO(3808864);
			}
			 
 if(armies.includes("US")){
				return imageO(3810447);
			}
			 
 if(armies.includes("DE")){
				return imageO(3809885);
			}
			if(armies.length === 1){
				mapError("Missing Army in PAR");
			}
			return imageO(3810451);
		case "PER":
			if(armies.length >= 3){
				mapError("Missing Army in PER");
			}
			 
 if(armies.includes("RU") && armies.includes("UK")){
				if(z.extraObjectives.includes("PER")){
					return imageO(3809889);
				} 			
			}
			if(armies.length === 2){
				mapError("Missing Army in MID");
			}
			
			 
 if(armies.includes("UK")){
				if(z.extraObjectives.includes("PER")){
					return imageO(3809886);
				} 		
			}
			
			if(armies.includes("RU")){
				if(z.extraObjectives.includes("PER")){
					return imageO(3809888);
				} 
				return imageO(3809887);				
			}
			
			if(armies.includes("OT")){
				if(z.extraObjectives.includes("PER")){
					return imageO(3809891);
				} 
				return imageO(3809890);				
			}
			if(armies.length === 1){
				mapError("Missing Army in MID");
			}
			if(z.extraObjectives.includes("PER")){
				return imageO(3809892);
			}
			return imageO(3809580);	
		case "PET":
			if(armies.length >= 3){
				mapError("Missing Army in PET");
			}
			
			if(armies.includes("AH") && armies.includes("DE")){
				return imageO(3809894);
			}
			
			if(armies.includes("UK") && armies.includes("RU")){
				return imageO(3820232);
			}
			if(armies.length === 2){
				mapError("Missing Army in PET");
			}
			
			if(armies.includes("UK")){
				return imageO(3820231);
			}
			
			if(armies.includes("AH")){
				return imageO(3809893);
			}
			
			if(armies.includes("DE")){
				return imageO(3809895);
			}
			
			if(armies.includes("RU")){
				return imageO(3809896);
			}
			if(armies.length === 1){
				mapError("Missing Army in PET");
			}
			return imageO(3808850);
		case "PIC":
			if(armies.length >= 4){
				mapError("Missing Army in PIC");
			}
			
			if(armies.includes("UK") && armies.includes("FR") && armies.includes("US")){
				return imageO(3809899);
			}
			if(armies.length === 3){
				mapError("Missing Army in PIC");
			}
			
			if(armies.includes("UK") && armies.includes("FR")){
				return imageO(3809898);
			}
			
			if(armies.includes("UK") && armies.includes("US")){
				return imageO(3810625);
			}
			
			if(armies.includes("FR") && armies.includes("US")){
				return imageO(3809900);
			}
			if(armies.length === 2){
				mapError("Missing Army in PIC");
			}
			
			if(armies.includes("UK")){
				return imageO(3809897);
			}
			
			if(armies.includes("FR")){
				return imageO(3808872);
			}
			
			if(armies.includes("US")){
				return imageO(3809903);
			}
			
if(armies.includes("DE")){
				return imageO(3809901);
			}
			if(armies.length === 1){
				mapError("Missing Army in PIC");
			}
			return imageO(3809904);
		case "POL":
			if(armies.length >= 3){
				mapError("Missing Army in POL");
			}
			 
 if(armies.includes("AH") && armies.includes("DE")){
				return imageO(3809906);
			}
			if(armies.length === 2){
				mapError("Missing Army in POL");
			}
			 
 if(armies.includes("AH")){
				return imageO(3809905);
			}
			 
 if(armies.includes("DE")){
				return imageO(3809907);
			}
			 
 if(armies.includes("RU")){
				return imageO(3808859);
			}
			if(armies.length === 1){
				mapError("Missing Army in POL");
			}
			return imageO(3809908);
		case "PRO":
			if(armies.length > 1){
				mapError("Missing Army in PRO");
			}
			 
 if(armies.includes("AH")){
				return imageO(3809909);
			}
			 
 if(armies.includes("DE")){
				return imageO(3809913);
			}
			 
 if(armies.includes("UK")){
				return imageO(3809910);
			}
			 
 if(armies.includes("FR")){
				return imageO(3809911);
			}
			if(armies.includes("IT")){
				return imageO(4190017);
			}
			if(armies.includes("US")){
				return imageO(7314360);
			}
			if(armies.length === 1){
				mapError("Missing Army in PRO");
			}
			return imageO(3808888);
		case "PRU":
			if(armies.length >= 3){
				mapError("Missing Army in PRU");
			}
			 
 if(armies.includes("AH") && armies.includes("DE")){
				return imageO(3809915);
			}
			if(armies.length === 2){
				mapError("Missing Army in PRU");
			}
			 
 if(armies.includes("AH")){
				return imageO(3809914);
			}
			 
 if(armies.includes("DE")){
				return imageO(3808858);
			}
			 
 if(armies.includes("RU")){
				return imageO(3809916);
			}
			if(armies.length === 1){
				mapError("Missing Army in PRU");
			}
			return imageO(3809917);
		case "ROM":
			if(armies.length >= 3){
				mapError("Missing Army in ROM");
			}
			 
 if(armies.includes("IT") && armies.includes("UK")){
				return imageO(3809922);
			}
			if(armies.length === 2){
				mapError("Missing Army in ROM");
			}
			 
 if(armies.includes("IT")){
				return imageO(3809921);
			}
			 
 if(armies.includes("UK")){
				return imageO(3809919);
			}
			 
 if(armies.includes("AH")){
				return imageO(3809918);
			}
			 
 if(armies.includes("DE")){
				return imageO(3809920);
			}
			 
 if(armies.includes("FR")){
				return imageO(3809923);
			}
			 
 if(armies.includes("RU")){
				return imageO(3809925);
			}
			if(armies.length === 1){
				mapError("Missing Army in ROM");
			}
			return imageO(3809385);
		case "RUM":
			if(armies.length >= 4){
				mapError("Missing Army in RUM");
			}
			 
 if(armies.includes("AH") && armies.includes("DE") && armies.includes("OT")){
				if(z.extraObjectives.includes("RUM")){
					return imageO(3809943);
				}
				return imageO(3809942);
			}
			 
			if(armies.includes("FR") && armies.includes("RU") && armies.includes("UK")){
				if(z.extraObjectives.includes("RUM")){
					return imageO(5255475);
				}
				return imageO(5255474);
			}
			 if(armies.includes("FR") && armies.includes("RU") && armies.includes("IT")){
				if(z.extraObjectives.includes("RUM")){
					return imageO(3809961);
				}
			}
			if(armies.length === 3){
				mapError("Missing Army in RUM");
			}
			 
 if(armies.includes("AH") && armies.includes("DE")){
				if(z.extraObjectives.includes("RUM")){
					return imageO(3809939);
				}
				return imageO(3809938);
			}
			 
 if(armies.includes("AH") && armies.includes("OT")){
				if(z.extraObjectives.includes("RUM")){
					return imageO(3809941);
				}
				return imageO(3809940);
			}
			 
 if(armies.includes("DE") && armies.includes("OT")){
				if(z.extraObjectives.includes("RUM")){
					return imageO(3809968);
				}
				return imageO(3809967);
			}
			 
 if(armies.includes("FR") && armies.includes("RU")){
				if(z.extraObjectives.includes("RUM")){
					return imageO(3809959);
				}
			}
			 
 if(armies.includes("FR") &&  armies.includes("IT")){
				if(z.extraObjectives.includes("RUM")){
					return imageO(3809945);
				}
			}
			 
 if(armies.includes("RU") && armies.includes("IT")){
				if(z.extraObjectives.includes("RUM")){
					return imageO(3809963);
				}
				return imageO(3809962);
			}
			if(armies.includes("FR") && armies.includes("UK")){
				if(z.extraObjectives.includes("RUM")){
					return imageO(5255467);
				}
				return imageO(5255469);
			}
			if(armies.includes("RU") && armies.includes("UK")){
				if(z.extraObjectives.includes("RUM")){
					return imageO(5255473);
				}
				return imageO(5255472);
			}
			if(armies.length === 2){
				mapError("Missing Army in RUM");
			}
			 
 if(armies.includes("FR")){
				if(z.extraObjectives.includes("RUM")){
					return imageO(3809944);
				}
			}
			 
 if(armies.includes("RU")){
				if(z.extraObjectives.includes("RUM")){
					return imageO(3809957);
				}
				return imageO(3809956);
			}
			 
 if(armies.includes("IT")){
				if(z.extraObjectives.includes("RUM")){
					return imageO(3809952);
				}
				return imageO(3809949);
			}
			 
 if(armies.includes("AH")){
				if(z.extraObjectives.includes("RUM")){
					return imageO(3809936);
				}
				return imageO(3809934);
			}
			 
 if(armies.includes("DE")){
				if(z.extraObjectives.includes("RUM")){
					return imageO(3809947);
				}
				return imageO(3809946);
			}
			 
 if(armies.includes("OT")){
				if(z.extraObjectives.includes("RUM")){
					return imageO(3809965);
				}
				return imageO(3809964);
			}
			if(armies.includes("UK")){
				if(z.extraObjectives.includes("RUM")){
					return imageO(5255470);
				}
				return imageO(5255471);
			}
			if(armies.length === 1){
				mapError("Missing Army in RUM");
			}
			if(z.extraObjectives.includes("RUM")){
				return imageO(3809969);
			}
			return imageO(3809339);
		case "SER":
			if(armies.includes("IT") && armies.includes("UK") && armies.includes("RU")){
				if(z.extraObjectives.includes("GRE")){
					return imageO(5668693);
				}
				return imageO(5668694);
			}
			if(armies.length > 2){
				mapError("Missing Army in SER");
			}
			 
 if(armies.includes("AH") && armies.includes("DE")){
				if(z.extraObjectives.includes("GRE")){
					return imageO(3810975);
				}
				return imageO(3810974);
			}
			 
 if(armies.includes("OT") && armies.includes("DE")){
				if(z.extraObjectives.includes("GRE")){
					return imageO(3810994);
				}
				return imageO(3810993);
			}
			 
 if(armies.includes("IT") && armies.includes("RU")){
				if(z.extraObjectives.includes("GRE")){
					return imageO(3810989);
				}
				return imageO(3810988);
			}
			 
 if(armies.includes("UK") && armies.includes("RU")){
				if(z.extraObjectives.includes("GRE")){
					return imageO(3810986);
				}
			}
			if(armies.includes("UK") && armies.includes("IT")){
				if(z.extraObjectives.includes("GRE")){
					return imageO(5737934);
				}
				return imageO(5737933);
			}
			if(armies.length === 2){
				mapError("Missing Army in SER");
			}
			 
 if(armies.includes("AH")){
				if(z.extraObjectives.includes("GRE")){
					return imageO(3810973);
				}
				return imageO(3810972);
			}
			 
 if(armies.includes("DE")){
				if(z.extraObjectives.includes("GRE")){
					return imageO(3810979);
				}
				return imageO(3810978);
			}
			 
 if(armies.includes("UK")){
				if(z.extraObjectives.includes("GRE")){
					return imageO(3810977);
				}
			}
			 
 if(armies.includes("IT")){
				if(z.extraObjectives.includes("GRE")){
					return imageO(3810981);
				}
				return imageO(3810980);
			}
			 
 if(armies.includes("RU")){
				if(z.extraObjectives.includes("GRE")){
					return imageO(3810985);
				}
				return imageO(3810983);
			}
			 
 if(armies.includes("OT")){
				if(z.extraObjectives.includes("GRE")){
					return imageO(3810992);
				}
				return imageO(3810991);
			}
			if(armies.length === 1){
				mapError("Missing Army in SER");
			}
			if(z.extraObjectives.includes("GRE")){
				return imageO(3810996);
			}
			return imageO(3810995);
		case "TYR":
			if(armies.length > 2){
				mapError("Missing Army in TYR");
			}
			 
 if(armies.includes("AH") && armies.includes("DE")){
				return imageO(3809993);
			}
			if(armies.includes("UK") && armies.includes("IT")){
				return imageO(5327492);
			}
			if(armies.includes("UK") && armies.includes("US")){
				return imageO(7314355);
			}
			if(armies.includes("IT") && armies.includes("US")){
				return imageO(7314356);
			}
			if(armies.includes("FR") && armies.includes("US")){
				return imageO(7314357);
			}
			if(armies.length === 2){
				mapError("Missing Army in TYR");
			}
			if(armies.includes("US")){
				return imageO(7314359);
			}
			 
 if(armies.includes("AH")){
				return imageO(3809323);
			}
			 
 if(armies.includes("DE")){
				return imageO(3809998);
			}
			 
 if(armies.includes("UK")){
				return imageO(3809994);
			}
			 
 if(armies.includes("FR")){
				return imageO(3809996);
			}
			 
 if(armies.includes("IT")){
				return imageO(3809999);
			}
			if(armies.length === 1){
				mapError("Missing Army in TYR");
			}
			return imageO(3810000);
		case "UKR":
			if(armies.length > 2){
				mapError("Missing Army in UKR");
			}
			 
 if(armies.includes("AH") && armies.includes("DE")){
				return imageO(3810002);
			}
			 
 if(armies.includes("UK") && armies.includes("RU")){
				return imageO(3820234);
			}
			if(armies.length === 2){
				mapError("Missing Army in UKR");
			}
			 
 if(armies.includes("UK")){
				return imageO(3820233);
			}
			 
 if(armies.includes("AH")){
				return imageO(3810001);
			}
			 
 if(armies.includes("DE")){
				return imageO(3810003);
			}
			 
 if(armies.includes("OT")){
				return imageO(3810004);
			}
			 
 if(armies.includes("RU")){
				return imageO(3808883);
			}
			if(armies.length === 1){
				mapError("Missing Army in UKR");
			}
			return imageO(3810006);
		case "USA":
			if(armies.length > 1){
				mapError("Missing Army in USA");
			}
			 
 if(armies.includes("DE")){
				return imageO(7123497);
			}
			 
 if(armies.includes("US")){
				return imageO(7123498);
			}
			if(armies.length === 1){
				mapError("Missing Army in USA");
			}
			return imageO(7123500);
		case "VIE":
			if(armies.length > 2){
				mapError("Missing Army in VIE");
			}
			 
 if(armies.includes("AH") && armies.includes("DE")){
				return imageO(3810010);
			}
			if(armies.length === 2){
				mapError("Missing Army in VIE");
			}
			 
 if(armies.includes("AH")){
				return imageO(3808880);
			}
			 
 if(armies.includes("DE")){
				return imageO(3810012);
			}
			 
 if(armies.includes("UK")){
				return imageO(3810011);
			}
			 
 if(armies.includes("RU")){
				return imageO(3810013);
			}
			if(armies.length === 1){
				mapError("Missing Army in VIE");
			}
			return imageO(3810014);
		case "WGE":
			if(armies.length > 2){
				mapError("Missing Army in WGE");
			}
			 
 if(armies.includes("AH") && armies.includes("DE")){
				return imageO(3810040);
			}
			 
 if(armies.includes("UK") && armies.includes("FR")){
				return imageO(3810043);
			}
			if(armies.includes("UK") && armies.includes("RU")){
				return imageO(7030435);
			}
			if(armies.includes("US") && armies.includes("FR")){
				return imageO(7030433);
			}
			if(armies.length === 2){
				mapError("Missing Army in WGE");
			}
			 
 if(armies.includes("AH")){
				return imageO(3810039);
			}
			 
 if(armies.includes("DE")){
				return imageO(3808878);
			}
			 
 if(armies.includes("UK")){
				return imageO(3810041);
			}
			 
 if(armies.includes("RU")){
				return imageO(3810045);
			}
			 
 if(armies.includes("FR")){
				return imageO(3810044);
			}
			 
 if(armies.includes("US")){
				return imageO(3810046);
			}
			if(armies.length === 1){
				mapError("Missing Army in WGE");
			}
			return imageO(3810047);
		}
	}
}

function roundImage(){
	switch(z.round){
		case 1:
			return imageO(3842676);
		case 2:
			return imageO(3842677);
		case 3:
			return imageO(3842678);
		case 4:
			return imageO(3842679);
		case 5:
			return imageO(3842680);
		case 6:
			return imageO(3842682);
		case 7:
			return imageO(3842683);
		case 8:
			return imageO(3842684);
		case 9:
			return imageO(3842685);
		case 10:
			return imageO(3842694);
		case 11:
			return imageO(3842687);
		case 12:
			return imageO(3842688);
		case 13:
			return imageO(3842689);
		case 14:
			return imageO(3842690);
		case 15:
			return imageO(3842691);
		case 16:
			return imageO(3842692);
		case 17:
			return imageO(3842693);
		default:
			/* invisible spacer */
			return imageO(3808855);
	}
}

function ententeImage(){
	return imageO(3842717);
}

function centralImage(){
	return imageO(3842716);
}

function boardImage(){
	let str = "[h"+"r]";
	if(z.turn >= 0){
		/*let banners = [3679452,3679453,3679454,3679455,3679456];
		str += imageM(banners[z.turn]); */
	} else {
		str = bold(size("Opening Setup Phase",14))+"\r\n";
	}	
	str += roundImage()+"\r\n";
	str += provinceImage("USA")+provinceImage("CAN")+provinceImage("WAO")+provinceImage("IRE")+provinceImage("BRI")+provinceImage("ENG")+provinceImage("NTH")+provinceImage("BAL")+provinceImage("PET")+provinceImage("MOS")+"\r\n";
	str += provinceImage("BEL")+provinceImage("BER")+provinceImage("PRU")+provinceImage("POL")+"\r\n";
	str += provinceImage("NAO")+provinceImage("PAR")+provinceImage("PIC")+provinceImage("BUR")+provinceImage("WGE")+provinceImage("VIE")+provinceImage("GAL")+provinceImage("UKR")+"\r\n";
	str += provinceImage("PRO")+provinceImage("ALP")+provinceImage("TYR")+provinceImage("BUD")+provinceImage("RUM")+provinceImage("BLA")+provinceImage("CAU")+"\r\n";
	str += provinceImage("WES")+provinceImage("ROM")+provinceImage("ADR")+provinceImage("SER")+provinceImage("BUL")+provinceImage("IST")+provinceImage("ANA")+provinceImage("AZE")+provinceImage("CAS")+"\r\n";
	str += provinceImage("EAS")+provinceImage("GRE")+provinceImage("MID")+provinceImage("PER")+"\r\n";
	let scores = getScore();
	if(z.CP >= z.entente){
		str += center(bold(size(centralImage()+" "+z.CP+" ",28)+"["+(z.CP+scores[0])+"]"+size("  -  "+ententeImage()+" "+z.entente+" ",28)+"["+(z.entente+scores[1])+"]"));
	} else {
		str += center(bold(size(ententeImage()+" "+z.entente+" ",28)+"["+(z.entente+scores[1])+"]"+size("  -  "+centralImage()+" "+z.CP+" ",28)+"["+(z.CP+scores[0])+"]"));
	} 
	return floatleft(str)+clear();
}

function floatleft(text) {
	return "[float"+"left]"+text+"[/float"+"left]";
}
function floatright(text) {
	return "[float"+"right]"+text+"[/float"+"right]";
}
function center(text){
	return "[cent"+"er]"+text+"[/cent"+"er]";
}	
function clear(){
	return "[cle"+"ar]";
}

function clearSpoilers(){
	let ore = new RegExp('\\[o\\][\\s\\S]*\\[/o\\]', "g");          
	t.value =  t.value.replace(ore, "").replace(ore, "");
}

function clearQuotes(){
	let qre0 = new RegExp('\\[q="(?!BYC).+"\\]((?!(\\[q=|\\[/q\\]))[\\s\\S])*\\[/q\\]', "g");        
	let qre1 = new RegExp('\\[q="(?!BYC).+"\\](((?!(\\[q=|\\[/q\\]))[\\s\\S])*\\[q="((?!(\\[q=|\\[/q\\]))[\\s\\S])*\\[/q\\]((?!(\\[q=|\\[/q\\]))[\\s\\S])*)*\\[/q\\]', "g");                  
	t.value =  t.value.replace(qre0, "").replace(qre1,"").replace(qre0, "").replace(qre1,"");
}

function publicReport(num){
	/* TODO: Army/Navy availability as images*/
	let pow = "";
	let str = "";
	switch(num){
		case 0:
			pow = "AT";
			str += imageO(3844136);
			break;
		case 1:
			pow = "RU";
			str += imageO(3844137);
			break;
		case 2:
			pow = "DE";
			str += imageO(3844138);
			break;
		case 3:
			pow = "FR";
			str += imageO(3844139);
			break;
		case 4:
			pow = "UK";
			str += imageO(3844141);
			break;
	}
	
	if(z.gameOver){
		str += "\r\n"+center(z.usernames[num]);
		return floatleft(str);
	}
	if(num === z.turn){
		str += "\r\n"+center(bold(z.usernames[num]));
		str += imageO(3844177);
	} else {
		str += "\r\n"+center(z.usernames[num]);
		str += imageO(3844179);
	}
	str+= "\r\n"+floatleft(bold("Deck:")+"\r\n"+bold("Hand:")+"\r\n"+bold("Discards:")+"\r\n"+bold("Prepared:"))
	+floatleft(z.drawDecks[num].length+"\r\n"+z.hands[num].length+"\r\n"+(z.upDiscards[num].length+z.downDiscards[num].length)+"\r\n"+z.prepared[num].length)+clear();
	
	if(z.upDiscards[num].length > 0){
		let faceUp = title(z.upDiscards[num][0],pow);
		if(faceUp === ""){
			faceUp = cardName(z.upDiscards[num][0],pow);
		}
		if(faceUp.length > 17){
			str += size("["+faceUp.slice(0,14)+"...]",6)+"\r\n";
		} else {
			str += size("["+faceUp+"]",6)+"\r\n";
		}
	}
	str += bold("Statuses:");
	if(z.statuses[num].length === 0){
		str += "\r\n(None)";
	}
	for(let j = 0; !(j>=z.statuses[num].length); j++){
		let sta = title(z.statuses[num][j],pow);
		if(sta.length > 14){
			str += "\r\n"+sta.slice(0,11)+"...";
		} else {
			str += "\r\n"+sta;
		}
	}
	let maxStatuses = 1;
	for(let j = 0; !(j>=5); j++){
		if(z.statuses[j].length > maxStatuses){
			maxStatuses = z.statuses[j].length;
		}
	}
	let blankLines = maxStatuses - z.statuses[num].length + 1;
	if(z.statuses[num].length === 0){
		blankLines--;
	}
	for(let j = 0; !(j>=blankLines); j++){
		str += "\r\n";
	}
	str += bold("Reserves:");
	let any = false;
	for(let k = 0; !(k>=2); k++){
		let country1 = "";
		let adjective = "";
		switch(num){
			case 0:
				if(k === 0){
					country1 = "AH";
					adjective = "AH ";
				} else {
					country1 = "Turkey";
					adjective = "OT ";
				}
				break;
			case 1:
				country1 = "Russia";
				break;
			case 2:
				country1 = "Germany";
				break;
			case 3:
				if(k === 0){
					country1 = "France";
					adjective = "FR ";
				} else {
					country1 = "Italy";
					adjective = "IT ";
				}
				break;
			case 4:
				if(k === 0){
					country1 = "UK";
					adjective = "UK ";
				} else {
					country1 = "US";
					adjective = "US ";
				}
				break;
		}
		let armies = 0;
		let navies = 0;
		for(let j = 0; !(j>=z.countries[country1].armies.length); j++){
			if(z.countries[country1].armies[j] === ""){
				armies++;
				any = true;
			}
		}
		if(armies > 0){
			str += "\r\n"+armies+" "+adjective+"Arm";
			if(armies === 1){
				str += "y";
			} else {
				str += "ies";
			}
		}
		if(country1 === "Turkey"){
			break;
		}
		for(let j = 0; !(j>=z.countries[country1].navies.length); j++){
			if(z.countries[country1].navies[j] === ""){
				navies++;
				any = true;
			}
		}
		if(navies > 0){
			str += "\r\n"+navies+" "+adjective+"Nav";
			if(navies === 1){
				str += "y";
			} else {
				str += "ies";
			}
		}
		if(num === 1 || num === 2){
			break;
		}
	}
	if(!any){
		str += "\r\n(None)";
	}
	
	
	return floatleft(str);
	
}

var re = new RegExp("\\[size=(0|1)\\]\\[color=#(FFFFFF|F4F4FF)\\](New|QMG) seed: \\S+\\[/color\\]\\[/size\\]","g");

function postSeed() {
	let banners = [3679452,3679453,3679454,3679455,3679456];
	let bannerRegExp = new RegExp("\\[ima" + "geid=" + banners[me] + " medium\\]","g");
	
	let splitted = window.btoa(JSON.stringify(z)).match(/.{1,20}/g);
	let str = "";
	while (splitted.length > 0) {
		str += splitted.shift() + "-";
	}
	t.value ="[ima" +"geid=" + banners[me] + " medium]\r\n" + size(invisible("QMG seed: " + str), 1) + "\r\n" + t.value.replace(bannerRegExp, "").replace(re,"");
	clearQuotes();
	
	try{
		let evt = new Event('input', {
			bubbles: true,
			cancelable: true,
		});

		t.dispatchEvent(evt);
	} catch(err){}
	
	clearBackground();
}  

function powerNum(power){
	switch(power){
		case "AT":
			return 0;
		case "RU":
			return 1;
		case "DE":
			return 2;
		case "FR":
			return 3;
		case "UK":
			return 4;
	}
	return -1;
}

function gameSetup(){
	z.usernames = [];
	
	promptString("Enter the BGG username of the Austria-Hungary & Ottoman Turkey player.",clearBackground,(prompted)=>{
		z.usernames.push(prompted);
		promptString("Enter the BGG username of the Russia player.",clearBackground,(prompted)=>{
			z.usernames.push(prompted);
			promptString("Enter the BGG username of the Germany player.",clearBackground,(prompted)=>{
				z.usernames.push(prompted);
				promptString("Enter the BGG username of the France & Italy player.",clearBackground,(prompted)=>{
					z.usernames.push(prompted);
					promptString("Enter the BGG username of the United Kingdom & United States player.",clearBackground,(prompted)=>{
						z.usernames.push(prompted);
						gameSetup2();
					});
				});
			});
		});
	});
	
}

function gameSetup2(){
	z.drawDecks = [ [],[],[],[],[]];
	z.hands = [ [],[],[],[],[]];
	z.prepared = [ [],[],[],[],[]];
	z.statuses = [ [],[],[],[],[]];
	z.upDiscards = [ [],[],[],[],[]];
	z.downDiscards = [ [],[],[],[],[]];
	z.bottomed = ["","","","",""];
	z.version = QMGversion;
	z.QMGversion = QMGversion;
	z.promptStyle = [1,1,1,1,1];
	z.attrition = [0,0,0,0,0];
	for(let j = 1; !(j>38); j++){
		z.drawDecks[0].push(j);
	}
	for(let j = 1; !(j>34); j++){
		z.drawDecks[1].push(j);
	}
	for(let j = 1; !(j>53); j++){
		z.drawDecks[2].push(j);
	}
	for(let j = 1; !(j>42); j++){
		z.drawDecks[3].push(j);
	}
	for(let j = 1; !(j>49); j++){
		z.drawDecks[4].push(j);
	}
	initializeSeeds();
	shuffle(z.drawDecks[0]);
	shuffle(z.drawDecks[1]);
	shuffle(z.drawDecks[2]);
	shuffle(z.drawDecks[3]);
	shuffle(z.drawDecks[4]);
	z.options = [ [],[],[],[],[]];
	for(let j = 0; !(j>=5); j++){
		for(let k = 0; !(k>=10); k++){
			z.hands[j].push(z.drawDecks[j].shift());
		}
	}
	z.countries = {
AH:{
armies:["VIE","BUD","","","","",""],
navies:[""],
supply:["VIE","BUD"],
power:"AT",
id:"AH",
capital:"VIE",
entente:false
		},
Turkey:{
armies:["","","",""],
navies:[],
supply:[],
power:"AT",
id:"OT",
capital:"IST",
entente:false
		},
Russia:{
armies:["MOS","SER","","","","","",""],
navies:["",""],
supply:["MOS"],
power:"RU",
id:"RU",
capital:"MOS",
entente:true
		},
Germany:{
armies:["BER","WGE","","","","",""],
navies:["",""],
supply:["BER","WGE"],
power:"DE",
id:"DE",
capital:"BER",
entente:false
		},
France:{
armies:["PAR","BUR","","","",""],
navies:["",""],
supply:["PAR","BUR"],
power:"FR",
id:"FR",
capital:"PAR",
entente:true
		},
Italy:{
armies:["","","",""],
navies:[""],
supply:[],
power:"FR",
id:"IT",
capital:"ROM",
entente:true
		},
UK:{
armies:["BRI","","","",""],
navies:["NAO","","","",""],
supply:["BRI","NAO"],
power:"UK",
id:"UK",
capital:"BRI",
entente:true
		},
US:{
armies:["","","",""],
navies:["","",""],
supply:[],
power:"UK",
id:"US",
capital:"USA",
entente:true
		}
	};
	z.setup = [true,true,true,true,true];
	z.canMulligan = [true,true,true,true,true];	
	z.round = 1;
	z.turn = -1;
	z.step = 0;
	z.CP = 0;
	z.entente = 0;
	z.gameOver = false;
	z.christmasTruce = false;
	z.attacker = null;
	z.target = null;
	z.source = null;
	z.revealedDouble = false;
	z.defenders = [];
	z.defending = [];
	z.morava = false;
	z.transylvania = false;
	z.attackerConcedes = false;
	z.germanyConcedes = false;
	z.americaConcedes = false;
	z.mustardGas = false;
	z.redBaron = false;
	z.stosstruppen = false;
	z.stossProvince = null;
	z.bigBertha = false;
	z.nivelle = false;
	z.renault = false;
	z.alpini = false;
	z.battlecruisers = false;
	z.mkIV = false;
	z.dreadnoughts = false;
	z.schlieffen = null;
	z.aPlaceInTheSun = null;
	z.gorliceTarnow = null;
	z.bersaglieri = false;
	z.warRevenueAct = [];
	z.extraObjectives = [];
	let splitted = window.btoa(JSON.stringify(z)).match(/.{1,20}/g);
	let str = "";
	while (splitted.length > 0) {
		str += splitted.shift() + "-";
	}
	t.value += "[ima"+"geid=3679460 medium]"+"\r\n";
	t.value += bold(size("Players:",14))+"\r\n";
	for(let j = 0; !(j>=5); j++){
		t.value += bold(powerByNum(j))+": [us"+"er="+z.usernames[j]+"]"+z.usernames[j]+"[/us"+"er]\r\n";
	}
	t.value += "\r\nEach player has been dealt 10 cards, and must now place 3 on the bottom of their deck.\r\n";
	t.value = size(invisible("QMG seed: " + str), 1) + "\r\n" + t.value.replace(re,"");
	try{
		let evt = new Event('input', {
			bubbles: true,
			cancelable: true,
		});

		t.dispatchEvent(evt);
	} catch(err) {}
	clearBackground();
}

function canReinforce(){
	let needed = 1;
	if(z.revealedDouble){
		needed++;
	}
	let c = 0;
	let other = false;
	for(let j = 0; !(j>=z.defenders.length); j++){
		if(powerNum(z.countries[z.defenders[j]].power) !== me){
			/* TODO: card-count supply here? */
			if(z.defending[j] && z.prepared[powerNum(z.countries[z.defenders[j]].power)].length > 0){
				other = true;
			}
			continue;
		}
		if(z.prepared[me].length === 0){
			continue;
		}
		let germanyCanHelp = germanAidInTheEast() && provinces[z.target].terrain !== "Sea" && z.defenders[j] === "Germany" && !z.countries.Germany.supply.includes(z.target) && ((z.defenders.includes("AH") && z.countries.AH.supply.includes(z.target)) || (z.defenders.includes("Turkey") && z.countries.Turkey.supply.includes(z.target)));
		let americaCanHelp = blackjack() && provinces[z.target].terrain !== "Sea" && z.defenders[j] === "US" && !z.countries.US.supply.includes(z.target) && ((z.defenders.includes("UK") && z.countries.UK.supply.includes(z.target)) || (z.defenders.includes("France") && z.countries.France.supply.includes(z.target)) || (z.defenders.includes("Italy") && z.countries.Italy.supply.includes(z.target)));
		let wrongRailGauge = russianRailGauge() && z.defenders[j] === "Russia" && !russianRailGauge(z.target);
		if((americaCanHelp || germanyCanHelp || z.countries[z.defenders[j]].supply.includes(z.target)) && !wrongRailGauge){
			for(let k = 0; !(k>=z.prepared[me].length); k++){
				let card = z.prepared[me][k];
				if(((prepareSymbol(card) === "RA" && provinces[z.target].terrain !== "Sea")
				|| (prepareSymbol(card) === "RN" && provinces[z.target].terrain === "Sea"))
				&& (me === 1 || me === 2 || country(card) === z.defenders[j])){
					let fine = false;
					if(prepareText(card) === ""){
						fine = true;
					} else {
						fine = prepareText(card).includes(z.target);
					}
					if(fine){
						c++;
						if(c === needed){
							return true;
						}
					}
				}
				if(((prepareSymbol(card) === "RAx2" && provinces[z.target].terrain !== "Sea")
				|| (prepareSymbol(card) === "RNx2" && provinces[z.target].terrain === "Sea"))
				&& (me === 1 || me === 2 || country(card) === z.defenders[j])){
					if(prepareText(card) === ""){
						return true;
					} else if(prepareText(card) === "Difficult"){
						/* Alpini */
						if(isDifficult()){
							return true;
						}
					} else {
						if(prepareText(card).includes(z.target)){
							return true;
						}
					}
				}
			}
		}
		switch(z.defenders[j]){
			case "AH":
				if(z.target === "BUL" && z.prepared[me].includes(30)){
					c++;
					if(c === needed){
						return true;
					}
				}
				if(z.target === "BUL" && z.prepared[me].includes(33)){
					c++;
					if(c === needed){
						return true;
					}
				}
				if(z.target === "GRE" && z.prepared[me].includes(29)){
					c++;
					if(c === needed){
						return true;
					}
				}
				if((z.target === "BUD" || z.target === "GAL") && z.prepared[me].includes(32)){
					return true;
				}
				if((z.target === "VIE" || z.target === "TYR") && z.prepared[me].includes(25)){
					return true;
				}
				break;
			case "Turkey":
				if(z.prepared[me].includes(37)){
					c++;
					if(c === needed){
						return true;
					}
				}
				break;
			case "Russia":
				if(z.target === "SER" && z.prepared[me].includes(22)){
					c++;
					if(c === needed){
						return true;
					}
				}
				if(z.target === "SER" &&  z.prepared[me].includes(34)){
					c++;
					if(c === needed){
						return true;
					}
				}
				break;
			case "Germany":
				if(provinces[z.target].terrain !== "Sea" && z.prepared[me].includes(50)){
					return true;
				}
				if(provinces[z.target].terrain !== "Sea" &&  z.prepared[me].includes(47)){
					c++;
					if(c === needed){
						return true;
					}
				}
				if((z.target === "WGE" || z.target === "BER" || z.target === "PRU") && z.prepared[me].includes(48)){
					return true;
				}
				break;
			case "France":
				if(z.target === "RUM" && z.prepared[me].includes(33)){
					c++;
					if(c === needed){
						return true;
					}
				}
				if(z.target === "RUM" &&  z.prepared[me].includes(37)){
					c++;
					if(c === needed){
						return true;
					}
				}
				break;
			case "UK":
				if(provinces[z.target].terrain === "Sea" && z.prepared[me].includes(45)){
					return true;
				}
				if(z.target === "BEL" && z.prepared[me].includes(43)){
					c++;
					if(c === needed){
						return true;
					}
				}
				if(z.target === "GRE" && z.prepared[me].includes(40)){
					c++;
					if(c === needed){
						return true;
					}
				}
				if(provinces[z.target].terrain !== "Sea" && z.prepared[me].includes(29)){
					c++;
					if(c === needed){
						return true;
					}
				}
		}
	}
	return c === 1 && other;
}

/* TODO: (?) Does not reflect need to discard for difficult terrain */
function canSustain(){
	let needed = 1;
	if(z.revealedDouble){
		needed++;
	}
	if(russianRailGauge() && z.attacker === "Russia" && !russianRailGauge(z.target)){
		return false;
	}
	let c = 0;
	for(let k = 0; !(k>=z.prepared[me].length); k++){
		let card = z.prepared[me][k];
		if(((prepareSymbol(card) === "SLB" && provinces[z.target].terrain !== "Sea")
		|| (prepareSymbol(card) === "SSB" && provinces[z.target].terrain === "Sea"))
		&& (me === 1 || me === 2 || country(card) === z.attacker)){
			let fine = false;
			if(prepareText(card) === ""){
				fine = true;
			} else if (prepareText(card) === "Difficult"){
				/* Bersaglieri */
				if(isDifficult()){
					fine = true;
				}
			} else {
				fine = prepareText(card).includes(z.target);
			}
			if(fine){
				c++;
				if(c === needed){
					return true;
				}
			}
		}
		if(((prepareSymbol(card) === "SLBx2" && provinces[z.target].terrain !== "Sea")
		|| (prepareSymbol(card) === "SSBx2" && provinces[z.target].terrain === "Sea"))
		&& (me === 1 || me === 2 || country(card) === z.attacker)){
			if(prepareText(card) === ""){
				return true;
			} else if(prepareText(card) === "Clear"){
				/* RULES: Can you use the prepared symbols from Mk IV Tanks and Renault on a clear terrain space being attacked from the sea?*/
				if(provinces[z.target].terrain === "Clear" && !isDifficult()){
					return true;
				}
			} else {
				if(prepareText(card).includes(z.target)){
					return true;
				}
			}
		}
	}
	if((needed === 1 || c === 1) && z.attacker === "France" && nivelle() && !z.nivelle){
		for(let j = 0; !(j>=z.hands[3].length); j++){
			if(cardName(z.hands[3][j],"FR") === "Land Battle (France)"){
				return true;
			}
		}
	}
	if(c === 1 && (americaCouldSustain() || germanyCouldSustain())){
		return true;
	}
	if(c === 1 && provinces[z.target].terrain !== "Sea" && z.attacker === "France" && renault()){
		return "Renault";
	}
	return false;
}

function helperCanSustain(){
	if(me === 2 && !germanyCouldSustain()){
		return false;
	}
	if(me === 4 && !americaCouldSustain()){
		return false;
	}
	let needed = 1;
	if(z.revealedDouble){
		needed++;
	}
	let c = 0;
	for(let k = 0; !(k>=z.prepared[me].length); k++){
		let card = z.prepared[me][k];
		if(((prepareSymbol(card) === "SLB" && provinces[z.target].terrain !== "Sea")
		|| (prepareSymbol(card) === "SSB" && provinces[z.target].terrain === "Sea"))
		&& (me === 2 || country(card) === "US")){
			let fine = false;
			if(prepareText(card) === ""){
				fine = true;
			} else {
				fine = prepareText(card).includes(z.target);
			}
			if(fine){
				c++;
				if(c === needed){
					return true;
				}
			}
		}
		if(((prepareSymbol(card) === "SLBx2" && provinces[z.target].terrain !== "Sea")
		|| (prepareSymbol(card) === "SSBx2" && provinces[z.target].terrain === "Sea"))
		&& (me === 2 || country(card) === "US")){
			if(prepareText(card) === ""){
				return true;
			} else {
				if(prepareText(card).includes(z.target)){
					return true;
				}
			}
		}
	}
	if(c === 1 && couldSustain()){
		return true;
	}
	return false;
}

function isDifficult(){
	/* TODO: There's some kind of bug here with resolveVictory */
	/* RULES: Does the US benefit from Bersaglieri if they help the Italians out with Blackjack? */
	return ((provinces[z.source].terrain==="Sea" && provinces[z.target].terrain !== "Sea") ||(provinces[z.source].terrain !=="Sea" && provinces[z.target].terrain === "Sea") || provinces[z.target].terrain === "Difficult");
}

function bersaglieri(){
	return z.bersaglieri && (z.attacker === "Italy" || z.attacker === "France");
}

function germanyCouldSustain(){
	return (!z.germanyConcedes && germanAidInTheEast() && provinces[z.source].terrain !== "Sea" && z.attacker !== "Germany" && !z.countries[z.attacker].entente && z.prepared[2].length !== 0 && 
			(!isDifficult() || z.hands[1].length > 0));
}

function americaCouldSustain(){
	if(z.americaConcedes || !blackjack() || provinces[z.source].terrain === "Sea" || z.attacker === "US" || z.attacker === "Russia" || !z.countries[z.attacker].entente || z.prepared[4].length === 0 
	   || (isDifficult() && z.hands[powerNum(z.countries[z.attacker].power)].length === 0 && !bersaglieri())){
		return false;
	}

	for(let j = 0; !(j>=provinces[z.target].neighbors.length); j++){
		if(z.countries.US.armies.includes(provinces[z.target].neighbors[j]) || z.countries.US.navies.includes(provinces[z.target].neighbors[j])){
			return true;
		}
	}
	return false;
}

function couldSustain(){
	if(z.attackerConcedes){
		return false;
	}
	let k = powerNum(z.countries[z.attacker].power);
	let wrongRailGauge = russianRailGauge() && z.attacker === "Russia" && !russianRailGauge(z.target);
	if(isDifficult() && !bersaglieri() && z.hands[k].length === 0){
		return false;
	}
	if(provinces[z.target].terrain === "Sea" && z.attacker === "Turkey"){
		return false;
	}
	if(z.attacker === "France" && nivelle() && !z.nivelle && z.hands[k].length > 0 ){
		return true;
	}
	return z.prepared[k].length > 0 && !wrongRailGauge;
}

function limitedRailAndRoadNetwork(){
	if(arguments.length === 0){
		return z.statuses[0].includes(20);
	}
	switch(arguments[0]){
		case "ANA":
		case "AZE":
		case "PER":
		case "MID":
		case "IST":
			return true;
	}
	return false;
}

/* RULES: Can you use this to counterattack?  If so, I assume Germany pays the Difficult Terrain Penalty?*/
function germanAidInTheEast(){
	return z.statuses[2].includes(31);
}

function mustardGas(){
	return z.statuses[2].includes(32);
}

function redBaron(){
	return z.statuses[2].includes(39);
}

function stosstruppen(){
	return z.statuses[2].includes(33);
}

function tripledTrenchLines(){
	return z.statuses[2].includes(34);
}

function bigBertha(){
	return z.statuses[2].includes(36);
}

function rumplerTaube(){
	return z.statuses[2].includes(37);
}

function woeToThem(){
	return z.statuses[2].includes(38);
}

function laRevanche(){
	return z.statuses[3].includes(24);
}

function verdun(){
	return z.statuses[3].includes(25);
}

function nivelle(){
	return z.statuses[3].includes(26);
}

function marne(){
	return z.statuses[3].includes(31);
}

function renault(){
	return z.statuses[3].includes(27);
}

function alpini(){
	return z.statuses[3].includes(32);
}

function battlecruisers(){
	return z.statuses[4].includes(30);
}

function dreadnoughts(){
	return z.statuses[4].includes(33);
}

function blackjack(){
	return z.statuses[4].includes(34);
}

function canRumplerTaube(){
	if(!rumplerTaube()){
		return false;
	}
	for(let j = 0; !(j>=z.defenders.length); j++){
		if(z.prepared[powerNum(z.countries[z.defenders[j]].power)]){
			return true;
		}
	}
	return false;
}

function russianRailGauge(){
	if(arguments.length === 0){
		return z.statuses[0].includes(17);
	}
	switch(arguments[0]){
		case "MOS":
		case "PET":
		case "UKR":
		case "CAU":
		case "BAL":
		case "POL":
		case "GAL":
		case "RUM":
		case "BLA":
		case "AZE":
		case "CAS":
			return true;
	}
	return false;
}

function noBattle(){
	if(!z.attacker){
		return true;
	}
	if(z.counterattackPause){
		return (/counterattack is possible/.exec(t.value) === null);
	}
	if(z.options[4].includes("[Mark IV Tanks] Build an Army")){
		return true;
	}
	return false;
}


/* note that we do not card-count double reinforce*/
function couldReinforce(){
	let needed = 1;
	if(z.revealedDouble){
		needed++;
	}
	let c = 0;
	for(let j = 0; !(j>=z.defenders.length); j++){
		let k = powerNum(z.countries[z.defenders[j]].power);
		if(!z.defending[j]){
			continue;
		}
		if(z.prepared[k].length === 0){
			continue;
		}
		let germanyCanHelp = germanAidInTheEast() && provinces[z.target].terrain !== "Sea" && z.defenders[j] === "Germany" && 
			!z.countries.Germany.supply.includes(z.target) && 
			((z.defenders.includes("AH") && z.countries.AH.supply.includes(z.target)) || (z.defenders.includes("Turkey") && z.countries.Turkey.supply.includes(z.target)));
		let americaCanHelp = blackjack() && provinces[z.target].terrain !== "Sea" && z.defenders[j] === "US" && !z.countries.US.supply.includes(z.target) && 
			((z.defenders.includes("UK") && z.countries.UK.supply.includes(z.target)) || (z.defenders.includes("France") && z.countries.France.supply.includes(z.target)) || 
				(z.defenders.includes("Italy") && z.countries.Italy.supply.includes(z.target)));				
		let wrongRailGauge = russianRailGauge() && z.defenders[j] === "Russia" && !russianRailGauge(z.target);
		if(americaCanHelp || germanyCanHelp || (z.countries[z.defenders[j]].supply.includes(z.target) && !wrongRailGauge)){
			return true;
		}
		switch(z.defenders[j]){
			case "AH":
				if(z.target === "BUL" && !z.upDiscards[k].includes(30)){
					c++;
					if(c === needed){
						return true;
					}
				}
				if(z.target === "BUL" && !z.upDiscards[k].includes(33)){
					c++;
					if(c === needed){
						return true;
					}
				}
				if(z.target === "GRE" && !z.upDiscards[k].includes(29)){
					c++;
					if(c === needed){
						return true;
					}
				}
				if((z.target === "BUD" || z.target === "GAL") && !z.upDiscards[k].includes(32)){
					return true;
				}
				if((z.target === "VIE" || z.target === "TYR") && !z.upDiscards[k].includes(25)){
					return true;
				}
				break;
			case "Turkey":
				if(!z.upDiscards[k].includes(37)){
					c++;
					if(c === needed){
						return true;
					}
				}
				break;
			case "Russia":
				if(z.target === "SER" && !z.upDiscards[k].includes(22)){
					c++;
					if(c === needed){
						return true;
					}
				}
				if(z.target === "SER" &&  !z.upDiscards[k].includes(34)){
					c++;
					if(c === needed){
						return true;
					}
				}
				break;
			case "Germany":
				if(provinces[z.target].terrain !== "Sea" && !z.upDiscards[k].includes(50)){
					return true;
				}
				if(provinces[z.target].terrain !== "Sea" &&  !z.upDiscards[k].includes(47)){
					c++;
					if(c === needed){
						return true;
					}
				}
				if((z.target === "WGE" || z.target === "BER" || z.target === "PRU") && !z.upDiscards[k].includes(48)){
					return true;
				}
				break;
			case "France":
				if(z.target === "RUM" && !z.upDiscards[k].includes(33)){
					c++;
					if(c === needed){
						return true;
					}
				}
				if(z.target === "RUM" &&  !z.upDiscards[k].includes(37)){
					c++;
					if(c === needed){
						return true;
					}
				}
				break;
			case "UK":
				if(provinces[z.target].terrain === "Sea" && !z.upDiscards[k].includes(45)){
					return true;
				}
				if(z.target === "BEL" && !z.upDiscards[k].includes(43)){
					c++;
					if(c === needed){
						return true;
					}
				}
				if(z.target === "GRE" && !z.upDiscards[k].includes(40)){
					c++;
					if(c === needed){
						return true;
					}
				}
				if(provinces[z.target].terrain !== "Sea" && !z.upDiscards[k].includes(29)){
					c++;
					if(c === needed){
						return true;
					}
				}
		}
	}
	return false;
}

function canCounterattack(){
	if(provinces[z.target].terrain === "Sea"){
		return false;
	}
	if(provinces[z.source].terrain === "Sea"){
		return false;
	}
	let difficult = provinces[z.source].terrain === "Difficult";
	for(let j = 0; !(j>=z.defenders.length); j++){
		let k = powerNum(z.countries[z.defenders[j]].power);
		if(k !== me){
			continue;
		}
		if(z.prepared[k].length === 0){
			continue;
		}
		if(!z.countries[z.defenders[j]].supply.includes(z.target)){
			let germanyCanHelp = germanAidInTheEast() && z.defenders[j] === "Germany" && 
								((z.defenders.includes("AH") && z.countries.AH.supply.includes(z.target)) || (z.defenders.includes("Turkey") && z.countries.Turkey.supply.includes(z.target)));
			let americaCanHelp = blackjack() && z.defenders[j] === "US" && 
								((z.defenders.includes("UK") && z.countries.UK.supply.includes(z.target)) || (z.defenders.includes("France") && z.countries.France.supply.includes(z.target)) || 
								 (z.defenders.includes("Italy") && z.countries.Italy.supply.includes(z.target)));
			if(!germanyCanHelp && !americaCanHelp){
				continue;
			}
		}
		
		if(russianRailGauge() && z.defenders[j] === "Russia" && !russianRailGauge(z.target)){
			continue;
		}
		if(difficult){
			if(!(
			   (z.countries[z.defenders[j]].armies.includes(z.target) && z.hands[k].length > 0) ||
			   (germanAidInTheEast() && z.defenders[j] === "Germany" && (z.defenders.includes("Turkey") || z.defenders.includes("AH")) && z.hands[0].length > 0) ||
			   (blackjack() && z.defenders[j] === "US" && ((z.defenders.includes("UK") && z.hands[4].length > 0) || 
														  ((z.defenders.includes("France") || z.defenders.includes("Italy")) && (z.hands[3].length > 0 || z.bersaglieri)))) ||
			   (z.bersaglieri && (z.defenders[j] === "Italy" || z.defenders[j] === "France")))){
				   continue;
			}
		}
		if(limitedRailAndRoadNetwork() && limitedRailAndRoadNetwork(z.source) && z.countries[z.defenders[j]].entente && 
		  (z.hands[k].length === 0 || (z.hands[k].length === 1 && !(z.bersaglieri && z.defenders[j] === "France")))){ 
			continue;
		}
		switch(z.defenders[j]){
			case "AH":
				if(z.prepared[k].includes(31)){
					return true;
				}
				break;
			case "Turkey":
				if(z.prepared[k].includes(34)){
					return true;
				}
				break;
			case "Russia":
				if(z.prepared[k].includes(25)){
					return true;
				}
				break;
			case "Germany":
				if(z.prepared[k].includes(46)){
					return true;
				}
				break;
			case "France":
				if(z.prepared[k].includes(24)){
					return true;
				}
				break;
			case "US":
				if(z.prepared[k].includes(48)){
					return true;
				}
				break;
		}
	}
	return false;
}

/* RULES: presumably, only one counterattack allowed from the defenders per battle. */
function couldCounterattack(){
	if(provinces[z.target].terrain === "Sea"){
		return false;
	}
	if(provinces[z.source].terrain === "Sea"){
		return false;
	}
	let difficult = provinces[z.source].terrain === "Difficult";
	for(let j = 0; !(j>=z.defenders.length); j++){
		let k = powerNum(z.countries[z.defenders[j]].power);
		if(z.prepared[k].length === 0){
			continue;
		}
		
		if(!z.countries[z.defenders[j]].supply.includes(z.target)){
			let germanyCanHelp = germanAidInTheEast() && z.defenders[j] === "Germany" && 
								((z.defenders.includes("AH") && z.countries.AH.supply.includes(z.target)) || (z.defenders.includes("Turkey") && z.countries.Turkey.supply.includes(z.target)));
			let americaCanHelp = blackjack() && provinces[z.target].terrain !== "Sea" && z.defenders[j] === "US" &&
								((z.defenders.includes("UK") && z.countries.UK.supply.includes(z.target)) || (z.defenders.includes("France") && z.countries.France.supply.includes(z.target)) || 
								 (z.defenders.includes("Italy") && z.countries.Italy.supply.includes(z.target)));
			if(!germanyCanHelp && !americaCanHelp){
				continue;
			}
		}
		if(russianRailGauge() && z.defenders[j] === "Russia" && !russianRailGauge(z.target)){
			continue;
		}
		if(difficult){
			if(!(
			   (z.countries[z.defenders[j]].armies.includes(z.target) && z.hands[k].length > 0) ||
			   (germanAidInTheEast() && z.defenders[j] === "Germany" && (z.defenders.includes("Turkey") || z.defenders.includes("AH")) && z.hands[0].length > 0) ||
			   (blackjack() && z.defenders[j] === "US" && ((z.defenders.includes("UK") && z.hands[4].length > 0) || 
														   ((z.defenders.includes("France") || z.defenders.includes("Italy")) && (z.bersaglieri || z.hands[3].length > 0)))) ||
			   (z.bersaglieri && (z.defenders[j] === "Italy" || z.defenders[j] === "France")))){
				   continue;
			}
		}
		if(limitedRailAndRoadNetwork() && limitedRailAndRoadNetwork(z.source) && z.countries[z.defenders[j]].entente && 
		  (z.hands[k].length === 0 || (z.hands[k].length === 1 && !(z.bersaglieri && z.defenders[j] === "France")))){ 
			continue;
		}
		if(!z.defending[j]){
			continue;
		}
		switch(z.defenders[j]){
			case "AH":
				if(!z.upDiscards[k].includes(31)){
					return true;
				}
				break;
			case "Turkey":
				if(!z.upDiscards[k].includes(34)){
					return true;
				}
				break;
			case "Russia":
				if(!z.upDiscards[k].includes(25)){
					return true;
				}
				break;
			case "Germany":
				if(!z.upDiscards[k].includes(46)){
					return true;
				}
				break;
			case "France":
				if(!z.upDiscards[k].includes(24) && !z.statuses[k].includes(24)){
					return true;
				}
				break;
			case "US":
				if(!z.upDiscards[k].includes(48)){
					return true;
				}
				break;
		}
	}
	return false;
}

function resolveDefeat(){
	z.germanyConcedes = false;
	z.americaConcedes = false;
	z.attackerConcedes = false;
	boldAlert("The attack by "+z.attacker+" from "+z.source+" into "+z.target+" is defeated.");
	for(let j = 0; !(j>=z.defenders.length); j++){
		z.defending[j] = true;
	}
	if(couldCounterattack()){
		for(let j = 0; !(j>=z.defenders.length); j++){
			addOption(powerNum(z.countries[z.defenders[j]].power),"Decline to Counterattack");
			addOption(powerNum(z.countries[z.defenders[j]].power),"Counterattack!");
		}
		plainAlert("A counterattack is possible; to bypass this, you may continue with the rest of the turn in a new post after this one.");
		z.counterattackPause = true;
	} else {
		z.attacker = null;
		z.target = null;
		z.source = null;
		z.defenders = [];
		z.defending = [];
		z.revealedDouble = false;
	}
}

function canMkIVTanks(){
	if(canBuildArmyIn("UK",z.target)){
		for(let j = 0; !(j>=z.prepared[4].length); j++){
			let card = z.prepared[4][j];
			if(country(card) === "UK" && (prepareSymbol(card) === "SLB" || prepareSymbol(card) === "SLBx2")){
				if(prepareText(card) === ""){
					return true;
				}
				if(prepareText(card).includes(z.target)){
					return true;
				}
			}

		}
	}
	return false;
}

function resolveVictory(){
	z.attackerConcedes = false;
	z.germanyConcedes = false;
	z.americaConcedes = false;
	boldAlert("The attack by "+z.attacker+" from "+z.source+" into "+z.target+" is successful!");
	if(z.schlieffen === z.target){
		z.options[2].unshift("[Schlieffen Plan] Build into the space battled");
	}
	if(z.aPlaceInTheSun === z.target && !isDifficult()){
		z.options[2].unshift("[A Place in the Sun] Build into the space battled");
	}
	if(z.gorliceTarnow === z.target){
		z.options[2].unshift("[Gorlice-Tarnów Offensive] Build into the space battled");
	}
	for(let j = 0; !(j>=z.defenders.length); j++){
		for(let k = 0; !(k>=z.countries[z.defenders[j]].armies.length); k++){
			if(z.countries[z.defenders[j]].armies[k] === z.target){
				z.countries[z.defenders[j]].armies[k] = "";
				updateSupply(z.defenders[j]);
				break;
			}
		}
		for(let k = 0; !(k>=z.countries[z.defenders[j]].navies.length); k++){
			if(z.countries[z.defenders[j]].navies[k] === z.target){
				z.countries[z.defenders[j]].navies[k] = "";
				updateSupply(z.defenders[j]);
				break;
			}
		}
	}
	if(z.attacker === "UK" && z.statuses[4].includes(32) && !isDifficult() && provinces[z.target].terrain !== "Sea" && z.prepared[4].length > 0 && !z.mkIV){
		plainAlert("UK may be able to use Mk IV Tanks here.");
		z.options[4].unshift("[Mark IV Tanks] Build an Army");
	} else {
		z.attacker = null;
		z.target = null;
		z.source = null;
		z.defenders = [];
		z.defending = [];
		z.revealedDouble = false;
	}
	for(let j = 0; !(j>=5); j++){
		removeOption("Reinforce!",j);
	}
}

function addOption(power,opt){
	for(let j = 0; !(j>=z.options[power].length); j++){
		if(z.options[power][j] === opt){
			return undefined;
		}
	}
	z.options[power].unshift(opt);
}

function canStosstruppen(){
	let stossTargets = [];
	for(let j = 0; !(j>= provinces[z.stossProvince].neighbors.length); j++){
		let neighbor = provinces[z.stossProvince].neighbors[j];
		if(canLandBattleIn("Germany",neighbor)){
			stossTargets.push(neighbor);
		}
	}
	if(stossTargets.length === 0){
		return false;
	}
	for(let k = 0; !(k>=z.prepared[me].length); k++){
		if(prepareSymbol(z.prepared[me][k]) === "SLB" || prepareSymbol(z.prepared[me][k]) === "SLBx2"){
			if(prepareText(z.prepared[me][k]) === ""){
				return true;
			}
			for(let j = 0; !(j>=stossTargets.length); j++){
				if(prepareText(z.prepared[me][k]).includes(stossTargets[j])){
					return true;
				}
			}
		}
	}
	return false;
}

function buildArmy(country2,province){
	for(let j = 0; !(j>=z.countries[country2].armies.length); j++){
		if(z.countries[country2].armies[j] === ""){
			z.countries[country2].armies[j] = province;
			updateSupply(country2);
			boldAlert(country2 +" built an Army in "+province+".");
			if(limitedRailAndRoadNetwork() && z.countries[country2].entente && limitedRailAndRoadNetwork(province)){
				z.options[me].unshift("[Limited Rail and Road Network] Discard a card from hand");
			}
			if(stosstruppen() && country2 === "Germany" && !z.stosstruppen){
				z.stossProvince = province;
				z.options[me].unshift("[Stosstruppen] Battle an adjacent land space");
			}
			break;
		}
	}
}

function recruitArmy(country2,province){
	for(let j = 0; !(j>=z.countries[country2].armies.length); j++){
		if(z.countries[country2].armies[j] === ""){
			z.countries[country2].armies[j] = province;
			updateSupply(country2);
			boldAlert(country2 +" recruited an Army in "+province+".");
			if(limitedRailAndRoadNetwork() && z.countries[country2].entente && limitedRailAndRoadNetwork(province)){
				z.options[me].unshift("[Limited Rail and Road Network] Discard a card from hand");
			}
			break;
		}
	}
}

function recruitNavy(country2,province){
	for(let j = 0; !(j>=z.countries[country2].navies.length); j++){
		if(z.countries[country2].navies[j] === ""){
			z.countries[country2].navies[j] = province;
			updateSupply(country2);
			boldAlert(country2 +" recruited an Navy in "+province+".");
			break;
		}
	}
}

function buildNavy(country2,province){
	for(let j = 0; !(j>=z.countries[country2].navies.length); j++){
		if(z.countries[country2].navies[j] === ""){
			z.countries[country2].navies[j] = province;
			updateSupply(country2);
			boldAlert(country2 +" built a Navy in "+province+".");
			break;
		}
	}
}

/* TODO: notification that battle starts */
function startBattle(attacker,target,source){
	if(z.christmasTruce && (attacker === "France" || attacker === "UK") && provinces[target].terrain !== "Sea" && z.countries.Germany.armies.includes(target)){
		addAlert("Cannot battle here due to the Christmas Truce.");
		return undefined;
	}
	z.attacker = attacker;
	z.target = target;
	z.source = source;
	z.counterattackPause = false;
	let pow = powerNum(z.countries[attacker].power);
	if(isDifficult() && (!bersaglieri() || pow !== 3)){
		if(z.hands[pow].length === 0){
			addAlert("Cannot battle into Difficult Terrain without cards in hand.");
			z.attacker = null;
			z.target = null;
			z.source = null;
			return undefined;
		}
		z.options[pow].unshift("[Difficult Terrain] Discard a card from hand");
	}
	if(limitedRailAndRoadNetwork() && z.countries[attacker].entente && limitedRailAndRoadNetwork(target)){
		if(z.hands[pow].length === 0 || (z.hands[pow].length === 1 && (!bersaglieri() || pow !== 3))){
			addAlert("Cannot battle into "+target+" without enough cards in hand for both Difficult Terrain and Limited Rail and Road Network.");
			removeOption("[Difficult Terrain] Discard a card from hand",pow);
			return undefined;
		}
		z.options[me].unshift("[Limited Rail and Road Network] Discard a card from hand");
	}

	for(let j = 0; !(j>=5); j++){
		removeOption("Counterattack!",j);
		removeOption("Decline to Counterattack",j);
	}
	z.revealedDouble = false;
	z.defenders = [];
	z.defending = [];
	t.value += bold(attacker + " battles into "+target+" from "+source+".")+"\r\n";
	addAlert("You battle into "+target+" from "+source+".");
	for(let x in z.countries){
		if(z.countries[x].entente === !z.countries[attacker].entente && (z.countries[x].armies.includes(z.target) || z.countries[x].navies.includes(z.target))){
			z.defenders.push(x);
			z.defending.push(true);
		}
	}
	if(germanAidInTheEast() && (z.defenders.includes("AH") || z.defenders.includes("Turkey")) && !z.defenders.includes("Germany") && provinces[z.target].terrain !== "Sea"){
		z.defenders.push("Germany");
		z.defending.push(true);
	}
	if(blackjack() && !z.defenders.includes("US") && (z.defenders.includes("UK") || z.defenders.includes("France") || z.defenders.includes("Italy")) && provinces[z.target].terrain !== "Sea"){
		for(let j = 0; !(j>=provinces[z.target].neighbors.length); j++){
			if(z.countries.US.armies.includes(provinces[z.target].neighbors[j]) || z.countries.US.navies.includes(provinces[z.target].neighbors[j])){
				z.defenders.push("US");
				z.defending.push(true);
				break;
			}
		}
	}
	if(laRevanche() && z.attacker === "France" && (z.target === "BEL" || z.target === "BUR" || z.target === "WGE") && z.defenders.includes("Germany")){
		plainAlert("La Revanche!");
		modifyEntente(1);
	}
	/* RULES: Verdun/Marne, Alpini; if you have no prepared cards, can you still attack for a VP penalty */
	/* RULES: interaction with German Aid in the East on counterattack */
	if(verdun() && z.target === "BUR" && z.defenders.includes("France")){
		if(z.prepared[me].length === 0){
			t.value += z.attacker + " triggers Verdun.\r\n";
			addAlert("You trigger Verdun.");
			modifyCP(-1);
		} else if (z.prepared[me].length === 1){
			t.value += z.attacker + " triggers Verdun, and discards their only prepared card.\r\n";
			addAlert("You discard "+cardText(z.prepared[me][0])+" due to Verdun.");
			z.downDiscards[me].push(z.prepared[me].pop());
		} else {
			t.value += z.attacker + " triggers Verdun, and must discard a prepared card.\r\n";
			addAlert("You trigger Verdun, and must discard a prepared card.");
			z.options[me].unshift("[Verdun] Discard a prepared card");
		}
	}
	if(marne() && z.target === "PIC" && z.defenders.includes("France")){
		if(z.prepared[me].length === 0){
			t.value += z.attacker + " triggers Marne.\r\n";
			addAlert("You trigger Marne.");
			modifyCP(-1);
		} else if (z.prepared[me].length === 1){
			t.value += z.attacker + " triggers Marne, and discards their only prepared card.\r\n";
			addAlert("You discard "+cardText(z.prepared[me][0])+" due to Verdun.");
			z.downDiscards[me].push(z.prepared[me].pop());
		} else {
			t.value += z.attacker + " triggers Marne, and must discard a prepared card.\r\n";
			addAlert("You trigger Marne, and must discard a prepared card.");
			z.options[me].unshift("[Marne] Discard a prepared card");
		}
	}
	/* RULES: Does Alpini apply for amphibious */
	if(alpini() && isDifficult() && provinces[z.target].terrain !== "Sea" && !z.alpini && z.defenders.includes("Italy")){
		z.alpini = true;
		if(z.hands[me].length >= 2){
			z.options[me].unshift("[Alpini] Discard a card from hand");
			t.value += z.attacker + " triggers Alpini, and must discard a card from hand.\r\n";
			addAlert("You trigger Alpini, and must discard a card from hand.");
		} else {
			t.value += z.attacker + " triggers Alpini.\r\n";
			addAlert("You trigger Alpini.");
			modifyCP(-1);
		}
	}

	if(rumplerTaube() && z.attacker === "Germany"){
		addOption(2,"[Rumpler Taube Air Reconnaissance]");
	}
	/* RULES: interaction with Blackjack on counterattack */
	if(tripledTrenchLines() && z.countries.Germany.armies.includes(z.target)){
		if(z.drawDecks[me].length === 0){
			t.value += z.attacker + " runs into Germany's Tripled Trench Lines.\r\n";
			modifyEntente(-1);
		} else {
			t.value += bold(z.attacker + " discards a card from the top of their draw deck due to Tripled Trench Lines.")+"\r\n";
			addAlert("You discard "+cardText(z.drawDecks[me][0])+" due to Tripled Trench Lines.");
			z.downDiscards[me].push(z.drawDecks[me].shift());
		}
	}
	if(mustardGas() && z.attacker === "Germany" && !z.mustardGas && provinces[z.target].terrain !== "Sea"){
		let defendingPowers = [];
		for(let j = 0; !(j>=z.defenders.length); j++){
			addOption(2,"[Mustard Gas] Make "+z.countries[z.defenders[j]].power+" discard a prepared card.");
		}
	}
	if(redBaron() && z.attacker === "Germany" && !z.redBaron && provinces[z.target].terrain !== "Sea"){
		let defendingPowers = [];
		for(let j = 0; !(j>=z.defenders.length); j++){
			/* safeguard against Blackjack */
			if(z.countries[z.defenders[j]].armies.includes(z.target)){
				addOption(2,"[The Red Baron] Make "+z.countries[z.defenders[j]].power+" discard the top card of their draw deck.");
			}
		}
	}
	if(!couldReinforce()){
		boldAlert(z.attacker + " wins automatically!");
		resolveVictory();
		return undefined;
	} else {
		for(let j = 0; !(j>=z.defenders.length); j++){
			t.value += z.defenders[j]+", ";
			addOption(powerNum(z.countries[z.defenders[j]].power),"Decline to Reinforce");
			addOption(powerNum(z.countries[z.defenders[j]].power),"Reinforce!");
		}
		t.value += "any defense?\r\n";
	}
}

/* TODO: 1 person playing multiple countries? */

function modifyCP(amount){
	z.CP += amount;
	if(amount > 0){
		boldAlert("The Central Powers score "+amount+" VP; they now have "+z.CP+" VP.");
	} else if (0 > amount && z.CP > 0){
		boldAlert("The Central Powers lose "+(-amount)+" VP; they now have "+z.CP+" VP.");
	} else if(0 > z.CP){
		z.entente -= z.CP;
		z.CP = 0;
		boldAlert("The Central Powers are penalized "+(-amount)+" VP; they now have 0 VP, and the Entente have "+z.entente+" VP.");
	}
}

function modifyEntente(amount){
	z.entente += amount;
	if(amount > 0){
		boldAlert("The Entente scores "+amount+" VP; they now have "+z.entente+" VP.");
	} else if (0 > amount && z.entente > 0){
		boldAlert("The Entente loses "+(-amount)+" VP; they now have "+z.entente+" VP.");
	} else if(0 > z.entente){
		z.CP -= z.entente;
		z.entente = 0;
		boldAlert("The Entente is penalized "+(-amount)+" VP; they now have 0 VP, and the Central Powers have "+z.CP+" VP.");
	}
}

function updateSupply(country2){
	z.countries[country2].supply = [];
	if(z.countries[country2].armies.includes(z.countries[country2].capital)){
		z.countries[country2].supply.push(z.countries[country2].capital);
		let proceed = true;
		while(proceed){
			proceed = false;
			for(let j = 0; !(j>=z.countries[country2].supply.length); j++){
				let neighbors = provinces[z.countries[country2].supply[j]].neighbors;
				if(!z.countries[country2].entente && z.countries[country2].supply[j] === "NTH"){
					neighbors.push("BAL");
				} else if(!z.countries[country2].entente && z.countries[country2].supply[j] === "BAL"){
					neighbors.push("NTH");
				}
				for(let k = 0; !(k>=neighbors.length); k++){
					if((z.countries[country2].armies.includes(neighbors[k]) || z.countries[country2].navies.includes(neighbors[k])) && !z.countries[country2].supply.includes(neighbors[k])){
						proceed = true;
						z.countries[country2].supply.push(neighbors[k]);
					}
				}
			}
		}
	}
	if(country2 === "AH" && z.morava && z.countries.AH.armies.includes("BUL") && !z.countries.AH.supply.includes("BUL")){
		z.countries.AH.supply.push("BUL");
	}
	if(country2 === "France" && z.transylvania && z.countries.France.armies.includes("RUM") && !z.countries.France.supply.includes("RUM")){
		z.countries.France.supply.push("RUM");
	}
}

function canRecruitArmyIn(country2,province){
	if(limitedRailAndRoadNetwork() && z.countries[country2].entente && limitedRailAndRoadNetwork(province) && z.hands[me].length === 0){
		return false;
	}
	if(!armyAvailable(country2)){
		return false;
	}
	if(provinces[province].terrain === "Sea"){
		return false;
	}
	if(z.countries[country2].armies.includes(province)){
		return false;
	}
	for(let x in z.countries){
		if(z.countries[x].entente === !z.countries[country2].entente && z.countries[x].armies.includes(province)){
			return false;
		}
	}
	return true;
}

function canRecruitNavyIn(country2,province){
	if(!navyAvailable(country2)){
		return false;
	}
	if(provinces[province].terrain !== "Sea"){
		return false;
	}
	if(z.countries[country2].navies.includes(province)){
		return false;
	}
	for(let x in z.countries){
		if(z.countries[x].entente === !z.countries[country2].entente && z.countries[x].navies.includes(province)){
			return false;
		}
	}
	return true;
}

function canBuildArmyIn(country2,province){
	if(limitedRailAndRoadNetwork() && z.countries[country2].entente && limitedRailAndRoadNetwork(province) && z.hands[me].length === 0){
		return false;
	}
	if(!armyAvailable(country2)){
		return false;
	}
	if(provinces[province].terrain === "Sea"){
		return false;
	}
	if(z.countries[country2].armies.includes(province)){
		return false;
	}
	for(let x in z.countries){
		if(z.countries[x].entente === !z.countries[country2].entente && z.countries[x].armies.includes(province)){
			return false;
		}
	}
	for(let j = 0; !(j>=provinces[province].neighbors.length); j++){
		if(z.countries[country2].supply.includes(provinces[province].neighbors[j])){
			return true;
		}
	}
	if(province === z.countries[country2].capital){
		return true;
	}
	return false;
}

/* TODO: Any strange Stosstruppen (or other German) interactions? */

/* empty space battling for:
 DONE: Schlieffen Plan (Belgium, Picardy, Paris): just let you build in there, but must discard a card from hand if tracing supply from ENG/NTH/NAO
 DONE: Gorlice-Tarnów (PRU/POL/GAL/UKR/PET): just let you build in there, but must discard a card from hand if tracing supply through BAL/BLA
 DONE: A Place In the Sun (land that isn't difficult): just let you build in there
 DONE: Mark IV Tanks (land that isn't difficult): have to provide option.  watch out for interactions with other cards... */
function canLandBattleIn(country2,province){
	if(provinces[province].terrain === "Sea"){
		return false;
	}
	let enemy = false;
	for(let x in z.countries){
		if(z.countries[x].entente === !z.countries[country2].entente && z.countries[x].armies.includes(province)){
			enemy = true;
			break;
		}
	}
	if(!enemy){
		return false;
	}
	for(let j = 0; !(j>=provinces[province].neighbors.length); j++){
		if(z.countries[country2].supply.includes(provinces[province].neighbors[j])){
			if(z.hands[me].length === 0 && (provinces[province].terrain === "Difficult" || provinces[provinces[province].neighbors[j]].terrain === "Sea")){
				if(!z.bersaglieri || (country2 !== "Italy" && country2 !== "France")){
					continue;
				}
			}
			if(z.hands[me].length === 1 && limitedRailAndRoadNetwork() && z.countries[country2].entente && limitedRailAndRoadNetwork(province)){
				continue;
			}
			return true;
		}
	}
	return false;
}

function canLandBattle(country2){
	for(let x in provinces){
		if(canLandBattleIn(country2,x)){
			return true;
		}
	}
	return false;
}

function canSeaBattleIn(country2,province){
	if(provinces[province].terrain !== "Sea"){
		return false;
	}
	let enemy = false;
	for(let x in z.countries){
		if(z.countries[x].entente === !z.countries[country2].entente && z.countries[x].navies.includes(province)){
			enemy = true;
			break;
		}
	}
	if(!enemy){
		return false;
	}
	for(let j = 0; !(j>=provinces[province].neighbors.length); j++){
		if(z.countries[country2].supply.includes(provinces[province].neighbors[j])){
			if(z.hands[me].length === 0 && (provinces[provinces[province].neighbors[j]].terrain !== "Sea")){
				continue;
			}
			return true;
		}
	}
	if(!z.countries[country2].entente && province === "NTH" && z.countries[country2].supply.includes("BAL")){
		return true;
	}
	if(!z.countries[country2].entente && province === "BAL" && z.countries[country2].supply.includes("NTH")){
		return true;
	}
	return false;
}

function canSeaBattle(country2){
	for(let x in provinces){
		if(canSeaBattleIn(country2,x)){
			return true;
		}
	}
	return false;
}

function canBuildArmy(country2){
	if(!armyAvailable(country2)){
		return false;
	}
	for(let x in provinces){
		if(canBuildArmyIn(country2,x)){
			return true;
		}
	}
	return false;
}

function canBuildNavyIn(country2,province){
	if(!navyAvailable(country2)){
		return false;
	}
	if(provinces[province].terrain === "Clear" || provinces[province].terrain === "Difficult"){
		return false;
	}
	if(z.countries[country2].navies.includes(province)){
		return false;
	}
	for(let x in z.countries){
		if(z.countries[x].entente === !z.countries[country2].entente && z.countries[x].navies.includes(province)){
			return false;
		}
	}
	for(let j = 0; !(j>=provinces[province].neighbors.length); j++){
		if(z.countries[country2].supply.includes(provinces[province].neighbors[j])){
			return true;
		}
	}
	if(country2 === "Germany" && province === "BAL" && z.countries.Germany.supply.includes("NTH")){
		return true;
	}
	if(country2 === "Germany" && province === "NTH" && z.countries.Germany.supply.includes("BAL")){
		return true;
	}
	return false;
}

function canBuildNavy(country2){
	if(!navyAvailable(country2)){
		return false;
	}
	for(let x in provinces){
		if(canBuildNavyIn(country2,x)){
			return true;
		}
	}
	return false;
}

function versionAtLeast(ver) {
	for(let j = 0; !(j >= z.version.length) && !(j >= ver.length); j++) {
		if(ver[j] > z.version[j]) {
			return false;
		} else if(z.version[j] > ver[j]) {
			return true;
		}
	}
	if(ver.length > z.version.length) {
		return false;
	}
	return true;
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

function getScore(){
	let CPScore = 0;
	let ententeScore = 0;
	let objectives = ["USA","BRI","PAR","BER","VIE","ROM","IST","MOS","PIC","BEL","WGE","PRU","POL","GAL","ALP","TYR","BUD","SER","AZE"];
	objectives = objectives.concat(z.extraObjectives);
	let ententePresence = [];
	let CPPresence = [];
	for(let j = 0; !(j>=objectives.length); j++){
		ententePresence.push(0);
		CPPresence.push(0);
	}
	if(!z.countries.Germany.armies.includes("USA")){
		for(let j = 0; !(j>=objectives.length); j++){
			if(z.countries.US.armies.includes(objectives[j])){
				ententePresence[j] = 1;
			}
		}
	}
	if(!z.countries.Germany.armies.includes("BRI") && !z.countries.AH.armies.includes("BRI")){
		for(let j = 0; !(j>=objectives.length); j++){
			if(z.countries.UK.armies.includes(objectives[j])){
				ententePresence[j] = 1;
			}
		}
	}
	if(!z.countries.Germany.armies.includes("PAR") && !z.countries.AH.armies.includes("PAR")){
		for(let j = 0; !(j>=objectives.length); j++){
			if(z.countries.France.armies.includes(objectives[j])){
				ententePresence[j] = 1;
			}
		}
	}
	if(!z.countries.Germany.armies.includes("ROM") && !z.countries.AH.armies.includes("ROM")){
		for(let j = 0; !(j>=objectives.length); j++){
			if(z.countries.Italy.armies.includes(objectives[j])){
				ententePresence[j] = 1;
			}
		}
	}
	if(!z.countries.Germany.armies.includes("MOS") && !z.countries.AH.armies.includes("MOS")){
		for(let j = 0; !(j>=objectives.length); j++){
			if(z.countries.Russia.armies.includes(objectives[j])){
				ententePresence[j] = 1;
			}
		}
		if(z.statuses[1].includes(18)){
			if(z.countries.Russia.supply.includes("GRE") || z.countries.Russia.supply.includes("ROM") || z.countries.Russia.supply.includes("BUL") || z.countries.Russia.supply.includes("IST") || z.countries.Russia.supply.includes("ANA") || z.countries.Russia.supply.includes("MID")){
				ententeScore += 1;
			}
		}
	}
	if(!z.countries.UK.armies.includes("BER") && !z.countries.US.armies.includes("BER") && !z.countries.France.armies.includes("BER") && !z.countries.Italy.armies.includes("BER") && !z.countries.Russia.armies.includes("BER")){
		for(let j = 0; !(j>=objectives.length); j++){
			if(z.countries.Germany.armies.includes(objectives[j])){
				CPPresence[j] = 1;
			}
		}
		if(z.statuses[2].includes(30) && !z.countries.UK.armies.includes("IRE")){
			CPScore += 1;
		}
		if(z.statuses[2].includes(35) && (z.countries.Germany.navies.includes("ENG") || z.countries.Germany.navies.includes("NTH") || z.countries.Germany.navies.includes("NAO"))){
			CPScore += 2;
		}
	}
	if(!z.countries.UK.armies.includes("VIE") && !z.countries.US.armies.includes("VIE") && !z.countries.France.armies.includes("VIE") && !z.countries.Italy.armies.includes("VIE") && !z.countries.Russia.armies.includes("VIE")){
		for(let j = 0; !(j>=objectives.length); j++){
			if(z.countries.AH.armies.includes(objectives[j])){
				CPPresence[j] = 1;
			}
		}
		if(z.statuses[0].includes(18) 
		&& !z.countries.Russia.armies.includes("SER") && !z.countries.Russia.armies.includes("BUD") 
		&& !z.countries.Russia.armies.includes("RUM") && !z.countries.Russia.armies.includes("BUL") && !z.countries.Russia.armies.includes("GRE")
		&& !z.countries.UK.armies.includes("SER") && !z.countries.UK.armies.includes("BUD") 
		&& !z.countries.UK.armies.includes("RUM") && !z.countries.UK.armies.includes("BUL") && !z.countries.UK.armies.includes("GRE")
		&& !z.countries.Italy.armies.includes("SER") && !z.countries.Italy.armies.includes("BUD") 
		&& !z.countries.Italy.armies.includes("RUM") && !z.countries.Italy.armies.includes("BUL") && !z.countries.Italy.armies.includes("GRE")
		&& !z.countries.France.armies.includes("SER") && !z.countries.France.armies.includes("BUD") 
		&& !z.countries.France.armies.includes("RUM") && !z.countries.France.armies.includes("BUL") && !z.countries.France.armies.includes("GRE")
		&& !z.countries.US.armies.includes("SER") && !z.countries.US.armies.includes("BUD") 
		&& !z.countries.US.armies.includes("RUM") && !z.countries.US.armies.includes("BUL") && !z.countries.US.armies.includes("GRE")){
			CPScore += 2;
		}
		if(z.statuses[0].includes(19) && z.countries.AH.navies[0] !== ""){
			CPScore += 1;
		}
	}
	if(!z.countries.UK.armies.includes("IST") && !z.countries.France.armies.includes("IST") && !z.countries.Italy.armies.includes("IST") && !z.countries.Russia.armies.includes("IST")){
		for(let j = 0; !(j>=objectives.length); j++){
			if(z.countries.Turkey.armies.includes(objectives[j])){
				CPPresence[j] = 1;
			}
		}
	}
	for(let j = 0; !(j>=objectives.length); j++){
		ententeScore += ententePresence[j];
		CPScore += CPPresence[j];
	}
	return [CPScore,ententeScore];
}


function scoringRound(){
	boldAlert("Scoring Round!");
	let scores = getScore();
	modifyCP(scores[0]);
	modifyEntente(scores[1]);
	if(z.CP - z.entente >= 12 && z.round !== 17){
		addAlert("The Central Powers win a Sudden Victory, "+z.CP+" to "+z.entente+".");
		t.value += bold(size("Central Powers Sudden Victory!",14))+"\r\n";
		t.value += bold("Final Score: CP "+z.CP+" - Entente "+z.entente)+".\r\n";
		z.gameOver = true;
	} else if(z.entente - z.CP >= 12 && z.round !== 17){
		addAlert("The Entente wins a Sudden Victory, "+z.entente+" to "+z.CP+".");
		t.value += bold(size("Entente Sudden Victory!",14))+"\r\n";
		t.value += bold("Final Score: Entente "+z.entente+" - CP "+z.CP)+".\r\n";
		z.gameOver = true;
	}
}

function prepareCard(){
	return new Promise((resolve,reject)=>{
		let promptText =
		"Please choose a card in your hand to prepare (1-" +
		z.hands[me].length +
		"):\n\n";
		z.hands[me].forEach(function(elt, index) {
			promptText += index + 1 + ": " + cardText(elt) + "\n";
		});
		promptNum(promptText,(a)=>1>a||a>z.hands[me].length,reject,(preparedCard)=>{
			addAlert("Prepared card: " + cardText(z.hands[me][preparedCard - 1]));
			t.value = t.value + bold("Preparing a card.") + "\r\n";
			z.prepared[me].push(z.hands[me][preparedCard - 1]);
			z.hands[me].splice(preparedCard - 1, 1);
			resolve();
		});
	});
}

function unprepareCard(){
	return new Promise((resolve,reject)=>{
		let promptText =
		"Please choose a card to unprepare (1-" +
		z.prepared[me].length +
		"):\n\n";
		z.prepared[me].forEach(function(elt, index) {
			promptText += index + 1 + ": " + cardText(elt) + "\n";
		});
		promptNum(promptText,(a)=>1>a||a>z.prepared[me].length,reject,(unpreparedCard)=>{
			addAlert("Unprepared " + cardText(z.prepared[me][unpreparedCard - 1]));
			t.value = t.value + bold("Unpreparing a card.") + "\r\n";
			z.hands[me].push(z.prepared[me][unpreparedCard - 1]);
			z.prepared[me].splice(unpreparedCard - 1, 1);
			resolve();
		});
	});
}


function advanceTurn(){
	z.attacker = null;
	z.target = null;
	z.source = null;
	z.defenders = [];
	z.defending = [];
	z.revealedDouble = false;
	z.counterattackPause = false;
	z.morava = false;
	z.transylvania = false;
	z.mustardGas = false;
	z.redBaron = false;
	z.stosstruppen = false;
	z.renault = false;
	z.nivelle = false;
	z.alpini = false;
	z.battlecruisers = false;
	z.mkIV = false;
	z.dreadnoughts = false;
	z.schlieffen = null;
	z.aPlaceInTheSun = null;
	z.gorliceTarnow = null;
	z.bersaglieri = false;
	/* can only be used on German turn */
	if(z.turn === 1){
		z.bigBertha = false;
	} else {
		z.bigBertha = true;
	}
	updateSupply("AH");
	updateSupply("France");
	if(z.turn === 4){
		if(z.round === 3 || z.round === 7 || z.round === 11 || z.round === 15 || z.round === 17){
			scoringRound();
		}
		if(z.round === 17){
			z.gameOver = true;
			for(let j = 0; !(j>=5); j++){
				let diff = z.prepared[j].length + z.drawDecks[j].length + z.hands[j].length - z.attrition[j];
				if(0 > diff){
					if(j === 0 || j === 2){
						modifyCP(diff);
					} else {
						modifyEntente(diff);
					}
				}
			}
			if(z.entente > z.CP){
				addAlert("The Entente wins a Scoring Victory, "+z.entente+" to "+z.CP+".");
				t.value += bold(size("Entente Victory!",14))+"\r\n";
				t.value += bold("Final Score: Entente "+z.entente+" - CP "+z.CP)+".\r\n";
			} else {
				addAlert("The Central Powers win a Scoring Victory, "+z.CP+" to "+z.entente+".");
				t.value += bold(size("Central Powers Victory!",14))+"\r\n";
				t.value += bold("Final Score: CP "+z.CP+" - Entente "+z.entente)+".\r\n";
			}
		} else {
			z.round++;
			z.turn = 0;
			z.christmasTruce = false;
		}
	} else {
		z.turn++;
	}
	if(!z.gameOver){
		addAlert("It is now "+powerByNum(z.turn)+"'s turn.");
		let caporetto = z.options[2].includes("[Caporetto] Discard a card from hand");
		let mustardGas = -1;
		for(let j = 0; !(j>=z.options.length); j++){
			if(z.options[j].includes("[Mustard Gas] Discard a prepared card")){
				mustardGas = j;
				break;
			}
		}
		let sidneyReilly = z.options[2].includes("[Sidney Reilly] Discard a Status card");
		let tunnelMinesAT2 = z.options[0].includes("[Tunnel Mines] Discard a prepared card");
		let tunnelMinesAT1 = z.options[0].includes("[Tunnel Mines] Discard another prepared card");
		let tunnelMinesDE2 = z.options[2].includes("[Tunnel Mines] Discard a prepared card");
		let tunnelMinesDE1 = z.options[2].includes("[Tunnel Mines] Discard another prepared card");
		let passchendaele = z.options[2].includes("[Passchendaele] Discard a prepared card");
		z.options = [ [],[],[],[],[]];
		if(caporetto){
			z.options[2].unshift("[Caporetto] Discard a card from hand");
		}
		if(mustardGas !== -1){
			z.options[mustardGas].unshift("[Mustard Gas] Discard a prepared card");
		}
		if(sidneyReilly){
			z.options[2].unshift("[Sidney Reilly] Discard a Status card");
		}
		if(tunnelMinesAT2){
			z.options[0].unshift("[Tunnel Mines] Discard a prepared card");
		}
		if(tunnelMinesAT1){
			z.options[0].unshift("[Tunnel Mines] Discard another prepared card");
		}
		if(tunnelMinesDE2){
			z.options[2].unshift("[Tunnel Mines] Discard a prepared card");
		}
		if(tunnelMinesDE1){
			z.options[2].unshift("[Tunnel Mines] Discard another prepared card");
		}
		if(passchendaele){
			z.options[2].unshift("[Passchendaele] Discard a prepared card");
		}
		if(z.turn === 2){
			z.options[z.turn].push("[Woe to Them That Yet Draw Sword Against Me] Prepare a card");
		} 
		if(z.turn === 3){
			z.options[z.turn].push("[Troupes Coloniales] Draft a French Build Army");
		}
		z.options[z.turn].push("[Draft Step] Discard a card from hand");	
		if(z.turn === 4){
			z.options[z.turn].push("[Commonwealth Support] Build Army (UK)");
			z.options[z.turn].push("[The Girls with Yellow Hands] Land Battle (UK)");
		}
		z.options[z.turn].push("[Play Step] Play a card");
		z.options[z.turn].push("[Attrition Step] Play a prepared Attrition card");
		z.options[z.turn].push("[Prepare Step] Prepare a card");
		z.options[z.turn].push("[Prepare Step] Unprepare a card");
		z.options[z.turn].push("[Draw Step] Draw card(s) from your draw deck");
		z.options[z.turn].push("End Turn");
		z.options[z.turn].push("Remove a piece from the board"); 
		z.step = 0;
		t.value += "[h"+"r]"+boardImage();
		for(let j = 0; !(j>=5); j++){
			t.value += publicReport(j);
		}
		t.value += clear();
		
	} else {
		t.value += boardImage();
		for(let j = 0; !(j>=5); j++){
			t.value += publicReport(j);
		}
		t.value += clear();
	}
}

var RA = "[ima" + "geid=3679104 original inline]";
var RA2 = "[ima" + "geid=3679102 original inline]";
var RN = "[ima" + "geid=3679107 original inline]";
var RN2 = "[ima" + "geid=3679109 original inline]";
var SLB = "[ima" + "geid=3679111 original inline]";
var SLB2 = "[ima" + "geid=3679114 original inline]";
var SSB = "[ima" + "geid=3679116 original inline]";
var SSB2 = "[ima" + "geid=3679117 original inline]";
var CA = "[ima" + "geid=3679118 original inline]";
var ATR = "[ima" + "geid=3679121 original inline]";
var AHT = "[ima" + "geid=3679127 original inline]";
var RUS = "[ima" + "geid=3679131 original inline]";
var GER = "[ima" + "geid=3679133 original inline]";
var FRI = "[ima" + "geid=3679135 original inline]";
var UKUS = "[ima" + "geid=3679137 original inline]";
var SUP = "[ima" + "geid=3679198 original inline]";

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
		z.QMGversion = QMGversion;
		z.version = QMGversion;
	}
	if(!versionsAtLeast(QMGversion, z.QMGversion)) {
		addAlert("You are using an out-of-date version of the QMG script!  Run the QMG script again to apply the update.");
		window.localStorage.setItem("qmgUrgent", "outdated");
		clearBackground();
	} else {
		if(!versionsAtLeast(z.QMGversion, QMGversion)) {
			z.QMGversion = QMGversion;
		}
		let meCandidates = [];
		for(let j = 0; !(j>=5); j++){
			if(z.usernames[j]===myUsername){
				meCandidates.push(j);
			}
		}
		if(!z.hasOwnProperty("promptStyle")){
			z.promptStyle = [];
			for(let j = 0; !(j>=5); j++){
				z.promptStyle.push(1);
			}
		}
		let initialize = ()=>{
			switch (me) {
			case 0:
				power = "AT";
				powerName = "Austria-Hungary/Turkey";
				break;
			case 1:
				power = "RU";
				powerName = "Russia";
				break;
			case 2:
				power = "DE";
				powerName = "Germany";
				break;
			case 3:
				power = "FR";
				powerName = "France/Italy";
				break;
			case 4:
				power = "UK";
				powerName = "UK/US";
				break;
			}
		};
		if(meCandidates.length === 0){
			addAlert("You are not recognized as a player in this game!\nProceed only if you believe this to be in error, or you are replacing a player who resigned or disappeared.");
			promptNum("What power are you? (1-5)\n1: Austria-Hungary/Turkey\n2: Russia\n3: Germany\n4: France/Italy\n5: United Kingdom/United States",(a)=>1>a||a>5,clearBackground,(prompted)=>{
				me = prompted - 1;
				initialize();
				clearQuotes();
				mainMenu();
			});
		} else if (meCandidates.length === 1){
			me = meCandidates[0];
			initialize();
			clearQuotes();
			mainMenu();
		} else {
			let promptText = "Which power's cards would you like to look at? (1-"+meCandidates.length+")";
			for(let j = 0; !(j>=meCandidates.length); j++){
				promptText += "\n"+(j+1)+": ";
				switch(meCandidates[j]){
					case 0:
						promptText += "Austria-Hungary/Turkey";
						break;
					case 1:
						promptText += "Russia";
						break;
					case 2:
						promptText += "Germany";
						break;
					case 3:
						promptText += "France/Italy";
						break;
					case 4:
						promptText += "UK/US";
						break;
				}
			}
			promptNum(promptText,(a)=>1>a||a>meCandidates.length,clearBackground,(prompted)=>{
				me = meCandidates[prompted-1];
				initialize();
				clearQuotes();
				mainMenu();
			});
		}
	}
}

function powerByNum(num){
	switch(num){
		case 0:
			return "AT";
		case 1:
			return "RU";
		case 2:
			return "DE";
		case 3:
			return "FR";
		case 4:
			return "UK";
	}
}





function cardType(id) {
	let thePower = power;
	if(arguments.length > 1){
		thePower = arguments[1];
	}
	switch (thePower) {
	case "AT":
		if (id >= 39) {
			return "No such card.";
		} else if (id >= 25) {
			return "Event";
		} else if (id >= 21) {
			return "Economic Warfare";
		} else if (id >= 17) {
			return "Status";
		} else if (id >= 13) {
			return "Land Battle";
		} else if (id == 12) {
			return "Sea Battle";
		} else if (id >= 10) {
			return "Build Navy";
		} else if (id >= 1) {
			return "Build Army";
		} else {
			return "No such card.";
		}
	case "RU":
		if (id >= 35) {
			return "No such card.";
		} else if (id >= 22) {
			return "Event";
		} else if (id >= 19) {
			return "Economic Warfare";
		} else if (id == 18) {
			return "Status";
		} else if (id == 17) {
			return "Sea Battle";
		} else if (id >= 15) {
			return "Build Navy";
		} else if (id >= 6) {
			return "Build Army";
		} else if (id >= 1) {
			return "Land Battle";
		} else {
			return "No such card.";
		}
	case "DE":
		if (id >= 54) {
			return "No such card.";
		} else if (id >= 40) {
			return "Event";
		} else if (id >= 30) {
			return "Status";
		} else if (id >= 21) {
			return "Economic Warfare";
		} else if (id >= 19) {
			return "Sea Battle";
		} else if (id >= 10) {
			return "Land Battle";
		} else if (id >= 7) {
			return "Build Navy";
		} else if (id >= 1) {
			return "Build Army";
		} else {
			return "No such card.";
		}
	case "FR":
		if (id >= 43) {
			return "No such card.";
		} else if (id >= 33) {
			return "Event";
		} else if (id >= 24) {
			return "Status";
		} else if (id >= 22) {
			return "Economic Warfare";
		} else if (id >= 20) {
			return "Sea Battle";
		} else if (id >= 15) {
			return "Land Battle";
		} else if (id >= 11) {
			return "Build Navy";
		} else if (id >= 1) {
			return "Build Army";
		} else {
			return "No such card.";
		}
	case "UK":
		if (id >= 50) {
			return "No such card.";
		} else if (id >= 35) {
			return "Event";
		} else if (id >= 27) {
			return "Status";
		} else if (id >= 21) {
			return "Economic Warfare";
		} else if (id >= 17) {
			return "Sea Battle";
		} else if (id >= 12) {
			return "Land Battle";
		} else if (id >= 8) {
			return "Build Navy";
		} else if (id >= 1) {
			return "Build Army";
		} else {
			return "No such card.";
		}
	default:
		return "No such card.";
	}
}

function country(id) {
	let thePower = power;
	if(arguments.length > 1){
		thePower = arguments[1];
	}
	switch (thePower) {
	case "AT":
		switch (id) {
		case 7:
		case 8:
		case 9:
		case 13:
		case 14:
		case 20:
		case 24:
		case 34:
		case 35:
		case 36:
		case 37:
		case 38:
			return "Turkey";
		default:
			return "AH";
		}
	case "FR":
		switch (id) {
		case 7:
		case 8:
		case 9:
		case 10:
		case 13:
		case 14:
		case 19:
		case 21:
		case 32:
		case 40:
		case 41:
		case 42:
			return "Italy";
		default:
			return "France";
		}
	case "UK":
		switch (id) {
		case 5:
		case 6:
		case 7:
		case 10:
		case 11:
		case 15:
		case 16:
		case 20:
		case 26:
		case 34:
		case 47:
		case 48:
		case 49:
			return "US";
		default:
			return "UK";
		}
	default:
		return "";
	}
}

function title(id) {
	let thePower = power;
	if(arguments.length > 1){
		thePower = arguments[1];
	}
	switch (thePower) {
	case "AT":
		switch (id) {
		case 17:
			return "Russian Rail Gauge";
		case 18:
			return "Balkan Domination";
		case 19:
			return "k.u.k. Kriegsmarine";
		case 20:
			return "Limited Rail and Road Network";
		case 21:
			return "Soviets of Petrograd";
		case 22:
			return "The Extravagant Lifestyle of the Aristocracy";
		case 23:
			return "The October Revolution";
		case 24:
			return "Spanish Flu";
		case 25:
			return "Imperial Austrian Landwehr";
		case 26:
			return "Caporetto";
		case 27:
			return "Franz Ferdinand Avenged";
		case 28:
			return "Morava Offensive";
		case 29:
			return "Anti-Venizelists Surrender Fort Roupel";
		case 30:
			return "Bulgaria Joins Central Powers";
		case 31:
			return "Brudermann Orders Cavalry Charge";
		case 32:
			return "Royal Hungarian Honvéd";
		case 33:
			return "Treaty of Amity and Alliance";
		case 34:
			return "I Order You to Die";
		case 35:
			return "Persian Oil";
		case 36:
			return "Ottoman Mobilization";
		case 37:
			return "A Crumbling Empire";
		case 38:
			return "Bombing of the Russian Black Sea Ports";
		default:
			return "";
		}
	case "RU":
		switch (id) {
		case 18:
			return "Warm Water Port";
		case 19:
			return "The Tsar Will Not Help Us";
		case 20:
			return "Assassins of the Black Hand";
		case 21:
			return "Trench Warfare";
		case 22:
			return "Montenegro";
		case 23:
			return "Russia Mobilizes";
		case 24:
			return "Redl Blackmailed";
		case 25:
			return "Cossacks";
		case 26:
			return "Serbia Defies Austrian Ultimatum";
		case 27:
			return "Kerensky Vows to Continue War";
		case 28:
			return "Scottish Women's Hospitals";
		case 29:
			return "Peace, Bread, Land";
		case 30:
			return "Brusilov Offensive";
		case 31:
			return "East Prussian Offensive";
		case 32:
			return "Grand Duke Nicholas Nikolaevich Appointed Viceroy";
		case 33:
			return "Rasputin";
		case 34:
			return "Serbia, Russia's Ally";
		default:
			return "";
		}
	case "DE":
		switch (id) {
		case 21:
			return "Unrestricted Submarine Warfare";
		case 22:
			return "French Army Mutinies";
		case 23:
			return "Von Lettow-Vorbeck's East African Army";
		case 24:
			return "Mata Hari";
		case 25:
			return "Zeppelins";
		case 26:
			return "The Christmas Truce";
		case 27:
			return "Prize Rules Submarine Warfare";
		case 28:
			return "Surface Raiders";
		case 29:
			return "Third OHL";
		case 30:
			return "Easter Rising of Ireland";
		case 31:
			return "German Aid in the East";
		case 32:
			return "Mustard Gas";
		case 33:
			return "Stosstruppen";
		case 34:
			return "Tripled Trench Lines";
		case 35:
			return "German High Seas Fleet";
		case 36:
			return "Big Bertha Railway Guns";
		case 37:
			return "Rumpler Taube Air Reconnaissance";
		case 38:
			return "Woe to Them That Yet Draw Sword Against Me";
		case 39:
			return "The Red Baron";
		case 40:
			return "Moltke the Younger Mobilizes Western Advance";
		case 41:
			return "Prussian Military Tradition";
		case 42:
			return "Kaiserschlacht";
		case 43:
			return "Jutland";
		case 44:
			return "Schlieffen Plan";
		case 45:
			return "Ninth Army Formed to Defend East Prussia";
		case 46:
			return "Tannenberg";
		case 47:
			return "Weltpolitik Drives Military Expansion";
		case 48:
			return "Landsturm";
		case 49:
			return "Volunteer Movement";
		case 50:
			return "Landwehr";
		case 51:
			return "A Place in the Sun";
		case 52:
			return "Hindenburg Line";
		case 53:
			return "Gorlice-Tarnów Offensive";
		default:
			return "";
		}
	case "FR":
		switch (id) {
		case 22:
			return "Francs-tireurs";
		case 23:
			return "Armée d'Afrique";
		case 24:
			return "La Revanche";
		case 25:
			return "Verdun";
		case 26:
			return "General Nivelle's Creeping Barrage";
		case 27:
			return "Renault FT Tanks";
		case 28:
			return "Barès Expands Armée de l'Air";
		case 29:
			return "Troupes Coloniales";
		case 30:
			return "Citizen-Soldiers";
		case 31:
			return "Marne";
		case 32:
			return "Alpini";
		case 33:
			return "King Ferdinand Reorganizes Romanian Army";
		case 34:
			return "Paris Taxis";
		case 35:
			return "Romanians Advance in Transylvania";
		case 36:
			return "Alsace-Lorraine";
		case 37:
			return "Romania Joins Entente";
		case 38:
			return "France Mobilizes";
		case 39:
			return "Plan XVII";
		case 40:
			return "The Sunny Days of May";
		case 41:
			return "Isonzo River Offensives";
		case 42:
			return "Bersaglieri";
		default:
			return "";
		}
	case "UK":
		switch (id) {
		case 21:
			return "Lawrence Foments Arab Revolts";
		case 22:
			return "United Kingdom Seizes German Colonies in Africa";
		case 23:
			return "Japan Attacks German Enclaves at Tsingtao";
		case 24:
			return "The Blockade of Europe";
		case 25:
			return "Sidney Reilly";
		case 26:
			return "The Sinking of the Lusitania";
		case 27:
			return "The Pals Battalions";
		case 28:
			return "Commonwealth Support";
		case 29:
			return "Relied on For Any Enterprise";
		case 30:
			return "Battlecruisers";
		case 31:
			return "The Girls with Yellow Hands";
		case 32:
			return "Mark IV Tanks";
		case 33:
			return "Dreadnoughts";
		case 34:
			return "Blackjack and the Doughboys";
		case 35:
			return "First Lord of the Admiralty Prepares for War";
		case 36:
			return "Persian Campaign";
		case 37:
			return "Tunnel Mines";
		case 38:
			return "Asquith Sends Ultimatum";
		case 39:
			return "Passchendaele";
		case 40:
			return "Provisional Government of National Defence";
		case 41:
			return "The Grand Fleet";
		case 42:
			return "Gallipoli";
		case 43:
			return "Belgium Resists";
		case 44:
			return "The Somme";
		case 45:
			return "The Royal Navy";
		case 46:
			return "Cambrai";
		case 47:
			return "Eddie Rickenbacker";
		case 48:
			return "American Public Outraged by Zimmermann Telegram";
		case 49:
			return "War Revenue Act";
		default:
			return "";
		}
	default:
		return "";
	}
}

function cardName(id) {
	let thePower = power;
	if(arguments.length > 1){
		thePower = arguments[1];
	}
	let type = cardType(id,thePower);
	let answer = type;
	if (thePower == "AT" || thePower == "FR" || thePower == "UK") {
		answer += " (" + country(id,thePower) + ")";
	}
	if (type === "Event" || type === "Economic Warfare" || type === "Status") {
		answer += ": " + title(id,thePower);
	}
	return answer;
}



function prepareText(id){
	let thePower = power;
	if(arguments.length > 1){
		thePower = arguments[1];
	}
	let type = cardType(id,thePower);
	switch (thePower) {
	case "AT":
		switch (id) {
		case 25:
			return ["VIE","TYR"];
		case 26:
			return provinces.ALP.neighbors.concat(["ALP"]);
		case 27:
			return provinces.SER.neighbors.concat(["SER"]);
		case 29:
			return ["GRE"];
		case 30:
		case 33:
			return ["BUL"];
		case 32:
			return ["BUD","GAL"];
		case 36:
			return provinces.ANA.neighbors.concat(["ANA"]);
		default:
			return "";
		}
	case "RU":
		switch (id) {
		case 22:
		case 34:
			return ["SER"];
		case 23:
		case 27:
			return provinces.MOS.neighbors.concat(["MOS"]);
		case 30:
			return provinces.GAL.neighbors.concat(["GAL"]);
		case 31:
			return provinces.POL.neighbors.concat(["POL"]);
		case 32:
			return provinces.AZE.neighbors.concat(["AZE"]);
		default:
			return "";
		}
	case "DE":
		switch (id) {
		case 35:
			return provinces.NAO.neighbors.concat(["NAO"]);
		case 40:
			return provinces.WGE.neighbors.concat(["WGE"]);
		case 42:
			return provinces.BEL.neighbors.concat(["BEL"]);
		case 43:
			return ["NTH"];
		case 44:
			return ["BEL","PIC","PAR"];
		case 45:
			return provinces.PRU.neighbors.concat(["PRU"]);
		case 48:
		case 49:
			return ["WGE","BER","PRU"];
		case 52:
			return provinces.PIC.neighbors.concat(["PIC"]);
		case 53:
			return provinces.POL.neighbors.concat(["POL"]);
		default:
			return "";
		}
	case "FR":
		switch (id) {
		case 25:
			return ["BUR"];
		case 27:
			return "Clear";
		case 31:
			return ["PIC"];
		case 32:
			return "Difficult";
		case 33:
		case 37:
			return ["RUM"];
		case 34:
		case 38:
			return provinces.PAR.neighbors.concat(["PAR"]);
		case 40:
			return provinces.ROM.neighbors.concat(["ROM"]);
		case 41:
			return provinces.ALP.neighbors.concat(["ALP"]);
		case 42:
			return "Difficult";
		default:
			return "";
		}
	case "UK":
		switch (id) {
		case 32:
			return "Clear";
		case 40:
			return ["GRE"];
		case 42:
			return provinces.ANA.neighbors.concat(["ANA"]);
		case 43:
			return ["BEL"];
		case 44:
		case 46:
			return provinces.PIC.neighbors.concat(["PIC"]);
		default:
			return "";
		}
	default:
		return "";
	}
}

function prepareSymbol(id){
	let thePower = power;
	if(arguments.length > 1){
		thePower = arguments[1];
	}
	let type = cardType(id,thePower);
	switch (type) {
	case "Build Army":
		return "RA";
	case "Build Navy":
		return "RN";
	case "Land Battle":
		return "SLB";
	case "Sea Battle":
		return "SSB";
	}
	switch (thePower) {
	case "AT":
		switch (id) {
		case 17:
		case 18:
		case 20:
		case 22:
		case 28:
		case 35:
		case 38:
			return "ATR";
		case 19:
			return "RN";
		case 21:
		case 23:
			return [0,2,0,0,0];
		case 24:
			return [0,1,0,1,1];
		case 25:
			return "RAx2";
		case 26:
			return "SLBx2";
		case 27:
			return "SLBx2";
		case 29:
			return "RA";
		case 30:
		case 33:
			return "RA";
		case 31:
		case 34:
			return "CA";
		case 32:
			return "RAx2";
		case 36:
			return "RAx2";
		case 37:
			return "RA";
		default:
			return "";
		}
	case "RU":
		switch (id) {
		case 18:
		case 19:
		case 20:
		case 21:
		case 24:
		case 28:
		case 29:
		case 33:
			return "ATR";
		case 22:
		case 34:
			return "RA";
		case 23:
		case 27:
			return "RAx2";
		case 25:
			return "CA";
		case 26:
			return [2,0,0,0,0];
		case 30:
			return "SLB";
		case 31:
			return "SLB";
		case 32:
			return "SLB";
		default:
			return "";
		}
	case "DE":
		switch (id) {
		case 21:
			return [0,0,0,0,3];
		case 22:
			return [0,0,0,2,0];
		case 23:
		case 27:
		case 30:
			return [0,0,0,0,2];
		case 24:
		case 25:
		case 28:
			return [0,0,0,1,1];
		case 26:
		case 31:
		case 32:
		case 36:
		case 37:
		case 39:
			return "ATR";
		case 29:
			return [0,1,0,1,1];
		case 33:
		case 38:
		case 41:
		case 51:
			return "SLBx2";
		case 34:
			return "RAx2";
		case 35:
			return "RNx2";
		case 40:
			return "RAx2";
		case 42:
			return "SLBx2";
		case 43:
			return "SSBx2";
		case 44:
			return "SLBx2";
		case 45:
			return "RAx2";
		case 46:
			return "CA";
		case 47:
			return "RA";
		case 48:
			return "RAx2";
		case 49:
			return "RAx2";
		case 50:
			return "RAx2";
		case 52:
			return "RAx2";
		case 53:
			return "SLBx2";
		default:
			return "";
		}
	case "FR":
		switch (id) {
		case 22:
		case 23:
		case 28:
		case 29:
		case 30:
		case 35:
		case 36:
			return "ATR";
		case 24:
			return "CA";
		case 25:
			return "RAx2";
		case 26:
		case 39:
			return "SLB";
		case 27:
			return "SLBx2";
		case 31:
			return "RAx2";
		case 32:
			return "RAx2";
		case 33:
		case 37:
			return "RA";
		case 34:
		case 38:
			return "RAx2";
		case 40:
			return "RAx2";
		case 41:
			return "SLBx2";
		case 42:
			return "SLB";
		default:
			return "";
		}
	case "UK":
		switch (id) {
		case 21:
			return [2,0,0,0,0];
		case 22:
		case 23:
		case 39:
			return [0,0,2,0,0];
		case 24:
		case 49:
			return [1,0,1,0,0];
		case 25:
		case 26:
		case 27:
		case 28:
		case 31:
		case 36:
		case 37:
		case 38:
		case 47:
			return "ATR";
		case 29:
			return "RA";
		case 30:
			return "SSBx2";
		case 32:
			return "SLBx2";
		case 33:
		case 35:
			return "RNx2";
		case 34:
			return "RAx2";
		case 40:
			return "RA";
		case 41:
			return "RN";
		case 42:
			return "SLBx2";
		case 43:
			return "RA";
		case 44:
		case 46:
			return "SLBx2";
		case 45:
			return "RNx2";
		case 48:
			return "CA";
		default:
			return "";
		}
	default:
		return "";
	}
}

function preparedImage(id) {
	let thePower = power;
	if(arguments.length > 1){
		thePower = arguments[1];
	}
	let type = cardType(id,thePower);
	switch (type) {
	case "Build Army":
		return RA;
	case "Build Navy":
		return RN;
	case "Land Battle":
		return SLB;
	case "Sea Battle":
		return SSB;
	}
	switch (thePower) {
	case "AT":
		switch (id) {
		case 17:
		case 18:
		case 20:
		case 22:
		case 28:
		case 35:
		case 38:
			return ATR;
		case 19:
			return RN;
		case 21:
		case 23:
			return RUS + RUS;
		case 24:
			return RUS + FRI + UKUS;
		case 25:
			return SUP + RA2 + "(VIE/TYR)";
		case 26:
			return SLB2 + "(ALP or adjacent)";
		case 27:
			return SLB2 + "(SER or adjacent)";
		case 29:
			return SUP + RA + "(GRE)";
		case 30:
		case 33:
			return SUP + RA + "(BUL)";
		case 31:
		case 34:
			return CA;
		case 32:
			return SUP + RA2 + "(BUD/GAL)";
		case 36:
			return RA2 + "(ANA or adjacent)";
		case 37:
			return SUP + RA;
		default:
			return "";
		}
	case "RU":
		switch (id) {
		case 18:
		case 19:
		case 20:
		case 21:
		case 24:
		case 28:
		case 29:
		case 33:
			return ATR;
		case 22:
		case 34:
			return SUP + RA + "(SER)";
		case 23:
		case 27:
			return RA2 + "(MOS or adjacent)";
		case 25:
			return CA;
		case 26:
			return AHT + AHT;
		case 30:
			return SLB + "(GAL or adjacent)";
		case 31:
			return SLB + "(POL or adjacent)";
		case 32:
			return SLB + "(AZE or adjacent)";
		default:
			return "";
		}
	case "DE":
		switch (id) {
		case 21:
			return UKUS + UKUS + UKUS;
		case 22:
			return FRI + FRI;
		case 23:
		case 27:
		case 30:
			return UKUS + UKUS;
		case 24:
		case 25:
		case 28:
			return FRI + UKUS;
		case 26:
		case 31:
		case 32:
		case 36:
		case 37:
		case 39:
			return ATR;
		case 29:
			return RUS + FRI + UKUS;
		case 33:
		case 38:
		case 41:
		case 51:
			return SLB2;
		case 34:
			return RA2;
		case 35:
			return RN2 + "(NAO or adjacent)";
		case 40:
			return RA2 + "(WGE or adjacent)";
		case 42:
			return SLB2 + "(BEL or adjacent)";
		case 43:
			return SSB2 + "(NTH)";
		case 44:
			return SLB2 + "(BEL/PIC/PAR)";
		case 45:
			return RA2 + "(PRU or adjacent)";
		case 46:
			return CA;
		case 47:
			return SUP + RA;
		case 48:
			return SUP + RA2 + "(WGE/BER/PRU)";
		case 49:
			return RA2 + "(WGE/BER/PRU)";
		case 50:
			return SUP + RA2;
		case 52:
			return RA2 + "(PIC or adjacent)";
		case 53:
			return SLB2 + "(POL or adjacent)";
		default:
			return "";
		}
	case "FR":
		switch (id) {
		case 22:
		case 23:
		case 28:
		case 29:
		case 30:
		case 35:
		case 36:
			return ATR;
		case 24:
			return CA;
		case 25:
			return RA2 + "(BUR)";
		case 26:
		case 39:
			return SLB;
		case 27:
			return SLB2 + "(Clear Terrain)";
		case 31:
			return RA2 + "(PIC)";
		case 32:
			return RA2 + "(Difficult Terrain)";
		case 33:
		case 37:
			return SUP + RA + "(RUM)";
		case 34:
		case 38:
			return RA2 + "(PAR or adjacent)";
		case 40:
			return RA2 + "(ROM or adjacent)";
		case 41:
			return SLB2 + "(ALP or adjacent)";
		case 42:
			return SLB + "(Difficult Terrain)";
		default:
			return "";
		}
	case "UK":
		switch (id) {
		case 21:
			return AHT + AHT;
		case 22:
		case 23:
		case 39:
			return GER + GER;
		case 24:
		case 49:
			return GER + AHT;
		case 25:
		case 26:
		case 27:
		case 28:
		case 31:
		case 36:
		case 37:
		case 38:
		case 47:
			return ATR;
		case 29:
			return SUP + RA;
		case 30:
			return SSB2;
		case 32:
			return SLB2 + "(Clear Terrain)";
		case 33:
		case 35:
			return RN2;
		case 34:
			return RA2;
		case 40:
			return SUP + RA + "(GRE)";
		case 41:
			return RN;
		case 42:
			return SLB2 + "(ANA or adjacent)";
		case 43:
			return SUP + RA + "(BEL)";
		case 44:
		case 46:
			return SLB2 + "PIC or adjacent";
		case 45:
			return SUP + RN2;
		case 48:
			return CA;
		default:
			return "";
		}
	default:
		return "";
	}
}

function preparedText(id) {
	let thePower = power;
	if(arguments.length > 1){
		thePower = arguments[1];
	}
	let type = cardType(id,thePower);
	switch (type) {
	case "Build Army":
		return "RA";
	case "Build Navy":
		return "RN";
	case "Land Battle":
		return "SLB";
	case "Sea Battle":
		return "SSB";
	}
	switch (thePower) {
	case "AT":
		switch (id) {
		case 17:
		case 18:
		case 20:
		case 22:
		case 28:
		case 35:
		case 38:
			return "ATR";
		case 19:
			return "RN";
		case 21:
		case 23:
			return "2 x RUS";
		case 24:
			return "RUS + FR/I + UK/US";
		case 25:
			return "(SUP) RAx2 (VIE/TYR)";
		case 26:
			return "SLBx2 (ALP or adjacent)";
		case 27:
			return "SLBx2 (SER or adjacent)";
		case 29:
			return "(SUP) RA (GRE)";
		case 30:
		case 33:
			return "(SUP) RA (BUL)";
		case 31:
		case 34:
			return "CA";
		case 32:
			return "SUP RAx2 (BUD/GAL)";
		case 36:
			return "RAx2 (ANA or adjacent)";
		case 37:
			return "(SUP) RA";
		default:
			return "";
		}
	case "RU":
		switch (id) {
		case 18:
		case 19:
		case 20:
		case 21:
		case 24:
		case 28:
		case 29:
		case 33:
			return "ATR";
		case 22:
		case 34:
			return "(SUP) RA (SER)";
		case 23:
		case 27:
			return "RAx2 (MOS or adjacent)";
		case 25:
			return "CA";
		case 26:
			return "2 x AH/T";
		case 30:
			return "SLB (GAL or adjacent)";
		case 31:
			return "SLB (POL or adjacent)";
		case 32:
			return "SLB (AZE or adjacent)";
		default:
			return "";
		}
	case "DE":
		switch (id) {
		case 21:
			return "3 x UK/US";
		case 22:
			return "2 x FR/I";
		case 23:
		case 27:
		case 30:
			return "2 x UK/US";
		case 24:
		case 25:
		case 28:
			return "FR/I + UK/US";
		case 26:
		case 31:
		case 32:
		case 36:
		case 37:
		case 39:
			return "ATR";
		case 29:
			return "RUS + FR/I + UK/US";
		case 33:
		case 38:
		case 41:
		case 51:
			return "SLBx2";
		case 34:
			return "RAx2";
		case 35:
			return "RNx2 (NAO or adjacent)";
		case 40:
			return "RAx2 (WGE or adjacent)";
		case 42:
			return "SLBx2 (BEL or adjacent)";
		case 43:
			return "SSBx2 (NTH)";
		case 44:
			return "SLBx2 (BEL/PIC/PAR)";
		case 45:
			return "RAx2 (PRU or adjacent)";
		case 46:
			return "CA";
		case 47:
			return "(SUP) RA";
		case 48:
			return "(SUP) RAx2 (WGE/BER/PRU)";
		case 49:
			return "RAx2 (WGE/BER/PRU)";
		case 50:
			return "(SUP) RAx2";
		case 52:
			return "RAx2 (PIC or adjacent)";
		case 53:
			return "SLBx2 (POL or adjacent)";
		default:
			return "";
		}
	case "FR":
		switch (id) {
		case 22:
		case 23:
		case 28:
		case 29:
		case 30:
		case 35:
		case 36:
			return "ATR";
		case 24:
			return "CA";
		case 25:
			return "RAx2 (BUR)";
		case 26:
		case 39:
			return "SLB";
		case 27:
			return "SLBx2 (Clear Terrain)";
		case 31:
			return "RAx2 (PIC)";
		case 32:
			return "RAx2 (Difficult Terrain)";
		case 33:
		case 37:
			return "(SUP) RA (RUM)";
		case 34:
		case 38:
			return "RAx2 (PAR or adjacent)";
		case 40:
			return "RAx2 (ROM or adjacent)";
		case 41:
			return "SLBx2 (ALP or adjacent)";
		case 42:
			return "SLB (Difficult Terrain)";
		default:
			return "";
		}
	case "UK":
		switch (id) {
		case 21:
			return "2 x AHT";
		case 22:
		case 23:
		case 39:
			return "2 x GER";
		case 24:
		case 49:
			return "GER + AH/T";
		case 25:
		case 26:
		case 27:
		case 28:
		case 31:
		case 36:
		case 37:
		case 38:
		case 47:
			return "ATR";
		case 29:
			return "(SUP) RA";
		case 30:
			return "SSBx2";
		case 32:
			return "SLBx2 (Clear Terrain)";
		case 33:
		case 35:
			return "RNx2";
		case 34:
			return "RAx2";
		case 40:
			return "(SUP) RA (GRE)";
		case 41:
			return "RN";
		case 42:
			return "SLBx2 (ANA or adjacent)";
		case 43:
			return "(SUP) RA (BEL)";
		case 44:
		case 46:
			return "SLBx2 (PIC or adjacent)";
		case 45:
			return "(SUP) RNx2";
		case 48:
			return "CA";
		default:
			return "";
		}
	default:
		return "";
	}
}

function preparedIMG(id) {
	let thePower = power;
	if(arguments.length > 1){
		thePower = arguments[1];
	}
	let wrap = (url)=>lb+'img src="'+url+'">';
	let RA = wrap("https://cf.geekdo-images.com/original/img/j69IhytdjhGr8rKMwmabfm_1pdU=/0x0/pic3679104.png");
	let RA2 = wrap("https://cf.geekdo-images.com/original/img/qW3MgjzjNkDdlsTMU4lw9AgP7Ks=/0x0/pic3679102.png");
	let RN = wrap("https://cf.geekdo-images.com/original/img/90X4SKwxlGG08itjGgz0XRn6qUk=/0x0/pic3679107.png");
	let RN2 = wrap("https://cf.geekdo-images.com/original/img/KMMJ9q1AzOlnGEa4A7hj4rP35CE=/0x0/pic3679109.png");
	let SLB = wrap("https://cf.geekdo-images.com/original/img/tc5Y4dV-w3PnKvqmZMMdgX6cfIY=/0x0/pic3679111.png");
	let SLB2 = wrap("https://cf.geekdo-images.com/original/img/5bTRoAWlltw9Iq0BqHQbvXbdX-w=/0x0/pic3679114.png");
	let SSB = wrap("https://cf.geekdo-images.com/original/img/Lhk05MgD3AfMk8rb1Yylmdm6xnY=/0x0/pic3679116.png");
	let SSB2 = wrap("https://cf.geekdo-images.com/original/img/bzfLXwpV7lf5F782o7phJNPcWBs=/0x0/pic3679117.png");
	let CA = wrap("https://cf.geekdo-images.com/original/img/h1hR6u0_07tO2nEy9ehgrnDc-ic=/0x0/pic3679118.png");
	let ATR = wrap("https://cf.geekdo-images.com/original/img/HW9S_a1dJppnGAeDVYkxs6t_zsY=/0x0/pic3679121.png");
	let AHT = wrap("https://cf.geekdo-images.com/original/img/33UjFcuvqn6Kb6lv5Yj_BO8DP-w=/0x0/pic3679127.png");
	let RUS = wrap("https://cf.geekdo-images.com/original/img/cIg67yqv748Whq7WVlhNB747xi8=/0x0/pic3679131.png");
	let GER = wrap("https://cf.geekdo-images.com/original/img/pciAYTOApK87W2MqOyfSybnc6tI=/0x0/pic3679133.png");
	let FRI = wrap("https://cf.geekdo-images.com/original/img/pU8641Jf4tpus0puv0EMo6qCVzY=/0x0/pic3679135.png");
	let UKUS = wrap("https://cf.geekdo-images.com/original/img/UybL134HKI48FMrUd7bGKBRPLXk=/0x0/pic3679137.png");
	let SUP = wrap("https://cf.geekdo-images.com/original/img/a-aGOhajYxKRwWgrBsFgZ5COM7A=/0x0/pic3679198.png");

	let type = cardType(id,thePower);
	switch (type) {
	case "Build Army":
		return RA;
	case "Build Navy":
		return RN;
	case "Land Battle":
		return SLB;
	case "Sea Battle":
		return SSB;
	}
	switch (thePower) {
	case "AT":
		switch (id) {
		case 17:
		case 18:
		case 20:
		case 22:
		case 28:
		case 35:
		case 38:
			return ATR;
		case 19:
			return RN;
		case 21:
		case 23:
			return RUS + RUS;
		case 24:
			return RUS + FRI + UKUS;
		case 25:
			return SUP + RA2 + "(VIE/TYR)";
		case 26:
			return SLB2 + "(ALP or adjacent)";
		case 27:
			return SLB2 + "(SER or adjacent)";
		case 29:
			return SUP + RA + "(GRE)";
		case 30:
		case 33:
			return SUP + RA + "(BUL)";
		case 31:
		case 34:
			return CA;
		case 32:
			return SUP + RA2 + "(BUD/GAL)";
		case 36:
			return RA2 + "(ANA or adjacent)";
		case 37:
			return SUP + RA;
		default:
			return "";
		}
	case "RU":
		switch (id) {
		case 18:
		case 19:
		case 20:
		case 21:
		case 24:
		case 28:
		case 29:
		case 33:
			return ATR;
		case 22:
		case 34:
			return SUP + RA + "(SER)";
		case 23:
		case 27:
			return RA2 + "(MOS or adjacent)";
		case 25:
			return CA;
		case 26:
			return AHT + AHT;
		case 30:
			return SLB + "(GAL or adjacent)";
		case 31:
			return SLB + "(POL or adjacent)";
		case 32:
			return SLB + "(AZE or adjacent)";
		default:
			return "";
		}
	case "DE":
		switch (id) {
		case 21:
			return UKUS + UKUS + UKUS;
		case 22:
			return FRI + FRI;
		case 23:
		case 27:
		case 30:
			return UKUS + UKUS;
		case 24:
		case 25:
		case 28:
			return FRI + UKUS;
		case 26:
		case 31:
		case 32:
		case 36:
		case 37:
		case 39:
			return ATR;
		case 29:
			return RUS + FRI + UKUS;
		case 33:
		case 38:
		case 41:
		case 51:
			return SLB2;
		case 34:
			return RA2;
		case 35:
			return RN2 + "(NAO or adjacent)";
		case 40:
			return RA2 + "(WGE or adjacent)";
		case 42:
			return SLB2 + "(BEL or adjacent)";
		case 43:
			return SSB2 + "(NTH)";
		case 44:
			return SLB2 + "(BEL/PIC/PAR)";
		case 45:
			return RA2 + "(PRU or adjacent)";
		case 46:
			return CA;
		case 47:
			return SUP + RA;
		case 48:
			return SUP + RA2 + "(WGE/BER/PRU)";
		case 49:
			return RA2 + "(WGE/BER/PRU)";
		case 50:
			return SUP + RA2;
		case 52:
			return RA2 + "(PIC or adjacent)";
		case 53:
			return SLB2 + "(POL or adjacent)";
		default:
			return "";
		}
	case "FR":
		switch (id) {
		case 22:
		case 23:
		case 28:
		case 29:
		case 30:
		case 35:
		case 36:
			return ATR;
		case 24:
			return CA;
		case 25:
			return RA2 + "(BUR)";
		case 26:
		case 39:
			return SLB;
		case 27:
			return SLB2 + "(Clear Terrain)";
		case 31:
			return RA2 + "(PIC)";
		case 32:
			return RA2 + "(Difficult Terrain)";
		case 33:
		case 37:
			return SUP + RA + "(RUM)";
		case 34:
		case 38:
			return RA2 + "(PAR or adjacent)";
		case 40:
			return RA2 + "(ROM or adjacent)";
		case 41:
			return SLB2 + "(ALP or adjacent)";
		case 42:
			return SLB + "(Difficult Terrain)";
		default:
			return "";
		}
	case "UK":
		switch (id) {
		case 21:
			return AHT + AHT;
		case 22:
		case 23:
		case 39:
			return GER + GER;
		case 24:
		case 49:
			return GER + AHT;
		case 25:
		case 26:
		case 27:
		case 28:
		case 31:
		case 36:
		case 37:
		case 38:
		case 47:
			return ATR;
		case 29:
			return SUP + RA;
		case 30:
			return SSB2;
		case 32:
			return SLB2 + "(Clear Terrain)";
		case 33:
		case 35:
			return RN2;
		case 34:
			return RA2;
		case 40:
			return SUP + RA + "(GRE)";
		case 41:
			return RN;
		case 42:
			return SLB2 + "(ANA or adjacent)";
		case 43:
			return SUP + RA + "(BEL)";
		case 44:
		case 46:
			return SLB2 + "PIC or adjacent";
		case 45:
			return SUP + RN2;
		case 48:
			return CA;
		default:
			return "";
		}
	default:
		return "";
	}
}


function cardImage(id) {
	let thePower = power;
	if(arguments.length > 1){
		thePower = arguments[1];
	}
	return cardName(id,thePower) + " | " + preparedImage(id,thePower);
}

function cardText(id) {
	let thePower = power;
	if(arguments.length > 1){
		thePower = arguments[1];
	}
	if(0 > me || me > 5 || z.promptStyle[me] !== 1){
		return cardName(id,thePower) + " | " + preparedText(id,thePower);
	} else {
		return cardName(id,thePower) + " | " + preparedIMG(id,thePower);
	}
}

function compare(a, b) {
	if( a === b){
		return 0;
	}
	if(a > b){
		return 1;
	}
	return -1;
}

function isAttrition(id){
	let prep = prepareSymbol(id);
	return prep === "ATR" || Array.isArray(prep);
}

function removeOption(opt){
	let num = me;
	if(arguments.length > 1){
		num = arguments[1];
	}
	for(let j = 0; !(j>=z.options[num].length); j++){
		if(z.options[num][j] === opt){
			z.options[num].splice(j,1);
			j--;
		}
	}
}

function canAttrition(){
	/* RULES: country of attrition card matters? */
	for(let j = 0; !(j>=z.prepared[me].length); j++){
		if(Array.isArray(prepareSymbol(z.prepared[me][j]))){
			return true;
		}
	}
	let country1 = "";
	let country2 = "";
	switch(me){
		case 0:
			country1 = "AH";
			country2 = "Turkey";
			break;
		case 1:
			country1 = "Russia";
			break;
		case 2:
			country1 = "Germany";
			break;
		case 3:
			country1 = "France";
			country2 = "Italy";
			break;
		case 4:
			country1 = "UK";
			country2 = "US";
	}
	let canCountry1 = false;
	let canCountry2 = false;
	for(let j = 0; !canCountry1 && !(j>=z.countries[country1].armies.length); j++){
		if(z.countries[country1].armies[j] === ""){
			continue;
		}
		for(let x in z.countries){
			if(z.countries[x].entente === !z.countries[country1].entente){
				for(let k = 0; !canCountry1 && !(k>=z.countries[x].armies.length); k++){
					if(z.countries[country1].armies[j] != "" && provinces[z.countries[country1].armies[j]].neighbors.includes(z.countries[x].armies[k])){
						canCountry1 = true;
					}
				}
			}
		}
	}
	for(let j = 0; country2 !== "" && !canCountry2 && !(j>=z.countries[country2].armies.length); j++){
		if(z.countries[country2].armies[j] === ""){
			continue;
		}
		for(let x in z.countries){
			if(z.countries[x].entente === !z.countries[country2].entente){
				for(let k = 0; !canCountry2 && !(k>=z.countries[x].armies.length); k++){
					if(z.countries[country2].armies[j] != "" && provinces[z.countries[country2].armies[j]].neighbors.includes(z.countries[x].armies[k])){
						canCountry2 = true;
					}
				}
			}
		}
	}
	if(!canCountry1 && !canCountry2){
		return false;
	}
	let has = false;
	for(let j = 0; !(j>=z.prepared[me].length); j++){
		if(isAttrition(z.prepared[me][j])){
			if(Array.isArray(prepareSymbol(z.prepared[me][j]))){
				return true;
			} else if(me === 1 || me === 2){
				return true;
			} else {
				switch(country(z.prepared[me][j])){
					case "AH":
					case "France":
					case "UK":
						if(canCountry1){
							return true;
						}
						break;
					case "Turkey":
					case "Italy":
					case "US":
						if(canCountry2){
							return true;
						}
				}
			}
		}
	}
	/* Relied on for Any Enterprise */
	if(me === 4 && z.statuses[me].includes(29) && canCountry1){
		for(let j = 0; !(j >= z.prepared[me].length); j++){
			if(country(z.prepared[me][j]) === "UK"){
				return true;
			}
		}
	}
	return false;
}

function drawCards(){
	return new Promise((resolve,reject)=>{
		let promptText =
		"How many cards would you like to draw? (1-" +
		Math.min(7 - z.hands[me].length, z.drawDecks[me].length) +
		")";
		promptNum(promptText,(a)=>1>a||a>Math.min(7 - z.hands[me].length, z.drawDecks[me].length),reject,(numDraw)=>{
			for (let i = 0; !(i >= numDraw); i++) {
				z.hands[me].push(z.drawDecks[me].shift());
			}
			let alertText = "Drew the following cards to hand:\n\n";
			for (let i = 1; !(i > numDraw); i++) {
				alertText += cardText(z.hands[me][z.hands[me].length - i]) + "\n";
			}
			alertText += "You now have " + z.hands[me].length + " cards in hand.";
			addAlert(alertText);
			t.value += bold("Drawing " + numDraw + " cards to hand") +" (now " +z.hands[me].length +" cards in hand).\r\n";
			resolve();
		},Math.min(7-z.hands[me].length,z.drawDecks[me].length));
	});
}

function playAttrition(){
	return new Promise((resolve,reject)=>{
		let country1 = "";
		let country2 = "";
		switch(me){
			case 0:
				country1 = "AH";
				country2 = "Turkey";
				break;
			case 1:
				country1 = "Russia";
				break;
			case 2:
				country1 = "Germany";
				break;
			case 3:
				country1 = "France";
				country2 = "Italy";
				break;
			case 4:
				country1 = "UK";
				country2 = "US";
		}
		let country1Targets = [];
		let country2Targets = [];
		for(let j = 0; !(j>=z.countries[country1].armies.length); j++){
			if(z.countries[country1].armies[j] === ""){
				continue;
			}
			for(let x in z.countries){
				if(z.countries[x].entente === !z.countries[country1].entente){
					for(let k = 0; !(k>=z.countries[x].armies.length); k++){
						if(z.countries[country1].armies[j] !== "" && provinces[z.countries[country1].armies[j]].neighbors.includes(z.countries[x].armies[k])){
							let pow = z.countries[x].power;
							
							if(!country1Targets.includes(pow)){
								country1Targets.push(pow);
							}
							break;
						}
					}
				}
			}
		}
		for(let j = 0; country2 !== "" && !(j>=z.countries[country2].armies.length); j++){
			if(z.countries[country2].armies[j] === ""){
				continue;
			}
			for(let x in z.countries){
				if(z.countries[x].entente === !z.countries[country2].entente){
					for(let k = 0; !(k>=z.countries[x].armies.length); k++){
						if(z.countries[country2].armies[j] != "" && provinces[z.countries[country2].armies[j]].neighbors.includes(z.countries[x].armies[k])){
							let pow = z.countries[x].power;
							
							if(!country2Targets.includes(pow)){
								country2Targets.push(pow);
							}
							break;
						}
					}
				}
			}
		}
		let cards = [];
		for(let j = 0; !(j>=z.prepared[me].length); j++){
			if(isAttrition(z.prepared[me][j])){
				if(Array.isArray(prepareSymbol(z.prepared[me][j]))){
					cards.push(z.prepared[me][j]);
				} else if(me === 1 || me === 2){
					cards.push(z.prepared[me][j]);
				} else {
					switch(country(z.prepared[me][j])){
						case "AH":
						case "France":
						case "UK":
							if(country1Targets.length > 0){
								cards.push(z.prepared[me][j]);
							}
							break;
						case "Turkey":
						case "Italy":
						case "US":
							if(country2Targets.length > 0){
								cards.push(z.prepared[me][j]);
							}
					}
				}
			}
		}
		/* Relied on for Any Enterprise */
		if(me === 4 && z.statuses[me].includes(29) && country1Targets.length > 0){
			for(let j = 0; !(j >= z.prepared[me].length); j++){
				if(country(z.prepared[me][j]) === "UK" && prepareSymbol(z.prepared[me][j]) !== "ATR" && !Array.isArray(prepareSymbol(z.prepared[me][j]))){
					cards.push(z.prepared[me][j]);
				}
			}
		}
		let promptText = "Which prepared Attrition card would you like to use? (1-"+cards.length+")";
		for(let j = 0; !(j>=cards.length); j++){
			promptText += "\n"+(j+1)+": "+cardText(cards[j]);
		}
		promptNum(promptText,(a)=>1>a||a>cards.length,reject,(prompted)=>{
			let card = cards[prompted-1];
			if (Array.isArray(prepareSymbol(card))){
				let alertText = "";
				for(let j = 0; !(j>=5); j++){
					z.attrition[j]+=prepareSymbol(card)[j];
				}
				z.upDiscards[me].unshift(card);
				z.prepared[me].splice(z.prepared[me].indexOf(card),1);
				t.value += bold("Playing prepared card: "+cardImage(card)+" (for Attrition).")+"\r\n";
				addAlert("You play "+cardText(card)+" for Attrition.");
				resolve();
			} else {
				let countryTargets = country1Targets;
				if(country2Targets.length > 0 && country(card) === country2){
					countryTargets = country2Targets;
				}
				let promptText = "Which power would you like to target? (1-"+countryTargets.length+")";
				for(let j = 0; !(j>=countryTargets.length); j++){
					promptText += "\n"+(j+1)+": "+countryTargets[j];
				}
				promptNum(promptText,(a)=>1>a||a>countryTargets.length,reject,(prompted)=>{
					z.attrition[powerNum(countryTargets[prompted-1])]++;
					z.upDiscards[me].unshift(card);
					z.prepared[me].splice(z.prepared[me].indexOf(card),1);
					if(prepareSymbol(card) !== "ATR"){
						t.value += bold("Using Relied on for Any Enterprise to play prepared card: "+cardImage(card)+" for 1 Attrition against "+countryTargets[prompted-1]+".")+"\r\n";
					} else {
						t.value += bold("Playing prepared card: "+cardImage(card)+" for 1 Attrition against "+countryTargets[prompted-1]+".")+"\r\n";
					}
					addAlert("You play "+cardText(card)+" for 1 Attrition against "+countryTargets[prompted-1]+".");
					resolve();
				});
			}
		});

	});
}

function hasStatusInHand(ukonly){
	let has = false;
	for(let j = 0; !(j>=z.hands[me].length); j++){
		if(cardType(z.hands[me][j]) === "Status"){
			if(ukonly && country(z.hands[me][j]) === "US"){
				continue;
			}
			return true;
		}
	}
	return false;
}

function hasEconomicWarfareInHand(){
	let has = false;
	for(let j = 0; !(j>=z.hands[me].length); j++){
		if(cardType(z.hands[me][j]) === "Economic Warfare"){
			return true;
		}
	}
	return false;
}

function canCommonwealthSupport(){
	if(!z.statuses[me].includes(28)){
		return false;
	}
	let hasBuildArmy = false;
	for(let j = 0; !hasBuildArmy && !(j>=z.hands[me].length); j++){
		hasBuildArmy = cardName(z.hands[me][j]) === "Build Army (UK)";
	}
	if(!hasBuildArmy){
		return false;
	}
	let c = 0;
	for(let j = 0; !(j>=5); j++){
		if(z.countries.UK.navies[j] !== ""){
			c++;
		}
	}
	return c>= 3;	
}

function canUnrestrictedSubmarineWarfare(){
	for(let j = 0; !(j>=z.hands[me].length); j++){
		if(cardName(z.hands[me][j]) === "Sea Battle"){
			return true;
		}
	}
	return false;
}

function canGirlsWithYellowHands(){
	if(!z.statuses[me].includes(31)){
		return false;
	}
	let hasBuildArmy = false;
	for(let j = 0; !hasBuildArmy && !(j>=z.hands[me].length); j++){
		hasBuildArmy = cardName(z.hands[me][j]) === "Land Battle (UK)";
	}
	if(!hasBuildArmy){
		return false;
	}
	let c = 0;
	for(let j = 0; !(j>=5); j++){
		if(z.countries.UK.navies[j] !== ""){
			c++;
		}
	}
	return c>= 3;	
}

function canRemovePiece(){
	switch(me){
		case 0:
			for(let j = 0; !(j>=z.countries.AH.armies.length); j++){
				if(z.countries.AH.armies[j] !== ""){
					return true;
				}
			}
			for(let j = 0; !(j>=z.countries.Turkey.armies.length); j++){
				if(z.countries.Turkey.armies[j] !== ""){
					return true;
				}
			}
			return z.countries.AH.navies[0] !== "";
		case 1:
			for(let j = 0; !(j>=z.countries.Russia.armies.length); j++){
				if(z.countries.Russia.armies[j] !== ""){
					return true;
				}
			}
			for(let j = 0; !(j>=z.countries.Russia.navies.length); j++){
				if(z.countries.Russia.navies[j] !== ""){
					return true;
				}
			}
			return false;
		case 2:
			for(let j = 0; !(j>=z.countries.Germany.armies.length); j++){
				if(z.countries.Germany.armies[j] !== ""){
					return true;
				}
			}
			for(let j = 0; !(j>=z.countries.Germany.navies.length); j++){
				if(z.countries.Germany.navies[j] !== ""){
					return true;
				}
			}
			return false;
		case 3:
			for(let j = 0; !(j>=z.countries.France.armies.length); j++){
				if(z.countries.France.armies[j] !== ""){
					return true;
				}
			}
			for(let j = 0; !(j>=z.countries.France.navies.length); j++){
				if(z.countries.France.navies[j] !== ""){
					return true;
				}
			}
			for(let j = 0; !(j>=z.countries.Italy.armies.length); j++){
				if(z.countries.Italy.armies[j] !== ""){
					return true;
				}
			}
			return z.countries.Italy.navies[0] !== "";
		case 4:
			for(let j = 0; !(j>=z.countries.UK.armies.length); j++){
				if(z.countries.UK.armies[j] !== ""){
					return true;
				}
			}
			for(let j = 0; !(j>=z.countries.UK.navies.length); j++){
				if(z.countries.UK.navies[j] !== ""){
					return true;
				}
			}
			for(let j = 0; !(j>=z.countries.US.armies.length); j++){
				if(z.countries.US.armies[j] !== ""){
					return true;
				}
			}
			for(let j = 0; !(j>=z.countries.US.navies.length); j++){
				if(z.countries.US.navies[j] !== ""){
					return true;
				}
			}
			return false;
	}
}

function armyAvailable(country2){
	for(let j = 0; !(j>=z.countries[country2].armies.length); j++){
		if(z.countries[country2].armies[j] === ""){
			return true;
		}
	}
	return false;
}

function navyAvailable(country2){
	for(let j = 0; !(j>=z.countries[country2].navies.length); j++){
		if(z.countries[country2].navies[j] === ""){
			return true;
		}
	}
	return false;
}

function playCard(id){
	let position = z.hands[me].indexOf(id);
	addAlert("Playing " + cardText(z.hands[me][position]));
	t.value =
	t.value +
	bold("Playing " + cardImage(z.hands[me][position])) +
	"\r\n";
	if (cardType(z.hands[me][position]) === "Status") {
		z.statuses[me].push(z.hands[me][position]);
		if(title(z.hands[me][position]) === "Easter Rising of Ireland"){
			z.attrition[4] += 3;
			t.value += UKUS + UKUS + UKUS + "\r\n";
			addAlert("UK/US is hit for 3 cards of attrition.");
			modifyCP(1);
		}
		z.hands[me].splice(position, 1);
		return undefined;
	} 
	z.upDiscards[me].unshift(z.hands[me][position]);
	z.hands[me].splice(position, 1);
	let type = cardType(z.upDiscards[me][0]);
	let country2 = country(z.upDiscards[me][0]);
	if(type === "Build Army"){
		if(me === 1 || me === 2){
			z.options[me].unshift("Build an Army");
		} else if(country2 === "AH"){
			z.options[me].unshift("Build an AH Army");
		} else if (country2 === "Turkey"){
			z.options[me].unshift("Build a Turkish Army");
		} else if (country2 === "France"){
			z.options[me].unshift("Build a French Army");
		} else if (country2 === "Italy"){
			z.options[me].unshift("Build an Italian Army");
		} else if (country2 === "UK") {
			z.options[me].unshift("Build a UK Army");
			/*if(z.statuses[me].includes(28)){
				let c = 0;
				for(let j = 0; !(j>=z.countries.UK.navies.length); j++){
					if(z.countries.UK.navies[j] !== ""){
						c++;
					}
				}
				if(c >= 3){
					t.value += "Keeping the UK Build Army card due to Commonwealth Support.\r\n";
					addAlert("You keep the UK Build Army card due to Commonwealth Support.");
					z.hands[me].push(z.upDiscards[me].shift());
				}
			}*/
		} else if (country2 === "US"){
			z.options[me].unshift("Build a US Army");
		}
		return undefined;
	}
	if(type === "Build Navy"){
		if(me === 1 || me === 2){
			z.options[me].unshift("Build a Navy");
		} else if(country2 === "AH"){
			z.options[me].unshift("Build an AH Navy");
		} else if (country2 === "France"){
			z.options[me].unshift("Build a French Navy");
		} else if (country2 === "Italy"){
			z.options[me].unshift("Build an Italian Navy");
		} else {
			z.options[me].unshift("Build a "+country2+" Navy");
		}
		return undefined;
	}
	if(type === "Land Battle"){
		
		if(country2 === "UK" && z.statuses[me].includes(32)){
			z.options[me].unshift("[Mark IV Tanks] Battle an empty space to build a UK Army");
		}
		/*if(country2 === "UK" && z.statuses[me].includes(31)){
			let c = 0;
			for(let j = 0; !(j>=z.countries.UK.navies.length); j++){
				if(z.countries.UK.navies[j] !== ""){
					c++;
				}
			}
			if(c >= 3){
				t.value += "Keeping the UK Land Battle card due to The Girls with Yellow Hands.\r\n";
				addAlert("You keep the UK Land Battle card due to The Girls with Yellow Hands.");
				z.hands[me].push(z.upDiscards[me].shift());
			}
		}*/
		if(me === 1 || me === 2){
			z.options[me].unshift("Land Battle");
		} else {
			z.options[me].unshift("Land Battle ("+country2+")");
		}
		return undefined;
	}
	if(type === "Sea Battle"){
		if(me === 1 || me === 2){
			z.options[me].unshift("Sea Battle");
		} else {
			z.options[me].unshift("Sea Battle ("+country2+")");
		}
		return undefined;
	}
	let card = title(z.upDiscards[me][0]);
	switch(card){
		case "Soviets of Petrograd": {
			let c = 2;
			for(let j = 0; !(j>=7); j++){
				let loc = z.countries.AH.armies[j];
				if(loc === "PET" || loc === "POL" || loc === "UKR" || loc === "MOS"){
					c++;
				}
			}
			for(let j = 0; !(j>=4); j++){
				let loc = z.countries.Turkey.armies[j];
				if(loc === "PET" || loc === "POL" || loc === "UKR" || loc === "MOS"){
					c++;
				}
			}
			for(let j = 0; !(j>=7); j++){
				let loc = z.countries.Germany.armies[j];
				if(loc === "PET" || loc === "POL" || loc === "UKR" || loc === "MOS"){
					c++;
				}
			}
			for(let j = 0; !(j>=2); j++){
				if(z.countries.Germany.navies[j] === "BAL"){
					c++;
				}
			}
			if(z.countries.AH.navies[0]=== "BAL"){
				c++;
			}
			z.attrition[1]+=c;
			addAlert("Russia is hit for "+c+" cards of attrition.");
			for(let j = 0; !(j>=c); j++){
				t.value += RUS;
			}
			t.value += "\r\n";
			modifyCP(1);
			break;
		}
		case "The October Revolution": {
			let c = 1;
			/* RULES: presumably MOS counts */
			for(let j = 0; !(j>=7); j++){
				let loc = z.countries.AH.armies[j];
				if(loc === "PET" || loc === "POL" || loc === "UKR" || loc === "MOS" || loc === "GAL" || loc === "RUM" || loc === "CAU" || loc === "AZE"){
					c++;
				}
			}
			for(let j = 0; !(j>=4); j++){
				let loc = z.countries.Turkey.armies[j];
				if(loc === "PET" || loc === "POL" || loc === "UKR" || loc === "MOS" || loc === "GAL" || loc === "RUM" || loc === "CAU" || loc === "AZE"){
					c++;
				}
			}
			for(let j = 0; !(j>=7); j++){
				let loc = z.countries.Germany.armies[j];
				if(loc === "PET" || loc === "POL" || loc === "UKR" || loc === "MOS" || loc === "GAL" || loc === "RUM" || loc === "CAU" || loc === "AZE"){
					c++;
				}
			}
			for(let j = 0; !(j>=2); j++){
				let loc = z.countries.Germany.navies[j];
				if(loc === "BAL" || loc === "BLA" || loc === "CAS"){
					c++;
				}
			}
			let loc = z.countries.AH.navies[0];
			if(loc === "BAL" || loc === "BLA" || loc === "CAS"){
				c++;
			}
			z.attrition[1]+=c;
			addAlert("Russia is hit for "+c+" cards of attrition.");
			for(let j = 0; !(j>=c); j++){
				t.value += RUS;
			}
			t.value += "\r\n";
			modifyCP(1);
			break;
		}
		case "The Extravagant Lifestyle of the Aristocracy":
			z.attrition[0]++;
			z.attrition[1]++;
			addAlert("You and Russia are hit for a card of attrition.");
			t.value += AHT + RUS+"\r\n";
			modifyCP(1);
			z.options[me].unshift("[The Extravagant Lifestyle of the Aristocracy] Discard a card from hand");
			break;
		case "Spanish Flu":
			z.attrition[0]++;
			z.attrition[1]+=2;
			z.attrition[2]++;
			z.attrition[3]+=3;
			z.attrition[4]+=2;
			t.value += AHT+RUS+RUS+GER+FRI+FRI+FRI+UKUS+UKUS+"\r\n";
			break;
		case "The Tsar Will Not Help Us":
			z.attrition[1]++;
			t.value += RUS+"\r\n";
			addAlert("You are hit for a card of attrition.");
			modifyEntente(2);
			break;
		case "Assassins of the Black Hand":
			z.attrition[0]+=2;
			t.value += AHT + AHT + "\r\n";
			addAlert("Austria is hit for 2 cards of attrition.");
			break;
		case "Trench Warfare":
			z.attrition[0]+=2;
			z.attrition[1]+=2;
			z.attrition[2]+=2;
			addAlert("You, Germany, and Austria are each hit for 2 cards of attrition.");
			t.value += RUS + RUS + GER + GER + AHT + AHT + "\r\n";
			break;
		case "Unrestricted Submarine Warfare":
			z.attrition[4]+=3;
			t.value += UKUS + UKUS + UKUS + "\r\n";
			modifyCP(1);
			z.options[me].unshift("[Unrestricted Submarine Warfare] Discard a Sea Battle card from hand");
			break;
		case "French Army Mutinies": {
			let c = 1;
			t.value += FRI;
			for(let j = 0; !(j>=6); j++){
				if(z.countries.France.armies[j] !== ""){
					c++;
					t.value += FRI;
				}
			}
			t.value += "\r\n";
			addAlert("France is hit for "+c+" cards of attrition.");
			z.attrition[3]+=c;
			modifyCP(1);
			break; }
		case "Von Lettow-Vorbeck's East African Army": {
			t.value += UKUS + UKUS + UKUS;
			z.attrition[4] += 3;
			let navies = 0;
			for(let j = 0; !(j>=z.countries.UK.navies.length); j++){
				if(z.countries.UK.navies[j] !== ""){
					navies++;
				}
			}
			if(3 > navies){
				addAlert("UK/US is hit for 5 cards of attrition.");
				t.value += UKUS + UKUS;
				z.attrition[4]+=2;
			} else {
				addAlert("UK/US is hit for 3 cards of attrition.");
			}
			t.value += "\r\n";
			modifyCP(1);
		break; }
		case "Mata Hari":
			z.attrition[3]+=3;
			z.attrition[4]++;
			t.value+=FRI+FRI+FRI+UKUS+"\r\n";
			addAlert("France is hit for 3 cards of attrition, and UK/US for 1.");
			modifyCP(1);
			break;
			/* ENDQMGA [/size] 
			[size=1] STARTQMGB /* */
		case "Zeppelins":
			z.attrition[4]+=3;
			z.attrition[3]++;
			t.value+=UKUS+UKUS+UKUS+FRI+"\r\n";
			addAlert("UK/US is hit for 3 cards of attrition, and France for 1.");
			modifyCP(1);
			break;
		case "The Christmas Truce":
			z.attrition[2]++;
			z.attrition[3]++;
			z.attrition[4]++;
			addAlert("You, France, and UK/US are each hit for 1 card of attrition.");
			t.value += FRI+UKUS+GER+"\r\n";
			t.value += bold("Neither France nor the United Kingdom may battle a German Army on their turn this round.")+"\r\n";
			z.christmasTruce = true;
			modifyCP(2);
			break;
		case "Prize Rules Submarine Warfare":
			z.attrition[4]+=3;
			t.value += UKUS+UKUS+UKUS+"\r\n";
			addAlert("UK/US is hit for 3 cards of attrition.");
			modifyCP(2);
			break;
		case "Surface Raiders":{
			let c = 3;
			t.value += FRI + UKUS + UKUS + UKUS;
			for(let j = 0; !(j>=2); j++){
				if(z.countries.Germany.navies[j] !== ""){
					c++;
					t.value += UKUS;
				}
			}
			if(z.countries.AH.navies[0] !== ""){
				c++;
				t.value += UKUS;
			}
			t.value += "\r\n";
			addAlert("France is hit for 1 card of attrition, and UK/US for "+c+".");
			z.attrition[3] += 1;
			z.attrition[4] += c;
			modifyCP(1);
		break;}
		case "Third OHL":
			t.value += GER + GER + "\r\n";
			addAlert("You are hit for 2 cards of attrition.");
			z.attrition[2] += 2;
			z.options[me].unshift("[Third OHL] Play an Economic Warfare card");
			z.options[me].unshift("[Third OHL] Play a Status card");
			z.options[me].unshift("[Third OHL] Draft a Build Army card");
			break;
		case "Imperial Austrian Landwehr":
			z.options[me].unshift("[Imperial Austrian Landwehr] Recruit an AH Army in Galicia");
			z.options[me].unshift("[Imperial Austrian Landwehr] Recruit an AH Army in Tyrol");
			z.options[me].unshift("[Imperial Austrian Landwehr] Recruit an AH Army in Vienna");
			z.options[me].unshift("[Imperial Austrian Landwehr] Prepare a card");
			z.options[me].unshift("[Imperial Austrian Landwehr] Draft a Build Army (AH)");
			break;
		case "Royal Hungarian Honvéd":
			z.options[me].unshift("[Royal Hungarian Honvéd] Recruit an AH Army in Galicia");
			z.options[me].unshift("[Royal Hungarian Honvéd] Recruit an AH Army in Tyrol");
			z.options[me].unshift("[Royal Hungarian Honvéd] Recruit an AH Army in Budapest");
			z.options[me].unshift("[Royal Hungarian Honvéd] Prepare a card");
			z.options[me].unshift("[Royal Hungarian Honvéd] Draft a Build Army (AH)");
			break;
		case "Ottoman Mobilization":
			z.options[me].unshift("[Ottoman Mobilization] Build a Turkish Army in the Middle East");
			z.options[me].unshift("[Ottoman Mobilization] Build a Turkish Army in Persia");
			z.options[me].unshift("[Ottoman Mobilization] Build a Turkish Army in Azerbaijan");
			z.options[me].unshift("[Ottoman Mobilization] Build a Turkish Army in Istanbul");
			z.options[me].unshift("[Ottoman Mobilization] Build a Turkish Army in Anatolia");
			z.options[me].unshift("[Ottoman Mobilization] Prepare a card");
			z.options[me].unshift("[Ottoman Mobilization] Draft a Build Army (Turkey)");
			break;
		case "Caporetto":
			/* RULES: if Germany has no cards, can Caporetto be used for a VP penalty? */
			if(z.hands[2].length > 0){
				if(z.hands[2].length === 1){
					boldAlert("Germany discards their last card in hand due to Caporetto.");
					z.downDiscards[2].push(z.hands[2].pop());
				} else {
					z.options[2].unshift("[Caporetto] Discard a card from hand");
					boldAlert("Germany must discard a card from hand.");
				}
				z.options[me].unshift("[Caporetto] Build an AH Army in the Italian Alps");
				z.options[me].unshift("[Caporetto] Battle in the Italian Alps");
			}
			break;
		case "Franz Ferdinand Avenged":
			z.options[me].unshift("[Franz Ferdinand Avenged] Discard a card from hand");
			break;
		case "Brudermann Orders Cavalry Charge":
			z.options[me].unshift("[Brudermann Orders Cavalry Charge] Discard a card from hand");
			break;
		case "Morava Offensive":
			z.morava = true;
			updateSupply("AH");
			z.options[me].unshift("[Morava Offensive] Battle adjacent to Bulgaria");
			break;
		case "Romanians Advance in Transylvania":
			z.transylvania = true;
			updateSupply("France");
			z.options[me].unshift("[Romanians Advance in Transylvania] Battle adjacent to Romania");
			break;
		case "Anti-Venizelists Surrender Fort Roupel":
			if(!z.extraObjectives.includes("GRE")){
				z.extraObjectives.push("GRE");
				boldAlert("Objective Token placed in Greece.");
			}
			z.options[me].unshift("[Anti-Venizelists Surrender Fort Roupel] Recruit an AH Army in Greece"); 
			break;
		case "Bulgaria Joins Central Powers":
		case "Treaty of Amity and Alliance":
			/* TODO: make placing the objective token optional. */
			if(!z.extraObjectives.includes("BUL")){
				z.extraObjectives.push("BUL");
				boldAlert("Objective Token placed in Bulgaria.");
			}
			z.options[me].unshift("["+card+"] Recruit an AH Army in Bulgaria"); 
			break;
		case "I Order You to Die":
			z.options[me].unshift("[I Order You to Die] Eliminate an Entente Army in Istanbul");
			break;
		case "Persian Oil":
			if(z.hands[me].length > 0){
				z.options[me].unshift("[Persian Oil] Discard a card from hand");
			}
			break;
		case "A Crumbling Empire":
			if(z.hands[me].length > 0){
				z.options[me].unshift("[A Crumbling Empire] Discard a card from hand");
			}
			break;
		case "Bombing of the Russian Black Sea Ports":
			for(let j = 0; !(j>=z.countries.Russia.navies.length); j++){
				if(z.countries.Russia.navies[j] === "BLA"){
					boldAlert("Eliminated a Russian Navy in the Black Sea.");
					z.countries.Russia.navies[j] = "";
					updateSupply("Russia");
					break;
				}
			}
			break;
		case "Montenegro":
		case "Serbia, Russia's Ally":
			/* If you're maxed out on armies, make sure to remove before playing card */
			if(canRecruitArmyIn("Russia","SER")){
				recruitArmy("Russia","SER");
			}
			break;
		case "Russia Mobilizes":
			z.options[me].unshift("[Russia Mobilizes] Build an Army within 2 spaces of Moscow");
			break;
		case "Cossacks":
			z.options[me].unshift("[Cossacks] Build an Army in or adjacent to Moscow");
			break;
		case "Serbia Defies Austrian Ultimatum":
			if(z.countries.Turkey.armies.includes("SER")){
				z.options[me].unshift("[Serbia Defies Austrian Ultimatum] Eliminate a Turkish Army in Serbia");
			}
			if(z.countries.Germany.armies.includes("SER")){
				z.options[me].unshift("[Serbia Defies Austrian Ultimatum] Eliminate a German Army in Serbia");
			}
			if(z.countries.AH.armies.includes("SER")){
				z.options[me].unshift("[Serbia Defies Austrian Ultimatum] Eliminate an AH Army in Serbia");
			}
			break;
		case "Kerensky Vows to Continue War":
			z.options[me].unshift("[Kerensky Vows to Continue War] Prepare a card");
			break;
		case "Peace, Bread, Land":
			z.options[me].unshift("[Peace, Bread, Land] Remove a piece from the board");
			z.peaceBreadLand = 0;
			break;
		case "Brusilov Offensive":
			z.options[me].unshift("[Brusilov Offensive] Battle in or adjacent to Galicia");
			z.options[me].unshift("[Brusilov Offensive] Build an Army in or adjacent to Galicia");
			break;
		case "East Prussian Offensive":
			z.options[me].unshift("[East Prussian Offensive] Battle in or adjacent to Poland");
			z.options[me].unshift("[East Prussian Offensive] Build an Army in or adjacent to Poland");
			break;
		case "Grand Duke Nicholas Nikolaevich Appointed Viceroy":
			z.options[me].unshift("[Grand Duke Nicholas Nikolaevich Appointed Viceroy] Battle in or adjacent to Azerbaijan");
			z.options[me].unshift("[Grand Duke Nicholas Nikolaevich Appointed Viceroy] Build an Army in or adjacent to Azerbaijan");
			break;
		case "Rasputin":
			modifyEntente(1);
			break;
		case "Moltke the Younger Mobilizes Western Advance":
			z.options[me].unshift("[Moltke the Younger Mobilizes Western Advance] Build an Army in or adjacent to Western Germany");
			z.options[me].unshift("[Moltke the Younger Mobilizes Western Advance] Play a Status card");
			z.options[me].unshift("[Moltke the Younger Mobilizes Western Advance] Prepare a card");
			break;
		case "Prussian Military Tradition":
			z.options[me].unshift("[Prussian Military Tradition] Land Battle");
			z.options[me].unshift("[Prussian Military Tradition] Play a Status card");
			z.options[me].unshift("[Prussian Military Tradition] Prepare a card");
			break;
		case "Kaiserschlacht":
			z.options[me].unshift("[Kaiserschlacht] Battle in Burgundy");
			z.options[me].unshift("[Kaiserschlacht] Battle in Picardy");
			z.options[me].unshift("[Kaiserschlacht] Prepare a card");
			break;
		case "Jutland":
			z.options[me].unshift("[Jutland] Build Navy in the North Sea");
			z.options[me].unshift("[Jutland] Battle in the North Sea");
			z.options[me].unshift("[Jutland] Prepare a card");
			break;
		case "Schlieffen Plan":
			/* RULES: can you battle a space your ally has a unit in, if you like? */
			if(canBuildArmyIn("Germany","PAR")){
				if(z.hands[me].length > 0 || z.countries.Germany.supply.includes("PIC") || z.countries.Germany.supply.includes("BUR") || z.countries.Germany.supply.includes("PRO")){
					z.options[me].unshift("[Schlieffen Plan] Build in Paris");
				}
			}
			if(canBuildArmyIn("Germany","PIC")){
				if(z.hands[me].length > 0 || z.countries.Germany.supply.includes("BEL") || z.countries.Germany.supply.includes("BUR") || z.countries.Germany.supply.includes("PAR")){
					z.options[me].unshift("[Schlieffen Plan] Build in Picardy");
				}
			}
			if(canBuildArmyIn("Germany","BEL")){
				if(z.hands[me].length > 0 || z.countries.Germany.supply.includes("PIC") || z.countries.Germany.supply.includes("BUR") || z.countries.Germany.supply.includes("WGE")){
					z.options[me].unshift("[Schlieffen Plan] Build in Belgium");
				}
			}
			z.options[me].unshift("[Schlieffen Plan] Battle in Paris");
			z.options[me].unshift("[Schlieffen Plan] Battle in Picardy");
			z.options[me].unshift("[Schlieffen Plan] Battle in Belgium");
			z.options[me].unshift("[Schlieffen Plan] Prepare a card");
			break;
		case "Ninth Army Formed to Defend East Prussia":
			z.options[me].unshift("[Ninth Army Formed to Defend East Prussia] Build an Army in or adjacent to Prussia");
			z.options[me].unshift("[Ninth Army Formed to Defend East Prussia] Play a Status card");
			z.options[me].unshift("[Ninth Army Formed to Defend East Prussia] Prepare a card");
			break;
		case "Tannenberg":
			z.options[me].unshift("[Tannenberg] Battle a Land space in or adjacent to Prussia");
			z.options[me].unshift("[Tannenberg] Build an Army in or adjacent to Prussia");
			z.options[me].unshift("[Tannenberg] Prepare a card");
			break;
		case "Weltpolitik Drives Military Expansion":
			z.options[me].unshift("[Weltpolitik Drives Military Expansion] Build a Navy");
			z.options[me].unshift("[Weltpolitik Drives Military Expansion] Build an Army");
			z.options[me].unshift("[Weltpolitik Drives Military Expansion] Prepare a card");
			break;
		case "Landsturm":
			z.options[me].unshift("[Landsturm] Recruit an Army in Prussia");
			z.options[me].unshift("[Landsturm] Recruit an Army in Berlin");
			z.options[me].unshift("[Landsturm] Recruit an Army in Western Germany");
			z.options[me].unshift("[Landsturm] Prepare a card");
			break;
		case "Volunteer Movement":
			z.options[me].unshift("[Volunteer Movement] Play a Status card");
			z.options[me].unshift("[Volunteer Movement] Prepare a card");
			z.options[me].unshift("[Volunteer Movement] Draft a Build Army card");
			break;
		case "Landwehr":
			z.options[me].unshift("[Landwehr] Build an Army");
			z.options[me].unshift("[Landwehr] Play a Status card");
			z.options[me].unshift("[Landwehr] Prepare a card");
			break;
		case "A Place in the Sun":
			z.options[me].unshift("[A Place in the Sun] Build an Army into a space not considered difficult terrain");
			z.options[me].unshift("[A Place in the Sun] Land Battle");
			z.options[me].unshift("[A Place in the Sun] Prepare a card");
			break;
		case "Hindenburg Line":
			z.options[me].unshift("[Hindenburg Line] Build an Army in or adjacent to Picardy");
			z.options[me].unshift("[Hindenburg Line] Prepare a card");
			break;
		case "Gorlice-Tarnów Offensive":
			z.options[me].unshift("[Gorlice-Tarnów Offensive] Build a piece in an empty space in or adjacent to Poland");
			z.options[me].unshift("[Gorlice-Tarnów Offensive] Battle in or adjacent to Poland");
			z.options[me].unshift("[Gorlice-Tarnów Offensive] Prepare a card");
			break;
		case "Francs-tireurs": {
			let c = 1;
			t.value += GER;
			if(z.countries.Germany.armies.includes("PIC")){
				c++;
				t.value += GER;
			}
			for(let j = 0; !(j>=provinces.PIC.neighbors.length); j++){
				if(z.countries.Germany.armies.includes(provinces.PIC.neighbors[j])){
					c++;
					t.value += GER;
				}
			}
			z.attrition[2]+=c;
			addAlert("Germany is hit for "+c+" cards of attrition.");
			t.value += "\r\n";
			z.options[me].unshift("[Francs-tireurs] Draft a French Land Battle card");
			z.options[me].unshift("[Francs-tireurs] Draft a French Build Army card");
			
			break;
		}
		case "Armée d'Afrique":
			z.attrition[2] += 3;
			t.value += GER + GER + GER + "\r\n";
			addAlert("Germany is hit for 3 cards of attrition.");
			z.options[me].unshift("[Armée d'Afrique] Draft a French Land Battle card");
			z.options[me].unshift("[Armée d'Afrique] Draft a French Build Army card");			
			break;
		case "King Ferdinand Reorganizes Romanian Army":
			/* RULES: is placing the objective token optional? */
			if(!z.extraObjectives.includes("RUM")){
				z.extraObjectives.push("RUM");
				boldAlert("Objective Token placed on Rumania.");
			}
			z.options[me].unshift("[King Ferdinand Reorganizes Romanian Army] Recruit a French Army in Rumania");
			break;
		case "Romania Joins Entente":
			if(!z.extraObjectives.includes("RUM")){
				z.extraObjectives.push("RUM");
				boldAlert("Objective Token placed on Rumania.");
			}
			z.options[me].unshift("[Romania Joins Entente] Recruit a French Army in Rumania");
			break;
		case "Paris Taxis":
			z.options[me].unshift("[Paris Taxis] Recruit a French Army in Provence");
			z.options[me].unshift("[Paris Taxis] Recruit a French Army in Burgundy");
			z.options[me].unshift("[Paris Taxis] Recruit a French Army in Picardy");
			z.options[me].unshift("[Paris Taxis] Recruit a French Army in Paris");
			z.options[me].unshift("[Paris Taxis] Draft a French Land Battle card");
			z.options[me].unshift("[Paris Taxis] Draft a French Build Army card");
			break;
		case "Alsace-Lorraine":
			if(!z.extraObjectives.includes("BUR")){
				z.extraObjectives.push("BUR");
				boldAlert("Objective Token placed on Burgundy.");
			}
			break;
		case "France Mobilizes":
			z.options[me].unshift("[France Mobilizes] Build a French Navy");
			z.options[me].unshift("[France Mobilizes] Recruit a French Army in Provence");
			z.options[me].unshift("[France Mobilizes] Recruit a French Army in Burgundy");
			z.options[me].unshift("[France Mobilizes] Recruit a French Army in Picardy");
			z.options[me].unshift("[France Mobilizes] Recruit a French Army in Paris");
			z.options[me].unshift("[France Mobilizes] Draft a French Land Battle card");
			z.options[me].unshift("[France Mobilizes] Draft a French Build Army card");
			break;
		case "Plan XVII":
			z.options[me].unshift("[Plan XVII] Build an Army in or adjacent to Paris");
			break;
		case "The Sunny Days of May":
			z.options[me].unshift("[The Sunny Days of May] Build an Italian Army in the Italian Alps");
			z.options[me].unshift("[The Sunny Days of May] Build an Italian Army in Rome");
			z.options[me].unshift("[The Sunny Days of May] Draft an Italian Build Army card");
			break;
		case "Isonzo River Offensives":
			z.options[me].unshift("[Isonzo River Offensives] Discard a card from hand");
			break;
		case "Bersaglieri":
			z.bersaglieri = true;
			z.options[me].unshift("[Bersaglieri] Land Battle (Italy)");
			break;
		case "Lawrence Foments Arab Revolts":
			z.attrition[0] += 2;
			t.value += AHT + AHT + "\r\n";
			addAlert("AH/T is hit for 2 cards of attrition.");
			z.options[me].unshift("[Lawrence Foments Arab Revolts] Recruit a UK Army in the Middle East");
			z.options[me].unshift("[Lawrence Foments Arab Revolts] Eliminate a Turkish Army in the Middle East");
			break;
		case "United Kingdom Seizes German Colonies in Africa": {
			z.attrition[2] += 3;
			let c = 0;
			for(let j = 0; !(j>=z.countries.UK.navies.length); j++){
				if(z.countries.UK.navies[j] !== ""){
					c++;
				}
			}
			if(c >= 3){
				z.attrition[2] += 2;
				t.value += GER + GER + GER + GER + GER + "\r\n";
				addAlert("Germany is hit for 5 cards of attrition.");
			} else {
				t.value += GER + GER + GER + "\r\n";
				addAlert("Germany is hit for 3 cards of attrition.");
			}
			break;
		}
		case "Japan Attacks German Enclaves at Tsingtao":
			z.attrition[2] += 4;
			t.value += GER + GER + GER + GER + "\r\n";
			addAlert("Germany is hit for 4 cards of attrition.");
			break;
		case "The Blockade of Europe":
			z.attrition[0]++;
			z.attrition[2] += 2;
			t.value += GER + GER + AHT;
			if(z.countries.UK.navies.includes("NTH") || z.countries.France.navies.includes("NTH") || z.countries.Italy.navies.includes("NTH") || z.countries.Russia.navies.includes("NTH")){
				z.attrition[0]++;
				z.attrition[2] += 2;
				t.value += GER + GER + AHT;
				addAlert("Germany is hit for 4 cards of attrition, and AH/T is hit for 2.");
			} else {
				addAlert("Germany is hit for 2 cards of attrition, and AH/T is hit for 1.");
			}
			t.value += "\r\n";
			break;
		case "Sidney Reilly":
			z.attrition[1]++;
			z.attrition[2]++;
			t.value += GER + RUS + "\r\n";
			addAlert("Germany and Russia are each hit for 1 card of attrition, and Germany must discard a status card.");	
			if(z.statuses[2].length === 1){
				let discardedStatus = z.statuses[2].pop();
				z.upDiscards[2].unshift(discardedStatus);
				boldAlert("Germany discards their only Status: " + title(discardedStatus,"DE"));
			} else if(z.statuses[2].length === 0){
				plainAlert("Germany has no statuses to discard.");
			} else {
				z.options[2].unshift("[Sidney Reilly] Discard a Status card");
			}
			z.options[me].unshift("[Sidney Reilly] Recruit a UK Army in or adjacent to Moscow");
			break;
		case "The Sinking of the Lusitania":
			z.attrition[4]++;
			t.value += UKUS + "\r\n";
			addAlert("You are hit for 1 card of attrition.");
			z.options[me].unshift("[The Sinking of the Lusitania] Build a US Navy");
			z.options[me].unshift("[The Sinking of the Lusitania] Build a US Army");
			break;
		case "First Lord of the Admiralty Prepares for War":
			z.options[me].unshift("[First Lord of the Admiralty Prepares for War] Build Navy (UK)");
			z.options[me].unshift("[First Lord of the Admiralty Prepares for War] Play a UK Status card");
			z.options[me].unshift("[First Lord of the Admiralty Prepares for War] Draft a Build Navy (UK)");
			break;
		case "Persian Campaign": {
			/* TODO: add reminder that you can't do anything if you don't have 3 navies */
			let c = 0;
			for(let j = 0; !(j>=z.countries.UK.navies.length); j++){
				if(z.countries.UK.navies[j] !== ""){
					c++;
				}
			}
			if(c >=3 ){
				if(!z.extraObjectives.includes("PER")){
					z.extraObjectives.push("PER");
					boldAlert("Objective Token placed in Persia.");	
				}
				z.options[me].unshift("[Persian Campaign] Recruit a UK Army in Persia");
			}
			break;
		}
		case "Tunnel Mines":
			z.options[me].unshift("[Tunnel Mines] Make AH/T discard 2 prepared cards");
			z.options[me].unshift("[Tunnel Mines] Make Germany discard 2 prepared cards");
			break;
		case "Asquith Sends Ultimatum":
			z.options[me].unshift("[Asquith Sends Ultimatum] Build Army (UK)");
			z.options[me].unshift("[Asquith Sends Ultimatum] Build Navy (UK)");
			z.options[me].unshift("[Asquith Sends Ultimatum] Play a UK Status card");
			break;
		case "Passchendaele":
			z.options[me].unshift("[Passchendaele] Discard a prepared card");
			break;
		case "Provisional Government of National Defence":
			if(!z.extraObjectives.includes("GRE")){
				z.extraObjectives.push("GRE");
				boldAlert("Objective Token placed in Greece.");	
			}
			z.options[me].unshift("[Provisional Government of National Defence] Recruit a UK Army in Greece");
			break;
		case "The Grand Fleet":
			z.options[me].unshift("[The Grand Fleet] Build a UK Navy in the North Atlantic");
			z.options[me].unshift("[The Grand Fleet] Build a UK Navy in the North Sea");
			z.options[me].unshift("[The Grand Fleet] Build a UK Navy in the English Channel");
			z.options[me].unshift("[The Grand Fleet] Draft a Build Navy (UK)");
			break;
		case "Gallipoli":
			z.options[me].unshift("[Gallipoli] Battle Istanbul");
			z.options[me].unshift("[Gallipoli] Build a UK Army in Istanbul");
			z.options[me].unshift("[Gallipoli] Build a UK Navy in the Eastern Mediterranean");
			break;
		case "Belgium Resists":
			z.options[me].unshift("[Belgium Resists] Recruit a UK Army in Belgium");
			break;
		case "The Somme":
			if(z.countries.UK.armies.includes("PIC") || z.countries.UK.armies.includes("BEL") || z.countries.UK.armies.includes("PAR") || z.countries.UK.armies.includes("BUR")){
				if(z.statuses[4].includes(32)){
					z.options[me].unshift("[Mark IV Tanks] Battle an empty space to build a UK Army");
				}
				z.options[me].unshift("[The Somme] Battle in or adjacent to Picardy");
				z.options[me].unshift("[The Somme] Prepare a card");
			} 
			break;
		case "The Royal Navy":
			z.options[me].unshift("[The Royal Navy] Recruit a UK Navy");
			z.options[me].unshift("[The Royal Navy] Play a Status card");
			break;
		case "Cambrai":
			if(z.countries.UK.armies.includes("PIC") || z.countries.UK.armies.includes("BEL") || z.countries.UK.armies.includes("PAR") || z.countries.UK.armies.includes("BUR")){
				if(z.statuses[4].includes(32)){
					z.options[me].unshift("[Mark IV Tanks] Battle an empty space to build a UK Army");
				}
				z.options[me].unshift("[Cambrai] Battle in or adjacent to Picardy");
				z.options[me].unshift("[Cambrai] Play a Status card");
			} 
			break;
		case "Eddie Rickenbacker":
			let ok = false;
			for(let j = 0; !ok && !(j>=z.countries.US.armies.length); j++){
				let province0 = z.countries.US.armies[j];
				if(province0 === ""){
					continue;
				}
				for(let k = 0; !ok && !(k>=provinces[province0].neighbors.length); k++){
					let province1 = provinces[province0].neighbors[k];
					ok = z.countries.Germany.armies.includes(province1);
					for(let l = 0; !ok && !(l>=provinces[province1].neighbors.length); l++){
						ok = z.countries.Germany.armies.includes(provinces[province1].neighbors[l]);
					}
				}
			}
			if(ok && z.statuses[2].length > 0){
				z.options[me].unshift("[Eddie Rickenbacker] Discard a German Status card");
			}
			break;
		case "American Public Outraged by Zimmermann Telegram":
			z.options[me].unshift("[American Public Outraged by Zimmermann Telegram] Build a US Navy");
			z.options[me].unshift("[American Public Outraged by Zimmermann Telegram] Build a US Army");
			z.options[me].unshift("[American Public Outraged by Zimmermann Telegram] Draft a Build Navy (US)");
			z.options[me].unshift("[American Public Outraged by Zimmermann Telegram] Draft a Build Army (US)");
			break;
		case "War Revenue Act":
			for(let j = 1; !(j>=z.upDiscards.length); j++){
				if(country(z.upDiscards[me][j]) === "US" && z.upDiscards[me][j] !== 49){
					z.downDiscards[me].push(z.upDiscards[me].splice(j,1)[0]);
					j--;
				}
			}
			z.options[me].unshift("[War Revenue Act] Take a US card from your discard pile");
			break;
		case "Scottish Women's Hospitals":{
			let cardsFound = 0;
			for (
			let j = 0;
			!(j >= z.upDiscards[me].length) && !(cardsFound >= 2);
			j++
			) {
				if (cardType(z.upDiscards[me][j]) === "Build Army") {
					z.hands[me].push(z.upDiscards[me][j]);
					z.upDiscards[me].splice(j, 1);
					j--;
					cardsFound++;
				}
			}
			for (
			let j = 0;
			!(j >= z.downDiscards[me].length) && !(cardsFound >= 2);
			j++
			) {
				if (cardType(z.downDiscards[me][j]) === "Build Army") {
					z.hands[me].push(z.downDiscards[me][j]);
					z.downDiscards[me].splice(j, 1);
					j--;
					cardsFound++;
				}
			}
			let note =
			boldAlert("Scottish Women's Hospitals: Moving " +cardsFound +" Build Army cards from discard to hand.");
		break;}
		case "Redl Blackmailed":
			z.options[me].unshift("[Redl Blackmailed] Discard a card from AH/T's hand");
			break;
	}
}

function playFromHand(){
	return new Promise((resolve,reject)=>{
		let promptText =
		"Please choose a card in your hand to play (1-" +
		z.hands[me].length +
		"):\n\n";
		z.hands[me].forEach(function(elt, index) {
			promptText += index + 1 + ": " + cardText(elt) + "\n";
		});
		promptNum(promptText,(a)=>1>a||a>z.hands[me].length,reject,(playedCard)=>{
			playCard(z.hands[me][playedCard - 1]);
			resolve();
		});
	});
}

function discardFromDeck(){
	return new Promise((resolve,reject) => {
		confirmify("Are you sure you want to discard the top card of your draw deck?",reject,()=>{
			addAlert("You discard " + cardText(z.drawDecks[me][0]) + " face-down from your draw deck.");
			z.downDiscards[me].push(z.drawDecks[me].shift());
			t.value +=	bold("Discarding 1 card from the top of my draw deck.\r\n");
			resolve();
		});
	});
}

function discardPrepared(){
	return new Promise((resolve,reject)=>{
		let promptText =
		"Please choose a prepared card to discard (1-" +
		z.prepared[me].length +
		"):\n\n";
		z.prepared[me].forEach(function(elt, index) {
			promptText += index + 1 + ": " + cardText(elt) + "\n";
		});
		promptNum(promptText,(a)=>1>a||a>z.prepared[me].length,reject,(discard)=>{
			addAlert("Discarding " + cardText(z.prepared[me][discard - 1]) +" from prepared cards.");
			t.value = t.value + bold("Discarding a prepared card.") + "\r\n";
			z.downDiscards[me].push(z.prepared[me][discard - 1]);
			z.prepared[me].splice(discard - 1, 1);
			resolve();
		});
	});
}

function discardStatus(){
	return new Promise((resolve,reject)=>{
		let promptText =
		"Please choose a status to discard (1-" + z.statuses[me].length + "):\n\n";
		z.statuses[me].forEach(function(elt, index) {
			promptText += index + 1 + ": " + title(elt) + "\n";
		});
		promptNum(promptText,(a)=>1>a||a>z.statuses[me].length,reject,(discardedStatus)=>{
			boldAlert("Discarding in-play Status: " + title(z.statuses[me][discardedStatus - 1]));
			z.upDiscards[me].unshift(z.statuses[me][discardedStatus - 1]);
			z.statuses[me].splice(discardedStatus - 1, 1);
			resolve();
		});
	});
}

function discardFromHand(){
	return new Promise((resolve,reject)=>{
		let promptText =
		"Please choose a card in your hand to discard (1-" +
		z.hands[me].length +
		"):\n\n";
		z.hands[me].forEach(function(elt, index) {
			promptText += index + 1 + ": " + cardText(elt) + "\n";
		});
		promptNum(promptText,(a)=>1>a||a>z.hands[me].length,reject,(discard)=>{
			addAlert("Discarding " + cardText(z.hands[me][discard - 1]) + " from hand.");
			t.value = t.value + bold("Discarding a card from hand.") + "\r\n";
			z.downDiscards[me].push(z.hands[me][discard - 1]);
			z.hands[me].splice(discard - 1, 1);
			resolve();
		});
	});
}

function draftCard(str){
	return new Promise((resolve,reject)=>{
		let foundCard = false;
		for (let j = 0; !(j >= z.drawDecks[me].length) && !foundCard; j++) {
			if (cardName(z.drawDecks[me][j]) === str) {
				z.hands[me].push(z.drawDecks[me][j]);
				z.drawDecks[me].splice(j, 1);
				boldAlert("Drafting a " + str + " card.");
				foundCard = true;
			}
		}
		shuffle(z.drawDecks[me]);
		if(z.bottomed !== undefined){
			z.bottomed[me] = bold("Your draw deck has been reshuffled since the start of the game.");
		}
		if(foundCard && (str === "Build Army (France)" || str === "Build Navy (France)" || str === "Land Battle (France)") && z.statuses[me].includes(30)){
			confirmify("Would you like to use Citizen-Soldiers to immediately prepare this card?",resolve,()=>{
				t.value += bold("Preparing the "+str+" card using Citizen-Soldiers.")+"\r\n";
				z.prepared[me].push(z.hands[me].pop());
				addAlert("You prepare the "+str+" card using Citizen-Soldiers.");
				resolve();
			});
				
			
		} else {
			if (!foundCard) {
				plainAlert("You have no " + str + " cards to draft in your draw deck.");
			}
			resolve();
		}
	});
	
}

function mainMenu(){
	if(z.setup[me]){
		let initialHand = "Your initial 10-card draw is:\n\n";
		for (let j = 0; !(j >= 10); j++) {
			initialHand += j + 1 + ": " + cardText(z.hands[me][j]) + "\n";
		}
		let mulliganText = "";
		let maxValue = 10;
		if(z.canMulligan[me]){
			mulliganText += 11 + ": Take a Mulligan.\n";
			maxValue++;
		}
		
		let promptText = initialHand + mulliganText + "\nPick the first card you'd like to place on the bottom of your deck (1-"+maxValue+")";
		
		promptNum(promptText,(a)=>1>a||a>maxValue,()=>{
			clearSpoilers();
			postSeed();
		},(bottom1)=>{
			if(bottom1 === 11){
				z.drawDecks[me]=shuffle(z.drawDecks[me].concat(z.hands[me]));
				z.hands[me] = [];
				for(let k = 0; !(k>=10); k++){
					z.hands[me].push(z.drawDecks[me].shift());
				}
				addAlert("You take a mulligan.  Run the script again to see your new cards.");
				t.value += bold(powerName + " takes a mulligan.")+"\r\n";
				z.canMulligan[me] = false;
				clearSpoilers();
				postSeed();
			} else {
				let promptText = initialHand + "\nPick the second card you'd like to place on the bottom of your deck (1-10).";
				promptNum(promptText,(a)=>1>a||a>10||a===bottom1,()=>{
					clearSpoilers();
					postSeed();
				},(bottom2)=>{
					let promptText = initialHand + "\nPick the third card you'd like to place on the bottom of your deck (1-10).";
					promptNum(promptText,(a)=>1>a||a>10||a===bottom1||a===bottom2,()=>{
						clearSpoilers();
						postSeed();
					},(bottom3)=>{
						z.bottomed[me] = bold("At the start of the game you bottomed, in order:")+"\r\n"+cardImage(z.hands[me][bottom1-1])+"\r\n"+cardImage(z.hands[me][bottom2-1])+"\r\n"+cardImage(z.hands[me][bottom3-1])+"\r\n\r\nThe last card listed here is on the bottom of your draw deck.";
						addAlert("You bottomed:\r\n"+cardText(z.hands[me][bottom1-1])+"\n"+cardText(z.hands[me][bottom2-1])+"\n"+cardText(z.hands[me][bottom3-1])+"\n\nThis information will also be given in your private hand reports.");
						z.drawDecks[me].push(z.hands[me][bottom1 - 1]);
						z.drawDecks[me].push(z.hands[me][bottom2 - 1]);
						z.drawDecks[me].push(z.hands[me][bottom3 - 1]);
						let bottomed = [bottom1, bottom2, bottom3].sort(compare);
						z.hands[me].splice(bottomed[2] - 1, 1);
						z.hands[me].splice(bottomed[1] - 1, 1);
						z.hands[me].splice(bottomed[0] - 1, 1);
						t.value += boardImage();
						for(let j = 0; !(j>=5); j++){
							t.value += publicReport(j);
						}
						t.value += clear();
						z.setup[me] = false;
						if(!z.setup[0] && !z.setup[1] && !z.setup[2] && !z.setup[3] && !z.setup[4]){
							addAlert("All players have finished initial setup.");
							z.turn = 0;
							z.options[z.turn].push("[Draft Step] Discard a card from hand");	
							z.options[z.turn].push("[Play Step] Play a card");
							z.options[z.turn].push("[Attrition Step] Play a prepared Attrition card");
							z.options[z.turn].push("[Prepare Step] Prepare a card");
							z.options[z.turn].push("[Prepare Step] Unprepare a card");
							z.options[z.turn].push("[Draw Step] Draw card(s) from your draw deck");
							z.options[z.turn].push("End Turn");
							z.options[z.turn].push("Remove a piece from the board"); 
							z.step = 0;
							t.value += "[h"+"r]"+boardImage();
							for(let j = 0; !(j>=5); j++){
								t.value += publicReport(j);
							}
							t.value += clear();
						}
						clearSpoilers();
						postSeed();
	
					});
				});
			}
		});
	} else {
		let promptText = "";
		for(let j = 0; !(j>=5); j++){
			if(z.attrition[j] > 0 && z.hands[j].length === 0 && z.prepared[j].length === 0 && z.drawDecks[j].length === 0){
				if(j === 0 || j === 2){
					modifyCP(-z.attrition[j]);
					z.attrition[j] = 0;
				} else {
					modifyEntente(-z.attrition[j]);
					z.attrition[j] = 0;
				}
			}
		}
		let options = [];
		if(z.attrition[me] > 0){
			if(z.drawDecks[me].length > 0){
				options.push("[Attrition] Discard a card from the top of your draw deck");
			} else {
				options.push("[Attrition] Take a VP penalty.");
			}
			if(z.hands[me].length > 0){
				options.push("[Attrition] Discard a card from hand");
			}
			if(z.prepared[me].length > 0){
				options.push("[Attrition] Discard a prepared card");
			}
		}
		for(let j = 0; !(j>=options.length); j++){
			promptText += "\n"+(j+1)+": "+options[j];
		}
		for(let j = 0; !(j>=z.options[me].length); j++){
			let ok = true;
			switch(z.options[me][j]){
				case "End Turn":
					ok = noBattle();
					break;
				case "Reinforce!":
					ok = canReinforce();
					break;
				case "Sustain!":
					ok = canSustain();
					break;
				case "[German Aid in the East] Sustain!":
				case "[Blackjack and the Doughboys] Sustain!":
					ok = helperCanSustain();
					break;
				case "Counterattack!":
					ok = canCounterattack();
					break;
				case "Land Battle":
					if(me === 1){
						ok = 2 >= z.step && canLandBattle("Russia");
					} else if (me === 2){
						ok = 2 >= z.step && canLandBattle("Germany");
					}
					break;
				case "Land Battle (AH)":
					ok = 2 >= z.step && canLandBattle("AH");
					break;
				case "Land Battle (Turkey)":
					ok = 2 >= z.step && canLandBattle("Turkey");
					break;
				case "Land Battle (France)":
					ok = 2 >= z.step && canLandBattle("France");
					break;
				case "Land Battle (Italy)":
					ok = 2 >= z.step && canLandBattle("Italy");
					break;
				case "Land Battle (UK)":
					ok = 2 >= z.step && canLandBattle("UK");
					break;
				case "Land Battle (US)":
					ok = 2 >= z.step && canLandBattle("US");
					break;
				case "Sea Battle":
					if(me === 1){
						ok = 2 >= z.step && canSeaBattle("Russia");
					} else if (me === 2){
						ok = 2 >= z.step && canSeaBattle("Germany");
					}
					break;
				case "Sea Battle (AH)":
					ok =2 >= z.step &&  canSeaBattle("AH");
					break;
				case "Sea Battle (France)":
					ok = 2 >= z.step && canSeaBattle("France");
					break;
				case "Sea Battle (Italy)":
					ok = 2 >= z.step && canSeaBattle("Italy");
					break;
				case "Sea Battle (UK)":
					ok = 2 >= z.step && canSeaBattle("UK");
					break;
				case "Sea Battle (US)":
					ok = 2 >= z.step && canSeaBattle("US");
					break;
				case "[Mark IV Tanks] Build an Army":
					ok = canMkIVTanks();
					break;
				case "[Stosstruppen] Battle an adjacent land space":
					ok = canStosstruppen();
					break;
				case "[King Ferdinand Reorganizes Romanian Army] Recruit a French Army in Rumania":
				case "[Romania Joins Entente] Recruit a French Army in Rumania":
					ok = 2 >= z.step && canRecruitArmyIn("France","RUM");
					break;
				case "[Bulgaria Joins Central Powers] Recruit an AH Army in Bulgaria":
				case "[Treaty of Amity and Alliance] Recruit an AH Army in Bulgaria":
					ok = 2 >= z.step && canRecruitArmyIn("AH","BUL");
					break;
				case "[Anti-Venizelists Surrender Fort Roupel] Recruit an AH Army in Greece":
					ok = 2 >= z.step && canRecruitArmyIn("AH","GRE");
					break;
				case "[Imperial Austrian Landwehr] Recruit an AH Army in Galicia":
					ok = 2 >= z.step && canRecruitArmyIn("AH","GAL");
					break;
				case "[Imperial Austrian Landwehr] Recruit an AH Army in Tyrol":
					ok = 2 >= z.step && canRecruitArmyIn("AH","TYR");
					break;
				case "[Imperial Austrian Landwehr] Recruit an AH Army in Vienna":
					ok = 2 >= z.step && canRecruitArmyIn("AH","VIE");
					break;
				case "[Ottoman Mobilization] Build a Turkish Army in the Middle East":
					ok = 2 >= z.step && canBuildArmyIn("Turkey","MID");
					break;
				case "[Ottoman Mobilization] Build a Turkish Army in Persia":
					ok = 2 >= z.step && canBuildArmyIn("Turkey","PER");
					break;
				case "[Ottoman Mobilization] Build a Turkish Army in Azerbaijan":
					ok = 2 >= z.step &&canBuildArmyIn("Turkey","AZE");
					break;
				case "[Ottoman Mobilization] Build a Turkish Army in Istanbul":
					ok = 2 >= z.step && canBuildArmyIn("Turkey","IST");
					break;
				case "[Ottoman Mobilization] Build a Turkish Army in Anatolia":
					ok = 2 >= z.step && canBuildArmyIn("Turkey","ANA");
					break;
				case "[Royal Hungarian Honvéd] Recruit an AH Army in Galicia":
					ok = 2 >= z.step && canRecruitArmyIn("AH","GAL");
					break;
				case "[Royal Hungarian Honvéd] Recruit an AH Army in Tyrol":
					ok = 2 >= z.step && canRecruitArmyIn("AH","TYR");
					break;
				case "[Royal Hungarian Honvéd] Recruit an AH Army in Budapest":
					ok = 2 >= z.step && canRecruitArmyIn("AH","BUD");
					break;
				case "[Landsturm] Recruit an Army in Prussia":
					ok = 2 >= z.step && canRecruitArmyIn("Germany","PRU");
					break;
				case "[Landsturm] Recruit an Army in Berlin":
					ok = 2 >= z.step && canRecruitArmyIn("Germany","BER");
					break;
				case "[Landsturm] Recruit an Army in Western Germany":
					ok = 2 >= z.step && canRecruitArmyIn("Germany","WGE");
					break;
				case "[Paris Taxis] Recruit a French Army in Provence":
				case "[France Mobilizes] Recruit a French Army in Provence":
					ok = 2 >= z.step && canRecruitArmyIn("France","PRO");
					break;
				case "[Paris Taxis] Recruit a French Army in Burgundy":
				case "[France Mobilizes] Recruit a French Army in Burgundy":
					ok = 2 >= z.step && canRecruitArmyIn("France","BUR");
					break;
				case "[Paris Taxis] Recruit a French Army in Picardy":
				case "[France Mobilizes] Recruit a French Army in Picardy":
					ok = 2 >= z.step && canRecruitArmyIn("France","PIC");
					break;
				case "[Paris Taxis] Recruit a French Army in Paris":
				case "[France Mobilizes] Recruit a French Army in Paris":
					ok = 2 >= z.step && canRecruitArmyIn("France","PAR");
					break;
				case "[France Mobilizes] Build a French Navy":
					ok = 2 >= z.step && canBuildNavy("France");
					break;
				case "[Imperial Austrian Landwehr] Prepare a card":
				case "[Royal Hungarian Honvéd] Prepare a card":
				case "[Kerensky Vows to Continue War] Prepare a card":
				case "[Kerensky Vows to Continue War] Prepare another card":
				case "[Ottoman Mobilization] Prepare a card":
				case "[Franz Ferdinand Avenged] Discard a card from hand":
				case "[Isonzo River Offensives] Discard a card from hand":
				case "[Brudermann Orders Cavalry Charge] Discard a card from hand":
				case "[Caporetto] Discard a card from hand":
				case "[Moltke the Younger Mobilizes Western Advance] Prepare a card":
				case "[Ninth Army Formed to Defend East Prussia] Prepare a card":
				case "[Prussian Military Tradition] Prepare a card":
				case "[Kaiserschlacht] Prepare a card":
				case "[Jutland] Prepare a card":
				case "[Schlieffen Plan] Prepare a card":
				case "[Tannenberg] Prepare a card":
				case "[Weltpolitik Drives Military Expansion] Prepare a card":
				case "[Landsturm] Prepare a card":
				case "[Landsturm] Prepare another card":
				case "[Volunteer Movement] Prepare a card":
				case "[Landwehr] Prepare a card":
				case "[A Place in the Sun] Prepare a card":
				case "[Hindenburg Line] Prepare a card":
				case "[Hindenburg Line] Prepare another card":
				case "[Gorlice-Tarnów Offensive] Prepare a card":
				case "[The Somme] Prepare a card":
				case "[The Somme] Prepare another card":
				case "[Persian Oil] Discard a card from hand":
				case "[A Crumbling Empire] Discard a card from hand":
					ok = 2 >= z.step && z.hands[me].length > 0;
					break;
				case "[Weltpolitik Drives Military Expansion] Build an Army":
				case "[Landwehr] Build an Army":
					ok = 2 >= z.step && canBuildArmy("Germany");
					break;
				case "[The Sinking of the Lusitania] Build a US Navy":
				case "[The Sinking of the Lusitania] Build a US Navy (2nd piece)":
				case "[American Public Outraged by Zimmermann Telegram] Build a US Navy":
					ok = 2 >= z.step && canBuildNavy("US");
					break;
				case "[The Sinking of the Lusitania] Build a US Army":
				case "[The Sinking of the Lusitania] Build a US Army (2nd piece)":
				case "[American Public Outraged by Zimmermann Telegram] Build a US Army":
					ok = 2 >= z.step && canBuildArmy("US");
					break;
				case "[Weltpolitik Drives Military Expansion] Build a Navy":
					ok = 2 >= z.step && canBuildNavy("Germany");
					break;
				case "[First Lord of the Admiralty Prepares for War] Build Navy (UK)":
				case "[Asquith Sends Ultimatum] Build Navy (UK)":
					ok = 2 >= z.step && canBuildNavy("UK");
					break;
				case "[Asquith Sends Ultimatum] Build Army (UK)":
					ok = 2 >= z.step && canBuildArmy("UK");
					break;
				case "[Schlieffen Plan] Build into the space battled":
				case "[A Place in the Sun] Build into the space battled":
				case "[Gorlice-Tarnów Offensive] Build into the space battled":
					ok = 2 >= z.step && armyAvailable("Germany");
					break;
				case "[Schlieffen Plan] Battle in Belgium":
					ok = 2 >= z.step && canLandBattleIn("Germany","BEL");
					break;
				case "[Schlieffen Plan] Battle in Paris":
					ok = 2 >= z.step && canLandBattleIn("Germany","PAR");
					break;
				case "[Schlieffen Plan] Battle in Picardy":
					ok = 2 >= z.step && canLandBattleIn("Germany","PIC");
					break;
				case "[Jutland] Battle in the North Sea":
					ok = 2 >= z.step && canSeaBattleIn("Germany","NTH");
					break;
				case "[Jutland] Build Navy in the North Sea":
					ok = 2 >= z.step && canBuildNavyIn("Germany","NTH");
					break;
				case "[Prussian Military Tradition] Land Battle":
				case "[A Place in the Sun] Land Battle":
					ok = 2 >= z.step && canLandBattle("Germany");
					break;
				case "[Bersaglieri] Land Battle (Italy)":
					ok = 2 >= z.step && canLandBattle("Italy");
					break;
				case "[Kaiserschlacht] Battle in Burgundy":
					ok = 2 >= z.step && canLandBattleIn("Germany","BUR");
					break;
				case "[Kaiserschlacht] Battle in Picardy":
					ok = 2 >= z.step && canLandBattleIn("Germany","PIC");
					break;	
				case "[Difficult Terrain] Discard a card from hand":
				case "[Limited Rail and Road Network] Discard a card from hand":
					ok = z.hands[me].length > 0;
					break;
				case "[Royal Hungarian Honvéd] Draft a Build Army (AH)":
				case "[Imperial Austrian Landwehr] Draft a Build Army (AH)":
				case "[Ottoman Mobilization] Draft a Build Army (Turkey)":
				case "[Francs-tireurs] Draft a French Build Army card":
				case "[Paris Taxis] Draft a French Build Army card":
				case "[France Mobilizes] Draft a French Build Army card":
				case "[The Sunny Days of May] Draft an Italian Build Army card":
				case "[First Lord of the Admiralty Prepares for War] Draft a Build Navy (UK)":
				case "[The Grand Fleet] Draft a Build Navy (UK)":
				case "[American Public Outraged by Zimmermann Telegram] Draft a Build Navy (US)":
				case "[American Public Outraged by Zimmermann Telegram] Draft a Build Army (US)":
					ok = 2 >= z.step && z.drawDecks[me].length > 0;
					break;
				case "[Francs-tireurs] Draft a French Land Battle card":
				case "[Paris Taxis] Draft a French Land Battle card":
				case "[France Mobilizes] Draft a French Land Battle card":
					ok = 2 >= z.step && z.drawDecks[me].length > 0 && z.statuses[me].includes(28);
					break;
				case "[The Grand Fleet] Build a UK Navy in the North Atlantic":
					ok = 2 >= z.step && canBuildNavyIn("UK","NAO");
					break;
				case "[The Grand Fleet] Build a UK Navy in the North Sea":
					ok = 2 >= z.step && canBuildNavyIn("UK","NTH");
					break;
				case "[The Grand Fleet] Build a UK Navy in the English Channel":
					ok = 2 >= z.step && canBuildNavyIn("UK","ENG");
					break;
				case "[The Sunny Days of May] Build an Italian Army in Rome":
					ok = 2 >= z.step && canBuildArmyIn("Italy","ROM");
					break;
				case "[The Sunny Days of May] Build an Italian Army in the Italian Alps":
					ok = 2 >= z.step && canBuildArmyIn("Italy","ALP");
					break;
				case "[Armée d'Afrique] Draft a French Build Army card":
					ok = 2 >= z.step && z.drawDecks[me].length > 0 && z.countries.France.navies.includes("NAO");
					break;
				case "[Armée d'Afrique] Draft a French Land Battle card":
					ok = 2 >= z.step && z.drawDecks[me].length > 0 && z.countries.France.navies.includes("NAO") && z.statuses[me].includes(28);
					break;	
				case "[Franz Ferdinand Avenged] Build an AH Army in Serbia":
					ok = 2 >= z.step && canBuildArmyIn("AH","SER");
					break;
				case "[Isonzo River Offensives] Build an Italian Army in the Italian Alps":
					ok = 2 >= z.step && canBuildArmyIn("Italy","ALP");
					break;
				case "[Isonzo River Offensives] Battle in Tyrol":
					ok = 2 >= z.step && canLandBattleIn("Italy","TYR") && z.countries.Italy.supply.includes("ALP");
					break;
				case "[Franz Ferdinand Avenged] Battle in Serbia":
					ok = 2 >= z.step && canLandBattleIn("AH","SER");
					break;
				case "[Brudermann Orders Cavalry Charge] Build an AH Army in Galicia":
					ok = 2 >= z.step && canBuildArmyIn("AH","GAL");
					break;
				case "[Brudermann Orders Cavalry Charge] Battle in Galicia":
					ok = 2 >= z.step && canLandBattleIn("AH","GAL");
					break;
				case "[Morava Offensive] Battle adjacent to Bulgaria":
					ok = 2 >= z.step && (canLandBattleIn("AH","GRE") || canLandBattleIn("AH","SER") || canLandBattleIn("AH","RUM") || canLandBattleIn("AH","IST"));
					break;
				case "[Romanians Advance in Transylvania] Battle adjacent to Romania":
					ok = 2 >= z.step && (canLandBattleIn("France","UKR") || canLandBattleIn("France","GAL") || canLandBattleIn("France","BUD") || canLandBattleIn("France","BUD") 
					|| canLandBattleIn("France","SER") || canLandBattleIn("France","BUL"));
					break;
				case "[Caporetto] Battle in the Italian Alps":
					ok = 2 >= z.step && canLandBattleIn("AH","ALP");
					break;
				case "[Caporetto] Build an AH Army in the Italian Alps":
					ok = 2 >= z.step && canBuildArmyIn("AH","ALP");
					break;
				case "[I Order You to Die] Eliminate an Entente Army in Istanbul":
					ok = 2 >= z.step && (z.countries.Russia.armies.includes("IST") || z.countries.France.armies.includes("IST") || z.countries.Italy.armies.includes("IST") || z.countries.UK.armies.includes("IST"));
					break;
				case "Build an Army":
					if(me === 1){
						ok = 2 >= z.step && canBuildArmy("Russia");
					} else if (me === 2){
						ok = 2 >= z.step && canBuildArmy("Germany");
					}
					break;
				case "Build an AH Army":
					ok = 2 >= z.step && canBuildArmy("AH");
					break;
				case "Build a Turkish Army":
					ok = 2 >= z.step && canBuildArmy("Turkey");
					break;
				case "Build a French Army":
					ok = 2 >= z.step && canBuildArmy("France");
					break;
				case "Build an Italian Army":
					ok = 2 >= z.step && canBuildArmy("Italy");
					break;
				case "Build a UK Army":
					ok = 2 >= z.step && canBuildArmy("UK");
					break;
				case "Build a US Army":
					ok = 2 >= z.step && canBuildArmy("US");
					break;
				case "Build a Navy":
					if(me === 1){
						ok = 2 >= z.step && canBuildNavy("Russia");
					} else if (me === 2){
						ok = 2 >= z.step && canBuildNavy("Germany");
					}
					break;
				case "Build an AH Navy":
					ok = 2 >= z.step && canBuildNavy("AH");
					break;
				case "Build a French Navy":
					ok = 2 >= z.step && canBuildNavy("France");
					break;
				case "Build an Italian Navy":
					ok = 2 >= z.step && canBuildNavy("Italy");
					break;
				case "Build a UK Navy":
					ok = 2 >= z.step && canBuildNavy("UK");
					break;
				case "Build a US Navy":
					ok = 2 >= z.step && canBuildNavy("US");
					break;
				case "Remove a piece from the board":
					ok = canRemovePiece() && noBattle();
					break;
				case "[Peace, Bread, Land] Remove a piece from the board":
					ok = 2 >= z.step && canRemovePiece();
					break;
				case "[Play Step] Play a card":
					ok = 1 >= z.step && z.hands[me].length > 0;
					break;
				case "[Attrition Step] Play a prepared Attrition card":
					ok = 2 >= z.step && canAttrition() && noBattle();
					break;
				case "[Prepare Step] Prepare a card":
					ok = 3 >= z.step && z.hands[me].length > 0 && noBattle();
					break;
				case "[Prepare Step] Unprepare a card":
					ok = 3 >= z.step && z.prepared[me].length > 0 && noBattle();
					break;
				case "[Draw Step] Draw card(s) from your draw deck":
					ok = z.drawDecks[me].length > 0 && 7 > z.hands[me].length && noBattle();
					break;	
				case "[Rumpler Taube Air Reconnaissance]":
					ok = canRumplerTaube();
					break;
				case "[Troupes Coloniales] Draft a French Build Army":
					ok = z.step === 0 && z.statuses[me].includes(29) && z.countries.France.navies.includes("WES") && z.drawDecks[me].length > 0;
					break;
				case "[Woe to Them That Yet Draw Sword Against Me] Prepare a card":
					ok = z.step === 0 && z.hands[me].length >= 1 && woeToThem();
					break;
				case "[Draft Step] Discard a card from hand":
					ok = z.step === 0 && z.hands[me].length >= 2 && z.drawDecks[me].length > 0;
					break;
				case "[Draft Step] Discard a second card from hand":
					ok = z.step === 0 && z.hands[me].length >= 1 && z.drawDecks[me].length > 0;
					break;
				case "[Draft Step] Draft a Build Army":
				case "[Draft Step] Draft a Build Navy":
				case "[Draft Step] Draft a Build Army (AH)":
				case "[Draft Step] Draft a Build Navy (AH)":
				case "[Draft Step] Draft a Build Army (Turkey)":
				case "[Draft Step] Draft a Build Army (France)":
				case "[Draft Step] Draft a Build Navy (France)":
				case "[Draft Step] Draft a Build Army (Italy)":
				case "[Draft Step] Draft a Build Navy (Italy)":
				case "[Draft Step] Draft a Build Army (UK)":
				case "[Draft Step] Draft a Build Navy (UK)":
				case "[Draft Step] Draft a Build Army (US)":
				case "[Draft Step] Draft a Build Navy (US)":
					ok = z.step === 0 && z.drawDecks[me].length > 0;
					break;
				case "[Barès Expands Armée de l'Air] Draft a French Land Battle":
					ok = z.step === 0 && z.statuses[me].includes(28) && z.drawDecks[me].length > 0;
					break;
				case "[The Pals Battalions] Draft a UK Build Army from discards (-1 VP)":
					ok = z.step === 0 && z.statuses[me].includes(27) && z.drawDecks[me].length > 0;
					break;
				case "[Commonwealth Support] Build Army (UK)":
					ok = 1 >= z.step && canCommonwealthSupport();
					break;
				case "[The Girls with Yellow Hands] Land Battle (UK)":
					ok = 1 >= z.step && canGirlsWithYellowHands();
					break;
				case "[The Extravagant Lifestyle of the Aristocracy] Discard a card from hand":
					ok = 2 >= z.step && z.hands[me].length > 0;
					break;
				case "[The Extravagant Lifestyle of the Aristocracy] Discard another card from hand":
					ok = 2 >= z.step && z.hands[me].length > 0;
					break;
				case "[Unrestricted Submarine Warfare] Discard a Sea Battle card from hand":
					ok = 2 >= z.step && canUnrestrictedSubmarineWarfare();
					break;
				case "[Third OHL] Draft a Build Army card":
				case "[Volunteer Movement] Draft a Build Army card":
					ok = 2 >= z.step && z.drawDecks[me].length > 0;
					break;
				case "[Third OHL] Play a Status card":
				case "[Moltke the Younger Mobilizes Western Advance] Play a Status card":
				case "[Ninth Army Formed to Defend East Prussia] Play a Status card":
				case "[Prussian Military Tradition] Play a Status card":
				case "[Volunteer Movement] Play a Status card":
				case "[Landwehr] Play a Status card":
					ok = 2 >= z.step && hasStatusInHand();
					break;
				case "[The Royal Navy] Play a Status card":
				case "[Cambrai] Play a Status card":
					ok = 2 >= z.step && hasStatusInHand(true);
					break;
				case "[The Royal Navy] Recruit a UK Navy":
				case "[The Royal Navy] Recruit another UK Navy":
					ok = 2 >= z.step && (canRecruitNavyIn("UK","EAS") || canRecruitNavyIn("UK","WES") || canRecruitNavyIn("UK","NAO") || canRecruitNavyIn("UK","ENG"));
					break;
				case "[Third OHL] Play an Economic Warfare card":
					ok = 2 >= z.step && hasEconomicWarfareInHand();
					break;
				case "[Persian Oil] Build a Turkish Army in Persia":
					ok = 2 >= z.step && canBuildArmyIn("Turkey","PER");
					break;
				case "[A Crumbling Empire] Build a Turkish Army in the Middle East":
					ok = 2 >= z.step && canBuildArmyIn("Turkey","MID");
					break;
				case "[Russia Mobilizes] Build an Army within 2 spaces of Moscow":
				case "[Russia Mobilizes] Build another Army within 2 spaces of Moscow":
					ok = 2 >= z.step && (canBuildArmyIn("Russia","MOS") || canBuildArmyIn("Russia","PET") || canBuildArmyIn("Russia","UKR") || canBuildArmyIn("Russia","CAU") || canBuildArmyIn("Russia","POL") || canBuildArmyIn("Russia","GAL") || canBuildArmyIn("Russia","AZE"));
					break;
				case "[Cossacks] Build an Army in or adjacent to Moscow":
					ok = 2 >= z.step && (canBuildArmyIn("Russia","MOS") || canBuildArmyIn("Russia","PET") || canBuildArmyIn("Russia","UKR") || canBuildArmyIn("Russia","CAU"));
					break;
				case "[Plan XVII] Build an Army in or adjacent to Paris":
					ok = 2 >= z.step && (canBuildArmyIn("France","PAR") || canBuildArmyIn("France","BUR") || canBuildArmyIn("France","PRO") || canBuildArmyIn("France","PIC"));
					break;
				case "[Redl Blackmailed] Discard a card from AH/T's hand":
					/*RULES: If Russia plays Redl Blackmailed when AH/T has an empty hand, does Austria lose a VP? */
					ok = 2 >= z.step && z.hands[0].length > 0;
					break;
				case "[Ninth Army Formed to Defend East Prussia] Build an Army in or adjacent to Prussia":
				case "[Tannenberg] Build an Army in or adjacent to Prussia":
					ok = 2 >= z.step && canBuildArmyIn("Germany","PRU");
					for(let j = 0; !ok && !(j>=provinces.PRU.neighbors.length); j++){
						ok = 2 >= z.step && canBuildArmyIn("Germany",provinces.PRU.neighbors[j]);
					}
					break;
				case "[Hindenburg Line] Build an Army in or adjacent to Picardy":
					ok = 2 >= z.step && canBuildArmyIn("Germany","PIC");
					for(let j = 0; !ok && !(j>=provinces.PIC.neighbors.length); j++){
						ok = 2 >= z.step && canBuildArmyIn("Germany",provinces.PIC.neighbors[j]);
					}
					break;
				case "[Moltke the Younger Mobilizes Western Advance] Build an Army in or adjacent to Western Germany":
					ok = 2 >= z.step && canBuildArmyIn("Germany","WGE");
					for(let j = 0; !ok && !(j>=provinces.WGE.neighbors.length); j++){
						ok = 2 >= z.step && canBuildArmyIn("Germany",provinces.WGE.neighbors[j]);
					}
					break;
				case "[Brusilov Offensive] Build an Army in or adjacent to Galicia":
					ok = 2 >= z.step && canBuildArmyIn("Russia","GAL");
					for(let j = 0; !ok && !(j>=provinces.GAL.neighbors.length); j++){
						ok = 2 >= z.step && canBuildArmyIn("Russia",provinces.GAL.neighbors[j]);
					}
					break;
				case "[Brusilov Offensive] Battle in or adjacent to Galicia":
					ok = 2 >= z.step && canLandBattleIn("Russia","GAL");
					for(let j = 0; !ok && !(j>=provinces.GAL.neighbors.length); j++){
						ok = 2 >= z.step && canLandBattleIn("Russia",provinces.GAL.neighbors[j]);
					}
					break;
				case "[Tannenberg] Battle a Land space in or adjacent to Prussia":
					ok = 2 >= z.step && canLandBattleIn("Germany","PRU");
					for(let j = 0; !ok && !(j>=provinces.PRU.neighbors.length); j++){
						ok = 2 >= z.step && canLandBattleIn("Germany",provinces.PRU.neighbors[j]);
					}
					break;
				case "[East Prussian Offensive] Build an Army in or adjacent to Poland":
					ok = 2 >= z.step && canBuildArmyIn("Russia","POL");
					for(let j = 0; !ok && !(j>=provinces.POL.neighbors.length); j++){
						ok = 2 >= z.step && canBuildArmyIn("Russia",provinces.POL.neighbors[j]);
					}
					break;
				case "[East Prussian Offensive] Battle in or adjacent to Poland":
					ok = 2 >= z.step && canLandBattleIn("Russia","POL");
					for(let j = 0; !ok && !(j>=provinces.POL.neighbors.length); j++){
						ok = 2 >= z.step && canLandBattleIn("Russia",provinces.POL.neighbors[j]);
					}
					break;
				case "[Gorlice-Tarnów Offensive] Battle in or adjacent to Poland":
					ok = 2 >= z.step && canLandBattleIn("Germany","POL");
					for(let j = 0; !ok && !(j>=provinces.POL.neighbors.length); j++){
						ok = 2 >= z.step && canLandBattleIn("Germany",provinces.POL.neighbors[j]);
					}
					break;
				case "[Grand Duke Nicholas Nikolaevich Appointed Viceroy] Build an Army in or adjacent to Azerbaijan":
					ok = canBuildArmyIn("Russia","AZE");
					for(let j = 0; !ok && !(j>=provinces.AZE.neighbors.length); j++){
						ok = canBuildArmyIn("Russia",provinces.AZE.neighbors[j]);
					}
					break;
				case "[Sidney Reilly] Recruit a UK Army in or adjacent to Moscow":
					ok = canRecruitArmyIn("UK","MOS");
					for(let j = 0; !ok && !(j>=provinces.MOS.neighbors.length); j++){
						ok = canRecruitArmyIn("UK",provinces.MOS.neighbors[j]);
					}
					break;
				case "[Grand Duke Nicholas Nikolaevich Appointed Viceroy] Battle in or adjacent to Azerbaijan":
					ok = 2 >= z.step && canLandBattleIn("Russia","AZE");
					for(let j = 0; !ok && !(j>=provinces.AZE.neighbors.length); j++){
						ok = 2 >= z.step && canLandBattleIn("Russia",provinces.AZE.neighbors[j]);
					}
					break;	
				case "[Passchendaele] Battle in or adjacent to Belgium":
					ok = canLandBattleIn("UK","BEL");
					for(let j = 0; !ok && !(j>=provinces.BEL.neighbors.length); j++){
						ok = canLandBattleIn("UK",provinces.BEL.neighbors[j]);
					}
					if(z.step > 2){
						ok = false;
					}
					break;
				case "[The Somme] Battle in or adjacent to Picardy":
				case "[Cambrai] Battle in or adjacent to Picardy":
					ok = canLandBattleIn("UK","PIC");
					for(let j = 0; !ok && !(j>=provinces.PIC.neighbors.length); j++){
						ok = canLandBattleIn("UK",provinces.PIC.neighbors[j]);
					}
					if(z.step > 2){
						ok = false;
					}
					break;
				case "[A Place in the Sun] Build an Army into a space not considered difficult terrain":	
					ok = false;
					for(let x in provinces){
						if(provinces[x].terrain === "Clear" && canBuildArmyIn("Germany",x)){
							for(let j = 0; !ok && !(j>= provinces[x].neighbors.length); j++){
								if(provinces[provinces[x].neighbors[j]].terrain !== "Sea" && z.countries.Germany.supply.includes(provinces[x].neighbors[j])){
									ok = true;
								}
							}
						}
					}
					if(z.step > 2){
						ok = false;
					}
					break;
				case "[Gorlice-Tarnów Offensive] Build a piece in an empty space in or adjacent to Poland":
					ok = false;
					let poss = ["POL"];
					poss = poss.concat(provinces.POL.neighbors);
					for(let k = 0; !(k>=poss.length); k++){
						let x = poss[k];
						if(canBuildArmyIn("Germany",x)){
							if(z.hands[me].length > 0){
								ok = true;
								break;
							}
							for(let j = 0; !ok && !(j>= provinces[x].neighbors.length); j++){
								if(provinces[provinces[x].neighbors[j]].terrain === "Clear" && provinces[x].terrain === "Clear" && z.countries.Germany.supply.includes(provinces[provinces[x].neighbors[j]])){
									ok = true;
									break;
								}
							}
							
						}
					}
					if(z.step > 2){
						ok = false;
					}
					break;
				case "[Lawrence Foments Arab Revolts] Recruit a UK Army in the Middle East":
					ok = 2 >= z.step && canRecruitArmyIn("UK","MID");
					break;
				case "[Lawrence Foments Arab Revolts] Eliminate a Turkish Army in the Middle East":
					ok = 2 >= z.step && z.countries.Turkey.armies.includes("MID");
					if(limitedRailAndRoadNetwork() && z.hands[me].length === 0){
						ok = false;
					}
					break;
				case "[Sidney Reilly] Discard a Status card":
					ok = z.statuses[me].length > 0;
					break;
				case "[First Lord of the Admiralty Prepares for War] Play a UK Status card":
				case "[Asquith Sends Ultimatum] Play a UK Status card":
					ok = false;
					for(let j = 0; !ok && 2 >= z.step && !(j>=z.hands[me].length); j++){
						if(cardType(z.hands[me][j]) === "Status" && country(z.hands[me][j]) === "UK"){
							ok = true;
						}
					}
					break;
				case "[Persian Campaign] Recruit a UK Army in Persia":
					ok = 2 >= z.step && canRecruitArmyIn("UK","PER");
					break;
				case "[Provisional Government of National Defence] Recruit a UK Army in Greece":
					ok = 2 >= z.step && canRecruitArmyIn("UK","GRE");
					break;
				case "[Tunnel Mines] Make Germany discard 2 prepared cards":
					ok = false;
					for(let j = 0; !ok && !(j>=z.countries.UK.armies.length); j++){
						let province = z.countries.UK.armies[j];
						if(province === ""){
							continue;
						}
						for(let k = 0; !ok && !(k>=provinces[province].neighbors.length); k++){
							if(z.countries.Germany.armies.includes(provinces[province].neighbors[k])){
								ok = true;
							}
						}
					}
					if(z.step > 2){
						ok = false;
					}
					break;
				case "[Tunnel Mines] Make AH/T discard 2 prepared cards":
					ok = false;
					for(let j = 0; !ok && !(j>=z.countries.UK.armies.length); j++){
						let province = z.countries.UK.armies[j];
						if(province === ""){
							continue;
						}
						for(let k = 0; !ok && !(k>=provinces[province].neighbors.length); k++){
							if(z.countries.AH.armies.includes(provinces[province].neighbors[k])){
								ok = true;
							}
							if(z.countries.Turkey.armies.includes(provinces[province].neighbors[k])){
								ok = true;
							}
						}
					}
					if(z.step > 2){
						ok = false;
					}
					break;
				case "[Passchendaele] Discard a prepared card":
					ok = (2 >= z.step || me === 2) && z.prepared[me].length > 0;
					break;
				case "[Gallipoli] Battle Istanbul":
					ok = 2>=z.step && canLandBattleIn("UK","IST");
					break;
				case "[Gallipoli] Build a UK Army in Istanbul":
					ok = 2 >= z.step && canBuildArmyIn("UK","IST");
					break;
				case "[Gallipoli] Build a UK Navy in the Eastern Mediterranean":
					ok = 2 >= z.step && canBuildNavyIn("UK","EAS");
					break;
				case "[Belgium Resists] Recruit a UK Army in Belgium":
					ok = 2 >= z.step && canRecruitArmyIn("UK","BEL");
					break;
				case "[War Revenue Act] Take a US card from your discard pile":
					ok = false;
					for(let j = 0; !ok && !(j>=z.upDiscards[me].length); j++){
						ok = country(z.upDiscards[me][j]) === "US" && z.upDiscards[me][j] !== 49;
					}
					for(let j = 0; !ok && !(j>=z.downDiscards[me].length); j++){
						ok = country(z.downDiscards[me][j]) === "US" && z.downDiscards[me][j] !== 49;
					}
					if(z.step > 2){
						ok = false;
					}
					break;
				case "[Mark IV Tanks] Battle an empty space to build a UK Army":
					ok = false;
					for(let j = 0; !ok && !(j>=z.countries.UK.armies.length); j++){
						let source = z.countries.UK.armies[j];
						if(source === ""){
							continue;
						}
						if(!z.countries.UK.supply.includes(source)){
							continue;
						}
						for(let k = 0; !ok && !(k>=provinces[source].neighbors.length); k++){
							let target = provinces[source].neighbors[k];
							if(provinces[target].terrain !== "Clear"){
								continue;
							}
							if(z.countries.Germany.armies.includes(target) || z.countries.AH.armies.includes(target) || z.countries.Turkey.armies.includes(target)){
								continue;
							}
							for(let l = 0; !ok && !(l>=z.prepared[me].length); l++){
								let card = z.prepared[me][l];
								if(country(card) === "UK" && (prepareSymbol(card) === "SLB" || prepareSymbol(card) === "SLBx2")){
									if(prepareText(card) === ""){
										ok = true;
									} else if(prepareText(card).includes(target)){
										ok = true;
									}
								}
							}
						}
					}
					if(z.step > 2 || z.mkIV){
						ok = false;
					}
					break;
			}
			if(ok){
				options.push(z.options[me][j]);
				promptText += "\n"+options.length+": "+z.options[me][j];
			}
		}
		promptText = "What would you like to do? "+promptText;
		promptText += "\nA: Private Game State Report (and exit)\nB: Public Game State Report (and exit)";
		promptText += "\nC: [Manual Fixes]";
		promptNum(promptText,(a)=>1>a||a>options.length,()=>{
			t.value += "[h"+"r]";
			clearSpoilers();
			postSeed();
		},(prompted)=>{
			if(prompted === "a" || prompted === "A"){
				let report = size(bold(powerName), 12) + ":\r\n";
				report += bold("Draw Deck") + ": " + z.drawDecks[me].length + "\r\n";
				report += bold("Hand") + ": " + z.hands[me].length + "\r\n";
				z.hands[me].forEach(function(elt) {
					report += cardImage(elt) + "\r\n";
				});
				report += bold("Prepared") + ": " + z.prepared[me].length + "\r\n";
				z.prepared[me].forEach(function(elt) {
					report += cardImage(elt) + "\r\n";
				});
				report +=
				bold("Discards") +
				": " +
				(z.upDiscards[me].length + z.downDiscards[me].length) +
				"\r\n";
				z.upDiscards[me].forEach(function(elt) {
					report += cardImage(elt) + "\r\n";
				});
				z.downDiscards[me].forEach(function(elt) {
					report += cardImage(elt) + "\r\n";
				});
				report += bold("Statuses") + ": " + z.statuses[me].length + "\r\n";
				z.statuses[me].forEach(function(elt) {
					report += title(elt) + "\r\n";
				});
				if(z.bottomed !== undefined && z.drawDecks[me].length > 0){
					report += z.bottomed[me] + "\r\n";
				}
				if(z.redlReport && me === 1){
					report += z.redlReport;
				}
				report += boardImage();
				for(let j = 0; !(j>=5); j++){
					report += publicReport(j);
				}
				report += clear();
				t.value += spoiler(report);
				postSeed();
				return;
			} else if (prompted === "b" || prompted === "B"){
				t.value += boardImage();
				for(let j = 0; !(j>=5); j++){
					t.value += publicReport(j);
				}
				t.value += clear();
				clearSpoilers();
				postSeed();
				return;
			} else if (prompted === "c" || prompted === "C"){
				let promptText = "You should only use these options if someone made a mistake or there's a bug.\n\nWhat would you like to do? (0-16)"
				+"\n1: Play a card from hand\n2: Prepare a card\n3: Use a prepared card\n4: Discard a card from hand\n5: Discard a prepared card"
				+"\n6: Discard from the top of your draw deck\n7: Draw card(s) from your draw deck\n8: Unprepare a card\n9: Draft a card"
				+"\n10: Discard a status (rare)\n11: Place a piece\n12: Remove a piece\n13: Change the Entente score\n14: Change the CP score"
				+"\n15: Advance the turn.\n16: Change dialog display style\n17: Change my username\n18: Check for script updates";
				promptText += "\n\nIf you need to do Pals Battalions or War Revenue act manually, please contact Grafin.";
				promptNum(promptText,(a)=>1>a||a>19,mainMenu,(prompted)=>{
					switch(prompted){
						case 18:{
							confirmify(
							"Confirming you want to quit QMG and apply any pending updates.\n\nYou probably don't want to do this unless you were instructed to do so.",
							mainMenu, () => {
								window.localStorage.setItem("qmgUrgent", "requested");
								clearSpoilers();
								postSeed();
							});
							break;
						}
						case 17:{
							let promptText = "What is your new username?  You should only change this if there was a typo or a player resigned.";
							promptString(promptText,mainMenu,(prompted)=>{
								z.usernames[me] = prompted;
								clearSpoilers();
								postSeed();
							});
							break;
						}
						case 1:
							playFromHand().then(mainMenu,mainMenu);
							break;
						case 2:	
							prepareCard().then(mainMenu,mainMenu);
							break;
						case 3: {
							let promptText = "Which prepared card would you like to use? (1-"+z.prepared[me].length+")";
							for(let j = 0; !(j>=z.prepared[me].length); j++){
								promptText += "\n"+(j+1)+": "+cardText(z.prepared[me][j]);
							}
							promptNum(promptText,(a)=>1>a||a>z.prepared[me].length,mainMenu,(prompted)=>{
								let card = z.prepared[me][prompted-1];
								z.upDiscards[me].unshift(card);
								z.prepared[me].splice(prompted-1,1);
								t.value += bold("Using prepared card: "+cardImage(card))+"\r\n";
								addAlert("Using prepared card: "+cardText(card));
								mainMenu();
							});
						break; }
						case 4:
							discardFromHand().then(mainMenu,mainMenu);
							break;
						case 5:
							discardPrepared().then(mainMenu,mainMenu);
							break;
						case 6:
							discardFromDeck().then(mainMenu,mainMenu);
							break;
						case 7:
							drawCards().then(mainMenu,mainMenu);
							break;
						case 8:
							unprepareCard().then(mainMenu,mainMenu);
							break;
						case 9: 
							/* TODO: restore this? */
							addAlert("Manual drafting is no longer supported; contact Grafin if you really need to do this.");
							mainMenu();
							break;
						case 10:
							discardStatus().then(mainMenu,mainMenu);
							break;
						case 11: {
							let options = [];
							let promptText = "";
							for(let x in provinces){
								options.push(x);
								promptText += "\n"+options.length+": "+x;
							}
							promptText = "Where would you like to place a piece? (1-"+options.length+")"+promptText;
							promptNum(promptText,(a)=>1>a||a>options.length,mainMenu,(prompted)=>{						
								let province = options[prompted-1];
								let promptText = "Which country's piece would you like to place in "+province+"? (1-8)";
								let options2 = [];
								for(let x in z.countries){
									options2.push(x);
									promptText += "\n"+options2.length + ": " +x;
								}
								promptNum(promptText,(a)=>1>a||a>options2.length,mainMenu,(prompted)=>{
									let country = options2[prompted-1];
									let placed = false;
									if(provinces[province].terrain === "Sea"){
										for(let j = 0; !placed && !(j>=z.countries[country].navies.length); j++){
											if(z.countries[country].navies[j] === ""){
												z.countries[country].navies[j] = province;
												boldAlert("Placed a "+country+" Navy in "+province+".");
												updateSupply(country);
												placed = true;
											}
										}
									} else {
										for(let j = 0; !placed && !(j>=z.countries[country].armies.length); j++){
											if(z.countries[country].armies[j] === ""){
												z.countries[country].armies[j] = province;
												boldAlert("Placed a "+country+" Army in "+province+".");
												updateSupply(country);
												placed = true;
											}
										}
									}
									if(!placed){
										addAlert(country+" has no units to place! Remove one first.");
									}
									mainMenu();
								});
							});
							break; }
						case 12: {
							let options = [];
							let promptText = "";
							for(let x in provinces){
								options.push(x);
								promptText += "\n"+options.length+": "+x;
							}
							promptText = "Where would you like to remove a piece? (1-"+options.length+")"+promptText;
							promptNum(promptText,(a)=>1>a||a>options.length,mainMenu,(prompted)=>{
								let province = options[prompted-1];
								let promptText = "Which country's piece would you like to remove from "+province+"? (1-8)";
								let options2 = [];
								for(let x in z.countries){
									options2.push(x);
									promptText += "\n"+options2.length + ": " +x;
								}
								promptNum(promptText,(a)=>1>a||a>options2.length,mainMenu,(prompted)=>{
									let country = options2[prompted-1];
									let placed = false;
									if(provinces[province].terrain === "Sea"){
										for(let j = 0; !placed && !(j>=z.countries[country].navies.length); j++){
											if(z.countries[country].navies[j] === province){
												z.countries[country].navies[j] = "";
												boldAlert("Removed a "+country+" Navy from "+province+".");
												placed = true;
											}
										}
									} else {
										for(let j = 0; !placed && !(j>=z.countries[country].armies.length); j++){
											if(z.countries[country].armies[j] === province){
												z.countries[country].armies[j] = "";
												boldAlert("Removed a "+country+" Army from "+province+".");
												placed = true;
											}
										}
									}
									if(!placed){
										addAlert(country+" has no piece in that space!");
									} else {
										z.attacker = null;
										z.target = null;
										z.source = null;
										z.defenders = [];
										z.defending = [];
										z.revealedDouble = false;
									}
									mainMenu();
								});
							});
							break; }
						case 13: 
							promptNum("How much would you like to increase the Entente score by (use negative numbers to decrease it)?",()=>false,mainMenu,(prompted)=>{
								modifyEntente(prompted);
								mainMenu();
							});
							break;
						case 14: 
							promptNum("How much would you like to increase the Central Powers score by (use negative numbers to decrease it)?",()=>false,mainMenu,(prompted)=>{
								modifyCP(prompted);
								mainMenu();
							});
							break;
						case 15: {
							advanceTurn();
							mainMenu();
							break;
						}
						case 16: {
							let promptText = "Which style of dialog boxes would you like to use?";
							let styles = ["Classic","Modern","Modern (text-only)"];
							for(let j = 0; !(j>=styles.length); j++){
								promptText += "\n"+(j+1)+": "+styles[j];
								if(z.promptStyle[me] === j){
									promptText += " (you're using this now)";
								}
							}
							promptNum(promptText,(a)=>1>a||a>styles.length,mainMenu,(choice)=>{
								if(choice - 1 !== z.promptStyle[me]){
									addAlert("Styles switched; reload NMWS to see the new style!");
									z.promptStyle[me] = choice - 1;
									clearSpoilers();
									postSeed();
								} else {
									addAlert("You chose not to switch styles.");
									mainMenu();
								}
							});
						}
					}
				});
				return;
			} 
			let ch = options[prompted-1];
			if (ch === "[Prepare Step] Prepare a card"){
				prepareCard().then(()=>{
					z.step = 4;
					if(z.hands[me].length >= 7 || z.drawDecks[me].length === 0){
						/* TODO: careful here...currently only thing that carries over is attrition. */
						advanceTurn();
						clearSpoilers();
						postSeed();
					} else {
						mainMenu();
					}
				},mainMenu);
			} else if (ch === "[Commonwealth Support] Build Army (UK)"){
				z.step = 2;
				t.value += "The UK will use Commonwealth Support to build an army.\r\n";
				addAlert("Using Commonwealth Support to build an army.");
				z.options[me].unshift("Build a UK Army");
				mainMenu();
			} else if (ch === "[The Girls with Yellow Hands] Land Battle (UK)"){
				z.step = 2;
				t.value += "The UK will use The Girls With Yellow Hands to perform a Land Battle.\r\n";
				addAlert("Using The Girls With Yellow Hands for a Land Battle.");
				z.options[me].unshift("Land Battle (UK)");
				mainMenu();
			} else if (ch === "End Turn"){
				confirmify("Confirming you want to end your turn.",mainMenu,()=>{
					advanceTurn();
					clearSpoilers();
					postSeed();
				});
			} else if (ch === "[War Revenue Act] Take a US card from your discard pile"){
				let cards = [];
				let promptText = "";
				for(let j = 0; !(j>=z.upDiscards[me].length); j++){
					if(country(z.upDiscards[me][j]) === "US" && z.upDiscards[me][j] !== 49){
						cards.push(z.upDiscards[me][j]);
						promptText += "\n"+cards.length+": "+cardText(z.upDiscards[me][j]);
					}
				}
				for(let j = 0;  !(j>=z.downDiscards[me].length); j++){
					if(country(z.downDiscards[me][j]) === "US" && z.downDiscards[me][j] !== 49){
						cards.push(z.downDiscards[me][j]);
						promptText += "\n"+cards.length+": "+cardText(z.downDiscards[me][j]);
					}
				}
				promptText = "Which US card would you like to take from your discard pile? (1-"+cards.length+")"+promptText;
				promptNum(promptText,(a)=>1>a||a>cards.length,mainMenu,(prompted)=>{
					let card = cards[prompted-1];
					if(z.upDiscards[me].includes(card)){
						z.upDiscards[me].splice(z.upDiscards[me].indexOf(card),1);
					} else {
						z.downDiscards[me].splice(z.downDiscards[me].indexOf(card),1);
					}
					z.warRevenueAct.push(card);
					/* RULES: I assume you must get rid of all cards you take from War Revenue Act */
					switch(z.warRevenueAct.length){
						case 1:
							z.options[me].unshift("[War Revenue Act] Play a card you took from your discards");
							z.options[me].unshift("[War Revenue Act] Prepare a card you took from your discards");
							z.options[me].unshift("[War Revenue Act] Place a card you took from your discards at the bottom of your draw deck");
							break;
						case 2:
							removeOption("[War Revenue Act] Place a card you took from your discards at the bottom of your draw deck");
							break;
						case 3:
							removeOption(ch);
							removeOption("[War Revenue Act] Prepare a card you took from your discards");
							break;							
					}
					mainMenu();
				});
			} else if (ch === "[War Revenue Act] Play a card you took from your discards"){
				let promptText = "Which card would you like to play with War Revenue Act? (1-"+z.warRevenueAct.length+")";
				for(let j = 0; !(j>=z.warRevenueAct.length); j++){
					promptText += "\n"+(j+1)+": "+cardText(z.warRevenueAct[j]);
				}
				if(z.warRevenueAct.length !== 3){
					promptText += "\nMake sure you have taken all the cards from your discards that you want to use first.";
				}
				promptNum(promptText,(a)=>1>a||a>z.warRevenueAct.length,mainMenu,(prompted)=>{
					removeOption(ch);
					removeOption("[War Revenue Act] Take a US card from your discard pile");
					switch(z.warRevenueAct.length){
						case 3:
							z.options[me].unshift("[War Revenue Act] Prepare a card you took from your discards");
							break;
						case 2:
							z.options[me].unshift("[War Revenue Act] Place a card you took from your discards at the bottom of your draw deck");
							break;
						case 1:
							removeOption("[War Revenue Act] Place a card you took from your discards at the bottom of your draw deck");
							removeOption("[War Revenue Act] Prepare a card you took from your discards");
							break;
					}
					let card = z.warRevenueAct.splice(prompted-1,1)[0];
					z.hands[me].push(card);
					playCard(card);
					mainMenu();
				});
			} else if (ch === "[War Revenue Act] Prepare a card you took from your discards"){
				let promptText = "Which card would you like to prepare with War Revenue Act? (1-"+z.warRevenueAct.length+")";
				for(let j = 0; !(j>=z.warRevenueAct.length); j++){
					promptText += "\n"+(j+1)+": "+cardText(z.warRevenueAct[j]);
				}
				if(z.warRevenueAct.length !== 2){
					promptText += "\nMake sure you have taken all the cards from your discards that you want to use first.";
				}
				promptNum(promptText,(a)=>1>a||a>z.warRevenueAct.length,mainMenu,(prompted)=>{
					removeOption(ch);
					removeOption("[War Revenue Act] Take a US card from your discard pile");
					removeOption("[War Revenue Act] Play a card you took from your discards");
					switch(z.warRevenueAct.length){
						case 2:
							z.options[me].unshift("[War Revenue Act] Place a card you took from your discards at the bottom of your draw deck");
							break;
						case 1:
							removeOption("[War Revenue Act] Place a card you took from your discards at the bottom of your draw deck");
							break;
					}
					let card = z.warRevenueAct.splice(prompted-1,1)[0];
					z.prepared[me].push(card);
					addAlert("Prepared "+cardText(card));
					t.value += bold("Prepared a card from War Revenue Act.")+"\r\n";
					mainMenu();
				});
			} else if (ch === "[War Revenue Act] Place a card you took from your discards at the bottom of your draw deck"){
				confirmify("Confirming you want to place "+cardText(z.warRevenueAct[0])+" on the bottom of your draw deck from War Revenue Act.",mainMenu,()=>{
					removeOption(ch);
					removeOption("[War Revenue Act] Take a US card from your discard pile");
					removeOption("[War Revenue Act] Play a card you took from your discards");
					removeOption("[War Revenue Act] Prepare a card you took from your discards");
					addAlert("Placed "+cardText(z.warRevenueAct[0])+" on the bottom of your draw deck from War Revenue Act.");
					if(z.bottomed !== undefined){
						z.bottomed[me] += "\r\nSince then, you placed "+cardImage(z.warRevenueAct[0])+" on the bottom of your draw deck from War Revenue Act.";
					}
					t.value += bold("Placed a card on the bottom of my draw deck from War Revenue Act.")+"\r\n";
					z.drawDecks[me].push(z.warRevenueAct.pop());
					mainMenu();
				});
			} else if (ch === "[American Public Outraged by Zimmermann Telegram] Draft a Build Navy (US)"){
				confirmify("Confirming you want to draft a Build Navy (US) for free from American Public Outraged by Zimmermann Telegram.",mainMenu,()=>{
					draftCard("Build Navy (US)").then(()=>{
						removeOption(ch);
						removeOption("[American Public Outraged by Zimmermann Telegram] Draft a Build Army (US)");
						mainMenu();
					});
				});
			} else if (ch === "[American Public Outraged by Zimmermann Telegram] Draft a Build Army (US)"){
				confirmify("Confirming you want to draft a Build Army (US) for free from American Public Outraged by Zimmermann Telegram.",mainMenu,()=>{
					draftCard("Build Army (US)").then(()=>{
						removeOption(ch);
						removeOption("[American Public Outraged by Zimmermann Telegram] Draft a Build Navy (US)");
						mainMenu();
					});
				});
			} else if (ch === "[Eddie Rickenbacker] Discard a German Status card"){
				let promptText = "Which German status would you like to discard? (1-"+z.statuses[2].length+")";
				for(let j = 0; !(j>=z.statuses[2].length); j++){
					promptText += "\n"+(j+1)+": "+cardText(z.statuses[2][j],"DE");
				}
				promptNum(promptText,(a)=>1>a||a>z.statuses[2].length,mainMenu,(prompted)=>{
					let card = z.statuses[2][prompted-1];
					z.statuses[2].splice(prompted-1,1);
					z.upDiscards[2].unshift(card);
					t.value += bold("Discarding "+cardImage(card,"DE"))+"\r\n";
					addAlert("Discarding "+cardText(card,"DE"));
					removeOption(ch);
					mainMenu();
				});
			} else if (ch === "[The Somme] Prepare a card"){
				prepareCard().then(()=>{
					removeOption(ch);
					z.options[me].unshift("[The Somme] Prepare another card");
					mainMenu();
				},mainMenu);
			} else if (ch === "[Belgium Resists] Recruit a UK Army in Belgium"){
				confirmify("Confirming you want to recruit a UK Army in Belgium from Belgium Resists.",mainMenu,()=>{
					recruitArmy("UK","BEL");
					mainMenu();
				});	
			} else if (ch === "[Gallipoli] Build a UK Navy in the Eastern Mediterranean"){
				confirmify("Confirming you want to build a UK Navy in the Eastern Mediterranean from Gallipoli.",mainMenu,()=>{
					buildNavy("UK","EAS");
					mainMenu();
				});				
			} else if (ch === "[Gallipoli] Build a UK Army in Istanbul"){
				confirmify("Confirming you want to build a UK Army in Istanbul from Gallipoli.",mainMenu,()=>{
					buildArmy("UK","IST");
					mainMenu();
				});
			} else if (ch === "[Gallipoli] Battle Istanbul"){
				confirmify("Confirming you want to battle Istanbul as a result of playing Gallipoli.",mainMenu,()=>{
					let sources = [];
					let promptText = "";
					for(let j = 0; !(j>=provinces.IST.neighbors.length); j++){
						if(z.countries.UK.supply.includes(provinces.IST.neighbors[j])){
							sources.push(provinces.IST.neighbors[j]);
							promptText += "\n"+sources.length+": "+provinces.IST.neighbors[j];
						}
					}
					if(sources.length === 1){
						removeOption(ch);
						removeOption("[Gallipoli] Build a UK Army in Istanbul");
						removeOption("[Gallipoli] Build a UK Navy in the Eastern Mediterranean");
						startBattle("UK","IST",sources[0]);
						mainMenu();
					} else if (sources.length > 1){
						promptText = "Where would you like to battle Istanbul from? (1-"+sources.length+")"+promptText;
						promptNum(promptText,(a)=>1>a||a>sources.length,mainMenu,(prompted)=>{
							removeOption(ch);
							removeOption("[Gallipoli] Build a UK Army in Istanbul");
							removeOption("[Gallipoli] Build a UK Navy in the Eastern Mediterranean");
							startBattle("UK","IST",sources[prompted-1]);
							mainMenu();
						});
					}
				});
			} else if (ch === "[Passchendaele] Discard a prepared card"){
				discardPrepared().then(()=>{
					removeOption(ch);
					if(me === 4){
						if(z.prepared[2].length === 0){
							plainAlert("Germany is hit with Passchendaele.");
							modifyCP(-1);
						} else {
							/* TODO: Germany with only 1 prepared card. */
							plainAlert("Germany must discard a prepared card.");
							z.options[2].unshift("[Passchendaele] Discard a prepared card");
						}
						if(z.statuses[4].includes(32)){
							z.options[me].unshift("[Mark IV Tanks] Battle an empty space to build a UK Army");
						}
						z.options[me].unshift("[Passchendaele] Battle in or adjacent to Belgium");
					}
					mainMenu();
				},mainMenu);
			} else if (ch ==="[Tunnel Mines] Make Germany discard 2 prepared cards"){
				confirmify("Confirming you want to make Germany discard 2 prepared cards from Tunnel Mines.",mainMenu,()=>{
					removeOption(ch);
					if(z.prepared[2].length === 0){
						plainAlert("Tunnel Mines hit Germany.");
						modifyCP(-2);
					} else {
						/* TODO: if Germany has only 1 or 2 prepared cards. */
						plainAlert("Tunnel Mines hit Germany, who must discard 2 prepared cards.");
						z.options[2].unshift("[Tunnel Mines] Discard a prepared card");
					}
					mainMenu();
				});
			} else if (ch ==="[Tunnel Mines] Make AH/T discard 2 prepared cards"){
				confirmify("Confirming you want to make AH/T discard 2 prepared cards from Tunnel Mines.",mainMenu,()=>{
					removeOption(ch);
					if(z.prepared[0].length === 0){
						plainAlert("Tunnel Mines hit AH/T.");
						modifyCP(-2);
					} else {
						/* TODO: if Austria has only 1 or 2 prepared cards. */
						plainAlert("Tunnel Mines hit AH/T, who must discard 2 prepared cards.");
						z.options[0].unshift("[Tunnel Mines] Discard a prepared card");
					}
					mainMenu();
				});
			} else if (ch === "[Tunnel Mines] Discard a prepared card"){
				discardPrepared().then(()=>{
					removeOption(ch);
					if(z.prepared[me].length === 0){
						modifyCP(-1);
					} else {
						z.options[me].unshift("[Tunnel Mines] Discard another prepared card");
					}
					mainMenu();
				},mainMenu);
			} else if (ch === "[Tunnel Mines] Discard another prepared card" || ch === "[Verdun] Discard a prepared card" 
			        || ch === "[Marne] Discard a prepared card" || ch === "[Mustard Gas] Discard a prepared card"){
				discardPrepared().then(()=>{
					removeOption(ch);
					mainMenu();
				},mainMenu);
			} else if (ch === "[First Lord of the Admiralty Prepares for War] Play a UK Status card" || ch === "[Asquith Sends Ultimatum] Play a UK Status card"){
				let UKStatuses = [];
				let promptText = "";
				for(let j = 0; !(j>=z.hands[me].length); j++){
					if(cardType(z.hands[me][j]) === "Status" && country(z.hands[me][j]) === "UK"){
						UKStatuses.push(z.hands[me][j]);
						promptText += "\n"+UKStatuses.length + ": " + cardText(z.hands[me][j]);
					}
				}
				promptText = "Which UK Status would you like to play? (1-"+UKStatuses.length+")"+promptText;
				promptNum(promptText,(a)=>1>a||a>UKStatuses.length,mainMenu,(prompted)=>{
					let card = UKStatuses[prompted-1];
					z.hands[me].splice(z.hands[me].indexOf(card),1);
					z.statuses[me].push(card);
					t.value += bold("Played "+cardImage(card))+"\r\n";
					addAlert("Played "+cardText(card));
					removeOption(ch);
					removeOption("[First Lord of the Admiralty Prepares for War] Draft a Build Navy (UK)");
					mainMenu();
				});
			} else if (ch === "[First Lord of the Admiralty Prepares for War] Draft a Build Navy (UK)"){
				confirmify("Confirming you want to draft a UK Build Navy for free, from First Lord of the Admiralty Prepares for War.",mainMenu,()=>{
					draftCard("Build Navy (UK)").then(()=>{
						removeOption(ch);
						mainMenu();
					});
				});
			} else if (ch === "[The Grand Fleet] Draft a Build Navy (UK)"){
				confirmify("Confirming you want to draft a UK Build Navy for free, from The Grand Fleet.",mainMenu,()=>{
					draftCard("Build Navy (UK)").then(()=>{
						removeOption(ch);
						mainMenu();
					});
				});
			} else if (ch === "[The Grand Fleet] Build a UK Navy in the North Atlantic"){
				confirmify("Confirming you want to build a UK Navy in the North Atlantic from The Grand Fleet",mainMenu,()=>{
					buildNavy("UK","NAO");
					removeOption("[The Grand Fleet] Draft a Build Navy (UK)");
					removeOption("[The Grand Fleet] Build a UK Navy in the North Atlantic");
					removeOption("[The Grand Fleet] Build a UK Navy in the North Sea");
					removeOption("[The Grand Fleet] Build a UK Navy in the English Channel");
					mainMenu();
				});
			} else if (ch === "[The Grand Fleet] Build a UK Navy in the North Sea"){
				confirmify("Confirming you want to build a UK Navy in the North Sea from The Grand Fleet",mainMenu,()=>{
					buildNavy("UK","NTH");
					removeOption("[The Grand Fleet] Draft a Build Navy (UK)");
					removeOption("[The Grand Fleet] Build a UK Navy in the North Atlantic");
					removeOption("[The Grand Fleet] Build a UK Navy in the North Sea");
					removeOption("[The Grand Fleet] Build a UK Navy in the English Channel");
					mainMenu();
				});
			} else if (ch === "[The Grand Fleet] Build a UK Navy in the English Channel"){
				confirmify("Confirming you want to build a UK Navy in the English Channel from The Grand Fleet",mainMenu,()=>{
					buildNavy("UK","ENG");
					removeOption("[The Grand Fleet] Draft a Build Navy (UK)");
					removeOption("[The Grand Fleet] Build a UK Navy in the North Atlantic");
					removeOption("[The Grand Fleet] Build a UK Navy in the North Sea");
					removeOption("[The Grand Fleet] Build a UK Navy in the English Channel");
					mainMenu();
				});
			} else if (ch === "[Sidney Reilly] Discard a Status card"){
				discardStatus().then(()=>{
					removeOption(ch);
					mainMenu();
				},mainMenu);
			} else if (ch === "[Lawrence Foments Arab Revolts] Recruit a UK Army in the Middle East") {
				confirmify("Confirming you want to recruit a UK Army in the Middle East from Lawrence Foments Arab Revolts.",mainMenu,()=>{
					recruitArmy("UK","MID");
					removeOption(ch);
					removeOption("[Lawrence Foments Arab Revolts] Eliminate a Turkish Army in the Middle East");
					mainMenu();
				});
			} else if (ch === "[Persian Campaign] Recruit a UK Army in Persia"){
				confirmify("Confirming you want to recruit a UK Army in Persia from Persian Campaign.",mainMenu,()=>{
					recruitArmy("UK","PER");
					removeOption(ch);
					mainMenu();
				});
			} else if (ch === "[Provisional Government of National Defence] Recruit a UK Army in Greece"){
				confirmify("Confirming you want to recruit a UK Army in Greece from Provisional Government of National Defence.",mainMenu,()=>{
					recruitArmy("UK","GRE");
					removeOption(ch);
					mainMenu();
				});
			} else if (ch === "[Lawrence Foments Arab Revolts] Eliminate a Turkish Army in the Middle East"){
				confirmify("Confirming you want to eliminate a Turkish Army in the Middle East from Lawrence Foments Arab Revolts.",mainMenu,()=>{
					z.countries.Turkey.armies[z.countries.Turkey.armies.indexOf("MID")] = "";
					plainAlert("Turkish army in the Middle East eliminated.");
					if(limitedRailAndRoadNetwork()){
						plainAlert("The UK must discard a card from hand due to Limited Rail and Road Network.");
						z.options[me].unshift("[Limited Rail and Road Network] Discard a card from hand");
					}
					removeOption(ch);
					removeOption("[Lawrence Foments Arab Revolts] Recruit a UK Army in the Middle East");
					mainMenu();
				});
			} else if (ch === "[Paris Taxis] Recruit a French Army in Provence"){
				confirmify("Confirming you want to recruit a French Army in Provence from Paris Taxis.",mainMenu,()=>{
					recruitArmy("France","PRO");
					removeOption("[Paris Taxis] Draft a French Build Army card");
					removeOption("[Paris Taxis] Draft a French Land Battle card");
					removeOption("[Paris Taxis] Recruit a French Army in Provence");
					removeOption("[Paris Taxis] Recruit a French Army in Burgundy");
					removeOption("[Paris Taxis] Recruit a French Army in Picardy");
					removeOption("[Paris Taxis] Recruit a French Army in Paris");
					mainMenu();
				});
			} else if (ch === "[Paris Taxis] Recruit a French Army in Burgundy"){
				confirmify("Confirming you want to recruit a French Army in Burgundy from Paris Taxis.",mainMenu,()=>{
					recruitArmy("France","BUR");
					removeOption("[Paris Taxis] Draft a French Build Army card");
					removeOption("[Paris Taxis] Draft a French Land Battle card");
					removeOption("[Paris Taxis] Recruit a French Army in Provence");
					removeOption("[Paris Taxis] Recruit a French Army in Burgundy");
					removeOption("[Paris Taxis] Recruit a French Army in Picardy");
					removeOption("[Paris Taxis] Recruit a French Army in Paris");
					mainMenu();
				});
			} else if (ch === "[Paris Taxis] Recruit a French Army in Picardy"){
				confirmify("Confirming you want to recruit a French Army in Picardy from Paris Taxis.",mainMenu,()=>{
					recruitArmy("France","PIC");
					removeOption("[Paris Taxis] Draft a French Build Army card");
					removeOption("[Paris Taxis] Draft a French Land Battle card");
					removeOption("[Paris Taxis] Recruit a French Army in Provence");
					removeOption("[Paris Taxis] Recruit a French Army in Burgundy");
					removeOption("[Paris Taxis] Recruit a French Army in Picardy");
					removeOption("[Paris Taxis] Recruit a French Army in Paris");
					mainMenu();
				});
			} else if (ch === "[Paris Taxis] Recruit a French Army in Paris"){
				confirmify("Confirming you want to recruit a French Army in Paris from Paris Taxis.",mainMenu,()=>{
					recruitArmy("France","PAR");
					removeOption("[Paris Taxis] Draft a French Build Army card");
					removeOption("[Paris Taxis] Draft a French Land Battle card");
					removeOption("[Paris Taxis] Recruit a French Army in Provence");
					removeOption("[Paris Taxis] Recruit a French Army in Burgundy");
					removeOption("[Paris Taxis] Recruit a French Army in Picardy");
					removeOption("[Paris Taxis] Recruit a French Army in Paris");
					mainMenu();
				});
			} else if (ch === "[France Mobilizes] Recruit a French Army in Provence"){
				confirmify("Confirming you want to recruit a French Army in Provence from France Mobilizes.",mainMenu,()=>{
					recruitArmy("France","PRO");
					removeOption("[France Mobilizes] Draft a French Build Army card");
					removeOption("[France Mobilizes] Draft a French Land Battle card");
					removeOption("[France Mobilizes] Recruit a French Army in Provence");
					removeOption("[France Mobilizes] Recruit a French Army in Burgundy");
					removeOption("[France Mobilizes] Recruit a French Army in Picardy");
					removeOption("[France Mobilizes] Recruit a French Army in Paris");
					mainMenu();
				});
			} else if (ch === "[France Mobilizes] Recruit a French Army in Burgundy"){
				confirmify("Confirming you want to recruit a French Army in Burgundy from France Mobilizes.",mainMenu,()=>{
					recruitArmy("France","BUR");
					removeOption("[France Mobilizes] Draft a French Build Army card");
					removeOption("[France Mobilizes] Draft a French Land Battle card");
					removeOption("[France Mobilizes] Recruit a French Army in Provence");
					removeOption("[France Mobilizes] Recruit a French Army in Burgundy");
					removeOption("[France Mobilizes] Recruit a French Army in Picardy");
					removeOption("[France Mobilizes] Recruit a French Army in Paris");
					mainMenu();
				});
			} else if (ch === "[France Mobilizes] Recruit a French Army in Picardy"){
				confirmify("Confirming you want to recruit a French Army in Picardy from France Mobilizes.",mainMenu,()=>{
					recruitArmy("France","PIC");
					removeOption("[France Mobilizes] Draft a French Build Army card");
					removeOption("[France Mobilizes] Draft a French Land Battle card");
					removeOption("[France Mobilizes] Recruit a French Army in Provence");
					removeOption("[France Mobilizes] Recruit a French Army in Burgundy");
					removeOption("[France Mobilizes] Recruit a French Army in Picardy");
					removeOption("[France Mobilizes] Recruit a French Army in Paris");
					mainMenu();
				});
			} else if (ch === "[France Mobilizes] Recruit a French Army in Paris"){
				confirmify("Confirming you want to recruit a French Army in Paris from France Mobilizes.",mainMenu,()=>{
					recruitArmy("France","PAR");
					removeOption("[France Mobilizes] Draft a French Build Army card");
					removeOption("[France Mobilizes] Draft a French Land Battle card");
					removeOption("[France Mobilizes] Recruit a French Army in Provence");
					removeOption("[France Mobilizes] Recruit a French Army in Burgundy");
					removeOption("[France Mobilizes] Recruit a French Army in Picardy");
					removeOption("[France Mobilizes] Recruit a French Army in Paris");
					mainMenu();
				});
			} else if (ch === "[King Ferdinand Reorganizes Romanian Army] Recruit a French Army in Rumania" || ch === "[Romania Joins Entente] Recruit a French Army in Rumania"){
				confirmify("Confirming you want to recruit a French Army in Rumania.",mainMenu,()=>{
					recruitArmy("France","RUM");
					mainMenu();
				});
			} else if (ch === "[Francs-tireurs] Draft a French Build Army card"){
				confirmify("Confiming you want to draft a French Build Army card for free from Francs-tireurs.",mainMenu,()=>{
					draftCard("Build Army (France)").then(()=>{
						removeOption(ch);
						removeOption("[Francs-tireurs] Draft a French Land Battle card");
						mainMenu();
					});
				});
			} else if (ch === "[Francs-tireurs] Draft a French Land Battle card"){
				confirmify("Confiming you want to draft a French Lnad Battle card for free from Francs-tireurs, courtesy of Barès",mainMenu,()=>{
					draftCard("Land Battle (France)").then(()=>{
						removeOption(ch);
						removeOption("[Francs-tireurs] Draft a French Build Army card");
						mainMenu();
					});
				});
			} else if (ch === "[Armée d'Afrique] Draft a French Build Army card"){
				confirmify("Confiming you want to draft a French Build Army card for free from Armée d'Afrique.",mainMenu,()=>{
					draftCard("Build Army (France)").then(()=>{
						removeOption(ch);
						removeOption("[Armée d'Afrique] Draft a French Land Battle card");
						mainMenu();
					});
				});
			} else if (ch === "[Armée d'Afrique] Draft a French Land Battle card"){
				confirmify("Confiming you want to draft a French Land Battle card for free from Armée d'Afrique, courtesy of Barès.",mainMenu,()=>{
					draftCard("Land Battle (France)").then(()=>{
						removeOption(ch);
						removeOption("[Armée d'Afrique] Draft a French Build Army card");
						mainMenu();
					});
				});
			} else if (ch === "[Paris Taxis] Draft a French Build Army card"){
				confirmify("Confiming you want to draft a French Build Army card for free from Paris Taxis.",mainMenu,()=>{
					draftCard("Build Army (France)").then(()=>{
						removeOption(ch);
						removeOption("[Paris Taxis] Draft a French Land Battle card");
						mainMenu();
					});
				});
			} else if (ch === "[Paris Taxis] Draft a French Land Battle card"){
				confirmify("Confiming you want to draft a French Land Battle card for free from Paris Taxis, courtesy of Barès.",mainMenu,()=>{
					draftCard("Land Battle (France)").then(()=>{
						removeOption(ch);
						removeOption("[Paris Taxis] Draft a French Build Army card");
						mainMenu();
					});
				});
			} else if (ch === "[France Mobilizes] Draft a French Build Army card"){
				confirmify("Confiming you want to draft a French Build Army card for free from France Mobilizes.",mainMenu,()=>{
					draftCard("Build Army (France)").then(()=>{
						removeOption(ch);
						removeOption("[France Mobilizes] Draft a French Land Battle card");
						mainMenu();
					});
				});
			} else if (ch === "[France Mobilizes] Draft a French Land Battle card"){
				confirmify("Confiming you want to draft a French Land Battle card for free from France Mobilizes, courtesy of Barès.",mainMenu,()=>{
					draftCard("Land Battle (France)").then(()=>{
						removeOption(ch);
						removeOption("[France Mobilizes] Draft a French Build Army card");
						mainMenu();
					});
				});
			} else if (ch === "[The Sunny Days of May] Draft an Italian Build Army card"){
				confirmify("Confiming you want to draft an Italian Build Army card for free from The Sunny Days of May.",mainMenu,()=>{
					draftCard("Build Army (Italy)").then(()=>{
						removeOption(ch);
						mainMenu();
					});
				});
			} else if (ch === "[The Sunny Days of May] Build an Italian Army in the Italian Alps"){
				confirmify("Confiming you want to build an Italian Army in the Italian Alps from The Sunny Days of May.",mainMenu,()=>{
					buildArmy("Italy","ALP");
					removeOption("[The Sunny Days of May] Build an Italian Army in the Italian Alps");
					removeOption("[The Sunny Days of May] Build an Italian Army in Rome");
					removeOption("[The Sunny Days of May] Draft an Italian Build Army card");
					mainMenu();
				});
			} else if (ch === "[The Sunny Days of May] Build an Italian Army in Rome"){
				confirmify("Confiming you want to build an Italian Army in Rome from The Sunny Days of May.",mainMenu,()=>{
					buildArmy("Italy","ROM");
					removeOption("[The Sunny Days of May] Build an Italian Army in the Italian Alps");
					removeOption("[The Sunny Days of May] Build an Italian Army in Rome");
					removeOption("[The Sunny Days of May] Draft an Italian Build Army card");
					mainMenu();
				});
			}else if (ch === "[Moltke the Younger Mobilizes Western Advance] Prepare a card" || ch === "[Prussian Military Tradition] Prepare a card" || ch === "[Kaiserschlacht] Prepare a card"
			|| ch === "[Jutland] Prepare a card" || ch === "[Schlieffen Plan] Prepare a card"  || ch === "[Ninth Army Formed to Defend East Prussia] Prepare a card"
			|| ch === "[Tannenberg] Prepare a card" || ch === "[Weltpolitik Drives Military Expansion] Prepare a card" || ch === "[Kerensky Vows to Continue War] Prepare another card"
			|| ch === "[Landsturm] Prepare another card" || ch === "[Landwehr] Prepare a card" || ch === "[Hindenburg Line] Prepare another card"
			|| ch === "[A Place in the Sun] Prepare a card" || ch === "[Gorlice-Tarnów Offensive] Prepare a card" || ch === "[The Somme] Prepare another card"
			|| ch === "[Woe to Them That Yet Draw Sword Against Me] Prepare a card"){
				prepareCard().then(()=>{
					removeOption(ch);
					mainMenu();
				},mainMenu);
			} else if (ch === "[A Place in the Sun] Build an Army into a space not considered difficult terrain"){
				let promptText = "";
				let sites = [];
				for(let x in provinces){
					if(provinces[x].terrain === "Clear"){
						for(let j = 0; !(j>= provinces[x].neighbors.length); j++){
							if(provinces[provinces[x].neighbors[j]].terrain !== "Sea" && z.countries.Germany.supply.includes(provinces[x].neighbors[j])){
								sites.push(x);
								promptText += "\n"+sites.length + ": "+x;
								break;
							}
						}
					}
				}
				promptText = "Which space would you like to build into with A Place in the Sun? (1-"+sites.length+")"+promptText;
				promptNum(promptText,(a)=>1>a||a>sites.length,mainMenu,(prompted)=>{
					buildArmy("Germany",sites[prompted-1]);
					removeOption(ch);
					removeOption("[A Place in the Sun] Prepare a card");
					removeOption("[A Place in the Sun] Land Battle");
					mainMenu();
				});
			} else if (ch === "[Schlieffen Plan] Build into the space battled"){
				confirmify("Confirming that you want to build into "+z.schlieffen+" from Schlieffen Plan.",mainMenu,()=>{
					buildArmy("Germany",z.schlieffen);
					removeOption(ch);
					z.schlieffen = null;
					mainMenu();
				});
			} else if (ch === "[A Place in the Sun] Build into the space battled"){
				confirmify("Confirming that you want to build into "+z.aPlaceInTheSun+" from A Place in the Sun.",mainMenu,()=>{
					buildArmy("Germany",z.aPlaceInTheSun);
					removeOption(ch);
					z.aPlaceInTheSun = null;
					mainMenu();
				});
			} else if (ch === "[Gorlice-Tarnów Offensive] Build into the space battled"){
				confirmify("Confirming that you want to build into "+z.gorliceTarnow+" from Gorlice-Tarnów Offensive.",mainMenu,()=>{
					buildArmy("Germany",z.gorliceTarnow);
					removeOption(ch);
					z.gorliceTarnow = null;
					mainMenu();
				});
			} else if (ch === "[Schlieffen Plan] Battle in Paris"){
				let sources = [];
				let promptText = "";
				for(let j = 0; !(j>=provinces.PAR.neighbors.length); j++){
					let province = provinces.PAR.neighbors[j];
					if(z.countries.Germany.supply.includes(province)){
						if(z.hands[me].length > 0 || provinces[provinces.PAR.neighbors[j]].terrain === "Sea"){
							sources.push(province);
							promptText += "\n"+sources.length+": "+province;
						}
					}
				}
				promptText = "Where would you like to battle Paris from? (1-"+sources.length+")" + promptText;
				promptNum(promptText,(a)=>1>a||a>sources.length,mainMenu,(prompted)=>{
					z.schlieffen = "PAR";
					startBattle("Germany","PAR",sources[prompted-1]);
					removeOption("[Schlieffen Plan] Battle in Paris");
					removeOption("[Schlieffen Plan] Battle in Picardy");
					removeOption("[Schlieffen Plan] Battle in Belgium");
					removeOption("[Schlieffen Plan] Build in Paris");
					removeOption("[Schlieffen Plan] Build in Picardy");
					removeOption("[Schlieffen Plan] Build in Belgium");
					removeOption("[Schlieffen Plan] Prepare a card");
					mainMenu();					
				});
			} else if (ch === "[Schlieffen Plan] Battle in Picardy"){
				let sources = [];
				let promptText = "";
				for(let j = 0; !(j>=provinces.PIC.neighbors.length); j++){
					let province = provinces.PIC.neighbors[j];
					if(z.countries.Germany.supply.includes(province)){
						if(z.hands[me].length > 0 || provinces[provinces.PIC.neighbors[j]].terrain === "Sea"){
							sources.push(province);
							promptText += "\n"+sources.length+": "+province;
						}
					}
				}
				promptText = "Where would you like to battle Picardy from? (1-"+sources.length+")" + promptText;
				promptNum(promptText,(a)=>1>a||a>sources.length,mainMenu,(prompted)=>{
					z.schlieffen = "PIC";
					startBattle("Germany","PIC",sources[prompted-1]);
					removeOption("[Schlieffen Plan] Battle in Paris");
					removeOption("[Schlieffen Plan] Battle in Picardy");
					removeOption("[Schlieffen Plan] Battle in Belgium");
					removeOption("[Schlieffen Plan] Build in Paris");
					removeOption("[Schlieffen Plan] Build in Picardy");
					removeOption("[Schlieffen Plan] Build in Belgium");
					removeOption("[Schlieffen Plan] Prepare a card");
					mainMenu();
				});
			} else if (ch === "[Schlieffen Plan] Battle in Belgium"){
				let sources = [];
				let promptText = "";
				for(let j = 0; !(j>=provinces.BEL.neighbors.length); j++){
					let province = provinces.BEL.neighbors[j];
					if(z.countries.Germany.supply.includes(province)){
						if(z.hands[me].length > 0 || provinces[provinces.BEL.neighbors[j]].terrain === "Sea"){
							sources.push(province);
							promptText += "\n"+sources.length+": "+province;
						}
					}
				}
				promptText = "Where would you like to battle Belgium from? (1-"+sources.length+")"+promptText;
				promptNum(promptText,(a)=>1>a||a>sources.length,mainMenu,(prompted)=>{
					z.schlieffen = "BEL";
					startBattle("Germany","BEL",sources[prompted-1]);
					removeOption("[Schlieffen Plan] Battle in Paris");
					removeOption("[Schlieffen Plan] Battle in Picardy");
					removeOption("[Schlieffen Plan] Battle in Belgium");
					removeOption("[Schlieffen Plan] Build in Paris");
					removeOption("[Schlieffen Plan] Build in Picardy");
					removeOption("[Schlieffen Plan] Build in Belgium");
					removeOption("[Schlieffen Plan] Prepare a card");
					mainMenu();
				});
			} else if (ch === "[Schlieffen Plan] Build in Paris"){
				confirmify("Confirming you want to battle into an empty Paris, then build into it, from Schlieffen Plan.",mainMenu,()=>{
					if(!z.countries.Germany.supply.includes("PIC") && !z.countries.Germany.supply.includes("BUR") && !z.countries.Germany.supply.includes("PRO")){
						z.options[me].unshift("[Difficult Terrain] Discard a card from hand");
						plainAlert("Germany must discard a card from hand as they are making an amphibious landing in Paris.");
					}
					removeOption("[Schlieffen Plan] Build in Paris");
					removeOption("[Schlieffen Plan] Build in Picardy");
					removeOption("[Schlieffen Plan] Build in Belgium");
					removeOption("[Schlieffen Plan] Battle in Paris");
					removeOption("[Schlieffen Plan] Battle in Picardy");
					removeOption("[Schlieffen Plan] Battle in Belgium");
					removeOption("[Schlieffen Plan] Prepare a card");
					buildArmy("Germany","PAR");
					mainMenu();
				});
			} else if (ch === "[Schlieffen Plan] Build in Picardy"){
				confirmify("Confirming you want to battle into an empty Picardy, then build into it, from Schlieffen Plan.",mainMenu,()=>{
					if(!z.countries.Germany.supply.includes("PAR") && !z.countries.Germany.supply.includes("BUR") && !z.countries.Germany.supply.includes("BEL")){
						z.options[me].unshift("[Difficult Terrain] Discard a card from hand");
						plainAlert("Germany must discard a card from hand as they are making an amphibious landing in Picardy.");
					}
					removeOption("[Schlieffen Plan] Build in Paris");
					removeOption("[Schlieffen Plan] Build in Picardy");
					removeOption("[Schlieffen Plan] Build in Belgium");
					removeOption("[Schlieffen Plan] Battle in Paris");
					removeOption("[Schlieffen Plan] Battle in Picardy");
					removeOption("[Schlieffen Plan] Battle in Belgium");
					removeOption("[Schlieffen Plan] Prepare a card");
					buildArmy("Germany","PIC");
					mainMenu();
				});
			} else if (ch === "[Schlieffen Plan] Build in Belgium"){
				confirmify("Confirming you want to battle into an empty Belgium, then build into it, from Schlieffen Plan.",mainMenu,()=>{
					if(!z.countries.Germany.supply.includes("PIC") && !z.countries.Germany.supply.includes("BUR") && !z.countries.Germany.supply.includes("WGE")){
						z.options[me].unshift("[Difficult Terrain] Discard a card from hand");
						addAlert("Germany must discard a card from hand as they are making an amphibious landing in Belgium.");
					}
					removeOption("[Schlieffen Plan] Build in Paris");
					removeOption("[Schlieffen Plan] Build in Picardy");
					removeOption("[Schlieffen Plan] Build in Belgium");
					removeOption("[Schlieffen Plan] Battle in Paris");
					removeOption("[Schlieffen Plan] Battle in Picardy");
					removeOption("[Schlieffen Plan] Battle in Belgium");
					removeOption("[Schlieffen Plan] Prepare a card");
					buildArmy("Germany","BEL");
					mainMenu();
				});
			} else if (ch === "[Gorlice-Tarnów Offensive] Build a piece in an empty space in or adjacent to Poland"){
				let poss = ["POL"];
				poss = poss.concat(provinces.POL.neighbors);
				let sites = [];
				for(let k = 0; !(k>=poss.length); k++){
					let x = poss[k];
					if(canBuildArmyIn("Germany",x) || canBuildNavyIn("Germany",x)){
						if(x === "BAL" && z.countries.Germany.supply.includes("NTH")){
							sites.push([x,true]);
						} else {
							for(let j = 0; !(j>= provinces[x].neighbors.length); j++){
								if(provinces[provinces[x].neighbors[j]].terrain !== "Sea" && provinces[x].terrain === "Clear" && z.countries.Germany.supply.includes(provinces[x].neighbors[j])){
									sites.push([x,true]);
									break;
								}
							}	
							if((sites.length === 0 || sites[sites.length-1][0] !== x) && z.hands[me].length > 0){
								sites.push([x,false]);
							}
						}
					}
				}
				let promptText = "Where would you like to build a piece with Gorlice-Tarnów Offensive? (1-"+sites.length+")";
				for(let j = 0; !(j>=sites.length); j++){
					promptText += "\n"+(j+1)+": "+sites[j][0];
				}
				promptNum(promptText,(a)=>1>a||a>sites.length,mainMenu,(prompted)=>{
					if(sites[prompted-1][0] === "BAL"){
						buildNavy("Germany","BAL");
					} else {
						buildArmy("Germany",sites[prompted-1][0]);
					}
					if(!sites[prompted-1][1]){
						z.options[me].unshift("[Difficult Terrain] Discard a card from hand");
						addAlert("You must discard a card from hand as the putative battle would be in difficult terrain.");
					}
					removeOption(ch);
					removeOption("[Gorlice-Tarnów Offensive] Prepare a card");
					removeOption("[Gorlice-Tarnów Offensive] Battle in or adjacent to Poland");
					mainMenu();
				});
			} else if (ch === "[Jutland] Battle in the North Sea"){
				let sources = [];
				let promptText = "";
				for(let j = 0; !(j>=provinces.NTH.neighbors.length); j++){
					let province = provinces.NTH.neighbors[j];
					if(z.countries.Germany.supply.includes(province)){
						if(z.hands[me].length > 0 || provinces[provinces.NTH.neighbors[j]].terrain === "Sea"){
							sources.push(province);
							promptText += "\n"+sources.length+": "+province;
						}
					}
				}
				promptText = "Where would you like to battle the North Sea from? (1-"+sources.length+")" + promptText;
				if(z.countries.Germany.supply.includes("BAL")){
					sources.push("BAL");
					promptText += "\n"+sources.length+": BAL";
				}
				promptNum(promptText,(a)=>1>a||a>sources.length,mainMenu,(prompted)=>{
					startBattle("Germany","NTH",sources[prompted-1]);
					removeOption(ch);
					removeOption("[Jutland] Prepare a card");
					mainMenu();
				});
			} else if (ch === "[Jutland] Build Navy in the North Sea"){
				confirmify("Confirming you want to build a Navy in the North Sea from Jutland",mainMenu,()=>{
					buildNavy("Germany","NTH");
					removeOption(ch);
					removeOption("[Jutland] Prepare a card");
					removeOption("[Jutland] Battle in the North Sea");
					mainMenu();
				});
			} else if (ch === "[Kaiserschlacht] Battle in Picardy"){
				let sources = [];
				let promptText = "";
				for(let j = 0; !(j>=provinces.PIC.neighbors.length); j++){
					let province = provinces.PIC.neighbors[j];
					if(z.countries.Germany.supply.includes(province)){
						if(z.hands[me].length > 0 || province !== "ENG"){
							sources.push(province);
							promptText += "\n"+sources.length+": "+province;
						}
					}
				}
				promptText = "Where would you like to battle Picardy from? (1-"+sources.length+")" + promptText;
				promptNum(promptText,(a)=>1>a||a>sources.length,mainMenu,(prompted)=>{
					startBattle("Germany","PIC",sources[prompted-1]);
					removeOption(ch);
					removeOption("[Kaiserschlacht] Prepare a card");
					mainMenu();
				});
			} else if (ch === "[Kaiserschlacht] Battle in Burgundy"){
				let sources = [];
				let promptText = "";
				for(let j = 0; !(j>=provinces.BUR.neighbors.length); j++){
					let province = provinces.BUR.neighbors[j];
					if(z.countries.Germany.supply.includes(province)){
						sources.push(province);
						promptText += "\n"+sources.length+": "+province;
					}
				}
				promptText = "Where would you like to battle Burgundy from? (1-"+sources.length+")" + promptText;
				promptNum(promptText,(a)=>1>a||a>sources.length,mainMenu,(prompted)=>{
					startBattle("Germany","BUR",sources[prompted-1]);
					removeOption(ch);
					removeOption("[Kaiserschlacht] Prepare a card");
					removeOption("[Kaiserschlacht] Battle in Picardy");
					mainMenu();
				});
			} else if (ch === "[Kerensky Vows to Continue War] Prepare a card"){
				prepareCard().then(()=>{
					removeOption(ch);
					z.options[me].unshift("[Kerensky Vows to Continue War] Prepare another card");
					mainMenu();
				},mainMenu);
			} else if (ch === "[Landsturm] Prepare a card"){
				prepareCard().then(()=>{
					removeOption(ch);
					z.options[me].unshift("[Landsturm] Prepare another card");
					mainMenu();
				},mainMenu);
			} else if (ch === "[Hindenburg Line] Prepare a card"){
				prepareCard().then(()=>{
					removeOption(ch);
					z.options[me].unshift("[Hindenburg Line] Prepare another card");
					mainMenu();
				},mainMenu);
			} else if (ch ===  "[Serbia Defies Austrian Ultimatum] Eliminate a German Army in Serbia"){
				z.countries.Germany.armies[z.countries.Germany.armies.indexOf("SER")] = "";
				boldAlert("Eliminated a German Army in Serbia.");
				removeOption("[Serbia Defies Austrian Ultimatum] Eliminate a German Army in Serbia");
				removeOption("[Serbia Defies Austrian Ultimatum] Eliminate an AH Army in Serbia");
				removeOption("[Serbia Defies Austrian Ultimatum] Eliminate a Turkish Army in Serbia");
				mainMenu();
			} else if (ch ===  "[Serbia Defies Austrian Ultimatum] Eliminate an AH Army in Serbia"){
				z.countries.AH.armies[z.countries.AH.armies.indexOf("SER")] = "";
				boldAlert("Eliminated an AH Army in Serbia.");
				removeOption("[Serbia Defies Austrian Ultimatum] Eliminate a German Army in Serbia");
				removeOption("[Serbia Defies Austrian Ultimatum] Eliminate an AH Army in Serbia");
				removeOption("[Serbia Defies Austrian Ultimatum] Eliminate a Turkish Army in Serbia");
				mainMenu();
			} else if (ch ===  "[Serbia Defies Austrian Ultimatum] Eliminate a Turkish Army in Serbia"){
				z.countries.Turkey.armies[z.countries.Turkey.armies.indexOf("SER")] = "";
				boldAlert("Eliminated a Turkish Army in Serbia.");
				removeOption("[Serbia Defies Austrian Ultimatum] Eliminate a German Army in Serbia");
				removeOption("[Serbia Defies Austrian Ultimatum] Eliminate an AH Army in Serbia");
				removeOption("[Serbia Defies Austrian Ultimatum] Eliminate a Turkish Army in Serbia");
				mainMenu();
			} else if (ch === "[Redl Blackmailed] Discard a card from AH/T's hand"){
				let promptText = "Which card would you like to discard from AH/T's hand? (1-"+z.hands[0].length+")";
				/* RULES: is the card discarded face up or face down? */
				shuffle(z.hands[0]);
				for(let j = 0; !(j>=z.hands[0].length); j++){
					promptText += "\n"+(j+1)+": "+cardText(z.hands[0][j],"AT");
					
				}
				promptNum(promptText,(a)=>1>a||a>z.hands[0].length,mainMenu,(prompted)=>{
					let card = z.hands[0][prompted-1];
					z.hands[0].splice(prompted-1,1);
					z.redlReport = bold("In Round "+z.round+", Austria-Hungary/Turkey had the following cards in hand after the effect of Redl Blackmailed:\r\n");
					for(let j = 0; !(j>=z.hands[0].length); j++){
						z.redlReport += cardImage(z.hands[0][j],"AT")+"\r\n";
					}
					z.upDiscards[0].unshift(card);
					t.value += bold("Russia discards "+cardImage(card,"AT")+" from AH/T's hand from Redl Blackmailed.")+"\r\n";
					addAlert("You discard "+cardText(card,"AT")+" from AH/T's hand from Redl Blackmailed.");
					removeOption(ch);
					mainMenu();
				});
			} else if (ch === "[Russia Mobilizes] Build an Army within 2 spaces of Moscow" || ch === "[Russia Mobilizes] Build another Army within 2 spaces of Moscow"){
				let poss = ["MOS","PET","UKR","CAU","POL","GAL","RUM","AZE"];
				let promptText = "";
				for(let j = 0; !(j>=poss.length); j++){
					if(canBuildArmyIn("Russia",poss[j])){
						promptText += "\n"+(j+1)+": "+poss[j];
					} else {
						poss.splice(j,1);
						j--;
					}
				}
				promptText = "Where would you like to build an army? (1-"+poss.length+")"+promptText;
				promptNum(promptText,(a)=>1>a||a>poss.length,mainMenu,(prompted)=>{
					buildArmy("Russia",poss[prompted-1]);
					removeOption(ch);
					if(ch === "[Russia Mobilizes] Build an Army within 2 spaces of Moscow"){
						z.options[me].unshift("[Russia Mobilizes] Build another Army within 2 spaces of Moscow");
					}
					mainMenu();
				});
			} else if (ch === "[Moltke the Younger Mobilizes Western Advance] Build an Army in or adjacent to Western Germany" 
			|| ch === "[Ninth Army Formed to Defend East Prussia] Build an Army in or adjacent to Prussia"
			|| ch === "[Tannenberg] Build an Army in or adjacent to Prussia" || ch === "[Hindenburg Line] Build an Army in or adjacent to Picardy"){
				let poss = ["PRU"];
				if(ch === "[Moltke the Younger Mobilizes Western Advance] Build an Army in or adjacent to Western Germany"){
					poss = ["WGE"];
				} else if (ch === "[Hindenburg Line] Build an Army in or adjacent to Picardy"){
					poss = ["PIC"];
				} 
				poss = poss.concat(provinces[poss[0]].neighbors);
				let promptText = "";
				for(let j = 0; !(j>=poss.length); j++){
					if(canBuildArmyIn("Germany",poss[j])){
						promptText += "\n"+(j+1)+": "+poss[j];
					} else {
						poss.splice(j,1);
						j--;
					}
				}
				promptText = "Where would you like to build an army? (1-"+poss.length+")"+promptText;
				promptNum(promptText,(a)=>1>a||a>poss.length,mainMenu,(prompted)=>{
					buildArmy("Germany",poss[prompted-1]);
					removeOption(ch);
					if(ch === "[Ninth Army Formed to Defend East Prussia] Build an Army in or adjacent to Prussia"){
						removeOption("[Ninth Army Formed to Defend East Prussia] Play a Status card");
						removeOption("[Ninth Army Formed to Defend East Prussia] Prepare a card");
					} else if (ch === "[Tannenberg] Build an Army in or adjacent to Prussia"){
						removeOption("[Tannenberg] Prepare a card");
					} else if (ch === "[Hindenburg Line] Build an Army in or adjacent to Picardy"){
						removeOption("[Hindenburg Line] Prepare a card");
						removeOption("[Hindenburg Line] Prepare another card");
					} else {
						removeOption("[Moltke the Younger Mobilizes Western Advance] Play a Status card");
						removeOption("[Moltke the Younger Mobilizes Western Advance] Prepare a card");
					}
					mainMenu();
				});
			} else if(ch === "[Plan XVII] Build an Army in or adjacent to Paris"){
				let poss = ["PAR"];
				poss = poss.concat(provinces[poss[0]].neighbors);
				let promptText = "";
				for(let j = 0; !(j>=poss.length); j++){
					if(canBuildArmyIn("France",poss[j])){
						promptText += "\n"+(j+1)+": "+poss[j];
					} else {
						poss.splice(j,1);
						j--;
					}
				}
				promptText = "Where would you like to build an army? (1-"+poss.length+")"+promptText;
				promptNum(promptText,(a)=>1>a||a>poss.length,mainMenu,(prompted)=>{
					buildArmy("France",poss[prompted-1]);
					removeOption(ch);
					for(let j = 0; !(j>=provinces[poss[prompted-1]].neighbors.length); j++){
						let province = provinces[poss[prompted-1]].neighbors[j];
						if(canLandBattleIn("France",province) || canSeaBattleIn("France",province)){
							z.planXVII = poss[prompted-1];
							
							z.options[me].unshift("[Plan XVII] Initiate a Land Battle adjacent to the army just built");
							break;
						}
					}
					mainMenu();
				});
			} else if(ch === "[Plan XVII] Initiate a Land Battle adjacent to the army just built"){
				let targets = [];
				let promptText = "";
				for(let j = 0; !(j>=provinces[z.planXVII].neighbors.length); j++){
					let province = provinces[z.planXVII].neighbors[j];
					if(canLandBattleIn("France",province)){
						targets.push(province);
						promptText += "\n"+targets.length+": "+province;
					}
				}
				promptText = "Where would you like to battle? (1-"+targets.length+")"+promptText;
				promptNum(promptText,(a)=>1>a||a>targets.length,mainMenu,(prompted)=>{
					let target = targets[prompted-1];
					let sources = [];
					let promptText = "";
					for(let j = 0; !(j>=provinces[target].neighbors.length); j++){
						let province = provinces[target].neighbors[j];
						if(z.countries.France.supply.includes(province)){
							sources.push(province);
							promptText += "\n"+sources.length+": "+province;
						}
					}
					if(sources.length === 1){
						startBattle("France",targets[prompted-1],sources[0]);
						removeOption(ch);
						mainMenu();
					} else {
						promptText = "What province would you like the attack to originate from (1-"+sources.length+")" + promptText;
						promptNum(promptText,(a)=>1>a||a>sources.length,mainMenu,(prompted)=>{				
							startBattle("France",target,sources[prompted-1]);
							removeOption(ch);
							mainMenu();
						});
					}
				});
			} else if (ch === "[Sidney Reilly] Recruit a UK Army in or adjacent to Moscow"){
				let poss = ["MOS"];
				poss = poss.concat(provinces[poss[0]].neighbors);
				let promptText = "";
				for(let j = 0; !(j>=poss.length); j++){
					if(canRecruitArmyIn("UK",poss[j])){
						promptText += "\n"+(j+1)+": "+poss[j];
					} else {
						poss.splice(j,1);
						j--;
					}
				}
				promptText = "Where would you like to recruit an army? (1-"+poss.length+")"+promptText;
				promptNum(promptText,(a)=>1>a||a>poss.length,mainMenu,(prompted)=>{
					recruitArmy("UK",poss[prompted-1]);
					removeOption(ch);
					mainMenu();
				});
			} else if (ch === "[Cossacks] Build an Army in or adjacent to Moscow" || ch === "[Brusilov Offensive] Build an Army in or adjacent to Galicia"
			|| ch === "[East Prussian Offensive] Build an Army in or adjacent to Poland" || ch === "[Grand Duke Nicholas Nikolaevich Appointed Viceroy] Build an Army in or adjacent to Azerbaijan"){
				let poss = [];
				switch(ch){
					case "[Cossacks] Build an Army in or adjacent to Moscow":
						poss.push("MOS");
						break;
					case "[Brusilov Offensive] Build an Army in or adjacent to Galicia":
						poss.push("GAL");
						break;
					case "[East Prussian Offensive] Build an Army in or adjacent to Poland":
						poss.push("POL");
						break;
					case "[Grand Duke Nicholas Nikolaevich Appointed Viceroy] Build an Army in or adjacent to Azerbaijan":
						poss.push("AZE");
						break;
				}
				poss = poss.concat(provinces[poss[0]].neighbors);
				let promptText = "";
				for(let j = 0; !(j>=poss.length); j++){
					if(canBuildArmyIn("Russia",poss[j])){
						promptText += "\n"+(j+1)+": "+poss[j];
					} else {
						poss.splice(j,1);
						j--;
					}
				}
				promptText = "Where would you like to build an army? (1-"+poss.length+")"+promptText;
				promptNum(promptText,(a)=>1>a||a>poss.length,mainMenu,(prompted)=>{
					buildArmy("Russia",poss[prompted-1]);
					removeOption(ch);
					if(ch === "[Cossacks] Build an Army in or adjacent to Moscow"){
						for(let j = 0; !(j>=provinces[poss[prompted-1]].neighbors.length); j++){
							let province = provinces[poss[prompted-1]].neighbors[j];
							if(canLandBattleIn("Russia",province)){
								z.cossacks = poss[prompted-1];
								z.options[me].unshift("[Cossacks] Initiate a battle with the army just built");
								break;
							}
						}
					}
					mainMenu();
				});
			} else if(ch === "[Cossacks] Initiate a battle with the army just built"){
				let targets = [];
				let promptText = "";
				for(let j = 0; !(j>=provinces[z.cossacks].neighbors.length); j++){
					let province = provinces[z.cossacks].neighbors[j];
					if(canLandBattleIn("Russia",province)){
						targets.push(province);
						promptText += "\n"+targets.length+": "+province;
					}
				}
				promptText = "Where would you like to battle? (1-"+targets.length+")"+promptText;
				promptNum(promptText,(a)=>1>a||a>targets.length,mainMenu,(prompted)=>{
					startBattle("Russia",targets[prompted-1],z.cossacks);
					removeOption(ch);
					mainMenu();
				});
			} else if (ch === "[Landwehr] Build an Army"){
				let poss = [];
				let promptText = "";
				for(let x in provinces){
					if(canBuildArmyIn("Germany",x)){
						poss.push(x);
						promptText += "\n"+(poss.length)+": "+x;
					}
				}
				promptText = "Where would you like to build an Army? (1-"+poss.length+")"+promptText;
				promptNum(promptText,(a)=>1>a||a>poss.length,mainMenu,(prompted)=>{
					buildArmy("Germany",poss[prompted-1]);
					removeOption(ch);
					removeOption("[Landwehr] Prepare a card");
					removeOption("[Landwehr] Play a Status card");
					mainMenu();
				});
			} else if (ch === "[The Sinking of the Lusitania] Build a US Navy" || ch === "[The Sinking of the Lusitania] Build a US Navy (2nd piece)"
			|| ch === "[American Public Outraged by Zimmermann Telegram] Build a US Navy"){
				let poss = [];
				let promptText = "";
				for(let x in provinces){
					if(canBuildNavyIn("US",x)){
						poss.push(x);
						promptText += "\n"+(poss.length)+": "+x;
					}
				}
				promptText = "Where would you like to build a Navy? (1-"+poss.length+")"+promptText;
				promptNum(promptText,(a)=>1>a||a>poss.length,mainMenu,(prompted)=>{
					buildNavy("US",poss[prompted-1]);
					removeOption(ch);
					removeOption("[The Sinking of the Lusitania] Build a US Army");
					removeOption("[The Sinking of the Lusitania] Build a US Army (2nd piece)");
					removeOption("[American Public Outraged by Zimmermann Telegram] Build a US Army");
					removeOption("[American Public Outraged by Zimmermann Telegram] Draft a Build Army (US)");
					removeOption("[American Public Outraged by Zimmermann Telegram] Build a Build Navy (US)");
					if(ch === "[The Sinking of the Lusitania] Build a US Navy"){
						z.options[me].unshift("[The Sinking of the Lusitania] Build a US Navy (2nd piece)");
						z.options[me].unshift("[The Sinking of the Lusitania] Build a US Army (2nd piece)");
					}
					mainMenu();
				});
			} else if (ch === "[First Lord of the Admiralty Prepares for War] Build Navy (UK)" || ch === "[Asquith Sends Ultimatum] Build Navy (UK)"){
				let poss = [];
				let promptText = "";
				for(let x in provinces){
					if(canBuildNavyIn("UK",x)){
						poss.push(x);
						promptText += "\n"+(poss.length)+": "+x;
					}
				}
				promptText = "Where would you like to build a Navy? (1-"+poss.length+")"+promptText;
				promptNum(promptText,(a)=>1>a||a>poss.length,mainMenu,(prompted)=>{
					buildNavy("UK",poss[prompted-1]);
					removeOption(ch);
					removeOption("[First Lord of the Admiralty Prepares for War] Play a UK Status card");
					removeOption("[Asquith Sends Ultimatum] Play a UK Status card");
					removeOption("[Asquith Sends Ultimatum] Build Army (UK)");
					removeOption("[First Lord of the Admiralty Prepares for War] Draft a Build Navy (UK)");
					mainMenu();
				});
			} else if (ch === "[Asquith Sends Ultimatum] Build Army (UK)"){
				let poss = [];
				let promptText = "";
				for(let x in provinces){
					if(canBuildArmyIn("UK",x)){
						poss.push(x);
						promptText += "\n"+(poss.length)+": "+x;
					}
				}
				promptText = "Where would you like to build an Army? (1-"+poss.length+")"+promptText;
				promptNum(promptText,(a)=>1>a||a>poss.length,mainMenu,(prompted)=>{
					buildArmy("UK",poss[prompted-1]);
					removeOption(ch);
					removeOption("[Asquith Sends Ultimatum] Play a UK Status card");
					removeOption("[Asquith Sends Ultimatum] Build Navy (UK)");
					mainMenu();
				});
			} else if (ch === "[The Sinking of the Lusitania] Build a US Army" || ch === "[The Sinking of the Lusitania] Build a US Army (2nd piece)"
			|| ch === "[American Public Outraged by Zimmermann Telegram] Build a US Army"){
				let poss = [];
				let promptText = "";
				for(let x in provinces){
					if(canBuildArmyIn("US",x)){
						poss.push(x);
						promptText += "\n"+(poss.length)+": "+x;
					}
				}
				promptText = "Where would you like to build an Army? (1-"+poss.length+")"+promptText;
				promptNum(promptText,(a)=>1>a||a>poss.length,mainMenu,(prompted)=>{
					buildArmy("US",poss[prompted-1]);
					removeOption(ch);
					removeOption("[The Sinking of the Lusitania] Build a US Navy");
					removeOption("[The Sinking of the Lusitania] Build a US Navy (2nd piece)");
					removeOption("[American Public Outraged by Zimmermann Telegram] Build a US Navy");
					removeOption("[American Public Outraged by Zimmermann Telegram] Draft a Build Army (US)");
					removeOption("[American Public Outraged by Zimmermann Telegram] Draft a Build Navy (US)");
					if(ch === "[The Sinking of the Lusitania] Build a US Army"){
						z.options[me].unshift("[The Sinking of the Lusitania] Build a US Navy (2nd piece)");
						z.options[me].unshift("[The Sinking of the Lusitania] Build a US Army (2nd piece)");
					}
					mainMenu();
				});
			} else if (ch === "[Weltpolitik Drives Military Expansion] Build an Army"){
				let poss = [];
				let promptText = "";
				for(let x in provinces){
					if(canBuildArmyIn("Germany",x)){
						poss.push(x);
						promptText += "\n"+(poss.length)+": "+x;
					}
				}
				promptText = "Where would you like to build an Army? (1-"+poss.length+")"+promptText;
				promptNum(promptText,(a)=>1>a||a>poss.length,mainMenu,(prompted)=>{
					buildArmy("Germany",poss[prompted-1]);
					for(let j = 0; !(j>=provinces[poss[prompted-1]].neighbors.length); j++){
						if(canLandBattleIn("Germany",provinces[poss[prompted-1]].neighbors[j]) || canSeaBattleIn("Germany",provinces[poss[prompted-1]].neighbors[j]) ){
							z.weltpolitik = poss[prompted-1];
							z.options[me].unshift("[Weltpolitik Drives Military Expansion] Initiate a battle with the piece just built");
							break;
						}
					}
					removeOption(ch);
					removeOption("[Weltpolitik Drives Military Expansion] Build a Navy");
					removeOption("[Weltpolitik Drives Military Expansion] Prepare a card");
					mainMenu();
				});
			} else if (ch === "[Weltpolitik Drives Military Expansion] Build a Navy"){
				let poss = [];
				let promptText = "";
				for(let x in provinces){
					if(canBuildNavyIn("Germany",x)){
						poss.push(x);
						promptText += "\n"+(poss.length)+": "+x;
					}
				}
				promptText = "Where would you like to build a Navy? (1-"+poss.length+")"+promptText;
				promptNum(promptText,(a)=>1>a||a>poss.length,mainMenu,(prompted)=>{
					buildNavy("Germany",poss[prompted-1]);
					for(let j = 0; !(j>=provinces[poss[prompted-1]].neighbors.length); j++){
						if(canLandBattleIn("Germany",provinces[poss[prompted-1]].neighbors[j]) || canSeaBattleIn("Germany",provinces[poss[prompted-1]].neighbors[j]) ){
							z.weltpolitik = poss[prompted-1];
							z.options[me].unshift("[Weltpolitik Drives Military Expansion] Initiate a battle with the piece just built");
							break;
						}
					}
					removeOption(ch);
					removeOption("[Weltpolitik Drives Military Expansion] Build an Army");
					removeOption("[Weltpolitik Drives Military Expansion] Prepare a card");
					mainMenu();
				});
			} else if(ch === "[Weltpolitik Drives Military Expansion] Initiate a battle with the piece just built"){
				let targets = [];
				let promptText = "";
				for(let j = 0; !(j>=provinces[z.weltpolitik].neighbors.length); j++){
					let province = provinces[z.weltpolitik].neighbors[j];
					if(canLandBattleIn("Germany",province) || canSeaBattleIn("Germany",province)){
						targets.push(province);
						promptText += "\n"+targets.length+": "+province;
					}
				}
				promptText = "Where would you like to battle? (1-"+targets.length+")"+promptText;
				promptNum(promptText,(a)=>1>a||a>targets.length,mainMenu,(prompted)=>{
					startBattle("Germany",targets[prompted-1],z.weltpolitik);
					removeOption(ch);
					mainMenu();
				});
			} else if (ch === "[Tannenberg] Battle a Land space in or adjacent to Prussia"){
				let poss = ["PRU"];
				poss = poss.concat(provinces[poss[0]].neighbors);
				let promptText = "";
				for(let j = 0; !(j>=poss.length); j++){
					if(canLandBattleIn("Germany",poss[j])){
						promptText += "\n"+(j+1)+": "+poss[j];
					} else {
						poss.splice(j,1);
						j--;
					}
				}
				promptText = "Where would you like to battle? (1-"+poss.length+")"+promptText;
				promptNum(promptText,(a)=>1>a||a>poss.length,mainMenu,(prompted)=>{
					let target = poss[prompted-1];
					let sources = [];
					for(let j = 0; !(j>=provinces[target].neighbors.length); j++){
						if(z.countries.Germany.supply.includes(provinces[target].neighbors[j])){
							if(z.hands[me].length > 0 || (provinces[target].neighbors[j] !== "BAL")){
								sources.push(provinces[target].neighbors[j]);
							}
						}
					}
					let doTannenberg = (source)=>{
						startBattle("Germany",target,source);
						removeOption(ch);
						removeOption("[Tannenberg] Build an Army in or adjacent to Prussia");
						removeOption("[Tannenberg] Prepare a card");
						mainMenu();
					};
					if(sources.length === 1){
						doTannenberg(sources[0]);
					} else if (sources.length > 1){
						let promptText = "Which space is the attack coming from? (1-"+sources.length+")";
						for(let j = 0; !(j>=sources.length); j++){
							promptText += "\n"+(j+1)+": "+sources[j];
						}
						promptNum(promptText,(a)=>1>a||a>sources.length,mainMenu,(prompted)=>{
							doTannenberg(sources[prompted-1]);
						});
					}
				});
			} else if (ch === "[Passchendaele] Battle in or adjacent to Belgium" || ch === "[The Somme] Battle in or adjacent to Picardy"
			|| ch === "[Cambrai] Battle in or adjacent to Picardy"){
				let poss = ["PIC"];
				if(ch === "[Passchendaele] Battle in or adjacent to Belgium"){
					poss = ["BEL"];
				}
				poss = poss.concat(provinces[poss[0]].neighbors);
				let promptText = "";
				for(let j = 0; !(j>=poss.length); j++){
					if(canLandBattleIn("UK",poss[j])){
						promptText += "\n"+(j+1)+": "+poss[j];
					} else {
						poss.splice(j,1);
						j--;
					}
				}
				promptText = "Where would you like to battle? (1-"+poss.length+")"+promptText;
				promptNum(promptText,(a)=>1>a||a>poss.length,mainMenu,(prompted)=>{
					let target = poss[prompted-1];
					let sources = [];
					for(let j = 0; !(j>=provinces[target].neighbors.length); j++){
						if(z.countries.UK.supply.includes(provinces[target].neighbors[j])){
							if(z.hands[me].length > 0 || (provinces[target].terrain !== "Difficult" 
							&& !(provinces[provinces[target].neighbors[j]].terrain !== "Sea" && provinces[target].terrain === "Sea")
							&& !(provinces[provinces[target].neighbors[j]].terrain === "Sea" && provinces[target].terrain !== "Sea"))){
								sources.push(provinces[target].neighbors[j]);
							}
						}
					}
					let doBattle = (source)=>{
						startBattle("UK",target,source);
						removeOption(ch);
						removeOption("[The Somme] Prepare a card");
						removeOption("[The Somme] Prepare another card");
						removeOption("[Cambrai] Play a Status card");
						removeOption("[Mark IV Tanks] Battle an empty space to build a UK Army");
						mainMenu();
					};
					if(sources.length === 1){
						doBattle(sources[0]);
					} else if (sources.length > 1){
						let promptText = "Which space is the attack coming from? (1-"+sources.length+")";
						for(let j = 0; !(j>=sources.length); j++){
							promptText += "\n"+(j+1)+": "+sources[j];
						}
						promptNum(promptText,(a)=>1>a||a>sources.length,mainMenu,(prompted)=>{
							doBattle(sources[prompted-1]);
						});
					}
				});
			} else if (ch === "[Brusilov Offensive] Battle in or adjacent to Galicia"
			|| ch === "[East Prussian Offensive] Battle in or adjacent to Poland" || ch === "[Grand Duke Nicholas Nikolaevich Appointed Viceroy] Battle in or adjacent to Azerbaijan"){
				let poss = [];
				switch(ch){
					case "[Brusilov Offensive] Battle in or adjacent to Galicia":
						poss.push("GAL");
						break;
					case "[East Prussian Offensive] Battle in or adjacent to Poland":
						poss.push("POL");
						break;
					case "[Grand Duke Nicholas Nikolaevich Appointed Viceroy] Battle in or adjacent to Azerbaijan":
						poss.push("AZE");
						break;
				}
				poss = poss.concat(provinces[poss[0]].neighbors);
				let promptText = "";
				for(let j = 0; !(j>=poss.length); j++){
					if(canLandBattleIn("Russia",poss[j])){
						promptText += "\n"+(j+1)+": "+poss[j];
					} else {
						poss.splice(j,1);
						j--;
					}
				}
				promptText = "Where would you like to battle? (1-"+poss.length+")"+promptText;
				promptNum(promptText,(a)=>1>a||a>poss.length,mainMenu,(prompted)=>{
					let target = poss[prompted-1];
					let sources = [];
					for(let j = 0; !(j>=provinces[target].neighbors.length); j++){
						if(z.countries.Russia.supply.includes(provinces[target].neighbors[j])){
							if(z.hands[me].length > 0 || (provinces[target].neighbors[j] !== "BAL" && provinces[target].neighbors[j] !== "BLA")){
								sources.push(provinces[target].neighbors[j]);
							}
						}
					}
					let doBattle = (source)=>{
						startBattle("Russia",target,source);
						removeOption(ch);
						switch(ch){
							case "[Brusilov Offensive] Battle in or adjacent to Galicia":
								removeOption("[Brusilov Offensive] Build an Army in or adjacent to Galicia");
								break;
							case "[East Prussian Offensive] Battle in or adjacent to Poland":
								removeOption("[East Prussian Offensive] Build an Army in or adjacent to Poland");
								break;
							case "[Grand Duke Nicholas Nikolaevich Appointed Viceroy] Battle in or adjacent to Azerbaijan":
								removeOption("[Grand Duke Nicholas Nikolaevich Appointed Viceroy] Build an Army in or adjacent to Azerbaijan");
								break;
						}
						mainMenu();
					};
					if(sources.length === 1){
						doBattle(sources[0]);
					} else if (sources.length > 1){
						let promptText = "Which space is the attack coming from? (1-"+sources.length+")";
						for(let j = 0; !(j>=sources.length); j++){
							promptText += "\n"+(j+1)+": "+sources[j];
						}
						promptNum(promptText,(a)=>1>a||a>sources.length,mainMenu,(prompted)=>{
							doBattle(sources[prompted-1]);
						});
					}
				});
			} else if (ch == "[Gorlice-Tarnów Offensive] Battle in or adjacent to Poland"){
				let poss = ["POL"];
				poss = poss.concat(provinces[poss[0]].neighbors);
				let promptText = "";
				for(let j = 0; !(j>=poss.length); j++){
					if(canLandBattleIn("Germany",poss[j]) || canSeaBattleIn("Germany",poss[j])){
						promptText += "\n"+(j+1)+": "+poss[j];
					} else {
						poss.splice(j,1);
						j--;
					}
				}
				promptText = "Where would you like to battle? (1-"+poss.length+")"+promptText;
				promptNum(promptText,(a)=>1>a||a>poss.length,mainMenu,(prompted)=>{
					let target = poss[prompted-1];
					let sources = [];
					for(let j = 0; !(j>=provinces[target].neighbors.length); j++){
						if(z.countries.Germany.supply.includes(provinces[target].neighbors[j])){
							if(z.hands[me].length > 0 || (provinces[target].neighbors[j] !== "BAL" && provinces[target].neighbors[j] !== "BLA")){
								sources.push(provinces[target].neighbors[j]);
							}
						}
					}
					let doBattle = (source)=>{
						z.gorliceTarnow = target;
						startBattle("Germany",target,source);
						removeOption(ch);
						removeOption("[Gorlice-Tarnów Offensive] Prepare a card");
						removeOption("[Gorlice-Tarnów Offensive] Build a piece in an empty space in or adjacent to Poland");
						mainMenu();
					};
					if(sources.length === 1){
						doBattle(sources[0]);
					} else if (sources.length > 1){
						let promptText = "Which space is the attack coming from? (1-"+sources.length+")";
						for(let j = 0; !(j>=sources.length); j++){
							promptText += "\n"+(j+1)+": "+sources[j];
						}
						promptNum(promptText,(a)=>1>a||a>sources.length,mainMenu,(prompted)=>{
							doBattle(sources[prompted-1]);
						});
					}
				});
			} else if (ch === "[Persian Oil] Discard a card from hand"){
				discardFromHand().then(()=>{
					removeOption(ch);
					if(!z.extraObjectives.includes("PER")){
						z.extraObjectives.push("PER");
						plainAlert("Objective Token added to Persia.");
					}
					z.options[me].unshift("[Persian Oil] Build a Turkish Army in Persia");
					mainMenu();
				},mainMenu);
			} else if (ch === "[A Crumbling Empire] Discard a card from hand"){
				discardFromHand().then(()=>{
					removeOption(ch);
					if(!z.extraObjectives.includes("MID")){
						z.extraObjectives.push("MID");
						plainAlert("Objective Token added to the Middle East.");
					}		
					z.options[me].unshift("[A Crumbling Empire] Build a Turkish Army in the Middle East");
					mainMenu();
				},mainMenu);
			} else if (ch === "[Persian Oil] Build a Turkish Army in Persia"){
				confirmify("Confirming you want to build a Turkish Army in Persia.",mainMenu,()=>{
					buildArmy("Turkey","PER");
					removeOption(ch);
					mainMenu();
				});
			} else if (ch === "[A Crumbling Empire] Build a Turkish Army in the Middle East"){
				confirmify("Confirming you want to build a Turkish Army in the Middle East.",mainMenu,()=>{
					buildArmy("Turkey","MID");
					removeOption(ch);
					mainMenu();
				});
			} else if (ch === "[Mark IV Tanks] Battle an empty space to build a UK Army"){
				let targets = [];
				let cardArray = [];
				let promptText = "";
				for(let j = 0; !(j>=z.countries.UK.armies.length); j++){
					let source = z.countries.UK.armies[j];
					if(source === ""){
						continue;
					}
					if(!z.countries.UK.supply.includes(source)){
						continue;
					}
					for(let k = 0; !(k>=provinces[source].neighbors.length); k++){
						let target = provinces[source].neighbors[k];
						if(provinces[target].terrain !== "Clear"){
							continue;
						}
						if(z.countries.Germany.armies.includes(target) || z.countries.AH.armies.includes(target) || z.countries.Turkey.armies.includes(target)){
							continue;
						}
						let theseCards = [];
						for(let l = 0; !(l>=z.prepared[me].length); l++){
							let card = z.prepared[me][l];
							if(country(card) === "UK" && (prepareSymbol(card) === "SLB" || prepareSymbol(card) === "SLBx2")){
								if(prepareText(card) === ""){
									theseCards.push(card);
								} else if(prepareText(card).includes(target)){
									theseCards.push(card);
								}
							}
						}
						if(theseCards.length > 0){
							targets.push(target);
							promptText += "\n"+targets.length+": "+target;
							cardArray.push(theseCards);
						}
					}
				}
				/* TODO: improve Passchendaele/The Somme/Cambrai handling*/
				promptText = "Where would you like to build an Army using Mk IV Tanks? (1-"+targets.length+")"+promptText
				+ "\n\nIf this battle was granted by The Somme, Passchendaele, or Cambrai, make sure to pick a space allowed by the card (in or adjacent to PIC, BEL, PIC, respectively).";
				promptNum(promptText,(a)=>1>a||a>targets.length,mainMenu,(prompted)=>{
					let target = targets[prompted-1];
					let cards = cardArray[prompted-1];
					let promptText = "Which prepared card would you like to discard to build an Army? (1-"+cards.length+")";
					for(let j = 0; !(j>=cards.length); j++){
						promptText += "\n"+(j+1)+": "+cardText(cards[j]);
					}
					promptNum(promptText,(a)=>1>a||a>cards.length,mainMenu,(prompted)=>{
						let card = cards[prompted-1];
						z.prepared[me].splice(z.prepared[me].indexOf(card),1);
						z.upDiscards[me].unshift(card);
						t.value += bold("Discarding prepared card: "+cardImage(card)+" to build an army in "+target+" using Mark IV Tanks.")+"\r\n";
						addAlert("Discarding prepared card: "+cardText(card)+" to build an army in "+target+" using Mark IV Tanks.");
						buildArmy("UK",target);
						removeOption(ch);
						removeOption("Land Battle (UK)");
						removeOption("[Passchendaele] Battle in or adjacent to Belgium");
						removeOption("[The Somme] Battle in or adjacent to Picardy");
						removeOption("[Cambrai] Battle in or adjacent to Belgium");
						removeOption("[The Somme] Prepare a card");
						removeOption("[The Somme] Prepare another card");
						removeOption("[Cambrai] Play a Status card");
						mainMenu();
					});
				});
			} else if (ch === "[Mark IV Tanks] Build an Army"){
				let cards = [];
				for(let j = 0; !(j>=z.prepared[4].length); j++){
					let card = z.prepared[4][j];
					if(country(card) === "UK" && (prepareSymbol(card) === "SLB" || prepareSymbol(card) === "SLBx2")){
						if(prepareText(card) === ""){
							cards.push(card);
						} else if(prepareText(card).includes(z.target)){
							cards.push(card);
						}
					}
				}
				let promptText = "Which prepared card would you like to discard to build an Army? (1-"+cards.length+")";
				for(let j = 0; !(j>=cards.length); j++){
					promptText += "\n"+(j+1)+": "+cardText(cards[j]);
				}
				promptNum(promptText,(a)=>1>a||a>cards.length,mainMenu,(prompted)=>{
					let card = cards[prompted-1];
					z.prepared[me].splice(z.prepared[me].indexOf(card),1);
					z.upDiscards[me].unshift(card);
					t.value += bold("Discarding prepared card: "+cardImage(card)+" to build an army in "+z.target+" using Mark IV Tanks.")+"\r\n";
					addAlert("Discarding prepared card: "+cardText(card)+" to build an army in "+z.target+" using Mark IV Tanks.");
					buildArmy("UK",z.target);
					removeOption(ch);
					z.mkIV = true;
					z.attacker = null;
					z.target = null;
					z.source = null;
					z.defenders = [];
					z.defending = [];
					mainMenu();
				});
			} else if (ch === "[Alpini] Discard a card from hand" || ch === "[Limited Rail and Road Network] Discard a card from hand" 
			        || ch === "[Caporetto] Discard a card from hand" || ch === "[Difficult Terrain] Discard a card from hand"){
				discardFromHand().then(()=>{
					removeOption(ch);
					mainMenu();
				},mainMenu);
			} else if (ch === "[Rumpler Taube Air Reconnaissance]"){
				confirmify("Confirming you want to use Rumpler Taube Air Reconnaissance to examine the defenders' prepared cards, then discard one of them.  This is a one-time use ability.",mainMenu,()=>{
					z.upDiscards[me].unshift(37);
					z.statuses[me].splice(z.statuses[me].indexOf(37),1);
					boldAlert("Germany uses their Rumpler Taube Air Reconnaissance status to examine the defenders' prepared cards.");
					removeOption(ch);
					z.options[me].unshift("[Rumpler Taube Air Reconnaissance] Discard a prepared card of a defender");
					mainMenu();
				});
			} else if(ch === "[Rumpler Taube Air Reconnaissance] Discard a prepared card of a defender"){
				let powers = [];
				for(let j = 0; !(j>=z.defenders.length); j++){
					let num = powerNum(z.countries[z.defenders[j]].power);
					
					if(!powers.includes(num)){
						powers.push(num);
					}
				}
				let cards = [];
				for(let j = 0; !(j>=powers.length); j++){
					for(let k = 0; !(k>=z.prepared[powers[j]].length); k++){
						cards.push([powerByNum(powers[j]),z.prepared[powers[j]][k]]);
					}
				}
				let promptText = "Which prepared card would you like to discard? (1-"+(cards.length+1)+")";
				for(let j = 0; !(j>=cards.length); j++){
					promptText += "\n"+(j+1)+": ("+cards[j][0]+") "+cardText(cards[j][1],cards[j][0]);
				}
				promptText += "\n"+(cards.length+1)+" Do not discard a prepared card (you will still discard the status).";
				promptNum(promptText,(a)=>1>a||a>cards.length + 1,mainMenu,(prompted)=>{
					if(prompted === cards.length + 1){
						plainAlert("Germany chooses not to discard an enemy's prepared card; he still discards Rumpler Taube Air Reconnaissance.");
					} else {
						let card = cards[prompted-1][1];
						let num = powerNum(cards[prompted-1][0]);
						z.upDiscards[num].unshift(card);
						z.prepared[num].splice(z.prepared[num].indexOf(card),1);
						t.value += bold("Germany discards "+cardImage(card,powerByNum(num))+", a prepared card belonging to "+powerByNum(num)+".")+"\r\n";
						t.value += bold("Germany discards "+cardImage(37))+"\r\n";
						addAlert("You discard "+cardText(card,powerByNum(num))+", a prepared card belonging to "+powerByNum(num)+", and discard Rumpler Taube Air Reconnaissance.");
						if(!couldReinforce()){
							resolveVictory();
						}
					}
					removeOption(ch);
					mainMenu();
				});
				
			} else if (ch === "[Stosstruppen] Battle an adjacent land space"){
				let stossTargets = [];
				for(let j = 0; !(j>= provinces[z.stossProvince].neighbors.length); j++){
					let neighbor = provinces[z.stossProvince].neighbors[j];
					if(canLandBattleIn("Germany",neighbor)){
						stossTargets.push(neighbor);
					}
				}
				if(stossTargets === 0){
					removeOption(ch);
					mainMenu();
				} else {
					let realTargets = [];
					for(let k = 0; !(k>=z.prepared[me].length); k++){
						if(prepareSymbol(z.prepared[me][k]) === "SLB" || prepareSymbol(z.prepared[me][k]) === "SLBx2"){
							if(prepareText(z.prepared[me][k]) === ""){
								realTargets = stossTargets;
								break;
							}
							for(let j = 0; !(j>=stossTargets.length); j++){
								
								if(prepareText(z.prepared[me][k]).includes(stossTargets[j]) && !realTargets.includes(stossTargets[j])){
									realTargets.push(stossTargets[j]);
								}
							}
						}
					}
					let promptText = "Which province would you like to battle with Stosstruppen? (1-"+realTargets.length+")";
					for(let j = 0; !(j>=realTargets.length); j++){
						promptText += "\n"+(j+1)+": "+realTargets[j];
					}
					promptNum(promptText,(a)=>1>a||a>realTargets.length,mainMenu,(prompted)=>{
						let target = realTargets[prompted-1];
						let SLBs = [];
						for(let k = 0; !(k>=z.prepared[me].length); k++){
							if(prepareSymbol(z.prepared[me][k]) === "SLB" || prepareSymbol(z.prepared[me][k]) === "SLBx2"){
								if(prepareText(z.prepared[me][k]) === "" || prepareText(z.prepared[me][k]).includes(target)){
									SLBs.push(z.prepared[me][k]);
								}
							}
						}
						let promptText = "Which prepared Sustain Land Battle would you like to discard? (1-"+SLBs.length+")";
						for(let j = 0; !(j>=SLBs.length); j++){
							promptText += "\n"+(j+1)+": "+cardText(SLBs[j]);
						}
						promptNum(promptText,(a)=>1>a||a>SLBs.length,mainMenu,(prompted)=>{

							let discard = SLBs[prompted-1];
							let sources = [];
							let source = "";
							for(let j = 0; !(j>=provinces[target].neighbors.length); j++){
								let neighbor = provinces[target].neighbors[j];
								if(z.countries.Germany.supply.includes(neighbor)){
									if(provinces[neighbor].terrain !== "Sea" || z.hands[me].length > 0){
										sources.push(neighbor);
									}
								}
							}
							
							let doStosstruppen = (source)=>{
								z.stosstruppen = true;
								/* RULES: Can you combine Big Bertha and Stosstruppen */
								let doStosstruppen2 = ()=>{
									z.upDiscards[me].unshift(discard);
									z.prepared[me].splice(z.prepared[me].indexOf(discard),1);
									t.value += bold("Germany discards their prepared "+cardImage(discard)+" for Stosstruppen.")+"\r\n";
									startBattle("Germany",target,source);
									removeOption(ch);
									mainMenu();
								};
								
								if(me === 2 && bigBertha() && !z.bigBertha && ((prepareSymbol(discard) === "SLB" && z.hands[me].length > 0) || (prepareSymbol(discard) === "SLBx2" && z.hands[me].length > 1))) {
									confirmify("Would you like to use Big Bertha Railway Guns to keep this Sustain card but discard from your hand instead?",
											   doStosstruppen2,()=>{
										discardFromHand().then(()=>{
											
											let doBigBertha = ()=>{
												z.bigBertha = true;
												t.value += bold("Germany uses Big Bertha Railway Guns and reveals "+cardImage(discard)+ " from their prepared cards to use Stosstruppen.")+"\r\n";
												addAlert("You use Big Bertha Railway Guns.");
												startBattle("Germany",target,source);
												removeOption(ch);
												mainMenu();
											};
											
											if(prepareSymbol(discard) === "SLB"){
												doBigBertha();
											} else {
												let mustDiscard = ()=>{
													discardFromHand().then(doBigBertha,mustDiscard);
												};
												mustDiscard();
											}
										},doStosstruppen2);
									});
								} else {
									doStosstruppen2();
								}
							};
							
							if(sources.length === 1){
								doStosstruppen(sources[0]);
							} else {
								let promptText = "Which space would you like to initiate the attack from? (1-"+sources.length+")";
								for(let j = 0; !(j>=sources.length); j++){
									promptText += "\n"+(j+1)+": "+sources[j];
								}
								let mustDecide = ()=>{
									promptNum(promptText,(a)=>1>a||a>sources.length,mustDecide,(prompted)=>{
										doStosstruppen(sources[prompted-1]);
									});
								};
								mustDecide();
							}
						});
								
					});
					
				}
			} else if (/\[Mustard Gas\] Make/.test(ch)){
				let target = /\[Mustard Gas\] Make (.*) d/.exec(ch)[1];
				confirmify("Confirming you want to make "+target+" discard a prepared card from Mustard Gas.",mainMenu,()=>{
					z.mustardGas = true;
					let num = powerNum(target);
					if(z.prepared[num].length === 0){
						t.value += bold("Germany hits "+target+" with Mustard Gas.")+"\r\n";
						modifyEntente(-1);
					} else if(z.prepared[num].length === 1){
						t.value += bold("Germany hits "+target+" with Mustard Gas; they discard their only prepared card.")+"\r\n";
						z.downDiscards[num].push(z.prepared[num].pop());
						/* TODO: more safeguards here */
						if(!noBattle() && !couldReinforce()){
							boldAlert(z.attacker + " wins the battle automatically!");
							resolveVictory();
						}
					} else {
						t.value += bold("Germany hits "+target+" with Mustard Gas; they must discard a prepared card.")+"\r\n";
						z.options[num].unshift("[Mustard Gas] Discard a prepared card");
					}
					for(let j = 0; !(j>=z.options[me].length); j++){
						if(/\[Mustard Gas\] Make/.test(z.options[me][j])){
							z.options[me].splice(j,1);
							j--;
						}
					}
					mainMenu();
				});
			} else if (/\[The Red Baron\] Make/.test(ch)){
				let target = /\[The Red Baron\] Make (.*) discard/.exec(ch)[1];
				confirmify("Confirming you want to make "+target+" discard the top card of their draw deck from The Red Baron.",mainMenu,()=>{
					z.redBaron = true;
					let num = powerNum(target);
					if(z.drawDecks[num].length === 0){
						t.value += bold("Germany hits "+target+" with The Red Baron.")+"\r\n";
						modifyEntente(-1);
					} else {
						t.value += bold("Germany hits "+target+" with The Red Baron; they discard the top card of their draw deck.")+"\r\n";
						z.downDiscards[num].push(z.drawDecks[num].shift());
					}
					for(let j = 0; !(j>=z.options[me].length); j++){
						if(/\[The Red Baron\] Make/.test(z.options[me][j])){
							z.options[me].splice(j,1);
							j--;
						}
					}
					mainMenu();
				});
			} else if (ch === "[I Order You to Die] Eliminate an Entente Army in Istanbul"){
				let targets = [];
				for(let x in z.countries){
					if(z.countries[x].entente && z.countries[x].armies.includes("IST")){
						targets.push(x);
					}
				}
				
				let doIt = (target)=>{
					z.countries[target].armies[z.countries[target].armies.indexOf("IST")] = "";
					boldAlert("Eliminated an Army belonging to "+target+" in Istanbul.");
					removeOption(ch);
					mainMenu();
				};
				
				if(targets.length === 1){
					confirmify("Confirming you want to eliminate the Entente Army in Istanbul.", mainMenu,()=>{
						doIt(targets[0]);
					});
				} else if(targets.length > 1){
					let promptText = "Whose Army would you like to eliminate? (1-"+targets.length+")";
					for(let j = 0; !(j>=targets.length); j++){
						promptText += "\n"+(j+1)+": "+targets[j][2];
					}
					promptNum(promptText,(a)=>1>a||a>targets.length,mainMenu,(prompted)=>{
						doIt(targets[prompted-1]);
					});
				}
			} else if (ch === "[Franz Ferdinand Avenged] Discard a card from hand"){
				discardFromHand().then(()=>{
					removeOption(ch);
					z.options[me].unshift("[Franz Ferdinand Avenged] Build an AH Army in Serbia");
					z.options[me].unshift("[Franz Ferdinand Avenged] Battle in Serbia");
					mainMenu();
				},mainMenu);
			} else if (ch === "[Isonzo River Offensives] Discard a card from hand"){
				discardFromHand().then(()=>{
					removeOption(ch);
					z.options[me].unshift("[Isonzo River Offensives] Battle in Tyrol");
					z.options[me].unshift("[Isonzo River Offensives] Build an Italian Army in the Italian Alps");	
					mainMenu();
				},mainMenu);
			} else if (ch === "[Isonzo River Offensives] Build an Italian Army in the Italian Alps"){
				confirmify("Confirming you want to build an Italian Army in the Italian Alps from Isonzo River Offensives",mainMenu,()=>{
					buildArmy("Italy","ALP");
					removeOption(ch);
					mainMenu();
				});
			} else if (ch === "[Isonzo River Offensives] Battle in Tyrol"){
				confirmify("Confirming you want to battle Tyrol with an Italian Army in the Italian Alps from Isonzo River Offensives",mainMenu,()=>{
					removeOption(ch);
					removeOption("[Isonzo River Offensives] Build an Italian Army in the Italian Alps");
					startBattle("Italy","TYR","ALP");
					mainMenu();
				});
			} else if (ch === "[Morava Offensive] Battle adjacent to Bulgaria"){
				let targets = [];
				for(let j = 0; !(j>=provinces.BUL.neighbors.length); j++){
					if(canLandBattleIn("AH",provinces.BUL.neighbors[j])){
						targets.push(["AH",provinces.BUL.neighbors[j],"AH Land Battle vs. "+provinces.BUL.neighbors[j]]);
					}
				}
				let promptText = "Where would you like to direct the Morava Offensive? (1-"+targets.length+")";
				for(let j = 0; !(j>=targets.length); j++){
					promptText += "\n"+(j+1)+": "+targets[j][2];
				}
				promptNum(promptText,(a)=>1>a||a>targets.length,mainMenu,(prompted)=>{
					let target = targets[prompted-1][1];
					let country2 = targets[prompted-1][0];
					let sources = [];
					for(let j = 0; !(j >= provinces[target].neighbors.length); j++){
						if(z.countries[country2].supply.includes(provinces[target].neighbors[j])){
							sources.push(provinces[target].neighbors[j]);
						}
					}
					let doBattle = (source)=>{
						startBattle(country2,target,source);
						removeOption(ch);
						mainMenu();
					};
					if(sources.length === 1){
						doBattle(sources[0]);
					} else if(sources.length > 1){
						let promptText = "Where are you battling "+target+" from? (1-"+sources.length+")";
						for(let j = 0; !(j>=sources.length); j++){
							promptText += "\n"+(j+1)+": "+sources[j];
						}
						promptNum(promptText,(a)=>1>a||a>sources.length,mainMenu,(prompted)=>{
							doBattle(sources[prompted-1]);
						});
					}
				});
			} else if (ch === "[Romanians Advance in Transylvania] Battle adjacent to Romania"){
				let targets = [];
				for(let j = 0; !(j>=provinces.RUM.neighbors.length); j++){
					if(canLandBattleIn("France",provinces.RUM.neighbors[j])){
						targets.push(["France",provinces.RUM.neighbors[j],"France Land Battle vs. "+provinces.RUM.neighbors[j]]);
					}
				}
				let promptText = "Where would you like to direct the Romanian Advance in Transylvania? (1-"+targets.length+")";
				for(let j = 0; !(j>=targets.length); j++){
					promptText += "\n"+(j+1)+": "+targets[j][2];
				}
				promptNum(promptText,(a)=>1>a||a>targets.length,mainMenu,(prompted)=>{
					let target = targets[prompted-1][1];
					let country2 = targets[prompted-1][0];
					let sources = [];
					for(let j = 0; !(j >= provinces[target].neighbors.length); j++){
						if(z.countries[country2].supply.includes(provinces[target].neighbors[j])){
							sources.push(provinces[target].neighbors[j]);
						}
					}
					let doBattle = (source)=>{
						startBattle(country2,target,source);
						removeOption(ch);
						mainMenu();
					};
					if(sources.length === 1){
						doBattle(sources[0]);
					} else if(sources.length > 1){
						let promptText = "Where are you battling "+target+" from? (1-"+sources.length+")";
						for(let j = 0; !(j>=sources.length); j++){
							promptText += "\n"+(j+1)+": "+sources[j];
						}
						promptNum(promptText,(a)=>1>a||a>sources.length,mainMenu,(prompted)=>{
							doBattle(sources[prompted-1]);
						});
					}
				});
			} else if (ch === "[Brudermann Orders Cavalry Charge] Discard a card from hand"){
				discardFromHand().then(()=>{
					removeOption(ch);
					z.options[me].unshift("[Brudermann Orders Cavalry Charge] Build an AH Army in Galicia");
					z.options[me].unshift("[Brudermann Orders Cavalry Charge] Battle in Galicia");
					mainMenu();
				},mainMenu);
			} else if (ch === "[Brudermann Orders Cavalry Charge] Battle in Galicia"){
				let sources = [];
				for(let j = 0; !(j >= provinces.GAL.neighbors.length); j++){
					if(z.countries.AH.supply.includes(provinces.GAL.neighbors[j])){
						sources.push(provinces.GAL.neighbors[j]);
					}
				}
				let doBattle = (source)=>{
					startBattle("AH","GAL",source);
					removeOption(ch);
					mainMenu();
				};
				if(sources.length === 1){
					confirmify("Confirming you want to battle Galicia due to Brudermann Orders Cavalry Charge.",mainMenu,()=>{
						doBattle(sources[0]);
					});
				} else if(sources.length > 1){
					let promptText = "Where are you battling Galicia from? (1-"+sources.length+")";
					for(let j = 0; !(j>=sources.length); j++){
						promptText += "\n"+(j+1)+": "+sources[j];
					}
					promptNum(promptText,(a)=>1>a||a>sources.length,mainMenu,(prompted)=>{
						doBattle(sources[prompted-1]);
					});
				}
			} else if (ch === "[Brudermann Orders Cavalry Charge] Build an AH Army in Galicia"){
				confirmify("Confirming you want to build an AH Army in Galicia from Brudermann Orders Cavalry Charge",mainMenu,()=>{
					buildArmy("AH","GAL");
					removeOption(ch);
					removeOption("[Brudermann Orders Cavalry Charge] Battle in Galicia");
					mainMenu();
				});
			} else if (ch === "[Franz Ferdinand Avenged] Battle in Serbia"){
				let sources = [];
				for(let j = 0; !(j >= provinces.SER.neighbors.length); j++){
					if(z.countries.AH.supply.includes(provinces.SER.neighbors[j])){
						sources.push(provinces.SER.neighbors[j]);
					}
				}
				let doBattle = (source)=>{
					startBattle("AH","SER",source);
					removeOption(ch);
					mainMenu();
				};
				if(sources.length === 1){
					confirmify("Confirming you want to battle Serbia due to Franz Ferdinand Avenged.",mainMenu,()=>{
						doBattle(sources[0]);
					});
				} else if(sources.length > 1){
					let promptText = "Where are you battling Serbia from? (1-"+sources.length+")";
					for(let j = 0; !(j>=sources.length); j++){
						promptText += "\n"+(j+1)+": "+sources[j];
					}
					promptNum(promptText,(a)=>1>a||a>sources.length,mainMenu,(prompted)=>{
						doBattle(sources[prompted-1]);
					});
				}
			} else if (ch === "[Franz Ferdinand Avenged] Build an AH Army in Serbia"){
				confirmify("Confirming you want to build an AH Army in Serbia from Franz Ferdinand Avenged",mainMenu,()=>{
					buildArmy("AH","SER");
					removeOption(ch);
					removeOption("[Franz Ferdinand Avenged] Battle in Serbia");
					mainMenu();
				});
			} else if (ch === "[Caporetto] Battle in the Italian Alps"){
				let sources = [];
				for(let j = 0; !(j >= provinces.ALP.neighbors.length); j++){
					if(z.countries.AH.supply.includes(provinces.ALP.neighbors[j])){
						sources.push(provinces.ALP.neighbors[j]);
					}
				}
				let doBattle = (source)=>{
					startBattle("AH","ALP",source);
					removeOption(ch);
					mainMenu();
				};
				if(sources.length === 1){
					confirmify("Confirming you want to battle the Italian Alps due to Caporetto.",mainMenu,()=>{
						doBattle(sources[0]);
					});
				} else if(sources.length > 1){
					let promptText = "Where are you battling the Italian Alps from? (1-"+sources.length+")";
					for(let j = 0; !(j>=sources.length); j++){
						promptText += "\n"+(j+1)+": "+sources[j];
					}
					promptNum(promptText,(a)=>1>a||a>sources.length,mainMenu,(prompted)=>{
						doBattle(sources[prompted-1]);
					});
				}
			} else if (ch === "[Caporetto] Build an AH Army in the Italian Alps"){
				confirmify("Confirming you want to build an AH Army in the Italian Alps from Caporetto",mainMenu,()=>{
					buildArmy("AH","ALP");
					removeOption(ch);
					removeOption("[Caporetto] Battle in the Italian Alps");
					mainMenu();
				});
			} else if (ch === "[Draw Step] Draw card(s) from your draw deck"){
				drawCards().then(()=>{
					z.step = 4;
					if(z.hands[me].length >= 7 || z.drawDecks[me].length === 0){
						advanceTurn();
						clearSpoilers();
						postSeed();
					} else {
						mainMenu();
					}
				},mainMenu);
			} else if (ch === "[Attrition Step] Play a prepared Attrition card"){
				playAttrition().then(()=>{
					z.step = 3;
					mainMenu();
				},mainMenu);
			} else if (ch === "[Prepare Step] Unprepare a card"){
				unprepareCard().then(()=>{
					z.step = 4;
					if(z.hands[me].length >= 7 || z.drawDecks[me].length === 0){
						advanceTurn();
						clearSpoilers();
						postSeed();
					} else {
						mainMenu();
					}
				},mainMenu);
			} else if (ch === "Reinforce!"){
				let cards = [];
				for(let j = 0; !(j>=z.defenders.length); j++){
					if(powerNum(z.countries[z.defenders[j]].power) !== me){
						continue;
					}
					let germanyCanHelp = germanAidInTheEast() && provinces[z.target].terrain !== "Sea" && z.defenders[j] === "Germany" && !z.countries.Germany.supply.includes(z.target) && ((z.defenders.includes("AH") && z.countries.AH.supply.includes(z.target)) || (z.defenders.includes("Turkey") && z.countries.Turkey.supply.includes(z.target)));
					let americaCanHelp = blackjack() && provinces[z.target].terrain !== "Sea" && z.defenders[j] === "US" && !z.countries.US.supply.includes(z.target) && ((z.defenders.includes("UK") && z.countries.UK.supply.includes(z.target)) || (z.defenders.includes("France") && z.countries.France.supply.includes(z.target)) || (z.defenders.includes("Italy") && z.countries.Italy.supply.includes(z.target)));
					let wrongRailGauge = russianRailGauge() && z.defenders[j] === "Russia" && !russianRailGauge(z.target);
					if(americaCanHelp || germanyCanHelp || (z.countries[z.defenders[j]].supply.includes(z.target) && !wrongRailGauge)){
						for(let k = 0; !(k>=z.prepared[me].length); k++){
							let card = z.prepared[me][k];
							if((((prepareSymbol(card) === "RA" || prepareSymbol(card) === "RAx2") && provinces[z.target].terrain !== "Sea")
							|| ((prepareSymbol(card) === "RN" || prepareSymbol(card) === "RNx2") && provinces[z.target].terrain === "Sea"))
							&& (me === 1 || me === 2 || country(card) === z.defenders[j])){
								if(prepareText(card) === ""){
									cards.push(card);
								} else if(prepareText(card) === "Difficult"){
									/* Alpini */
									if(isDifficult()){
										cards.push(card);
									}
								} else {
									if(prepareText(card).includes(z.target)){
										cards.push(card);
									}
								}		
							}
						}
					} else {
						switch(z.defenders[j]){
							case "AH":
								if(z.target === "BUL" && z.prepared[me].includes(30)){
									cards.push(30);
								}
								if(z.target === "BUL" && z.prepared[me].includes(33)){
									cards.push(33);
								}
								if(z.target === "GRE" && z.prepared[me].includes(29)){
									cards.push(29);
								}
								if((z.target === "BUD" || z.target === "GAL") && z.prepared[me].includes(32)){
									cards.push(32);
								}
								if((z.target === "VIE" || z.target === "TYR") && z.prepared[me].includes(25)){
									cards.push(25);
								}
								break;
							case "Turkey":
								if(z.prepared[me].includes(37)){
									cards.push(37);
								}
								break;
							case "Russia":
								if(z.target === "SER" && z.prepared[me].includes(22)){
									cards.push(22);
								}
								if(z.target === "SER" &&  z.prepared[me].includes(34)){
									cards.push(34);
								}
								break;
							case "Germany":
								if(provinces[z.target].terrain !== "Sea" && z.prepared[me].includes(50)){
									cards.push(50);
								}
								if(provinces[z.target].terrain !== "Sea" &&  z.prepared[me].includes(47)){
									cards.push(47);
								}
								if((z.target === "WGE" || z.target === "BER" || z.target === "PRU") && z.prepared[me].includes(48)){
									cards.push(48);
								}
								break;
							case "France":
								if(z.target === "RUM" && z.prepared[me].includes(33)){
									cards.push(33);
								}
								if(z.target === "RUM" &&  z.prepared[me].includes(37)){
									cards.push(37);
								}
								break;
							case "UK":
								if(provinces[z.target].terrain === "Sea" && z.prepared[me].includes(45)){
									cards.push(45);
								}
								if(z.target === "BEL" && z.prepared[me].includes(43)){
									cards.push(43);
								}
								if(z.target === "GRE" && z.prepared[me].includes(40)){
									cards.push(40);
								}
								if(provinces[z.target].terrain !== "Sea" && z.prepared[me].includes(29)){
									cards.push(29);
								}
						}
					}
				}
				let promptText = "Which card would you like to reinforce with? (1-"+cards.length+")";
				for(let j = 0; !(j>=cards.length); j++){
					promptText += "\n"+(j+1)+": "+cardText(cards[j]);
				}
				promptNum(promptText,(a)=>1>a||a>cards.length,mainMenu,(prompted)=>{
					let card = cards[prompted-1];
					t.value += bold("Reinforcing with "+cardImage(card))+"\r\n";
					addAlert("Reinforcing with "+cardText(card));
				
					let resolveReinforce = ()=>{
						let success = true;
						if(z.revealedDouble){
							z.revealedDouble = false;
							if(prepareSymbol(card) === "RA" || prepareSymbol(card) === "RN"){
								addAlert("Another Reinforce symbol is required to counteract the Double Sustain.");
								success = false;
							}
						} else {
							z.revealedDouble = prepareSymbol(card) === "RAx2" || prepareSymbol(card) === "RNx2";
						}
						if(success){
							for(let j = 0; !(j>=5); j++){
								removeOption(ch,j);
								removeOption("Decline to Reinforce",j);
							}
							if(couldSustain()){
								z.options[powerNum(z.countries[z.attacker].power)].unshift("Decline to Sustain");
								z.options[powerNum(z.countries[z.attacker].power)].unshift("Sustain!");
								if(isDifficult() && !bersaglieri()){
									z.options[powerNum(z.countries[z.attacker].power)].unshift("[Difficult Terrain] Discard a card from hand");
								}
								if(germanyCouldSustain()){
									z.options[2].unshift("[German Aid in the East] Decline to Sustain");
									z.options[2].unshift("[German Aid in the East] Sustain!");
								}
								if(americaCouldSustain()){
									z.options[4].unshift("[Blackjack and the Doughboys] Decline to Sustain");
									z.options[4].unshift("[Blackjack and the Doughboys] Sustain!");
								}
							} else if(germanyCouldSustain()){
								z.options[2].unshift("[German Aid in the East] Decline to Sustain");
								z.options[2].unshift("[German Aid in the East] Sustain!");
								if(isDifficult() && !bersaglieri()){
									z.options[powerNum(z.countries[z.attacker].power)].unshift("[Difficult Terrain] Discard a card from hand");
								}
							} else if(americaCouldSustain()){
								z.options[4].unshift("[Blackjack and the Doughboys] Decline to Sustain");
								z.options[4].unshift("[Blackjack and the Doughboys] Sustain!");
								if(isDifficult() && !bersaglieri()){
									z.options[powerNum(z.countries[z.attacker].power)].unshift("[Difficult Terrain] Discard a card from hand");
								}
							} else {
								resolveDefeat();
							}						
						}
						mainMenu();

					};
					
					if(country(card) === "UK" && dreadnoughts() && !z.dreadnoughts && (prepareSymbol(card) === "RN" || prepareSymbol(card) === "RNx2")){
						confirmify("Would you like to use Dreadnoughts to keep this card?",()=>{
							z.prepared[me].splice(z.prepared[me].indexOf(card),1);
							z.upDiscards[me].unshift(card);
							resolveReinforce();
						},()=>{
							z.dreadnoughts = true;
							addAlert("You use Dreadnoughts to keep the card.");
							t.value += "Using Dreadnoughts to keep the card.\r\n";
							resolveReinforce();
						});
					} else {
						z.prepared[me].splice(z.prepared[me].indexOf(card),1);
						z.upDiscards[me].unshift(card);
						resolveReinforce();
					}
				});
				
			} else if (ch === "Sustain!" || ch === "[German Aid in the East] Sustain!" || ch === "[Blackjack and the Doughboys] Sustain!"){
				let cards = [];
				for(let k = 0; !(k>=z.prepared[me].length); k++){
					let card = z.prepared[me][k];
					if((((prepareSymbol(card) === "SLB" || prepareSymbol(card) === "SLBx2") && provinces[z.target].terrain !== "Sea")
					|| ((prepareSymbol(card) === "SSB" || prepareSymbol(card) === "SSBx2") && provinces[z.target].terrain === "Sea"))
					&& (me === 1 || me === 2 || country(card) === z.attacker || (me === 4 && helperCanSustain() && country(card) === "US") )){
						if(prepareText(card) === ""){
							cards.push(card);
						} else if (prepareText(card) === "Difficult"){
							/* Bersaglieri */
							if(isDifficult()){
								cards.push(card);
							}
						} else if (prepareText(card) === "Clear"){
							/* Mk IV, Renault */
							if(provinces[z.target].terrain === "Clear" && !isDifficult()){
								cards.push(card);
							}
						} else {
							if(prepareText(card).includes(z.target)){
								cards.push(card);
							}
						}
					}
				}
				for(let j = 0; me === 3 && nivelle() && !z.nivelle && provinces[z.target].terrain !== "Sea" && !(j>=z.hands[me].length); j++){
					if(cardName(z.hands[me][j]) === "Land Battle (France)"){
						cards.push(z.hands[me][j]);
					}
				}
				for(let j = 0; me === 4 && battlecruisers() && !z.battlecruisers && provinces[z.target].terrain === "Sea" && !(j>=z.hands[me].length); j++){
					if(cardName(z.hands[me][j]) === "Sea Battle (UK)"){
						cards.push(z.hands[me][j]);
					}
				}
				
				promptText = "Which card would you like to Sustain with? (1-"+cards.length+")";
				for(let j = 0; !(j>=cards.length); j++){
					promptText += "\n"+(j+1)+": "+cardText(cards[j]);
					if(!z.prepared[me].includes(cards[j])){
						if(me === 3){
							promptText += " [General Nivelle's Creeping Barrage]";
						} else if (me === 4){
							promptText += " [Battlecruisers]";
						}
					}
				}
				if(canSustain() === "Renault"){
					promptText += "Note that you cannot win this battle; only sustain here if you want to use the effect of Renault FT Tanks.";
				}
				promptNum(promptText,(a)=>1>a||a>cards.length,mainMenu,(prompted)=>{
					let card = cards[prompted-1];
					
					let doSustain = ()=>{
						let success = true;
						if(z.revealedDouble){
							z.revealedDouble = false;
							if(prepareSymbol(card) === "SLB" || prepareSymbol(card) === "SSB"){
								addAlert("Another Sustain symbol is required to counteract the Double Reinforce.");
								success = false;
							}
						} else {
							z.revealedDouble = prepareSymbol(card) === "SLBx2" || prepareSymbol(card) === "SSBx2";
						}
						if(success){
							z.attackerConcedes = false;
							z.germanyConcedes = false;
							z.americaConcedes = false;
							removeOption("[German Aid in the East] Sustain!",2);
							removeOption("[German Aid in the East] Decline to Sustain",2);
							removeOption("[Blackjack and the Doughboys] Sustain!",4);
							removeOption("[Blackjack and the Doughboys] Decline to Sustain",4);
							removeOption("Decline to Sustain",powerNum(z.countries[z.attacker].power));
							removeOption("Sustain!",powerNum(z.countries[z.attacker].power));
							for(let j = 0; !(j>=z.defenders.length); j++){
								z.defending[j] = true;
							}
							if(couldReinforce()){
								for(let j = 0; !(j>=z.defenders.length); j++){
									t.value += z.defenders[j]+", ";
									addOption(powerNum(z.countries[z.defenders[j]].power),"Decline to Reinforce");
									addOption(powerNum(z.countries[z.defenders[j]].power),"Reinforce!");
								}
								t.value += "any further defense?\r\n";
							} else {
								resolveVictory();
							}						
						}
						mainMenu();
					};
					
					let noBigBertha = ()=>{
						if(z.prepared[me].includes(card)){
							z.prepared[me].splice(z.prepared[me].indexOf(card),1);
							t.value += bold("Sustaining with "+cardImage(card))+"\r\n";
							addAlert("Sustaining with "+cardText(card));
						} else if (z.hands[me].includes(card)){
							if(me === 3){
								z.hands[me].splice(z.hands[me].indexOf(card),1);
								z.nivelle = true;
								t.value += bold("Sustaining with "+cardImage(card)+" from hand, using General Nivelle's Creeping Barrage")+"\r\n";
								addAlert("Sustaining with "+cardText(card)+ " from hand, using General Nivelle's Creeping Barrage.");
							} else if(me === 4){
								z.hands[me].splice(z.hands[me].indexOf(card),1);
								z.battlecruisers = true;
								t.value += bold("Sustaining with "+cardImage(card)+" from hand, using Battlecruisers")+"\r\n";
								addAlert("Sustaining with "+cardText(card)+ " from hand, using Battlecruisers.");
							} 
						}
						/* RULES: Can you use Renault with Nivelle? */
						if(country(card) === "France" && renault() && !z.renault && provinces[z.target].terrain !== "Sea"){
							confirmify("Would you like to use Renault FT Tanks to return "+cardText(card)+" to your hand?",()=>{
								z.upDiscards[me].unshift(card);
								doSustain();
							},()=>{
								z.hands[me].push(card);
								addAlert("You take "+cardText(card)+" back to your hand.");
								t.value += bold("Using Renault FT Tanks to take "+cardImage(card)+" back to hand.")+"\r\n";
								z.renault = true;
								doSustain();
							});
						} else {
							z.upDiscards[me].unshift(card);
							doSustain();
						}
					};
					
					if(me === 2 && bigBertha() && !z.bigBertha && ((prepareSymbol(card) === "SLB" && z.hands[me].length > 0) || (prepareSymbol(card) === "SLBx2" && z.hands[me].length > 1))){
						confirmify("Would you like to use Big Bertha Railway Guns to keep this Sustain card but discard from your hand instead?",noBigBertha,()=>{
							discardFromHand().then(()=>{
								let doBigBertha = ()=>{
									z.bigBertha = true;
									t.value += bold("Germany uses Big Bertha Railway Guns and reveals "+cardImage(card)+ " from their prepared cards to Sustain.")+"\r\n";
									addAlert("You use Big Bertha Railway Guns.");
									doSustain();
								};
								if(prepareSymbol(card)=="SLB"){
									doBigBertha();
								} else {
									let mustDiscard = ()=>{
										discardFromHand().then(doBigBertha,mustDiscard);
									};
									mustDiscard();
								}
							},noBigBertha);
						});
					} else {
						noBigBertha();
					}
				});
			} else if (ch === "Counterattack!"){			
				let cards = [];
				for(let k = 0; !(k>=z.prepared[me].length); k++){
					let card = z.prepared[me][k];
					if(prepareSymbol(card) === "CA" && (me === 1 || me === 2 || (z.defenders.includes(country(card)) && z.countries[country(card)].supply.includes(z.target)))){
						cards.push(card);
					}
				}
				let counterattackCard = -1;
				
				let doCounterattack = (counterattackCard)=>{
					for(let j = 0; !(j>=5); j++){
						removeOption(ch,j);
						removeOption("Decline to Counterattack",j);
						if(j!==me){
							removeOption("[Difficult Terrain] Discard a card from hand");
						}
					}
					let counterattacker = country(counterattackCard);
					
					let doCounterattack2 = (counterattacker)=>{							
						z.prepared[me].splice(z.prepared[me].indexOf(counterattackCard),1);
						z.upDiscards[me].unshift(counterattackCard);
						t.value += bold("Counterattacking with ")+cardImage(counterattackCard)+"\r\n";
						addAlert("Counterattacking with "+cardText(counterattackCard));
						startBattle(counterattacker,z.source,z.target);
						mainMenu();
					};
					if(me === 1){
						doCounterattack2("Russia");
					} else if (me === 0 || me === 3){
						doCounterattack2(country(counterattackCard));
					} else if (me === 2){
						if(!germanAidInTheEast()){
							doCounterattack2("Germany");
						} else {
							let counterattackers = [];
							for(let j = 0; !(j>=z.defenders.length); j++){
								if(z.countries[z.defenders[j]].supply.includes(z.target)){
									counterattackers.push(z.defenders[j]);
								}
							}
							if(counterattackers.length === 1){
								doCounterattack2(counterattackers[0]);
							} else if (counterattackers.length > 1){
								let promptText = "[German Aid in the East] Which country is this counterattack on behalf of? (1-"+counterattackers.length+")";
								for(let j = 0; !(j>=counterattackers.length); j++){
									promptText += "\n"+(j+1)+": "+counterattackers[0];
								}
								let mustDecide = ()=>{
									promptNum(promptText,(a)=>1>a||a>counterattackers.length,mustDecide,(prompted)=>{
										doCounterattack2(counterattackers[prompted-1]);
									});
								};
								mustDecide();
							}
						}
					} else {
						if(!blackjack()){
							doCounterattack2(country(counterattackCard));
						} else {
							let counterattackers = [];
							for(let j = 0; !(j>=z.defenders.length); j++){
								if(z.countries[z.defenders[j]].supply.includes(z.target)){
									counterattackers.push(z.defenders[j]);
								}
							}
							if(counterattackers.length === 1){
								doCounterattack2(counterattackers[0]);
							} else if (counterattackers.length > 1){
								let promptText = "[Blackjack and the Doughboys] Which country is this counterattack on behalf of? (1-"+counterattackers.length+")";
								for(let j = 0; !(j>=counterattackers.length); j++){
									promptText += "\n"+(j+1)+": "+counterattackers[0];
								}
								let mustDecide = ()=>{
									promptNum(promptText,(a)=>1>a||a>counterattackers.length,mustDecide,(prompted)=>{
										doCounterattack2(counterattackers[prompted-1]);
									});
								};
								mustDecide();
							}
						}
					}
					
					
				};
				
				if(cards.length === 1){
					confirmify("Confirming you want to Counterattack with "+cardText(cards[0]),mainMenu,()=>{
						doCounterattack(cards[0]);
					});
				} else if (cards.length > 1){
					promptText = "Which card would you like to Counterattack with? (1-"+cards.length+")";
					for(let j = 0; !(j>=cards.length); j++){
						promptText += "\n"+(j+1)+": "+cardText(cards[j]);
					}
					promptNum(promptText,(a)=>1>a||a>cards.length,mainMenu,(prompted)=>{
						doCounterattack(cards[prompted-1]);
					});
				} else {
					removeOption(ch);
					mainMenu();
				}
			} else if(ch === "Decline to Sustain"){
				confirmify("Confirming you do not want to Sustain in the current battle.",mainMenu,()=>{
					removeOption(ch);
					removeOption("Sustain!");
					if(germanyCouldSustain()){
						z.attackerConcedes = true;
						plainAlert("I decline to sustain, but Germany may still sustain due to German Aid in the East.");
					} else if (americaCouldSustain()){
						z.attackerConcedes = true;
						plainAlert("I decline to sustain, but the US may still sustain due to Blackjack and the Doughboys.");
					} else {
						removeOption("[Difficult Terrain] Discard a card from hand");
						resolveDefeat();
					}
					mainMenu();
				});
			} else if(ch === "[German Aid in the East] Decline to Sustain"){
				confirmify("Confirming you do not want to Sustain in the current battle.",mainMenu,()=>{
					removeOption(ch);
					removeOption("[German Aid in the East] Sustain!");
					if(couldSustain()){
						z.germanyConcedes = true;
						plainAlert("Germany declines to sustain, but "+z.attacker+" may still sustain.");
					} else {
						resolveDefeat();
					}
					mainMenu();
				});
			} else if(ch === "[Blackjack and the Doughboys] Decline to Sustain"){
				confirmify("Confirming you do not want to Sustain in the current battle.",mainMenu,()=>{
					removeOption(ch);
					removeOption("[Blackjack and the Doughboys] Sustain!");
					if(couldSustain()){
						z.americaConcedes = true;
						plainAlert("The US declines to sustain, but "+z.attacker+" may still sustain.");
					} else {
						resolveDefeat();
					}
					mainMenu();
				});
			} else if (ch === "Decline to Reinforce"){
				confirmify("Confirming you do not want to reinforce in the current battle.",mainMenu,()=>{
					for(let x in z.countries){
						if(z.defenders.includes(x) && me === powerNum(z.countries[x].power)){
							z.defending[z.defenders.indexOf(x)] = false;
							boldAlert(x + " does not reinforce.");
						}
					}
					removeOption(ch);
					/* we don't remove the reinforce option in case you change your mind */
					if(!couldReinforce()){
						resolveVictory();
					}
					mainMenu();
				});
			} else if (ch === "Decline to Counterattack"){
				confirmify("Confirming you do not want to Counterattack.",mainMenu,()=>{
					removeOption("Counterattack!");
					removeOption(ch);
					for(let x in z.countries){
						if(z.defenders.includes(x) && me === powerNum(z.countries[x].power)){
							z.defending[z.defenders.indexOf(x)] = false;
							boldAlert(x + " does not counterattack.");
						}
					}
					if(!couldCounterattack()){
						z.attacker = null;
						z.source = null;
						z.target = null;
						z.defenders = [];
						z.defending = [];
					}
					mainMenu();
				});
			} else if (ch === "Land Battle" || ch === "Land Battle (AH)" || ch === "Land Battle (Turkey)"|| ch === "Land Battle (France)"|| ch === "Land Battle (Italy)"|| ch === "Land Battle (US)"|| ch === "Land Battle (UK)" 
			|| ch === "[Prussian Military Tradition] Land Battle" || ch === "[A Place in the Sun] Land Battle" || ch === "[Bersaglieri] Land Battle (Italy)"){
				let country2 = "";
				if(me === 1){
					country2 = "Russia";
				} else if (me === 2){
					country2 = "Germany";
				} else if (ch === "[Bersaglieri] Land Battle (Italy)"){
					country2 = "Italy";
				} else {
					country2 = /\((.*)\)/.exec(ch)[1];
				}
				let targets = [];
				let promptText = "";
				for(let x in provinces){
					if(canLandBattleIn(country2,x)){
						targets.push(x);
						promptText += "\n"+targets.length+": "+x;
					}
				}
				promptText = "What space would you like to battle in? (1-"+targets.length+")" + promptText;
				promptNum(promptText,(a)=>1>a||a>targets.length,mainMenu,(prompted)=>{
					let target = targets[prompted-1];
					let sources = [];
					let source = "";
					promptText = "";
					for(let j = 0; !(j>=z.countries[country2].supply.length); j++){
						if(provinces[target].neighbors.includes(z.countries[country2].supply[j])){
							sources.push(z.countries[country2].supply[j]);
							promptText += "\n"+sources.length+": "+z.countries[country2].supply[j];
						}
					}
					
					let doBattle = (source)=>{
						if (ch === "[A Place in the Sun] Land Battle"){
							removeOption("[A Place in the Sun] Prepare a card");
							removeOption("[A Place in the Sun] Build an Army into a space not considered difficult terrain");
							z.aPlaceInTheSun = target;
						}
						removeOption("[Mark IV Tanks] Battle an empty space to build a UK Army");
						startBattle(country2,target,source);
						removeOption(ch);
						if(ch === "[Prussian Military Tradition] Land Battle"){
							removeOption("[Prussian Military Tradition] Play a Status card");
							removeOption("[Prussian Military Tradition] Prepare a card");
						}
						mainMenu();
					};
					
					if(sources.length === 1){
						doBattle(sources[0]);
					} else {
						promptText = "Which space is the attack coming from? (1-"+sources.length+")"+promptText;
						promptNum(promptText,(a)=>1>a||a>sources.length,mainMenu,(prompted)=>{
							doBattle(sources[prompted-1]);
						});
					}
				});
			} else if (ch === "Sea Battle" || ch === "Sea Battle (AH)" || ch === "Sea Battle (France)"|| ch === "Sea Battle (Italy)"|| ch === "Sea Battle (US)"|| ch === "Sea Battle (UK)"){
				let country2 = "";
				if(me === 1){
					country2 = "Russia";
				} else if (me === 2){
					country2 = "Germany";
				} else {
					country2 = /\((.*)\)/.exec(ch)[1];
				}
				let targets = [];
				let promptText = "";
				for(let x in provinces){
					if(canSeaBattleIn(country2,x)){
						targets.push(x);
						promptText += "\n"+targets.length+": "+x;
					}
				}
				promptText = "What space would you like to battle in? (1-"+targets.length+")" + promptText;
				promptNum(promptText,(a)=>1>a||a>targets.length,mainMenu,(prompted)=>{
					let target = targets[prompted-1];
					let sources = [];
					let promptText = "";
					for(let j = 0; !(j>=z.countries[country2].supply.length); j++){
						if(provinces[target].neighbors.includes(z.countries[country2].supply[j])){
							sources.push(z.countries[country2].supply[j]);
							promptText += "\n"+sources.length+": "+z.countries[country2].supply[j];
						}
					}
					
					let doBattle = (source)=>{
						startBattle(country2,target,source);
						removeOption(ch);
						mainMenu();
					};
					if(sources.length === 1){
						doBattle(sources[0]);
					} else {
						promptText = "Which space is the attack coming from? (1-"+sources.length+")"+promptText;
						promptNum(promptText,(a)=>1>a||a>sources.length,mainMenu,(prompted)=>{
							doBattle(sources[prompted-1]);
						});
					}
				});
			} else if (ch === "[Royal Hungarian Honvéd] Recruit an AH Army in Budapest"){
				confirmify("Confirming you want to recruit an AH Army in Budapest from Royal Hungarian Honvéd.",mainMenu,()=>{
					recruitArmy("AH","BUD");
					removeOption("[Royal Hungarian Honvéd] Recruit an AH Army in Galicia");
					removeOption("[Royal Hungarian Honvéd] Recruit an AH Army in Tyrol");
					removeOption("[Royal Hungarian Honvéd] Recruit an AH Army in Budapest");
					removeOption("[Royal Hungarian Honvéd] Prepare a card");
					removeOption("[Royal Hungarian Honvéd] Draft a Build Army (AH)");
					mainMenu();
				});
			} else if (ch === "[Royal Hungarian Honvéd] Recruit an AH Army in Tyrol"){
				confirmify("Confirming you want to recruit an AH Army in Tyrol from Royal Hungarian Honvéd.",mainMenu,()=>{
					recruitArmy("AH","TYR");
					removeOption("[Royal Hungarian Honvéd] Recruit an AH Army in Galicia");
					removeOption("[Royal Hungarian Honvéd] Recruit an AH Army in Tyrol");
					removeOption("[Royal Hungarian Honvéd] Recruit an AH Army in Budapest");
					removeOption("[Royal Hungarian Honvéd] Prepare a card");
					removeOption("[Royal Hungarian Honvéd] Draft a Build Army (AH)");
					mainMenu();
				});
			} else if (ch === "[Royal Hungarian Honvéd] Recruit an AH Army in Galicia"){
				confirmify("Confirming you want to recruit an AH Army in Galicia from Royal Hungarian Honvéd.",mainMenu,()=>{
					recruitArmy("AH","GAL");
					removeOption("[Royal Hungarian Honvéd] Recruit an AH Army in Galicia");
					removeOption("[Royal Hungarian Honvéd] Recruit an AH Army in Tyrol");
					removeOption("[Royal Hungarian Honvéd] Recruit an AH Army in Budapest");
					removeOption("[Royal Hungarian Honvéd] Prepare a card");
					removeOption("[Royal Hungarian Honvéd] Draft a Build Army (AH)");
					mainMenu();
				});
			} else if (ch === "[Ottoman Mobilization] Build a Turkish Army in the Middle East"){
				confirmify("Confirming you want to build a Turkish Army in the Middle East from Ottoman Mobilization.",mainMenu,()=>{
					buildArmy("Turkey","MID");
					removeOption("[Ottoman Mobilization] Build a Turkish Army in Anatolia");
					removeOption("[Ottoman Mobilization] Build a Turkish Army in Istanbul");
					removeOption("[Ottoman Mobilization] Build a Turkish Army in Azerbaijan");
					removeOption("[Ottoman Mobilization] Build a Turkish Army in Persia");
					removeOption("[Ottoman Mobilization] Build a Turkish Army in the Middle East");
					removeOption("[Ottoman Mobilization] Prepare a card");
					removeOption("[Ottoman Mobilization] Draft a Build Army (Turkey)");
					mainMenu();
				});
			} else if (ch === "[Ottoman Mobilization] Build a Turkish Army in Persia"){
				confirmify("Confirming you want to build a Turkish Army in Persia from Ottoman Mobilization.",mainMenu,()=>{
					buildArmy("Turkey","PER");
					removeOption("[Ottoman Mobilization] Build a Turkish Army in Anatolia");
					removeOption("[Ottoman Mobilization] Build a Turkish Army in Istanbul");
					removeOption("[Ottoman Mobilization] Build a Turkish Army in Azerbaijan");
					removeOption("[Ottoman Mobilization] Build a Turkish Army in Persia");
					removeOption("[Ottoman Mobilization] Build a Turkish Army in the Middle East");
					removeOption("[Ottoman Mobilization] Prepare a card");
					removeOption("[Ottoman Mobilization] Draft a Build Army (Turkey)");
					mainMenu();
				});
			} else if (ch === "[Ottoman Mobilization] Build a Turkish Army in Azerbaijan"){
				confirmify("Confirming you want to build a Turkish Army in Azerbaijan from Ottoman Mobilization.",mainMenu,()=>{
					buildArmy("Turkey","AZE");
					removeOption("[Ottoman Mobilization] Build a Turkish Army in Anatolia");
					removeOption("[Ottoman Mobilization] Build a Turkish Army in Istanbul");
					removeOption("[Ottoman Mobilization] Build a Turkish Army in Azerbaijan");
					removeOption("[Ottoman Mobilization] Build a Turkish Army in Persia");
					removeOption("[Ottoman Mobilization] Build a Turkish Army in the Middle East");
					removeOption("[Ottoman Mobilization] Prepare a card");
					removeOption("[Ottoman Mobilization] Draft a Build Army (Turkey)");
					mainMenu();
				});
			}else if (ch === "[Ottoman Mobilization] Build a Turkish Army in Istanbul"){
				confirmify("Confirming you want to build a Turkish Army in Istanbul from Ottoman Mobilization.",mainMenu,()=>{
					buildArmy("Turkey","IST");
					removeOption("[Ottoman Mobilization] Build a Turkish Army in Anatolia");
					removeOption("[Ottoman Mobilization] Build a Turkish Army in Istanbul");
					removeOption("[Ottoman Mobilization] Build a Turkish Army in Azerbaijan");
					removeOption("[Ottoman Mobilization] Build a Turkish Army in Persia");
					removeOption("[Ottoman Mobilization] Build a Turkish Army in the Middle East");
					removeOption("[Ottoman Mobilization] Prepare a card");
					removeOption("[Ottoman Mobilization] Draft a Build Army (Turkey)");
					mainMenu();
				});
			}else if (ch === "[Ottoman Mobilization] Build a Turkish Army in Anatolia"){
				confirmify("Confirming you want to build a Turkish Army in Anatolia from Ottoman Mobilization.",mainMenu,()=>{
					buildArmy("Turkey","ANA");
					removeOption("[Ottoman Mobilization] Build a Turkish Army in Anatolia");
					removeOption("[Ottoman Mobilization] Build a Turkish Army in Istanbul");
					removeOption("[Ottoman Mobilization] Build a Turkish Army in Azerbaijan");
					removeOption("[Ottoman Mobilization] Build a Turkish Army in Persia");
					removeOption("[Ottoman Mobilization] Build a Turkish Army in the Middle East");
					removeOption("[Ottoman Mobilization] Prepare a card");
					removeOption("[Ottoman Mobilization] Draft a Build Army (Turkey)");
					mainMenu();
				});
			}else if (ch === "[Imperial Austrian Landwehr] Recruit an AH Army in Vienna"){
				confirmify("Confirming you want to recruit an AH Army in Vienna from Imperial Austrian Landwehr.",mainMenu,()=>{
					recruitArmy("AH","VIE");
					removeOption("[Imperial Austrian Landwehr] Recruit an AH Army in Vienna");
					removeOption("[Imperial Austrian Landwehr] Recruit an AH Army in Galicia");
					removeOption("[Imperial Austrian Landwehr] Recruit an AH Army in Tyrol");
					removeOption("[Imperial Austrian Landwehr] Prepare a card");
					removeOption("[Imperial Austrian Landwehr] Draft a Build Army (AH)");
					mainMenu();
				});
			} else if (ch === "[Imperial Austrian Landwehr] Recruit an AH Army in Tyrol"){
				confirmify("Confirming you want to recruit an AH Army in Tyrol from Imperial Austrian Landwehr.",mainMenu,()=>{
					recruitArmy("AH","TYR");
					removeOption("[Imperial Austrian Landwehr] Recruit an AH Army in Vienna");
					removeOption("[Imperial Austrian Landwehr] Recruit an AH Army in Galicia");
					removeOption("[Imperial Austrian Landwehr] Recruit an AH Army in Tyrol");
					removeOption("[Imperial Austrian Landwehr] Prepare a card");
					removeOption("[Imperial Austrian Landwehr] Draft a Build Army (AH)");
					mainMenu();
				});
			} else if (ch === "[Imperial Austrian Landwehr] Recruit an AH Army in Galicia"){
				confirmify("Confirming you want to recruit an AH Army in Galicia from Imperial Austrian Landwehr.",mainMenu,()=>{
					recruitArmy("AH","GAL");
					removeOption("[Imperial Austrian Landwehr] Recruit an AH Army in Vienna");
					removeOption("[Imperial Austrian Landwehr] Recruit an AH Army in Galicia");
					removeOption("[Imperial Austrian Landwehr] Recruit an AH Army in Tyrol");
					removeOption("[Imperial Austrian Landwehr] Prepare a card");
					removeOption("[Imperial Austrian Landwehr] Draft a Build Army (AH)");
					mainMenu();
				});
			} else if (ch === "[Landsturm] Recruit an Army in Prussia"){
				confirmify("Confirming you want to recruit an Army in Prussia from Landsturm.",mainMenu,()=>{
					recruitArmy("Germany","PRU");
					removeOption("[Landsturm] Recruit an Army in Prussia");
					removeOption("[Landsturm] Recruit an Army in Berlin");
					removeOption("[Landsturm] Recruit an Army in Western Germany");
					removeOption("[Landsturm] Prepare a card");
					removeOption("[Landsturm] Prepare another card");
					mainMenu();
				});
			} else if (ch === "[Landsturm] Recruit an Army in Berlin"){
				confirmify("Confirming you want to recruit an Army in Berlin from Landsturm.",mainMenu,()=>{
					recruitArmy("Germany","BER");
					removeOption("[Landsturm] Recruit an Army in Prussia");
					removeOption("[Landsturm] Recruit an Army in Berlin");
					removeOption("[Landsturm] Recruit an Army in Western Germany");
					removeOption("[Landsturm] Prepare a card");
					removeOption("[Landsturm] Prepare another card");
					mainMenu();
				});
			} else if (ch === "[Landsturm] Recruit an Army in Western Germany"){
				confirmify("Confirming you want to recruit an Army in Western Germany from Landsturm.",mainMenu,()=>{
					recruitArmy("Germany","WGE");
					removeOption("[Landsturm] Recruit an Army in Prussia");
					removeOption("[Landsturm] Recruit an Army in Berlin");
					removeOption("[Landsturm] Recruit an Army in Western Germany");
					removeOption("[Landsturm] Prepare a card");
					removeOption("[Landsturm] Prepare another card");
					mainMenu();
				});
			} else if(ch === "[Anti-Venizelists Surrender Fort Roupel] Recruit an AH Army in Greece"){
				confirmify("Confirming you want to recruit an AH Army in Greece from Anti-Venizelists Surrender Fort Roupel.",mainMenu,()=>{
					recruitArmy("AH","GRE");
					removeOption(ch);
					mainMenu();
				});
			} else if (ch === "[Bulgaria Joins Central Powers] Recruit an AH Army in Bulgaria"){
				confirmify("Confirming you want to recruit an AH Army in Bulgaria from Bulgaria Joins Central Powers.",mainMenu,()=>{
					recruitArmy("AH","BUL");
					removeOption(ch);
					mainMenu();
				});
			} else if (ch ===  "[Treaty of Amity and Alliance] Recruit an AH Army in Bulgaria"){
				confirmify("Confirming you want to recruit an AH Army in Bulgaria from Treaty of Amity and Alliance.",mainMenu,()=>{
					recruitArmy("AH","BUL");
					removeOption(ch);
					mainMenu();
				});
			} else if (ch === "[Royal Hungarian Honvéd] Prepare a card"){
				prepareCard().then(()=>{
					removeOption(ch);
					removeOption("[Royal Hungarian Honvéd] Draft a Build Army (AH)");
					mainMenu();
				},mainMenu);
			} else if (ch === "[Royal Hungarian Honvéd] Draft a Build Army (AH)"){
				confirmify("Confirming you want to draft an AH Build Army card for free from Royal Hungarian Honvéd.",mainMenu,()=>{
					draftCard("Build Army (AH)").then(()=>{
						removeOption(ch);
						mainMenu();
					});
				});
			} else if (ch === "[Imperial Austrian Landwehr] Prepare a card"){
				prepareCard().then(()=>{
					removeOption(ch);
					removeOption("[Imperial Austrian Landwehr] Draft a Build Army (AH)");
					mainMenu();
				},mainMenu);
			} else if (ch === "[Imperial Austrian Landwehr] Draft a Build Army (AH)"){
				confirmify("Confirming you want to draft an AH Build Army card for free from Imperial Austrian Landwehr.",mainMenu,()=>{
					draftCard("Build Army (AH)").then(()=>{
						removeOption(ch);
						mainMenu();
					});
				});
			} else if (ch === "[Ottoman Mobilization] Prepare a card"){
				prepareCard().then(()=>{
					removeOption(ch);
					removeOption("[Ottoman Mobilization] Draft a Build Army (Turkey)");
					mainMenu();
				},mainMenu);
			} else if (ch === "[Ottoman Mobilization] Draft a Build Army (Turkey)"){
				confirmify("Confirming you want to draft an Turkish Build Army card for free from Ottoman Mobilization.",mainMenu,()=>{
					draftCard("Build Army (Turkey)").then(()=>{
						removeOption(ch);
						mainMenu();
					});
				});
			} else if (ch === "Build an Army" || ch === "Build an AH Army" || ch === "Build a Turkish Army" || ch === "Build a French Army"
			|| ch ===  "Build an Italian Army"|| ch ===  "Build a UK Army"|| ch === "Build a US Army"){
				let country2 = "";
				switch(ch){
					case "Build an Army":
						if(me === 1){
							country2 = "Russia";
						} else if (me === 2){
							country2 = "Germany";
						}
						break;
					case "Build an AH Army":
						country2 = "AH";
						break;
					case "Build a Turkish Army":
						country2 = "Turkey";
						break;
					case "Build a French Army":
						country2 = "France";
						break;
					case "Build an Italian Army":
						country2 = "Italy";
						break;
					case "Build a UK Army":
						country2 = "UK";
						break;
					case "Build a US Army":
						country2 = "US";
						break;
				}
				let sites = [];
				let promptText = "";
				for(let x in provinces){
					if(canBuildArmyIn(country2,x)){
						sites.push(x);
						promptText += "\n"+sites.length+": "+x;
					}
				}
				promptText = "Where would you like to build the Army? (1-"+sites.length+")"+promptText;
				promptNum(promptText,(a)=>1>a||a>sites.length,mainMenu,(prompted)=>{
					buildArmy(country2,sites[prompted-1]);
					removeOption(ch);
					mainMenu();
				});
			} else if (ch === "Build a Navy" || ch === "Build an AH Navy" || ch === "Build a French Navy"
			|| ch ===  "Build an Italian Navy"|| ch ===  "Build a UK Navy"|| ch === "Build a US Navy" || ch === "[France Mobilizes] Build a French Navy"){
				let country2 = "";
				switch(ch){
					case "Build a Navy":
						if(me === 1){
							country2 = "Russia";
						} else if (me === 2){
							country2 = "Germany";
						}
						break;
					case "Build an AH Navy":
						country2 = "AH";
						break;
					case "Build a French Navy":
					case "[France Mobilizes] Build a French Navy":
						country2 = "France";
						break;
					case "Build an Italian Navy":
						country2 = "Italy";
						break;
					case "Build a UK Navy":
						country2 = "UK";
						break;
					case "Build a US Navy":
						country2 = "US";
						break;
				}
				let sites = [];
				let promptText = "";
				for(let x in provinces){
					if(canBuildNavyIn(country2,x)){
						sites.push(x);
						promptText += "\n"+sites.length+": "+x;
					}
				}
				promptText = "Where would you like to build the Navy? (1-"+sites.length+")"+promptText;
				promptNum(promptText,(a)=>1>a||a>sites.length,mainMenu,(prompted2)=>{
					if(ch === "[France Mobilizes] Build a French Navy") {
						boldAlert("Built a French Navy in "+sites[prompted2-1]+".");
					} else {
						boldAlert("Built"+ch.slice(5)+" in "+sites[prompted2-1]+".");
					}
					buildNavy(country2,sites[prompted2-1]);
					removeOption(ch);
					if(ch === "[France Mobilizes] Build a French Navy"){
						removeOption("[France Mobilizes] Recruit a French Army in Provence");
						removeOption("[France Mobilizes] Recruit a French Army in Burgundy");
						removeOption("[France Mobilizes] Recruit a French Army in Picardy");
						removeOption("[France Mobilizes] Recruit a French Army in Paris");
						removeOption("[France Mobilizes] Draft a French Build Army card");
						removeOption("[France Mobilizes] Draft a French Land Battle card");
					}
					mainMenu();
				});
			} else if (ch === "Remove a piece from the board" || ch === "[Peace, Bread, Land] Remove a piece from the board"){
				let pieces = [];
				switch(me){
					case 0:
						for(let j = 0; !(j>=z.countries.AH.armies.length); j++){
							let loc = z.countries.AH.armies[j];
							if(loc !== ""){
								pieces.push(["AH Army in "+loc,"AH","armies",j]);
							}
						}
						if(z.countries.AH.navies[0] !== ""){
							pieces.push(["AH Navy in "+z.countries.AH.navies[0],"AH","navies",0]);
						}
						for(let j = 0; !(j>=z.countries.Turkey.armies.length); j++){
							let loc = z.countries.Turkey.armies[j];
							if(loc !== ""){
								pieces.push(["Turkish Army in "+loc,"Turkey","armies",j]);
							}
						}
						break;
					case 1:
						for(let j = 0; !(j>=z.countries.Russia.armies.length); j++){
							let loc = z.countries.Russia.armies[j];
							if(loc !== ""){
								pieces.push(["Army in "+loc,"Russia","armies",j]);
							}
						}
						for(let j = 0; !(j>=z.countries.Russia.navies.length); j++){
							let loc = z.countries.Russia.navies[j];
							if(loc !== ""){
								pieces.push(["Navy in "+loc,"Russia","navies",j]);
							}
						}
						break;
					case 2:
						for(let j = 0; !(j>=z.countries.Germany.armies.length); j++){
							let loc = z.countries.Germany.armies[j];
							if(loc !== ""){
								pieces.push(["Army in "+loc,"Germany","armies",j]);
							}
						}
						for(let j = 0; !(j>=z.countries.Germany.navies.length); j++){
							let loc = z.countries.Germany.navies[j];
							if(loc !== ""){
								pieces.push(["Navy in "+loc,"Germany","navies",j]);
							}
						}
						break;
					case 3:
						for(let j = 0; !(j>=z.countries.France.armies.length); j++){
							let loc = z.countries.France.armies[j];
							if(loc !== ""){
								pieces.push(["French Army in "+loc,"France","armies",j]);
							}
						}
						for(let j = 0; !(j>=z.countries.France.navies.length); j++){
							let loc = z.countries.France.navies[j];
							if(loc !== ""){
								pieces.push(["French Navy in "+loc,"France","navies",j]);
							}
						}
						for(let j = 0; !(j>=z.countries.Italy.armies.length); j++){
							let loc = z.countries.Italy.armies[j];
							if(loc !== ""){
								pieces.push(["Italian Army in "+loc,"Italy","armies",j]);
							}
						}
						if(z.countries.Italy.navies[0] !== ""){
							pieces.push(["Italian Navy in "+z.countries.Italy.navies[0],"Italy","navies",0]);
						}
						break;
					case 4:
						for(let j = 0; !(j>=z.countries.UK.armies.length); j++){
							let loc = z.countries.UK.armies[j];
							if(loc !== ""){
								pieces.push(["UK Army in "+loc,"UK","armies",j]);
							}
						}
						for(let j = 0; !(j>=z.countries.UK.navies.length); j++){
							let loc = z.countries.UK.navies[j];
							if(loc !== ""){
								pieces.push(["UK Navy in "+loc,"UK","navies",j]);
							}
						}
						for(let j = 0; !(j>=z.countries.US.armies.length); j++){
							let loc = z.countries.US.armies[j];
							if(loc !== ""){
								pieces.push(["US Army in "+loc,"US","armies",j]);
							}
						}
						for(let j = 0; !(j>=z.countries.US.navies.length); j++){
							let loc = z.countries.US.navies[j];
							if(loc !== ""){
								pieces.push(["US Navy in "+loc,"US","navies",j]);
							}
						}
						break;
				}
				let promptText = "Which piece would you like to remove? (1-"+pieces.length+")";
				for(let j = 0; !(j>=pieces.length); j++){
					promptText += "\n"+(j+1)+": "+pieces[j][0];
				}
				promptNum(promptText,(a)=>1>a||a>pieces.length,mainMenu,(prompted2)=>{
					let piece = pieces[prompted2-1];
					boldAlert("Removed "+piece[0]+".");
					z.countries[piece[1]][piece[2]][piece[3]] = "";
					updateSupply(piece[1]);
					if(ch === "[Peace, Bread, Land] Remove a piece from the board"){
						modifyEntente(1);
						z.peaceBreadLand++;
						if(z.peaceBreadLand === 5){
							removeOption(ch);
						}
					}
					mainMenu();
				});
			} else if (ch === "[Third OHL] Play an Economic Warfare card"){
				let statuses = [];
				let promptText = "";
				for(let j = 0; !(j>=z.hands[me].length); j++){
					if(cardType(z.hands[me][j]) === "Economic Warfare"){
						statuses.push(z.hands[me][j]);
						promptText += "\n"+ statuses.length + ": "+cardText(z.hands[me][j]);
					}
				}
				let prompting = true;
				promptText = "Which Economic Warfare would you like to play? (1-"+statuses.length+")" + promptText;
				promptNum(promptText,(a)=>1>a||a>statuses.length,mainMenu,(prompted)=>{
					removeOption(ch);
					removeOption("[Third OHL] Draft a Build Army card");
					removeOption("[Third OHL] Play a Status card");
					playCard(statuses[prompted-1]);
					mainMenu();
				});
			} else if (ch === "[Third OHL] Play a Status card" || ch === "[Moltke the Younger Mobilizes Western Advance] Play a Status card" 
			|| ch === "[Prussian Military Tradition] Play a Status card" || ch === "[Ninth Army Formed to Defend East Prussia] Play a Status card"
			|| ch === "[Volunteer Movement] Play a Status card" || ch === "[Landwehr] Play a Status card" || ch === "[The Royal Navy] Play a Status card"
			|| ch === "[Cambrai] Play a Status card"){
				ukonly = (ch === "[The Royal Navy] Play a Status card" || ch === "[Cambrai] Play a Status card");
				let statuses = [];
				let promptText = "";
				for(let j = 0; !(j>=z.hands[me].length); j++){
					if(cardType(z.hands[me][j]) === "Status"){
						if(ukonly && country(z.hands[me][j]) === "US"){
							continue;
						}
						statuses.push(z.hands[me][j]);
						promptText += "\n"+ statuses.length + ": "+cardText(z.hands[me][j]);
					}
				}
				let prompting = true;
				promptText = "Which status would you like to play? (1-"+statuses.length+")" + promptText;
				promptNum(promptText,(a)=>1>a||a>statuses.length,mainMenu,(prompted)=>{
					removeOption(ch);
					removeOption("[Moltke the Younger Mobilizes Western Advance] Prepare a card");
					removeOption("[Prussian Military Tradition] Prepare a card");
					removeOption("[Ninth Army Formed to Defend East Prussia] Prepare a card");
					removeOption("[Volunteer Movement] Prepare a card");
					removeOption("[Volunteer Movement] Draft a Build Army card");
					removeOption("[Landwehr] Prepare a card");
					removeOption("[Third OHL] Draft a Build Army card");
					playCard(statuses[prompted-1]);
					mainMenu();
				});
			} else if (ch === "[The Royal Navy] Recruit a UK Navy" || ch === "[The Royal Navy] Recruit another UK Navy"){
				let sites = ["EAS","WES","NAO","ENG"];
				let promptText = "";
				for(let j = 0; !(j>=sites.length); j++){
					if(!canRecruitNavyIn("UK",sites[j])){
						sites.splice(j,1);
						j--;
					} else {
						promptText += "\n" + (j+1) + ": " + sites[j];
					}
				}
				promptText = "Where would you like to recruit a UK Navy? (1-"+sites.length+")"+promptText;
				promptNum(promptText,(a)=>1>a||a>sites.length,mainMenu,(prompted)=>{
					recruitNavy("UK",sites[prompted-1]);
					removeOption(ch);
					removeOption("[The Royal Navy] Play a Status card");
					if(ch === "[The Royal Navy] Recruit a UK Navy"){
						z.options[me].unshift("[The Royal Navy] Recruit another UK Navy");
					}
					mainMenu();
				});
				
			} else if (ch === "[Third OHL] Draft a Build Army card"){
				confirmify("Confirming you want to draft a Build Army card from Third OHL.",mainMenu,()=>{
					draftCard("Build Army").then(()=>{
						removeOption(ch);
						mainMenu();
					});
				});
			} else if (ch === "[Volunteer Movement] Draft a Build Army card"){
				confirmify("Confirming you want to draft a Build Army card from Volunteer Movement.",mainMenu,()=>{
					draftCard("Build Army").then(()=>{
						removeOption(ch);
						mainMenu();
					});
				});
			} else if (ch === "[Volunteer Movement] Prepare a card"){
				prepareCard().then(()=>{
					removeOption("[Volunteer Movement] Draft a Build Army card");
					removeOption(ch);
					mainMenu();
				},mainMenu);
			} else if (ch === "[Unrestricted Submarine Warfare] Discard a Sea Battle card from hand"){
				for(let j = 0; !(j>=z.hands[me].length); j++){
					if(cardName(z.hands[me][j]) === "Sea Battle"){
						z.upDiscards[me].unshift(z.hands[me].splice(j,1)[0]);
						t.value += bold("Discarding a Sea Battle for "+UKUS+UKUS+".")+"\r\n";
						addAlert("UK is hit for 2 more attrition.");
						z.attrition[4]+=2;
						break;
					}
				}
				mainMenu();
			} else if (ch.slice(0,21) === "[Draft Step] Draft a "){
				let card = ch.slice(21);
				confirmify("Confirming you want to draft a "+card+".",mainMenu,()=>{
					draftCard(ch.slice(21)).then(()=>{
						z.step = 1;
						mainMenu();
					});
				});
			} else if (ch === "[Barès Expands Armée de l'Air] Draft a French Land Battle"){
				confirmify("Confirming you want to draft a French Land Battle, courtesy of Barès.",mainMenu,()=>{
					draftCard("Land Battle (France)").then(()=>{
						z.step = 1;
						mainMenu();
					});
				});
			} else if (ch === "[Troupes Coloniales] Draft a French Build Army"){
				confirmify("Confirming you want to draft a French Build Army for free, courtesy of Troupes Coloniales.",mainMenu,()=>{
					draftCard("Build Army (France)").then(()=>{
						z.step = 1;
						mainMenu();
					});
				});
			} else if (ch === "[The Pals Battalions] Draft a UK Build Army from discards (-1 VP)"){
				confirmify("Confirming you want to draft a UK Build Army from your discard pile, at the cost of 1 VP, courtesy of The Pals Battalions.",mainMenu,()=>{
					let foundCard = false;
					for (let j = 0; !(j >= z.upDiscards[me].length) && !foundCard; j++) {
						if (
								cardType(z.upDiscards[me][j]) === "Build Army" &&
								country(z.upDiscards[me][j]) === "UK"
								) {
							z.hands[me].push(z.upDiscards[me][j]);
							z.upDiscards[me].splice(j, 1);
							boldAlert("Drafting a Build Army (UK) card from the UK/US discard pile; losing 1 VP.");
							modifyEntente(-1);
							foundCard = true;
							z.step = 1;
						}
					}
					for (j = 0; !(j >= z.downDiscards[me].length) && !foundCard; j++) {
						if (
								cardType(z.downDiscards[me][j]) === "Build Army" &&
								country(z.downDiscards[me][j]) === "UK"
								) {
							z.hands[me].push(z.downDiscards[me][j]);
							z.downDiscards[me].splice(j, 1);
							boldAlert("Drafting a Build Army (UK) card from the UK/US discard pile; losing 1 VP.");
							modifyEntente(-1);
							foundCard = true;
							z.step = 1;
						}
					}
					if (!foundCard) {
						addAlert("You have no Build Army (UK) cards in your discard pile.");
					}
					mainMenu();
				});
			} else if (ch === "[Attrition] Take a VP penalty."){
				confirmify("Confirming you want to take a "+z.attrition[me]+" VP penalty rather than discard from attrition.",mainMenu,()=>{
					if(me === 0 || me === 2){
						modifyCP(-z.attrition[me]);
					} else {
						modifyEntente(-z.attrition[me]);
					}
					z.attrition[me] = 0;
					mainMenu();
				});
			} else if (ch === "[Attrition] Discard a card from the top of your draw deck"){
				discardFromDeck().then(()=>{
					z.attrition[me]--;
					mainMenu();
				},mainMenu);
			} else if(ch === "[Attrition] Discard a card from hand"){
				discardFromHand().then(()=>{
					z.attrition[me]--;
					mainMenu();
				},mainMenu);
			} else if(ch === "[Attrition] Discard a prepared card"){
				discardPrepared().then(()=>{
					z.attrition[me]--;
					mainMenu();
				},mainMenu);
			} else if(ch === "[Draft Step] Discard a card from hand"){
				discardFromHand().then(()=>{
					removeOption("[Troupes Coloniales] Draft a French Build Army");
					removeOption(ch);
					z.options[me].unshift("[Draft Step] Discard a second card from hand");
					mainMenu();
				},mainMenu);
			} else if (ch === "[The Extravagant Lifestyle of the Aristocracy] Discard a card from hand"){
				discardFromHand().then(()=>{
					removeOption(ch);
					z.attrition[1]++;
					addAlert("Russia is hit for another card of attrition.");
					t.value += RUS + "\r\n";
					z.options[me].unshift("[The Extravagant Lifestyle of the Aristocracy] Discard another card from hand");
					mainMenu();
				},mainMenu);
			} else if (ch === "[The Extravagant Lifestyle of the Aristocracy] Discard another card from hand"){
				discardFromHand().then(()=>{
					removeOption(ch);
					z.attrition[1]++;
					addAlert("Russia is hit for another card of attrition.");
					t.value += RUS + "\r\n";
					mainMenu();
				},mainMenu);
			} else if(ch === "[Draft Step] Discard a second card from hand"){
				discardFromHand().then(()=>{
					removeOption(ch);
					if(me === 1 || me === 2){
						z.options[me].unshift("[Draft Step] Draft a Build Navy");
						z.options[me].unshift("[Draft Step] Draft a Build Army");	
					} else if (me === 0){
						z.options[me].unshift("[Draft Step] Draft a Build Army (Turkey)");
						z.options[me].unshift("[Draft Step] Draft a Build Navy (AH)");
						z.options[me].unshift("[Draft Step] Draft a Build Army (AH)");
					} else if (me === 3){
						z.options[me].unshift("[Draft Step] Draft a Build Navy (Italy)");
						z.options[me].unshift("[Draft Step] Draft a Build Army (Italy)");
						z.options[me].unshift("[Draft Step] Draft a Build Navy (France)");
						z.options[me].unshift("[Draft Step] Draft a Build Army (France)");
						z.options[me].unshift("[Barès Expands Armée de l'Air] Draft a French Land Battle");
					} else if (me === 4){
						z.options[me].unshift("[Draft Step] Draft a Build Navy (US)");
						z.options[me].unshift("[Draft Step] Draft a Build Army (US)");
						z.options[me].unshift("[Draft Step] Draft a Build Navy (UK)");
						z.options[me].unshift("[Draft Step] Draft a Build Army (UK)");
						z.options[me].unshift("[The Pals Battalions] Draft a UK Build Army from discards (-1 VP)");
					}
					mainMenu();
				},mainMenu);			
			} else if (ch === "[Play Step] Play a card"){
				playFromHand().then(()=>{
					z.step = 2;
					mainMenu();
				},mainMenu);
			}
		},"",true);
	}
} // ENDQMGB [/size] 