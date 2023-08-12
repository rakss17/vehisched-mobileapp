import { StackNavigationProp } from "@react-navigation/stack";
import { ReactNode } from "react";
import { ViewStyle, StyleProp } from "react-native";

type RootStackParamList = {
  Landing: undefined;
  Requester: undefined;
};

export type NavigationProp = StackNavigationProp<RootStackParamList>;

export interface Vehicle {
  id: number;
  vehicle_name: string;
  capacity: number;
  vehicle_type: string;
  vehicle_image: any;
  status: string;
}

export interface ButtonProps {
  defaultBG?: boolean;
  text: string;
  onPress?: () => void;
  transparentBG?: boolean;
  transparentText?: boolean;
}

export interface DropdownProps {
  options: string[];
  onCategoryChange: (category: string) => void;
  showIcon?: boolean;
  showBG?: boolean;
  menuAdjusted?: boolean;
  showText?: boolean;
  text?: string;
}

export interface InputFieldProps {
  value: string;
  placeholder: string;
  secureTextEntry?: boolean;
  icon?: any;
  onChangeText?: (text: string) => void;
}

export interface BackgroundColorProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export interface ModalProps {
  visible: boolean;
  transparent: any;
  animationType: any;
  onRequestClose: () => void;
}
export interface CalendarData {
  key: string;
  day?: number;
  isToday: boolean;
  isSelected: boolean | null;
}

export interface DatePickerProps {
  onDateSelected: (date: Date) => void;
}

export interface TripData {
  fromDate: string;
  fromTime: string;
  toDate: string;
  toTime: string;
  noOfPassenger: number;
}

export interface RequestFormDataProps {
  requester_name: string;
  office_dept: string;
  number_of_passenger: number;
  passenger_name: string[];
}

export interface InputField2Props {
  placeholderText: string;
  onChangeText: (text: string) => void;
  keyboardType?: any;
}
