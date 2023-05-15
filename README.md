# GPT Eyes

## Technologies Used

- Frontend: React
- Image Analysis API: TensorFlow Models - MobileNet
- Text Generation API: GPT API

## Installation

1. Clone the repository: `git clone https://github.com/your-username/your-repo.git`
2. Navigate to the project directory: `cd gpt-eyes`
3. Install dependencies: `npm install`

## Configuration

1. Create an account and obtain API keys for TensorFlow Models - MobileNet and GPT API.
2. Update the configuration file with your API keys:
   - TensorFlow Models - MobileNet: `/path/to/config.js`
   - GPT API: `/path/to/config.js`

## Usage

1. Start the development server: `npm start`
2. Open your browser and visit: `http://localhost:3000`

## How it Works

1. Device camera analyses an image.
2. The application uses TensorFlow Models - MobileNet API to analyze the image and extract object information.
3. The application sends the analyzed object information to the GPT API.
4. The GPT API generates text describing the analyzed object.
5. The application displays the analyzed image and the generated text.