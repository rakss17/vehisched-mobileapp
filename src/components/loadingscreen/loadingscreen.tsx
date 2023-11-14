import { View, ActivityIndicator, Text } from "react-native";

import {
  Styles,
  Viewport,
  BackgroundColor,
  Colors,
  FontSizes,
} from "../../styles/globalstyles/globalstyles";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../interfaces/interfaces";
import { StackNavigationProp } from "@react-navigation/stack";

type LoadingScreenRouteProp = RouteProp<RootStackParamList, "LoadingScreen">;

export type Props = {
  route: LoadingScreenRouteProp;
};

export default function LoadingScreen({ route }: Props) {
  const { message } = route.params;

  return (
    <>
      <BackgroundColor
        style={{ width: Viewport.width * 1, height: Viewport.height * 0.04 }}
      />
      <View style={Styles.container}>
        <ActivityIndicator
          size={FontSizes.extraLarge}
          color={Colors.primaryColor1}
        />
        <Text
          style={{
            fontSize: FontSizes.normal,
            color: Colors.primaryColor1,
          }}
        >
          {message}
        </Text>
      </View>
    </>
  );
}
