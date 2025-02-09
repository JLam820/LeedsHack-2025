document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the seed name
    const selectedSeedName = localStorage.getItem('selectedSeedName');
    
    // You can now use selectedSeedName as needed
    console.log('Selected seed name:', selectedSeedName);
    
    // Optional: Clear the storage after using it
    // localStorage.removeItem('selectedSeedName');
});