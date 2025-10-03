import { StyleSheet, Text, View,Image } from "react-native";

import React from "react";
import { icons } from "@/constants/icons";





const Profile = () => {
  return (
    <View className="bg-primary flex-1 px-10">
      <View className="flex justify-center items-center flex-1 flex-col gap-5">
        <Image tintColor={"#fff"} source ={icons.person} className="size-10" />
          <Text className="text-white text-base">Profile tab</Text>
        </View>
      </View>
  );
};

export default Profile;
