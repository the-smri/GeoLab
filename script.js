// Main JavaScript file for Basic Geometry Learning Hub

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMenuToggle();
    initShapeCards();
    initDrawingCanvas();
    initModal();
    initQuiz();
    initAngleDemo();
    
    // Highlight current page in navigation
    highlightCurrentPage();
});

// Toggle mobile menu
function initMenuToggle() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.querySelector('.main-nav ul');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            // Change icon based on menu state
            const icon = menuToggle.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.main-nav') && !event.target.closest('.menu-toggle')) {
            if (mainNav) {
                mainNav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

// Highlight current page in navigation
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize shape cards on homepage
function initShapeCards() {
    const shapeCards = document.querySelectorAll('.shape-card');
    const modal = document.getElementById('shapeModal');
    const closeModal = document.getElementById('closeModal');
    
    // Add click event to each shape card
    shapeCards.forEach(card => {
        card.addEventListener('click', function() {
            const shape = this.getAttribute('data-shape');
            showShapeDetails(shape);
        });
    });
    
    // Close modal when clicking X
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.classList.remove('active');
        });
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
}

// Show shape details in modal
function showShapeDetails(shape) {
    const modal = document.getElementById('shapeModal');
    const modalBody = document.querySelector('.modal-body');
    
    // Shape data
    const shapeData = {
        circle: {
            name: "Circle",
            description: "A round shape with no corners or edges.",
            properties: [
                "Sides: 0 (curved line)",
                "Angles: 0",
                "Symmetry: Infinite lines of symmetry",
                "Perimeter: Circumference = 2πr",
                "Area: πr² (r = radius)"
            ],
            examples: [
                "Coins",
                "Wheels",
                "Plates",
                "Clock faces",
                "Buttons"
            ],
            funFact: "The circle is the shape with the largest area for a given perimeter."
        },
        square: {
            name: "Square",
            description: "A shape with four equal sides and four right angles.",
            properties: [
                "Sides: 4 (all equal)",
                "Angles: 4 right angles (90° each)",
                "Symmetry: 4 lines of symmetry",
                "Perimeter: 4 × side length",
                "Area: side length × side length"
            ],
            examples: [
                "Chessboard squares",
                "Post-it notes",
                "Window panes",
                "Tile floors",
                "Rubik's cube faces"
            ],
            funFact: "A square is a special type of rectangle where all sides are equal."
        },
        rectangle: {
            name: "Rectangle",
            description: "A shape with four sides and four right angles.",
            properties: [
                "Sides: 4 (opposite sides equal)",
                "Angles: 4 right angles (90° each)",
                "Symmetry: 2 lines of symmetry",
                "Perimeter: 2 × (length + width)",
                "Area: length × width"
            ],
            examples: [
                "Doors",
                "Books",
                "Smartphones",
                "Tables",
                "Windows"
            ],
            funFact: "All squares are rectangles, but not all rectangles are squares."
        },
        triangle: {
            name: "Triangle",
            description: "A shape with three sides and three angles.",
            properties: [
                "Sides: 3",
                "Angles: 3 (sum always 180°)",
                "Types: Equilateral, Isosceles, Scalene",
                "Perimeter: sum of all sides",
                "Area: ½ × base × height"
            ],
            examples: [
                "Pyramid sides",
                "Sandwich halves",
                "Roof structures",
                "Tortilla chips",
                "Sailboat sails"
            ],
            funFact: "Triangles are the strongest shape, which is why they're used in bridges and roofs."
        },
        pentagon: {
            name: "Pentagon",
            description: "A shape with five sides and five angles.",
            properties: [
                "Sides: 5",
                "Angles: 5 (sum is 540°)",
                "Interior Angle: 108° (regular pentagon)",
                "Symmetry: 5 lines of symmetry"
            ],
            examples: [
                "Home plate in baseball",
                "Some traffic signs",
                "The Pentagon building",
                "Flowers like morning glories"
            ],
            funFact: "'Penta' means five in Greek, so pentagon means 'five angles'."
        },
        hexagon: {
            name: "Hexagon",
            description: "A shape with six sides and six angles.",
            properties: [
                "Sides: 6",
                "Angles: 6 (sum is 720°)",
                "Interior Angle: 120° (regular hexagon)",
                "Symmetry: 6 lines of symmetry"
            ],
            examples: [
                "Honeycomb cells",
                "Snowflakes",
                "Nut bolts",
                "Some soccer ball patterns"
            ],
            funFact: "Hexagons tessellate perfectly (fit together without gaps), which is why bees use them in honeycombs."
        },
        cube: {
            name: "Cube",
            description: "A 3D shape with six square faces.",
            properties: [
                "Faces: 6 (all squares)",
                "Edges: 12",
                "Vertices: 8 (corners)",
                "Volume: side × side × side",
                "Surface Area: 6 × side²"
            ],
            examples: [
                "Dice",
                "Ice cubes",
                "Rubik's cube",
                "Sugar cubes",
                "Building blocks"
            ],
            funFact: "A cube is also called a 'regular hexahedron' because it has six faces."
        },
        sphere: {
            name: "Sphere",
            description: "A perfectly round 3D shape like a ball.",
            properties: [
                "Faces: 1 curved surface",
                "Edges: 0",
                "Vertices: 0",
                "Volume: (4/3)πr³",
                "Surface Area: 4πr²"
            ],
            examples: [
                "Balls (basketball, soccer ball)",
                "Planets",
                "Marbles",
                "Oranges",
                "Globes"
            ],
            funFact: "Of all shapes with the same volume, a sphere has the smallest surface area."
        },
        cone: {
            name: "Cone",
            description: "A 3D shape with a circular base and a pointed top.",
            properties: [
                "Faces: 2 (1 flat circle, 1 curved surface)",
                "Edges: 1 circular edge",
                "Vertices: 1 (apex)",
                "Volume: (1/3)πr²h"
            ],
            examples: [
                "Ice cream cones",
                "Traffic cones",
                "Party hats",
                "Volcanoes",
                "Megaphones"
            ],
            funFact: "The cone shape helps things roll in a circle instead of a straight line."
        },
        cylinder: {
            name: "Cylinder",
            description: "A 3D shape with two circular bases and a curved surface.",
            properties: [
                "Faces: 3 (2 circles, 1 curved surface)",
                "Edges: 2 circular edges",
                "Vertices: 0",
                "Volume: πr²h"
            ],
            examples: [
                "Cans (soda cans, soup cans)",
                "Pipes",
                "Pillars",
                "Batteries",
                "Rolls of paper towels"
            ],
            funFact: "A cylinder can roll like a circle, but it only rolls in one direction."
        }
    };
    
    // Get data for selected shape
    const data = shapeData[shape];
    if (!data) return;
    
    // Create modal content
    let shapeVisualClass = '';
    switch(shape) {
        case 'circle': shapeVisualClass = 'circle-shape'; break;
        case 'square': shapeVisualClass = 'square-shape'; break;
        case 'rectangle': shapeVisualClass = 'rectangle-shape'; break;
        case 'triangle': shapeVisualClass = 'triangle-shape'; break;
        case 'pentagon': shapeVisualClass = 'pentagon-shape'; break;
        case 'hexagon': shapeVisualClass = 'hexagon-shape'; break;
        case 'cube': shapeVisualClass = 'cube-shape'; break;
        case 'sphere': shapeVisualClass = 'sphere-shape'; break;
        case 'cone': shapeVisualClass = 'cone-shape'; break;
        case 'cylinder': shapeVisualClass = 'cylinder-shape'; break;
    }
    
    modalBody.innerHTML = `
        <div class="modal-shape-header">
            <div class="modal-shape-visual ${shapeVisualClass}"></div>
            <div class="modal-shape-title">
                <h3>${data.name}</h3>
                <p class="modal-shape-description">${data.description}</p>
            </div>
        </div>
        
        <div class="modal-shape-content">
            <div class="modal-shape-properties">
                <h4>Properties:</h4>
                <ul>
                    ${data.properties.map(prop => `<li>${prop}</li>`).join('')}
                </ul>
            </div>
            
            <div class="modal-shape-examples">
                <h4>Real-Life Examples:</h4>
                <ul>
                    ${data.examples.map(example => `<li>${example}</li>`).join('')}
                </ul>
            </div>
        </div>
        
        <div class="modal-shape-funfact">
            <p><strong>Fun Fact:</strong> ${data.funFact}</p>
        </div>
    `;
    
    // Show modal
    modal.classList.add('active');
}

// Initialize drawing canvas
function initDrawingCanvas() {
    const canvas = document.getElementById('shapeCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const clearBtn = document.getElementById('clearCanvas');
    const drawBtns = document.querySelectorAll('.draw-btn');
    const colorSelect = document.getElementById('colorSelect');
    
    let drawing = false;
    let currentShape = 'line';
    let startX, startY;
    let currentColor = '#4a6fa5';
    
    // Set canvas background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Set drawing mode
    drawBtns.forEach(btn => {
        if (btn.id !== 'clearCanvas') {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                drawBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                currentShape = this.getAttribute('data-shape');
            });
        }
    });
    
    // Clear canvas
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        });
    }
    
    // Update color
    if (colorSelect) {
        colorSelect.addEventListener('input', function() {
            currentColor = this.value;
        });
    }
    
    // Drawing event listeners
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Touch events for mobile
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', stopDrawing);
    
    function handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    }
    
    function handleTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    }
    
    function startDrawing(e) {
        drawing = true;
        startX = e.offsetX || e.touches[0].clientX - canvas.getBoundingClientRect().left;
        startY = e.offsetY || e.touches[0].clientY - canvas.getBoundingClientRect().top;
    }
    
    function draw(e) {
        if (!drawing) return;
        
        const currentX = e.offsetX || e.touches[0].clientX - canvas.getBoundingClientRect().left;
        const currentY = e.offsetY || e.touches[0].clientY - canvas.getBoundingClientRect().top;
        
        // Draw preview
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Redraw all existing shapes
        // In a real implementation, you'd store drawn shapes and redraw them here
        
        // Draw preview of current shape
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = 2;
        ctx.fillStyle = currentColor + '80'; // Add transparency
        
        switch(currentShape) {
            case 'line':
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(currentX, currentY);
                ctx.stroke();
                break;
                
            case 'circle':
                const radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
                ctx.beginPath();
                ctx.arc(startX, startY, radius, 0, Math.PI * 2);
                ctx.stroke();
                break;
                
            case 'rectangle':
                const width = currentX - startX;
                const height = currentY - startY;
                ctx.strokeRect(startX, startY, width, height);
                break;
                
            case 'triangle':
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(currentX, currentY);
                ctx.lineTo(startX * 2 - currentX, currentY);
                ctx.closePath();
                ctx.stroke();
                break;
        }
    }
    
    function stopDrawing(e) {
        if (!drawing) return;
        
        drawing = false;
        
        // Finalize the shape
        const currentX = e.offsetX || (e.changedTouches ? e.changedTouches[0].clientX - canvas.getBoundingClientRect().left : 0);
        const currentY = e.offsetY || (e.changedTouches ? e.changedTouches[0].clientY - canvas.getBoundingClientRect().top : 0);
        
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = 2;
        ctx.fillStyle = currentColor + '80';
        
        switch(currentShape) {
            case 'line':
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(currentX, currentY);
                ctx.stroke();
                break;
                
            case 'circle':
                const radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
                ctx.beginPath();
                ctx.arc(startX, startY, radius, 0, Math.PI * 2);
                ctx.stroke();
                break;
                
            case 'rectangle':
                const width = currentX - startX;
                const height = currentY - startY;
                ctx.strokeRect(startX, startY, width, height);
                break;
                
            case 'triangle':
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(currentX, currentY);
                ctx.lineTo(startX * 2 - currentX, currentY);
                ctx.closePath();
                ctx.stroke();
                break;
        }
    }
}

// Initialize modal functionality
function initModal() {
    const expandButtons = document.querySelectorAll('.btn-expand');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const expandableId = this.closest('.expandable-text').id;
            toggleExpand(expandableId);
        });
    });
}

// Toggle expandable text
function toggleExpand(expandableId) {
    const expandable = document.getElementById(expandableId);
    if (!expandable) return;
    
    const hiddenText = expandable.querySelector('.hidden-text');
    const button = expandable.querySelector('.btn-expand');
    
    if (hiddenText.classList.contains('expanded')) {
        hiddenText.classList.remove('expanded');
        button.innerHTML = 'Learn More <i class="fas fa-chevron-down"></i>';
    } else {
        hiddenText.classList.add('expanded');
        button.innerHTML = 'Show Less <i class="fas fa-chevron-up"></i>';
    }
}

// Initialize quiz
function initQuiz() {
    const startQuizBtn = document.getElementById('startQuiz');
    if (!startQuizBtn) return;
    
    const quizContainer = document.getElementById('quizContainer');
    const resultsContainer = document.getElementById('resultsContainer');
    
    // Quiz questions
    const quizQuestions = [
        {
            question: "How many sides does a triangle have?",
            options: ["2", "3", "4", "5"],
            correct: 1,
            explanation: "A triangle has 3 sides. 'Tri' means three."
        },
        {
            question: "What is the name of a shape with 4 equal sides and 4 right angles?",
            options: ["Rectangle", "Square", "Rhombus", "Parallelogram"],
            correct: 1,
            explanation: "A square has 4 equal sides and 4 right angles."
        },
        {
            question: "How many degrees are in a right angle?",
            options: ["45°", "90°", "180°", "360°"],
            correct: 1,
            explanation: "A right angle measures exactly 90 degrees."
        },
        {
            question: "What is the name of a 3D shape with 6 square faces?",
            options: ["Sphere", "Cube", "Cylinder", "Pyramid"],
            correct: 1,
            explanation: "A cube has 6 square faces."
        },
        {
            question: "Which shape has no corners or edges?",
            options: ["Square", "Triangle", "Circle", "Hexagon"],
            correct: 2,
            explanation: "A circle has no corners or edges; it's a curved shape."
        },
        {
            question: "How many sides does a pentagon have?",
            options: ["4", "5", "6", "7"],
            correct: 1,
            explanation: "A pentagon has 5 sides. 'Penta' means five."
        },
        {
            question: "What is the name of a shape with opposite sides equal and all angles 90 degrees?",
            options: ["Triangle", "Circle", "Rectangle", "Pentagon"],
            correct: 2,
            explanation: "A rectangle has opposite sides equal and all angles 90 degrees."
        },
        {
            question: "What is the name of a 3D shape that looks like a ball?",
            options: ["Cube", "Cone", "Cylinder", "Sphere"],
            correct: 3,
            explanation: "A sphere is a 3D shape that looks like a ball."
        },
        {
            question: "How many degrees are in a straight angle?",
            options: ["90°", "180°", "270°", "360°"],
            correct: 1,
            explanation: "A straight angle measures exactly 180 degrees."
        },
        {
            question: "What shape are most honeycomb cells?",
            options: ["Squares", "Triangles", "Pentagons", "Hexagons"],
            correct: 3,
            explanation: "Honeycomb cells are hexagons (6-sided shapes)."
        }
    ];
    
    let currentQuestionIndex = 0;
    let userAnswers = [];
    let score = 0;
    
    // Start quiz
    startQuizBtn.addEventListener('click', function() {
        document.querySelector('.quiz-intro').style.display = 'none';
        quizContainer.style.display = 'block';
        loadQuestion(currentQuestionIndex);
        updateProgress();
    });
    
    // Load question
    function loadQuestion(index) {
        const questionContainer = document.getElementById('questionContainer');
        const question = quizQuestions[index];
        
        questionContainer.innerHTML = `
            <div class="question-text">${index + 1}. ${question.question}</div>
            <div class="options-container">
                ${question.options.map((option, i) => `
                    <div class="option" data-index="${i}">
                        <div class="option-label">${String.fromCharCode(65 + i)}</div>
                        <div class="option-text">${option}</div>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Add click event to options
        const options = questionContainer.querySelectorAll('.option');
        options.forEach(option => {
            option.addEventListener('click', function() {
                // Remove selected class from all options
                options.forEach(opt => opt.classList.remove('selected'));
                // Add selected class to clicked option
                this.classList.add('selected');
                
                // Store user's answer
                userAnswers[index] = parseInt(this.getAttribute('data-index'));
                
                // Enable next button
                document.getElementById('nextQuestion').disabled = false;
                
                // If it's the last question, show submit button
                if (index === quizQuestions.length - 1) {
                    document.getElementById('nextQuestion').style.display = 'none';
                    document.getElementById('submitQuiz').style.display = 'inline-block';
                }
            });
        });
        
        // Update question counter
        document.getElementById('currentQuestion').textContent = index + 1;
        
        // Disable next button until an option is selected
        document.getElementById('nextQuestion').disabled = true;
    }
    
    // Update progress bar
    function updateProgress() {
        const progressFill = document.getElementById('progressFill');
        const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
        progressFill.style.width = `${progress}%`;
    }
    
    // Next question button
    const nextQuestionBtn = document.getElementById('nextQuestion');
    nextQuestionBtn.addEventListener('click', function() {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            currentQuestionIndex++;
            loadQuestion(currentQuestionIndex);
            updateProgress();
            
            // Enable/disable previous button
            document.getElementById('prevQuestion').disabled = currentQuestionIndex === 0;
        }
    });
    
    // Previous question button
    const prevQuestionBtn = document.getElementById('prevQuestion');
    prevQuestionBtn.addEventListener('click', function() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion(currentQuestionIndex);
            updateProgress();
            
            // Enable/disable previous button
            document.getElementById('prevQuestion').disabled = currentQuestionIndex === 0;
            
            // Show next button, hide submit button
            document.getElementById('nextQuestion').style.display = 'inline-block';
            document.getElementById('submitQuiz').style.display = 'none';
        }
    });
    
    // Submit quiz button
    const submitQuizBtn = document.getElementById('submitQuiz');
    submitQuizBtn.addEventListener('click', function() {
        calculateScore();
        showResults();
    });
    
    // Calculate score
    function calculateScore() {
        score = 0;
        for (let i = 0; i < quizQuestions.length; i++) {
            if (userAnswers[i] === quizQuestions[i].correct) {
                score++;
            }
        }
        
        // Update score display during quiz
        document.getElementById('scoreValue').textContent = score;
    }
    
    // Show results
    function showResults() {
        quizContainer.style.display = 'none';
        resultsContainer.style.display = 'block';
        
        // Update final score
        document.getElementById('finalScore').textContent = score;
        document.getElementById('correctAnswers').textContent = score;
        
        // Update score circle
        const circle = document.getElementById('scoreCircle');
        const circumference = 2 * Math.PI * 54;
        const offset = circumference - (score / quizQuestions.length) * circumference;
        circle.style.strokeDashoffset = offset;
        
        // Set score message
        const scoreMessage = document.getElementById('scoreMessage');
        const scoreDescription = document.getElementById('scoreDescription');
        
        if (score === quizQuestions.length) {
            scoreMessage.textContent = "Perfect Score!";
            scoreDescription.textContent = "Wow! You're a geometry expert!";
        } else if (score >= quizQuestions.length * 0.7) {
            scoreMessage.textContent = "Great Job!";
            scoreDescription.textContent = "You know your geometry well!";
        } else if (score >= quizQuestions.length * 0.5) {
            scoreMessage.textContent = "Good Effort!";
            scoreDescription.textContent = "You know some geometry basics!";
        } else {
            scoreMessage.textContent = "Keep Practicing!";
            scoreDescription.textContent = "Review the shapes and basics pages to learn more!";
        }
        
        // Load review
        loadReview();
    }
    
    // Load review of answers
    function loadReview() {
        const reviewContainer = document.getElementById('reviewContainer');
        const reviewQuestions = document.querySelector('.review-questions');
        
        reviewQuestions.innerHTML = '';
        
        quizQuestions.forEach((question, index) => {
            const userAnswerIndex = userAnswers[index];
            const isCorrect = userAnswerIndex === question.correct;
            
            reviewQuestions.innerHTML += `
                <div class="review-question">
                    <div class="review-question-text">${index + 1}. ${question.question}</div>
                    <div class="review-answer ${isCorrect ? 'correct' : 'incorrect'}">
                        <i class="fas ${isCorrect ? 'fa-check' : 'fa-times'}"></i>
                        <div>
                            <strong>Your answer:</strong> ${userAnswerIndex !== undefined ? question.options[userAnswerIndex] : 'Not answered'}<br>
                            <strong>Correct answer:</strong> ${question.options[question.correct]}<br>
                            <strong>Explanation:</strong> ${question.explanation}
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    // Review answers button
    const reviewAnswersBtn = document.getElementById('reviewAnswers');
    reviewAnswersBtn.addEventListener('click', function() {
        const reviewContainer = document.getElementById('reviewContainer');
        reviewContainer.style.display = reviewContainer.style.display === 'block' ? 'none' : 'block';
    });
    
    // Retake quiz button
    const retakeQuizBtn = document.getElementById('retakeQuiz');
    retakeQuizBtn.addEventListener('click', function() {
        // Reset quiz
        currentQuestionIndex = 0;
        userAnswers = [];
        score = 0;
        
        // Hide results, show intro
        resultsContainer.style.display = 'none';
        document.querySelector('.quiz-intro').style.display = 'flex';
        
        // Reset buttons
        document.getElementById('nextQuestion').style.display = 'inline-block';
        document.getElementById('submitQuiz').style.display = 'none';
        document.getElementById('prevQuestion').disabled = true;
        
        // Update displays
        document.getElementById('scoreValue').textContent = '0';
        document.getElementById('progressFill').style.width = '10%';
    });
}

// Initialize angle demo on basics page
function initAngleDemo() {
    const angleCanvas = document.getElementById('angleCanvas');
    if (!angleCanvas) return;
    
    const ctx = angleCanvas.getContext('2d');
    const angleValue = document.getElementById('angleValue');
    const angleType = document.getElementById('angleType');
    const angleTypeButtons = document.querySelectorAll('.angle-type-btn');
    
    // Set canvas dimensions
    const width = angleCanvas.width;
    const height = angleCanvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 100;
    
    let angle = 45; // Initial angle in degrees
    let dragging = false;
    
    // Draw initial angle
    drawAngle(angle);
    
    // Angle type buttons
    angleTypeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            angleTypeButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Set angle based on button
            const angleType = this.getAttribute('data-angle');
            switch(angleType) {
                case 'acute': angle = 45; break;
                case 'right': angle = 90; break;
                case 'obtuse': angle = 120; break;
                case 'straight': angle = 180; break;
            }
            
            drawAngle(angle);
        });
    });
    
    // Draw angle
    function drawAngle(angleDeg) {
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Convert angle to radians
        const angleRad = angleDeg * Math.PI / 180;
        
        // Draw angle lines
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + radius, centerY);
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + radius * Math.cos(angleRad), centerY - radius * Math.sin(angleRad));
        ctx.strokeStyle = '#4a6fa5';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Draw vertex point
        ctx.beginPath();
        ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#4a6fa5';
        ctx.fill();
        
        // Draw angle arc
        ctx.beginPath();
        ctx.arc(centerX, centerY, 40, 0, angleRad, true);
        ctx.strokeStyle = '#ff9a8b';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw angle value
        ctx.font = 'bold 16px Nunito';
        ctx.fillStyle = '#333';
        ctx.textAlign = 'center';
        ctx.fillText(`${angleDeg}°`, centerX + 60 * Math.cos(angleRad/2), centerY - 60 * Math.sin(angleRad/2));
        
        // Update angle display
        angleValue.textContent = `${angleDeg}°`;
        
        // Update angle type
        if (angleDeg < 90) {
            angleType.textContent = 'Acute Angle';
        } else if (angleDeg === 90) {
            angleType.textContent = 'Right Angle';
        } else if (angleDeg < 180) {
            angleType.textContent = 'Obtuse Angle';
        } else if (angleDeg === 180) {
            angleType.textContent = 'Straight Angle';
        }
    }
    
    // Mouse events for dragging
    angleCanvas.addEventListener('mousedown', function(e) {
        const rect = angleCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Check if click is near the angle line
        const lineEndX = centerX + radius * Math.cos(angle * Math.PI / 180);
        const lineEndY = centerY - radius * Math.sin(angle * Math.PI / 180);
        const distance = Math.sqrt(Math.pow(x - lineEndX, 2) + Math.pow(y - lineEndY, 2));
        
        if (distance < 20) {
            dragging = true;
            angleCanvas.style.cursor = 'grabbing';
        }
    });
    
    angleCanvas.addEventListener('mousemove', function(e) {
        if (!dragging) return;
        
        const rect = angleCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left - centerX;
        const y = centerY - (e.clientY - rect.top); // Invert Y axis
        
        // Calculate angle from mouse position
        let newAngle = Math.atan2(y, x) * 180 / Math.PI;
        if (newAngle < 0) newAngle += 360;
        if (newAngle > 180) newAngle = 180; // Limit to 180 degrees
        
        angle = Math.round(newAngle);
        drawAngle(angle);
        
        // Update active button based on angle
        angleTypeButtons.forEach(btn => btn.classList.remove('active'));
        if (angle < 90) {
            document.querySelector('[data-angle="acute"]').classList.add('active');
        } else if (angle === 90) {
            document.querySelector('[data-angle="right"]').classList.add('active');
        } else if (angle < 180) {
            document.querySelector('[data-angle="obtuse"]').classList.add('active');
        } else if (angle === 180) {
            document.querySelector('[data-angle="straight"]').classList.add('active');
        }
    });
    
    angleCanvas.addEventListener('mouseup', function() {
        dragging = false;
        angleCanvas.style.cursor = 'pointer';
    });
    
    angleCanvas.addEventListener('mouseout', function() {
        dragging = false;
        angleCanvas.style.cursor = 'pointer';
    });
}