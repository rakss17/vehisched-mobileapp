import { View, Text } from "react-native";
import {
  Viewport,
  BackgroundColor,
} from "../../styles/globalstyles/globalstyles";

export default function Landing() {
  return (
    <>
      <BackgroundColor>
        <View
          style={{
            width: Viewport.width * 1.0,
            height: Viewport.height * 1.0,
          }}
        >
          <Text>TEST</Text>
        </View>
      </BackgroundColor>
    </>
  );
}
