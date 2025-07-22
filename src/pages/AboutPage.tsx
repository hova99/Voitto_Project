import React from 'react';
import AnimatedCounter from '../components/AnimatedCounter';
import { Award, Users, Truck, Shield, Clock, MapPin } from 'lucide-react';

const AboutPage: React.FC = () => {
  const team = [
    {
      name: 'Antony Kamau',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      description: 'Over 25 years of experience in the construction industry'
    },
    {
      name: 'Sarah Njeri',
      role: 'Operations Manager',
      image: 'https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg',
      description: 'Expert in logistics and supply chain management'
    },
    {
      name: 'David Kipchoge',
      role: 'Quality Assurance',
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg',
      description: 'Ensures all materials meet industry standards'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header Video with fallback */}
      <div className="relative h-[400px] overflow-hidden">
        <video
          className="w-full h-full object-cover absolute top-0 left-0"
          autoPlay
          muted
          loop
          playsInline
          poster="https://cdn.pixabay.com/photo/2017/12/03/17/22/paving-stone-2995324_640.jpg"
        >
          <source src="https://res.cloudinary.com/dnv6mjhxv/video/upload/v1753110507/6036438_Man_People_1280x720_m2kwaa.webm" type="video/webm" />
          <img
            src="https://cdn.pixabay.com/photo/2017/12/03/17/22/paving-stone-2995324_640.jpg"
            alt="Fallback"
            className="w-full h-full object-cover"
          />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-4xl font-bold text-center px-4">
             Quality that lasts.
          </h1>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://cdn.pixabay.com/photo/2017/04/02/09/08/bulldozer-2195329_640.jpg"
              alt="Construction workers"
              className="rounded-lg shadow-xl"
              loading="lazy"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-6">Our Story</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Voitto Company Limited was founded in 2017 with a simple mission: to provide Kenya’s builders
              with quality construction materials at fair prices. What began with a single truck and strong
              commitment has grown into one of the country’s trusted suppliers.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We serve thousands of customers — from homeowners to major contractors — and our foundation rests
              on three pillars: quality products, dependable service, and competitive pricing.
            </p>
          </div>
        </div>
      </section>

      {/* Our Impact (Animated Counters) */}
      <section className="py-16 bg-blue-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Our Impact</h2>
          <p className="text-blue-200 mb-12">8 years of trusted service and solid foundations</p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <Counter icon={<Award />} label="Years of Experience" end={8} />
            <Counter icon={<Shield />} label="Projects Completed" end={200} />
            <Counter icon={<Users />} label="Happy Clients" end={400} />
            <Counter icon={<Truck />} label="Product Categories" end={50} />
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-blue-900 mb-12">Our Mission & Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Value icon={<Shield />} title="Quality First" desc="We provide materials that meet or exceed all industry standards." />
            <Value icon={<Clock />} title="Reliable Service" desc="We deliver on time — always." />
            <Value icon={<Users />} title="Customer Focus" desc="We offer personal support to every client, big or small." />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="bg-slate-50 rounded-lg shadow-md overflow-hidden">
                <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-blue-900">{member.name}</h3>
                  <p className="text-orange-600 mb-2">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Quality Certifications</h2>
          <p className="text-gray-600 mb-12">Recognized by industry leaders</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Award />, title: "ISO 9001:2015", desc: "Quality Management System" },
              { icon: <Shield />, title: "KEBS Certified", desc: "Kenya Bureau of Standards" },
              { icon: <MapPin />, title: "NCA Registered", desc: "National Construction Authority" },
              { icon: <Users />, title: "Safety Certified", desc: "Occupational Health & Safety" }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-orange-600 mb-3">{item.icon}</div>
                <h3 className="text-blue-900 font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper components
const Counter = ({ icon, label, end }: { icon: React.ReactNode; label: string; end: number }) => (
  <div className="text-center">
    <div className="bg-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
      {React.cloneElement(icon as React.ReactElement, { className: "h-8 w-8 text-white" })}
    </div>
    <AnimatedCounter end={end} suffix="+" />
    <div className="text-blue-200 mt-2">{label}</div>
  </div>
);

const Value = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <div className="bg-white p-8 rounded-lg shadow-md text-center">
    <div className="text-orange-600 mb-4">
      {React.cloneElement(icon as React.ReactElement, { className: "h-12 w-12 mx-auto" })}
    </div>
    <h3 className="text-xl font-semibold text-blue-900 mb-2">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </div>
);

export default AboutPage;
