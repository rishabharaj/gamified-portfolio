# 🎮 Gamified Developer Portfolio

A unique and interactive portfolio website featuring playable games that showcase your development skills while engaging visitors.

## ✨ Features

### 🎯 Core Features
- **Interactive Games**: 4 fully playable games built with vanilla JavaScript
- **XP & Leveling System**: Earn XP and level up by playing games
- **Persistent Stats**: Your progress is saved using localStorage
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Modern UI**: Cyberpunk-inspired design with smooth animations

### 🎮 Available Games

1. **Snake Master 🐍**
   - Classic snake game with modern graphics
   - Use arrow keys to control the snake
   - Eat food to grow and earn points

2. **Retro Pong 🏓**
   - Arcade-style pong game
   - Play against AI opponent
   - Test your reflexes

3. **Memory Match 🧠**
   - Match coding-themed emoji pairs
   - Challenge your memory
   - Complete in minimum moves

4. **Code Typer ⌨️**
   - Speed typing with code snippets
   - Measure your WPM (Words Per Minute)
   - Practice coding syntax

### 📱 Sections

- **Games**: Play all available games
- **About**: Information about the developer
- **Skills**: Showcase your technical skills
- **Projects**: Display your featured projects

## 🚀 Getting Started

1. **Clone or Download** this repository
2. **Open** `index.html` in your web browser
3. **Play** games and explore the portfolio!

No build tools or dependencies required - just open and play!

## 🎨 Customization

### Update Your Information

Edit `index.html` to personalize:
- Change the name in the header (search for "PLAYER ONE")
- Update the About section with your bio
- Modify skills in the Skills section
- Add your projects in the Projects section
- Update social media links

### Modify Colors

Edit `styles.css` CSS variables:
```css
:root {
    --primary: #00ff88;    /* Primary accent color */
    --secondary: #ff00ff;  /* Secondary accent color */
    --accent: #00d4ff;     /* Tertiary accent color */
    --dark: #0a0e27;       /* Main background */
    --darker: #050814;     /* Darker background */
}
```

### Add More Games

Extend `script.js` by:
1. Adding a new game card in `index.html`
2. Creating a new `init[YourGame]Game()` function
3. Adding the game to the switch statement in `openGame()`

## 💡 How It Works

### XP System
- Earn XP by scoring points in games
- 100 XP needed per level
- Level increases as you earn more XP
- Progress saved automatically

### High Score Tracking
- Best scores are saved across sessions
- Compete against yourself
- Track your improvement

## 🛠️ Technologies Used

- **HTML5**: Structure and Canvas API for games
- **CSS3**: Modern styling with animations
- **JavaScript (ES6+)**: Game logic and interactivity
- **LocalStorage**: Persistent data storage

## 📝 Browser Compatibility

Works on all modern browsers:
- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## 🎯 Use Cases

- Personal portfolio website
- Game developer showcase
- Interactive resume
- Fun project demonstration
- Learning JavaScript game development

## 📄 License

Free to use and modify for your own portfolio!

## 🤝 Contributing

Feel free to:
- Add new games
- Improve existing games
- Enhance the UI/UX
- Fix bugs
- Suggest features

## 🌟 Tips

- Play all games to maximize your XP
- Try to beat your high scores
- Use keyboard controls for Snake and Pong
- Customize colors to match your personal brand
- Add your real projects and information

---

**Happy Gaming & Coding! 🚀**
