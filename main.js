let seedCount = 0;
const SEED_SPACING = 375; // Space between each tree

function plantNewSeed() {
    const MAX_SEEDS = 5; // Maximum number of seeds that can be planted
    
    if (seedCount >= MAX_SEEDS) {
        alert("You've reached the maximum number of seeds!");
        return;
    }
    const seedName = prompt("Enter a name for your seed:");
    
    if (seedName) {
        // Create a new tree container for this specific seed
        const container = document.getElementById('treeContainer');
        const seedContainer = document.createElement('div');
        seedContainer.className = 'seed';
        
        // Position the new seed
        seedContainer.style.position = 'fixed';
        seedContainer.style.bottom = '20px';
        seedContainer.style.left = `${20 + (seedCount * SEED_SPACING)}px`;

        // Create and add the tree image
        const treeImg = document.createElement('img');
        treeImg.src = 'img/Tree1.PNG';
        treeImg.alt = 'Tree';
        
        // Create and add the name label as a clickable link
        const nameLabel = document.createElement('div');
        nameLabel.className = 'seedName';
        nameLabel.textContent = seedName;
        
        // Add click event listener to the name label
        nameLabel.style.cursor = 'pointer'; // Changes cursor to pointer on hover
        nameLabel.addEventListener('click', () => {
            localStorage.setItem('selectedSeedName', seedName);
            window.location.href = 'templates/event2.html';
        });

        // Add elements to the seed container
        seedContainer.appendChild(treeImg);
        seedContainer.appendChild(nameLabel);
        
        // Add the seed container to the main container
        container.appendChild(seedContainer);
        
        seedCount++;
    }
}



function plantNewSeedHard(a, b) {

    const seedName = a;
    path = ["img/Tree1.PNG", "img/Tree2.PNG", "img/Tree3.PNG", "img/Tree4.PNG", "img/Tree5.PNG"]
    
    if (seedName) {
        // Create a new tree container for this specific seed
        const container = document.getElementById('treeContainer');
        const seedContainer = document.createElement('div');
        seedContainer.className = 'seed';
        
        // Position the new seed
        seedContainer.style.position = 'fixed';
        seedContainer.style.bottom = '20px';
        seedContainer.style.left = `${20 + (seedCount * SEED_SPACING)}px`;

        // Create and add the tree image
        const treeImg = document.createElement('img');
        treeImg.src = path[b];
        treeImg.alt = 'Tree';
        
        // Create and add the name label as a clickable link
        const nameLabel = document.createElement('div');
        nameLabel.className = 'seedName';
        nameLabel.textContent = seedName;
        
        // Add click event listener to the name label
        nameLabel.style.cursor = 'pointer'; // Changes cursor to pointer on hover
        nameLabel.addEventListener('click', () => {
            localStorage.setItem('selectedSeedName', seedName);
            window.location.href = 'templates/event2.html';
        });

        // Add elements to the seed container
        seedContainer.appendChild(treeImg);
        seedContainer.appendChild(nameLabel);
        
        // Add the seed container to the main container
        container.appendChild(seedContainer);

        seedCount++;
        
    }
}

window.onload = function() {
    plantNewSeedHard("Primary School", 0);
    plantNewSeedHard("Secondary School", 3);
    plantNewSeedHard("University", 4);
    plantNewSeedHard("Hackathon", 2);
};