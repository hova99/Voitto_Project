import React from "react";
import AnimatedCounter from "../components/AnimatedCounter";
import ProductCarousel from "../components/ProductCarousel";
import { Award, Users, Truck, Shield, MapPin } from "lucide-react";

const featuredProducts = [
  {
    name: "High-Grade Cement",
    image: "https://cdn.pixabay.com/photo/2016/03/27/22/16/cement-1280.jpg",
  },
  {
    name: "Reinforced Steel Bars",
    image:
      "https://cdn.pixabay.com/photo/2016/03/05/19/02/rebar-1235737_1280.jpg",
  },
  {
    name: "Concrete Blocks",
    image:
      "https://cdn.pixabay.com/photo/2015/05/26/14/58/cement-784438_1280.jpg",
  },
  {
    name: "Culvert 600mm",
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753897982/600_lngweo.jpg",
  },
];

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Header Video */}
      <div className="relative h-[300px] sm:h-[350px] md:h-[400px] overflow-hidden">
        <video
          className="w-full h-full object-cover absolute top-0 left-0"
          autoPlay
          muted
          loop
          playsInline
          poster="https://cdn.pixabay.com/photo/2017/12/03/17/22/paving-stone-2995324_640.jpg"
        >
          <source
            src="https://res.cloudinary.com/dnv6mjhxv/video/upload/v1753110507/6036438_Man_People_1280x720_m2kwaa.webm"
            type="video/webm"
          />
          <img
            src="https://cdn.pixabay.com/photo/2017/12/03/17/22/paving-stone-2995324_640.jpg"
            alt="Fallback"
            className="w-full h-full object-cover"
          />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center px-4">
            Quality that lasts.
          </h1>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4 sm:mb-6">
              Our Story
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
              Voitto Company Limited was founded in 2017 with a simple mission:
              to provide Kenya’s builders with quality construction materials at
              fair prices. What began with a single truck and strong commitment
              has grown into one of the country’s trusted suppliers.
            </p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              We serve thousands of customers — from homeowners to major
              contractors — and our foundation rests on three pillars: quality
              products, dependable service, and competitive pricing.
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <img
              src="https://cdn.pixabay.com/photo/2017/08/04/08/53/two-way-excavator-2579435_1280.jpg"
              alt="Excavator"
              className="rounded-lg shadow-xl w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="py-8 sm:py-12 md:py-16 bg-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Our Impact
          </h2>
          <p className="text-blue-200 mb-8 sm:mb-12">
            8 years of trusted service and solid foundations
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <Counter icon={<Award />} label="Years of Experience" end={8} />
            <Counter icon={<Shield />} label="Projects Completed" end={200} />
            <Counter icon={<Users />} label="Happy Clients" end={400} />
            <Counter icon={<Truck />} label="Product Categories" end={50} />
          </div>
        </div>
      </section>

      {/* Product Carousel */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-8 sm:mb-12">
            Explore Our Products
          </h2>
          <div className="w-full flex justify-center">
            <ProductCarousel variant="3d" products={featuredProducts} />
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-8 sm:py-12 md:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4">
            Quality Certifications
          </h2>
          <p className="text-gray-600 mb-8 sm:mb-12">
            Recognized by industry leaders
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: <Award />,
                title: "ISO 9001:2015",
                desc: "Quality Management System",
              },
              {
                icon: <Shield />,
                title: "KEBS Certified",
                desc: "Kenya Bureau of Standards",
              },
              {
                icon: <MapPin />,
                title: "NCA Registered",
                desc: "National Construction Authority",
              },
              {
                icon: <Users />,
                title: "Safety Certified",
                desc: "Occupational Health & Safety",
              },
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

const Counter = ({
  icon,
  label,
  end,
}: {
  icon: React.ReactNode;
  label: string;
  end: number;
}) => (
  <div className="text-center">
    <div className="bg-orange-600 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
      {React.cloneElement(icon as React.ReactElement, {
        className: "h-6 w-6 sm:h-8 sm:w-8 text-white",
      })}
    </div>
    <AnimatedCounter end={end} suffix="+" />
    <div className="text-blue-200 mt-2 text-sm sm:text-base">{label}</div>
  </div>
);

export default AboutPage;
