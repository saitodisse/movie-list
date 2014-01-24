'use strict';
(function () {

    var elasticsearch = require('elasticsearch');
    var q = require('q');

    var MovieApi = function () {
    };

    var client = new elasticsearch.Client({
        host: 'localhost:9200'
        //, log: 'trace'
    });

    var searchQuery = function (options) {
        var defer = q.defer();
        var query = options.query;
        var size = options.size || 30;

        client.search({
            index: 'movies',
            type: 'movie',
            size: size,
            sort: 'imdbInfo.rating:desc',
            body: {
                query: {
                    query_string: {
                        query: query
                    }
                }
            }
        }, function (error, response) {
            if (error) {
                // handle error
                console.log('ERROR:', error);
                return defer.reject(error);
            }
          
            var results = [];
            for (var i = 0; i < response.hits.hits.length; i++) {
                var hit = response.hits.hits[i];
                var source = hit._source;

                //switch ID x idImdb
                source.idImdb = source.id;
                source.id = parseInt(hit._id, 10);

                source.year = source.year[0];
                source.title = source.title[0];
                source.originaltitle = source.originaltitle && source.originaltitle[0];
                source.director = source.director.join(', ');
                source.tagline = source.tagline[0];
                source.basepath = source.basepath[0];
                source.country = source.country[0];
                source.imdbRating = source.imdbInfo.rating;
                source.idImdb = source.idImdb[0];

                if (source.thumb.length > 0) {
                    source.firstThumb = source.thumb[0].prevThumb;
                    source.fullImage = source.thumb[0].prevThumb;
                }

                results.push(source);
            }
            return defer.resolve(results);
        });

        return defer.promise;
    };


    MovieApi.prototype.getList = function (req, res) {
        searchQuery({
            query: req.query.query
        }).then(function (results) {
            res.send(results);
        });
    };

    MovieApi.prototype.getAll = function (req, res) {
        searchQuery({
            query: req.query.query,
            size: 1000
        }).then(function (results) {
            res.send(results);
        });
    };

    MovieApi.prototype.getMovie = function (req, res) {
        res.send('{"title":"My Movie"}');
    };

    module.exports = MovieApi;

})();