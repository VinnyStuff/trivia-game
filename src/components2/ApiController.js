const categories = [
    { value: '', text: 'Any Category' },
    { value: '9', text: 'General Knowledge' },
    { value: '10', text: 'Entertainment: Books' },
    { value: '11', text: 'Entertainment: Film' },
    { value: '12', text: 'Entertainment: Music' },
    { value: '13', text: 'Entertainment: Musicals & Theatres' },
    { value: '14', text: 'Entertainment: Television' },
    { value: '15', text: 'Entertainment: Video Games' },
    { value: '16', text: 'Entertainment: Board Games' },
    { value: '17', text: 'Science & Nature' },
    { value: '18', text: 'Science: Computers' },
    { value: '19', text: 'Science: Mathematics' },
    { value: '20', text: 'Mythology' },
    { value: '21', text: 'Sports' },
    { value: '22', text: 'Geography' },
    { value: '23', text: 'History' },
    { value: '24', text: 'Politics' },
    { value: '25', text: 'Art' },
    { value: '26', text: 'Celebrities' },
    { value: '27', text: 'Animals' },
    { value: '28', text: 'Vehicles' },
    { value: '29', text: 'Entertainment: Comics' },
    { value: '30', text: 'Science: Gadgets' },
    { value: '31', text: 'Entertainment: Japanese Anime & Manga' },
    { value: '32', text: 'Entertainment: Cartoon & Animations' },
    { value: '17', text: 'Science & Nature' },
    { value: '18', text: 'Science: Computers' },
    { value: '19', text: 'Science: Mathematics' },
    { value: '22', text: 'Geography' },
    { value: '23', text: 'History' },
    { value: '24', text: 'Politics' },
];
const difficulty = ['Any Difficulty', 'Easy', 'Medium', 'Hard'];
const type = ['Any Type', 'Multiple Choice', 'True / False'];
const numberOfQuestions = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]

const currentDay = (new Date().getDate()) - 1; //minus 1 for the month to start at 0 not 1
const todayCategory = categories[currentDay]; 

function selectedTodayCategory(){ //this function call when player acepted play with today's category - and the name of the button is "get started"
    let category = '';

    if (categories[currentDay].value === ''){
        category =  '';
    }
    else {
        category =  '&category=' + categories[currentDay].value;
    }

    return category;
}
async function getTodayCategoryApiData(){ 
    let response = await fetch ('https://opentdb.com/api.php?amount=10' + selectedTodayCategory());
    let data = await response.json();
    
    return await data.results;
}



function selectNumberOfQuestions(){

}
function selectCategory(){

}
function selectDifficulty(){

}
function selectType(){

}
async function getUserVariationApiData(){
    
}




export default{
    todayCategory,
    getTodayCategoryApiData,
    categories,
    difficulty,
    type,
    numberOfQuestions,
}