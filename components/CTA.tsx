'use client';

import { motion } from 'framer-motion'

const CTA = () => {
  return (
        <section id="final-cta" className="py-16 md:py-24 text-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">
          Ready to Track Your Supplements Smarter?
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
          Join thousands taking control of their wellness journey with VitaCheck.
        </p>
          <button  className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-2xl font-semibold px-6 py-4 text-lg">
            Get Started - It's Free!
          </button>
        <p className="mt-8 text-muted-foreground">
          Coming Soon to:
        </p>
        <div className="mt-6 flex justify-center items-center gap-4 flex-wrap">
          <motion.div 
            className="h-12 w-36 md:h-14 md:w-44 bg-neutral-950 border border-border rounded-lg flex items-center justify-center text-sm text-muted-foreground shadow-md" data-ai-hint="app store"
            initial={{opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, amount: 0.3 }}>
            App Store
          </motion.div>
          <motion.div 
            initial={{opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, amount: 0.3 }}
          className="h-12 w-36 md:h-14 md:w-44  bg-neutral-950 border border-border rounded-lg flex items-center justify-center text-sm text-muted-foreground shadow-md" data-ai-hint="google play">
            Google Play
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CTA