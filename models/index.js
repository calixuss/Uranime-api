module.exports = function(client)
{
     console.log("Hello");
    var Anime = require('./anime')(client),
        Episode = require('./episode')(client),
        Genre = require('./genre')(client),
        Synonym = require('./synonym')(client),
        SeenEpisode = require('./seenEpisode')(client),
        User = require('./user')(client),
        Site = require('./site')(client),
        Request = require('./request')(client),
        RequestAttribute = require('./requestAttribute')(client),
        RequestInfo = require('./requestInfo')(client),
        Token = require('./token')(client),
        ScrapeType = require('./scrapeType')(client);


    // Relationships

    Anime
      .hasMany(Episode)
      .hasMany(Genre, {joinTableName:'anime_genre'})
      .hasMany(Synonym);

    Episode
      .belongsTo(Anime)
      //.hasMany(User, {joinTableName:'user_episodes'});
      .hasMany(SeenEpisode);

    Genre
      .hasMany(Anime, {joinTableName:'anime_genre'});

    Request
      .hasMany(RequestInfo);

    RequestAttribute
      .belongsTo(RequestInfo);

    RequestInfo
      .hasMany(RequestAttribute, {foreignKey: 'anime_request_scrape_info_id'})
      .belongsTo(Request);

    SeenEpisode
      .belongsTo(User)
      .belongsTo(Episode);

    Synonym
      .belongsTo(Anime);

    User
      .hasMany(SeenEpisode)
      //.hasMany(Episode, {joinTableName:'user_episodes'});
      .hasOne(Token, { foreignKey: 'user_id'});

    Token
      .belongsTo(User);   


   


  return {
      Anime: Anime,
      Episode: Episode,
      Genre: Genre,
      Synonym: Synonym,
      SeenEpisode: SeenEpisode,
      User: User,
      Site: Site,
      Request: Request,
      RequestAttribute: RequestAttribute,
      RequestInfo: RequestInfo,
      ScrapeType: ScrapeType,
      Token: Token

    };
}
