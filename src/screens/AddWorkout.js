import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

class AddWorkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
      name: "",
      nextID: 0
    };
  }
  returnData = (set, name) => {
    this.setState({
      exercises: set,
      name: name,
      nextID: set[set.length - 1] ? set[set.length - 1].id + 1 : 0
    });
  };

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("AddExercise", {
              returnData: this.returnData.bind(this),
              currentData: this.state
            })
          }
        >
          <Text>New Exercise</Text>
        </TouchableOpacity>
        <View>{this.state.exercises.map(item => console.log())}</View>
      </View>
    );
  }
}

export default AddWorkout;
