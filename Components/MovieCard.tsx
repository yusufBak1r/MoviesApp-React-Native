
import { icons } from '@/constants/icons';
import { Link } from 'expo-router';
import { View, Text, Image, TouchableOpacity } from 'react-native'

const MovieCard = ({ id, title, poster_path, vote_average, release_date }: Movie) => {
  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : 'https://placehold.co/600x400/1a1a1a/ffffff.png',
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />

    
        <Text className="text-white text-sm mt-2 font-bold" numberOfLines={1}>{title}</Text>

    
        <View className="flex-col mt-1">
         
          <View className="flex-row items-center">
            <Image
              source={icons.star}
              className="size-4 mr-1"
              resizeMode="contain"
              tintColor="#facc15"
            />
            <Text className="text-yellow-400 text-xs font-semibold">
              {Math.round(vote_average ?? 0)}
            </Text>
          </View>

          
          <Text className="text-xs text-light-300 font-medium mt-1">
            {release_date?.split('-')[0]}
          </Text>

 
          <Text className="text-xs font-medium text-light-300 uppercase">Movie</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};
export default MovieCard;

