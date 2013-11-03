/*
 * GET feed of seen episodes.
 */

exports.getFeed = function(req, res){
  var SeenEpisode = req.app.get("models").SeenEpisode;

  // Simple first.. Get last 10 seen episodes..
   SeenEpisode.findAll({limit:10, order: 'id DESC'}).success(function(seenEpisodes){
        var ret = [];

        seenEpisodes.forEach(function(seenEpisode, i){
            seenEpisode = seenEpisode.toJSON();

            ret.push(seenEpisode);
        });
        
        res.send(ret);
    
  });
};

exports.getBySearchQuery = function(req, res){
 
};
