/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiKey = "301f7e4592b7b9b3229685575ae6e500";

// submit button 
const submitButton = document.getElementById("generate");

// textarea 
const feelings = document.getElementById("feelings");

// date div
const date = document.getElementById("date");

// temp div 
const temp = document.getElementById("temp");

//content div
const content = document.getElementById("content");


//Event listener to get data from external API when it's clicked
submitButton.addEventListener("click", async () => {
    const zipCode = document.getElementById("zip").value;
    await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`)
        .then(async response => {
            const res = await response.json();
            return res;
        })
        .then((result) => {
            postData("./all", {
                temp: result.main.temp,
                date: newDate,
                feelings: feelings.value,
            });
        })
        .then(async () => {
            const res = await getData("./all");
            return res;
        })
        .then(res => {
            updateUI(res);
        })

    // const newRes = await res.json();


    /*
    postData("/all",
    {
        temp: newRes.main.temp,
        date:newDate,
        feelings:feelings.value,
    });
    
    const data = await getData("/all");
    

    updateUI(data);
    */

});

// Function to GET Web API Data

// Function to POST data 
const postData = async (url = "", data = {}) => {
    const res = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    });

    try {
        const newRes = await res.json();
        return newRes;

    } catch (error) {
        console.log("error", error);
    }
}

/* Function to GET Project Data */
const getData = async (url = "") => {
    const data = await fetch(url)

    try {
        const newData = await data.json();
        return newData;

    } catch (error) {
        console.log("error", error);
    }


}

// Update function
//This function takes the data received from the API endpoint and update the UI

const updateUI = (data) => {
    date.innerHTML = data.date;
    temp.innerHTML = data.temp;
    content.innerHTML = data.feelings;
}

