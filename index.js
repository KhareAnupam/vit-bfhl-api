// Import the express library
const express = require('express');
const app = express();

// Define the port the server will run on
const PORT = process.env.PORT || 3000;

// This is a middleware that parses incoming JSON requests
app.use(express.json());

// A simple GET route to check if the server is running
app.get('/', (req, res) => {
    res.send('API is running successfully!');
});


// Add this code inside index.js, before the app.listen() part

app.post('/bfhl', (req, res) => {
    try {
        // Get the 'data' array from the request body
        const { data } = req.body;

        // --- IMPORTANT: Replace these with your actual details ---
        const user_id = "anupam_khare_16032005"; // e.g., "john_doe_17091999"
        const email = "anupam@gmail.com";
        const roll_number = "22BCE3505";

        // Initialize arrays to hold the sorted data
        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;

        // Loop through each item in the input data array
        data.forEach(item => {
            // Check if the item is a number (by trying to convert it)
            if (!isNaN(item)) {
                const num = parseInt(item);
                sum += num;
                if (num % 2 === 0) {
                    even_numbers.push(item.toString());
                } else {
                    odd_numbers.push(item.toString());
                }
            } 
            // Check if the item is an alphabet (case-insensitive)
            else if (/^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item);
            }
            // If it's neither, it's a special character
            else {
                special_characters.push(item);
            }
        });
        
        // --- Logic for the alternating caps string ---
        // 1. Join all alphabets into one string: e.g., ["a", "y", "b"] -> "ayb"
        // 2. Split into characters, reverse, and join back: "bya"
        // 3. Apply alternating caps
        const fullAlphabetString = alphabets.join('');
        const reversedAlphabetString = fullAlphabetString.split('').reverse().join('');
        
    let concat_string = '';
    for (let i = 0; i < reversedAlphabetString.length; i++) {
        // Check if the index 'i' is even (0, 2, 4...)
        if (i % 2 === 0) { 
            // If index is even, make it UPPERCASE
            concat_string += reversedAlphabetString[i].toUpperCase();
        } else { 
            // If index is odd, make it lowercase
            concat_string += reversedAlphabetString[i].toLowerCase();
        }
    }


        // Construct the final response object
        const response = {
            is_success: true,
            user_id: user_id,
            email: email,
            roll_number: roll_number,
            odd_numbers: odd_numbers,
            even_numbers: even_numbers,
            alphabets: alphabets.map(a => a.toUpperCase()),
            special_characters: special_characters,
            sum: sum.toString(),
            concat_string: concat_string,
        };

        // Send a success response with the processed data
        return res.status(200).json(response);

    } catch (error) {
        // Handle any potential errors gracefully
        return res.status(500).json({ is_success: false, error: error.message });
    }
});





// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});