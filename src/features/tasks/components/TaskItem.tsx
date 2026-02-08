import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TaskItemProps {
  title: string;
  onDelete: () => void;
}

export const TaskItem = ({ title, onDelete }: TaskItemProps) => {
  return (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>{title}</Text>
      <TouchableOpacity onPress={onDelete}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 15,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    elevation: 2,
  },
  taskText: { fontSize: 16, color: "#3A3A3C", flex: 1 },
  deleteText: { color: "#FF3B30", fontWeight: "600" },
});
