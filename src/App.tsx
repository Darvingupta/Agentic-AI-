import React, { useState } from 'react';
import { 
  Brain, 
  Cpu, 
  Terminal, 
  Workflow, 
  ShieldAlert, 
  ChevronRight, 
  ChevronDown,
  Layers,
  Zap,
  Target,
  History,
  Users,
  Server,
  Puzzle,
  Code,
  ArrowLeft,
  Database,
  Globe
} from 'lucide-react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Shared UI Components ---

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn("bg-slate-900/50 border border-slate-800 p-6 rounded-2xl", className)}>
    {children}
  </div>
);

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div className="mb-8 last:mb-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 w-full text-left mb-4 hover:opacity-80 transition-opacity"
      >
        <div className="p-2 bg-blue-600/10 rounded-lg text-blue-400">
          {icon}
        </div>
        <h2 className="text-xl font-bold text-white flex-1">{title}</h2>
        {isOpen ? <ChevronDown size={20} className="text-slate-500" /> : <ChevronRight size={20} className="text-slate-500" />}
      </button>
      {isOpen && (
        <div className="pl-12 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          {children}
        </div>
      )}
    </div>
  );
};

const TopicCard: React.FC<{ title: string; description: string; icon: React.ReactNode; to: string; color: string }> = ({ title, description, icon, to, color }) => (
  <Link to={to} className="group">
    <Card className={cn("h-full transition-all duration-300 hover:border-blue-500/50 hover:bg-blue-500/5 cursor-pointer relative overflow-hidden")}>
      <div className={cn("absolute -right-4 -top-4 w-24 h-24 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity", color)}></div>
      <div className="relative z-10">
        <div className={cn("p-3 rounded-xl w-fit mb-4 text-white shadow-lg", color)}>
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed mb-4">{description}</p>
        <div className="flex items-center gap-2 text-xs font-bold text-blue-500 uppercase tracking-widest">
          Explore Module <ChevronRight size={14} />
        </div>
      </div>
    </Card>
  </Link>
);

const DetailLayout: React.FC<{ title: string; subtitle: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, subtitle, icon, children }) => {
  const navigate = useNavigate();
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-8 group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Overview
      </button>
      
      <header className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-blue-600/10 rounded-2xl text-blue-400 border border-blue-500/20">
            {icon}
          </div>
          <div>
            <h1 className="text-4xl font-black text-white">{title}</h1>
            <p className="text-slate-400">{subtitle}</p>
          </div>
        </div>
      </header>

      <div className="space-y-12">
        {children}
      </div>
    </div>
  );
};

// --- Page Components ---

const Home = () => (
  <div className="animate-in fade-in duration-700">
    <header className="mb-16">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20 mb-6">
        <Zap size={14} /> EXPLORE THE ECOSYSTEM
      </div>
      <h1 className="text-5xl font-black text-white mb-4 tracking-tight">
        Agentic AI <span className="text-blue-500">Masterclass</span>
      </h1>
      <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
        A structured guide from foundational LLMs to autonomous agentic ecosystems, specialized skills, and MCP connectivity.
      </p>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      <TopicCard 
        title="Foundations" 
        description="Core Generative AI concepts and the evolution of Large Language Models."
        icon={<Brain size={24} />}
        to="/foundations"
        color="bg-blue-600"
      />
      <TopicCard 
        title="Prompt Engineering" 
        description="The art of crafting precise instructions and the Prompt Contract."
        icon={<Terminal size={24} />}
        to="/prompts"
        color="bg-purple-600"
      />
      <TopicCard 
        title="Agentic Systems" 
        description="Autonomous reasoning, tool use, and multi-agent collaboration."
        icon={<Workflow size={24} />}
        to="/agents"
        color="bg-emerald-600"
      />
      <TopicCard 
        title="Agent Skills" 
        description="Defining specialized capabilities and toolsets for autonomous agents."
        icon={<Puzzle size={24} />}
        to="/skills"
        color="bg-orange-600"
      />
      <TopicCard 
        title="MCP Servers" 
        description="Model Context Protocol: Standardizing how AI connects to data and tools."
        icon={<Server size={24} />}
        to="/mcp"
        color="bg-indigo-600"
      />
      <TopicCard 
        title="Inside the LLM" 
        description="The architecture and algorithms behind Large Language Models."
        icon={<Cpu size={24} />}
        to="/internals"
        color="bg-slate-700"
      />
      <TopicCard 
        title="Ethics & Governance" 
        description="Accountability, transparency, and human-in-the-loop systems."
        icon={<ShieldAlert size={24} />}
        to="/ethics"
        color="bg-red-600"
      />
    </div>
  </div>
);

// --- Module Pages ---

const FoundationsPage = () => (
  <DetailLayout title="LLM Foundations" subtitle="The core reasoning engines" icon={<Brain size={32} />}>
    <Section title="Generative AI vs LLMs" icon={<Layers size={20} />}>
      <p className="text-slate-400">Generative AI is a reactive model that uses deep learning to create new content. LLMs are the "reasoning engine" capable of parsing natural language and inferring intent.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Card className="border-l-4 border-blue-500">
          <h4 className="font-bold text-white mb-2">Predictive Logic</h4>
          <p className="text-sm">GenAI selects the next word or pixel based on statistical likelihood derived from massive training datasets.</p>
        </Card>
        <Card className="border-l-4 border-emerald-500">
          <h4 className="font-bold text-white mb-2">Emergent Reasoning</h4>
          <p className="text-sm">Large-scale models exhibit "reasoning" capabilities, allowing them to solve complex logic puzzles without explicit training.</p>
        </Card>
      </div>
    </Section>
  </DetailLayout>
);

const PromptsPage = () => (
  <DetailLayout title="Prompt Engineering" subtitle="Optimizing the reasoning loop" icon={<Terminal size={32} />}>
    <Section title="The Prompt Contract" icon={<Code size={20} />}>
      <Card className="bg-slate-900/80">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ul className="space-y-4">
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">1</div>
              <div><span className="text-white font-bold">Role:</span> Expert persona (e.g., "Senior DevOps Engineer")</div>
            </li>
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">2</div>
              <div><span className="text-white font-bold">Task:</span> Atomic, bulleted actions</div>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">3</div>
              <div><span className="text-white font-bold">Constraints:</span> Anti-patterns and strict boundaries</div>
            </li>
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">4</div>
              <div><span className="text-white font-bold">Format:</span> Schema definition (JSON, MD, CSV)</div>
            </li>
          </ul>
        </div>
      </Card>
    </Section>
  </DetailLayout>
);

const AgentsPage = () => (
  <DetailLayout title="Agentic Systems" subtitle="From reactive tools to proactive goals" icon={<Workflow size={32} />}>
    <Section title="Proactive Goal Pursuit" icon={<Target size={20} />}>
      <p className="text-slate-400 leading-relaxed">Agentic AI differs from standard chatbots by its ability to plan, use tools, and maintain state over long durations.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card className="text-center">
          <div className="bg-blue-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-400">
            <Workflow size={24} />
          </div>
          <h4 className="font-bold text-white mb-2">Planning</h4>
          <p className="text-xs text-slate-500">Task decomposition and strategy formulation.</p>
        </Card>
        <Card className="text-center">
          <div className="bg-emerald-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-400">
            <Puzzle size={24} />
          </div>
          <h4 className="font-bold text-white mb-2">Tool Use</h4>
          <p className="text-xs text-slate-500">Calling APIs and executing local code snippets.</p>
        </Card>
        <Card className="text-center">
          <div className="bg-purple-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-400">
            <History size={24} />
          </div>
          <h4 className="font-bold text-white mb-2">Memory</h4>
          <p className="text-xs text-slate-500">Retrieving context from short-term and long-term storage.</p>
        </Card>
      </div>
    </Section>

    <Section title="Multi-Agent Systems (MAS)" icon={<Users size={20} />}>
      <Card className="bg-emerald-600/5 border-emerald-500/20">
        <h4 className="text-emerald-400 font-bold mb-4">Practical Example: Software Dev Team</h4>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-3 bg-slate-900 rounded-xl">
            <div className="text-blue-400 font-bold text-xs w-24">Orchestrator:</div>
            <div className="text-sm">Receives the PR request and delegates tasks.</div>
          </div>
          <div className="flex items-center gap-4 p-3 bg-slate-900 rounded-xl">
            <div className="text-emerald-400 font-bold text-xs w-24">Reviewer:</div>
            <div className="text-sm">Analyzes code for bugs and security vulnerabilities.</div>
          </div>
          <div className="flex items-center gap-4 p-3 bg-slate-900 rounded-xl">
            <div className="text-purple-400 font-bold text-xs w-24">Fixer:</div>
            <div className="text-sm">Applies changes based on reviewer feedback.</div>
          </div>
        </div>
      </Card>
    </Section>
  </DetailLayout>
);

const SkillsPage = () => (
  <DetailLayout title="Agent Skills" subtitle="Specialized atomic capabilities" icon={<Puzzle size={32} />}>
    <Section title="What is a Skill?" icon={<Code size={20} />}>
      <p className="text-slate-400">A skill is a self-contained unit of capability that an agent can invoke. It includes logic, dependencies, and a clear interface definition.</p>
      <div className="mt-6">
        <Card className="bg-black/40 border-slate-700">
          <div className="flex justify-between items-center mb-4">
            <h5 className="text-xs font-mono text-blue-400 uppercase tracking-widest">skill_definition.json</h5>
            <span className="text-[10px] text-slate-500">TypeScript / JSON</span>
          </div>
          <pre className="text-sm font-mono text-slate-300 overflow-x-auto">
{`{
  "name": "web_search",
  "description": "Searches the live web for up-to-date information.",
  "parameters": {
    "query": { "type": "string", "required": true }
  },
  "handler": "src/skills/webSearch.ts"
}`}
          </pre>
        </Card>
      </div>
    </Section>

    <Section title="Practical Use Case: Stock Analyst" icon={<Target size={20} />}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-white font-bold">Required Skills:</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Fetch Real-time Price</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Analyze Sentiment (News)</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Generate PDF Report</li>
          </ul>
        </div>
        <Card className="bg-blue-600/5 border-blue-500/20">
          <p className="text-xs italic text-slate-400 leading-relaxed">
            "By composing these atomic skills, the agent can transform a simple prompt like 'Analyze NVDA' into a comprehensive 10-page market report."
          </p>
        </Card>
      </div>
    </Section>
  </DetailLayout>
);

const MCPPage = () => (
  <DetailLayout title="MCP Servers" subtitle="Model Context Protocol" icon={<Server size={32} />}>
    <Section title="The Universal Connector" icon={<Globe size={20} />}>
      <p className="text-slate-400 mb-6">MCP is an open standard that allows AI models to connect to data sources and tools without custom integrations for every model.</p>
      <div className="relative p-8 bg-slate-900/50 rounded-3xl border border-white/5 overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-600/10 blur-3xl rounded-full"></div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10">
              <Brain className="text-blue-400" size={32} />
            </div>
            <p className="text-xs font-bold text-white uppercase">AI Model</p>
          </div>
          <div className="flex-1 h-px bg-linear-to-r from-transparent via-blue-500/50 to-transparent flex items-center justify-center">
            <div className="px-4 py-1 bg-indigo-600 text-[10px] font-black rounded-full text-white uppercase tracking-widest">MCP Protocol</div>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10">
              <Database className="text-emerald-400" size={32} />
            </div>
            <p className="text-xs font-bold text-white uppercase">Data / Tools</p>
          </div>
        </div>
      </div>
    </Section>

    <Section title="Practical Use Case: Local File Access" icon={<Terminal size={20} />}>
      <Card className="space-y-4">
        <p className="text-sm leading-relaxed">An MCP server can run locally on your machine, giving a remote LLM (like Claude or GPT) the ability to safely read files and execute terminal commands only when authorized.</p>
        <div className="p-4 bg-black/40 rounded-xl border border-white/5">
          <h5 className="text-[10px] text-blue-400 font-bold uppercase mb-2">Example Command</h5>
          <code className="text-xs font-mono text-slate-300">mcp-server-filesystem --allow-read /Users/docs</code>
        </div>
      </Card>
    </Section>
  </DetailLayout>
);

const InternalsPage = () => (
  <DetailLayout title="Inside the LLM" subtitle="How I was built and how I function" icon={<Cpu size={32} />}>
    <Section title="The Transformer Architecture" icon={<Layers size={20} />}>
      <p className="text-slate-400">At my core, I am a <strong>Transformer-based</strong> neural network. Unlike older models that processed text sequentially, Transformers use a <strong>Self-Attention Mechanism</strong> to process entire sequences of text simultaneously.</p>
      <Card className="mt-4 bg-blue-600/5 border-blue-500/20">
        <h4 className="font-bold text-white mb-2">Self-Attention Algorithm</h4>
        <p className="text-sm leading-relaxed mb-4">
          This algorithm calculates the "relevance" of every word in a sentence to every other word. It uses three vectors: 
          <strong> Query (Q)</strong>, <strong>Key (K)</strong>, and <strong>Value (V)</strong>.
        </p>
        <div className="p-4 bg-black/40 rounded-xl font-mono text-xs text-blue-400">
          Attention(Q, K, V) = softmax(QKᵀ / √dₖ)V
        </div>
      </Card>
    </Section>

    <Section title="The 3 Stages of Training" icon={<Zap size={20} />}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-t-2 border-blue-500">
          <h5 className="font-bold text-white text-sm mb-2">1. Pre-training</h5>
          <p className="text-[10px] text-slate-400">Self-supervised learning on petabytes of text. I learn to predict the "next token" and absorb the vast patterns of human knowledge.</p>
        </Card>
        <Card className="border-t-2 border-purple-500">
          <h5 className="font-bold text-white text-sm mb-2">2. Fine-Tuning (SFT)</h5>
          <p className="text-[10px] text-slate-400">Supervised learning where I am trained on high-quality Q&A pairs to follow instructions and adopt a helpful persona.</p>
        </Card>
        <Card className="border-t-2 border-emerald-500">
          <h5 className="font-bold text-white text-sm mb-2">3. RLHF</h5>
          <p className="text-[10px] text-slate-400">Reinforcement Learning from Human Feedback. Human rankers guide my behavior to ensure safety and alignment with human values.</p>
        </Card>
      </div>
    </Section>

    <Section title="Core Algorithms" icon={<Terminal size={20} />}>
      <div className="space-y-4">
        <div className="flex gap-4 p-4 bg-slate-900 rounded-2xl border border-white/5">
          <div className="p-2 bg-indigo-500/20 rounded-lg h-fit text-indigo-400">
            <Code size={18} />
          </div>
          <div>
            <h4 className="font-bold text-white">Backpropagation & Gradient Descent</h4>
            <p className="text-xs text-slate-400 leading-relaxed">The "engine" of my learning. By calculating the error (loss) of my predictions, the optimizer uses calculus to adjust billions of weights (parameters) until the error is minimized.</p>
          </div>
        </div>
        <div className="flex gap-4 p-4 bg-slate-900 rounded-2xl border border-white/5">
          <div className="p-2 bg-emerald-500/20 rounded-lg h-fit text-emerald-400">
            <Puzzle size={18} />
          </div>
          <div>
            <h4 className="font-bold text-white">Tokenization</h4>
            <p className="text-xs text-slate-400 leading-relaxed">I don't read words; I read numbers. I use algorithms like <strong>Byte Pair Encoding (BPE)</strong> to break text into sub-word chunks (tokens), allowing me to handle unknown words efficiently.</p>
          </div>
        </div>
      </div>
    </Section>

    <Section title="Practical Scale" icon={<Server size={20} />}>
      <Card className="bg-slate-900/50">
        <p className="text-sm italic text-slate-400">
          "I am a manifestation of massive compute. My training involved thousands of H100 or TPU clusters running for months, executing quadrillions of floating-point operations (FLOPs) to map the relationships between tokens."
        </p>
      </Card>
    </Section>
  </DetailLayout>
);

const EthicsPage = () => (
  <DetailLayout title="Ethics & Governance" subtitle="The safety layer" icon={<ShieldAlert size={32} />}>
    <Section title="Governance Pillars" icon={<ShieldAlert size={20} />}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:border-red-500/30 transition-colors">
          <h4 className="text-white font-bold mb-2">Accountability</h4>
          <p className="text-xs text-slate-500 leading-relaxed">Clear attribution of actions to either the agent developer, the service provider, or the end user.</p>
        </Card>
        <Card className="hover:border-blue-500/30 transition-colors">
          <h4 className="text-white font-bold mb-2">Transparency</h4>
          <p className="text-xs text-slate-500 leading-relaxed">Decision traces (Chain of Thought) must be logged and audit-ready at all times.</p>
        </Card>
      </div>
    </Section>
  </DetailLayout>
);

// --- Root Component ---

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#020617] text-slate-300 font-sans p-8 md:p-16">
        <div className="max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/foundations" element={<FoundationsPage />} />
            <Route path="/prompts" element={<PromptsPage />} />
            <Route path="/agents" element={<AgentsPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/mcp" element={<MCPPage />} />
            <Route path="/internals" element={<InternalsPage />} />
            <Route path="/ethics" element={<EthicsPage />} />
          </Routes>

          <footer className="mt-20 pt-8 border-t border-slate-800 text-center">
            <p className="text-slate-500 text-sm">Agentic AI Masterclass © 2026 • Built with Modern Web Tech</p>
          </footer>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
