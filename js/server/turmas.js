document.addEventListener("DOMContentLoaded", function() {
  var container = document.getElementById("container");

  var headers = {
    "Authorization": "Bearer " +  sessionStorage.getItem("token") 
  };
  verificarToken()
  
  fetch("https://api-sesadim.onrender.com/turma/" + sessionStorage.getItem("id"), { headers: headers })
    .then(response =>  response.json())
    .then(data => {
      var rowDiv = document.createElement("div");
      rowDiv.className = "row justify-content-center"; 

      for (var i = 0; i < data.length; i++) {
          var colDiv = document.createElement("div");
          colDiv.className = "col m-1 op1";

          var justifyDiv = document.createElement("div");
          justifyDiv.className = "d-flex justify-content-center";

          var link = document.createElement("a");
          link.className = "btn shadow-none";
          link.href = data[i].database;
          link.target = "_blank";

          var img = document.createElement("img");
          img.className = "img-fluid custom-img"
          img.src = "/imagens/" + data[i].name + ".png";
          
          var h4 = document.createElement("h4");
          h4.className = "btn btn-success d-flex justify-content-center";
          h4.textContent = "Consultar"

          link.appendChild(img);
          link.appendChild(h4);

          justifyDiv.appendChild(link);
          colDiv.appendChild(justifyDiv);
          rowDiv.appendChild(colDiv);

      }

      container.appendChild(rowDiv);
    })
    .catch(error => {
      console.error("Ocorreu um erro na requisição:", error);
    });
});


function verificarToken() {
  var token = sessionStorage.getItem("token");
  if (!token) {
    // Redirecionar para a página de login
    window.location.href = "index.html";
  }
}
