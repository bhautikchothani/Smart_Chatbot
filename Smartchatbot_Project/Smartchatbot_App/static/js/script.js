    // document.getElementById("message").addEventListener("keypress", async function(event) {
    //     if (event.key === "Enter") {
    //         event.preventDefault(); // Prevent the default form submission
    //         const formData = new FormData(document.getElementById("messageForm"));
    //         const response = await fetch("/chat/completions/", {
    //             method: "POST",
    //             body: formData
    //         });
    //         console.log("Response:", response); // Log the response object
    //         const data = await response.json();
    //         console.log("Response Data:", data);
    //         if (response.ok) {
    //             document.getElementById("completion").innerText = data.completion;
    //         } else {
    //             document.getElementById("completion").innerText = data.error || "An error occurred.";
    //         }
    //     }
    // });


    document.getElementById("messageForm").addEventListener("submit", async function(event) {
        event.preventDefault(); // Prevent the default form submission
        const formData = new FormData(this);
        const response = await fetch("/chat/completions/", {
            method: "POST",
            body: formData
        });
        console.log("Response:", response); // Log the response object
        const data = await response.json();
        console.log("Response Data:", data);
        if (response.ok) {
            addMessage("user", formData.get("message")); // Display user query
            addMessage("bot", data.completion); // Display bot answer
        } else {
            addMessage("error", data.error || "Try Again.");
        }
        this.reset(); // Clear the form input
    });

    function addMessage(sender, message) {
        const conversation = document.getElementById("completion");
        const messageDiv = document.createElement("div");
        messageDiv.textContent = message;
        messageDiv.classList.add(sender === "user" ? "user-query" : "bot-answer");
        conversation.appendChild(messageDiv);
        conversation.scrollTop = conversation.scrollHeight; // Auto-scroll to bottom
    }
/////// History Session /////// 

    // Clear history button functionality
document.getElementById("clearHistoryButton").addEventListener("click", function() {
    document.getElementById("historyContent").innerHTML = ""; // Clear history content
});

// Function to add message to history panel
function addHistoryMessage(sender, message) {
    const historyContent = document.getElementById("historyContent");
    const messageDiv = document.createElement("div");
    messageDiv.textContent = message;
    messageDiv.classList.add(sender === "user" ? "user-query" : "bot-answer");
    historyContent.appendChild(messageDiv);
    historyContent.scrollTop = historyContent.scrollHeight; // Auto-scroll to bottom
}
