document.addEventListener("DOMContentLoaded", function() {
    const startChatButton = document.getElementById("start-chat-button");
    const nameInput = document.getElementById("name");

    // Function to start chat
    async function startChat() {
        const name = nameInput.value.trim();
        if (name === "") {
            alert("Please fill the required field.");
        } else {
            try {
                // Send a POST request to your server with the user's name
                const response = await fetch("http://localhost:5000", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name: name }),
                });

                if (response.ok) {
                    // Redirect to the chat page or perform other actions
                    window.location.href = "https://info-genius-ai-karankr005.vercel.app";
                } else {
                    // Handle errors
                    console.error("Failed to start chat:", response.status, response.statusText);
                }
            } catch (error) {
                console.error("Error starting chat:", error);
            }
        }
    }


    // Handle Enter key press in the input field
    nameInput.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            // Trigger the click event of the Start Chat button
            startChatButton.click();
        }
    });

    startChatButton.addEventListener("click", startChat);
    
});
