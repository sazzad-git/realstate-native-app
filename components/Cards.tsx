import icons from "@/constants/icons";
import images from "@/constants/images";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface Props {
  onPress?: () => void;
}

export const FeaturedCard = ({ onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex relative flex-col items-start w-60 h-80"
    >
      <Image source={images.japan} className="rounded-2xl size-full" />
      <Image
        source={images.cardGradient}
        className="absolute bottom-0 rounded-2xl size-full"
      />
      <View className="flex flex-row items-center bg-white/90 px-3 py-1.5 rounded-full absolute top-5 right-5">
        <Image source={icons.star} className="size-3.5" />
        <Text className="ml-1 text-xs font-rubik-bold text-primary-300">
          4.4
        </Text>
      </View>

      <View className="flex absolute inset-x-5 bottom-5 flex-col items-start">
        <Text
          className="text-xl text-white font-rubik-extrabold"
          numberOfLines={1}
        >
          Modern Apartment
        </Text>
        <Text className="text-base text-white font-rubik">
          22 W 15th St, New York
        </Text>

        <View className="flex flex-row justify-between items-center w-full">
          <Text className="text-xl text-white font-rubik-extrabold">
            $2,500
          </Text>

          <Image source={icons.heart} className="size-5" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Card = ({ onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="relative flex-1 px-3 py-4 mt-4 w-full bg-white rounded-lg shadow-lg shadow-black-100/70"
    >
      <View className="flex absolute top-5 right-5 z-50 flex-row items-center p-1 px-2 rounded-full bg-white/90">
        <Image source={icons.star} className="size-2.5" />
        <Text className="ml-0.5 text-xs font-rubik-bold text-primary-300">
          4.4
        </Text>
      </View>

      <Image source={images.newYork} className="w-full h-40 rounded-lg" />

      <View className="flex flex-col mt-2">
        <Text className="text-base text-black-300 font-rubik-bold">
          Cozy Studio
        </Text>
        <Text className="text-xs text-black-200 font-rubik">
          22 W 15th St, New York
        </Text>

        <View className="flex flex-row justify-between items-center mt-2">
          <Text className="text-base text-primary-300 font-rubik-bold">
            $2,500
          </Text>

          <Image
            source={icons.heart}
            className="mr-2 w-5 h-5"
            tintColor="#191d31"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
