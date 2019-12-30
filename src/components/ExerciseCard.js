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
      <Text>Name: {exerciseInfo.name}</Text>
      <Text>Total Lifted: {exerciseInfo.exerciseTotal}</Text>
    </View>
  );
};

export default ExerciseCard;
