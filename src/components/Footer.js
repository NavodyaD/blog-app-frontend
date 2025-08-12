const Footer = () => {
    return (
        <div className="max-w-screen-xl mx-auto w-full px-4 sm:px-8 lg:px-24 py-10 border-t border-gray-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-10 sm:gap-0">
      
        <div className="flex flex-col space-y-4">
            <p className="text-xl font-semibold">Pages</p>
            <a href="/signup" className="text-gray-400 underline hover:text-gray-800">Sign Up</a>
            <a href="/login" className="text-gray-400 underline hover:text-gray-800">Login</a>
            <a href="/" className="text-gray-400 underline hover:text-gray-800">Home Page</a>
        </div>

        <div className="flex flex-col space-y-4">
            <p className="text-xl font-semibold">Other Pages</p>
            <p className="text-gray-400 underline hover:text-gray-800">Privacy & Policy</p>
            <p className="text-gray-400 underline hover:text-gray-800">Terms & Conditions</p>
        </div>

        <div className="text-3xl font-bold text-gray-900 hover:text-gray-700">BlogApp</div>
        </div>
    );
}

export default Footer;