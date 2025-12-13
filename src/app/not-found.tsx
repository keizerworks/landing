import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#111111] flex items-center justify-center">
      <div className="text-center max-w-md px-6">
        <Image
          src="/assets/logos/keizer-logo.svg"
          alt="Keizer Logo"
          width={120}
          height={40}
          className="h-10 w-auto mx-auto mb-8"
        />
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
}

