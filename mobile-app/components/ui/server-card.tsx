import React, { Suspense, use } from 'react';
import { StyleProp, StyleSheet, TextStyle, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { moderateScale, scale, verticalScale } from '@/constants/scale';
import { useThemeColor } from '@/hooks/use-theme-color';
import { getIpAddressAsync } from 'expo-network';
import { useSignalingServer } from '@/hooks/use-signaling-server';

const ipPromise = getIpAddressAsync();

const IpAddress = ({ styles }: { styles: StyleProp<TextStyle> }) => {
  const ipAddress = use(ipPromise);
  return <ThemedText style={styles}>{ipAddress}</ThemedText>;
};

export function ServerCard() {
  const { status } = useSignalingServer();

  const borderColor = useThemeColor({ light: '#E1E1E1', dark: '#333' }, 'icon');
  const iconBgColor = useThemeColor(
    { light: '#F5F5F5', dark: '#222' },
    'background',
  );
  const secondaryTextColor = useThemeColor(
    { light: '#6B7280', dark: '#9CA3AF' },
    'text',
  );

  return (
    <ThemedView style={[styles.container, { borderColor }]}>
      <View style={styles.topSection}>
        <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
          <MaterialIcons name="dns" size={scale(24)} color="#333" />
        </View>
        <View style={styles.headerInfo}>
          <ThemedText type="defaultSemiBold" style={styles.title}>
            Server Address
          </ThemedText>
          <Suspense fallback={<ThemedText>Loading...</ThemedText>}>
            <IpAddress
              styles={[styles.subtitle, { color: secondaryTextColor }]}
            />
          </Suspense>
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: borderColor }]} />

      <View style={styles.bottomSection}>
        <View style={styles.statusRow}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: status == 'started' ? '#77fc03' : '#6B7280' },
            ]}
          />
          <ThemedText
            style={[styles.statusLabel, { color: secondaryTextColor }]}>
            Status
          </ThemedText>
          <ThemedText type="defaultSemiBold">
            {status == 'started' ? 'Online' : 'Offline'}
          </ThemedText>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: moderateScale(16),
    borderWidth: 1,
    padding: moderateScale(16),
    width: '100%',
    marginVertical: verticalScale(8),
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  iconContainer: {
    width: scale(48),
    height: scale(48),
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInfo: {
    marginLeft: scale(16),
  },
  title: {
    fontSize: moderateScale(18),
  },
  subtitle: {
    fontSize: moderateScale(14),
    marginTop: verticalScale(2),
  },
  divider: {
    height: 1,
    width: '100%',
    marginBottom: verticalScale(12),
  },
  bottomSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: '#6B7280',
    marginRight: scale(8),
  },
  statusLabel: {
    fontSize: moderateScale(14),
    marginRight: scale(8),
  },
});
