import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  [
    'Headphones',
    'Computers & Laptop',
    'smart phones',
    'Perfume',
    "Women's Lehenga",
    "Men's Kurta",
  ];

  const products_Headphones = [
    {
      title:
        'Apple AirPods 4 Wireless Earbuds, Bluetooth Headphones, Custom Spatial Sound, Sweat & Water Resistant, USB-C Charging Case, H2 Chip, Up to 30 Hours Battery Life, Easy iPhone Setup',
      desc: 'This sports loop band is soft, breathable, and lightweight, with a Velcro closure for quick and easy adjustment. The double-layered nylon fabric features dense loops against the skin, providing a soft, moisture-wicking lining. On the reverse side, securely fastened loops offer superior durability.',
      price: 6500,
      discount: 150,
      userId: '2625281c-3103-43e3-8424-9e64b68c0fcb',
      categoryId: '',
      star: 4.3,
      imageCover: '1_51MlTIMDdsL._AC_SL1500_.jpg',
      images: [
        '2_61DvMw16ITL._AC_SL1500_.jpg',
        '3_61ElHEm4ZIL._AC_SL1500_.jpg',
      ],
    },
    {
      title:
        'Anker Soundcore K20i Wireless Earbuds with Bluetooth, 36-Hour Playtime, Fast Charging, Clear Sound, Clear Calls, ENC 2 Microphone, Custom Equalizer, IPX5 Rating, and App Control (Black), 18-Month Warranty',
      desc: "Extended playtime: Enjoy up to 36 hours of music with the Soundcore K20i headphones. They feature a quick 10-minute charge that gives you an additional 2 hours of playback, so you're always ready to dive into your sound anytime, anywhere.",
      price: 650,
      discount: 15,
      userId: '2625281c-3103-43e3-8424-9e64b68c0fcb',
      categoryId: '',
      star: 3.7,
      imageCover: '',
      images: [],
    },
    {
      title:
        'Xiaomi Redmi Buds 6 Active AI Noise Canceling Wireless Earbuds for Calls, Bluetooth 5.3, Deep Bass, Fast Google Pairing, Fast Charging, USB Type C, Small and Lightweight, Blue',
      desc: "Long playtime and fast charging: Up to 6 hours of continuous playback on a single charge, and up to 30 hours of music playback with the charging case. Plus, it features fast charging, providing up to 1 hour of playtime with just 10 minutes of charging, so you don't have to worry about unexpected online meetings.",
      price: 1100,
      discount: 50,
      userId: '2625281c-3103-43e3-8424-9e64b68c0fcb',
      categoryId: '',
      star: 3.9,
      imageCover: '',
      images: [],
    },
    {
      title:
        'The Soundcore V20i earbuds are extremely comfortable with adjustable ear hooks for a secure fit from Anker, delivering powerful sound and clear calls, LED lighting, up to 36 hours of playtime, Bluetooth 5.4, and come in black.',
      desc: 'Ultimate comfort with open-ear headphones: Enjoy unparalleled comfort even when worn all day with these unobtrusive open-ear headphones.',
      price: 1450,
      discount: 25,
      userId: '2625281c-3103-43e3-8424-9e64b68c0fcb',
      categoryId: '',
      star: 4.4,
      imageCover: '',
      images: [],
    },
  ];

  const products_Computers = [
    {
      title:
        'HP 200 G4 All-in-One Laptop, Intel Core i5 1235U Processor, 8GB RAM, 512GB SSD, Intel Iris X Graphics, 21.5-inch FHD Non-Touch Screen, Wired Keyboard and Mouse, B6YN4ET, Black',
      desc: 'Processor: The AMD Ryzen 5 7520U processor delivers powerful performance with a boost clock of up to 4.3 GHz, and features four cores and eight threads for smooth multitasking.',
      price: 21700,
      discount: 100,
      userId: '2625281c-3103-43e3-8424-9e64b68c0fcb',
      categoryId: '',
      star: 4.4,
      imageCover: '',
      images: [],
    },
    {
      title:
        'HP 15-fd2001ne AI Laptop with Ultra 7-255U Processor, 16GB RAM, 1TB SSD, Intel Graphics, 15.6" FHD Display, Full Backlit Keyboard, Windows 11, Silver',
      desc: 'HP AI 15-fd2001ne Ultra 7-255U Laptop, 16GB DDR5 2DM 5600, 1TB SSD, Intel Graphics, 15.6-inch FHD Display, 1920x1080, 300 nits, Full Backlight, Free HP 240 Bluetooth and 3M GamePass, Windows 11, Silver, 3-Year Warranty',
      price: 43400,
      discount: 39,
      userId: '2625281c-3103-43e3-8424-9e64b68c0fcb',
      categoryId: '',
      star: 4.0,
      imageCover: '',
      images: [],
    },
    {
      title:
        'Dell laptop, with an Intel processor, 15.6-inch screen, and 8GB of RAM.',
      desc: '13th Generation Intel Core i7-1355U Processor (12MB Cache, 10 Cores (2 Performance Cores and 8 Efficiency Cores), 12 Threads, Performance Core from 1.70GHz to 5.00GHz, Efficiency Core from 1.20GHz to 3.70GHz, 15W Power Consumption)',
      price: 34850,
      discount: 350,
      userId: '2625281c-3103-43e3-8424-9e64b68c0fcb',
      categoryId: '',
      star: 3.5,
      imageCover: '',
      images: [],
    },
    {
      title:
        'HP All-in-One 27-CR0154nh, Intel Core i7-1355U, 8GB, 512GB, Intel Iris XI Graphics, 27-inch FHD Touchscreen - 3 Micro Edge Sides, 300 nits, Keyboard + Mouse - White',
      desc: 'Powerful performance: The Intel Core i7-1355U processor with turbo boost up to 5.0 GHz, 12 MB L3 cache, 10 cores and 12 threads delivers exceptional multitasking capabilities for demanding workloads.',
      price: 58600,
      discount: 300,
      userId: '2625281c-3103-43e3-8424-9e64b68c0fcb',
      categoryId: '',
      star: 4.1,
      imageCover: '',
      images: [],
    },
  ];

  const products_SmartPhones = [
    {
      title:
        'Apple iPhone 17 Pro (512GB) - Cosmic Orange with Face ID | Tax Paid | 2-Year Official Warranty',
      desc: 'Ceramic Shield is durable. Front and back. — Ceramic Shield protects the back of the iPhone 17 Pro, making it 4 times more crack-resistant. And the new Ceramic Shield 2 front screen offers 3 times better scratch resistance.',
      price: 118900,
      discount: 100,
      userId: '2625281c-3103-43e3-8424-9e64b68c0fcb',
      categoryId: '',
      star: 4.3,
      imageCover: '',
      images: [],
    },
    {
      title:
        'Apple iPhone 17 Pro (256GB) - Deep Blue with Face ID | Tax Paid | 2-Year Official Warranty',
      desc: 'Ceramic Shield is durable. Front and back. — Ceramic Shield protects the back of the iPhone 17 Pro, making it 4 times more crack-resistant. And the new Ceramic Shield 2 front screen offers 3 times better scratch resistance.',
      price: 95500,
      discount: 150,
      userId: '2625281c-3103-43e3-8424-9e64b68c0fcb',
      categoryId: '',
      star: 4.3,
      imageCover: '',
      images: [],
    },
    {
      title:
        'Samsung Galaxy S25 Ultra AI Mobile Phone with 1TB Storage, 12GB RAM, Android Operating System, 200MP Camera, S Pen, Long Battery Life, Local Version, Titanium Blue Silver',
      desc: 'Galaxy AI: Experience the next generation of mobile AI with AI technology that will be your go-to companion, helping you with all your needs. Simply chat with it naturally to easily manage and check your daily tasks.',
      price: 84000,
      discount: 150,
      userId: '2625281c-3103-43e3-8424-9e64b68c0fcb',
      categoryId: '',
      star: 5.0,
      imageCover: '',
      images: [],
    },
    {
      title:
        'The Realme 15 Pro 5G AI smartphone features 256GB of storage, 12GB of RAM, an Android operating system, a 108MP camera, and 120W SuperVOOC charging.',
      desc: 'A dynamically flowing silver exterior with a light-reflecting pattern that changes with the angle.',
      price: 26700,
      discount: 150,
      userId: '2625281c-3103-43e3-8424-9e64b68c0fcb',
      categoryId: '',
      star: 4.0,
      imageCover: '',
      images: [],
    },
  ];

  const products_Perfume = [
    {
      title: "Vogue Men's Woody Fragrance, Eau de Parfum 100ml",
      desc: 'Feel refreshed and confident with this Masculine Fog body spray. Its rich fragrance will keep you feeling fresh and invigorated all day long. It leaves you feeling relaxed and revitalized. A strong, long-lasting, masculine scent.',
      price: 500,
      discount: 25,
      userId: '2625281c-3103-43e3-8424-9e64b68c0fcb',
      categoryId: '',
      star: 4.1,
      imageCover: '',
      images: [],
    },
    {
      title: 'Jaguar Classic Gold Eau de Toilette, 100ml',
      desc: 'Jaguar Classic Gold for men is guaranteed to raise the heart rate of car enthusiasts with its captivating blend of spicy fruits and floral woods. This sensual eau de toilette was created for the British automaker by perfumer Dominique Presas in 2013. It comes in the iconic 100ml Jaguar glass bottle with gold accents. The bottle is packaged in a very elegant gold box with the visceral Jaguar logo embossed on the cap. The fragrance features fruity top notes of apple, lemon, and bergamot. The heart of the fragrance contains an exciting blend of orange blossom and teak wood. The base notes are warm and sensual patchouli, vanilla, and musk. This exclusive fragrance is perfect for everyday wear as it has excellent longevity.',
      price: 1075,
      discount: 25,
      userId: '2625281c-3103-43e3-8424-9e64b68c0fcb',
      categoryId: '',
      star: 4.3,
      imageCover: '',
      images: [],
    },
    {
      title: 'Hoss Black Eau de Parfum for Men by Rasasi, 100 ml',
      desc: 'Apply to pulse points such as the wrists, neck, and behind the ears. For best results, apply after showering or shaving. Contains one 100ml liquid bottle weighing 0.12 kg. Personalized liquid perfume measuring 18.0 x 8.0 x 8.0 cm and containing 100.0 ml.',
      price: 1500,
      discount: 50,
      userId: '2625281c-3103-43e3-8424-9e64b68c0fcb',
      categoryId: '',
      star: 4.2,
      imageCover: '',
      images: [],
    },
  ];

  const products_WomensLehenga = [
    {
      title: 'Pink Georgette Mirror Embroidered Lehenga',
      desc: "Immerse yourself in the splendor of this spectacular Twamev's pink lehenga. Crafted from luxurious georgette, the ensemble includes a top, lehenga and a dupatta. With its vibrant color and enchanting design, this lehenga set is a quintessential addition to your festive and wedding wardrobe. Its enchanting hue of pink and gajree complements every occasion, making you the dazzling center of attention every time.",
      price: 1385,
      discount: 35,
      userId: '2625281c-3103-43e3-8424-9e64b68c0fcb',
      categoryId: '',
      star: 4.1,
      imageCover: '',
      images: [],
    },
    {
      title:
        "Rashmika's Zari Embroidered Bridal Lehenga with Signature Elephant Border",
      desc: 'Command bridal attention in this majestic maroon lehenga set, featuring intricate zari embroidery with floral jaal motifs, scalloped borders, and shimmering sequin accents across the heavy flared skirt, sleeveless choli, and flowing dupatta. The luxurious fabric drapes with royal elegance, enhanced by layered tassel detailing and contrast underskirt for dramatic volume. Perfect for wedding ceremonies, sangeet, or reception, this traditional bridal lehenga delivers unparalleled opulence and poise.',
      price: 1540,
      discount: 40,
      userId: '2625281c-3103-43e3-8424-9e64b68c0fcb',
      categoryId: '',
      star: 4.3,
      imageCover: '',
      images: [],
    },
    {
      title: 'Pink Elegance Bridal Lehenga',
      desc: 'Experience royal elegance with this Pink Lehenga. Perfect for upscale occasions, this beautifully designed attire is crafted from premium Art Silk. It features intricate patterns and comes with an unstitched blouse, a double dupatta, and a latkan, enriching your traditional look. Add some shimmering jewelries to complement this Lehenga, perfect for weddings and other festive occasions.',
      price: 1230,
      discount: 30,
      userId: '2625281c-3103-43e3-8424-9e64b68c0fcb',
      categoryId: '',
      star: 3.9,
      imageCover: '',
      images: [],
    },
    {
      title: 'Velvety Maroon Elegance Bridal Lehenga',
      desc: 'Unveil your royal side with this exquisite maroon lehenga. Tailored from plush velvet, this lehenga set includes an intricately designed blouse, double dupatta and a stunning latkan belt. Be it a sangeet function or the grand reception, this lehenga promises to make you the highlight of any event.',
      price: 1690,
      discount: 30,
      userId: '2625281c-3103-43e3-8424-9e64b68c0fcb',
      categoryId: '',
      star: 4.4,
      imageCover: '',
      images: [],
    },
  ];

  const products_MensKurta = [
    {
      title: 'Ivory Silk Resham Embroidered Jacket Set',
      desc: 'Delight in this Cream Kurta Jacket Set, the perfect choice for any grand occasion. Showcasing intricate craftsmanship, this set includes a Jacket, Kurta, and Churidar made of excellent quality Silk. Its sensitive yet elegant hue mirrors the joyous spirit of celebrations capturing the essence of Indian traditional wear. Suitable for all formal and festive events.',
      price: 400,
      discount: 25,
      userId: '2625281c-3103-43e3-8424-9e64b68c0fcb',
      categoryId: '',
      star: 4.0,
      imageCover: '',
      images: [],
    },
    {
      title: 'Emerald Sparkle Kurta Jacket Set',
      desc: "Step into the limelight adorning the charming Emerald Sparkle Kurta Jacket Set, perfect for any celebratory occasion. Crafted meticulously from premium blended cotton and silk, this ensemble promises comfort while you exude elegance. It includes a kurta, pyjama, jacket, brooch, and pocket square, creating a complete look that's truly enviable. Bring forth your inner royalty and make each moment count.",
      price: 340,
      discount: 20,
      userId: '2625281c-3103-43e3-8424-9e64b68c0fcb',
      categoryId: '',
      star: 3.4,
      imageCover: '',
      images: [],
    },

    {
      title: 'Velvety Maroon Elegance Bridal Lehenga',
      desc: 'Unveil your royal side with this exquisite maroon lehenga. Tailored from plush velvet, this lehenga set includes an intricately designed blouse, double dupatta and a stunning latkan belt. Be it a sangeet function or the grand reception, this lehenga promises to make you the highlight of any event.',
      price: 1690,
      discount: 30,
      userId: '2625281c-3103-43e3-8424-9e64b68c0fcb',
      categoryId: '',
      star: 4.4,
      imageCover: '',
      images: [],
    },
  ];

  await prisma.product.createMany();
}

main()
  .catch((e) => {
    console.error('Seeder Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
