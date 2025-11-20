import React from 'react';
import { StyleSheet, View } from 'react-native';
import LoadingCircle from '../components/LoadingCircle';

export default function LoadingPage() {
  return (
    <View style={styles.container}>
      <LoadingCircle size={80} color="#360479" strokeWidth={5} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
});
