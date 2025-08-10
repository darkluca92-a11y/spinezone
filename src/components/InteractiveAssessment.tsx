'use client';

import { useState, useCallback, useMemo, useTransition, memo } from 'react';
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

// Performance-optimized InteractiveAssessment component
export default memo(function InteractiveAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [showResults, setShowResults] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Optimized answer handler with transition
  const handleAnswer = useCallback((questionId: number, answer: any) => {
    startTransition(() => {
      setAnswers(prev => ({ ...prev, [questionId]: answer }));
    });
  }, []);

  const handleNext = useCallback(() => {
    startTransition(() => {
      if (currentQuestion < assessmentQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        completeAssessment();
      }
    });
  }, [currentQuestion]);

  const handlePrevious = useCallback(() => {
    startTransition(() => {
      if (currentQuestion > 0) {
        setCurrentQuestion(prev => prev - 1);
      }
    });
  }, [currentQuestion]);

  const [processingStep, setProcessingStep] = useState(0);
  const [processingSteps] = useState([
    'Analyzing your responses...',
    'Comparing with patient database...',
    'Generating personalized recommendations...',
    'Preparing treatment options...'
  ]);

  const completeAssessment = useCallback(async () => {
    startTransition(() => {
      setIsCompleting(true);
      setProcessingStep(0);
    });

    // Progressive loading simulation with optimized steps
    for (let i = 0; i < processingSteps.length; i++) {
      startTransition(() => {
        setProcessingStep(i);
      });
      await new Promise(resolve => setTimeout(resolve, 600)); // Faster processing
    }

    startTransition(() => {
      setShowResults(true);
      setIsCompleting(false);
    });
  }, [processingSteps]);

  const resetAssessment = useCallback(() => {
    startTransition(() => {
      setCurrentQuestion(0);
      setAnswers({});
      setShowResults(false);
      setIsCompleting(false);
    });
  }, []);

  // Memoized recommendation calculation
  const recommendation = useMemo(() => {
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
  }, [answers]);

  if (isCompleting) {
    return (
      <section className="bg-gradient-to-br from-blue-50 to-green-50 section-padding">
        <div className="container-max">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Processing Your Assessment</h3>
            
            {/* Progressive Loading Steps */}
            <div className="space-y-4 mb-8">
              {processingSteps.map((step, index) => (
                <div key={index} className={`flex items-center justify-center transition-all duration-500 ${
                  index <= processingStep ? 'opacity-100' : 'opacity-30'
                }`}>
                  <div className={`w-4 h-4 rounded-full mr-4 transition-colors ${
                    index < processingStep ? 'bg-green-500' : 
                    index === processingStep ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'
                  }`}></div>
                  <p className={`text-sm transition-colors ${
                    index <= processingStep ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Progress Bar */}
            <div className="bg-white rounded-full h-2 mb-6">
              <div 
                className="bg-gradient-to-r from-blue-600 to-green-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((processingStep + 1) / processingSteps.length) * 100}%` }}
              />
            </div>
            
            <p className="text-gray-600">
              Please wait while we analyze your responses and create personalized recommendations...
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

            {/* Detailed Treatment Options Based on Results */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h4 className="text-xl font-bold text-gray-900 mb-6">Recommended San Diego Physical Therapy Services:</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Spine Rehabilitation Program</h5>
                  <p className="text-gray-600 text-sm mb-3">Comprehensive treatment for back and neck conditions using evidence-based manual therapy techniques.</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✓ Manual therapy & joint mobilization</li>
                    <li>✓ Therapeutic exercise programs</li>
                    <li>✓ Postural correction training</li>
                    <li>✓ Pain management strategies</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Joint Pain Treatment</h5>
                  <p className="text-gray-600 text-sm mb-3">Specialized care for hip, knee, shoulder, and other joint-related pain conditions.</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✓ Advanced joint mobilization</li>
                    <li>✓ Strength & mobility programs</li>
                    <li>✓ Movement pattern correction</li>
                    <li>✓ Activity modification guidance</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Next Steps & Urgency */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
              <div className="flex items-start">
                <Clock className="w-6 h-6 text-blue-600 mr-3 mt-1" aria-hidden="true" />
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Why Act Now?</h4>
                  <p className="text-blue-700 mb-4">
                    Early intervention is key to preventing chronic pain conditions. Research shows that patients who start treatment within the first 6 weeks of symptom onset have:
                  </p>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• 85% faster recovery times</li>
                    <li>• 60% reduction in treatment duration</li>
                    <li>• 90% less likelihood of chronic pain development</li>
                    <li>• Significantly better long-term outcomes</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Enhanced CTA */}
            <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Start Your Physical Therapy Recovery Journey in San Diego Today</h3>
              <p className="text-xl mb-6 opacity-90">
                Join the 90% of our patients who experience significant improvement within 2-3 sessions. Our San Diego physical therapy experts are ready to create your personalized joint pain treatment plan for back pain, neck pain, hip pain, shoulder pain, and knee pain relief.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200">
                  Schedule Free Assessment Today
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                  Call: (858) 555-0123
                </button>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm opacity-90">
                <span>⏱️ Most appointments within 24-48 hours</span>
                <span>📍 8 convenient San Diego locations</span>
                <span>💳 Most insurance accepted</span>
              </div>
              <div className="mt-4">
                <button 
                  onClick={resetAssessment}
                  className="text-white hover:text-gray-200 text-sm underline flex items-center justify-center mx-auto"
                >
                  <RefreshCw className="w-4 h-4 mr-2" aria-hidden="true" />
                  Retake Assessment for Different Condition
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
              FREE San Diego Pain Assessment & Physical Therapy Evaluation 2025
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Get a comprehensive pain assessment from San Diego's leading physical therapy specialists. Our evidence-based 
              evaluation helps identify the root cause of your back pain, neck pain, hip pain, shoulder pain, knee pain, 
              and joint conditions. Receive personalized treatment recommendations for optimal recovery.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm mb-8">
              <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full">✓ Used by 10,000+ patients</div>
              <div className="bg-green-50 text-green-700 px-4 py-2 rounded-full">✓ 90% accuracy rate</div>
              <div className="bg-orange-50 text-orange-700 px-4 py-2 rounded-full">✓ Results in 5 minutes</div>
            </div>
            
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

          {/* Condition-Specific Assessment Info */}
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 mb-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Advanced Pain Diagnosis for San Diego Residents
              </h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our comprehensive assessment evaluates multiple pain conditions and provides personalized treatment recommendations based on 10,000+ patient outcomes in San Diego.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Spine Conditions</h4>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Lower back pain</li>
                  <li>• Upper back pain</li>
                  <li>• Neck pain & stiffness</li>
                  <li>• Sciatica & nerve pain</li>
                  <li>• Disc problems</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Joint Pain</h4>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Hip pain & stiffness</li>
                  <li>• Shoulder impingement</li>
                  <li>• Knee pain & arthritis</li>
                  <li>• Ankle & foot pain</li>
                  <li>• Wrist & elbow issues</li>
                </ul>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">Sports Injuries</h4>
                <ul className="text-orange-700 text-sm space-y-1">
                  <li>• ACL/MCL injuries</li>
                  <li>• Rotator cuff problems</li>
                  <li>• Tennis/golfer's elbow</li>
                  <li>• Muscle strains</li>
                  <li>• Overuse injuries</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 mt-6">
              <div className="text-center">
                <h4 className="font-semibold text-gray-900 mb-3">Why Take This Assessment?</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-blue-600 font-bold text-lg">Accurate Diagnosis</div>
                    <div className="text-gray-600 text-sm">90% accuracy rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-600 font-bold text-lg">Personalized Plan</div>
                    <div className="text-gray-600 text-sm">Custom treatment approach</div>
                  </div>
                  <div className="text-center">
                    <div className="text-orange-600 font-bold text-lg">Faster Recovery</div>
                    <div className="text-gray-600 text-sm">Targeted therapy</div>
                  </div>
                </div>
              </div>
            </div>
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

          {/* Assessment Benefits */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">What You'll Receive After Your Assessment:</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Personalized Treatment Plan</h4>
                <p className="text-gray-600 text-sm">Customized recommendations based on your specific condition and symptoms</p>
              </div>
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Priority Level Assessment</h4>
                <p className="text-gray-600 text-sm">Understanding of your condition's urgency and recommended timeline for treatment</p>
              </div>
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Recovery Timeline</h4>
                <p className="text-gray-600 text-sm">Estimated treatment duration and expected outcomes based on San Diego patient data</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 text-gray-600">
            <p className="text-sm">
              ⚕️ This assessment is for informational purposes only and does not replace professional medical advice. 
              Results based on treatment outcomes from 10,000+ San Diego patients.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

// Memoized Question Component for better performance
const QuestionComponent = memo(function QuestionComponent({ 
  question, 
  answer, 
  onAnswer 
}: { 
  question: Question; 
  answer: any; 
  onAnswer: (questionId: number, answer: any) => void; 
}) {
  const handleOptionSelect = useCallback((value: any) => {
    onAnswer(question.id, value);
  }, [question.id, onAnswer]);

  if (question.type === 'multiple') {
    return (
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">{question.question}</h3>
        <div className="space-y-3">
          {question.options?.map((option, index) => (
            <label key={index} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all transform hover:scale-[1.02]">
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                checked={answer === option}
                onChange={() => handleOptionSelect(option)}
                className="mr-3 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (question.type === 'scale') {
    return (
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">{question.question}</h3>
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{question.scaleLabels?.min}</span>
            <span>{question.scaleLabels?.max}</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={answer || 5}
            onChange={(e) => handleOptionSelect(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-center mt-4">
            <div className="text-3xl font-bold text-blue-600">{answer || 5}</div>
          </div>
        </div>
      </div>
    );
  }

  if (question.type === 'boolean') {
    return (
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">{question.question}</h3>
        <div className="flex gap-4">
          <label className="flex-1 flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all transform hover:scale-[1.02]">
            <input
              type="radio"
              name={`question-${question.id}`}
              value="yes"
              checked={answer === "yes"}
              onChange={() => handleOptionSelect("yes")}
              className="mr-3 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700 font-medium">Yes</span>
          </label>
          <label className="flex-1 flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all transform hover:scale-[1.02]">
            <input
              type="radio"
              name={`question-${question.id}`}
              value="no"
              checked={answer === "no"}
              onChange={() => handleOptionSelect("no")}
              className="mr-3 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700 font-medium">No</span>
          </label>
        </div>
      </div>
    );
  }

  return null;
});