#pragma once

#include "HybridHttpServerSpec.hpp"
#include "RTCDescriptionInit.hpp"
#include "RTCIceCandidatesInit.hpp"
#include "SignalingCallbacks.hpp"
#include "nlohmann/detail/macro_scope.hpp"
#include <android/log.h>
#include <atomic>
#include <httplib.h>
#include <nlohmann/json.hpp>
#include <thread>

namespace margelo::nitro::nitrohttp {
using json = nlohmann::json;
using StatusCode = httplib::StatusCode;

NLOHMANN_DEFINE_TYPE_NON_INTRUSIVE(RTCDescriptionInit, sdp, type);
NLOHMANN_DEFINE_TYPE_NON_INTRUSIVE(
    RTCIceCandidatesInit, candidate, sdpMLineIndex, sdpMid, usernameFragment
);

class HybridHttpServer : public HybridHttpServerSpec {
public:
  HybridHttpServer(const SignalingCallbacks& callbacks);

  void listen(double port) override;
  void stop() override;

private:
  decltype(SignalingCallbacks::offerCb) _offerCb;
  decltype(SignalingCallbacks::answerCb) _answerCb;
  decltype(SignalingCallbacks::iceCandidatesCb) _iceCandidatesCb;

  httplib::Server _srv;
  std::atomic<bool> _isRunning;
  std::thread _serverThread;

  void _setupRoutes();
};
} // namespace margelo::nitro::nitrohttp
