document.addEventListener("DOMContentLoaded", function() {
    
    const addButton = document.getElementById("add-button");
    const input = document.getElementById("text-input");
    const prioritySelector = document.getElementById("priority-selector");
    const ul = document.getElementById("list-of-tasks");
    const spanCounter = document.getElementById("counter");
    const sortButton = document.getElementById("sort-button");
    const updateButton = document.getElementById("update-button");    
    let taskIndex = 1;
    let listOfTasks = [];
    let taskCounter = 0;
    let lastDeletedLi;
    let liEditClicked;
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
        console.log(task)
        const li = createHtmlTags(task);
        task.li = li
        ul.append(li);
        spanCounter.innerText = ++taskCounter;
        console.log(li);
    }

    function createTaskObject(creationDate){
        const task = {priority: prioritySelector.value,
            date: creationDate,
            description: input.value,
            check: false,
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
            taskContainer.append(deleteButton);
        const editButton = document.createElement("button");
            editButton.className = "edit-button";
            editButton.innerText = "Edit";
            taskContainer.append(editButton);
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
        listOfTasks.sort(sortByPriority);
        for(let i = 0; i < listOfTasks.length; i++){
            console.log(listOfTasks)
           ul.removeChild(listOfTasks[i].li);
        }
        for(let i = 0; i < listOfTasks.length; i++){
            ul.append(listOfTasks[i].li);
         }
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
        task.check = !task.check
        li.classList.toggle("check")
    }

    function taskEdit(){
        updateButton.classList.toggle("update-Button");
        updateButton.hidden = !updateButton.hidden
        let li = this.closest("li");
        li.classList.toggle("markEdit");
        liEditClicked = li;
        let task = getTaskFromListOfTask(li);
        input.value = task.description;
        prioritySelector.value = task.priority;
    }
    function taskUpdate(){
        let task = getTaskFromListOfTask(liEditClicked);
        task.description = input.value;
        task.priority = prioritySelector.value;
        updateJsonbinStorage();
        let todoText = liEditClicked.querySelector(".todo-text");
        let todoPriority = liEditClicked.querySelector(".todo-priority");
        todoText.innerText = task.description;
        todoPriority.innerText = task.priority;
        liEditClicked.classList.toggle("markEdit")
        console.log(listOfTasks); 
        updateButton.hidden = true;
    }

// etc functions
//
    function getTaskFromListOfTask(li){
        for(let i = 0; i < listOfTasks.length; i++){
            if(listOfTasks[i].li === li){
            return listOfTasks[i];
            }
        }
    }    

    function sqlFormatDate(date){
        date = date.toISOString();
        date = date.slice(0,19);
        date = date.replace("T"," ");
        return date;
    }

      //  const task = getTaskFromListOfTask(li);
      //  editContainer = createHtmlTagsForEdit(task)

    

    
    // function createHtmlTagsForEdit(task){
    //     const editContainer = document.createElement("span");
    //     const editInput = document.createElement("input");
    //     const editPrioritySelector = document.createElement("select");
    //     const option1 = document.createElement("option");
    //         option1.value = "1";
    //         option1.innerText = "1";
    //         editPrioritySelector.append(option1);
    //     const option2 = document.createElement("option");
    //         option2.value = "2";
    //         option2.innerText = "2";
    //         editPrioritySelector.append(option2);
    //     const option3 = document.createElement("option");
    //         option3.value = "3";
    //         option3.innerText = "3";
    //         editPrioritySelector.append(option3);
    //     const option4 = document.createElement("option");
    //         option4.value = "4";
    //         option4.innerText = "4";
    //         editPrioritySelector.append(option4);
    //     const option5 = document.createElement("option");
    //         option5.value = "5";
    //         option5.innerText = "5";
    //         editPrioritySelector.append(option5);    
    //     const updateButton = document.createElement("button");
    //     updateButton.className = "update-Button"
    //     updateButton.innerText = "Update";
    //     editContainer.append(editInput);
    //     editContainer.append(editPrioritySelector);
    //     editContainer.append(updateButton);

        // updateButton.addEventListener("click", updateTask)
        // return editContainer;
    // }
    // editInputTemp;
    // let editPrioritySelectorTemp;

    // function updateTask(){
    //     const li = this.closest("li");
    //     const task = getTaskFromListOfTask(li);
    //     const newTask = {priority: editPrioritySelector.value,
    //         date: task.date, 
    //         description: editInput.value,
    //         check: false,
    //         index: taskIndex++
    //     };
    //     return task;
    //     editContainer.remove();
    // }
    
});

   
// async function creatJsonBin(){
    //     console
    //     const response = await fetch('https://api.jsonbin.io/v3/b',
    //     {method: 'POST',
    //     headers: {'Content-Type': 'application/json','X-BIN-NAME': 'tomer-final-todo-list-project','X-Bin-Private':'false'	 'X-Master-Key':'$2b$10$r0N4nxOcMRRmC99AgaIA.uT9Y.1OMVam6H4owoZdPjZ3ruVcBDy6u'},
    //     body: JSON.stringify(listOfTasks)});

    // }   

    