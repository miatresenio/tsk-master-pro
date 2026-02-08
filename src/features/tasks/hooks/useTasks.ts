import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { Alert, Keyboard } from "react-native";
import { taskService } from "../services/taskService";

export const useTasks = (user: User | null) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Sync tasks in real-time
  useEffect(() => {
    let unsubscribe: () => void;

    if (user) {
      setLoading(true);
      unsubscribe = taskService.getTasks(user.uid, (data) => {
        setTasks(data);
        setLoading(false);
      });
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  // Logic to add a task
  const addTask = async () => {
    if (!taskTitle.trim() || !user) return;
    try {
      await taskService.addTask(user.uid, taskTitle);
      setTaskTitle("");
      Keyboard.dismiss();
    } catch (error: any) {
      Alert.alert("Error", error);
    }
  };

  // Logic to delete a task
  const deleteTask = (taskId: string) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await taskService.deleteTask(taskId);
          } catch (error: any) {
            Alert.alert("Error", error);
          }
        },
      },
    ]);
  };

  return {
    taskTitle,
    setTaskTitle,
    tasks,
    loading,
    addTask,
    deleteTask,
  };
};
