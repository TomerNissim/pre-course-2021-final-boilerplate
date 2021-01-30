document.addEventListener("DOMContentLoaded", function() {
    
    const addButton = document.getElementById("add-button");
    const input = document.getElementById("text-input");
    const prioritySelector = document.getElementById("priority-selector");
    const ul = document.getElementById("list-of-tasks");
    const spanCounter = document.getElementById("counter");
    const sortButton = document.getElementById("sort-button");
    const updateButton = document.getElementById("update-button");   
    const sortSelect = document.getElementById("sort-selector");
    const categorySelector = document.getElementById("category-selector");
    let taskIndex = 1;
    let listOfTasks = [];
    let taskCounter = 0;
    let lastDeletedLi = null;
    let liEditClicked = null;
    let sortedBy = "priority";
    let bin =  {"my-todo": listOfTasks}
    getFromJsonbin();
    
    updateButton.hidden = true
    spanCounter.innerText = taskCounter ;
    addButton.addEventListener("click",addTask);
    sortButton.addEventListener("click",sortTasks);

//  the main functions of the project
//
    function addTask(){
        const date = sqlFormatDate(new Date);
        let newTask = createTaskObject(date);
        input.value = "";
        displayTask(newTask);
        listOfTasks.push(newTask);
        updateJsonbinStorage();
    }

    function displayTask(task){
        const li = createHtmlTags(task);
        task.li = li
        ul.append(li);
        spanCounter.innerText = ++taskCounter;
    }

    function createTaskObject(creationDate){
        const task = {priority: prioritySelector.value,
            date: creationDate,
            text: input.value,
            check: false,
            category: categorySelector.value,
            index: taskIndex++
        };
        return task;
    }

    function createHtmlTags(task){
        const li = document.createElement("li")
        const taskContainer = document.createElement("div");
            taskContainer.className = "todo-container";
        const taskPriority = document.createElement("span");
            taskPriority.className = "todo-priority";
            taskPriority.innerText = task.priority;
            taskContainer.append(taskPriority);
        const taskCategory = document.createElement("span");
            taskCategory.className = "todo-category";
            taskCategory.innerText = task.category;
            taskContainer.append(taskCategory);
        const taskCreationTime = document.createElement("span");
            taskCreationTime.className = "todo-created-at";
            taskCreationTime.innerText = task.date;            
            taskContainer.append(taskCreationTime);
        const taskText = document.createElement("span");
            taskContainer.append(taskText);
            taskText.className = "todo-text";
            taskText.innerText = task.text;
        const deleteButton = document.createElement("button");
            deleteButton.className = "delete-button";
            deleteButton.innerText = "Delete";
            taskContainer.append(deleteButton);
        const editButton = document.createElement("button");
            editButton.className = "edit-button";
            editButton.innerText = "Edit";
            taskContainer.append(editButton);
        switch(task.category){
            case "general" :
                taskCategory.className = "general-category";
                break;
            case "family":
                taskCategory.className = "family-category";
                break;
            case "work":
                taskCategory.className = "work-category";
                break;    

        }  
        editButton.addEventListener("click",taskEdit);
        deleteButton.addEventListener("click",deleteTask);
        updateButton.addEventListener("click",taskUpdate);
        li.append(taskContainer);
        li.addEventListener("dblclick",taskCheck);
        li.onmousedown = function() {
            return false;
        };
        return li;
    }

//sorting functions
//       
    function sortTasks(){
        sortedBy = sortSelect.value
        switch(sortedBy){
            case "priority":
                listOfTasks.sort(sortByPriority);
                break;
            case "date":
                listOfTasks.sort(sortByDate);
                break;
            case "category":
                listOfTasks.sort(sortByCategory);
                break;    
        }
        for(let i = 0; i < listOfTasks.length; i++){
           ul.removeChild(listOfTasks[i].li);
        }
        for(let i = 0; i < listOfTasks.length; i++){
            ul.append(listOfTasks[i].li);
         }
    }
    function sortByCategory(a,b){
        if(a.category > b.category){
            return 1;
        }else if(a.category < b.category){
            return -1
        }
        return 0;
            
    }
    function sortByDate(a,b){
        if(a.index > b.index){
            return 1;   
        }else if(a.index < b.index){
            return -1;
        }
        return 0;
    }
    function sortByPriority(a,b){
        if(a.priority > b.priority)
            return -1;
        if(a.priority < b.priority)
            return 1;
        return 0;
    }

// JSONBIN functions  
//
 async function updateJsonbinStorage(){
        const response = /*await*/ fetch('https://api.jsonbin.io/v3/b/6013f80a1de5467ca6bdcbd4',
            { method: 'PUT',
              headers: {'Content-Type': 'application/json','X-BIN-NAME': 'tomer-final-todo-list-project', 'X-Master-Key':'$2b$10$r0N4nxOcMRRmC99AgaIA.uT9Y.1OMVam6H4owoZdPjZ3ruVcBDy6u'},
              body: JSON.stringify({"my-todo": listOfTasks})});
    }
    
    async function getFromJsonbin(){
        const response = await fetch('https://api.jsonbin.io/v3/b/6013f80a1de5467ca6bdcbd4/latest',
            {method: 'GET',headers: {'Content-Type': 'application/json','X-BIN-NAME': 'tomer-final-todo-list-project', 'X-Master-Key':'$2b$10$r0N4nxOcMRRmC99AgaIA.uT9Y.1OMVam6H4owoZdPjZ3ruVcBDy6u'}});
        if(response.ok){
            const responseText = await response.json();
            let responseRecord = responseText["record"];
            listOfTasks = responseRecord["my-todo"];
            console.log(listOfTasks)
            if(listOfTasks[0] !== false){
                for(let i =0;i<listOfTasks.length;i++){
                    displayTask(listOfTasks[i]);
                }
            }
            else listOfTasks = [];
            if(listOfTasks.length > 0)
                taskIndex = listOfTasks[listOfTasks.length - 1].index + 1;
        }          
    }

//  delete,check,edit functions
//   
    function deleteTask(event){
        const li = this.closest("li");
        lastDeletedLi = li;
        spanCounter.innerText = --taskCounter;
        for(let i = 0; i < listOfTasks.length; i++){
            if(listOfTasks[i].li === li){
                listOfTasks.splice(i,1);
                break;
            }
        }
        updateJsonbinStorage();        
        li.remove();
    }

    function taskCheck(){
        const li = this.closest("li");
        const task = getTaskFromListOfTask(li);
        if(task !== null){
            task.check = !task.check
            li.classList.toggle("check")
        }
    }

    function taskEdit(){
        if(liEditClicked !== null){
            liEditClicked.classList.toggle("markEdit");
            updateButton.hidden = true;
        }
        updateButton.hidden = !updateButton.hidden
        let li = this.closest("li");
        li.classList.toggle("markEdit");
        liEditClicked = li;
        let task = getTaskFromListOfTask(li);
        input.value = task.text;
        prioritySelector.value = task.priority;
        if(updateButton.hidden){
            input.value = "";
            prioritySelector.value = 1;
            liEditClicked = null;
        }

    }
    function taskUpdate(){
        let task = getTaskFromListOfTask(liEditClicked);
        task.text = input.value;
        task.priority = prioritySelector.value;
        updateJsonbinStorage();
        let todoText = liEditClicked.querySelector(".todo-text");
        let todoPriority = liEditClicked.querySelector(".todo-priority");
        todoText.innerText = task.text;
        todoPriority.innerText = task.priority;
        liEditClicked.classList.toggle("markEdit")
        updateButton.hidden = true;
        input.value = "";
        prioritySelector.value = 1;
        liEditClicked = null;
    }

// etc functions
//
    function getTaskFromListOfTask(li){
        for(let i = 0; i < listOfTasks.length; i++){
            if(listOfTasks[i].li === li){
            return listOfTasks[i];
            }
        }
        return null;
    }    

    function sqlFormatDate(date){
        date = date.toISOString();
        date = date.slice(0,19);
        date = date.replace("T"," ");
        return date;
    }
});

   
// async function creatJsonBin(){
    //     console
    //     const response = await fetch('https://api.jsonbin.io/v3/b',
    //     {method: 'POST',
    //     headers: {'Content-Type': 'application/json','X-BIN-NAME': 'tomer-final-todo-list-project','X-Bin-Private':'false'	 'X-Master-Key':'$2b$10$r0N4nxOcMRRmC99AgaIA.uT9Y.1OMVam6H4owoZdPjZ3ruVcBDy6u'},
    //     body: JSON.stringify(listOfTasks)});

    // }   

    