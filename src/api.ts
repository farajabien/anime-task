export const getAnimeList = async (): Promise<Anime[]> => {
  const response = await fetch('https://api.jikan.moe/v4/top/anime');
  const data = await response.json();

  
  const animeArray = data.data;

  return animeArray.slice(0, 20);
}

type Anime = {
  rank: number;
  images: {
    jpg: {
      image_url: string
    }
  }
    title: string;
    aired:{
      from: string
      to: string
    }
    rating: string
}
