import React, { useState } from 'react';
import { Shield, Lock, AlertTriangle, CheckCircle, Users, FileText, Download, Eye, Play } from 'lucide-react';

const AuditProPrototype = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [currentRole, setCurrentRole] = useState('auditor');
  const [showTamperDemo, setShowTamperDemo] = useState(false);
  const [aiVerificationRun, setAiVerificationRun] = useState(false);

  // Mock data
  const mockAudit = {
    id: "AUD-2025-001",
    company: "Acme Manufacturing Ltd",
    status: "In Progress",
    startDate: "2025-01-15",
    auditor: "Sarah Johnson, CPA"
  };

  const mockLedgerEntries = [
    { id: "0x7a8f", timestamp: "2025-01-15 09:23:41", hash: "a3f89d2c1e4b5a...", author: "Auditor", type: "Transaction Entry", status: "Immutable" },
    { id: "0x7a90", timestamp: "2025-01-15 11:47:12", hash: "b2e47c8d9a1f3e...", author: "Auditor", type: "Raw Data Upload", status: "Immutable" },
    { id: "0x7a91", timestamp: "2025-01-15 14:32:55", hash: "c9d14e5f2b8a7c...", author: "AI System", type: "Verification Result", status: "Immutable" },
    { id: "0x7a92", timestamp: "2025-01-15 16:18:33", hash: "d4b73a1c6e9f2d...", author: "Auditor", type: "Adjustment Note", status: "Immutable" }
  ];

  const mockAiResults = {
    auditorSummary: {
      totalSales: 1250000,
      totalExpenses: 875000,
      inventoryValue: 320000,
      confidence: "Manual Review"
    },
    aiSummary: {
      totalSales: 1248750,
      totalExpenses: 875000,
      inventoryValue: 318500,
      confidence: "98.3%"
    },
    mismatches: [
      { field: "Total Sales", auditor: "1,250,000", ai: "1,248,750", delta: "-1,250", severity: "amber" },
      { field: "Inventory Value", auditor: "320,000", ai: "318,500", delta: "-1,500", severity: "amber" }
    ],
    anomalies: [
      { line: 47, description: "Invoice #INV-1047 exceeds z-score threshold (3.2σ)", type: "Outlier" },
      { line: 89, description: "Duplicate transaction detected with INV-0932", type: "Duplicate" }
    ]
  };

  const screens = {
    welcome: (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-600 p-3 rounded-xl mr-3">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">AuditPro</h1>
          </div>
          <p className="text-center text-gray-600 mb-8">Blockchain-Verified Audit Platform</p>
          
          <h2 className="text-xl font-semibold mb-4 text-center">Select Your Role</h2>
          
          <div className="space-y-3">
            {['Auditor', 'Director', 'Shareholder', 'Regulator'].map((role) => (
              <button
                key={role}
                onClick={() => {
                  setCurrentRole(role.toLowerCase());
                  setCurrentScreen('signin');
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </div>
    ),

    signin: (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="flex items-center mb-6">
            <div className="bg-blue-600 p-2 rounded-lg mr-3">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">AuditPro</h1>
          </div>
          
          <h2 className="text-xl font-semibold mb-6">Sign in</h2>
          
          <input
            type="text"
            placeholder="User Code"
            className="w-full border border-gray-300 rounded-lg p-3 mb-4"
          />
          
          <div className="relative mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-lg p-3 pr-16"
            />
            <button className="absolute right-3 top-3 text-blue-600 font-medium">show</button>
          </div>
          
          <a href="#" className="text-blue-600 text-sm mb-6 block">Forgot password?</a>
          
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-medium mb-4 transition"
          >
            Sign in
          </button>
          
          <div className="text-center text-gray-500 mb-4">or</div>
          
          <button className="w-full border border-gray-300 rounded-full py-3 font-medium flex items-center justify-center hover:bg-gray-50 transition">
            <span className="mr-2">🍎</span> Sign in with Apple
          </button>
          
          <button
            onClick={() => setCurrentScreen('welcome')}
            className="w-full mt-4 text-gray-600 hover:text-gray-800"
          >
            ← Back to Role Selection
          </button>
        </div>
      </div>
    ),

    dashboard: (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-blue-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="w-6 h-6 mr-2" />
              <span className="font-bold text-lg">AuditPro</span>
            </div>
            <div className="text-sm capitalize bg-blue-700 px-3 py-1 rounded-full">{currentRole}</div>
          </div>
        </div>
        
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">Company Dashboard</h1>
          <p className="text-gray-600 mb-6">Active Audits & Recent Activity</p>
          
          <div className="bg-white rounded-lg shadow-md p-5 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-bold text-lg">{mockAudit.company}</h3>
                <p className="text-sm text-gray-600">Audit ID: {mockAudit.id}</p>
              </div>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                {mockAudit.status}
              </span>
            </div>
            <div className="text-sm text-gray-600 mb-3">
              <p>Started: {mockAudit.startDate}</p>
              <p>Auditor: {mockAudit.auditor}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentScreen('workspace')}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Open Audit
              </button>
              <button
                onClick={() => setCurrentScreen('ledger')}
                className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50 transition"
              >
                View Ledger
              </button>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md p-5 text-white">
            <Lock className="w-8 h-8 mb-2" />
            <h3 className="font-bold text-lg mb-1">Immutable Records</h3>
            <p className="text-sm opacity-90">All entries are cryptographically secured and timestamped</p>
          </div>
          
          <div className="mt-6 space-y-2">
            <button
              onClick={() => setCurrentScreen('welcome')}
              className="w-full text-gray-600 hover:text-gray-800 py-2"
            >
              Switch Role
            </button>
          </div>
        </div>
      </div>
    ),

    workspace: (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-blue-600 text-white p-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setCurrentScreen('dashboard')} className="text-white">← Back</button>
            <span className="font-bold">Audit Workspace</span>
            <div className="w-6"></div>
          </div>
        </div>
        
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">{mockAudit.company}</h2>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => setCurrentScreen('upload')}
              className="bg-white border-2 border-blue-600 text-blue-600 p-4 rounded-lg font-medium hover:bg-blue-50 transition"
            >
              <FileText className="w-6 h-6 mx-auto mb-2" />
              Upload Raw Data
            </button>
            <button
              onClick={() => setCurrentScreen('ai-verification')}
              className="bg-white border-2 border-green-600 text-green-600 p-4 rounded-lg font-medium hover:bg-green-50 transition"
            >
              <CheckCircle className="w-6 h-6 mx-auto mb-2" />
              AI Verification
            </button>
            <button
              onClick={() => setCurrentScreen('ledger')}
              className="bg-white border-2 border-purple-600 text-purple-600 p-4 rounded-lg font-medium hover:bg-purple-50 transition"
            >
              <Lock className="w-6 h-6 mx-auto mb-2" />
              Ledger Timeline
            </button>
            <button
              onClick={() => setCurrentScreen('demo')}
              className="bg-white border-2 border-red-600 text-red-600 p-4 rounded-lg font-medium hover:bg-red-50 transition"
            >
              <Play className="w-6 h-6 mx-auto mb-2" />
              Tamper Demo
            </button>
          </div>
          
          <h3 className="font-bold mb-3">Recent Transactions</h3>
          <div className="space-y-2">
            {['Sales Entry #1047 - $45,000', 'Expense Entry #892 - $12,500', 'Inventory Count - Q1 2025'].map((item, i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
                <span className="text-sm">{item}</span>
                <Lock className="w-4 h-4 text-green-600" />
              </div>
            ))}
          </div>
        </div>
      </div>
    ),

    upload: (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-blue-600 text-white p-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setCurrentScreen('workspace')} className="text-white">← Back</button>
            <span className="font-bold">Upload Raw Data</span>
            <div className="w-6"></div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <h3 className="font-bold mb-4">Select Data Type</h3>
            <div className="space-y-2 mb-6">
              {['Sales Transactions (CSV)', 'Expense Records (CSV)', 'Inventory Data (CSV)'].map((type, i) => (
                <button key={i} className="w-full border-2 border-gray-300 p-3 rounded-lg text-left hover:border-blue-600 hover:bg-blue-50 transition">
                  {type}
                </button>
              ))}
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
              <FileText className="w-12 h-12 mx-auto mb-2 text-gray-400" />
              <p className="text-gray-600 mb-2">Drag and drop CSV file here</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Browse Files</button>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-sm mb-2 flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                Immutability Guarantee
              </h4>
              <p className="text-xs text-gray-700">
                Upon upload, this file will be hashed (SHA-256) and anchored to the blockchain ledger. Any future changes will be detected.
              </p>
            </div>
            
            <button
              onClick={() => {
                setCurrentScreen('ai-verification');
                setAiVerificationRun(false);
              }}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium mt-4 hover:bg-blue-700 transition"
            >
              Upload & Record to Ledger
            </button>
          </div>
        </div>
      </div>
    ),

    'ai-verification': (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-green-600 text-white p-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setCurrentScreen('workspace')} className="text-white">← Back</button>
            <span className="font-bold">AI Verification</span>
            <div className="w-6"></div>
          </div>
        </div>
        
        <div className="p-6">
          {!aiVerificationRun ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg mb-4">Independent AI Analysis</h3>
              <p className="text-gray-600 mb-6">
                Run statistical verification checks on uploaded raw data and compare with auditor reports.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold mb-2">Uploaded Data Files:</h4>
                <ul className="text-sm space-y-1">
                  <li>✓ Sales_Q1_2025.csv (125 records)</li>
                  <li>✓ Expenses_Q1_2025.csv (87 records)</li>
                  <li>✓ Inventory_Jan_2025.csv (340 items)</li>
                </ul>
              </div>
              
              <button
                onClick={() => setAiVerificationRun(true)}
                className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition flex items-center justify-center"
              >
                <Play className="w-5 h-5 mr-2" />
                Run AI Verification
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  Verification Complete
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="border rounded-lg p-4">
                    <h4 className="text-sm font-semibold mb-2 text-gray-600">Auditor Summary</h4>
                    <p className="text-xs mb-1">Sales: ${mockAiResults.auditorSummary.totalSales.toLocaleString()}</p>
                    <p className="text-xs mb-1">Expenses: ${mockAiResults.auditorSummary.totalExpenses.toLocaleString()}</p>
                    <p className="text-xs">Inventory: ${mockAiResults.auditorSummary.inventoryValue.toLocaleString()}</p>
                  </div>
                  
                  <div className="border border-green-500 rounded-lg p-4 bg-green-50">
                    <h4 className="text-sm font-semibold mb-2 text-gray-600">AI Summary</h4>
                    <p className="text-xs mb-1">Sales: ${mockAiResults.aiSummary.totalSales.toLocaleString()}</p>
                    <p className="text-xs mb-1">Expenses: ${mockAiResults.aiSummary.totalExpenses.toLocaleString()}</p>
                    <p className="text-xs">Inventory: ${mockAiResults.aiSummary.inventoryValue.toLocaleString()}</p>
                    <p className="text-xs mt-2 font-semibold text-green-700">Confidence: {mockAiResults.aiSummary.confidence}</p>
                  </div>
                </div>
                
                <h4 className="font-semibold mb-2 text-red-700 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Mismatches Detected
                </h4>
                <div className="space-y-2 mb-4">
                  {mockAiResults.mismatches.map((m, i) => (
                    <div key={i} className="bg-yellow-50 border border-yellow-300 rounded p-3">
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-sm">{m.field}</span>
                        <span className={`text-xs px-2 py-1 rounded ${m.severity === 'amber' ? 'bg-yellow-200 text-yellow-800' : 'bg-red-200 text-red-800'}`}>
                          {m.severity === 'amber' ? 'Review' : 'Critical'}
                        </span>
                      </div>
                      <p className="text-xs mt-1">Auditor: ${m.auditor} | AI: ${m.ai}</p>
                      <p className="text-xs text-red-600 font-semibold">Delta: ${m.delta}</p>
                    </div>
                  ))}
                </div>
                
                <h4 className="font-semibold mb-2">Anomalies Found</h4>
                <div className="space-y-2 mb-4">
                  {mockAiResults.anomalies.map((a, i) => (
                    <div key={i} className="bg-orange-50 border border-orange-300 rounded p-3 text-xs">
                      <span className="font-semibold">Line {a.line}:</span> {a.description}
                      <span className="ml-2 text-orange-700">({a.type})</span>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => setCurrentScreen('escalation')}
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition"
                >
                  Escalate to Regulators & Shareholders
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    ),

    escalation: (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-red-600 text-white p-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setCurrentScreen('ai-verification')} className="text-white">← Back</button>
            <span className="font-bold">Escalation</span>
            <div className="w-6"></div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600 mr-3" />
              <h3 className="font-bold text-lg">Automatic Escalation</h3>
            </div>
            
            <p className="text-gray-700 mb-6">
              Mismatches detected by AI verification have triggered automatic notifications to relevant stakeholders.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="bg-green-50 border border-green-300 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Regulator Notification</span>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-xs text-gray-600">Sent to: Financial Reporting Council</p>
                <p className="text-xs text-gray-600">Timestamp: 2025-01-15 16:45:22</p>
                <p className="text-xs text-gray-600">Ledger Entry: 0x7a93</p>
              </div>
              
              <div className="bg-green-50 border border-green-300 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Shareholder Alert</span>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-xs text-gray-600">Sent to: 3 Major Shareholders</p>
                <p className="text-xs text-gray-600">Timestamp: 2025-01-15 16:45:25</p>
                <p className="text-xs text-gray-600">Ledger Entry: 0x7a94</p>
              </div>
              
              <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Director Notification</span>
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-xs text-gray-600">Sent to: Board of Directors</p>
                <p className="text-xs text-gray-600">Timestamp: 2025-01-15 16:45:28</p>
                <p className="text-xs text-gray-600">Ledger Entry: 0x7a95</p>
              </div>
            </div>
            
            <div className="bg-purple-50 border border-purple-300 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-sm mb-2 flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                Immutable Audit Trail
              </h4>
              <p className="text-xs text-gray-700">
                All escalation actions have been recorded to the blockchain ledger with cryptographic proof. Recipients can verify authenticity.
              </p>
            </div>
            
            <button
              onClick={() => setCurrentScreen('role-view')}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              View Role-Based Access
            </button>
          </div>
        </div>
      </div>
    ),

    'role-view': (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-purple-600 text-white p-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setCurrentScreen('escalation')} className="text-white">← Back</button>
            <span className="font-bold">Role-Based Views</span>
            <div className="w-6"></div>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="font-bold mb-4">Switch Perspective</h3>
          
          <div className="space-y-3 mb-6">
            {[
              { role: 'auditor', label: 'Auditor', access: 'Full access - Create, edit, upload, verify', color: 'blue' },
              { role: 'director', label: 'Company Director', access: 'Read ledger, view reports, receive alerts', color: 'green' },
              { role: 'shareholder', label: 'Shareholder', access: 'Read-only final reports, escalation alerts', color: 'indigo' },
              { role: 'regulator', label: 'Regulator', access: 'Read-only all records, escalation alerts, export logs', color: 'red' }
            ].map((r) => (
              <button
                key={r.role}
                onClick={() => {
                  setCurrentRole(r.role);
                  setCurrentScreen('dashboard');
                }}
                className={`w-full bg-white border-2 ${currentRole === r.role ? `border-${r.color}-600 bg-${r.color}-50` : 'border-gray-300'} rounded-lg p-4 text-left hover:border-${r.color}-600 transition`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold">{r.label}</span>
                  {currentRole === r.role && <CheckCircle className={`w-5 h-5 text-${r.color}-600`} />}
                </div>
                <p className="text-xs text-gray-600">{r.access}</p>
              </button>
            ))}
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-md p-5 text-white">
            <Users className="w-8 h-8 mb-2" />
            <h3 className="font-bold text-lg mb-1">Transparency by Design</h3>
            <p className="text-sm opacity-90">Each role sees exactly what they need. All actions are logged immutably.</p>
          </div>
        </div>
      </div>
    ),

    ledger: (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-purple-600 text-white p-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setCurrentScreen('workspace')} className="text-white">← Back</button>
            <span className="font-bold">Immutable Ledger</span>
            <div className="w-6"></div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-md p-5 text-white mb-6">
            <Lock className="w-8 h-8 mb-2" />
            <h3 className="font-bold text-lg mb-1">Blockchain Timeline</h3>
            <p className="text-sm opacity-90">Cryptographically secured entries</p>
          </div>
          
          <div className="space-y-3">
            {mockLedgerEntries.map((entry, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-purple-600">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center mb-1">
                      <Lock className="w-4 h-4 text-green-600 mr-2" />
                      <span className="font-bold text-sm">{entry.type}</span>
                    </div>
                    <p className="text-xs text-gray-600">ID: {entry.id}</p>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
                    {entry.status}
                  </span>
                </div>
                
                <div className="bg-gray-50 rounded p-2 mb-2 font-mono text-xs break-all">
                  Hash: {entry.hash}
                </div>
                
                <div className="flex justify-between text-xs text-gray-600">
                  <span>{entry.author}</span>
                  <span>{entry.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
          
          <button
            onClick={() => setCurrentScreen('demo')}
            className="w-full mt-6 bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition"
          >
            View Tamper Detection Demo
          </button>
        </div>
      </div>
    ),

    demo: (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-red-600 text-white p-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setCurrentScreen('workspace')} className="text-white">← Back</button>
            <span className="font-bold">Tamper Demo</span>
            <div className="w-6"></div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600 mr-3" />
              <h3 className="font-bold text-lg">Attempted Tampering Detected</h3>
            </div>
            
            {!showTamperDemo ? (
              <div>
                <p className="text-gray-700 mb-6">
                  This demo simulates an auditor attempting to modify a previously recorded entry.
                </p>
                <button
                  onClick={() => setShowTamperDemo(true)}
                  className="w-full bg-red-600 text-white py-4 rounded-lg font-bold hover:bg-red-700 transition flex items-center justify-center"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Simulate Tamper Attempt
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">Original Entry (Immutable)</h4>
                  <div className="bg-white rounded p-3 mb-2">
                    <p className="text-sm mb-1"><span className="font-semibold">Sales Entry:</span> $1,250,000</p>
                    <p className="text-xs text-gray-600 font-mono">Hash: a3f89d2c1e4b5a...</p>
                    <p className="text-xs text-gray-600">Timestamp: 2025-01-15 09:23:41</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="border-t-2 border-dashed border-red-400 w-full"></div>
                  <AlertTriangle className="w-6 h-6 text-red-600 mx-2" />
                  <div className="border-t-2 border-dashed border-red-400 w-full"></div>
                </div>
                
                <div className="bg-red-100 border-2 border-red-500 rounded-lg p-4">
                  <h4 className="font-semibold text-red-900 mb-2">Attempted Change ❌</h4>
                  <div className="bg-white rounded p-3 mb-2">
                    <p className="text-sm mb-1 line-through text-red-600"><span className="font-semibold">Sales Entry:</span> $1,248,750</p>
                    <p className="text-xs text-red-600 font-mono">Hash: c7d42e1f8a9b3d... ⚠️ MISMATCH</p>
                    <p className="text-xs text-gray-600">Attempted by: Sarah Johnson, CPA</p>
                    <p className="text-xs text-gray-600">Timestamp: 2025-01-15 16:52:17</p>
                  </div>
                </div>
                
                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Blockchain Protection Active
                  </h4>
                  <ul className="text-xs space-y-1 text-gray-700">
                    <li>✓ Hash verification failed - modification rejected</li>
                    <li>✓ Tamper attempt logged to ledger (Entry 0x7a96)</li>
                    <li>✓ Automatic notification sent to regulators</li>
                    <li>✓ Original entry remains immutable</li>
                    <li>✓ Actor identity recorded for audit trail</li>
                  </ul>
                </div>
                
                <button
                  onClick={() => setCurrentScreen('final-report')}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  View Final Report Distribution
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    ),

    'final-report': (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-blue-600 text-white p-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setCurrentScreen('demo')} className="text-white">← Back</button>
            <span className="font-bold">Final Report</span>
            <div className="w-6"></div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <h3 className="font-bold text-lg mb-4">Audit Complete - Auto Distribution</h3>
            
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-6 text-white mb-6">
              <CheckCircle className="w-12 h-12 mb-2" />
              <h4 className="font-bold text-xl mb-2">Audit Finalized</h4>
              <p className="text-sm opacity-90">All stakeholders have been automatically notified</p>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Regulator Package</span>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-xs text-gray-600 mb-2">Financial Reporting Council</p>
                <p className="text-xs text-gray-600">• Full audit report (PDF)</p>
                <p className="text-xs text-gray-600">• Complete ledger export</p>
                <p className="text-xs text-gray-600">• AI verification results</p>
                <p className="text-xs text-gray-600">• Evidence files archive</p>
                <p className="text-xs text-gray-600 mt-2">Delivered: 2025-01-15 17:03:45</p>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Shareholder Summary</span>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-xs text-gray-600 mb-2">All Registered Shareholders</p>
                <p className="text-xs text-gray-600">• Executive summary (PDF)</p>
                <p className="text-xs text-gray-600">• Key findings digest</p>
                <p className="text-xs text-gray-600">• Flagged items report</p>
                <p className="text-xs text-gray-600 mt-2">Delivered: 2025-01-15 17:03:48</p>
              </div>
            </div>
            
            <div className="bg-purple-50 border border-purple-300 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-sm mb-2 flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                Distribution Ledger Entries
              </h4>
              <p className="text-xs text-gray-700 mb-2">
                All distribution events have been recorded with cryptographic proof:
              </p>
              <p className="text-xs text-gray-600 font-mono">Entry 0x7a97 - Regulator delivery</p>
              <p className="text-xs text-gray-600 font-mono">Entry 0x7a98 - Shareholder delivery</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button className="border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-medium hover:bg-blue-50 transition flex items-center justify-center">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </button>
              <button className="border-2 border-purple-600 text-purple-600 py-3 rounded-lg font-medium hover:bg-purple-50 transition flex items-center justify-center">
                <Eye className="w-4 h-4 mr-2" />
                View Ledger
              </button>
            </div>
            
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-2xl">
      {screens[currentScreen]}
    </div>
  );
};

export default AuditProPrototype;
