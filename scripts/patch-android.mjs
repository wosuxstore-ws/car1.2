// Runs after `npx cap add android`: landscape lock, immersive fullscreen, keep screen on, dark launch screen.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const manifest = 'android/app/src/main/AndroidManifest.xml';
let m = readFileSync(manifest, 'utf8');
if (!m.includes('android:launchMode="singleTask"')) throw new Error('Unexpected AndroidManifest layout');
if (!m.includes('screenOrientation')) {
  m = m.replace('android:launchMode="singleTask"', 'android:screenOrientation="sensorLandscape"\n            android:hardwareAccelerated="true"\n            android:launchMode="singleTask"');
}
writeFileSync(manifest, m);

const java = 'android/app/src/main/java/com/r8/roaddrive/MainActivity.java';
if (!existsSync(java)) throw new Error('MainActivity.java not found at ' + java);
writeFileSync(java, `package com.r8.roaddrive;

import android.os.Bundle;
import android.view.WindowManager;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    hideSystemBars();
  }

  @Override
  public void onWindowFocusChanged(boolean hasFocus) {
    super.onWindowFocusChanged(hasFocus);
    if (hasFocus) hideSystemBars();
  }

  private void hideSystemBars() {
    WindowInsetsControllerCompat c = WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView());
    c.setSystemBarsBehavior(WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
    c.hide(WindowInsetsCompat.Type.systemBars());
  }
}
`);

const styles = 'android/app/src/main/res/values/styles.xml';
if (existsSync(styles)) {
  let s = readFileSync(styles, 'utf8');
  s = s.replace('<item name="android:background">@drawable/splash</item>', '<item name="android:background">#241a2b</item>');
  writeFileSync(styles, s);
}
console.log('Android project patched');
