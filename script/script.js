document.getElementById('addTask').addEventListener('click', async () => {
    const taskTitle = document.getElementById('taskTitle').value;
    if (taskTitle.trim() === '') {
        alert('Digite uma tarefa válida!');
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/add_task', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: taskTitle }),
        });

        if (response.ok) {
            const task = await response.json();
            addTaskToUI(task);
            document.getElementById('taskTitle').value = '';
        } else {
            alert('Erro ao adicionar a tarefa!');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
});

function addTaskToUI(task) {
    const taskList = document.getElementById('taskList');
    const listItem = document.createElement('li');
    listItem.textContent = task.title;
    listItem.dataset.id = task.id;
    taskList.appendChild(listItem);
}

async function fetchTasks() {
    try {
        const response = await fetch('http://127.0.0.1:5000/get_tasks');
        if (response.ok) {
            const tasks = await response.json();
            tasks.forEach(addTaskToUI);
        } else {
            console.error('Erro ao obter tarefas!');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}


document.getElementById('addTask').addEventListener('click', async () => {
    console.log('Botão clicado');
    const taskTitle = document.getElementById('taskTitle').value;
});

fetchTasks();
