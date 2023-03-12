const numberOfQuestions = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
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
const difficulties = ['Any Difficulty', 'Easy', 'Medium', 'Hard'];
const types = ['Any Type', 'Multiple Choice', 'True / False'];

const currentDay = (new Date().getDate()) - 1; //minus 1 for the month to start at 0 not 1
const todayCategory = categories[currentDay]; 

function newNumberOfQuestion(number){
    return number.numberOfQuestion;
}
function newCategory(index){
    let category = '';

    if (categories[index].value === ''){
        category =  '';
    }
    else {
        category =  '&category=' + categories[index].value;
    }

    return category;
}
function newDifficulty(index){
    let difficulty = '';

    if (difficulties[index] === 'Any Difficulty'){
        difficulty =  '';
    }
    else {
        difficulty =  '&difficulty=' + difficulties[index].toLowerCase();
    }

    return difficulty;
}
function newType(index){
    let type = '';

    if (types[index] === 'Any Type'){
        type =  '';
    }
    else if (types[index] === 'Multiple Choice'){
        type =  '&type=' + 'multiple';
    }
    else if (types[index] === 'True / False'){
        type =  '&type=' + 'boolean';
    }

    return type;
}

async function getTodayCategoryApiData(){ 
    let response = await fetch ('https://opentdb.com/api.php?amount=10' + newCategory(currentDay));
    let data = await response.json();
    
    return await data.results;
}

async function getNewQuizApiData(customQuiz){
    let numberOfQuestion = newNumberOfQuestion(customQuiz);
    let category = newCategory(customQuiz.categoryIndex);
    let difficulty = newDifficulty(customQuiz.difficultyIndex)
    let type = newType(customQuiz.typeIndex)

    let response = await fetch ('https://opentdb.com/api.php?amount=' + numberOfQuestion + category + difficulty + type)

    let data = await response.json();
    
    return await data.results;

    //https://opentdb.com/api.php?amount=15&category=18&difficulty=easy&type=multiple


}




export default{
    todayCategory,
    getTodayCategoryApiData,
    categories,
    difficulties,
    types,
    numberOfQuestions,
    getNewQuizApiData,
}