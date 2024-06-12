import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskInput from './components/TaskInput';
import TaskItem from './components/TaskItem';
import { Task } from './interface/Task';

export default function App() {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
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

    fetchTasks();
  }, []);

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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Adicione uma nova tarefa</Text>
      <TaskInput newTask={newTask} setNewTask={setNewTask} handleAddTask={handleAddTask} />
      <ScrollView>
        {tasks.map((task) => (
          <TaskItem 
            key={task.id} 
            task={task} 
            updateTask={updateTask} 
            deleteTask={deleteTask} 
          />
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
});
