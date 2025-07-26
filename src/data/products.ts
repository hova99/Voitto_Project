import { Product } from '../contexts/CartContext';

export const products: Product[] = [
  // Drainage & Culverts
  {
    id: 'ibd-600',
    name: 'I.B.D',
    price: 600,
    image: 'https://res.cloudinary.com/dnv6mjhxv/image/upload/v1753210706/IBD_6_txw6xd.jpg',
    category: 'drainage',
    description: 'Ideal for road and pavement edge drainage systems.',
    unit: 'per piece',
    inStock: true
  },
  {
    id: 'ibd-9ft',
    name: 'IBD 9\'',
    price: 400,
    image: 'https://res.cloudinary.com/dnv6mjhxv/image/upload/v1753508994/IBD9_rjfgwg.png',
    category: 'drainage',
    description: 'Long-format interlocking drain for larger areas.',
    unit: 'per piece',
    inStock: true
  },
  {
    id: 'ibd-6ft',
    name: 'IBD 6\'',
    price: 350,
    image: 'https://res.cloudinary.com/dnv6mjhxv/image/upload/v1753510828/iBd66-removebg-preview_gb2ino.png',
    category: 'drainage',
    description: 'Medium-sized drain used in residential and light road work.',
    unit: 'per piece',
    inStock: true
  },
  {
    id: 'shallow-drain',
    name: 'Shallow Drain',
    price: 450,
    image: 'https://res.cloudinary.com/dnv6mjhxv/image/upload/v1753510671/SHALLOW_DRAIN_zccdan.jpg',
    category: 'drainage',
    description: 'Used to control surface water flow along roads and compounds.',
    unit: 'per piece',
    inStock: true
  },
  {
    id: 'shallow-drain-straight',
    name: 'Shallow Drain Straight',
    price: 500,
    image: 'https://res.cloudinary.com/dnv6mjhxv/image/upload/v1753511986/shall-removebg-preview_wu9gzw.png',
    category: 'drainage',
    description: 'Straight profile for smooth drainage layouts.',
    unit: 'per piece',
    inStock: true
  },
  {
    id: 'culvert-900mm',
    name: 'Culvert 900mm',
    price: 5500,
    image: 'https://res.cloudinary.com/dnv6mjhxv/image/upload/v1753512743/culv999_wenltg.png',
    category: 'drainage',
    description: 'Heavy-duty concrete pipe for major water channels and highways.',
    unit: 'per piece',
    inStock: true
  },
  {
    id: 'culvert-600mm',
    name: 'Culvert 600mm',
    price: 3000,
    image: 'https://res.cloudinary.com/dnv6mjhxv/image/upload/v1753511738/culvert906-removebg-preview_u3chgt.png',
    category: 'drainage',
    description: 'Mid-size culvert for drainage under driveways and rural roads.',
    unit: 'per piece',
    inStock: true
  },
  {
    id: 'culvert-450mm',
    name: 'Culvert 450mm',
    price: 2000,
    image: 'https://res.cloudinary.com/dnv6mjhxv/image/upload/v1753511301/culvert_9009-removebg-preview_xudsyq.png',
    category: 'drainage',
    description: 'Suitable for small drainage projects.',
    unit: 'per piece',
    inStock: true
  },
  {
    id: 'culvert-300mm',
    name: 'Culvert 300mm',
    price: 1800,
    image: 'https://cdn.pixabay.com/photo/2016/08/10/13/51/concrete-1583245_1280.jpg',
    category: 'drainage',
    description: 'Compact culvert ideal for farm roads and water diversion.',
    unit: 'per piece',
    inStock: true
  },

  // Paving & Surface Materials
  {
    id: 'road-kerbs',
    name: 'Road Kerbs',
    price: 350,
    image: 'https://res.cloudinary.com/dnv6mjhxv/image/upload/v1753513533/kerbnew_g5udss.webp',
    category: 'paving',
    description: 'Used to border roads, sidewalks, and parking lots.',
    unit: 'per piece',
    inStock: true
  },
  {
    id: 'road-channel',
    name: 'Road Channel',
    price: 250,
    image: 'https://res.cloudinary.com/dnv6mjhxv/image/upload/v1753514219/channel2_avosdn.png',
    category: 'paving',
    description: 'Assists with water flow and edging along roads.',
    unit: 'per piece',
    inStock: true
  },
  {
    id: 'paving-slabs-2x2',
    name: 'Paving Slabs 2"x2"',
    price: 250,
    image: 'https://res.cloudinary.com/dnv6mjhxv/image/upload/v1753515940/paving2x2_e7j87q.jpg',
    category: 'paving',
    description: 'Classic square concrete slabs for walkways and driveways.',
    unit: 'per piece',
    inStock: true
  },
  {
    id: 'paving-slabs-18x18',
    name: 'Paving Slabs 18"x18"',
    price: 200,
    image: 'https://www.cabroblocks.co.ke/wp-content/uploads/2021/10/paving-slabs-in-nairobi.jpg',
    category: 'paving',
    description: 'Larger surface area slabs ideal for open spaces.',
    unit: 'per piece',
    inStock: true
  },
  {
    id: 'paving-slabs-12x24',
    name: 'Paving Slabs 12"x24"',
    price: 180,
    image: 'https://res.cloudinary.com/dnv6mjhxv/image/upload/v1753514850/paving_hzykxw_e_background_removal_f_png_qv4wmm.png',
    category: 'paving',
    description: 'Rectangular paving for creative patterns.',
    unit: 'per piece',
    inStock: true
  },
  {
    id: 'paving-slabs-cabro',
    name: 'Paving Slabs Cabro',
    price: 280,
    image: 'https://www.cabroblocks.co.ke/wp-content/uploads/2021/10/paving-slabs-in-nairobi.jpg',
    category: 'paving',
    description: 'Interlocking cabro-style pavers for durable surfaces.',
    unit: 'per piece',
    inStock: true
  },
  {
    id: 'side-slabs',
    name: 'Side Slabs',
    price: 200,
    image: 'https://res.cloudinary.com/dnv6mjhxv/image/upload/e_background_removal/f_png,e_improve,e_sharpen/v1753515803/side_slab_bmm3le.jpg',
    category: 'paving',
    description: 'Edge paving used alongside footpaths and curbs.',
    unit: 'per piece',
    inStock: true
  },
  {
    id: 'hexagon',
    name: 'Hexagon',
    price: 280,
    image: 'https://res.cloudinary.com/dnv6mjhxv/image/upload/e_background_removal/f_png,e_improve,e_sharpen/v1753515447/WhatsApp_Image_2025-07-26_at_8.57.13_AM_h9htyw.jpg',
    category: 'paving',
    description: 'Decorative hexagonal paving block for stylish outdoor areas.',
    unit: 'per piece',
    inStock: true
  },

  // Wall & Pillar Coping
  {
    id: 'wall-coping-9x4',
    name: 'Wall Coping 9"x4"',
    price: 250,
    image: 'https://res.cloudinary.com/dnv6mjhxv/image/upload/e_background_removal/f_png/v1753516832/wallcoping_lfew3w.jpg',
    category: 'coping',
    description: 'Wide coping to protect and finish wall tops.',
    unit: 'per piece',
    inStock: true
  },
  {
    id: 'wall-coping-9',
    name: 'Wall Coping 9"',
    price: 180,
    image: 'https://res.cloudinary.com/dnv6mjhxv/image/upload/v1753208785/Wall-Coping_qde818.jpg',
    category: 'coping',
    description: 'Standard size for general wall finishing.',
    unit: 'per piece',
    inStock: true
  },
  {
    id: 'wall-coping-6',
    name: 'Wall Coping 6"',
    price: 150,
    image: 'https://res.cloudinary.com/dnv6mjhxv/image/upload/v1753208972/copping_ql9fid.jpg',
    category: 'coping',
    description: 'Narrow coping for low boundary walls.',
    unit: 'per piece',
    inStock: true
  },
  {
    id: 'pillar-coping-18x18',
    name: 'Pillar Coping 18"x18"',
    price: 350,
    image: 'https://res.cloudinary.com/dnv6mjhxv/image/upload/v1753209520/pillar_coping_18_h4zllp.jpg',
    category: 'coping',
    description: 'Large cap for wide gate or entrance pillars.',
    unit: 'per piece',
    inStock: true
  },
  {
    id: 'pillar-coping-16x16',
    name: 'Pillar Coping 16"x16"',
    price: 250,
    image: 'https://res.cloudinary.com/dnv6mjhxv/image/upload/e_background_removal/e_dropshadow:azimuth_220;elevation_60;spread_20/f_png,e_improve,e_sharpen/v1753516712/pillar_coping16_hiqj21.png',
    category: 'coping',
    description: 'Mid-size cap for medium-sized pillars.',
    unit: 'per piece',
    inStock: true
  },
  {
    id: 'pillar-coping-12x12',
    name: 'Pillar Coping 12"x12"',
    price: 200,
    image: 'https://res.cloudinary.com/dnv6mjhxv/image/upload/e_background_removal/e_dropshadow:azimuth_220;elevation_60;spread_20/f_png,e_improve,e_sharpen/v1753516561/pillar_copping_as3d0w.jpg',
    category: 'coping',
    description: 'Compact top cover for small pillars.',
    unit: 'per piece',
    inStock: true
  },
  {
    id: 'ball-head',
    name: 'Ball Head',
    price: 300,
    image: 'https://res.cloudinary.com/dnv6mjhxv/image/upload/e_background_removal/c_crop,w_3000,h_5333,ar_9:16,f_png,e_improve,e_sharpen/v1753516123/ball_head_srtgeg.jpg',
    category: 'coping',
    description: 'Decorative top element for pillars or gate posts.',
    unit: 'per piece',
    inStock: true
  },

  // Window & Ventilation
  {
    id: 'window-seal-9',
    name: 'Window Seal 9"',
    price: 280,
    image: 'https://res.cloudinary.com/dnv6mjhxv/image/upload/e_background_removal/e_dropshadow:azimuth_220;elevation_60;spread_20/f_png,e_improve,e_sharpen/v1753518036/winode_seal_dldetg.png',
    category: 'window',
    description: 'Concrete window sill for 9" wall openings.',
    unit: 'per piece',
    inStock: true
  },
  {
    id: 'window-seal-6',
    name: 'Window Seal 6"',
    price: 250,
    image: 'https://res.cloudinary.com/dnv6mjhxv/image/upload/e_background_removal/f_png,e_improve,e_sharpen/v1753517823/winddow_seal_obpl8e.jpg',
    category: 'window',
    description: 'Smaller sill for lighter structures or partition walls.',
    unit: 'per piece',
    inStock: true
  },
  {
    id: 'window-seal-generic',
    name: 'Window Seal (Generic)',
    price: 0,
    image: 'https://res.cloudinary.com/dnv6mjhxv/image/upload/e_improve,e_sharpen/v1753518186/generic_eprf3z.jpg',
    category: 'window',
    description: 'Placeholder for custom-sized concrete window seals.',
    unit: 'per piece',
    inStock: true
  },
  {
    id: 'louvers-9',
    name: 'Louvers 9"',
    price: 180,
    image: 'https://res.cloudinary.com/dnv6mjhxv/image/upload/e_background_removal/f_png,e_improve,e_sharpen/v1753517430/louver9_mhxnhp.jpg',
    category: 'window',
    description: 'Air vents for 9" walls, allows ventilation and light.',
    unit: 'per piece',
    inStock: true
  },
  {
    id: 'louvers-6',
    name: 'Louvers 6"',
    price: 130,
    image: 'https://res.cloudinary.com/dnv6mjhxv/image/upload/e_background_removal/f_png,e_improve,e_sharpen/v1753517240/louvre_pknqwc.jpg',
    category: 'window',
    description: 'Smaller concrete louvers for indoor or light wall use.',
    unit: 'per piece',
    inStock: true
  },
  {
    id: 'ventilation',
    name: 'Ventilation',
    price: 0,
    image: 'https://res.cloudinary.com/dnv6mjhxv/image/upload/e_background_removal/a_hflip/f_png,e_improve,e_sharpen/v1753518301/ventilation_ny75ke.jpg',
    category: 'window',
    description: 'Concrete ventilation blocks for airflow and design.',
    unit: 'per piece',
    inStock: true
  },

  // Balustrades
  {
    id: 'balustrade-coping',
    name: 'Balustrade Coping',
    price: 400,
    image: 'https://res.cloudinary.com/dnv6mjhxv/image/upload/e_background_removal/f_png/v1753519069/balucop_w0vbdq.png',
    category: 'balustrade',
    description: 'Top finishing piece for concrete railings.',
    unit: 'per piece',
    inStock: true
  },
  {
    id: 'balustrade-2-5ft',
    name: 'Balustrade 2.5 ft',
    price: 350,
    image: 'https://res.cloudinary.com/dnv6mjhxv/image/upload/e_background_removal/f_png/v1753518955/balu_pwy2kc.jpg',
    category: 'balustrade',
    description: 'Decorative concrete railing piece for balconies and stairs.',
    unit: 'per piece',
    inStock: true
  },
  {
    id: 'balustrade-2ft',
    name: 'Balustrade 2 ft',
    price: 300,
    image: 'https://res.cloudinary.com/dnv6mjhxv/image/upload/e_background_removal/c_crop,ar_9:16,f_png/v1753519163/balu2.5_dxggwx.jpg',
    category: 'balustrade',
    description: 'Standard-size balustrade for medium spaces.',
    unit: 'per piece',
    inStock: true
  },
  {
    id: 'balustrade-1-5ft',
    name: 'Balustrade 1.5 ft',
    price: 250,
    image: 'https://res.cloudinary.com/dnv6mjhxv/image/upload/e_background_removal/f_png,e_improve,e_sharpen/v1753518499/balustarde1_z4kvkt.webp',
    category: 'balustrade',
    description: 'Compact balustrade for short walls or stair rails.',
    unit: 'per piece',
    inStock: true
  },

  // Garden Decor
  {
    id: 'flower-pot-rectangle',
    name: 'Flower Pot (Rectangle)',
    price: 3500,
    image: 'https://wcl.co.ke/chijoage/2024/07/ffb9ae502fc08a715fc62b7561c550c0-1-1.jpg',
    category: 'garden',
    description: 'Large rectangular concrete planter for flowers or shrubs.',
    unit: 'per piece',
    inStock: true
  },
  {
    id: 'flower-pot-hexagon',
    name: 'Flower Pot (Hexagon)',
    price: 2500,
    image: 'https://images.pexels.com/photos/279810/pexels-photo-279810.jpeg',
    category: 'garden',
    description: 'Stylish hexagonal pot for decorative planting.',
    unit: 'per piece',
    inStock: true
  },

  // Fencing Materials
  {
    id: 'fencing-post-curved',
    name: 'Fencing Post Curved',
    price: 1600,
    image: 'https://www.kcpquarry.com/images/service/small-img/sm-All-Sizes-Solid-Concrete-Blocks.jpg',
    category: 'fencing',
    description: 'Arched post for strong boundary fencing.',
    unit: 'per piece',
    inStock: true
  },
  {
    id: 'fencing-post-straight',
    name: 'Fencing Post Straight',
    price: 1500,
    image: 'https://res.cloudinary.com/dnv6mjhxv/image/upload/v1753208353/fencing_post_8_osrh1r.jpg',
    category: 'fencing',
    description: 'Standard vertical fencing post for support.',
    unit: 'per piece',
    inStock: true
  },
  {
    id: 'fencing-post-support',
    name: 'Fencing Post Support',
    price: 1400,
    image: 'https://www.kcpquarry.com/images/service/small-img/sm-All-Sizes-Solid-Concrete-Blocks.jpg',
    category: 'fencing',
    description: 'Reinforcement post to support fencing stability.',
    unit: 'per piece',
    inStock: true
  },

  // Stone, Sand & Aggregates
  {
    id: 'ballast',
    name: 'Ballast',
    price: 0,
    image: 'https://images.pexels.com/photos/279810/pexels-photo-279810.jpeg',
    category: 'aggregates',
    description: 'Crushed stone used in concrete mixing and foundations (Price varies by quantity).',
    unit: 'per tipper',
    inStock: true
  },
  {
    id: 'chippings',
    name: 'Chippings',
    price: 0,
    image: 'https://images.pexels.com/photos/279810/pexels-photo-279810.jpeg',
    category: 'aggregates',
    description: 'Small stone chips for construction or decorative landscaping.',
    unit: 'per tipper',
    inStock: true
  },
  {
    id: 'river-sand',
    name: 'River Sand',
    price: 0,
    image: 'https://www.ultratechcement.com/content/ultratechcement/in/en/home/for-homebuilders/home-building-explained-single/descriptive-articles/types-of-sand-used-in-construction/_jcr_content/root/container/container_2072089177/teaser.coreimg.jpeg/1711520856351/types-of-sand-2.jpeg',
    category: 'aggregates',
    description: 'Clean natural sand ideal for mortar and plastering.',
    unit: 'per tipper',
    inStock: true
  },
  {
    id: 'rock-dust',
    name: 'Rock Dust',
    price: 0,
    image: 'https://images.pexels.com/photos/279810/pexels-photo-279810.jpeg',
    category: 'aggregates',
    description: 'Fine aggregate used for compacting and surface preparation.',
    unit: 'per tipper',
    inStock: true
  },
  {
    id: 'foundation-stones-6',
    name: 'Foundation Stones 6"',
    price: 0,
    image: 'https://pictures-uganda.jijistatic.com/18803722_NjIwLTQ2NS1mZmRjNGJhMWIx.webp',
    category: 'aggregates',
    description: 'Small cut stones for basic house or structure foundations.',
    unit: 'per tipper',
    inStock: true
  },
  {
    id: 'foundation-stones-9',
    name: 'Foundation Stones 9"',
    price: 0,
    image: 'https://pictures-uganda.jijistatic.com/18803722_NjIwLTQ2NS1mZmRjNGJhMWIx.webp',
    category: 'aggregates',
    description: 'Larger foundation stones for heavy structural work.',
    unit: 'per tipper',
    inStock: true
  },
  {
    id: 'yellow-stones-6',
    name: 'Yellow Stones 6"',
    price: 0,
    image: 'https://pictures-uganda.jijistatic.com/18803722_NjIwLTQ2NS1mZmRjNGJhMWIx.webp',
    category: 'aggregates',
    description: 'Decorative or structural yellow stone blocks.',
    unit: 'per tipper',
    inStock: true
  },
  {
    id: 'darugo-stones-9',
    name: 'Darugo Stones 9"',
    price: 0,
    image: 'https://pictures-uganda.jijistatic.com/18803722_NjIwLTQ2NS1mZmRjNGJhMWIx.webp',
    category: 'aggregates',
    description: 'Traditional 9" hard-cut building stones.',
    unit: 'per tipper',
    inStock: true
  },
  {
    id: 'darugo-stones-6',
    name: 'Darugo Stones 6"',
    price: 0,
    image: 'https://pictures-uganda.jijistatic.com/18803722_NjIwLTQ2NS1mZmRjNGJhMWIx.webp',
    category: 'aggregates',
    description: 'Smaller variant of Darugo for partition walls.',
    unit: 'per tipper',
    inStock: true
  },

  // Miscellaneous
  {
    id: 'cement-used',
    name: 'Cement (Used)',
    price: 800,
    image: 'https://duracast.co.ke/images/cmb.jpg',
    category: 'miscellaneous',
    description: 'Quality used cement bags at affordable prices.',
    unit: 'per bag',
    inStock: true
  }
];

export const categories = [
  { id: 'drainage', name: 'Drainage & Culverts', icon: '🏗️' },
  { id: 'paving', name: 'Paving & Surface Materials', icon: '🚧' },
  { id: 'coping', name: 'Wall & Pillar Coping', icon: '🧱' },
  { id: 'window', name: 'Window & Ventilation', icon: '🪟' },
  { id: 'balustrade', name: 'Balustrades', icon: '🪜' },
  { id: 'garden', name: 'Garden Decor', icon: '🌿' },
  { id: 'fencing', name: 'Fencing Materials', icon: '🪵' },
  { id: 'aggregates', name: 'Stone, Sand & Aggregates', icon: '🧱' },
  { id: 'miscellaneous', name: 'Miscellaneous', icon: '🧪' }
];