import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { event } from "./CalendarData/CalendarData";
import enUS from 'date-fns/locale/en-US'
import { FaHandPointDown } from "react-icons/fa"
const locales = {
    'en-US': enUS,
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});
const CalendarUI = () => {
    const date = new Date();
    return (
        <>
            <div className="container text-center ContainerMargin">
                <div className="row">
                    <h2 className="HeadingPageName">CALENDAR</h2>
                    <p className="About">Check All Activities Here <span><FaHandPointDown style={{ color: "orange" }} /><FaHandPointDown style={{ color: "green" }} /><FaHandPointDown style={{ color: "red" }} /></span></p>
                    <div className="col-12">
                        <div>
                            <Calendar localizer={localizer} events={event} startAccessor="start" endAccessor="end" className="my-5" style={{ height: 700 }}
                                eventPropGetter={(event, start, end, isSelected) => ({
                                    event,
                                    start,
                                    end,
                                    isSelected,
                                    style: {
                                        color: (date < event.end) ? (date > event.start) ? "Orange" : "green" : "red", backgroundColor: "#F7ECDE",
                                        fontWeight: "600", fontFamily: "Cambria", textAlign: "center", fontSize: "12px"
                                    }
                                })} />
                        </div>

                    </div>
                </div>
            </div>
        </>

    );
}

export default CalendarUI