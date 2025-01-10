import React, { useReducer, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';

// Define action types
const ADD_TASK = 'ADD_TASK';
const REMOVE_TASK = 'REMOVE_TASK';

// Define the initial state
const initialState = [];

// Define the reducer function
function reducer(state, action) {
  switch (action.type) {
    case ADD_TASK:
      return [...state, { id: Date.now().toString(), text: action.payload }];
    case REMOVE_TASK:
      return state.filter(task => task.id !== action.payload);
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [task, setTask] = useState('');

  const handleAddTask = () => {
    if (task.trim()) {
      dispatch({ type: ADD_TASK, payload: task });
      setTask('');
    }
  };

  const handleRemoveTask = (id) => {
    dispatch({ type: REMOVE_TASK, payload: id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={task}
          onChangeText={setTask}
        />
        <Button title="Save" onPress={handleAddTask} />
      </View>
      <FlatList
        data={state}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleRemoveTask(item.id)}>
            <Text style={styles.task}>{item.text}</Text>
          </TouchableOpacity>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    flex: 1,
    marginRight: 10,
  },
  task: {
    padding: 10,
    fontSize: 18,
    backgroundColor: '#f9c2ff',
    marginVertical: 5,
    width: '100%',
    textAlign: 'center',
  },
});
