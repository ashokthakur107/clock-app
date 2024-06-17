"use client"
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const WorldClock = () => {
  const [timeZone, setTimeZone] = useState('');
  const [time, setTime] = useState('');
  const intervalRef = useRef(null);

  const handleTimeZoneChange = async (event) => {
    if(event.target.value === '0'){
        setTimeZone('');
    }else{
        setTimeZone(event.target.value);
        if (intervalRef.currentTime){
            clearInterval(intervalRef.currentTime);
        }
        try {
            const response = await axios.get(`https://worldtimeapi.org/api/timezone/${event.target.value}`);
            const dateTime = new Date(response.data.datetime);
            setTime(dateTime);
            intervalRef.currentTime = setInterval(() => {
                setTime(prevTime => {
                const newTime = new Date(prevTime.getTime() + 1000);
                return newTime;
                });
            }, 1000);
        } catch (error) {
            console.error('Error fetching the time:', error);
        }
    }
  };

  return (
    <div>
      <br/><h3>Select Timezone</h3><br/>
      <select value={timeZone} onChange={handleTimeZoneChange}>
        <option value="0">Select Timezone</option>
        <option value="America/Los_Angeles">PST (Pacific Standard Time)</option>
        <option value="Asia/Kolkata">IST (Indian Standard Time)</option>
      </select>
      <div>
      <br/><h4>Current Time in {(timeZone === 'America/Los_Angeles') ? 'PST' : (timeZone === 'Asia/Kolkata') ? 'IST' : ''}:</h4><br/>
        <p>{(timeZone !== '') ? time && time.toLocaleTimeString('en-US', { timeZone: timeZone }) : null}</p>
      </div>
    </div>
  );
};

export default WorldClock;