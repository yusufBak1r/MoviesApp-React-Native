import MovieCard from "@/Components/MovieCard";
import SearchBar from "@/Components/SearchBar";
import TrendingCard from "@/Components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/Services/api";
import { getTrendingMovies } from "@/Services/appwrite";
import useFetch from "@/Services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, Image, ScrollView, Text, View ,FlatList} from "react-native";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";





export default function Index() { 
   

const router = useRouter(); 

const  {data:trendingMovies,loading:trendingLoading,error:trendingError}=useFetch(getTrendingMovies);


const {data:movies,
   loading:moviesLoading,
   error:moviesError }= useFetch(() =>fetchMovies({
query : ''


}))
 



  return (


<View className="flex-1 bg-primary">

   <Image source={images.bg} className="absolute w-full z-0" />

   <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ minHeight: "100%", paddingBottom: 10, }} > 

<Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" /> 


        {moviesLoading || trendingError ? ( <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" /> ) : moviesError  || trendingError?  ( 
          <Text>Error: {moviesError?.message || "Error"}</Text> ) : (

                <View className="flex-1 mt-5"> 
                <SearchBar onPress={ ()=> router.push("/search")} placeholder="Search for a movie"/>


                 {trendingMovies && (
                     <View className="mt-5">
                         <Text className="text-lg text-slate-50  font-bold mt-5 mb-3 ">Trending Movies</Text>
                     </View>
                 )}

              <>

            <FlatList
             horizontal
             showsHorizontalScrollIndicator={false}
             ItemSeparatorComponent={() => <View className="w-3" />}
              className="mb-4 mt-3"
              data={trendingMovies}
              renderItem={({ item, index }) => (<TrendingCard movie={item} index={index}></TrendingCard>)}
              keyExtractor={(item)  => item.$id.toString()}
           
                />





              <Text className="text-lg text-slate-50  font-bold mt-5 mb-3 ">Latest Movies</Text>
      



              <FlatList data={movies} renderItem={({ item }) => (
                
             <MovieCard  {...item} />
             
            
            )}
              


              keyExtractor={(item) => item.id.toString() } numColumns={3}
               columnWrapperStyle={{ justifyContent: "flex-start", gap: 20 ,padding :5,marginBottom: 10 }}
                scrollEnabled={false} className="mt-2 pb-32"/>
              </>
            
        </View>
)}

    </ScrollView>

    </View> );


}


