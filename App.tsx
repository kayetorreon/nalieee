import { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { Nunito_700Bold, Nunito_800ExtraBold } from "@expo-google-fonts/nunito";
import { DMSans_400Regular, DMSans_500Medium, DMSans_700Bold } from "@expo-google-fonts/dm-sans";
import { Gaegu_700Bold } from "@expo-google-fonts/gaegu";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import Shell from "./src/dashboard/Shell";
import { colors } from "./src/theme";

function AuthGate() {
  const { user, initializing } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  if (initializing) {
    return <View style={styles.center}><ActivityIndicator color={colors.pink} /></View>;
  }

  if (!user) {
    return mode === "signin"
      ? <SignInScreen onGoToSignUp={() => setMode("signup")} />
      : <SignUpScreen onGoToSignIn={() => setMode("signin")} />;
  }

  return <Shell />;
}

export default function App() {
  const [fontsLoaded] = useFonts({ Nunito_700Bold, Nunito_800ExtraBold, DMSans_400Regular, DMSans_500Medium, DMSans_700Bold, Gaegu_700Bold });

  if (!fontsLoaded) return <View style={styles.center}><ActivityIndicator color={colors.pink} /></View>;

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar style="dark" />
        <AuthGate />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 16, backgroundColor: colors.cream },
});
