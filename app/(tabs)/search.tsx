import { StyleSheet, Text, View ,Image, FlatList, ActivityIndicatorBase, ActivityIndicator} from "react-native";


import useFetch from "@/Services/useFetch";

import { fetchMovies } from "@/Services/api";
import { images } from "@/constants/images";
import MovieCard from "@/Components/MovieCard";
import { useRouter } from "expo-router";
import { icons } from "@/constants/icons";
import SearchBar from "@/Components/SearchBar";
import { useEffect, useState } from "react";
import { updateSearchCount } from "@/Services/appwrite";





const Search = () => {


const [searchQuery, setSearchQuery] = useState('');

  const router = useRouter();
    const {data:movies,
    loading,
    refetch :loadMovies,
    error,
    reset
   }= useFetch(() =>fetchMovies({
    query : searchQuery


}),false)
 
useEffect(() => {


 

  const timeoutId = setTimeout(async () => {
  if (searchQuery.trim()) {
    await loadMovies();

     

  }else { reset();}

  }, 800); 
  return () => clearTimeout(timeoutId);
}, [searchQuery]);

useEffect(()=>{


        if (movies?.length > 0 && movies?.[0]) {
        
        updateSearchCount(searchQuery, movies[0]);
      } else {
        console.log("Movies listesi boş, updateSearchCount çağrılmadı.");
      }
},[movies])




  return (
    <View className="flex-1 bg-primary">
    <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode="cover" />
      <FlatList data={movies}
       renderItem={({ item }) => <MovieCard {...item} />}
       
       keyExtractor={(item) => item.id.toString() }
       className="px-5"
       numColumns={3}
       columnWrapperStyle={{ justifyContent: 'center', gap: 16, marginVertical: 16 }}
       contentContainerStyle={{ paddingBottom: 100 }}
       ListEmptyComponent={

        !loading && !error && searchQuery.trim() ? (
         <View className="mt-20 px-5">
          <Text className="text-center text-gray-500"> {searchQuery.trim()  ? 'No movies found' : 'Start searching for movies!'}
         
          </Text>
         </View>
        ) : null
      

       }
       ListHeaderComponent={
       <> 
       
       <View className="w-full flex-row justify-center mt-20 items-center"> 
         <Image source={icons.logo} className="w-24 h-10" />
         </View>

            <View className="my-5">
               <SearchBar placeholder="Search Movies" value={searchQuery} onChangeText={(text:string) => setSearchQuery(text)} />
               </View>

              

        {loading && (<ActivityIndicator size="large" color={"#0000ff"} className="mş-3"></ActivityIndicator>)}
        {error && <Text className="text-white text-lg font-bold">{error.message}</Text>}  
        {!loading && !error && searchQuery.trim() && movies?.length > 0 ?(<Text className="text-white text-lg font-bold">Search Result {''}

   <Text className="text-accent">{searchQuery}</Text>

        </Text>) : null}

       
       </>
      
      
      
      }
       
       />
     

    </View>
  );
};

export default Search;
