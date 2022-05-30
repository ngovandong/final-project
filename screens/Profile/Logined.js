import { View, Text, StyleSheet } from "react-native";
import { Appbar, Avatar, Button, List } from "react-native-paper";
import { useFirebase } from "../../hooks/useFirebase";

function Logined()
{
  const { logout } = useFirebase();
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content color='white' title="You" />
      </Appbar.Header>
      <View style={styles.subContainer}>
        <View style={{ flex: 1 }}>
          <Text style={{ flex: 1, marginLeft: 5, color: "#555", fontWeight: "600" }}  > Account</Text>
          <View style={styles.my}>
            <Avatar.Text size={40} style={{ marginRight: 10 }} label="D" />
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>dongngo2001@gmail.com</Text>
          </View>
        </View>
      </View>
      <View style={styles.subContainer}>
        <View style={{ flex: 1 }}>
          <Text style={{ flex: 1, marginLeft: 5, marginBottom: 10, color: "#555", fontWeight: "600" }}  > Logout</Text>
          <Button
            onPress={() => { logout() }}
            style={{ backgroundColor: 'black', borderRadius: 10 }} color="white">Logout</Button>
        </View>
      </View>
      <View style={styles.subContainer}>
        <View style={{ height: 150 }}>
          <Text style={{ flex: 1, marginLeft: 5, color: "#555", fontWeight: "600" }}  > My</Text>
          <List.Item
            onPress={() => { }}
            title="My playlist"
            left={props => <List.Icon {...props} icon="book-music" />}
          />
          <List.Item
            onPress={() => { }}
            title="My favorite"
            left={props => <List.Icon {...props} icon="heart" />}
          />
        </View>
      </View>

    </View >
  );
}

export default Logined;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    padding: 10,
    maxHeight: 110
  },
  my: {
    padding: 10,
    height: 60,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: 'center',
    backgroundColor: 'white'
  },
  content: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});

