#include "HybridHttpServer.hpp"
#include <android/log.h>
#include <thread>

namespace margelo::nitro::nitrohttp {
void HybridHttpServer::listen(double port) {
  if (_isRunning.load())
    return;

  _isRunning = true;

  _srv.Get("/", [](const httplib::Request&, httplib::Response& res) {
    __android_log_print(ANDROID_LOG_INFO, "NitroHttp", "/ endpoint");
    res.set_content("Hello, world from http server written on c++", "text/plain");
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
