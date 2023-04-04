const newPostHandler = async (event) => {
  event.preventDefault();

  // Collect values from new post form
  const title = document.querySelector("#new-post-title").value.trim();
  const content = document.querySelector("#new-post-content").value.trim();

  // Send a POST request to the API endpoint
  const response = await fetch(`/api/post`, {
    method: "POST",
    body: JSON.stringify({ title, content }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    // If successful, redirect browser to new post page
    document.location.replace("/");
  } else {
    alert("Cannot add post");
  }
};


const deleteFormHandler = async (event) => {
  event.preventDefault();
  console.log("here again");

  const id = event.target.getAttribute("data-id");
  console.log(id);
  const response = await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
  document.location.replace("/");
  } else {
    alert(response.statusText);
  }
}

const deleteButtons = document.querySelectorAll(".delete-btn");
deleteButtons.forEach((button) => {
  button.addEventListener("click", deleteFormHandler);
});

document
  .querySelector("#new-post-form")
  .addEventListener("submit", newPostHandler);
