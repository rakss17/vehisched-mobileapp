import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import {
  BackgroundColor,
  Styles,
  FontSizes,
  Colors,
  Viewport,
} from "../../styles/globalstyles/globalstyles";
import InputField1 from "../../components/inputfield/inputfield1";
import Checkbox from "expo-checkbox";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/buttons/button";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Landing: undefined;
  Requester: undefined;
};

type LandingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Landing"
>;

export default function Landing() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const navigation = useNavigation<LandingScreenNavigationProp>();

  const handleOnChangeText = (value: any, fieldName: any) => {
    setData({ ...data, [fieldName]: value });
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckBoxToggle = () => {
    setIsChecked(!isChecked);
  };

  const handleSignIn = () => {
    if (data.username === "requester") {
      navigation.navigate("Requester");
    }
  };
  return (
    <>
      <BackgroundColor style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={Styles.container}>
          <Text
            style={{
              fontSize: FontSizes.extraLarge,
              color: Colors.secondaryColor1,
            }}
          >
            Vehi-Sched
          </Text>
          <Text
            style={{
              fontSize: FontSizes.normal,
              color: Colors.secondaryColor1,
            }}
          >
            Vehicle Scheduling for USTP Motor Pool
          </Text>
          <View
            style={{
              backgroundColor: Colors.primaryColor2,
              width: Viewport.width * 0.9,
              height: Viewport.height * 0.5,
              marginTop: 40,
              borderRadius: 10,
              padding: 20,
            }}
          >
            <View style={[{ gap: 10 }, Styles.flexColumn]}>
              <Text style={{ fontSize: FontSizes.normal }}>
                Sign in to your account
              </Text>
              <InputField1
                icon={faUser}
                value={data.username}
                placeholder="Username"
                onChangeText={(value) => handleOnChangeText(value, "username")}
              />
              <InputField1
                icon={faLock}
                value={data.password}
                placeholder="Password"
                onChangeText={(value) => handleOnChangeText(value, "password")}
                secureTextEntry
              />
              <View style={{ paddingLeft: 170 }}>
                <TouchableOpacity>
                  <Text
                    style={{
                      textDecorationLine: "underline",
                      color: Colors.secondaryColor3,
                    }}
                  >
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={[{ marginTop: 10 }, Styles.flexRow]}>
                <Checkbox
                  style={{
                    height: Viewport.height * 0.02,
                    width: Viewport.width * 0.04,
                  }}
                  value={isChecked}
                  onValueChange={handleCheckBoxToggle}
                  color={isChecked ? Colors.secondaryColor3 : undefined}
                />
                <Text style={{ paddingLeft: 5 }}>Remember Me</Text>
                <BackgroundColor
                  style={{
                    width: Viewport.width * 0.3,
                    height: Viewport.height * 0.06,
                    borderRadius: 10,
                    marginLeft: 45,
                  }}
                >
                  <Button onPress={handleSignIn} text="Sign In"></Button>
                </BackgroundColor>
              </View>
              <BackgroundColor
                style={{
                  marginTop: Viewport.height * 0.06,
                  width: Viewport.width * 0.9,
                  height: Viewport.height * 0.01,
                }}
              />
            </View>
          </View>
        </ScrollView>
      </BackgroundColor>
    </>
  );
}
