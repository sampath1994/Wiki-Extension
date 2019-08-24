
$(function() {
console.log("Doc ready called");
var div=document.createElement("div");
div.setAttribute("id","popup"); 
document.body.appendChild(div); 
//div.innerText="test123";
//////////////////////////////
var cr= [];
var desc = "";
var flag = false;
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
      if(!flag){
      $('#popup').text('').hide();
      }
      if(ev.pageX>= cr[i].left+ pageXOffset && ev.pageX<= cr[i].right+ pageXOffset &&
         ev.pageY >= cr[i].top+ pageYOffset  && ev.pageY<= cr[i].bottom+ pageYOffset
        ) {
          //console.log("In Area!!");
        newFunction(desc, cr);
        break;
      }
    }
   
  if (window.getSelection().toString()){
    $('#popup').mouseover(function(){
      newFunction(desc, cr);
      flag = true;
      //console.log("in popup!!");
    }).mouseleave(function(){
      $('#popup').text('').hide();
      flag = false;
    });
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

function newFunction(desc, cr) {
  $('#popup')
    .html(desc)
    .css({
      top: cr[0].top + pageYOffset - $('#popup').outerHeight(),
      left: cr[0].left + pageXOffset
    });
  //console.log("outerWidth " + $('#popup').outerWidth());
  //console.log("Inner width " + window.innerWidth);
  var popupX = cr[0].left + pageXOffset;
  var popupY = cr[0].top + pageYOffset - $('#popup').outerHeight();
  if ((popupX + $('#popup').outerWidth()) < window.innerWidth) {
    $('#popup')
      .html(desc)
      .css({
        top: cr[0].top + pageYOffset - $('#popup').outerHeight(),
        left: cr[0].left + pageXOffset
      }).show();
  }
  else {
    $('#popup')
      .html(desc)
      .css({
        top: cr[0].top + pageYOffset - $('#popup').outerHeight(),
        left: cr[0].right + pageXOffset - $('#popup').outerWidth()
      }).show();
  }
}

/*function keyDownTextField(e) {
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
}*/

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
