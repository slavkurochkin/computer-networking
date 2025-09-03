import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { ScrollArea } from "./components/ui/scroll-area";
import { Alert, AlertDescription } from "./components/ui/alert";

import { NetworkStack } from "./components/NetworkStack";
import { NetworkTopologies } from "./components/NetworkTopologies";
import { ProtocolComparison } from "./components/ProtocolComparison";
import { IPAddressing } from "./components/IPAddressing";
import { DataTransmission } from "./components/DataTransmission";
import { NetworkSecurity } from "./components/NetworkSecurity";
import { NetworkDevices } from "./components/NetworkDevices";
import { NetworkServices } from "./components/NetworkServices";
import { NetworkHardware } from "./components/NetworkHardware";
import { NetworkTroubleshooting } from "./components/NetworkTroubleshooting";
import { CloudNetworking } from "./components/CloudNetworking";
import { Quiz } from "./components/Quiz";
import {
  BookOpen,
  Network,
  Shield,
  Calculator,
  Zap,
  Users,
  HelpCircle,
  Router,
  Globe,
  Cable,
  Terminal,
  Cloud,
  X,
  AlertTriangle,
  Menu,
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const [warningDismissed, setWarningDismissed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check if screen is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close sidebar when tab changes on mobile
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: BookOpen },
    { id: "stack", label: "Network Stack", icon: Network },
    { id: "hardware", label: "Hardware", icon: Cable },
    { id: "devices", label: "Devices", icon: Router },
    { id: "services", label: "Services", icon: Globe },
    { id: "topologies", label: "Topologies", icon: Users },
    { id: "protocols", label: "Protocols", icon: Zap },
    { id: "addressing", label: "IP Addressing", icon: Calculator },
    { id: "transmission", label: "Data Flow", icon: Network },
    { id: "security", label: "Security", icon: Shield },
    { id: "troubleshooting", label: "Troubleshooting", icon: Terminal },
    { id: "cloud", label: "Cloud", icon: Cloud },
    { id: "quiz", label: "Quiz", icon: HelpCircle },
  ];

  const WarningBanner = () => {
    if (warningDismissed) return null;

    return (
      <Alert className="border-amber-200 bg-amber-50">
        <AlertTriangle className="w-4 h-4 text-amber-600" />
        <AlertDescription className="text-amber-800 pr-8">
          <strong>Heads up!</strong> This is a static site, so any interactive
          content (like form entries or temporary data) won't stick around after
          a refresh. Additionally, much of the content was generated with AI, so
          please use careful judgment and fact-check information.
        </AlertDescription>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-6 w-6 text-amber-600 hover:text-amber-800 hover:bg-amber-100"
          onClick={() => setWarningDismissed(true)}
        >
          <X className="w-4 h-4" />
        </Button>
      </Alert>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-8">
            <Card className="border-slate-200">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl text-slate-900">
                  Welcome to Computer Networking
                </CardTitle>
                <CardDescription className="text-base text-slate-600 max-w-2xl mx-auto">
                  Master the fundamental concepts that power modern
                  communication systems through interactive learning and
                  hands-on exploration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-slate-900 mb-3">
                      What You'll Learn
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-slate-700">
                          OSI Model and TCP/IP Stack architecture
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-slate-700">
                          Network hardware and physical infrastructure
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-slate-700">
                          Network devices: routers, switches, and NAT
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-slate-700">
                          Network services: DNS, DHCP, VPN, and proxy servers
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-slate-700">
                          Network topologies and architectures
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-slate-700">
                          Communication protocols and standards
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-slate-700">
                          IP addressing, subnetting, and routing
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-slate-700">
                          Network troubleshooting and diagnostics
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-slate-700">
                          Cloud networking and modern infrastructure
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-slate-900 mb-3">
                      Interactive Features
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-slate-700">
                          Visual network diagrams and simulations
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-slate-700">
                          Interactive protocol comparison tables
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-slate-700">
                          Real-time subnet calculators
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-slate-700">
                          Network troubleshooting simulators
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-slate-700">
                          IPv6 addressing tools
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-slate-700">
                          Cloud architecture visualization
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-slate-700">
                          Comprehensive knowledge assessments
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {tabs.slice(1, -1).map((tab) => {
                const Icon = tab.icon;
                const descriptions = {
                  stack:
                    "Explore the OSI model and TCP/IP stack layers with interactive visualizations",
                  hardware:
                    "Learn about cables, hubs, switches, Ethernet, MAC addresses, and physical infrastructure",
                  devices:
                    "Learn about routers, switches, NAT tables, and network hardware components",
                  services:
                    "Understand DNS, DHCP, VPN, proxy servers, and essential network services",
                  topologies:
                    "Discover different network structures and their advantages",
                  protocols:
                    "Compare communication protocols and understand their use cases",
                  addressing:
                    "Master IP addressing, subnetting, and network calculations",
                  transmission:
                    "Understand how data flows through networks and packet analysis",
                  security:
                    "Explore network security threats, defenses, and best practices",
                  troubleshooting:
                    "Master network diagnostics with ping, traceroute, DNS tools, and command-line utilities",
                  cloud:
                    "Explore cloud computing models, IPv6, service architectures, and modern networking",
                };

                return (
                  <Card
                    key={tab.id}
                    className="group cursor-pointer hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-200 border-slate-200 hover:border-slate-300"
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-slate-200 transition-colors">
                          <Icon className="w-5 h-5 text-slate-700" />
                        </div>
                        <CardTitle className="text-sm sm:text-base font-medium text-slate-900">
                          {tab.label}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {descriptions[tab.id as keyof typeof descriptions]}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      case "stack":
        return <NetworkStack />;
      case "hardware":
        return <NetworkHardware />;
      case "devices":
        return <NetworkDevices />;
      case "services":
        return <NetworkServices />;
      case "topologies":
        return <NetworkTopologies />;
      case "protocols":
        return <ProtocolComparison />;
      case "addressing":
        return <IPAddressing />;
      case "transmission":
        return <DataTransmission />;
      case "security":
        return <NetworkSecurity />;
      case "troubleshooting":
        return <NetworkTroubleshooting />;
      case "cloud":
        return <CloudNetworking />;
      case "quiz":
        return <Quiz />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-slate-50">
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        ${
          isMobile
            ? `fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`
            : "w-64"
        } 
        bg-white border-r border-slate-200 flex flex-col
      `}
      >
        <div className="border-b border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-slate-900">
                Computer Networking
              </h2>
              <Badge variant="secondary" className="w-fit text-xs">
                Interactive Learning Platform
              </Badge>
            </div>
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-md hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-md transition-colors ${
                    activeTab === tab.id
                      ? "bg-slate-100 text-slate-900 font-medium"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
          <div className="flex items-center gap-4 px-4 py-3">
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-md hover:bg-slate-100"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-slate-900">
                {tabs.find((tab) => tab.id === activeTab)?.label ||
                  "Computer Networking"}
              </h1>
              <p className="text-sm text-slate-600">
                Core Concepts & Network Fundamentals
              </p>
            </div>
          </div>
        </header>

        <div className="px-4 sm:px-6 pt-4 sm:pt-6">
          <WarningBanner />
        </div>
        <main className="flex-1">
          <div className="p-4 sm:p-6">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}
