// Portfolio State
let portfolio = {
    xp: 0,
    level: 1,
    highscore: 0
};

// Load saved data
function loadData() {
    const saved = localStorage.getItem('portfolioData');
    if (saved) {
        portfolio = JSON.parse(saved);
        updateStats();
    }
}

// Save data
function saveData() {
    localStorage.setItem('portfolioData', JSON.stringify(portfolio));
}

// Update stats display
function updateStats() {
    document.getElementById('xp').textContent = portfolio.xp;
    document.getElementById('level').textContent = portfolio.level;
    document.getElementById('highscore').textContent = portfolio.highscore;
}

// Add XP
function addXP(amount) {
    portfolio.xp += amount;
    if (portfolio.xp >= portfolio.level * 100) {
        portfolio.level++;
        showNotification(`🎉 Level Up! You're now level ${portfolio.level}!`);
    }
    updateStats();
    saveData();
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #00ff88, #00d4ff);
        color: #0a0e27;
        padding: 20px 30px;
        border-radius: 10px;
        font-weight: bold;
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Section Navigation
document.querySelectorAll('.menu-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const section = btn.dataset.section;
        
        document.querySelectorAll('.menu-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.getElementById(section).classList.add('active');
    });
});

// Game Modal
const modal = document.getElementById('gameModal');
const gameContainer = document.getElementById('gameContainer');
const gameTitle = document.getElementById('gameTitle');
const startBtn = document.getElementById('startGame');
const pauseBtn = document.getElementById('pauseGame');
const scoreDisplay = document.getElementById('gameScore');
const closeBtn = document.querySelector('.close-btn');

let currentGame = null;

// Open game modal
document.querySelectorAll('.game-card').forEach(card => {
    card.querySelector('.play-btn').addEventListener('click', () => {
        const gameName = card.dataset.game;
        openGame(gameName);
    });
});

function openGame(gameName) {
    modal.classList.add('active');
    currentGame = gameName;
    
    const games = {
        snake: 'Snake Master 🐍',
        pong: 'Retro Pong 🏓',
        memory: 'Memory Match 🧠',
        typing: 'Code Typer ⌨️'
    };
    
    gameTitle.textContent = games[gameName];
    gameContainer.innerHTML = '';
    
    switch(gameName) {
        case 'snake':
            initSnakeGame();
            break;
        case 'pong':
            initPongGame();
            break;
        case 'memory':
            initMemoryGame();
            break;
        case 'typing':
            initTypingGame();
            break;
    }
}

closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    if (currentGame) {
        stopCurrentGame();
    }
});

// Snake Game
function initSnakeGame() {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    canvas.style.border = '2px solid #00ff88';
    gameContainer.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const gridSize = 20;
    let snake = [{x: 200, y: 200}];
    let food = {x: 100, y: 100};
    let dx = gridSize;
    let dy = 0;
    let score = 0;
    let gameLoop = null;
    
    function drawGame() {
        ctx.fillStyle = '#050814';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw snake
        ctx.fillStyle = '#00ff88';
        snake.forEach(segment => {
            ctx.fillRect(segment.x, segment.y, gridSize - 2, gridSize - 2);
        });
        
        // Draw food
        ctx.fillStyle = '#ff00ff';
        ctx.fillRect(food.x, food.y, gridSize - 2, gridSize - 2);
    }
    
    function moveSnake() {
        const head = {x: snake[0].x + dx, y: snake[0].y + dy};
        
        // Check collision with walls
        if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
            endGame();
            return;
        }
        
        // Check collision with self
        if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            endGame();
            return;
        }
        
        snake.unshift(head);
        
        // Check food collision
        if (head.x === food.x && head.y === food.y) {
            score += 10;
            addXP(10);
            scoreDisplay.textContent = `Score: ${score}`;
            placeFood();
        } else {
            snake.pop();
        }
        
        drawGame();
    }
    
    function placeFood() {
        food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
        food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
    }
    
    function endGame() {
        clearInterval(gameLoop);
        if (score > portfolio.highscore) {
            portfolio.highscore = score;
            updateStats();
            saveData();
        }
        showNotification(`Game Over! Score: ${score}`);
        startBtn.style.display = 'block';
        pauseBtn.style.display = 'none';
    }
    
    document.addEventListener('keydown', (e) => {
        if (!gameLoop) return;
        
        switch(e.key) {
            case 'ArrowUp':
                if (dy === 0) { dx = 0; dy = -gridSize; }
                break;
            case 'ArrowDown':
                if (dy === 0) { dx = 0; dy = gridSize; }
                break;
            case 'ArrowLeft':
                if (dx === 0) { dx = -gridSize; dy = 0; }
                break;
            case 'ArrowRight':
                if (dx === 0) { dx = gridSize; dy = 0; }
                break;
        }
    });
    
    startBtn.onclick = () => {
        snake = [{x: 200, y: 200}];
        dx = gridSize;
        dy = 0;
        score = 0;
        scoreDisplay.textContent = 'Score: 0';
        placeFood();
        gameLoop = setInterval(moveSnake, 100);
        startBtn.style.display = 'none';
        pauseBtn.style.display = 'block';
    };
    
    window.stopCurrentGame = () => {
        clearInterval(gameLoop);
    };
    
    drawGame();
}

// Pong Game
function initPongGame() {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 400;
    canvas.style.border = '2px solid #00d4ff';
    gameContainer.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let score = 0;
    let gameLoop = null;
    
    const paddle = {
        x: 10,
        y: canvas.height / 2 - 50,
        width: 10,
        height: 100,
        speed: 8
    };
    
    const ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 8,
        dx: 4,
        dy: 4
    };
    
    const aiPaddle = {
        x: canvas.width - 20,
        y: canvas.height / 2 - 50,
        width: 10,
        height: 100
    };
    
    let keys = {};
    
    function draw() {
        ctx.fillStyle = '#050814';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw center line
        ctx.strokeStyle = '#00d4ff';
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Draw paddles
        ctx.fillStyle = '#00ff88';
        ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
        ctx.fillRect(aiPaddle.x, aiPaddle.y, aiPaddle.width, aiPaddle.height);
        
        // Draw ball
        ctx.fillStyle = '#ff00ff';
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();
    }
    
    function update() {
        // Move player paddle
        if (keys['ArrowUp'] && paddle.y > 0) {
            paddle.y -= paddle.speed;
        }
        if (keys['ArrowDown'] && paddle.y < canvas.height - paddle.height) {
            paddle.y += paddle.speed;
        }
        
        // AI paddle
        if (ball.x > canvas.width / 2) {
            if (aiPaddle.y + aiPaddle.height / 2 < ball.y) {
                aiPaddle.y += 5;
            } else {
                aiPaddle.y -= 5;
            }
        }
        
        // Move ball
        ball.x += ball.dx;
        ball.y += ball.dy;
        
        // Ball collision with top/bottom
        if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
            ball.dy *= -1;
        }
        
        // Ball collision with paddles
        if (ball.x - ball.radius < paddle.x + paddle.width &&
            ball.y > paddle.y && ball.y < paddle.y + paddle.height) {
            ball.dx *= -1;
            score += 10;
            addXP(10);
            scoreDisplay.textContent = `Score: ${score}`;
        }
        
        if (ball.x + ball.radius > aiPaddle.x &&
            ball.y > aiPaddle.y && ball.y < aiPaddle.y + aiPaddle.height) {
            ball.dx *= -1;
        }
        
        // Ball out of bounds
        if (ball.x < 0 || ball.x > canvas.width) {
            clearInterval(gameLoop);
            if (score > portfolio.highscore) {
                portfolio.highscore = score;
                updateStats();
                saveData();
            }
            showNotification(`Game Over! Score: ${score}`);
            startBtn.style.display = 'block';
            pauseBtn.style.display = 'none';
        }
        
        draw();
    }
    
    document.addEventListener('keydown', (e) => {
        keys[e.key] = true;
    });
    
    document.addEventListener('keyup', (e) => {
        keys[e.key] = false;
    });
    
    startBtn.onclick = () => {
        score = 0;
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx = 4;
        ball.dy = 4;
        scoreDisplay.textContent = 'Score: 0';
        gameLoop = setInterval(update, 1000 / 60);
        startBtn.style.display = 'none';
        pauseBtn.style.display = 'block';
    };
    
    window.stopCurrentGame = () => {
        clearInterval(gameLoop);
        keys = {};
    };
    
    draw();
}

// Memory Game
function initMemoryGame() {
    const grid = document.createElement('div');
    grid.style.cssText = `
        display: grid;
        grid-template-columns: repeat(4, 80px);
        gap: 10px;
        justify-content: center;
    `;
    gameContainer.appendChild(grid);
    
    const symbols = ['🔥', '⚡', '💎', '🚀', '🎯', '🎮', '💻', '🌟'];
    const cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
    
    let flipped = [];
    let matched = [];
    let score = 0;
    let moves = 0;
    
    scoreDisplay.textContent = 'Moves: 0';
    
    cards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.style.cssText = `
            width: 80px;
            height: 80px;
            background: rgba(0, 255, 136, 0.2);
            border: 2px solid #00ff88;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 2rem;
            cursor: pointer;
            transition: all 0.3s;
        `;
        card.dataset.index = index;
        card.dataset.symbol = symbol;
        
        card.addEventListener('click', () => {
            if (flipped.length < 2 && !flipped.includes(index) && !matched.includes(index)) {
                card.textContent = symbol;
                card.style.background = 'rgba(0, 212, 255, 0.3)';
                flipped.push(index);
                
                if (flipped.length === 2) {
                    moves++;
                    scoreDisplay.textContent = `Moves: ${moves}`;
                    
                    setTimeout(() => {
                        const [first, second] = flipped;
                        const firstCard = grid.children[first];
                        const secondCard = grid.children[second];
                        
                        if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
                            matched.push(first, second);
                            score += 20;
                            addXP(20);
                            
                            if (matched.length === cards.length) {
                                setTimeout(() => {
                                    if (score > portfolio.highscore) {
                                        portfolio.highscore = score;
                                        updateStats();
                                        saveData();
                                    }
                                    showNotification(`🎉 You Won! Moves: ${moves}`);
                                }, 500);
                            }
                        } else {
                            firstCard.textContent = '';
                            secondCard.textContent = '';
                            firstCard.style.background = 'rgba(0, 255, 136, 0.2)';
                            secondCard.style.background = 'rgba(0, 255, 136, 0.2)';
                        }
                        flipped = [];
                    }, 800);
                }
            }
        });
        
        grid.appendChild(card);
    });
    
    startBtn.style.display = 'none';
    pauseBtn.style.display = 'none';
    
    window.stopCurrentGame = () => {};
}

// Typing Game
function initTypingGame() {
    const container = document.createElement('div');
    container.style.cssText = `
        padding: 20px;
        text-align: center;
    `;
    
    const codeSnippets = [
        'function hello() { return "world"; }',
        'const x = arr.map(i => i * 2);',
        'let result = array.filter(x => x > 0);',
        'async function getData() { await fetch(); }',
        'const sum = (a, b) => a + b;',
        'for (let i = 0; i < 10; i++) { console.log(i); }',
        'if (condition) { doSomething(); }',
        'class MyClass extends Base { constructor() {} }'
    ];
    
    let currentSnippet = '';
    let startTime = 0;
    let score = 0;
    
    const textDisplay = document.createElement('div');
    textDisplay.style.cssText = `
        font-family: 'Courier New', monospace;
        font-size: 1.2rem;
        padding: 20px;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        margin-bottom: 20px;
        color: #00ff88;
        min-height: 60px;
    `;
    
    const input = document.createElement('input');
    input.type = 'text';
    input.style.cssText = `
        width: 100%;
        padding: 15px;
        font-family: 'Courier New', monospace;
        font-size: 1.1rem;
        background: rgba(255, 255, 255, 0.1);
        border: 2px solid #00d4ff;
        border-radius: 8px;
        color: white;
        outline: none;
    `;
    
    const stats = document.createElement('div');
    stats.style.cssText = `
        margin-top: 20px;
        color: #00d4ff;
        font-size: 1.1rem;
    `;
    
    function newSnippet() {
        currentSnippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        textDisplay.textContent = currentSnippet;
        input.value = '';
        input.focus();
        startTime = Date.now();
    }
    
    input.addEventListener('input', () => {
        if (input.value === currentSnippet) {
            const timeTaken = (Date.now() - startTime) / 1000;
            const wpm = Math.round((currentSnippet.length / 5) / (timeTaken / 60));
            score += wpm;
            addXP(wpm);
            scoreDisplay.textContent = `Score: ${score}`;
            stats.textContent = `⚡ ${wpm} WPM - Great job!`;
            
            setTimeout(newSnippet, 1500);
        }
    });
    
    container.appendChild(textDisplay);
    container.appendChild(input);
    container.appendChild(stats);
    gameContainer.appendChild(container);
    
    startBtn.onclick = () => {
        score = 0;
        scoreDisplay.textContent = 'Score: 0';
        stats.textContent = '';
        newSnippet();
        startBtn.style.display = 'none';
    };
    
    window.stopCurrentGame = () => {};
}

// Initialize
loadData();

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);
