import { View, Text } from "react-native";
import { useState } from "react";
import {
  BackgroundColor,
  Styles,
  FontSizes,
  Colors,
  Viewport,
} from "../../styles/globalstyles/globalstyles";
import InputField1 from "../../components/inputfield/inputfield1";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

export default function Landing() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const handleOnChangeText = (value: any, fieldName: any) => {
    setData({ ...data, [fieldName]: value });
  };
  return (
    <>
      <BackgroundColor>
        <View style={Styles.container}>
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
              padding: 10,
            }}
          >
            <View style={Styles.flexColumn}>
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
            </View>
          </View>
        </View>
      </BackgroundColor>
    </>
  );
}
