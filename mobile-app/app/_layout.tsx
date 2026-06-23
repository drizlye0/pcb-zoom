import { scale } from '@/constants/scale';
import { Stack } from 'expo-router';
import { SignalingServerProvider } from '@/hooks/use-signaling-server';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const backgroundColor = useThemeColor({}, 'background');
  const foregroundColor = useThemeColor({}, 'text');
  const isDark = useColorScheme() === "dark" ? true : false;

  return (
    <SignalingServerProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'pcb zoom',
            headerStyle: {
              backgroundColor: backgroundColor,
            },
            headerShadowVisible: false,
            statusBarStyle: isDark ? "light" : "dark",
            headerTitleStyle: {
              fontSize: scale(28),
              fontWeight: 'bold',
              color: foregroundColor,
            },
          }}
        />
      </Stack>
    </SignalingServerProvider>
  );
}
