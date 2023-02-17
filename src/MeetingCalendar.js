import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-modal';
import DatePicker from "react-datepicker";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import "./MeetingCaldndar.css";

import CalendarModal from "./CalendarModal";

Modal.setAppElement('#root');

const locales = {
    "en-US": require("date-fns/locale/en-US"),
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const MeetingCalendar = () => {
    const [newEvent, setNewEvent] = useState({ title: "" });
    const [addedEvent, setAddedEvent] = useState({ title: "" });
    const [search, setSearch] = useState('');
    const [allEvents, setAllEvents] = useState([]);
    const [currentId, setCurrentId] = useState('');

    useEffect(() => {
        RenderCalendar();
    }, [allEvents]);

    const getEvents = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/events`);
            // console.log(response.data);
            response.data.map((event) => {
                event.start = new Date(event.start)
                event.end = new Date(event.end)
            })
            setAllEvents(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getEvents();
    }, []);


    const handleAddEvent = async (e) => {
        e.preventDefault();
        //  console.log("event", addedEvent);
        setAllEvents([...allEvents, addedEvent]);
        // console.log(allEvents);
        try {
            const newData = await axios.post('http://localhost:5000/events', addedEvent);
            setAddedEvent({
                title: ""
            });
            notifySuccess();
        } catch (error) {
            notifyFailure();
            console.log(error);
        }
    }

    const handleEventSelection = (e) => {
        console.log(e, "Event data");
        setNewEvent(e);
        openModal();
        setCurrentId(e._id);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const getEventBySearch = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/events/search?title=${search || 'none'}`);
                // console.log(response.data);
                const { data } = response.data;
                data.map((event) => {
                    event.start = new Date(event.start)
                    event.end = new Date(event.end)
                })
                setAllEvents(data);
            } catch (err) {
                console.log(err);
            }
        };
        getEventBySearch();
    }

    const notifySuccess = () => toast("New Event added successfully! ");
    const notifyFailure = () => toast.error("Error Occurred...");

    const clean = (e) => {
        e.preventDefault();
        setAddedEvent({
            title: "", end: "", start: ""
        });
    }

    const RenderCalendar = () => {
        return (
            <Calendar
                localizer={localizer}
                events={allEvents}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={handleEventSelection}
                style={{
                    height: 500,
                    margin: "50px"
                }} />
        );
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        const deleteEvent = async (id) => {
            try {
                const response = await axios.delete(`http://localhost:5000/events/${id}`);
                getEvents();
                toast("Event deleted successfully! ");
                closeModal();
            } catch (err) {
                console.log(err);
            }
        }
        deleteEvent(currentId);
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updateEvent = async (id, event) => {
            try {
                const response = await axios.patch(`http://localhost:5000/events/${id}`, event);
                getEvents();
                toast("Event updated successfully! ");
                closeModal();
            } catch (err) {
                console.log(err);
            }
        }
        updateEvent(currentId, newEvent);
    }


    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }
    function afterOpenModal() {

    }
    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div className="Calendar-App">
            <h1>Tasks</h1>
            <h2>Add New Task</h2>
            <div>
                <form>
                    <input type="text"
                        placeholder="Task Title"
                        style={{ width: "20%", marginRight: "auto" }}
                        value={addedEvent.title}
                        onChange={(e) => setAddedEvent({ ...addedEvent, title: e.target.value })} />
                    <button onClick={handleAddEvent} stlye={{ marginTop: "10px" }}>
                        Add Task
                    </button>
                    <button onClick={clean}> Clean</button>
                </form>
            </div>
            <form onSubmit={handleSearch}>
                <input
                    placeholder="Search an Event"
                    style={{ width: "20%", marginRight: "auto" }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button> Search </button>
            </form>

            <div>
                {/* {allEvents.map(a => console.log(a))} */}
                {allEvents.forEach(c => console.log(c))}
                
            </div>
        </div>
    );
};

export default MeetingCalendar;