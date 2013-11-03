module.exports = function(app){

    var Anime = require('./anime')(app),
        Episode = require('./episode')(app),
        Genre = require('./genre')(app),
        Synonym = require('./synonym')(app),
        SeenEpisode = require('./seenEpisode')(app),
        User = require('./user')(app),
        Site = require('./site')(app),
        Request = require('./request')(app),
        RequestAttribute = require('./requestAttribute')(app),
        RequestInfo = require('./requestInfo')(app),
        Token = require('./token')(app),
        ScrapeType = require('./scrapeType')(app);


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
