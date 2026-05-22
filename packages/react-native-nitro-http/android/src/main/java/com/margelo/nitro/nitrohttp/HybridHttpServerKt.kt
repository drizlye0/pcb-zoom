package com.margelo.nitro.nitrohtpp
import com.margelo.nitro.core.*

class HybridHttpServerKt : HybridHttpServerKtSpec() {
    private val TAG = "HybridHttpServerKt"

    override fun startForeground(server: HybridHttpServerSpec, port: Double): Unit {
        Log.i(TAG, "port: $port")
        server.listen(port)
    }
}
