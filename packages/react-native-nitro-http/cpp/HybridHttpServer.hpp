#pragma once

#include "HybridHttpServerSpec.hpp"
#include "nlohmann/detail/macro_scope.hpp"
#include <android/log.h>
#include <atomic>
#include <httplib.h>
#include <nlohmann/json.hpp>
#include <thread>

namespace margelo::nitro::nitrohttp {
using json = nlohmann::json;

class Offer {
public:
  std::string sdp;
  std::string type;
};

NLOHMANN_DEFINE_TYPE_NON_INTRUSIVE(Offer, sdp, type);

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
