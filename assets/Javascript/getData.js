const buttons = document.querySelectorAll('li'); // daily, weekly, monthly

// this function will toggle the active class for style purposes
// it will also call the loadData() function passing it the active button
function toggleActive(){
    buttons.forEach((button)=> {
        button.classList.remove('active'); // to remove the previous active class
    })
    this.classList.add('active');
    const activeBtn = document.querySelector('.active');
    loadData(activeBtn);
}

function loadData(activeBtn){
    const buttonText = activeBtn.innerText.toLowerCase();
    fetch('assets/Javascript/data.json')
    .then((res) => res.json())
    .then((data) => {
        data.forEach(item => {
            const timeframeData = item.timeframes[buttonText]; // will get all the previous data for the hours
            if (timeframeData){
                const element = document.querySelector(`.${item.title.toLowerCase().replaceAll(" ", "")}-data`); // gets the HTML element the data is about to be uploaded
                if(element){
                    element.querySelector('.current-hours').textContent = timeframeData.current; // uploading the current hour data
                    switch(buttonText){ // we need to use switch to replicate the words on the design
                        case 'daily':
                            element.querySelector('.previous-hours').textContent = `Yesterday - ${timeframeData.previous}hrs`;
                            break;
                        case 'weekly':
                            element.querySelector('.previous-hours').textContent = `Last Week - ${timeframeData.previous}hrs`;
                            break;
                        case 'monthly':
                            element.querySelector('.previous-hours').textContent = `Last Month - ${timeframeData.previous}hrs`;
                            break;
                    };
                }else{
                    console.log("error");
                }
            }
        });
    })
    .catch(err => console.error('Error fetching data:', err));
}

buttons.forEach((button) => {
    button.addEventListener('click', toggleActive);
});