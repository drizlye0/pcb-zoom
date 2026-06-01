#include "HCallbackManager.hpp"
#include "ServerCore.hpp"

namespace margelo::nitro::nitrohttp {
void HCallbackManager::setOffer(const OfferCallback& cb) {
  Server._offerCb = cb;
}

void HCallbackManager::setAnswer(const AnswerCallback& cb) {
  Server._answerCb = cb;
}

void HCallbackManager::setIceCandidate(const IceCandidateCallback& cb) {
  Server._candidateCb = cb;
}
} // namespace margelo::nitro::nitrohttp
