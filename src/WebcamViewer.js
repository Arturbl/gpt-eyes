import React, { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

const WebcamViewer = () => {
  const videoRef = useRef(null);
  const [isRecording, setIsRecording] = useState(true);
  const [capturedImage, setCapturedImage] = useState(null);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const initWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = isRecording ? stream : null;
        }
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    };
    initWebcam();
  }, [isRecording]);

  useEffect(() => {
    const runObjectDetection = async () => {
      try {
        const mobileNetModel = await mobilenet.load();
        const predictions = await analyzeImage(capturedImage, mobileNetModel);
        setPredictions(predictions);
      } catch (error) {
        console.error('Error running object detection:', error);
      }
    };

    if (capturedImage) {
      runObjectDetection();
    }
  }, [capturedImage]);

  const takePicture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL('image/jpeg');
    setCapturedImage(image);
    setIsRecording(false);
  };

  const retakePicture = () => {
    setCapturedImage(null);
    setIsRecording(true);
  };

  const analyzeImage = async (image, model) => {
    const img = new Image();
    img.src = image;

    await img.decode(); // Ensure the image is fully loaded

    const predictions = await model.classify(img);

    console.log("Preditioncs. ", predictions); // Use the predictions as desired
    return predictions;
  };

  return (
    <div style={{ flex: '1', backgroundColor: 'black', position: 'relative' }}>
      {capturedImage ? (
        <img src={capturedImage} alt="Captured" style={{ width: '100%', height: '100%' }} />
      ) : (
        <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: '100%' }}></video>
      )}
      <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
        {capturedImage ? (
          <button onClick={retakePicture}>Retake</button>
        ) : (
          <button onClick={takePicture}>Take Picture</button>
        )}
      </div>
      <div style={{ position: 'absolute', top: '10px', right: '10px', color: 'white' }}>
        {predictions.map((prediction, index) => (
          <div key={index}>{prediction.className}</div>
        ))}
      </div>
    </div>
  );
  
};

export default WebcamViewer;