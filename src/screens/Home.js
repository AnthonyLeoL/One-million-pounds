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
import styles from "../styles/Style";
const oneMillion = 1000000;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workouts: [new Workout()],
      totalLifted: 0
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("headerText", "One million pounds")
    };
  };

  async componentDidMount() {
    await this.loadData();
    this.updateHeader(
      this.numberWithCommas(this.state.totalLifted) + "/" + "1,000,000"
    );
    //AsyncStorage.clear();
  }

  updateHeader = newHeader => {
    this.props.navigation.setParams({
      headerText: newHeader
    });
  };

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
    returnedObj = await JSON.parse(returnedObj);
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
    this.updateHeader(
      this.numberWithCommas(this.state.totalLifted) + "/" + "1,000,000"
    );
    const { workouts, totalLifted } = this.state;
    let objToSave = { workouts, totalLifted };
    AsyncStorage.setItem("temp", JSON.stringify(objToSave));
  };

  addNewWorkout = () => {
    let workouts = this.state.workouts;
    workouts.push(new Workout());
    this.setState({ workouts }, this.saveData());
  };

  numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  fixJSGarbageDateHandling = date => {
    if (typeof date !== "string") return date;
    if (/^\d{4}\-\d\d\-\d\dT\d\d\:\d\d\:\d\d/.test(date)) return new Date(date);

    return val;
  };
  handleNewButton = () => {
    // this.setState({
    //   workouts: [...this.state.workouts, new Workout()]
    // });
    let workoutCopy = this.state.workouts;
    workoutCopy.unshift(new Workout());
    this.setState({ workouts: workoutCopy });
  };
  render() {
    return (
      <ScrollView style={styles.grey}>
        <Text style={styles.header}>
          Left To Lift:{" "}
          {this.numberWithCommas(
            Math.max(0, oneMillion - this.state.totalLifted)
          )}
        </Text>

        {this.state.workouts.map((item, i) => (
          <View key={i}>
            <TouchableOpacity
              style={styles.cardStyle}
              onPress={() =>
                this.props.navigation.navigate("AddWorkout", {
                  updateHomeFromChild: this.updateHomeFromChild.bind(this),
                  deleteWorkOut: this.deleteWorkOut.bind(this),
                  currentData: this.state.workouts[i],
                  index: i
                })
              }
            >
              <View style={styles.textStyle}>
                {item.workoutTotal ? (
                  <Text style={styles.buttonText}>
                    {" "}
                    Lifted {item.workoutTotal} lb on{" "}
                    {this.fixJSGarbageDateHandling(
                      item.date
                    ).toLocaleDateString()}
                  </Text>
                ) : (
                  <Text style={styles.buttonText}>
                    Tap to start adding workouts!
                  </Text>
                )}
              </View>

              <Text></Text>
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={this.handleNewButton}
        >
          <Text style={styles.buttonText}>New</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default Home;
