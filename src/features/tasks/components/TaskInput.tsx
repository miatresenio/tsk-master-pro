import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface TaskInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onAdd: () => void;
}

export const TaskInput = ({ value, onChangeText, onAdd }: TaskInputProps) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="New task..."
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity style={styles.addButton} onPress={onAdd}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: { flexDirection: "row", marginBottom: 20, gap: 10 },
  input: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    elevation: 1,
  },
  addButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: "center",
  },
  addButtonText: { color: "#FFF", fontWeight: "bold" },
});
