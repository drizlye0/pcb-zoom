#include "NitroHttpOnLoad.hpp"
#include "ServerCore.hpp"
#include <fbjni/fbjni.h>
#include <jni.h>

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM* vm, void*) {
  return facebook::jni::initialize(vm, []() {
    margelo::nitro::nitrohttp::registerAllNatives();
  });
}

extern "C" JNIEXPORT void JNICALL Java_com_margelo_nitro_nitrohttp_ServerForeground_nativeStart(
    JNIEnv* env, jobject thiz, jint port
) {
  margelo::nitro::nitrohttp::Server.listen(port);
}

extern "C" JNIEXPORT void JNICALL
Java_com_margelo_nitro_nitrohttp_ServerForeground_nativeStop(JNIEnv* env, jobject thiz) {
  margelo::nitro::nitrohttp::Server.stop();
}
