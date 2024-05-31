import SIPSvg from "../assets/SIPlogowithout.svg";

function NavBar() {
    return (
        <nav className="bg-gray-800 text-yellow-400 shadow-lg">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-left space-x-2 rtl:space-x-reverse">
                    <img src={SIPSvg} className="h-8" alt="Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap"></span>
                </div>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-700 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                        <li>
                            <a href="/home" className="block py-2 px-3 text-yellow-400 rounded md:bg-transparent md:p-0 hover:text-white">Home</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-yellow-400 rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:p-0 hover:text-white">Tags</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-yellow-400 rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:p-0 hover:text-white">Profile</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
