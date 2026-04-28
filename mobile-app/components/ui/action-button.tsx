import React, { useState } from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemedText } from '@/components/themed-text';
import { moderateScale, scale, verticalScale } from '@/constants/scale';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useHttpService } from '@/hooks/use-http-service';
import { HybridHttpServer } from 'react-native-nitro-http';

export function ActionButton() {
  // const { startService, stopService, status } = useHttpService();
  // const isActive = status == 'started' ? true : false;

  const [isActive, setActive] = useState<boolean>(false);
  const stopService = () => {
    HybridHttpServer.stop();
    setActive(false)
  }

  const startService = () => {
    HybridHttpServer.listen(8080);
    setActive(true);
  }

  const startBackgroundColor = useThemeColor(
    { light: '#1F2937', dark: '#F9FAFB' },
    'text',
  );

  const stopBackgroundColor = useThemeColor(
    { light: '#E02E2A', dark: '#FF8583' },
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
        {
          backgroundColor: isActive
            ? stopBackgroundColor
            : startBackgroundColor,
          opacity: pressed ? 0.9 : 1,
        },
      ]}
      onPress={isActive ? stopService : startService}>
      <View style={styles.content}>
        <MaterialIcons
          name={isActive ? 'stop' : 'play-arrow'}
          size={scale(24)}
          color={textColor}
        />
        <ThemedText style={[styles.text, { color: textColor }]}>
          {isActive ? 'Stop' : 'Start'}
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
