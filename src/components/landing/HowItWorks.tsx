import { motion } from 'framer-motion';

interface Step {
  title: string;
  description: string;
  icon: string;
}

const steps: Step[] = [
  {
    title: "Ask Your Question",
    description: "Simply type your medication-related question in natural language.",
    icon: "💬"
  },
  {
    title: "AI Analysis",
    description: "Our advanced AI analyzes your question and provides accurate information.",
    icon: "🤖"
  },
  {
    title: "Get Detailed Information",
    description: "Receive comprehensive details about your medication instantly.",
    icon: "📊"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600">Simple steps to get the information you need</p>
        </motion.div>

        <div className="relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 hidden md:block"></div>
          
          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="flex flex-col md:flex-row items-center gap-8"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="text-4xl mb-4">{step.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                  <div className="bg-blue-100 rounded-lg p-4 text-center">
                    <span className="text-2xl font-bold text-blue-600">Step {index + 1}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 