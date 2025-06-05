'use client';

import {ListPlus, BarChart3, GoalIcon } from "lucide-react";
import { motion } from "framer-motion";
const steps = [
  {
    number: "1",
    icon: GoalIcon,
    title: "Sign In",
    description: "Sign in or download the mobile version (coming soon).",
  },
  {
    number: "2",
    icon: ListPlus,
    title: "Add Your Supplements", 
    description: "Easily log your current supplements using search, autocomplete, and categorization.",
  },
  {
    number: "3",
    icon: BarChart3,
    title: "Get Smart Insights", 
    description: "Receive personalized AI suggestions and track your progress towards your goals.",
  },
];

const HowItWorks = () => {

  return (
     <section id="how-it-works" className="py-16 md:py-24  text-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-accent mb-12">
          Getting Started is Simple
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div key={step.number} className="flex flex-col items-center text-center p-4">
                <div className="w-16 h-16 mb-5 bg-accent text-accent-foreground animate-bounce rounded-full flex items-center justify-center text-2xl font-bold">
                  {step.number}
                </div>
                <div className="w-20 h-20 md:w-24 md:h-24 mb-6 p-4 rounded-full flex items-center justify-center shadow-md">
                  <IconComponent className="w-10 h-10 md:w-12 md:h-12 text-accent animate-pulse" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <motion.p className="text-muted-foreground"
                  initial={{  opacity: 0 }}
            whileInView={{opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
                > 
                  {step.description}
                </motion.p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks