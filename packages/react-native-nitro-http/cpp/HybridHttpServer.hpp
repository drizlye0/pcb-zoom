#pragma once

#include "HybridHttpServerSpec.hpp"

namespace margelo::nitro::nitrohttp {
class HybridHttpServer : public HybridHttpServerSpec {
public:
  HybridHttpServer() : HybridObject(TAG) {}

  void start(double port) override;
  void stop() override;
};
}
