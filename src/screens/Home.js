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
    this.updateHeader();
    //AsyncStorage.clear();
  }
  updateHeader = () => {
    this.props.navigation.setParams({
      headerText:
        this.numberWithCommas(this.state.totalLifted) + "/" + "1,000,000"
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
    this.updateHeader();
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
  render() {
    return (
      <ScrollView>
        <Text style={styles.header}>
          Left To Lift:{" "}
          {this.numberWithCommas(
            Math.max(0, oneMillion - this.state.totalLifted)
          )}
        </Text>
        {this.state.workouts.map((item, i) => (
          <View style={styles.cardStyle} key={i}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("AddWorkout", {
                  updateHomeFromChild: this.updateHomeFromChild.bind(this),
                  deleteWorkOut: this.deleteWorkOut.bind(this),
                  currentData: this.state.workouts[i],
                  index: i
                })
              }
            >
              <View>
                {console.log(item)}
                {item.workoutTotal ? (
                  <Text style={styles.dateStyle}>
                    {" "}
                    Lifted {item.workoutTotal} lb on{" "}
                    {this.fixJSGarbageDateHandling(
                      item.date
                    ).toLocaleDateString()}
                  </Text>
                ) : (
                  <Text>Tap to start adding workouts!</Text>
                )}
              </View>

              <Text></Text>
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

const styles = StyleSheet.create({
  header: {
    alignSelf: "center",
    fontSize: 18
  },
  cardStyle: {
    borderWidth: 1,
    borderColor: "black"
  },
  dateStyle: {
    justifyContent: "flex-end"
  },
  viewStyle: {
    flexDirection: "row",
    justifyContent: "flex-start"
  }
});

export default Home;
