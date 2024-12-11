import CalendarBox from "./CalendarBox";
import { useNavigate } from 'react-router-dom';

export default function Calendar() {
    const currentDate = new Date();
    const currentMonthStr = currentDate.toLocaleString('default', { month: 'long' }).charAt(0).toUpperCase() + currentDate.toLocaleString('default', { month: 'long' }).slice(1);
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    const calendarBoxes = Array.from({ length: daysInMonth }, (_, index) => (
        <CalendarBox key={index} cardTitleNumber={index + 1} />
    ));

    const navigate = useNavigate();
    const rows = [];
    const columnsPerRow = [8, 8, 8, 7]; // Number of columns for each row

    let currentIndex = 0;
    for (let i = 0; i < columnsPerRow.length; i++) {
        const columns = [];
        for (let j = 0; j < columnsPerRow[i]; j++) {
            columns.push(calendarBoxes[currentIndex]);
            currentIndex++;
        }
        rows.push(<div className="row" key={i}>{columns}</div>);
    }

    return (
        <div className="container">
            <div className="row" style={{ marginTop: "20px", alignItems: "center" }}>
                <div className="col-auto">
                    <button className="btn btn-primary" onClick={() => navigate("/Laundry")} style={{ marginRight: "10px" }}>Back</button>
                </div>
                <div className="col text-center">
                    <h1>Calendar Booking</h1>
                    <h3>{currentMonthStr}</h3>
                </div>
            </div>
            {rows}
        </div>
    );
}