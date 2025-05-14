import icons from "@/constants/icons";
import images from "@/constants/images";
import { login } from "@/lib/appwrite";
import { useGlobalCOntext } from "@/lib/global-provider";
import { Redirect } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SignIn = () => {
  const { refetch, loading, isLoggedIn } = useGlobalCOntext();

  if (!loading && isLoggedIn) return <Redirect href="/" />;

  const handleLogin = async () => {
    const result = await login();

    if (result) {
      refetch();
    } else {
      Alert.alert("Login failed", "Please try again later");
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={images.onboarding}
          className="w-full h-4/6"
          resizeMode="contain"
        />

        <View className="px-10">
          <Text className="text-base text-center uppercase font-rubik text-black-200">
            Welcome to ReState
          </Text>
          <Text className="mt-2 text-3xl text-center font-rubik-bold text-black-300">
            Let&apos;s get you Closer to {"\n"}
            <Text className="text-primary-300">Your Ideal Home</Text>
          </Text>

          <Text className="mt-12 text-lg text-center font-rubik text-black-200">
            Login to ReState with Google
          </Text>

          <TouchableOpacity
            onPress={handleLogin}
            className="py-4 mt-5 w-full bg-white rounded-full shadow-md shadow-zinc-300"
          >
            <View className="flex flex-row justify-center items-center">
              <Image
                source={icons.google}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="ml-2 text-lg font-rubik-medium text-black-300">
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
