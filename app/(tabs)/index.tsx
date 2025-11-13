import { LogoIcon } from "@/assets/icons";
import { BgImg } from "@/assets/images";
import SearchBar from "@/components/search-bar";
import { useRouter } from "expo-router";
import { Image, ScrollView, View } from "react-native";

const HomeScreen = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-primary">
      <Image source={BgImg} className={"absolute w-full z-0"} />
      <ScrollView
        className={"flex-1 px-5"}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={LogoIcon} className={"w-12 h-10 mt-20 mb-5 mx-auto"} />

        <SearchBar
          placeholder="Search for a movie"
          onPress={() => router.push("/search")}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
