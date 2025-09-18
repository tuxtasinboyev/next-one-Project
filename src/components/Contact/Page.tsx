import Link from "next/link";

interface Props {
    title: string;
    description: string;
    buttonText: string;
    email: string;
    phone: string;
}

function Contact({ title, description, buttonText, email, phone }: Props) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-6">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-10 text-center transform transition hover:scale-105">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
                    {title}
                </h1>
                <p className="text-gray-600 text-lg mb-6">
                    {description}
                </p>

                {/* Contact Info */}
                <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-center gap-3 text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8-4H8m8 8H8" />
                        </svg>
                        <span className="text-lg">{email}</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m0 4v12m6-16v12m-6 0v2m6-2v2" />
                        </svg>
                        <span className="text-lg">{phone}</span>
                    </div>
                </div>

                {/* Button */}
                <button className="mt-6 px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg transition duration-300">
                    <Link href={'/salom'}>  {buttonText}</Link>
                </button>
            </div>
        </div>
    );
}

export default Contact;
