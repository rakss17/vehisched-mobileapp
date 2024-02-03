import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
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
import { SigninAPI, resetPassword } from "../../components/api/api";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InputField3 from "../../components/inputfield/inputfield3";
import Loading from "../../components/modals/loading";
import Confirmation from "../../components/modals/confirmation";

export default function Landing() {
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessages, setErrorMessages] = useState<any[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [isForgotPasswordEmailVisible, setIsForgotPasswordEmailVisible] =
    useState(false);
  const [
    isConfirmationSubmittedEmailVisible,
    setIsConfirmationSubmittedEmailVisible,
  ] = useState(false);
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

  const isEmailValid = (value: any) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(value);
  };

  const onSubmitEmail = () => {
    let validationErrors: { [key: string]: string } = {};

    if (!email) {
      validationErrors.emailError = "Please input your valid email address.";
    } else {
      if (!isEmailValid(email)) {
        validationErrors.invalidEmailError = "Invalid email address.";
      }
    }

    const errorArray = [validationErrors];

    setErrorMessages(errorArray);
    if (Object.keys(validationErrors).length === 0) {
      setIsProcessing(true);
      resetPassword(
        email,
        setEmail,
        setIsProcessing,
        setIsConfirmationSubmittedEmailVisible,
        setIsForgotPasswordEmailVisible
      );
    }
  };
  const handleForgotPasswordPressed = () => {
    setIsForgotPasswordEmailVisible(true);
  };

  const onCancelEmailSubmission = () => {
    setIsForgotPasswordEmailVisible(false);
    setEmail("");
    const updatedErrors = { ...errorMessages };
    delete updatedErrors[0];
    setErrorMessages(updatedErrors);
  };
  const handleClose = () => {
    setIsProcessing(false);
    setIsConfirmationSubmittedEmailVisible(false);
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
                <TouchableOpacity onPress={handleForgotPasswordPressed}>
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
      <Modal
        visible={isForgotPasswordEmailVisible}
        animationType="fade"
        transparent={true}
      >
        <View
          style={[
            {
              height: Viewport.height * 1,
              width: Viewport.width * 1,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              zIndex: 1,
            },
            Styles.flexColumn,
          ]}
        >
          <View
            style={[
              {
                backgroundColor: Colors.primaryColor2,
                width: Viewport.width * 0.9,
                height: Viewport.height * 0.5,
                paddingTop: Viewport.height * 0.05,
                paddingLeft: Viewport.width * 0.05,
                paddingBottom: Viewport.height * 0.03,
                borderRadius: 10,
                gap: Viewport.height * 0.02,
              },
            ]}
          >
            <Text
              style={{
                fontSize: FontSizes.medium,
                fontWeight: "bold",
                color: Colors.primaryColor1,
              }}
            >
              Forgot your password?
            </Text>
            <Text
              style={{
                fontSize: FontSizes.small,
              }}
            >
              Enter your email address below and we'll email instructions to
              reset your password.
            </Text>
            <Text>Email address</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: Viewport.height * 0.01,
              }}
            >
              <InputField3
                value={email}
                style={{
                  backgroundColor: "white",
                  width: Viewport.width * 0.8,
                  height: Viewport.height * 0.06,
                  borderRadius: 5,
                  paddingLeft: 15,
                  borderColor:
                    errorMessages[0]?.emailError ||
                    errorMessages[0]?.invalidEmailError
                      ? "red"
                      : "transparent",
                  borderWidth:
                    errorMessages[0]?.emailError ||
                    errorMessages[0]?.invalidEmailError
                      ? 1
                      : 0,
                }}
                onChangeText={(text) => {
                  setEmail(text);
                  if (text) {
                    const updatedErrors = { ...errorMessages };
                    delete updatedErrors[0]?.emailError;
                    setErrorMessages(updatedErrors);
                    if (isEmailValid(text)) {
                      const updatedErrors = { ...errorMessages };
                      delete updatedErrors[0]?.invalidEmailError;
                      setErrorMessages(updatedErrors);
                    }
                  }
                }}
              />
              {errorMessages[0]?.emailError && (
                <Text
                  style={[
                    { paddingLeft: Viewport.width * 0.03 },
                    Styles.textError,
                  ]}
                >
                  {errorMessages[0]?.emailError}
                </Text>
              )}
              {errorMessages[0]?.invalidEmailError && (
                <Text
                  style={[
                    { paddingLeft: Viewport.width * 0.03 },
                    Styles.textError,
                  ]}
                >
                  {errorMessages[0]?.invalidEmailError}
                </Text>
              )}
            </View>

            <View
              style={[
                {
                  justifyContent: "space-around",
                  paddingRight: Viewport.width * 0.05,
                  marginTop: Viewport.height * 0.06,
                },
                Styles.flexRow,
              ]}
            >
              <Button
                text="Cancel"
                transparentBG
                transparentText
                onPress={onCancelEmailSubmission}
              />
              <Button text="Submit" defaultBG onPress={onSubmitEmail} />
            </View>
          </View>
        </View>
      </Modal>
      <Loading
        animationType="fade"
        visible={isProcessing}
        transparent={true}
        onRequestClose={handleClose}
        content="Processing..."
        showContent
      />
      <Confirmation
        visible={isConfirmationSubmittedEmailVisible}
        animationType="fade"
        transparent={true}
        content="We've emailed you the instructions. Please check your email."
        onRequestClose={handleClose}
        showContent
        adjustedSize
      />
    </>
  );
}
