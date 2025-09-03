import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Send, Download, Zap, Pause, Play, RotateCcw, Package, ArrowRight } from 'lucide-react';

const transmissionMethods = [
  {
    id: 'simplex',
    name: 'Simplex',
    description: 'One-way communication only',
    examples: ['Radio broadcast', 'Television', 'Keyboard to computer'],
    diagram: 'A → B',
    characteristics: ['Unidirectional', 'No acknowledgment', 'Simple implementation']
  },
  {
    id: 'half-duplex',
    name: 'Half-Duplex',
    description: 'Two-way communication, but not simultaneous',
    examples: ['Walkie-talkies', 'Hub-based Ethernet', 'CB radio'],
    diagram: 'A ⇄ B (alternating)',
    characteristics: ['Bidirectional', 'Turn-based', 'Collision detection needed']
  },
  {
    id: 'full-duplex',
    name: 'Full-Duplex',
    description: 'Simultaneous two-way communication',
    examples: ['Telephone', 'Switch-based Ethernet', 'Modern networking'],
    diagram: 'A ⇆ B (simultaneous)',
    characteristics: ['Simultaneous bidirectional', 'Higher throughput', 'More complex']
  }
];

const networkingModes = [
  {
    mode: 'Unicast',
    description: 'One-to-one communication',
    example: 'Web browsing, email',
    efficiency: 'High for point-to-point',
    scalability: 'Limited for broadcasting',
    useCase: 'Direct communication between two devices'
  },
  {
    mode: 'Broadcast',
    description: 'One-to-all communication',
    example: 'ARP requests, DHCP discovery',
    efficiency: 'Low (network flooding)',
    scalability: 'Poor in large networks',
    useCase: 'Send to all devices in network segment'
  },
  {
    mode: 'Multicast',
    description: 'One-to-many communication',
    example: 'Video streaming, IPTV',
    efficiency: 'High for group communication',
    scalability: 'Good with proper routing',
    useCase: 'Deliver to specific group of interested receivers'
  },
  {
    mode: 'Anycast',
    description: 'One-to-nearest communication',
    example: 'DNS root servers, CDN',
    efficiency: 'High (nearest server)',
    scalability: 'Excellent for distributed services',
    useCase: 'Route to closest available server'
  }
];

const tcpSegmentStructure = [
  { field: 'Source Port', size: '16 bits', description: 'Sending application port number' },
  { field: 'Destination Port', size: '16 bits', description: 'Receiving application port number' },
  { field: 'Sequence Number', size: '32 bits', description: 'Position of first data byte in stream' },
  { field: 'Acknowledgment Number', size: '32 bits', description: 'Next expected sequence number' },
  { field: 'Header Length', size: '4 bits', description: 'TCP header length in 32-bit words' },
  { field: 'Reserved', size: '6 bits', description: 'Reserved for future use (must be zero)' },
  { field: 'Control Flags', size: '6 bits', description: 'URG, ACK, PSH, RST, SYN, FIN' },
  { field: 'Window Size', size: '16 bits', description: 'Flow control - bytes receiver can accept' },
  { field: 'Checksum', size: '16 bits', description: 'Error detection for header and data' },
  { field: 'Urgent Pointer', size: '16 bits', description: 'Points to urgent data if URG flag set' }
];

const ipDatagramStructure = [
  { field: 'Version', size: '4 bits', description: 'IP version (4 for IPv4, 6 for IPv6)' },
  { field: 'Header Length', size: '4 bits', description: 'IP header length in 32-bit words' },
  { field: 'Type of Service', size: '8 bits', description: 'Quality of service parameters' },
  { field: 'Total Length', size: '16 bits', description: 'Total packet size including header and data' },
  { field: 'Identification', size: '16 bits', description: 'Unique identifier for fragmented packets' },
  { field: 'Flags', size: '3 bits', description: 'Control fragmentation (Reserved, DF, MF)' },
  { field: 'Fragment Offset', size: '13 bits', description: 'Position of fragment in original datagram' },
  { field: 'Time to Live (TTL)', size: '8 bits', description: 'Maximum hops before packet is discarded' },
  { field: 'Protocol', size: '8 bits', description: 'Next layer protocol (TCP=6, UDP=17, ICMP=1)' },
  { field: 'Header Checksum', size: '16 bits', description: 'Error detection for IP header only' },
  { field: 'Source IP Address', size: '32 bits', description: 'IP address of packet sender' },
  { field: 'Destination IP Address', size: '32 bits', description: 'IP address of packet receiver' }
];

function PacketJourneySimulator() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const journeySteps = [
    { step: 'Application Layer', description: 'User clicks "Send Email" - HTTP request created', layer: 7, color: 'bg-red-100 border-red-200' },
    { step: 'Transport Layer', description: 'TCP header added - ports, sequence numbers, flags', layer: 4, color: 'bg-blue-100 border-blue-200' },
    { step: 'Network Layer', description: 'IP header added - source/destination IPs, TTL', layer: 3, color: 'bg-green-100 border-green-200' },
    { step: 'Data Link Layer', description: 'Ethernet header added - MAC addresses', layer: 2, color: 'bg-yellow-100 border-yellow-200' },
    { step: 'Physical Layer', description: 'Converted to electrical signals on wire', layer: 1, color: 'bg-purple-100 border-purple-200' },
    { step: 'Network Transit', description: 'Packet travels through routers and switches', layer: 0, color: 'bg-gray-100 border-gray-200' },
    { step: 'Destination Physical', description: 'Signals received and converted back to data', layer: 1, color: 'bg-purple-100 border-purple-200' },
    { step: 'Destination Processing', description: 'Headers removed in reverse order', layer: -1, color: 'bg-green-50 border-green-200' },
    { step: 'Application Delivery', description: 'Data delivered to destination application', layer: 7, color: 'bg-red-50 border-red-200' }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && currentStep < journeySteps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => prev + 1);
        setProgress(prev => prev + (100 / (journeySteps.length - 1)));
      }, 2000);
    } else if (currentStep >= journeySteps.length - 1) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, currentStep]);

  const resetSimulation = () => {
    setCurrentStep(0);
    setProgress(0);
    setIsRunning(false);
  };

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="w-5 h-5 text-slate-700" />
          Packet Journey Simulator
        </CardTitle>
        <CardDescription>Follow a packet through the network stack from source to destination</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-3">
          <Button 
            onClick={() => setIsRunning(!isRunning)} 
            variant={isRunning ? "secondary" : "default"}
            disabled={currentStep >= journeySteps.length - 1 && !isRunning}
            className="flex items-center gap-2"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Pause' : 'Start'} Journey
          </Button>
          <Button onClick={resetSimulation} variant="outline" className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm text-slate-600">
            <span>Progress: Step {currentStep + 1} of {journeySteps.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="w-full h-2" />
        </div>

        <div className="space-y-3">
          {journeySteps.map((step, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border transition-all duration-300 ${step.color} ${
                index === currentStep 
                  ? 'ring-2 ring-blue-500 scale-[1.02]' 
                  : index < currentStep 
                    ? 'opacity-75' 
                    : 'opacity-50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-white ${
                  index === currentStep 
                    ? 'bg-blue-500 animate-pulse' 
                    : index < currentStep 
                      ? 'bg-green-500' 
                      : 'bg-slate-400'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium text-slate-900">{step.step}</h4>
                    {step.layer > 0 && (
                      <Badge variant="outline" className="text-xs">
                        Layer {step.layer}
                      </Badge>
                    )}
                    {index === currentStep && (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-blue-600 font-medium">Processing...</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-slate-600">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function BandwidthSimulator() {
  const [bandwidth, setBandwidth] = useState(100);
  const [users, setUsers] = useState(25);
  const [dataUsage, setDataUsage] = useState<any[]>([]);

  useEffect(() => {
    const generateData = () => {
      const hours = Array.from({ length: 24 }, (_, i) => i);
      const data = hours.map(hour => {
        const baseUsage = bandwidth * 0.2; // 20% baseline
        const peakMultiplier = Math.sin((hour - 6) * Math.PI / 12) * 0.6 + 0.4; // Peak during day
        const randomVariation = Math.random() * 0.3; // Random variation
        const userLoad = (users / 100) * 0.5; // User impact
        
        const totalUsage = Math.min(
          baseUsage + (bandwidth * 0.7 * peakMultiplier * userLoad) + (bandwidth * randomVariation),
          bandwidth
        );
        
        return {
          hour: `${hour.toString().padStart(2, '0')}:00`,
          usage: Math.round(totalUsage),
          available: bandwidth - Math.round(totalUsage),
          utilization: Math.round((totalUsage / bandwidth) * 100)
        };
      });
      setDataUsage(data);
    };

    generateData();
  }, [bandwidth, users]);

  const avgUsage = Math.round(dataUsage.reduce((sum, item) => sum + item.usage, 0) / Math.max(dataUsage.length, 1));
  const avgAvailable = Math.round(dataUsage.reduce((sum, item) => sum + item.available, 0) / Math.max(dataUsage.length, 1));
  const avgUtilization = Math.round(dataUsage.reduce((sum, item) => sum + item.utilization, 0) / Math.max(dataUsage.length, 1));

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="w-5 h-5 text-slate-700" />
          Network Bandwidth Analyzer
        </CardTitle>
        <CardDescription>Simulate network usage patterns throughout the day</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="font-medium text-slate-900">Total Bandwidth</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="10"
                max="1000"
                value={bandwidth}
                onChange={(e) => setBandwidth(Number(e.target.value))}
                className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <Badge variant="outline" className="min-w-[80px] justify-center">
                {bandwidth} Mbps
              </Badge>
            </div>
          </div>
          <div className="space-y-3">
            <label className="font-medium text-slate-900">Active Users</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="1"
                max="100"
                value={users}
                onChange={(e) => setUsers(Number(e.target.value))}
                className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <Badge variant="outline" className="min-w-[80px] justify-center">
                {users} users
              </Badge>
            </div>
          </div>
        </div>

        <div className="h-80 bg-slate-50 rounded-lg p-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dataUsage}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="hour" 
                tick={{ fontSize: 12 }}
                stroke="#64748b"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="#64748b"
                label={{ value: 'Mbps', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value, name) => [
                  `${value} Mbps`, 
                  name === 'usage' ? 'Used Bandwidth' : 'Available Bandwidth'
                ]}
                labelStyle={{ color: '#334155' }}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="usage" 
                stackId="1"
                stroke="#3b82f6" 
                fill="#3b82f6" 
                fillOpacity={0.7}
                name="usage"
              />
              <Area 
                type="monotone" 
                dataKey="available" 
                stackId="1"
                stroke="#10b981" 
                fill="#10b981" 
                fillOpacity={0.7}
                name="available"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-2xl font-semibold text-blue-700">
              {avgUsage}
            </div>
            <div className="text-sm text-blue-600">Avg Used (Mbps)</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-2xl font-semibold text-green-700">
              {avgAvailable}
            </div>
            <div className="text-sm text-green-600">Avg Available (Mbps)</div>
          </div>
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
            <div className="text-2xl font-semibold text-amber-700">
              {avgUtilization}%
            </div>
            <div className="text-sm text-amber-600">Avg Utilization</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DatagramAnalyzer() {
  const [selectedFormat, setSelectedFormat] = useState('tcp');

  const renderStructure = (structure: typeof tcpSegmentStructure | typeof ipDatagramStructure, title: string) => (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="w-5 h-5 text-slate-700" />
          {title}
        </CardTitle>
        <CardDescription>
          {title.includes('TCP') ? 'Transport layer segment structure and fields' : 'Network layer datagram structure and fields'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Field</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {structure.map((field, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium text-slate-900">
                    {field.field}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono text-xs">
                      {field.size}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {field.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>TCP Segments & IP Datagrams</CardTitle>
          <CardDescription>Explore the detailed structure of network packets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button
              variant={selectedFormat === 'tcp' ? 'default' : 'outline'}
              onClick={() => setSelectedFormat('tcp')}
            >
              TCP Segment
            </Button>
            <Button
              variant={selectedFormat === 'ip' ? 'default' : 'outline'}
              onClick={() => setSelectedFormat('ip')}
            >
              IP Datagram
            </Button>
          </div>
        </CardContent>
      </Card>

      {selectedFormat === 'tcp' && renderStructure(tcpSegmentStructure, 'TCP Segment Structure')}
      {selectedFormat === 'ip' && renderStructure(ipDatagramStructure, 'IP Datagram Structure')}

      {selectedFormat === 'tcp' && (
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle>TCP Control Flags</CardTitle>
            <CardDescription>Understanding TCP connection management flags</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="border border-slate-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="default" className="text-xs">SYN</Badge>
                    <span className="font-medium text-sm">Synchronize</span>
                  </div>
                  <p className="text-sm text-slate-600">Initiates a connection, synchronizes sequence numbers</p>
                </div>
                <div className="border border-slate-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="default" className="text-xs">ACK</Badge>
                    <span className="font-medium text-sm">Acknowledgment</span>
                  </div>
                  <p className="text-sm text-slate-600">Acknowledges received data, validates connection</p>
                </div>
                <div className="border border-slate-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="default" className="text-xs">FIN</Badge>
                    <span className="font-medium text-sm">Finish</span>
                  </div>
                  <p className="text-sm text-slate-600">Requests connection termination</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="border border-slate-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="destructive" className="text-xs">RST</Badge>
                    <span className="font-medium text-sm">Reset</span>
                  </div>
                  <p className="text-sm text-slate-600">Abruptly terminates connection due to error</p>
                </div>
                <div className="border border-slate-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">PSH</Badge>
                    <span className="font-medium text-sm">Push</span>
                  </div>
                  <p className="text-sm text-slate-600">Requests immediate data delivery to application</p>
                </div>
                <div className="border border-slate-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">URG</Badge>
                    <span className="font-medium text-sm">Urgent</span>
                  </div>
                  <p className="text-sm text-slate-600">Indicates urgent data in segment</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export function DataTransmission() {
  const [selectedMethod, setSelectedMethod] = useState('simplex');

  return (
    <div className="space-y-6">
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-slate-700" />
            Data Transmission & Network Communication
          </CardTitle>
          <CardDescription>
            Understand how data flows through networks and packet structures
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="methods" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-slate-100">
          <TabsTrigger value="methods" className="data-[state=active]:bg-white">Transmission Methods</TabsTrigger>
          <TabsTrigger value="modes" className="data-[state=active]:bg-white">Communication Modes</TabsTrigger>
          <TabsTrigger value="journey" className="data-[state=active]:bg-white">Packet Journey</TabsTrigger>
          <TabsTrigger value="bandwidth" className="data-[state=active]:bg-white">Bandwidth Analysis</TabsTrigger>
          <TabsTrigger value="packets" className="data-[state=active]:bg-white">Packet Structure</TabsTrigger>
        </TabsList>

        <TabsContent value="methods" className="space-y-6 mt-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {transmissionMethods.map((method) => (
              <Card 
                key={method.id} 
                className={`cursor-pointer transition-all border-slate-200 hover:border-slate-300 ${
                  selectedMethod === method.id ? 'ring-2 ring-blue-500 border-blue-300' : ''
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {method.name}
                    <Badge variant="outline" className="font-mono text-xs">
                      {method.diagram}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{method.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Examples:</h4>
                      <ul className="space-y-1">
                        {method.examples.map((example, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Characteristics:</h4>
                      <div className="flex flex-wrap gap-1">
                        {method.characteristics.map((char, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {char}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedMethod && (
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>
                  {transmissionMethods.find(m => m.id === selectedMethod)?.name} Communication Flow
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-12">
                  <div className="text-center space-y-4">
                    <div className="text-8xl text-slate-300">
                      {selectedMethod === 'simplex' && '→'}
                      {selectedMethod === 'half-duplex' && '⇄'}
                      {selectedMethod === 'full-duplex' && '⇆'}
                    </div>
                    <p className="text-slate-600 max-w-md">
                      {transmissionMethods.find(m => m.id === selectedMethod)?.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="modes" className="space-y-6 mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {networkingModes.map((mode) => (
              <Card key={mode.mode} className="border-slate-200">
                <CardHeader>
                  <CardTitle className="text-slate-900">{mode.mode}</CardTitle>
                  <CardDescription>{mode.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-slate-900 text-sm">Example:</span>
                      <span className="text-sm text-slate-600 text-right">{mode.example}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-slate-900 text-sm">Efficiency:</span>
                      <span className="text-sm text-slate-600 text-right">{mode.efficiency}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-slate-900 text-sm">Scalability:</span>
                      <span className="text-sm text-slate-600 text-right">{mode.scalability}</span>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-200">
                    <h4 className="font-medium text-slate-900 text-sm mb-2">Use Case:</h4>
                    <p className="text-sm text-slate-600">{mode.useCase}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="journey" className="mt-6">
          <PacketJourneySimulator />
        </TabsContent>

        <TabsContent value="bandwidth" className="mt-6">
          <BandwidthSimulator />
        </TabsContent>

        <TabsContent value="packets" className="mt-6">
          <DatagramAnalyzer />
        </TabsContent>
      </Tabs>
    </div>
  );
}