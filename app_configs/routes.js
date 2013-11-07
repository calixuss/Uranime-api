/*
 * The route fila, here we define all the url routes the express instance will handle
 */


module.exports = function(app){

/*
 * Define all route urls-en and pass it to the controllers
 */

var Controllers = app.get("controllers");

app.get("/",Controllers.Index.index);

//Anime route
app.get('/api/anime/:id', app.get("Auth").token, Controllers.Anime.getById);

//AnimeDetails
app.get('/api/animeDetails/:id', Controllers.Anime.getDetailsById);

//Episode
app.get('/api/episodes/:id', Controllers.Episode.getById);
app.get('/api/episodeDetails/:id', Controllers.Episode.getDetailsById);
app.get('/api/episodes', Controllers.Episode.getByParams);
app.get('/api/users/:id', Controllers.User.getById);
app.get('/api/libraries/:id', Controllers.User.getLibrary);
app.get('/api/libraries', Controllers.User.getLibrary);
app.get('/api/users', Controllers.User.list);
app.get('/api/search', Controllers.Search.doSearch);
app.get('/api/userEpisodes', Controllers.UserEpisode.getFeed);
app.get('/api/requests', Controllers.Request.getRequests);
app.get('/api/request_types/:id', Controllers.Request.getRequestTypeById);
app.get('/api/sites/:id', Controllers.Request.getSiteById);
app.post('/api/signin', app.get("Auth").signin);

}