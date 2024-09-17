import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
import CustomButton from "../../components/CustomButton";
import { router, useNavigation } from "expo-router";

const TransferDetails = () => {
  const { user, transferData, setTransferData } = useGlobalContext();
  const navigation = useNavigation();
  return (
    <SafeAreaView className="bg-primary-50 h-full">
      <ScrollView>
        <View className="flex flex-col mx-5 p-8 bg-white rounded-lg mt-20">
          <Text className="text-center text-lg text-primary font-psemibold">
            {transferData.transferCurrencyCode} {transferData.receivableAmount}{" "}
            has been delivered to {transferData.recipientFirstName}
          </Text>
        </View>
        <View className="mx-5 mt-10">
          <CustomButton
            title="OK"
            handlePress={() => navigation.navigate("transfers")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TransferDetails;
