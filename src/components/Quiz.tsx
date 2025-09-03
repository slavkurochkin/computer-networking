import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { CheckCircle, XCircle, HelpCircle, Trophy, RotateCcw } from 'lucide-react';

const quizQuestions = [
  {
    question: "What does the OSI model stand for?",
    options: [
      "Open Systems Interconnection",
      "Operating System Interface", 
      "Optical Signal Integration",
      "Online Service Implementation"
    ],
    correct: 0,
    explanation: "OSI stands for Open Systems Interconnection, a conceptual framework for understanding network communications."
  },
  {
    question: "Which layer of the OSI model is responsible for routing?",
    options: [
      "Data Link Layer",
      "Network Layer",
      "Transport Layer",
      "Session Layer"
    ],
    correct: 1,
    explanation: "The Network Layer (Layer 3) is responsible for routing packets between different networks using IP addresses."
  },
  {
    question: "What is the main difference between a router and a switch?",
    options: [
      "Routers work at Layer 2, switches at Layer 3",
      "Routers route between networks, switches forward within networks",
      "Routers use MAC addresses, switches use IP addresses",
      "There is no difference between them"
    ],
    correct: 1,
    explanation: "Routers operate at Layer 3 and route packets between different networks, while switches operate at Layer 2 and forward frames within the same network segment."
  },
  {
    question: "What does NAT stand for and what is its primary purpose?",
    options: [
      "Network Address Translation - converts private IPs to public IPs",
      "Network Access Table - stores routing information",
      "Network Authentication Token - provides security",
      "Network Allocation Type - defines IP classes"
    ],
    correct: 0,
    explanation: "NAT (Network Address Translation) allows devices with private IP addresses to communicate with the internet by translating private IPs to public IPs."
  },
  {
    question: "In a TCP header, what does the SYN flag indicate?",
    options: [
      "Data synchronization is complete",
      "Request to establish a connection",
      "Connection termination request",
      "Error in data transmission"
    ],
    correct: 1,
    explanation: "The SYN (Synchronize) flag is used to initiate a TCP connection by synchronizing sequence numbers between sender and receiver."
  },
  {
    question: "What is the correct order of the DHCP process?",
    options: [
      "Offer, Discover, Request, Acknowledge",
      "Discover, Offer, Request, Acknowledge",
      "Request, Discover, Offer, Acknowledge",
      "Discover, Request, Offer, Acknowledge"
    ],
    correct: 1,
    explanation: "The DHCP process follows DORA: Discover (client finds servers), Offer (server offers configuration), Request (client requests specific offer), Acknowledge (server confirms lease)."
  },
  {
    question: "What type of DNS record maps a domain name to an IPv4 address?",
    options: [
      "AAAA record",
      "CNAME record",
      "A record",
      "MX record"
    ],
    correct: 2,
    explanation: "An A record (Address record) maps a domain name to an IPv4 address. AAAA records are used for IPv6 addresses."
  },
  {
    question: "How does a switch learn MAC addresses?",
    options: [
      "By broadcasting ARP requests",
      "By examining source MAC addresses of incoming frames",
      "By downloading from a central server",
      "By using DHCP protocol"
    ],
    correct: 1,
    explanation: "Switches learn MAC addresses by examining the source MAC address field of incoming frames and associating them with the port they arrived on."
  },
  {
    question: "What field in an IP header prevents infinite routing loops?",
    options: [
      "Fragment Offset",
      "Identification",
      "Time to Live (TTL)",
      "Header Checksum"
    ],
    correct: 2,
    explanation: "The TTL (Time to Live) field is decremented by each router. When it reaches zero, the packet is discarded, preventing infinite routing loops."
  },
  {
    question: "What is the main difference between a forward proxy and a reverse proxy?",
    options: [
      "Forward proxy protects servers, reverse proxy protects clients",
      "Forward proxy protects clients, reverse proxy protects servers",
      "Both protect the same thing but use different protocols",
      "There is no functional difference between them"
    ],
    correct: 1,
    explanation: "A forward proxy sits between clients and the internet to protect/control client access, while a reverse proxy sits between the internet and servers to protect/optimize server performance."
  },
  {
    question: "Which protocol is connectionless?",
    options: [
      "TCP",
      "HTTP",
      "UDP",
      "FTP"
    ],
    correct: 2,
    explanation: "UDP (User Datagram Protocol) is connectionless, meaning it doesn't establish a connection before sending data."
  },
  {
    question: "In domain name anatomy, what does TLD stand for?",
    options: [
      "Top Level Domain",
      "Total Link Directory",
      "Technical Layer Definition",
      "Transport Level Data"
    ],
    correct: 0,
    explanation: "TLD stands for Top Level Domain, which is the highest level in the DNS hierarchy (like .com, .org, .edu)."
  },
  {
    question: "What is the primary purpose of a VPN?",
    options: [
      "To increase internet speed",
      "To create a secure tunnel over public networks",
      "To provide DNS resolution",
      "To assign IP addresses automatically"
    ],
    correct: 1,
    explanation: "A VPN (Virtual Private Network) creates a secure, encrypted tunnel over public networks, allowing secure remote access to private networks."
  },
  {
    question: "In a TCP segment, what does the Window Size field control?",
    options: [
      "The size of the TCP header",
      "Flow control - how much data receiver can accept",
      "The number of connections allowed",
      "The timeout value for the connection"
    ],
    correct: 1,
    explanation: "The Window Size field implements flow control by telling the sender how many bytes the receiver can currently accept in its buffer."
  },
  {
    question: "What happens when a switch receives a frame with an unknown destination MAC address?",
    options: [
      "It drops the frame",
      "It sends an error message",
      "It floods the frame to all ports except the source",
      "It stores the frame for later delivery"
    ],
    correct: 2,
    explanation: "When a switch doesn't know where to send a frame (unknown unicast), it floods the frame to all ports except the one it arrived on."
  },
  {
    question: "What is the main difference between a hub and a switch?",
    options: [
      "Hubs work at Layer 3, switches at Layer 2",
      "Hubs create one collision domain, switches create separate collision domains per port",
      "Hubs use IP addresses, switches use MAC addresses",
      "There is no functional difference"
    ],
    correct: 1,
    explanation: "Hubs operate at the Physical Layer and create a single collision domain for all connected devices, while switches operate at the Data Link Layer and create separate collision domains for each port."
  },
  {
    question: "What does the first 3 bytes (24 bits) of a MAC address represent?",
    options: [
      "The device serial number",
      "The network subnet",
      "The Organizationally Unique Identifier (OUI)",
      "The device type"
    ],
    correct: 2,
    explanation: "The first 24 bits of a MAC address form the OUI (Organizationally Unique Identifier), which is assigned by IEEE to identify the manufacturer of the network interface."
  },
  {
    question: "Which cable type can support 10 Gbps over 100 meters?",
    options: [
      "Cat 5e",
      "Cat 6",
      "Cat 6a",
      "Cat 5"
    ],
    correct: 2,
    explanation: "Cat 6a (Augmented Category 6) cable can support 10 Gbps over the full 100-meter distance, while Cat 6 can only support 10 Gbps over shorter distances (up to 55 meters)."
  },
  {
    question: "In an Ethernet frame, what is the purpose of the Frame Check Sequence (FCS)?",
    options: [
      "To identify the frame type",
      "To provide error detection using CRC-32",
      "To indicate the frame priority",
      "To specify the frame destination"
    ],
    correct: 1,
    explanation: "The Frame Check Sequence (FCS) is a 4-byte field containing a CRC-32 checksum used for error detection to ensure the frame was transmitted without corruption."
  }
];

export function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(quizQuestions.length).fill(null));
  const [quizComplete, setQuizComplete] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);

      if (selectedAnswer === quizQuestions[currentQuestion].correct) {
        setScore(score + 1);
      }

      setShowResult(true);
    }
  };

  const handleContinue = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers(new Array(quizQuestions.length).fill(null));
    setQuizComplete(false);
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-blue-600';
    if (percentage >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return 'Excellent! You have a strong understanding of networking concepts.';
    if (percentage >= 80) return 'Great job! You have a good grasp of networking fundamentals.';
    if (percentage >= 70) return 'Good work! You understand most networking concepts.';
    if (percentage >= 60) return 'Not bad! You have basic knowledge but could improve.';
    if (percentage >= 50) return 'You have some understanding but need more study.';
    return 'Keep studying! Review the material and try again.';
  };

  if (quizComplete) {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Quiz Complete!
            </CardTitle>
            <CardDescription>Here are your results</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className={`text-6xl font-bold ${getScoreColor(percentage)}`}>
                {percentage}%
              </div>
              <div className="text-xl text-muted-foreground mb-2">
                {score} out of {quizQuestions.length} correct
              </div>
              <Progress value={percentage} className="w-full max-w-md mx-auto" />
              <p className="mt-4 text-muted-foreground">
                {getScoreMessage(percentage)}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Review Your Answers:</h3>
              {quizQuestions.map((question, index) => {
                const userAnswer = answers[index];
                const isCorrect = userAnswer === question.correct;
                
                return (
                  <Card key={index} className={`border-l-4 ${isCorrect ? 'border-l-green-500' : 'border-l-red-500'}`}>
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-3">
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <h4 className="font-medium mb-2">
                            Question {index + 1}: {question.question}
                          </h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-2">
                              <span>Your answer:</span>
                              <Badge variant={isCorrect ? "default" : "destructive"}>
                                {question.options[userAnswer || 0]}
                              </Badge>
                            </div>
                            {!isCorrect && (
                              <div className="flex items-center gap-2">
                                <span>Correct answer:</span>
                                <Badge variant="default">
                                  {question.options[question.correct]}
                                </Badge>
                              </div>
                            )}
                            <p className="text-muted-foreground mt-2">
                              {question.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="flex gap-2 justify-center">
              <Button onClick={resetQuiz} className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                Take Quiz Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQ = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Networking Knowledge Quiz
          </CardTitle>
          <CardDescription>
            Test your understanding of computer networking concepts
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Question {currentQuestion + 1} of {quizQuestions.length}</CardTitle>
              <CardDescription>Choose the best answer</CardDescription>
            </div>
            <Badge variant="outline">{Math.round(progress)}% Complete</Badge>
          </div>
          <Progress value={progress} className="w-full" />
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">{currentQ.question}</h3>
            
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? "default" : "outline"}
                  className="w-full justify-start text-left h-auto py-3 px-4"
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === index 
                        ? 'border-primary bg-primary text-primary-foreground' 
                        : 'border-muted-foreground'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    {option}
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {showResult && (
            <Card className={`border-l-4 ${
              selectedAnswer === currentQ.correct ? 'border-l-green-500 bg-green-50' : 'border-l-red-500 bg-red-50'
            }`}>
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  {selectedAnswer === currentQ.correct ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  )}
                  <div>
                    <h4 className="font-medium mb-2">
                      {selectedAnswer === currentQ.correct ? 'Correct!' : 'Incorrect'}
                    </h4>
                    {selectedAnswer !== currentQ.correct && (
                      <p className="text-sm mb-2">
                        The correct answer is: <strong>{currentQ.options[currentQ.correct]}</strong>
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      {currentQ.explanation}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
            </div>
            <div className="space-x-2">
              {!showResult ? (
                <Button 
                  onClick={handleNext} 
                  disabled={selectedAnswer === null}
                >
                  {selectedAnswer === null ? 'Select an Answer' : 'Submit Answer'}
                </Button>
              ) : (
                <Button onClick={handleContinue}>
                  {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'View Results'}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}