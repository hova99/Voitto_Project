import React from "react";
import AnimatedCounter from "../components/AnimatedCounter";
import { portfolioProjects, PortfolioProject } from "../data/portfolio";
import { ImageOptimizer } from "../utils/imageOptimizer";
import {
  Award,
  Users,
  Truck,
  Shield,
  MapPin,
  Play,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const AboutPage: React.FC = () => {
  const [selectedProject, setSelectedProject] =
    React.useState<PortfolioProject | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);
  const [isImageError, setIsImageError] = React.useState(false);
  const [showVideo, setShowVideo] = React.useState(true);

  const openProjectModal = (project: PortfolioProject) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    setIsImageLoaded(false);
    setIsImageError(false);
    setShowVideo(project.type === "video");
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
    setIsImageLoaded(false);
    setIsImageError(false);
    setShowVideo(true);
  };

  const nextImage = () => {
    if (selectedProject?.images) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images!.length - 1 ? 0 : prev + 1
      );
      setIsImageLoaded(false);
      setIsImageError(false);
    }
  };

  const previousImage = () => {
    if (selectedProject?.images) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images!.length - 1 : prev - 1
      );
      setIsImageLoaded(false);
      setIsImageError(false);
    }
  };

  // Get optimized image URL for current image with fit instead of fill
  const getCurrentImageUrl = () => {
    if (!selectedProject) return "";

    const imageUrl =
      selectedProject.images && selectedProject.images.length > 0
        ? selectedProject.images[currentImageIndex]
        : selectedProject.image;

    // Convert Cloudinary c_fill to c_fit to prevent cropping
    const optimizedUrl = ImageOptimizer.validateAndOptimizeUrl(imageUrl);
    return optimizedUrl.replace(/c_fill/g, "c_fit");
  };

  // Get optimized srcSet for current image with fit instead of fill
  const getCurrentImageSrcSet = () => {
    if (!selectedProject) return "";

    const imageUrl =
      selectedProject.images && selectedProject.images.length > 0
        ? selectedProject.images[currentImageIndex]
        : selectedProject.image;

    const srcSet = ImageOptimizer.generateSrcSet(
      imageUrl,
      [400, 600, 800, 1000, 1200]
    );
    return srcSet.replace(/c_fill/g, "c_fit");
  };

  // Get optimized sizes for current image
  const getCurrentImageSizes = () => {
    return ImageOptimizer.generateSizes([
      { maxWidth: 640, width: "100vw" },
      { maxWidth: 768, width: "90vw" },
      { maxWidth: 1024, width: "80vw" },
      { maxWidth: 1440, width: "70vw" },
    ]);
  };

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
            src="https://res.cloudinary.com/dnv6mjhxv/video/upload/f_auto,q_auto/v1753110507/6036438_Man_People_1280x720_m2kwaa.webm"
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
            Our Projects & Portfolio
          </h1>
        </div>
      </div>

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

      {/* Portfolio Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4">
              Our Portfolio
            </h2>
            <p className="text-gray-600 text-lg">
              Showcasing our expertise in construction, machinery services, and
              project delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {portfolioProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
                onClick={() => openProjectModal(project)}
              >
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  {project.type === "video" ? (
                    <div className="relative w-full h-full">
                      <video
                        className="w-full h-full object-contain bg-gray-50"
                        poster={ImageOptimizer.validateAndOptimizeUrl(
                          project.image
                        ).replace(/c_fill/g, "c_fit")}
                        muted
                        loop
                        playsInline
                      >
                        <source src={project.videoUrl} type="video/mp4" />
                      </video>
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <div className="bg-white bg-opacity-90 rounded-full p-3">
                          <Play
                            className="h-6 w-6 text-blue-900"
                            fill="currentColor"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={ImageOptimizer.validateAndOptimizeUrl(
                        project.image
                      ).replace(/c_fill/g, "c_fit")}
                      srcSet={ImageOptimizer.generateSrcSet(
                        project.image,
                        [400, 600, 800]
                      ).replace(/c_fill/g, "c_fit")}
                      sizes={ImageOptimizer.generateSizes([
                        { maxWidth: 640, width: "100vw" },
                        { maxWidth: 768, width: "50vw" },
                        { maxWidth: 1024, width: "33vw" },
                      ])}
                      alt={project.title}
                      className="w-full h-full object-contain bg-gray-50 group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-blue-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-4">
                    {project.description}
                  </p>
                  <button className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors duration-300">
                    View Details
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={closeProjectModal}
                className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full p-2 hover:bg-opacity-100 transition-all duration-300 z-10"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="p-6">
                <div className="mb-6">
                  <span className="bg-orange-600 text-white text-sm px-3 py-1 rounded-full">
                    {selectedProject.category}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4">
                  {selectedProject.title}
                </h2>

                <div className="mb-6">
                  {selectedProject.type === "video" && showVideo ? (
                    <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden bg-gray-50">
                      <video
                        className="w-full h-full object-contain"
                        controls
                        autoPlay
                        muted
                        loop
                        playsInline
                      >
                        <source
                          src={selectedProject.videoUrl}
                          type="video/mp4"
                        />
                      </video>

                      {/* Switch to Images Button */}
                      {selectedProject.images &&
                        selectedProject.images.length > 0 && (
                          <button
                            onClick={() => setShowVideo(false)}
                            className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-70 text-white px-3 py-1 rounded-full text-sm transition-all duration-300 z-10"
                          >
                            View Images ({selectedProject.images.length})
                          </button>
                        )}
                    </div>
                  ) : (
                    <div className="relative">
                      {/* Image Carousel */}
                      <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden bg-gray-100">
                        {/* Loading State */}
                        {!isImageLoaded && !isImageError && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                          </div>
                        )}

                        {/* Error State */}
                        {isImageError && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                            <div className="text-center text-gray-500">
                              <div className="text-4xl mb-2">📷</div>
                              <div className="text-sm">Image not available</div>
                            </div>
                          </div>
                        )}

                        {/* Optimized Image */}
                        <img
                          src={getCurrentImageUrl()}
                          srcSet={getCurrentImageSrcSet()}
                          sizes={getCurrentImageSizes()}
                          alt={`${selectedProject.title} - Image ${
                            currentImageIndex + 1
                          }`}
                          className={`w-full h-full object-contain bg-gray-50 transition-opacity duration-300 ${
                            isImageLoaded ? "opacity-100" : "opacity-0"
                          }`}
                          loading="eager"
                          decoding="async"
                          onLoad={() => setIsImageLoaded(true)}
                          onError={() => {
                            setIsImageError(true);
                            setIsImageLoaded(false);
                          }}
                        />

                        {/* Switch to Video Button - Only show for video projects */}
                        {selectedProject.type === "video" && (
                          <button
                            onClick={() => setShowVideo(true)}
                            className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-70 text-white px-3 py-1 rounded-full text-sm transition-all duration-300 z-10"
                          >
                            View Video
                          </button>
                        )}

                        {/* Navigation Arrows - Only show if there are multiple images */}
                        {selectedProject.images &&
                          selectedProject.images.length > 1 && (
                            <>
                              {/* Previous Button */}
                              <button
                                onClick={previousImage}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-300 z-10"
                              >
                                <ChevronLeft className="h-6 w-6" />
                              </button>

                              {/* Next Button */}
                              <button
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-300 z-10"
                              >
                                <ChevronRight className="h-6 w-6" />
                              </button>
                            </>
                          )}
                      </div>

                      {/* Image Counter */}
                      {selectedProject.images &&
                        selectedProject.images.length > 1 && (
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                            {currentImageIndex + 1} /{" "}
                            {selectedProject.images.length}
                          </div>
                        )}

                      {/* Thumbnail Navigation */}
                      {selectedProject.images &&
                        selectedProject.images.length > 1 && (
                          <div className="flex justify-center mt-4 space-x-2">
                            {selectedProject.images.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                  index === currentImageIndex
                                    ? "bg-orange-600"
                                    : "bg-gray-300 hover:bg-gray-400"
                                }`}
                              />
                            ))}
                          </div>
                        )}
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <p className="text-gray-600 text-lg">
                    {selectedProject.description}
                  </p>
                  <p className="text-gray-700">{selectedProject.details}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
