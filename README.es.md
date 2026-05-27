# PCB Zoom 🔍📱

**PCB Zoom** es una aplicación móvil diseñada para ayudar a ingenieros, técnicos y entusiastas de la electrónica a utilizar la cámara de su teléfono móvil como un microscopio digital para la inspección y soldadura de placas electrónicas (PCB). Es la alternativa ideal para profesionales que no cuentan con un microscopio físico de laboratorio o que necesitan una solución portátil y accesible utilizando sus propios dispositivos.

---

## 🚀 Objetivo del Proyecto

El objetivo principal de **PCB Zoom** es democratizar el acceso a herramientas de inspección electrónica de alta calidad. Al montar un smartphone sobre un soporte o adaptador improvisado (o impreso en 3D), los usuarios pueden:
*   Visualizar a detalle soldaduras, pistas y componentes SMD microscópicos.
*   Transmitir el flujo de video en tiempo real a una pantalla externa (computadora, tablet) con baja latencia.
*   Aprovechar el procesamiento y capacidades de zoom óptico/digital de los smartphones modernos.

---

## 🛠️ Arquitectura y Tecnologías

Este proyecto se ha desarrollado como un monorepo utilizando herramientas modernas que garantizan una experiencia fluida y de muy baja latencia:

*   **Framework de la Aplicación:** [Expo](https://expo.dev/) (React Native) con **TypeScript** para un desarrollo ágil y tipado estático del frontend.
*   **Módulos Nativos de Alto Rendimiento:** [Nitro Modules](https://github.com/mrousavy/nitro) para una integración ultrarrápida e híbrida entre TypeScript y código nativo en C++.
*   **Servidor HTTP en C++:** Implementado localmente en el dispositivo mediante un Nitro Module personalizado para servir recursos o negociar la señalización.
*   **Transmisión WebRTC:** Conexión *peer-to-peer* directa utilizando la cámara del dispositivo móvil para transmitir video en tiempo real con latencia ultrabaja hacia navegadores web u otros clientes.
*   **Soporte de Plataformas:** Actualmente optimizado y disponible de forma exclusiva para **Android**.

---

## 📁 Estructura del Proyecto

Este monorepo utiliza workspaces gestionados por Bun:

```text
pcb-zoom/
├── mobile-app/                              # Aplicación móvil Expo en TypeScript
└── packages/
    ├── react-native-nitro-http/             # Nitro Module en C++ que ejecuta un servidor HTTP local
    └── react-native-webrtc/                 # Nitro Module y envoltorio para WebRTC nativo
```

---

## ⚡ Comenzar a Desarrollar

### Requisitos Previos

Asegúrate de tener instalado:
*   [Bun](https://bun.sh/) (gestor de paquetes recomendado para este monorepo)
*   Android SDK y herramientas de desarrollo para Android

### Instalación de Dependencias

Ejecuta el siguiente comando en la raíz del proyecto para instalar las dependencias de todos los workspaces:

```bash
bun install
```

### Ejecutar la Aplicación en Android

Para iniciar el servidor de desarrollo de Expo y desplegar la app en un emulador o dispositivo físico Android conectado:

```bash
# Iniciar el entorno de desarrollo y compilar en Android
bun --filter pcb-zoom android
```

O ingresando directamente al directorio de la aplicación:

```bash
cd mobile-app
bun run android
```

Para realizar una compilación local en modo debug:

```bash
cd mobile-app
bun run build:android
```

---

## 🤝 Contribuciones y Futuro del Proyecto

*   **Soporte para iOS:** Ampliar la compatibilidad de los módulos en C++ y las vistas de cámara nativas para iOS.
*   **Controles Avanzados de Cámara:** Implementar controles manuales nativos de exposición, balance de blancos, enfoque manual preciso y activación de flash/linterna a través de los Nitro Modules.

