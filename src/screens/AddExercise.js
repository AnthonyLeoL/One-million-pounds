import React, { Component, useState } from "react";
import {
  Button,
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList
} from "react-native";

import Set from "../components/Set";
//convert to finctional component with hooks

class AddExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sets: [],
      id: 0
    };
  }

  changeValue = (item, newVal, type) => {
    let arr = this.state.sets;
    arr[item.id][`${type}`] = newVal;
    this.setState({ sets: arr });
  };

  render() {
    return (
      <View>
        <View>
          <Text>Name</Text>
          <TextInput placeholder="name" />
        </View>
        <View>
          <FlatList
            data={this.state.sets}
            renderItem={({ item }) => {
              return (
                <Set
                  reps={item.reps}
                  weight={item.weight}
                  onChange={(val, type) => this.changeValue(item, val, type)}
                />
              );
            }}
            keyExtractor={item => item.id.toString()}
          />
        </View>
        <TouchableOpacity
          onPress={() =>
            this.setState({
              sets: [
                ...this.state.sets,
                { reps: 0, weight: 0, id: this.state.id }
              ],
              id: this.state.id + 1
            })
          }
        >
          <Text>New Set</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({});

export default AddExercise;
