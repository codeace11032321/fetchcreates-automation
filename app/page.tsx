import WorkflowBuilder from '@/components/workflow-builder';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <nav className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center space-x-4">
            <div className="font-bold text-2xl">Fetch Creates</div>
          </div>
        </div>
      </nav>
      <WorkflowBuilder />
    </main>
  );
}