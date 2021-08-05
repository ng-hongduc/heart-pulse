// load-images.js
document.addEventListener("DOMContentLoaded", () => {
    console.log("%c[Git-Project] 1. Initialization: HTML structure successfully loaded by browser.", "color: #007bff; font-weight: bold;");
    
    const spinContainer = document.getElementById("spin-container");
    
    // Check if the target image container exists in the HTML DOM
    if (!spinContainer) {
        console.error("[Git-Project] ERROR: <div id='spin-container'> not found in the HTML file!");
        return;
    }
    console.log("[Git-Project] Target #spin-container element located successfully.");

    console.log("[Git-Project] 2. Fetching links.txt file...");
    
    // Read content from the links.txt file
    fetch('./links.txt')
        .then(response => {
            // Check if the file exists or if it is blocked by CORS policy
            if (!response.ok) {
                throw new Error(`Failed to load links.txt (Status code: ${response.status})`);
            }
            return response.text();
        })
        .then(data => {
            console.log("[Git-Project] Successfully read links.txt. Parsing image URLs...");
            
            // Split text lines into a clean array of image URLs
            const links = data.split('\n')
                              .map(line => line.trim())
                              .filter(line => line !== "");
            
            console.log(`[Git-Project] Found ${links.length} image link(s) in the txt file:`, links);

            if (links.length === 0) {
                console.warn("[Git-Project] WARNING: links.txt file appears to be empty!");
            }

            // 3. Dynamically create and append <img> tags into spin-container
            links.forEach((src, index) => {
                const img = document.createElement("img");
                img.src = src;
                img.alt = `Project Image ${index + 1}`;
                spinContainer.appendChild(img);
                console.log(` -> Created <img> element for image #${index + 1}: ${src}`);
            });

            console.log(`%c[Git-Project] 3. Success: Injected ${links.length} images into the DOM.`, "color: #28a745; font-weight: bold;");

            // 4. Dispatch a custom event to notify app.js that images are ready
            console.log("[Git-Project] 4. Dispatching 'imagesLoaded' event to app.js...");
            const event = new Event('imagesLoaded');
            document.dispatchEvent(event);
        })
        .catch(err => {
            console.error("%c[Git-Project] SYSTEM ERROR:", "color: #dc3545; font-weight: bold;", err.message);
            console.error("[Troubleshooting] Are you opening the HTML file directly via double-click? Please run the project using VS Code Live Server or host it on GitHub Pages to avoid CORS security restrictions when fetching local text files.");
        });
});
