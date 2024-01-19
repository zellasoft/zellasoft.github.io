var Chat = {
    "Attach": function () { alert("Hi"); }
};


//function OnInput() {
//    this.style.height = 'auto';
//    this.style.height = (this.scrollHeight) + "px";
//}

//var tx = document.getElementsByTagName("textarea");
//for (let i = 0; i < tx.length; i++) {
//    tx[i].setAttribute("style", "height: " + (tx[i].scrollHeight) + "px; overflow-y: hidden;");
//    tx[i].addEventListener("input", OnInput, false);
//}


// Function to handle changes in viewport size
function handleViewportResize() {
    var keyboard = document.querySelector('static-ui');
    var isKeyboardOpen = window.innerHeight !== window.visualViewport.height;

    if (isKeyboardOpen) {
        // Adjust toolbar position when the keyboard is open
        //const keyboardHeight = window.innerHeight - window.visualViewport.height;
        //toolbar.style.bottom = keyboardHeight + 'px';
        keyboard.style.height = window.visualViewport.height + 'px';
    } else {
        // Reset toolbar position when the keyboard is closed
        keyboard.style.bottom = '0';
    }
}

// Attach the function to the resize event
window.addEventListener('resize', handleViewportResize);

// Initial call to set toolbar position based on the initial viewport size
handleViewportResize();
