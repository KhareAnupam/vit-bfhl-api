
const express = require('express');
const app = express();


const PORT = process.env.PORT || 3000;


app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running successfully!');
});



app.post('/bfhl', (req, res) => {
    try {
    
        const { data } = req.body;

    
        const user_id = "anupam_khare_16032005"; 
        const email = "anupam@gmail.com";
        const roll_number = "22BCE3505";

    
        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;

        data.forEach(item => {
        
            if (!isNaN(item)) {
                const num = parseInt(item);
                sum += num;
                if (num % 2 === 0) {
                    even_numbers.push(item.toString());
                } else {
                    odd_numbers.push(item.toString());
                }
            } 
            
            else if (/^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item);
            }

            else {
                special_characters.push(item);
            }
        });
        

        const fullAlphabetString = alphabets.join('');
        const reversedAlphabetString = fullAlphabetString.split('').reverse().join('');
        
    let concat_string = '';
    for (let i = 0; i < reversedAlphabetString.length; i++) {
        
        if (i % 2 === 0) { 
            
            concat_string += reversedAlphabetString[i].toUpperCase();
        } else { 
            
            concat_string += reversedAlphabetString[i].toLowerCase();
        }
    }


    
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

    
        return res.status(200).json(response);

    } catch (error) {
        
        return res.status(500).json({ is_success: false, error: error.message });
    }
});





app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

//checking