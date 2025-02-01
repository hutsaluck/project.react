import {Link} from "react-router-dom";

export const HomeComponent = () => {
    return (
        <main className="flex items-center justify-center h-screen bg-gray-100">
            <div className="max-w-xl text-center space-y-8 p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-4xl font-bold text-gray-800">
                    Welcome to the Application
                </h1>
                <p className="text-lg text-gray-600">
                    You need to authenticate to access the application.
                </p>
                <Link
                    to="/login"
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                >
                    Go to Login Page
                </Link>
            </div>
        </main>
    );
};