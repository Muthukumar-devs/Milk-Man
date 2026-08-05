const productsData = {
  newLaunches: [
    {
      id: "nl1",
      name: "A2 Desi Ghee",
      size: "500 ml",
      price: 520,
      originalPrice: 620,
      vipPrice: 460,
      image: require("../assets/images/product_ghee.png"),
      quantity: 0
    },
    {
      id: "nl2",
      name: "Greek Yogurt",
      size: "400 gm",
      price: 120,
      originalPrice: 150,
      vipPrice: 100,
      image: require("../assets/images/product_milk.png"),
      quantity: 0
    },
    {
      id: "nl3",
      name: "Flavoured Lassi",
      size: "200 ml",
      price: 40,
      originalPrice: 50,
      vipPrice: 35,
      image: require("../assets/images/product_milk.png"),
      quantity: 0
    },
    {
      id: "nl4",
      name: "Malai Paneer",
      size: "250 gm",
      price: 180,
      originalPrice: 220,
      vipPrice: 155,
      image: require("../assets/images/product_milk.png"),
      quantity: 0
    }
  ],
  popularProducts: [
    {
      id: "p1",
      name: "A2 Cow Milk",
      price: 70,
      size: "500 ml",
      image: require("../assets/images/product_milk.png"),
      bgColor: "bg-blue-100"
    },
    {
      id: "p2",
      name: "Buffalo Milk",
      price: 65,
      size: "500 ml",
      image: require("../assets/images/product_milk.png"),
      bgColor: "bg-yellow-100"
    },
    {
      id: "p3",
      name: "Toned Milk",
      price: 55,
      size: "500 ml",
      image: require("../assets/images/product_milk.png"),
      bgColor: "bg-green-100"
    }
  ],
  discountTrials: [
    {
      id: "dt1",
      name: "A2 Milk Trial Pack",
      description: "3 days | 500ml/day",
      price: 180,
      originalPrice: 240,
      discount: "25% Off",
      image: require("../assets/images/product_milk.png")
    },
    {
      id: "dt2",
      name: "Buffalo Milk Trial",
      description: "5 days | 500ml/day",
      price: 280,
      originalPrice: 350,
      discount: "20% Off",
      image: require("../assets/images/product_milk.png")
    },
    {
      id: "dt3",
      name: "Paneer Trial Pack",
      description: "200gm x 3 packs",
      price: 420,
      originalPrice: 540,
      discount: "22% Off",
      image: require("../assets/images/product_milk.png")
    }
  ],
  milkBanners: [
    {
      id: "b1",
      image: require("../assets/images/product_milk.png")
    },
    {
      id: "b2",
      image: require("../assets/images/product_milk.png")
    },
    {
      id: "b3",
      image: require("../assets/images/product_milk.png")
    }
  ],
  categoryProducts: {
    milk: [
      {
        id: "m1",
        name: "A2 Cow Milk",
        size: "500 ml",
        price: 70,
        originalPrice: 85,
        vipPrice: 60,
        discount: "18% Off",
        image: require("../assets/images/product_milk.png"),
        images: [
          require("../assets/images/product_milk.png"),
          require("../assets/images/product_milk.png")
        ],
        category: "Milk",
        isOrganic: true,
        nextAvailable: "Daily",
        quantity: 0
      },
      {
        id: "m2",
        name: "A2 Cow Milk",
        size: "1 Ltr",
        price: 130,
        originalPrice: 160,
        vipPrice: 110,
        discount: "19% Off",
        image: require("../assets/images/product_milk.png"),
        images: [
          require("../assets/images/product_milk.png"),
          require("../assets/images/product_milk.png")
        ],
        category: "Milk",
        isOrganic: true,
        nextAvailable: "Daily",
        quantity: 0
      },
      {
        id: "m3",
        name: "Buffalo Milk",
        size: "500 ml",
        price: 65,
        originalPrice: 80,
        vipPrice: 55,
        discount: "19% Off",
        image: require("../assets/images/product_milk.png"),
        images: [
          require("../assets/images/product_milk.png"),
          require("../assets/images/product_milk.png")
        ],
        category: "Milk",
        isOrganic: false,
        nextAvailable: "Daily",
        quantity: 0
      },
      {
        id: "m4",
        name: "Toned Milk",
        size: "500 ml",
        price: 55,
        originalPrice: 65,
        vipPrice: 48,
        discount: "15% Off",
        image: require("../assets/images/product_milk.png"),
        images: [
          require("../assets/images/product_milk.png"),
          require("../assets/images/product_milk.png")
        ],
        category: "Milk",
        isOrganic: false,
        nextAvailable: "Daily",
        quantity: 0
      },
      {
        id: "m5",
        name: "Full Cream Milk",
        size: "1 Ltr",
        price: 90,
        originalPrice: 110,
        vipPrice: 78,
        discount: "18% Off",
        image: require("../assets/images/product_milk.png"),
        images: [
          require("../assets/images/product_milk.png"),
          require("../assets/images/product_milk.png")
        ],
        category: "Milk",
        isOrganic: false,
        nextAvailable: "Daily",
        quantity: 0
      }
    ],
    dairy: [
      {
        id: "d1",
        name: "Fresh Paneer",
        size: "200 gm",
        price: 120,
        originalPrice: 150,
        vipPrice: 100,
        discount: "20% Off",
        image: require("../assets/images/product_milk.png"),
        images: [
          require("../assets/images/product_milk.png"),
          require("../assets/images/product_milk.png")
        ],
        category: "Dairy",
        isOrganic: true,
        nextAvailable: "Daily",
        quantity: 0
      },
      {
        id: "d2",
        name: "White Butter",
        size: "100 gm",
        price: 80,
        originalPrice: 100,
        vipPrice: 68,
        discount: "20% Off",
        image: require("../assets/images/product_milk.png"),
        images: [
          require("../assets/images/product_milk.png"),
          require("../assets/images/product_milk.png")
        ],
        category: "Dairy",
        isOrganic: false,
        nextAvailable: "Daily",
        quantity: 0
      },
      {
        id: "d3",
        name: "Dahi (Curd)",
        size: "400 gm",
        price: 60,
        originalPrice: 75,
        vipPrice: 50,
        discount: "20% Off",
        image: require("../assets/images/product_milk.png"),
        images: [
          require("../assets/images/product_milk.png"),
          require("../assets/images/product_milk.png")
        ],
        category: "Dairy",
        isOrganic: false,
        nextAvailable: "Daily",
        quantity: 0
      },
      {
        id: "d4",
        name: "A2 Desi Ghee",
        size: "500 ml",
        price: 520,
        originalPrice: 620,
        vipPrice: 460,
        discount: "16% Off",
        image: require("../assets/images/product_ghee.png"),
        images: [
          require("../assets/images/product_ghee.png"),
          require("../assets/images/product_ghee.png")
        ],
        category: "Dairy",
        isOrganic: true,
        nextAvailable: "Daily",
        quantity: 0
      },
      {
        id: "d5",
        name: "Cheese Slice",
        size: "200 gm",
        price: 110,
        originalPrice: 135,
        vipPrice: 95,
        discount: "19% Off",
        image: require("../assets/images/product_milk.png"),
        images: [
          require("../assets/images/product_milk.png"),
          require("../assets/images/product_milk.png")
        ],
        category: "Dairy",
        isOrganic: false,
        nextAvailable: "Daily",
        quantity: 0
      }
    ],
    curd: [
      {
        id: "c1",
        name: "Plain Dahi",
        size: "200 gm",
        price: 30,
        originalPrice: 40,
        vipPrice: 25,
        discount: "25% Off",
        image: require("../assets/images/product_milk.png"),
        images: [
          require("../assets/images/product_milk.png"),
          require("../assets/images/product_milk.png")
        ],
        category: "Curd",
        isOrganic: false,
        nextAvailable: "Daily",
        quantity: 0
      },
      {
        id: "c2",
        name: "Greek Yogurt",
        size: "400 gm",
        price: 120,
        originalPrice: 150,
        vipPrice: 100,
        discount: "20% Off",
        image: require("../assets/images/product_milk.png"),
        images: [
          require("../assets/images/product_milk.png"),
          require("../assets/images/product_milk.png")
        ],
        category: "Curd",
        isOrganic: true,
        nextAvailable: "Daily",
        quantity: 0
      },
      {
        id: "c3",
        name: "Mishti Doi",
        size: "200 gm",
        price: 45,
        originalPrice: 55,
        vipPrice: 38,
        discount: "18% Off",
        image: require("../assets/images/product_milk.png"),
        images: [
          require("../assets/images/product_milk.png"),
          require("../assets/images/product_milk.png")
        ],
        category: "Curd",
        isOrganic: false,
        nextAvailable: "Daily",
        quantity: 0
      }
    ],
    ghee: [
      {
        id: "g1",
        name: "A2 Desi Ghee",
        size: "250 ml",
        price: 280,
        originalPrice: 340,
        vipPrice: 240,
        discount: "18% Off",
        image: require("../assets/images/product_ghee.png"),
        images: [
          require("../assets/images/product_ghee.png"),
          require("../assets/images/product_ghee.png")
        ],
        category: "Ghee",
        isOrganic: true,
        nextAvailable: "Daily",
        quantity: 0
      },
      {
        id: "g2",
        name: "A2 Desi Ghee",
        size: "500 ml",
        price: 520,
        originalPrice: 620,
        vipPrice: 460,
        discount: "16% Off",
        image: require("../assets/images/product_ghee.png"),
        images: [
          require("../assets/images/product_ghee.png"),
          require("../assets/images/product_ghee.png")
        ],
        category: "Ghee",
        isOrganic: true,
        nextAvailable: "Daily",
        quantity: 0
      },
      {
        id: "g3",
        name: "Buffalo Ghee",
        size: "500 ml",
        price: 480,
        originalPrice: 580,
        vipPrice: 420,
        discount: "17% Off",
        image: require("../assets/images/product_ghee.png"),
        images: [
          require("../assets/images/product_ghee.png"),
          require("../assets/images/product_ghee.png")
        ],
        category: "Ghee",
        isOrganic: false,
        nextAvailable: "Daily",
        quantity: 0
      }
    ]
  }
};

export default productsData;
