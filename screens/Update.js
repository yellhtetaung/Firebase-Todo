import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config";

const Update = ({ route }) => {
  const [updateText, setUpdateText] = useState(route.params.item.heading);
  const [errorMsg, setErrorMsg] = useState(false);
  const todoRef = firebase.firestore().collection("todos");
  const navigation = useNavigation();

  const updateTodo = () => {
    todoRef
      .doc(route.params.item.id)
      .update({ heading: updateText })
      .then(() => {
        navigation.navigate("Todo");
      });
  };

  return (
    <View style={{ flex: 1, marginTop: 20, paddingHorizontal: 20 }}>
      <Input
        value={updateText}
        onChangeText={(text) => setUpdateText(text)}
        placeholder="Update Todo"
        placeholderTextColor="#000"
        errorStyle={{ color: "red" }}
        errorMessage={errorMsg ? "Todo must be above 3 characters" : undefined}
      />

      <Button
        title="Update Todo"
        uppercase
        size="lg"
        color="success"
        onPress={updateTodo}
      />
    </View>
  );
};

export default Update;
