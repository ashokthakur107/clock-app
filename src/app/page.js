"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import CountDownTimer from '../components/CountDownTimer';

export default function Home() {
  const [timers, setTimers] = useState([]);
  const [newTimer, setNewTimer] = useState({
    name: '',
    endTime: '',
  });

  useEffect(() => {
    getTimers();
  }, [])
  

  const handleInputChange = (e) => {
    setNewTimer({ ...newTimer, [e.target.name]: e.target.value });
  };

  const addTimer = async () => {
    try {
      const response = await axios.post('/api/timer', newTimer);
      if(response.data.success){
        setTimers([...timers, response.data.data]);
      }
      setNewTimer({ name: '', endTime: '' });
    } catch (error) {
      if(error && error.response && error.response.data && error.response.data.message){
        alert(error.response.data.message);
      }
      console.log("error", error)
    }
  };

  const getTimers = async () => {
    try {
        const response = await axios.get('/api/timer');
        if(response.data.success){
            setTimers(response.data.data);
        }
    } catch (error) {
      console.log("error", error)
    }
  };

  const stopTimer = async (id) => {
    try {
      const response = await axios.get(`/api/timer/${id}`);
      return response.data;
  } catch (error) {
    console.log("error", error)
  }
  };

  return (
    <div>
      <h1>Countdown Timer</h1>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Timer Name"
          value={newTimer.name}
          onChange={handleInputChange}
        />
        <input
          type="datetime-local"
          name="endTime"
          value={newTimer.endTime}
          onChange={handleInputChange}
        />
        <button onClick={addTimer}>Add Timer</button>
      </div>
      <div>
        {timers.map((timer) => (
          <div key={timer._id}>
            <h2>{timer.name}</h2>
            <CountDownTimer timerData={timer} onSaveStop={stopTimer} />
          </div>
        ))}
      </div>
    </div>
  );
}