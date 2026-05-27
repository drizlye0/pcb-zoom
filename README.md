# PCB Zoom 🔍📱

**PCB Zoom** is a mobile application designed to help engineers, technicians, and electronics enthusiasts use their mobile phone camera as a digital microscope for inspecting and soldering printed circuit boards (PCBs). It is the ideal alternative for professionals who do not have a physical laboratory microscope or need a portable, affordable solution using their own devices.

---

## 🚀 Project Goal

The main objective of **PCB Zoom** is to democratize access to high-quality electronic inspection tools. By mounting a smartphone on a stand or an improvised/3D-printed adapter, users can:
*   View solder joints, traces, and microscopic SMD components in high detail.
*   Stream the real-time video feed to an external screen (computer, tablet) with low latency.
*   Leverage the optical/digital zoom capabilities and processing power of modern smartphones.

---

## 🛠️ Architecture and Technologies

This project is developed as a monorepo using modern tools that ensure a smooth and ultra-low latency experience:

*   **Application Framework:** [Expo](https://expo.dev/) (React Native) with **TypeScript** for rapid development and static typing on the frontend.
*   **High-Performance Native Modules:** [Nitro Modules](https://github.com/mrousavy/nitro) for ultra-fast, hybrid integration between TypeScript and native C++ code.
*   **C++ HTTP Server:** Implemented locally on the device via a custom Nitro Module to serve resources or handle signaling.
*   **WebRTC Streaming:** Direct peer-to-peer connection utilizing the device's camera to stream real-time video with ultra-low latency to web browsers or other clients.
*   **Platform Support:** Currently optimized and exclusively available for **Android**.

---

## 📁 Project Structure

This monorepo uses workspaces managed by Bun:

```text
pcb-zoom/
├── mobile-app/                              # Expo mobile application in TypeScript
└── packages/
    ├── react-native-nitro-http/             # C++ Nitro Module running a local HTTP server
    └── react-native-webrtc/                 # Nitro Module and wrapper for native WebRTC
```

---

## ⚡ Getting Started

### Prerequisites

Make sure you have installed:
*   [Bun](https://bun.sh/) (recommended package manager for this monorepo)
*   Android SDK and development tools for Android

### Installation

Run the following command in the project root to install dependencies for all workspaces:

```bash
bun install
```

### Running the Application on Android

To start the Expo development server and deploy the app to a connected emulator or physical Android device:

```bash
# Start the development environment and compile for Android
bun --filter pcb-zoom android
```

Or by navigating directly to the application directory:

```bash
cd mobile-app
bun run android
```

To build a local debug APK:

```bash
cd mobile-app
bun run build:android
```

---

## 🤝 Contributions and Future Roadmap

*   **iOS Support:** Extend C++ module compatibility and native camera views to iOS.
*   **Advanced Camera Controls:** Implement native manual controls for exposure, white balance, precise manual focus, and torch/flashlight toggle via Nitro Modules.
