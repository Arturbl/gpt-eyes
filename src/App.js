import React, { useState } from 'react';
import WebcamViewer from './WebcamViewer';

const App = () => {
  const [messages, setMessages] = useState([]);

  const handlePredictions = (predictions) => {
    const newMessage = predictions.map((prediction) => prediction.className).join(', ');
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div>
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <WebcamViewer onPredictions={handlePredictions} />
    </div>
  );
};

export default App;
