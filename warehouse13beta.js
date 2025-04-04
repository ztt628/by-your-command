/*[c][size=1] STARTSIS /**/
var myUsername = "";
var usernameRE = /href="\/collection\/user\/(.*?)">Collection/.exec(document.body.innerHTML);
if(usernameRE){
	myUsername = usernameRE[1];
}

/*jshint -W117*/ /*jshint -W018*/ /* jshint -W083 */ /* jshint -W098 */ /* jshint +W080 */ /*jshint -W086*/
/*var document = "";var module = "";var alert = "";var alertify = "";var confirm = "";var prompt = ""; var define=""; var setTimeout = ""; var window = ""; var Event = "";*/
var z = {};
var ts = document.getElementsByTagName("textarea");
var t = ts[ts.length-1];
var me = -1;
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
		if(me >= 0 && z.numPlayers > me && z.promptStyle[me] === 0) {
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
	if(me >= 0 && z.numPlayers > me && z.promptStyle[me] !== 0) {
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
		if(me >= 0 && z.numPlayers > me && z.promptStyle[me] === 0) {
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
	} else if(me >= 0 && z.numPlayers > me && z.promptStyle[me] === 0) {
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
	} else if(me >= 0 && z.numPlayers > me && z.promptStyle[me] === 0) {
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
		if(0 > me || me >= z.numPlayers || (!mobile && z.promptStyle[me] === 1) || z.promptStyle[me] === 3 || tooManyOptions(illegal)) {
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
	} else if(me >= 0 && z.numPlayers > me && z.promptStyle[me] === 0) {
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
	let qre0 = new RegExp('\\[q="(?!SIS)((?!(\\[q=|\\[/q\\]))[\\s\\S])*\\[/q\\]', "g");
	let qre1 = new RegExp('\\[q="(?!SIS)(((?!(\\[q=|\\[/q\\]))[\\s\\S])*\\[q="((?!(\\[q=|\\[/q\\]))[\\s\\S])*\\[/q\\]((?!(\\[q=|\\[/q\\]))[\\s\\S])*)*\\[/q\\]',
		"g");
	t.value = t.value.replace(qre0, "").replace(qre1, "").replace(qre0, "").replace(qre1, "");
}

var pingNames = ["Berlin, Germany",
				"Boston, MA",
				"Cardiff, Wales",
				"Chicago, IL (T)",
				"Colorado Springs, CO",
				"Denver, CO",
				"Geneva, Switzerland (T)",
				"Hartford, CT",
				"Ithaca, NY",
				"Las Vegas, NV (T)",
				"Los Angeles, CA (A)",
				"Milan, Italy (T)",
				"Moscow, Russia (T)",
				"Nashville, TN",
				"New Orleans, LA (*)",
				"New York City, NY (T)",
				"Palo Alto, CA",
				"Paris, France (T)",
				"Quebec, Canada (T)",
				"Riverton, FL",
				"San Francisco, CA",
				"Seattle, WA",
				"Shiloh, TN (T)",
				"St Louis, MO",
				"Univille, SD (*)",
				"Washington D.C. (A)"];

var pingDice = [ [0,1,1,0,1],
				[1,0,1,0,1],
				[0,0,3,0,0],
				[1,1,1,1,0],
				[3,0,0,0,0],
				[0,1,0,1,1],
				[1,0,1,2,1],
				[1,1,1,0,0],
				[1,1,0,1,0],
				[1,1,1,1,0],
				[1,2,0,1,1],
				[1,1,0,1,1],
				[1,1,1,1,1],
				[0,1,1,1,0],
				[1,0,1,1,1],
				[2,1,1,0,1],
				[0,0,1,1,1],
				[1,1,1,1,0],
				[1,1,1,0,1],
				[0,3,0,0,0],
				[1,0,0,1,1],
				[0,0,0,3,0],
				[0,1,1,1,1],
				[1,1,0,0,1],
				[1,1,1,1,1],
				[0,1,2,1,1] ];

var artifactDifficulties = [ 
[2,0,2,5],
[3,2,1,0],
[1,2,3,2],
[1,2,5,0],
[2,3,3,0],
[0,1,4,2],
[4,3,2,0],
[2,3,2,4],
[4,0,1,3],
[0,5,2,1],
[3,4,0,2],
[0,5,2,1],
[2,4,0,0],
[2,0,1,3],
[3,0,3,0],
[1,0,4,3],
[1,2,0,4],
[3,1,0,4],
[6,0,0,6],
[0,0,4,3],
[2,2,3,0],
[1,4,3,0],
[0,3,4,1],
[0,3,3,2],
[3,1,0,3],
[4,3,0,3],
[4,1,3,0],
[2,2,0,4],
[0,5,1,2],
[0,4,3,1],
[5,0,2,1],
[4,3,1,0],
[1,0,5,2],
[1,2,0,5],
[3,0,4,1],
[1,5,4,0],
[5,0,1,3],
[3,1,5,0],
[6,0,3,1],
[2,2,0,5],
[4,5,2,3],
[4,3,0,2],
[4,2,3,0],
[0,2,6,3],
[0,2,3,5],
[2,6,0,0],
[0,3,5,2],
[3,0,2,6]];

var artifactNames = [
"Alessandro Volta's Lab Coat",
"Anthony Bishop's Manuscript",
"Artifact Scavenger Hunt",
"Aztec Bloodstone",
"Babel Stones",
"Bataan Death March Dogtags",
"Baylor Dodgeball",
"Ben Franklin's Lightning Rod",
"Dimensional Conversion Camera",
"Henry Morton Stanley's Map",
"Ice Flower",
"Jubilee Grand Poker Chip",
"Lewis Carroll's Looking Glass",
"Loew Ben Bezalel's Amulet",
"Lucrezia Borgia's Comb",
"Marie Antoinette's Guillotine",
"Marsden's Unreleased Record",
"Max Wertheimer's Zoetrope",
"Rheticus' Compass",
"Sallah the Sooth Saying Sultan",
"Shakespeare's Lost Folio",
"Smiley Riley",
"Sylvia Plath's Typewriter",
"Szajda's Watch",
"Telegraph from Oman",
"William Tell's Crossbow",
"Tutankhamun's Senet Set",
"Goblet of Severan",
"Harriet Tubman's Thimble",
"Honjo Masamune",
"Jack the Ripper's Lantern",
"Pearl of Wisdom",
"Poe's Pen and Notebook",
"Supersonic Cymbals",
"The Phoenix",
"Sleeper Agent",
"Someone Dug You Up",
"Chameleon Mines",
"Presumed Dead",
"Klugers Implosion Grenades",
"Klugers Egg Shell Bombs",
"Blow Up the Umbilicus",
"Break into the Escher Vault",
"Artifact Auction",
"Acquiring the Imperceptor Vest",
"MacPherson's Auction Website Virus",
"Intentionally Bronzed",
"Hacking the Warehouse"];

function isAdversaryArtifact(artifact){
	return artifact >= 27 && 35 > artifact;
}

function hasWhammy(artifact){
	switch(artifact){
		case 0:
		case 1:
		case 3:
		case 4:
		case 8:
		case 12:
		case 13:
		case 15:
		case 16:
		case 17:
		case 22:
		case 26:
		case 27:
		case 28:
		case 29:
		case 30:
		case 31:
		case 32:
		case 33:
		case 34:
			return true;
	}
	return false;
}

function onlyWhammy(artifact){
	switch(artifact){
		case 3:
		case 15:
		case 17:
		case 26:
			return true;
	}
	return false;
}

/* TODO: redo these */

const LOYAL = 0;
const LOGIC = 0;
const INTUITION = 1;
const LORE = 2;		
const TECH = 3;
const WILD = 4;
const STRESS = 4;
const TRAITOR = 5;
const GOO = 5;
const WAREHOUSE = 6;

var aLCG = 1664525;
var cLCG = 1013904223;
var mLCG = 0x100000000;

var z = {};


function updateSeed(){
	z.seed = (aLCG * z.seed + cLCG) % mLCG;
}

function colorFromCode(code){
	switch(code){
		case LOGIC:
			return "blue";
		case INTUITION:
			return "red";
		case LORE:
			return "orange";
		case TECH:
			return "green";
		case WILD:
			return "black";
		case GOO:
			return "purple";
		case WAREHOUSE:
			return "brown";
	}
}

function colorFromTraitCode(code){
	switch(code){
		case LOGIC:
			return "blue";
		case INTUITION:
			return "red";
		case LORE:
			return "orange";
		case TECH:
			return "green";
		case STRESS:
			return "gray";
		case TRAITOR:
			return "brown";
		case WAREHOUSE:
			return "brown";
	}
}

class Die {
	constructor(type){
		this.type = type;
		this.face = -1;
		this.appliedAs = -1;
		this.covered = false;
	}
	
	roll() {
		this.face = Math.floor((z.seed * 6)/mLCG);
		updateSeed();
		this.appliedAs = this.clue();
	}
	
	unroll(){
		this.face = -1;
		this.appliedAs = -1;
		this.covered = false;
	}
	
	number() {
		if(this.type === WAREHOUSE){
			switch(this.face){
				case 0:
					return 0;
				case 1:
				case 2:
					return 1;
				case 3:
				case 4:
					return 2;
				case 5:
					return 3;
			}
		} else {
			switch(this.face){
				case 0:
				case 1:
				case 2:
				case 3:
					return 1;
				case 4:
					switch(this.type){
						case LOGIC:
						case INTUITION:
						case LORE:
						case TECH:
							return 0;
						case WILD:
							return 1;
						case GOO:
							return 2;
					}
					break;
				case 5:
					if(this.type === GOO){
						return 0;
					} else {
						return 2;
					}
			}
		}
	}
	
	clue() {
		if(this.type === WAREHOUSE){
			return;
		}
		switch(this.face){
			case 0:
				return LOGIC;
			case 1:
				return INTUITION;
			case 2:
				return LORE;
			case 3:
				return TECH;
			case 4:
				if(this.type === GOO){
					return WILD;
				} else {
					return this.type;
				}
			case 5:
				return this.type;   /* GOO = blank */
		}
	}
	
	color() {
		return colorFromCode(this.type);
	}
	
	typeText() {
		switch(this.type){
			case LOGIC:
				return "Logic die";
			case INTUITION:
				return "Intuition die";
			case LORE:
				return "Lore die";
			case TECH:
				return "Tech die";
			case WILD:
				return "Wild die";
			case GOO:
				return "Goo die";
			default:
				return "Warehouse die";
		}
	}
	
	faceText() {
		if(this.type === WAREHOUSE){
			return ""+this.number();
		}
		switch(this.face){
			case -1:
				return this.typeText();
			case 0:
				return "1-Logic";
			case 1:
				return "1-Intuition";
			case 2:
				return "1-Lore";
			case 3:
				return "1-Tech";
			case 4:
				switch(this.type){
					case LOGIC:
						return "0-Logic";
					case INTUITION:
						return "0-Intuition";
					case LORE:
						return "0-Lore";
					case TECH:
						return "0-Tech";
					case WILD:
						return "1-?";
					case GOO:
						return "2-?";
				}
			case 5:
				switch(this.type){
					case LOGIC:
						return "2-Logic";
					case INTUITION:
						return "2-Intuition";
					case LORE:
						return "2-Lore";
					case TECH:
						return "2-Tech";
					case WILD:
						return "2-?";
					case GOO:
						return "(blank)";
				}
		}
	}
	
	/* TODO: colorblind */
	faceColored(noExtra) {
		let text = colorText(this.color(),this.faceText());
		if(this.face !== -1 && this.appliedAs !== this.clue() && !noExtra){
			text += " (applied as "+dieTypeName(this.appliedAs)+")";
		}
		if(this.covered && !noExtra){
			text += " (covered)";
		}
		return text;
	}
	
	typeColored(){
		return colorText(this.color(),this.typeText());
	}
}

function deserializeDie(die){
	let newDie = new Die(die.type);
	newDie.face = die.face;
	newDie.appliedAs = die.appliedAs;
	newDie.covered = die.covered;
	return newDie;
}

function isAction(card){
	switch(card){
		case 9:
		case 10:
		case 11:
		case 15:
		case 16:
		case 17:
		case 20:
		case 21:
		case 22:
		case 23:
		case 24:
		case 25:
		case 26:
		case 27:
		case 28:
		case 35:
		case 36:
		case 37:
		case 43:
		case 44:
		case 45:
		case 46:
		case 47:
		case 48:
		case 49:
		case 50:
		case 51:
		case 52:
		case 53:
		case 54:
		case 72:
		case 73:
		case 74:
		case 80:
		case 81:
		case 82:
		case 84:
		case 85:
		case 86:
		case 87:
		case 88:
		case 91:
		case 92:
		case 93:
		case 96:
		case 97:
		case 98:
		case 100:
		case 104:
		case 105:
		case 110:
		case 111:
		case 114:
		case 117:
		case 118:
			return true;
	}
	return false;
}

function isInstant(card){
	switch(card){
		case 0:
		case 1:
		case 2:
		case 6:
		case 7:
		case 8:
		case 12:
		case 13:
		case 14:
		case 32:
		case 33:
		case 34:
		case 40:
		case 41:
		case 42:
		case 60:
		case 61:
		case 62:
		case 63:
		case 64:
		case 65:
		case 66:
		case 67:
		case 68:
		case 69:
		case 70:
		case 71:
		case 83:
		case 89:
		case 90:
		case 94:
		case 95:
		case 99:
		case 101:
		case 102:
		case 103:
		case 106:
		case 107:
		case 108:
		case 109:
		case 112:
		case 113:
		case 115:
		case 116:
			return true;
	}
	return false;
}

function isRetrieval(card){
	switch(card){
		case 3:
		case 4:
		case 5:
		case 29:
		case 30:
		case 31:
		case 55:
		case 56:
		case 57:
		case 75:
		case 76:
		case 77:
			return true;
	}
	return false;
}

function canPlayTrait(card,player){
	if(player === undefined){
		player = me;
	}
	if(isRetrieval(card)){
		return z.retrievalPhase;
	}
	if(isInstant(card)){
		if(traitText(card) === "One Quiet Day"){
			for(let j = 0; !(j >= z.dice[LEADS].length); j++){
				if(z.dice[LEADS][j].number() === 0){
					return true;
				}
			}
			if(z.location[player] === "Warehouse"){
				for(let j = 0; !(j >= z.dice[FIELD_CLUES].length); j++){
					if(z.dice[FIELD_CLUES][j].number() === 0){
						return true;
					}
				}
			}
			return false;
		} else if(traitText(card) === "Technical Difficulties"){
			return z.dice[LEADS].length > 0;
		}
		return true;
	}
	if(isAction(card)){
		return !z.retrievalPhase && !z.beforeRetrieval && !z.cleanupPause;
	}
	return false;
}

function canPlayAnyTrait(player){
	if(player === undefined){
		player = me;
	}
	if(player === z.bronzed){
		return false;
	}
	for(let j = 0; !(j>=z.traitHands[player].length); j++){
		if(canPlayTrait(z.traitHands[player][j],player)){
			return true;
		}
	}
	if(z.players[player] === "Artie" && z.travelBag !== null){
		if(canPlayTrait(z.travelBag,player)){
			return true;
		}
	}
	return false;
}

function canDiscardTrait(player){
	if(player === undefined){
		player = me;
	}
	for(let j = 0; !(j>=z.traitHands[player].length); j++){
		if(traitColor(z.traitHands[player][j]) !== STRESS){
			return true;
		}
	}
	return false;
}

function canDiscardStress(player){
	if(player === undefined){
		player = me;
	}
	for(let j = 0; !(j>=z.traitHands[player].length); j++){
		if(traitColor(z.traitHands[player][j]) === STRESS){
			return true;
		}
	}
	return false;
}

function discardStress(player){
	for(let j = 0; !(j>=z.traitHands[player].length); j++){
		if(traitColor(z.traitHands[player][j]) === STRESS){
			z.traitDecks[STRESS].push(z.traitHands[player].splice(j,1)[0]);
			return;
		}
	}
}



function revealPing(){
	z.ping = z.pings.pop();
	boldAlert("The new Ping is in "+pingNames[z.ping]+"!");
	switch(pingNames[z.ping]){
		case "Cardiff, Wales":
			plainAlert("All Lore dice are set to 1-Lore.");
			break;
		case "Colorado Springs, CO":
			plainAlert("All Logic dice are set to 1-Logic.");
			break;
		case "Riverton, FL":
			plainAlert("All Intuition dice are set to 1-Intuition.");
			break;
		case "Seattle, WA":
			plainAlert("All Tech dice are set to 1-Tech.");
			break;
	}
	let fieldClues = [0,0,0,0,0];
	while(z.dice[RESERVES].length > 0){
		let type = z.dice[RESERVES][0].type;
		if(pingNames[z.ping] === "Cardiff, Wales" && type === LORE){
			z.dice[RESERVES][0].face = LORE;
			z.dice[RESERVES][0].appliedAs = LORE;
		} else if (pingNames[z.ping] === "Colorado Springs, CO" && type === LOGIC){
			z.dice[RESERVES][0].face = LOGIC;
			z.dice[RESERVES][0].appliedAs = LOGIC;
		} else if (pingNames[z.ping] === "Riverton, FL" && type === INTUITION){
			z.dice[RESERVES][0].face = INTUITION;
			z.dice[RESERVES][0].appliedAs = INTUITION;
		} else if (pingNames[z.ping] === "Seattle, WA" && type === TECH){
			z.dice[RESERVES][0].face = TECH;
			z.dice[RESERVES][0].appliedAs = TECH;
		} else {
			z.dice[RESERVES][0].roll();
		}
		if(pingDice[z.ping][type] > fieldClues[type]){
			z.dice[FIELD_CLUES].push(z.dice[RESERVES].shift());
			fieldClues[type]++;
		} else {
			z.dice[LEADS].push(z.dice[RESERVES].shift());
		}
	}
	sortDice();
	/* TODO: announce rolls */
	gameState();
	if(z.traitor === -1){
		boldAlert("Now, reveal a Traitor card for the Adversary and apply its effects following Warehouse Standard Protocol.");
	} else {
		boldAlert("Now, "+z.players[z.traitor]+" should take their Traitor Turn.");
	}
}


function drawObstacle(){
	/* RULES: does this reshuffle when you need it or before? */
	if(z.obstacles.length === 0){
		z.obstacles = z.obstacleDiscards;
		z.obstacleDiscards = [];
		shuffle(z.obstacles);
		plainAlert("Obstacles reshuffled.");
	}	
	return z.obstacles.pop();
}

function obstacleStrength(obstacle){
	switch(obstacle){
		case 0:
		case 1:
		case 2:
		case 3:
		case 9:
		case 10:
		case 11:
		case 12:
			return 2;
		case 4:
		case 5:
		case 6:
		case 13:
		case 14:
		case 15:
			return 3;
		case 7:
		case 8:
		case 16:
		case 17:
			return 4;
	}
}

function isPhysical(obstacle){
	if(obstacle >= 9){
		return true;
	} else {
		return false;
	}
}


function obstacleName(obstacle){
	if(isPhysical(obstacle)){
		return colorText("brown",obstacleStrength(obstacle)+" - Physical");
	} else {
		return colorText("teal",obstacleStrength(obstacle)+" - Mental");
	}	
}

function gameOver(agentsWin){
	z.gameOver = true;
	if(agentsWin){
		boldAlert("The Agents win!");
	} else {
		if(z.traitor === -1){
			let any = false;
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(z.loyalty[j] === TRAITOR){
					any = true;
					boldAlert(z.players[j]+" wins!");
				}
			}
			if(!any){
				boldAlert("The Adversary wins!");
			}
		} else if(z.traitor > 0){
			boldAlert(z.players[z.traitor]+" wins!");
		} else {
			boldAlert("The Adversary wins!");
		}		
	}
}

function damageWarehouse(){
	z.warehouseMaintenance.push(drawObstacle());
	plainAlert(obstacleName(z.warehouseMaintenance[z.warehouseMaintenance.length-1])+" added to the Warehouse Maintenance track.");
	if(z.warehouseMaintenance.length === 5 || (z.brokenGear && z.warehouseMaintenance.length === 4)){
		boldAlert("The Warehouse is destroyed!");
		gameOver(false);
		return false;
	}
	return true;
}

function discardRandomTrait(player,includeStress){
	
	let card = -1;
	while(true){
		let index = Math.floor((z.seed * z.traitHands[player].length)/mLCG);
		updateSeed();
		card = z.traitHands[player].splice(index,1)[0];
		if(traitColor(card) === STRESS && !includeStress){
			z.traitHands[player].push(card);
			continue;
		}
		break;
	}
	plainAlert(z.players[player]+" discards "+traitColored(card)+" randomly.");
	if(traitColor(card) === STRESS){
		z.traitDecks[STRESS].push(card);
	} else {
		z.traitDiscards[traitColor(card)].unshift(card);
	}
	if(z.traitHands[player].length === 0){
		for(let j = 0; !(j>=z.possibleColors[player].length); j++){
			z.possibleColors[player][j] = 0;
		}
	}
	return card;
}

function discardTrait(player,index){
	let card = z.traitHands[player].splice(index,1)[0];
	z.traitDiscards[traitColor(card)].unshift(card);
	if(z.traitHands[player].length === 0){
		for(let j = 0; !(j>=z.possibleColors[player].length); j++){
			z.possibleColors[player][j] = 0;
		}
	}
	return card;
}

function isCalamity(card){
	return isDamageCalamity(card) || isNeutralizeCalamity(card);
}

function drawTrait(player,type){
	if(z.traitDecks[type].length === 0){
		z.traitDecks[type] = z.traitDiscards[type];
		shuffle(z.traitDecks[type]);
		z.traitDiscards[type] = [];
		plainAlert(traitDeckName(type)+" deck reshuffles.");
	}
	
	/* TODO: calamities */
	let card = z.traitDecks[type].pop();
	let cardTrait = "Trait";
	if(type === TRAITOR){
		cardTrait = "Card";
	}
	if(me === player){
		addAlert("You draw "+traitColored(card)+".");
		t.value += z.players[player]+" draws a "+traitDeckName(type)+" "+cardTrait+".\r\n";
	} else {
		plainAlert(z.players[player]+" draws a "+traitDeckName(type)+" "+cardTrait+".");
	}
	
	if(isDamageCalamity(card) || isNeutralizeCalamity(card)){
		z.traitDiscards[type].unshift(card);
		plainAlert(traitColored(card)+" drawn!");
		if(z.collaborate){
			plainAlert("There is no effect, as this was drawn with "+colorText("orange","Collaborate")+".");
		} else if(z.players[player] === "Leena"){
			plainAlert("Leena could use her Aura Reader here to prevent this Calamity.");
		} else if(isDamageCalamity(card)){
			damageWarehouse();
		} else {
			plainAlert("You must now neutralize a "+traitDeckName(traitColor(card))+" die.");
		}
	} else {
		z.traitHands[player].push(card);
		z.possibleColors[player][type] = 1;
	}
	
}



function woundPlayer(player){
	z.KOd[player] = true;
	z.wounded[player] = true;
	let lookOutPossible = false;
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(j !== player){
			if(z.possibleColors[j][TECH]){
				lookOutPossible = true;
			}
			if(z.players[j] === "Artie" && traitText(z.travelBag) === "Look Out!"){
				lookOutPossible = true;
			}
		}
	}
	boldAlert(z.players[player]+" is wounded!");
	if(lookOutPossible){
		plainAlert("This wound could be reduced to a KO by a Look Out!");
	}
}

function koPlayer(player){
	z.KOd[player] = true;
	let lookOutPossible = false;
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(j !== player && z.location[j] === z.location[player]){
			if(z.possibleColors[j][TECH]){
				lookOutPossible = true;
			}
			if(z.players[j] === "Artie" && traitText(z.travelBag) === "Look Out!"){
				lookOutPossible = true;
			}
		}
	}
	boldAlert(z.players[player]+" is KO'd!");
	if(lookOutPossible){
		plainAlert("This KO can be prevented by a Look Out!");
	}
	if(z.players[player] === "Jinks"){
		plainAlert("Due to Jinks' drawback, Undeceased, this should likely be a wound instead.");
	}
}

function canCoverSecondDie(player){
	if(player === undefined){
		player = me;
	}
	let coveredCount = 0;
	let rolledCount = 0;
	for(let j = 0; !(j>=z.dice[CLAIMED+player].length); j++){
		if(z.dice[CLAIMED+player][j].covered){
			coveredCount++;
		} else if(z.dice[CLAIMED+player][j].face !== -1){
			rolledCount++;
		}
	}
	return coveredCount === 1 && rolledCount > 0;
}

function canUncover(player){
	if(player === undefined){
		player = me;
	}
	for(let j = 0; !(j>=z.dice[CLAIMED+player].length); j++){
		if(z.dice[CLAIMED+player][j].covered){
			return true;
		}
	}
	return false;
}

function canReveal(player){
	if(player === undefined){
		player = me;
	}
	let numCovered = 0;
	for(let j = 0; !(j>=z.dice[CLAIMED+player].length); j++){
		if(z.dice[CLAIMED+player][j].covered){
			numCovered++;
		}
	}
	if(numCovered === 0){
		return false;
	}
	let allReady = true;
	let anyReady = false;
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(j === player){
			continue;
		}
		if(z.dice[CLAIMED+j].length === 0){
			continue;
		}
		let ready = false;
		let numCovered = 0;
		let numRolled = 0;
		for(let k = 0; !(k>=z.dice[CLAIMED+j].length); k++){
			if(z.dice[CLAIMED+j][k].covered){
				numCovered++;
			}
			if(z.dice[CLAIMED+j][k].face !== -1){
				numRolled++;
			}
		}
		if(numRolled === 0){
			continue;
		}
		if(z.theCaretaker){
			if(numCovered === 2 || (numCovered === 1 && z.dice[CLAIMED+j].length === 1)){
				ready = true;
			} else if(numCovered === 1){
				return false;
			}
		} else {
			ready = (numCovered === 1);
		}
		if(!ready){
			allReady = false;
		} else {
			anyReady = true;
		}
	}
	/* TODO: meet the regents check */
	return allReady || (!anyReady && player !== z.traitor && ((z.players[player] === "Artie" && traitText(z.travelBag) === "Meet the Regents") || (z.traitDiscards[LOGIC].length > 0 && traitText(z.traitDiscards[LOGIC][0]) === "Meet the Regents")));
}

function canCoverFirstDie(player){
	if(player === undefined){
		player = me;
	}
	let rolledCount = 0;
	for(let j = 0; !(j>=z.dice[CLAIMED+player].length); j++){
		if(z.dice[CLAIMED+player][j].covered){
			return false;
		}
		if(z.dice[CLAIMED+player][j].face !== -1){
			rolledCount++;
		}
	}
	return rolledCount > 0;
}

function canZipline(){
	for(let k = 0; !(k>=z.dice[CLAIMED+me].length); k++){
		if(z.dice[CLAIMED+me][k].face !== -1){
			return true;
		}
	}
	return false;
}

function canTakeBack(player){
	if(player === undefined){
		player = me;
	}
	
	if(artifactNames[z.artifact] === "Szajda's Watch" || player === z.traitor){
		if(z.dice[REVEALED+player].length > 0){
			return true;
		}
	} else if(z.dice[REVEALED+player].length > 1){
		return true;
	}
	return false;
}

function canPickBronzeApplication(){
	for(let k = 0; !(k>=z.numPlayers); k++){
		for(let j = 0; !(j>=z.dice[REVEALED+k].length); j++){
			if(z.dice[REVEALED+k][j].type === WILD && z.dice[REVEALED+k][j].clue() === WILD){
				return true;
			}
		}
	}
	return false;
}

function canItsWhatIDoes(){
	if(z.players[me] !== "Claudia" || !z.OPSavailable[me] || me === z.traitor){
		return false;
	}
	for(let j = 0; !(j>=z.dice[CLAIMED+me].length); j++){
		if(z.dice[CLAIMED+me][j].type === TECH){
			return true;
		}
	}
	return false;
}

function canPickApplication(player){
	if(player === undefined){
		player = me;
	}
	
	for(let j = 0; !(j>=z.dice[REVEALED+player].length); j++){
		if(z.dice[REVEALED+player][j].type === WILD && z.dice[REVEALED+player][j].clue() === WILD){
			return true;
		}
		if(z.players[player] === "Pete" && z.dice[REVEALED+player][j].type === INTUITION && z.dice[REVEALED+player][j].number() === 2){
			return true;
		}
		if(artifactNames[z.artifact] === "Rheticus' Compass" && z.dice[REVEALED+player][j].clue() === LORE){
			/* RULES: this and Myka's OPE */
			return true;
		}
	}
	return false;
}

function canApply(){
	let any = false;
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(z.dice[REVEALED+j].length > 0 && j === z.traitor){
			return false;
		}
		if(z.dice[REVEALED+j].length > 1 && z.players[j] !== "Myka"){
			return false;
		}
		for(let k = 0; !(k>=z.dice[REVEALED+j].length); k++){
			if(z.dice[REVEALED+j][k].appliedAs === WILD){
				return false;
			}
		}
		if(z.dice[REVEALED+j].length > 0){
			any = true;
		}
	}
	return any;
}


function traitDeckName(num){
	switch(num){
		case LOGIC:
			return colorText("blue","Logic");
		case INTUITION:
			return colorText("red","Intuition");
		case LORE:
			return colorText("orange","Lore");
		case TECH:
			return colorText("green","Tech");
		case STRESS:
			return "Stress";
		case TRAITOR:
			return colorText("brown","Traitor");
	}
}

function dieTypeName(num){
	switch(num){
		case LOGIC:
			return colorText("blue","Logic");
		case INTUITION:
			return colorText("red","Intuition");
		case LORE:
			return colorText("orange","Lore");
		case TECH:
			return colorText("green","Tech");
		case WILD:
			return "Wild";
		case GOO:
			return colorText("purple","Goo");
	}
}

function isNeutralizeCalamity(trait){
	return trait % 20 === 19 && 80 > trait ;
}

function isDamageCalamity(trait){
	return trait % 20 === 18 && 80 > trait;
}

function drawStress(player){
	if(player === undefined){
		player = me;
	}
	if(z.traitDecks[STRESS].length === 0){
		boldAlert("Critical Stress Levels Reached!");
		gameOver(false);
		return false;
	}
	z.traitHands[player].push(z.traitDecks[STRESS].pop());
	z.possibleColors[player][STRESS] = 1;
	return true;
}


function traitColor(card){
	if(card > 118){
		return STRESS;
	}
	if(card > 79){
		return TRAITOR;
	}
	if(card > 59){
		return TECH;
	}
	if(card > 39){
		return LORE;
	}
	if(card > 19){
		return INTUITION;
	}
	if(card >= 0){
		return LOGIC;
	}
}

function traitStrength(card){
	if(0 > card || card > 79 || card % 20 > 17){
		return -1;
	}
	if(card % 20 > 11){
		return 2;
	}
	if(card % 20 > 5){
		return 1;
	}
	return 0;
}

function traitColored(card){
	if(traitStrength(card) === -1){
		return colorText(colorFromTraitCode(traitColor(card)),traitText(card));
	} else {
		return colorText(colorFromTraitCode(traitColor(card)),traitStrength(card) + " - " +traitText(card));
	}
}

function traitText(card){
	if(card === null){
		return "";
	}
	switch(card){
		case 0:
		case 1:
		case 2:
			return "Francois Villon's Inkwell";
		case 3:
		case 4:
		case 5:
			return "Meet the Regents";
		case 6:
		case 7:
		case 8:
			return "Analog Password Decoder";
		case 9:
		case 10:
		case 11:
			return "Artie's Wall Map";
		case 12:
		case 13:
		case 14:
			return "Durational Spectrometer";
		case 15:
		case 16:
		case 17:
			return "Parallel Investigation";
		case 18:
			return "Logic Calamity (D)";
		case 19:
			return "Logic Calamity (N)";
		case 20:
		case 21:
		case 22:
			return "Camaraderie";
		case 23:
		case 24:
		case 25:
			return "Premonition";
		case 26:
		case 27:
		case 28:
			return "Spectroscope";
		case 29:
		case 30:
		case 31:
			return "The Caretaker";
		case 32:
		case 33:
		case 34:
			return "Goozooka";
		case 35:
		case 36:
		case 37:
			return "Let's Take a Walk";
		case 38:
			return "Intuition Calamity (D)";
		case 39:
			return "Intuition Calamity (N)";
		case 40:
		case 41:
		case 42:
			return "One Quiet Day";
		case 43:
		case 44:
		case 45:
			return "Read the Manual";
		case 46:
		case 47:
		case 48:
			return "Collaborate";
		case 49:
		case 50:
		case 51:
			return "I Smell Fudge";
		case 52:
		case 53:
		case 54:
			return "The Restricted Files";
		case 55:
		case 56:
		case 57:
			return "Warehouse Card File";
		case 58:
			return "Lore Calamity (D)";
		case 59:
			return "Lore Calamity (N)";
		case 60:
		case 61:
		case 62:
			return "Farnsworth";
		case 63:
		case 64:
		case 65:
			return "H.G. Wells' Grappler";
		case 66:
		case 67:
		case 68:
			return "Look Out!";
		case 69:
		case 70:
		case 71:
			return "Tesla";
		case 72:
		case 73:
		case 74:
			return "Tesla Grenade";
		case 75:
		case 76:
		case 77:
			return "Zipline";
		case 78:
			return "Tech Calamity (D)";
		case 79:
			return "Tech Calamity (N)";
	}
	if(card > 118){
		return "Stress";
	}
	let traitors = [
		"Accident?",
		"All Tied Up",
		"All Tied Up",
		"Ambush",
		"Artifact Disturbance",
		"Artifact Missing?",
		"Captured!",
		"Catastrophe",
		"Containment Loss",
		"Da Vinci's Gargoyle",
		"Da Vinci's Gargoyle",
		"Distraction",
		"Distraction",
		"False Ping",
		"Fenced In",
		"Haunted by the Past",
		"Hostage",
		"Hostage",
		"Houdini's Wallet",
		"It's a Trap!",
		"Neutralized",
		"Obstruction",
		"Obstruction",
		"Original Bed and Breakfast",
		"Original Red Herring",
		"Original Red Herring",
		"Road Closed",
		"Road Closed",
		"Self-Fulfilling Prophecy",
		"Self-Fulfilling Prophecy",
		"Shower of Goo",
		"Static Buildup",
		"Stressed Out",
		"Stressed Out",
		"Studio 54 Disco Ball",
		"Technical Difficulties",
		"Technical Difficulties",
		"Trouble in the Gooery",
		"Umbilicus Destroyed"];
	return traitors[card-80];
}


function promptSelection(promptText,selection,user) {
	promptNum(promptText,(a)=>1>a||a>selection.length,mainMenu,user);
}

const LOCKED = 0;
const RESERVES = 1;
const NEUTRALIZED = 2;
const BRONZED = 3;
const LEADS = 4;
const FIELD_CLUES = 5;
const APPLIED = 6;
const CLAIMED = 7;
const REVEALED = 12;

function hasTravelEffect(ping){
	switch(ping){
		case "Chicago, IL":
		case "Geneva, Switzerland":
		case "Las Vegas, NV":
		case "Milan, Italy":
		case "Moscow, Russia":
		case "New York City, NY":
		case "Paris, France":
		case "Quebec, Canada":
		case "Shiloh, TN":
			return true;
	}
	return false;
}

/* TODO: disable instants if you are over your hand limit */

/* Milan, Italy (investigation)
	Henry Morton Stanley's Map (retrieval)
	Jinks doing Warehouse Research (investigation at Warehouse)
	The Restricted Files (hmmm)
	*/
function canDrawDiscarded(){
	if(!((pingNames[z.ping] === "Milan, Italy (T)" && !z.finale && !z.retrievalPhase && !z.beforeRetrieval && !z.cleanupPause) || 
	     (z.retrievalPhase && artifactNames[z.artifact] === "Henry Morton Stanley's Map") ||
		 (z.players[me] === "Jinks" && me !== z.traitor && me !== z.bronzed && z.location[me] === "Warehouse" && !z.retrievalPhase && !z.beforeRetrieval && !z.cleanupPause) ||
		 ((z.traitDiscards[LORE].length > 0 && traitText(z.traitDiscards[LORE][0]) === "The Restricted Files") || (z.players[me] === "Artie" && traitText(z.travelBag) === "The Restricted Files") && !z.retrievalPhase && !z.beforeRetrieval && !z.cleanupPause ) ||
		 (!z.retrievalPhase && !z.beforeRetrieval && !z.cleanupPause && me !== z.bronzed && (z.traitHands[me].includes(52) || z.traitHands[me].includes(53) || z.traitHands[me].includes(54))))){
			 return false;
		 }
	if(z.traitDiscards[LOGIC].length > 0 && !isCalamity(z.traitDiscards[LOGIC][0])){
		return true;
	}
	if(z.traitDiscards[INTUITION].length > 0 && !isCalamity(z.traitDiscards[INTUITION][0]) && z.players[me] !== "Myka"){
		return true;
	}
	if(z.traitDiscards[LORE].length > 0 && !isCalamity(z.traitDiscards[LORE][0])){
		return true;
	}
	if(z.traitDiscards[TECH].length > 0 && !isCalamity(z.traitDiscards[TECH][0])){
		return true;
	}
	return false;
}


function canTravel(){
	if(z.retrievalPhase || z.finale || me === z.traitor || me === z.bronzed){
		return false;
	}
	if("Travel" in z.boardObstacles){
		return false;
	}
	if(z.players[me] !== "Claudia" || z.location[me] === "Field"){
		return true;
	}
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(z.location[j] === "Field" && j !== me){
			return true;
		}
	}
	return false;
}

function canHeal(){
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(z.wounded[j] || z.KOd[j]){
			return true;
		}
	}
}

function canDefeatObstacle(){
	if(z.immediateObstacle !== null){
		return true;
	}
	if(z.warehouseMaintenance.length > 0 && z.location[me] === "Warehouse"){
		return true;
	}
	for(let obstacle in z.boardObstacles){
		return true;
	}
	return false;
}

function teslaGrenade(choice){
	if(Number.isInteger(choice)){
		plainAlert(z.players[me]+" defeats a "+obstacleName(z.warehouseMaintenance[choice])+" obstacle on Warehouse Maintenance.");
		z.obstacleDiscards.push(z.warehouseMaintenance.splice(choice,1)[0]);
	} else if(choice === "Travel"){
		plainAlert(z.players[me]+" defeats the obstacle on Travel.");
		z.obstacleDiscards.push(z.boardObstacles.Travel);
		delete z.boardObstacles.Travel;
		delete z.noTravelRing;
	} else if (choice === "Immediate"){
		plainAlert(z.players[me]+" defeats the obstacle immediately facing the Agents.");
		z.obstacleDiscards.push(z.immediateObstacle);
		z.immediateObstacle = null;
	} else {
		plainAlert(z.players[me]+" discards the obstacle on the "+choice+" deck.");
		z.obstacleDiscards.push(z.boardObstacles[choice]);
		delete z.boardObstacles[choice];
		switch(choice){
			case "Logic":
				delete z.noLogicRing;
				break;
			case "Intuition":
				delete z.noIntuitionRing;
				break;
			case "Lore":
				delete z.noLoreRing;
				break;
			case "Tech":
				delete z.noTechRing;
				break;
		}
	}				
}

var consequenceNames = 
/*0*/ ["An Agent cannot apply 2-clues.  If that Agent cannot apply a die, he must neutralize a die.",
/*1*/"Add 1 to all Physical Challenges.",
/*2*/"Permanently lock a red (Intuition) die.",
/*3*/"Permanently cover a Warehouse Maintenance space.",
/*4*/"Permanently lock a green (Tech) die.",
/*5*/"Snag the Bed & Breakfast (>1).",
/*6*/"1-clues on Goo dice can also neutralize Agents' 2-clues of the same type.",
/*7*/"During Cleanup, an Agent must discard two Traits.  If unable, KO that agent.",
/*8*/"Add 1 to all Mental Challenges.",
/*9*/"Permanently lock a blue (Logic) die.",
/*10*/"Snag Field Research (>1).",
/*11*/"Snag Warehouse Research (>0).",
/*12*/"Snag the Travel space. (>0)",
/*13*/"Goblet of Severan: Permanently lock the Wild (black) die.",
/*14*/"Harriet Tubman's Thimble: Each Retrieval round, the Traitor can look behind one Agent's shield immediately after dice are rolled.",
/*15*/"Honjo Masamune: During Cleanup, wound an Agent.",
/*16*/"Jack the Ripper's Lantern: Snag (>0) all Agent abilities except for Downsides.",
/*17*/"Pearl of Wisdom: Once per Retrieval, the Traitor can look behind one Agent's shield and select the die the Agent must cover.",
/*18*/"Poe's Pen and Notebook: Permanently lock a yellow (Lore) die.",
/*19*/"Supersonic Cymbals: Before Retrieval, an Agent must neutralize a die.",
/*20*/"The Phoenix: Before Retrieval, wound an Agent.  That Agent chooses a different Agent to take the wound instead."];
function applyConsequence(consequence,gooery){
	z.consequences.push(consequence);
	let alertText = "The following consequence now goes into effect:\n";
	alertText += consequenceNames[consequence];
	switch(consequence){
		case 0:
		case 1:
		case 5:
		case 6:
		case 8:
		case 10:
		case 11:
		case 12:
		case 16:
		case 19:
		case 20:
			alertText += "\nThis consequence is not enforced by the script, so don't forget to apply its effects when applicable.";
			break;
		case 7:
		case 15:
			alertText += "\nYou will be reminded to process this consequence's effect during cleanup.";
			break;
		case 2:
		case 4:
		case 9:
		case 13:
		case 18:
			let type = -1;
			switch(consequence){
				case 2:
					type = INTUITION;
					break;
				case 4:
					type = TECH;
					break;
				case 9:
					type = LOGIC;
					break;
				case 13:
					type = WILD;
					break;
				case 18:
					type = LORE;
					break;
			}
			if(gooery){
				alertText += "\nYou must lock the die now.";
				z.gooery = type;
			} else {
				let done = false;
				for(let j = 1; !(j>=z.dice.length) && !done; j++){
					for(let k = 0; !(k>=z.dice[j].length) && !done; k++){
						if(z.dice[j][k].type === type){
							z.dice[LOCKED].push(z.dice[j].splice(k,1)[0]);
							boldAlert("A "+dieTypeName(type)+" die is locked.");
							done = true;
						}
					}
				}
			}
			break;
		case 3:
			alertText += "\nThe broken gear has been placed on the last space of the Warehouse Maintenance Track.";
			z.brokenGear = true;
			if(z.warehouseMaintenance.length === 4){
				alertText += "\nThe Warehouse is destroyed!";
				gameOver(false);
			}
			break;
		case 14:
		case 17:
			if(z.traitor === -1){
				alertText += "\nThe Traitor may now reveal.";
			}
			break;
	}
	boldAlert(alertText);
}

function printSelection(selection){
	let text = "";
	selection.forEach((item,j)=>{
		text += "\n"+(j+1)+": "+item;
	});
	return text;
}

function appliedStrengths(){
	let strengths = [0,0,0,0];
	for(let j = 0; !(j>=z.dice[APPLIED].length); j++){
		strengths[z.dice[APPLIED][j].appliedAs] += z.dice[APPLIED][j].number();
	}
	return strengths;
}

function canRetrieveArtifact(){
	if(!z.finale){
		let any = false;
		for(let j = 0; !(j>=z.numPlayers); j++){
			if(z.location[j] === "Field");
			any = true;
			break;
		}
		if(!any){
			return false;
		}
	}
	let strengths = appliedStrengths();
	for(let j = 0; !(j>=4); j++){
		if(z.difficulty[j] > strengths[j]){
			return false;
		}
	}
	return true;
}

function canLoseArtifact(){
	if(!z.finale){
		let any = false;
		for(let j = 0; !(j>=z.numPlayers); j++){
			if(z.location[j] === "Field");
			any = true;
			break;
		}
		if(!any){
			return true;
		}
	}
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(z.dice[CLAIMED+j].length > 0 && j !== z.traitor){
			return false;
		}
		if(z.dice[REVEALED+j].length > 0 && j !== z.traitor){
			return false;
		}
	}
	return !canRetrieveArtifact();
}

function canLieDetector(){
	if(!(z.players[me] === "Jinks" && me !== z.traitor && z.OPEavailable[me] && z.retrievalPhase)){
		return false;
	}
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(j === me){
			continue;
		}
		for(let k = 0; !(k >=z.dice[CLAIMED+j].length); k++){
			if(z.dice[CLAIMED+j].face !== -1){
				return true;
			}
		}
	}
	return false;
}

function canThimble(){
	if(!(me === z.traitor && z.consequences.includes(14))){
		return false;
	}
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(j === me){
			continue;
		}
		for(let k = 0; !(k >=z.dice[CLAIMED+j].length); k++){
			if(z.dice[CLAIMED+j].face !== -1){
				return true;
			}
		}
	}
	return false;
}

function canPearl(){
	if(!(me === z.traitor && z.consequences.includes(17))){
		return false;
	}
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(j === me){
			continue;
		}
		for(let k = 0; !(k >=z.dice[CLAIMED+j].length); k++){
			if(z.dice[CLAIMED+j].face !== -1){
				return true;
			}
		}
	}
	return false;
}

function cleanup(){
	z.theCaretaker = false;
	z.retrievalPhase = false;
	z.artifactRevealed = false;
	z.artifact = null;
	for(let j = 2; !(j>=z.dice.length); j++){
		while(z.dice[j].length > 0){
			z.dice[j][0].unroll();
			if(z.dice[j][0].type === GOO){
				z.dice[j].shift();
			} else {
				z.dice[RESERVES].push(z.dice[j].shift());
			}
		}
	}
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(z.location[j] === "Field"){
			z.location[j] = "Warehouse";
		}
		if(!z.finale){
			z.wounded[j] = false;
		}
		if(j !== z.traitor && j !== z.bronzed && !z.finale){
			/* RULES: are wounds and KOs cleared in the finale cleanup? */
			z.KOd[j] = false;
			t.value += z.players[j] +" draws a Stress.\r\n";
			drawStress(j);
			if(z.players[j] === "Artie"){
				t.value += z.players[j] +" draws another Stress.\r\n";
				drawStress(j);
			}
		}
	}
	if(z.consequences.includes(7)){
		boldAlert("An Agent must discard two Traits.  If unable, KO that agent.");
		if(z.traitor === -1){
			plainAlert("Note that the First Agent is still "+z.players[z.firstAgent]+".");
		}
		z.cleanupPause = true;
	}
	if(z.consequences.includes(15)){
		boldAlert("You must now wound an Agent due to Honjo Masamune.");
		if(z.traitor === -1){
			plainAlert("Note that the First Agent is still "+z.players[z.firstAgent]+".");
		}
		z.cleanupPause = true;
	}
	if(z.cleanupPause){
		return;
	}
	
	cleanup2();
}

function canTut(){
	if(artifactNames[z.artifact] !== "Tutankhamun's Senet Set"){
		return false;
	}
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(j === z.bronzed || j === z.traitor){
			continue;
		}
		for(let k = 0; !(k>=z.dice[CLAIMED+j].length); k++){
			if(z.dice[CLAIMED+j][k].type === LOGIC){
				return true;
			}
		}
	}
	return false;
}

function beforeRetrieval(){
	z.beforeRetrieval = true;
	let anyField = false;
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(z.location[j] === "Field"){
			anyField = true;
			break;
		}
	}
	if(!anyField && !z.finale){
		boldAlert("There are no Agents in the Field!  You must lose the Artifact to the Adversary.");
		return;
	}
	if(z.traitor >= 0 && z.location[z.traitor] !== "Bronze Sector"){
		z.dice[CLAIMED+z.traitor].push(new Die(GOO));
		z.dice[CLAIMED+z.traitor].push(new Die(GOO));
		z.dice[CLAIMED+z.traitor].push(new Die(GOO));
	}
	let any = false;
	switch(artifactNames[z.artifact]){
		case "Anthony Bishop's Manuscript":
			plainAlert("Roll a Warehouse die for additional Logic difficulty.");
			any = true;
			break;
		case "Artifact Scavenger Hunt": {
			let count = 0;
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(z.location[j] === "Field"){
					count++;
				}
			}
			if(3 > count && z.numPlayers > count){
				any = true;
				z.difficulty[LOGIC] += 2;
				boldAlert("Logic difficulty has been increased by 2.");
			} else {
				plainAlert("You successfully avoided the increased difficulty on Artifact Scavenger Hunt.");
			}
			break;
		}
		case "Bataan Death March Dogtags":
			any = true;
			plainAlert("Each Agent may roll a Warehouse die and draw that many Stress to allow any other Agent to draw two Traits.");
			break;
		case "Ben Franklin's Lightning Rod":
			any = true;
			plainAlert("Each Agent can draw one Stress to set a neutralized die to any 1-clue facing and apply it.");
			break;
		case "Loew Ben Bezalel's Amulet":
			any = true;
			plainAlert("The Agents must collectively neutralize 2 Tech dice.\nIf the Agents were Whammied, also neutralize the Wild die.");
			break;
		case "Marie Antoinette's Guillotine":
			any = true;
			plainAlert("If the Agents were Whammied, KO all Field Agents.");
			break;
		case "Marsden's Unreleased Record":
			any = true;
			plainAlert("Roll a Warehouse die.  Agents must collectively neutralize that many dice.  On a 0, the First Agent may claim a neutralized die.\nIf the Agents were Whammied, add 1 to this roll.");
			break;	
		case "Tutankhamun's Senet Set": {
			if(canTut()){
				any = true;
				plainAlert("If the Agents were Whammied, roll all claimed Logic dice and immediately apply them");
			}
			break;
		}
	}
	if(z.consequences.includes(19)){
		let alertText = "";
		if(any){
			alertText = "Then: ";
		}
		any = true;
		alertText += "Supersonic Cymbals: an Agent must neutralize a die.";
		plainAlert(alertText);
	} else if (z.consequences.includes(20)){
		let alertText = "";
		if(any){
			alertText = "Then: ";
		}
		any = true;
		alertText += "The Phoenix: wound an Agent.  That Agent chooses another Agent to take the wound instead.";
		plainAlert(alertText);
	}
	let jinks = false;
	let claudia = false;
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(z.players[j] === "Jinks" && j !== z.traitor && z.OPSavailable[j] && z.dice[NEUTRALIZED].length > 0){
			jinks = true;
		} else if(z.players[j] === "Claudia" && j !== z.traitor && z.OPSavailable[j]){
			for(let k = 0; !(k>=z.dice[CLAIMED+j].length); k++){
				if(z.dice[CLAIMED+j][k].type === TECH){
					claudia = true;
					break;
				}
			}
		}
	}
	let alertText = "";
	if(any){
		alertText = "Then: ";
	}
	if(claudia && jinks){
		alertText += "Jinks and Claudia may each use their OPS abilities.";
	} else if(claudia){
		alertText += "Claudia may use her OPS ability.";
	} else if(jinks){
		alertText += "Jinks may use his OPS ability.";
	}
	if(jinks || claudia){
		plainAlert(alertText);
		any = true;
	}
	if(z.dice[BRONZED].length > 0){
		let alertText = "";
		if(any){
			alertText = "Then: ";
		}
		any = true;
		alertText += "Roll and immediately apply all Bronzed dice.";
		plainAlert(alertText);
	}
	if(z.bronzed >=0 && z.dice[CLAIMED+z.bronzed] > 0){
		let alertText = "";
		if(any){
			alertText = "Then: ";
		}
		any = true;
		alertText += "Roll and immediately apply all dice held by "+z.players[z.bronzed]+".";
		plainAlert(alertText);
	}
	if(!any){
		plainAlert("There are no Before Retrieval effects, so we proceed to the Retrieval Phase proper.");
		z.beforeRetrieval = false;
		z.retrievalPhase = true;
	} else {
		plainAlert("Once you're done with all Before Retrieval effects, select \"We're done with Before Retrieval\" to continue to the Retrieval Phase proper.");
	}
	gameState();
}

function cleanup2(){
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(j !== z.traitor && !z.finale){
			z.OPEavailable[j] = true;
		}
	}
	z.firstAgent = (z.firstAgent + 1) % z.numPlayers;
	if(z.firstAgent === z.traitor){
		z.firstAgent = (z.firstAgent + 1) % z.numPlayers;
	}
	boldAlert("The First Agent is now "+z.players[z.firstAgent]+".");
	if(z.lostArtifacts.length === 3 && !z.finale){
		boldAlert("The Finale begins!");
		z.finale = true;
		z.plotHand = null;
		if(z.traitor === -1){
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(z.loyalty[j] === TRAITOR){
					z.traitor = j;
					break;
				}
			}
			boldAlert(z.players[z.traitor]+" reveals as the Traitor!");
			z.location[z.traitor] = "Lost Artifacts";
			boldAlert(z.players[z.traitor] + " is the Traitor!");
			if(z.dice[CLAIMED+z.traitor].length > 0 || z.dice[REVEALED+z.traitor].length > 0){
				plainAlert("All their dice are placed in the Bronze Sector.");
			}
			while(z.dice[CLAIMED+z.traitor].length > 0){
				z.dice[BRONZED].push(z.dice[CLAIMED+z.traitor].pop());
			}
			while(z.dice[REVEALED+z.traitor].length > 0){
				z.dice[REVEALED+z.traitor][0].face = -1;
				z.dice[BRONZED].push(z.dice[REVEALED+z.traitor].shift());
			}
			if(z.traitHands[z.traitor].length > 0){
				let alertText = z.players[z.traitor] + " returns all their Traits and stress to the game box:";
				shuffle(z.traitHands[z.traitor]);
				while(z.traitHands[z.traitor].length > 0){
					let card = z.traitHands[z.traitor].pop();
					alertText += "\n"+traitColored(card);
				}
				plainAlert(alertText);
			}
			z.OPEavailable[z.traitor] = false;
			z.OPSavailable[z.traitor] = false;
			drawTrait(z.traitor,TRAITOR);
			drawTrait(z.traitor,TRAITOR);
			if(z.firstAgent === z.traitor){
				z.firstAgent = (z.firstAgent + 1) % z.numPlayers;
				boldAlert("The First Agent is now "+z.players[z.firstAgent]+".");
			}
		}
	}
	
	if(z.finale){
		plainAlert(z.players[z.traitor]+" must choose the next Plot.");
	} else {
		z.episode++;
		revealPing();
	}
}

function printDie(v,player){
	if(player === undefined){
		player = me;
	}
	let text = "";
	switch(v[0]){
		case LOCKED:
			text += z.dice[v[0]][v[1]].typeColored() + " [Locked]";
			break;
		case NEUTRALIZED:
			text += z.dice[v[0]][v[1]].typeColored() + " [Neutralized]";
			break;
		case BRONZED:
			text += z.dice[v[0]][v[1]].typeColored() + " [Bronzed]";
			break;
		case RESERVES:
			text += z.dice[v[0]][v[1]].typeColored() + " [Reserves]";
			break;
		case LEADS:
			text += z.dice[v[0]][v[1]].faceColored() + " [Lead]";
			break;
		case FIELD_CLUES:
			text += z.dice[v[0]][v[1]].faceColored() + " [Field Clue]";
			break;
		case APPLIED:
			text += z.dice[v[0]][v[1]].faceColored() + " [Applied]";
			break;
		case REVEALED:
		case REVEALED+1:
		case REVEALED+2:
		case REVEALED+3:
		case REVEALED+4:
			text += z.dice[v[0]][v[1]].faceColored() + " [Revealed by "+z.players[v[0]-REVEALED]+"]";
			break;
		case CLAIMED:
		case CLAIMED+1:
		case CLAIMED+2:
		case CLAIMED+3:
		case CLAIMED+4:
			if(player === v[0] - CLAIMED){
				text += z.dice[v[0]][v[1]].faceColored() + " [Claimed by "+z.players[v[0]-CLAIMED]+"]";
			} else {
				text += z.dice[v[0]][v[1]].typeColored() + " [Claimed by "+z.players[v[0]-CLAIMED]+"]";
			}
			break;
	}
	return text;
}

function printDice(selection,player){
	if(player === undefined){
		player = me;
	}
	let text = "";
	selection.forEach((v,j)=>{
		text += "\n"+(j+1)+": "+printDie(v,player);		
	});
	return text;
}


function anyMisapplied(){
	for(let j = 0; !(j>=z.dice[APPLIED].length); j++){
		if(isMisapplied(j)){
			return true;
		}
	}
	return false;
}

function isMisapplied(j){
	if(z.dice[APPLIED][j].number() === 0){
		return true;
	}
	let type = z.dice[APPLIED][j].appliedAs;
	let strengths = appliedStrengths();
	if(z.dice[APPLIED][j].number() === 1 && strengths[type] > z.difficulty[type]){
		return true;
	}
	if(z.dice[APPLIED][j].number() === 2 && strengths[type] > z.difficulty[type]+1){
		return true;
	}
}

function characterPresent(name){
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(z.players[j] === name && j !== z.traitor){
			return true;
		}
	}
	return false;
}

function getCharacterNum(name){
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(z.players[j] === name){
			return j;
		}
	}
	return -1;
}

function canReroll(){
	if(z.retrievalPhase && artifactNames[z.artifact] === "Jubilee Grand Poker Chip" && anyMisapplied()){
		return true;
	}
	if(z.retrievalPhase && artifactNames[z.artifact] === "Telegraph from Oman" && z.dice[REVEALED+z.firstAgent].length > 0){
		return true;
	}
	if(z.retrievalPhase && z.players[me] === "Artie" && z.OPEavailable[me]){
		for(let j = 0; !(j>=z.dice[APPLIED].length); j++){
			if(z.dice[APPLIED][j].type === LORE && isMisapplied(j)){
				return true;
			}
		}
	}
	if(z.retrievalPhase && z.players[me] === "Artie" && z.OPSavailable[me] && anyMisapplied()){
		return true;
	}
	if(z.retrievalPhase && z.players[me] === "Myka" && z.OPEavailable[me]){
		for(let j = 0; !(j>=z.dice[APPLIED].length); j++){
			if(z.dice[APPLIED][j].appliedAs === LOGIC && isMisapplied(j)){
				return true;
			}
		}
	}
	if(z.retrievalPhase && ((z.traitDiscards[LORE].length > 0 && traitText(z.traitDiscards[LORE][0]) === "Warehouse Card File") || (z.players[me] === "Artie" && traitText(z.travelBag) === "Warehouse Card File")) && 
	   anyMisapplied()){
		return true;
	}
	if(((z.traitDiscards[INTUITION].length > 0 && traitText(z.traitDiscards[INTUITION][0]) === "Premonition") || (z.players[me] === "Artie" && traitText(z.travelBag) === "Premonition")) && 
	   (z.dice[LEADS].length > 0 || (z.location[me] === "Field" && z.dice[FIELD_CLUES].length > 0))){
		return true;
	}
	if(((z.traitDiscards[INTUITION].length > 0 && traitText(z.traitDiscards[INTUITION][0]) === "Spectroscope") || (z.players[me] === "Artie" && traitText(z.travelBag) === "Spectroscope")) && 
	   (z.dice[LEADS].length > 0 || (z.location[me] === "Field" && z.dice[FIELD_CLUES].length > 0))){
		return true;
	}
	return false;
}

function canChange(){
	if(z.retrievalPhase && artifactNames[z.artifact] === "Telegraph from Oman" && z.dice[REVEALED+z.firstAgent].length > 0){
		return true;
	}
	if(z.retrievalPhase && artifactNames[z.artifact] === "William Tell's Crossbow"){
		if(me !== z.traitor && z.dice[REVEALED+me].length > 0){
			return true;
		}
	}
	if(z.retrievalPhase && artifactNames[z.artifact] === "Alessandro Volta's Lab Coat"){
		for(let j = 0; !(j>=z.numPlayers); j++){
			if(j === z.traitor){
				continue;
			}
			for(let k = 0; !(k>=z.dice[REVEALED+j].length); k++){
				if(z.dice[REVEALED+j][k].number() === 0){
					return true;
				}
			}
		}
	}
	if(z.retrievalPhase && artifactNames[z.artifact] === "Lucrezia Borgia's Comb"){
		for(let j = 0; !(j>=z.numPlayers); j++){
			if(j === z.traitor){
				continue;
			}
			for(let k = 0; !(k>=z.dice[REVEALED+j].length); k++){
				if(z.dice[REVEALED+j][k].number() === 2){
					return true;
				}
			}
		}
		for(let k = 0; !(k>=z.dice[APPLIED].length); k++){
			if(z.dice[APPLIED][k].number() === 2){
				return true;
			}
		}
	}
	if(((traitText(z.travelBag) === "Camaraderie" && z.players[me] === "Artie") || (z.traitDiscards[INTUITION].length > 0 && traitText(z.traitDiscards[INTUITION][0]) === "Camaraderie")) && 
	   (z.dice[LEADS].length > 0 || (z.location[me] === "Field" && z.dice[FIELD_CLUES].length > 0))){
		return true;
	}
	if(z.traitDiscards[TRAITOR].length > 0 && traitText(z.traitDiscards[TRAITOR][0]) === "All Tied Up" && (z.dice[LEADS].length > 0 || z.dice[FIELD_CLUES].length > 0)){
		return true;
	}
	return false;
}

function sortDice(){
	z.dice[LOCKED].sort((firstEl,secondEl)=>{
		return firstEl.type - secondEl.type;
	});
	z.dice[NEUTRALIZED].sort((firstEl,secondEl)=>{
		return firstEl.type - secondEl.type;
	});
	z.dice[BRONZED].sort((firstEl,secondEl)=>{
		return firstEl.type - secondEl.type;
	});
	z.dice[RESERVES].sort((firstEl,secondEl)=>{
		return firstEl.type - secondEl.type;
	});
	z.dice[LEADS].sort((firstEl,secondEl)=>{
		if(firstEl.clue() > secondEl.clue()){
			return 1;
		} else if(secondEl.clue() > firstEl.clue()) {
			return -1;
		} else if(firstEl.number() > secondEl.number()){
			return 1;
		} else if(secondEl.number() > firstEl.number()){
			return -1;
		} else if(firstEl.type > secondEl.type){
			return 1;
		} else if(secondEl.type > firstEl.type) {
			return -1;
		} else {
			return 0;
		}
	});
	z.dice[FIELD_CLUES].sort((firstEl,secondEl)=>{
		if(firstEl.clue() > secondEl.clue()){
			return 1;
		} else if(secondEl.clue() > firstEl.clue()) {
			return -1;
		} else if(firstEl.number() > secondEl.number()){
			return 1;
		} else if(secondEl.number() > firstEl.number()){
			return -1;
		} else if(firstEl.type > secondEl.type){
			return 1;
		} else if(secondEl.type > firstEl.type) {
			return -1;
		} else {
			return 0;
		}
	});
	z.dice[APPLIED].sort((firstEl,secondEl)=>{
		if(firstEl.appliedAs > secondEl.appliedAs){
			return 1;
		} else if(secondEl.appliedAs > firstEl.appliedAs) {
			return -1;
		} else if(firstEl.number() > secondEl.number()){
			return 1;
		} else if(secondEl.number() > firstEl.number()){
			return -1;
		} else if(firstEl.type > secondEl.type){
			return 1;
		} else if(secondEl.type > firstEl.type) {
			return -1;
		} else {
			return 0;
		}
	});
	for(let j = 0; !(j>=z.numPlayers); j++){
		z.dice[CLAIMED+j].sort((firstEl,secondEl)=>{
			if(firstEl.clue() > secondEl.clue()){
				return 1;
			} else if(secondEl.clue() > firstEl.clue()) {
				return -1;
			} else if(firstEl.number() > secondEl.number()){
				return 1;
			} else if(secondEl.number() > firstEl.number()){
				return -1;
			} else if(firstEl.type > secondEl.type){
				return 1;
			} else if(secondEl.type > firstEl.type) {
				return -1;
			} else {
				return 0;
			}
		});
		z.dice[REVEALED+j].sort((firstEl,secondEl)=>{
			if(firstEl.appliedAs > secondEl.appliedAs){
				return 1;
			} else if(secondEl.appliedAs > firstEl.appliedAs) {
				return -1;
			} else if(firstEl.number() > secondEl.number()){
				return 1;
			} else if(secondEl.number() > firstEl.number()){
				return -1;
			} else if(firstEl.type > secondEl.type){
				return 1;
			} else if(secondEl.type > firstEl.type) {
				return -1;
			} else {
				return 0;
			}
		});
	}
	/* TODO: this. now. */
}



function revealArtifact(){
	z.artifactRevealed = true;
	z.artifact = z.artifacts.pop();
	z.revealedConsequence = z.consequenceDeck.pop();
	z.difficulty = artifactDifficulties[z.artifact];
	boldAlert("The Artifact is revealed to be "+artifactNames[z.artifact]+".");
	boldAlert("The Consequence for losing this artifact is: "+consequenceNames[z.revealedConsequence]);
}

function canTurnOffCaretaker(){
	if(!z.theCaretaker){
		return false;
	}
	for(let j = 0; !(j>=z.numPlayers); j++){
		for(let k = 0; !(k>=z.dice[CLAIMED+j].length); k++){
			if(z.dice[CLAIMED+j][k].face !== -1){
				return false;
			}
		}
	}
	return true;
}

function clearBackground() {
	hideElement(alertifyBackground);
}

function gameState(){
	let state = "[q="+'"SIS: Game State"]';
	if(z.finale){
		state += size(bold(italics("Finale, Plot "+(z.successfulPlots.length + z.stoppedPlots.length+1))),14);
		if(z.retrievalPhase){
			state += "\n"+size(bold(italics("Stop the Plot Phase")),14);
		} else if (z.beforeRetrieval){
			state += "\n"+size(bold(italics("Before Stop the Plot")),14);
		} else if (z.cleanupPause){
			state += "\n"+size(bold(italics("Cleanup Phase")),14);
		}
	} else {
		let episodeText = "Episode "+z.episode+", ";
		if(z.beforeRetrieval){
			episodeText += "Before Retrieval";
		} else if(z.retrievalPhase){
			episodeText += "Retrieval Phase";
		} else if(z.cleanupPause){
			episodeText += "Cleanup Phase";
		} else {
			episodeText += "Investigation Phase";
		}
		state += size(bold(italics(episodeText)),14);
	}
	if(!z.finale){
		state += "\n"+bold("Ping: "+pingNames[z.ping]);
	}
	if(z.artifactRevealed){
		if(z.episode === 3){
			state += "\n"+bold(size(colorText("purple",artifactNames[z.artifact])+" - "+
							   colorText("blue",z.difficulty[0])+"-"+colorText("red",z.difficulty[1])+"-"+colorText("orange",z.difficulty[2])+"-"+colorText("green",z.difficulty[3])+" (C) W!",12));
			state += "\n"+bold("Consequence: "+consequenceNames[z.artifact-14]);
			
		} else if(onlyWhammy(z.artifact)){
			state += "\n"+bold(size(artifactNames[z.artifact]+" - "+
							   colorText("blue",z.difficulty[0])+"-"+colorText("red",z.difficulty[1])+"-"+colorText("orange",z.difficulty[2])+"-"+colorText("green",z.difficulty[3])+" (-) W!",12));
		} else if(hasWhammy(z.artifact)){
			state += "\n"+bold(size(artifactNames[z.artifact]+" - "+
							   colorText("blue",z.difficulty[0])+"-"+colorText("red",z.difficulty[1])+"-"+colorText("orange",z.difficulty[2])+"-"+colorText("green",z.difficulty[3])+" W!",12));
		} else {
			state += "\n"+bold(size(artifactNames[z.artifact]+" - "+
							   colorText("blue",z.difficulty[0])+"-"+colorText("red",z.difficulty[1])+"-"+colorText("orange",z.difficulty[2])+"-"+colorText("green",z.difficulty[3]),12));
		}
		if(!z.finale){
			state += "\n"+bold("Consequence: "+consequenceNames[z.revealedConsequence]);
		}
	}
	state += "\n";
	if(z.dice[RESERVES].length > 0){
		let reserveText = bold("Reserves:");
		for(let j = 0; !(j>=5); j++){
			reserveText += "\n";
			let first = true;
			for(let k = 0; !(k>=z.dice[RESERVES].length); k++){
				if(z.dice[RESERVES][k].type === j){
					if(first){
						first = false;
					} else {
						reserveText += ", ";
					}
					reserveText += z.dice[RESERVES][k].faceColored();
				}
			}
		}
		state += floatleft(reserveText);
	}
	if(z.dice[LEADS].length > 0){
		let reserveText = bold("Leads:");
		for(let j = 0; !(j>=5); j++){
			reserveText += "\n";
			let first = true;
			for(let k = 0; !(k>=z.dice[LEADS].length); k++){
				if(z.dice[LEADS][k].clue() === j){
					if(first){
						first = false;
					} else {
						reserveText += ", ";
					}
					reserveText += z.dice[LEADS][k].faceColored();
				}
			}
		}
		state += floatleft(reserveText);
	} else if (!z.beforeRetrieval && !z.retrievalPhase && !z.cleanupPause && !z.finale){
		state += floatleft(bold("Leads:")+"\n(none)");
	}
	if(z.dice[FIELD_CLUES].length > 0){
		let reserveText = bold("Field Clues:");
		for(let j = 0; !(j>=5); j++){
			reserveText += "\n";
			let first = true;
			for(let k = 0; !(k>=z.dice[FIELD_CLUES].length); k++){
				if(z.dice[FIELD_CLUES][k].clue() === j){
					if(first){
						first = false;
					} else {
						reserveText += ", ";
					}
					reserveText += z.dice[FIELD_CLUES][k].faceColored();
				}
			}
		}
		state += floatleft(reserveText);
	} else if (!z.beforeRetrieval && !z.retrievalPhase && !z.cleanupPause && !z.finale){
		state += floatleft(bold("Field Clues:")+"\n(none)");
	}
	if(z.beforeRetrieval || z.retrievalPhase){
		let reserveText = bold("Applied:");
		let strengths = appliedStrengths();
		for(let j = 0; !(j>=4); j++){
			reserveText += "\n"+colorText(colorFromCode(j),strengths[j]+"/"+z.difficulty[j])+": ";
			let first = true;
			for(let k = 0; !(k>=z.dice[APPLIED].length); k++){
				if(z.dice[APPLIED][k].appliedAs === j){
					if(first){
						first = false;
					} else {
						reserveText += ", ";
					}
					reserveText += z.dice[APPLIED][k].faceColored(true);
					if(isMisapplied(k)){
						reserveText += "*";
					}
				}
			}
		}
		state += floatleft(reserveText);
	}
	if(z.dice[BRONZED].length > 0){
		let reserveText = bold(colorText("tan","Bronzed:"));
		for(let j = 0; !(j>=5); j++){
			reserveText += "\n";
			let first = true;
			for(let k = 0; !(k>=z.dice[BRONZED].length); k++){
				if(z.dice[BRONZED][k].type === j){
					if(first){
						first = false;
					} else {
						reserveText += ", ";
					}
					reserveText += z.dice[BRONZED][k].faceColored();
				}
			}
		}
		state += floatleft(reserveText);
	}
	if(z.dice[NEUTRALIZED].length > 0){
		let reserveText = bold(colorText("purple","Neutralized:"));
		for(let j = 0; !(j>=5); j++){
			reserveText += "\n";
			let first = true;
			for(let k = 0; !(k>=z.dice[NEUTRALIZED].length); k++){
				if(z.dice[NEUTRALIZED][k].type === j){
					if(first){
						first = false;
					} else {
						reserveText += ", ";
					}
					reserveText += italics(z.dice[NEUTRALIZED][k].faceColored());
				}
			}
		}
		state += floatleft(reserveText);
	}
	if(z.dice[LOCKED].length > 0){
		let reserveText = bold(colorText("brown","Locked:"));
		for(let j = 0; !(j>=5); j++){
			reserveText += "\n";
			let first = true;
			for(let k = 0; !(k>=z.dice[LOCKED].length); k++){
				if(z.dice[LOCKED][k].type === j){
					if(first){
						first = false;
					} else {
						reserveText += ", ";
					}
					reserveText += italics(z.dice[LOCKED][k].faceColored());
				}
			}
		}
		state += floatleft(reserveText);
	}
	state += clear();
	if(anyMisapplied()){
		state += "*Misapplied\n\n";
	}
	for(let j2 = 0; !(j2>=z.numPlayers); j2++){
		let j = (j2 + z.firstAgent) % z.numPlayers;
		if(j === z.traitor){
			continue;
		}
		if(j2 !== 0){
			state += "\n";
		}
		
		if(j === z.firstAgent){
			state += bold(colorText("teal","First Agent "));
		} 
		state += bold(z.players[j]);
		state += " ([us"+"er="+z.usernames[j]+"]"+z.usernames[j]+"[/us"+"er])";
		state += " ("+z.location[j]+")";
		if(z.wounded[j]){
			state += colorText("red"," (wounded)");
		} else if(z.KOd[j]){
			state += colorText("red"," (KO'd)");
		}
		if(z.bronzed[j]){
			state += colorText("tan"," (bronzed)");
		}
		if(z.OPEavailable[j]){
			state += " (OPE)";
		}
		if(z.OPSavailable[j]){
			state += " (OPS)";
		}
		if(z.traitHands[j].length === 1){
			state += "\n1 Trait";
		} else {
			state += "\n"+z.traitHands[j].length+" Traits";
		}
		if(z.players[j] === "Artie" && z.travelBag !== null){
			state += " (plus "+traitColored(z.travelBag)+" in Travel Bag)";
		}
		if(z.dice[CLAIMED+j].length > 0){
			state += "\nClaimed: ";
			let first = true;
			let covered = false;
			for(let k = 0; !(k>=z.dice[CLAIMED+j].length); k++){
				if(first){
					first = false;
				} else {
					state += ", ";
				}
				state += z.dice[CLAIMED+j][k].typeColored();
				if(z.dice[CLAIMED+j][k].covered){
					covered = true;
				}
			}
			if(covered){
				state += " (ready)"; /* TODO: fix for caretaker */
			}
		}
		if(z.dice[REVEALED+j].length > 0){
			state += "\nRevealed: ";
			let first = true;
			for(let k = 0; !(k>=z.dice[REVEALED+j].length); k++){
				if(first){
					first = false;
				} else {
					state += ", ";
				}
				state += z.dice[REVEALED+j][k].faceColored();
			}
		}	
	}
	if(z.traitor >= 0){
		state +=  "\n"+bold(colorText("brown","Traitor ")+z.players[z.traitor]);
		state += " ([us"+"er="+z.usernames[z.traitor]+"]"+z.usernames[z.traitor]+"[/us"+"er])";
		state += " ("+z.location[z.traitor]+")";
		if(z.traitHands[z.traitor].length === 1){
			state += "\n1 "+colorText("brown","Traitor")+" card";
		} else {
			state += "\n"+z.traitHands[z.traitor].length+colorText("brown"," Traitor")+" cards";
		}
		if(z.plotHand !== null){
			state += "\n1 Plot card";
		}
		if(z.dice[CLAIMED+z.traitor].length > 0){
			state += "\nClaimed: ";
			let first = true;
			let covered = false;
			for(let k = 0; !(k>=z.dice[CLAIMED+z.traitor].length); k++){
				if(first){
					first = false;
				} else {
					state += ", ";
				}
				state += z.dice[CLAIMED+z.traitor][k].typeColored();
				if(z.dice[CLAIMED+z.traitor][k].covered){
					covered = true;
				}
			}
			if(covered){
				state += " (ready)";
			}
		}
		if(z.dice[REVEALED+z.traitor].length > 0){
			state += "\nRevealed: ";
			let first = true;
			for(let k = 0; !(k>=z.dice[REVEALED+z.traitor].length); k++){
				if(first){
					first = false;
				} else {
					state += ", ";
				}
				state += z.dice[REVEALED+z.traitor][k].faceColored();
			}
		}
	}
	state += "\n";
	if(z.consequences.length > 0){
		let titleText = z.lostArtifacts.length + " Lost Artifact";
		if(z.lostArtifacts.length !== 1){
			titleText += "s";
		}
		titleText += ".  Consequences:";
		state += "\n"+bold(titleText);
		for(let j = 0; !(j>=z.consequences.length); j++){
			state += "\n"+consequenceNames[z.consequences[j]];
		}
		state += "\n";
	}
	if(!z.finale && z.retrievedArtifacts.length > 1){
		state += "\n"+bold(z.retrievedArtifacts.length + " Retrieved Artifacts")+"\n";
	} else if(!z.finale && z.retrievedArtifacts.length === 1){
		state += "\n"+bold("1 Retrieved Artifact")+"\n";
	}
	if(z.warehouseMaintenance.length > 0 || z.brokenGear){
		state += "\n"+bold("Warehouse Maintentance: ");
		let first = true;
		for(let j = 0; !(j>=z.warehouseMaintenance.length); j++){
			if(first){
				first = false;
			} else {
				state += ", ";
			}
			state += obstacleName(z.warehouseMaintenance[j]);
		}
		if(z.brokenGear){
			if(!first){
				state += ", ";
			}
			state += "(Broken Gear)";
		}
		state+="\n";
	}
	let any = false;
	if(z.immediateObstacle !== null){
		state += "\n"+bold("Immediate Obstacle: ")+obstacleName(z.immediateObstacle);
		any = true;
	}
	for(let loc in z.boardObstacles){
		state += "\n"+bold(loc)+": "+obstacleName(z.boardObstacles[loc]);
		switch(loc){
			case "Travel":
				if(!z.noTravelRing){
					state += " +1";
				}
				break;
			case "Logic":
				if(!z.noLogicRing){
					state += " +1";
				}
				break;
			case "Intuition":
				if(!z.noIntuitionRing){
					state += " +1";
				}
				break;
			case "Lore":
				if(!z.noLoreRing){
					state += " +1";
				}
				break;
			case "Tech":
				if(!z.noTechRing){
					state += " +1";
				}
				break;
		}
		any = true;
	}
	if(any){
		state += "\n";
	}
	state += "\n"+bold("Trait Piles:");
	for(let j = 0; !(j>=4); j++){
		state += "\n"+colorText(colorFromTraitCode(j),z.traitDecks[j].length+"/"+z.traitDiscards[j].length);
		if(z.traitDiscards[j].length > 0){
			state += ": "+traitColored(z.traitDiscards[j][0]);
		}
	}
	state += "\n"+colorText("gray",z.traitDecks[STRESS].length+" Stress");
	if(z.obstacleDiscards.length > 0){
		let obstacleText = "\n"+bold("Obstacle Discards: ");
		let first = true;
		for(let j = 0; !(j>=z.obstacleDiscards.length); j++){
			if(first){
				first = false;
			} else {
				obstacleText += ", ";
			}
			obstacleText += obstacleName(z.obstacleDiscards[j]);
		}
		state += size(obstacleText,8);
	}
	if(z.selfFulfillingProphecy > 0){
		state += "\n"+colorText("brown","Self-Fulfilling Prophecy")+" is in effect.";
	}
	state += "["+"/q]";
	t.value += state;
}

function rank(character){
	switch(character){
		case "Artie":
			return 10;
		case "Myka":
			return 20;
		case "Pete":
			return 30;
		case "Jinks":
			return 40;
		case "Leena":
			return 45;
		case "Claudia":
			return 50;
	}
}

function gameSetup2(){
	z.gameSetup = false;
	let artifacts = [];
	for(let j = 0; !(j>=26); j++){
		artifacts.push(j);
	}
	if(z.promos){
		artifacts.push(26);
	}
	shuffle(artifacts);
	z.artifacts = [];
	z.artifacts.push(artifacts.pop());
	z.artifacts.push(artifacts.pop());
	let adversaryArtifacts = [27,28,29,30,31,32,33,34];
	shuffle(artifacts);
	z.artifacts.push(adversaryArtifacts.pop());
	z.artifacts.push(artifacts.pop());
	z.artifacts.push(artifacts.pop());
	z.consequenceDeck = [];
	for(let j = 0; !(j>=13); j++){
		z.consequenceDeck.push(j);
	}
	shuffle(z.consequenceDeck);
	let pings = [];
	for(let j = 0; !(j>=26); j++){
		pings.push(j);
	}
	shuffle(pings);
	z.pings = [];
	for(let j = 0; !(j>=6); j++){
		z.pings.push(pings.pop());
	}
	z.episode = 1;
	z.successfulPlots = [];
	z.stoppedPlots = [];

	z.lostArtifacts = [];
	z.loyalty = [];
	z.loyalty.push(TRAITOR);
	for(let j = 0; !(j>=z.numPlayers-1); j++){
		z.loyalty.push(LOYAL);
	}
	shuffle(z.loyalty);
	z.brokenGear = false;
	z.artifactRevealed = false;
	z.retrievedArtifacts = [];
	z.boardObstacles = {};
	z.revealedConsequence = null;
	z.plots = [];
	for(let j = 35; !(j>=48); j++){
		z.plots.push(j);
	}
	shuffle(z.plots);
	z.traitDecks = [];
	for(let j = 0; !(j>=4); j++){
		z.traitDecks.push([]);
		for(let k = 20*j; !(k>=20*(j+1)-2); k++){
			z.traitDecks[j].push(k);
		}
		shuffle(z.traitDecks[j]);
	}
	z.traitDecks.push([]);
	z.traitDecks.push([]);
	for(let j = 80; !(j>=119); j++){
		z.traitDecks[TRAITOR].push(j);
	}
	shuffle(z.traitDecks[TRAITOR]);
	for(let j = 0; !(j>=5*z.numPlayers); j++){
		z.traitDecks[STRESS].push(119+j);
	}
	z.immediateObstacle = null;
	z.cleanupPause = false;
	z.plotHand = null;
	z.obstacleDiscards = [];
	z.beforeRetrieval = false;
	z.retrievalPhase = false;
	z.OPEavailable = [];
	z.OPSavailable = [];
	z.KOd = [];
	z.wounded = [];
	z.location = [];
	z.traitHands = [];
	z.possibleColors = [];
	for(let j = 0; !(j>=z.numPlayers); j++){
		z.OPEavailable.push(true);
		z.OPSavailable.push(true);
		z.KOd.push(false);
		z.wounded.push(false);
		z.possibleColors.push([0,0,0,0,0,0]);
		z.location.push("Warehouse");
		z.traitHands.push([]);
		switch(z.players[j]){
			case "Artie":
				plainAlert("Artie draws 1 Lore trait and 1 Tech trait.");
				z.traitHands[j].push(z.traitDecks[LORE].pop());
				z.traitHands[j].push(z.traitDecks[TECH].pop());
				break;
			case "Myka":
				plainAlert("Myka draws 1 Logic trait and 1 Lore trait.");
				z.traitHands[j].push(z.traitDecks[LOGIC].pop());
				z.traitHands[j].push(z.traitDecks[LORE].pop());
				break;
			case "Pete":
				plainAlert("Pete draws 2 Intuition traits.");
				z.traitHands[j].push(z.traitDecks[INTUITION].pop());
				z.traitHands[j].push(z.traitDecks[INTUITION].pop());
				break;
			case "Jinks":
				plainAlert("Jinks draws 1 Intuition trait and 1 Logic trait.");
				z.traitHands[j].push(z.traitDecks[INTUITION].pop());
				z.traitHands[j].push(z.traitDecks[LOGIC].pop());
				break;
			case "Leena":
				plainAlert("Leena draws 1 Intuition trait and 1 Lore trait.");
				z.traitHands[j].push(z.traitDecks[INTUITION].pop());
				z.traitHands[j].push(z.traitDecks[LORE].pop());
				break;
			case "Claudia":
				plainAlert("Claudia draws 1 Tech trait and 1 Logic trait.");
				z.traitHands[j].push(z.traitDecks[TECH].pop());
				z.traitHands[j].push(z.traitDecks[LOGIC].pop());
				break;
		}
	}
	z.traitDecks[LOGIC].push(18);
	z.traitDecks[LOGIC].push(19);
	shuffle(z.traitDecks[LOGIC]);
	z.traitDecks[INTUITION].push(38);
	z.traitDecks[INTUITION].push(39);
	shuffle(z.traitDecks[INTUITION]);
	z.traitDecks[LORE].push(58);
	z.traitDecks[LORE].push(59);
	shuffle(z.traitDecks[LORE]);
	z.traitDecks[TECH].push(78);
	z.traitDecks[TECH].push(79);
	shuffle(z.traitDecks[TECH]);
	z.warehouseMaintenance = [];
	z.theCaretaker = false;
	z.consequences = [];
	z.obstacles = [];
	for(let j = 0; !(j>=18); j++){
		z.obstacles.push(j);
	}
	shuffle(z.obstacles);
	shuffle(z.consequences);
	let highestRank = 100;
	z.firstAgent = 0;
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(highestRank > rank(z.players[j])){
			highestRank = rank(z.players[j]);
			z.firstAgent = j;
		}
	}
	boldAlert(z.players[z.firstAgent]+" is "+colorText("teal","First Agent")+".");
	z.finale = false;
	z.difficulty = [0,0,0,0];
	z.travelBag = null;
	z.artifact = null;
	z.bronzed = -1;
	z.traitDiscards = [ [],[],[],[],[],[]];
	z.traitor = -1;
	z.dice = [];
	for(let j = 0; !(j>=REVEALED+5); j++){
		z.dice.push([]);
	}
	z.dice[RESERVES].push(new Die(LOGIC));
	z.dice[RESERVES].push(new Die(LOGIC));
	z.dice[RESERVES].push(new Die(LOGIC));
	z.dice[RESERVES].push(new Die(INTUITION));
	z.dice[RESERVES].push(new Die(INTUITION));
	z.dice[RESERVES].push(new Die(INTUITION));
	z.dice[RESERVES].push(new Die(LORE));
	z.dice[RESERVES].push(new Die(LORE));
	z.dice[RESERVES].push(new Die(LORE));
	z.dice[RESERVES].push(new Die(TECH));
	z.dice[RESERVES].push(new Die(TECH));
	z.dice[RESERVES].push(new Die(TECH));
	z.dice[RESERVES].push(new Die(WILD));
	revealPing();
	saveAndQuit();
}

function gameSetup() {
	z.gameSetup = true;
	z.usernames = [];
	z.promptStyle = [];
	z.seed = Math.floor(Math.random() * mLCG);
	promptNum("How many players? (3-5)",(a)=>3>a||a>5,clearBackground,(a)=>{
		z.numPlayers = a;
		confirmify("Use Promos?",()=>{
			z.promos = false;
			promptUsernames(1);
		},()=>{
			z.promos = true;
			promptUsernames(1);
		});
	});
}

function promptUsernames(j) {
	if(j > z.numPlayers) {
		shuffle(z.usernames);
		finishSetup();
	} else {
		promptString("Enter the BGG username of a player (" + j + "/" + z.numPlayers + ").\nPlayer order will be randomized before character selection.",
			clearBackground, (prompted) => {
				z.usernames.push(prompted);
				z.promptStyle.push(1);
				promptUsernames(j + 1);
			});
	}
}


function finishSetup() {
	t.value = t.value + bold(size("Salinger Inventory Scanner Setup", 14)) + "\r\n\r\n";
	t.value += bold("Game Options:");
	t.value += "\r\n" + z.numPlayers + " Player";
	if(z.numPlayers > 1) {
		t.value += "s";
	}
	if(z.promos){
		t.value += "\nPromos included";
	}
	t.value += "\n\n"+bold("Players") + " (in randomized turn order)";
	for(let j = 0; !(j >= z.numPlayers); j++) {
		t.value += "\r\n" + (j + 1) + ": [us" + "er=" + z.usernames[j] + "]" + z.usernames[j] + "[/" + "user]";
	}
	t.value += "\r\n\r\n";
	t.value += bold(z.usernames[0] + " is up first for character selection.") + " They should quote this post to proceed.\n\nHave fun out there!";
	z.players = [];
	z.banners = [];
	let splitted = window.btoa(JSON.stringify(z)).match(/.{1,20}/g);
	let text = "";
	while(splitted.length > 0) {
		text += splitted.shift() + "-";
	}
	let re = new RegExp("(\\[c\\])?\\[size=(1|0)\\]\\[color=#(F4F4FF|FFFFFF)\\](New|SIS) seed: \\S+\\[/color\\]\\[/size\\](\\[/c\\])?", "g");
	t.value = t.value.replace(re, "") + code(size(invisible("SIS seed: " + text), 1));
	try{
		let evt = new Event('input', {
			bubbles: true,
			cancelable: true,
		});
		t.dispatchEvent(evt);
	} catch(err){}
	clearBackground();
}

var reGlobal = new RegExp(/\[size=(1|0)\]\[color=#(F4F4FF|FFFFFF)\](New|SIS) seed: \S+\[\/color\]\[\/size\]/, "g");
if(t === undefined) {
	alert("SIS only works while creating or editing a post on the BGG forums.");
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
		
				
		z.usernames.forEach((username,j)=>{
			if(username.toLowerCase() === myUsername.toLowerCase()) {
				me = j;
			}
		});
		if(me === -1) {
			
			addAlert(
				"You are not recognized as a player in this game!\nProceed only if you believe this to be in error, or you are replacing a player who resigned or disappeared."
				);
			let promptText = "What player number are you? (1-" + (z.numPlayers) +
				")\nProceed only if you know you are a player in the game (e.g. your username was misspelled, or you are replacing a player who resigned or disappeared).";
			z.players.forEach((player,j)=>{
				promptText += "\n" + (j + 1) + ": " + player;
			});
			promptNum(promptText, (a) => 1 > a || a > z.numPlayers, clearBackground, (prompted) => {
				me = prompted - 1;
				if(z.gameSetup && me > z.players.length) {
					addAlert("It is not yet your turn to pick a character.");
					clearBackground();
				} else if(z.gameSetup && z.players.length > me) {
					addAlert("Please wait for character selection to conclude.");
					clearBackground();
				} else if(z.gameSetup) {
					pickCharacter();
				} else {
					for(let j = 0; !(j>=z.dice.length); j++){
						for(let k = 0; !(k>=z.dice[j].length); k++){
							z.dice[j][k] = deserializeDie(z.dice[j][k]);
						}
					}
					t.value += colorText("red", bold("This post did not process properly.  Please try again."));
					mainMenu();
				}
			});
			
		} else if(z.gameSetup && me > z.players.length) {
			addAlert("It is not yet your turn to pick a character.");
			clearBackground();
		} else if(z.gameSetup && z.players.length > me) {
			addAlert("Please wait for character selection to conclude.");
			clearBackground();
		} else if(z.gameSetup) {
			pickCharacter();
		} else {
			for(let j = 0; !(j>=z.dice.length); j++){
				for(let k = 0; !(k>=z.dice[j].length); k++){
					z.dice[j][k] = deserializeDie(z.dice[j][k]);
				}
			}
			t.value += colorText("red", bold("This post did not process properly.  Please try again."));
			mainMenu();
		}
	}
}

function pickCharacter(){
	let selection = [];
	if(!z.players.includes("Artie")){
		selection.push("Artie");
	}
	if(!z.players.includes("Myka")){
		selection.push("Myka");
	}
	if(!z.players.includes("Pete")){
		selection.push("Pete");
	}
	if(!z.players.includes("Jinks")){
		selection.push("Jinks");
	}
	if(!z.players.includes("Leena") && z.promos){
		selection.push("Leena");
	}
	if(!z.players.includes("Claudia")){
		selection.push("Claudia");
	}
	let promptText = "Which character would you like to play as? (1-"+selection.length+")"+printSelection(selection);
	promptSelection(promptText,selection,(a)=>{
		boldAlert(z.usernames[me]+" selects "+selection[a-1]+".");
		z.players.push(selection[a-1]);
		switch(selection[a-1]){
			case "Artie":
				z.banners.push(5359208);
				break;
			case "Myka":
				z.banners.push(5359210);
				break;
			case "Pete":
				z.banners.push(5359212);
				break;
			case "Jinks":
				z.banners.push(5359214);
				break;
			case "Leena":
				z.banners.push(5359215);
				break;
			case "Claudia":
				z.banners.push(5359217);
				break;
		}
		if(z.players.length === z.numPlayers){
			gameSetup2();
		} else {
			boldAlert(z.usernames[me+1]+" is up next for character selection.");
			saveAndQuit();
		}
	});
}

function postSeed() {
	let re = new RegExp(/(\[c\])?\[size=(1|0)\]\[color=#(F4F4FF|FFFFFF)\](New|SIS) seed: (\S+)\[\/color\]\[\/size\](\[\/c\])?/, "g");
	let seed2 = re.exec(t.value);
	if(seed2 !== null) {
		seed2 = seed2[5];
		seed2 = window.atob(seed2.replace(/-/g, ""));
	}
	if(seed2 !== seed) {
		addAlert("Possible double-post prevented; you should probably run SIS again to make sure your play processed correctly.");
		t.value += bold(colorText("red", "Possible double-post prevented; you should run SIS again to make sure your play processed correctly.")) + "\r\n";
		return;
	}
	let banner = "";
	if(0 > me || me > z.numPlayers || !z.banners[me]){
		banner = 5359283;
	} else {
		banner = z.banners[me];
	}

	let SISbanner = 5508880;
	
	let SISbannerRegExp = new RegExp("\\[ima" + bl + "geid=" + SISbanner + " medium\\]", "g");

	let bannerRegExp = new RegExp("\\[ima" + bl + "geid=" + banner + " medium\\]", "g");
	let dumbRe = new RegExp('\\[co' + 'lor=red\\]\\[b' + "\\]This post did not process properly\\.  Please try again\\.\\[/" + "b\\]\\[/co" + "lor\\]", "g");
	let clearRegExp = new RegExp("(\\[clear\\])+", "g");
	let splitted = window.btoa(JSON.stringify(z)).match(/.{1,20}/g);
	let text0 = "";
	while(splitted.length > 0) {
		text0 += splitted.shift() + "-";
	}
	t.value = "[ima" + bl + "geid=" + banner + " medium]" + clear() + code(size(invisible("SIS seed: " + text0), 1)) + clear() + t.value.replace(bannerRegExp, "")
		.replace(re, "").replace(dumbRe, "").replace(SISbannerRegExp,"").replace(clearRegExp, clear()) + "[ima" + bl + "geid=" + SISbanner + " medium]";
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


function canRevealTraitor(){
	if(z.loyalty[me] !== TRAITOR || z.traitor === me){
		return false;
	}
	if(z.bronzed !== -1 || z.lostArtifacts.includes(28) || z.lostArtifacts.includes(31)){
		return true;
	}
	if(z.location[me] !== "Field" || !z.retrievalPhase || !canRetrieveArtifact()){
		return false;
	}
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(z.location[j] === "Field" && j !== me){
			return false;
		}
	}
	return true;
	
}

function numTraits(player){
	if(player !== undefined){
		player = me;
	}
	let num = 0;
	for(let j = 0; !(j>=z.traitHands[player].length); j++){
		if(traitColor(z.traitHands[player][j]) !== STRESS){
			num++;
		}
	}
	return num;
}

function mainMenu(){
	
	let options = [];
	
	options.push("Display Game State");
	options.push("View my hand");
	if(z.finale && !z.retrievalPhase && !z.beforeRetrieval && z.artifactRevealed && !z.cleanupPause){
		options.push("Stop the Plot");
	}
	if(z.cleanupPause){
		options.push("Resume the Cleanup phase");
	}
	
	if("gooery" in z){
		options.push("[Trouble in the Gooery] Lock a die");
	}
	
	if(Array.isArray(z.votes)){
		if(z.votes[me] === -1 && me !== z.voteTarget){
			options.push("Cast my vote");
		} else if(me !== z.voteTarget) {
			options.push("Change my vote");
		}
		let ready = true;
		for(let j = 0; !(j>=z.numPlayers); j++){
			if(z.votes[j] === -1 && j !== z.voteTarget){
				ready = false;
				break;
			}
		}
		if(ready){
			options.push("Reveal votes");
		}
	}
	
	if(me === z.traitor){
		if(z.finale && !z.artifactRevealed){
			options.push("Reveal Plot");
		}
		if(z.location[me] === "Bronze Sector"){
			options.push("Move to the Lost Artifacts Board");
		}
		options.push("Draw a Traitor card");
		if(canPlayAnyTrait()){
			options.push("Play a Traitor card");
		}
		if(z.traitHands[me].length > 0){
			options.push("Discard a Traitor card");
		}
	} else if(me !== z.bronzed && me !== z.traitor) {
		options.push("Handle Traits");
	}
	
	/* TODO: this */
	options.push("Handle Clue Dice");
	
	options.push("Obstacles and Other Actions");
	
	options.push("Nefarious or Rare Options");
	

	let promptText = "What would you like to do, "+z.players[me]+"? (1-"+options.length+")"+printSelection(options);
	promptNum(promptText,(a)=>1>a||a>options.length,saveAndQuit,(a)=>{
		
		let ch = options[a-1];



/* Snags:

Bed & Breakfast (>1)
Field Research (>1)
Travel (>0)
Warehouse Research (>0)
Jack the Ripper's Lantern (all agent abilities apart from downsides)


*/


/* Effects that let you draw Traits:
Warehouse Research: Draw 2 of the same type.
Field Research: Draw 1 Focus Trait.
Draw Step: Draw 1 Focus Trait.
Chicago, IL: Draw two Traits
Geneva, Switzerland: Draw one Tech Trait.
Las Vegas, NV: Draw one Trait
Las Vegas, NV: Draw two Traits
Paris, France: Draw two Traits of any types.
Washington, D.C.: Draw two Traits of that type.
Bataan Death March Dogtags: Draw two Traits
Lucrezia Borgia's Comb: Draw one Trait


Collaborate: Draw 3 Traits of one type, give one to the player who played it, discard Calamities.
The Restricted Files: Draw from the discard pile
Milan, Italy: Draw from the discard pile
Henry Morton Stanley's Map: Draw from the discard pile
Jinks' Enlightened: Draw from the discard pile

Farnsworth transfers from one to another.
Artifact Missing? draws and discards until you hit a Calamity
*/

if(ch === "Display Game State"){
	addAlert("Game state displayed in post; quit SIS to view it.");
	gameState();
	mainMenu();
} else if(ch === "View my hand"){
	if(me === z.traitor){
		let alertText = bold(colorText("brown","Traitor")+" "+z.players[me]+", you have the following Traitor cards in hand:");
		if(z.traitHands[me].length === 0){
			alertText += "\n(none)";
		} else {
			for(let j = 0; !(j>=z.traitHands[me].length); j++){
				alertText += "\n"+traitColored(z.traitHands[me][j]);
			}
		}
		alertText += "\n";
		if(z.location[me] === "Bronze Sector"){
			alertText += "\nYou are in the Bronze Sector, and must spend your next Action to move to the Lost Artifacts board.\n";
		}
		if(z.plotHand !== null){
			alertText += "\n"+bold("You have "+artifactNames[z.plotHand]+" in your Plot hand.")+"\n";
		}
		if(z.beforeRetrieval || z.retrievalPhase){
			alertText += "\n"+bold("You have the following dice behind your screen:");
			if(z.dice[CLAIMED+me].length > 0){
				for(let j = 0; !(j>=z.dice[CLAIMED+me].length); j++){
					alertText += "\n"+z.dice[CLAIMED+me][j].faceColored();
				}
			} else {
				alertText += "\n(none)";
			}
		}
		
		addAlert(alertText);
		mainMenu();
		
	} else {
		let alertText = "";
		if(me === z.firstAgent){
			alertText = bold(colorText("teal","First Agent")+" ");
		}
		alertText += bold(z.players[me]+", you have the following Trait cards in hand:");
		if(z.traitHands[me].length === 0){
			alertText += "\n(none)";
		} else {
			for(let j = 0; !(j>=z.traitHands[me].length); j++){
				alertText += "\n"+traitColored(z.traitHands[me][j]);
			}
		}
		alertText += "\n";
		if(z.wounded[me]){
			alertText += "\nYou are wounded!\n";
		} else if (z.KOd[me]){
			alertText += "\nYou are KO'd!\n";
		}
		if(z.location[me]==="Field"){
			alertText += "\nYou are in the Field.\n";
		} else if (z.location[me] === "Warehouse"){
			alertText += "\nYou are at the Warehouse.\n";
		} else {
			alertText += "\nYou are Bronzed!\n";
		}
		alertText += "\n"+bold("You have the following dice behind your screen:");
		if(z.dice[CLAIMED+me].length > 0){
			for(let j = 0; !(j>=z.dice[CLAIMED+me].length); j++){
				alertText += "\n"+z.dice[CLAIMED+me][j].faceColored();
			}
		} else {
			alertText += "\n(none)";
		}
		alertText += "\n";
		if(z.loyalty[me] === TRAITOR){
			alertText += "\n"+bold(colorText("red","You are a Traitor."));
		} else {
			alertText += "\n"+bold("You are a Loyal Agent.");
		}
		if(z.OPEavailable[me]){
			alertText += "\n"+bold("Your OPE ability is available.");
		} else {
			alertText += "\n"+bold("Your OPE ability is NOT available.");
		}
		if(z.OPSavailable[me]){
			alertText += "\n"+bold("Your OPS ability is available.");
		} else {
			alertText += "\n"+bold("Your OPS ability is NOT available.");
		}
		addAlert(alertText);
		mainMenu();
	}
} else if (ch ==="Stop the Plot"){
	confirmify("Confirming that everyone has had a chance to take actions (including any bonus actions for the Traitor), and that you want to move on to the Stop the Plot phase.",mainMenu,()=>{
		beforeRetrieval();
		mainMenu();
	});
} else if(ch === "Draw a Traitor card"){
	confirmify("Confirming you want to draw a Traitor card.",mainMenu,()=>{
		drawTrait(me,TRAITOR);
		if(z.traitHands[me].length > 13){
			addAlert("You are over your hand limit and must discard a Traitor card.");
		}
		mainMenu();
	});
} else if (ch === "[Trouble in the Gooery] Lock a die"){
	let selection = [];
	for(let j = 1; !(j>=z.dice.length); j++){
		for(let k = 0; !(k>=z.dice[j].length); k++){
			if(z.dice[j][k].type === z.gooery){
				selection.push([j,k]);
			}
		}
	}
	let promptText = "Which die would you like to lock? (1-"+selection.length+")"+printDice(selection);
	promptSelection(promptText,selection,(a)=>{
		boldAlert(printDie(selection[a-1])+" locked.");
		z.dice[selection[a-1][0]][selection[a-1][1]].unroll();
		z.dice[LOCKED].push(z.dice[selection[a-1][0]].splice(selection[a-1][1])[0]);
		delete z.gooery;
		if(selection[a-1][0]===FIELD_CLUES && z.dice[FIELD_CLUES].length === 0){
			if(z.dice[LEADS].length === 0){
				if(!z.artifactRevealed){
					revealArtifact();
					if(hasWhammy(z.artifact)){
						boldAlert("The Agents are Whammied!");
					}
				}
				beforeRetrieval();
			} else if (!z.artifactRevealed){
				revealArtifact();
			}
		}
		if(selection[a-1][0]===LEADS && z.dice[LEADS].length === 0 && z.dice[FIELD_CLUES].length === 0){
			beforeRetrieval();
		}
		mainMenu();
	});
} else if (ch === "Handle Clue Dice"){
	let selection = [];
	if(!z.retrievalPhase && !z.beforeRetrieval){
		if(z.finale && z.dice[RESERVES].length > 0 && me !== z.traitor){
			selection.push("Take a die");
		}
		if(z.dice[LEADS].length > 0 && me !== z.bronzed && me !== z.traitor){
			selection.push("Claim a Lead");
		}
		if(z.location[me] === "Field" && z.dice[FIELD_CLUES].length > 0 && me !== z.bronzed && me !== z.traitor){
			selection.push("Claim a Field Clue");
		} else if(z.players[me] === "Claudia" && me !== z.bronzed && me !== z.traitor && z.OPEavailable[me]){
			for(let j = 0; !(j>=z.dice[FIELD_CLUES].length); j++){
				if(z.dice[FIELD_CLUES][j].type === TECH){
					selection.push("Claim a Field Clue");
					break;
				}
			}
		}
		if(z.traitDiscards[TRAITOR].length > 0 && (traitText(z.traitDiscards[TRAITOR][0]) === "Original Red Herring" || traitText(z.traitDiscards[TRAITOR][0]) === "Technical Difficulties") && z.dice[LEADS].length > 0){
			selection.push("Move a Lead to the Ping");
		}	
		
		
	}
	
	if(z.beforeRetrieval){
		if(artifactNames[z.artifact] === "Loew Ben Bezalel's Amulet"){
			selection.push("Neutralize a die");
		}
		
		if(artifactNames[z.artifact] === "Ben Franklin's Lightning Rod" && z.dice[NEUTRALIZED].length > 0 && me !== z.traitor){
			selection.push("[Ben Franklin's Lightning Rod] Apply a neutralized die");
		}
		if(canTut()){
			selection.push("[Tutankhamun's Senet Set] Roll and apply Logic dice");
		}
		if(z.dice[NEUTRALIZED].length > 0 && ((me === z.firstAgent && artifactNames[z.artifact] === "Marsden's Unreleased Record") || (z.players[me] === "Jinks" && z.OPSavailable[me]))){
			selection.push("Claim a neutralized die");
		}
		
		if(z.dice[BRONZED].length > 0){
			selection.push("Roll and apply Bronze Sector dice");
		}
		if(z.bronzed >= 0 && z.dice[CLAIMED+z.bronzed].length > 0){
			selection.push("Roll and apply the Bronzed Agent's dice");
		}
		if(canPickBronzeApplication()){
			selection.push("Choose how to apply the Wild die");
		}
		if(canItsWhatIDoes()){
			selection.push("It's What I Does");
		}
		
		selection.push("We're done with Before Retrieval");
		
	} else {
		selection.push("Neutralize a die");
		
		if(canReroll()){
			selection.push("Reroll a die");
		}
		if(canChange()){
			selection.push("Change a die's facing");
		}
	}
	
	if(z.retrievalPhase){
		for(let j = 0; !(j>=z.dice[CLAIMED+me].length); j++){
			if(z.dice[CLAIMED+me][j].face === -1){
				selection.push("Roll my dice");
				break;
			}
		}
		if(canCoverFirstDie()){
			selection.push("Cover a die");
		} else if (canCoverSecondDie() && (z.theCaretaker || (z.players[me] === "Myka" && z.OPSavailable[me]))){
			selection.push("Cover a second die");
		}
		if(canUncover()){
			selection.push("Uncover a die");
		}
		if(canReveal()){
			selection.push("Reveal all covered dice");
		}
		
		if(canZipline() && ((traitText(z.travelBag) === "Zipline") || (z.traitDiscards[TECH].length > 0 && traitText(z.traitDiscards[TECH][0]) === "Zipline"))){
			selection.push("[Zipline] Sit this round out");
		}
		if(canTakeBack()){
			selection.push("Take back a revealed die");
		}
		if(canPickApplication()){
			selection.push("Choose how a revealed die will be applied");
		}
		if(canApply()){
			selection.push("Apply all revealed dice");
		}
		if(canLieDetector()){
			selection.push("Lie Detection");
		}
		if(canThimble()){
			selection.push("Harriet Tubman's Thimble");
		}
		if(canPearl()){
			selection.push("Pearl of Wisdom");
		}
		/* turn off caretaker if everyone is ziplined */
		if(canTurnOffCaretaker()){
			selection.push("Turn off The Caretaker");
		}
	}
	let promptText = "What would you like to do? (1-"+selection.length+")"+printSelection(selection);
	promptSelection(promptText,selection,(a)=>{
		let ch = selection[a-1];
		if(ch === "Take a die"){
			let selection = [];
			for(let j = 0; !(j>=z.dice[RESERVES].length); j++){
				selection.push([RESERVES,j]);
			}
			let promptText = "Which die would you like to take? (1-"+selection.length+")\nRemember that the first two dice you take must match each of your Focus Traits."+printDice(selection);
			promptSelection(promptText,selection,(a)=>{
				boldAlert(z.players[me]+" takes "+printDie([RESERVES,selection[a-1][1]])+".");
				z.dice[CLAIMED+me].push(z.dice[RESERVES].splice(selection[a-1][1],1)[0]);
				mainMenu();
			});
		} else if (ch === "Claim a neutralized die"){
			let selection = [];
			for(let j = 0; !(j>=z.dice[NEUTRALIZED].length); j++){
				selection.push([NEUTRALIZED,j]);
			}
			let promptText = "Which neutralized die would you like to claim? (1-"+selection.length+")"+printDice(selection);
			promptSelection(promptText,selection,(a)=>{
				boldAlert(z.players[me]+" claims "+printDie([NEUTRALIZED,selection[a-1][1]])+".");
				z.dice[CLAIMED+me].push(z.dice[NEUTRALIZED].splice(selection[a-1][1],1)[0]);
				mainMenu();
			});
		} else if (ch === "Claim a Lead"){
			let selection = [];
			for(let j = 0; !(j>=z.dice[LEADS].length); j++){
				selection.push([LEADS,j]);
			}
			let promptText = "Which Lead would you like to claim? (1-"+selection.length+")"+printDice(selection);
			promptSelection(promptText,selection,(a)=>{
				boldAlert(z.players[me]+" claims "+printDie([LEADS,selection[a-1][1]])+".");
				z.dice[LEADS][selection[a-1][1]].unroll();
				z.dice[CLAIMED+me].push(z.dice[LEADS].splice(selection[a-1][1],1)[0]);
				if(z.dice[LEADS].length === 0 && z.dice[FIELD_CLUES].length === 0){
					beforeRetrieval();
				}
				mainMenu();
			});
		} else if (ch === "Claim a Field Clue"){
			let selection = [];
			for(let j = 0; !(j>=z.dice[FIELD_CLUES].length); j++){
				selection.push([FIELD_CLUES,j]);
			}
			let promptText = "Which Field Clue would you like to claim? (1-"+selection.length+")"+printDice(selection);
			promptSelection(promptText,selection,(a)=>{
				boldAlert(z.players[me]+" claims "+printDie([FIELD_CLUES,selection[a-1][1]])+".");
				z.dice[FIELD_CLUES][selection[a-1][1]].unroll();
				z.dice[CLAIMED+me].push(z.dice[FIELD_CLUES].splice(selection[a-1][1],1)[0]);
				if(z.dice[FIELD_CLUES].length === 0){
					if(z.dice[LEADS].length === 0){
						if(!z.artifactRevealed){
							revealArtifact();
							if(hasWhammy(z.artifact)){
								boldAlert("The Agents are Whammied!");
							}
						}
						beforeRetrieval();
					} else if (!z.artifactRevealed){
						revealArtifact();
					}
				}
				mainMenu();
			});
		} else if (ch === "Move a Lead to the Ping"){
			let selection = [];
			for(let j = 0; !(j>=z.dice[LEADS].length); j++){
				selection.push([LEADS,j]);
			}
			let promptText = "Which Lead would you like to move to the Ping? (1-"+selection.length+")"+printDice(selection);
			promptSelection(promptText,selection,(a)=>{
				boldAlert(z.players[me]+" moves "+printDie([LEADS,selection[a-1][1]])+" to the Ping.");
				z.dice[FIELD_CLUES].push(z.dice[LEADS].splice(selection[a-1][1],1)[0]);
				sortDice();
				mainMenu();
			});
		} else if (ch === "[Ben Franklin's Lightning Rod] Apply a neutralized die"){
			let selection = [];
			for(let j = 0; !(j>=z.dice[NEUTRALIZED].length); j++){
				selection.push([NEUTRALIZED,j]);
			}
			let promptText = "Which Neutralized die would you like to apply to Ben Franklin's Lightning Rod? (1-"+selection.length+")"+printDice(selection);
			promptSelection(promptText,selection,(a)=>{
				promptNum("How would you like to apply "+z.dice[NEUTRALIZED][selection[a-1][1]].faceColored()+"? (1-4)\n1: 1-Logic\n2: 1-Intuition\n3: 1-Lore\n4: 1-Tech",(a)=>1>a||a>4,mainMenu,(b)=>{
					let alertText = z.players[me]+" applies "+printDie([NEUTRALIZED,selection[a-1][1]])+" as ";
					z.dice[APPLIED].unshift(z.dice[NEUTRALIZED].splice(selection[a-1][1],1)[0]);
					z.dice[APPLIED][0].face = b-1;
					z.dice[APPLIED][0].appliedAs = b-1;
					alertText += z.dice[APPLIED][0].faceColored()+".";
					boldAlert(alertText);
					sortDice();
					mainMenu();
				});
			});
		} else if (ch ==="[Tutankhamun's Senet Set] Roll and apply Logic dice"){
			confirmify("Confirming you want to roll and apply all claimed Logic dice from Tutankhamun's Senet Set.",mainMenu,()=>{
				let alertText = "All claimed Logic dice are rolled and applied to Tutankhamun's Senet Set:";
				for(let j = 0; !(j>=z.numPlayers); j++){
					for(let k = 0; !(k>=z.dice[CLAIMED+j]); k++){
						if(z.dice[CLAIMED+j][k].type === LOGIC){
							z.dice[CLAIMED+j][k].roll();
							alertText += "\n"+z.dice[CLAIMED+j][k].faceColored();
							z.dice[APPLIED].push(z.dice[CLAIMED+j].splice(k,1)[0]);
							k--;
						}
					}
				}
				plainAlert(alertText);
				sortDice();
				mainMenu();
			});
		} else if (ch === "Roll and apply Bronze Sector dice"){
			confirmify("Confirming you want to roll and apply all dice in the Bronze Sector.",mainMenu,()=>{
				/* rheticus does not apply */
				let alertText = "Bronze sector dice rolled and applied:";
				let wild = false;
				while(z.dice[BRONZED].length > 0){
					z.dice[BRONZED][0].roll();
					alertText += "\n"+z.dice[BRONZED][0].faceColored();
					if(z.dice[BRONZED][0].appliedAs === WILD){
						wild = true;
						z.dice[REVEALED+z.traitor].push(z.dice[BRONZED].shift());
					} else {
						z.dice[APPLIED].push(z.dice[BRONZED].shift());
					}
				}
				if(wild){
					alertText += "\nA decision must be made on how to apply the Wild die.";
				}
				plainAlert(alertText);
				sortDice();
				mainMenu();
			});
		} else if (ch ==="Roll and apply the Bronzed Agent's dice"){
			confirmify("Confirming you want to roll and apply all dice held by "+z.players[z.bronzed]+".",mainMenu,()=>{
				/* rheticus does not apply */
				let alertText = "Bronze sector dice rolled and applied:";
				let wild = false;
				while(z.dice[CLAIMED+z.bronzed].length > 0){
					z.dice[CLAIMED+z.bronzed][0].roll();
					alertText += "\n"+z.dice[CLAIMED+z.bronzed][0].faceColored();
					if(z.dice[CLAIMED+z.bronzed][0].appliedAs === WILD){
						wild = true;
						z.dice[REVEALED+z.bronzed].push(z.dice[CLAIMED+z.bronzed].shift());
					} else {
						z.dice[APPLIED].push(z.dice[CLAIMED+z.bronzed].shift());
					}
				}
				if(wild){
					alertText += "\nA decision must be made on how to apply the Wild die.";
				}
				plainAlert(alertText);
				sortDice();
				mainMenu();
			});
		} else if (ch === "Choose how to apply the Wild die"){
			let promptText = "How would you like to apply the Wild die?\n1: Logic\n2: Intuition\n3: Lore\n4: Tech";
			promptNum(promptText,(a)=>1>a||a>4,mainMenu,(a)=>{
				for(let j = 0; !(j>=z.numPlayers); j++){
					if(z.dice[REVEALED+j].length > 0){
						z.dice[REVEALED+j][0].appliedAs = a-1;
						let alertText = z.players[me]+" applies the Wild die as ";
						switch(a){
							case 1:
								alertText += "Logic.";
								break;
							case 2:
								alertText += "Intuition.";
								break;
							case 3:
								alertText += "Lore.";
								break;
							case 4:
								alertText += "Tech.";
								break;
						}
						boldAlert(alertText);
						z.dice[APPLIED].push(z.dice[REVEALED+j].shift());
						sortDice();
						break;
					}
				}
				mainMenu();
			});
		} else if (ch === "It's What I Does"){
			let promptText = "How would you like to apply a Tech die?\n1: 1-Logic\n2: 1-Intuition\n3: 1-Lore\n4: 1-Tech";
			promptNum(promptText,(a)=>1>a||a>4,mainMenu,(a)=>{
				for(let j = 0; !(j>=z.dice[CLAIMED+me].length); j++){
					if(z.dice[CLAIMED+me][j].type === TECH){
						z.dice[CLAIMED+me][j].face = a-1;
						z.dice[CLAIMED+me][j].appliedAs = a-1;
						let alertText = "Claudia applies a Tech die as ";
						switch(a){
							case 1:
								alertText += "1-Logic";
								break;
							case 2:
								alertText += "1-Intuition";
								break;
							case 3:
								alertText += "1-Lore";
								break;
							case 4:
								alertText += "1-Tech";
								break;
						}
						alertText+=" as part of her OPS, It's What I Does.";
						boldAlert(alertText);
						addAlert("Remember to mark your OPS as used once you're done setting and applying Tech dice.");
						z.dice[APPLIED].push(z.dice[CLAIMED+me].splice(j,1)[0]);
						sortDice();
						break;
					}
				}
				mainMenu();
			});
		} else if (ch === "We're done with Before Retrieval"){
			confirmify("Confirming you're done with all Before Retrieval effects and want to move on to the Retrieval phase proper.",mainMenu,()=>{
				z.beforeRetrieval = false;
				z.retrievalPhase = true;
				boldAlert("The Retrieval Phase proper begins.");
				mainMenu();
			});
		} else if(ch === "Neutralize a die"){
			let selection = [];
			for(let j = 1; !(j>=z.dice.length); j++){
				if(j === NEUTRALIZED){
					continue;
				}
				for(let k = 0; !(k>=z.dice[j].length); k++){
					selection.push([j,k]);
				}
			}
			let promptText = "Which die would you like to neutralize? (1-"+selection.length+")"+printDice(selection);
			promptSelection(promptText,selection,(a)=>{
				boldAlert(z.players[me]+" neutralizes "+printDie(selection[a-1])+".");
				z.dice[selection[a-1][0]][selection[a-1][1]].unroll();
				z.dice[NEUTRALIZED].push(z.dice[selection[a-1][0]].splice(selection[a-1][1],1)[0]);
				if(selection[a-1][0]===FIELD_CLUES && z.dice[FIELD_CLUES].length === 0){
					if(z.dice[LEADS].length === 0){
						if(!z.artifactRevealed){
							revealArtifact();
							if(hasWhammy(z.artifact)){
								boldAlert("The Agents are Whammied!");
							}
						}
						beforeRetrieval();
					} else if (!z.artifactRevealed){
						revealArtifact();
					}
				}
				if(selection[a-1][0]===LEADS && z.dice[LEADS].length === 0 && z.dice[FIELD_CLUES].length === 0){
					beforeRetrieval();
				}
				mainMenu();
			});
		} else if(ch === "Reroll a die"){
			let selectionHash = {};
			
			if(z.retrievalPhase && artifactNames[z.artifact] === "Jubilee Grand Poker Chip" && anyMisapplied()){
				for(let j = 0; !(j>=z.dice[APPLIED].length); j++){
					if(isMisapplied(j)){
						selectionHash[APPLIED*16+j] = true;
					}
				}
			}
			if(z.retrievalPhase && artifactNames[z.artifact] === "Telegraph from Oman" && z.dice[REVEALED+z.firstAgent].length > 0){
				for(let j = 0; !(j>=z.dice[REVEALED+z.firstAgent].length); j++){
					selectionHash[(REVEALED+z.firstAgent)*16+j] = true;
				}
			}
			if(z.retrievalPhase && characterPresent("Artie") && z.OPEavailable[getCharacterNum("Artie")]){
				for(let j = 0; !(j>=z.dice[APPLIED].length); j++){
					if(z.dice[APPLIED][j].type === LORE && isMisapplied(j)){
						selectionHash[APPLIED*16+j] = true;
					}
				}
			}
			if(z.retrievalPhase && characterPresent("Artie") && z.OPSavailable[getCharacterNum("Artie")]){
				for(let j = 0; !(j>=z.dice[APPLIED].length); j++){
					if(isMisapplied(j)){
						selectionHash[APPLIED*16+j] = true;
					}
				}
			}
			if(z.retrievalPhase && characterPresent("Myka") && z.OPEavailable[getCharacterNum("Myka")]){
				for(let j = 0; !(j>=z.dice[APPLIED].length); j++){
					if(z.dice[APPLIED][j].appliedAs === LOGIC && isMisapplied(j)){
						selectionHash[APPLIED*16+j] = true;
					}
				}
			}
			if(z.retrievalPhase && ((z.players[me] === "Artie" && traitText(z.travelBag) === "Warehouse Card File") || (z.traitDiscards[LORE].length > 0 && traitText(z.traitDiscards[LORE][0]) === "Warehouse Card File"))){
				for(let j = 0; !(j>=z.dice[APPLIED].length); j++){
					if(isMisapplied(j)){
						selectionHash[APPLIED*16+j] = true;
					}
				}
			}
			if((z.traitDiscards[INTUITION].length > 0 && (traitText(z.traitDiscards[INTUITION][0]) === "Premonition" || traitText(z.traitDiscards[INTUITION][0]) === "Spectroscope")) || 
			   (z.players[me] === "Artie" && (traitText(z.travelBag) === "Premonition" || traitText(z.travelBag) === "Spectroscope"))){
				for(let j = 0; !(j>=z.dice[LEADS].length); j++){
					selectionHash[LEADS*16+j] = true;
				}
				if(z.location[me] === "Field"){
					for(let j = 0; !(j>=z.dice[FIELD_CLUES].length); j++){
						selectionHash[FIELD_CLUES*16+j] = true;
					}
				}
			}
			let selection = [];
			for(let j = 0; !(j>=z.dice.length); j++){
				for(let k = 0; !(k>=z.dice[j].length); k++){
					if(selectionHash[j*16+k]){
						selection.push([j,k]);
					}
				}
			}
			let promptText = "Which die would you like to reroll? (1-"+selection.length+")"+printDice(selection);
			promptSelection(promptText,selection,(a)=>{
				let alertText = z.players[me]+" rerolls "+printDie(selection[a-1])+", and it comes up ";
				z.dice[selection[a-1][0]][selection[a-1][1]].roll();
				alertText += z.dice[selection[a-1][0]][selection[a-1][1]].faceColored()+".";
				boldAlert(alertText);
				/*RULES: Pete/Rheticus */
				if(z.dice[selection[a-1][0]][selection[a-1][1]].appliedAs === WILD){
					plainAlert(z.players[me]+" must choose how to apply the Wild die.");
					z.dice[REVEALED+me].push(z.dice[selection[a-1][0]].splice(selection[a-1][1],1)[0]);
				}
				sortDice();
				mainMenu();
			});
		} else if(ch === "Change a die's facing"){
			let selectionHash = {};
			if(z.retrievalPhase && artifactNames[z.artifact] === "Telegraph from Oman"){
				for(let j = 0; !(j>=z.dice[REVEALED+z.firstAgent].length); j++){
					selectionHash[(REVEALED+z.firstAgent)*16+j] = true;
				}
			}
			if(z.retrievalPhase && artifactNames[z.artifact] === "William Tell's Crossbow"){
				for(let k = 0; !(k>=z.dice[REVEALED+me].length); k++){
					selectionHash[(REVEALED+me)*16+k] = true;
				}
			}
			if(z.retrievalPhase && artifactNames[z.artifact] === "Alessandro Volta's Lab Coat"){
				for(let j = 0; !(j>=z.numPlayers); j++){
					if(j === z.traitor){
						continue;
					}
					for(let k = 0; !(k>=z.dice[REVEALED+j].length); k++){
						if(z.dice[REVEALED+j][k].number() === 0){
							selectionHash[(REVEALED+j)*16+k] = true;
						}
					}
				}
			}
			if(z.retrievalPhase && artifactNames[z.artifact] === "Lucrezia Borgia's Comb"){
				for(let j = 0; !(j>=z.numPlayers); j++){
					if(j === z.traitor){
						continue;
					}
					for(let k = 0; !(k>=z.dice[REVEALED+j].length); k++){
						if(z.dice[REVEALED+j][k].number() === 2){
							selectionHash[(REVEALED+j)*16+k] = true;
						}
					}
				}
				for(let k = 0; !(k>=z.dice[APPLIED].length); k++){
					if(z.dice[APPLIED][k].number() === 2){
						selectionHash[APPLIED*16+k] = true;
					}
				}
			}
			if((z.traitDiscards[INTUITION].length > 0 && traitText(z.traitDiscards[INTUITION][0]) === "Camaraderie") || (z.players[me] === "Artie" && traitText(z.travelBag) === "Camaraderie")){
				for(let j = 0; !(j>=z.dice[LEADS].length); j++){
					selectionHash[LEADS*16+j] = true;
				}
				if(z.location[me] === "Field"){
					for(let j = 0; !(j>=z.dice[FIELD_CLUES].length); j++){
						selectionHash[FIELD_CLUES*16+j] = true;
					}
				}
			}
			if(z.traitDiscards[TRAITOR].length > 0 && traitText(z.traitDiscards[TRAITOR][0]) === "All Tied Up" && (z.dice[LEADS].length > 0 || z.dice[FIELD_CLUES].length > 0)){
				for(let j = 0; !(j>=z.dice[LEADS].length); j++){
					selectionHash[LEADS*16+j] = true;
				}
				for(let j = 0; !(j>=z.dice[FIELD_CLUES].length); j++){
					selectionHash[FIELD_CLUES*16+j] = true;
				}
			}
			let selection = [];
			for(let j = 0; !(j>=z.dice.length); j++){
				for(let k = 0; !(k>=z.dice[j].length); k++){
					if(selectionHash[j*16+k]){
						selection.push([j,k]);
					}
				}
			}
			let promptText = "Which die would you like to change the facing of? (1-"+selection.length+")"+printDice(selection);
			promptSelection(promptText,selection,(a)=>{
				let promptText = "Which face would you like it to show instead? (1-6)\n1: 1-Logic\n2: 1-Intuition\n3: 1-Lore\n4: 1-Tech\n5: ";
				switch(z.dice[selection[a-1][0]][selection[a-1][1]].type){
					case WILD:
						promptText += "1-?\n6:2-?";
						break;
					case LOGIC:
						promptText += "0-Logic\n6: 2-Logic";
						break;
					case INTUITION:
						promptText += "0-Intuition\n6: 2-Intuition";
						break;
					case LORE:
						promptText += "0-Lore\n6: 2-Lore";
						break;
					case TECH:
						promptText += "0-Tech\n6: 2-Tech";
						break;
				}
				promptNum(promptText,(a)=>1>a||a>6,mainMenu,(b)=>{
					let alertText = z.players[me]+" changes the facing of "+printDie(selection[a-1])+" to ";
					z.dice[selection[a-1][0]][selection[a-1][1]].face = b-1;
					if(z.dice[selection[a-1][0]][selection[a-1][1]].clue() !== WILD){
						z.dice[selection[a-1][0]][selection[a-1][1]].appliedAs = z.dice[selection[a-1][0]][selection[a-1][1]].clue();
					}
					alertText += z.dice[selection[a-1][0]][selection[a-1][1]].faceColored()+".";
					boldAlert(alertText);
					sortDice();
					mainMenu();
				});
			});
		} else if(ch === "Roll my dice"){
			confirmify("Confirming you want to roll your dice.",mainMenu,()=>{
				t.value += z.players[me]+" rolls their dice.\r\n";
				let alertText = "You roll your dice, and they come up as:";
				for(let j = 0; !(j>=z.dice[CLAIMED+me].length); j++){
					z.dice[CLAIMED+me][j].roll();
					alertText += "\n"+z.dice[CLAIMED+me][j].faceColored();
				}
				addAlert(alertText);
				mainMenu();
			});
		} else if (ch === "Cover a die" || ch === "Cover a second die"){
			let selection = [];
			for(let j = 0; !(j>=z.dice[CLAIMED+me].length); j++){
				if(!z.dice[CLAIMED+me][j].covered){
					selection.push([CLAIMED+me,j]);
				}
			}
			let promptText = "Which die would you like to cover? (1-"+selection.length+")"+printDice(selection);
			promptSelection(promptText,selection,(a)=>{
				/* TODO: RULES: myka OPS and secrecy */
				t.value += z.players[me]+" covers a die.\r\n";
				addAlert("You cover a "+z.dice[CLAIMED+me][selection[a-1][1]].faceColored()+" die.");
				z.dice[CLAIMED+me][selection[a-1][1]].covered = true;
				mainMenu();
			});
		} else if (ch === "Uncover a die"){
			let selection = [];
			for(let j = 0; !(j>=z.dice[CLAIMED+me].length); j++){
				if(z.dice[CLAIMED+me][j].covered){
					selection.push([CLAIMED+me,j]);
				}
			}
			let promptText = "Which die would you like to uncover? (1-"+selection.length+")\nThis will not reveal any dice, merely let you change your mind about which dice you want to cover.\nDon't do this if Jinks used Lie Detection on you after you covered any dice."+printDice(selection);
			promptSelection(promptText,selection,(a)=>{
				t.value += z.players[me]+" uncovers a die behind their screen.\r\n";
				addAlert("You uncover a "+z.dice[CLAIMED+me][selection[a-1][1]].faceColored()+" die.");
				z.dice[CLAIMED+me][selection[a-1][1]].covered = false;
				mainMenu();
			});
		} else if (ch === "Reveal all covered dice"){
			let player = me;
			let allReady = true;
			let anyReady = false;
			let traitorReveal = false;
			let agentReveal = false;
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(z.dice[CLAIMED+j].length === 0){
					continue;
				}
				let ready = false;
				let numCovered = 0;
				let numRolled = 0;
				for(let k = 0; !(k>=z.dice[CLAIMED+j].length); k++){
					if(z.dice[CLAIMED+j][k].covered){
						numCovered++;
					}
					if(z.dice[CLAIMED+j][k].face !== -1){
						numRolled++;
					}
				}
				if(numRolled === 0){
					continue;
				}
				if(z.theCaretaker){
					if(numCovered === 2 || (numCovered === 1 && z.dice[CLAIMED+j].length === 1)){
						ready = true;
					}
				} else {
					ready = (numCovered === 1);
				}
				if(!ready){
					allReady = false;
				} else {
					anyReady = true;
					if(j === z.traitor){
						traitorReveal = true;
					} else {
						agentReveal = true;
					}
				}
			}
			if(agentReveal){
				traitorReveal = false;
			}
			let confirmText = "Confirming you want to reveal all covered dice.";
			if(traitorReveal){
				confirmText = "Confirming you want to reveal what lies under the Traitor's dice cover.";
			} else if (z.traitor >= 0){
				confirmText = "Confirming you want to reveall all Agents' covered dice.";
			}
			if(!allReady && me !== z.traitor){
				confirmText += "\nYou're the only player ready to reveal; you should only reveal if you had played "+colorText("blue","Meet the Regents")+" to perform a Retrieval round by yourself.";
			}
			confirmify(confirmText,mainMenu,()=>{
				let alertText = bold("All covered dice are revealed.");
				if(traitorReveal){
					alertText = bold("The Traitor reveals what lies under their dice cover.");
				} else if(z.traitor >= 0){
					alertText = bold("All Agents' covered dice are revealed.");
				}
				for(let j = 0; !(j>=z.numPlayers); j++){
					if(j === z.traitor && !traitorReveal){
						continue;
					}
					let subText = "\n"+z.players[j]+" reveals";
					let any = false;
					for(let k = 0; !(k>=z.dice[CLAIMED+j].length); k++){
						if(z.dice[CLAIMED+j][k].covered){
							any = true;
							z.dice[CLAIMED+j][k].covered = false;
							subText += " "+z.dice[CLAIMED+j][k].faceColored();
							z.dice[REVEALED+j].unshift(z.dice[CLAIMED+j].splice(k,1)[0]);
							k--;
						} else {
							z.dice[CLAIMED+j][k].unroll();
						}
					}
					if(any){
						alertText += subText+".";
					}
				}
				plainAlert(alertText);
				z.theCaretaker = false;
				mainMenu();
			});
		} else if (ch ==="[Zipline] Sit this round out"){
			confirmify("Confirming someone has played "+colorText("green","Zipline")+" on you, and you do not want to cover and reveal dice this Retrieval round.",mainMenu,()=>{
				for(let j = 0; !(j>=z.dice[CLAIMED+me].length); j++){
					z.dice[CLAIMED+me][j].unroll();
				}
				boldAlert(z.players[me]+" accepts the "+colorText("green","Zipline")+" and will sit this round out.");
				mainMenu();
			});
		} else if(ch === "Take back a revealed die"){
			let selection = [];
			for(let j = 0; !(j>=z.dice[REVEALED+me].length); j++){
				selection.push([REVEALED+me,j]);
			}
			let promptText = "Which die would you like to take back? (1-"+selection.length+")"+printDice(selection);
			promptSelection(promptText,selection,(a)=>{
				boldAlert(z.players[me]+" returns "+z.dice[REVEALED+me][selection[a-1][1]].faceColored()+" to behind their screen.");
				z.dice[REVEALED+me][selection[a-1][1]].unroll();
				z.dice[CLAIMED+me].push(z.dice[REVEALED+me].splice(selection[a-1][1],1)[0]);
				mainMenu();
			});
		} else if(ch === "Choose how a revealed die will be applied"){
			let selection = [];
			for(let j = 0; !(j>=z.dice[REVEALED+me].length); j++){
				if(z.dice[REVEALED+me][j].type === WILD && z.dice[REVEALED+me][j].clue() === WILD){
					selection.push([REVEALED+me,j]);
				} else if(z.players[me] === "Pete" && z.dice[REVEALED+me][j].type === INTUITION && z.dice[REVEALED+me][j].number() === 2){
					selection.push([REVEALED+me,j]);
				} else if(artifactNames[z.artifact] === "Rheticus' Compass" && z.dice[REVEALED+me][j].clue() === LORE){
					selection.push([REVEALED+me,j]);
				}
			}
			
			let pickWhich = (v)=>{
				let promptText = "How would you like to apply the "+z.dice[REVEALED+me][v[1]].faceColored()+"? (1-4)\n1: Logic\n2: Intuition\n3: Lore\n4: Tech";
				promptNum(promptText,(a)=>1>a||a>4,mainMenu,(a)=>{
					boldAlert(z.players[me]+" decides that they will apply "+z.dice[REVEALED+me][v[1]].faceColored()+" as "+dieTypeName(a-1)+".");
					z.dice[REVEALED+me][v[1]].appliedAs = a-1;
					mainMenu();
				});
			};
			
			if(selection.length === 1){
				pickWhich(selection[0]);
			} else {
				let promptText = "Which die would you like to consider first? (1-"+selection.length+")"+printDice(selection);
				promptSelection(promptText,selection,(a)=>{
					pickWhich(selection[a-1]);
				});
			}
		} else if (ch === "Apply all revealed dice"){
			let confirmText = "Confirming you want to apply all revealed dice to the ";
			if(z.finale){
				confirmText += "Plot.";
			} else {
				confirmText += "Artifact.";
			}
			if(z.traitor >= 0 && z.dice[CLAIMED+z.traitor].length > 0){
				confirmText += "\nMake sure the Traitor has had a chance to roll their "+colorText("purple","Goo")+" dice.";
			} else if (0 > z.traitor){
				confirmText += "\nIf this is not a "+colorText("blue","Meet the Regents")+" roll, make sure you have rolled a "+colorText("purple","Goo")+" die in thread to see if it neutralizes a die.";
			}
			confirmify(confirmText,mainMenu,()=>{
				boldAlert("All revealed dice are applied to the artifact.");
				for(let j = 0; !(j>=z.numPlayers); j++){
					while(z.dice[REVEALED+j].length > 0){
						z.dice[APPLIED].push(z.dice[REVEALED+j].pop());
					}
				}
				sortDice();
				mainMenu();
			});
			
		} else if (ch === "Lie Detection"){
			let selection = [];
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(j === me){
					continue;
				}
				for(let k = 0; !(k>=z.dice[CLAIMED+j].length); k++){
					if(z.dice[CLAIMED+j][k].face !== -1){
						selection.push(j);
						break;
					}
				}
			}
			let promptText = "Which player would you like to use Lie Detection on? (1-"+selection.length+")\nIf you don't see the player you want to inspect, they likely haven't rolled their dice yet.";
			selection.forEach((index,j)=>{
				promptText += "\n"+(j+1)+": "+z.players[index];
			});
			promptSelection(promptText,selection,(a)=>{
				let index = selection[a-1];
				let numCovered = 0;
				let numUncovered = 0;
				for(let j = 0; !(j>=z.dice[CLAIMED+index].length); j++){
					/* TODO: secrecy and Myka's OPS */
					if(z.dice[CLAIMED+index][j].face !== -1){
						if(z.dice[CLAIMED+index][j].covered){
							numCovered++;
						} else {
							numUncovered++;
						}
					} 
				}
				
				let inspectBefore = ()=>{
					t.value += bold("Jinks uses his OPE, Lie Detection, to inspect "+z.players[index]+"'s dice, before they were covered.\r\n");
					let alertText = z.players[index]+" rolled the following dice:";
					let numCovered = 0;
					for(let j = 0; !(j>=z.dice[CLAIMED+index].length); j++){
						
						if(z.dice[CLAIMED+index][j].covered){
							z.dice[CLAIMED+index][j].covered = false;
							numCovered++;
						}
						alertText += "\n"+z.dice[CLAIMED+index][j].faceColored();
					}
					if(numCovered === 2 && !z.theCaretaker && !z.OPSavailable[index]){
						plainAlert("You will need to rewind here so Myka keeps her OPS.");
					}
					z.OPEavailable[me] = false;
					alertText += "\nThis information will not be saved anywhere, so take careful note of it now.\nYour OPS has been marked as used.";
					addAlert(alertText);
					mainMenu();
				};
				
				if(numCovered === 0){
					confirmify("Confirming you want to inspect "+z.players[index]+"'s dice.\nAs they have not yet covered any dice, this will be before they cover dice.",mainMenu,inspectBefore);
				} else if (numUncovered === 0 && (numCovered === 1 || (numCovered === 2 && z.theCaretaker))){
					confirmify("Confirming you want to inspect "+z.players[index]+"'s dice.\nAs they will cover all their dice, this will be before they cover dice.",mainMenu,inspectBefore);
				} else {
					promptNum("Would you like to inspect "+z.players[index]+"'s dice before or after they cover them? (1-2)\n1: Before\n2: After",(a)=>1>a||a>2,mainMenu,(a)=>{
						if(a === 1){
							inspectBefore();
						} else {
							t.value += bold("Jinks uses his OPS, Lie Detection, to inspect "+z.players[index]+"'s dice, after they were covered; they cannot be changed now.\r\n");
							let alertText = z.players[index]+" has the following dice uncovered:";
							let any = false;
							for(let j = 0; !(j>=z.dice[CLAIMED+index].length); j++){
								if(!z.dice[CLAIMED+index][j].covered){
									any = true;
									alertText += "\n"+z.dice[CLAIMED+index][j].faceColored();
								}
							}
							if(!any){
								alertText = "Myka has no dice uncovered; she must be using her OPS.";
								for(let j = 0; !(j>=z.dice[CLAIMED+index].length); j++){
									z.dice[CLAIMED+index][j].covered = true;
								}
							}
							z.OPEavailable[me] = false;
							alertText += "\nThis information will not be saved anywhere, so take careful note of it now.\nYour OPS has been marked as used.";
							addAlert(alertText);
							mainMenu();
						}
					});
				}
			});
		} else if (ch === "Harriet Tubman's Thimble"){
			let selection = [];
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(j === me){
					continue;
				}
				for(let k = 0; !(k>=z.dice[CLAIMED+j].length); k++){
					if(z.dice[CLAIMED+j][k].face !== -1){
						selection.push(j);
					}
				}
			}
			let promptText = "Which player would you like to use Harriet Tubman's Thimble on? (1-"+selection.length+")\nIf you don't see the player you want to inspect, they likely haven't rolled their dice yet.";
			selection.forEach((index,j)=>{
				promptText += "\n"+(j+1)+": "+z.players[index];
			});
			promptSelection(promptText,selection,(a)=>{
				let index = selection[a-1];
			
				t.value += bold(z.players[me]+" uses Harriet Tubman's Thimble to inspect "+z.players[index]+"'s dice before they were covered.\r\n");
				let alertText = z.players[index]+" rolled the following dice:";
				let numCovered = 0;
				for(let j = 0; !(j>=z.dice[CLAIMED+index].length); j++){
					alertText += "\n"+z.dice[CLAIMED+index][j].faceColored();
					if(z.dice[CLAIMED+index][j].covered){
						z.dice[CLAIMED+index][j].covered = false;
						numCovered++;
					}
				}
				if(numCovered === 2 && !z.theCaretaker && !z.OPSavailable[index]){
					plainAlert("You will need to rewind here so Myka keeps her OPS.");
				}
				alertText += "\nThis information will not be saved anywhere, so take careful note of it now.";
				addAlert(alertText);
				mainMenu();
			});
		} else if (ch === "Pearl of Wisdom"){
			let selection = [];
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(j === me){
					continue;
				}
				for(let k = 0; !(k>=z.dice[CLAIMED+j].length); k++){
					if(z.dice[CLAIMED+j][k].face !== -1){
						selection.push(j);
					}
				}
			}
			let promptText = "Which player would you like to use the Pearl of Wisdom on? (1-"+selection.length+")\nRemember that you may only use this ability once per Retrieval.\nIf you don't see the player you want to inspect, they likely haven't rolled their dice yet.";
			selection.forEach((index,j)=>{
				promptText += "\n"+(j+1)+": "+z.players[index];
			});
			promptSelection(promptText,selection,(a)=>{
				let index = selection[a-1];
			
				t.value += bold(z.players[me]+" uses the Pearl of Wisdom to inspect "+z.players[index]+"'s dice before they were covered.\r\n");
				t.value += z.players[me]+" will tell "+z.players[index]+" which die to cover.\r\n";
				let alertText = z.players[index]+" rolled the following dice:";
				let numCovered = 0;
				for(let j = 0; !(j>=z.dice[CLAIMED+index].length); j++){
					alertText += "\n"+z.dice[CLAIMED+index][j].faceColored();
					if(z.dice[CLAIMED+index][j].covered){
						z.dice[CLAIMED+index][j].covered = false;
						numCovered++;
					}
				}
				if(numCovered === 2 && !z.theCaretaker && !z.OPSavailable[index]){
					plainAlert("You will need to rewind here so Myka keeps her OPS.");
				}
				alertText += "\nThis information will not be saved anywhere, so take careful note of it now.\nNow, GeekMail "+z.players[index]+" to tell them which die to cover.";
				addAlert(alertText);
				mainMenu();
			});
		} else if (ch === "Turn off The Caretaker"){
			confirmify("Confirming you want to turn off the effect of The Caretaker; you should only have to do this if everyone who was going to submit dice this round has been Ziplined.",mainMenu,()=>{
				plainAlert("The effect of The Caretaker has been turned off.");
				z.theCaretaker = false;
				mainMenu();
			});
		}
		
		
	});
} else if (ch ==="Reveal Plot"){
	let promptText = "Which Plot would you like to reveal? (1-2)";
	promptText += "\n1: "+artifactNames[z.plots[0]];
	if(z.plotHand !== null){
		promptText += "\n2: "+artifactNames[z.plotHand];
	} else {
		promptText += "\n2: "+artifactNames[z.plots[1]];
	}
	promptText +="\nYou should also decide whether you want to keep or discard the other Plot before proceeding.";
	promptNum(promptText,(a)=>1>a||a>2,mainMenu,(a)=>{
		if(a === 1){
			z.artifact = z.plots.shift();
			if(z.plotHand !== null){
				z.plots.unshift(z.plotHand);
			}
		} else if(z.plotHand !== null) {
			z.artifact = z.plotHand;
		} else {
			z.artifact = z.plots.splice(1,1)[0];
		}
		z.artifactRevealed = true;
		z.plotHand = z.plots.shift();
		boldAlert("The Plot is "+artifactNames[z.artifact]+".");
		z.artifactRevealed = true;
		z.difficulty = artifactDifficulties[z.artifact];
		confirmify("Would you like to keep or discard the other plot?",()=>{
			plainAlert(z.players[me]+" keeps the other plot.");
			plainAlert("Now, resolve any immediate Plot effects.");
			mainMenu();
		},()=>{
			plainAlert(z.players[me]+" discards the other plot, "+artifactNames[z.plotHand]+".");
			z.plotHand = null;
			plainAlert("Now, resolve any immediate Plot effects.");
			mainMenu();
		},"DISCARD","KEEP");
			
	});
} else if (ch === "Resume the Cleanup phase"){
	confirmify("Confirming you're done with all \"During Cleanup\" Consequence effects and want to resume the Cleanup phase.",mainMenu,()=>{
		cleanup2();
		mainMenu();
	});
} else if (ch === "Nefarious or Rare Options"){
	let selection = [];
	if(z.traitDiscards[TRAITOR].length > 0 && traitText(z.traitDiscards[TRAITOR][0]) === "Artifact Missing?"){
		selection.push("[Artifact Missing?] Choose a Trait deck");
	}
	if(z.traitDiscards[TRAITOR].length > 0 && traitText(z.traitDiscards[TRAITOR][0]) === "Trouble in the Gooery" && me === z.firstAgent){
		selection.push("[Trouble in the Gooery] Apply a new Consequence");
	}
	if(z.artifact === "Sleeper Agent" && me === z.traitor && !z.retrievalPhase){
		selection.push("[Sleeper Agent] Discard a Consequence and apply a new one");
	}		
	
	if(z.traitor === -1 && !z.retrievalPhase){
		selection.push("Reveal a Traitor card for the Adversary");
	}
	if(z.retrievalPhase){
		if(canLoseArtifact()){
			if(z.finale){
				selection.push("Lose the Plot to the Adversary");
			} else {
				selection.push("Lose the Artifact to the Adversary");
			}
		}
		if(canRetrieveArtifact()){
			if(z.finale){
				selection.push("Defeat the Plot");
			} else {
				selection.push("Retrieve the Artifact for the Warehouse");
			}
		}
	} 
	if(z.artifactRevealed){
		if(z.finale){
			if(artifactNames[z.artifact] === "Break into the Escher Vault" || artifactNames[z.artifact] === "MacPherson's Auction Website Virus"){
				selection.push("Increase Plot Difficulty");
			}
			if(artifactNames[z.artifact] === "Chameleon Mines" || artifactNames[z.artifact] === "Klugers Egg Shell Bombs" || artifactNames[z.artifact] === "Artifact Auction"){
				selection.push("Decrease Plot Difficulty");
			}
		} else {
			if(artifactNames[z.artifact] === "Anthony Bishop's Manuscript" || artifactNames[z.artifact] === "Artifact Scavenger Hunt" || artifactNames[z.artifact] === "Jack the Ripper's Lantern" ||
			   artifactNames[z.artifact] === "Lewis Carroll's Looking Glass"){
				selection.push("Increase Artifact Difficulty");
			}
		}
	}
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(j !== z.traitor && !z.KOd[j]){
			selection.push("KO an Agent");
			break;
		}
	}
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(j !== z.traitor && !z.wounded[j]){
			selection.push("Wound an Agent");
			break;
		}
	}
	if(z.selfFulfillingProphecy){
		selection.push("Discard Self-Fulfilling Prophecy");
	}
	if(canRevealTraitor()){
		selection.push("Reveal as the Traitor");
	}
	let promptText = "What would you like to do, "+z.players[me]+"? (1-"+selection.length+")"+printSelection(selection);
	promptSelection(promptText,selection,(a)=>{
		let ch = selection[a-1];
		if(ch === "Lose the Artifact to the Adversary" || ch === "Lose the Plot to the Adversary"){
			let confirmText = "Confirming you want to lose the Artifact to the Adversary.";
			if(z.finale){
				confirmText = "Confirming you want to lose the Plot to the Adversary.";
			}
			confirmify("Confirming you want to lose the Artifact to the Adversary.",mainMenu,()=>{
				boldAlert(artifactNames[z.artifact] + " is lost to the Adversary!");
				if(!z.finale){
					z.lostArtifacts.push(z.artifact);
					applyConsequence(z.revealedConsequence);
					z.revealedConsequence = null;
					if(isAdversaryArtifact(z.artifact)){
						applyConsequence(z.artifact-14);
					}
					for(let j = 0; !(j>=z.numPlayers); j++){
						if(z.players[j] === "Leena" && z.traitor !== j){
							boldAlert("Leena must discard two Traits due to her drawback.");
						}
					}
				} else {
					z.successfulPlots.push(z.artifact);
				}
				if(z.successfulPlots.length === 2){
					boldAlert("MacPherson has successfully executed two plots!");
					gameOver(false);
				} else {
					cleanup();
				}
				mainMenu();
			});
			
		} else if(ch === "Discard Self-Fulfilling Prophecy"){
			confirmify("Confirming you have rolled the Warehouse dice on Self-Fulfilling Prophecy and want to discard the card.\nYou may want to wait until resolving the effect of the Warehouse die roll.",mainMenu,()=>{
				plainAlert("Self-Fulfilling Prophecy discarded.");
				z.selfFulfillingProphecy--;
				if(z.selfFulfillingProphecy === 0){
					delete z.selfFulfillingProphecy;
				} else {
					plainAlert("Two copies were played, so another remains, with the dice on top.");
				}
				z.traitDiscards[TRAITOR].unshift(108);
				mainMenu();
			});
		} else if (ch === "KO an Agent"){
			let promptText = "Which Agent would you like to KO? (1-"+z.numPlayers+")";
			for(let j = 0; !(j>=z.numPlayers); j++){
				promptText += "\n"+(j+1)+": ";
				if(z.traitor === j){
					promptText += "(traitor)";
				} else if (z.wounded[j]){
					promptText += "(wounded)";
				} else if (z.KOd[j]){
					promptText += "(KO'd)";
				} else {
					promptText += z.players[j];
				}
			}
			promptNum(promptText,(a)=>1>a||a>z.numPlayers||a-1===z.traitor||z.KOd[a-1],mainMenu,(a)=>{
				koPlayer(a-1);
				mainMenu();
			});
		} else if (ch === "Wound an Agent"){
			let promptText = "Which Agent would you like to wound? (1-"+z.numPlayers+")";
			for(let j = 0; !(j>=z.numPlayers); j++){
				promptText += "\n"+(j+1)+": ";
				if(z.traitor === j){
					promptText += "(traitor)";
				} else if (z.wounded[j]){
					promptText += "(wounded)";
				} else {
					promptText += z.players[j];
				}
			}
			promptNum(promptText,(a)=>1>a||a>z.numPlayers||a-1===z.traitor||z.wounded[a-1],mainMenu,(a)=>{
				woundPlayer(a-1);
				mainMenu();
			});
		} else if (ch === "Retrieve the Artifact for the Warehouse" || ch === "Defeat the Plot"){
			let confirmText = "Confirming you want to retrieve the Artifact for the Warehouse.";
			if(z.finale){
				confirmText = "Confirming you want to defeat the Plot.";
			} else {
				let aloneAgent = "NONE";
				for(let j = 0; !(j>=z.numPlayers); j++){
					if(z.location[j] === "Field"){
						if(aloneAgent === "NONE"){
							aloneAgent = z.players[j];
						} else {
							aloneAgent = "TWO";
						}
					}
				}
				if(aloneAgent !== "TWO"){
					confirmText += "\nMake sure "+aloneAgent+" is not running off with the Artifact first.";
				}
			}
			confirmify(confirmText,mainMenu,()=>{
				if(z.finale){
					boldAlert(artifactNames[z.artifact]+" is defeated!");
					z.stoppedPlots.push(z.artifact);
					if(z.stoppedPlots.length === 2){
						gameOver(true);
					} else {
						cleanup();
					}
				} else {
					boldAlert(artifactNames[z.artifact]+" is retrieved!");
					z.revealedConsequence = null;
					z.retrievedArtifacts.push(z.artifact);
					if(z.retrievedArtifacts.length === 3){
						gameOver(true);
					} else {
						cleanup();
					}
				}
				mainMenu();
			});
		} else if (ch === "Increase Artifact Difficulty" || ch === "Increase Plot Difficulty"){
			let promptText = "Which difficulty would you like to increase? (1-4)";
			for(let j = 0; !(j>=4); j++){
				promptText+= "\n"+(j+1)+": "+traitDeckName(j);
			}
			promptNum(promptText,(a)=>1>a||a>4,mainMenu,(a)=>{
				let promptText = "How much do you want to increase the "+traitDeckName(a-1)+" difficulty by? (1-6)";
				promptNum(promptText,(a)=>1>a||a>6,mainMenu,(b)=>{
					z.difficulty[a-1] += b;
					boldAlert(traitDeckName(a-1) + " difficulty increased by "+b+".");
					mainMenu();
				});
				
			});
		} else if (ch === "Decrease Artifact Difficulty" || ch === "Decrease Plot Difficulty"){
			let promptText = "Which difficulty would you like to increase? (1-4)";
			for(let j = 0; !(j>=4); j++){
				promptText+= "\n"+(j+1)+": ";
				if(z.difficulty[j] === 0){
					promptText += "(cannot decrease further)";
				} else {
					promptText += traitDeckName(j);
				}
			}
			promptNum(promptText,(a)=>1>a||a>4||z.difficulty[a-1]===0,mainMenu,(a)=>{
				let promptText = "How much do you want to increase the "+traitDeckName(a-1)+" difficulty by? (1-"+z.difficulty[a-1]+")";
				promptNum(promptText,(a)=>1>a||a>z.difficulty[a-1],mainMenu,(b)=>{
					z.difficulty[a-1] -= b;
					boldAlert(traitDeckName(a-1) + " difficulty decreased by "+b+".");
					mainMenu();
				});
				
			});
		} else if(ch === "[Artifact Missing?] Choose a Trait deck"){
			let promptText = "Which Trait deck would you like to draw and discard cards from until you draw a Calamity? (1-4)";
			for(let j = 0; !(j>=4); j++){
				promptText+= "\n"+(j+1)+": "+traitDeckName(j);
			}
			promptNum(promptText,(a)=>1>a||a>4,mainMenu,(a)=>{
				plainAlert(z.players[me]+" chooses to draw for a Calamity from the "+traitDeckName(a-1)+" deck.");
				while(true){
					if(z.traitDecks[a-1].length === 0){
						plainAlert(traitDeckName(a-1)+" deck reshuffles.");
						z.traitDecks[a-1] = z.traitDiscards[a-1];
						z.traitDiscards[a-1] = [];
						shuffle(z.traitDecks[a-1]);
					}
					let card = z.traitDecks[a-1].pop();
					z.traitDiscards[a-1].unshift(card);
					if(isDamageCalamity(card) || isNeutralizeCalamity(card)){
						plainAlert(traitColored(card)+" drawn!");
						/* RULES: If no revealed traitor, first agent is doing this */
						if(z.players[me] === "Leena" && me !== z.traitor && me !== z.bronzed){
							plainAlert("Leena could use her Aura Reader to prevent this Calamity.");
						} else if(isDamageCalamity(card)){
							damageWarehouse();
						} else {
							plainAlert("A "+traitDeckName(a-1)+" die must be neutralized.");
						}
						break;
					} else {
						t.value += traitColored(card)+" discarded.\r\n";
					}
				}
				mainMenu();
			});
		} else if(ch === "[Trouble in the Gooery] Apply a new Consequence"){
			confirmify("Confirming you want to apply a new Consequence from Trouble in the Gooery rather than take two Warehouse damage.",mainMenu,()=>{
				let consequence = z.consequenceDeck.pop();
				applyConsequence(consequence,true);
				mainMenu();
			});
		} else if (ch === "[Sleeper Agent] Discard a Consequence and apply a new one"){
			/* RULES: can you discard an adversary agent consequence? */
			/* TODO: possible consequence reshuffling? */
			let promptText = "Which consequence would you like to discard? (1-"+z.consequences.length+")";
			z.consequences.forEach((consequence,j)=>{
				promptText += "\n"+(j+1)+": "+consequenceNames[consequence];
			});
			promptSelection(promptText,selection,(a)=>{
				boldAlert(z.players[me]+" discards "+consequenceNames[z.consequences[a-1]]);
				let consequence = z.consequences.splice(a-1,1)[0];
				switch(consequence){
					case 2:
						for(let j = 0; !(j>=z.dice[LOCKED].length); j++){
							if(z.dice[LOCKED][j].type === INTUITION){
								z.dice[RESERVES].push(z.dice[LOCKED].splice(j,1)[0]);
								break;
							}
						}
						plainAlert("An Intuition die is unlocked.");
						break;
					case 3:
						z.brokenGear = false;
						plainAlert("The broken gear token is removed from the Warehouse Maintenance Track.");
						break;
					case 4:
						for(let j = 0; !(j>=z.dice[LOCKED].length); j++){
							if(z.dice[LOCKED][j].type === TECH){
								z.dice[RESERVES].push(z.dice[LOCKED].splice(j,1)[0]);
								break;
							}
						}
						plainAlert("A Tech die is unlocked.");
						break;
					case 9:
						for(let j = 0; !(j>=z.dice[LOCKED].length); j++){
							if(z.dice[LOCKED][j].type === LOGIC){
								z.dice[RESERVES].push(z.dice[LOCKED].splice(j,1)[0]);
								break;
							}
						}
						plainAlert("A Logic die is unlocked.");
						break;
					case 13:
						for(let j = 0; !(j>=z.dice[LOCKED].length); j++){
							if(z.dice[LOCKED][j].type === WILD){
								z.dice[RESERVES].push(z.dice[LOCKED].splice(j,1)[0]);
								break;
							}
						}
						plainAlert("The Wild die is unlocked.");
						break;
					case 18:
						for(let j = 0; !(j>=z.dice[LOCKED].length); j++){
							if(z.dice[LOCKED][j].type === LORE){
								z.dice[RESERVES].push(z.dice[LOCKED].splice(j,1)[0]);
								break;
							}
						}
						plainAlert("A Lore die is unlocked.");
						break;
				}
				applyConsequence(z.consequenceDeck.pop());
				mainMenu();
			});
		} else if (ch === "Reveal as the Traitor"){
			let confirmText = "Confirming you want to reveal as the Traitor.  You are only allowed to do this if one of the following has just occurred:";
			confirmText += "\n1: You are alone in the Field with an Artifact the Agents are about to retrieve.";
			confirmText += "\n2: A Loyal Agent has been bronzed.";
			confirmText += "\n3: Harriet Tubman's Thimble or Pearl of Wisdom has just been lost to the Adversary.";
			confirmify(confirmText,mainMenu,()=>{
				boldAlert(z.players[me]+" reveals as the Traitor!");
				z.traitor = me;
				z.location[me] = "Lost Artifacts";
				boldAlert(z.players[z.traitor] + " is the Traitor!");
				if(z.dice[CLAIMED+z.traitor].length > 0 || z.dice[REVEALED+z.traitor].length > 0){
					plainAlert("All their dice are placed in the Bronze Sector.");
				}
				while(z.dice[CLAIMED+z.traitor].length > 0){
					z.dice[BRONZED].push(z.dice[CLAIMED+z.traitor].pop());
				}
				while(z.dice[REVEALED+z.traitor].length > 0){
					z.dice[REVEALED+z.traitor][0].face = -1;
					z.dice[BRONZED].push(z.dice[REVEALED+z.traitor].shift());
				}
				if(z.traitHands[z.traitor].length > 0){
					let alertText = z.players[z.traitor] + " returns all their Traits and stress to the game box:";
					shuffle(z.traitHands[z.traitor]);
					while(z.traitHands[z.traitor].length > 0){
						let card = z.traitHands[z.traitor].pop();
						alertText += "\n"+traitColored(card);
					}
					if(z.players[z.traitor] === "Artie" && z.travelBag !== null){
						alertText += "\n"+traitColored(z.travelBag)+" (Travel Bag)";
						z.travelBag = null;
					}
					plainAlert(alertText);
				}
				z.OPEavailable[z.traitor] = false;
				z.OPSavailable[z.traitor] = false;
				drawTrait(z.traitor,TRAITOR);
				drawTrait(z.traitor,TRAITOR);
				if(z.firstAgent === z.traitor){
					/* RULES: this */
					z.firstAgent = (z.firstAgent + 1) % z.numPlayers;
					boldAlert("The First Agent is now "+z.players[z.firstAgent]+".");
				}
				mainMenu();
			});
		} else if (ch === "Reveal a Traitor card for the Adversary"){
			confirmify("Confirming you want to reveal and play a Traitor card for the Adversary Turn.",mainMenu,()=>{
				if(z.traitDecks[TRAITOR].length === 0){
					plainAlert("Traitor deck reshuffles.");
					z.traitDecks[TRAITOR] = z.traitDiscards[TRAITOR];
					shuffle(z.traitDecks[TRAITOR]);
					z.traitDiscards[TRAITOR] = [];
				}
				let card = z.traitDecks[TRAITOR].pop();
				z.traitDiscards[TRAITOR].unshift(card);
				boldAlert("The Adversary plays "+traitColored(card)+".");		
				if(traitText(card) === "Self-Fulfilling Prophecy"){
					z.traitDiscards[TRAITOR].shift();
					if(z.selfFulfillingProphecy){
						z.selfFulfillingProphecy++;
					} else {
						z.selfFulfillingProphecy = 1;
					}
					plainAlert('Next time a Warehouse die would be rolled, roll both and use the worst.\nThen, discard this card from "Nefarious or Rare Options."');
				} else {
					if(traitText(card) === "False Ping"){
						z.ping = z.pings.pop();
						boldAlert("The new Ping is "+pingNames[z.ping]+".");
						for(let j = 0; !(j>=z.numPlayers); j++){
							if(z.location[j] === "Field"){
								z.location[j] = "Warehouse";
								plainAlert(z.players[j] +" is moved back to the Warehouse.");
							}
						}	
					} else if (traitText(card) === "Haunted by the Past"){
						plainAlert("All Trait discard piles have been reshuffled back into their decks.");
						for(let j = 0; !(j>=4); j++){
							z.traitDecks[j] = z.traitDecks[j].concat(z.traitDiscards[j]);
							shuffle(z.traitDecks[j]);
							z.traitDiscards[j] = [];
						}
					} else if(traitText(card) === "Distraction"){
						if(z.finale){
							plainAlert("This card has no effect during the Finale.");
						} else {
							let alertText = "All 0- and 1-strength Leads and Field Clues are rerolled:";
							let any = false;
							for(let j = 0; !(j>=z.dice[LEADS].length); j++){
								if(2 > z.dice[LEADS][j].number()){
									any = true;
									alertText += "\n"+ printDie([LEADS,j]) + " becomes ";
									z.dice[LEADS][j].roll();
									alertText += z.dice[LEADS][j].faceColored();
									
								}
							}
							for(let j = 0; !(j>=z.dice[FIELD_CLUES].length); j++){
								if(2 > z.dice[FIELD_CLUES][j].number()){
									any = true;
									alertText +=  "\n"+printDie([FIELD_CLUES,j]) + " becomes ";
									z.dice[FIELD_CLUES][j].roll();
									alertText += z.dice[FIELD_CLUES][j].faceColored();
								}
							}
							if(!any){
								alertText += "\nNo Effect.";
							}
							plainAlert(alertText);
							sortDice();
						}
					} else {
						plainAlert("Now, process the effect of this card.");
					}
				}	
				
				mainMenu();
			});
		}
	});
} else if (ch ==="Cast my vote"){
	promptNum("How would you like to vote? (1-2)\nThis will not be revealed until after all players have decided.\n1: Bronze "+z.players[z.voteTarget]+"\n2: Do NOT Bronze "+z.players[z.voteTarget]+".",(a)=>1>a||a>2,mainMenu,(a)=>{
		if(a === 1){		
			addAlert("You will vote to bronze "+z.players[z.voteTarget]+".");
			z.votes[me] = 0;
		} else {
			addAlert("You will vote to NOT bronze "+z.players[z.voteTarget]+".");
			z.votes[me] = 1;
		}
		t.value += z.players[me] + " is ready to vote.\r\n";
		mainMenu();
	});
} else if (ch === "Change my vote"){
	promptNum("How would you like to vote? (1-3)\nThis will not be revealed until after all players have decided.\n1: Bronze "+z.players[z.voteTarget]+"\n2: Do NOT Bronze "+z.players[z.voteTarget]+"."+
		      "\n3: I'm still deciding, cancel my vote for now",(a)=>1>a||a>3,mainMenu,(a)=>{
		if(a === 1){
			t.value += z.players[me] + " is ready to vote.\r\n";
			addAlert("You will vote to bronze "+z.players[z.voteTarget]+".");
			z.votes[me] = 0;
		} else if(a === 2){
			t.value += z.players[me] + " is ready to vote.\r\n";
			addAlert("You will vote to NOT bronze "+z.players[z.voteTarget]+".");
			z.votes[me] = 1;
		} else {
			t.value += z.players[me] + " is no longer ready to vote.\r\n";
			addAlert("You have cancelled your decision; you will need to vote one way or the other at some point, as abstentions are not allowed.");
			z.votes[me] = - 1;
		}
		mainMenu();
	});
	
} else if (ch === "Reveal votes"){
	confirmify("Confirming you would like to reveal the voting results.",mainMenu,()=>{
		let bronzeVotes = 0;
		for(let j = 0; !(j>=z.numPlayers); j++){
			if(z.votes[j] === 0){
				plainAlert(z.players[j]+" voted to bronze "+z.players[z.voteTarget]+".");
				bronzeVotes++;
			} else if (z.votes[j] === 1){
				plainAlert(z.players[j]+" voted to NOT bronze "+z.players[z.voteTarget]+".");
			}
		}
		if(bronzeVotes >= 3 || (5 > z.numPlayers && bronzeVotes === 2)){
			boldAlert("The bronzing vote is successful.");
			z.location[z.voteTarget] = "Bronze Sector";
			if(z.loyalty[z.voteTarget] === TRAITOR){
				z.traitor = z.voteTarget;
				boldAlert(z.players[z.traitor] + " is the Traitor!");
				if(z.dice[CLAIMED+z.traitor].length > 0 || z.dice[REVEALED+z.traitor].length > 0){
					plainAlert("All their dice are placed in the Bronze Sector.");
				}
				while(z.dice[CLAIMED+z.traitor].length > 0){
					z.dice[BRONZED].push(z.dice[CLAIMED+z.traitor].pop());
				}
				while(z.dice[REVEALED+z.traitor].length > 0){
					z.dice[REVEALED+z.traitor].face = -1;
					z.dice[BRONZED].push(z.dice[REVEALED+z.traitor].shift());
				}
				while(z.traitHands[z.traitor].length > 0){
					discardRandomTrait(z.traitor,true);
				}
				if(z.players[z.traitor] === "Artie" && z.travelBag !== null){
					plainAlert("Artie discards "+traitColored(z.travelBag)+" from his Travel Bag.");
					z.traitDiscards[traitColor(z.travelBag)].unshift(z.travelBag);
					z.travelBag = null;
				}
			} else {
				boldAlert(z.players[z.voteTarget] +" is not the Traitor!");
				z.bronzed = z.voteTarget;
				plainAlert("The real Traitor may reveal at this time.");
				z.KOd[z.bronzed] = true;
				if(z.traitHands[z.bronzed].length > 0){
					let alertText = z.players[z.bronzed] + " returns all their Traits and stress to the game box:";
					shuffle(z.traitHands[z.bronzed]);
					while(z.traitHands[z.bronzed].length > 0){
						let card = z.traitHands[z.bronzed].pop();
						alertText += "\n"+traitColored(card);
					}
					if(z.players[z.bronzed] === "Artie" && z.travelBag !== null){
						alertText += "\n"+traitColored(z.travelBag) + " (Travel Bag)";
						z.travelBag = null;
					}
					plainAlert(alertText);
				}
			}
		} else {
			boldAlert("The bronzing vote fails.");
		}
		delete z.voteTarget;
		delete z.votes;
		mainMenu();
	});
} else if (ch === "Move to the Lost Artifacts Board"){
	confirmify("Confirming you want to move to the Lost Artifacts Board; this is your first action after being bronzed.",mainMenu,()=>{
		boldAlert(z.players[me]+" moves to the Lost Artifacts Board.");
		z.location[me] = "Lost Artifacts";
		mainMenu();
	});
} else if (ch === "Play a Traitor card"){
	let promptText = "Which Traitor card would you like to play? (1-"+z.traitHands[me].length+")";
	for(let j = 0; !(j>=z.traitHands[me].length); j++){
		promptText += "\n" + (j+1)+": "+traitColored(z.traitHands[me][j]);
	}
	promptSelection(promptText,z.traitHands[me],(a)=>{
		let confirmText = "Confirming you want to play "+traitColored(z.traitHands[me][a-1])+".";
		if(isAction(z.traitHands[me][a-1])){
			confirmText += "\nRemember that playing this card requires an Action.";
		}
		confirmify(confirmText,mainMenu,()=>{
			let card = discardTrait(me,a-1);
			boldAlert(z.players[me]+" plays "+traitColored(card)+".");		
			if(traitText(card) === "Self-Fulfilling Prophecy"){
				z.traitDiscards[TRAITOR].shift();
				if(z.selfFulfillingProphecy){
					z.selfFulfillingProphecy++;
				} else {
					z.selfFulfillingProphecy = 1;
				}
				plainAlert('Next time a Warehouse die would be rolled, roll both and use the worst.\nThen, discard this card from "Nefarious or Rare Options."');
			} else {
				if(traitText(card) === "False Ping"){
					z.ping = z.pings.pop();
					boldAlert("The new Ping is "+pingNames[z.ping]+".");
					for(let j = 0; !(j>=z.numPlayers); j++){
						if(z.location[j] === "Field"){
							z.location[j] = "Warehouse";
							plainAlert(z.players[j] +" is moved back to the Warehouse.");
						}
					}	
				} else if (traitText(card) === "Haunted by the Past"){
					plainAlert("All Trait discard piles have been reshuffled back into their decks.");
					for(let j = 0; !(j>=4); j++){
						z.traitDecks[j] = z.traitDecks[j].concat(z.traitDiscards[j]);
						shuffle(z.traitDecks[j]);
						z.traitDiscards[j] = [];
					}
				} else if(traitText(card) === "Distraction"){
					if(z.finale){
						plainAlert("This card has no effect during the Finale.");
					} else {
						let alertText = "All 0- and 1-strength Leads and Field Clues are rerolled:";
						let any = false;
						for(let j = 0; !(j>=z.dice[LEADS].length); j++){
							if(2 > z.dice[LEADS][j].number()){
								any = true;
								alertText += "\n"+ printDie([LEADS,j]) + " becomes ";
								z.dice[LEADS][j].roll();
								alertText += z.dice[LEADS][j].faceColored();
								
							}
						}
						for(let j = 0; !(j>=z.dice[FIELD_CLUES].length); j++){
							if(2 > z.dice[FIELD_CLUES][j].number()){
								any = true;
								alertText +=  "\n"+printDie([FIELD_CLUES,j]) + " becomes ";
								z.dice[FIELD_CLUES][j].roll();
								alertText += z.dice[FIELD_CLUES][j].faceColored();
							}
						}
						if(!any){
							alertText += "\nNo Effect.";
						}
						plainAlert(alertText);
						sortDice();
					}
				} else {
					plainAlert("Now, process the effect of this card.");
				}
			}	
			
			mainMenu();
		});
	});
} else if (ch === "Discard a Traitor card"){
	let promptText = "Which Traitor card would you like to discard? (1-"+z.traitHands[me].length+")";
	z.traitHands[me].forEach((card,j)=>{
		promptText += "\n"+(j+1)+": "+traitColored(card);
	});
	promptNum(promptText,(a)=>1>a||a>z.traitHands[me].length,mainMenu,(a)=>{
		let card = discardTrait(me,a-1);
		boldAlert(z.players[me]+" discards "+traitColored(card)+".");
		mainMenu();
	});	
} else if (ch === "Obstacles and Other Actions"){
	let selection = [];



	if(canHeal()){
		selection.push("Heal an Agent");
	}
	if(canTravel()){
		selection.push("Travel");
	}
	if(z.traitor === -1 && !z.retrievalPhase && z.bronzed === -1 && !z.beforeRetrieval && !z.cleanupPause){
		selection.push("Hold a Bronzing Vote");
	}
	if(z.bronzed !== -1 && !z.retrievalPhase && me !== z.bronzed && me !== z.traitor && !z.beforeRetrieval && !z.cleanupPause){
		selection.push("Debronze an Agent");
	}
	if(z.immediateObstacle === null){
		selection.push("Draw an obstacle");
	}
	if(canDefeatObstacle()){
		selection.push("Defeat an obstacle");
	}
	if(z.OPEavailable[me] && me !== z.traitor){
		selection.push("Mark your OPE as used");
	}
	if(z.OPSavailable[me] && me !== z.traitor){
		selection.push("Mark your OPS as used");
	}
	
	
	let promptText = "What would you like to do, "+z.players[me]+"? (1-"+selection.length+")"+printSelection(selection);
	promptSelection(promptText,selection,(a)=>{
		let ch = selection[a-1];
		if(ch === "Defeat an obstacle"){
			let selection = [];
			if(z.immediateObstacle !== null){
				selection.push("Immediate");
			}
			for(let x in z.boardObstacles){
				selection.push(x);
			}
			if(z.location[me] === "Warehouse"){
				for(let j = 0; !(j>=z.warehouseMaintenance.length); j++){
					selection.push(j);
				}
			}
			let promptText = "Which obstacle would you like to defeat? (1-"+selection.length+")";
			selection.forEach((x,j)=>{
				promptText+="\n"+(j+1)+": ";
				if(Number.isInteger(x)){
					promptText += obstacleName(z.warehouseMaintenance[x])+ " (Warehouse Maintenance)";
				} else if (x === "Travel"){
					promptText += obstacleName(z.boardObstacles.Travel);
					if(!z.noTravelRing){
						promptText += "+1";
					}
					promptText += " (Travel)";
				} else if (x === "Immediate"){
					promptText += obstacleName(z.immediateObstacle) + " (Immediate)";
				} else {
					promptText += obstacleName(z.boardObstacles[x]);
					switch(x){
						case "Logic":
							if(!z.noLogicRing){
								promptText += "+1";
							}
							break;
						case "Intuition":
							if(!z.noIntuitionRing){
								promptText += "+1";
							}
							break;
						case "Lore":
							if(!z.noLoreRing){
								promptText += "+1";
							}
							break;
						case "Tech":
							if(!z.noLoreRing){
								promptText += "+1";
							}
							break;
					}
					promptText += " ("+x+" deck)";
				}
			});
			promptSelection(promptText,selection,(a)=>{
				teslaGrenade(selection[a-1]);
				mainMenu();
			});
		} else if(ch === "Mark your OPE as used"){
			confirmify("Confirming you want to make your OPE as used.\nMake sure you have actually finished using your OPE first.",mainMenu,()=>{
				z.OPEavailable[me] = false;
				plainAlert(z.players[me]+" marks their OPE as used.");
				mainMenu();
			});
		} else if(ch === "Mark your OPS as used"){
			confirmify("Confirming you want to make your OPS as used.\nMake sure you have actually finished using your OPS first.",mainMenu,()=>{
				z.OPSavailable[me] = false;
				plainAlert(z.players[me]+" marks their OPS as used.");
				mainMenu();
			});
		} else if (ch === "Draw an obstacle"){
			let selection = ["Immediate","Warehouse Maintenance"];
			if(!("Travel" in z.boardObstacles)){
				selection.push("Travel");
			}
			if(!("Logic" in z.boardObstacles)){
				selection.push("Logic");
			}
			if(!("Intuition" in z.boardObstacles)){
				selection.push("Intuition");
			}
			if(!("Lore" in z.boardObstacles)){
				selection.push("Lore");
			}
			if(!("Tech" in z.boardObstacles)){
				selection.push("Tech");
			}
			let promptText = "Where would you like to place the new obstacle? (1-"+selection.length+")"+printSelection(selection);
			promptSelection(promptText,selection,(a)=>{
				let obstacle = drawObstacle();
				if(selection[a-1] === "Immediate"){
					plainAlert("A "+obstacleName(obstacle)+" is drawn, and must be faced immediately.");
					z.immediateObstacle = obstacle;
					mainMenu();
				} else if (selection[a-1] === "Warehouse Maintenance"){
					damageWarehouse();
					mainMenu();
				} else {
					confirmify("Would you like to add a +1 Ring to this obstacle?  (The answer is probably yes, unless you know what you're doing.)",()=>{
						if (selection[a-1] === "Travel"){
							plainAlert("A "+obstacleName(obstacle)+" is drawn, and is placed on the Travel space without a +1 ring.");
							z.boardObstacles.Travel = obstacle;
							z.noTravelRing = true;
						} else {
							plainAlert("A "+obstacleName(obstacle)+" is drawn, and is placed on the "+selection[a-1]+" deck with a +1 ring.");
							z.boardObstacles[selection[a-1]] = obstacle;
							switch(selection[a-1]){
								case "Logic":
									z.noLogicRing = true;
									break;
								case "Intuition":
									z.noIntuitionRing = true;
									break;
								case "Lore":
									z.noLoreRing = true;
									break;
								case "Tech":
									z.noTechRing = true;
									break;
							}
						}
						mainMenu();
					},()=>{
						if (selection[a-1] === "Travel"){
							plainAlert("A "+obstacleName(obstacle)+" is drawn, and is placed on the Travel space with a +1 ring.");
							z.boardObstacles.Travel = obstacle;
						} else {
							plainAlert("A "+obstacleName(obstacle)+" is drawn, and is placed on the "+selection[a-1]+" deck with a +1 ring.");
							z.boardObstacles[selection[a-1]] = obstacle;
						}
						mainMenu();
					},"YES","NO");
					
				}
				
			});
		} else if(ch ==="Heal an Agent") {
			let selection = [];
			for(let j = 0; !(j>=z.numPlayers); j++){
				if((z.wounded[j] || z.KOd[j]) && !z.bronzed[j]){
					selection.push(j);
				}
			}
			let promptText = "Which agent would you like to heal? (1-"+selection.length+")";
			selection.forEach((index,j)=>{
				promptText += "\n"+(j+1)+": "+z.players[index];
				if(z.wounded[index]){
					promptText += " (wounded)";
				} else {
					promptText += " (KO'd)";
				}
			});
			promptSelection(promptText,selection,(a)=>{
				if(z.wounded[selection[a-1]]){
					z.wounded[selection[a-1]] = false;
					boldAlert(z.players[selection[a-1]] + " heals their wound.");
				} else {
					z.KOd[selection[a-1]] = false;
					boldAlert(z.players[selection[a-1]] + " heals their KO.");
				}
				mainMenu();
			});
		} else if (ch === "Travel"){
			let confirmText = "Confirming you want to travel to the ";
			if(z.location[me] === "Field"){
				confirmText += "Warehouse";
			} else {
				confirmText += "Field";
			}
			confirmify(confirmText+".",mainMenu,()=>{
				let alertText = z.players[me]+" travels to the ";
				if(z.location[me] === "Field"){
					z.location[me] = "Warehouse";
					alertText += "Warehouse.";
				} else {
					z.location[me] = "Field";
					alertText += "Field.";
				}
				
				switch(pingNames[z.ping]){
					case "Chicago, IL (T)":
						if(z.location[me] === "Field"){
							alertText += "\nThey may face an Immediate obstacle.  If it is defeated, draw two Traits; otherwise they are KO'd.";
						}
						break;
					case "Geneva, Switzerland (T)":
					case "Las Vegas, NV (T)":
					case "Milan, Italy (T)":
					case "Moscow, Russia (T)":
					case "New York City, NY (T)":
					case "Paris, France (T)":
					case "Quebec, Canada (T)":
					case "Shiloh, TN (T)":
						if(z.location[me] === "Field"){
							alertText += "\nThey may perform the effect listed on the ping.";
						}
						break;
					case "Univille, SD (*)":
						alertText+= "\nThey may now take another action.";
						break;
				}
				boldAlert(alertText);
				mainMenu();
			});
		} else if (ch === "Debronze an Agent"){
			confirmify("Confirming you want to debronze "+z.players[z.bronzed]+".",mainMenu,()=>{
				boldAlert(z.players[z.bronzed] + " is debronzed.");
				z.location[z.bronzed] = "Warehouse";
				z.bronzed = -1;
				mainMenu();
			});
		} else if(ch === "Hold a Bronzing Vote"){
			let promptText = "Who do you want to target with the bronzing vote? (1-"+z.numPlayers+")";
			promptText += printSelection(z.players);
			promptSelection(promptText,selection,(a)=>{
				z.voteTarget = a-1;
				z.votes = [];
				for(let j = 0; !(j>=z.numPlayers); j++){
					z.votes.push(-1);
				}
				boldAlert(z.players[me]+ " initiates a bronzing vote against "+z.players[z.voteTarget]+".");
				plainAlert("All players apart from "+z.players[z.voteTarget]+" must now cast a vote; once all votes have been cast, the results can be revealed.");
				mainMenu();
			});
		}
		
	});
} else if(ch === "Handle Traits"){
	let selection = [];
	selection.push("Draw a Trait");
	if(canPlayAnyTrait()){
		selection.push("Play a Trait");
	}
	if(z.players[me] === "Artie" && canPlayAnyTrait()){
		selection.push("Play a Trait and put it in your Travel Bag");
	}
	if(canDiscardTrait()){
		selection.push("Discard a Trait");
	}
	if(numTraits(me) > 0 && ((z.traitDiscards[LORE].length > 0 && traitText(z.traitDiscards[LORE][0]) === "Read the Manual") || 
									   (z.players[me] === "Artie" && traitText(z.travelBag) === "Read the Manual") ||
									   (z.traitDiscards[TRAITOR].length > 0 && traitText(z.traitDiscards[TRAITOR][0]) === "Da Vinci's Gargoyle") ||
									   (z.artifactRevealed && artifactNames[z.artifact] === "Sylvia Plath's Typewriter"))){
		selection.push("Discard a random Trait");
	}
	selection.push("Draw Stress");
	if(canDiscardStress()){
		selection.push("Discard Stress");
	}
	
	/* Milan, Italy (investigation)
	Henry Morton Stanley's Map (retrieval)
	Jinks doing Warehouse Research (investigation at Warehouse)
	The Restricted Files (hmmm)
	*/
	if(canDrawDiscarded()){
		selection.push("Draw a discarded Trait");
	}
	if(z.traitHands[me].length > 0 && ((z.traitDiscards[TECH].length > 0 && traitText(z.traitDiscards[TECH][0]) === "Farnsworth") || traitText(z.travelBag) === "Farnsworth" || 
									   z.collaborate ||
									   (z.players[me] === "Leena" && z.OPEavailable[me]))){
		selection.push("Give a Trait to another player");
	}
	let promptText = "What would you like to do, "+z.players[me]+"? (1-"+selection.length+")"+printSelection(selection);
	promptSelection(promptText,selection,(a)=>{
		let ch = selection[a-1];
		if(ch === "Draw a Trait"){
			let promptText = "Which color Trait would you like to draw? (1-4)\n1: ";
			
			if("Logic" in z.boardObstacles){
				promptText += "(Obstruction)";
			} else {
				promptText +=colorText("blue","Logic");
				if(z.players[me] === "Jinks" || z.players[me] === "Myka" || z.players[me] === "Claudia"){
					promptText += " (Focus)";
				}
			}
			promptText += "\n2: ";
			
			if("Intuition" in z.boardObstacles){
				promptText += "(Obstruction)";
			} if(z.players[me] === "Myka"){
				promptText += "(you cannot draw Intuition)";
			} else if(z.players[me] === "Pete" || z.players[me] === "Jinks" || z.players[me] === "Leena"){
				promptText += colorText("red","Intuition")+" (Focus)";
			} else {
				promptText += colorText("red","Intuition");
			}
			promptText += "\n3: ";
			
			if("Lore" in z.boardObstacles){
				promptText += "(Obstruction)";
			} else {
				promptText += colorText("orange","Lore");
				if(z.players[me] === "Artie" || z.players[me] === "Myka" || z.players[me] === "Leena"){
					promptText += " (Focus)";
				}
			}
			if("Tech" in z.boardObstacles){
				promptText += "(Obstruction)";
			} else {
				promptText += "\n4: "+colorText("green","Tech");
				if(z.players[me] === "Artie" || z.players[me] === "Claudia"){
					promptText += " (Focus)";
				}
			}
			promptNum(promptText,(a)=>1>a||a>4||(a===2 && z.players[me] === "Myka")||(a===1 && "Logic" in z.boardObstacles)||(a===2 && "Intuition" in z.boardObstacles)||(a===3 && "Lore" in z.boardObstacles) ||
							     (a===4 && "Tech" in z.boardObstacles),mainMenu,(a)=>{
				drawTrait(me,a-1);
				mainMenu();
			});
		} else if(ch === "Play a Trait and put it in your Travel Bag"){
			let selection = [];
			for(let j = 0; !(j>=z.traitHands[me].length); j++){
				if(canPlayTrait(z.traitHands[me][j])){
					selection.push(j);
				}
			}
			let promptText = "Which Trait would you like to play and put in your Travel Bag? (1-"+selection.length+")";
			if(z.travelBag !== null){
				promptText += "\nThis will discard "+traitColored(z.travelBag)+", which is currently in your Travel Bag.";
			}
			selection.forEach((index,j)=>{
				promptText += "\n"+(j+1)+": ";
				promptText +=traitColored(z.traitHands[me][index]);
			});
			promptSelection(promptText,selection,(a)=>{
				let confirmText = "Confirming you want to play "+traitColored(z.traitHands[me][selection[a-1]])+" and put it in your Travel Bag.";
				if(isAction(z.traitHands[me][selection[a-1]])){
					confirmText += "\nThis requires an Action to play.";
				}
				confirmify(confirmText,mainMenu,()=>{
					boldAlert(z.players[me]+" plays "+traitColored(z.traitHands[me][selection[a-1]])+" into his Travel Bag.");
					if(traitText(z.traitHands[me][selection[a-1]]) === "The Caretaker"){
						z.theCaretaker = true;
					} else if(traitText(z.traitHands[me][selection[a-1]]) === "Collaborate"){
						z.collaborate = true;
					}
					if(z.travelBag !== null){
						plainAlert(z.players[me]+" discards "+traitColored(z.travelBag)+" from his Travel Bag.");
						z.traitDiscards[traitColor(z.travelBag)].unshift(z.travelBag);
						z.travelBag = null;
					}
					z.travelBag = z.traitHands[me].splice(selection[a-1],1)[0];
					mainMenu();
				});
				
			});
		} else if(ch === "Play a Trait"){
			let selection = [];
			for(let j = 0; !(j>=z.traitHands[me].length); j++){
				if(canPlayTrait(z.traitHands[me][j])){
					selection.push(j);
				}
			}
			if(z.players[me] === "Artie" && z.travelBag !== null){
				selection.push(-1);
			}
			let promptText = "Which Trait would you like to play? (1-"+selection.length+")";
			selection.forEach((index,j)=>{
				promptText += "\n"+(j+1)+": ";
				if(index === -1){
					promptText +=traitColored(z.travelBag) + " (Travel Bag)";
				} else {
					promptText +=traitColored(z.traitHands[me][index]);
				}
			});
			promptSelection(promptText,selection,(a)=>{
				if(selection[a-1] === -1){
					let confirmText = "Confirming you want to play "+traitColored(z.travelBag)+" from your Travel Bag.";
					if(isAction(z.travelBag)){
						confirmText += "\nThis requires an Action to play.";
					}
					confirmify(confirmText,mainMenu,()=>{
						boldAlert(z.players[me]+" plays "+traitColored(z.travelBag)+" from his Travel Bag.");
						if(traitText(z.travelBag) === "The Caretaker"){
							z.theCaretaker = true;
						} else if(traitText(z.travelBag) === "Collaborate"){
							z.collaborate = true;
						}
						z.traitDiscards[traitColor(z.travelBag)].unshift(z.travelBag);
						z.travelBag = null;
						mainMenu();
					});
				} else {
					let confirmText = "Confirming you want to play "+traitColored(z.traitHands[me][selection[a-1]])+".";
					if(isAction(z.traitHands[me][selection[a-1]])){
						confirmText += "\nThis requires an Action to play.";
					}
					confirmify(confirmText,mainMenu,()=>{
						boldAlert(z.players[me]+" plays "+traitColored(z.traitHands[me][selection[a-1]])+".");
						if(traitText(z.traitHands[me][selection[a-1]]) === "The Caretaker"){
							z.theCaretaker = true;
						} else if(traitText(z.traitHands[me][selection[a-1]]) === "Collaborate"){
							z.collaborate = true;
						}
						discardTrait(me,selection[a-1]);
						mainMenu();
					});
				}
			});
		} else if(ch === "Discard a Trait"){
			let selection = [];
			for(let j = 0; !(j>=z.traitHands[me].length); j++){
				if(traitColor(z.traitHands[me][j]) !== STRESS){
					selection.push(j);
				}
			}
			let promptText = "Which Trait would you like to discard? (1-"+selection.length+")";
			selection.forEach((index,j)=>{
				promptText += "\n"+(j+1)+": "+traitColored(z.traitHands[me][index]);
			});
			promptSelection(promptText,selection,(a)=>{
				let confirmText = "Confirming you want to discard "+traitColored(z.traitHands[me][selection[a-1]])+".";
				confirmify(confirmText,mainMenu,()=>{
					boldAlert(z.players[me]+" discards "+traitColored(z.traitHands[me][selection[a-1]])+".");
					discardTrait(me,selection[a-1]);
					mainMenu();
				});
			});
		} else if(ch === "Discard a random Trait"){
			confirmify("Confirming you want to discard a random Trait.",mainMenu,()=>{
				discardRandomTrait(me);
				mainMenu();
			});
		} else if(ch === "Draw Stress"){
			confirmify("Confirming you want to draw a Stress.",mainMenu,()=>{
				boldAlert(z.players[me] + " draws a Stress.");
				drawStress(me);
				mainMenu();
			});
		} else if(ch === "Discard Stress"){
			confirmify("Confirming you want to discard a Stress.",mainMenu,()=>{
				boldAlert(z.players[me] + " discards a Stress.");
				discardStress(me);
				mainMenu();
			});
		} else if (ch ==="Draw a discarded Trait"){
			let selection = [];
			for(let j = 0; !(j>=4); j++){
				if(z.traitDiscards[j].length > 0 && !isDamageCalamity(z.traitDiscards[j][0]) && !isNeutralizeCalamity(z.traitDiscards[j][0]) && (z.players[me] !== "Myka" || j !== INTUITION || 
																																				 (z.traitDiscards[LORE].length > 0 && 
																																				  traitText(z.traitDiscards[LORE][0]) === "The Restricted Files"))){
					selection.push(j);
				}
			}
			let promptText = "Which Trait would you like to take from the top of a discard pile? (1-"+selection.length+")";
			selection.forEach((type,j)=>{
				promptText += "\n"+(j+1)+": "+traitColored(z.traitDiscards[type][0]);
			});
			promptSelection(promptText,selection,(a)=>{
				plainAlert(z.players[me]+" picks up "+traitColored(z.traitDiscards[selection[a-1]][0])+".");
				z.possibleColors[me][selection[a-1]] = 1;
				z.traitHands[me].push(z.traitDiscards[selection[a-1]].shift());
				mainMenu();
			});
		} else if (ch === "Give a Trait to another player"){
			let promptText = "Who would you like to give a Trait to? (1-"+z.numPlayers+")\nIf this is from "+colorText("green","Farnsworth")+", make sure your recipient is willing.";
			for(let j = 0; !(j>=z.numPlayers); j++){
				promptText += "\n"+(j+1)+": ";
				if(j === me){
					promptText += "(yourself)";
				} else if(j === z.traitor){
					promptText += "(traitor)";
				} else if(j === z.bronzed){
					promptText += "(bronzed)";
				} else {
					promptText += z.players[j];
				}
			}
			promptNum(promptText,(a)=>1>a||a>z.numPlayers||a-1===me||a-1===z.traitor||a-1===z.bronzed,mainMenu,(a)=>{
				let promptText = "Which Trait would you like to give to "+z.players[a-1]+"? (1-"+z.traitHands[me].length+")";
				z.traitHands[me].forEach((trait,j)=>{
					promptText += "\n"+(j+1)+": "+traitColored(trait);
				});
				promptSelection(promptText,z.traitHands[me],(b)=>{
					let card = z.traitHands[me].splice(b-1,1)[0];
					z.traitHands[a-1].push(card);
					for(let j = 0; !(j>=z.possibleColors[me].length); j++){
						if(z.possibleColors[me][j] === 1){
							z.possibleColors[a-1][j] = 1;
						}
					}
					if(z.traitHands[me].length === 0){
						for(let j = 0; !(j>=z.possibleColors[me].length); j++){
							z.possibleColors[me][j] = 0;
						}
					}
					addAlert("You give "+traitColored(card)+" to "+z.players[a-1]+".");
					t.value += bold(z.players[me] +" gives a Trait to "+z.players[a-1]+".")+"\r\n";
					if(z.collaborate){
						delete z.collaborate;
					}
					mainMenu();
				});
			});
		}
	});
}
}, "Save and Quit");
}


// ENDSIS [/size] [/c]
		