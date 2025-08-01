import { Product } from "../contexts/CartContext";

export const products: Product[] = [
  // Drainage & Culverts
  {
    id: "ibd-600",
    name: "I.B.D",
    price: 600,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/v1754051940/IBD-removebg-preview_ubozsp.png",
    image2:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753510828/iBd66-removebg-preview_gb2ino.png",
    category: "drainage",
    description: "Ideal for road and pavement edge drainage systems.",
    unit: "per piece",
    inStock: true,
  },
  {
    id: "ibd-9ft",
    name: "IBD 9'",
    price: 400,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/e_background_removal/f_auto,q_auto,w_400,c_scale/v1753878404/IBD9_jyc6kg.jpg",
    image2:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/e_background_removal/a_90/f_auto,q_auto,w_400,c_scale/v1753878404/IBD9_jyc6kg.jpg",
    category: "drainage",
    description: "Long-format interlocking drain for larger areas.",
    unit: "per piece",
    inStock: true,
  },
  {
    id: "ibd-6ft",
    name: "IBD 6'",
    price: 350,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/e_background_removal/f_auto,q_auto,w_400,c_scale/v1753877649/IBD6_a162yf.jpg",
    image2:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/e_background_removal/a_-90/f_auto,q_auto,w_400,c_scale/v1753877649/IBD6_a162yf.jpg",
    category: "drainage",
    description: "Medium-sized drain used in residential and light road work.",
    unit: "per piece",
    inStock: true,
  },
  {
    id: "shallow-drain",
    name: "Shallow Drain",
    price: 450,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/v1754056277/shall-removebg-preview_wu9gzw_prx95u.webp",
    image2:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/v1754056277/shall-removebg-preview_wu9gzw_prx95u.webp",
    category: "drainage",
    description:
      "Used to control surface water flow along roads and compounds.",
    unit: "per piece",
    inStock: true,
  },
  {
    id: "shallow-drain-straight",
    name: "Shallow Drain Straight",
    price: 500,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753209963/shallow_fqyngs.jpg",
    category: "drainage",
    description: "Straight profile for smooth drainage layouts.",
    unit: "per piece",
    inStock: true,
  },
  {
    id: "culvert-900mm",
    name: "Culvert 900mm",
    price: 5500,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753512743/culv999_wenltg.png",
    image2:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753898476/900_l2soav.png",
    category: "drainage",
    description:
      "Heavy-duty concrete pipe for major water channels and highways.",
    unit: "per piece",
    inStock: true,
  },
  {
    id: "culvert-600mm",
    name: "Culvert 600mm",
    price: 3000,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753897982/600_lngweo.jpg",
    image2:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753896800/ce80aecc-7b22-4a31-b154-4dc85f576ee7_nswmvu.jpg",
    category: "drainage",
    description:
      "Mid-size culvert for drainage under driveways and rural roads.",
    unit: "per piece",
    inStock: true,
  },
  {
    id: "culvert-450mm",
    name: "Culvert 450mm",
    price: 2000,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/v1754054709/450_jmjcwc.png",
    category: "drainage",
    description: "Suitable for small drainage projects.",
    unit: "per piece",
    inStock: true,
  },
  {
    id: "culvert-300mm",
    name: "Culvert 300mm",
    price: 1800,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753898743/300_icsoe3.jpg",
    image2:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/e_background_removal/f_auto,q_auto,w_400,c_scale/v1753879465/CUL300N2_s7airc.jpg",
    category: "drainage",
    description: "Compact culvert ideal for farm roads and water diversion.",
    unit: "per piece",
    inStock: true,
  },

  // Paving & Surface Materials
  {
    id: "road-kerbs",
    name: "Road Kerbs",
    price: 350,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753513533/kerbnew_g5udss.webp",
    image2:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753900695/ROAD_KERB_vdh3na.jpg",
    category: "paving",
    description: "Used to border roads, sidewalks, and parking lots.",
    unit: "per piece",
    inStock: true,
  },
  {
    id: "road-channel",
    name: "Road Channel",
    price: 250,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1754049724/road_channel-removebg-preview_zj9zdn.png",
    image2:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1754049771/ROAD_CHANNEL_kgtxjl.jpg",
    category: "paving",
    description: "Assists with water flow and edging along roads.",
    unit: "per piece",
    inStock: true,
  },
  {
    id: "paving-slabs-2x2",
    name: 'Paving Slabs 2"x2"',
    price: 250,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/e_background_removal/f_auto,q_auto,w_400,c_scale/v1753890748/DeWatermark.ai_1753890520862_i3qkrm.jpg",
    image2:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753890032/How_To_Lay_Paving_Slabs_On_Sand_Guide_b2zosu.jpg",
    category: "paving",
    description: "Classic square concrete slabs for walkways and driveways.",
    unit: "per piece",
    inStock: true,
  },
  {
    id: "paving-slabs-18x18",
    name: 'Paving Slabs 18"x18"',
    price: 200,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753890290/5t-October-paving-slabs_m3ehb3.jpg",
    image2:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753889189/600X1200_fe3asc.jpg",
    category: "paving",
    description: "Larger surface area slabs ideal for open spaces.",
    unit: "per piece",
    inStock: true,
  },
  {
    id: "paving-slabs-12x24",
    name: 'Paving Slabs 12"x24"',
    price: 180,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753889911/600x600-Paving-Flags-Moore-Concrete_jccukc.png",
    image2:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753889116/11_lawn_edging_ideas_to_add_a_professional_finish_jiwixc.jpg",
    category: "paving",
    description: "Rectangular paving for creative patterns.",
    unit: "per piece",
    inStock: true,
  },
  {
    id: "paving-slabs-cabro",
    name: "Paving Slabs Cabro",
    price: 280,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753889760/The_mold_is_made_of_abs_plastic_suitable_for_m9eieo.jpg",
    image2:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753888928/Eco-Priora_Pavers_z1pxm9.jpg",
    category: "paving",
    description: "Interlocking cabro-style pavers for durable surfaces.",
    unit: "per piece",
    inStock: true,
  },
  {
    id: "side-slabs",
    name: "Side Slabs",
    price: 200,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/e_background_removal/f_auto,q_auto,w_400,c_scale,e_improve,e_sharpen/v1753515803/side_slab_bmm3le.jpg",
    image2:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753901305/3f9a7616bcb1_qqilsg.jpg",
    category: "paving",
    description: "Edge paving used alongside footpaths and curbs.",
    unit: "per piece",
    inStock: true,
  },
  {
    id: "hexagon",
    name: "Hexagon",
    price: 280,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753888728/2-pack_Hexagon_Mold__DIY_Concrete_Mold_Cement_Tile_gsblky.jpg",
    image2:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753888671/Hexagonal_Concrete_Pavers_zvigwz.jpg",
    category: "paving",
    description: "Decorative hexagonal paving block for stylish outdoor areas.",
    unit: "per piece",
    inStock: true,
  },
  {
    id: "cabros",
    name: "Cabros (KSh 950/m²)",
    price: 950,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1754049835/CAbrojpeg_sbhcff.jpg",
    category: "paving",
    description:
      "Interlocking cabro paving blocks for durable surfaces. Price: KSh 950 per square metre.",
    unit: "per square metre",
    inStock: true,
  },
  {
    id: "wet-concrete-cabros",
    name: "Wet Concrete Cabros (KSh 1500/m²)",
    price: 1500,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1754050057/wet_cabro_httldn.webp",
    category: "paving",
    description:
      "Premium wet concrete cabro blocks for high-quality paving. Price: KSh 1500 per square metre.",
    unit: "per square metre",
    inStock: true,
  },

  // Wall & Pillar Coping
  {
    id: "wall-coping-9x4",
    name: 'Wall Coping 9"x4"',
    price: 250,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/e_background_removal/f_auto,q_auto,w_400,c_scale/v1753901512/9x4_vhttrh.jpg",
    image2:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753901725/Stucco_wall_with_cap_txmyoy.jpg",
    category: "coping",
    description: "Wide coping to protect and finish wall tops.",
    unit: "per piece",
    inStock: true,
  },
  {
    id: "wall-coping-9",
    name: 'Wall Coping 9"',
    price: 180,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/e_background_removal/f_auto,q_auto,w_400,c_scale/v1753901958/9-removebg-preview_qosq0d.png",
    image2:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1754050355/WALLCOPPING_gktafc.jpg",
    category: "coping",
    description: "Standard size for general wall finishing.",
    unit: "per piece",
    inStock: true,
  },
  {
    id: "wall-coping-6",
    name: 'Wall Coping 6"',
    price: 150,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753902219/6_ssunqh.png",
    image2:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1754050355/WALLCOPPING_gktafc.jpg",
    category: "coping",
    description: "Narrow coping for low boundary walls.",
    unit: "per piece",
    inStock: true,
  },
  {
    id: "pillar-coping-18x18",
    name: 'Pillar Coping 18"x18"',
    price: 350,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753902842/images_aptieo.jpg",
    image2:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753903011/18_gm5nbs.jpg",
    category: "coping",
    description: "Large cap for wide gate or entrance pillars.",
    unit: "per piece",
    inStock: true,
  },
  {
    id: "pillar-coping-16x16",
    name: 'Pillar Coping 16"x16"',
    price: 250,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753209520/pillar_coping_18_h4zllp.jpg",
    image2:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753902654/Cast_Stone_Copings___Coping_Stone_Manufacturers_c4pmef.jpg",
    category: "coping",
    description: "Mid-size cap for medium-sized pillars.",
    unit: "per piece",
    inStock: true,
  },
  {
    id: "pillar-coping-12x12",
    name: 'Pillar Coping 12"x12"',
    price: 200,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/e_background_removal/e_dropshadow:azimuth_220;elevation_60;spread_20/f_auto,q_auto,w_400,c_scale,e_improve,e_sharpen/v1753516561/pillar_copping_as3d0w.jpg",
    image2:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753902474/This_smooth_polished_coping_stone_looks_elegant_on_bczo6w.jpg",
    category: "coping",
    description: "Compact top cover for small pillars.",
    unit: "per piece",
    inStock: true,
  },
  {
    id: "ball-head",
    name: "Ball Head",
    price: 300,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/e_background_removal/c_crop,w_3000,h_5333,ar_9:16,f_png,e_improve,e_sharpen/v1753516123/ball_head_srtgeg.jpg",
    image2:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753902330/1950626f-fc13-495a-94a2-2a8f813925a2_enqifz.jpg",
    category: "coping",
    description: "Decorative top element for pillars or gate posts.",
    unit: "per piece",
    inStock: true,
  },

  // Window & Ventilation
  {
    id: "window-seal-9",
    name: 'Window Seal 9"',
    price: 280,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/e_background_removal/e_dropshadow:azimuth_220;elevation_60;spread_20/f_auto,q_auto,w_400,c_scale,e_improve,e_sharpen/v1753518036/winode_seal_dldetg.png",
    image2:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753887402/72152246-c9b8-4b68-93fc-b2e61172ee26_nqflxo.jpg",
    category: "window",
    description: 'Concrete window sill for 9" wall openings.',
    unit: "per piece",
    inStock: true,
  },
  {
    id: "window-seal-6",
    name: 'Window Seal 6"',
    price: 250,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/e_background_removal/f_auto,q_auto,w_400,c_scale,e_improve,e_sharpen/v1753517823/winddow_seal_obpl8e.jpg",
    image2:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753887500/d3a400fb-f06f-4f68-b5fb-3ea4a5976844_go1uci.jpg",
    category: "window",
    description: "Smaller sill for lighter structures or partition walls.",
    unit: "per piece",
    inStock: true,
  },
  {
    id: "window-seal-generic",
    name: "Window Seal (Generic)",
    price: 0,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/e_improve,e_sharpen,f_auto,q_auto,w_400,c_scale/v1753518186/generic_eprf3z.jpg",
    image2:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753887886/Eaton-Fields-Stool-Sills-1_k88a6d.jpg",
    category: "window",
    description: "Placeholder for custom-sized concrete window seals.",
    unit: "per piece",
    inStock: true,
  },
  {
    id: "louvers-9",
    name: 'Louvers 9"',
    price: 180,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753886250/6-louver-blocks_mj0cqj.jpg",
    image2:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753887123/Galeria_Bespoke___HUGUET_ohw8hl.jpg",
    category: "window",
    description: 'Air vents for 9" walls, allows ventilation and light.',
    unit: "per piece",
    inStock: true,
  },
  {
    id: "louvers-6",
    name: 'Louvers 6"',
    price: 130,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753886975/25f1bf6d-01a8-454b-8a7e-f2cb250f1634_powy0w.jpg",
    image2:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753886821/1f97a4b4-38a1-4306-acb6-a43630b37715_m8qdbz.jpg",
    category: "window",
    description: "Smaller concrete louvers for indoor or light wall use.",
    unit: "per piece",
    inStock: true,
  },
  {
    id: "ventilation",
    name: "Ventilation",
    price: 0,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753887228/ASALAMUALAIKUM___KAMI_MEMPRODUKSI_DAN_lkz0w0.jpg",
    image2:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753886656/Harajuku_Store_Front_Tokyo__i97e8o.jpg",
    category: "window",
    description: "Concrete ventilation blocks for airflow and design.",
    unit: "per piece",
    inStock: true,
  },

  // Balustrades
  {
    id: "balustrade-coping",
    name: "Balustrade Coping",
    price: 400,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/e_background_removal/f_auto,q_auto,w_400,c_scale/v1753885947/COPPING_elouhw.jpg",
    image2:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753886157/wall_coping_balsuatrde_bk9o1j.jpg",
    category: "balustrade",
    description: "Top finishing piece for concrete railings.",
    unit: "per piece",
    inStock: true,
  },
  {
    id: "balustrade-2-5ft",
    name: "Balustrade 2.5 ft",
    price: 350,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/e_background_removal/f_auto,q_auto,w_400,c_scale/v1753885143/Balusters_ix2cju.jpg",
    image2:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753885023/balusters-for-back-porch-400x248_gkjikq.jpg",
    category: "balustrade",
    description: "Decorative concrete railing piece for balconies and stairs.",
    unit: "per piece",
    inStock: true,
  },
  {
    id: "balustrade-2ft",
    name: "Balustrade 2 ft",
    price: 300,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/e_background_removal/f_auto,q_auto,w_400,c_scale/v1753885600/wmremove-transformed_n8vded_yswicv.jpg",
    image2:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753884974/backyard-fencing-400x248_zw99e0.jpg",
    category: "balustrade",
    description: "Standard-size balustrade for medium spaces.",
    unit: "per piece",
    inStock: true,
  },
  {
    id: "balustrade-1-5ft",
    name: "Balustrade 1.5 ft",
    price: 250,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/e_background_removal/f_auto,q_auto,w_400,c_scale,e_improve,e_sharpen/v1753518499/balustarde1_z4kvkt.webp",
    image2:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753884858/cement_fence_w9lchf.jpg",
    category: "balustrade",
    description: "Compact balustrade for short walls or stair rails.",
    unit: "per piece",
    inStock: true,
  },

  // Garden Decor
  {
    id: "flower-pot-rectangle",
    name: "Flower Pot (Rectangle)",
    price: 3500,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/e_background_removal/f_auto,q_auto,w_400,c_scale/v1753519746/flower_rctangle_uiqk65.jpg",
    image2:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753884165/RECTANGLE_enij2e.avif",
    category: "garden",
    description: "Large rectangular concrete planter for flowers or shrubs.",
    unit: "per piece",
    inStock: true,
  },
  {
    id: "flower-pot-hexagon",
    name: "Flower Pot (Hexagon)",
    price: 2500,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753519416/hexagon_flower_pot_fkfsqi.png",
    image2:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753884299/HEAXGON_lyumtq.webp",
    category: "garden",
    description: "Stylish hexagonal pot for decorative planting.",
    unit: "per piece",
    inStock: true,
  },

  // Fencing Materials
  {
    id: "fencing-post-curved",
    name: "Fencing Post Curved",
    price: 1600,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/e_background_removal/f_auto,q_auto,w_400,c_scale/v1753880962/FENCING_POST_2_z5kxcv.jpg",
    image2:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753880907/fencing-post_uv5stn.png",
    category: "fencing",
    description: "Arched post for strong boundary fencing.",
    unit: "per piece",
    inStock: true,
  },
  {
    id: "fencing-post-straight",
    name: "Fencing Post Straight",
    price: 1500,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1754049404/wmremove-transformed-removebg-preview_yyqwao.png",
    image2:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753881083/STRAIGHT_qyff5g.avif",
    category: "fencing",
    description: "Standard vertical fencing post for support.",
    unit: "per piece",
    inStock: true,
  },
  {
    id: "fencing-post-support",
    name: "Fencing Post Support",
    price: 1400,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753888312/DeWatermark.ai_1753888271686_rqfkii.jpg",
    image2:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1754049534/SUPPORT1_ev4amg.jpg",
    category: "fencing",
    description: "Reinforcement post to support fencing stability.",
    unit: "per piece",
    inStock: true,
  },

  // Stone, Sand & Aggregates
  {
    id: "ballast",
    name: "Ballast",
    price: 0,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753520319/ballast_ifb1if.jpg",
    image2:
      "https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Ballast+Image+2",
    category: "aggregates",
    description:
      "Crushed stone used in concrete mixing and foundations (Price varies by quantity).",
    unit: "per tipper",
    inStock: true,
  },
  {
    id: "chippings",
    name: "Chippings",
    price: 0,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753903209/Dandy_s_Black_Ice_Gravel_Chippings_Bulk_Bag_-_Fast_irbdct.jpg",
    image2:
      "https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Chippings+Image+2",
    category: "aggregates",
    description:
      "Small stone chips for construction or decorative landscaping.",
    unit: "per tipper",
    inStock: true,
  },
  {
    id: "river-sand",
    name: "River Sand",
    price: 0,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753903419/riversand_dhkpbl.jpg",
    category: "aggregates",
    description: "Clean natural sand ideal for mortar and plastering.",
    unit: "per tipper",
    inStock: true,
  },
  {
    id: "rock-dust",
    name: "Rock Dust",
    price: 0,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753903552/rockdust_xtjepp.jpg",
    category: "aggregates",
    description: "Fine aggregate used for compacting and surface preparation.",
    unit: "per tipper",
    inStock: true,
  },
  {
    id: "foundation-stones-6",
    name: 'Foundation Stones 6"',
    price: 0,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753903895/6foun_em4vwy.jpg",
    category: "aggregates",
    description: "Small cut stones for basic house or structure foundations.",
    unit: "per tipper",
    inStock: true,
  },
  {
    id: "foundation-stones-9",
    name: 'Foundation Stones 9"',
    price: 0,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753903705/9found_oq3bme.jpg",
    category: "aggregates",
    description: "Larger foundation stones for heavy structural work.",
    unit: "per tipper",
    inStock: true,
  },
  {
    id: "yellow-stones-6",
    name: 'Yellow Stones 6"',
    price: 0,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753904036/darungo6_pl5ax2.jpg",
    category: "aggregates",
    description: "Decorative or structural yellow stone blocks.",
    unit: "per tipper",
    inStock: true,
  },
  {
    id: "darugo-stones-9",
    name: 'Darugo Stones 9"',
    price: 0,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753904220/darungo9_czbz5e.jpg",
    category: "aggregates",
    description: 'Traditional 9" hard-cut building stones.',
    unit: "per tipper",
    inStock: true,
  },
  {
    id: "darugo-stones-6",
    name: 'Darugo Stones 6"',
    price: 0,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753904180/ndarungo6_hcjuqh.jpg",
    category: "aggregates",
    description: "Smaller variant of Darugo for partition walls.",
    unit: "per tipper",
    inStock: true,
  },

  // Miscellaneous
  {
    id: "cement-used",
    name: "Cement (Used)",
    price: 800,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1754050550/blue_awr73u.jpg",
    category: "miscellaneous",
    description: "Quality used cement bags at affordable prices.",
    unit: "per bag",
    inStock: true,
  },
  {
    id: "dhobi-sink",
    name: "Dhobi Sink",
    price: 2900,
    image:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753905105/ConcreteRepublicBasin-45_540x_fwdjdh.jpg",
    image2:
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_400,c_scale/v1753905223/sink_nfgqon.jpg",
    category: "miscellaneous",
    description: "High-quality concrete sink for laundry and utility use.",
    unit: "per piece",
    inStock: true,
  },
];

export const categories = [
  { id: "drainage", name: "Drainage & Culverts", icon: "🏗️" },
  { id: "paving", name: "Paving & Surface Materials", icon: "🚧" },
  { id: "coping", name: "Wall & Pillar Coping", icon: "🧱" },
  { id: "window", name: "Window & Ventilation", icon: "🪟" },
  { id: "balustrade", name: "Balustrades", icon: "🪜" },
  { id: "garden", name: "Garden Decor", icon: "🌿" },
  { id: "fencing", name: "Fencing Materials", icon: "🪵" },
  { id: "aggregates", name: "Stone, Sand & Aggregates", icon: "🧱" },
  { id: "miscellaneous", name: "Miscellaneous", icon: "🧪" },
];
