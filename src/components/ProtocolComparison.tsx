import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Zap, Shield, Globe, Database } from 'lucide-react';

const applicationProtocols = [
  {
    name: 'HTTP',
    fullName: 'HyperText Transfer Protocol',
    port: '80',
    transport: 'TCP',
    security: 'None',
    purpose: 'Web browsing',
    reliability: 'High',
    speed: 'Medium',
    usage: 85
  },
  {
    name: 'HTTPS',
    fullName: 'HTTP Secure',
    port: '443',
    transport: 'TCP',
    security: 'TLS/SSL',
    purpose: 'Secure web browsing',
    reliability: 'High',
    speed: 'Medium',
    usage: 90
  },
  {
    name: 'FTP',
    fullName: 'File Transfer Protocol',
    port: '21/20',
    transport: 'TCP',
    security: 'Basic',
    purpose: 'File transfer',
    reliability: 'High',
    speed: 'High',
    usage: 25
  },
  {
    name: 'SMTP',
    fullName: 'Simple Mail Transfer Protocol',
    port: '25',
    transport: 'TCP',
    security: 'Basic/TLS',
    purpose: 'Email sending',
    reliability: 'High',
    speed: 'Medium',
    usage: 70
  },
  {
    name: 'DNS',
    fullName: 'Domain Name System',
    port: '53',
    transport: 'UDP/TCP',
    security: 'DNSSEC',
    purpose: 'Name resolution',
    reliability: 'High',
    speed: 'Fast',
    usage: 95
  },
  {
    name: 'DHCP',
    fullName: 'Dynamic Host Configuration Protocol',
    port: '67/68',
    transport: 'UDP',
    security: 'Basic',
    purpose: 'IP assignment',
    reliability: 'Medium',
    speed: 'Fast',
    usage: 80
  }
];

const transportProtocols = [
  {
    protocol: 'TCP',
    fullName: 'Transmission Control Protocol',
    connectionType: 'Connection-oriented',
    reliability: 'Reliable',
    ordering: 'Ordered',
    errorDetection: 'Yes',
    flowControl: 'Yes',
    overhead: 'High',
    useCase: 'Web, Email, File Transfer',
    features: ['Connection establishment', 'Error recovery', 'Flow control', 'Congestion control']
  },
  {
    protocol: 'UDP',
    fullName: 'User Datagram Protocol',
    connectionType: 'Connectionless',
    reliability: 'Unreliable',
    ordering: 'Unordered',
    errorDetection: 'Basic',
    flowControl: 'No',
    overhead: 'Low',
    useCase: 'Gaming, Streaming, DNS',
    features: ['Fast delivery', 'Low overhead', 'No connection state', 'Best effort delivery']
  }
];

const securityProtocols = [
  {
    name: 'TLS/SSL',
    purpose: 'Transport Layer Security',
    layer: 'Application/Transport',
    encryption: 'Symmetric & Asymmetric',
    authentication: 'Certificate-based',
    usage: 'HTTPS, Email, VPN'
  },
  {
    name: 'IPSec',
    purpose: 'IP Security',
    layer: 'Network',
    encryption: 'ESP',
    authentication: 'AH',
    usage: 'VPN, Site-to-site'
  },
  {
    name: 'WPA/WPA2',
    purpose: 'Wi-Fi Protected Access',
    layer: 'Data Link',
    encryption: 'AES',
    authentication: 'PSK/802.1X',
    usage: 'Wireless networks'
  }
];

const performanceData = [
  { protocol: 'HTTP', latency: 50, throughput: 80, reliability: 95 },
  { protocol: 'HTTPS', latency: 65, throughput: 75, reliability: 95 },
  { protocol: 'FTP', latency: 30, throughput: 95, reliability: 98 },
  { protocol: 'UDP', latency: 10, throughput: 90, reliability: 70 },
  { protocol: 'TCP', latency: 25, throughput: 85, reliability: 99 }
];

const usageData = applicationProtocols.map(p => ({
  name: p.name,
  usage: p.usage,
  color: '#' + Math.floor(Math.random()*16777215).toString(16)
}));

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export function ProtocolComparison() {
  const [selectedProtocol, setSelectedProtocol] = useState('TCP');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Network Protocols Comparison
          </CardTitle>
          <CardDescription>
            Compare different protocols used in network communication
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="application" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="application">Application Layer</TabsTrigger>
          <TabsTrigger value="transport">Transport Layer</TabsTrigger>
          <TabsTrigger value="security">Security Protocols</TabsTrigger>
          <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="application" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Application Layer Protocols</CardTitle>
              <CardDescription>Common protocols used by applications to communicate over networks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Protocol</TableHead>
                      <TableHead>Full Name</TableHead>
                      <TableHead>Port</TableHead>
                      <TableHead>Transport</TableHead>
                      <TableHead>Security</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Usage %</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applicationProtocols.map((protocol) => (
                      <TableRow key={protocol.name}>
                        <TableCell>
                          <Badge variant="outline">{protocol.name}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">{protocol.fullName}</TableCell>
                        <TableCell>
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm">{protocol.port}</code>
                        </TableCell>
                        <TableCell>
                          <Badge variant={protocol.transport === 'TCP' ? 'default' : 'secondary'}>
                            {protocol.transport}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={protocol.security === 'None' ? 'destructive' : 'default'}>
                            {protocol.security}
                          </Badge>
                        </TableCell>
                        <TableCell>{protocol.purpose}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${protocol.usage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm">{protocol.usage}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Protocol Usage Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={usageData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="usage"
                    >
                      {usageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transport" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {transportProtocols.map((protocol) => (
              <Card key={protocol.protocol} className={selectedProtocol === protocol.protocol ? 'ring-2 ring-blue-500' : ''}>
                <CardHeader>
                  <CardTitle 
                    className="cursor-pointer flex items-center gap-2"
                    onClick={() => setSelectedProtocol(protocol.protocol)}
                  >
                    <Badge variant="outline">{protocol.protocol}</Badge>
                    {protocol.fullName}
                  </CardTitle>
                  <CardDescription>{protocol.connectionType}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Reliability:</span>
                      <Badge variant={protocol.reliability === 'Reliable' ? 'default' : 'secondary'} className="ml-2">
                        {protocol.reliability}
                      </Badge>
                    </div>
                    <div>
                      <span className="font-medium">Ordering:</span>
                      <Badge variant={protocol.ordering === 'Ordered' ? 'default' : 'secondary'} className="ml-2">
                        {protocol.ordering}
                      </Badge>
                    </div>
                    <div>
                      <span className="font-medium">Flow Control:</span>
                      <Badge variant={protocol.flowControl === 'Yes' ? 'default' : 'secondary'} className="ml-2">
                        {protocol.flowControl}
                      </Badge>
                    </div>
                    <div>
                      <span className="font-medium">Overhead:</span>
                      <Badge variant={protocol.overhead === 'Low' ? 'default' : 'destructive'} className="ml-2">
                        {protocol.overhead}
                      </Badge>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-2">Key Features:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {protocol.features.map((feature, index) => (
                        <li key={index}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-1">Common Use Cases:</h4>
                    <p className="text-sm text-muted-foreground">{protocol.useCase}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>TCP vs UDP Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Feature</TableHead>
                      <TableHead>TCP</TableHead>
                      <TableHead>UDP</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Connection</TableCell>
                      <TableCell><Badge variant="default">Connection-oriented</Badge></TableCell>
                      <TableCell><Badge variant="secondary">Connectionless</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Reliability</TableCell>
                      <TableCell><Badge variant="default">Guaranteed delivery</Badge></TableCell>
                      <TableCell><Badge variant="secondary">Best effort</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Speed</TableCell>
                      <TableCell><Badge variant="secondary">Slower</Badge></TableCell>
                      <TableCell><Badge variant="default">Faster</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Overhead</TableCell>
                      <TableCell><Badge variant="destructive">Higher</Badge></TableCell>
                      <TableCell><Badge variant="default">Lower</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Use Case</TableCell>
                      <TableCell>Web browsing, Email, File transfer</TableCell>
                      <TableCell>Gaming, Streaming, DNS queries</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="grid gap-4">
            {securityProtocols.map((protocol) => (
              <Card key={protocol.name}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    {protocol.name}
                  </CardTitle>
                  <CardDescription>{protocol.purpose}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Layer:</span>
                      <p className="text-muted-foreground">{protocol.layer}</p>
                    </div>
                    <div>
                      <span className="font-medium">Encryption:</span>
                      <p className="text-muted-foreground">{protocol.encryption}</p>
                    </div>
                    <div>
                      <span className="font-medium">Authentication:</span>
                      <p className="text-muted-foreground">{protocol.authentication}</p>
                    </div>
                    <div>
                      <span className="font-medium">Common Usage:</span>
                      <p className="text-muted-foreground">{protocol.usage}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Protocol Performance Comparison</CardTitle>
              <CardDescription>Latency, throughput, and reliability metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="protocol" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="latency" fill="#8884d8" name="Latency (ms)" />
                    <Bar dataKey="throughput" fill="#82ca9d" name="Throughput (%)" />
                    <Bar dataKey="reliability" fill="#ffc658" name="Reliability (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">Latency</CardTitle>
                <CardDescription>Time delay in communication</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Lower is better for real-time applications like gaming and video calls.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Throughput</CardTitle>
                <CardDescription>Data transfer efficiency</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Higher is better for file transfers and bulk data operations.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-yellow-600">Reliability</CardTitle>
                <CardDescription>Data delivery guarantee</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Higher is better for critical applications requiring data integrity.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}