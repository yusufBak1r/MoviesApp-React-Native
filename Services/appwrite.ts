import { Client, Databases, ID, Query } from "appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;



const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const databases = new Databases(client);
  

export const updateSearchCount = async (query: string, movie: Movie) => {


  try {
    const result = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [
        Query.limit(100),
        Query.equal("searchTerm", [query]), 
      ]
    )
    if (result.documents.length > 0) {
            console.log("updateSearchCount called with query:", query);

           const existingMovie = result.documents[0];
            await databases.updateDocument(
            DATABASE_ID,
            COLLECTION_ID,
            existingMovie.$id,
            { 
              count: (existingMovie.count + 1),
            }

);

    }else {

           console.log("Creating new document for query:", query);

                    await databases.createDocument(
                    DATABASE_ID,
                    COLLECTION_ID,
                    ID.unique(),
                    {
                        searchTerm: query,
                        count: 1,
                        movie_Id: movie.id,
                        title: movie.title,
                        poster_url: 'https://image.tmdb.org/t/p/w500' + (movie?.poster_path || ''),
                  
                    }
                    );

    }
  } catch (error) {
    console.error("Error fetching rows:", error);
  }
};

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> =>  {
    try {
      const result = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [
        Query.limit(100),
        Query.orderDesc("count"), 
      ]);
       
        return result.documents as unknown as TrendingMovie[];
    } catch (error) {
        console.error("Error fetching trending movies:", error);
        return undefined;
       
        
    }
    
}