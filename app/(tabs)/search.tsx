import { StyleSheet, Text, View ,Image} from "react-native";

import React from "react";
import { images } from "@/constants/images";
import { FlatList } from "react-native-reanimated/lib/typescript/Animated";
import MovieCard from "@/Components/MovieCard";
import useFetch from "@/Services/useFetch";
import { useRouter } from "@/.expo/types/router";
import { fetchMovies } from "@/Services/api";




const Search = () => {
 

     
    const router = useRouter(); 
    const {data:movies,
    loading:moviesLoading,
    error:moviesError }= useFetch(() =>fetchMovies({
    query : ''


}))
 

  return (
    <View className="flex-1 bg-primary">
     <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode="cover" />
     <FlatList data={movies} renderItem={({ item }) => <MovieCard {...item} />} />

    </View>
  );
};

export default Search;
const styles = StyleSheet.create({});