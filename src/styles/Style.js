import { StyleSheet } from "react-native";

export default StyleSheet.create({
  grey: { backgroundColor: "#a2a2a2", flex: 1 },
  cardStyle: {
    borderWidth: 1,
    borderColor: "black",
    minHeight: 70,
    marginHorizontal: "5%",
    marginVertical: 10,
    backgroundColor: "#888"
  },
  setStyle: {
    margin: 2,
    padding: 5,
    minWidth: 150,
    minHeight: 200
  },
  setHeader: {
    fontSize: 16,
    alignSelf: "center"
  },
  buttonStyle: {
    borderColor: "green",
    borderWidth: 1,
    backgroundColor: "green",
    paddingVertical: "1%"
  },
  viewStyle: {
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  deleteButton: {
    color: "white",
    alignSelf: "flex-end",
    backgroundColor: "#d43c2b",
    paddingHorizontal: "2%"
  },
  deleteButtonContainer: {
    backgroundColor: "#d43c2b",
    paddingVertical: "3%",
    marginTop: "5%"
  },
  headerContainer: {
    flex: 1
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3b3b3b",
    paddingVertical: "3%",
    textAlign: "center",
    marginBottom: 15,
    marginHorizontal: "auto",
    backgroundColor: "white"
  },
  scroll: {
    flexGrow: 1,
    height: 250
  },
  textInputStyle: {
    backgroundColor: "#f0eeee",
    borderRadius: 3,
    marginHorizontal: "2%",
    marginBottom: 15,
    padding: "1%",
    height: 50,
    fontSize: 20,
    textAlign: "center"
  },
  saveButton: {
    backgroundColor: "#10B5F8",
    paddingVertical: "2%",
    marginVertical: "2%"
  },
  buttonText: {
    fontSize: 15,
    color: "white",
    alignSelf: "center",
    paddingVertical: "1%",
    justifyContent: "center"
  },
  textStyle: {
    fontSize: 20,
    alignSelf: "center"
  }
});
