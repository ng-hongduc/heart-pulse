// js/load-images.js
document.addEventListener("DOMContentLoaded", () => {
    console.log("%c[Git-Project] 1. Initialization: HTML structure successfully loaded.", "color: #007bff; font-weight: bold;");
    
    const spinContainer = document.getElementById("spin-container");
    if (!spinContainer) {
        console.error("[Git-Project] ERROR: <div id='spin-container'> not found in the HTML file!");
        return;
    }
    console.log("[Git-Project] Target #spin-container element located successfully.");

    
    const gistRawUrl = "https://gist.githubusercontent.com/ng-hongduc/1a03cb278384ebe3dc42994fd4e082a7/raw/c037f98fac2c13865cda0b209f3955a3401a41f5/links.json";

    const injectImages = (links) => {
        links.forEach((src, index) => {
            const img = document.createElement("img");
            img.src = src;
            img.alt = `Project Image ${index + 1}`;
            spinContainer.appendChild(img);
            console.log(` -> Created <img> element for image #${index + 1}: ${src}`);
        });
        
        console.log(`%c[Git-Project] 3. Success: Injected ${links.length} images into the DOM.`, "color: #28a745; font-weight: bold;");
        
        console.log("[Git-Project] 4. Dispatching 'imagesLoaded' event to app.js...");
        const event = new Event('imagesLoaded');
        document.dispatchEvent(event);
    };

    console.log("[Git-Project] 2. Fetching image configuration from GitHub Gist...");
    
    fetch(gistRawUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch from Gist (Status code: ${response.status})`);
            }
            return response.json(); 
        })
        .then(links => {
            console.log("[Git-Project] Successfully fetched and parsed JSON from Gist:", links);
            if (!Array.isArray(links) || links.length === 0) {
                console.warn("[Git-Project] WARNING: JSON format is empty! Falling back to local images.");
                injectImages(defaultImages);
            } else {
                injectImages(links);
            }
        })
        .catch(err => {
            console.warn(`%c[Git-Project] Gist fetch failed: ${err.message}. Switching to local backup images.`, "color: #ffc107;");
            injectImages(defaultImages);
        });
});
