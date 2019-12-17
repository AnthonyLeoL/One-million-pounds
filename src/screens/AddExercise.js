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
      name: this.props.navigation.state.params.currentData.name,
      sets: this.props.navigation.state.params.currentData.exercises,
      id: this.props.navigation.state.params.currentData.nextID
    };
  }

  cleanSets = () => {
    let arr = this.state.sets.filter(record => record.reps || record.weight);

    if (arr.length === 0) arr = [{ reps: 0, weight: 0, id: 0 }];
    this.setState({ sets: arr });
  };
  changeValue = (item, newVal, type) => {
    let arr = this.state.sets;
    let index = arr.findIndex(el => {
      return el.id === item.id;
    });
    arr[index][`${type}`] = newVal;
    this.cleanSets();

    this.props.navigation.state.params.returnData(
      this.state.sets,
      this.state.name
    );
  };

  render() {
    return (
      <View>
        <View>
          <Text>Name</Text>
          <TextInput
            placeholder="name"
            value={this.state.name}
            onChangeText={val => {
              this.setState({ name: val });
            }}
          />
        </View>
        <View>
          <FlatList
            data={this.state.sets}
            horizontal
            renderItem={({ item, index }) => {
              return (
                <View>
                  <Text>Set {index + 1} </Text>
                  <Set
                    reps={item.reps}
                    weight={item.weight}
                    onChange={(val, type) => this.changeValue(item, val, type)}
                  />
                </View>
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
