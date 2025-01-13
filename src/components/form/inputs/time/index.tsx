import React, { useEffect, useState } from 'react';

interface TimePickerProps {
    onTimePick: (value: string) => void;
    label: string,
    defaultDatTime?: 'AM' | 'PM'
    defaultTime?: string
}

const TimePicker: React.FC<TimePickerProps> = ({ onTimePick, label, defaultDatTime = 'AM', defaultTime }) => {

    const [hour, setHour] = useState('09');
    const [minutes, setMinutes] = useState('00');
    const [dayTime, setDayTime] = useState<string>(defaultDatTime);

    // Helper function to generate time options
    const generate12Hours = () => {
        const options = [];
        for (let i = 1; i <= 12; i++) {
            const hour = i < 10 ? `0${i}` : `${i}`;
            options.push(<option key={hour} value={hour}>{hour}</option>);
        }
        return options;
    };


    const generateEach15MinutesOptions = () => {
        const options = [];
        for (let i = 0; i < 60; i += 15) {
            const minute = i < 10 ? `0${i}` : `${i}`;
            options.push(<option key={minute} value={minute}>{minute}</option>);
        }
        return options;
    }

    function getTime24Format() {
        const hour24 = dayTime === 'AM' ? parseInt(hour) : parseInt(hour) + 12;
        const time = `${hour24}:${minutes}`;
        return time
    }

    function setTimeValues(time: string) {
        const [hour, minutes] = time.split(':');
        if(Number(hour) > 12) {
            setDayTime('PM');
            setHour((parseInt(hour) - 12).toString());
        }
        else {
            
            setHour(Number(hour) < 10 ? `0${hour}` : hour);
            setDayTime('AM');
        }
        setMinutes(minutes);
    }

    useEffect(() => {
        if(defaultTime && defaultTime !== getTime24Format()) setTimeValues(defaultTime)
    }, [])

    useEffect(() => {
        onTimePick(getTime24Format());
    }, [])

    useEffect(() => {
        onTimePick(getTime24Format());
    }, [hour, minutes, dayTime])

    return (
        <div className="flex flex-col">
            <label className="text-sm font-semibold my-1 block">{ label }</label>
            <div className='flex flex-row flex-nowrap'>
                <select
                    className="bg-white border border-zinc-400 rounded-md p-1 px-3 text-sm font-light text-coffi-black cursor-pointer"
                    value={hour}
                    onChange={(e) => setHour(e.target.value)}
                    style={{appearance: 'none'}}
                >
                    {generate12Hours()}
                </select>
                <span className='mx-1 font-light'>
                    :
                </span>
                <select
                    className="bg-white border border-zinc-400 rounded-md p-1 px-3 text-sm font-light text-coffi-black cursor-pointer"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    style={{appearance: 'none'}}
                >
                    {generateEach15MinutesOptions()}
                </select>
                <select
                    className="bg-white border border-zinc-400 rounded-md p-1 px-2 text-sm font-light text-coffi-black cursor-pointer ml-1"
                    value={dayTime}
                    onChange={(e) => setDayTime(e.target.value)}
                    style={{appearance: 'none'}}
                >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                </select>
            </div>
        </div>
    );
};

export default TimePicker;
