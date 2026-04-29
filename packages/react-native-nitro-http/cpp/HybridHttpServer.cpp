#include "HybridHttpServer.hpp"
#include <android/log.h>
#include <httplib.h>

namespace margelo::nitro::nitrohttp {
void HybridHttpServer::listen(double port) {
  if (_isRunning.load())
    return;

  _isRunning = true;

  _srv.Get("/", [](const httplib::Request&, httplib::Response& res) {
    __android_log_print(ANDROID_LOG_INFO, "NitroHttp", "GET /");
    res.set_content("Hello, world from http server written on c++", "text/plain");
  });

  _srv.Post("/jsontest", [](const httplib::Request& req, httplib::Response& res) {
    __android_log_print(ANDROID_LOG_INFO, "NitroHttp", "POST /jsontest");
    try {
      json payload = json::parse(req.body);
      Offer offer = payload.get<Offer>();
      __android_log_print(
          ANDROID_LOG_INFO, "NitroHttp", "sdp: %s , type: %s", offer.sdp.c_str(), offer.type.c_str()
      );

      offer.sdp = "sdp from c++ nitro module";
      offer.type = "type from c++ nitro module";

      json response = offer;

      res.set_content(response.dump(), "application/json");
    } catch (std::exception e) {
      __android_log_print(
          ANDROID_LOG_ERROR, "NitroHttp", "failed to process POST /jsontest endpoint"
      );
    }
  });

  _serverThread = std::thread([this, port] {
    _srv.listen("0.0.0.0", static_cast<int>(port));
  });
}

void HybridHttpServer::stop() {
  if (!_isRunning.load())
    return;

  _srv.stop();
  if (_serverThread.joinable()) {
    _serverThread.join();
  }

  _isRunning = false;
}
} // namespace margelo::nitro::nitrohttp
