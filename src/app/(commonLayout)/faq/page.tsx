import React from "react";
import { 
  HelpCircle, 
  ChevronDown, 
  Utensils, 
  Truck, 
  CreditCard, 
  User, 
  MessageCircle,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    category: "Ordering",
    icon: Utensils,
    questions: [
      {
        q: "How do I place an order?",
        a: "Simply browse our menu, add items to your cart, and proceed to checkout. You'll need to create an account or log in to complete your order."
      },
      {
        q: "Can I cancel my order?",
        a: "Orders can be cancelled within 5 minutes of placement. After that, the restaurant begins preparation, and cancellation may not be possible."
      },
      {
        q: "Is there a minimum order amount?",
        a: "Minimum order amounts vary by restaurant. You'll see this information on the restaurant's menu page."
      }
    ]
  },
  {
    category: "Delivery",
    icon: Truck,
    questions: [
      {
        q: "How much does delivery cost?",
        a: "Delivery fees are calculated based on your distance from the restaurant. You'll see the exact fee at checkout."
      },
      {
        q: "How can I track my order?",
        a: "Once your order is confirmed, you can track its real-time status from the 'My Orders' section in your dashboard."
      }
    ]
  },
  {
    category: "Payments",
    icon: CreditCard,
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "Right now, we only accept Cash on Delivery (COD). We're working on integrating secure online payment gateways soon!"
      }
    ]
  },
  {
    category: "Partnerships",
    icon: User,
    questions: [
      {
        q: "How can I join as a merchant?",
        a: "Visit our 'Help & Support' page and click on 'Partner with Us' to start your registration process."
      }
    ]
  }
];

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 lg:py-32">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex p-4 bg-orange-50 dark:bg-orange-500/10 rounded-3xl text-orange-600 mb-6">
            <HelpCircle size={40} />
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-slate-100 tracking-tight mb-6">
            Frequently Asked <span className="text-orange-500">Questions</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
            Everything you need to know about FoodHub. Can't find the answer? Contact our support team.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="space-y-16">
          {faqs.map((group, idx) => (
            <div key={idx} className="space-y-8">
              <div className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-sm text-orange-500">
                  <group.icon size={24} />
                </div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider">{group.category}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {group.questions.map((faq, i) => (
                  <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all group">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-start gap-3">
                      <span className="text-orange-500 mt-1 flex-shrink-0">•</span>
                      {faq.q}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed pl-6 border-l-2 border-slate-50 dark:border-slate-800 group-hover:border-orange-500/30 transition-colors">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Support CTA */}
        <div className="mt-24 p-12 bg-slate-900 rounded-[56px] flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-orange-500 opacity-[0.03]" />
          
          <div className="text-center lg:text-left space-y-4 max-w-md relative z-10">
            <h2 className="text-3xl lg:text-4xl font-black text-white dark:text-slate-100 leading-tight">Still have <span className="text-orange-500">questions?</span></h2>
            <p className="text-slate-400 dark:text-slate-300 font-medium text-lg">We're here to help you 24/7 with any issues or queries.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto relative z-10">
            <Link href="/help-support" className="h-16 px-10 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-xl shadow-orange-500/20 active:scale-95 transition-all whitespace-nowrap">
              Contact Support <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
