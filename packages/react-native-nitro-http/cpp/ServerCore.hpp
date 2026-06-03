#pragma once

#include "RTCIceCandidateInfo.hpp"
#include "RTCSessionDescriptionInit.hpp"
#include "helpers.hpp"
#include "nlohmann/detail/macro_scope.hpp"
#include <android/log.h>
#include <atomic>
#include <httplib.h>
#include <nlohmann/json.hpp>
#include "html/index.hpp"
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

class ServerCore {
public:
  ServerCore() = default;

  void listen(int port);
  void stop();

  OfferCallback _offerCb;
  AnswerCallback _answerCb;
  IceCandidateCallback _candidateCb;

private:
  httplib::Server _srv;
  std::atomic<bool> _isRunning;

  void _setupRoutes();
};

extern ServerCore Server;
} // namespace margelo::nitro::nitrohttp
