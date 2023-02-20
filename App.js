import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./screens/Home";
import Update from "./screens/Update";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Todo" component={Home} />
        <Stack.Screen name="Update" component={Update} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
