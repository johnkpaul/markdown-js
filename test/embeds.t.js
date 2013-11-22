var parse_conde = require("../src/parse_conde");
var markdown = require("../src/markdown");
var prettyhtml = require("html").prettyPrint;

function test_dialect( dialect, features ) {
  var fs = require("fs"),
      path = require("path"),
      tap = require("tap");

  var slurpFile = function slurpFile( path ) {
    return fs.readFileSync( path, "utf8" );
  };

  var isFile = function isFile( f ) {
    try {
      return fs.statSync( f ).isFile();
    }
    catch (e) {
      if ( e.code === "ENOENT" )
        return false;
      throw e;
    }
  };


  tap.test( dialect, function(tap) {
    for ( var f in features ) {
      (function( feature ) {
        tap.test( feature, function(tap) {
          var test_path = path.join(__dirname, "features", feature);

          // grab all the test files in this feature
          var tests = fs.readdirSync( test_path );

          // filter to only the raw files
          tests = tests.filter( function( x ) {return x.match( /\.text$/ ); } );

          // remove the extensions
          tests = tests.map( function( x ) {return x.replace( /\.text$/, "" ); } );

          for ( var t in tests ) {
            // load the raw text
            var testName = dialect + "/" + feature + "/" + tests[ t ].substring( tests[ t ].lastIndexOf( "/" ) + 1 ),
                testFileBase = path.join(test_path, tests[ t ]),
                text = slurpFile( testFileBase + ".text" );

            // load the target output
            var html = slurpFile( testFileBase + ".html" );

            var convertors = {};
            convertors[feature] = require(testFileBase + ".js");
            var data = require(testFileBase + ".json");


            var outputHtml = parse_conde( text, convertors, data);

            tap.equivalent( prettyhtml(outputHtml), prettyhtml(html), testName, {todo: isFile( testFileBase + ".todo" )} );
          }
          tap.end();
        } );
      } )( features[ f ] );
    }
  });
}



var dialects = {};
dialects.Conde = [];
dialects.Conde.push( "video" );
dialects.Conde.push( "gallery" );

test_dialect( 'Conde', dialects[ 'Conde' ] );

