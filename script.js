
// LOGO FADE
document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.logo');
    const fadeClass = 'fade-in';

    // Add fade-in class on page load
    logo.classList.add(fadeClass);

    // Fade in when scrolling to the top of the viewport
    window.addEventListener('scroll', function() {
        if (window.scrollY === 0) {
            logo.classList.add(fadeClass);
        } else {
            logo.classList.remove(fadeClass);
        }
    });
});

// LOGO FADE


// _____________COLOR CHANGE____________

// Get the color picker element
const colorPicker = document.getElementById('colorPicker');

// Function to update the main color variable
function updateMainColor(newColor) {
    document.documentElement.style.setProperty('--main-color', newColor);
    // Darken the color by 20% and update the variable
    const darkerColor = darkenColor(newColor, 20);
    document.documentElement.style.setProperty('--darker-color', darkerColor);
}

// Event listener for color picker change
colorPicker.addEventListener('input', function() {
    updateMainColor(colorPicker.value);
});

// Function to darken a color by a specified percentage
function darkenColor(color, percentage) {
    // Remove '#' if present
    color = color.replace('#', '');
    
    // Convert to RGB
    const r = parseInt(color.substring(0,2), 16);
    const g = parseInt(color.substring(2,4), 16);
    const b = parseInt(color.substring(4,6), 16);
    
    // Darken each RGB component by the specified percentage
    const newR = Math.round(r * (1 - percentage / 100));
    const newG = Math.round(g * (1 - percentage / 100));
    const newB = Math.round(b * (1 - percentage / 100));
    
    // Convert back to hex
    const newColor = `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
    
    return newColor;
}








// TYPE TEXT
const text = document.querySelector(".sec-text");

const textLoad = () => {
    setTimeout(() => {
        text.textContent = "From Israel.";
        setTimeout(() => {
            text.textContent = "Developer.";
            setTimeout(() => {
                text.textContent = "Trainer.";
                setTimeout(() => {
                    text.textContent = "Freelancer.";
                }, 4000); // Wait 4 seconds before displaying "Freelancer."
            }, 4000); // Wait 4 seconds before displaying "Trainer."
        }, 4000); // Wait 4 seconds before displaying "Developer."
    }, 0); // Display "From Israel." immediately
};

textLoad(); // Call the function initially

// Recursively call the textLoad function after 16 seconds (sum of individual delays)
setInterval(() => {
    textLoad();
}, 16000);



        // TYPE TEXT



        // -----------------ABOUT--------------

        const tablinks = document.getElementsByClassName("tab-links"),
        tabcontents = document.getElementsByClassName("tab-contents");
  
  function opentab(tabname) {
      for (tablink of tablinks) {
          tablink.classList.remove("active-link");
      }
      for (tabcontent of tabcontents) {
          tabcontent.classList.remove("active-tab");
      }
      event.currentTarget.classList.add("active-link");
      document.getElementById(tabname).classList.add("active-tab");
  }







//   -----------img Slide--------

window.addEventListener('scroll', function() {
    const aboutSection = document.getElementById('about');
    const image = document.querySelector('.about-col-1 img');

    // Get the top position of the about section relative to the viewport
    const aboutPosition = aboutSection.getBoundingClientRect().top;

    // Check if the top of the about section is in the viewport
    if (aboutPosition < window.innerHeight) {
        // Add the class to trigger the slide-in animation
        image.classList.add('slide-in');
    } else {
        // Remove the class if the about section is not in the viewport
        image.classList.remove('slide-in');
    }
});



// __________BTN RIPPLR__________
// Get all buttons with the class "btn"
const buttons = document.querySelectorAll(".btn");

// Iterate through each button and add the hover effect
buttons.forEach(button => {
    button.addEventListener("mouseover", (event) => {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
      
        button.style.setProperty("--xPos", x + "px");
        button.style.setProperty("--yPos", y + "px");
    });
});


// _____________SIDEMENU_______

const sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = "0";
}

function closemenu() {
    sidemenu.style.right = "-200px";
}


window.addEventListener("scroll", function() {
    // Check if the user has scrolled down at least 100 pixels from the top
    if (window.scrollY > 5) {
        closemenu();
    } else {
        closemenu();
    }
});


// --------------CONFETTI_______

document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    confetti();
});



// ==-------------CONTACT TO SHEETS--------------

const scriptURL = 'https://script.google.com/macros/s/AKfycbwxrr9gY3hHl86SuG0uv8nQa0NJHnmqFYqzCzrqM0w4wWDuE-B--j9r9iwch5FHZK6o/exec';

const form = document.getElementById('contactForm');

form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => {
        if (response.ok) {
            alert("Thank you! your form is submitted successfully.");
            window.location.reload();
        } else {
            throw new Error('Network response was not ok.');
        }
    })
    .catch(error => console.error('Error!', error.message));
});




