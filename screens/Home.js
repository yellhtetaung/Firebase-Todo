import React, { useEffect, useState } from "react";
import { View, Keyboard, ScrollView } from "react-native";
import { Input, Button, ListItem } from "@rneui/themed";
import { firebase } from "../config";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const todoRef = firebase.firestore().collection("todos");
  const [text, setText] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    todoRef.orderBy("createdAt", "desc").onSnapshot((querySnapshot) => {
      const todo = [];
      querySnapshot.forEach((doc) => {
        const { heading, completed } = doc.data();
        todo.push({
          id: doc.id,
          heading,
          completed,
        });
      });
      setTodos(todo);
    });
  }, []);

  const addTodo = () => {
    if (text && text.trim().length > 3) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        createdAt: timestamp,
        heading: text,
        completed: false,
      };
      todoRef
        .add(data)
        .then(() => {
          setText("");
          Keyboard.dismiss();
          if (errorMsg === true) {
            setErrorMsg(false);
          }
        })
        .catch((error) => alert(error));
    } else {
      setErrorMsg(true);
    }
  };

  const completeTodo = (id) => {
    todoRef.doc(id).update({ completed: true });
  };

  const deleteTodo = (id) => {
    todoRef
      .doc(id)
      .delete()
      .catch((error) => alert(error));
  };

  return (
    <View style={{ flex: 1, marginTop: 20, paddingHorizontal: 20 }}>
      <Input
        value={text}
        onChangeText={(text) => setText(text)}
        placeholder="Enter New Todo"
        placeholderTextColor="#000"
        errorStyle={{ color: "red" }}
        errorMessage={errorMsg ? "Todo must be above 3 characters." : undefined}
      />

      <Button
        type="solid"
        title="Add"
        size="lg"
        color="warning"
        uppercase
        radius="sm"
        onPress={addTodo}
      />

      <ScrollView style={{ flex: 1, marginTop: 20 }}>
        {todos.map((item) => {
          return (
            <ListItem.Swipeable
              key={item.id}
              topDivider
              containerStyle={{ padding: 25, backgroundColor: "#FFF" }}
              minSlideWidth={40}
              leftContent={(reset) => {
                return (
                  <Button
                    title="Complete"
                    icon={{ name: "check", color: "white" }}
                    buttonStyle={{
                      minHeight: "100%",
                      backgroundColor: "green",
                    }}
                    onPress={() => {
                      completeTodo(item.id);
                      reset();
                    }}
                  />
                );
              }}
              rightContent={(reset) => {
                return (
                  <View style={{ flexDirection: "row" }}>
                    <Button
                      color="primary"
                      icon={{ name: "edit", color: "white" }}
                      buttonStyle={{
                        minWidth: "50%",
                        minHeight: "100%",
                      }}
                      onPress={() => {
                        navigation.navigate("Update", { item });
                        reset();
                      }}
                    />

                    <Button
                      color="error"
                      icon={{ name: "delete", color: "white" }}
                      buttonStyle={{
                        minWidth: "50%",
                        minHeight: "100%",
                      }}
                      onPress={() => {
                        deleteTodo(item.id);
                        reset();
                      }}
                    />
                  </View>
                );
              }}
            >
              <ListItem.Content>
                <ListItem.Title
                  style={{
                    fontWeight: "bold",
                    fontSize: 18,
                    textDecorationLine: item.completed
                      ? "line-through"
                      : undefined,
                  }}
                >
                  {item.heading}
                </ListItem.Title>
              </ListItem.Content>
            </ListItem.Swipeable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Home;
