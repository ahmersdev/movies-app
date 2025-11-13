import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useMovieDetailsQuery } from "@/services/movies";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowIcon, PlayIcon, StarIcon } from "@/assets/icons";
import MovieInfo from "@/components/movie-info";
import { SafeAreaView } from "react-native-safe-area-context";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const router = useRouter();

  const { data, isLoading, isFetching, isError } = useMovieDetailsQuery(
    id as string,
    {
      refetchOnMountOrArgChange: true,
      skip: !id,
    }
  );

  if (isLoading || isFetching)
    return (
      <SafeAreaView className="bg-primary flex-1">
        <ActivityIndicator size="large" color="#0000ff" className="mt-10" />
      </SafeAreaView>
    );

  if (isError)
    return (
      <SafeAreaView className="bg-primary flex-1">
        <Text className="text-white text-center mt-10">
          Something went wrong
        </Text>
      </SafeAreaView>
    );

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${data?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />

          <TouchableOpacity className="absolute bottom-5 right-5 rounded-full size-14 bg-white flex items-center justify-center">
            <Image
              source={PlayIcon}
              className="w-6 h-7 ml-1"
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>

        <View className={"px-5"}>
          <View className="flex-col items-start justify-center mt-5">
            <Text className="text-white font-bold text-xl">{data?.title}</Text>
            <View className="flex-row items-center gap-x-1 mt-2">
              <Text className="text-light-200 text-sm">
                {data?.release_date?.split("-")[0]} •
              </Text>
              <Text className="text-light-200 text-sm">{data?.runtime}m</Text>
            </View>
          </View>

          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2 self-start">
            <Image source={StarIcon} className="size-4" />

            <Text className="text-white font-bold text-sm">
              {Math.round(data?.vote_average ?? 0)}/10
            </Text>

            <Text className="text-light-200 text-sm">
              ({data?.vote_count} votes)
            </Text>
          </View>

          <MovieInfo label="Overview" value={data?.overview} />
          <MovieInfo
            label="Genres"
            value={
              data?.genres?.map((g: { name: string }) => g.name).join(" • ") ||
              "N/A"
            }
          />

          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`$${(data?.budget ?? 0) / 1_000_000} million`}
            />

            <MovieInfo
              label="Revenue"
              value={`$${Math.round((data?.revenue ?? 0) / 1_000_000)} million`}
            />
          </View>

          <MovieInfo
            label="Production Companies"
            value={
              data?.production_companies
                ?.map((c: { name: string }) => c.name)
                .join(" • ") || "N/A"
            }
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={ArrowIcon}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
