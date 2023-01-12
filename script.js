{
    let tasks = [];
    let hideDoneTasks = false; 

    const addNewTask = (newTaskContent) => {
        tasks = [...tasks, 
                {content: newTaskContent}];                 
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex +1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
             ...tasks[taskIndex],
             done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex +1),  
        ];
        render();
    };

    const markAllDone = () => {

        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render ();
    };

    const hideDone = () => {
        hideDoneTasks = !hideDoneTasks;
        render ();
    };


    const removeButtonsEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
        removeButton.addEventListener("click", () => {
            removeTask(index);
            });
        });
    };

    const toggleDoneButtonsEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

     

    const bindEvents = () => {
        removeButtonsEvents();
        toggleDoneButtonsEvents();
    };
    

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="list__items ${task.done && hideDoneTasks ? "list__items--hidden" : "list__items"}">
                    <button class="list__button list__button--done js-done">
                        ${task.done ? "✔" : ""}
                    </button>
                            <span class="list__task ${task.done ? "list__task--done" : ""}">
                                ${task.content}
                            </span>
                    <button class="list__button list__button--remove js-remove">
                        🗑
                    </button>
                </li>
            `;
        };
        document.querySelector(".js-list").innerHTML = htmlString;
    };
    const renderButtons = () => { 
        const buttonElement = document.querySelector("js-taskButtons")

        if (!tasks.length) {
            buttonElement.innerHTML = "";
            return;
        };

        buttonElement.innerHTML = `
        <button class = "js-hideDone">
            ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button class = "js-markAllTasksDone"
        ${tasks.every(({done}) => done) ? "disabled" : ""}>
            Ukończ wszystkie
        </button>
        `;
    };  

    const bindButtonsEvents = () => { 
        
        const hideDoneButton = document.querySelector(".js-hideDone")
        
        if (hideDoneButton) {
            hideDoneButton.addEventListener("click", () => {
                hideDone();
            })
        }

        const hideDoneTasksButton = document.querySelector(".js-hideDoneTasks")
        if (hideDoneTasks) {
            hideDoneTasks.addEventListener("click", () => {
                hideDoneTasks();
            })
        }
    }; 

    const render = () => { 
        renderTasks ();
        renderButtons ();

        bindEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask")
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }
        newTaskContent.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };
    init();

}