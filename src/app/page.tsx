'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();

  return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 font-sans bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
        <main className="flex flex-col gap-8 items-center text-center">
          {/* Optional: Keep a logo or remove it if not needed */}
          <Image
              className="dark:invert"
              src="/next.svg"
              alt="App Logo"
              width={180}
              height={38}
              priority
          />

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            Welcome to Our Platform
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl">
            Join us to manage your academic journey or contribute as a lecturer or TA.
            Please choose an option to continue.
          </p>

          <div className="mt-8 flex gap-4 flex-col sm:flex-row">
            <button
                onClick={() => router.push('/login')} // Redirect to login page
                className="w-full sm:w-auto rounded-full bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-200"
            >
              Login
            </button>
            <button
                onClick={() => router.push('/register')} // Redirect to register page
                className="w-full sm:w-auto rounded-full border border-solid border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 py-3 text-lg font-semibold text-gray-900 dark:text-white shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-200"
            >
              Register
            </button>
          </div>
        </main>

        {/* Optional: You can keep or remove the footer links */}
        <footer className="mt-16 flex gap-6 flex-wrap items-center justify-center text-sm text-gray-600 dark:text-gray-400">
          <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="#" // Replace with actual links if needed
              target="_blank"
              rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
          <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
          >
            Terms of Service
          </a>
        </footer>
      </div>
  );
}