export default function PageLoader({ label = "Loading..." }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}