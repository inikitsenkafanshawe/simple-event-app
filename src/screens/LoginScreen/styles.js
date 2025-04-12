import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F0FF",
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
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
  placeholder: {
    color: "#B0B0B0",
  },
  error: {
    color: "#FF4D4D",
    fontSize: 14,
    marginBottom: 10,
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
  registerText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#6A4CFF",
  },
  link: {
    color: "#5A3DCC",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default styles;
