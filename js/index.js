let comando;
const USUARIO = "Tutor";
const CLAVE = "9918";
let usuario = "";
let claveUsuario = ""

function consola() {
    let nombre = prompt("Cual es su nombre?");
    comando = prompt("\n-Ingresar a mi cuenta\n-Ver productos\n-Contactar al soporte\n-Salir");

    while (comando != "" || comando != "Salir") {
        switch (comando) {
            case "Ingresar a mi cuenta":
                usuario = prompt("Ingresar su usuario.");
                if (USUARIO == usuario) {
                    claveUsuario = Number(prompt("Ingrese su clave."));
                } else {
                    alert("El usuario " + usuario + " no existe.")
                }

                if (claveUsuario != "") {
                    if (CLAVE == claveUsuario) {
                        alert("Bienvenido " + usuario + " " + nombre);
                    } else {
                        alert("La contraseña es incorrecta.");
                    }
                }
                consola()
                break;
            case "Ver productos":
                for (let producto = 0; producto <= 5; producto++) {
                    alert ("Este es el producto Nro " + producto);
                }
                consola()
                break;
            case "Contactar al soporte":
                let mensaje = prompt("Escriba el mensaje que desea enviar al soporte.");
                if (mensaje != "") {
                    alert("El mensaje ha sido enviado con exito.");
                } else {
                    alert("El mensaje no ha sido enviado ya que la casilla esta vacia.");
                }
                consola()
                break;
                case "Salir":
                    alert ("Gracias por utilizar la consola.");
                    break;
            default:
                alert("El comando ingresado no existe.");
                consola()
                break;
        }
    }
}

consola()                   