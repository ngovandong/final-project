import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { useFirbase } from "../../hooks/useFirebase";

function Logined() {
  const { logout } = useFirbase();
  return (
    <View>
      <Text>Logined</Text>
      <Button
        onPress={() => {
          logout();
        }}
      >
        logout
      </Button>
    </View>
  );
}

export default Logined;
