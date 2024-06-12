import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface TaskInputProps {
  newTask: string;
  setNewTask: (task: string) => void;
  handleAddTask: (task: string) => void;
}

const TaskInput = ({ newTask, setNewTask, handleAddTask }: TaskInputProps) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Digite aqui..."
        onChangeText={(text) => setNewTask(text)}
        value={newTask}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleAddTask(newTask)}
      >
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCC",
    padding: 10,
    fontSize: 18,
    borderRadius: 5,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});

export default TaskInput;
