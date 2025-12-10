import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const HomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo_szs.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>ХО Срби за Србе</Text>
      <Text style={styles.subtitle}>
        Помоћ вишечланим породицама широм Балкана. Деца су наша будућност!
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/events")}
      >
        <Text style={styles.buttonText}>Погледај догађаје</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0e66e9ff",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000000ff",
  },
  subtitle: {
    fontSize: 16,
    color: "#000000ff",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#062b66ff",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomeScreen;
