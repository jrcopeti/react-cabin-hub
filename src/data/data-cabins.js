import { supabaseUrl } from "../services/supabase";

const imageUrl = `${supabaseUrl}/storage/v1/object/public/cabin-images/`;

export const cabins = [
  {
    name: "001",
    maxCapacity: 2,
    regularPrice: 250,
    discount: 0,
    image: imageUrl + "cabin-001.jpg",
    description:
      "Discover the ultimate luxury getaway for couples in the cozy wooden cabin 001. Nestled in a picturesque forest, this stunning cabin offers a secluded and intimate retreat. Inside, enjoy modern high-quality wood interiors, a comfortable seating area, a fireplace and a fully-equipped kitchen. The plush king-size bed, dressed in fine linens guarantees a peaceful nights sleep. Relax in the spa-like shower and unwind on the private deck with hot tub.",
  },
  {
    name: "002",
    maxCapacity: 2,
    regularPrice: 350,
    discount: 25,
    image: imageUrl + "cabin-002.jpg",
    description:
      "Escape to the serenity of nature and indulge in luxury in our cozy cabin 002. Perfect for couples, this cabin offers a secluded and intimate retreat in the heart of a picturesque forest. Inside, you will find warm and inviting interiors crafted from high-quality wood, a comfortable living area, a fireplace and a fully-equipped kitchen. The luxurious bedroom features a plush king-size bed and spa-like shower. Relax on the private deck with hot tub and take in the beauty of nature.",
  },
  {
    name: "003",
    maxCapacity: 4,
    regularPrice: 300,
    discount: 0,
    image: imageUrl + "cabin-003.jpg",
    description:
      "Experience luxury family living in our medium-sized wooden cabin 003. Perfect for families of up to 4 people, this cabin offers a comfortable and inviting space with all modern amenities. Inside, you will find warm and inviting interiors crafted from high-quality wood, a comfortable living area, a fireplace, and a fully-equipped kitchen. The bedrooms feature plush beds and spa-like bathrooms. The cabin has a private deck with a hot tub and outdoor seating area, perfect for taking in the natural surroundings.",
  },
  {
    name: "004",
    maxCapacity: 4,
    regularPrice: 500,
    discount: 50,
    image: imageUrl + "cabin-004.jpg",
    description:
      "Indulge in the ultimate luxury family vacation in this medium-sized cabin 004. Designed for families of up to 4, this cabin offers a sumptuous retreat for the discerning traveler. Inside, the cabin boasts of opulent interiors crafted from the finest quality wood, a comfortable living area, a fireplace, and a fully-equipped gourmet kitchen. The bedrooms are adorned with plush beds and spa-inspired en-suite bathrooms. Step outside to your private deck and soak in the natural surroundings while relaxing in your own hot tub.",
  },
  {
    name: "005",
    maxCapacity: 6,
    regularPrice: 350,
    discount: 0,
    image: imageUrl + "cabin-005.jpg",
    description:
      "Enjoy a comfortable and cozy getaway with your group or family in our spacious cabin 005. Designed to accommodate up to 6 people, this cabin offers a secluded retreat in the heart of nature. Inside, the cabin features warm and inviting interiors crafted from quality wood, a living area with fireplace, and a fully-equipped kitchen. The bedrooms are comfortable and equipped with en-suite bathrooms. Step outside to your private deck and take in the natural surroundings while relaxing in your own hot tub.",
  },
  {
    name: "006",
    maxCapacity: 6,
    regularPrice: 800,
    discount: 100,
    image: imageUrl + "cabin-006.jpg",
    description:
      "Experience the epitome of luxury with your group or family in our spacious wooden cabin 006. Designed to comfortably accommodate up to 6 people, this cabin offers a lavish retreat in the heart of nature. Inside, the cabin features opulent interiors crafted from premium wood, a grand living area with fireplace, and a fully-equipped gourmet kitchen. The bedrooms are adorned with plush beds and spa-like en-suite bathrooms. Step outside to your private deck and soak in the natural surroundings while relaxing in your own hot tub.",
  },
  {
    name: "007",
    maxCapacity: 8,
    regularPrice: 600,
    discount: 100,
    image: imageUrl + "cabin-007.jpg",
    description:
      "Accommodate your large group or multiple families in the spacious and grand wooden cabin 007. Designed to comfortably fit up to 8 people, this cabin offers a secluded retreat in the heart of beautiful forests and mountains. Inside, the cabin features warm and inviting interiors crafted from quality wood, multiple living areas with fireplace, and a fully-equipped kitchen. The bedrooms are comfortable and equipped with en-suite bathrooms. The cabin has a private deck with a hot tub and outdoor seating area, perfect for taking in the natural surroundings.",
  },
  {
    name: "008",
    maxCapacity: 10,
    regularPrice: 1400,
    discount: 0,
    image: imageUrl + "cabin-008.jpg",
    description:
      "Experience the epitome of luxury and grandeur with your large group or multiple families in our grand cabin 008. This cabin offers a lavish retreat that caters to all your needs and desires. The cabin features an opulent design and boasts of high-end finishes, intricate details and the finest quality wood throughout. Inside, the cabin features multiple grand living areas with fireplaces, a formal dining area, and a gourmet kitchen that is a chef's dream. The bedrooms are designed for ultimate comfort and luxury, with plush beds and en-suite spa-inspired bathrooms. Step outside and immerse yourself in the beauty of nature from your private deck, featuring a luxurious hot tub and ample seating areas for ultimate relaxation and enjoyment.",
  },
  {
    name: "009",
    maxCapacity: 4,
    regularPrice: 450,
    discount: 50,
    image: imageUrl + "cabin-009.jpg",
    description:
      "Nestled amidst lush greenery, cabin 009 offers a serene escape for families or small groups. This cabin blends rustic charm with modern amenities, featuring a spacious interior with a cozy fireplace, a well-equipped kitchen, and comfortable bedrooms with en-suite bathrooms. The outdoor deck with a hot tub provides the perfect spot for relaxation while enjoying the surrounding nature.",
  },
  {
    name: "010",
    maxCapacity: 2,
    regularPrice: 300,
    discount: 0,
    image: imageUrl + "cabin-010.jpg",
    description:
      "Cabin 010 is a romantic haven for couples seeking a private retreat. This intimate cabin boasts elegant woodwork, a plush king-sized bed, and a luxurious bathroom with a spa-like shower. The cabin's highlight is its secluded deck with a hot tub, offering breathtaking views of the forest and starry night skies.",
  },
  {
    name: "011",
    maxCapacity: 6,
    regularPrice: 700,
    discount: 100,
    image: imageUrl + "cabin-011.jpg",
    description:
      "Perfect for larger families or groups, cabin 011 offers a spacious and welcoming environment. With its large living area, fireplace, fully-equipped kitchen, and multiple bedrooms with en-suite bathrooms, everyone can find their own space. The expansive deck with a hot tub overlooks the forest, providing a tranquil setting for relaxation and socializing.",
  },
  {
    name: "012",
    maxCapacity: 8,
    regularPrice: 900,
    discount: 150,
    image: imageUrl + "cabin-012.jpg",
    description:
      "Cabin 012 is a masterpiece of luxury and design, accommodating large groups with its generous space and high-end amenities. The cabin features an open-plan living area with a gourmet kitchen and dining space, leading out to a magnificent deck with a hot tub and panoramic views. Each bedroom is a retreat on its own, offering privacy and comfort with plush bedding and spa-inspired bathrooms.",
  },
  {
    name: "013",
    maxCapacity: 3,
    regularPrice: 400,
    discount: 0,
    image: imageUrl + "cabin-013.jpg",
    description:
      "Ideal for small families or a group of friends, cabin 013 offers a cozy and inviting atmosphere. This cabin combines rustic charm with modern conveniences, featuring a comfortable living area, a fully-equipped kitchen, and bedrooms with en-suite bathrooms. The outdoor deck with a hot tub provides a secluded spot to unwind and enjoy the natural surroundings.",
  },
  {
    name: "014",
    maxCapacity: 5,
    regularPrice: 550,
    discount: 75,
    image: imageUrl + "cabin-014.jpg",
    description:
      "Cabin 014 is a blend of comfort and elegance, designed for medium-sized groups seeking a memorable stay. The cabin features stylish interiors with a spacious living room, a fireplace, a well-appointed kitchen, and comfortable bedrooms with private bathrooms. The highlight is the deck with a hot tub, offering serene views of the forest.",
  },
  {
    name: "015",
    maxCapacity: 7,
    regularPrice: 650,
    discount: 0,
    image: imageUrl + "cabin-015.jpg",
    description:
      "Cabin 015 provides a spacious and luxurious setting for medium to large groups. The cabin boasts an expansive living area with high ceilings, a modern kitchen, and multiple bedrooms, each with their own bathroom. The large windows and outdoor deck with a hot tub allow guests to fully immerse themselves in the beauty of the surrounding nature.",
  },
  {
    name: "016",
    maxCapacity: 4,
    regularPrice: 500,
    discount: 50,
    image: imageUrl + "cabin-016.jpg",
    description:
      "Cabin 016 offers a unique and cozy getaway for families or small groups. The cabin’s design emphasizes comfort and warmth, featuring a charming living area with a fireplace, a kitchen equipped with modern amenities, and bedrooms with en-suite bathrooms. The private deck with a hot tub is the perfect place to relax and connect with nature.",
  },
  {
    name: "017",
    maxCapacity: 2,
    regularPrice: 350,
    discount: 25,
    image: imageUrl + "cabin-017.jpg",
    description: "Cabin 017 is the ultimate romantic escape, offering privacy and luxury for couples. The cabin features a beautifully designed space with a king-sized bed, a spa-like bathroom, and huge outside deck with a hot tub, perfect for stargazing and enjoying the natural surroundings."
  },
  {
    name: "018",
    maxCapacity: 6,
    regularPrice: 750,
    discount: 100,
    image: imageUrl + "cabin-018.jpg",
    description:
      "Cabin 018 provides a perfect blend of rustic charm and modern luxury, making it an ideal choice for families or groups seeking a memorable escape. The cabin boasts a spacious layout with a stunning living area, complete with a stone fireplace, a state-of-the-art kitchen, and comfortable bedrooms, each with access to en-suite bathrooms. The expansive deck features a hot tub and ample seating, offering spectacular views of the surrounding wilderness."
  },
  {
    name: "019",
    maxCapacity: 8,
    regularPrice: 1200,
    discount: 200,
    image: imageUrl + "cabin-019.jpg",
    description:
      "Discover unparalleled luxury in Cabin 019, a magnificent retreat designed to accommodate large groups or families in absolute comfort. This cabin stands out with its exquisite architecture, featuring vast open spaces, high ceilings, and wall-to-wall windows that flood the interior with natural light. The lavish living areas, gourmet kitchen, and sumptuous bedrooms with spa-like bathrooms ensure a stay of unmatched luxury. Outside, the sprawling deck with a hot tub offers a private oasis amidst the tranquil beauty of the forest."
  },
  {
    name: "020",
    maxCapacity: 4,
    regularPrice: 600,
    discount: 0,
    image: imageUrl + "cabin-020.jpg",
    description:
      "Cabin 020 is a cozy haven nestled in the heart of the wilderness, offering an intimate setting for small families or couples. This cabin's charming interior features warm wood finishes, a cozy fireplace, a fully-equipped kitchen, and comfortable bedrooms with lovely views. The outdoor living space includes a private deck with a hot tub, where guests can relax and enjoy the serene environment. Cabin 020 combines the best of rustic living with modern comforts, creating an idyllic retreat from the hustle and bustle of everyday life."
  }
];
