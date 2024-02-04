import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Text, Card, Avatar, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userBalance, setUserBalance] = useState(1000); // Example balance
  const [todayWager, setTodayWager] = useState(100); // Example wager
  const [photo, setPhoto] = useState(null);
  const { colors } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const deadline = new Date();
  deadline.setHours(23, 59, 0, 0);

  const timeLeft = deadline - currentTime;
  const hoursLeft = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutesLeft = Math.floor((timeLeft / (1000 * 60)) % 60);
  const secondsLeft = Math.floor((timeLeft / 1000) % 60);

  const handleUploadPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      setPhoto(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Daily Challenge" subtitle={`Deadline: ${deadline.toLocaleDateString()} 11:59 PM`} left={(props) => <Avatar.Icon {...props} icon="timer" />} />
        <Card.Content>
          <Text style={styles.timer}>Time Left: {hoursLeft}h {minutesLeft}m {secondsLeft}s</Text>
          <Text style={{ color: colors.primary }}>Balance: ${userBalance}</Text>
          <Text style={{ color: colors.accent }}>Today's Wager: ${todayWager}</Text>
        </Card.Content>
        {photo && <Card.Cover source={{ uri: photo }} style={styles.photo} />}
        <Card.Actions>
          <Button icon="camera" mode="contained" onPress={handleUploadPhoto} style={styles.button}>
            Upload Photo
          </Button>
        </Card.Actions>
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    margin: 10,
    elevation: 4,
  },
  timer: {
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  photo: {
    marginVertical: 10,
  },
  button: {
    margin: 10,
  },
});

export default Home;
