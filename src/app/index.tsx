import * as DocumentPicker from 'expo-document-picker';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  async function pickPdf() {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: true,
    });

    if (result.canceled) return;

    const file = result.assets[0];

    router.push({
      pathname: '/pdf',
      params: {
        uri: file.uri,
        name: file.name,
      },
    });
  }

  function openSamplePdf() {
    router.push({
      pathname: '/pdf',
      params: {
        uri: 'sample',
        name: 'sample.pdf',
      },
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pattern Keeper</Text>

      <Pressable style={styles.button} onPress={pickPdf}>
        <Text style={styles.buttonText}>PDF 불러오기</Text>
      </Pressable>

      <Pressable style={styles.subButton} onPress={openSamplePdf}>
        <Text style={styles.subButtonText}>샘플 PDF 열기</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#111',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 999,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  subButton: {
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  subButtonText: {
    color: '#555',
    fontWeight: '700',
  },
});