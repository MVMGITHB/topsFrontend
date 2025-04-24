// app/not-found.js
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react'; // Using lucide icon

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="text-red-500 w-12 h-12" />
        </div>
        <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl font-medium text-gray-700 mb-2">Page Not Found</p>
        <p className="text-gray-500 mb-6">
          Oops! We couldn’t find the page you were looking for.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium shadow hover:bg-blue-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
