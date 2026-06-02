package com.margelo.nitro.nitrohttp

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Intent
import android.content.pm.ServiceInfo
import android.os.Build
import android.os.IBinder
import androidx.core.app.NotificationCompat

class ServerForeground : Service() {
    external fun nativeStart(port: Int): Unit
    external fun nativeStop(): Unit

    private var serverThread: Thread? = null

    override fun onStartCommand(
        intent: Intent?,
        flags: Int,
        startId: Int
    ): Int {

        when (intent?.action) {
            ACTION_START -> {
                val port = intent.getIntExtra(
                    EXTRA_PORT,
                    8080
                )

                if(serverThread == null) {
                    serverThread = Thread {
                        try {
                            nativeStart(port)
                        } catch (e: Exception) {
                            e.printStackTrace()
                        }

                    }.apply {
                        start()
                    }
                }
            }

            ACTION_STOP -> {
                try {
                    nativeStop()
                } finally {
                    stopForeground(STOP_FOREGROUND_REMOVE)
                    stopSelf()
                }
            }
        }

        return START_STICKY
    }

    override fun onCreate() {
        super.onCreate()

        createNotificationChannel()

        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.UPSIDE_DOWN_CAKE) {
            startForeground(
                NOTIFICATION_ID,
                createNotification(),
                ServiceInfo.FOREGROUND_SERVICE_TYPE_CONNECTED_DEVICE
            )
        } else {
            startForeground(
               NOTIFICATION_ID,
                createNotification()
            )
        }
    }

    override fun onDestroy() {
        try {
            nativeStop()
        } catch (_: Exception) {
        }

        serverThread = null
        super.onDestroy()
    }

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }

    private fun createNotificationChannel() {
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                "Server",
                NotificationManager.IMPORTANCE_LOW
            )
            val manager = getSystemService(NotificationManager::class.java)
            manager.createNotificationChannel(channel)
        }
    }

    private fun createNotification(): Notification {
        val icon = applicationInfo.icon
        
        val stopIntent = Intent(this, ServerForeground::class.java).apply {
            action = ACTION_STOP
        }
        val flag = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
        } else {
            PendingIntent.FLAG_UPDATE_CURRENT
        }
        val pendingIntent = PendingIntent.getService(
            this,
            0,
            stopIntent,
            flag
        )

        return NotificationCompat.Builder(
            this,
            CHANNEL_ID
        )
            .setContentTitle("Server Running")
            .setContentText("Native server is running, tap to stop")
            .setSmallIcon(if (icon != 0) icon else android.R.drawable.ic_dialog_info)
            .setOngoing(true)
            .setContentIntent(pendingIntent)
            .build()
    }

    companion object {
        const val ACTION_START = "com.margelo.nitro.nitrohttp.START"
        const val ACTION_STOP = "com.margelo.nitro.nitrohttp.STOP"
        const val EXTRA_PORT = "port"
        const val CHANNEL_ID = "server_channel"
        const val NOTIFICATION_ID = 1

        init {
            System.loadLibrary("NitroHttp")
        }
    }
}
