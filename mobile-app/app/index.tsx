import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';
import { ServerCard } from '@/components/ui/server-card';
import { ZoomControl } from '@/components/ui/zoom-control';
import { ActionButton } from '@/components/ui/action-button';
import { scale } from '@/constants/scale';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.mainContent}>
        <ThemedView style={styles.centerContainer}>
          <ServerCard />
          <ZoomControl />
        </ThemedView>
      </ThemedView>
      <ThemedView
        style={[
          styles.footer,
          { paddingBottom: Math.max(insets.bottom, scale(40)) },
        ]}>
        <ActionButton />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: scale(20),
    justifyContent: 'flex-start',
  },
  centerContainer: {
    alignItems: 'center',
    gap: scale(24),
  },
  footer: {
    paddingHorizontal: scale(20),
    paddingTop: scale(10),
    alignItems: 'center',
  },
});
