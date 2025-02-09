let filePaths = []; // To store the file paths

function openFileUploader() {
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
                handleFileUpload(file);
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

    // Upload the file to Flask
    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Add the file path returned by Flask to the filePaths array
            filePaths.push(data.path);
            console.log('File uploaded and path saved:', data.path);
        } else {
            console.error('File upload failed:', data.message);
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
    const uploadButton = document.getElementById('uploadButton');
    if (uploadButton) {
        console.log("Upload button found, attaching click event.");
        uploadButton.addEventListener('click', openFileUploader);
    }
    else {
        console.error("Upload button not found.");
    }
});


// let filePaths = []; //to store the images path 

// function openFileUploader() {
//     const fileInput = document.createElement('input');
//     fileInput.type = 'file';
//     fileInput.multiple = true;
//     fileInput.accept = 'image/*,video/*';
    
//     fileInput.addEventListener('change', function(event) {
//         const files = event.target.files;
        
//         for(let i = 0; i < files.length; i++) {
//             const file = files[i];
            
//             if(file.type.startsWith('image/') || file.type.startsWith('video/')) {
//                 handleFileUpload(file);
//             } else {
//                 console.warn('Selected file is not an image or video:', file.name);
//             }
//         }
//     });
    
//     fileInput.click();
// }

// function handleFileUpload(file) {
//     const formData = new FormData();
//     formData.append('media', file);
    
//     console.log('Processing file:', file.name);
//     console.log('File size:', file.size, 'bytes');
//     console.log('File type:', file.type);
// }

// // Add event listener when the DOM is fully loaded
// document.addEventListener('DOMContentLoaded', function() {
//     const uploadButton = document.getElementById('uploadButton');
//     if (uploadButton) {
//         uploadButton.addEventListener('click', openFileUploader);
//     }
// });

// function saveToDownloads(file) {
//     const url = URL.createObjectURL(file);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = file.name;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
// }

// function openFileUploader() {
//     const fileInput = document.createElement('input');
//     fileInput.type = 'file';
//     fileInput.multiple = true;
//     fileInput.accept = 'image/*,video/*';
    
//     fileInput.addEventListener('change', function(event) {
//         const files = event.target.files;
//         const imageContainer = document.getElementById('imageContainer'); // Container for images
        
//         for(let i = 0; i < files.length; i++) {
//             const file = files[i];
//             if(file.type.startsWith('image/')) {
//                 // Handle images
//                 displayImage(file, imageContainer);
//             } else if(file.type.startsWith('video/')) {
//                 // Handle videos
//                 displayVideo(file, imageContainer);
//             } else {
//                 console.warn('Selected file is not an image or video:', file.name);
//             }
//         }
//     });
    
//     fileInput.click();
// }

// function displayImage(file, container) {
//     // Create image element
//     const img = document.createElement('img');
//     img.style.maxWidth = '200px';               // Set maximum width
//     img.style.maxHeight = '200px';              // Set maximum height
//     img.style.margin = '10px';                  // Add some spacing
//     img.style.objectFit = 'cover';              // Maintain aspect ratio
    
//     // Create URL for the image
//     const url = URL.createObjectURL(file);
//     img.src = url;
    
//     // Clean up URL object when image loads
//     img.onload = () => {
//         URL.revokeObjectURL(url);
//     };
    
//     // Add to container
//     container.appendChild(img);
// }

// function displayVideo(file, container) {
//     // Create video element
//     const video = document.createElement('video');
//     video.style.maxWidth = '200px';
//     video.style.maxHeight = '200px';
//     video.style.margin = '10px';
//     video.controls = true;                      // Add video controls
    
//     // Create URL for the video
//     const url = URL.createObjectURL(file);
//     video.src = url;
    
//     // Clean up URL object when video loads
//     video.onload = () => {
//         URL.revokeObjectURL(url);
//     };
    
//     // Add to container
//     container.appendChild(video);
// }

// // Add event listener when the DOM is fully loaded
// document.addEventListener('DOMContentLoaded', function() {
//     const uploadButton = document.getElementById('uploadButton');
//     if (uploadButton) {
//         uploadButton.addEventListener('click', openFileUploader);
//     }
// });



// document.getElementById('uploadButton').addEventListener('click', openFileUploader);
