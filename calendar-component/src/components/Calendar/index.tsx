import { Dayjs } from "dayjs";
import Header from "./Header";
import MonthCalendar from "./MonthCalendar";
import "./index.scss";

export interface CalendarProps {
  value: Dayjs;
  onChange?: (value: Dayjs) => void;
}

function Calendar(props: CalendarProps) {
  return (
    <div className="calendar">
      <Header></Header>
      <MonthCalendar {...props} />
    </div>
  );
}

export default Calendar;
