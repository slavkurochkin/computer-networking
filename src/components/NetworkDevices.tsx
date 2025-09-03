import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Router, Network, Globe, Database, Settings, ArrowRight, ArrowDown } from 'lucide-react';

const networkDevices = [
  {
    id: 'router',
    name: 'Router',
    description: 'Routes data between different networks using IP addresses',
    layer: 3,
    functions: [
      'Packet forwarding between networks',
      'Path determination using routing tables', 
      'Network Address Translation (NAT)',
      'DHCP server functionality',
      'Firewall and security features'
    ],
    features: {
      'Routing Table': 'Stores network paths and next-hop information',
      'NAT Translation': 'Converts private IPs to public IPs',
      'DHCP Pool': 'Assigns IP addresses to devices',
      'Access Control': 'Filters traffic based on rules'
    },
    ports: ['WAN Port', 'LAN Ports', 'Console Port'],
    protocols: ['OSPF', 'BGP', 'RIP', 'EIGRP']
  },
  {
    id: 'switch',
    name: 'Switch',
    description: 'Forwards data within a network using MAC addresses',
    layer: 2,
    functions: [
      'Frame forwarding within LANs',
      'MAC address table maintenance',
      'Collision domain separation',
      'VLAN support and management',
      'Spanning Tree Protocol (STP)'
    ],
    features: {
      'MAC Address Table': 'Maps MAC addresses to switch ports',
      'VLAN Support': 'Creates virtual LANs for segmentation',
      'Port Mirroring': 'Copies traffic for monitoring',
      'Quality of Service': 'Prioritizes different types of traffic'
    },
    ports: ['Ethernet Ports', 'Uplink Ports', 'Management Port'],
    protocols: ['STP', 'VTP', '802.1Q', 'LACP']
  }
];

const tcpHeader = [
  { field: 'Source Port', bits: 16, description: 'Port number of the sending application' },
  { field: 'Destination Port', bits: 16, description: 'Port number of the receiving application' },
  { field: 'Sequence Number', bits: 32, description: 'Position of data in the stream' },
  { field: 'Acknowledgment Number', bits: 32, description: 'Next expected sequence number' },
  { field: 'Header Length', bits: 4, description: 'TCP header size in 32-bit words' },
  { field: 'Reserved', bits: 6, description: 'Reserved for future use (set to zero)' },
  { field: 'Control Flags', bits: 6, description: 'URG, ACK, PSH, RST, SYN, FIN flags' },
  { field: 'Window Size', bits: 16, description: 'Amount of data receiver can accept' },
  { field: 'Checksum', bits: 16, description: 'Error detection for header and data' },
  { field: 'Urgent Pointer', bits: 16, description: 'Points to urgent data in segment' }
];

const ipHeader = [
  { field: 'Version', bits: 4, description: 'IP version (4 for IPv4)' },
  { field: 'Header Length', bits: 4, description: 'Length of IP header in 32-bit words' },
  { field: 'Type of Service', bits: 8, description: 'Quality of service and priority' },
  { field: 'Total Length', bits: 16, description: 'Total packet size including header' },
  { field: 'Identification', bits: 16, description: 'Unique identifier for fragmented packets' },
  { field: 'Flags', bits: 3, description: 'Control fragmentation (DF, MF flags)' },
  { field: 'Fragment Offset', bits: 13, description: 'Position of fragment in original packet' },
  { field: 'Time to Live', bits: 8, description: 'Maximum hops before packet is discarded' },
  { field: 'Protocol', bits: 8, description: 'Next layer protocol (TCP=6, UDP=17)' },
  { field: 'Header Checksum', bits: 16, description: 'Error detection for header only' },
  { field: 'Source IP Address', bits: 32, description: 'IP address of sender' },
  { field: 'Destination IP Address', bits: 32, description: 'IP address of receiver' }
];

function RouterSimulator() {
  const [routingTable, setRoutingTable] = useState([
    { destination: '192.168.1.0/24', gateway: '192.168.1.1', interface: 'eth0', metric: 1 },
    { destination: '192.168.2.0/24', gateway: '192.168.2.1', interface: 'eth1', metric: 1 },
    { destination: '0.0.0.0/0', gateway: '203.0.113.1', interface: 'wan0', metric: 10 }
  ]);

  const [natTable, setNatTable] = useState([
    { privateIP: '192.168.1.100', privatePort: '3000', publicIP: '203.0.113.50', publicPort: '8080', protocol: 'TCP' },
    { privateIP: '192.168.1.101', privatePort: '443', publicIP: '203.0.113.50', publicPort: '8443', protocol: 'TCP' },
    { privateIP: '192.168.1.102', privatePort: '80', publicIP: '203.0.113.50', publicPort: '8000', protocol: 'TCP' }
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Router className="w-5 h-5" />
            Router Configuration Simulator
          </CardTitle>
          <CardDescription>Explore routing tables and NAT translation</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Routing Table</CardTitle>
            <CardDescription>Network destinations and next-hop information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Destination</TableHead>
                    <TableHead>Gateway</TableHead>
                    <TableHead>Interface</TableHead>
                    <TableHead>Metric</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {routingTable.map((route, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <code className="bg-slate-100 px-2 py-1 rounded text-sm">
                          {route.destination}
                        </code>
                      </TableCell>
                      <TableCell>
                        <code className="bg-slate-100 px-2 py-1 rounded text-sm">
                          {route.gateway}
                        </code>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{route.interface}</Badge>
                      </TableCell>
                      <TableCell>{route.metric}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 p-4 bg-slate-50 rounded-lg">
              <h4 className="font-medium text-sm mb-2">Routing Process:</h4>
              <ol className="text-sm space-y-1 text-slate-600">
                <li>1. Router receives packet with destination IP</li>
                <li>2. Looks up destination in routing table</li>
                <li>3. Finds best match (longest prefix match)</li>
                <li>4. Forwards packet to next-hop gateway</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>NAT Translation Table</CardTitle>
            <CardDescription>Private to public IP address mapping</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Private IP:Port</TableHead>
                    <TableHead>Public IP:Port</TableHead>
                    <TableHead>Protocol</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {natTable.map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <code className="bg-green-100 px-2 py-1 rounded text-sm">
                          {entry.privateIP}:{entry.privatePort}
                        </code>
                      </TableCell>
                      <TableCell>
                        <code className="bg-blue-100 px-2 py-1 rounded text-sm">
                          {entry.publicIP}:{entry.publicPort}
                        </code>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{entry.protocol}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 p-4 bg-slate-50 rounded-lg">
              <h4 className="font-medium text-sm mb-2">NAT Process:</h4>
              <ol className="text-sm space-y-1 text-slate-600">
                <li>1. Device sends packet with private IP</li>
                <li>2. Router replaces source IP with public IP</li>
                <li>3. Router stores mapping in NAT table</li>
                <li>4. Return traffic is translated back</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function PacketAnalyzer() {
  const [selectedPacket, setSelectedPacket] = useState('tcp');

  const renderHeaderFields = (fields: typeof tcpHeader | typeof ipHeader, title: string) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {title === 'TCP Header' ? 'Transport layer protocol header' : 'Network layer protocol header'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-8 gap-1 mb-4">
            {Array.from({ length: 32 }, (_, i) => (
              <div key={i} className="text-xs text-center py-1 bg-slate-100 rounded">
                {i}
              </div>
            ))}
          </div>
          
          <div className="space-y-2">
            {fields.map((field, index) => {
              const width = (field.bits / 32) * 100;
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center gap-4">
                    <div 
                      className="bg-blue-500 text-white text-sm px-3 py-2 rounded flex items-center justify-center"
                      style={{ width: `${Math.max(width, 15)}%` }}
                    >
                      {field.field}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {field.bits} bits
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 ml-4">{field.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            TCP/IP Packet Structure Analyzer
          </CardTitle>
          <CardDescription>Explore the structure of TCP and IP headers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button
              variant={selectedPacket === 'ip' ? 'default' : 'outline'}
              onClick={() => setSelectedPacket('ip')}
            >
              IP Header
            </Button>
            <Button
              variant={selectedPacket === 'tcp' ? 'default' : 'outline'}
              onClick={() => setSelectedPacket('tcp')}
            >
              TCP Header
            </Button>
          </div>
        </CardContent>
      </Card>

      {selectedPacket === 'tcp' && renderHeaderFields(tcpHeader, 'TCP Header')}
      {selectedPacket === 'ip' && renderHeaderFields(ipHeader, 'IP Header')}

      <Card>
        <CardHeader>
          <CardTitle>Complete Packet Structure</CardTitle>
          <CardDescription>How headers are stacked in a complete network packet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-2 border-slate-300 rounded-lg p-4">
              <div className="space-y-3">
                <div className="bg-red-100 border border-red-300 rounded p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span className="font-medium">Application Data</span>
                  </div>
                  <p className="text-sm text-slate-600">HTTP, FTP, SMTP, or other application data</p>
                </div>
                
                <ArrowDown className="w-4 h-4 text-slate-400 mx-auto" />
                
                <div className="bg-blue-100 border border-blue-300 rounded p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span className="font-medium">TCP Header (20-60 bytes)</span>
                  </div>
                  <p className="text-sm text-slate-600">Source/Dest ports, sequence numbers, flags</p>
                </div>
                
                <ArrowDown className="w-4 h-4 text-slate-400 mx-auto" />
                
                <div className="bg-green-100 border border-green-300 rounded p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="font-medium">IP Header (20-60 bytes)</span>
                  </div>
                  <p className="text-sm text-slate-600">Source/Dest IP addresses, TTL, protocol</p>
                </div>
                
                <ArrowDown className="w-4 h-4 text-slate-400 mx-auto" />
                
                <div className="bg-purple-100 border border-purple-300 rounded p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-purple-500 rounded"></div>
                    <span className="font-medium">Ethernet Header (14 bytes)</span>
                  </div>
                  <p className="text-sm text-slate-600">Source/Dest MAC addresses, EtherType</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SwitchLearning() {
  const [macTable, setMacTable] = useState([
    { mac: '00:1A:2B:3C:4D:5E', port: 1, vlan: 1, age: '5 min' },
    { mac: '00:2B:3C:4D:5E:6F', port: 2, vlan: 1, age: '3 min' },
    { mac: '00:3C:4D:5E:6F:7A', port: 3, vlan: 2, age: '8 min' },
    { mac: '00:4D:5E:6F:7A:8B', port: 4, vlan: 2, age: '2 min' }
  ]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Network className="w-5 h-5" />
          Switch MAC Address Learning
        </CardTitle>
        <CardDescription>How switches learn and store MAC addresses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>MAC Address</TableHead>
                  <TableHead>Port</TableHead>
                  <TableHead>VLAN</TableHead>
                  <TableHead>Age</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {macTable.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <code className="bg-slate-100 px-2 py-1 rounded text-sm">
                        {entry.mac}
                      </code>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">Port {entry.port}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">VLAN {entry.vlan}</Badge>
                    </TableCell>
                    <TableCell>{entry.age}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Learning Process:</h4>
              <ol className="space-y-2 text-sm text-slate-600">
                <li className="flex gap-2">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">1</span>
                  Frame arrives at switch port
                </li>
                <li className="flex gap-2">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">2</span>
                  Switch examines source MAC address
                </li>
                <li className="flex gap-2">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">3</span>
                  Adds MAC-to-port mapping to table
                </li>
                <li className="flex gap-2">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">4</span>
                  Uses table for future forwarding decisions
                </li>
              </ol>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Forwarding Decisions:</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Known Unicast:</strong> Forward to specific port</span>
                </li>
                <li className="flex gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Unknown Unicast:</strong> Flood to all ports</span>
                </li>
                <li className="flex gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Broadcast:</strong> Forward to all ports in VLAN</span>
                </li>
                <li className="flex gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Multicast:</strong> Forward to registered ports</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function NetworkDevices() {
  const [selectedDevice, setSelectedDevice] = useState('router');

  return (
    <div className="space-y-6">
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Router className="w-5 h-5 text-slate-700" />
            Network Devices & Protocols
          </CardTitle>
          <CardDescription>
            Learn about routers, switches, NAT tables, and packet structures
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="devices" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-100">
          <TabsTrigger value="devices" className="data-[state=active]:bg-white">Device Overview</TabsTrigger>
          <TabsTrigger value="router" className="data-[state=active]:bg-white">Router & NAT</TabsTrigger>
          <TabsTrigger value="switch" className="data-[state=active]:bg-white">Switch Learning</TabsTrigger>
          <TabsTrigger value="packets" className="data-[state=active]:bg-white">Packet Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="devices" className="space-y-6 mt-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {networkDevices.map((device) => (
              <Card 
                key={device.id} 
                className={`cursor-pointer transition-all border-slate-200 hover:border-slate-300 ${
                  selectedDevice === device.id ? 'ring-2 ring-blue-500 border-blue-300' : ''
                }`}
                onClick={() => setSelectedDevice(device.id)}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg">
                      {device.id === 'router' ? (
                        <Router className="w-6 h-6 text-slate-700" />
                      ) : (
                        <Network className="w-6 h-6 text-slate-700" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-slate-900">{device.name}</CardTitle>
                      <CardDescription>
                        OSI Layer {device.layer} • {device.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Key Functions:</h4>
                    <ul className="space-y-1">
                      {device.functions.map((func, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          {func}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Supported Protocols:</h4>
                    <div className="flex flex-wrap gap-1">
                      {device.protocols.map((protocol, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {protocol}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedDevice && (
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>
                  {networkDevices.find(d => d.id === selectedDevice)?.name} Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-slate-900 mb-3">Core Features:</h4>
                    <div className="space-y-3">
                      {Object.entries(networkDevices.find(d => d.id === selectedDevice)?.features || {}).map(([feature, description]) => (
                        <div key={feature} className="border border-slate-200 rounded-lg p-3">
                          <h5 className="font-medium text-sm text-slate-900 mb-1">{feature}</h5>
                          <p className="text-sm text-slate-600">{description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-slate-900 mb-3">Physical Ports:</h4>
                    <div className="space-y-2">
                      {networkDevices.find(d => d.id === selectedDevice)?.ports.map((port, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-slate-700">{port}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="router" className="mt-6">
          <RouterSimulator />
        </TabsContent>

        <TabsContent value="switch" className="mt-6">
          <SwitchLearning />
        </TabsContent>

        <TabsContent value="packets" className="mt-6">
          <PacketAnalyzer />
        </TabsContent>
      </Tabs>
    </div>
  );
}