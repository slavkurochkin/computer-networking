import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Network, Wifi, Server, Smartphone, Monitor, Router } from 'lucide-react';

const topologies = [
  {
    id: 'star',
    name: 'Star Topology',
    description: 'All devices connect to a central hub or switch',
    pros: ['Easy to troubleshoot', 'Centralized management', 'High fault tolerance'],
    cons: ['Central point of failure', 'Requires more cable', 'Cost of central device'],
    useCase: 'Most common in modern LANs, office networks',
    diagram: 'star'
  },
  {
    id: 'bus',
    name: 'Bus Topology',
    description: 'All devices connected to a single backbone cable',
    pros: ['Simple and inexpensive', 'Easy to extend', 'Requires less cable'],
    cons: ['Single point of failure', 'Performance degrades with traffic', 'Difficult to troubleshoot'],
    useCase: 'Legacy networks, simple setups',
    diagram: 'bus'
  },
  {
    id: 'ring',
    name: 'Ring Topology',
    description: 'Devices connected in a circular chain',
    pros: ['Equal access for all nodes', 'No collisions', 'Predictable performance'],
    cons: ['Single device failure affects all', 'Difficult to troubleshoot', 'Adding devices disrupts network'],
    useCase: 'Token Ring networks (mostly legacy)',
    diagram: 'ring'
  },
  {
    id: 'mesh',
    name: 'Mesh Topology',
    description: 'Multiple connections between devices',
    pros: ['High redundancy', 'Self-healing', 'Multiple paths available'],
    cons: ['Complex and expensive', 'Difficult to manage', 'Requires many connections'],
    useCase: 'Critical networks, WANs, wireless networks',
    diagram: 'mesh'
  },
  {
    id: 'hybrid',
    name: 'Hybrid Topology',
    description: 'Combination of multiple topologies',
    pros: ['Flexible design', 'Scalable', 'Fault tolerant'],
    cons: ['Complex design', 'Expensive', 'Difficult to maintain'],
    useCase: 'Large enterprise networks, internet backbone',
    diagram: 'hybrid'
  }
];

const networkTypes = [
  {
    id: 'lan',
    name: 'LAN',
    fullName: 'Local Area Network',
    scope: 'Single building or campus',
    speed: '10 Mbps - 10 Gbps',
    examples: ['Office network', 'Home network', 'School campus'],
    technologies: ['Ethernet', 'Wi-Fi', 'Token Ring']
  },
  {
    id: 'wan',
    name: 'WAN',
    fullName: 'Wide Area Network',
    scope: 'Large geographic areas',
    speed: '1.5 Mbps - 100 Gbps',
    examples: ['Internet', 'Corporate networks', 'Telecom networks'],
    technologies: ['MPLS', 'Frame Relay', 'ATM', 'Leased Lines']
  },
  {
    id: 'man',
    name: 'MAN',
    fullName: 'Metropolitan Area Network',
    scope: 'City or metropolitan area',
    speed: '10 Mbps - 1 Gbps',
    examples: ['City-wide networks', 'Cable TV networks', 'Municipal Wi-Fi'],
    technologies: ['SONET', 'DWDM', 'Metro Ethernet']
  },
  {
    id: 'pan',
    name: 'PAN',
    fullName: 'Personal Area Network',
    scope: 'Personal workspace (10m)',
    speed: '1-100 Mbps',
    examples: ['Bluetooth devices', 'USB connections', 'Wireless peripherals'],
    technologies: ['Bluetooth', 'ZigBee', 'Infrared', 'USB']
  }
];

function TopologyDiagram({ type }: { type: string }) {
  const commonStyles = {
    device: "w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs",
    hub: "w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white",
    line: "stroke-gray-400 stroke-2"
  };

  switch (type) {
    case 'star':
      return (
        <svg viewBox="0 0 200 200" className="w-full h-48">
          {/* Central hub */}
          <rect x="90" y="90" width="20" height="20" rx="4" className="fill-green-500" />
          <text x="100" y="103" textAnchor="middle" className="fill-white text-xs">Hub</text>
          
          {/* Devices */}
          <circle cx="100" cy="40" r="12" className="fill-blue-500" />
          <text x="100" y="45" textAnchor="middle" className="fill-white text-xs">A</text>
          
          <circle cx="160" cy="100" r="12" className="fill-blue-500" />
          <text x="160" y="105" textAnchor="middle" className="fill-white text-xs">B</text>
          
          <circle cx="100" cy="160" r="12" className="fill-blue-500" />
          <text x="100" y="165" textAnchor="middle" className="fill-white text-xs">C</text>
          
          <circle cx="40" cy="100" r="12" className="fill-blue-500" />
          <text x="40" y="105" textAnchor="middle" className="fill-white text-xs">D</text>
          
          {/* Connections */}
          <line x1="100" y1="52" x2="100" y2="90" className={commonStyles.line} />
          <line x1="148" y1="100" x2="110" y2="100" className={commonStyles.line} />
          <line x1="100" y1="148" x2="100" y2="110" className={commonStyles.line} />
          <line x1="52" y1="100" x2="90" y2="100" className={commonStyles.line} />
        </svg>
      );
    
    case 'bus':
      return (
        <svg viewBox="0 0 200 200" className="w-full h-48">
          {/* Bus line */}
          <line x1="30" y1="100" x2="170" y2="100" className="stroke-gray-600 stroke-4" />
          
          {/* Devices */}
          <circle cx="50" cy="100" r="12" className="fill-blue-500" />
          <text x="50" y="105" textAnchor="middle" className="fill-white text-xs">A</text>
          
          <circle cx="80" cy="100" r="12" className="fill-blue-500" />
          <text x="80" y="105" textAnchor="middle" className="fill-white text-xs">B</text>
          
          <circle cx="120" cy="100" r="12" className="fill-blue-500" />
          <text x="120" y="105" textAnchor="middle" className="fill-white text-xs">C</text>
          
          <circle cx="150" cy="100" r="12" className="fill-blue-500" />
          <text x="150" y="105" textAnchor="middle" className="fill-white text-xs">D</text>
          
          {/* Terminators */}
          <rect x="25" y="95" width="10" height="10" className="fill-red-500" />
          <rect x="165" y="95" width="10" height="10" className="fill-red-500" />
        </svg>
      );
    
    case 'ring':
      return (
        <svg viewBox="0 0 200 200" className="w-full h-48">
          {/* Ring */}
          <circle cx="100" cy="100" r="60" fill="none" className="stroke-gray-600 stroke-4" />
          
          {/* Devices */}
          <circle cx="100" cy="40" r="12" className="fill-blue-500" />
          <text x="100" y="45" textAnchor="middle" className="fill-white text-xs">A</text>
          
          <circle cx="160" cy="100" r="12" className="fill-blue-500" />
          <text x="160" y="105" textAnchor="middle" className="fill-white text-xs">B</text>
          
          <circle cx="100" cy="160" r="12" className="fill-blue-500" />
          <text x="100" y="165" textAnchor="middle" className="fill-white text-xs">C</text>
          
          <circle cx="40" cy="100" r="12" className="fill-blue-500" />
          <text x="40" y="105" textAnchor="middle" className="fill-white text-xs">D</text>
          
          {/* Direction arrows */}
          <polygon points="110,50 120,45 120,55" className="fill-green-500" />
          <polygon points="150,90 155,80 145,80" className="fill-green-500" />
          <polygon points="90,150 80,155 80,145" className="fill-green-500" />
          <polygon points="50,110 45,120 55,120" className="fill-green-500" />
        </svg>
      );
    
    case 'mesh':
      return (
        <svg viewBox="0 0 200 200" className="w-full h-48">
          {/* Devices */}
          <circle cx="60" cy="60" r="12" className="fill-blue-500" />
          <text x="60" y="65" textAnchor="middle" className="fill-white text-xs">A</text>
          
          <circle cx="140" cy="60" r="12" className="fill-blue-500" />
          <text x="140" y="65" textAnchor="middle" className="fill-white text-xs">B</text>
          
          <circle cx="60" cy="140" r="12" className="fill-blue-500" />
          <text x="60" y="145" textAnchor="middle" className="fill-white text-xs">C</text>
          
          <circle cx="140" cy="140" r="12" className="fill-blue-500" />
          <text x="140" y="145" textAnchor="middle" className="fill-white text-xs">D</text>
          
          {/* All connections */}
          <line x1="72" y1="60" x2="128" y2="60" className={commonStyles.line} />
          <line x1="60" y1="72" x2="60" y2="128" className={commonStyles.line} />
          <line x1="140" y1="72" x2="140" y2="128" className={commonStyles.line} />
          <line x1="72" y1="140" x2="128" y2="140" className={commonStyles.line} />
          <line x1="72" y1="72" x2="128" y2="128" className={commonStyles.line} />
          <line x1="128" y1="72" x2="72" y2="128" className={commonStyles.line} />
        </svg>
      );
    
    default:
      return (
        <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
          <Network className="w-16 h-16 text-gray-400" />
        </div>
      );
  }
}

export function NetworkTopologies() {
  const [selectedTopology, setSelectedTopology] = useState('star');
  const [activeTab, setActiveTab] = useState('topologies');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="w-5 h-5" />
            Network Topologies & Types
          </CardTitle>
          <CardDescription>
            Explore different ways to structure and organize networks
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="topologies">Network Topologies</TabsTrigger>
          <TabsTrigger value="types">Network Types</TabsTrigger>
        </TabsList>

        <TabsContent value="topologies" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Physical Topologies</CardTitle>
                <CardDescription>Select a topology to view its structure</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {topologies.map((topology) => (
                    <Button
                      key={topology.id}
                      variant={selectedTopology === topology.id ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setSelectedTopology(topology.id)}
                    >
                      {topology.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{topologies.find(t => t.id === selectedTopology)?.name}</CardTitle>
                <CardDescription>
                  {topologies.find(t => t.id === selectedTopology)?.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TopologyDiagram type={selectedTopology} />
              </CardContent>
            </Card>
          </div>

          {selectedTopology && (
            <Card>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium text-green-600 mb-2">Advantages</h4>
                    <ul className="text-sm space-y-1">
                      {topologies.find(t => t.id === selectedTopology)?.pros.map((pro, index) => (
                        <li key={index}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-red-600 mb-2">Disadvantages</h4>
                    <ul className="text-sm space-y-1">
                      {topologies.find(t => t.id === selectedTopology)?.cons.map((con, index) => (
                        <li key={index}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-600 mb-2">Common Use Cases</h4>
                    <p className="text-sm">
                      {topologies.find(t => t.id === selectedTopology)?.useCase}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="types" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {networkTypes.map((network) => (
              <Card key={network.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="outline">{network.name}</Badge>
                    {network.fullName}
                  </CardTitle>
                  <CardDescription>{network.scope}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">Speed Range:</span>
                      <Badge variant="secondary">{network.speed}</Badge>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-2">Common Examples:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {network.examples.map((example, index) => (
                        <li key={index}>• {example}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-2">Technologies:</h4>
                    <div className="flex flex-wrap gap-1">
                      {network.technologies.map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}