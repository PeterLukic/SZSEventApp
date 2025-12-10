import { useEffect, useState } from "react";
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { eventImages } from "../../assets/images/events";
import { getEventsWithDetails, initDB } from "../../database/db";

export default function EventsScreen() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    async function loadEvents() {
      try {
        await initDB();
        const data = await getEventsWithDetails();
        console.log("Component received events:", data);
        setEvents(data);
      } catch (error) {
        console.error("Failed to load events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  if (loading) {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Loading events...</Text>
      </ScrollView>
    );
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Events ({events.length})</Text>

        {events.length === 0 ? (
          <Text style={{ padding: 10 }}>No events found</Text>
        ) : (
          events.map((ev) => {
            console.log("Rendering event:", ev);
            
            // Extract filename from path (handles both / and \ separators)
            const imageName = ev.imagepath 
              ? ev.imagepath.split(/[\\\/]/).pop() 
              : null;
            
            const imageSource = imageName ? eventImages[imageName] : null;
            
            console.log("Image name:", imageName);
            console.log("Image source found:", !!imageSource);

            return (
              <View key={ev.eventid} style={styles.card}>
                <Text style={styles.title}>{ev.title}</Text>
                <Text style={styles.subtitle}>{ev.eventdate} | {ev.townname}, {ev.countryname}</Text>
                
                {imageSource ? (
                  <TouchableOpacity onPress={() => setSelectedImage(imageSource)}>
                    <Text style={styles.viewFullImage}>📷 Tap to view full image</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={{ padding: 10, color: "#999" }}>No image available</Text>
                )}
              </View>
            );
          })
        )}
      </ScrollView>

      {/* Full-screen image modal */}
      <Modal
        visible={!!selectedImage}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectedImage(null)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setSelectedImage(null)}
          >
            <Text style={styles.closeButtonText}>✕ Close</Text>
          </TouchableOpacity>
          
          {selectedImage && (
            <Image
              source={selectedImage}
              style={styles.fullImage}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: "#fff", flex: 1 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  card: { marginBottom: 15, padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, backgroundColor: "#fafafa" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 10 },
  viewFullImage: { fontSize: 14, color: "#007AFF", marginTop: 8, paddingVertical: 8, fontWeight: "600" },
  
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  fullImage: {
    width: "100%",
    height: "80%",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 12,
    borderRadius: 8,
    zIndex: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
