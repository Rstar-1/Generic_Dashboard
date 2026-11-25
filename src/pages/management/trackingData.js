// Top Business Countries & Global Supply Chain Hub Locations
export const TOP_BUSINESS_COUNTRIES = [
  {
    country: "India",
    latitude: 20.5937,
    longitude: 78.9629,
    hub: { city: "Mumbai", latitude: 19.076, longitude: 72.8777 },
  },
];

// Comprehensive Tracking Data: India -> 5 Top Business States -> 8 Cities Each -> 10 Suppliers & 10 Vendors Each
export const INITIAL_TRACKING_DATA = [
  {
    country: "India",
    state: "India",
    latitude: 20.5937,
    longitude: 78.9629,
    hub: {
      city: "Mumbai",
      latitude: 19.076,
      longitude: 72.8777,
    },
    states: [
  {
    "state": "Maharashtra",
    "latitude": 19.7515,
    "longitude": 75.7139,
    "hub": {
      "city": "Mumbai",
      "latitude": 19.076,
      "longitude": 72.8777
    },
    "cities": [
      {
        "city": "Mumbai",
        "latitude": 19.076,
        "longitude": 72.8777,
        "suppliers": [
          {
            "id": "SUP-MUM-001",
            "name": "MAYUR COMPUTERS",
            "latitude": 19.076,
            "longitude": 72.8777,
            "location": "Dadar East, Mumbai"
          },
          {
            "id": "SUP-MUM-002",
            "name": "Jet Cartridge (I) Private Limited",
            "latitude": 19.076,
            "longitude": 72.8777,
            "location": "Dadar West, Mumbai"
          },
          {
            "id": "SUP-MUM-003",
            "name": "Hi-Tech Office Solutions",
            "latitude": 19.076,
            "longitude": 72.8777,
            "location": "Matunga, Mumbai"
          },
          {
            "id": "SUP-MUM-004",
            "name": "ABM Enterprises",
            "latitude": 19.076,
            "longitude": 72.8777,
            "location": "Fort, Mumbai"
          },
          {
            "id": "SUP-MUM-005",
            "name": "Ashapura Office Solutions",
            "latitude": 19.076,
            "longitude": 72.8777,
            "location": "Lower Parel, Mumbai"
          },
          {
            "id": "SUP-MUM-006",
            "name": "Cartridge World",
            "latitude": 19.076,
            "longitude": 72.8777,
            "location": "Andheri East, Mumbai"
          },
          {
            "id": "SUP-MUM-007",
            "name": "SPT-Star Print Technology",
            "latitude": 19.076,
            "longitude": 72.8777,
            "location": "Bandra West, Mumbai"
          },
          {
            "id": "SUP-MUM-008",
            "name": "Cartridge King",
            "latitude": 19.076,
            "longitude": 72.8777,
            "location": "Kurla, Mumbai"
          },
          {
            "id": "SUP-MUM-009",
            "name": "Print Tonic Technologies",
            "latitude": 19.076,
            "longitude": 72.8777,
            "location": "BKC, Mumbai"
          },
          {
            "id": "SUP-MUM-010",
            "name": "AquaPrint Enterprises",
            "latitude": 19.076,
            "longitude": 72.8777,
            "location": "Nariman Point, Mumbai"
          }
        ],
        "vendors": [
          {
            "id": "VEN-MUM-001",
            "name": "MAYUR COMPUTERS",
            "latitude": 19.076,
            "longitude": 72.8777,
            "location": "Dadar East, Mumbai"
          },
          {
            "id": "VEN-MUM-002",
            "name": "LT Online Store",
            "latitude": 19.076,
            "longitude": 72.8777,
            "location": "Dadar West, Mumbai"
          },
          {
            "id": "VEN-MUM-003",
            "name": "Radha Enterprises",
            "latitude": 19.076,
            "longitude": 72.8777,
            "location": "Matunga, Mumbai"
          },
          {
            "id": "VEN-MUM-004",
            "name": "Zigma Toner",
            "latitude": 19.076,
            "longitude": 72.8777,
            "location": "Fort, Mumbai"
          },
          {
            "id": "VEN-MUM-005",
            "name": "Cartridge Point",
            "latitude": 19.076,
            "longitude": 72.8777,
            "location": "Lower Parel, Mumbai"
          },
          {
            "id": "VEN-MUM-006",
            "name": "Series Enterprises",
            "latitude": 19.076,
            "longitude": 72.8777,
            "location": "Andheri East, Mumbai"
          },
          {
            "id": "VEN-MUM-007",
            "name": "We Tech Print Solution",
            "latitude": 19.076,
            "longitude": 72.8777,
            "location": "Bandra West, Mumbai"
          },
          {
            "id": "VEN-MUM-008",
            "name": "Computer Consumables Company",
            "latitude": 19.076,
            "longitude": 72.8777,
            "location": "Kurla, Mumbai"
          },
          {
            "id": "VEN-MUM-009",
            "name": "Navrang Enterprises",
            "latitude": 19.076,
            "longitude": 72.8777,
            "location": "BKC, Mumbai"
          },
          {
            "id": "VEN-MUM-010",
            "name": "Toner Cartridge Refilling",
            "latitude": 19.076,
            "longitude": 72.8777,
            "location": "Nariman Point, Mumbai"
          }
        ]
      },
      {
        "city": "Pune",
        "latitude": 18.5204,
        "longitude": 73.8567,
        "suppliers": [
          {
            "id": "SUP-PUN-001",
            "name": "TechMatrix Systems",
            "latitude": 18.5204,
            "longitude": 73.8567,
            "location": "Shivajinagar, Pune"
          },
          {
            "id": "SUP-PUN-002",
            "name": "Sahyadri Paper & Print",
            "latitude": 18.5204,
            "longitude": 73.8567,
            "location": "Kothrud, Pune"
          },
          {
            "id": "SUP-PUN-003",
            "name": "Horizon Toner Mart",
            "latitude": 18.5204,
            "longitude": 73.8567,
            "location": "Hinjawadi, Pune"
          },
          {
            "id": "SUP-PUN-004",
            "name": "Pune Cartridge Clinic",
            "latitude": 18.5204,
            "longitude": 73.8567,
            "location": "Viman Nagar, Pune"
          },
          {
            "id": "SUP-PUN-005",
            "name": "Deccan Office Supplies",
            "latitude": 18.5204,
            "longitude": 73.8567,
            "location": "FC Road, Pune"
          },
          {
            "id": "SUP-PUN-006",
            "name": "Apex Stationery & Consumables",
            "latitude": 18.5204,
            "longitude": 73.8567,
            "location": "Hadapsar, Pune"
          },
          {
            "id": "SUP-PUN-007",
            "name": "Omkar Imaging Hub",
            "latitude": 18.5204,
            "longitude": 73.8567,
            "location": "Baner, Pune"
          },
          {
            "id": "SUP-PUN-008",
            "name": "PrintCraft Technologies",
            "latitude": 18.5204,
            "longitude": 73.8567,
            "location": "Magarpatta, Pune"
          },
          {
            "id": "SUP-PUN-009",
            "name": "Swastik Commercials",
            "latitude": 18.5204,
            "longitude": 73.8567,
            "location": "Swargate, Pune"
          },
          {
            "id": "SUP-PUN-010",
            "name": "Alpha Tech Logistics",
            "latitude": 18.5204,
            "longitude": 73.8567,
            "location": "Kalyani Nagar, Pune"
          }
        ],
        "vendors": [
          {
            "id": "VEN-PUN-001",
            "name": "Global Paper Solutions",
            "latitude": 18.5204,
            "longitude": 73.8567,
            "location": "Shivajinagar, Pune"
          },
          {
            "id": "VEN-PUN-002",
            "name": "Shanti Print Mart",
            "latitude": 18.5204,
            "longitude": 73.8567,
            "location": "Kothrud, Pune"
          },
          {
            "id": "VEN-PUN-003",
            "name": "Kothrud Digital Express",
            "latitude": 18.5204,
            "longitude": 73.8567,
            "location": "Hinjawadi, Pune"
          },
          {
            "id": "VEN-PUN-004",
            "name": "Infotech Consumables",
            "latitude": 18.5204,
            "longitude": 73.8567,
            "location": "Viman Nagar, Pune"
          },
          {
            "id": "VEN-PUN-005",
            "name": "Sterling Paper Traders",
            "latitude": 18.5204,
            "longitude": 73.8567,
            "location": "FC Road, Pune"
          },
          {
            "id": "VEN-PUN-006",
            "name": "Synergy Toner Supplies",
            "latitude": 18.5204,
            "longitude": 73.8567,
            "location": "Hadapsar, Pune"
          },
          {
            "id": "VEN-PUN-007",
            "name": "Matrix Corporate Needs",
            "latitude": 18.5204,
            "longitude": 73.8567,
            "location": "Baner, Pune"
          },
          {
            "id": "VEN-PUN-008",
            "name": "Phoenix Industrial Goods",
            "latitude": 18.5204,
            "longitude": 73.8567,
            "location": "Magarpatta, Pune"
          },
          {
            "id": "VEN-PUN-009",
            "name": "Vardhman Print Pack",
            "latitude": 18.5204,
            "longitude": 73.8567,
            "location": "Swargate, Pune"
          },
          {
            "id": "VEN-PUN-010",
            "name": "United Trade Network",
            "latitude": 18.5204,
            "longitude": 73.8567,
            "location": "Kalyani Nagar, Pune"
          }
        ]
      },
      {
        "city": "Nagpur",
        "latitude": 21.1458,
        "longitude": 79.0882,
        "suppliers": [
          {
            "id": "SUP-NAG-001",
            "name": "Vidarbha Office Depot",
            "latitude": 21.1458,
            "longitude": 79.0882,
            "location": "Sitabuldi, Nagpur"
          },
          {
            "id": "SUP-NAG-002",
            "name": "Nagpur Toner Care",
            "latitude": 21.1458,
            "longitude": 79.0882,
            "location": "Dharampeth, Nagpur"
          },
          {
            "id": "SUP-NAG-003",
            "name": "Central India Stationers",
            "latitude": 21.1458,
            "longitude": 79.0882,
            "location": "MIDC Hingna, Nagpur"
          },
          {
            "id": "SUP-NAG-004",
            "name": "Orange City Print Supplies",
            "latitude": 21.1458,
            "longitude": 79.0882,
            "location": "Ramdaspeth, Nagpur"
          },
          {
            "id": "SUP-NAG-005",
            "name": "Khandelwal Enterprises",
            "latitude": 21.1458,
            "longitude": 79.0882,
            "location": "Gandhibagh, Nagpur"
          },
          {
            "id": "SUP-NAG-006",
            "name": "Shree Ram Tech Mart",
            "latitude": 21.1458,
            "longitude": 79.0882,
            "location": "Wardha Road, Nagpur"
          },
          {
            "id": "SUP-NAG-007",
            "name": "Rajesh Infotech Nagpur",
            "latitude": 21.1458,
            "longitude": 79.0882,
            "location": "Itwari, Nagpur"
          },
          {
            "id": "SUP-NAG-008",
            "name": "Anand Office Solutions",
            "latitude": 21.1458,
            "longitude": 79.0882,
            "location": "Sadar, Nagpur"
          },
          {
            "id": "SUP-NAG-009",
            "name": "Mahalaxmi Paper House",
            "latitude": 21.1458,
            "longitude": 79.0882,
            "location": "Civil Lines, Nagpur"
          },
          {
            "id": "SUP-NAG-010",
            "name": "Pioneer Digital Consumables",
            "latitude": 21.1458,
            "longitude": 79.0882,
            "location": "Manish Nagar, Nagpur"
          }
        ],
        "vendors": [
          {
            "id": "VEN-NAG-001",
            "name": "Sitabuldi Trade Link",
            "latitude": 21.1458,
            "longitude": 79.0882,
            "location": "Sitabuldi, Nagpur"
          },
          {
            "id": "VEN-NAG-002",
            "name": "Nagpur Wholesale Traders",
            "latitude": 21.1458,
            "longitude": 79.0882,
            "location": "Dharampeth, Nagpur"
          },
          {
            "id": "VEN-NAG-003",
            "name": "Vidarbha Commercial Hub",
            "latitude": 21.1458,
            "longitude": 79.0882,
            "location": "MIDC Hingna, Nagpur"
          },
          {
            "id": "VEN-NAG-004",
            "name": "Ambika Toner World",
            "latitude": 21.1458,
            "longitude": 79.0882,
            "location": "Ramdaspeth, Nagpur"
          },
          {
            "id": "VEN-NAG-005",
            "name": "Goyal Industrial Agency",
            "latitude": 21.1458,
            "longitude": 79.0882,
            "location": "Gandhibagh, Nagpur"
          },
          {
            "id": "VEN-NAG-006",
            "name": "Express Office Mart",
            "latitude": 21.1458,
            "longitude": 79.0882,
            "location": "Wardha Road, Nagpur"
          },
          {
            "id": "VEN-NAG-007",
            "name": "Sai Ram Cartridges",
            "latitude": 21.1458,
            "longitude": 79.0882,
            "location": "Itwari, Nagpur"
          },
          {
            "id": "VEN-NAG-008",
            "name": "Lotus Stationery Hub",
            "latitude": 21.1458,
            "longitude": 79.0882,
            "location": "Sadar, Nagpur"
          },
          {
            "id": "VEN-NAG-009",
            "name": "Modern Print Distro",
            "latitude": 21.1458,
            "longitude": 79.0882,
            "location": "Civil Lines, Nagpur"
          },
          {
            "id": "VEN-NAG-010",
            "name": "Bharat Business Supply",
            "latitude": 21.1458,
            "longitude": 79.0882,
            "location": "Manish Nagar, Nagpur"
          }
        ]
      },
      {
        "city": "Nashik",
        "latitude": 19.9975,
        "longitude": 73.7898,
        "suppliers": [
          {
            "id": "SUP-NAS-001",
            "name": "Godavari Tech Supplies",
            "latitude": 19.9975,
            "longitude": 73.7898,
            "location": "College Road, Nashik"
          },
          {
            "id": "SUP-NAS-002",
            "name": "Nashik Cartridge Hub",
            "latitude": 19.9975,
            "longitude": 73.7898,
            "location": "Ambad MIDC, Nashik"
          },
          {
            "id": "SUP-NAS-003",
            "name": "Ambad Industrial Consumables",
            "latitude": 19.9975,
            "longitude": 73.7898,
            "location": "Satpur MIDC, Nashik"
          },
          {
            "id": "SUP-NAS-004",
            "name": "Panchavati Paper Traders",
            "latitude": 19.9975,
            "longitude": 73.7898,
            "location": "Panchavati, Nashik"
          },
          {
            "id": "SUP-NAS-005",
            "name": "Surya Office Dynamics",
            "latitude": 19.9975,
            "longitude": 73.7898,
            "location": "Gangapur Road, Nashik"
          },
          {
            "id": "SUP-NAS-006",
            "name": "Maratha Stationery World",
            "latitude": 19.9975,
            "longitude": 73.7898,
            "location": "Dwarka, Nashik"
          },
          {
            "id": "SUP-NAS-007",
            "name": "Kumbh City Print Care",
            "latitude": 19.9975,
            "longitude": 73.7898,
            "location": "Indira Nagar, Nashik"
          },
          {
            "id": "SUP-NAS-008",
            "name": "Silver Oak Technologies",
            "latitude": 19.9975,
            "longitude": 73.7898,
            "location": "CIDCO, Nashik"
          },
          {
            "id": "SUP-NAS-009",
            "name": "Sai Krupa Toner Depot",
            "latitude": 19.9975,
            "longitude": 73.7898,
            "location": "Nashik Road, Nashik"
          },
          {
            "id": "SUP-NAS-010",
            "name": "Dynamic Commercial Solutions",
            "latitude": 19.9975,
            "longitude": 73.7898,
            "location": "Mumbai Naka, Nashik"
          }
        ],
        "vendors": [
          {
            "id": "VEN-NAS-001",
            "name": "Satpur Trade Agency",
            "latitude": 19.9975,
            "longitude": 73.7898,
            "location": "College Road, Nashik"
          },
          {
            "id": "VEN-NAS-002",
            "name": "Nashik Central Mart",
            "latitude": 19.9975,
            "longitude": 73.7898,
            "location": "Ambad MIDC, Nashik"
          },
          {
            "id": "VEN-NAS-003",
            "name": "Apex Industrial Agency",
            "latitude": 19.9975,
            "longitude": 73.7898,
            "location": "Satpur MIDC, Nashik"
          },
          {
            "id": "VEN-NAS-004",
            "name": "Sai Samarth Print Solutions",
            "latitude": 19.9975,
            "longitude": 73.7898,
            "location": "Panchavati, Nashik"
          },
          {
            "id": "VEN-NAS-005",
            "name": "Trimurti Toner Center",
            "latitude": 19.9975,
            "longitude": 73.7898,
            "location": "Gangapur Road, Nashik"
          },
          {
            "id": "VEN-NAS-006",
            "name": "Mahavir Office Supply",
            "latitude": 19.9975,
            "longitude": 73.7898,
            "location": "Dwarka, Nashik"
          },
          {
            "id": "VEN-NAS-007",
            "name": "Shree Ganesh Traders",
            "latitude": 19.9975,
            "longitude": 73.7898,
            "location": "Indira Nagar, Nashik"
          },
          {
            "id": "VEN-NAS-008",
            "name": "Kiran Computer Stationery",
            "latitude": 19.9975,
            "longitude": 73.7898,
            "location": "CIDCO, Nashik"
          },
          {
            "id": "VEN-NAS-009",
            "name": "Prabhat Print Services",
            "latitude": 19.9975,
            "longitude": 73.7898,
            "location": "Nashik Road, Nashik"
          },
          {
            "id": "VEN-NAS-010",
            "name": "Vanguard Supply Line",
            "latitude": 19.9975,
            "longitude": 73.7898,
            "location": "Mumbai Naka, Nashik"
          }
        ]
      },
      {
        "city": "Chhatrapati Sambhajinagar",
        "latitude": 19.8762,
        "longitude": 75.3433,
        "suppliers": [
          {
            "id": "SUP-AUR-001",
            "name": "Ajanta Print Solutions",
            "latitude": 19.8762,
            "longitude": 75.3433,
            "location": "Waluj MIDC, Chhatrapati Sambhajinagar"
          },
          {
            "id": "SUP-AUR-002",
            "name": "Ellora Tech Consumables",
            "latitude": 19.8762,
            "longitude": 75.3433,
            "location": "Chikalthana MIDC, Chhatrapati Sambhajinagar"
          },
          {
            "id": "SUP-AUR-003",
            "name": "Marathwada Toner Depot",
            "latitude": 19.8762,
            "longitude": 75.3433,
            "location": "CIDCO, Chhatrapati Sambhajinagar"
          },
          {
            "id": "SUP-AUR-004",
            "name": "Waluj Industrial Supplies",
            "latitude": 19.8762,
            "longitude": 75.3433,
            "location": "Kranti Chowk, Chhatrapati Sambhajinagar"
          },
          {
            "id": "SUP-AUR-005",
            "name": "Chikalthana Cartridge Care",
            "latitude": 19.8762,
            "longitude": 75.3433,
            "location": "Railway Station Road, Chhatrapati Sambhajinagar"
          },
          {
            "id": "SUP-AUR-006",
            "name": "Chhatrapati Business Hub",
            "latitude": 19.8762,
            "longitude": 75.3433,
            "location": "Jalna Road, Chhatrapati Sambhajinagar"
          },
          {
            "id": "SUP-AUR-007",
            "name": "Devgiri Office Systems",
            "latitude": 19.8762,
            "longitude": 75.3433,
            "location": "Samarth Nagar, Chhatrapati Sambhajinagar"
          },
          {
            "id": "SUP-AUR-008",
            "name": "Aurangabad Paper Mart",
            "latitude": 19.8762,
            "longitude": 75.3433,
            "location": "Shendra MIDC, Chhatrapati Sambhajinagar"
          },
          {
            "id": "SUP-AUR-009",
            "name": "Kailash Stationery Works",
            "latitude": 19.8762,
            "longitude": 75.3433,
            "location": "Nirala Bazar, Chhatrapati Sambhajinagar"
          },
          {
            "id": "SUP-AUR-010",
            "name": "Deccan Commercial Distro",
            "latitude": 19.8762,
            "longitude": 75.3433,
            "location": "Shahgunj, Chhatrapati Sambhajinagar"
          }
        ],
        "vendors": [
          {
            "id": "VEN-AUR-001",
            "name": "Kranti Trade Partners",
            "latitude": 19.8762,
            "longitude": 75.3433,
            "location": "Waluj MIDC, Chhatrapati Sambhajinagar"
          },
          {
            "id": "VEN-AUR-002",
            "name": "Marathwada Business Link",
            "latitude": 19.8762,
            "longitude": 75.3433,
            "location": "Chikalthana MIDC, Chhatrapati Sambhajinagar"
          },
          {
            "id": "VEN-AUR-003",
            "name": "CIDCO Toner World",
            "latitude": 19.8762,
            "longitude": 75.3433,
            "location": "CIDCO, Chhatrapati Sambhajinagar"
          },
          {
            "id": "VEN-AUR-004",
            "name": "Ajanta Commercial Corp",
            "latitude": 19.8762,
            "longitude": 75.3433,
            "location": "Kranti Chowk, Chhatrapati Sambhajinagar"
          },
          {
            "id": "VEN-AUR-005",
            "name": "Sheetal Office Products",
            "latitude": 19.8762,
            "longitude": 75.3433,
            "location": "Railway Station Road, Chhatrapati Sambhajinagar"
          },
          {
            "id": "VEN-AUR-006",
            "name": "Guru Kripa Stationery",
            "latitude": 19.8762,
            "longitude": 75.3433,
            "location": "Jalna Road, Chhatrapati Sambhajinagar"
          },
          {
            "id": "VEN-AUR-007",
            "name": "Prime Point Consumables",
            "latitude": 19.8762,
            "longitude": 75.3433,
            "location": "Samarth Nagar, Chhatrapati Sambhajinagar"
          },
          {
            "id": "VEN-AUR-008",
            "name": "Imperial Tech Trade",
            "latitude": 19.8762,
            "longitude": 75.3433,
            "location": "Shendra MIDC, Chhatrapati Sambhajinagar"
          },
          {
            "id": "VEN-AUR-009",
            "name": "Balaji Paper Agencies",
            "latitude": 19.8762,
            "longitude": 75.3433,
            "location": "Nirala Bazar, Chhatrapati Sambhajinagar"
          },
          {
            "id": "VEN-AUR-010",
            "name": "Omkar Print Solutions",
            "latitude": 19.8762,
            "longitude": 75.3433,
            "location": "Shahgunj, Chhatrapati Sambhajinagar"
          }
        ]
      },
      {
        "city": "Thane",
        "latitude": 19.2183,
        "longitude": 72.9781,
        "suppliers": [
          {
            "id": "SUP-THA-001",
            "name": "Wagle Tech Products",
            "latitude": 19.2183,
            "longitude": 72.9781,
            "location": "Wagle Estate, Thane"
          },
          {
            "id": "SUP-THA-002",
            "name": "Thane District Print Hub",
            "latitude": 19.2183,
            "longitude": 72.9781,
            "location": "Ghubunder Road, Thane"
          },
          {
            "id": "SUP-THA-003",
            "name": "Naupada Stationery Mart",
            "latitude": 19.2183,
            "longitude": 72.9781,
            "location": "Naupada, Thane"
          },
          {
            "id": "SUP-THA-004",
            "name": "Ghodbunder Cartridge Care",
            "latitude": 19.2183,
            "longitude": 72.9781,
            "location": "Majiwada, Thane"
          },
          {
            "id": "SUP-THA-005",
            "name": "Lakeside Office Depot",
            "latitude": 19.2183,
            "longitude": 72.9781,
            "location": "Kopri, Thane"
          },
          {
            "id": "SUP-THA-006",
            "name": "Siddhivinayak Toner Store",
            "latitude": 19.2183,
            "longitude": 72.9781,
            "location": "Vartak Nagar, Thane"
          },
          {
            "id": "SUP-THA-007",
            "name": "Everest Commercial Supplies",
            "latitude": 19.2183,
            "longitude": 72.9781,
            "location": "Kolshet Road, Thane"
          },
          {
            "id": "SUP-THA-008",
            "name": "Universal Print Pack",
            "latitude": 19.2183,
            "longitude": 72.9781,
            "location": "Manpada, Thane"
          },
          {
            "id": "SUP-THA-009",
            "name": "Vartak Tech Trade",
            "latitude": 19.2183,
            "longitude": 72.9781,
            "location": "Panchpakhadi, Thane"
          },
          {
            "id": "SUP-THA-010",
            "name": "Metro Line Office Solutions",
            "latitude": 19.2183,
            "longitude": 72.9781,
            "location": "Teen Hath Naka, Thane"
          }
        ],
        "vendors": [
          {
            "id": "VEN-THA-001",
            "name": "Thane Central Distributors",
            "latitude": 19.2183,
            "longitude": 72.9781,
            "location": "Wagle Estate, Thane"
          },
          {
            "id": "VEN-THA-002",
            "name": "Wagle Industrial Traders",
            "latitude": 19.2183,
            "longitude": 72.9781,
            "location": "Ghubunder Road, Thane"
          },
          {
            "id": "VEN-THA-003",
            "name": "Kopri Commercial Agency",
            "latitude": 19.2183,
            "longitude": 72.9781,
            "location": "Naupada, Thane"
          },
          {
            "id": "VEN-THA-004",
            "name": "Cosmos Print World",
            "latitude": 19.2183,
            "longitude": 72.9781,
            "location": "Majiwada, Thane"
          },
          {
            "id": "VEN-THA-005",
            "name": "Horizon Toner Suppliers",
            "latitude": 19.2183,
            "longitude": 72.9781,
            "location": "Kopri, Thane"
          },
          {
            "id": "VEN-THA-006",
            "name": "Pragati Office Products",
            "latitude": 19.2183,
            "longitude": 72.9781,
            "location": "Vartak Nagar, Thane"
          },
          {
            "id": "VEN-THA-007",
            "name": "Shreeji Stationery Hub",
            "latitude": 19.2183,
            "longitude": 72.9781,
            "location": "Kolshet Road, Thane"
          },
          {
            "id": "VEN-THA-008",
            "name": "Jupiter Trade Links",
            "latitude": 19.2183,
            "longitude": 72.9781,
            "location": "Manpada, Thane"
          },
          {
            "id": "VEN-THA-009",
            "name": "Zenith Print Solutions",
            "latitude": 19.2183,
            "longitude": 72.9781,
            "location": "Panchpakhadi, Thane"
          },
          {
            "id": "VEN-THA-010",
            "name": "Sterling Distro Thane",
            "latitude": 19.2183,
            "longitude": 72.9781,
            "location": "Teen Hath Naka, Thane"
          }
        ]
      },
      {
        "city": "Solapur",
        "latitude": 17.6599,
        "longitude": 75.9064,
        "suppliers": [
          {
            "id": "SUP-SOL-001",
            "name": "Siddheshwar Tech Care",
            "latitude": 17.6599,
            "longitude": 75.9064,
            "location": "Navi Peth, Solapur"
          },
          {
            "id": "SUP-SOL-002",
            "name": "Solapur Cartridge Mart",
            "latitude": 17.6599,
            "longitude": 75.9064,
            "location": "MIDC Chincholi, Solapur"
          },
          {
            "id": "SUP-SOL-003",
            "name": "Chincholi Industrial Goods",
            "latitude": 17.6599,
            "longitude": 75.9064,
            "location": "Murarji Peth, Solapur"
          },
          {
            "id": "SUP-SOL-004",
            "name": "Textile City Toner Hub",
            "latitude": 17.6599,
            "longitude": 75.9064,
            "location": "Saat Rasta, Solapur"
          },
          {
            "id": "SUP-SOL-005",
            "name": "Navi Peth Stationery House",
            "latitude": 17.6599,
            "longitude": 75.9064,
            "location": "Hotgi Road, Solapur"
          },
          {
            "id": "SUP-SOL-006",
            "name": "Balaji Office Express",
            "latitude": 17.6599,
            "longitude": 75.9064,
            "location": "Lashkar, Solapur"
          },
          {
            "id": "SUP-SOL-007",
            "name": "Samrat Print Consumables",
            "latitude": 17.6599,
            "longitude": 75.9064,
            "location": "Jule Solapur, Solapur"
          },
          {
            "id": "SUP-SOL-008",
            "name": "Shree Siddhi Supplies",
            "latitude": 17.6599,
            "longitude": 75.9064,
            "location": "Bhawani Peth, Solapur"
          },
          {
            "id": "SUP-SOL-009",
            "name": "Vijay Office Systems",
            "latitude": 17.6599,
            "longitude": 75.9064,
            "location": "Budhwar Peth, Solapur"
          },
          {
            "id": "SUP-SOL-010",
            "name": "Kalyan Commercial Network",
            "latitude": 17.6599,
            "longitude": 75.9064,
            "location": "Old Pune Naka, Solapur"
          }
        ],
        "vendors": [
          {
            "id": "VEN-SOL-001",
            "name": "Solapur Trade Agency",
            "latitude": 17.6599,
            "longitude": 75.9064,
            "location": "Navi Peth, Solapur"
          },
          {
            "id": "VEN-SOL-002",
            "name": "Saat Rasta Commercials",
            "latitude": 17.6599,
            "longitude": 75.9064,
            "location": "MIDC Chincholi, Solapur"
          },
          {
            "id": "VEN-SOL-003",
            "name": "Murarji Print Distro",
            "latitude": 17.6599,
            "longitude": 75.9064,
            "location": "Murarji Peth, Solapur"
          },
          {
            "id": "VEN-SOL-004",
            "name": "Chincholi Supply Co.",
            "latitude": 17.6599,
            "longitude": 75.9064,
            "location": "Saat Rasta, Solapur"
          },
          {
            "id": "VEN-SOL-005",
            "name": "Venkateshwara Toner Mart",
            "latitude": 17.6599,
            "longitude": 75.9064,
            "location": "Hotgi Road, Solapur"
          },
          {
            "id": "VEN-SOL-006",
            "name": "Pooja Stationery Mart",
            "latitude": 17.6599,
            "longitude": 75.9064,
            "location": "Lashkar, Solapur"
          },
          {
            "id": "VEN-SOL-007",
            "name": "Standard Paper Corp",
            "latitude": 17.6599,
            "longitude": 75.9064,
            "location": "Jule Solapur, Solapur"
          },
          {
            "id": "VEN-SOL-008",
            "name": "Dattatraya Trade Links",
            "latitude": 17.6599,
            "longitude": 75.9064,
            "location": "Bhawani Peth, Solapur"
          },
          {
            "id": "VEN-SOL-009",
            "name": "City Core Office Supplies",
            "latitude": 17.6599,
            "longitude": 75.9064,
            "location": "Budhwar Peth, Solapur"
          },
          {
            "id": "VEN-SOL-010",
            "name": "Royal Print Vendors",
            "latitude": 17.6599,
            "longitude": 75.9064,
            "location": "Old Pune Naka, Solapur"
          }
        ]
      },
      {
        "city": "Kolhapur",
        "latitude": 16.705,
        "longitude": 74.2433,
        "suppliers": [
          {
            "id": "SUP-KOL-001",
            "name": "Mahalaxmi Print Hub",
            "latitude": 16.705,
            "longitude": 74.2433,
            "location": "Shiroli MIDC, Kolhapur"
          },
          {
            "id": "SUP-KOL-002",
            "name": "Kolhapur Toner Clinic",
            "latitude": 16.705,
            "longitude": 74.2433,
            "location": "Gokul Shirgaon, Kolhapur"
          },
          {
            "id": "SUP-KOL-003",
            "name": "Shiroli Tech Supplies",
            "latitude": 16.705,
            "longitude": 74.2433,
            "location": "Rajarampuri, Kolhapur"
          },
          {
            "id": "SUP-KOL-004",
            "name": "Shahu Maharaj Stationery",
            "latitude": 16.705,
            "longitude": 74.2433,
            "location": "Laxmipuri, Kolhapur"
          },
          {
            "id": "SUP-KOL-005",
            "name": "Rajarampuri Office Care",
            "latitude": 16.705,
            "longitude": 74.2433,
            "location": "Shahupuri, Kolhapur"
          },
          {
            "id": "SUP-KOL-006",
            "name": "Western Maharashtra Consumables",
            "latitude": 16.705,
            "longitude": 74.2433,
            "location": "Tarabai Park, Kolhapur"
          },
          {
            "id": "SUP-KOL-007",
            "name": "Panchganga Paper House",
            "latitude": 16.705,
            "longitude": 74.2433,
            "location": "Rankala, Kolhapur"
          },
          {
            "id": "SUP-KOL-008",
            "name": "Kalyani Industrial Distro",
            "latitude": 16.705,
            "longitude": 74.2433,
            "location": "Station Road, Kolhapur"
          },
          {
            "id": "SUP-KOL-009",
            "name": "Shivaji Tech Solutions",
            "latitude": 16.705,
            "longitude": 74.2433,
            "location": "Nagala Park, Kolhapur"
          },
          {
            "id": "SUP-KOL-010",
            "name": "Royal Maratha Print",
            "latitude": 16.705,
            "longitude": 74.2433,
            "location": "Gandhinagar, Kolhapur"
          }
        ],
        "vendors": [
          {
            "id": "VEN-KOL-001",
            "name": "Shahupuri Trade Link",
            "latitude": 16.705,
            "longitude": 74.2433,
            "location": "Shiroli MIDC, Kolhapur"
          },
          {
            "id": "VEN-KOL-002",
            "name": "Kolhapur Business Syndicate",
            "latitude": 16.705,
            "longitude": 74.2433,
            "location": "Gokul Shirgaon, Kolhapur"
          },
          {
            "id": "VEN-KOL-003",
            "name": "Laxmipuri Commercial Mart",
            "latitude": 16.705,
            "longitude": 74.2433,
            "location": "Rajarampuri, Kolhapur"
          },
          {
            "id": "VEN-KOL-004",
            "name": "Shiroli Supply Network",
            "latitude": 16.705,
            "longitude": 74.2433,
            "location": "Laxmipuri, Kolhapur"
          },
          {
            "id": "VEN-KOL-005",
            "name": "Rajarampuri Toner World",
            "latitude": 16.705,
            "longitude": 74.2433,
            "location": "Shahupuri, Kolhapur"
          },
          {
            "id": "VEN-KOL-006",
            "name": "Shree Mahalaxmi Traders",
            "latitude": 16.705,
            "longitude": 74.2433,
            "location": "Tarabai Park, Kolhapur"
          },
          {
            "id": "VEN-KOL-007",
            "name": "Chhatrapati Distro",
            "latitude": 16.705,
            "longitude": 74.2433,
            "location": "Rankala, Kolhapur"
          },
          {
            "id": "VEN-KOL-008",
            "name": "Ambika Stationery Mart",
            "latitude": 16.705,
            "longitude": 74.2433,
            "location": "Station Road, Kolhapur"
          },
          {
            "id": "VEN-KOL-009",
            "name": "Heritage Print Solutions",
            "latitude": 16.705,
            "longitude": 74.2433,
            "location": "Nagala Park, Kolhapur"
          },
          {
            "id": "VEN-KOL-010",
            "name": "Imperial Kolhapur Supplies",
            "latitude": 16.705,
            "longitude": 74.2433,
            "location": "Gandhinagar, Kolhapur"
          }
        ]
      }
    ]
  },
  {
    "state": "Gujarat",
    "latitude": 22.2587,
    "longitude": 71.1924,
    "hub": {
      "city": "Ahmedabad",
      "latitude": 23.0225,
      "longitude": 72.5714
    },
    "cities": [
      {
        "city": "Ahmedabad",
        "latitude": 23.0225,
        "longitude": 72.5714,
        "suppliers": [
          {
            "id": "SUP-AHM-001",
            "name": "Sabarmati Print Solutions",
            "latitude": 23.0225,
            "longitude": 72.5714,
            "location": "SG Highway, Ahmedabad"
          },
          {
            "id": "SUP-AHM-002",
            "name": "Karnavati Toner Care",
            "latitude": 23.0225,
            "longitude": 72.5714,
            "location": "Ashram Road, Ahmedabad"
          },
          {
            "id": "SUP-AHM-003",
            "name": "SG Highway Tech Depot",
            "latitude": 23.0225,
            "longitude": 72.5714,
            "location": "Navrangpura, Ahmedabad"
          },
          {
            "id": "SUP-AHM-004",
            "name": "Navrangpura Office Systems",
            "latitude": 23.0225,
            "longitude": 72.5714,
            "location": "Prahlad Nagar, Ahmedabad"
          },
          {
            "id": "SUP-AHM-005",
            "name": "Gujarat Cartridge World",
            "latitude": 23.0225,
            "longitude": 72.5714,
            "location": "Maninagar, Ahmedabad"
          },
          {
            "id": "SUP-AHM-006",
            "name": "Adani Shanti Print Supplies",
            "latitude": 23.0225,
            "longitude": 72.5714,
            "location": "Naroda GIDC, Ahmedabad"
          },
          {
            "id": "SUP-AHM-007",
            "name": "Heritage Paper Mart",
            "latitude": 23.0225,
            "longitude": 72.5714,
            "location": "C.G. Road, Ahmedabad"
          },
          {
            "id": "SUP-AHM-008",
            "name": "Sanand Industrial Supplies",
            "latitude": 23.0225,
            "longitude": 72.5714,
            "location": "Ellisbridge, Ahmedabad"
          },
          {
            "id": "SUP-AHM-009",
            "name": "Prahlad Nagar Tech Link",
            "latitude": 23.0225,
            "longitude": 72.5714,
            "location": "Sanand GIDC, Ahmedabad"
          },
          {
            "id": "SUP-AHM-010",
            "name": "Ahmedabad Commercial Hub",
            "latitude": 23.0225,
            "longitude": 72.5714,
            "location": "Sarkhej, Ahmedabad"
          }
        ],
        "vendors": [
          {
            "id": "VEN-AHM-001",
            "name": "Ashram Road Distributors",
            "latitude": 23.0225,
            "longitude": 72.5714,
            "location": "SG Highway, Ahmedabad"
          },
          {
            "id": "VEN-AHM-002",
            "name": "Naroda GIDC Trade Hub",
            "latitude": 23.0225,
            "longitude": 72.5714,
            "location": "Ashram Road, Ahmedabad"
          },
          {
            "id": "VEN-AHM-003",
            "name": "Maninagar Toner Depot",
            "latitude": 23.0225,
            "longitude": 72.5714,
            "location": "Navrangpura, Ahmedabad"
          },
          {
            "id": "VEN-AHM-004",
            "name": "Ellisbridge Print Vendors",
            "latitude": 23.0225,
            "longitude": 72.5714,
            "location": "Prahlad Nagar, Ahmedabad"
          },
          {
            "id": "VEN-AHM-005",
            "name": "Karnavati Paper Corp",
            "latitude": 23.0225,
            "longitude": 72.5714,
            "location": "Maninagar, Ahmedabad"
          },
          {
            "id": "VEN-AHM-006",
            "name": "Swastik Trade Syndicate",
            "latitude": 23.0225,
            "longitude": 72.5714,
            "location": "Naroda GIDC, Ahmedabad"
          },
          {
            "id": "VEN-AHM-007",
            "name": "Apex Gujarat Suppliers",
            "latitude": 23.0225,
            "longitude": 72.5714,
            "location": "C.G. Road, Ahmedabad"
          },
          {
            "id": "VEN-AHM-008",
            "name": "Radhe Krishna Stationery",
            "latitude": 23.0225,
            "longitude": 72.5714,
            "location": "Ellisbridge, Ahmedabad"
          },
          {
            "id": "VEN-AHM-009",
            "name": "Shreeji Corporate Services",
            "latitude": 23.0225,
            "longitude": 72.5714,
            "location": "Sanand GIDC, Ahmedabad"
          },
          {
            "id": "VEN-AHM-010",
            "name": "Vibrant Gujarat Distro",
            "latitude": 23.0225,
            "longitude": 72.5714,
            "location": "Sarkhej, Ahmedabad"
          }
        ]
      },
      {
        "city": "Surat",
        "latitude": 21.1702,
        "longitude": 72.8311,
        "suppliers": [
          {
            "id": "SUP-SUR-001",
            "name": "Diamond City Print Solutions",
            "latitude": 21.1702,
            "longitude": 72.8311,
            "location": "Ring Road, Surat"
          },
          {
            "id": "SUP-SUR-002",
            "name": "Surat Cartridge Depot",
            "latitude": 21.1702,
            "longitude": 72.8311,
            "location": "Pandesara GIDC, Surat"
          },
          {
            "id": "SUP-SUR-003",
            "name": "Pandesara Industrial Consumables",
            "latitude": 21.1702,
            "longitude": 72.8311,
            "location": "Sachin GIDC, Surat"
          },
          {
            "id": "SUP-SUR-004",
            "name": "Tapi River Toner Clinic",
            "latitude": 21.1702,
            "longitude": 72.8311,
            "location": "Adajan, Surat"
          },
          {
            "id": "SUP-SUR-005",
            "name": "Varachha Tech Mart",
            "latitude": 21.1702,
            "longitude": 72.8311,
            "location": "Varachha, Surat"
          },
          {
            "id": "SUP-SUR-006",
            "name": "Sachin GIDC Office Needs",
            "latitude": 21.1702,
            "longitude": 72.8311,
            "location": "Udhna, Surat"
          },
          {
            "id": "SUP-SUR-007",
            "name": "Adajan Stationery World",
            "latitude": 21.1702,
            "longitude": 72.8311,
            "location": "Ghopipura, Surat"
          },
          {
            "id": "SUP-SUR-008",
            "name": "Silk City Print Care",
            "latitude": 21.1702,
            "longitude": 72.8311,
            "location": "Majura Gate, Surat"
          },
          {
            "id": "SUP-SUR-009",
            "name": "Surat Corporate Supplies",
            "latitude": 21.1702,
            "longitude": 72.8311,
            "location": "Piplod, Surat"
          },
          {
            "id": "SUP-SUR-010",
            "name": "Shree Ram Toner Agency",
            "latitude": 21.1702,
            "longitude": 72.8311,
            "location": "Katargam, Surat"
          }
        ],
        "vendors": [
          {
            "id": "VEN-SUR-001",
            "name": "Ring Road Trade Network",
            "latitude": 21.1702,
            "longitude": 72.8311,
            "location": "Ring Road, Surat"
          },
          {
            "id": "VEN-SUR-002",
            "name": "Surat Textile City Vendors",
            "latitude": 21.1702,
            "longitude": 72.8311,
            "location": "Pandesara GIDC, Surat"
          },
          {
            "id": "VEN-SUR-003",
            "name": "Udhna Commercial Distro",
            "latitude": 21.1702,
            "longitude": 72.8311,
            "location": "Sachin GIDC, Surat"
          },
          {
            "id": "VEN-SUR-004",
            "name": "Katargam Trade Link",
            "latitude": 21.1702,
            "longitude": 72.8311,
            "location": "Adajan, Surat"
          },
          {
            "id": "VEN-SUR-005",
            "name": "Majura Office Supply Co.",
            "latitude": 21.1702,
            "longitude": 72.8311,
            "location": "Varachha, Surat"
          },
          {
            "id": "VEN-SUR-006",
            "name": "Diamond City Consumables",
            "latitude": 21.1702,
            "longitude": 72.8311,
            "location": "Udhna, Surat"
          },
          {
            "id": "VEN-SUR-007",
            "name": "Shreeji Paper Traders",
            "latitude": 21.1702,
            "longitude": 72.8311,
            "location": "Ghopipura, Surat"
          },
          {
            "id": "VEN-SUR-008",
            "name": "Gopipura Toner Mart",
            "latitude": 21.1702,
            "longitude": 72.8311,
            "location": "Majura Gate, Surat"
          },
          {
            "id": "VEN-SUR-009",
            "name": "Surat Central Distributor",
            "latitude": 21.1702,
            "longitude": 72.8311,
            "location": "Piplod, Surat"
          },
          {
            "id": "VEN-SUR-010",
            "name": "Kuber Office Systems",
            "latitude": 21.1702,
            "longitude": 72.8311,
            "location": "Katargam, Surat"
          }
        ]
      },
      {
        "city": "Vadodara",
        "latitude": 22.3072,
        "longitude": 73.1812,
        "suppliers": [
          {
            "id": "SUP-VAD-001",
            "name": "Sayaji Print Systems",
            "latitude": 22.3072,
            "longitude": 73.1812,
            "location": "Alkapuri, Vadodara"
          },
          {
            "id": "SUP-VAD-002",
            "name": "Baroda Cartridge World",
            "latitude": 22.3072,
            "longitude": 73.1812,
            "location": "Makarpura GIDC, Vadodara"
          },
          {
            "id": "SUP-VAD-003",
            "name": "Makarpura Industrial Supply",
            "latitude": 22.3072,
            "longitude": 73.1812,
            "location": "Sayajigunj, Vadodara"
          },
          {
            "id": "SUP-VAD-004",
            "name": "Alkapuri Office Needs",
            "latitude": 22.3072,
            "longitude": 73.1812,
            "location": "Manjalpur, Vadodara"
          },
          {
            "id": "SUP-VAD-005",
            "name": "Sanskari Nagari Toner Care",
            "latitude": 22.3072,
            "longitude": 73.1812,
            "location": "Akota, Vadodara"
          },
          {
            "id": "SUP-VAD-006",
            "name": "Vadodara Tech Stationers",
            "latitude": 22.3072,
            "longitude": 73.1812,
            "location": "Gorwa, Vadodara"
          },
          {
            "id": "SUP-VAD-007",
            "name": "Akota Print Consumables",
            "latitude": 22.3072,
            "longitude": 73.1812,
            "location": "Karelibaug, Vadodara"
          },
          {
            "id": "SUP-VAD-008",
            "name": "Manjalpur Stationery Hub",
            "latitude": 22.3072,
            "longitude": 73.1812,
            "location": "Waghodia Road, Vadodara"
          },
          {
            "id": "SUP-VAD-009",
            "name": "Gorwa Tech Care",
            "latitude": 22.3072,
            "longitude": 73.1812,
            "location": "Gotri, Vadodara"
          },
          {
            "id": "SUP-VAD-010",
            "name": "Central Gujarat Print Link",
            "latitude": 22.3072,
            "longitude": 73.1812,
            "location": "Fatehgunj, Vadodara"
          }
        ],
        "vendors": [
          {
            "id": "VEN-VAD-001",
            "name": "Baroda Trade Syndicate",
            "latitude": 22.3072,
            "longitude": 73.1812,
            "location": "Alkapuri, Vadodara"
          },
          {
            "id": "VEN-VAD-002",
            "name": "Sayajigunj Commercial Store",
            "latitude": 22.3072,
            "longitude": 73.1812,
            "location": "Makarpura GIDC, Vadodara"
          },
          {
            "id": "VEN-VAD-003",
            "name": "Makarpura Vendor Hub",
            "latitude": 22.3072,
            "longitude": 73.1812,
            "location": "Sayajigunj, Vadodara"
          },
          {
            "id": "VEN-VAD-004",
            "name": "Alkapuri Distro Line",
            "latitude": 22.3072,
            "longitude": 73.1812,
            "location": "Manjalpur, Vadodara"
          },
          {
            "id": "VEN-VAD-005",
            "name": "Shreeji Toner Network",
            "latitude": 22.3072,
            "longitude": 73.1812,
            "location": "Akota, Vadodara"
          },
          {
            "id": "VEN-VAD-006",
            "name": "Royal Baroda Supplies",
            "latitude": 22.3072,
            "longitude": 73.1812,
            "location": "Gorwa, Vadodara"
          },
          {
            "id": "VEN-VAD-007",
            "name": "Vanguard Commercial Corp",
            "latitude": 22.3072,
            "longitude": 73.1812,
            "location": "Karelibaug, Vadodara"
          },
          {
            "id": "VEN-VAD-008",
            "name": "Karelibaug Trade Link",
            "latitude": 22.3072,
            "longitude": 73.1812,
            "location": "Waghodia Road, Vadodara"
          },
          {
            "id": "VEN-VAD-009",
            "name": "Prabhat Print Services",
            "latitude": 22.3072,
            "longitude": 73.1812,
            "location": "Gotri, Vadodara"
          },
          {
            "id": "VEN-VAD-010",
            "name": "United Baroda Agencies",
            "latitude": 22.3072,
            "longitude": 73.1812,
            "location": "Fatehgunj, Vadodara"
          }
        ]
      },
      {
        "city": "Rajkot",
        "latitude": 22.3039,
        "longitude": 70.8022,
        "suppliers": [
          {
            "id": "SUP-RAJ-001",
            "name": "Saurashtra Print Solutions",
            "latitude": 22.3039,
            "longitude": 70.8022,
            "location": "Yagnik Road, Rajkot"
          },
          {
            "id": "SUP-RAJ-002",
            "name": "Rajkot Toner Depot",
            "latitude": 22.3039,
            "longitude": 70.8022,
            "location": "Aji GIDC, Rajkot"
          },
          {
            "id": "SUP-RAJ-003",
            "name": "Aji Industrial Consumables",
            "latitude": 22.3039,
            "longitude": 70.8022,
            "location": "Metoda GIDC, Rajkot"
          },
          {
            "id": "SUP-RAJ-004",
            "name": "Metoda GIDC Office Care",
            "latitude": 22.3039,
            "longitude": 70.8022,
            "location": "Kalawad Road, Rajkot"
          },
          {
            "id": "SUP-RAJ-005",
            "name": "Yagnik Road Stationers",
            "latitude": 22.3039,
            "longitude": 70.8022,
            "location": "Dhebar Road, Rajkot"
          },
          {
            "id": "SUP-RAJ-006",
            "name": "Kathiawar Cartridge World",
            "latitude": 22.3039,
            "longitude": 70.8022,
            "location": "Gondal Road, Rajkot"
          },
          {
            "id": "SUP-RAJ-007",
            "name": "Riddhi Siddhi Print Tech",
            "latitude": 22.3039,
            "longitude": 70.8022,
            "location": "Bhaktinagar, Rajkot"
          },
          {
            "id": "SUP-RAJ-008",
            "name": "Kalawad Office Systems",
            "latitude": 22.3039,
            "longitude": 70.8022,
            "location": "University Road, Rajkot"
          },
          {
            "id": "SUP-RAJ-009",
            "name": "Gondal Road Tech Care",
            "latitude": 22.3039,
            "longitude": 70.8022,
            "location": "Kothariya, Rajkot"
          },
          {
            "id": "SUP-RAJ-010",
            "name": "Shreeji Corporate Hub",
            "latitude": 22.3039,
            "longitude": 70.8022,
            "location": "Madhapar, Rajkot"
          }
        ],
        "vendors": [
          {
            "id": "VEN-RAJ-001",
            "name": "Rajkot Wholesale Network",
            "latitude": 22.3039,
            "longitude": 70.8022,
            "location": "Yagnik Road, Rajkot"
          },
          {
            "id": "VEN-RAJ-002",
            "name": "Dhebar Road Commercial Mart",
            "latitude": 22.3039,
            "longitude": 70.8022,
            "location": "Aji GIDC, Rajkot"
          },
          {
            "id": "VEN-RAJ-003",
            "name": "Saurashtra Trade Link",
            "latitude": 22.3039,
            "longitude": 70.8022,
            "location": "Metoda GIDC, Rajkot"
          },
          {
            "id": "VEN-RAJ-004",
            "name": "Bhaktinagar Toner Distro",
            "latitude": 22.3039,
            "longitude": 70.8022,
            "location": "Kalawad Road, Rajkot"
          },
          {
            "id": "VEN-RAJ-005",
            "name": "Metoda Supply Chain",
            "latitude": 22.3039,
            "longitude": 70.8022,
            "location": "Dhebar Road, Rajkot"
          },
          {
            "id": "VEN-RAJ-006",
            "name": "Apex Rajkot Distro",
            "latitude": 22.3039,
            "longitude": 70.8022,
            "location": "Gondal Road, Rajkot"
          },
          {
            "id": "VEN-RAJ-007",
            "name": "Shakti Office Supplies",
            "latitude": 22.3039,
            "longitude": 70.8022,
            "location": "Bhaktinagar, Rajkot"
          },
          {
            "id": "VEN-RAJ-008",
            "name": "Khodiyar Print World",
            "latitude": 22.3039,
            "longitude": 70.8022,
            "location": "University Road, Rajkot"
          },
          {
            "id": "VEN-RAJ-009",
            "name": "Maruti Tech Vendors",
            "latitude": 22.3039,
            "longitude": 70.8022,
            "location": "Kothariya, Rajkot"
          },
          {
            "id": "VEN-RAJ-010",
            "name": "Royal Saurashtra Mart",
            "latitude": 22.3039,
            "longitude": 70.8022,
            "location": "Madhapar, Rajkot"
          }
        ]
      },
      {
        "city": "Bhavnagar",
        "latitude": 21.7645,
        "longitude": 72.1519,
        "suppliers": [
          {
            "id": "SUP-BHA-001",
            "name": "Gohilwad Print Care",
            "latitude": 21.7645,
            "longitude": 72.1519,
            "location": "Waghawadi Road, Bhavnagar"
          },
          {
            "id": "SUP-BHA-002",
            "name": "Bhavnagar Toner Clinic",
            "latitude": 21.7645,
            "longitude": 72.1519,
            "location": "Chitra GIDC, Bhavnagar"
          },
          {
            "id": "SUP-BHA-003",
            "name": "Chitra GIDC Industrial Supply",
            "latitude": 21.7645,
            "longitude": 72.1519,
            "location": "Kalanala, Bhavnagar"
          },
          {
            "id": "SUP-BHA-004",
            "name": "Waghawadi Stationery Hub",
            "latitude": 21.7645,
            "longitude": 72.1519,
            "location": "Ghogha Circle, Bhavnagar"
          },
          {
            "id": "SUP-BHA-005",
            "name": "Alang Gateway Office Mart",
            "latitude": 21.7645,
            "longitude": 72.1519,
            "location": "Subhashnagar, Bhavnagar"
          },
          {
            "id": "SUP-BHA-006",
            "name": "Nilambag Tech Solutions",
            "latitude": 21.7645,
            "longitude": 72.1519,
            "location": "Nilambag, Bhavnagar"
          },
          {
            "id": "SUP-BHA-007",
            "name": "Kalanala Cartridge Store",
            "latitude": 21.7645,
            "longitude": 72.1519,
            "location": "Kaliabid, Bhavnagar"
          },
          {
            "id": "SUP-BHA-008",
            "name": "Bhavnagar Paper House",
            "latitude": 21.7645,
            "longitude": 72.1519,
            "location": "Crescent Circle, Bhavnagar"
          },
          {
            "id": "SUP-BHA-009",
            "name": "Saurashtra Sea Link Supplies",
            "latitude": 21.7645,
            "longitude": 72.1519,
            "location": "Bhavnagar Port, Bhavnagar"
          },
          {
            "id": "SUP-BHA-010",
            "name": "Shree Krishna Print Pack",
            "latitude": 21.7645,
            "longitude": 72.1519,
            "location": "Barton Library Area, Bhavnagar"
          }
        ],
        "vendors": [
          {
            "id": "VEN-BHA-001",
            "name": "Bhavnagar Trade Centre",
            "latitude": 21.7645,
            "longitude": 72.1519,
            "location": "Waghawadi Road, Bhavnagar"
          },
          {
            "id": "VEN-BHA-002",
            "name": "Waghawadi Commercial Vendors",
            "latitude": 21.7645,
            "longitude": 72.1519,
            "location": "Chitra GIDC, Bhavnagar"
          },
          {
            "id": "VEN-BHA-003",
            "name": "Chitra Supply Agency",
            "latitude": 21.7645,
            "longitude": 72.1519,
            "location": "Kalanala, Bhavnagar"
          },
          {
            "id": "VEN-BHA-004",
            "name": "Ghogha Circle Distro",
            "latitude": 21.7645,
            "longitude": 72.1519,
            "location": "Ghogha Circle, Bhavnagar"
          },
          {
            "id": "VEN-BHA-005",
            "name": "Gohilwad Commercial Link",
            "latitude": 21.7645,
            "longitude": 72.1519,
            "location": "Subhashnagar, Bhavnagar"
          },
          {
            "id": "VEN-BHA-006",
            "name": "Jay Ambe Toner World",
            "latitude": 21.7645,
            "longitude": 72.1519,
            "location": "Nilambag, Bhavnagar"
          },
          {
            "id": "VEN-BHA-007",
            "name": "Bhavani Stationery Distro",
            "latitude": 21.7645,
            "longitude": 72.1519,
            "location": "Kaliabid, Bhavnagar"
          },
          {
            "id": "VEN-BHA-008",
            "name": "Coastal Gujarat Supplies",
            "latitude": 21.7645,
            "longitude": 72.1519,
            "location": "Crescent Circle, Bhavnagar"
          },
          {
            "id": "VEN-BHA-009",
            "name": "Shiv Shakti Paper Mart",
            "latitude": 21.7645,
            "longitude": 72.1519,
            "location": "Bhavnagar Port, Bhavnagar"
          },
          {
            "id": "VEN-BHA-010",
            "name": "Reliance Point Office Care",
            "latitude": 21.7645,
            "longitude": 72.1519,
            "location": "Barton Library Area, Bhavnagar"
          }
        ]
      },
      {
        "city": "Jamnagar",
        "latitude": 22.4707,
        "longitude": 70.0577,
        "suppliers": [
          {
            "id": "SUP-JAM-001",
            "name": "Brass City Print Depot",
            "latitude": 22.4707,
            "longitude": 70.0577,
            "location": "Bedeshwar GIDC, Jamnagar"
          },
          {
            "id": "SUP-JAM-002",
            "name": "Jamnagar Toner Care",
            "latitude": 22.4707,
            "longitude": 70.0577,
            "location": "Dared GIDC, Jamnagar"
          },
          {
            "id": "SUP-JAM-003",
            "name": "Bedeshwar Industrial Consumables",
            "latitude": 22.4707,
            "longitude": 70.0577,
            "location": "Panchvati, Jamnagar"
          },
          {
            "id": "SUP-JAM-004",
            "name": "Dared GIDC Office Care",
            "latitude": 22.4707,
            "longitude": 70.0577,
            "location": "Indira Marg, Jamnagar"
          },
          {
            "id": "SUP-JAM-005",
            "name": "Reliance Greens Supply Partner",
            "latitude": 22.4707,
            "longitude": 70.0577,
            "location": "Digvijay Plot, Jamnagar"
          },
          {
            "id": "SUP-JAM-006",
            "name": "Digvijay Print Store",
            "latitude": 22.4707,
            "longitude": 70.0577,
            "location": "Patel Colony, Jamnagar"
          },
          {
            "id": "SUP-JAM-007",
            "name": "Patel Colony Stationers",
            "latitude": 22.4707,
            "longitude": 70.0577,
            "location": "Grain Market, Jamnagar"
          },
          {
            "id": "SUP-JAM-008",
            "name": "Nawanagar Tech Solutions",
            "latitude": 22.4707,
            "longitude": 70.0577,
            "location": "Khambhalia Road, Jamnagar"
          },
          {
            "id": "SUP-JAM-009",
            "name": "Dwarka Road Paper Mart",
            "latitude": 22.4707,
            "longitude": 70.0577,
            "location": "Gulabnagar, Jamnagar"
          },
          {
            "id": "SUP-JAM-010",
            "name": "Khodiyar Cartridge Hub",
            "latitude": 22.4707,
            "longitude": 70.0577,
            "location": "Summer Club Area, Jamnagar"
          }
        ],
        "vendors": [
          {
            "id": "VEN-JAM-001",
            "name": "Jamnagar Commercial Distro",
            "latitude": 22.4707,
            "longitude": 70.0577,
            "location": "Bedeshwar GIDC, Jamnagar"
          },
          {
            "id": "VEN-JAM-002",
            "name": "Brass City Trade Line",
            "latitude": 22.4707,
            "longitude": 70.0577,
            "location": "Dared GIDC, Jamnagar"
          },
          {
            "id": "VEN-JAM-003",
            "name": "Bedeshwar Supply Hub",
            "latitude": 22.4707,
            "longitude": 70.0577,
            "location": "Panchvati, Jamnagar"
          },
          {
            "id": "VEN-JAM-004",
            "name": "Dared Industrial Vendors",
            "latitude": 22.4707,
            "longitude": 70.0577,
            "location": "Indira Marg, Jamnagar"
          },
          {
            "id": "VEN-JAM-005",
            "name": "Nawanagar Commercial Link",
            "latitude": 22.4707,
            "longitude": 70.0577,
            "location": "Digvijay Plot, Jamnagar"
          },
          {
            "id": "VEN-JAM-006",
            "name": "Shree Ganesh Toner Agency",
            "latitude": 22.4707,
            "longitude": 70.0577,
            "location": "Patel Colony, Jamnagar"
          },
          {
            "id": "VEN-JAM-007",
            "name": "Grain Market Stationery",
            "latitude": 22.4707,
            "longitude": 70.0577,
            "location": "Grain Market, Jamnagar"
          },
          {
            "id": "VEN-JAM-008",
            "name": "Saurashtra Oil & Print Supplies",
            "latitude": 22.4707,
            "longitude": 70.0577,
            "location": "Khambhalia Road, Jamnagar"
          },
          {
            "id": "VEN-JAM-009",
            "name": "Universal Jamnagar Vendors",
            "latitude": 22.4707,
            "longitude": 70.0577,
            "location": "Gulabnagar, Jamnagar"
          },
          {
            "id": "VEN-JAM-010",
            "name": "Premier Tech Store",
            "latitude": 22.4707,
            "longitude": 70.0577,
            "location": "Summer Club Area, Jamnagar"
          }
        ]
      },
      {
        "city": "Gandhinagar",
        "latitude": 23.2156,
        "longitude": 72.6369,
        "suppliers": [
          {
            "id": "SUP-GAN-001",
            "name": "Capital City Print Solutions",
            "latitude": 23.2156,
            "longitude": 72.6369,
            "location": "Sector 11, Gandhinagar"
          },
          {
            "id": "SUP-GAN-002",
            "name": "Infocity Toner Care",
            "latitude": 23.2156,
            "longitude": 72.6369,
            "location": "Sector 21, Gandhinagar"
          },
          {
            "id": "SUP-GAN-003",
            "name": "GIFT City Commercial Supplies",
            "latitude": 23.2156,
            "longitude": 72.6369,
            "location": "Infocity, Gandhinagar"
          },
          {
            "id": "SUP-GAN-004",
            "name": "Sector 21 Stationery Mart",
            "latitude": 23.2156,
            "longitude": 72.6369,
            "location": "GIFT City, Gandhinagar"
          },
          {
            "id": "SUP-GAN-005",
            "name": "Gandhinagar Cartridge Clinic",
            "latitude": 23.2156,
            "longitude": 72.6369,
            "location": "Sector 16, Gandhinagar"
          },
          {
            "id": "SUP-GAN-006",
            "name": "Kudasan Office Needs",
            "latitude": 23.2156,
            "longitude": 72.6369,
            "location": "Kudasan, Gandhinagar"
          },
          {
            "id": "SUP-GAN-007",
            "name": "Sector 28 GIDC Industrial Care",
            "latitude": 23.2156,
            "longitude": 72.6369,
            "location": "Randesan, Gandhinagar"
          },
          {
            "id": "SUP-GAN-008",
            "name": "Vibrant Capital Tech",
            "latitude": 23.2156,
            "longitude": 72.6369,
            "location": "Sector 28 GIDC, Gandhinagar"
          },
          {
            "id": "SUP-GAN-009",
            "name": "Swaminarayan Print Hub",
            "latitude": 23.2156,
            "longitude": 72.6369,
            "location": "Sargasan, Gandhinagar"
          },
          {
            "id": "SUP-GAN-010",
            "name": "Gujarat State Supplies",
            "latitude": 23.2156,
            "longitude": 72.6369,
            "location": "Vavol, Gandhinagar"
          }
        ],
        "vendors": [
          {
            "id": "VEN-GAN-001",
            "name": "Infocity Commercial Distro",
            "latitude": 23.2156,
            "longitude": 72.6369,
            "location": "Sector 11, Gandhinagar"
          },
          {
            "id": "VEN-GAN-002",
            "name": "GIFT City Supply Network",
            "latitude": 23.2156,
            "longitude": 72.6369,
            "location": "Sector 21, Gandhinagar"
          },
          {
            "id": "VEN-GAN-003",
            "name": "Sector 11 Trade Partner",
            "latitude": 23.2156,
            "longitude": 72.6369,
            "location": "Infocity, Gandhinagar"
          },
          {
            "id": "VEN-GAN-004",
            "name": "Gandhinagar Central Agency",
            "latitude": 23.2156,
            "longitude": 72.6369,
            "location": "GIFT City, Gandhinagar"
          },
          {
            "id": "VEN-GAN-005",
            "name": "Capital Office Solutions",
            "latitude": 23.2156,
            "longitude": 72.6369,
            "location": "Sector 16, Gandhinagar"
          },
          {
            "id": "VEN-GAN-006",
            "name": "Shreeji GIFT Trade",
            "latitude": 23.2156,
            "longitude": 72.6369,
            "location": "Kudasan, Gandhinagar"
          },
          {
            "id": "VEN-GAN-007",
            "name": "Vanguard Government Supplies",
            "latitude": 23.2156,
            "longitude": 72.6369,
            "location": "Randesan, Gandhinagar"
          },
          {
            "id": "VEN-GAN-008",
            "name": "Tech Corridor Vendors",
            "latitude": 23.2156,
            "longitude": 72.6369,
            "location": "Sector 28 GIDC, Gandhinagar"
          },
          {
            "id": "VEN-GAN-009",
            "name": "Apex Sector Distro",
            "latitude": 23.2156,
            "longitude": 72.6369,
            "location": "Sargasan, Gandhinagar"
          },
          {
            "id": "VEN-GAN-010",
            "name": "National Capital Stationery",
            "latitude": 23.2156,
            "longitude": 72.6369,
            "location": "Vavol, Gandhinagar"
          }
        ]
      },
      {
        "city": "Junagadh",
        "latitude": 21.5222,
        "longitude": 70.4579,
        "suppliers": [
          {
            "id": "SUP-JUN-001",
            "name": "Girnar Print Tech",
            "latitude": 21.5222,
            "longitude": 70.4579,
            "location": "Zanzarda Road, Junagadh"
          },
          {
            "id": "SUP-JUN-002",
            "name": "Junagadh Toner Clinic",
            "latitude": 21.5222,
            "longitude": 70.4579,
            "location": "Girnar Darwaja, Junagadh"
          },
          {
            "id": "SUP-JUN-003",
            "name": "Zanzarda Road Stationers",
            "latitude": 21.5222,
            "longitude": 70.4579,
            "location": "MG Road, Junagadh"
          },
          {
            "id": "SUP-JUN-004",
            "name": "Kalva Chowk Office Mart",
            "latitude": 21.5222,
            "longitude": 70.4579,
            "location": "Kalva Chowk, Junagadh"
          },
          {
            "id": "SUP-JUN-005",
            "name": "Saurashtra Heritage Paper",
            "latitude": 21.5222,
            "longitude": 70.4579,
            "location": "Moti Baug, Junagadh"
          },
          {
            "id": "SUP-JUN-006",
            "name": "Lion City Print Supplies",
            "latitude": 21.5222,
            "longitude": 70.4579,
            "location": "Talav Gate, Junagadh"
          },
          {
            "id": "SUP-JUN-007",
            "name": "Moti Baug Cartridge Care",
            "latitude": 21.5222,
            "longitude": 70.4579,
            "location": "Joshipura, Junagadh"
          },
          {
            "id": "SUP-JUN-008",
            "name": "Somnath Route Tech Link",
            "latitude": 21.5222,
            "longitude": 70.4579,
            "location": "Sabalgadh, Junagadh"
          },
          {
            "id": "SUP-JUN-009",
            "name": "Joshipura Office Needs",
            "latitude": 21.5222,
            "longitude": 70.4579,
            "location": "Timbawadi, Junagadh"
          },
          {
            "id": "SUP-JUN-010",
            "name": "Shreeji Girnar Consumables",
            "latitude": 21.5222,
            "longitude": 70.4579,
            "location": "Bilkha Road, Junagadh"
          }
        ],
        "vendors": [
          {
            "id": "VEN-JUN-001",
            "name": "Junagadh Commercial Centre",
            "latitude": 21.5222,
            "longitude": 70.4579,
            "location": "Zanzarda Road, Junagadh"
          },
          {
            "id": "VEN-JUN-002",
            "name": "Zanzarda Trade Syndicate",
            "latitude": 21.5222,
            "longitude": 70.4579,
            "location": "Girnar Darwaja, Junagadh"
          },
          {
            "id": "VEN-JUN-003",
            "name": "Girnar Darwaja Distro",
            "latitude": 21.5222,
            "longitude": 70.4579,
            "location": "MG Road, Junagadh"
          },
          {
            "id": "VEN-JUN-004",
            "name": "Kalva Chowk Vendors",
            "latitude": 21.5222,
            "longitude": 70.4579,
            "location": "Kalva Chowk, Junagadh"
          },
          {
            "id": "VEN-JUN-005",
            "name": "Somnath Trade Network",
            "latitude": 21.5222,
            "longitude": 70.4579,
            "location": "Moti Baug, Junagadh"
          },
          {
            "id": "VEN-JUN-006",
            "name": "Bhavnath Stationery Mart",
            "latitude": 21.5222,
            "longitude": 70.4579,
            "location": "Talav Gate, Junagadh"
          },
          {
            "id": "VEN-JUN-007",
            "name": "Shree Ambika Toner Store",
            "latitude": 21.5222,
            "longitude": 70.4579,
            "location": "Joshipura, Junagadh"
          },
          {
            "id": "VEN-JUN-008",
            "name": "Saurashtra Agro & Office Care",
            "latitude": 21.5222,
            "longitude": 70.4579,
            "location": "Sabalgadh, Junagadh"
          },
          {
            "id": "VEN-JUN-009",
            "name": "Kesar Print Solutions",
            "latitude": 21.5222,
            "longitude": 70.4579,
            "location": "Timbawadi, Junagadh"
          },
          {
            "id": "VEN-JUN-010",
            "name": "Junagadh City Distro",
            "latitude": 21.5222,
            "longitude": 70.4579,
            "location": "Bilkha Road, Junagadh"
          }
        ]
      }
    ]
  },
  {
    "state": "Karnataka",
    "latitude": 15.3173,
    "longitude": 75.7139,
    "hub": {
      "city": "Bengaluru",
      "latitude": 12.9716,
      "longitude": 77.5946
    },
    "cities": [
      {
        "city": "Bengaluru",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "suppliers": [
          {
            "id": "SUP-BLR-001",
            "name": "Silicon City Print Systems",
            "latitude": 12.9716,
            "longitude": 77.5946,
            "location": "Koramangala, Bengaluru"
          },
          {
            "id": "SUP-BLR-002",
            "name": "Koramangala Tech Cartridges",
            "latitude": 12.9716,
            "longitude": 77.5946,
            "location": "Whitefield, Bengaluru"
          },
          {
            "id": "SUP-BLR-003",
            "name": "Whitefield Corporate Supplies",
            "latitude": 12.9716,
            "longitude": 77.5946,
            "location": "Indiranagar, Bengaluru"
          },
          {
            "id": "SUP-BLR-004",
            "name": "Peenya Industrial Consumables",
            "latitude": 12.9716,
            "longitude": 77.5946,
            "location": "Electronic City, Bengaluru"
          },
          {
            "id": "SUP-BLR-005",
            "name": "Electronic City Toner Hub",
            "latitude": 12.9716,
            "longitude": 77.5946,
            "location": "Jayanagar, Bengaluru"
          },
          {
            "id": "SUP-BLR-006",
            "name": "Indiranagar Office Needs",
            "latitude": 12.9716,
            "longitude": 77.5946,
            "location": "Peenya Industrial Area, Bengaluru"
          },
          {
            "id": "SUP-BLR-007",
            "name": "Garden City Paper House",
            "latitude": 12.9716,
            "longitude": 77.5946,
            "location": "MG Road, Bengaluru"
          },
          {
            "id": "SUP-BLR-008",
            "name": "Hebbal IT Supplies",
            "latitude": 12.9716,
            "longitude": 77.5946,
            "location": "Rajajinagar, Bengaluru"
          },
          {
            "id": "SUP-BLR-009",
            "name": "Bangalore Cartridge Clinic",
            "latitude": 12.9716,
            "longitude": 77.5946,
            "location": "Hebbal, Bengaluru"
          },
          {
            "id": "SUP-BLR-010",
            "name": "Tech Park Stationers",
            "latitude": 12.9716,
            "longitude": 77.5946,
            "location": "Malleshwaram, Bengaluru"
          }
        ],
        "vendors": [
          {
            "id": "VEN-BLR-001",
            "name": "Bengaluru Commercial Trade",
            "latitude": 12.9716,
            "longitude": 77.5946,
            "location": "Koramangala, Bengaluru"
          },
          {
            "id": "VEN-BLR-002",
            "name": "Whitefield Supply Syndicate",
            "latitude": 12.9716,
            "longitude": 77.5946,
            "location": "Whitefield, Bengaluru"
          },
          {
            "id": "VEN-BLR-003",
            "name": "Peenya Industrial Distro",
            "latitude": 12.9716,
            "longitude": 77.5946,
            "location": "Indiranagar, Bengaluru"
          },
          {
            "id": "VEN-BLR-004",
            "name": "Koramangala Office Network",
            "latitude": 12.9716,
            "longitude": 77.5946,
            "location": "Electronic City, Bengaluru"
          },
          {
            "id": "VEN-BLR-005",
            "name": "Electronic City Consumables",
            "latitude": 12.9716,
            "longitude": 77.5946,
            "location": "Jayanagar, Bengaluru"
          },
          {
            "id": "VEN-BLR-006",
            "name": "Jayanagar Paper Mart",
            "latitude": 12.9716,
            "longitude": 77.5946,
            "location": "Peenya Industrial Area, Bengaluru"
          },
          {
            "id": "VEN-BLR-007",
            "name": "Apex Karnataka Supplies",
            "latitude": 12.9716,
            "longitude": 77.5946,
            "location": "MG Road, Bengaluru"
          },
          {
            "id": "VEN-BLR-008",
            "name": "Metro Bengaluru Distro",
            "latitude": 12.9716,
            "longitude": 77.5946,
            "location": "Rajajinagar, Bengaluru"
          },
          {
            "id": "VEN-BLR-009",
            "name": "Zenith South Print Link",
            "latitude": 12.9716,
            "longitude": 77.5946,
            "location": "Hebbal, Bengaluru"
          },
          {
            "id": "VEN-BLR-010",
            "name": "Vanguard Tech Vendors",
            "latitude": 12.9716,
            "longitude": 77.5946,
            "location": "Malleshwaram, Bengaluru"
          }
        ]
      },
      {
        "city": "Mysuru",
        "latitude": 12.2958,
        "longitude": 76.6394,
        "suppliers": [
          {
            "id": "SUP-MYS-001",
            "name": "Chamundi Print Solutions",
            "latitude": 12.2958,
            "longitude": 76.6394,
            "location": "Hebbal Industrial Area, Mysuru"
          },
          {
            "id": "SUP-MYS-002",
            "name": "Mysore Toner Depot",
            "latitude": 12.2958,
            "longitude": 76.6394,
            "location": "Devaraja Mohalla, Mysuru"
          },
          {
            "id": "SUP-MYS-003",
            "name": "Hebbal MIDC Industrial Care",
            "latitude": 12.2958,
            "longitude": 76.6394,
            "location": "KRS Road, Mysuru"
          },
          {
            "id": "SUP-MYS-004",
            "name": "Heritage City Stationers",
            "latitude": 12.2958,
            "longitude": 76.6394,
            "location": "Saraswathipuram, Mysuru"
          },
          {
            "id": "SUP-MYS-005",
            "name": "Devaraja Mohalla Paper Mart",
            "latitude": 12.2958,
            "longitude": 76.6394,
            "location": "Kuvempunagar, Mysuru"
          },
          {
            "id": "SUP-MYS-006",
            "name": "Kuvempunagar Office Care",
            "latitude": 12.2958,
            "longitude": 76.6394,
            "location": "Jayalakshmipuram, Mysuru"
          },
          {
            "id": "SUP-MYS-007",
            "name": "Kaveri Cartridge World",
            "latitude": 12.2958,
            "longitude": 76.6394,
            "location": "Hootagalli, Mysuru"
          },
          {
            "id": "SUP-MYS-008",
            "name": "Saraswathipuram Tech Supplies",
            "latitude": 12.2958,
            "longitude": 76.6394,
            "location": "Nazarbad, Mysuru"
          },
          {
            "id": "SUP-MYS-009",
            "name": "Palace City Consumables",
            "latitude": 12.2958,
            "longitude": 76.6394,
            "location": "Metagalli, Mysuru"
          },
          {
            "id": "SUP-MYS-010",
            "name": "Hootagalli IT Supplies",
            "latitude": 12.2958,
            "longitude": 76.6394,
            "location": "Gokulam, Mysuru"
          }
        ],
        "vendors": [
          {
            "id": "VEN-MYS-001",
            "name": "Mysore Central Distro",
            "latitude": 12.2958,
            "longitude": 76.6394,
            "location": "Hebbal Industrial Area, Mysuru"
          },
          {
            "id": "VEN-MYS-002",
            "name": "Chamundeshwari Trade Link",
            "latitude": 12.2958,
            "longitude": 76.6394,
            "location": "Devaraja Mohalla, Mysuru"
          },
          {
            "id": "VEN-MYS-003",
            "name": "Hebbal Supply Partners",
            "latitude": 12.2958,
            "longitude": 76.6394,
            "location": "KRS Road, Mysuru"
          },
          {
            "id": "VEN-MYS-004",
            "name": "Devaraja Commercial Mart",
            "latitude": 12.2958,
            "longitude": 76.6394,
            "location": "Saraswathipuram, Mysuru"
          },
          {
            "id": "VEN-MYS-005",
            "name": "Heritage Office Solutions",
            "latitude": 12.2958,
            "longitude": 76.6394,
            "location": "Kuvempunagar, Mysuru"
          },
          {
            "id": "VEN-MYS-006",
            "name": "Kaveri Print Network",
            "latitude": 12.2958,
            "longitude": 76.6394,
            "location": "Jayalakshmipuram, Mysuru"
          },
          {
            "id": "VEN-MYS-007",
            "name": "Sandalwood City Vendors",
            "latitude": 12.2958,
            "longitude": 76.6394,
            "location": "Hootagalli, Mysuru"
          },
          {
            "id": "VEN-MYS-008",
            "name": "Jayalakshmi Office Products",
            "latitude": 12.2958,
            "longitude": 76.6394,
            "location": "Nazarbad, Mysuru"
          },
          {
            "id": "VEN-MYS-009",
            "name": "Gokulam Stationery Hub",
            "latitude": 12.2958,
            "longitude": 76.6394,
            "location": "Metagalli, Mysuru"
          },
          {
            "id": "VEN-MYS-010",
            "name": "Karnataka Heritage Distro",
            "latitude": 12.2958,
            "longitude": 76.6394,
            "location": "Gokulam, Mysuru"
          }
        ]
      },
      {
        "city": "Mangaluru",
        "latitude": 12.9141,
        "longitude": 74.856,
        "suppliers": [
          {
            "id": "SUP-MNG-001",
            "name": "Coastal Print Solutions",
            "latitude": 12.9141,
            "longitude": 74.856,
            "location": "Hampankatta, Mangaluru"
          },
          {
            "id": "SUP-MNG-002",
            "name": "Mangalore Cartridge Clinic",
            "latitude": 12.9141,
            "longitude": 74.856,
            "location": "Baikampady Industrial Area, Mangaluru"
          },
          {
            "id": "SUP-MNG-003",
            "name": "Baikampady Industrial Supplies",
            "latitude": 12.9141,
            "longitude": 74.856,
            "location": "Kodialbail, Mangaluru"
          },
          {
            "id": "SUP-MNG-004",
            "name": "Hampankatta Tech Mart",
            "latitude": 12.9141,
            "longitude": 74.856,
            "location": "Kankanady, Mangaluru"
          },
          {
            "id": "SUP-MNG-005",
            "name": "Karavali Paper House",
            "latitude": 12.9141,
            "longitude": 74.856,
            "location": "Kadri, Mangaluru"
          },
          {
            "id": "SUP-MNG-006",
            "name": "Kankanady Toner Depot",
            "latitude": 12.9141,
            "longitude": 74.856,
            "location": "Bejai, Mangaluru"
          },
          {
            "id": "SUP-MNG-007",
            "name": "Surathkal IT Supplies",
            "latitude": 12.9141,
            "longitude": 74.856,
            "location": "Pandeshwar, Mangaluru"
          },
          {
            "id": "SUP-MNG-008",
            "name": "Kodialbail Office Needs",
            "latitude": 12.9141,
            "longitude": 74.856,
            "location": "Surathkal, Mangaluru"
          },
          {
            "id": "SUP-MNG-009",
            "name": "Port City Consumables",
            "latitude": 12.9141,
            "longitude": 74.856,
            "location": "Car Street, Mangaluru"
          },
          {
            "id": "SUP-MNG-010",
            "name": "Mangaluru Digital Care",
            "latitude": 12.9141,
            "longitude": 74.856,
            "location": "Yeyyadi, Mangaluru"
          }
        ],
        "vendors": [
          {
            "id": "VEN-MNG-001",
            "name": "Karavali Trade Network",
            "latitude": 12.9141,
            "longitude": 74.856,
            "location": "Hampankatta, Mangaluru"
          },
          {
            "id": "VEN-MNG-002",
            "name": "Baikampady Distro Hub",
            "latitude": 12.9141,
            "longitude": 74.856,
            "location": "Baikampady Industrial Area, Mangaluru"
          },
          {
            "id": "VEN-MNG-003",
            "name": "Hampankatta Commercial Centre",
            "latitude": 12.9141,
            "longitude": 74.856,
            "location": "Kodialbail, Mangaluru"
          },
          {
            "id": "VEN-MNG-004",
            "name": "Coastal Karnataka Vendors",
            "latitude": 12.9141,
            "longitude": 74.856,
            "location": "Kankanady, Mangaluru"
          },
          {
            "id": "VEN-MNG-005",
            "name": "Surathkal Trade Link",
            "latitude": 12.9141,
            "longitude": 74.856,
            "location": "Kadri, Mangaluru"
          },
          {
            "id": "VEN-MNG-006",
            "name": "Kankanady Stationery Hub",
            "latitude": 12.9141,
            "longitude": 74.856,
            "location": "Bejai, Mangaluru"
          },
          {
            "id": "VEN-MNG-007",
            "name": "Arabian Sea Commercials",
            "latitude": 12.9141,
            "longitude": 74.856,
            "location": "Pandeshwar, Mangaluru"
          },
          {
            "id": "VEN-MNG-008",
            "name": "Apex Mangalore Distro",
            "latitude": 12.9141,
            "longitude": 74.856,
            "location": "Surathkal, Mangaluru"
          },
          {
            "id": "VEN-MNG-009",
            "name": "Kadri Office Systems",
            "latitude": 12.9141,
            "longitude": 74.856,
            "location": "Car Street, Mangaluru"
          },
          {
            "id": "VEN-MNG-010",
            "name": "Kodial Print Solutions",
            "latitude": 12.9141,
            "longitude": 74.856,
            "location": "Yeyyadi, Mangaluru"
          }
        ]
      },
      {
        "city": "Hubballi-Dharwad",
        "latitude": 15.3647,
        "longitude": 75.124,
        "suppliers": [
          {
            "id": "SUP-HUB-001",
            "name": "North Karnataka Print Hub",
            "latitude": 15.3647,
            "longitude": 75.124,
            "location": "Gokul Road, Hubballi-Dharwad"
          },
          {
            "id": "SUP-HUB-002",
            "name": "Hubli Cartridge Clinic",
            "latitude": 15.3647,
            "longitude": 75.124,
            "location": "Vidyanagar, Hubballi-Dharwad"
          },
          {
            "id": "SUP-HUB-003",
            "name": "Tarihal Industrial Supplies",
            "latitude": 15.3647,
            "longitude": 75.124,
            "location": "Tarihal Industrial Estate, Hubballi-Dharwad"
          },
          {
            "id": "SUP-HUB-004",
            "name": "Gokul Road Office Depot",
            "latitude": 15.3647,
            "longitude": 75.124,
            "location": "Koppikar Road, Hubballi-Dharwad"
          },
          {
            "id": "SUP-HUB-005",
            "name": "Dharwad Tech Stationers",
            "latitude": 15.3647,
            "longitude": 75.124,
            "location": "Dharwad Clock Tower, Hubballi-Dharwad"
          },
          {
            "id": "SUP-HUB-006",
            "name": "Koppikar Road Paper House",
            "latitude": 15.3647,
            "longitude": 75.124,
            "location": "Belur Industrial Area, Hubballi-Dharwad"
          },
          {
            "id": "SUP-HUB-007",
            "name": "Kittur Rani Chennamma Supplies",
            "latitude": 15.3647,
            "longitude": 75.124,
            "location": "Keshwapur, Hubballi-Dharwad"
          },
          {
            "id": "SUP-HUB-008",
            "name": "Belur Industrial Consumables",
            "latitude": 15.3647,
            "longitude": 75.124,
            "location": "Unkal, Hubballi-Dharwad"
          },
          {
            "id": "SUP-HUB-009",
            "name": "Vidyanagar Toner Care",
            "latitude": 15.3647,
            "longitude": 75.124,
            "location": "Navanagar, Hubballi-Dharwad"
          },
          {
            "id": "SUP-HUB-010",
            "name": "Twin City Print Mart",
            "latitude": 15.3647,
            "longitude": 75.124,
            "location": "Station Road, Hubballi-Dharwad"
          }
        ],
        "vendors": [
          {
            "id": "VEN-HUB-001",
            "name": "Hubballi Commercial Syndicate",
            "latitude": 15.3647,
            "longitude": 75.124,
            "location": "Gokul Road, Hubballi-Dharwad"
          },
          {
            "id": "VEN-HUB-002",
            "name": "Gokul Road Supply Link",
            "latitude": 15.3647,
            "longitude": 75.124,
            "location": "Vidyanagar, Hubballi-Dharwad"
          },
          {
            "id": "VEN-HUB-003",
            "name": "Tarihal Vendors Hub",
            "latitude": 15.3647,
            "longitude": 75.124,
            "location": "Tarihal Industrial Estate, Hubballi-Dharwad"
          },
          {
            "id": "VEN-HUB-004",
            "name": "Dharwad Trade Centre",
            "latitude": 15.3647,
            "longitude": 75.124,
            "location": "Koppikar Road, Hubballi-Dharwad"
          },
          {
            "id": "VEN-HUB-005",
            "name": "Koppikar Commercial Mart",
            "latitude": 15.3647,
            "longitude": 75.124,
            "location": "Dharwad Clock Tower, Hubballi-Dharwad"
          },
          {
            "id": "VEN-HUB-006",
            "name": "Twin Cities Distro",
            "latitude": 15.3647,
            "longitude": 75.124,
            "location": "Belur Industrial Area, Hubballi-Dharwad"
          },
          {
            "id": "VEN-HUB-007",
            "name": "North Karnataka Distro Network",
            "latitude": 15.3647,
            "longitude": 75.124,
            "location": "Keshwapur, Hubballi-Dharwad"
          },
          {
            "id": "VEN-HUB-008",
            "name": "Apex Hubli Supplies",
            "latitude": 15.3647,
            "longitude": 75.124,
            "location": "Unkal, Hubballi-Dharwad"
          },
          {
            "id": "VEN-HUB-009",
            "name": "Pragati Office Products",
            "latitude": 15.3647,
            "longitude": 75.124,
            "location": "Navanagar, Hubballi-Dharwad"
          },
          {
            "id": "VEN-HUB-010",
            "name": "Navanagar Tech Care",
            "latitude": 15.3647,
            "longitude": 75.124,
            "location": "Station Road, Hubballi-Dharwad"
          }
        ]
      },
      {
        "city": "Belagavi",
        "latitude": 15.8497,
        "longitude": 74.4977,
        "suppliers": [
          {
            "id": "SUP-BEL-001",
            "name": "Kunda City Print Care",
            "latitude": 15.8497,
            "longitude": 74.4977,
            "location": "Udyambag Industrial Estate, Belagavi"
          },
          {
            "id": "SUP-BEL-002",
            "name": "Belgaum Toner Depot",
            "latitude": 15.8497,
            "longitude": 74.4977,
            "location": "Khasbag, Belagavi"
          },
          {
            "id": "SUP-BEL-003",
            "name": "Udyambag Industrial Supplies",
            "latitude": 15.8497,
            "longitude": 74.4977,
            "location": "Tilakwadi, Belagavi"
          },
          {
            "id": "SUP-BEL-004",
            "name": "Tilakwadi Stationers",
            "latitude": 15.8497,
            "longitude": 74.4977,
            "location": "Bogarves, Belagavi"
          },
          {
            "id": "SUP-BEL-005",
            "name": "Auto Nagar Consumables",
            "latitude": 15.8497,
            "longitude": 74.4977,
            "location": "Khanapur Road, Belagavi"
          },
          {
            "id": "SUP-BEL-006",
            "name": "Shahapur Paper Mart",
            "latitude": 15.8497,
            "longitude": 74.4977,
            "location": "Auto Nagar, Belagavi"
          },
          {
            "id": "SUP-BEL-007",
            "name": "Belagavi Cartridge World",
            "latitude": 15.8497,
            "longitude": 74.4977,
            "location": "Camp Area, Belagavi"
          },
          {
            "id": "SUP-BEL-008",
            "name": "Western Ghats Office Care",
            "latitude": 15.8497,
            "longitude": 74.4977,
            "location": "Shahapur, Belagavi"
          },
          {
            "id": "SUP-BEL-009",
            "name": "Bogarves Tech Solutions",
            "latitude": 15.8497,
            "longitude": 74.4977,
            "location": "Hindwadi, Belagavi"
          },
          {
            "id": "SUP-BEL-010",
            "name": "Khasbag Print Pack",
            "latitude": 15.8497,
            "longitude": 74.4977,
            "location": "Nehru Nagar, Belagavi"
          }
        ],
        "vendors": [
          {
            "id": "VEN-BEL-001",
            "name": "Belgaum Trade Link",
            "latitude": 15.8497,
            "longitude": 74.4977,
            "location": "Udyambag Industrial Estate, Belagavi"
          },
          {
            "id": "VEN-BEL-002",
            "name": "Udyambag Supply Syndicate",
            "latitude": 15.8497,
            "longitude": 74.4977,
            "location": "Khasbag, Belagavi"
          },
          {
            "id": "VEN-BEL-003",
            "name": "Tilakwadi Commercial Agency",
            "latitude": 15.8497,
            "longitude": 74.4977,
            "location": "Tilakwadi, Belagavi"
          },
          {
            "id": "VEN-BEL-004",
            "name": "Auto Nagar Trade Partners",
            "latitude": 15.8497,
            "longitude": 74.4977,
            "location": "Bogarves, Belagavi"
          },
          {
            "id": "VEN-BEL-005",
            "name": "Shahapur Stationery Vendors",
            "latitude": 15.8497,
            "longitude": 74.4977,
            "location": "Khanapur Road, Belagavi"
          },
          {
            "id": "VEN-BEL-006",
            "name": "Apex Belagavi Distro",
            "latitude": 15.8497,
            "longitude": 74.4977,
            "location": "Auto Nagar, Belagavi"
          },
          {
            "id": "VEN-BEL-007",
            "name": "Maratha Karnataka Trade",
            "latitude": 15.8497,
            "longitude": 74.4977,
            "location": "Camp Area, Belagavi"
          },
          {
            "id": "VEN-BEL-008",
            "name": "Central Belgaum Mart",
            "latitude": 15.8497,
            "longitude": 74.4977,
            "location": "Shahapur, Belagavi"
          },
          {
            "id": "VEN-BEL-009",
            "name": "Shree Ganesh Consumables",
            "latitude": 15.8497,
            "longitude": 74.4977,
            "location": "Hindwadi, Belagavi"
          },
          {
            "id": "VEN-BEL-010",
            "name": "Pioneer Border Distro",
            "latitude": 15.8497,
            "longitude": 74.4977,
            "location": "Nehru Nagar, Belagavi"
          }
        ]
      },
      {
        "city": "Kalaburagi",
        "latitude": 17.3297,
        "longitude": 76.8343,
        "suppliers": [
          {
            "id": "SUP-KLB-001",
            "name": "Gulbarga Print Hub",
            "latitude": 17.3297,
            "longitude": 76.8343,
            "location": "Kapnoor Industrial Area, Kalaburagi"
          },
          {
            "id": "SUP-KLB-002",
            "name": "Kalaburagi Cartridge Clinic",
            "latitude": 17.3297,
            "longitude": 76.8343,
            "location": "Super Market, Kalaburagi"
          },
          {
            "id": "SUP-KLB-003",
            "name": "Kapnoor Industrial Supplies",
            "latitude": 17.3297,
            "longitude": 76.8343,
            "location": "MSK Mill Road, Kalaburagi"
          },
          {
            "id": "SUP-KLB-004",
            "name": "Super Market Stationers",
            "latitude": 17.3297,
            "longitude": 76.8343,
            "location": "Sedam Road, Kalaburagi"
          },
          {
            "id": "SUP-KLB-005",
            "name": "Kalyana Karnataka Paper",
            "latitude": 17.3297,
            "longitude": 76.8343,
            "location": "Aiwan-e-Shahi, Kalaburagi"
          },
          {
            "id": "SUP-KLB-006",
            "name": "Sedam Road Toner Care",
            "latitude": 17.3297,
            "longitude": 76.8343,
            "location": "Brahmpur, Kalaburagi"
          },
          {
            "id": "SUP-KLB-007",
            "name": "Bahmani City Tech Depot",
            "latitude": 17.3297,
            "longitude": 76.8343,
            "location": "GDA Layout, Kalaburagi"
          },
          {
            "id": "SUP-KLB-008",
            "name": "Sharanabasaveshwara Supplies",
            "latitude": 17.3297,
            "longitude": 76.8343,
            "location": "Station Road, Kalaburagi"
          },
          {
            "id": "SUP-KLB-009",
            "name": "Brahmpur Office Needs",
            "latitude": 17.3297,
            "longitude": 76.8343,
            "location": "Jewargi Road, Kalaburagi"
          },
          {
            "id": "SUP-KLB-010",
            "name": "Central Kalaburagi Care",
            "latitude": 17.3297,
            "longitude": 76.8343,
            "location": "Humnabad Ring Road, Kalaburagi"
          }
        ],
        "vendors": [
          {
            "id": "VEN-KLB-001",
            "name": "Kalaburagi Commercial Syndicate",
            "latitude": 17.3297,
            "longitude": 76.8343,
            "location": "Kapnoor Industrial Area, Kalaburagi"
          },
          {
            "id": "VEN-KLB-002",
            "name": "Kapnoor Supply Network",
            "latitude": 17.3297,
            "longitude": 76.8343,
            "location": "Super Market, Kalaburagi"
          },
          {
            "id": "VEN-KLB-003",
            "name": "Super Market Trade Link",
            "latitude": 17.3297,
            "longitude": 76.8343,
            "location": "MSK Mill Road, Kalaburagi"
          },
          {
            "id": "VEN-KLB-004",
            "name": "Gulbarga Business Distro",
            "latitude": 17.3297,
            "longitude": 76.8343,
            "location": "Sedam Road, Kalaburagi"
          },
          {
            "id": "VEN-KLB-005",
            "name": "Kalyana Karnataka Vendors",
            "latitude": 17.3297,
            "longitude": 76.8343,
            "location": "Aiwan-e-Shahi, Kalaburagi"
          },
          {
            "id": "VEN-KLB-006",
            "name": "Sedam Road Office Store",
            "latitude": 17.3297,
            "longitude": 76.8343,
            "location": "Brahmpur, Kalaburagi"
          },
          {
            "id": "VEN-KLB-007",
            "name": "Shree Sharan Commercials",
            "latitude": 17.3297,
            "longitude": 76.8343,
            "location": "GDA Layout, Kalaburagi"
          },
          {
            "id": "VEN-KLB-008",
            "name": "Apex Gulbarga Mart",
            "latitude": 17.3297,
            "longitude": 76.8343,
            "location": "Station Road, Kalaburagi"
          },
          {
            "id": "VEN-KLB-009",
            "name": "Pioneer Hyderabad-Karnataka Distro",
            "latitude": 17.3297,
            "longitude": 76.8343,
            "location": "Jewargi Road, Kalaburagi"
          },
          {
            "id": "VEN-KLB-010",
            "name": "Royal Bahmani Trade",
            "latitude": 17.3297,
            "longitude": 76.8343,
            "location": "Humnabad Ring Road, Kalaburagi"
          }
        ]
      },
      {
        "city": "Davanagere",
        "latitude": 14.4644,
        "longitude": 75.9218,
        "suppliers": [
          {
            "id": "SUP-DVG-001",
            "name": "Central Karnataka Print",
            "latitude": 14.4644,
            "longitude": 75.9218,
            "location": "PB Road, Davanagere"
          },
          {
            "id": "SUP-DVG-002",
            "name": "Davanagere Toner Clinic",
            "latitude": 14.4644,
            "longitude": 75.9218,
            "location": "Lokikere Industrial Area, Davanagere"
          },
          {
            "id": "SUP-DVG-003",
            "name": "Lokikere Industrial Care",
            "latitude": 14.4644,
            "longitude": 75.9218,
            "location": "MCC B Block, Davanagere"
          },
          {
            "id": "SUP-DVG-004",
            "name": "Mandipet Paper Mart",
            "latitude": 14.4644,
            "longitude": 75.9218,
            "location": "Mandipet, Davanagere"
          },
          {
            "id": "SUP-DVG-005",
            "name": "PB Road Office Depot",
            "latitude": 14.4644,
            "longitude": 75.9218,
            "location": "Durgambika Temple Area, Davanagere"
          },
          {
            "id": "SUP-DVG-006",
            "name": "Benne City Tech Supplies",
            "latitude": 14.4644,
            "longitude": 75.9218,
            "location": "Shamanur, Davanagere"
          },
          {
            "id": "SUP-DVG-007",
            "name": "MCC Stationery Mart",
            "latitude": 14.4644,
            "longitude": 75.9218,
            "location": "Anjaneya Badavane, Davanagere"
          },
          {
            "id": "SUP-DVG-008",
            "name": "Durgambika Print Care",
            "latitude": 14.4644,
            "longitude": 75.9218,
            "location": "Hadadi Road, Davanagere"
          },
          {
            "id": "SUP-DVG-009",
            "name": "Shamanur Commercial Needs",
            "latitude": 14.4644,
            "longitude": 75.9218,
            "location": "Vidyanagar, Davanagere"
          },
          {
            "id": "SUP-DVG-010",
            "name": "Apex Davanagere Cartridges",
            "latitude": 14.4644,
            "longitude": 75.9218,
            "location": "Doddapete, Davanagere"
          }
        ],
        "vendors": [
          {
            "id": "VEN-DVG-001",
            "name": "Davanagere Trade Centre",
            "latitude": 14.4644,
            "longitude": 75.9218,
            "location": "PB Road, Davanagere"
          },
          {
            "id": "VEN-DVG-002",
            "name": "Lokikere Supply Link",
            "latitude": 14.4644,
            "longitude": 75.9218,
            "location": "Lokikere Industrial Area, Davanagere"
          },
          {
            "id": "VEN-DVG-003",
            "name": "Mandipet Commercial Agency",
            "latitude": 14.4644,
            "longitude": 75.9218,
            "location": "MCC B Block, Davanagere"
          },
          {
            "id": "VEN-DVG-004",
            "name": "PB Road Vendors Syndicate",
            "latitude": 14.4644,
            "longitude": 75.9218,
            "location": "Mandipet, Davanagere"
          },
          {
            "id": "VEN-DVG-005",
            "name": "Central Karnataka Distro",
            "latitude": 14.4644,
            "longitude": 75.9218,
            "location": "Durgambika Temple Area, Davanagere"
          },
          {
            "id": "VEN-DVG-006",
            "name": "Benne Nagara Business Mart",
            "latitude": 14.4644,
            "longitude": 75.9218,
            "location": "Shamanur, Davanagere"
          },
          {
            "id": "VEN-DVG-007",
            "name": "Shamanur Stationery Distro",
            "latitude": 14.4644,
            "longitude": 75.9218,
            "location": "Anjaneya Badavane, Davanagere"
          },
          {
            "id": "VEN-DVG-008",
            "name": "Apex Textile Print Supplies",
            "latitude": 14.4644,
            "longitude": 75.9218,
            "location": "Hadadi Road, Davanagere"
          },
          {
            "id": "VEN-DVG-009",
            "name": "Kalyan Davanagere Mart",
            "latitude": 14.4644,
            "longitude": 75.9218,
            "location": "Vidyanagar, Davanagere"
          },
          {
            "id": "VEN-DVG-010",
            "name": "Premier Office Vendors",
            "latitude": 14.4644,
            "longitude": 75.9218,
            "location": "Doddapete, Davanagere"
          }
        ]
      },
      {
        "city": "Ballari",
        "latitude": 15.1394,
        "longitude": 76.9214,
        "suppliers": [
          {
            "id": "SUP-BAL-001",
            "name": "Steel City Print Care",
            "latitude": 15.1394,
            "longitude": 76.9214,
            "location": "Cantonment, Ballari"
          },
          {
            "id": "SUP-BAL-002",
            "name": "Ballari Toner Depot",
            "latitude": 15.1394,
            "longitude": 76.9214,
            "location": "Ananthapur Road, Ballari"
          },
          {
            "id": "SUP-BAL-003",
            "name": "Cantonment Office Supplies",
            "latitude": 15.1394,
            "longitude": 76.9214,
            "location": "Siruguppa Road, Ballari"
          },
          {
            "id": "SUP-BAL-004",
            "name": "Vijayanagar Empire Paper Mart",
            "latitude": 15.1394,
            "longitude": 76.9214,
            "location": "Gandhi Nagar, Ballari"
          },
          {
            "id": "SUP-BAL-005",
            "name": "Bellary Cartridge Clinic",
            "latitude": 15.1394,
            "longitude": 76.9214,
            "location": "Moka Road, Ballari"
          },
          {
            "id": "SUP-BAL-006",
            "name": "Gandhi Nagar Stationers",
            "latitude": 15.1394,
            "longitude": 76.9214,
            "location": "Fort Area, Ballari"
          },
          {
            "id": "SUP-BAL-007",
            "name": "Tungabhadra Tech Link",
            "latitude": 15.1394,
            "longitude": 76.9214,
            "location": "Radio Park, Ballari"
          },
          {
            "id": "SUP-BAL-008",
            "name": "Ananthapur Road Industrial Needs",
            "latitude": 15.1394,
            "longitude": 76.9214,
            "location": "Kudligi Road, Ballari"
          },
          {
            "id": "SUP-BAL-009",
            "name": "Fort City Consumables",
            "latitude": 15.1394,
            "longitude": 76.9214,
            "location": "Millerpet, Ballari"
          },
          {
            "id": "SUP-BAL-010",
            "name": "Hampi Route Print Care",
            "latitude": 15.1394,
            "longitude": 76.9214,
            "location": "Patel Nagar, Ballari"
          }
        ],
        "vendors": [
          {
            "id": "VEN-BAL-001",
            "name": "Ballari Commercial Syndicate",
            "latitude": 15.1394,
            "longitude": 76.9214,
            "location": "Cantonment, Ballari"
          },
          {
            "id": "VEN-BAL-002",
            "name": "Cantonment Supply Network",
            "latitude": 15.1394,
            "longitude": 76.9214,
            "location": "Ananthapur Road, Ballari"
          },
          {
            "id": "VEN-BAL-003",
            "name": "Bellary Trade Partners",
            "latitude": 15.1394,
            "longitude": 76.9214,
            "location": "Siruguppa Road, Ballari"
          },
          {
            "id": "VEN-BAL-004",
            "name": "Gandhi Nagar Commercial Mart",
            "latitude": 15.1394,
            "longitude": 76.9214,
            "location": "Gandhi Nagar, Ballari"
          },
          {
            "id": "VEN-BAL-005",
            "name": "Steel City Distro Hub",
            "latitude": 15.1394,
            "longitude": 76.9214,
            "location": "Moka Road, Ballari"
          },
          {
            "id": "VEN-BAL-006",
            "name": "Vijayanagar Business Link",
            "latitude": 15.1394,
            "longitude": 76.9214,
            "location": "Fort Area, Ballari"
          },
          {
            "id": "VEN-BAL-007",
            "name": "Tungabhadra Office Products",
            "latitude": 15.1394,
            "longitude": 76.9214,
            "location": "Radio Park, Ballari"
          },
          {
            "id": "VEN-BAL-008",
            "name": "Apex Bellary Vendors",
            "latitude": 15.1394,
            "longitude": 76.9214,
            "location": "Kudligi Road, Ballari"
          },
          {
            "id": "VEN-BAL-009",
            "name": "Hampi Heritage Distro",
            "latitude": 15.1394,
            "longitude": 76.9214,
            "location": "Millerpet, Ballari"
          },
          {
            "id": "VEN-BAL-010",
            "name": "Pioneer Mineral & Tech Trade",
            "latitude": 15.1394,
            "longitude": 76.9214,
            "location": "Patel Nagar, Ballari"
          }
        ]
      }
    ]
  },
  {
    "state": "Andhra Pradesh",
    "latitude": 15.9129,
    "longitude": 79.74,
    "hub": {
      "city": "Visakhapatnam",
      "latitude": 17.6868,
      "longitude": 83.2185
    },
    "cities": [
      {
        "city": "Visakhapatnam",
        "latitude": 17.6868,
        "longitude": 83.2185,
        "suppliers": [
          {
            "id": "SUP-VIZ-001",
            "name": "Vizag Port Print Solutions",
            "latitude": 17.6868,
            "longitude": 83.2185,
            "location": "Dwaraka Nagar, Visakhapatnam"
          },
          {
            "id": "SUP-VIZ-002",
            "name": "Dwaraka Nagar Toner Clinic",
            "latitude": 17.6868,
            "longitude": 83.2185,
            "location": "Gajuwaka, Visakhapatnam"
          },
          {
            "id": "SUP-VIZ-003",
            "name": "Gajuwaka Industrial Supplies",
            "latitude": 17.6868,
            "longitude": 83.2185,
            "location": "Siripuram, Visakhapatnam"
          },
          {
            "id": "SUP-VIZ-004",
            "name": "Siripuram Tech Stationers",
            "latitude": 17.6868,
            "longitude": 83.2185,
            "location": "MVP Colony, Visakhapatnam"
          },
          {
            "id": "SUP-VIZ-005",
            "name": "Rushikonda IT Consumables",
            "latitude": 17.6868,
            "longitude": 83.2185,
            "location": "Madhurawada, Visakhapatnam"
          },
          {
            "id": "SUP-VIZ-006",
            "name": "Steel City Office Care",
            "latitude": 17.6868,
            "longitude": 83.2185,
            "location": "Rushikonda IT SEZ, Visakhapatnam"
          },
          {
            "id": "SUP-VIZ-007",
            "name": "MVP Colony Cartridge Hub",
            "latitude": 17.6868,
            "longitude": 83.2185,
            "location": "Daba Gardens, Visakhapatnam"
          },
          {
            "id": "SUP-VIZ-008",
            "name": "Daba Gardens Paper Mart",
            "latitude": 17.6868,
            "longitude": 83.2185,
            "location": "Jagadamba Centre, Visakhapatnam"
          },
          {
            "id": "SUP-VIZ-009",
            "name": "Andhra Coastal Supplies",
            "latitude": 17.6868,
            "longitude": 83.2185,
            "location": "Waltair Uplands, Visakhapatnam"
          },
          {
            "id": "SUP-VIZ-010",
            "name": "Bay City Print Systems",
            "latitude": 17.6868,
            "longitude": 83.2185,
            "location": "Pendurthi, Visakhapatnam"
          }
        ],
        "vendors": [
          {
            "id": "VEN-VIZ-001",
            "name": "Vizag Commercial Syndicate",
            "latitude": 17.6868,
            "longitude": 83.2185,
            "location": "Dwaraka Nagar, Visakhapatnam"
          },
          {
            "id": "VEN-VIZ-002",
            "name": "Gajuwaka Supply Chain",
            "latitude": 17.6868,
            "longitude": 83.2185,
            "location": "Gajuwaka, Visakhapatnam"
          },
          {
            "id": "VEN-VIZ-003",
            "name": "Dwaraka Nagar Trade Link",
            "latitude": 17.6868,
            "longitude": 83.2185,
            "location": "Siripuram, Visakhapatnam"
          },
          {
            "id": "VEN-VIZ-004",
            "name": "Siripuram Office Mart",
            "latitude": 17.6868,
            "longitude": 83.2185,
            "location": "MVP Colony, Visakhapatnam"
          },
          {
            "id": "VEN-VIZ-005",
            "name": "Madhurawada Vendors Network",
            "latitude": 17.6868,
            "longitude": 83.2185,
            "location": "Madhurawada, Visakhapatnam"
          },
          {
            "id": "VEN-VIZ-006",
            "name": "Rushikonda Distro Partner",
            "latitude": 17.6868,
            "longitude": 83.2185,
            "location": "Rushikonda IT SEZ, Visakhapatnam"
          },
          {
            "id": "VEN-VIZ-007",
            "name": "Jagadamba Commercial Store",
            "latitude": 17.6868,
            "longitude": 83.2185,
            "location": "Daba Gardens, Visakhapatnam"
          },
          {
            "id": "VEN-VIZ-008",
            "name": "Waltair Print Solutions",
            "latitude": 17.6868,
            "longitude": 83.2185,
            "location": "Jagadamba Centre, Visakhapatnam"
          },
          {
            "id": "VEN-VIZ-009",
            "name": "Apex Andhra Coastal Mart",
            "latitude": 17.6868,
            "longitude": 83.2185,
            "location": "Waltair Uplands, Visakhapatnam"
          },
          {
            "id": "VEN-VIZ-010",
            "name": "Vanguard Vizag Distro",
            "latitude": 17.6868,
            "longitude": 83.2185,
            "location": "Pendurthi, Visakhapatnam"
          }
        ]
      },
      {
        "city": "Vijayawada",
        "latitude": 16.5062,
        "longitude": 80.648,
        "suppliers": [
          {
            "id": "SUP-VIJ-001",
            "name": "Krishna River Print Hub",
            "latitude": 16.5062,
            "longitude": 80.648,
            "location": "Governorpet, Vijayawada"
          },
          {
            "id": "SUP-VIJ-002",
            "name": "Vijayawada Toner Care",
            "latitude": 16.5062,
            "longitude": 80.648,
            "location": "Autonagar Industrial Area, Vijayawada"
          },
          {
            "id": "SUP-VIJ-003",
            "name": "Autonagar Industrial Consumables",
            "latitude": 16.5062,
            "longitude": 80.648,
            "location": "MG Road, Vijayawada"
          },
          {
            "id": "SUP-VIJ-004",
            "name": "Governorpet Paper Mart",
            "latitude": 16.5062,
            "longitude": 80.648,
            "location": "Benz Circle, Vijayawada"
          },
          {
            "id": "SUP-VIJ-005",
            "name": "Benz Circle Tech Supplies",
            "latitude": 16.5062,
            "longitude": 80.648,
            "location": "One Town, Vijayawada"
          },
          {
            "id": "SUP-VIJ-006",
            "name": "Amaravati Route Office Care",
            "latitude": 16.5062,
            "longitude": 80.648,
            "location": "Bhavanipuram, Vijayawada"
          },
          {
            "id": "SUP-VIJ-007",
            "name": "Kanakadurga Cartridge Depot",
            "latitude": 16.5062,
            "longitude": 80.648,
            "location": "Kankipadu, Vijayawada"
          },
          {
            "id": "SUP-VIJ-008",
            "name": "MG Road Stationers",
            "latitude": 16.5062,
            "longitude": 80.648,
            "location": "Gollapudi, Vijayawada"
          },
          {
            "id": "SUP-VIJ-009",
            "name": "Labbipet Office Depot",
            "latitude": 16.5062,
            "longitude": 80.648,
            "location": "Patamata, Vijayawada"
          },
          {
            "id": "SUP-VIJ-010",
            "name": "Bhavanipuram Print Pack",
            "latitude": 16.5062,
            "longitude": 80.648,
            "location": "Labbipet, Vijayawada"
          }
        ],
        "vendors": [
          {
            "id": "VEN-VIJ-001",
            "name": "Vijayawada Trade Centre",
            "latitude": 16.5062,
            "longitude": 80.648,
            "location": "Governorpet, Vijayawada"
          },
          {
            "id": "VEN-VIJ-002",
            "name": "Autonagar Supply Syndicate",
            "latitude": 16.5062,
            "longitude": 80.648,
            "location": "Autonagar Industrial Area, Vijayawada"
          },
          {
            "id": "VEN-VIJ-003",
            "name": "Governorpet Commercial Mart",
            "latitude": 16.5062,
            "longitude": 80.648,
            "location": "MG Road, Vijayawada"
          },
          {
            "id": "VEN-VIJ-004",
            "name": "Benz Circle Distro Line",
            "latitude": 16.5062,
            "longitude": 80.648,
            "location": "Benz Circle, Vijayawada"
          },
          {
            "id": "VEN-VIJ-005",
            "name": "Amaravati Commercial Syndicate",
            "latitude": 16.5062,
            "longitude": 80.648,
            "location": "One Town, Vijayawada"
          },
          {
            "id": "VEN-VIJ-006",
            "name": "One Town Paper Vendors",
            "latitude": 16.5062,
            "longitude": 80.648,
            "location": "Bhavanipuram, Vijayawada"
          },
          {
            "id": "VEN-VIJ-007",
            "name": "Bhavanipuram Trade Link",
            "latitude": 16.5062,
            "longitude": 80.648,
            "location": "Kankipadu, Vijayawada"
          },
          {
            "id": "VEN-VIJ-008",
            "name": "Kanakadurga Commercial Care",
            "latitude": 16.5062,
            "longitude": 80.648,
            "location": "Gollapudi, Vijayawada"
          },
          {
            "id": "VEN-VIJ-009",
            "name": "Apex Krishna Distro",
            "latitude": 16.5062,
            "longitude": 80.648,
            "location": "Patamata, Vijayawada"
          },
          {
            "id": "VEN-VIJ-010",
            "name": "Pioneer Andhra Business Mart",
            "latitude": 16.5062,
            "longitude": 80.648,
            "location": "Labbipet, Vijayawada"
          }
        ]
      },
      {
        "city": "Guntur",
        "latitude": 16.3067,
        "longitude": 80.4365,
        "suppliers": [
          {
            "id": "SUP-GUN-001",
            "name": "Guntur Mirchi Print Hub",
            "latitude": 16.3067,
            "longitude": 80.4365,
            "location": "Brodipet, Guntur"
          },
          {
            "id": "SUP-GUN-002",
            "name": "Brodipet Cartridge Clinic",
            "latitude": 16.3067,
            "longitude": 80.4365,
            "location": "Arundelpet, Guntur"
          },
          {
            "id": "SUP-GUN-003",
            "name": "Arundelpet Toner Care",
            "latitude": 16.3067,
            "longitude": 80.4365,
            "location": "Autonagar, Guntur"
          },
          {
            "id": "SUP-GUN-004",
            "name": "Autonagar Industrial Supplies",
            "latitude": 16.3067,
            "longitude": 80.4365,
            "location": "Kothapet, Guntur"
          },
          {
            "id": "SUP-GUN-005",
            "name": "Kothapet Paper House",
            "latitude": 16.3067,
            "longitude": 80.4365,
            "location": "Pattabhipuram, Guntur"
          },
          {
            "id": "SUP-GUN-006",
            "name": "Amaravati Capital Supplies",
            "latitude": 16.3067,
            "longitude": 80.4365,
            "location": "Nallapadu, Guntur"
          },
          {
            "id": "SUP-GUN-007",
            "name": "Pattabhipuram Office Needs",
            "latitude": 16.3067,
            "longitude": 80.4365,
            "location": "Brindavan Gardens, Guntur"
          },
          {
            "id": "SUP-GUN-008",
            "name": "Brindavan Gardens Tech Store",
            "latitude": 16.3067,
            "longitude": 80.4365,
            "location": "Gorantla, Guntur"
          },
          {
            "id": "SUP-GUN-009",
            "name": "Guntur District Consumables",
            "latitude": 16.3067,
            "longitude": 80.4365,
            "location": "Old Guntur, Guntur"
          },
          {
            "id": "SUP-GUN-010",
            "name": "Shree Balaji Print Care",
            "latitude": 16.3067,
            "longitude": 80.4365,
            "location": "Chandramouli Nagar, Guntur"
          }
        ],
        "vendors": [
          {
            "id": "VEN-GUN-001",
            "name": "Guntur Commercial Agency",
            "latitude": 16.3067,
            "longitude": 80.4365,
            "location": "Brodipet, Guntur"
          },
          {
            "id": "VEN-GUN-002",
            "name": "Brodipet Supply Partners",
            "latitude": 16.3067,
            "longitude": 80.4365,
            "location": "Arundelpet, Guntur"
          },
          {
            "id": "VEN-GUN-003",
            "name": "Arundelpet Trade Network",
            "latitude": 16.3067,
            "longitude": 80.4365,
            "location": "Autonagar, Guntur"
          },
          {
            "id": "VEN-GUN-004",
            "name": "Autonagar Commercial Mart",
            "latitude": 16.3067,
            "longitude": 80.4365,
            "location": "Kothapet, Guntur"
          },
          {
            "id": "VEN-GUN-005",
            "name": "Kothapet Stationery Distro",
            "latitude": 16.3067,
            "longitude": 80.4365,
            "location": "Pattabhipuram, Guntur"
          },
          {
            "id": "VEN-GUN-006",
            "name": "Amaravati Trade Link",
            "latitude": 16.3067,
            "longitude": 80.4365,
            "location": "Nallapadu, Guntur"
          },
          {
            "id": "VEN-GUN-007",
            "name": "Nallapadu Distro Syndicate",
            "latitude": 16.3067,
            "longitude": 80.4365,
            "location": "Brindavan Gardens, Guntur"
          },
          {
            "id": "VEN-GUN-008",
            "name": "Apex Guntur Supplies",
            "latitude": 16.3067,
            "longitude": 80.4365,
            "location": "Gorantla, Guntur"
          },
          {
            "id": "VEN-GUN-009",
            "name": "Pioneer Spices & Tech Mart",
            "latitude": 16.3067,
            "longitude": 80.4365,
            "location": "Old Guntur, Guntur"
          },
          {
            "id": "VEN-GUN-010",
            "name": "City Central Office Vendors",
            "latitude": 16.3067,
            "longitude": 80.4365,
            "location": "Chandramouli Nagar, Guntur"
          }
        ]
      },
      {
        "city": "Nellore",
        "latitude": 14.4426,
        "longitude": 79.9865,
        "suppliers": [
          {
            "id": "SUP-NEL-001",
            "name": "Penna River Print Solutions",
            "latitude": 14.4426,
            "longitude": 79.9865,
            "location": "VRC Centre, Nellore"
          },
          {
            "id": "SUP-NEL-002",
            "name": "Nellore Toner Care",
            "latitude": 14.4426,
            "longitude": 79.9865,
            "location": "Pogathota, Nellore"
          },
          {
            "id": "SUP-NEL-003",
            "name": "Trunk Road Office Depot",
            "latitude": 14.4426,
            "longitude": 79.9865,
            "location": "Magunta Layout, Nellore"
          },
          {
            "id": "SUP-NEL-004",
            "name": "Pogathota Paper Mart",
            "latitude": 14.4426,
            "longitude": 79.9865,
            "location": "Dargamitta, Nellore"
          },
          {
            "id": "SUP-NEL-005",
            "name": "Magunta Layout Cartridge Clinic",
            "latitude": 14.4426,
            "longitude": 79.9865,
            "location": "Stonehousepet, Nellore"
          },
          {
            "id": "SUP-NEL-006",
            "name": "Simhapuri Stationers",
            "latitude": 14.4426,
            "longitude": 79.9865,
            "location": "Trunk Road, Nellore"
          },
          {
            "id": "SUP-NEL-007",
            "name": "VRC Centre Tech Store",
            "latitude": 14.4426,
            "longitude": 79.9865,
            "location": "Vedayapalem, Nellore"
          },
          {
            "id": "SUP-NEL-008",
            "name": "Coastal Andhra Consumables",
            "latitude": 14.4426,
            "longitude": 79.9865,
            "location": "Santhapet, Nellore"
          },
          {
            "id": "SUP-NEL-009",
            "name": "Dargamitta Office Needs",
            "latitude": 14.4426,
            "longitude": 79.9865,
            "location": "Balaji Nagar, Nellore"
          },
          {
            "id": "SUP-NEL-010",
            "name": "Shree Venkateswara Print Hub",
            "latitude": 14.4426,
            "longitude": 79.9865,
            "location": "Podalakur Road, Nellore"
          }
        ],
        "vendors": [
          {
            "id": "VEN-NEL-001",
            "name": "Nellore Commercial Syndicate",
            "latitude": 14.4426,
            "longitude": 79.9865,
            "location": "VRC Centre, Nellore"
          },
          {
            "id": "VEN-NEL-002",
            "name": "Trunk Road Trade Link",
            "latitude": 14.4426,
            "longitude": 79.9865,
            "location": "Pogathota, Nellore"
          },
          {
            "id": "VEN-NEL-003",
            "name": "Pogathota Supply Network",
            "latitude": 14.4426,
            "longitude": 79.9865,
            "location": "Magunta Layout, Nellore"
          },
          {
            "id": "VEN-NEL-004",
            "name": "Magunta Layout Vendors",
            "latitude": 14.4426,
            "longitude": 79.9865,
            "location": "Dargamitta, Nellore"
          },
          {
            "id": "VEN-NEL-005",
            "name": "Simhapuri Commercial Mart",
            "latitude": 14.4426,
            "longitude": 79.9865,
            "location": "Stonehousepet, Nellore"
          },
          {
            "id": "VEN-NEL-006",
            "name": "Stonehousepet Distro Hub",
            "latitude": 14.4426,
            "longitude": 79.9865,
            "location": "Trunk Road, Nellore"
          },
          {
            "id": "VEN-NEL-007",
            "name": "Vedayapalem Office Products",
            "latitude": 14.4426,
            "longitude": 79.9865,
            "location": "Vedayapalem, Nellore"
          },
          {
            "id": "VEN-NEL-008",
            "name": "Apex Nellore Distro",
            "latitude": 14.4426,
            "longitude": 79.9865,
            "location": "Santhapet, Nellore"
          },
          {
            "id": "VEN-NEL-009",
            "name": "Kalyan Simhapuri Trade",
            "latitude": 14.4426,
            "longitude": 79.9865,
            "location": "Balaji Nagar, Nellore"
          },
          {
            "id": "VEN-NEL-010",
            "name": "Vanguard Nellore Supplies",
            "latitude": 14.4426,
            "longitude": 79.9865,
            "location": "Podalakur Road, Nellore"
          }
        ]
      },
      {
        "city": "Kurnool",
        "latitude": 15.8281,
        "longitude": 78.0373,
        "suppliers": [
          {
            "id": "SUP-KUR-001",
            "name": "Rayalaseema Print Hub",
            "latitude": 15.8281,
            "longitude": 78.0373,
            "location": "Dhone Road, Kurnool"
          },
          {
            "id": "SUP-KUR-002",
            "name": "Kurnool Cartridge Clinic",
            "latitude": 15.8281,
            "longitude": 78.0373,
            "location": "Mourya Inn Area, Kurnool"
          },
          {
            "id": "SUP-KUR-003",
            "name": "Kallur Industrial Supplies",
            "latitude": 15.8281,
            "longitude": 78.0373,
            "location": "Kallur Industrial Estate, Kurnool"
          },
          {
            "id": "SUP-KUR-004",
            "name": "Gateway of Rayalaseema Stationers",
            "latitude": 15.8281,
            "longitude": 78.0373,
            "location": "Nandyal Checkpost, Kurnool"
          },
          {
            "id": "SUP-KUR-005",
            "name": "Tungabhadra Paper Mart",
            "latitude": 15.8281,
            "longitude": 78.0373,
            "location": "Park Road, Kurnool"
          },
          {
            "id": "SUP-KUR-006",
            "name": "Park Road Toner Care",
            "latitude": 15.8281,
            "longitude": 78.0373,
            "location": "Budhawarapet, Kurnool"
          },
          {
            "id": "SUP-KUR-007",
            "name": "Nandyal Road Tech Store",
            "latitude": 15.8281,
            "longitude": 78.0373,
            "location": "B Camp, Kurnool"
          },
          {
            "id": "SUP-KUR-008",
            "name": "Mourya Office Supplies",
            "latitude": 15.8281,
            "longitude": 78.0373,
            "location": "Gayatri Estate, Kurnool"
          },
          {
            "id": "SUP-KUR-009",
            "name": "Kurnool Fort Consumables",
            "latitude": 15.8281,
            "longitude": 78.0373,
            "location": "Old City, Kurnool"
          },
          {
            "id": "SUP-KUR-010",
            "name": "Shree Raghavendra Print Tech",
            "latitude": 15.8281,
            "longitude": 78.0373,
            "location": "Venkatramana Colony, Kurnool"
          }
        ],
        "vendors": [
          {
            "id": "VEN-KUR-001",
            "name": "Kurnool Trade Centre",
            "latitude": 15.8281,
            "longitude": 78.0373,
            "location": "Dhone Road, Kurnool"
          },
          {
            "id": "VEN-KUR-002",
            "name": "Kallur Supply Network",
            "latitude": 15.8281,
            "longitude": 78.0373,
            "location": "Mourya Inn Area, Kurnool"
          },
          {
            "id": "VEN-KUR-003",
            "name": "Rayalaseema Business Mart",
            "latitude": 15.8281,
            "longitude": 78.0373,
            "location": "Kallur Industrial Estate, Kurnool"
          },
          {
            "id": "VEN-KUR-004",
            "name": "Nandyal Checkpost Distro",
            "latitude": 15.8281,
            "longitude": 78.0373,
            "location": "Nandyal Checkpost, Kurnool"
          },
          {
            "id": "VEN-KUR-005",
            "name": "Park Road Commercial Agency",
            "latitude": 15.8281,
            "longitude": 78.0373,
            "location": "Park Road, Kurnool"
          },
          {
            "id": "VEN-KUR-006",
            "name": "Budhawarapet Stationery Mart",
            "latitude": 15.8281,
            "longitude": 78.0373,
            "location": "Budhawarapet, Kurnool"
          },
          {
            "id": "VEN-KUR-007",
            "name": "Apex Kurnool Vendors",
            "latitude": 15.8281,
            "longitude": 78.0373,
            "location": "B Camp, Kurnool"
          },
          {
            "id": "VEN-KUR-008",
            "name": "Raghavendra Trade Syndicate",
            "latitude": 15.8281,
            "longitude": 78.0373,
            "location": "Gayatri Estate, Kurnool"
          },
          {
            "id": "VEN-KUR-009",
            "name": "Pioneer Rayalaseema Distro",
            "latitude": 15.8281,
            "longitude": 78.0373,
            "location": "Old City, Kurnool"
          },
          {
            "id": "VEN-KUR-010",
            "name": "City Gate Office Supplies",
            "latitude": 15.8281,
            "longitude": 78.0373,
            "location": "Venkatramana Colony, Kurnool"
          }
        ]
      },
      {
        "city": "Rajahmundry",
        "latitude": 17.0005,
        "longitude": 81.804,
        "suppliers": [
          {
            "id": "SUP-RAJ_AP-001",
            "name": "Godavari River Print Care",
            "latitude": 17.0005,
            "longitude": 81.804,
            "location": "Main Road, Rajahmundry"
          },
          {
            "id": "SUP-RAJ_AP-002",
            "name": "Rajahmundry Toner Depot",
            "latitude": 17.0005,
            "longitude": 81.804,
            "location": "Danavaipeta, Rajahmundry"
          },
          {
            "id": "SUP-RAJ_AP-003",
            "name": "Main Road Paper Mart",
            "latitude": 17.0005,
            "longitude": 81.804,
            "location": "Kotipalli Bus Stand Area, Rajahmundry"
          },
          {
            "id": "SUP-RAJ_AP-004",
            "name": "Danavaipeta Cartridge Clinic",
            "latitude": 17.0005,
            "longitude": 81.804,
            "location": "Morampudi, Rajahmundry"
          },
          {
            "id": "SUP-RAJ_AP-005",
            "name": "Cultural Capital Office Systems",
            "latitude": 17.0005,
            "longitude": 81.804,
            "location": "Aryapuram, Rajahmundry"
          },
          {
            "id": "SUP-RAJ_AP-006",
            "name": "Morampudi Tech Solutions",
            "latitude": 17.0005,
            "longitude": 81.804,
            "location": "Innespeta, Rajahmundry"
          },
          {
            "id": "SUP-RAJ_AP-007",
            "name": "Dowleswaram Industrial Supplies",
            "latitude": 17.0005,
            "longitude": 81.804,
            "location": "Lalacheruvu, Rajahmundry"
          },
          {
            "id": "SUP-RAJ_AP-008",
            "name": "Aryapuram Stationery Mart",
            "latitude": 17.0005,
            "longitude": 81.804,
            "location": "Kambala Cheruvu, Rajahmundry"
          },
          {
            "id": "SUP-RAJ_AP-009",
            "name": "East Godavari Consumables",
            "latitude": 17.0005,
            "longitude": 81.804,
            "location": "Prakash Nagar, Rajahmundry"
          },
          {
            "id": "SUP-RAJ_AP-010",
            "name": "Akhanda Godavari Print",
            "latitude": 17.0005,
            "longitude": 81.804,
            "location": "Dowleswaram, Rajahmundry"
          }
        ],
        "vendors": [
          {
            "id": "VEN-RAJ_AP-001",
            "name": "Rajahmundry Commercial Centre",
            "latitude": 17.0005,
            "longitude": 81.804,
            "location": "Main Road, Rajahmundry"
          },
          {
            "id": "VEN-RAJ_AP-002",
            "name": "Danavaipeta Supply Link",
            "latitude": 17.0005,
            "longitude": 81.804,
            "location": "Danavaipeta, Rajahmundry"
          },
          {
            "id": "VEN-RAJ_AP-003",
            "name": "Main Road Trade Network",
            "latitude": 17.0005,
            "longitude": 81.804,
            "location": "Kotipalli Bus Stand Area, Rajahmundry"
          },
          {
            "id": "VEN-RAJ_AP-004",
            "name": "East Godavari Business Distro",
            "latitude": 17.0005,
            "longitude": 81.804,
            "location": "Morampudi, Rajahmundry"
          },
          {
            "id": "VEN-RAJ_AP-005",
            "name": "Godavari Trade Syndicate",
            "latitude": 17.0005,
            "longitude": 81.804,
            "location": "Aryapuram, Rajahmundry"
          },
          {
            "id": "VEN-RAJ_AP-006",
            "name": "Morampudi Vendors Hub",
            "latitude": 17.0005,
            "longitude": 81.804,
            "location": "Innespeta, Rajahmundry"
          },
          {
            "id": "VEN-RAJ_AP-007",
            "name": "Kotipalli Commercial Mart",
            "latitude": 17.0005,
            "longitude": 81.804,
            "location": "Lalacheruvu, Rajahmundry"
          },
          {
            "id": "VEN-RAJ_AP-008",
            "name": "Apex Godavari Supplies",
            "latitude": 17.0005,
            "longitude": 81.804,
            "location": "Kambala Cheruvu, Rajahmundry"
          },
          {
            "id": "VEN-RAJ_AP-009",
            "name": "Kalyan Rajahmundry Distro",
            "latitude": 17.0005,
            "longitude": 81.804,
            "location": "Prakash Nagar, Rajahmundry"
          },
          {
            "id": "VEN-RAJ_AP-010",
            "name": "Heritage Andhra Stationers",
            "latitude": 17.0005,
            "longitude": 81.804,
            "location": "Dowleswaram, Rajahmundry"
          }
        ]
      },
      {
        "city": "Tirupati",
        "latitude": 13.6288,
        "longitude": 79.4192,
        "suppliers": [
          {
            "id": "SUP-TIR-001",
            "name": "Balaji Print Solutions",
            "latitude": 13.6288,
            "longitude": 79.4192,
            "location": "Renigunta Road, Tirupati"
          },
          {
            "id": "SUP-TIR-002",
            "name": "Tirupati Cartridge Clinic",
            "latitude": 13.6288,
            "longitude": 79.4192,
            "location": "Bhavani Nagar, Tirupati"
          },
          {
            "id": "SUP-TIR-003",
            "name": "Renigunta Industrial Supplies",
            "latitude": 13.6288,
            "longitude": 79.4192,
            "location": "AIR Bypass Road, Tirupati"
          },
          {
            "id": "SUP-TIR-004",
            "name": "Seven Hills Toner Depot",
            "latitude": 13.6288,
            "longitude": 79.4192,
            "location": "Alipiri, Tirupati"
          },
          {
            "id": "SUP-TIR-005",
            "name": "Bhavani Nagar Paper Mart",
            "latitude": 13.6288,
            "longitude": 79.4192,
            "location": "Balaji Colony, Tirupati"
          },
          {
            "id": "SUP-TIR-006",
            "name": "Alipiri Office Care",
            "latitude": 13.6288,
            "longitude": 79.4192,
            "location": "Korlagunta, Tirupati"
          },
          {
            "id": "SUP-TIR-007",
            "name": "AIR Bypass Stationers",
            "latitude": 13.6288,
            "longitude": 79.4192,
            "location": "Chandragiri Road, Tirupati"
          },
          {
            "id": "SUP-TIR-008",
            "name": "Sri Venkateswara Tech Supplies",
            "latitude": 13.6288,
            "longitude": 79.4192,
            "location": "RTC Bus Stand Area, Tirupati"
          },
          {
            "id": "SUP-TIR-009",
            "name": "Balaji Colony Consumables",
            "latitude": 13.6288,
            "longitude": 79.4192,
            "location": "Leela Mahal Area, Tirupati"
          },
          {
            "id": "SUP-TIR-010",
            "name": "Tirumala Valley Print Tech",
            "latitude": 13.6288,
            "longitude": 79.4192,
            "location": "Karakambadi Road, Tirupati"
          }
        ],
        "vendors": [
          {
            "id": "VEN-TIR-001",
            "name": "Tirupati Commercial Syndicate",
            "latitude": 13.6288,
            "longitude": 79.4192,
            "location": "Renigunta Road, Tirupati"
          },
          {
            "id": "VEN-TIR-002",
            "name": "Renigunta Supply Network",
            "latitude": 13.6288,
            "longitude": 79.4192,
            "location": "Bhavani Nagar, Tirupati"
          },
          {
            "id": "VEN-TIR-003",
            "name": "Balaji Trade Syndicate",
            "latitude": 13.6288,
            "longitude": 79.4192,
            "location": "AIR Bypass Road, Tirupati"
          },
          {
            "id": "VEN-TIR-004",
            "name": "Bhavani Nagar Commercial Mart",
            "latitude": 13.6288,
            "longitude": 79.4192,
            "location": "Alipiri, Tirupati"
          },
          {
            "id": "VEN-TIR-005",
            "name": "Seven Hills Business Distro",
            "latitude": 13.6288,
            "longitude": 79.4192,
            "location": "Balaji Colony, Tirupati"
          },
          {
            "id": "VEN-TIR-006",
            "name": "Alipiri Trade Link",
            "latitude": 13.6288,
            "longitude": 79.4192,
            "location": "Korlagunta, Tirupati"
          },
          {
            "id": "VEN-TIR-007",
            "name": "AIR Bypass Vendors Hub",
            "latitude": 13.6288,
            "longitude": 79.4192,
            "location": "Chandragiri Road, Tirupati"
          },
          {
            "id": "VEN-TIR-008",
            "name": "Apex Tirupati Supplies",
            "latitude": 13.6288,
            "longitude": 79.4192,
            "location": "RTC Bus Stand Area, Tirupati"
          },
          {
            "id": "VEN-TIR-009",
            "name": "Govinda Office Products",
            "latitude": 13.6288,
            "longitude": 79.4192,
            "location": "Leela Mahal Area, Tirupati"
          },
          {
            "id": "VEN-TIR-010",
            "name": "Spiritual City Tech Vendors",
            "latitude": 13.6288,
            "longitude": 79.4192,
            "location": "Karakambadi Road, Tirupati"
          }
        ]
      },
      {
        "city": "Kakinada",
        "latitude": 16.9891,
        "longitude": 82.2475,
        "suppliers": [
          {
            "id": "SUP-KAK-001",
            "name": "Port City Print Hub",
            "latitude": 16.9891,
            "longitude": 82.2475,
            "location": "Main Road, Kakinada"
          },
          {
            "id": "SUP-KAK-002",
            "name": "Kakinada Toner Care",
            "latitude": 16.9891,
            "longitude": 82.2475,
            "location": "Bhanugudi Junction, Kakinada"
          },
          {
            "id": "SUP-KAK-003",
            "name": "Bhanugudi Tech Supplies",
            "latitude": 16.9891,
            "longitude": 82.2475,
            "location": "Suryaraopeta, Kakinada"
          },
          {
            "id": "SUP-KAK-004",
            "name": "Suryaraopeta Paper Mart",
            "latitude": 16.9891,
            "longitude": 82.2475,
            "location": "Kakinada Port Area, Kakinada"
          },
          {
            "id": "SUP-KAK-005",
            "name": "Kakinada Deep Sea Port Consumables",
            "latitude": 16.9891,
            "longitude": 82.2475,
            "location": "JNTU Road, Kakinada"
          },
          {
            "id": "SUP-KAK-006",
            "name": "Main Road Office Depot",
            "latitude": 16.9891,
            "longitude": 82.2475,
            "location": "Cinema Road, Kakinada"
          },
          {
            "id": "SUP-KAK-007",
            "name": "JNTU Road Stationers",
            "latitude": 16.9891,
            "longitude": 82.2475,
            "location": "Ramanayyapeta, Kakinada"
          },
          {
            "id": "SUP-KAK-008",
            "name": "East Coast Cartridge Clinic",
            "latitude": 16.9891,
            "longitude": 82.2475,
            "location": "Collectorate Area, Kakinada"
          },
          {
            "id": "SUP-KAK-009",
            "name": "Sarpavaram Industrial Supplies",
            "latitude": 16.9891,
            "longitude": 82.2475,
            "location": "Sarpavaram, Kakinada"
          },
          {
            "id": "SUP-KAK-010",
            "name": "Shree Satya Print Pack",
            "latitude": 16.9891,
            "longitude": 82.2475,
            "location": "Madhava Nagar, Kakinada"
          }
        ],
        "vendors": [
          {
            "id": "VEN-KAK-001",
            "name": "Kakinada Commercial Centre",
            "latitude": 16.9891,
            "longitude": 82.2475,
            "location": "Main Road, Kakinada"
          },
          {
            "id": "VEN-KAK-002",
            "name": "Bhanugudi Trade Syndicate",
            "latitude": 16.9891,
            "longitude": 82.2475,
            "location": "Bhanugudi Junction, Kakinada"
          },
          {
            "id": "VEN-KAK-003",
            "name": "Port Area Supply Link",
            "latitude": 16.9891,
            "longitude": 82.2475,
            "location": "Suryaraopeta, Kakinada"
          },
          {
            "id": "VEN-KAK-004",
            "name": "Suryaraopeta Commercial Mart",
            "latitude": 16.9891,
            "longitude": 82.2475,
            "location": "Kakinada Port Area, Kakinada"
          },
          {
            "id": "VEN-KAK-005",
            "name": "Kakinada Bay Distro",
            "latitude": 16.9891,
            "longitude": 82.2475,
            "location": "JNTU Road, Kakinada"
          },
          {
            "id": "VEN-KAK-006",
            "name": "Main Road Stationery Vendors",
            "latitude": 16.9891,
            "longitude": 82.2475,
            "location": "Cinema Road, Kakinada"
          },
          {
            "id": "VEN-KAK-007",
            "name": "East Coast Business Network",
            "latitude": 16.9891,
            "longitude": 82.2475,
            "location": "Ramanayyapeta, Kakinada"
          },
          {
            "id": "VEN-KAK-008",
            "name": "Apex Kakinada Supplies",
            "latitude": 16.9891,
            "longitude": 82.2475,
            "location": "Collectorate Area, Kakinada"
          },
          {
            "id": "VEN-KAK-009",
            "name": "Satya Commercial Agency",
            "latitude": 16.9891,
            "longitude": 82.2475,
            "location": "Sarpavaram, Kakinada"
          },
          {
            "id": "VEN-KAK-010",
            "name": "Andhra Port Distro",
            "latitude": 16.9891,
            "longitude": 82.2475,
            "location": "Madhava Nagar, Kakinada"
          }
        ]
      }
    ]
  },
  {
    "state": "West Bengal",
    "latitude": 22.9868,
    "longitude": 87.855,
    "hub": {
      "city": "Kolkata",
      "latitude": 22.5726,
      "longitude": 88.3639
    },
    "cities": [
      {
        "city": "Kolkata",
        "latitude": 22.5726,
        "longitude": 88.3639,
        "suppliers": [
          {
            "id": "SUP-CCU-001",
            "name": "City of Joy Print Hub",
            "latitude": 22.5726,
            "longitude": 88.3639,
            "location": "BBD Bagh / Dalhousie, Kolkata"
          },
          {
            "id": "SUP-CCU-002",
            "name": "Dalhousie Commercial Stationers",
            "latitude": 22.5726,
            "longitude": 88.3639,
            "location": "Salt Lake Sector V, Kolkata"
          },
          {
            "id": "SUP-CCU-003",
            "name": "Salt Lake Tech Supplies",
            "latitude": 22.5726,
            "longitude": 88.3639,
            "location": "Park Street, Kolkata"
          },
          {
            "id": "SUP-CCU-004",
            "name": "Burrabazar Paper Depot",
            "latitude": 22.5726,
            "longitude": 88.3639,
            "location": "New Town, Kolkata"
          },
          {
            "id": "SUP-CCU-005",
            "name": "Kolkata Cartridge Clinic",
            "latitude": 22.5726,
            "longitude": 88.3639,
            "location": "Burrabazar, Kolkata"
          },
          {
            "id": "SUP-CCU-006",
            "name": "Park Street Corporate Care",
            "latitude": 22.5726,
            "longitude": 88.3639,
            "location": "Gariahat, Kolkata"
          },
          {
            "id": "SUP-CCU-007",
            "name": "New Town IT Consumables",
            "latitude": 22.5726,
            "longitude": 88.3639,
            "location": "Behala, Kolkata"
          },
          {
            "id": "SUP-CCU-008",
            "name": "Bengal Stationery World",
            "latitude": 22.5726,
            "longitude": 88.3639,
            "location": "Howrah Bridge Approach, Kolkata"
          },
          {
            "id": "SUP-CCU-009",
            "name": "Gariahat Print Solutions",
            "latitude": 22.5726,
            "longitude": 88.3639,
            "location": "Shyambazar, Kolkata"
          },
          {
            "id": "SUP-CCU-010",
            "name": "Hooghly Tech Care",
            "latitude": 22.5726,
            "longitude": 88.3639,
            "location": "Rajarhat, Kolkata"
          }
        ],
        "vendors": [
          {
            "id": "VEN-CCU-001",
            "name": "Kolkata Commercial Syndicate",
            "latitude": 22.5726,
            "longitude": 88.3639,
            "location": "BBD Bagh / Dalhousie, Kolkata"
          },
          {
            "id": "VEN-CCU-002",
            "name": "Burrabazar Wholesale Network",
            "latitude": 22.5726,
            "longitude": 88.3639,
            "location": "Salt Lake Sector V, Kolkata"
          },
          {
            "id": "VEN-CCU-003",
            "name": "Sector V IT Distro",
            "latitude": 22.5726,
            "longitude": 88.3639,
            "location": "Park Street, Kolkata"
          },
          {
            "id": "VEN-CCU-004",
            "name": "Dalhousie Trade Line",
            "latitude": 22.5726,
            "longitude": 88.3639,
            "location": "New Town, Kolkata"
          },
          {
            "id": "VEN-CCU-005",
            "name": "Park Street Business Mart",
            "latitude": 22.5726,
            "longitude": 88.3639,
            "location": "Burrabazar, Kolkata"
          },
          {
            "id": "VEN-CCU-006",
            "name": "New Town Supply Partners",
            "latitude": 22.5726,
            "longitude": 88.3639,
            "location": "Gariahat, Kolkata"
          },
          {
            "id": "VEN-CCU-007",
            "name": "Gariahat Commercial Hub",
            "latitude": 22.5726,
            "longitude": 88.3639,
            "location": "Behala, Kolkata"
          },
          {
            "id": "VEN-CCU-008",
            "name": "Apex Bengal Supplies",
            "latitude": 22.5726,
            "longitude": 88.3639,
            "location": "Howrah Bridge Approach, Kolkata"
          },
          {
            "id": "VEN-CCU-009",
            "name": "Vanguard Kolkata Distro",
            "latitude": 22.5726,
            "longitude": 88.3639,
            "location": "Shyambazar, Kolkata"
          },
          {
            "id": "VEN-CCU-010",
            "name": "East India Print Line",
            "latitude": 22.5726,
            "longitude": 88.3639,
            "location": "Rajarhat, Kolkata"
          }
        ]
      },
      {
        "city": "Howrah",
        "latitude": 22.5958,
        "longitude": 88.2636,
        "suppliers": [
          {
            "id": "SUP-HWH-001",
            "name": "Howrah Bridge Print Solutions",
            "latitude": 22.5958,
            "longitude": 88.2636,
            "location": "Howrah Maidan, Howrah"
          },
          {
            "id": "SUP-HWH-002",
            "name": "Shibpur Toner Clinic",
            "latitude": 22.5958,
            "longitude": 88.2636,
            "location": "Shibpur, Howrah"
          },
          {
            "id": "SUP-HWH-003",
            "name": "Liluah Industrial Consumables",
            "latitude": 22.5958,
            "longitude": 88.2636,
            "location": "Salkia, Howrah"
          },
          {
            "id": "SUP-HWH-004",
            "name": "Howrah Maidan Paper Mart",
            "latitude": 22.5958,
            "longitude": 88.2636,
            "location": "Kona Expressway, Howrah"
          },
          {
            "id": "SUP-HWH-005",
            "name": "Salkia Stationers",
            "latitude": 22.5958,
            "longitude": 88.2636,
            "location": "Liluah Industrial Belt, Howrah"
          },
          {
            "id": "SUP-HWH-006",
            "name": "Kona Expressway Tech Depot",
            "latitude": 22.5958,
            "longitude": 88.2636,
            "location": "Bally, Howrah"
          },
          {
            "id": "SUP-HWH-007",
            "name": "Belur Math Route Supplies",
            "latitude": 22.5958,
            "longitude": 88.2636,
            "location": "Baltikuri, Howrah"
          },
          {
            "id": "SUP-HWH-008",
            "name": "Dasnagar Engineering Print Care",
            "latitude": 22.5958,
            "longitude": 88.2636,
            "location": "Belur, Howrah"
          },
          {
            "id": "SUP-HWH-009",
            "name": "Bally Commercial Stationers",
            "latitude": 22.5958,
            "longitude": 88.2636,
            "location": "Dasnagar, Howrah"
          },
          {
            "id": "SUP-HWH-010",
            "name": "Hooghly River Consumables",
            "latitude": 22.5958,
            "longitude": 88.2636,
            "location": "Andul Road, Howrah"
          }
        ],
        "vendors": [
          {
            "id": "VEN-HWH-001",
            "name": "Howrah Industrial Syndicate",
            "latitude": 22.5958,
            "longitude": 88.2636,
            "location": "Howrah Maidan, Howrah"
          },
          {
            "id": "VEN-HWH-002",
            "name": "Liluah Supply Network",
            "latitude": 22.5958,
            "longitude": 88.2636,
            "location": "Shibpur, Howrah"
          },
          {
            "id": "VEN-HWH-003",
            "name": "Shibpur Commercial Agency",
            "latitude": 22.5958,
            "longitude": 88.2636,
            "location": "Salkia, Howrah"
          },
          {
            "id": "VEN-HWH-004",
            "name": "Howrah Maidan Trade Link",
            "latitude": 22.5958,
            "longitude": 88.2636,
            "location": "Kona Expressway, Howrah"
          },
          {
            "id": "VEN-HWH-005",
            "name": "Salkia Business Mart",
            "latitude": 22.5958,
            "longitude": 88.2636,
            "location": "Liluah Industrial Belt, Howrah"
          },
          {
            "id": "VEN-HWH-006",
            "name": "Kona Trade Partners",
            "latitude": 22.5958,
            "longitude": 88.2636,
            "location": "Bally, Howrah"
          },
          {
            "id": "VEN-HWH-007",
            "name": "Dasnagar Industrial Vendors",
            "latitude": 22.5958,
            "longitude": 88.2636,
            "location": "Baltikuri, Howrah"
          },
          {
            "id": "VEN-HWH-008",
            "name": "Apex Howrah Distro",
            "latitude": 22.5958,
            "longitude": 88.2636,
            "location": "Belur, Howrah"
          },
          {
            "id": "VEN-HWH-009",
            "name": "Hooghly Commercial Distro",
            "latitude": 22.5958,
            "longitude": 88.2636,
            "location": "Dasnagar, Howrah"
          },
          {
            "id": "VEN-HWH-010",
            "name": "Vanguard Liluah Trade",
            "latitude": 22.5958,
            "longitude": 88.2636,
            "location": "Andul Road, Howrah"
          }
        ]
      },
      {
        "city": "Durgapur",
        "latitude": 23.5204,
        "longitude": 87.3119,
        "suppliers": [
          {
            "id": "SUP-DUR-001",
            "name": "Steel City Print Tech",
            "latitude": 23.5204,
            "longitude": 87.3119,
            "location": "City Centre, Durgapur"
          },
          {
            "id": "SUP-DUR-002",
            "name": "Durgapur Toner Clinic",
            "latitude": 23.5204,
            "longitude": 87.3119,
            "location": "Benachity, Durgapur"
          },
          {
            "id": "SUP-DUR-003",
            "name": "City Centre Stationers",
            "latitude": 23.5204,
            "longitude": 87.3119,
            "location": "Bidhannagar, Durgapur"
          },
          {
            "id": "SUP-DUR-004",
            "name": "Benachity Paper Depot",
            "latitude": 23.5204,
            "longitude": 87.3119,
            "location": "Steel Township, Durgapur"
          },
          {
            "id": "SUP-DUR-005",
            "name": "Bidhannagar Corporate Supplies",
            "latitude": 23.5204,
            "longitude": 87.3119,
            "location": "DSP Area, Durgapur"
          },
          {
            "id": "SUP-DUR-006",
            "name": "Bamunara Industrial Consumables",
            "latitude": 23.5204,
            "longitude": 87.3119,
            "location": "Muchipara, Durgapur"
          },
          {
            "id": "SUP-DUR-007",
            "name": "DSP Township Office Needs",
            "latitude": 23.5204,
            "longitude": 87.3119,
            "location": "Bhangagarh, Durgapur"
          },
          {
            "id": "SUP-DUR-008",
            "name": "Durgapur Barrage Tech Mart",
            "latitude": 23.5204,
            "longitude": 87.3119,
            "location": "Palashdiha, Durgapur"
          },
          {
            "id": "SUP-DUR-009",
            "name": "Muchipara Print Care",
            "latitude": 23.5204,
            "longitude": 87.3119,
            "location": "Bamunara Industrial Area, Durgapur"
          },
          {
            "id": "SUP-DUR-010",
            "name": "Burdwan Industrial Stationers",
            "latitude": 23.5204,
            "longitude": 87.3119,
            "location": "Fuljhor, Durgapur"
          }
        ],
        "vendors": [
          {
            "id": "VEN-DUR-001",
            "name": "Durgapur Commercial Syndicate",
            "latitude": 23.5204,
            "longitude": 87.3119,
            "location": "City Centre, Durgapur"
          },
          {
            "id": "VEN-DUR-002",
            "name": "Benachity Trade Network",
            "latitude": 23.5204,
            "longitude": 87.3119,
            "location": "Benachity, Durgapur"
          },
          {
            "id": "VEN-DUR-003",
            "name": "City Centre Business Mart",
            "latitude": 23.5204,
            "longitude": 87.3119,
            "location": "Bidhannagar, Durgapur"
          },
          {
            "id": "VEN-DUR-004",
            "name": "Bidhannagar Supply Link",
            "latitude": 23.5204,
            "longitude": 87.3119,
            "location": "Steel Township, Durgapur"
          },
          {
            "id": "VEN-DUR-005",
            "name": "Bamunara Vendors Hub",
            "latitude": 23.5204,
            "longitude": 87.3119,
            "location": "DSP Area, Durgapur"
          },
          {
            "id": "VEN-DUR-006",
            "name": "Steel Township Trade Partners",
            "latitude": 23.5204,
            "longitude": 87.3119,
            "location": "Muchipara, Durgapur"
          },
          {
            "id": "VEN-DUR-007",
            "name": "Muchipara Commercial Agency",
            "latitude": 23.5204,
            "longitude": 87.3119,
            "location": "Bhangagarh, Durgapur"
          },
          {
            "id": "VEN-DUR-008",
            "name": "Apex Durgapur Distro",
            "latitude": 23.5204,
            "longitude": 87.3119,
            "location": "Palashdiha, Durgapur"
          },
          {
            "id": "VEN-DUR-009",
            "name": "Damodar Valley Supplies",
            "latitude": 23.5204,
            "longitude": 87.3119,
            "location": "Bamunara Industrial Area, Durgapur"
          },
          {
            "id": "VEN-DUR-010",
            "name": "Pioneer Steel City Distro",
            "latitude": 23.5204,
            "longitude": 87.3119,
            "location": "Fuljhor, Durgapur"
          }
        ]
      },
      {
        "city": "Asansol",
        "latitude": 23.6739,
        "longitude": 86.9524,
        "suppliers": [
          {
            "id": "SUP-ASN-001",
            "name": "Coal City Print Hub",
            "latitude": 23.6739,
            "longitude": 86.9524,
            "location": "GT Road, Asansol"
          },
          {
            "id": "SUP-ASN-002",
            "name": "Asansol Toner Depot",
            "latitude": 23.6739,
            "longitude": 86.9524,
            "location": "Burnpur, Asansol"
          },
          {
            "id": "SUP-ASN-003",
            "name": "Burnpur Industrial Supplies",
            "latitude": 23.6739,
            "longitude": 86.9524,
            "location": "Ushagram, Asansol"
          },
          {
            "id": "SUP-ASN-004",
            "name": "GT Road Stationers",
            "latitude": 23.6739,
            "longitude": 86.9524,
            "location": "Hutton Road, Asansol"
          },
          {
            "id": "SUP-ASN-005",
            "name": "Ushagram Paper Mart",
            "latitude": 23.6739,
            "longitude": 86.9524,
            "location": "Kalyanpur, Asansol"
          },
          {
            "id": "SUP-ASN-006",
            "name": "Hutton Road Cartridge Clinic",
            "latitude": 23.6739,
            "longitude": 86.9524,
            "location": "Railpar, Asansol"
          },
          {
            "id": "SUP-ASN-007",
            "name": "Kalyanpur Tech Solutions",
            "latitude": 23.6739,
            "longitude": 86.9524,
            "location": "Kalla, Asansol"
          },
          {
            "id": "SUP-ASN-008",
            "name": "Kulti Industrial Consumables",
            "latitude": 23.6739,
            "longitude": 86.9524,
            "location": "Kulti Industrial Belt, Asansol"
          },
          {
            "id": "SUP-ASN-009",
            "name": "Raniganj Belt Office Care",
            "latitude": 23.6739,
            "longitude": 86.9524,
            "location": "Court More, Asansol"
          },
          {
            "id": "SUP-ASN-010",
            "name": "Western Bengal Print Care",
            "latitude": 23.6739,
            "longitude": 86.9524,
            "location": "Sen Raleigh Road, Asansol"
          }
        ],
        "vendors": [
          {
            "id": "VEN-ASN-001",
            "name": "Asansol Commercial Syndicate",
            "latitude": 23.6739,
            "longitude": 86.9524,
            "location": "GT Road, Asansol"
          },
          {
            "id": "VEN-ASN-002",
            "name": "GT Road Trade Network",
            "latitude": 23.6739,
            "longitude": 86.9524,
            "location": "Burnpur, Asansol"
          },
          {
            "id": "VEN-ASN-003",
            "name": "Burnpur Supply Partners",
            "latitude": 23.6739,
            "longitude": 86.9524,
            "location": "Ushagram, Asansol"
          },
          {
            "id": "VEN-ASN-004",
            "name": "Ushagram Business Mart",
            "latitude": 23.6739,
            "longitude": 86.9524,
            "location": "Hutton Road, Asansol"
          },
          {
            "id": "VEN-ASN-005",
            "name": "Hutton Road Commercial Line",
            "latitude": 23.6739,
            "longitude": 86.9524,
            "location": "Kalyanpur, Asansol"
          },
          {
            "id": "VEN-ASN-006",
            "name": "Railpar Trade Link",
            "latitude": 23.6739,
            "longitude": 86.9524,
            "location": "Railpar, Asansol"
          },
          {
            "id": "VEN-ASN-007",
            "name": "Kulti Commercial Vendors",
            "latitude": 23.6739,
            "longitude": 86.9524,
            "location": "Kalla, Asansol"
          },
          {
            "id": "VEN-ASN-008",
            "name": "Apex Asansol Supplies",
            "latitude": 23.6739,
            "longitude": 86.9524,
            "location": "Kulti Industrial Belt, Asansol"
          },
          {
            "id": "VEN-ASN-009",
            "name": "Damodar Valley Trade Line",
            "latitude": 23.6739,
            "longitude": 86.9524,
            "location": "Court More, Asansol"
          },
          {
            "id": "VEN-ASN-010",
            "name": "Premier Coal Belt Distro",
            "latitude": 23.6739,
            "longitude": 86.9524,
            "location": "Sen Raleigh Road, Asansol"
          }
        ]
      },
      {
        "city": "Siliguri",
        "latitude": 26.7271,
        "longitude": 88.3953,
        "suppliers": [
          {
            "id": "SUP-SLG-001",
            "name": "North Bengal Print Solutions",
            "latitude": 26.7271,
            "longitude": 88.3953,
            "location": "Sevoke Road, Siliguri"
          },
          {
            "id": "SUP-SLG-002",
            "name": "Siliguri Toner Clinic",
            "latitude": 26.7271,
            "longitude": 88.3953,
            "location": "Hill Cart Road, Siliguri"
          },
          {
            "id": "SUP-SLG-003",
            "name": "Sevoke Road Stationers",
            "latitude": 26.7271,
            "longitude": 88.3953,
            "location": "Bidhan Market, Siliguri"
          },
          {
            "id": "SUP-SLG-004",
            "name": "Hill Cart Road Paper Mart",
            "latitude": 26.7271,
            "longitude": 88.3953,
            "location": "Pradhan Nagar, Siliguri"
          },
          {
            "id": "SUP-SLG-005",
            "name": "Bidhan Market Cartridge Care",
            "latitude": 26.7271,
            "longitude": 88.3953,
            "location": "Matigara, Siliguri"
          },
          {
            "id": "SUP-SLG-006",
            "name": "Matigara Commercial Supplies",
            "latitude": 26.7271,
            "longitude": 88.3953,
            "location": "Khalpara, Siliguri"
          },
          {
            "id": "SUP-SLG-007",
            "name": "Pradhan Nagar Tech Hub",
            "latitude": 26.7271,
            "longitude": 88.3953,
            "location": "Hakim Para, Siliguri"
          },
          {
            "id": "SUP-SLG-008",
            "name": "Gateway to Hills Consumables",
            "latitude": 26.7271,
            "longitude": 88.3953,
            "location": "College Para, Siliguri"
          },
          {
            "id": "SUP-SLG-009",
            "name": "Dooars Express Stationers",
            "latitude": 26.7271,
            "longitude": 88.3953,
            "location": "Salugara, Siliguri"
          },
          {
            "id": "SUP-SLG-010",
            "name": "Teesta River Print Pack",
            "latitude": 26.7271,
            "longitude": 88.3953,
            "location": "Fulbari, Siliguri"
          }
        ],
        "vendors": [
          {
            "id": "VEN-SLG-001",
            "name": "Siliguri Commercial Centre",
            "latitude": 26.7271,
            "longitude": 88.3953,
            "location": "Sevoke Road, Siliguri"
          },
          {
            "id": "VEN-SLG-002",
            "name": "Sevoke Road Trade Syndicate",
            "latitude": 26.7271,
            "longitude": 88.3953,
            "location": "Hill Cart Road, Siliguri"
          },
          {
            "id": "VEN-SLG-003",
            "name": "Bidhan Market Supply Network",
            "latitude": 26.7271,
            "longitude": 88.3953,
            "location": "Bidhan Market, Siliguri"
          },
          {
            "id": "VEN-SLG-004",
            "name": "Hill Cart Road Vendors",
            "latitude": 26.7271,
            "longitude": 88.3953,
            "location": "Pradhan Nagar, Siliguri"
          },
          {
            "id": "VEN-SLG-005",
            "name": "Matigara Business Hub",
            "latitude": 26.7271,
            "longitude": 88.3953,
            "location": "Matigara, Siliguri"
          },
          {
            "id": "VEN-SLG-006",
            "name": "North Bengal Trade Link",
            "latitude": 26.7271,
            "longitude": 88.3953,
            "location": "Khalpara, Siliguri"
          },
          {
            "id": "VEN-SLG-007",
            "name": "Pradhan Nagar Commercial Mart",
            "latitude": 26.7271,
            "longitude": 88.3953,
            "location": "Hakim Para, Siliguri"
          },
          {
            "id": "VEN-SLG-008",
            "name": "Apex Siliguri Distro",
            "latitude": 26.7271,
            "longitude": 88.3953,
            "location": "College Para, Siliguri"
          },
          {
            "id": "VEN-SLG-009",
            "name": "Himalayan Foothills Distro",
            "latitude": 26.7271,
            "longitude": 88.3953,
            "location": "Salugara, Siliguri"
          },
          {
            "id": "VEN-SLG-010",
            "name": "Pioneer North Bengal Trade",
            "latitude": 26.7271,
            "longitude": 88.3953,
            "location": "Fulbari, Siliguri"
          }
        ]
      },
      {
        "city": "Bardhaman",
        "latitude": 23.2324,
        "longitude": 87.8615,
        "suppliers": [
          {
            "id": "SUP-BDN-001",
            "name": "Burdwan Royal Print Care",
            "latitude": 23.2324,
            "longitude": 87.8615,
            "location": "Curzon Gate Area, Bardhaman"
          },
          {
            "id": "SUP-BDN-002",
            "name": "Curzon Gate Stationers",
            "latitude": 23.2324,
            "longitude": 87.8615,
            "location": "Boro Bazar, Bardhaman"
          },
          {
            "id": "SUP-BDN-003",
            "name": "Boro Bazar Paper Depot",
            "latitude": 23.2324,
            "longitude": 87.8615,
            "location": "Badamtala, Bardhaman"
          },
          {
            "id": "SUP-BDN-004",
            "name": "Bardhaman Toner Clinic",
            "latitude": 23.2324,
            "longitude": 87.8615,
            "location": "Birhata, Bardhaman"
          },
          {
            "id": "SUP-BDN-005",
            "name": "Badamtala Cartridge Hub",
            "latitude": 23.2324,
            "longitude": 87.8615,
            "location": "Khagragarh, Bardhaman"
          },
          {
            "id": "SUP-BDN-006",
            "name": "Birhata Office Supplies",
            "latitude": 23.2324,
            "longitude": 87.8615,
            "location": "Golapbag, Bardhaman"
          },
          {
            "id": "SUP-BDN-007",
            "name": "Golapbag Tech Mart",
            "latitude": 23.2324,
            "longitude": 87.8615,
            "location": "Alisha, Bardhaman"
          },
          {
            "id": "SUP-BDN-008",
            "name": "Damodar Plains Consumables",
            "latitude": 23.2324,
            "longitude": 87.8615,
            "location": "Ullhas, Bardhaman"
          },
          {
            "id": "SUP-BDN-009",
            "name": "Station Road Print Care",
            "latitude": 23.2324,
            "longitude": 87.8615,
            "location": "Station Road, Bardhaman"
          },
          {
            "id": "SUP-BDN-010",
            "name": "Bengal Rice Bowl Supplies",
            "latitude": 23.2324,
            "longitude": 87.8615,
            "location": "Kalibazar, Bardhaman"
          }
        ],
        "vendors": [
          {
            "id": "VEN-BDN-001",
            "name": "Bardhaman Commercial Syndicate",
            "latitude": 23.2324,
            "longitude": 87.8615,
            "location": "Curzon Gate Area, Bardhaman"
          },
          {
            "id": "VEN-BDN-002",
            "name": "Curzon Gate Trade Link",
            "latitude": 23.2324,
            "longitude": 87.8615,
            "location": "Boro Bazar, Bardhaman"
          },
          {
            "id": "VEN-BDN-003",
            "name": "Boro Bazar Supply Network",
            "latitude": 23.2324,
            "longitude": 87.8615,
            "location": "Badamtala, Bardhaman"
          },
          {
            "id": "VEN-BDN-004",
            "name": "Birhata Business Mart",
            "latitude": 23.2324,
            "longitude": 87.8615,
            "location": "Birhata, Bardhaman"
          },
          {
            "id": "VEN-BDN-005",
            "name": "Badamtala Commercial Agency",
            "latitude": 23.2324,
            "longitude": 87.8615,
            "location": "Khagragarh, Bardhaman"
          },
          {
            "id": "VEN-BDN-006",
            "name": "Burdwan Central Distro",
            "latitude": 23.2324,
            "longitude": 87.8615,
            "location": "Golapbag, Bardhaman"
          },
          {
            "id": "VEN-BDN-007",
            "name": "Damodar Trade Line",
            "latitude": 23.2324,
            "longitude": 87.8615,
            "location": "Alisha, Bardhaman"
          },
          {
            "id": "VEN-BDN-008",
            "name": "Apex Bardhaman Supplies",
            "latitude": 23.2324,
            "longitude": 87.8615,
            "location": "Ullhas, Bardhaman"
          },
          {
            "id": "VEN-BDN-009",
            "name": "Heritage Burdwan Mart",
            "latitude": 23.2324,
            "longitude": 87.8615,
            "location": "Station Road, Bardhaman"
          },
          {
            "id": "VEN-BDN-010",
            "name": "Bengal Heartland Distro",
            "latitude": 23.2324,
            "longitude": 87.8615,
            "location": "Kalibazar, Bardhaman"
          }
        ]
      },
      {
        "city": "Kharagpur",
        "latitude": 22.346,
        "longitude": 87.232,
        "suppliers": [
          {
            "id": "SUP-KGP-001",
            "name": "IIT Corridor Print Solutions",
            "latitude": 22.346,
            "longitude": 87.232,
            "location": "IIT Campus Area, Kharagpur"
          },
          {
            "id": "SUP-KGP-002",
            "name": "Kharagpur Toner Clinic",
            "latitude": 22.346,
            "longitude": 87.232,
            "location": "Golbazar, Kharagpur"
          },
          {
            "id": "SUP-KGP-003",
            "name": "Nimpura Industrial Supplies",
            "latitude": 22.346,
            "longitude": 87.232,
            "location": "Malancha, Kharagpur"
          },
          {
            "id": "SUP-KGP-004",
            "name": "Golbazar Paper Mart",
            "latitude": 22.346,
            "longitude": 87.232,
            "location": "Railway Settlement, Kharagpur"
          },
          {
            "id": "SUP-KGP-005",
            "name": "Malancha Stationers",
            "latitude": 22.346,
            "longitude": 87.232,
            "location": "Nimpura Industrial Area, Kharagpur"
          },
          {
            "id": "SUP-KGP-006",
            "name": "Railway City Cartridge Depot",
            "latitude": 22.346,
            "longitude": 87.232,
            "location": "Inda, Kharagpur"
          },
          {
            "id": "SUP-KGP-007",
            "name": "Inda Tech Solutions",
            "latitude": 22.346,
            "longitude": 87.232,
            "location": "Chhota Tengra, Kharagpur"
          },
          {
            "id": "SUP-KGP-008",
            "name": "Hijli Knowledge Park Supplies",
            "latitude": 22.346,
            "longitude": 87.232,
            "location": "Kharida, Kharagpur"
          },
          {
            "id": "SUP-KGP-009",
            "name": "OT Road Office Depot",
            "latitude": 22.346,
            "longitude": 87.232,
            "location": "OT Road, Kharagpur"
          },
          {
            "id": "SUP-KGP-010",
            "name": "Medinipur District Print Care",
            "latitude": 22.346,
            "longitude": 87.232,
            "location": "Hijli, Kharagpur"
          }
        ],
        "vendors": [
          {
            "id": "VEN-KGP-001",
            "name": "Kharagpur Commercial Centre",
            "latitude": 22.346,
            "longitude": 87.232,
            "location": "IIT Campus Area, Kharagpur"
          },
          {
            "id": "VEN-KGP-002",
            "name": "Nimpura Supply Syndicate",
            "latitude": 22.346,
            "longitude": 87.232,
            "location": "Golbazar, Kharagpur"
          },
          {
            "id": "VEN-KGP-003",
            "name": "Golbazar Trade Link",
            "latitude": 22.346,
            "longitude": 87.232,
            "location": "Malancha, Kharagpur"
          },
          {
            "id": "VEN-KGP-004",
            "name": "Malancha Business Mart",
            "latitude": 22.346,
            "longitude": 87.232,
            "location": "Railway Settlement, Kharagpur"
          },
          {
            "id": "VEN-KGP-005",
            "name": "Railway City Vendors Hub",
            "latitude": 22.346,
            "longitude": 87.232,
            "location": "Nimpura Industrial Area, Kharagpur"
          },
          {
            "id": "VEN-KGP-006",
            "name": "IIT Campus Commercial Partner",
            "latitude": 22.346,
            "longitude": 87.232,
            "location": "Inda, Kharagpur"
          },
          {
            "id": "VEN-KGP-007",
            "name": "Inda Trade Syndicate",
            "latitude": 22.346,
            "longitude": 87.232,
            "location": "Chhota Tengra, Kharagpur"
          },
          {
            "id": "VEN-KGP-008",
            "name": "Apex Kharagpur Distro",
            "latitude": 22.346,
            "longitude": 87.232,
            "location": "Kharida, Kharagpur"
          },
          {
            "id": "VEN-KGP-009",
            "name": "Medinipur Commercial Distro",
            "latitude": 22.346,
            "longitude": 87.232,
            "location": "OT Road, Kharagpur"
          },
          {
            "id": "VEN-KGP-010",
            "name": "Premier Junction Trade Line",
            "latitude": 22.346,
            "longitude": 87.232,
            "location": "Hijli, Kharagpur"
          }
        ]
      },
      {
        "city": "Haldia",
        "latitude": 22.062,
        "longitude": 88.0674,
        "suppliers": [
          {
            "id": "SUP-HLD-001",
            "name": "Haldia Port Print Care",
            "latitude": 22.062,
            "longitude": 88.0674,
            "location": "Durgachak, Haldia"
          },
          {
            "id": "SUP-HLD-002",
            "name": "Durgachak Industrial Consumables",
            "latitude": 22.062,
            "longitude": 88.0674,
            "location": "Haldia Port Area, Haldia"
          },
          {
            "id": "SUP-HLD-003",
            "name": "Haldia Petrochem Stationers",
            "latitude": 22.062,
            "longitude": 88.0674,
            "location": "Township, Haldia"
          },
          {
            "id": "SUP-HLD-004",
            "name": "Township Cartridge Clinic",
            "latitude": 22.062,
            "longitude": 88.0674,
            "location": "Basudevpur, Haldia"
          },
          {
            "id": "SUP-HLD-005",
            "name": "Basudevpur Toner Care",
            "latitude": 22.062,
            "longitude": 88.0674,
            "location": "Chiranjibpur, Haldia"
          },
          {
            "id": "SUP-HLD-006",
            "name": "Port City Paper House",
            "latitude": 22.062,
            "longitude": 88.0674,
            "location": "Brajanathchak, Haldia"
          },
          {
            "id": "SUP-HLD-007",
            "name": "Chiranjibpur Tech Supplies",
            "latitude": 22.062,
            "longitude": 88.0674,
            "location": "Sutahata, Haldia"
          },
          {
            "id": "SUP-HLD-008",
            "name": "Hooghly Estuary Office Depot",
            "latitude": 22.062,
            "longitude": 88.0674,
            "location": "Bhatterchak, Haldia"
          },
          {
            "id": "SUP-HLD-009",
            "name": "Sutahata Industrial Care",
            "latitude": 22.062,
            "longitude": 88.0674,
            "location": "Ranichak, Haldia"
          },
          {
            "id": "SUP-HLD-010",
            "name": "Coastal Bengal Print Pack",
            "latitude": 22.062,
            "longitude": 88.0674,
            "location": "Kashberia, Haldia"
          }
        ],
        "vendors": [
          {
            "id": "VEN-HLD-001",
            "name": "Haldia Port Commercial Syndicate",
            "latitude": 22.062,
            "longitude": 88.0674,
            "location": "Durgachak, Haldia"
          },
          {
            "id": "VEN-HLD-002",
            "name": "Durgachak Supply Network",
            "latitude": 22.062,
            "longitude": 88.0674,
            "location": "Haldia Port Area, Haldia"
          },
          {
            "id": "VEN-HLD-003",
            "name": "Township Trade Partners",
            "latitude": 22.062,
            "longitude": 88.0674,
            "location": "Township, Haldia"
          },
          {
            "id": "VEN-HLD-004",
            "name": "Haldia Petrochem Business Mart",
            "latitude": 22.062,
            "longitude": 88.0674,
            "location": "Basudevpur, Haldia"
          },
          {
            "id": "VEN-HLD-005",
            "name": "Basudevpur Commercial Line",
            "latitude": 22.062,
            "longitude": 88.0674,
            "location": "Chiranjibpur, Haldia"
          },
          {
            "id": "VEN-HLD-006",
            "name": "Port Area Distro Hub",
            "latitude": 22.062,
            "longitude": 88.0674,
            "location": "Brajanathchak, Haldia"
          },
          {
            "id": "VEN-HLD-007",
            "name": "Sutahata Trade Syndicate",
            "latitude": 22.062,
            "longitude": 88.0674,
            "location": "Sutahata, Haldia"
          },
          {
            "id": "VEN-HLD-008",
            "name": "Apex Haldia Distro",
            "latitude": 22.062,
            "longitude": 88.0674,
            "location": "Bhatterchak, Haldia"
          },
          {
            "id": "VEN-HLD-009",
            "name": "Marine & Industrial Vendors",
            "latitude": 22.062,
            "longitude": 88.0674,
            "location": "Ranichak, Haldia"
          },
          {
            "id": "VEN-HLD-010",
            "name": "Pioneer Coastal Port Distro",
            "latitude": 22.062,
            "longitude": 88.0674,
            "location": "Kashberia, Haldia"
          }
        ]
      }
    ]
  }
],
    cities: [
  {
    "city": "Mumbai",
    "latitude": 19.076,
    "longitude": 72.8777,
    "suppliers": [
      {
        "id": "SUP-MUM-001",
        "name": "MAYUR COMPUTERS",
        "latitude": 19.076,
        "longitude": 72.8777,
        "location": "Dadar East, Mumbai"
      },
      {
        "id": "SUP-MUM-002",
        "name": "Jet Cartridge (I) Private Limited",
        "latitude": 19.076,
        "longitude": 72.8777,
        "location": "Dadar West, Mumbai"
      },
      {
        "id": "SUP-MUM-003",
        "name": "Hi-Tech Office Solutions",
        "latitude": 19.076,
        "longitude": 72.8777,
        "location": "Matunga, Mumbai"
      },
      {
        "id": "SUP-MUM-004",
        "name": "ABM Enterprises",
        "latitude": 19.076,
        "longitude": 72.8777,
        "location": "Fort, Mumbai"
      },
      {
        "id": "SUP-MUM-005",
        "name": "Ashapura Office Solutions",
        "latitude": 19.076,
        "longitude": 72.8777,
        "location": "Lower Parel, Mumbai"
      },
      {
        "id": "SUP-MUM-006",
        "name": "Cartridge World",
        "latitude": 19.076,
        "longitude": 72.8777,
        "location": "Andheri East, Mumbai"
      },
      {
        "id": "SUP-MUM-007",
        "name": "SPT-Star Print Technology",
        "latitude": 19.076,
        "longitude": 72.8777,
        "location": "Bandra West, Mumbai"
      },
      {
        "id": "SUP-MUM-008",
        "name": "Cartridge King",
        "latitude": 19.076,
        "longitude": 72.8777,
        "location": "Kurla, Mumbai"
      },
      {
        "id": "SUP-MUM-009",
        "name": "Print Tonic Technologies",
        "latitude": 19.076,
        "longitude": 72.8777,
        "location": "BKC, Mumbai"
      },
      {
        "id": "SUP-MUM-010",
        "name": "AquaPrint Enterprises",
        "latitude": 19.076,
        "longitude": 72.8777,
        "location": "Nariman Point, Mumbai"
      }
    ],
    "vendors": [
      {
        "id": "VEN-MUM-001",
        "name": "MAYUR COMPUTERS",
        "latitude": 19.076,
        "longitude": 72.8777,
        "location": "Dadar East, Mumbai"
      },
      {
        "id": "VEN-MUM-002",
        "name": "LT Online Store",
        "latitude": 19.076,
        "longitude": 72.8777,
        "location": "Dadar West, Mumbai"
      },
      {
        "id": "VEN-MUM-003",
        "name": "Radha Enterprises",
        "latitude": 19.076,
        "longitude": 72.8777,
        "location": "Matunga, Mumbai"
      },
      {
        "id": "VEN-MUM-004",
        "name": "Zigma Toner",
        "latitude": 19.076,
        "longitude": 72.8777,
        "location": "Fort, Mumbai"
      },
      {
        "id": "VEN-MUM-005",
        "name": "Cartridge Point",
        "latitude": 19.076,
        "longitude": 72.8777,
        "location": "Lower Parel, Mumbai"
      },
      {
        "id": "VEN-MUM-006",
        "name": "Series Enterprises",
        "latitude": 19.076,
        "longitude": 72.8777,
        "location": "Andheri East, Mumbai"
      },
      {
        "id": "VEN-MUM-007",
        "name": "We Tech Print Solution",
        "latitude": 19.076,
        "longitude": 72.8777,
        "location": "Bandra West, Mumbai"
      },
      {
        "id": "VEN-MUM-008",
        "name": "Computer Consumables Company",
        "latitude": 19.076,
        "longitude": 72.8777,
        "location": "Kurla, Mumbai"
      },
      {
        "id": "VEN-MUM-009",
        "name": "Navrang Enterprises",
        "latitude": 19.076,
        "longitude": 72.8777,
        "location": "BKC, Mumbai"
      },
      {
        "id": "VEN-MUM-010",
        "name": "Toner Cartridge Refilling",
        "latitude": 19.076,
        "longitude": 72.8777,
        "location": "Nariman Point, Mumbai"
      }
    ]
  },
  {
    "city": "Pune",
    "latitude": 18.5204,
    "longitude": 73.8567,
    "suppliers": [
      {
        "id": "SUP-PUN-001",
        "name": "TechMatrix Systems",
        "latitude": 18.5204,
        "longitude": 73.8567,
        "location": "Shivajinagar, Pune"
      },
      {
        "id": "SUP-PUN-002",
        "name": "Sahyadri Paper & Print",
        "latitude": 18.5204,
        "longitude": 73.8567,
        "location": "Kothrud, Pune"
      },
      {
        "id": "SUP-PUN-003",
        "name": "Horizon Toner Mart",
        "latitude": 18.5204,
        "longitude": 73.8567,
        "location": "Hinjawadi, Pune"
      },
      {
        "id": "SUP-PUN-004",
        "name": "Pune Cartridge Clinic",
        "latitude": 18.5204,
        "longitude": 73.8567,
        "location": "Viman Nagar, Pune"
      },
      {
        "id": "SUP-PUN-005",
        "name": "Deccan Office Supplies",
        "latitude": 18.5204,
        "longitude": 73.8567,
        "location": "FC Road, Pune"
      },
      {
        "id": "SUP-PUN-006",
        "name": "Apex Stationery & Consumables",
        "latitude": 18.5204,
        "longitude": 73.8567,
        "location": "Hadapsar, Pune"
      },
      {
        "id": "SUP-PUN-007",
        "name": "Omkar Imaging Hub",
        "latitude": 18.5204,
        "longitude": 73.8567,
        "location": "Baner, Pune"
      },
      {
        "id": "SUP-PUN-008",
        "name": "PrintCraft Technologies",
        "latitude": 18.5204,
        "longitude": 73.8567,
        "location": "Magarpatta, Pune"
      },
      {
        "id": "SUP-PUN-009",
        "name": "Swastik Commercials",
        "latitude": 18.5204,
        "longitude": 73.8567,
        "location": "Swargate, Pune"
      },
      {
        "id": "SUP-PUN-010",
        "name": "Alpha Tech Logistics",
        "latitude": 18.5204,
        "longitude": 73.8567,
        "location": "Kalyani Nagar, Pune"
      }
    ],
    "vendors": [
      {
        "id": "VEN-PUN-001",
        "name": "Global Paper Solutions",
        "latitude": 18.5204,
        "longitude": 73.8567,
        "location": "Shivajinagar, Pune"
      },
      {
        "id": "VEN-PUN-002",
        "name": "Shanti Print Mart",
        "latitude": 18.5204,
        "longitude": 73.8567,
        "location": "Kothrud, Pune"
      },
      {
        "id": "VEN-PUN-003",
        "name": "Kothrud Digital Express",
        "latitude": 18.5204,
        "longitude": 73.8567,
        "location": "Hinjawadi, Pune"
      },
      {
        "id": "VEN-PUN-004",
        "name": "Infotech Consumables",
        "latitude": 18.5204,
        "longitude": 73.8567,
        "location": "Viman Nagar, Pune"
      },
      {
        "id": "VEN-PUN-005",
        "name": "Sterling Paper Traders",
        "latitude": 18.5204,
        "longitude": 73.8567,
        "location": "FC Road, Pune"
      },
      {
        "id": "VEN-PUN-006",
        "name": "Synergy Toner Supplies",
        "latitude": 18.5204,
        "longitude": 73.8567,
        "location": "Hadapsar, Pune"
      },
      {
        "id": "VEN-PUN-007",
        "name": "Matrix Corporate Needs",
        "latitude": 18.5204,
        "longitude": 73.8567,
        "location": "Baner, Pune"
      },
      {
        "id": "VEN-PUN-008",
        "name": "Phoenix Industrial Goods",
        "latitude": 18.5204,
        "longitude": 73.8567,
        "location": "Magarpatta, Pune"
      },
      {
        "id": "VEN-PUN-009",
        "name": "Vardhman Print Pack",
        "latitude": 18.5204,
        "longitude": 73.8567,
        "location": "Swargate, Pune"
      },
      {
        "id": "VEN-PUN-010",
        "name": "United Trade Network",
        "latitude": 18.5204,
        "longitude": 73.8567,
        "location": "Kalyani Nagar, Pune"
      }
    ]
  },
  {
    "city": "Nagpur",
    "latitude": 21.1458,
    "longitude": 79.0882,
    "suppliers": [
      {
        "id": "SUP-NAG-001",
        "name": "Vidarbha Office Depot",
        "latitude": 21.1458,
        "longitude": 79.0882,
        "location": "Sitabuldi, Nagpur"
      },
      {
        "id": "SUP-NAG-002",
        "name": "Nagpur Toner Care",
        "latitude": 21.1458,
        "longitude": 79.0882,
        "location": "Dharampeth, Nagpur"
      },
      {
        "id": "SUP-NAG-003",
        "name": "Central India Stationers",
        "latitude": 21.1458,
        "longitude": 79.0882,
        "location": "MIDC Hingna, Nagpur"
      },
      {
        "id": "SUP-NAG-004",
        "name": "Orange City Print Supplies",
        "latitude": 21.1458,
        "longitude": 79.0882,
        "location": "Ramdaspeth, Nagpur"
      },
      {
        "id": "SUP-NAG-005",
        "name": "Khandelwal Enterprises",
        "latitude": 21.1458,
        "longitude": 79.0882,
        "location": "Gandhibagh, Nagpur"
      },
      {
        "id": "SUP-NAG-006",
        "name": "Shree Ram Tech Mart",
        "latitude": 21.1458,
        "longitude": 79.0882,
        "location": "Wardha Road, Nagpur"
      },
      {
        "id": "SUP-NAG-007",
        "name": "Rajesh Infotech Nagpur",
        "latitude": 21.1458,
        "longitude": 79.0882,
        "location": "Itwari, Nagpur"
      },
      {
        "id": "SUP-NAG-008",
        "name": "Anand Office Solutions",
        "latitude": 21.1458,
        "longitude": 79.0882,
        "location": "Sadar, Nagpur"
      },
      {
        "id": "SUP-NAG-009",
        "name": "Mahalaxmi Paper House",
        "latitude": 21.1458,
        "longitude": 79.0882,
        "location": "Civil Lines, Nagpur"
      },
      {
        "id": "SUP-NAG-010",
        "name": "Pioneer Digital Consumables",
        "latitude": 21.1458,
        "longitude": 79.0882,
        "location": "Manish Nagar, Nagpur"
      }
    ],
    "vendors": [
      {
        "id": "VEN-NAG-001",
        "name": "Sitabuldi Trade Link",
        "latitude": 21.1458,
        "longitude": 79.0882,
        "location": "Sitabuldi, Nagpur"
      },
      {
        "id": "VEN-NAG-002",
        "name": "Nagpur Wholesale Traders",
        "latitude": 21.1458,
        "longitude": 79.0882,
        "location": "Dharampeth, Nagpur"
      },
      {
        "id": "VEN-NAG-003",
        "name": "Vidarbha Commercial Hub",
        "latitude": 21.1458,
        "longitude": 79.0882,
        "location": "MIDC Hingna, Nagpur"
      },
      {
        "id": "VEN-NAG-004",
        "name": "Ambika Toner World",
        "latitude": 21.1458,
        "longitude": 79.0882,
        "location": "Ramdaspeth, Nagpur"
      },
      {
        "id": "VEN-NAG-005",
        "name": "Goyal Industrial Agency",
        "latitude": 21.1458,
        "longitude": 79.0882,
        "location": "Gandhibagh, Nagpur"
      },
      {
        "id": "VEN-NAG-006",
        "name": "Express Office Mart",
        "latitude": 21.1458,
        "longitude": 79.0882,
        "location": "Wardha Road, Nagpur"
      },
      {
        "id": "VEN-NAG-007",
        "name": "Sai Ram Cartridges",
        "latitude": 21.1458,
        "longitude": 79.0882,
        "location": "Itwari, Nagpur"
      },
      {
        "id": "VEN-NAG-008",
        "name": "Lotus Stationery Hub",
        "latitude": 21.1458,
        "longitude": 79.0882,
        "location": "Sadar, Nagpur"
      },
      {
        "id": "VEN-NAG-009",
        "name": "Modern Print Distro",
        "latitude": 21.1458,
        "longitude": 79.0882,
        "location": "Civil Lines, Nagpur"
      },
      {
        "id": "VEN-NAG-010",
        "name": "Bharat Business Supply",
        "latitude": 21.1458,
        "longitude": 79.0882,
        "location": "Manish Nagar, Nagpur"
      }
    ]
  },
  {
    "city": "Nashik",
    "latitude": 19.9975,
    "longitude": 73.7898,
    "suppliers": [
      {
        "id": "SUP-NAS-001",
        "name": "Godavari Tech Supplies",
        "latitude": 19.9975,
        "longitude": 73.7898,
        "location": "College Road, Nashik"
      },
      {
        "id": "SUP-NAS-002",
        "name": "Nashik Cartridge Hub",
        "latitude": 19.9975,
        "longitude": 73.7898,
        "location": "Ambad MIDC, Nashik"
      },
      {
        "id": "SUP-NAS-003",
        "name": "Ambad Industrial Consumables",
        "latitude": 19.9975,
        "longitude": 73.7898,
        "location": "Satpur MIDC, Nashik"
      },
      {
        "id": "SUP-NAS-004",
        "name": "Panchavati Paper Traders",
        "latitude": 19.9975,
        "longitude": 73.7898,
        "location": "Panchavati, Nashik"
      },
      {
        "id": "SUP-NAS-005",
        "name": "Surya Office Dynamics",
        "latitude": 19.9975,
        "longitude": 73.7898,
        "location": "Gangapur Road, Nashik"
      },
      {
        "id": "SUP-NAS-006",
        "name": "Maratha Stationery World",
        "latitude": 19.9975,
        "longitude": 73.7898,
        "location": "Dwarka, Nashik"
      },
      {
        "id": "SUP-NAS-007",
        "name": "Kumbh City Print Care",
        "latitude": 19.9975,
        "longitude": 73.7898,
        "location": "Indira Nagar, Nashik"
      },
      {
        "id": "SUP-NAS-008",
        "name": "Silver Oak Technologies",
        "latitude": 19.9975,
        "longitude": 73.7898,
        "location": "CIDCO, Nashik"
      },
      {
        "id": "SUP-NAS-009",
        "name": "Sai Krupa Toner Depot",
        "latitude": 19.9975,
        "longitude": 73.7898,
        "location": "Nashik Road, Nashik"
      },
      {
        "id": "SUP-NAS-010",
        "name": "Dynamic Commercial Solutions",
        "latitude": 19.9975,
        "longitude": 73.7898,
        "location": "Mumbai Naka, Nashik"
      }
    ],
    "vendors": [
      {
        "id": "VEN-NAS-001",
        "name": "Satpur Trade Agency",
        "latitude": 19.9975,
        "longitude": 73.7898,
        "location": "College Road, Nashik"
      },
      {
        "id": "VEN-NAS-002",
        "name": "Nashik Central Mart",
        "latitude": 19.9975,
        "longitude": 73.7898,
        "location": "Ambad MIDC, Nashik"
      },
      {
        "id": "VEN-NAS-003",
        "name": "Apex Industrial Agency",
        "latitude": 19.9975,
        "longitude": 73.7898,
        "location": "Satpur MIDC, Nashik"
      },
      {
        "id": "VEN-NAS-004",
        "name": "Sai Samarth Print Solutions",
        "latitude": 19.9975,
        "longitude": 73.7898,
        "location": "Panchavati, Nashik"
      },
      {
        "id": "VEN-NAS-005",
        "name": "Trimurti Toner Center",
        "latitude": 19.9975,
        "longitude": 73.7898,
        "location": "Gangapur Road, Nashik"
      },
      {
        "id": "VEN-NAS-006",
        "name": "Mahavir Office Supply",
        "latitude": 19.9975,
        "longitude": 73.7898,
        "location": "Dwarka, Nashik"
      },
      {
        "id": "VEN-NAS-007",
        "name": "Shree Ganesh Traders",
        "latitude": 19.9975,
        "longitude": 73.7898,
        "location": "Indira Nagar, Nashik"
      },
      {
        "id": "VEN-NAS-008",
        "name": "Kiran Computer Stationery",
        "latitude": 19.9975,
        "longitude": 73.7898,
        "location": "CIDCO, Nashik"
      },
      {
        "id": "VEN-NAS-009",
        "name": "Prabhat Print Services",
        "latitude": 19.9975,
        "longitude": 73.7898,
        "location": "Nashik Road, Nashik"
      },
      {
        "id": "VEN-NAS-010",
        "name": "Vanguard Supply Line",
        "latitude": 19.9975,
        "longitude": 73.7898,
        "location": "Mumbai Naka, Nashik"
      }
    ]
  },
  {
    "city": "Chhatrapati Sambhajinagar",
    "latitude": 19.8762,
    "longitude": 75.3433,
    "suppliers": [
      {
        "id": "SUP-AUR-001",
        "name": "Ajanta Print Solutions",
        "latitude": 19.8762,
        "longitude": 75.3433,
        "location": "Waluj MIDC, Chhatrapati Sambhajinagar"
      },
      {
        "id": "SUP-AUR-002",
        "name": "Ellora Tech Consumables",
        "latitude": 19.8762,
        "longitude": 75.3433,
        "location": "Chikalthana MIDC, Chhatrapati Sambhajinagar"
      },
      {
        "id": "SUP-AUR-003",
        "name": "Marathwada Toner Depot",
        "latitude": 19.8762,
        "longitude": 75.3433,
        "location": "CIDCO, Chhatrapati Sambhajinagar"
      },
      {
        "id": "SUP-AUR-004",
        "name": "Waluj Industrial Supplies",
        "latitude": 19.8762,
        "longitude": 75.3433,
        "location": "Kranti Chowk, Chhatrapati Sambhajinagar"
      },
      {
        "id": "SUP-AUR-005",
        "name": "Chikalthana Cartridge Care",
        "latitude": 19.8762,
        "longitude": 75.3433,
        "location": "Railway Station Road, Chhatrapati Sambhajinagar"
      },
      {
        "id": "SUP-AUR-006",
        "name": "Chhatrapati Business Hub",
        "latitude": 19.8762,
        "longitude": 75.3433,
        "location": "Jalna Road, Chhatrapati Sambhajinagar"
      },
      {
        "id": "SUP-AUR-007",
        "name": "Devgiri Office Systems",
        "latitude": 19.8762,
        "longitude": 75.3433,
        "location": "Samarth Nagar, Chhatrapati Sambhajinagar"
      },
      {
        "id": "SUP-AUR-008",
        "name": "Aurangabad Paper Mart",
        "latitude": 19.8762,
        "longitude": 75.3433,
        "location": "Shendra MIDC, Chhatrapati Sambhajinagar"
      },
      {
        "id": "SUP-AUR-009",
        "name": "Kailash Stationery Works",
        "latitude": 19.8762,
        "longitude": 75.3433,
        "location": "Nirala Bazar, Chhatrapati Sambhajinagar"
      },
      {
        "id": "SUP-AUR-010",
        "name": "Deccan Commercial Distro",
        "latitude": 19.8762,
        "longitude": 75.3433,
        "location": "Shahgunj, Chhatrapati Sambhajinagar"
      }
    ],
    "vendors": [
      {
        "id": "VEN-AUR-001",
        "name": "Kranti Trade Partners",
        "latitude": 19.8762,
        "longitude": 75.3433,
        "location": "Waluj MIDC, Chhatrapati Sambhajinagar"
      },
      {
        "id": "VEN-AUR-002",
        "name": "Marathwada Business Link",
        "latitude": 19.8762,
        "longitude": 75.3433,
        "location": "Chikalthana MIDC, Chhatrapati Sambhajinagar"
      },
      {
        "id": "VEN-AUR-003",
        "name": "CIDCO Toner World",
        "latitude": 19.8762,
        "longitude": 75.3433,
        "location": "CIDCO, Chhatrapati Sambhajinagar"
      },
      {
        "id": "VEN-AUR-004",
        "name": "Ajanta Commercial Corp",
        "latitude": 19.8762,
        "longitude": 75.3433,
        "location": "Kranti Chowk, Chhatrapati Sambhajinagar"
      },
      {
        "id": "VEN-AUR-005",
        "name": "Sheetal Office Products",
        "latitude": 19.8762,
        "longitude": 75.3433,
        "location": "Railway Station Road, Chhatrapati Sambhajinagar"
      },
      {
        "id": "VEN-AUR-006",
        "name": "Guru Kripa Stationery",
        "latitude": 19.8762,
        "longitude": 75.3433,
        "location": "Jalna Road, Chhatrapati Sambhajinagar"
      },
      {
        "id": "VEN-AUR-007",
        "name": "Prime Point Consumables",
        "latitude": 19.8762,
        "longitude": 75.3433,
        "location": "Samarth Nagar, Chhatrapati Sambhajinagar"
      },
      {
        "id": "VEN-AUR-008",
        "name": "Imperial Tech Trade",
        "latitude": 19.8762,
        "longitude": 75.3433,
        "location": "Shendra MIDC, Chhatrapati Sambhajinagar"
      },
      {
        "id": "VEN-AUR-009",
        "name": "Balaji Paper Agencies",
        "latitude": 19.8762,
        "longitude": 75.3433,
        "location": "Nirala Bazar, Chhatrapati Sambhajinagar"
      },
      {
        "id": "VEN-AUR-010",
        "name": "Omkar Print Solutions",
        "latitude": 19.8762,
        "longitude": 75.3433,
        "location": "Shahgunj, Chhatrapati Sambhajinagar"
      }
    ]
  },
  {
    "city": "Thane",
    "latitude": 19.2183,
    "longitude": 72.9781,
    "suppliers": [
      {
        "id": "SUP-THA-001",
        "name": "Wagle Tech Products",
        "latitude": 19.2183,
        "longitude": 72.9781,
        "location": "Wagle Estate, Thane"
      },
      {
        "id": "SUP-THA-002",
        "name": "Thane District Print Hub",
        "latitude": 19.2183,
        "longitude": 72.9781,
        "location": "Ghubunder Road, Thane"
      },
      {
        "id": "SUP-THA-003",
        "name": "Naupada Stationery Mart",
        "latitude": 19.2183,
        "longitude": 72.9781,
        "location": "Naupada, Thane"
      },
      {
        "id": "SUP-THA-004",
        "name": "Ghodbunder Cartridge Care",
        "latitude": 19.2183,
        "longitude": 72.9781,
        "location": "Majiwada, Thane"
      },
      {
        "id": "SUP-THA-005",
        "name": "Lakeside Office Depot",
        "latitude": 19.2183,
        "longitude": 72.9781,
        "location": "Kopri, Thane"
      },
      {
        "id": "SUP-THA-006",
        "name": "Siddhivinayak Toner Store",
        "latitude": 19.2183,
        "longitude": 72.9781,
        "location": "Vartak Nagar, Thane"
      },
      {
        "id": "SUP-THA-007",
        "name": "Everest Commercial Supplies",
        "latitude": 19.2183,
        "longitude": 72.9781,
        "location": "Kolshet Road, Thane"
      },
      {
        "id": "SUP-THA-008",
        "name": "Universal Print Pack",
        "latitude": 19.2183,
        "longitude": 72.9781,
        "location": "Manpada, Thane"
      },
      {
        "id": "SUP-THA-009",
        "name": "Vartak Tech Trade",
        "latitude": 19.2183,
        "longitude": 72.9781,
        "location": "Panchpakhadi, Thane"
      },
      {
        "id": "SUP-THA-010",
        "name": "Metro Line Office Solutions",
        "latitude": 19.2183,
        "longitude": 72.9781,
        "location": "Teen Hath Naka, Thane"
      }
    ],
    "vendors": [
      {
        "id": "VEN-THA-001",
        "name": "Thane Central Distributors",
        "latitude": 19.2183,
        "longitude": 72.9781,
        "location": "Wagle Estate, Thane"
      },
      {
        "id": "VEN-THA-002",
        "name": "Wagle Industrial Traders",
        "latitude": 19.2183,
        "longitude": 72.9781,
        "location": "Ghubunder Road, Thane"
      },
      {
        "id": "VEN-THA-003",
        "name": "Kopri Commercial Agency",
        "latitude": 19.2183,
        "longitude": 72.9781,
        "location": "Naupada, Thane"
      },
      {
        "id": "VEN-THA-004",
        "name": "Cosmos Print World",
        "latitude": 19.2183,
        "longitude": 72.9781,
        "location": "Majiwada, Thane"
      },
      {
        "id": "VEN-THA-005",
        "name": "Horizon Toner Suppliers",
        "latitude": 19.2183,
        "longitude": 72.9781,
        "location": "Kopri, Thane"
      },
      {
        "id": "VEN-THA-006",
        "name": "Pragati Office Products",
        "latitude": 19.2183,
        "longitude": 72.9781,
        "location": "Vartak Nagar, Thane"
      },
      {
        "id": "VEN-THA-007",
        "name": "Shreeji Stationery Hub",
        "latitude": 19.2183,
        "longitude": 72.9781,
        "location": "Kolshet Road, Thane"
      },
      {
        "id": "VEN-THA-008",
        "name": "Jupiter Trade Links",
        "latitude": 19.2183,
        "longitude": 72.9781,
        "location": "Manpada, Thane"
      },
      {
        "id": "VEN-THA-009",
        "name": "Zenith Print Solutions",
        "latitude": 19.2183,
        "longitude": 72.9781,
        "location": "Panchpakhadi, Thane"
      },
      {
        "id": "VEN-THA-010",
        "name": "Sterling Distro Thane",
        "latitude": 19.2183,
        "longitude": 72.9781,
        "location": "Teen Hath Naka, Thane"
      }
    ]
  },
  {
    "city": "Solapur",
    "latitude": 17.6599,
    "longitude": 75.9064,
    "suppliers": [
      {
        "id": "SUP-SOL-001",
        "name": "Siddheshwar Tech Care",
        "latitude": 17.6599,
        "longitude": 75.9064,
        "location": "Navi Peth, Solapur"
      },
      {
        "id": "SUP-SOL-002",
        "name": "Solapur Cartridge Mart",
        "latitude": 17.6599,
        "longitude": 75.9064,
        "location": "MIDC Chincholi, Solapur"
      },
      {
        "id": "SUP-SOL-003",
        "name": "Chincholi Industrial Goods",
        "latitude": 17.6599,
        "longitude": 75.9064,
        "location": "Murarji Peth, Solapur"
      },
      {
        "id": "SUP-SOL-004",
        "name": "Textile City Toner Hub",
        "latitude": 17.6599,
        "longitude": 75.9064,
        "location": "Saat Rasta, Solapur"
      },
      {
        "id": "SUP-SOL-005",
        "name": "Navi Peth Stationery House",
        "latitude": 17.6599,
        "longitude": 75.9064,
        "location": "Hotgi Road, Solapur"
      },
      {
        "id": "SUP-SOL-006",
        "name": "Balaji Office Express",
        "latitude": 17.6599,
        "longitude": 75.9064,
        "location": "Lashkar, Solapur"
      },
      {
        "id": "SUP-SOL-007",
        "name": "Samrat Print Consumables",
        "latitude": 17.6599,
        "longitude": 75.9064,
        "location": "Jule Solapur, Solapur"
      },
      {
        "id": "SUP-SOL-008",
        "name": "Shree Siddhi Supplies",
        "latitude": 17.6599,
        "longitude": 75.9064,
        "location": "Bhawani Peth, Solapur"
      },
      {
        "id": "SUP-SOL-009",
        "name": "Vijay Office Systems",
        "latitude": 17.6599,
        "longitude": 75.9064,
        "location": "Budhwar Peth, Solapur"
      },
      {
        "id": "SUP-SOL-010",
        "name": "Kalyan Commercial Network",
        "latitude": 17.6599,
        "longitude": 75.9064,
        "location": "Old Pune Naka, Solapur"
      }
    ],
    "vendors": [
      {
        "id": "VEN-SOL-001",
        "name": "Solapur Trade Agency",
        "latitude": 17.6599,
        "longitude": 75.9064,
        "location": "Navi Peth, Solapur"
      },
      {
        "id": "VEN-SOL-002",
        "name": "Saat Rasta Commercials",
        "latitude": 17.6599,
        "longitude": 75.9064,
        "location": "MIDC Chincholi, Solapur"
      },
      {
        "id": "VEN-SOL-003",
        "name": "Murarji Print Distro",
        "latitude": 17.6599,
        "longitude": 75.9064,
        "location": "Murarji Peth, Solapur"
      },
      {
        "id": "VEN-SOL-004",
        "name": "Chincholi Supply Co.",
        "latitude": 17.6599,
        "longitude": 75.9064,
        "location": "Saat Rasta, Solapur"
      },
      {
        "id": "VEN-SOL-005",
        "name": "Venkateshwara Toner Mart",
        "latitude": 17.6599,
        "longitude": 75.9064,
        "location": "Hotgi Road, Solapur"
      },
      {
        "id": "VEN-SOL-006",
        "name": "Pooja Stationery Mart",
        "latitude": 17.6599,
        "longitude": 75.9064,
        "location": "Lashkar, Solapur"
      },
      {
        "id": "VEN-SOL-007",
        "name": "Standard Paper Corp",
        "latitude": 17.6599,
        "longitude": 75.9064,
        "location": "Jule Solapur, Solapur"
      },
      {
        "id": "VEN-SOL-008",
        "name": "Dattatraya Trade Links",
        "latitude": 17.6599,
        "longitude": 75.9064,
        "location": "Bhawani Peth, Solapur"
      },
      {
        "id": "VEN-SOL-009",
        "name": "City Core Office Supplies",
        "latitude": 17.6599,
        "longitude": 75.9064,
        "location": "Budhwar Peth, Solapur"
      },
      {
        "id": "VEN-SOL-010",
        "name": "Royal Print Vendors",
        "latitude": 17.6599,
        "longitude": 75.9064,
        "location": "Old Pune Naka, Solapur"
      }
    ]
  },
  {
    "city": "Kolhapur",
    "latitude": 16.705,
    "longitude": 74.2433,
    "suppliers": [
      {
        "id": "SUP-KOL-001",
        "name": "Mahalaxmi Print Hub",
        "latitude": 16.705,
        "longitude": 74.2433,
        "location": "Shiroli MIDC, Kolhapur"
      },
      {
        "id": "SUP-KOL-002",
        "name": "Kolhapur Toner Clinic",
        "latitude": 16.705,
        "longitude": 74.2433,
        "location": "Gokul Shirgaon, Kolhapur"
      },
      {
        "id": "SUP-KOL-003",
        "name": "Shiroli Tech Supplies",
        "latitude": 16.705,
        "longitude": 74.2433,
        "location": "Rajarampuri, Kolhapur"
      },
      {
        "id": "SUP-KOL-004",
        "name": "Shahu Maharaj Stationery",
        "latitude": 16.705,
        "longitude": 74.2433,
        "location": "Laxmipuri, Kolhapur"
      },
      {
        "id": "SUP-KOL-005",
        "name": "Rajarampuri Office Care",
        "latitude": 16.705,
        "longitude": 74.2433,
        "location": "Shahupuri, Kolhapur"
      },
      {
        "id": "SUP-KOL-006",
        "name": "Western Maharashtra Consumables",
        "latitude": 16.705,
        "longitude": 74.2433,
        "location": "Tarabai Park, Kolhapur"
      },
      {
        "id": "SUP-KOL-007",
        "name": "Panchganga Paper House",
        "latitude": 16.705,
        "longitude": 74.2433,
        "location": "Rankala, Kolhapur"
      },
      {
        "id": "SUP-KOL-008",
        "name": "Kalyani Industrial Distro",
        "latitude": 16.705,
        "longitude": 74.2433,
        "location": "Station Road, Kolhapur"
      },
      {
        "id": "SUP-KOL-009",
        "name": "Shivaji Tech Solutions",
        "latitude": 16.705,
        "longitude": 74.2433,
        "location": "Nagala Park, Kolhapur"
      },
      {
        "id": "SUP-KOL-010",
        "name": "Royal Maratha Print",
        "latitude": 16.705,
        "longitude": 74.2433,
        "location": "Gandhinagar, Kolhapur"
      }
    ],
    "vendors": [
      {
        "id": "VEN-KOL-001",
        "name": "Shahupuri Trade Link",
        "latitude": 16.705,
        "longitude": 74.2433,
        "location": "Shiroli MIDC, Kolhapur"
      },
      {
        "id": "VEN-KOL-002",
        "name": "Kolhapur Business Syndicate",
        "latitude": 16.705,
        "longitude": 74.2433,
        "location": "Gokul Shirgaon, Kolhapur"
      },
      {
        "id": "VEN-KOL-003",
        "name": "Laxmipuri Commercial Mart",
        "latitude": 16.705,
        "longitude": 74.2433,
        "location": "Rajarampuri, Kolhapur"
      },
      {
        "id": "VEN-KOL-004",
        "name": "Shiroli Supply Network",
        "latitude": 16.705,
        "longitude": 74.2433,
        "location": "Laxmipuri, Kolhapur"
      },
      {
        "id": "VEN-KOL-005",
        "name": "Rajarampuri Toner World",
        "latitude": 16.705,
        "longitude": 74.2433,
        "location": "Shahupuri, Kolhapur"
      },
      {
        "id": "VEN-KOL-006",
        "name": "Shree Mahalaxmi Traders",
        "latitude": 16.705,
        "longitude": 74.2433,
        "location": "Tarabai Park, Kolhapur"
      },
      {
        "id": "VEN-KOL-007",
        "name": "Chhatrapati Distro",
        "latitude": 16.705,
        "longitude": 74.2433,
        "location": "Rankala, Kolhapur"
      },
      {
        "id": "VEN-KOL-008",
        "name": "Ambika Stationery Mart",
        "latitude": 16.705,
        "longitude": 74.2433,
        "location": "Station Road, Kolhapur"
      },
      {
        "id": "VEN-KOL-009",
        "name": "Heritage Print Solutions",
        "latitude": 16.705,
        "longitude": 74.2433,
        "location": "Nagala Park, Kolhapur"
      },
      {
        "id": "VEN-KOL-010",
        "name": "Imperial Kolhapur Supplies",
        "latitude": 16.705,
        "longitude": 74.2433,
        "location": "Gandhinagar, Kolhapur"
      }
    ]
  },
  {
    "city": "Ahmedabad",
    "latitude": 23.0225,
    "longitude": 72.5714,
    "suppliers": [
      {
        "id": "SUP-AHM-001",
        "name": "Sabarmati Print Solutions",
        "latitude": 23.0225,
        "longitude": 72.5714,
        "location": "SG Highway, Ahmedabad"
      },
      {
        "id": "SUP-AHM-002",
        "name": "Karnavati Toner Care",
        "latitude": 23.0225,
        "longitude": 72.5714,
        "location": "Ashram Road, Ahmedabad"
      },
      {
        "id": "SUP-AHM-003",
        "name": "SG Highway Tech Depot",
        "latitude": 23.0225,
        "longitude": 72.5714,
        "location": "Navrangpura, Ahmedabad"
      },
      {
        "id": "SUP-AHM-004",
        "name": "Navrangpura Office Systems",
        "latitude": 23.0225,
        "longitude": 72.5714,
        "location": "Prahlad Nagar, Ahmedabad"
      },
      {
        "id": "SUP-AHM-005",
        "name": "Gujarat Cartridge World",
        "latitude": 23.0225,
        "longitude": 72.5714,
        "location": "Maninagar, Ahmedabad"
      },
      {
        "id": "SUP-AHM-006",
        "name": "Adani Shanti Print Supplies",
        "latitude": 23.0225,
        "longitude": 72.5714,
        "location": "Naroda GIDC, Ahmedabad"
      },
      {
        "id": "SUP-AHM-007",
        "name": "Heritage Paper Mart",
        "latitude": 23.0225,
        "longitude": 72.5714,
        "location": "C.G. Road, Ahmedabad"
      },
      {
        "id": "SUP-AHM-008",
        "name": "Sanand Industrial Supplies",
        "latitude": 23.0225,
        "longitude": 72.5714,
        "location": "Ellisbridge, Ahmedabad"
      },
      {
        "id": "SUP-AHM-009",
        "name": "Prahlad Nagar Tech Link",
        "latitude": 23.0225,
        "longitude": 72.5714,
        "location": "Sanand GIDC, Ahmedabad"
      },
      {
        "id": "SUP-AHM-010",
        "name": "Ahmedabad Commercial Hub",
        "latitude": 23.0225,
        "longitude": 72.5714,
        "location": "Sarkhej, Ahmedabad"
      }
    ],
    "vendors": [
      {
        "id": "VEN-AHM-001",
        "name": "Ashram Road Distributors",
        "latitude": 23.0225,
        "longitude": 72.5714,
        "location": "SG Highway, Ahmedabad"
      },
      {
        "id": "VEN-AHM-002",
        "name": "Naroda GIDC Trade Hub",
        "latitude": 23.0225,
        "longitude": 72.5714,
        "location": "Ashram Road, Ahmedabad"
      },
      {
        "id": "VEN-AHM-003",
        "name": "Maninagar Toner Depot",
        "latitude": 23.0225,
        "longitude": 72.5714,
        "location": "Navrangpura, Ahmedabad"
      },
      {
        "id": "VEN-AHM-004",
        "name": "Ellisbridge Print Vendors",
        "latitude": 23.0225,
        "longitude": 72.5714,
        "location": "Prahlad Nagar, Ahmedabad"
      },
      {
        "id": "VEN-AHM-005",
        "name": "Karnavati Paper Corp",
        "latitude": 23.0225,
        "longitude": 72.5714,
        "location": "Maninagar, Ahmedabad"
      },
      {
        "id": "VEN-AHM-006",
        "name": "Swastik Trade Syndicate",
        "latitude": 23.0225,
        "longitude": 72.5714,
        "location": "Naroda GIDC, Ahmedabad"
      },
      {
        "id": "VEN-AHM-007",
        "name": "Apex Gujarat Suppliers",
        "latitude": 23.0225,
        "longitude": 72.5714,
        "location": "C.G. Road, Ahmedabad"
      },
      {
        "id": "VEN-AHM-008",
        "name": "Radhe Krishna Stationery",
        "latitude": 23.0225,
        "longitude": 72.5714,
        "location": "Ellisbridge, Ahmedabad"
      },
      {
        "id": "VEN-AHM-009",
        "name": "Shreeji Corporate Services",
        "latitude": 23.0225,
        "longitude": 72.5714,
        "location": "Sanand GIDC, Ahmedabad"
      },
      {
        "id": "VEN-AHM-010",
        "name": "Vibrant Gujarat Distro",
        "latitude": 23.0225,
        "longitude": 72.5714,
        "location": "Sarkhej, Ahmedabad"
      }
    ]
  },
  {
    "city": "Surat",
    "latitude": 21.1702,
    "longitude": 72.8311,
    "suppliers": [
      {
        "id": "SUP-SUR-001",
        "name": "Diamond City Print Solutions",
        "latitude": 21.1702,
        "longitude": 72.8311,
        "location": "Ring Road, Surat"
      },
      {
        "id": "SUP-SUR-002",
        "name": "Surat Cartridge Depot",
        "latitude": 21.1702,
        "longitude": 72.8311,
        "location": "Pandesara GIDC, Surat"
      },
      {
        "id": "SUP-SUR-003",
        "name": "Pandesara Industrial Consumables",
        "latitude": 21.1702,
        "longitude": 72.8311,
        "location": "Sachin GIDC, Surat"
      },
      {
        "id": "SUP-SUR-004",
        "name": "Tapi River Toner Clinic",
        "latitude": 21.1702,
        "longitude": 72.8311,
        "location": "Adajan, Surat"
      },
      {
        "id": "SUP-SUR-005",
        "name": "Varachha Tech Mart",
        "latitude": 21.1702,
        "longitude": 72.8311,
        "location": "Varachha, Surat"
      },
      {
        "id": "SUP-SUR-006",
        "name": "Sachin GIDC Office Needs",
        "latitude": 21.1702,
        "longitude": 72.8311,
        "location": "Udhna, Surat"
      },
      {
        "id": "SUP-SUR-007",
        "name": "Adajan Stationery World",
        "latitude": 21.1702,
        "longitude": 72.8311,
        "location": "Ghopipura, Surat"
      },
      {
        "id": "SUP-SUR-008",
        "name": "Silk City Print Care",
        "latitude": 21.1702,
        "longitude": 72.8311,
        "location": "Majura Gate, Surat"
      },
      {
        "id": "SUP-SUR-009",
        "name": "Surat Corporate Supplies",
        "latitude": 21.1702,
        "longitude": 72.8311,
        "location": "Piplod, Surat"
      },
      {
        "id": "SUP-SUR-010",
        "name": "Shree Ram Toner Agency",
        "latitude": 21.1702,
        "longitude": 72.8311,
        "location": "Katargam, Surat"
      }
    ],
    "vendors": [
      {
        "id": "VEN-SUR-001",
        "name": "Ring Road Trade Network",
        "latitude": 21.1702,
        "longitude": 72.8311,
        "location": "Ring Road, Surat"
      },
      {
        "id": "VEN-SUR-002",
        "name": "Surat Textile City Vendors",
        "latitude": 21.1702,
        "longitude": 72.8311,
        "location": "Pandesara GIDC, Surat"
      },
      {
        "id": "VEN-SUR-003",
        "name": "Udhna Commercial Distro",
        "latitude": 21.1702,
        "longitude": 72.8311,
        "location": "Sachin GIDC, Surat"
      },
      {
        "id": "VEN-SUR-004",
        "name": "Katargam Trade Link",
        "latitude": 21.1702,
        "longitude": 72.8311,
        "location": "Adajan, Surat"
      },
      {
        "id": "VEN-SUR-005",
        "name": "Majura Office Supply Co.",
        "latitude": 21.1702,
        "longitude": 72.8311,
        "location": "Varachha, Surat"
      },
      {
        "id": "VEN-SUR-006",
        "name": "Diamond City Consumables",
        "latitude": 21.1702,
        "longitude": 72.8311,
        "location": "Udhna, Surat"
      },
      {
        "id": "VEN-SUR-007",
        "name": "Shreeji Paper Traders",
        "latitude": 21.1702,
        "longitude": 72.8311,
        "location": "Ghopipura, Surat"
      },
      {
        "id": "VEN-SUR-008",
        "name": "Gopipura Toner Mart",
        "latitude": 21.1702,
        "longitude": 72.8311,
        "location": "Majura Gate, Surat"
      },
      {
        "id": "VEN-SUR-009",
        "name": "Surat Central Distributor",
        "latitude": 21.1702,
        "longitude": 72.8311,
        "location": "Piplod, Surat"
      },
      {
        "id": "VEN-SUR-010",
        "name": "Kuber Office Systems",
        "latitude": 21.1702,
        "longitude": 72.8311,
        "location": "Katargam, Surat"
      }
    ]
  },
  {
    "city": "Vadodara",
    "latitude": 22.3072,
    "longitude": 73.1812,
    "suppliers": [
      {
        "id": "SUP-VAD-001",
        "name": "Sayaji Print Systems",
        "latitude": 22.3072,
        "longitude": 73.1812,
        "location": "Alkapuri, Vadodara"
      },
      {
        "id": "SUP-VAD-002",
        "name": "Baroda Cartridge World",
        "latitude": 22.3072,
        "longitude": 73.1812,
        "location": "Makarpura GIDC, Vadodara"
      },
      {
        "id": "SUP-VAD-003",
        "name": "Makarpura Industrial Supply",
        "latitude": 22.3072,
        "longitude": 73.1812,
        "location": "Sayajigunj, Vadodara"
      },
      {
        "id": "SUP-VAD-004",
        "name": "Alkapuri Office Needs",
        "latitude": 22.3072,
        "longitude": 73.1812,
        "location": "Manjalpur, Vadodara"
      },
      {
        "id": "SUP-VAD-005",
        "name": "Sanskari Nagari Toner Care",
        "latitude": 22.3072,
        "longitude": 73.1812,
        "location": "Akota, Vadodara"
      },
      {
        "id": "SUP-VAD-006",
        "name": "Vadodara Tech Stationers",
        "latitude": 22.3072,
        "longitude": 73.1812,
        "location": "Gorwa, Vadodara"
      },
      {
        "id": "SUP-VAD-007",
        "name": "Akota Print Consumables",
        "latitude": 22.3072,
        "longitude": 73.1812,
        "location": "Karelibaug, Vadodara"
      },
      {
        "id": "SUP-VAD-008",
        "name": "Manjalpur Stationery Hub",
        "latitude": 22.3072,
        "longitude": 73.1812,
        "location": "Waghodia Road, Vadodara"
      },
      {
        "id": "SUP-VAD-009",
        "name": "Gorwa Tech Care",
        "latitude": 22.3072,
        "longitude": 73.1812,
        "location": "Gotri, Vadodara"
      },
      {
        "id": "SUP-VAD-010",
        "name": "Central Gujarat Print Link",
        "latitude": 22.3072,
        "longitude": 73.1812,
        "location": "Fatehgunj, Vadodara"
      }
    ],
    "vendors": [
      {
        "id": "VEN-VAD-001",
        "name": "Baroda Trade Syndicate",
        "latitude": 22.3072,
        "longitude": 73.1812,
        "location": "Alkapuri, Vadodara"
      },
      {
        "id": "VEN-VAD-002",
        "name": "Sayajigunj Commercial Store",
        "latitude": 22.3072,
        "longitude": 73.1812,
        "location": "Makarpura GIDC, Vadodara"
      },
      {
        "id": "VEN-VAD-003",
        "name": "Makarpura Vendor Hub",
        "latitude": 22.3072,
        "longitude": 73.1812,
        "location": "Sayajigunj, Vadodara"
      },
      {
        "id": "VEN-VAD-004",
        "name": "Alkapuri Distro Line",
        "latitude": 22.3072,
        "longitude": 73.1812,
        "location": "Manjalpur, Vadodara"
      },
      {
        "id": "VEN-VAD-005",
        "name": "Shreeji Toner Network",
        "latitude": 22.3072,
        "longitude": 73.1812,
        "location": "Akota, Vadodara"
      },
      {
        "id": "VEN-VAD-006",
        "name": "Royal Baroda Supplies",
        "latitude": 22.3072,
        "longitude": 73.1812,
        "location": "Gorwa, Vadodara"
      },
      {
        "id": "VEN-VAD-007",
        "name": "Vanguard Commercial Corp",
        "latitude": 22.3072,
        "longitude": 73.1812,
        "location": "Karelibaug, Vadodara"
      },
      {
        "id": "VEN-VAD-008",
        "name": "Karelibaug Trade Link",
        "latitude": 22.3072,
        "longitude": 73.1812,
        "location": "Waghodia Road, Vadodara"
      },
      {
        "id": "VEN-VAD-009",
        "name": "Prabhat Print Services",
        "latitude": 22.3072,
        "longitude": 73.1812,
        "location": "Gotri, Vadodara"
      },
      {
        "id": "VEN-VAD-010",
        "name": "United Baroda Agencies",
        "latitude": 22.3072,
        "longitude": 73.1812,
        "location": "Fatehgunj, Vadodara"
      }
    ]
  },
  {
    "city": "Rajkot",
    "latitude": 22.3039,
    "longitude": 70.8022,
    "suppliers": [
      {
        "id": "SUP-RAJ-001",
        "name": "Saurashtra Print Solutions",
        "latitude": 22.3039,
        "longitude": 70.8022,
        "location": "Yagnik Road, Rajkot"
      },
      {
        "id": "SUP-RAJ-002",
        "name": "Rajkot Toner Depot",
        "latitude": 22.3039,
        "longitude": 70.8022,
        "location": "Aji GIDC, Rajkot"
      },
      {
        "id": "SUP-RAJ-003",
        "name": "Aji Industrial Consumables",
        "latitude": 22.3039,
        "longitude": 70.8022,
        "location": "Metoda GIDC, Rajkot"
      },
      {
        "id": "SUP-RAJ-004",
        "name": "Metoda GIDC Office Care",
        "latitude": 22.3039,
        "longitude": 70.8022,
        "location": "Kalawad Road, Rajkot"
      },
      {
        "id": "SUP-RAJ-005",
        "name": "Yagnik Road Stationers",
        "latitude": 22.3039,
        "longitude": 70.8022,
        "location": "Dhebar Road, Rajkot"
      },
      {
        "id": "SUP-RAJ-006",
        "name": "Kathiawar Cartridge World",
        "latitude": 22.3039,
        "longitude": 70.8022,
        "location": "Gondal Road, Rajkot"
      },
      {
        "id": "SUP-RAJ-007",
        "name": "Riddhi Siddhi Print Tech",
        "latitude": 22.3039,
        "longitude": 70.8022,
        "location": "Bhaktinagar, Rajkot"
      },
      {
        "id": "SUP-RAJ-008",
        "name": "Kalawad Office Systems",
        "latitude": 22.3039,
        "longitude": 70.8022,
        "location": "University Road, Rajkot"
      },
      {
        "id": "SUP-RAJ-009",
        "name": "Gondal Road Tech Care",
        "latitude": 22.3039,
        "longitude": 70.8022,
        "location": "Kothariya, Rajkot"
      },
      {
        "id": "SUP-RAJ-010",
        "name": "Shreeji Corporate Hub",
        "latitude": 22.3039,
        "longitude": 70.8022,
        "location": "Madhapar, Rajkot"
      }
    ],
    "vendors": [
      {
        "id": "VEN-RAJ-001",
        "name": "Rajkot Wholesale Network",
        "latitude": 22.3039,
        "longitude": 70.8022,
        "location": "Yagnik Road, Rajkot"
      },
      {
        "id": "VEN-RAJ-002",
        "name": "Dhebar Road Commercial Mart",
        "latitude": 22.3039,
        "longitude": 70.8022,
        "location": "Aji GIDC, Rajkot"
      },
      {
        "id": "VEN-RAJ-003",
        "name": "Saurashtra Trade Link",
        "latitude": 22.3039,
        "longitude": 70.8022,
        "location": "Metoda GIDC, Rajkot"
      },
      {
        "id": "VEN-RAJ-004",
        "name": "Bhaktinagar Toner Distro",
        "latitude": 22.3039,
        "longitude": 70.8022,
        "location": "Kalawad Road, Rajkot"
      },
      {
        "id": "VEN-RAJ-005",
        "name": "Metoda Supply Chain",
        "latitude": 22.3039,
        "longitude": 70.8022,
        "location": "Dhebar Road, Rajkot"
      },
      {
        "id": "VEN-RAJ-006",
        "name": "Apex Rajkot Distro",
        "latitude": 22.3039,
        "longitude": 70.8022,
        "location": "Gondal Road, Rajkot"
      },
      {
        "id": "VEN-RAJ-007",
        "name": "Shakti Office Supplies",
        "latitude": 22.3039,
        "longitude": 70.8022,
        "location": "Bhaktinagar, Rajkot"
      },
      {
        "id": "VEN-RAJ-008",
        "name": "Khodiyar Print World",
        "latitude": 22.3039,
        "longitude": 70.8022,
        "location": "University Road, Rajkot"
      },
      {
        "id": "VEN-RAJ-009",
        "name": "Maruti Tech Vendors",
        "latitude": 22.3039,
        "longitude": 70.8022,
        "location": "Kothariya, Rajkot"
      },
      {
        "id": "VEN-RAJ-010",
        "name": "Royal Saurashtra Mart",
        "latitude": 22.3039,
        "longitude": 70.8022,
        "location": "Madhapar, Rajkot"
      }
    ]
  },
  {
    "city": "Bhavnagar",
    "latitude": 21.7645,
    "longitude": 72.1519,
    "suppliers": [
      {
        "id": "SUP-BHA-001",
        "name": "Gohilwad Print Care",
        "latitude": 21.7645,
        "longitude": 72.1519,
        "location": "Waghawadi Road, Bhavnagar"
      },
      {
        "id": "SUP-BHA-002",
        "name": "Bhavnagar Toner Clinic",
        "latitude": 21.7645,
        "longitude": 72.1519,
        "location": "Chitra GIDC, Bhavnagar"
      },
      {
        "id": "SUP-BHA-003",
        "name": "Chitra GIDC Industrial Supply",
        "latitude": 21.7645,
        "longitude": 72.1519,
        "location": "Kalanala, Bhavnagar"
      },
      {
        "id": "SUP-BHA-004",
        "name": "Waghawadi Stationery Hub",
        "latitude": 21.7645,
        "longitude": 72.1519,
        "location": "Ghogha Circle, Bhavnagar"
      },
      {
        "id": "SUP-BHA-005",
        "name": "Alang Gateway Office Mart",
        "latitude": 21.7645,
        "longitude": 72.1519,
        "location": "Subhashnagar, Bhavnagar"
      },
      {
        "id": "SUP-BHA-006",
        "name": "Nilambag Tech Solutions",
        "latitude": 21.7645,
        "longitude": 72.1519,
        "location": "Nilambag, Bhavnagar"
      },
      {
        "id": "SUP-BHA-007",
        "name": "Kalanala Cartridge Store",
        "latitude": 21.7645,
        "longitude": 72.1519,
        "location": "Kaliabid, Bhavnagar"
      },
      {
        "id": "SUP-BHA-008",
        "name": "Bhavnagar Paper House",
        "latitude": 21.7645,
        "longitude": 72.1519,
        "location": "Crescent Circle, Bhavnagar"
      },
      {
        "id": "SUP-BHA-009",
        "name": "Saurashtra Sea Link Supplies",
        "latitude": 21.7645,
        "longitude": 72.1519,
        "location": "Bhavnagar Port, Bhavnagar"
      },
      {
        "id": "SUP-BHA-010",
        "name": "Shree Krishna Print Pack",
        "latitude": 21.7645,
        "longitude": 72.1519,
        "location": "Barton Library Area, Bhavnagar"
      }
    ],
    "vendors": [
      {
        "id": "VEN-BHA-001",
        "name": "Bhavnagar Trade Centre",
        "latitude": 21.7645,
        "longitude": 72.1519,
        "location": "Waghawadi Road, Bhavnagar"
      },
      {
        "id": "VEN-BHA-002",
        "name": "Waghawadi Commercial Vendors",
        "latitude": 21.7645,
        "longitude": 72.1519,
        "location": "Chitra GIDC, Bhavnagar"
      },
      {
        "id": "VEN-BHA-003",
        "name": "Chitra Supply Agency",
        "latitude": 21.7645,
        "longitude": 72.1519,
        "location": "Kalanala, Bhavnagar"
      },
      {
        "id": "VEN-BHA-004",
        "name": "Ghogha Circle Distro",
        "latitude": 21.7645,
        "longitude": 72.1519,
        "location": "Ghogha Circle, Bhavnagar"
      },
      {
        "id": "VEN-BHA-005",
        "name": "Gohilwad Commercial Link",
        "latitude": 21.7645,
        "longitude": 72.1519,
        "location": "Subhashnagar, Bhavnagar"
      },
      {
        "id": "VEN-BHA-006",
        "name": "Jay Ambe Toner World",
        "latitude": 21.7645,
        "longitude": 72.1519,
        "location": "Nilambag, Bhavnagar"
      },
      {
        "id": "VEN-BHA-007",
        "name": "Bhavani Stationery Distro",
        "latitude": 21.7645,
        "longitude": 72.1519,
        "location": "Kaliabid, Bhavnagar"
      },
      {
        "id": "VEN-BHA-008",
        "name": "Coastal Gujarat Supplies",
        "latitude": 21.7645,
        "longitude": 72.1519,
        "location": "Crescent Circle, Bhavnagar"
      },
      {
        "id": "VEN-BHA-009",
        "name": "Shiv Shakti Paper Mart",
        "latitude": 21.7645,
        "longitude": 72.1519,
        "location": "Bhavnagar Port, Bhavnagar"
      },
      {
        "id": "VEN-BHA-010",
        "name": "Reliance Point Office Care",
        "latitude": 21.7645,
        "longitude": 72.1519,
        "location": "Barton Library Area, Bhavnagar"
      }
    ]
  },
  {
    "city": "Jamnagar",
    "latitude": 22.4707,
    "longitude": 70.0577,
    "suppliers": [
      {
        "id": "SUP-JAM-001",
        "name": "Brass City Print Depot",
        "latitude": 22.4707,
        "longitude": 70.0577,
        "location": "Bedeshwar GIDC, Jamnagar"
      },
      {
        "id": "SUP-JAM-002",
        "name": "Jamnagar Toner Care",
        "latitude": 22.4707,
        "longitude": 70.0577,
        "location": "Dared GIDC, Jamnagar"
      },
      {
        "id": "SUP-JAM-003",
        "name": "Bedeshwar Industrial Consumables",
        "latitude": 22.4707,
        "longitude": 70.0577,
        "location": "Panchvati, Jamnagar"
      },
      {
        "id": "SUP-JAM-004",
        "name": "Dared GIDC Office Care",
        "latitude": 22.4707,
        "longitude": 70.0577,
        "location": "Indira Marg, Jamnagar"
      },
      {
        "id": "SUP-JAM-005",
        "name": "Reliance Greens Supply Partner",
        "latitude": 22.4707,
        "longitude": 70.0577,
        "location": "Digvijay Plot, Jamnagar"
      },
      {
        "id": "SUP-JAM-006",
        "name": "Digvijay Print Store",
        "latitude": 22.4707,
        "longitude": 70.0577,
        "location": "Patel Colony, Jamnagar"
      },
      {
        "id": "SUP-JAM-007",
        "name": "Patel Colony Stationers",
        "latitude": 22.4707,
        "longitude": 70.0577,
        "location": "Grain Market, Jamnagar"
      },
      {
        "id": "SUP-JAM-008",
        "name": "Nawanagar Tech Solutions",
        "latitude": 22.4707,
        "longitude": 70.0577,
        "location": "Khambhalia Road, Jamnagar"
      },
      {
        "id": "SUP-JAM-009",
        "name": "Dwarka Road Paper Mart",
        "latitude": 22.4707,
        "longitude": 70.0577,
        "location": "Gulabnagar, Jamnagar"
      },
      {
        "id": "SUP-JAM-010",
        "name": "Khodiyar Cartridge Hub",
        "latitude": 22.4707,
        "longitude": 70.0577,
        "location": "Summer Club Area, Jamnagar"
      }
    ],
    "vendors": [
      {
        "id": "VEN-JAM-001",
        "name": "Jamnagar Commercial Distro",
        "latitude": 22.4707,
        "longitude": 70.0577,
        "location": "Bedeshwar GIDC, Jamnagar"
      },
      {
        "id": "VEN-JAM-002",
        "name": "Brass City Trade Line",
        "latitude": 22.4707,
        "longitude": 70.0577,
        "location": "Dared GIDC, Jamnagar"
      },
      {
        "id": "VEN-JAM-003",
        "name": "Bedeshwar Supply Hub",
        "latitude": 22.4707,
        "longitude": 70.0577,
        "location": "Panchvati, Jamnagar"
      },
      {
        "id": "VEN-JAM-004",
        "name": "Dared Industrial Vendors",
        "latitude": 22.4707,
        "longitude": 70.0577,
        "location": "Indira Marg, Jamnagar"
      },
      {
        "id": "VEN-JAM-005",
        "name": "Nawanagar Commercial Link",
        "latitude": 22.4707,
        "longitude": 70.0577,
        "location": "Digvijay Plot, Jamnagar"
      },
      {
        "id": "VEN-JAM-006",
        "name": "Shree Ganesh Toner Agency",
        "latitude": 22.4707,
        "longitude": 70.0577,
        "location": "Patel Colony, Jamnagar"
      },
      {
        "id": "VEN-JAM-007",
        "name": "Grain Market Stationery",
        "latitude": 22.4707,
        "longitude": 70.0577,
        "location": "Grain Market, Jamnagar"
      },
      {
        "id": "VEN-JAM-008",
        "name": "Saurashtra Oil & Print Supplies",
        "latitude": 22.4707,
        "longitude": 70.0577,
        "location": "Khambhalia Road, Jamnagar"
      },
      {
        "id": "VEN-JAM-009",
        "name": "Universal Jamnagar Vendors",
        "latitude": 22.4707,
        "longitude": 70.0577,
        "location": "Gulabnagar, Jamnagar"
      },
      {
        "id": "VEN-JAM-010",
        "name": "Premier Tech Store",
        "latitude": 22.4707,
        "longitude": 70.0577,
        "location": "Summer Club Area, Jamnagar"
      }
    ]
  },
  {
    "city": "Gandhinagar",
    "latitude": 23.2156,
    "longitude": 72.6369,
    "suppliers": [
      {
        "id": "SUP-GAN-001",
        "name": "Capital City Print Solutions",
        "latitude": 23.2156,
        "longitude": 72.6369,
        "location": "Sector 11, Gandhinagar"
      },
      {
        "id": "SUP-GAN-002",
        "name": "Infocity Toner Care",
        "latitude": 23.2156,
        "longitude": 72.6369,
        "location": "Sector 21, Gandhinagar"
      },
      {
        "id": "SUP-GAN-003",
        "name": "GIFT City Commercial Supplies",
        "latitude": 23.2156,
        "longitude": 72.6369,
        "location": "Infocity, Gandhinagar"
      },
      {
        "id": "SUP-GAN-004",
        "name": "Sector 21 Stationery Mart",
        "latitude": 23.2156,
        "longitude": 72.6369,
        "location": "GIFT City, Gandhinagar"
      },
      {
        "id": "SUP-GAN-005",
        "name": "Gandhinagar Cartridge Clinic",
        "latitude": 23.2156,
        "longitude": 72.6369,
        "location": "Sector 16, Gandhinagar"
      },
      {
        "id": "SUP-GAN-006",
        "name": "Kudasan Office Needs",
        "latitude": 23.2156,
        "longitude": 72.6369,
        "location": "Kudasan, Gandhinagar"
      },
      {
        "id": "SUP-GAN-007",
        "name": "Sector 28 GIDC Industrial Care",
        "latitude": 23.2156,
        "longitude": 72.6369,
        "location": "Randesan, Gandhinagar"
      },
      {
        "id": "SUP-GAN-008",
        "name": "Vibrant Capital Tech",
        "latitude": 23.2156,
        "longitude": 72.6369,
        "location": "Sector 28 GIDC, Gandhinagar"
      },
      {
        "id": "SUP-GAN-009",
        "name": "Swaminarayan Print Hub",
        "latitude": 23.2156,
        "longitude": 72.6369,
        "location": "Sargasan, Gandhinagar"
      },
      {
        "id": "SUP-GAN-010",
        "name": "Gujarat State Supplies",
        "latitude": 23.2156,
        "longitude": 72.6369,
        "location": "Vavol, Gandhinagar"
      }
    ],
    "vendors": [
      {
        "id": "VEN-GAN-001",
        "name": "Infocity Commercial Distro",
        "latitude": 23.2156,
        "longitude": 72.6369,
        "location": "Sector 11, Gandhinagar"
      },
      {
        "id": "VEN-GAN-002",
        "name": "GIFT City Supply Network",
        "latitude": 23.2156,
        "longitude": 72.6369,
        "location": "Sector 21, Gandhinagar"
      },
      {
        "id": "VEN-GAN-003",
        "name": "Sector 11 Trade Partner",
        "latitude": 23.2156,
        "longitude": 72.6369,
        "location": "Infocity, Gandhinagar"
      },
      {
        "id": "VEN-GAN-004",
        "name": "Gandhinagar Central Agency",
        "latitude": 23.2156,
        "longitude": 72.6369,
        "location": "GIFT City, Gandhinagar"
      },
      {
        "id": "VEN-GAN-005",
        "name": "Capital Office Solutions",
        "latitude": 23.2156,
        "longitude": 72.6369,
        "location": "Sector 16, Gandhinagar"
      },
      {
        "id": "VEN-GAN-006",
        "name": "Shreeji GIFT Trade",
        "latitude": 23.2156,
        "longitude": 72.6369,
        "location": "Kudasan, Gandhinagar"
      },
      {
        "id": "VEN-GAN-007",
        "name": "Vanguard Government Supplies",
        "latitude": 23.2156,
        "longitude": 72.6369,
        "location": "Randesan, Gandhinagar"
      },
      {
        "id": "VEN-GAN-008",
        "name": "Tech Corridor Vendors",
        "latitude": 23.2156,
        "longitude": 72.6369,
        "location": "Sector 28 GIDC, Gandhinagar"
      },
      {
        "id": "VEN-GAN-009",
        "name": "Apex Sector Distro",
        "latitude": 23.2156,
        "longitude": 72.6369,
        "location": "Sargasan, Gandhinagar"
      },
      {
        "id": "VEN-GAN-010",
        "name": "National Capital Stationery",
        "latitude": 23.2156,
        "longitude": 72.6369,
        "location": "Vavol, Gandhinagar"
      }
    ]
  },
  {
    "city": "Junagadh",
    "latitude": 21.5222,
    "longitude": 70.4579,
    "suppliers": [
      {
        "id": "SUP-JUN-001",
        "name": "Girnar Print Tech",
        "latitude": 21.5222,
        "longitude": 70.4579,
        "location": "Zanzarda Road, Junagadh"
      },
      {
        "id": "SUP-JUN-002",
        "name": "Junagadh Toner Clinic",
        "latitude": 21.5222,
        "longitude": 70.4579,
        "location": "Girnar Darwaja, Junagadh"
      },
      {
        "id": "SUP-JUN-003",
        "name": "Zanzarda Road Stationers",
        "latitude": 21.5222,
        "longitude": 70.4579,
        "location": "MG Road, Junagadh"
      },
      {
        "id": "SUP-JUN-004",
        "name": "Kalva Chowk Office Mart",
        "latitude": 21.5222,
        "longitude": 70.4579,
        "location": "Kalva Chowk, Junagadh"
      },
      {
        "id": "SUP-JUN-005",
        "name": "Saurashtra Heritage Paper",
        "latitude": 21.5222,
        "longitude": 70.4579,
        "location": "Moti Baug, Junagadh"
      },
      {
        "id": "SUP-JUN-006",
        "name": "Lion City Print Supplies",
        "latitude": 21.5222,
        "longitude": 70.4579,
        "location": "Talav Gate, Junagadh"
      },
      {
        "id": "SUP-JUN-007",
        "name": "Moti Baug Cartridge Care",
        "latitude": 21.5222,
        "longitude": 70.4579,
        "location": "Joshipura, Junagadh"
      },
      {
        "id": "SUP-JUN-008",
        "name": "Somnath Route Tech Link",
        "latitude": 21.5222,
        "longitude": 70.4579,
        "location": "Sabalgadh, Junagadh"
      },
      {
        "id": "SUP-JUN-009",
        "name": "Joshipura Office Needs",
        "latitude": 21.5222,
        "longitude": 70.4579,
        "location": "Timbawadi, Junagadh"
      },
      {
        "id": "SUP-JUN-010",
        "name": "Shreeji Girnar Consumables",
        "latitude": 21.5222,
        "longitude": 70.4579,
        "location": "Bilkha Road, Junagadh"
      }
    ],
    "vendors": [
      {
        "id": "VEN-JUN-001",
        "name": "Junagadh Commercial Centre",
        "latitude": 21.5222,
        "longitude": 70.4579,
        "location": "Zanzarda Road, Junagadh"
      },
      {
        "id": "VEN-JUN-002",
        "name": "Zanzarda Trade Syndicate",
        "latitude": 21.5222,
        "longitude": 70.4579,
        "location": "Girnar Darwaja, Junagadh"
      },
      {
        "id": "VEN-JUN-003",
        "name": "Girnar Darwaja Distro",
        "latitude": 21.5222,
        "longitude": 70.4579,
        "location": "MG Road, Junagadh"
      },
      {
        "id": "VEN-JUN-004",
        "name": "Kalva Chowk Vendors",
        "latitude": 21.5222,
        "longitude": 70.4579,
        "location": "Kalva Chowk, Junagadh"
      },
      {
        "id": "VEN-JUN-005",
        "name": "Somnath Trade Network",
        "latitude": 21.5222,
        "longitude": 70.4579,
        "location": "Moti Baug, Junagadh"
      },
      {
        "id": "VEN-JUN-006",
        "name": "Bhavnath Stationery Mart",
        "latitude": 21.5222,
        "longitude": 70.4579,
        "location": "Talav Gate, Junagadh"
      },
      {
        "id": "VEN-JUN-007",
        "name": "Shree Ambika Toner Store",
        "latitude": 21.5222,
        "longitude": 70.4579,
        "location": "Joshipura, Junagadh"
      },
      {
        "id": "VEN-JUN-008",
        "name": "Saurashtra Agro & Office Care",
        "latitude": 21.5222,
        "longitude": 70.4579,
        "location": "Sabalgadh, Junagadh"
      },
      {
        "id": "VEN-JUN-009",
        "name": "Kesar Print Solutions",
        "latitude": 21.5222,
        "longitude": 70.4579,
        "location": "Timbawadi, Junagadh"
      },
      {
        "id": "VEN-JUN-010",
        "name": "Junagadh City Distro",
        "latitude": 21.5222,
        "longitude": 70.4579,
        "location": "Bilkha Road, Junagadh"
      }
    ]
  },
  {
    "city": "Bengaluru",
    "latitude": 12.9716,
    "longitude": 77.5946,
    "suppliers": [
      {
        "id": "SUP-BLR-001",
        "name": "Silicon City Print Systems",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "location": "Koramangala, Bengaluru"
      },
      {
        "id": "SUP-BLR-002",
        "name": "Koramangala Tech Cartridges",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "location": "Whitefield, Bengaluru"
      },
      {
        "id": "SUP-BLR-003",
        "name": "Whitefield Corporate Supplies",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "location": "Indiranagar, Bengaluru"
      },
      {
        "id": "SUP-BLR-004",
        "name": "Peenya Industrial Consumables",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "location": "Electronic City, Bengaluru"
      },
      {
        "id": "SUP-BLR-005",
        "name": "Electronic City Toner Hub",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "location": "Jayanagar, Bengaluru"
      },
      {
        "id": "SUP-BLR-006",
        "name": "Indiranagar Office Needs",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "location": "Peenya Industrial Area, Bengaluru"
      },
      {
        "id": "SUP-BLR-007",
        "name": "Garden City Paper House",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "location": "MG Road, Bengaluru"
      },
      {
        "id": "SUP-BLR-008",
        "name": "Hebbal IT Supplies",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "location": "Rajajinagar, Bengaluru"
      },
      {
        "id": "SUP-BLR-009",
        "name": "Bangalore Cartridge Clinic",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "location": "Hebbal, Bengaluru"
      },
      {
        "id": "SUP-BLR-010",
        "name": "Tech Park Stationers",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "location": "Malleshwaram, Bengaluru"
      }
    ],
    "vendors": [
      {
        "id": "VEN-BLR-001",
        "name": "Bengaluru Commercial Trade",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "location": "Koramangala, Bengaluru"
      },
      {
        "id": "VEN-BLR-002",
        "name": "Whitefield Supply Syndicate",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "location": "Whitefield, Bengaluru"
      },
      {
        "id": "VEN-BLR-003",
        "name": "Peenya Industrial Distro",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "location": "Indiranagar, Bengaluru"
      },
      {
        "id": "VEN-BLR-004",
        "name": "Koramangala Office Network",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "location": "Electronic City, Bengaluru"
      },
      {
        "id": "VEN-BLR-005",
        "name": "Electronic City Consumables",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "location": "Jayanagar, Bengaluru"
      },
      {
        "id": "VEN-BLR-006",
        "name": "Jayanagar Paper Mart",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "location": "Peenya Industrial Area, Bengaluru"
      },
      {
        "id": "VEN-BLR-007",
        "name": "Apex Karnataka Supplies",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "location": "MG Road, Bengaluru"
      },
      {
        "id": "VEN-BLR-008",
        "name": "Metro Bengaluru Distro",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "location": "Rajajinagar, Bengaluru"
      },
      {
        "id": "VEN-BLR-009",
        "name": "Zenith South Print Link",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "location": "Hebbal, Bengaluru"
      },
      {
        "id": "VEN-BLR-010",
        "name": "Vanguard Tech Vendors",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "location": "Malleshwaram, Bengaluru"
      }
    ]
  },
  {
    "city": "Mysuru",
    "latitude": 12.2958,
    "longitude": 76.6394,
    "suppliers": [
      {
        "id": "SUP-MYS-001",
        "name": "Chamundi Print Solutions",
        "latitude": 12.2958,
        "longitude": 76.6394,
        "location": "Hebbal Industrial Area, Mysuru"
      },
      {
        "id": "SUP-MYS-002",
        "name": "Mysore Toner Depot",
        "latitude": 12.2958,
        "longitude": 76.6394,
        "location": "Devaraja Mohalla, Mysuru"
      },
      {
        "id": "SUP-MYS-003",
        "name": "Hebbal MIDC Industrial Care",
        "latitude": 12.2958,
        "longitude": 76.6394,
        "location": "KRS Road, Mysuru"
      },
      {
        "id": "SUP-MYS-004",
        "name": "Heritage City Stationers",
        "latitude": 12.2958,
        "longitude": 76.6394,
        "location": "Saraswathipuram, Mysuru"
      },
      {
        "id": "SUP-MYS-005",
        "name": "Devaraja Mohalla Paper Mart",
        "latitude": 12.2958,
        "longitude": 76.6394,
        "location": "Kuvempunagar, Mysuru"
      },
      {
        "id": "SUP-MYS-006",
        "name": "Kuvempunagar Office Care",
        "latitude": 12.2958,
        "longitude": 76.6394,
        "location": "Jayalakshmipuram, Mysuru"
      },
      {
        "id": "SUP-MYS-007",
        "name": "Kaveri Cartridge World",
        "latitude": 12.2958,
        "longitude": 76.6394,
        "location": "Hootagalli, Mysuru"
      },
      {
        "id": "SUP-MYS-008",
        "name": "Saraswathipuram Tech Supplies",
        "latitude": 12.2958,
        "longitude": 76.6394,
        "location": "Nazarbad, Mysuru"
      },
      {
        "id": "SUP-MYS-009",
        "name": "Palace City Consumables",
        "latitude": 12.2958,
        "longitude": 76.6394,
        "location": "Metagalli, Mysuru"
      },
      {
        "id": "SUP-MYS-010",
        "name": "Hootagalli IT Supplies",
        "latitude": 12.2958,
        "longitude": 76.6394,
        "location": "Gokulam, Mysuru"
      }
    ],
    "vendors": [
      {
        "id": "VEN-MYS-001",
        "name": "Mysore Central Distro",
        "latitude": 12.2958,
        "longitude": 76.6394,
        "location": "Hebbal Industrial Area, Mysuru"
      },
      {
        "id": "VEN-MYS-002",
        "name": "Chamundeshwari Trade Link",
        "latitude": 12.2958,
        "longitude": 76.6394,
        "location": "Devaraja Mohalla, Mysuru"
      },
      {
        "id": "VEN-MYS-003",
        "name": "Hebbal Supply Partners",
        "latitude": 12.2958,
        "longitude": 76.6394,
        "location": "KRS Road, Mysuru"
      },
      {
        "id": "VEN-MYS-004",
        "name": "Devaraja Commercial Mart",
        "latitude": 12.2958,
        "longitude": 76.6394,
        "location": "Saraswathipuram, Mysuru"
      },
      {
        "id": "VEN-MYS-005",
        "name": "Heritage Office Solutions",
        "latitude": 12.2958,
        "longitude": 76.6394,
        "location": "Kuvempunagar, Mysuru"
      },
      {
        "id": "VEN-MYS-006",
        "name": "Kaveri Print Network",
        "latitude": 12.2958,
        "longitude": 76.6394,
        "location": "Jayalakshmipuram, Mysuru"
      },
      {
        "id": "VEN-MYS-007",
        "name": "Sandalwood City Vendors",
        "latitude": 12.2958,
        "longitude": 76.6394,
        "location": "Hootagalli, Mysuru"
      },
      {
        "id": "VEN-MYS-008",
        "name": "Jayalakshmi Office Products",
        "latitude": 12.2958,
        "longitude": 76.6394,
        "location": "Nazarbad, Mysuru"
      },
      {
        "id": "VEN-MYS-009",
        "name": "Gokulam Stationery Hub",
        "latitude": 12.2958,
        "longitude": 76.6394,
        "location": "Metagalli, Mysuru"
      },
      {
        "id": "VEN-MYS-010",
        "name": "Karnataka Heritage Distro",
        "latitude": 12.2958,
        "longitude": 76.6394,
        "location": "Gokulam, Mysuru"
      }
    ]
  },
  {
    "city": "Mangaluru",
    "latitude": 12.9141,
    "longitude": 74.856,
    "suppliers": [
      {
        "id": "SUP-MNG-001",
        "name": "Coastal Print Solutions",
        "latitude": 12.9141,
        "longitude": 74.856,
        "location": "Hampankatta, Mangaluru"
      },
      {
        "id": "SUP-MNG-002",
        "name": "Mangalore Cartridge Clinic",
        "latitude": 12.9141,
        "longitude": 74.856,
        "location": "Baikampady Industrial Area, Mangaluru"
      },
      {
        "id": "SUP-MNG-003",
        "name": "Baikampady Industrial Supplies",
        "latitude": 12.9141,
        "longitude": 74.856,
        "location": "Kodialbail, Mangaluru"
      },
      {
        "id": "SUP-MNG-004",
        "name": "Hampankatta Tech Mart",
        "latitude": 12.9141,
        "longitude": 74.856,
        "location": "Kankanady, Mangaluru"
      },
      {
        "id": "SUP-MNG-005",
        "name": "Karavali Paper House",
        "latitude": 12.9141,
        "longitude": 74.856,
        "location": "Kadri, Mangaluru"
      },
      {
        "id": "SUP-MNG-006",
        "name": "Kankanady Toner Depot",
        "latitude": 12.9141,
        "longitude": 74.856,
        "location": "Bejai, Mangaluru"
      },
      {
        "id": "SUP-MNG-007",
        "name": "Surathkal IT Supplies",
        "latitude": 12.9141,
        "longitude": 74.856,
        "location": "Pandeshwar, Mangaluru"
      },
      {
        "id": "SUP-MNG-008",
        "name": "Kodialbail Office Needs",
        "latitude": 12.9141,
        "longitude": 74.856,
        "location": "Surathkal, Mangaluru"
      },
      {
        "id": "SUP-MNG-009",
        "name": "Port City Consumables",
        "latitude": 12.9141,
        "longitude": 74.856,
        "location": "Car Street, Mangaluru"
      },
      {
        "id": "SUP-MNG-010",
        "name": "Mangaluru Digital Care",
        "latitude": 12.9141,
        "longitude": 74.856,
        "location": "Yeyyadi, Mangaluru"
      }
    ],
    "vendors": [
      {
        "id": "VEN-MNG-001",
        "name": "Karavali Trade Network",
        "latitude": 12.9141,
        "longitude": 74.856,
        "location": "Hampankatta, Mangaluru"
      },
      {
        "id": "VEN-MNG-002",
        "name": "Baikampady Distro Hub",
        "latitude": 12.9141,
        "longitude": 74.856,
        "location": "Baikampady Industrial Area, Mangaluru"
      },
      {
        "id": "VEN-MNG-003",
        "name": "Hampankatta Commercial Centre",
        "latitude": 12.9141,
        "longitude": 74.856,
        "location": "Kodialbail, Mangaluru"
      },
      {
        "id": "VEN-MNG-004",
        "name": "Coastal Karnataka Vendors",
        "latitude": 12.9141,
        "longitude": 74.856,
        "location": "Kankanady, Mangaluru"
      },
      {
        "id": "VEN-MNG-005",
        "name": "Surathkal Trade Link",
        "latitude": 12.9141,
        "longitude": 74.856,
        "location": "Kadri, Mangaluru"
      },
      {
        "id": "VEN-MNG-006",
        "name": "Kankanady Stationery Hub",
        "latitude": 12.9141,
        "longitude": 74.856,
        "location": "Bejai, Mangaluru"
      },
      {
        "id": "VEN-MNG-007",
        "name": "Arabian Sea Commercials",
        "latitude": 12.9141,
        "longitude": 74.856,
        "location": "Pandeshwar, Mangaluru"
      },
      {
        "id": "VEN-MNG-008",
        "name": "Apex Mangalore Distro",
        "latitude": 12.9141,
        "longitude": 74.856,
        "location": "Surathkal, Mangaluru"
      },
      {
        "id": "VEN-MNG-009",
        "name": "Kadri Office Systems",
        "latitude": 12.9141,
        "longitude": 74.856,
        "location": "Car Street, Mangaluru"
      },
      {
        "id": "VEN-MNG-010",
        "name": "Kodial Print Solutions",
        "latitude": 12.9141,
        "longitude": 74.856,
        "location": "Yeyyadi, Mangaluru"
      }
    ]
  },
  {
    "city": "Hubballi-Dharwad",
    "latitude": 15.3647,
    "longitude": 75.124,
    "suppliers": [
      {
        "id": "SUP-HUB-001",
        "name": "North Karnataka Print Hub",
        "latitude": 15.3647,
        "longitude": 75.124,
        "location": "Gokul Road, Hubballi-Dharwad"
      },
      {
        "id": "SUP-HUB-002",
        "name": "Hubli Cartridge Clinic",
        "latitude": 15.3647,
        "longitude": 75.124,
        "location": "Vidyanagar, Hubballi-Dharwad"
      },
      {
        "id": "SUP-HUB-003",
        "name": "Tarihal Industrial Supplies",
        "latitude": 15.3647,
        "longitude": 75.124,
        "location": "Tarihal Industrial Estate, Hubballi-Dharwad"
      },
      {
        "id": "SUP-HUB-004",
        "name": "Gokul Road Office Depot",
        "latitude": 15.3647,
        "longitude": 75.124,
        "location": "Koppikar Road, Hubballi-Dharwad"
      },
      {
        "id": "SUP-HUB-005",
        "name": "Dharwad Tech Stationers",
        "latitude": 15.3647,
        "longitude": 75.124,
        "location": "Dharwad Clock Tower, Hubballi-Dharwad"
      },
      {
        "id": "SUP-HUB-006",
        "name": "Koppikar Road Paper House",
        "latitude": 15.3647,
        "longitude": 75.124,
        "location": "Belur Industrial Area, Hubballi-Dharwad"
      },
      {
        "id": "SUP-HUB-007",
        "name": "Kittur Rani Chennamma Supplies",
        "latitude": 15.3647,
        "longitude": 75.124,
        "location": "Keshwapur, Hubballi-Dharwad"
      },
      {
        "id": "SUP-HUB-008",
        "name": "Belur Industrial Consumables",
        "latitude": 15.3647,
        "longitude": 75.124,
        "location": "Unkal, Hubballi-Dharwad"
      },
      {
        "id": "SUP-HUB-009",
        "name": "Vidyanagar Toner Care",
        "latitude": 15.3647,
        "longitude": 75.124,
        "location": "Navanagar, Hubballi-Dharwad"
      },
      {
        "id": "SUP-HUB-010",
        "name": "Twin City Print Mart",
        "latitude": 15.3647,
        "longitude": 75.124,
        "location": "Station Road, Hubballi-Dharwad"
      }
    ],
    "vendors": [
      {
        "id": "VEN-HUB-001",
        "name": "Hubballi Commercial Syndicate",
        "latitude": 15.3647,
        "longitude": 75.124,
        "location": "Gokul Road, Hubballi-Dharwad"
      },
      {
        "id": "VEN-HUB-002",
        "name": "Gokul Road Supply Link",
        "latitude": 15.3647,
        "longitude": 75.124,
        "location": "Vidyanagar, Hubballi-Dharwad"
      },
      {
        "id": "VEN-HUB-003",
        "name": "Tarihal Vendors Hub",
        "latitude": 15.3647,
        "longitude": 75.124,
        "location": "Tarihal Industrial Estate, Hubballi-Dharwad"
      },
      {
        "id": "VEN-HUB-004",
        "name": "Dharwad Trade Centre",
        "latitude": 15.3647,
        "longitude": 75.124,
        "location": "Koppikar Road, Hubballi-Dharwad"
      },
      {
        "id": "VEN-HUB-005",
        "name": "Koppikar Commercial Mart",
        "latitude": 15.3647,
        "longitude": 75.124,
        "location": "Dharwad Clock Tower, Hubballi-Dharwad"
      },
      {
        "id": "VEN-HUB-006",
        "name": "Twin Cities Distro",
        "latitude": 15.3647,
        "longitude": 75.124,
        "location": "Belur Industrial Area, Hubballi-Dharwad"
      },
      {
        "id": "VEN-HUB-007",
        "name": "North Karnataka Distro Network",
        "latitude": 15.3647,
        "longitude": 75.124,
        "location": "Keshwapur, Hubballi-Dharwad"
      },
      {
        "id": "VEN-HUB-008",
        "name": "Apex Hubli Supplies",
        "latitude": 15.3647,
        "longitude": 75.124,
        "location": "Unkal, Hubballi-Dharwad"
      },
      {
        "id": "VEN-HUB-009",
        "name": "Pragati Office Products",
        "latitude": 15.3647,
        "longitude": 75.124,
        "location": "Navanagar, Hubballi-Dharwad"
      },
      {
        "id": "VEN-HUB-010",
        "name": "Navanagar Tech Care",
        "latitude": 15.3647,
        "longitude": 75.124,
        "location": "Station Road, Hubballi-Dharwad"
      }
    ]
  },
  {
    "city": "Belagavi",
    "latitude": 15.8497,
    "longitude": 74.4977,
    "suppliers": [
      {
        "id": "SUP-BEL-001",
        "name": "Kunda City Print Care",
        "latitude": 15.8497,
        "longitude": 74.4977,
        "location": "Udyambag Industrial Estate, Belagavi"
      },
      {
        "id": "SUP-BEL-002",
        "name": "Belgaum Toner Depot",
        "latitude": 15.8497,
        "longitude": 74.4977,
        "location": "Khasbag, Belagavi"
      },
      {
        "id": "SUP-BEL-003",
        "name": "Udyambag Industrial Supplies",
        "latitude": 15.8497,
        "longitude": 74.4977,
        "location": "Tilakwadi, Belagavi"
      },
      {
        "id": "SUP-BEL-004",
        "name": "Tilakwadi Stationers",
        "latitude": 15.8497,
        "longitude": 74.4977,
        "location": "Bogarves, Belagavi"
      },
      {
        "id": "SUP-BEL-005",
        "name": "Auto Nagar Consumables",
        "latitude": 15.8497,
        "longitude": 74.4977,
        "location": "Khanapur Road, Belagavi"
      },
      {
        "id": "SUP-BEL-006",
        "name": "Shahapur Paper Mart",
        "latitude": 15.8497,
        "longitude": 74.4977,
        "location": "Auto Nagar, Belagavi"
      },
      {
        "id": "SUP-BEL-007",
        "name": "Belagavi Cartridge World",
        "latitude": 15.8497,
        "longitude": 74.4977,
        "location": "Camp Area, Belagavi"
      },
      {
        "id": "SUP-BEL-008",
        "name": "Western Ghats Office Care",
        "latitude": 15.8497,
        "longitude": 74.4977,
        "location": "Shahapur, Belagavi"
      },
      {
        "id": "SUP-BEL-009",
        "name": "Bogarves Tech Solutions",
        "latitude": 15.8497,
        "longitude": 74.4977,
        "location": "Hindwadi, Belagavi"
      },
      {
        "id": "SUP-BEL-010",
        "name": "Khasbag Print Pack",
        "latitude": 15.8497,
        "longitude": 74.4977,
        "location": "Nehru Nagar, Belagavi"
      }
    ],
    "vendors": [
      {
        "id": "VEN-BEL-001",
        "name": "Belgaum Trade Link",
        "latitude": 15.8497,
        "longitude": 74.4977,
        "location": "Udyambag Industrial Estate, Belagavi"
      },
      {
        "id": "VEN-BEL-002",
        "name": "Udyambag Supply Syndicate",
        "latitude": 15.8497,
        "longitude": 74.4977,
        "location": "Khasbag, Belagavi"
      },
      {
        "id": "VEN-BEL-003",
        "name": "Tilakwadi Commercial Agency",
        "latitude": 15.8497,
        "longitude": 74.4977,
        "location": "Tilakwadi, Belagavi"
      },
      {
        "id": "VEN-BEL-004",
        "name": "Auto Nagar Trade Partners",
        "latitude": 15.8497,
        "longitude": 74.4977,
        "location": "Bogarves, Belagavi"
      },
      {
        "id": "VEN-BEL-005",
        "name": "Shahapur Stationery Vendors",
        "latitude": 15.8497,
        "longitude": 74.4977,
        "location": "Khanapur Road, Belagavi"
      },
      {
        "id": "VEN-BEL-006",
        "name": "Apex Belagavi Distro",
        "latitude": 15.8497,
        "longitude": 74.4977,
        "location": "Auto Nagar, Belagavi"
      },
      {
        "id": "VEN-BEL-007",
        "name": "Maratha Karnataka Trade",
        "latitude": 15.8497,
        "longitude": 74.4977,
        "location": "Camp Area, Belagavi"
      },
      {
        "id": "VEN-BEL-008",
        "name": "Central Belgaum Mart",
        "latitude": 15.8497,
        "longitude": 74.4977,
        "location": "Shahapur, Belagavi"
      },
      {
        "id": "VEN-BEL-009",
        "name": "Shree Ganesh Consumables",
        "latitude": 15.8497,
        "longitude": 74.4977,
        "location": "Hindwadi, Belagavi"
      },
      {
        "id": "VEN-BEL-010",
        "name": "Pioneer Border Distro",
        "latitude": 15.8497,
        "longitude": 74.4977,
        "location": "Nehru Nagar, Belagavi"
      }
    ]
  },
  {
    "city": "Kalaburagi",
    "latitude": 17.3297,
    "longitude": 76.8343,
    "suppliers": [
      {
        "id": "SUP-KLB-001",
        "name": "Gulbarga Print Hub",
        "latitude": 17.3297,
        "longitude": 76.8343,
        "location": "Kapnoor Industrial Area, Kalaburagi"
      },
      {
        "id": "SUP-KLB-002",
        "name": "Kalaburagi Cartridge Clinic",
        "latitude": 17.3297,
        "longitude": 76.8343,
        "location": "Super Market, Kalaburagi"
      },
      {
        "id": "SUP-KLB-003",
        "name": "Kapnoor Industrial Supplies",
        "latitude": 17.3297,
        "longitude": 76.8343,
        "location": "MSK Mill Road, Kalaburagi"
      },
      {
        "id": "SUP-KLB-004",
        "name": "Super Market Stationers",
        "latitude": 17.3297,
        "longitude": 76.8343,
        "location": "Sedam Road, Kalaburagi"
      },
      {
        "id": "SUP-KLB-005",
        "name": "Kalyana Karnataka Paper",
        "latitude": 17.3297,
        "longitude": 76.8343,
        "location": "Aiwan-e-Shahi, Kalaburagi"
      },
      {
        "id": "SUP-KLB-006",
        "name": "Sedam Road Toner Care",
        "latitude": 17.3297,
        "longitude": 76.8343,
        "location": "Brahmpur, Kalaburagi"
      },
      {
        "id": "SUP-KLB-007",
        "name": "Bahmani City Tech Depot",
        "latitude": 17.3297,
        "longitude": 76.8343,
        "location": "GDA Layout, Kalaburagi"
      },
      {
        "id": "SUP-KLB-008",
        "name": "Sharanabasaveshwara Supplies",
        "latitude": 17.3297,
        "longitude": 76.8343,
        "location": "Station Road, Kalaburagi"
      },
      {
        "id": "SUP-KLB-009",
        "name": "Brahmpur Office Needs",
        "latitude": 17.3297,
        "longitude": 76.8343,
        "location": "Jewargi Road, Kalaburagi"
      },
      {
        "id": "SUP-KLB-010",
        "name": "Central Kalaburagi Care",
        "latitude": 17.3297,
        "longitude": 76.8343,
        "location": "Humnabad Ring Road, Kalaburagi"
      }
    ],
    "vendors": [
      {
        "id": "VEN-KLB-001",
        "name": "Kalaburagi Commercial Syndicate",
        "latitude": 17.3297,
        "longitude": 76.8343,
        "location": "Kapnoor Industrial Area, Kalaburagi"
      },
      {
        "id": "VEN-KLB-002",
        "name": "Kapnoor Supply Network",
        "latitude": 17.3297,
        "longitude": 76.8343,
        "location": "Super Market, Kalaburagi"
      },
      {
        "id": "VEN-KLB-003",
        "name": "Super Market Trade Link",
        "latitude": 17.3297,
        "longitude": 76.8343,
        "location": "MSK Mill Road, Kalaburagi"
      },
      {
        "id": "VEN-KLB-004",
        "name": "Gulbarga Business Distro",
        "latitude": 17.3297,
        "longitude": 76.8343,
        "location": "Sedam Road, Kalaburagi"
      },
      {
        "id": "VEN-KLB-005",
        "name": "Kalyana Karnataka Vendors",
        "latitude": 17.3297,
        "longitude": 76.8343,
        "location": "Aiwan-e-Shahi, Kalaburagi"
      },
      {
        "id": "VEN-KLB-006",
        "name": "Sedam Road Office Store",
        "latitude": 17.3297,
        "longitude": 76.8343,
        "location": "Brahmpur, Kalaburagi"
      },
      {
        "id": "VEN-KLB-007",
        "name": "Shree Sharan Commercials",
        "latitude": 17.3297,
        "longitude": 76.8343,
        "location": "GDA Layout, Kalaburagi"
      },
      {
        "id": "VEN-KLB-008",
        "name": "Apex Gulbarga Mart",
        "latitude": 17.3297,
        "longitude": 76.8343,
        "location": "Station Road, Kalaburagi"
      },
      {
        "id": "VEN-KLB-009",
        "name": "Pioneer Hyderabad-Karnataka Distro",
        "latitude": 17.3297,
        "longitude": 76.8343,
        "location": "Jewargi Road, Kalaburagi"
      },
      {
        "id": "VEN-KLB-010",
        "name": "Royal Bahmani Trade",
        "latitude": 17.3297,
        "longitude": 76.8343,
        "location": "Humnabad Ring Road, Kalaburagi"
      }
    ]
  },
  {
    "city": "Davanagere",
    "latitude": 14.4644,
    "longitude": 75.9218,
    "suppliers": [
      {
        "id": "SUP-DVG-001",
        "name": "Central Karnataka Print",
        "latitude": 14.4644,
        "longitude": 75.9218,
        "location": "PB Road, Davanagere"
      },
      {
        "id": "SUP-DVG-002",
        "name": "Davanagere Toner Clinic",
        "latitude": 14.4644,
        "longitude": 75.9218,
        "location": "Lokikere Industrial Area, Davanagere"
      },
      {
        "id": "SUP-DVG-003",
        "name": "Lokikere Industrial Care",
        "latitude": 14.4644,
        "longitude": 75.9218,
        "location": "MCC B Block, Davanagere"
      },
      {
        "id": "SUP-DVG-004",
        "name": "Mandipet Paper Mart",
        "latitude": 14.4644,
        "longitude": 75.9218,
        "location": "Mandipet, Davanagere"
      },
      {
        "id": "SUP-DVG-005",
        "name": "PB Road Office Depot",
        "latitude": 14.4644,
        "longitude": 75.9218,
        "location": "Durgambika Temple Area, Davanagere"
      },
      {
        "id": "SUP-DVG-006",
        "name": "Benne City Tech Supplies",
        "latitude": 14.4644,
        "longitude": 75.9218,
        "location": "Shamanur, Davanagere"
      },
      {
        "id": "SUP-DVG-007",
        "name": "MCC Stationery Mart",
        "latitude": 14.4644,
        "longitude": 75.9218,
        "location": "Anjaneya Badavane, Davanagere"
      },
      {
        "id": "SUP-DVG-008",
        "name": "Durgambika Print Care",
        "latitude": 14.4644,
        "longitude": 75.9218,
        "location": "Hadadi Road, Davanagere"
      },
      {
        "id": "SUP-DVG-009",
        "name": "Shamanur Commercial Needs",
        "latitude": 14.4644,
        "longitude": 75.9218,
        "location": "Vidyanagar, Davanagere"
      },
      {
        "id": "SUP-DVG-010",
        "name": "Apex Davanagere Cartridges",
        "latitude": 14.4644,
        "longitude": 75.9218,
        "location": "Doddapete, Davanagere"
      }
    ],
    "vendors": [
      {
        "id": "VEN-DVG-001",
        "name": "Davanagere Trade Centre",
        "latitude": 14.4644,
        "longitude": 75.9218,
        "location": "PB Road, Davanagere"
      },
      {
        "id": "VEN-DVG-002",
        "name": "Lokikere Supply Link",
        "latitude": 14.4644,
        "longitude": 75.9218,
        "location": "Lokikere Industrial Area, Davanagere"
      },
      {
        "id": "VEN-DVG-003",
        "name": "Mandipet Commercial Agency",
        "latitude": 14.4644,
        "longitude": 75.9218,
        "location": "MCC B Block, Davanagere"
      },
      {
        "id": "VEN-DVG-004",
        "name": "PB Road Vendors Syndicate",
        "latitude": 14.4644,
        "longitude": 75.9218,
        "location": "Mandipet, Davanagere"
      },
      {
        "id": "VEN-DVG-005",
        "name": "Central Karnataka Distro",
        "latitude": 14.4644,
        "longitude": 75.9218,
        "location": "Durgambika Temple Area, Davanagere"
      },
      {
        "id": "VEN-DVG-006",
        "name": "Benne Nagara Business Mart",
        "latitude": 14.4644,
        "longitude": 75.9218,
        "location": "Shamanur, Davanagere"
      },
      {
        "id": "VEN-DVG-007",
        "name": "Shamanur Stationery Distro",
        "latitude": 14.4644,
        "longitude": 75.9218,
        "location": "Anjaneya Badavane, Davanagere"
      },
      {
        "id": "VEN-DVG-008",
        "name": "Apex Textile Print Supplies",
        "latitude": 14.4644,
        "longitude": 75.9218,
        "location": "Hadadi Road, Davanagere"
      },
      {
        "id": "VEN-DVG-009",
        "name": "Kalyan Davanagere Mart",
        "latitude": 14.4644,
        "longitude": 75.9218,
        "location": "Vidyanagar, Davanagere"
      },
      {
        "id": "VEN-DVG-010",
        "name": "Premier Office Vendors",
        "latitude": 14.4644,
        "longitude": 75.9218,
        "location": "Doddapete, Davanagere"
      }
    ]
  },
  {
    "city": "Ballari",
    "latitude": 15.1394,
    "longitude": 76.9214,
    "suppliers": [
      {
        "id": "SUP-BAL-001",
        "name": "Steel City Print Care",
        "latitude": 15.1394,
        "longitude": 76.9214,
        "location": "Cantonment, Ballari"
      },
      {
        "id": "SUP-BAL-002",
        "name": "Ballari Toner Depot",
        "latitude": 15.1394,
        "longitude": 76.9214,
        "location": "Ananthapur Road, Ballari"
      },
      {
        "id": "SUP-BAL-003",
        "name": "Cantonment Office Supplies",
        "latitude": 15.1394,
        "longitude": 76.9214,
        "location": "Siruguppa Road, Ballari"
      },
      {
        "id": "SUP-BAL-004",
        "name": "Vijayanagar Empire Paper Mart",
        "latitude": 15.1394,
        "longitude": 76.9214,
        "location": "Gandhi Nagar, Ballari"
      },
      {
        "id": "SUP-BAL-005",
        "name": "Bellary Cartridge Clinic",
        "latitude": 15.1394,
        "longitude": 76.9214,
        "location": "Moka Road, Ballari"
      },
      {
        "id": "SUP-BAL-006",
        "name": "Gandhi Nagar Stationers",
        "latitude": 15.1394,
        "longitude": 76.9214,
        "location": "Fort Area, Ballari"
      },
      {
        "id": "SUP-BAL-007",
        "name": "Tungabhadra Tech Link",
        "latitude": 15.1394,
        "longitude": 76.9214,
        "location": "Radio Park, Ballari"
      },
      {
        "id": "SUP-BAL-008",
        "name": "Ananthapur Road Industrial Needs",
        "latitude": 15.1394,
        "longitude": 76.9214,
        "location": "Kudligi Road, Ballari"
      },
      {
        "id": "SUP-BAL-009",
        "name": "Fort City Consumables",
        "latitude": 15.1394,
        "longitude": 76.9214,
        "location": "Millerpet, Ballari"
      },
      {
        "id": "SUP-BAL-010",
        "name": "Hampi Route Print Care",
        "latitude": 15.1394,
        "longitude": 76.9214,
        "location": "Patel Nagar, Ballari"
      }
    ],
    "vendors": [
      {
        "id": "VEN-BAL-001",
        "name": "Ballari Commercial Syndicate",
        "latitude": 15.1394,
        "longitude": 76.9214,
        "location": "Cantonment, Ballari"
      },
      {
        "id": "VEN-BAL-002",
        "name": "Cantonment Supply Network",
        "latitude": 15.1394,
        "longitude": 76.9214,
        "location": "Ananthapur Road, Ballari"
      },
      {
        "id": "VEN-BAL-003",
        "name": "Bellary Trade Partners",
        "latitude": 15.1394,
        "longitude": 76.9214,
        "location": "Siruguppa Road, Ballari"
      },
      {
        "id": "VEN-BAL-004",
        "name": "Gandhi Nagar Commercial Mart",
        "latitude": 15.1394,
        "longitude": 76.9214,
        "location": "Gandhi Nagar, Ballari"
      },
      {
        "id": "VEN-BAL-005",
        "name": "Steel City Distro Hub",
        "latitude": 15.1394,
        "longitude": 76.9214,
        "location": "Moka Road, Ballari"
      },
      {
        "id": "VEN-BAL-006",
        "name": "Vijayanagar Business Link",
        "latitude": 15.1394,
        "longitude": 76.9214,
        "location": "Fort Area, Ballari"
      },
      {
        "id": "VEN-BAL-007",
        "name": "Tungabhadra Office Products",
        "latitude": 15.1394,
        "longitude": 76.9214,
        "location": "Radio Park, Ballari"
      },
      {
        "id": "VEN-BAL-008",
        "name": "Apex Bellary Vendors",
        "latitude": 15.1394,
        "longitude": 76.9214,
        "location": "Kudligi Road, Ballari"
      },
      {
        "id": "VEN-BAL-009",
        "name": "Hampi Heritage Distro",
        "latitude": 15.1394,
        "longitude": 76.9214,
        "location": "Millerpet, Ballari"
      },
      {
        "id": "VEN-BAL-010",
        "name": "Pioneer Mineral & Tech Trade",
        "latitude": 15.1394,
        "longitude": 76.9214,
        "location": "Patel Nagar, Ballari"
      }
    ]
  },
  {
    "city": "Visakhapatnam",
    "latitude": 17.6868,
    "longitude": 83.2185,
    "suppliers": [
      {
        "id": "SUP-VIZ-001",
        "name": "Vizag Port Print Solutions",
        "latitude": 17.6868,
        "longitude": 83.2185,
        "location": "Dwaraka Nagar, Visakhapatnam"
      },
      {
        "id": "SUP-VIZ-002",
        "name": "Dwaraka Nagar Toner Clinic",
        "latitude": 17.6868,
        "longitude": 83.2185,
        "location": "Gajuwaka, Visakhapatnam"
      },
      {
        "id": "SUP-VIZ-003",
        "name": "Gajuwaka Industrial Supplies",
        "latitude": 17.6868,
        "longitude": 83.2185,
        "location": "Siripuram, Visakhapatnam"
      },
      {
        "id": "SUP-VIZ-004",
        "name": "Siripuram Tech Stationers",
        "latitude": 17.6868,
        "longitude": 83.2185,
        "location": "MVP Colony, Visakhapatnam"
      },
      {
        "id": "SUP-VIZ-005",
        "name": "Rushikonda IT Consumables",
        "latitude": 17.6868,
        "longitude": 83.2185,
        "location": "Madhurawada, Visakhapatnam"
      },
      {
        "id": "SUP-VIZ-006",
        "name": "Steel City Office Care",
        "latitude": 17.6868,
        "longitude": 83.2185,
        "location": "Rushikonda IT SEZ, Visakhapatnam"
      },
      {
        "id": "SUP-VIZ-007",
        "name": "MVP Colony Cartridge Hub",
        "latitude": 17.6868,
        "longitude": 83.2185,
        "location": "Daba Gardens, Visakhapatnam"
      },
      {
        "id": "SUP-VIZ-008",
        "name": "Daba Gardens Paper Mart",
        "latitude": 17.6868,
        "longitude": 83.2185,
        "location": "Jagadamba Centre, Visakhapatnam"
      },
      {
        "id": "SUP-VIZ-009",
        "name": "Andhra Coastal Supplies",
        "latitude": 17.6868,
        "longitude": 83.2185,
        "location": "Waltair Uplands, Visakhapatnam"
      },
      {
        "id": "SUP-VIZ-010",
        "name": "Bay City Print Systems",
        "latitude": 17.6868,
        "longitude": 83.2185,
        "location": "Pendurthi, Visakhapatnam"
      }
    ],
    "vendors": [
      {
        "id": "VEN-VIZ-001",
        "name": "Vizag Commercial Syndicate",
        "latitude": 17.6868,
        "longitude": 83.2185,
        "location": "Dwaraka Nagar, Visakhapatnam"
      },
      {
        "id": "VEN-VIZ-002",
        "name": "Gajuwaka Supply Chain",
        "latitude": 17.6868,
        "longitude": 83.2185,
        "location": "Gajuwaka, Visakhapatnam"
      },
      {
        "id": "VEN-VIZ-003",
        "name": "Dwaraka Nagar Trade Link",
        "latitude": 17.6868,
        "longitude": 83.2185,
        "location": "Siripuram, Visakhapatnam"
      },
      {
        "id": "VEN-VIZ-004",
        "name": "Siripuram Office Mart",
        "latitude": 17.6868,
        "longitude": 83.2185,
        "location": "MVP Colony, Visakhapatnam"
      },
      {
        "id": "VEN-VIZ-005",
        "name": "Madhurawada Vendors Network",
        "latitude": 17.6868,
        "longitude": 83.2185,
        "location": "Madhurawada, Visakhapatnam"
      },
      {
        "id": "VEN-VIZ-006",
        "name": "Rushikonda Distro Partner",
        "latitude": 17.6868,
        "longitude": 83.2185,
        "location": "Rushikonda IT SEZ, Visakhapatnam"
      },
      {
        "id": "VEN-VIZ-007",
        "name": "Jagadamba Commercial Store",
        "latitude": 17.6868,
        "longitude": 83.2185,
        "location": "Daba Gardens, Visakhapatnam"
      },
      {
        "id": "VEN-VIZ-008",
        "name": "Waltair Print Solutions",
        "latitude": 17.6868,
        "longitude": 83.2185,
        "location": "Jagadamba Centre, Visakhapatnam"
      },
      {
        "id": "VEN-VIZ-009",
        "name": "Apex Andhra Coastal Mart",
        "latitude": 17.6868,
        "longitude": 83.2185,
        "location": "Waltair Uplands, Visakhapatnam"
      },
      {
        "id": "VEN-VIZ-010",
        "name": "Vanguard Vizag Distro",
        "latitude": 17.6868,
        "longitude": 83.2185,
        "location": "Pendurthi, Visakhapatnam"
      }
    ]
  },
  {
    "city": "Vijayawada",
    "latitude": 16.5062,
    "longitude": 80.648,
    "suppliers": [
      {
        "id": "SUP-VIJ-001",
        "name": "Krishna River Print Hub",
        "latitude": 16.5062,
        "longitude": 80.648,
        "location": "Governorpet, Vijayawada"
      },
      {
        "id": "SUP-VIJ-002",
        "name": "Vijayawada Toner Care",
        "latitude": 16.5062,
        "longitude": 80.648,
        "location": "Autonagar Industrial Area, Vijayawada"
      },
      {
        "id": "SUP-VIJ-003",
        "name": "Autonagar Industrial Consumables",
        "latitude": 16.5062,
        "longitude": 80.648,
        "location": "MG Road, Vijayawada"
      },
      {
        "id": "SUP-VIJ-004",
        "name": "Governorpet Paper Mart",
        "latitude": 16.5062,
        "longitude": 80.648,
        "location": "Benz Circle, Vijayawada"
      },
      {
        "id": "SUP-VIJ-005",
        "name": "Benz Circle Tech Supplies",
        "latitude": 16.5062,
        "longitude": 80.648,
        "location": "One Town, Vijayawada"
      },
      {
        "id": "SUP-VIJ-006",
        "name": "Amaravati Route Office Care",
        "latitude": 16.5062,
        "longitude": 80.648,
        "location": "Bhavanipuram, Vijayawada"
      },
      {
        "id": "SUP-VIJ-007",
        "name": "Kanakadurga Cartridge Depot",
        "latitude": 16.5062,
        "longitude": 80.648,
        "location": "Kankipadu, Vijayawada"
      },
      {
        "id": "SUP-VIJ-008",
        "name": "MG Road Stationers",
        "latitude": 16.5062,
        "longitude": 80.648,
        "location": "Gollapudi, Vijayawada"
      },
      {
        "id": "SUP-VIJ-009",
        "name": "Labbipet Office Depot",
        "latitude": 16.5062,
        "longitude": 80.648,
        "location": "Patamata, Vijayawada"
      },
      {
        "id": "SUP-VIJ-010",
        "name": "Bhavanipuram Print Pack",
        "latitude": 16.5062,
        "longitude": 80.648,
        "location": "Labbipet, Vijayawada"
      }
    ],
    "vendors": [
      {
        "id": "VEN-VIJ-001",
        "name": "Vijayawada Trade Centre",
        "latitude": 16.5062,
        "longitude": 80.648,
        "location": "Governorpet, Vijayawada"
      },
      {
        "id": "VEN-VIJ-002",
        "name": "Autonagar Supply Syndicate",
        "latitude": 16.5062,
        "longitude": 80.648,
        "location": "Autonagar Industrial Area, Vijayawada"
      },
      {
        "id": "VEN-VIJ-003",
        "name": "Governorpet Commercial Mart",
        "latitude": 16.5062,
        "longitude": 80.648,
        "location": "MG Road, Vijayawada"
      },
      {
        "id": "VEN-VIJ-004",
        "name": "Benz Circle Distro Line",
        "latitude": 16.5062,
        "longitude": 80.648,
        "location": "Benz Circle, Vijayawada"
      },
      {
        "id": "VEN-VIJ-005",
        "name": "Amaravati Commercial Syndicate",
        "latitude": 16.5062,
        "longitude": 80.648,
        "location": "One Town, Vijayawada"
      },
      {
        "id": "VEN-VIJ-006",
        "name": "One Town Paper Vendors",
        "latitude": 16.5062,
        "longitude": 80.648,
        "location": "Bhavanipuram, Vijayawada"
      },
      {
        "id": "VEN-VIJ-007",
        "name": "Bhavanipuram Trade Link",
        "latitude": 16.5062,
        "longitude": 80.648,
        "location": "Kankipadu, Vijayawada"
      },
      {
        "id": "VEN-VIJ-008",
        "name": "Kanakadurga Commercial Care",
        "latitude": 16.5062,
        "longitude": 80.648,
        "location": "Gollapudi, Vijayawada"
      },
      {
        "id": "VEN-VIJ-009",
        "name": "Apex Krishna Distro",
        "latitude": 16.5062,
        "longitude": 80.648,
        "location": "Patamata, Vijayawada"
      },
      {
        "id": "VEN-VIJ-010",
        "name": "Pioneer Andhra Business Mart",
        "latitude": 16.5062,
        "longitude": 80.648,
        "location": "Labbipet, Vijayawada"
      }
    ]
  },
  {
    "city": "Guntur",
    "latitude": 16.3067,
    "longitude": 80.4365,
    "suppliers": [
      {
        "id": "SUP-GUN-001",
        "name": "Guntur Mirchi Print Hub",
        "latitude": 16.3067,
        "longitude": 80.4365,
        "location": "Brodipet, Guntur"
      },
      {
        "id": "SUP-GUN-002",
        "name": "Brodipet Cartridge Clinic",
        "latitude": 16.3067,
        "longitude": 80.4365,
        "location": "Arundelpet, Guntur"
      },
      {
        "id": "SUP-GUN-003",
        "name": "Arundelpet Toner Care",
        "latitude": 16.3067,
        "longitude": 80.4365,
        "location": "Autonagar, Guntur"
      },
      {
        "id": "SUP-GUN-004",
        "name": "Autonagar Industrial Supplies",
        "latitude": 16.3067,
        "longitude": 80.4365,
        "location": "Kothapet, Guntur"
      },
      {
        "id": "SUP-GUN-005",
        "name": "Kothapet Paper House",
        "latitude": 16.3067,
        "longitude": 80.4365,
        "location": "Pattabhipuram, Guntur"
      },
      {
        "id": "SUP-GUN-006",
        "name": "Amaravati Capital Supplies",
        "latitude": 16.3067,
        "longitude": 80.4365,
        "location": "Nallapadu, Guntur"
      },
      {
        "id": "SUP-GUN-007",
        "name": "Pattabhipuram Office Needs",
        "latitude": 16.3067,
        "longitude": 80.4365,
        "location": "Brindavan Gardens, Guntur"
      },
      {
        "id": "SUP-GUN-008",
        "name": "Brindavan Gardens Tech Store",
        "latitude": 16.3067,
        "longitude": 80.4365,
        "location": "Gorantla, Guntur"
      },
      {
        "id": "SUP-GUN-009",
        "name": "Guntur District Consumables",
        "latitude": 16.3067,
        "longitude": 80.4365,
        "location": "Old Guntur, Guntur"
      },
      {
        "id": "SUP-GUN-010",
        "name": "Shree Balaji Print Care",
        "latitude": 16.3067,
        "longitude": 80.4365,
        "location": "Chandramouli Nagar, Guntur"
      }
    ],
    "vendors": [
      {
        "id": "VEN-GUN-001",
        "name": "Guntur Commercial Agency",
        "latitude": 16.3067,
        "longitude": 80.4365,
        "location": "Brodipet, Guntur"
      },
      {
        "id": "VEN-GUN-002",
        "name": "Brodipet Supply Partners",
        "latitude": 16.3067,
        "longitude": 80.4365,
        "location": "Arundelpet, Guntur"
      },
      {
        "id": "VEN-GUN-003",
        "name": "Arundelpet Trade Network",
        "latitude": 16.3067,
        "longitude": 80.4365,
        "location": "Autonagar, Guntur"
      },
      {
        "id": "VEN-GUN-004",
        "name": "Autonagar Commercial Mart",
        "latitude": 16.3067,
        "longitude": 80.4365,
        "location": "Kothapet, Guntur"
      },
      {
        "id": "VEN-GUN-005",
        "name": "Kothapet Stationery Distro",
        "latitude": 16.3067,
        "longitude": 80.4365,
        "location": "Pattabhipuram, Guntur"
      },
      {
        "id": "VEN-GUN-006",
        "name": "Amaravati Trade Link",
        "latitude": 16.3067,
        "longitude": 80.4365,
        "location": "Nallapadu, Guntur"
      },
      {
        "id": "VEN-GUN-007",
        "name": "Nallapadu Distro Syndicate",
        "latitude": 16.3067,
        "longitude": 80.4365,
        "location": "Brindavan Gardens, Guntur"
      },
      {
        "id": "VEN-GUN-008",
        "name": "Apex Guntur Supplies",
        "latitude": 16.3067,
        "longitude": 80.4365,
        "location": "Gorantla, Guntur"
      },
      {
        "id": "VEN-GUN-009",
        "name": "Pioneer Spices & Tech Mart",
        "latitude": 16.3067,
        "longitude": 80.4365,
        "location": "Old Guntur, Guntur"
      },
      {
        "id": "VEN-GUN-010",
        "name": "City Central Office Vendors",
        "latitude": 16.3067,
        "longitude": 80.4365,
        "location": "Chandramouli Nagar, Guntur"
      }
    ]
  },
  {
    "city": "Nellore",
    "latitude": 14.4426,
    "longitude": 79.9865,
    "suppliers": [
      {
        "id": "SUP-NEL-001",
        "name": "Penna River Print Solutions",
        "latitude": 14.4426,
        "longitude": 79.9865,
        "location": "VRC Centre, Nellore"
      },
      {
        "id": "SUP-NEL-002",
        "name": "Nellore Toner Care",
        "latitude": 14.4426,
        "longitude": 79.9865,
        "location": "Pogathota, Nellore"
      },
      {
        "id": "SUP-NEL-003",
        "name": "Trunk Road Office Depot",
        "latitude": 14.4426,
        "longitude": 79.9865,
        "location": "Magunta Layout, Nellore"
      },
      {
        "id": "SUP-NEL-004",
        "name": "Pogathota Paper Mart",
        "latitude": 14.4426,
        "longitude": 79.9865,
        "location": "Dargamitta, Nellore"
      },
      {
        "id": "SUP-NEL-005",
        "name": "Magunta Layout Cartridge Clinic",
        "latitude": 14.4426,
        "longitude": 79.9865,
        "location": "Stonehousepet, Nellore"
      },
      {
        "id": "SUP-NEL-006",
        "name": "Simhapuri Stationers",
        "latitude": 14.4426,
        "longitude": 79.9865,
        "location": "Trunk Road, Nellore"
      },
      {
        "id": "SUP-NEL-007",
        "name": "VRC Centre Tech Store",
        "latitude": 14.4426,
        "longitude": 79.9865,
        "location": "Vedayapalem, Nellore"
      },
      {
        "id": "SUP-NEL-008",
        "name": "Coastal Andhra Consumables",
        "latitude": 14.4426,
        "longitude": 79.9865,
        "location": "Santhapet, Nellore"
      },
      {
        "id": "SUP-NEL-009",
        "name": "Dargamitta Office Needs",
        "latitude": 14.4426,
        "longitude": 79.9865,
        "location": "Balaji Nagar, Nellore"
      },
      {
        "id": "SUP-NEL-010",
        "name": "Shree Venkateswara Print Hub",
        "latitude": 14.4426,
        "longitude": 79.9865,
        "location": "Podalakur Road, Nellore"
      }
    ],
    "vendors": [
      {
        "id": "VEN-NEL-001",
        "name": "Nellore Commercial Syndicate",
        "latitude": 14.4426,
        "longitude": 79.9865,
        "location": "VRC Centre, Nellore"
      },
      {
        "id": "VEN-NEL-002",
        "name": "Trunk Road Trade Link",
        "latitude": 14.4426,
        "longitude": 79.9865,
        "location": "Pogathota, Nellore"
      },
      {
        "id": "VEN-NEL-003",
        "name": "Pogathota Supply Network",
        "latitude": 14.4426,
        "longitude": 79.9865,
        "location": "Magunta Layout, Nellore"
      },
      {
        "id": "VEN-NEL-004",
        "name": "Magunta Layout Vendors",
        "latitude": 14.4426,
        "longitude": 79.9865,
        "location": "Dargamitta, Nellore"
      },
      {
        "id": "VEN-NEL-005",
        "name": "Simhapuri Commercial Mart",
        "latitude": 14.4426,
        "longitude": 79.9865,
        "location": "Stonehousepet, Nellore"
      },
      {
        "id": "VEN-NEL-006",
        "name": "Stonehousepet Distro Hub",
        "latitude": 14.4426,
        "longitude": 79.9865,
        "location": "Trunk Road, Nellore"
      },
      {
        "id": "VEN-NEL-007",
        "name": "Vedayapalem Office Products",
        "latitude": 14.4426,
        "longitude": 79.9865,
        "location": "Vedayapalem, Nellore"
      },
      {
        "id": "VEN-NEL-008",
        "name": "Apex Nellore Distro",
        "latitude": 14.4426,
        "longitude": 79.9865,
        "location": "Santhapet, Nellore"
      },
      {
        "id": "VEN-NEL-009",
        "name": "Kalyan Simhapuri Trade",
        "latitude": 14.4426,
        "longitude": 79.9865,
        "location": "Balaji Nagar, Nellore"
      },
      {
        "id": "VEN-NEL-010",
        "name": "Vanguard Nellore Supplies",
        "latitude": 14.4426,
        "longitude": 79.9865,
        "location": "Podalakur Road, Nellore"
      }
    ]
  },
  {
    "city": "Kurnool",
    "latitude": 15.8281,
    "longitude": 78.0373,
    "suppliers": [
      {
        "id": "SUP-KUR-001",
        "name": "Rayalaseema Print Hub",
        "latitude": 15.8281,
        "longitude": 78.0373,
        "location": "Dhone Road, Kurnool"
      },
      {
        "id": "SUP-KUR-002",
        "name": "Kurnool Cartridge Clinic",
        "latitude": 15.8281,
        "longitude": 78.0373,
        "location": "Mourya Inn Area, Kurnool"
      },
      {
        "id": "SUP-KUR-003",
        "name": "Kallur Industrial Supplies",
        "latitude": 15.8281,
        "longitude": 78.0373,
        "location": "Kallur Industrial Estate, Kurnool"
      },
      {
        "id": "SUP-KUR-004",
        "name": "Gateway of Rayalaseema Stationers",
        "latitude": 15.8281,
        "longitude": 78.0373,
        "location": "Nandyal Checkpost, Kurnool"
      },
      {
        "id": "SUP-KUR-005",
        "name": "Tungabhadra Paper Mart",
        "latitude": 15.8281,
        "longitude": 78.0373,
        "location": "Park Road, Kurnool"
      },
      {
        "id": "SUP-KUR-006",
        "name": "Park Road Toner Care",
        "latitude": 15.8281,
        "longitude": 78.0373,
        "location": "Budhawarapet, Kurnool"
      },
      {
        "id": "SUP-KUR-007",
        "name": "Nandyal Road Tech Store",
        "latitude": 15.8281,
        "longitude": 78.0373,
        "location": "B Camp, Kurnool"
      },
      {
        "id": "SUP-KUR-008",
        "name": "Mourya Office Supplies",
        "latitude": 15.8281,
        "longitude": 78.0373,
        "location": "Gayatri Estate, Kurnool"
      },
      {
        "id": "SUP-KUR-009",
        "name": "Kurnool Fort Consumables",
        "latitude": 15.8281,
        "longitude": 78.0373,
        "location": "Old City, Kurnool"
      },
      {
        "id": "SUP-KUR-010",
        "name": "Shree Raghavendra Print Tech",
        "latitude": 15.8281,
        "longitude": 78.0373,
        "location": "Venkatramana Colony, Kurnool"
      }
    ],
    "vendors": [
      {
        "id": "VEN-KUR-001",
        "name": "Kurnool Trade Centre",
        "latitude": 15.8281,
        "longitude": 78.0373,
        "location": "Dhone Road, Kurnool"
      },
      {
        "id": "VEN-KUR-002",
        "name": "Kallur Supply Network",
        "latitude": 15.8281,
        "longitude": 78.0373,
        "location": "Mourya Inn Area, Kurnool"
      },
      {
        "id": "VEN-KUR-003",
        "name": "Rayalaseema Business Mart",
        "latitude": 15.8281,
        "longitude": 78.0373,
        "location": "Kallur Industrial Estate, Kurnool"
      },
      {
        "id": "VEN-KUR-004",
        "name": "Nandyal Checkpost Distro",
        "latitude": 15.8281,
        "longitude": 78.0373,
        "location": "Nandyal Checkpost, Kurnool"
      },
      {
        "id": "VEN-KUR-005",
        "name": "Park Road Commercial Agency",
        "latitude": 15.8281,
        "longitude": 78.0373,
        "location": "Park Road, Kurnool"
      },
      {
        "id": "VEN-KUR-006",
        "name": "Budhawarapet Stationery Mart",
        "latitude": 15.8281,
        "longitude": 78.0373,
        "location": "Budhawarapet, Kurnool"
      },
      {
        "id": "VEN-KUR-007",
        "name": "Apex Kurnool Vendors",
        "latitude": 15.8281,
        "longitude": 78.0373,
        "location": "B Camp, Kurnool"
      },
      {
        "id": "VEN-KUR-008",
        "name": "Raghavendra Trade Syndicate",
        "latitude": 15.8281,
        "longitude": 78.0373,
        "location": "Gayatri Estate, Kurnool"
      },
      {
        "id": "VEN-KUR-009",
        "name": "Pioneer Rayalaseema Distro",
        "latitude": 15.8281,
        "longitude": 78.0373,
        "location": "Old City, Kurnool"
      },
      {
        "id": "VEN-KUR-010",
        "name": "City Gate Office Supplies",
        "latitude": 15.8281,
        "longitude": 78.0373,
        "location": "Venkatramana Colony, Kurnool"
      }
    ]
  },
  {
    "city": "Rajahmundry",
    "latitude": 17.0005,
    "longitude": 81.804,
    "suppliers": [
      {
        "id": "SUP-RAJ_AP-001",
        "name": "Godavari River Print Care",
        "latitude": 17.0005,
        "longitude": 81.804,
        "location": "Main Road, Rajahmundry"
      },
      {
        "id": "SUP-RAJ_AP-002",
        "name": "Rajahmundry Toner Depot",
        "latitude": 17.0005,
        "longitude": 81.804,
        "location": "Danavaipeta, Rajahmundry"
      },
      {
        "id": "SUP-RAJ_AP-003",
        "name": "Main Road Paper Mart",
        "latitude": 17.0005,
        "longitude": 81.804,
        "location": "Kotipalli Bus Stand Area, Rajahmundry"
      },
      {
        "id": "SUP-RAJ_AP-004",
        "name": "Danavaipeta Cartridge Clinic",
        "latitude": 17.0005,
        "longitude": 81.804,
        "location": "Morampudi, Rajahmundry"
      },
      {
        "id": "SUP-RAJ_AP-005",
        "name": "Cultural Capital Office Systems",
        "latitude": 17.0005,
        "longitude": 81.804,
        "location": "Aryapuram, Rajahmundry"
      },
      {
        "id": "SUP-RAJ_AP-006",
        "name": "Morampudi Tech Solutions",
        "latitude": 17.0005,
        "longitude": 81.804,
        "location": "Innespeta, Rajahmundry"
      },
      {
        "id": "SUP-RAJ_AP-007",
        "name": "Dowleswaram Industrial Supplies",
        "latitude": 17.0005,
        "longitude": 81.804,
        "location": "Lalacheruvu, Rajahmundry"
      },
      {
        "id": "SUP-RAJ_AP-008",
        "name": "Aryapuram Stationery Mart",
        "latitude": 17.0005,
        "longitude": 81.804,
        "location": "Kambala Cheruvu, Rajahmundry"
      },
      {
        "id": "SUP-RAJ_AP-009",
        "name": "East Godavari Consumables",
        "latitude": 17.0005,
        "longitude": 81.804,
        "location": "Prakash Nagar, Rajahmundry"
      },
      {
        "id": "SUP-RAJ_AP-010",
        "name": "Akhanda Godavari Print",
        "latitude": 17.0005,
        "longitude": 81.804,
        "location": "Dowleswaram, Rajahmundry"
      }
    ],
    "vendors": [
      {
        "id": "VEN-RAJ_AP-001",
        "name": "Rajahmundry Commercial Centre",
        "latitude": 17.0005,
        "longitude": 81.804,
        "location": "Main Road, Rajahmundry"
      },
      {
        "id": "VEN-RAJ_AP-002",
        "name": "Danavaipeta Supply Link",
        "latitude": 17.0005,
        "longitude": 81.804,
        "location": "Danavaipeta, Rajahmundry"
      },
      {
        "id": "VEN-RAJ_AP-003",
        "name": "Main Road Trade Network",
        "latitude": 17.0005,
        "longitude": 81.804,
        "location": "Kotipalli Bus Stand Area, Rajahmundry"
      },
      {
        "id": "VEN-RAJ_AP-004",
        "name": "East Godavari Business Distro",
        "latitude": 17.0005,
        "longitude": 81.804,
        "location": "Morampudi, Rajahmundry"
      },
      {
        "id": "VEN-RAJ_AP-005",
        "name": "Godavari Trade Syndicate",
        "latitude": 17.0005,
        "longitude": 81.804,
        "location": "Aryapuram, Rajahmundry"
      },
      {
        "id": "VEN-RAJ_AP-006",
        "name": "Morampudi Vendors Hub",
        "latitude": 17.0005,
        "longitude": 81.804,
        "location": "Innespeta, Rajahmundry"
      },
      {
        "id": "VEN-RAJ_AP-007",
        "name": "Kotipalli Commercial Mart",
        "latitude": 17.0005,
        "longitude": 81.804,
        "location": "Lalacheruvu, Rajahmundry"
      },
      {
        "id": "VEN-RAJ_AP-008",
        "name": "Apex Godavari Supplies",
        "latitude": 17.0005,
        "longitude": 81.804,
        "location": "Kambala Cheruvu, Rajahmundry"
      },
      {
        "id": "VEN-RAJ_AP-009",
        "name": "Kalyan Rajahmundry Distro",
        "latitude": 17.0005,
        "longitude": 81.804,
        "location": "Prakash Nagar, Rajahmundry"
      },
      {
        "id": "VEN-RAJ_AP-010",
        "name": "Heritage Andhra Stationers",
        "latitude": 17.0005,
        "longitude": 81.804,
        "location": "Dowleswaram, Rajahmundry"
      }
    ]
  },
  {
    "city": "Tirupati",
    "latitude": 13.6288,
    "longitude": 79.4192,
    "suppliers": [
      {
        "id": "SUP-TIR-001",
        "name": "Balaji Print Solutions",
        "latitude": 13.6288,
        "longitude": 79.4192,
        "location": "Renigunta Road, Tirupati"
      },
      {
        "id": "SUP-TIR-002",
        "name": "Tirupati Cartridge Clinic",
        "latitude": 13.6288,
        "longitude": 79.4192,
        "location": "Bhavani Nagar, Tirupati"
      },
      {
        "id": "SUP-TIR-003",
        "name": "Renigunta Industrial Supplies",
        "latitude": 13.6288,
        "longitude": 79.4192,
        "location": "AIR Bypass Road, Tirupati"
      },
      {
        "id": "SUP-TIR-004",
        "name": "Seven Hills Toner Depot",
        "latitude": 13.6288,
        "longitude": 79.4192,
        "location": "Alipiri, Tirupati"
      },
      {
        "id": "SUP-TIR-005",
        "name": "Bhavani Nagar Paper Mart",
        "latitude": 13.6288,
        "longitude": 79.4192,
        "location": "Balaji Colony, Tirupati"
      },
      {
        "id": "SUP-TIR-006",
        "name": "Alipiri Office Care",
        "latitude": 13.6288,
        "longitude": 79.4192,
        "location": "Korlagunta, Tirupati"
      },
      {
        "id": "SUP-TIR-007",
        "name": "AIR Bypass Stationers",
        "latitude": 13.6288,
        "longitude": 79.4192,
        "location": "Chandragiri Road, Tirupati"
      },
      {
        "id": "SUP-TIR-008",
        "name": "Sri Venkateswara Tech Supplies",
        "latitude": 13.6288,
        "longitude": 79.4192,
        "location": "RTC Bus Stand Area, Tirupati"
      },
      {
        "id": "SUP-TIR-009",
        "name": "Balaji Colony Consumables",
        "latitude": 13.6288,
        "longitude": 79.4192,
        "location": "Leela Mahal Area, Tirupati"
      },
      {
        "id": "SUP-TIR-010",
        "name": "Tirumala Valley Print Tech",
        "latitude": 13.6288,
        "longitude": 79.4192,
        "location": "Karakambadi Road, Tirupati"
      }
    ],
    "vendors": [
      {
        "id": "VEN-TIR-001",
        "name": "Tirupati Commercial Syndicate",
        "latitude": 13.6288,
        "longitude": 79.4192,
        "location": "Renigunta Road, Tirupati"
      },
      {
        "id": "VEN-TIR-002",
        "name": "Renigunta Supply Network",
        "latitude": 13.6288,
        "longitude": 79.4192,
        "location": "Bhavani Nagar, Tirupati"
      },
      {
        "id": "VEN-TIR-003",
        "name": "Balaji Trade Syndicate",
        "latitude": 13.6288,
        "longitude": 79.4192,
        "location": "AIR Bypass Road, Tirupati"
      },
      {
        "id": "VEN-TIR-004",
        "name": "Bhavani Nagar Commercial Mart",
        "latitude": 13.6288,
        "longitude": 79.4192,
        "location": "Alipiri, Tirupati"
      },
      {
        "id": "VEN-TIR-005",
        "name": "Seven Hills Business Distro",
        "latitude": 13.6288,
        "longitude": 79.4192,
        "location": "Balaji Colony, Tirupati"
      },
      {
        "id": "VEN-TIR-006",
        "name": "Alipiri Trade Link",
        "latitude": 13.6288,
        "longitude": 79.4192,
        "location": "Korlagunta, Tirupati"
      },
      {
        "id": "VEN-TIR-007",
        "name": "AIR Bypass Vendors Hub",
        "latitude": 13.6288,
        "longitude": 79.4192,
        "location": "Chandragiri Road, Tirupati"
      },
      {
        "id": "VEN-TIR-008",
        "name": "Apex Tirupati Supplies",
        "latitude": 13.6288,
        "longitude": 79.4192,
        "location": "RTC Bus Stand Area, Tirupati"
      },
      {
        "id": "VEN-TIR-009",
        "name": "Govinda Office Products",
        "latitude": 13.6288,
        "longitude": 79.4192,
        "location": "Leela Mahal Area, Tirupati"
      },
      {
        "id": "VEN-TIR-010",
        "name": "Spiritual City Tech Vendors",
        "latitude": 13.6288,
        "longitude": 79.4192,
        "location": "Karakambadi Road, Tirupati"
      }
    ]
  },
  {
    "city": "Kakinada",
    "latitude": 16.9891,
    "longitude": 82.2475,
    "suppliers": [
      {
        "id": "SUP-KAK-001",
        "name": "Port City Print Hub",
        "latitude": 16.9891,
        "longitude": 82.2475,
        "location": "Main Road, Kakinada"
      },
      {
        "id": "SUP-KAK-002",
        "name": "Kakinada Toner Care",
        "latitude": 16.9891,
        "longitude": 82.2475,
        "location": "Bhanugudi Junction, Kakinada"
      },
      {
        "id": "SUP-KAK-003",
        "name": "Bhanugudi Tech Supplies",
        "latitude": 16.9891,
        "longitude": 82.2475,
        "location": "Suryaraopeta, Kakinada"
      },
      {
        "id": "SUP-KAK-004",
        "name": "Suryaraopeta Paper Mart",
        "latitude": 16.9891,
        "longitude": 82.2475,
        "location": "Kakinada Port Area, Kakinada"
      },
      {
        "id": "SUP-KAK-005",
        "name": "Kakinada Deep Sea Port Consumables",
        "latitude": 16.9891,
        "longitude": 82.2475,
        "location": "JNTU Road, Kakinada"
      },
      {
        "id": "SUP-KAK-006",
        "name": "Main Road Office Depot",
        "latitude": 16.9891,
        "longitude": 82.2475,
        "location": "Cinema Road, Kakinada"
      },
      {
        "id": "SUP-KAK-007",
        "name": "JNTU Road Stationers",
        "latitude": 16.9891,
        "longitude": 82.2475,
        "location": "Ramanayyapeta, Kakinada"
      },
      {
        "id": "SUP-KAK-008",
        "name": "East Coast Cartridge Clinic",
        "latitude": 16.9891,
        "longitude": 82.2475,
        "location": "Collectorate Area, Kakinada"
      },
      {
        "id": "SUP-KAK-009",
        "name": "Sarpavaram Industrial Supplies",
        "latitude": 16.9891,
        "longitude": 82.2475,
        "location": "Sarpavaram, Kakinada"
      },
      {
        "id": "SUP-KAK-010",
        "name": "Shree Satya Print Pack",
        "latitude": 16.9891,
        "longitude": 82.2475,
        "location": "Madhava Nagar, Kakinada"
      }
    ],
    "vendors": [
      {
        "id": "VEN-KAK-001",
        "name": "Kakinada Commercial Centre",
        "latitude": 16.9891,
        "longitude": 82.2475,
        "location": "Main Road, Kakinada"
      },
      {
        "id": "VEN-KAK-002",
        "name": "Bhanugudi Trade Syndicate",
        "latitude": 16.9891,
        "longitude": 82.2475,
        "location": "Bhanugudi Junction, Kakinada"
      },
      {
        "id": "VEN-KAK-003",
        "name": "Port Area Supply Link",
        "latitude": 16.9891,
        "longitude": 82.2475,
        "location": "Suryaraopeta, Kakinada"
      },
      {
        "id": "VEN-KAK-004",
        "name": "Suryaraopeta Commercial Mart",
        "latitude": 16.9891,
        "longitude": 82.2475,
        "location": "Kakinada Port Area, Kakinada"
      },
      {
        "id": "VEN-KAK-005",
        "name": "Kakinada Bay Distro",
        "latitude": 16.9891,
        "longitude": 82.2475,
        "location": "JNTU Road, Kakinada"
      },
      {
        "id": "VEN-KAK-006",
        "name": "Main Road Stationery Vendors",
        "latitude": 16.9891,
        "longitude": 82.2475,
        "location": "Cinema Road, Kakinada"
      },
      {
        "id": "VEN-KAK-007",
        "name": "East Coast Business Network",
        "latitude": 16.9891,
        "longitude": 82.2475,
        "location": "Ramanayyapeta, Kakinada"
      },
      {
        "id": "VEN-KAK-008",
        "name": "Apex Kakinada Supplies",
        "latitude": 16.9891,
        "longitude": 82.2475,
        "location": "Collectorate Area, Kakinada"
      },
      {
        "id": "VEN-KAK-009",
        "name": "Satya Commercial Agency",
        "latitude": 16.9891,
        "longitude": 82.2475,
        "location": "Sarpavaram, Kakinada"
      },
      {
        "id": "VEN-KAK-010",
        "name": "Andhra Port Distro",
        "latitude": 16.9891,
        "longitude": 82.2475,
        "location": "Madhava Nagar, Kakinada"
      }
    ]
  },
  {
    "city": "Kolkata",
    "latitude": 22.5726,
    "longitude": 88.3639,
    "suppliers": [
      {
        "id": "SUP-CCU-001",
        "name": "City of Joy Print Hub",
        "latitude": 22.5726,
        "longitude": 88.3639,
        "location": "BBD Bagh / Dalhousie, Kolkata"
      },
      {
        "id": "SUP-CCU-002",
        "name": "Dalhousie Commercial Stationers",
        "latitude": 22.5726,
        "longitude": 88.3639,
        "location": "Salt Lake Sector V, Kolkata"
      },
      {
        "id": "SUP-CCU-003",
        "name": "Salt Lake Tech Supplies",
        "latitude": 22.5726,
        "longitude": 88.3639,
        "location": "Park Street, Kolkata"
      },
      {
        "id": "SUP-CCU-004",
        "name": "Burrabazar Paper Depot",
        "latitude": 22.5726,
        "longitude": 88.3639,
        "location": "New Town, Kolkata"
      },
      {
        "id": "SUP-CCU-005",
        "name": "Kolkata Cartridge Clinic",
        "latitude": 22.5726,
        "longitude": 88.3639,
        "location": "Burrabazar, Kolkata"
      },
      {
        "id": "SUP-CCU-006",
        "name": "Park Street Corporate Care",
        "latitude": 22.5726,
        "longitude": 88.3639,
        "location": "Gariahat, Kolkata"
      },
      {
        "id": "SUP-CCU-007",
        "name": "New Town IT Consumables",
        "latitude": 22.5726,
        "longitude": 88.3639,
        "location": "Behala, Kolkata"
      },
      {
        "id": "SUP-CCU-008",
        "name": "Bengal Stationery World",
        "latitude": 22.5726,
        "longitude": 88.3639,
        "location": "Howrah Bridge Approach, Kolkata"
      },
      {
        "id": "SUP-CCU-009",
        "name": "Gariahat Print Solutions",
        "latitude": 22.5726,
        "longitude": 88.3639,
        "location": "Shyambazar, Kolkata"
      },
      {
        "id": "SUP-CCU-010",
        "name": "Hooghly Tech Care",
        "latitude": 22.5726,
        "longitude": 88.3639,
        "location": "Rajarhat, Kolkata"
      }
    ],
    "vendors": [
      {
        "id": "VEN-CCU-001",
        "name": "Kolkata Commercial Syndicate",
        "latitude": 22.5726,
        "longitude": 88.3639,
        "location": "BBD Bagh / Dalhousie, Kolkata"
      },
      {
        "id": "VEN-CCU-002",
        "name": "Burrabazar Wholesale Network",
        "latitude": 22.5726,
        "longitude": 88.3639,
        "location": "Salt Lake Sector V, Kolkata"
      },
      {
        "id": "VEN-CCU-003",
        "name": "Sector V IT Distro",
        "latitude": 22.5726,
        "longitude": 88.3639,
        "location": "Park Street, Kolkata"
      },
      {
        "id": "VEN-CCU-004",
        "name": "Dalhousie Trade Line",
        "latitude": 22.5726,
        "longitude": 88.3639,
        "location": "New Town, Kolkata"
      },
      {
        "id": "VEN-CCU-005",
        "name": "Park Street Business Mart",
        "latitude": 22.5726,
        "longitude": 88.3639,
        "location": "Burrabazar, Kolkata"
      },
      {
        "id": "VEN-CCU-006",
        "name": "New Town Supply Partners",
        "latitude": 22.5726,
        "longitude": 88.3639,
        "location": "Gariahat, Kolkata"
      },
      {
        "id": "VEN-CCU-007",
        "name": "Gariahat Commercial Hub",
        "latitude": 22.5726,
        "longitude": 88.3639,
        "location": "Behala, Kolkata"
      },
      {
        "id": "VEN-CCU-008",
        "name": "Apex Bengal Supplies",
        "latitude": 22.5726,
        "longitude": 88.3639,
        "location": "Howrah Bridge Approach, Kolkata"
      },
      {
        "id": "VEN-CCU-009",
        "name": "Vanguard Kolkata Distro",
        "latitude": 22.5726,
        "longitude": 88.3639,
        "location": "Shyambazar, Kolkata"
      },
      {
        "id": "VEN-CCU-010",
        "name": "East India Print Line",
        "latitude": 22.5726,
        "longitude": 88.3639,
        "location": "Rajarhat, Kolkata"
      }
    ]
  },
  {
    "city": "Howrah",
    "latitude": 22.5958,
    "longitude": 88.2636,
    "suppliers": [
      {
        "id": "SUP-HWH-001",
        "name": "Howrah Bridge Print Solutions",
        "latitude": 22.5958,
        "longitude": 88.2636,
        "location": "Howrah Maidan, Howrah"
      },
      {
        "id": "SUP-HWH-002",
        "name": "Shibpur Toner Clinic",
        "latitude": 22.5958,
        "longitude": 88.2636,
        "location": "Shibpur, Howrah"
      },
      {
        "id": "SUP-HWH-003",
        "name": "Liluah Industrial Consumables",
        "latitude": 22.5958,
        "longitude": 88.2636,
        "location": "Salkia, Howrah"
      },
      {
        "id": "SUP-HWH-004",
        "name": "Howrah Maidan Paper Mart",
        "latitude": 22.5958,
        "longitude": 88.2636,
        "location": "Kona Expressway, Howrah"
      },
      {
        "id": "SUP-HWH-005",
        "name": "Salkia Stationers",
        "latitude": 22.5958,
        "longitude": 88.2636,
        "location": "Liluah Industrial Belt, Howrah"
      },
      {
        "id": "SUP-HWH-006",
        "name": "Kona Expressway Tech Depot",
        "latitude": 22.5958,
        "longitude": 88.2636,
        "location": "Bally, Howrah"
      },
      {
        "id": "SUP-HWH-007",
        "name": "Belur Math Route Supplies",
        "latitude": 22.5958,
        "longitude": 88.2636,
        "location": "Baltikuri, Howrah"
      },
      {
        "id": "SUP-HWH-008",
        "name": "Dasnagar Engineering Print Care",
        "latitude": 22.5958,
        "longitude": 88.2636,
        "location": "Belur, Howrah"
      },
      {
        "id": "SUP-HWH-009",
        "name": "Bally Commercial Stationers",
        "latitude": 22.5958,
        "longitude": 88.2636,
        "location": "Dasnagar, Howrah"
      },
      {
        "id": "SUP-HWH-010",
        "name": "Hooghly River Consumables",
        "latitude": 22.5958,
        "longitude": 88.2636,
        "location": "Andul Road, Howrah"
      }
    ],
    "vendors": [
      {
        "id": "VEN-HWH-001",
        "name": "Howrah Industrial Syndicate",
        "latitude": 22.5958,
        "longitude": 88.2636,
        "location": "Howrah Maidan, Howrah"
      },
      {
        "id": "VEN-HWH-002",
        "name": "Liluah Supply Network",
        "latitude": 22.5958,
        "longitude": 88.2636,
        "location": "Shibpur, Howrah"
      },
      {
        "id": "VEN-HWH-003",
        "name": "Shibpur Commercial Agency",
        "latitude": 22.5958,
        "longitude": 88.2636,
        "location": "Salkia, Howrah"
      },
      {
        "id": "VEN-HWH-004",
        "name": "Howrah Maidan Trade Link",
        "latitude": 22.5958,
        "longitude": 88.2636,
        "location": "Kona Expressway, Howrah"
      },
      {
        "id": "VEN-HWH-005",
        "name": "Salkia Business Mart",
        "latitude": 22.5958,
        "longitude": 88.2636,
        "location": "Liluah Industrial Belt, Howrah"
      },
      {
        "id": "VEN-HWH-006",
        "name": "Kona Trade Partners",
        "latitude": 22.5958,
        "longitude": 88.2636,
        "location": "Bally, Howrah"
      },
      {
        "id": "VEN-HWH-007",
        "name": "Dasnagar Industrial Vendors",
        "latitude": 22.5958,
        "longitude": 88.2636,
        "location": "Baltikuri, Howrah"
      },
      {
        "id": "VEN-HWH-008",
        "name": "Apex Howrah Distro",
        "latitude": 22.5958,
        "longitude": 88.2636,
        "location": "Belur, Howrah"
      },
      {
        "id": "VEN-HWH-009",
        "name": "Hooghly Commercial Distro",
        "latitude": 22.5958,
        "longitude": 88.2636,
        "location": "Dasnagar, Howrah"
      },
      {
        "id": "VEN-HWH-010",
        "name": "Vanguard Liluah Trade",
        "latitude": 22.5958,
        "longitude": 88.2636,
        "location": "Andul Road, Howrah"
      }
    ]
  },
  {
    "city": "Durgapur",
    "latitude": 23.5204,
    "longitude": 87.3119,
    "suppliers": [
      {
        "id": "SUP-DUR-001",
        "name": "Steel City Print Tech",
        "latitude": 23.5204,
        "longitude": 87.3119,
        "location": "City Centre, Durgapur"
      },
      {
        "id": "SUP-DUR-002",
        "name": "Durgapur Toner Clinic",
        "latitude": 23.5204,
        "longitude": 87.3119,
        "location": "Benachity, Durgapur"
      },
      {
        "id": "SUP-DUR-003",
        "name": "City Centre Stationers",
        "latitude": 23.5204,
        "longitude": 87.3119,
        "location": "Bidhannagar, Durgapur"
      },
      {
        "id": "SUP-DUR-004",
        "name": "Benachity Paper Depot",
        "latitude": 23.5204,
        "longitude": 87.3119,
        "location": "Steel Township, Durgapur"
      },
      {
        "id": "SUP-DUR-005",
        "name": "Bidhannagar Corporate Supplies",
        "latitude": 23.5204,
        "longitude": 87.3119,
        "location": "DSP Area, Durgapur"
      },
      {
        "id": "SUP-DUR-006",
        "name": "Bamunara Industrial Consumables",
        "latitude": 23.5204,
        "longitude": 87.3119,
        "location": "Muchipara, Durgapur"
      },
      {
        "id": "SUP-DUR-007",
        "name": "DSP Township Office Needs",
        "latitude": 23.5204,
        "longitude": 87.3119,
        "location": "Bhangagarh, Durgapur"
      },
      {
        "id": "SUP-DUR-008",
        "name": "Durgapur Barrage Tech Mart",
        "latitude": 23.5204,
        "longitude": 87.3119,
        "location": "Palashdiha, Durgapur"
      },
      {
        "id": "SUP-DUR-009",
        "name": "Muchipara Print Care",
        "latitude": 23.5204,
        "longitude": 87.3119,
        "location": "Bamunara Industrial Area, Durgapur"
      },
      {
        "id": "SUP-DUR-010",
        "name": "Burdwan Industrial Stationers",
        "latitude": 23.5204,
        "longitude": 87.3119,
        "location": "Fuljhor, Durgapur"
      }
    ],
    "vendors": [
      {
        "id": "VEN-DUR-001",
        "name": "Durgapur Commercial Syndicate",
        "latitude": 23.5204,
        "longitude": 87.3119,
        "location": "City Centre, Durgapur"
      },
      {
        "id": "VEN-DUR-002",
        "name": "Benachity Trade Network",
        "latitude": 23.5204,
        "longitude": 87.3119,
        "location": "Benachity, Durgapur"
      },
      {
        "id": "VEN-DUR-003",
        "name": "City Centre Business Mart",
        "latitude": 23.5204,
        "longitude": 87.3119,
        "location": "Bidhannagar, Durgapur"
      },
      {
        "id": "VEN-DUR-004",
        "name": "Bidhannagar Supply Link",
        "latitude": 23.5204,
        "longitude": 87.3119,
        "location": "Steel Township, Durgapur"
      },
      {
        "id": "VEN-DUR-005",
        "name": "Bamunara Vendors Hub",
        "latitude": 23.5204,
        "longitude": 87.3119,
        "location": "DSP Area, Durgapur"
      },
      {
        "id": "VEN-DUR-006",
        "name": "Steel Township Trade Partners",
        "latitude": 23.5204,
        "longitude": 87.3119,
        "location": "Muchipara, Durgapur"
      },
      {
        "id": "VEN-DUR-007",
        "name": "Muchipara Commercial Agency",
        "latitude": 23.5204,
        "longitude": 87.3119,
        "location": "Bhangagarh, Durgapur"
      },
      {
        "id": "VEN-DUR-008",
        "name": "Apex Durgapur Distro",
        "latitude": 23.5204,
        "longitude": 87.3119,
        "location": "Palashdiha, Durgapur"
      },
      {
        "id": "VEN-DUR-009",
        "name": "Damodar Valley Supplies",
        "latitude": 23.5204,
        "longitude": 87.3119,
        "location": "Bamunara Industrial Area, Durgapur"
      },
      {
        "id": "VEN-DUR-010",
        "name": "Pioneer Steel City Distro",
        "latitude": 23.5204,
        "longitude": 87.3119,
        "location": "Fuljhor, Durgapur"
      }
    ]
  },
  {
    "city": "Asansol",
    "latitude": 23.6739,
    "longitude": 86.9524,
    "suppliers": [
      {
        "id": "SUP-ASN-001",
        "name": "Coal City Print Hub",
        "latitude": 23.6739,
        "longitude": 86.9524,
        "location": "GT Road, Asansol"
      },
      {
        "id": "SUP-ASN-002",
        "name": "Asansol Toner Depot",
        "latitude": 23.6739,
        "longitude": 86.9524,
        "location": "Burnpur, Asansol"
      },
      {
        "id": "SUP-ASN-003",
        "name": "Burnpur Industrial Supplies",
        "latitude": 23.6739,
        "longitude": 86.9524,
        "location": "Ushagram, Asansol"
      },
      {
        "id": "SUP-ASN-004",
        "name": "GT Road Stationers",
        "latitude": 23.6739,
        "longitude": 86.9524,
        "location": "Hutton Road, Asansol"
      },
      {
        "id": "SUP-ASN-005",
        "name": "Ushagram Paper Mart",
        "latitude": 23.6739,
        "longitude": 86.9524,
        "location": "Kalyanpur, Asansol"
      },
      {
        "id": "SUP-ASN-006",
        "name": "Hutton Road Cartridge Clinic",
        "latitude": 23.6739,
        "longitude": 86.9524,
        "location": "Railpar, Asansol"
      },
      {
        "id": "SUP-ASN-007",
        "name": "Kalyanpur Tech Solutions",
        "latitude": 23.6739,
        "longitude": 86.9524,
        "location": "Kalla, Asansol"
      },
      {
        "id": "SUP-ASN-008",
        "name": "Kulti Industrial Consumables",
        "latitude": 23.6739,
        "longitude": 86.9524,
        "location": "Kulti Industrial Belt, Asansol"
      },
      {
        "id": "SUP-ASN-009",
        "name": "Raniganj Belt Office Care",
        "latitude": 23.6739,
        "longitude": 86.9524,
        "location": "Court More, Asansol"
      },
      {
        "id": "SUP-ASN-010",
        "name": "Western Bengal Print Care",
        "latitude": 23.6739,
        "longitude": 86.9524,
        "location": "Sen Raleigh Road, Asansol"
      }
    ],
    "vendors": [
      {
        "id": "VEN-ASN-001",
        "name": "Asansol Commercial Syndicate",
        "latitude": 23.6739,
        "longitude": 86.9524,
        "location": "GT Road, Asansol"
      },
      {
        "id": "VEN-ASN-002",
        "name": "GT Road Trade Network",
        "latitude": 23.6739,
        "longitude": 86.9524,
        "location": "Burnpur, Asansol"
      },
      {
        "id": "VEN-ASN-003",
        "name": "Burnpur Supply Partners",
        "latitude": 23.6739,
        "longitude": 86.9524,
        "location": "Ushagram, Asansol"
      },
      {
        "id": "VEN-ASN-004",
        "name": "Ushagram Business Mart",
        "latitude": 23.6739,
        "longitude": 86.9524,
        "location": "Hutton Road, Asansol"
      },
      {
        "id": "VEN-ASN-005",
        "name": "Hutton Road Commercial Line",
        "latitude": 23.6739,
        "longitude": 86.9524,
        "location": "Kalyanpur, Asansol"
      },
      {
        "id": "VEN-ASN-006",
        "name": "Railpar Trade Link",
        "latitude": 23.6739,
        "longitude": 86.9524,
        "location": "Railpar, Asansol"
      },
      {
        "id": "VEN-ASN-007",
        "name": "Kulti Commercial Vendors",
        "latitude": 23.6739,
        "longitude": 86.9524,
        "location": "Kalla, Asansol"
      },
      {
        "id": "VEN-ASN-008",
        "name": "Apex Asansol Supplies",
        "latitude": 23.6739,
        "longitude": 86.9524,
        "location": "Kulti Industrial Belt, Asansol"
      },
      {
        "id": "VEN-ASN-009",
        "name": "Damodar Valley Trade Line",
        "latitude": 23.6739,
        "longitude": 86.9524,
        "location": "Court More, Asansol"
      },
      {
        "id": "VEN-ASN-010",
        "name": "Premier Coal Belt Distro",
        "latitude": 23.6739,
        "longitude": 86.9524,
        "location": "Sen Raleigh Road, Asansol"
      }
    ]
  },
  {
    "city": "Siliguri",
    "latitude": 26.7271,
    "longitude": 88.3953,
    "suppliers": [
      {
        "id": "SUP-SLG-001",
        "name": "North Bengal Print Solutions",
        "latitude": 26.7271,
        "longitude": 88.3953,
        "location": "Sevoke Road, Siliguri"
      },
      {
        "id": "SUP-SLG-002",
        "name": "Siliguri Toner Clinic",
        "latitude": 26.7271,
        "longitude": 88.3953,
        "location": "Hill Cart Road, Siliguri"
      },
      {
        "id": "SUP-SLG-003",
        "name": "Sevoke Road Stationers",
        "latitude": 26.7271,
        "longitude": 88.3953,
        "location": "Bidhan Market, Siliguri"
      },
      {
        "id": "SUP-SLG-004",
        "name": "Hill Cart Road Paper Mart",
        "latitude": 26.7271,
        "longitude": 88.3953,
        "location": "Pradhan Nagar, Siliguri"
      },
      {
        "id": "SUP-SLG-005",
        "name": "Bidhan Market Cartridge Care",
        "latitude": 26.7271,
        "longitude": 88.3953,
        "location": "Matigara, Siliguri"
      },
      {
        "id": "SUP-SLG-006",
        "name": "Matigara Commercial Supplies",
        "latitude": 26.7271,
        "longitude": 88.3953,
        "location": "Khalpara, Siliguri"
      },
      {
        "id": "SUP-SLG-007",
        "name": "Pradhan Nagar Tech Hub",
        "latitude": 26.7271,
        "longitude": 88.3953,
        "location": "Hakim Para, Siliguri"
      },
      {
        "id": "SUP-SLG-008",
        "name": "Gateway to Hills Consumables",
        "latitude": 26.7271,
        "longitude": 88.3953,
        "location": "College Para, Siliguri"
      },
      {
        "id": "SUP-SLG-009",
        "name": "Dooars Express Stationers",
        "latitude": 26.7271,
        "longitude": 88.3953,
        "location": "Salugara, Siliguri"
      },
      {
        "id": "SUP-SLG-010",
        "name": "Teesta River Print Pack",
        "latitude": 26.7271,
        "longitude": 88.3953,
        "location": "Fulbari, Siliguri"
      }
    ],
    "vendors": [
      {
        "id": "VEN-SLG-001",
        "name": "Siliguri Commercial Centre",
        "latitude": 26.7271,
        "longitude": 88.3953,
        "location": "Sevoke Road, Siliguri"
      },
      {
        "id": "VEN-SLG-002",
        "name": "Sevoke Road Trade Syndicate",
        "latitude": 26.7271,
        "longitude": 88.3953,
        "location": "Hill Cart Road, Siliguri"
      },
      {
        "id": "VEN-SLG-003",
        "name": "Bidhan Market Supply Network",
        "latitude": 26.7271,
        "longitude": 88.3953,
        "location": "Bidhan Market, Siliguri"
      },
      {
        "id": "VEN-SLG-004",
        "name": "Hill Cart Road Vendors",
        "latitude": 26.7271,
        "longitude": 88.3953,
        "location": "Pradhan Nagar, Siliguri"
      },
      {
        "id": "VEN-SLG-005",
        "name": "Matigara Business Hub",
        "latitude": 26.7271,
        "longitude": 88.3953,
        "location": "Matigara, Siliguri"
      },
      {
        "id": "VEN-SLG-006",
        "name": "North Bengal Trade Link",
        "latitude": 26.7271,
        "longitude": 88.3953,
        "location": "Khalpara, Siliguri"
      },
      {
        "id": "VEN-SLG-007",
        "name": "Pradhan Nagar Commercial Mart",
        "latitude": 26.7271,
        "longitude": 88.3953,
        "location": "Hakim Para, Siliguri"
      },
      {
        "id": "VEN-SLG-008",
        "name": "Apex Siliguri Distro",
        "latitude": 26.7271,
        "longitude": 88.3953,
        "location": "College Para, Siliguri"
      },
      {
        "id": "VEN-SLG-009",
        "name": "Himalayan Foothills Distro",
        "latitude": 26.7271,
        "longitude": 88.3953,
        "location": "Salugara, Siliguri"
      },
      {
        "id": "VEN-SLG-010",
        "name": "Pioneer North Bengal Trade",
        "latitude": 26.7271,
        "longitude": 88.3953,
        "location": "Fulbari, Siliguri"
      }
    ]
  },
  {
    "city": "Bardhaman",
    "latitude": 23.2324,
    "longitude": 87.8615,
    "suppliers": [
      {
        "id": "SUP-BDN-001",
        "name": "Burdwan Royal Print Care",
        "latitude": 23.2324,
        "longitude": 87.8615,
        "location": "Curzon Gate Area, Bardhaman"
      },
      {
        "id": "SUP-BDN-002",
        "name": "Curzon Gate Stationers",
        "latitude": 23.2324,
        "longitude": 87.8615,
        "location": "Boro Bazar, Bardhaman"
      },
      {
        "id": "SUP-BDN-003",
        "name": "Boro Bazar Paper Depot",
        "latitude": 23.2324,
        "longitude": 87.8615,
        "location": "Badamtala, Bardhaman"
      },
      {
        "id": "SUP-BDN-004",
        "name": "Bardhaman Toner Clinic",
        "latitude": 23.2324,
        "longitude": 87.8615,
        "location": "Birhata, Bardhaman"
      },
      {
        "id": "SUP-BDN-005",
        "name": "Badamtala Cartridge Hub",
        "latitude": 23.2324,
        "longitude": 87.8615,
        "location": "Khagragarh, Bardhaman"
      },
      {
        "id": "SUP-BDN-006",
        "name": "Birhata Office Supplies",
        "latitude": 23.2324,
        "longitude": 87.8615,
        "location": "Golapbag, Bardhaman"
      },
      {
        "id": "SUP-BDN-007",
        "name": "Golapbag Tech Mart",
        "latitude": 23.2324,
        "longitude": 87.8615,
        "location": "Alisha, Bardhaman"
      },
      {
        "id": "SUP-BDN-008",
        "name": "Damodar Plains Consumables",
        "latitude": 23.2324,
        "longitude": 87.8615,
        "location": "Ullhas, Bardhaman"
      },
      {
        "id": "SUP-BDN-009",
        "name": "Station Road Print Care",
        "latitude": 23.2324,
        "longitude": 87.8615,
        "location": "Station Road, Bardhaman"
      },
      {
        "id": "SUP-BDN-010",
        "name": "Bengal Rice Bowl Supplies",
        "latitude": 23.2324,
        "longitude": 87.8615,
        "location": "Kalibazar, Bardhaman"
      }
    ],
    "vendors": [
      {
        "id": "VEN-BDN-001",
        "name": "Bardhaman Commercial Syndicate",
        "latitude": 23.2324,
        "longitude": 87.8615,
        "location": "Curzon Gate Area, Bardhaman"
      },
      {
        "id": "VEN-BDN-002",
        "name": "Curzon Gate Trade Link",
        "latitude": 23.2324,
        "longitude": 87.8615,
        "location": "Boro Bazar, Bardhaman"
      },
      {
        "id": "VEN-BDN-003",
        "name": "Boro Bazar Supply Network",
        "latitude": 23.2324,
        "longitude": 87.8615,
        "location": "Badamtala, Bardhaman"
      },
      {
        "id": "VEN-BDN-004",
        "name": "Birhata Business Mart",
        "latitude": 23.2324,
        "longitude": 87.8615,
        "location": "Birhata, Bardhaman"
      },
      {
        "id": "VEN-BDN-005",
        "name": "Badamtala Commercial Agency",
        "latitude": 23.2324,
        "longitude": 87.8615,
        "location": "Khagragarh, Bardhaman"
      },
      {
        "id": "VEN-BDN-006",
        "name": "Burdwan Central Distro",
        "latitude": 23.2324,
        "longitude": 87.8615,
        "location": "Golapbag, Bardhaman"
      },
      {
        "id": "VEN-BDN-007",
        "name": "Damodar Trade Line",
        "latitude": 23.2324,
        "longitude": 87.8615,
        "location": "Alisha, Bardhaman"
      },
      {
        "id": "VEN-BDN-008",
        "name": "Apex Bardhaman Supplies",
        "latitude": 23.2324,
        "longitude": 87.8615,
        "location": "Ullhas, Bardhaman"
      },
      {
        "id": "VEN-BDN-009",
        "name": "Heritage Burdwan Mart",
        "latitude": 23.2324,
        "longitude": 87.8615,
        "location": "Station Road, Bardhaman"
      },
      {
        "id": "VEN-BDN-010",
        "name": "Bengal Heartland Distro",
        "latitude": 23.2324,
        "longitude": 87.8615,
        "location": "Kalibazar, Bardhaman"
      }
    ]
  },
  {
    "city": "Kharagpur",
    "latitude": 22.346,
    "longitude": 87.232,
    "suppliers": [
      {
        "id": "SUP-KGP-001",
        "name": "IIT Corridor Print Solutions",
        "latitude": 22.346,
        "longitude": 87.232,
        "location": "IIT Campus Area, Kharagpur"
      },
      {
        "id": "SUP-KGP-002",
        "name": "Kharagpur Toner Clinic",
        "latitude": 22.346,
        "longitude": 87.232,
        "location": "Golbazar, Kharagpur"
      },
      {
        "id": "SUP-KGP-003",
        "name": "Nimpura Industrial Supplies",
        "latitude": 22.346,
        "longitude": 87.232,
        "location": "Malancha, Kharagpur"
      },
      {
        "id": "SUP-KGP-004",
        "name": "Golbazar Paper Mart",
        "latitude": 22.346,
        "longitude": 87.232,
        "location": "Railway Settlement, Kharagpur"
      },
      {
        "id": "SUP-KGP-005",
        "name": "Malancha Stationers",
        "latitude": 22.346,
        "longitude": 87.232,
        "location": "Nimpura Industrial Area, Kharagpur"
      },
      {
        "id": "SUP-KGP-006",
        "name": "Railway City Cartridge Depot",
        "latitude": 22.346,
        "longitude": 87.232,
        "location": "Inda, Kharagpur"
      },
      {
        "id": "SUP-KGP-007",
        "name": "Inda Tech Solutions",
        "latitude": 22.346,
        "longitude": 87.232,
        "location": "Chhota Tengra, Kharagpur"
      },
      {
        "id": "SUP-KGP-008",
        "name": "Hijli Knowledge Park Supplies",
        "latitude": 22.346,
        "longitude": 87.232,
        "location": "Kharida, Kharagpur"
      },
      {
        "id": "SUP-KGP-009",
        "name": "OT Road Office Depot",
        "latitude": 22.346,
        "longitude": 87.232,
        "location": "OT Road, Kharagpur"
      },
      {
        "id": "SUP-KGP-010",
        "name": "Medinipur District Print Care",
        "latitude": 22.346,
        "longitude": 87.232,
        "location": "Hijli, Kharagpur"
      }
    ],
    "vendors": [
      {
        "id": "VEN-KGP-001",
        "name": "Kharagpur Commercial Centre",
        "latitude": 22.346,
        "longitude": 87.232,
        "location": "IIT Campus Area, Kharagpur"
      },
      {
        "id": "VEN-KGP-002",
        "name": "Nimpura Supply Syndicate",
        "latitude": 22.346,
        "longitude": 87.232,
        "location": "Golbazar, Kharagpur"
      },
      {
        "id": "VEN-KGP-003",
        "name": "Golbazar Trade Link",
        "latitude": 22.346,
        "longitude": 87.232,
        "location": "Malancha, Kharagpur"
      },
      {
        "id": "VEN-KGP-004",
        "name": "Malancha Business Mart",
        "latitude": 22.346,
        "longitude": 87.232,
        "location": "Railway Settlement, Kharagpur"
      },
      {
        "id": "VEN-KGP-005",
        "name": "Railway City Vendors Hub",
        "latitude": 22.346,
        "longitude": 87.232,
        "location": "Nimpura Industrial Area, Kharagpur"
      },
      {
        "id": "VEN-KGP-006",
        "name": "IIT Campus Commercial Partner",
        "latitude": 22.346,
        "longitude": 87.232,
        "location": "Inda, Kharagpur"
      },
      {
        "id": "VEN-KGP-007",
        "name": "Inda Trade Syndicate",
        "latitude": 22.346,
        "longitude": 87.232,
        "location": "Chhota Tengra, Kharagpur"
      },
      {
        "id": "VEN-KGP-008",
        "name": "Apex Kharagpur Distro",
        "latitude": 22.346,
        "longitude": 87.232,
        "location": "Kharida, Kharagpur"
      },
      {
        "id": "VEN-KGP-009",
        "name": "Medinipur Commercial Distro",
        "latitude": 22.346,
        "longitude": 87.232,
        "location": "OT Road, Kharagpur"
      },
      {
        "id": "VEN-KGP-010",
        "name": "Premier Junction Trade Line",
        "latitude": 22.346,
        "longitude": 87.232,
        "location": "Hijli, Kharagpur"
      }
    ]
  },
  {
    "city": "Haldia",
    "latitude": 22.062,
    "longitude": 88.0674,
    "suppliers": [
      {
        "id": "SUP-HLD-001",
        "name": "Haldia Port Print Care",
        "latitude": 22.062,
        "longitude": 88.0674,
        "location": "Durgachak, Haldia"
      },
      {
        "id": "SUP-HLD-002",
        "name": "Durgachak Industrial Consumables",
        "latitude": 22.062,
        "longitude": 88.0674,
        "location": "Haldia Port Area, Haldia"
      },
      {
        "id": "SUP-HLD-003",
        "name": "Haldia Petrochem Stationers",
        "latitude": 22.062,
        "longitude": 88.0674,
        "location": "Township, Haldia"
      },
      {
        "id": "SUP-HLD-004",
        "name": "Township Cartridge Clinic",
        "latitude": 22.062,
        "longitude": 88.0674,
        "location": "Basudevpur, Haldia"
      },
      {
        "id": "SUP-HLD-005",
        "name": "Basudevpur Toner Care",
        "latitude": 22.062,
        "longitude": 88.0674,
        "location": "Chiranjibpur, Haldia"
      },
      {
        "id": "SUP-HLD-006",
        "name": "Port City Paper House",
        "latitude": 22.062,
        "longitude": 88.0674,
        "location": "Brajanathchak, Haldia"
      },
      {
        "id": "SUP-HLD-007",
        "name": "Chiranjibpur Tech Supplies",
        "latitude": 22.062,
        "longitude": 88.0674,
        "location": "Sutahata, Haldia"
      },
      {
        "id": "SUP-HLD-008",
        "name": "Hooghly Estuary Office Depot",
        "latitude": 22.062,
        "longitude": 88.0674,
        "location": "Bhatterchak, Haldia"
      },
      {
        "id": "SUP-HLD-009",
        "name": "Sutahata Industrial Care",
        "latitude": 22.062,
        "longitude": 88.0674,
        "location": "Ranichak, Haldia"
      },
      {
        "id": "SUP-HLD-010",
        "name": "Coastal Bengal Print Pack",
        "latitude": 22.062,
        "longitude": 88.0674,
        "location": "Kashberia, Haldia"
      }
    ],
    "vendors": [
      {
        "id": "VEN-HLD-001",
        "name": "Haldia Port Commercial Syndicate",
        "latitude": 22.062,
        "longitude": 88.0674,
        "location": "Durgachak, Haldia"
      },
      {
        "id": "VEN-HLD-002",
        "name": "Durgachak Supply Network",
        "latitude": 22.062,
        "longitude": 88.0674,
        "location": "Haldia Port Area, Haldia"
      },
      {
        "id": "VEN-HLD-003",
        "name": "Township Trade Partners",
        "latitude": 22.062,
        "longitude": 88.0674,
        "location": "Township, Haldia"
      },
      {
        "id": "VEN-HLD-004",
        "name": "Haldia Petrochem Business Mart",
        "latitude": 22.062,
        "longitude": 88.0674,
        "location": "Basudevpur, Haldia"
      },
      {
        "id": "VEN-HLD-005",
        "name": "Basudevpur Commercial Line",
        "latitude": 22.062,
        "longitude": 88.0674,
        "location": "Chiranjibpur, Haldia"
      },
      {
        "id": "VEN-HLD-006",
        "name": "Port Area Distro Hub",
        "latitude": 22.062,
        "longitude": 88.0674,
        "location": "Brajanathchak, Haldia"
      },
      {
        "id": "VEN-HLD-007",
        "name": "Sutahata Trade Syndicate",
        "latitude": 22.062,
        "longitude": 88.0674,
        "location": "Sutahata, Haldia"
      },
      {
        "id": "VEN-HLD-008",
        "name": "Apex Haldia Distro",
        "latitude": 22.062,
        "longitude": 88.0674,
        "location": "Bhatterchak, Haldia"
      },
      {
        "id": "VEN-HLD-009",
        "name": "Marine & Industrial Vendors",
        "latitude": 22.062,
        "longitude": 88.0674,
        "location": "Ranichak, Haldia"
      },
      {
        "id": "VEN-HLD-010",
        "name": "Pioneer Coastal Port Distro",
        "latitude": 22.062,
        "longitude": 88.0674,
        "location": "Kashberia, Haldia"
      }
    ]
  }
],
  },
];

// Calculate distance in kilometers
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

// Disperse identical coordinates radially so pins are visually distinct on map
export const getEffectiveCoordinates = (
  item,
  index,
  total,
  centerLat,
  centerLng,
) => {
  if (
    item.lat &&
    item.lng &&
    (Math.abs(item.lat - centerLat) > 0.002 ||
      Math.abs(item.lng - centerLng) > 0.002)
  ) {
    return { lat: item.lat, lng: item.lng };
  }
  const angle = (index / Math.max(total, 1)) * 2 * Math.PI - Math.PI / 2;
  const radius = 0.016 + (index % 3) * 0.008;
  return {
    lat: Number((centerLat + Math.sin(angle) * radius).toFixed(5)),
    lng: Number((centerLng + Math.cos(angle) * (radius * 1.05)).toFixed(5)),
  };
};
