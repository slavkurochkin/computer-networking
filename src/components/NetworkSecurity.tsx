import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Shield, Lock, AlertTriangle, Eye, Bug, Zap, CheckCircle, Wifi, Radio, Key, Settings } from 'lucide-react';
import React from 'react';

const threats = [
  {
    name: 'Malware',
    description: 'Malicious software including viruses, worms, trojans',
    severity: 'High',
    impact: 'Data theft, system damage, performance degradation',
    prevention: ['Antivirus software', 'Regular updates', 'User education'],
    icon: Bug
  },
  {
    name: 'Phishing',
    description: 'Fraudulent attempts to obtain sensitive information',
    severity: 'High',
    impact: 'Identity theft, credential compromise, financial loss',
    prevention: ['Email filtering', 'User training', 'Multi-factor authentication'],
    icon: Eye
  },
  {
    name: 'DDoS Attack',
    description: 'Distributed Denial of Service attacks',
    severity: 'Medium',
    impact: 'Service unavailability, performance degradation',
    prevention: ['DDoS protection services', 'Load balancing', 'Rate limiting'],
    icon: Zap
  },
  {
    name: 'Man-in-the-Middle',
    description: 'Intercepting communications between two parties',
    severity: 'High',
    impact: 'Data interception, credential theft, session hijacking',
    prevention: ['Encryption (HTTPS/TLS)', 'VPN usage', 'Certificate validation'],
    icon: AlertTriangle
  }
];

const securityLayers = [
  {
    layer: 'Physical Security',
    description: 'Physical access controls',
    examples: ['Locked server rooms', 'Security cameras', 'Badge access'],
    importance: 'Foundation of security'
  },
  {
    layer: 'Network Security',
    description: 'Network-level protections',
    examples: ['Firewalls', 'IDS/IPS', 'Network segmentation'],
    importance: 'Traffic filtering and monitoring'
  },
  {
    layer: 'Application Security',
    description: 'Application-level protections',
    examples: ['Input validation', 'Secure coding', 'WAF'],
    importance: 'Protect applications from attacks'
  },
  {
    layer: 'Data Security',
    description: 'Data protection measures',
    examples: ['Encryption', 'Access controls', 'Data classification'],
    importance: 'Protect sensitive information'
  }
];

const securityTools = [
  {
    tool: 'Firewall',
    purpose: 'Network traffic filtering',
    type: 'Preventive',
    placement: 'Network perimeter',
    effectiveness: 85
  },
  {
    tool: 'Antivirus',
    purpose: 'Malware detection and removal',
    type: 'Preventive/Detective',
    placement: 'Endpoints',
    effectiveness: 80
  },
  {
    tool: 'IDS/IPS',
    purpose: 'Intrusion detection and prevention',
    type: 'Detective/Preventive',
    placement: 'Network/Host',
    effectiveness: 75
  },
  {
    tool: 'VPN',
    purpose: 'Secure remote access',
    type: 'Preventive',
    placement: 'Network tunnel',
    effectiveness: 90
  },
  {
    tool: 'WAF',
    purpose: 'Web application protection',
    type: 'Preventive',
    placement: 'Application layer',
    effectiveness: 70
  }
];

const encryptionAlgorithms = [
  {
    name: 'AES',
    type: 'Symmetric',
    keySize: '128/192/256 bits',
    strength: 'Very High',
    usage: 'Data encryption, VPN, Wi-Fi',
    performance: 'Fast'
  },
  {
    name: 'RSA',
    type: 'Asymmetric',
    keySize: '1024/2048/4096 bits',
    strength: 'High',
    usage: 'Key exchange, digital signatures',
    performance: 'Slow'
  },
  {
    name: 'SHA-256',
    type: 'Hash',
    keySize: '256 bits',
    strength: 'Very High',
    usage: 'Data integrity, passwords',
    performance: 'Fast'
  },
  {
    name: 'Elliptic Curve',
    type: 'Asymmetric',
    keySize: '256/384/521 bits',
    strength: 'Very High',
    usage: 'Mobile devices, IoT',
    performance: 'Moderate'
  }
];

// Wireless Security Data
const wirelessSecurityProtocols = [
  {
    protocol: 'WPA3',
    year: '2018',
    encryption: 'AES-256',
    authentication: 'SAE (Simultaneous Authentication of Equals)',
    keyManagement: 'Personal/Enterprise',
    strength: 'Very High',
    vulnerabilities: ['None known currently'],
    features: ['Forward secrecy', 'Improved password-based authentication', 'Protection against dictionary attacks'],
    status: 'Current standard'
  },
  {
    protocol: 'WPA2',
    year: '2004',
    encryption: 'AES-128',
    authentication: '4-way handshake',
    keyManagement: 'PSK/Enterprise',
    strength: 'High',
    vulnerabilities: ['KRACK attack', 'Deauthentication attacks', 'Weak passwords'],
    features: ['Strong encryption', 'Widely supported', 'Enterprise authentication'],
    status: 'Legacy but still common'
  },
  {
    protocol: 'WPA',
    year: '2003',
    encryption: 'TKIP',
    authentication: '4-way handshake',
    keyManagement: 'PSK/Enterprise',
    strength: 'Medium',
    vulnerabilities: ['TKIP vulnerabilities', 'Beck-Tews attack', 'Key recovery attacks'],
    features: ['Better than WEP', 'Backward compatibility'],
    status: 'Deprecated'
  },
  {
    protocol: 'WEP',
    year: '1997',
    encryption: 'RC4',
    authentication: 'Shared key',
    keyManagement: 'Static keys',
    strength: 'Very Low',
    vulnerabilities: ['Easily crackable', 'Weak IV', 'Statistical attacks'],
    features: ['Basic encryption', 'Legacy support'],
    status: 'Obsolete - Do not use'
  }
];

const wirelessAttacks = [
  {
    attack: 'Evil Twin',
    description: 'Rogue access point mimicking legitimate network',
    method: 'Creates fake AP with same SSID as legitimate network',
    impact: 'Credential theft, man-in-the-middle attacks, data interception',
    prevention: ['Certificate validation', 'VPN usage', 'Network verification'],
    difficulty: 'Easy',
    detection: 'Network monitoring, unusual signal patterns'
  },
  {
    attack: 'WPS PIN Attack',
    description: 'Exploiting WPS PIN vulnerability to gain network access',
    method: 'Brute force attack on 8-digit WPS PIN',
    impact: 'Full network access, password recovery',
    prevention: ['Disable WPS', 'Use WPA3', 'Strong passwords'],
    difficulty: 'Easy',
    detection: 'Multiple WPS authentication attempts'
  },
  {
    attack: 'Deauthentication Attack',
    description: 'Forcing devices to disconnect from network',
    method: 'Sending deauth frames to disrupt connections',
    impact: 'Service disruption, force reconnection to rogue AP',
    prevention: ['802.11w (PMF)', 'WPA3', 'Network monitoring'],
    difficulty: 'Easy',
    detection: 'Unusual disconnection patterns, frame analysis'
  },
  {
    attack: 'KRACK Attack',
    description: 'Key Reinstallation Attack against WPA2',
    method: 'Exploiting 4-way handshake to reinstall keys',
    impact: 'Traffic decryption, packet injection',
    prevention: ['Update devices', 'Use WPA3', 'VPN'],
    difficulty: 'Medium',
    detection: 'Traffic analysis, protocol monitoring'
  },
  {
    attack: 'Packet Sniffing',
    description: 'Intercepting and analyzing wireless traffic',
    method: 'Monitor mode capture of wireless frames',
    impact: 'Data exposure, credential harvesting, traffic analysis',
    prevention: ['Strong encryption', 'HTTPS/TLS', 'VPN'],
    difficulty: 'Easy',
    detection: 'Unusual device behavior, network monitoring'
  },
  {
    attack: 'Bluetooth Attacks',
    description: 'Various attacks targeting Bluetooth connections',
    method: 'Bluejacking, bluesnarfing, bluetooth hijacking',
    impact: 'Device access, data theft, service disruption',
    prevention: ['Disable when unused', 'Latest firmware', 'Pairing security'],
    difficulty: 'Medium',
    detection: 'Bluetooth monitoring, device logs'
  }
];

const wirelessBestPractices = [
  {
    category: 'Network Configuration',
    practices: [
      'Use WPA3 security protocol',
      'Disable WPS functionality',
      'Change default administrator credentials',
      'Use strong, unique network passwords',
      'Hide network SSID if appropriate',
      'Enable MAC address filtering for critical networks',
      'Regular firmware updates',
      'Separate guest networks'
    ]
  },
  {
    category: 'Access Control',
    practices: [
      'Implement 802.1X authentication for enterprise',
      'Use certificate-based authentication',
      'Enable Protected Management Frames (PMF)',
      'Implement network access control (NAC)',
      'Regular access review and cleanup',
      'Time-based access restrictions',
      'Device registration and approval',
      'Role-based network access'
    ]
  },
  {
    category: 'Monitoring & Detection',
    practices: [
      'Wireless intrusion detection systems (WIDS)',
      'Regular security assessments',
      'Monitor for rogue access points',
      'Traffic analysis and anomaly detection',
      'Log wireless authentication events',
      'Signal strength monitoring',
      'Device behavior analysis',
      'Automated threat response'
    ]
  },
  {
    category: 'Client Security',
    practices: [
      'Always verify network certificates',
      'Use VPN for sensitive communications',
      'Keep device wireless drivers updated',
      'Disable auto-connect to open networks',
      'Use strong device passwords/PINs',
      'Enable device encryption',
      'Regular security training for users',
      'Implement mobile device management (MDM)'
    ]
  }
];

function SecurityAssessment() {
  const [assessmentResults, setAssessmentResults] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const questions = [
    {
      question: "Does your network have a firewall?",
      weight: 20,
      options: ["No firewall", "Basic firewall", "Advanced firewall with rules", "Next-gen firewall with DPI"]
    },
    {
      question: "How often are security updates applied?",
      weight: 15,
      options: ["Never/Rarely", "Monthly", "Weekly", "Immediately when available"]
    },
    {
      question: "Do users receive security training?",
      weight: 15,
      options: ["No training", "Infrequent training", "Annual training", "Regular ongoing training"]
    },
    {
      question: "Is network traffic encrypted?",
      weight: 20,
      options: ["No encryption", "Some traffic encrypted", "Most traffic encrypted", "All traffic encrypted"]
    },
    {
      question: "Are there access controls in place?",
      weight: 15,
      options: ["No controls", "Basic password protection", "Role-based access", "Multi-factor authentication"]
    },
    {
      question: "Is network activity monitored?",
      weight: 15,
      options: ["No monitoring", "Basic logging", "Active monitoring", "24/7 SOC monitoring"]
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (finalAnswers: number[]) => {
    let totalScore = 0;
    let maxScore = 0;

    questions.forEach((question, index) => {
      const answer = finalAnswers[index] || 0;
      totalScore += (answer * question.weight);
      maxScore += (3 * question.weight); // 3 is max option index
    });

    const percentage = Math.round((totalScore / maxScore) * 100);
    let level = 'Poor';
    let color = 'text-red-600';
    let recommendations = [];

    if (percentage >= 80) {
      level = 'Excellent';
      color = 'text-green-600';
      recommendations = ['Maintain current security posture', 'Regular security audits', 'Stay updated with latest threats'];
    } else if (percentage >= 60) {
      level = 'Good';
      color = 'text-blue-600';
      recommendations = ['Improve network monitoring', 'Enhance user training', 'Consider additional security tools'];
    } else if (percentage >= 40) {
      level = 'Fair';
      color = 'text-yellow-600';
      recommendations = ['Implement proper firewalls', 'Regular security updates', 'User security training'];
    } else {
      level = 'Poor';
      color = 'text-red-600';
      recommendations = ['Immediate security assessment needed', 'Implement basic security controls', 'Develop security policy'];
    }

    setAssessmentResults({
      score: percentage,
      level,
      color,
      recommendations
    });
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setAssessmentResults(null);
  };

  if (assessmentResults) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Security Assessment Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className={`text-4xl font-bold ${assessmentResults.color}`}>
              {assessmentResults.score}%
            </div>
            <div className={`text-xl ${assessmentResults.color}`}>
              {assessmentResults.level}
            </div>
            <Progress value={assessmentResults.score} className="mt-4" />
          </div>

          <div>
            <h4 className="font-medium mb-2">Recommendations:</h4>
            <ul className="space-y-1">
              {assessmentResults.recommendations.map((rec: string, index: number) => (
                <li key={index} className="text-sm flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>

          <Button onClick={resetAssessment} className="w-full">
            Take Assessment Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Network Security Assessment
        </CardTitle>
        <CardDescription>
          Answer questions to assess your network security posture
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(((currentQuestion) / questions.length) * 100)}% Complete</span>
        </div>
        
        <Progress value={(currentQuestion / questions.length) * 100} />

        <div className="space-y-4">
          <h3 className="font-medium">{questions[currentQuestion].question}</h3>
          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start text-left h-auto py-3 px-4"
                onClick={() => handleAnswer(index)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function NetworkSecurity() {
  const [selectedThreat, setSelectedThreat] = useState(threats[0]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Network Security Fundamentals
          </CardTitle>
          <CardDescription>
            Learn about network threats, defenses, and best practices
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="threats" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="threats">Threats</TabsTrigger>
          <TabsTrigger value="layers">Security Layers</TabsTrigger>
          <TabsTrigger value="tools">Security Tools</TabsTrigger>
          <TabsTrigger value="encryption">Encryption</TabsTrigger>
          <TabsTrigger value="wireless">Wireless Security</TabsTrigger>
          <TabsTrigger value="assessment">Assessment</TabsTrigger>
        </TabsList>

        <TabsContent value="threats" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Common Network Threats</CardTitle>
                <CardDescription>Click on a threat to learn more</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {threats.map((threat) => {
                    const Icon = threat.icon;
                    return (
                      <Button
                        key={threat.name}
                        variant={selectedThreat.name === threat.name ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => setSelectedThreat(threat)}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {threat.name}
                        <Badge 
                          variant={threat.severity === 'High' ? 'destructive' : 'secondary'}
                          className="ml-auto"
                        >
                          {threat.severity}
                        </Badge>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {React.createElement(selectedThreat.icon, { className: "w-5 h-5" })}
                  {selectedThreat.name}
                </CardTitle>
                <CardDescription>{selectedThreat.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm mb-1">Potential Impact:</h4>
                  <p className="text-sm text-muted-foreground">{selectedThreat.impact}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-2">Prevention Methods:</h4>
                  <ul className="text-sm space-y-1">
                    {selectedThreat.prevention.map((method, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        {method}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="layers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Defense in Depth Strategy</CardTitle>
              <CardDescription>Multiple layers of security controls</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityLayers.map((layer, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <h3 className="font-medium">{layer.layer}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{layer.description}</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-sm mb-1">Examples:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {layer.examples.map((example, exIndex) => (
                            <li key={exIndex}>• {example}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-1">Importance:</h4>
                        <p className="text-sm text-muted-foreground">{layer.importance}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Tools Comparison</CardTitle>
              <CardDescription>Common network security tools and their effectiveness</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tool</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Placement</TableHead>
                      <TableHead>Effectiveness</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {securityTools.map((tool) => (
                      <TableRow key={tool.tool}>
                        <TableCell className="font-medium">{tool.tool}</TableCell>
                        <TableCell>{tool.purpose}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{tool.type}</Badge>
                        </TableCell>
                        <TableCell>{tool.placement}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{ width: `${tool.effectiveness}%` }}
                              ></div>
                            </div>
                            <span className="text-sm">{tool.effectiveness}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="encryption" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Encryption Algorithms
              </CardTitle>
              <CardDescription>Common encryption methods used in networking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {encryptionAlgorithms.map((algo) => (
                  <Card key={algo.name}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {algo.name}
                        <Badge variant={algo.type === 'Symmetric' ? 'default' : algo.type === 'Asymmetric' ? 'secondary' : 'outline'}>
                          {algo.type}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">Key Size:</span>
                        <code className="bg-gray-100 px-2 py-1 rounded text-xs">{algo.keySize}</code>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Strength:</span>
                        <Badge variant={algo.strength === 'Very High' ? 'default' : 'secondary'}>
                          {algo.strength}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Performance:</span>
                        <Badge variant={algo.performance === 'Fast' ? 'default' : 'secondary'}>
                          {algo.performance}
                        </Badge>
                      </div>
                      <div>
                        <span className="font-medium">Common Usage:</span>
                        <p className="text-muted-foreground mt-1">{algo.usage}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wireless" className="space-y-6">
          <WirelessSecurity />
        </TabsContent>

        <TabsContent value="assessment">
          <SecurityAssessment />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Wireless Security Component
function WirelessSecurity() {
  const [selectedProtocol, setSelectedProtocol] = useState(wirelessSecurityProtocols[0]);
  const [selectedAttack, setSelectedAttack] = useState(wirelessAttacks[0]);

  return (
    <div className="space-y-6">
      {/* Wireless Security Protocols */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wifi className="w-5 h-5 text-slate-700" />
            Wireless Security Protocols
          </CardTitle>
          <CardDescription>Evolution of WiFi security standards and their capabilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-4 gap-4 mb-6">
            {wirelessSecurityProtocols.map((protocol, index) => (
              <Card 
                key={index}
                className={`cursor-pointer transition-all border-slate-200 hover:border-slate-300 ${
                  selectedProtocol.protocol === protocol.protocol ? 'ring-2 ring-blue-500 border-blue-300' : ''
                }`}
                onClick={() => setSelectedProtocol(protocol)}
              >
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 ${
                    protocol.strength === 'Very High' ? 'bg-green-100' :
                    protocol.strength === 'High' ? 'bg-blue-100' :
                    protocol.strength === 'Medium' ? 'bg-yellow-100' : 'bg-red-100'
                  }`}>
                    <Shield className={`w-6 h-6 ${
                      protocol.strength === 'Very High' ? 'text-green-600' :
                      protocol.strength === 'High' ? 'text-blue-600' :
                      protocol.strength === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                    }`} />
                  </div>
                  <h3 className="font-medium text-sm text-slate-900 mb-1">{protocol.protocol}</h3>
                  <p className="text-xs text-slate-600">{protocol.year}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedProtocol && (
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {selectedProtocol.protocol}
                  <Badge variant={
                    selectedProtocol.strength === 'Very High' ? 'default' :
                    selectedProtocol.strength === 'High' ? 'secondary' :
                    selectedProtocol.strength === 'Medium' ? 'outline' : 'destructive'
                  }>
                    {selectedProtocol.strength}
                  </Badge>
                </CardTitle>
                <CardDescription>Released in {selectedProtocol.year} - {selectedProtocol.status}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-3">Technical Specifications</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                          <span className="text-slate-600">Encryption:</span>
                          <span className="font-medium">{selectedProtocol.encryption}</span>
                        </div>
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                          <span className="text-slate-600">Authentication:</span>
                          <span className="font-medium">{selectedProtocol.authentication}</span>
                        </div>
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                          <span className="text-slate-600">Key Management:</span>
                          <span className="font-medium">{selectedProtocol.keyManagement}</span>
                        </div>
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                          <span className="text-slate-600">Security Strength:</span>
                          <Badge variant={
                            selectedProtocol.strength === 'Very High' ? 'default' :
                            selectedProtocol.strength === 'High' ? 'secondary' :
                            selectedProtocol.strength === 'Medium' ? 'outline' : 'destructive'
                          }>
                            {selectedProtocol.strength}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-slate-900 mb-3">Key Features</h4>
                      <ul className="space-y-2">
                        {selectedProtocol.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-3">Known Vulnerabilities</h4>
                      <div className="space-y-2">
                        {selectedProtocol.vulnerabilities.map((vulnerability, index) => (
                          <div key={index} className={`p-2 rounded text-sm border ${
                            vulnerability === 'None known currently' 
                              ? 'bg-green-50 border-green-200 text-green-800'
                              : 'bg-red-50 border-red-200 text-red-800'
                          }`}>
                            {vulnerability}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg border ${
                      selectedProtocol.strength === 'Very High' ? 'bg-green-50 border-green-200' :
                      selectedProtocol.strength === 'High' ? 'bg-blue-50 border-blue-200' :
                      selectedProtocol.strength === 'Medium' ? 'bg-yellow-50 border-yellow-200' : 
                      'bg-red-50 border-red-200'
                    }`}>
                      <h5 className={`font-medium text-sm mb-2 ${
                        selectedProtocol.strength === 'Very High' ? 'text-green-800' :
                        selectedProtocol.strength === 'High' ? 'text-blue-800' :
                        selectedProtocol.strength === 'Medium' ? 'text-yellow-800' : 
                        'text-red-800'
                      }`}>Recommendation</h5>
                      <div className={`text-xs space-y-1 ${
                        selectedProtocol.strength === 'Very High' ? 'text-green-700' :
                        selectedProtocol.strength === 'High' ? 'text-blue-700' :  
                        selectedProtocol.strength === 'Medium' ? 'text-yellow-700' : 
                        'text-red-700'
                      }`}>
                        {selectedProtocol.protocol === 'WPA3' && (
                          <>
                            <p>• Use for all new wireless deployments</p>
                            <p>• Provides the strongest security available</p>
                            <p>• Resistant to current attack methods</p>
                          </>
                        )}
                        {selectedProtocol.protocol === 'WPA2' && (
                          <>
                            <p>• Still acceptable for most environments</p>
                            <p>• Ensure strong passwords are used</p>
                            <p>• Migrate to WPA3 when possible</p>
                          </>
                        )}
                        {selectedProtocol.protocol === 'WPA' && (
                          <>
                            <p>• Upgrade to WPA2 or WPA3 immediately</p>
                            <p>• Only use if WPA2/3 unavailable</p>
                            <p>• Monitor for attacks actively</p>
                          </>
                        )}
                        {selectedProtocol.protocol === 'WEP' && (
                          <>
                            <p>• DO NOT USE - Completely insecure</p>
                            <p>• Can be cracked in minutes</p>
                            <p>• Provides no real security</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Wireless Attacks */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-slate-700" />
            Common Wireless Attacks
          </CardTitle>
          <CardDescription>Understanding wireless network attack vectors and mitigation strategies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
            {wirelessAttacks.map((attack, index) => (
              <Card 
                key={index}
                className={`cursor-pointer transition-all border-slate-200 hover:border-slate-300 ${
                  selectedAttack.attack === attack.attack ? 'ring-2 ring-red-500 border-red-300' : ''
                }`}
                onClick={() => setSelectedAttack(attack)}
              >
                <CardContent className="p-3 text-center">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2 ${
                    attack.difficulty === 'Easy' ? 'bg-red-100' : 'bg-orange-100'
                  }`}>
                    <AlertTriangle className={`w-5 h-5 ${
                      attack.difficulty === 'Easy' ? 'text-red-600' : 'text-orange-600'
                    }`} />
                  </div>
                  <h3 className="font-medium text-xs text-slate-900 mb-1">{attack.attack}</h3>
                  <p className="text-xs text-slate-600">{attack.difficulty}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedAttack && (
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {selectedAttack.attack}
                  <Badge variant={selectedAttack.difficulty === 'Easy' ? 'destructive' : 'outline'}>
                    {selectedAttack.difficulty}
                  </Badge>
                </CardTitle>
                <CardDescription>{selectedAttack.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-3">Attack Method</h4>
                      <p className="text-sm text-slate-600 p-3 bg-slate-50 rounded-lg">{selectedAttack.method}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-slate-900 mb-3">Potential Impact</h4>
                      <p className="text-sm text-red-700 p-3 bg-red-50 border border-red-200 rounded-lg">{selectedAttack.impact}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-slate-900 mb-3">Detection Methods</h4>
                      <p className="text-sm text-blue-700 p-3 bg-blue-50 border border-blue-200 rounded-lg">{selectedAttack.detection}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-3">Prevention Strategies</h4>
                      <ul className="space-y-2">
                        {selectedAttack.prevention.map((prevention, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-green-700 bg-green-50 p-2 rounded border border-green-200">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            {prevention}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Wireless Security Best Practices */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-slate-700" />
            Wireless Security Best Practices
          </CardTitle>
          <CardDescription>Comprehensive guidelines for securing wireless networks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-6">
            {wirelessBestPractices.map((category, index) => (
              <Card key={index} className="border-slate-200">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      {category.category === 'Network Configuration' && <Settings className="w-4 h-4 text-green-600" />}
                      {category.category === 'Access Control' && <Key className="w-4 h-4 text-green-600" />}
                      {category.category === 'Monitoring & Detection' && <Eye className="w-4 h-4 text-green-600" />}
                      {category.category === 'Client Security' && <Shield className="w-4 h-4 text-green-600" />}
                    </div>
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.practices.map((practice, practiceIndex) => (
                      <li key={practiceIndex} className="flex items-start gap-2 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        {practice}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}