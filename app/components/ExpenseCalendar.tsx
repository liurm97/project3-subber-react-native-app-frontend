import { View } from "react-native";
import React, { useState } from "react";
const dayjs = require("dayjs");
import { Calendar, DateData } from "react-native-calendars";
import {
  Text,
  Button,
  ButtonText,
  Center,
  Input,
  InputField,
  FormControl,
  VStack,
  Heading,
  InputIcon,
  InputSlot,
  EyeIcon,
  EyeOffIcon,
  GluestackUIProvider,
  Box,
  LinkText,
  Image,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

type markedDateValues = {
  selected?: boolean;
  marked?: boolean;
  selectedColor?: string;
  selectedTextColor?: string;
};
type markedDatesType = {
  [date: string]: markedDateValues;
};

const ExpenseCalendar = ({
  initialCalendarDate,
  earliestCalendarDate,
  selectedMonthlyDays,
  updateDate,
}: {
  initialCalendarDate: string;
  earliestCalendarDate: string;
  selectedMonthlyDays: string[];
  updateDate: (newDate: string) => void;
}) => {
  // const dates = ["2024-06-01", "2024-06-10"];
  console.log("updateDate", updateDate);
  const markedDatesParam: markedDatesType = {};
  const datesMarked = selectedMonthlyDays?.map((date: string) => {
    markedDatesParam[date] = {
      selected: true,
      marked: true,
      selectedColor: "pink",
      selectedTextColor: "black",
    };
  });
  // const [month, setMonth] = useState(onMonthChange);
  // console.log("month", onMonthChange);
  // console.log("initialCalendarDate", initialCalendarDate);
  return (
    <GluestackUIProvider config={config}>
      <Calendar
        headerStyle={{}}
        markedDates={markedDatesParam}
        style={{
          padding: 15,
        }}
        // Initially visible month. Default = now
        initialDate={initialCalendarDate}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={earliestCalendarDate}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={dayjs(initialCalendarDate)
          .add(12, "months")
          .format("YYYY-MM-DD")}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => {
          console.log("selected day", day);
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={(day) => {
          console.log("selected day", day);
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={"MMMM yyyy"}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(month) => updateDate(month.dateString)}
        // Hide month navigation arrows. Default = false
        hideArrows={false}
        allowSelectionOutOfRange={false}
        // Replace default arrows with custom ones (direction can be 'left' or 'right')
        // renderArrow={(direction) => {
        //   {
        //     if (direction == "left") return "<";
        //     if (direction == "right") return ">";
        //   }
        // }}
        // Do not show days of other months in month page. Default = false
        hideExtraDays={true}
        // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        disableMonthChange={false}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
        firstDay={1}
        // Hide day names. Default = false
        hideDayNames={false}
        // Show week numbers to the left. Default = false
        showWeekNumbers={false}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={(addMonth) => addMonth()}
        // Disable left arrow. Default = false
        disableArrowLeft={false}
        // Disable right arrow. Default = false
        disableArrowRight={false}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={true}
        // Replace default month and year title with custom one. the function receive a date as parameter
        // renderHeader={(date) => {
        //   /*Return JSX*/
        // }}
        // Enable the option to swipe between months. Default = false
        enableSwipeMonths={true}
      />
    </GluestackUIProvider>
  );
};

export default ExpenseCalendar;
