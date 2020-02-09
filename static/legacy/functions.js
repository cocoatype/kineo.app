var signupIsShowing = "NO";
var currentAnimation = 1;
var animationCount = 2;

function showSignup()
{
	
	//This fixes a bug where Firefox won't show these (loads stylesheet after our init function runs)
	document.getElementById('text-box').style.opacity = 1;
	document.getElementById('submit-button').style.opacity = 1;
	
	var emailBox = document.getElementById('text-box');
	if (signupIsShowing == "YES" && emailBox.value == "") {
		document.getElementById('icon').style.marginTop = '-181px';
		signupIsShowing = "NO";
		return false;
	}
	
	if (signupIsShowing == "NO") {
		document.getElementById('icon').style.marginTop = '-230px';
		emailBox.focus();
		signupIsShowing = "YES";
	}

	
	
}


function keyHandler()
{
	var kC  = (window.event) ?    // MSIE or Firefox?
                event.keyCode : e.keyCode;
     var Esc = (window.event) ?   
               27 : e.DOM_VK_ESCAPE // MSIE : Firefox
	
	var emailBox = document.getElementById('text-box');
     if(kC==Esc) {
     	if (aboutBubblesAreShowing == "1") {
			toggleAboutBubbles();
		}
	 }
	 
}


function postEmail() 
{
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	}
	if (xhr) {
		
		var email = document.getElementById('text-box').value;
		var sendE = "email="+email;
		
		xhr.onreadystatechange = success;
		xhr.open("POST", "post.php", true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.setRequestHeader("Content-length", sendE.length);
		xhr.setRequestHeader("Connection", "close");
	
		xhr.send(sendE);
		setTimeout("document.getElementById('text-box').value = ''", 1200);
	}
}

function init()
{
	checkBrowser();
	checkWidth();
	startAnimation();
	document.getElementById('submit-button').style.opacity = 1;
	document.getElementById('text-box').style.opacity = 1;
	document.getElementById('tag').style.opacity = 1;
	
	animation1= new Image(1920,117); 
	animation1.src="http://flipbookapp.com/images/animation1.png";
	
	animation2= new Image(2880,117); 
	animation2.src="http://flipbookapp.com/images/animation2.png";
	
}

var aboutBubblesAreShowing = 0;
function toggleAboutBubbles ()
{	
	if (aboutBubblesAreShowing == 1) {
		document.getElementById('geoffBubble').style.opacity = 0;
		document.getElementById('ollieBubble').style.opacity = 0;
		aboutBubblesAreShowing = 0;
		return;
	}
	
	document.getElementById('ollieBubble').style.opacity = 1;
	setTimeout("document.getElementById('geoffBubble').style.opacity = 1", 2000);
	aboutBubblesAreShowing = 1;
}

function hideAboutBubbles () {
	aboutBubblesAreShowing = 1;
	toggleAboutBubbles();
}


function darkenButton ()
{
	document.getElementById('buttonContainer').style.opacity = .8;
}

function returnButtonToNormal ()
{
	document.getElementById('buttonContainer').style.opacity = .6;
}

var startPosition = 0;
function startAnimation()
{
	setTimeout("incrementAnimation()", 100);
}


function incrementAnimation ()
{
		startPosition = startPosition - 160;
		document.getElementById('animation').style.backgroundPosition = startPosition+"px 0px";
		startAnimation();
}

function checkWidth()
{
	var copyright = document.getElementById('copyright');
	//window.console.log(window.document.width);
	if (window.document.width < 590) {
		copyright.style.opacity = 0;
		hideAboutBubbles();
	} else {
			copyright.style.opacity = 1;
	}
	
}

//Flickbook
var iTunesURL = "http://phobos.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=286948844&mt=8";

function launchInStore ()
{
	window.location = iTunesURL;
}

function darkenTopTag ()
{
	document.getElementById('seeTheVideoTourBacking').style.opacity = .6;
}

function returnTopTagToNormal ()
{
	document.getElementById('seeTheVideoTourBacking').style.opacity = .5;
}

function launchTour ()
{
	window.open("preview.html","Flickbook in Action","menubar=no,width=635,height=760,toolbar=no,resize=no,scrollbars=no");
}

function darkenTricks ()
{
	document.getElementById('tipsAndTricksBacking').style.opacity = .6
}

function returnTricksToNormal ()
{
	document.getElementById('tipsAndTricksBacking').style.opacity = .5
}

function launchTips ()
{
	window.open("tipsandtricks.html","Tips and Tricks","menubar=no,width=858,height=407,toolbar=no,resize=no,scrollbars=no");
}


function cycleThroughAnimations ()
{
	if (currentAnimation == animationCount) {
		currentAnimation = 1;
		document.getElementById('animation').style.backgroundImage = "url(images/animation"+currentAnimation+".png)";
		///document.getElementById('animation').style.backgroundImage = animation1;
		return;
	}
	currentAnimation ++;
	document.getElementById('animation').style.backgroundImage = "url(images/animation"+currentAnimation+".png)";
	//document.getElementById('animation').style.backgroundImage = animation2;
}

function success()
{
	var emailBox = document.getElementById('text-box');
	if (signupIsShowing == "YES" && emailBox.value != "") {
		document.getElementById('icon').style.marginTop = '-181px';
		document.getElementById('tu').style.opacity =1;
		signupIsShowing = "NO";
		postEmail();
		return false;
		
	}
}

function checkBrowser() {
	if (BrowserDetect.browser == "Explorer") {
		//IE... I mean, come on... honestly?
		window.location = iTunesURL;	
	}
}

//browser detect

var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari"
		},
		{
			prop: window.opera,
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();
