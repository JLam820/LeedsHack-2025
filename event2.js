function goBack() {
    window.location.href = '../main.html';
    console.log('Back button clicked');
}

function addEvent() {
    window.location.href = 'entrypage.html';
    console.log('Add Event button clicked');
}

document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the seed name
    const selectedSeedName = localStorage.getItem('selectedSeedName');
    
    // You can now use selectedSeedName as needed
    
    // Optional: Clear the storage after using it
    // localStorage.removeItem('selectedSeedName');
});