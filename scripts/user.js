const tableBody = document.getElementById("table-body")
const id = document.getElementById("txtId")
const nombre = document.getElementById("txtNombre")
const cedula = document.getElementById("txtCedula")

function deleteUsuarios(idUsuario){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "id": idUsuario
    });

    var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://gd257f4deb7943f-w8pshap38hsh0b25.adb.us-chicago-1.oraclecloudapps.com/ords/admin/usuarios/usuarios", requestOptions)
    .then(response => {
        if(response.status == 204){
            alert("El usuario se elmino")
            window.location.reload()
        }else{
            alert("El usuario no elimino")
        }
    })
    .catch(error => console.log('error', error));
}

function obtenerUsuarios(){
    var uri = "https://gd257f4deb7943f-w8pshap38hsh0b25.adb.us-chicago-1.oraclecloudapps.com/ords/admin/usuarios/usuarios"

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders
    };

    fetch(uri, requestOptions)
    .then(response => response.json())
    .then(result => {
        result.items.forEach(element => {
            tableBody.innerHTML += `<tr>
            <td>${element.id}</td>
            <td>${element.nombre}</td>
            <td>${element.cedula}</td>
            <td><button>Actualizar</button></td>
            <td><button onclick="deleteUsuarios(${element.id})">Eliminar</button></td>
            </tr>`
        });
    })
    .catch(error => console.log('error', error));
}

function crearUsuarios(){
    var uri = "https://gd257f4deb7943f-w8pshap38hsh0b25.adb.us-chicago-1.oraclecloudapps.com/ords/admin/usuarios/usuarios"

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var data = JSON.stringify({
    "id": id.value,
    "nombre": nombre.value,
    "cedula": cedula.value
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: data
    };

    fetch(uri, requestOptions)
    .then(response => {
        if(response.status == 201){
            alert("El usuario se creo")
        }else{
            alert("El usuario no creo")
        }
    })
    .catch(error => console.log('error', "Error creando el usuario"));
}

obtenerUsuarios()

/*
*/
