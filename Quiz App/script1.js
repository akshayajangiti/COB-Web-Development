const quizQuestions = [
    {
      question: 'How many time zones are there in Russia?',
      options: ['13', '2', '11', '9'],
      answer: '11',
    },
    {
      question: 'What is the national flower of Japan?',
      options: ['Cherry blossom', 'Lotus', 'Lily', 'BedRose'],
      answer: 'Cherry blossom',
    },
    {
      question: 'How many stripes are there on the US flag?',
      options: ['11', '12', '13', '14'],
      answer: '13',
    },
    {
      question: 'What country has the most islands in the world?',
      options: ['India', 'Nepal', 'Sweden', 'Switzerland'],
      answer: 'Sweden',
    },
    {
      question: 'Which is the largest ocean on Earth?',
      options: [
        'Pacific Ocean',
        'Indian Ocean',
        'Atlantic Ocean',
        'Arctic Ocean',
      ],
      answer: 'Pacific Ocean',
    },
    {
      question: 'Name the longest river in the world? ',
      options: ['The Nile', 'The Ganga', 'The Yamuna', 'The Godavari'],
      answer: 'The Nile',
    },
    {
      question: 'Who invented the World Wide Web?',
      options: [
        'Pablo Picasso',
        'Vincent van Gogh',
        'Leonardo da Vinci',
        'Coco Chanel',
      ],
      answer: 'Coco Chanel',
    },
    {
      question: 'When was Apollo 11 landed on the Moon?',
      options: ['July 20th, 1969', 'July 21th, 1969', 'July 10th, 1965', 'July 20th, 1965'],
      answer: 'July 20th, 1969',
    },
    {
      question: 'Where is Billie Eilish from?',
      options: [
        'Los Angeles',
        'New York',
        'UK',
        'Amsterdam',
      ],
      answer: 'Los Angeles',
    },
    {
      question: 'When was Netflix founded?',
      options: ['1997', '1999', '2009', '2010'],
      answer: '1997',
    },
  ];
  const quizcontainer = document.getElementById('quiz');
  const scorecontainer = document.getElementById('score');
  const submitbutton = document.getElementById('submit');
  const retrybutton = document.getElementById('retry');
  const viewbutton = document.getElementById('view');
  let presentques = 0;
  let points= 0;
  let incorrectans= [];
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  function viewquestions() {
    const questionData = quizQuestions[presentques];
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  const optionText = document.createTextNode(shuffledOptions[i]);
  option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
   quizcontainer.innerHTML = '';
    quizcontainer.appendChild(questionElement);
    quizcontainer.appendChild(optionsElement);
  }
  function viewans() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizQuestions[presentques].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizQuestions[presentques].question,
          incorrectAnswer: answer,
          correctAnswer: quizQuestions[presentques].answer,
        });
      }
      presentques++;
      selectedOption.checked = false;
      if (presentques < quizQuestions.length) {
        viewquestions();
      } else {
        viewscore();
      }
    }
  }
  function viewscore() {
    quizcontainer.style.display = 'none';
    submitbutton.style.display = 'none';
    retrybutton.style.display = 'inline-block';
    viewbutton.style.display = 'inline-block';
    scorecontainer.innerHTML = `You scored ${score} out of ${quizQuestions.length}!`;
  }
   function reattempt() {
    presentques = 0;
    points= 0;
    incorrectans= [];
    quizcontainer.style.display = 'block';
    submitbutton.style.display = 'inline-block';
    retrybutton.style.display = 'none';
    viewbutton.style.display = 'none';
    scorecontainer.innerHTML = '';
    viewquestions();
  }
  function view() {
    quizcontainer.style.display = 'none';
    submitbutton.style.display = 'none';
    retrybutton.style.display = 'inline-block';
    viewbutton.style.display = 'none';
  let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  scorecontainer.innerHTML = `
      <p>Your score is ${score} / ${quizQuestions.length}</p>
      <p>Wrong Answers - </p>
      ${incorrectAnswersHtml}
    `;
  }
  submitbutton.addEventListener('click', viewans);
  retrybutton.addEventListener('click', reattempt);
  viewbutton.addEventListener('click', view);
  viewquestions();