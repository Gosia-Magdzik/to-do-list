{
    const tasks = [             
        {
            content: "iść na yogę",
            done: false,
        },
        {
            content: "iść z psem",
            done: true,
        },
    ];

    const render = () => {
        let htmlString = "";
        for (const task of tasks){
            htmlString += `
            <li>
              ${task.content}
            </li>
            `;
        }
        document.querySelector(".js-class").innerHTML = htmlString; 
    };
    
    const init = () => {
        render ();

    };
    init();
}