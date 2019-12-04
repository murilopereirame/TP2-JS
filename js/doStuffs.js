let instance;
let tarefas = [];
let total = 0;
let doing = 0;
let todo = 0;
let review = 0;
let done = 0;
let id = 0;

function adicionarTarefa(nome, desc) {
    id++;
    let tarefa = new Tarefa(id, nome, desc);
    tarefas.push(tarefa);
    todo++;        
    return id;
}

function advance(id) {
    for(let i = 0; tarefas.length; i++) {
        console.log(id);
        if(tarefas[i].id == id) {
            if(tarefas[i].status == 1) {
                doing++;
                todo--;
            } else if(tarefas[i].status == 2) {
                doing--;
                review++;
            } else if(tarefas[i].status == 3) {
                review--;
                done++;
            }

            tarefas[i].status += 1; 
            return  tarefas[i];
        }
    }
}

function moveme(element) {

    let currentPos = element.parentNode.id;
    let id = (element.childNodes[0].id + "").replace("T", "");

    if (currentPos == "toDo") {
        element.remove();
        document.getElementById("doing").appendChild(element);
        advance(id);
    } else if (currentPos == "doing") {
        element.remove();
        document.getElementById("review").appendChild(element);
        advance(id);
    }
    else if (currentPos == "review") {
        element.remove();
        document.getElementById("complete").appendChild(element);
        advance(id);
    }

    recalculate();

}

function recalculate() {
    if(total == 0)
        total++;
    let ptodo = (todo*100)/total;
    let pdoing = (doing*100)/total;
    let preview = (review*100)/total;
    let pdone = (done*100)/total;

    document.getElementById("ptodo").style.width = ptodo + "%";
    document.getElementById("pdoing").style.width = pdoing + "%";
    document.getElementById("preview").style.width = preview + "%";
    document.getElementById("pdone").style.width = pdone + "%";

}

function newTask() {
    document.getElementById("newTaskContainer").style.display = "block";
    document.getElementById("content").style.filter = "blur(2px)";
}

document.addEventListener('keydown', (event) => {
    const keyName = event.keyCode;
    console.log(keyName);
    if (keyName == 13 && event.altKey) {
        if (document.getElementById("newTaskContainer").style.display == "block") {
            let node = document.createElement('div');
            let taskName = document.getElementById("taskName").value;
            let taskDesc = document.getElementById("taskDesc").value;
            let id = adicionarTarefa(taskName, taskDesc);
            recalculate();
            node.className = "task"
            node.innerHTML =
                "<div class=\"taskHolder\" id=\"T"+id+"\">" +
                "<span class=\"taskName\">" + taskName + "</span>" +

                "<span class=\"taskDesc\">" + taskDesc + "</span>"+
                "</div>";
            node.onclick = function () { moveme(node); };
            document.getElementById("toDo").appendChild(node);
            document.getElementById("taskName").value = "";
            document.getElementById("taskDesc").value = "";  
            modalClose();          
        }
    } else if (keyName == 27) {
        if (document.getElementById("newTaskContainer").style.display == "block") {
            modalClose();
        }
    }

});

function modalClose() {
    document.getElementById("newTaskContainer").style.display = "none";
    document.getElementById("content").style.filter = "";
    document.getElementById("taskName").value = "";
    document.getElementById("taskDesc").value = "";
}

let Tarefa = class {    
    constructor(id, nome, desc) {
        this.id = id;
        this.nome = nome;
        this.desc = desc;
        this.status = 1;
    }

    advance() {
        this.status += 1;
    }
}