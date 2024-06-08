// GET DOM EL
const gameContainer = document.querySelector(".container"),
userResult = document.querySelector(".user_result img"),
cpuResult = document.querySelector(".cpu_result img"),
result = document.querySelector(".result"),
optionImages = document.querySelectorAll(".option_image");

// LOOP THROGH EACH OPTION
optionImages.forEach((image,index) => {
    image.addEventListener("click", (e) => {
        image.classList.add("active");

        cpuResult.src = cpuResult.src = "images/rock.png";
        result.textContent = "Wait..."

        // LOOP THROUGH EACH OPTION IMAGE AGAIN
        optionImages.forEach((image2, index2) => {
            // IF THE CURRENT INDEX DOSNT MATCH THE CLICKED INDEX
            // REMOVE THE "ACTIVE" CLASS FROM OTHER OPTIONS
            index !== index2 && image2.classList.remove("active");
        });
        gameContainer.classList.add("start");
        // SET  TIMEOUT
        let time = setTimeout(() =>{
            gameContainer.classList.remove("start");
             // GET THE SOURCE OF THE CLICKED OPTION IMAGE
             let imageSrc = e.target.querySelector("img").src;
             userResult.src = imageSrc
             console.log(imageSrc);
 
             // GENERATE A RANDOM NUM BET 0-2
             let randomNumber = Math.floor(Math.random() * 3);
             // CREATE ARRAY OF CPU IMAGES OPTIONS
 
             let cpuImages = ["images/rock.png" , "images/paper.png", "images/scissors.png"]
             // SET CPU IMAGE TO RANDOM ARRAY OPTION
             cpuResult.src = cpuImages[randomNumber];
 
             // ASSIGN LETTER VALUE TO THE CPU Option(R FOR ROCK)
             let cpuValue = ["R", "P", "S"] [randomNumber];
             // ASSIGN LETTER VALUE TO THE CLICKED OPTION (BASED ON INDEX)
             let userValue = ["R", "P", "S"] [index];
 
             // CREATE OBJECT WITH ALL POSSIBLE OUTCOMES
             let outcomes = {
                 RR: "Draw",
                 RP: "Cpu",
                 RS: "User",
                 PP: "Draw",
                 PR: "User",
                 PS: "Cpu",
                 SS: "Draw",
                 SR: "Cpu",
                 SP: "User"
             };
             // LOK UP THE OUTCOME VALUE BASED ON USER AND CPU OPTIONS
             let outComeValue = outcomes[userValue + cpuValue];
             // display the result
             result.textContent = userValue === cpuValue ? "Match Draw" : `${outComeValue} Won!!`;
        },2000)
        
           
    });
});

