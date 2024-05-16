import { EVENTS, MONTHS } from "../../constants/constants";
import EventCanvas from "../Events/EventCanvas";
import Events from "../Events/Events";
import Overlay from "../Overlay/Overlay";
import "./Calendar.css";
import { useCallback, useState } from "react";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const monthName = currentMonth.toLocaleString("default", { month: "long" });
  const year = currentMonth.getFullYear();

  const changeMonth = useCallback(direction => {
    setCurrentMonth(prevMonth => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() + direction);
      return newMonth;
    });
  }, []);

  const getCalendarGrid = useCallback(() => {
    const firstDayOfMonth = new Date(year, currentMonth.getMonth(), 1);
    const daysInMonth = new Date(
      year,
      currentMonth.getMonth() + 1,
      0
    ).getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay();

    const calendarGrid = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      calendarGrid.push(<div key={`empty-${i}`} className="empty-cell"></div>);
    }

    // Add cells for each day in the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
      const eventDate = new Date(date).toLocaleDateString();
      const currentEvent = EVENTS
        .filter(event => eventDate === event.date)
        .sort((a, b) => a.startTime - b.startTime);

      const classNames = ["calendar-cell"];
      if (isCurrentDate(date)) classNames.push("current-date");
      if (hasEvents(date)) {
        classNames.push("has-events");
        calendarGrid.push(
          <Overlay content={<EventCanvas events={currentEvent} key={day} />}>
            <div className={classNames.join(" ")}>
              <span>{day}</span>
              <Events events={currentEvent} />
            </div>
          </Overlay>
        );
      } else {
        calendarGrid.push(
          <div key={day} className={classNames.join(" ")}>
            <span>{day}</span>
          </div>
        );
      }
    }

    return calendarGrid;
  }, [currentMonth, year]);

  // Function to highlight the current date within the calendar grid
  const isCurrentDate = date => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Function to check if a date has events
  const hasEvents = date => {
    const eventDate = new Date(date).toLocaleDateString();
    return EVENTS.some(event => {
      return eventDate === event.date;
    });
  };

  return (
    <div className="calendar-container">
      <h2 className="month-year text-center">{`${monthName} ${year}`}</h2>
      <div className="navigation-buttons text-center">
        <button onClick={() => changeMonth(-1)} className="next-btn me-3">
          {"<"}
        </button>
        <button onClick={() => changeMonth(1)} className="next-btn">
          {">"}
        </button>
      </div>
      <div className="calendar-grid">
        {MONTHS.map(month => (
          <div className="fw-bold font-14 p-3" key={month}>
            {month}
          </div>
        ))}
        {getCalendarGrid()}
      </div>
    </div>
  );
};

export default Calendar;
