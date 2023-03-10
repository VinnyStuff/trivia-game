const currentDay = new Date().getDate();
const categories=  [
    { value: '', optionText: 'Any Category' },
    { value: '9', optionText: 'General Knowledge' },
    { value: '10', optionText: 'Entertainment: Books' },
    { value: '11', optionText: 'Entertainment: Film' },
    { value: '12', optionText: 'Entertainment: Music' },
    { value: '13', optionText: 'Entertainment: Musicals & Theatres' },
    { value: '14', optionText: 'Entertainment: Television' },
    { value: '15', optionText: 'Entertainment: Video Games' },
    { value: '16', optionText: 'Entertainment: Board Games' },
    { value: '17', optionText: 'Science & Nature' },
    { value: '18', optionText: 'Science: Computers' },
    { value: '19', optionText: 'Science: Mathematics' },
    { value: '20', optionText: 'Mythology' },
    { value: '21', optionText: 'Sports' },
    { value: '22', optionText: 'Geography' },
    { value: '23', optionText: 'History' },
    { value: '24', optionText: 'Politics' },
    { value: '25', optionText: 'Art' },
    { value: '26', optionText: 'Celebrities' },
    { value: '27', optionText: 'Animals' },
    { value: '28', optionText: 'Vehicles' },
    { value: '29', optionText: 'Entertainment: Comics' },
    { value: '30', optionText: 'Science: Gadgets' },
    { value: '31', optionText: 'Entertainment: Japanese Anime & Manga' },
    { value: '32', optionText: 'Entertainment: Cartoon & Animations' },
    { value: '17', optionText: 'Science & Nature' },
    { value: '18', optionText: 'Science: Computers' },
    { value: '19', optionText: 'Science: Mathematics' },
    { value: '22', optionText: 'Geography' },
    { value: '23', optionText: 'History' },
    { value: '24', optionText: 'Politics' },
];
let test =''

function selectNumberOfQuestions(){

}

function todayCategory(){
/*     if (currentDay === 1){
        return '';
    }
    else {
        return '&category=' + categories[currentDay].value;
    } */

    return categories[currentDay - 1].optionText;
};

function selectCategory(){

}

function selectDifficulty(){

}

function selectType(){

}

function getStarted(){ //this function call when player acepted play with today's category - and the name of the button is "get started"
    let category = '';

    if (currentDay === 1){
        category =  '';
    }
    else {
        category =  '&category=' + categories[currentDay].value;
    }


/*     return 'https://opentdb.com/api.php?amount=10' + category;
 */    return category;

}




async function fetchData(){
    let response = await fetch ('https://opentdb.com/api.php?amount=10' + getStarted());
    let data = await response.json();
    
    return data.results;
}
async function testOne(){
    return await fetchData();
} 




export default{
    todayCategory,
    getStarted,
    testOne,
}


/*             
async function apiUrl(){
    let response = await fetch ('https://opentdb.com/api.php?amount=10');
    let data = await response.json();

    return data.results; 

    https://opentdb.com/api.php?amount=10 
    

    
};

export default {
    apiUrl
} */