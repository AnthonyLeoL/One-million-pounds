import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from "react-native";

import ExerciseCard from "../components/ExerciseCard";

class AddWorkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [{ sets: [], totalLifted: 0, name: "", nextID: 0 }],
      index: 0
    };
  }

  returnName = (name, index) => {
    let changed = this.state.exercises;
    changed[index].name = name;
    this.setState({ exercises: changed });
  };

  returnWeight = (set, totalLifted, index) => {
    let changed = this.state.exercises;
    changed[index].sets = set;
    changed[index].totalLifted = totalLifted;
    changed[index].nextID = set[set.length - 1]
      ? set[set.length - 1].id + 1
      : 0;

    this.setState({ exercises: changed });
  };

  deleteExercise = index => {
    let arr = this.state.exercises;
    let deleted = arr.splice(index, 1)[0];
    if (arr.length == 0)
      arr = [{ sets: [], totalLifted: 0, name: "", nextID: 0 }];
    this.setState({ exercises: arr });
  };
  render() {
    return (
      <View>
        {this.state.exercises.map((item, i) => (
          <View key={i.toString()}>
            <TouchableOpacity onPress={() => this.deleteExercise(i)}>
              <Text>X</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("AddExercise", {
                  returnWeight: this.returnWeight.bind(this),
                  returnName: this.returnName.bind(this),
                  currentData: this.state.exercises[i],
                  index: i
                })
              }
            >
              {item.name !== "" || item.sets.length ? (
                <ExerciseCard key={i.toString()} exerciseInfo={item} />
              ) : (
                <Text>Edit Exercise</Text>
              )}

              {/* {this.state.exercises[this.state.index].name ? (
            <Text>{this.state.exercises[this.state.index].name}</Text>
          ) : (
            <Text>Add New</Text>
          )} */}
            </TouchableOpacity>
          </View>
        ))}

        {/* <Text>
          Weight: {this.state.exercises[this.state.index].totalLifted}
        </Text> */}

        <TouchableOpacity
          onPress={() => {
            this.setState({
              exercises: [
                ...this.state.exercises,
                { sets: [], totalLifted: 0, name: "", nextID: 0 }
              ]
            });
          }}
        >
          <Text>New</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default AddWorkout;
