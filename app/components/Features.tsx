'use client';

import {motion} from 'framer-motion';

const Features = () => {

  return (
     <section id="features" className="py-16 md:py-24 text-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-accent mb-12">
          Powerful Features Designed for You
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-2">
           <motion.div className="flex flex-col items-center text-center p-4" 
              initial={{ x: -120, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}>
                <div className="w-full max-w-xs h-48 mb-5 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition shadow-accent bg-neutral-950 flex items-center justify-center">            
                   <img
                    src="/images/smart-suggestions.png"
                    alt='smart-suggestions'
                    className="object-cover w-full"
                  />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  AI-Powered Smart Suggestions
                </h3>
                <p className="text-muted-foreground">
                  Receive intelligent recommendations tailored to your unique intake patterns and goals.
                </p>
              </motion.div>
                 <motion.div className="flex flex-col items-center text-center p-4" 
                    initial={{ y: 120, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}>
                <div className="w-full max-w-xs h-48 mb-5 rounded-lg transition overflow-hidden shadow-md hover:shadow-lg shadow-accent bg-neutral-950 flex items-center justify-center">
                   <img
                    src="/images/reasoning.png"
                    alt='/images/smart-reasoning'
                    className="object-cover"/>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Clear Reasoning Provided
                </h3>
                <p className="text-muted-foreground">
                  Understand *why* the AI suggests a particular supplement or adjustment. Knowledge is power.
                </p>
              </motion.div>
                 <motion.div className="flex flex-col items-center text-center p-4" 
                    initial={{ x: 120, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}>
                <div className="w-full max-w-xs h-48 mb-5 rounded-lg transition overflow-hidden shadow-md hover:shadow-lg shadow-accent bg-neutral-950 flex items-center justify-center">
                   <img
                    src="/images/categorization.png"
                    alt='categorization'
                    className="object-center w-full"
                  /> 
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Detailed Categorization
                </h3>
                <p className="text-muted-foreground">
                  Log supplements precisely by time of day and relation to meals.
                </p>
              </motion.div>
        </div>
       
      </div>
    </section>
  )
}

export default Features