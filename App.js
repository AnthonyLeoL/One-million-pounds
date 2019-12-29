import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import TestScreen from "./src/screens/Test";
import AddWorkOutScreen from "./src/screens/AddWorkout";
import AddExerciseScreen from "./src/screens/AddExercise";
import HomeScreen from "./src/screens/Home";

const navigator = createStackNavigator(
  {
    AddWorkout: AddWorkOutScreen,
    AddExercise: AddExerciseScreen,
    Home: HomeScreen
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerLeft: null,
      title: "OMP"
    }
  }
);

export default createAppContainer(navigator);
