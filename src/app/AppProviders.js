import React, { useState, useEffect } from "react";
import { StatusBar, View, ActivityIndicator } from "react-native";
import { NavigationContainer, DarkTheme as NavDarkTheme } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider } from "react-i18next";
import { PortfolioProvider } from "../context/PortfoliosContext";
import i18n from "../i18n";

import RootNavigator from "../navigation/RootNavigator";
import { ThemeProvider, useTheme } from "../theme/ThemeProvider";
import { loadInitialLanguage } from "../services/languageService";

enableScreens(true);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 5000 },
  },
});

function ThemedNavigation() {
  const theme = useTheme();
  const navTheme = {
    ...NavDarkTheme,
    colors: {
      ...NavDarkTheme.colors,
      background: theme.colors.bgColor,
    },
  };
  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar barStyle="light-content" backgroundColor='#161616' />
      <RootNavigator />
    </NavigationContainer>
  );
}

export default function AppProviders() {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    loadInitialLanguage().finally(() => setBooted(true));
  }, []);

  if (!booted) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <ThemeProvider>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#0B0F16",
              }}
            >
              <ActivityIndicator color="#4E8AFF" />
            </View>
          </ThemeProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <I18nextProvider i18n={i18n}>
            <QueryClientProvider client={queryClient}>
              <PortfolioProvider>
                <ThemedNavigation />
              </PortfolioProvider>
            </QueryClientProvider>
          </I18nextProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
