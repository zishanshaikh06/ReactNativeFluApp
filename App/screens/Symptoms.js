import React from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  SafeAreaView,
  TextInput
} from "react-native";

import { Button, ButtonContainer } from "../components/Button";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#36B1F0",
    flex: 1,
    paddingHorizontal: 20
  },
  textInput: {
    borderColor: "#CCCCCC",
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
    color: "#fff",
    fontSize: 25,
    textAlign: "center",
    letterSpacing: -0.02,
    fontWeight: "600"
  },
  safearea: {
    flex: 1,
    marginTop: 100,
    justifyContent: "space-between"
  }
});

class Quiz extends React.Component {
  state = {
    correctCount: 0,
    totalCount: 0,
    activeQuestionIndex: 0,
    answered: false,
    answerCorrect: false,
    questions: [],
    loading: true,
    answerMap: [],
    answerInput: ""
  };

  answer = (question, answer) => {
    var answerArr = [];

    var question = { qn: question, ans: answer };

    this.state.answerMap.push(question);

    this.setState(
      state => {
        const nextState = { answered: true };
        nextState.correctCount = state.correctCount + 1;
        nextState.answerCorrect = true;

        return nextState;
      },
      () => {
        setTimeout(() => this.nextQuestion(), 50);
      }
    );
  };

  nextQuestion = () => {
    console.log("nextquestion");
    this.setState(state => {
      const nextIndex = state.activeQuestionIndex + 1;
      console.log("nextIndex " + nextIndex);
      console.log("state.totalCount " + state.totalCount);

      if (nextIndex >= state.totalCount) {
        console.log(this.props.navigation);

        const answersSub = this.state.answerMap;

        fetch(
          "http://ec2-18-191-153-220.us-east-2.compute.amazonaws.com:3000/questions",
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ answersSub })
          }
        ).then(res => {
          console.log("res " + JSON.stringify(res._bodyText));
          this.props.navigation.navigate("SymptomIndex", {
            title: res._bodyText
          });
        });
      }

      return {
        activeQuestionIndex: nextIndex,
        answered: false
      };
    });
  };

  async componentDidMount() {
    //Have a try and catch block for catching errors.
    try {
      //Assign the promise unresolved first then get the data using the json method.
      const questionsResponse = await fetch(
        "http://ec2-18-191-153-220.us-east-2.compute.amazonaws.com:3000/questions"
      )
        .then(res => res.json())
        .then(responseJSON => {
          this.setState({
            questions: responseJSON,
            totalCount: responseJSON.length,
            loading: false
          });
        });

      // const questionsRes = await questionsResponse.json();

      //  console.log("questionsRes: " + questionsRes);
      //console.log("questionsRes JSON: " + JSON.stringify(questionsRes));
    } catch (err) {
      console.log("Error fetching data-----------", err);
    }
  }

  render() {
    const { questions, loading } = this.state;
    console.log("questions " + questions);
    //console.log("this.state.questions " + this.state.questions);

    //const questions = this.props.navigation.getParam("questions", []);
    const question = questions[this.state.activeQuestionIndex];

    console.log(question);

    const buttonDisabled = question && question.type === "input";
    const inputDisabled = question && question.type !== "input";

    return (
      <View
        style={[
          styles.container,
          { backgroundColor: this.props.navigation.getParam("color") }
        ]}
      >
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.safearea}>
          <View>
            <Text style={styles.text}>{question ? question.question : ""}</Text>

            <ButtonContainer>
              {inputDisabled &&
                question.answers.map(answer => (
                  <Button
                    disabled={buttonDisabled}
                    key={answer.id}
                    text={answer.text}
                    onPress={() => this.answer(question.question, answer.text)}
                  />
                ))}
            </ButtonContainer>

            {buttonDisabled ? (
              <TextInput
                name="answerInput"
                disabled={inputDisabled}
                style={styles.textInput}
                placeholder="Enter Temperature (&#8451;)"
                keyboardType="numeric"
                maxLength={8}
                onEndEditing={e =>
                  this.answer(question.question, e.nativeEvent.text)
                }
              />
            ) : null}
          </View>

          <Text style={styles.text}>
            {`${this.state.correctCount}/${this.state.totalCount}`}
          </Text>
        </SafeAreaView>
      </View>
    );
  }
}

export default Quiz;
