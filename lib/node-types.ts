import { LucideIcon, Mail, Globe, Database, FileText, Send, Webhook, Radio, ArrowDownToLine } from 'lucide-react';

interface NodeType {
  id: string;
  name: string;
  icon: LucideIcon;
  category: string;
  description?: string;
}

export const webhookTypes = [
  {
    id: 'custom-webhook',
    name: 'Custom Webhook',
    description: 'Create a custom webhook endpoint to receive data',
  },
  {
    id: 'webhook-response',
    name: 'Webhook Response',
    description: 'Send a custom response back to the webhook caller',
  },
  {
    id: 'webhook-listener',
    name: 'Webhook Listener',
    description: 'Listen for incoming webhook events',
  },
];

export const nodeTypes: NodeType[] = [
  {
    id: 'custom-webhook',
    name: 'Custom Webhook',
    icon: Webhook,
    category: 'Trigger',
    description: 'Start workflow with a custom webhook',
  },
  {
    id: 'webhook-response',
    name: 'Webhook Response',
    icon: Radio,
    category: 'Trigger',
    description: 'Respond to webhook requests',
  },
  {
    id: 'webhook-listener',
    name: 'Webhook Listener',
    icon: ArrowDownToLine,
    category: 'Trigger',
    description: 'Listen for webhook events',
  },
  {
    id: 'email',
    name: 'Email',
    icon: Mail,
    category: 'Communication',
  },
  {
    id: 'http',
    name: 'HTTP Request',
    icon: Globe,
    category: 'Integration',
  },
  {
    id: 'database',
    name: 'Database',
    icon: Database,
    category: 'Data',
  },
  {
    id: 'file',
    name: 'File',
    icon: FileText,
    category: 'Storage',
  },
  {
    id: 'webhook',
    name: 'Webhook',
    icon: Send,
    category: 'Integration',
  },
];