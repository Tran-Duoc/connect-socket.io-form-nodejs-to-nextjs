'use client';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

export default function Home() {
  const socket = io('http://localhost:5000/');
  const [mess, setMess] = useState('');
  const handleSendMess = (e: any) => {
    e.preventDefault();
    socket.emit('send_mess', {
      mess: mess,
    });
  };

  useEffect(() => {
    socket.on('receive_mess', (data) => {
      console.log(data);
    });
  }, [socket]);

  return (
    <div className='min-h-screen'>
      <form action='' onSubmit={handleSendMess}>
        <input
          type='text'
          placeholder='enter your message'
          value={mess}
          onChange={(e) => setMess(e.target.value)}
        />
        <button>send</button>
      </form>
    </div>
  );
}
