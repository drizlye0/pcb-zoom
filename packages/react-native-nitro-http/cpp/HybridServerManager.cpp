#include "HybridServerManager.hpp"
#include "HybridHttpServer.hpp"
#include "SignalingCallbacks.hpp"
#include <memory>

namespace margelo::nitro::nitrohttp {
std::shared_ptr<HybridHttpServerSpec>
HybridServerManager::createSignalingServer(const SignalingCallbacks& callbacks) {
  auto signalingServer = std::make_shared<HybridHttpServer>(callbacks);
  return signalingServer;
}
} // namespace margelo::nitro::nitrohttp
