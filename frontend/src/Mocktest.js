import React, { useState } from 'react';

const Mocktest = () => {
  // 1. YOUR QUESTION BANK (The Backup)
  const questions = [
    {
      question: "Which document is NOT required for AP Inter 2026 exams according to the latest update?",
      options: ["Hall Ticket", "College ID", "Principal's Signature/Stamp", "Aadhaar Card"],
      answer: 2,
      explanation: "The latest board update confirms that the Principal's signature or college stamp is no longer mandatory on downloaded hall tickets."
    },
    {
      question: "What is the new pass mark for an 85-mark theory paper in 2026?",
      options: ["30 marks", "29 marks", "35 marks", "28 marks"],
      answer: 1,
      explanation: "For 1st-year students, the board has adjusted the pass mark to 29 out of 85 marks."
    },
    {
      question: "How many pages are in the new 1st-year Intermediate answer booklet?",
      options: ["24 pages", "28 pages", "32 pages", "36 pages"],
      answer: 2,
      explanation: "To accommodate more questions in Math and Sciences, the booklet has been increased to 32 pages."
    }
  ];

  const [currentStep, setCurrentStep] = useState('quiz');
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);

  const handleOptionChange = (qIndex, optIndex) => {
    setUserAnswers({ ...userAnswers, [qIndex]: optIndex });
  };

  const submitQuiz = () => {
    let finalScore = 0;
    questions.forEach((q, index) => {
      if (userAnswers[index] === q.answer) finalScore++;
    });
    setScore(finalScore);
    setCurrentStep('result');
    window.scrollTo(0, 0);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>Edu9 Career Guidance: Mock Test 2026</h1>
      <hr />

      {currentStep === 'quiz' ? (
        <div>
          {questions.map((q, index) => (
            <div key={index} style={{ marginBottom: '30px', background: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
              <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{index + 1}. {q.question}</p>
              {q.options.map((opt, optIdx) => (
                <div key={optIdx} style={{ margin: '10px 0' }}>
                  <label style={{ cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      onChange={() => handleOptionChange(index, optIdx)}
                      checked={userAnswers[index] === optIdx}
                      style={{ marginRight: '10px' }}
                    />
                    {opt}
                  </label>
                </div>
              ))}
            </div>
          ))}
          <button 
            onClick={submitQuiz} 
            style={{ width: '100%', padding: '15px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '5px', fontSize: '1.2rem', cursor: 'pointer' }}
          >
            Submit Test & See Results
          </button>
        </div>
      ) : (
        <div style={{ background: '#fff', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h2 style={{ color: '#27ae60' }}>Your Score: {score} / {questions.length}</h2>
          <button onClick={() => window.location.reload()} style={{ marginBottom: '20px', background: '#3498db', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }}>Retake Test</button>
          
          <h3>Detailed Answer Key (Back-end Review):</h3>
          {questions.map((q, index) => (
            <div key={index} style={{ marginBottom: '20px', padding: '15px', borderLeft: '5px solid' + (userAnswers[index] === q.answer ? '#27ae60' : '#e74c3c'), background: '#fcfcfc' }}>
              <p><strong>Q{index + 1}: {q.question}</strong></p>
              <p>Your Answer: <span style={{ color: userAnswers[index] === q.answer ? '#27ae60' : '#e74c3c' }}>{q.options[userAnswers[index]] || "Not Answered"}</span></p>
              <p>Correct Answer: <span style={{ color: '#27ae60' }}>{q.options[q.answer]}</span></p>
              <div style={{ marginTop: '10px', fontStyle: 'italic', color: '#555' }}>
                <strong>Explanation:</strong> {q.explanation}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Mocktest;