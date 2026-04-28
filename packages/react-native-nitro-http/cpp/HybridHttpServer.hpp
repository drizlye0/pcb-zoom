#pragma once

#include "HybridHttpServerSpec.hpp"
#include <atomic>
#include <httplib.h>
#include <thread>

namespace margelo::nitro::nitrohttp {
class HybridHttpServer : public HybridHttpServerSpec {
public:
  HybridHttpServer() : HybridObject(TAG) {}

  void listen(double port) override;
  void stop() override;

private:
  httplib::Server _srv;
  std::atomic<bool> _isRunning;
  std::thread _serverThread;
};
} // namespace margelo::nitro::nitrohttp
