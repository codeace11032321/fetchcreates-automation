"use client";

import { Node } from 'reactflow';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from 'react';
import { getNodeConfig } from '@/lib/node-configs';
import { Trash2 } from 'lucide-react';

interface NodeConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  node: Node;
  onSave: (nodeId: string, config: any) => void;
  onDelete: (nodeId: string) => void;
}

export default function NodeConfigDialog({
  open,
  onOpenChange,
  node,
  onSave,
  onDelete,
}: NodeConfigDialogProps) {
  const [config, setConfig] = useState(node.data.config || {});
  const nodeConfig = getNodeConfig(node.data.label);

  const handleSave = () => {
    onSave(node.id, config);
  };

  const renderField = (field: any) => {
    switch (field.type) {
      case 'select':
        return (
          <Select
            value={config[field.id] || ''}
            onValueChange={(value) =>
              setConfig((prev) => ({ ...prev, [field.id]: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option: string) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'textarea':
        return (
          <Textarea
            id={field.id}
            placeholder={field.placeholder}
            value={config[field.id] || ''}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                [field.id]: e.target.value,
              }))
            }
            className="h-24"
          />
        );
      default:
        return (
          <Input
            id={field.id}
            type={field.type}
            placeholder={field.placeholder}
            value={config[field.id] || ''}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                [field.id]: e.target.value,
              }))
            }
          />
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configure {node.data.label}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {nodeConfig.fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id}>{field.label}</Label>
              {renderField(field)}
            </div>
          ))}
          <div className="flex gap-2">
            <Button onClick={handleSave} className="flex-1">
              Save Configuration
            </Button>
            <Button
              variant="destructive"
              onClick={() => onDelete(node.id)}
              className="px-3"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}