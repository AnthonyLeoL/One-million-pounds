import React, { Component, useState } from "react";
import {
  AsyncStorage,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler
} from "react-native";

import Set from "../components/Set";
const setFormat = { reps: 0, weight: 0, id: 0, weightLifted: 0 };

class AddExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.navigation.state.params.currentData.name,
      sets:
        this.props.navigation.state.params.currentData.sets.length > 0
          ? this.props.navigation.state.params.currentData.sets
          : [setFormat],
      id: this.props.navigation.state.params.currentData.nextID + 1,
      totalLifted: this.props.navigation.state.params.currentData.totalLifted,
      index: this.props.navigation.state.params.index
    };
  }
  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonPressAndroid
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonPressAndroid
    );
  }

  handleBackButtonPressAndroid = () => {
    this.onSave();
    return true;
  };

  changeValue = (item, newVal, type) => {
    if (isNaN(newVal) || newVal.includes(" ")) return;
    if (!newVal.match(/^\d{0,4}(\.\d{0,2})?$/)) return;

    let arr = this.state.sets;
    let index = arr.findIndex(el => {
      return el.id === item.id;
    });
    let change = -arr[index].weightLifted;
    arr[index][`${type}`] = newVal;
    arr[index].weightLifted = arr[index].reps * arr[index].weight;
    arr[index].weightLifted = Math.round(arr[index].weightLifted * 100) / 100;

    change += arr[index].weightLifted;
    let newTotal = this.state.totalLifted + change;
    newTotal = Math.round(newTotal * 100) / 100;
    this.setState({ sets: arr, totalLifted: newTotal });
  };

  changeName = val => {
    this.setState({ name: val });
  };

  deleteSet = index => {
    let arr = this.state.sets;
    let deleted = arr.splice(index, 1)[0];
    if (arr.length == 0) arr = [setFormat];
    let newTotal = this.state.totalLifted - deleted.weightLifted;
    this.setState({ sets: arr, totalLifted: newTotal });
  };

  onSave = () => {
    this.props.navigation.state.params.updateWorkoutsFromChild(
      this.state.name,
      this.state.sets,
      this.state.totalLifted,
      this.state.index
    );
    this.props.navigation.goBack();
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
                      onChange={(val, type) =>
                        this.changeValue(item, val, type)
                      }
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
          <TouchableOpacity onPress={this.onSave}>
            <Text>Save and go back</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({});

export default AddExercise;
