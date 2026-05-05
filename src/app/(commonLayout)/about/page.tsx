import React from "react";
import Image from "next/image";
import { Users, Target, Heart, Award, ChevronRight, Utensils, Zap, ShieldCheck } from "lucide-react";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-orange-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-red-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h4 className="text-orange-500 font-black uppercase tracking-[0.2em] text-sm mb-6 animate-fade-in">
              Our Journey
            </h4>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-slate-50 tracking-tight leading-[1.1] mb-8">
              We're on a mission to <span className="text-orange-500">revolutionize</span> how you experience food.
            </h1>
            <p className="text-lg lg:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
              FoodHub isn't just a delivery platform. It's a community where passion for culinary excellence meets cutting-edge technology.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Active Users", value: "50K+", icon: Users },
              { label: "Restaurants", value: "200+", icon: Utensils },
              { label: "Daily Orders", value: "5K+", icon: Zap },
              { label: "Quality Rating", value: "4.9/5", icon: ShieldCheck },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800 text-center hover:scale-[1.02] transition-transform">
                <div className="inline-flex p-3 bg-orange-50 dark:bg-orange-500/10 rounded-2xl text-orange-500 mb-4">
                  <stat.icon size={24} />
                </div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-slate-50 mb-1">{stat.value}</h3>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
              <div className="relative z-10 rounded-[48px] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                <Image
                  src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop"
                  alt="Our Story"
                  width={600}
                  height={700}
                  className="object-cover h-[500px] w-full"
                />
              </div>
            </div>
            <div className="flex-1 space-y-8 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 dark:bg-orange-500/10 rounded-full text-orange-600 font-bold text-sm">
                <Target size={18} /> Our Vision
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-slate-50 leading-tight">
                Bridging the gap between <span className="text-orange-500 underline decoration-orange-200 underline-offset-8">local talent</span> and global cravings.
              </h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                Founded in 2024, FoodHub started with a simple idea: everyone deserves access to the best local flavors, and every chef deserves a platform to shine. We've built an ecosystem that empowers small businesses while providing customers with an unparalleled dining experience.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  "Hyper-local sourcing",
                  "Ethical merchant partnerships",
                  "Real-time tracking tech",
                  "Community-first approach"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 font-bold text-slate-700 dark:text-slate-200">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center text-green-600">
                      <ChevronRight size={14} strokeWidth={4} />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-orange-500 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-blue-500 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl lg:text-5xl font-black mb-16 text-slate-900 dark:text-slate-50 text-white">The Values We <span className="text-orange-500">Eat & Breathe</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 dark:bg-slate-900">
            {[
              {
                title: "Quality First",
                desc: "We never compromise on the freshness and quality of the food delivered to your doorstep.",
                icon: Award,
                color: "orange"
              },
              {
                title: "User Experience",
                desc: "Our technology is designed to be invisible, making your journey from craving to eating seamless.",
                icon: Zap,
                color: "blue"
              },
              {
                title: "Sustainability",
                desc: "We're committed to reducing our carbon footprint through eco-friendly packaging and efficient routing.",
                icon: Heart,
                color: "red"
              }
            ].map((value, i) => (
              <div key={i} className="group p-8 rounded-[40px] bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-500 dark:border-slate-700">
                <div className={`inline-flex p-5 rounded-3xl bg-${value.color}-500/20 text-${value.color}-500 mb-6 group-hover:scale-110 transition-transform`}>
                  <value.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-50">{value.title}</h3>
                <p className="text-slate-400 leading-relaxed font-medium">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-[56px] p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-orange-500/20">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-black mb-8 leading-tight">Ready to taste the <span className="text-black">difference?</span></h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/food" className="px-10 h-16 bg-white text-orange-600 rounded-2xl flex items-center justify-center font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-xl">
                Explore Menu
              </Link>
              <Link href="/help-support" className="px-10 h-16 bg-black/20 backdrop-blur-md border border-white/30 text-white rounded-2xl flex items-center justify-center font-black text-lg hover:bg-black/30 transition-all">
                Become a Partner
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
