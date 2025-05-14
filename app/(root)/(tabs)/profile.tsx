import icons from "@/constants/icons";
import images from "@/constants/images";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress: () => void;
  textStyle?: any;
  showArrow?: boolean;
}

const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingsItemProps) => (
  <TouchableOpacity>
    <View>
      <Image source={icon} />
      <Text>{title}</Text>
    </View>
  </TouchableOpacity>
);

const Profile = () => {
  const handlelogout = async () => {};

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex flex-row justify-between items-center mt-5">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <Image source={icons.bell} className="size-5" />
        </View>

        <View className="flex flex-row justify-center mt-5">
          <View className="flex relative flex-col items-center mt-5">
            <Image
              source={images.avatar}
              className="relative rounded-full size-44"
            />
            <TouchableOpacity className="absolute bottom-14 right-[44px]">
              <Image source={icons.edit} className="size-9" />
            </TouchableOpacity>
            <Text className="mt-2 text-2xl font-rubik-bold">
              Sazzadur Rahman
            </Text>
          </View>
        </View>

        <View></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
