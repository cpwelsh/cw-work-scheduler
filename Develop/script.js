$("#currentDay").text(moment().format("MMMM Do YYYY, hh:mm:ss a"))

setInterval(function () {
    $("#currentDay").text(moment().format("MMMM Do YYYY, hh:mm:ss a"))
}, 1000)

//time block set up

let timeSlots = []

let currentTime = moment()

currentTime.hour(9).minute(0).second(0).millisecond(0)

while (currentTime.hour() <= 17) {

    const event = localStorage.getItem(currentTime.toISOString()) || "";

    timeSlots.push({
        time: currentTime.clone(),
        event: event
    })

    currentTime = currentTime.clone().add(1, 'hour')
}


for (let i = 0; i < timeSlots.length; i++) {
    let addedClass = ""
    const timeIsAfterNow = timeSlots[i].time.isAfter(moment());
    const timeIsPresent = timeSlots[i].time.hour() === moment().hour();
    const timeIsPast = timeSlots[i].time.isBefore(moment());

    console.log(timeSlots[i].time.hour());

    if (timeIsAfterNow) {
        addedClass += "future"
    } else if (timeIsPresent) {
        addedClass += "present"
    
    } else if (timeIsPast) {
        addedClass += "past"
    }
  




    const html = `
    <div class = "time-block">
        <div class = "hour-block">
            ${timeSlots[i].time.hour()}
        </div>   
        <div class = "event ${addedClass}">
        <textarea id ="textarea${i}">${timeSlots[i].event}</textarea>
        </div>
        <button id = "saveButton${i}" class = "saveBtn">
            save
        </button>
    </div> `





    $(".container").append(html)
    $('#saveButton' + i).click((event) => {
        const value = $(`#textarea${i}`).val();
        const eventKey = timeSlots[i].time.toISOString();

        console.log("value", "eventKey", value, eventKey);
        

        localStorage.setItem(eventKey, value);
        


        console.log(event.target.id)
    })

}









