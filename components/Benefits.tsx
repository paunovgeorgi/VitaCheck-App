import { Lightbulb, Brain, Timer} from "lucide-react";

const Benefits = () => {

  const benefits = [
  {
    icon: Lightbulb,
    title: "Comprehensive Tracking",
    description: "Log vitamins, minerals, herbs, and more, categorized by time of day and relation to food for complete accuracy.",
  },
  {
    icon: Brain,
    title: "Smart AI Guidance & Reasoning",
    description: "Get personalized intake suggestions. VitaCheck's AI explains *why* it makes a suggestion, empowering you.",
  },
  {
    icon: Timer,
    title: "Effortless Logging",
    description: "Our intuitive interface and smart features like autocomplete make adding supplements quick and easy.",
  },
];


  return (
          <section id="why-use" className="py-16 md:py-24 text-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-accent mb-6">
          Your Path to Informed Supplementation Starts Here
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
          VitaCheck isn't just a tracker it's your personal guide to understanding and optimizing your supplement intake. Discover the difference smart tracking makes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={index}
                className="p-6 md:p-8 rounded-lg backdrop-blur-lg shadow-2xl shadow-neutral-900 border-t-4 hover:scale-105 transition border-accent text-left"
              >
                <IconComponent className="w-10 h-10 md:w-12 md:h-12 mb-4 text-green-300 animate-pulse" />
                <h3 className="text-xl md:text-2xl font-semibold text-card-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}

export default Benefits