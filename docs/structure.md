# NumMatch Game Structure Documentation

## Overview
NumMatch is an educational math game designed for children to practice multiplication skills in a fun, interactive way. The game presents multiplication problems where players need to find two numbers that multiply to give the target result.

## Architecture

### Backend (FastAPI)
- **File**: `main.py`
- **Framework**: FastAPI with Python
- **Endpoints**:
  - `GET /`: Serves the main HTML page
  - `GET /get_level/{level}`: Returns level configuration (multiplier range)
  - `POST /submit_score/`: Handles score submission

### Frontend
The frontend is built with vanilla JavaScript, HTML, and CSS, organized in the `static/` directory.

#### HTML Structure (`static/index.html`)
- Game container with title and level info
- Task row with two input slots for numbers, operator, and target
- Feedback area for user responses
- Number pad for input

#### JavaScript Modules
- **`app.js`**: Core game logic
  - Target number generation
  - Answer validation
  - Score tracking
  - Game flow control
- **`keypad.js`**: Virtual number pad functionality
- **`button.js`**: UI button interactions
- **`message.js`**: Message handling system

#### Styling (`static/style.css`)
- Responsive design for various screen sizes
- Visual feedback for correct/incorrect answers
- Kid-friendly interface with large, clear elements
- Color-coded states (active, correct, incorrect)

## Game Flow
1. Game generates a random target number (product of two numbers)
2. Player inputs two numbers using the virtual keypad
3. System validates if the multiplication matches the target
4. Provides visual and text feedback
5. Automatically generates new problem after 3 seconds

## Features
- **Kid-friendly Interface**: Large buttons, clear visuals, emoji indicators
- **Immediate Feedback**: Color-coded responses and encouraging messages
- **Virtual Keypad**: Touch-friendly number input
- **Score Tracking**: Tracks correct answers
- **Responsive Design**: Works on tablets and desktop computers

## Technical Details
- **Dependencies**: FastAPI, Uvicorn
- **Static Files**: Served from `/static/` directory
- **No Database**: Currently uses in-memory score tracking
- **Language**: German interface (can be easily internationalized)

## Deployment
- Can be run with Uvicorn: `uvicorn main:app --host 0.0.0.0 --port 8000`
- Suitable for systemd service deployment
- Static file serving handled by FastAPI

## Future Enhancements
- Multiple difficulty levels
- Score persistence with database
- Player profiles
- Sound effects
- Timer challenges
- Division problems
- Multi-language support
