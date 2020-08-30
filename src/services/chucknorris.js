export default function getRandomChuckNorrisJoke() {
  return fetch(
    'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random',
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com',
        'x-rapidapi-key': '6f1bc4eafamsh8abd76fe2c2aad5p1dbb81jsn9472c10a0c70',
        accept: 'application/json',
      },
    }
  ).then((res) => res.json());
}
