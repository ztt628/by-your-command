/*[c][size=1] STARTLEA /**/
var myUsername = "";
var usernameRE = /href="\/collection\/user\/(.*?)">Collection/.exec(document.body.innerHTML);
if(usernameRE){
	myUsername = usernameRE[1];
}

/*jshint -W018*/ /* jshint -W083 */ /* jshint -W098 */ /* jshint -W080 */ /*jshint -W086*/ /*jshint +W117*/ /*jshint -W069*/ 
/*var document = "";var module = "";var alert = "";var alertify = "";var confirm = "";var prompt = ""; var define=""; var setTimeout = ""; var window = ""; var Event = "";*/
var z = {};
var ts = document.getElementsByTagName("textarea");
var t = ts[ts.length-1];
var me = -1;
var meReal = -1;
var bl = "";
var mobile = false;

function inv() {
	/* DEDAFF */
	return colorText("#F7F7F8", "|");
} /***** ALERTIFY ****/
var lb = String.fromCharCode(60);
var TRANSITION_FALLBACK_DURATION = 500;
var hideElement = function(el) {
	if(!el) {
		return;
	}
	let removeThis = function() {
		if(el && el.parentNode) {
			el.parentNode.removeChild(el);
		}
	};
	el.classList.remove("show");
	el.classList.add("hide");
	el.addEventListener("transitionend", removeThis); /* alertify: Fallback for no transitions. */
	setTimeout(removeThis, TRANSITION_FALLBACK_DURATION);
};

function Alertify() {
	/**	 * Alertify private object	 * @type {Object}	 */ /* _alertify is a struct, with functions... */
	let _alertify = {
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
				cancel: lb + "button class='cancel' tabindex='2'>{" + "{cancel}}" + lb + "/button>",
				choice: lb + "button class='choice' id='choice{" + "{num}}'>{" + "{choice}}" + lb + "/button>"
			},
			input: lb + "input type='text'>",
			message: lb + "p class='msg'>{" + "{message}}" + lb + "/p>",
			log: lb + "div class='{" + "{class}}'>{" + "{message}}" + lb + "/div>"
		},
		defaultDialogs: {
			buttons: {
				holder: lb + "nav>{" + "{buttons}}" + lb + "/nav>",
				ok: lb + "button class='ok' tabindex='1'>{" + "{ok}}" + lb + "/button>",
				cancel: lb + "button class='cancel' tabindex='2'>{" + "{cancel}}" + lb + "/button>"
			},
			input: lb + "input type='text'>",
			message: lb + "p class='msg'>{" + "{message}}" + lb + "/p>",
			log: lb + "div class='{" + "{class}}'>{" + "{message}}" + lb + "/div>"
		},
		/**		 * Build the proper message box		 *		 * @param  {Object} item    Current object in the queue		 *		 * @return {String}         An HTML string of the message box		 */
		build: function(item) {
			/* promptButton uses onOkay to carry illegal with us... */
			let btnTxt = this.dialogs.buttons.ok;
			let html = lb + "div class='dialog'>" + lb + "div>";
			if(item.type === "promptButton" && typeof item.message === "string") {
				let illegal = item.onOkay;
				let split = item.message.split("\n");
				let foundAnyChoices = false;
				for(let j = 0; !(j >= split.length); j++) {
					let re = /^([ABC]|\d+): (.*)$/.exec(split[j]);
					if(re === null) {
						html += this.dialogs.message.replace("{" + "{message}}", split[j]);
					} else {
						foundAnyChoices = true;
						let n = parseInt(re[1]);
						if(isNaN(n) || !illegal(n)) {
							/* valid options or a number, gets id choiceA, choiceB, choiceC, choice0, choice1, etc... */
							html += this.dialogs.buttons.holder.replace("{" + "{buttons}}", this.dialogs.buttons.choice.replace("{" + "{choice}}", re[
								2]).replace("{" + "{num}}", re[1]));
						} else {
							html += this.dialogs.message.replace("{" + "{message}}", split[j]);
						}
					}
				}
				if(!foundAnyChoices) {
					for(let n = 0; !(n > 30); n++) {
						if(!illegal(n)) {
							html += this.dialogs.buttons.holder.replace("{" + "{buttons}}", this.dialogs.buttons.choice.replace("{" + "{choice}}", n)
								.replace("{" + "{num}}", n));
						}
					}
				}
				html += this.dialogs.buttons.holder.replace("{" + "{buttons}}", this.dialogs.buttons.cancel.replace("{" + "{cancel}}", this
					.cancelLabel));
				html += lb + "/div>" + lb + "/div>";
				return html;
			}
			if(typeof item.message === "string") {
				item.message = item.message.replace(/\n/g, lb + "br>");
			}
			html += this.dialogs.message.replace("{" + "{message}}", item.message);
			if(item.type === "confirm" || item.type === "prompt") {
				btnTxt = this.dialogs.buttons.cancel + this.dialogs.buttons.ok;
			}
			if(item.type === "prompt") {
				html += this.dialogs.input;
			}
			html = (html + this.dialogs.buttons.holder + lb + "/div>" + lb + "/div>").replace("{" + "{buttons}}", btnTxt).replace("{" + "{ok}}", this
				.okLabel).replace("{" + "{cancel}}", this.cancelLabel);
			return html;
		},
		/**		 * Create a dialog box		 *		 * @param  {String}   message      The message passed from the callee		 * @param  {String}   type         Type of dialog to create		 * @param  {Function} onOkay       [Optional] Callback function when clicked okay.		 * @param  {Function} onCancel     [Optional] Callback function when cancelled.		 *		 * @return {Object}		 */
		dialog: function(message, type, onOkay, onCancel) {
			return this.setup({
				type: type,
				message: message,
				onOkay: onOkay,
				onCancel: onCancel
			});
		},
		/**		 * Initiate all the required pieces for the dialog box		 *		 * @return {undefined}		 */ setup: function(item) {
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
			if(choiceA) {
				choices.push(choiceA);
			}
			if(choiceB) {
				choices.push(choiceB);
			}
			if(choiceC) {
				choices.push(choiceC);
			}
			for(let j = 0; !(j > 20); j++) {
				let choiceN = el.querySelector("#choice" + j);
				if(choiceN) {
					choices.push(choiceN);
				}
			} /*document.getElementById("body").parentNode.insertBefore(el,document.getElementById("body")); */ /* alertify: Set default value/placeholder of input */
			if(input) {
				if(typeof this.promptPlaceholder === "string") {
					/* alertify: Set the label, if available, for MDL, etc. */
					if(label) {
						label.textContent = this.promptPlaceholder;
					} else {
						input.placeholder = this.promptPlaceholder;
					}
				}
				if(typeof this.promptValue === "string") {
					input.value = this.promptValue;
				}
			} /* is there any reject? gotta have cleanup... */
			function setupHandlers(resolve) {
				if("function" !== typeof resolve) {
					/* alertify: promises are not available so resolve is a no-op */
					resolve = function() {};
				}
				for(let j = 0; !(j >= choices.length); j++) {
					choices[j].addEventListener("click", (ev) => {
						resolve({
							buttonClicked: choices[j].id,
							event: ev
						});
						hideElement(el);
					});
				}
				if(btnOK) {
					if(!input) {
						btnOK.addEventListener("keyup", function(ev) {
							if(ev.which === 27) {
								if(btnCancel) {
									btnCancel.click();
								} else {
									btnOK.click();
								}
							}
						});
					}
					btnOK.addEventListener("click", function(ev) {
						if(input) {
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
				if(btnCancel) {
					btnCancel.addEventListener("click", function(ev) {
						if(item.onCancel && "function" === typeof item.onCancel) {
							item.onCancel(ev);
						}
						if(input) {
							resolve({
								buttonClicked: "cancel",
								inputValue: input.value,
								event: ev
							});
						} else {
							resolve({
								buttonClicked: "cancel",
								event: ev
							});
						}
						hideElement(el);
					});
				}
				if(input) {
					input.addEventListener("keyup", function(ev) {
						if(ev.which === 13) {
							btnOK.click();
						} else if(ev.which === 27) {
							btnCancel.click();
						}
					});
				}
			}
			let promise;
			if(typeof Promise === "function") {
				promise = new Promise(setupHandlers);
			} else {
				setupHandlers();
			}
			this.parent.appendChild(el);
			setTimeout(function() {
				el.classList.remove("hide");
				if(input && item.type && item.type === "prompt") {
					input.select(); /* I don't think this works on iOS */
					input.focus();
				} else {
					if(btnOK) {
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
		/*setMaxLogItems: function(num) {			this.maxLogItems = parseInt(num || this.defaultMaxLogItems);		},*/ /* TODO: play around with this, though then we may need to be careful with calls to reset. */
		theme: function(themeStr) {
			switch (themeStr.toLowerCase()) {
				case "bootstrap":
					this.dialogs.buttons.ok = lb + "button class='ok btn btn-primary' tabindex='1'>{" + "{ok}}" + lb + "/button>";
					this.dialogs.buttons.cancel = lb + "button class='cancel btn btn-default' tabindex='2'>{" + "{cancel}}" + lb + "/button>";
					this.dialogs.input = lb + "input type='text' class='form-control'>";
					break;
				case "purecss":
					this.dialogs.buttons.ok = lb + "button class='ok pure-button' tabindex='1'>{" + "{ok}}" + lb + "/button>";
					this.dialogs.buttons.cancel = lb + "button class='cancel pure-button' tabindex='2'>{" + "{cancel}}" + lb + "/button>";
					break;
				case "mdl":
				case "material-design-light":
					this.dialogs.buttons.ok = lb + "button class='ok mdl-button mdl-js-button mdl-js-ripple-effect'  tabindex='1'>{" + "{ok}}" + lb +
						"/button>";
					this.dialogs.buttons.cancel = lb + "button class='cancel mdl-button mdl-js-button mdl-js-ripple-effect' tabindex='2'>{" +
						"{cancel}}" + lb + "/button>";
					this.dialogs.input = lb + "div class='mdl-textfield mdl-js-textfield'>" + lb + "input class='mdl-textfield__input'>" + lb +
						"label class='md-textfield__label'>" + lb + "/label>" + lb + "/div>";
					break;
				case "angular-material":
					this.dialogs.buttons.ok = lb + "button class='ok md-primary md-button' tabindex='1'>{" + "{ok}}" + lb + "/button>";
					this.dialogs.buttons.cancel = lb + "button class='cancel md-button' tabindex='2'>{" + "{cancel}}" + lb + "/button>";
					this.dialogs.input = lb + "div layout='column'>" + lb + "md-input-container md-no-float>" + lb + "input type='text'>" + lb +
						"/md-input-container>" + lb + "/div>";
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
			this.cancelBtn(this.defaultCancelLabel); /*this.setMaxLogItems();*/
			this.promptValue = "";
			this.promptPlaceholder = "";
			this.delay = this
			.defaultDelay; /*this.setCloseLogOnClick(this.closeLogOnClickDefault);			this.setLogPosition("bottom left");			this.logTemplateMethod = null;*/
		},
		injectCSS: function() {
			if(!document.querySelector("#alertifyCSS")) {
				let head = document.getElementsByTagName("head")[0];
				let css = document.createElement("style");
				css.type = "text/css";
				css.id = "alertifyCSS";
				css.innerHTML =
					".alertify-logs > * {  padding: 12px 24px;  color: #fff;  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);  border-radius: 1px; }  .alertify-logs > *, .alertify-logs > *.default {    background: rgba(0, 0, 0, 0.8); }  .alertify-logs > *.error {    background: rgba(244, 67, 54, 0.8); }  .alertify-logs > *.success {    background: rgba(76, 175, 80, 0.9); } .alertify2 {position: fixed;  background-color: rgba(0, 0, 0, 0.3);  left: 0;  right: 0;  top: 0;  bottom: 0;  width: 100%;  height: 100%;  z-index: 99998;  box-sizing: border-box;  transition: all 0.33s cubic-bezier(0.25, 0.8, 0.25, 1);} .alertify {  position: fixed;  background-color: rgba(0, 0, 0, 0);  left: 0;  right: 0;  top: 0;  bottom: 0;  width: 100%;  height: 100%;  z-index: 99999; }  .alertify.hide {    opacity: 0;    pointer-events: none; }  .alertify, .alertify.show {    box-sizing: border-box;    transition: all 0.33s cubic-bezier(0.25, 0.8, 0.25, 1); }  .alertify, .alertify * {    box-sizing: border-box; }  .alertify .dialog {    padding: 12px; }  .alertify .dialog, .alertify .alert {    width: 100%;	transform: translateY(-50%);    margin: 0 auto;    position: relative;    top: 50%;    transform: translateY(-50%); }    .alertify .dialog > *, .alertify .alert > * {      width: 400px;      max-width: 95%;      margin: 0 auto;      text-align: center;      padding: 12px;      background: #fff;      box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.14), 0 4px 5px 0 rgba(0, 0, 0, 0.098), 0 1px 10px 0 rgba(0, 0, 0, 0.084); }    .alertify .dialog .msg, .alertify .alert .msg {      padding: 12px;      margin-bottom: 12px;      margin: 0;      text-align: left; }    .alertify .dialog input:not(.form-control), .alertify .alert input:not(.form-control) {      margin-bottom: 15px;      width: 100%;      font-size: 100%;      padding: 12px; }      .alertify .dialog input:not(.form-control):focus, .alertify .alert input:not(.form-control):focus {        outline-offset: -2px; }    .alertify .dialog nav, .alertify .alert nav {      text-align: right; }      .alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button), .alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button) {        background: transparent;        box-sizing: border-box;        color: rgba(0, 0, 0, 0.87);        position: relative;        outline: 0;        border: 0;        display: inline-block;        -ms-flex-align: center;            -ms-grid-row-align: center;            align-items: center;        padding: 0 6px;        margin: 6px 8px;        line-height: 36px;        min-height: 36px;        white-space: nowrap;        min-width: 88px;        text-align: center;      font-size: 14px;        text-decoration: none;        cursor: pointer;        border: 1px solid transparent;        border-radius: 2px; }        .alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):hover, .alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):active, .alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):hover, .alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):active {          background-color: rgba(0, 0, 0, 0.05); }        .alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):focus, .alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):focus {          border: 1px solid rgba(0, 0, 0, 0.1); }      .alertify .dialog nav button.btn, .alertify .alert nav button.btn {        margin: 6px 4px; }.alertify-logs {  position: fixed;  z-index: 99999; }  .alertify-logs.bottom, .alertify-logs:not(.top) {    bottom: 16px; }  .alertify-logs.left, .alertify-logs:not(.right) {    left: 16px; }    .alertify-logs.left > *, .alertify-logs:not(.right) > * {      float: left;      transform: translate3d(0, 0, 0);      height: auto; }      .alertify-logs.left > *.show, .alertify-logs:not(.right) > *.show {        left: 0; }      .alertify-logs.left > *, .alertify-logs.left > *.hide, .alertify-logs:not(.right) > *, .alertify-logs:not(.right) > *.hide {        left: -110%; }  .alertify-logs.right {    right: 16px; }    .alertify-logs.right > * {      float: right;      transform: translate3d(0, 0, 0); }      .alertify-logs.right > *.show {        right: 0;        opacity: 1; }      .alertify-logs.right > *, .alertify-logs.right > *.hide {        right: -110%;        opacity: 0; }  .alertify-logs.top {    top: 0; }  .alertify-logs > * {    box-sizing: border-box;    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);    position: relative;    clear: both;    backface-visibility: hidden;    perspective: 1000; }    .alertify-logs > * {      max-height: 0;      margin: 0;      padding: 0;      overflow: hidden;      opacity: 0;      pointer-events: none; }    .alertify-logs > *.show {      margin-top: 12px;      opacity: 1;      max-height: 1000px;      padding: 12px;      pointer-events: auto; }";
				head.insertBefore(css, head.firstChild);
			}
		},
		removeCSS: function() {
			let css = document.querySelector("#alertifyCSS");
			if(css && css.parentNode) {
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
		promptButton: function(message, illegal, onCancel) {
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
			_alertify.setCloseLogOnClick(!!bool);
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
} /* alertify: AMD, window, and NPM support */
if("undefined" !== typeof module && !!module && !!module.exports) {
	/* alertify: Preserve backwards compatibility */
	module.exports = function() {
		return new Alertify();
	};
	let obj = new Alertify();
	for(let key in obj) {
		module.exports[key] = obj[key];
	}
} else if(typeof define === "function" && define.amd) {
	define(function() {
		return new Alertify();
	});
} else {
	window.alertify = new Alertify();
} /**** END ALERTIFY ****/
var alertifyBackground = document.createElement("div");
alertifyBackground.className = "alertify2 hide";
document.body.appendChild(alertifyBackground);
setTimeout(function() {
	alertifyBackground.classList.remove("hide");
}, 100);
var alertQueue = [];
var queuedPrompt = [];

function alertQueueShift(arg) {
	if(arg) {
		arg.event.preventDefault();
	}
	alertQueue.shift();
	if(alertQueue.length > 0) {
		if(meReal >= 0 && z.numPlayers > meReal && z.promptStyle[meReal] === 0) {
			alert(alertQueue[0]);
			alertQueueShift();
		} else {
			alertify.cancelBtn("CANCEL").okBtn("OK");
			alertify.alert(alertQueue[0]).then(alertQueueShift);
		}
	} else if(queuedPrompt.length > 0) {
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
	if(meReal >= 0 && z.numPlayers > meReal && z.promptStyle[meReal] !== 0) {
		let colorRE = new RegExp('\\[col' + 'or=([^\\]]+)\\]([^[]*)\\[/col' + 'or\\]', "g");
		let boldRE = new RegExp('\\[b' + '\\]([^[]*)\\[/' + 'b\\]', "g");
		let italicsRE = new RegExp('\\[i' + '\\]([^[]*)\\[/' + 'i\\]', "g");
		let strikethroughRE = new RegExp('\\[-' + '\\]([^[]*)\\[/' + '-\\]', "g");
		alertText = alertText.replace(colorRE, lb + 'span style="color:$1;">$2' + lb + '/span>');
		alertText = alertText.replace(boldRE, lb + 'b>$1' + lb + '/b>');
		alertText = alertText.replace(italicsRE, lb + 'i>$1' + lb + '/i>');
		alertText = alertText.replace(strikethroughRE, lb + 'strike>$1' + lb + '/strike>');
	}
	alertQueue.push(alertText);
	if(alertQueue.length === 1) {
		if(meReal >= 0 && z.numPlayers > meReal && z.promptStyle[meReal] === 0) {
			alert(alertText);
			alertQueueShift();
		} else {
			alertify.cancelBtn("CANCEL").okBtn("OK");
			alertify.alert(alertText).then(alertQueueShift);
		}
	}
}

function confirmify(confirmText, cancel, user, newOK, newCancel) {
	if(queuedPrompt.length > 0) {
		alert("Error! Cannot queue multiple prompts");
	} else if(alertQueue.length > 0) {
		queuedPrompt = ["confirm", confirmText, cancel, user, newOK, newCancel];
	} else if(meReal >= 0 && z.numPlayers > meReal && z.promptStyle[meReal] === 0) {
		let ok = confirm(confirmText);
		if(ok) {
			user();
		} else {
			cancel();
		}
	} else {
		let colorRE = new RegExp('\\[col' + 'or=([^\\]]+)\\]([^[]*)\\[/col' + 'or\\]', "g");
		let boldRE = new RegExp('\\[b' + '\\]([^[]*)\\[/' + 'b\\]', "g");
		let strikethroughRE = new RegExp('\\[-' + '\\]([^[]*)\\[/' + '-\\]', "g");
		confirmText = confirmText.replace(colorRE, lb + 'span style="color:$1;">$2' + lb + '/span>');
		confirmText = confirmText.replace(boldRE, lb + 'b>$1' + lb + '/b>');
		confirmText = confirmText.replace(strikethroughRE, lb + 'strike>$1' + lb + '/strike>');
		if(!newOK) {
			newOK = "OK";
		}
		if(!newCancel) {
			newCancel = "CANCEL";
		}
		alertify.okBtn(newOK).cancelBtn(newCancel).confirm(confirmText).then(function(arg) {
			arg.event.preventDefault();
			if(arg.buttonClicked == "cancel") {
				cancel();
			} else {
				user();
			}
		});
	}
}

function tooManyOptions(illegal) {
	let legalCount = 0;
	for(let j = 0; !(j > 20); j++) {
		if(!illegal(j)) {
			legalCount++;
		}
	}
	return legalCount > 13;
} /* TODO: var waiting, var quit */
function promptNum(promptText, illegal, cancel, user, newCancel) {
	if(queuedPrompt.length > 0) {
		alert("Error! Cannot queue multiple prompts");
	} else if(alertQueue.length > 0) {
		queuedPrompt = ["promptNum", promptText, illegal, cancel, user, newCancel];
	} else if(meReal >= 0 && z.numPlayers > meReal && z.promptStyle[meReal] === 0) {
		let prompted = prompt(promptText);
		if(prompted === null) {
			cancel();
		} else {
			let n = parseInt(prompted);
			if(isNaN(n) || illegal(n)) {
				promptNum(promptText, illegal, cancel, user);
			} else {
				user(n);
			}
		}
	} else {
		let colorRE = new RegExp('\\[col' + 'or=([^\\]]+)\\]([^[]*)\\[/col' + 'or\\]', "g");
		let boldRE = new RegExp('\\[b' + '\\]([^[]*)\\[/' + 'b\\]', "g");
		let strikethroughRE = new RegExp('\\[-' + '\\]([^[]*)\\[/' + '-\\]', "g");
		promptText = promptText.replace(colorRE, lb + 'span style="color:$1;">$2' + lb + '/span>');
		promptText = promptText.replace(boldRE, lb + 'b>$1' + lb + '/b>');
		promptText = promptText.replace(strikethroughRE, lb + 'strike>$1' + lb + '/strike>');
		if(!newCancel) {
			newCancel = "CANCEL";
		}
		alertify.cancelBtn(newCancel).okBtn("OK");
		if(0 > meReal || meReal >= z.numPlayers || (!mobile && z.promptStyle[meReal] === 1) || z.promptStyle[meReal] === 3 || tooManyOptions(illegal)) {
			alertify.prompt(promptText).then((arg) => {
				arg.event.preventDefault();
				let n = parseInt(arg.inputValue);
				if(arg.buttonClicked === "cancel" || arg.inputValue === null) {
					if(newCancel !== undefined && !isNaN(n) && !illegal(n)) {
						confirmify('Are you sure you want to quit?  Whatever option you had typed in the dialog box when you pressed "' + newCancel +
							'" will not be processed.', mainMenu, cancel, "Yes, Quit", "No, Go Back");
					} else {
						cancel();
					}
				} else {
					if(isNaN(n) || illegal(n)) {
						promptNum(promptText, illegal, cancel, user, newCancel);
					} else {
						user(n);
					}
				}
			});
		} else {
			alertify.promptButton(promptText, illegal).then((arg) => {
				arg.event.preventDefault();
				if(arg.buttonClicked === "cancel") {
					cancel();
				} else {
					user(parseInt(/^choice(\d+)$/.exec(arg.buttonClicked)[1]));
				}
			});
		}
	}
} /* empty strings now count as cancel */ /* TODO: make sure this works with defaultText */
function promptString(promptText, cancel, user, defaultText) {
	if(queuedPrompt.length > 0) {
		alert("Error! Cannot queue multiple prompts");
	} else if(alertQueue.length > 0) {
		queuedPrompt = ["promptString", promptText, cancel, user, defaultText];
	} else if(meReal >= 0 && z.numPlayers > meReal && z.promptStyle[meReal] === 0) {
		let prompted = prompt(promptText);
		if(prompted === null || prompted === "") {
			cancel();
		} else {
			user(prompted);
		}
	} else {
		let colorRE = new RegExp('\\[col' + 'or=([^\\]]+)\\]([^[]*)\\[/col' + 'or\\]', "g");
		let boldRE = new RegExp('\\[b' + '\\]([^[]*)\\[/' + 'b\\]', "g");
		let strikethroughRE = new RegExp('\\[-' + '\\]([^[]*)\\[/' + '-\\]', "g");
		promptText = promptText.replace(colorRE, lb + 'span style="color:$1;">$2' + lb + '/span>');
		promptText = promptText.replace(boldRE, lb + 'b>$1' + lb + '/b>');
		promptText = promptText.replace(strikethroughRE, lb + 'strike>$1' + lb + '/strike>');
		if(!defaultText) {
			defaultText = "";
		}
		alertify.cancelBtn("CANCEL").okBtn("OK");
		alertify.defaultValue(defaultText).prompt(promptText).then((arg) => {
			arg.event.preventDefault();
			if(arg.buttonClicked == "cancel" || arg.inputValue === null || arg.inputValue === "") {
				alertify.defaultValue("");
				cancel();
			} else {
				alertify.defaultValue("");
				user(arg.inputValue);
			}
		});
	}
}

function error(str) {
	alert(str);
} 
function shuffle(array) {
	for(let i = array.length; i > 0; i--) {
		let rando = Math.floor((z.seed * i) / mLCG);
		updateSeed();
		let removed = array.splice(rando, 1)[0];
		array.push(removed);
	}
	return array;
}

function colorText(color, text) {
	return "[col" + bl + "or=" + color + "]" + text + "[/col" + bl + "or]";
}

function size(text, pt) {
	return "[siz" + bl + "e=" + pt + "]" + text + "[/s" + bl + "ize]";
}

function bold(text) {
	return "[b" + bl + "]" + text + "[/" + bl + "b]";
}

function spoiler(text) {
	return "[o" + bl + "]" + text + "[/" + bl + "o]";
}

function invisible(str) {
	/* F4F4FF */
	return "[color=" + bl + "#FFFFFF]" + str + "[/" + bl + "color]";
}

function code(text) {
	return "[c"+bl+"]"+text+"[/"+bl+"c]";
}

function strikethrough(text) {
	return "[-" + bl + "]" + text + "[/" + bl + "-]";
}

function italics(text) {
	return "[i" + bl + "]" + text + "[/" + bl + "i]";
}

function floatleft(text) {
	return "[float" + bl + "left]" + text + "[/float" + bl + "left]";
}

function floatright(text) {
	return "[float" + bl + "right]" + text + "[/float" + bl + "right]";
}

function center(text) {
	return "[cent" + bl + "er]" + text + "[/cent" + bl + "er]";
}

function clear() {
	return "[cle" + bl + "ar]";
}

function plainAlert(text) {
	addAlert(text);
	t.value += text.replace(/Success(?![a-zA-Z'])/g, colorText("green", "Success")).replace(/Minor Failure/g, colorText("orange", "Minor Failure"))
		.replace(/Major Failure/g, colorText("red", "Major Failure")) + "\r\n";
}

function boldAlert(text) {
	addAlert(text);
	t.value += bold(text.replace(/Success(?![a-zA-Z'])/g, colorText("green", "Success")).replace(/Minor Failure/g, colorText("orange", "Minor Failure"))
		.replace(/Major Failure/g, colorText("red", "Major Failure"))) + "\r\n";
}

function clearSpoilers() {
	let ore = new RegExp('\\[o\\][\\s\\S]*\\[/o\\]', "g");
	t.value = t.value.replace(ore, "").replace(ore, ""); /* TODO: check this */
}

function clearQuotes() {
	let qre0 = new RegExp('\\[q="(?!LEN)((?!(\\[q=|\\[/q\\]))[\\s\\S])*\\[/q\\]', "g");
	let qre1 = new RegExp('\\[q="(?!LEN)(((?!(\\[q=|\\[/q\\]))[\\s\\S])*\\[q="((?!(\\[q=|\\[/q\\]))[\\s\\S])*\\[/q\\]((?!(\\[q=|\\[/q\\]))[\\s\\S])*)*\\[/q\\]',
		"g");
	t.value = t.value.replace(qre0, "").replace(qre1, "").replace(qre0, "").replace(qre1, "");
}

/* agencies:
USSR (Soviet): ОКБ-1 / OKB-1
USA (American): NASA
China (Chinese): SAC
France (French): CNES
Japan (Japanese): ISAS
*/

const SUCCESS = 0;
const MINOR_FAILURE = 1;
const MAJOR_FAILURE = 2;

function stationsTweaks(){
	/*TODO: Jähn*/
	astronautRoster["Dumitru Prunariu"] = "Mechanic";
	astronautRoster["Wubbo Ockels"] = "Mechanic";
	astronautRoster["Rodolfo Neri"] = "Mechanic";
	astronautRoster["Sigmund Jahn"] = "Pilot";
	astronautRoster["Patrick Baudry"] = "Pilot";
	astronautRoster["Vladimir Remek"] = "Doctor";
	astronautRoster["Rakesh Sharma"] = "Doctor";
	astronautRoster["Marc Garneau"] = "Doctor";
}

function FAMTweaks(){
	astronautRoster["Edward Baldwin"] = "Pilot";
	astronautRoster["Gordo Stevens"] = "Pilot";
	astronautRoster["Tracy Stevens"] = "Pilot";
	astronautRoster["Ellen Waverly"] = "Doctor";
	astronautRoster["Danielle Poole"] = "Mechanic";
	astronautRoster["Molly Cobb"] = "Pilot";
	astronautRoster["Deke Slayton"] = "Mechanic";
	astronautRoster["Alexei Leonov"] = "Pilot";
	astronautRoster["Mikhail Vasiliev"] = "Mechanic";
	astronautRoster["Anastasia Belikova"] = "Doctor";
	astronautRoster["Harry Liu"] = "Mechanic";
	if(z.outer || z.stations){
		astronautRoster["Wubbo Ockels"] = "Mechanic";
		astronautRoster["Nick Corrado"] = "Doctor";
	}
	if(!z.outer && z.stations){
		astronautRoster["Sally Ride"] = "Doctor";
	}
}

var astronautRoster = {
"Jim Lovell": 		"Mechanic",			
"Gus Grissom": 	"Mechanic",				
"Konstantin Feoktistov": 	"Mechanic",	
"Vladimir Komarov": "Mechanic",			
"Buzz Aldrin": 		"Mechanic",
"John Glenn": 			"Pilot",		
"Neil Armstrong": 		"Pilot",					
"Yuri Gagarin": 	"Pilot",			
"Joseph Walker": 	"Pilot",			
"Alan Shepard": 	"Pilot",		
"Valentina Tereshkova": 	"Doctor",	
"Mike Collins": 		"Doctor",		
"Boris Yegorov": 		"Doctor",		
"Gherman Titov": 		"Doctor",		
"Valery Bykovsky": 		"Doctor",	
"Jean-Loup Chretien": 		"Scientist",	
"Ulf Merbold": 		"Scientist",			
"Story Musgrave": 	"Scientist",			
"Sally Ride": 		"Scientist",			
"Jack Schmitt": 	"Scientist",			
};

var countryNames = {
	"ОКБ-1": "USSR",
	"NASA": "USA",
	"CNES": "France",
	"SAC": "China",
	"ISAS": "Japan",
};

var ventureNames = ["ESA","IRI","OLA","USC"];

var componentCosts = {
	"Juno": 1,
	"Atlas": 5,
	"Soyuz": 8,
	"Saturn": 15,
	"Ion Thruster": 10,
	"Probe": 2,
	"Eagle": 4,
	"Vostok": 2,
	"Apollo": 4,
	"Aldrin": 4,
	"Mechanic": 5,
	"Pilot": 5,
	"Doctor": 5,
	"Supplies": 1,
	"Scientist": 5,
	"Explorer": 3,
	"Galileo": 5,
	"Proton": 12,
	"Medical Module": 5,
	"Hydroponics Module": 10,
	"Science Module": 5,
	"Space Habitat": 20,
	"Ground Habitat (parts)": 15,
	"Fuel Generator": 8,
	"Shuttle": 10,
	"Daedalus": 10,
	"Large Fuel Tank": 6,
	"Small Fuel Tank": 3,
	"Rover": 4,
	"Food": 1,
	"Spare Parts": 1,
	"Medical Supplies": 1,
	"Experiment (ready)": 2,
};

var componentPrereqs = {
	"Juno": "Juno Rockets",
	"Atlas": "Atlas Rockets",
	"Soyuz": "Soyuz Rockets",
	"Saturn": "Saturn Rockets",
	"Ion Thruster": "Ion Thrusters",
	"Eagle": "Landing",
	"Vostok": "Re-entry",
	"Apollo": "Re-entry",
	"Aldrin": "Life Support",
	"Supplies": "Life Support",
	"Explorer": "Rendezvous",
	"Galileo": "Surveying",
	"Proton": "Proton Rockets",
	"Medical Module": "Life Support",
	"Hydroponics Module": "Synthesis",
	"Science Module": "Surveying",
	"Space Habitat": "Synthesis",
	"Ground Habitat (parts)": "Synthesis",
	"Fuel Generator": "Synthesis",
	"Shuttle": "Space Shuttle",
	"Daedalus": "Space Shuttle",
	"Large Fuel Tank": "Space Shuttle",
	"Small Fuel Tank": "Space Shuttle",
	"Rover": "Rover",
	"Food": "Life Support",
	"Medical Supplies": "Life Support",
	"Experiment (ready)": "Surveying"
};

var componentMasses = {
	"Juno": 1,
	"Atlas": 4,
	"Soyuz": 9,
	"Saturn": 20,
	"Ion Thruster": 1,
	"Probe": 1,
	"Eagle": 1,
	"Vostok": 2,
	"Apollo": 3,
	"Aldrin": 3,
	"Explorer": 1,
	"Galileo": 2,
	"Proton": 6,
	"Juno (damaged)": 1,
	"Atlas (damaged)": 4,
	"Soyuz (damaged)": 9,
	"Saturn (damaged)": 20,
	"Ion Thruster (damaged)": 1,
	"Ion Thruster (used)": 1,
	"Ion Thruster (used) (damaged)": 1,
	"Probe (damaged)": 1,
	"Probe (used)": 1,
	"Probe (used) (damaged)": 1,
	"Eagle (damaged)": 1,
	"Eagle (used)": 1,
	"Eagle (used) (damaged)": 1,
	"Vostok (damaged)": 2,
	"Vostok (used) (damaged)": 2,
	"Vostok (used)": 2,
	"Apollo (damaged)": 3,
	"Apollo (used)": 3,
	"Apollo (used) (damaged)": 3,
	"Aldrin (damaged)": 3,
	"Aldrin (used) (damaged)": 3,
	"Aldrin (used)": 3,
	"Explorer (damaged)": 1,
	"Galileo (damaged)": 2,
	"Galileo (used) (damaged)": 2,
	"Galileo (used)": 2,
	"Proton (damaged)": 6,
	"Moon Sample": 1,
	"Mercury Sample": 1,
	"Phobos Sample": 1,
	"Mars Sample": 1,
	"Venus Sample": 1,
	"Ceres Sample": 1,
	"Callisto Sample": 1,
	"Enceladus Sample": 1,
	"Europa Sample": 1,
	"Ganymede Sample": 1,
	"Io Sample": 1,
	"Saturn Sample": 1,
	"Titan Sample": 1,
	"Supplies": 1,
	"Medical Module": 3,
	"Medical Module (damaged)": 3,
	"Hydroponics Module": 4,
	"Hydroponics Module (used)": 4,
	"Hydroponics Module (damaged)": 4,
	"Science Module": 2,
	"Science Module (damaged)": 2,
	"Space Habitat": 9,
	"Space Habitat (damaged)": 9,
	"Space Habitat (used)": 9,
	"Space Habitat (used) (damaged)": 9,
	"Ground Habitat (parts)": 5,
	"Ground Habitat": 1000000,
	"Ground Habitat (used)": 1000000,
	"Fuel Generator": 1,
	"Fuel Generator (used)": 1,
	"Fuel Generator (damaged)": 1,
	"Shuttle": 4,
	"Shuttle (damaged)": 4,
	"Shuttle (used)": 4,		/* used for outer planets surveying */
	"Shuttle (used) (damaged)": 4,
	"Daedalus": 1,
	"Daedalus (damaged)": 1,
	"Small Fuel Tank": 2,
	"Large Fuel Tank": 6,
	"Rover": 1,
	"Rover (damaged)": 1,
	"Rover (explored)": 1,
	"Rover (explored) (damaged)": 1,
	"Rover (surveyed)": 1,
	"Rover (surveyed) (damaged)": 1,
	"Rover (surveyed) (explored)": 1,
	"Rover (surveyed) (explored) (damaged)": 1,
	"Food": 1,
	"Spare Parts": 1,
	"Medical Supplies": 1,
	"Experiment (ready)": 1,
	"Orbital Experiment": 1,
	"Lunar Experiment": 1,
	"Mars Experiment": 1,
	"Venus Experiment": 1,
	"Palladium": 1,
	"Fossil?": 1,
	"Platinum": 1,
	"Iridium": 1,
	"Wreckage": 1,
	"Alien Object": 2
};

var capsuleSeats = {
	"Eagle": 2,
	"Vostok": 1,
	"Apollo": 3,
	"Aldrin": 8,
	"Eagle (damaged)": 2,
	"Vostok (damaged)": 1,
	"Apollo (damaged)": 3,
	"Aldrin (damaged)": 8,
	"Eagle (used)": 2,
	"Vostok (used)": 1,
	"Apollo (used)": 3,
	"Aldrin (used)": 8,
	"Eagle (used) (damaged)": 2,
	"Vostok (used) (damaged)": 1,
	"Apollo (used) (damaged)": 3,
	"Aldrin (used) (damaged)": 8,
	"Shuttle": 6,
	"Shuttle (damaged)": 6,
	"Shuttle (used)": 6,
	"Shuttle (used) (damaged)": 6,
	"Space Habitat": 20,
	"Space Habitat (damaged)": 20,
	"Space Habitat (used)": 20,
	"Space Habitat (used) (damaged)": 20,
	"Ground Habitat": 20,
	"Ground Habitat (used)": 20,
};

	/* 
Juno 		Juno			$1		1		4 Thrust
Atlas 		Atlas			$5		4		27 Thrust
Soyuz	 	Soyuz 			$8		9		80 Thrust
Saturn		Saturn			$15		20		200 Thrust
Ion Thruster Ion Thrusters	$10		1		5 Thrust/Year
Proton		Proton			$12		6		70 Thrust

	*/
var rocketThrusts = {
	"Juno": 4,
	"Atlas": 27,
	"Soyuz": 80,
	"Saturn": 200,
	"Proton": 70,
	"Shuttle": 75,
	"Daedalus": 22
};

var advancementNames = ["Juno Rockets","Atlas Rockets","Soyuz Rockets","Saturn Rockets","Ion Thrusters","Rendezvous","Re-entry","Life Support","Landing","Surveying"];


function maxFeatures(loc){
	switch(loc){
		case "Mars":
			if(z.hazard[loc] === "3 Features" || z.hazard[loc] === "3 Features + CO2"){
				return 3;
			}
			return 2;
		case "Phobos":
		case "Ceres":
		case "Moon":
			if(z.hazard[loc] === "1 Feature"){
				return 1;
			}
			return 0;
		case "Venus":
			if(z.hazard[loc] === "3 Features + Life + CO2"){
				return 3;
			}
			return 0;
	}
	return 0;
}

function setupHazards(){
	z.hazard = {};
	if(!z.stations){
		z.hazard["Mars"] = shuffle(["Nothing",	"Minerals ($50)",	"Life + Supplies"])[0];
		z.hazard["Phobos"] = shuffle(["Nothing","Nothing","Alien Origin"])[0];
		z.hazard["Ceres"] = shuffle([
		"Nothing",
		"Supplies",
		"Minerals ($50)",
		])[0];
		z.hazard["Venus"] = shuffle([
		"Spacecraft Destroyed",
		"Spacecraft Destroyed",
		"Supplies",
		"Life + Supplies",
		])[0];
		z.hazard["Solar Radiation"] = shuffle([
		"Nothing",
		"Sickness (Time)",
		"Sickness (2 x Time)",
		])[0];
		if(z.mercury){
			z.hazard["Mercury"] = shuffle([
			"Nothing",
			"Minerals ($50)",
			])[0];
		}
		z.hazard["Moon"] = shuffle([
		"Nothing",
		"Spacecraft Destroyed",
		"Life",
		"Minerals ($25)",
		])[0];
		z.hazard["Suborbital Space"] = shuffle([
		"Nothing",
		"Nothing",
		"Sickness (1)",
		"Sickness (3)",
		])[0];
	} else {
		z.hazard["Mars"] = shuffle(["3 Features","3 Features + CO2","2 Features + CO2","2 Features + CO2 + Time: Sickness (2)","2 Features + CO2 + Time: Sickness (2)"])[0];
		z.hazard["Phobos"] = shuffle(["1 Feature","1 Feature","1 Feature","1 Feature","Nothing"])[0];
		z.hazard["Ceres"] = shuffle(["1 Feature","1 Feature","1 Feature","1 Feature","Nothing"])[0];
		z.hazard["Venus"] = shuffle(["Spacecraft Destroyed","Spacecraft Destroyed","Spacecraft Destroyed","Spacecraft Destroyed","3 Features + Life + CO2","Pressure (4) + Time: Spacecraft Destroyed"])[0];
		z.hazard["Solar Radiation"] = shuffle(["Nothing","Sickness (Time)","Sickness (2 x Time)","Sickness (2 x Time)","Sickness (3 x Time) + Radiation (Time)"])[0];
		if(z.mercury){
			z.hazard["Mercury"] = shuffle(["Minerals ($30)","Nothing","Time: Sickness (1)"])[0];
		}
		z.hazard["Moon"] = shuffle(["1 Feature","1 Feature","1 Feature","1 Feature","Spacecraft Destroyed"])[0];
		z.hazard["Suborbital Space"] = shuffle([
		"Nothing",
		"Nothing",
		"Sickness (1)",
		"Sickness (3)",
		])[0];
	}
	if(z.outer){
		z.hazard["Callisto"] = shuffle([
		"Nothing",
		"Nothing",
		"Minerals ($25) + Alpha",
		])[0];
		z.hazard["Enceladus"] = shuffle([
		"Life + Beta",
		"Alpha + Beta",
		"Geysers + Alpha",
		])[0];
		z.hazard["Europa"] = shuffle([
		"Spacecraft Destroyed + Gamma",
		"Life + Beta",
		"Alpha",
		"Beta",
		])[0];
		z.hazard["Ganymede"] = shuffle([
		"Nothing",
		"Minerals ($50) + Alpha",
		"Alpha",
		])[0];
		z.hazard["Io"] = shuffle([
		"Nothing",
		"Minerals ($75) + Alpha",
		"Alpha",
		])[0];
		z.hazard["Jupiter"] = shuffle([
		"Sickness (6) + Radiation (4) + Alpha",
		"Sickness (3) + Radiation (1) + Beta",
		"Sickness (1) + Beta",
		])[0];
		z.hazard["Neptune"] = shuffle([
		"Nothing",
		])[0];
		z.hazard["Saturn"] = shuffle([
		"Debris (2) + Alpha",
		"Beta",
		"Sickness (2) + Beta",
		])[0];
		z.hazard["Titan"] = shuffle([
		"Life + Beta",
		"Supplies + Alpha",
		"Alpha",
		])[0];
		z.hazard["Uranus"] = "Nothing";
	}
}


function getDieRoll(){
	let roll = z.dieRolls.pop();
	z.dieRolls.unshift(Math.floor((z.seed * 10)/mLCG) + 1);
	updateSeed();
	return roll;
}

const aLCG = 1664525;
const cLCG = 1013904223;
const mLCG = 0x100000000;

function updateSeed(){
	z.seed = (aLCG * z.seed + cLCG) % mLCG;
}

class Advancement {
	constructor(numCards,rover){
		if(numCards === undefined){
			numCards = 3;
		}
		this.outcomes = [];
		this.backup = false;
		if(z.stations){
			if(numCards > z.outcomeDeck.length){
				this.backup = true;
				if(numCards > z.outcomeDeckBackup.length){
					this.backup = false;
					if(numCards > z.outcomeDeck.length + z.outcomeDiscards.length){
						this.backup = true;
					}
				}
			}
		}
		if(!this.backup){
			for(let j = numCards; j>0; j--){
				if(z.outcomeDeck.length === 0){
					z.outcomeDeck = z.outcomeDiscards;
					z.outcomeDiscards = [];
					shuffle(z.outcomeDeck);
					plainAlert("Outcome deck reshuffles");
				}
				this.outcomes.push(z.outcomeDeck.pop());
			}
		} else {
			plainAlert("Using the backup outcome deck.");
			for(let j = numCards; j>0; j--){
				if(z.outcomeDeckBackup.length === 0){
					z.outcomeDeckBackup = z.outcomeDiscardsBackup;
					z.outcomeDiscardsBackup = [];
					shuffle(z.outcomeDeckBackup);
					plainAlert("Backup Outcome deck reshuffles");
				}
				this.outcomes.push(z.outcomeDeckBackup.pop());
			}
		}
		this.lastOutcome = null;
		this.successExists = false;
		this.seed = Math.floor(Math.random() * mLCG);
		if(rover){
			this.rover = true;
		}
	}
	
	drawOutcome(){
		if(this.outcomes.length === 0){
			if(this.rover){
				return [SUCCESS,SUCCESS];
			}
			return SUCCESS;
		}
		if(this.rover){
			if(this.outcomes.length === 1){
				this.lastOutcome = this.outcomes[0];
				if(this.outcomes[0] === SUCCESS){
					this.successExists = true;
				}
				return [this.outcomes[0],SUCCESS];
			}
			for(let i = this.outcomes.length; i>0; i--){
				let rando = Math.floor((this.seed * i)/mLCG);
				this.seed = (aLCG * this.seed + cLCG) % mLCG;
				let removed = this.outcomes.splice(rando,1)[0];
				this.outcomes.push(removed);
			}
			this.lastOutcome = [this.outcomes[0],this.outcomes[1]];
			if(this.outcomes[0] === SUCCESS || this.outcomes[1] === SUCCESS){
				this.successExists = true;
			}
			if(this.outcomes[0] === SUCCESS && this.outcomes[1] === SUCCESS){
				this.doubleSuccessExists = true;
			}
			return [this.outcomes[0],this.outcomes[1]];
		} else {
			for(let i = this.outcomes.length; i>0; i--){
				let rando = Math.floor((this.seed * i)/mLCG);
				this.seed = (aLCG * this.seed + cLCG) % mLCG;
				let removed = this.outcomes.splice(rando,1)[0];
				this.outcomes.push(removed);
			}
			this.lastOutcome = this.outcomes[0];
			if(this.lastOutcome === SUCCESS){
				this.successExists = true;
			}
			return this.outcomes[0];
		}
	}
	
	fullTest(){
		if("rendezvousReserve" in this){
			this.rendezvousReserve.push(this.outcomes.shift());
		} else {
			this.rendezvousReserve = [this.outcomes.shift()];
		}
	}
	
	endFullTest(success){
		if("rendezvousReserve" in this){
			while(this.rendezvousReserve.length > 0){
				this.outcomes.push(this.rendezvousReserve.pop());
			}
			delete this.rendezvousReserve;
		}
		if(success){
			this.autoRendezvous = true;
		}
	}
	
	autoSuccess(){
		return this.outcomes.length === 0 || (this.outcomes.length === 1 && this.successExists) || this.autoRendezvous || (this.rover && 2 === this.outcomes.length && this.doubleSuccessExists);
	}
	
	removeLastOutcome(whichRover){
		if(this.lastOutcome === null){
			return;
		}
		if(Array.isArray(this.lastOutcome)){
			if(this.lastOutcome[whichRover] === SUCCESS){
				if(this.doubleSuccessExists){
					delete this.doubleSuccessExists;
				} else {
					this.successExists = false;
				}
			}
			if(this.backup){
				z.outcomeDiscardsBackup.push(this.outcomes.splice(whichRover,1)[0]);
			} else {
				z.outcomeDiscards.push(this.outcomes.splice(whichRover,1)[0]);
			}
			this.lastOutcome.splice(whichRover,1);
			if(this.lastOutcome.length === 0){
				this.lastOutcome = null;
			} else {
				this.lastOutcome = this.lastOutcome[0];
			}
		} else {
			if("rendezvousReserve" in this && z.rendezvousReserve.length > 0){
				if(this.backup){
					z.outcomeDiscardsBackup.push(z.rendezvousReserve.pop());
				} else {
					z.outcomeDiscards.push(z.rendezvousReserve.pop());
				}
				this.successExists = false;
				this.lastOutcome = null;
				return;
			}
			if(this.backup){
				z.outcomeDiscardsBackup.push(this.outcomes.shift());
			} else {
				z.outcomeDiscards.push(this.outcomes.shift());
			}
			if(this.lastOutcome === SUCCESS){
				if(this.doubleSuccessExists){
					delete this.doubleSuccessExists;
				} else {
					this.successExists = false;
				}
			}
			this.lastOutcome = null;
		}
	}
	
	discardAll(){
		/* RULES: are these public? */
		this.lastOutcome = null;
		shuffle(this.outcomes);
		let counts = {};
		while(this.outcomes.length > 0){
			let discard = this.outcomes.pop();
			if(discard in counts){
				counts[discard]++;
			} else {
				counts[discard] = 1;
			}
			if(this.backup){
				z.outcomeDiscardsBackup.push(discard);
			} else {
				z.outcomeDiscards.push(discard);
			}
		}
		for(let outcome in counts){
			if(counts[outcome] === 0){
				continue;
			}
			let s = "";
			if(counts[outcome] > 1){
				s = "s";
				if(outcome === SUCCESS.toString()){
					s = "es";
				}
			}
			switch(outcome){
				case SUCCESS.toString():
					t.value += "Discarded "+counts[outcome]+" Success"+s+"\r\n";
					break;
				case MINOR_FAILURE.toString():
					t.value += "Discarded "+counts[outcome]+" Minor Failure"+s+"\r\n";
					break;
				case MAJOR_FAILURE.toString():
					t.value += "Discarded "+counts[outcome]+" Major Failure"+s+"\r\n";
					break;
			}
		}
	}
	
}

class Mission {
	constructor(difficulty,points,greek1,greek2,bonus){
		this.claimed = -1;
		this.difficulty = difficulty;
		this.points = points;
		if(greek1 === "Alpha" || greek2 === "Alpha"){
			this.Alpha = true;
		}
		if(greek1 === "Beta" || greek2 === "Beta"){
			this.Beta = true;
		}
		if(greek1 === "Gamma" || greek2 === "Gamma"){
			this.Gamma = true;
		}
		if(bonus === undefined){
			this.bonus = 0;
		} else {
			this.bonus = bonus;
		}
	}
}

function endGameCheck(){
	
	if(z.gameOver){
		return true;
	}
	if(z.numPlayers === 1){
		for(let mission in z.missions){
			if(z.missions[mission].claimed === -1){
				return false;
			}
		}
		boldAlert("All Missions have been completed.");
		if(z.points[0] > 0){
			boldAlert("You win!");
		} else {
			plainAlert("...you monster.");
		}
		return true;
	}
	let remainingPoints = 0;
	for(let mission in z.missions){
		if(z.missions[mission].claimed === -1){
			remainingPoints += z.missions[mission].points;
		}
	}
	if(remainingPoints === 0){
		boldAlert("All missions have been completed.  The space race is over.");
		let mostPoints = -1;
		let winners = [];
		for(let j = 0; !(j>=z.numPlayers); j++){
			let points = z.points[j];
			if(z.stations){
				points += z.pointTokens[j];
				for(let k = z.numPlayers; !(k>=z.shares.length); k++){
					points += z.shares[k][j] * sharePoints(k);
				}
			}
			if(points > mostPoints){
				mostPoints = points;
				winners = [j];
			} else if(points === mostPoints){
				winners.push(j);
			}
		}
		if(winners.length > 1){
			let alertText = "The game ends in a tie.  The joint winners are: ";
			winners.forEach((country,j)=>{
				if(j!==0){
					alertText += ", ";
				}
				alertText += z.countries[country];
			});
			boldAlert(alertText+".");
		} else if(winners.length === 1){
			boldAlert(z.countries[winners[0]]+" wins!");
		} else {
			plainAlert("You are all monsters.");
		}
		return true;
	} 
	
	let first = -1;
	let second = -1;
	let firstPoints = -1000000;
	let secondPoints = -1000000;
	for(let j = 0; !(j>=z.numPlayers); j++){
		let points = z.points[j];
		if(z.stations){
			points += z.pointTokens[j];
			for(let k = z.numPlayers; !(k>=z.shares.length); k++){
				points += z.shares[k][j] * sharePoints(k);
			}
		}
		if(points >= firstPoints){
			second = first;
			secondPoints = firstPoints;
			first = j;
			firstPoints = points;
		} else if (points >= secondPoints){
			second = j;
			secondPoints = points;
		}
	}
	if(firstPoints - secondPoints > remainingPoints){
		/* RULES: is this triggered immediately immediately? */
		boldAlert(z.countries[first]+ " has a lead that cannot be eliminated with the remaining missions.");
		if(firstPoints > 0){
			boldAlert(z.countries[first]+" wins!");
		} else {
			plainAlert("...you monsters.");
		}
		return true;
	}
	return false;
}


function completeMission(mission,countryName){
	let country = -1;
	if(countryName === undefined){
		countryName = z.countries[z.turn];
		country = z.turn;
	} else {
		for(let j = 0; !(j>=z.countries.length); j++){
			if(z.countries[j] === countryName){
				country = j;
				break;
			}
		}
		if(country === -1){
			addAlert("Error: agency not found");
			return;
		}
	}
	boldAlert(z.countries[country] + " completes " + mission +"!");
	z.missions[mission].claimed = country;
	let points = z.missions[mission].points;
	z.points[country] += points;
	if(z.missions[mission].bonus){
		z.pointTokens[country] += z.missions[mission].bonus;
		points += z.missions[mission].bonus;
	}
	let s = "s";
	if(points === 1){
		s = "";
	}
	plainAlert(z.countries[country] + " gains " + points + " point"+s+".");
	if(z.numPlayers > 1 && z.numPlayers > country){
		plainAlert("All other countries gain $10 million.");
	}
	if(z.numPlayers > country){
		for(let j = 0; !(j>=z.numPlayers); j++){
			if(j !== country){
				z.money[j] += 10;
				z.endedYear[j] = false;
			}
		}
	}
	if(mission === "Extraterrestrial Life Survey"){
		plainAlert(colorText("DarkGreen","Extraterrestrial Life Sample")+" mission now available.");
		z.missions["Extraterrestrial Life Sample"] = new Mission("Life",40);
	}
	z.gameOver = endGameCheck();
}

var easyMissions = ["Sounding Rocket","Artificial Satellite","Man in Space","Lunar Survey","Man in Orbit","Mars Survey"];
var easyMissionsFAM = ["Sounding Rocket","Artificial Satellite","Human in Space","Lunar Survey","Human in Orbit","Mars Survey"];
var mediumMissions = ["Lunar Lander","Space Station","Venus Survey","Mars Lander","Ceres Lander","Lunar Sample Return","Venus Lander","Man on the Moon","Phobos Sample Return","Mercury Survey","Mercury Lander"];
var mediumMissionsFAM = ["Lunar Lander","Space Station","Venus Survey","Mars Lander","Ceres Lander","Lunar Sample Return","Venus Lander","Human on the Moon","Phobos Sample Return","Mercury Survey","Mercury Lander"];
var hardMissions = ["Ceres Sample Return","Lunar Station","Mars Sample Return","Mars Station","Man on Mars","Venus Sample Return","Venus Station",
				    "Man on Venus","Extraterrestrial Life","Mercury Sample Return"];
var hardMissionsFAM = ["Ceres Sample Return","Lunar Station","Mars Sample Return","Mars Station","Human on Mars","Venus Sample Return","Venus Station",
				    "Human on Venus","Extraterrestrial Life","Mercury Sample Return"];
var outerMissions = ["Callisto Survey","Enceladus Survey","Ganymede Survey","Europa Survey","Io Survey","Jupiter Survey","Jupiter System Survey","Saturn Survey","Titan Survey",
					 "Uranus Survey","Grand Tour","Neptune Survey"];
var explorableMissions = ["Advanced Io Survey","Advanced Enceladus Survey","Advanced Europa Survey","Jupiter Orbiter","Advanced Titan Survey","Enceladus Lander","Io Lander","Saturn Orbiter","Europa Lander","Callisto Lander",
						  "Enceladus Ice Explorer","Europa Ice Explorer","Ganymede Lander","Titan Lander","Enceladus Sample Return","Io Sample Return","Europa Sample Return","Titan Cloud Explorer","Ganymede Sample Return",
						  "Jupiter Station","Manned Jupiter Fly-By","Saturn Ring Sample Return","Titan Sample Return","Saturn Station","Manned Saturn Fly-By","Man on Titan"];
var explorableMissionsFAM = ["Advanced Io Survey","Advanced Enceladus Survey","Advanced Europa Survey","Jupiter Orbiter","Advanced Titan Survey","Enceladus Lander","Io Lander","Saturn Orbiter","Europa Lander","Callisto Lander",
						  "Enceladus Ice Explorer","Europa Ice Explorer","Ganymede Lander","Titan Lander","Enceladus Sample Return","Io Sample Return","Europa Sample Return","Titan Cloud Explorer","Ganymede Sample Return",
						  "Jupiter Station","Crewed Jupiter Fly-By","Saturn Ring Sample Return","Titan Sample Return","Saturn Station","Crewed Saturn Fly-By","Human on Titan"];
						  
var easyMissionsStations = ["Phobos Survey","Artificial Satellite","Man in Space","Lunar Fly-By","Venus Fly-By","Mars Fly-By","Ceres Survey","Lunar Survey","Orbital Experiment","Orbital Experiment",
                            "Orbital Habitat","Mars Survey","Manned Lunar Fly-By"];
var easyMissionsStationsFAM = ["Phobos Survey","Artificial Satellite","Human in Space","Lunar Fly-By","Venus Fly-By","Mars Fly-By","Ceres Survey","Lunar Survey","Orbital Experiment","Orbital Experiment",
                            "Orbital Habitat","Mars Survey","Manned Lunar Fly-By"];
var mediumMissionsStations = ["Phobos Lander","Venus Survey","Lunar Lander","Space Station","Mars Lander","Ceres Lander","Lunar Habitat","Lunar Experiment","Lunar Experiment",
							  "Lunar Sample Return","Venus Lander","Manned Mars Fly-By","Man on the Moon","Man on the Moon","Phobos Sample Return",
							  "Mercury Survey","Mercury Lander"];
var mediumMissionsStationsFAM = ["Phobos Lander","Venus Survey","Lunar Lander","Space Station","Mars Lander","Ceres Lander","Lunar Habitat","Lunar Experiment","Lunar Experiment",
							  "Lunar Sample Return","Venus Lander","Crewed Mars Fly-By","Human on the Moon","Human on the Moon","Phobos Sample Return",
							  "Mercury Survey","Mercury Lander"];
var hardMissionsStations = ["Mars Orbit Habitat","Mars Habitat","Mars Experiment","Mars Experiment","Manned Venus Fly-By","Lunar Station","Lunar Station","Mars Sample Return","Venus Habitat",
							"Man on Phobos","Mars Station","Mars Station","Venus Experiment","Man on Ceres","Man on Mars","Man on Mars","Venus Sample Return","Venus Station",
							"Man on Venus","Man on Mercury"];
var hardMissionsStationsFAM = ["Mars Orbit Habitat","Mars Habitat","Mars Experiment","Mars Experiment","Crewed Venus Fly-By","Lunar Station","Lunar Station","Mars Sample Return","Venus Habitat",
							"Human on Phobos","Mars Station","Mars Station","Venus Experiment","Human on Ceres","Human on Mars","Human on Mars","Venus Sample Return","Venus Station",
							"Human on Venus","Human on Mercury"];

/* duplicate missions:
Orbital Experiment (4) +0.5
Lunar Experiment (9) +1
Man on the Moon (12) +1.5
Mars Experiment (14) +1.5
Lunar Station (15) +1.5
Mars Station (20) +2
Man on Mars (24) +2.5
*/

function setupMissions() {
	z.missions = {};
	if(z.stations){
		let occupationMissions = ["Orbital Occupation","Lunar Occupation","Mars Occupation","Venus Occupation"];
		shuffle(occupationMissions);
		z.occupationMission = occupationMissions.pop();
	}
	let diff = "Easy";
	let missions = easyMissions.slice();
	if(z.FAM){
		if(z.stations){
			missions = easyMissionsStationsFAM.slice();
		} else {
			missions = easyMissionsFAM.slice();
		}
	} else if(z.stations){
		missions = easyMissionsStations.slice();
	}
	let num = 0;
	switch(z.difficulty){
		case "Easy":
			num = 5;
			if(z.stations){
				num = 6;
			}
			break;
		case "Medium":
			if(z.stations){
				num = 6;
			} else if(z.outer){
				num = 3;
			} else {
				num = 4;
			}
			break;
		case "Hard":
			if(z.stations){
				num = 4;
			} else {
				num = 3;
			}
			break;
		case "Very Hard":
			num = 1;
			break;
	}
	shuffle(missions);
	for(let j = num; j>0; j--){
		let missionName = missions.pop();
		let mission = undefined;
		let nope = false;
		switch(missionName){
			case "Sounding Rocket":
				/* Working Probe/Capsule in Space */
				mission = new Mission(diff,1);
				break;
			case "Phobos Survey":
				/* Reveal Phobos location */
				mission = new Mission(diff,2);
				break;
			case "Artificial Satellite":
				/* Working Probe/Capsule in Earth Orbit */
				mission = new Mission(diff,2);
				break;
			case "Man in Space":
			case "Human in Space":
				/* Man to Space and Back */
				mission = new Mission(diff,2);
				break;
			case "Lunar Fly-By":
				/* Working Probe/Capsule in Lunar Fly-By/Orbit */
				mission = new Mission(diff,3);
				break;
			case "Venus Fly-By":
				/* Working Probe/Capsule in Venus Fly-By/Orbit */
				mission = new Mission(diff,4);
				break;
			case "Mars Fly-By":
				/* Working Probe/Capsule in Mars Fly-By/Orbit/Cycler */
				mission = new Mission(diff,4);
				break;
			case "Ceres Survey":
				/* Reveal Ceres Location */
				mission = new Mission(diff,4);
				break;
			case "Lunar Survey":
				/* Reveal Moon Location */
				mission = new Mission(diff,4);
				break;
			case "Man in Orbit":
			case "Human in Orbit":
				/* Man to Earth Orbit and Back */
				mission = new Mission(diff,4);
				break;
			case "Mars Survey":
				/* Reveal Mars Location */
				mission = new Mission(diff,5);
				break;
			case "Orbital Habitat":
				/* Working Habitat in Earth Orbit */
				mission = new Mission(diff,5);
				break;
			case "Manned Lunar Fly-By":
			case "Crewed Lunar Fly-By":
				/* Man to Lunar Fly-By/Orbit and Back */
				mission = new Mission(diff,5);
				break;
			case "Orbital Experiment":
				/* Complete Experiment in Earth Orbit and return it to Earth */
				if(missionName in z.missions){
					if(z.numPlayers === 1){
						nope = true;
					} else {
						missionName += " +0.5";
						mission = new Mission(diff,4,undefined,undefined,0.5);
					}
				} else {
					mission = new Mission(diff,4);
				}
				break;
		}
		if(nope){
			j++;
			continue;
		}
		z.missions[missionName] = mission;
	}
	diff = "Medium";
	if(z.FAM){
		if(z.stations){
			missions = mediumMissionsStationsFAM.slice();
		} else {
			missions = mediumMissionsFAM.slice();
		}
	} else if(z.stations){
		missions = mediumMissionsStations.slice();
	} else {
		missions = mediumMissions.slice();
	}
	if(!z.mercury){
		missions.pop();
		missions.pop();
	}
	num = 0;
	switch(z.difficulty){
		case "Easy":
			num = 0;
			break;
		case "Medium":
			if(z.stations){
				num = 3;
			} else if(z.outer){
				num = 1;
			} else {
				num = 2;
			}
			break;
		case "Hard":
			if(z.stations){
				num = 5;
			} else if(z.outer){
				num = 2;
			} else {
				num = 3;
			}
			break;
		case "Very Hard":
			if(z.stations){
				num = 6;
			} else if(z.outer){
				num = 2;
			} else {
				num = 4;
			}
			break;
	}			
	shuffle(missions);
	for(let j = num; j>0; j--){
		let missionName = missions.pop();
		let mission = undefined;
		let nope = false;
		switch(missionName){
			case "Phobos Lander":
				/* Working Probe/Capsule on Phobos */
				mission = new Mission(diff,6);
				break;
			case "Lunar Lander":
				/* Working Probe/Capsule on the Moon */
				mission = new Mission(diff,6);
				break;
			case "Space Station":
				/* X Man in Space at Start of Year */
				mission = new Mission(diff,6);
				break;
			case "Venus Survey":
				/* X Reveal Venus Location */
				mission = new Mission(diff,6);
				break;
			case "Mars Lander":
				/* Working Probe/Capsule on Mars */
				mission = new Mission(diff,7);
				break;
			case "Mercury Survey":
				/* X Reveal Mercury Location [req. Mercury] */
				mission = new Mission(diff,7);
				break;
			case "Ceres Lander":
				/* X Working Probe/Capsule on Ceres */
				mission = new Mission(diff,8);
				break;
			case "Lunar Habitat":
				/* Working Habitat on the Moon */
				mission = new Mission(diff,9);
				break;
			case "Lunar Experiment":
				/* Complete Experiment on Moon and return to Earth */
				if(missionName in z.missions){
					if(z.numPlayers === 1){
						nope = true;
					} else {
						missionName += " +1";
						mission = new Mission(diff,9,undefined,undefined,1);
					}
				} else {
					mission = new Mission(diff,9);
				}
				break;
			case "Lunar Sample Return":
				/* Moon Sample on Earth */
				mission = new Mission(diff,10);
				break;
			case "Venus Lander":
				/* Working Probe/Capsule on Venus */
				mission = new Mission(diff,11);
				break;
			case "Manned Mars Fly-By":
			case "Crewed Mars Fly-By":
				mission = new Mission(diff,12);
				break;
			case "Man on the Moon":
			case "Human on the Moon":
				/* Man on the Moon and Back */
				if(missionName in z.missions){
					if(z.numPlayers === 1){
						nope = true;
					} else {
						missionName += " +1.5";
						mission = new Mission(diff,12,undefined,undefined,1.5);
					}
				} else {
					mission = new Mission(diff,12);
				}
				break;
			case "Phobos Sample Return":
				/* Phobos Sample on Earth */
				mission = new Mission(diff,12);
				break;
			case "Mercury Lander":
				/* Working Probe/Capsule on Mercury [req. Mercury] */
				mission = new Mission(diff,13);
				break;
		}
		if(nope){
			j++;
		} else {
			z.missions[missionName] = mission;
		}
	}
	diff = "Hard";
	
	if(z.FAM){
		if(z.stations){
			missions = hardMissionsStationsFAM.slice();
		} else {
			missions = hardMissionsFAM.slice();
		}
	} else if(z.stations){
		missions = hardMissionsStations.slice();
	} else {
		missions = hardMissions.slice();
	}
	if(!z.mercury){
		missions.pop();
	}
	num = 0;
	switch(z.difficulty){
		case "Easy":
		case "Medium":
			num = 0;
			break;
		case "Hard":
			if(z.stations){
				num = 3;
			} else if(z.outer){
				num = 1;
			} else {
				num = 2;
			}
			break;
		case "Very Hard":
			if(z.stations){
				num = 6;
			} else if(z.outer){
				num = 1;
			} else {
				num = 4;
			}
			break;
	}			
	shuffle(missions);
	for(let j = num; j>0; j--){
		let missionName = missions.pop();
		let mission = undefined;
		let nope = false;
		switch(missionName){
			case "Mars Orbit Habitat":
				/* Working Habitat in Mars Orbit */
				mission = new Mission(diff,14);
				break;
			case "Mars Habitat":
				/* Working Habitat on Mars */
				mission = new Mission(diff,14);
				break;
			case "Ceres Sample Return":
				/* Ceres Sample on Earth */
				mission = new Mission(diff,14);
				break;
			case "Mars Experiment":
				/* complete experiment on Mars and return it to Earth */
				if(missionName in z.missions){
					if(z.numPlayers === 1){
						nope = true;
					} else {
						missionName += " +1.5";
						mission = new Mission(diff,14,undefined,undefined,1.5);
					}
				} else {
					mission = new Mission(diff,14);
				}
				break;
			case "Manned Venus Fly-By":
			case "Crewed Venus Fly-By":
				/* Man to Venus Fly-By/Orbit and Back */
				mission = new Mission(diff,14);
				break;
			case "Lunar Station":
				/* X Man on Moon at Start of Year */
				if(missionName in z.missions){
					if(z.numPlayers === 1){
						nope = true;
					} else {
						missionName += " +1.5";
						mission = new Mission(diff,15,undefined,undefined,1.5);
					}
				} else {
					mission = new Mission(diff,15);
				}
				break;
			case "Mars Sample Return":
				/* Mars Sample on Earth */
				mission = new Mission(diff,16);
				break;
			case "Venus Habitat":
				/* Working Habitat on Venus */
				mission = new Mission(diff,17);
				break;
			case "Man on Phobos":
			case "Human on Phobos":
				/* Man to Phobos and back */
				mission = new Mission(diff,17);
				break;
			case "Mercury Sample Return":
				/* Mercury Sample Return [req. Mercury] */
				mission = new Mission(diff,19);
				break;
			case "Mars Station":
				/* X Man on Mars at Start of Year */
				if(missionName in z.missions){
					if(z.numPlayers === 1){
						nope = true;
					} else {
						missionName += " +2";
						mission = new Mission(diff,20,undefined,undefined,2);
					}
				} else {
					mission = new Mission(diff,20);
				}
				break;
			case "Venus Experiment":
				/* Experiment completed on venus and returned to Earth */
				mission = new Mission(diff,20);
				break;
			case "Man on Ceres":
			case "Human on Ceres":
				/* Man on Ceres and Back */
				mission = new Mission(diff,21);
				break;
			case "Man on Mars":
			case "Human on Mars":
				/* Man on Mars and Back */
				if(missionName in z.missions){
					if(z.numPlayers === 1){
						nope = true;
					} else {
						missionName += " +2.5";
						mission = new Mission(diff,24,undefined,undefined,2.5);
					}
				} else {
					mission = new Mission(diff,24);
				}
				break;
			case "Venus Sample Return":
				/* Man on Venus and Back */
				mission = new Mission(diff,24);
				break;
			case "Venus Station":
				/* X Man on Venus at Start of Year */
				mission = new Mission(diff,27);
				break;
			case "Man on Mercury":
			case "Human on Mercury":
				/* Man on Mercury and Back */
				mission = new Mission(diff,30);
				break;
			case "Man on Venus":
			case "Human on Venus":
				/* Man on Venus and Back */
				mission = new Mission(diff,32);
				break;
			case "Extraterrestrial Life":
				/* Sample of Extraterrestrial Life Brought to Earth */
				mission = new Mission(diff,40);
				break;
		}
		if(nope){
			j++;
		} else {
			z.missions[missionName] = mission;
		}
	}
	if(z.stations){
		z.missions["Extraterrestrial Life Survey"] = new Mission("Life",10);
	}
	if(!z.outer){
		return;
	}
	diff = "Outer";
	missions = outerMissions.slice();
	num = 0;
	switch(z.difficulty){
		case "Easy":
			num = 3;
			break;
		case "Medium":
			num = 4;
			break;
		case "Hard":
			num = 5;
			break;
		case "Very Hard":
			num = 6;
			break;
	}			
	shuffle(missions);
	for(let j = num; j>0; j--){
		let missionName = missions.pop();
		let mission = undefined;
		switch(missionName){
			case "Callisto Survey":
				/* X Reveal Callisto Location */
				mission = new Mission(diff,3);
				break;
			case "Enceladus Survey":
				/* X Reveal Enceladus Location */
				mission = new Mission(diff,3);
				break;
			case "Ganymede Survey":
				/* X Reveal Ganymede Location */
				mission = new Mission(diff,3);
				break;
			case "Europa Survey":
				/* X Reveal Europa Location */
				mission = new Mission(diff,4);
				break;
			case "Io Survey":
				/* X Reveal Io Location */
				mission = new Mission(diff,4);
				break;
			case "Jupiter Survey":
				/* X Reveal Jupiter Location */
				mission = new Mission(diff,5);
				break;
			case "Jupiter System Survey":
				/* X Reveal Jupiter and All its Moons */
				mission = new Mission(diff,5);
				break;
			case "Saturn Survey":
				/* X Reveal Saturn Location */
				mission = new Mission(diff,6);
				break;
			case "Titan Survey":
				/* X Reveal Titan Location */
				mission = new Mission(diff,6);
				break;
			case "Uranus Survey":
				/* X Reveal Uranus Location */
				mission = new Mission(diff,9);
				break;
			case "Grand Tour":
				/* X Reveal Jupiter, Saturn, Uranus, and Neptune */
				mission = new Mission(diff,10);
				break;
			case "Neptune Survey":
				/* X Reveal Neptune Location */
				mission = new Mission(diff,10);
				break;
		}
		z.missions[missionName] = mission;
	}
	z.explorableMissions = {};
	let explorableLocations = ["Callisto","Ganymede","Io","Enceladus","Europa","Jupiter","Titan","Saturn"];
	let threshold = 0;
	switch(z.difficulty){
		case "Easy":
			threshold = 6;
			break;
		case "Medium":
			threshold = 13;
			break;
		case "Hard":
			threshold = 24;
			break;
		case "Very Hard":
			threshold = 1000;
			break;
	}
	explorableLocations.forEach((loc)=>{
		let missions = {};
		switch(loc){
			case "Callisto":
				/* Working Probe/Capsule on Callisto */
				missions["Callisto Lander"] = new Mission(loc,15,"Alpha");
				break;
			case "Ganymede":
				/* Working Probe/Capsule on Ganymede */
				missions["Ganymede Lander"] = new Mission(loc,16,"Alpha");
				/* Ganymede Sample on Earth */
				missions["Ganymede Sample Return"] = new Mission(loc,24,"Alpha");
				break;
			case "Io":
				/* X Survey Io with Galileo Probe */
				missions["Advanced Io Survey"] = new Mission(loc,7,"Alpha");
				/* Working Probe/Capsule on Io */
				missions["Io Lander"] = new Mission(loc,12,"Alpha");
				/* Io Sample on Earth */
				missions["Io Sample Return"] = new Mission(loc,20,"Alpha");
				break;
			case "Enceladus":
				/* X Survey Enceladus with Galileo Probe */
				missions["Advanced Enceladus Survey"] = new Mission(loc,8,"Alpha","Beta");
				/* Working Probe/Capsule on Enceladus */
				missions["Enceladus Lander"] = new Mission(loc,12,"Beta");
				/* X Separate and Discard Explorer on Enceladus */
				missions["Enceladus Ice Explorer"] = new Mission(loc,16,"Beta");
				/* Enceladus Sample on Earth */
				missions["Enceladus Sample Return"] = new Mission(loc,20,"Alpha","Beta");
				break;
			case "Europa":
				/* X Survey Europa with Galileo Probe */
				missions["Advanced Europa Survey"] = new Mission(loc,8,"Alpha","Gamma");
				/* Working Probe/Capsule on Europa */
				missions["Europa Lander"] = new Mission(loc,14,"Alpha","Beta");
				/* X Separate and Discard Explorer on Europa */
				missions["Europa Ice Explorer"] = new Mission(loc,16,"Beta");
				/* Europa Sample on Earth */
				missions["Europa Sample Return"] = new Mission(loc,21,"Beta");
				break;
			case "Jupiter":
				/* Working Probe/Capsule in Jupiter Orbit */
				missions["Jupiter Orbiter"] = new Mission(loc,9,"Alpha","Beta");
				/* X Man On/Orbiting Jupiter or One of its Moons at Start of Year */
				missions["Jupiter Station"] = new Mission(loc,25,"Beta");
				/* Man to Jupiter Fly-By and Back */
				if(z.FAM){
					missions["Crewed Jupiter Fly-By"] = new Mission(loc,25,"Beta");
				} else {
					missions["Manned Jupiter Fly-By"] = new Mission(loc,25,"Beta");
				}
				break;
			case "Titan":
				/* X Survey Titan with Galileo Probe */
				missions["Advanced Titan Survey"] = new Mission(loc,10,"Alpha","Beta");
				/* Working Probe/Capsule on Titan */
				missions["Titan Lander"] = new Mission(loc,17,"Beta");
				/* X Separate and Discard Explorer Payload on Titan */
				missions["Titan Cloud Explorer"] = new Mission(loc,22,"Alpha");
				/* Titan Sample on Earth */
				missions["Titan Sample Return"] = new Mission(loc,26,"Alpha","Beta");
				/* Man on Titan and Back */
				if(z.FAM){
					missions["Human on Titan"] = new Mission(loc,42,"Alpha","Beta");
				} else {
					missions["Man on Titan"] = new Mission(loc,42,"Alpha","Beta");
				}
				break;
			case "Saturn":
				/* X Working Probe/Capsule in Saturn Orbit */
				missions["Saturn Orbiter"] = new Mission(loc,13,"Alpha");
				/* Saturn Ring Sample on Earth */
				missions["Saturn Ring Sample Return"] = new Mission(loc,25,"Alpha");
				/* X Man On/Orbiting Saturn or One of its Moons at Start of Year */
				missions["Saturn Station"] = new Mission(loc,30,"Beta");
				/* Man to Saturn Fly-By and Back */
				if(z.FAM){
					missions["Crewed Saturn Fly-By"] = new Mission(loc,35,"Beta");
				} else {
					missions["Manned Saturn Fly-By"] = new Mission(loc,35,"Beta");
				}
				break;
		}
		for(let mission in missions){
			if(missions[mission].difficulty > threshold){
				delete missions[mission];
			}
		}
		z.explorableMissions[loc] = missions;
	});
}

class Astronaut {
	constructor(type){
		this.type = type;
		this.incapacitated = false;
		this.visited = {};
	}
}
/*
Juno 		Juno			$1		1		4 Thrust
Atlas 		Atlas			$5		4		27 Thrust
Soyuz	 	Soyuz 			$8		9		80 Thrust
Saturn		Saturn			$15		20		200 Thrust
Ion Thruster Ion Thrusters	$10		1		5 Thrust/Year
Probe		[None]			$2		1
Eagle		Landing			$4		1		2 Seats			Cloud: Burn Up
Vostok		Reentry			$2		2		1 Seat			Cloud: Burn Up Unless Reentry Successful
Apollo		Reentry 		$4		3		3 Seats			Cloud: Burn Up Unless Reentry Successful
Aldrin		Life Support	$4		3		8 Seats			Cloud: Burn Up.  -1 Solar Radiation
Moon Sample							1
Mercury Sample						1
Phobos Sample						1
Mars Sample							1
Venus Sample						1
Ceres Sample						1
Supplies 1x Life Support	$1		1
Supplies 5x	Life Support	$5		5						(completely interchangeable with 5x Supplies (1x))
----Outer Planets---
Callisto Sample						1
Enceladus Sample					1
Europa Sample						1
Ganymede Sample						1
Io Sample							1
Saturn Sample						1						Can Only Be Collected in Saturn Orbit
Titan Sample						1
Explorer	Rendezvous		$3		1
Galileo		Surveying		$5		2						-1 Solar Radiation
Proton		Proton			$12		6		70 Thrust
*/




function damageable(component){
	return !component.endsWith(" (damaged)") && !component.endsWith(" Sample") && component !== "Supplies" && component !== "Food" && component !== "Spare Parts" && component !== "Medical Supplies" &&
		   component !== "Palladium" && component !== "Fossil?" && component !== "Platinum" && component !== "Iridium" && component !== "Wreckage" && component !== "Alien Object" &&
		   component !== "Experiment (ready)" && !component.endsWith(" Experiment") && component !== "Ground Habitat (parts)" && component !== "Ground Habitat"; 
}


class Spacecraft {
	constructor(name,loc){
		this.name = name;
		this.astronauts = {};
		this.timeTokens = 0;
		this.burntMass = 0;
		if(z.stations){
			this.burntShuttles = 0;
			this.burntDaedalus = 0;
		}
		if(loc === undefined){
			loc = "Earth";
		}
		this.location = loc;
	}
	
	toString(){
		return this.name;
	}
	
	mentalHealthCheck(){
		if(this.numAstronauts() === 1 || this.numAstronauts()*2 > this.seats()){
			for(let astronaut in this.astronauts){
				let roll = getDieRoll();
				if(roll === 1){
					this.astronauts[astronaut].incapacitated = true;
					plainAlert(astronaut + " fails their mental health check and is incapacitated.");
				}
			}
		}
	}
	
	availableShuttles(){
		if(!z.stations){
			return 0;
		}
		let count = 0;
		if("Shuttle" in this){
			count += this.Shuttle;
		}
		if("Shuttle (used)" in this){
			count += this["Shuttle (used)"];
		}
		return count - this.burntShuttles;
	}
	
	availableDaedalus(){
		if(!z.stations){
			return 0;
		}
		let count = 0;
		if("Daedalus" in this){
			count += this.Daedalus;
		}
		return count - this.burntDaedalus;
	}
	
	untapProbesCapsules(){
		delete this.didSomething;
		let capsules = ["Eagle",
						"Vostok",
						"Aldrin",
						"Apollo",
						"Probe",
						"Galileo",
						"Shuttle",
						"Space Habitat",
						"Ground Habitat"];
						
		capsules.forEach((capsule)=>{
			if((capsule + " (used)") in this){
				this.addComponent(capsule,this[capsule + " (used)"]);
				this.removeComponent(capsule+" (used)",this[capsule+ " (used)"]);
			}
			if((capsule + " (used) (damaged)") in this){
				this.addComponent(capsule + " (damaged)",this[capsule + " (used) (damaged)"]);
				this.removeComponent(capsule+" (used) (damaged)",this[capsule+ " (used) (damaged)"]);
			}
		});
		if("Rover (surveyed)" in this){
			this.addComponent("Rover",this["Rover (surveyed)"]);
			this.removeComponent("Rover (surveyed)",this["Rover (surveyed)"]);
		}
		if("Rover (surveyed) (damaged)" in this){
			this.addComponent("Rover (damaged)",this["Rover (surveyed) (damaged)"]);
			this.removeComponent("Rover (surveyed) (damaged)",this["Rover (surveyed) (damaged)"]);
		}
		if("Rover (surveyed) (explored)" in this){
			this.addComponent("Rover (explored)",this["Rover (surveyed) (explored)"]);
			this.removeComponent("Rover (surveyed) (explored)",this["Rover (surveyed) (explored)"]);
		}
		if("Rover (surveyed) (explored) (damaged)" in this){
			this.addComponent("Rover (explored) (damaged)",this["Rover (surveyed) (explored) (damaged)"]);
			this.removeComponent("Rover (surveyed) (explored) (damaged)",this["Rover (surveyed) (explored) (damaged)"]);
		}
	}
	
	untapIonThrusters(){
		if("Ion Thruster (used)" in this){
			this.addComponent("Ion Thruster",this["Ion Thruster (used)"]);
			this.removeComponent("Ion Thruster (used)",this["Ion Thruster (used)"]);
		}
		if("Ion Thruster (used) (damaged)" in this){
			this.addComponent("Ion Thruster (damaged)",this["Ion Thruster (used) (damaged)"]);
			this.removeComponent("Ion Thruster (used) (damaged)",this["Ion Thruster (used) (damaged)"]);
		}
		if("Rover (explored)" in this){
			this.addComponent("Rover",this["Rover (explored)"]);
			this.removeComponent("Rover (explored)",this["Rover (explored)"]);
		}
		if("Rover (explored) (damaged)" in this){
			this.addComponent("Rover (damaged)",this["Rover (explored) (damaged)"]);
			this.removeComponent("Rover (explored) (damaged)",this["Rover (explored) (damaged)"]);
		}
	}
	
	untapProduction(){
		if("Hydroponics Module (used)" in this){
			this.addComponent("Hydroponics Module",this["Hydroponics Module (used)"]);
			this.removeComponent("Hydroponics Module (used)",this["Hydroponics Module (used)"]);
		}
		if("Fuel Generator (used)" in this){
			this.addComponent("Fuel Generator",this["Fuel Generator (used)"]);
			this.removeComponent("Fuel Generator (used)",this["Fuel Generator (used)"]);
		}
	}
	
	hasScientist(){
		for(let astronaut in this.astronauts){
			if(this.astronauts[astronaut].type === "Scientist" && !this.astronauts[astronaut].incapacitated){
				return true;
			}
		}
		return false;
	}
	
	claimManOn(country){
		let index = z.turn;
		let countryVisited = country;
		if(country === undefined){
			country = z.countries[z.turn];
			if(z.stations){
				countryVisited = country;
			}
		} else {
			for(let j = 0; !(j>=z.countries.length); j++){
				if(z.countries[j] === country){
					index = j;
					break;
				}
			}
		}
		if(missionAvailable("Man in Space") && this.hasVisited("Space",countryVisited)){
			completeMission("Man in Space",country);
		}
		if(missionAvailable("Human in Space") && this.hasVisited("Space",countryVisited)){
			completeMission("Human in Space",country);
		}
		if(missionAvailable("Man in Orbit") && this.hasVisited("Earth Orbit",countryVisited)){
			completeMission("Man in Orbit",country);
		}
		if(missionAvailable("Human in Orbit") && this.hasVisited("Earth Orbit",countryVisited)){
			completeMission("Human in Orbit",country);
		}
		let done = true;
		let moon = false;
		let mars = false;
		if(this.hasVisited("Moon",countryVisited)){
			if(missionAvailable("Human on the Moon") && missionAvailable("Human on the Moon +1.5")){
				plainAlert(country+" must claim one of the Human on the Moon missions.");
				moon = true;
				done = false;
			} else if(missionAvailable("Human on the Moon +1.5")){
				if("Human on the Moon" in z.missions && z.missions["Human on the Moon"].claimed !== index && z.numPlayers > index){
					completeMission("Human on the Moon +1.5",country);
				}
			} else if(missionAvailable("Man on the Moon")){
				if(!("Human on the Moon +1.5" in z.missions) || (z.missions["Human on the Moon +1.5"].claimed !== index && z.numPlayers > index)){
					completeMission("Human on the Moon",country);
				}
			}
			if(missionAvailable("Man on the Moon") && missionAvailable("Man on the Moon +1.5")){
				plainAlert(country+" must claim one of the Man on the Moon missions.");
				moon = true;
				done = false;
			} else if(missionAvailable("Man on the Moon +1.5")){
				if("Man on the Moon" in z.missions && z.missions["Man on the Moon"].claimed !== index && z.numPlayers > index){
					completeMission("Man on the Moon +1.5",country);
				}
			} else if(missionAvailable("Man on the Moon")){
				if(!("Man on the Moon +1.5" in z.missions) || (z.missions["Man on the Moon +1.5"].claimed !== index && z.numPlayers > index)){
					completeMission("Man on the Moon",country);
				}
			}
		}
		if(this.hasVisited("Mars",countryVisited)){
			if(missionAvailable("Human on Mars") && missionAvailable("Human on Mars +2.5")){
				plainAlert(country+" must claim one of the Human on Mars missions.");
				mars = true;
				done = false;
			} else if(missionAvailable("Human on Mars +2.5")){
				if("Human on Mars" in z.missions && z.missions["Human on Mars"].claimed !== index && z.numPlayers > index){
					completeMission("Human on Mars +2.5",country);
				}
			} else if(missionAvailable("Human on Mars")){
				if(!("Human on Mars +2.5" in z.missions) || (z.missions["Human on Mars +2.5"].claimed !== index && z.numPlayers > index)){
					completeMission("Human on Mars",country);
				}
			}
			if(missionAvailable("Man on Mars") && missionAvailable("Man on Mars +2.5")){
				plainAlert(country+" must claim one of the Man on Mars missions.");
				mars = true;
				done = false;
			} else if(missionAvailable("Man on Mars +2.5")){
				if("Man on Mars" in z.missions && z.missions["Man on Mars"].claimed !== index && z.numPlayers > index){
					completeMission("Man on Mars +2.5",country);
				}
			} else if(missionAvailable("Man on Mars")){
				if(!("Man on Mars +2.5" in z.missions) || (z.missions["Man on Mars +2.5"].claimed !== index && z.numPlayers > index)){
					completeMission("Man on Mars",country);
				}
			}
		}
		if(missionAvailable("Man on Venus") && this.hasVisited("Venus",countryVisited)){
			completeMission("Man on Venus",country);
		}
		if(missionAvailable("Human on Venus") && this.hasVisited("Venus",countryVisited)){
			completeMission("Human on Venus",country);
		}
		if(missionAvailable("Man on Titan") && this.hasVisited("Titan",countryVisited)){
			completeMission("Man on Titan",country);
		}
		if(missionAvailable("Human on Titan") && this.hasVisited("Titan",countryVisited)){
			completeMission("Human on Titan",country);
		}
		if(missionAvailable("Manned Jupiter Fly-By") && this.hasVisited("Jupiter Fly-By",countryVisited)){
			completeMission("Manned Jupiter Fly-By",country);
		}
		if(missionAvailable("Crewed Jupiter Fly-By") && this.hasVisited("Jupiter Fly-By",countryVisited)){
			completeMission("Crewed Jupiter Fly-By",country);
		}
		if(missionAvailable("Manned Saturn Fly-By") && this.hasVisited("Saturn Fly-By",countryVisited)){
			completeMission("Manned Saturn Fly-By",country);
		}
		if(missionAvailable("Crewed Saturn Fly-By") && this.hasVisited("Saturn Fly-By",countryVisited)){
			completeMission("Crewed Saturn Fly-By",country);
		}
		if(missionAvailable("Manned Lunar Fly-By") && (this.hasVisited("Lunar Fly-By",countryVisited) || this.hasVisited("Lunar Orbit",countryVisited))){
			completeMission("Manned Lunar Fly-By",country);
		}
		if(missionAvailable("Crewed Lunar Fly-By") && (this.hasVisited("Lunar Fly-By",countryVisited) || this.hasVisited("Lunar Orbit",countryVisited))){
			completeMission("Crewed Lunar Fly-By",country);
		}
		if(missionAvailable("Manned Mars Fly-By") && (this.hasVisited("Mars Fly-By",countryVisited) || this.hasVisited("Mars Orbit",countryVisited) || this.hasVisited("Mars Cycler",countryVisited))){
			completeMission("Manned Mars Fly-By",country);
		}
		if(missionAvailable("Crewed Mars Fly-By") && (this.hasVisited("Mars Fly-By",countryVisited) || this.hasVisited("Mars Orbit",countryVisited) || this.hasVisited("Mars Cycler",countryVisited))){
			completeMission("Crewed Mars Fly-By",country);
		}
		if(missionAvailable("Man on Phobos") && this.hasVisited("Phobos",countryVisited)){
			completeMission("Man on Phobos",country);
		}
		if(missionAvailable("Human on Phobos") && this.hasVisited("Phobos",countryVisited)){
			completeMission("Human on Phobos",country);
		}
		if(missionAvailable("Man on Ceres") && this.hasVisited("Ceres",countryVisited)){
			completeMission("Man on Ceres",country);
		}
		if(missionAvailable("Human on Ceres") && this.hasVisited("Ceres",countryVisited)){
			completeMission("Human on Ceres",country);
		}
		if(missionAvailable("Man on Mercury") && this.hasVisited("Mercury",countryVisited)){
			completeMission("Man on Mercury",country);
		}
		if(missionAvailable("Human on Mercury") && this.hasVisited("Mercury",countryVisited)){
			completeMission("Human on Mercury",country);
		}
		if(moon && mars){
			addOption(index,"Claim a Mission","Moon and Mars",true);
		} else if(moon){
			addOption(index,"Claim a Mission","Man on the Moon",true);
		} else if(mars){
			addOption(index,"Claim a Mission","Man on Mars",true);
		}
		return done;
	}
	
	claimSampleReturn(){
		let country = z.countries[z.turn];
		
		if(missionAvailable("Lunar Sample Return") && ("Moon Sample" in this || "Palladium" in this)){
			completeMission("Lunar Sample Return",country);
		}
		if(missionAvailable("Saturn Ring Sample Return") && "Saturn Sample" in this){
			completeMission("Saturn Ring Sample Return",country);
		}
		if(missionAvailable("Mars Sample Return") && ("Fossil?" in this || "Platinum" in this || "Iridium" in this)){
			completeMission("Mars Sample Return",country);
		}
		for(let component in this){
			if(component in componentMasses && component.endsWith("Sample")){
				if(missionAvailable(component + " Return")){
					completeMission(component + " Return",country);
				}
			}
		}
		if(missionAvailable("Extraterrestrial Life")){
			for(let hazard in z.hazard){
				if(z.hazard[hazard].includes("Life") && hazard + " Sample" in this){
					completeMission("Extraterrestrial Life",country);
					break;
				}
			}
		}
		if(missionAvailable("Extraterrestrial Life Sample")){
			for(let hazard in z.hazard){
				if(z.hazard[hazard].includes("Life") && hazard + " Sample" in this){
					completeMission("Extraterrestrial Life Sample",country);
					break;
				} else if(hazard in z.features && z.features[hazard].includes("Infection") && ("Moon Sample" in this || "Palladium" in this) && this.infected){
					/* RULES: how does this actually work?  */
					completeMission("Extraterrestrial Life Sample",country);
					break;
				} else if(hazard in z.features && (z.features[hazard].includes("Microbes") || z.features[hazard].includes("Lichens")) && ("Mars Sample" in this || "Fossil?" in this || "Platinum" in this || "Iridium" in this)){
					completeMission("Extraterrestrial Life Sample",country);
					break;
				}		
			}
		}
	}
	
	visited(place,countryName){
		if(countryName === undefined){
			for(let astronaut in this.astronauts){
				this.astronauts[astronaut].visited[place] = true;
			}
		} else {
			for(let astronaut in this.astronauts){
				if(!(place in this.astronauts[astronaut].visited)){
					this.astronauts[astronaut].visited[place] = {};
				}
				this.astronauts[astronaut].visited[place][countryName] = true;
			}
		}
	}
	
	hasVisited(place,country){
		if(country === undefined){
			for(let astronaut in this.astronauts){
				if(this.astronauts[astronaut].visited[place]){
					return true;
				}
			}
			return false;
		} else {
			for(let astronaut in this.astronauts){
				if(place in this.astronauts[astronaut].visited && this.astronauts[astronaut].visited[place][country]){
					return true;
				}
			}
			return false;
		}
	}
	
	rollRadiation(strength,galileoReduction){
		let any = false;
		let anyDamaged = false;
		for(let component in this){
			switch(component){
				case "Eagle":
				case "Vostok":
				case "Apollo":
				case "Aldrin":
				case "Probe":
				case "Shuttle":
				case "Eagle (used)":
				case "Vostok (used)":
				case "Apollo (used)":
				case "Aldrin (used)":
				case "Probe (used)":
				case "Shuttle (used)":
				case "Rover":
				case "Rover (surveyed)":
				case "Rover (explored)":
				case "Rover (surveyed) (explored)": {
					any = true;
					for(let k = this[component]; k > 0; k--){
						let roll = getDieRoll();
						if(strength >= roll){
							anyDamaged = true;
							plainAlert(component + " damaged by radiation.");
							this.damageComponent(component);
						}
					}
					break;
				}					
				case "Galileo":
				case "Galileo (used)": {
					any = true;
					for(let k = this[component]; k > 0; k--){
						let roll = getDieRoll();
						if(strength - galileoReduction >= roll){
							anyDamaged = true;
							plainAlert(component + " damaged by radiation.");
							this.damageComponent(component);
						}
					}
					break;
				}
			}
		}
		if(any && !anyDamaged){
			plainAlert("No probes or capsules are damaged by Jupiter's radiation.");
		}
	}
	
	rollSickness(strength,aldrinReduction){
		let any = false;
		for(let astronaut in this.astronauts){
			if(!this.astronauts[astronaut].incapacitated){
				any = true;
				break;
			}
		}
		if(!any){
			return true;
		}
		let imperviousSeats = 0;
		if("Space Habitat" in this){
			imperviousSeats += 20 * this["Space Habitat"];
		}
		if("Ground Habitat" in this){
			imperviousSeats += 20 * this["Ground Habitat"];
		}
		if(imperviousSeats >= this.numAstronauts()){
			return true;
		} else if(imperviousSeats > 0){
			plainAlert("That's too many astronauts; roll and incapacitate astronauts that don't get habitat seats manually.");
			let edgeCases = [];
			for(let astronaut in this.astronauts){
				edgeCases.push(astronaut);
			}
			addOption(me,"Incapacitate an astronaut",edgeCases,false);
			return true;
			/* TODO: actually handle this case */
		} 
		
		if(strength - aldrinReduction >= 10){
			for(let astronaut in this.astronauts){
				if(!this.astronauts[astronaut].incapacitated){
					this.astronauts[astronaut].incapacitated = true;
					plainAlert(astronaut + " is incapacitated.");
				}
			}
			return true;
		}
		
		let roll = (strength) => {
			let any = false;
			for(let astronaut in this.astronauts){
				if(!this.astronauts[astronaut].incapacitated){
					let roll = getDieRoll();
					if(strength >= roll){
						any = true;
						this.astronauts[astronaut].incapacitated = true;
						plainAlert(astronaut + " is incapacitated.");
					}
				}
			}
			if(!any){
				plainAlert("No astronauts were incapacitated.");
			}
		};
		
		if((!("Aldrin" in this) && !("Aldrin (used)" in this) && !("Aldrin (damaged)" in this) && !("Aldrin (used) (damaged)" in this)) || aldrinReduction === 0){
			roll(strength);
			return true;
		} else {
			let aldrinSeats = 0;
			let damagedAldrinSeats = 0;
			let otherSeats = 0;
			/* RULES: all of this */
			for(let component in this){
				if(component in capsuleSeats){
					if(component === "Aldrin" || component === "Aldrin (used)"){
						aldrinSeats+= this[component]*capsuleSeats[component];
					} else if(component === "Aldrin (damaged)" || component === "Aldrin (used) (damaged)"){
						damagedAldrinSeats += this[component] *capsuleSeats[component];
					} else {
						otherSeats += this[component] * capsuleSeats[component];
					}
				}
			}
			if(aldrinSeats > this.numAstronauts() || otherSeats === 0){
				roll(strength-aldrinReduction);
				return true;
			}
			plainAlert("There are not enough seats on undamaged Aldrin capsules to seat all astronauts.");
			let edgeCases = [];
			for(let astronaut in this.astronauts){
				if(!this.astronauts[astronaut].incapacitated){
					let roll = getDieRoll();
					if(strength - aldrinReduction >= roll){
						this.astronauts[astronaut].incapacitated = true;
						plainAlert(roll + ": " + astronaut + " is incapacitated.");
					} else if(strength >= roll ){
						plainAlert(roll + ": " + astronaut + " would be incapacitated if they did not get a seat on an Aldrin.");
						edgeCases.push(astronaut);
					} else {
						plainAlert(roll + ": " + astronaut + " is not incapacitated.");
					}
				}
			}
			if(edgeCases.length > 0){
				/* TODO: this */
				addOption(me,"Incapacitate an astronaut",edgeCases,false);
			}

			
			return true;
		}
	}
	
	isExplorer(){
		if(this.timeTokens > 0){
			return false;
		}
		if("Explorer" in this && this.Explorer === 1){
			for(let component in this){
				if(component in componentMasses && component !== "Explorer"){
					return false;
				}
			}
			return true;
		}
		return false;
		
	}
	
	isRover(){
		if(this.timeTokens > 0){
			return false;
		}
		if("Rover" in this && this.Rover === 1){
			for(let component in this){
				if(component in componentMasses && component !== "Rover"){
					return false;
				}
			}
			return true;
		}
		if("Rover (surveyed)" in this && this["Rover (surveyed)"] === 1){
			for(let component in this){
				if(component in componentMasses && component !== "Rover (surveyed)"){
					return false;
				}
			}
			return true;
		}
		return false;
		
	}
	
	damageComponent(component){
		if(component in this.astronauts){
			this.astronauts[component].incapacitated = true;
		} else {
			this.removeComponent(component);
			this.addComponent(component + " (damaged)");
		}
	}
	
	numComponents(){
		let result = 0;
		for(let component in this){
			if(component in componentMasses){
				result += this[component];
			}
		}
		return result;
	}
	
	undamagedTypes(){
		let result = 0;
		for(let astronaut in this.astronauts){
			if(!this.astronauts[astronaut].incapacitated){
				result++;
			}
		}
		for(let component in this){
			if(component in componentMasses && damageable(component)){
				result++;
			}
		}
		return result;
	}
	
	isValid(){
		return this.nonEmpty() && this.seats() >= this.numAstronauts();
	}
	
	nonEmpty(){
		for(let component in componentMasses){
			if(component in this){
				return true;
			}
		}
		return false;
	}
	
	isCrewed(){
		for(let astronaut in this.astronauts){
			return true;
		}
		return false;
	}
	
	numAstronauts(){
		let result = 0;
		for(let astronaut in this.astronauts){
			result++;
		}
		return result;
	}
	
	numHealthyAstronauts(){
		let result = 0;
		for(let astronaut in this.astronauts){
			if(!this.astronauts[astronaut].incapacitated){
				result++;
			}
		}
		return result;
	}
	
	mass(){
		let mass = this.burntMass;
		for(let component in this){
			if(component in componentMasses){
				mass += this[component] * componentMasses[component];
			}
		}
		return mass;
	}


	repairDamage(){
		for(let component in this){
			let re = /^(.*) \(damaged\)$/.exec(component);
			if(re){
				let undamaged = re[1];
				this.addComponent(undamaged,this[component]);
				this.removeComponent(component,this[component]);
			}
		}
	}
	
	healCrew(){
		for(let astronaut in this.astronauts){
			this.astronauts[astronaut].incapacitated = false;
		}
		if(this.hasScientist() && (!z.stations || "Science Module" in this)){
			this.claimSampleReturn();
		}
	}
	
	repairAll(){
		this.repairDamage();
		this.healCrew();
	}
	
	killAstronaut(astronaut,country){
		if(country === undefined){
			country = me;
		}
		if(astronaut in this.astronauts){
			z.memorialWall[country].push(astronaut);
			plainAlert(astronaut + " dies!");
			if(z.stations){
				z.points[country] -= 2*z.memorialWall[country].length;
			} else {
				z.points[country] -= 2;
			}
			delete this.astronauts[astronaut];
		}
	}
	
	killIncapacitated(country){
		if(country === undefined){
			country = me;
		}
		for(let astronaut in this.astronauts){
			if(this.astronauts[astronaut].incapacitated){
				this.killAstronaut(astronaut,country);
			}
		}
	}
	
	killAll(country){
		if(country === undefined){
			country = me;
		}
		for(let astronaut in this.astronauts){
			this.killAstronaut(astronaut,country);
		}
		z.gameOver = endGameCheck();
	}
	
	
	seats(){
		let result = 0;
		for(let component in this){
			switch(component){
				case "Eagle":
				case "Eagle (damaged)":
				case "Eagle (used)":
				case "Eagle (used) (damaged)":
					result += 2 * this[component];
					break;
				case "Vostok":
				case "Vostok (damaged)":
				case "Vostok (used)":
				case "Vostok (used) (damaged)":
					result += 1 * this[component];
					break;
				case "Apollo":
				case "Apollo (damaged)":
				case "Apollo (used)":
				case "Apollo (used) (damaged)":
					result += 3 * this[component];
					break;
				case "Aldrin":
				case "Aldrin (damaged)":
				case "Aldrin (used)":
				case "Aldrin (used) (damaged)":
					result += 8 * this[component];
					break;
				case "Shuttle":
				case "Shuttle (damaged)":
				case "Shuttle (used)":
				case "Shuttle (used) (damaged)":
					result += 6 * this[component];
					break;
				case "Space Habitat":
				case "Space Habitat (damaged)":
				case "Space Habitat (used)":
				case "Space Habitat (used) (damaged)":
				case "Ground Habitat":
				case "Ground Habitat (used)":
					result += 20 * this[component];
					break;
			}
		}
		return result;
	}
	
	emptySeats(){
		return this.seats() - this.numAstronauts();
	}
	
	undamagedSeats(){
		let result = 0;
		for(let component in this){
			switch(component){
				case "Eagle":
				case "Eagle (used)":
					result += 2 * this[component];
					break;
				case "Vostok":
				case "Vostok (used)":
					result += 1 * this[component];
					break;
				case "Apollo":
				case "Apollo (used)":
					result += 3 * this[component];
					break;
				case "Aldrin":
				case "Aldrin (used)":
					result += 8 * this[component];
					break;
				case "Shuttle":
				case "Shuttle (used)":
					result += 6 * this[component];
					break;
				case "Space Habitat":
				case "Space Habitat (used)":
				case "Ground Habitat":
				case "Ground Habitat (used)":
					result += 20 * this[component];
					break;
			}
		}
		return result;
	}
	
	capsules() {
		let result = 0;
		for(let component in this){
			if(component in capsuleSeats){
				result += this[component];
			}
		}
		return result;
	}
	
	workingProbesCapsules() {
		let result = 0;
		for(let component in this){
			switch(component){
				case "Eagle":
				case "Vostok":
				case "Apollo":
				case "Aldrin":
				case "Probe":
				case "Galileo":
				case "Space Habitat":
				case "Ground Habitat":
				case "Shuttle":
				case "Rover":
				case "Rover (explored)":
					result += this[component];
					break;
			}
		}
		return result;
	}
	
	isHabitat(){
		if(this.timeTokens > 0){
			return false;
		}
		for(let component in this){
			switch(component){
				case "Space Habitat":
				case "Ground Habitat":
				case "Space Habitat (used)":
				case "Ground Habitat (used)":
					return true;
			}
		}
		return false;
	}
	
	isLander(){
		if(this.timeTokens > 0){
			return false;
		}
		for(let component in this){
			switch(component){
				case "Eagle":
				case "Vostok":
				case "Apollo":
				case "Aldrin":
				case "Probe":
				case "Galileo":
				case "Eagle (used)":
				case "Vostok (used)":
				case "Apollo (used)":
				case "Aldrin (used)":
				case "Probe (used)":
				case "Galileo (used)":
				case "Space Habitat":
				case "Ground Habitat":
				case "Shuttle":
				case "Space Habitat (used)":
				case "Ground Habitat (used)":
				case "Shuttle (used)":
				case "Rover":
				case "Rover (surveyed)":
				case "Rover (surveyed) (explored)":
				case "Rover (explored)":
					return true;
			}
		}
		return false;
	}
	
	canHeal(){
		let doctor = false;
		for(let astronaut in this.astronauts){
			if(!this.astronauts[astronaut].incapacitated && this.astronauts[astronaut].type === "Doctor"){
				doctor = true;
				break;
			}
		}
		if(!doctor){
			return false;
		}
		if(z.stations && !("Medical Supplies" in this) && !("Medical Module" in this)){
			return false;
		}

		for(let astronaut in this.astronauts){
			if(this.astronauts[astronaut].incapacitated){
				return true;
			}
		}
		return false;

	}
	
	hasMechanic(){
		for(let astronaut in this.astronauts){
			if(!this.astronauts[astronaut].incapacitated && this.astronauts[astronaut].type === "Mechanic"){
				return true;
			}
		}
		return false;
	}
	
	canRepair(){
		if(!this.hasMechanic()){
			return false;
		}
		if(!z.stations && !("Supplies" in this)){
			return false;
		}
		if(z.stations && !("Spare Parts" in this)){
			return false;
		}
		for(let component in this){
			if(component in componentMasses && component.endsWith("(damaged)")){
				return true;
			}
		}
		return false;
	}
	
	canCollect(){
		if(this.timeTokens > 0){
			return false;
		}
		for(let astronaut in this.astronauts){
			if(!this.astronauts[astronaut].incapacitated){
				return true;
			}
		}
		for(let component in this){
			switch(component){
				case "Eagle":
				case "Eagle (used)":
				case "Vostok":
				case "Vostok (used)":
				case "Apollo":
				case "Apollo (used)":
				case "Aldrin":
				case "Aldrin (used)":
				case "Probe":
				case "Probe (used)":
				case "Galileo":
				case "Galileo (used)":
				case "Shuttle":
				case "Shuttle (used)":
				case "Space Habitat":
				case "Space Habitat (used)":
				case "Ground Habitat":
				case "Ground Habitat (used)":
				case "Rover":
				case "Rover (surveyed)":
				case "Rover (surveyed) (explored)":
				case "Rover (explored)":
					return true;
			}
		}
		return false;
	}
	
	heatShieldCapsules(){
		let result = 0;
		for(let component in this){
			switch(component){
				case "Vostok":
				case "Vostok (used)":
				case "Apollo":
				case "Apollo (used)":
				case "Shuttle":
				case "Shuttle (used)":
					result += this[component];
					break;
			}
		}
		return result;
	}
	
	undamagedCapsules() {
		let result = 0;
		for(let component in this){
			switch(component){
				case "Eagle":
				case "Eagle (used)":
				case "Vostok":
				case "Vostok (used)":
				case "Apollo":
				case "Apollo (used)":
				case "Aldrin":
				case "Aldrin (used)":
				case "Shuttle":
				case "Shuttle (used)":
				case "Space Habitat":
				case "Space Habitat (used)":
				case "Ground Habitat":
				case "Ground Habitat (used)":
					result += this[component];
					break;
			}
		}
		return result;
	}
	
	addComponent(component,num){
		if(num === undefined){
			num = 1;
		}

		if(component in this){
			this[component] += num;
		} else {
			this[component] = num;
		}
		
	}
	
	removeComponent(component,num){
		if(num === undefined){
			num = 1;
		}
		if(component in this){
			this[component] -= num;
			if(this[component] === 0){
				delete this[component];
			}
		}
	}
	
	destroyCapsules(){
		for(let component in this){
			if(component in capsuleSeats){
				delete this[component];
			}
		}
		this.killAll();
	}
	
	useIonThruster(num){
		if(num === undefined){
			num = 1;
		}
		this.removeComponent("Ion Thruster",num);
		this.addComponent("Ion Thruster (used)",num);
	}
}

/*
Eagle		Landing			$4		1		2 Seats			Cloud: Burn Up
Vostok		Reentry			$2		2		1 Seat			Cloud: Burn Up Unless Reentry Successful  [Burn Up if damaged]
Apollo		Reentry 		$4		3		3 Seats			Cloud: Burn Up Unless Reentry Successful  [Burn Up if damaged]
Aldrin		Life Support	$4		3		8 Seats			Cloud: Burn Up.  -1 Solar Radiation
*/

var map = {};

/* No docking/separating, no repairs */
map["Suborbital Space"] = {
	hazard: "Suborbital Space",
	connections: {
		"Earth Orbit": {
			difficulty: 5
		},
		"Earth": {
			difficulty: 0,
			landingOptional: true,
			automatic: true
		}
	}
	
};

map["Moon"] = {
	hazard: "Moon",
	connections: {
		"Lunar Orbit": {
			difficulty: 2
		}
	}
};

map["Venus"] =
{
	hazard: "Venus",
	connections: {
		"Venus Orbit": {
			difficulty: 6,
		}
	}
};

map["Mars"] = 
{
	hazard: "Mars",
	connections: {
		"Mars Orbit": {
			difficulty: 3,
		}
	}
};

map["Phobos"] = 
{
	hazard: "Phobos",
	connections: {
		"Mars Orbit": {
			difficulty: 1,
			slow: true,
			time: 0,
		}
	}
};


map["Mars Fly-By"] = 
{
	connections: {
	"Mars Orbit": {
		difficulty:	3,
		slow: true,
		time: 0
	},
	"Mars": {
		difficulty: 3,
		atmosphericEntry: true,
		landing: true,
		hazard: "Mars",
	},
	"Lost": {
		difficulty: 0,
		automatic: true
	}
	},
};

map["Mars Orbit"] = 
{
	connections: {
		"Inner Planets Transfer": {
			difficulty: 4,
			slow: true,
			time: 2,
			solarRadiation: true
		},
		"Earth Orbit": {
			difficulty: 5,
			slow: true,
			time: 3,
			solarRadiation: true
		},
		"Mars": {
			difficulty: 0,
			atmosphericEntry: true,
			landing: true,
			hazard: "Mars",
		},
		"Phobos": {
			difficulty: 1,
			slow: true,
			time: 0,
			landing: true,
			hazard: "Phobos",
		},	
	}
};


map["Venus Orbit"] = {
	connections: {
	"Venus": {
		difficulty: 0,
		atmosphericEntry: true,
		landingOptional: true,
		hazard: "Venus",
	},
	"Inner Planets Transfer": {
		difficulty: 3,
		slow: true,
		time: 1,
		solarRadiation: true,
	},
	}
};

map["Venus Fly-By"] = {
	connections: {
	"Venus Orbit": {
		difficulty: 1,
		slow: true,
		time: 0,
	},
	"Venus": {
		difficulty: 1,
		atmosphericEntry: true,
		landingOptional: true,
		hazard: "Venus",
	},
	"Lost": {
		difficulty: 0,
		automatic: true
	}
	},
};

map["Lunar Orbit"] = {
	connections: {
	"Earth Orbit": {
		difficulty: 3,
		slow: true,
		time: 0,
	},
	"Moon": {
		difficulty: 2,
		landing: true,
		hazard: "Moon",
	},
	
	},
};

map["Lunar Fly-By"] = {
	connections: {
	"Earth Orbit": {
		difficulty: 1,
		slow: true,
		time: 0,
	},
	"Lunar Orbit": {
		difficulty: 2,
		slow: true,
		time: 0,
	},
	"Moon": {
		difficulty: 4,
		landing: true,
		hazard: "Moon",
	},
	"Lost": {
		difficulty: 0,
		automatic: true
	}
	},
};

map["Earth Orbit"] = {
	connections: {
	"Lunar Orbit": {
		difficulty: 3,
		slow: true,
		time: 0,
	},
	"Lunar Fly-By": {
		difficulty: 1,
		slow: true,
		time: 0,
	},
	"Earth": {
		difficulty: 0,
		atmosphericEntry: true,
		landingOptional: true,
	},
	"Mars Orbit": {
		difficulty: 5,
		slow: true,
		time: 3,
		solarRadiation: true,
	},
	"Mars Fly-By": {
		difficulty: 3,
		slow: true,
		time: 3,
		solarRadiation: true,
	},
	"Inner Planets Transfer": {
		difficulty: 3,
		slow: true,
		time: 1,
	},
	},
};


/* No docking/separating, free repair at end of round, do not consume supplies */
map["Earth"] = {
	connections: {
	"Suborbital Space": {
		difficulty: 3,
		hazard: "Suborbital Space",
	},
	"Earth Orbit": {
		difficulty: 8,
		hazard: "Suborbital Space",
	},
	},
	
};


map["Ceres"] =
{
	hazard: "Ceres",
	connections: {
		"Inner Planets Transfer": {
			difficulty: 5,
			slow: true,
			time: 2,
			solarRadiation: true,
		}
	}
	
};


map["Inner Planets Transfer"] = {
	connections: {
		"Ceres": {
			difficulty: 5,
			slow: true,
			time: 1,
			landing: true,
			solarRadiation: true,
			hazard: "Ceres",
		},
		"Venus Orbit": {
			difficulty: 3,
			slow: true,
			time: 1,
			solarRadiation: true,
		},
		"Venus Fly-By": {
			difficulty: 2,
			slow: true,
			time: 1,
			solarRadiation: true,
		},
		"Earth Orbit": {
			difficulty: 3,
			slow: true,
			time: 1,
		},
		"Mars Orbit": {
			difficulty: 4,
			slow: true,
			time: 2,
			solarRadiation: true
		},
		"Lost": {
			difficulty: 0,
			automatic: true
		}
	}
};

function setupMap(){
if(z.mercury){
	map["Inner Planets Transfer"].connections["Mercury Fly-By"] = {
		difficulty: 5,
		slow: true,
		time: 1,
		solarRadiation: true
	};
	map["Mercury Orbit"] = 
	{
		connections: {
			"Inner Planets Transfer": {
				difficulty: 7,
				slow: true,
				time: 1,
				solarRadiation: true
			},
			"Mercury": {
				difficulty: 2,
				landing: true,
				hazard: "Mercury",
			}
		}
	};

	map["Mercury Fly-By"] = {
		connections: {
		"Mercury Orbit": {
			difficulty: 2,
			slow: true,
			time: 0,
		},
		"Mercury": {
			difficulty: 4,
			landing: true,
			hazard: "Mercury",
		},
		"Lost": {
			difficulty: 0,
			automatic: true
		}
		}
	};
	map["Mercury"] = {
		hazard: "Mercury",
		connections: {
			"Mercury Orbit": {
				difficulty: 2,
			}
		}
	};
	
}


if(z.outer){
	map["Callisto"] = {
		hazard: "Callisto",
		connections: {
			"Jupiter Orbit": {
				difficulty: 5,
				slow: true,
				time: 0
			},
			"Jupiter Fly-By": {
				difficulty: 5,
				jupiter: true
			}
		}
	};
	map["Enceladus"] = {
		hazard: "Enceladus",
		connections: {
			"Saturn Orbit": {
				difficulty: 2,
				slow: true,
				time: 0
			}
		}
	};
	map["Europa"] = {
		hazard: "Europa",
		endYearHazard: "Jupiter",
		connections: {
			"Jupiter Orbit": {
				difficulty: 2,
				slow: true,
				time: 0
			}
		}
	};
	map["Ganymede"] = {
		hazard: "Ganymede",
		connections: {
			"Ganymede Orbit": {
				difficulty: 2
			}
		}
	};
	map["Ganymede Orbit"] = {
		connections: {
			"Jupiter Orbit": {
				difficulty: 3,
				slow: true,
				time: 0
			},
			"Ganymede": {
				difficulty: 2,
				landing: true,
				hazard: "Ganymede"
			}
		}
	};
	map["Io"] = {
		hazard: "Io",
		endYearHazard: "Jupiter",
		connections: {
			"Jupiter Orbit": {
				difficulty: 2,
				slow: true,
				time: 0
			}
		}
	};
	map["Jupiter Fly-By"] = {
		telescope: {"Io": 1,"Europa": 1,"Ganymede": 1,"Callisto": 1},
		connections: {
			"Outer Planets Transfer": {
				difficulty: 4,
				slow: true,
				time: 2,
				solarRadiation: true
			},
			"Jupiter Orbit": {
				difficulty: 10,
				slow: true,
				time: 0,
				jupiter: true,
				aerobrakingDifficulty: 3,
			},
			"Saturn Fly-By": {
				difficulty: 0,
				slingshot: "Saturn",
				slow: true,
				time: 2,
				solarRadiation: true,
				jupiter: true
			},
			"Lost": {
				difficulty: 0,
				jupiter: true,
				automatic: true
			}
		}
	};
	/* all hazards listed in order below here */
	map["Jupiter Orbit"] = {
		endYearHazard: "Jupiter",
		telescope: {"Ganymede": 1},
		connections: {
			"Jupiter Fly-By": {
				difficulty: 10,
				jupiter: true,
				slow: true,
				time: 0
			},
			"Io": {
				difficulty: 2,
				jupiter: true,
				slow: true,
				time: 0,
				landing: true,
				hazard: "Io"				
			},
			"Ganymede Orbit": {
				difficulty: 3,
				jupiter: true,
				slow: true,
				time: 0
			},
			"Europa": {
				difficulty: 2,
				jupiter: true,
				slow: true,
				time: 0,
				landing: true,
				hazard: "Europa",
			},
			"Callisto": {
				difficulty: 5,
				slow: true,
				time: 0,
				landing: true,
				hazard: "Callisto"
			}
		}
	};
	map["Mars Fly-By"].connections["Jupiter Fly-By"] = {
		difficulty: 4,
		slingshot: "Jupiter",
		slow: true,
		time: 3,
		solarRadiation: true
	};
	map["Mars Fly-By"].connections["Mars Orbit"].aerobrakingDifficulty = 1;
	map["Neptune Fly-By"] = {
		connections: {
			"Lost": {
				difficulty: 0,
				hazard: "Neptune",
				automatic: true,
			}
		}
	};
	map["Outer Planets Transfer"] = {
		connections: {
			"Saturn Fly-By": {
				difficulty: 3,
				slingshot: "Saturn",
				slow: true,
				time: 3,
				solarRadiation: true
			},
			"Uranus Fly-By": {
				difficulty: 4,
				slingshot: "Uranus",
				slow: true,
				time: 9,
				solarRadiation: true
			},
			"Earth Orbit": {
				difficulty: 6,
				slow: true,
				time: 1,
				solarRadiation: true,
				aerobrakingDifficulty: 1,
				aerobrakingSlow: true
			},
			"Ceres": {
				difficulty: 3,
				slow: true,
				time: 1,
				solarRadiation: true,
				landing: true,
				hazard: "Ceres"
			},
			"Mars Orbit": {
				difficulty: 5,
				slow: true,
				time: 1,
				solarRadiation: true,
				aerobrakingDifficulty: 2,
				aerobrakingSlow: true
			},
			"Jupiter Fly-By": {
				difficulty: 4,
				slingshot: "Jupiter",
				slow: true,
				time: 2,
				solarRadiation: true
			},
			"Lost": {
				difficulty: 0,
				automatic: true
			}
		}
	};
	map["Saturn Fly-By"] = {
		telescope: {"Enceladus": 1, "Titan": 1},
		connections: {
			"Uranus Fly-By": {
				difficulty: 0,
				slingshot: "Uranus",
				saturn: true,
				slow: true,
				time: 5,
				solarRadiation: true,
			},
			"Saturn Orbit": {
				difficulty: 7,
				saturn: true,
				slow: true,
				time: 0,
				aerobrakingDifficulty: 1,
			},
			"Outer Planets Transfer": {
				difficulty: 3,
				slow: true,
				time: 3,
				solarRadiation: true
			},
			"Lost": {
				difficulty: 0,
				saturn: true,
				automatic: true
			}
		}
	};
	map["Saturn Orbit"] = {
		endYearHazard: "Saturn",
		connections: {
			"Enceladus": {
				difficulty: 2,
				slow: true,
				time: 0,
				landing: true,
				hazard: "Enceladus"
			},
			"Titan": {
				difficulty: 1,
				atmosphericEntry: true,
				hazard: "Titan"
			},
			"Titan Orbit": {
				difficulty: 2,
				slow: true,
				time: 0,
				aerobrakingDifficulty: 1
			},
			"Saturn Fly-By": {
				difficulty: 7,
				slow: true,
				time: 0,
				hazard: "Saturn", /* RULES: timing exception? */
			}
		}
	};
	map["Titan"] = {
		hazard: "Titan",
		connections: {
			"Titan Orbit": {
				difficulty: 2
			}
		}
	};
	map["Titan Orbit"] = {
		connections: {
			"Saturn Orbit": {
				difficulty: 2,
				slow: true,
				time: 0
			},
			"Titan": {
				difficulty: 0,
				landingOptional: true,
				hazard: "Titan"
			}
		}
	};
	map["Uranus Fly-By"] = {
		connections: {
			"Neptune Fly-By": {
				difficulty: 0,
				slingshot: "Neptune",
				uranus: true,
				slow: true,
				time: 4,
				solarRadiation: true
			},
			"Outer Planets Transfer": {
				difficulty: 4,
				slow: true,
				time: 9,
				solarRadiation: true
			},
			"Lost": {
				difficulty: 0,
				uranus: true,
				automatic: true
			}
		}
	};
	map["Venus Fly-By"].connections["Jupiter Fly-By"] = {
		difficulty: 1,
		slingshot: "Jupiter",
		slow: true,
		time: 1,
		solarRadiation: true
	};
	map["Venus Fly-By"].connections["Venus Orbit"].aerobrakingDifficulty = 0;
	
	map["Ceres"].connections["Outer Planets Transfer"] = {
		difficulty: 3,
		slow: true,
		time: 1,
		solarRadiation: true,
	};
	map["Earth Orbit"].connections["Outer Planets Transfer"] = {
		difficulty: 6,
		slow: true,
		time: 1,
		solarRadiation: true
	};
	map["Venus Orbit"].connections["Outer Planets Transfer"] = {
		difficulty: 9,
		slow: true,
		time: 1,
		solarRadiation: true
	};
	map["Mars Orbit"].connections["Outer Planets Transfer"] = {
		difficulty: 5,
		slow: true,
		time: 1,
		solarRadiation: true
	};
}
if(z.stations){
	map["Mars Cycler"] = {
		connections: {
			"Mars Orbit": {
				difficulty: 3,
				slow: true,
				time: 0
			},
			"Mars": {
				difficulty: 3,
				atmosphericEntry: true,
				landing: true,
				hazard: "Mars"
			},
			"Earth Cycler": {
				difficulty: 0,
				slow: true,
				time: 3,
				solarRadiation: true,
				automatic: true
			}
		}
	};
	map["Earth Cycler"] = {
		connections: {
			"Earth Orbit": {
				difficulty: 3,
				slow: true,
				time: 0
			},
			"Mars Cycler": {
				difficulty: 3,
				slow: true,
				time: 3,
				solarRadiation: true,
				automatic: true
			}
			
		}
	};
	map["Earth Orbit"].connections["Earth Cycler"] = {
		difficulty: 3,
		slow: true,
		time: 0
	};
	map["Mars Orbit"].connections["Mars Cycler"] = {
		difficulty: 3,
		slow: true,
		time: 0
	};
	map["Inner Planets Transfer"].connections["Mars Fly-By"] = {
		difficulty: 1,
		slow: true,
		time: 2,
		solarRadiation: true		
	};
	map["Mars Fly-By"].connections["Inner Planets Transfer"] = {
		difficulty: 1,
		slow: true,
		time: 2,
		solarRadiation: true
	};
	map["Venus Fly-By"].connections["Inner Planets Transfer"] = {
		difficulty: 1,
		slow: true,
		time: 3,
		solarRadiation: true
	};
	if(z.outer){
		map["Mars Cycler"].connections["Mars Orbit"].aerobrakingDifficulty = 0;
		map["Earth Cycler"].connections["Earth Orbit"].aerobrakingDifficulty = 0;
	}
	
}

}

function slingshotAvailable(slingshot,year){
	if(year === undefined){
		year = z.year;
	}
	switch(slingshot){
		case "Jupiter":
			return (year % 2) === 0;
		case "Saturn":
			return (year % 3) === 1;
		case "Uranus":
			return (year % 5) === 2;
		case "Neptune":
			return (year % 6) === 2;
	}
}

function missionAvailable(mission){
	return mission in z.missions && z.missions[mission].claimed === -1;
}


function completeStartYearMission(mission,completed){
	let multiple = false;
	if(mission in z.missions && z.missions[mission].claimed === -1 && ((mission + " +1.5" in z.missions && z.missions[mission+" +1.5"].claimed === -1) || 
																	   (mission + " +2" in z.missions && z.missions[mission+" +2"].claimed === -1) ||
																	   (mission + " +2.5" in z.missions && z.missions[mission+" +2.5"].claimed === -1))){
		multiple = true;
	} else if(!(mission in z.missions) || z.missions[mission].claimed !== -1){
		if(mission + " +1.5" in z.missions && z.missions[mission+" +1.5"].claimed === -1){
			mission += " +1.5";
		} else if(mission + " +2" in z.missions && z.missions[mission+" +2"].claimed === -1){
			mission += " +2";
		} else if(mission + " +2.6" in z.missions && z.missions[mission+" +2.5"].claimed === -1){
			mission += " +2.5";
		} else {
			return true;
		}
	}
	if(completed.length === 0){
		return true;
	}
	if(completed.length === 1){
		if(!multiple){
			completeMission(mission,z.countries[completed[0]]);
			return true;
		} else {
			plainAlert(z.countries[completed[0]]+" completes "+mission+", and must choose which one to claim.");
			addOption(completed[0],"Claim a Start-of-Year Mission",mission,true);
			z.turn = completed[0];
			return false;
		}
	}
	let leastPoints = 1000;
	let tied = [];
	completed.forEach((country)=>{
		/* RULES: this */
		let points = z.points[country] + 2 * z.memorialWall[country].length;
		if(z.stations){
			points = z.points[country] +z.pointTokens[country]+ z.memorialWall[country].length * (z.memorialWall[country].length + 1);
		}
		if(leastPoints > points){
			tied = [country];
			leastPoints = points;
		} else if (leastPoints === points){
			tied.push(country);
		}
	});
	if(!multiple){
		if(tied.length === 1){
			plainAlert("Multiple agencies completed "+mission+" at the same time, but "+z.countries[tied[0]]+" is awarded it because they have the fewest points.");
		} else {
			shuffle(tied);
			plainAlert("Multiple agencies completed "+mission+" at the same time, and multiple agencies were tied for fewest points.\n"+
					   "Of those agencies, "+z.countries[tied[0]]+" is randomly awarded it.");
		}
		completeMission(mission,z.countries[tied[0]]);
		return true;
	} else {
		if(tied.length === 1){
			plainAlert("Multiple agencies completed "+mission+" at the same time; "+z.countries[tied[0]]+" completes it first as they have the fewest points, and must choose which one to claim.");
			addOption(tied[0],"Claim a Start-of-Year Mission",mission,true);
			z.turn = tied[0];
			return false;
		} else {
			shuffle(tied);
			plainAlert("Multiple countries completed "+mission+" at the same time, and at least two were tied for fewest points.\n"+
					   "Of those countries, "+z.countries[tied[0]]+" is randomly chosen to complete it first, and must choose which one to claim.");
			addOption(tied[0],"Claim a Start-of-Year Mission",mission,true);
			z.turn = tied[0];
			return false;	   
		}
	}
	
}

function startYear(){
	if(z.stations){
		z.production = stationsFullTurnOrder();
		productionCheck();
	} else {
		resetMoney();
	}	
}

function canProduceFuel(drawer){
	if(drawer !== undefined){
		if(!("Synthesis" in z.advancements[drawer])){
			return false;
		}
	}
	for(let j = 0; !(j>=z.spacecraft[z.turn].length); j++){
		if("Fuel Generator" in z.spacecraft[z.turn][j] && (z.spacecraft[z.turn][j].location === "Earth" || z.hazard[z.spacecraft[z.turn][j].location].includes("CO2"))){
			if(z.numPlayers > z.turn){
				return "Synthesis" in z.advancements[z.turn];
			} else {
				let shareholders = getShareholders(z.turn);
				for(let k = 0; !(k>=shareholders.length); k++){
					if("Synthesis" in z.advancements[k]){
						return true;
					}
				}
				return false;
			}
		}
	}
	if("Fuel Generator" in z.hq[z.turn]){
		if(z.numPlayers > z.turn){
			return "Synthesis" in z.advancements[z.turn];
		} else {
			let shareholders = getShareholders(z.turn);
			for(let k = 0; !(k>=shareholders.length); k++){
				if("Synthesis" in z.advancements[k]){
					return true;
				}
			}
			return false;
		}
	}
	return false;
}

function canProduceFood(drawer){
	if(drawer !== undefined){
		if(!("Synthesis" in z.advancements[drawer])){
			return false;
		}
	}
	for(let j = 0; !(j>=z.spacecraft[z.turn].length); j++){
		if("Hydroponics Module" in z.spacecraft[z.turn][j] && z.spacecraft[z.turn][j].numHealthyAstronauts() > 0){
			if(z.numPlayers > z.turn){
				return "Synthesis" in z.advancements[z.turn];
			} else {
				let shareholders = getShareholders(z.turn);
				for(let k = 0; !(k>=shareholders.length); k++){
					if("Synthesis" in z.advancements[k]){
						return true;
					}
				}
				return false;
			}
		}
	}
	if("Hydroponics Module" in z.hq[z.turn] && z.hq[z.turn].numHealthyAstronauts() > 0){
		if(z.numPlayers > z.turn){
			return "Synthesis" in z.advancements[z.turn];
		} else {
			let shareholders = getShareholders(z.turn);
			for(let k = 0; !(k>=shareholders.length); k++){
				if("Synthesis" in z.advancements[k]){
					return true;
				}
			}
			return false;
		}
	}
	return false;
}

function canProduceHabitat(){
	for(let j = 0; !(j>=z.spacecraft[z.turn].length); j++){
		if("Ground Habitat (parts)" in z.spacecraft[z.turn][j] && z.spacecraft[z.turn][j].hasMechanic()){
			switch(z.spacecraft[z.turn][j].location){
				case "Mercury":
				case "Venus":
				case "Earth":
				case "Moon":
				case "Mars":
				case "Phobos":
				case "Ceres":
				case "Io":
				case "Europa":
				case "Ganymede":
				case "Callisto":
				case "Titan":
				case "Enceladus":
					return true;
			}
		}
	}
	return false;
}

function canProduce(){
	return canProduceFood() || canProduceFuel() || canProduceHabitat();
}

function finishProduction(){
	for(let j = 0; !(j>=z.spacecraft[z.turn].length); j++){
		z.spacecraft[z.turn][j].untapProduction();
	}
	z.hq[z.turn].untapProduction();
	for(let j = 0; !(j>=z.numPlayers); j++){
		z.lastAdvancement[j] = null;
	}
	productionCheck();
}

function productionCheck(){
	if(z.production.length === 0){
		delete z.production;
		resetMoney();
		return;
	} 
	z.turn = z.production.shift();
	z.turnReal = z.turn;
	
	if(!canProduce()){
		productionCheck();
	} else {
		boldAlert(z.countries[z.turn]+" may now conduct start-of-year production.");
	}
}

function resetMoney(){
	for(let j = 0; !(j>=z.numPlayers); j++){
		z.money[j] = 25;
		if(z.stations){
			z.money[j] = 30;
		}
		z.lastAdvancement[j] = null;
	}
	occupationMission();
}

function occupationMission(){
	/* RULES: do occupation missions before actual missions */
	if(z.occupationMission){
		let loc = "";
		let points = 0;
		switch(z.occupationMission){
			case "Orbital Occupation":
				loc = "Earth Orbit";
				points = 0.5;
				break;
			case "Lunar Occupation":
				loc = "Moon";
				points = 1;
				break;
			case "Mars Occupation":
				loc = "Mars";
				points = 2;
				break;
			case "Venus Occupation":
				loc = "Venus";
				points = 2.5;
				break;
		}
		for(let j = 0; !(j>=z.spacecraft.length); j++){
			for(let k = 0; !(k>=z.spacecraft[j].length); k++){
				if(z.spacecraft[j][k].location === loc && z.spacecraft[j][k].numAstronauts() > 0){
					let alertText = z.countries[j] + " earns "+points+" point";
					if(points !== 1){
						alertText += "s";
					}
					boldAlert(alertText + " from "+z.occupationMission+".");
					z.pointTokens[j] += points;
				}
			}
		}
	}
	startYearMissions();
}

function startYearMissions(){
	/* TODO: ordering of this vs. Mars/Venus occupation */
	let mission = "Man in Space"; /* 2 */
	if(missionAvailable(mission)){  
		let completed = [];
		for(let j = z.spacecraft.length - 1; j>=0; j--){
			for(let k = z.spacecraft[j].length - 1; k>=0; k--){
				if(z.spacecraft[j][k].isHabitat() && z.spacecraft[j][k].hasVisited("Space",z.countries[j])){
					completed.push(j);
					break;
				}
			}
		}
		completeStartYearMission(mission,completed);
	}
	mission = "Human in Space"; /* 2 */
	if(missionAvailable(mission)){  
		let completed = [];
		for(let j = z.spacecraft.length - 1; j>=0; j--){
			for(let k = z.spacecraft[j].length - 1; k>=0; k--){
				if(z.spacecraft[j][k].isHabitat() && z.spacecraft[j][k].hasVisited("Space",z.countries[j])){
					completed.push(j);
					break;
				}
			}
		}
		completeStartYearMission(mission,completed);
	}
	mission = "Lunar Fly-By"; /* 3 */
	if(missionAvailable(mission)){
		let completed = [];
		for(let j = z.spacecraft.length - 1; j>=0; j--){
			for(let k = z.spacecraft[j].length - 1; k>=0; k--){
				if(z.spacecraft[j][k].timeTokens === 0 && (z.spacecraft[j][k].location === "Lunar Fly-By" || z.spacecraft[j][k].location === "Lunar Orbit")){
					completed.push(j);
					break;
				}
			}
		}
		completeStartYearMission(mission,completed);
	}
	let missions = ["Venus Fly-By","Mars Fly-By","Man in Orbit","Human in Orbit"]; /* 4 */
	shuffle(missions);
	while(missions.length > 0){
		let mission = missions.pop();
		if(mission === "Venus Fly-By" && missionAvailable(mission)){
			let completed = [];
			for(let j = z.spacecraft.length - 1; j>=0; j--){
				for(let k = z.spacecraft[j].length - 1; k>=0; k--){
					if(z.spacecraft[j][k].timeTokens === 0 && (z.spacecraft[j][k].location === "Venus Fly-By" || z.spacecraft[j][k].location === "Venus Orbit")){
						completed.push(j);
						break;
					}
				}
			}
			completeStartYearMission(mission,completed);
		} else if(mission === "Mars Fly-By" && missionAvailable(mission)){
			let completed = [];
			for(let j = z.spacecraft.length - 1; j>=0; j--){
				for(let k = z.spacecraft[j].length - 1; k>=0; k--){
					if(z.spacecraft[j][k].timeTokens === 0 && (z.spacecraft[j][k].location === "Mars Fly-By" || z.spacecraft[j][k].location === "Mars Orbit" || z.spacecraft[j][k].location === "Mars Cycler")){
						completed.push(j);
						break;
					}
				}
			}
			completeStartYearMission(mission,completed);
		} else if(mission === "Man in Orbit" && missionAvailable(mission)){
			let completed = [];
			for(let j = z.spacecraft.length - 1; j>=0; j--){
				for(let k = z.spacecraft[j].length - 1; k>=0; k--){
					if(z.spacecraft[j][k].isHabitat() && z.spacecraft[j][k].hasVisited("Earth Orbit",z.countries[j])){
						completed.push(j);
						break;
					}
				}
			}
			completeStartYearMission(mission,completed);
		} else if(mission === "Human in Orbit" && missionAvailable(mission)){
			let completed = [];
			for(let j = z.spacecraft.length - 1; j>=0; j--){
				for(let k = z.spacecraft[j].length - 1; k>=0; k--){
					if(z.spacecraft[j][k].isHabitat() && z.spacecraft[j][k].hasVisited("Earth Orbit",z.countries[j])){
						completed.push(j);
						break;
					}
				}
			}
			completeStartYearMission(mission,completed);
		}
	}
	/* RULES: are these start-of-year missions when you build a habitat */
	/* orbital habitat only if you're dumb enough to damage it in an optional landing, send it into space, repair it not in earth orbit, then send it back. */
	missions = ["Manned Lunar Fly-By","Orbital Habitat","Crewed Lunar Fly-By"];  /* 5 */
	shuffle(missions);
	while(missions.length > 0){
		let mission = missions.pop();
		if(!missionAvailable(mission)){
			continue;
		}
		
		if(mission === "Manned Lunar Fly-By"){
			let completed = [];
			for(let j = z.spacecraft.length - 1; j>=0; j--){
				for(let k = z.spacecraft[j].length - 1; k>=0; k--){
					if(z.spacecraft[j][k].isHabitat() && (z.spacecraft[j][k].hasVisited("Lunar Fly-By",z.countries[j]) || z.spacecraft[j][k].hasVisited("Lunar Orbit",z.countries[j]))){
						completed.push(j);
						break;
					}
				}
			}
			completeStartYearMission(mission,completed);
		} else if(mission === "Crewed Lunar Fly-By"){
			let completed = [];
			for(let j = z.spacecraft.length - 1; j>=0; j--){
				for(let k = z.spacecraft[j].length - 1; k>=0; k--){
					if(z.spacecraft[j][k].isHabitat() && (z.spacecraft[j][k].hasVisited("Lunar Fly-By",z.countries[j]) || z.spacecraft[j][k].hasVisited("Lunar Orbit",z.countries[j]))){
						completed.push(j);
						break;
					}
				}
			}
			completeStartYearMission(mission,completed);
		} else if(mission === "Orbital Habitat"){
			let completed = [];
			for(let j = z.spacecraft.length - 1; j>=0; j--){
				for(let k = z.spacecraft[j].length - 1; k>=0; k--){
					if("Space Habitat" in z.spacecraft[j][k] && z.spacecraft[j][k].location === "Earth Orbit" && z.spacecraft[j][k].timeTokens === 0){
						completed.push(j);
						break;
					}
				}
			}
			completeStartYearMission(mission,completed);
		}
	}
	
	/* Complete start of year missions */	
	missions = ["Space Station","Phobos Lander"]; /* 6 */
	shuffle(missions);
	while(missions.length > 0){
		let mission = missions.pop();
		/* RULES: time tokens are fine here? */
		if(missionAvailable(mission) && mission === "Space Station"){
			let completed = [];
			for(let j = z.spacecraft.length - 1; j>=0; j--){
				for(let k = z.spacecraft[j].length - 1; k>=0; k--){
					if(z.spacecraft[j][k].location !== "Earth" && z.spacecraft[j][k].isCrewed()){
						completed.push(j);
						break;
					}
				}
			}
			completeStartYearMission(mission,completed);
		}
		if(missionAvailable(mission) && mission === "Phobos Lander"){
			let completed = [];
			for(let j = z.spacecraft.length-1; j>=0; j--){
				for(let k = z.spacecraft[j].length-1; k>=0; k--){
					if(z.spacecraft[j][k].location === "Phobos" && z.spacecraft[j][k].timeTokens === 0 && z.spacecraft[j][k].workingProbesCapsules() > 0){
						completed.push(j);
						break;
					}
				}
			}
			completeStartYearMission(mission,completed);
		}
	}
	mission = "Ceres Lander"; /* 8 */
	if(missionAvailable(mission)){
		let completed = [];
		for(let j = z.spacecraft.length-1; j>=0; j--){
			for(let k = z.spacecraft[j].length-1; k>=0; k--){
				if(z.spacecraft[j][k].location === "Ceres" && z.spacecraft[j][k].timeTokens === 0 && z.spacecraft[j][k].workingProbesCapsules() > 0){
					completed.push(j);
					break;
				}
			}
		}
		completeStartYearMission(mission,completed);
	}
	missions = ["Jupiter Orbiter","Lunar Habitat"]; /* 9 */
	shuffle(missions);
	while(missions.length > 0){
		let mission = missions.pop();
		if(!missionAvailable(mission)){
			continue;
		}
		if(mission === "Jupiter Orbiter"){
			let completed = [];
			for(let j = z.spacecraft.length-1; j>=0; j--){
				for(let k = z.spacecraft[j].length-1; k>=0; k--){
					if(z.spacecraft[j][k].location === "Jupiter Orbit" && z.spacecraft[j][k].timeTokens === 0 && z.spacecraft[j][k].workingProbesCapsules() > 0){
						completed.push(j);
						break;
					}
				}
			}
			completeStartYearMission(mission,completed);
		} else {
			let completed = [];
			for(let j = z.spacecraft.length-1; j>=0; j--){
				for(let k = z.spacecraft[j].length-1; k>=0; k--){
					if("Ground Habitat" in z.spacecraft[j][k] && z.spacecraft[j][k].location === "Moon"){
						completed.push(j);
						break;
					}
				}
			}
			completeStartYearMission(mission,completed);
		}
	}
	missions = ["Enceladus Lander","Io Lander","Man on the Moon","Manned Mars Fly-By","Human on the Moon","Crewed Mars Fly-By"]; /* 12 */
	shuffle(missions);
	while(missions.length > 0){
		let mission = missions.pop();
		if(!missionAvailable(mission)){
			continue;
		}
		if(mission === "Enceladus Lander"){
			let completed = [];
			for(let j = z.spacecraft.length-1; j>=0; j--){
				for(let k = z.spacecraft[j].length-1; k>=0; k--){
					if(z.spacecraft[j][k].location === "Enceladus" && z.spacecraft[j][k].timeTokens === 0 && z.spacecraft[j][k].workingProbesCapsules() > 0){
						completed.push(j);
						break;
					}
				}
			}
			completeStartYearMission(mission,completed);
		} else if(mission === "Io Lander"){
			let completed = [];
			for(let j = z.spacecraft.length-1; j>=0; j--){
				for(let k = z.spacecraft[j].length-1; k>=0; k--){
					if(z.spacecraft[j][k].location === "Io" && z.spacecraft[j][k].timeTokens === 0 && z.spacecraft[j][k].workingProbesCapsules() > 0){
						completed.push(j);
						break;
					}
				}
			}
			completeStartYearMission(mission,completed);
		} else if(mission === "Manned Mars Fly-By"){
			let completed = [];
			for(let j = z.spacecraft.length - 1; j>=0; j--){
				for(let k = z.spacecraft[j].length - 1; k>=0; k--){
					if(z.spacecraft[j][k].isHabitat() && (z.spacecraft[j][k].hasVisited("Mars Fly-By",z.countries[j]) || z.spacecraft[j][k].hasVisited("Mars Orbit",z.countries[j]) || 
																  z.spacecraft[j][k].hasVisited("Mars Cycler",z.countries[j])) ){
						completed.push(j);
						break;
					}
				}
			}
			completeStartYearMission(mission,completed);
		} else if(mission === "Crewed Mars Fly-By"){
			let completed = [];
			for(let j = z.spacecraft.length - 1; j>=0; j--){
				for(let k = z.spacecraft[j].length - 1; k>=0; k--){
					if(z.spacecraft[j][k].isHabitat() && (z.spacecraft[j][k].hasVisited("Mars Fly-By",z.countries[j]) || z.spacecraft[j][k].hasVisited("Mars Orbit",z.countries[j]) || 
																  z.spacecraft[j][k].hasVisited("Mars Cycler",z.countries[j])) ){
						completed.push(j);
						break;
					}
				}
			}
			completeStartYearMission(mission,completed);
		} else if(mission === "Man on the Moon") {
			let completed = [];
			for(let j = z.spacecraft.length - 1; j>=0; j--){
				if(j >= z.numPlayers && "Man on the Moon +1.5" in z.missions && z.missions["Man on the Moon +1.5"].claimed !== -1){
					continue;
				}
				if("Man on the Moon +1.5" in z.missions && z.missions["Man on the Moon +1.5"].claimed === j){
					continue;
				}
				for(let k = z.spacecraft[j].length - 1; k>=0; k--){
					if("Ground Habitat" in z.spacecraft[j][k] && z.spacecraft[j][k].hasVisited("Moon",z.countries[j])){
						completed.push(j);
						break;
					}
				}
			}
			let done = completeStartYearMission(mission,completed);
			if(!done){
				return;
			}
		} else if(mission === "Human on the Moon") {
			let completed = [];
			for(let j = z.spacecraft.length - 1; j>=0; j--){
				if(j >= z.numPlayers && "Human on the Moon +1.5" in z.missions && z.missions["Human on the Moon +1.5"].claimed !== -1){
					continue;
				}
				if("Human on the Moon +1.5" in z.missions && z.missions["Human on the Moon +1.5"].claimed === j){
					continue;
				}
				for(let k = z.spacecraft[j].length - 1; k>=0; k--){
					if("Ground Habitat" in z.spacecraft[j][k] && z.spacecraft[j][k].hasVisited("Moon",z.countries[j])){
						completed.push(j);
						break;
					}
				}
			}
			let done = completeStartYearMission(mission,completed);
			if(!done){
				return;
			}
		}
	}
	mission = "Saturn Orbiter"; /* 13 */
	if(missionAvailable(mission)){
		let completed = [];
		for(let j = z.spacecraft.length-1; j>=0; j--){
			for(let k = z.spacecraft[j].length-1; k>=0; k--){
				if(z.spacecraft[j][k].location === "Saturn Orbit" && z.spacecraft[j][k].timeTokens === 0 && z.spacecraft[j][k].workingProbesCapsules() > 0){
					completed.push(j);
					break;
				}
			}
		}
		completeStartYearMission(mission,completed);
	}
	mission = "Man on the Moon +1.5"; /* 13.5 */
	if(missionAvailable(mission)){
		let completed = [];
		for(let j = z.spacecraft.length - 1; j>=0; j--){
			if(j >= z.numPlayers && "Man on the Moon" in z.missions && z.missions["Man on the Moon"].claimed !== -1){
				continue;
			}
			if("Man on the Moon" in z.missions && z.missions["Man on the Moon"].claimed === j){
				continue;
			}
			for(let k = z.spacecraft[j].length - 1; k>=0; k--){
				if("Ground Habitat" in z.spacecraft[j][k] && z.spacecraft[j][k].hasVisited("Moon",z.countries[j])){
					completed.push(j);
					break;
				}
			}
		}
		completeStartYearMission(mission,completed);
	}
	mission = "Human on the Moon +1.5"; /* 13.5 */
	if(missionAvailable(mission)){
		let completed = [];
		for(let j = z.spacecraft.length - 1; j>=0; j--){
			if(j >= z.numPlayers && "Human on the Moon" in z.missions && z.missions["Human on the Moon"].claimed !== -1){
				continue;
			}
			if("Human on the Moon" in z.missions && z.missions["Human on the Moon"].claimed === j){
				continue;
			}
			for(let k = z.spacecraft[j].length - 1; k>=0; k--){
				if("Ground Habitat" in z.spacecraft[j][k] && z.spacecraft[j][k].hasVisited("Moon",z.countries[j])){
					completed.push(j);
					break;
				}
			}
		}
		completeStartYearMission(mission,completed);
	}
	missions = ["Europa Lander","Mars Habitat","Mars Orbit Habitat","Manned Venus Fly-By","Crewed Venus Fly-By"]; /* 14 */
	shuffle(missions);
	while(missions.length > 0){
		let mission = missions.pop();
		if(!missionAvailable(mission)){
			continue;
		}
		if(mission === "Europa Lander"){
			let completed = [];
			for(let j = z.spacecraft.length-1; j>=0; j--){
				for(let k = z.spacecraft[j].length-1; k>=0; k--){
					if(z.spacecraft[j][k].location === "Europa" && z.spacecraft[j][k].timeTokens === 0 && z.spacecraft[j][k].workingProbesCapsules() > 0){
						completed.push(j);
						break;
					}
				}
			}
			completeStartYearMission(mission,completed);
		} else if(mission === "Mars Habitat"){
			let completed = [];
			for(let j = z.spacecraft.length-1; j>=0; j--){
				for(let k = z.spacecraft[j].length-1; k>=0; k--){
					if("Ground Habitat" in z.spacecraft[j][k] && z.spacecraft[j][k].location === "Mars"){
						completed.push(j);
						break;
					}
				}
			}
			completeStartYearMission(mission,completed);
		} else if(mission === "Mars Orbit Habitat"){
			let completed = [];
			for(let j = z.spacecraft.length-1; j>=0; j--){
				for(let k = z.spacecraft[j].length-1; k>=0; k--){
					if("Space Habitat" in z.spacecraft[j][k] && z.spacecraft[j][k].location === "Mars Orbit" && z.spacecraft[j][k].timeTokens === 0){
						completed.push(j);
						break;
					}
				}
			}
			completeStartYearMission(mission,completed);
		} else if(mission === "Manned Venus Fly-By"){
			let completed = [];
			for(let j = z.spacecraft.length - 1; j>=0; j--){
				for(let k = z.spacecraft[j].length - 1; k>=0; k--){
					if(z.spacecraft[j][k].isHabitat() && (z.spacecraft[j][k].hasVisited("Venus Fly-By",z.countries[j]) || z.spacecraft[j][k].hasVisited("Venus Orbit",z.countries[j])) ){
						completed.push(j);
						break;
					}
				}
			}
			completeStartYearMission(mission,completed);
		} else if(mission === "Crewed Venus Fly-By"){
			let completed = [];
			for(let j = z.spacecraft.length - 1; j>=0; j--){
				for(let k = z.spacecraft[j].length - 1; k>=0; k--){
					if(z.spacecraft[j][k].isHabitat() && (z.spacecraft[j][k].hasVisited("Venus Fly-By",z.countries[j]) || z.spacecraft[j][k].hasVisited("Venus Orbit",z.countries[j])) ){
						completed.push(j);
						break;
					}
				}
			}
			completeStartYearMission(mission,completed);
		}
	}

	missions = ["Callisto Lander","Lunar Station"]; /* 15 */
	shuffle(missions);
	while(missions.length > 0){
		let mission = missions.pop();
		if(!missionAvailable(mission)){
			continue;
		}
		if(mission === "Callisto Lander"){
			let completed = [];
			for(let j = z.spacecraft.length-1; j>=0; j--){
				for(let k = z.spacecraft[j].length-1; k>=0; k--){
					if(z.spacecraft[j][k].location === "Callisto" && z.spacecraft[j][k].timeTokens === 0 && z.spacecraft[j][k].workingProbesCapsules() > 0){
						completed.push(j);
						break;
					}
				}
			}
			completeStartYearMission(mission,completed);
		} else if(mission === "Lunar Station") {
			let completed = [];
			for(let j = z.spacecraft.length-1; j>=0; j--){
				if(j >= z.numPlayers && "Lunar Station +1.5" in z.missions && z.missions["Lunar Station +1.5"].claimed !== -1){
					continue;
				}
				if("Lunar Station +1.5" in z.missions && z.missions["Lunar Station +1.5"].claimed === j){
					continue;
				}
				for(let k = z.spacecraft[j].length-1; k>=0; k--){
					if(z.spacecraft[j][k].location === "Moon" && z.spacecraft[j][k].isCrewed()){
						completed.push(j);
						break;
					}
				}
			}
			completeStartYearMission(mission,completed);
		}
	}
	mission = "Lunar Station +1.5"; /* 16.5 */
	if(missionAvailable(mission)){
		let completed = [];
		for(let j = z.spacecraft.length-1; j>=0; j--){
			if(j >= z.numPlayers && "Lunar Station" in z.missions && z.missions["Lunar Station"].claimed !== -1){
				continue;
			}
			if("Lunar Station" in z.missions && z.missions["Lunar Station"].claimed === j){
				continue;
			}
			for(let k = z.spacecraft[j].length - 1; k>=0; k--){
				if(z.spacecraft[j][k].location === "Moon" && z.spacecraft[j][k].numAstronauts() > 0){
					completed.push(j);
					break;
				}
			}
		}
		completeStartYearMission(mission,completed);
	}
	missions = ["Venus Habitat","Man on Phobos","Human on Phobos"]; /* 17 */
	shuffle(missions);
	while(missions.length > 0){
		let mission = missions.pop();
		if(!missionAvailable(mission)){
			continue;
		}
		if(mission === "Venus Habitat"){
			let completed = [];
			for(let j = z.spacecraft.length-1; j>=0; j--){
				for(let k = z.spacecraft[j].length-1; k>=0; k--){
					if("Ground Habitat" in z.spacecraft[j][k] && z.spacecraft[j][k].location === "Venus" ){
						completed.push(j);
						break;
					}
				}
			}
			completeStartYearMission(mission,completed);
		} else if(mission === "Man on Phobos") {
			let completed = [];
			for(let j = z.spacecraft.length - 1; j>=0; j--){
				for(let k = z.spacecraft[j].length - 1; k>=0; k--){
					if(z.spacecraft[j][k].isHabitat() && z.spacecraft[j][k].hasVisited("Phobos",z.countries[j])){
						completed.push(j);
						break;
					}
				}
			}
			completeStartYearMission(mission,completed);
		} else if(mission === "Human on Phobos") {
			let completed = [];
			for(let j = z.spacecraft.length - 1; j>=0; j--){
				for(let k = z.spacecraft[j].length - 1; k>=0; k--){
					if(z.spacecraft[j][k].isHabitat() && z.spacecraft[j][k].hasVisited("Phobos",z.countries[j])){
						completed.push(j);
						break;
					}
				}
			}
			completeStartYearMission(mission,completed);
		}
	}
	/* RULES: handling of this */
	mission = "Mars Station"; /* 20 */
	if(missionAvailable(mission)){
		let completed = [];
		for(let j = z.spacecraft.length-1; j>=0; j--){
			if(j >= z.numPlayers && "Mars Station +2" in z.missions && z.missions["Mars Station +2"].claimed !== -1){
				continue;
			}
			if("Mars Station +2" in z.missions && z.missions["Mars Station +2"].claimed === j){
				continue;
			}
			for(let k = z.spacecraft[j].length - 1; k>=0; k--){
				if(z.spacecraft[j][k].location === "Mars" && z.spacecraft[j][k].numAstronauts() > 0){
					completed.push(j);
					break;
				}
			}
		}
		let done = completeStartYearMission(mission,completed);
		if(!done){
			return;
		}
	}
	
	mission = "Man on Ceres"; /* 21 */
	if(missionAvailable[mission]){
		let completed = [];
		for(let j = z.spacecraft.length-1; j>=0; j--){
			for(let k = z.spacecraft[j].length-1; k>=0; k--){
				if(z.spacecraft[j][k].isHabitat() && z.spacecraft[j][k].hasVisited("Ceres",z.countries[j])){
					completed.push(j);
					break;
				}
			}
		}
		completeStartYearMission(mission,completed);
	}
	mission = "Human on Ceres"; /* 21 */
	if(missionAvailable[mission]){
		let completed = [];
		for(let j = z.spacecraft.length-1; j>=0; j--){
			for(let k = z.spacecraft[j].length-1; k>=0; k--){
				if(z.spacecraft[j][k].isHabitat() && z.spacecraft[j][k].hasVisited("Ceres",z.countries[j])){
					completed.push(j);
					break;
				}
			}
		}
		completeStartYearMission(mission,completed);
	}
	mission = "Mars Station +2"; /* 22 */
	if(missionAvailable(mission)){
		let completed = [];
		for(let j = z.spacecraft.length-1; j>=0; j--){
			if(j >= z.numPlayers && "Mars Station" in z.missions && z.missions["Mars Station"].claimed !== -1){
				continue;
			}
			if("Mars Station" in z.missions && z.missions["Mars Station"].claimed === j){
				continue;
			}
			for(let k = z.spacecraft[j].length - 1; k>=0; k--){
				if(z.spacecraft[j][k].location === "Mars" && z.spacecraft[j][k].numAstronauts() > 0){
					completed.push(j);
					break;
				}
			}
		}
		completeStartYearMission(mission,completed);
	}
	mission = "Man on Mars"; /* 24 */
	if(missionAvailable(mission)){
		let completed = [];
		for(let j = z.spacecraft.length-1; j>=0; j--){
			if(j >= z.numPlayers && "Man on Mars +2.5" in z.missions && z.missions["Man on Mars +2.5"].claimed !== -1){
				continue;
			}
			if("Man on Mars +2.5" in z.missions && z.missions["Man on Mars +2.5"].claimed === j){
				continue;
			}
			for(let k = z.spacecraft[j].length - 1; k>=0; k--){
				if("Ground Habitat" in z.spacecraft[j][k] && z.spacecraft[j][k].hasVisited("Mars",z.countries[j])){
					completed.push(j);
					break;
				}
			}
		}
		let done = completeStartYearMission(mission,completed);
		if(!done){
			return;
		}
	}
	mission = "Human on Mars"; /* 24 */
	if(missionAvailable(mission)){
		let completed = [];
		for(let j = z.spacecraft.length-1; j>=0; j--){
			if(j >= z.numPlayers && "Human on Mars +2.5" in z.missions && z.missions["Human on Mars +2.5"].claimed !== -1){
				continue;
			}
			if("Human on Mars +2.5" in z.missions && z.missions["Human on Mars +2.5"].claimed === j){
				continue;
			}
			for(let k = z.spacecraft[j].length - 1; k>=0; k--){
				if("Ground Habitat" in z.spacecraft[j][k] && z.spacecraft[j][k].hasVisited("Mars",z.countries[j])){
					completed.push(j);
					break;
				}
			}
		}
		let done = completeStartYearMission(mission,completed);
		if(!done){
			return;
		}
	}
	/* RULES: no time tokens here? */
	mission = "Jupiter Station";  /* 25 */
	if(missionAvailable(mission)){
		let completed = [];
		for(let j = z.spacecraft.length-1; j>=0; j--){
			for(let k = z.spacecraft[j].length-1; k>=0; k--){
				if(z.spacecraft[j][k].isCrewed() && z.spacecraft[j][k].timeTokens === 0){
					let foundIt = false;
					switch(z.spacecraft[j][k].location){
						case "Jupiter Orbit":
						case "Io":
						case "Europa":
						case "Callisto":
						case "Ganymede":
						case "Ganymede Orbit":
							completed.push(j);
							foundIt = true;
							break;
					}
					if(foundIt){
						break;
					}
				}
			}
		}
		completeStartYearMission(mission,completed);
	}
	mission = "Manned Jupiter Fly-By"; /* 25; mutually exclusive with Jupiter Station */
	if(missionAvailable(mission)){
		let completed = [];
		for(let j = z.spacecraft.length-1; j>=0; j--){
			for(let k = z.spacecraft[j].length-1; k>=0; k--){
				if(z.spacecraft[j][k].isHabitat() && z.spacecraft[j][k].hasVisited("Jupiter Fly-By",z.countries[j])){
					completed.push(j);
					break;
				}
			}
		}
		completeStartYearMission(mission,completed);
	}
	mission = "Crewed Jupiter Fly-By"; /* 25; mutually exclusive with Jupiter Station */
	if(missionAvailable(mission)){
		let completed = [];
		for(let j = z.spacecraft.length-1; j>=0; j--){
			for(let k = z.spacecraft[j].length-1; k>=0; k--){
				if(z.spacecraft[j][k].isHabitat() && z.spacecraft[j][k].hasVisited("Jupiter Fly-By",z.countries[j])){
					completed.push(j);
					break;
				}
			}
		}
		completeStartYearMission(mission,completed);
	}
	mission = "Man on Mars +2.5"; /* 26.5 */
	if(missionAvailable(mission)){
		let completed = [];
		for(let j = z.spacecraft.length-1; j>=0; j--){
			if(j >= z.numPlayers && "Man on Mars" in z.missions && z.missions["Man on Mars"].claimed !== -1){
				continue;
			}
			if("Man on Mars" in z.missions && z.missions["Man on Mars"].claimed === j){
				continue;
			}
			for(let k = z.spacecraft[j].length - 1; k>=0; k--){
				if("Ground Habitat" in z.spacecraft[j][k] && z.spacecraft[j][k].hasVisited("Mars",z.countries[j])){
					completed.push(j);
					break;
				}
			}
		}
		completeStartYearMission(mission,completed);
	}
	mission = "Human on Mars +2.5"; /* 26.5 */
	if(missionAvailable(mission)){
		let completed = [];
		for(let j = z.spacecraft.length-1; j>=0; j--){
			if(j >= z.numPlayers && "Human on Mars" in z.missions && z.missions["Human on Mars"].claimed !== -1){
				continue;
			}
			if("Human on Mars" in z.missions && z.missions["Human on Mars"].claimed === j){
				continue;
			}
			for(let k = z.spacecraft[j].length - 1; k>=0; k--){
				if("Ground Habitat" in z.spacecraft[j][k] && z.spacecraft[j][k].hasVisited("Mars",z.countries[j])){
					completed.push(j);
					break;
				}
			}
		}
		completeStartYearMission(mission,completed);
	}
	mission = "Venus Station"; /* 27 */
	if(missionAvailable(mission)){
		let completed = [];
		for(let j = z.spacecraft.length-1; j>=0; j--){
			for(let k = z.spacecraft[j].length-1; k>=0; k--){
				if(z.spacecraft[j][k].location === "Venus" && z.spacecraft[j][k].isCrewed()){
					completed.push(j);
					break;
				}
			}
		}
		completeStartYearMission(mission,completed);
	}
	missions = ["Man on Mercury","Saturn Station","Human on Mercury"]; /* 30 */
	shuffle(missions);
	while(missions.length > 0){
		let mission = missions.pop();
		if(!missionAvailable(mission)){
			continue;
		}
		if(mission === "Man on Mercury"){
			let completed = [];
			for(let j = z.spacecraft.length-1; j>=0; j--){
				for(let k = z.spacecraft[j].length - 1; k>=0; k--){
					if("Ground Habitat" in z.spacecraft[j][k] && z.spacecraft[j][k].hasVisited("Mercury",z.countries[j])){
						completed.push(j);
						break;
					}
				}
			}
			completeStartYearMission(mission,completed);	
		} else if(mission === "Human on Mercury"){
			let completed = [];
			for(let j = z.spacecraft.length-1; j>=0; j--){
				for(let k = z.spacecraft[j].length - 1; k>=0; k--){
					if("Ground Habitat" in z.spacecraft[j][k] && z.spacecraft[j][k].hasVisited("Mercury",z.countries[j])){
						completed.push(j);
						break;
					}
				}
			}
			completeStartYearMission(mission,completed);	
		} else if(mission === "Saturn Station"){
			let completed = [];
			for(let j = z.spacecraft.length-1; j>=0; j--){
				for(let k = z.spacecraft[j].length-1; k>=0; k--){
					if(z.spacecraft[j][k].isCrewed() && z.spacecraft[j][k].timeTokens === 0){
						let foundIt = false;
						switch(z.spacecraft[j][k].location){
							case "Saturn Orbit":
							case "Titan":
							case "Enceladus":
							case "Titan Orbit":
								completed.push(j);
								foundIt = true;
								break;
						}
						if(foundIt){
							break;
						}
					}
				}
			}
			completeStartYearMission(mission,completed);
		}
	}

	mission = "Man on Venus"; /* 32 */
	if(missionAvailable(mission)){
		let completed = [];
		for(let j = z.spacecraft.length-1; j>=0; j--){
			for(let k = z.spacecraft[j].length - 1; k>=0; k--){
				if("Ground Habitat" in z.spacecraft[j][k] && z.spacecraft[j][k].hasVisited("Venus",z.countries[j])){
					completed.push(j);
					break;
				}
			}
		}
		completeStartYearMission(mission,completed);
	}
	mission = "Human on Venus"; /* 32 */
	if(missionAvailable(mission)){
		let completed = [];
		for(let j = z.spacecraft.length-1; j>=0; j--){
			for(let k = z.spacecraft[j].length - 1; k>=0; k--){
				if("Ground Habitat" in z.spacecraft[j][k] && z.spacecraft[j][k].hasVisited("Venus",z.countries[j])){
					completed.push(j);
					break;
				}
			}
		}
		completeStartYearMission(mission,completed);
	}
	mission = "Manned Saturn Fly-By"; /* 35 */
	if(missionAvailable(mission)){
		let completed = [];
		for(let j = z.spacecraft.length-1; j>=0; j--){
			for(let k = z.spacecraft[j].length-1; k>=0; k--){
				if(z.spacecraft[j][k].isHabitat() && z.spacecraft[j][k].hasVisited("Saturn Fly-By",z.countries[j])){
					completed.push(j);
					break;
				}
			}
		}
		completeStartYearMission(mission,completed);
	}
	mission = "Crewed Saturn Fly-By"; /* 35 */
	if(missionAvailable(mission)){
		let completed = [];
		for(let j = z.spacecraft.length-1; j>=0; j--){
			for(let k = z.spacecraft[j].length-1; k>=0; k--){
				if(z.spacecraft[j][k].isHabitat() && z.spacecraft[j][k].hasVisited("Saturn Fly-By",z.countries[j])){
					completed.push(j);
					break;
				}
			}
		}
		completeStartYearMission(mission,completed);
	}
	mission = "Man on Titan"; /* 42 */
	if(missionAvailable(mission)){
		let completed = [];
		for(let j = z.spacecraft.length-1; j>=0; j--){
			for(let k = z.spacecraft[j].length - 1; k>=0; k--){
				if("Ground Habitat" in z.spacecraft[j][k] && z.spacecraft[j][k].hasVisited("Venus",z.countries[j])){
					completed.push(j);
					break;
				}
			}
		}
		completeStartYearMission(mission,completed);
	}
	mission = "Human on Titan"; /* 42 */
	if(missionAvailable(mission)){
		let completed = [];
		for(let j = z.spacecraft.length-1; j>=0; j--){
			for(let k = z.spacecraft[j].length - 1; k>=0; k--){
				if("Ground Habitat" in z.spacecraft[j][k] && z.spacecraft[j][k].hasVisited("Venus",z.countries[j])){
					completed.push(j);
					break;
				}
			}
		}
		completeStartYearMission(mission,completed);
	}
	if(z.vCompleteOrdering){
		/* TODO: worry about floating point arithmetic */
		let modifiedPoints = [];
		for(let j = 0; !(j>=z.numPlayers); j++){
			let points = z.points[j] + 2 * z.memorialWall[j].length;
			if(z.stations){
				points = z.points[j] + z.pointTokens[j] + z.memorialWall[j].length * (z.memorialWall[j].length + 1);
			}
			modifiedPoints.push([j,points]);
		}
		z.turnOrder = [];
		while(modifiedPoints.length > 0){
			let leastPoints = 1000000;
			let tiedIndices = [];
			let tiedCountries = [];
			for(let j = modifiedPoints.length -1; j>=0; j--){
				let points = modifiedPoints[j][1];
				if(leastPoints > points){
					tiedIndices = [j];
					tiedCountries = [modifiedPoints[j][0]];
					leastPoints = points;
				} else if (leastPoints === points){
					tiedIndices.push(j);
					tiedCountries.push(modifiedPoints[j][0]);
				}
			}
			shuffle(tiedCountries);
			for(let j = modifiedPoints.length - 1; j>=0; j--){
				if(tiedIndices.includes(j)){
					modifiedPoints.splice(j,1);
				}
			}
			while(tiedCountries.length > 0){
				z.turnOrder.push(tiedCountries.shift());
			}
		}
		let alertText = "This year's turn order is:";
		z.turnOrder.forEach((country,j)=>{
			alertText += "\n"+(j+1)+": "+z.countries[country];
		});
		plainAlert(alertText);
		z.turn = z.turnOrder[0];
	} else {
		let leastPoints = 1000;
		let tied = [];
		for(let j = z.numPlayers-1; j>=0; j--){
			let points = z.points[j] + 2 * z.memorialWall[j].length;
			if(z.stations){
				points = z.points[j] + z.memorialWall[j].length * (z.memorialWall[j].length + 1);
			}
			if(leastPoints > points){
				tied = [j];
				leastPoints = points;
			} else if (leastPoints === points){
				tied.push(j);
			}
		}
		if(tied.length === 1){
			plainAlert("This year's start player is "+z.countries[tied[0]]+".");
		} else {
			shuffle(tied);
			plainAlert("Multiple countries are tied for fewest ponts; of those countries, "+z.countries[tied[0]]+" is randomly awarded first player this year.");
		}
		z.turnOrder = [];
		for(let k = 0; !(k>=z.numPlayers); k++){
			z.turnOrder.push((tied[0] + k) % z.numPlayers);
		}
		z.turn = tied[0];
	}
	z.gameOver = endGameCheck();
	z.turnNumber = 0;
	z.passedTurns = 0;
	z.action = false;
	z.sold = false;
	z.endOfYear = false;
	z.turnReal = z.turn;
	gameState();
}



function playerReport(k){
	let report = "";
	let first = true;
	if(k >= z.numPlayers){
		let first = true;
		report += "Owned by: ";
		for(let j = 0; !(j>=z.numPlayers); j++){
			if(z.shares[k][j] > 0){
				if(!first){
					report += ", ";
				}
				first = false;
				report += z.countries[j] + " ("+z.shares[k][j]+"0%)";
			}
		}
		if(z.shares[k][z.numPlayers] > 0){
			report += ", World Bank ("+z.shares[k][z.numPlayers]+"0%)";
		}
		report += "\r\n";
	}
	let points = z.points[k];
	if(z.stations){
		points += z.pointTokens[k];
	}
	report += points+" point";
	if(points !== 1){
		report += "s";
	}
	if(z.stations && z.numPlayers > k){
		let bonus = 0;
		for(let j = z.numPlayers; !(j>=z.shares.length); j++){
			bonus += z.shares[j][k] * sharePoints(j);
		}
		if(bonus !== 0){
			report += " (plus "+bonus+" from shares = "+(bonus+points)+")";
		}
	}
	report += ":";
	for(let mission in z.missions){
		if(z.missions[mission].claimed === k){
			let color = "black";
			if(!z.stations){
				let v = easyMissions;
				if(z.FAM){
					v = easyMissionsFAM;
				}
				v.forEach((m)=>{
					if(m === mission){
						color = "green";
					}
				});
				
				if(z.FAM){
					v = mediumMissionsFAM;
				} else {
					v = mediumMissions;
				}
				v.forEach((m)=>{
					if(m === mission){
						color = "orange";
					}
				});
				
				if(z.FAM){
					v = hardMissionsFAM;
				} else {
					v = hardMissions;
				}
				v.forEach((m)=>{
					if(m === mission){
						color = "red";
					}
				});
			} else {
				let v = easyMissionsStations;
				if(z.FAM){
					v = easyMissionsStationsFAM;
				}
				v.forEach((m)=>{
					if(m === mission){
						color = "green";
					}
				});
				if(z.FAM){
					v = mediumMissionsStationsFAM;
				} else {
					v = mediumMissionsStations;
				}
				v.forEach((m)=>{
					if(m === mission){
						color = "orange";
					}
				});
				if(z.FAM){
					v = hardMissionsStationsFAM;
				} else {
					v = hardMissionsStations
				}
				v.forEach((m)=>{
					if(m === mission){
						color = "red";
					}
				});
				if(mission === "Orbital Experiment +0.5"){
					color = "green";
				} else if(mission === "Lunar Experiment +1" || mission === "Man on the Moon +1.5" || mission === "Human on the Moon +1.5"){
					color = "orange";
				} else if(mission === "Mars Experiment +1.5" || mission === "Mars Station +2" || mission === "Man on Mars +2.5" || mission === "Human on Mars +2.5" || mission === "Lunar Station +1.5"){
					color = "red";
				} else if(mission === "Extraterrestrial Life Survey" || mission === "Extraterrestrial Life Sample"){
					color = "DarkGreen";
				}
			}
			if(z.outer){
				outerMissions.forEach((m)=>{
					if(m === mission){
						color = "blue";
					}
				});
			}
			report +=  "\r\n"+colorText(color,z.missions[mission].points+" - "+mission);
		}
	}
	if(z.stations){
		z.pointCards[k].forEach((card)=>{
			if(card === "Fossil?"){
				report += "\r\n6 - Fossil?";
			} else if(card === "Alien Object"){
				report += "\r\n8 - Alien Object";
			} else if(card === "Liquid Water"){
				report += "\r\n4 - Liquid Water";
			} else if(card === "Infection"){
				report += "\r\n-10 - Infection";
			} else {
				report += "\r\n2 - "+card;
			}
		});
		if(z.pointTokens[k] === 1){
			report += "\r\n1 Point Token";
		} else if(z.pointTokens[k] > 0){
			report += "\r\n"+z.pointTokens[k] + " Point Tokens";
		}
	}
	if(z.memorialWall[k].length > 0){
		report += italics("\r\nMemorial Wall: ");
		first = true;
		for(let j = 0; z.memorialWall[k].length > j; j++){
			if(!first){
				report += ", ";
			} else {
				first = false;
			}
			report += colorText("gray",z.memorialWall[k][j]);
		}
		report += " (-";
		if(z.stations){
			report += (z.memorialWall[k].length * (z.memorialWall[k].length + 1));
		} else {
			report += (2 * z.memorialWall[k].length);
		}
		report+=")";
	}
	
	if(z.numPlayers > k){
		first = true;
		report += "\r\n"+"Advancements: ";
		for(let advancement in z.advancements[k]){
			if(!first){
				report += ", ";
			} else {
				first = false;
			}
			if(z.advancements[k][advancement].autoSuccess()){
				report += colorText("green",advancement+" ("+z.advancements[k][advancement].outcomes.length+")");
			} else {
				report += advancement+" ("+z.advancements[k][advancement].outcomes.length+")";
			}
		}
	}
	report+="\r\n";
	report+=italics(z.countries[k])+": ";
	report+="$"+z.money[k]+" million";
	if(z.stations && z.numPlayers > k){
		for(let j = z.numPlayers; !(j>=z.shares.length); j++){
			if(z.shares[j][k] > 0){
				report += "\r\n"+z.shares[j][k]+" Share";
				if(z.shares[j][k] > 1){
					report+="s";
				}
				report += " in "+z.countries[j]+" (worth ";
				let price = sharePrice(j)*z.shares[j][k];
				let points = sharePoints(j)*z.shares[j][k];
				if(price >= 0){
					report += "$"+price+" million, "+points+" point";
					if(points !== 1){
						report += "s";
					}
					report += ")";
				} else if(price === 0){
					report += "nothing)";
				} else {
					report += "-$"+(-price)+" million, "+points+" points)";
				}
			}
		}
	}
	first = true;
	for(let component in z.hq[k]){
		if(component in componentMasses){
			if(first){
				report += "\r\n";
				first = false;
			} else {
				report += ", ";
			}
			if(component.includes("(damaged)")){
				report += colorText("red",z.hq[k][component] + " x "+component);
			} else if(component.includes("(used)") || component.includes("(surveyed)") || component.includes("(explored)")){
				report += colorText("gray",z.hq[k][component] + " x "+component);
			} else {
				report += z.hq[k][component] + " x "+component;
			}
		}
	}
	for(let astronaut in z.hq[k].astronauts){
		if(first){
			report += "\r\n";
			first = false;
		} else {
			report += ", ";
		}
		let type = astronautSuffix(z.hq[k].astronauts[astronaut]);
		if(z.hq[k].astronauts[astronaut].incapacitated){
			report += colorText("red",astronaut+" "+type+" (incapacitated)");
		} else {
			report += astronaut+" "+type;
		}
	}
	for(let j = 0; z.spacecraft[k].length > j; j++){
		report+="\r\n";
		report+=italics(z.spacecraft[k][j].name)+" (";
		if(z.spacecraft[k][j].timeTokens > 0){
			let s = "s";
			if(z.spacecraft[k][j].timeTokens === 1){
				s = "";
			}
			report += colorText("gray",z.spacecraft[k][j].location + " + "+z.spacecraft[k][j].timeTokens+" Time Token"+s);
		} else {
			report += z.spacecraft[k][j].location;
		}
		report+="): ";
		first = true;
		for(let component in z.spacecraft[k][j]){
			if(component in componentMasses){
				if(!first){
					report += ", ";
				} else {
					first = false;
				}
				if(component.includes("(damaged)")){
					report += colorText("red",z.spacecraft[k][j][component] + " x "+component);
				} else if(component.includes("(used)") || component.includes("(surveyed)") || component.includes("(explored)")){
					report += colorText("gray",z.spacecraft[k][j][component] + " x "+component);
				} else {
					report += z.spacecraft[k][j][component] + " x "+component;
				}
			}
		}
		for(let astronaut in z.spacecraft[k][j].astronauts){
			report += ", ";
			let type = astronautSuffix(z.spacecraft[k][j].astronauts[astronaut]);
			if(z.spacecraft[k][j].astronauts[astronaut].incapacitated){
				report += colorText("red",astronaut+" "+type+" (incapacitated)");
			} else {
				report += astronaut+" "+type;
			}
		}
	}
	report += "\r\n";
	return report;
}

function astronautSuffix(astronaut){
	switch(astronaut.type){
		case "Scientist":
			return "(S)";
		case "Doctor":
			return "(D)";
		case "Pilot":
			return "(P)";
		case "Mechanic":
			return "(M)";
	}
}

function occupationMissionPoints(){
	switch(z.occupationMission){
		case "Orbital Occupation":
			return 0.5;
		case "Lunar Occupation":
			return 1;
		case "Mars Occupation":
			return 2;
		case "Venus Occupation":
			return 2.5;
	}
}

function gameState(){
	let report = '[q' + bl + '="LEN: Game State"]' + size(bold(italics(z.year + ": "+z.countries[z.turn] + " is the Current Player.")), 14) + "\r\n\r\n";
	
	report += bold("Available Missions")+":";
	if(!z.stations){
		let v = easyMissions;
		if(z.FAM){
			v = easyMissionsFAM;
		}
		v.forEach((mission)=>{
			if(missionAvailable(mission)){
				report += "\r\n"+colorText("green",z.missions[mission].points+" - "+mission);
			}
		});
		if(z.FAM){
			v = mediumMissionsFAM;
		} else {
			v = mediumMissions;
		}
		v.forEach((mission)=>{
			if(missionAvailable(mission)){
				report += "\r\n"+colorText("orange",z.missions[mission].points+" - "+mission);
			}
		});
		if(z.FAM){
			v = hardMissionsFAM;
		} else {
			v = hardMissions;
		}
		v.forEach((mission)=>{
			if(missionAvailable(mission)){
				report += "\r\n"+colorText("red",z.missions[mission].points+" - "+mission);
			}
		});
	} else {
		if(z.occupationMission){
			report += "\r\n"+occupationMissionPoints()+"/Time - "+z.occupationMission;
		}
		let orbital = true;
		let v = easyMissionsStations;
		if(z.FAM){
			v = easyMissionsStationsFAM;
		}
		v.forEach((mission)=>{
			if(mission === "Orbital Experiment"){
				if(orbital){
					if(missionAvailable(mission)){
						report += "\r\n"+colorText("green",z.missions[mission].points+" - "+mission);
					}
				} else {
					mission += " +0.5";
					if(missionAvailable(mission)){
						report += "\r\n"+colorText("green",z.missions[mission].points+" - "+mission);
					}
				}
				orbital = false;
			} else if(missionAvailable(mission)){
				report += "\r\n"+colorText("green",z.missions[mission].points+" - "+mission);
			}
		});
		let lunar = true;
		let manOnMoon = true;
		if(z.FAM){
			v = mediumMissionsStationsFAM;
		} else {
			v = mediumMissionsStations;
		}
		v.forEach((mission)=>{
			if(mission === "Lunar Experiment"){
				if(lunar){
					if(missionAvailable(mission)){
						report += "\r\n"+colorText("orange",z.missions[mission].points+" - "+mission);
					}
				} else {
					mission += " +1";
					if(missionAvailable(mission)){
						report += "\r\n"+colorText("orange",z.missions[mission].points+" - "+mission);
					}
				}
				lunar = false;
			} else if(mission === "Man on the Moon" || mission === "Human on the Moon"){
				if(manOnMoon){
					if(missionAvailable(mission)){
						report += "\r\n"+colorText("orange",z.missions[mission].points+" - "+mission);
					}
				} else {
					mission += " +1.5";
					if(missionAvailable(mission)){
						report += "\r\n"+colorText("orange",z.missions[mission].points+" - "+mission);
					}
				}
				manOnMoon = false;
			} else if(missionAvailable(mission)){
				report += "\r\n"+colorText("orange",z.missions[mission].points+" - "+mission);
			}
		});
		let marsExperiment = true;
		let marsStation = true;
		let manOnMars = true;
		let lunarStation = true;
		if(z.FAM){
			v = hardMissionsStationsFAM;
		} else {
			v = hardMissionsStations;
		}
		v.forEach((mission)=>{
			if(mission === "Mars Experiment"){
				if(marsExperiment){
					if(missionAvailable(mission)){
						report += "\r\n"+colorText("red",z.missions[mission].points+" - "+mission);
					}
				} else {
					mission += " +1.5";
					if(missionAvailable(mission)){
						report += "\r\n"+colorText("red",z.missions[mission].points+" - "+mission);
					}
				}
				marsExperiment = false;
			} else if(mission === "Mars Station"){
				if(marsStation){
					if(missionAvailable(mission)){
						report += "\r\n"+colorText("red",z.missions[mission].points+" - "+mission);
					}
				} else {
					mission += " +2";
					if(missionAvailable(mission)){
						report += "\r\n"+colorText("red",z.missions[mission].points+" - "+mission);
					}
				}
				marsStation = false;
			} else if(mission === "Man on Mars" || mission === "Human on Mars"){
				if(manOnMars){
					if(missionAvailable(mission)){
						report += "\r\n"+colorText("red",z.missions[mission].points+" - "+mission);
					}
				} else {
					mission += " +2.5";
					if(missionAvailable(mission)){
						report += "\r\n"+colorText("red",z.missions[mission].points+" - "+mission);
					}
				}
				manOnMars = false;
			} else if(mission === "Lunar Station"){
				if(lunarStation){
					if(missionAvailable(mission)){
						report += "\r\n"+colorText("red",z.missions[mission].points+" - "+mission);
					}
				} else {
					mission += " +1.5";
					if(missionAvailable(mission)){
						report += "\r\n"+colorText("red",z.missions[mission].points+" - "+mission);
					}
				}
				lunarStation = false;
			} else if(missionAvailable(mission)){
				report += "\r\n"+colorText("red",z.missions[mission].points+" - "+mission);
			}
		});
		let mission = "Extraterrestrial Life Survey";
		if(missionAvailable(mission)){
			report += "\r\n"+colorText("DarkGreen",z.missions[mission].points+" - "+mission);
		}
		mission = "Extraterrestrial Life Sample";
		if(missionAvailable(mission)){
			report += "\r\n"+colorText("DarkGreen",z.missions[mission].points+" - "+mission);
		}
	}
	if(z.outer){
		outerMissions.forEach((mission)=>{
			if(missionAvailable(mission)){
				report += "\r\n"+colorText("blue",z.missions[mission].points+" - "+mission);
			}
		});
		let v = explorableMissions;
		if(z.FAM){
			v = explorableMissionsFAM;
		}
		v.forEach((mission)=>{
			if(missionAvailable(mission)){
				report += "\r\n"+z.missions[mission].points+" - "+mission;
			}
		});
	}
	
	report += "\r\n\r\n"+bold("Revealed Hazards:");
	let any = false;
	for(let hazard in z.hazard){
		if(z.revealed[hazard]){
			any = true;
			report += "\r\n"+hazard+": "+z.hazard[hazard];
			if(z.stations && (hazard === "Venus" || hazard === "Moon" || hazard === "Mars" || hazard === "Phobos" || hazard === "Ceres") && z.features[hazard].length > 0){
				report += " with Feature";
				if(z.features[hazard].length > 1){
					report += "s";
				}
				report += ": ";
				for(let j = 0; !(j>=z.features[hazard].length); j++){
					if(j !== 0){
						report += ", ";
					}
					report += z.features[hazard][j];
				}
			}
		}
	}
	if(!any){
		report += "\r\n(None)";
	}
	
	for(let k2 = 0; !(k2>=z.numPlayers); k2++){
		let k = z.turnOrder[k2];
		report += "\r\n\r\n"+size(bold(z.countries[k]),14)+": [us"+"er="+z.usernames[k]+"]"+z.usernames[k]+"[/us"+"er]\r\n";
		report += playerReport(k);
		report += "\r\n";
	}
	
	for(let k = z.numPlayers; !(k>=z.spacecraft.length); k++){
		report += "\r\n\r\n"+size(bold(z.countries[k]),14)+"\r\n";
		report += playerReport(k);
		report += "\r\n";
	}
	if(z.stations){
		let any = false;
		if(z.bankMemorial.length > 0){
			any = true;
		}
		for(let j = z.numPlayers; !(j>=z.shares.length); j++){
			if(z.shares[j][z.numPlayers] > 0){
				any = true;
				break;
			}
		}
		for(let mission in z.missions){
			if(z.missions[mission].claimed === -2){
				any = true;
				break;
			}
		}
		if(any){
			report += "\r\n\r\n"+size(bold("World Bank"),14)+"\r\n";
			let k = z.numPlayers;
			for(let j = z.numPlayers; !(j>=z.shares.length); j++){
				if(z.shares[j][k] > 0){
					report += "\r\n"+z.shares[j][k]+" Share";
					if(z.shares[j][k] > 1){
						report+="s";
					}
					report += " in "+z.countries[j]+" (worth ";
					let price = sharePrice(j)*z.shares[j][k];
					let points = sharePoints(j)*z.shares[j][k];
					if(price >= 0){
						report += "$"+price+" million, "+points+" point";
						if(points !== 1){
							report += "s";
						}
						report += ")";
					} else if(price === 0){
						report += "nothing)";
					} else {
						report += "-$"+(-price)+" million, "+points+" points)";
					}
				}
			}
			for(let mission in z.missions){
				if(z.missions[mission].claimed === -2){
					/* TODO: color */
					report += "\r\n"+mission;
				}
			}
			if(z.bankMemorial.length > 0){
				report += italics("\r\nMemorial Wall: ");
				let first = true;
				for(let j = 0; z.bankMemorial.length > j; j++){
					if(!first){
						report += ", ";
					} else {
						first = false;
					}
					report += colorText("gray",z.bankMemorial[j]);
				}
			}
			report += "\r\n";
		}
	}
	report += "[/" + "q]";
	t.value += report;
}

function doneWithLifeSupportTests(){
	for(let k = z.lifeSupportCapsules.length-1; k>=0; k--){
		if(z.lifeSupportCapsules[k][2] === null){
			return false;
		}
	}
	return true;
}

function mustAnyDie(){
	for(let k = z.spacecraft[z.turn].length - 1; k>=0; k--){
		if(z.spacecraft[z.turn][k].location === "Earth"){
			continue;
		}
		let seats = 0;
		z.lifeSupportCapsules.forEach((x,j)=>{
			if(z.lifeSupportCapsules[j][0] === k && z.lifeSupportCapsules[j][2]){
				seats += capsuleSeats[z.lifeSupportCapsules[j][1]];
			}
		});
		if(z.spacecraft[z.turn][k].numAstronauts() > seats){
			return true;
		}
	}
	return false;
}

function killSeatlessAstronauts(){
	for(let k = z.spacecraft[z.turn].length - 1; k>=0; k--){
		if(z.spacecraft[z.turn][k].location === "Earth"){
			continue;
		}
		let seats = 0;
		z.lifeSupportCapsules.forEach((x,j)=>{
			if(z.lifeSupportCapsules[j][0] === k && z.lifeSupportCapsules[j][2]){
				seats += capsuleSeats[z.lifeSupportCapsules[j][1]];
			}
		});
		if(seats === 0 && z.spacecraft[z.turn][k].numAstronauts() > 0){
			plainAlert("There is no working Life Support on the "+z.spacecraft[z.turn][k]+"; all astronauts aboard die.");
			z.spacecraft[z.turn][k].killAll();
		}
	}
}

function faceLifeSupport(index,drawer){
	if(drawer === undefined){
		drawer = z.turn;
	}
	let cost = 1000000;
	plainAlert(z.countries[drawer]+" performs a Life Support Check for "+z.lifeSupportCapsules[index][1]+" on the "+z.spacecraft[z.turn][z.lifeSupportCapsules[index][0]].name+":");
	if(!("Life Support" in z.advancements[drawer])){
		plainAlert(z.countries[drawer]+" does not have the Life Support advancement!");
		z.lifeSupportCapsules[index][2] = false;
	} else if(z.advancements[drawer]["Life Support"].autoSuccess()){
		plainAlert("The check succeeds automatically.");
		z.lifeSupportCapsules[index][2] = true;
	} else {
		let outcome = z.advancements[drawer]["Life Support"].drawOutcome();
		z.lastAdvancement[drawer] = "Life Support";
		cost = 5;
		if(outcome === SUCCESS){
			plainAlert("Success!");	
			z.lifeSupportCapsules[index][2] = true;
			cost = 10;
		} else if(outcome === MINOR_FAILURE){
			if(z.spacecraft[z.turn][z.lifeSupportCapsules[index][0]].hasMechanic()){
				plainAlert("Minor Failure!  Disaster averted by the quick actions of the on-board mechanic.");
				z.lifeSupportCapsules[index][2] = true;
			} else {
				plainAlert("Minor Failure!");
				z.lifeSupportCapsules[index][2] = false;
			}
		} else {
			plainAlert("Major Failure!");
			z.lifeSupportCapsules[index][2] = false;
		}
	}

	if(doneWithLifeSupportTests()){
		killSeatlessAstronauts();
		if(mustAnyDie()){
			plainAlert(z.countries[z.turn] + " does not have enough seats with working Life Support for its astronauts in space, and must decide which to kill.");
		} else if(cost > z.money[drawer]){
			for(let j = 0; !(j>=z.numPlayers); j++){
				z.lastAdvancement[j] = null;
			}
			delete z.lifeSupportCapsules;
			lifeSupportCheck();
		}
	}	
	/* TODO: If only one left and we're out of money, can do it automatically */
}

function stationsFullTurnOrder(){
	/* TODO: worry about floating point arithmetic */
	let modifiedPoints = [];
	for(let j = 0; !(j>=z.points.length); j++){
		let points = z.points[j] + 2 * z.memorialWall[j].length;
		if(z.stations){
			points = z.points[j] + z.pointTokens[j] + z.memorialWall[j].length * (z.memorialWall[j].length + 1);
		}
		modifiedPoints.push([j,points]);
	}
	let turnOrder = [];
	while(modifiedPoints.length > 0){
		let leastPoints = 1000000;
		let tiedIndices = [];
		let tiedCountries = [];
		for(let j = modifiedPoints.length -1; j>=0; j--){
			let points = modifiedPoints[j][1];
			if(leastPoints > points){
				tiedIndices = [j];
				tiedCountries = [modifiedPoints[j][0]];
				leastPoints = points;
			} else if (leastPoints === points){
				tiedIndices.push(j);
				tiedCountries.push(modifiedPoints[j][0]);
			}
		}
		shuffle(tiedCountries);
		for(let j = modifiedPoints.length - 1; j>=0; j--){
			if(tiedIndices.includes(j)){
				modifiedPoints.splice(j,1);
			}
		}
		while(tiedCountries.length > 0){
			turnOrder.push(tiedCountries.shift());
		}
	}
	return turnOrder;
}

function lifeSupportCheck(){
	if(z.lifeSupport.length === 0){
		delete z.lifeSupport;
		z.supplies = z.turnOrder.slice();
		if(z.stations){
			z.supplies = stationsFullTurnOrder();
		}
		suppliesCheck();
		return;
	}
	let country = z.lifeSupport.shift();
	
	let hasLifeSupport = false;
	if(z.numPlayers > country){
		hasLifeSupport = "Life Support" in z.advancements[country];
	} else {
		for(let j = z.numPlayers-1; j>=0; j--){
			if(z.shares[country][j] > 0 && "Life Support" in z.advancements[j]){
				hasLifeSupport = true;
				break;
			}
		}
	}
	if(!hasLifeSupport){
		z.spacecraft[country].forEach((x,k)=>{
			if(z.spacecraft[country][k].location !== "Earth" && z.spacecraft[country][k].isCrewed()){
				plainAlert("As "+z.countries[country] + " does not have Life Support; all astronauts aboard the "+z.spacecraft[country][k].name+" die.");
				z.spacecraft[country][k].killAll(country);
			}
		});
		lifeSupportCheck();
		return;
	}
	z.spacecraft[country].forEach((x,k)=>{
		if(z.spacecraft[country][k].location !== "Earth" && z.spacecraft[country][k].isCrewed() && z.spacecraft[country][k].undamagedSeats() === 0){
			plainAlert("The "+z.spacecraft[country][k].name+" has no seats left in undamaged capsules; all astronauts aboard die.");
			z.spacecraft[country][k].killAll(country);
		}
	});
	z.turn = country;
	z.turnReal = z.turn;
	z.lifeSupportCapsules = [];
	z.spacecraft[country].forEach((s,index)=>{
		for(let capsule in z.spacecraft[country][index]){
			if(capsule in capsuleSeats && !capsule.endsWith("(damaged)") && z.spacecraft[country][index].location !== "Earth"){
				for(let k = z.spacecraft[country][index][capsule]; k > 0; k--){
					z.lifeSupportCapsules.push([index,capsule,null]);
				}
			}
		}
	});
	if(z.lifeSupportCapsules.length === 0){
		for(let j = 0; !(j>=z.numPlayers); j++){
			z.lastAdvancement[j] = null;
		}
		delete z.lifeSupportCapsules;
		lifeSupportCheck();
		return;
	}
	let autoSuccess = false;
	if(z.numPlayers > country){
		autoSuccess = z.advancements[country]["Life Support"].autoSuccess();
	} else {
		autoSuccess = true;
		for(let j = z.numPlayers-1; j>=0; j--){
			if(z.shares[country][j] > 0 && (!("Life Support" in z.advancements[j]) ||  !z.advancements[j]["Life Support"].autoSuccess())){
				autoSuccess = false;
				break;
			}
		}
	}
	if(autoSuccess){
		z.lifeSupportCapsules.forEach((x,k)=>{
			z.lifeSupportCapsules[k][2] = true;
		});
		if(mustAnyDie()){
			plainAlert(z.countries[country] + " does not have enough seats with working Life Support for its astronauts in space, and must decide which to kill.");
		} else {
			for(let j = 0; !(j>=z.numPlayers); j++){
				z.lastAdvancement[j] = null;
			}
			delete z.lifeSupportCapsules;
			lifeSupportCheck();
		}
	} else if(z.lifeSupportCapsules.length === 1){
		if(z.numPlayers > country){
			faceLifeSupport(0);
		} else {
			if(numShareholders(country) === 1){
				faceLifeSupport(0,soleShareholder(country));
			} else {
				plainAlert(z.countries[country] + " must perform Life Support checks for its capsules in space.");		
				return false;
			}
		}
	} else {
		plainAlert(z.countries[country] + " must perform Life Support checks for its capsules in space.");		
		return false;
	}
}

function soleShareholder(country){
	return getShareholders(country)[0];	
}

function getShareholders(country){
	if(z.numPlayers > country){
		return [country];
	}
	let shareholders = [];
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(z.shares[country][j] > 0){
			shareholders.push(j);
		}
	}
	return shareholders;
}

function numShareholders(country){
	if(z.numPlayers > country){
		return 1;
	}
	let count = 0;
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(z.shares[country][j] > 0){
			count++;
		}
	}
	return count;
}



function mustAnyStarve(country){
	if(country === undefined){
		country = me;
	}
	for(let k = z.spacecraft[country].length-1; k>=0; k--){
		if(z.spacecraft[country][k].location !== "Earth" && z.spacecraft[country][k].isCrewed()){
			let remainder = z.spacecraft[country][k].numAstronauts() % 5;
			let suppliesNeeded = (z.spacecraft[country][k].numAstronauts() - remainder)/5;
			if(remainder !== 0){
				suppliesNeeded++;
			}
			if(z.stations){
				if(suppliesNeeded > z.spacecraft[country][k].Food){
					return true;
				} 
			} else {
				if(suppliesNeeded > z.spacecraft[country][k].Supplies){
					return true;
				} 
			}
		}
	}
	return false;
}





function suppliesCheck(){
	/* TODO: this stuff could be done asynchronously */
	if(z.supplies.length === 0){
		delete z.supplies;
		
		if(z.stations){
			for(let j = 0; !(j>=z.spacecraft.length); j++){
				for(let k = 0; !(k>=z.spacecraft[j].length); k++){
					if(z.spacecraft[j][k].location !== "Earth"){
						z.spacecraft[j][k].mentalHealthCheck();
					}
				}
			}
		}

		z.timeTokens = z.turnOrder.slice();
		if(z.stations){
			z.timeTokens = stationsFullTurnOrder();
		}
		if(((!z.outer && !z.stations && z.year === 1976) || z.year === 1986) && !z.gameOver){
			boldAlert("The space race has come to an end.");
			if(z.numPlayers > 1){
				let mostPoints = -1;
				let winners = [];
				for(let j = 0; !(j>=z.numPlayers); j++){
					let points = z.points[j];
					if(z.stations){
						points += z.pointTokens[j];
						for(let k = z.numPlayers; !(k>=z.shares.length); k++){
							points += z.shares[k][j]*sharePoints(k);
						}
					}
					if(points > mostPoints){
						mostPoints = points;
						winners = [j];
					} else if(points === mostPoints){
						winners.push(j);
					}
				}
				if(winners.length > 1){
					let alertText = "The game ends in a tie.  The joint winners are: ";
					winners.forEach((country,j)=>{
						if(j!==0){
							alertText += ", ";
						}
						alertText += z.countries[country];
					});
					boldAlert(alertText+".");
				} else if(winners.length === 1){
					boldAlert(winners[0]+" wins!");
				} else {
					plainAlert("You are all monsters.");
				}
			} else {
				let autoLose = false;
				if(z.outer){
					let missions = ["Callisto Survey","Enceladus Survey","Ganymede Survey","Europa Survey","Io Survey","Jupiter Survey","Jupiter System Survey","Saturn Survey","Titan Survey",
			    "Uranus Survey","Grand Tour","Neptune Survey"];
					for(let j = missions.length-1; j>=0; j--){
						if(missions[j] in z.missions){
							boldAlert("There are still uncompleted non-explorable missions.  You have lost.");
							autoLose = true;
							break;
						}
					}
				}
				if(!autoLose){
					let remainingPoints = 0;
					for(let mission in z.missions){
						if(z.missions[mission].claimed === -1){
							remainingPoints += z.missions[mission].points;
						}
					}
					if(z.points[0] > remainingPoints){
						boldAlert("You have won!");
					} else {
						boldAlert("You have lost.");
					}
				}
			}
			z.gameOver = true;
			z.countries.forEach((x,j)=>{
				addOption(j,"Continue playing",undefined,false);
			});
			/* TODO: end of game cleanup */
		} else {
			timeTokenCheck();
		}
		return;
	}
	let country = z.supplies.shift();
	let done = true;
	z.spacecraft[country].forEach((x,k)=>{
		if(z.spacecraft[country][k].location !== "Earth" && z.spacecraft[country][k].isCrewed()){
			let remainder = z.spacecraft[country][k].numAstronauts() % 5;
			let suppliesNeeded = (z.spacecraft[country][k].numAstronauts() - remainder)/5;
			if(remainder !== 0){
				suppliesNeeded++;
			}
			if(!z.stations){
				if(!("Supplies" in z.spacecraft[country][k])){
					plainAlert("The "+z.spacecraft[country][k].name+" has run out of supplies; all astronauts aboard die.");
					z.spacecraft[country][k].killAll(country);
				}  else if (suppliesNeeded > z.spacecraft[country][k].Supplies){
					plainAlert("The "+z.spacecraft[country][k].name+" does not have enough supplies to feed all astronauts aboard; "+z.countries[country]+" must decide which astronauts die.");
					done = false;
				} else {
					t.value += "The crew of the "+z.spacecraft[country][k].name+" eat this year's ration of supplies.\r\n";
					z.spacecraft[country][k].removeComponent("Supplies",suppliesNeeded);
				}
			} else {
				if(!("Food" in z.spacecraft[country][k])){
					plainAlert("The "+z.spacecraft[country][k].name+" has run out of food; all astronauts aboard die.");
					z.spacecraft[country][k].killAll(country);
				}  else if (suppliesNeeded > z.spacecraft[country][k].Food){
					plainAlert("The "+z.spacecraft[country][k].name+" does not have enough food to feed all astronauts aboard; "+z.countries[country]+" must decide which astronauts die.");
					done = false;
				} else {
					t.value += "The crew of the "+z.spacecraft[country][k].name+" eat this year's ration of food.\r\n";
					z.spacecraft[country][k].removeComponent("Food",suppliesNeeded);
				}
			}
		}
	});
	if(!done){
		if(z.stations){
			addOption(country,"[Food] Kill unfed astronauts",undefined,true);
		} else {
			addOption(country,"[Supplies] Kill unfed astronauts",undefined,true);
		}
	} else {
		suppliesCheck();
	}
}


function endYear(){
	z.endOfYear = true;
	/* Untap all Ion Thrusters and Rovers */
	for(let j = z.spacecraft.length-1; j>=0; j--){
		for(let k = z.spacecraft[j].length-1; k>=0; k--){
			z.spacecraft[j][k].untapIonThrusters();
		}
	}
	/* Repair damaged components on Earth */
	z.hq.forEach((x,j)=>{
		z.hq[j].repairAll();
		for(let k = z.spacecraft[j].length-1; k>=0; k--){
			if(z.spacecraft[j][k].location === "Earth"){
				z.spacecraft[j][k].repairAll();
			}
		}
	});
	/* kill incapacitated astronauts */
	for(let j = z.spacecraft.length-1; j>=0; j--){
		for(let k = z.spacecraft[j].length-1; k>=0; k--){
			z.spacecraft[j][k].killIncapacitated(j);
		}
	}
	/* life support check */
	z.lifeSupport = z.turnOrder.slice();
	if(z.stations){
		z.lifeSupport = stationsFullTurnOrder();
	}
	lifeSupportCheck();
}

function getIndex(player,name){
	for(let k = z.spacecraft[player].length - 1; k>=0; k--){
		if(z.spacecraft[player][k].name === name){
			return k;
		}
	}
	return -1;
}


function endYearHazardCheck(){
	if(z.finalHazards.length === 0 || !z.outer){
		delete z.finalHazards;
		plainAlert("The year ends.");
		z.year++;
		startYear();
		return;
	}
	z.turn = z.finalHazards.shift();
	z.turnReal = z.turn;
	
	z.endYearHazards = [];
	z.spacecraft[z.turn].forEach((sp,k)=>{
		if(map[z.spacecraft[z.turn][k].location].endYearHazard ||
		   (z.spacecraft[z.turn][k].location === "Mars" && z.hazard["Mars"] === "2 Features + CO2 + Time: Sickness (2)") ||
		   (z.spacecraft[z.turn][k].location === "Venus" && z.hazard["Venus"] === "Pressure (4) + Time: Spacecraft Destroyed") ||
		   (z.spacecraft[z.turn][k].location === "Mercury" && z.hazard["Mercury"] === "Time: Sickness (1)")){

			z.endYearHazards.push(z.spacecraft[z.turn][k].name);
		}
	});
	
	/* no end-year hazards require advancement draws */
	for(let j = 0; !(j>=z.endYearHazards.length); j++){
		let index = getIndex(z.turn,z.endYearHazards[j]);
		let hazard = map[z.spacecraft[z.turn][index].location].endYearHazard;
		let goodToGo = false;
		switch(z.hazard[hazard]){
			case "Pressure (4) + Time: Spacecraft Destroyed":
			case "Beta":
				goodToGo = true;
				break;
			case "Debris (2) + Alpha":
				goodToGo = 1 >= z.spacecraft[z.turn][index].undamagedTypes();
				break;
			case "Sickness (1) + Beta":
			case "Time: Sickness (1)": {
				let aldrinSeats = 0;
				let damagedAldrinSeats = 0;
				let otherSeats = 0;
				for(let component in z.spacecraft[z.turn][index]){
					if(component in capsuleSeats){
						if(component === "Aldrin" || component === "Aldrin (used)" || component === "Space Habitat" || component === "Space Habitat (used)" || 
						   component === "Ground Habitat" || component === "Ground Habitat (used)"){
							   
							aldrinSeats+= z.spacecraft[z.turn][index][component]*capsuleSeats[component];
						} else if(component === "Aldrin (damaged)" || component === "Aldrin (used) (damaged)" || component === "Space Habitat (damaged)" || component === "Space Habitat (used) (damaged)" ){
							damagedAldrinSeats += z.spacecraft[z.turn][index][component] *capsuleSeats[component];
						} else {
							otherSeats += z.spacecraft[z.turn][index][component] * capsuleSeats[component];
						}
					}
				}
				goodToGo = aldrinSeats >= z.spacecraft[z.turn][index].numAstronauts() || (aldrinSeats === 0 && damagedAldrinSeats === 0);
				break;
			}	
			case "Sickness (2) + Beta": 
			case "Sickness (6) + Radiation (4) + Alpha":
			case "Sickness (3) + Radiation (1) + Beta":
			case "2 Features + CO2 + Time: Sickness (2)": {
				let aldrinSeats = 0;
				let damagedAldrinSeats = 0;
				let habitatSeats = 0;
				let damagedHabitatSeats = 0;
				let otherSeats = 0;
				for(let component in z.spacecraft[z.turn][index]){
					if(component in capsuleSeats){
						if(component === "Aldrin" || component === "Aldrin (used)"){
							aldrinSeats+= z.spacecraft[z.turn][index][component]*capsuleSeats[component];
						} else if(component === "Aldrin (damaged)" || component === "Aldrin (used) (damaged)"){
							damagedAldrinSeats += z.spacecraft[z.turn][index][component] *capsuleSeats[component];
						} else if(component === "Space Habitat" || component === "Space Habitat (used)" || component === "Ground Habitat" || component === "Ground Habitat (used)"){
							habitatSeats += z.spacecraft[z.turn][index][component] *capsuleSeats[component];
						} else if(component === "Space Habitat (damaged)" || component === "Space Habitat (used) (damaged)"){
							damagedHabitatSeats += z.spacecraft[z.turn][index][component] *capsuleSeats[component];
						} else {
							otherSeats += z.spacecraft[z.turn][index][component] * capsuleSeats[component];
						}
					}
				}
				goodToGo = habitatSeats >= z.spacecraft[z.turn][index].numAstronauts() || (habitatSeats === 0 && damagedHabitatSeats === 0 && aldrinSeats >= z.spacecraft[z.turn][index].numAstronauts()) ||
						   (habitatSeats === 0 && damagedHabitatSeats === 0 && aldrinSeats === 0 && damagedAldrinSeats === 0);
				break;
			}			
		}
		
		if(goodToGo){
			z.maneuvering = index;
			z.maneuveringDestination = z.spacecraft[z.turn][z.maneuvering].location;
			z.maneuveringTime = 0;
			z.maneuveringDifficulty = 0;
			z.thrusting = false;
			z.thrust = 0;
			z.maneuverHazards = [hazard];
			popHazard(soleShareholder(z.turn));
			z.endYearHazards.splice(j,1);
			j--;
		}
	}
	
	
	if(z.endYearHazards.length === 0){
		delete z.endYearHazards;
		endYearHazardCheck();
	} else if(z.endYearHazards.length === 1){
		z.maneuvering = getIndex(z.turn,z.endYearHazards.pop());
		z.maneuveringDestination = z.spacecraft[z.turn][z.maneuvering].location;
		z.maneuveringTime = 0;
		z.maneuveringDifficulty = 0;
		z.thrusting = false;
		z.thrust = 0;
		z.maneuverHazards = [map[z.spacecraft[z.turn][z.maneuvering].location].endYearHazard];
		if(popHazard(soleShareholder(z.turn))){
			delete z.endYearHazards;
			endYearHazardCheck();
		}
	} else {
		/* TODO: what if you've just got multiple spacecraft around saturn */
		plainAlert(z.countries[z.turn] + " has multiple spacecraft facing end-of-year hazards; they must handle each in turn.");
	}
}



function timeTokenCheck(){
	if(z.timeTokens.length === 0){
		delete z.timeTokens;
		z.finalHazards = z.turnOrder.slice();
		endYearHazardCheck();
		return;
	}
	z.turn = z.timeTokens.shift();	
	z.turnReal = z.turn;
	
	z.arrivals = [];
	z.spacecraft[z.turn].forEach((sp,k)=>{
		
		if(z.spacecraft[z.turn][k].timeTokens > 0){
			z.spacecraft[z.turn][k].timeTokens--;
			if(z.spacecraft[z.turn][k].timeTokens > 0){
				t.value += "Time Token removed from the "+z.spacecraft[z.turn][k].name+".\r\n";
			} else {
				plainAlert("The "+z.spacecraft[z.turn][k].name+" arrives at "+z.spacecraft[z.turn][k].location+".");
				if("arrivalHazards" in z.spacecraft[z.turn][k]){
					z.arrivals.push(z.spacecraft[z.turn][k].name);
				}
			}
		}
	});
	
	for(let j = 0; !(j>=z.arrivals.length); j++){
		let name = z.arrivals[j];
		let index = -1;
		z.spacecraft[z.turn].forEach((sp,k)=>{
			if(z.spacecraft[z.turn][k].name === name){
				index = k;
			}
		});
		let goodToGo = false;
		if(z.spacecraft[z.turn][index].arrivalHazards.length === 0){
			goodToGo = true;
		} else {
			let loc = z.spacecraft[z.turn][index].location;
			switch(loc){
				case "Io":
				case "Europa":
				case "Callisto":
				case "Enceladus":
					if(z.numPlayers > z.turn){
						goodToGo = !("Landing" in z.advancements[z.turn]) || (z.advancements[z.turn].Landing.autoSuccess() && z.revealed[loc]);
					} else {
						let noLanding = true;
						for(let j = 0; !(j>=z.numPlayers); j++){
							if(z.shares[z.turn][j] > 0 && "Landing" in z.advancements[j]){
								noLanding = false;
								break;
							}
						}
						if(noLanding){
							goodToGo = true;
						} else if(z.revealed[loc]){
							goodToGo = true;
							for(let j = 0; !(j>=z.numPlayers); j++){
								if(z.shares[z.turn][j] > 0 && (!("Landing" in z.advancements[j]) || !z.advancements[z.turn].Landing.autoSuccess())){
									goodToGo = false;
									break;
								}
							}
						}
					}
					break;
				case "Ceres":
				case "Phobos":
					if(!z.stations){
						goodToGo = !("Landing" in z.advancements[z.turn]) || (z.advancements[z.turn].Landing.autoSuccess() && z.revealed[loc]);
					} else {
						if(z.numPlayers > z.turn){
							goodToGo = !("Landing" in z.advancements[z.turn]) || (z.advancements[z.turn].Landing.autoSuccess() && z.revealed[loc] && maxFeatures(loc) === z.features[loc].length);
						} else {
							let noLanding = true;
							for(let j = 0; !(j>=z.numPlayers); j++){
								if(z.shares[z.turn][j] > 0 && "Landing" in z.advancements[j]){
									noLanding = false;
									break;
								}
							}
							if(noLanding){
								goodToGo = true;
							} else if(z.revealed[loc] && maxFeatures(loc) === z.features[loc].length){
								goodToGo = true;
								for(let j = 0; !(j>=z.numPlayers); j++){
									if(z.shares[z.turn][j] > 0 && (!("Landing" in z.advancements[j]) || !z.advancements[z.turn].Landing.autoSuccess())){
										goodToGo = false;
										break;
									}
								}
							}
						}
					}
					break;
				case "Earth Orbit":
				case "Mars Orbit":
					if(z.numPlayers > z.turn){
						goodToGo = !("Aerobraking" in z.advancements[z.turn]) || (z.advancements[z.turn].Aerobraking.autoSuccess() && z.revealed[loc]);
					} else {
						let noLanding = true;
						for(let j = 0; !(j>=z.numPlayers); j++){
							if(z.shares[z.turn][j] > 0 && "Aerobraking" in z.advancements[j]){
								noLanding = false;
								break;
							}
						}
						if(noLanding){
							goodToGo = true;
						} else {
							goodToGo = true;
							for(let j = 0; !(j>=z.numPlayers); j++){
								if(z.shares[z.turn][j] > 0 && (!("Aerobraking" in z.advancements[j]) || !z.advancements[z.turn].Aerobraking.autoSuccess())){
									goodToGo = false;
									break;
								}
							}
						}
					}
					break;
				case "Saturn Fly-By":
					switch(z.hazard.Saturn){
						case "Beta":
							goodToGo = true;
							break;
						case "Debris (2) + Alpha":
							goodToGo = 1 >= z.spacecraft[z.turn][index].undamagedTypes();
							break;
						case "Sickness (2) + Beta": {
							let aldrinSeats = 0;
							let damagedAldrinSeats = 0;
							let otherSeats = 0;
							for(let component in z.spacecraft[z.turn][index]){
								if(component in capsuleSeats){
									if(component === "Aldrin" || component === "Aldrin (used)"){
										aldrinSeats+= z.spacecraft[z.turn][index][component]*capsuleSeats[component];
									} else if(component === "Aldrin (damaged)" || component === "Aldrin (used) (damaged)"){
										damagedAldrinSeats += z.spacecraft[z.turn][index][component] *capsuleSeats[component];
									} else {
										otherSeats += z.spacecraft[z.turn][index][component] * capsuleSeats[component];
									}
								}
							}
							goodToGo = aldrinSeats >= z.spacecraft[z.turn][index].numAstronauts() || (aldrinSeats === 0 && damagedAldrinSeats === 0);
							break;
						}
					}
					break;
			}
		}
		
		if(goodToGo){
			z.maneuvering = index;
			z.maneuveringDestination = z.spacecraft[z.turn][z.maneuvering].location;
			z.maneuveringTime = 0;
			z.maneuveringDifficulty = 0;
			z.thrusting = false;
			z.thrust = 0;
			z.maneuverHazards = z.spacecraft[z.turn][z.maneuvering].arrivalHazards;
			delete z.spacecraft[z.turn][z.maneuvering].arrivalHazards;
			popHazard(soleShareholder(z.turn));
			z.arrivals.splice(j,1);
			j--;
		}
		
	}
	
	if(z.arrivals.length === 0){
		delete z.arrivals;
		timeTokenCheck();
	} else if(z.arrivals.length === 1){
		if(z.numPlayers > z.turn || numShareholders(z.turn) === 1){
			let name = z.arrivals.pop();
			z.spacecraft[z.turn].forEach((sp,k)=>{
				if(z.spacecraft[z.turn][k].name === name){
					z.maneuvering = k;
				}
			});
			z.maneuveringDestination = z.spacecraft[z.turn][z.maneuvering].location;
			z.maneuveringTime = 0;
			z.maneuveringDifficulty = 0;
			z.thrusting = false;
			z.thrust = 0;
			z.maneuverHazards = z.spacecraft[z.turn][z.maneuvering].arrivalHazards;
			delete z.spacecraft[z.turn][z.maneuvering].arrivalHazards;
			if(z.turn >= z.numPlayers){
				popHazard(soleShareholder(z.turn));
			} else {
				popHazard(z.turn);
			}
		}
	} else {
		plainAlert(z.countries[z.turn] + " has multiple spacecraft facing hazards upon arrival; they must handle each in turn.");
		/* TODO: handle what you can automatically */
	}
}






function canResearch(player){
	if(player === undefined){
		player = me;
	}
	if(player >= z.numPlayers){
		return false;
	}
	if(10 > z.money[player] && (!z.stations || "Rover" in z.advancements[player] || !("Surveying" in z.advancements[player]) || 3 > z.money[player])){
		return false;
	}
	for(let j = advancementNames.length-1; j>=0; j--){
		if(!(advancementNames[j] in z.advancements[player])){
			return true;
		}
	}
	if(z.outer){
		if(!("Aerobraking" in z.advancements[player])){
			return true;
		}
		if(!("Proton Rockets" in z.advancements[player])){
			return true;
		}
	}
	if(z.stations){
		if(!("Rover" in z.advancements[player])){
			return true;
		}
		if(!("Space Shuttle" in z.advancements[player])){
			return true;
		}
		if(!("Synthesis" in z.advancements[player])){
			return true;
		}
	}
	return false;
}


function canBuy(component){
	let player = me;
	let knower = meReal;
	
	if(componentCosts[component] > z.money[player]){
		return false;
	}
	if(component in componentPrereqs && !(componentPrereqs[component] in z.advancements[knower])){
		return false;
	}
	if(!z.outer){
		switch(component){
			case "Scientist":
			case "Explorer":
			case "Galileo":
			case "Proton":
				return false;
		}
	}
	if(!z.stations){
		switch(component){
			case "Shuttle":
			case "Daedealus":
			case "Small Fuel Tank":
			case "Large Fuel Tank":
			case "Rover":
			case "Medical Module":
			case "Space Habitat":
			case "Hydroponics Module":
			case "Science Module":
			case "Ground Habitat (parts)":
			case "Fuel Generator":
			case "Food":
			case "Spare Parts":
			case "Medical Supplies":
			case "Experiment (ready)":
				return false;
		}
	} else {
		if(component === "Supplies"){
			return false;
		}
	}
	return true;
}

function canBuyAnything(){
	let player = me;
	
	if(z.money[player] === 0){
		return false;
	}
	for(let component in componentCosts){
		if(canBuy(component)){
			return true;
		}
	}
	return false;
}

function canAssemble(player){
	if(player === undefined) {
		player = me;
	}
	if(z.hq[player].nonEmpty()){
		return true;
	}
	if(z.hq[player].numAstronauts() === 0){
		return false;
	}
	for(let k = z.spacecraft[player].length-1; k>=0; k--){
		if(z.spacecraft[player][k].location === "Earth" && z.spacecraft[player][k].emptySeats() > 0){
			return true;
		}
	}
	return false;
}

function canDisassemble(player){
	if(player === undefined){
		player = me;
	}
	for(let k = z.spacecraft[player].length-1; k>=0; k--){
		if(z.spacecraft[player][k].location === "Earth"){
			return true;
		}
	}
	return false;
}

function canDock(){
	let player = me;
	let drawer = meReal;
	if(!("Rendezvous" in z.advancements[drawer])){
		return false;
	}
	for(let j = z.spacecraft[player].length-1; j>=0; j--){
		if(z.spacecraft[player][j].location !== "Earth" && z.spacecraft[player][j].location !== "Suborbital Space" && z.spacecraft[player][j].timeTokens === 0){
			for(let k = z.spacecraft[player].length - 1; k > j; k--){
				if(z.spacecraft[player][k].location === z.spacecraft[player][j].location && z.spacecraft[player][k].timeTokens === 0){
					return true;
				}
			}
		}
	}
	return false;
}

function canSeparate(){
	let player = me;
	let drawer = meReal;
	if(!("Rendezvous" in z.advancements[drawer])){
		return false;
	}
	for(let j = z.spacecraft[player].length-1; j>=0; j--){
		if(z.spacecraft[player][j].location !== "Earth" && z.spacecraft[player][j].location !== "Suborbital Space"){
			if(z.spacecraft[player][j].numComponents() > 1){
				return true;
			}
		}
	}
	return false;
}

function canSurvey(){
	let player = me;
	let drawer = meReal;

	if(!("Surveying" in z.advancements[drawer])){
		return false;
	}
	let noAuto = !z.advancements[drawer].Surveying.autoSuccess();
	for(let k = z.spacecraft[player].length-1; k>=0; k--){
		if(z.spacecraft[player][k].timeTokens > 0 || z.spacecraft[player][k].workingProbesCapsules() === 0){
			continue;
		}
		let loc = z.spacecraft[player][k].location;
		for(let dest in map[loc].connections){
			if(map[loc].connections[dest].solarRadiation){
				if(!z.revealed["Solar Radiation"] || noAuto){
					return true;
				}
			}
			if(map[loc].connections[dest].jupiter){
				if(!z.revealed["Jupiter"] || noAuto){
					return true;
				}
			}
			if(map[loc].connections[dest].saturn){
				if(!z.revealed["Saturn"] || noAuto){
					return true;
				}
			}
			if(map[loc].connections[dest].uranus){
				if(!z.revealed["Uranus"] || noAuto){
					return true;
				}
			}
			let hazard = map[loc].connections[dest].hazard;
			if(hazard !== "Suborbital Space" && hazard !== undefined){
				if(!z.revealed[hazard] || noAuto){
					return true;
				}
				if("Galileo" in z.spacecraft[player][k]){
					switch(hazard){
						case "Io":
						case "Enceladus":
						case "Europa":
						case "Titan":
							if(missionAvailable("Advanced "+hazard+" Survey")){
								return true;
							}
					}
				}
			}
		}
		if("telescope" in map[loc]){
			for(let hazard in map[loc].telescope){
				if(!z.revealed[hazard] || noAuto){
					return true;
				}
				if("Galileo" in z.spacecraft[player][k]){
					switch(hazard){
						case "Io":
						case "Enceladus":
						case "Europa":
						case "Titan":
							if(missionAvailable("Advanced "+hazard+" Survey")){
								return true;
							}
					}
				}
			}
		}
	}
	return false;
}

function canCollect(player){
	if(player === undefined){
		player = me;
	}
	for(let k = z.spacecraft[player].length-1; k>=0; k--){
		if(z.spacecraft[player][k].canCollect()){
			switch(z.spacecraft[player][k].location){
				case "Mercury":
				case "Venus":
				case "Moon":
				case "Mars":
				case "Phobos":
				case "Ceres":
				case "Callisto":
				case "Ganymede":
				case "Io":
				case "Europa":
				case "Titan":
				case "Enceladus":
				case "Saturn Orbit":
					return true;
			}
		}
	}
	return false;
}

var a0 = "ENDLEA  [/size] [/c]" + 
" [c][size=1] STARTLEB";



function canRepair(player){
	if(player === undefined){
		player = me;
	}
	for(let k = z.spacecraft[player].length-1; k>=0; k--){
		if(z.spacecraft[player][k].canRepair() && z.spacecraft[player][k].location !== "Suborbital Space"){
			return true;
		}
	}
	return false;
}

function canHeal(player){
	if(player === undefined){
		player = me;
	}
	for(let k = z.spacecraft[player].length-1; k>=0; k--){
		if(z.spacecraft[player][k].canHeal()){
			return true;
		}
	}
	return false;
}

function canExplore(player){
	if(player === undefined){
		player = me;
	}
	for(let k = z.spacecraft[player].length-1; k>=0; k--){
		if(z.spacecraft[player][k].isExplorer()){
			if(missionAvailable("Enceladus Ice Explorer") && z.spacecraft[player][k].location === "Enceladus"){
				return true;
			}
			if(missionAvailable("Europa Ice Explorer") && z.spacecraft[player][k].location === "Europa"){
				return true;
			}
			if(missionAvailable("Titan Cloud Explorer") && z.spacecraft[player][k].location === "Titan"){
				return true;
			}
		}
	}
	return false;
}


/*
Juno Rockets	Juno Rocket Fired			Rocket Discarded, Provides Thrust	Rocket Damaged, Provides No Thrust				Explosion Destroys Spacecraft	
Atlas Rockets	Atlas Rocket Fired			Rocket Discarded, Provides Thrust	Rocket Damaged, Provides No Thrust				Explosion Destroys Spacecraft	
Soyuz Rockets	Soyuz Rocket Fired			Rocket Discarded, Provides Thrust	Rocket Damaged, Provides No Thrust				Explosion Destroys Spacecraft	
Saturn Rockets	Saturn Rocket Fired			Rocket Discarded, Provides Thrust	Rocket Damaged, Provides No Thrust				Explosion Destroys Spacecraft	
Ion Thrusters	Ion Thruster Fired			Thruster Provides Thrust			Thruster Damaged, Provides No Thrust			Thruster Damaged, Provides No Thrust
Rendezvous		Docking or Separating		Docking/Separating Successful		No Docking/Separating, Damage Chosen Component	No Docking/Separating, Damage Chosen Component	+1 with Pilot
Re-entry		Heat Shield Faces Cloud		Atmospheric Re-entry Successful		Capsule is Damaged, Occupants Survive			Capsule is Destroyed, Occupants Die
Life Support	Capsule Ends Year in Space	Occupants Survive					Occupants Die									Occupants Die									+1 with Mechanic
Landing			Spacecraft Faces Landing	Landing Successful					Rough Landing, Damage Chosen Component			Impact with Surface, Spacecraft Destroyed		+1 with Pilot
Surveying		Surveying a Location		Look at Other Side of Location Card	Surveying Fails									Surveying Fails									1 outcome only
---- Outer Planets ---
Aerobraking		Spacecraft Faces Aerobraking Aerobraking Successful			Chosen Component Destroyed, Spacecraft Faces Cloud	Spacecraft Destroyed							prereq: Re-entry
Proton Rockets	Proton Rocket Fired			Rocket Discarded, Provides Thrust	Rocket Damaged, Provides No Thrust				Explosion Destroys Spacecraft					prereq: Soyuz Rockets
*/

function revealHazard(hazard,country){
	if(country === undefined){
		country = me;
	}
	boldAlert(z.countries[country] + " reveals " + hazard + " to be "+z.hazard[hazard]+".");
	z.revealed[hazard] = true;
	let completedMissions = [];
	if(missionAvailable(hazard + " Survey")){
		completedMissions.push(hazard+" Survey");
	}
	if(hazard === "Moon" && missionAvailable("Lunar Survey")){
		completedMissions.push("Lunar Survey");
	}
	if(missionAvailable("Jupiter System Survey") && z.revealed["Jupiter"] && 
	   z.revealed["Callisto"] && z.revealed["Io"] && z.revealed["Ganymede"] && z.revealed["Europa"]){
		completedMissions.push("Jupiter System Survey");
    }
	if(missionAvailable("Grand Tour") && z.revealed["Jupiter"] && z.revealed["Saturn"] && z.revealed["Uranus"] && z.revealed["Neptune"]){
		completedMissions.push("Grand Tour");
	}
	if(z.hazard[hazard].includes("Life") && missionAvailable("Extraterrestrial Life Survey")){
		completedMissions.push("Extraterrestrial Life Survey");
	}
	let greek = ["Alpha","Beta","Gamma"];
	let missions = [];
	greek.forEach((letter) => {
		if(z.hazard[hazard].endsWith(letter)){
			for(let mission in z.explorableMissions[hazard]){
				if(z.explorableMissions[hazard][mission][letter]){
					missions.push(mission);
				}
			}
		}
	});	
	shuffle(missions);
	if(missions.length > 0){
		boldAlert("New Mission: "+missions[0]);
		z.missions[missions[0]] = z.explorableMissions[hazard][missions[0]];
	}
	completedMissions.forEach((mission)=>{
		completeMission(mission,z.countries[country]);
	});
	if(z.hazard[hazard].startsWith("Spacecraft Destroyed")){
		if(hazard === "Venus"){
			let missions = ["Venus Lander","Venus Sample Return","Venus Station","Man on Venus","Human on Venus","Venus Experiment","Venus Habitat"];
			missions.forEach((mission)=>{
				if(missionAvailable(mission)){
					boldAlert("The "+mission+" mission is impossible, and has been removed from the game.");
					delete z.missions[mission];
				}
			});
			if(z.occupationMission === "Venus Occupation"){
				boldAlert("The Venus Occupation mission is impossible, and has been removed from the game.");
				delete z.occupationMission;
			}
		} else if(hazard === "Moon"){
			let missions = ["Lunar Lander","Lunar Sample Return","Lunar Station","Lunar Station +1.5","Man on the Moon","Human on the Moon","Man on the Moon +1.5","Human on the Moon +1.5",
						    "Lunar Experiment","Lunar Experiment +1","Lunar Habitat"];
			missions.forEach((mission)=>{
				if(missionAvailable(mission)){
					boldAlert("The "+mission+" mission is impossible, and has been removed from the game.");
					delete z.missions[mission];
				}
			});
			if(z.occupationMission === "Lunar Occupation"){
				boldAlert("The Lunar Occupation mission is impossible, and has been removed from the game.");
				delete z.occupationMission;
			}
		}
	}
	if(missionAvailable("Extraterrestrial Life")){
		let allRevealed = true;
		for(let haza in z.revealed){
			if(!z.revealed[haza]){
				allRevealed = false;
				break;
			}
		}
		if(allRevealed){
			let life = false;
			for(let haza in z.hazard){
				if(z.hazard[haza].startsWith("Life")){
					life = true;
					break;
				}
			}
			if(!life){
				boldAlert("The Extraterrestrial Life mission is impossible, and has been removed from the game.");
				delete z.missions["Extraterrestrial Life"];
			}	
		}
	}
	if(missionAvailable("Extraterrestrial Life Survey")){
		let allRevealed = true;
		for(let haza in z.revealed){
			if(!z.revealed[haza]){
				allRevealed = false;
				break;
			}
		}
		if(allRevealed){
			let openFeatures = false;
			if(maxFeatures("Venus") > z.features.Venus.length){
				openFeatures = true;
			} else if(maxFeatures("Moon") > z.features.Moon.length || "Palladium" in z.features.Moon){
				openFeatures = true;
			} else if(maxFeatures("Mars") > z.features.Mars.length || "Fossil?" in z.features.Mars || "Platinum" in z.features.Mars || "Iridium" in z.features.Mars){
				openFeatures = true;
			} else if(maxFeatures("Phobos") > z.features.Phobos.length || "Wreckage" in z.features.Phobos || "Alien Object" in z.features.Phobos){
				openFeatures = true;
			} else if(maxFeatures("Ceres") > z.features.Ceres.length){
				openFeatures = true;
			}
			if(!openFeatures){
				boldAlert("The Extraterrestrial Life Survey mission is impossible, and has been removed from the game.");
				delete z.missions["Extraterrestrial Life Survey"];
			}
		}
	}
	z.gameOver = endGameCheck();
}


function canManeuver(player){
	if(player === undefined){
		player = me;
	}
	for(let k = z.spacecraft[player].length-1; k>=0; k--){
		if(z.spacecraft[player][k].timeTokens > 0 || "Ground Habitat" in z.spacecraft[player][k]){
			continue;
		}
		let loc = z.spacecraft[player][k].location;
		for(let conn in map[loc].connections){
			if(map[loc].connections[conn].slingshot){
				if(!slingshotAvailable(map[loc].connections[conn].slingshot)){
					continue;
				}
			}
			if(map[loc].connections[conn].difficulty === 0 || map[loc].connections[conn].aerobrakingDifficulty === 0){
				return true;
			}
			if(map[loc].connections[conn].slow && "Ion Thruster" in z.spacecraft[player][k]){
				return true;
			}
			let rockets = ["Juno","Atlas","Soyuz","Saturn","Proton"];
			for(let j = rockets.length-1; j>=0; j--){
				if(rockets[j] in z.spacecraft[player][k]){
					return true;
				}
			}
			if(z.spacecraft[player][k].availableShuttles() > 0 && "Large Fuel Tank" in z.spacecraft[player][k]){
				return true;
			}
			if(z.spacecraft[player][k].availableDaedalus() > 0 && "Small Fuel Tank" in z.spacecraft[player][k]){
				return true;
			}
		}
	}
	return false;
}


function abortManeuver(){
	delete z.maneuvering;
	delete z.maneuveringDestination;
	delete z.maneuveringTime;
	delete z.maneuveringDifficulty;
	delete z.thrusting;
	delete z.thrust;
	delete z.maneuverHazards;
	delete z.reentryAstronauts;
	delete z.reentryCapsules;
	delete z.justRevealed;
}

function faceReentry(index,drawer){
	if(drawer === undefined){
		drawer = z.turn;
	}
	/* TODO: if you make it autoSuccess by removing one, don't come back here*/
	if(z.reentryAstronauts[index].length === 0){
		plainAlert(z.reentryCapsules[index] + " attempts Atmospheric Entry:");
	} else {
		let alertText = z.reentryCapsules[index] + " (containing ";
		z.reentryAstronauts[index].forEach((astronaut,j)=>{
			if(j !== 0){
				alertText += ", ";
			}
			alertText += astronaut;
		});
		alertText += ") attempts Atmospheric Entry:";
		plainAlert(alertText);
	}
	let outcome = z.advancements[drawer]["Re-entry"].drawOutcome();
	z.lastAdvancement[drawer] = "Re-entry";
	if(outcome === SUCCESS){
		plainAlert("Success!");
		z.reentryCapsules.splice(index,1);
		z.reentryAstronauts.splice(index,1);
		if(z.reentryCapsules.length === 0){
			if(z.maneuverHazards.length === 0 || 10 > z.money[drawer] || ((z.maneuverHazards[0] !== "Landing" || !("Landing" in z.advancements[drawer]) || z.advancements[drawer].Landing.autoSuccess()) && 
												  (z.maneuverHazards[0] !== "Landing (optional)" || ("Landing" in z.advancements[drawer] && z.advancements[drawer].Landing.autoSuccess())))){
				return popHazard(drawer);
			} else {
				addOption(z.turn,"Prepare for Landing",undefined,true);
				return false;
			}
		}
		/* TODO: if only one type, face the next one automatically */
		return false;
	} else if(outcome === MINOR_FAILURE){
		plainAlert("Minor Failure! Capsule damaged.");
		
		z.spacecraft[z.turn][z.maneuvering].removeComponent(z.reentryCapsules[index]);
		z.spacecraft[z.turn][z.maneuvering].addComponent(z.reentryCapsules[index]+" (damaged)");
		z.reentryCapsules.splice(index,1);
		z.reentryAstronauts.splice(index,1);
		if(z.reentryCapsules.length === 0){
			if(z.maneuverHazards.length === 0 || 5 > z.money[drawer] || ((z.maneuverHazards[0] !== "Landing"  && z.maneuverHazards[0] !== "Landing (optional)") || !("Landing" in z.advancements[drawer]) || z.advancements[drawer].Landing.autoSuccess())){
				return popHazard(drawer);
			} else {
				addOption(z.turn,"Prepare for Landing",undefined,true);
				return false;
			}
		}
		return false;
	} else {
		plainAlert("Major Failure! Capsule destroyed!");
		
		z.spacecraft[z.turn][z.maneuvering].removeComponent(z.reentryCapsules[index]);
		for(let astronaut in z.reentryAstronauts[index]){
			z.spacecraft[z.turn][z.maneuvering].killAstronaut(astronaut);
		}
		z.gameOver = endGameCheck();
		z.reentryCapsules.splice(index,1);
		z.reentryAstronauts.splice(index,1);
		if(z.reentryCapsules.length === 0){
			if(!z.spacecraft[z.turn][z.maneuvering].nonEmpty()){
				plainAlert("The "+z.spacecraft[z.turn][z.maneuvering].name+" was destroyed.");
				z.spacecraft[z.turn].splice(z.maneuvering,1);
				abortManeuver();
				return true;
			} else {
				if(z.maneuverHazards.length === 0 || ((z.maneuverHazards[0] !== "Landing"  && z.maneuverHazards[0] !== "Landing (optional)") || !("Landing" in z.advancements[drawer]) || z.advancements[drawer].Landing.autoSuccess())){
					return popHazard(drawer);
				} else {
					addOption(z.turn,"Prepare for Landing",undefined,true);
					return false;
				}
			}
		}
		return false;
	}
}

/* RULES: at the end of 1976/1986, do you deal with end-of-year / arrival hazards?  Do claim any missions on arrival? */
function popHazard(drawer){
	if(drawer === undefined){
		drawer = z.turn;
	}
	let loc = z.spacecraft[z.turn][z.maneuvering].location;
	if(z.maneuverHazards.length === 0){
		if(loc === "Lost"){
			plainAlert("The "+z.spacecraft[z.turn][z.maneuvering].name+" is Lost!");
			z.spacecraft[z.turn][z.maneuvering].killAll();
			z.spacecraft[z.turn].splice(z.maneuvering,1);
			abortManeuver();
			return true;
		}
		if(z.spacecraft[z.turn][z.maneuvering].isLander() && !z.endOfYear){
			let index = z.maneuvering;
			if(missionAvailable("Sounding Rocket") && z.spacecraft[z.turn][index].location !== "Earth"){
				completeMission("Sounding Rocket");
			}
			if(missionAvailable("Lunar Fly-By") && (z.spacecraft[z.turn][index].location === "Lunar Fly-By" || z.spacecraft[z.turn][index].location === "Lunar Orbit")){
				completeMission("Lunar Fly-By");
			} else if(missionAvailable("Venus Fly-By") && (z.spacecraft[z.turn][index].location === "Venus Fly-By" || z.spacecraft[z.turn][index].location === "Venus Orbit")){
				completeMission("Venus Fly-By");
			} else if(missionAvailable("Mars Fly-By") && (z.spacecraft[z.turn][index].location === "Mars Fly-By" || z.spacecraft[z.turn][index].location === "Mars Orbit" || 
														  z.spacecraft[z.turn][index].location === "Mars Cycler")){
				completeMission("Mars Fly-By");
			} else if(missionAvailable("Artificial Satellite") && z.spacecraft[z.turn][index].location === "Earth Orbit"){
				completeMission("Artificial Satellite");
			} else if(missionAvailable("Lunar Lander") && z.spacecraft[z.turn][index].location === "Moon"){
				completeMission("Lunar Lander");
			} else if(missionAvailable("Jupiter Orbiter") && z.spacecraft[z.turn][index].location === "Jupiter Orbit"){
				completeMission("Jupiter Orbiter");
			} else if(missionAvailable("Saturn Orbiter") && z.spacecraft[z.turn][index].location === "Saturn Orbit"){
				completeMission("Saturn Orbiter");
			} else if(missionAvailable(z.spacecraft[z.turn][index].location + " Lander")){
				completeMission(z.spacecraft[z.turn][index].location + " Lander");
			}
		}
		if(z.spacecraft[z.turn][z.maneuvering].isHabitat() && !z.endOfYear){
			let index = z.maneuvering;
			if(missionAvailable("Orbital Habitat") && z.spacecraft[z.turn][index].location === "Earth Orbit"){
				completeMission("Orbital Habitat");
			} else if(missionAvailable("Lunar Habitat") && z.spacecraft[z.turn][index].location === "Moon"){
				completeMission("Lunar Habitat");
			} else if(missionAvailable("Mars Orbit Habitat") && z.spacecraft[z.turn][index].location === "Mars Orbit") {
				completeMission("Mars Orbit Habitat");
			}
		}
		
		if(!z.stations){
			if(z.spacecraft[z.turn][z.maneuvering].location !== "Earth"){
				z.spacecraft[z.turn][z.maneuvering].visited("Space");
			}
			switch(z.spacecraft[z.turn][z.maneuvering].location){
				case "Earth Orbit":
				case "Moon":
				case "Mars":
				case "Venus":
				case "Jupiter Fly-By":
				case "Saturn Fly-By":
				case "Titan":
					z.spacecraft[z.turn][z.maneuvering].visited(z.spacecraft[z.turn][z.maneuvering].location);
					break;
			}
		} else {
			if(z.spacecraft[z.turn][z.maneuvering].location !== "Earth"){
				z.spacecraft[z.turn][z.maneuvering].visited("Space",z.countries[z.turn]);
			}
			switch(z.spacecraft[z.turn][z.maneuvering].location){
				case "Earth Orbit":
				case "Lunar Fly-By":
				case "Lunar Orbit":
				case "Mars Fly-By":
				case "Mars Orbit":
				case "Mars Cycler":
				case "Moon":
				case "Venus Fly-By":
				case "Venus Orbit":
				case "Phobos":
				case "Ceres":
				case "Mars":
				case "Mercury":
				case "Venus":
				case "Jupiter Fly-By":
				case "Saturn Fly-By":
				case "Titan":
					z.spacecraft[z.turn][z.maneuvering].visited(z.spacecraft[z.turn][z.maneuvering].location,z.countries[z.turn]);
					break;
			}
		}
		/* RULES: if I give an astronaut away to another country... */
		let country = z.countries[z.turn];
		if(!z.stations){
			country = undefined;
		}
		if(z.spacecraft[z.turn][z.maneuvering].location === "Earth"){
			if(z.spacecraft[z.turn][z.maneuvering].infected && !z.infectionOnEarth){
				plainAlert(z.countries[z.turn]+" spreads the infection to Earth and loses 10 points!");
				z.pointCards[z.turn].push("Infection");
				z.points[z.turn] -= 10;
				z.infectionOnEarth = true;
			}

			z.spacecraft[z.turn][z.maneuvering].claimManOn(country);
			z.spacecraft[z.turn][z.maneuvering].claimSampleReturn();
			/* RULES: experiment completion */
		}
		if(z.spacecraft[z.turn][z.maneuvering].location === "Moon" && z.stations && z.features["Moon"].includes("Infected")){
			z.spacecraft[z.turn][z.maneuvering].infected = true;
		}

		abortManeuver();
		/* fine to return true here even if we need to do things */
		return true;
	}
	let hazard = z.maneuverHazards.pop();
	if(hazard === "Time"){
		z.spacecraft[z.turn][z.maneuvering].timeTokens = z.maneuveringTime;
		let s = "";
		if(z.maneuveringTime > 1){
			s = "s";
		}
		plainAlert(z.maneuveringTime + " Time Token"+s+" placed on the "+z.spacecraft[z.turn][z.maneuvering].name+".");
		z.spacecraft[z.turn][z.maneuvering].arrivalHazards = z.maneuverHazards;
		abortManeuver();
		return true;
	} else if(hazard === "Aerobraking"){
		if(!("Aerobraking" in z.advancements[drawer])){
			plainAlert(z.countries[drawer] + " does not have the Aerobraking advancement; the "+z.spacecraft[z.turn][z.maneuvering].name+" is destroyed.");
			z.spacecraft[z.turn][z.maneuvering].killAll();
			z.spacecraft[z.turn].splice(z.maneuvering,1);
			abortManeuver();
			return true;
		} else if(z.advancements[drawer].Aerobraking.autoSuccess()){
			plainAlert("Aerobraking successful.");
			return popHazard(drawer);
		} else {
			let outcome = z.advancements[drawer].Aerobraking.drawOutcome();
			plainAlert("The "+z.spacecraft[z.turn][z.maneuvering].name+" attempts to Aerobrake:");
			z.lastAdvancement[drawer] = "Aerobraking";
			if(outcome === MAJOR_FAILURE){
				plainAlert("Major Failure! The "+z.spacecraft[z.turn][z.maneuvering].name + " is destroyed!");
				z.spacecraft[z.turn][z.maneuvering].killAll();
				z.spacecraft[z.turn].splice(z.maneuvering,1);
				abortManeuver();
				return true;
			} else if(outcome === SUCCESS){
				/* There's never any hazard after aerobraking (barring minor failure) */
				plainAlert("Success!");
				return popHazard(drawer);
			} else if(outcome === MINOR_FAILURE){
				plainAlert("Minor Failure! A component must be damaged.");
				z.maneuverHazards.push("Atmospheric Entry");
				if(z.spacecraft[z.turn][z.maneuvering].undamagedTypes() === 0){
					plainAlert("There are no components to damage; the "+z.spacecraft[z.turn][z.maneuvering].name + " is destroyed!");
					z.spacecraft[z.turn][z.maneuvering].killAll();
					z.spacecraft[z.turn].splice(z.maneuvering,1);
					abortManeuver();
					return true;
				} else {
					/* if there's only one component, we still need to pause before re-entry */
					addOption(z.turn,"[Aerobraking] Damage a component",z.maneuvering,true);
					return false;
				}
			}
		}
	} else if(hazard === "Atmospheric Entry"){
		if(z.spacecraft[z.turn][z.maneuvering].capsules() === 0){
			plainAlert("The "+z.spacecraft[z.turn][z.maneuvering].name+" has no capsules, and is unaffected by Atmospheric Entry.");
			return popHazard(drawer);
		} else if(!("Re-entry" in z.advancements[drawer])){
			plainAlert(z.countries[drawer] + " does not have the Re-entry advancement; all capsules on the "+z.spacecraft[z.turn][z.maneuvering].name+" are destroyed.");
			z.spacecraft[z.turn][z.maneuvering].destroyCapsules();
			if(!z.spacecraft[z.turn][z.maneuvering].nonEmpty()){
				plainAlert("The "+z.spacecraft[z.turn][z.maneuvering].name+" was destroyed.");
				z.spacecraft[z.turn].splice(z.maneuvering,1);
				abortManeuver();
				return true;
			} else {
				return popHazard(drawer);
			}
		} else if(z.spacecraft[z.turn][z.maneuvering].heatShieldCapsules() === 0){
			plainAlert("None of the capsules on the "+z.spacecraft[z.turn][z.maneuvering].name+" have working heat shields; all capsules are destroyed.");
			z.spacecraft[z.turn][z.maneuvering].destroyCapsules();
			if(!z.spacecraft[z.turn][z.maneuvering].nonEmpty()){
				plainAlert("The "+z.spacecraft[z.turn][z.maneuvering].name+" was destroyed.");
				z.spacecraft[z.turn].splice(z.maneuvering,1);
				abortManeuver();
				return true;
			} else {
				return popHazard(drawer);
			}
		} else if(z.advancements[drawer]["Re-entry"].autoSuccess() && z.spacecraft[z.turn][z.maneuvering].heatShieldCapsules() === z.spacecraft[z.turn][z.maneuvering].capsules()){
			plainAlert("Atmospheric Entry successful.");
			return popHazard(drawer);
		} else if(z.spacecraft[z.turn][z.maneuvering].numAstronauts() > 0 && z.spacecraft[z.turn][z.maneuvering].capsules() > 1){
			plainAlert("All astronauts on the "+z.spacecraft[z.turn][z.maneuvering].name+" must now take their seats.");
			let capsules = ["Vostok","Vostok (used)","Apollo","Apollo (used)","Eagle","Eagle (used)","Eagle (damaged)","Eagle (used) (damaged)","Aldrin","Aldrin (used)","Aldrin (damaged)","Aldrin (used) (damaged)",
							"Vostok (damaged)","Vostok (used) (damaged)","Apollo (damaged)","Apollo (used) (damaged)"];
			z.reentryCapsules = [];
			z.reentryAstronauts = [];
			capsules.forEach((capsule)=>{
				if(capsule in z.spacecraft[z.turn][z.maneuvering]){
					for(let j = z.spacecraft[z.turn][z.maneuvering][capsule]; j>0; j--){
						z.reentryCapsules.push(capsule);
						z.reentryAstronauts.push([]);
					}
				}
			});
			addOption(z.turn,"[Re-entry] Assign astronauts to seats",undefined,true);
			return false;
		} 
		if(z.spacecraft[z.turn][z.maneuvering].numAstronauts() === 0){
			let anyDestroyed = false;
			for(let component in z.spacecraft[z.turn][z.maneuvering]){
				if(component.startsWith("Eagle") || component.startsWith("Aldrin") || component.endsWith("(damaged)") || component.startsWith("Space Habitat")){
					z.spacecraft[z.turn][z.maneuvering].removeComponent(component,z.spacecraft[z.turn][z.maneuvering][component]);
					anyDestroyed = true;
				}
			}
			if(anyDestroyed){
				plainAlert("All capsules without working heat shields on the "+z.spacecraft[z.turn][z.maneuvering].name+" are destroyed.");
			}
		}		
		if(z.advancements[drawer]["Re-entry"].autoSuccess()){
			plainAlert("Atmospheric Entry successful.");
			return popHazard(drawer);
		} else {			
			z.reentryCapsules = [];
			z.reentryAstronauts = [];
			let capsules = ["Vostok","Vostok (used)","Apollo","Apollo (used)"];
			let numTypes = 0;
			capsules.forEach((capsule)=>{
				if(capsule in z.spacecraft[z.turn][z.maneuvering]){
					numTypes++;
					for(let j = z.spacecraft[z.turn][z.maneuvering][capsule]; j>0; j--){
						z.reentryCapsules.push(capsule);
						z.reentryAstronauts.push([]);
					}
				}
			});
			if(z.reentryCapsules.length === 1){
				for(let astronaut in z.spacecraft[z.turn][z.maneuvering].astronauts){
					z.reentryAstronauts[0].push(astronaut);
				}
			}
			if(numTypes === 1){
				return faceReentry(0,meReal);
			} else {
				plainAlert("Each capsule on the "+z.spacecraft[z.turn][z.maneuvering].name + " must now face Re-entry.");
				return false;
			}
		}
	} else if(hazard === "Landing"){
		if(!("Landing" in z.advancements[drawer])){
			plainAlert(z.countries[drawer]+" does not have the Landing advancement; the "+z.spacecraft[z.turn][z.maneuvering].name+" is destroyed!");
			z.spacecraft[z.turn][z.maneuvering].killAll();
			z.spacecraft[z.turn].splice(z.maneuvering,1);
			abortManeuver();
			return true;
		} else if(z.advancements[drawer].Landing.autoSuccess()){
			plainAlert("Landing successful.");
			return popHazard(drawer);
		} else {
			plainAlert("The "+z.spacecraft[z.turn][z.maneuvering].name+" attempts Landing:");
			let outcome = z.advancements[drawer].Landing.drawOutcome();
			z.lastAdvancement[drawer] = "Landing";
			if(outcome === SUCCESS){
				/* no advancement hazards after landing */
				plainAlert("Success!");
				return popHazard(drawer);
			} else if (outcome === MINOR_FAILURE){
				let pilot = undefined;
				for(let astronaut in z.spacecraft[z.turn][z.maneuvering].astronauts){
					if(z.spacecraft[z.turn][z.maneuvering].astronauts[astronaut].type === "Pilot" &&
					   !z.spacecraft[z.turn][z.maneuvering].astronauts[astronaut].incapacitated){
						pilot = astronaut;
						break;
					}
				}
				if(pilot){
					plainAlert("Minor Failure!  Damage averted by the quick action of "+pilot+".");
					return popHazard(drawer);
				} else {
					plainAlert("Minor Failure!  One component must be damaged.");
					let numTypes = z.spacecraft[z.turn][z.maneuvering].undamagedTypes();
					if(numTypes === 0){
						plainAlert("There are no components to damage; the "+z.spacecraft[z.turn][z.maneuvering].name + " is destroyed!");
						z.spacecraft[z.turn][z.maneuvering].killAll();
						z.spacecraft[z.turn].splice(z.maneuvering,1);
						abortManeuver();
						return true;
					} else if(numTypes === 1){
						for(let astronaut in z.spacecraft[z.turn][z.maneuvering].astronauts){
							if(!z.spacecraft[z.turn][z.maneuvering].astronauts[astronaut].incapacitated){
								plainAlert(astronaut + " is incapacitated.");
								z.spacecraft[z.turn][z.maneuvering].astronauts[astronaut].incapacitated = true;
								break;
							}
						}
						for(let component in z.spacecraft[z.turn][z.maneuvering]){
							if(component in componentMasses && damageable(component)){
								plainAlert(component + " on the " + z.spacecraft[z.turn][z.maneuvering].name + " is damaged.");
								z.spacecraft[z.turn][z.maneuvering].damageComponent(component);
								break;
							}
						}
						return popHazard(drawer);
					} else {
						addOption(z.turn,"[Landing] Damage a component",z.maneuvering,true);
						return false;
					}
				}
			} else if(outcome === MAJOR_FAILURE){
				plainAlert("Major Failure!  The "+z.spacecraft[z.turn][z.maneuvering].name+" is destroyed!");
				z.spacecraft[z.turn][z.maneuvering].killAll();
				z.spacecraft[z.turn].splice(z.maneuvering,1);
				abortManeuver();
				return true;
			}
		}
	} else if(hazard === "Landing (optional)"){
		if("Landing" in z.advancements[drawer] && z.advancements[drawer].Landing.autoSuccess()){
			return popHazard(drawer);
		} else {
			plainAlert("The "+z.spacecraft[z.turn][z.maneuvering].name+" may optionally attempt Landing.");
			addOption(z.turn,"Attempt the optional Landing",undefined,true);
			addOption(z.turn,"Do not attempt the optional Landing",undefined,true);
			return false;
		}
	} else if(!z.revealed[hazard]){
		
		if(me === z.turn){
			t.value += "The "+z.spacecraft[z.turn][z.maneuvering].name+" encounters "+hazard+".\r\n";
			addAlert("The "+z.spacecraft[z.turn][z.maneuvering].name+" encounters "+hazard+", which is "+z.hazard[hazard]+".\nYou may either reveal this hazard or destroy the spacecraft.");
		} else {
			plainAlert("The "+z.spacecraft[z.turn][z.maneuvering].name+" encounters "+hazard+"; "+z.countries[z.turn]+" may either reveal this hazard or destroy the spacecraft.");
		}
		z.known[z.turn][hazard] = true;
		addOption(z.turn,"Decide whether to reveal the encountered hazard",hazard,true);
		return false;
	} else if(z.hazard[hazard].startsWith("Spacecraft Destroyed")) {
		/* Venus, Moon, Europa */
		plainAlert("The "+z.spacecraft[z.turn][z.maneuvering].name+" encounters "+hazard+", and is destroyed!");
		z.spacecraft[z.turn][z.maneuvering].killAll();
		z.spacecraft[z.turn].splice(z.maneuvering,1);
		abortManeuver();
		return true;
	} else if(z.endOfYear && hazard === "Mercury"){
		if(z.hazard[hazard] === "Time: Sickness (1)"){
			if(z.spacecraft[z.turn][z.maneuvering].rollSickness(1,1)){
				return popHazard(drawer);
			} else {
				/* TODO: this */
				return false;
			}
		} else {
			return popHazard(drawer);
		}
	} else if(z.endOfYear && hazard === "Venus"){
		if(z.hazard[hazard].includes("Spacecraft Destroyed")){
			plainAlert("The "+z.spacecraft[z.turn][z.maneuvering].name+" is destroyed on the Venutian surface!");
			z.spacecraft[z.turn][z.maneuvering].killAll();
			z.spacecraft[z.turn].splice(z.maneuvering,1);
			abortManeuver();
			return true;
		} else {
			return popHazard(drawer);
		}
	} else if(z.endOfYear && hazard === "Mars"){
		if(z.hazard[hazard] === "2 Features + CO2 + Time: Sickness (2)"){
			if(z.spacecraft[z.turn][z.maneuvering].rollSickness(2,1)){
				return popHazard(drawer);
			} else {
				/* TODO: this */
				return false;
			}
		} else {
			return popHazard(drawer);
		}
	} else if (hazard === "Venus" && z.hazard[hazard].includes("Pressure")){
		let roll = getDieRoll();
		if(4 >= roll){
			plainAlert(z.countries[z.turn]+" rolls "+roll+"; they must damage a component on the "+z.spacecraft[z.turn][z.maneuvering].name+".");
			let numTypes = z.spacecraft[z.turn][z.maneuvering].undamagedTypes();
			if(numTypes === 0){
				plainAlert("There are no components to damage; the "+z.spacecraft[z.turn][z.maneuvering].name + " is destroyed!");
				z.spacecraft[z.turn][z.maneuvering].killAll();
				z.spacecraft[z.turn].splice(z.maneuvering,1);
				abortManeuver();
				return true;
			} else if(numTypes === 1){
				for(let astronaut in z.spacecraft[z.turn][z.maneuvering].astronauts){
					if(!z.spacecraft[z.turn][z.maneuvering].astronauts[astronaut].incapacitated){
						plainAlert(astronaut + " is incapacitated.");
						z.spacecraft[z.turn][z.maneuvering].astronauts[astronaut].incapacitated = true;
						break;
					}
				}
				for(let component in z.spacecraft[z.turn][z.maneuvering]){
					if(component in componentMasses && damageable(component)){
						plainAlert(component + " on the " + z.spacecraft[z.turn][z.maneuvering].name + " is damaged.");
						z.spacecraft[z.turn][z.maneuvering].damageComponent(component);
						break;
					}
				}
				return popHazard(drawer);
			} else {
				addOption(z.turn,"[Venus] Damage a component",z.maneuvering,true);
				return false;
			}
		} else {
			plainAlert(z.countries[z.turn]+" rolls "+roll+"; Venus damage avoided.");
			return popHazard(drawer);
		}
	} else if(z.stations && !z.justRevealed && (hazard === "Venus" || hazard === "Moon" || hazard === "Mars" || hazard === "Phobos" || hazard === "Ceres") && maxFeatures(hazard) > z.features[hazard].length && 
	          z.spacecraft[z.turn][z.maneuvering].workingProbesCapsules() > 0){
		let alertText = "The "+z.spacecraft[z.turn][z.maneuvering].name+" may explore a new feature on ";
		if(hazard === "Moon"){
			alertText += "the ";
		}
		alertText += hazard + ".";
		plainAlert(alertText);
		addOption(z.turn,"Explore a Feature",undefined,true);
		addOption(z.turn,"Do not Explore a Feature",undefined,true);
		return false;
	} else if(hazard === "Suborbital Space"){
		/* no Aldrin or Habitat issues here */
		if(z.hazard[hazard] === "Sickness (1)"){
			z.spacecraft[z.turn][z.maneuvering].rollSickness(1,0);
		} else if(z.hazard[hazard] === "Sickness (3)"){
			z.spacecraft[z.turn][z.maneuvering].rollSickness(3,0);
		} 
		return popHazard(drawer);	
	} else if(hazard === "Solar Radiation"){
		if(z.hazard[hazard] === "Sickness (Time)"){
			if(z.spacecraft[z.turn][z.maneuvering].rollSickness(z.maneuveringTime,z.maneuveringTime)){
				return popHazard(drawer);
			} else {
				return false;
				/* TODO: this */
			}
		} else if(z.hazard[hazard] === "Sickness (2 x Time)"){
			if(z.spacecraft[z.turn][z.maneuvering].rollSickness(2*z.maneuveringTime,z.maneuveringTime)){
				return popHazard(drawer);
			} else {
				/* TODO: this */
				return false;
			}
		} else if (z.hazard[hazard] === "Sickness (3 x Time) + Radiation (Time)") {
			z.spacecraft[z.turn][z.maneuvering].rollRadiation(z.maneuveringTime,z.maneuveringTime);
			if(z.spacecraft[z.turn][z.maneuvering].rollSickness(3*z.maneuveringTime,z.maneuveringTime)){
				return popHazard(drawer);
			} else {
				/* TODO: this */
				return false;
			}
		} else {
			return popHazard(drawer);
		}
	} else if(hazard === "Jupiter"){
		if(z.hazard[hazard] === "Sickness (6) + Radiation (4) + Alpha"){
			z.spacecraft[z.turn][z.maneuvering].rollRadiation(4,1);
			if(z.spacecraft[z.turn][z.maneuvering].rollSickness(6,1)){
				return popHazard(drawer);
			} else {
				/* TODO: this */
				return false;
			}				
		} else if(z.hazard[hazard] === "Sickness (3) + Radiation (1) + Beta"){
			z.spacecraft[z.turn][z.maneuvering].rollRadiation(1,1);
			if(z.spacecraft[z.turn][z.maneuvering].rollSickness(3,1)){
				return popHazard(drawer);
			} else {
				/* TODO: this */
				return false;
			}			
		} else {
			if(z.spacecraft[z.turn][z.maneuvering].rollSickness(1,1)){
				return popHazard(drawer);
			} else {
				/* TODO: this */
				return false;
			}
		}
	} else if(hazard === "Saturn"){
		if(z.hazard[hazard] === "Sickness (2) + Beta"){
			if(z.spacecraft[z.turn][z.maneuvering].rollSickness(2,1)){
				return popHazard(drawer);
			} else {
				/* TODO: this */
				return false;
			}
		} else if(z.hazard[hazard] === "Debris (2) + Alpha"){
			let roll = getDieRoll();
			if(2 >= roll){
				plainAlert(z.countries[z.turn]+" rolls "+roll+"; they must damage a component on the "+z.spacecraft[z.turn][z.maneuvering].name+".");
				let numTypes = z.spacecraft[z.turn][z.maneuvering].undamagedTypes();
				if(numTypes === 0){
					plainAlert("There are no components to damage; the "+z.spacecraft[z.turn][z.maneuvering].name + " is destroyed!");
					z.spacecraft[z.turn][z.maneuvering].killAll();
					z.spacecraft[z.turn].splice(z.maneuvering,1);
					abortManeuver();
					return true;
				} else if(numTypes === 1){
					for(let astronaut in z.spacecraft[z.turn][z.maneuvering].astronauts){
						if(!z.spacecraft[z.turn][z.maneuvering].astronauts[astronaut].incapacitated){
							plainAlert(astronaut + " is incapacitated.");
							z.spacecraft[z.turn][z.maneuvering].astronauts[astronaut].incapacitated = true;
							break;
						}
					}
					for(let component in z.spacecraft[z.turn][z.maneuvering]){
						if(component in componentMasses && damageable(component)){
							plainAlert(component + " on the " + z.spacecraft[z.turn][z.maneuvering].name + " is damaged.");
							z.spacecraft[z.turn][z.maneuvering].damageComponent(component);
							break;
						}
					}
					return popHazard(drawer);
				} else {
					addOption(z.turn,"[Saturn] Damage a component",z.maneuvering,true);
					return false;
				}
			} else {
				plainAlert(z.countries[z.turn]+" rolls "+roll+"; Saturn damage avoided.");
				return popHazard(drawer);
			}
		} else {
			return popHazard(drawer);
		}
		
	} else {
		return popHazard(drawer);
	}
	
}



function canFireAnything(){
	let rockets = ["Juno","Atlas","Soyuz","Saturn","Proton"];
	for(let k = rockets.length-1; k>=0; k--){
		let rocket = rockets[k];
		if(rocket in z.spacecraft[z.turn][z.maneuvering]){
			return true;
		}
	}
	if(z.maneuveringTime > 0 && "Ion Thruster" in z.spacecraft[z.turn][z.maneuvering]){
		return true;
	}
	if(z.spacecraft[z.turn][z.maneuvering].availableShuttles() > 0 && "Large Fuel Tank" in z.spacecraft[z.turn][z.maneuvering]){
		return true;
	}
	if(z.spacecraft[z.turn][z.maneuvering].availableDaedalus() > 0 && "Small Fuel Tank" in z.spacecraft[z.turn][z.maneuvering]){
		return true;
	}
	return false;
}

function identicalReentry(){
	let multipleTypes = false;
	let firstType = z.reentryCapsules[0];
	for(let k = z.reentryCapsules.length - 1; k > 0; k--){
		if(z.reentryCapsules[k] !== firstType){
			multipleTypes = true;
			break;
		}
	}
	if(!multipleTypes && z.reentryCapsules.length > 1){
		for(let k = z.reentryAstronauts.length-1; k>=0; k--){
			if(z.reentryAstronauts[k].length > 0){
				multipleTypes = true;
				break;
			}
		}
	}
	return !multipleTypes;
}


function canSell(country){
	if(country === undefined){
		country = me;
	}
	
	if(z.action || z.turnNumber >= z.numPlayers){
		return false;
	}
	let mineralTypes = [];
	for(let hazard in z.hazard){
		if(z.hazard[hazard].includes("Minerals") && z.revealed[hazard]){
			mineralTypes.push(hazard + " Sample");
		} else if(z.stations && hazard in z.features && 
		   (z.features[hazard].includes("Gold") || z.features[hazard].includes("Cobalt") || z.features[hazard].includes("Rhodium") || z.features[hazard].includes("Germanium") || z.features[hazard].includes("Ruthenium"))){
			
			mineralTypes.push(hazard + " Sample");
		}
		if(z.stations && hazard in z.features && (z.features[hazard].includes("Rhodium") || z.features[hazard].includes("Germanium"))){
			mineralTypes.push("Fossil?");
		}
	}
	mineralTypes.push("Palladium");
	mineralTypes.push("Platinum");
	mineralTypes.push("Iridium");
	for(let k = mineralTypes.length-1; k>=0; k--){
		let sample = mineralTypes[k];
		if(sample in z.hq[country]){
			return true;
		}
		for(let j = z.spacecraft[country].length-1; j>=0; j--){
			if(z.spacecraft[country][j].location === "Earth" && sample in z.spacecraft[country][j]){
				return true;
			}
		}
	}
	return false;
}

function canAlienObject(country){
	if(country === undefined){
		country = me;
	}
	
	let sample = "Alien Object";
	if(sample in z.hq[country]){
		return true;
	}
	for(let j = z.spacecraft[country].length-1; j>=0; j--){
		if(z.spacecraft[country][j].location === "Earth" && sample in z.spacecraft[country][j]){
			return true;
		}
	}
	return false;
	
}
	

function canSellPhobos(country){
	if(country === undefined){
		country = me;
	}
	
	if(z.action || z.turnNumber >= z.numPlayers){
		return false;
	}
	if(z.hazard["Phobos"] !== "Alien Origin" || !z.revealed["Phobos"]){
		return false;
	}
	let foundIt = "Phobos Sample" in z.hq[country];
	if(!foundIt){
		for(let k = z.spacecraft[country].length-1; k>=0; k--){
			if(z.spacecraft[country][k].location === "Earth" && "Phobos Sample" in z.spacecraft[country][k]){
				foundIt = true;
				break;
			}
		}
	}
	if(!foundIt){
		return false;
	}
	for(let j = 0; !(j>=advancementNames.length); j++){
		
		let advancement = advancementNames[j];
		if(!(advancement in z.advancements[country])){
			return true;
		}
		if(z.advancements[country][advancement].outcomes.length !== 0){
			return true;
		}
	}
	if(z.outer){
		if(!("Aerobraking" in z.advancements[country]) || z.advancements[country].Aerobraking.outcomes.length !== 0){
			return true;
		}
		if(!("Proton Rockets" in z.advancements[country]) || z.advancements[country]["Proton Rockets"].outcomes.length !== 0){
			return true;
		}
	}
	return false;
}



function canEndTurn(){
	if(z.turn >= z.numPlayers){
		return false;
	}
	for(let k = z.spacecraft[z.turn].length-1; k>=0; k--){
		if(z.spacecraft[z.turn][k].timeTokens === 0){
			let loc = z.spacecraft[z.turn][k].location;
			for(let conn in map[loc].connections){
				if(map[loc].connections[conn].automatic){
					return false;
				}
			}
		}
	}
	if(z.stations){
		for(let j = z.numPlayers; !(j>=z.spacecraft.length); j++){
			if(z.shares[j][z.turn] === 0){
				continue;
			}
			for(let k = z.spacecraft[j].length-1; k>=0; k--){
				if(z.spacecraft[j][k].timeTokens === 0 && z.spacecraft[j][k].didSomething){
					let loc = z.spacecraft[j][k].location;
					for(let conn in map[loc].connections){
						if(map[loc].connections[conn].automatic){
							return false;
						}
					}
				}
			}
		}
	}
	if(z.stations && z.numPlayers > 1){
		for(let j = 0; !(j>=z.shares.length); j++){
			if(z.shares[j][me] === 10){
				return false;
			}
		}
	}
	return true;
}

function canRemoveOneOutcome(player){
	
	if(player === undefined){
		player = meReal;
	}
	for(let advancement in z.advancements[player]){
		if(z.advancements[player][advancement].autoSuccess() && z.advancements[player][advancement].outcomes.length === 1){
			return true;
		}
	}
	return false;
}

function revealFeature(){
	let feature = z.featureDecks[z.spacecraft[z.turn][z.maneuvering].location].pop();
	boldAlert(z.countries[z.turn]+" reveals "+feature+".");
	switch(feature){
		case "Armalcolite":
		case "Horizon Glow":
		case "Fluorescence":
		case "Aurora":
		case "Methane":
		case "Hematite":
		case "Water Ice":
		case "Volcanoes":
		case "Kelp Forests":
		case "Limestone":
			z.pointCards[z.turn].push(feature);
			z.points[z.turn] += 2;
			boldAlert(z.countries[z.turn]+ " gains 2 points.");
			return true;
		case "Liquid Water":
			z.pointCards[z.turn].push(feature);
			z.points[z.turn] += 4;
			boldAlert(z.countries[z.turn]+ " gains 4 points.");
			return true;
		case "Desolation":
		case "Rocky Desert":
		case "Gold":
		case "Cobalt":
		case "Palladium":
		case "Rhodium":
		case "Germanium":
		case "Fossil?":
		case "Platinum":
		case "Iridium":
		case "Mars Caves":
		case "Lunar Caves":
		case "Rubble":
		case "Wreckage":
		case "Alien Object":
		case "Phobos Caves":
		case "Barren":
		case "Ruthenium":
		case "Mud Flats":		
			z.features[z.spacecraft[z.turn][z.maneuvering].location].push(feature);
			return true;
		case "Edible Plants":
		case "Microbes":
		case "Lichens":
			z.features[z.spacecraft[z.turn][z.maneuvering].location].push(feature);
			if(missionAvailable("Extraterrestrial Life Survey")){
				completeMission("Extraterrestrial Life Survey",z.countries[z.turn]);
			}
			return true;
		case "Infection":
			z.features[z.spacecraft[z.turn][z.maneuvering].location].push(feature);
			if(missionAvailable("Extraterrestrial Life Survey")){
				completeMission("Extraterrestrial Life Survey",z.countries[z.turn]);
			}
			for(let j = 0; !(j>=z.spacecraft.length); j++){
				for(let k = 0; !(k>=z.spacecraft[j].length); k++){
					if(z.spacecraft[j][k].location === "Moon"){
						z.spacecraft[j][k].infected = true;
					}
				}
			}
			return true;
		case "Dust":
			plainAlert("Dust destroys the "+z.spacecraft[z.turn][z.maneuvering].name+".");
			z.spacecraft[z.turn][z.maneuvering].killAll();
			z.spacecraft[z.turn].splice(z.maneuvering,1);
			abortManeuver();
			return false;
		case "Badlands": {
			z.features[z.spacecraft[z.turn][z.maneuvering].location].push(feature);
			let roll = getDieRoll();
			if(roll > 2){
				plainAlert("The "+z.spacecraft[z.turn][z.maneuvering].name+" escapes damage.");
				return true;
			} else {
				let numTypes = z.spacecraft[z.turn][z.maneuvering].undamagedTypes();
				if(numTypes === 0){
					plainAlert("There are no undamaged components left on the "+z.spacecraft[z.turn][z.maneuvering].name+"; it is destroyed");
					z.spacecraft[z.turn][z.maneuvering].killAll();
					z.spacecraft[z.turn].splice(z.maneuvering,1);
					abortManeuver();
					return false;
				} else if(numTypes === 1){
					for(let astronaut in z.spacecraft[z.turn][z.maneuvering].astronauts){
						if(!z.spacecraft[z.turn][z.maneuvering].astronauts[astronaut].incapacitated){
							plainAlert(astronaut + " is incapacitated.");
							z.spacecraft[z.turn][z.maneuvering].astronauts[astronaut].incapacitated = true;
							break;
						}
					}
					for(let component in z.spacecraft[z.turn][z.maneuvering]){
						if(component in componentMasses && damageable(component)){
							plainAlert(component + " on the " + z.spacecraft[z.turn][z.maneuvering].name + " is damaged.");
							z.spacecraft[z.turn][z.maneuvering].damageComponent(component);
							break;
						}
					}
					return true;
				} else {
					plainAlert(z.countries[z.turn] + " must damage a component on the "+z.spacecraft[z.turn][z.maneuvering].name+".");
					addOption(z.turn,"[Badlands] Damage a component",z.maneuvering,true);
					return false;
				}
				
			}
			
		}
		break;
		default:
			plainAlert("Error: Feature not found.");
			return true;			
	}
}

function canRendezvousPay(player){
	if(player === undefined){
		player = meReal;
	}
	return z.money[player] >= 10 && "Rendezvous" in z.advancements[player] && z.advancements[player].Rendezvous.autoSuccess() && z.advancements[player].Rendezvous.outcomes.length > 1;
}

function canRoverPay(player){
	if(player === undefined){
		player = meReal;
	}
	return z.money[player] >= 10 && "Rover" in z.advancements[player] && z.advancements[player].Rover.autoSuccess() && z.advancements[player].Rover.outcomes.length === 2;
}

function anyMandatory(country) {
	if(country === undefined){
		country = me;
	}
	for(let k = z.crisisOptions[country].length-1; k>=0; k--) {
		if(z.mandatory[country][k]) {
			return true;
		}
	}
	
	return false;
}

function addOption(player, opt, con, man) {
	for(let j = z.crisisOptions[player].length-1; j>=0; j--) {
		if(z.crisisOptions[player][j] === opt) {
			z.context[player][j] = con;
			z.mandatory[player][j] = man;
			return false;
		}
	}
	z.crisisOptions[player].push(opt);
	z.context[player].push(con);
	z.mandatory[player].push(man);
}

function removeOption(player, opt) {
	for(let j = 0; !(j >= z.crisisOptions[player].length); j++) {
		if(z.crisisOptions[player][j] === opt) {
			z.crisisOptions[player].splice(j, 1);
			z.context[player].splice(j, 1);
			z.mandatory[player].splice(j, 1);
			j--;
		}
	}
}

function getContext(player, opt) {
	for(let j = z.crisisOptions[player].length-1; j>=0; j--) {
		if(z.crisisOptions[player][j] === opt) {
			return z.context[player][j];
		}
	}
}


function clearBackground() {
	hideElement(alertifyBackground);
}

function deserializeSpacecraft(spacecraft){
	let clone = new Spacecraft(spacecraft.name,spacecraft.location);
	for(let component in spacecraft){
		if(component in componentMasses){
			clone[component] = spacecraft[component];
		}
	}
	if("arrivalHazards" in spacecraft){
		clone.arrivalHazards = spacecraft.arrivalHazards;
	}
	if("infected" in spacecraft){
		clone.infected = spacecraft.infected;
	}
	if("burntShuttles" in spacecraft){
		clone.burntShuttles = spacecraft.burntShuttles;
	}
	if("burntDaedalus" in spacecraft){
		clone.burntDaedalus = spacecraft.burntDaedalus;
	}
	if("didSomething" in spacecraft){
		clone.didSomething = spacecraft.didSomething;
	}
	clone.timeTokens = spacecraft.timeTokens;
	clone.burntMass = spacecraft.burntMass;
	clone.astronauts = spacecraft.astronauts;
	return clone;
}

var menuPage = "Default";
var reGlobal = new RegExp(/\[size=(1|0)\]\[color=#(F4F4FF|FFFFFF)\](New|LEN) seed: \S+\[\/color\]\[\/size\]/, "g");
if(t === undefined) {
	alert("Leaving Earth only works while creating or editing a post on the BGG forums.");
	clearBackground();
} else {
	var seed = reGlobal.exec(t.value);
	if(seed === null) {
		seed = "";
	} else {
		seed = seed[0].slice(33, -15);
	}
	if(seed === "") {
		confirmify("Would you like to start a new game?", clearBackground, gameSetup, "YES", "NO");
		seed = null;
	}
	if(seed !== null) {
		seed = window.atob(seed.replace(/-/g, ""));
		z = JSON.parse(seed);
		if(!("seed" in z)){
			z.seed = Math.floor(Math.random() * mLCG);
		}
		
		z.advancements.forEach((x,j)=>{
			for(let advancement in z.advancements[j]){
				let clone = new Advancement(0);
				clone.outcomes = z.advancements[j][advancement].outcomes;
				clone.lastOutcome = z.advancements[j][advancement].lastOutcome;
				clone.successExists = z.advancements[j][advancement].successExists;
				clone.seed = z.advancements[j][advancement].seed;
				if("rover" in z.advancements[j][advancement]){
					clone.rover = z.advancements[j][advancement].rover;
				}
				if("doubleSuccessExists" in z.advancements[j][advancement]){
					clone.doubleSuccessExists = z.advancements[j][advancement].doubleSuccessExists;
				}
				if("autoRendezvous" in z.advancements[j][advancement]){
					clone.autoRendezvous = z.advancements[j][advancement].autoRendezvous;
				}
				if("rendezvousReserve" in z.advancements[j][advancement]){
					clone.rendezvousReserve = z.advancements[j][advancement].rendezvousReserve;
				}
				if("backup" in z.advancements[j][advancement]){
					clone.backup = z.advancements[j][advancement].backup;
				}
				z.advancements[j][advancement] = clone;
			}
		});
		z.hq.forEach((x,j)=>{
			z.hq[j] = deserializeSpacecraft(z.hq[j]);
			for(let k = z.spacecraft[j].length-1; k>=0; k--){
				z.spacecraft[j][k] = deserializeSpacecraft(z.spacecraft[j][k]);
			}
		});
		
		setupMap();

		
		z.usernames.forEach((username,j)=>{
			if(username.toLowerCase() === myUsername.toLowerCase()) {
				me = j;
				meReal = j;
			}
		});
		if(z.stations){
			stationsTweaks();
		}
		if(z.FAM){
			FAMTweaks();
		}
		if(me === -1) {
			
			addAlert(
				"You are not recognized as a player in this game!\nProceed only if you believe this to be in error, or you are replacing a player who resigned or disappeared."
				);
			let promptText = "What player number are you? (1-" + (z.numPlayers) +
				")\nProceed only if you know you are a player in the game (e.g. your username was misspelled, or you are replacing a player who resigned or disappeared).";
			for(let j = 0; !(j>=z.numPlayers); j++){
				promptText += "\n" + (j + 1) + ": " + z.countries[j];
			}
			promptNum(promptText, (a) => 1 > a || a > z.numPlayers, clearBackground, (prompted) => {
				me = prompted - 1;
				meReal = prompted - 1;
				t.value += colorText("red", bold("This post did not process properly.  Please try again."));
				mainMenu();
			});
			
		} else {
			t.value += colorText("red", bold("This post did not process properly.  Please try again."));
			mainMenu();
		}
	}
}

function postSeed() {
	let re = new RegExp(/(\[c\])?\[size=(1|0)\]\[color=#(F4F4FF|FFFFFF)\](New|LEN) seed: (\S+)\[\/color\]\[\/size\](\[\/c\])?/, "g");
	let seed2 = re.exec(t.value);
	if(seed2 !== null) {
		seed2 = seed2[5];
		seed2 = window.atob(seed2.replace(/-/g, ""));
	}
	if(seed2 !== seed) {
		addAlert("Possible double-post prevented; you should probably run LEN again to make sure your play processed correctly.");
		t.value += bold(colorText("red", "Possible double-post prevented; you should run LEN again to make sure your play processed correctly.")) + "\r\n";
		return;
	}
	let banner = "";
	banner = z.banners[me];
	if(!banner){
		banner = 565008;
	}

	let bannerRegExp = new RegExp("\\[ima" + bl + "geid=" + banner + " medium\\]", "g");
	let dumbRe = new RegExp('\\[co' + 'lor=red\\]\\[b' + "\\]This post did not process properly\\.  Please try again\\.\\[/" + "b\\]\\[/co" + "lor\\]", "g");
	let clearRegExp = new RegExp("(\\[clear\\])+", "g");
	let splitted = window.btoa(JSON.stringify(z)).match(/.{1,20}/g);
	let text0 = "";
	while(splitted.length > 0) {
		text0 += splitted.shift() + "-";
	}
	t.value = "[ima" + bl + "geid=" + banner + " medium]" + clear() + code(size(invisible("LEN seed: " + text0), 1)) + clear() + t.value.replace(bannerRegExp, "")
		.replace(re, "").replace(dumbRe, "").replace(clearRegExp, clear());
	if(arguments.length === 0) {
		clearSpoilers();
	}
	clearQuotes();
	try{
		let evt = new Event('input', {
			bubbles: true,
			cancelable: true,
		});

		t.dispatchEvent(evt);
	} catch(err){}
}

function saveAndQuit() {
	postSeed();
	if(t.value.slice(-4) !== ("[h" + bl + "r]")) {
		t.value += "[h" + bl + "r]";
	}
	clearBackground();
}

function updateBanner(player,newBanner){
	let bannerRegExp = new RegExp("\\[ima" +bl+ "geid=" + z.banners[player] + " medium\\]","g");
	t.value = t.value.replace(bannerRegExp, ""); 
	z.banners[player] = newBanner;
}

function yearWillEnd(){
	let end = true;
	for(let j = z.numPlayers; !(j>=z.spacecraft.length); j++){
		for(let k = 0; !(k>=z.spacecraft[j].length); k++){
			let loc = z.spacecraft[j][k].location;
			for(let conn in map[loc].connections){
				if(map[loc].connections[conn].automatic){
					return false;
				}
			}
		}
	}
	for(let k = 1; end && (z.numPlayers - z.passedTurns > k); k++){
		if(!z.endedYear[z.turnOrder[(z.turnNumber + k) % z.numPlayers]]){
			end = false;
		}
	}
	return end;
}

function everyoneElseEnded(){
	let end = true;
	for(let k = 1; end && (z.numPlayers > k); k++){
		if(!z.endedYear[(z.turn + k) % z.numPlayers]){
			end = false;
		}
	}
	return end;
}

function canDecommission(player){
	if(player === undefined){
		player = me;
	}
	if(z.maneuvering !== undefined || z.surveying !== undefined || z.separation !== undefined){
		return false;
	}
	for(let j = z.spacecraft[player].length-1; j>=0; j--){
		if(z.spacecraft[player][j].numAstronauts() === 0 && z.spacecraft[player][j].timeTokens === 0){
			let loc = z.spacecraft[player][j].location;
			if(loc === "Earth" || loc === "Earth Orbit"){
				continue;
			}
			if("Juno" in z.spacecraft[player][j] || "Atlas" in z.spacecraft[player][j] || 
			   "Soyuz" in z.spacecraft[player][j] || "Saturn" in z.spacecraft[player][j] ||
			   "Proton" in z.spacecraft[player][j] || ("Shuttle" in z.spacecraft[player][j] && "Large Fuel Tank" in z.spacecraft[player][j]) ||
			   ("Daedalus" in z.spacecraft[player][j] && "Small Fuel Tank" in z.spacecraft[player][j]) || z.spacecraft[player][j].isHabitat()){
				   
				continue;
			}
			if(("Rover" in z.spacecraft[player][j] || "Rover (surveyed)" in z.spacecraft[player][j] || "Rover (explored)" in z.spacecraft[player][j] || "Rover (surveyed) (explored)" in z.spacecraft[player][j]) &&
			   (loc === "Venus" || loc === "Moon" || loc === "Mars" || loc === "Phobos" || loc === "Ceres") &&
			   (maxFeatures(loc) === z.features[loc].length && !z.features[loc].includes("Palladium") && !z.features[loc].includes("Platinum") && !z.features[loc].includes("Iridium") && 
			    !z.features[loc].includes("Fossil?") && !z.features[loc].includes("Wreckage") && !z.features[loc].includes("Alien Object"))){
				
				continue;
			}
			
			if(("Fuel Generator" in z.spacecraft[player][j] || "Fuel Generator (used)" in z.spacecraft[player][j]) && z.hazard[loc].includes("CO2")){
				continue;
			}
			
			let ion = "Ion Thruster" in z.spacecraft[player][j] || "Ion Thruster (used)" in z.spacecraft[player][j];
			let auto = false;
			let slow = false;
			let zero = false;
			for(let conn in map[loc].connections){
				if(map[loc].connections[conn].automatic){
					auto = true;
				}
				if(map[loc].connections[conn].slow){
					slow = true;
				}
				if(map[loc].connections[conn].difficulty === 0 || map[loc].connections[conn].aerobrakingDifficulty === 0){
					zero = true;
				}
			}
			
			if(!auto && !zero && (!slow || !ion)){
				return true;
			}
		}
	}
	return false;
}


function isTrading(country){
	if(z.numPlayers === 1){
		return false;
	}
	if(!z.stations){
		return true;
	}
	if(country >= z.numPlayers){
		return true;
	}
	for(let j = 0; !(j>=z.shares.length); j++){
		if(z.shares[j][country] > 0){
			return true;
		}
	}
	return false;
}

function dissolveJointVenture(venture,winner){
	if(winner === undefined){
		boldAlert(z.countries[venture] +" is completely bought out by the bank.");
		for(let mission in z.missions){
			if(z.missions[mission].claimed === venture){
				z.missions[mission].claimed = -2;
			}
		}
		z.bankMemorial = z.bankMemorial.concat(z.memorialWall[venture]);		
	} else {
		boldAlert(z.countries[venture] + " is completely bought out by " + z.countries[winner] +", and is dissolved.");
		z.pointTokens[winner] += z.pointTokens[venture];
		z.points[winner] += z.memorialWall[winner].length * (z.memorialWall[venture].length + 1);
		z.memorialWall[winner] = z.memorialWall[winner].concat(z.memorialWall[venture]);
		z.points[winner] -= z.memorialWall[winner].length * (z.memorialWall[venture].length + 1);
		z.points[winner] += z.points[venture];
		z.pointCards[winner] = z.pointCards[winner].concat(z.pointCards[venture]);
		z.spacecraft[winner] = z.spacecraft[winner].concat(z.spacecraft[venture]);
		for(let component in z.hq[venture]){
			if(component in componentMasses){
				z.hq[winner].addComponent(z.hq[venture][component]);
			}
		}
		for(let astronaut in z.hq[venture].astronauts){
			z.hq[winner].astronauts[astronaut] = z.hq[venture].astronauts[astronaut];
		}
		for(let hazard in z.known[venture]){
			z.known[winner][hazard] = true;
		}
		z.money[winner] += z.money[venture];
		for(let mission in z.missions){
			if(z.missions[mission].claimed === venture){
				z.missions[mission].claimed = winner;
			}
		}
		z.secrets[winner] = z.secrets[winner].concat(z.secrets[venture]);
	}
	z.hq.splice(venture,1);
	z.spacecraft.splice(venture,1);
	z.known.splice(venture,1);
	z.countries.splice(venture,1);
	z.pointTokens.splice(venture,1);
	z.memorialWall.splice(venture,1);
	z.points.splice(venture,1);
	z.pointCards.splice(venture,1);
	z.money.splice(venture,1);
	z.shares.splice(venture,1);
	z.context.splice(venture,1);
	z.crisisOptions.splice(venture,1);
	z.mandatory.splice(venture,1);
	z.secrets.splice(venture,1);
}

function sharePrice(venture){
	return Math.floor(z.points[venture] + z.pointTokens[venture]);
}

function sharePoints(venture){
	let points = z.points[venture] + z.pointTokens[venture];
	if(points > 0){
		return Math.floor(points/10);
	} else {
		return -Math.floor(-points/10);
	}
}

function hasAstronautsInSpace(venture){
	for(let j = 0; !(j>=z.spacecraft[venture].length); j++){
		if(z.spacecraft[venture][j].location !== "Earth" && z.spacecraft[venture][j].numAstronauts() > 0){
			return true;
		}
	}
	return false;
}

function canBuyShares(){
	if(z.numPlayers === 1 || !z.stations || me >= z.numPlayers){
		return false;
	}
	for(let j = 0; !(j>=z.shares.length); j++){
		if(z.shares[j][z.numPlayers] > 0){
			if(0 > sharePrice(j)){
				return true;
			} else if(sharePrice(j) > 0 && z.money[me] >= sharePrice(j)){
				return true;
			}
		}
	}
}

function canSellShares(){
	if(z.numPlayers === 1 || !z.stations || me >= z.numPlayers){
		return false;
	}
	for(let j = 0; !(j>=z.shares.length); j++){
		if(z.shares[j][me] > 0){
			if(sharePrice(j) > 0){
				return true;
			} else if( 0 > sharePrice(j) && z.money[me] >= -sharePrice(j)){
				return true;
			}
		}
	}
	return false;
}

function canFormJointVenture(){
	if(!z.stations || z.numPlayers === 1 || me >= z.numPlayers){
		return false;
	}
	return z.money[me] >= 10;
}

function canBuildCave(){
	if(!z.stations){
		return false;
	}
	for(let j = 0; !(j>=z.spacecraft[me].length); j++){
		if(z.spacecraft[me][j].hasMechanic() && "Spare Parts" in z.spacecraft[me][j] && z.spacecraft[me][j]["Spare Parts"] >=2){
			if((z.spacecraft[me][j].location === "Moon" && z.features[z.spacecraft[me][j]].includes("Lunar Caves")) || 
			   (z.spacecraft[me][j].location === "Mars" && z.features[z.spacecraft[me][j]].includes("Mars Caves")) || 
			   (z.spacecraft[me][j].location === "Phobos" && z.features[z.spacecraft[me][j]].includes("Phobos Caves"))){
				
				return true;
			}
		}
	}
	return false;
}

function canExperiment(){
	for(let j = 0; !(j>=z.spacecraft[me].length); j++){
		/* RULES: an incapacitated astronaut can do an experiment? */
		if((z.spacecraft[me][j].hasScientist() || !z.outer) && "Experiment (ready)" in z.spacecraft[me][j] && z.spacecraft[me][j].numHealthyAstronauts() > 0 && "Science Module" in z.spacecraft[me][j]){
			/* RULES: cannot do an Orbital Experiment with time tokens */
			if(z.spacecraft[me][j].location === "Earth Orbit" && z.spacecraft[me][j].timeTokens === 0 && (missionAvailable("Orbital Experiment") || missionAvailable("Orbital Experiment +0.5"))){
				return true;
			} else if(z.spacecraft[me][j].location === "Moon" && (missionAvailable("Lunar Experiment") || missionAvailable("Lunar Experiment +1"))){
				return true;
			} else if(z.spacecraft[me][j].location === "Mars" && (missionAvailable("Mars Experiment") || missionAvailable("Mars Experiment +1.5"))){
				return true;
			} else if(z.spacecraft[me][j].location === "Venus" && missionAvailable("Venus Experiment")){
				return true;
			}
		}
	}
	return false;
}

function canClaimExperiment(){
	let experiments = ["Orbital Experiment","Lunar Experiment","Mars Experiment","Venus Experiment"];
	let missions = [];
	if(missionAvailable("Orbital Experiment") && missionAvailable("Orbital Experiment +0.5")){
		missions.push("Orbital Experiment");
		missions.push("Orbital Experiment +0.5");
	} else if(missionAvailable("Orbital Experiment")){
		if(!("Orbital Experiment +0.5" in z.missions) || (z.missions["Orbital Experiment +0.5"].claimed !== me && z.turnNumber > me)){
			missions.push("Orbital Experiment");
		}
	} else if(missionAvailable("Orbital Experiment +0.5")){
		if(z.missions["Orbital Experiment"].claimed !== me && z.turnNumber > me){
			missions.push("Orbital Experiment +0.5");
		}
	}
	if(missionAvailable("Lunar Experiment") && missionAvailable("Lunar Experiment +1")){
		missions.push("Lunar Experiment");
		missions.push("Lunar Experiment +1");
	} else if(missionAvailable("Lunar Experiment")){
		if(!("Lunar Experiment +1" in z.missions) || (z.missions["Lunar Experiment +1"].claimed !== me && z.turnNumber > me)){
			missions.push("Lunar Experiment");
		}
	} else if(missionAvailable("Lunar Experiment +1")){
		if(z.missions["Lunar Experiment"].claimed !== me && z.turnNumber > me){
			missions.push("Lunar Experiment +1");
		}
	}
	if(missionAvailable("Mars Experiment") && missionAvailable("Mars Experiment +1.5")){
		missions.push("Mars Experiment");
		missions.push("Mars Experiment +1.5");
	} else if(missionAvailable("Mars Experiment")){
		if(!("Mars Experiment +1.5" in z.missions) || (z.missions["Mars Experiment +1.5"].claimed !== me && z.turnNumber > me)){
			missions.push("Mars Experiment");
		}
	} else if(missionAvailable("Mars Experiment +1.5")){
		if(z.missions["Mars Experiment"].claimed !== me && z.turnNumber > me){
			missions.push("Mars Experiment +1.5");
		}
	}
	if(missionAvailable("Venus Experiment")){
		missions.push("Venus Experiment");
	}
	let available = {};
	for(let j = 0; !(j>=z.spacecraft[me].length); j++){
		if(z.spacecraft[me][j].location === "Earth"){
			experiments.forEach((experiment)=>{
				if(experiment in z.spacecraft[me][j]){
					available[experiment] = true;
				}
			});
		}
	}
	experiments.forEach((experiment)=>{
		if(experiment in z.hq[me]){
			available[experiment] = true;
		}
	});
	for(let experiment in available){
		if(experiment === "Orbital Experiment"){
			if(missions.includes("Orbital Experiment")){
				return true;
			}
			if(missions.includes("Orbital Experiment +0.5")){
				return true;
			}
		} else if(experiment === "Lunar Experiment"){
			if(missions.includes("Lunar Experiment")){
				return true;
			}
			if(missions.includes("Lunar Experiment +1")){
				return true;
			}
		} else if(experiment === "Mars Experiment"){
			if(missions.includes("Mars Experiment")){
				return true;
			}
			if(missions.includes("Mars Experiment +1.5")){
				return true;
			}
		} else if(experiment === "Venus Experiment"){
			if(missions.includes("Venus Experiment")){
				return true;
			}
		}
	}
	return false;
}

function canFossil(){
	for(let j = 0; !(j>=z.spacecraft[me].length); j++){
		/* RULES: incapacitated astronauts and Fossil? */
		if("Fossil?" in z.spacecraft[me][j] && (z.spacecraft[me][j].location === "Earth" || ("Science Module" in z.spacecraft[me][j] && z.spacecraft[me][j].numAstronauts() > 0 && 
																							 (!z.outer && z.spacecraft[me][j].hasScientist())))){
			return true;
		}
	}
	if("Fossil?" in z.hq[me]){
		return true;
	}
	return false;
}

function canWreckage(){
	if(z.numPlayers === 1){
		return false;
	}
	for(let j = 0; !(j>=z.spacecraft[me].length); j++){
		if("Wreckage" in z.spacecraft[me][j] && z.spacecraft[me][j].hasMechanic()){
			return true;
		}
	}
	return false;
}

function canRover(){
	if(!("Rover" in z.advancements[meReal])){
		return false;
	}
	for(let j = 0; !(j>=z.spacecraft[me].length); j++){
		if(z.spacecraft[me][j].isRover() && 
		   (z.spacecraft[me][j].location === "Venus" || z.spacecraft[me][j].location === "Moon" || z.spacecraft[me][j].location === "Mars" || 
		    z.spacecraft[me][j].location === "Phobos" || z.spacecraft[me][j].location === "Ceres") &&
		   maxFeatures(z.spacecraft[me][j].location) > z.features[z.spacecraft[me][j].location].length){
			   
			return true;
		}
	}
	return false;
}


function mainMenu(){
	let options = [];
	
	if(z.turn !== me && z.turnReal === me && !z.endOfYear){
		me = z.turn;
	}
	
	options.push("Display game state");
	options.push("View my agency");
	if(isTrading(me) && z.stations){
		options.push("View another of your agencies");
	}
	
	
	
	z.crisisOptions[me].forEach((opt)=>{
		options.push(opt);
	});
	
	if(menuPage === "Default"){
	

		
	
	if(z.turn === me){
		
		
		if(anyMandatory()){
		
		} else if(z.lifeSupport !== undefined){
			if(doneWithLifeSupportTests()){
				if(mustAnyDie()){
					options.push("Choose an Astronaut to die");
				} else {
					options.push("I'm done with Life Support");
				}
			} else {
				/* TODO: if all capsules on same ship and identical...*/
				options.push("Check Life Support in a caspule");
			}
		} else if(z.reentryCapsules !== undefined){
			if(identicalReentry()){
				options.push("Perform next capsule's Re-entry");
			} else {
				options.push("Choose which capsule will face Re-entry next");
			}
		} else if(z.arrivals !== undefined && z.maneuvering === undefined){
			if(z.arrivals.length === 0){
				/* TODO: gotta be a way to kill this you if you have no money or all are innocuous */
				options.push("I'm done with arrival hazards");
			} else {
				options.push("Handle arrival hazards");
			}
		} else if(z.endYearHazards !== undefined){
			if(z.endYearHazards.length === 0){
				options.push("I'm done with end-of-year hazards");
			} else {
				options.push("Handle end-of-year hazards");
			}
		} else if(z.production !== undefined){
			if(canProduceFood(meReal)){
				options.push("Produce Food");
			}
			if(canProduceFuel(meReal)){
				options.push("Produce Fuel");
			}
			if(canProduceHabitat()){
				options.push("Assemble a Ground Habitat");
			}
			options.push("I'm done with production");
		} else if(z.thrusting){
			let rockets = ["Juno","Atlas","Soyuz","Saturn","Proton"];
			rockets.forEach((rocket)=>{
				if(rocket in z.spacecraft[me][z.maneuvering]){
					let article = "a";
					if(rocket === "Atlas"){
						article = "an";
					}
					options.push("Fire "+article+" "+rocket+" Rocket");
				}
			});
			if(z.spacecraft[me][z.maneuvering].availableShuttles() > 0 && "Large Fuel Tank" in z.spacecraft[me][z.maneuvering]){
				options.push("Fire a Shuttle engine");
			}
			if(z.spacecraft[me][z.maneuvering].availableDaedalus() > 0 && "Small Fuel Tank" in z.spacecraft[me][z.maneuvering]){
				options.push("Fire a Daedalus Rocket");
			}
			if(z.maneuveringTime > 0 && "Ion Thruster" in z.spacecraft[me][z.maneuvering]){
				options.push("Fire an Ion Thruster");
			}
			options.push("Abort maneuver");
		} else if(z.surveying !== undefined){
			options.push("[Surveying] Reveal survey results");
			options.push("[Surveying] Do not reveal survey results");
		} else if(z.separation !== undefined){
			if(z.spacecraft[me][z.separation].numComponents() + z.spacecraft[me][z.separation].numAstronauts() > 0){
				options.push("[Separation] Move a component to the new ship");
			}
			if(z.spacecraft[me][z.spacecraft[me].length-1].numComponents() + z.spacecraft[me][z.spacecraft[me].length-1].numAstronauts() > 0){
				options.push("[Separation] Move a component back to the old ship");
			}
			options.push("[Separation] Cancel separation");
			if(z.spacecraft[me][z.separation].isValid() && z.spacecraft[me][z.spacecraft[me].length-1].isValid()){
				options.push("[Separation] Commit to separation");
			}
			
		} else if(!z.endOfYear){
			if(canSell()){
				options.push("Sell Minerals");
			}
			if(canSellPhobos()){
				options.push("Analyze Phobos Sample");
			}
			if(canAlienObject()){
				options.push("Analyze Alien Object");
			}
			if(canFossil()){
				options.push("Analyze Fossil?");
			}
			if(canWreckage()){
				options.push("Recover Wreckage");
			}
			if(canResearch()){
				options.push("Research an advancement");
			}
			if(canBuyAnything()){
				options.push("Buy a component");
			}
			if(canAssemble()){
				options.push("Assemble a spacecraft on Earth");
			}
			if(canDisassemble()){
				options.push("Disassemble a spacecraft on Earth");
			}
			if(canManeuver()){
				options.push("Perform a maneuver");
			}
			if(canDock()){
				options.push("Dock one spacecraft to another");
			}
			if(canSeparate()){
				options.push("Separate one spacecraft in two");
			}
			if(canSurvey()){
				options.push("Survey unexplored conditions");
			}
			if(canCollect()){
				options.push("Collect a sample from an extraterrestrial body");
			}
			if(canRepair()){
				options.push("Repair damaged components");
			}
			if(canHeal()){
				options.push("Heal incapacitated astronauts");
			}
			if(canExperiment()){
				options.push("Perform an experiment");
			}
			if(canRover()){
				options.push("Explore with a Rover");
			}
			if(canExplore()){
				options.push("Complete an Explorer mission");
			}
			if(canClaimExperiment()){
				options.push("Complete an Experiment mission");
			}
			if(canBuildCave()){
				options.push("[Caves] Manufacture a ground habitat");
			}
			if(isTrading(me)){
				options.push("Cooperate with another agency");
			}
			if(canSellShares()){
				options.push("Sell shares to the bank");
			}
			if(canBuyShares()){
				options.push("Buy shares from the bank");
			}
			if(canFormJointVenture()){
				options.push("Form a joint venture");
			}
			
			if(canEndTurn()){
				options.push("End Turn");
				options.push("End My Year");
			}
		

			if(isTrading(me) && z.stations){
				if(z.numPlayers > me){
					options.push("Take actions for a joint venture");
				} else {
					options.push("Go back to your own agency");
				}
			}
		}
		
	} else if (me !== meReal){
		options.push("Go back to your own agency");
	}
	
	if(me !== z.turn && z.turn >= z.numPlayers && z.endOfYear && z.shares[z.turn][me] > 0){
		options.push("Take actions for a joint venture");
	}
	

	if(z.lastAdvancement[meReal] !== null && !Array.isArray(z.advancements[meReal][z.lastAdvancement[meReal]].lastOutcome) && !z.advancements[meReal][z.lastAdvancement[meReal]].autoSuccess()){
		switch(z.advancements[meReal][z.lastAdvancement[meReal]].lastOutcome){
			case SUCCESS:
				if(z.money[meReal] >= 10){
					options.push("Pay to remove the Success from "+z.lastAdvancement[meReal]);
				}
				break;
			case MINOR_FAILURE:
				if(z.money[meReal] >= 5){
					options.push("Pay to remove the Minor Failure from "+z.lastAdvancement[meReal]);
				}
				break;
			case MAJOR_FAILURE:
				if(z.money[meReal] >= 5){
					options.push("Pay to remove the Major Failure from "+z.lastAdvancement[meReal]);
				}
				break;
		}
	} else if(z.lastAdvancement[meReal] !== null && Array.isArray(z.advancements[meReal][z.lastAdvancement[meReal]].lastOutcome) && !z.advancements[meReal][z.lastAdvancement[meReal]].autoSuccess()){
		if((z.advancements[meReal][z.lastAdvancement[meReal]].lastOutcome[0] === SUCCESS || z.advancements[meReal][z.lastAdvancement[meReal]].lastOutcome[1] === SUCCESS) && z.money[meReal] >= 10){
			options.push("Pay to remove a Success from Rover");
		}
		if((z.advancements[meReal][z.lastAdvancement[meReal]].lastOutcome[0] === MINOR_FAILURE || z.advancements[meReal][z.lastAdvancement[meReal]].lastOutcome[1] === MINOR_FAILURE) && z.money[meReal] >= 5){
			options.push("Pay to remove a Minor Failure from Rover");
		}
		if((z.advancements[meReal][z.lastAdvancement[meReal]].lastOutcome[0] === MAJOR_FAILURE || z.advancements[meReal][z.lastAdvancement[meReal]].lastOutcome[1] === MAJOR_FAILURE) && z.money[meReal] >= 5){
			options.push("Pay to remove a Major Failure from Rover");
		}
	}
	
	options.push("Rare Options");
	
	} else {
		options.push("Change your default banner");
		options.push("Change your username");
		if(canRemoveOneOutcome()){
			options.push("Remove a Success from a 1-outcome advancement");
		}
		if(canRendezvousPay()){
			options.push("Pay $10 million to remove a Success from Rendezvous");
		}
		if(canRoverPay()){
			options.push("Pay $10 million to remove a Success from Rover");
		}
		if(canDecommission()){
			options.push("Decommission a spacecraft");
		}
		if(z.spacecraft[me].length > 0){
			options.push("Rename a spacecraft");
		}
		if(!z.endOfYear && z.turn !== me){
			options.push("Cooperate with another agency");
		}
		if(z.turn !== me && z.numPlayers > me && z.endedYear[me] && !z.endOfYear){
			options.push("Cancel Ending My Year");
		}
	}
	
	let promptText = "What would you like to do, "+z.countries[me]+"? (1-"+options.length+")";
	options.forEach((opt,j)=>{
		promptText += "\n"+(j+1)+": "+opt;
	});
	
	let cancelLabel = "Save and Quit";
	if(menuPage !== "Default"){
		cancelLabel = "Go Back";
	}
	
	promptNum(promptText,(a)=>1>a||a>options.length,()=>{
		if(menuPage === "Default"){
			saveAndQuit();
		} else {
			menuPage = "Default";
			mainMenu();
		}
	},(a)=>{
		let ch = options[a-1];
	if(ch === "End Turn"){
		confirmify("Confirming you want to end the turn.",mainMenu,()=>{
			z.spacecraft[me].forEach((x,k)=>{
				z.spacecraft[me][k].untapProbesCapsules();
			});
			if(z.stations){
				for(let j = 0; !(j>=z.spacecraft.length); j++){
					if(z.shares[j][me] > 0){
						for(let k = 0; !(k>=z.spacecraft[j].length); k++){
							z.spacecraft[j][k].untapProbesCapsules();
						}
					}
				}
			}
			z.lastAdvancement[me] = null;
			if(!z.action && !z.sold){
				if(yearWillEnd()){
					z.passedTurns = 0;
					z.endedYear.forEach((x,k)=>{
						z.endedYear[k] = false;
					});
					endYear();
				} else {
					plainAlert(z.countries[me]+" ends their turn without doing anything.");
					do{
						z.passedTurns++;
						z.turnNumber++;
						z.turn = z.turnOrder[z.turnNumber % z.numPlayers];
					} while(z.endedYear[z.turn]);
					z.turnReal = z.turn;
					gameState();
				}
			} else {
				z.passedTurns = 0;
				do {
					if(me !== z.turn){
						z.passedTurns++;
					}
					z.turnNumber++;
					z.turn = z.turnOrder[z.turnNumber % z.numPlayers];
				} while(z.endedYear[z.turn]);
				z.turnReal = z.turn;
				gameState();
			}
			z.action = false;
			z.sold = false;
			mainMenu();
		});
	} else if(ch === "Assemble a Ground Habitat"){
		let selection = [];
		for(let j = 0; !(j>=z.spacecraft[z.turn].length); j++){
			if("Ground Habitat (parts)" in z.spacecraft[z.turn][j] && z.spacecraft[z.turn][j].hasMechanic()){
				switch(z.spacecraft[z.turn][j].location){
					case "Mercury":
					case "Venus":
					case "Earth":
					case "Moon":
					case "Mars":
					case "Phobos":
					case "Ceres":
					case "Io":
					case "Europa":
					case "Ganymede":
					case "Callisto":
					case "Titan":
					case "Enceladus":
						selection.push(j);
				}
			}
		}
		
		let produce = (index)=>{
			boldAlert("A mechanic on the "+z.spacecraft[z.turn][index].name+" ("+z.spacecraft[z.turn][index].location+") assembles a Ground Habitat.");
			z.spacecraft[z.turn][index].removeComponent("Ground Habitat (parts)");
			z.spacecraft[z.turn][index].addComponent("Ground Habitat");
			if(!canProduce()){
				finishProduction();
			}
			mainMenu();
		};
		
		if(selection.length === 1){
			confirmify("Confirming you want to assemble a Ground Habitat with a Mechanic on board the "+z.spacecraft[z.turn][selection[0]].name+" ("+z.spacecraft[z.turn][selection[0]].location+")",mainMenu,()=>{
				produce(selection[0]);
			});
		} else {
			let promptText = "Which spacecraft do you want to have build a Ground Habitat? (1-"+selection.length+")";
			selection.forEach((index,j)=>{
				promptText += "\n"+(j+1)+": "+z.spacecraft[z.turn][j].name+" ("+z.spacecraft[z.turn][j].location+")";
			});
			promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
				produce(selection[a-1]);
			});
		}
	} else if(ch === "Produce Fuel"){
		let selection = [];
		if("Fuel Generator" in z.hq[z.turn]){
			selection.push(-1);
		}
		for(let j = 0; !(j>=z.spacecraft[z.turn].length); j++){
			if("Fuel Generator" in z.spacecraft[z.turn][j] && (z.spacecraft[z.turn][j].location === "Earth" || z.hazard[z.spacecraft[z.turn][j].location].includes("CO2"))){
				selection.push(j);
			}
		}
		
		
		let howMany = (index) => {
			if(index === -1){
				promptNum("How many Small Fuel Tanks would you like to produce at your HQ? (0-"+z.hq[z.turn]["Fuel Generator"]+")",
						  (a)=>0>a||a>z.hq[z.turn]["Fuel Generator"],mainMenu,(a)=>{
					if(a !== 0){
						let s = "s";
						if(a === 1){
							s = "";
						}
						plainAlert(z.countries[z.turn]+" HQ produces "+a+" Small Fuel Tank"+s+".");
						z.hq[z.turn].removeComponent("Fuel Generator",a);
						z.hq[z.turn].addComponent("Fuel Generator (used)",a);
						z.hq[z.turn].addComponent("Small Fuel Tank",a);
						if(!canProduce()){
							finishProduction();
						}
					}
					mainMenu();
				});
			} else {
				promptNum("How many Small Fuel Tanks would you like to produce on the "+z.spacecraft[z.turn][index].name+"? (0-"+z.spacecraft[z.turn][index]["Fuel Generator"]+")",
						  (a)=>0>a||a>z.spacecraft[z.turn][index]["Fuel Generator"],mainMenu,(a)=>{
					if(a !== 0){
						let s = "s";
						if(a === 1){
							s = "";
						}
						plainAlert(z.spacecraft[z.turn][index].name+" produces "+a+" Small Fuel Tank"+s+".");
						z.spacecraft[z.turn][index].removeComponent("Fuel Generator",a);
						z.spacecraft[z.turn][index].addComponent("Fuel Generator (used)",a);
						z.spacecraft[z.turn][index].addComponent("Small Fuel Tank",a);
						if(!canProduce()){
							finishProduction();
						}
					}
					mainMenu();
				});
			}
		};

		
		let produce = (index) => {
			if(z.advancements[meReal].Synthesis.autoSuccess()){
				if((index >= 0 && z.spacecraft[z.turn][index]["Fuel Generator"] > 1) || z.hq[z.turn]["Fuel Generator"] > 1){
					howMany(index);
				} else {
					if(index === -1){
						plainAlert("A Fuel Generator at "+z.countries[z.turn]+" HQ produces a Small Fuel Tank.");
						z.hq[z.turn].removeComponent("Fuel Generator");
						z.hq[z.turn].addComponent("Fuel Generator (used)");
						z.hq[z.turn].addComponent("Small Fuel Tank");
					} else {
						plainAlert("A Fuel Generator on "+z.spacecraft[z.turn][index].name+" produces a Small Fuel Tank.");
						z.spacecraft[z.turn][index].removeComponent("Fuel Generator");
						z.spacecraft[z.turn][index].addComponent("Fuel Generator (used)");
						z.spacecraft[z.turn][index].addComponent("Small Fuel Tank");
					} 
					if(!canProduce()){
						finishProduction();
					}
					mainMenu();
				}
			} else {
				if(index === -1){
					plainAlert(z.countries[z.turn]+" attempts to produce a Small Fuel Tank with a Fuel Generator at their HQ.");
				} else {
					plainAlert(z.countries[z.turn]+" attempts to produce a Small Fuel Tank with a Fuel Generator on the "+z.spacecraft[z.turn][index]+".");
				}
				let outcome = z.advancements[meReal].Synthesis.drawOutcome();
				z.lastAdvancement[meReal] = "Synthesis";
				if(outcome === SUCCESS){
					plainAlert("Success!");
					if(index === -1){
						z.hq[z.turn].removeComponent("Fuel Generator");
						z.hq[z.turn].addComponent("Fuel Generator (used)");
						z.hq[z.turn].addComponent("Small Fuel Tank");
					} else {
						z.spacecraft[z.turn][index].addComponent("Fuel Generator (used)");
						z.spacecraft[z.turn][index].removeComponent("Fuel Generator");
						z.spacecraft[z.turn][index].addComponent("Small Fuel Tank");
					}
					if(!canProduce() && 10 > z.money[meReal]){
						finishProduction();
					}
				} else if(outcome === MINOR_FAILURE){
					plainAlert("Minor Failure!  No fuel produced.");
					if(index === -1){
						z.hq[z.turn].removeComponent("Fuel Generator");
						z.hq[z.turn].addComponent("Fuel Generator (used)");
					} else {
						z.spacecraft[z.turn][index].addComponent("Fuel Generator (used)");
						z.spacecraft[z.turn][index].removeComponent("Fuel Generator");
					}
					if(!canProduce() && 5 > z.money[meReal]){
						finishProduction();
					}
				} else {
					plainAlert("Major Failure!  Fuel Generator damaged.");
					if(index === -1){
						z.hq[z.turn].damageComponent("Fuel Generator");
					} else {
						z.spacecraft[z.turn][index].damageComponent("Fuel Generator");
					}
					if(!canProduce() && 5 > z.money[meReal]){
						finishProduction();
					}
				}
				mainMenu();
			}
			
		};
		
		if(selection.length === 1){
			if(selection[0] === -1){
				if(z.advancements[meReal].Synthesis.autoSuccess() && z.hq[z.turn]["Fuel Generator"] > 1){
					howMany(selection[0]);
				} else {
					confirmify("Confirming you want to produce a Small Fuel Tank at your headquarters?",mainMenu,()=>{
						produce(selection[0]);
					});
				}
			} else {
				if(z.advancements[meReal].Synthesis.autoSuccess() && z.spacecraft[z.turn][selection[0]]["Fuel Generator"] > 1){
					howMany(selection[0]);
				} else {
					confirmify("Confirming you want to produce a Small Fuel Tank on the "+z.spacecraft[z.turn][selection[0]].name+" ("+z.spacecraft[z.turn][selection[0]].location+")",mainMenu,()=>{
						produce(selection[0]);
					});
				}
			}
		} else {
			let promptText = "Which spacecraft would you like to have produce a Small Fuel Tank? (1-"+selection.length+")";
			selection.forEach((index,j)=>{
				promptText += "\n"+(j+1)+": ";
				if(index === -1){
					promptText += z.countries[z.turn] + " HQ (Earth)";
				} else {
					promptText += z.spacecraft[z.turn][index].name+" ("+z.spacecraft[z.turn][index].location+")";
				}
			});
			promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
				produce(selection[a-1]);
			});
		}
	} else if(ch === "I'm done with production"){
		confirmify("Confirming you're done with your production phase this year.",mainMenu,()=>{
			finishProduction();
			mainMenu();
		});
	} else if(ch === "Produce Food"){
		let selection = [];
		for(let j = 0; !(j>=z.spacecraft[z.turn].length); j++){
			if("Hydroponics Module" in z.spacecraft[z.turn][j] && z.spacecraft[z.turn][j].numHealthyAstronauts() > 0){
				selection.push(j);
			}
		}
		if("Hydroponics Module" in z.hq[z.turn] && z.hq[z.turn].numHealthyAstronauts() > 0){
			selection.push(-1);
		}
		
		let howMany = (index) => {
			if(index === -1){
				promptNum("How many Food would you like to produce at your HQ? (0-"+z.hq[z.turn]["Hydroponics Module"]+")",
						  (a)=>0>a||a>z.hq[z.turn]["Hydroponics Module"],mainMenu,(a)=>{
					if(a !== 0){
						plainAlert(z.countries[z.turn]+" HQ produces "+a+" Food.");
						z.hq[z.turn].removeComponent("Hydroponics Module",a);
						z.hq[z.turn].addComponent("Hydroponics Module (used)",a);
						z.hq[z.turn].addComponent("Food",a);
						if(!canProduce()){
							finishProduction();
						}
					}
					mainMenu();
				});
			} else {
				promptNum("How many Food would you like to produce on the "+z.spacecraft[z.turn][index].name+"? (0-"+z.spacecraft[z.turn][index]["Hydroponics Module"]+")",
						  (a)=>0>a||a>z.spacecraft[z.turn][index]["Hydroponics Module"],mainMenu,(a)=>{
					if(a !== 0){
						plainAlert(z.spacecraft[z.turn][index].name+" produces "+a+" Food.");
						z.spacecraft[z.turn][index].removeComponent("Hydroponics Module",a);
						z.spacecraft[z.turn][index].addComponent("Hydroponics Module (used)",a);
						z.spacecraft[z.turn][index].addComponent("Food",a);
						if(!canProduce()){
							finishProduction();
						}
					}
					mainMenu();
				});
			}
		};

		
		let produce = (index) => {
			if(z.advancements[meReal].Synthesis.autoSuccess()){
				if(index === -1){
					if(z.hq[z.turn]["Hydroponics Module"] > 1){
						howMany(index);
					} else {
						plainAlert("A Hydroponics Module at "+z.countries[z.turn]+" HQ produces 1 Food.");
						z.hq[z.turn].removeComponent("Hydroponics Module");
						z.hq[z.turn].addComponent("Hydroponics Module (used)");
						z.hq[z.turn].addComponent("Food");
						if(!canProduce()){
							finishProduction();
						}
						mainMenu();
					}
				} else {
					if(z.spacecraft[z.turn][index]["Hydroponics Module"] > 1){
						howMany(index);
					} else {
						plainAlert("A Hydroponics Module on "+z.spacecraft[z.turn][index].name+" produces 1 Food.");
						z.spacecraft[z.turn][index].removeComponent("Hydroponics Module");
						z.spacecraft[z.turn][index].addComponent("Hydroponics Module (used)");
						z.spacecraft[z.turn][index].addComponent("Food");
						if(!canProduce()){
							finishProduction();
						}
						mainMenu();
					}
				}
			} else {
				if(index === -1){
					plainAlert(z.countries[z.turn]+" attempts to produce 1 Food with a Hydroponics Module at their HQ.");
					let outcome = z.advancements[meReal].Synthesis.drawOutcome();
					z.lastAdvancement[meReal] = "Synthesis";
					if(outcome === SUCCESS){
						plainAlert("Success!");
						z.hq[z.turn].removeComponent("Hydroponics Module");
						z.hq[z.turn].addComponent("Hydroponics Module (used)");
						z.hq[z.turn].addComponent("Food");
						if(!canProduce() && 10 > z.money[meReal]){
							finishProduction();
						}
					} else if(outcome === MINOR_FAILURE){
						plainAlert("Minor Failure!  No Food produced.");
						z.hq[z.turn].removeComponent("Hydroponics Module");
						z.hq[z.turn].addComponent("Hydroponics Module (used)");
						if(!canProduce() && 5 > z.money[meReal]){
							finishProduction();
						}
					} else {
						plainAlert("Major Failure!  Hydroponics Module damaged.");
						z.hq[z.turn].damageComponent("Hydroponics Module");
						if(!canProduce() && 5 > z.money[meReal]){
							finishProduction();
						}
					}
				} else {
					plainAlert(z.countries[z.turn]+" attempts to produce 1 Food with a Hydroponics Module on the "+z.spacecraft[z.turn][index]+".");
					let outcome = z.advancements[meReal].Synthesis.drawOutcome();
					z.lastAdvancement[meReal] = "Synthesis";
					if(outcome === SUCCESS){
						plainAlert("Success!");
						z.spacecraft[z.turn][index].removeComponent("Hydroponics Module");
						z.spacecraft[z.turn][index].addComponent("Hydroponics Module (used)");
						z.spacecraft[z.turn][index].addComponent("Food");
						if(!canProduce() && 10 > z.money[meReal]){
							finishProduction();
						}
					} else if(outcome === MINOR_FAILURE){
						plainAlert("Minor Failure!  No Food produced.");
						z.spacecraft[z.turn][index].removeComponent("Hydroponics Module");
						z.spacecraft[z.turn][index].addComponent("Hydroponics Module (used)");
						if(!canProduce() && 5 > z.money[meReal]){
							finishProduction();
						}
					} else {
						plainAlert("Major Failure!  Hydroponics Module damaged.");
						z.spacecraft[z.turn][index].damageComponent("Hydroponics Module");
						if(!canProduce() && 5 > z.money[meReal]){
							finishProduction();
						}
					}
				}
				mainMenu();
			}
			
		};
		
		if(selection.length === 1){
			if(selection[0] === -1){
				if(z.advancements[meReal].Synthesis.autoSuccess() && z.hq[z.turn]["Hydroponics Module"] > 1){
					howMany(selection[0]);
				} else {
					confirmify("Confirming you want to produce Food at your HQ.",mainMenu,()=>{
						produce(selection[0]);
					});
				}
			} else {
				if(z.advancements[meReal].Synthesis.autoSuccess() && z.spacecraft[z.turn][selection[0]]["Hydroponics Module"] > 1){
					howMany(selection[0]);
				} else {
					confirmify("Confirming you want to produce Food on the "+z.spacecraft[z.turn][selection[0]].name+" ("+z.spacecraft[z.turn][selection[0]].location+")",mainMenu,()=>{
						produce(selection[0]);
					});
				}
			}
		} else {
			let promptText = "Which spacecraft would you like to have produce Food? (1-"+selection.length+")";
			selection.forEach((index,j)=>{
				promptText += "\n"+(j+1)+": ";
				if(index === -1){
					promptText += z.countries[me]+" HQ";
				} else {
					promptText += z.spacecraft[z.turn][index].name+" ("+z.spacecraft[z.turn][index].location+")";
				}
			});
			promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
				produce(selection[a-1]);
			});
		}
	} else if(ch === "Explore with a Rover"){
		let selection = [];
		for(let j = 0; !(j>=z.spacecraft[me].length); j++){
			if(z.spacecraft[me][j].isRover() && 
			   (z.spacecraft[me][j].location === "Venus" || z.spacecraft[me][j].location === "Moon" || z.spacecraft[me][j].location === "Mars" || 
				z.spacecraft[me][j].location === "Phobos" || z.spacecraft[me][j].location === "Ceres") &&
			   maxFeatures(z.spacecraft[me][j].location) > z.features[z.spacecraft[me][j].location].length){
				   
				selection.push(j);
			}
		}
		
		let exploreSuccess = (index) => {
			if("Rover" in z.spacecraft[me][index]){
				z.spacecraft[me][index].removeComponent("Rover");
				z.spacecraft[me][index].addComponent("Rover (explored)");
			} else {
				z.spacecraft[me][index].removeComponent("Rover (surveyed)");
				z.spacecraft[me][index].addComponent("Rover (surveyed) (explored)");
			}
			z.maneuvering = index;
			z.maneuveringDestination = z.spacecraft[z.turn][z.maneuvering].location;
			z.maneuveringTime = 0;
			z.maneuveringDifficulty = 0;
			z.thrusting = false;
			z.thrust = 0;
			z.maneuverHazards = [z.spacecraft[z.turn][z.maneuvering].location];
			popHazard();
			mainMenu();
		};
		
		let explore = (index) => {
			z.action = true;
			z.spacecraft[me][index].didSomething = true;
			if(z.advancements[meReal].Rover.autoSuccess()){
				exploreSuccess(index);
			} else {
				z.lastAdvancement[meReal] = "Rover";
				let outcome = z.advancements[meReal].Rover.drawOutcome();
				if(outcome[0] === SUCCESS && outcome[1] === SUCCESS){
					plainAlert("Double Success!");
					exploreSuccess(index);
				} else if(outcome[0] === MAJOR_FAILURE || outcome[1] === MAJOR_FAILURE){
					let alertText = "";
					if(outcome[0] === MAJOR_FAILURE){
						alertText += "Major Failure";
					} else if(outcome[0] === MINOR_FAILURE){
						alertText += "Minor Failure";
					} else {
						alertText += "Success";
					}
					alertText += " + ";
					if(outcome[1] === MAJOR_FAILURE){
						alertText += "Major Failure";
					} else if(outcome[1] === MINOR_FAILURE){
						alertText += "Minor Failure";
					} else {
						alertText += "Success";
					}
					plainAlert(alertText+"! The rover is damaged.");
					if("Rover" in z.spacecraft[me][index]){
						z.spacecraft[me][index].damageComponent("Rover");
					} else {
						z.spacecraft[me][index].damageComponent("Rover (surveyed)");
					}
					mainMenu();
				} else {
					let alertText = "";
					if(outcome[0] === MINOR_FAILURE){
						alertText += "Minor Failure";
					} else {
						alertText += "Success";
					}
					alertText += " + ";
					if(outcome[1] === MINOR_FAILURE){
						alertText += "Minor Failure";
					} else {
						alertText += "Success";
					}
					plainAlert(alertText+"! The rover fails to explore.");
					if("Rover" in z.spacecraft[me][index]){
						z.spacecraft[me][index].removeComponent("Rover");
						z.spacecraft[me][index].addComponent("Rover (explored)");
					} else {
						z.spacecraft[me][index].removeComponent("Rover (surveyed)");
						z.spacecraft[me][index].addComponent("Rover (surveyed) (explored)");
					}
					mainMenu();
				}
			}
			
		};
		
		if(selection.length === 1){
			confirmify("Confirming you want to use the Rover "+z.spacecraft[me][selection[0]].name+" ("+z.spacecraft[me][selection[0]].location+") to explore a feature.",mainMenu,()=>{
				explore(selection[0]);
			});
		} else {
			let promptText = "Which Rover would you like to explore with? (1-"+selection.length+")";
			selection.forEach((index,j)=>{
				promptText += "\n"+(j+1)+": "+z.spacecraft[me][index].name+" ("+z.spacecraft[me][index].location+")";
			});
			promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
				explore(selection[a-1]);
			});
		}
	} else if(ch === "Recover Wreckage"){
		let promptText = "What would you like to convert the Wreckage into? (1-3)\n1: 1 Spare Part\n2: 2 Spare Parts\n3: Probe";
		promptNum(promptText,(a)=>1>a||a>3,mainMenu,(converted)=>{
			let promptText = "Which agency would you like to give 2 points to? (1-"+z.numPlayers+")";
			for(let j = 0; !(j>=z.numPlayers); j++){
				promptText += "\n"+(j+1)+": ";
				if(j === meReal){
					promptText += "(cannot give this to yourself)";
				} else {
					promptText += z.countries[j];
				}
			}
			promptNum(promptText,(a)=>1>a||a>z.numPlayers||a-1==meReal,mainMenu,(a)=>{
				let index = -1;
				for(let j = 0; !(j>=z.spacecraft[me].length); j++){
					if("Wreckage" in z.spacecraft[me][j]){
						z.spacecraft[me].removeComponent("Wreckage");
						index = j;
						break;
					}
				}
				let alertText = "A mechanic on the "+z.spacecraft[me][index].name+" converts Wreckage into ";
				if(converted === 1){
					alertText += "1 Spare Part";
					z.spacecraft[me].addComponent("Spare Parts");
				} else if(converted === 2){
					alertText += "2 Spare Parts";
					z.spacecraft[me].addComponent("Spare Parts",2);
				} else {
					alertText += "a Probe";
					z.spacecraft[me].addComponent("Probe");
				}
				alertText += ", then gives the card and its 2 points to "+z.countries[a-1]+".";
				z.pointCards[a-1].push("Wreckage");
				z.points[a-1]+=2;
				z.spacecraft[me][index].didSomething = true;
				z.action = true;
				mainMenu();
			});
		});
		
	} else if (ch === "Analyze Fossil?"){
		let selection = [];
		for(let j = 0; !(j>=z.spacecraft[me].length); j++){
			/* RULES: incapacitated astronauts and Fossil? */
			if("Fossil?" in z.spacecraft[me][j] && (z.spacecraft[me][j].location === "Earth" || ("Science Module" in z.spacecraft[me][j] && z.spacecraft[me][j].numAstronauts() > 0 && 
																								 (!z.outer && z.spacecraft[me][j].hasScientist())))){
				selection.push(j);
			}
		}
		if("Fossil?" in z.hq[me]){
			selection.push(-1);
		}
		
		let trade = (index)=>{
			z.pointCards[me].push("Fossil?");
			z.points[me]+=6;
			boldAlert(z.countries[me]+" analyzes a Fossil? for 6VP.");
			if(index === -1){
				z.hq[me].removeComponent("Fossil?");
			} else {
				z.spacecraft[me][index].removeComponent("Fossil?");
				z.spacecraft[me][index].didSomething = true;
				if(!z.spacecraft[me][index].nonEmpty()){
					plainAlert("The "+z.spacecraft[me][index].name+" is disassembled.");
					z.spacecraft[me].splice(index,1);
				}
			}
			z.action = true;
			mainMenu();
		};
		
		if(selection.length === 1){
			confirmify("Confirming you want to trade in a Fossil? for 6VP.",mainMenu,()=>{
				trade(selection[0]);
			});
		} else {
			let promptText = "Which Fossil? would you like to trade in? (1-2)";
			selection.forEach((index,j)=>{
				promptText += "\n"+(j+1)+": the Fossil? on ";
				if(index === -1){
					promptText += "Earth";
				} else {
					promptText += "the "+z.spacecraft[me][index].name+" ("+z.spacecraft[me][index].location+")";
				}
			});
			promptNum(promptText,(a)=>1>a||a>2,mainMenu,(a)=>{
				trade(selection[a-1]);
			});
		}
	} else if(ch === "Complete an Experiment mission"){
		let experiments = ["Orbital Experiment","Lunar Experiment","Mars Experiment","Venus Experiment"];
		let missions = [];
		if(missionAvailable("Orbital Experiment") && missionAvailable("Orbital Experiment +0.5")){
			missions.push("Orbital Experiment");
			missions.push("Orbital Experiment +0.5");
		} else if(missionAvailable("Orbital Experiment")){
			if(!("Orbital Experiment +0.5" in z.missions) || (z.missions["Orbital Experiment +0.5"].claimed !== me && z.turnNumber > me)){
				missions.push("Orbital Experiment");
			}
		} else if(missionAvailable("Orbital Experiment +0.5")){
			if(z.missions["Orbital Experiment"].claimed !== me && z.turnNumber > me){
				missions.push("Orbital Experiment +0.5");
			}
		}
		if(missionAvailable("Lunar Experiment") && missionAvailable("Lunar Experiment +1")){
			missions.push("Lunar Experiment");
			missions.push("Lunar Experiment +1");
		} else if(missionAvailable("Lunar Experiment")){
			if(!("Lunar Experiment +1" in z.missions) || (z.missions["Lunar Experiment +1"].claimed !== me && z.turnNumber > me)){
				missions.push("Lunar Experiment");
			}
		} else if(missionAvailable("Lunar Experiment +1")){
			if(z.missions["Lunar Experiment"].claimed !== me && z.turnNumber > me){
				missions.push("Lunar Experiment +1");
			}
		}
		if(missionAvailable("Mars Experiment") && missionAvailable("Mars Experiment +1.5")){
			missions.push("Mars Experiment");
			missions.push("Mars Experiment +1.5");
		} else if(missionAvailable("Mars Experiment")){
			if(!("Mars Experiment +1.5" in z.missions) || (z.missions["Mars Experiment +1.5"].claimed !== me && z.turnNumber > me)){
				missions.push("Mars Experiment");
			}
		} else if(missionAvailable("Mars Experiment +1.5")){
			if(z.missions["Mars Experiment"].claimed !== me && z.turnNumber > me){
				missions.push("Mars Experiment +1.5");
			}
		}
		if(missionAvailable("Venus Experiment")){
			missions.push("Venus Experiment");
		}
		let available = {};
		for(let j = 0; !(j>=z.spacecraft[me].length); j++){
			if(z.spacecraft[me][j].location === "Earth"){
				experiments.forEach((experiment)=>{
					if(experiment in z.spacecraft[me][j]){
						available[experiment] = true;
					}
				});
			}
		}
		experiments.forEach((experiment)=>{
			if(experiment in z.hq[me]){
				available[experiment] = true;
			}
		});
		let selection = [];
		for(let experiment in available){
			if(experiment === "Orbital Experiment"){
				if(missions.includes("Orbital Experiment")){
					selection.push("Orbital Experiment");
				}
				if(missions.includes("Orbital Experiment +0.5")){
					selection.push("Orbital Experiment +0.5");
				}
			} else if(experiment === "Lunar Experiment"){
				if(missions.includes("Lunar Experiment")){
					selection.push("Lunar Experiment");
				}
				if(missions.includes("Lunar Experiment +1")){
					selection.push("Lunar Experiment +1");
				}
			} else if(experiment === "Mars Experiment"){
				if(missions.includes("Mars Experiment")){
					selection.push("Mars Experiment");
				}
				if(missions.includes("Mars Experiment +1.5")){
					selection.push("Mars Experiment +1.5");
				}
			} else if(experiment === "Venus Experiment"){
				if(missions.includes("Venus Experiment")){
					selection.push("Venus Experiment");
				}
			}
		}
		let completeIt = (experiment) =>{
			completeMission(experiment);
			let component = "";
			switch(experiment){
				case "Orbital Experiment +0.5":
					component = "Orbital Experiment";
					break;
				case "Lunar Experiment +1":
					component = "Lunar Experiment";
					break;
				case "Mars Experiment +1.5":
					component = "Mars Experiment";
					break;
				default:
					component = experiment;
					break;
			}
			if(component in z.hq[me]){
				z.hq[me].removeComponent(component);
			} else {
				for(let j = 0; !(j>=z.spacecraft[me].length); j++){
					if(component in z.spacecraft[me][j]){
						z.spacecraft[me][j].removeComponent(component);
						z.spacecraft[me][j].didSomething = true;
						if(!z.spacecraft[me][j].nonEmpty()){
							plainAlert("The "+z.spacecraft[me][j].name+" is disassembled.");
							z.spacecraft[me].splice(j,1);
						}
						break;
					}
				}
			}
			z.action = true;
			mainMenu();
		};
		if(selection.length === 1){
			confirmify("Confirming you want to complete "+selection[0]+".",mainMenu,()=>{
				completeIt(selection[0]);
			});
		} else {
			let promptText = "Which Experiment mission would you like to claim? (1-"+selection.length+")";
			selection.forEach((experiment,j)=>{
				promptText += "\n"+(j+1)+": "+experiment;
				
			});
			promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
				completeIt(selection[a-1]);
			});
		}
	} else if(ch === "Perform an experiment"){
		let selection = [];
		for(let j = 0; !(j>=z.spacecraft[me].length); j++){
			if((z.spacecraft[me][j].hasScientist() || !z.outer) && "Experiment (ready)" in z.spacecraft[me][j] && z.spacecraft[me][j].numHealthyAstronauts() > 0 && "Science Module" in z.spacecraft[me][j]){
				if(z.spacecraft[me][j].location === "Earth Orbit" && (missionAvailable("Orbital Experiment") || missionAvailable("Orbital Experiment +0.5"))){
					selection.push(j);
				} else if(z.spacecraft[me][j].location === "Moon" && (missionAvailable("Lunar Experiment") || missionAvailable("Lunar Experiment +1"))){
					selection.push(j);
				} else if(z.spacecraft[me][j].location === "Mars" && (missionAvailable("Mars Experiment") || missionAvailable("Mars Experiment +1.5"))){
					selection.push(j);
				} else if(z.spacecraft[me][j].location === "Venus" && missionAvailable("Venus Experiment")){
					selection.push(j);
				}
			}
		}
		
		let doExperiment = (index)=>{
			let type = "";
			let n = "";
			if(z.spacecraft[me][index].location === "Earth Orbit"){
				n = "n";
				type = "Orbital Experiment";
			} else if(z.spacecraft[me][index].location === "Moon") {
				type = "Lunar Experiment";
			} else if(z.spacecraft[me][index].location === "Mars") {
				type = "Mars Experiment";
			} else if(z.spacecraft[me][index].location === "Venus") {
				type = "Venus Experiment";
			}
			
			boldAlert(z.countries[me]+" performs a"+n+" "+type+" on the "+z.spacecraft[me][index].name+".");
			z.action = true;
			z.spacecraft[me][index].didSomething = true;
			z.spacecraft[me][index].addComponent(type);
			z.spacecraft[me][index].removeComponent("Experiment (ready)");
			mainMenu();
		};
		
		if(selection.length === 1){
			confirmify("Confirming you want to perform an experiment on the "+z.spacecraft[me][selection[0]].name+" ("+z.spacecraft[me][selection[0]].location+").",mainMenu,()=>{
				doExperiment(selection[0]);
			});
		} else {
			let promptText = "On which spacecraft would you like to perform an experiment? (1-"+selection.length+")";
			selection.forEach((index,j)=>{
				promptText +="\n"+(j+1)+": "+z.spacecraft[me][index].name+" ("+z.spacecraft[me][index].location+")";
			});
			promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
				doExperiment(selection[a-1]);
			});
			
		}
		
	} else if (ch === "[Caves] Manufacture a ground habitat"){
		let selection = [];
		for(let j = 0; !(j>=z.spacecraft[me].length); j++){
			if(z.spacecraft[me][j].hasMechanic() && "Spare Parts" in z.spacecraft[me][j] && z.spacecraft[me][j]["Spare Parts"] >=2){
				if((z.spacecraft[me][j].location === "Moon" && z.features[z.spacecraft[me][j]].includes("Lunar Caves")) || 
				   (z.spacecraft[me][j].location === "Mars" && z.features[z.spacecraft[me][j]].includes("Mars Caves")) || 
				   (z.spacecraft[me][j].location === "Phobos" && z.features[z.spacecraft[me][j]].includes("Phobos Caves"))){
					
					selection.push(j);
				}
			}
		}
		
		let buildCave = (index)=>{
			let moon = "";
			if(z.spacecraft[me][index].location === "Moon"){
				moon = "the ";
			}
			boldAlert(z.countries[me]+" uses two Spare Parts to build a ground habitat in the caves of "+moon+z.spacecraft[me][index].location+" with a Mechanic on the "+z.spacecraft[me][index].name+".");
			z.action = true;
			z.spacecraft[me][index].removeComponent("Spare Parts",2);
			z.spacecraft[me][index].addComponent("Ground Habitat");
			z.spacecraft[me][index].didSomething = true;
			if(missionAvailable("Lunar Habitat") && z.spacecraft[me][index].location === "Moon"){
				completeMission("Lunar Habitat");
			} else if(missionAvailable("Mars Habitat") && z.spacecraft[me][index].location === "Mars"){
				completeMission("Mars Habitat");
			}
			z.spacecraft[me][index].claimManOn();
			mainMenu();
		};
		
		if(selection.length === 1){
			confirmify("Confirming you want to use 2 spare parts to build a ground habitat on "+z.spacecraft[me][selection[0]]+" with a mechanic on board the "+z.spacecraft[me][selection[0]].name+".",mainMenu,()=>{
				buildCave(selection[0]);
			});
		} else {
			let promptText = "Which spacecraft would you like to build a ground habitat with? (1-"+selection.length+")";
			selection.forEach((index,j)=>{
				promptText += "\n"+(j+1)+": "+z.spacecraft[me][index].name+" ("+z.spacecraft[me].location+")";
			});
			promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
				buildCave(selection[a-1]);
			});
		}
		
	} else if(ch === "Take actions for a joint venture"){
		if(z.endOfYear){
			confirmify("Confirmify you want to act as "+z.countries[z.turn]+".",mainMenu,()=>{
				let alertText = z.usernames[me] + " is now acting as "+z.countries[z.turn]+".";
				if(numShareholders(z.turn) !== 1){
					alertText += "\r\nThey should come to a consensus with fellow shareholders as to any decisions they need to make.";
				}
				boldAlert(alertText);
				me = z.turn;
				mainMenu();
			});
		} else {
			let selection = [];
			for(let j = z.numPlayers; !(j>=z.shares.length); j++){
				if(z.shares[j][me] > 0){
					selection.push(j);
				}
			}
			
			let actAsJoint = (venture)=>{
				let alertText = z.usernames[me] + " is now acting as "+z.countries[venture]+".";
				if(numShareholders(venture) !== 1){
					alertText += "\r\nThey must discuss their plans in thread with their fellow shareholders before taking any actions to ensure they have approval for them.";
				}
				boldAlert(alertText);
				z.turnReal = z.turn;
				z.turn = venture;
				me = z.turn;
				mainMenu();
			};
			
			if(selection.length === 1){
				actAsJoint(selection[0]);
			} else {
				let promptText = "Which of your joint agencies would you like to act as? (1-"+selection.length+")";
				selection.forEach((index,j)=>{
					promptText += "\n" + (j+1)+": "+z.countries[index];
				});
				promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
					actAsJoint(selection[a-1]);
				});
			}
		}
	} else if (ch === "Go back to your own agency"){
		confirmify("Confirming you'd like to go back to your own agency.",mainMenu,()=>{
			boldAlert(z.usernames[meReal]+" returns to controlling their own agency, "+z.countries[meReal]+".");
			me = meReal;
			if(!z.endOfYear){
				z.turn = z.turnReal;
			}
			mainMenu();
		});
	} else if (ch === "Form a joint venture"){
		let selection = [];
		ventureNames.forEach((name)=>{
			if(!z.countries.includes(name)){
				selection.push(name);
			}
		});
		let formVenture = (name)=>{
			boldAlert(z.countries[me] + " forms the new joint venture, "+name+", for $10 million.");
			plainAlert("They must give away at least one share before the end of their turn.");
			z.money[me] -= 10;
			z.countries.push(name);
			z.context.push([]);
			z.crisisOptions.push([]);
			z.hq.push(new Spacecraft(name+" HQ"));
			z.known.push({});
			z.mandatory.push([]);
			z.memorialWall.push([]);
			z.money.push(0);
			z.points.push(0);
			z.spacecraft.push([]);
			z.pointCards.push([]);
			z.pointTokens.push(0);
			z.shares.push([]);
			z.secrets.push([]);
			for(let j = 0; !(j>z.numPlayers); j++){
				z.shares[z.shares.length-1].push(0);
			}
			z.shares[z.shares.length-1][me] = 10;
			z.action = true;
			mainMenu();
		};
		
		if(selection.length === 0){
			promptString("What would you like to name the new joint venture?",mainMenu,(name)=>{
				if(z.countries.includes(name) || name === "World Bank"){
					addAlert("You can't name a venture that.");
					mainMenu();
				} else {
					formVenture(name);
				}
			});
		} else if(selection.length === 1){
			confirmify("Confirming you'd like to found "+selection[0]+" for $10 million.",mainMenu,()=>{
				formVenture(selection[0]);
			});
		} else {
			let promptText = "Which joint venture would you like to found for $10 million? (1-"+selection.length+")";
			selection.forEach((name,j)=>{
				promptText += "\n"+(j+1)+": "+name;
			});
			promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
				formVenture(selection[a-1]);
			});
		}
	} else if (ch === "Buy shares from the bank"){
		let selection = [];
		for(let j = 0; !(j>=z.shares.length); j++){
			if(z.shares[j][z.numPlayers] > 0){
				if(0 > sharePrice(j)){
					selection.push(j);
				} else if(sharePrice(j) > 0 && z.money[me] >= sharePrice(j)){
					selection.push(j);
				}
			}
		}
		
		let howMany = (venture)=>{
			let price = sharePrice(venture);
			let max = z.shares[venture][z.numPlayers];
			if(price > 0){
				while(price * max > z.money[me]){
					max--;
				}
			}
			let promptText = "How many shares of "+z.countries[venture]+" would you like ";
			if(0 > price){
				promptText += " to take off the bank's hands? (0-"+max+")\nEach share bought will give you $"+(-price)+" million.";
			} else {
				promptText += " to buy from the bank at $"+price+" million each? (0-"+max+")";
			}
			promptNum(promptText,(a)=>0>a||a>max,mainMenu,(a)=>{
				if(a !== 0){
					let s = "s";
					if(a === 1){
						s = "";
					}
					if(0 > price){
						boldAlert(z.countries[me]+" receives $"+(-price*a)+" million for taking "+a+" share"+s+" of "+z.countries[venture]+" off the bank's hands."); 
					} else {
						boldAlert(z.countries[me]+" buys "+a+" shares of "+z.countries[venture]+" to the bank for $"+(a*price)+" million.");
					}
					z.action = true;
					z.money[me] -= price * a;
					z.shares[venture][me] += a;
					z.shares[z.numPlayers][me] -= a;
					if(z.shares[venture][me] === 10){
						dissolveJointVenture(venture,me);
					}
					z.gameOver = endGameCheck();
				}
				mainMenu();
			});
		};
		
		
		if(selection.length === 1){
			howMany(selection[0]);
		} else {
			let promptText = "Which venture's shares would you like to buy? (1-"+selection.length+")";
			selection.forEach((venture,j)=>{
				promptText += "\n"+(j+1)+": "+z.countries[venture];
			});
			promptNum(promptText,(a)=>1>a||a>selection,mainMenu,(a)=>{
				howMany(selection[a-1]);
			});
		}
	} else if(ch === "Sell shares to the bank"){
		let selection = [];
		for(let j = 0; !(j>=z.shares.length); j++){
			if(z.shares[j][me] > 0){
				if(sharePrice(j) > 0){
					selection.push(j);
				} else if( 0 > sharePrice(j) && z.money[me] >= -sharePrice(j)){
					selection.push(j);
				}
			}
		}
		
		let howMany = (venture)=>{
			let price = sharePrice(venture);
			let max = z.shares[venture][me];
			if(0 > price){
				while(-price * max > z.money[me]){
					max--;
				}
			}
			let promptText = "How many shares of "+z.countries[venture]+" would you like ";
			if(0 > price){
				promptText += " to make the bank buy? (0-"+max+")\nEach share sold will cost you $"+(-price)+" million.";
			} else {
				promptText += " to sell to the bank at $"+price+" million each? (0-"+max+")";
			}
			promptNum(promptText,(a)=>0>a||a>max,mainMenu,(a)=>{
				if(a !== 0){
					let s = "s";
					if(a === 1){
						s = "";
					}
					if(0 > price){
						boldAlert(z.countries[me]+" pays $"+(-price*a)+" million to make the bank buy "+a+" share"+s+" of "+z.countries[venture]+"."); 
					} else {
						boldAlert(z.countries[me]+" sells "+a+" shares of "+z.countries[venture]+" to the bank for $"+(a*price)+" million.");
					}
					z.action = true;
					z.money[me] += price * a;
					z.shares[venture][me] -= a;
					z.shares[venture][z.numPlayers] += a;
					if(z.shares[venture][z.numPlayers] === 10){
						dissolveJointVenture(venture);
					}
				}
				z.gameOver = endGameCheck();
				mainMenu();
			});
		};
		
		
		if(selection.length === 1){
			howMany(selection[0]);
		} else {
			let promptText = "Which venture's shares would you like to sell? (1-"+selection.length+")";
			selection.forEach((venture,j)=>{
				promptText += "\n"+(j+1)+": "+z.countries[venture];
			});
			promptNum(promptText,(a)=>1>a||a>selection,mainMenu,(a)=>{
				howMany(selection[a-1]);
			});
		}
	} else if (ch === "Claim a Start-of-Year Mission" || ch === "Claim a Mission"){
		let context = getContext(me,ch);
		let mission = context;
		if(context === "Moon and Mars"){
			if(z.FAM){
				mission = "Human on the Moon";
			} else {
				mission = "Man on the Moon";
			}
		}
		let promptText = "Which mission would you like to claim? (1-2)";
		let selection = [];
		if(mission === "Man on the Moon"){
			selection = ["Man on the Moon","Man on the Moon +1.5"];
		} else if(mission === "Human on the Moon"){
			selection = ["Human on the Moon","Human on the Moon +1.5"];
		} else if (mission === "Mars Station"){
			selection = ["Mars Station","Mars Station +2"];
		} else if(mission === "Man on Mars"){
			selection = ["Man on Mars","Man on Mars +2.5"];
		} else if(mission === "Human on Mars"){
			selection = ["Human on Mars","Human on Mars +2.5"];
		} else if (mission === "Lunar Station"){
			selection = ["Lunar Station","Lunar Station +1.5"];
		}
		selection.forEach((miss,j)=>{
			promptText += "\n"+(j+1)+": "+miss;
		});
		promptNum(promptText,(a)=>1>a||a>2,mainMenu,(a)=>{
			completeMission(selection[a-1],z.countries[me]);
			removeOption(me,ch);
			if(ch === "Claim a Start-of-Year Mission"){
				startYearMissions();
			} else if(context === "Moon and Mars"){
				if(z.FAM){
					addOption(me,ch,"Human on Mars",true);
				} else {
					addOption(me,ch,"Man on Mars",true);
				}
			}
			mainMenu();
		});
	} else if (ch === "Rename a spacecraft"){
		let promptText = "Which spacecraft would you like to rename? (1-"+z.spacecraft[me].length+")";
		z.spacecraft[me].forEach((x,j)=>{
			promptText += "\n"+(j+1)+": "+z.spacecraft[me][j].name;
		});
		promptNum(promptText,(a)=>1>a||a>z.spacecraft[me].length,mainMenu,(a)=>{
			promptString("What would you like to rename the "+z.spacecraft[me][a-1]+" as?",mainMenu,(name)=>{
				for(let j = z.spacecraft.length - 1; j>=0; j--){
					for(let k = z.spacecraft[j].length - 1; k>=0; k--){
						if(z.spacecraft[j][k].name === name){
							addAlert("There is already a spacecraft by that name.");
							mainMenu();
							return;
						}
					}
				}
				
				boldAlert(z.countries[me] + " renames the "+z.spacecraft[me][a-1].name+" as the "+name+".");
				z.spacecraft[me][a-1].name = name;
				mainMenu();
			});
		});
	} else if (ch === "Decommission a spacecraft"){
		let selection = [];
		z.spacecraft[me].forEach((x,j)=>{
			if(z.spacecraft[me][j].numAstronauts() === 0 && z.spacecraft[me][j].timeTokens === 0){
				let loc = z.spacecraft[me][j].location;
				if(loc === "Earth" || loc === "Earth Orbit"){
					return;
				}
				if("Juno" in z.spacecraft[me][j] || "Atlas" in z.spacecraft[me][j] || 
				   "Soyuz" in z.spacecraft[me][j] || "Saturn" in z.spacecraft[me][j] ||
				   "Proton" in z.spacecraft[me][j] || ("Shuttle" in z.spacecraft[me][j] && "Large Fuel Tank" in z.spacecraft[me][j]) ||
			       ("Daedalus" in z.spacecraft[me][j] && "Small Fuel Tank" in z.spacecraft[me][j]) || z.spacecraft[me][j].isHabitat()){
					   
					return;
				}
				
				if(("Rover" in z.spacecraft[me][j] || "Rover (surveyed)" in z.spacecraft[me][j] || "Rover (explored)" in z.spacecraft[me][j] || "Rover (surveyed) (explored)" in z.spacecraft[me][j]) &&
				   (loc === "Venus" || loc === "Moon" || loc === "Mars" || loc === "Phobos" || loc === "Ceres") &&
				   (maxFeatures(loc) === z.features[loc].length && !z.features[loc].includes("Palladium") && !z.features[loc].includes("Platinum") && !z.features[loc].includes("Iridium") && 
					!z.features[loc].includes("Fossil?") && !z.features[loc].includes("Wreckage") && !z.features[loc].includes("Alien Object"))){
					
					return;
				}
			
				if(("Fuel Generator" in z.spacecraft[me][j] || "Fuel Generator (used)" in z.spacecraft[me][j]) && z.hazard[loc].includes("CO2")){
					return;
				}
				let auto = false;
				let ion = "Ion Thruster" in z.spacecraft[me][j] || "Ion Thruster (used)" in z.spacecraft[me][j];
				let slow = false;
				let zero = false;
				for(let conn in map[loc].connections){
					if(map[loc].connections[conn].automatic){
						auto = true;
					}
					if(map[loc].connections[conn].slow){
						slow = true;
					}
					if(map[loc].connections[conn].difficulty === 0 || map[loc].connections[conn].aerobrakingDifficulty === 0){
						zero = true;
					}
				}
				if(!auto && !zero && (!ion || !slow)){
					selection.push(j);
				}
			}
		});
		let promptText = "Which spacecraft would you like to decommission and remove from the game permanently? (1-"+selection.length+")";
		selection.forEach((index,j)=>{
			promptText += "\n"+(j+1)+": "+z.spacecraft[me][index].name+ " ("+z.spacecraft[me][index].location+")";
		});
		promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
			boldAlert(z.countries[me]+" decommissions the "+z.spacecraft[me][selection[a-1]]+".");
			z.spacecraft[me].splice(selection[a-1],1);
			mainMenu();
		});
	} else if (ch === "Cancel Ending My Year"){
		z.endedYear[me] = false;
		plainAlert(z.countries[me]+" has more things to do this year, after all.");
		mainMenu();
	} else if(ch === "Rare Options"){
		menuPage = "Rare Options";
		mainMenu();
	} else if (ch === "End My Year"){
		let confirmText = "";
		if((yearWillEnd() && !z.action && !z.sold) || everyoneElseEnded()){
			confirmText = "Confirming you want to end the year.";
		} else {
			confirmText = "Confirming you want to end your year; you will skip all future turns this year unless someone else completes a mission or cooperates with you.";
		}
		confirmify(confirmText,mainMenu,()=>{
			z.spacecraft[me].forEach((x,k)=>{
				z.spacecraft[me][k].untapProbesCapsules();
			});
			z.lastAdvancement[me] = null;
			if((yearWillEnd() && !z.action && !z.sold) || everyoneElseEnded()){
				z.passedTurns = 0;
				z.endedYear.forEach((x,k)=>{
					z.endedYear[k] = false;
				});
				z.action = false;
				z.sold = false;
				endYear();
			} else {
				z.endedYear[me] = true;
				plainAlert(z.countries[me]+ " ends their year.");
				if(!z.action && !z.sold){
					z.passedTurns++;
				}
				do {
					if(me !== z.turn){
						z.passedTurns++;
					}
					z.turnNumber++;
					z.turn = z.turnOrder[z.turnNumber % z.numPlayers];
				} while(z.endedYear[z.turn]);
				z.turnReal = z.turn;
				z.action = false;
				z.sold = false;
				gameState();

			}
			mainMenu();
		});
	} else if (ch === "Continue playing"){
		confirmify("Confirming you want to keep going after the end of the game.",mainMenu,()=>{
			timeTokenCheck();
			mainMenu();
		});
	} else if(ch === "Change your default banner"){
		promptNum("What imageID would you like to use for your new banner?",(n)=>(0 > n),mainMenu,function(choice){
			updateBanner(meReal,choice);
			mainMenu();
		});
	} else if(ch === "Change your username"){
		let confirmText = "Are you sure you want to change your username? You should only do this if:\n1) The person who set up the game misspelled your username.\n2) You are stepping down from the game and are handing control of your character to someone else";
		confirmify(confirmText,mainMenu,function(){
			promptString("What is the new BoardGameGeek username associated with this country?",mainMenu,function(prompted){
				z.usernames[meReal]=prompted;
				addAlert("Handing over control to "+prompted);
				t.value += "Handing over control of "+z.countries[meReal]+" to "+prompted+".\r\n";
				saveAndQuit();
				/* QUIT */
			});
		});
	} else if (ch === "Remove a Success from a 1-outcome advancement"){
		let selection = [];
		for(let advancement in z.advancements[meReal]){
			if(z.advancements[meReal][advancement].autoSuccess() && z.advancements[meReal][advancement].outcomes.length === 1){
				selection.push(advancement);
			}
		}
		let promptText = "Which advancement would you like to remove the last outcome from? (1-"+selection.length+")\nTechnically, you should only do this just after you have used that advancement.";
		selection.forEach((advancement,j)=>{
			promptText += "\n"+(j+1)+": "+advancement;
		});
		promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
			let advancement = selection[a-1];
			plainAlert(z.countries[meReal]+" removes the last Success from "+advancement+" for free.");
			z.advancements[meReal][advancement].discardAll();
			mainMenu();
		});
		
	} else if (ch === "Pay $10 million to remove a Success from Rendezvous"){
		confirmify("Confirming you want to pay $10 million to remove a Success from Rendezvous.\nTechnically, you should only do this just after you have used Rendezvous.",mainMenu,()=>{
			plainAlert(z.countries[meReal]+" pays $10 million to remove a Success from Rendezvous.");
			if(z.advancements[meReal].Rendezvous.backup){
				z.outcomeDiscardsBackup.push(z.advancements[meReal].Rendezvous.outcomes.shift());
			} else {
				z.outcomeDiscards.push(z.advancements[meReal].Rendezvous.outcomes.shift());
			}
			mainMenu();
		});
	} else if(ch === "Pay $10 million to remove a Success from Rover"){
		confirmify("Confirming you want to pay $10 million to remove a Success from Rover.\nTechnically, you should only do this just after you have used Rover.",mainMenu,()=>{
			plainAlert(z.countries[meReal]+" pays $10 million to remove a Success from Rover.");
			if(z.advancements[meReal].Rover.backup){
				z.outcomeDiscardsBackup.push(z.advancements[meReal].Rover.outcomes.shift());
			} else {
				z.outcomeDiscards.push(z.advancements[meReal].Rover.outcomes.shift());
			}
			mainMenu();
		});
	} else if (ch === "Cooperate with another agency"){
		let cooperate = (index,which)=>{
			switch(which){
				case "Money": {
					promptNum("How much money would you like to give "+z.countries[index]+"? (1-"+z.money[me]+")",(a)=>0>a||a>z.money[me],mainMenu,(a)=>{
						if(a===0){
						  mainMenu();
						} else {
							if(me === z.turnReal || index === z.turnReal){
								z.action = true;
							}
							boldAlert(z.countries[me]+ " gives "+z.countries[index]+" $"+a+" million.");
							z.money[me]-=a;
							z.money[index]+=a;
							if(z.numPlayers > index){
								z.endedYear[index] = false;
							}
							mainMenu();
						}
					});
				}
				break;
				case "Components": {
					let selection = [];
					for(let component in z.hq[me]){
						if(component in componentMasses){
							selection.push(component);
						}
					}
					for(let astronaut in z.hq[me].astronauts){
						selection.push(astronaut);
					}
					let promptText = "Which component would you like to give to "+z.countries[index]+"? (1-"+selection.length+")";
					selection.forEach((component,j)=>{
						promptText += "\n"+(j+1)+": "+component;
					});
					promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
						if(me === z.turnReal || index === z.turnReal){
							z.action = true;
						}
						let component = selection[a-1];
						boldAlert(z.countries[me]+" gives "+z.countries[index]+" "+component+".");
						if(z.numPlayers > index){
							z.endedYear[index] = false;
						}
						if(component in componentMasses){
							z.hq[me].removeComponent(component);
							z.hq[index].addComponent(component);
						} else {
							z.hq[index].astronauts[component] = z.hq[me].astronauts[component];
							delete z.hq[me].astronauts[component];
							if(z.stations){
								z.spacecraft[index].push(new Spacecraft());
								z.spacecraft[index][z.spacecraft[index].length-1].astronauts[component] = z.hq[me].astronauts[component];
								z.spacecraft[index][z.spacecraft[index].length-1].claimManOn(z.countries[index]);
								z.spacecraft[index].pop();
							}
						}
						mainMenu();
					});
				}
				break;
				case "Spacecraft": {
					let promptText = "Which spacecraft would you like to give to "+z.countries[index]+"? (1-"+z.spacecraft[me].length+")";
					z.spacecraft[me].forEach((x,j)=>{
						promptText += "\n"+(j+1)+": "+z.spacecraft[me][j].name+" ("+z.spacecraft[me][j].location+")";
					});
					promptNum(promptText,(a)=>1>a||a>z.spacecraft[me].length,mainMenu,(a)=>{
						if(me === z.turnReal || index === z.turnReal){
							z.action = true;
						}
						boldAlert(z.countries[me]+" gives "+z.countries[index]+" the "+z.spacecraft[me][a-1].name+".");
						z.spacecraft[index].push(z.spacecraft[me].splice(a-1,1)[0]);
						if(z.spacecraft[index][z.spacecraft[index].length-1].location !== "Earth"){
							z.spacecraft[index][z.spacecraft[index].length-1].visited("Space",z.countries[index]);
						}
						switch(z.spacecraft[index][z.spacecraft[index].length-1].location){
							case "Earth Orbit":
							case "Lunar Fly-By":
							case "Lunar Orbit":
							case "Mars Fly-By":
							case "Mars Orbit":
							case "Mars Cycler":
							case "Moon":
							case "Venus Fly-By":
							case "Venus Orbit":
							case "Phobos":
							case "Ceres":
							case "Mars":
							case "Mercury":
							case "Venus":
							case "Jupiter Fly-By":
							case "Saturn Fly-By":
							case "Titan":
								z.spacecraft[index][z.spacecraft[index].length-1].visited(z.spacecraft[index][z.spacecraft[index].length-1].location,z.countries[index]);
								break;
						}
						if(z.stations && (z.spacecraft[index][z.spacecraft[index].length-1].isHabitat() || z.spacecraft[index][z.spacecraft[index].length-1].location === "Earth")){
							z.spacecraft[index][z.spacecraft[index].length-1].claimManOn(z.countries[index]);
						}
						if(z.numPlayers > index){
							z.endedYear[index] = false;
						}
						mainMenu();
					});
				}
				break;
				case "Advancement": {
					let selection = [];
					for(let advancement in z.advancements[me]){
						if(!(advancement in z.advancements[index]) || !z.advancements[index][advancement].autoSuccess()){
							selection.push(advancement);
						}
					}
					let promptText = "Which advancement would you like to give to "+z.countries[index]+"? (1-"+selection.length+")\nMake ABSOLUTELY sure that "+z.countries[index]+" is okay with this trade before you perform it!";
					selection.forEach((advancement,j)=>{
						promptText += "\n"+(j+1)+": "+advancement;
					});
					promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
						let advancement = selection[a-1];
						if(me === z.turnReal || index === z.turnReal){
							z.action = true;
						}
						boldAlert(z.countries[me]+" gives "+z.countries[index]+" their "+z.advancements[me][advancement].outcomes.length+"-outcome "+advancement+".");
						if(advancement in z.advancements[index]){
							z.advancements[index][advancement].discardAll();
						}
						z.advancements[index][advancement] = new Advancement(z.advancements[me][advancement].outcomes.length,advancement==="Rover");
						if(z.numPlayers > index && z.endedYear[index]){
							z.endedYear[index] = false;
						}
						mainMenu();
					});
				}
				break;
				case "Point Tokens": {
					let max = Math.floor(z.pointTokens[me]);
					let give = (given)=>{
						if(given > 0){
							if(me === z.turnReal || index === z.turnReal){
								z.action = true;
							}
							z.pointTokens[index] += given;
							z.pointTokens[me] -= given;
							if(z.numPlayers > index && z.endedYear[index]){
								z.endedYear[index] = false;
							}
							let alertText = z.countries[me]+" gives "+z.countries[index]+" "+given+" point token";
							if(given !== 1){
								alertText += "s";
							}
							boldAlert(alertText + ".");
							z.gameOver = endGameCheck();
						}
						mainMenu();
					};
					let giveHalf = (given) =>{
						if(given === z.pointTokens[me]){
							give(given);
						} else {
							confirmify("Do you want to give an extra half-point, for a total of "+given+".5 points?",()=>{
								give(given);
							},()=>{
								give(given+0.5);
							},"YES","NO");
						}
					};
					if(max === 0){
						giveHalf(0);
					}
					promptNum("How many whole points (no decimals) would you like to give to "+z.countries[index]+"? (0-"+max+")\nYou will be able to give a half point on the next screen.",(a)=>0>a||a>max,mainMenu,(a)=>{
						giveHalf(a);
					});
				}
				break;
				case "Shares": {
					let selection = [];
					for(let j = 0; !(j>=z.shares.length); j++){
						if(z.shares[j][me] > 0){
							selection.push(j);
						}
					}
					let promptText = "Which joint venture's shares would you like to give to "+z.countries[index]+"? (1-"+selection.length+")";
					selection.forEach((index,j)=>{
						promptText += "\n"+(j+1)+": "+z.countries[index];
					});
					
					let give = (venture)=>{
						let promptText = "How many shares of "+z.countries[venture]+" would you like to give to "+z.countries[index]+"? (1-"+z.shares[venture][me]+")";
						promptNum(promptText,(a)=>1>a||a>z.shares[venture][me],mainMenu,(a)=>{
							let s = "s";
							if(a === 1){
								s = "";
							}
							boldAlert(z.countries[me]+" gives "+a+" share"+s+" of "+z.countries[venture]+" to "+z.countries[index]+".");
							z.shares[venture][me] -= a;
							z.shares[venture][index] += a;
							if(me === z.turnReal || index === z.turnReal){
								z.action = true;
							}
							if(z.numPlayers > index && z.endedYear[index]){
								z.endedYear[index] = false;
							}
							if(z.shares[venture][index] === 10){
								dissolveJointVenture(venture,index);
							}
							z.gameOver = endGameCheck();
							mainMenu();
						});
					};
					
					if(selection.length === 1){
						give(selection[0]);
					} else {
						promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
							give(selection[a-1]);
						});
					}
				}
				
			}
		};
		
		let choosePartner = (index) =>{
			let selection = [];
			if(isTrading(index)){
				if(z.money[me] > 0){
					selection.push("Money");
				}
				if(z.hq[me].nonEmpty()){
					selection.push("Components");
				}
				if(z.spacecraft[me].length > 0){
					selection.push("Spacecraft");
				}
				if(z.numPlayers > me && z.numPlayers > index){
					for(let advancement in z.advancements[me]){
						if(!(advancement in z.advancements[index]) || !z.advancements[index][advancement].autoSuccess()){
							selection.push("Advancement");
							break;
						}
					}
				}
				if(z.stations && z.pointTokens[me] > 0){
					selection.push("Point Tokens");
				}
			}
			if(z.stations && z.numPlayers > me && z.numPlayers > index){
				selection.push("Shares");
			}
			if(selection.length === 1){
				cooperate(index,selection[0]);
			} else {
				let promptText = "What would you like to give to "+z.countries[index]+"? (1-"+selection.length+")";
				selection.forEach((opt,j)=>{
					promptText += "\n"+(j+1)+": "+opt;
				});
				promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
					cooperate(index,selection[a-1]);
				});
			}
		};
		

		if(z.countries.length === 2){
			choosePartner((me+1)%2);
		} else {
			let promptText = "Which country would you like to cooperate with? (1-"+z.countries.length+")";
			for(let j = 0; !(j>=z.countries.length); j++){
				promptText += "\n"+(j+1)+": ";
				if(j === me){
					promptText += "(cannot cooperate with yourself)";
				} else {
					promptText += z.countries[j];
				}
			}
			promptNum(promptText,(a)=>1>a||a>z.countries.length||a-1===me,mainMenu,(a)=>{
				choosePartner(a-1);
			});
			
		}
	} else if(ch === "Pay to remove a Success from Rover"){
		let cost = 10;
		let outcome = "Success";
		let whichRover = 1;
		if(z.advancements[meReal][z.lastAdvancement[meReal]].lastOutcome[0] === SUCCESS){
			whichRover = 1;
		}
		confirmify("Confirming you want to pay $"+cost+" million to remove a "+outcome+" from "+z.lastAdvancement[meReal]+".",mainMenu,()=>{
			z.money[meReal] -= cost;
			z.advancements[meReal][z.lastAdvancement[meReal]].removeLastOutcome(whichRover);
			plainAlert(z.countries[meReal]+" pays $"+cost+" million to remove a "+outcome+" from "+z.lastAdvancement[meReal]+".");
			mainMenu();
		});
	} else if(ch === "Pay to remove a Minor Failure from Rover"){
		let cost = 5;
		let outcome = "Minor Failure";
		let whichRover = 1;
		if(z.advancements[meReal][z.lastAdvancement[meReal]].lastOutcome[0] === MINOR_FAILURE){
			whichRover = 1;
		}
		confirmify("Confirming you want to pay $"+cost+" million to remove a "+outcome+" from "+z.lastAdvancement[meReal]+".",mainMenu,()=>{
			z.money[meReal] -= cost;
			z.advancements[meReal][z.lastAdvancement[meReal]].removeLastOutcome(whichRover);
			plainAlert(z.countries[meReal]+" pays $"+cost+" million to remove a "+outcome+" from "+z.lastAdvancement[meReal]+".");
			mainMenu();
		});
	} else if(ch === "Pay to remove a Major Failure from Rover"){
		let cost = 5;
		let outcome = "Major Failure";
		let whichRover = 1;
		if(z.advancements[meReal][z.lastAdvancement[meReal]].lastOutcome[0] === MAJOR_FAILURE){
			whichRover = 1;
		}
		confirmify("Confirming you want to pay $"+cost+" million to remove a "+outcome+" from "+z.lastAdvancement[meReal]+".",mainMenu,()=>{
			z.money[meReal] -= cost;
			z.advancements[meReal][z.lastAdvancement[meReal]].removeLastOutcome(whichRover);
			plainAlert(z.countries[meReal]+" pays $"+cost+" million to remove a "+outcome+" from "+z.lastAdvancement[meReal]+".");
			mainMenu();
		});
	} else if(ch.startsWith("Pay to remove the ")){
		let cost = 5;
		let outcome = "Major Failure";
		if(z.advancements[meReal][z.lastAdvancement[meReal]].lastOutcome === SUCCESS){
			cost = 10;
			outcome = "Success";
		} else if(z.advancements[meReal][z.lastAdvancement[meReal]].lastOutcome === MINOR_FAILURE){
			outcome = "Minor Failure";
		}
		confirmify("Confirming you want to pay $"+cost+" million to remove a "+outcome+" from "+z.lastAdvancement[meReal]+".",mainMenu,()=>{
			z.money[meReal] -= cost;
			z.advancements[meReal][z.lastAdvancement[meReal]].removeLastOutcome();
			plainAlert(z.countries[meReal]+" pays $"+cost+" million to remove a "+outcome+" from "+z.lastAdvancement[meReal]+".");
			let advancement = z.lastAdvancement[meReal];
			z.lastAdvancement[meReal] = null;
			/* TODO: other pauses */
			if(advancement === "Synthesis" && !canProduce()){
				finishProduction();
			}
			mainMenu();
		});
	} else if(ch === "Abort maneuver"){
		confirmify("Confirming you want to abort the current maneuver.",mainMenu,()=>{
			plainAlert("Maneuver aborted.");
			z.spacecraft[me][z.maneuvering].burntMass = 0;
			if(z.stations){
				z.spacecraft[me][z.maneuvering].burntShuttles = 0;
				z.spacecraft[me][z.maneuvering].burntDaedalus = 0;
			}
			abortManeuver();
			mainMenu();
		});
	} else if(ch === "View my agency"){
		let alertText = playerReport(me);
		alertText += "\n\n"+bold("Secret Information:");
		let any = false;
		for(let hazard in z.hazard){
			if(!z.revealed[hazard] && z.known[me][hazard]){
				alertText += "\n"+hazard + ": "+z.hazard[hazard];
				any = true;
			}
		}
		if(z.stations && z.secrets[me].length > 0){
			any = true;
			alertText += "\nBuried Feature cards: ";
			for(let j = 0; !(j>=z.secrets[me].length); j++){
				if(j!== 0){
					alertText += ", ";
				}
				alertText += z.secrets[me][j];
			}
		}
		if(!any){
			alertText += "\n(None)";
		}
		addAlert(alertText);
		mainMenu();
	} else if (ch === "View another of your agencies"){
		let selection = [meReal];
		for(let j = z.numPlayers; !(j>=z.shares.length); j++){
			if(z.shares[j][meReal] > 0){
				selection.push(j);
			}
		}
		let promptText = "Which agency would you like to view? (1-"+selection.length+")";
		selection.forEach((index,j)=>{
			promptText += "\n"+(j+1)+": "+z.countries[index];
		});
		promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
			let k = selection[a-1];
			let alertText = playerReport(k);
			alertText += "\n\n"+bold("Secret Information:");
			let any = false;
			for(let hazard in z.hazard){
				if(!z.revealed[hazard] && z.known[k][hazard]){
					alertText += "\n"+hazard + ": "+z.hazard[hazard];
					any = true;
				}
			}
			if(z.stations && z.secrets[k].length > 0){
				any = true;
				alertText += "Buried Feature cards: ";
				for(let j = 0; !(j>=z.secrets[k].length); j++){
					if(j!== 0){
						alertText += ", ";
					}
					alertText += z.secrets[k][j];
				}
			}
			if(!any){
				alertText += "\n(None)";
			}
			addAlert(alertText);
			mainMenu();
		});
	} else if(ch === "Display game state"){
		confirmify("Confirming you want to display the game state.  This is normally displayed at the start of turns automatically.",mainMenu,()=>{
			gameState();
			mainMenu();
		});
	} else if(ch === "[Advanced Start] Pick a free advancement"){
		let selection = [];
		advancementNames.forEach((advancement)=>{
			if(!(advancement in z.advancements[meReal])){
				selection.push(advancement);
			}
		});
		let promptText = "Which advancement would you like to receive with zero outcomes? (1-"+selection.length+")";
		selection.forEach((advancement,j)=>{
			promptText += "\n"+(j+1)+": "+advancement;
		});
		promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
			plainAlert(z.countries[meReal] += " gets "+selection[a-1]+" for free with no outcomes.");
			z.advancements[meReal][selection[a-1]] = new Advancement(0);
			if(getContext(me,ch)){
				removeOption(me,ch);
				addOption(me,ch,false,true);
			} else {
				removeOption(me,ch);
			}
			mainMenu();
		});
	} else if(ch === "Sell Minerals"){
		let counts = {};
		let mineralTypes = [];
		for(let hazard in z.hazard){
			if(z.hazard[hazard].includes("Minerals") && z.revealed[hazard]){
				mineralTypes.push(hazard + " Sample");
			} else if(z.stations && hazard in z.features && 
			   (z.features[hazard].includes("Gold") || z.features[hazard].includes("Cobalt") || z.features[hazard].includes("Rhodium") || z.features[hazard].includes("Germanium") || z.features[hazard].includes("Ruthenium"))){
				
				mineralTypes.push(hazard + " Sample");
			}
			if(z.stations && hazard in z.features && (z.features[hazard].includes("Rhodium") || z.features[hazard].includes("Germanium"))){
				mineralTypes.push("Fossil?");
			}
		}
		mineralTypes.push("Palladium");
		mineralTypes.push("Platinum");
		mineralTypes.push("Iridium");
		mineralTypes.forEach((sample)=>{
			if(sample in z.hq[me]){
				if(sample in counts){
					counts[sample] += z.hq[me][sample];
				} else {
					counts[sample] = z.hq[me][sample];
				}
			}
			z.spacecraft[me].forEach((sp,k)=>{
				if(z.spacecraft[me][k].location === "Earth" && sample in z.spacecraft[me][k]){
					if(sample in counts){
						counts[sample] += z.spacecraft[me][k][sample];
					} else {
						counts[sample] += z.spacecraft[me][k][sample];
					}
				}
			});
		});
		
		let sellMinerals = (sample,num) => {
			let value = 0;
			switch(sample){
				case "Moon Sample":
					if(z.stations){
						value = 15*num;
					} else {
						value = 25*num;
					}
					break;
				case "Callisto Sample":
					value = 25*num;
					break;
				case "Io Sample":
					value = 75*num;
					break;
				case "Mars Sample":
					if(z.stations){
						value = 30*num;
					} else {
						value = 50*num;
					}
					break;
				case "Ceres Sample":
					if(z.stations){
						value = 15*num;
					} else {
						value = 50*num;
					}
					break;
				case "Palladium":
				case "Platinum":
				case "Fossil?":
					value = 30*num;
					break;
				case "Iridium":
					value = 40*num;
					break;
				default:
					value = 50*num;
					break;
			}
			plainAlert(z.countries[me] + " sells $"+value+" million worth of "+sample+"s.");
			z.money[me] += value;
			if(sample in z.hq[me]){
				if(num > z.hq[me][sample]){
					num -= z.hq[me][sample];
					z.hq[me].removeComponent(sample,z.hq[me][sample]);
				} else {
					z.hq[me].removeComponent(sample,num);
					num = 0;
				}
			}
			if(num > 0){
				for(let k = z.spacecraft[me].length-1; k>=0; k--){
					if(num >= z.spacecraft[me][k][sample]){
						num -= z.spacecraft[me][k][sample];
						z.spacecraft[me][k].removeComponent(sample,z.spacecraft[me][k][sample]);
						if(!z.spacecraft[me][k].nonEmpty()){
							plainAlert("The "+z.spacecraft[me][k].name + " is disassembled.");
							z.spacecraft[me].splice(k,1);
						}
					} else {
						z.spacecraft[me][k].removeComponent(sample,num);
						num = 0;
						break;
					}
				}
			}
			z.sold = true;
			mainMenu();
		};
		
		let howMany = (sample,max)=>{
			if(max === 1){
				sellMinerals(sample,1);
			} else {
				promptNum("How many "+sample+"s would you like to sell? (1-"+max+")",(a)=>0>a||a>max,mainMenu,(a)=>{
					if(a === 0){
						mainMenu();
					} else {
						sellMinerals(sample,a);
					}
				});
			}
		};
		
		
		let selection = Object.keys(counts);
		if(selection.length === 1){
			howMany(selection[0],counts[selection[0]]);
		} else {
			let promptText = "Which type of sample would you like to sell? (1-"+selection.length+")";
			selection.forEach((sample,j)=>{
				promptText += "\n"+(j+1)+": "+sample;
			});
			promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
				howMany(selection[a-1],counts[selection[a-1]]);
			});
		}
	} else if(ch === "Analyze Alien Object"){
		let selection = [];
		advancementNames.forEach((advancement)=>{
			if(!(advancement in z.advancements[meReal])){
				selection.push(advancement);
			}
		});
		if(z.outer){
			if(!("Aerobraking" in z.advancements[meReal])){
				selection.push("Aerobraking");
			}
			if(!("Proton Rockets" in z.advancements[meReal])){
				selection.push("Proton Rockets");
			}
		}
		if(!("Synthesis" in z.advancements[meReal])){
			selection.push("Synthesis");
		}
		if(!("Rover" in z.advancements[meReal])){
			selection.push("Synthesis");
		}
		if(!("Space Shuttle" in z.advancements[meReal])){
			selection.push("Space Shuttle");
		}
		if(selection.length === 0){
			for(let advancement in z.advancements[meReal]){
				if(z.advancements[meReal][advancement].outcomes.length !== 0){
					selection.push(advancement);
				}
			}
		}
		
		let trade = ()=>{
			plainAlert(z.countries[me]+" earns 8 points.");
			z.points[me] += 8;
			z.pointCards[me].push("Alien Object");
			if("Alien Object" in z.hq[me]){
				z.hq[me].removeComponent("Alien Object");
			} else {
				for(let k = z.spacecraft[me].length - 1; k >= 0 ; k--){
					if("Alien Object" in z.spacecraft[me][k] && z.spacecraft[me][k].location === "Earth"){
						z.spacecraft[me][k].removeComponent("Alien Object");
						z.spacecraft[me][k].didSomething = true;
						if(!z.spacecraft[me][k].nonEmpty()){
							plainAlert("The "+z.spacecraft[me][k].name + " is disassembled.");
							z.spacecraft[me].splice(k,1);
						}
						break;
					}
				}
			}
			z.action = true;
			mainMenu();
		};
		
		let getAdvancement = (advancement) =>{
			boldAlert(z.countries[meReal] + " trades in the Alien Object for a fully upgraded "+advancement+".");
			if(advancement in z.advancements[meReal]){
				z.advancements[meReal][advancement].discardAll();
			} else {
				z.advancements[meReal][advancement] = new Advancement(0,advancement==="Rover");
			}
			trade();
		};
		
		if(selection.length === 0){
			addAlert("Congratulations!");
			boldAlert(z.countries[me]+" hands in the Alien Object.");
			trade();
		} else if(selection.length === 1){
			getAdvancement(selection[0]);
		} else {
			let promptText = "Which advancement would you like to have with zero outcomes? (1-"+selection.length+")";
			selection.forEach((advancement,j)=>{
				promptText += "\n"+(j+1)+": "+advancement;
			});
			promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
				getAdvancement(selection[a-1]);
			});
		}
	} else if (ch === "Analyze Phobos Sample"){
		let selection = [];
		advancementNames.forEach((advancement)=>{
			if(!(advancement in z.advancements[me]) || z.advancements[me][advancement].outcomes.length !== 0){
				selection.push(advancement);
			}
		});
		if(z.outer){
			if(!("Aerobraking" in z.advancements[me]) || z.advancements[me].Aerobraking.outcomes.length !== 0){
				selection.push("Aerobraking");
			}
			if(!("Proton Rockets" in z.advancements[me]) || z.advancements[me]["Proton Rockets"].outcomes.length !== 0){
				selection.push("Proton Rockets");
			}
		}
		
		let getAdvancement = (advancement) =>{
			plainAlert(z.countries[me] + " trades in a Phobos Sample for a fully upgraded "+advancement+".");
			if(advancement in z.advancements[me]){
				z.advancements[me][advancement].discardAll();
			} else {
				z.advancements[me][advancement] = new Advancement(0);
			}
			if("Phobos Sample" in z.hq[me]){
				z.hq[me].removeComponent("Phobos Sample");
			} else {
				for(let k = z.spacecraft[me].length - 1; k >= 0 ; k--){
					if("Phobos Sample" in z.spacecraft[me][k] && z.spacecraft[me][k].location === "Earth"){
						z.spacecraft[me][k].removeComponent("Phobos Sample");
						if(!z.spacecraft[me][k].nonEmpty()){
							plainAlert("The "+z.spacecraft[me][k].name + " is disassembled.");
							z.spacecraft[me].splice(k,1);
						}
						break;
					}
				}
			}
			z.sold = true;
			mainMenu();
		};
		
		if(selection.length === 1){
			getAdvancement(selection[0]);
		} else {
			let promptText = "Which advancement would you like to have with zero outcomes? (1-"+selection.length+")";
			selection.forEach((advancement,j)=>{
				promptText += "\n"+(j+1)+": "+advancement;
			});
			promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
				getAdvancement(selection[a-1]);
			});
		}
	} else if(ch === "I'm done with arrival hazards"){
		delete z.arrivals;
		timeTokenCheck();
		mainMenu();
	} else if(ch === "I'm done with end-of-year hazards"){
		delete z.endYearHazards;
		endYearHazardCheck();
		mainMenu();
	} else if(ch === "Handle arrival hazards"){
		if(z.arrivals.length === 1){
			let name = z.arrivals.pop();
			z.spacecraft[me].forEach((sp,k)=>{
				if(z.spacecraft[me][k].name === name){
					z.maneuvering = k;
				}
			});
			z.maneuveringDestination = z.spacecraft[z.turn][z.maneuvering].location;
			z.maneuveringTime = 0;
			z.maneuveringDifficulty = 0;
			z.thrusting = false;
			z.thrust = 0;
			z.maneuverHazards = z.spacecraft[z.turn][z.maneuvering].arrivalHazards;
			delete z.spacecraft[z.turn][z.maneuvering].arrivalHazards;
			popHazard(meReal);
			mainMenu();
		} else {
			let promptText = "Which spacecraft's arrival hazards would you like to deal with next? (1-"+z.arrivals.length+")";
			z.arrivals.forEach((name,j)=>{
				z.spacecraft[me].forEach((sp,k)=>{
					if(z.spacecraft[me][k].name === name){
						promptText += "\n"+(j+1)+": "+name+" (arriving at "+z.spacecraft[me][k].location+")";
					}
				});	
			});
			promptNum(promptText,(a)=>1>a||a>z.arrivals.length,mainMenu,(a)=>{
				let name = z.arrivals.splice(a-1,1)[0];
				z.spacecraft[me].forEach((sp,k)=>{
					if(z.spacecraft[me][k].name === name){
						z.maneuvering = k;
					}
				});
				z.maneuveringDestination = z.spacecraft[z.turn][z.maneuvering].location;
				z.maneuveringTime = 0;
				z.maneuveringDifficulty = 0;
				z.thrusting = false;
				z.thrust = 0;
				z.maneuverHazards = z.spacecraft[z.turn][z.maneuvering].arrivalHazards;
				delete z.spacecraft[z.turn][z.maneuvering].arrivalHazards;
				popHazard(meReal);
				mainMenu();
			});
		}
	} else if(ch === "Handle end-of-year hazards"){
		if(z.endYearHazards.length === 1){
			z.maneuvering = getIndex(me,z.endYearHazards.pop());
			z.maneuveringDestination = z.spacecraft[z.turn][z.maneuvering].location;
			z.maneuveringTime = 0;
			z.maneuveringDifficulty = 0;
			z.thrusting = false;
			z.thrust = 0;
			z.maneuverHazards = [map[z.spacecraft[z.turn][z.maneuvering].location].endYearHazard];
			popHazard(meReal);
			mainMenu();
		} else {
			let promptText = "Which spacecraft's end-of-year hazards would you like to deal with next? (1-"+z.endYearHazards.length+")";
			z.endYearHazards.forEach((name,j)=>{
				promptText += "\n"+(j+1)+": "+name+" ("+z.spacecraft[me][getIndex(me,name)].location+")";
			});
			promptNum(promptText,(a)=>1>a||a>z.endYearHazards.length,mainMenu,(a)=>{
				z.maneuvering = getIndex(me,z.endYearHazards.splice(a-1,1)[0]);
				z.maneuveringDestination = z.spacecraft[z.turn][z.maneuvering].location;
				z.maneuveringTime = 0;
				z.maneuveringDifficulty = 0;
				z.thrusting = false;
				z.thrust = 0;
				z.maneuverHazards = [map[z.spacecraft[z.turn][z.maneuvering].location].endYearHazard];
				popHazard(meReal);
				mainMenu();
			});
		}
	} else if(ch === "[Supplies] Kill unfed astronauts" || ch === "[Food] Kill unfed astronauts"){
		let selection = [];
		z.spacecraft[me].forEach((x,k)=>{
			if(z.spacecraft[me][k].location !== "Earth" && z.spacecraft[me][k].isCrewed()){
				let remainder = z.spacecraft[me][k].numAstronauts() % 5;
				let suppliesNeeded = (z.spacecraft[me][k].numAstronauts() - remainder)/5;
				if(remainder !== 0){
					suppliesNeeded++;
				}
				if(!z.stations){
					if(suppliesNeeded > z.spacecraft[me][k].Supplies){
						for(let astronaut in z.spacecraft[me][k].astronauts){
							selection.push([astronaut,k]);
						}
					} 
				} else {
					if(suppliesNeeded > z.spacecraft[me][k].Food){
						for(let astronaut in z.spacecraft[me][k].astronauts){
							selection.push([astronaut,k]);
						}
					} 
				}
			}
		});
		let promptText = "Which astronaut are you killing (1-"+selection.length+")";
		selection.forEach((v,j)=>{
			promptText += "\n"+(j+1)+": "+v[0]+" (aboard the "+z.spacecraft[me][v[1]].name+")";
		});
		promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
			if(z.spacecraft[me][selection[a-1][1]].location === "Mars Orbit" || z.spacecraft[me][selection[a-1][1]].location === "Mars Fly-By" ||  z.spacecraft[me][selection[a-1][1]].location === "Mars Cycler"){
				addAlert("You do know you aren't playing Tharsis, right?");
			}
			z.spacecraft[me][selection[a-1][1]].killAstronaut(selection[a-1][0]);
			z.gameOver = endGameCheck();
			if(!mustAnyStarve()){
				removeOption(me,ch);
				suppliesCheck();
			}
			mainMenu();
		});
	} else if(ch === "Choose an astronaut to die"){
		let selection = [];
		z.spacecraft[me].forEach((s,k)=>{
			let seats = 0;
			z.lifeSupportCapsules.forEach((x,j)=>{
				if(z.lifeSupportCapsules[j][0] === k && z.lifeSupportCapsules[j][2]){
					seats += capsuleSeats[z.lifeSupportCapsules[j][1]];
				}
			});
			if(z.spacecraft[me][k].numAstronauts() > seats){
				for(let astronaut in z.spacecraft[me][k].astronauts){
					selection.push([astronaut,k]);
				}
			}
		});
		
		let promptText = "Which astronaut are you killing (1-"+selection.length+")";
		selection.forEach((v,j)=>{
			promptText += "\n"+(j+1)+": "+v[0]+" (aboard the "+z.spacecraft[me][v[1]].name+")";
		});
		promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
			t.value += selection[a-1][0] + " goes outside.  They may be some time.\r\n";
			z.spacecraft[me][selection[a-1][1]].killAstronaut(selection[a-1][0]);
			z.gameOver = endGameCheck();
			if(!mustAnyDie()){
				delete z.lifeSupportCapsules;
				for(let j = 0; !(j>=z.numPlayers); j++){
					z.lastAdvancement[j] = null;
				}
				lifeSupportCheck();
			}
			mainMenu();
		});
	} else if(ch === "Check Life Support in a caspule"){
		let selection = [];
		z.lifeSupportCapsules.forEach((v,j)=>{
			if(z.lifeSupportCapsules[j][2] === null){
				selection.push(j);
			}
		});
		if(selection.length === 1){
			faceLifeSupport(selection[0],meReal);
			mainMenu();
		} else {
			let promptText = "Which capsule would you like to check Life Support for? (1-"+selection.length+")";
			selection.forEach((index,j)=>{
				promptText += "\n"+(j+1)+": "+z.lifeSupportCapsules[index][1]+" on the "+z.spacecraft[me][z.lifeSupportCapsules[index][0]].name;
			});
			promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
				faceLifeSupport(selection[a-1],meReal);
				mainMenu();
			});
		}
	} else if(ch === "I'm done with Life Support"){
		/* TODO: trigger then when you buy off Life Support */
		confirmify("Confirming you're finished with Life Support for this year.",mainMenu,()=>{
			delete z.lifeSupportCapsules;
			for(let j = 0; !(j>=z.numPlayers); j++){
				z.lastAdvancement[j] = null;
			}
			lifeSupportCheck();
			mainMenu();
		});
	} else if(ch === "Incapacitate an astronaut"){
		/* Aldrin issues */
		let context = getContext(me,ch);
		let promptText = "Which astronaut would you like to incapacitate? (1-"+context.length+")";
		context.forEach((astronaut,j)=>{
			promptText += "\n"+(j+1)+": "+astronaut;
		});
		promptNum(promptText,(a)=>1>a||a>context.length,mainMenu,(a)=>{
			let astronaut = context[a-1];
			context.splice(a-1,1);
			z.spacecraft[me].forEach((x,k)=>{
				if(astronaut in z.spacecraft[me][k]){
					z.spacecraft[me][k].astronauts[astronaut].incapacitated = true;
					plainAlert(astronaut + " is incapacitated.");
				}
			});
			removeOption(me,ch);
			if(context.length > 0){
				addOption(me,ch,context,false);
			}
			mainMenu();
		});
	} else if(ch === "Decide whether to reveal the encountered hazard"){
		let hazard = getContext(me,ch);
		let confirmText = "Would you like to reveal "+hazard+", or destroy your spacecraft?";
		confirmify(confirmText,()=>{
			removeOption(me,ch);
			plainAlert(z.countries[me]+" destroys the "+z.spacecraft[me][z.maneuvering].name+".");
			z.spacecraft[me][z.maneuvering].killAll();
			z.spacecraft[me].splice(z.maneuvering,1);
			abortManeuver();
			mainMenu();
		},()=>{
			removeOption(me,ch);
			revealHazard(hazard);
			z.maneuverHazards.push(hazard);
			z.justRevealed = true;
			popHazard(meReal);
			mainMenu();
		},"Reveal Hazard","Destroy Spacecraft");
	} else if (ch === "Do not Explore a Feature"){
		confirmify("Confirming you do not want to explore a Feature with this landing.",mainMenu,()=>{
			plainAlert(z.countries[z.turn]+" declines to explore a feature.");
			removeOption(me,ch);
			removeOption(me,"Explore a Feature");
			popHazard(meReal);
			mainMenu();
		});
	} else if (ch === "Explore a Feature"){
		confirmify("Confirming you want to explore a Feature.",mainMenu,()=>{
			let myPilot = false;
			let anyPilot = false;

			for(let j = 0; !(j>=z.spacecraft.length); j++){
				for(let k = 0; !(k>=z.spacecraft[j].length); k++){
					if(z.spacecraft[j][k].location === z.spacecraft[me][z.maneuvering].location){
						for(let astronaut in z.spacecraft[j][k].astronauts){
							if(!z.spacecraft[j][k].astronauts[astronaut].incapacitated && z.spacecraft[j][k].astronauts[astronaut].type === "Pilot"){
								anyPilot = true;
								if(meReal === j || j === me || (j >= z.numPlayers && numShareholders(j) === 1 && soleShareholder(j) === meReal)){
									myPilot = true;
								}
							}
						}
					}
				}
			}
			if(anyPilot && z.featureDecks[z.spacecraft[me][z.maneuvering].location].length === 1){
				addAlert("There's only one Venus Feature available to explore, so a Pilot won't help here.");
				anyPilot = false;
			}
			if(anyPilot){
				let promptText = "Would you like to enlist the assistance of a Pilot to draw 2 Feature cards and choose one?";
				if(!myPilot){
					promptText += "\nYou'll need to have the permission of the Pilot's agency.";
				}
				promptText+="\n1: Yes\n2: No";
				promptNum(promptText,(a)=>1>a||a>2,mainMenu,(a)=>{
					removeOption(me,ch);
					removeOption(me,"Do not Explore a Feature");
					if(a === 1){
						let feature1 = z.featureDecks[z.spacecraft[me][z.maneuvering].location][z.featureDecks[z.spacecraft[me][z.maneuvering].location].length-1];
						let feature2 = z.featureDecks[z.spacecraft[me][z.maneuvering].location][z.featureDecks[z.spacecraft[me][z.maneuvering].location].length-2];
						addAlert("You find "+feature1+" and "+feature2+".  You must now choose one to reveal; the other goes on the bottom of the deck.");
						t.value += z.countries[me]+" uses a Pilot to draw 2 features; they must reveal one, and place the other on the bottom of the deck.\r\n";
						addOption(me,"Choose a Feature to Reveal",undefined,true);
					} else {
						if(revealFeature()){
							popHazard(meReal);
						}	
					}
					mainMenu();
				});
			} else {
				removeOption(me,ch);
				removeOption(me,"Do not Explore a Feature");
				if(revealFeature()){
					popHazard(meReal);
				}
				mainMenu();
			}
			
		});
	} else if(ch === "Choose a Feature to Reveal"){
		let promptText = "Which feature would you like to reveal? (1-2)\nThe other will go on the bottom of the deck.";
		let feature1 = z.featureDecks[z.spacecraft[me][z.maneuvering].location][z.featureDecks[z.spacecraft[me][z.maneuvering].location].length-1];
		let feature2 = z.featureDecks[z.spacecraft[me][z.maneuvering].location][z.featureDecks[z.spacecraft[me][z.maneuvering].location].length-2];
		promptText += "\n1: "+feature1;
		promptText += "\n2: "+feature2;
		promptNum(promptText,(a)=>1>a||a>2,mainMenu,(a)=>{
			let done = false;
			if(a === 1){
				done = revealFeature();
				let buried = z.featureDecks[z.spacecraft[me][z.maneuvering].location].pop();
				z.featureDecks[z.spacecraft[me][z.maneuvering].location].unshift(buried);
				z.secrets[me].push(buried);
			} else {
				let buried = z.featureDecks[z.spacecraft[me][z.maneuvering].location].pop();
				z.featureDecks[z.spacecraft[me][z.maneuvering].location].unshift(buried);
				z.secrets[me].push(buried);
				done = revealFeature();
			}
			removeOption(me,ch);
			if(done){
				popHazard(meReal);
			}
			mainMenu();
		});
	} else if (ch === "Attempt the optional Landing"){
		let confirmText = "Confirming you want to have the "+z.spacecraft[me][z.maneuvering].name+" perform the optional Landing?";
		if(!("Landing" in z.advancements[meReal])){
			confirmText += "\nYou do not have Landing, so doing so will destroy your spacecraft!";
		}
		confirmify(confirmText,mainMenu,()=>{
			plainAlert(z.countries[me] + " decides to face the optional Landing hazard.");
			z.maneuverHazards.push("Landing");
			removeOption(me,ch);
			removeOption(me,"Do not attempt the optional Landing");
			popHazard(meReal);
			mainMenu();
		});
	} else if (ch === "Do not attempt the optional Landing"){
		confirmify("Confirming you do not want to attempt the optional Landing.", mainMenu, ()=>{
			plainAlert(z.countries[me] + " declines to face the optional Landing hazard.");
			removeOption(me,ch);
			removeOption(me,"Attempt the optional Landing");
			popHazard(meReal);
			mainMenu();
		});
	} else if(ch === "[Re-entry] Assign astronauts to seats"){
		
		let pickSeats = (astronauts) =>{
			if(astronauts.length === 0){
				for(let k = 0; !(k>=z.reentryCapsules.length); k++){
					let component = z.reentryCapsules[k];
					if(component.startsWith("Eagle") || component.startsWith("Aldrin") || component.startsWith("Space Habitat") || component.endsWith("(damaged)")){
						z.spacecraft[me][z.maneuvering].removeComponent(component);
						plainAlert(component + " burns up upon Re-entry.");
						/* TODO: W083 */
						z.reentryAstronauts[k].forEach((astronaut)=>{
							z.spacecraft[me][z.maneuvering].killAstronaut(astronaut);
						});
						z.gameOver = endGameCheck();
						z.reentryCapsules.splice(k,1);
						z.reentryAstronauts.splice(k,1);
						k--;
					}
				}
				removeOption(me,ch);
				if(z.advancements[meReal]["Re-entry"].autoSuccess()){
					plainAlert("Atmospheric Entry successful.");
					popHazard(meReal);
				} else {
					if(identicalReentry()){
						faceReentry(0,meReal);
					} else {
						plainAlert("Each capsule on the "+z.spacecraft[me][z.maneuvering].name + " must now face Re-entry.");
					}
				}
				mainMenu();
			} else {
				let selection = [];
				z.reentryCapsules.forEach((capsule,j)=>{
					if(capsuleSeats[capsule] - z.reentryAstronauts[j].length > 0){
						selection.push(j);
					}
				});
				if(selection.length === 1){
					z.reentryAstronauts[selection[0]].push(astronauts.shift());
					pickSeats(astronauts);
				} else {
					let promptText = "On which capsule will "+astronauts[0]+" sit? (1-"+selection.length+")";
					selection.forEach((index,j)=>{
						promptText += "\n"+(j+1)+": "+z.reentryCapsules[index];
						if(z.reentryAstronauts[index].length > 0){
							promptText += " (containing ";
							z.reentryAstronauts[index].forEach((astronaut,k)=>{
								if(k !== 0){
									promptText += ", ";
								}
								promptText += astronaut;
							});
							promptText += ")";
						}
					});
					promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
						z.reentryAstronauts[selection[a-1]].push(astronauts.shift());
						pickSeats(astronauts);
					});
				}
			}
		};
		
		let astronauts = [];
		for(let astronaut in z.spacecraft[me][z.maneuvering].astronauts){
			astronauts.push(astronaut);
		}
		pickSeats(astronauts);
	} else if(ch === "Perform next capsule's Re-entry"){
		faceReentry(0,meReal);
		mainMenu();
	} else if(ch === "Choose which capsule will face Re-entry next"){
		let promptText = "Which capsule will face Re-entry next? (1-"+z.reentryCapsules.length+")";
		z.reentryCapsules.forEach((capsule,j)=>{
			promptText += "\n"+(j+1)+": "+capsule;
			if(z.reentryAstronauts[j].length > 0){
				promptText += " (containing ";
				z.reentryAstronauts[j].forEach((astronaut,k)=>{
					if(k !== 0){
						promptText += ", ";
					}
					promptText += astronaut;
				});
				promptText += ")";
			}
		});
		promptNum(promptText,(a)=>1>a||a>z.reentryCapsules.length,mainMenu,(a)=>{
			faceReentry(a-1,meReal);
			mainMenu();
		});
	} else if(ch === "Prepare for Landing"){
		confirmify("Confirming you are done with Re-Entry and want to move on to a possible Landing.",mainMenu,()=>{
			popHazard(meReal);
			removeOption(me,ch);
			mainMenu();
		});
	} else if(ch === "Fire an Ion Thruster"){
		let ionThrust = 5 * z.maneuveringTime;
		if("Ion Thrusters" in z.advancements[meReal] && z.advancements[meReal]["Ion Thrusters"].autoSuccess()){
			let max = z.spacecraft[me][z.maneuvering]["Ion Thruster"];
			let thrustNeeded = z.maneuveringDifficulty * z.spacecraft[me][z.maneuvering].mass() - z.thrust;
			if(max * ionThrust > thrustNeeded){
				max = (thrustNeeded - thrustNeeded % ionThrust)/ionThrust;
				if(thrustNeeded % ionThrust !== 0){
					max++;
				}
			}
			
			let fireIonThrusters = (a)=>{
				if(a === 1){
					plainAlert("Ion Thruster fired successfully.");
				} else {
					plainAlert(a+ " Ion Thrusters fired successfully.");
				}
				z.thrust += ionThrust*a;
				z.spacecraft[me][z.maneuvering].useIonThruster(a);
				if(z.thrust >= z.maneuveringDifficulty * z.spacecraft[me][z.maneuvering].mass()){
					plainAlert("Thrust complete.");
					z.thrusting = false;
					z.spacecraft[me][z.maneuvering].location = z.maneuveringDestination;
					z.spacecraft[me][z.maneuvering].burntMass = 0;
					if(z.stations){
						z.spacecraft[me][z.maneuvering].burntShuttles = 0;
						z.spacecraft[me][z.maneuvering].burntDaedalus = 0;
					}
					popHazard(meReal);
				} else if(!canFireAnything()){
					plainAlert("No more thrust is available; maneuver aborted.");
					z.spacecraft[me][z.maneuvering].burntMass = 0;
					if(z.stations){
						z.spacecraft[me][z.maneuvering].burntShuttles = 0;
						z.spacecraft[me][z.maneuvering].burntDaedalus = 0;
					}
					abortManeuver();
				}
			};
			
			if(max === 1){
				fireIonThrusters(1);
				mainMenu();
			} else {
			
				promptNum("How many Ion Thrusters would you like to fire? (1-"+max+")",(a)=>0>a||a>max,mainMenu,(a)=>{
					if(a!==0){
						fireIonThrusters(a);
					}
					mainMenu();
				});
			}
		} else {	
			confirmify("Confirming you want to fire an Ion Thruster.",mainMenu,()=>{
				if(!("Ion Thrusters" in z.advancements[meReal])){
					plainAlert(z.countries[me] + " wants to fire an Ion Thruster, but does not have the advancement."+
							   "\nThey acquire the advancement for free with three outcomes.");
					z.advancements[meReal]["Ion Thrusters"] = new Advancement();
				}
				let outcome = z.advancements[meReal]["Ion Thrusters"].drawOutcome();
				z.lastAdvancement[meReal] = "Ion Thrusters";
				if(outcome === SUCCESS){
					plainAlert("Ion Thruster fired: Success!");
					z.thrust += ionThrust;
					z.spacecraft[me][z.maneuvering].useIonThruster();
					if(z.thrust >= z.maneuveringDifficulty * z.spacecraft[me][z.maneuvering].mass()){
						plainAlert("Thrust complete.");
						z.thrusting = false;
						z.spacecraft[me][z.maneuvering].location = z.maneuveringDestination;
						z.spacecraft[me][z.maneuvering].burntMass = 0;
						if(z.stations){
							z.spacecraft[me][z.maneuvering].burntShuttles = 0;
							z.spacecraft[me][z.maneuvering].burntDaedalus = 0;
						}
						popHazard(meReal);
					} else if(!canFireAnything()){
						plainAlert("No more thrust is available; maneuver aborted.");
						z.spacecraft[me][z.maneuvering].burntMass = 0;
						if(z.stations){
							z.spacecraft[me][z.maneuvering].burntShuttles = 0;
							z.spacecraft[me][z.maneuvering].burntDaedalus = 0;
						}
						abortManeuver();
					}
				} else {
					let alertText = "!  Ion Thruster damaged, provides no thrust.";
					if(outcome === MINOR_FAILURE){
						alertText = "Ion Thruster fired: Minor Failure"+alertText;
					} else {
						alertText = "Ion Thruster fired: Major Failure"+alertText;
					}
					plainAlert(alertText);
					z.spacecraft[me][z.maneuvering].damageComponent("Ion Thruster");
					if(!canFireAnything()){
						plainAlert("No more thrust is available; maneuver aborted.");
						z.spacecraft[me][z.maneuvering].burntMass = 0;
						if(z.stations){
							z.spacecraft[me][z.maneuvering].burntShuttles = 0;
							z.spacecraft[me][z.maneuvering].burntDaedalus = 0;
						}
						abortManeuver();
					}
				}
				mainMenu();
			});
		}
	} else if(/Fire an? (\w+) Rocket/.test(ch) || ch === "Fire a Shuttle engine"){
		let rocket = "";
		let advancement = "";
		if(ch === "Fire a Shuttle engine"){
			rocket = "Shuttle";
			advancement = "Space Shuttle";
		} else if(ch === "Fire a Daedalus Rocket"){
			rocket = "Daedalus";
			advancement = "Space Shuttle";
		} else	{
			rocket = /Fire an? (\w+) Rocket/.exec(ch)[1];
			advancement = rocket + " Rockets";
		}
		
		if(advancement in z.advancements[meReal] && z.advancements[meReal][advancement].autoSuccess()){
			let max = z.spacecraft[me][z.maneuvering][rocket];
			if(rocket === "Shuttle"){
				max = z.spacecraft[me][z.maneuvering].availableShuttles();
				if(max > z.spacecraft[me][z.maneuvering]["Large Fuel Tank"]){
					max = z.spacecraft[me][z.maneuvering]["Large Fuel Tank"];
				}
			} else if(rocket === "Daedalus"){
				max = z.spacecraft[me][z.maneuvering].availableDaedalus();
				if(max > z.spacecraft[me][z.maneuvering]["Small Fuel Tank"]){
					max = z.spacecraft[me][z.maneuvering]["Small Fuel Tank"];
				}
			}
			let thrustNeeded = z.maneuveringDifficulty * z.spacecraft[me][z.maneuvering].mass() - z.thrust;
			if(max * rocketThrusts[rocket] > thrustNeeded){
				max = (thrustNeeded - thrustNeeded % rocketThrusts[rocket])/rocketThrusts[rocket];
				if(thrustNeeded % rocketThrusts[rocket] !== 0){
					max++;
				}
			}
			let launch = (a)=>{
				if(rocket === "Shuttle"){
					if(a === 1){
						plainAlert("Shuttle engine fired successfully.");
					} else {
						plainAlert(a+ " Shuttle engines fired successfully.");
					}
				} else {
					if(a === 1){
						plainAlert(rocket+" Rocket fired successfully.");
					} else {
						plainAlert(a+ " "+rocket+" Rockets fired successfully.");
					}
				}
				z.thrust += rocketThrusts[rocket]*a;
				if(rocket === "Shuttle"){
					z.spacecraft[me][z.maneuvering].removeComponent("Large Fuel Tank",a);
					z.spacecraft[me][z.maneuvering].burntMass += componentMasses["Large Fuel Tank"]*a;
					z.spacecraft[me][z.maneuvering].burntShuttles += a;
				} else if(rocket === "Daedalus"){
					z.spacecraft[me][z.maneuvering].removeComponent("Small Fuel Tank",a);
					z.spacecraft[me][z.maneuvering].burntMass += componentMasses["Small Fuel Tank"]*a;
					z.spacecraft[me][z.maneuvering].burntDaedalus += a;
				} else {
					z.spacecraft[me][z.maneuvering].removeComponent(rocket,a);
					z.spacecraft[me][z.maneuvering].burntMass += componentMasses[rocket]*a;
				}
				if(z.thrust >= z.maneuveringDifficulty * z.spacecraft[me][z.maneuvering].mass()){
					plainAlert("Thrust complete.");
					z.thrusting = false;
					z.spacecraft[me][z.maneuvering].location = z.maneuveringDestination;
					z.spacecraft[me][z.maneuvering].burntMass = 0;
					if(z.stations){
						z.spacecraft[me][z.maneuvering].burntShuttles = 0;
						z.spacecraft[me][z.maneuvering].burntDaedalus = 0;
					}
					if(!z.spacecraft[me][z.maneuvering].nonEmpty()){
						plainAlert("The "+z.spacecraft[me][z.maneuvering].name+" has burned off all its components.");
						z.spacecraft[me].splice(z.maneuvering,1);
						abortManeuver();
					} else {
						popHazard(meReal);
					}
				} else if(!canFireAnything()){
					plainAlert("No more thrust is available; maneuver aborted.");
					z.spacecraft[me][z.maneuvering].burntMass = 0;
					if(z.stations){
						z.spacecraft[me][z.maneuvering].burntShuttles = 0;
						z.spacecraft[me][z.maneuvering].burntDaedalus = 0;
					}
					if(!z.spacecraft[me][z.maneuvering].nonEmpty()){
						plainAlert("The "+z.spacecraft[me][z.maneuvering].name+" has burned off all its components.");
						z.spacecraft[me].splice(z.maneuvering,1);
					}
					abortManeuver();
				}
			};
			
			if(max === 1){
				let confirmText = "Confirming you want to fire 1 "+rocket+" Rocket.";
				if(rocket === "Shuttle"){
					confirmText = "Confirmint you want to fire 1 Shuttle engine.";
				}
				confirmify(confirmText,mainMenu,()=>{
					launch(1);
					mainMenu();
				});
			} else {
				let promptText = "How many "+rocket+" Rockets would you like to fire? (1-"+max+")";
				if(rocket === "Shuttle"){
					promptText = "How many Shuttle engines would you like to fire? (1-"+max+")";
				}
				promptNum(promptText,(a)=>0>a||a>max,mainMenu,(a)=>{
					if(a!==0){
						launch(a);
					}
					mainMenu();
				});
			}
		} else {
			let confirmText = "Confirming you want to fire 1 "+rocket+" Rocket.";
			if(rocket === "Shuttle"){
				confirmText = "Confirming you want to fire 1 Shuttle engine.";
			}
			confirmify(confirmText,mainMenu,()=>{
				if(!(advancement in z.advancements[meReal])){
					plainAlert(z.countries[meReal] + " wants to fire 1 "+rocket+" Rocket, but does not have the advancement."+
							   "\nThey acquire the advancement for free with three outcomes.");
					z.advancements[meReal][advancement] = new Advancement();
				}
				let outcome = z.advancements[meReal][advancement].drawOutcome();
				z.lastAdvancement[meReal] = advancement;
				if(outcome === SUCCESS){
					if(rocket === "Shuttle"){
						plainAlert("Shuttle engine fired: Success!");
					} else {
						plainAlert(rocket + " Rocket fired: Success!");
					}
					z.thrust += rocketThrusts[rocket];
					if(rocket === "Shuttle"){
						z.spacecraft[me][z.maneuvering].removeComponent("Large Fuel Tank");
						z.spacecraft[me][z.maneuvering].burntMass += componentMasses["Large Fuel Tank"];
						z.spacecraft[me][z.maneuvering].burntShuttles += 1;
					} else if(rocket === "Daedalus"){
						z.spacecraft[me][z.maneuvering].removeComponent("Small Fuel Tank");
						z.spacecraft[me][z.maneuvering].burntMass += componentMasses["Small Fuel Tank"];
						z.spacecraft[me][z.maneuvering].burntDaedalus += 1;
					} else {
						z.spacecraft[me][z.maneuvering].removeComponent(rocket);
						z.spacecraft[me][z.maneuvering].burntMass += componentMasses[rocket];
					}
					if(z.thrust >= z.maneuveringDifficulty * z.spacecraft[me][z.maneuvering].mass()){
						plainAlert("Thrust complete.");
						z.thrusting = false;
						z.spacecraft[me][z.maneuvering].location = z.maneuveringDestination;
						z.spacecraft[me][z.maneuvering].burntMass = 0;
						if(z.stations){
							z.spacecraft[me][z.maneuvering].burntShuttles = 0;
							z.spacecraft[me][z.maneuvering].burntDaedalus = 0;
						}
						if(!z.spacecraft[me][z.maneuvering].nonEmpty()){
							plainAlert("The "+z.spacecraft[me][z.maneuvering].name+" has burned off all its components.");
							z.spacecraft[me].splice(z.maneuvering,1);
							abortManeuver();
						} else {
							popHazard(meReal);
						}
					} else if(!canFireAnything()){
						plainAlert("No more thrust is available; maneuver aborted.");
						z.spacecraft[me][z.maneuvering].burntMass = 0;
						if(z.stations){
							z.spacecraft[me][z.maneuvering].burntShuttles = 0;
							z.spacecraft[me][z.maneuvering].burntDaedalus = 0;
						}
						if(!z.spacecraft[me][z.maneuvering].nonEmpty()){
							plainAlert("The "+z.spacecraft[me][z.maneuvering].name+" has burned off all its components.");
							z.spacecraft[me].splice(z.maneuvering,1);
						}
						abortManeuver();
					}
				} else if(outcome === MINOR_FAILURE){
					if(rocket === "Shuttle"){
						plainAlert("Shuttle engine fired: Minor Failure!  Shuttle damaged, fuel kept, provides no thrust.");
					} else if(rocket === "Daedalus"){
						plainAlert("Daedalus Rocket fired: Minor Failure!  Rocket damaged, fuel kept, provides no thrust.");
					} else {
						plainAlert(rocket + " Rocket fired: Minor Failure!  Rocket damaged, provides no thrust.");
					}
					z.spacecraft[me][z.maneuvering].damageComponent(rocket);
					if(!canFireAnything()){
						plainAlert("No more thrust is available; maneuver aborted.");
						z.spacecraft[me][z.maneuvering].burntMass = 0;
						if(z.stations){
							z.spacecraft[me][z.maneuvering].burntShuttles = 0;
							z.spacecraft[me][z.maneuvering].burntDaedalus = 0;
						}
						abortManeuver();
					}
				} else if(outcome === MAJOR_FAILURE){
					plainAlert(rocket + " Rocket fired: Major Failure!  The "+z.spacecraft[me][z.maneuvering].name+" is destroyed!");
					z.spacecraft[me][z.maneuvering].killAll();
					z.spacecraft[me].splice(z.maneuvering,1);
					abortManeuver();
				}
				mainMenu();
			});
		}
	} else if(ch === "Perform a maneuver"){
		let selection = [];
		z.spacecraft[me].forEach((sp,k)=>{
			if(z.spacecraft[me][k].timeTokens > 0){
				return;
			}
			let loc = z.spacecraft[me][k].location;
			for(let conn in map[loc].connections){
				if(map[loc].connections[conn].slingshot){
					if(!slingshotAvailable(map[loc].connections[conn].slingshot)){
						continue;
					}
				}
				if(map[loc].connections[conn].difficulty === 0 || map[loc].connections[conn].aerobrakingDifficulty === 0){
					selection.push(k);
					return;
				}
				if(map[loc].connections[conn].slow && "Ion Thruster" in z.spacecraft[me][k]){
					selection.push(k);
					return;
				}
				let rockets = ["Juno","Atlas","Soyuz","Saturn","Proton"];
				for(let j = rockets.length - 1; j >= 0; j--){
					if(rockets[j] in z.spacecraft[me][k]){
						selection.push(k);
						return;
					}
				}
				if(z.spacecraft[me][k].availableDaedalus() > 0 && "Small Fuel Tank" in z.spacecraft[me][k]){
					selection.push(k);
					return;
				}
				if(z.spacecraft[me][k].availableShuttles() > 0 && "Large Fuel Tank" in z.spacecraft[me][k]){
					selection.push(k);
					return;
				}
			}
		});
		
		let confirmManeuver = (index,dest,aerobraking,time,difficulty) => {
			let confirmText = "Confirming you want to attempt to Maneuver the "+z.spacecraft[me][index].name+" from "+z.spacecraft[me][index].location+" to "+dest+".";
			confirmText += "\nThis maneuver has a difficulty of "+difficulty+".";
			if(time === 0){
				confirmText += "\nThe spacecraft will arrive this turn.";
			} else if (time === 1){
				confirmText += "\nThe spacecraft will arrive next year ("+(z.year+1)+").";
			} else {
				confirmText += "\nThe spacecraft will arrive in "+time+" years ("+(z.year+time)+").";
			}
			if(aerobraking){
				confirmText += "\nThis is using the Aerobraking version of the maneuver.";
			} else if("aerobrakingDifficulty" in map[z.spacecraft[me][index].location].connections[dest]){
				confirmText += "\nThis is NOT using the Aerobraking version of the maneuver.";
			}
			confirmify(confirmText,mainMenu,()=>{
				z.action = true;
				if(z.stations){
					z.spacecraft[me][index].didSomething = true;
				}
				
				z.maneuvering = index;
				z.maneuveringDestination = dest;
				z.maneuveringTime = time;
				z.maneuveringDifficulty = difficulty;
				z.thrusting = true;
				z.thrust = 0;
				z.maneuverHazards = [];
				if(map[z.spacecraft[me][index].location].connections[dest].jupiter){
					z.maneuverHazards.unshift("Jupiter");
				} else if(map[z.spacecraft[me][index].location].connections[dest].saturn){
					z.maneuverHazards.unshift("Saturn");
				} else if(map[z.spacecraft[me][index].location].connections[dest].uranus){
					z.maneuverHazards.unshift("Uranus");
				}
				if(map[z.spacecraft[me][index].location].connections[dest].solarRadiation){
					z.maneuverHazards.unshift("Solar Radiation");
				}
				if(time > 0){
					z.maneuverHazards.unshift("Time");
				}
				if(aerobraking){
					z.maneuverHazards.unshift("Aerobraking");
				}
				if(map[z.spacecraft[me][index].location].connections[dest].atmosphericEntry){
					z.maneuverHazards.unshift("Atmospheric Entry");
				}
				if(map[z.spacecraft[me][index].location].connections[dest].landing){
					z.maneuverHazards.unshift("Landing");
				}
				if(map[z.spacecraft[me][index].location].connections[dest].landingOptional){
					z.maneuverHazards.unshift("Landing (optional)");
				}
				if(map[z.spacecraft[me][index].location].connections[dest].hazard){
					if(map[z.spacecraft[me][index].location].connections[dest].hazard === "Suborbital Space"){
						if(z.spacecraft[me][index].isCrewed()){
							z.maneuverHazards.unshift("Suborbital Space");
						}
					} else {
						z.maneuverHazards.unshift(map[z.spacecraft[me][index].location].connections[dest].hazard);
					}
				}

				
				let alertText = bold("The "+z.spacecraft[me][index].name+" will attempt a "+difficulty+"-difficulty maneuver from "+z.spacecraft[me][index].location+" to "+dest+".");
				if(time === 1){
					alertText += "\nIf successful, the "+z.spacecraft[me][index].name+" will take one year to arrive.";
				} else if(time > 1){
					alertText += "\nIf successful, the "+z.spacecraft[me][index].name+" will take "+time+" years to arrive.";
				}
				if(aerobraking){
					alertText += "\nThis is using the Aerobraking version of the maneuver.";
				} else if("aerobrakingDifficulty" in map[z.spacecraft[me][index].location].connections[dest]){
					alertText += "\nThis is NOT using the Aerobraking version of the maneuver.";
				}
				if(difficulty === 0){
					alertText += "\nAs this is a 0-difficulty maneuver, the "+z.spacecraft[me][index].name+" automatically has enough thrust.";
					plainAlert(alertText);
					z.spacecraft[me][index].location = dest;
					z.thrusting = false;
					popHazard(meReal);
				} else {
					plainAlert(alertText);
				}
				
				mainMenu();
				
			});
		};
		
		let goSlow = (index,dest,aerobraking)=>{
			/* TODO: allow for going beyond the end of the game */
			let maxTime = 1976-z.year;
			if(z.outer || z.stations){
				maxTime+=10;
			}
			let loc = z.spacecraft[me][index].location;
			let time = map[loc].connections[dest].time;
			if(time === 0){
				let rockets = ["Juno","Atlas","Soyuz","Saturn","Proton"];
				let anyRocket = false;
				for(let j = rockets.length-1; j>=0; j--){
					if(rockets[j] in z.spacecraft[me][index]){
						anyRocket = true;
						break;
					}
				}
				if(z.spacecraft[me][index].availableDaedalus() > 0 && "Small Fuel Tank" in z.spacecraft[me][index]){
					anyRocket = true;
				}
				if(z.spacecraft[me][index].availableShuttles() > 0 && "Large Fuel Tank" in z.spacecraft[me][index]){
					anyRocket = true;
				}
				if(!anyRocket){
					time = 1;
				}
			}
			if(time >= maxTime){
				if(aerobraking){
					confirmManeuver(index,dest,aerobraking,map[loc].connections[dest].time,map[loc].connections[dest].aerobrakingDifficulty);
				} else {
					confirmManeuver(index,dest,aerobraking,map[loc].connections[dest].time,map[loc].connections[dest].difficulty);
				}	
			} else {
				promptNum("How many years would you like this maneuver to take? ("+time+"-"+maxTime+")",(a)=>time>a||a>maxTime,mainMenu,(a)=>{
					if(aerobraking){
						confirmManeuver(index,dest,aerobraking,a,map[loc].connections[dest].aerobrakingDifficulty);
					} else {
						confirmManeuver(index,dest,aerobraking,a,map[loc].connections[dest].difficulty);
					}
				});
			}
		};
		
		let pickTime = (index,dest,aerobraking)=>{
			/* slow aerobraking maneuvers take the same amount of time as regular maneuvers */
			let loc = z.spacecraft[me][index].location;
			if((aerobraking && !map[loc].connections[dest].aerobrakingSlow) || (!aerobraking && !map[loc].connections[dest].slow)){
				if(aerobraking){
					confirmManeuver(index,dest,aerobraking,0,map[loc].connections[dest].aerobrakingDifficulty);
				} else {
					confirmManeuver(index,dest,aerobraking,0,map[loc].connections[dest].difficulty);
				}				
			} else if(map[loc].connections[dest].slingshot || map[loc].connections[dest].automatic){
				/* RULES: time of cycler maneuvers */
				if(aerobraking){
					confirmManeuver(index,dest,aerobraking,map[loc].connections[dest].time,map[loc].connections[dest].aerobrakingDifficulty);
				} else {
					confirmManeuver(index,dest,aerobraking,map[loc].connections[dest].time,map[loc].connections[dest].difficulty);
				}	
			} else if(1 >= map[loc].connections[dest].time){
				goSlow(index,dest,aerobraking);
			} else {
				let time = map[loc].connections[dest].time;
				let difficulty = map[loc].connections[dest].difficulty;
				if(aerobraking){
					difficulty = map[loc].connections[dest].aerobrakingDifficulty;
				}
				let selection = [];
				while(true){
					selection.unshift([time,difficulty]);
					if(time === 1){
						break;
					}
					if(time % 2 === 1){
						time++;
					}
					time/=2;
					difficulty *= 2;
				}
				let promptText = "Would you like to speed up this maneuver at the cost of higher difficulty? (1-"+(selection.length+1)+")";
				selection.forEach((pair,j)=>{
					promptText += "\n"+(j+1)+": "+pair[0]+" years ("+pair[1]+" difficulty)";
				});
				promptText += "\n"+(selection.length+1)+": More than "+selection[selection.length-1][0]+" years ("+selection[selection.length-1][1]+" difficulty)";
				promptNum(promptText,(a)=>1>a||a>selection.length+1,mainMenu,(a)=>{
					if(a === selection.length+1){
						goSlow(index,dest,aerobraking);
					} else {
						confirmManeuver(index,dest,aerobraking,selection[a-1][0],selection[a-1][1]);
					}
				});
			}
		};
		
		let aerobrake = (index,dest)=>{
			if("aerobrakingDifficulty" in map[z.spacecraft[me][index].location].connections[dest]){
				if(map[z.spacecraft[me][index].location].connections[dest].aerobrakingDifficulty === 0 && !("Juno" in z.spacecraft[me][index]) && !("Atlas" in z.spacecraft[me][index]) && 
				   !("Soyuz" in z.spacecraft[me][index]) && !("Saturn" in z.spacecraft[me][index]) && !("Proton" in z.spacecraft[me][index])){
					pickTime(index,dest,true);
				} else {
					confirmify("Would you like to use the Aerobraking version of this maneuver?",()=>{
						pickTime(index,dest,false);
					},()=>{
						pickTime(index,dest,true);
					},"YES","NO");
				}
			} else {
				pickTime(index,dest,false);
			}
		};
		
		
		let pickDestination = (index)=>{
			let selection = [];
			Object.keys(map[z.spacecraft[me][index].location].connections).forEach((dest)=>{
				let conn = map[z.spacecraft[me][index].location].connections[dest];
				if(conn.slingshot){
					if(!slingshotAvailable(conn.slingshot)){
						return;
					}
				}
				if(conn.difficulty === 0 || conn.aerobrakingDifficulty === 0){
					selection.push(dest);
					return;
				}
				if(conn.slow && "Ion Thruster" in z.spacecraft[me][index]){
					selection.push(dest);
					return;
				}
				let rockets = ["Juno","Atlas","Soyuz","Saturn","Proton"];
				for(let j = rockets.length - 1; j >= 0; j--){
					if(rockets[j] in z.spacecraft[me][index]){
						selection.push(dest);
						return;
					}
				}
				if(z.spacecraft[me][index].availableDaedalus() > 0 && "Small Fuel Tank" in z.spacecraft[me][index]){
					selection.push(dest);
					return;
				}
				if(z.spacecraft[me][index].availableShuttles() > 0 && "Large Fuel Tank" in z.spacecraft[me][index]){
					selection.push(dest);
					return;
				}
			});
			
			if(selection.length === 1){
				aerobrake(index,selection[0]);
			} else {
				let promptText = "Which destination would you like to maneuver the "+z.spacecraft[me][index].name+" towards? (1-"+selection.length+")";
				selection.forEach((dest,j)=>{
					promptText += "\n"+(j+1)+": "+dest;
				});
				promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
					aerobrake(index,selection[a-1]);
				});
			}
		};
		
		if(selection.length === 1){
			pickDestination(selection[0]);
		} else {
			let promptText = "Which spacecraft would you like to have perform a maneuver? (1-"+selection.length+")";
			selection.forEach((index,j)=>{
				promptText += "\n"+(j+1)+": "+z.spacecraft[me][index].name + " ("+z.spacecraft[me][index].location+")";
			});
			promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
				pickDestination(selection[a-1]);
			});
		}
	} else if(ch === "Complete an Explorer mission"){
		let selection = [];
		/* TODO: better at weeding out these let k in ... when order matters */
		z.spacecraft[me].forEach((sp,k)=>{
			if(z.spacecraft[me][k].isExplorer()){
				if(missionAvailable("Enceladus Ice Explorer") && z.spacecraft[me][k].location === "Enceladus"){
					selection.push(k);
				} else if(missionAvailable("Europa Ice Explorer") && z.spacecraft[me][k].location === "Europa"){
					selection.push(k);
				} else if(missionAvailable("Titan Cloud Explorer") && z.spacecraft[me][k].location === "Titan"){
					selection.push(k);
				}
			}
		});
		
		let explore = (index)=>{
			switch(z.spacecraft[me][index].location){
				case "Europa":
					completeMission("Europa Ice Explorer");
					break;
				case "Enceladus":
					completeMission("Enceladus Ice Explorer");
					break;
				case "Titan":
					completeMission("Titan Cloud Explorer");
					break;
			}
			z.spacecraft[me].splice(index,1);
			z.action = true;
			mainMenu();
		};
		
		if(selection.length === 1){
			explore(selection[0]);
		} else {
			let promptText = "Which spacecraft would you like to use to complete an Explorer mission? (1-"+selection.length+")";
			selection.forEach((index,j)=>{
				promptText+="\n"+(j+1)+": "+z.spacecraft[me][index].name+" ("+z.spacecraft[me][index].location+")";
			});
			promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
				explore(selection[a-1]);
			});
		}		
	} else if(ch === "Heal incapacitated astronauts"){
		/* RULES: can you do this in suborbital space? */
		let selection = [];
		z.spacecraft[me].forEach((x,k)=>{
			if(z.spacecraft[me][k].canHeal()){
				selection.push(k);
			}
		});
		
		let heal = (index)=>{
			plainAlert(z.countries[me]+ " heals all Astronauts on the "+z.spacecraft[me][index].name+".");
			z.spacecraft[me][index].healCrew();
			if(!("Medical Module" in z.spacecraft[me][index])){
				z.spacecraft[me][index].removeComponent("Medical Supplies");
			}
			if(z.spacecraft[me][index].hasScientist() && (!z.stations || "Science Module" in z.spacecraft[me][index])){
				z.spacecraft[me][index].claimSampleReturn();
			}
			z.action = true;
			if(z.stations){
				z.spacecraft[me][index].didSomething = true;
			}
			mainMenu();
		};
		
		if(selection.length === 1){
			heal(selection[0]);
		} else {
			let promptText = "Which spacecraft's astronauts would you like to heal? (1-"+selection.length+")";
			selection.forEach((index,j)=>{
				promptText+="\n"+(j+1)+": "+z.spacecraft[me][index].name+" ("+z.spacecraft[me][index].location+")";
			});
			promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
				heal(selection[a-1]);
			});
		}
	} else if(ch === "Repair damaged components"){
		let selection = [];
		z.spacecraft[me].forEach((x,k)=>{
			if(z.spacecraft[me][k].canRepair() && z.spacecraft[me][k].location !== "Suborbital Space"){
				selection.push(k);
			}
		});
		
		let repair = (index)=>{
			let part = "Supplies";
			if(z.stations){
				part = "Spare Parts";
			}
			plainAlert(z.countries[me]+ " spends "+part+" from the "+z.spacecraft[me][index].name+" to repair it.");
			z.spacecraft[me][index].removeComponent(part);
			z.spacecraft[me][index].repairDamage();
			z.action = true;
			if(z.stations){
				z.spacecraft[me][index].didSomething = true;
			}
			if(z.spacecraft[me][index].isLander()){
				if(missionAvailable("Sounding Rocket") && z.spacecraft[me][index].location !== "Earth"){
					completeMission("Sounding Rocket");
				}
				if(missionAvailable("Lunar Fly-By") && z.spacecraft[me][index].timeTokens === 0 && (z.spacecraft[me][index].location === "Lunar Fly-By" || z.spacecraft[me][index].location === "Lunar Orbit")){
					completeMission("Lunar Fly-By");
				} else if(missionAvailable("Venus Fly-By") && z.spacecraft[me][index].timeTokens === 0 && (z.spacecraft[me][index].location === "Venus Fly-By" || z.spacecraft[me][index].location === "Venus Orbit")){
					completeMission("Venus Fly-By");
				} else if(missionAvailable("Mars Fly-By") && z.spacecraft[me][index].timeTokens === 0 && (z.spacecraft[me][index].location === "Mars Fly-By" || z.spacecraft[me][index].location === "Mars Orbit" || 
														      z.spacecraft[me][index].location === "Mars Cycler")){
					completeMission("Mars Fly-By");
				} else if(missionAvailable("Artificial Satellite") && z.spacecraft[me][index].timeTokens === 0 && z.spacecraft[me][index].location === "Earth Orbit"){
					completeMission("Artificial Satellite");
				} else if(missionAvailable("Lunar Lander") && z.spacecraft[me][index].location === "Moon"){
					completeMission("Lunar Lander");
				} else if(missionAvailable("Jupiter Orbiter") && z.spacecraft[me][index].timeTokens === 0 && z.spacecraft[me][index].location === "Jupiter Orbit"){
					completeMission("Jupiter Orbiter");
				} else if(missionAvailable("Saturn Orbiter") && z.spacecraft[me][index].timeTokens === 0 && z.spacecraft[me][index].location === "Saturn Orbit"){
					completeMission("Saturn Orbiter");
				} else if(missionAvailable(z.spacecraft[me][index].location + " Lander") && z.spacecraft[me][index].timeTokens === 0){
					completeMission(z.spacecraft[me][index].location + " Lander");
				}
			}
			if(z.spacecraft[me][index].isHabitat()){
				if(missionAvailable("Orbital Habitat") && z.spacecraft[me][index].location === "Earth Orbit" && z.spacecraft[me][index].timeTokens === 0){
					completeMission("Orbital Habitat");
				} else if(missionAvailable("Lunar Habitat") && z.spacecraft[me][index].location === "Moon"){
					completeMission("Lunar Habitat");
				} else if(missionAvailable("Mars Orbit Habitat") && z.spacecraft[me][index].location === "Mars Orbit" && z.spacecraft[me][index].timeTokens === 0) {
					completeMission("Mars Orbit Habitat");
				}
				z.spacecraft[me][index].claimManOn();
			}
			if(z.stations && z.spacecraft[me][index].hasScientist() && "Science Module" in z.spacecraft[me][index]){
				z.spacecraft[me][index].claimSampleReturn();
			}
			mainMenu();
		};
		
		if(selection.length === 1){
			repair(selection[0]);
		} else {
			let promptText = "Which spacecraft would you like to repair? (1-"+selection.length+")\nThis typically costs a supply.";
			selection.forEach((index,j)=>{
				promptText+="\n"+(j+1)+": "+z.spacecraft[me][index].name+" ("+z.spacecraft[me][index].location+")";
			});
			promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
				repair(selection[a-1]);
			});
		}
	} else if(ch === "Collect a sample from an extraterrestrial body"){
		let selection = {};
		let featureComponents = ["Palladium","Fossil?","Platinum","Iridium","Wreckage","Alien Object"];
		z.spacecraft[me].forEach((x,k)=>{
			if(z.spacecraft[me][k].canCollect()){
				let loc = z.spacecraft[me][k].location;
				switch(loc){
					case "Venus":
					case "Moon":
					case "Mars":
					case "Phobos":
						if(z.stations){
							featureComponents.forEach((component)=>{
								if(z.features[loc].includes(component)){
									selection[component] = true;
								}
							});
							if(z.features[loc].includes("Edible Plants")){
								selection["Food"] = true;
							}
						}
					case "Mercury":
					case "Ceres":
					case "Callisto":
					case "Ganymede":
					case "Io":
					case "Europa":
					case "Titan":
					case "Enceladus":
						selection[loc + " Sample"] = true;
						if(z.hazard[loc].includes("Supplies")){
							if(z.stations){
								selection["Food"] = true;
							} else {
								selection["Supplies"] = true;
							}
						}
						break;
					case "Saturn Orbit":
						selection["Saturn Sample"] = true;
						if(z.revealed["Enceladus"] && z.hazard["Enceladus"].startsWith("Geysers") && ("Galileo" in z.spacecraft[me][k] || "Galileo (used)" in z.spacecraft[me][k])){
							selection["Enceladus"] = true;
						}
						break;
				}
			}
		});
		selection = Object.keys(selection);
		
		let collectSample = (sample,index) => {
			plainAlert(z.spacecraft[me][index].name + " collects " + sample + ".");
			z.spacecraft[me][index].addComponent(sample);
			if(featureComponents.includes(sample)){
				let loc = z.spacecraft[me][index].location;
				for(let j = 0; !(j>=z.features[loc].length); j++){
					if(z.features[loc][j] === sample){
						z.features[loc].splice(j,1);
						break;
					}
				}
			}
			if(z.spacecraft[me][index].hasScientist() && (!z.stations || "Science Module" in z.spacecraft[me][index])){
				z.spacecraft[me][index].claimSampleReturn();
			}
			z.action = true;
			if(z.stations){
				z.spacecraft[me][index].didSomething = true;
			}
			mainMenu();
		};
		
		let chooseRecipient = (sample)=>{
			let selection = [];
			z.spacecraft[me].forEach((x,k)=>{
				if(z.spacecraft[me][k].canCollect()){
					let loc = z.spacecraft[me][k].location;
					if((sample === "Supplies" || sample === "Food") && loc in z.hazard && z.hazard[loc].includes("Supplies")){
						selection.push(k);
					} else if(loc + " Sample" === sample){
						selection.push(k);
					} else if(loc === "Saturn Orbit" && 
							  (sample === "Saturn Sample" || (sample === "Enceladus" && z.revealed["Enceladus"] && z.hazard["Enceladus"].startsWith("Geysers") && 
															  ("Galileo" in z.spacecraft[me][k] || "Galileo (used)" in z.spacecraft[me][k])))){
						selection.push(k);
					} else if(sample === "Food" && loc === "Venus" && z.features.Venus.includes("Edible Plants")){
						selection.push(k);
					} else if(featureComponents.includes(sample) && loc in z.features && z.features[loc].includes(sample)){
						selection.push(k);
					}
				}
			});
			if(selection.length === 1){
				collectSample(sample,selection[0]);
			} else {
				let promptText = "Which spacecraft do you want to collect the sample? (1-"+selection.length+")";
				selection.forEach((index,j)=>{
					promptText += "\n"+(j+1)+": "+z.spacecraft[me][index].name+" ("+z.spacecraft[me][index].location+")";
				});
				promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
					collectSample(sample,selection[a-1]);
				});
			}
		};
		
		if(selection.length === 1){
			chooseRecipient(selection[0]);
		} else {
			let promptText = "What type of sample do you want to pick up? (1-"+selection.length+")";
			selection.forEach((type,j)=>{
				promptText += "\n"+(j+1)+": "+type;
			});
			promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
				chooseRecipient(selection[a-1]);
			});
			
		}
	
	} else if(ch === "[Surveying] Do not reveal survey results"){
		confirmify("Confirming you do not want to reveal the results of your survey (that "+z.surveying+" is "+z.hazard[z.surveying]+
		           "); this information will remain available to you in your Private Information.",mainMenu,()=>{
					   delete z.surveying;
					   delete z.surveyingGalileo;
					   mainMenu();
				   });
	} else if(ch === "[Surveying] Reveal survey results"){
		confirmify("Confirming you want to reveal the results of your survey (that "+z.surveying+" is "+z.hazard[z.surveying]+
				   ") to all players.",mainMenu,()=>{
			revealHazard(z.surveying); 
			if(z.surveyingGalileo){
				switch(z.surveying){
					case "Io":
					case "Enceladus":
					case "Europa":
					case "Titan":
						if(missionAvailable("Advanced "+z.surveying+" Survey")){
							completeMission("Advanced "+z.surveying+" Survey");
						}
				}  
			}
			delete z.surveying;
			delete z.surveyingGalileo;
			mainMenu();
					  
		});
	} else if(ch === "Survey unexplored conditions"){
		let selection = {};
		let noAuto = !z.advancements[meReal].Surveying.autoSuccess();
		z.spacecraft[me].forEach((x,k)=>{
			if(z.spacecraft[me][k].timeTokens > 0 || z.spacecraft[me][k].workingProbesCapsules() === 0){
				return;
			}
			let loc = z.spacecraft[me][k].location;
			for(let dest in map[loc].connections){
				if(map[loc].connections[dest].solarRadiation){
					if(!z.revealed["Solar Radiation"] || noAuto){
						selection["Solar Radiation"] = 1;
					}
				}
				if(map[loc].connections[dest].jupiter){
					if(!z.revealed["Jupiter"] || noAuto){
						selection["Jupiter"] = 1;
					}
				}
				if(map[loc].connections[dest].saturn){
					if(!z.revealed["Saturn"] || noAuto){
						selection["Saturn"] = 1;
					}
				}
				if(map[loc].connections[dest].uranus){
					if(!z.revealed["Uranus"] || noAuto){
						selection["Uranus"] = 1;
					}
				}
				let hazard = map[loc].connections[dest].hazard;
				if(hazard !== "Suborbital Space" && hazard !== undefined){
					if(!z.revealed[hazard] || noAuto){
						selection[hazard] = 1;
					}
					if("Galileo" in z.spacecraft[me][k]){
						switch(hazard){
							case "Io":
							case "Enceladus":
							case "Europa":
							case "Titan":
								if(missionAvailable("Advanced "+hazard+" Survey")){
									selection[hazard] = 1;
								}
						}
					}
				}
			}
			if("telescope" in map[loc]){
				for(let hazard in map[loc].telescope){
					if(!z.revealed[hazard] || noAuto){
						selection[hazard] = 1;
					}
					if("Galileo" in z.spacecraft[me][k]){
						switch(hazard){
							case "Io":
							case "Enceladus":
							case "Europa":
							case "Titan":
								if(missionAvailable("Advanced "+hazard+" Survey")){
									selection[hazard] = 1;
								}
						}
					}
				}
			}
		});
		
		let surveySuccess = (hazard,probe) =>{
			if(!z.revealed[hazard]){
				z.surveying = hazard;
				z.surveyingGalileo = probe === "Galileo";
				addAlert(hazard + " is " + z.hazard[hazard] +".\nYou may reveal it or keep this information to yourself.");
				z.known[me][hazard] = true;
				t.value += z.countries[me] + " may choose to reveal the card or not.\r\n";
			} else if (probe === "Galileo"){
				switch(hazard){
					case "Io":
					case "Enceladus":
					case "Europa":
					case "Titan":
						if(missionAvailable("Advanced "+hazard+" Survey")){
							completeMission("Advanced "+hazard+" Survey");
						}
				}
			}
		};
		
		let conductSurvey = (hazard,index,probe) => {
			if(z.outer){
				if(!probe.startsWith("Rover")){
					z.spacecraft[me][index].removeComponent(probe);
					z.spacecraft[me][index].addComponent(probe + " (used)");
				} else if(probe === "Rover"){
					z.spacecraft[me][index].removeComponent("Rover");
					z.spacecraft[me][index].addComponent("Rover (surveyed)");
				} else if(probe === "Rover (explored)"){
					z.spacecraft[me][index].removeComponent("Rover (explored)");
					z.spacecraft[me][index].addComponent("Rover (surveyed) (explored)");
				}
			}
			if(z.advancements[meReal].Surveying.autoSuccess()){
				plainAlert(z.countries[me]+" surveys "+hazard+" with "+probe+" on the "+z.spacecraft[me][index].name+".");
				surveySuccess(hazard,probe);
			} else {
				plainAlert(z.countries[me]+" attempts to Survey "+hazard+" with "+probe+" on the "+z.spacecraft[me][index].name+".");
				let outcome = z.advancements[meReal].Surveying.drawOutcome();
				z.lastAdvancement[meReal] = "Surveying";
				if(outcome === SUCCESS){
					plainAlert("Success!");
					surveySuccess(hazard,probe);
				} else if(outcome === MINOR_FAILURE){
					plainAlert("Minor Failure.  Surveying unsuccessful.");
				} else{
					plainAlert("Major Failure.  Surveying unsuccessful.");
				}
			}
			z.action = true;
			if(z.stations){
				z.spacecraft[me][index].didSomething = true;
			}
			mainMenu();
		};
		
		let chooseSurveyor = (hazard) => {
			let selection = [];
			let probesCapsules = ["Probe","Galileo","Eagle","Vostok","Apollo","Aldrin","Rover","Rover (explored)","Ground Habitat","Space Habitat","Shuttle"];
			for(let k = z.spacecraft[me].length - 1; k >= 0; k--){
				if(z.spacecraft[me][k].timeTokens > 0 || z.spacecraft[me][k].workingProbesCapsules() === 0){
					continue;
				}
				let loc = z.spacecraft[me][k].location;
				let foundIt = false;
				for(let dest in map[loc].connections){
					if(hazard === "Solar Radiation" && map[loc].connections[dest].solarRadiation){
						foundIt = true;
					}
					if(hazard === "Jupiter" && map[loc].connections[dest].jupiter){
						foundIt = true;
					}
					if(hazard === "Saturn" && map[loc].connections[dest].saturn){
						foundIt = true;
					}
					if(hazard === "Uranus" && map[loc].connections[dest].uranus){
						foundIt = true;
					}
					if(hazard === map[loc].connections[dest].hazard){
						foundIt = true;
					}
					if(foundIt){
						if(!z.revealed[hazard] || noAuto){
							/* TODO: W083 */
							probesCapsules.forEach((probe)=>{
								if(probe in z.spacecraft[me][k]){
									selection.push([k,probe]);
								}
							});
						} else {
							if("Galileo" in z.spacecraft[me][k]){
								selection.push([k,"Galileo"]);
							}
						}
						break;
					}
				}
				if(!foundIt){
					if("telescope" in map[loc]){
						if(hazard in map[loc].telescope){
							if(!z.revealed[hazard] || noAuto){
								/* TODO: W083 */
								probesCapsules.forEach((probe)=>{
									if(probe in z.spacecraft[me][k]){
										selection.push([k,probe]);
									}
								});
							} else {
								if("Galileo" in z.spacecraft[me][k]){
									selection.push([k,"Galileo"]);
								}
							}
						}
					}
				}
			}
			
			if(selection.length === 1){
				conductSurvey(hazard,selection[0][0],selection[0][1]);
			} else {
				promptText = "Which probe or capsule would you like to conduct the Survey with? (1-"+selection.length+")";
				selection.forEach((pair,j)=>{
					promptText += "\n"+(j+1)+": "+pair[1]+" on the "+z.spacecraft[me][pair[0]].name;
				});
				promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
					conductSurvey(hazard,selection[a-1][0],selection[a-1][1]);
				});
			}
					
		};
		
		selection = Object.keys(selection);
		if(selection.length === 1){
			chooseSurveyor(selection[0]);
		} else {
			let promptText = "Which hazard would you like to survey? (1-"+selection.length+")";
			selection.forEach((hazard,j)=>{
				promptText+="\n"+(j+1)+": "+hazard;
			});
			promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
				chooseSurveyor(selection[a-1]);
			});
			
		}
		
		
	} else if(ch === "[Separation] Commit to separation"){
		confirmify("Confirming are done moving components and astronauts and want to separate the "+z.spacecraft[me][z.spacecraft[me].length-1].name+" from the " + 
				   z.spacecraft[me][z.separation].name+".",mainMenu,()=>{
			
			let separationFailure = () => {				
				let loser = z.spacecraft[me].length - 1;
				let winner = z.separation;
				for(let astronaut in z.spacecraft[me][loser].astronauts){
					z.spacecraft[me][winner].astronauts[astronaut] = z.spacecraft[me][loser].astronauts[astronaut];
				}
				for(let component in z.spacecraft[me][loser]){
					if(component in componentMasses){
						z.spacecraft[me][winner].addComponent(component,z.spacecraft[me][loser][component]);
					}
				}
				z.spacecraft[me].pop();
				delete z.separation;
				
				let numTypes = z.spacecraft[me][winner].undamagedTypes();
				if(numTypes === 0){
					plainAlert("There are no undamaged components left on the spacecraft; it is destroyed");
					z.spacecraft[me][winner].killAll();
					z.spacecraft[me].splice(winner,1);
				} else if(numTypes === 1){
					for(let astronaut in z.spacecraft[me][winner].astronauts){
						if(!z.spacecraft[me][winner].astronauts[astronaut].incapacitated){
							plainAlert(astronaut + " is incapacitated.");
							z.spacecraft[me][winner].astronauts[astronaut].incapacitated = true;
							break;
						}
					}
					for(let component in z.spacecraft[me][winner]){
						if(component in componentMasses && damageable(component)){
							plainAlert(component + " on the " + z.spacecraft[me][winner].name + " is damaged.");
							z.spacecraft[me][winner].damageComponent(component);
							break;
						}
					}
				} else {
					plainAlert(z.countries[me] + " must damage a component on the "+z.spacecraft[me][winner].name+".");
					addOption(me,"[Separation Failure] Damage a component",winner,true);
				}
			};
			
			if(z.advancements[meReal].Rendezvous.autoSuccess()){
				plainAlert("The "+z.spacecraft[me][z.spacecraft[me].length-1].name + " successfully separates from the "+z.spacecraft[me][z.separation].name+".");
				delete z.separation;
				mainMenu();
			} else {
				
				
				let nextTrial = ()=>{
					if(z.advancements[meReal].Rendezvous.outcomes.length === 0){
						plainAlert("Full Rendezvous Testing complete.  Separation successful.");
						z.advancements[meReal].Rendezvous.endFullTest(true);
						delete z.separation;
						mainMenu();
						return;
					}
					let outcome = z.advancements[meReal].Rendezvous.drawOutcome();
					z.lastAdvancement[meReal] = "Rendezvous";
					if(outcome === SUCCESS){
						z.advancements[meReal].Rendezvous.fullTest();
						plainAlert("Next outcome: Success!");
						if(z.money[meReal] >= 10){
							confirmify("Would you like to pay $10 million to remove the Success? (You have $"+z.money[me]+" million.)",nextTrial,()=>{
								z.advancements[meReal].Rendezvous.removeLastOutcome();
								z.money[meReal] -= 10;
								plainAlert(z.countries[meReal]+" pays $10 million to remove the Success.");
								nextTrial();
							});
						} else {
							nextTrial();
						}
					} else if(outcome === MINOR_FAILURE){
						plainAlert("Next outcome: Minor Failure!  Full Rendezvous testing aborted.");
						let pilot = undefined;
						for(let astronaut in z.spacecraft[me][z.separation].astronauts){
							if(z.spacecraft[me][z.separation].astronauts[astronaut].type === "Pilot" &&
							   !z.spacecraft[me][z.separation].astronauts[astronaut].incapacitated){
								pilot = astronaut;
								break;
							}
						}
						if(!pilot){
							for(let astronaut in z.spacecraft[me][z.spacecraft[me].length-1].astronauts){
								if(z.spacecraft[me][z.spacecraft[me].length-1].astronauts[astronaut].type === "Pilot" && 
								   !z.spacecraft[me][z.spacecraft[me].length-1].astronauts[astronaut].incapacitated){
									pilot = astronaut;
									break;
								}
							}
						}
						if(pilot){
							/* RULES: this */
							plainAlert("Damage is averted by the quick thinking of Pilot "+pilot+".  The two spacecraft separate, but the full testing of Rendezvous is still aborted.");
							delete z.separation;
						} else {
							separationFailure();
						}
						z.advancements[meReal].Rendezvous.endFullTest(false);
						mainMenu();
					} else {
						plainAlert("Next Outcome: Major Failure!  Full Rendezvous testing aborted.");
						separationFailure();
						z.advancements[meReal].Rendezvous.endFullTest(false);
						mainMenu();
					}
				};
					
				let normalSeparation = ()=>{
					let outcome = z.advancements[meReal].Rendezvous.drawOutcome();
					z.lastAdvancement[meReal] = "Rendezvous";
					if(outcome === SUCCESS){
						plainAlert("The "+z.spacecraft[me][z.spacecraft[me].length-1].name + " successfully separates from the "+
								   z.spacecraft[me][z.separation].name+".");
						delete z.separation;
					} else if (outcome === MINOR_FAILURE){
						let pilot = undefined;
						for(let astronaut in z.spacecraft[me][z.separation].astronauts){
							if(z.spacecraft[me][z.separation].astronauts[astronaut].type === "Pilot" &&
							   !z.spacecraft[me][z.separation].astronauts[astronaut].incapacitated){
								pilot = astronaut;
								break;
							}
						}
						if(!pilot){
							for(let astronaut in z.spacecraft[me][z.spacecraft[me].length-1].astronauts){
								if(z.spacecraft[me][z.spacecraft[me].length-1].astronauts[astronaut].type === "Pilot" && 
								   !z.spacecraft[me][z.spacecraft[me].length-1].astronauts[astronaut].incapacitated){
									pilot = astronaut;
									break;
								}
							}
						}
						if(pilot){
							plainAlert("The "+z.spacecraft[me][z.spacecraft[me].length-1].name + " separates from the "+z.spacecraft[me][z.separation].name +
									   ", despite a Minor Failure averted by the quick thinking of Pilot "+pilot+".");
							delete z.separation; 
						} else {
							plainAlert("Separation attempt: "+z.spacecraft[me][z.spacecraft[me].length-1].name+" from "+z.spacecraft[me][z.separation].name +".\n"+
									   "Minor Failure");
							separationFailure();							
						}
					} else {
						plainAlert("Separation attempt: "+z.spacecraft[me][z.spacecraft[me].length-1].name+" from "+z.spacecraft[me][z.separation].name +".\n"+
									   "Major Failure");
						separationFailure();
					}
					mainMenu();
				};
				
				if(z.advancements[meReal].Rendezvous.outcomes.length === 1){
					normalSeparation();
				} else {
					confirmify("Would you like to test Rendezvous fully?",normalSeparation,()=>{
						plainAlert(z.countries[me]+" attempts to fully test Rendezvous with this separation.");
						nextTrial();
					});
				}
			}
			
	    });
	} else if(ch === "[Separation] Cancel separation"){
		confirmify("Confirming you want to cancel the separation of "+z.spacecraft[me][z.spacecraft[me].length-1].name+" from the " + 
				   z.spacecraft[me][z.separation].name+".",
			mainMenu,()=>{
				let loser = z.spacecraft[me].length - 1;
				let winner = z.separation;
				for(let astronaut in z.spacecraft[me][loser].astronauts){
					z.spacecraft[me][winner].astronauts[astronaut] = z.spacecraft[me][loser].astronauts[astronaut];
				}
				for(let component in z.spacecraft[me][loser]){
					if(component in componentMasses){
						z.spacecraft[me][winner].addComponent(component,z.spacecraft[me][loser][component]);
					}
				}
				z.spacecraft[me].pop();
				delete z.separation;
				plainAlert("Separation cancelled.");
				mainMenu();
	    });
	} else if(ch === "Separate one spacecraft in two"){
		let selection = [];
		z.spacecraft[me].forEach((value,j)=>{
			if(z.spacecraft[me][j].numComponents() > 1 && z.spacecraft[me][j].location !== "Earth" && z.spacecraft[me][j].location !== "Suborbital Space"){
				selection.push(j);
			}
		});
		
		let startSeparation = (index) => {
			promptString("What would you like to name your new spacecraft?",mainMenu,(name)=>{
				for(let j = z.spacecraft.length - 1; j>=0; j--){
					for(let k = z.spacecraft[j].length - 1; k >=0; k--){
						if(z.spacecraft[j][k].name === name){
							addAlert("There is already a spacecraft by that name.");
							startSeparation(index);
							return;
						}
					}
					if(name === z.countries[j]){
						addAlert("You can't name a spacecraft the same as an agency.");
						startSeparation(index);
						return;
					}
				}
				z.spacecraft[me].push(new Spacecraft(name,z.spacecraft[me][index].location));			
				boldAlert(z.countries[me] + " initiates a separation of the "+z.spacecraft[me][index].name+", to create a new ship called the "+name+".");
				/* TODO: a two-component ship should automatically separate */
				z.separation = index;
				z.spacecraft[me][z.spacecraft[me].length-1].timeTokens = z.spacecraft[me][z.separation].timeTokens;
				z.action = true;
				if(z.stations){
					z.spacecraft[me][z.spacecraft[me].length-1].didSomething = true;
					z.spacecraft[me][z.separation].didSomething = true;
				}
				if(z.spacecraft[me][z.separation].infected){
					z.spacecraft[me][z.spacecraft[me].length-1].infected = true;
				}
				mainMenu();
			});
		};
		
		if(selection.length === 1){
			startSeparation(selection[0]);
		} else {
			let promptText = "Which spacecraft would you like to separate? (1-"+selection.length+")";
			selection.forEach((index,j)=>{
				promptText += "\n"+(j+1)+": "; 
				if(z.spacecraft[me][index].timeTokens > 1){
					promptText += colorText("gray",z.spacecraft[me][index].name+" ("+z.spacecraft[me][index].location+" + "+z.spacecraft[me][index].timeTokens+" Time Tokens)");
				} else if (z.spacecraft[me][index].timeTokens === 1){
					promptText += colorText("gray",z.spacecraft[me][index].name+" ("+z.spacecraft[me][index].location+" + 1 Time Token)");
				} else {
					promptText += z.spacecraft[me][index].name+" ("+z.spacecraft[me][index].location+")";
				}
			});
			promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
				startSeparation(selection[a-1]);
			});
		}
	} else if(ch === "[Docking Failure] Damage a component"){
		let context = getContext(me,ch);
		
		let damageComponent = (index,component) => {
			if(component in z.spacecraft[me][index].astronauts){
				plainAlert(component + " incapacitated.");
			} else {
				plainAlert(component + " on the "+z.spacecraft[me][index].name+" damaged.");
			}
			z.spacecraft[me][index].damageComponent(component);
			removeOption(me,ch);
			mainMenu();
		};
		
		let pickDamage = (index) => {
			let selection = [];
			for(let astronaut in z.spacecraft[me][index].astronauts){
				if(!z.spacecraft[me][index].astronauts[astronaut].incapacitated){
					selection.push(astronaut);
				}
			}
			for(let component in z.spacecraft[me][index]){
				if(component in componentMasses && damageable(component)){
					selection.push(component);
				}
			}
			if(selection.length === 1){
				damageComponent(index,selection[0]);
			} else {
				let promptText = "Which component would you like to damage? (1-"+selection.length+")";
				selection.forEach((component,j)=>{
					promptText += "\n"+(j+1)+": "+component;
					if(component in componentMasses){
						promptText += " ("+z.spacecraft[me][index][component]+" aboard)";
					}
				});
				promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
					damageComponent(index,selection[a-1]);
				});
			}
		};
		
		if(z.spacecraft[me][context[0]].undamagedTypes() === 0){
			pickDamage(context[1]);
		} else if (z.spacecraft[me][context[1]].undamagedTypes() === 0){
			pickDamage(context[0]);
		} else {
			let promptText = "Which spacecraft would you like to damage? (1-2)\n1: "+z.spacecraft[me][context[0]].name+"\n2: "+z.spacecraft[me][context[1]].name;
			promptNum(promptText,(a)=>1>a||a>2,mainMenu,(a)=>{
				if(a === 1){
					pickDamage(context[0]);
				} else {
					pickDamage(context[1]);
				}
			});
		}
	} else if(ch === "[Separation Failure] Damage a component" || ch === "[Aerobraking] Damage a component" || ch === "[Landing] Damage a component" || ch === "[Saturn] Damage a component" ||
			  ch === "[Badlands] Damage a component" || ch === "[Venus] Damage a component"){
		let index = getContext(me,ch);
		
		let damageComponent = (index,component) => {
			if(component in z.spacecraft[me][index].astronauts){
				plainAlert(component + " incapacitated.");
			} else {
				plainAlert(component + " on the "+z.spacecraft[me][index].name+" damaged.");
			}
			z.spacecraft[me][index].damageComponent(component);
			removeOption(me,ch);
			/* Rover won't ever get this option */
			if(ch === "[Aerobraking] Damage a component" || ch === "[Landing] Damage a component" || ch === "[Saturn] Damage a component" || ch === "[Badlands] Damage a component" || ch === "[Venus] Damage a component"){
				popHazard(meReal);
			}
			mainMenu();
		};
		
		let selection = [];
		for(let astronaut in z.spacecraft[me][index].astronauts){
			if(!z.spacecraft[me][index].astronauts[astronaut].incapacitated){
				selection.push(astronaut);
			}
		}
		for(let component in z.spacecraft[me][index]){
			if(component in componentMasses && damageable(component)){
				selection.push(component);
			}
		}

		let promptText = "Which component would you like to damage? (1-"+selection.length+")";
		if(ch === "[Aerobraking] Damage a component" && z.lastAdvancement[meReal] === "Aerobraking" && z.money[meReal] >= 5){
			promptText += "\nIf you are planning to pay to remove the Minor Failure, you should do that first.";
		}
		selection.forEach((component,j)=>{
			promptText += "\n"+(j+1)+": "+component;
			if(component in componentMasses){
				promptText += " ("+z.spacecraft[me][index][component]+" aboard)";
			}
		});
		promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
			damageComponent(index,selection[a-1]);
		});
	
	} else if(ch === "Dock one spacecraft to another"){
		let selection = [];
		for(let j = 0; !(j>=z.spacecraft[me].length); j++){
			if(z.spacecraft[me][j].location === "Earth" || z.spacecraft[me][j].location === "Suborbital Space" || z.spacecraft[me][j].timeTokens > 0){
				continue;
			}
			for(let k = 0; !(k>=z.spacecraft[me].length); k++){
				if(j === k){
					continue;
				}
				if(z.spacecraft[me][j].location === z.spacecraft[me][k].location && z.spacecraft[me][k].timeTokens === 0){
					selection.push([j,k]);
				}
			}
		}
		let promptText = "Which docking would you like to perform? (1-"+selection.length+")";
		selection.forEach((value,j)=>{
			promptText += "\n"+(j+1)+": Dock the "+z.spacecraft[me][value[0]].name+" to the "+z.spacecraft[me][value[1]].name+" ("+z.spacecraft[me][value[0]].location+").";
		});
		
		let dock = (loser,winner) => {
			for(let astronaut in z.spacecraft[me][loser].astronauts){
				z.spacecraft[me][winner].astronauts[astronaut] = z.spacecraft[me][loser].astronauts[astronaut];
			}
			for(let component in z.spacecraft[me][loser]){
				if(component in componentMasses){
					z.spacecraft[me][winner].addComponent(component,z.spacecraft[me][loser][component]);
				}
			}
			if(z.spacecraft[me][loser].infected){
				z.spacecraft[me][winner].infected = true;
			}
			if(z.spacecraft[me][winner].hasScientist() && (!z.stations || "Science Module" in z.spacecraft[me][winner])){
				z.spacecraft[me][winner].claimSampleReturn();
			}
			if(z.stations){
				z.spacecraft[me][winner].didSomething = true;
			}
			if(z.spacecraft[me][winner].isHabitat()){
				z.spacecraft[me][winner].claimManOn();
			}
			
			z.spacecraft[me].splice(loser,1);
			/* RULES: damaged space habitat is not Earth */
			
			
		};
		let dockingFailure = (loser,winner) => {
			if(z.stations){
				z.spacecraft[me][winner].didSomething = true;
				z.spacecraft[me][loser].didSomething = true;
			}
			if(z.spacecraft[me][loser].infected){
				z.spacecraft[me][winner].infected = true;
			} else if(z.spacecraft[me][winner].infected){
				z.spacecraft[me][loser].infected = true;
			}
			let numTypes = z.spacecraft[me][loser].undamagedTypes() + z.spacecraft[me][winner].undamagedTypes();
			if(numTypes === 0){
				plainAlert("There are no undamaged components left on either spacecraft; both are destroyed");
				z.spacecraft[me][loser].killAll();
				z.spacecraft[me][winner].killAll();
				if(loser > winner){
					z.spacecraft[me].splice(loser,1);
					z.spacecraft[me].splice(winner,1);
				} else {
					z.spacecraft[me].splice(winner,1);
					z.spacecraft[me].splice(loser,1);
				}
			} else if(numTypes === 1){
				for(let astronaut in z.spacecraft[me][loser].astronauts){
					if(!z.spacecraft[me][loser].astronauts[astronaut].incapacitated){
						plainAlert(astronaut + " is incapacitated.");
						z.spacecraft[me][loser].astronauts[astronaut].incapacitated = true;
					}
				}
				for(let astronaut in z.spacecraft[me][winner].astronauts){
					if(!z.spacecraft[me][winner].astronauts[astronaut].incapacitated){
						plainAlert(astronaut + " is incapacitated.");
						z.spacecraft[me][winner].astronauts[astronaut].incapacitated = true;
					}
				}
				for(let component in z.spacecraft[me][winner]){
					if(component in componentMasses && damageable(component)){
						plainAlert(component + " on the " + z.spacecraft[me][winner].name + " is damaged.");
						z.spacecraft[me][winner].damageComponent(component);
					}
				}
				for(let component in z.spacecraft[me][loser]){
					if(component in componentMasses && damageable(component)){
						plainAlert(component + " on the " + z.spacecraft[me][loser].name + " is damaged.");
						z.spacecraft[me][loser].damageComponent(component);
					}
				}
			} else {
				plainAlert(z.countries[me] + " must damage a component on either the "+z.spacecraft[me][winner].name+" or the "+z.spacecraft[me][loser].name+".");
				addOption(me,"[Docking Failure] Damage a component",[loser,winner],true);
			}
		};
		
		let choiceMade = (a,selection)=>{
						a--;
			if(z.advancements[meReal].Rendezvous.autoSuccess()){
				plainAlert("The "+z.spacecraft[me][selection[a][0]].name + " successfully docks to the "+z.spacecraft[me][selection[a][1]].name+".");
				dock(selection[a][0],selection[a][1]);
				z.action = true;
				mainMenu();
			} else {
				let normalRendezvous = ()=>{
					let outcome = z.advancements[meReal].Rendezvous.drawOutcome();
					z.lastAdvancement[meReal] = "Rendezvous";
					if(outcome === SUCCESS){
						plainAlert("Success! The "+z.spacecraft[me][selection[a][0]].name + " docks to the "+z.spacecraft[me][selection[a][1]].name+".");
						dock(selection[a][0],selection[a][1]);
					} else if (outcome === MINOR_FAILURE){
						let pilot = undefined;
						for(let astronaut in z.spacecraft[me][selection[a][0]].astronauts){
							if(z.spacecraft[me][selection[a][0]].astronauts[astronaut].type === "Pilot" && !z.spacecraft[me][selection[a][0]].astronauts[astronaut].incapacitated){
								pilot = astronaut;
								break;
							}
						}
						if(!pilot){
							for(let astronaut in z.spacecraft[me][selection[a][1]].astronauts){
								if(z.spacecraft[me][selection[a][1]].astronauts[astronaut].type === "Pilot" && !z.spacecraft[me][selection[a][0]].astronauts[astronaut].incapacitated){
									pilot = astronaut;
									break;
								}
							}
						}
						if(pilot){
							plainAlert("The "+z.spacecraft[me][selection[a][0]].name + " docks to the "+z.spacecraft[me][selection[a][1]].name +
									   ", despite a Minor Failure averted by the quick thinking of Pilot "+pilot+".");
							dock(selection[a][0],selection[a][1]);   
						} else {
							plainAlert("Docking attempt: "+z.spacecraft[me][selection[a][0]].name+" to "+z.spacecraft[me][selection[a][1]].name +".\n"+
									   "Minor Failure");
							dockingFailure(selection[a][0],selection[a][1]);
						}
					} else {
						plainAlert("Docking attempt: "+z.spacecraft[me][selection[a][0]].name+" to "+z.spacecraft[me][selection[a][1]].name +".\n"+
									   "Major Failure");
					    dockingFailure(selection[a][0],selection[a][1]);
					}
					z.action = true;
					mainMenu();
				};
				
				if(z.advancements[meReal].Rendezvous.outcomes.length === 1){
					normalRendezvous();
				} else {
					confirmify("Would you like to test Rendezvous fully?",normalRendezvous,()=>{
						plainAlert(z.countries[me]+" attempts to fully test Rendezvous by docking the "+z.spacecraft[me][selection[a][0]].name + " to the "+z.spacecraft[me][selection[a][1]].name+".");
						if(z.stations){
							z.spacecraft[me][selection[a][0]].didSomething = true;
							z.spacecraft[me][selection[a][1]].didSomething = true;
						}
						let nextTrial = ()=>{
							if(z.advancements[meReal].Rendezvous.outcomes.length === 0){
								plainAlert("Full Rendezvous Testing complete.  Docking successful.");
								dock(selection[a][0],selection[a][1]);
								z.advancements[meReal].Rendezvous.endFullTest(true);
								z.action = true;
								mainMenu();
								return;
							}
							let outcome = z.advancements[meReal].Rendezvous.drawOutcome();
							z.lastAdvancement[meReal] = "Rendezvous";
							if(outcome === SUCCESS){
								z.advancements[meReal].Rendezvous.fullTest();
								plainAlert("Next Outcome: Success!");
								if(z.money[meReal] >= 10){
									confirmify("Would you like to pay $10 million to remove the Success? (You have $"+z.money[meReal]+" million.)",nextTrial,()=>{
										z.advancements[meReal].Rendezvous.removeLastOutcome();
										z.money[meReal] -= 10;
										plainAlert(z.countries[meReal]+" pays $10 million to remove the Success.");
										nextTrial();
									});
								} else {
									nextTrial();
								}
							} else if(outcome === MINOR_FAILURE){
								plainAlert("Next Outcome: Minor Failure!  Full Rendezvous testing aborted.");
								let pilot = undefined;
								for(let astronaut in z.spacecraft[me][selection[a][0]].astronauts){
									if(z.spacecraft[me][selection[a][0]].astronauts[astronaut].type === "Pilot" && !z.spacecraft[me][selection[a][0]].astronauts[astronaut].incapacitated){
										pilot = astronaut;
										break;
									}
								}
								if(!pilot){
									for(let astronaut in z.spacecraft[me][selection[a][1]].astronauts){
										if(z.spacecraft[me][selection[a][1]].astronauts[astronaut].type === "Pilot" && !z.spacecraft[me][selection[a][0]].astronauts[astronaut].incapacitated){
											pilot = astronaut;
											break;
										}
									}
								}
								if(pilot){
									/* RULES: this */
									plainAlert("Damage is averted by the quick thinking of Pilot "+pilot+".  The two spacecraft dock, but the full testing of Rendezvous is still aborted.");
									dock(selection[a][0],selection[a][1]);
								} else {
									dockingFailure(selection[a][0],selection[a][1]);
								}
								z.advancements[meReal].Rendezvous.endFullTest(false);
								z.action = true;
								mainMenu();
							} else {
								plainAlert("Next Outcome: Major Failure!");
								dockingFailure(selection[a][0],selection[a][1]);
								z.advancements[meReal].Rendezvous.endFullTest(false);
								z.action = true;
								mainMenu();
							}
						};
						
						nextTrial();
					});
				}
			}
		};
		
		if(selection.length > 12){
			selection = [];
			for(let j = 0; !(j>=z.spacecraft[me].length); j++){
				if(z.spacecraft[me][j].location === "Earth" || z.spacecraft[me][j].location === "Suborbital Space" || z.spacecraft[me][j].timeTokens > 0){
					continue;
				}
				for(let k = 0; !(k>=z.spacecraft[me].length); k++){
					if(j === k){
						continue;
					}
					if(z.spacecraft[me][j].location === z.spacecraft[me][k].location && z.spacecraft[me][k].timeTokens === 0){
						selection.push(j);
						break;
					}
				}
			}
			let promptText = "Which spacecraft would you like to dock (this spacecraft will be subsumed)? (1-"+selection.length+")";
			selection.forEach((index,j)=>{
				promptText += "\n" + (j+1)+": "+z.spacecraft[me][index].name+" ("+z.spacecraft[me][index].location+")";
			});
			promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
				let loser = selection[a-1];
				selection = [];
				for(let k = 0; !(k>=z.spacecraft[me].length); k++){
					if(k === loser || z.spacecraft[me][k].timeTokens > 0 || z.spacecraft[me][loser].location !== z.spacecraft[me][k].location){
						continue;
					}
					selection.push(k);
				}
				if(selection.length === 1){
					choiceMade(1,[ [loser,selection[0]]]);
				} else {
					let promptText = "Which spacecraft would you like to dock the "+z.spacecraft[me][loser].name+" to? (1-"+selection.length+")";
					selection.forEach((index,j)=>{
						promptText += "\n" + (j+1)+": "+z.spacecraft[me][index].name;
					});
					promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
						choiceMade(1,[ [loser,selection[a-1]]]);
					});
				}				
			});
		} else {
			promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
				choiceMade(a,selection);
			});
		}
	} else if(ch === "Disassemble a spacecraft on Earth"){
		let selection = [];
		z.spacecraft[me].forEach((value,j)=>{
			if(z.spacecraft[me][j].location === "Earth"){
				selection.push(j);
			}
		});
		
		let disassemble = (index) => {
			let selection = [];
			for(let astronaut in z.spacecraft[me][index].astronauts){
				selection.push(astronaut);
			}
			for(let component in z.spacecraft[me][index]){
				if(component in componentMasses){
					if(component in capsuleSeats){
						if(z.spacecraft[me][index].emptySeats() >= capsuleSeats[component]){
							selection.push(component);
						}
					} else {
						selection.push(component);
					}
				}
			}
			if(selection.length === 1 && selection[0] in componentMasses && z.spacecraft[me][index][selection[0]] === 1){
				z.hq[me].addComponent(selection[0]);
				plainAlert(z.countries[me]+" disassembles the "+z.spacecraft[me][index].name+".");
				z.spacecraft[me].splice(index,1);
				z.action = true;
				mainMenu();
			} else {
				let promptText = "Which component would you like to remove from the "+z.spacecraft[me][index].name+"? (1-"+(selection.length+1)+")";
				selection.forEach((component,j)=>{
					promptText += "\n"+(j+1)+": "+component;
					if(component in componentMasses){
						promptText += " ("+z.spacecraft[me][index][component]+" on board)";
					}
				});
				promptText += "\n"+(selection.length+1)+": (Fully disassemble spacecraft)";
				promptNum(promptText,(a)=>1>a||a>selection.length+1,mainMenu,(a)=>{
					if(a === selection.length + 1){
						for(let astronaut in z.spacecraft[me][index].astronauts){
							z.hq[me].astronauts[astronaut] = z.spacecraft[me][index].astronauts[astronaut];
						}
						for(let component in z.spacecraft[me][index]){
							if(component in componentMasses){
								z.hq[me].addComponent(component,z.spacecraft[me][index][component]);
							}
						}
						plainAlert(z.countries[me]+" disassembles the "+z.spacecraft[me][index].name+".");
						z.spacecraft[me].splice(index,1);
						z.action = true;
						mainMenu();
					} else {
						a--;
						if(!(selection[a] in componentMasses)){
							z.hq[me].astronauts[selection[a]] = z.spacecraft[me][index].astronauts[selection[a]];
							delete z.spacecraft[me][index].astronauts[selection[a]];
							plainAlert(selection[a] + " disembarks from the "+z.spacecraft[me][index].name+".");
							if(z.stations){
								z.spacecraft[me][index].didSomething = true;
							}
							z.action = true;
							mainMenu();
						} else {
							let max = z.spacecraft[me][index][selection[a]];
							if(selection[a] in capsuleSeats){
								let altMax = (z.spacecraft[me][index].emptySeats() - (z.spacecraft[me][index].emptySeats() % capsuleSeats[selection[a]])) / 
											 capsuleSeats[selection[a]];
								if(max > altMax){
									max = altMax;
								}
							}
							if(max === 1){
								z.spacecraft[me][index].removeComponent(selection[a]);
								z.hq[me].addComponent(selection[a]);
								plainAlert(z.countries[me]+" removes a "+selection[a]+" from the "+z.spacecraft[me][index].name+".");
								z.action = true;
								if(z.stations){
									z.spacecraft[me][index].didSomething = true;
								}
								mainMenu();
							} else {
								let promptText = "How many "+selection[a]+" would you like to remove from the "+z.spacecraft[me][index].name+"? (1-"+max+")";
								promptNum(promptText,(a)=>1>a||a>max,mainMenu,(num)=>{
									z.spacecraft[me][index].removeComponent(selection[a],num);
									z.hq[me].addComponent(selection[a],num);
									plainAlert(z.countries[me]+" removes "+num+" "+selection[a]+" from the "+z.spacecraft[me][index].name+".");
									z.action = true;
									if(z.stations){
										z.spacecraft[me][index].didSomething = true;
									}
									if(!z.spacecraft[me][index].nonEmpty()){
										plainAlert(z.countries[me]+" disassembles the "+z.spacecraft[me][index].name);
										z.spacecraft[me].splice(index,1);
									}
									mainMenu();
								});
							}
						}
					}
				});
			}
		};
		
		
		if(selection.length === 1){
			disassemble(selection[0]);
		} else {
			let promptText = "Which spacecraft would you like to disassemble? (1-"+selection.length+")";
			selection.forEach((value,j) => {
				promptText += "\n"+(j+1)+": "+z.spacecraft[me][value].name;
			});
			promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
				disassemble(selection[a-1]);
			});
		}
	} else if(ch === "Research an advancement"){
		let advancements = [];
		advancementNames.forEach((value) => {
			if(!(value in z.advancements[me])){
				advancements.push(value);
			}
		});
		if(z.outer && "Re-entry" in z.advancements[me] && !("Aerobraking" in z.advancements[me])){
			advancements.push("Aerobraking");
		}
		if(z.outer && "Soyuz Rockets" in z.advancements[me] && !("Proton Rockets" in z.advancements[me])){
			advancements.push("Proton Rockets");
		}
		if(z.stations && "Surveying" in z.advancements[me] && !("Rover" in z.advancements[me])){
			if(10 > z.money[me]){
				advancements = [];
			}
			advancements.push("Rover");
		}
		if(z.stations && z.money[me] >= 10 && "Re-entry" in z.advancements[me] && "Atlas Rockets" in z.advancements[me] && !("Space Shuttle" in z.advancements[me])){
			advancements.push("Space Shuttle");
		}
		if(z.stations && z.money[me] >= 10 && "Life Support" in z.advancements[me] && !("Synthesis" in z.advancements[me])){
			advancements.push("Synthesis");
		}
		
		let researchAdvancement = (name) => {
			if(name === "Surveying"){
				z.advancements[me][name] = new Advancement(1);
			} else if (name === "Synthesis"){
				z.advancements[me][name] = new Advancement(5);
			} else if (name === "Rover"){
				z.advancements[me][name] = new Advancement(5,true);
			} else {
				z.advancements[me][name] = new Advancement();
			}
			if(name === "Rover"){
				boldAlert(z.countries[me] + " spends $3 million to research "+name+".");
				z.money[me] -= 3;
			} else {
				boldAlert(z.countries[me] + " spends $10 million to research "+name+".");
				z.money[me] -= 10;
			}
			z.action = true;
			mainMenu();
		};
		
		if(advancements.length === 1){
			let confirmText = "Confirming you want to research "+advancements[0]+" for $";
			if(advancements[0] === "Rover"){
				confirmText += "3";
			} else {
				confirmText += "10";
			}
			confirmText += " million.";
			confirmify(confirmText,mainMenu,()=>{
				researchAdvancement(advancements[0]);
			});
		} else {
			let promptText = "Which advancement would you like to research? (1-"+advancements.length+")";
			advancements.forEach((advancement,j)=>{
				promptText += "\n"+(j+1)+": "+advancement;
			});
			promptNum(promptText,(a)=>1>a||a>advancements.length,mainMenu,(num)=>{
				researchAdvancement(advancements[num-1]);
			});
		}
		
	} else if (ch === "Buy a component"){
		let selection = [];
		for(let component in componentCosts){
			if(canBuy(component)){
				selection.push(component);
			}
		}
		
		let purchase = (component,num) =>{
			boldAlert(z.countries[me] + " purchases "+num+" "+component+" for $"+(num*componentCosts[component])+" million.");
			z.money[me] -= num*componentCosts[component];
			z.hq[me].addComponent(component,num);
			z.action = true;
			mainMenu();
		};
		
		let buyAstronaut = (component,name) => {
			boldAlert(z.countries[me] + " hires the "+component+" "+name+" for $"+componentCosts[component]+" million.");
			z.money[me] -= componentCosts[component];
			z.hq[me].astronauts[name] = new Astronaut(component);
			z.action = true;
			mainMenu();
		};
		
		let nameAstronaut = (component) =>{
			promptString("What is the name of the "+component+" you are hiring?",mainMenu,(name)=>{
				/* TODO: other reasonableness checks on the name */
				if(name in componentMasses || name in z.hq[me]){
					addAlert("You can't name an astronaut that.");
					nameAstronaut(component);
				} else if(name in astronautRoster){
					addAlert("There's already an astronaut by that name.");
					nameAstronaut(component);
				} else {
					for(let j = z.hq.length - 1; j >= 0; j--){
						if(name in z.hq[j].astronauts){
							addAlert("There's already an astronaut by that name.");
							nameAstronaut(component);
							return;
						}
						for(let k = z.spacecraft[j].length - 1; k>=0; k--){
							if(name in z.spacecraft[j][k].astronauts){
								addAlert("There's already an astronaut by that name.");
								nameAstronaut(component);
								return;
							}
						}
						for(let k = z.memorialWall[j].length - 1; k>=0; k--){
							if(name === z.memorialWall[j][k]){
								addAlert("There's already an astronaut by that name.");
								nameAstronaut(component);
								return;
							}
						}
						if(z.stations && z.bankMemorial.includes(name)){
							addAlert("There's already an astronaut by that name.");
							nameAstronaut(component);
							return;
						}
					}
					buyAstronaut(component,name);					
				}
			});
		};
		
		let pickAstronaut = (component) => {
			let selection = [];
			Object.keys(astronautRoster).forEach((astronaut) => {
				if(component !== astronautRoster[astronaut]){
					return;
				}
				for(let j = z.hq.length-1; j >=0; j--){
					if(astronaut in z.hq[j].astronauts){
						return;
					}
					for(let k = z.spacecraft[j].length-1; k>=0; k--){
						if(astronaut in z.spacecraft[j][k].astronauts){
							return;
						}
					}
					for(let k = z.memorialWall[j].length-1; k>=0; k--){
						if(astronaut === z.memorialWall[j][k]){
							return;
						}
					}
				}
				selection.push(astronaut);
			});
			if(selection.length === 0){
				nameAstronaut(component);
			} else if(selection.length === 1){
				buyAstronaut(component,selection[0]);
			} else {
				let promptText = "Which "+component+" would you like to hire? (1-"+selection.length+")";
				selection.forEach((name,j)=>{
					promptText += "\n"+(j+1)+": "+name;
				});
				promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
					buyAstronaut(component,selection[a-1]);
				});
			}
		};
		
		let howMany = (component) => {
			switch(component){
				case "Scientist":
				case "Pilot":
				case "Doctor":
				case "Mechanic":
					pickAstronaut(component);
					return;
			}
			let max = (z.money[me] - (z.money[me] % componentCosts[component]))/componentCosts[component];
			if(max === 1){
				purchase(component,1);
			} else {
				promptNum("How many "+component+" would you like to purchase? (1-"+max+")",(a)=>0>a||a>max,mainMenu,(num)=>{
					if(num === 0){
						mainMenu();
					} else {
						purchase(component,num);
					}
				});
			}
		};
		
		if(selection.length === 1){
			howMany(selection[0]);
		} else {
			let promptText = "Which component would you like to buy? (1-"+selection.length+")\nYou have $"+z.money[me]+" million.";
			selection.forEach((value,j)=>{
				promptText += "\n"+(j+1)+": "+value + " ($"+componentCosts[value]+" million)";
			});
			promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
				howMany(selection[a-1]);
			});
		}
	} else if(ch === "Assemble a spacecraft on Earth"){
		let selection = [];
		for(let component in z.hq[me]){
			if(!(component in componentMasses)){
				continue;
			}
			selection.push(component);
		}
		let anySeats = false;
		for(let k = z.spacecraft[me].length - 1; k>=0; k--){
			if(z.spacecraft[me][k].location === "Earth" && z.spacecraft[me][k].emptySeats() > 0){
				anySeats = true;
				break;
			}
		}
		if(anySeats){
			for(let astronaut in z.hq[me].astronauts){
				selection.push(astronaut);
			}
		}
		
		let nameSpacecraft = (component,num) => {
			/* TODO: other reasonableness checks */
			promptString("What would you like to name your new spacecraft?",mainMenu,(name)=>{
				for(let j = z.spacecraft.length - 1; j>=0; j--){
					for(let k = z.spacecraft[j].length - 1; k>=0; k--){
						if(z.spacecraft[j][k].name === name){
							addAlert("There is already a spacecraft by that name.");
							nameSpacecraft(component,num);
							return;
						}
					}
				}
				z.spacecraft[me].push(new Spacecraft(name));
				boldAlert(z.countries[me] + " christens their new spaceship, the "+name+".");
				z.hq[me].removeComponent(component,num);
				z.spacecraft[me][z.spacecraft[me].length-1].addComponent(component,num);
				if(z.stations){
					z.spacecraft[me][z.spacecraft[me].length-1].didSomething = true;
				}
				plainAlert(num+" "+component+" added to the "+z.spacecraft[me][z.spacecraft[me].length-1].name+".");
				z.action = true;
				mainMenu();
			});
		};
		
		let whereTo = (component,num)=>{
			let astronaut = !(component in z.hq[me]);
			let selection = [];
			z.spacecraft[me].forEach((value,j)=>{
				if(z.spacecraft[me][j].location === "Earth"){
					if(!astronaut || z.spacecraft[me][j].emptySeats() > 0){
						selection.push(j);
					}
				}
			});
			if(astronaut && selection.length === 1){
				z.spacecraft[me][selection[0]].astronauts[component] = z.hq[me].astronauts[component];
				delete z.hq[me].astronauts[component];
				plainAlert(component+" boards the "+z.spacecraft[me][selection[0]].name+".");
				z.action = true;
				if(z.stations){
					z.spacecraft[me][selection[0]].didSomething = true;
				}
				mainMenu();
			} else if (selection.length === 0){
				nameSpacecraft(component,num);
			} else {
				let max = selection.length;
				if(!astronaut){
					max++;
				}
				let promptText = "Which spacecraft would you like to add "+component+" to? (1-"+max+")";
				selection.forEach((value,j)=>{
					promptText += "\n"+(j+1)+": "+z.spacecraft[me][value].name;
				});
				if(!astronaut){
					promptText += "\n"+max+": (Create new spacecraft)";
				}
				promptNum(promptText,(a)=>1>a||a>max,mainMenu,(a)=>{
					a--;
					if(!astronaut && a === max-1){
						nameSpacecraft(component,num);
					} else if(astronaut) {
						z.spacecraft[me][selection[a]].astronauts[component] = z.hq[me].astronauts[component];
						delete z.hq[me].astronauts[component];
						plainAlert(component+" boards the "+z.spacecraft[me][selection[a]].name+".");
						if(z.stations){
							z.spacecraft[me][selection[a]].didSomething = true;
						}
						z.action = true;
						mainMenu();
					} else {
						z.hq[me].removeComponent(component,num);
						z.spacecraft[me][selection[a]].addComponent(component,num);
						plainAlert(num+" "+component+" added to the "+z.spacecraft[me][selection[a]].name+".");
						if(z.stations){
							z.spacecraft[me][selection[a]].didSomething = true;
						}
						z.action = true;
						mainMenu();
					}
				});
			}
		};
		
		let howMany = (component) => {
			if(component in componentMasses){
				if(z.hq[me][component] === 1){
					whereTo(component,1);
				} else {
					let promptText = "How many "+component+" would you like to add? (1-"+z.hq[me][component]+")";
					promptNum(promptText,(a)=>0>a||a>z.hq[me][component],mainMenu,(a)=>{
						if(a===0){
							mainMenu();
						} else {
							whereTo(component,a);
						}
					});
				}
			} else {
				whereTo(component,1);
			}
		};
		
		if(selection.length === 1){
			howMany(selection[0]);
		} else {
			let promptText = "Which component would you like to add to a spacecraft? (1-"+selection.length+")";
			selection.forEach((value,j)=>{
				promptText += "\n"+(j+1)+": "+value;
				if(value in componentMasses){
					promptText += " ("+z.hq[me][value]+" available)";
				}
			});
			promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
				howMany(selection[a-1]);
			});
		}
	} else if(ch === "[Separation] Move a component to the new ship"){
		let selection = [];
		for(let component in z.spacecraft[me][z.separation]){
			if(!(component in componentMasses)){
				continue;
			}
			selection.push(component);
		}
		for(let astronaut in z.spacecraft[me][z.separation].astronauts){
			selection.push(astronaut);
		}
		
		
		let moveComponent = (component,num)=>{
			if(!(component in componentMasses)){
				z.spacecraft[me][z.spacecraft[me].length-1].astronauts[component] = z.spacecraft[me][z.separation].astronauts[component];
				delete z.spacecraft[me][z.separation].astronauts[component];
				plainAlert(component+" moves to "+z.spacecraft[me][z.spacecraft[me].length-1].name+".");
				mainMenu();
			} else {
				z.spacecraft[me][z.separation].removeComponent(component,num);
				z.spacecraft[me][z.spacecraft[me].length-1].addComponent(component,num);
				plainAlert(num+" "+component+" moved to the "+z.spacecraft[me][z.spacecraft[me].length-1].name+".");
				mainMenu();
			}
		};
		
		let howMany = (component) => {
			if(component in componentMasses){
				if(z.spacecraft[me][z.separation][component] === 1){
					moveComponent(component,1);
				} else {
					let promptText = "How many "+component+" would you like to add? (1-"+z.spacecraft[me][z.separation][component]+")";
					promptNum(promptText,(a)=>0>a||a>z.spacecraft[me][z.separation][component],mainMenu,(a)=>{
						if(a===0){
							mainMenu();
						} else {
							moveComponent(component,a);
						}
					});
				}
			} else {
				moveComponent(component,1);
			}
		};
		
		
		if(selection.length === 1){
			howMany(selection[0]);
		} else {
			let promptText = "Which component would you like to add to the "+z.spacecraft[me][z.spacecraft[me].length-1].name+"? (1-"+selection.length+")";
			selection.forEach((component,j)=>{
				promptText += "\n"+(j+1)+": "+component;
				if(component in componentMasses){
					promptText += " ("+z.spacecraft[me][z.separation][component]+" available)";
				}
			});
			promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
				howMany(selection[a-1]);
			});
		}
	
	} else if(ch === "[Separation] Move a component back to the old ship"){
		let selection = [];
		for(let component in z.spacecraft[me][z.spacecraft[me].length-1]){
			if(!(component in componentMasses)){
				continue;
			}
			selection.push(component);
		}
		for(let astronaut in z.spacecraft[me][z.spacecraft[me].length-1].astronauts){
			selection.push(astronaut);
		}
		
		let moveComponent = (component,num)=>{
			if(!(component in componentMasses)){
				z.spacecraft[me][z.separation].astronauts[component] = z.spacecraft[me][z.spacecraft[me].length-1].astronauts[component];
				delete z.spacecraft[me][z.spacecraft[me].length-1].astronauts[component];
				plainAlert(component+" returns to "+z.spacecraft[me][z.separation].name+".");
				mainMenu();
			} else {
				z.spacecraft[me][z.spacecraft[me].length-1].removeComponent(component,num);
				z.spacecraft[me][z.separation].addComponent(component,num);
				plainAlert(num+" "+component+" returned to the "+z.spacecraft[me][z.separation].name+".");
				mainMenu();
			}
		};
		
		let howMany = (component) => {
			if(component in componentMasses){
				if(z.spacecraft[me][z.spacecraft[me].length-1][component] === 1){
					moveComponent(component,1);
				} else {
					let promptText = "How many "+component+" would you like to return? (1-"+z.spacecraft[me][z.spacecraft[me].length-1][component]+")";
					promptNum(promptText,(a)=>0>a||a>z.spacecraft[me][z.spacecraft[me].length-1][component],mainMenu,(a)=>{
						if(a===0){
							mainMenu();
						} else {
							moveComponent(component,a);
						}
					});
				}
			} else {
				moveComponent(component,1);
			}
		};
		
		
		if(selection.length === 1){
			howMany(selection[0]);
		} else {
			let promptText = "Which component would you like to return to the "+z.spacecraft[me][z.separation].name+"? (1-"+selection.length+")";
			selection.forEach((component,j)=>{
				promptText += "\n"+(j+1)+": "+component;
				if(component in componentMasses){
					promptText += " ("+z.spacecraft[me][z.spacecraft[me].length-1][component]+" available)";
				}
			});
			promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,(a)=>{
				howMany(selection[a-1]);
			});
		}
	
	} else {
		addAlert("Choice not found!");
		mainMenu();
	}
	},cancelLabel);
	
}

function gameSetup(){
	z.outer = false;
	z.advancedStart = false;
	confirmify("Use Mercury Mini-Expansion?",()=>{
		z.mercury = false;
		outerPrompt();
	},()=>{
		z.mercury = true;
		outerPrompt();
	},"YES","NO");
}

function outerPrompt(){
	confirmify("Use Outer Planets Expansion?",()=>{
		z.outer = false;
		stationsPrompt();
	},()=>{
		z.outer = true;
		advancedStartPrompt();
	},"YES","NO");
}

function advancedStartPrompt(){
	confirmify("Would you like to use the advanced start (1966)?",()=>{
		z.advancedStart = false;
		stationsPrompt();
	},()=>{
		z.advancedStart = true;
		stationsPrompt();
	},"YES","NO");
}

function stationsPrompt(){
	confirmify("Use Stations Expansion?",()=>{
		z.stations = false;
		variantPrompt();
	},()=>{
		z.stations = true;
		variantPrompt();
	});
}

function variantPrompt(){
	confirmify("Would you like turn order to be solely points-based?\nThis only matters with 3 or more players.",FAMPrompt,()=>{
		z.vCompleteOrdering = true;
		FAMPrompt();
	});
}

function FAMPrompt(){
	confirmify("Would you like to use the (purely cosmetic) For All Mankind variant?",difficultyPrompt,()=>{
		z.FAM = true;
		difficultyPrompt();
	});
}

function difficultyPrompt(){
	promptNum("What difficulty would you like to use?\n1: Easy\n2: Medium\n3: Hard\n4: Very Hard",(a)=>1>a||a>4,clearBackground,(a)=>{
		switch(a){
			case 1:
				z.difficulty = "Easy";
				break;
			case 2:
				z.difficulty = "Medium";
				break;
			case 3:
				z.difficulty = "Hard";
				break;
			case 4:
				z.difficulty = "Very Hard";
				break;
		}
		z.countries = [];
		z.usernames = [];
		z.banners = [];
		z.numPlayers = 0;
		usernamePrompt("OKB-1");
	});
}


function nextUsernamePrompt(country){
	switch(country){
		case "OKB-1":
			usernamePrompt("NASA");
			break;
		case "NASA":
			usernamePrompt("CNES");
			break;
		case "CNES":
			usernamePrompt("SAC");
			break;
		case "SAC":
			usernamePrompt("ISAS");
			break;
		case "ISAS":
			if(z.numPlayers === 0){
				clearBackground();
			} else {
				startGame();
				saveAndQuit();
			}
			break;
	}
}

function usernamePrompt(country){
	promptString("Enter the username of the "+country+" player; if nobody is playing "+country+", press Cancel or leave the entry field blank.",()=>{
		nextUsernamePrompt(country);
	},(prompted)=>{
		z.countries.push(country);
		z.numPlayers++;
		z.usernames.push(prompted);
		switch(country){
			case "OKB-1":
				z.banners.push(5330374);
				break;
			case "NASA":
				z.banners.push(5330366);
				break;
			case "CNES":
				z.banners.push(5330359);
				break;
			case "SAC":
				z.banners.push(5330355);
				break;
			case "ISAS":
				z.banners.push(5330382);
				break;
		}
		nextUsernamePrompt(country);
	});
}

function startGame(){
	z.action = false;
	z.endOfYear = false;
	z.passedTurns = 0;
	z.sold = false;
	z.turn = 0;
	z.turnNumber = 0;
	
	
	setupHazards();
	
	z.advancements = [];
	z.context = [];
	z.crisisOptions = [];
	z.hq = [];
	z.known = [];
	z.lastAdvancement = [];
	z.mandatory = [];
	z.memorialWall = [];
	z.money = [];
	z.points = [];
	z.promptStyle = [];
	z.revealed = {};
	z.spacecraft = [];
	z.turnOrder = [];
	z.endedYear = [];
	if(z.stations){
		z.pointTokens = [];
		z.pointCards = [];
		z.shares = [];
		z.bankMemorial = [];
		z.secrets = [];
	}
	for(let k = 0; !(k >= z.numPlayers); k++){
		z.advancements.push({});
		z.context.push([]);
		z.crisisOptions.push([]);
		z.hq.push(new Spacecraft(z.countries[k] + " HQ"));
		z.known.push({});
		for(let hazard in z.hazard){
			z.known[k][hazard] = false;
			z.revealed[hazard] = false;
		}
		z.lastAdvancement.push(null);
		z.mandatory.push([]);
		z.memorialWall.push([]);
		z.money.push(0);
		z.points.push(0);
		z.promptStyle.push(1);
		z.spacecraft.push([]);
		z.turnOrder.push(k);
		z.endedYear.push(false);
		if(z.stations){
			z.pointTokens.push(0);
			z.pointCards.push([]);
			z.shares.push([]);
			for(let j = 0; !(j>z.numPlayers); j++){
				z.shares[k].push(0);
			}
			z.secrets.push([]);
		}
	}
	
	z.seed = Math.floor(Math.random() * mLCG);
	
	z.dieRolls = [];
	for(let j = 28; j > 0; j--){
		z.dieRolls.push(Math.floor((z.seed * 10)/mLCG) +1);
		updateSeed();
	}
	z.outcomeDeck = [];
	z.outcomeDiscards = [];
	for(let j = 60; j > 0; j--){
		z.outcomeDeck.push(SUCCESS);
	}
	for(let j = 15; j > 0; j--){
		z.outcomeDeck.push(MINOR_FAILURE);
		z.outcomeDeck.push(MAJOR_FAILURE);
	}
	shuffle(z.outcomeDeck);
	if(z.stations){
		z.outcomeDeckBackup = [];
		z.outcomeDiscardsBackup = [];
		for(let j = 40; j > 0; j--){
			z.outcomeDeckBackup.push(SUCCESS);
		}
		for(let j = 10; j > 0; j--){
			z.outcomeDeckBackup.push(MINOR_FAILURE);
			z.outcomeDeckBackup.push(MAJOR_FAILURE);
		}
		shuffle(z.outcomeDeckBackup);
		z.features = {};
		z.features.Venus = [];
		z.features.Moon = [];
		z.features.Mars = [];
		z.features.Phobos = [];
		z.features.Ceres = [];
		z.featureDecks = {};
		let moon = ["Armalcolite","Horizon Glow","Fluorescence","Desolation","Desolation",
		            "Desolation","Desolation","Desolation","Gold","Cobalt","Infection",
					"Dust","Dust","Dust","Dust","Dust","Palladium","Lunar Caves"];
		shuffle(moon);
		z.featureDecks.Moon = moon;
		let mars = ["Badlands","Aurora","Methane","Hematite","Liquid Water","Rocky Desert",
					"Rocky Desert","Rocky Desert","Rhodium","Germanium","Microbes","Lichens",
					"Fossil?","Fossil?","Platinum","Iridium","Mars Caves"];
		shuffle(mars);
		z.featureDecks.Mars = mars;
		let phobos = ["Rubble","Rubble","Rubble","Rubble","Rubble","Wreckage","Alien Object","Phobos Caves"];
		shuffle(phobos);
		z.featureDecks.Phobos = phobos;
		let ceres = ["Water Ice","Barren","Barren","Barren","Ruthenium"];
		shuffle(ceres);
		z.featureDecks.Ceres = ceres;
		let venus = ["Volcanoes","Kelp Forests","Limestone","Mud Flats","Mud Flats","Edible Plants"];
		shuffle(venus);
		z.featureDecks.Venus = venus;
	}
	z.year = 1956;
	if(z.advancedStart){
		z.year = 1966;
		z.crisisOptions.forEach((x,k)=>{
			addOption(k,"[Advanced Start] Pick a free advancement",true,true);
		});
	}
	
	if(z.mercury){
		t.value += "Mercury is in play.\r\n";
	}
	if(z.outer){
		t.value += "The Outer Planets are in play.\r\n";
	}
	if(z.advancedStart){
		t.value += "Advanced Start: each agency starts with two zero-outcome advancements.\r\n";
	}
	if(z.stations){
		t.value += "Stations is in play.\r\n";
	}
	if(z.vCompleteOrdering){
		t.value += "Turn order is solely points-based.\r\n";
	}
	if(z.FAM){
		t.value += "The (purely cosmetic) For All Mankind variant is in play.\r\n";
	}
	
	
	setupMissions();
	
	
	startYear();
}


// ENDLEB [/size] [/c]