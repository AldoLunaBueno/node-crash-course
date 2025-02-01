# node-crash-course

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
