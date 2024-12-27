import { Link } from "react-router-dom"; // Or TanStack Router if that's what you're using

function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500">404</h1>
      <p className="mt-4 text-lg text-gray-600">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default PageNotFound;
