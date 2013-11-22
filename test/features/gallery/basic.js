module.exports = exports = function(meta, data){

  var html = "<div>"+
    "  <ul>"+
    "    <li><img src='"+data.items[0].photo.original.url+"'></li>"+
    "  </ul>"+
    "  <div>"+ meta.caption+ "</div>"+
    "</div>";
  return html;
};

