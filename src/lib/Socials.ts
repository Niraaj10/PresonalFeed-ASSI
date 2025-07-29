export interface SocialMediaPost {
    id: number;
    post: string;
    image: string;
    author: string;
    hashtags: string[];
}

export const socialMediaPosts: SocialMediaPost[] = [

    {
        id: 1,
        post: "Minimalist setup with a sleek monitor and clean desk vibe ✨",
        image: "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b",
        author: "MinimalDev",
        hashtags: ["#minimalism", "#desksetup", "#tech"]
    },
    {
        id: 2,
        post: "Weekend hike to clear the mind 🥾🌲",
        image: "https://images.unsplash.com/photo-1508780709619-79562169bc64",
        author: "TrailTrekker",
        hashtags: ["#hiking", "#weekendvibes", "#nature"]
    },
    {
        id: 3,
        post: "Homemade ramen night 🍜❤️",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
        author: "NoodleLover",
        hashtags: ["#ramen", "#homemade", "#foodie"]
    },
    {
        id: 4,
        post: "Sunrise yoga = best way to start the day 🌅🧘‍♀️",
        image: "https://images.unsplash.com/photo-1552058544-f2b08422138a",
        author: "ZenFlow",
        hashtags: ["#yoga", "#wellness", "#sunrise"]
    },
    {
        id: 5,
        post: "Shot this dreamy portrait in golden hour ✨📸",
        image: "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b",
        author: "PhotoWhiz",
        hashtags: ["#photography", "#goldenhour", "#portrait"]
    },
    {
        id: 6,
        post: "Finally mastered the perfect latte art ☕🎨",
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
        author: "CaffeineCrafter",
        hashtags: ["#coffee", "#latteart", "#barista"]
    },
    {
        id: 7,
        post: "Quick morning journaling and mindfulness 📝☀️",
        image: "https://images.unsplash.com/photo-1557683316-973673baf926",
        author: "MindfulMoments",
        hashtags: ["#journal", "#mindfulness", "#routine"]
    },
    {
        id: 8,
        post: "Dreaming of my last trip to Santorini 💙🇬🇷",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        author: "WanderSoul",
        hashtags: ["#travel", "#greece", "#wanderlust"]
    },
    {
        id: 9,
        post: "Practicing guitar every night this week 🎸🎶",
        image: "https://images.unsplash.com/photo-1511376777868-611b54f68947",
        author: "ChordStrummer",
        hashtags: ["#music", "#guitar", "#practice"]
    },
    {
        id: 10,
        post: "Tried my hand at acrylic painting again 🎨🖌️",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
        author: "CanvasDreamer",
        hashtags: ["#painting", "#art", "#creativity"]
    },
    {
        id: 11,
        post: "Just deployed a Next.js app to Vercel in under 5 minutes 🚀",
        image: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb",
        author: "FrontendNinja",
        hashtags: ["#NextJS", "#Vercel", "#webdev"]
    },
    {
        id: 12,
        post: "Learning Rust 🦀 and it’s blowing my mind!",
        image: "https://fastly.picsum.photos/id/45/4592/2576.jpg?hmac=Vc7_kMYufvy96FxocZ1Zx6DR1PNsNQXF4XUw1mZ2dlc",
        author: "SystemSage",
        hashtags: ["#RustLang", "#lowlevel", "#programming"]
    },
    {
        id: 13,
        post: "Built a crypto price tracker with React + TypeScript 💸",
        image: "https://fastly.picsum.photos/id/36/4179/2790.jpg?hmac=OCuYYm0PkDCMwxWhrtoSefG5UDir4O0XCcR2x-aSPjs",
        author: "CryptoCoder",
        hashtags: ["#blockchain", "#React", "#TypeScript"]
    },
    {
        id: 14,
        post: "Daily standup with my rubber duck 🐥",
        image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167",
        author: "SoloDev",
        hashtags: ["#rubberduckdebugging", "#remotework", "#devlife"]
    },
    {
        id: 15,
        post: "Pair programming session was 🔥 today!",
        image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
        author: "DevBuddy",
        hashtags: ["#pairprogramming", "#teamwork", "#remotedev"]
    },
    {
        id: 16,
        post: "Serverless API up and running on AWS Lambda ⚙️🌩️",
        image: "https://picsum.photos/200/300",
        author: "CloudBuilder",
        hashtags: ["#Serverless", "#AWS", "#API"]
    },
    {
        id: 17,
        post: "Debugged a production bug using logs and sixth sense 🔍",
        image: "https://picsum.photos/seed/picsum/200/300",
        author: "BugSquasher",
        hashtags: ["#production", "#debugging", "#logs"]
    },
    {
        id: 18,
        post: "Exploring Stable Diffusion for AI image generation 🎨",
        image: "https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ",
        author: "GenAIArtist",
        hashtags: ["#AIart", "#stablediffusion", "#generative"]
    }
];


export const getSocialMediaPosts = (limit = 20): Promise<SocialMediaPost[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(socialMediaPosts.slice(0, limit));
        }, 800);
    });
};


export const getSocialMediaPostsByGenres = (
    genres: string[],
    page = 1,
    pageSize = 5
): Promise<SocialMediaPost[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const filtered = socialMediaPosts.filter((post) =>
                post.hashtags.some((tag) =>
                    genres.includes(tag.replace("#", "").toLowerCase())
                )
            );

            const start = (page - 1) * pageSize;
            const paginated = filtered.slice(start, start + pageSize);

            resolve(paginated);
        }, 800);
    });
};



export const getSocialMediaPostsBySearch = async (query: string) => {
  const lowerQuery = query.toLowerCase();
  return socialMediaPosts.filter(
    (post) =>
      post.post.toLowerCase().includes(lowerQuery) ||
      post.author.toLowerCase().includes(lowerQuery) ||
      post.hashtags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
};