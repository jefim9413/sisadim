document.addEventListener("DOMContentLoaded", function() {
  var lista = document.getElementById("minhaLista");
  var headers = {
    "Authorization": "Bearer " +  sessionStorage.getItem("token") 
  };
  verificarToken()

  fetch("https://api-sesadim.onrender.com/institution",{ headers: headers })
    .then(response =>  response.json())
    .then(data => {
      for (var i = 0; i < data.length; i++) {
        var item = document.createElement("li");
        var link = document.createElement("a");
        link.className = "btn btn-success btn-lg btn-tam";
        link.textContent = data[i].name;
        link.setAttribute("id", data[i].id);
        link.href = "institution.html";
        item.className = "mt-3 mb-3 d-flex justify-content-center btn-tam"; 
        item.appendChild(link);
        lista.appendChild(item);

        link.addEventListener("click", function(event) {
          var id = event.target.getAttribute("id");
          localStorage.setItem("id", id);
        });
      }
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
