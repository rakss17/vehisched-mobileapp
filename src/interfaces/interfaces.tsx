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
  isVip: boolean;
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
  header?: string;
  content?: string;
  footer?: string;
  onNextPressed?: () => void;
}
export interface CalendarData {
  key: string;
  day?: number;
  isToday: boolean;
  isSelected: boolean | null;
}

export interface DatePickerProps {
  onDateSelected: (date: Date) => void;
  button2?: boolean;
  selectedDate?: any;
}

export interface TimePickerProps {
  onTimeSelected: (hours: number, minutes: number, period: string) => void;
  secondBG?: boolean;
  selectedHours?: any;
  selectedMinutes?: any;
  selectedPeriod?: any;
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
  destination: string;
  date: string;
  time: string;
  purpose: string;
  urgent: boolean;
}

export interface AutoCompleteAddressProps {
  onDistanceCalculated: (distance: string) => void;
  onAddressSelected: (address: string) => void;
}
export interface InputField2Props {
  placeholderText: string;
  onChangeText: (text: string) => void;
  keyboardType?: any;
  adjustedWidth?: boolean;
  value: any;
}

export interface Address {
  name: string | null;
  p1: string | null;
  p2: string | null;
  p3: string | null;
  p4: string | null;
  address: string;
  lat: number;
  lon: number;
}

export interface SuggestionAddress {
  name: string | null;
  p1: string | null;
  p2: string | null;
  p3: string | null;
  p4: string | null;
  address: string;
  lat: number;
  lon: number;
}

export interface SuggestionAddressProps {
  placeholder: string;
  showList: boolean;
  suggestionListData: SuggestionAddress[];
  onPressItem: (item: SuggestionAddress) => void;
  handleSearchTextChange: (text: string) => void;
}

export interface SuggestionListItemProps {
  item: Address;
  onPressItem: (item: Address) => void;
}

export interface UploadButtonProps {
  selectedFileName: string;
  onFileSelected: (fileName: string) => void;
}

export interface DownloadButtonProps {
  downloadUrl: string;
  buttonText: string;
}
