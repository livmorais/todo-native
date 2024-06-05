import 'react-native-url-polyfill/auto';
import React, { useEffect, useState } from "react";
import { Text, Button, SafeAreaView, ScrollView, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Task {
  id: number;
  task: string;
  completed: boolean;
}

export default function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveTasks = async (tasks: Task[]) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTask = async (task: string) => {
    const newTaskObject: Task = {
      id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
      task,
      completed: false
    };
    const updatedTasks = [...tasks, newTaskObject];
    setTasks(updatedTasks);
    setNewTask("");
    await saveTasks(updatedTasks);
  };

  const deleteTask = async (id: number) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
  };

  const updateTask = async (id: number, completed: boolean) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed } : task
    );
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Adicione uma nova tarefa</Text>
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
      <ScrollView>
        {tasks.map((task) => (
          <View style={styles.task} key={task.id}>
            <Text style={[styles.textTask, task.completed && styles.completed]}>
              {task.task}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => updateTask(task.id, !task.completed)}>
                <Text style={styles.buttonTextConcluir}>Concluir</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTask(task.id)}>
                <Text style={styles.buttonTextExcluir}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    color: "#333",
  },
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
  task: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textTask: {
    flex: 1,
    fontSize: 18,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 150, // Defina a largura para garantir que haja espaço suficiente entre os botões
  },
  buttonTextConcluir: {
    color: "green",
    fontSize: 18,
  },
  buttonTextExcluir: {
    color: "red",
    fontSize: 18,
  },
});
