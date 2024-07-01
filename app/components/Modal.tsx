import DateTimePicker from "@react-native-community/datetimepicker";
import { select } from "d3";
import { useState } from "react";
import { Button, SafeAreaView, Text } from "react-native";
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

export const Modal = ({
  update,
  updateFirstPaymentDate,
  updateLastPaymentDate,
}: {
  update: 0 | 1;
  updateFirstPaymentDate?: (newFirstPaymentDate: any) => void;
  updateLastPaymentDate?: (newDate: any) => void;
}) => {
  const [date, setDate] = useState(dayjs().toDate());
  // const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(true);

  console.log("date", date);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(dayjs(dayjs(selectedDate).format("YYYY-MM-DD")).toDate());

    if (update === 0 && updateFirstPaymentDate) {
      updateFirstPaymentDate(dayjs(selectedDate).utc().format("YYYY-MM-DD"));
    } else if (update === 1 && updateLastPaymentDate) {
      updateLastPaymentDate(dayjs(selectedDate).utc().format("YYYY-MM-DD"));
    }
  };

  return (
    <SafeAreaView>
      <DateTimePicker
        display="compact"
        accentColor="#C8E9E7"
        value={date}
        mode={"date"}
        timeZoneName={"GMT"}
        onChange={onChange}
      />
    </SafeAreaView>
  );
};
