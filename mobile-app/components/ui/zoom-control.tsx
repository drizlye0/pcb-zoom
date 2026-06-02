import React, { use, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { moderateScale, scale, verticalScale } from '@/constants/scale';
import { useThemeColor } from '@/hooks/use-theme-color';
import Slider from '@react-native-community/slider'
import { webrtcManager } from '@/services';

const ZoomPromise = webrtcManager.getMaxZoomLevel();
const getMaxZoomLevel = () => {
  const level = use(ZoomPromise);
  if(level === undefined) return 1;
  return level;
}

export function ZoomControl() {
  const [flash, setFlash] = useState<boolean>(false);
  const [sliderValue, setSliderValue] = useState<number>(0);

  const borderColor = useThemeColor({ light: '#E1E1E1', dark: '#333' }, 'icon');
  const sliderTrackColor = useThemeColor(
    { light: '#F3F4F6', dark: '#1F2937' },
    'background',
  );
  const secondaryTextColor = useThemeColor(
    { light: '#6B7280', dark: '#9CA3AF' },
    'text',
  );
  const buttonBgColor = useThemeColor(
    { light: '#F9FAFB', dark: '#111827' },
    'background',
  );

  return (
    <ThemedView style={[styles.container, { borderColor }]}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <MaterialIcons
            name="zoom-in"
            size={scale(24)}
            color={secondaryTextColor}
          />
          <ThemedText type="defaultSemiBold" style={styles.title}>
            Camera Zoom
          </ThemedText>
        </View>
        <ThemedText style={[styles.zoomValue, { color: secondaryTextColor }]}>
          {sliderValue.toFixed(1)}x
        </ThemedText>
      </View>

      <View style={styles.sliderContainer}>
        <Slider
          style={styles.sliderTrack}
          minimumValue={0}
          step={getMaxZoomLevel() * 0.10}
          maximumValue={getMaxZoomLevel()}
          onValueChange={(value) => setSliderValue(value)}
        />
      </View>

      <View style={[styles.divider, { backgroundColor: borderColor }]} />

      <Pressable onPress={() => setFlash(true)}>
        <View style={[styles.flashButton, { backgroundColor: buttonBgColor }]}>
          <MaterialIcons
            name="flashlight-off"
            size={scale(24)}
            color={secondaryTextColor}
          />
          <ThemedText style={[styles.flashText, { color: secondaryTextColor }]}>
            Flash Off
          </ThemedText>
        </View>
      </Pressable>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: moderateScale(16),
    marginLeft: scale(8),
  },
  zoomValue: {
    fontSize: moderateScale(16),
  },
  sliderContainer: {
    height: verticalScale(40),
    justifyContent: 'center',
    marginBottom: verticalScale(16),
  },
  sliderTrack: {
    height: verticalScale(6),
    width: '100%',
  },
  sliderThumb: {
    position: 'absolute',
    width: scale(24),
    height: scale(24),
    borderRadius: scale(12),
    backgroundColor: '#1F2937',
    left: 0,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  divider: {
    height: 1,
    width: '100%',
    marginBottom: verticalScale(16),
  },
  flashButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(12),
  },
  flashText: {
    marginLeft: scale(8),
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
});
