# Node Crash Curse

Ejecutamos estos comandos en la raíz del proyecto.

```bash
node init
npm install --save-dev @types/node
# restart VS Code if not working
```

El primer comando crea el archivo de configuración _package.json_ que configura el entorno para que Node.js haga su trabajo como queremos.
Si queremos usar módulos ES6 en vez de Common JS, especificamos esto agregando al archivo de configuración la línea `"type": "modules"`

El segundo comando permite que VS Code nos dé sugerencias de autocompletado.

Se habrán creado muchos archivos en este punto. Para ignorarlos descargamos el archivos gitignore para Node.js.

## Entendiendo el módulo http

Esto es lo que necesitamos hacer:

- Inicializar servidor http.
- Ponerlo a la escucha de una de las interfaces y en uno de los puertos.
- Definir la función manejadora del evento de recibir una solicitud.
- Los objetos que la función manejadora recibe como argumentos, solicitud y respuesta, proveen respectivamente métodos para determinar la url y el método de la solicitud y para enviar contenido en el formato requerido.
- Dentro de la función manejadora tenemos que definir nosotros mismos la lógica del enrutamiento con una estructura switch que ejecute el código apropiado según la url del recurso solicitado.

Un sitio web pequeño puede ser desarrollado fácilmente de esta manera, lidiando con los problemas de bajo nivel con la librería http, pero se vuelve una pesadilla si queremos escalarlo a una web más grande y compleja.

## Express al rescate

Es bueno conocer el módulo http, pero usar un framework como express nos puede simplificar la vida. Express es un framework para backend. Esto es lo que sé que hace Express:

- Simplifica el enrutamiento con métodos como get, post, use...
- Permite registrar módulos (incorporarlo para su uso en el servidor) muy útiles sin esfuerzo, como EJS.

# Procesador de plantillas

EJS es un procesador de plantillas. EJS vuelve dinámico el contenido, es decir, inyecta datos o lógica con instrucciones en lenguaje JavaScript para generar el contenido que finalmente es servido en el navegador. Los datos se inyectan usando objetos que se pasan como argumentos en un método como `render()`. Con EJS tmmbién podemos definir contenido parcial.