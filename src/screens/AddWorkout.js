import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  BackHandler
} from "react-native";

import ExerciseCard from "../components/ExerciseCard";
const EXERCISES = { sets: [], totalLifted: 0, name: "", nextID: 0 };

class AddWorkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises:
        this.props.navigation.state.params.currentData.exercises.length > 0
          ? this.props.navigation.state.params.currentData.exercises
          : [EXERCISES],
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

  updateFromChild = (name, sets, totalLifted, index) => {
    let changed = this.state.exercises;
    let changedWeight = -changed[index].totalLifted;
    changed[index] = {
      sets,
      totalLifted,
      nextID: sets[sets.length - 1] ? sets[sets.length - 1].id + 1 : 0,
      name: name
    };
    changedWeight += changed[index].totalLifted;
    let newTotal = this.state.totalLifted + changedWeight;
    newTotal = Math.round(newTotal * 100) / 100;
    this.setState({
      exercises: changed,
      totalLifted: newTotal
    });
  };

  deleteExercise = index => {
    let arr = this.state.exercises;
    let deleted = arr.splice(index, 1)[0];
    if (arr.length == 0) arr = [EXERCISES];
    let newTotal = this.state.totalLifted - deleted.totalLifted;
    this.setState({
      exercises: arr,
      totalLifted: newTotal
    });
  };
  onSave = () => {
    this.props.navigation.state.params.updateFromChild(
      this.state.exercises,
      this.state.totalLifted,
      this.state.index
    );
    this.props.navigation.goBack();
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
                  updateFromChild: this.updateFromChild.bind(this),
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
        <TouchableOpacity onPress={this.onSave}>
          <Text>Save and go back</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default AddWorkout;
