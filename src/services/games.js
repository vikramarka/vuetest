const rapidAPIKey = '6f1bc4eafamsh8abd76fe2c2aad5p1dbb81jsn9472c10a0c70';
const rapidGamesAPIbase = 'https://rawg-video-games-database.p.rapidapi.com';
const rapidAPIHost = 'rawg-video-games-database.p.rapidapi.com';

const getGames = function() {
  return fetch(`${rapidGamesAPIbase}/games`, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': rapidAPIHost,
      'x-rapidapi-key': rapidAPIKey,
    },
  }).then((res) => res.json());
};

const getGameDetails = function(game_pk) {
  return fetch(`${rapidGamesAPIbase}/games/${game_pk}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': rapidAPIHost,
      'x-rapidapi-key': rapidAPIKey,
    },
  }).then((res) => res.json);
};

export { getGames, getGameDetails };
