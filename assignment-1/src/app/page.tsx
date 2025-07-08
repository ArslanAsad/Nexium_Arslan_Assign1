import QuoteGenerator from "./quote-generator";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Quote Generator
          </h1>
          <p>Discover inspiring quotes on any topic</p>
        </div>
        <QuoteGenerator />
      </div>
    </div>
  );
}
