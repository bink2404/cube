/**
 * Notification that the UI is about to transition to a new page.
 * Perform custom prepage-transition logic here.
 * @param {String} currentPageId 
 * @param {String} targetPageId 
 * @returns {boolean} true to continue transtion; false to halt transition
 */
phoneui.prePageTransition = function(currentPageId,targetPageId) {
  // add custom pre-transition code here
  // return false to terminate transition
  return true;
}

/**
 * Notification that the UI has transition to a new page.
 * 
 * @param {String} newPageId 
 */
phoneui.postPageTransition = function(newPageId) {
  
}

/**
 * Notification that device orientation has changed. 
 * 
 * @param {String} newOrientation 
 */
phoneui.postOrientationChange = function(newOrientation) {
  
}

/**
 * Called when document is loaded.
 */
phoneui.documentReadyHandler = function() {
}

/**
 * Perform custom preprocessing or actions before submitting form. 
 * Common presubmission tasks include form validation and 
 * preprocessing of form data.
 * 
 * @param {boolean} true if all OK to proceed with form submission; 
 *                  false implies terminate form submission process
 * @param {Object} data results of form processing; error message if isSuccess == false
 * @return {boolean} true if OK; otherwise false
 */
phoneui.preSubmitForm_m1_test = function(form) {
  // add custom presubmission code here, e.g., form validation & error handling
  // return false to terminate form submission
  return true;
}

/**
 * Perform custom actions upon return from form submission.
 * 
 * @param {boolean} isSuccess true if all OK; otherwise false
 * @param {Object} data results of form processing; error message if isSuccess == false
 * @return {boolean} true if OK; otherwise false
 */
phoneui.postSubmitForm_m1_test = function(isSuccess, data) {
  // add custom postubmission processing code here,
  // e.g., parse and process results & update UI controls with data as needed
  // return false to terminate form processing
  var result = true;
  if (isSuccess) {
    // process data
    result = true;
  } else {
    // submit failed
    // data = error msg
    result = false;
  }
  return result;
}

    function displayDialog(d)
    {
      if (dialogDisplayed == 1)
      {
        return ;
      }

      dialogDisplayed = 1 ;

      document.getElementById(d).style.display='block' ;
    }

    function BlockMove(event) 
    {
      // Don't move the window.
      event.preventDefault() ;
    }

    function showInfo()
    {
      document.getElementById('gameover').innerHTML = "" ;

      if (browserType == 'M')
      {
        document.getElementById('info').innerHTML = "<center><img style=\"zIndex:2; position=absolute\" src=\"images/info_img.jpg\"></center>" ;
      }
      else
      {
        document.getElementById('info').innerHTML = "<center><img style=\"zIndex:2; position=absolute; margin-top: -50px;\" src=\"images/info_img.jpg\"></center>" ;
      }
    }

    function checkOrientation()
    {
      switch(window.orientation)
      {
           case 0:
             // Display message to rotate device
             document.getElementById('rotate2').style.display='block' ;
             break;

		   default :
             document.getElementById('rotate').style.display='none' ;
             document.getElementById('rotate2').style.display='none' ;
             break;
      }
    }


	var FastClick = (function() {

	// Determine whether touch handling is supported
	var touchSupport = 'ontouchstart' in window;

	return function(layer) {
		if (!(layer instanceof HTMLElement)) {
			throw new TypeError('Layer must be instance of HTMLElement');
		}

		// Set up event handlers as required
		if (touchSupport) {
			layer.addEventListener('touchstart', onTouchStart, true);
			layer.addEventListener('touchmove', onTouchMove, true);
			layer.addEventListener('touchend', onTouchEnd, true);
			layer.addEventListener('touchcancel', onTouchCancel, true);
		}
		layer.addEventListener('click', onClick, true);

		// If a handler is already declared in the element's onclick attribute, it will be fired before
		// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
		// adding it as listener.
		if (layer.onclick instanceof Function) {
			layer.addEventListener('click', layer.onclick, false);
			layer.onclick = '';
		}

		// Define touch-handling variables
		var clickStart = { x: 0, y: 0, scroll: 0 }, trackingClick = false;

		// On touch start, record the position and scroll offset.
		function onTouchStart(event) {
			trackingClick = true;
			clickStart.x = event.targetTouches[0].clientX;
			clickStart.y = event.targetTouches[0].clientY;
			clickStart.scroll = window.pageYOffset;

			return true;
		}

		// If the touch moves more than a small amount, cancel any derived clicks.
		function onTouchMove(event) {
			if (trackingClick) {
				if (Math.abs(event.targetTouches[0].clientX - clickStart.x) > 10 || Math.abs(event.targetTouches[0].clientY - clickStart.y) > 10) {
					trackingClick = false;
				}
			}

			return true;
		}

		// On touch end, determine whether to send a click event at once.
		function onTouchEnd(event) {
			var targetElement, clickEvent;

			// If the touch was cancelled (eg due to movement), or if the page has scrolled in the meantime, return.
			if (!trackingClick || Math.abs(window.pageYOffset - clickStart.scroll) > 5) {
				return true;
			}

			// Derive the element to click as a result of the touch.
			targetElement = document.elementFromPoint(clickStart.x, clickStart.y);

			// If the targeted node is a text node, target the parent insUd.
			if (targetElement.nodeType === Node.TEXT_NODE) {
				targetElement = targetElement.parentNode;
			}

			// Unless the element is marked as only requiring a non-programmatic click, synthesise a click
			// event, with an extra attribute so it can be tracked.
			if (!(targetElement.className.indexOf('clickevent') !== -1 && targetElement.className.indexOf('touchandclickevent') === -1)) {
				clickEvent = document.createEvent('MouseEvents');
				clickEvent.initMouseEvent('click', true, true, window, 1, 0, 0, clickStart.x, clickStart.y, false, false, false, false, 0, null);
				clickEvent.forwardedTouchEvent = true;
				targetElement.dispatchEvent(clickEvent);
			}

			// Prevent the actual click from going though - unless the target node is marked as requiring
			// real clicks or if it is a SELECT, in which case only non-programmatic clicks are permitted
			// to open the options list and so the original event is required.
			if (!(targetElement instanceof HTMLSelectElement) &&
				targetElement.className.indexOf('clickevent') === -1) {
				event.preventDefault();
			} else {
				return false;
			}
		}

		function onTouchCancel(event) {
			trackingClick = false;
		}

		// On actual clicks, determine whether this is a touch-generated click, a click action occurring
		// naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
		// an actual click which should be permitted.
		function onClick(event) {
			if (!window.event) {
				return true;
			}

			var allowClick = true;
			var targetElement;
			var forwardedTouchEvent = window.event.forwardedTouchEvent;

			// For devices with touch support, derive and check the target element to see whether the
			// click needs to be permitted; unless explicitly enabled, prevent non-touch click events
			// from triggering actions, to prevent ghost/doubleclicks.
			if (touchSupport) {
				targetElement = document.elementFromPoint(clickStart.x, clickStart.y);
				if (!targetElement ||
					(!forwardedTouchEvent && targetElement.className.indexOf('clickevent') == -1)) {
					allowClick = false;
				}
			}

			// If clicks are permitted, return true for the action to go through.
			if (allowClick) {
				return true;
			}

			// Otherwise cancel the event
			event.stopPropagation();
			event.preventDefault();

			// Prevent any user-added listeners declared on FastClick element from being fired.
			event.stopImmediatePropagation();

			return false;
		}
	}

})();

	// Code for mouse dragging 
    var dragobject=
	{ 
        z: 0, x: 0, y: 0, offsetx : null, offsety : null, targetobj : null, dragapproved : 0, 
        initialize:function()
		{ 
			document.ondragstart=this.drag 
			document.onmouseup=function(){this.dragapproved=0;} 
		}, 
		drag:function(e) 
		{ 
            var evtobj=window.event? window.event : e 
            this.targetobj=window.event? event.srcElement : e.target 
            if (this.targetobj.className=="drag") 
            { 
                    this.dragapproved=1 
                    if (isNaN(parseInt(this.targetobj.style.left))) 
                    { 
                            this.targetobj.style.left=0 
                    } 
                    if (isNaN(parseInt(this.targetobj.style.top))) 
                    { 
                            this.targetobj.style.top=0 
                    } 
                    this.offsetx=parseInt(this.targetobj.style.left) 
                    this.offsety=parseInt(this.targetobj.style.top) 
                    this.x=evtobj.clientX 
                    this.y=evtobj.clientY 
                    if (evtobj.preventDefault) 
                            evtobj.preventDefault() 
                    document.onmousemove=dragobject.moveit 
            } 
		}, 
		moveit:function(e) 
		{ 
            var evtobj=window.event? window.event : e 
            if ((this.dragapproved==1) && (dialogDisplayed != 1))
            { 
				var left = this.targetobj.style.left ; 
                var top = this.targetobj.style.top ; 

				// Check boundaries for player
                if ((this.offsetx+evtobj.clientX-this.x < (((imageSize * 16) / 2) - 9)) && 
                    (this.offsetx+evtobj.clientX-this.x > -(((imageSize * 16) / 2) - 9))) 
                { 
                        this.targetobj.style.left=this.offsetx+evtobj.clientX-this.x+"px" 
                } 

                if ((this.offsety+evtobj.clientY-this.y > -((imageSize * 9.4)) + 24) && 
                    (this.offsety+evtobj.clientY-this.y < 6)) 
                { 
                        this.targetobj.style.top=this.offsety+evtobj.clientY-this.y+"px" 
                } 

				// Calculate the distance moved in proportion to the field size
				var x = ((parseFloat(left) -  parseFloat(this.targetobj.style.left)) * flength) / (imageSize * 16) ;
				var y = ((parseFloat(top) -  parseFloat(this.targetobj.style.top)) * fwidth) / (imageSize * 9.4) ;

				var d = Math.sqrt(Math.pow(parseFloat(x), 2) + Math.pow(parseFloat(y), 2)) ; 

				if (!isNaN(parseInt(d)))
				{
					distance += parseFloat(d) ;
					document.getElementById('distance').innerHTML = distance.toFixed(1) ; 
				}

                return false 
            } 
		} 
	} 

	dragobject.initialize() 

	

