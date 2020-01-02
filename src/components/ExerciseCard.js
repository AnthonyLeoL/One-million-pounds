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
import styles from "../styles/Style";

const ExerciseCard = ({ exerciseInfo }) => {
  return (
    <View>
      {exerciseInfo.name ? (
        <Text style={styles.buttonText}>{exerciseInfo.name} </Text>
      ) : (
        <Text style={styles.buttonText}>...</Text>
      )}

      <Text style={styles.buttonText}>
        Total Lifted: {exerciseInfo.exerciseTotal} lb
      </Text>
    </View>
  );
};

export default ExerciseCard;
