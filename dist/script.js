function submit() {
  const fileField = document.querySelector("#avater");
  const formData = new FormData();
  console.log(fileField.files[0]);
  //formData.append('avater',fileField.files[0]);
  fetch("api/client/v1/reviews", {
    method: "PUT", // or 'PUT'
    body: JSON.stringify({
      name: "Abhishek",
      file: JSON.stringify(fileField.files[0]),
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Success:", result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
