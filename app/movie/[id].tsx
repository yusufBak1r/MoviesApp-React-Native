import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/Services/api";
import useFetch from "@/Services/useFetch";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text, View, Image, ActivityIndicator, TouchableOpacity } from "react-native";

interface MovieInfoProps {
 label : string;
 value : string | number | null;


}
  
const MovieInfo = ({label, value}: MovieInfoProps) =>   (


<View className="flex-col items-start justify-center gap-x-1 mt-2">
<Text className="text-light-200 text-sm font-normal">{label}</Text>
  <Text className="text-light-100 text-sm font-bold mt-2">{value || 'N/A'}</Text>


</View>


  )


const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const { data: movie, loading, error } = useFetch(() => fetchMovieDetails(id as string));

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <ActivityIndicator size="large" color="#fff" />
        <Text className="text-white mt-2">Yükleniyor...</Text>
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <Text className="text-white">Film bulunamadı.</Text>
      </View>
    );
  }

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            className="w-full h-[550px]"
            resizeMode="stretch"
            source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
          />
        </View>
        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="font-bold text-white text-xl">{movie.title}</Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {movie.release_date ? movie.release_date.split("-")[0] : ""}
            </Text>
            <Text className="text-light-200 text-sm">{movie.runtime} min</Text>
          </View>
          <View className="flex-row items-center bg-dark-100 px-2 py-3 rounded-md gap-x-1">
            <Text className="text-light-200 text-sm">
       
            </Text>
                 <Image className="size-4" source={icons.star} />

                      <Text className="text-white font-bold text-sm">
              {Math.round(movie.vote_average * 10) / 10}
            </Text>



              <Text className="text-white font-bold text-sm">
              {` (${movie.vote_count} votes)`}
            </Text>

          </View>

    <MovieInfo label="Overview" value={movie.overview} /> 
    <MovieInfo label="Genres" value={movie.genres.map((genre) => genre.name).join(", ")} />
     <View className="flex flex-row justify-between w-1/2 mt-2">
  <MovieInfo label="Budget" value={`$${(movie?.budget / 1_000_000).toFixed(2)}M`} />

  <MovieInfo label="Revenue" value={`$${(Math.round(movie?.revenue / 1_000_000).toFixed(2) )}M`} />

   
        </View>
         <MovieInfo label="Production" value={movie.production_companies.map((company) => company.name).join("-  ")} />
         </View>
      </ScrollView>
      <TouchableOpacity onPress={router.back} 
      className="absolute bottom-5 left-0 right-0 mx-5 bg-sky-300 rounded-lg py-3.5 flex flex-row items-center  justify-center z-50">
      <Image source={icons.arrow} className="size-5 mr-1 mt-0.5 rotate-180"/>
      <Text className="text-center text-dark-200 font-bold text-base">Go back </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;