# AI-Driven Problem Solver

An intelligent math problem solver powered by Google's Gemini AI model. The app provides users with a step-by-step solution to math problems by processing images from the camera or uploaded images. The AI analyzes and provides detailed feedback for each step in the solution.

# check project live at
  https://staticai-drivenproblemsolver.onrender.com

## Features

- 📸 **Use Camera**: Capture an image of a math problem directly using the camera.
- 📂 **Upload Image**: Upload an image containing a math problem from your device.
- 🤖 **AI-Generated Solution**: The app uses Google's Gemini 1.5 Flash API to provide a step-by-step solution and final answer.
- ✅ **Solution Comparison**: If the user provides a solution, the app compares it with the AI’s answer, marking correct steps in green and incorrect ones in red with feedback.
- ⚠️ **Non-Math Input Detection**: The app will notify the user if the image doesn’t contain a valid mathematical problem.

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript (with Axios for API calls)
- **Backend**: Node.js, Express.js
- **AI**: Google Gemini 1.5 Flash API
- **File Upload**: Multer (for handling file uploads)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or higher)
- npm (Node Package Manager)
- Google Gemini API key

## Installation

### Steps to Run the Application Locally:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/ismartash/staticai_drivenproblemsolver.git
    cd aidrivenproblemsolver
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Create a `.env` file** in the root directory and add your **Gemini API key**:

    ```bash
    GEMINI_API_KEY=your_gemini_api_key_here
    PORT=3000
    ```

4. **Start the development server**:

    ```bash
    npm start
    ```

5. **Open your browser** and go to `http://localhost:3000` to use the app.

