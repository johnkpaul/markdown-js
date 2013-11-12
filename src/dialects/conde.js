if (typeof define !== 'function') { var define = require('amdefine')(module) }
define(['../markdown_helpers', './dialect_helpers', './gruber', '../parser'], function (MarkdownHelpers, DialectHelpers, Gruber, Markdown) {

  var Conde = DialectHelpers.subclassDialect( Gruber ),
      extract_attr = MarkdownHelpers.extract_attr,
      forEach = MarkdownHelpers.forEach;

  var jsonmlFromHTMLText = require('../../lib/jsonml/jsonml-dom').fromHTMLText;



  Conde.block.video = function video ( block ) {
    var converter = Conde.embedConverters.video;
    if(/#video:/.test(block)){
      var matches = block.match(/\[#video:\s?(\S+)\]\((\d+)x(\d+)\)\|\|\|([\S\s]*)\|\|\|/);
      var url = matches[1];
      var height = matches[2];
      var width = matches[3];
      var innermarkdown = matches[4];
      var caption = Markdown.toHTML(innermarkdown);
      var jsonml = jsonmlFromHTMLText(converter({
        url: url,
        height: height,
        width: width,
        caption: caption,
      })).filter(function(el){return el !== "";});

      return jsonml;
    }
    else{
      return undefined;
    }
  };


  Markdown.dialects.Conde = Conde;
  Markdown.dialects.Conde.inline.__escape__ = /^\\[\\`\*_{}\[\]()#\+.!\-|:]/;
  Markdown.buildBlockOrder ( Markdown.dialects.Conde.block );
  Markdown.buildInlinePatterns( Markdown.dialects.Conde.inline );

  return Conde;
});
