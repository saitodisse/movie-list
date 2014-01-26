movie-list
==========

My movie collection - backbone.js and elastic-search

#pre-require:

    export XBMC videodb.xml
    https://github.com/saitodisse/elasticXbmcMoviesImporter

#on linux:

	install:
	oracle java 7
	http://www.elasticsearch.org/download/
	http://nodejs.org/
	node server.js

#on windows:
   
   install:
   http://www.java.com/pt_BR/download/manual.jsp#win
   http://www.elasticsearch.org/download/
   http://nodejs.org/

   run:
   elasticsearch-0.90.10\bin\elasticsearch.bat
   node server.js