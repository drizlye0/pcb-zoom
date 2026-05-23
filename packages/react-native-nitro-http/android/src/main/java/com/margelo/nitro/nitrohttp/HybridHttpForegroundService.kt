package com.margelo.nitro.nitrohttp
import com.margelo.nitro.core.*
import android.util.Log

class HybridHttpForegroundService : HybridHttpForegroundServiceSpec() {
    private val TAG = "HybridHttpForegroundService"

    override fun startForeground(task: () -> Unit): Unit {
        Log.i(TAG, "start service")
    }

    override fun stopForeground(cb: () -> Unit): Unit {
        Log.i(TAG, "stop service")
        cb()
    }
}
