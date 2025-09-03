import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Calculator, Network, Globe, AlertCircle } from 'lucide-react';

const ipClasses = [
  {
    class: 'A',
    range: '1.0.0.0 - 126.255.255.255',
    defaultMask: '255.0.0.0',
    cidr: '/8',
    hosts: '16,777,214',
    use: 'Large networks',
    firstOctet: '1-126'
  },
  {
    class: 'B',
    range: '128.0.0.0 - 191.255.255.255',
    defaultMask: '255.255.0.0',
    cidr: '/16',
    hosts: '65,534',
    use: 'Medium networks',
    firstOctet: '128-191'
  },
  {
    class: 'C',
    range: '192.0.0.0 - 223.255.255.255',
    defaultMask: '255.255.255.0',
    cidr: '/24',
    hosts: '254',
    use: 'Small networks',
    firstOctet: '192-223'
  },
  {
    class: 'D',
    range: '224.0.0.0 - 239.255.255.255',
    defaultMask: 'N/A',
    cidr: 'N/A',
    hosts: 'N/A',
    use: 'Multicast',
    firstOctet: '224-239'
  },
  {
    class: 'E',
    range: '240.0.0.0 - 255.255.255.255',
    defaultMask: 'N/A',
    cidr: 'N/A',
    hosts: 'N/A',
    use: 'Experimental',
    firstOctet: '240-255'
  }
];

const privateRanges = [
  { class: 'A', range: '10.0.0.0/8', addresses: '10.0.0.0 - 10.255.255.255' },
  { class: 'B', range: '172.16.0.0/12', addresses: '172.16.0.0 - 172.31.255.255' },
  { class: 'C', range: '192.168.0.0/16', addresses: '192.168.0.0 - 192.168.255.255' }
];

function IPAddressCalculator() {
  const [ip, setIp] = useState('192.168.1.100');
  const [subnet, setSubnet] = useState('24');
  const [result, setResult] = useState<any>(null);

  const calculateSubnet = () => {
    try {
      const ipParts = ip.split('.').map(Number);
      const subnetMask = parseInt(subnet);
      
      if (ipParts.length !== 4 || ipParts.some(part => part < 0 || part > 255)) {
        throw new Error('Invalid IP address');
      }
      
      if (subnetMask < 0 || subnetMask > 32) {
        throw new Error('Invalid subnet mask');
      }

      // Calculate subnet mask
      const maskBits = '1'.repeat(subnetMask) + '0'.repeat(32 - subnetMask);
      const maskParts = [];
      for (let i = 0; i < 4; i++) {
        maskParts.push(parseInt(maskBits.slice(i * 8, (i + 1) * 8), 2));
      }

      // Calculate network address
      const networkParts = ipParts.map((part, i) => part & maskParts[i]);
      
      // Calculate broadcast address
      const wildcardParts = maskParts.map(part => 255 - part);
      const broadcastParts = networkParts.map((part, i) => part | wildcardParts[i]);
      
      // Calculate number of hosts
      const hostBits = 32 - subnetMask;
      const totalHosts = Math.pow(2, hostBits);
      const usableHosts = totalHosts - 2; // Subtract network and broadcast

      // Determine IP class
      const firstOctet = ipParts[0];
      let ipClass = 'Unknown';
      if (firstOctet >= 1 && firstOctet <= 126) ipClass = 'A';
      else if (firstOctet >= 128 && firstOctet <= 191) ipClass = 'B';
      else if (firstOctet >= 192 && firstOctet <= 223) ipClass = 'C';
      else if (firstOctet >= 224 && firstOctet <= 239) ipClass = 'D';
      else if (firstOctet >= 240 && firstOctet <= 255) ipClass = 'E';

      // Check if private
      const isPrivate = 
        (firstOctet === 10) ||
        (firstOctet === 172 && ipParts[1] >= 16 && ipParts[1] <= 31) ||
        (firstOctet === 192 && ipParts[1] === 168);

      setResult({
        ip: ip,
        subnetMask: maskParts.join('.'),
        cidr: `/${subnetMask}`,
        networkAddress: networkParts.join('.'),
        broadcastAddress: broadcastParts.join('.'),
        firstHost: networkParts[0] + '.' + networkParts[1] + '.' + networkParts[2] + '.' + (networkParts[3] + 1),
        lastHost: broadcastParts[0] + '.' + broadcastParts[1] + '.' + broadcastParts[2] + '.' + (broadcastParts[3] - 1),
        totalHosts: totalHosts,
        usableHosts: usableHosts,
        ipClass: ipClass,
        isPrivate: isPrivate
      });
    } catch (error) {
      setResult({ error: 'Invalid input values' });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          IP Address Calculator
        </CardTitle>
        <CardDescription>Calculate subnet information from IP address and CIDR notation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="ip">IP Address</Label>
            <Input
              id="ip"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              placeholder="192.168.1.100"
            />
          </div>
          <div>
            <Label htmlFor="subnet">Subnet Mask (CIDR)</Label>
            <Input
              id="subnet"
              value={subnet}
              onChange={(e) => setSubnet(e.target.value)}
              placeholder="24"
            />
          </div>
        </div>
        
        <Button onClick={calculateSubnet} className="w-full">
          Calculate Subnet
        </Button>

        {result && (
          <div className="mt-6">
            {result.error ? (
              <div className="flex items-center gap-2 text-red-600">
                <AlertCircle className="w-4 h-4" />
                {result.error}
              </div>
            ) : (
              <div className="grid gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">IP Address:</span>
                      <code className="bg-gray-100 px-2 py-1 rounded">{result.ip}</code>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Subnet Mask:</span>
                      <code className="bg-gray-100 px-2 py-1 rounded">{result.subnetMask}</code>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">CIDR Notation:</span>
                      <code className="bg-gray-100 px-2 py-1 rounded">{result.cidr}</code>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">IP Class:</span>
                      <Badge variant="outline">{result.ipClass}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Type:</span>
                      <Badge variant={result.isPrivate ? 'default' : 'secondary'}>
                        {result.isPrivate ? 'Private' : 'Public'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Network Address:</span>
                      <code className="bg-blue-100 px-2 py-1 rounded">{result.networkAddress}</code>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Broadcast Address:</span>
                      <code className="bg-red-100 px-2 py-1 rounded">{result.broadcastAddress}</code>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">First Host:</span>
                      <code className="bg-green-100 px-2 py-1 rounded">{result.firstHost}</code>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Last Host:</span>
                      <code className="bg-green-100 px-2 py-1 rounded">{result.lastHost}</code>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Usable Hosts:</span>
                      <Badge variant="default">{result.usableHosts.toLocaleString()}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function SubnetVisualizer() {
  const [bits, setBits] = useState(24);
  
  const generateSubnetInfo = (subnetBits: number) => {
    const hostBits = 32 - subnetBits;
    const totalHosts = Math.pow(2, hostBits);
    const usableHosts = totalHosts - 2;
    
    // Generate binary representation
    const networkBits = '1'.repeat(subnetBits) + '0'.repeat(hostBits);
    const binaryGroups = [];
    for (let i = 0; i < 4; i++) {
      binaryGroups.push(networkBits.slice(i * 8, (i + 1) * 8));
    }
    
    return {
      totalHosts,
      usableHosts,
      binaryGroups,
      subnetBits,
      hostBits
    };
  };

  const info = generateSubnetInfo(bits);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subnet Mask Visualizer</CardTitle>
        <CardDescription>See how subnet masks work in binary</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="bits">Subnet Bits: /{bits}</Label>
          <Input
            id="bits"
            type="range"
            min="8"
            max="30"
            value={bits}
            onChange={(e) => setBits(Number(e.target.value))}
            className="mt-2"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Network Information</h4>
            <div className="space-y-1 text-sm">
              <div>Subnet Bits: <Badge variant="default">{info.subnetBits}</Badge></div>
              <div>Host Bits: <Badge variant="secondary">{info.hostBits}</Badge></div>
              <div>Total Addresses: <Badge variant="outline">{info.totalHosts.toLocaleString()}</Badge></div>
              <div>Usable Hosts: <Badge variant="outline">{info.usableHosts.toLocaleString()}</Badge></div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Binary Representation</h4>
            <div className="space-y-1 font-mono text-sm">
              {info.binaryGroups.map((group, index) => (
                <div key={index} className="flex gap-1">
                  <span className="w-6">{index + 1}:</span>
                  {group.split('').map((bit, bitIndex) => (
                    <span
                      key={bitIndex}
                      className={`w-4 h-4 flex items-center justify-center text-xs rounded ${
                        bit === '1' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {bit}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <h4 className="font-medium mb-2">Legend</h4>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              Network bits (1)
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              Host bits (0)
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function IPAddressing() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            IP Addressing & Subnetting
          </CardTitle>
          <CardDescription>
            Learn about IP addresses, classes, and subnet calculations
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="classes" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="classes">IP Classes</TabsTrigger>
          <TabsTrigger value="private">Private IPs</TabsTrigger>
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="visualizer">Visualizer</TabsTrigger>
        </TabsList>

        <TabsContent value="classes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>IP Address Classes</CardTitle>
              <CardDescription>Traditional IP address classification system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Class</TableHead>
                      <TableHead>First Octet</TableHead>
                      <TableHead>IP Range</TableHead>
                      <TableHead>Default Mask</TableHead>
                      <TableHead>CIDR</TableHead>
                      <TableHead>Max Hosts</TableHead>
                      <TableHead>Typical Use</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ipClasses.map((ipClass) => (
                      <TableRow key={ipClass.class}>
                        <TableCell>
                          <Badge 
                            variant={ipClass.class <= 'C' ? 'default' : 'secondary'}
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                          >
                            {ipClass.class}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                            {ipClass.firstOctet}
                          </code>
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {ipClass.range}
                        </TableCell>
                        <TableCell>
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                            {ipClass.defaultMask}
                          </code>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{ipClass.cidr}</Badge>
                        </TableCell>
                        <TableCell>{ipClass.hosts}</TableCell>
                        <TableCell>{ipClass.use}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">Class A</CardTitle>
                <CardDescription>Large Networks</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-1">
                  <li>• 8 bits for network</li>
                  <li>• 24 bits for hosts</li>
                  <li>• 126 networks possible</li>
                  <li>• 16+ million hosts per network</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Class B</CardTitle>
                <CardDescription>Medium Networks</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-1">
                  <li>• 16 bits for network</li>
                  <li>• 16 bits for hosts</li>
                  <li>• 16,384 networks possible</li>
                  <li>• 65,534 hosts per network</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-purple-600">Class C</CardTitle>
                <CardDescription>Small Networks</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-1">
                  <li>• 24 bits for network</li>
                  <li>• 8 bits for hosts</li>
                  <li>• 2+ million networks possible</li>
                  <li>• 254 hosts per network</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="private" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Private IP Address Ranges</CardTitle>
              <CardDescription>IP addresses reserved for internal networks (RFC 1918)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {privateRanges.map((range) => (
                  <Card key={range.class}>
                    <CardContent className="pt-6">
                      <div className="grid md:grid-cols-3 gap-4 items-center">
                        <div>
                          <Badge variant="outline" className="mb-2">Class {range.class}</Badge>
                          <p className="font-mono text-sm">{range.range}</p>
                        </div>
                        <div>
                          <span className="font-medium text-sm">Address Range:</span>
                          <p className="font-mono text-sm text-muted-foreground">{range.addresses}</p>
                        </div>
                        <div>
                          <span className="font-medium text-sm">Common Use:</span>
                          <p className="text-sm text-muted-foreground">
                            {range.class === 'A' && 'Large enterprise networks'}
                            {range.class === 'B' && 'Medium business networks'}
                            {range.class === 'C' && 'Home and small office networks'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Special IP Addresses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Reserved Addresses</h4>
                  <ul className="text-sm space-y-1">
                    <li><code>0.0.0.0</code> - This network</li>
                    <li><code>127.0.0.1</code> - Loopback (localhost)</li>
                    <li><code>169.254.x.x</code> - Link-local (APIPA)</li>
                    <li><code>255.255.255.255</code> - Broadcast</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Multicast Ranges</h4>
                  <ul className="text-sm space-y-1">
                    <li><code>224.0.0.0/24</code> - Local network control</li>
                    <li><code>239.0.0.0/8</code> - Administratively scoped</li>
                    <li><code>233.0.0.0/8</code> - GLOP addressing</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculator">
          <IPAddressCalculator />
        </TabsContent>

        <TabsContent value="visualizer">
          <SubnetVisualizer />
        </TabsContent>
      </Tabs>
    </div>
  );
}