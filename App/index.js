import { createStackNavigator, createAppContainer } from "react-navigation";

import SymptomIndex from "./screens/SymptomIndex";
import Symptoms from "./screens/Symptoms";
import Report from "./screens/Report";

const MainStack = createStackNavigator({
  SymptomIndex: {
    screen: SymptomIndex,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: "#36b1f0",
      headerTitle: "Flu Detection App",
      headerStyle: {
        backgroundColor: navigation.getParam("color"),
        borderBottomColor: navigation.getParam("color")
      }
    })
  },
  Symptoms: {
    screen: Symptoms,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: navigation.getParam("color"),
        borderBottomColor: navigation.getParam("color")
      }
    })
  },
  Report: {
    screen: Report,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: "#36b1f0",
      headerTitle: "Flu Detection App",
      headerStyle: {
        backgroundColor: navigation.getParam("color"),
        borderBottomColor: navigation.getParam("color")
      }
    })
  }
});

export default createAppContainer(MainStack);
