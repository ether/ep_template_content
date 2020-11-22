var $ = require('ep_etherpad-lite/static/js/rjquery').$;

// Bind the event handler to the toolbar buttons
exports.postAceInit = function (hook, context) {
  // Register UI elements and listeners
  padeditbar.registerDropdownCommand('template_content');
  const hs = $('#template_content-selection');
  hs.on('change', function () {
    const value = $(this).val();
    if (value >= 0) {
      // set the current highlighted text to a value
      template_content.getHighlighted(context);
      template_content.showInput(value);
    }
  });

  $('body').on('click', '#template_content-save', () => {
    // get the input contents
    template_content.getInputContents((content) => {
      // write the input contents
      template_content.placeContentInPad(content);
    });
    $('#template_content-selection').val(-1);
  });

  $('body').on('click', '#template_content-cancel', () => {
    padeditbar.toggleDropDown('template_content');
    $('#template_content-selection').val(-1);
  });
};

var template_content = {

  getHighlighted(context) {
    self.highLightedString = '';
    context.ace.callWithAce((ace) => {
      const rep = ace.ace_getRep();
      const line = rep.lines.atIndex(rep.selStart[0]);
      self.highLightedString = line.text.substring(rep.selStart[1], rep.selEnd[1]);
      console.warn(self.highLightedString);
    }, 'template_content_highLight', true);
  },

  getInputContents(cb) {
    // For each input type in the dropdown
    const inputs = $('#template_content > div > textarea:visible, #template_content > div > input:visible, #template_content > div > checkbox:visible');
    let content = '';
    $.each(inputs, (i, val) => {
      _this = $(val);
      const label = $(`label[for='${$(_this).attr('id')}']`).text();
      const input = _this.val();
      content += `${label}: ${input}\n`;
      console.warn(label, input);
    });
    cb(content);
  },

  showInput(value) {
    const padeditor = require('ep_etherpad-lite/static/js/pad_editor').padeditor;
    console.warn('ace', padeditor.ace);

    $('#template_content > div').hide(); // hide all others
    $(`#template_content_${value}`).show(); // show this input
    padeditbar.toggleDropDown('template_content');

    // If highLigtedString is available pre-populate first input..
    if (self.highLightedString) {
      // Set the first input as the value
      const inputs = $('#template_content > div > textarea:visible, #template_content > div > input:visible, #template_content > div > checkbox:visible');
      $(inputs[0]).val(self.highLightedString);
    }
  },

  placeContentInPad(content) {
    const padeditor = require('ep_etherpad-lite/static/js/pad_editor').padeditor;
    // Puts the completed form data in the pad.
    padeditor.ace.replaceRange(undefined, undefined, content);
    // Put the caret back into the pad
    padeditor.ace.focus();
  },

  highLightedString: '',
};
