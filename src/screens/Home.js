import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workouts: [{ exercises: [], totalLifted: 0 }],
      totalLifted: 0
    };
  }

  returnWeight = (exercises, totalLifted, index) => {
    let changed = this.state.workouts;
    let changedWeight = -changed[index].totalLifted;
    changed[index] = {
      exercises,
      totalLifted
    };

    changedWeight += changed[index].totalLifted;

    this.setState({
      workouts: changed,
      totalLifted: totalLifted + changedWeight
    });
  };

  deleteWorkOut = index => {
    let arr = this.state.workouts;
    let deleted = arr.splice(index, 1)[0];
    if (arr.length == 0) arr = [{ exercises: [], totalLifted: 0 }];
    let newTotal = this.state.totalLifted - deleted.totalLifted;
    this.setState({
      workouts: arr,
      totalLifted: newTotal
    });
  };

  render() {
    return (
      <ScrollView>
        <Text>Home</Text>
        {this.state.workouts.map((item, i) => (
          <View key={i}>
            <Text>Date</Text>
            <TouchableOpacity
              onPress={i => {
                this.deleteWorkOut(i);
              }}
            >
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
