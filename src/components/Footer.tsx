import Link from "next/link";
import Image from "next/image";
import { Camera, MapPin, Mail, Phone, Music2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#090410] border-t border-purple-900/40 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-700 via-fuchsia-600 to-purple-400 flex items-center justify-center font-black text-white text-lg shadow-[0_0_15px_rgba(168,85,247,0.5)] group-hover:scale-105 transition-transform">
                R
              </div>
              <span className="text-2xl font-extrabold tracking-widest text-metallic-purple uppercase">
                RIGA <span className="text-purple-400 font-light text-sm tracking-normal block -mt-1 opacity-90">Dance Academy</span>
              </span>
            </Link>
            <p className="text-purple-200/60 text-sm leading-relaxed">
              Where passion meets movement. Join the most prestigious dance academy and transform your rhythm into art.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#140924] border border-purple-900/50 flex items-center justify-center text-purple-300 hover:text-fuchsia-300 hover:border-purple-500/70 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all">
                <Camera className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#140924] border border-purple-900/50 flex items-center justify-center text-purple-300 hover:text-fuchsia-300 hover:border-purple-500/70 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all">
                <Music2 className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-extrabold text-sm uppercase tracking-widest mb-6 text-purple-300">Divisions & Links</h4>
            <ul className="space-y-3 font-medium text-xs tracking-wider uppercase">
              <li>
                <Link href="/classes" className="text-purple-200/70 hover:text-fuchsia-300 transition-colors">Academy</Link>
              </li>
              <li>
                <Link href="/crew" className="text-purple-200/70 hover:text-fuchsia-300 transition-colors">Crew</Link>
              </li>
              <li>
                <Link href="/rentals" className="text-purple-200/70 hover:text-fuchsia-300 transition-colors">Rentals</Link>
              </li>
              <li>
                <Link href="/productions" className="text-purple-200/70 hover:text-fuchsia-300 transition-colors">Productions</Link>
              </li>
              <li>
                <Link href="/events" className="text-purple-200/70 hover:text-fuchsia-300 transition-colors">Choreography</Link>
              </li>
              <li>
                <Link href="/gallery" className="text-purple-200/70 hover:text-fuchsia-300 transition-colors">Gallery</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-extrabold text-sm uppercase tracking-widest mb-6 text-purple-300">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3 text-purple-200/70">
                <MapPin className="w-5 h-5 text-fuchsia-400 flex-shrink-0 mt-0.5" />
                <span>123 Dance Studio Road, Colombo 07, Sri Lanka</span>
              </li>
              <li className="flex items-center space-x-3 text-purple-200/70">
                <Phone className="w-5 h-5 text-fuchsia-400 flex-shrink-0" />
                <span>+94 77 123 4567</span>
              </li>
              <li className="flex items-center space-x-3 text-purple-200/70">
                <Mail className="w-5 h-5 text-fuchsia-400 flex-shrink-0" />
                <span>hello@rigadance.com</span>
              </li>
            </ul>
          </div>

          {/* Map Location */}
          <div>
            <h4 className="text-white font-extrabold text-sm uppercase tracking-widest mb-6 text-purple-300">Location</h4>
            <div className="w-full h-40 bg-[#140924] rounded-2xl border border-purple-900/50 overflow-hidden relative group">
              <div className="absolute inset-0 bg-purple-950/30 group-hover:bg-transparent transition-colors z-10" />
              <Image 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Map Location" 
                fill
                className="object-cover opacity-40 group-hover:opacity-60 transition-opacity"
                unoptimized
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <MapPin className="w-8 h-8 text-fuchsia-400 animate-bounce drop-shadow-[0_0_10px_rgba(232,121,249,0.8)]" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-900/40 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-purple-300/50 text-xs">
            © {new Date().getFullYear()} RIGA Dance Academy. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-xs">
            <Link href="#" className="text-purple-300/50 hover:text-purple-200 transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-purple-300/50 hover:text-purple-200 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

