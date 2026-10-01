// 1. Database for the Category Listing Pages (e.g., /sofas)
export const catalogData = {
  sofas: [
    {
      id: "bubble",
      name: "Bubble",
      designer: "Sacha Lakic",
      imgPrimary: "/Catalogue Images/Sofa Sets/ci.jpg",
      imgSecondary: "/Secondary/002.jpg",
      link: "/product/bubble"
    },
    {
      id: "mah-jong",
      name: "Mah Jong",
      designer: "Hans Hopfer",
      imgPrimary: "/Catalogue Images/Sofa Sets/ci2.jpg",
      imgSecondary: "/Secondary/003.jpg",
      link: "/product/mah-jong"
    },
    {
      id: "meridian",
      name: "Meridian",
      designer: "Hans Hopfer",
      imgPrimary: "/Catalogue Images/Sofa Sets/ci3.jpg",
      imgSecondary: "/Secondary/001.jpg",
      link: "/product/meridian"
    },
    {
      id: "verio",
      name: "Verio",
      designer: "Sacha Lakic",
      imgPrimary: "/Catalogue Images/Sofa Sets/ci4.jpg",
      imgSecondary: "/Secondary/005.jpg",
      link: "/product/verio"
    },
    {
      id: "milano",
      name: "Milano",
      designer: "Hans Hopfer",
      imgPrimary: "/Catalogue Images/Sofa Sets/ci5.jpg",
      imgSecondary: "/Secondary/004.jpg",
      link: "/product/milano"
    },
    {
      id: "onsa",
      name: "Onsa",
      designer: "Hans Hopfer",
      imgPrimary: "/Catalogue Images/Sofa Sets/ci6.jpg",
      imgSecondary: "/Secondary/006.jpg",
      link: "/product/onsa"
    },
    {
      id: "encore",
      name: "Encore",
      designer: "Hans Hopfer",
      imgPrimary: "/Catalogue Images/Sofa Sets/ci7.jpg",
      imgSecondary: "/Secondary/007.jpg",
      link: "/product/encore"
    },
    {
      id: "muave",
      name: "Muave",
      designer: "Hans Hopfer",
      imgPrimary: "/Secondary/ddd.jpg",
      imgSecondary: "/Secondary/010.jpg",
      link: "/product/muave"
    },
    {
      id: "deluxe",
      name: "Deluxe",
      designer: "Hans Hopfer",
      imgPrimary: "/Catalogue Images/Sofa Sets/30.jpg",
      imgSecondary: "/Secondary/012.jpg",
      link: "/product/deluxe"
    },
    {
      id: "coze",
      name: "Coze",
      designer: "Hans Hopfer",
      imgPrimary: "/Secondary/013.jpg",
      imgSecondary: "/Secondary/015.jpg",
      link: "/product/coze"
    },
    {
      id: "trops",
      name: "Trops",
      designer: "Hans Hopfer",
      imgPrimary: "/Catalogue Images/Sofa Sets/ci8.jpg",
      imgSecondary: "/Secondary/016.jpg",
      link: "/product/trops"
    },
    {
      id: "sun",
      name: "Sun",
      designer: "Hans Hopfer",
      imgPrimary: "/Catalogue Images/Sofa Sets/110.jpg",
      imgSecondary: "/Secondary/018.jpg",
      link: "/product/sun"
    },
    {
      id: "plain",
      name: "Plain",
      designer: "Hans Hopfer",
      imgPrimary: "/Catalogue Images/Sofa Sets/88.jpg",
      imgSecondary: "/Secondary/020.jpg",
      link: "/product/plain"
    },
    {
      id: "cobalt",
      name: "Cobalt",
      designer: "Hans Hopfer",
      imgPrimary: "/Catalogue Images/Sofa Sets/137.jpg",
      imgSecondary: "/Secondary/022.jpg",
      link: "/product/cobalt"
    },
    {
      id: "matte",
      name: "Matte",
      designer: "Hans Hopfer",
      imgPrimary: "/Catalogue Images/Sofa Sets/89.jpg",
      imgSecondary: "/Secondary/026.jpg",
      link: "/product/matte"
    },
    {
      id: "nature",
      name: "Nature",
      designer: "Hans Hopfer",
      imgPrimary: "/Secondary/029.jpg",
      imgSecondary: "/Secondary/031.jpg",
      link: "/product/nature"
    },
    {
      id: "avant",
      name: "Avant",
      designer: "Hans Hopfer",
      imgPrimary: "/Secondary/032.jpg",
      imgSecondary: "/Secondary/034.jpg",
      link: "/product/avant"
    },
    {
      id: "sky",
      name: "Sky",
      designer: "Hans Hopfer",
      imgPrimary: "/Secondary/035.jpg",
      imgSecondary: "/Secondary/036.jpg",
      link: "/product/sky"
    },
    {
      id: "retro",
      name: "Retro",
      designer: "Hans Hopfer",
      imgPrimary: "/Secondary/037.jpg",
      imgSecondary: "/Secondary/038.jpg",
      link: "/product/retro"
    }
    

  ],
  beds: [
    {
      id: "bed-alpha",
      name: "Alpha Bed",
      designer: "FurnWalk Studio",
      imgPrimary: "/Catalogue Images/Bed Sets/178.jpg", 
      imgSecondary: "/Secondary/008.jpg",
      link: "/product/bed-alpha"
    }
  ]
};

// 2. Detailed Database for Individual Product Pages (e.g., /product/bubble)
export const productsDB: Record<string, any> = {
  "bubble": {
    id: "bubble",
    category: "Sofas",
    name: "Bubble",
    type: "Curved 3-Seat Sofa",
    designer: "Sacha Lakic",
    images: [
      "/Catalogue Images/Sofa Sets/ci.jpg",
      "/Catalogue Images/Sofa Sets/ci9.jpg",
      "/Catalogue Images/Sofa Sets/ci10.jpg",
      "/Secondary/002.jpg"
    ],
    swatches: [
      { name: "Techno 2D - Yellow", hex: "#dcb935" },
      { name: "Techno 3D - Cobalt", hex: "#2b4a78" },
      { name: "Techno 4D - Graphite", hex: "#525252" }
    ],
    dimensions: {
      metric: "W. 238 x H. 80 x D. 113 cm",
      imperial: "93.7\"w x 31.5\"h x 44.5\"d",
      list: [
        "Width: 238 cm (93.7\")",
        "Height: 80 cm (31.5\")",
        "Depth: 113 cm (44.5\")"
      ]
    },
    details: "Upholstered in TECHNO 2D, 3D or 4D fabric. Completely hand-made, entirely constructed with bi-density HR polyurethane foam on a solid wood frame. Exceptional comfort and bold design."
  },
  "mah-jong": {
    id: "mah-jong",
    category: "Modular Sofas",
    name: "Mah Jong",
    type: "Modular Sofa Composition",
    designer: "Hans Hopfer",
    images: [
      "/Catalogue Images/Sofa Sets/ci2.jpg",
      "/gallery/g1.jpg",
      "/gallery/g2.jpg",
      "/Secondary/003.jpg"
    ],
    swatches: [
      { name: "Kenzo Takada - Asagao", hex: "#c24e5b" },
      { name: "Missoni Home - Chevron", hex: "#638ca6" },
      { name: "Jean Paul Gaultier - Tartan", hex: "#ab3c35" }
    ],
    dimensions: {
      metric: "Dimensions vary per composition",
      imperial: "Dimensions vary per composition",
      list: [
        "Seat cushion: W. 95 x H. 19 x D. 95 cm",
        "Straight backrest: W. 95 x H. 53 x D. 95 cm",
        "Corner backrest: W. 95 x H. 53 x D. 95 cm"
      ]
    },
    details: "Modular seating system designed by Hans Hopfer. Allows for infinite combinations. Hand-tufted, hand-sewn, and hand-finished. Fabrics chosen from haute couture fashion houses."
  },
  "meridian": {
    id: "meridian",
    category: "Sofas",
    name: "Meridian",
    type: "Curved 3-Seat Sofa",
    designer: "Sacha Lakic",
    images: [
      "/Catalogue Images/Sofa Sets/ci3.jpg",
      "/gallery/g3.jpg",
      "/gallery/g4.jpg",
      "/Secondary/001.jpg"
    ],
    swatches: [
      { name: "Techno 2D - Yellow", hex: "#dcb935" },
      { name: "Techno 3D - Cobalt", hex: "#2b4a78" },
      { name: "Techno 4D - Graphite", hex: "#525252" }
    ],
    dimensions: {
      metric: "W. 238 x H. 80 x D. 113 cm",
      imperial: "93.7\"w x 31.5\"h x 44.5\"d",
      list: [
        "Width: 238 cm (93.7\")",
        "Height: 80 cm (31.5\")",
        "Depth: 113 cm (44.5\")"
      ]
    },
    details: "Upholstered in TECHNO 2D, 3D or 4D fabric. Completely hand-made, entirely constructed with bi-density HR polyurethane foam on a solid wood frame. Exceptional comfort and bold design."
  },
  "verio": {
    id: "verio",
    category: "Sofas",
    name: "Verio",
    type: "Curved 3-Seat Sofa",
    designer: "Sacha Lakic",
    images: [
      "/Catalogue Images/Sofa Sets/ci4.jpg",
      "/gallery/g5.jpg",
      "/gallery/g6.jpg",
      "/Secondary/005.jpg"
    ],
    swatches: [
      { name: "Techno 2D - Yellow", hex: "#dcb935" },
      { name: "Techno 3D - Cobalt", hex: "#2b4a78" },
      { name: "Techno 4D - Graphite", hex: "#525252" }
    ],
    dimensions: {
      metric: "W. 238 x H. 80 x D. 113 cm",
      imperial: "93.7\"w x 31.5\"h x 44.5\"d",
      list: [
        "Width: 238 cm (93.7\")",
        "Height: 80 cm (31.5\")",
        "Depth: 113 cm (44.5\")"
      ]
    },
    details: "Upholstered in TECHNO 2D, 3D or 4D fabric. Completely hand-made, entirely constructed with bi-density HR polyurethane foam on a solid wood frame. Exceptional comfort and bold design."
  },
  "milano": {
    id: "milano",
    category: "Sofas",
    name: "Milano",
    type: "Curved 3-Seat Sofa",
    designer: "Sacha Lakic",
    images: [
      "/Catalogue Images/Sofa Sets/ci5.jpg",
      "/gallery/g7.jpg",
      "/gallery/g8.jpg",
      "/Secondary/004.jpg"
    ],
    swatches: [
      { name: "Techno 2D - Yellow", hex: "#dcb935" },
      { name: "Techno 3D - Cobalt", hex: "#2b4a78" },
      { name: "Techno 4D - Graphite", hex: "#525252" }
    ],
    dimensions: {
      metric: "W. 238 x H. 80 x D. 113 cm",
      imperial: "93.7\"w x 31.5\"h x 44.5\"d",
      list: [
        "Width: 238 cm (93.7\")",
        "Height: 80 cm (31.5\")",
        "Depth: 113 cm (44.5\")"
      ]
    },
    details: "Upholstered in TECHNO 2D, 3D or 4D fabric. Completely hand-made, entirely constructed with bi-density HR polyurethane foam on a solid wood frame. Exceptional comfort and bold design."
  },
  "onsa": {
    id: "onsa",
    category: "Sofas",
    name: "Onsa",
    type: "Curved 3-Seat Sofa",
    designer: "Sacha Lakic",
    images: [
      "/Catalogue Images/Sofa Sets/ci6.jpg",
      "/gallery/g9.jpg",
      "/gallery/g10.jpg",
      "/Secondary/006.jpg"
    ],
    swatches: [
      { name: "Techno 2D - Yellow", hex: "#dcb935" },
      { name: "Techno 3D - Cobalt", hex: "#2b4a78" },
      { name: "Techno 4D - Graphite", hex: "#525252" }
    ],
    dimensions: {
      metric: "W. 238 x H. 80 x D. 113 cm",
      imperial: "93.7\"w x 31.5\"h x 44.5\"d",
      list: [
        "Width: 238 cm (93.7\")",
        "Height: 80 cm (31.5\")",
        "Depth: 113 cm (44.5\")"
      ]
    },
    details: "Upholstered in TECHNO 2D, 3D or 4D fabric. Completely hand-made, entirely constructed with bi-density HR polyurethane foam on a solid wood frame. Exceptional comfort and bold design."
  },
  "encore": {
    id: "encore",
    category: "Sofas",
    name: "Encore",
    type: "Curved 3-Seat Sofa",
    designer: "Sacha Lakic",
    images: [
      "/Catalogue Images/Sofa Sets/ci7.jpg",
      "/gallery/g11.jpg",
      "/gallery/g12.jpg",
      "/Secondary/007.jpg"
    ],
    swatches: [
      { name: "Techno 2D - Yellow", hex: "#dcb935" },
      { name: "Techno 3D - Cobalt", hex: "#2b4a78" },
      { name: "Techno 4D - Graphite", hex: "#525252" }
    ],
    dimensions: {
      metric: "W. 238 x H. 80 x D. 113 cm",
      imperial: "93.7\"w x 31.5\"h x 44.5\"d",
      list: [
        "Width: 238 cm (93.7\")",
        "Height: 80 cm (31.5\")",
        "Depth: 113 cm (44.5\")"
      ]
    },
    details: "Upholstered in TECHNO 2D, 3D or 4D fabric. Completely hand-made, entirely constructed with bi-density HR polyurethane foam on a solid wood frame. Exceptional comfort and bold design."
  },
  "muave": {
    id: "muave",
    category: "Sofas",
    name: "Muave",
    type: "Curved 3-Seat Sofa",
    designer: "Sacha Lakic",
    images: [
      "/Secondary/ddd.jpg",
      "/Secondary/009.jpg",
      "/Secondary/010.jpg"
    ],
    swatches: [
      { name: "Techno 2D - Yellow", hex: "#dcb935" },
      { name: "Techno 3D - Cobalt", hex: "#2b4a78" },
      { name: "Techno 4D - Graphite", hex: "#525252" }
    ],
    dimensions: {
      metric: "W. 238 x H. 80 x D. 113 cm",
      imperial: "93.7\"w x 31.5\"h x 44.5\"d",
      list: [
        "Width: 238 cm (93.7\")",
        "Height: 80 cm (31.5\")",
        "Depth: 113 cm (44.5\")"
      ]
    },
    details: "Upholstered in TECHNO 2D, 3D or 4D fabric. Completely hand-made, entirely constructed with bi-density HR polyurethane foam on a solid wood frame. Exceptional comfort and bold design."
  },
  "deluxe": {
    id: "deluxe",
    category: "Sofas",
    name: "Deluxe",
    type: "Curved 3-Seat Sofa",
    designer: "Sacha Lakic",
    images: [
      "/Catalogue Images/Sofa Sets/30.jpg",
      "/Secondary/011.jpg",
      "/Secondary/012.jpg"
    ],
    swatches: [
      { name: "Techno 2D - Yellow", hex: "#dcb935" },
      { name: "Techno 3D - Cobalt", hex: "#2b4a78" },
      { name: "Techno 4D - Graphite", hex: "#525252" }
    ],
    dimensions: {
      metric: "W. 238 x H. 80 x D. 113 cm",
      imperial: "93.7\"w x 31.5\"h x 44.5\"d",
      list: [
        "Width: 238 cm (93.7\")",
        "Height: 80 cm (31.5\")",
        "Depth: 113 cm (44.5\")"
      ]
    },
    details: "Upholstered in TECHNO 2D, 3D or 4D fabric. Completely hand-made, entirely constructed with bi-density HR polyurethane foam on a solid wood frame. Exceptional comfort and bold design."
  },
  "coze": {
    id: "coze",
    category: "Sofas",
    name: "Coze",
    type: "Curved 3-Seat Sofa",
    designer: "Sacha Lakic",
    images: [
      "/Secondary/013.jpg",
      "/Secondary/014.jpg",
      "/Secondary/015.jpg"
    ],
    swatches: [
      { name: "Techno 2D - Yellow", hex: "#dcb935" },
      { name: "Techno 3D - Cobalt", hex: "#2b4a78" },
      { name: "Techno 4D - Graphite", hex: "#525252" }
    ],
    dimensions: {
      metric: "W. 238 x H. 80 x D. 113 cm",
      imperial: "93.7\"w x 31.5\"h x 44.5\"d",
      list: [
        "Width: 238 cm (93.7\")",
        "Height: 80 cm (31.5\")",
        "Depth: 113 cm (44.5\")"
      ]
    },
    details: "Upholstered in TECHNO 2D, 3D or 4D fabric. Completely hand-made, entirely constructed with bi-density HR polyurethane foam on a solid wood frame. Exceptional comfort and bold design."
  },
  "trops": {
    id: "trops",
    category: "Sofas",
    name: "Trops",
    type: "Curved 3-Seat Sofa",
    designer: "Sacha Lakic",
    images: [
      "/Catalogue Images/Sofa Sets/ci8.jpg",
      "/Catalogue Images/Sofa Sets/ci11.jpg",
      "/Catalogue Images/Sofa Sets/ci12.jpg",
      "/Secondary/016.jpg"
    ],
    swatches: [
      { name: "Techno 2D - Yellow", hex: "#dcb935" },
      { name: "Techno 3D - Cobalt", hex: "#2b4a78" },
      { name: "Techno 4D - Graphite", hex: "#525252" }
    ],
    dimensions: {
      metric: "W. 238 x H. 80 x D. 113 cm",
      imperial: "93.7\"w x 31.5\"h x 44.5\"d",
      list: [
        "Width: 238 cm (93.7\")",
        "Height: 80 cm (31.5\")",
        "Depth: 113 cm (44.5\")"
      ]
    },
    details: "Upholstered in TECHNO 2D, 3D or 4D fabric. Completely hand-made, entirely constructed with bi-density HR polyurethane foam on a solid wood frame. Exceptional comfort and bold design."
  },
  "sun": {
    id: "sun",
    category: "Sofas",
    name: "Sun",
    type: "Curved 3-Seat Sofa",
    designer: "Sacha Lakic",
    images: [
      "/Catalogue Images/Sofa Sets/110.jpg",
      "/Secondary/017.jpg",
      "/Secondary/018.jpg"
    ],
    swatches: [
      { name: "Techno 2D - Yellow", hex: "#dcb935" },
      { name: "Techno 3D - Cobalt", hex: "#2b4a78" },
      { name: "Techno 4D - Graphite", hex: "#525252" }
    ],
    dimensions: {
      metric: "W. 238 x H. 80 x D. 113 cm",
      imperial: "93.7\"w x 31.5\"h x 44.5\"d",
      list: [
        "Width: 238 cm (93.7\")",
        "Height: 80 cm (31.5\")",
        "Depth: 113 cm (44.5\")"
      ]
    },
    details: "Upholstered in TECHNO 2D, 3D or 4D fabric. Completely hand-made, entirely constructed with bi-density HR polyurethane foam on a solid wood frame. Exceptional comfort and bold design."
  },
  "plain": {
    id: "plain",
    category: "Sofas",
    name: "Plain",
    type: "Curved 3-Seat Sofa",
    designer: "Sacha Lakic",
    images: [
      "/Catalogue Images/Sofa Sets/88.jpg",
      "/Secondary/019.jpg",
      "/Secondary/020.jpg"
    ],
    swatches: [
      { name: "Techno 2D - Yellow", hex: "#dcb935" },
      { name: "Techno 3D - Cobalt", hex: "#2b4a78" },
      { name: "Techno 4D - Graphite", hex: "#525252" }
    ],
    dimensions: {
      metric: "W. 238 x H. 80 x D. 113 cm",
      imperial: "93.7\"w x 31.5\"h x 44.5\"d",
      list: [
        "Width: 238 cm (93.7\")",
        "Height: 80 cm (31.5\")",
        "Depth: 113 cm (44.5\")"
      ]
    },
    details: "Upholstered in TECHNO 2D, 3D or 4D fabric. Completely hand-made, entirely constructed with bi-density HR polyurethane foam on a solid wood frame. Exceptional comfort and bold design."
  },
  "cobalt": {
    id: "cobalt",
    category: "Sofas",
    name: "Cobalt",
    type: "Curved 3-Seat Sofa",
    designer: "Sacha Lakic",
    images: [
      "/Catalogue Images/Sofa Sets/137.jpg",
      "/Secondary/021.jpg",
      "/Secondary/022.jpg"
    ],
    swatches: [
      { name: "Techno 2D - Yellow", hex: "#dcb935" },
      { name: "Techno 3D - Cobalt", hex: "#2b4a78" },
      { name: "Techno 4D - Graphite", hex: "#525252" }
    ],
    dimensions: {
      metric: "W. 238 x H. 80 x D. 113 cm",
      imperial: "93.7\"w x 31.5\"h x 44.5\"d",
      list: [
        "Width: 238 cm (93.7\")",
        "Height: 80 cm (31.5\")",
        "Depth: 113 cm (44.5\")"
      ]
    },
    details: "Upholstered in TECHNO 2D, 3D or 4D fabric. Completely hand-made, entirely constructed with bi-density HR polyurethane foam on a solid wood frame. Exceptional comfort and bold design."
  },
  "matte": {
    id: "matte",
    category: "Sofas",
    name: "Matte",
    type: "Curved 3-Seat Sofa",
    designer: "Sacha Lakic",
    images: [
      "/Catalogue Images/Sofa Sets/89.jpg",
      "/Secondary/025.jpg",
      "/Secondary/026.jpg"
    ],
    swatches: [
      { name: "Techno 2D - Yellow", hex: "#dcb935" },
      { name: "Techno 3D - Cobalt", hex: "#2b4a78" },
      { name: "Techno 4D - Graphite", hex: "#525252" }
    ],
    dimensions: {
      metric: "W. 238 x H. 80 x D. 113 cm",
      imperial: "93.7\"w x 31.5\"h x 44.5\"d",
      list: [
        "Width: 238 cm (93.7\")",
        "Height: 80 cm (31.5\")",
        "Depth: 113 cm (44.5\")"
      ]
    },
    details: "Upholstered in TECHNO 2D, 3D or 4D fabric. Completely hand-made, entirely constructed with bi-density HR polyurethane foam on a solid wood frame. Exceptional comfort and bold design."
  },
  "nature": {
    id: "nature",
    category: "Sofas",
    name: "Nature",
    type: "Curved 3-Seat Sofa",
    designer: "Sacha Lakic",
    images: [
      "/Secondary/029.jpg",
      "/Secondary/030.jpg",
      "/Secondary/031.jpg"
    ],
    swatches: [
      { name: "Techno 2D - Yellow", hex: "#dcb935" },
      { name: "Techno 3D - Cobalt", hex: "#2b4a78" },
      { name: "Techno 4D - Graphite", hex: "#525252" }
    ],
    dimensions: {
      metric: "W. 238 x H. 80 x D. 113 cm",
      imperial: "93.7\"w x 31.5\"h x 44.5\"d",
      list: [
        "Width: 238 cm (93.7\")",
        "Height: 80 cm (31.5\")",
        "Depth: 113 cm (44.5\")"
      ]
    },
    details: "Upholstered in TECHNO 2D, 3D or 4D fabric. Completely hand-made, entirely constructed with bi-density HR polyurethane foam on a solid wood frame. Exceptional comfort and bold design."
  },
  "avant": {
    id: "avant",
    category: "Sofas",
    name: "Avant",
    type: "Curved 3-Seat Sofa",
    designer: "Sacha Lakic",
    images: [
      "/Secondary/032.jpg",
      "/Secondary/033.jpg",
      "/Secondary/034.jpg"
    ],
    swatches: [
      { name: "Techno 2D - Yellow", hex: "#dcb935" },
      { name: "Techno 3D - Cobalt", hex: "#2b4a78" },
      { name: "Techno 4D - Graphite", hex: "#525252" }
    ],
    dimensions: {
      metric: "W. 238 x H. 80 x D. 113 cm",
      imperial: "93.7\"w x 31.5\"h x 44.5\"d",
      list: [
        "Width: 238 cm (93.7\")",
        "Height: 80 cm (31.5\")",
        "Depth: 113 cm (44.5\")"
      ]
    },
    details: "Upholstered in TECHNO 2D, 3D or 4D fabric. Completely hand-made, entirely constructed with bi-density HR polyurethane foam on a solid wood frame. Exceptional comfort and bold design."
  },
  "sky": {
    id: "sky",
    category: "Sofas",
    name: "Sky",
    type: "Curved 3-Seat Sofa",
    designer: "Sacha Lakic",
    images: [
      "/Secondary/035.jpg",
      "/Secondary/036.jpg"
    ],
    swatches: [
      { name: "Techno 2D - Yellow", hex: "#dcb935" },
      { name: "Techno 3D - Cobalt", hex: "#2b4a78" },
      { name: "Techno 4D - Graphite", hex: "#525252" }
    ],
    dimensions: {
      metric: "W. 238 x H. 80 x D. 113 cm",
      imperial: "93.7\"w x 31.5\"h x 44.5\"d",
      list: [
        "Width: 238 cm (93.7\")",
        "Height: 80 cm (31.5\")",
        "Depth: 113 cm (44.5\")"
      ]
    },
    details: "Upholstered in TECHNO 2D, 3D or 4D fabric. Completely hand-made, entirely constructed with bi-density HR polyurethane foam on a solid wood frame. Exceptional comfort and bold design."
  },
  "retro": {
    id: "retro",
    category: "Sofas",
    name: "Retro",
    type: "Curved 3-Seat Sofa",
    designer: "Sacha Lakic",
    images: [
      "/Secondary/037.jpg",
      "/Secondary/038.jpg"
    ],
    swatches: [
      { name: "Techno 2D - Yellow", hex: "#dcb935" },
      { name: "Techno 3D - Cobalt", hex: "#2b4a78" },
      { name: "Techno 4D - Graphite", hex: "#525252" }
    ],
    dimensions: {
      metric: "W. 238 x H. 80 x D. 113 cm",
      imperial: "93.7\"w x 31.5\"h x 44.5\"d",
      list: [
        "Width: 238 cm (93.7\")",
        "Height: 80 cm (31.5\")",
        "Depth: 113 cm (44.5\")"
      ]
    },
    details: "Upholstered in TECHNO 2D, 3D or 4D fabric. Completely hand-made, entirely constructed with bi-density HR polyurethane foam on a solid wood frame. Exceptional comfort and bold design."
  },
  "bed-alpha": {
    id: "bed-alpha",
    category: "Beds",
    name: "Alpha",
    type: "Modular Bed System",
    designer: "Sacha Lakic",
    images: [
      "/Catalogue Images/Bed Sets/178.jpg",
      "/gallery/179.jpg",
      "/Secondary/008.jpg"
    ],
    swatches: [
      { name: "Techno 2D - Yellow", hex: "#dcb935" },
      { name: "Techno 3D - Cobalt", hex: "#2b4a78" },
      { name: "Techno 4D - Graphite", hex: "#525252" }
    ],
    dimensions: {
      metric: "W. 238 x H. 80 x D. 113 cm",
      imperial: "93.7\"w x 31.5\"h x 44.5\"d",
      list: [
        "Width: 238 cm (93.7\")",
        "Height: 80 cm (31.5\")",
        "Depth: 113 cm (44.5\")"
      ]
    },
    details: "Upholstered in TECHNO 2D, 3D or 4D fabric. Completely hand-made, entirely constructed with bi-density HR polyurethane foam on a solid wood frame. Exceptional comfort and bold design."
  },


  "goldy": {
    id: "goldy",
    category: "Sideboards",
    name: "Goldy",
    type: "Sideboard",
    designer: "Sacha Lakic",
    images: [
      "/Catalogue Images/Bed Sets/178.jpg",
      "/gallery/179.jpg",
      "/Secondary/008.jpg"
    ],
    swatches: [
      { name: "Techno 2D - Yellow", hex: "#dcb935" },
      { name: "Techno 3D - Cobalt", hex: "#2b4a78" },
      { name: "Techno 4D - Graphite", hex: "#525252" }
    ],
    dimensions: {
      metric: "W. 238 x H. 80 x D. 113 cm",
      imperial: "93.7\"w x 31.5\"h x 44.5\"d",
      list: [
        "Width: 238 cm (93.7\")",
        "Height: 80 cm (31.5\")",
        "Depth: 113 cm (44.5\")"
      ]
    },
    details: "Upholstered in TECHNO 2D, 3D or 4D fabric. Completely hand-made, entirely constructed with bi-density HR polyurethane foam on a solid wood frame. Exceptional comfort and bold design."
  }
  
};

// 3. Helper function
export const getProductById = (id: string) => {
  return productsDB[id] || null;
};