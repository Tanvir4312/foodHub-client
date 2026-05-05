import React from "react";
import { Scale, FileText, CheckCircle, AlertCircle, HelpCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 lg:py-32">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex p-4 bg-blue-50 dark:bg-blue-500/10 rounded-3xl text-blue-600 mb-6 animate-pulse">
            <Scale size={40} />
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-slate-100 tracking-tight mb-6">
            Terms of <span className="text-blue-500">Service</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
            Please read these terms carefully before using FoodHub.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-slate-900 rounded-[48px] p-8 lg:p-16 shadow-xl border border-slate-100 dark:border-slate-800 space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-3">
              <CheckCircle className="text-blue-500" /> 1. Acceptance of Terms
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              By accessing or using FoodHub, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-3">
              <AlertCircle className="text-orange-500" /> 2. Ordering and Delivery
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              All orders are subject to availability. While we strive for perfection, delivery times are estimates and may vary based on traffic and restaurant preparation times.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-3">
              <FileText className="text-green-500" /> 3. Payments and Refunds
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Payments are processed securely at the time of order. Refunds are handled on a case-by-case basis through our support team if there is an issue with your order.
            </p>
          </section>

          <section className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-bold">
              <HelpCircle size={20} /> Still have questions?
            </div>
            <Link href="/help-support" className="h-14 px-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl flex items-center justify-center font-black gap-2 hover:scale-105 active:scale-95 transition-all">
              Contact Support <ArrowRight size={18} />
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
