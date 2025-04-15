import React, { useState } from 'react';
import Select from 'react-select';

const FinancialSelection = () => {
  const financialQuestions = [
    {
      id: 1,
      question: "What is your current employment status?",
      options: [
        { value: 'employed', label: 'Employed' },
        { value: 'self-employed', label: 'Self-Employed' },
        { value: 'unemployed', label: 'Unemployed' },
        { value: 'student', label: 'Student' },
        { value: 'retired', label: 'Retired' },
      ],
    },
    {
      id: 2,
      question: "What is your annual income?",
      options: [
        { value: '0-25k', label: '$0 - $25,000' },
        { value: '25k-50k', label: '$25,000 - $50,000' },
        { value: '50k-100k', label: '$50,000 - $100,000' },
        { value: '100k-200k', label: '$100,000 - $200,000' },
        { value: '200k+', label: '$200,000+' },
      ],
    },
    {
      id: 3,
      question: "Do you have any outstanding debts?",
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ],
    },
    {
      id: 4,
      question: "What is your credit score range?",
      options: [
        { value: '300-579', label: '300-579 (Poor)' },
        { value: '580-669', label: '580-669 (Fair)' },
        { value: '670-739', label: '670-739 (Good)' },
        { value: '740-799', label: '740-799 (Very Good)' },
        { value: '800-850', label: '800-850 (Excellent)' },
      ],
    },
    {
        id: 5,
        question: "What is your source of income?",
        options: [
          { value: 'salary', label: 'Salary' },
          { value: 'business', label: 'Business' },
          { value: 'investments', label: 'Investments' },
          { value: 'rental', label: 'Rental Income' },
          { value: 'other', label: 'Other' },
        ],
      },
      {
        id: 6,
        question: "What are your monthly expenses?",
        options: [
          { value: '0-500', label: '$0 - $500' },
          { value: '500-1000', label: '$500 - $1,000' },
          { value: '1000-2000', label: '$1,000 - $2,000' },
          { value: '2000-3000', label: '$2,000 - $3,000' },
          { value: '3000+', label: '$3,000+' },
        ],
      },
      {
        id: 7,
        question: "Do you have any savings or investments?",
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
      },
      {
        id: 8,
        question: "Are you planning any major purchases in the next year?",
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
          { value: 'maybe', label: 'Maybe' },
        ],
      },
      {
        id: 9,
        question: "What is your main financial goal?",
        options: [
          { value: 'debt_reduction', label: 'Debt Reduction' },
          { value: 'saving', label: 'Saving' },
          { value: 'investing', label: 'Investing' },
          { value: 'retirement', label: 'Retirement Planning' },
          { value: 'other', label: 'Other' },
        ],
      },
      {
        id: 10,
        question: "How would you describe your risk tolerance?",
        options: [
          { value: 'low', label: 'Low' },
          { value: 'moderate', label: 'Moderate' },
          { value: 'high', label: 'High' },
        ],
      }
  ];

  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers({ ...answers, [questionId]: selectedOption });
  };

  const FinancialQuestionsForm = () => {
    return (
        <div>
          {financialQuestions.map((question) => (
            <div key={question.id} className="mb-4">
              <label className="form-label">{question.question}</label>
              <Select
                options={question.options}
                onChange={(selectedOption) => handleAnswerChange(question.id, selectedOption)}
                className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
              />
            </div>
          ))}
        </div>
      );
  };

  return (
    <div>
      <FinancialQuestionsForm />
    </div>
  );
};

export default FinancialSelection;