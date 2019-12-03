function moveme(element) {

    let currentPos = element.parentNode.id;

    if (currentPos == "toDo") {
        element.remove();
        document.getElementById("doing").appendChild(element);
    } else if (currentPos == "doing") {
        element.remove();
        document.getElementById("review").appendChild(element);
    }
    else if (currentPos == "review") {
        element.remove();
        document.getElementById("complete").appendChild(element);
    }

}

function newTask() {
    document.getElementById("newTaskContainer").style.display = "block";;
    document.getElementById("content").style.filter = "blur(2px)";
}

document.addEventListener('keydown', (event) => {
    const keyName = event.keyCode;
    console.log(keyName);
    if (keyName == 13 && event.ctrlKey) {
        if (document.getElementById("newTaskContainer").style.display == "block") {
            let node = document.createElement('div');
            let taskName = document.getElementById("taskName").value;
            let taskDesc = document.getElementById("taskDesc").value;
            node.className = "task"
            node.innerHTML =
                "<span class=\"taskName\">" + taskName + "</span>" +
                "<br>" +
                "<span class=\"taskDesc\">" + taskDesc + "</span>";
            node.onclick = function () { moveme(node); };
            document.getElementById("toDo").appendChild(node);
            document.getElementById("taskName").value = "";
            document.getElementById("taskDesc").value = "";
        }
    } else if (keyName == 27) {
        if (document.getElementById("newTaskContainer").style.display == "block") {
            document.getElementById("newTaskContainer").style.display = "none";
            document.getElementById("content").style.filter = "";
            document.getElementById("taskName").value = "";
            document.getElementById("taskDesc").value = "";
        }
    }

});