import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { useFirebase } from "../../hooks/useFirebase";

function Logined()
{
  const { logout } = useFirebase();
  return (
    <View>
      <Text>Logined</Text>
      <Button
        onPress={() =>
        {
          logout();
        }}
      >
        logout
      </Button>
    </View>
  );
}

export default Logined;
