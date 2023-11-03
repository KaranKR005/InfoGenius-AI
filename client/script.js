import bot from './assets/bot.svg';
import user from './assets/user.svg';


const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;
let lastRequestTime = 0; // Track the time of the last request

function loader(element) {
    element.textContent = '';

    loadInterval = setInterval(() => {
        // Update the text content of the loading indicator
        element.textContent += '.';

        // If the loading indicator has reached three dots, reset it
        if (element.textContent === '....') {
            element.textContent = '';
        }
    }, 300);
}



function typeText(element, text) {
    element.innerHTML = ''; // Clear the content before typing

    // Create a temporary element to parse HTML content
    const tempElement = document.createElement('div');
    tempElement.innerHTML = text;

    // Iterate through child nodes and append them to the message element with typing animation
    for (let i = 0; i < tempElement.childNodes.length; i++) {
        const node = tempElement.childNodes[i];
        if (node.nodeType === Node.ELEMENT_NODE) {
            // If it's an element node, append a clone of it with typing animation
            const clonedNode = node.cloneNode(true);
            clonedNode.style.display = 'none';
            element.appendChild(clonedNode);

            // Apply typing animation effect
            setTimeout(() => {
                clonedNode.style.display = 'inline';
            }, i * 20); // Adjust the typing speed (20 milliseconds per character)
        } else if (node.nodeType === Node.TEXT_NODE) {
            // If it's a text node, create a span element for each character to preserve spaces and apply typing animation
            for (let j = 0; j < node.nodeValue.length; j++) {
                const span = document.createElement('span');
                span.textContent = node.nodeValue[j];
                span.style.display = 'none';
                element.appendChild(span);

                // Apply typing animation effect
                setTimeout(() => {
                    span.style.display = 'inline';
                }, (i * node.nodeValue.length + j) * 20); // Adjust the typing speed (20 milliseconds per character)
            }
        }
    }
}



function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
}

function chatStripe(isAi, value, uniqueId) {
    return `
    <div class="wrapper ${isAi ? 'ai' : ''}">
      <div class="chat">
        <div class="profile">
          <img src=${isAi ? bot : user} alt="${isAi ? 'bot' : 'user'}" />
        </div>
        <div class="message" id=${uniqueId}>${value}</div>
      </div>
    </div>
  `;
}

const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(form);

    const prompt = data.get('prompt').trim(); // Trim any leading or trailing whitespace

    // Check if the message is empty, if so, do not submit
    if (!prompt) {
        alert('Please enter a message.');
        return;
    }

    const currentTime = Date.now();

    // Check if enough time has passed since the last request
    if (currentTime - lastRequestTime < 2000) {
        // If not enough time has passed (2 seconds in this case), prevent the request
        alert('Please wait a moment before sending another request.');
        return;
    }

    // Update the last request time
    lastRequestTime = currentTime;

    // User's chat stripe
    chatContainer.innerHTML += chatStripe(false, data.get('prompt'));

    // Clear the textarea input
    form.reset();

    // Bot's chat stripe
    const uniqueId = generateUniqueId();
    chatContainer.innerHTML += chatStripe(true, ' ', uniqueId);

    // Scroll to the bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // Specific message div
    const messageDiv = document.getElementById(uniqueId);

    // Show loading indicator
    loader(messageDiv);

    const live = 'https://infogenius-ai.onrender.com'
    const dev = 'http://localhost:5000'

    try {
        const response = await fetch(live, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: data.get('prompt'),
            }),
        });

        clearInterval(loadInterval);
        messageDiv.innerHTML = '';

        if (response.ok) {
            const responseData = await response.json();
            const parsedData = responseData.bot.trim(); // Trims any trailing spaces/'\n'

            typeText(messageDiv, parsedData);
        } else {
            const errorText = await response.text();

            messageDiv.innerHTML = 'Apologies, there are currently too many users connected. Please wait for a moment.';
            alert(errorText);
        }
    } catch (error) {
        clearInterval(loadInterval);
        messageDiv.innerHTML = 'Disconnected to Database';
        console.error(error);
    }
};
document.addEventListener('DOMContentLoaded', function () {
    const promptInput = document.getElementById('prompt');
    const sendButton = document.querySelector('form button img');

    document.getElementById('prompt').focus();

    form.addEventListener('submit', handleSubmit);
    form.addEventListener('keydown', (e) => {
        // Check if the Enter key is pressed and Shift key is not pressed
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevent the default behavior of Enter key only when Shift key is not pressed
            handleSubmit(e); // Call the submit function
        }
    });

//     // Add an input event listener to the prompt input
//     promptInput.addEventListener('input', function () {
//         // Check if there's any text in the input box
//         if (promptInput.value.trim().length > 0) {
//             // If there's text, set the send button image to send.svg
//            sendButton.src = '/assets/send.svg';
//        } else {
//             // If there's no text, set the send button image to unsend.svg
//             sendButton.src = '/assets/unsend.svg';
//        }
//    });
});