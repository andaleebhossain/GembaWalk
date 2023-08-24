import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import axios from "axios";

import answers from "./db";

const url = "http://localhost:4000/";

export default function App() {
  const questions = [
    "Question1",
    "Question2",
    "Question3",
    "Question4",
    "Thank You! Your answers have been submitted.",
  ];
  const [i, setI] = useState(0);
  const [sub, setSub] = useState(false);

  const yesHandler = () => {
    answers.push("Yes");
    console.log(answers);
    setI((prev) => prev + 1);

    if (i === questions.length - 2) {
      setSub(true);
    }
  };

  const noHandler = () => {
    answers.push("No");
    console.log(answers);
    setI((prev) => prev + 1);

    if (i === questions.length - 2) {
      setSub(true);
    }
  };

  const submitHandler = () => {
    axios
      .post(url, answers)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <SafeAreaView style={styles.title}>
        <Text style={{ fontSize: 30, color: "#00827f" }}>Gemba Walk</Text>
      </SafeAreaView>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <View>
          <Text style={{ fontSize: 25, color: "#00827f", textAlign: "center" }}>
            {questions[i]}
          </Text>
        </View>
        <View style={styles.btn_container}>
          {!sub && (
            <TouchableOpacity style={styles.btn} onPress={yesHandler}>
              <Text style={{ color: "#00827f", textAlign: "center" }}>YES</Text>
            </TouchableOpacity>
          )}

          {!sub && (
            <TouchableOpacity style={styles.btn} onPress={noHandler}>
              <Text style={{ color: "#00827f", textAlign: "center" }}>NO</Text>
            </TouchableOpacity>
          )}

          {sub && (
            <TouchableOpacity style={styles.btn} onPress={submitHandler}>
              <Text style={{ color: "#00827f", textAlign: "center" }}>
                SUBMIT
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    verticalAlign: "top",
    alignItems: "center",
  },
  btn: {
    borderStyle: "solid",
    borderColor: "#00827f",
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
    margin: 10,
  },
  btn_container: {
    flexDirection: "row",
  },
});
