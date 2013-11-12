module.exports = exports = function(meta, data){
  var html = "<div>"+meta.caption+"</div>"
              + "<iframe height="+meta.height+" width="+meta.width
              + " src='"+meta.url+"'></iframe>";
  return html;
};

