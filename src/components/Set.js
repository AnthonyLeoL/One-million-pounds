import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import styles from "../styles/Style";

const Set = props => {
  return (
    <View style={styles.grey}>
      <Text style={{ marginLeft: "3%" }}>Reps:</Text>
      <TextInput
        style={styles.textInputStyle}
        autoCapitalize="words"
        autoCorrect
        keyboardType="numeric"
        placeholder={props.reps ? props.reps.toString() : "Add reps"}
        onChangeText={val => props.onChange(val, "reps")}
        value={props.reps ? props.reps.toString() : ""}
      />
      <Text style={{ marginLeft: "3%" }}>weight:</Text>
      <TextInput
        style={styles.textInputStyle}
        autoCapitalize="words"
        autoCorrect
        keyboardType="numeric"
        placeholder={props.weight ? props.weight.toString() : "Add weight"}
        onChangeText={val => props.onChange(val, "weight")}
        value={props.weight ? props.weight.toString() : ""}
      />
    </View>
  );
};

export default Set;
