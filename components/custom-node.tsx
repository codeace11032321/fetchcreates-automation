import { Handle, Position } from 'reactflow';
import { cn } from '@/lib/utils';

const nodeColors = {
  trigger: 'bg-blue-500',
  communication: 'bg-green-500',
  integration: 'bg-purple-500',
  data: 'bg-orange-500',
  storage: 'bg-yellow-500',
};

type NodeData = {
  type: keyof typeof nodeColors;  // Enforces `data.type` to be a key in `nodeColors`
  label: string;
  config: Record<string, any>;
};

export default function CustomNode({ data }: { data: NodeData }) {
  return (
    <div className="relative">
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <div className={cn(
        "px-4 py-2 rounded-lg shadow-md border min-w-[150px]",
        "bg-background text-foreground",
        "hover:shadow-lg transition-shadow",
        nodeColors[data.type]  // No need for a type assertion now
      )}>
        <div className="font-semibold">{data.label}</div>
        {Object.keys(data.config).length > 0 && (
          <div className="text-xs mt-1 text-muted-foreground">
            {Object.entries(data.config).map(([key, value]) => (
              <div key={key}>
                {key}: {value as string}
              </div>
            ))}
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
}
