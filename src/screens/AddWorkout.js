import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const AddWorkout = ({ navigation }) => {
  let [exercises, setExercise] = useState([]);
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("AddExercise")}>
        <Text>New Exercise</Text>
      </TouchableOpacity>
      <View>
        {exercises.map(item => (
          <Text>{item}</Text>
        ))}
      </View>
    </View>
  );
};

export default AddWorkout;
