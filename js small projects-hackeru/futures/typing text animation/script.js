const text = document.querySelector(".sec-text");
        const textLoad = () => {
            setTimeout(() => {
                text.textContent = "is a test.";
            }, 0);
            setTimeout(() => {
                text.textContent = "isnt a test.";
            }, 4000);
            setTimeout(() => {
                text.textContent = "is fun!";
            }, 8000); //1s = 1000 milliseconds
        }
        textLoad();
        setInterval(textLoad, 12000);