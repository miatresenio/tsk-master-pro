// import { Stack } from "expo-router";
// import { AuthProvider } from "../src/store/AuthContext";

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <Stack screenOptions={{ headerShown: false }}>
//         {/* Ang Expo Router na ang bahala sa screens,
//             basta nakabalot sila sa AuthProvider */}
//         <Stack.Screen name="index" />
//         <Stack.Screen name="(auth)" />
//         <Stack.Screen name="(tabs)" />
//       </Stack>
//     </AuthProvider>
//   );
// }

import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../src/store/AuthContext";

function RootLayoutNav() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    // Check kung ang user ay nasa loob ng (auth) o (tabs) na group
    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      // Kung walang user at wala sa login, itapon sa login screen
      router.replace("/(auth)/login");
    } else if (user && inAuthGroup) {
      // Kung may user at nasa login, itapon sa home (tabs)
      router.replace("/(tabs)");
    }
  }, [user, loading, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
