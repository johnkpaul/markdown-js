var markdown = require('../src/markdown');

module.exports = exports = function(text, convertors, data){
  markdown.dialects.Conde.embedConverters = convertors;
  
  var tree = markdown.toHTMLTree(text, 'Conde');
  return markdown.renderJsonML(tree);
};
