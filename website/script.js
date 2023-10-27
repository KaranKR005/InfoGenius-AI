document.addEventListener("DOMContentLoaded", function() {
    const usernameForm = document.getElementById("username-form");
    const usernameInput = document.getElementById("username");

    usernameForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const username = usernameInput.value.trim();
        if (username === "") {
            alert("Please enter your username.");
        } else {
            // Redirect to the chat page with the username as a query parameter
            window.location.href = `https://info-genius-ai-karankr005.vercel.app/chat?username=${username}`;
        }
    });
});
