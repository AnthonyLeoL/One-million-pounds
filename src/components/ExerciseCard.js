import React, { Component, useState } from "react";
import {
  Button,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from "react-native";

const ExerciseCard = ({ exerciseInfo }) => {
  return (
    <View>
      {exerciseInfo.name ? (
        <Text>{exerciseInfo.name} </Text>
      ) : (
        <Text>Name: ...</Text>
      )}

      <Text>Total Lifted: {exerciseInfo.exerciseTotal}</Text>
    </View>
  );
};

export default ExerciseCard;
