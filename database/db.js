import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { getEventsWithDetails, initDB } from "../../database/db";

export default function EventsScreen() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function loadEvents() {
      await initDB();
      const data = await getEventsWithDetails();
      setEvents(data);
    }
    loadEvents();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Events</Text>
      {events.map((ev) => (
        <View key={ev.eventid} style={styles.card}>
          <Text style={styles.title}>{ev.title}</Text>
          <Text>{ev.eventdate} | {ev.townname}, {ev.countryname}</Text>
          {/* Render image if it exists */}
          {ev.imagepath ? (
            <Image
              source={{ uri: `file://${ev.imagepath}` }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : null}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  card: { marginBottom: 15, padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 8 },
  title: { fontSize: 18, fontWeight: "bold" },
  image: { width: "100%", height: 200, marginTop: 10, borderRadius: 8 },
});
