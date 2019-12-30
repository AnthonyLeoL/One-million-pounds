import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { Workout } from "../Models";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workouts: [new Workout()],
      totalLifted: 0
    };
  }
  componentDidMount() {
    //this.loadData();
    AsyncStorage.clear();
  }
  updateHomeFromChild = (exercises, workoutTotal, index) => {
    let changed = this.state.workouts;
    let changedWeight = -changed[index].workoutTotal;

    changed[index] = new Workout(exercises, workoutTotal, changed[index].date);

    changedWeight += changed[index].workoutTotal;
    this.setState(
      {
        workouts: changed,
        totalLifted: this.state.totalLifted + changedWeight
      },
      this.saveData
    );
  };

  deleteWorkOut = index => {
    let arr = this.state.workouts;
    let deleted = arr.splice(index, 1)[0];
    if (arr.length == 0) arr = [new Workout()];
    let newTotal = this.state.totalLifted - deleted.workoutTotal;
    this.setState(
      {
        workouts: arr,
        totalLifted: newTotal
      },
      this.saveData
    );
  };

  loadData = async () => {
    let returnedObj = await AsyncStorage.getItem("temp");
    returnedObj = JSON.parse(returnedObj);
    try {
      this.setState({
        workouts: returnedObj.workouts,
        totalLifted: returnedObj.totalLifted
      });
    } catch (e) {
      console.log(e);
    }
  };

  saveData = () => {
    const { workouts, totalLifted } = this.state;
    let objToSave = { workouts, totalLifted };
    AsyncStorage.setItem("temp", JSON.stringify(objToSave));
  };

  addNewWorkout = () => {
    let workouts = this.state.workouts;
    workouts.push(new Workout());
    this.setState({ workouts }, this.saveData());
  };
  render() {
    return (
      <ScrollView>
        <Text>Total To Date: {this.state.totalLifted}</Text>
        {this.state.workouts.map((item, i) => (
          <View key={i}>
            <Text>Date {item.date.toLocaleDateString()}</Text>
            <TouchableOpacity onPress={() => this.deleteWorkOut(i)}>
              <Text>X</Text>
            </TouchableOpacity>
            <Text>{item.workoutTotal}</Text>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("AddWorkout", {
                  updateHomeFromChild: this.updateHomeFromChild.bind(this),
                  currentData: this.state.workouts[i],
                  index: i
                })
              }
            >
              <Text>Edit</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity
          onPress={() => {
            this.setState({
              workouts: [...this.state.workouts, new Workout()]
            });
          }}
        >
          <Text>New</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default Home;
