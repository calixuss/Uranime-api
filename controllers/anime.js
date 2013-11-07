/**
 * The Anime controller
 */

var crypto = require('crypto')
    , Q = require('q');


var addDetailsId = function(model){
    var json = model.toJSON();
    json.details_id = model.id;
    return json;
   }


AnimeController = {

   /*
    * GET anime by id.
    */
    getById: function(req,res){
         var Models =req.app.get("models");
        var id = req.params.id;
        Models.Anime.find(id).success(function(anime){
              res.send(addDetailsId(anime));
        });
   },

   /*
    * 
    */
   getDetailsById: function(req, res){
    var Models =req.app.get("models");
      var client = req.app.get("dbClient")
          ,id = req.params.id
          ,includeQuery = [Models.Episode]; 


        Models.Anime.find({where: {id:id}, include:includeQuery}).success(function(anime){

                var getSynonyms = function(anime){

                    var deferred = Q.defer();
                    anime.getAnimeSynonyms().success(function(synonyms){

                        deferred.resolve(synonyms);
                    });
                    return deferred.promise;
                };

                var getGenres = function(anime){

                    var deferred = Q.defer();
                    anime.getGenres().success(function(genres){

                        deferred.resolve(genres);
                    });
                    return deferred.promise;
                };
                 var getSeenEpisodes = function(anime){
                    var deferred = Q.defer();
                        Models.SeenEpisode.getByEpisodesWithUser(anime.episodes,client).success(function(seen){

                            var seenProper = Models.SeenEpisode.removePasswordEmailAddGravatarByArray(seen);
                            deferred.resolve(seenProper);
                        });
                    return deferred.promise;
                  };
                Q.all([getGenres(anime), getSeenEpisodes(anime), getSynonyms(anime)]).then(function(results){

                        var ret = anime.toJSON();
                        ret.genres = results[0];
                        ret.seen = results[1];
                        ret.synonyms = results[2];
                        ret.episodes = anime.episodes.map(addDetailsId);
                        
                        delete ret.title;
                        delete ret.desc;
                        delete ret.image;
                        delete ret.fanart;
                        delete ret.status;
                        delete ret.runtime;
                        delete ret.classification;
                        delete ret.type;

                        if(typeof(req.user) !== "undefined")
                            ret.loggedIn = "YEAH!!!";
                        
                        res.send(ret);
                   });

        });



   }
 

};

module.exports = AnimeController;




