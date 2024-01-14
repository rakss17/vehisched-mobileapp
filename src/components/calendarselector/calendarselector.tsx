// import React, { useState } from 'react';
// import { CalendarList } from 'react-native-calendars';
// import { Modal } from 'react-native';
// import { CalendarSelectorProps } from '../../interfaces/interfaces';

// const CalendarSelector: React.FC<CalendarSelectorProps> = ({ isCalandarSelectorVisible, vehicleOwnSchedule }) => {
//   const [startDate, setStartDate] = useState<string | null>(null);
//   const [endDate, setEndDate] = useState<string | null>(null);

//   const onDayPress = (day: { dateString: string }) => {
//     if (!startDate || (endDate && day.dateString < endDate) || day.dateString < startDate) {
//       // If there is no start date, or if there is an end date and the new date is before it,
//       // or if the new date is before the start date, set the new date as the start date.
//       setStartDate(day.dateString);
//       setEndDate(null); // Reset the end date
//     } else if (startDate && (day.dateString > startDate || !endDate)) {
//       // If there is a start date and the new date is after it, or if there is no end date,
//       // set the new date as the end date.
//       setEndDate(day.dateString);
//     }
//     if (vehicleOwnSchedule && vehicleOwnSchedule.length > 0) { 
//         const isBooked = vehicleOwnSchedule.some((schedule) => {
//             const scheduleStart = new Date(schedule.startDate);
//             const scheduleEnd = new Date(schedule.endDate);
//             const selectedDate = new Date(day.dateString);
//             return selectedDate >= scheduleStart && selectedDate <= scheduleEnd;
//           });
         
//           if (isBooked) {
//             // Show an alert or some other indication to the user
//             alert("This date is already booked!");
//             return;
//           }
//     }
    
//   };

//   // Generate the marked dates between the start and end date
//   const getMarkedDates = () => {
//     let markedDates: { [date: string]: any } = {};

//     if (startDate) {
//       markedDates[startDate] = { startingDay: true, color: 'orange', textColor: 'white' };
//     }
//     if (endDate) {
//       markedDates[endDate] = { endingDay: true, color: 'orange', textColor: 'white' };
//     }
//     if (startDate && endDate) {
//       let current = new Date(startDate);
//       const end = new Date(endDate);
//       while (current <= end) {
//         const dateString = current.toISOString().split('T')[0];
//         if (!markedDates[dateString]) {
//           markedDates[dateString] = { color: 'orange', textColor: 'white' };
//         }
//         current.setDate(current.getDate() + 1);
//       }
//     }
//     if (vehicleOwnSchedule && vehicleOwnSchedule.length > 0) {
//         // Mark the booked dates from the vehicleOwnSchedule array
//         vehicleOwnSchedule.forEach((schedule) => {
//           const scheduleStart = new Date(schedule.travel_date);
//           const scheduleEnd = new Date(schedule.return_date);
//           let current = new Date(scheduleStart);
//           while (current <= scheduleEnd) {
//             const dateString = current.toISOString().split('T')[0];
//             markedDates[dateString] = { color: 'red', textColor: 'white' };
//             current.setDate(current.getDate() + 1);
//           }
//         });
//        }
//     return markedDates;
//   };

//   return (
//     <Modal visible={isCalandarSelectorVisible}>
//       <CalendarList
//         onDayPress={onDayPress}
//         markedDates={getMarkedDates()}
//         horizontal={true}
//         pagingEnabled={true}
//         pastScrollRange={0}
//         futureScrollRange={12}
//         markingType={'period'}
        
//       />
//     </Modal>
//   );
// };

// export default CalendarSelector;
