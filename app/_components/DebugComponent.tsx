export const DebugComponent: React.FC<{ data: any }> = ({ data }) => {
  return (
    <details className="debug-info mt-4">
      <summary className="cursor-pointer text-sm font-medium text-gray-300 mb-1">
        Debug Information
      </summary>
      <div className="mt-2 h-[200px] overflow-auto">
        <pre className="whitespace-pre-line text-[10px]">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </details>
  );
};
