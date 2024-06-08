
const canvas = document.querySelector('canvas');
const scoreEl = document.querySelector('#scoreEl');
const c = canvas.getContext('2d');


canvas.width = innerWidth
canvas.height = innerHeight




class boundary {
    static width = 40
    static height = 40
    constructor({ position, image }) {
        this.position = position
        this.width = 40
        this.height = 40
        this.image = image
    }
    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y,
             this.width, this.height)

        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

class player {
    constructor({
        position,
        velocity
    }) {
        this.position = position
        this.velocity = velocity
        this.redius = 15
        this.redians = 0.75
        this.openRate = 0.10
        this.rotation = 0
    }
    draw() {
        c.save()
        c.translate(this.position.x, this.position.y)
        c.rotate(this.rotation)
        c.translate(-this.position.x, -this.position.y)
        c.beginPath()
        c.arc(this.position.x,
             this.position.y,
              this.redius,
              this.redians,
               Math.PI * 2 - this.redians)
        c.lineTo(this.position.x, this.position.y)
        c.fillStyle = 'yellow'
        c.fill()
        c.closePath()
        c.restore()
    }   
update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.redians < 0 || this.redians > .75) this.openRate = -this.openRate

    this.redians += this.openRate
  }
}


class Ghost {
    static speed = 2
    constructor({
        position,
        velocity,
        color = 'red'
    }) {
        this.position = position
        this.velocity = velocity
        this.redius = 15
        this.color = color
        this.prevCollisions = []
        this.speed = 2
        this.scared = false
    }
    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.redius, 0, Math.PI * 2)
        c.fillStyle = this.scared ? 'blue' : this.color
        c.fill()
        c.closePath()
    }   
update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}

class Pellet {
    constructor({
        position
    }) {
        this.position = position
        this.redius = 3
    }
    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.redius, 0, Math.PI * 2)
        c.fillStyle = 'white'
        c.fill()
        c.closePath()
    }   
}


class PowerUp {
    constructor({
        position
    }) {
        this.position = position
        this.redius = 8
    }
    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.redius, 0, Math.PI * 2)
        c.fillStyle = 'white'
        c.fill()
        c.closePath()
    }   
}

const Pellets = []
const boundaries = []
const powerUps = []
const ghosts = [
    new Ghost({
        position : {
            x: boundary.width * 6 + boundary.width /2,
            y: boundary.height + boundary.height /2
        },
        velocity: {
            x: Ghost.speed,
            y: 0 
        }
    }),
    new Ghost({
        position : {
            x: boundary.width * 6 + boundary.width /2,
            y: boundary.height * 3 + boundary.height /2
        },
        velocity: {
            x: Ghost.speed,
            y: 0 
        }, 
        color: 'pink'
    }),
    new Ghost({
        position : {
            x: boundary.width * 3 + boundary.width /2,
            y: boundary.height + boundary.height /2
        },
        velocity: {
            x: Ghost.speed,
            y: 0 
        }, 
        color: 'navy'
    }),
]

const Player = new player({
    position: {
        x: boundary.width + boundary.width /2,
        y: boundary.height + boundary.height /2
    },
    velocity: {
        x: 0,
        y: 0
    }
});
const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

let lastKey = ''
let score = 0

// const map = generateRandomMatrix(11, 11)
const map =[
    ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
    ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3']
  ]

function createImage(src){
const image = new Image()
image.src = src
return image
}

map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        switch (symbol) {
            case '-':
                boundaries.push(new boundary ({
                    position: {
                        x: boundary.width * j,
                        y: boundary.height * i
                    },
                    image: createImage('./img/pipeHorizontal.png')
                }));
                break;
            case '|':
                boundaries.push(new boundary ({
                    position: {
                        x: boundary.width * j,
                        y: boundary.height * i
                    },
                    image: createImage('./img/pipeVertical.png')
                }));
                break;
            case '1':
                boundaries.push(new boundary ({
                    position: {
                        x: boundary.width * j,
                        y: boundary.height * i
                    },
                    image: createImage('./img/pipeCorner1.png')
                }));
                break;
            case '2':
                boundaries.push(new boundary ({
                    position: {
                        x: boundary.width * j,
                        y: boundary.height * i
                    },
                    image: createImage('./img/pipeCorner2.png')
                }));
                break;
            case '3':
                boundaries.push(new boundary ({
                    position: {
                        x: boundary.width * j,
                        y: boundary.height * i
                    },
                    image: createImage('./img/pipeCorner3.png')
                }));
                break;
            case '4':
                boundaries.push(new boundary ({
                    position: {
                        x: boundary.width * j,
                        y: boundary.height * i
                    },
                    image: createImage('./img/pipeCorner4.png')
                }));
                break;
            case 'b':
                boundaries.push(new boundary ({
                    position: {
                        x: boundary.width * j,
                        y: boundary.height * i
                    },
                    image: createImage('./img/block.png')
                }));
                break;
                case '[':
        boundaries.push(
          new boundary({
            position: {
              x: j * boundary.width,
              y: i * boundary.height
            },
            image: createImage('./img/capLeft.png')
          })
        )
        break
        case ']':
        boundaries.push(
          new boundary({
            position: {
              x: j * boundary.width,
              y: i * boundary.height
            },
            image: createImage('./img/capRight.png')
          })
        )
        break
        case '_':
        boundaries.push(
          new boundary({
            position: {
              x: j * boundary.width,
              y: i * boundary.height
            },
            image: createImage('./img/capBottom.png')
          })
        )
        break
        case '^':
        boundaries.push(
          new boundary({
            position: {
              x: j * boundary.width,
              y: i * boundary.height
            },
            image: createImage('./img/capTop.png')
          })
        )
        break
        case '+':
        boundaries.push(
          new boundary({
            position: {
              x: j * boundary.width,
              y: i * boundary.height
            },
            image: createImage('./img/pipeCross.png')
          })
        )
        break
        case '5':
        boundaries.push(
          new boundary({
            position: {
              x: j * boundary.width,
              y: i * boundary.height
            },
            color: 'blue',
            image: createImage('./img/pipeConnectorTop.png')
          })
        )
        break
        case '6':
            boundaries.push(
              new boundary({
                position: {
                  x: j * boundary.width,
                  y: i * boundary.height
                },
                color: 'blue',
                image: createImage('./img/pipeConnectorRight.png')
              })
            )
            break
            case '7':
                boundaries.push(
                  new boundary({
                    position: {
                      x: j * boundary.width,
                      y: i * boundary.height
                    },
                    color: 'blue',
                    image: createImage('./img/pipeConnectorBottom.png')
                  })
                )
                break
                case '8':
        boundaries.push(
          new boundary({
            position: {
              x: j * boundary.width,
              y: i * boundary.height
            },
            image: createImage('./img/pipeConnectorLeft.png')
          })
        )
        break
                case '.':
        Pellets.push(
          new Pellet({
            position: {
              x: j * boundary.width + boundary.width /2,
              y: i * boundary.height + boundary.height/2
            },
          })
        )
        break
                case 'p':
        powerUps.push(
          new PowerUp({
            position: {
              x: j * boundary.width + boundary.width /2,
              y: i * boundary.height + boundary.height/2
            },
          })
        )
        break
        
        }
    });
});

function  circleCollidesWithRectangle({
    circle,
    rectangle
}) {
    const padding = boundary.width / 2 - circle.redius - 1
    return ( 
        circle.position.y - circle.redius + circle.velocity.y 
        <=
        rectangle.position.y + rectangle.height + padding &&
         circle.position.x + circle.redius + circle.velocity.x 
    >=
    rectangle.position.x - padding &&
     circle.position.y + circle.redius + circle.velocity.y 
    >=
    rectangle.position.y -padding &&
     circle.position.x - circle.redius + circle.velocity.x 
    <=
    rectangle.position.x + rectangle.width + padding
    )
}

let animationId
function animate() {
    animationId = requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    if (keys.w.pressed && lastKey === 'w') {
        for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]
        if ( circleCollidesWithRectangle({
            circle: {...Player , velocity: {
                x: 0,
                y: -5
            }},
            rectangle: boundary
        })
        )  {
            Player.velocity.y = 0
            break
        } else {
            Player.velocity.y = -5
        }
      }  
    } else if (keys.a.pressed && lastKey === 'a') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if ( circleCollidesWithRectangle({
                circle: {...Player , velocity: {
                    x: -5,
                    y: 0
                }},
                rectangle: boundary
            })
            )  {
                Player.velocity.x = 0
                break
            } else {
                Player.velocity.x = -5
            }
          }
    } else if (keys.s.pressed && lastKey === 's') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if ( circleCollidesWithRectangle({
                circle: {...Player , velocity: {
                    x: 0,
                    y: 5
                }},
                rectangle: boundary
            })
            )  {
                Player.velocity.y = 0
                break
            } else {
                Player.velocity.y = 5
            }
          }  
    } else if (keys.d.pressed && lastKey === 'd') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if ( circleCollidesWithRectangle({
                circle: {...Player , velocity: {
                    x: 5,
                    y: 0
                }},
                rectangle: boundary
            })
            )  {
                Player.velocity.x = 0
                break
            } else {
                Player.velocity.x = 5
            }
          }
    }

//detrect collision ghost and player
for (let i = ghosts.length - 1; 0 <= i; i--){
    const ghost = ghosts[i]
if (Math.hypot(
    ghost.position.x - Player.position.x,
    ghost.position.y - Player.position.y
) < ghost.redius + Player.redius) {

    if(ghost.scared) {
        ghosts.splice(i, 1)
    } else {

    
    cancelAnimationFrame(animationId)
    console.log('you lose')
}
}
}


//win condition

if (Pellets.length === 1) {
    console.log('you win!');
    cancelAnimationFrame(animationId);
}



//powe up go
    for (let i = powerUps.length - 1; 0 <= i; i--){
        const powerUp = powerUps[i]
        powerUp.draw()


        // player collides with power up
        if (Math.hypot(
            powerUp.position.x - Player.position.x,
            powerUp.position.y - Player.position.y
        ) < powerUp.redius + Player.redius) {
            powerUps.splice(i, 1)

            // make ghosts sceared
            ghosts.forEach(ghost => {
                ghost.scared = true
                
                setTimeout(() => {
                    ghost.scared = false;
                }, 5000);
                
            })
        }
    }


    //TOUCH
    for (let i = Pellets.length - 1; 0 < i; i--){
        const pellet = Pellets[i]

        pellet.draw();
    
        if (Math.hypot(
            pellet.position.x - Player.position.x,
            pellet.position.y - Player.position.y
        ) < pellet.redius + Player.redius) {
            Pellets.splice(i, 1)
            score += 10

        }
    
    }
    
     
    

    boundaries.forEach((boundary) => {
        boundary.draw()

        if (
            circleCollidesWithRectangle({
                circle: Player,
                rectangle: boundary
            })) {
        
            Player.velocity.x = 0
            Player.velocity.y = 0
        }
    })

    Player.update()

    ghosts.forEach(ghost => {
        ghost.update()

       

        const collisions = []
        boundaries.forEach(boundary => {
            if ( 
                !collisions.includes('right') && 
                circleCollidesWithRectangle({
                circle: {...ghost , velocity: {
                    x: ghost.speed,
                    y: 0
                }},
                rectangle: boundary
            })
            ) {
                collisions.push('right')
            }
            if (
                !collisions.includes('left') && 
                circleCollidesWithRectangle({
                circle: {...ghost , velocity: {
                    x: -ghost.speed,
                    y: 0
                }},
                rectangle: boundary
            })
            ) {
                collisions.push('left')
            }
            if ( 
                !collisions.includes('up') && 
                circleCollidesWithRectangle({
                circle: {...ghost , velocity: {
                    x: 0,
                    y: -ghost.speed
                }},
                rectangle: boundary
            })
            ) {
                collisions.push('up')
            }
            if ( 
                !collisions.includes('down') && 
                circleCollidesWithRectangle({
                circle: {...ghost , velocity: {
                    x: 0,
                    y: ghost.speed
                }},
                rectangle: boundary
            })
            ) {
                collisions.push('down')
            }
        })
        if (collisions.length > ghost.prevCollisions.length)
        ghost.prevCollisions = collisions

        if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)) {
            //console.log('googoo')

            
            if (ghost.velocity.x > 0) ghost.prevCollisions.push(
                'right'
            )
           else if (ghost.velocity.x < 0) ghost.prevCollisions.push(
                'left'
            )
           else if (ghost.velocity.y < 0) ghost.prevCollisions.push(
                'up'
            )
           else if (ghost.velocity.y > 0) ghost.prevCollisions.push(
                'down'
            )

            
            // console.log(ghost.prevCollisions)

            const pathway = ghost.prevCollisions.filter((collision) => {
                return !collisions.includes(collision)
            })
            // console.log(collisions)

            const direction = pathway[Math.floor(Math.random() * pathway.length)]
            // console.log({ direction })
            switch (direction) {

                case 'down': 
                ghost.velocity.y = ghost.speed
                ghost.velocity.x = 0
                break

                case 'up': 
                ghost.velocity.y = -ghost.speed
                ghost.velocity.x = 0
                break

                case 'right': 
                ghost.velocity.y = 0
                ghost.velocity.x = ghost.speed
                break

                case 'left': 
                ghost.velocity.y = 0
                ghost.velocity.x = -ghost.speed
                break
                
            }
            ghost.prevCollisions = []
        }
        
    })
    if (Player.velocity.x > 0) Player.rotation = 0;
else if (Player.velocity.x < 0) Player.rotation = Math.PI;
else if (Player.velocity.y > 0) Player.rotation = Math.PI / 2;
else if (Player.velocity.y < 0) Player.rotation = Math.PI * 1.5;

}//end of animate

// Define a function to start the game
animate();


addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
        break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
        break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
        break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
        break
    }
  
})

addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'w':
            keys.w.pressed = false
        break
        case 'a':
            keys.a.pressed = false
        break
        case 's':
            keys.s.pressed = false
        break
        case 'd':
            keys.d.pressed = false
        break
    }

});

