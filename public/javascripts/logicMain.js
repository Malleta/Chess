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
    

        //White = true / Black = false;
        this.whoseTurnIs = false;
        this.moveFrom = "";
        this.moveTo = "";
        this.moveFromClasses = "";
        this.moveFromInnerHTML = "";
    }
);


app.controller("myCtrl", ['$scope', 'movement', function ($scope, movement) {

    $scope.placeFrom = true;
    $scope.placeTo = "";
    $scope.innerHTML = '';

    //white = true
    //black = false
    $scope.whoseTurnIs = true;


    $scope.move = function (currentElement, currentPlacePosition) {

        console.log(currentElement)
        // $scope.innerHTML = currentElement.target.innerHTML;
        if (movement.doesSelectedPieceHasTurn(currentElement) && movement.checkIfEmpty(currentPlacePosition)) {

            if (movement.moveFromClasses == 'white' && movement.checkIfEmpty(currentPlacePosition)) {
                movement.eatPiece(currentPlacePosition);
                //BlackEaten++ / brojac za krajni rezlutat
                console.log(currentElement)
            }

            if (movement.moveFromClasses == 'black' && movement.checkIfEmpty(currentPlacePosition)) {
                movement.eatPiece(currentPlacePosition);
                //WhiteEaten++ / brojac za krajni rezlutat

            }

        } else {



            //Da li je figura ranije selektovana
            if (!movement.ifPieceIsSelected()) {
                //Nije selektovana

                //Da li je polje prazno
                if (movement.checkIfEmpty(currentPlacePosition)) {
                    movement.selectPiece(currentElement, currentPlacePosition);
                }
                //Jeste selektovaana //Da li je polje prazno
            } else if (!movement.checkIfEmpty(currentPlacePosition)) {
                if (movement.moveFromInnerHTML == '♙') {
                    movement.movePiecePawnWhite(currentPlacePosition);
                } else if (movement.moveFromInnerHTML == '♟') {
                    movement.movePiecePawnBlack(currentPlacePosition);
                } else if (movement.moveFromInnerHTML == '♖' || movement.moveFromInnerHTML == '♜') {
                    movement.movePieceRook(currentPlacePosition);
                } else if (movement.moveFromInnerHTML == '♘') {
                    movement.movePieceKnightWhite(currentPlacePosition);
                } else if (movement.moveFromInnerHTML == '♞') {
                    movement.movePieceKnightBlack(currentPlacePosition);
                }

            } else {
                //Polje nije prazno
                movement.selectPiece(currentElement, currentPlacePosition);
            }

        }
    };

}]);
