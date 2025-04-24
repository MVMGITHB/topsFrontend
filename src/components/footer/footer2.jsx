import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 mt-10 md:pl-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Left Section - Logo and Address */}
        <div>
        <Link href="/" className="text-2xl font-bold text-blue-600">
            <img src="/images/logo2.png" alt="" style={{width:"100px"}} />
        </Link>
          <p className="text-white text-sm mt-2 ">1028, 10th floor Tower A,I Thum I.T.Park,Sector 62 Noida</p> 
          <p className=" text-white text-sm">Email:contact@naukripakki.in</p>
          <p className="text-white text-sm">Phone: +91 9811868368</p>
        </div>


        
        
        {/* Middle Section - Quick Links */}
        <div  className=" md:pl-28 md:flex md:flex-col md:justify-center"> 
          <h4 className="text-lg font-semibold">Quick Links</h4>
          <ul className="mt-2 space-y-2">
            <li><Link href="/" className="text-white hover:underline">Jobs</Link></li>
            <li><Link href="/government-jobs" className="text-white hover:underline">Government Jobs</Link></li>
            <li><Link href="/career-guide" className="text-white hover:underline">Career Guide</Link></li>
            <li><Link href="/technology-jobs" className="text-white hover:underline">Technology Jobs</Link></li>
            <li><Link href="/management-jobs" className="text-white hover:underline">Management Jobs</Link></li>
            <li><Link href="/finance-jobs" className="text-white hover:underline">Finance Jobs</Link></li>
            <li><Link href="/teaching-jobs/" className="text-white hover:underline">Teaching Jobs</Link></li>
            <li><Link href="/banking-jobs" className="text-white hover:underline">Banking Jobs</Link></li>
            <li><Link href="/psu-jobs" className="text-white hover:underline">PSU Jobs</Link></li>
          </ul>
        </div>
        
        {/* Right Section - Social Media Icons */}
        <div className=" md:flex md:flex-col md:items-center">
          <h4 className="text-lg font-semibold">Follow Us</h4>
          <div className="flex justify-center md:justify-start space-x-4 mt-2">
            <Link href="#" className="text-white hover:text-gray-400"><FaFacebook size={30} /></Link>
            <Link href="#" className="text-white hover:text-gray-400"><FaTwitter size={30} /></Link>
            <Link href="#" className="text-white hover:text-gray-400"><FaInstagram size={30} /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}