;
(function() {
    "use strict";

    function Block() {

        var that = this;

        this.htmlElement = document.createElement('div');

        this.x = 0;
        this.y = 0;

        this.type;

        this.init = function(type, tileSheetX, tileSheetY) {
            that.htmlElement.className = 'block block' + type;
            that.x = tileSheetX * 50;
            that.y = tileSheetY * 50;
            that.htmlElement.style.left = that.x + 'px';
            that.htmlElement.style.top = that.y + 'px';

            that.type = type;
        };
        
        this.kill = function(){
        	that.htmlElement.remove();
        }
    };

    function Bomb() {
        var that = this;

        this.htmlElement = document.createElement('div');

        this.x = 0;
        this.y = 0;
        this.bombActive = false;

        this.init = function(x, y) {
            that.x = x;
            that.y = y;
            that.htmlElement.className = 'bomb';
            that.htmlElement.style.left = that.x + 'px';
            that.htmlElement.style.top = that.y + 'px';
        };
    };

    function BomberMan() {

        var that = this;

        this.htmlElement = document.createElement('div');

        this.x = 50;
        this.y = 50;
        this.velocityX = 0;
        this.velocityY = 0;

        this.init = function() {
            that.htmlElement.className = 'bomberman';
            that.htmlElement.style.left = that.x + 'px';
            that.htmlElement.style.top = that.y + 'px';
        };

        this.updatePosition = function() {
            if (that.x < 50) {
                that.velocityX = 0;
                that.x = 50;
            }
            if (that.x > 450) {
                that.velocityX = 0;
                that.x = 450;
            }
            if (that.y < 50) {
                that.velocityY = 0;
                that.y = 50;
            }
            if (that.y > 450) {
                that.velocityY = 0;
                that.y = 450;
            }
            that.x += that.velocityX;
            that.y += that.velocityY;
            // console.log(that.x);
            that.htmlElement.style.left = that.x + 'px';
            that.htmlElement.style.top = that.y + 'px';
        };

    };
	function Explosion(){
		var that = this;

        this.htmlElement = document.createElement('div');

        this.x;
        this.y;
        
        this.init = function(x,y) {
        	that.x=x;
        	that.y=y;
        	that.htmlElement.className = "explosion";	
            that.htmlElement.style.left = that.x + 'px';
            that.htmlElement.style.top = that.y + 'px';
            animateTileSprite(that.htmlElement,31,15);
        };
        this.clearExplosion = function(){
        	setTimeout(clearAll,500);
        };
        
        var clearAll = function(){
        	that.htmlElement.remove();
        }
	}
	
    function Enemy(x, y) {
        var that = this;

        this.htmlElement = document.createElement('div');

        this.x = x;
        this.y = y;
        this.velocityX = 0;
        this.velocityY = 0;

        this.pathStart;
        this.pathEnd;

        this.path = [];
        var path;
        this.pathCounter = 0;
        this.canMoveReverse = false;

        this.init = function(type, pathStart, pathEnd) {
            that.pathStart = pathStart;
            that.pathEnd = pathEnd;
            that.htmlElement.className = 'gunda' + type;
            that.htmlElement.style.left = that.x + 'px';
            that.htmlElement.style.top = that.y + 'px';
            animateTileSprite(that.htmlElement,1,200);
        } 
        that.kill = function() {
        	that.htmlElement.remove();
        }

        this.updatePosition = function(path) {

            var cord = [];
            var nextTargetX = 0;
            var nextTargetY = 0;

            // if (that.pathCounter < path.length) {
            if (that.canMoveReverse === false) {

                cord = path[that.pathCounter];
                nextTargetX = cord[0] * 50;
                nextTargetY = cord[1] * 50;
                // delaythis(that.pathCounter);

                if (that.pathCounter > 0) {
                    var prevCord = path[that.pathCounter - 1];
                    var prevCordX = prevCord[0] * 50;
                    var prevCordY = prevCord[1] * 50;
                    //check if x has changed

                    if (nextTargetX === prevCordX) {
                        //change Y							
                        if (nextTargetY > prevCordY) {
                            that.y += 5;
                        } else if (nextTargetY < prevCordY) {
                            that.y -= 5;
                        }
                        if (that.y === nextTargetY) {
                            that.pathCounter++;
                        }

                    } else if (nextTargetY === prevCordY) {
                        //change X
                        if (nextTargetX > prevCordX) {
                            that.x += 5;
                        } else if (nextTargetX < prevCordX) {
                            that.x -= 5;
                        }

                        if (that.x === nextTargetX) {
                            that.pathCounter++;
                        }
                    }
                } else {
                    that.pathCounter++;
                }

                if (that.pathCounter >= path.length) {
                    that.canMoveReverse = true;
                    that.pathCounter = path.length - 1;
                }

            } else {

                cord = path[that.pathCounter];
                nextTargetX = cord[0] * 50;
                nextTargetY = cord[1] * 50;
                // delaythis(that.pathCounter);

                if (that.pathCounter < path.length - 1) {
                    var prevCord = path[that.pathCounter + 1];
                    var prevCordX = prevCord[0] * 50;
                    var prevCordY = prevCord[1] * 50;
                    //check if x has changed

                    if (nextTargetX === prevCordX) {
                        //change Y							
                        if (nextTargetY > prevCordY) {
                            that.y += 5;
                        } else if (nextTargetY < prevCordY) {
                            that.y -= 5;
                        }
                        if (that.y === nextTargetY) {
                            that.pathCounter--;
                        }

                    } else if (nextTargetY === prevCordY) {
                        //change X
                        if (nextTargetX > prevCordX) {
                            that.x += 5;
                        } else if (nextTargetX < prevCordX) {
                            that.x -= 5;
                        }

                        if (that.x === nextTargetX) {
                            that.pathCounter--;
                        }
                    }
                } else {
                    that.pathCounter--;
                }

                if (that.pathCounter < 0) {
                    that.canMoveReverse = false;
                    that.pathCounter = 0;
                }
            }

            that.htmlElement.style.left = that.x + 'px';
            that.htmlElement.style.top = that.y + 'px';
        };

    };

    // world is a 2d array of integers (eg world[10][15] = 0)
    // pathStart and pathEnd are arrays like [5,10]
    function EnemyAIPathHandler(world, pathStart, pathEnd) {

        // shortcuts for speed
        var abs = Math.abs;
        var max = Math.max;
        var pow = Math.pow;
        var sqrt = Math.sqrt;

        // the world data are integers:
        // anything higher than this number is considered blocked
        // this is handy is you use numbered sprites, more than one
        // of which is walkable road, grass, mud, etc
        var maxWalkableTileNum = 0;

        // keep track of the world dimensions
        // Note that this A-star implementation expects the world array to be square: 
        // it must have equal height and width. If your game world is rectangular, 
        // just fill the array with dummy values to pad the empty space.
        var worldWidth = world[0].length;
        var worldHeight = world.length;
        var worldSize = worldWidth * worldHeight;

        // which heuristic should we use?
        // default: no diagonals (Manhattan)
        var distanceFunction = ManhattanDistance;
        var findNeighbours = function() {}; // empty

        /*
			
				// alternate heuristics, depending on your game:

			
				// diagonals allowed but no sqeezing through cracks:
				var distanceFunction = DiagonalDistance;
				var findNeighbours = DiagonalNeighbours;
			
				// diagonals and squeezing through cracks allowed:
				var distanceFunction = DiagonalDistance;
				var findNeighbours = DiagonalNeighboursFree;
			
				// euclidean but no squeezing through cracks:
				var distanceFunction = EuclideanDistance;
				var findNeighbours = DiagonalNeighbours;
			
				// euclidean and squeezing through cracks allowed:
				var distanceFunction = EuclideanDistance;
				var findNeighbours = DiagonalNeighboursFree;
			
				*/

        // distanceFunction functions
        // these return how far away a point is to another

        function ManhattanDistance(Point, Goal) { // linear movement - no diagonals - just cardinal directions (NSEW)
            return abs(Point.x - Goal.x) + abs(Point.y - Goal.y);
        }

        function DiagonalDistance(Point, Goal) { // diagonal movement - assumes diag dist is 1, same as cardinals
            return max(abs(Point.x - Goal.x), abs(Point.y - Goal.y));
        }

        function EuclideanDistance(Point, Goal) { // diagonals are considered a little farther than cardinal directions
            // diagonal movement using Euclide (AC = sqrt(AB^2 + BC^2))
            // where AB = x2 - x1 and BC = y2 - y1 and AC will be [x3, y3]
            return sqrt(pow(Point.x - Goal.x, 2) + pow(Point.y - Goal.y, 2));
        }

        // Neighbours functions, used by findNeighbours function
        // to locate adjacent available cells that aren't blocked

        // Returns every available North, South, East or West
        // cell that is empty. No diagonals,
        // unless distanceFunction function is not Manhattan
        function Neighbours(x, y) {
            var N = y - 1,
                S = y + 1,
                E = x + 1,
                W = x - 1,
                myN = N > -1 && canWalkHere(x, N),
                myS = S < worldHeight && canWalkHere(x, S),
                myE = E < worldWidth && canWalkHere(E, y),
                myW = W > -1 && canWalkHere(W, y),
                result = [];
            if (myN)
                result.push({
                    x: x,
                    y: N
                });
            if (myE)
                result.push({
                    x: E,
                    y: y
                });
            if (myS)
                result.push({
                    x: x,
                    y: S
                });
            if (myW)
                result.push({
                    x: W,
                    y: y
                });
            findNeighbours(myN, myS, myE, myW, N, S, E, W, result);
            return result;
        }

        // returns every available North East, South East,
        // South West or North West cell - no squeezing through
        // "cracks" between two diagonals
        function DiagonalNeighbours(myN, myS, myE, myW, N, S, E, W, result) {
            if (myN) {
                if (myE && canWalkHere(E, N))
                    result.push({
                        x: E,
                        y: N
                    });
                if (myW && canWalkHere(W, N))
                    result.push({
                        x: W,
                        y: N
                    });
            }
            if (myS) {
                if (myE && canWalkHere(E, S))
                    result.push({
                        x: E,
                        y: S
                    });
                if (myW && canWalkHere(W, S))
                    result.push({
                        x: W,
                        y: S
                    });
            }
        }

        // returns every available North East, South East,
        // South West or North West cell including the times that
        // you would be squeezing through a "crack"
        function DiagonalNeighboursFree(myN, myS, myE, myW, N, S, E, W, result) {
            myN = N > -1;
            myS = S < worldHeight;
            myE = E < worldWidth;
            myW = W > -1;
            if (myE) {
                if (myN && canWalkHere(E, N))
                    result.push({
                        x: E,
                        y: N
                    });
                if (myS && canWalkHere(E, S))
                    result.push({
                        x: E,
                        y: S
                    });
            }
            if (myW) {
                if (myN && canWalkHere(W, N))
                    result.push({
                        x: W,
                        y: N
                    });
                if (myS && canWalkHere(W, S))
                    result.push({
                        x: W,
                        y: S
                    });
            }
        }

        // returns boolean value (world cell is available and open)
        function canWalkHere(x, y) {
            return ((world[x] != null) &&
                (world[x][y] != null) &&
                (world[x][y] <= maxWalkableTileNum));
        };

        // Node function, returns a new object with Node properties
        // Used in the calculatePath function to store route costs, etc.
        function Node(Parent, Point) {
            var newNode = {
                // pointer to another Node object
                Parent: Parent,
                // array index of this Node in the world linear array
                value: Point.x + (Point.y * worldWidth),
                // the location coordinates of this Node
                x: Point.x,
                y: Point.y,
                // the heuristic estimated cost
                // of an entire path using this node
                f: 0,
                // the distanceFunction cost to get
                // from the starting point to this node
                g: 0
            };

            return newNode;
        }

        // Path function, executes AStar algorithm operations
        function calculatePath() {
            // create Nodes from the Start and End x,y coordinates
            var mypathStart = Node(null, {
                x: pathStart[0],
                y: pathStart[1]
            });
            var mypathEnd = Node(null, {
                x: pathEnd[0],
                y: pathEnd[1]
            });
            // create an array that will contain all world cells
            var AStar = new Array(worldSize);
            // list of currently open Nodes
            var Open = [mypathStart];
            // list of closed Nodes
            var Closed = [];
            // list of the final output array
            var result = [];
            // reference to a Node (that is nearby)
            var myNeighbours;
            // reference to a Node (that we are considering now)
            var myNode;
            // reference to a Node (that starts a path in question)
            var myPath;
            // temp integer variables used in the calculations
            var length, max, min, i, j;
            // iterate through the open list until none are left
            while (length = Open.length) {
                max = worldSize;
                min = -1;
                for (i = 0; i < length; i++) {
                    if (Open[i].f < max) {
                        max = Open[i].f;
                        min = i;
                    }
                }
                // grab the next node and remove it from Open array
                myNode = Open.splice(min, 1)[0];
                // is it the destination node?
                if (myNode.value === mypathEnd.value) {
                    myPath = Closed[Closed.push(myNode) - 1];
                    do {
                        result.push([myPath.x, myPath.y]);
                    }
                    while (myPath = myPath.Parent);
                    // clear the working arrays
                    AStar = Closed = Open = [];
                    // we want to return start to finish
                    result.reverse();
                } else // not the destination
                {
                    // find which nearby nodes are walkable
                    myNeighbours = Neighbours(myNode.x, myNode.y);
                    // test each one that hasn't been tried already
                    for (i = 0, j = myNeighbours.length; i < j; i++) {
                        myPath = Node(myNode, myNeighbours[i]);
                        if (!AStar[myPath.value]) {
                            // estimated cost of this particular route so far
                            myPath.g = myNode.g + distanceFunction(myNeighbours[i], myNode);
                            // estimated cost of entire guessed route to the destination
                            myPath.f = myPath.g + distanceFunction(myNeighbours[i], mypathEnd);
                            // remember this new path for testing above
                            Open.push(myPath);
                            // mark this node in the world graph as visited
                            AStar[myPath.value] = true;
                        }
                    }
                    // remember this route as having no more untested options
                    Closed.push(myNode);
                }
            } // keep iterating until the Open list is empty
            return result;
        }

        // actually calculate the a-star path!
        // this returns an array of coordinates
        // that is empty if no path is possible
        return calculatePath();
    };
    
	function animateTileSprite(element,noOfTiles,intervalTime) {
		var currentSpriteX = 0;
		var currentSpriteY = 0; 
		element.style.backgroundPositionX = currentSpriteX + "px";
		element.style.backgroundPositionY = currentSpriteY + "px";
		setInterval(function() {
		currentSpriteX -= 50;
		if(currentSpriteX < (-50*noOfTiles)) {
		currentSpriteX = 0;
		// currentSpriteY -= 50;
		}
		// if(currentSpriteY > (50*0)) {
		// currentSpriteX = 0;
		// currentSpriteY = 0;
		// }
		element.style.backgroundPositionX = currentSpriteX + "px";
		// element.style.backgroundPositionY = currentSpriteY + "px";
		},intervalTime);
	};
		
    function GameWorld() {

        var that = this;
        this.htmlElement = document.getElementById('main-screen');
        this.scoreBoard = document.getElementById('scoreBar').children[1];
        this.gameScreen = document.getElementById('game-screen');
        this.mainGameLooper;
        this.bomberMan;
        this.enemies = [];
        this.blocks = [];
        this.explosions = [];
        this.bomb;
        this.explosion;
		this.loadingScreen = document.getElementById('loading-screen');
		this.loadingBar = document.getElementById('loading-screen').children[0];
		this.menuScreen = document.getElementById('menu-screen');
		
        var level1TileMapInfo = [
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3],
            [3, 0, 0, 0, 0, 2, 0, 0, 0, 0, 3],
            [3, 0, 1, 0, 1, 0, 1, 0, 1, 0, 3],
            [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
            [3, 0, 1, 0, 1, 0, 1, 2, 1, 0, 3],
            [3, 0, 0, 2, 0, 0, 0, 0, 0, 0, 3],
            [3, 0, 1, 0, 1, 0, 1, 0, 1, 0, 3],
            [3, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3],
            [3, 0, 1, 0, 1, 0, 1, 0, 1, 0, 3],
            [3, 0, 0, 0, 0, 0, 2, 0, 0, 0, 3],
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3]
        ];

        this.init = function() {
            generateTileMap(level1TileMapInfo);

            that.bomberMan = new BomberMan();
            that.bomberMan.init();
            that.htmlElement.appendChild(that.bomberMan.htmlElement);

            var enemy = new Enemy(50, 450);
            enemy.init(2, [1, 9], [4, 5]);
            that.htmlElement.appendChild(enemy.htmlElement);
            that.enemies.push(enemy);

            enemy = new Enemy(450, 450);
            enemy.init(1, [9, 9], [6, 3]);
            that.htmlElement.appendChild(enemy.htmlElement);
            that.enemies.push(enemy);

            enemy = new Enemy(450, 50);
            enemy.init(1, [9, 1], [1, 4]);
            that.htmlElement.appendChild(enemy.htmlElement);
            that.enemies.push(enemy);

            enemy = new Enemy(450, 250);
            enemy.init(2, [9, 5], [4, 9]);
            that.htmlElement.appendChild(enemy.htmlElement);
            that.enemies.push(enemy);

            initKeyEvents();
            this.mainGameLooper = setInterval(mainGameLoop, 100);
        };

        // Private Methods

        var bombLimit = 3;
        var bombActive = false;
        var initKeyEvents = function() {
            that.bomb = new Bomb;
            window.onkeydown = function(event) {
				console.log(event.which);
                if (event.which === 39) {
                    that.bomberMan.velocityX = 50;
                }
                if (event.which === 37) {
                    that.bomberMan.velocityX = -50;
                }
                if (event.which === 40) {
                    that.bomberMan.velocityY = 50;
                }
                if (event.which === 38) {
                    that.bomberMan.velocityY = -50;
                }
                if (event.which === 87) {
                    if (bombLimit > 0 && !that.bomb.bombActive) {
                        that.bomb = new Bomb();
                        that.bomb.init(that.bomberMan.x, that.bomberMan.y);
                        that.htmlElement.appendChild(that.bomb.htmlElement);
                        setTimeout(explodeBomb, 4000);
                        that.bomb.bombActive = true;
                        bombLimit--;
                    }
                }
            };
     
        var  explodeBomb = function() {
        	that.bomb.htmlElement.remove();
            createExplosionBoxes(that.bomb.x,that.bomb.y);
            that.bomb.bombActive = false;
        }
            
        var createExplosionBoxes = function(x,y){
        	var rightX = x+50;
        	var rightY = y+0;
        	var botX = x+0;
        	var botY = y+50;
        	var leftX = x-50;
        	var leftY = y+0;
        	var topX = x+0;
        	var topY = y-50;
        	var midX = x+0;
        	var midY = y+0;
        	var bombM = new Explosion();
        	var bombR = new Explosion();
        	var bombB = new Explosion();
        	var bombL = new Explosion();
        	var bombT = new Explosion();
        	
        	bombM.init(midX,midY);
        	
        	bombR.init(rightX,rightY);
        	
        	bombB.init(botX,botY);
        	
        	bombL.init(leftX,leftY);
        	
        	bombT.init(topX,topY);
        	
        	that.htmlElement.appendChild(bombM.htmlElement);
        	that.explosions.push(bombM);
        	bombM.clearExplosion();
        	
        	if(allowExplodeCreate(bombR)) {
    		that.htmlElement.appendChild(bombR.htmlElement);
    		that.explosions.push(bombR);
    		bombR.clearExplosion();
    		}
    		if(allowExplodeCreate(bombB)) {
    		that.htmlElement.appendChild(bombB.htmlElement);
    		that.explosions.push(bombB);
    		bombB.clearExplosion();
    		}
    		if(allowExplodeCreate(bombL)) {
    		that.htmlElement.appendChild(bombL.htmlElement);
    		that.explosions.push(bombL);
    		bombL.clearExplosion();
    		}
    		if(allowExplodeCreate(bombT)) {
    		that.htmlElement.appendChild(bombT.htmlElement);
    		that.explosions.push(bombT);
    		bombT.clearExplosion();
    		}	
		 	
		 	for(var i=0; i<that.explosions.length; i++){
		 		for(var e=0; e<that.enemies.length; e++) {
		 			if(checkCollision(that.explosions[i], that.enemies[e])) {
		 				that.enemies[e].kill();
		 				that.enemies[e] = null;
		 			}
		 		}
		 		that.enemies = cleanNullFromArray(that.enemies);
		 		
		 		if(checkCollision(that.explosions[i], that.bomberMan)) {
		 			alert("GAME OVER");
		 		}
		 		
		 		for(var j=0;j<that.blocks.length;j++){
		 			if(checkCollision(that.explosions[i],that.blocks[j]) && that.blocks[j].type===2){
		 				that.blocks[j].kill();
		 				that.blocks[j] = null;
		 			}	
		 		}
		 		that.blocks = cleanNullFromArray(that.blocks);
		 	} 
        };
        
        var cleanNullFromArray = function(array) {
        	for(var i=0;i<array.length;i++){
        		if(array[i]===null){
        			array.splice(i,1);
        		}	
        	}
        	return array;
        }
        
        var allowExplodeCreate = function(explosion) {
        	for(var i=0; i<that.blocks.length; i++) {
        		if(checkCollision(explosion, that.blocks[i]) && that.blocks[i].type != 2) {
        			return false;
        			} 	
        	}
        	return true;
        };
     
            window.onkeyup = function(event) {
                that.bomberMan.velocityX = 0;
                that.bomberMan.velocityY = 0;
            };

        };

        var mainGameLoop = function() {

            var bomberInitX = that.bomberMan.x;
            var bomberInitY = that.bomberMan.y;
            that.bomberMan.updatePosition();
            for (var i = 0; i < that.blocks.length; i++) {
                //if collided with block place is back to origin position
                if (checkCollision(that.bomberMan, that.blocks[i])) {
                    // console.log("here");
                    that.bomberMan.x = bomberInitX;
                    that.bomberMan.y = bomberInitY;
                    that.bomberMan.velocityX = 0;
                    that.bomberMan.velocityY = 0;
                    that.bomberMan.updatePosition();
                }
            }
			
            for (var i = 0; i < that.enemies.length; i++) {
                that.enemies[i].updatePosition(pathValues(that.enemies[i].pathStart, that.enemies[i].pathEnd));
                if (checkCollision(that.bomberMan, that.enemies[i])) {
                    clearInterval(that.mainGameLooper);
                    alert("Game Over");
                }
            };

            updateScore();
            checkEnemies();
        };
		var checkEnemies=function(){
			if(that.enemies.length===0){
				alert("You won");
			}
			
		}
        var updateScore = function() {
            var bombCount = bombLimit;
            that.scoreBoard.innerHTML = 'Bomb Count= ' + bombCount;
        };


        var pathValues = function(start, end) {
            var path = new EnemyAIPathHandler(level1TileMapInfo, start, end);
            return path;
        };

        var checkCollision = function(object1, object2) {
            if ((object1.x + 49) > object2.x && object1.x <= (object2.x + 49) &&
                (object1.y + 49) > object2.y && object1.y <= (object2.y + 49)) {
                return true;
            } else {
                return false;
            }
        };

        var generateTileMap = function(tileMap) {
            for (var i = 0; i < tileMap.length; i++) {
                for (var j = 0; j < tileMap[i].length; j++) {
                    if (tileMap[i][j] != 0) {
                        var block = new Block();
                        block.init(tileMap[i][j], i, j);
                        that.blocks.push(block);
                        that.htmlElement.appendChild(block.htmlElement);
                    }
                }
            }
        };  
	    this.mainMenu = function(){
	    	that.menuScreen.onclick=function(){	
	    		generateLoading();
    		}
   		 }
   		 
   		 var timer;
   		 var generateLoading = function(){
   		 	// setTimeout(generateLoading,2000);
    		that.loadingScreen.style.display = 'block';
    		that.menuScreen.style.display = 'none';
    		timer = setInterval(generateLoadingBar,40);	
   		 }
   		 
   		 var count = 0;
   		 var update = 0;
   		 var barLeft = -590;
   		 var generateLoadingBar = function(){
   		 	update =update+1;
   		 	barLeft = barLeft+update;
   		 	that.loadingBar.style.left=barLeft+'px';
   		 	if(update>30)
   		 	{
   		 		clearInterval(timer);
				gameWorld.init();
   		 		that.loadingScreen.style.display = 'none';
   		 		that.gameScreen.style.display = 'block';
   		 		// clearInterval(that.timer);
   		 	}
   		 }
    };

	var gameWorld = new GameWorld();
    gameWorld.mainMenu();

})();