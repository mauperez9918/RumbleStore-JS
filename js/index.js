let comando;
const USUARIO = "Tutor";
const CLAVE = "9918";
let usuario = "";
let claveUsuario = ""

function consola() {
    let nombre = prompt("Bienvenido cual es tu nombre?");
    comando = prompt("Ingrese el numero de la opcion que desea:\n1- Ingresar a mi cuenta\n2- Ver productos\n3- Contactar al soporte\n4- Salir");

    while (comando != "" || comando != "Salir") {
        switch (comando) {
            case "1":
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
            case "2":
                for (let producto = 0; producto <= 5; producto++) {
                    alert ("Este es el producto Nro " + producto);
                }
                consola()
                break;
            case "3":
                let mensaje = prompt("Escriba el mensaje que desea enviar al soporte.");
                if (mensaje != "") {
                    alert("El mensaje ha sido enviado con exito.");
                } else {
                    alert("El mensaje no ha sido enviado ya que la casilla esta vacia.");
                }
                consola()
                break;
                case "4":
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