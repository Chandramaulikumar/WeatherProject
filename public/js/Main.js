const cityName = document.getElementById("cityName");
const submitBtn = document.getElementById("submitBtn");
const city_name = document.getElementById("city_name");
const temp_real_val = document.getElementById("temp_real_val");
const temp_status = document.getElementById("temp_status");
const dataHide = document.querySelector(".middle_layer");
const day = document.getElementById("day");
const today_date = document.getElementById("today_date");

const getDateAndTime = () => {
    let weekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Agu", "Sep", "Dec"];

    const now = new Date();

    let curDay = weekDay[now.getDay()].toUpperCase();
    let currentDate = now.getDate();
    let month = allMonths[now.getMonth()].toUpperCase();
    day.innerText = `${curDay}`;
    today_date.innerText = `${currentDate} | ${month}`;
}
getDateAndTime();


const getInformation = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    if (cityVal === "") {
        city_name.innerText = `Please write the city name before search`;
        dataHide.classList.add("data_hide");
    } else {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=5faf8bd0fd66c07ab00dd7a41efcc94c`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`
            temp_real_val.innerHTML = arrData[0].main.temp;
            // temp_status.innerText = arrData[0].weather[0].main;
            cityName.value = "";

            const tempmoon = arrData[0].weather[0].main;
            // consdition check to weather rain or cloud
            if (tempmoon == "Clear") {
                temp_status.innerHTML = `<i class="fas fa-sun" style="color: #eccc68;"></i>`;
            } else if (tempmoon == "Clouds") {
                temp_status.innerHTML = `<i class="fas fa-cloud" style="color: #f1f2f3;"></i>`;
            } else if (tempmoon == "Rain") {
                temp_status.innerHTML = `<i class="fas fa-cloud-rain" style="color: #a4b0be;"></i>`;
            } else {
                temp_status.innerHTML = `<i class="fas fa-cloud" style="color: #f1f2f6;"></i>`;
            }
            dataHide.classList.remove("data_hide");
        } catch {
            city_name.innerText = `Please enter the city name property`;
            dataHide.classList.add("data_hide");
        }
    }
    getDateAndTime();
};

submitBtn.addEventListener("click", getInformation); 