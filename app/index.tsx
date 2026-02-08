// import { Redirect } from "expo-router";
// import { ActivityIndicator, View } from "react-native";
// import { useAuth } from "../src/store/AuthContext";

// export default function Index() {
//   const { user, loading } = useAuth();

//   // Habang chine-check pa ng Firebase kung logged in ang user
//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center" }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   // Logic: Kung may user, rekta sa Home (tabs). Kung wala, sa Login (auth).
//   return user ? <Redirect href="/(tabs)" /> : <Redirect href="/(auth)/login" />;
// }

import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../src/store/AuthContext";

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  // KAPAG WALANG USER, AUTOMATIC REDIRECT SA LOGIN
  return user ? <Redirect href="/(tabs)" /> : <Redirect href="/(auth)/login" />;
}
