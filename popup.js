// popup.js

document.getElementById('askButton').addEventListener('click', async () => {
    const question = document.getElementById('question').value;
    const responseDiv = document.getElementById('response');

    try {
        const response = await fetch('http://localhost:3000/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question }),
        });

        const data = await response.json();
        
        if (response.ok) {
            if (data.choices && data.choices.length > 0) {
                responseDiv.textContent = data.choices[0].message.content; // Safely access the first choice
            } else {
                responseDiv.textContent = 'No response available';
                console.log(data);
            }
        } else {
            // Display a more detailed error message
            const errorMessage = data.error?.message || 'An unknown error occurred.';
            responseDiv.textContent = 'Error: ' + errorMessage;
        }
    } catch (error) {
        responseDiv.textContent = 'Error: ' + error.message;
    }
});
