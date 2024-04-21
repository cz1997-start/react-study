import React, { useEffect, useState, useRef, useImperativeHandle } from "react";
import "./index.css";

interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
}

interface CalendarRef {
  getDate: () => Date;
  setDate: (date: Date) => void;
}

const monthNames = [
  "一月",
  "二月",
  "三月",
  "四月",
  "五月",
  "六月",
  "七月",
  "八月",
  "九月",
  "十月",
  "十一月",
  "十二月",
];

const InternalCalendar: React.ForwardRefRenderFunction<
  CalendarRef,
  CalendarProps
> = (props, ref) => {
  const { value = new Date(), onChange } = props;
  const [date, setDate] = useState(value);

  const handlePreMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const daysOfMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderDays = () => {
    const days = [];

    const daysCount = daysOfMonth(date.getFullYear(), date.getMonth());
    const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth());
    const lastMonthDaysCount = daysOfMonth(
      date.getFullYear(),
      date.getMonth() - 1
    );

    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`pre-${i}`} className="day">
          {lastMonthDaysCount + i - firstDay + 1}
        </div>
      );
    }

    for (let i = 1; i <= daysCount; i++) {
      const clickHandler = onChange?.bind(
        null,
        new Date(date.getFullYear(), date.getMonth(), i)
      );
      days.push(
        <div
          key={i}
          className={`day ${i === date.getDate() ? "selected" : ""}`}
          onClick={clickHandler}
        >
          {i}
        </div>
      );
    }

    const endDaysCount = 7 - (days.length % 7);
    if (endDaysCount !== 7) {
      for (let i = 0; i < endDaysCount; i++) {
        days.push(
          <div key={`next-${i}`} className="day">
            {i + 1}
          </div>
        );
      }
    }

    return days;
  };

  useImperativeHandle(ref, () => ({
    getDate: () => date,
    setDate: (date: Date) => {
      setDate(date);
    },
  }));

  useEffect(() => {
    setDate(value);
  }, [value]);

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={handlePreMonth}>&lt;</button>
        <div>
          {date.getFullYear()}年{monthNames[date.getMonth()]}
        </div>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="days">
        <div className="day">日</div>
        <div className="day">一</div>
        <div className="day">二</div>
        <div className="day">三</div>
        <div className="day">四</div>
        <div className="day">五</div>
        <div className="day">六</div>
        {renderDays()}
      </div>
    </div>
  );
};

const Calendar = React.forwardRef(InternalCalendar);

const Test = () => {
  const [date, setDate] = useState(new Date());
  const calendarRef = useRef<CalendarRef>(null);

  // useEffect(() => {
  //   setTimeout(() => {
  //     calendarRef.current?.setDate(new Date(2024, 2, 1));
  //   }, 3000);
  // }, []);

  return (
    <Calendar
      ref={calendarRef}
      value={date}
      onChange={(date) => {
        console.log(date);
        setDate(date);
      }}
    />
  );
};

export default Test;
