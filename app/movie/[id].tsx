import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/Services/api";
import useFetch from "@/Services/useFetch";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text, View, Image, ActivityIndicator } from "react-native";

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
     
    
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieDetails;