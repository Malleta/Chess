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
        // console.log("Piece has been selected...")
        this.moveFrom = currentPlacePosition;
        this.moveFromClasses = currentElement.target.className;
        this.moveFromInnerHTML = currentElement.target.innerHTML;
    };

    this.movePiece = function (currentPlacePosition) {
        // console.log("Piece has been moved...");
        this.moveTo = currentPlacePosition;

        $('#' + this.moveFrom).find('a').remove();
        $('#' + this.moveTo).append('<a href="#" class="' + this.moveFromClasses + '">' + this.moveFromInnerHTML + '</a>');


        this.moveFrom = "";
        this.moveTo = "";
        this.moveFromClasses = "";
        this.moveFromInnerHTML = "";

        this.changeTurn();
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

    this.movePiecePawn = function (currentPlacePosition) {
        // console.log("Piece has been moved...");
        this.moveTo = currentPlacePosition;
    if(this.moveTo == 'A3' || this.moveTo == 'A4' || this.moveTo == 'A5' || this.moveTo == 'A6' || this.moveTo == 'A7' || this.moveTo == 'A8' ){


        $('#' + this.moveFrom).find('a').remove();
        $('#' + this.moveTo).append('<a href="#" class="' + this.moveFromClasses + '">' + this.moveFromInnerHTML + '</a>');


        this.moveFrom = "";
        this.moveTo = "";
        this.moveFromClasses = "";
        this.moveFromInnerHTML = "";

        this.changeTurn();
    }
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
        console.log(tempClass)
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
    //White = true / Black = false;
    this.whoseTurnIs = false;


    this.moveFrom = "";
    this.moveTo = "";
    this.moveFromClasses = "";
    this.moveFromInnerHTML = "";
});


app.controller("myCtrl", ['$scope', 'movement', function ($scope, movement) {

    $scope.placeFrom = true;
    $scope.placeTo = "";
    $scope.innerHTML = '';

    //white = true
    //black = false
    $scope.whoseTurnIs = true;

    $scope.move = function (currentElement, currentPlacePosition) {

        console.warn(movement.doesSelectedPieceHasTurn(currentElement))
        // $scope.innerHTML = currentElement.target.innerHTML;
        if (movement.doesSelectedPieceHasTurn(currentElement) && movement.checkIfEmpty(currentPlacePosition)) {

            if (movement.moveFromClasses == 'white' && movement.checkIfEmpty(currentPlacePosition)) {
                movement.eatPiece(currentPlacePosition);
                //BlackEaten++ / brojac za krajni rezlutat
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
                //Polje je prazno

                movement.movePiece(currentPlacePosition);
                $scope.whoseTurnIs = !$scope.whoseTurnIs;
                // console.warn("Ko je na potezu " + $scope.whoseTurnIs)

            } else {
                //Polje nije prazno
                movement.selectPiece(currentElement, currentPlacePosition);
            }

        }
    };
    // $scope.$watch('whoseTurnIs',function (nVal) {
    //     // console.log('..................................................................')
    //
    // })
}]);
