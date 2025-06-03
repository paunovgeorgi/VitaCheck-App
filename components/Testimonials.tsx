'use client';

import { Quote } from "lucide-react";
import {motion} from 'framer-motion';
import { testimonials } from "../constants";

const Testimonials = () => {
  return (
      <section id="testimonials" className="py-16 md:py-24 bg-secondary/20 text-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-accent mb-12">
          Hear From Our Users
        </h2>
        <div className="flex overflow-x-auto space-x-6 md:space-x-8 pb-6 snap-x snap-mandatory scrollbar-thin xl:justify-center scrollbar-thumb-muted-foreground/50 scrollbar-track-transparent">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex-none w-80 md:w-96 snap-start backdrop-blur-lg bg-neutral-950  shadow-neutral-950 p-6 md:p-8 rounded-lg shadow-xl text-left relative"
            >
              <Quote className="w-12 h-12 text-accent/30 absolute top-4 left-4" />
              <motion.p className="text-lg text-muted-foreground italic mt-10 mb-6"
                      initial={{  opacity: 0 }}
            whileInView={{opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}>
                {testimonial.quote}
              </motion.p>
              <div className="font-semibold text-accent">
                {testimonial.author}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-10 text-md text-muted-foreground">
          Trusted by individuals and recommended by wellness professionals.
        </p>
      </div>
    </section>
  )
}

export default Testimonials