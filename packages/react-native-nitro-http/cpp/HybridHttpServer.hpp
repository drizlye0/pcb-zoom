#pragma once

#include "HybridHttpServerSpec.hpp"
#include "RTCIceCandidateInfo.hpp"
#include "RTCSessionDescriptionInit.hpp"
#include "SignalingCallbacks.hpp"
#include "nlohmann/detail/macro_scope.hpp"
#include <android/log.h>
#include <atomic>
#include <httplib.h>
#include <nlohmann/json.hpp>
#include <thread>
#include <variant>

namespace margelo::nitro::nitrohttp {
using json = nlohmann::json;
using StatusCode = httplib::StatusCode;

inline void to_json(json& j, const RTCSessionDescriptionInit& descInit) {
  std::string type = "";

  if(auto *s = std::get_if<std::string>(&descInit.type.value())) {
    type = *s;
  }
  
  j = json{
    {"sdp", descInit.sdp},
    {"type", type}
  };
}

inline void from_json(const json& j, RTCSessionDescriptionInit& descInit) {
  std::string type = "";
  j.at("sdp").get_to(descInit.sdp);
  j.at("type").get_to(type);
  descInit.type.value().emplace<std::string>(type);
}

// NLOHMANN_DEFINE_TYPE_NON_INTRUSIVE(RTCSessionDescriptionInit, sdp, type);
NLOHMANN_DEFINE_TYPE_NON_INTRUSIVE(RTCIceCandidateInfo, candidate, sdpMLineIndex, sdpMid);

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
