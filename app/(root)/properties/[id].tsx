import { router, useLocalSearchParams } from "expo-router";
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { facilities } from "@/constants/data";
import icons from "@/constants/icons";
import images from "@/constants/images";

import Comment from "@/components/Comment";
import { getPropertyById } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";

const Property = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const windowHeight = Dimensions.get("window").height;

  const { data: property } = useAppwrite({
    fn: getPropertyById,
    params: {
      id: id!,
    },
  });

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 bg-white"
      >
        <View className="relative w-full" style={{ height: windowHeight / 2 }}>
          <Image
            source={{ uri: property?.image }}
            className="size-full"
            resizeMode="cover"
          />
          <Image
            source={images.whiteGradient}
            className="absolute top-0 z-40 w-full"
          />

          <View
            className="absolute inset-x-7 z-50"
            style={{
              top: Platform.OS === "ios" ? 70 : 20,
            }}
          >
            <View className="flex flex-row justify-between items-center w-full">
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex flex-row justify-center items-center rounded-full bg-primary-200 size-11"
              >
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>

              <View className="flex flex-row gap-3 items-center">
                <Image
                  source={icons.heart}
                  className="size-7"
                  tintColor={"#191D31"}
                />
                <Image source={icons.send} className="size-7" />
              </View>
            </View>
          </View>
        </View>

        <View className="flex gap-2 px-5 mt-7">
          <Text className="text-2xl font-rubik-extrabold">
            {property?.name}
          </Text>

          <View className="flex flex-row gap-3 items-center">
            <View className="flex flex-row items-center px-4 py-2 rounded-full bg-primary-100">
              <Text className="text-xs font-rubik-bold text-primary-300">
                {property?.type}
              </Text>
            </View>

            <View className="flex flex-row gap-2 items-center">
              <Image source={icons.star} className="size-5" />
              <Text className="mt-1 text-sm text-black-200 font-rubik-medium">
                {property?.rating} ({property?.reviews.length} reviews)
              </Text>
            </View>
          </View>

          <View className="flex flex-row items-center mt-5">
            <View className="flex flex-row justify-center items-center rounded-full bg-primary-100 size-10">
              <Image source={icons.bed} className="size-4" />
            </View>
            <Text className="ml-2 text-sm text-black-300 font-rubik-medium">
              {property?.bedrooms} Beds
            </Text>
            <View className="flex flex-row justify-center items-center ml-7 rounded-full bg-primary-100 size-10">
              <Image source={icons.bath} className="size-4" />
            </View>
            <Text className="ml-2 text-sm text-black-300 font-rubik-medium">
              {property?.bathrooms} Baths
            </Text>
            <View className="flex flex-row justify-center items-center ml-7 rounded-full bg-primary-100 size-10">
              <Image source={icons.area} className="size-4" />
            </View>
            <Text className="ml-2 text-sm text-black-300 font-rubik-medium">
              {property?.area} sqft
            </Text>
          </View>

          <View className="pt-7 mt-5 w-full border-t border-primary-200">
            <Text className="text-xl text-black-300 font-rubik-bold">
              Agent
            </Text>

            <View className="flex flex-row justify-between items-center mt-4">
              <View className="flex flex-row items-center">
                <Image
                  source={{ uri: property?.agent.avatar }}
                  className="rounded-full size-14"
                />

                <View className="flex flex-col justify-center items-start ml-3">
                  <Text className="text-lg text-black-300 text-start font-rubik-bold">
                    {property?.agent.name}
                  </Text>
                  <Text className="text-sm text-black-200 text-start font-rubik-medium">
                    {property?.agent.email}
                  </Text>
                </View>
              </View>

              <View className="flex flex-row gap-3 items-center">
                <Image source={icons.chat} className="size-7" />
                <Image source={icons.phone} className="size-7" />
              </View>
            </View>
          </View>

          <View className="mt-7">
            <Text className="text-xl text-black-300 font-rubik-bold">
              Overview
            </Text>
            <Text className="mt-2 text-base text-black-200 font-rubik">
              {property?.description}
            </Text>
          </View>

          <View className="mt-7">
            <Text className="text-xl text-black-300 font-rubik-bold">
              Facilities
            </Text>

            {property?.facilities.length > 0 && (
              <View className="flex flex-row flex-wrap gap-5 justify-start items-start mt-2">
                {property?.facilities.map((item: string, index: number) => {
                  const facility = facilities.find(
                    (facility) => facility.title === item
                  );

                  return (
                    <View
                      key={index}
                      className="flex flex-col flex-1 items-center min-w-16 max-w-20"
                    >
                      <View className="flex justify-center items-center rounded-full size-14 bg-primary-100">
                        <Image
                          source={facility ? facility.icon : icons.info}
                          className="size-6"
                        />
                      </View>

                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        className="text-black-300 text-sm text-center font-rubik mt-1.5"
                      >
                        {item}
                      </Text>
                    </View>
                  );
                })}
              </View>
            )}
          </View>

          {property?.gallery.length > 0 && (
            <View className="mt-7">
              <Text className="text-xl text-black-300 font-rubik-bold">
                Gallery
              </Text>
              <FlatList
                contentContainerStyle={{ paddingRight: 20 }}
                data={property?.gallery}
                keyExtractor={(item) => item.$id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Image
                    source={{ uri: item.image }}
                    className="rounded-xl size-40"
                  />
                )}
                contentContainerClassName="flex gap-4 mt-3"
              />
            </View>
          )}

          <View className="mt-7">
            <Text className="text-xl text-black-300 font-rubik-bold">
              Location
            </Text>
            <View className="flex flex-row gap-2 justify-start items-center mt-4">
              <Image source={icons.location} className="w-7 h-7" />
              <Text className="text-sm text-black-200 font-rubik-medium">
                {property?.address}
              </Text>
            </View>

            <Image
              source={images.map}
              className="mt-5 w-full h-52 rounded-xl"
            />
          </View>

          {property?.reviews.length > 0 && (
            <View className="mt-7">
              <View className="flex flex-row justify-between items-center">
                <View className="flex flex-row items-center">
                  <Image source={icons.star} className="size-6" />
                  <Text className="ml-2 text-xl text-black-300 font-rubik-bold">
                    {property?.rating} ({property?.reviews.length} reviews)
                  </Text>
                </View>

                <TouchableOpacity>
                  <Text className="text-base text-primary-300 font-rubik-bold">
                    View All
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="mt-5">
                <Comment item={property?.reviews[0]} />
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <View className="absolute bottom-0 p-7 w-full bg-white rounded-t-2xl border-t border-r border-l border-primary-200">
        <View className="flex flex-row gap-10 justify-between items-center">
          <View className="flex flex-col items-start">
            <Text className="text-xs text-black-200 font-rubik-medium">
              Price
            </Text>
            <Text
              numberOfLines={1}
              className="text-2xl text-primary-300 text-start font-rubik-bold"
            >
              ${property?.price}
            </Text>
          </View>

          <TouchableOpacity className="flex flex-row flex-1 justify-center items-center py-3 rounded-full shadow-md bg-primary-300 shadow-zinc-400">
            <Text className="text-lg text-center text-white font-rubik-bold">
              Book Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Property;
