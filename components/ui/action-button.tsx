import React from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { ThemedText } from '@/components/themed-text';
import { moderateScale, scale, verticalScale } from '@/constants/scale';
import { useThemeColor } from '@/hooks/use-theme-color';

export function ActionButton() {
  const backgroundColor = useThemeColor(
    { light: '#1F2937', dark: '#F9FAFB' },
    'text',
  );
  const textColor = useThemeColor(
    { light: '#FFFFFF', dark: '#1F2937' },
    'background',
  );

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor, opacity: pressed ? 0.9 : 1 },
      ]}>
      <View style={styles.content}>
        <MaterialIcons name="play-arrow" size={scale(24)} color={textColor} />
        <ThemedText style={[styles.text, { color: textColor }]}>
          Start Server
        </ThemedText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: verticalScale(64),
    borderRadius: moderateScale(16),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(12),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginLeft: scale(8),
  },
});
