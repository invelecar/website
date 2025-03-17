import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const YearPicker = ({ onRangeChange, id, minDate, maxDate }) => {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const handleDateChange = (update) => {
        setDateRange(update);
        onRangeChange(update);
    };

    return (
        <DatePicker
            id={id}
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={handleDateChange}
            dateFormat="yyyy"
            showYearPicker
            isClearable
            placeholderText="Seleccione rango de años"
            className="form-control"
            minDate={minDate}
            maxDate={maxDate}
        />
    );
};

export default YearPicker;