import { scale } from '@/constants/scale';
import { Stack } from 'expo-router';
import { SignalingServerProvider } from '@/hooks/use-signaling-server';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function RootLayout() {
  const backgroundColor = useThemeColor({}, 'background');
  const foregroundColor = useThemeColor({}, 'text');

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
            statusBarStyle: "auto",
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
