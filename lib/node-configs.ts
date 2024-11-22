interface ConfigField {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  options?: string[];
}

interface NodeConfig {
  fields: ConfigField[];
}

const configs: Record<string, NodeConfig> = {
  'Custom Webhook': {
    fields: [
      {
        id: 'endpoint',
        label: 'Webhook Path',
        placeholder: '/my-webhook',
        type: 'text',
      },
      {
        id: 'method',
        label: 'HTTP Method',
        placeholder: 'POST',
        type: 'select',
        options: ['GET', 'POST', 'PUT', 'DELETE'],
      },
      {
        id: 'authentication',
        label: 'Authentication Type',
        placeholder: 'Select authentication type',
        type: 'select',
        options: ['None', 'API Key', 'Bearer Token'],
      },
      {
        id: 'authValue',
        label: 'Authentication Value',
        placeholder: 'Enter auth token or API key',
        type: 'text',
      },
    ],
  },
  'Webhook Response': {
    fields: [
      {
        id: 'statusCode',
        label: 'Status Code',
        placeholder: '200',
        type: 'select',
        options: ['200', '201', '400', '401', '403', '404', '500'],
      },
      {
        id: 'responseType',
        label: 'Response Type',
        placeholder: 'application/json',
        type: 'select',
        options: ['application/json', 'text/plain', 'application/xml'],
      },
      {
        id: 'responseBody',
        label: 'Response Body',
        placeholder: '{"status": "success"}',
        type: 'textarea',
      },
    ],
  },
  'Webhook Listener': {
    fields: [
      {
        id: 'eventType',
        label: 'Event Type',
        placeholder: 'Enter event type to listen for',
        type: 'text',
      },
      {
        id: 'filter',
        label: 'Event Filter',
        placeholder: 'Enter JSON filter condition',
        type: 'textarea',
      },
    ],
  },
  'Email': {
    fields: [
      {
        id: 'to',
        label: 'To Email',
        placeholder: 'recipient@example.com',
        type: 'email',
      },
      {
        id: 'subject',
        label: 'Subject',
        placeholder: 'Enter email subject',
        type: 'text',
      },
      {
        id: 'body',
        label: 'Email Body',
        placeholder: 'Enter email content',
        type: 'textarea',
      },
    ],
  },
  'HTTP Request': {
    fields: [
      {
        id: 'url',
        label: 'URL',
        placeholder: 'https://api.example.com',
        type: 'url',
      },
      {
        id: 'method',
        label: 'Method',
        placeholder: 'GET, POST, PUT, DELETE',
        type: 'select',
        options: ['GET', 'POST', 'PUT', 'DELETE'],
      },
    ],
  },
  'Database': {
    fields: [
      {
        id: 'query',
        label: 'SQL Query',
        placeholder: 'SELECT * FROM table',
        type: 'textarea',
      },
    ],
  },
  'File': {
    fields: [
      {
        id: 'path',
        label: 'File Path',
        placeholder: '/path/to/file',
        type: 'text',
      },
      {
        id: 'operation',
        label: 'Operation',
        placeholder: 'read, write, append',
        type: 'select',
        options: ['read', 'write', 'append', 'delete'],
      },
    ],
  },
};

export function getNodeConfig(nodeType: string): NodeConfig {
  return configs[nodeType] || { fields: [] };
}