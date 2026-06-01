#pragma once

#include "HybridCallbackManagerSpec.hpp"
#include "helpers.hpp"

namespace margelo::nitro::nitrohttp {
class HCallbackManager : public HybridCallbackManagerSpec {
public:
  HCallbackManager() : HybridObject(TAG) {}
  ~HCallbackManager() = default;

  void setOffer(const OfferCallback& cb) override;
  void setAnswer(const AnswerCallback& cb) override;
  void setIceCandidate(const IceCandidateCallback& cb) override;
};
} // namespace margelo::nitro::nitrohttp
