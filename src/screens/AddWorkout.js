import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from "react-native";

class AddWorkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sets: [],
      exercises: [{ sets: [], totalLifted: 0, name: "", nextID: 0 }],
      totalLifted: 0,
      name: "",
      nextID: 0
    };
  }
  returnName = (name, index) => {
    this.setState({ name });
  };
  returnWeight = (set, totalLifted) => {
    this.setState({
      sets: set,
      totalLifted: totalLifted,
      nextID: set[set.length - 1] ? set[set.length - 1].id + 1 : 0
    });
  };

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("AddExercise", {
              returnWeight: this.returnWeight.bind(this),
              returnName: this.returnName.bind(this),
              currentData: this.state
            })
          }
        >
          {this.state.name ? (
            <Text>{this.state.name}</Text>
          ) : (
            <Text>Add New</Text>
          )}
        </TouchableOpacity>
        <Text>Weight: {this.state.totalLifted}</Text>
      </View>
    );
  }
}

export default AddWorkout;
