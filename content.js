var activated = true;
$(function() {
console.log("Doc ready called");

chrome.storage.sync.get(['wiki_activate'], function(items) {
  console.log('storage value' + items.wiki_activate);
  if(items.wiki_activate === 'true'){
    activated = true;
  }else{
    activated = false;
  }
});

var div=document.createElement("div");
div.setAttribute("id","popup"); 
document.body.appendChild(div); 

//////////////////////////////
var cr= [];
var desc = "";
var flag = false;
$(document).on({

  'mouseup': function() {
    if(activated){
    cr= [];
    cr= window.getSelection().getRangeAt(0).getClientRects();
    var pgid;
    var full_link;
    //console.log("Mouse up!");
    //console.log(cr);
    $.getJSON(
      'https://en.wikipedia.org/w/api.php?action=query&list=search&utf8=&format=json' +
      '&origin=*' + // <-- this is the magic ingredient!
      '&srsearch='+document.getSelection().toString(), function(data){ desc = data.query.search[0].snippet;
        pgid = data.query.search[0].pageid;
        
        $.getJSON(
      'https://en.wikipedia.org/w/api.php?action=query&prop=info&inprop=url&format=json' +
      '&origin=*' + // <-- this is the magic ingredient!
      '&pageids='+pgid, function(data){ full_link = data.query.pages[pgid].fullurl; 
      desc = desc+ "<a onmousedown=\"window.open('"+full_link+"', '_blank')\" style=\"color:yellow;\" href=\"#\" target=\"_blank\">...more</a>";
      //newFunction(desc, cr); 
    }
        );

      }
    );
    }
  },
  'mousemove': function(ev) {
    if(activated){
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
     // newFunction(desc, cr);
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
  }
});

/////////////////////////////

//document.addEventListener("keydown", keyDownTextField, false);

});

function newFunction(desc, cr) {
  //console.log(desc);
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

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action_activate" ) {
      activated = true;
      console.log("activated!");
    }else{
      activated = false;
      console.log("deactivated!");
    }
  }
);
