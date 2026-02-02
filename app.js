// 1. Import required libraries
const express = require('express');
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');

const path = require('path');
require('dotenv').config();

// Import our database connection
const supabase = require('./config/supabase');

// 2. Create Express application
const app = express();
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

// 3. CREATE YOUR FIRST ROUTE - Show all users
app.get('/users', async (req, res) => {
    try {
        console.log('Fetching users from database...'); 
        const { data, error } = await supabase
            .from('users').select('*').order('id'); 
        if (error) throw error;
        console.log(`Found ${data.length} users`);
        res.json(data);
    } catch (error) {
        console.error('Error fetching users:', error);  
        res.status(500).send('Error loading users');
    }
});

// 4. Home page route
app.get('/', (req, res) => {
    res.send(`
        <h1>Welcome to My First Authentication Backend App!</h1>
        <p>Click here to see users: <a href="/users">View Users</a></p>
    `);
});

// 5. Start the server
const PORT = process.env.PORT || 3000;  
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 