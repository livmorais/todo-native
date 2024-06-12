import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Task } from '../interface/Task';

interface TaskItemProps {
  task: Task;
  updateTask: (id: number, completed: boolean) => void;
  deleteTask: (id: number) => void;
}

const TaskItem = ({ task, updateTask, deleteTask }: TaskItemProps) => {
  return (
    <View style={styles.task}>
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
  );
};

const styles = StyleSheet.create({
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
    width: 150,
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

export default TaskItem;
