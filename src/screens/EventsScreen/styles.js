import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F0FF",
    padding: 20,
  },
  searchBar: {
    height: 50,
    borderColor: "#6A4CFF",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
  },
  placeholder: {
    color: "#B0B0B0",
  },
  eventCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#EFEAFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 4,
  },
  cardContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6A4CFF",
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  infoIcon: {
    marginRight: 6,
  },
  infoText: {
    fontSize: 14,
    color: "#666666",
  },
  fab: {
    backgroundColor: "#6A4CFF",
    position: "absolute",
    right: 0,
    bottom: 0,
    margin: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  error: {
    color: "#FF4D4D",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
});

export default styles;
