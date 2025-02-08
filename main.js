function plantNewSeed() {
    const seedName = prompt("Enter a name for your seed:");
    
    if (seedName !== null && seedName.trim() !== "") {
        // You can add more logic here to handle the seed name
        console.log("New seed planted:", seedName);
        // Add additional functionality as needed
    } else {
        alert("Please enter a valid name for your seed.");
    }
}
