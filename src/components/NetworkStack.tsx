import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ChevronDown, ChevronUp, Layers, Network } from 'lucide-react';

const osiLayers = [
  {
    number: 7,
    name: 'Application',
    description: 'User interface, network services',
    examples: ['HTTP', 'HTTPS', 'FTP', 'SMTP', 'DNS'],
    color: 'bg-red-100 border-red-200',
    functions: ['User authentication', 'Data encryption', 'Network service access']
  },
  {
    number: 6,
    name: 'Presentation',
    description: 'Data formatting, encryption, compression',
    examples: ['SSL/TLS', 'JPEG', 'ASCII', 'EBCDIC'],
    color: 'bg-orange-100 border-orange-200',
    functions: ['Data encryption/decryption', 'Data compression', 'Data translation']
  },
  {
    number: 5,
    name: 'Session',
    description: 'Session management, connections',
    examples: ['NetBIOS', 'RPC', 'SQL', 'NFS'],
    color: 'bg-yellow-100 border-yellow-200',
    functions: ['Session establishment', 'Session maintenance', 'Session termination']
  },
  {
    number: 4,
    name: 'Transport',
    description: 'End-to-end connections, reliability',
    examples: ['TCP', 'UDP', 'SPX'],
    color: 'bg-green-100 border-green-200',
    functions: ['Error detection', 'Flow control', 'Segmentation']
  },
  {
    number: 3,
    name: 'Network',
    description: 'Routing, logical addressing',
    examples: ['IP', 'ICMP', 'OSPF', 'BGP'],
    color: 'bg-blue-100 border-blue-200',
    functions: ['Routing', 'Path determination', 'Logical addressing']
  },
  {
    number: 2,
    name: 'Data Link',
    description: 'Frame formatting, error detection',
    examples: ['Ethernet', 'PPP', 'Wi-Fi', 'ARP'],
    color: 'bg-indigo-100 border-indigo-200',
    functions: ['Frame synchronization', 'Error detection', 'Flow control']
  },
  {
    number: 1,
    name: 'Physical',
    description: 'Physical transmission of bits',
    examples: ['Cables', 'Wireless', 'Hubs', 'Repeaters'],
    color: 'bg-purple-100 border-purple-200',
    functions: ['Bit transmission', 'Physical topology', 'Electrical specifications']
  }
];

const tcpipLayers = [
  {
    number: 5,
    name: 'Application',
    description: 'Network applications and services',
    examples: ['HTTP', 'FTP', 'SMTP', 'DNS', 'DHCP'],
    osiEquivalent: 'Layers 5-7',
    color: 'bg-blue-100 border-blue-200'
  },
  {
    number: 4,
    name: 'Transport',
    description: 'End-to-end communication',
    examples: ['TCP', 'UDP'],
    osiEquivalent: 'Layer 4',
    color: 'bg-green-100 border-green-200'
  },
  {
    number: 3,
    name: 'Network (Internet)',
    description: 'Routing and addressing',
    examples: ['IP', 'ICMP', 'ARP'],
    osiEquivalent: 'Layer 3',
    color: 'bg-yellow-100 border-yellow-200'
  },
  {
    number: 2,
    name: 'Data Link',
    description: 'Frame formatting and error detection',
    examples: ['Ethernet', 'Wi-Fi', 'PPP'],
    osiEquivalent: 'Layer 2',
    color: 'bg-orange-100 border-orange-200'
  },
  {
    number: 1,
    name: 'Physical',
    description: 'Physical transmission of bits',
    examples: ['Cables', 'Wireless', 'Hubs', 'Repeaters'],
    osiEquivalent: 'Layer 1',
    color: 'bg-purple-100 border-purple-200'
  }
];

export function NetworkStack() {
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null);
  const [activeModel, setActiveModel] = useState('osi');

  return (
    <div className="space-y-6">
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-slate-700" />
            Network Protocol Stacks
          </CardTitle>
          <CardDescription>
            Understanding the layers that enable network communication
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeModel} onValueChange={setActiveModel}>
        <TabsList className="grid w-full grid-cols-2 bg-slate-100">
          <TabsTrigger value="osi" className="data-[state=active]:bg-white">OSI Model (7 Layers)</TabsTrigger>
          <TabsTrigger value="tcpip" className="data-[state=active]:bg-white">TCP/IP Stack (5 Layers)</TabsTrigger>
        </TabsList>

        <TabsContent value="osi" className="space-y-6 mt-6">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle>OSI Reference Model</CardTitle>
              <CardDescription>
                The Open Systems Interconnection model defines 7 layers of network communication
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {osiLayers.map((layer) => (
                  <div
                    key={layer.number}
                    className={`border border-slate-200 rounded-lg p-4 cursor-pointer transition-all hover:border-slate-300 ${layer.color} ${
                      selectedLayer === layer.number ? 'ring-2 ring-blue-500 border-blue-300' : ''
                    }`}
                    onClick={() => setSelectedLayer(selectedLayer === layer.number ? null : layer.number)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="min-w-[70px] justify-center font-medium">
                          Layer {layer.number}
                        </Badge>
                        <div>
                          <h3 className="font-medium text-slate-900">{layer.name}</h3>
                          <p className="text-sm text-slate-600">{layer.description}</p>
                        </div>
                      </div>
                      {selectedLayer === layer.number ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                    
                    {selectedLayer === layer.number && (
                      <div className="mt-4 pt-4 border-t border-slate-300 space-y-4">
                        <div>
                          <h4 className="font-medium text-slate-900 text-sm mb-2">Key Functions:</h4>
                          <ul className="space-y-1">
                            {layer.functions.map((func, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                {func}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900 text-sm mb-2">Examples:</h4>
                          <div className="flex flex-wrap gap-1">
                            {layer.examples.map((example, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {example}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tcpip" className="space-y-6 mt-6">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle>TCP/IP Protocol Stack</CardTitle>
              <CardDescription>
                The practical implementation used by the Internet and most networks today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tcpipLayers.map((layer) => (
                  <div
                    key={layer.number}
                    className={`border border-slate-200 rounded-lg p-4 cursor-pointer transition-all hover:border-slate-300 ${layer.color} ${
                      selectedLayer === layer.number ? 'ring-2 ring-blue-500 border-blue-300' : ''
                    }`}
                    onClick={() => setSelectedLayer(selectedLayer === layer.number ? null : layer.number)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="min-w-[70px] justify-center font-medium">
                          Layer {layer.number}
                        </Badge>
                        <div>
                          <h3 className="font-medium text-slate-900">{layer.name}</h3>
                          <p className="text-sm text-slate-600">{layer.description}</p>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-3">
                        <Badge variant="secondary" className="text-xs">
                          OSI: {layer.osiEquivalent}
                        </Badge>
                        {selectedLayer === layer.number ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </div>
                    
                    {selectedLayer === layer.number && (
                      <div className="mt-4 pt-4 border-t border-slate-300">
                        <div>
                          <h4 className="font-medium text-slate-900 text-sm mb-2">Common Protocols:</h4>
                          <div className="flex flex-wrap gap-1">
                            {layer.examples.map((example, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {example}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle>OSI vs TCP/IP Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-slate-900">OSI Model Advantages:</h4>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      More detailed layering
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      Better for teaching concepts
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      Clearer separation of concerns
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      Comprehensive framework
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-slate-900">TCP/IP Advantages:</h4>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      Widely implemented
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      Simpler and more practical
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      Internet standard
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      Proven in real-world use
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}