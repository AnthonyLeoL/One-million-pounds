import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import TestScreen from "./src/screens/Test";
import AddWorkOutScreen from "./src/screens/AddWorkout";
import AddExerciseScreen from "./src/screens/AddExercise";

const navigator = createStackNavigator(
  {
    AddWorkout: AddWorkOutScreen,
    AddExercise: AddExerciseScreen
  },
  {
    initialRouteName: "AddWorkout",
    defaultNavigationOptions: {
      title: "OMP"
    }
  }
);

export default createAppContainer(navigator);
