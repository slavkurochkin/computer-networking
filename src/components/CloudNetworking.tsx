import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Cloud, Server, Database, Shield, Globe, Calculator, Layers } from 'lucide-react';

const serviceModels = [
  {
    name: 'Infrastructure as a Service (IaaS)',
    acronym: 'IaaS',
    description: 'Virtualized computing resources over the internet',
    responsibility: 'Provider manages: Hardware, Virtualization, Networking, Storage',
    userManages: 'Operating Systems, Middleware, Runtime, Data, Applications',
    examples: ['Amazon EC2', 'Google Compute Engine', 'Microsoft Azure VMs', 'DigitalOcean Droplets'],
    useCases: ['Web hosting', 'Development environments', 'Backup and recovery', 'High-performance computing'],
    color: 'bg-blue-100 border-blue-200'
  },
  {
    name: 'Platform as a Service (PaaS)',
    acronym: 'PaaS',
    description: 'Development platform and tools delivered as a service',
    responsibility: 'Provider manages: Hardware, OS, Middleware, Runtime',
    userManages: 'Data, Applications, Configuration',
    examples: ['Heroku', 'Google App Engine', 'AWS Elastic Beanstalk', 'Microsoft Azure App Service'],
    useCases: ['Application development', 'API management', 'Database management', 'Business analytics'],
    color: 'bg-green-100 border-green-200'
  },
  {
    name: 'Software as a Service (SaaS)',
    acronym: 'SaaS',
    description: 'Complete software applications delivered over the internet',
    responsibility: 'Provider manages: Everything (Hardware to Application)',
    userManages: 'User data and configuration only',
    examples: ['Gmail', 'Salesforce', 'Office 365', 'Dropbox', 'Slack'],
    useCases: ['Email', 'Customer relationship management', 'Collaboration', 'Document editing'],
    color: 'bg-purple-100 border-purple-200'
  },
  {
    name: 'Function as a Service (FaaS)',
    acronym: 'FaaS',
    description: 'Event-driven serverless computing execution model',
    responsibility: 'Provider manages: All infrastructure and scaling',
    userManages: 'Function code only',
    examples: ['AWS Lambda', 'Google Cloud Functions', 'Azure Functions', 'Vercel Functions'],
    useCases: ['Event processing', 'API backends', 'Data transformation', 'Automation tasks'],
    color: 'bg-orange-100 border-orange-200'
  }
];

const cloudDeploymentModels = [
  {
    name: 'Public Cloud',
    description: 'Services offered over the public internet and available to anyone',
    characteristics: ['Owned by cloud provider', 'Shared infrastructure', 'Pay-per-use model', 'Highly scalable'],
    advantages: ['Lower costs', 'No maintenance', 'High reliability', 'Unlimited scalability'],
    disadvantages: ['Less control', 'Security concerns', 'Compliance issues', 'Internet dependency'],
    examples: ['AWS', 'Google Cloud', 'Microsoft Azure']
  },
  {
    name: 'Private Cloud',
    description: 'Dedicated cloud infrastructure for a single organization',
    characteristics: ['Exclusive use', 'On-premises or hosted', 'Customizable', 'Enhanced security'],
    advantages: ['Full control', 'Enhanced security', 'Compliance friendly', 'Customization'],
    disadvantages: ['Higher costs', 'Maintenance required', 'Limited scalability', 'Technical expertise needed'],
    examples: ['VMware vSphere', 'OpenStack', 'Microsoft System Center']
  },
  {
    name: 'Hybrid Cloud',
    description: 'Combination of public and private clouds with orchestration',
    characteristics: ['Mixed deployment', 'Data portability', 'Workload flexibility', 'Unified management'],
    advantages: ['Flexibility', 'Cost optimization', 'Security options', 'Scalability'],
    disadvantages: ['Complex management', 'Integration challenges', 'Security complexity', 'Skill requirements'],
    examples: ['AWS Outposts', 'Azure Arc', 'Google Anthos']
  },
  {
    name: 'Multi-Cloud',
    description: 'Use of multiple cloud computing services from different providers',
    characteristics: ['Multiple providers', 'Best-of-breed approach', 'Vendor diversity', 'Distributed workloads'],
    advantages: ['Avoid vendor lock-in', 'Best service selection', 'Risk distribution', 'Geographic coverage'],
    disadvantages: ['Complex management', 'Integration challenges', 'Increased costs', 'Skills requirements'],
    examples: ['AWS + Azure', 'GCP + AWS', 'Multi-region deployments']
  }
];

const ipv6Features = [
  {
    feature: 'Address Space',
    ipv4: '32-bit (4.3 billion addresses)',
    ipv6: '128-bit (340 undecillion addresses)',
    benefit: 'Virtually unlimited addresses for IoT and mobile devices'
  },
  {
    feature: 'Address Format',
    ipv4: 'Dotted decimal (192.168.1.1)',
    ipv6: 'Hexadecimal groups (2001:db8::1)',
    benefit: 'More compact representation for large addresses'
  },
  {
    feature: 'Header Size',
    ipv4: 'Variable (20-60 bytes)',
    ipv6: 'Fixed (40 bytes)',
    benefit: 'Improved processing efficiency'
  },
  {
    feature: 'Fragmentation',
    ipv4: 'Router and sender fragmentation',
    ipv6: 'Sender-only fragmentation',
    benefit: 'Reduced router processing overhead'
  },
  {
    feature: 'Auto-configuration',
    ipv4: 'DHCP required',
    ipv6: 'Built-in SLAAC support',
    benefit: 'Simplified network configuration'
  },
  {
    feature: 'Security',
    ipv4: 'IPSec optional',
    ipv6: 'IPSec built-in (originally)',
    benefit: 'Enhanced security by design'
  }
];

function CloudServiceComparison() {
  const [selectedService, setSelectedService] = useState('IaaS');

  return (
    <div className="space-y-6">
      <Card className="border-slate-200">
        <CardHeader className="pb-8">
          <CardTitle>Cloud Service Models</CardTitle>
          <CardDescription>Understanding different levels of cloud services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {serviceModels.map((service) => (
              <Button
                key={service.acronym}
                variant={selectedService === service.acronym ? "default" : "outline"}
                className={`h-auto p-4 text-left justify-start ${selectedService === service.acronym ? '' : 'border-slate-300'}`}
                onClick={() => setSelectedService(service.acronym)}
              >
                <div>
                  <div className="font-medium">{service.acronym}</div>
                  <div className="text-xs opacity-75 mt-1">{service.name}</div>
                </div>
              </Button>
            ))}
          </div>

          {serviceModels.filter(service => service.acronym === selectedService).map((service) => (
            <Card key={service.acronym} className={`border-2 ${service.color}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="w-5 h-5" />
                  {service.name}
                </CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Provider Responsibility</h4>
                    <p className="text-sm text-slate-600">{service.responsibility}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">User Responsibility</h4>
                    <p className="text-sm text-slate-600">{service.userManages}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-slate-900 mb-2">Examples</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.examples.map((example, index) => (
                      <Badge key={index} variant="secondary">{example}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-slate-900 mb-2">Common Use Cases</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    {service.useCases.map((useCase, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                        {useCase}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardHeader className="pb-8">
          <CardTitle>Shared Responsibility Model</CardTitle>
          <CardDescription>Understanding security and management responsibilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="relative overflow-x-auto">
              <div className="min-w-[600px]">
                <div className="grid grid-cols-4 gap-3 h-80">
                  {/* IaaS Column */}
                  <div className="space-y-2">
                    <div className="text-center font-medium text-sm mb-3 py-2">IaaS</div>
                    <div className="bg-red-200 p-1.5 text-xs text-center h-7 flex items-center justify-center rounded border">Applications</div>
                    <div className="bg-red-200 p-1.5 text-xs text-center h-7 flex items-center justify-center rounded border">Data</div>
                    <div className="bg-red-200 p-1.5 text-xs text-center h-7 flex items-center justify-center rounded border">Runtime</div>
                    <div className="bg-red-200 p-1.5 text-xs text-center h-7 flex items-center justify-center rounded border">Middleware</div>
                    <div className="bg-red-200 p-1.5 text-xs text-center h-7 flex items-center justify-center rounded border">OS</div>
                    <div className="bg-blue-200 p-1.5 text-xs text-center h-7 flex items-center justify-center rounded border">Virtualization</div>
                    <div className="bg-blue-200 p-1.5 text-xs text-center h-7 flex items-center justify-center rounded border">Servers</div>
                    <div className="bg-blue-200 p-1.5 text-xs text-center h-7 flex items-center justify-center rounded border">Storage</div>
                    <div className="bg-blue-200 p-1.5 text-xs text-center h-7 flex items-center justify-center rounded border">Networking</div>
                  </div>

                  {/* PaaS Column */}
                  <div className="space-y-2">
                    <div className="text-center font-medium text-sm mb-3 py-2">PaaS</div>
                    <div className="bg-red-200 p-1.5 text-xs text-center h-7 flex items-center justify-center rounded border">Applications</div>
                    <div className="bg-red-200 p-1.5 text-xs text-center h-7 flex items-center justify-center rounded border">Data</div>
                    <div className="bg-blue-200 p-1.5 text-xs text-center h-7 flex items-center justify-center rounded border">Runtime</div>
                    <div className="bg-blue-200 p-1.5 text-xs text-center h-7 flex items-center justify-center rounded border">Middleware</div>
                    <div className="bg-blue-200 p-1.5 text-xs text-center h-7 flex items-center justify-center rounded border">OS</div>
                    <div className="bg-blue-200 p-1.5 text-xs text-center h-7 flex items-center justify-center rounded border">Virtualization</div>
                    <div className="bg-blue-200 p-1.5 text-xs text-center h-7 flex items-center justify-center rounded border">Servers</div>
                    <div className="bg-blue-200 p-1.5 text-xs text-center h-7 flex items-center justify-center rounded border">Storage</div>
                    <div className="bg-blue-200 p-1.5 text-xs text-center h-7 flex items-center justify-center rounded border">Networking</div>
                  </div>

                  {/* SaaS Column */}
                  <div className="space-y-2">
                    <div className="text-center font-medium text-sm mb-3 py-2">SaaS</div>
                    <div className="bg-blue-200 p-1.5 text-xs text-center h-7 flex items-center justify-center rounded border">Applications</div>
                    <div className="bg-red-200 p-1.5 text-xs text-center h-7 flex items-center justify-center rounded border">Data</div>
                    <div className="bg-blue-200 p-1.5 text-xs text-center h-7 flex items-center justify-center rounded border">Runtime</div>
                    <div className="bg-blue-200 p-1.5 text-xs text-center h-7 flex items-center justify-center rounded border">Middleware</div>
                    <div className="bg-blue-200 p-1.5 text-xs text-center h-7 flex items-center justify-center rounded border">OS</div>
                    <div className="bg-blue-200 p-1.5 text-xs text-center h-7 flex items-center justify-center rounded border">Virtualization</div>
                    <div className="bg-blue-200 p-1.5 text-xs text-center h-7 flex items-center justify-center rounded border">Servers</div>
                    <div className="bg-blue-200 p-1.5 text-xs text-center h-7 flex items-center justify-center rounded border">Storage</div>
                    <div className="bg-blue-200 p-1.5 text-xs text-center h-7 flex items-center justify-center rounded border">Networking</div>
                  </div>

                  {/* On-Premise Column */}
                  <div className="space-y-2">
                    <div className="text-center font-medium text-sm mb-3 py-2">On-Premise</div>
                    <div className="bg-red-200 p-1.5 text-xs text-center h-7 flex items-center justify-center rounded border">Applications</div>
                    <div className="bg-red-200 p-1.5 text-xs text-center h-7 flex items-center justify-center rounded border">Data</div>
                    <div className="bg-red-200 p-1.5 text-xs text-center h-7 flex items-center justify-center rounded border">Runtime</div>
                    <div className="bg-red-200 p-1.5 text-xs text-center h-7 flex items-center justify-center rounded border">Middleware</div>
                    <div className="bg-red-200 p-1.5 text-xs text-center h-7 flex items-center justify-center rounded border">OS</div>
                    <div className="bg-red-200 p-1.5 text-xs text-center h-7 flex items-center justify-center rounded border">Virtualization</div>
                    <div className="bg-red-200 p-1.5 text-xs text-center h-7 flex items-center justify-center rounded border">Servers</div>
                    <div className="bg-red-200 p-1.5 text-xs text-center h-7 flex items-center justify-center rounded border">Storage</div>
                    <div className="bg-red-200 p-1.5 text-xs text-center h-7 flex items-center justify-center rounded border">Networking</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-200 border border-red-300 rounded"></div>
                <span className="text-sm">Customer Responsibility</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-200 border border-blue-300 rounded"></div>
                <span className="text-sm">Provider Responsibility</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function IPv6Calculator() {
  const [ipv6Address, setIpv6Address] = useState('2001:db8:85a3::8a2e:370:7334');
  const [prefixLength, setPrefixLength] = useState('64');
  const [analysis, setAnalysis] = useState<any>(null);

  const analyzeIPv6 = () => {
    // Simulate IPv6 address analysis
    const parts = ipv6Address.split(':');
    const isCompressed = ipv6Address.includes('::');
    
    setAnalysis({
      fullAddress: '2001:0db8:85a3::8a2e:370:7334',
      compressed: ipv6Address,
      networkPrefix: `2001:db8:85a3::/${prefixLength}`,
      hostPortion: '8a2e:370:7334',
      addressType: 'Global Unicast',
      scope: 'Global',
      isCompressed,
      totalAddresses: Math.pow(2, 128 - parseInt(prefixLength)).toExponential(2)
    });
  };

  const ipv6AddressTypes = [
    {
      type: 'Unicast',
      prefix: '2001::/16 - 3fff::/16',
      description: 'One-to-one communication',
      examples: ['2001:db8::1', '2001:4860:4860::8888']
    },
    {
      type: 'Multicast',
      prefix: 'ff00::/8',
      description: 'One-to-many communication',
      examples: ['ff02::1 (All nodes)', 'ff02::2 (All routers)']
    },
    {
      type: 'Link-Local',
      prefix: 'fe80::/10',
      description: 'Local network segment only',
      examples: ['fe80::1', 'fe80::a00:27ff:fe4e:66a1']
    },
    {
      type: 'Loopback',
      prefix: '::1/128',
      description: 'Local host communication',
      examples: ['::1']
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-slate-700" />
            IPv6 Address Calculator
          </CardTitle>
          <CardDescription>Analyze and understand IPv6 addresses</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="ipv6-input">IPv6 Address</Label>
              <Input
                id="ipv6-input"
                value={ipv6Address}
                onChange={(e) => setIpv6Address(e.target.value)}
                placeholder="2001:db8:85a3::8a2e:370:7334"
                className="font-mono mt-1"
              />
            </div>
            <div>
              <Label htmlFor="prefix-length">Prefix Length</Label>
              <Input
                id="prefix-length"
                value={prefixLength}
                onChange={(e) => setPrefixLength(e.target.value)}
                placeholder="64"
                type="number"
                min="1"
                max="128"
                className="mt-1"
              />
            </div>
          </div>

          <Button onClick={analyzeIPv6} className="flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            Analyze Address
          </Button>

          {analysis && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-slate-900 mb-2">Address Information</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-slate-600">Full Address:</span>
                      <code className="ml-2 bg-slate-100 px-2 py-1 rounded font-mono text-xs">
                        {analysis.fullAddress}
                      </code>
                    </div>
                    <div>
                      <span className="text-slate-600">Compressed:</span>
                      <code className="ml-2 bg-slate-100 px-2 py-1 rounded font-mono text-xs">
                        {analysis.compressed}
                      </code>
                    </div>
                    <div>
                      <span className="text-slate-600">Type:</span>
                      <Badge className="ml-2">{analysis.addressType}</Badge>
                    </div>
                    <div>
                      <span className="text-slate-600">Scope:</span>
                      <span className="ml-2">{analysis.scope}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-slate-900 mb-2">Network Information</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-slate-600">Network Prefix:</span>
                      <code className="ml-2 bg-slate-100 px-2 py-1 rounded font-mono text-xs">
                        {analysis.networkPrefix}
                      </code>
                    </div>
                    <div>
                      <span className="text-slate-600">Host Portion:</span>
                      <code className="ml-2 bg-slate-100 px-2 py-1 rounded font-mono text-xs">
                        {analysis.hostPortion}
                      </code>
                    </div>
                    <div>
                      <span className="text-slate-600">Total Addresses:</span>
                      <span className="ml-2 font-mono">{analysis.totalAddresses}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>IPv6 Address Types</CardTitle>
          <CardDescription>Understanding different categories of IPv6 addresses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {ipv6AddressTypes.map((type, index) => (
              <div key={index} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-medium text-slate-900">{type.type}</h4>
                  <Badge variant="outline" className="text-xs font-mono">{type.prefix}</Badge>
                </div>
                <p className="text-sm text-slate-600 mb-3">{type.description}</p>
                <div>
                  <span className="text-xs font-medium text-slate-700">Examples:</span>
                  <div className="mt-1 space-y-1">
                    {type.examples.map((example, i) => (
                      <code key={i} className="block bg-slate-100 px-2 py-1 rounded text-xs font-mono">
                        {example}
                      </code>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>IPv4 vs IPv6 Comparison</CardTitle>
          <CardDescription>Key differences between IPv4 and IPv6</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Feature</TableHead>
                  <TableHead>IPv4</TableHead>
                  <TableHead>IPv6</TableHead>
                  <TableHead>Benefit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ipv6Features.map((feature, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{feature.feature}</TableCell>
                    <TableCell className="font-mono text-sm">{feature.ipv4}</TableCell>
                    <TableCell className="font-mono text-sm">{feature.ipv6}</TableCell>
                    <TableCell className="text-sm">{feature.benefit}</TableCell>
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

function CloudStorage() {
  const storageTypes = [
    {
      name: 'Object Storage',
      description: 'Highly scalable storage for unstructured data',
      characteristics: ['REST API access', 'Metadata support', 'Unlimited scalability', 'Web-based access'],
      useCases: ['Website assets', 'Backup and archiving', 'Data lakes', 'Content distribution'],
      examples: ['Amazon S3', 'Google Cloud Storage', 'Azure Blob Storage'],
      pricing: 'Pay per GB stored + requests',
      icon: Database
    },
    {
      name: 'Block Storage',
      description: 'High-performance storage for databases and file systems',
      characteristics: ['Low latency', 'High IOPS', 'Snapshots', 'Encryption'],
      useCases: ['Database storage', 'File systems', 'Virtual machine disks', 'High-performance applications'],
      examples: ['Amazon EBS', 'Google Persistent Disks', 'Azure Managed Disks'],
      pricing: 'Pay per GB provisioned + IOPS',
      icon: Server
    },
    {
      name: 'File Storage',
      description: 'Managed file systems accessible via standard protocols',
      characteristics: ['NFS/SMB protocols', 'Shared access', 'POSIX compliance', 'Automatic scaling'],
      useCases: ['Shared application data', 'Content repositories', 'Media processing', 'Big data analytics'],
      examples: ['Amazon EFS', 'Google Filestore', 'Azure Files'],
      pricing: 'Pay per GB stored + throughput',
      icon: Globe
    }
  ];

  const cloudNetworkingFeatures = [
    {
      feature: 'Virtual Private Cloud (VPC)',
      description: 'Isolated network environment in the cloud',
      benefits: ['Network isolation', 'Custom IP ranges', 'Subnetting', 'Security groups'],
      providers: ['AWS VPC', 'Google VPC', 'Azure Virtual Network']
    },
    {
      feature: 'Load Balancing',
      description: 'Distribute traffic across multiple instances',
      benefits: ['High availability', 'Automatic scaling', 'Health checks', 'SSL termination'],
      providers: ['AWS ELB', 'Google Cloud Load Balancing', 'Azure Load Balancer']
    },
    {
      feature: 'Content Delivery Network (CDN)',
      description: 'Global content caching and distribution',
      benefits: ['Reduced latency', 'Global reach', 'DDoS protection', 'Bandwidth savings'],
      providers: ['Amazon CloudFront', 'Google Cloud CDN', 'Azure CDN']
    },
    {
      feature: 'DNS Management',
      description: 'Scalable and reliable DNS resolution',
      benefits: ['Global anycast', 'Health checks', 'Traffic routing', 'DNSSEC support'],
      providers: ['AWS Route 53', 'Google Cloud DNS', 'Azure DNS']
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>Cloud Storage Types</CardTitle>
          <CardDescription>Understanding different cloud storage models</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-3 gap-6">
            {storageTypes.map((storage, index) => {
              const Icon = storage.icon;
              return (
                <Card key={index} className="border-slate-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Icon className="w-5 h-5 text-slate-700" />
                      {storage.name}
                    </CardTitle>
                    <CardDescription>{storage.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Characteristics</h4>
                      <ul className="text-sm text-slate-600 space-y-1">
                        {storage.characteristics.map((char, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                            {char}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Use Cases</h4>
                      <ul className="text-sm text-slate-600 space-y-1">
                        {storage.useCases.map((useCase, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            {useCase}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Examples</h4>
                      <div className="flex flex-wrap gap-1">
                        {storage.examples.map((example, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">{example}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200">
                      <span className="text-xs font-medium text-slate-700">Pricing Model:</span>
                      <p className="text-xs text-slate-600 mt-1">{storage.pricing}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>Cloud Networking Features</CardTitle>
          <CardDescription>Essential networking capabilities in cloud environments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {cloudNetworkingFeatures.map((feature, index) => (
              <div key={index} className="border border-slate-200 rounded-lg p-4">
                <h4 className="font-medium text-slate-900 mb-2">{feature.feature}</h4>
                <p className="text-sm text-slate-600 mb-3">{feature.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-medium text-slate-700">Key Benefits:</span>
                    <ul className="text-xs text-slate-600 mt-1 space-y-1">
                      {feature.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <span className="text-xs font-medium text-slate-700">Providers:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {feature.providers.map((provider, i) => (
                        <Badge key={i} variant="outline" className="text-xs">{provider}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function CloudNetworking() {
  return (
    <div className="space-y-6">
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="w-5 h-5 text-slate-700" />
            Cloud Networking & Modern Infrastructure
          </CardTitle>
          <CardDescription>
            Understanding cloud computing models, IPv6, and distributed networking
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="cloud-basics" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-100">
          <TabsTrigger value="cloud-basics" className="data-[state=active]:bg-white">Cloud Basics</TabsTrigger>
          <TabsTrigger value="deployment" className="data-[state=active]:bg-white">Deployment Models</TabsTrigger>
          <TabsTrigger value="ipv6" className="data-[state=active]:bg-white">IPv6 & Addressing</TabsTrigger>
          <TabsTrigger value="storage" className="data-[state=active]:bg-white">Cloud Storage</TabsTrigger>
        </TabsList>

        <TabsContent value="cloud-basics" className="space-y-6 mt-6">
          <CloudServiceComparison />
        </TabsContent>

        <TabsContent value="deployment" className="space-y-6 mt-6">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle>Cloud Deployment Models</CardTitle>
              <CardDescription>Different approaches to cloud adoption</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {cloudDeploymentModels.map((model, index) => (
                  <Card key={index} className="border-slate-200">
                    <CardHeader>
                      <CardTitle className="text-lg">{model.name}</CardTitle>
                      <CardDescription>{model.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium text-slate-900 mb-2">Characteristics</h4>
                        <ul className="text-sm text-slate-600 space-y-1">
                          {model.characteristics.map((char, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              {char}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-green-700 text-sm mb-1">Advantages</h5>
                          <ul className="text-xs text-slate-600 space-y-1">
                            {model.advantages.map((adv, i) => (
                              <li key={i} className="flex items-start gap-1">
                                <div className="w-1 h-1 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                {adv}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h5 className="font-medium text-red-700 text-sm mb-1">Disadvantages</h5>
                          <ul className="text-xs text-slate-600 space-y-1">
                            {model.disadvantages.map((dis, i) => (
                              <li key={i} className="flex items-start gap-1">
                                <div className="w-1 h-1 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                {dis}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-slate-900 text-sm mb-1">Examples</h5>
                        <div className="flex flex-wrap gap-1">
                          {model.examples.map((example, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">{example}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ipv6" className="space-y-6 mt-6">
          <IPv6Calculator />
        </TabsContent>

        <TabsContent value="storage" className="space-y-6 mt-6">
          <CloudStorage />
        </TabsContent>
      </Tabs>
    </div>
  );
}