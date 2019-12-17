import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";

const Set = props => {
  return (
    <View>
      <Text>Reps:</Text>
      <TextInput
        autoCapitalize="words"
        autoCorrect
        placeholder={props.reps ? props.reps.toString() : "Add reps"}
        onChangeText={val => props.onChange(val, "reps")}
        value={props.reps ? props.reps.toString() : ""}
      />
      <Text>weights:</Text>
      <TextInput
        autoCapitalize="words"
        autoCorrect
        placeholder={props.weight ? props.weight.toString() : "Add reps"}
        onChangeText={val => props.onChange(val, "weight")}
        value={props.weight ? props.weight.toString() : ""}
      />
    </View>
  );
};

export default Set;
