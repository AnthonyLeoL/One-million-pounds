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
import { Set as SetSchema } from "../Models";

class AddExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.navigation.state.params.currentData.name,
      sets:
        this.props.navigation.state.params.currentData.sets.length > 0
          ? this.props.navigation.state.params.currentData.sets
          : [new SetSchema()],
      id: this.props.navigation.state.params.currentData.nextID + 1,
      exerciseTotal: this.props.navigation.state.params.currentData
        .exerciseTotal,
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
    let change = -arr[index].setTotal;
    arr[index][`${type}`] = newVal;
    arr[index].setTotal = arr[index].reps * arr[index].weight;
    arr[index].setTotal = Math.round(arr[index].setTotal * 100) / 100;

    change += arr[index].setTotal;
    let newTotal = this.state.exerciseTotal + change;
    newTotal = Math.round(newTotal * 100) / 100;
    this.setState({ sets: arr, exerciseTotal: newTotal });
  };

  changeName = val => {
    this.setState({ name: val });
  };

  deleteSet = index => {
    let arr = this.state.sets;
    let deleted = arr.splice(index, 1)[0];
    if (arr.length == 0) arr = [new SetSchema()];
    let newTotal = this.state.exerciseTotal - deleted.setTotal;
    this.setState({ sets: arr, exerciseTotal: newTotal });
  };

  onSave = () => {
    this.props.navigation.state.params.updateWorkoutsFromChild(
      this.state.name,
      this.state.sets,
      this.state.exerciseTotal,
      this.state.index
    );
    this.props.navigation.goBack();
  };

  render() {
    return (
      <TouchableWithoutFeedback>
        <View>
          <View>
            <Text style={styles.header}>
              Exercise Total: {this.state.exerciseTotal}
            </Text>
            <Text>Name</Text>
            <TextInput
              style={styles.textInputStyle}
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
                  <View style={styles.setStyle}>
                    <Text style={styles.setHeader}>Set {index + 1} </Text>
                    <Set
                      reps={item.reps}
                      weight={item.weight}
                      onChange={(val, type) =>
                        this.changeValue(item, val, type)
                      }
                    />
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => this.deleteSet(index)}
                    >
                      <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                    <Text>
                      Weight Lifted:{" "}
                      {isNaN(item.setTotal) ? "Err" : item.setTotal}
                    </Text>
                  </View>
                );
              }}
              keyExtractor={item => item.id.toString()}
            />
          </View>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() =>
              this.setState({
                sets: [...this.state.sets, new SetSchema(this.state.id)],
                id: this.state.id + 1
              })
            }
          >
            <Text style={styles.buttonText}>New Set</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={this.onSave}>
            <Text style={styles.buttonText}>Save and go back</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  cardStyle: {
    borderWidth: 1,
    borderColor: "black",
    minHeight: 40
  },
  setStyle: {
    margin: 2,
    padding: 5,
    minWidth: 120,
    minHeight: 200
  },
  setHeader: {
    fontSize: 16,
    alignSelf: "center"
  },
  buttonStyle: {
    borderColor: "green",
    borderWidth: 1,
    backgroundColor: "green",
    paddingVertical: "1%"
  },
  viewStyle: {
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  deleteButton: {
    color: "white",
    alignSelf: "flex-end",
    backgroundColor: "#d43c2b",
    paddingHorizontal: "2%"
  },
  deleteButtonContainer: {
    backgroundColor: "#d43c2b",
    paddingVertical: "3%",
    marginTop: "5%"
  },
  header: {
    fontSize: 20,
    paddingVertical: "3%",
    alignSelf: "center",
    borderBottomColor: "black",
    borderBottomWidth: 1
  },
  textInputStyle: {
    backgroundColor: "#f0eeee",
    borderRadius: 3,
    marginHorizontal: "2%",
    padding: "1%",
    height: 50,
    fontSize: 20,
    textAlign: "center"
  },
  saveButton: {
    backgroundColor: "#10B5F8",
    paddingVertical: "2%",
    marginVertical: "2%"
  },
  buttonText: {
    fontSize: 15,
    color: "white",
    alignSelf: "center",
    paddingVertical: "1%",
    justifyContent: "center"
  },
  textStyle: {
    fontSize: 16,
    alignSelf: "center",
    justifyContent: "center"
  }
});

export default AddExercise;
