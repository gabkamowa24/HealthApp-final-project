/* eslint-disable no-console */
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Category = require('../models/Category');
const Topic = require('../models/Topic');
const { categories, topics } = require('../data/seedData');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('Clearing existing categories and topics...');
    await Category.deleteMany();
    await Topic.deleteMany();

    console.log(`Seeding ${categories.length} categories...`);
    const createdCategories = await Category.insertMany(categories);
    const categoryMap = createdCategories.reduce((acc, category) => {
      acc[category.name] = category._id;
      return acc;
    }, {});

    const topicsWithCategoryIds = topics.map((topic) => {
      const categoryId = categoryMap[topic.category];
      if (!categoryId) {
        throw new Error(`Category "${topic.category}" not found for topic "${topic.title}"`);
      }
      return {
        ...topic,
        category: categoryId,
      };
    });

    console.log(`Seeding ${topicsWithCategoryIds.length} topics...`);
    await Topic.insertMany(topicsWithCategoryIds);

    console.log('✅ Seed data inserted successfully.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
};

seedDatabase();

