
$(function() {
console.log("Doc ready called");
var div=document.createElement("div");
div.setAttribute("id","popup"); 
document.body.appendChild(div); 
//div.innerText="test123";
//////////////////////////////
var cr= [];
var desc = "";
$(document).on({

  'mouseup': function() {
    cr= [];
    cr= window.getSelection().getRangeAt(0).getClientRects();
    //console.log("Mouse up!");
    //console.log(cr);
    $.getJSON(
      'https://en.wikipedia.org/w/api.php?action=query&list=search&utf8=&format=json' +
      '&origin=*' + // <-- this is the magic ingredient!
      '&srsearch='+document.getSelection().toString(), function(data){ desc = data.query.search[0].snippet; }
    );
  },
  'mousemove': function(ev) {
    for(var i = 0 ; i < cr.length ; i++) {
      $('#popup').text('').hide();
      if(ev.pageX>= cr[i].left+ pageXOffset && ev.pageX<= cr[i].right+ pageXOffset &&
         ev.pageY >= cr[i].top+ pageYOffset  && ev.pageY<= cr[i].bottom+ pageYOffset
        ) {
          //console.log("In Area!!");
        $('#popup')
          .text(desc)
          .css({
            top: cr[0].top+ pageYOffset -$('#popup').outerHeight(),
            left: cr[0].left+ pageXOffset
          })
          .show();
        break;
      }
    }
   
  if (window.getSelection().toString()){
     //console.log("yessss");
    }else{
    cr = [];
    $('#popup').text('').hide();
    //console.log("Noooooooooo");
    } 
  }
});

/////////////////////////////

//document.addEventListener("keydown", keyDownTextField, false);
});

function keyDownTextField(e) {
  var keyCode = e.keyCode;
  if(e.shiftKey) {
    $.getJSON(
      'https://en.wikipedia.org/w/api.php?action=query&list=search&utf8=&format=json' +
      '&origin=*' + // <-- this is the magic ingredient!
      '&srsearch='+document.getSelection().toString(), function(data){ alert(data.query.search[0].snippet) }
    );
    } else {
  //alert("NO");
  }
}

/*chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
     console.log('working');
     $.getJSON(
      'https://en.wikipedia.org/w/api.php?action=query&list=search&utf8=&format=json' +
      '&origin=*' + // <-- this is the magic ingredient!
      '&srsearch=Engineer', function(data){ alert(data.query.search[0].snippet) }
    );
    console.log("At end of function");
      
    }
  }
);*/
