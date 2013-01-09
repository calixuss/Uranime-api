var crypto = require('crypto');
var orm = require('orm');

/*
 * GET anime listing.
 */

exports.getById = function(req, res){
  /*var r = db.models.Anime.find({
    where:{'anime.id':req.params.id},
    include: ['Episodes', 'Synonyms']
  }).success(function(anime){
    var ret = anime.toJSON();
    ret.genres = anime.genres;
    ret.synonyms = anime.synonyms;
    ret.episodes = anime.episodes;
    res.send(ret);
  });*/
/*
Database=uranime;Data Source=eu-cdbr-azure-north-a.cloudapp.net;User Id=bf11d1e3cb93a7;Password=0783be81
  orm.connect("mysql://anime-api:test@10.0.0.201/groenlid_anime", function (err, db) {
      if (err) throw err;

      var Anime = db.define('anime', {
          title      : String
      });

      Person.get(req.params.id, function (err, anime) {
          // SQL: "SELECT * FROM person WHERE surname = 'Doe'"

          console.log("anime found: %d", anime);
          res.send(anime);
      });
  });*/

  
  var r = db.models.Anime.find(req.params.id).success(function(anime){
    anime.getEpisodes().success(function(episodes){
      anime.getGenres().success(function(genres){
        anime.getSynonyms().success(function(synonyms){
          var ids, query;
          ids = function(array){
              var r = [];
              console.log(array.length);
              for(var i = 0; i < array.length; i++)
                r.push(array[i].id);
              return r;
            }
          query = "SELECT count(*) as amount, MAX(timestamp) as last, user_id, u.id, nick, email " +
                  "FROM user_episodes " +
                  "LEFT JOIN users u ON(user_id = u.id) " +
                  "WHERE episode_id IN (" + ids(episodes) + ") " +
                  "GROUP BY user_id " +
                  "ORDER BY last DESC " +
                  "LIMIT 0,10";

          db.client.query(query).success(function(seen){
          
            var ret = anime.toJSON();
            ret.episodes = episodes;
            ret.genre = genres;
            ret.synonyms = synonyms;
            
            for(var i = 0; i < seen.length; i++)
            {
              var email = "" + seen[i].email;
              delete seen[i].email;

              // Add gravatar
              var md5sum = crypto.createHash('md5');
              md5sum.update(email);
              seen[i].gravatar = "http://www.gravatar.com/avatar/" + md5sum.digest('hex');
            }
            
            ret.last_seen = seen;
            res.send(ret);
          });
        })
      });
    })
  });


};