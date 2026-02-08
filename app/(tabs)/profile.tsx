import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { authService } from "../../src/features/auth/services/authService";
import { useAuth } from "../../src/store/AuthContext";

export default function ProfileScreen() {
  const { user } = useAuth();

  const handleLogout = () => {
    Alert.alert("Logout", "Sigurado ka bang gusto mong mag-logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await authService.logout();
          } catch (error: any) {
            // FIX: Dapat laging .message ang ipasa sa alert
            Alert.alert("Error", error.message || "Logout failed");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>
            {user?.email ? user.email.charAt(0).toUpperCase() : "?"}
          </Text>
        </View>
        <Text style={styles.emailText}>{user?.email ?? "No Email"}</Text>
        <Text style={styles.statusText}>TaskMaster Pro User</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    padding: 20,
    paddingTop: 80,
  },
  profileHeader: { alignItems: "center", marginBottom: 50 },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    elevation: 4,
  },
  avatarText: { color: "#FFF", fontSize: 40, fontWeight: "bold" },
  emailText: { fontSize: 22, fontWeight: "bold", color: "#1C1C1E" },
  statusText: { fontSize: 14, color: "#8E8E93", marginTop: 5 },
  logoutButton: {
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    elevation: 3,
    borderWidth: 1,
    borderColor: "#FF3B30",
  },
  logoutText: { color: "#FF3B30", fontWeight: "bold", fontSize: 16 },
});
