import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ServerCard } from '@/components/ui/server-card';
import { ZoomControl } from '@/components/ui/zoom-control';
import { ActionButton } from '@/components/ui/action-button';
import { scale } from '@/constants/scale';

export default function HomeScreen() {
  const colorscheme = useColorScheme() ? 'dark' : 'light';

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.mainContent}>
        <ServerCard />
        <ZoomControl />
        <ActionButton />
      </ThemedView>
      <StatusBar style={colorscheme} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  mainContent: {
    flex: 1,
    margin: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
