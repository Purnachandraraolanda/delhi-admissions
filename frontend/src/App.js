import React, { useState, useEffect } from "react";
import "@/App.css";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GraduationCap, 
  BookOpen, 
  MapPin, 
  Phone, 
  Mail, 
  Video, 
  Calendar, 
  ArrowRight,
  Menu,
  X,
  Building2,
  Users,
  FileCheck,
  Award,
  ExternalLink,
  Star,
  Sparkles,
  Cpu,
  Scale,
  Landmark,
  IndianRupee,
  Globe,
  Home,
  Info
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Separator } from "./components/ui/separator";

const BOOKING_URL = "https://bookings.edu9.in/#/2026";
const LOGO_URL = "https://customer-assets.emergentagent.com/job_b5b274d2-7e4b-4afe-9a47-f3e645b97acd/artifacts/pmlwds5s_EDU9CG__2_.jpeg";

// Social Links
const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/edu9careerguide/",
  instagram: "https://www.instagram.com/edu9careerguide/",
  twitter: "https://x.com/edu9careerguide",
  whatsapp: "https://api.whatsapp.com/send/?phone=919133311450&text=Hello%2C+I+want+to+know+about+your+services&type=phone_number&app_absent=0"
};

// University Fee Data (2025-26)
const UNIVERSITY_FEE_DATA = {
  "GD Goenka University": {
    academicYear: "2025-26",
    fees: {
      btech: { label: "B.Tech", amount: "₹1.50 - 1.8 Lakhs/year", total: "₹14-16 Lakhs (4 years(including hostel(8 sharing)))" },
      mba: { label: "MBA", amount: "₹3.00 - 4.00 Lakhs/year", total: "₹6-8 Lakhs (2 years)" },
      bba: { label: "BBA", amount: "₹1.80 - 2.50 Lakhs/year", total: "₹5.4-7.5 Lakhs (3 years)" },
      hostel: { label: "Hostel", amount: "₹1.9 - 3 Lakhs/year(based on type of sharing)", note: "AC/Non-AC options" }
    }
  },
  "Bennett University": {
    website: "https://www.bennett.edu.in",
    academicYear: "2025-26",
    fees: {
      btech: { label: "B.Tech", amount: "₹3.25 - 4.00 Lakhs/year", total: "₹14-16 Lakhs (4 years)" },
      mba: { label: "MBA", amount: "₹6.00 - 7.32 Lakhs/year", total: "₹12-14.65 Lakhs (2 years)" },
      bba: { label: "BBA", amount: "₹2.50 - 3.00 Lakhs/year", total: "₹7.5-9.73 Lakhs (3 years)" },
      hostel: { label: "Hostel", amount: "₹1.10 - 1.50 Lakhs/year", note: "AC Twin Sharing" }
    }
  },
  "SRM University": {
    website: "https://www.srmuniversity.ac.in",
    academicYear: "2025-26",
    fees: {
      btech: { label: "B.Tech", amount: "₹2.00 - 3.00 Lakhs/year", total: "₹8-14 Lakhs (4 years)" },
      mba: { label: "MBA", amount: "₹2.00 - 3.00 Lakhs/year", total: "₹4-6 Lakhs (2 years)" },
      bba: { label: "BBA", amount: "₹1.50 - 2.00 Lakhs/year", total: "₹4.5-6 Lakhs (3 years)" },
      hostel: { label: "Hostel", amount: "₹1.21 - 1.90 Lakhs/year", note: "AC/Non-AC options" }
    }
  },
  "Manav Rachna University": {
    website: "https://manavrachna.edu.in",
    academicYear: "2025-26",
    fees: {
      btech: { label: "B.Tech", amount: "₹2.44 - 3.14 Lakhs/year", total: "₹9.76-12.56 Lakhs (4 years)" },
      mba: { label: "MBA", amount: "₹3.71 Lakhs/year", total: "₹7.42 Lakhs (2 years)" },
      bba: { label: "BBA", amount: "₹2.28 Lakhs/year", total: "₹6.84 Lakhs (3 years)" },
      hostel: { label: "Hostel", amount: "₹1.00 - 1.50 Lakhs/year", note: "As per official website" }
    }
  },
  "Geeta University": {
    website: "https://geetauniversity.edu.in",
    academicYear: "2025-26",
    fees: {
      btech: { label: "B.Tech", amount: "₹1.20 - 1.98 Lakhs/year", total: "₹4.8-7.92 Lakhs (4 years)" },
      mba: { label: "MBA", amount: "₹1.50 - 1.80 Lakhs/year", total: "₹3-3.6 Lakhs (2 years)" },
      bba: { label: "BBA", amount: "₹1.00 - 1.30 Lakhs/year", total: "₹3-4 Lakhs (3 years)" },
      hostel: { label: "Hostel", amount: "₹33,000 - 52,000/year", note: "As per official website" }
    }
  },
  "Sharda University": {
    website: "https://www.sharda.ac.in",
    academicYear: "2025-26",
    fees: {
      btech: { label: "B.Tech", amount: "₹1.41 - 2.10 Lakhs/year", total: "₹5.6-8.4 Lakhs (4 years)" },
      mba: { label: "MBA", amount: "₹4.02 - 4.57 Lakhs/year", total: "₹8-9.14 Lakhs (2 years)" },
      bba: { label: "BBA", amount: "₹1.71 Lakhs/year", total: "₹5.13 Lakhs (3 years)" },
      hostel: { label: "Hostel", amount: "₹97,000 - 1.54 Lakhs/year", note: "AC/Non-AC options" }
    }
  },
  "Shiv Nadar University": {
    website: "https://snu.edu.in",
    academicYear: "2025-26",
    fees: {
      btech: { label: "B.Tech", amount: "₹4.50 - 6.00 Lakhs/year", total: "₹18-24 Lakhs (4 years)" },
      mba: { label: "MBA/Masters", amount: "₹1.60 - 2.50 Lakhs/year", total: "₹3.2-5 Lakhs (2 years)" },
      bba: { label: "BBA/UG", amount: "₹4.00 - 5.00 Lakhs/year", total: "₹12-15 Lakhs (3 years)" },
      hostel: { label: "Hostel", amount: "₹2.43 Lakhs/year", note: "AC Twin Sharing" }
    }
  },
  "Noida International University": {
    website: "https://niu.edu.in",
    academicYear: "2025-26",
    fees: {
      btech: { label: "B.Tech", amount: "₹1.32 Lakhs/year", total: "₹5.28-5.50 Lakhs (4 years)" },
      mba: { label: "MBA", amount: "₹88,500 - 1.50 Lakhs/year", total: "₹1.77-3 Lakhs (2 years)" },
      bba: { label: "BBA", amount: "₹80,000 - 1.00 Lakhs/year", total: "₹2.4-3 Lakhs (3 years)" },
      hostel: { label: "Hostel", amount: "₹60,000 - 90,000/year", note: "50% scholarship available" }
    }
  },
  "SGT University": {
    website: "https://sgtuniversity.ac.in",
    academicYear: "2025-26",
    fees: {
      btech: { label: "B.Tech", amount: "₹2.30 - 2.80 Lakhs/year", total: "₹9.2-11.2 Lakhs (4 years)" },
      mba: { label: "MBA", amount: "₹2.50 - 3.50 Lakhs/year", total: "₹5-7 Lakhs (2 years)" },
      bba: { label: "BBA", amount: "₹1.50 - 2.00 Lakhs/year", total: "₹4.5-6 Lakhs (3 years)" },
      hostel: { label: "Hostel", amount: "₹97,000 - 1.54 Lakhs/year", note: "AC/Non-AC options" }
    }
  },
  "World University of Design": {
    website: "https://worlduniversityofdesign.ac.in",
    academicYear: "2025-26",
    fees: {
      btech: { label: "B.Des", amount: "₹3.68 Lakhs/year", total: "₹14.72 Lakhs (4 years)" },
      mba: { label: "M.Des", amount: "₹3.50 - 4.00 Lakhs/year", total: "₹7-8 Lakhs (2 years)" },
      bba: { label: "B.Des (Animation)", amount: "₹4.02 Lakhs/year", total: "₹16.10 Lakhs (4 years)" },
      hostel: { label: "Hostel", amount: "As per official website", note: "Contact admissions" }
    }
  }
};

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// Social Media Icons
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// Floating WhatsApp Button
const FloatingWhatsApp = () => (
  <a
    href={SOCIAL_LINKS.whatsapp}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-300 animate-pulse-slow"
    data-testid="floating-whatsapp"
  >
    <WhatsAppIcon />
  </a>
);

// Fee Modal Component
const FeeModal = ({ isOpen, onClose, universityName }) => {
  const data = UNIVERSITY_FEE_DATA[universityName];
  
  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Blurred Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
            onClick={onClose}
            data-testid="modal-overlay"
          />
          
          {/* Modal Container - Centered with Flexbox */}
          <div className="fixed inset-0 z-[101] flex justify-center items-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.16, 1, 0.3, 1]
              }}
              style={{ transformOrigin: 'center center' }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl pointer-events-auto"
              data-testid="fee-modal"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#003366] to-[#004080] p-6 rounded-t-2xl">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
                      {universityName}
                    </h2>
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>Academic Year: {data.academicYear}</span>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                    data-testid="modal-close-btn"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
              {/* Official Website Link */}
              <a
                href={data.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#003366]/10 hover:bg-[#003366]/20 text-[#003366] px-4 py-2 rounded-lg transition-colors mb-6"
                data-testid="modal-website-link"
              >
                <Globe className="w-4 h-4" />
                <span className="font-medium">Visit Official Website</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* Fee Structure */}
              <h3 className="font-heading text-xl font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-[#FF6B00]" />
                Fee Structure
              </h3>

              <div className="space-y-4">
                {Object.entries(data.fees).map(([key, fee]) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-r from-[#F8F9FA] to-white p-4 rounded-xl border border-gray-100 hover:border-[#003366]/30 transition-colors"
                  >
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          key === 'hostel' ? 'bg-[#25D366]/20' : 'bg-[#FF6B00]/20'
                        }`}>
                          {key === 'hostel' ? (
                            <Home className="w-5 h-5 text-[#25D366]" />
                          ) : (
                            <GraduationCap className="w-5 h-5 text-[#FF6B00]" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-[#1A1A1A]">{fee.label}</p>
                          <p className="text-lg font-bold text-[#003366]">{fee.amount}</p>
                        </div>
                      </div>
                      {fee.total && (
                        <div className="text-right">
                          <p className="text-xs text-[#5A5A5A]">Total</p>
                          <p className="text-sm font-semibold text-[#FF6B00]">{fee.total}</p>
                        </div>
                      )}
                    </div>
                    {fee.note && (
                      <p className="text-xs text-[#5A5A5A] mt-2 flex items-center gap-1">
                        <Info className="w-3 h-3" />
                        {fee.note}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Disclaimer */}
              <div className="mt-6 p-4 bg-[#FFF3CD] border border-[#FFE69C] rounded-xl">
                <p className="text-sm text-[#856404] flex items-start gap-2">
                  <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Disclaimer:</strong> Fees are subject to change. Please verify from the official university website before making any decisions.
                  </span>
                </p>
              </div>

              {/* CTA */}
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button className="w-full bg-[#FF6B00] text-white hover:bg-[#E05500] rounded-lg py-3 font-semibold" data-testid="modal-book-btn">
                    <Calendar className="w-4 h-4 mr-2" />
                    Get Admission Guidance
                  </Button>
                </a>
                <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-[#25D366] text-white hover:bg-[#128C7E] rounded-lg py-3 px-6 font-semibold" data-testid="modal-whatsapp-btn">
                    <WhatsAppIcon />
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

// Navigation Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "DTU", href: "#dtu" },
    { name: "DU", href: "#du" },
    { name: "IPU", href: "#ipu" },
    { name: "Top Private", href: "#private" },
    { name: "Services", href: "#services" },
    { name: "Videos", href: "#videos" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#003366]/95 backdrop-blur-md shadow-lg" : "bg-[#003366]"}`} data-testid="navbar">
        <div className="container-custom">
          <div className="flex items-center justify-between py-3">
            <a href="#" className="flex items-center gap-3" data-testid="logo">
              <img src={LOGO_URL} alt="Edu9 Career Guidance" className="h-12 w-auto object-contain" />
            </a>

            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-white/90 hover:text-[#FFD700] text-sm font-medium transition-colors">
                  {link.name}
                </a>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <div className="flex items-center gap-2">
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-[#FFD700] transition-colors">
                  <FacebookIcon />
                </a>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-[#FFD700] transition-colors">
                  <InstagramIcon />
                </a>
                <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-[#FFD700] transition-colors">
                  <TwitterIcon />
                </a>
              </div>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#FFD700] text-[#003366] hover:bg-[#FFC000] font-semibold px-6 py-2 rounded-none shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all" data-testid="nav-book-slot-btn">
                  Book Slot
                </Button>
              </a>
            </div>

            <button className="lg:hidden p-2 text-white" onClick={() => setIsOpen(true)} data-testid="mobile-menu-btn">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setIsOpen(false)} />
      
      <div className={`fixed top-0 right-0 w-72 h-full bg-[#003366] z-50 transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <img src={LOGO_URL} alt="Edu9" className="h-10" />
            <button onClick={() => setIsOpen(false)} className="text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-white/90 text-lg font-medium py-2 border-b border-white/10" onClick={() => setIsOpen(false)}>
                {link.name}
              </a>
            ))}
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="mt-4">
              <Button className="bg-[#FFD700] text-[#003366] hover:bg-[#FFC000] rounded-none w-full font-semibold">
                Book Consultation
              </Button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

// Hero Section with ORANGE Background
const HeroSection = () => {
  return (
    <section className="min-h-screen pt-24 flex items-center relative overflow-hidden" data-testid="hero-section">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFFFFF] via-[#FFFFFF] to-[#FF6B00]" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-8">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-white/20 border border-white/40 px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-black text-sm font-sub-heading">Delhi Universities Admission Guidance</span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight">
              Secure Your Future in Delhi's <span className="text-[#1A1A1A]">Top Universities</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-lg text-black/90 max-w-xl">
              Expert guidance for DTU, DU, IPU, and more. Navigate the admission maze with confidence. Get end-to-end counselling, college shortlisting, and documentation support.
            </motion.p>

            <motion.div variants={fadeUp} className="inline-block">
              <div className="bg-black text-[#FF6B00] px-8 py-4 font-bold text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                Career Guidance Fee: ₹10,000 <span className="text-sm font-normal">(One-time)</span>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#003366] text-white hover:bg-[#002244] px-8 py-6 text-lg font-semibold rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center gap-2" data-testid="hero-book-slot-btn">
                  <Calendar className="w-5 h-5" />
                  Book Consultation Slot
                </Button>
              </a>
              <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#25D366] text-white hover:bg-[#128C7E] px-8 py-6 text-lg font-semibold rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center gap-2" data-testid="hero-whatsapp-btn">
                  <WhatsAppIcon />
                  Chat on WhatsApp
                </Button>
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="flex gap-8 pt-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-black">10000+</p>
                <p className="text-sm text-black/80">Students Guided</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-black">500+</p>
                <p className="text-sm text-black/80">Partner Colleges</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-black">98%</p>
                <p className="text-sm text-black/80">Success Rate</p>
              </div>
            </motion.div>
          </motion.div>
          {/* Right Side - Meritto Form */}
          <div className="w-full lg:w-[420px] animate-slide-up-delay" id="enquiry-form">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Form Header */}
              <div className="bg-[#0055A5] px-6 py-4">
                <h3 className="text-white text-xl font-bold text-center">Enquiry Form</h3>
                <p className="text-white/80 text-sm text-center mt-1">Start your pilot journey today</p>
              </div>
              {/* Meritto Form Widget */}
              <div className="p-1">
                <div 
                  className="npf_wgts" 
                  data-height="480px" 
                  data-w="48d9c2a459354029d770de776442581e"
                ></div>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </section>
  );
};

// University Section Component
const UniversitySection = ({ id, title, subtitle, colleges, bgClass, isDark, icon: Icon }) => {
  return (
    <section id={id} className={`section-padding ${bgClass}`} data-testid={`${id}-section`}>
      <div className="container-custom">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
          <div className="text-center mb-12">
            <motion.div variants={fadeUp} className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 ${isDark ? "bg-[#FFD700]" : "bg-gradient-to-br from-[#003366] to-[#004080]"}`}>
              {Icon && <Icon className={`w-10 h-10 ${isDark ? "text-[#003366]" : "text-white"}`} />}
            </motion.div>
            
            <motion.div variants={fadeUp} className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-4 ${isDark ? "bg-white/10 text-[#FFD700] border border-[#FFD700]/30" : "bg-[#003366]/10 text-[#003366] border border-[#003366]/20"}`}>
              {subtitle}
            </motion.div>
            
            <motion.h2 variants={fadeUp} className={`font-heading text-3xl md:text-5xl font-bold leading-tight ${isDark ? "text-white" : "text-[#1A1A1A]"}`}>
              {title}
            </motion.h2>
          </div>

          <motion.div variants={fadeUp} className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {colleges.map((college, index) => (
              <motion.div key={index} whileHover={{ scale: 1.03, y: -5 }} transition={{ duration: 0.2 }} className={`relative p-5 rounded-xl cursor-default group overflow-hidden ${isDark ? "bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#FFD700]/50 hover:bg-white/10" : "bg-white shadow-md border border-gray-100 hover:shadow-xl hover:border-[#003366]/30"}`}>
                <div className={`absolute top-0 left-0 w-1 h-full transition-all duration-300 ${isDark ? "bg-[#FFD700]/30 group-hover:bg-[#FFD700]" : "bg-[#003366]/20 group-hover:bg-[#003366]"}`} />
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${isDark ? "bg-[#FFD700]/20 text-[#FFD700]" : "bg-[#003366]/10 text-[#003366]"}`}>
                    {index + 1}
                  </div>
                  <p className={`text-sm font-medium leading-snug ${isDark ? "text-white/90" : "text-[#333]"}`}>
                    {college}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Private Universities Section with Fee Modal
const PrivateUniversitiesSection = () => {
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const universities = [
    "GD Goenka University",
    "Bennett University",
    "SRM University",
    "Manav Rachna University",
    "Geeta University",
    "Sharda University",
    "Shiv Nadar University",
    "Noida International University",
    "SGT University",
    "World University of Design"
  ];

  const handleCardClick = (university) => {
    setSelectedUniversity(university);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUniversity(null);
  };

  return (
    <>
      <section id="private" className="section-padding bg-gradient-to-br from-[#fffff] via-[#fffff] to-[#fffff]" data-testid="private-section">
        <div className="container-custom">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <div className="text-center mb-12">
              <motion.div variants={fadeUp} className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 bg-[#fffff]">
                <Star className="w-10 h-10 text-[#2f2096]" />
              </motion.div>
              
              <motion.div variants={fadeUp} className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-4 bg-black/10 text-[#2f2096] border border-[#2f2096]/30">
                top 10 private universities
              </motion.div>
              
              <motion.h2 variants={fadeUp} className="font-heading text-3xl md:text-5xl font-bold leading-tight text-black">
                Top Private Universities in Delhi NCR
              </motion.h2>
              
              <motion.p variants={fadeUp} className="text-black/70 mt-4 max-w-2xl mx-auto">
                Click on any university to view detailed fee structure for 2026-27
              </motion.p>
            </div>

            <motion.div variants={fadeUp} className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {universities.map((university, index) => (
                <motion.div 
                  key={index} 
                  whileHover={{ scale: 1.05, y: -8 }} 
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }} 
                  onClick={() => handleCardClick(university)}
                  className="relative p-5 rounded-xl cursor-pointer group overflow-hidden bg-black/5 backdrop-blur-sm border border-black/10 hover:border-[#19265c] hover:bg-black/15 transition-all duration-300"
                  data-testid={`private-card-${index}`}
                >
                  <div className="absolute top-0 left-0 w-1 h-full transition-all duration-300 bg-[#19265c]/30 group-hover:bg-[#19265c]" />
                  
                  {/* Click indicator */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-[#FFD700] text-[#003366] text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                      <IndianRupee className="w-3 h-3" />
                      View Fees
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold bg-[#19265c]/20 text-[#19265c]">
                      {index + 1}
                    </div>
                    <p className="text-sm font-medium leading-snug text-black/90 group-hover:text-black">
                      {university}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Fee Modal */}
      <FeeModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        universityName={selectedUniversity} 
      />
    </>
  );
};

// Services Section
const ServicesSection = () => {
  const services = [
    { icon: Users, title: "Admission Counselling", desc: "Expert one-on-one guidance for your admission journey" },
    { icon: BookOpen, title: "Course & Career Mapping", desc: "Find the perfect course aligned with your goals" },
    { icon: Building2, title: "University Shortlisting", desc: "Curated list of universities matching your profile" },
    { icon: FileCheck, title: "CUET / Entrance Guidance", desc: "Complete preparation strategy and tips" },
    { icon: Award, title: "Application & Documentation", desc: "End-to-end application support" },
    { icon: GraduationCap, title: "Post-Admission Assistance", desc: "Support even after you get admitted" }
  ];

  return (
    <section id="services" className="section-padding bg-white relative overflow-hidden" data-testid="services-section">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFD700]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#003366]/10 rounded-full blur-3xl" />
      
      <div className="container-custom relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="text-center mb-16">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-[#d0e0f7]/10 border border-[#003366]/20 px-4 py-2 rounded-full mx-auto">
            <Award className="w-4 h-4 text-[#003366]" />
            <span className="text-[#003366] text-sm font-medium">Our Services</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-heading text-3xl md:text-4xl font-bold text-[#1A1A1A] mt-4">
            Career Guidance Services
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-6 inline-block">
            <div className="bg-gradient-to-r from-[#003366] to-[#004080] text-white px-8 py-4 font-bold text-xl rounded-lg shadow-lg">
              Career Guidance Fee: ₹10,000 <span className="text-sm font-normal opacity-90">(One-time | Complete Support)</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div key={index} variants={fadeUp}>
              <Card className="h-full cursor-pointer group bg-gradient-to-br from-white to-[#F4F4F0] border-2 border-transparent hover:border-[#003366] transition-all duration-300 hover:shadow-xl" data-testid={`service-card-${index}`}>
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#003366] to-[#004080] flex items-center justify-center mb-4 rounded-lg group-hover:scale-110 transition-transform shadow-lg">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-[#1A1A1A] mb-2">{service.title}</h3>
                  <p className="text-[#5A5A5A]">{service.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Video Gallery - Horizontal Scroll
const VideoGallery = () => {
  const videos = [
    { id: "HXn-JZL8QpE" },
    { id: "Wjjsfn6v2L0" },
    { id: "di94vfmuy20" },
    { id: "DAOdGifJMWk" },
    { id: "0I7eWLjjZC0" },
    { id: "H4dc5GZlycA" },
    { id: "AQaEQFFfLQs" },
    { id: "HZjjwGgH52I" },
    { id: "o8XjjcCnhI0" }
  ];

  return (
    <section id="videos" className="section-padding bg-gradient-to-br from-[#F4F4F0] to-[#E8E8E4]" data-testid="videos-section">
      <div className="container-custom">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="text-center mb-12">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-[#003366]/10 border border-[#003366]/20 px-4 py-2 rounded-full mx-auto">
            <Video className="w-4 h-4 text-[#003366]" />
            <span className="text-[#003366] text-sm font-medium">Video Resources</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-heading text-3xl md:text-4xl font-bold text-[#1A1A1A] mt-4">
            Watch Our Guidance Videos
          </motion.h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-6" style={{ width: 'max-content' }}>
              {videos.map((video, index) => (
                <div key={video.id} className="w-[350px] md:w-[400px] flex-shrink-0 bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300" data-testid={`video-card-${index}`}>
                  <div className="aspect-video">
                    <iframe src={`https://www.youtube.com/embed/${video.id}`} title={`Edu9 Video ${index + 1}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" className="w-full h-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-4 gap-2">
            <span className="text-sm text-[#5A5A5A] flex items-center gap-2">
              <ArrowRight className="w-4 h-4 animate-pulse" />
              Scroll to see more videos
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Slot Booking Section
const SlotBookingSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-[#003366] via-[#004080] to-[#003366] relative overflow-hidden" data-testid="slot-booking-section">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full mx-auto">
            <Calendar className="w-4 h-4 text-[#FFD700]" />
            <span className="text-[#FFD700] text-sm font-medium">Slot Booking</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-heading text-3xl md:text-5xl font-bold text-white mt-4">
            Book a 1-on-1 Session
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/70 mt-4 max-w-xl mx-auto text-lg">
            Get personalized guidance from Edu9 Career Experts. Book your consultation slot now.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-4">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#FFD700] text-[#003366] px-10 py-6 text-lg font-bold hover:bg-[#FFC000] rounded-none shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all" data-testid="slot-book-now-btn">
                <Calendar className="w-5 h-5 mr-2" />
                Book Your Slot Now
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  return (
    <section id="contact" className="section-padding bg-white" data-testid="contact-section">
      <div className="container-custom">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="text-center mb-16">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-[#003366]/10 border border-[#003366]/20 px-4 py-2 rounded-full mx-auto">
            <MapPin className="w-4 h-4 text-[#003366]" />
            <span className="text-[#003366] text-sm font-medium">Contact Us</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-heading text-3xl md:text-4xl font-bold text-[#1A1A1A] mt-4">
            
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="w-full h-[400px] rounded-lg overflow-hidden shadow-xl" data-testid="google-map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.529363622335!2d78.44231507516596!3d17.434359483460852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9160af7ddf1b%3A0xd324b68f71027183!2sEdu9%20Career%20Guidance!5e0!3m2!1sen!2sin!4v1770112241169!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Edu9 Office Location" />
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-4">
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <img src={LOGO_URL} alt="Edu9 Career Guidance" className="h-16" />
            </motion.div>

            <motion.div variants={fadeUp} className="bg-gradient-to-br from-[#F4F4F0] to-white p-5 rounded-lg border border-[#E5E5E0] hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#003366] to-[#004080] flex items-center justify-center rounded-lg">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-[#1A1A1A]">Phone</p>
                  <a href="tel:9133311450" className="text-[#003366] hover:underline font-semibold text-lg" data-testid="phone-link">9133311450</a>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-gradient-to-br from-[#F4F4F0] to-white p-5 rounded-lg border border-[#E5E5E0] hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#003366] to-[#004080] flex items-center justify-center rounded-lg">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-[#1A1A1A]">Email</p>
                  <a href="mailto:manager@edu9.in" className="text-[#003366] hover:underline font-semibold text-lg" data-testid="email-link">manager@edu9.in</a>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-gradient-to-br from-[#F4F4F0] to-white p-5 rounded-lg border border-[#E5E5E0] hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#003366] to-[#004080] flex items-center justify-center rounded-lg flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-[#1A1A1A]">Office Address</p>
                  <p className="text-[#5A5A5A]">12th Floor, Vasavi Mpm Grand, 1312,<br />beside Ameerpet Metro Station, Ameerpet,<br />Hyderabad, Telangana 500073</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="flex gap-3 pt-4">
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#1877F2] text-white flex items-center justify-center rounded-lg hover:scale-110 transition-transform">
                <FacebookIcon />
              </a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white flex items-center justify-center rounded-lg hover:scale-110 transition-transform">
                <InstagramIcon />
              </a>
              <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-lg hover:scale-110 transition-transform">
                <TwitterIcon />
              </a>
              <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#25D366] text-white flex items-center justify-center rounded-lg hover:scale-110 transition-transform">
                <WhatsAppIcon />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-[#003366] py-12" data-testid="footer">
      <div className="container-custom">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <img src={LOGO_URL} alt="Edu9 Career Guidance" className="h-14 mb-4" />
            <p className="text-white/70 text-sm max-w-md">
              Edu9 Career Guidance provides expert counselling and admission guidance for Delhi's top universities including DTU, DU, IPU and more.
            </p>
            <div className="flex gap-3 mt-6">
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 text-white flex items-center justify-center rounded-lg hover:bg-[#1877F2] transition-colors">
                <FacebookIcon />
              </a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 text-white flex items-center justify-center rounded-lg hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] transition-colors">
                <InstagramIcon />
              </a>
              <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 text-white flex items-center justify-center rounded-lg hover:bg-black transition-colors">
                <TwitterIcon />
              </a>
              <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 text-white flex items-center justify-center rounded-lg hover:bg-[#25D366] transition-colors">
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-[#FFD700] mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <a href="#dtu" className="text-white/70 hover:text-[#FFD700] text-sm transition-colors">DTU & Engineering</a>
              <a href="#du" className="text-white/70 hover:text-[#FFD700] text-sm transition-colors">Delhi University</a>
              <a href="#ipu" className="text-white/70 hover:text-[#FFD700] text-sm transition-colors">IPU Colleges</a>
              <a href="#private" className="text-white/70 hover:text-[#FFD700] text-sm transition-colors">Top Private Universities</a>
              <a href="#services" className="text-white/70 hover:text-[#FFD700] text-sm transition-colors">Our Services</a>
              <a href="#contact" className="text-white/70 hover:text-[#FFD700] text-sm transition-colors">Contact Us</a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-[#FFD700] mb-4">Contact</h4>
            <div className="flex flex-col gap-2 text-sm text-white/70">
              <p>Phone: 9133311450</p>
              <p>Email: manager@edu9.in</p>
              <p>Hyderabad, Telangana</p>
            </div>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-block mt-4">
              <Button className="bg-[#FFD700] text-[#003366] hover:bg-[#FFC000] rounded-none text-sm font-semibold" data-testid="footer-book-btn">
                Book Consultation
              </Button>
            </a>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
          <p>© 2025 Edu9 Career Guidance. All rights reserved.</p>
          <p>A subdomain of edu9.in</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  return (
    <div className="App">
      <Navbar />
      <HeroSection />
      
      <UniversitySection
        id="dtu"
        title="Engineering Excellence at DTU & Top Tech Institutes"
        subtitle="DTU & Top Engineering"
        icon={Cpu}
        colleges={["Delhi Technological University (DTU)", "Netaji Subhas University of Technology (NSUT)", "IIIT Delhi (IIIT-D)", "NIT Delhi", "Indira Gandhi Delhi Technical University for Women (IGDTUW)", "Jamia Millia Islamia – Engineering Programs", "Bharati Vidyapeeth College of Engineering (BVCOE)", "Maharaja Agrasen Institute of Technology (MAIT)", "Maharaja Surajmal Institute of Technology (MSIT)", "Other reputed engineering colleges in Delhi NCR"]}
        bgClass="bg-gradient-to-br from-[#34ebdb] to-[#dee6e5]"
        isDark={false}
      />

      <UniversitySection
        id="du"
        title="The Legacy of Delhi University"
        subtitle="DU / CPU Colleges"
        icon={Landmark}
        colleges={["Hindu College", "Hansraj College", "Miranda House", "St. Stephen's College", "Kirori Mal College", "Sri Venkateswara College", "Deen Dayal Upadhyaya College", "Bhaskaracharya College of Applied Sciences", "Sri Guru Tegh Bahadur Khalsa College", "Atma Ram Sanatan Dharma College & other top DU colleges"]}
        bgClass="bg-gradient-to-br from-[#a4eb34] to-[#dee6e5]"
        isDark={false}
      />

      <UniversitySection
        id="ipu"
        title="Professional Growth at IPU"
        subtitle="IPU Colleges"
        icon={Scale}
        colleges={["University School of Law & Legal Studies (USLLS)", "Maharaja Agrasen Institute of Technology (MAIT)", "Vivekananda Institute of Professional Studies (VIPS)", "Maharaja Surajmal Institute (MSI)", "JIMS – IP University", "Northern India Engineering College (NIEC)", "Institute of Information Technology & Management (IITM-IPU)", "Delhi School of Professional Studies & Research (DSPSR)", "Rukmini Devi Institute of Advanced Studies (RDIAS)", "GGSIPU University Schools (USICT, USMS, etc.)"]}
        bgClass="bg-gradient-to-br from-[#eb5234] to-[#F8F9FA]"
        isDark={false}
      />

      <PrivateUniversitiesSection />

      <ServicesSection />
      <VideoGallery />
      <SlotBookingSection />
      <ContactSection />
      <Footer />
      <FloatingWhatsApp />
      
    </div>
  );
}

export default App;
