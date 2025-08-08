'use client';

import { useState } from 'react';
import { CheckCircle, AlertTriangle, Clock, ArrowRight, RefreshCw } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  type: 'multiple' | 'scale' | 'boolean';
  options?: string[];
  scaleLabels?: { min: string; max: string };
}

const assessmentQuestions: Question[] = [
  {
    id: 1,
    question: "Where is your primary pain located?",
    type: "multiple",
    options: [
      "Lower back",
      "Upper back",
      "Neck",
      "Shoulder",
      "Hip",
      "Knee",
      "Multiple areas"
    ]
  },
  {
    id: 2,
    question: "On a scale of 1-10, what is your current pain level?",
    type: "scale",
    scaleLabels: { min: "No pain", max: "Severe pain" }
  },
  {
    id: 3,
    question: "How long have you been experiencing this pain?",
    type: "multiple",
    options: [
      "Less than 1 week",
      "1-4 weeks",
      "1-3 months",
      "3-6 months",
      "More than 6 months"
    ]
  },
  {
    id: 4,
    question: "Does your pain radiate or spread to other areas?",
    type: "boolean"
  },
  {
    id: 5,
    question: "What activities make your pain worse?",
    type: "multiple",
    options: [
      "Sitting",
      "Standing",
      "Walking",
      "Bending",
      "Lifting",
      "Sleeping",
      "Exercise"
    ]
  },
  {
    id: 6,
    question: "Have you tried any treatments before?",
    type: "multiple",
    options: [
      "Physical therapy",
      "Chiropractic care",
      "Medication",
      "Massage therapy",
      "Injections",
      "Surgery",
      "None"
    ]
  }
];

export default function InteractiveAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [showResults, setShowResults] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const handleAnswer = (questionId: number, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      completeAssessment();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const completeAssessment = async () => {
    setIsCompleting(true);
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    setShowResults(true);
    setIsCompleting(false);
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setIsCompleting(false);
  };

  const getRecommendation = () => {
    const painLevel = answers[2] || 5;
    const duration = answers[3];
    const hasRadiation = answers[4];
    
    if (painLevel >= 8 || hasRadiation) {
      return {
        urgency: "high",
        title: "Immediate Consultation Recommended",
        description: "Based on your responses, you may benefit from immediate professional evaluation and treatment.",
        treatment: "Comprehensive assessment with potential for advanced treatment options including manual therapy and pain management techniques.",
        timeframe: "Schedule within 24-48 hours"
      };
    } else if (painLevel >= 5 || duration === "More than 6 months") {
      return {
        urgency: "moderate",
        title: "Professional Treatment Recommended",
        description: "Your symptoms suggest you would benefit from professional physical therapy treatment.",
        treatment: "Structured treatment program with manual therapy, exercise prescription, and education.",
        timeframe: "Schedule within 1 week"
      };
    } else {
      return {
        urgency: "low",
        title: "Preventive Care & Education",
        description: "While your symptoms are mild, preventive care can help avoid progression.",
        treatment: "Consultation for movement education, postural correction, and exercise program.",
        timeframe: "Schedule within 2-4 weeks"
      };
    }
  };

  if (isCompleting) {
    return (
      <section className="bg-gradient-to-br from-blue-50 to-green-50 section-padding">
        <div className="container-max">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Analyzing Your Responses</h3>
            <p className="text-gray-600">
              Our system is evaluating your symptoms and preparing personalized recommendations...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (showResults) {
    const recommendation = getRecommendation();
    const urgencyColors = {
      high: { bg: "bg-red-50", border: "border-red-200", text: "text-red-800", icon: "text-red-600" },
      moderate: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-800", icon: "text-orange-600" },
      low: { bg: "bg-green-50", border: "border-green-200", text: "text-green-800", icon: "text-green-600" }
    };
    const colors = urgencyColors[recommendation.urgency as keyof typeof urgencyColors];

    return (
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" aria-hidden="true" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Your Personalized Assessment Results
              </h2>
              <p className="text-xl text-gray-600">
                Based on your responses, here are our recommendations for your care
              </p>
            </div>

            <div className={`${colors.bg} ${colors.border} border rounded-2xl p-8 mb-8`}>
              <div className="flex items-start mb-6">
                <AlertTriangle className={`w-6 h-6 ${colors.icon} mr-3 mt-1`} aria-hidden="true" />
                <div>
                  <h3 className={`text-2xl font-bold ${colors.text} mb-2`}>
                    {recommendation.title}
                  </h3>
                  <p className={`text-lg ${colors.text} opacity-90`}>
                    {recommendation.description}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Recommended Treatment:</h4>
                  <p className="text-gray-700">{recommendation.treatment}</p>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Clock className="w-4 h-4 mr-2" aria-hidden="true" />
                    Timeline:
                  </h4>
                  <p className="text-gray-700">{recommendation.timeframe}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Take the Next Step?</h3>
              <p className="text-xl mb-6 opacity-90">
                Our expert team is ready to help you develop a personalized treatment plan
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200">
                  Schedule Free Consultation
                </button>
                <button 
                  onClick={resetAssessment}
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 flex items-center justify-center"
                >
                  <RefreshCw className="w-4 h-4 mr-2" aria-hidden="true" />
                  Retake Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const question = assessmentQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100;

  return (
    <section className="bg-gradient-to-br from-blue-50 to-green-50 section-padding" aria-labelledby="assessment-heading">
      <div className="container-max">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="assessment-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Free Spine Health Assessment
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Answer a few questions to receive personalized recommendations for your spine health
            </p>
            
            {/* Progress Bar */}
            <div className="bg-white rounded-full h-3 mb-6">
              <div 
                className="bg-gradient-to-r from-blue-600 to-green-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-gray-600">
              Question {currentQuestion + 1} of {assessmentQuestions.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              {question.question}
            </h3>

            <div className="space-y-4 mb-8">
              {question.type === 'multiple' && question.options && (
                <div className="grid gap-3">
                  {question.options.map((option, index) => (
                    <label key={index} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option}
                        onChange={(e) => handleAnswer(question.id, e.target.value)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                        answers[question.id] === option 
                          ? 'border-blue-600 bg-blue-600' 
                          : 'border-gray-300'
                      }`}>
                        {answers[question.id] === option && (
                          <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                        )}
                      </div>
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {question.type === 'scale' && question.scaleLabels && (
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>{question.scaleLabels.min}</span>
                    <span>{question.scaleLabels.max}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <button
                        key={num}
                        onClick={() => handleAnswer(question.id, num)}
                        className={`w-12 h-12 rounded-full border-2 transition-colors ${
                          answers[question.id] === num
                            ? 'border-blue-600 bg-blue-600 text-white'
                            : 'border-gray-300 text-gray-700 hover:border-blue-300'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {question.type === 'boolean' && (
                <div className="grid grid-cols-2 gap-4">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="flex items-center justify-center p-6 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option}
                        onChange={(e) => handleAnswer(question.id, e.target.value)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 ${
                        answers[question.id] === option 
                          ? 'border-blue-600 bg-blue-600' 
                          : 'border-gray-300'
                      }`}>
                        {answers[question.id] === option && (
                          <div className="w-2 h-2 bg-white rounded-full mx-auto mt-1"></div>
                        )}
                      </div>
                      <span className="text-lg font-semibold text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              
              <button
                onClick={handleNext}
                disabled={!answers[question.id]}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {currentQuestion === assessmentQuestions.length - 1 ? 'Get Results' : 'Next'}
                <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="text-center mt-8 text-gray-600">
            <p className="text-sm">
              This assessment is for informational purposes only and does not replace professional medical advice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}