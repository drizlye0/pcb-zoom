package com.margelo.nitro.nitrohttp

import android.content.Intent
import androidx.core.content.ContextCompat
import com.margelo.nitro.NitroModules
import com.margelo.nitro.core.*

class HybridSignalingServer : HybridSignalingServerSpec() {
    override fun startForeground(port: Double): Unit {
        val context = NitroModules.applicationContext ?: throw Error("No context avaliable")
        val intent = Intent(
            context,
            ServerForeground::class.java
        ).apply {
            action = ServerForeground.ACTION_START,
            putExtra(
                ServerForeground.EXTRA_PORT,
                port.toInt()
            )
        }

        ContextCompat.startForegroundService(
            context,
            intent
        )
    }

    override fun stop(): Unit {
        val context = NitroModules.applicationContext ?: throw Error("No context avaliable")
        val intent = Intent(
            context,
            ServerForeground::class.java
        ).apply {
            action = ServerForeground.ACTION_STOP
        }

        context.startService(intent)
    }
}
