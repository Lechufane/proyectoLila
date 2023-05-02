# Rest API con NodeJS para Lila Software

## Introduccion

En este projecto generamos diferentes endpoints para la creacion de jugadores y clanes, asi como demas funcionalidades especificadas en el enunciado del proyecto.
https://docs.google.com/document/d/1TDMMz4F0pckwyrsS4kqekr5wIEV6skJ0uZtnG-Km_Bc/edit#

La idea seria generar una base de datos con los jugadores y clanes, y poder realizar diferentes acciones sobre ellos:

- Crear un jugador
- Consultar los datos de un jugador
- Modificar los datos de un jugador
- Eliminar un jugador
- Simular un proceso de matchmaking
- Crear un clan
- Agregar un jugador a un clan
- Agregar un co lider a un clan
- Unirse a un clan con una contraseña

## Instalación.

1. Para generar el proyecto hay que clonar el repositorio y ejecutar el comando `npm install` para instalar las dependencias necesarias.
2. Luego hay que crear un archivo `.env` en la raiz del proyecto con las siguientes variables de entorno, recuerda nunca utilizar credenciales de producción para desarrollar.

---

### Variables de entorno

```
POSTGRES_USER //Usuario de la base de datos
POSTGRES_PASSWORD //Contraseña de la base de datos
POSTGRES_DB //Nombre de la base de datos
POSTGRES_PORT //Puerto de la base de datos, normalmente 5432
POSTGRES_HOST //Host de la base de datos, normalmente localhost para desarrollo local.
```

---

3. Luego hay que ejecutar el comando `npm run dev` para iniciar el servidor de desarrollo.

## Endpoints

Los endpoints disponibles son los siguientes:

### Jugadores

- `GET players/:id` : Obtiene los datos de un jugador por su id.

- `POST players/:id/matchmaking` : Simula un proceso de matchmaking para un jugador.

- `POST players/new` : Crea un jugador. Recibe un objeto con el valor name:

  ```
  {
      "name": "Nombre del jugador"
  }
  ```

- `PUT players/:id/update` : Modifica los datos de un jugador. Recibe un objeto cualquiera de los siguientes valores. Solo se puede utilizar este endpoint enviando un header especifico en la solicitud, el header es `x-api-key` y su valor es `lila`.

  ```
  {
      "name": "Nombre del jugador",
      "level": 0, //Nivel del jugador
      "rank": 0, //Rango del jugador
      "winrate": 0, //Porcentaje de victorias del jugador
  }
  ```

- `DELETE players/:id/delete` : Elimina un jugador. tambien requiere el header `x-api-key` con el valor `lila`.

### Clanes

```

Contraseñas de los clanes:

snakes:samurai25
dragon:anarquia04
bears:mustafa123

```

- `GET clans/:id` : Obtiene los datos de un clan segun el id del clan, incluyendo los jugadores que pertenecen a el.

- `POST clans/:id/create` : Crea un clan. Recibe un objeto con el valor `name` y `password`, el jugador que crea el clan pasa a tener dicho clan vinculado en la columna `clanId` de la base de datos y en el la tabla de clanes pasa a aparecer su nombre en la tabla `leader`.

  ```
  {
      "name": "Nombre del clan",
      "password": "Contraseña del clan"
  }
  ```

  ```

  ```

- `POST clans/:id/join` : Permita unirse a un clan con una contraseña. Recibe un objeto con el valor `password` y `name`, una vez en el clan en la base de datos el jugador recibira un valor en la columna `clanId` que corresponde al id del clan al que se unio.

  ```
  {
      "name": "Nombre del clan",
      "password": "Contraseña del clan"
  }
  ```

- `PUT clans/:id/co-leader` : Agrega un co-lider a un clan. Recibe un objeto con el valor `name`, el jugador que se agrega como co-lider pasa a tener dicho clan vinculado en la columna `clanId` de la base de datos y pasa a aparecer su nombre en la columna `coLeader` de la tabla `clans`. Se verifica si el jugador que realiza la solicitud es el lider del clan, en caso de no serlo se devuelve un error.

  ```
  {
      "name": "Nombre del jugador"
  }
  ```

---

### Informacion adicional:

```
Es importante destacar que al inicializar el proyecto se correra el script con la base de datos de prueba, la cual contiene 601 jugadores y 3 clanes, con el fin de poder probar los diferentes endpoints. Por eso si se desea cambiar los datos de prueba solo basta con cambiar el archivo seed.sql en la carpeta database con los datos que se deseen importar a la base de datos. Respetando siempre los modelos de datos de la base de datos.

Tambien es importante destacar que para poder utilizar los endpoints de modificacion y eliminacion de jugadores y clanes, es necesario enviar un header especifico en la solicitud, el header es `x-api-key` y su valor es `lila`.

Otra cosa importante es saber que sin un archivo seed en la carpeta database la base de datos sera creada sin ningun dato, se añade a la carpeta un archivo csv con datos de prueba para importar dentro de cualquier motor de bases de datos. Si se va a modificar el codigo y levantar el proyecto, es importante realizar una copia de seguridad de la base de datos para re-importarla cuando se termine de modificar el codigo, ya que al inicializar el proyecto se corre el script de creacion de la base de datos y se eliminan todos los datos que se encuentren en ella.
```

## Autor

[**Diego Villafañe**](https://www.diegovillafane.com/)
