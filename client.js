'use strict';

const eejs = require('ep_etherpad-lite/node/eejs/');

exports.eejsBlock_editbarMenuLeft = (hookName, args, cb) => {
  args.content += eejs.require('ep_template_content/templates/editbarButtons.ejs');
  return cb();
};

exports.eejsBlock_body = (hookName, args, cb) => {
  args.content += eejs.require('ep_template_content/templates/template_content_input.ejs');
  return cb();
};

exports.eejsBlock_styles = (hookName, args, cb) => {
  args.content +=
      '<link href="' +
      '../static/plugins/ep_template_content/static/css/template_content.css' +
      '" rel="stylesheet">';
};
