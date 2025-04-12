import { StyleSheet, Platform } from "react-native";

const newEventStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F3F0FF",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#6A4CFF",
  },
  input: {
    height: 50,
    borderColor: "#6A4CFF",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: Platform.OS === "android" ? 10 : 12,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#6A4CFF",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: Platform.OS === "android" ? 0 : 10,
    justifyContent: "center",
    height: 50,
  },
  picker: {
    color: "#000",
  },
  placeholder: {
    color: "#B0B0B0",
  },
  button: {
    backgroundColor: "#6A4CFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#D1C6FF",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "#FF4D4D",
    fontSize: 14,
    marginBottom: 10,
  },
});

export default newEventStyles;
