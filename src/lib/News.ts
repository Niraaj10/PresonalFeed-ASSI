import axios from 'axios';

export interface GNewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

export const fetchTopHeadlines = async (): Promise<GNewsArticle[]> => {
  const apiKey = process.env.GNEWS_API_KEY;
  console.log( "API" + apiKey)
  const category = 'technology';

  if (!apiKey) {
    console.error('Missing GNEWS_API_KEY in environment variables.');
    return [];
  }

  try {
    const response = await axios.get(`https://gnews.io/api/v4/top-headlines?category=${category}&apikey=${apiKey}`);

    console.log(response.data);
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};



export const dummyArticles = [
  {
    id: '886a2f79f54cf9ae997761e0bbb6198a',
    title: 'Atomos Ninja TX Monitor-Recorder Introduced - Built-in C2C Connection, Brighter Display and More',
    description: 'Atomos has released a new monitor-recorder in the famous Ninja series: the Ninja TX, which is brighter and has built-in C2C connectivity.',
    content: 'Atomos has just released their latest monitor-recorder in the famous Ninja series: the Ninja TX. Compared to its predecessor, this TX model has a brighter 1,500nits display, built-in C2C connectivity, it records to CFexpress Type B cards or external SSDs.',
    url: 'https://www.cined.com/atomos-ninja-tx-monitor-recorder-introduced-built-in-c2c-connection-brighter-display-and-more/',
    image: 'https://www.cined.com/content/uploads/2025/07/AtomosNinjaTX_Featured.jpg',
    publishedAt: '2025-07-23T06:35:50Z',
    source: {
      id: 'f653c6fa73f568ff773d57b6f6c165db',
      name: 'CineD',
      url: 'https://www.cined.com'
    }
  },
  {
    id: '2d4226544d508b9ee3393260ca16dda5',
    title: 'The Future of Browsing: How AI-Powered Browser "Comet" is Changing the Internet',
    description: 'Perplexity recently launched Comet – not just a browser, but an AI-integrated search experience that learns user habits.',
    content: 'Comet is changing the way users browse the internet by introducing AI-powered contextual results, summarization, and natural language search. It’s built to adapt over time and provide more relevant, faster, and more intelligent browsing experiences.',
    url: 'https://example.com/ai-browser-comet-launch',
    image: 'https://www.gameshub.com/wp-content/uploads/sites/5/2025/07/PlayStation-30th-Anniversary-Gear-1.jpg',
    publishedAt: '2025-07-22T09:10:00Z',
    source: {
      id: 'perplexity',
      name: 'Perplexity AI',
      url: 'https://www.perplexity.ai'
    }
  },
    {
    id: 'a90343bc0a7654fd34789962e4f6268d',
    title: 'Microsoft Discontinues Streaming Content on Windows Store',
    description: 'Microsoft has officially ended support for streaming media on the Windows Store, shifting focus to Xbox and cloud services.',
    content: 'Microsoft announced it will remove all movie and TV streaming content from the Windows Store by the end of 2025. The decision comes as part of a broader strategy to consolidate media services under Xbox and Game Pass.',
    url: 'https://www.tecnoandroid.it/2025/07/23/microsoft-niente-piu-contenuti-streaming-sullo-store-1596742/',
    image: 'https://img.pravda.com/images/doc/7/5/7523019_fb_image_ukr_2025_07_23_09_32_57.jpg',
    publishedAt: '2025-07-23T10:05:00Z',
    source: {
      id: 'tecnoandroid',
      name: 'TecnoAndroid',
      url: 'https://www.tecnoandroid.it'
    }
  },
  {
    id: '64929f3fe2c668c004b4652d430c1dd3',
    title: 'Amazon Deals: Apple Watch Series 10 Price Drops to Record Low',
    description: 'Get the Apple Watch Series 10 with health and AI features at an unbeatable discount on Amazon.',
    content: 'Amazon is offering significant discounts on the Apple Watch Series 10, making it one of the best deals this season. The watch includes dual-band GPS, AI coaching, and a 13-day battery life.',
    url: 'https://www.amazon.com/apple-watch-series-10-deals',
    image: 'https://static.toiimg.com/thumb/msid-122851999,width-1070,height-580,imgsize-67628,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg',
    publishedAt: '2025-07-23T11:12:00Z',
    source: {
      id: 'amazon',
      name: 'Amazon',
      url: 'https://www.amazon.com'
    }
  },
  {
    id: '886a2f79f54cf9ae997761e0bbb61986',
    title: 'Atomos Ninja TX Monitor-Recorder Introduced - Built-in C2C Connection, Brighter Display and More',
    description: 'Atomos has released a new monitor-recorder in the famous Ninja series: the Ninja TX, which is brighter and has built-in C2C connectivity.',
    content: 'Atomos has just released their latest monitor-recorder in the famous Ninja series: the Ninja TX. Compared to its predecessor, this TX model has a brighter 1,500nits display, built-in C2C connectivity, it records to CFexpress Type B cards or external SSDs.',
    url: 'https://www.cined.com/atomos-ninja-tx-monitor-recorder-introduced-built-in-c2c-connection-brighter-display-and-more/',
    image: 'https://www.cined.com/content/uploads/2025/07/AtomosNinjaTX_Featured.jpg',
    publishedAt: '2025-07-23T06:35:50Z',
    source: {
      id: 'f653c6fa73f568ff773d57b6f6c165db',
      name: 'CineD',
      url: 'https://www.cined.com'
    }
  },
  {
  id: '886a2f79f54cf9ae997761e0bbb61982',
    title: 'Atomos Ninja TX Monitor-Recorder Introduced - Built-in C2C Connection, Brighter Display and More',
    description: 'Atomos has released a new monitor-recorder in the famous Ninja series: the Ninja TX, which is brighter and has built-in C2C connectivity.',
    content: 'Atomos has just released their latest monitor-recorder in the famous Ninja series: the Ninja TX. Compared to its predecessor, this TX model has a brighter 1,500nits display, built-in C2C connectivity, it records to CFexpress Type B cards or external SSDs.',
    url: 'https://www.cined.com/atomos-ninja-tx-monitor-recorder-introduced-built-in-c2c-connection-brighter-display-and-more/',
    image: 'https://static.toiimg.com/thumb/msid-122851999,width-1070,height-580,imgsize-67628,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg',
    publishedAt: '2025-07-23T06:35:50Z',
    source: {
      id: 'f653c6fa73f568ff773d57b6f6c165db',
      name: 'CineD',
      url: 'https://www.cined.com'
    }
  },
  {
    id: '2d4226544d508b9ee3393260ca16dda1',
    title: 'The Future of Browsing: How AI-Powered Browser "Comet" is Changing the Internet',
    description: 'Perplexity recently launched Comet – not just a browser, but an AI-integrated search experience that learns user habits.',
    content: 'Comet is changing the way users browse the internet by introducing AI-powered contextual results, summarization, and natural language search. It’s built to adapt over time and provide more relevant, faster, and more intelligent browsing experiences.',
    url: 'https://example.com/ai-browser-comet-launch',
    image: 'https://www.tecnoandroid.it/wp-content/uploads/2025/07/Denis-1600-×-900-px-4-1.jpg',
    publishedAt: '2025-07-22T09:10:00Z',
    source: {
      id: 'perplexity',
      name: 'Perplexity AI',
      url: 'https://www.perplexity.ai'
    }
  },
  {
    id: '0971864d93882ff93cf4sg93e0037a2cf4',
    title: 'PlayStation Celebrates 30th Anniversary with Classic Gear Restock',
    description: 'Sony is bringing back limited edition gear themed around the original PlayStation, including retro-style DualSense controllers.',
    content: 'Sony is restocking the PS5 Slim, DualSense & Portal gear, featuring retro colors and original branding from the PlayStation 1 era.',
    url: 'https://www.gameshub.com/news/news/playstation-30th-anniversary-restock',
    image: 'https://www.livehindustan.com/lh-img/smart/img/2025/07/23/1600x900/vivo-1_1753249350839_1753249360528.jpg',
    publishedAt: '2025-07-20T17:45:00Z',
    source: {
      id: 'gameshub',
      name: 'GamesHub',
      url: 'https://www.gameshub.com'
    }
  },
  {
    id: 'a90343bc0a7654fd3478996ege2e4f62686',
    title: 'Microsoft Discontinues Streaming Content on Windows Store',
    description: 'Microsoft has officially ended support for streaming media on the Windows Store, shifting focus to Xbox and cloud services.',
    content: 'Microsoft announced it will remove all movie and TV streaming content from the Windows Store by the end of 2025. The decision comes as part of a broader strategy to consolidate media services under Xbox and Game Pass.',
    url: 'https://www.tecnoandroid.it/2025/07/23/microsoft-niente-piu-contenuti-streaming-sullo-store-1596742/',
    image: 'https://www.livehindustan.com/lh-img/smart/img/2025/07/23/1600x900/vivo-1_1753249350839_1753249360528.jpg',
    publishedAt: '2025-07-23T10:05:00Z',
    source: {
      id: 'tecnoandroid',
      name: 'TecnoAndroid',
      url: 'https://www.tecnoandroid.it'
    }
  },
  {
    id: '64929f3fe2c668c004b4652dgeg430c1dd3',
    title: 'Amazon Deals: Apple Watch Series 10 Price Drops to Record Low',
    description: 'Get the Apple Watch Series 10 with health and AI features at an unbeatable discount on Amazon.',
    content: 'Amazon is offering significant discounts on the Apple Watch Series 10, making it one of the best deals this season. The watch includes dual-band GPS, AI coaching, and a 13-day battery life.',
    url: 'https://www.amazon.com/apple-watch-series-10-deals',
    image: 'https://static.toiimg.com/thumb/msid-122851999,width-1070,height-580,imgsize-67628,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg',
    publishedAt: '2025-07-23T11:12:00Z',
    source: {
      id: 'amazon',
      name: 'Amazon',
      url: 'https://www.amazon.com'
    }
  },
  {
    id: '886a2f79f54cf9ae997761e0bbfaefb6198a',
    title: 'Atomos Ninja TX Monitor-Recorder Introduced - Built-in C2C Connection, Brighter Display and More',
    description: 'Atomos has released a new monitor-recorder in the famous Ninja series: the Ninja TX, which is brighter and has built-in C2C connectivity.',
    content: 'Atomos has just released their latest monitor-recorder in the famous Ninja series: the Ninja TX. Compared to its predecessor, this TX model has a brighter 1,500nits display, built-in C2C connectivity, it records to CFexpress Type B cards or external SSDs.',
    url: 'https://www.cined.com/atomos-ninja-tx-monitor-recorder-introduced-built-in-c2c-connection-brighter-display-and-more/',
    image: 'https://www.cined.com/content/uploads/2025/07/AtomosNinjaTX_Featured.jpg',
    publishedAt: '2025-07-23T06:35:50Z',
    source: {
      id: 'f653c6fa73f568ff773d57b6f6c165db',
      name: 'CineD',
      url: 'https://www.cined.com'
    }
  },
]
