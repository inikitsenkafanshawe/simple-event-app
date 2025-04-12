import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F3F0FF",
    padding: 20,
  },
  detailsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6A4CFF",
    flex: 1,
    marginLeft: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 6,
  },
  sectionLabel: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "bold",
    color: "#6A4CFF",
  },
  descriptionText: {
    fontSize: 14,
    color: "#444",
    marginTop: 4,
  },
  userBubble: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6A4CFF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginTop: 6,
  },
  userBubbleText: {
    color: "#fff",
    marginLeft: 6,
    fontSize: 12,
  },
  ownerActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6A4CFF",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  iconButtonText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "600",
  },
  error: {
    color: "#FF4D4D",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
});

export default styles;
