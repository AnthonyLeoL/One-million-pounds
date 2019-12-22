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

import Set from "../components/Set";

class AddExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.navigation.state.params.currentData.name,
      sets:
        this.props.navigation.state.params.currentData.sets.length > 0
          ? this.props.navigation.state.params.currentData.sets
          : [{ reps: 0, weight: 0, id: 0, weightLifted: 0 }],
      id: this.props.navigation.state.params.currentData.nextID + 1,
      totalLifted: this.props.navigation.state.params.currentData.totalLifted,
      index: this.props.navigation.state.params.index
    };
  }

  changeValue = (item, newVal, type) => {
    let arr = this.state.sets;
    let index = arr.findIndex(el => {
      return el.id === item.id;
    });
    let change = -arr[index].weightLifted;
    arr[index][`${type}`] = newVal;
    arr[index].weightLifted = arr[index].reps * arr[index].weight;
    change += arr[index].weightLifted;
    let newTotal = this.state.totalLifted + change;
    this.setState({ sets: arr, totalLifted: newTotal });
    this.props.navigation.state.params.returnWeight(
      this.state.sets,
      newTotal,
      this.state.index
    );
  };

  changeName = val => {
    this.setState({ name: val });
    this.props.navigation.state.params.returnName(val, this.state.index);
  };

  deleteSet = index => {
    let arr = this.state.sets;
    let deleted = arr.splice(index, 1)[0];
    if (arr.length == 0) arr = [{ reps: 0, weight: 0, id: 0, weightLifted: 0 }];
    let newTotal = this.state.totalLifted - deleted.weightLifted;
    this.setState({ sets: arr, totalLifted: newTotal });

    this.props.navigation.state.params.returnWeight(
      this.state.sets,
      newTotal,
      this.state.index
    );
  };

  render() {
    // convert to displaySet component
    return (
      <View>
        <View>
          <Text>Name</Text>
          <TextInput
            placeholder="Name"
            autoCapitalize="words"
            autoCorrect
            value={this.state.name}
            onChangeText={val => {
              this.changeName(val);
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
                  <TouchableOpacity onPress={() => this.deleteSet(index)}>
                    <Text>X</Text>
                  </TouchableOpacity>
                  <Text>Set {index + 1} </Text>
                  <Set
                    reps={item.reps}
                    weight={item.weight}
                    onChange={(val, type) => this.changeValue(item, val, type)}
                  />
                  <Text>
                    Weight Lifted:{" "}
                    {isNaN(item.weightLifted) ? "Err" : item.weightLifted}
                  </Text>
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
                { reps: 0, weight: 0, id: this.state.id, weightLifted: 0 }
              ],
              id: this.state.id + 1
            })
          }
        >
          <Text>Exercise Total: {this.state.totalLifted}</Text>
          <Text>New Set</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({});

export default AddExercise;
