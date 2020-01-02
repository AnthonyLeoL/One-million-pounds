import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
  BackHandler
} from "react-native";

import ExerciseCard from "../components/ExerciseCard";
import { Exercise } from "../Models";
import styles from "../styles/Style";

class AddWorkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises:
        this.props.navigation.state.params.currentData.exercises.length > 0
          ? this.props.navigation.state.params.currentData.exercises
          : [new Exercise()],
      workoutTotal: this.props.navigation.state.params.currentData.workoutTotal,

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

  updateWorkoutsFromChild = (name, sets, exerciseTotal, index) => {
    let changed = this.state.exercises;
    let changedWeight = -changed[index].exerciseTotal;
    changed[index] = new Exercise(
      sets,
      exerciseTotal,
      name,
      sets[sets.length - 1] ? sets[sets.length - 1].id + 1 : 0
    );

    changedWeight += changed[index].exerciseTotal;
    let newTotal = this.state.workoutTotal + changedWeight;
    newTotal = Math.round(newTotal * 100) / 100;
    this.setState({
      exercises: changed,
      workoutTotal: newTotal
    });
  };

  confirmDelete = (func, i, callback) => {
    Alert.alert(
      "Confirm",
      "Do you want to delete this workout?\nThis action cannot be undone",
      [
        {
          text: "NO",
          style: "cancel"
        },
        {
          text: "YES",
          onPress: () => {
            func(i);
            callback ? callback() : null;
          }
        }
      ],
      { cancelable: true }
    );
  };

  deleteExercise = index => {
    let arr = this.state.exercises;
    let deleted = arr.splice(index, 1)[0];
    if (arr.length == 0) arr = [new Exercise()];
    let newTotal = this.state.workoutTotal - deleted.exerciseTotal;
    this.setState({
      exercises: arr,
      workoutTotal: newTotal
    });
  };
  onSave = () => {
    this.props.navigation.state.params.updateHomeFromChild(
      this.state.exercises,
      this.state.workoutTotal,
      this.state.index
    );
    this.props.navigation.goBack();
  };

  handleNewButton = () => {
    let exerciseCopy = this.state.exercises;
    exerciseCopy.unshift(new Exercise());
    this.setState({ exercises: exerciseCopy });
  };

  render() {
    return (
      <ScrollView style={styles.grey}>
        <Text style={styles.header}>
          Weight Lifted this workout: {this.state.workoutTotal}
        </Text>
        {this.state.exercises.map((item, i) => (
          <View style={styles.cardStyle} key={i.toString()}>
            <View>
              <TouchableOpacity
                style={styles.viewStyle}
                onPress={() =>
                  this.props.navigation.navigate("AddExercise", {
                    updateWorkoutsFromChild: this.updateWorkoutsFromChild.bind(
                      this
                    ),
                    currentData: this.state.exercises[i],
                    index: i
                  })
                }
              >
                {item.name !== "" || item.sets.length ? (
                  <View style={{ flexDirection: "column" }}>
                    <ExerciseCard key={i.toString()} exerciseInfo={item} />
                  </View>
                ) : (
                  <Text style={styles.textStyle}>
                    Click to start adding info
                  </Text>
                )}
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => {
                    this.confirmDelete(this.deleteExercise, i);
                  }}
                >
                  <Text style={styles.deleteButton}>Delete</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={this.handleNewButton}
        >
          <Text style={styles.buttonText}>Add New Exercise</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={this.onSave}>
          <Text style={styles.buttonText}>Save and go back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButtonContainer}
          onPress={() => {
            this.confirmDelete(
              this.props.navigation.state.params.deleteWorkOut,
              this.state.index,
              this.props.navigation.goBack
            );
          }}
        >
          <Text style={styles.buttonText}>Delete entire workout</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default AddWorkout;
