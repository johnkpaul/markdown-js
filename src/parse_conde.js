var markdown = require('../src/markdown');

module.exports = exports = function(text, convertors, data){
  markdown.dialects.Conde.embedConverters = convertors;
  markdown.dialects.Conde.data = data;
  
  var tree = markdown.toHTMLTree(text, 'Conde');
  return markdown.renderJsonML(tree);
};
