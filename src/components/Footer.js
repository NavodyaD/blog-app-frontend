const Footer = () => {
    return (
        <footer className="bg-white rounded-lg shadow-sm m-4">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="#" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <img src="/assets/images/Postly_logo.jpg" className="h-8" alt="Postly Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Postly</span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href="/policy" className="hover:text-gray-800 me-4 md:me-6">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="/policy" className="hover:text-gray-800">Terms & Conditions</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="/" class="hover:underline">Postly™</a>. All Rights Reserved.</span>
            </div>
        </footer>
    );
}

export default Footer;