var app = angular.module('myApp', []);


app.service('movement', function () {

        this.checkIfEmpty = function (currentPlace) {
            var findPawn = $('#' + currentPlace).find('a');
            return findPawn.length > 0;
        };

        this.ifPieceIsSelected = function () {
            // console.log('Is piece selected', this.moveFrom.length > 0);
            return this.moveFrom.length > 0;
        };

        this.selectPiece = function (currentElement, currentPlacePosition) {

            this.moveFromHorz = currentPlacePosition.charAt(0); // A
            this.moveFromVert = parseInt(currentPlacePosition.charAt(1)); // 2 7
            this.moveFrom = currentPlacePosition;
            this.moveFromClasses = currentElement.target.className;
            this.moveFromInnerHTML = currentElement.target.innerHTML;
        };

        this.moveHorz = function (num) {
            var fields = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

            var currentPosition = (fields.indexOf(this.moveFromHorz));
            var temp = currentPosition + num;
            return fields[temp];
            //return temp-1;
        };

        this.score = function (temp) {
            if (temp == 'black') {
                blackEaten++;
                return blackEaten;
            } else {
                whiteEaten++;
                return whiteEaten;
            }

        };

        this.moveVert = function (word) {
            var fields = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

            var temp = parseInt((fields.indexOf(word)));

            return temp + 1;
        };

        this.moveHorzNumb = function (num) {

            var fields = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
            return fields[num - 1];
            //return temp-1;

        };

        this.changeTurn = function () {
            var temp = this.whoseTurnIs ? "White" : "Black";
            console.info(temp + " has a turn.");
            this.whoseTurnIs = !this.whoseTurnIs;
        };

        this.whoseHasTurn = function () {
            return this.whoseTurnIs;
        };

        this.doesSelectedPieceHasTurn = function (currentElement) {

            var tempClass = currentElement.target.className;

            switch (tempClass) {
                case 'white':
                    tempClass = true;
                    break;
                case 'black':
                    tempClass = false;
                    break;
            }

            return tempClass == this.whoseTurnIs

        };

        this.eatPiecePawnWhite = function (currentPlacePosition) {

            this.moveTo = currentPlacePosition;
            this.moveToHorz = currentPlacePosition.charAt(0); // A
            this.moveToVert = parseInt(currentPlacePosition.charAt(1)); // 3 6

            var tempUpVert = parseInt(this.moveFromVert);
            tempUpVert++;
            var tempRightHorz = this.moveHorzNumb(this.moveVert(this.moveFromHorz) + 1);
            var tempLeftHorz = this.moveHorzNumb(this.moveVert(this.moveFromHorz) - 1);


            if (this.moveToVert == tempUpVert && this.moveToHorz == tempRightHorz || this.moveToVert == tempUpVert && this.moveToHorz == tempLeftHorz) {

                $('#' + this.moveFrom).find('a').remove();
                $('#' + this.moveTo).find('a').remove();
                $('#' + this.moveTo).append('<a href="#" class="' + this.moveFromClasses + '">' + this.moveFromInnerHTML + '</a>');


                this.moveFrom = "";
                this.moveTo = "";
                this.moveFromClasses = "";
                this.moveFromInnerHTML = "";

                this.changeTurn();

            }

        };

        this.eatPiecePawnBlack = function (currentPlacePosition) {

            this.moveTo = currentPlacePosition;
            this.moveToHorz = currentPlacePosition.charAt(0); // A
            this.moveToVert = parseInt(currentPlacePosition.charAt(1)); // 3 6

            var tempDownVert = parseInt(this.moveFromVert);
            tempDownVert--;
            var tempRightHorz = this.moveHorzNumb(this.moveVert(this.moveFromHorz) + 1);
            var tempLeftHorz = this.moveHorzNumb(this.moveVert(this.moveFromHorz) - 1);


            if (this.moveToVert == tempDownVert && this.moveToHorz == tempRightHorz || this.moveToVert == tempDownVert && this.moveToHorz == tempLeftHorz) {

                $('#' + this.moveFrom).find('a').remove();
                $('#' + this.moveTo).find('a').remove();
                $('#' + this.moveTo).append('<a href="#" class="' + this.moveFromClasses + '">' + this.moveFromInnerHTML + '</a>');


                this.moveFrom = "";
                this.moveTo = "";
                this.moveFromClasses = "";
                this.moveFromInnerHTML = "";

                this.changeTurn();

            }

        };

        this.eatPieceRook = function (currentPlacePosition) {


            this.moveTo = currentPlacePosition;
            this.moveToHorz = currentPlacePosition.charAt(0); // A
            this.moveToVert = parseInt(currentPlacePosition.charAt(1)); // 3 6


            var directionToGo;
            var ifPathIsClear = true;

            if (this.moveFromHorz == this.moveToHorz) {
                //Gore ili Dole
                directionToGo = this.moveToVert > this.moveFromVert ? 'Up' : 'Down';

            } else if (this.moveFromVert == this.moveToVert) {

                directionToGo = this.moveVert(this.moveToHorz) > this.moveVert(this.moveFromHorz) ? 'Right' : 'Left';
            }


            switch (directionToGo) {
                case 'Up':

                    for (var i = this.moveFromVert + 1; i <= this.moveToVert; i++) {
                        if (ifPathIsClear) {
                            if (this.checkIfEmpty(this.moveFromHorz + i)) {
                                ifPathIsClear = false;
                            }
                        }
                    }

                    break;
                case 'Down':
                    for (var i = this.moveFromVert + 1; i <= this.moveToVert; i--) {
                        if (ifPathIsClear) {
                            if (this.checkIfEmpty(this.moveFromHorz + i)) {
                                ifPathIsClear = false;
                            }
                        }
                    }
                    break;
                case 'Right':
                    console.log('lel1', this.moveVert(this.moveFromHorz), this.moveVert(this.moveToHorz))
                    for (var i = this.moveVert(this.moveFromHorz) + 1; i <= this.moveVert(this.moveToHorz); i++) {
                        if (ifPathIsClear) {
                            console.log('lel1', this.moveVert(this.moveFromHorz), this.moveVert(this.moveToHorz))

                            if (this.checkIfEmpty(this.moveHorzNumb(i) + this.moveFromVert)) {
                                ifPathIsClear = false;
                            }
                        }
                    }
                    break;
                case 'Left':
                    for (var i = this.moveVert(this.moveFromHorz) - 1; i >= this.moveVert(this.moveToHorz); i--) {
                        if (ifPathIsClear) {
                            console.log('lel1', this.moveHorzNumb(i), this.moveFromVert)

                            if (this.checkIfEmpty(this.moveHorzNumb(i) + this.moveFromVert)) {
                                ifPathIsClear = false;
                            }
                        }
                    }
                    break;
            }


            if (ifPathIsClear && this.moveFromVert == this.moveToVert || ifPathIsClear && this.moveFromHorz == this.moveToHorz) {
                $('#' + this.moveFrom).find('a').remove();
                $('#' + this.moveTo).append('<a href="#" class="' + this.moveFromClasses + '">' + this.moveFromInnerHTML + '</a>');


                this.moveFrom = "";
                this.moveTo = "";
                this.moveFromClasses = "";
                this.moveFromInnerHTML = "";

                this.changeTurn();
            }

        };

        this.eatPieceKnightWhite = function (currentPlacePosition) {


            this.moveTo = currentPlacePosition;
            this.moveToHorz = currentPlacePosition.charAt(0); // A
            this.moveToVert = parseInt(currentPlacePosition.charAt(1)); // 3 6

            var tempUpVert = parseInt(this.moveFromVert + 2); // Numb
            var tempUpVert2 = parseInt(this.moveFromVert + 1); // Numb
            var tempDownVert = parseInt(this.moveFromVert - 2); // Numb
            var tempDownVert2 = parseInt(this.moveFromVert - 1); // Numb

            var tempUpRightHorz = this.moveHorz(1); // Word
            var tempUpLeftHorz = this.moveHorz(-1); // Word
            var tempUpLeftHorz2 = this.moveHorz(-2); // Word
            var tempUpRightHorz2 = this.moveHorz(+2); // Word


            console.log(tempUpVert2, tempUpRightHorz2, 'Mozda');


            if (this.moveToVert == tempUpVert && this.moveToHorz == tempUpRightHorz || this.moveToVert == tempUpVert && this.moveToHorz == tempUpLeftHorz
                || this.moveToVert == tempUpVert2 && this.moveToHorz == tempUpLeftHorz2 || this.moveToVert == tempUpVert2 && this.moveToHorz == tempUpRightHorz2 ||
                this.moveToVert == tempDownVert && this.moveToHorz == tempUpRightHorz || this.moveToVert == tempDownVert && this.moveToHorz == tempUpLeftHorz
                || this.moveToVert == tempDownVert2 && this.moveToHorz == tempUpLeftHorz2 || this.moveToVert == tempDownVert2 && this.moveToHorz == tempUpRightHorz2) {


                $('#' + this.moveFrom).find('a').remove();
                $('#' + this.moveTo).find('a').remove();
                $('#' + this.moveTo).append('<a href="#" class="' + this.moveFromClasses + '">' + this.moveFromInnerHTML + '</a>');


                this.moveFrom = "";
                this.moveTo = "";
                this.moveFromClasses = "";
                this.moveFromInnerHTML = "";

                this.changeTurn();


            }
        };

        this.eatPieceKnightBlack = function (currentPlacePosition) {


            this.moveTo = currentPlacePosition;
            this.moveToHorz = currentPlacePosition.charAt(0); // A
            this.moveToVert = parseInt(currentPlacePosition.charAt(1)); // 3 6

            var tempUpVert = parseInt(this.moveFromVert - 2); // Numb
            var tempUpVert2 = parseInt(this.moveFromVert - 1); // Numb
            var tempDownVert = parseInt(this.moveFromVert + 2); // Numb
            var tempDownVert2 = parseInt(this.moveFromVert + 1); // Numb

            var tempUpRightHorz = this.moveHorz(1); // Word
            var tempUpLeftHorz = this.moveHorz(-1); // Word
            var tempUpLeftHorz2 = this.moveHorz(-2); // Word
            var tempUpRightHorz2 = this.moveHorz(+2); // Word


            console.log(tempUpVert2, tempUpRightHorz2, 'Mozda');


            if (this.moveToVert == tempUpVert && this.moveToHorz == tempUpRightHorz || this.moveToVert == tempUpVert && this.moveToHorz == tempUpLeftHorz
                || this.moveToVert == tempUpVert2 && this.moveToHorz == tempUpLeftHorz2 || this.moveToVert == tempUpVert2 && this.moveToHorz == tempUpRightHorz2 ||
                this.moveToVert == tempDownVert && this.moveToHorz == tempUpRightHorz || this.moveToVert == tempDownVert && this.moveToHorz == tempUpLeftHorz
                || this.moveToVert == tempDownVert2 && this.moveToHorz == tempUpLeftHorz2 || this.moveToVert == tempDownVert2 && this.moveToHorz == tempUpRightHorz2) {


                $('#' + this.moveFrom).find('a').remove();
                $('#' + this.moveTo).find('a').remove();
                $('#' + this.moveTo).append('<a href="#" class="' + this.moveFromClasses + '">' + this.moveFromInnerHTML + '</a>');


                this.moveFrom = "";
                this.moveTo = "";
                this.moveFromClasses = "";
                this.moveFromInnerHTML = "";

                this.changeTurn();


            }
        };

        this.eatPieceBishopWhite = function (currentPlacePosition) {


            this.moveTo = currentPlacePosition;


            this.moveToHorz = currentPlacePosition.charAt(0); // A
            this.moveToVert = parseInt(currentPlacePosition.charAt(1)); // 3 6

            var temp = this.moveToVert - this.moveFromVert;

            var tempVert = this.moveFromVert + temp;

            var tempRightHorz = this.moveHorzNumb(this.moveVert(this.moveFromHorz) + temp);
            var tempLeftHorz = this.moveHorzNumb(this.moveVert(this.moveFromHorz) - temp);

            var ifPathIsClear = true;


            if (this.moveToVert == tempVert && this.moveToHorz == tempRightHorz) { // gore - desno

                var tempHorz = parseInt(this.moveVert(this.moveFromHorz)); //C3 g5

                for (var j = this.moveFromVert + 1; j <= this.moveToVert; j++) { //gore-desno

                    tempHorz++;
                    if (ifPathIsClear) {
                        if (this.checkIfEmpty(this.moveHorzNumb(tempHorz) + j)) {
                            console.log(this.moveHorzNumb(tempHorz) + j)
                            ifPathIsClear = false;
                        }
                    }
                }


            }

            if (this.moveToVert == tempVert && this.moveToHorz == tempLeftHorz) { // gore - levo

                var tempHorz = parseInt(this.moveVert(this.moveFromHorz));
                if (this.moveFromVert < this.moveToVert) {

                    for (var j = this.moveFromVert + 1; j <= this.moveToVert; j++) { //2<=3
                        tempHorz--;
                        this.moveHorzNumb(tempHorz);

                        if (ifPathIsClear) {
                            if (this.checkIfEmpty(this.moveHorzNumb(tempHorz) + j)) {
                                console.log(this.moveHorzNumb(tempHorz) + j)
                                ifPathIsClear = false;
                            }
                        }
                    }
                } else {
                    for (var j = this.moveFromVert - 1; j >= this.moveToVert; j--) { //dole-desno D4 F2
                        tempHorz++; // -- za levo
                        if (ifPathIsClear) {
                            if (this.checkIfEmpty(this.moveHorzNumb(tempHorz) + j)) {
                                ifPathIsClear = false;
                            }
                        }
                    }
                }

            }

            if (this.moveToVert == tempVert && this.moveToHorz == tempRightHorz && ifPathIsClear ||
                this.moveToVert == tempVert && this.moveToHorz == tempLeftHorz && ifPathIsClear) {


                $('#' + this.moveFrom).find('a').remove();
                $('#' + this.moveTo).find('a').remove();
                $('#' + this.moveTo).append('<a href="#" class="' + this.moveFromClasses + '">' + this.moveFromInnerHTML + '</a>');


                this.moveFrom = "";
                this.moveTo = "";
                this.moveFromClasses = "";
                this.moveFromInnerHTML = "";

                this.changeTurn();


            }
        };

        this.eatPieceBishopBlack = function (currentPlacePosition) {

            this.moveTo = currentPlacePosition;


            this.moveToHorz = currentPlacePosition.charAt(0); // A
            this.moveToVert = parseInt(currentPlacePosition.charAt(1)); // 3 6

            var temp = this.moveToVert - this.moveFromVert;

            var tempVert = this.moveFromVert + temp;

            var tempRightHorz = this.moveHorzNumb(this.moveVert(this.moveFromHorz) + temp);
            var tempLeftHorz = this.moveHorzNumb(this.moveVert(this.moveFromHorz) - temp);

            var ifPathIsClear = true;


            if (this.moveToVert == tempVert && this.moveToHorz == tempRightHorz) { // gore - desno

                var tempHorz = parseInt(this.moveVert(this.moveFromHorz)); //C3 g5
                if (this.moveFromVert < this.moveToVert) {
                    for (var j = this.moveFromVert + 1; j <= this.moveToVert; j++) { //gore-desno

                        tempHorz--;
                        if (ifPathIsClear) {
                            if (this.checkIfEmpty(this.moveHorzNumb(tempHorz) + j)) {
                                console.log(this.moveHorzNumb(tempHorz) + j)
                                ifPathIsClear = false;
                            }
                        }
                    }
                } else {
                    for (var j = this.moveFromVert - 1; j >= this.moveToVert; j--) { //dole-desno D4 F2
                        tempHorz--; // -- za levo
                        if (ifPathIsClear) {
                            if (this.checkIfEmpty(this.moveHorzNumb(tempHorz) + j)) {
                                ifPathIsClear = false;
                            }
                        }
                    }
                }


            }

            if (this.moveToVert == tempVert && this.moveToHorz == tempLeftHorz) { // gore - levo
                var tempHorz = parseInt(this.moveVert(this.moveFromHorz));

                if (this.moveFromVert > this.moveToVert) {
                    console.log('aj', j, this.moveFromVert - 1, this.moveToVert)

                    for (var j = this.moveFromVert - 1; j >= this.moveToVert; j--) { //2<=3
                        tempHorz++;

                        this.moveHorzNumb(tempHorz);

                        if (ifPathIsClear) {
                            if (this.checkIfEmpty(this.moveHorzNumb(tempHorz) + j)) {
                                console.log(this.moveHorzNumb(tempHorz) + j)
                                ifPathIsClear = false;
                            }
                        }
                    }
                } else {
                    for (var j = this.moveFromVert + 1; j <= this.moveToVert; j++) { //dole-desno D4 F2
                        tempHorz--; // -- za levo
                        if (ifPathIsClear) {
                            if (this.checkIfEmpty(this.moveHorzNumb(tempHorz) + j)) {
                                ifPathIsClear = false;
                            }
                        }
                    }
                }


            }

            console.warn(this.moveToVert == tempVert && this.moveToHorz == tempRightHorz && ifPathIsClear)
            console.warn(this.moveToVert == tempVert && this.moveToHorz == tempLeftHorz && ifPathIsClear)

            if (this.moveToVert == tempVert && this.moveToHorz == tempRightHorz && ifPathIsClear ||
                this.moveToVert == tempVert && this.moveToHorz == tempLeftHorz && ifPathIsClear) {


                $('#' + this.moveFrom).find('a').remove();
                $('#' + this.moveTo).find('a').remove();
                $('#' + this.moveTo).append('<a href="#" class="' + this.moveFromClasses + '">' + this.moveFromInnerHTML + '</a>');


                this.moveFrom = "";
                this.moveTo = "";
                this.moveFromClasses = "";
                this.moveFromInnerHTML = "";

                this.changeTurn();


            }
        };

        this.eatPieceQueenWhite = function (currentPlacePosition) {


            this.moveTo = currentPlacePosition;
            this.moveToHorz = currentPlacePosition.charAt(0); // A
            this.moveToVert = parseInt(currentPlacePosition.charAt(1)); // 3 6

            var temp = this.moveToVert - this.moveFromVert;

            var tempVert = this.moveFromVert + temp;

            var tempRightHorz = this.moveHorzNumb(this.moveVert(this.moveFromHorz) + temp);
            var tempLeftHorz = this.moveHorzNumb(this.moveVert(this.moveFromHorz) - temp);

            var directionToGo;
            var ifPathIsClear = true;

            if (this.moveFromHorz == this.moveToHorz) {
                //Gore ili Dole
                directionToGo = this.moveToVert > this.moveFromVert ? 'Up' : 'Down';

            } else if (this.moveFromVert == this.moveToVert) {

                directionToGo = this.moveVert(this.moveToHorz) > this.moveVert(this.moveFromHorz) ? 'Right' : 'Left';
            }


            switch (directionToGo) {
                case 'Up':

                    for (var i = this.moveFromVert + 1; i <= this.moveToVert; i++) {
                        if (ifPathIsClear) {
                            if (this.checkIfEmpty(this.moveFromHorz + i)) {
                                ifPathIsClear = false;
                            }
                        }
                    }

                    break;
                case 'Down':
                    for (var i = this.moveFromVert + 1; i <= this.moveToVert; i--) {
                        if (ifPathIsClear) {
                            if (this.checkIfEmpty(this.moveFromHorz + i)) {
                                ifPathIsClear = false;
                            }
                        }
                    }
                    break;
                case 'Right':
                    console.log('lel1', this.moveVert(this.moveFromHorz), this.moveVert(this.moveToHorz))
                    for (var i = this.moveVert(this.moveFromHorz) + 1; i <= this.moveVert(this.moveToHorz); i++) {
                        if (ifPathIsClear) {
                            console.log('lel1', this.moveVert(this.moveFromHorz), this.moveVert(this.moveToHorz))

                            if (this.checkIfEmpty(this.moveHorzNumb(i) + this.moveFromVert)) {
                                ifPathIsClear = false;
                            }
                        }
                    }
                    break;
                case 'Left':
                    for (var i = this.moveVert(this.moveFromHorz) - 1; i >= this.moveVert(this.moveToHorz); i--) {
                        if (ifPathIsClear) {
                            console.log('lel1', this.moveHorzNumb(i), this.moveFromVert)

                            if (this.checkIfEmpty(this.moveHorzNumb(i) + this.moveFromVert)) {
                                ifPathIsClear = false;
                            }
                        }
                    }
                    break;
            }

            if (this.moveToVert == tempVert && this.moveToHorz == tempRightHorz) { // gore - desno

                var tempHorz = parseInt(this.moveVert(this.moveFromHorz)); //C3 g5

                for (var j = this.moveFromVert + 1; j <= this.moveToVert; j++) { //gore-desno

                    tempHorz++;
                    if (ifPathIsClear) {
                        if (this.checkIfEmpty(this.moveHorzNumb(tempHorz) + j)) {
                            console.log(this.moveHorzNumb(tempHorz) + j)
                            ifPathIsClear = false;
                        }
                    }
                }


            }

            if (this.moveToVert == tempVert && this.moveToHorz == tempLeftHorz) { // gore - levo

                var tempHorz = parseInt(this.moveVert(this.moveFromHorz));
                if (this.moveFromVert < this.moveToVert) {

                    for (var j = this.moveFromVert + 1; j <= this.moveToVert; j++) { //2<=3
                        tempHorz--;
                        this.moveHorzNumb(tempHorz);

                        if (ifPathIsClear) {
                            if (this.checkIfEmpty(this.moveHorzNumb(tempHorz) + j)) {
                                console.log(this.moveHorzNumb(tempHorz) + j)
                                ifPathIsClear = false;
                            }
                        }
                    }
                } else {
                    for (var j = this.moveFromVert - 1; j >= this.moveToVert; j--) { //dole-desno D4 F2
                        tempHorz++; // -- za levo
                        if (ifPathIsClear) {
                            if (this.checkIfEmpty(this.moveHorzNumb(tempHorz) + j)) {
                                ifPathIsClear = false;
                            }
                        }
                    }
                }

            }

            if (this.moveFromHorz == this.moveToHorz && ifPathIsClear || this.moveFromVert == this.moveToVert && ifPathIsClear ||
                this.moveToVert == tempVert && this.moveToHorz == tempRightHorz && ifPathIsClear ||
                this.moveToVert == tempVert && this.moveToHorz == tempLeftHorz && ifPathIsClear) {


                $('#' + this.moveFrom).find('a').remove();
                $('#' + this.moveTo).find('a').remove();
                $('#' + this.moveTo).append('<a href="#" class="' + this.moveFromClasses + '">' + this.moveFromInnerHTML + '</a>');


                this.moveFrom = "";
                this.moveTo = "";
                this.moveFromClasses = "";
                this.moveFromInnerHTML = "";

                this.changeTurn();


            }
        };

        this.eatPieceQueenBlack = function (currentPlacePosition) {

            this.moveTo = currentPlacePosition;
            this.moveToHorz = currentPlacePosition.charAt(0); // A
            this.moveToVert = parseInt(currentPlacePosition.charAt(1)); // 3 6

            var temp = this.moveToVert - this.moveFromVert;

            var tempVert = this.moveFromVert + temp;

            var tempRightHorz = this.moveHorzNumb(this.moveVert(this.moveFromHorz) + temp);
            var tempLeftHorz = this.moveHorzNumb(this.moveVert(this.moveFromHorz) - temp);

            var directionToGo;
            var ifPathIsClear = true;

            if (this.moveFromHorz == this.moveToHorz) {
                //Gore ili Dole
                directionToGo = this.moveToVert > this.moveFromVert ? 'Up' : 'Down';

            } else if (this.moveFromVert == this.moveToVert) {

                directionToGo = this.moveVert(this.moveToHorz) > this.moveVert(this.moveFromHorz) ? 'Right' : 'Left';
            }


            switch (directionToGo) {
                case 'Up':

                    for (var i = this.moveFromVert + 1; i <= this.moveToVert; i++) {
                        if (ifPathIsClear) {
                            if (this.checkIfEmpty(this.moveFromHorz + i)) {
                                ifPathIsClear = false;
                            }
                        }
                    }

                    break;
                case 'Down':
                    for (var i = this.moveFromVert + 1; i <= this.moveToVert; i--) {
                        if (ifPathIsClear) {
                            if (this.checkIfEmpty(this.moveFromHorz + i)) {
                                ifPathIsClear = false;
                            }
                        }
                    }
                    break;
                case 'Right':
                    console.log('lel1', this.moveVert(this.moveFromHorz), this.moveVert(this.moveToHorz))
                    for (var i = this.moveVert(this.moveFromHorz) + 1; i <= this.moveVert(this.moveToHorz); i++) {
                        if (ifPathIsClear) {
                            console.log('lel1', this.moveVert(this.moveFromHorz), this.moveVert(this.moveToHorz))

                            if (this.checkIfEmpty(this.moveHorzNumb(i) + this.moveFromVert)) {
                                ifPathIsClear = false;
                            }
                        }
                    }
                    break;
                case 'Left':
                    for (var i = this.moveVert(this.moveFromHorz) - 1; i >= this.moveVert(this.moveToHorz); i--) {
                        if (ifPathIsClear) {
                            console.log('lel1', this.moveHorzNumb(i), this.moveFromVert)

                            if (this.checkIfEmpty(this.moveHorzNumb(i) + this.moveFromVert)) {
                                ifPathIsClear = false;
                            }
                        }
                    }
                    break;
            }

            if (this.moveToVert == tempVert && this.moveToHorz == tempRightHorz) { // gore - desno

                var tempHorz = parseInt(this.moveVert(this.moveFromHorz)); //C3 g5

                for (var j = this.moveFromVert + 1; j <= this.moveToVert; j++) { //gore-desno

                    tempHorz++;
                    if (ifPathIsClear) {
                        if (this.checkIfEmpty(this.moveHorzNumb(tempHorz) + j)) {
                            console.log(this.moveHorzNumb(tempHorz) + j)
                            ifPathIsClear = false;
                        }
                    }
                }


            }

            if (this.moveToVert == tempVert && this.moveToHorz == tempLeftHorz) { // gore - levo

                var tempHorz = parseInt(this.moveVert(this.moveFromHorz));
                if (this.moveFromVert < this.moveToVert) {

                    for (var j = this.moveFromVert + 1; j <= this.moveToVert; j++) { //2<=3
                        tempHorz--;
                        this.moveHorzNumb(tempHorz);

                        if (ifPathIsClear) {
                            if (this.checkIfEmpty(this.moveHorzNumb(tempHorz) + j)) {
                                console.log(this.moveHorzNumb(tempHorz) + j)
                                ifPathIsClear = false;
                            }
                        }
                    }
                } else {
                    for (var j = this.moveFromVert - 1; j >= this.moveToVert; j--) { //dole-desno D4 F2
                        tempHorz++; // -- za levo
                        if (ifPathIsClear) {
                            if (this.checkIfEmpty(this.moveHorzNumb(tempHorz) + j)) {
                                ifPathIsClear = false;
                            }
                        }
                    }
                }

            }

            if (this.moveFromHorz == this.moveToHorz && ifPathIsClear || this.moveFromVert == this.moveToVert && ifPathIsClear ||
                this.moveToVert == tempVert && this.moveToHorz == tempRightHorz && ifPathIsClear ||
                this.moveToVert == tempVert && this.moveToHorz == tempLeftHorz && ifPathIsClear) {


                $('#' + this.moveFrom).find('a').remove();
                $('#' + this.moveTo).find('a').remove();
                $('#' + this.moveTo).append('<a href="#" class="' + this.moveFromClasses + '">' + this.moveFromInnerHTML + '</a>');


                this.moveFrom = "";
                this.moveTo = "";
                this.moveFromClasses = "";
                this.moveFromInnerHTML = "";

                this.changeTurn();


            }
        };

        this.eatPieceKing = function (currentPlacePosition) {


            this.moveTo = currentPlacePosition;
            this.moveToHorz = currentPlacePosition.charAt(0); // A
            this.moveToVert = parseInt(currentPlacePosition.charAt(1)); // 3 6


            var tempUpVert = parseInt(this.moveFromVert);
            tempUpVert++;
            var tempDownVert = parseInt(this.moveFromVert);
            tempDownVert--;
            var tempRightHorz = this.moveHorzNumb(this.moveVert(this.moveFromHorz) + 1);
            var tempLeftHorz = this.moveHorzNumb(this.moveVert(this.moveFromHorz) - 1);

            console.warn('1', this.moveToVert, tempUpVert, this.moveToHorz, tempRightHorz)


            if (this.moveToVert == tempUpVert && this.moveToHorz == this.moveFromHorz || this.moveToVert == tempUpVert && this.moveToHorz == tempRightHorz
                || this.moveToVert == tempUpVert && this.moveToHorz == tempLeftHorz || this.moveToVert == this.moveFromVert && this.moveToHorz == tempRightHorz
                || this.moveToVert == this.moveFromVert && this.moveToHorz == tempLeftHorz ||
                this.moveToVert == tempDownVert && this.moveToHorz == this.moveFromHorz || this.moveToVert == tempDownVert && this.moveToHorz == tempRightHorz
                || this.moveToVert == tempDownVert && this.moveToHorz == tempLeftHorz
            ) {

                $('#' + this.moveFrom).find('a').remove();
                $('#' + this.moveTo).find('a').remove();
                $('#' + this.moveTo).append('<a href="#" class="' + this.moveFromClasses + '">' + this.moveFromInnerHTML + '</a>');


                this.moveFrom = "";
                this.moveTo = "";
                this.moveFromClasses = "";
                this.moveFromInnerHTML = "";

                this.changeTurn();

            }

        };


        this.movePiecePawnWhite = function (currentPlacePosition) {


            this.moveTo = currentPlacePosition;
            this.moveToHorz = currentPlacePosition.charAt(0); // A
            this.moveToVert = parseInt(currentPlacePosition.charAt(1)); // 3 6


            if (this.moveFromHorz == this.moveToHorz) {

                console.warn(this.moveToVert, this.moveFromVert);

                if (this.moveToVert > this.moveFromVert) {

                    if (this.moveToVert == '4' && this.moveFromVert == '2') {
                        console.warn('Special Piun +2');
                        temp = '4';
                    } else {
                        var temp = parseInt(this.moveFromVert);
                        temp++;
                    }
                }


                if (this.moveToVert == temp) {


                    $('#' + this.moveFrom).find('a').remove();
                    $('#' + this.moveTo).append('<a href="#" class="' + this.moveFromClasses + '">' + this.moveFromInnerHTML + '</a>');


                    this.moveFrom = "";
                    this.moveTo = "";
                    this.moveFromClasses = "";
                    this.moveFromInnerHTML = "";

                    this.changeTurn();

                }
            }
        };

        this.movePiecePawnBlack = function (currentPlacePosition) {


            this.moveTo = currentPlacePosition;
            this.moveToHorz = currentPlacePosition.charAt(0); // A
            this.moveToVert = parseInt(currentPlacePosition.charAt(1)); // 3 6


            if (this.moveFromHorz == this.moveToHorz) {

                console.warn(this.moveToVert, this.moveFromVert);

                if (this.moveToVert < this.moveFromVert) {

                    if (this.moveToVert == '5' && this.moveFromVert == '7') {
                        console.warn('Radi');
                        temp = '5';
                    } else {
                        var temp = parseInt(this.moveFromVert);
                        temp--;
                    }
                }


                if (this.moveToVert == temp) {


                    $('#' + this.moveFrom).find('a').remove();
                    $('#' + this.moveTo).append('<a href="#" class="' + this.moveFromClasses + '">' + this.moveFromInnerHTML + '</a>');


                    this.moveFrom = "";
                    this.moveTo = "";
                    this.moveFromClasses = "";
                    this.moveFromInnerHTML = "";

                    this.changeTurn();

                }
            }
        };

        this.movePieceRook = function (currentPlacePosition) {


            this.moveTo = currentPlacePosition;
            this.moveToHorz = currentPlacePosition.charAt(0); // A
            this.moveToVert = parseInt(currentPlacePosition.charAt(1)); // 3 6

            var directionToGo;
            var ifPathIsClear = true;

            if (this.moveFromHorz == this.moveToHorz) {
                //Gore ili Dole
                directionToGo = this.moveToVert > this.moveFromVert ? 'Up' : 'Down';

            } else if (this.moveFromVert == this.moveToVert) {

                directionToGo = this.moveVert(this.moveToHorz) > this.moveVert(this.moveFromHorz) ? 'Right' : 'Left';
            }


            switch (directionToGo) {
                case 'Up':

                    for (var i = this.moveFromVert + 1; i <= this.moveToVert; i++) {
                        if (ifPathIsClear) {
                            if (this.checkIfEmpty(this.moveFromHorz + i)) {
                                ifPathIsClear = false;

                            }
                        }
                    }

                    break;
                case 'Down':
                    for (var i = this.moveFromVert + 1; i <= this.moveToVert; i--) {
                        if (ifPathIsClear) {
                            if (this.checkIfEmpty(this.moveFromHorz + i)) {
                                ifPathIsClear = false;
                            }
                        }
                    }
                    break;
                case 'Right':
                    console.log('lel1', this.moveVert(this.moveFromHorz), this.moveVert(this.moveToHorz))
                    for (var i = this.moveVert(this.moveFromHorz) + 1; i <= this.moveVert(this.moveToHorz); i++) {
                        if (ifPathIsClear) {
                            console.log('lel1', this.moveVert(this.moveFromHorz), this.moveVert(this.moveToHorz))

                            if (this.checkIfEmpty(this.moveHorzNumb(i) + this.moveFromVert)) {
                                ifPathIsClear = false;
                            }
                        }
                    }
                    break;
                case 'Left':
                    for (var i = this.moveVert(this.moveFromHorz) - 1; i >= this.moveVert(this.moveToHorz); i--) {
                        if (ifPathIsClear) {
                            console.log('lel1', this.moveHorzNumb(i), this.moveFromVert)

                            if (this.checkIfEmpty(this.moveHorzNumb(i) + this.moveFromVert)) {
                                ifPathIsClear = false;
                            }
                        }
                    }
                    break;
            }


            if (ifPathIsClear && this.moveFromVert == this.moveToVert || ifPathIsClear && this.moveFromHorz == this.moveToHorz) {
                $('#' + this.moveFrom).find('a').remove();
                $('#' + this.moveTo).append('<a href="#" class="' + this.moveFromClasses + '">' + this.moveFromInnerHTML + '</a>');


                this.moveFrom = "";
                this.moveTo = "";
                this.moveFromClasses = "";
                this.moveFromInnerHTML = "";

                this.changeTurn();
            }

        };

        this.movePieceKnightWhite = function (currentPlacePosition) {


            this.moveTo = currentPlacePosition;
            this.moveToHorz = currentPlacePosition.charAt(0); // A
            this.moveToVert = parseInt(currentPlacePosition.charAt(1)); // 3 6

            var tempUpVert = parseInt(this.moveFromVert + 2); // Numb
            var tempUpVert2 = parseInt(this.moveFromVert + 1); // Numb
            var tempDownVert = parseInt(this.moveFromVert - 2); // Numb
            var tempDownVert2 = parseInt(this.moveFromVert - 1); // Numb

            var tempUpRightHorz = this.moveHorz(1); // Word
            var tempUpLeftHorz = this.moveHorz(-1); // Word
            var tempUpLeftHorz2 = this.moveHorz(-2); // Word
            var tempUpRightHorz2 = this.moveHorz(+2); // Word


            console.log(tempUpVert2, tempUpRightHorz2, 'Mozda');


            if (this.moveToVert == tempUpVert && this.moveToHorz == tempUpRightHorz || this.moveToVert == tempUpVert && this.moveToHorz == tempUpLeftHorz
                || this.moveToVert == tempUpVert2 && this.moveToHorz == tempUpLeftHorz2 || this.moveToVert == tempUpVert2 && this.moveToHorz == tempUpRightHorz2 ||
                this.moveToVert == tempDownVert && this.moveToHorz == tempUpRightHorz || this.moveToVert == tempDownVert && this.moveToHorz == tempUpLeftHorz
                || this.moveToVert == tempDownVert2 && this.moveToHorz == tempUpLeftHorz2 || this.moveToVert == tempDownVert2 && this.moveToHorz == tempUpRightHorz2) {


                $('#' + this.moveFrom).find('a').remove();
                $('#' + this.moveTo).append('<a href="#" class="' + this.moveFromClasses + '">' + this.moveFromInnerHTML + '</a>');


                this.moveFrom = "";
                this.moveTo = "";
                this.moveFromClasses = "";
                this.moveFromInnerHTML = "";

                this.changeTurn();


            }
        };

        this.movePieceKnightBlack = function (currentPlacePosition) {


            this.moveTo = currentPlacePosition;
            this.moveToHorz = currentPlacePosition.charAt(0); // A
            this.moveToVert = parseInt(currentPlacePosition.charAt(1)); // 3 6

            var tempUpVert = parseInt(this.moveFromVert - 2); // Numb
            var tempUpVert2 = parseInt(this.moveFromVert - 1); // Numb
            var tempDownVert = parseInt(this.moveFromVert + 2); // Numb
            var tempDownVert2 = parseInt(this.moveFromVert + 1); // Numb

            var tempUpRightHorz = this.moveHorz(1); // Word
            var tempUpLeftHorz = this.moveHorz(-1); // Word
            var tempUpLeftHorz2 = this.moveHorz(-2); // Word
            var tempUpRightHorz2 = this.moveHorz(+2); // Word


            console.log(tempUpVert2, tempUpRightHorz2, 'Mozda');


            if (this.moveToVert == tempUpVert && this.moveToHorz == tempUpRightHorz || this.moveToVert == tempUpVert && this.moveToHorz == tempUpLeftHorz
                || this.moveToVert == tempUpVert2 && this.moveToHorz == tempUpLeftHorz2 || this.moveToVert == tempUpVert2 && this.moveToHorz == tempUpRightHorz2 ||
                this.moveToVert == tempDownVert && this.moveToHorz == tempUpRightHorz || this.moveToVert == tempDownVert && this.moveToHorz == tempUpLeftHorz
                || this.moveToVert == tempDownVert2 && this.moveToHorz == tempUpLeftHorz2 || this.moveToVert == tempDownVert2 && this.moveToHorz == tempUpRightHorz2) {


                $('#' + this.moveFrom).find('a').remove();
                $('#' + this.moveTo).append('<a href="#" class="' + this.moveFromClasses + '">' + this.moveFromInnerHTML + '</a>');


                this.moveFrom = "";
                this.moveTo = "";
                this.moveFromClasses = "";
                this.moveFromInnerHTML = "";

                this.changeTurn();


            }
        };

        this.movePieceBishopWhite = function (currentPlacePosition) {

            this.moveTo = currentPlacePosition;


            this.moveToHorz = currentPlacePosition.charAt(0); // A
            this.moveToVert = parseInt(currentPlacePosition.charAt(1)); // 3 6

            var temp = this.moveToVert - this.moveFromVert;

            var tempVert = this.moveFromVert + temp;

            var tempRightHorz = this.moveHorzNumb(this.moveVert(this.moveFromHorz) + temp);
            var tempLeftHorz = this.moveHorzNumb(this.moveVert(this.moveFromHorz) - temp);

            var ifPathIsClear = true;


            if (this.moveToVert == tempVert && this.moveToHorz == tempRightHorz) { // gore - desno

                var tempHorz = parseInt(this.moveVert(this.moveFromHorz)); //C3 g5

                for (var j = this.moveFromVert + 1; j <= this.moveToVert; j++) { //gore-desno

                    tempHorz++;
                    if (ifPathIsClear) {
                        if (this.checkIfEmpty(this.moveHorzNumb(tempHorz) + j)) {
                            console.log(this.moveHorzNumb(tempHorz) + j)
                            ifPathIsClear = false;
                        }
                    }
                }


            }

            if (this.moveToVert == tempVert && this.moveToHorz == tempLeftHorz) { // gore - levo

                var tempHorz = parseInt(this.moveVert(this.moveFromHorz));
                if (this.moveFromVert < this.moveToVert) {

                    for (var j = this.moveFromVert + 1; j <= this.moveToVert; j++) { //2<=3
                        tempHorz--;
                        this.moveHorzNumb(tempHorz);

                        if (ifPathIsClear) {
                            if (this.checkIfEmpty(this.moveHorzNumb(tempHorz) + j)) {
                                console.log(this.moveHorzNumb(tempHorz) + j)
                                ifPathIsClear = false;
                            }
                        }
                    }
                } else {
                    for (var j = this.moveFromVert - 1; j >= this.moveToVert; j--) { //dole-desno D4 F2
                        tempHorz++; // -- za levo
                        if (ifPathIsClear) {
                            if (this.checkIfEmpty(this.moveHorzNumb(tempHorz) + j)) {
                                ifPathIsClear = false;
                            }
                        }
                    }
                }

            }

            if (this.moveToVert == tempVert && this.moveToHorz == tempRightHorz && ifPathIsClear ||
                this.moveToVert == tempVert && this.moveToHorz == tempLeftHorz && ifPathIsClear) {


                $('#' + this.moveFrom).find('a').remove();
                $('#' + this.moveTo).append('<a href="#" class="' + this.moveFromClasses + '">' + this.moveFromInnerHTML + '</a>');


                this.moveFrom = "";
                this.moveTo = "";
                this.moveFromClasses = "";
                this.moveFromInnerHTML = "";

                this.changeTurn();


            }
        };

        this.movePieceBishopBlack = function (currentPlacePosition) {

            this.moveTo = currentPlacePosition;


            this.moveToHorz = currentPlacePosition.charAt(0); // A
            this.moveToVert = parseInt(currentPlacePosition.charAt(1)); // 3 6

            var temp = this.moveToVert - this.moveFromVert;

            var tempVert = this.moveFromVert + temp;

            var tempRightHorz = this.moveHorzNumb(this.moveVert(this.moveFromHorz) + temp);
            var tempLeftHorz = this.moveHorzNumb(this.moveVert(this.moveFromHorz) - temp);

            var ifPathIsClear = true;


            if (this.moveToVert == tempVert && this.moveToHorz == tempRightHorz) { // gore - desno

                var tempHorz = parseInt(this.moveVert(this.moveFromHorz)); //C3 g5
                if (this.moveFromVert < this.moveToVert) {
                    for (var j = this.moveFromVert + 1; j <= this.moveToVert; j++) { //gore-desno

                        tempHorz--;
                        if (ifPathIsClear) {
                            if (this.checkIfEmpty(this.moveHorzNumb(tempHorz) + j)) {
                                console.log(this.moveHorzNumb(tempHorz) + j)
                                ifPathIsClear = false;
                            }
                        }
                    }
                } else {
                    for (var j = this.moveFromVert - 1; j >= this.moveToVert; j--) { //dole-desno D4 F2
                        tempHorz--; // -- za levo
                        if (ifPathIsClear) {
                            if (this.checkIfEmpty(this.moveHorzNumb(tempHorz) + j)) {
                                ifPathIsClear = false;
                            }
                        }
                    }
                }


            }

            if (this.moveToVert == tempVert && this.moveToHorz == tempLeftHorz) { // gore - levo
                var tempHorz = parseInt(this.moveVert(this.moveFromHorz));

                if (this.moveFromVert > this.moveToVert) {
                    console.log('aj', j, this.moveFromVert - 1, this.moveToVert)

                    for (var j = this.moveFromVert - 1; j >= this.moveToVert; j--) { //2<=3
                        tempHorz++;

                        this.moveHorzNumb(tempHorz);

                        if (ifPathIsClear) {
                            if (this.checkIfEmpty(this.moveHorzNumb(tempHorz) + j)) {
                                console.log(this.moveHorzNumb(tempHorz) + j)
                                ifPathIsClear = false;
                            }
                        }
                    }
                } else {
                    for (var j = this.moveFromVert + 1; j <= this.moveToVert; j++) { //dole-desno D4 F2
                        tempHorz--; // -- za levo
                        if (ifPathIsClear) {
                            if (this.checkIfEmpty(this.moveHorzNumb(tempHorz) + j)) {
                                ifPathIsClear = false;
                            }
                        }
                    }
                }


            }

            console.warn(this.moveToVert == tempVert && this.moveToHorz == tempRightHorz && ifPathIsClear)
            console.warn(this.moveToVert == tempVert && this.moveToHorz == tempLeftHorz && ifPathIsClear)

            if (this.moveToVert == tempVert && this.moveToHorz == tempRightHorz && ifPathIsClear ||
                this.moveToVert == tempVert && this.moveToHorz == tempLeftHorz && ifPathIsClear) {


                $('#' + this.moveFrom).find('a').remove();
                $('#' + this.moveTo).append('<a href="#" class="' + this.moveFromClasses + '">' + this.moveFromInnerHTML + '</a>');


                this.moveFrom = "";
                this.moveTo = "";
                this.moveFromClasses = "";
                this.moveFromInnerHTML = "";

                this.changeTurn();


            }
        };

        this.movePieceQueenWhite = function (currentPlacePosition) {


            this.moveTo = currentPlacePosition;
            this.moveToHorz = currentPlacePosition.charAt(0); // A
            this.moveToVert = parseInt(currentPlacePosition.charAt(1)); // 3 6

            var temp = this.moveToVert - this.moveFromVert;

            var tempVert = this.moveFromVert + temp;

            var tempRightHorz = this.moveHorzNumb(this.moveVert(this.moveFromHorz) + temp);
            var tempLeftHorz = this.moveHorzNumb(this.moveVert(this.moveFromHorz) - temp);

            var directionToGo;
            var ifPathIsClear = true;

            if (this.moveFromHorz == this.moveToHorz) {
                //Gore ili Dole
                directionToGo = this.moveToVert > this.moveFromVert ? 'Up' : 'Down';

            } else if (this.moveFromVert == this.moveToVert) {

                directionToGo = this.moveVert(this.moveToHorz) > this.moveVert(this.moveFromHorz) ? 'Right' : 'Left';
            }


            switch (directionToGo) {
                case 'Up':

                    for (var i = this.moveFromVert + 1; i <= this.moveToVert; i++) {
                        if (ifPathIsClear) {
                            if (this.checkIfEmpty(this.moveFromHorz + i)) {
                                ifPathIsClear = false;
                            }
                        }
                    }

                    break;
                case 'Down':
                    for (var i = this.moveFromVert + 1; i <= this.moveToVert; i--) {
                        if (ifPathIsClear) {
                            if (this.checkIfEmpty(this.moveFromHorz + i)) {
                                ifPathIsClear = false;
                            }
                        }
                    }
                    break;
                case 'Right':
                    console.log('lel1', this.moveVert(this.moveFromHorz), this.moveVert(this.moveToHorz))
                    for (var i = this.moveVert(this.moveFromHorz) + 1; i <= this.moveVert(this.moveToHorz); i++) {
                        if (ifPathIsClear) {
                            console.log('lel1', this.moveVert(this.moveFromHorz), this.moveVert(this.moveToHorz))

                            if (this.checkIfEmpty(this.moveHorzNumb(i) + this.moveFromVert)) {
                                ifPathIsClear = false;
                            }
                        }
                    }
                    break;
                case 'Left':
                    for (var i = this.moveVert(this.moveFromHorz) - 1; i >= this.moveVert(this.moveToHorz); i--) {
                        if (ifPathIsClear) {
                            console.log('lel1', this.moveHorzNumb(i), this.moveFromVert)

                            if (this.checkIfEmpty(this.moveHorzNumb(i) + this.moveFromVert)) {
                                ifPathIsClear = false;
                            }
                        }
                    }
                    break;
            }

            if (this.moveToVert == tempVert && this.moveToHorz == tempRightHorz) { // gore - desno

                var tempHorz = parseInt(this.moveVert(this.moveFromHorz)); //C3 g5

                for (var j = this.moveFromVert + 1; j <= this.moveToVert; j++) { //gore-desno

                    tempHorz++;
                    if (ifPathIsClear) {
                        if (this.checkIfEmpty(this.moveHorzNumb(tempHorz) + j)) {
                            console.log(this.moveHorzNumb(tempHorz) + j)
                            ifPathIsClear = false;
                        }
                    }
                }


            }

            if (this.moveToVert == tempVert && this.moveToHorz == tempLeftHorz) { // gore - levo

                var tempHorz = parseInt(this.moveVert(this.moveFromHorz));
                if (this.moveFromVert < this.moveToVert) {

                    for (var j = this.moveFromVert + 1; j <= this.moveToVert; j++) { //2<=3
                        tempHorz--;
                        this.moveHorzNumb(tempHorz);

                        if (ifPathIsClear) {
                            if (this.checkIfEmpty(this.moveHorzNumb(tempHorz) + j)) {
                                console.log(this.moveHorzNumb(tempHorz) + j)
                                ifPathIsClear = false;
                            }
                        }
                    }
                } else {
                    for (var j = this.moveFromVert - 1; j >= this.moveToVert; j--) { //dole-desno D4 F2
                        tempHorz++; // -- za levo
                        if (ifPathIsClear) {
                            if (this.checkIfEmpty(this.moveHorzNumb(tempHorz) + j)) {
                                ifPathIsClear = false;
                            }
                        }
                    }
                }

            }

            if (this.moveFromHorz == this.moveToHorz && ifPathIsClear || this.moveFromVert == this.moveToVert && ifPathIsClear ||
                this.moveToVert == tempVert && this.moveToHorz == tempRightHorz && ifPathIsClear ||
                this.moveToVert == tempVert && this.moveToHorz == tempLeftHorz && ifPathIsClear) {


                $('#' + this.moveFrom).find('a').remove();
                $('#' + this.moveTo).append('<a href="#" class="' + this.moveFromClasses + '">' + this.moveFromInnerHTML + '</a>');


                this.moveFrom = "";
                this.moveTo = "";
                this.moveFromClasses = "";
                this.moveFromInnerHTML = "";

                this.changeTurn();


            }
        };

        this.movePieceQueenBlack = function (currentPlacePosition) {

            this.moveTo = currentPlacePosition;
            this.moveToHorz = currentPlacePosition.charAt(0); // A
            this.moveToVert = parseInt(currentPlacePosition.charAt(1)); // 3 6

            var temp = this.moveToVert - this.moveFromVert;

            var tempVert = this.moveFromVert + temp;

            var tempRightHorz = this.moveHorzNumb(this.moveVert(this.moveFromHorz) + temp);
            var tempLeftHorz = this.moveHorzNumb(this.moveVert(this.moveFromHorz) - temp);

            var directionToGo;
            var ifPathIsClear = true;

            if (this.moveFromHorz == this.moveToHorz) {
                //Gore ili Dole
                directionToGo = this.moveToVert > this.moveFromVert ? 'Up' : 'Down';

            } else if (this.moveFromVert == this.moveToVert) {

                directionToGo = this.moveVert(this.moveToHorz) > this.moveVert(this.moveFromHorz) ? 'Right' : 'Left';
            }


            switch (directionToGo) {
                case 'Up':

                    for (var i = this.moveFromVert + 1; i <= this.moveToVert; i++) {
                        if (ifPathIsClear) {
                            if (this.checkIfEmpty(this.moveFromHorz + i)) {
                                ifPathIsClear = false;
                            }
                        }
                    }

                    break;
                case 'Down':
                    for (var i = this.moveFromVert + 1; i <= this.moveToVert; i--) {
                        if (ifPathIsClear) {
                            if (this.checkIfEmpty(this.moveFromHorz + i)) {
                                ifPathIsClear = false;
                            }
                        }
                    }
                    break;
                case 'Right':
                    console.log('lel1', this.moveVert(this.moveFromHorz), this.moveVert(this.moveToHorz))
                    for (var i = this.moveVert(this.moveFromHorz) + 1; i <= this.moveVert(this.moveToHorz); i++) {
                        if (ifPathIsClear) {
                            console.log('lel1', this.moveVert(this.moveFromHorz), this.moveVert(this.moveToHorz))

                            if (this.checkIfEmpty(this.moveHorzNumb(i) + this.moveFromVert)) {
                                ifPathIsClear = false;
                            }
                        }
                    }
                    break;
                case 'Left':
                    for (var i = this.moveVert(this.moveFromHorz) - 1; i >= this.moveVert(this.moveToHorz); i--) {
                        if (ifPathIsClear) {
                            console.log('lel1', this.moveHorzNumb(i), this.moveFromVert)

                            if (this.checkIfEmpty(this.moveHorzNumb(i) + this.moveFromVert)) {
                                ifPathIsClear = false;
                            }
                        }
                    }
                    break;
            }

            if (this.moveToVert == tempVert && this.moveToHorz == tempRightHorz) { // gore - desno

                var tempHorz = parseInt(this.moveVert(this.moveFromHorz)); //C3 g5
                if (this.moveFromVert < this.moveToVert) {
                    for (var j = this.moveFromVert + 1; j <= this.moveToVert; j++) { //gore-desno

                        tempHorz--;
                        if (ifPathIsClear) {
                            if (this.checkIfEmpty(this.moveHorzNumb(tempHorz) + j)) {
                                console.log(this.moveHorzNumb(tempHorz) + j)
                                ifPathIsClear = false;
                            }
                        }
                    }
                } else {
                    for (var j = this.moveFromVert - 1; j >= this.moveToVert; j--) { //dole-desno D4 F2
                        tempHorz--; // -- za levo
                        if (ifPathIsClear) {
                            if (this.checkIfEmpty(this.moveHorzNumb(tempHorz) + j)) {
                                ifPathIsClear = false;
                            }
                        }
                    }
                }


            }

            if (this.moveToVert == tempVert && this.moveToHorz == tempLeftHorz) { // gore - levo
                var tempHorz = parseInt(this.moveVert(this.moveFromHorz));

                if (this.moveFromVert > this.moveToVert) {
                    console.log('aj', j, this.moveFromVert - 1, this.moveToVert)

                    for (var j = this.moveFromVert - 1; j >= this.moveToVert; j--) { //2<=3
                        tempHorz++;

                        this.moveHorzNumb(tempHorz);

                        if (ifPathIsClear) {
                            if (this.checkIfEmpty(this.moveHorzNumb(tempHorz) + j)) {
                                console.log(this.moveHorzNumb(tempHorz) + j)
                                ifPathIsClear = false;
                            }
                        }
                    }
                } else {
                    for (var j = this.moveFromVert + 1; j <= this.moveToVert; j++) { //dole-desno D4 F2
                        tempHorz--; // -- za levo
                        if (ifPathIsClear) {
                            if (this.checkIfEmpty(this.moveHorzNumb(tempHorz) + j)) {
                                ifPathIsClear = false;
                            }
                        }
                    }
                }


            }


            if (this.moveFromHorz == this.moveToHorz && ifPathIsClear || this.moveFromVert == this.moveToVert && ifPathIsClear ||
                this.moveToVert == tempVert && this.moveToHorz == tempRightHorz && ifPathIsClear ||
                this.moveToVert == tempVert && this.moveToHorz == tempLeftHorz && ifPathIsClear) {


                $('#' + this.moveFrom).find('a').remove();
                $('#' + this.moveTo).append('<a href="#" class="' + this.moveFromClasses + '">' + this.moveFromInnerHTML + '</a>');


                this.moveFrom = "";
                this.moveTo = "";
                this.moveFromClasses = "";
                this.moveFromInnerHTML = "";

                this.changeTurn();


            }
        };

        this.movePieceKing = function (currentPlacePosition) {


            this.moveTo = currentPlacePosition;
            this.moveToHorz = currentPlacePosition.charAt(0); // A
            this.moveToVert = parseInt(currentPlacePosition.charAt(1)); // 3 6


            var tempUpVert = parseInt(this.moveFromVert);
            tempUpVert++;
            var tempDownVert = parseInt(this.moveFromVert);
            tempDownVert--;
            var tempRightHorz = this.moveHorzNumb(this.moveVert(this.moveFromHorz) + 1);
            var tempLeftHorz = this.moveHorzNumb(this.moveVert(this.moveFromHorz) - 1);

            console.warn('1', this.moveToVert, tempUpVert, this.moveToHorz, tempRightHorz)


            if (this.moveToVert == tempUpVert && this.moveToHorz == this.moveFromHorz || this.moveToVert == tempUpVert && this.moveToHorz == tempRightHorz
                || this.moveToVert == tempUpVert && this.moveToHorz == tempLeftHorz || this.moveToVert == this.moveFromVert && this.moveToHorz == tempRightHorz
                || this.moveToVert == this.moveFromVert && this.moveToHorz == tempLeftHorz ||
                this.moveToVert == tempDownVert && this.moveToHorz == this.moveFromHorz || this.moveToVert == tempDownVert && this.moveToHorz == tempRightHorz
                || this.moveToVert == tempDownVert && this.moveToHorz == tempLeftHorz
            ) {

                $('#' + this.moveFrom).find('a').remove();
                $('#' + this.moveTo).append('<a href="#" class="' + this.moveFromClasses + '">' + this.moveFromInnerHTML + '</a>');


                this.moveFrom = "";
                this.moveTo = "";
                this.moveFromClasses = "";
                this.moveFromInnerHTML = "";

                this.changeTurn();

            }

        };
    

        // this.rokada = function () {
        //
        //     console.log('aa',findPawn)
        // };


        //White = true / Black = false;
        this.whoseTurnIs = false;
        this.moveFrom = "";
        this.moveTo = "";
        this.moveFromClasses = "";
        this.moveFromInnerHTML = "";
        var whiteEaten = '0';
        var blackEaten = '0';
    }
);


app.controller("myCtrl", ['$scope', 'movement', function ($scope, movement) {

    $scope.placeFrom = true;
    $scope.whoseTurnIs = true;
    $scope.placeTo = "";
    $scope.innerHTML = '';
    $scope.scoreWhite = '0';
    $scope.scoreBlack = '0';


    $scope.move = function (currentElement, currentPlacePosition) {
        
        console.log(currentElement)
        if (movement.doesSelectedPieceHasTurn(currentElement) && movement.checkIfEmpty(currentPlacePosition)) {

            if (movement.moveFromClasses == 'white' && movement.checkIfEmpty(currentPlacePosition)) {
                if (movement.moveFromInnerHTML == '♙') {
                    movement.eatPiecePawnWhite(currentPlacePosition);
                    $scope.scoreWhite = movement.score('white');
                } else if (movement.moveFromInnerHTML == '♖') {
                    movement.eatPieceRook(currentPlacePosition);
                    $scope.scoreWhite = movement.score('white');
                } else if (movement.moveFromInnerHTML == '♘') {
                    movement.eatPieceKnightWhite(currentPlacePosition);
                    $scope.scoreWhite = movement.score('white');
                } else if (movement.moveFromInnerHTML == '♗') {
                    movement.eatPieceBishopWhite(currentPlacePosition);
                    $scope.scoreWhite = movement.score('white');
                } else if (movement.moveFromInnerHTML == '♕') {
                    movement.eatPieceQueenWhite(currentPlacePosition);
                    $scope.scoreWhite = movement.score('white');
                } else if (movement.moveFromInnerHTML == '♔') {
                    movement.eatPieceKing(currentPlacePosition);
                    $scope.scoreWhite = movement.score('white');
                }

            }

            if (movement.moveFromClasses == 'black' && movement.checkIfEmpty(currentPlacePosition)) {
                if (movement.moveFromInnerHTML == '♟') {
                    movement.eatPiecePawnBlack(currentPlacePosition);
                    $scope.scoreBlack = movement.score('black');
                } else if (movement.moveFromInnerHTML == '♜') {
                    movement.eatPieceRook(currentPlacePosition);
                    $scope.scoreBlack = movement.score('black');
                } else if (movement.moveFromInnerHTML == '♞') {
                    movement.eatPieceKnightBlack(currentPlacePosition);
                    $scope.scoreBlack = movement.score('black');
                } else if (movement.moveFromInnerHTML == '♝') {
                    movement.eatPieceBishopBlack(currentPlacePosition);
                    $scope.scoreBlack = movement.score('black');
                } else if (movement.moveFromInnerHTML == '♛') {
                    movement.eatPieceQueenBlack(currentPlacePosition);
                    $scope.scoreBlack = movement.score('black');
                } else if (movement.moveFromInnerHTML == '♚') {
                    movement.eatPieceKing(currentPlacePosition);
                    $scope.scoreBlack = movement.score('black');
                }

            }

        } else {


            if (!movement.ifPieceIsSelected()) {

                if (movement.checkIfEmpty(currentPlacePosition)) {
                    movement.selectPiece(currentElement, currentPlacePosition);
                }
            } else if (!movement.checkIfEmpty(currentPlacePosition)) {
                if (movement.moveFromInnerHTML == '♙') {
                    movement.movePiecePawnWhite(currentPlacePosition);
                } else if (movement.moveFromInnerHTML == '♟') {
                    movement.movePiecePawnBlack(currentPlacePosition);
                } else if (movement.moveFromInnerHTML == '♖') {
                    movement.movePieceRook(currentPlacePosition);
                } else if (movement.moveFromInnerHTML == '♜') {
                    movement.movePieceRook(currentPlacePosition);
                } else if (movement.moveFromInnerHTML == '♘') {
                    movement.movePieceKnightWhite(currentPlacePosition);
                } else if (movement.moveFromInnerHTML == '♞') {
                    movement.movePieceKnightBlack(currentPlacePosition);
                } else if (movement.moveFromInnerHTML == '♗') {
                    movement.movePieceBishopWhite(currentPlacePosition);
                } else if (movement.moveFromInnerHTML == '♝') {
                    movement.movePieceBishopBlack(currentPlacePosition);
                } else if (movement.moveFromInnerHTML == '♕') {
                    movement.movePieceQueenWhite(currentPlacePosition);
                } else if (movement.moveFromInnerHTML == '♛') {
                    movement.movePieceQueenBlack(currentPlacePosition);
                } else if (movement.moveFromInnerHTML == '♔') {
                    movement.movePieceKing(currentPlacePosition);
                } else if (movement.moveFromInnerHTML == '♚') {
                    movement.movePieceKing(currentPlacePosition);
                }

            } else {
                //Polje nije prazno
                movement.selectPiece(currentElement, currentPlacePosition);
            }
        }

        $scope.whoseTurnIs = !movement.whoseTurnIs;
    };

}]);
