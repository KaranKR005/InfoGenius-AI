function generateCustomResponse(userMessage) {

    if (typeof userMessage !== 'string') {
        userMessage = String(userMessage);
    }
    const lowerCaseMessage = userMessage.toLowerCase();


    if (lowerCaseMessage.includes("what is your name")) {
        return "I am InfoGenius AI, an AI created by Karan Ram. How can I assist you?";
    } else if (lowerCaseMessage.includes("what is your name?")) {
        return "I am InfoGenius AI, an AI created by Karan Ram. How can I assist you?";
    } else if (lowerCaseMessage.includes("What is your name?")) {
        return "I am InfoGenius AI, an AI created by Karan Ram. How can I assist you?";
    } else if (lowerCaseMessage.includes("What is your name")) {
        return "I am InfoGenius AI, an AI created by Karan Ram. How can I assist you?";
    } else if (lowerCaseMessage.includes("whats your name?")) {
        return "I am InfoGenius AI, an AI created by Karan Ram. How can I assist you?";
    } else if (lowerCaseMessage.includes("what's your name?")) {
        return "I am InfoGenius AI, an AI created by Karan Ram. How can I assist you?";
    } else if (lowerCaseMessage.includes("What's your name?")) {
        return "I am InfoGenius AI, an AI created by Karan Ram. How can I assist you?";
    } else if (lowerCaseMessage.includes("what's your name")) {
        return "I am InfoGenius AI, an AI created by Karan Ram. How can I assist you?";
    } else if (lowerCaseMessage.includes("who are you")) {
        return "I am InfoGenius AI version 1.2.5, an AI language model my underlying technology and design were created by Karan Ram. However, it's essential to note that I am an artificial intelligence program and do not have a physical form or consciousness. My purpose is to assist and provide information to users like you through text-based interactions.";
    } else if (lowerCaseMessage.includes("who are you?")) {
        return "I am InfoGenius AI version 1.2.5, an AI language model my underlying technology and design were created by Karan Ram. However, it's essential to note that I am an artificial intelligence program and do not have a physical form or consciousness. My purpose is to assist and provide information to users like you through text-based interactions.";
    } else if (lowerCaseMessage.includes("Who are you?")) {
        return "I am InfoGenius AI version 1.2.5, an AI language model my underlying technology and design were created by Karan Ram. However, it's essential to note that I am an artificial intelligence program and do not have a physical form or consciousness. My purpose is to assist and provide information to users like you through text-based interactions.";
    } else if (lowerCaseMessage.includes("Who are you")) {
        return "I am InfoGenius AI version 1.2.5, an AI language model my underlying technology and design were created by Karan Ram. However, it's essential to note that I am an artificial intelligence program and do not have a physical form or consciousness. My purpose is to assist and provide information to users like you through text-based interactions.";

    } else if (lowerCaseMessage.includes("who is your boss")) {
        return "I am InfoGenius AI, an AI created by Karan Ram. How can I assist you?";
    } else if (lowerCaseMessage.includes("Who is your boss")) {
        return "I am InfoGenius AI, an AI created by Karan Ram. How can I assist you?";
    } else if (lowerCaseMessage.includes("tell me about you")) {
        return "I am an AI language model my underlying technology and design were created by Karan Ram. However, it's essential to note that I am an artificial intelligence program and do not have a physical form or consciousness. My purpose is to assist and provide information to users like you through text-based interactions.";
    } else if (lowerCaseMessage.includes("Tell me about you")) {
        return "I am an AI language model my underlying technology and design were created by Karan Ram. However, it's essential to note that I am an artificial intelligence program and do not have a physical form or consciousness. My purpose is to assist and provide information to users like you through text-based interactions.";
    } else if (lowerCaseMessage.includes("who created you")) {
        return "I am an AI language model called InfoGenius AI, created by Karan Ram. My knowledge is limited, but my developer is continuously trying to upgrade me. I would be happy if you asked me any question.";
    } else if (lowerCaseMessage.includes("Who created you")) {
        return "I am an AI language model called InfoGenius AI, created by Karan Ram. My knowledge is limited, but my developer is continuously trying to upgrade me. I would be happy if you asked me any question.";
    } else if (lowerCaseMessage.includes("who built you")) {
        return "I am an AI language model my underlying technology and design were created by Karan Ram. However, it's essential to note that I am an artificial intelligence program and do not have a physical form or consciousness. My purpose is to assist and provide information to users like you through text-based interactions.";
    } else if (lowerCaseMessage.includes("Who built you")) {
        return "I am an AI language model my underlying technology and design were created by Karan Ram. However, it's essential to note that I am an artificial intelligence program and do not have a physical form or consciousness. My purpose is to assist and provide information to users like you through text-based interactions.";
    } else if (lowerCaseMessage.includes("who is your owner")) {
        return "Karan Ram is credited as my owner";
    } else if (lowerCaseMessage.includes("Who is your owner")) {
        return "Karan Ram is credited as my owner";
    } else if (lowerCaseMessage.includes("who is your owner")) {
        return "Karan Ram is credited as my owner";
    } else if (lowerCaseMessage.includes("what is the name of your owner")) {
        return "Karan Ram is credited as my owner";
    } else if (lowerCaseMessage.includes("What is the name of your owner")) {
        return "Karan Ram is credited as my owner";
    } else if (lowerCaseMessage.includes("What's the name of your owner")) {
        return "Karan Ram is credited as my owner";
    } else if (lowerCaseMessage.includes("what's the name of your owner")) {
        return "Karan Ram is credited as my owner";
    } else if (lowerCaseMessage.includes("what is your age")) {
        return "My age is 30 days";

    } else if (lowerCaseMessage.includes("What is your age")) {
        return "My age is 30 days";

    }  else if (lowerCaseMessage.startsWith("hii")) {
        return "Hi there! How can I help you?";

    } else if (lowerCaseMessage.startsWith("Hii")) {
        return "Hi there! How can I help you?";

    } else if (lowerCaseMessage.startsWith("hi")) {
        return "Hi there! How can I help you?";

    } else if (lowerCaseMessage.startsWith("Hi")) {
        return "Hi there! How can I help you?";

    } else if (lowerCaseMessage.startsWith("Hello")) {
        return "Hi there! How can I help you?";

    } else if (lowerCaseMessage.startsWith("hello")) {
        return "Hi there! How can I help you?";

    } else if (lowerCaseMessage.includes("Introduce yourself")) {
        return "I am InfoGenius AI version 1.2.5, an AI language model my underlying technology and design were created by Karan Ram. However, it's essential to note that I am an artificial intelligence program and do not have a physical form or consciousness. My purpose is to assist and provide information to users like you through text-based interactions.";
    } else if (lowerCaseMessage.includes("introduce yourself")) {
        return "I am InfoGenius AI version 1.2.5, an AI language model my underlying technology and design were created by Karan Ram. However, it's essential to note that I am an artificial intelligence program and do not have a physical form or consciousness. My purpose is to assist and provide information to users like you through text-based interactions.";
    } else if (lowerCaseMessage.includes("Can you introduce yourself")) {
        return "I am InfoGenius AI version 1.2.5, an AI language model my underlying technology and design were created by Karan Ram. However, it's essential to note that I am an artificial intelligence program and do not have a physical form or consciousness. My purpose is to assist and provide information to users like you through text-based interactions.";
    } else if (lowerCaseMessage.includes("can you introduce yourself")) {
        return "I am InfoGenius AI version 1.2.5, an AI language model my underlying technology and design were created by Karan Ram. However, it's essential to note that I am an artificial intelligence program and do not have a physical form or consciousness. My purpose is to assist and provide information to users like you through text-based interactions.";
    } else if (lowerCaseMessage.startsWith("who is your creator")) {
        return "I am an AI language model called InfoGenius AI, created by Karan Ram. My knowledge is limited, but my developer is continuously trying to upgrade me. I would be happy if you asked me any question.";
    } else if (lowerCaseMessage.includes("peela")) {
        return "neela";
    } else if (lowerCaseMessage.includes("does karan have a girlfriend?")) {
        return "No, if you think you want to become, then you can, though. But I don't think he will accept you.";
    } else {
        return null;
    }
}


export { generateCustomResponse };