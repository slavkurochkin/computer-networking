import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Terminal, Activity, Globe, Search, Server, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const commonCommands = [
  {
    command: 'ping',
    syntax: 'ping [options] destination',
    description: 'Test network connectivity and measure round-trip time',
    examples: [
      'ping google.com',
      'ping -c 4 8.8.8.8',
      'ping -t 192.168.1.1'
    ],
    options: [
      { flag: '-c count', description: 'Stop after sending count packets' },
      { flag: '-t', description: 'Ping until stopped (Windows)' },
      { flag: '-i interval', description: 'Wait interval seconds between packets' },
      { flag: '-s size', description: 'Set packet size in bytes' }
    ]
  },
  {
    command: 'traceroute/tracert',
    syntax: 'traceroute [options] destination',
    description: 'Trace the path packets take to reach destination',
    examples: [
      'traceroute google.com',
      'tracert 8.8.8.8',
      'traceroute -m 15 example.com'
    ],
    options: [
      { flag: '-m max_hops', description: 'Set maximum number of hops' },
      { flag: '-w timeout', description: 'Set timeout in seconds' },
      { flag: '-I', description: 'Use ICMP echo requests' },
      { flag: '-T', description: 'Use TCP SYN packets' }
    ]
  },
  {
    command: 'nslookup',
    syntax: 'nslookup [options] domain [server]',
    description: 'Query DNS servers for domain name resolution',
    examples: [
      'nslookup google.com',
      'nslookup google.com 8.8.8.8',
      'nslookup -type=MX example.com'
    ],
    options: [
      { flag: '-type=record', description: 'Query specific record type (A, AAAA, MX, NS, TXT)' },
      { flag: 'server ip', description: 'Use specific DNS server' },
      { flag: '-debug', description: 'Show detailed information' }
    ]
  },
  {
    command: 'dig',
    syntax: 'dig [options] domain [record_type]',
    description: 'Flexible DNS lookup utility (Linux/Mac)',
    examples: [
      'dig google.com',
      'dig @8.8.8.8 example.com MX',
      'dig +trace example.com'
    ],
    options: [
      { flag: '@server', description: 'Query specific DNS server' },
      { flag: '+trace', description: 'Trace delegation path from root servers' },
      { flag: '+short', description: 'Show only the answer' },
      { flag: 'record_type', description: 'Specify record type (A, AAAA, MX, NS, TXT, etc.)' }
    ]
  },
  {
    command: 'netstat',
    syntax: 'netstat [options]',
    description: 'Display network connections and routing table',
    examples: [
      'netstat -an',
      'netstat -r',
      'netstat -p tcp'
    ],
    options: [
      { flag: '-a', description: 'Show all connections and listening ports' },
      { flag: '-n', description: 'Show numerical addresses' },
      { flag: '-r', description: 'Display routing table' },
      { flag: '-p protocol', description: 'Show connections for specific protocol' }
    ]
  },
  {
    command: 'telnet',
    syntax: 'telnet hostname port',
    description: 'Test port connectivity',
    examples: [
      'telnet google.com 80',
      'telnet 192.168.1.1 22',
      'telnet mail.example.com 25'
    ],
    options: [
      { flag: 'hostname', description: 'Target hostname or IP address' },
      { flag: 'port', description: 'Port number to test' }
    ]
  }
];

const publicDNSServers = [
  { name: 'Google DNS', primary: '8.8.8.8', secondary: '8.8.4.4', features: ['Fast', 'Reliable', 'No filtering'] },
  { name: 'Cloudflare DNS', primary: '1.1.1.1', secondary: '1.0.0.1', features: ['Privacy-focused', 'Fast', 'Malware protection'] },
  { name: 'Quad9', primary: '9.9.9.9', secondary: '149.112.112.112', features: ['Security filtering', 'Malware blocking', 'Privacy'] },
  { name: 'OpenDNS', primary: '208.67.222.222', secondary: '208.67.220.220', features: ['Content filtering', 'Phishing protection', 'Custom blocking'] },
  { name: 'Comodo Secure DNS', primary: '8.26.56.26', secondary: '8.20.247.20', features: ['Malware filtering', 'Phishing protection', 'Free'] }
];

const hostsFileExamples = [
  { os: 'Windows', path: 'C:\\Windows\\System32\\drivers\\etc\\hosts', editor: 'Run as Administrator' },
  { os: 'Linux', path: '/etc/hosts', editor: 'sudo nano /etc/hosts' },
  { os: 'macOS', path: '/etc/hosts', editor: 'sudo nano /etc/hosts' }
];

function PingSimulator() {
  const [target, setTarget] = useState('google.com');
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [currentPacket, setCurrentPacket] = useState(0);
  const [packetCount, setPacketCount] = useState(4);

  const runPing = () => {
    setIsRunning(true);
    setResults([]);
    setCurrentPacket(0);

    const interval = setInterval(() => {
      setCurrentPacket(prev => {
        const nextPacket = prev + 1;
        
        // Simulate ping response with realistic delays
        const delay = Math.floor(Math.random() * 50) + 10; // 10-60ms
        const success = Math.random() > 0.05; // 95% success rate
        
        const newResult = {
          packet: nextPacket,
          success,
          time: success ? `${delay}ms` : 'Request timeout',
          ttl: success ? Math.floor(Math.random() * 10) + 54 : null
        };

        setResults(prev => [...prev, newResult]);

        if (nextPacket >= packetCount) {
          clearInterval(interval);
          setIsRunning(false);
        }

        return nextPacket;
      });
    }, 1000);
  };

  const resetPing = () => {
    setResults([]);
    setCurrentPacket(0);
    setIsRunning(false);
  };

  const successfulPings = results.filter(r => r.success);
  const avgTime = successfulPings.length > 0 
    ? Math.round(successfulPings.reduce((sum, r) => sum + parseInt(r.time), 0) / successfulPings.length)
    : 0;

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-slate-700" />
          Ping Simulator
        </CardTitle>
        <CardDescription>Test network connectivity and latency</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="ping-target">Target Host</Label>
            <Input
              id="ping-target"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="google.com or 8.8.8.8"
              disabled={isRunning}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="packet-count">Packet Count</Label>
            <Input
              id="packet-count"
              type="number"
              value={packetCount}
              onChange={(e) => setPacketCount(parseInt(e.target.value) || 4)}
              min="1"
              max="10"
              disabled={isRunning}
              className="mt-1"
            />
          </div>
          <div className="flex items-end gap-2">
            <Button onClick={runPing} disabled={isRunning} className="flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              {isRunning ? 'Running...' : 'Start Ping'}
            </Button>
            <Button onClick={resetPing} variant="outline" disabled={isRunning}>
              Reset
            </Button>
          </div>
        </div>

        {isRunning && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-slate-600">
              <span>Progress</span>
              <span>Packet {currentPacket} of {packetCount}</span>
            </div>
            <Progress value={(currentPacket / packetCount) * 100} className="w-full" />
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-4">
            <div className="bg-slate-900 text-green-400 font-mono text-sm p-4 rounded-lg">
              <div className="mb-2">PING {target}</div>
              {results.map((result, index) => (
                <div key={index} className="flex items-center gap-2">
                  {result.success ? (
                    <CheckCircle className="w-3 h-3 text-green-400" />
                  ) : (
                    <XCircle className="w-3 h-3 text-red-400" />
                  )}
                  <span>
                    Reply from {target}: bytes=32 time={result.time}
                    {result.ttl && ` TTL=${result.ttl}`}
                  </span>
                </div>
              ))}
            </div>

            {!isRunning && results.length === packetCount && (
              <div className="grid md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-medium text-slate-900">{successfulPings.length}/{packetCount}</div>
                  <div className="text-sm text-slate-600">Packets Received</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-medium text-slate-900">{avgTime}ms</div>
                  <div className="text-sm text-slate-600">Average Time</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-medium text-slate-900">
                    {Math.round(((packetCount - successfulPings.length) / packetCount) * 100)}%
                  </div>
                  <div className="text-sm text-slate-600">Packet Loss</div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function TracerouteSimulator() {
  const [target, setTarget] = useState('google.com');
  const [isRunning, setIsRunning] = useState(false);
  const [hops, setHops] = useState<any[]>([]);
  const [currentHop, setCurrentHop] = useState(0);

  const runTraceroute = () => {
    setIsRunning(true);
    setHops([]);
    setCurrentHop(0);

    // Simulate realistic traceroute hops
    const simulatedHops = [
      { hop: 1, ip: '192.168.1.1', hostname: 'router.local', time1: '1ms', time2: '1ms', time3: '2ms' },
      { hop: 2, ip: '10.0.0.1', hostname: 'isp-gateway.net', time1: '8ms', time2: '7ms', time3: '9ms' },
      { hop: 3, ip: '203.0.113.1', hostname: 'core1.isp.net', time1: '15ms', time2: '14ms', time3: '16ms' },
      { hop: 4, ip: '198.51.100.1', hostname: 'peer-exchange.net', time1: '22ms', time2: '21ms', time3: '23ms' },
      { hop: 5, ip: '172.217.164.1', hostname: 'google-peer.net', time1: '18ms', time2: '19ms', time3: '17ms' },
      { hop: 6, ip: '142.250.191.14', hostname: target, time1: '16ms', time2: '15ms', time3: '17ms' }
    ];

    const interval = setInterval(() => {
      setCurrentHop(prev => {
        const nextHop = prev + 1;
        if (nextHop <= simulatedHops.length) {
          setHops(current => [...current, simulatedHops[nextHop - 1]]);
        }

        if (nextHop >= simulatedHops.length) {
          clearInterval(interval);
          setIsRunning(false);
        }

        return nextHop;
      });
    }, 1500);
  };

  const resetTraceroute = () => {
    setHops([]);
    setCurrentHop(0);
    setIsRunning(false);
  };

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-slate-700" />
          Traceroute Simulator
        </CardTitle>
        <CardDescription>Trace the path packets take through the network</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="trace-target">Target Host</Label>
            <Input
              id="trace-target"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="google.com"
              disabled={isRunning}
              className="mt-1"
            />
          </div>
          <div className="flex items-end gap-2">
            <Button onClick={runTraceroute} disabled={isRunning} className="flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              {isRunning ? 'Tracing...' : 'Start Trace'}
            </Button>
            <Button onClick={resetTraceroute} variant="outline" disabled={isRunning}>
              Reset
            </Button>
          </div>
        </div>

        {(isRunning || hops.length > 0) && (
          <div className="space-y-4">
            <div className="bg-slate-900 text-green-400 font-mono text-sm p-4 rounded-lg">
              <div className="mb-4">Tracing route to {target}</div>
              <div className="space-y-1">
                {hops.map((hop, index) => (
                  <div key={index} className="grid grid-cols-6 gap-2 items-center">
                    <div className="text-right">{hop.hop}</div>
                    <div>{hop.time1}</div>
                    <div>{hop.time2}</div>
                    <div>{hop.time3}</div>
                    <div className="col-span-2">{hop.hostname} [{hop.ip}]</div>
                  </div>
                ))}
                {isRunning && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Hop {currentHop + 1} - Waiting for reply...</span>
                  </div>
                )}
              </div>
            </div>

            {!isRunning && hops.length > 0 && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Trace Complete</h4>
                <p className="text-blue-700 text-sm">
                  Packets traveled through {hops.length} hops to reach {target}. 
                  Each hop represents a router or gateway in the network path.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function DNSLookupTool() {
  const [domain, setDomain] = useState('example.com');
  const [recordType, setRecordType] = useState('A');
  const [dnsServer, setDnsServer] = useState('8.8.8.8');
  const [isQuerying, setIsQuerying] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const runDNSQuery = () => {
    setIsQuerying(true);
    
    // Simulate DNS query with realistic responses
    setTimeout(() => {
      const mockResults = {
        'A': [
          { name: domain, ttl: 300, type: 'A', data: '93.184.216.34' },
          { name: domain, ttl: 300, type: 'A', data: '93.184.216.35' }
        ],
        'AAAA': [
          { name: domain, ttl: 300, type: 'AAAA', data: '2606:2800:220:1:248:1893:25c8:1946' }
        ],
        'MX': [
          { name: domain, ttl: 300, type: 'MX', data: '10 mail.example.com' },
          { name: domain, ttl: 300, type: 'MX', data: '20 mail2.example.com' }
        ],
        'NS': [
          { name: domain, ttl: 86400, type: 'NS', data: 'ns1.example.com' },
          { name: domain, ttl: 86400, type: 'NS', data: 'ns2.example.com' }
        ],
        'TXT': [
          { name: domain, ttl: 300, type: 'TXT', data: '"v=spf1 include:_spf.google.com ~all"' },
          { name: domain, ttl: 300, type: 'TXT', data: '"google-site-verification=abc123def456"' }
        ]
      };

      setResults(mockResults[recordType as keyof typeof mockResults] || []);
      setIsQuerying(false);
    }, 1000);
  };

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5 text-slate-700" />
          DNS Lookup Tool
        </CardTitle>
        <CardDescription>Query DNS records for any domain</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="dns-domain">Domain</Label>
            <Input
              id="dns-domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="example.com"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="record-type">Record Type</Label>
            <select
              id="record-type"
              value={recordType}
              onChange={(e) => setRecordType(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
            >
              <option value="A">A (IPv4)</option>
              <option value="AAAA">AAAA (IPv6)</option>
              <option value="MX">MX (Mail)</option>
              <option value="NS">NS (Name Server)</option>
              <option value="TXT">TXT (Text)</option>
            </select>
          </div>
          <div>
            <Label htmlFor="dns-server">DNS Server</Label>
            <select
              id="dns-server"
              value={dnsServer}
              onChange={(e) => setDnsServer(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
            >
              <option value="8.8.8.8">Google (8.8.8.8)</option>
              <option value="1.1.1.1">Cloudflare (1.1.1.1)</option>
              <option value="9.9.9.9">Quad9 (9.9.9.9)</option>
            </select>
          </div>
          <div className="flex items-end">
            <Button 
              onClick={runDNSQuery} 
              disabled={isQuerying} 
              className="w-full flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              {isQuerying ? 'Querying...' : 'Query'}
            </Button>
          </div>
        </div>

        {results.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium text-slate-900">DNS Query Results</h4>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>TTL</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono text-sm">{record.name}</TableCell>
                      <TableCell>{record.ttl}s</TableCell>
                      <TableCell>
                        <Badge variant="outline">{record.type}</Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{record.data}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function PortConnectivityTester() {
  const [host, setHost] = useState('google.com');
  const [port, setPort] = useState('80');
  const [isTesting, setIsTesting] = useState(false);
  const [result, setResult] = useState<any>(null);

  const commonPorts = [
    { port: 21, service: 'FTP', description: 'File Transfer Protocol' },
    { port: 22, service: 'SSH', description: 'Secure Shell' },
    { port: 23, service: 'Telnet', description: 'Telnet Protocol' },
    { port: 25, service: 'SMTP', description: 'Simple Mail Transfer Protocol' },
    { port: 53, service: 'DNS', description: 'Domain Name System' },
    { port: 80, service: 'HTTP', description: 'HyperText Transfer Protocol' },
    { port: 110, service: 'POP3', description: 'Post Office Protocol v3' },
    { port: 143, service: 'IMAP', description: 'Internet Message Access Protocol' },
    { port: 443, service: 'HTTPS', description: 'HTTP Secure' },
    { port: 993, service: 'IMAPS', description: 'IMAP over SSL' },
    { port: 995, service: 'POP3S', description: 'POP3 over SSL' }
  ];

  const testPort = () => {
    setIsTesting(true);
    setResult(null);

    // Simulate port connectivity test
    setTimeout(() => {
      const isOpen = Math.random() > 0.3; // 70% success rate for common ports
      const responseTime = Math.floor(Math.random() * 100) + 10;

      setResult({
        host,
        port: parseInt(port),
        isOpen,
        responseTime: isOpen ? responseTime : null,
        timestamp: new Date().toISOString()
      });
      setIsTesting(false);
    }, 2000);
  };

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Server className="w-5 h-5 text-slate-700" />
          Port Connectivity Tester
        </CardTitle>
        <CardDescription>Test if specific ports are open and accessible</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="test-host">Host</Label>
            <Input
              id="test-host"
              value={host}
              onChange={(e) => setHost(e.target.value)}
              placeholder="google.com or 192.168.1.1"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="test-port">Port</Label>
            <Input
              id="test-port"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              placeholder="80"
              type="number"
              min="1"
              max="65535"
              className="mt-1"
            />
          </div>
          <div className="flex items-end">
            <Button onClick={testPort} disabled={isTesting} className="w-full flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              {isTesting ? 'Testing...' : 'Test Port'}
            </Button>
          </div>
        </div>

        {isTesting && (
          <div className="text-center py-4">
            <div className="inline-flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm text-slate-600">Testing connection to {host}:{port}...</span>
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className={`p-4 rounded-lg border-l-4 ${
              result.isOpen 
                ? 'bg-green-50 border-l-green-500' 
                : 'bg-red-50 border-l-red-500'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {result.isOpen ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
                <h4 className={`font-medium ${
                  result.isOpen ? 'text-green-800' : 'text-red-800'
                }`}>
                  Port {result.port} is {result.isOpen ? 'OPEN' : 'CLOSED'}
                </h4>
              </div>
              <div className={`text-sm ${
                result.isOpen ? 'text-green-700' : 'text-red-700'
              }`}>
                {result.isOpen ? (
                  <p>Successfully connected to {result.host}:{result.port} in {result.responseTime}ms</p>
                ) : (
                  <p>Connection to {result.host}:{result.port} failed or timed out</p>
                )}
              </div>
            </div>
          </div>
        )}

        <div>
          <h4 className="font-medium text-slate-900 mb-3">Common Ports Reference</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {commonPorts.map((portInfo, index) => (
              <div 
                key={index} 
                className="p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => setPort(portInfo.port.toString())}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono font-medium text-sm">{portInfo.port}</span>
                  <Badge variant="outline" className="text-xs">{portInfo.service}</Badge>
                </div>
                <p className="text-xs text-slate-600">{portInfo.description}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function NetworkTroubleshooting() {
  return (
    <div className="space-y-6">
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-slate-700" />
            Network Troubleshooting Tools
          </CardTitle>
          <CardDescription>
            Master network diagnostics with interactive command-line tools and utilities
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="ping" className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-slate-100 text-xs sm:text-sm">
          <TabsTrigger value="ping" className="data-[state=active]:bg-white">Ping</TabsTrigger>
          <TabsTrigger value="traceroute" className="data-[state=active]:bg-white">Traceroute</TabsTrigger>
          <TabsTrigger value="dns" className="data-[state=active]:bg-white">DNS Tools</TabsTrigger>
          <TabsTrigger value="ports" className="data-[state=active]:bg-white">Port Testing</TabsTrigger>
          <TabsTrigger value="commands" className="data-[state=active]:bg-white">Commands</TabsTrigger>
          <TabsTrigger value="dns-config" className="data-[state=active]:bg-white">DNS Config</TabsTrigger>
        </TabsList>

        <TabsContent value="ping" className="space-y-6 mt-6">
          <PingSimulator />
        </TabsContent>

        <TabsContent value="traceroute" className="space-y-6 mt-6">
          <TracerouteSimulator />
        </TabsContent>

        <TabsContent value="dns" className="space-y-6 mt-6">
          <DNSLookupTool />
        </TabsContent>

        <TabsContent value="ports" className="space-y-6 mt-6">
          <PortConnectivityTester />
        </TabsContent>

        <TabsContent value="commands" className="space-y-6 mt-6">
          <div className="grid gap-6">
            {commonCommands.map((cmd, index) => (
              <Card key={index} className="border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Terminal className="w-5 h-5 text-slate-700" />
                    {cmd.command}
                  </CardTitle>
                  <CardDescription>{cmd.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Syntax</h4>
                    <code className="block bg-slate-100 p-2 rounded text-sm font-mono">{cmd.syntax}</code>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Examples</h4>
                    <div className="space-y-1">
                      {cmd.examples.map((example, exIndex) => (
                        <code key={exIndex} className="block bg-slate-50 p-2 rounded text-sm font-mono">
                          $ {example}
                        </code>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Common Options</h4>
                    <div className="space-y-2">
                      {cmd.options.map((option, optIndex) => (
                        <div key={optIndex} className="flex gap-3">
                          <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono flex-shrink-0">
                            {option.flag}
                          </code>
                          <span className="text-sm text-slate-600">{option.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced explanations for each command */}
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h5 className="font-medium text-blue-800 text-sm mb-2">How {cmd.command} Works</h5>
                    <div className="text-xs text-blue-700 space-y-2">
                      {cmd.command === 'ping' && (
                        <>
                          <p><strong>Protocol:</strong> Uses ICMP (Internet Control Message Protocol) Echo Request/Reply packets</p>
                          <p><strong>Process:</strong> Sends packets to destination and measures round-trip time (RTT)</p>
                          <p><strong>Use Cases:</strong> Test basic connectivity, measure latency, check packet loss</p>
                          <p><strong>Interpreting Results:</strong> TTL shows remaining hops, time shows network latency, timeouts indicate connectivity issues</p>
                          <p><strong>Limitations:</strong> Some firewalls block ICMP, so failed pings don't always mean the host is down</p>
                        </>
                      )}
                      {cmd.command === 'traceroute/tracert' && (
                        <>
                          <p><strong>Protocol:</strong> Uses UDP packets (Linux/Mac) or ICMP (Windows) with increasing TTL values</p>
                          <p><strong>Process:</strong> Sends packets with TTL=1, then TTL=2, etc. Each router decrements TTL and returns ICMP Time Exceeded when TTL reaches 0</p>
                          <p><strong>Use Cases:</strong> Identify routing path, locate network bottlenecks, troubleshoot routing issues</p>
                          <p><strong>Interpreting Results:</strong> Each line shows a hop (router), three time measurements show response times, * indicates timeout</p>
                          <p><strong>Limitations:</strong> Load balancing and firewalls can show inconsistent or incomplete paths</p>
                        </>
                      )}
                      {cmd.command === 'nslookup' && (
                        <>
                          <p><strong>Protocol:</strong> Uses DNS queries over UDP port 53 (or TCP for large responses)</p>
                          <p><strong>Process:</strong> Queries DNS servers for various record types (A, AAAA, MX, NS, TXT, etc.)</p>
                          <p><strong>Use Cases:</strong> Resolve domain names to IP addresses, check DNS records, verify DNS configuration</p>
                          <p><strong>Interpreting Results:</strong> Shows authoritative/non-authoritative answers, TTL values, and specific record data</p>
                          <p><strong>Interactive Mode:</strong> Run without arguments for interactive mode with commands like 'set type=MX'</p>
                        </>
                      )}
                      {cmd.command === 'dig' && (
                        <>
                          <p><strong>Advantages:</strong> More flexible and detailed than nslookup, better for scripting</p>
                          <p><strong>Output Sections:</strong> Header (query info), Question (what was asked), Answer (response), Authority (name servers), Additional (extra records)</p>
                          <p><strong>Query Types:</strong> Supports all DNS record types (A, AAAA, MX, NS, TXT, SOA, PTR, etc.)</p>
                          <p><strong>Trace Feature:</strong> +trace shows complete delegation path from root servers</p>
                          <p><strong>Scripting:</strong> +short provides minimal output perfect for scripts and automation</p>
                        </>
                      )}
                      {cmd.command === 'netstat' && (
                        <>
                          <p><strong>Purpose:</strong> Displays active network connections, listening ports, and routing table</p>
                          <p><strong>Connection States:</strong> ESTABLISHED (active), LISTENING (waiting for connections), TIME_WAIT (connection closing)</p>
                          <p><strong>Use Cases:</strong> Check what services are running, identify active connections, troubleshoot port conflicts</p>
                          <p><strong>Security:</strong> Helps identify unauthorized connections or services</p>
                          <p><strong>Modern Alternative:</strong> 'ss' command on Linux provides similar but faster functionality</p>
                        </>
                      )}
                      {cmd.command === 'telnet' && (
                        <>
                          <p><strong>Modern Usage:</strong> Primarily used for testing port connectivity, not for remote login (use SSH instead)</p>
                          <p><strong>How It Works:</strong> Establishes TCP connection to specified port, useful for testing if services are running</p>
                          <p><strong>Use Cases:</strong> Test HTTP (port 80), HTTPS (port 443), SMTP (port 25), SSH (port 22)</p>
                          <p><strong>Interpreting Results:</strong> Successful connection shows service banner, connection refused means port is closed, timeout suggests firewall blocking</p>
                          <p><strong>Alternatives:</strong> nc (netcat), nmap for more advanced port scanning</p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Troubleshooting scenarios */}
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h5 className="font-medium text-green-800 text-sm mb-2">Common Troubleshooting Scenarios</h5>
                    <div className="text-xs text-green-700 space-y-2">
                      {cmd.command === 'ping' && (
                        <>
                          <p><strong>High Latency:</strong> Network congestion, long physical distance, or overloaded router</p>
                          <p><strong>Packet Loss:</strong> Network congestion, faulty hardware, or unstable connection</p>
                          <p><strong>Ping Works but Service Doesn't:</strong> Service is down but host is up, firewall blocking specific ports</p>
                        </>
                      )}
                      {cmd.command === 'traceroute/tracert' && (
                        <>
                          <p><strong>Timeouts at Specific Hop:</strong> Router not responding to traceroute packets (may still forward traffic)</p>
                          <p><strong>High Latency at Hop:</strong> Congestion or long distance at that network segment</p>
                          <p><strong>Route Changes:</strong> Load balancing or routing updates causing different paths</p>
                        </>
                      )}
                      {(cmd.command === 'nslookup' || cmd.command === 'dig') && (
                        <>
                          <p><strong>NXDOMAIN Error:</strong> Domain doesn't exist, check spelling and domain registration</p>
                          <p><strong>No Response:</strong> DNS server unreachable, try different DNS server</p>
                          <p><strong>Wrong IP Address:</strong> DNS cache issue, try flushing DNS cache</p>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="dns-config" className="space-y-6 mt-6">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-slate-700" />
                Public DNS Servers
              </CardTitle>
              <CardDescription>Alternative DNS servers for improved performance and security</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {publicDNSServers.map((server, index) => (
                  <Card key={index} className="border border-slate-200">
                    <CardHeader>
                      <CardTitle className="text-base">{server.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-slate-600">Primary:</span>
                          <code className="ml-2 bg-slate-100 px-2 py-1 rounded font-mono text-xs">{server.primary}</code>
                        </div>
                        <div>
                          <span className="text-slate-600">Secondary:</span>
                          <code className="ml-2 bg-slate-100 px-2 py-1 rounded font-mono text-xs">{server.secondary}</code>
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-600 text-sm">Features:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {server.features.map((feature, fIndex) => (
                            <Badge key={fIndex} variant="outline" className="text-xs">{feature}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Changing DNS Settings</h4>
                <div className="text-xs text-blue-700 space-y-2">
                  <p><strong>Windows:</strong> Network Settings → Change Adapter Options → Properties → Internet Protocol Version 4 (TCP/IPv4) → Properties</p>
                  <p><strong>macOS:</strong> System Preferences → Network → Advanced → DNS → Add DNS servers</p>
                  <p><strong>Linux:</strong> Edit /etc/resolv.conf or use NetworkManager/systemd-resolved</p>
                  <p><strong>Router Level:</strong> Change DNS in router settings to affect all devices on network</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle>Hosts File Configuration</CardTitle>
              <CardDescription>Local DNS resolution configuration that bypasses DNS servers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  {hostsFileExamples.map((example, index) => (
                    <Card key={index} className="border border-slate-200">
                      <CardHeader>
                        <CardTitle className="text-base">{example.os}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div>
                          <span className="text-slate-600 text-sm">Location:</span>
                          <code className="block bg-slate-100 p-2 rounded text-xs font-mono mt-1">{example.path}</code>
                        </div>
                        <div>
                          <span className="text-slate-600 text-sm">Edit Command:</span>
                          <code className="block bg-slate-100 p-2 rounded text-xs font-mono mt-1">{example.editor}</code>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">Hosts File Format & Usage</h4>
                  <code className="block bg-yellow-100 p-3 rounded text-sm font-mono text-yellow-800 mb-3">
                    # This is a comment<br/>
                    127.0.0.1    localhost<br/>
                    192.168.1.100    myserver.local<br/>
                    10.0.0.5     database.internal api.internal
                  </code>
                  <div className="text-yellow-700 text-xs space-y-1">
                    <p><strong>Format:</strong> IP_ADDRESS    HOSTNAME [ADDITIONAL_HOSTNAMES]</p>
                    <p><strong>Priority:</strong> Hosts file is checked before DNS servers</p>
                    <p><strong>Use Cases:</strong> Block malicious domains (map to 127.0.0.1), create local development aliases, override DNS for testing</p>
                    <p><strong>Flush DNS Cache:</strong> After editing, flush DNS cache (ipconfig /flushdns on Windows, sudo dscacheutil -flushcache on macOS)</p>
                  </div>
                </div>
                
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-medium text-red-800 mb-2">Advanced DNS Troubleshooting</h4>
                  <div className="text-red-700 text-xs space-y-2">
                    <p><strong>DNS Cache Issues:</strong> Clear browser DNS cache (chrome://net-internals/#dns), flush system DNS cache</p>
                    <p><strong>TTL Problems:</strong> Check DNS record TTL values, wait for TTL expiration or flush cache</p>
                    <p><strong>Authoritative vs Recursive:</strong> Query authoritative name servers directly using dig @ns1.domain.com domain.com</p>
                    <p><strong>DNS Propagation:</strong> Use multiple DNS checkers worldwide to verify DNS changes have propagated</p>
                    <p><strong>DNSSEC Validation:</strong> Use dig +dnssec to check DNSSEC-signed domains</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}