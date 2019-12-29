import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList
} from "react-native";

import ExerciseCard from "../components/ExerciseCard";
import Header from "../components/Header";

class AddWorkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises:
        this.props.navigation.state.params.currentData.exercises.length > 0
          ? this.props.navigation.state.params.currentData.exercises
          : [{ sets: [], totalLifted: 0, name: "", nextID: 0 }],
      totalLifted: this.props.navigation.state.params.currentData.totalLifted,

      index: this.props.navigation.state.params.index
    };
  }

  returnName = (name, index) => {
    let changed = this.state.exercises;
    changed[index].name = name;
    this.setState({ exercises: changed });
  };

  returnWeight = (sets, totalLifted, index) => {
    let changed = this.state.exercises;
    let changedWeight = -changed[index].totalLifted;
    changed[index] = {
      sets,
      totalLifted,
      nextID: sets[sets.length - 1] ? sets[sets.length - 1].id + 1 : 0,
      name: changed[index].name
    };
    changedWeight += changed[index].totalLifted;
    let newTotal = this.state.totalLifted + changedWeight;
    newTotal = Math.round(newTotal * 100) / 100;
    this.setState({
      exercises: changed,
      totalLifted: newTotal
    });

    this.props.navigation.state.params.returnWeight(
      changed,
      newTotal,
      this.state.index
    );
  };

  deleteExercise = index => {
    let arr = this.state.exercises;
    let deleted = arr.splice(index, 1)[0];
    if (arr.length == 0)
      arr = [{ sets: [], totalLifted: 0, name: "", nextID: 0 }];
    let newTotal = this.state.totalLifted - deleted.totalLifted;
    this.setState({
      exercises: arr,
      totalLifted: newTotal
    });

    this.props.navigation.state.params.returnWeight(
      arr,
      newTotal,
      this.state.index
    );
  };

  render() {
    return (
      <ScrollView>
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
                <Text>Click to start adding info</Text>
              )}
            </TouchableOpacity>
          </View>
        ))}

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
        <Text>TOTAL WEIGHTLIFTED:{this.state.totalLifted}</Text>
      </ScrollView>
    );
  }
}

export default AddWorkout;
