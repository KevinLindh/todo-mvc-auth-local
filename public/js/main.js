const addFriendList = document.querySelector(".addFriendList");
const friendList = document.querySelector(".friendList");

addFriendList.addEventListener("click", async (event) => {
  if (event.target.classList.value === "addFriendBtn") {
    const newFriendId = event.target.parentElement.dataset.friendid;

    console.log(newFriendId);

    const body = { id: newFriendId };

    const response = await fetch("/friendlist/addfriend", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      location.reload();
    }
  } else if (event.target.classList.value === "removeFriendBtn") {
    const newFriendId = event.target.parentElement.dataset.friendid;

    console.log(newFriendId);

    const body = { id: newFriendId };

    const response = await fetch("/friendlist/deleteFriend", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      location.reload();
    }
  }
});

friendList.addEventListener("click", async (event) => {
  if (event.target.classList.value === "pokeFriendBtn") {
    const newPokeId = event.target.parentElement.dataset.friendid;
    const body = { id: newPokeId };

    const response = await fetch("friendlist/pokefriend", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      location.reload();
    }
  }
});

// const deleteBtn = document.querySelectorAll(".del");
// const todoItem = document.querySelectorAll("span.not");
// const todoComplete = document.querySelectorAll("span.completed");

// Array.from(deleteBtn).forEach((el) => {
//   el.addEventListener("click", deleteTodo);
// });

// Array.from(todoItem).forEach((el) => {
//   el.addEventListener("click", markComplete);
// });

// Array.from(todoComplete).forEach((el) => {
//   el.addEventListener("click", markIncomplete);
// });

// async function deleteTodo() {
//   const todoId = this.parentNode.dataset.id;
//   try {
//     const response = await fetch("todos/deleteTodo", {
//       method: "delete",
//       headers: { "Content-type": "application/json" },
//       body: JSON.stringify({
//         todoIdFromJSFile: todoId,
//       }),
//     });
//     const data = await response.json();
//     console.log(data);
//     location.reload();
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function markComplete() {
//   const todoId = this.parentNode.dataset.id;
//   try {
//     const response = await fetch("todos/markComplete", {
//       method: "put",
//       headers: { "Content-type": "application/json" },
//       body: JSON.stringify({
//         todoIdFromJSFile: todoId,
//       }),
//     });
//     const data = await response.json();
//     console.log(data);
//     location.reload();
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function markIncomplete() {
//   const todoId = this.parentNode.dataset.id;
//   try {
//     const response = await fetch("todos/markIncomplete", {
//       method: "put",
//       headers: { "Content-type": "application/json" },
//       body: JSON.stringify({
//         todoIdFromJSFile: todoId,
//       }),
//     });
//     const data = await response.json();
//     console.log(data);
//     location.reload();
//   } catch (err) {
//     console.log(err);
//   }
// }
