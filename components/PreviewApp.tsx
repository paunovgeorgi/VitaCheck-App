'use client';
import { motion } from "framer-motion";


const PreviewApp = () => {
  return (
    <section
      id="how-it-works"
      className="py-16 md:py-24 bg-background text-foreground"
    >
      <div className="container mx-auto px-4 text-center">
        <motion.h2 className="text-3xl md:text-4xl font-bold text-accent mb-12"
                    initial={{opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, amount: 0.3 }}>
          Carefully crafted for all platforms
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-2 items-center">
          <motion.div
            className="flex flex-col gap-2 items-center text-center p-4"
            initial={{ x: -120, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-1">
              Coming soon to iOS & Android
            </h3>
            <h4>Tracking your supplements can be fun</h4>
            <p className="text-muted-foreground w-2/3">
              Whether you use the web or mobile version of the app you will get
              the same premium experience and unmatched results
            </p>
            <img
              src="/images/preview.png"
              className="w-[150px] shadow-lg shadow-accent mt-2 hover:scale-103"
            />
          </motion.div>
          <motion.div
            className=""
            initial={{ x: 120, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <img
              src="/images/preview2.png"
              className="hover:scale-103 transition cover w-[400px] shadow-lg shadow-accent"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PreviewApp;
