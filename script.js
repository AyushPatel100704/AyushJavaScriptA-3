document.addEventListener("DOMContentLoaded", () => {

    // Load the ding sound
    const dingSound = new Audio('ding.wav'); //  ding.wav file for sound effect
  
    // Get the necessary DOM elements
    const addButton = document.getElementById("add-button");
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");
    const completedCount = document.getElementById("completed-count");
  
    let tasksCompleted = 0;
  
    // Update the completed tasks count
    function updateCompletedCount() {
      completedCount.textContent = `Tasks Completed: ${tasksCompleted}`;
    }
  
    // Add an event listener to the Add button
    addButton.addEventListener("click", () => {
      const taskText = todoInput.value.trim();
  
      // Check if the input is not empty
      if (taskText !== "") {
        const todoItem = document.createElement("li");
        todoItem.className = "todo-item";
  
        // Create a checkbox for the task
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
  
        // Create a span to hold the task text
        const taskSpan = document.createElement("span");
        taskSpan.textContent = taskText;
  
        // Create a delete button
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Delete";
  
        // Append the checkbox, task text, and delete button to the task item
        todoItem.appendChild(checkbox);
        todoItem.appendChild(taskSpan);
        todoItem.appendChild(deleteButton);
  
        // Append the new task item to the to-do list
        todoList.appendChild(todoItem);
  
        // Clear the input field
        todoInput.value = "";
  
        // Play the sound immediately after adding the task
        dingSound.play().catch(error => {
          console.error("Error playing sound when adding task:", error);
        });
  
        // Add an event listener to the checkbox for completing tasks
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) {
            todoItem.classList.add("done");
  
            tasksCompleted += 1;
            updateCompletedCount();
  
            dingSound.play().catch(error => {
              console.error("Error playing sound on checkbox:", error);
            });

            todoItem.style.transition = "background-color 0.5s ease";
            todoItem.style.backgroundColor = "#b6c5d3"; 
  

            todoList.appendChild(todoItem);
          } else {
            todoItem.classList.remove("done");
            todoItem.style.backgroundColor = ""; 

            tasksCompleted -= 1;
            updateCompletedCount();
          }
        });
  
        // Add an event listener to the delete button for removing tasks
        deleteButton.addEventListener("click", () => {
          // Animate the task fading to red before removal
          todoItem.style.transition = "background-color 0.5s ease, opacity 0.5s ease";
          todoItem.style.backgroundColor = "#f8d7da"; 
          todoItem.style.opacity = "0"; 
  
          // Remove the item after the fade-out animation completes
          setTimeout(() => {
            todoList.removeChild(todoItem);
            if (todoItem.classList.contains("done")) {
              tasksCompleted -= 1;
              updateCompletedCount();
            }
          }, 500); 
        });
      }
    });
  });