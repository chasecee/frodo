// Define the DebugComponent in a separate file or at the bottom of the same file
export const DebugComponent: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="debug-info mt-4 h-[200px] overflow-scroll">
      <h3 className="block text-sm font-medium text-gray-300 mb-1">
        Debug Information:
      </h3>
      <pre className="whitespace-pre-line">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
