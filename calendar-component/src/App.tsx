import React from "react";
import dayjs from "dayjs";
import Calendar from "./components/Calendar";

function App() {
  return (
    <div className="App">
      <Calendar value={dayjs("2024-5-4")}></Calendar>
    </div>
  );
}

export default App;
