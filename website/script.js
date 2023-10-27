document.addEventListener("DOMContentLoaded", function() {
    const startChatButton = document.getElementById("start-chat-button");
    const nameInput = document.getElementById("name");

    // Function to start chat
    function startChat() {
        if (nameInput.value.trim() === "") {
            alert("Please fill the required field.");
        } else if(nameInput.value.trim() !== "Alohomora") {
            alert('Incorrect password!');
        } else {
            // Redirect to the chat page or perform other actions
            window.location.href = "https://info-genius-ai-karankr005.vercel.app";
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