#pragma once

#include "HybridServerManagerSpec.hpp"
#include "SignalingCallbacks.hpp"
#include <memory>

namespace margelo::nitro::nitrohttp {
class HybridServerManager : public HybridServerManagerSpec {
public:
  HybridServerManager() : HybridObject(TAG) {}

  std::shared_ptr<HybridHttpServerSpec>
  createSignalingServer(const SignalingCallbacks& callbacks) override;
};
} // namespace margelo::nitro::nitrohttp
