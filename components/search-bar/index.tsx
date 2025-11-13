import { View, TextInput, Image } from "react-native";
import { ISearchBarProps } from "./search-bar.interface";
import { SearchIcon } from "@/assets/icons";

const SearchBar = (props: ISearchBarProps) => {
  const { placeholder, value, onChangeText, onPress } = props;

  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={SearchIcon}
        className="size-5"
        resizeMode="contain"
        tintColor="#AB8BFF"
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        className="flex-1 ml-2 text-white"
        placeholderTextColor="#A8B5DB"
      />
    </View>
  );
};

export default SearchBar;
