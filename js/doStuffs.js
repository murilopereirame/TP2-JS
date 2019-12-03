function moveme(element) {
    
    let currentPos = element.parentNode.id;    
    
    if(currentPos == "toDo") {
        element.remove();
        document.getElementById("doing").appendChild(element);
    } else if(currentPos == "doing") {
        element.remove();
        document.getElementById("complete").appendChild(element);
    }    
    
}

function newTask() {
    document.getElementById("newTaskContainer").style.left = "37.5%";
    document.getElementById("newTaskContainer").style.top = "20%";
    document.getElementById("newTaskContainer").style.display = "block";
    document.getElementById("newTaskContainer").style.position = "absolute";
}