// Paramount+ Jeopardy Game Logic
class ParamountJeopardyGame {
    constructor() {
        this.gameData = {
            "categories": {
                "STAR TREK UNIVERSE": {
                    "100": {"clue": "This captain of the USS Discovery, played by Sonequa Martin-Green, was the first Black female lead in Star Trek history", "answer": "Who is Michael Burnham?"},
                    "200": {"clue": "This animated Star Trek series follows junior officers aboard the USS Cerritos and premiered in 2020", "answer": "What is Star Trek: Lower Decks?"},
                    "300": {"clue": "This legendary captain returned to Star Trek in 2020 in his own series after being away for nearly two decades", "answer": "Who is Jean-Luc Picard?"},
                    "400": {"clue": "This Star Trek series, premiering in 2022, features Captain Pike and the crew of the USS Enterprise", "answer": "What is Star Trek: Strange New Worlds?"},
                    "500": {"clue": "This 2025 Star Trek film starring Michelle Yeoh focuses on the mysterious Section 31 organization", "answer": "What is Star Trek: Section 31?"}
                },
                "YELLOWSTONE UNIVERSE": {
                    "100": {"clue": "This actor plays patriarch John Dutton in the original Yellowstone series", "answer": "Who is Kevin Costner?"},
                    "200": {"clue": "This prequel series follows the Dutton family's journey to Montana in the 1800s", "answer": "What is 1883?"},
                    "300": {"clue": "Tim McGraw and Faith Hill star as James and Margaret Dutton in this series", "answer": "What is 1883?"},
                    "400": {"clue": "This 2022 prequel series stars Harrison Ford and Helen Mirren as Jacob and Cara Dutton", "answer": "What is 1923?"},
                    "500": {"clue": "This creator and writer is the mastermind behind the entire Yellowstone universe", "answer": "Who is Taylor Sheridan?"}
                },
                "REALITY TV": {
                    "100": {"clue": "This drag queen host and judge searches for 'America's Next Drag Superstar' on Paramount+", "answer": "Who is RuPaul?"},
                    "200": {"clue": "This 2025 season 17 winner from Cleveland, Ohio was crowned the latest Drag Race champion", "answer": "Who is Onya Nurve?"},
                    "300": {"clue": "This All Stars season 10 format features queens competing in different brackets", "answer": "What is the Tournament of All Stars?"},
                    "400": {"clue": "This judge sits in a dunk tank during season 17 eliminations", "answer": "Who is Michelle Visage?"},
                    "500": {"clue": "This season 17 contestant from New Jersey was voted Miss Congeniality by her fellow queens", "answer": "Who is Crystal Envy?"}
                },
                "CRIME & DRAMA": {
                    "100": {"clue": "This FBI behavioral analysis unit returned to Paramount+ with 'Evolution' after its original CBS run", "answer": "What is Criminal Minds?"},
                    "200": {"clue": "This legal drama spinoff of 'The Good Wife' starred Christine Baranski as Diane Lockhart", "answer": "What is The Good Fight?"},
                    "300": {"clue": "This supernatural drama about a forensic psychologist moved from CBS to Paramount+ for its final seasons", "answer": "What is Evil?"},
                    "400": {"clue": "This notorious serial killer character Elias Voit appears in Criminal Minds: Evolution", "answer": "Who is Sicarius?"},
                    "500": {"clue": "This actress plays Kristen Bouchard, a forensic psychologist in the series Evil", "answer": "Who is Katja Herbers?"}
                },
                "KIDS & FAMILY": {
                    "100": {"clue": "This yellow sponge lives in a pineapple under the sea in Bikini Bottom", "answer": "Who is SpongeBob SquarePants?"},
                    "200": {"clue": "This SpongeBob spinoff series shows the title character as a child at summer camp", "answer": "What is Kamp Koral: SpongeBob's Under Years?"},
                    "300": {"clue": "This 2021 reboot brought back the Nickelodeon babies for a new generation on Paramount+", "answer": "What is Rugrats?"},
                    "400": {"clue": "This 2025 special features SpongeBob and Patrick in a time-traveling crossover adventure", "answer": "What is SpongeBob and Patrick's Timeline Twist-up?"},
                    "500": {"clue": "This middle schooler's comic strip adventures were adapted into an animated series on Paramount+", "answer": "Who is Big Nate?"}
                },
                "MOVIES & MORE": {
                    "100": {"clue": "This blue hedgehog's 2020 film was a major hit for Paramount Pictures", "answer": "Who is Sonic?"},
                    "200": {"clue": "This Tom Cruise action franchise features impossible missions and death-defying stunts", "answer": "What is Mission: Impossible?"},
                    "300": {"clue": "This 2021 film starring Mark Wahlberg as an action hero premiered exclusively on Paramount+", "answer": "What is Infinite?"},
                    "400": {"clue": "This animated film about Autobots and Decepticons' origin story was released in 2024", "answer": "What is Transformers One?"},
                    "500": {"clue": "This classic 1997 Paul Thomas Anderson film about the LA adult film industry streams on Paramount+", "answer": "What is Boogie Nights?"}
                }
            },
            "final_jeopardy": {
                "category": "PARAMOUNT+ ORIGINALS",
                "clue": "This 2022 Paramount+ original series starring Sylvester Stallone follows a New York mobster who relocates to Oklahoma after being released from prison",
                "answer": "What is Tulsa King?"
            }
        };
        
        this.currentScore = 0;
        this.currentQuestion = null;
        this.answeredQuestions = new Set();
        this.totalQuestions = 30; // 6 categories × 5 questions each
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.bindEvents();
        this.showScreen('start-screen');
    }
    
    bindEvents() {
        // Start game button
        document.getElementById('start-btn').addEventListener('click', () => {
            this.startGame();
        });
        
        // Point value buttons
        document.querySelectorAll('.point-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                const value = e.target.dataset.value;
                this.showQuestion(category, value, e.target);
            });
        });
        
        // Show answer button
        document.getElementById('show-answer-btn').addEventListener('click', () => {
            this.showAnswer();
        });
        
        // Back to board buttons
        document.getElementById('back-to-board-btn').addEventListener('click', () => {
            this.backToBoard();
        });
        
        document.getElementById('back-to-board-answer-btn').addEventListener('click', () => {
            this.backToBoard();
        });
        
        // Correct/Incorrect buttons
        document.getElementById('correct-btn').addEventListener('click', () => {
            this.handleAnswer(true);
        });
        
        document.getElementById('incorrect-btn').addEventListener('click', () => {
            this.handleAnswer(false);
        });
        
        // Final Jeopardy buttons
        document.getElementById('show-final-answer-btn').addEventListener('click', () => {
            this.showFinalAnswer();
        });
        
        // Play again button
        document.getElementById('play-again-btn').addEventListener('click', () => {
            this.resetGame();
        });
    }
    
    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        document.getElementById(screenId).classList.add('active');
    }
    
    startGame() {
        this.showScreen('game-board');
        this.updateScore();
    }
    
    showQuestion(category, value, buttonElement) {
        // Check if question already answered
        const questionKey = `${category}-${value}`;
        if (this.answeredQuestions.has(questionKey)) {
            return;
        }
        
        // Disable and mark the button
        buttonElement.disabled = true;
        buttonElement.style.background = '#666';
        buttonElement.style.color = '#999';
        
        // Store current question
        this.currentQuestion = {
            category: category,
            value: parseInt(value),
            data: this.gameData.categories[category][value],
            buttonElement: buttonElement
        };
        
        // Populate question screen
        document.getElementById('question-category').textContent = category;
        document.getElementById('question-value').textContent = `$${value}`;
        document.getElementById('question-clue').textContent = this.currentQuestion.data.clue;
        
        this.showScreen('question-screen');
    }
    
    showAnswer() {
        if (!this.currentQuestion) return;
        
        // Populate answer screen
        document.getElementById('answer-category').textContent = this.currentQuestion.category;
        document.getElementById('answer-value').textContent = `$${this.currentQuestion.value}`;
        document.getElementById('answer-text').textContent = this.currentQuestion.data.answer;
        document.getElementById('correct-points').textContent = this.currentQuestion.value;
        document.getElementById('incorrect-points').textContent = this.currentQuestion.value;
        
        this.showScreen('answer-screen');
    }
    
    handleAnswer(isCorrect) {
        if (!this.currentQuestion) return;
        
        const questionKey = `${this.currentQuestion.category}-${this.currentQuestion.value}`;
        this.answeredQuestions.add(questionKey);
        
        // Update score
        if (isCorrect) {
            this.currentScore += this.currentQuestion.value;
        } else {
            this.currentScore -= this.currentQuestion.value;
        }
        
        this.updateScore();
        this.backToBoard();
        
        // Check if all questions answered
        if (this.answeredQuestions.size >= this.totalQuestions) {
            setTimeout(() => {
                this.showFinalJeopardy();
            }, 1000);
        }
    }
    
    backToBoard() {
        this.showScreen('game-board');
        this.currentQuestion = null;
    }
    
    updateScore() {
        document.getElementById('current-score').textContent = this.currentScore.toLocaleString();
    }
    
    showFinalJeopardy() {
        document.getElementById('final-clue').textContent = this.gameData.final_jeopardy.clue;
        this.showScreen('final-jeopardy-screen');
    }
    
    showFinalAnswer() {
        document.getElementById('final-answer-text').textContent = this.gameData.final_jeopardy.answer;
        document.getElementById('final-score').textContent = this.currentScore.toLocaleString();
        this.showScreen('final-answer-screen');
    }
    
    resetGame() {
        // Reset game state
        this.currentScore = 0;
        this.currentQuestion = null;
        this.answeredQuestions.clear();
        
        // Re-enable all buttons
        document.querySelectorAll('.point-btn').forEach(btn => {
            btn.disabled = false;
            btn.style.background = '';
            btn.style.color = '';
        });
        
        // Update score display
        this.updateScore();
        
        // Return to start screen
        this.showScreen('start-screen');
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ParamountJeopardyGame();
});