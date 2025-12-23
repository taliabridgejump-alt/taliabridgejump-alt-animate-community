import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User';
import Video from './models/Video';
import Comment from './models/Comment';
import Like from './models/Like';
import Bookmark from './models/Bookmark';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/animate-community';

const sampleVideos = [
  {
    title: 'Amazing 3D Character Animation',
    description: 'A showcase of advanced character animation techniques with realistic motion and expressions.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/anim1/640/360',
    tags: ['3d', 'character', 'animation'],
    category: 'showcase'
  },
  {
    title: 'Blender Tutorial: Rigging Basics',
    description: 'Learn the fundamentals of character rigging in Blender. Perfect for beginners!',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/anim2/640/360',
    tags: ['blender', 'tutorial', 'rigging'],
    category: 'tutorial'
  },
  {
    title: 'Motion Graphics Showreel 2024',
    description: 'A collection of my best motion graphics work from this year.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/anim3/640/360',
    tags: ['motion-graphics', 'showreel', 'after-effects'],
    category: 'showcase'
  },
  {
    title: 'Behind the Scenes: Making of Short Film',
    description: 'See how we created our award-winning animated short film from concept to final render.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/anim4/640/360',
    tags: ['behind-the-scenes', 'short-film', 'process'],
    category: 'behind-the-scenes'
  },
  {
    title: 'Anime Style Animation Challenge',
    description: 'My entry for the 30-day animation challenge in anime style!',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/anim5/640/360',
    tags: ['anime', 'challenge', '2d'],
    category: 'challenge'
  },
  {
    title: 'Advanced Particle Systems in Unity',
    description: 'Deep dive into creating stunning particle effects for games.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/anim6/640/360',
    tags: ['unity', 'particles', 'vfx'],
    category: 'tutorial'
  },
  {
    title: 'Stop Motion Animation Experiment',
    description: 'Experimenting with stop motion techniques using everyday objects.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/anim7/640/360',
    tags: ['stop-motion', 'experimental', 'creative'],
    category: 'showcase'
  },
  {
    title: 'Character Design Process',
    description: 'From sketch to final 3D model - complete character design workflow.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/anim8/640/360',
    tags: ['character-design', '3d-modeling', 'workflow'],
    category: 'tutorial'
  },
  {
    title: 'Fluid Simulation Breakdown',
    description: 'How I created realistic water and fluid effects in my latest project.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/anim9/640/360',
    tags: ['simulation', 'water', 'vfx'],
    category: 'tutorial'
  },
  {
    title: 'Stylized Environment Art',
    description: 'Creating beautiful stylized environments for games and animation.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/anim10/640/360',
    tags: ['environment', 'stylized', 'art'],
    category: 'showcase'
  },
  {
    title: 'Animation Principles Explained',
    description: 'The 12 principles of animation demonstrated with practical examples.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/anim11/640/360',
    tags: ['principles', 'tutorial', 'fundamentals'],
    category: 'tutorial'
  },
  {
    title: 'Cartoon Character Walk Cycle',
    description: 'Step-by-step guide to creating a smooth cartoon walk cycle.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/anim12/640/360',
    tags: ['walk-cycle', 'cartoon', '2d'],
    category: 'tutorial'
  }
];

const sampleComments = [
  'This is amazing! Great work!',
  'Really helpful tutorial, thanks for sharing!',
  'Love the attention to detail in this animation.',
  'Can you do a tutorial on this technique?',
  'Incredible work! How long did this take?',
  'The lighting in this is perfect!',
  'This inspired me to start my own project!',
  'What software did you use for this?'
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      Video.deleteMany({}),
      Comment.deleteMany({}),
      Like.deleteMany({}),
      Bookmark.deleteMany({})
    ]);
    console.log('Existing data cleared');

    // Create sample users
    console.log('Creating sample users...');
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const users = await User.create([
      {
        username: 'alice_animator',
        email: 'alice@example.com',
        password: hashedPassword,
        bio: 'Professional 3D animator and motion graphics artist'
      },
      {
        username: 'bob_creative',
        email: 'bob@example.com',
        password: hashedPassword,
        bio: 'Freelance animator specializing in character animation'
      },
      {
        username: 'charlie_vfx',
        email: 'charlie@example.com',
        password: hashedPassword,
        bio: 'VFX artist and tutorial creator'
      },
      {
        username: 'diana_design',
        email: 'diana@example.com',
        password: hashedPassword,
        bio: 'Character designer and concept artist'
      },
      {
        username: 'evan_studio',
        email: 'evan@example.com',
        password: hashedPassword,
        bio: 'Independent animation studio owner'
      }
    ]);
    console.log(`Created ${users.length} users`);

    // Create sample videos
    console.log('Creating sample videos...');
    const videos = [];
    for (let i = 0; i < sampleVideos.length; i++) {
      const user = users[i % users.length];
      const video = await Video.create({
        ...sampleVideos[i],
        uploader: user._id,
        uploaderName: user.username,
        views: Math.floor(Math.random() * 5000) + 100,
        likes: Math.floor(Math.random() * 500) + 10
      });
      videos.push(video);
    }
    console.log(`Created ${videos.length} videos`);

    // Create sample comments
    console.log('Creating sample comments...');
    for (const video of videos) {
      const numComments = Math.floor(Math.random() * 5) + 1;
      for (let i = 0; i < numComments; i++) {
        const commenter = users[Math.floor(Math.random() * users.length)];
        await Comment.create({
          video: video._id,
          user: commenter._id,
          username: commenter.username,
          text: sampleComments[Math.floor(Math.random() * sampleComments.length)]
        });
      }
    }
    console.log('Created sample comments');

    // Create sample likes
    console.log('Creating sample likes...');
    for (const video of videos) {
      const numLikes = Math.floor(Math.random() * 3) + 1;
      const likers = users.slice(0, numLikes);
      for (const liker of likers) {
        await Like.create({
          video: video._id,
          user: liker._id
        });
      }
    }
    console.log('Created sample likes');

    // Create sample bookmarks
    console.log('Creating sample bookmarks...');
    for (let i = 0; i < users.length; i++) {
      const numBookmarks = Math.floor(Math.random() * 4) + 1;
      const bookmarkedVideos = videos.slice(i * 2, i * 2 + numBookmarks);
      for (const video of bookmarkedVideos) {
        await Bookmark.create({
          video: video._id,
          user: users[i]._id
        });
      }
    }
    console.log('Created sample bookmarks');

    console.log('\n✅ Database seeded successfully!');
    console.log('\nSample credentials:');
    console.log('Email: alice@example.com | Password: password123');
    console.log('Email: bob@example.com | Password: password123');
    console.log('Email: charlie@example.com | Password: password123');
    console.log('Email: diana@example.com | Password: password123');
    console.log('Email: evan@example.com | Password: password123');
    
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
