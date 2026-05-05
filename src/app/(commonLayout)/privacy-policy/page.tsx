import React from "react";
import { Shield, Lock, Eye, FileText, Scale, Clock } from "lucide-react";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-20 lg:py-32">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex p-4 bg-orange-50 dark:bg-orange-500/10 rounded-3xl text-orange-600 mb-6 animate-bounce">
            <Shield size={40} />
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-slate-100 tracking-tight mb-6">
            Privacy <span className="text-orange-500">Policy</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
            Last updated: May 05, 2026. Your privacy is our top priority.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12 text-slate-700 dark:text-slate-300">
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-3">
              <Eye className="text-orange-500" /> 1. Information We Collect
            </h2>
            <p className="leading-relaxed">
              We collect information that you provide directly to us when you create an account, place an order, or contact us. This includes your name, email address, phone number, and delivery address.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-3">
              <Lock className="text-orange-500" /> 2. How We Use Your Data
            </h2>
            <p className="leading-relaxed">
              Your data is used solely to provide and improve our services, process payments, and ensure your food reaches you safely and quickly. We never sell your personal information to third parties.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-3">
              <Scale className="text-orange-500" /> 3. Data Security
            </h2>
            <p className="leading-relaxed">
              We implement industry-standard security measures to protect your information, including SSL encryption and secure payment gateways.
            </p>
          </section>

          <section className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-500 text-white rounded-2xl flex items-center justify-center">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="font-black text-slate-900 dark:text-slate-100 mb-2">Cookies</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  We use cookies to enhance your browsing experience and remember your preferences. You can disable cookies in your browser settings, though some features may not work properly.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
