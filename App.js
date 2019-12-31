import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

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
      title: "OMP",
      headerStyle: {
        backgroundColor: "#3b3b3b"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        marginRight: "auto",
        marginLeft: "auto"
      }
    }
  }
);

export default createAppContainer(navigator);
