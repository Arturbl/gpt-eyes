import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';


const analyzeImage = async (image, model) => {
  const img = new Image();
  img.src = image;
  await img.decode(); // Ensure the image is fully loaded
  const predictions = await model.classify(img);
  return predictions;
};

export const runObjectDetection = async (capturedImage) => {
  try {
    const mobileNetModel = await mobilenet.load();
    const predictions = await analyzeImage(capturedImage, mobileNetModel);
    return predictions;
  } catch (error) {
    return 'Error running object detection: ' + error;
  }
};