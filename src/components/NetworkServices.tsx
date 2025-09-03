import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Globe, Server, Shield, ArrowRight, Clock, CheckCircle, AlertCircle, Lock, Network, Database, Users, Key, Award, Scale, Router, FileKey, TreePine, UserCheck, Folder, Settings } from 'lucide-react';

// Core Network Services Data
const dnsRecordTypes = [
  { type: 'A', description: 'Maps domain to IPv4 address', example: 'example.com → 192.0.2.1' },
  { type: 'AAAA', description: 'Maps domain to IPv6 address', example: 'example.com → 2001:db8::1' },
  { type: 'CNAME', description: 'Creates alias for another domain', example: 'www.example.com → example.com' },
  { type: 'MX', description: 'Specifies mail exchange servers', example: 'example.com → mail.example.com' },
  { type: 'NS', description: 'Defines authoritative name servers', example: 'example.com → ns1.example.com' },
  { type: 'TXT', description: 'Stores text information', example: 'example.com → "v=spf1 include:_spf.google.com"' },
  { type: 'PTR', description: 'Reverse DNS lookup', example: '192.0.2.1 → example.com' },
  { type: 'SOA', description: 'Start of Authority record', example: 'Contains zone information' }
];

const dhcpLeases = [
  { ip: '192.168.1.100', mac: '00:1A:2B:3C:4D:5E', hostname: 'laptop-001', leaseTime: '24 hours', status: 'Active' },
  { ip: '192.168.1.101', mac: '00:2B:3C:4D:5E:6F', hostname: 'phone-android', leaseTime: '12 hours', status: 'Active' },
  { ip: '192.168.1.102', mac: '00:3C:4D:5E:6F:7A', hostname: 'desktop-main', leaseTime: '24 hours', status: 'Reserved' },
  { ip: '192.168.1.103', mac: '00:4D:5E:6F:7A:8B', hostname: 'tablet-ipad', leaseTime: '6 hours', status: 'Expired' }
];

// Access & Connectivity Services Data
const vpnProtocols = [
  {
    name: 'OpenVPN',
    type: 'SSL/TLS VPN',
    security: 'Very High',
    speed: 'Medium',
    compatibility: 'Excellent',
    ports: '1194 (UDP), 443 (TCP)',
    features: ['Open source', 'Cross-platform', 'Highly configurable']
  },
  {
    name: 'IPSec',
    type: 'Network Layer VPN',
    security: 'Very High',
    speed: 'High',
    compatibility: 'Good',
    ports: '500 (IKE), 4500 (NAT-T)',
    features: ['Built into OS', 'Site-to-site', 'Tunnel/Transport mode']
  },
  {
    name: 'WireGuard',
    type: 'Modern VPN',
    security: 'Very High',
    speed: 'Very High',
    compatibility: 'Growing',
    ports: '51820 (UDP)',
    features: ['Simple configuration', 'High performance', 'Modern cryptography']
  }
];

const proxyTypes = [
  {
    type: 'Forward Proxy',
    description: 'Acts on behalf of clients to request resources from servers',
    useCases: ['Content filtering', 'Anonymous browsing', 'Caching'],
    features: ['Client anonymity', 'Access control', 'Bandwidth management'],
    example: 'Corporate firewall proxy filtering employee web access'
  },
  {
    type: 'Reverse Proxy',
    description: 'Acts on behalf of servers to handle client requests',
    useCases: ['Load balancing', 'SSL termination', 'Web acceleration'],
    features: ['Server protection', 'Load distribution', 'Caching'],
    example: 'Nginx proxy distributing requests to backend web servers'
  }
];

const loadBalancingAlgorithms = [
  {
    name: 'Round Robin',
    description: 'Distributes requests evenly across servers',
    pros: ['Simple', 'Even distribution'],
    cons: ['Ignores server load'],
    bestFor: 'Servers with similar capacity'
  },
  {
    name: 'Least Connections',
    description: 'Routes to server with fewest active connections',
    pros: ['Dynamic load awareness'],
    cons: ['Connection tracking overhead'],
    bestFor: 'Long-lived connections'
  },
  {
    name: 'IP Hash',
    description: 'Routes based on client IP hash',
    pros: ['Session persistence'],
    cons: ['Potential uneven distribution'],
    bestFor: 'Stateful applications'
  }
];

// Identity & Directory Services Data
const ldapOperations = [
  { operation: 'Bind', description: 'Authenticate to LDAP server', example: 'ldapwhoami -H ldap://server -D "cn=admin,dc=example,dc=com" -W' },
  { operation: 'Search', description: 'Query directory for entries', example: 'ldapsearch -x -H ldap://server -b "dc=example,dc=com" "(uid=john)"' },
  { operation: 'Add', description: 'Create new directory entry', example: 'ldapadd -x -H ldap://server -D "cn=admin,dc=example,dc=com" -W -f newuser.ldif' }
];

const certificateTypes = [
  {
    type: 'SSL/TLS Server Certificate',
    purpose: 'Authenticate web servers and encrypt HTTPS traffic',
    validity: '1-2 years',
    keyUsage: ['Digital Signature', 'Key Encipherment'],
    example: 'Website SSL certificate for secure e-commerce'
  },
  {
    type: 'Code Signing Certificate',
    purpose: 'Sign software and verify publisher identity',
    validity: '1-3 years',
    keyUsage: ['Digital Signature'],
    example: 'Software vendor signing application installers'
  },
  {
    type: 'Client Certificate',
    purpose: 'Authenticate users for network access',
    validity: '1-2 years',
    keyUsage: ['Digital Signature', 'Key Agreement'],
    example: 'Employee VPN authentication certificate'
  },
  {
    type: 'Root CA Certificate',
    purpose: 'Sign intermediate certificates in PKI hierarchy',
    validity: '10-20 years',
    keyUsage: ['Certificate Sign', 'CRL Sign'],
    example: 'Organization root certificate authority'
  }
];

// Core Network Services Components
function CoreNetworkServices() {
  return (
    <div className="space-y-6">
      <DNSService />
      <DHCPService />
      <IPAMService />
      <NTPService />
    </div>
  );
}

function DNSService() {
  const [domain, setDomain] = useState('www.example.com');
  const [isResolving, setIsResolving] = useState(false);
  const [resolutionSteps, setResolutionSteps] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const resolveDomain = () => {
    setIsResolving(true);
    setCurrentStep(0);
    
    const steps = [
      { step: 1, server: 'Local DNS Cache', query: domain, response: 'Cache miss', description: 'Check local DNS cache first' },
      { step: 2, server: 'Root Name Server', query: domain, response: 'Refer to .com TLD', description: 'Query root servers for TLD' },
      { step: 3, server: '.com TLD Server', query: domain, response: 'Refer to example.com NS', description: 'Query TLD for authoritative NS' },
      { step: 4, server: 'example.com NS', query: domain, response: '192.0.2.1', description: 'Get IP from authoritative server' },
      { step: 5, server: 'Local Cache', query: domain, response: 'Store 192.0.2.1', description: 'Cache result for future queries' }
    ];
    
    setResolutionSteps(steps);
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setIsResolving(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
  };

  const resetResolver = () => {
    setCurrentStep(0);
    setResolutionSteps([]);
    setIsResolving(false);
  };

  return (
    <div className="space-y-6">
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-slate-700" />
            Domain Name System (DNS)
          </CardTitle>
          <CardDescription>Translates human-readable domain names to IP addresses</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-3">
            <div className="flex-1">
              <Label htmlFor="domain">Domain Name</Label>
              <Input
                id="domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="www.example.com"
                className="mt-1"
              />
            </div>
            <div className="flex items-end gap-2">
              <Button onClick={resolveDomain} disabled={isResolving} className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Resolve
              </Button>
              <Button onClick={resetResolver} variant="outline">
                Reset
              </Button>
            </div>
          </div>

          {resolutionSteps.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Resolution Progress</span>
                <span>Step {currentStep + 1} of {resolutionSteps.length}</span>
              </div>
              <Progress value={(currentStep + 1) / resolutionSteps.length * 100} className="w-full" />

              <div className="space-y-3">
                {resolutionSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 transition-all ${
                      index === currentStep
                        ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-500'
                        : index < currentStep
                          ? 'bg-green-50 border-green-200'
                          : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        index === currentStep
                          ? 'bg-blue-500 text-white'
                          : index < currentStep
                            ? 'bg-green-500 text-white'
                            : 'bg-slate-300 text-slate-600'
                      }`}>
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-slate-900">{step.server}</h4>
                          {index === currentStep && isResolving && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-slate-600">Query:</span>
                          <code className="bg-slate-100 px-2 py-1 rounded text-xs">{step.query}</code>
                          <ArrowRight className="w-3 h-3 text-slate-400" />
                          <span className="text-slate-600">Response:</span>
                          <code className="bg-slate-100 px-2 py-1 rounded text-xs">{step.response}</code>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>DNS Record Types</CardTitle>
          <CardDescription>Common DNS record types and their purposes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Example</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dnsRecordTypes.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">{record.type}</Badge>
                    </TableCell>
                    <TableCell>{record.description}</TableCell>
                    <TableCell>
                      <code className="text-sm bg-slate-100 px-2 py-1 rounded">{record.example}</code>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DHCPService() {
  const [dhcpPool] = useState({
    startIP: '192.168.1.100',
    endIP: '192.168.1.200',
    subnetMask: '255.255.255.0',
    gateway: '192.168.1.1',
    dnsServers: '8.8.8.8, 8.8.4.4',
    leaseTime: '24 hours'
  });

  return (
    <div className="space-y-6">
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="w-5 h-5 text-slate-700" />
            Dynamic Host Configuration Protocol (DHCP)
          </CardTitle>
          <CardDescription>Automatically assigns IP addresses and network configuration to devices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-slate-900">Pool Configuration</h4>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm">Start IP</Label>
                    <Input value={dhcpPool.startIP} className="font-mono text-sm mt-1" readOnly />
                  </div>
                  <div>
                    <Label className="text-sm">End IP</Label>
                    <Input value={dhcpPool.endIP} className="font-mono text-sm mt-1" readOnly />
                  </div>
                </div>
                <div>
                  <Label className="text-sm">Subnet Mask</Label>
                  <Input value={dhcpPool.subnetMask} className="font-mono text-sm mt-1" readOnly />
                </div>
                <div>
                  <Label className="text-sm">Default Gateway</Label>
                  <Input value={dhcpPool.gateway} className="font-mono text-sm mt-1" readOnly />
                </div>
                <div>
                  <Label className="text-sm">DNS Servers</Label>
                  <Input value={dhcpPool.dnsServers} className="font-mono text-sm mt-1" readOnly />
                </div>
                <div>
                  <Label className="text-sm">Default Lease Time</Label>
                  <Input value={dhcpPool.leaseTime} className="text-sm mt-1" readOnly />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-slate-900">DHCP Process (DORA)</h4>
              <div className="space-y-3">
                <div className="border border-slate-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">1</div>
                    <span className="font-medium text-sm">Discover</span>
                  </div>
                  <p className="text-sm text-slate-600">Client broadcasts to find DHCP servers</p>
                </div>
                <div className="border border-slate-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">2</div>
                    <span className="font-medium text-sm">Offer</span>
                  </div>
                  <p className="text-sm text-slate-600">Server offers IP configuration</p>
                </div>
                <div className="border border-slate-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs">3</div>
                    <span className="font-medium text-sm">Request</span>
                  </div>
                  <p className="text-sm text-slate-600">Client requests specific configuration</p>
                </div>
                <div className="border border-slate-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs">4</div>
                    <span className="font-medium text-sm">Acknowledge</span>
                  </div>
                  <p className="text-sm text-slate-600">Server confirms lease assignment</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>Active DHCP Leases</CardTitle>
          <CardDescription>Current IP address assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>IP Address</TableHead>
                  <TableHead>MAC Address</TableHead>
                  <TableHead>Hostname</TableHead>
                  <TableHead>Lease Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dhcpLeases.map((lease, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <code className="bg-slate-100 px-2 py-1 rounded text-sm">{lease.ip}</code>
                    </TableCell>
                    <TableCell>
                      <code className="bg-slate-100 px-2 py-1 rounded text-sm">{lease.mac}</code>
                    </TableCell>
                    <TableCell>{lease.hostname}</TableCell>
                    <TableCell>{lease.leaseTime}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          lease.status === 'Active' ? 'default' : 
                          lease.status === 'Reserved' ? 'secondary' : 'destructive'
                        }
                      >
                        {lease.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function IPAMService() {
  const [ipamPools] = useState([
    {
      id: 1,
      name: 'Corporate LAN',
      network: '192.168.1.0/24',
      gateway: '192.168.1.1',
      totalIPs: 254,
      usedIPs: 147,
      reservedIPs: 25,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Guest Network',
      network: '172.16.10.0/24',
      gateway: '172.16.10.1',
      totalIPs: 254,
      usedIPs: 23,
      reservedIPs: 5,
      status: 'Active'
    }
  ]);

  const getUtilizationPercentage = (pool: typeof ipamPools[0]) => {
    return ((pool.usedIPs + pool.reservedIPs) / pool.totalIPs) * 100;
  };

  const getUtilizationColor = (percentage: number) => {
    if (percentage < 60) return 'text-green-600 bg-green-100';
    if (percentage < 85) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Network className="w-5 h-5 text-slate-700" />
          IP Address Management (IPAM)
        </CardTitle>
        <CardDescription>Centralized management of IP address allocation and network resources</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h4 className="font-medium text-slate-900">IP Pool Overview</h4>
          {ipamPools.map((pool) => {
            const utilization = getUtilizationPercentage(pool);
            return (
              <div
                key={pool.id}
                className="border rounded-lg p-4 border-slate-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-slate-900">{pool.name}</h4>
                    <code className="text-sm text-slate-600">{pool.network}</code>
                  </div>
                  <Badge variant={pool.status === 'Active' ? 'default' : 'secondary'}>
                    {pool.status}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Utilization</span>
                    <span className={`px-2 py-1 rounded text-xs ${getUtilizationColor(utilization)}`}>
                      {utilization.toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={utilization} className="h-2" />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Used: {pool.usedIPs}</span>
                    <span>Reserved: {pool.reservedIPs}</span>
                    <span>Available: {pool.totalIPs - pool.usedIPs - pool.reservedIPs}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function NTPService() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeOffset, setTimeOffset] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const syncTime = () => {
    const newOffset = (Math.random() - 0.5) * 1000;
    setTimeOffset(newOffset);
  };

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-slate-700" />
          Network Time Protocol (NTP)
        </CardTitle>
        <CardDescription>Precise time synchronization across network infrastructure</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="text-center py-6">
              <div className="text-3xl font-mono text-slate-900 mb-2">
                {currentTime.toLocaleTimeString()}
              </div>
              <div className="text-sm text-slate-600">
                {currentTime.toLocaleDateString()}
              </div>
              <div className="mt-4">
                <Badge variant={Math.abs(timeOffset) < 100 ? 'default' : 'destructive'}>
                  Offset: {timeOffset >= 0 ? '+' : ''}{timeOffset.toFixed(0)}ms
                </Badge>
              </div>
            </div>
            <Button onClick={syncTime} className="w-full">
              <Clock className="w-4 h-4 mr-2" />
              Sync Time
            </Button>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-slate-900">NTP Server Hierarchy</h4>
            <div className="space-y-2">
              <div className="border border-slate-200 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">Stratum 0</span>
                  <Badge variant="outline">Reference Clocks</Badge>
                </div>
                <p className="text-sm text-slate-600 mt-1">Atomic clocks, GPS receivers</p>
              </div>
              <div className="border border-slate-200 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">Stratum 1</span>
                  <Badge variant="default">Primary Servers</Badge>
                </div>
                <p className="text-sm text-slate-600 mt-1">time.nist.gov, time.google.com</p>
              </div>
              <div className="border border-slate-200 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">Stratum 2-15</span>
                  <Badge variant="secondary">Secondary Servers</Badge>
                </div>
                <p className="text-sm text-slate-600 mt-1">pool.ntp.org, regional servers</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Access & Connectivity Services
function AccessConnectivityServices() {
  return (
    <div className="space-y-6">
      <VPNService />
      <ProxyService />
      <LoadBalancerService />
    </div>
  );
}

function VPNService() {
  const [selectedVPN, setSelectedVPN] = useState(vpnProtocols[0]);

  return (
    <div className="space-y-6">
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-slate-700" />
            Virtual Private Network (VPN)
          </CardTitle>
          <CardDescription>Secure encrypted tunnels for remote network access</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-3 gap-6">
            {vpnProtocols.map((vpn, index) => (
              <Card 
                key={index}
                className={`cursor-pointer transition-all border-slate-200 hover:border-slate-300 ${
                  selectedVPN.name === vpn.name ? 'ring-2 ring-blue-500 border-blue-300' : ''
                }`}
                onClick={() => setSelectedVPN(vpn)}
              >
                <CardHeader>
                  <CardTitle className="text-base">{vpn.name}</CardTitle>
                  <CardDescription>{vpn.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-slate-600">Security:</span>
                        <Badge variant="outline" className="ml-2 text-xs">{vpn.security}</Badge>
                      </div>
                      <div>
                        <span className="text-slate-600">Speed:</span>
                        <Badge variant="outline" className="ml-2 text-xs">{vpn.speed}</Badge>
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-600 text-sm">Ports:</span>
                      <code className="bg-slate-100 px-2 py-1 rounded text-xs ml-2">{vpn.ports}</code>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {vpn.features.map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedVPN && (
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle>{selectedVPN.name} Configuration</CardTitle>
            <CardDescription>Typical setup for {selectedVPN.name} deployment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <div className="text-green-400"># {selectedVPN.name} Server Configuration</div>
              <div className="mt-2">
                <div className="text-blue-400">port</div> {selectedVPN.ports.split(',')[0].split(' ')[0]}
              </div>
              <div>
                <div className="text-blue-400">proto</div> {selectedVPN.ports.includes('UDP') ? 'udp' : 'tcp'}
              </div>
              <div>
                <div className="text-blue-400">dev</div> tun
              </div>
              <div>
                <div className="text-blue-400">server</div> 10.8.0.0 255.255.255.0
              </div>
              <div className="text-slate-400"># Additional security configurations...</div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function ProxyService() {
  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Server className="w-5 h-5 text-slate-700" />
          Proxy Servers
        </CardTitle>
        <CardDescription>Intermediary servers for client-server communications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {proxyTypes.map((proxy, index) => (
            <Card key={index} className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-base">{proxy.type}</CardTitle>
                <CardDescription>{proxy.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-slate-900 text-sm mb-2">Use Cases:</h5>
                    <div className="flex flex-wrap gap-1">
                      {proxy.useCases.map((useCase, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {useCase}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-slate-900 text-sm mb-2">Features:</h5>
                    <ul className="space-y-1">
                      {proxy.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <h5 className="font-medium text-slate-900 text-sm mb-1">Example:</h5>
                    <p className="text-xs text-slate-600">{proxy.example}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function LoadBalancerService() {
  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-slate-700" />
          Load Balancers
        </CardTitle>
        <CardDescription>Distribute incoming requests across multiple servers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-slate-900 mb-4">Load Balancing Algorithms</h4>
            <div className="grid md:grid-cols-3 gap-4">
              {loadBalancingAlgorithms.map((algorithm, index) => (
                <Card key={index} className="border-slate-200">
                  <CardHeader>
                    <CardTitle className="text-sm">{algorithm.name}</CardTitle>
                    <CardDescription className="text-xs">{algorithm.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h6 className="font-medium text-slate-900 text-xs mb-1">Best For:</h6>
                        <p className="text-xs text-slate-600">{algorithm.bestFor}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <h6 className="font-medium text-green-700 text-xs mb-1">Pros:</h6>
                          {algorithm.pros.map((pro, idx) => (
                            <div key={idx} className="text-xs text-green-600 flex items-start gap-1">
                              <CheckCircle className="w-2.5 h-2.5 mt-0.5 flex-shrink-0" />
                              {pro}
                            </div>
                          ))}
                        </div>
                        <div>
                          <h6 className="font-medium text-red-700 text-xs mb-1">Cons:</h6>
                          {algorithm.cons.map((con, idx) => (
                            <div key={idx} className="text-xs text-red-600 flex items-start gap-1">
                              <AlertCircle className="w-2.5 h-2.5 mt-0.5 flex-shrink-0" />
                              {con}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Identity & Directory Services
function IdentityDirectoryServices() {
  return (
    <div className="space-y-6">
      <LDAPService />
      <ActiveDirectoryService />
      <PKIService />
    </div>
  );
}

function LDAPService() {
  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TreePine className="w-5 h-5 text-slate-700" />
          Lightweight Directory Access Protocol (LDAP)
        </CardTitle>
        <CardDescription>Directory service protocol for accessing and maintaining distributed directory information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-slate-900">LDAP Operations</h4>
            <div className="space-y-3">
              {ldapOperations.map((operation, index) => (
                <Card key={index} className="border-slate-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Badge variant="outline" className="font-mono text-xs">{operation.operation}</Badge>
                      {operation.operation}
                    </CardTitle>
                    <CardDescription className="text-xs">{operation.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="bg-slate-900 text-slate-100 p-3 rounded font-mono text-xs overflow-x-auto">
                      {operation.example}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-slate-900">Directory Structure (DIT)</h4>
            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="font-mono text-sm space-y-2">
                <div className="text-blue-600">dc=example,dc=com</div>
                <div className="ml-4 text-green-600">├── ou=users</div>
                <div className="ml-8 text-slate-600">├── uid=john</div>
                <div className="ml-8 text-slate-600">└── uid=jane</div>
                <div className="ml-4 text-green-600">├── ou=groups</div>
                <div className="ml-8 text-slate-600">├── cn=admins</div>
                <div className="ml-8 text-slate-600">└── cn=users</div>
                <div className="ml-4 text-green-600">└── ou=services</div>
                <div className="ml-8 text-slate-600">├── cn=email</div>
                <div className="ml-8 text-slate-600">└── cn=web</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h5 className="font-medium text-slate-900 text-sm">Common Attributes</h5>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="p-2 bg-slate-100 rounded">
                  <code className="text-blue-600">cn</code> - Common Name
                </div>
                <div className="p-2 bg-slate-100 rounded">
                  <code className="text-blue-600">uid</code> - User ID
                </div>
                <div className="p-2 bg-slate-100 rounded">
                  <code className="text-blue-600">ou</code> - Organizational Unit
                </div>
                <div className="p-2 bg-slate-100 rounded">
                  <code className="text-blue-600">dc</code> - Domain Component
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ActiveDirectoryService() {
  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-slate-700" />
          Active Directory (AD)
        </CardTitle>
        <CardDescription>Microsoft's directory service for Windows domain networks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-slate-900">AD Components</h4>
            <div className="space-y-3">
              <div className="border border-slate-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Folder className="w-4 h-4 text-blue-500" />
                  <span className="font-medium text-sm">Domain</span>
                </div>
                <p className="text-sm text-slate-600">Administrative boundary for users and computers</p>
              </div>
              <div className="border border-slate-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <TreePine className="w-4 h-4 text-green-500" />
                  <span className="font-medium text-sm">Forest</span>
                </div>
                <p className="text-sm text-slate-600">Collection of one or more domains sharing schema</p>
              </div>
              <div className="border border-slate-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Settings className="w-4 h-4 text-purple-500" />
                  <span className="font-medium text-sm">Organizational Unit</span>
                </div>
                <p className="text-sm text-slate-600">Container for organizing objects within domain</p>
              </div>
              <div className="border border-slate-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Server className="w-4 h-4 text-orange-500" />
                  <span className="font-medium text-sm">Domain Controller</span>
                </div>
                <p className="text-sm text-slate-600">Server hosting AD database and services</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-slate-900">AD Services</h4>
            <div className="space-y-3">
              <div className="p-3 border border-slate-200 rounded-lg">
                <h5 className="font-medium text-sm text-slate-900 mb-2">Group Policy</h5>
                <p className="text-xs text-slate-600">Centralized management of user and computer settings</p>
                <Badge variant="outline" className="mt-2 text-xs">Configuration Management</Badge>
              </div>
              <div className="p-3 border border-slate-200 rounded-lg">
                <h5 className="font-medium text-sm text-slate-900 mb-2">Kerberos Authentication</h5>
                <p className="text-xs text-slate-600">Secure authentication protocol for network services</p>
                <Badge variant="outline" className="mt-2 text-xs">Single Sign-On</Badge>
              </div>
              <div className="p-3 border border-slate-200 rounded-lg">
                <h5 className="font-medium text-sm text-slate-900 mb-2">DNS Integration</h5>
                <p className="text-xs text-slate-600">Dynamic DNS updates and service location</p>
                <Badge variant="outline" className="mt-2 text-xs">Name Resolution</Badge>
              </div>
              <div className="p-3 border border-slate-200 rounded-lg">
                <h5 className="font-medium text-sm text-slate-900 mb-2">SYSVOL Replication</h5>
                <p className="text-xs text-slate-600">Distributed file system for Group Policy data</p>
                <Badge variant="outline" className="mt-2 text-xs">Policy Distribution</Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PKIService() {
  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileKey className="w-5 h-5 text-slate-700" />
          Public Key Infrastructure (PKI) / Certificate Services
        </CardTitle>
        <CardDescription>Framework for managing digital certificates and public-key encryption</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-slate-900 mb-4">Certificate Types</h4>
            <div className="grid md:grid-cols-2 gap-4">
              {certificateTypes.map((cert, index) => (
                <Card key={index} className="border-slate-200">
                  <CardHeader>
                    <CardTitle className="text-sm">{cert.type}</CardTitle>
                    <CardDescription className="text-xs">{cert.purpose}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Validity:</span>
                        <Badge variant="outline" className="text-xs">{cert.validity}</Badge>
                      </div>
                      <div>
                        <span className="text-slate-600 text-sm">Key Usage:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {cert.keyUsage.map((usage, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {usage}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="p-2 bg-slate-50 rounded text-xs text-slate-600">
                        <strong>Example:</strong> {cert.example}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-slate-900 mb-4">PKI Hierarchy</h4>
            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-red-100 border border-red-200 rounded">
                  <Award className="w-5 h-5 text-red-600" />
                  <div>
                    <div className="font-medium text-sm text-red-800">Root Certificate Authority</div>
                    <div className="text-xs text-red-600">Self-signed, highest trust level</div>
                  </div>
                </div>
                <div className="ml-6 flex items-center gap-3 p-3 bg-orange-100 border border-orange-200 rounded">
                  <Key className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="font-medium text-sm text-orange-800">Intermediate CA</div>
                    <div className="text-xs text-orange-600">Signed by Root CA, issues end-entity certificates</div>
                  </div>
                </div>
                <div className="ml-12 flex items-center gap-3 p-3 bg-green-100 border border-green-200 rounded">
                  <Lock className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium text-sm text-green-800">End-Entity Certificates</div>
                    <div className="text-xs text-green-600">Server, client, and code signing certificates</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function NetworkServices() {
  return (
    <div className="space-y-6">
      <Card className="border-slate-200">
        <CardHeader className="text-center pb-6">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl text-slate-900">
            <Globe className="w-6 h-6 text-slate-700" />
            Network Services
          </CardTitle>
          <CardDescription className="text-base text-slate-600 max-w-3xl mx-auto">
            Essential network services that provide core functionality for enterprise networks, secure connectivity, and identity management
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="core" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-100">
          <TabsTrigger value="core" className="data-[state=active]:bg-white">
            <Server className="w-4 h-4 mr-2" />
            Core Network Services
          </TabsTrigger>
          <TabsTrigger value="access" className="data-[state=active]:bg-white">
            <Shield className="w-4 h-4 mr-2" />
            Access & Connectivity
          </TabsTrigger>
          <TabsTrigger value="identity" className="data-[state=active]:bg-white">
            <Users className="w-4 h-4 mr-2" />
            Identity & Directory
          </TabsTrigger>
        </TabsList>

        <TabsContent value="core" className="space-y-6 mt-6">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-slate-700" />
                Core Network Services
              </CardTitle>
              <CardDescription>
                Fundamental services that provide basic network functionality including name resolution, 
                address assignment, IP management, and time synchronization
              </CardDescription>
            </CardHeader>
          </Card>
          <CoreNetworkServices />
        </TabsContent>

        <TabsContent value="access" className="space-y-6 mt-6">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Router className="w-5 h-5 text-slate-700" />
                Access & Connectivity Services
              </CardTitle>
              <CardDescription>
                Services that provide secure remote access, traffic distribution, and intermediary 
                communication including VPN, proxy servers, and load balancers
              </CardDescription>
            </CardHeader>
          </Card>
          <AccessConnectivityServices />
        </TabsContent>

        <TabsContent value="identity" className="space-y-6 mt-6">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-slate-700" />
                Identity & Directory Services
              </CardTitle>
              <CardDescription>
                Services that manage user identities, authentication, authorization, and digital 
                certificates including LDAP, Active Directory, and PKI infrastructure
              </CardDescription>
            </CardHeader>
          </Card>
          <IdentityDirectoryServices />
        </TabsContent>
      </Tabs>
    </div>
  );
}