var $ = require('ep_etherpad-lite/static/js/rjquery').$;

// Bind the event handler to the toolbar buttons
exports.postAceInit = function(hook, context){
  padeditbar.registerDropdownCommand("template_content");
  var hs = $('#template_content-selection');
  hs.on('change', function(){
    var value = $(this).val();
    if(value >= 0){
      showInput(value);
    }
  })

  $('body').on("click", "#template_content-save", function(){
    // For each input type in the dropdown
    var inputs = $("#template_content > div > textarea:visible, #template_content > div > input:visible, #template_content > div > checkbox:visible");
    var content = "";
    $.each(inputs, function(i, val){
      _this = $(val);
      var label = $("label[for='"+$(_this).attr('id')+"']").text();
      var input = _this.val();
      content += label + ": "+input + "\n";
      console.warn(label, input);
    });
    placeContentInPad(content);
  });
};

function showInput(value){
  $("#template_content > div").hide(); // hide all others
  $("#template_content_"+value).show(); // show this input
  padeditbar.toggleDropDown("template_content");
}

function placeContentInPad(content){
  var padeditor = require('ep_etherpad-lite/static/js/pad_editor').padeditor;
  // Puts the completed form data in the pad.
  padeditor.ace.replaceRange(undefined, undefined, content);
  // Put the caret back into the pad
  padeditor.ace.focus();
}


