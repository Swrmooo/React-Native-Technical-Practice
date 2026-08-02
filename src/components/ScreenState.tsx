import Ionicons from '@expo/vector-icons/Ionicons';
import { ComponentProps } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type IconName = ComponentProps<typeof Ionicons>['name'];

type ScreenStateProps = {
  title: string;
  message?: string;
  isLoading?: boolean;
  iconName?: IconName;
  actionLabel?: string;
  onAction?: () => void;
};

export function ScreenState({
  title,
  message,
  isLoading = false,
  iconName,
  actionLabel,
  onAction,
}: ScreenStateProps) {
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#2563eb"
          accessibilityLabel={title}
        />
      ) : null}
      {!isLoading && iconName ? (
        <View style={styles.iconContainer}>
          <Ionicons
            name={iconName}
            size={32}
            color="#475569"
            accessible={false}
          />
        </View>
      ) : null}
      <Text style={styles.title} accessibilityRole="header">
        {title}
      </Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      {actionLabel && onAction ? (
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={onAction}
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
        >
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f8fafc',
  },
  iconContainer: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    backgroundColor: '#e2e8f0',
  },
  title: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    textAlign: 'center',
  },
  message: {
    marginTop: 8,
    color: '#64748b',
    lineHeight: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    minHeight: 44,
    minWidth: 128,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
