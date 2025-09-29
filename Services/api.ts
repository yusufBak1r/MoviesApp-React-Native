 
 export const TMDB_CONFIG = {
  BASE_URL : 'https://api.themoviedb.org/3',
  API_KEY  : process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers : {
    accept : 'application/json',
   Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  }
 }




export const fetchMovies = async ({ query }: { query: string }) => {
  
    const endpoint =  query    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
                               :  `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc&query=${query}`;
    
    const response = await fetch(endpoint, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
    }
     
    const data = await response.json();
    
    return data.results;
 
};

{/*

const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzY5MzRjZmNkYzRhNTRhYTU2Mjg0ZjE2MjYzN2EzZSIsIm5iZiI6MTcxMDUzNjQ1OC41OTEsInN1YiI6IjY1ZjRiNzBhNTllOGE5MDE0OTE4ZTY3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._EYDruu3FCK0Qr4C6uMUorn4U6PohJUv7CdcUhU5QX0'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));*/}