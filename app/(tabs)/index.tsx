import { LogoIcon } from "@/assets/icons";
import { BgImg } from "@/assets/images";
import MovieCard from "@/components/movie-card";
import SearchBar from "@/components/search-bar";
import { useGetMoviesListQuery } from "@/services/movies";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

const HomeScreen = () => {
  const router = useRouter();

  const {
    data: movies,
    isLoading: isLoadingMovies,
    isFetching: isFetchingMovies,
    isError: isErrorMovies,
  } = useGetMoviesListQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <View className="flex-1 bg-primary">
      <Image source={BgImg} className={"absolute w-full z-0"} />
      <ScrollView
        className={"flex-1 px-5"}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={LogoIcon} className={"w-12 h-10 mt-20 mb-5 mx-auto"} />

        {isLoadingMovies || isFetchingMovies ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : isErrorMovies ? (
          <Text className="text-white mt-10 text-center">
            Error: {movies?.status_message || "Something went wrong"}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              placeholder="Search for a movie"
              onPress={() => router.push("/search")}
            />

            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Movies
              </Text>

              <FlatList
                data={movies?.results}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className={"mt-2 pb-32"}
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
