import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { compose, applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import rootReducers from "./store/reducers/rootReducers";
import ContactScreen from "./screens/ContactScreen";
import AddScreen from "./screens/AddScreen";

const Stack = createStackNavigator();
const store = createStore(rootReducers, compose(applyMiddleware(thunk)));

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Contact"
            component={ContactScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Add"
            component={AddScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
