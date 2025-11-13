import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useSearchMoviesQuery } from "@/services/movies";
import { BgImg } from "@/assets/images";
import MovieCard from "@/components/movie-card";
import { LogoIcon } from "@/assets/icons";
import SearchBar from "@/components/search-bar";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setDebouncedQuery("");
      return;
    }

    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const {
    data: movies,
    isLoading: isLoadingMovies,
    isFetching: isFetchingMovies,
    isError: isErrorMovies,
  } = useSearchMoviesQuery(debouncedQuery, {
    refetchOnMountOrArgChange: true,
    skip: !debouncedQuery,
  });

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={BgImg}
        className={"flex-1 absolute w-full z-0"}
        resizeMode={"cover"}
      />

      <FlatList
        data={debouncedQuery ? movies?.results : []}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 15 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={LogoIcon} className="w-12 h-10" />
            </View>

            <View className="my-5">
              <SearchBar
                placeholder="Search for a movie"
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </View>

            {(isLoadingMovies || isFetchingMovies) && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}

            {isErrorMovies && (
              <Text className="text-red-500 px-5 my-3">
                Error: {movies?.status_message || "Something went wrong"}
              </Text>
            )}

            {!isLoadingMovies &&
              !isErrorMovies &&
              searchQuery.trim() &&
              movies?.results?.length! > 0 && (
                <Text className="text-xl text-white font-bold">
                  Search Results for{" "}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !isLoadingMovies && !isErrorMovies ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim()
                  ? "No movies found"
                  : "Start typing to search for movies"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
