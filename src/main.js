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

    spanCounter.innerText = taskCounter ;
    addButton.addEventListener("click",addTask);
    sortButton.addEventListener("click",sortTasks) 

    function sortTasks(){
        listOfTasks.sort(sortByPriority);
        for(let i = 0; i < listOfTasks.length; i++){
           ul.removeChild(listOfTasks[i].li);
        }
        for(let i = 0; i < listOfTasks.length; i++){
            ul.append(listOfTasks[i].li);
         }
    }
   // =  listOfTasks[i].li;
    function addTask(){
        const date = sqlFormatDate(new Date);
        const task = createTaskObject(date);
        const li = createHtmlTags(task);
        task.li = li;
        ul.append(li)
        console.log(listOfTasks);
        input.value = "";
        spanCounter.innerText = ++taskCounter ;
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
        li.append(taskContainer);
        return li;
    }

    

    function createTaskObject(creationDate){
        const task = {priority: prioritySelector.value,
            date: creationDate,
            description: input.value,
            index: taskIndex++
        };
        listOfTasks.push(task);
        return task;
    }
      
    function sqlFormatDate(date){
        date = date.toISOString();
        date = date.slice(0,19);
        date = date.replace("T"," ");
        return date;
    }

});
