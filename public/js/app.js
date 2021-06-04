console.log("im here");


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const url = 'http://localhost:3000/weather?address='+search.value
    messageOne.textContent = 'Loading'
    messageTwo.textContent = ''
    fetch(url).then((response) => {
        response.json().then((data)=>{
            if(data.error)
            {
                messageOne.textContent = data.error
                //console.log('an error ',data.error);
            }else
            {
                const forecast = data.forecast
                const location = data.location
                const address = data.address
                //console.log(data);            
                messageOne.textContent = forecast
                messageTwo.textContent = location

            }
        })
    })
})