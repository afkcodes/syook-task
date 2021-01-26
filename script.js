// selectors
const taskTitleInput = document.querySelector("#task_title_input");
const taskDescInput = document.querySelector("#task_desc_input");
const taskCreateBtn = document.querySelector("#task_create_btn");
const taskList = document.querySelector("#task_list");

// listeners
taskCreateBtn.addEventListener("click", function (event) {
  createOrUpdateTask(event, "create");
});
const tasks = [];

function createUid() {
  return (
    Math.random().toString(36).substring(2) + new Date().getTime().toString(36)
  );
}

function render() {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    addTask(task);
  });
}

function createOrUpdateTask(event, type, taskTitle) {
  event.preventDefault();
  const title = taskTitleInput.value;
  const desc = taskDescInput.value;
  if (type === "create") {
    if (title === "" || desc === "") {
      console.log("title or desc empty returning");
      return;
    } else {
      const found = tasks.some((el) => el.title === title);
      if (!found) {
        const task = {
          uid:createUid(),
          title,
          desc,
        };
        tasks.push(task);
        render();
      } else {
        console.log("-------->", tasks);
        alert('Duplicate Task');
      }
    }
  } else {
    tasks.splice(
      tasks.findIndex(function (task) {
        return task.title === taskTitle;
      }),
      1
    );
  }
}

// functions
function addTask(task) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  console.log("calling aDDtask");

  const taskTitle = document.createElement("li");
  taskTitle.innerText = task.title;
  taskTitle.classList.add("task_title");
  taskDiv.appendChild(taskTitle);

  const taskDesc = document.createElement("li");
  const desc = document.createElement("p");
  desc.innerText = task.desc;
  taskDesc.appendChild(desc);
  taskDesc.classList.add("task_desc");
  taskDiv.appendChild(taskDesc);

  //   Edit
  const btnContainer = document.createElement("div");
  btnContainer.classList.add("task_action_btn");
  const editButton = document.createElement("button");
  editButton.innerHTML = '<i class="far fa-edit"></i>';
  editButton.classList.add("edit_btn", "btn_action");
  btnContainer.appendChild(editButton);

  //   Delete
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="far fa-trash-alt"></i>';
  deleteButton.classList.add("delete_btn", "btn_action");
  btnContainer.appendChild(deleteButton);

  taskDiv.appendChild(btnContainer);
  taskList.appendChild(taskDiv);
  taskTitleInput.value = "";
  taskDescInput.value = "";
  taskCreateBtn.innerText = "Create";
}

taskList.addEventListener("click", deleteTask);
taskList.addEventListener("click", editTask);

function deleteTask(e) {
  const item = e.target;
  if (item.classList[0] === "delete_btn") {
    const task = item.parentElement.parentElement;
    task.classList.add("deleted");
    task.addEventListener("transitionend", function () {
      task.remove();
      tasks.splice(
        tasks.findIndex(function (delted_task) {
          return delted_task.title === task.querySelector(".task_title").innerText;
        }),
        1
      );
    });
  }
}

function editTask(e) {
  const item = e.target;
  if (item.classList[0] === "edit_btn") {
    const task = item.parentElement.parentElement;
    taskTitleInput.value = task.querySelector(".task_title").innerText;
    taskDescInput.value = task.querySelector(".task_desc").innerText;
    taskCreateBtn.innerText = "Update";
    createOrUpdateTask(
      e,
      "update",
      task.querySelector(".task_title").innerText
    );
  }
}
