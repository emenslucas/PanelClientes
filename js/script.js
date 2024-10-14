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

  // Crear el botón de info con SVG
  const infoButton = document.createElement("button");
  infoButton.classList.add("info-button");

  infoButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="-0.5 0 25 25" fill="none">
    <path d="M12 21.5C17.1086 21.5 21.25 17.3586 21.25 12.25C21.25 7.14137 17.1086 3 12 3C6.89137 3 2.75 7.14137 2.75 12.25C2.75 17.3586 6.89137 21.5 12 21.5Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path xmlns="http://www.w3.org/2000/svg" d="M12.9309 8.15005C12.9256 8.39231 12.825 8.62272 12.6509 8.79123C12.4767 8.95974 12.2431 9.05271 12.0008 9.05002C11.8242 9.04413 11.6533 8.98641 11.5093 8.884C11.3652 8.7816 11.2546 8.63903 11.1911 8.47415C11.1275 8.30927 11.1139 8.12932 11.152 7.95675C11.19 7.78419 11.278 7.6267 11.405 7.50381C11.532 7.38093 11.6923 7.29814 11.866 7.26578C12.0397 7.23341 12.2192 7.25289 12.3819 7.32181C12.5446 7.39072 12.6834 7.506 12.781 7.65329C12.8787 7.80057 12.9308 7.97335 12.9309 8.15005ZM11.2909 16.5301V11.1501C11.2882 11.0556 11.3046 10.9615 11.3392 10.8736C11.3738 10.7857 11.4258 10.7057 11.4922 10.6385C11.5585 10.5712 11.6378 10.518 11.7252 10.4822C11.8126 10.4464 11.9064 10.4286 12.0008 10.43C12.094 10.4299 12.1863 10.4487 12.272 10.4853C12.3577 10.5218 12.4352 10.5753 12.4997 10.6426C12.5642 10.7099 12.6143 10.7895 12.6472 10.8767C12.6801 10.9639 12.6949 11.0569 12.6908 11.1501V16.5301C12.6908 16.622 12.6727 16.713 12.6376 16.7979C12.6024 16.8828 12.5508 16.96 12.4858 17.025C12.4208 17.09 12.3437 17.1415 12.2588 17.1767C12.1738 17.2119 12.0828 17.23 11.9909 17.23C11.899 17.23 11.8079 17.2119 11.723 17.1767C11.6381 17.1415 11.5609 17.09 11.4959 17.025C11.4309 16.96 11.3793 16.8828 11.3442 16.7979C11.309 16.713 11.2909 16.622 11.2909 16.5301Z" fill="white"/>
    </svg>
  `;

  // Evento para mostrar la descripción
  infoButton.addEventListener("click", function () {
    alert(`Descripción: ${clientData.desc}`);
  });

  // Crear el contenedor para boton info y delete
  const buttonsContainer = document.createElement("div");
  buttonsContainer.appendChild(infoButton);
  buttonsContainer.appendChild(deleteButton);

  // Crear el contenedor para la IP y el botón de eliminar en la misma línea
  const buttonAndIpContainer = document.createElement("div");
  buttonAndIpContainer.classList.add("containerbtn");
  buttonAndIpContainer.style.display = "flex";
  buttonAndIpContainer.style.justifyContent = "space-between";
  buttonAndIpContainer.style.alignItems = "center";

  // Agregar IP y botón de eliminar al contenedor
  buttonAndIpContainer.appendChild(ipAddressContainer);
  buttonAndIpContainer.appendChild(buttonsContainer);

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
  const description = document.getElementById("description").value;
  console.log(description);

  if (companyName !== "" && ipAddress !== "") {
    const clientData = { name: companyName, ip: ipAddress, desc: description };

    // Agregar cliente al localStorage
    const clients = JSON.parse(localStorage.getItem("clients")) || [];
    clients.push(clientData);
    localStorage.setItem("clients", JSON.stringify(clients));

    // Agregar cliente al DOM
    addClientLink(clientData);

    // Limpiar los campos de entrada
    document.getElementById("companyName").value = "";
    document.getElementById("ipAddress").value = "";
    document.getElementById("description").value = "";
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
