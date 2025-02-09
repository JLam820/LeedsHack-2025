
function openFileUploader() {
    filePaths = [];
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.multiple = true;
    fileInput.accept = 'image/*,video/*'; // Accept images and videos

    console.log("File input created:", fileInput);

    fileInput.addEventListener('change', function(event) {
        const files = event.target.files;
        const imageContainer = document.getElementById('imageContainer'); // Container for images

        // Process each file selected by the user
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
                // Handle image or video files
                // handleFileUpload(file);
                displayMedia(file, imageContainer); // Display preview of the file
                
            } else {
                console.warn('Selected file is not an image or video:', file.name);
            }
        }
    });

    fileInput.click(); // Trigger file input click
}

// Function to upload the file to the Flask server
function handleFileUpload(file) {
    const formData = new FormData();
    formData.append('media', file);

    alert("filepath success");

    ///THE ISSUE IS HERE! 

    // Upload the file to Flask
    fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Add the file path returned by Flask to the filePaths array
            filePaths.push(data.path);

            console.log('File uploaded and path saved:', data.path);
            alert("filepath success 1");

        } else {
            console.error('File upload failed:', data.message);
            alert("filepath fail1");

        }
    })
    .catch(error => {
        console.error('Error during file upload:', error);
    });
}

// Function to display media (image/video) previews
function displayMedia(file, container) {
    let mediaElement;
    const url = URL.createObjectURL(file);

    if (file.type.startsWith('image/')) {
        mediaElement = document.createElement('img');
        mediaElement.src = url;
        mediaElement.style.maxWidth = '200px';
        mediaElement.style.maxHeight = '200px';
        mediaElement.style.margin = '10px';
    } else if (file.type.startsWith('video/')) {
        mediaElement = document.createElement('video');
        mediaElement.src = url;
        mediaElement.controls = true;
        mediaElement.style.maxWidth = '200px';
        mediaElement.style.maxHeight = '200px';
        mediaElement.style.margin = '10px';
    }

    mediaElement.onload = () => URL.revokeObjectURL(url);
    container.appendChild(mediaElement);
}

// Event listener to trigger file upload when the page loads
document.addEventListener('DOMContentLoaded', function() {
    alert("addEventListener")
    const uploadButton = document.getElementById('uploadButton');
    if (uploadButton) {
        console.log("Upload button found, attaching click event.");
        uploadButton.addEventListener('click', openFileUploader);
    }
    else {
        console.error("Upload button not found.");
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the seed name
    const selectedSeedName = localStorage.getItem('selectedSeedName');
    alert(selectedSeedName);
    
    // You can now use selectedSeedName as needed
    console.log('Selected seed name:', selectedSeedName);
    
    // Optional: Clear the storage after using it
    // localStorage.removeItem('selectedSeedName');
});