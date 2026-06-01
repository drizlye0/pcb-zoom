#pragma once
#include "HybridCallbackManagerSpec.hpp"

namespace margelo::nitro::nitrohttp {
// Helper template to extract the first argument type of a member function
// pointer.
template <typename T>
struct first_argument_type;

template <typename C, typename R, typename A>
struct first_argument_type<R (C::*)(A)> {
  using type = A;
};

template <typename C, typename R, typename A>
struct first_argument_type<R (C::*)(A) const> {
  using type = A;
};

template <typename T>
using first_argument_type_t = typename first_argument_type<T>::type;

using OfferCallback =
    std::decay_t<first_argument_type_t<decltype(&HybridCallbackManagerSpec::setOffer)>>;

using AnswerCallback =
    std::decay_t<first_argument_type_t<decltype(&HybridCallbackManagerSpec::setAnswer)>>;

using IceCandidateCallback =
    std::decay_t<first_argument_type_t<decltype(&HybridCallbackManagerSpec::setIceCandidate)>>;
} // namespace margelo::nitro::nitrohttp
