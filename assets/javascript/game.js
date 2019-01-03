var cars = [['Ginetta','United Kingdom'],['Saleen', 'United States'],['Caterham', 'United Kingdom'],['Maybach', "Germany"], ['Matra', 'France'], ['Lola', 'United Kingdom'], ['Alpine', 'France'], ['Hummer', 'United States'], ['Lancia', 'Italy'],['Morgan', 'United Kingdom'], ['Oldsmobile', 'United States'],['Triumph', 'United Kingdom'],['Pontiac', 'United States'],['Lotus', 'United Kingdom'],['Pagani', 'Italy'],["Toyota", "Japan"],["BMW",	"Germany"],["Mercedes", "Germany"],["Volkswagen", "Germany"],["Nissan", "Japan"],["Ford", "United States"],["Honda", "Japan"],["Audi", "Germany"],["Porsche",	"Germany"],["Chevrolet", "United States"],["Renault", "France"],["Hyundai", "Korea"],["Lexus", "Japan"],["Subaru", "Japan"],["Ferrari","Italy"],["Kia","Korea"],["Suzuki", "Japan"],["Isuzu", "Japan"],["Mazda", "Japan"],["Volvo", "Sweden"],["Opel", "Germany"],["GMC",	"United States"],["Tesla", "United States"],["Mini", "United Kingdom"],["Daihatsu", "Japan"],["Mitsubishi", "Japan"],["Acura", "Japan"],["Buick", "United States"],["Peugeot",	"France"],["Lincoln",	"United States"],["Bentley",	"United Kingdom"],["Fiat", "Italy"],["Cadillac", "United States"],["Jeep", "United States"],["Skoda", "Czech Republic"],["Dodge", "United States"],["Yamaha", "Japan"],["Citroen",	"France"],["Jaguar", "United Kingdom"],["Lamborghini",	"Italy"],["Maserati", "Italy"],["Infiniti", "Japan"],["MG", "United Kingdom"],["Chrysler", "United States"],["McLaren", "United Kingdom"],["Scion", "Japan"],["Seat", "Spain"], ['Bugatti', 'France']]
var guessedCars = []
var wins = 0;
var losses = 0;
console.log(cars.length)

//Hide Old Answer
document.getElementById('old-car-message').style.display = 'none';


//Choose Active Word
class ChooseCar {
    constructor(){
        this.randomValue = Math.floor(Math.random() * (cars.length -1));
        this.current = cars[this.randomValue][0].toLowerCase();
        this.country = cars[this.randomValue][1];
    }    
}
var activeWord = new ChooseCar();
console.log(activeWord.current)

//Country
var country = activeWord.country;
document.getElementById('country').innerHTML = activeWord.country;


//Construct Blanks
class Blanks {
    constructor() {
        this.length= activeWord.current.length ;
        this.spaces= this.createSpaces();
    }
    createSpaces(){
        const spaces = [];
        for (let x=0; x<activeWord.current.length; x++) {
            spaces.push("_ ");
        }return spaces;
    } 
} 

// Blank Spaces
var newBlanks = new Blanks();
var blankSpaces = newBlanks.spaces;

//Insert Blanks
var insert = document.getElementById('current-word')
insert.innerHTML = blankSpaces.join('');
// document.getElementById('current-word').append(activeWord.current);

// Guesses Remaining
var guessesRemaining = 6;
document.getElementById('guesses-remaining').innerHTML = guessesRemaining;

//Wrong guesses
var wrongGuesses = 0;

//Clear hangman figure
var figure = document.getElementsByClassName('figure');
for (var i=0; i<figure.length; i++) { 
    figure[i].setAttribute('opacity', "0")    
} 

//Hide answer
document.getElementById('old-car-message').style.display = 'none';

//Keypress Listener
document.addEventListener('keypress', (event) => {

    //Hide answer
    document.getElementById('old-car-message').style.display = 'none';


    //Identify Key
    var keyName = event.key;
    keyName = keyName.toLowerCase();

    console.log('key value: ' + event.keyCode)

    if (event.keyCode >= 97 && event.keyCode <= 122){
        
        //Check if key is in activeWord
        const isPresent = activeWord.current.indexOf(keyName);
        
        //Find all matches
        var result = [];
        var returnAllIndex = function(){
            var i = 0;
            while (i < activeWord.current.length){
                if (activeWord.current[i] === keyName){
                    result.push(i);
                    i++
                } else {
                    i++
                }
            } return (result);
        }
        returnAllIndex();

        //Check if already guessed
        var checkGuesses = document.getElementById('letters-guessed').innerHTML;
        if (checkGuesses.indexOf(keyName) !== -1){
        } 
        
        //Update hangman blanks with correct guess   
        else if (isPresent !== -1) {
            // blankSpaces.splice(locations, 1, keyName);
            for (e of result){
                blankSpaces.splice(e, 1, keyName)
            }
            document.getElementById('current-word').innerHTML = blankSpaces.join('');        

        } else if (isPresent === -1){
            guessesRemaining -=1;
            wrongGuesses ++
            console.log('wrong guesses: ' + wrongGuesses)
            
            //Update guesses remaining and guessed letters
            document.getElementById('guesses-remaining').innerHTML = guessesRemaining;
            document.getElementById('letters-guessed').append(keyName);
            function revealFigure() {
                document.getElementsByClassName('figure')[wrongGuesses-1].setAttribute('opacity', "1")            
            }            
            revealFigure()
        }
        
        //Check for win
        if (insert.innerHTML === activeWord.current){
            wins ++;
            document.getElementById('wins').innerHTML = wins;  
            var randomFile = Math.floor(Math.random()* 15);
            var loadSound = function(){
                console.log('randomfile: ' + randomFile)
                 return document.getElementById('load-sound').setAttribute('src', `assets/sounds/${randomFile}.wav`)
            }
            loadSound(); 
            function correctGuess(){
                var guessedCar = cars.splice(activeWord.randomValue, 1)
                guessedCars.push(guessedCar);
            }
            correctGuess();
            
            if (cars.length === 60){
                document.getElementById('rendezvous').style.display = 'block';
                
                document.getElementById('background-video').style.display = 'none';
                document.getElementById('body').style.backgroundColor = 'black';
                document.getElementById('wrapper').style.display = 'none';
                document.getElementById('wrapper2').style.display = 'none';
                document.getElementById('win-message').style.display = 'block';
                document.getElementById('rendezvous').setAttribute('src', 'https://www.youtube.com/embed/9ajMcbLc7tc?autoplay=1&controls=1')
                document.getElementById('win-message-title').style.display = 'block';
                function clearText(){
                    document.getElementById('win-message').style.display = 'none';
                    document.getElementById('win-message-title').style.display = 'none';
                }
                setTimeout(clearText, 4820)
            }


        }

        //Check for lose
        if (guessesRemaining === 0){
            losses ++;
            document.getElementById('losses').innerHTML = losses;
            document.getElementById('old-car-message').style.display = 'block';
            document.getElementById('old-car').innerHTML = activeWord.current;
            var crashSound = function(){
                var randomCrash = Math.floor(Math.random()* 5);
                return document.getElementById('load-sound').setAttribute('src', `assets/sounds/crash${randomCrash}.wav`)
            }
            crashSound(); 
        }

        //Clear Game
        if (insert.innerHTML === activeWord.current || guessesRemaining === 0){
                    
            //Clear Wrong Guesses
            wrongGuesses = 0;

            //Clear guesses remaining
            guessesRemaining = 6;
            document.getElementById('guesses-remaining').innerHTML = 5;  
            
            //Clear letters guessed
            document.getElementById('letters-guessed').innerHTML = '';
            
            //Reset car
            activeWord = new(ChooseCar)
            console.log('new car: ' + activeWord.current)

            //Country
            country = activeWord.country;
            document.getElementById('country').innerHTML = activeWord.country;
            
            //Reset spaces
            newBlanks = new(Blanks);
            blankSpaces = newBlanks.spaces;

            //Insert Blanks
            insert.innerHTML = blankSpaces.join('');
            // document.getElementById('current-word').append(activeWord.current);

            figure = document.getElementsByClassName('figure');
            for (var i=0; i<figure.length; i++) { 
                figure[i].setAttribute('opacity', "0")    
            } 
        }
    } else {
        console.log('not alpha character')
    }
});
