export interface PortfolioProject {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  images?: string[]; // Array of additional images for the project
  type: "image" | "video";
  videoUrl?: string;
  details: string;
  location?: string;
  duration?: string;
  client?: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 1,
    title: "Machinery Services/Hire",
    category: "Machinery Rental",
    description:
      "Professional excavation and transportation services with modern equipment",
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fit/v1754675891/exc3_e7ru4g.jpg",
    images: [
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fit/v1754675891/exc3_e7ru4g.jpg",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fit/v1754678214/Untitled_design_1_1_1_sdovke.png",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fit/v1754678404/Untitled_design_2_1_yc5v2f.png",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fit/v1754677221/dumptruck_hpqadl.png",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fit/v1754676049/mach_y6d8rs.jpg",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fit/v1754677900/exc_z7baev.jpg",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fit/v1754678488/excavator_b2tb6e.jpg",
    ],
    type: "image",
    details:
      "Hiring excavators, tippers, and other heavy machinery for construction projects. Our fleet includes modern, well-maintained equipment operated by experienced professionals.",
    location: "Nairobi & Surrounding Areas",
    duration: "Flexible rental periods",
  },
  {
    id: 2,
    title: "Culvert Installation Project",
    category: "Infrastructure",
    description:
      "Complete culvert installation and drainage system implementation",
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fit/v1754678820/cul1_qyvz1j.jpg",
    images: [
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fit/v1754678905/cul2_uynhzp.jpg",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fit/v1754679120/cul4_rztkxu.jpg",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fit/v1754679256/cul5_h8svln.jpg",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fit/v1754678959/cul3_syapxg.jpg",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fit/v1754678820/cul1_qyvz1j.jpg",
    ],
    type: "image",
    details:
      "Professional culvert installation ensuring proper drainage and road safety. From site assessment to final installation, we handle the complete process with precision.",
    location: "Various Locations",
    duration: "2-3 weeks per project",
  },
  {
    id: 3,
    title: "Road Cabros Installation",
    category: "Road Construction",
    description: "Complete road construction from excavation to final paving",
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fit/v1754679643/cab1_iop4cq.jpg",
    images: [
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fit/v1754679913/cab4_gfu4ev.jpg",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fit/v1754679791/cab8_qrxvqg.jpg",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fit/v1754679838/cab6_hwc45j.jpg",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fit/v1754679744/cab9_m4runq.jpg",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fit/v1754680093/cab2_nxsdgf.jpg",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fit/v1754679643/cab1_iop4cq.jpg",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fit/v1754680393/cab10_umgzho.jpg",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fit/v1754678404/Untitled_design_2_1_yc5v2f.png",
    ],
    type: "image",
    details:
      "Full road construction process including excavation, preparation, and cabros installation. We document the entire process from initial digging to final compacting and paving.",
    location: "Residential & Commercial Areas",
    duration: "4-6 weeks per project",
  },
  {
    id: 4,
    title: "Concrete Cabros Installation",
    category: "Paving",
    description:
      "concrete cabros installation in residential areas/Public spaces",
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fit/v1754681467/hom1_olcobs.jpg",
    images: [
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fit/v1754681805/home9_acw4zp.jpg",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fit/v1754681797/home6_waxhuc.jpg",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fit/v1754681797/home7_bpdmli.jpg",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fit/v1754681788/home3_yyp5q8.jpg",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fit/v1754681786/hom10_atrp2f.jpg",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fit/v1754681778/hom8_kpdyyd.jpg",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fit/v1754681778/hom4_zmug4o.jpg",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fit/v1754681790/home4_eupqas.jpg",
    ],
    type: "video",
    videoUrl:
      "https://res.cloudinary.com/dnv6mjhxv/video/upload/f_auto,q_auto,w_1280,h_720,c_fit/v1754681367/WhatsApp_Video_2025-08-08_at_11.27.13_AM_1_1_1_gigioo.mp4",
    details:
      "Quality concrete cabros installation for residential driveways and walkways. Custom designs and durable finishes that enhance property value.",
    location: "Residential Properties",
    duration: "1-2 weeks per project",
  },
  {
    id: 5,
    title: "Concrete Products Delivery ",
    category: "Material Supply/Delivery",
    description: "Efficient delivery of Products to construction sites",
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fit/v1754677221/dumptruck_hpqadl.png",
    images: [
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fit/v1754682982/del_a1ihal.jpg",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fit/v1754682732/dar2_dclobm.jpg",
    ],
    type: "image",
    details:
      "Reliable delivery service of concrete products to construction sites. Timely delivery with proper handling and placement services.",
    location: "Various Locations",
    duration: "Same day delivery",
  },
  {
    id: 6,
    title: "Tractor Quarry Operations",
    category: "Quarry Services",
    description: "Stone and soil excavation using modern tractor equipment",
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fit/v1754683183/site2_wuggit.jpg",
    type: "video",
    videoUrl:
      "https://res.cloudinary.com/dnv6mjhxv/video/upload/f_auto,q_auto,w_1280,h_720,c_fit/v1754683271/site_1_ygc9kz.mp4",
    details:
      "Professional quarry operations including stone and soil excavation with video documentation. Modern tractor equipment ensures efficient and safe operations.",
    location: "Quarry Sites",
    duration: "Ongoing operations",
  },
];

export const getProjectById = (id: number): PortfolioProject | undefined => {
  return portfolioProjects.find((project) => project.id === id);
};

export const getProjectsByCategory = (category: string): PortfolioProject[] => {
  return portfolioProjects.filter((project) => project.category === category);
};

export const getCategories = (): string[] => {
  return [...new Set(portfolioProjects.map((project) => project.category))];
};
