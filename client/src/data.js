import { TbPool } from "react-icons/tb";
import {
  MdOutlineVilla,
  MdOutlineBedroomParent,
  MdApartment,
  MdBalcony,
  MdYard,
} from "react-icons/md";
import {
  BsSnow,
  BsFillHouseHeartFill,
} from "react-icons/bs";
import { PiBathtubFill } from "react-icons/pi";
import { FaShower } from "react-icons/fa";
import { GiHeatHaze } from "react-icons/gi";
import { BiWifi, BiWorld } from "react-icons/bi";
import { AiFillCar } from "react-icons/ai";

export const categories = [
  {
    label: "All",
    icon: <BiWorld />,
  },
  {
    img: "assets/room.jpg",
    label: "Rooms",
    icon: <MdOutlineBedroomParent />,
    description: "This is for how wants rooms on rent or buy",
  },
  {
    img: "assets/apartment.jpeg",
    label: "Apartments",
    icon: <MdApartment />,
    description: "This property is has apartment!",
  },
  {
    img: "assets/modern_cat.webp",
    label: "Villa",
    icon: <MdOutlineVilla />,
    description: "This property is modern!",
  },
  {
    img: "assets/home.jpg",
    label: "House",
    icon: <BsFillHouseHeartFill />,
    description: "This property is in the Home!",
  },
  {
    img: "assets/pool_cat.jpg",
    label: "Best Banglows",
    icon: <TbPool />,
    description: "This is property has a Banglow!",
  }
];

export const types = [
  {
    name: "Residential",
    description: "Property will be provided to the residence only not for business",
  },
  {
    name: "Commercial",
    description:
      "Property will be provided for business related things",
  }
];
export const buyOrSellData = [
  {
    name: "Rent",
    description:
      "Rent your property monthly or yearly rent",
  },
  {
    name: "Sell",
    description:
      "Sell the property permanantly",
  }
]

export const facilities = [
  {
    name: "Bath tub",
    icon: <PiBathtubFill />,
  },
  {
    name: "Outdoor shower",
    icon: <FaShower />,
  },
  {
    name: "Air Conditioning",
    icon: <BsSnow />,
  },
  {
    name: "Heating",
    icon: <GiHeatHaze />,
  },
  {
    name: "Wifi",
    icon: <BiWifi />,
  }, 
  {
    name: "Balcony",
    icon: <MdBalcony />,
  },
  {
    name: "Garden",
    icon: <MdYard />,
  },
  {
    name: "Parking",
    icon: <AiFillCar />,
  }
];

export const faqForContact = [
  {
    indx: 1,
    question: "What is Premium Chat?",
    answer: "Premium Chat is a real-time communication feature allowing you to instantly reach property owners for immediate queries and information exchange."
  },
  {
    indx: 2,
    question: "Is my contact information secure?",
    answer: "Yes, your information remains confidential and is only shared with the property owner through secured channels."
  },
  {
    indx: 3,
    question: "Can I contact the owner if I'm not a premium member?",
    answer: "Non-premium members can use the email or phone reveal options, with certain limitations on immediate chat availability."
  },
  {
    indx: 4,
    question: "What benefits do premium members receive?",
    answer: "Premium members enjoy instant access to chat, priority response times, and exclusive property listings."
  },
  {
    indx: 5,
    question: "How do I upgrade to a premium membership?",
    answer: "You can upgrade to a premium membership through your account settings or by visiting the subscription page on our website."
  },
  {
    indx: 6,
    question: "What if I have trouble contacting a property owner?",
    answer: "If you're having trouble, please reach out to our support team, and we'll assist you in facilitating communication."
  },
  {
    indx: 7,
    question: "Can I save my favorite properties?",
    answer: "Yes, you can save your favorite properties to your profile for easy access later."
  },
  {
    indx: 8,
    question: "How can I report inappropriate behavior?",
    answer: "If you encounter any inappropriate behavior, please report it through our platform's reporting feature, and we will take appropriate action."
  },
  {
    indx: 9,
    question: "What should I do if I forget my password?",
    answer: "If you forget your password, use the 'Forgot Password?' link on the login page to reset it."
  },
  {
    indx: 10,
    question: "Are there any fees associated with using the platform?",
    answer: "While basic usage is free, certain premium features may incur fees. Please refer to our pricing page for detailed information."
  }
];

export const plans = [
  {
    name: 'Basic',
    price: '$29/month',
    features: [
      'Access to basic listings',
      'Email support',
      'Limited property saves (5 per month)',
      'Standard customer service',
      'Basic property alerts'
    ],
  },
  {
    name: 'Premium',
    price: '$59/month',
    features: [
      'Access to premium listings',
      'Priority email support',
      'Unlimited property saves',
      'Advanced customer support',
      'Priority property alerts',
      'Featured agent services'
    ],
    popular: true,
  },
  {
    name: 'Pro',
    price: '$99/month',
    features: [
      'All Premium features',
      'Direct communication with property owners',
      'Dedicated account manager',
      'Monthly insights and trends report',
      'Personalized recommendations',
      'Early access to exclusive listings'
    ],
  }
];
