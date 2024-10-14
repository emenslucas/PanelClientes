// Cargar los clientes desde localStorage al iniciar la página
window.addEventListener("load", function () {
  const clients = JSON.parse(localStorage.getItem("clients")) || [];

  // Agregar cada cliente al contenedor
  clients.forEach((client) => {
    addClientLink(client);
  });
});

// Función para agregar un cliente al DOM y al localStorage
function addClientLink(clientData) {
  const linkItem = document.createElement("div");
  linkItem.classList.add("link-item");

  const newLink = document.createElement("a");
  newLink.href = `http://${clientData.ip}:8080`;
  newLink.target = "_blank";
  newLink.textContent = `${clientData.name}`;

  // Crear el contenedor para la IP
  const ipAddressContainer = document.createElement("p");
  ipAddressContainer.textContent = `${clientData.ip}`;
  ipAddressContainer.classList.add("ip-address");

  // Evento para copiar la IP al hacer clic
  ipAddressContainer.addEventListener("click", function () {
    navigator.clipboard.writeText(clientData.ip);
    alert("Dirección IP copiada: " + clientData.ip);
  });

  // Crear el botón de eliminar con SVG
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");

  deleteButton.innerHTML = `
    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="white"/>
      </g>
    </svg>
  `;

  // Evento de eliminación
  deleteButton.addEventListener("click", function (event) {
    event.stopPropagation(); // Evitar que el clic propague al enlace
    linkItem.remove(); // Eliminar el elemento

    const clients = JSON.parse(localStorage.getItem("clients")) || [];
    const updatedClients = clients.filter(
      (client) => client.name !== clientData.name
    );
    localStorage.setItem("clients", JSON.stringify(updatedClients));
  });

  // Crear el contenedor para la IP y el botón de eliminar en la misma línea
  const buttonAndIpContainer = document.createElement("div");
  buttonAndIpContainer.classList.add("containerbtn");
  buttonAndIpContainer.style.display = "flex";
  buttonAndIpContainer.style.justifyContent = "space-between";

  // Agregar IP y botón de eliminar al contenedor
  buttonAndIpContainer.appendChild(ipAddressContainer);
  buttonAndIpContainer.appendChild(deleteButton);

  // Crear un contenedor para colocar todo, con la IP y el botón arriba, y el link abajo
  const contentContainer = document.createElement("div");
  contentContainer.style.display = "flex";
  contentContainer.style.flexDirection = "column-reverse"; // Para que el link esté abajo
  contentContainer.style.gap = "5px";

  contentContainer.appendChild(newLink); // Agregar enlace al contenedor
  contentContainer.appendChild(buttonAndIpContainer); // Agregar el contenedor de IP y botón

  linkItem.appendChild(contentContainer);
  document.getElementById("linkContainer").appendChild(linkItem);
}



// Evento para agregar un nuevo cliente
document.getElementById("addLinkButton").addEventListener("click", function () {
  const companyName = document.getElementById("companyName").value;
  const ipAddress = document.getElementById("ipAddress").value;

  if (companyName !== "" && ipAddress !== "") {
    const clientData = { name: companyName, ip: ipAddress };

    // Agregar cliente al localStorage
    const clients = JSON.parse(localStorage.getItem("clients")) || [];
    clients.push(clientData);
    localStorage.setItem("clients", JSON.stringify(clients));

    // Agregar cliente al DOM
    addClientLink(clientData);

    // Limpiar los campos de entrada
    document.getElementById("companyName").value = "";
    document.getElementById("ipAddress").value = "";
  } else {
    alert("Por favor, ingrese el nombre de la empresa y la dirección IP.");
  }
});

// Funcionalidad de búsqueda
document.getElementById("searchInput").addEventListener("keyup", function () {
  const filter = this.value.toLowerCase();
  const links = document.querySelectorAll(".link-item");

  links.forEach((linkItem) => {
    const linkText = linkItem.querySelector("a").textContent.toLowerCase();
    if (linkText.includes(filter)) {
      linkItem.style.display = ""; // Mostrar el enlace
    } else {
      linkItem.style.display = "none"; // Ocultar el enlace
    }
  });
});
