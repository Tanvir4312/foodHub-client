import React from "react";
import {
  Search,
  MessageSquare,
  Store,
  Truck,
  HelpCircle,
  LifeBuoy,
  ChevronRight,
  PhoneCall,
  Mail,
  Globe,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Clock
} from "lucide-react";
import Link from "next/link";

const HelpSupportPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-slate-100 tracking-tight mb-6">
            How can we <span className="text-orange-500 underline decoration-orange-200 underline-offset-8">help you</span> today?
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
            Find answers to common questions, contact our support team, or learn how to grow your business with FoodHub.
          </p>
        </div>
      </section>

      {/* Main Support Grid */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              title: "General FAQ",
              desc: "Quick answers for common questions about orders and delivery.",
              icon: HelpCircle,
              link: "/faq",
              color: "blue"
            },
            {
              title: "Partner Support",
              desc: "Dedicated help for our restaurant and merchant partners.",
              icon: LifeBuoy,
              link: "/register",
              color: "orange"
            }
          ].map((card, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
              <div className={`inline-flex p-4 rounded-3xl bg-${card.color}-50 dark:bg-${card.color}-500/10 text-${card.color}-500 mb-6 group-hover:scale-110 transition-transform`}>
                <card.icon size={28} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-3">{card.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium mb-6">{card.desc}</p>
              <Link href={card.link} className="inline-flex items-center gap-2 font-bold text-orange-500 group-hover:gap-4 transition-all">
                {card.title === "Partner Support" ? "Get Started" : "Learn More"} <ArrowRight size={18} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* JOIN COMMUNITY SECTION (Provider Focus) */}
      <section className="py-24 bg-white dark:bg-slate-900 overflow-hidden relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-50 dark:bg-orange-500/10 rounded-full text-orange-600 font-black text-sm uppercase tracking-widest">
                <Store size={18} /> Grow Your Business
              </div>
              <h2 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-slate-100 leading-[1.1] tracking-tight">
                Join the <span className="text-orange-500">FoodHub</span> Merchant Community
              </h2>
              <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Ready to take your restaurant or food shop to the next level? Join hundreds of partners already reaching thousands of new customers every day.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6">
                {[
                  { title: "Wider Reach", desc: "Access thousands of active local customers instantly.", icon: Globe },
                  { title: "Fast Delivery", desc: "Our network handles the logistics while you cook.", icon: Truck },
                  { title: "Growth Analytics", desc: "Get insights on sales and customer preferences.", icon: TrendingUp },
                  { title: "24/7 Support", desc: "Dedicated team to help manage your digital store.", icon: Clock },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-orange-500">
                      <item.icon size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-400 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8">
                <Link href="/register" className="h-16 px-10 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl inline-flex items-center justify-center font-black text-lg shadow-xl shadow-orange-500/30 active:scale-[0.98] transition-all gap-3">
                  Partner with Us <ArrowRight size={20} />
                </Link>
              </div>
            </div>

            <div className="flex-1 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-500/5 rounded-full blur-[100px]" />
              <div className="relative bg-slate-900 rounded-[56px] p-8 lg:p-12 shadow-2xl border border-slate-800 group overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-orange-500/10 transition-colors duration-700">
                  <Store size={200} />
                </div>

                <h3 className="text-3xl font-black text-white mb-8 relative z-10">Why wait?</h3>
                <div className="space-y-6 relative z-10">
                  {[
                    "Zero sign-up fees for the first 30 days",
                    "Marketing materials & digital training",
                    "Integrated secure payment gateway",
                    "Real-time order dashboard"
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-4 text-slate-300 font-bold">
                      <div className="w-6 h-6 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center">
                        <ShieldCheck size={14} strokeWidth={4} />
                      </div>
                      {text}
                    </div>
                  ))}
                </div>

                <div className="mt-12 p-6 bg-white/5 rounded-3xl border border-white/10 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-700 overflow-hidden border-2 border-orange-500">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Testimonial" />
                    </div>
                    <div>
                      <p className="text-white font-bold italic text-sm">"FoodHub increased our monthly orders by 40% in just two weeks!"</p>
                      <p className="text-slate-500 text-xs mt-1">— Marco, Owner of Little Italy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-slate-900 rounded-[56px] p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-orange-500 opacity-[0.03]" />

          <div className="text-center lg:text-left space-y-4 max-w-md">
            <h2 className="text-3xl lg:text-5xl font-black text-white dark:text-slate-100 leading-tight">Still have <span className="text-orange-500">questions?</span></h2>
            <p className="text-slate-400 dark:text-slate-300 font-medium text-lg">Our dedicated team is ready to assist you 24/7.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto items-center">
            <a href="mailto:support@foodhub.com" className="h-16 px-8 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center gap-3 text-white dark:text-slate-100 font-bold transition-all group whitespace-nowrap">
              <Mail className="text-orange-500 group-hover:scale-110 transition-transform flex-shrink-0" />
              support@foodhub.com
            </a>
            <a href="tel:+880123456789" className="h-16 px-8 bg-orange-500 hover:bg-orange-600 rounded-2xl flex items-center gap-3 text-white font-black shadow-lg shadow-orange-500/20 active:scale-95 transition-all whitespace-nowrap">
              <PhoneCall size={20} className="flex-shrink-0" /> +880 123 456 789
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpSupportPage;
