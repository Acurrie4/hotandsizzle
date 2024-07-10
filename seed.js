const mongoose = require('mongoose');
const User = require('./models/User');
const Recipe = require('./models/Recipe');
const seedUsers = require('./seedUsers');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/recipeapp')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

const seedRecipes = [
    {
        name: 'Chocolate Cake',
        description: 'Delicious and rich chocolate cake',
        ingredients: 'Flour, Sugar, Cocoa Powder, Baking Powder, Salt, Eggs, Milk, Vegetable Oil, Vanilla Extract',
        directions: 'Preheat oven to 350°F. Grease and flour two 9-inch round baking pans. Mix dry ingredients together. Add wet ingredients and mix until smooth. Pour batter into pans and bake for 30-35 minutes.',
        userName: 'chefjohn'
      },
      {
        name: 'Apple Pie',
        description: 'Classic apple pie with a flaky crust',
        ingredients: 'Flour, Sugar, Salt, Butter, Apples, Cinnamon, Nutmeg, Lemon Juice',
        directions: 'Preheat oven to 425°F. Prepare crust and filling. Roll out crust and place in pie dish. Add filling and top with second crust. Bake for 45-50 minutes.',
        userName: 'bakerbeth'
      },
      {
        name: 'Spaghetti Carbonara',
        description: 'A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.',
        ingredients: 'Spaghetti, eggs, Parmesan cheese, pancetta, black pepper',
        directions: 'Boil spaghetti. Fry pancetta. Mix eggs and cheese. Combine all with pasta.',
        userName: 'alex_wilson' 
      },
      {
        name: 'Chicken Curry',
        description: 'A spicy and flavorful Indian curry made with chicken, tomatoes, and a blend of spices.',
        ingredients: 'Chicken, tomatoes, onions, garlic, ginger, garam masala, cumin, coriander, turmeric',
        directions: 'Cook onions, garlic, and ginger. Add spices and chicken. Add tomatoes and simmer.',
        userName: 'sara_jones'
      },
      {
        name: 'Chocolate Chip Cookies',
        description: 'Classic cookies loaded with chocolate chips.',
        ingredients: 'Butter, sugar, brown sugar, eggs, vanilla extract, flour, baking soda, salt, chocolate chips',
        directions: 'Cream butter and sugars. Add eggs and vanilla. Mix dry ingredients. Combine and add chocolate chips. Bake.',
        userName: "johnDoe" 
      }
    ];

const seedDB = async () => {
  await User.deleteMany({});
  await Recipe.deleteMany({});

  const users = await User.insertMany(seedUsers);
  const userMap = users.reduce((map, user) => {
    map[user.userName] = user._id;
    return map;
  }, {});

  const recipesWithUserIds = seedRecipes.map(recipe => ({
    ...recipe,
    userId: userMap[recipe.userName]
  }));

  await Recipe.insertMany(recipesWithUserIds);

  console.log('Database seeded!');
  mongoose.connection.close();
};

seedDB().catch(err => {
  console.error('Error seeding database:', err);
  mongoose.connection.close();
});