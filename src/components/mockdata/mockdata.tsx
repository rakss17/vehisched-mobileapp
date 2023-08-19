import { Vehicle } from "../../interfaces/interfaces";

export const vehiclesMockData: Vehicle[] = [
  {
    id: 1,
    vehicle_name: "KDA 1368 Toyota Hilux",
    capacity: 5,
    vehicle_type: "Pickup Truck",
    vehicle_image: require("../../../assets/toyota-hilux.jpg"),
    status: "On Trip",
    isVip: false,
  },
  {
    id: 2,
    vehicle_name: "KCU 2522 Montero Sport",
    capacity: 7,
    vehicle_type: "SUV",
    vehicle_image: require("../../../assets/mitsubishi-montero.jpg"),
    status: "Available",
    isVip: true,
  },
  {
    id: 3,
    vehicle_name: "KAB 2855 Fortuner",
    capacity: 7,
    vehicle_type: "SUV",
    vehicle_image: require("../../../assets/fortuner.jpg"),
    status: "On Trip",
    isVip: false,
  },
  {
    id: 4,
    vehicle_name: "KYZ 2069 Toyota Hiace",
    capacity: 15,
    vehicle_type: "Van",
    vehicle_image: require("../../../assets/toyota-hiace.png"),
    status: "Available",
    isVip: true,
  },
  {
    id: 5,
    vehicle_name: "KDA 1368 Toyota Hilux",
    capacity: 5,
    vehicle_type: "Pickup Truck",
    vehicle_image: require("../../../assets/toyota-hilux.jpg"),
    status: "Unavailable",
    isVip: false,
  },
  {
    id: 6,
    vehicle_name: "KYZ 2069 Toyota Hiace",
    capacity: 15,
    vehicle_type: "Van",
    vehicle_image: require("../../../assets/toyota-hiace.png"),
    status: "Unavailable",
    isVip: false,
  },
];

export const fetchedPendingData = [
  {
    request_number: "02",
    travel_date: "08/17/2023",
    vehicle: "Ford Ranger",
    status: "Pending",
  },
  {
    request_number: "03",
    travel_date: "08/18/2023",
    vehicle: "Nissan Navarada",
    status: "Pending",
  },
  {
    request_number: "04",
    travel_date: "08/19/2023",
    vehicle: "Chevrolet Colorado",
    status: "Pending",
  },
  {
    request_number: "05",
    travel_date: "08/20/2023",
    vehicle: "Honda Ridgeline",
    status: "Pending",
  },
  {
    request_number: "06",
    travel_date: "08/21/2023",
    vehicle: "Mitsubishi Triton",
    status: "Pending",
  },
  {
    request_number: "07",
    travel_date: "08/22/2023",
    vehicle: "Isuzu D-Max",
    status: "Pending",
  },
  {
    request_number: "08",
    travel_date: "08/23/2023",
    vehicle: "Volkswagen Amarok",
    status: "Pending",
  },
  {
    request_number: "09",
    travel_date: "08/24/2023",
    vehicle: "Mazda BT-50",
    status: "Pending",
  },
  {
    request_number: "10",
    travel_date: "08/25/2023",
    vehicle: "GMC Canyon",
    status: "Pending",
  },
  {
    request_number: "11",
    travel_date: "08/26/2023",
    vehicle: "RAM 1500",
    status: "Pending",
  },
  {
    request_number: "11",
    travel_date: "08/26/2023",
    vehicle: "RAM 1500",
    status: "Pending",
  },
  {
    request_number: "11",
    travel_date: "08/26/2023",
    vehicle: "RAM 1500",
    status: "Pending",
  },
];

export const fetchedApprovedData = [
  {
    request_number: "10",
    travel_date: "April 16, 2024",
    vehicle: "Toyota hilux",
    status: "Approved",
  },
  {
    request_number: "02",
    travel_date: "August 17, 2023",
    vehicle: "Ford Ranger",
    status: "Approved",
  },
  {
    request_number: "03",
    travel_date: "August 18, 2023",
    vehicle: "Nissan Navara",
    status: "Approved",
  },
  {
    request_number: "04",
    travel_date: "August 19, 2023",
    vehicle: "Chevrolet Colorado",
    status: "Approved",
  },
];
export const fetchedCanceledData = [
  {
    request_number: "10",
    travel_date: "April 16, 2024",
    vehicle: "Toyota hilux",
    status: "Declined",
  },
];
export const fetchedDeclinedData = [
  {
    request_number: "10",
    travel_date: "April 16, 2024",
    vehicle: "Toyota hilux",
    status: "Declined",
  },
  {
    request_number: "10",
    travel_date: "August 25, 2023",
    vehicle: "GMC Canyon",
    status: "Declined",
  },
  {
    request_number: "11",
    travel_date: "August 26, 2023",
    vehicle: "RAM 1500",
    status: "Declined",
  },
];
