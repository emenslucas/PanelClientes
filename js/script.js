// Elementos del DOM
const clientForm = document.getElementById('clientForm');
const companyNameInput = document.getElementById('companyName');
const ipAddressInput = document.getElementById('ipAddress');
const descriptionInput = document.getElementById('description');
const linkContainer = document.getElementById('linkContainer');
const searchInput = document.getElementById('searchInput');
const modal = document.getElementById("myModal");
const modalText = document.getElementById("modalText");
const closeModal = document.getElementsByClassName("close")[0];

// Cargar los clientes desde localStorage al iniciar la página
window.addEventListener("load", () => {
    const clients = JSON.parse(localStorage.getItem("clients")) || [];
    clients.forEach(addClientLink);
});

// Función para agregar un cliente al DOM y al localStorage
function addClientLink(clientData) {
    const linkItem = document.createElement("div");
    linkItem.classList.add("link-item");
    linkItem.style.position = "relative"; // Para posicionar el mensaje de forma absoluta

    const newLink = document.createElement("a");
    newLink.href = `http://${clientData.ip}:8080`;
    newLink.target = "_blank";
    newLink.textContent = clientData.name;

    const ipAddressContainer = document.createElement("p");
    ipAddressContainer.textContent = clientData.ip;
    ipAddressContainer.classList.add("ip-address");

    const copyMessage = document.createElement("span");
    copyMessage.classList.add("copy-message");
    copyMessage.style.position = "absolute"; // Para que no esté dentro del flujo normal del contenedor
    copyMessage.style.top = "-30px"; // Ajusta esta posición según tus necesidades
    copyMessage.style.left = "0";
    copyMessage.style.display = "none"; // Ocultar inicialmente
    copyMessage.style.backgroundColor = "#333"; // Estilo similar a un tooltip
    copyMessage.style.color = "#fff";
    copyMessage.style.padding = "5px";
    copyMessage.style.borderRadius = "3px";
    copyMessage.textContent = "Dirección IP copiada!";
    
    linkItem.appendChild(copyMessage); // Añadir mensaje al contenedor principal

    ipAddressContainer.addEventListener("click", () => {
        navigator.clipboard.writeText(clientData.ip).then(() => {
            copyMessage.style.display = "block"; // Mostrar mensaje
            setTimeout(() => {
                copyMessage.style.display = "none"; // Ocultar después de 2 segundos
            }, 2000);
        });
    });

    // SVG para el botón de eliminar
    const deleteSvg = ` 
    <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
<path opacity="0.2" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="#ef5b17"/>
<path d="M8.96967 8.96967C9.26256 8.67678 9.73744 8.67678 10.0303 8.96967L12 10.9394L13.9697 8.96969C14.2626 8.6768 14.7374 8.6768 15.0303 8.96969C15.3232 9.26258 15.3232 9.73746 15.0303 10.0304L13.0607 12L15.0303 13.9696C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0304 15.0303C9.73746 15.3232 9.26258 15.3232 8.96969 15.0303C8.6768 14.7374 8.6768 14.2626 8.96969 13.9697L10.9394 12L8.96967 10.0303C8.67678 9.73744 8.67678 9.26256 8.96967 8.96967Z" fill="#ef5b17"/>
</svg>`;

    // SVG para el botón de información
    const infoSvg = ` 
   <svg xmlns="http://www.w3.org/2000/svg" width="27px" height="27px" viewBox="0 0 24 24" fill="#ef5b17">
<path opacity="0.2" d="M12 21.5C17.1086 21.5 21.25 17.3586 21.25 12.25C21.25 7.14137 17.1086 3 12 3C6.89137 3 2.75 7.14137 2.75 12.25C2.75 17.3586 6.89137 21.5 12 21.5Z" stroke="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.9309 8.15005C12.9256 8.39231 12.825 8.62272 12.6509 8.79123C12.4767 8.95974 12.2431 9.05271 12.0008 9.05002C11.8242 9.04413 11.6533 8.98641 11.5093 8.884C11.3652 8.7816 11.2546 8.63903 11.1911 8.47415C11.1275 8.30927 11.1139 8.12932 11.152 7.95675C11.19 7.78419 11.278 7.6267 11.405 7.50381C11.532 7.38093 11.6923 7.29814 11.866 7.26578C12.0397 7.23341 12.2192 7.25289 12.3819 7.32181C12.5446 7.39072 12.6834 7.506 12.781 7.65329C12.8787 7.80057 12.9308 7.97335 12.9309 8.15005ZM11.2909 16.5301V11.1501C11.2882 11.0556 11.3046 10.9615 11.3392 10.8736C11.3738 10.7857 11.4258 10.7057 11.4922 10.6385C11.5585 10.5712 11.6378 10.518 11.7252 10.4822C11.8126 10.4464 11.9064 10.4286 12.0008 10.43C12.094 10.4299 12.1863 10.4487 12.272 10.4853C12.3577 10.5218 12.4352 10.5753 12.4997 10.6426C12.5642 10.7099 12.6143 10.7895 12.6472 10.8767C12.6801 10.9639 12.6949 11.0569 12.6908 11.1501V16.5301C12.6908 16.622 12.6727 16.713 12.6376 16.7979C12.6024 16.8828 12.5508 16.96 12.4858 17.025C12.4208 17.09 12.3437 17.1415 12.2588 17.1767C12.1738 17.2119 12.0828 17.23 11.9909 17.23C11.899 17.23 11.8079 17.2119 11.723 17.1767C11.6381 17.1415 11.5609 17.09 11.4959 17.025C11.4309 16.96 11.3793 16.8828 11.3442 16.7979C11.309 16.713 11.2909 16.622 11.2909 16.5301Z" fill="#ef5b17"/>
</svg>`;

    const deleteButton = createButton("delete-button", deleteSvg, () => {
        linkItem.remove();
        const clients = JSON.parse(localStorage.getItem("clients")) || [];
        const updatedClients = clients.filter(client => client.name !== clientData.name);
        localStorage.setItem("clients", JSON.stringify(updatedClients));
    });

    const infoButton = createButton("info-button", infoSvg, () => {
        showModal(`Descripción: ${clientData.desc}`);
    });

    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("subcontainerbtn");
    buttonsContainer.appendChild(infoButton);
    buttonsContainer.appendChild(deleteButton);

    const buttonAndIpContainer = document.createElement("div");
    buttonAndIpContainer.classList.add("containerbtn");
    buttonAndIpContainer.appendChild(ipAddressContainer);
    buttonAndIpContainer.appendChild(buttonsContainer);

    const contentContainer = document.createElement("div");
    contentContainer.style.display = "flex";
    contentContainer.style.flexDirection = "column-reverse";
    contentContainer.style.gap = "5px";

    contentContainer.appendChild(newLink);
    contentContainer.appendChild(buttonAndIpContainer);

    linkItem.appendChild(contentContainer);
    linkContainer.appendChild(linkItem);
}

// Función para crear botones con SVG
function createButton(className, svgContent, clickHandler) {
    const button = document.createElement("button");
    button.classList.add(className);
    button.innerHTML = svgContent;
    button.addEventListener("click", (event) => {
        event.stopPropagation();
        clickHandler();
    });
    return button;
}

// Evento para agregar un nuevo cliente
clientForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const companyName = companyNameInput.value.trim();
    const ipAddress = ipAddressInput.value.trim();
    const description = descriptionInput.value.trim();

    if (companyName && ipAddress) {
        const clientData = { name: companyName, ip: ipAddress, desc: description };
        const clients = JSON.parse(localStorage.getItem("clients")) || [];
        clients.push(clientData);
        localStorage.setItem("clients", JSON.stringify(clients));
        addClientLink(clientData);
        clientForm.reset();
    }
});

// Funcionalidad de búsqueda
searchInput.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase();
    const links = document.querySelectorAll(".link-item");

    links.forEach((linkItem) => {
        const linkText = linkItem.querySelector("a").textContent.toLowerCase();
        linkItem.style.display = linkText.includes(filter) ? "" : "none";
    });
});

// Funcionalidad del modal
function showModal(text) {
    modalText.textContent = text;
    modal.style.display = "flex";
}

closeModal.onclick = () => modal.style.display = "none";
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
