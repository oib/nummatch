# 🔢 NumMatch

A fun and educational math game for children to practice multiplication skills!

## 🎮 Game Description

NumMatch is an interactive web-based multiplication game where players find two numbers that multiply to match a target number. With its kid-friendly interface, colorful design, and immediate feedback, it makes learning multiplication fun and engaging.

## ✨ Features

- 🎯 **Simple Gameplay**: Find two numbers that multiply to the target
- 🎨 **Kid-Friendly Design**: Large buttons, clear visuals, and fun emojis
- 📱 **Responsive**: Works on tablets and desktop computers
- ⚡ **Instant Feedback**: Visual and text feedback for every answer
- 🌙 **Dark Theme**: Easy on the eyes with kid-friendly dark mode
- 🎮 **Virtual Keypad**: Touch-friendly number input

## 🚀 Quick Start

### Option 1: Using the provided script (Recommended)
```bash
sudo game
```

### Option 2: Manual setup
```bash
# Clone the repository
git clone https://github.com/yourusername/nummatch.git
cd nummatch

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install fastapi uvicorn

# Run the game
uvicorn main:app --host 0.0.0.0 --port 8000
```

Open your browser and navigate to `http://localhost:8000`

## 📋 Requirements

- Python 3.8+
- FastAPI
- Uvicorn

## 🎯 How to Play

1. Look at the target number (🎯)
2. Enter two numbers that multiply to give the target
3. Use the virtual keypad or keyboard to input numbers
4. Click the check button or press Enter
5. Get instant feedback with emojis and colors
6. New challenges appear automatically!

## 🔧 Systemd Service Setup

To run NumMatch as a system service:

1. Copy the service file:
```bash
sudo cp nummatch.service /etc/systemd/system/
```

2. Reload systemd:
```bash
sudo systemctl daemon-reload
```

3. Enable and start the service:
```bash
sudo systemctl enable nummatch
sudo systemctl start nummatch
```

4. Check status:
```bash
sudo systemctl status nummatch
```

## 📁 Project Structure

```
nummatch/
├── main.py              # FastAPI backend
├── static/              # Frontend assets
│   ├── index.html       # Main HTML page
│   ├── app.js          # Core game logic
│   ├── keypad.js       # Virtual keypad
│   ├── button.js       # Button interactions
│   ├── message.js      # Message handling
│   └── style.css       # Styling (with dark theme)
├── docs/
│   └── structure.md    # Detailed documentation
├── nummatch.service    # Systemd service file
├── game               # Startup script
├── README.md          # This file
└── LICENSE            # MIT License
```

## 🎨 Customization

### Changing Difficulty
Edit the `generateTarget` function in `static/app.js` to adjust the number ranges.

### Adding Themes
Modify `static/style.css` to add new color schemes or themes.

### Language Support
The interface currently uses German. Update the text in `static/app.js` and `static/index.html` for other languages.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Designed for children learning multiplication
- Built with FastAPI and vanilla JavaScript
- Inspired by the need for engaging educational tools

## 📞 Support

If you encounter any issues or have suggestions, please:
- Open an issue on GitHub
- Check the [documentation](docs/structure.md) for technical details

---

Made with ❤️ for young learners everywhere
