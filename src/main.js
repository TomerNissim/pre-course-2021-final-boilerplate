document.addEventListener("DOMContentLoaded", function() {
    
    const addButton = document.getElementById("add-button");
    const input = document.getElementById("text-input");
    const prioritySelector = document.getElementById("priority-selector");
    const ul = document.getElementById("list-of-tasks");
    const spanCounter = document.getElementById("counter");
    const sortButton = document.getElementById("sort-button");
    let taskIndex = 1;
    let listOfTasks = [];
    let taskCounter = 0;
    getFromJsonbin();
    
    
    spanCounter.innerText = taskCounter ;
    addButton.addEventListener("click",addTask);
    sortButton.addEventListener("click",sortTasks);
   
    function sortTasks(){
        listOfTasks.sort(sortByPriority);
        for(let i = 0; i < listOfTasks.length; i++){
            console.log(listOfTasks)
           ul.removeChild(listOfTasks[i].li);
        }
        for(let i = 0; i < listOfTasks.length; i++){
            ul.append(listOfTasks[i].li);
         }
    }

    function addTask(){
        const date = sqlFormatDate(new Date);
        let newTask = createTaskObject(date);
        input.value = "";
        displayTask(newTask);
        listOfTasks.push(newTask);
        updateJsonbinStorage();
    }

    function displayTask(task){
        console.log(task)
        const li = createHtmlTags(task);
        task.li = li
        ul.append(li);
        spanCounter.innerText = ++taskCounter;
    }

    function sortByPriority(a,b){
        if(a.priority > b.priority)
            return -1;
        if(a.priority < b.priority)
            return 1;
        return 0;
    }

    function createHtmlTags(task){
        const li = document.createElement("li")
        const taskContainer = document.createElement("div");
        taskContainer.className = "todo-container";
        const taskPriority = document.createElement("span");
        taskPriority.className = "todo-priority";
        taskPriority.innerText = task.priority;
        taskContainer.append(taskPriority);
        const taskCreationTime = document.createElement("span");
        taskCreationTime.className = "todo-created-at";
        taskCreationTime.innerText = task.date;            
        taskContainer.append(taskCreationTime);
        const taskText = document.createElement("span");
        taskContainer.append(taskText);
        taskText.className = "todo-text";
        taskText.innerText = task.description;
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click",deleteTask);
        taskContainer.append(deleteButton);
        li.append(taskContainer);
        return li;
    }

    function createTaskObject(creationDate){
        const task = {priority: prioritySelector.value,
            date: creationDate,
            description: input.value,
            index: taskIndex++
        };
        return task;
    }
      
    function sqlFormatDate(date){
        date = date.toISOString();
        date = date.slice(0,19);
        date = date.replace("T"," ");
        return date;
    }

 async function updateJsonbinStorage(){
        const response = /*await*/ fetch('https://api.jsonbin.io/v3/b/6013f80a1de5467ca6bdcbd4',
            { method: 'PUT',
              headers: {'Content-Type': 'application/json','X-BIN-NAME': 'tomer-final-todo-list-project', 'X-Master-Key':'$2b$10$r0N4nxOcMRRmC99AgaIA.uT9Y.1OMVam6H4owoZdPjZ3ruVcBDy6u'},
              body: JSON.stringify(listOfTasks)});
    }
    
    async function getFromJsonbin(){
             const response = await fetch('https://api.jsonbin.io/v3/b/6013f80a1de5467ca6bdcbd4/latest',
            {method: 'GET',headers: {'Content-Type': 'application/json','X-BIN-NAME': 'tomer-final-todo-list-project', 'X-Master-Key':'$2b$10$r0N4nxOcMRRmC99AgaIA.uT9Y.1OMVam6H4owoZdPjZ3ruVcBDy6u'}});
        if(response.ok){
            const responseText = await response.text();
            let responseParse = JSON.parse(responseText);
            listOfTasks = responseParse.record;
            if(listOfTasks[0] !== false){
                for(let i =0;i<listOfTasks.length;i++){
                    displayTask(listOfTasks[i]);
                }
            }
            else listOfTasks = [];
        }          
    }    
    function deleteTask(event){
        const li = this.closest("li");
        temp = li;
        taskIndex--;
        taskCounter--;
        for(let i = 0; i < listOfTasks.length; i++){
            if(listOfTasks[i].li === li){
                listOfTasks.splice(i,1);
                break;
            }
        }
        console.log(listOfTasks);
        li.remove();
        updateJsonbinStorage();        
    }
    // async function creatJsonBin(){
    //     console
    //     const response = await fetch('https://api.jsonbin.io/v3/b',
    //     {method: 'POST',
    //     headers: {'Content-Type': 'application/json','X-BIN-NAME': 'tomer-final-todo-list-project','X-Bin-Private':'false'	 'X-Master-Key':'$2b$10$r0N4nxOcMRRmC99AgaIA.uT9Y.1OMVam6H4owoZdPjZ3ruVcBDy6u'},
    //     body: JSON.stringify(listOfTasks)});

    // }   
});

   


    