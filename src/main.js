document.addEventListener("DOMContentLoaded", function() {
    
    const addButton = document.getElementById("add-button");
    const input = document.getElementById("text-input");
    const prioritySelector = document.getElementById("priority-selector");
    const ul = document.getElementById("list-of-tasks");
    const spanCounter = document.getElementById("counter");
    const sortButton = document.getElementById("sort-button");
    const updateButton = document.getElementById("update-button");   
    const sortSelector = document.getElementById("sort-selector");
    const categorySelector = document.getElementById("category-selector");
    const undoButton = document.getElementById("undo-button");
    let taskIndex = 1;
    let listOfTasks = [];
    let taskCounter = 0;
    let lastDeletedTask = null;
    let liEditClicked = null;
    let sortedBy = "priority";
    let draggingLi;
    let draggingY;
    let dragNdropIndex;
    
    if(dragNdropIndex === undefined)
        dragNdropIndex = 1;
    getFromJsonbin();
    updateButton.hidden = true;
    spanCounter.innerText = taskCounter ;
    addButton.addEventListener("click",addTask);
    sortButton.addEventListener("click",sortTasks);
    undoButton.addEventListener("click",undoTask);

//  the main functions of the project
//
    function addTask(){
        const date = sqlFormatDate(new Date);
        let newTask = createTaskObject(date);
        changeInputLineToDefault();
        displayTask(newTask);
        listOfTasks.push(newTask);
        updateJsonbinStorage();
    }

    function displayTask(task){
        const li = createHtmlTags(task);
        task.li = li;
        ul.append(li);
        spanCounter.innerText = ++taskCounter;
    }

    function createTaskObject(creationDate){
        const task = {priority: prioritySelector.value,
            date: creationDate,
            text: input.value,
            check: false,
            category: categorySelector.value,
            dragNdropIndex: dragNdropIndex++,
            index: taskIndex++
        };
        return task;
    }

    function createHtmlTags(task){
        const li = document.createElement("li");
            li.setAttribute("draggable","true");
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
        li.addEventListener("dragstart",dragStart);
        li.addEventListener("dragend",dragEnd);
        ul.addEventListener("dragover",dragOver);
        return li;
    }

//sorting functions
//     
    function sortTasks(){
        sortedBy = sortSelector.value;
        sortSelector.value = "priority";
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
            case "dragNdrop":
                listOfTasks.sort(sortByDragNdrop);
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
        else if(a.priority < b.priority)
            return 1;
        return 0;
    }

    function sortByDragNdrop(a,b){
        if(a.dragNdropIndex > b.dragNdropIndex){
            return 1;
        }else if(a.dragNdropIndex < b.dragNdropIndex){
            return -1;
        }
        return 0;
    }       

// JSONBIN functions  
//
    async function updateJsonbinStorage(){
        fetch('https://api.jsonbin.io/v3/b/6013f80a1de5467ca6bdcbd4',
            { method: 'PUT',
                headers: {'Content-Type': 'application/json','X-BIN-NAME': 'tomer-final-todo-list-project', 'X-Master-Key':'$2b$10$r0N4nxOcMRRmC99AgaIA.uT9Y.1OMVam6H4owoZdPjZ3ruVcBDy6u'},
                body: JSON.stringify({"my-todo": listOfTasks})
            });
    }
    
    async function getFromJsonbin(){
        const response = await fetch('https://api.jsonbin.io/v3/b/6013f80a1de5467ca6bdcbd4/latest',
            {method: 'GET',headers: {'Content-Type': 'application/json','X-BIN-NAME': 'tomer-final-todo-list-project', 'X-Master-Key':'$2b$10$r0N4nxOcMRRmC99AgaIA.uT9Y.1OMVam6H4owoZdPjZ3ruVcBDy6u'}});
        if(response.ok){
            const responseText = await response.json();
            let responseRecord = responseText["record"];
            listOfTasks = responseRecord["my-todo"];
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
    function deleteTask(){
        const li = this.closest("li");
        lastDeletedTask = getTaskFromListOfTask(li);
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

    function undoTask(){
        if(lastDeletedTask !== null){
            displayTask(lastDeletedTask);
            listOfTasks.push(lastDeletedTask);
            updateJsonbinStorage();
        }
        lastDeletedTask = null;
    }

    function taskCheck(){
        const li = this.closest("li");
        const task = getTaskFromListOfTask(li);
        if(task !== null){
            task.check = !task.check;
            li.classList.toggle("check");
        }
    }

    function taskEdit(){
        let li = this.closest("li");
        if(liEditClicked !== null){
            if(liEditClicked!==li){
                liEditClicked.classList.toggle("markEdit");
                updateButton.hidden = true;
            }else{
                liEditClicked.classList.toggle("markEdit");
                updateButton.hidden = true;
                changeInputLineToDefault();
                return;
            }
        }
        updateButton.hidden = !updateButton.hidden;
        li.classList.toggle("markEdit");
        liEditClicked = li;
        let task = getTaskFromListOfTask(li);
        input.value = task.text;
        prioritySelector.value = task.priority;
        categorySelector.value = task.category;
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
        liEditClicked.classList.toggle("markEdit");
        updateButton.hidden = true;
        changeInputLineToDefault();
    }

//drag & drop functions
//
    function dragStart(event){
        draggingLi = event.target;
        draggingLi.className = "dragging";
    }

    function dragEnd(){
        draggingLi.classList.remove("dragging");
        lastDraggedIndexUpdate();
        updateJsonbinStorage();
    }

    function dragOver(event){
        event.preventDefault();
        draggingY = event.clientY;
        const afterLi = getDraggedLiAfterLi(ul);
        if(afterLi === null){
            ul.append(draggingLi);
        }else{
            ul.insertBefore(draggingLi,afterLi);
        }
    }   

    function getDraggedLiAfterLi(ul){
        const draggableLi = [...ul.querySelectorAll("li:not(.dragging)")];
        return draggableLi.reduce(closestLi,{offset: Number.NEGATIVE_INFINITY}).element;

    }

    function closestLi(closest,child){
        const liContainer = child.getBoundingClientRect();
        const offset = draggingY - liContainer.top - liContainer.height/2;
        if(offset < 0 && offset > closest.offset){
            return {offset: offset, element: child};
        }else{
            return closest;
        }
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

    function changeInputLineToDefault(){
        input.value = "";
        prioritySelector.value = 1;
        liEditClicked = null;
        categorySelector.value = "general";
    }

    function lastDraggedIndexUpdate(){
        let liList = ul.querySelectorAll("li");
        let task;
        for(let i = 0; i < liList.length; i++){
            task = getTaskFromListOfTask(liList[i]);
            task.dragNdropIndex = i+1;
        }
    }
});     