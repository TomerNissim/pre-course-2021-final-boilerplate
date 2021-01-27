document.addEventListener("DOMContentLoaded", function() {
    
    const viewSection = document.getElementById("viewSection");
    const button = document.getElementById("add-button");
    const input = document.getElementById("text-input");
    const prioritySelector = document.getElementById("priority-selector");
    let taskCounter = 0;
    button.addEventListener("click",addTask);

        function addTask(){
            const taskContainer = document.createElement("div");
            taskContainer.className = "todo-container";
            const date = 2000;
    
            const taskPriority = document.createElement("div");
            taskContainer.append(taskPriority);
            taskPriority.className = "todo-priority";
            taskPriority.innerText = prioritySelector.value;
    
            const taskCreationTime = document.createElement("div");
            taskContainer.append(taskCreationTime);
            taskCreationTime.className = "todo-created-at";
            taskCreationTime.innerText = date;
            
            const taskText = document.createElement("div");
            taskContainer.append(taskText);
            taskText.className = "todo-text";
            taskText.innerText = input.value;
            viewSection.append(taskContainer);
            input.value = "";
            taskCounter++;
        }
    
   // function convertDate(date){
  //      return date.toString().substr(16,5);
   // }



   /* function addTask(){
        const taskContainer = document.createElement("div");
        viewSection.append("taskContainer");
        taskContainer.className = "todo-container";
        const date = 2000;

        const taskPriority = document.createElement("div");
        taskContainer.append("taskPriority");
        taskPriority.className = "todo-priority";
        taskPriority.innerText = prioritySelector.value;

        const taskCreationTime = document.createElement("div");
        taskContainer.append("taskCreationTime");
        taskCreationTime.className = "todo-created-at";
        taskCreationTime.innerText = date;
        
        const taskText = document.createElement("div");
        taskContainer.append("taskText");
        taskText.className = "todo-text";
        taskText.innerText = input.value;

        taskCounter++;

    }*/





});
