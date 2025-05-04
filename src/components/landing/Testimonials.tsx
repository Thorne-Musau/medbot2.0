import { motion } from 'framer-motion';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Healthcare Professional",
    content: "MedBot has revolutionized how I provide medication information to my patients. The AI analysis is incredibly accurate and saves so much time.",
    avatar: "/avatars/sarah.jpg"
  },
  {
    name: "Michael Chen",
    role: "Patient",
    content: "As someone who takes multiple medications, MedBot has been a lifesaver. I can quickly understand my medications and their interactions.",
    avatar: "/avatars/michael.jpg"
  },
  {
    name: "Dr. Emily Rodriguez",
    role: "Pharmacist",
    content: "The comprehensive information provided by MedBot helps me ensure my patients understand their medications better. It's an invaluable tool.",
    avatar: "/avatars/emily.jpg"
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-600">Trusted by healthcare professionals and patients alike</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="bg-white p-6 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600">{testimonial.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 