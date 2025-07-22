import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TestimonialSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Grace Wanjiku',
      role: 'Homeowner, Kiambu',
      image: 'https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg',
      rating: 5,
      text: 'Voitto Concrete delivered exactly what they promised. The cabros for my driveway were of excellent quality and the delivery was on time. Antony and his team are very professional.',
      project: 'Residential Driveway'
    },
    {
      id: 2,
      name: 'Samuel Mwangi',
      role: 'Contractor, Thika',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      rating: 5,
      text: 'I have been working with Voitto Concrete for over 3 years. Their concrete mix is consistent and their prices are competitive. They never disappoint on delivery schedules.',
      project: 'Commercial Building'
    },
    {
      id: 3,
      name: 'Mary Njeri',
      role: 'Property Developer, Nairobi',
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg',
      rating: 5,
      text: 'The quality of their cement and steel rods is outstanding. We completed our 4-storey apartment project ahead of schedule thanks to their reliable supply chain.',
      project: 'Apartment Complex'
    },
    {
      id: 4,
      name: 'John Kariuki',
      role: 'Engineer, Kiambu',
      image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg',
      rating: 5,
      text: 'Voitto Concrete understands the construction industry. Their technical advice helped us choose the right materials for our foundation work. Highly recommended!',
      project: 'Industrial Foundation'
    },
    {
      id: 5,
      name: 'Faith Wambui',
      role: 'Homeowner, Banana',
      image: 'https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg',
      rating: 5,
      text: 'Building my dream home was made easier with Voitto Concrete. From blocks to roofing materials, everything was delivered as promised. Great customer service!',
      project: 'Dream Home Construction'
    },
    {
      id: 6,
      name: 'Peter Kamau',
      role: 'Builder, Ruiru',
      image: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg',
      rating: 5,
      text: 'The WhatsApp ordering system is so convenient! I can place orders anytime and get quick responses. Their sand and gravel quality is consistently good.',
      project: 'Multiple Residential Projects'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600">
            Trusted by builders, contractors, and homeowners across Kenya
          </p>
        </div>

        <div className="relative">
          {/* Desktop View - 2 Column Layout */}
          <div className="hidden md:grid md:grid-cols-2 gap-8">
            {testimonials.slice(currentIndex, currentIndex + 2).map((testimonial, index) => (
              <div key={testimonial.id} className="bg-white rounded-lg shadow-lg p-8 relative">
                <Quote className="absolute top-4 right-4 h-8 w-8 text-orange-200" />
                
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    loading="lazy"
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-blue-900">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                    <div className="flex items-center mt-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed">"{testimonial.text}"</p>
                
                <div className="text-sm text-orange-600 font-medium">
                  Project: {testimonial.project}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile View - Single Column */}
          <div className="md:hidden">
            <div className="bg-white rounded-lg shadow-lg p-6 relative">
              <Quote className="absolute top-4 right-4 h-6 w-6 text-orange-200" />
              
              <div className="flex items-center mb-4">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  loading="lazy"
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div>
                  <h4 className="text-lg font-semibold text-blue-900">{testimonials[currentIndex].name}</h4>
                  <p className="text-gray-600 text-sm">{testimonials[currentIndex].role}</p>
                  <div className="flex items-center mt-1">
                    {renderStars(testimonials[currentIndex].rating)}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 mb-3 leading-relaxed">"{testimonials[currentIndex].text}"</p>
              
              <div className="text-sm text-orange-600 font-medium">
                Project: {testimonials[currentIndex].project}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <ChevronLeft className="h-6 w-6 text-blue-900" />
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-orange-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <ChevronRight className="h-6 w-6 text-blue-900" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;