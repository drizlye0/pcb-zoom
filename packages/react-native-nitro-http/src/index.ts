import { NitroModules } from "react-native-nitro-modules";
import type { HttpServer } from "./specs/HttpServer.nitro";

export const HybridHttpServer = NitroModules.createHybridObject<HttpServer>("HttpServer")
