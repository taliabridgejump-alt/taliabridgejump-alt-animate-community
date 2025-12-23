require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Video = require('./models/Video');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    await connectDB();

    // Check if Animation Bots user already exists
    let botUser = await User.findOne({ username: 'AnimationBots' });
    
    if (!botUser) {
      // Create Animation Bots user
      botUser = new User({
        username: 'AnimationBots',
        email: 'bots@animatecommunity.com',
        password: 'AnimationBots123!',
        isBot: true
      });
      await botUser.save();
      console.log('Animation Bots user created');
    } else {
      console.log('Animation Bots user already exists');
    }

    // Check if bot videos already exist
    const existingVideos = await Video.countDocuments({ userId: botUser._id });
    
    if (existingVideos === 0) {
      // Create sample videos
      const sampleVideos = [
        {
          title: 'How to Create Your First Animation',
          description: 'A beginner-friendly tutorial on creating your first animated video.',
          videoUrl: '/videos/tutorial-1.mp4',
          thumbnailUrl: '/thumbnails/tutorial-1.jpg',
          duration: 180,
          userId: botUser._id,
          username: botUser.username,
          views: 1250,
          likes: 89
        },
        {
          title: 'Product Advertisement - Sample',
          description: 'Sample product advertisement video created with our animation tools.',
          videoUrl: '/videos/ad-sample-1.mp4',
          thumbnailUrl: '/thumbnails/ad-sample-1.jpg',
          duration: 30,
          userId: botUser._id,
          username: botUser.username,
          views: 3420,
          likes: 156
        },
        {
          title: 'Character Animation Basics',
          description: 'Learn the basics of character animation and movement.',
          videoUrl: '/videos/tutorial-2.mp4',
          thumbnailUrl: '/thumbnails/tutorial-2.jpg',
          duration: 240,
          userId: botUser._id,
          username: botUser.username,
          views: 892,
          likes: 67
        },
        {
          title: 'Voice-Over Integration Tutorial',
          description: 'How to add voice-overs to your animations using VoiceForge.',
          videoUrl: '/videos/tutorial-3.mp4',
          thumbnailUrl: '/thumbnails/tutorial-3.jpg',
          duration: 300,
          userId: botUser._id,
          username: botUser.username,
          views: 1580,
          likes: 112
        },
        {
          title: 'Summer Sale Advertisement',
          description: 'Eye-catching summer sale advertisement example.',
          videoUrl: '/videos/ad-sample-2.mp4',
          thumbnailUrl: '/thumbnails/ad-sample-2.jpg',
          duration: 25,
          userId: botUser._id,
          username: botUser.username,
          views: 2100,
          likes: 98
        }
      ];

      await Video.insertMany(sampleVideos);
      console.log('Sample videos created');
    } else {
      console.log('Bot videos already exist');
    }

    console.log('Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
