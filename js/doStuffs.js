let instance;
let tarefas = [];
let total = 0;
let doing = 0;
let todo = 0;
let review = 0;
let done = 0;
let id = 0;
let firstTime = 0;

function adicionarTarefa(nome, desc) {
    id++;
    let tarefa = new Tarefa(id, nome, desc);
    tarefas.push(tarefa);
    todo++;     
    localStorage.setItem("tarefas", JSON.stringify(tarefas)); 
    return id;
}

function loadTasks() {
    if(localStorage.getItem("first") != null)
        firstTime = localStorage.getItem("first");
    if(localStorage.getItem("tarefas") != null)
        tarefas = JSON.parse(localStorage.getItem("tarefas") || "[]");
    for(let i = 0; i < tarefas.length; i++) {
        id = i + 1; 
        tarefas[i].id = id; 
        
        let node = document.createElement('div');
        let spanTN = document.createElement('span');
        let spanTC = document.createElement('span');
        let holder = document.createElement('div');
        
        node.className = "task"            
        holder.className = "taskHolder";
        holder.id = "T" + id;            
        spanTN.onclick = function () { moveme(node); };
        spanTN.className = "taskName";
        spanTN.innerHTML = tarefas[i].nome;
        spanTC.className = "taskDesc";
        spanTC.innerHTML = tarefas[i].desc.replace("  ", "<br>");

        holder.appendChild(spanTN);
        holder.appendChild(spanTC);

        node.appendChild(holder);

        document.getElementById("taskName").value = "";
        document.getElementById("taskDesc").value = ""; 

        if(tarefas[i].status == 1) {
            todo++;
            document.getElementById("toDo").appendChild(node);
        }
        else if(tarefas[i].status == 2) {
            doing++;
            document.getElementById("doing").appendChild(node);
        }
        else if(tarefas[i].status == 3) {
            review++;
            document.getElementById("review").appendChild(node);
        }
        else if(tarefas[i].status == 4) {
            document.getElementById("complete").appendChild(node);
            done++;
        }
        total = i+1;               
    }
    recalculate();

    if(firstTime == 0) {        
        document.getElementById("content").style.filter = "blur(2px)";
        if (document.getElementById("newTaskContainer").style.display == "block") {
            modalClose();
        }

        if(document.getElementById("modalHelper").style.display == "none" || document.getElementById("modalHelper").style.display == "") {
            document.getElementById("modalHelper").style.display = "block";
        }

        localStorage.setItem("first", '1');  
        document.getElementById("content").style.filter = "blur(2px)";      
    }
}

function advance(id) {
    for(let i = 0; tarefas.length; i++) {
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

            if(tarefas[i].status < 5)
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
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
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
    const keyName = event.key;
    if (keyName == "Enter" && event.altKey) {
        if (document.getElementById("newTaskContainer").style.display == "block" ) {            
            let taskName = document.getElementById("taskName").value;
            let taskDesc = document.getElementById("taskDesc").value;

            if(taskName == "" || taskDesc == "")
                return;
            
            //Crossorigin aqui não hehe
            taskDesc = taskDesc.replace(/<[^>]*>?/gm, '');    

            taskDesc = taskDesc.replace("[NL]", "<br>");
            taskDesc = taskDesc.replace("[*]", "<b>");
            taskDesc = taskDesc.replace("[/*]", "</b>");
            taskDesc = taskDesc.replace("[_]", "<u>");
            taskDesc = taskDesc.replace("[/_]", "</u>");
            taskDesc = taskDesc.replace("[~]", "</i>");
            taskDesc = taskDesc.replace("[/~]", "</i>");

            //Crossorigin aqui não hehe
            taskName = taskName.replace(/<[^>]*>?/gm, '');

            taskName = taskName.replace("[NL]", "<br>");
            taskName = taskName.replace("[*]", "<b>");
            taskName = taskName.replace("[/*]", "</b>");
            taskName = taskName.replace("[_]", "<u>");
            taskName = taskName.replace("[/_]", "</u>");
            taskName = taskName.replace("[~]", "</i>");
            taskName = taskName.replace("[/~]", "</i>");

            let id = adicionarTarefa(taskName, taskDesc);
            recalculate();
            let node = document.createElement('div');
            let spanTN = document.createElement('span');
            let spanTC = document.createElement('span');
            let holder = document.createElement('div');
            
            node.className = "task"            
            holder.className = "taskHolder";
            holder.id = "T" + id;            
            spanTN.onclick = function () { moveme(node); };
            spanTN.className = "taskName";
            spanTN.innerHTML = taskName;
            spanTC.className = "taskDesc";
            spanTC.innerHTML = taskDesc;

            holder.appendChild(spanTN);
            holder.appendChild(spanTC);

            node.appendChild(holder);
                       
            document.getElementById("toDo").appendChild(node);
            document.getElementById("taskName").value = "";
            document.getElementById("taskDesc").value = "";  
            modalClose();          
        }
    } else if (keyName == "Escape") {
        if (document.getElementById("newTaskContainer").style.display == "block") {
            modalClose();
        }
        
        if(document.getElementById("modalHelper").style.display == "block") {
            document.getElementById("modalHelper").style.display = "none";
        }

        if (document.getElementById("modalAbout").style.display == "block") {
            document.getElementById("modalAbout").style.display = "none";
        }

        document.getElementById("content").style.filter = "";
    } else if ((keyName == "H" || keyName == "h") && event.altKey) {   
        if (document.getElementById("newTaskContainer").style.display == "block") {
            modalClose();
        }

        if(document.getElementById("modalHelper").style.display == "none" || document.getElementById("modalHelper").style.display == "") {
            document.getElementById("modalHelper").style.display = "block";
        }

        if (document.getElementById("modalAbout").style.display == "block") {
            document.getElementById("modalAbout").style.display = "none";
        }

        document.getElementById("content").style.filter = "blur(2px)";
    } else if ((keyName == "N" || keyName == "n") && event.altKey) {
        if (document.getElementById("newTaskContainer").style.display == "none" || document.getElementById("newTaskContainer").style.display == "") {
            document.getElementById("newTaskContainer").style.display = "block";
        }

        if(document.getElementById("modalHelper").style.display == "block") {
            document.getElementById("modalHelper").style.display = "none";
        }

        if (document.getElementById("modalAbout").style.display == "block") {
            document.getElementById("modalAbout").style.display = "none";
        }

        document.getElementById("content").style.filter = "blur(2px)";
    } else if ((keyName == "A" || keyName == "a") && event.altKey) {
        if (document.getElementById("modalAbout").style.display == "none" || document.getElementById("modalAbout").style.display == "") {
            document.getElementById("modalAbout").style.display = "block";
        }

        if(document.getElementById("modalHelper").style.display == "block") {
            document.getElementById("modalHelper").style.display = "none";
        }

        if(document.getElementById("newTaskContainer").style.display == "block") {
            document.getElementById("newTaskContainer").style.display = "none";
        }

        document.getElementById("content").style.filter = "blur(2px)";
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