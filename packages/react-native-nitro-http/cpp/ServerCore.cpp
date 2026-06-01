#include "ServerCore.hpp"
#include <NitroModules/HybridObject.hpp>
#include <android/log.h>

namespace margelo::nitro::nitrohttp {
void ServerCore::_setupRoutes() {
  _srv.set_post_routing_handler([](const httplib::Request&, httplib::Response& res) {
    res.set_header("Access-Control-Allow-Origin", "*");
    res.set_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.set_header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  });

  _srv.Options(R"(.*)", [](const httplib::Request&, httplib::Response& res) {
    __android_log_print(ANDROID_LOG_INFO, "NitroHttp", "Options");
    res.status = StatusCode::OK_200;
  });

  _srv.Get("/health", [](const httplib::Request&, httplib::Response& res) {
    __android_log_print(ANDROID_LOG_INFO, "NitroHttp", "GET /");
    res.set_content("Hello, world from http server written on c++", "text/plain");
  });

  _srv.Get("/offer", [this](const httplib::Request&, httplib::Response& res) {
    __android_log_print(ANDROID_LOG_INFO, "NitroHttp", "GET /offer");
    res.set_content("Hello, world from http server written on c++", "text/plain");
    auto promise = _offerCb();
    auto offer = promise->await().get();

    json payload = offer;
    res.set_content(payload.dump(), "application/json");
    res.status = StatusCode::OK_200;
  });

  _srv.Post("/answer", [this](const httplib::Request& req, httplib::Response& res) {
    __android_log_print(ANDROID_LOG_INFO, "NitroHttp", "POST /answer");
    auto contentType = req.get_header_value("Content-Type");
    if(contentType.find("application/json") == std::string::npos) {
      res.status = StatusCode::BadRequest_400;
      return;
    }

    RTCSessionDescriptionInit answer = {};
    try {
      json payload = json::parse(req.body);
      answer = payload.get<RTCSessionDescriptionInit>();
    } catch (std::exception e) {
    __android_log_print(ANDROID_LOG_ERROR, "NitroHttp", "Error Parsing json: %s", e.what());
      res.status = StatusCode::InternalServerError_500;
      return;
    }

    _answerCb(answer);
    res.status = StatusCode::Accepted_202;
  });

  _srv.Post("/icecandidates", [this](const httplib::Request& req, httplib::Response& res) {
    __android_log_print(ANDROID_LOG_INFO, "NitroHttp", "POST /icecandidates");
    auto contentType = req.get_header_value("Content-Type");
    if(contentType.find("application/json") == std::string::npos) {
      res.status = StatusCode::BadRequest_400;
      return;
    }

    std::vector<RTCIceCandidateInfo> iceCandidates = {};
    try {
      json payload = json::parse(req.body);
      iceCandidates = payload.get<std::vector<RTCIceCandidateInfo>>();
    } catch (std::exception) {
      res.status = StatusCode::InternalServerError_500;
      return;
    }

    auto promise = _candidateCb(iceCandidates);
    auto candidates = promise->await().get();

    if (candidates.empty()) {
      res.set_content(json{}.dump(), "application/json");
      res.status = StatusCode::NoContent_204;
      return;
    }

    json response = candidates;
    res.set_content(response.dump(), "application/json");
    res.status = StatusCode::OK_200;
  });
}

void ServerCore::listen(int port) {
  if (_isRunning.load())
    return;

  _isRunning = true;

  _setupRoutes();

  _serverThread = std::thread([this, port] {
    _srv.listen("0.0.0.0", port);
  });
}

void ServerCore::stop() {
  if (!_isRunning.load())
    return;

  _srv.stop();
  if (_serverThread.joinable()) {
    _serverThread.join();
  }

  _isRunning = false;
}

ServerCore Server;
} // namespace margelo::nitro::nitrohttp
