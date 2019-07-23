import React from "react";
import { ScrollView, StatusBar, Text, StyleSheet } from "react-native";

import fluQuestions from "../data/questions";

import { RowItem } from "../components/RowItem";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#36B1F0",
    flex: 1,
    paddingHorizontal: 20
  },
  textInput: {
    borderColor: "#36b1f0",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    width: 350,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20
  },
  header: {
    fontSize: 25,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
  },
  text: {
    color: "#36b1f0",
    marginTop: 150,
    fontSize: 40,
    textAlign: "center",
    letterSpacing: -0.01,
    fontWeight: "900"
  },
  safearea: {
    flex: 1,
    marginTop: 100,
    justifyContent: "space-between"
  }
});

export default ({ navigation }) => (
  <ScrollView>
    <StatusBar barStyle="dark-content" />
    <RowItem
      name="Select Symptoms"
      color="#36b1f0"
      onPress={() =>
        navigation.navigate("Symptoms", {
          title: "Select Symptoms",
          questions: fluQuestions,
          color: "#36b1f0"
        })
      }
    />
    <Text style={styles.text}>{navigation.getParam("title", "")}</Text>
  </ScrollView>
);
