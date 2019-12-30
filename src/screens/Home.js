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
class WORKOUT {
  constructor() {
    this.exercises = [];
    this.totalLifted = 0;
    this.date = new Date();
    // this.date = this.date.toDateString();
    return this;
  }
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workouts: [new WORKOUT()],
      totalLifted: 0
    };
  }
  componentDidMount() {
    this.loadData();
    // AsyncStorage.clear();
  }
  updateFromChild = (exercises, totalLifted, index) => {
    let changed = this.state.workouts;
    let changedWeight = -changed[index].totalLifted;
    changed[index] = {
      exercises,
      totalLifted
    };
    changedWeight += changed[index].totalLifted;
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
    if (arr.length == 0) arr = [new WORKOUT()];
    let newTotal = this.state.totalLifted - deleted.totalLifted;
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

  render() {
    return (
      <ScrollView>
        <Text>Total To Date: {this.state.totalLifted}</Text>
        {this.state.workouts.map((item, i) => (
          <View key={i}>
            <Text>Date {item.date.toLocaleDateString()}</Text>
            <TouchableOpacity onPress={i => this.deleteWorkOut(i)}>
              <Text>X</Text>
            </TouchableOpacity>
            <Text>{item.totalLifted}</Text>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("AddWorkout", {
                  updateFromChild: this.updateFromChild.bind(this),
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
              workouts: [...this.state.workouts, new WORKOUT()]
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
