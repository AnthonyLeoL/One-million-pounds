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

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workouts: [{ exercises: [], totalLifted: 0 }],
      totalLifted: 0
    };
  }
  componentDidMount() {
    this.loadData();
    //AsyncStorage.clear();
  }
  returnWeight = (exercises, totalLifted, index) => {
    let changed = this.state.workouts;
    let changedWeight = -changed[index].totalLifted;
    changed[index] = {
      exercises,
      totalLifted
    };
    changedWeight += changed[index].totalLifted;
    console.log("weight that has bneem changed", changedWeight);
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
    if (arr.length == 0) arr = [{ exercises: [], totalLifted: 0 }];
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
    } finally {
      console.log(returnedObj);
    }
  };

  saveData = () => {
    const { workouts, totalLifted } = this.state;
    let objToSave = { workouts, totalLifted };
    console.log("inSave", totalLifted);
    AsyncStorage.setItem("temp", JSON.stringify(objToSave));
  };

  render() {
    return (
      <ScrollView>
        <Text>Total To Date: {this.state.totalLifted}</Text>
        {this.state.workouts.map((item, i) => (
          <View key={i}>
            <Text>Date</Text>
            <TouchableOpacity onPress={i => this.deleteWorkOut(i)}>
              <Text>X</Text>
            </TouchableOpacity>
            <Text>{item.totalLifted}</Text>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("AddWorkout", {
                  returnWeight: this.returnWeight.bind(this),
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
              workouts: [
                ...this.state.workouts,
                { exercises: [], totalLifted: 0 }
              ]
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
