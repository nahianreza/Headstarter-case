import React from 'react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Modal from 'react-modal';

const CalendarModal = ({ modalIsOpen, afterOpenModal, closeModal,
                           newEvent, setNewEvent, handleDelete,
                           handleUpdate, currentId }) => {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            position:"absolute",
            zIndex: '7',
        },
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
            zIndex: '7',
        }
    };

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <button onClick={closeModal}>close</button>
                <form>
                    <input type="text"
                           placeholder="Add Title"
                           style={{ width: "20%", marginRight: "auto" }}
                           value={newEvent.title}
                           onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                    <DatePicker
                        placeholderText="Start Date"
                        selected={newEvent.start}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        onChange={(start) => setNewEvent({ ...newEvent, start })}
                        popperPlacement="auto"
                        popperModifiers={[
                            {
                                name: "offset",
                                options: {
                                    offset: [5, 10],
                                },
                            },
                            {
                                name: "preventOverflow",
                                options: {
                                    rootBoundary: "viewport",
                                    tether: false,
                                    altAxis: true,
                                },
                            },
                        ]}
                    />
                    <DatePicker
                        placeholderText="End Date"
                        selected={newEvent.end}
                        showTimeSelect
                        timeFormat="HH:mm"
                        popperClassName="Datepicker"
                        timeIntervals={15}
                        onChange={(end) => setNewEvent({ ...newEvent, end })}
                        popperPlacement="auto"
                        popperModifiers={[
                            {
                                name: "offset",
                                options: {
                                    offset: [5, 10],
                                },
                            },
                            {
                                name: "preventOverflow",
                                options: {
                                    rootBoundary: "viewport",
                                    tether: false,
                                    altAxis: true,
                                },
                            },
                        ]}
                    />
                    <button onClick={handleUpdate}> Update</button>
                    <button onClick={handleDelete}> Delete</button>
                </form>
            </Modal>
        </div>
    );
};

export default CalendarModal;