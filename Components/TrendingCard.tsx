/* eslint-disable react/jsx-no-undef */
import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { images } from "@/constants/images";
import MaskedView from '@react-native-masked-view/masked-view';


type TrendingCardProps = {
  movie: {
    movie_Id: string | number;
    title: string;
    poster_url: string;
  };
  index: number;
};

const TrendingCard = ({ movie: { movie_Id, title, poster_url }, index }: TrendingCardProps) => {
  return (
    <Link href={`movie/${movie_Id}`} asChild>
      <TouchableOpacity className="w-32 relative pl-5">
        <Image
          source={{ uri: poster_url }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"    
        />

        
        <View className="absolute bottom-2 left-3.5 px-2 py-1 rounded-full">

         <MaskedView maskElement={<Text className="font-bold text-white text-6xl ">{index+1}</Text>}>
         <Image source={images.rankingGradient} className="size-14" />
         </MaskedView>
        </View>
        <Text className="text-sm font-bold text-light-100" numberOfLines={2}>{title}</Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
