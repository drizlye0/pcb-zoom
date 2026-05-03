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
  j["sdp"] = descInit.sdp;

  if (!descInit.type.has_value()) {
    j["type"] = nullptr;
    return;
  }

  const auto& var = descInit.type.value();
  if (std::holds_alternative<nitro::NullType>(var)) {
    j["type"] = nullptr;
  } else if (const auto* s = std::get_if<std::string>(&var)) {
    j["type"] = *s;
  }
}

inline void from_json(const json& j, RTCSessionDescriptionInit& descInit) {
  j.at("sdp").get_to(descInit.sdp);

  if (!j.contains("type")) {
    descInit.type = std::nullopt;
    return;
  }

  const auto& t = j.at("type");
  if (t.is_null()) {
    descInit.type = std::variant<nitro::NullType, std::string>{nitro::NullType{}};
  } else {
    descInit.type = std::variant<nitro::NullType, std::string>{t.get<std::string>()};
  }
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
