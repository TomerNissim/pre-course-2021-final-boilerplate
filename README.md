# welcome to my Todo List project
In this project I created a Todo List Web Application, in which the user can store prioritized todo tasks and view/sort the task list. All the data is saved in "JSONbin.io" so you can access it from different browsers and places and all the data Will be saved.

## The structure of the Todo List
At the top you can see the header and below that is the number of tasks that you currently have in your Todo List.
below that you have the input fields and a few buttons that help you manage your ToDo list.
Below that you have the list section were all of your tasks will be displayed and of course a few more buttons and fetchers.

## Features and usage
Inside the Web application you can find a variety of features that will help you manage your tasks.

### Add task
In order to add a new task you may enter the task description in the input field, choose the priority of the task from 1-5, and the category of the task (General, Work or Family).
Click on the Add button and the task will be added to your Todo List.

### Edit task
In order to edit a task all you need to do is press the Edit button that is located on the right side of the task. The selected task will be marked with a blue border, the input fields above (task description, priority and category) will inherit the data from your task. Now all you have todo is make the relevant changes in the task and confirm the changes by pressing the "Confirm Update" button that is added on the left side of the Add button.
If you wish to exit Edit mode, without saving the changes, click on the Edit button again.

### Delete task and Undo button
To delete a task all you have to do is click the Delete button on the right side of the task that you want to delete.The last delete operation can be undone. To undo your task delete, click on the Undo button that is located on the Input line.

### Drag & drop
In order to organize your list you can simply drag a task and drop it in the new location inside the Todo List.
the newest order of the list will be saved under the drag & drop sort option so you can go back to it if you like even after you closed the browser(the data is saved inside the JASONbin.io storage).

### Sorting
By default, the Sort button (that is located next to the Add button) will sort your list by priority, ascending. Using the Sort By option, you can choose to sort your Todo list by date, by category or by drag & drop. After you choose the sort option, just press the Sort button.

### Task completed
Task is completed? congratulations! Double click anywhere on the task, text color will be change to green and a strike-through line will be added to signify that the task is completed. In order to remove it from the list you can just press the Delete button and the task will be deleted.



# ![Scale-Up Velocity](./readme-files/logo-main.png) Pre Course Project - Todo List 📋

This project will include most of the topics we have learnt so far.
This repository includes a basic skeleton template with automated tests, use it for your submissions.

In this project you will create a Todo List Web Application, in which the user can store prioritized _todo tasks_ and view/sort that list.

Here is a preview sample of the desired functionality (without styling):

![Add todo task](./readme-files/basic-todo.gif)

## Instructions

- Fork this repository into your account. Make sure to select the **public** option ⑂
- Clone your new repository to your computer 🖥
- Install the project dependencies by running `npm install` from the vscode terminal `ctrl + j` (make sure you are in the correct directory) 📂
<!-- - [Create new branch](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/managing-branches) -->
- Make changes to the code to meet the project requirements 📝
- [Commit Early, Push Often](https://www.worklytics.co/commit-early-push-often/) - your work will be evaluated by your push history 📖
- Good Luck! 🤘

## Running tests

We have created automated tests for your convenience, use it to check your progression.

Note that the automated tests rely on your code having the exact class names, Ids and objects structures as specified below.

To run the tests locally simply run `npm run test` in the terminal

Note that each commit to `main` branch will trigger a github [action](https://docs.github.com/en/actions). You can easily see the action tests result on each commit:

![Commits test](./readme-files/commit-tests.png)

## Guidelines

- The Todo list should have two sections: _Control_ section and _View_ section
- The _Control_ section is where the user adds his todo task and priority, and should have three elements:
  - [\<input\>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) with id `text-input`.
  - [\<select\>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) with id `priority-selector` (options will be: 1-5).
  - [\<button\>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) with id `add-button`.
- The _View_ section is where we display the list of added todo tasks and data. The list should start empty and each added todo should be inserted to the end of the list.
- After the user clicks on the 'add' button, the todo input field should be "reset"
- Every todo item should have a "container" div with class `todo-container` that will contain 3 sub-elements:

  - An element with a class `todo-text` with the text of the todo task
  - An element with a class `todo-created-at` that will hold the creation time of the task in a [SQL format](https://www.w3schools.com/sql/sql_dates.asp#:~:text=SQL%20Date%20Data%20Types&text=DATE%20%2D%20format%20YYYY%2DMM%2D,YEAR%20%2D%20format%20YYYY%20or%20YY)
  - An element for showing the numeric priority value of the task, with a class `todo-priority`

  Good way 👍🏿:

  ```
    <div class="todo-container">
      <div class="todo-priority">
        1
      </div>
      <div class="todo-created-at">
        2020-06-18 11:51:12
      </div>
      <div class="todo-text">
        the todo text
      </div>
    </div>
  ```

  Bad way 👎🏿:

  ```
    <div class="todo-container">
      <div class="todo-priority">
        1
      </div>
      <div class="todo-created-at">
        2020-06-18 11:51:12
      </div>
      <div class="todo-text">
        <span>the todo text</span>
      </div>
    </div>
  ```

- Add a counter element to reflect the **current** number of todos stored in the app. This element should have an id of `counter`.

- Add a button with id `sort-button`. Clicking this element should resort the todo list by their todos priority (DESC)

  ![alt text](./readme-files/todo.gif)

- **Make your todo-list persistent!**

  Save your todo-list as JSON (see `todo-list-example.json`) and store it in a persistent way, you have to options:

  1. Use the `localStorage` browser api to save / load the todo-list JSON **with the 'my-todo' key**. This option will make it persist between _page reloads_.

  2. Use the [jsonbin.io](https://jsonbin.io/) service api (using async/await fetch GET & PUT requests) to save / load your todo-list JSON. This option will make it persist across _devices and browsers_.

**Note** You can add extra properties to the todo objects in the JSON that you want to be persistent.

## Bonus

- jsonbin.io - see explanation above
- Freestyle - add any feature you desire. Some ideas:
  - [drag n' drop functionality](https://htmldom.dev/drag-and-drop-element-in-a-list)
  - Delete + Edit a todo
  - Undo action
  - Search and highlight results
  - Loading spinner for network request
  - Mark/Unmark todo as done
  - Something awesome we didn't think of...
- For added value, you can add jest/puppeteer test to test any bonus feature you implemented

**Add an explanation in `README.md` for each bonus feature you add and a link to any resoure you used**

## Grading policy

- Your project will be graded by the number of automatic tests you pass
- Using jsonbin.io
- Extra freestyle features - Please add an explanation about the bonus features you added to the readme.md
- new jest/puppeteer test
- Code quality and style: indentation, Meaningful and non-disambiguate variable names, Comments documentation
- Visual creativity, use css to make this app look awesome 💅🏿
- Division to reusable functions, no code duplication
- Git usage: meaningful commit messages, small commits, folder and file structures

## Submitting

- Change this file (README.md) and style it to showcase your solution (gifs, explanations, link to the github page, links to resources you used, etc...)
- Submit your solution repo to the [ChallengeMe](http://challengeme.suvelocity.org/) system
- Submit your repo link and github page and video to Google Classroom
- Record a 5-10 min selfie video, describe yourself in a few words (age, location, military background, technological background). Also, talk about the solution you submitted (try to explain how your app works in general and which bonuses you added). Think about this video as an interview.

GOOD LUCK!
