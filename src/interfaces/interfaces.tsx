import { StackNavigationProp } from "@react-navigation/stack";

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
}

export interface DropdownProps {
  options: string[];
  onCategoryChange: (category: string) => void;
}

export interface InputFieldProps {
  value: string;
  placeholder: string;
  secureTextEntry?: boolean;
  icon?: any;
  onChangeText?: (text: string) => void;
}

type RootStackParamList = {
  Landing: undefined;
  Requester: undefined;
};

export type NavigationProp = StackNavigationProp<RootStackParamList>;
