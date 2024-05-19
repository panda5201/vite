import React, { useState, useEffect } from 'react';
import "./styles.css";
import { Link } from 'react-router-dom';
import HoverEffect from './responsive_button';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/questions');
      const data = await response.json();
      setQuestions(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setLoading(false);
    }
  };

  const handleAnswer = (answer) => {
    setUserAnswers([...userAnswers, answer]);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleMouseEnter = (event) => {
    event.currentTarget.style.transform = "scale(1.05)";
    event.currentTarget.style.boxShadow = "0px 8px 16px rgba(0, 0, 0, 0.2)";
  };

  const handleMouseLeave = (event) => {
    event.currentTarget.style.transform = "scale(1)";
    event.currentTarget.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)";
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setShowResults(false);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (question.correct === userAnswers[index]) {
        score++;
      }
    });
    return score;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="quiz-page">
      <HoverEffect>
        <Link className="big-button-link" to="/Page2">
          <h3>Return</h3>
        </Link>
      </HoverEffect>
      <div className="quiz-container">
        {!showResults ? (
          <div className="question-container">
            <h3 className="quiz-question">{questions[currentQuestion].question}</h3>
            <ul className="options-list">
              {questions[currentQuestion].options.map((option, index) => (
                <li key={index} 
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleAnswer(option)}>
                  {option}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="results-container">
            <h2 className="quiz-heading">Ketepatan: {calculateScore()} / {questions.length}</h2>
            <ol className="results-list">
              {questions.map((question, index) => (
                <div key={index}>
                  <li>
                    {question.question}
                    <ul>
                      <li>
                        Jawabanmu : {userAnswers[index]} 
                      </li>
                      <li>
                        Jawaban yang benar : {question.correct}
                      </li>
                    </ul>
                  </li>
                </div>
              ))}
            </ol>
            <HoverEffect>
              <button onClick={restartQuiz}>Restart Quiz</button>
            </HoverEffect>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
