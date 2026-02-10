// import { Stack, useRouter, useSegments } from "expo-router";
// import { useEffect } from "react";
// import { AuthProvider, useAuth } from "../src/store/AuthContext";

// function RootLayoutNav() {
//   const { user, loading } = useAuth();
//   const segments = useSegments();
//   const router = useRouter();

//   useEffect(() => {
//     if (loading) return;

//     // Check kung ang user ay nasa loob ng (auth) o (tabs) na group
//     const inAuthGroup = segments[0] === "(auth)";

//     if (!user && !inAuthGroup) {
//       // Kung walang user at wala sa login, itapon sa login screen
//       router.replace("/(auth)/login");
//     } else if (user && inAuthGroup) {
//       // Kung may user at nasa login, itapon sa home (tabs)
//       router.replace("/(tabs)");
//     }
//   }, [user, loading, segments]);

//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="(auth)" options={{ headerShown: false }} />
//       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//     </Stack>
//   );
// }

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <RootLayoutNav />
//     </AuthProvider>
//   );
// }

// import { Stack, useRouter, useSegments } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
// import { useEffect, useState } from "react";
// import { AuthProvider, useAuth } from "../src/store/AuthContext";

// // Pinipigilan ang Splash Screen na mag-hide nang kusa
// SplashScreen.preventAutoHideAsync();

// function RootLayoutNav() {
//   const { user, loading } = useAuth();
//   const segments = useSegments();
//   const router = useRouter();
//   const [isAppReady, setIsAppReady] = useState(false);

//   // 1. Splash Screen Logic
//   useEffect(() => {
//     const prepareApp = async () => {
//       if (!loading) {
//         // Nag-add tayo ng 1.5 seconds delay para makita ang Splash Screen (Modern Feel)
//         await new Promise((resolve) => setTimeout(resolve, 1500));
//         setIsAppReady(true);
//         await SplashScreen.hideAsync();
//       }
//     };
//     prepareApp();
//   }, [loading]);

//   // 2. Navigation Guard (Onboarding & Auth)
//   useEffect(() => {
//     // Wag mag-navigate hangga't hindi ready ang app at tapos ang loading
//     if (!isAppReady || loading) return;

//     const inAuthGroup = segments[0] === "(auth)";
//     const inTabsGroup = segments[0] === "(tabs)";

//     if (!user) {
//       // Kung walang user, dalhin sa Onboarding screen
//       // Siguraduhin na may file ka sa: app/(auth)/onboarding.tsx
//       if (segments[1] !== "onboarding" && segments[1] !== "login") {
//         router.replace("/(auth)/onboarding");
//       }
//     } else if (user && !inTabsGroup) {
//       // Kung logged in na, diretso sa main app (tabs)
//       router.replace("/(tabs)");
//     }
//   }, [user, isAppReady, loading, segments]);

//   // Habang naglo-load, Splash Screen ang makikita ng user
//   if (!isAppReady) return null;

//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="(auth)" options={{ headerShown: false }} />
//       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//     </Stack>
//   );
// }

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <RootLayoutNav />
//     </AuthProvider>
//   );
// }

// import { Stack, useRouter, useSegments } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
// import { useEffect, useState } from "react";
// import { AuthProvider, useAuth } from "../src/store/AuthContext";

// SplashScreen.preventAutoHideAsync();

// function RootLayoutNav() {
//   const { user, loading } = useAuth();
//   const segments = useSegments();
//   const router = useRouter();
//   const [isAppReady, setIsAppReady] = useState(false);

//   // 1. Splash Screen Control
//   useEffect(() => {
//     const prepareApp = async () => {
//       if (!loading) {
//         // Konting delay para sa professional feel
//         await new Promise((resolve) => setTimeout(resolve, 1500));
//         setIsAppReady(true);
//         await SplashScreen.hideAsync();
//       }
//     };
//     prepareApp();
//   }, [loading]);

//   // 2. Navigation Guard - DITO ANG FIX!
//   useEffect(() => {
//     if (!isAppReady || loading) return;

//     const inAuthGroup = segments[0] === "(auth)";

//     if (!user) {
//       // Kung wala pang user at wala sila sa (auth) group (e.g. nasa root sila)
//       // I-check natin kung nasaan silang screen sa loob ng auth
//       const currentScreen = segments[1];

//       if (!inAuthGroup) {
//         // Kung galing sa labas, default is onboarding
//         router.replace("/(auth)/onboarding");
//       }
//       // KUNG nandoon na sila sa (auth), HUWAG na silang galawin
//       // para makapunta sila sa Login o Register nang malaya.
//     } else if (user && inAuthGroup) {
//       // Kung logged in na pero nasa auth screens pa, itapon sa main app
//       router.replace("/(tabs)");
//     }
//   }, [user, isAppReady, loading, segments]);

//   if (!isAppReady) return null;

//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="(auth)" options={{ headerShown: false }} />
//       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//     </Stack>
//   );
// }

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <RootLayoutNav />
//     </AuthProvider>
//   );
// }

import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "../src/store/AuthContext";

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const [isFirstLoadDone, setIsFirstLoadDone] = useState(false);
  const [hasShownOnboarding, setHasShownOnboarding] = useState(false);

  // 1. SPLASH SCREEN LOGIC
  useEffect(() => {
    async function handleInitialSplash() {
      if (!loading && !isFirstLoadDone) {
        // Branding delay (Unang bukas lang talaga 'to ng app)
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsFirstLoadDone(true);
        await SplashScreen.hideAsync();
      }
    }
    handleInitialSplash();
  }, [loading]);

  // 2. NAVIGATION GUARD LOGIC
  useEffect(() => {
    if (!isFirstLoadDone || loading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!user) {
      // CASE A: Bago ang user at hindi pa nakikita ang onboarding
      if (!hasShownOnboarding) {
        setHasShownOnboarding(true); // I-mark natin na papunta na sa onboarding
        router.replace("/(auth)/onboarding");
      }
      // CASE B: Nag-logout ang user (kasi isFirstLoadDone is true at nasa tabs sila galing)
      else if (!inAuthGroup) {
        router.replace("/(auth)/login");
      }
    } else {
      // CASE C: Logged in na ang user
      if (inAuthGroup) {
        router.replace("/(tabs)");
      }
    }
  }, [user, isFirstLoadDone, loading, segments]);

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
