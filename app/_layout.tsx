import { scale } from '@/constants/scale';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'pcb zoom',
          headerShadowVisible: false,
          headerTitleStyle: {
            fontSize: scale(28),
            fontWeight: 'bold',
          },
        }}
      />
    </Stack>
  );
}
