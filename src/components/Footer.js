const Footer = () => {
    return (
        <div className="max=w rounded-t-3xl border border-gray-300 justify-between flex flex-row px-24 py-12">
            <div className="flex flex-col space-y-4">
                <p className="text-2xl font-semibold">Pages</p>
                <a href="/signup" className="text-gray-400 underline hover:text-gray-800"> SignUp </a>
                <a href="/login" className="text-gray-400 underline hover:text-gray-800"> Login </a>
                <a href="/" className="text-gray-400 underline hover:text-gray-800"> Home Page</a>
            </div>

            <div className="flex flex-col space-y-4">
                <p className="text-2xl font-semibold"> Other Pages</p>
                <p className="text-gray-400 underline hover:text-gray-800"> Privacy & Policy</p>
                <p className="text-gray-400 underline hover:text-gray-800"> Terms & Conditions</p>
            </div>

            <p className="text-gray-900 hover:text-gray-700 text-4xl font-bold">BlogApp</p>
        </div>
    );
}

export default Footer;