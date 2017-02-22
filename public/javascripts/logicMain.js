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
            console.log(this.moveFromHorz, this.moveFromVert);

        };

        // this.movePiece = function (currentPlacePosition) {
        //     // console.log("Piece has been moved...");
        //     this.moveTo = currentPlacePosition;
        //
        //     $('#' + this.moveFrom).find('a').remove();
        //     $('#' + this.moveTo).append('<a href="#" class="' + this.moveFromClasses + '">' + this.moveFromInnerHTML + '</a>');
        //
        //
        //     this.moveFrom = "";
        //     this.moveTo = "";
        //     this.moveFromClasses = "";
        //     this.moveFromInnerHTML = "";
        //
        //     this.changeTurn();
        //
        // };

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

        this.eatPiece = function (currentPlacePosition) {
            // console.log("Piece has been moved...");
            this.moveTo = currentPlacePosition;

            $('#' + this.moveFrom).find('a').remove();
            $('#' + this.moveTo).find('a').remove();
            $('#' + this.moveTo).append('<a href="#" class="' + this.moveFromClasses + '">' + this.moveFromInnerHTML + '</a>');


            this.moveFrom = "";
            this.moveTo = "";
            this.moveFromClasses = "";
            this.moveFromInnerHTML = "";

            this.changeTurn();
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


            if (this.moveFromHorz == this.moveToHorz || this.moveFromVert == this.moveToVert) {


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

            // E
            var tempHorz = this.moveHorzNumb(this.moveVert(this.moveToHorz));  // Horz E
            var tempVertRight = this.moveVert(tempHorz) - this.moveVert(this.moveFromHorz) + 1; // Vert
            console.log(this.moveVert(tempHorz), '-', this.moveVert(this.moveFromHorz));
            var tempVertLeft = this.moveVert(tempHorz) + 3; // Horz


            console.log(tempHorz + '=' + this.moveToHorz, tempVertRight + '=' + this.moveToVert);
            console.log(tempHorz, this.moveVert(tempHorz), this.moveVert(this.moveFromHorz));


            if (tempHorz == this.moveToHorz && tempVertRight == this.moveToVert || tempHorz == this.moveToHorz && tempVertLeft == this.moveToVert) {


                $('#' + this.moveFrom).find('a').remove();
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

            // E
            var tempHorz = this.moveHorzNumb(this.moveVert(this.moveToHorz));  // Horz E
            var tempVertRight = this.moveVert(tempHorz) - this.moveVert(this.moveFromHorz) + 1; // Vert
            console.log(this.moveVert(tempHorz), '-', this.moveVert(this.moveFromHorz));
            var tempVertLeft = this.moveVert(tempHorz) + 3; // Horz


            console.log(tempHorz + '=' + this.moveToHorz, tempVertRight + '=' + this.moveToVert);
            console.log(tempHorz, this.moveVert(tempHorz), this.moveVert(this.moveFromHorz));


            if (tempHorz == this.moveToHorz && tempVertRight == this.moveToVert || tempHorz == this.moveToHorz && tempVertLeft == this.moveToVert) {


                $('#' + this.moveFrom).find('a').remove();
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


            if (this.moveFromHorz == this.moveToHorz || this.moveFromVert == this.moveToVert) {


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


            if (this.moveFromHorz == this.moveToHorz || this.moveFromVert == this.moveToVert) {


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


            if (this.moveFromHorz == this.moveToHorz || this.moveFromVert == this.moveToVert) {


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

            // E
            var tempHorz = this.moveHorzNumb(this.moveVert(this.moveToHorz));  // Horz E
            var tempVertRight = this.moveVert(tempHorz) - this.moveVert(this.moveFromHorz) + 1; // Vert
            console.log(this.moveVert(tempHorz), '-', this.moveVert(this.moveFromHorz));
            var tempVertLeft = this.moveVert(tempHorz) + 3; // Horz


            console.log(tempHorz + '=' + this.moveToHorz, tempVertRight + '=' + this.moveToVert);
            console.log(tempHorz, this.moveVert(tempHorz), this.moveVert(this.moveFromHorz));


            if (tempHorz == this.moveToHorz && tempVertRight == this.moveToVert || tempHorz == this.moveToHorz && tempVertLeft == this.moveToVert) {


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

            // E
            var tempHorz = this.moveHorzNumb(this.moveVert(this.moveToHorz));  // Horz E
            var tempVertRight = this.moveVert(tempHorz) - this.moveVert(this.moveFromHorz) + 1; // Vert
            console.log(this.moveVert(tempHorz), '-', this.moveVert(this.moveFromHorz));
            var tempVertLeft = this.moveVert(tempHorz) + 3; // Horz


            console.log(tempHorz + '=' + this.moveToHorz, tempVertRight + '=' + this.moveToVert);
            console.log(tempHorz, this.moveVert(tempHorz), this.moveVert(this.moveFromHorz));


            if (tempHorz == this.moveToHorz && tempVertRight == this.moveToVert || tempHorz == this.moveToHorz && tempVertLeft == this.moveToVert) {


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


            if (this.moveFromHorz == this.moveToHorz || this.moveFromVert == this.moveToVert) {


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


            if (this.moveFromHorz == this.moveToHorz || this.moveFromVert == this.moveToVert) {


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
    $scope.placeTo = "";
    $scope.innerHTML = '';
    $scope.scoreWhite = '0';
    $scope.scoreBlack = '0';

    //white = true
    //black = false
    $scope.whoseTurnIs = true;
    //


    $scope.move = function (currentElement, currentPlacePosition) {

        console.log(currentElement)
        if (movement.doesSelectedPieceHasTurn(currentElement) && movement.checkIfEmpty(currentPlacePosition)) {

            if (movement.moveFromClasses == 'white' && movement.checkIfEmpty(currentPlacePosition)) {
                if(movement.moveFromInnerHTML == '♙'){
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
                if(movement.moveFromInnerHTML == '♟'){
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
    };


    // Set the date we're counting down to
    var countDownDate = new Date("Jan 5, 2018 15:37:25").getTime();

// Update the count down every 1 second
    var x = setInterval(function() {

        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now an the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        document.getElementById("demo").innerHTML = days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ";

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("demo").innerHTML = "EXPIRED";
        }
    }, 1000);

}]);
