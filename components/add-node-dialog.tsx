"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { nodeTypes } from "@/lib/node-types";

interface AddNodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddNode: (nodeType: string) => void;
}

export default function AddNodeDialog({
  open,
  onOpenChange,
  onAddNode,
}: AddNodeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Node</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          {nodeTypes.map((nodeType) => (
            <Button
              key={nodeType.id}
              variant="outline"
              className="h-24 flex flex-col items-center justify-center gap-2"
              onClick={() => onAddNode(nodeType.name)}
            >
              <nodeType.icon className="h-6 w-6" />
              {nodeType.name}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}