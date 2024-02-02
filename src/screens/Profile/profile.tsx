import { TouchableOpacity, View, Text, TextInput } from "react-native";
import { useState } from "react";
import Header from "../../components/header/header";
import {
  BackgroundColor,
  FontSizes,
  Styles,
  Viewport,
} from "../../styles/globalstyles/globalstyles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleLeft, faUser } from "@fortawesome/free-regular-svg-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Button from "../../components/buttons/button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { changePassword } from "../../components/api/api";
import InputField3 from "../../components/inputfield/inputfield3";
import Loading from "../../components/modals/loading";
import Confirmation from "../../components/modals/confirmation";

export default function Profile() {
  const [isPasswordFieldsVisible, setIsPasswordFieldsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [
    isConfirmationChangePasswordVisible,
    setIsConfirmationChangePasswordVisible,
  ] = useState(false);
  const [message, setMessage] = useState("");
  const personalInfo = useSelector(
    (state: RootState) => state.personalInfo.data
  );
  const [data, setData] = useState<any>({
    old_password: "",
    new_password: "",
    confirm_new_password: "",
  });
  const [errorMessages, setErrorMessages] = useState<any[]>([]);
  const firstName = personalInfo?.first_name;
  const middleName = personalInfo?.middle_name;
  const lastName = personalInfo?.last_name;
  const emailAddress = personalInfo?.email;
  const mobileNumber = personalInfo?.mobile_number;
  const username = personalInfo?.username;
  const office = personalInfo?.office;
  const navigation = useNavigation<NavigationProp>();
  const handleBackPressed = () => {
    navigation.goBack();
  };

  const onPressChangePass = () => {
    setIsPasswordFieldsVisible(true);
  };
  const onCancelChangePass = () => {
    setIsPasswordFieldsVisible(false);
    setData((prevData: any) => ({
      ...prevData,
      old_password: "",
      new_password: "",
      confirm_new_password: "",
    }));
    const updatedErrors = { ...errorMessages };
    delete updatedErrors[0];
    setErrorMessages(updatedErrors);
  };
  const onSubmit = () => {
    let validationErrors: { [key: string]: string } = {};

    const isPasswordValid = (value: any) => {
      const passwordRegex = /^(?=.*\d).{8,}$/;
      return passwordRegex.test(value);
    };

    if (!data.old_password) {
      validationErrors.oldPasswordError = "This field is required.";
    }
    if (!data.new_password) {
      validationErrors.newPasswordError = "This field is required.";
    } else {
      if (!isPasswordValid(data.new_password)) {
        validationErrors.invalidNewPassword =
          "Password must be more than 8 characters long and must contain at least one number.";
      }
      if (data.new_password !== data.confirm_new_password) {
        validationErrors.doesNotMatchError = "Password does not match.";
      }
    }

    if (!data.confirm_new_password) {
      validationErrors.confirmNewPasswordError = "This field is required.";
    } else {
      if (data.confirm_new_password !== data.new_password) {
        validationErrors.doesNotMatchError = "Password does not match.";
      }
    }

    const errorArray = [validationErrors];

    setErrorMessages(errorArray);
    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      changePassword(
        data.old_password,
        data.new_password,
        validationErrors,
        setErrorMessages,
        setIsLoading,
        setIsConfirmationChangePasswordVisible,
        setMessage,
        setData
      );
    }
  };
  const handleClose = () => {
    setIsLoading(false);
    setIsConfirmationChangePasswordVisible(false);
  };
  return (
    <>
      <BackgroundColor
        style={{ width: Viewport.width * 1, height: Viewport.height * 0.04 }}
      />
      <Header />

      <KeyboardAwareScrollView
        // resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={{
          width: Viewport.width * 1.0,
          height: Viewport.height * 1.0,
        }}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
        enableAutomaticScroll={true}
        enableOnAndroid={true}
      >
        <View
          style={[
            {
              gap: Viewport.width * 0,
              width: Viewport.width * 1,
              marginTop: Viewport.height * 0.02,
            },
            Styles.flexRow,
          ]}
        >
          <TouchableOpacity onPress={handleBackPressed}>
            <FontAwesomeIcon
              style={{ marginLeft: Viewport.width * 0.05 }}
              icon={faCircleLeft}
              size={48}
              color="#060E57"
            />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: FontSizes.medium,
              color: Colors.primaryColor1,
              fontWeight: "bold",
              textAlign: "center",
              width: Viewport.width * 0.7,
            }}
          >
            Profile
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: Viewport.width * 1,
            height: Viewport.height * 0.85,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              width: Viewport.width * 1,
              marginTop: Viewport.height * 0.03,
            }}
          >
            <FontAwesomeIcon icon={faUser} size={80} color="#060E57" />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: Viewport.width * 1,
              paddingLeft: Viewport.width * 0.08,
              marginTop: Viewport.height * 0.04,
            }}
          >
            <Text
              style={{
                fontSize: FontSizes.small,
                color: Colors.primaryColor1,
                fontWeight: "bold",
                paddingLeft: Viewport.width * 0.166,
              }}
            >
              Name:{" "}
            </Text>
            <Text
              style={{
                fontSize: FontSizes.small,
                color: Colors.primaryColor1,
                paddingLeft: Viewport.width * 0.05,
                width: Viewport.width * 0.6,
              }}
            >
              {lastName}, {firstName} {middleName}
            </Text>
          </View>
          {/* EMAIL ADDRESS */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: Viewport.width * 1,
              paddingLeft: Viewport.width * 0.08,
              marginTop: Viewport.height * 0.01,
            }}
          >
            <Text
              style={{
                fontSize: FontSizes.small,
                color: Colors.primaryColor1,
                fontWeight: "bold",
                paddingLeft: Viewport.width * 0.016,
              }}
            >
              Email address:{" "}
            </Text>
            <Text
              style={{
                fontSize: FontSizes.small,
                color: Colors.primaryColor1,
                paddingLeft: Viewport.width * 0.049,
                width: Viewport.width * 0.6,
              }}
            >
              {emailAddress}
            </Text>
          </View>
          {/* MMOBILE NUMBER */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: Viewport.width * 1,
              paddingLeft: Viewport.width * 0.08,
              marginTop: Viewport.height * 0.01,
            }}
          >
            <Text
              style={{
                fontSize: FontSizes.small,
                color: Colors.primaryColor1,
                fontWeight: "bold",
              }}
            >
              Mobile number:{" "}
            </Text>
            <Text
              style={{
                fontSize: FontSizes.small,
                color: Colors.primaryColor1,
                paddingLeft: Viewport.width * 0.05,
                width: Viewport.width * 0.6,
              }}
            >
              0{mobileNumber}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: Viewport.width * 1,
              paddingLeft: Viewport.width * 0.08,
              marginTop: Viewport.height * 0.01,
            }}
          >
            <Text
              style={{
                fontSize: FontSizes.small,
                color: Colors.primaryColor1,
                fontWeight: "bold",
                paddingLeft: Viewport.width * 0.166,
              }}
            >
              Office:{" "}
            </Text>
            <Text
              style={{
                fontSize: FontSizes.small,
                color: Colors.primaryColor1,
                paddingLeft: Viewport.width * 0.05,
                width: Viewport.width * 0.6,
              }}
            >
              {office}
            </Text>
          </View>
          {/* USERNAME */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: Viewport.width * 1,
              paddingLeft: Viewport.width * 0.08,
              marginTop: Viewport.height * 0.01,
            }}
          >
            <Text
              style={{
                fontSize: FontSizes.small,
                color: Colors.primaryColor1,
                fontWeight: "bold",
                paddingLeft: Viewport.width * 0.087,
              }}
            >
              Username:{" "}
            </Text>
            <Text
              style={{
                fontSize: FontSizes.small,
                color: Colors.primaryColor1,
                paddingLeft: Viewport.width * 0.052,
                width: Viewport.width * 0.6,
              }}
            >
              {username}
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              width: Viewport.width * 1,
              marginTop: Viewport.height * 0.02,
            }}
          >
            {!isPasswordFieldsVisible ? (
              <Button
                onPress={onPressChangePass}
                text="Change password"
                defaultBG
                style={{
                  width: Viewport.width * 0.4,
                  height: Viewport.height * 0.06,
                }}
              />
            ) : (
              <Button
                onPress={onCancelChangePass}
                text="Cancel"
                transparentBG
                transparentText
                style={{
                  width: Viewport.width * 0.4,
                  height: Viewport.height * 0.06,
                }}
              />
            )}
          </View>
          {isPasswordFieldsVisible && (
            <>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  width: Viewport.width * 1,
                  paddingLeft: Viewport.width * 0.1,
                  marginTop: Viewport.height * 0.03,
                  gap: Viewport.width * 0.05,
                }}
              >
                <Text
                  style={{
                    fontSize: FontSizes.small,
                    color: Colors.primaryColor1,
                    fontWeight: "bold",
                  }}
                >
                  Old password <Text style={{ color: "red" }}>*</Text>{" "}
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <InputField3
                    value={data.old_password}
                    secureTextEntry
                    style={{
                      backgroundColor: "white",
                      width: Viewport.width * 0.5,
                      height: Viewport.height * 0.05,
                      borderRadius: 5,
                      paddingLeft: 15,
                      borderColor:
                        errorMessages[0]?.oldPasswordError ||
                        errorMessages[0]?.invalidOldPassword
                          ? "red"
                          : "transparent",
                      borderWidth:
                        errorMessages[0]?.oldPasswordError ||
                        errorMessages[0]?.invalidOldPassword
                          ? 1
                          : 0,
                    }}
                    onChangeText={(text) => {
                      setData((prevData: any) => ({
                        ...prevData,
                        old_password: text,
                      }));
                      if (text) {
                        const updatedErrors = { ...errorMessages };
                        delete updatedErrors[0]?.oldPasswordError;
                        setErrorMessages(updatedErrors);
                      }
                    }}
                  />

                  {errorMessages[0]?.oldPasswordError && (
                    <Text style={Styles.textError}>
                      {errorMessages[0]?.oldPasswordError}
                    </Text>
                  )}
                  {errorMessages[0]?.invalidOldPassword && (
                    <Text style={Styles.textError}>
                      {errorMessages[0]?.invalidOldPassword}
                    </Text>
                  )}
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  width: Viewport.width * 1,
                  paddingLeft: Viewport.width * 0.08,
                  marginTop: Viewport.height * 0.03,
                  gap: Viewport.width * 0.05,
                }}
              >
                <Text
                  style={{
                    fontSize: FontSizes.small,
                    color: Colors.primaryColor1,
                    fontWeight: "bold",
                  }}
                >
                  New password <Text style={{ color: "red" }}>*</Text>{" "}
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <InputField3
                    value={data.new_password}
                    secureTextEntry
                    style={{
                      backgroundColor: "white",
                      width: Viewport.width * 0.5,
                      height: Viewport.height * 0.05,
                      borderRadius: 5,
                      paddingLeft: 15,
                      borderColor:
                        errorMessages[0]?.newPasswordError ||
                        errorMessages[0]?.doesNotMatchError ||
                        errorMessages[0]?.invalidNewPassword
                          ? "red"
                          : "transparent",
                      borderWidth:
                        errorMessages[0]?.newPasswordError ||
                        errorMessages[0]?.doesNotMatchError ||
                        errorMessages[0]?.invalidNewPassword
                          ? 1
                          : 0,
                    }}
                    onChangeText={(text) => {
                      setData((prevData: any) => ({
                        ...prevData,
                        new_password: text,
                      }));
                      if (text) {
                        const updatedErrors = { ...errorMessages };
                        delete updatedErrors[0]?.newPasswordError;
                        setErrorMessages(updatedErrors);
                      }
                    }}
                  />
                  {errorMessages[0]?.newPasswordError && (
                    <Text style={Styles.textError}>
                      {errorMessages[0]?.newPasswordError}
                    </Text>
                  )}
                  {errorMessages[0]?.invalidNewPassword && (
                    <Text
                      style={{
                        color: "red",
                        fontSize: FontSizes.tiny,
                        width: Viewport.width * 0.5,
                        textAlign: "center",
                      }}
                    >
                      {errorMessages[0]?.invalidNewPassword}
                    </Text>
                  )}
                  {errorMessages[0]?.doesNotMatchError && (
                    <Text style={Styles.textError}>
                      {errorMessages[0]?.doesNotMatchError}
                    </Text>
                  )}
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  width: Viewport.width * 1,
                  paddingLeft: Viewport.width * 0.115,
                  marginTop: Viewport.height * 0.03,
                  gap: Viewport.width * 0.02,
                }}
              >
                <Text
                  style={{
                    fontSize: FontSizes.small,
                    color: Colors.primaryColor1,
                    fontWeight: "bold",
                    width: Viewport.width * 0.3,
                  }}
                >
                  Confirm new <Text style={{ color: "red" }}>*</Text> password
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <InputField3
                    value={data.confirm_new_password}
                    secureTextEntry
                    style={{
                      backgroundColor: "white",
                      width: Viewport.width * 0.5,
                      height: Viewport.height * 0.05,
                      borderRadius: 5,
                      paddingLeft: 15,
                      borderColor:
                        errorMessages[0]?.confirmNewPasswordError ||
                        errorMessages[0]?.doesNotMatchError
                          ? "red"
                          : "transparent",
                      borderWidth:
                        errorMessages[0]?.confirmNewPasswordError ||
                        errorMessages[0]?.doesNotMatchError
                          ? 1
                          : 0,
                    }}
                    onChangeText={(text) => {
                      setData((prevData: any) => ({
                        ...prevData,
                        confirm_new_password: text,
                      }));
                      if (text) {
                        const updatedErrors = { ...errorMessages };
                        delete updatedErrors[0]?.confirmNewPasswordError;
                        setErrorMessages(updatedErrors);
                      }
                    }}
                  />
                  {errorMessages[0]?.confirmNewPasswordError && (
                    <Text style={Styles.textError}>
                      {errorMessages[0]?.confirmNewPasswordError}
                    </Text>
                  )}
                  {errorMessages[0]?.doesNotMatchError && (
                    <Text style={Styles.textError}>
                      {errorMessages[0]?.doesNotMatchError}
                    </Text>
                  )}
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  width: Viewport.width * 1,
                  marginTop: Viewport.height * 0.04,
                }}
              >
                <Button
                  onPress={onSubmit}
                  text="Submit"
                  defaultBG
                  style={{
                    width: Viewport.width * 0.9,
                    height: Viewport.height * 0.06,
                  }}
                />
              </View>
            </>
          )}
        </View>
      </KeyboardAwareScrollView>
      <Loading
        animationType="fade"
        visible={isLoading}
        transparent={true}
        onRequestClose={handleClose}
        content="Processing..."
        showContent
      />
      <Confirmation
        visible={isConfirmationChangePasswordVisible}
        animationType="fade"
        transparent={true}
        content={message}
        onRequestClose={handleClose}
        showContent
        adjustedSize
      />
    </>
  );
}
