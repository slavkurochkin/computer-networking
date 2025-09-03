import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Cable, Server, Monitor, Zap, ArrowRight, Clock, Wifi, Signal, Router, Globe, Activity, Gauge, Smartphone, Bluetooth, Radio, Shield, Satellite } from 'lucide-react';

const cableTypes = [
  {
    name: 'Cat 5e',
    description: 'Enhanced Category 5',
    maxSpeed: '1 Gbps',
    maxDistance: '100m',
    frequency: '100 MHz',
    commonUse: 'Basic Ethernet, older installations',
    color: 'bg-blue-100 border-blue-200'
  },
  {
    name: 'Cat 6',
    description: 'Category 6',
    maxSpeed: '1 Gbps (10 Gbps short distance)',
    maxDistance: '100m (55m for 10G)',
    frequency: '250 MHz',
    commonUse: 'Modern Ethernet installations',
    color: 'bg-green-100 border-green-200'
  },
  {
    name: 'Cat 6a',
    description: 'Augmented Category 6',
    maxSpeed: '10 Gbps',
    maxDistance: '100m',
    frequency: '500 MHz',
    commonUse: 'High-speed backbone connections',
    color: 'bg-purple-100 border-purple-200'
  },
  {
    name: 'Fiber Optic',
    description: 'Light-based transmission',
    maxSpeed: '100+ Gbps',
    maxDistance: '40km+ (single-mode)',
    frequency: 'N/A (light)',
    commonUse: 'Long distance, high-speed connections',
    color: 'bg-orange-100 border-orange-200'
  }
];

const macAddressStructure = [
  { part: '00', type: 'OUI - Byte 1', description: 'Organizationally Unique Identifier' },
  { part: '1A', type: 'OUI - Byte 2', description: 'Assigned by IEEE to manufacturer' },
  { part: '2B', type: 'OUI - Byte 3', description: 'Identifies specific vendor' },
  { part: '3C', type: 'NIC - Byte 4', description: 'Network Interface Controller' },
  { part: '4D', type: 'NIC - Byte 5', description: 'Assigned by manufacturer' },
  { part: '5E', type: 'NIC - Byte 6', description: 'Unique device identifier' }
];

const ethernetFrameFields = [
  { field: 'Preamble', size: '7 bytes', description: 'Synchronization pattern (10101010...)' },
  { field: 'Start Frame Delimiter', size: '1 byte', description: 'Marks frame beginning (10101011)' },
  { field: 'Destination MAC', size: '6 bytes', description: 'Target device MAC address' },
  { field: 'Source MAC', size: '6 bytes', description: 'Sender device MAC address' },
  { field: 'Length/Type', size: '2 bytes', description: 'Frame length or protocol type' },
  { field: 'Payload', size: '46-1500 bytes', description: 'Actual data being transmitted' },
  { field: 'Frame Check Sequence', size: '4 bytes', description: 'Error detection (CRC-32)' }
];

// Internet Connection Types Data
const internetConnectionTypes = [
  {
    id: 'dsl',
    name: 'DSL (Digital Subscriber Line)',
    type: 'Copper-based',
    maxSpeed: '100 Mbps',
    typicalSpeed: '5-25 Mbps',
    latency: '20-50ms',
    availability: 'Widely available',
    infrastructure: 'Existing phone lines',
    pros: ['Uses existing phone infrastructure', 'Always-on connection', 'Simultaneous voice and data', 'Lower cost'],
    cons: ['Speed depends on distance from DSLAM', 'Limited upload speeds', 'Shared bandwidth', 'Copper line quality affects performance'],
    protocols: ['ATM', 'PPPoE', 'DHCP'],
    icon: 'phone',
    color: 'blue'
  },
  {
    id: 'cable',
    name: 'Cable Internet',
    type: 'Coaxial-based',
    maxSpeed: '1+ Gbps',
    typicalSpeed: '25-300 Mbps',
    latency: '15-40ms',
    availability: 'Urban/suburban',
    infrastructure: 'Cable TV network',
    pros: ['High download speeds', 'Good availability in cities', 'Bundle with TV/phone', 'Consistent speeds'],
    cons: ['Shared bandwidth in neighborhood', 'Upload speeds often limited', 'Higher latency than fiber', 'Weather sensitive'],
    protocols: ['DOCSIS 3.0/3.1/4.0', 'DHCP', 'SNMP'],
    icon: 'cable',
    color: 'green'
  },
  {
    id: 'fiber',
    name: 'Fiber Optic',
    type: 'Light-based',
    maxSpeed: '10+ Gbps',
    typicalSpeed: '100-1000 Mbps',
    latency: '5-15ms',
    availability: 'Limited but growing',
    infrastructure: 'Fiber optic cables',
    pros: ['Extremely high speeds', 'Symmetric upload/download', 'Very low latency', 'Future-proof technology'],
    cons: ['Limited availability', 'Higher installation cost', 'Requires new infrastructure', 'More expensive'],
    protocols: ['Ethernet over Fiber', 'GPON', 'EPON'],
    icon: 'zap',
    color: 'purple'
  },
  {
    id: 'satellite',
    name: 'Satellite Internet',
    type: 'Radio frequency',
    maxSpeed: '150 Mbps',
    typicalSpeed: '12-50 Mbps',
    latency: '600-700ms (GEO)',
    availability: 'Global coverage',
    infrastructure: 'Satellite dishes',
    pros: ['Available anywhere', 'Good for rural areas', 'No ground infrastructure needed', 'Improving technology'],
    cons: ['High latency', 'Weather sensitive', 'Data caps common', 'Higher cost per MB'],
    protocols: ['DVB-S2', 'IP over Satellite'],
    icon: 'satellite',
    color: 'orange'
  },
  {
    id: 'wireless',
    name: 'Fixed Wireless',
    type: 'Radio frequency',
    maxSpeed: '1 Gbps',
    typicalSpeed: '25-100 Mbps',
    latency: '10-30ms',
    availability: 'Growing in rural areas',
    infrastructure: 'Radio towers',
    pros: ['No cables to premises', 'Quick deployment', 'Good for rural areas', 'Lower latency than satellite'],
    cons: ['Line of sight required', 'Weather sensitive', 'Limited range', 'Interference issues'],
    protocols: ['802.11', 'LTE', '5G NR'],
    icon: 'wifi',
    color: 'cyan'
  }
];

const broadbandProtocols = [
  {
    name: 'DOCSIS 3.0',
    description: 'Data Over Cable Service Interface Specification',
    maxDownload: '1 Gbps',
    maxUpload: '100 Mbps',
    channels: '32 down, 8 up',
    modulation: 'QAM',
    deployment: 'Widely deployed',
    features: ['Channel bonding', 'IPv6 support', 'Multicast support']
  },
  {
    name: 'DOCSIS 3.1',
    description: 'Enhanced cable internet standard',
    maxDownload: '10 Gbps',
    maxUpload: '1 Gbps',
    channels: 'OFDM-based',
    modulation: 'OFDM/OFDMA',
    deployment: 'Current standard',
    features: ['OFDM modulation', 'Better spectrum efficiency', 'Lower latency']
  },
  {
    name: 'GPON',
    description: 'Gigabit Passive Optical Network',
    maxDownload: '2.5 Gbps',
    maxUpload: '1.25 Gbps',
    channels: 'Wavelength division',
    modulation: 'NRZ',
    deployment: 'Fiber networks',
    features: ['Passive splitters', 'Long reach', 'High split ratios']
  },
  {
    name: 'ADSL2+',
    description: 'Advanced DSL with extended reach',
    maxDownload: '24 Mbps',
    maxUpload: '3.5 Mbps',
    channels: 'DMT modulation',
    modulation: 'QAM',
    deployment: 'Legacy DSL',
    features: ['Extended frequency range', 'Better reach', 'Improved error correction']
  }
];

// Wireless Network Data
const wirelessStandards = [
  {
    standard: '802.11ac (WiFi 5)',
    frequency: '5 GHz',
    maxSpeed: '3.5 Gbps',
    range: '35m indoor',
    channels: '80/160 MHz',
    features: ['MIMO', 'Beamforming', 'MU-MIMO'],
    deployment: 'Widely deployed'
  },
  {
    standard: '802.11ax (WiFi 6)',
    frequency: '2.4/5 GHz',
    maxSpeed: '9.6 Gbps',
    range: '30m indoor',
    channels: '20/40/80/160 MHz',
    features: ['OFDMA', 'BSS Coloring', 'Target Wake Time'],
    deployment: 'Current standard'
  },
  {
    standard: '802.11be (WiFi 7)',
    frequency: '2.4/5/6 GHz',
    maxSpeed: '46 Gbps',
    range: '35m indoor',
    channels: '320 MHz',
    features: ['Multi-Link Operation', '4K-QAM', 'Enhanced MIMO'],
    deployment: 'Emerging'
  },
  {
    standard: '802.11n (WiFi 4)',
    frequency: '2.4/5 GHz',
    maxSpeed: '600 Mbps',
    range: '70m indoor',
    channels: '20/40 MHz',
    features: ['MIMO', 'Channel bonding', 'Frame aggregation'],
    deployment: 'Legacy'
  }
];

// Cellular Network Data
const cellularGenerations = [
  {
    generation: '4G LTE',
    frequency: '700MHz-2.6GHz',
    maxSpeed: '1 Gbps down, 500 Mbps up',
    latency: '10-50ms',
    technology: 'OFDMA, MIMO',
    features: ['VoLTE', 'Carrier Aggregation', 'Advanced MIMO'],
    deployment: 'Widely deployed'
  },
  {
    generation: '5G Sub-6',
    frequency: '600MHz-6GHz',
    maxSpeed: '2 Gbps down, 1 Gbps up',
    latency: '1-10ms',
    technology: 'mmWave, Massive MIMO',
    features: ['Network Slicing', 'Edge Computing', 'IoT Support'],
    deployment: 'Current rollout'
  },
  {
    generation: '5G mmWave',
    frequency: '24-100GHz',
    maxSpeed: '20 Gbps down, 10 Gbps up',
    latency: '<1ms',
    technology: 'Beamforming, Small Cells',
    features: ['Ultra-low latency', 'High capacity', 'Short range'],
    deployment: 'Urban areas'
  },
  {
    generation: '3G UMTS',
    frequency: '850MHz-2.1GHz',
    maxSpeed: '42 Mbps down, 5.8 Mbps up',
    latency: '100-500ms',
    technology: 'CDMA, WCDMA',
    features: ['Circuit/Packet switching', 'Video calls', 'Mobile internet'],
    deployment: 'Legacy'
  }
];

// IoT Protocols Data
const iotProtocols = [
  {
    protocol: 'LoRaWAN',
    range: '2-15km',
    dataRate: '0.3-50 kbps',
    powerConsumption: 'Ultra-low',
    frequency: '868MHz, 915MHz',
    topology: 'Star',
    useCases: ['Smart cities', 'Agriculture', 'Asset tracking'],
    features: ['Long range', 'Low power', 'Secure']
  },
  {
    protocol: 'Zigbee',
    range: '10-100m',
    dataRate: '20-250 kbps',
    powerConsumption: 'Low',
    frequency: '2.4GHz',
    topology: 'Mesh',
    useCases: ['Home automation', 'Industrial control', 'Smart lighting'],
    features: ['Mesh networking', 'Self-healing', 'Interoperable']
  },
  {
    protocol: 'NB-IoT',
    range: '1-10km',
    dataRate: '20-250 kbps',
    powerConsumption: 'Ultra-low',
    frequency: 'Licensed cellular',
    topology: 'Star',
    useCases: ['Smart meters', 'Parking sensors', 'Environmental monitoring'],
    features: ['Cellular infrastructure', 'Deep coverage', 'Secure']
  },
  {
    protocol: 'WiFi 6 IoT',
    range: '50-100m',
    dataRate: '1-100 Mbps',
    powerConsumption: 'Medium',
    frequency: '2.4/5GHz',
    topology: 'Star',
    useCases: ['Smart home', 'Industrial IoT', 'Healthcare'],
    features: ['High throughput', 'Low latency', 'Standard WiFi']
  },
  {
    protocol: 'Bluetooth LE',
    range: '1-100m',
    dataRate: '1-3 Mbps',
    powerConsumption: 'Ultra-low',
    frequency: '2.4GHz',
    topology: 'Star/Mesh',
    useCases: ['Wearables', 'Beacons', 'Health monitors'],
    features: ['Low energy', 'Quick pairing', 'Mesh support']
  },
  {
    protocol: 'Thread',
    range: '10-30m',
    dataRate: '250 kbps',
    powerConsumption: 'Low',
    frequency: '2.4GHz',
    topology: 'Mesh',
    useCases: ['Smart home', 'Building automation', 'Connected appliances'],
    features: ['IP-based', 'Self-healing mesh', 'Secure']
  }
];

// Mobile Device Network Data
const mobileNetworkTypes = [
  {
    type: 'Cellular Data',
    protocols: ['4G LTE', '5G NR'],
    range: '1-35km',
    speed: '10 Mbps - 20 Gbps',
    powerUsage: 'High',
    features: ['Wide coverage', 'High speed', 'Mobility support'],
    useCases: ['Internet access', 'VoIP', 'Video streaming', 'IoT backhaul']
  },
  {
    type: 'WiFi',
    protocols: ['802.11ax', '802.11ac'],
    range: '30-100m',
    speed: '50 Mbps - 9.6 Gbps',
    powerUsage: 'Medium',
    features: ['High throughput', 'Local networking', 'Hotspot capability'],
    useCases: ['Home/office internet', 'Local file sharing', 'Smart home control']
  },
  {
    type: 'Bluetooth',
    protocols: ['BLE 5.0', 'BR/EDR'],
    range: '1-10m (up to 240m)',
    speed: '1-3 Mbps',
    powerUsage: 'Low',
    features: ['Low power', 'Device pairing', 'Audio streaming'],
    useCases: ['Headphones', 'Keyboards', 'Fitness trackers', 'File transfer']
  },
  {
    type: 'NFC',
    protocols: ['ISO 14443'],
    range: '<10cm',
    speed: '106-424 kbps',
    powerUsage: 'Very low',
    features: ['Touch-to-connect', 'Secure', 'Battery-free tags'],
    useCases: ['Mobile payments', 'Access cards', 'Device pairing', 'Smart tags']
  }
];

function BitTransmissionSimulator() {
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [currentBit, setCurrentBit] = useState(0);
  const [bitPattern, setBitPattern] = useState('10110011');
  const [transmissionSpeed, setTransmissionSpeed] = useState(1000);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTransmitting && currentBit < bitPattern.length) {
      interval = setInterval(() => {
        setCurrentBit(prev => prev + 1);
      }, transmissionSpeed);
    } else if (currentBit >= bitPattern.length) {
      setIsTransmitting(false);
    }
    return () => clearInterval(interval);
  }, [isTransmitting, currentBit, bitPattern.length, transmissionSpeed]);

  const startTransmission = () => {
    setCurrentBit(0);
    setIsTransmitting(true);
  };

  const resetTransmission = () => {
    setCurrentBit(0);
    setIsTransmitting(false);
  };

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-slate-700" />
          Bit Transmission Simulator
        </CardTitle>
        <CardDescription>Watch how bits travel across the wire</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">Bit Pattern</label>
            <input
              type="text"
              value={bitPattern}
              onChange={(e) => setBitPattern(e.target.value.replace(/[^01]/g, ''))}
              placeholder="Enter binary pattern"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-sm"
              disabled={isTransmitting}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">Speed (ms per bit)</label>
            <select
              value={transmissionSpeed}
              onChange={(e) => setTransmissionSpeed(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              disabled={isTransmitting}
            >
              <option value={2000}>Slow (2s)</option>
              <option value={1000}>Medium (1s)</option>
              <option value={500}>Fast (0.5s)</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={startTransmission} disabled={isTransmitting}>
            Start Transmission
          </Button>
          <Button onClick={resetTransmission} variant="outline">
            Reset
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-sm text-slate-600">
            <span>Transmission Progress</span>
            <span>Bit {currentBit} of {bitPattern.length}</span>
          </div>
          <Progress value={(currentBit / bitPattern.length) * 100} className="w-full" />

          <div className="bg-slate-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium">Sender</span>
              </div>
              <div className="flex items-center gap-2">
                <Monitor className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium">Receiver</span>
              </div>
            </div>

            <div className="relative">
              <div className="h-8 bg-slate-200 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 flex">
                  {bitPattern.split('').map((bit, index) => (
                    <div
                      key={index}
                      className={`flex-1 flex items-center justify-center text-xs font-mono transition-all duration-300 ${
                        index < currentBit
                          ? bit === '1'
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                          : index === currentBit && isTransmitting
                            ? bit === '1'
                              ? 'bg-green-400 text-white animate-pulse'
                              : 'bg-red-400 text-white animate-pulse'
                            : 'bg-slate-300 text-slate-600'
                      }`}
                    >
                      {bit}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-2 text-center">
                <div className="inline-flex items-center gap-2 text-xs text-slate-600">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>High (1)</span>
                  <div className="w-3 h-3 bg-red-500 rounded ml-4"></div>
                  <span>Low (0)</span>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-600">Current Signal:</span>
                <span className="ml-2 font-mono font-medium">
                  {currentBit > 0 && currentBit <= bitPattern.length
                    ? `${bitPattern[currentBit - 1]} (${bitPattern[currentBit - 1] === '1' ? 'High' : 'Low'})`
                    : 'Idle'
                  }
                </span>
              </div>
              <div>
                <span className="text-slate-600">Voltage:</span>
                <span className="ml-2 font-mono font-medium">
                  {currentBit > 0 && currentBit <= bitPattern.length
                    ? `${bitPattern[currentBit - 1] === '1' ? '+5V' : '0V'}`
                    : '0V'
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function HubVsSwitchComparison() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
            </div>
            Network Hub (Legacy)
          </CardTitle>
          <CardDescription>Physical layer device (Layer 1)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h4 className="font-medium text-slate-900">How it works:</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                Receives signal on one port
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                Amplifies and repeats to ALL ports
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                Creates single collision domain
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                Half-duplex communication only
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-slate-900">Characteristics:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Bandwidth:</span>
                <span className="font-medium">Shared</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Collisions:</span>
                <span className="font-medium text-red-600">Yes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Security:</span>
                <span className="font-medium text-red-600">Low</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Cost:</span>
                <span className="font-medium text-green-600">Low</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-sm text-orange-800">
              <strong>Note:</strong> Hubs are largely obsolete due to collision issues and security concerns.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
            </div>
            Network Switch (Modern)
          </CardTitle>
          <CardDescription>Data link layer device (Layer 2)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h4 className="font-medium text-slate-900">How it works:</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                Learns MAC addresses from frames
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                Forwards only to destination port
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                Each port is separate collision domain
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                Full-duplex communication
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-slate-900">Characteristics:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Bandwidth:</span>
                <span className="font-medium text-green-600">Dedicated</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Collisions:</span>
                <span className="font-medium text-green-600">None</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Security:</span>
                <span className="font-medium text-green-600">High</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Cost:</span>
                <span className="font-medium text-blue-600">Medium</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Advantage:</strong> Intelligent forwarding eliminates collisions and improves security.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MACAddressExplorer() {
  const [selectedMAC, setSelectedMAC] = useState('00:1A:2B:3C:4D:5E');

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle>MAC Address Structure</CardTitle>
        <CardDescription>Understanding physical addressing in Ethernet</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            Example MAC Address
          </label>
          <div className="font-mono text-lg bg-slate-100 p-3 rounded-lg text-center">
            {selectedMAC}
          </div>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-2">
          {macAddressStructure.map((part, index) => (
            <Card key={index} className="border-2 border-slate-200">
              <CardContent className="p-3 text-center">
                <div className="font-mono font-medium text-lg mb-1">{part.part}</div>
                <div className="text-xs text-slate-600 mb-1">{part.type}</div>
                <div className="text-xs text-slate-500">{part.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-medium text-slate-900">OUI (Organizationally Unique Identifier)</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 bg-slate-50 rounded">
                <span className="font-mono">00:50:56</span>
                <span>VMware</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-50 rounded">
                <span className="font-mono">00:15:5D</span>
                <span>Microsoft</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-50 rounded">
                <span className="font-mono">00:1B:63</span>
                <span>Apple</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-50 rounded">
                <span className="font-mono">00:E0:4C</span>
                <span>Realtek</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-slate-900">MAC Address Types</h4>
            <div className="space-y-2 text-sm">
              <div className="p-2 bg-green-50 border border-green-200 rounded">
                <div className="font-medium text-green-800">Unicast</div>
                <div className="text-green-600">LSB of first byte = 0</div>
              </div>
              <div className="p-2 bg-blue-50 border border-blue-200 rounded">
                <div className="font-medium text-blue-800">Multicast</div>
                <div className="text-blue-600">LSB of first byte = 1</div>
              </div>
              <div className="p-2 bg-orange-50 border border-orange-200 rounded">
                <div className="font-medium text-orange-800">Broadcast</div>
                <div className="text-orange-600">FF:FF:FF:FF:FF:FF</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function InternetConnectionTypes() {
  const [selectedConnection, setSelectedConnection] = useState(internetConnectionTypes[0]);

  return (
    <div className="space-y-6">
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-slate-700" />
            Internet Connection Technologies
          </CardTitle>
          <CardDescription>Comparing different methods of connecting to the internet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-5 gap-4 mb-6">
            {internetConnectionTypes.map((connection, index) => (
              <Card 
                key={index}
                className={`cursor-pointer transition-all border-slate-200 hover:border-slate-300 ${
                  selectedConnection.id === connection.id ? 'ring-2 ring-blue-500 border-blue-300' : ''
                }`}
                onClick={() => setSelectedConnection(connection)}
              >
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    {connection.icon === 'phone' && <Cable className="w-6 h-6 text-blue-600" />}
                    {connection.icon === 'cable' && <Cable className="w-6 h-6 text-green-600" />}
                    {connection.icon === 'zap' && <Zap className="w-6 h-6 text-purple-600" />}
                    {connection.icon === 'satellite' && <Satellite className="w-6 h-6 text-orange-600" />}
                    {connection.icon === 'wifi' && <Wifi className="w-6 h-6 text-cyan-600" />}
                  </div>
                  <h3 className="font-medium text-sm text-slate-900 mb-1">{connection.name}</h3>
                  <p className="text-xs text-slate-600">{connection.type}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedConnection && (
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>{selectedConnection.name}</CardTitle>
                <CardDescription>{selectedConnection.type} internet connection technology</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-3">Technical Specifications</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                          <span className="text-slate-600">Max Speed:</span>
                          <span className="font-medium">{selectedConnection.maxSpeed}</span>
                        </div>
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                          <span className="text-slate-600">Typical Speed:</span>
                          <span className="font-medium">{selectedConnection.typicalSpeed}</span>
                        </div>
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                          <span className="text-slate-600">Latency:</span>
                          <span className="font-medium">{selectedConnection.latency}</span>
                        </div>
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                          <span className="text-slate-600">Availability:</span>
                          <span className="font-medium">{selectedConnection.availability}</span>
                        </div>
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                          <span className="text-slate-600">Infrastructure:</span>
                          <span className="font-medium">{selectedConnection.infrastructure}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-slate-900 mb-3">Supported Protocols</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedConnection.protocols.map((protocol, index) => (
                          <Badge key={index} variant="outline" className="text-xs">{protocol}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-3">Advantages</h4>
                      <ul className="space-y-2">
                        {selectedConnection.pros.map((pro, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-green-700">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-slate-900 mb-3">Disadvantages</h4>
                      <ul className="space-y-2">
                        {selectedConnection.cons.map((con, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-red-700">
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                            {con}
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
    </div>
  );
}

function BroadbandProtocols() {
  const [selectedProtocol, setSelectedProtocol] = useState(broadbandProtocols[1]); // DOCSIS 3.1 as default

  return (
    <div className="space-y-6">
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-slate-700" />
            Broadband Protocols & Standards
          </CardTitle>
          <CardDescription>Technical specifications for high-speed internet delivery</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-4 gap-4 mb-6">
            {broadbandProtocols.map((protocol, index) => (
              <Card 
                key={index}
                className={`cursor-pointer transition-all border-slate-200 hover:border-slate-300 ${
                  selectedProtocol.name === protocol.name ? 'ring-2 ring-green-500 border-green-300' : ''
                }`}
                onClick={() => setSelectedProtocol(protocol)}
              >
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Activity className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-medium text-sm text-slate-900 mb-1">{protocol.name}</h3>
                  <p className="text-xs text-slate-600">{protocol.deployment}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedProtocol && (
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>{selectedProtocol.name}</CardTitle>
                <CardDescription>{selectedProtocol.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-3">Performance Specifications</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                          <span className="text-slate-600">Max Download:</span>
                          <span className="font-medium text-green-600">{selectedProtocol.maxDownload}</span>
                        </div>
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                          <span className="text-slate-600">Max Upload:</span>
                          <span className="font-medium text-blue-600">{selectedProtocol.maxUpload}</span>
                        </div>
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                          <span className="text-slate-600">Channel Config:</span>
                          <span className="font-medium">{selectedProtocol.channels}</span>
                        </div>
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                          <span className="text-slate-600">Modulation:</span>
                          <span className="font-medium">{selectedProtocol.modulation}</span>
                        </div>
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                          <span className="text-slate-600">Deployment:</span>
                          <span className="font-medium">{selectedProtocol.deployment}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-3">Key Features</h4>
                      <ul className="space-y-2">
                        {selectedProtocol.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h5 className="font-medium text-green-800 text-sm mb-2">Technology Highlights</h5>
                      <div className="text-xs text-green-700 space-y-1">
                        {selectedProtocol.name.includes('DOCSIS 3.1') && (
                          <>
                            <p>• Uses OFDM for improved spectrum efficiency</p>
                            <p>• Backward compatible with DOCSIS 3.0</p>
                            <p>• Reduced latency for real-time applications</p>
                          </>
                        )}
                        {selectedProtocol.name.includes('GPON') && (
                          <>
                            <p>• Passive optical splitters reduce costs</p>
                            <p>• Up to 64 users per fiber strand</p>
                            <p>• Wavelength division multiplexing</p>
                          </>
                        )}
                        {selectedProtocol.name.includes('DOCSIS 3.0') && (
                          <>
                            <p>• Channel bonding increases throughput</p>
                            <p>• IPv6 ready for future internet growth</p>
                            <p>• Enhanced quality of service features</p>
                          </>
                        )}
                        {selectedProtocol.name.includes('ADSL2+') && (
                          <>
                            <p>• Extended frequency range to 2.2 MHz</p>
                            <p>• Better error correction mechanisms</p>
                            <p>• Improved reach over copper lines</p>
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
    </div>
  );
}

function InternetInfrastructure() {
  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-slate-700" />
          Internet Service Provider Infrastructure
        </CardTitle>
        <CardDescription>Understanding how ISPs deliver internet to your home</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-base">Last Mile Delivery</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-600">
                  The final connection from ISP infrastructure to your premises
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    Copper lines (DSL)
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    Coaxial cables (Cable)
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    Fiber optic cables (FTTH)
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    Fixed wireless (5G/LTE)
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-base">Distribution Network</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-600">
                  Regional infrastructure connecting neighborhoods to core network
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    DSLAM (DSL networks)
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    CMTS (Cable networks)
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    OLT (Fiber networks)
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    Cell towers (Wireless)
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-base">Core Network</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-600">
                  High-capacity backbone connecting to internet backbone
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    Internet exchange points (IXP)
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    Tier 1 provider connections
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    Content delivery networks
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    Submarine cables
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-base">Performance Factors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-medium text-slate-900 mb-1">Distance from Equipment</div>
                    <p className="text-slate-600">Closer to DSLAM, CMTS, or cell tower = better performance</p>
                  </div>
                  <div>
                    <div className="font-medium text-slate-900 mb-1">Shared Bandwidth</div>
                    <p className="text-slate-600">More users in area = potentially slower speeds during peak times</p>
                  </div>
                  <div>
                    <div className="font-medium text-slate-900 mb-1">Infrastructure Age</div>
                    <p className="text-slate-600">Newer equipment and cables provide better performance</p>
                  </div>
                  <div>
                    <div className="font-medium text-slate-900 mb-1">Weather Conditions</div>
                    <p className="text-slate-600">Rain, snow, and wind can affect wireless and satellite connections</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-base">Network Redundancy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-medium text-slate-900 mb-1">Multiple Fiber Paths</div>
                    <p className="text-slate-600">Different physical routes prevent single points of failure</p>
                  </div>
                  <div>
                    <div className="font-medium text-slate-900 mb-1">Backup Power Systems</div>
                    <p className="text-slate-600">Generators and batteries keep equipment running during outages</p>
                  </div>
                  <div>
                    <div className="font-medium text-slate-900 mb-1">Load Balancing</div>
                    <p className="text-slate-600">Traffic distributed across multiple connections and servers</p>
                  </div>
                  <div>
                    <div className="font-medium text-slate-900 mb-1">Peering Agreements</div>
                    <p className="text-slate-600">Direct connections between ISPs improve speed and reliability</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Wireless Networks Component
function WirelessNetworks() {
  const [selectedStandard, setSelectedStandard] = useState(wirelessStandards[1]); // WiFi 6 as default

  return (
    <div className="space-y-6">
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wifi className="w-5 h-5 text-slate-700" />
            Wireless Network Standards
          </CardTitle>
          <CardDescription>IEEE 802.11 WiFi standards and their capabilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-4 gap-4 mb-6">
            {wirelessStandards.map((standard, index) => (
              <Card 
                key={index}
                className={`cursor-pointer transition-all border-slate-200 hover:border-slate-300 ${
                  selectedStandard.standard === standard.standard ? 'ring-2 ring-blue-500 border-blue-300' : ''
                }`}
                onClick={() => setSelectedStandard(standard)}
              >
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Wifi className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-medium text-sm text-slate-900 mb-1">{standard.standard}</h3>
                  <p className="text-xs text-slate-600">{standard.deployment}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedStandard && (
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>{selectedStandard.standard}</CardTitle>
                <CardDescription>Wireless networking standard specifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-3">Technical Specifications</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                          <span className="text-slate-600">Frequency:</span>
                          <span className="font-medium">{selectedStandard.frequency}</span>
                        </div>
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                          <span className="text-slate-600">Max Speed:</span>
                          <span className="font-medium text-green-600">{selectedStandard.maxSpeed}</span>
                        </div>
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                          <span className="text-slate-600">Range:</span>
                          <span className="font-medium">{selectedStandard.range}</span>
                        </div>
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                          <span className="text-slate-600">Channels:</span>
                          <span className="font-medium">{selectedStandard.channels}</span>
                        </div>
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                          <span className="text-slate-600">Deployment:</span>
                          <span className="font-medium">{selectedStandard.deployment}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-3">Key Features</h4>
                      <ul className="space-y-2">
                        {selectedStandard.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h5 className="font-medium text-blue-800 text-sm mb-2">Technology Highlights</h5>
                      <div className="text-xs text-blue-700 space-y-1">
                        {selectedStandard.standard.includes('WiFi 6') && (
                          <>
                            <p>• OFDMA allows multiple devices to share channels</p>
                            <p>• Target Wake Time (TWT) improves battery life</p>
                            <p>• BSS Coloring reduces interference</p>
                          </>
                        )}
                        {selectedStandard.standard.includes('WiFi 7') && (
                          <>
                            <p>• Multi-Link Operation across bands</p>
                            <p>• 4K-QAM for higher data rates</p>
                            <p>• Enhanced Multi-User MIMO</p>
                          </>
                        )}
                        {selectedStandard.standard.includes('802.11ac') && (
                          <>
                            <p>• MU-MIMO allows simultaneous transmission</p>
                            <p>• Beamforming improves signal quality</p>
                            <p>• 5GHz band reduces congestion</p>
                          </>
                        )}
                        {selectedStandard.standard.includes('802.11n') && (
                          <>
                            <p>• MIMO uses multiple antennas</p>
                            <p>• Channel bonding increases throughput</p>
                            <p>• Frame aggregation reduces overhead</p>
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
    </div>
  );
}

// Cellular Networks Component
function CellularNetworks() {
  const [selectedGeneration, setSelectedGeneration] = useState(cellularGenerations[0]); // 4G LTE as default

  return (
    <div className="space-y-6">
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-slate-700" />
            Cellular Network Generations
          </CardTitle>
          <CardDescription>Evolution of mobile cellular technology from 3G to 5G</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-4 gap-4 mb-6">
            {cellularGenerations.map((generation, index) => (
              <Card 
                key={index}
                className={`cursor-pointer transition-all border-slate-200 hover:border-slate-300 ${
                  selectedGeneration.generation === generation.generation ? 'ring-2 ring-green-500 border-green-300' : ''
                }`}
                onClick={() => setSelectedGeneration(generation)}
              >
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Signal className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-medium text-sm text-slate-900 mb-1">{generation.generation}</h3>
                  <p className="text-xs text-slate-600">{generation.deployment}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedGeneration && (
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>{selectedGeneration.generation}</CardTitle>
                <CardDescription>Cellular network technology specifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-3">Performance Characteristics</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                          <span className="text-slate-600">Frequency Bands:</span>
                          <span className="font-medium">{selectedGeneration.frequency}</span>
                        </div>
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                          <span className="text-slate-600">Max Speed:</span>
                          <span className="font-medium text-green-600">{selectedGeneration.maxSpeed}</span>
                        </div>
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                          <span className="text-slate-600">Latency:</span>
                          <span className="font-medium">{selectedGeneration.latency}</span>
                        </div>
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                          <span className="text-slate-600">Technology:</span>
                          <span className="font-medium">{selectedGeneration.technology}</span>
                        </div>
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                          <span className="text-slate-600">Deployment:</span>
                          <span className="font-medium">{selectedGeneration.deployment}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-3">Key Features</h4>
                      <ul className="space-y-2">
                        {selectedGeneration.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h5 className="font-medium text-green-800 text-sm mb-2">Technology Details</h5>
                      <div className="text-xs text-green-700 space-y-1">
                        {selectedGeneration.generation.includes('5G') && (
                          <>
                            <p>• Network slicing for dedicated services</p>
                            <p>• Edge computing reduces latency</p>
                            <p>• Massive IoT device support</p>
                          </>
                        )}
                        {selectedGeneration.generation.includes('4G') && (
                          <>
                            <p>• All-IP network architecture</p>
                            <p>• Advanced antenna technologies</p>
                            <p>• Carrier aggregation for speed</p>
                          </>
                        )}
                        {selectedGeneration.generation.includes('3G') && (
                          <>
                            <p>• Circuit and packet switching</p>
                            <p>• Code Division Multiple Access</p>
                            <p>• Mobile internet capability</p>
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
    </div>
  );
}

// IoT Protocols Component
function IoTProtocols() {
  const [selectedProtocol, setSelectedProtocol] = useState(iotProtocols[0]); // LoRaWAN as default

  return (
    <div className="space-y-6">
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-slate-700" />
            IoT Data Transfer Protocols
          </CardTitle>
          <CardDescription>Specialized protocols for Internet of Things device communication</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
            {iotProtocols.map((protocol, index) => (
              <Card 
                key={index}
                className={`cursor-pointer transition-all border-slate-200 hover:border-slate-300 ${
                  selectedProtocol.protocol === protocol.protocol ? 'ring-2 ring-purple-500 border-purple-300' : ''
                }`}
                onClick={() => setSelectedProtocol(protocol)}
              >
                <CardContent className="p-3 text-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Radio className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="font-medium text-xs text-slate-900 mb-1">{protocol.protocol}</h3>
                  <p className="text-xs text-slate-600">{protocol.powerConsumption}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedProtocol && (
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>{selectedProtocol.protocol}</CardTitle>
                <CardDescription>IoT communication protocol specifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-3">Technical Specifications</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                          <span className="text-slate-600">Range:</span>
                          <span className="font-medium">{selectedProtocol.range}</span>
                        </div>
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                          <span className="text-slate-600">Data Rate:</span>
                          <span className="font-medium text-blue-600">{selectedProtocol.dataRate}</span>
                        </div>
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                          <span className="text-slate-600">Power Usage:</span>
                          <span className="font-medium">{selectedProtocol.powerConsumption}</span>
                        </div>
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                          <span className="text-slate-600">Frequency:</span>
                          <span className="font-medium">{selectedProtocol.frequency}</span>
                        </div>
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                          <span className="text-slate-600">Topology:</span>
                          <span className="font-medium">{selectedProtocol.topology}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-slate-900 mb-3">Key Features</h4>
                      <ul className="space-y-2">
                        {selectedProtocol.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-3">Common Use Cases</h4>
                      <div className="space-y-2">
                        {selectedProtocol.useCases.map((useCase, index) => (
                          <div key={index} className="p-2 bg-purple-50 border border-purple-200 rounded text-sm">
                            {useCase}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <h5 className="font-medium text-purple-800 text-sm mb-2">Protocol Advantages</h5>
                      <div className="text-xs text-purple-700 space-y-1">
                        {selectedProtocol.protocol === 'LoRaWAN' && (
                          <>
                            <p>• Excellent for wide-area IoT deployments</p>
                            <p>• Battery life measured in years</p>
                            <p>• Works through buildings and obstacles</p>
                          </>
                        )}
                        {selectedProtocol.protocol === 'Zigbee' && (
                          <>
                            <p>• Self-healing mesh network</p>
                            <p>• Standardized interoperability</p>
                            <p>• Reliable indoor coverage</p>
                          </>
                        )}
                        {selectedProtocol.protocol === 'NB-IoT' && (
                          <>
                            <p>• Uses existing cellular infrastructure</p>
                            <p>• Deep indoor penetration</p>
                            <p>• Carrier-grade security</p>
                          </>
                        )}
                        {selectedProtocol.protocol === 'Thread' && (
                          <>
                            <p>• IP-based for easy integration</p>
                            <p>• Self-configuring mesh network</p>
                            <p>• Matter/Thread ecosystem support</p>
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
    </div>
  );
}

// Mobile Device Networks Component
function MobileDeviceNetworks() {
  const [selectedNetworkType, setSelectedNetworkType] = useState(mobileNetworkTypes[0]); // Cellular as default

  return (
    <div className="space-y-6">
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-slate-700" />
            Mobile Device Network Technologies
          </CardTitle>
          <CardDescription>Network connections available on modern mobile devices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-4 gap-4 mb-6">
            {mobileNetworkTypes.map((networkType, index) => (
              <Card 
                key={index}
                className={`cursor-pointer transition-all border-slate-200 hover:border-slate-300 ${
                  selectedNetworkType.type === networkType.type ? 'ring-2 ring-indigo-500 border-indigo-300' : ''
                }`}
                onClick={() => setSelectedNetworkType(networkType)}
              >
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    {networkType.type === 'Cellular Data' && <Signal className="w-6 h-6 text-indigo-600" />}
                    {networkType.type === 'WiFi' && <Wifi className="w-6 h-6 text-indigo-600" />}
                    {networkType.type === 'Bluetooth' && <Bluetooth className="w-6 h-6 text-indigo-600" />}
                    {networkType.type === 'NFC' && <Radio className="w-6 h-6 text-indigo-600" />}
                  </div>
                  <h3 className="font-medium text-sm text-slate-900 mb-1">{networkType.type}</h3>
                  <p className="text-xs text-slate-600">{networkType.powerUsage} power</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedNetworkType && (
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>{selectedNetworkType.type}</CardTitle>
                <CardDescription>Mobile network technology capabilities and applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-3">Technical Specifications</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                          <span className="text-slate-600">Protocols:</span>
                          <div className="flex gap-1">
                            {selectedNetworkType.protocols.map((protocol, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">{protocol}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                          <span className="text-slate-600">Range:</span>
                          <span className="font-medium">{selectedNetworkType.range}</span>
                        </div>
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                          <span className="text-slate-600">Speed:</span>
                          <span className="font-medium text-green-600">{selectedNetworkType.speed}</span>
                        </div>
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                          <span className="text-slate-600">Power Usage:</span>
                          <span className="font-medium">{selectedNetworkType.powerUsage}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-slate-900 mb-3">Key Features</h4>
                      <ul className="space-y-2">
                        {selectedNetworkType.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-3">Common Use Cases</h4>
                      <div className="space-y-2">
                        {selectedNetworkType.useCases.map((useCase, index) => (
                          <div key={index} className="p-2 bg-indigo-50 border border-indigo-200 rounded text-sm">
                            {useCase}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                      <h5 className="font-medium text-indigo-800 text-sm mb-2">Mobile Integration</h5>
                      <div className="text-xs text-indigo-700 space-y-1">
                        {selectedNetworkType.type === 'Cellular Data' && (
                          <>
                            <p>• Primary internet connection for mobile devices</p>
                            <p>• Seamless handoffs between cell towers</p>
                            <p>• Support for voice, data, and SMS</p>
                          </>
                        )}
                        {selectedNetworkType.type === 'WiFi' && (
                          <>
                            <p>• Preferred for high-bandwidth applications</p>
                            <p>• Automatic connection to known networks</p>
                            <p>• Hotspot capability for sharing internet</p>
                          </>
                        )}
                        {selectedNetworkType.type === 'Bluetooth' && (
                          <>
                            <p>• Low-energy variant extends battery life</p>
                            <p>• Automatic device discovery and pairing</p>
                            <p>• Support for multiple simultaneous connections</p>
                          </>
                        )}
                        {selectedNetworkType.type === 'NFC' && (
                          <>
                            <p>• Touch-to-connect simplifies pairing</p>
                            <p>• Secure element for payment processing</p>
                            <p>• Works without device battery power</p>
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
    </div>
  );
}

export function NetworkHardware() {
  return (
    <div className="space-y-6">
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cable className="w-5 h-5 text-slate-700" />
            Network Hardware & Infrastructure
          </CardTitle>
          <CardDescription>
            Explore physical networking components, standards, and infrastructure
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="physical" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-100">
          <TabsTrigger value="physical" className="data-[state=active]:bg-white">Physical Infrastructure</TabsTrigger>
          <TabsTrigger value="internet" className="data-[state=active]:bg-white">Internet Connectivity</TabsTrigger>
          <TabsTrigger value="wireless" className="data-[state=active]:bg-white">Wireless & Mobile</TabsTrigger>
        </TabsList>

        <TabsContent value="physical" className="space-y-6 mt-6">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle>Network Cable Types</CardTitle>
              <CardDescription>Understanding different cable standards and their capabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
                {cableTypes.map((cable, index) => (
                  <Card key={index} className={`border-2 ${cable.color}`}>
                    <CardHeader>
                      <CardTitle className="text-base">{cable.name}</CardTitle>
                      <CardDescription>{cable.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-600">Max Speed:</span>
                            <span className="font-medium">{cable.maxSpeed}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Distance:</span>
                            <span className="font-medium">{cable.maxDistance}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Frequency:</span>
                            <span className="font-medium">{cable.frequency}</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-slate-600 text-sm">Common Use:</span>
                          <p className="text-sm text-slate-700 mt-1">{cable.commonUse}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle>Ethernet Frame Structure</CardTitle>
              <CardDescription>Understanding how data is packaged for transmission</CardDescription>
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
                    {ethernetFrameFields.map((field, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{field.field}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-mono text-xs">{field.size}</Badge>
                        </TableCell>
                        <TableCell className="text-slate-600">{field.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <MACAddressExplorer />
          <HubVsSwitchComparison />
          <BitTransmissionSimulator />
        </TabsContent>

        <TabsContent value="internet" className="space-y-6 mt-6">
          <InternetConnectionTypes />
          <BroadbandProtocols />
          <InternetInfrastructure />
        </TabsContent>

        <TabsContent value="wireless" className="space-y-6 mt-6">
          <WirelessNetworks />
          <CellularNetworks />
          <IoTProtocols />
          <MobileDeviceNetworks />
        </TabsContent>
      </Tabs>
    </div>
  );
}