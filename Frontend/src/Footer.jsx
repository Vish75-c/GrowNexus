import React from "react";
import { Link } from "react-router-dom";
import { Twitter, Linkedin, Github, Mail } from "lucide-react";
import Logo from "@/Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <Logo className="w-7 h-7" />
              <span className="text-lg font-black text-slate-900 tracking-tight">
                Growth<span className="text-blue-600">Nexus</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              The ultimate bridge between students and alumni. Elevating careers through college-wide networking and mentorship.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                <Linkedin size={18} />
              </a>
              <a href="#" className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all">
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">Platform</h4>
            <ul className="space-y-4">
              <li><Link to="/discover" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Find Mentors</Link></li>
              <li><Link to="/jobs" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Internal Referrals</Link></li>
              <li><Link to="/events" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Alumni Meetups</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">Resources</h4>
            <ul className="space-y-4">
              <li><Link to="/faq" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Help Center</Link></li>
              <li><Link to="/guidelines" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Community Guidelines</Link></li>
              <li><Link to="/privacy" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">Stay Updated</h4>
            <p className="text-sm text-slate-500">Get the latest campus news and event notifications.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="College Email" 
                className="bg-slate-50 border-none rounded-xl px-4 py-2 text-xs flex-1 outline-none focus:ring-2 focus:ring-blue-600/20"
              />
              <button className="bg-blue-600 p-2 rounded-xl text-white hover:bg-blue-700 transition-colors">
                <Mail size={16} />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] font-bold text-slate-400">
            © {currentYear} GrowthNexus. Built for the future of student networking.
          </p>
          <div className="flex gap-6">
            <span className="text-[11px] font-bold text-slate-400 cursor-pointer hover:text-slate-900 transition-colors">Status</span>
            <span className="text-[11px] font-bold text-slate-400 cursor-pointer hover:text-slate-900 transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;