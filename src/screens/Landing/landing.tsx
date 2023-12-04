import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useState, useEffect } from "react";
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
import { NavigationProp } from "../../interfaces/interfaces";
import { SigninAPI } from "../../components/api/api";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Signup from "../../components/modals/signup";

export default function Landing() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();
  const personalInfo = useSelector(
    (state: RootState) => state.personalInfo.data
  );
  const role = personalInfo?.role;

  useEffect(() => {
    const fetchTokenAndNavigate = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        if (role === "driver") {
          navigation.navigate("Driver");
        } else if (role === "gate guard") {
          navigation.navigate("GateGuard");
        } else if (role === "requester" || role === "vip") {
          navigation.navigate("Requester");
        }
      }
    };

    fetchTokenAndNavigate();
  }, []);

  const handleOnChangeText = (value: any, fieldName: any) => {
    setData({ ...data, [fieldName]: value });
  };

  const handleCheckBoxToggle = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (isLoading) {
      navigation.navigate("LoadingScreen", { message: "Signing in" });
    }
  }, [isLoading]);

  const handleSignIn = () => {
    setIsLoading(true);
    SigninAPI(
      data,
      navigation,
      setData,
      setErrorMessage,
      setIsLoading,
      dispatch
    );
  };

  const [isSignupOpen, setSignupOpen] = useState(false)
  const handleSignupOpen=() =>{
    setSignupOpen(true)
  }
  
  const handleCloseSignup = () => {
    setSignupOpen(false);
  };
  return (
    <>
      <BackgroundColor style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={Styles.containerr}>
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
              height: "auto",
              marginTop: 40,
              borderRadius: 10,
              paddingTop: 20,
              paddingBottom: 55,
            }}
          >
            <View style={[{ gap: 10 }, Styles.flexColumn]}>
              <Text style={{ fontSize: FontSizes.normal }}>
                Sign in to your account
              </Text>

              {errorMessage && (
                <Text
                  style={{
                    fontSize: FontSizes.small,
                    color: Colors.errorColor,
                  }}
                >
                  {errorMessage}
                </Text>
              )}

              <InputField1
                icon={faUser}
                value={data.username}
                placeholder="Username"
                onChangeText={(value) => handleOnChangeText(value, "username")}
                autoCapitalize="none"
              />
              <InputField1
                icon={faLock}
                value={data.password}
                placeholder="Password"
                onChangeText={(value) => handleOnChangeText(value, "password")}
                secureTextEntry
                autoCapitalize="none"
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
              <View style={{marginTop:10, marginBottom:-35}}>
              <TouchableOpacity onPress={handleSignupOpen}>
                  <Text
                    style={{
                      textDecorationLine: "underline",
                      color: Colors.secondaryColor3,
                    }}
                  >
                    Create an Account
                  </Text>
                </TouchableOpacity>
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
          {isSignupOpen && <Signup onCloseSignup={handleCloseSignup}/>}
        </ScrollView>
      </BackgroundColor>
    </>
  );
}
