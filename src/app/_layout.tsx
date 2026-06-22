import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: 'Pattern Keeper' }}
      />
      <Stack.Screen
        name="pdf"
        options={{ title: 'PDF' }}
      />
    </Stack>
  );
}